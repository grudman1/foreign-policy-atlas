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

/* Foreign Policy Atlas — Russia (Trump 2nd term) — v3 entry.
   Pipeline: analyst=Claude (pack-only) · red-team=GPT · editor=Claude · sign adjudicated by user → hurt. 2026-05-25. */
window.PRESIDENTS["trump"].dossier["Russia"] = {
  state: "adversarial",
  effect: "hurt",
  magnitude: "material",
  region: "Europe/Eurasia",
  outcome: "War in Ukraine remained unresolved at the 24-month mark; inherited sanctions architecture largely preserved with selective new actions (EO 14329 secondary tariffs, Rosneft/Lukoil designations) while a leader-level bilateral channel was opened (Witkoff-Putin, Rubio-Lavrov, Alaska summit, Geneva U.S.-Ukraine draft framework); U.S. military aid to Ukraine fell sharply per secondary reporting; NATO burden shifted to Europe (Hague 5% pledge); New START expired without successor; talks reportedly stalled by April 2026.",
  inherited: [
    "EO 14024 sanctions architecture and REPO Act framework with ~$300B G7 immobilized Russian sovereign assets [Treasury, 2024-12-10]",
    "~$66.5–66.9B cumulative U.S. security assistance to Ukraine since 2022 invasion [DoD, 2025-01-15]",
    "January 10, 2025 Biden-era energy-sector sanctions package (Gazprom Neft, Surgutneftegas, ~80 entities) [State, 2025-01-10]",
    "Active war with Russia 'significantly degraded' but unresolved; New START still in force; ~12,000 DPRK troops deployed to Kursk [White House, 2024-12-18]"
  ],
  points: [
    "Trump opened a leader-level bilateral channel — Witkoff secured Marc Fogel's release, Rubio-Lavrov established a consultation mechanism, and an Alaska summit was followed by a White House meeting with Zelensky and European leaders; substantive terms from Alaska and the October 16 Trump-Putin call are not in primary sources [White House, 2025-08-19]",
    "The November 23 Geneva talks produced a U.S.-Ukraine 'updated and refined peace framework' that the Ukrainian delegation said addressed its principal concerns, but the pack documents no Russian acceptance or trilateral endorsement [White House, 2025-11-23]",
    "Trump preserved EO 14024 (April 10, 2025 renewal) and added selective new pressure — EO 14329 imposing a 25% ad valorem secondary tariff on importers of Russian oil and OFAC's October 22 designation of Rosneft and Lukoil with an explicit ceasefire demand; full EO 14329 text and follow-on country determinations remain partly unretrieved [OFAC, 2025-10-22]",
    "Secondary analysis reports U.S. military aid to Ukraine fell from above $19B in 2024 to ~$400M authorized for 2026 (~98% reduction); a July 2025 Pentagon 'capability review' paused transfers before partial resumption [Foreign Affairs, 2026-05-15]",
    "Administration publicly narrowed Ukraine's end-state before negotiations — Hegseth declared NATO membership 'not a realistic outcome' and demanded Europe provide the 'overwhelming share' of aid; Sen. Durbin charged Trump 'publicly gave away huge concessions' on 1991 borders and NATO membership [DoD, 2025-02-12]",
    "The Hague Summit codified a 5%-of-GDP allied spending pledge by 2035 with Russia named the 'long-term threat'; pack does not establish Trump as the primary cause versus European reaction to Russia and longstanding burden-sharing pressure [NATO, 2025-06-25]",
    "New START expired February 5, 2026 with no successor framework or negotiating mandate documented, and the U.S. announcing a 'new era' of arms control while alleging Russian violations [State, 2026-02-01]",
    "Russia continued and intensified attacks during the diplomatic process — Sen. Wicker cited Russia's 'largest aerial attack of the war' in September 2025 (800+ drones/missiles); a February 24, 2026 White House 'Peace Through Strength' fact sheet listing eight 'ended' conflicts did not include Russia-Ukraine; Foreign Affairs reported talks 'placed on hold' by April 2026 and a temporary unsanctioning of Russian oil after the Strait of Hormuz closure [Foreign Affairs, 2026-04-07]",
    "Human rights framing receded — Rubio's Russia National Day statement omitted human rights conditions, Riyadh and peace readouts contained no political prisoner language, USAID dismantling halted anti-Russia disinformation programming, and the 2025 NSS critiqued post-Cold War democracy promotion [White House, 2025-12-01]"
  ],
  role: "Architect",
  confidence: "low",
  evidence: "adequate",
  contested: true,
  counterargument: "A serious critic argues this is 'hurt,' not 'mixed': the administration publicly conceded core Ukrainian positions on 1991 borders and NATO membership before negotiating, paused and then cut military aid ~98% per secondary reporting, let New START expire without successor, reportedly temporarily unsanctioned Russian oil under market pressure, and after 16 months of intensive diplomacy produced no ceasefire while Russia launched its largest aerial attack of the war in September 2025 and talks stalled by April 2026. The sanctions architecture credited as 'preserved and selectively escalated' is largely inherited; the Hague 5% pledge is plausibly driven by Europe's own threat perception; and the bilateral channel's concrete Russia-side concessions are not documented in primary pack sources (Alaska and October 16 call substance is undisclosed). The defense is that detainee releases occurred, sanctions were not dismantled wholesale, new coercive instruments (EO 14329, Rosneft/Lukoil) were added with explicit ceasefire linkage, and a U.S.-Ukraine draft framework was produced — outputs absent under a counterfactual of pure withdrawal. The dispute is genuine and the pack's primary-source opacity on the bilateral channel's substance prevents resolution.",
  levers: {
    security: "Aid to Ukraine paused July 2025 then partially resumed; secondary reporting cites ~98% reduction by 2026; no U.S. troops for any post-war mission; submarine repositioning in August 2025 as signaling [DoD, 2025-08-07]",
    leverage: "EO 14329 secondary tariffs and Rosneft/Lukoil designations explicitly tied to ceasefire demand, but offset by reported temporary oil-sanctions relief in 2026, multiple SDN removals (Usmanov-linked, year-end batches), and Gibson Dunn's observation that the pace of new Russia sanctions slowed in 2025 [OFAC, 2025-10-22]",
    coalition: "Hegseth's Brussels speech and Hague 5% pledge shifted burden to Europe; publicly ruled out Ukrainian NATO membership before talks; UK/France designated as core security-guarantee providers [DoD, 2025-02-12]",
    economicTech: "BIS Entity List additions and Aeroflot/UTair/Rossiya TDO renewals maintained; affiliate end-user controls expanded then suspended for one year (Russia-applicability not determinable from retrieved text); criminal export-control prosecutions continued [Federal Register, 2025-11-13]"
  },
  durability: "Low to medium — the Geneva draft is unsigned and Russia is not documented as a party; the bilateral channel depends on personal Trump-Putin engagement; New START's expiration creates a structural arms-control vacuum; the aid drawdown and 2026 NDS Line of Effort 3 ('allies will take the lead' in Europe) are institutionalized in strategy documents that outlast any single negotiation.",
  opportunityCost: "Sustained engagement with Russia and the burden-shift to Europe freed U.S. munitions and political bandwidth toward the Indo-Pacific per the 2026 NDS, but consumed senior principal time (Rubio, Witkoff, Kushner) on an unresolved file, and foreclosed harder coercive options (Graham's S.1241 500% tariffs never advanced).",
  escalationRisk: "Material — Russia's September 2025 largest-aerial-attack-of-the-war, submarine repositioning, North Korean troop involvement in Kursk inherited from baseline, and New START expiration without successor all raise vertical and horizontal escalation risk; offset only partially by the active bilateral channel, whose substantive outputs are largely undisclosed.",
  decisionVsExecution: "Decision quality is contested (concessions on borders/NATO before talks per Durbin floor statement; publicly narrowed end-state per Hegseth); execution showed unusual presidential-level attention (Alaska summit, October 16 call, Geneva), but the pack shows no closed deal, no documented Russia-side concession, and a stalled process by April 2026.",
  crossTheaterTradeoff: "The 2026 NDS explicitly subordinates Europe to Indo-Pacific China deterrence ('allies will take the lead against threats less severe for us'); Foreign Affairs reports administration focus shifted to Iran after the March 2026 Strait of Hormuz closure, directly displacing Ukraine diplomatic bandwidth and reportedly triggering temporary Russian oil sanctions relief.",
  grandStrategyDispute: "Reflects the pack's core dispute: restrainer/prioritizer school (burden-shift to Europe, end forever wars, focus on China) vs. primacist/coalition school (sanctions must coerce, allies need U.S. leadership, Russia is the proximate threat). The administration operationalized the former while retaining selective coercive tools, with disputed net effect on Ukraine's negotiating position.",
  longHorizon: "Pack-supported long-horizon effects: codified European 5% defense spending trajectory through 2035, institutionalized 'Europe leads' posture in 2026 NDS, post-New START arms-control vacuum requiring a new framework, and weakening of democracy/anti-disinformation ecosystem via USAID dismantling.",
  omissionNote: "Pack does not include Russian MFA/Kremlin readouts, the Alaska summit textual readout, the substance of the October 16 Trump-Putin call, the U.S. 'comprehensive peace plan' or '28-point plan' text, primary documentation of the post-March 2026 temporary oil-sanctions rollback beyond Foreign Affairs, primary budget/execution data for the ~98% aid cut figure, or evidence of Russian acceptance of the Geneva draft.",
  linkedPolicies: ["Ukraine", "NATO/Europe", "China", "Iran", "North Korea"],
  sources: [
    {label: "State Department — Sweeping sanctions on Russia's energy sector (Jan 10, 2025 baseline)", url: "https://2021-2025.state.gov/office-of-the-spokesperson/releases/2025/01/sweeping-sanctions-on-russias-energy-sector/"},
    {label: "DoD — Support for Ukraine timeline", url: "https://www.defense.gov/Spotlights/Support-for-Ukraine/Timeline/"},
    {label: "Treasury — $20B ERA disbursement to Ukraine", url: "https://home.treasury.gov/news/press-releases/jy2744"},
    {label: "White House — NSA statement on Fogel release", url: "https://www.whitehouse.gov/briefings-statements/2025/02/statement-from-the-national-security-advisor/"},
    {label: "State — Rubio-Lavrov meeting Feb 18, 2025", url: "https://www.state.gov/secretary-rubios-meeting-with-russian-foreign-minister-lavrov"},
    {label: "White House — Outcomes of US-Russia expert groups Black Sea (Riyadh)", url: "https://www.whitehouse.gov/briefings-statements/2025/03/outcomes-of-the-united-states-and-russia-expert-groups-on-the-black-sea/"},
    {label: "Federal Register — Continuation of EO 14024 emergency (Trump)", url: "https://www.federalregister.gov/documents/2025/04/14/2025-06399/continuation-of-the-national-emergency-with-respect-to-specified-harmful-foreign-activities-of-the-government-of-the-russian-federation"},
    {label: "Federal Register — EO 14329 Addressing Threats", url: "https://www.federalregister.gov/documents/2025/08/11/2025-15267/addressing-threats-to-the-united-states-by-the-government-of-the-russian-federation"},
    {label: "White House — Peace summit hailed game-changer (Aug 18-19)", url: "https://www.whitehouse.gov/releases/2025/08/president-trumps-peace-summit-hailed-as-a-game-changer/"},
    {label: "OFAC — Rosneft/Lukoil designations Oct 22, 2025", url: "https://ofac.treasury.gov/recent-actions/20251022"},
    {label: "White House — Joint Statement US-Ukraine Geneva talks", url: "https://www.whitehouse.gov/briefings-statements/2025/11/joint-statement-on-united-states-ukraine-meeting/"},
    {label: "DoD — 2026 National Defense Strategy", url: "https://media.defense.gov/2026/Jan/23/2003864773/-1/-1/0/2026-NATIONAL-DEFENSE-STRATEGY.PDF"},
    {label: "State — CD statement on New START expiration", url: "https://www.state.gov/releases/bureau-of-arms-control-and-nonproliferation/2026/02/statement-to-the-conference-on-disarmament-2/"},
    {label: "White House — Peace Through Strength fact sheet (Feb 24, 2026)", url: "https://www.whitehouse.gov/articles/2026/02/president-trumps-peace-through-strength-renewed-american-leadership-and-global-security/"},
    {label: "Foreign Affairs — Flawed Formula for Peace in Ukraine", url: "https://www.foreignaffairs.com/ukraine/flawed-formula-peace-ukraine"},
    {label: "Foreign Affairs — How Europe Found Its Nerve", url: "https://www.foreignaffairs.com/europe/how-europe-found-its-nerve"},
    {label: "DoD — Hegseth opening remarks UDCG Brussels", url: "https://www.defense.gov/News/Speeches/Speech/article/4064113/opening-remarks-by-secretary-of-defense-pete-hegseth-at-ukraine-defense-contact/"},
    {label: "NATO — The Hague Summit Declaration", url: "https://www.nato.int/en/about-us/official-texts-and-resources/official-texts/2025/06/25/the-hague-summit-declaration"},
    {label: "DoD — Capability review on Ukraine aid", url: "https://www.defense.gov/News/News-Stories/Article/Article/4234179/dod-capability-review-to-analyze-where-military-aid-goes-ensure-america-is-first/"},
    {label: "Congressional Record — Durbin floor statement on concessions", url: "https://www.congress.gov/119/crec/2025/02/18/171/32/modified/CREC-2025-02-18-pt1-PgS1002.htm"},
    {label: "Congressional Record — Wicker floor on Russia largest aerial attack", url: "https://www.congress.gov/119/crec/2025/09/09/171/147/modified/CREC-2025-09-09-pt1-PgS6447-2.htm"},
    {label: "White House — 2025 National Security Strategy", url: "https://www.whitehouse.gov/wp-content/uploads/2025/12/2025-National-Security-Strategy.pdf"},
    {label: "State — Russia Travel Advisory Level 4", url: "https://travel.state.gov/en/international-travel/travel-advisories/russia.html"},
    {label: "State — 2025 TIP Report Russia Tier 3", url: "https://www.state.gov/reports/2025-trafficking-in-persons-report/russia"},
    {label: "Gibson Dunn — International Trade 2025 Year-End Update", url: "https://www.gibsondunn.com/international-trade-2025-year-end-update"}
  ]
};
