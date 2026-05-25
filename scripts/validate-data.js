#!/usr/bin/env node
/* =====================================================================
   scripts/validate-data.js — v3 data validator (plain Node, zero deps)

   Loads each president data file in data/*.js, walks every dossier entry,
   and prints OK / WARN / ERROR with a summary. Exits non-zero on ERROR.
   Skips data/_example.js and data/_trump-v2-scaffold.js (they declare
   local consts; they don't register on window.PRESIDENTS).

   Usage:
     node scripts/validate-data.js                 # all data/*.js
     node scripts/validate-data.js data/biden.js   # specific file

   Designed for the run-up to ~100 hand-authored v3 entries: surface bad
   entries loudly before they ship.
   ===================================================================== */

"use strict";

const fs   = require("fs");
const path = require("path");
const vm   = require("vm");
const cp   = require("child_process");

const ROOT      = path.resolve(__dirname, "..");
const DATA_DIR  = path.join(ROOT, "data");
const APP_JS    = path.join(ROOT, "app.js");
const MAP_NAMES = path.join(__dirname, "map-country-names.json");

/* ---- allowed values (kept in sync with CLAUDE.md / app.js) ---- */
const STATES           = new Set(["core-ally","aligned","neutral","strained","adversarial","us"]);
const EFFECTS          = new Set(["helped","mixed","hurt","unscored"]);
const MAGNITUDES       = new Set(["modest","material","major"]);
const UNSCORED_REASONS = new Set(["noMaterialEffect","noPresidentialEffect","systemicOnly","insufficientEvidence"]);
const ROLES            = new Set(["Architect","Accelerator","Closer","Stabilizer","Active Stabilizer","Inheritor","Bystander","Neglect","Spoiler"]);
const CONFIDENCES      = new Set(["high","medium","low"]);
const EVIDENCES        = new Set(["adequate","thin","insufficient"]);
const LEVER_KEYS       = new Set(["security","leverage","rivalDenial","coalition","economicTech"]);

const REQUIRED = [
  "state","effect","magnitude","region","outcome","inherited","points",
  "role","confidence","evidence","contested","counterargument","sources"
];

/* ---- terminal color helpers (degrade silently when not a TTY) ---- */
const isTTY = !!(process.stdout && process.stdout.isTTY);
const c = (n, s) => isTTY ? `\x1b[${n}m${s}\x1b[0m` : s;
const red   = s => c("31",     s);
const yel   = s => c("33",     s);
const grn   = s => c("32",     s);
const dim   = s => c("2",      s);
const bold  = s => c("1",      s);

/* ---- ALIAS table parsed out of app.js so the validator stays in sync
        with the runtime's name resolution (no manual duplication) ---- */
function parseAliasFromAppJs() {
  const text = fs.readFileSync(APP_JS, "utf8");
  const m = text.match(/var\s+ALIAS\s*=\s*\{([\s\S]*?)\};/);
  if (!m) return {};
  const body = m[1];
  const out = {};
  const re = /"([^"]+)"\s*:\s*"([^"]+)"/g;
  let mm;
  while ((mm = re.exec(body)) !== null) out[mm[1]] = mm[2];
  return out;
}

/* ---- Levenshtein distance (for "nearest map-name" suggestions) ---- */
function distance(a, b) {
  const m = a.length, n = b.length;
  if (!m) return n;
  if (!n) return m;
  const dp = Array.from({length: m+1}, () => new Array(n+1).fill(0));
  for (let i = 0; i <= m; i++) dp[i][0] = i;
  for (let j = 0; j <= n; j++) dp[0][j] = j;
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      const cost = a[i-1] === b[j-1] ? 0 : 1;
      dp[i][j] = Math.min(dp[i-1][j]+1, dp[i][j-1]+1, dp[i-1][j-1]+cost);
    }
  }
  return dp[m][n];
}
function nearest(name, set, n = 3) {
  const lower = name.toLowerCase();
  return Array.from(set)
    .map(x => ({x, d: distance(lower, x.toLowerCase())}))
    .sort((a, b) => a.d - b.d)
    .slice(0, n)
    .map(o => o.x);
}

/* ---- Pure syntax check via node --check (separate process so we get
        Node's full parser, not vm's slightly different error shape) ---- */
function syntaxCheck(filePath) {
  try {
    cp.execFileSync("node", ["--check", filePath], { stdio: "pipe" });
    return null;
  } catch (e) {
    const err = e.stderr ? e.stderr.toString().trim() : (e.message || String(e));
    return err;
  }
}

