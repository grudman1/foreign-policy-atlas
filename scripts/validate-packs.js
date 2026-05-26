#!/usr/bin/env node
/* =====================================================================
   scripts/validate-packs.js — evidence-pack validator (plain Node, zero deps)

   Counterpart to scripts/validate-data.js. Shims window.PACKS, loads each
   data/packs/<president>/<country>.js, walks every registered pack, and
   prints OK / WARN / ERROR with a summary. Exits non-zero only on real
   errors. Skips data/packs/_example.js (it's reference content, never
   loaded by index.html and never registered on window.PACKS).

   Also loads each data/<president>.js (with a window.PRESIDENTS shim) so
   the validator can:
     - WARN if a pack's `country` has no matching dossier entry; and
     - list every dossier entry still missing a pack (the backfill checklist).

   Usage:
     node scripts/validate-packs.js                         # everything
     node scripts/validate-packs.js data/packs/trump/x.js   # one pack

   Designed to stay quiet when packs are clean and loud when they're not.
   ===================================================================== */

"use strict";

const fs   = require("fs");
const path = require("path");
const vm   = require("vm");
const cp   = require("child_process");

const ROOT       = path.resolve(__dirname, "..");
const DATA_DIR   = path.join(ROOT, "data");
const PACKS_DIR  = path.join(DATA_DIR, "packs");

/* ---- allowed values (must stay in sync with data/packs/_example.js) ---- */
const SIGNS  = new Set(["weakened","strengthened","mixed"]);
const ANGLES = new Set([
  "Diplomacy",
  "Security",
  "Economic statecraft",
  "Technology & export controls",
  "Human rights",
  "Regional dynamics",
  "Time cuts"
]);

/* ---- terminal color helpers (degrade silently when not a TTY) ---- */
const isTTY = !!(process.stdout && process.stdout.isTTY);
const col = (n, s) => isTTY ? `\x1b[${n}m${s}\x1b[0m` : s;
const red  = s => col("31", s);
const yel  = s => col("33", s);
const grn  = s => col("32", s);
const dim  = s => col("2",  s);
const bold = s => col("1",  s);

/* ---- node --check pre-flight: catches syntax errors with Node's own
        parser before we try to load the file in a vm context. ---- */
function syntaxCheck(filePath){
  try {
    cp.execFileSync("node", ["--check", filePath], { stdio: "pipe" });
    return null;
  } catch (e) {
    return e.stderr ? e.stderr.toString().trim() : (e.message || String(e));
  }
}

/* ---- Load a pack file with a shimmed window so its
        window.PACKS["..."]["..."] = {...} assignments capture cleanly. ---- */
function loadPackFile(filePath){
  const code = fs.readFileSync(filePath, "utf8");
  const sandbox = { window: { PACKS: {} } };
  vm.createContext(sandbox);
  vm.runInContext(code, sandbox, { filename: filePath });
  return sandbox.window.PACKS;
}

/* ---- Load all president files into a single PRESIDENTS map so the
        validator knows which dossier keys exist for each president. ---- */
function loadAllPresidents(){
  if(!fs.existsSync(DATA_DIR)) return {};
  const out = {};
  const files = fs.readdirSync(DATA_DIR)
    .filter(f => f.endsWith(".js") && !f.startsWith("_"))
    .map(f => path.join(DATA_DIR, f));
  for(const f of files){
    try {
      const code = fs.readFileSync(f, "utf8");
      const sandbox = { window: { PRESIDENTS: {} } };
      vm.createContext(sandbox);
      vm.runInContext(code, sandbox, { filename: f });
      Object.assign(out, sandbox.window.PRESIDENTS || {});
    } catch(_) {
      // Loading errors are validate-data.js's territory; don't double-report.
    }
  }
  return out;
}

/* ---- Recursively collect data/packs/**\/*.js, skipping _-prefixed files. ---- */
function findPackFiles(){
  const out = [];
  if(!fs.existsSync(PACKS_DIR)) return out;
  function walk(dir){
    for(const ent of fs.readdirSync(dir, { withFileTypes: true })){
      const p = path.join(dir, ent.name);
      if(ent.isDirectory()){ walk(p); continue; }
      if(!ent.name.endsWith(".js")) continue;
      if(ent.name.startsWith("_")) continue;       // skip _example.js etc.
      out.push(p);
    }
  }
  walk(PACKS_DIR);
  out.sort();
  return out;
}

/* ---- Date format: "YYYY-MM" or "YYYY-MM-DD". Stricter than `new Date()`
        so a typo like "2025-13" or "2025/02" is flagged. ---- */
