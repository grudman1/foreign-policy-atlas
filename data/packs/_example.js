/* =====================================================================
   Foreign Policy Atlas — EVIDENCE PACK SCHEMA TEMPLATE

   THIS FILE IS A REFERENCE TEMPLATE, NOT A LIVE PACK.
   - It is NOT loaded by index.html and does NOT register on window.PACKS.
   - It documents the pack shape by example, for both Claude Code (rendering
     and validation) and the research-chat authoring pipeline.
   - Real packs live in data/packs/<president>/<country>.js. One file per
     country. Each self-registers on window.PACKS and writes nothing else.

   What a pack IS:
     The sourced research artifact behind a dossier verdict. The dossier
     entry is the headline + verdict; the pack is the long-form evidence
     surface a reader can open ("View the evidence pack") to inspect.

   What a pack IS NOT:
     A second verdict. A pack reorganizes and presents existing research
     already captured in the dossier entry — it never introduces a new
     judgment, source, or fact that isn't traceable to that entry.

   Author rule: every claim in a pack must trace to the corresponding
   data/<president>.js entry. Invent no new facts; cite no new sources.
   ===================================================================== */


/* ---- The pack registry shape (live packs do this — example doesn't) ----

   Each live pack file begins with this two-line guard so the registry is
   shared safely across pack files, then assigns the pack:

     window.PACKS = window.PACKS || {};
     window.PACKS["trump"] = window.PACKS["trump"] || {};
     window.PACKS["trump"]["Russia"] = { ...pack object below... };

   The country key MUST match the dossier key exactly (e.g. "Russia",
   "United States of America"). The same ALIAS / keyFor resolution the
   dossier uses is what resolves the pack lookup at render time.
*/


/* ---- A fully-worked pack: SHAPE ONLY (illustrative content) ---- */
const EXAMPLE_PACK = {

  /* ===== REQUIRED ===== */

  // MUST equal the dossier key exactly. The runtime resolves packs through
  // the same keyFor()/ALIAS pipeline as the dossier, so this is the spine
  // that ties a pack to its entry.
  country: "Russia",

  // The president id this pack belongs to. MUST match a key in
  // window.PRESIDENTS (e.g. "trump"). Used by the validator as a
  // sanity check.
  president: "trump",

  // Mirror the president-level asOf so a reader sees the same time stamp
  // as the dossier. Free-form string — pack does not parse this.
  asOf: "May 2026 (projected timeline)",

  /* ===== REQUIRED: THE SPINE (author-curated timeline) =====
     Hand-placed by the author from the pack research. Single source of
     truth for the "What actually happened, when" timeline.
     NEVER derived/parsed from prose — always explicit.

     Each entry:
       date       "YYYY-MM" or "YYYY-MM-DD"
       label      short phrase, headline-style
       sign       "weakened" | "strengthened" | "mixed"
                  red / green / gray respectively
       detail     one sentence — what happened and why it matters
       sourceLabel  optional; mirrors a sources[].label where possible
       sourceUrl    optional; "" is fine when the source is offline-only

     Order: chronological (oldest first). The renderer does not sort.
  */
  timeline: [
    {
      date: "2025-02",
      label: "Hegseth in Brussels",
      sign: "weakened",
      detail: "Rules out Ukrainian NATO membership before talks; tells Europe to carry the 'overwhelming share' of aid.",
      sourceLabel: "DoD, 2025-02-12",
      sourceUrl: "https://www.defense.gov/..."
    },
    {
      date: "2025-02",
      label: "Marc Fogel released",
      sign: "strengthened",
      detail: "Released via the new Witkoff channel — an output the inherited frozen relationship couldn't have produced.",
      sourceLabel: "White House, 2025-02",
      sourceUrl: ""
    }
    // …one entry per datable event already present in the dossier entry's
    // points[] / outcome / conditional notes. Don't invent events.
  ],

  /* ===== OPTIONAL — everything below is optional. A timeline-only pack
                      is valid. ===== */

  // Pack provenance and version stamp.
  packVersion: "1.0",
  pipeline: "analyst=Claude · red-team=GPT · editor=Claude · adjudicated→hurt. 2026-05-25",

  // The inherited trajectory the entry's effect is measured against.
  // May reuse the dossier entry's `inherited` value verbatim.
  baseline: "The inherited trajectory the effect is measured against.",

  // Dated narrative of what occurred under this president. Stitched from
  // the dossier entry's outcome + points.
  whatHappened: "Multi-sentence prose. Each sentence becomes its own <p>.",

  /* The 7 policy-angle memos.
     `angle` MUST be one of the canonical 7 below. The renderer collapses
     each memo into a <details> per angle (closed by default).
     Omit an angle entirely only if the entry genuinely has nothing for it.
     The validator errors on an unknown angle and warns on duplicates.

     The inherited baseline is the separate `baseline` field above, NOT a memo. */
  memos: [
    { angle: "Diplomacy",                    text: "Prose memo on diplomacy.",                    sources: [{label: "...", url: "..."}] },
    { angle: "Security",                     text: "Prose memo on security.",                     sources: [] },
    { angle: "Economic statecraft",          text: "Prose memo on economic statecraft.",          sources: [] },
    { angle: "Technology & export controls", text: "Prose memo on tech and export controls.",     sources: [] },
    { angle: "Human rights",                 text: "Prose memo on human rights.",                  sources: [] },
    { angle: "Regional dynamics",            text: "Prose memo on regional dynamics.",             sources: [] },
    { angle: "Time cuts",                    text: "Prose memo on horizons / time cuts.",          sources: [] }
  ],

  // What ties (or doesn't tie) the change to the president — the
  // attribution argument the dossier's `role`/`confidence` rests on.
  attributionSignals: [
    { text: "Signal sentence with [source].", sourceLabel: "Source label", sourceUrl: "https://..." }
  ],

  // Where serious analysts diverge. Mirrors the dossier's `counterargument`
  // and any `contested` notes, broken into a list of disputed points.
  contestedPoints: [
    "Bullet describing one contested point."
  ],

  // What the pack could NOT establish — the honest blank.
  // Mirrors the dossier's `omissionNote` where present.
  gaps: [
    "Bullet describing one gap the pack could not close."
  ],

  // May mirror entry.sources. The renderer dedupes neither — author with care.
  sources: [
    { label: "Source label", url: "https://..." }
  ]
};


/* ---- A minimal pack: timeline-only is valid ---- */
const EXAMPLE_MINIMAL_PACK = {
  country: "Some Country",
  president: "trump",
  asOf: "May 2026 (projected timeline)",
  timeline: [
    { date: "2025-06", label: "Event headline", sign: "mixed", detail: "What happened in one sentence." }
  ]
};


/* ---- The canonical 7 memo angles ---- */
// Diplomacy
// Security
// Economic statecraft
// Technology & export controls
// Human rights
// Regional dynamics
// Time cuts