/* ---- Load a president data file with a shimmed window so its
        window.PRESIDENTS["..."] = {...} assignments capture cleanly. ---- */
function loadPresidentFile(filePath) {
  const code = fs.readFileSync(filePath, "utf8");
  const sandbox = { window: { PRESIDENTS: {} } };
  vm.createContext(sandbox);
  vm.runInContext(code, sandbox, { filename: filePath });
  return sandbox.window.PRESIDENTS;
}

/* ---- Source-level duplicate-key detector. JS object literals dedupe
        silently, so re-assigning the same dossier key with different
        content would just shadow without warning. This scans the raw
        source for both styles (inline `"China": {...}` inside a
        `dossier: {...}` block AND `.dossier["China"] = ...` assignments)
        and reports any key that appears more than once. ---- */
function findDuplicateDossierKeys(source) {
  const keys = [];

  // Style A: separate assignments — window.PRESIDENTS["x"].dossier["KEY"] = ...
  const assignRe = /\.dossier\s*\[\s*"([^"]+)"\s*\]\s*=/g;
  let m;
  while ((m = assignRe.exec(source)) !== null) keys.push(m[1]);

  // Style B: inline — dossier: { "KEY": {...}, "KEY2": {...} }
  const inlineRe = /dossier\s*:\s*\{/g;
  while ((m = inlineRe.exec(source)) !== null) {
    let i = m.index + m[0].length;
    let depth = 1;
    const start = i;
    while (i < source.length && depth > 0) {
      const ch = source[i];
      if (ch === "{") depth++;
      else if (ch === "}") { depth--; if (depth === 0) break; }
      i++;
    }
    const block = source.slice(start, i);
    // Walk block extracting top-level `"KEY":` pairs (skip nested objects)
    let bd = 0, j = 0;
    while (j < block.length) {
      const ch = block[j];
      if (ch === "{") { bd++; j++; continue; }
      if (ch === "}") { bd--; j++; continue; }
      if (ch === '"' && bd === 0) {
        let end = j + 1;
        while (end < block.length && block[end] !== '"') {
          if (block[end] === "\\") end++;
          end++;
        }
        const candidate = block.slice(j+1, end);
        let k = end + 1;
        while (k < block.length && /\s/.test(block[k])) k++;
        if (block[k] === ":") keys.push(candidate);
        j = end + 1;
        continue;
      }
      j++;
    }
  }

  const seen = new Map();
  for (const k of keys) seen.set(k, (seen.get(k) || 0) + 1);
  const dups = [];
  for (const [k, v] of seen.entries()) if (v > 1) dups.push({ key: k, count: v });
  return dups;
}

/* ---- Bullets must carry at least one [..] inline source reference. ---- */
function hasBracketedSource(s) {
  return /\[[^\]]+\]/.test(s);
}

