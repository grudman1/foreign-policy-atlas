/* =====================================================================
   Foreign Policy Atlas — SCHEMA TEMPLATE (v3, "President Effect" model)

   THIS FILE IS A REFERENCE TEMPLATE, NOT A LIVE PRESIDENT FILE.
   - It is NOT loaded by index.html and does NOT register on window.PRESIDENTS.
   - It defines the v3 entry shape by example, for both Claude Code (migrating
     app.js + the data) and the research-chat authoring pipeline.
   - The example CONTENT below is ILLUSTRATIVE — written to exercise every
     field, NOT a sourced final judgment. Real entries must be re-derived
     through the sourced pipeline (CLAUDE.md -> Source rules). The `sources`
     here are PLACEHOLDERS with empty URLs on purpose.

   Two axes (full definitions in CLAUDE.md):
     state  = where the relationship STANDS today          -> map COLOR
     effect = what THIS president CAUSED vs. the inherited  -> map ARROW
              trajectory (helped | mixed | hurt | unscored)
   ===================================================================== */


/* ---- A fully-worked entry: China under Trump (2nd term) ----
   Chosen because it exercises nearly every field: an adversarial state with a
   genuinely MIXED, contested effect, a real counterargument, and several of the
   conditional fields. */
const EXAMPLE_ENTRY = {

  /* ===== REQUIRED — the two axes ===== */
  state: "adversarial",   // core-ally | aligned | neutral | strained | adversarial | us   (COLOR)
  effect: "mixed",        // helped | mixed | hurt | unscored                              (ARROW)
  magnitude: null,        // modest | material | major  — REQUIRED iff effect is helped/hurt; null otherwise

  region: "East Asia",    // must match a key in `regions`

  /* ===== REQUIRED — outcome vs. effect, kept separate ===== */
  // outcome = what HAPPENED to the U.S. position (describes the world, not the president)
  outcome: "The US\u2013China relationship settled into a managed truce \u2014 the trade ceasefire held, tech competition continued, and Taiwan deterrence was left ambiguous. No decisive change in relative position either way.",
  // inherited = the trajectory the president INHERITED. This is the single fixed
  // counterfactual the effect is measured against. (Sharpened from v2 `baseline`.)
  inherited: "A 'manage competition' framework with steadily tightening tech restrictions. Absent major new policy, the default path was continued managed rivalry with gradual, mutual decoupling.",

  /* ===== REQUIRED — the causal argument (why the president did/didn't move it) ===== */
  points: [
    "The May 2026 Beijing summit preserved the existing trade truce but produced no chip-export breakthrough \u2014 assessed at the time as underwhelming.",
    "The administration's choices stabilized the relationship rather than shifting relative power; credit and blame are symmetric \u2014 holding steady is neither a clear win nor a clear loss.",
    "The stabilization did not buy leverage on adjacent files: Xi reportedly declined to broker an Iran off-ramp, and the Taiwan exchange left deterrence ambiguous."
  ],

  /* ===== REQUIRED — attribution + how sure we are ===== */
  role: "Stabilizer",     // Architect|Accelerator|Closer|Stabilizer|Active Stabilizer|Inheritor|Bystander|Neglect|Spoiler
  confidence: "medium",   // high | medium | low  — confidence in the EFFECT attribution
  evidence: "adequate",   // adequate | thin | insufficient  — `insufficient` => effect MUST be "unscored"

  /* ===== REQUIRED — honesty fields ===== */
  contested: true,        // true => UI shows "reasonable analysts could score this differently"
  counterargument: "The strongest counter is that stabilization without a leverage gain is itself a relative loss as China's structural position consolidates \u2014 i.e. this arguably scores 'hurt,' not 'mixed.'",

  /* ===== REQUIRED — sourcing (claims are fetched, not recalled) ===== */
  // PLACEHOLDERS. Phase 1 replaces these with real, dated sources.
  sources: [
    { label: "[placeholder] Beijing summit readout, May 2026", url: "" },
    { label: "[placeholder] contemporaneous analysis of the trade truce", url: "" }
  ],

  /* ===== CONDITIONAL / OPTIONAL — include only where they genuinely apply ===== */

  // the 5 levers, scored only where relevant (checklist, not a weighted sum)
  levers: [
    { lever: "economicTech", sign: "mixed" },   // security | leverage | rivalDenial | coalition | economicTech
    { lever: "rivalDenial",  sign: "mixed" }     // sign: "+" | "-" | "mixed"
  ],

  crossTheaterTradeoff: "Prioritizing a stable China truce may have reduced leverage to extract help elsewhere (e.g. the declined Iran off-ramp).",

  grandStrategyDispute: "School-dependent: a primacy reading sees a managed truce as ceding initiative; a restraint reading sees prudent avoidance of confrontation. The sign of the effect partly depends on which goal you hold.",

  longHorizon: "The 2027 Taiwan window will retroactively reframe whether this stabilization was prudent or a missed deterrence opportunity.",

  linkedPolicies: ["Taiwan", "Iran"]   // keys of related entries, for cross-card navigation (feature deferrable to post-v1)

  /* other optional fields, shown here for reference (omit when N/A):
  , unscoredReason: "..."       // REQUIRED iff effect === "unscored": noMaterialEffect | noPresidentialEffect | systemicOnly | insufficientEvidence
  , userDirected: "..."         // note if placed at editor's direction against the stricter analytic read (Venezuela template)
  , decisionVsExecution: "..."  // separates a sound/unsound DECISION from good/bad EXECUTION
  , durability: "..."           // locked-in vs. reversible / leader-dependent
  , opportunityCost: "..."      // what was foregone
  , escalationRisk: "..."       // risk the move created
  , omissionNote: "..."         // a neglect / error-of-omission critique (something NOT done)
  */
};


/* ---- A second mini-example: an "unscored" entry (shape only) ----
   Shows how to take a country OFF the scoreboard honestly instead of inventing
   a judgment. `unscoredReason` is what keeps the map honest about what we are
   NOT claiming. */
const EXAMPLE_UNSCORED = {
  state: "neutral",
  effect: "unscored",
  magnitude: null,
  region: "South Asia",
  outcome: "Relationship largely unchanged over the term.",
  inherited: "Low-engagement; balancing between larger neighbors.",
  points: ["No distinct presidential initiative; what movement there was reflects the country's own politics."],
  role: "Bystander",
  confidence: "high",
  evidence: "adequate",
  contested: false,
  counterargument: "\u2014",
  sources: [],
  unscoredReason: "noPresidentialEffect"
};


/* ---- The US home entry stays special-cased (no effect scoring) ---- */
const EXAMPLE_US = {
  state: "us",
  effect: "unscored",
  magnitude: null,
  region: "\u2014",
  outcome: "\u2014",
  inherited: "\u2014",
  points: ["The United States."],
  role: "Bystander",
  confidence: "high",
  evidence: "adequate",
  contested: false,
  counterargument: "\u2014",
  sources: [],
  unscoredReason: "noPresidentialEffect"
};