function isValidPackDate(s){
  if(typeof s !== "string") return false;
  if(!/^\d{4}-\d{2}(-\d{2})?$/.test(s)) return false;
  const parts = s.split("-").map(n => parseInt(n,10));
  const [y, m, d] = parts;
  if(m < 1 || m > 12) return false;
  if(d !== undefined && (d < 1 || d > 31)) return false;
  return true;
}

/* ---- Validate one pack object. Returns {errors, warns}. ---- */
function validatePack(pack, ctx){
  const errors = [];
  const warns  = [];

  if(!pack || typeof pack !== "object" || Array.isArray(pack)){
    errors.push("pack is not a plain object");
    return { errors, warns };
  }

  // Required: country, president, asOf, timeline (non-empty)
  if(!pack.country)   errors.push('missing required field: country');
  if(!pack.president) errors.push('missing required field: president');
  if(!pack.asOf)      errors.push('missing required field: asOf');

  if(!("timeline" in pack)){
    errors.push("missing required field: timeline");
  } else if(!Array.isArray(pack.timeline)){
    errors.push("timeline must be an array");
  } else if(pack.timeline.length === 0){
    errors.push("timeline is empty (must be non-empty)");
  } else {
    pack.timeline.forEach((t, i) => {
      if(!t || typeof t !== "object" || Array.isArray(t)){
        errors.push(`timeline[${i}] is not an object`);
        return;
      }
      if(!isValidPackDate(t.date)){
        errors.push(`timeline[${i}].date is malformed (got ${JSON.stringify(t.date)}; expected YYYY-MM or YYYY-MM-DD)`);
      }
      if(!t.sign || !SIGNS.has(t.sign)){
        errors.push(`timeline[${i}].sign ${JSON.stringify(t.sign)} not in {weakened|strengthened|mixed}`);
      }
      if(typeof t.label !== "string" || !t.label.trim()){
        warns.push(`timeline[${i}] has no label`);
      }
      if(t.detail !== undefined && typeof t.detail !== "string"){
        warns.push(`timeline[${i}].detail is not a string`);
      }
    });
  }

  // Memos: angles must be canonical; warn on duplicates.
  if("memos" in pack && pack.memos !== null && pack.memos !== undefined){
    if(!Array.isArray(pack.memos)){
      errors.push("memos must be an array");
    } else {
      const seenAngle = new Map();
      pack.memos.forEach((m, i) => {
        if(!m || typeof m !== "object"){
          errors.push(`memos[${i}] is not an object`);
          return;
        }
        if(!ANGLES.has(m.angle)){
          errors.push(`memos[${i}].angle ${JSON.stringify(m.angle)} is not one of the canonical 7 (${[...ANGLES].join(" | ")})`);
        } else {
          seenAngle.set(m.angle, (seenAngle.get(m.angle) || 0) + 1);
        }
        if(m.sources !== undefined && !Array.isArray(m.sources)){
          warns.push(`memos[${i}].sources should be an array`);
        }
      });
      for(const [angle, count] of seenAngle.entries()){
        if(count > 1) warns.push(`memos angle "${angle}" appears ${count} times (duplicate)`);
      }
    }
  }

  // Cross-check: pack.country must match a dossier entry under pack.president.
  if(pack.country && pack.president){
    const dossier = (ctx.presidents[pack.president] && ctx.presidents[pack.president].dossier) || null;
    if(!dossier){
      warns.push(`president "${pack.president}" not loaded — can't verify country/dossier mapping`);
    } else if(!(pack.country in dossier)){
      warns.push(`country "${pack.country}" has no matching dossier entry under president "${pack.president}"`);
    }
  }

  return { errors, warns };
}

/* ---- Validate one file. A file can register multiple packs in theory; in
        practice each file registers exactly one (data/packs/<pres>/<x>.js). ---- */