/* ---- Validate a single dossier entry. Returns {errors: [], warns: []} ---- */
function validateEntry(key, e, ctx) {
  const errors = [];
  const warns  = [];

  if (!e || typeof e !== "object" || Array.isArray(e)) {
    errors.push(`entry is not a plain object`);
    return { errors, warns };
  }

  // Required fields — check presence (truthy isn't right; contested:false is valid)
  for (const f of REQUIRED) {
    if (!(f in e)) errors.push(`missing required field: ${f}`);
  }

  // state
  if ("state" in e && !STATES.has(e.state)) {
    errors.push(`invalid state ${JSON.stringify(e.state)} (allowed: ${[...STATES].join("|")})`);
  }

  // effect
  if ("effect" in e && !EFFECTS.has(e.effect)) {
    errors.push(`invalid effect ${JSON.stringify(e.effect)} (allowed: ${[...EFFECTS].join("|")})`);
  }

  // magnitude — specific number guard, then enum, then cross-check vs. effect
  if ("magnitude" in e) {
    if (typeof e.magnitude === "number") {
      errors.push(`magnitude is a NUMBER; must be one of modest|material|major or null`);
    } else if (e.magnitude !== null && !MAGNITUDES.has(e.magnitude)) {
      errors.push(`invalid magnitude ${JSON.stringify(e.magnitude)} (allowed: modest|material|major|null)`);
    }
  }
  if (e.effect === "mixed" || e.effect === "unscored") {
    if (e.magnitude !== null && e.magnitude !== undefined) {
      errors.push(`magnitude must be null when effect is "${e.effect}" (got ${JSON.stringify(e.magnitude)})`);
    }
  }
  if (e.effect === "helped" || e.effect === "hurt") {
    if (e.magnitude === null || e.magnitude === undefined) {
      errors.push(`magnitude required when effect is "${e.effect}" (modest|material|major)`);
    }
  }

  // unscoredReason — required iff effect === "unscored"
  if (e.effect === "unscored") {
    if (!e.unscoredReason || !UNSCORED_REASONS.has(e.unscoredReason)) {
      errors.push(`unscoredReason required when effect is "unscored" (allowed: ${[...UNSCORED_REASONS].join("|")})`);
    }
  }

  // role / confidence / evidence
  if ("role"       in e && !ROLES      .has(e.role))       errors.push(`invalid role ${JSON.stringify(e.role)}`);
  if ("confidence" in e && !CONFIDENCES.has(e.confidence)) errors.push(`invalid confidence ${JSON.stringify(e.confidence)} (allowed: high|medium|low)`);
  if ("evidence"   in e && !EVIDENCES  .has(e.evidence))   errors.push(`invalid evidence ${JSON.stringify(e.evidence)} (allowed: adequate|thin|insufficient)`);
  if (e.evidence === "insufficient" && e.effect !== "unscored") {
    errors.push(`evidence "insufficient" requires effect "unscored"`);
  }

  // levers — object keyed by lever ids, string values
  if ("levers" in e && e.levers !== null && e.levers !== undefined) {
    if (Array.isArray(e.levers)) {
      errors.push(`levers must be a plain object (got the legacy array shape; app.js no longer renders it)`);
    } else if (typeof e.levers !== "object") {
      errors.push(`levers must be a plain object`);
    } else {
      for (const k of Object.keys(e.levers)) {
        if (!LEVER_KEYS.has(k)) {
          errors.push(`levers has unknown key "${k}" (allowed: ${[...LEVER_KEYS].join("|")})`);
        }
        const v = e.levers[k];
        if (typeof v !== "string") {
          errors.push(`levers.${k} must be a string (got ${Array.isArray(v) ? "array" : typeof v} — likely the {sign,note} shape, which doesn't render)`);
        }
      }
    }
  }

  // points — each bullet needs a bracketed [..] inline source.
  // Skip the source-bracket check for the US home entry (state: "us"), which
  // is a placeholder marker, not a sourced causal claim.
  if (Array.isArray(e.points)) {
    if (e.state !== "us") {
      e.points.forEach((p, i) => {
        if (typeof p !== "string") {
          errors.push(`points[${i}] is not a string (got ${typeof p})`);
          return;
        }
        if (p === "interp") return; // v2 sentinel — tolerate during data migration
        if (!hasBracketedSource(p)) {
          errors.push(`points[${i}] missing inline [source] reference: "${p.slice(0,72)}${p.length>72?'…':''}"`);
        }
      });
    }
  } else if ("points" in e) {
    errors.push(`points must be an array`);
  }

  // linkedPolicies — must resolve to an existing dossier key (after alias)
  if (Array.isArray(e.linkedPolicies)) {
    e.linkedPolicies.forEach((lp, i) => {
      if (typeof lp !== "string") { errors.push(`linkedPolicies[${i}] is not a string`); return; }
      const direct  = ctx.dossierKeys.has(lp);
      const aliased = ctx.alias[lp] && ctx.dossierKeys.has(ctx.alias[lp]);
      if (!direct && !aliased) {
        errors.push(`linkedPolicies[${i}] "${lp}" doesn't resolve to a dossier key in this president`);
      }
    });
  }

  // WARN: country key has no 110m polygon (after alias) — won't color/arrow.
  // valid-name set = mapNames ∪ alias-targets-whose-key-is-a-mapName
  // (built once in ctx.validNames). Skip the US home entry (state:"us"): the
  // dossier key "United States of America" IS in the 110m names, so the
  // check passes naturally; this comment just notes the special case.
  if (!ctx.validNames.has(key)) {
    const sug = nearest(key, ctx.mapNames, 3);
    warns.push(`"${key}": no 110m polygon — won't color/arrow on the map (small state or name mismatch). Nearest: ${sug.join(", ")}`);
  }

  // WARN: region not present in this president's regions object — link inert
  if (e.region && e.region !== "—" && !(e.region in ctx.regions)) {
    warns.push(`region "${e.region}" not defined in this president's regions object (region link/label will be inert)`);
  }

  return { errors, warns };
}

