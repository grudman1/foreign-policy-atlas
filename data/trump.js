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
  blurb: "Relationship state &amp; Trump's effect vs. the inherited trajectory, by country &amp; region &mdash; May 2026",
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


/* ---- v3 entries (one assignment per country; appended as they are
        re-derived through the sourced pipeline) ---------------------- */

/* Foreign Policy Atlas — China (Trump 2nd term) — v3 entry.
   Pipeline: analyst=Claude (pack-only) · red-team=ChatGPT Pro · editor=Claude · sign adjudicated by user → mixed. 2026-05-23. */
window.PRESIDENTS["trump"].dossier["China"] = {
  state: "adversarial",
  effect: "mixed",
  magnitude: null,
  region: "East Asia",

  outcome: "An escalate-then-truce cycle that left the U.S. position roughly where it stood structurally inside an unresolved rivalry. Average China tariffs rose ~21%→~50% (real imports down ~28%), then the IEEPA basis was struck by the Supreme Court (Feb 20 2026) and partly rebuilt via Section 122/301. China demonstrated and then suspended (not resolved) its rare-earth chokepoint at Busan. Two summits (Busan Oct 2025; Beijing May 2026) produced a shallow, time-bound truce plus soybean/Boeing/ag deliverables, a 'strategic stability' pledge, and a TikTok JV — while the competition framework, tech controls, and record PLA pressure on Taiwan persisted. Most commitments expire by Nov 10 2026.",

  inherited: [
    "Biden's 'Invest, Align, Compete' framework — judged at the time by Carnegie as 'positive overall.'",
    "Tariffs already ~21%, with export and outbound-investment controls steepening.",
    "Fentanyl cooperation secured at the Nov 2023 summit, with 2024 precursor-scheduling momentum.",
    "Post-Lai (May 2024) PLA escalation trajectory on Taiwan.",
    "Structural Chinese weakness — property crisis, deflation, overcapacity."
  ],

  points: [
    "Trump's fast, high tariffs pushed the average China tariff ~21%→~50% and cut real U.S. imports from China ~28% in 2025 — reduced dependence by one reading, broad disruption by another [PIIE, Mar 16 2026]",
    "Those same tariffs hit Indo-Pacific allies (Japan, Korea, Philippines, Taiwan, EU), which Chatham House links to new distrust inside the anti-China coalition [Chatham House, Jul 2025]",
    "The tariff regime's IEEPA basis was struck 6-3 by the Supreme Court (Feb 20 2026), terminating the reciprocal and fentanyl tariffs and forcing a Section 122/301 rebuild with refunds unresolved [Tax Foundation, Feb 25 2026]",
    "Trump's escalation triggered China's Oct 2025 rare-earth controls, exposing U.S. reliance on its ~90% processing share, which were then suspended one year at Busan rather than resolved [China Briefing, Nov 12 2025]",
    "The fentanyl/overdose improvement began before Trump's term and isn't explained by 2025 tariffs per PIIE, so it cannot be banked as a Trump win [PIIE, ~May 2026]",
    "A record >$11B Taiwan arms package (Dec 2025) sat alongside a held-up ~$14B notification and a 'negotiating chip' framing of Taiwan arms, muddying the deterrence signal [Global Taiwan Institute, Apr 8 2026]",
    "Record 2025 PLA activity around Taiwan tracks a tempo that predates Trump (post-Lai, May 2024), so it is largely not a Trump-caused delta [CSIS ChinaPower, Feb 5 2026]",
    "CSIS's Scott Kennedy judged China entered the May 2026 Beijing summit 'far more confident' — an analyst read that informs the contested flag, not the sign [CNBC, May 14 2026]"
  ],

  role: "Accelerator",
  confidence: "medium",
  evidence: "adequate",
  contested: true,

  counterargument: "The strongest case is that this is 'hurt,' not 'mixed': the best-attributed effects are self-inflicted costs (allied coalition strain, exposure of rare-earth dependence, the IEEPA regime's legal invalidation, transactional Taiwan signaling), while the apparent wins are contaminated (import reduction came via broad disruption and allied friction; truces and rare-earth relief are temporary; fentanyl rode inherited momentum). The weaker opposing case is 'helped' via demonstrated resolve, a record Taiwan arms package, and forcing two summits.",

  levers: {
    security: "Mixed signal — record Dec 2025 arms package and 'imminent'/'not on his watch' rhetoric vs. a 'negotiating chip' posture and reported Xi consultation; PLA tempo itself is trajectory-driven, not Trump-caused.",
    leverage: "One two-way episode, scored symmetrically — Trump's tariffs triggered China's rare-earth squeeze (twice near-halting U.S. auto output); the U.S. used chip access; Busan suspended the controls for a year. Net leverage disputed.",
    rivalDenial: "Tech controls expanded (Entity List, 50% rule) then partly suspended at Busan; revenue-share Nvidia/AMD licensing blurred denial.",
    coalition: "Clearest self-inflicted cost — ally tariffs strained the anti-China coalition; bilateral-over-multilateral ASEAN approach criticized as ceding ground.",
    economicTech: "One policy bundle with several effects (not several wins) — tariffs to ~50%, then SCOTUS strike and partial rebuild; TikTok JV closed."
  },

  durability: "Low/uncertain — core de-escalation is time-bound (Nov 10 2026), the tariff mechanism was invalidated with refunds remanded, most summit commitments reversible. Caps magnitude; does not block a directional call.",
  opportunityCost: "Per PIIE/Lowy, the U.S. arguably let Beijing 're-sell' 2024 fentanyl measures for 'double points,' and ceded multilateral ground via one-off bilateral ASEAN deals.",
  escalationRisk: "Elevated — pre-Busan 'immediately' resume nuclear testing instruction, 'imminent' attack framing, and the escalate-to-145%-then-pause tariff pattern.",
  grandStrategyDispute: "Whether Trump is sustaining the inherited 'compete' strategy or diluting it toward transactional dealmaking (TikTok, the Taiwan 'negotiating chip,' China's tariff-cut emphasis) is genuinely unresolved.",

  sources: [
    {label: "PIIE — Trump-China trade wars: five takeaways (Mar 16 2026)", url: "https://www.piie.com/blogs/realtime-economics/2026/trump-china-trade-wars-five-takeaways-us-imports-2025"},
    {label: "Tax Foundation — Supreme Court strikes IEEPA tariffs (Feb 25 2026)", url: "https://taxfoundation.org/blog/supreme-court-trump-tariffs-ruling/"},
    {label: "China Briefing — China's rare earth export controls (Nov 12 2025)", url: "https://www.china-briefing.com/news/chinas-rare-earth-export-controls-impacts-on-businesses/"},
    {label: "Chatham House — Indo-Pacific allies unhappy about Trump's demands (Jul 2025)", url: "https://www.chathamhouse.org/2025/07/us-indo-pacific-allies-are-unhappy-about-trumps-defence-demands-they-have-comply"},
    {label: "PIIE — Fentanyl, China, and Trump's 2025 tariffs (~May 2026)", url: "https://www.piie.com/blogs/realtime-economics/2026/fentanyl-china-and-trumps-2025-tariffs"},
    {label: "Global Taiwan Institute — Will Trump continue to slow arms sales? (Apr 8 2026)", url: "https://globaltaiwan.org/2026/04/will-trump-continue-to-slow-arms-sales-to-taiwan/"},
    {label: "CNBC — Trump-Xi Beijing summit takeaways (May 14 2026)", url: "https://www.cnbc.com/2026/05/14/trump-xi-summit-beijing-takeaway-taiwan-trade-iran-war-strategic-relations-.html"},
    {label: "Brookings — What happened when Trump met Xi (Nov 5 2025)", url: "https://www.brookings.edu/articles/what-happened-when-trump-met-xi/"},
    {label: "CSIS ChinaPower — Tracking China's military activities 2025 (Feb 5 2026)", url: "https://chinapower.csis.org/china-increased-military-activities-indo-pacific-2025/"}
  ]
};