function validateFile(filePath, ctx){
  const rel = path.relative(ROOT, filePath);
  console.log("\n" + bold(`=== ${rel} ===`));

  const synErr = syntaxCheck(filePath);
  if(synErr){
    console.log("  " + red("ERROR:") + " syntax check failed");
    console.log("    " + synErr.replace(/\n/g, "\n    "));
    return { errors: 1, warns: 0, registered: [] };
  }

  let PACKS;
  try {
    PACKS = loadPackFile(filePath);
  } catch (err){
    console.log("  " + red("ERROR:") + ` failed to load file: ${err.message}`);
    return { errors: 1, warns: 0, registered: [] };
  }

  let totalErrors = 0, totalWarns = 0;
  const registered = [];   // [{president, country}]

  const presIds = Object.keys(PACKS || {});
  if(!presIds.length){
    console.log("  " + yel("WARN:") + " file registers no packs on window.PACKS");
    return { errors: 0, warns: 1, registered: [] };
  }

  for(const pres of presIds){
    const byCountry = PACKS[pres] || {};
    for(const country of Object.keys(byCountry)){
      const pack = byCountry[country];
      const { errors, warns } = validatePack(pack, ctx);
      const tag = errors.length ? red("ERROR") : (warns.length ? yel("WARN") : grn("OK"));
      console.log(`  [${tag}] ${dim(pres+"/")}${bold(country)}`);
      errors.forEach(m => console.log("    " + red("ERROR:") + " " + m));
      warns .forEach(m => console.log("    " + yel("WARN: ") + " " + m));
      totalErrors += errors.length;
      totalWarns  += warns.length;
      registered.push({ president: pres, country });

      // Mismatched filename hint (warn only): "Russia" should live under
      // data/packs/trump/russia.js. Soft check — case/spelling sanity.
      const baseName = path.basename(filePath, ".js").toLowerCase();
      const slug = country.toLowerCase().replace(/[^a-z0-9]+/g, "");
      const baseSlug = baseName.replace(/[^a-z0-9]+/g, "");
      if(baseSlug && slug && baseSlug !== slug && baseSlug.indexOf(slug) === -1 && slug.indexOf(baseSlug) === -1){
        console.log("    " + yel("WARN: ") + ` filename "${path.basename(filePath)}" doesn't obviously match country "${country}"`);
        totalWarns++;
      }
    }
  }

  return { errors: totalErrors, warns: totalWarns, registered };
}

/* ---- main ---- */
function main(){
  const arg = process.argv[2];
  let files;
  if(arg){
    files = [path.resolve(arg)];
  } else {
    files = findPackFiles();
  }

  if(!files.length){
    console.log(yel("No pack files to validate.") + " (none found under data/packs/)");
    // Not an error: a freshly-scaffolded repo with no packs yet is fine.
    process.exit(0);
  }

  const presidents = loadAllPresidents();

  const ctx = { presidents };

  let totalErrors = 0, totalWarns = 0, totalPacks = 0;
  const allRegistered = [];   // every (president, country) we saw

  for(const f of files){
    const r = validateFile(f, ctx);
    totalErrors += r.errors;
    totalWarns  += r.warns;
    totalPacks  += r.registered.length;
    allRegistered.push(...r.registered);
  }

  // --- Backfill checklist: dossier entries still missing a pack ----------
  // Warn-only — this is the work queue, not a failure mode.
  const haveByPres = {};
  for(const r of allRegistered){
    (haveByPres[r.president] = haveByPres[r.president] || new Set()).add(r.country);
  }

  console.log("\n" + bold("=== Backfill checklist (entries still missing a pack) ==="));
  let backfillTotal = 0;
  const presIds = Object.keys(presidents).sort();
  if(!presIds.length){
    console.log("  " + dim("(no presidents loaded — skipping)"));
  } else {
    for(const id of presIds){
      const dossier = presidents[id].dossier || {};
      const have = haveByPres[id] || new Set();
      const missing = Object.keys(dossier)
        .filter(k => k !== "Venezuela_note")
        .filter(k => (dossier[k] && dossier[k].state) !== "us")  // US home entry is special-cased
        .filter(k => !have.has(k))
        .sort();
      if(!missing.length){
        console.log("  " + grn("OK ") + " " + id + ": all dossier entries have packs");
        continue;
      }
      console.log("  " + yel("PEND") + " " + id + ": " + missing.length + " missing");
      missing.forEach(k => console.log("    - " + k));
      totalWarns   += missing.length;
      backfillTotal += missing.length;
    }
  }

  console.log("\n" + bold("=== Summary ==="));
  console.log(`  pack files:  ${files.length}`);
  console.log(`  packs:       ${totalPacks}`);
  console.log(`  backfill:    ${backfillTotal} dossier entries still missing a pack`);
  console.log(`  ${totalErrors ? red("errors:      " + totalErrors) : grn("errors:      0")}`);
  console.log(`  ${totalWarns  ? yel("warns:       " + totalWarns)  : grn("warns:       0")}`);

  // Exit non-zero ONLY on real errors. Backfill warnings don't fail CI.
  process.exit(totalErrors ? 1 : 0);
}

main();