/* ---- Validate one file ---- */
function validateFile(filePath, mapNames, alias) {
  const rel = path.relative(ROOT, filePath);
  console.log("\n" + bold(`=== ${rel} ===`));

  // 1) syntax check
  const synErr = syntaxCheck(filePath);
  if (synErr) {
    console.log("  " + red("ERROR:") + " syntax check failed");
    console.log("    " + synErr.replace(/\n/g, "\n    "));
    return { errors: 1, warns: 0, entries: 0 };
  }

  // 2) load
  let presidents;
  try {
    presidents = loadPresidentFile(filePath);
  } catch (err) {
    console.log("  " + red("ERROR:") + ` failed to load file: ${err.message}`);
    return { errors: 1, warns: 0, entries: 0 };
  }

  // 3) duplicate dossier keys (source-level scan)
  const source = fs.readFileSync(filePath, "utf8");
  const dups = findDuplicateDossierKeys(source);
  let dupErrs = 0;
  if (dups.length) {
    dups.forEach(({key, count}) => {
      console.log("  " + red("ERROR:") + ` duplicate dossier key "${key}" appears ${count} times in this file`);
      dupErrs++;
    });
  }

  // 4) per-entry validation
  let totalErrors = dupErrs, totalWarns = 0, totalEntries = 0;

  const presidentIds = Object.keys(presidents);
  if (!presidentIds.length) {
    console.log("  " + yel("WARN:") + " file registers no presidents on window.PRESIDENTS");
    return { errors: dupErrs, warns: 1, entries: 0 };
  }

  // Pre-build the valid-name set for this run.
  const validNames = new Set(mapNames);
  for (const [mName, dName] of Object.entries(alias)) {
    if (mapNames.has(mName)) validNames.add(dName);
  }

  for (const id of presidentIds) {
    const P = presidents[id];
    const dossier = P.dossier || {};
    const regions = P.regions || {};
    const dossierKeys = new Set(Object.keys(dossier));

    for (const key of Object.keys(dossier)) {
      // Venezuela_note is a historical marker, not a country entry; skip it.
      if (key === "Venezuela_note") continue;
      totalEntries++;

      const e = dossier[key];
      const { errors, warns } = validateEntry(key, e, {
        mapNames, validNames, alias, regions, dossierKeys
      });

      const tag = errors.length ? red("ERROR") : (warns.length ? yel("WARN") : grn("OK"));
      console.log(`  [${tag}] ${dim(id + "/")}${bold(key)}`);
      errors.forEach(m => console.log("    " + red("ERROR:") + " " + m));
      warns .forEach(m => console.log("    " + yel("WARN: ") + " " + m));
      totalErrors += errors.length;
      totalWarns  += warns.length;
    }
  }

  return { errors: totalErrors, warns: totalWarns, entries: totalEntries };
}

/* ---- main ---- */
function main() {
  const arg = process.argv[2];
  let files;
  if (arg) {
    files = [path.resolve(arg)];
  } else {
    // Default: all data/*.js EXCEPT files starting with "_" (those are
    // non-loading reference files: _example.js, _trump-v2-scaffold.js).
    files = fs.readdirSync(DATA_DIR)
      .filter(f => f.endsWith(".js") && !f.startsWith("_"))
      .map(f => path.join(DATA_DIR, f))
      .sort();
  }

  if (!files.length) {
    console.error(red("ERROR:") + " no data files found");
    process.exit(2);
  }

  // Map-name set
  let mapNames;
  try {
    const j = JSON.parse(fs.readFileSync(MAP_NAMES, "utf8"));
    mapNames = new Set(Array.isArray(j) ? j : j.names);
    if (!mapNames.size) throw new Error("empty names array");
  } catch (err) {
    console.error(red("ERROR:") + ` couldn't load ${path.relative(ROOT, MAP_NAMES)}: ${err.message}`);
    console.error("  Regenerate per the _comment in that JSON.");
    process.exit(2);
  }

  // ALIAS table from app.js
  const alias = parseAliasFromAppJs();

  let totalErrors = 0, totalWarns = 0, totalEntries = 0;
  for (const f of files) {
    const r = validateFile(f, mapNames, alias);
    totalErrors  += r.errors;
    totalWarns   += r.warns;
    totalEntries += r.entries;
  }

  console.log("\n" + bold("=== Summary ==="));
  console.log(`  files:   ${files.length}`);
  console.log(`  entries: ${totalEntries}`);
  console.log(`  ${totalErrors ? red("errors:  " + totalErrors) : grn("errors:  0")}`);
  console.log(`  ${totalWarns  ? yel("warns:   " + totalWarns)  : grn("warns:   0")}`);

  process.exit(totalErrors ? 1 : 0);
}

main();
