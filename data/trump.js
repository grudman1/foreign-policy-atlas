/* =====================================================================
   Foreign Policy Atlas — Donald Trump, 2nd term  (LIVE data file)

   Clean-room state. The president-level metadata (id/label/subject/
   headline/blurb/asOf/foot) is the v3 chrome; the dossier currently
   holds ONLY the US home entry, and regions/outcomes are empty. Every
   per-country entry that ships from here forward must be re-derived
   into v3 shape (see CLAUDE.md → schema, data/_example.js → worked
   template). Until that happens the live map shows the no-data color
   for everything except the United States — that is the intended
   resting state, not a regression.

   The pre-v3 v2 entries (the old state + delta + baseline ledger) are
   archived in data/_trump-v2-scaffold.js as inert reference leads.
   That file is NOT loaded by index.html and does NOT register on
   window.PRESIDENTS. Treat scaffold content as starting points to
   re-source, never as finished claims to copy.
   ===================================================================== */

window.PRESIDENTS = window.PRESIDENTS || {};
window.PRESIDENTS["trump"] = {
  id: "trump",
  label: "Donald Trump — 2nd term",
  subject: "Trump",
  headline: "U.S. Strategic Position — Trump Second Term",
  blurb: "Alignment state &amp; shift from the Biden baseline, by country &amp; region &mdash; May 2026",
  asOf: "May 2026 (projected timeline)",
  foot:
  "<b>Method &amp; caveats.</b> Every entry uses a two-axis read. "+
  "<b>State</b> (color) is where the relationship stands as of May 2026 &mdash; core-ally, aligned, neutral, strained, or adversarial. "+
  "<b>Effect</b> (arrow) is what Trump <i>caused</i> versus the trajectory he inherited &mdash; &#8593; helped, &mdash; mixed/unclear, &#8595; hurt, or &middot; unscored. Magnitude (modest / material / major) shows in the arrow's weight and applies only to helped/hurt. "+
  "The combination is the point: a country can be adversarial-but-helped, or a core-ally-that-got-hurt. "+
  "Each effect is measured against the <b>inherited trajectory</b> shown in the entry &mdash; the fixed counterfactual, not an idealized baseline &mdash; and the <b>outcome</b> (what happened) is kept separate from the effect (what Trump caused); credit and blame are applied symmetrically. "+
  "Not every country is scored: an entry is <b>unscored</b> when nothing of strategic consequence happened, when the change wasn't driven by the president, or when the evidence is insufficient &mdash; an honest blank beats a guess. "+
  "Contested calls are flagged, and every scored entry carries the strongest <b>counterargument</b> against it. "+
  "Outcome lines (best / base / downside) are explicitly analytical projections, not predictions &mdash; the spread is the point. "+
  "Where a placement is set at the editor's direction against the stricter analytic read, the entry says so. "+
  "Regional 'stakes' deliberately state both the upside and the damage case. Region label positions are approximate, for navigation only. "+
  "<i>Effect-scoring is being migrated to this model; entries not yet re-derived appear unscored (color only, no arrow).</i>",
  dossier: {
    "United States of America": {
      state:"us", effect:"unscored", magnitude:null, region:"—",
      outcome:"—", inherited:"—", points:["The United States."],
      role:"Bystander", confidence:"high", evidence:"adequate",
      contested:false, counterargument:"—", sources:[],
      unscoredReason:"noPresidentialEffect"
    }
  },
  regions: {},
  outcomes: {}
};
