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
  role: "Accelerator",
  confidence: "low",
  evidence: "adequate",
  contested: true,
  counterargument: "The strongest case for 'mixed' rather than 'hurt': Trump's engagement produced documented outputs absent under a counterfactual of pure disengagement — Marc Fogel's release, the Rubio-Lavrov consultation mechanism, an Alaska leader summit, and a U.S.-Ukraine Geneva framework the Ukrainian delegation said addressed its principal concerns. The inherited sanctions architecture was preserved (EO 14024 renewed April 2025) and selectively escalated with new instruments: EO 14329's 25% secondary tariff on Russian oil importers and the October 2025 Rosneft/Lukoil OFAC designations both carried explicit ceasefire demands. The ~98% aid reduction figure is from Foreign Affairs analysis, not primary DoD budget execution data, and the Hague 5% burden-shift is plausibly driven by European threat perception rather than U.S. abdication. On this reading, the administration maintained coercive tools, opened an unprecedented diplomatic channel, and kept Ukraine in a negotiating posture — a meaningful distinction from abandonment, and one that leaves the net effect genuinely contested given the pack's opacity on the bilateral channel's substantive outputs.",
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


/* =====================================================================
   Batch 1 — overnight re-derivation run, 2026-05-25
   22 entries appended below.
   6 held back for re-derivation/fix: United Kingdom (invented role),
   Israel (invented levers keys), United Arab Emirates (missing magnitude),
   Turkey (linkedPolicies nested in levers), Jordan (invented state),
   Finland (points emitted as objects instead of strings).
   ===================================================================== */

/* Foreign Policy Atlas — Canada (Trump 2nd term) — v3 entry from batch-1 overnight run.
   Pipeline: analyst=Claude (pack-only) · red-team=GPT · editor=Claude · tiebreaker auto-adjudicated. 2026-05-25. */
window.PRESIDENTS["trump"].dossier["Canada"] = {
  state: "strained",
  effect: "hurt",
  magnitude: "material",
  region: "North America",
  outcome: "By May 2026, the U.S.-Canada relationship — historically one of the deepest bilateral partnerships — was reshaped by IEEPA and Section 232 tariff escalation and Canadian retaliation, with PM Carney declaring the 'old relationship... is over' and Canada announcing a strategic pivot toward diversification and Arctic autonomy; the operational core (USMCA-compliant trade carve-outs, FMS pipeline, G7 cooperation under Canada's presidency, NADD trilateral coordination) continued to function, but no bilateral trade settlement was reached and a secondary-sourced PJBD suspension was reported in May 2026.",
  inherited: "At handoff, the U.S.-Canada relationship was the world's largest bilateral commercial dyad ($921B in 2023 goods trade, $2.5B/day) with deep FDI integration, active NORAD modernization and Arctic cooperation including F-35 and icebreaker collaboration, a near-complete Columbia River Treaty modernization, and unresolved but manageable disputes on dairy TRQs, softwood lumber, digital services tax, and Canadian NATO spending below 2% GDP. CRS explicitly flagged a 'renewed era of uncertainty' tied to Trump's campaign tariff proposals, meaning some deterioration was on the inherited trajectory.",
  points: [
    "EO 14193 imposed a 25% IEEPA tariff on Canadian goods citing fentanyl flows, invoking a national-emergency framework against the closest U.S. trading partner [White House, 2025-02-01].",
    "The IEEPA tariff was raised to 35% effective August 1, 2025, citing Canada's 'continued inaction and retaliation,' with a 40% transshipment penalty added; USMCA-qualifying goods remained exempt [White House, 2025-07-31].",
    "Section 232 tariffs of 25% on Canadian steel and aluminum were reinstated effective March 12, 2025, terminating Canada's prior exemption, and were later extended to autos and medium/heavy vehicles [Federal Register, 2025-02-18].",
    "Canada imposed 25% retaliatory tariffs on C$30 billion of U.S. goods on February 4, 2025 and an additional C$29.8 billion on March 13, with PM Carney publicly declaring the 'old relationship... is over' (secondary-sourced quote) [CFR, 2025-03-26].",
    "Bilateral re-engagement produced three Trump-Carney meetings (May 6, June 16, October 7, 2025) and a Kananaskis pledge to negotiate a 'new economic and security relationship,' but no bilateral framework was announced in the primary record through May 2026 [PM of Canada, 2025-06-16].",
    "Canada partially de-escalated by removing most March 2025 counter-tariffs effective September 1, 2025, explicitly citing the U.S. allowing most Canadian goods to enter tariff-free under CUSMA, while retaining steel, aluminum, and auto measures [Department of Finance Canada, 2025-09-01].",
    "Defense cooperation continued via a $1.75B HIMARS/ATACMS FMS notification and a $540M C-17 sustainment FMS, even as Al Jazeera reported (citing Undersecretary Colby's social media) that DoD would halt participation in the Permanent Joint Board on Defense — not corroborated by primary DoD/State sources [Al Jazeera, 2026-05-18].",
    "Trilateral coordination persisted: NADD reconvened in Ottawa in January 2026 on counternarcotics and FTO-designated cartels, and G7 cooperation under Canada's presidency produced joint outputs on Ukraine, Iran, and Hong Kong [White House, 2026-02-02]."
  ],
  role: "Spoiler",
  confidence: "medium",
  evidence: "adequate",
  contested: true,
  counterargument: "The sign is genuinely contested. The pro-mixed case is substantial: USMCA-compliant goods — the bulk of bilateral trade — remained tariff-free under carve-outs; Canada itself rolled back most March counter-tariffs by September 1 in explicit recognition of that carve-out structure; FMS pipelines expanded; G7 cooperation under Canada's presidency produced joint outputs on Ukraine, Iran, and Hong Kong; trilateral NADD coordination deepened; no intelligence-sharing rupture is documented; and EO 14389 began terminating some IEEPA actions in February 2026. On this reading, the president used coercive leverage to force renegotiation of an inherited imbalance without breaking the alliance's operational core, and a meaningful share of the deterioration was the inherited trajectory CRS already flagged. The 'hurt' call rests on the durable political rupture, Canada's stated strategic pivot, the absence of a concluded bilateral framework after 16 months, and the secondary-sourced PJBD suspension. Net causal effect attributable to presidential agency beyond the inherited path is real but narrower than a 'major' framing would imply, which is why magnitude is moderate and confidence is medium.",
  durability: "Low-to-moderate. Tariff actions are reversible by EO (EO 14389 in February 2026 began terminating some IEEPA actions, though scope as applied to Canada is unclear in retrieved text), but Canada's stated 'strategic imperative' to diversify trade, fortify Arctic security, and 'fundamentally reimagine' its economy reflects a political shift that will outlast tariff schedules. The mandatory USMCA 2026 joint review is a forcing function either way.",
  opportunityCost: "Bandwidth and leverage spent coercing the closest treaty ally on a fentanyl framing (Canada is a marginal northern-border fentanyl source) displaced potential gains on inherited live disputes — dairy TRQ enforcement, DST resolution, softwood lumber, and a coordinated North American posture toward PRC investment screening — areas where Canada had been moving in U.S.-aligned directions pre-inauguration.",
  escalationRisk: "Contained to economic and rhetorical domains; no primary-sourced military or intelligence-sharing rupture is documented. The secondary-sourced PJBD suspension and Canadian calls (not yet enacted) to weaponize critical mineral exports suggest the escalation ladder extended further than at handoff, but the operational defense relationship continued.",
  decisionVsExecution: "Tariff decisions (impositions, rate hikes, sectoral expansions) executed cleanly via EO and Federal Register actions. The negotiation track shows an execution gap: the Kananaskis pledge to negotiate a new framework did not produce an announced deal through May 2026, though primary sources do not confirm whether the 30-day timeline lapsed, was extended, or was superseded.",
  crossTheaterTradeoff: "The fentanyl/IEEPA framing applied to Canada parallels the Mexico track and reinforces the Western Hemisphere primacy doctrine in the November 2025 NSS; the Canadian application signals to other allies that treaty status confers no automatic tariff immunity, even as USMCA carve-outs preserved most of the trade flow.",
  longHorizon: "Canada's announced pivots — Arctic security autonomy, G7 economic diversification, expanded unilateral export controls on semiconductors/quantum, and a unified Sanctions and Export Controls Bureau — represent structural hedging likely to persist beyond any tariff settlement.",
  omissionNote: "Primary-source gaps on the PJBD suspension (secondary only), post-October 2025 Trump-Carney contacts, Canada-specific USMCA review tracks, the status of the 'new economic and security relationship' negotiations, EO 14389's scope as applied to Canada, and intelligence-sharing status limit confidence on both the de-escalation trajectory and the operational-core narrative.",
  levers: {
    economicTech: "IEEPA tariffs (25% then 35%, with 40% transshipment penalty), Section 232 on steel/aluminum/autos/medium-heavy vehicles, and Proclamation 11002 on semiconductors with use-based (not country-based) exemptions; non-stacking rule limited cumulative burden; USMCA-compliant carve-outs preserved most bilateral trade flow.",
    security: "FMS pipeline sustained ($1.75B HIMARS/ATACMS; $540M C-17 sustainment) and Arctic/NORAD doctrinal language preserved; burden-sharing pressure intensified via the 2026 NDS; reported (secondary only) PJBD participation halt in May 2026.",
    coalition: "G7 cooperation under Canada's presidency produced joint outputs (Charlevoix, Niagara, Munich) on Ukraine, Iran, Hong Kong; trilateral NADD reconvened in Ottawa January 2026 on counternarcotics and FTO-designated cartels.",
    leverage: "Tariff escalation explicitly tied to fentanyl interdiction and 'retaliation,' with USMCA-compliant carve-outs preserved as the inducement structure; the 2026 USMCA Joint Review used as forward leverage."
  },
  linkedPolicies: ["Mexico"],
  sources: [
    {label: "White House — EO 14193 (IEEPA tariff on Canada)", url: "https://www.whitehouse.gov/presidential-actions/2025/02/imposing-duties-to-address-the-flow-of-illicit-drugs-across-our-national-border/"},
    {label: "White House — Fact sheet raising IEEPA tariff to 35%", url: "https://www.whitehouse.gov/fact-sheets/2025/07/fact-sheet-president-donald-j-trump-amends-duties-to-address-the-flow-of-illicit-drugs-across-our-northern-border/"},
    {label: "Federal Register — Section 232 aluminum reinstatement", url: "https://www.federalregister.gov/documents/2025/02/18/2025-02832/adjusting-imports-of-aluminum-into-the-united-states"},
    {label: "Federal Register — Section 232 steel reinstatement", url: "https://www.federalregister.gov/documents/2025/02/18/2025-02833/adjusting-imports-of-steel-into-the-united-states"},
    {label: "Department of Finance Canada — C$29.8B counter-tariffs", url: "https://www.canada.ca/en/department-finance/news/2025/03/canada-responds-to-unjustified-us-tariffs-on-canadian-steel-and-aluminum-products.html"},
    {label: "Department of Finance Canada — Sept 1, 2025 counter-tariff removal", url: "https://www.canada.ca/en/department-finance/programs/international-trade-finance-policy/canadas-response-us-tariffs/complete-list-us-products-subject-to-counter-tariffs.html"},
    {label: "PM of Canada — Trump-Carney meeting May 6, 2025", url: "https://www.pm.gc.ca/en/news/news-releases/2025/05/06/prime-minister-carney-meets-president-trump"},
    {label: "PM of Canada — Kananaskis bilateral June 16, 2025", url: "https://www.pm.gc.ca/en/news/readouts/2025/06/16/prime-minister-carney-meets-president-united-states-donald-j-trump"},
    {label: "DSCA — Canada HIMARS/ATACMS FMS $1.75B", url: "https://media.defense.gov/2025/Oct/01/2003813821/-1/-1/0/PRESS%20RELEASE%20-%20CANADA%2025-76%20CN.PDF"},
    {label: "USTR — Public comment on USMCA Joint Review", url: "https://ustr.gov/about/policy-offices/press-office/press-releases/2025/september/ustr-seeks-public-comment-joint-review-usmca"},
    {label: "CRS — U.S.-Canada Relations (R47620)", url: "https://www.congress.gov/crs-product/R47620"},
    {label: "CFR — Canada Lays Groundwork for Pivot Away from U.S.", url: "https://www.cfr.org/articles/canada-lays-groundwork-pivot-away-united-states"},
    {label: "Al Jazeera — U.S. suspends PJBD participation (secondary)", url: "https://www.aljazeera.com/news/2026/5/18/us-suspends-joint-defence-effort-with-canada-dating-back-to-world-war-ii"},
    {label: "White House — Ninth NADD meeting Ottawa", url: "https://www.whitehouse.gov/releases/2026/02/ninth-meeting-of-the-north-american-drug-dialogue/"},
    {label: "Federal Register — EO 14389 (terminating certain IEEPA tariff actions)", url: "https://www.federalregister.gov/documents/full_text/html/2026/02/25/2026-03832.html"},
    {label: "White House — March 6 tiered tariff adjustment (USMCA-compliant exemption)", url: "https://www.whitehouse.gov/fact-sheets/2025/03/fact-sheet-president-donald-j-trump-adjusts-tariffs-on-canada-and-mexico-to-minimize-disruption-to-the-automotive-industry/"}
  ]
};

/* Foreign Policy Atlas — Germany (Trump 2nd term) — v3 entry from batch-1 overnight run.
   Pipeline: analyst=Claude (pack-only) · red-team=GPT · editor=Claude · tiebreaker auto-adjudicated. 2026-05-25. */
window.PRESIDENTS["trump"].dossier["Germany"] = {
  state: "strained",
  effect: "mixed",
  magnitude: null,
  region: "Europe",
  outcome: "Germany dramatically increased defense spending (pledging 5% of GDP by 2035, 3.5% core by 2029), amended its constitutional debt brake to unlock €533B in infrastructure and uncapped defense spending, activated a permanent armored brigade in Lithuania, and replaced the U.S. as Ukraine's principal military backer — outcomes plausibly driven more by German electoral politics and hedging against U.S. unreliability than by Trump pressure — while bilateral ties frayed over tariffs (including a Greenland-linked coercion episode), Iran strategy, an NSS critical of Europe, and a May 2026 announcement to withdraw ~5,000 U.S. troops from Germany.",
  inherited: [
    "Biden-era close coordination with Scholz government on Ukraine, with Germany already crossing the 2% NATO threshold for the first time in 2024 and committing ~35,000 troops and 200+ aircraft/ships to the new NATO Force Model from 2025.",
    "€100B Sondervermögen drawdowns producing ~€72B in 2024 defense resources; Germany hosting ~35,000 U.S. troops and EUCOM headquarters; deep S&T, space, and quantum cooperation tracks active; Germany already the second-largest bilateral donor to Ukraine."
  ],
  points: [
    "Sustained U.S. pressure — Hegseth telling NATO that '2 percent is a start, but it's not enough, nor is 3 percent, nor is 4 percent' — preceded Germany's alliance-wide Hague Summit pledge to 5% of GDP (3.5% core by 2029) [Department of Defense, 2025-02-13].",
    "Germany's March 2025 constitutional debt-brake amendment was driven by domestic electoral arithmetic — passed by the outgoing Bundestag to avoid an AfD/Left veto after the February 2025 snap election — not by U.S. bilateral pressure [Congressional Research Service, 2025-03-19].",
    "Chancellor Merz inaugurated the 45th Armored Brigade in Lithuania, declaring Germany was 'taking the defense of NATO's eastern flank into our own hands,' with ~4,800 personnel planned [Atlantic Council, 2025-05-30].",
    "Hegseth thanked Pistorius at the Pentagon for 'stepping up,' citing 'incredible progress... with Germany taking the leap on that upfront commitment to your spending' [Department of Defense, 2025-07-14].",
    "Trump's EO 14257 imposed reciprocal tariffs on the EU including Germany, followed by Section 232 actions on autos, steel, aluminum, and (January 2026) semiconductors directly hitting German exporters [Federal Register, 2025-04-02].",
    "Trump pledged escalating 10–25% tariffs on eight NATO allies including Germany over Greenland (Jan 17, 2026), withdrawn four days later — an extraordinary coercive use of trade policy against a treaty ally [Congressional Research Service, 2026-01-17].",
    "A U.S.-EU framework deal (with EU commitments of $750B in U.S. energy and $600B in U.S. investment by 2028, plus zero tariffs on U.S. industrial goods) opened a negotiation track, though legal text and final rates remain unresolved [White House, 2025-07-28].",
    "The U.S. welcomed the E3 (France, Germany, UK) initiation of UNSCR 2231 snapback sanctions on Iran, a cooperative win on nonproliferation [State Department, 2025-08-01].",
    "Trump announced plans to pull ~5,000 U.S. troops, reportedly linked to Merz's criticism of Trump's Iran war strategy, with initial Germany framing later shifted toward delaying a Poland brigade rotation [Reuters, 2026-05-21].",
    "Germany became Ukraine's principal military backer, expecting to supply 100,000 artillery shells in 2026 and PAC-3 missiles from 2027 — a development that signals U.S. retrenchment as much as German burden-sharing [Reuters, 2026-05-15].",
    "The November 2025 National Security Strategy reoriented U.S. policy with 'a pointed critique of the European project' and cast the U.S. as a 'neutral arbiter' on Ukraine, unsettling German planners [Atlantic Council, 2025-12-15].",
    "Merz publicly stated his 'absolute priority' was to strengthen Europe to achieve greater independence from the U.S., indicating German rearmament reflects hedging against Washington rather than a strengthened bilateral relationship [Congressional Research Service, 2025-03-19]."
  ],
  role: "Accelerator",
  confidence: "medium",
  evidence: "adequate",
  contested: true,
  counterargument: "A reasonable analyst could score this 'helped': Trump's sustained 5% demand coincided with Germany's defense transformation — debt-brake reform, the Lithuania brigade, 3.5% by 2029, and Germany overtaking the U.S. as Ukraine's lead military backer all materialized on his watch, and Hegseth/Rutte explicitly credited U.S. pressure. Conversely, an equally strong 'hurt' case exists: the directly attributable Trump actions toward Germany — tariffs, Section 232 on autos/steel/aluminum/semiconductors, Greenland-linked coercion, troop drawdowns, NSS critique of Europe, and Article 5 doubts — were predominantly adverse, while the favorable defense outcomes were largely endogenous to German electoral politics, the Russia threat, and explicit hedging against U.S. unreliability. The 'mixed' verdict reflects genuine indeterminacy about counterfactual causation: Germany was already rearming on an upward 2024 trajectory, and Merz's stated priority of independence from the U.S. cuts against attributing the spending surge to a strengthened bilateral relationship.",
  durability: "Germany's debt-brake amendment is constitutional and the 5% pledge has a 2035 horizon with a first checkpoint in 2029 — structurally durable, though largely independent of U.S. policy. The troop-withdrawal episode and Merz's strategic-autonomy framing also have durability: even if reversed, they have crystallized German planning assumptions about U.S. unreliability.",
  opportunityCost: "No bilateral U.S.-Germany technology instrument was concluded during the window despite Technology Prosperity Deals being signed with the UK, Japan, South Korea, and a framework with the UAE; Germany's absence from this architecture forgoes a natural anchor for transatlantic AI/quantum/nuclear cooperation.",
  escalationRisk: "The May 2026 troop-withdrawal announcement, characterized by the Atlantic Council as 'pique' over Iran rather than strategic calculation, raises the risk that further bilateral disputes trigger additional posture cuts; Trump's reported questioning of Article 5 and the Greenland-linked tariff episode amplify this risk.",
  decisionVsExecution: "The 5% pressure campaign was a deliberate presidential decision executed through Hegseth and the Hague Summit. The May 2026 troop announcement and Greenland-linked tariff pledge appear more reactive — Atlantic Council characterized the troop move as 'pique' over Merz's Iran criticism — with confused execution (initial Germany framing shifted to Poland brigade delay; Greenland tariffs withdrawn within four days).",
  crossTheaterTradeoff: "The April 2025 Army Transformation Directive explicitly prioritized homeland defense and Indo-Pacific deterrence over European armor, signaling that German-hosted U.S. forces are a bill-payer for the China pivot regardless of bilateral specifics.",
  longHorizon: "Germany's 'strongest conventional army in Europe' pledge, the April 2026 military strategy, and the Bundeswehr's role as Ukraine's principal backer represent a multi-decade reorientation of European security architecture toward German leadership — driven primarily by the Russia threat and doubts about U.S. reliability, with U.S. pressure a contributing but not dispositive factor.",
  omissionNote: "No bilateral joint statement or communiqué from either Trump-Merz White House bilateral (June 2025, March 2026) surfaced in retrieved primary sources; substantive deliverables, if any, are not documented.",
  linkedPolicies: ["Ukraine", "Lithuania", "Poland", "France", "United Kingdom", "Iran", "Denmark"],
  sources: [
    {label: "Department of Defense — Hegseth NATO press conference", url: "https://www.defense.gov/News/Transcripts/Transcript/Article/4066734/secretary-of-defense-pete-hegseth-press-conference-following-nato-ministers-of/"},
    {label: "Atlantic Council — NATO's eastern flank", url: "https://www.atlanticcouncil.org/blogs/new-atlanticist/how-natos-eastern-flank-is-setting-the-standard-for-collective-defense/"},
    {label: "Department of Defense — Hegseth thanks Pistorius", url: "https://www.defense.gov/News/News-Stories/Article/Article/4243724/hegseth-thanks-german-counterpart-for-stepping-up-to-defense-challenges/"},
    {label: "Federal Register — EO 14257 reciprocal tariffs", url: "https://www.federalregister.gov/documents/full_text/html/2025/04/07/2025-06063.html"},
    {label: "White House — U.S.-EU trade deal fact sheet", url: "https://www.whitehouse.gov/fact-sheets/2025/07/fact-sheet-the-united-states-and-european-union-reach-massive-trade-deal/"},
    {label: "State Department — U.S. welcomes E3 snapback", url: "https://www.state.gov/releases/office-of-the-spokesperson/2025/08/the-united-states-welcomes-the-initiation-of-snapback/"},
    {label: "Reuters — Rubio NATO Iran stance / troop withdrawal", url: "https://www.reuters.com/world/rubio-tell-nato-ministers-trump-very-disappointed-over-iran-war-stance-2026-05-21/"},
    {label: "Reuters — Ukraine defense tech and Germany as principal backer", url: "https://www.reuters.com/world/ukrainian-defence-tech-revolution-has-us-europeans-envious-2026-05-15/"},
    {label: "Atlantic Council — How Europe can strengthen its own defenses", url: "https://www.atlanticcouncil.org/dispatches/how-europe-can-strengthen-its-own-defenses-and-rebalance-transatlantic-relations/"},
    {label: "Congressional Research Service IN12526 — German election", url: "https://www.congress.gov/crs-product/IN12526"},
    {label: "Congressional Research Service IN12645 — Greenland-linked tariff pledge", url: "https://www.congress.gov/crs_external_products/IN/PDF/IN12645/IN12645.2.pdf"},
    {label: "Atlantic Council — Washington's force posture moves", url: "https://www.atlanticcouncil.org/dispatches/washingtons-latest-force-posture-moves-have-europeans-feeling-whiplash/"},
    {label: "White House — NATO 5% breakthrough", url: "https://www.whitehouse.gov/releases/2025/06/president-trumps-leadership-vision-drives-nato-breakthrough/"}
  ]
};

/* Foreign Policy Atlas — France (Trump 2nd term) — v3 entry from batch-1 overnight run.
   Pipeline: analyst=Claude (pack-only) · red-team=GPT · editor=Claude · tiebreaker auto-adjudicated. 2026-05-25. */
window.PRESIDENTS["trump"].dossier["France"] = {
  state: "aligned",
  effect: "mixed",
  magnitude: null,
  region: "Europe",
  outcome: "Against an inherited high-convergence baseline of 'extraordinary' U.S.–France cooperation, the administration sustained leader- and ministerial-level engagement on Ukraine, Iran snapback, and NATO but added discretionary friction — EU-level tariffs, OFAC designation of a French ICC judge, opposition to French recognition of Palestine, withdrawal from 66 international organizations, and no France-specific bilateral deliverable — prompting Macron to publicly call for 'less dependency on the United States' and to deepen UK-France nuclear hedging via Northwood.",
  inherited: "France entered the term as the United States' 'oldest treaty Ally,' fourth-largest NATO budget contributor, co-chair of the Ukraine artillery coalition, and partner across 'extraordinary convergence' on Ukraine, the Middle East, Indo-Pacific, and civil nuclear energy, with intensive end-of-administration engagement including Blinken's January 2025 Paris visit and Légion d'honneur.",
  points: [
    "Section 232 steel/aluminum tariffs were restored at 25% and raised to 50%, and EO 14257 reciprocal tariffs hit EU members including France before a U.S.–EU framework was reached in July–August 2025 [White House, 2025-06-03].",
    "OFAC designated French national and ICC Judge Nicolas Guillou under EO 14203 on August 20, 2025, sanctioning a citizen of a treaty ally with no inherited precedent [OFAC, 2025-08-20].",
    "Rubio conveyed 'strong opposition to any unilateral recognition of a Palestinian State' to Barrot on September 1, 2025; Macron nonetheless recognized the State of Palestine at UNGA on September 22, 2025, marking an open divergence [State Department, 2025-09-01].",
    "Macron told the 2026 Ambassadors Conference that France and Europe should pursue 'more strategic autonomy, less dependency on the United States and China,' an explicit hedging signal not present in the inherited baseline [French MFA, 2026-01-01].",
    "France and the UK signed the Northwood Declaration and convened the first Nuclear Steering Group in December 2025, building an intra-European deterrence track parallel to NATO/U.S. structures [UK Government, 2025-12-10].",
    "No bilateral U.S.–France joint statement, no France-specific deliverable, and no Technology Prosperity Deal analogous to those signed with the UK, Japan, and South Korea were produced [White House, 2025-09-18].",
    "Proclamation 11012 imposed a Section 122 import surcharge applying to imports from EU members including France in February 2026, layering additional economic friction [Federal Register, 2026-02-20].",
    "Trump hosted Macron at the White House in February and again in August 2025 alongside Zelensky and European leaders for Ukraine peace diplomacy, sustaining inherited leader-level access [Élysée, 2025-08-19].",
    "The United States 'welcomed' the E3-initiated UNSCR 2231 snapback on Iran on August 1, 2025 — supportive convergence, though the initiative was driven by France, Germany, and the UK [State Department, 2025-08-01].",
    "At The Hague, NATO Allies including France committed to 5% of GDP on defence by 2035, an outcome the White House credited to Trump but which also reflects long-running European rearmament pressures [NATO, 2025-06-25]."
  ],
  role: "Architect",
  confidence: "low",
  evidence: "adequate",
  contested: true,
  counterargument: "The strongest case for 'hurt': the inherited baseline was 'extraordinary convergence' with unusually dense leader engagement, so sustained meetings and contacts represent maintenance at best, not bilateral improvement. Against that high baseline, the administration introduced unambiguous discretionary harms — tariffs escalating to 50%, the unprecedented OFAC designation of a French ICC judge, open Palestine divergence, withdrawal from 66 international organizations, and a Section 122 surcharge — while producing no France-specific bilateral deliverable despite multiple leader meetings and despite Technology Prosperity Deals going to the UK, Japan, and South Korea. Macron's public pivot toward 'less dependency on the United States' and the Northwood nuclear track represent durable strategic estrangement, not continuity. On this reading, the security/diplomatic operational core that anchors 'mixed' reflects inherited alliance resilience rather than presidential contribution, while every clear causal negative — tariffs, ICC designation, Palestine clash, IO withdrawals — was an affirmative administration choice. Net effect relative to the inherited 'extraordinary convergence' baseline is closer to hurt than mixed.",
  durability: "Mixed: NATO Hague commitments and the U.S.–EU trade framework are codified, but tariff architecture and the ICC-judge designation remain reversible executive actions; Macron's autonomy framing and the UK-France Northwood track create durable hedging structures independent of Washington.",
  opportunityCost: "No bilateral U.S.–France Technology Prosperity Deal was pursued despite analogous instruments with the UK, Japan, and South Korea; no bilateral joint statement or formal deliverable was produced in the window despite multiple leader-level meetings.",
  escalationRisk: "Low on security given continued NATO and Ukraine coordination; moderate on economic and legal fronts via tariffs, the Section 122 surcharge, and the precedent of sanctioning a French national.",
  decisionVsExecution: "Decisions on tariffs, ICC-related designations, IO withdrawals, and burden-sharing pressure were presidential; execution on Ukraine, Iran snapback, and NATO ran through Rubio, Hegseth, Witkoff, and multilateral formats largely along inherited tracks.",
  grandStrategyDispute: "The pack shows an unresolved dispute over whether European 'primary responsibility' for continental defense and U.S. tariff/IO retrenchment strengthen the alliance by forcing burden-sharing or weaken it by accelerating French-led strategic autonomy and intra-European nuclear hedging.",
  omissionNote: "No bilateral U.S.–France joint statement, no documented Hegseth–Lecornu readout, no France-specific national pledge under the 5% target, and no primary U.S. readout responding to France's Palestine recognition were retrieved.",
  linkedPolicies: ["United Kingdom", "Germany", "Ukraine", "Iran", "Israel", "European Union"],
  levers: {
    security: "Sustained NATO and Ukraine coordination, Hague 5% commitment, and continued co-chairing of Ukraine defense industrial efforts, alongside EO 14268 FMS reform and the America First Arms Transfer Strategy; offset by Hegseth's framing that European allies bear 'primary responsibility' for continental defense.",
    coalition: "Trump–Macron February and August 2025 White House meetings, Rubio–Witkoff Élysée working lunch, Transatlantic Quad and G7 FM formats, and recurring Rubio–Barrot calls maintained inherited channels without producing a France-specific bilateral deliverable.",
    economicTech: "Section 232 steel/aluminum at 25% then 50%, EO 14257 reciprocal tariffs, Proclamation 11012 Section 122 surcharge, BIS advanced-computing IC rules affecting French firms, and the U.S.–EU framework and critical minerals MOU that partially mitigated the tariff shock; no bilateral Technology Prosperity Deal.",
    rivalDenial: "U.S. welcomed E3 UNSCR 2231 snapback on Iran and co-signed a joint statement on Iranian transnational repression in Europe and North America; coordination on export controls and sanctions enforcement against Russia continued."
  },
  sources: [
    {label: "White House — Trump–Macron press conference", url: "https://www.whitehouse.gov/past-events/president-trump-holds-a-press-conference-with-president-emmanuel-macron-of-france/"},
    {label: "Élysée — Macron in Washington alongside Zelensky", url: "https://www.elysee.fr/en/emmanuel-macron/2025/08/19/meeting-in-washington-alongside-president-zelensky"},
    {label: "State Department — Rubio–Barrot meeting", url: "https://www.state.gov/releases/office-of-the-spokesperson/2025/05/secretary-rubios-meeting-with-french-foreign-minister-barrot/"},
    {label: "State Department — U.S. welcomes snapback initiation", url: "https://www.state.gov/releases/office-of-the-spokesperson/2025/08/the-united-states-welcomes-the-initiation-of-snapback/"},
    {label: "NATO — The Hague Summit Declaration", url: "https://www.nato.int/en/about-us/official-texts-and-resources/official-texts/2025/06/25/the-hague-summit-declaration"},
    {label: "State Department — Rubio–Barrot call (Sept 1)", url: "https://www.state.gov/releases/office-of-the-spokesperson/2025/09/secretary-rubios-call-with-french-foreign-minister-jean-noel-barrot/"},
    {label: "White House — Section 232 steel/aluminum increase", url: "https://www.whitehouse.gov/fact-sheets/2025/06/fact-sheet-president-donald-j-trump-increases-section-232-tariffs-on-steel-and-aluminum/"},
    {label: "OFAC — Recent actions, Guillou designation", url: "https://ofac.treasury.gov/recent-actions/20250820"},
    {label: "French MFA — Conference of Ambassadors 2026", url: "https://us.diplomatie.gouv.fr/en/conference-ambassadors-2026"},
    {label: "UK Government — UK-France Nuclear Steering Group", url: "https://www.gov.uk/government/news/new-uk-france-nuclear-steering-group-meets-to-advance-cooperation-under-northwood-declaration"},
    {label: "Élysée — UNGA Palestine recognition", url: "https://www.elysee.fr/en/emmanuel-macron/2025/09/22/80th-session-of-the-united-nations-general-assembly-in-new-york-opening-day"},
    {label: "White House — U.S.–EU trade deal fact sheet", url: "https://www.whitehouse.gov/fact-sheets/2025/07/fact-sheet-the-united-states-and-european-union-reach-massive-trade-deal/"},
    {label: "Federal Register — Proclamation 11012 Section 122 surcharge", url: "https://www.federalregister.gov/documents/full_text/html/2026/02/25/2026-03824.html"},
    {label: "White House — UK Technology Prosperity Deal (comparative)", url: "https://www.whitehouse.gov/releases/2025/09/president-trump-signs-technology-prosperity-deal-with-united-kingdom/"}
  ]
};

/* Foreign Policy Atlas — Japan (Trump 2nd term) — v3 entry from batch-1 overnight run.
   Pipeline: analyst=Claude (pack-only) · red-team=GPT · editor=Claude · tiebreaker auto-adjudicated. 2026-05-25. */
window.PRESIDENTS["trump"].dossier["Japan"] = {
  state: "core-ally",
  effect: "mixed",
  magnitude: null,
  region: "Indo-Pacific",
  outcome: "The alliance executed inherited defense-architecture plans — Japan stood up JJOC, USFJ began Phase 1 upgrade to a joint force headquarters, and the Extended Deterrence Dialogue was reaffirmed — while Trump imposed a 15% baseline tariff on Japanese imports under contested IEEPA authority as part of a $550B investment-for-tariff framework, and PRC counter-measures targeted Japanese firms.",
  inherited: [
    "Kishida's April 2024 Official Visit with State Dinner characterized by the White House as the 'upward trajectory of the U.S.-Japan Alliance as it evolves into a global partnership' [White House, 2024-04-10]",
    "July 2024 SCC announced U.S. intent to reconstitute USFJ as a joint force headquarters reporting to USINDOPACOM, in parallel with Japan's new JJOC [Defense.gov, 2024-07-28]",
    "First-ever ministerial Extended Deterrence meeting and formalized 'Guidelines for Extended Deterrence' bolstering U.S. extended deterrence including nuclear [State.gov archived, 2024-12-27]",
    "Camp David trilateral framework with Japan and ROK and inaugural Trilateral Indo-Pacific Dialogue in January 2024 [State.gov archived, 2024-01-06]",
    "Quad foreign ministers in Tokyo reaffirmed free and open Indo-Pacific and rules-based order [State.gov archived, 2024-07-29]",
    "U.S.-Japan Partnership on Trade, Critical Minerals Agreement, and IPEF Overarching Agreement ratified by Japan formed the inherited economic architecture [USTR, 2024-07-31]"
  ],
  points: [
    "Trump and Ishiba's February 2025 summit reaffirmed Article V coverage of the Senkakus and committed to upgrading alliance command-and-control, framing relations as a 'new golden age' [White House, 2025-02-07]",
    "Hegseth announced Phase 1 of USFJ's upgrade to a joint force headquarters in Tokyo days after Japan stood up JJOC on March 24, 2025, executing the architecture decided under the July 2024 SCC [Defense.gov, 2025-03-30]",
    "The February 18, 2026 Extended Deterrence Dialogue reaffirmed U.S. commitment to defend Japan 'using the full range of U.S. defense capabilities, including nuclear' and integrated USSTRATCOM and USINDOPACOM with Japanese joint staff, building on the December 2024 EDD Guidelines [State.gov, 2026-02-18]",
    "Trump's July 22, 2025 framework agreement and implementing EO 14345 set a 15% baseline tariff on most Japanese imports while securing Japan commitments of $550B in U.S. investment, $8B/yr in agricultural purchases, and $7B/yr in LNG [White House, 2025-09-04]",
    "Takaichi-Trump October 2025 Tokyo meetings produced a critical minerals and rare earths framework and a Technology Prosperity Deal on AI, quantum, and biotech, with up to $332B in announced Japanese energy infrastructure commitments (reconciliation with the headline $550B figure is unresolved in the pack) [White House, 2025-10-28]",
    "Quad foreign ministers in Washington launched the Quad Critical Minerals Initiative and a four-pillar agenda, with Rubio holding his first post-confirmation bilateral with the Quad grouping [State.gov, 2025-07-01]",
    "Trilateral defense ministerial with Australia and Japan welcomed Tomahawk cooperation and JJOC-Australia liaison officer exchanges, and Australia-Japan-Philippines-U.S. ministers synchronized defense investments including Japanese radar at Wallace Air Station [Defense.gov, 2025-05-31]",
    "China's MOFCOM imposed a new end-user standard on dual-use exports to Japan citing 'remilitarization' and added export controls on 40 Japanese entities — a counter-reaction landing direct cost on Japanese firms during the alliance buildup [Nikkei, 2026-02-24]",
    "The Supreme Court's February 2026 ruling that IEEPA does not authorize tariffs raised legal questions about the underpinning of the Japan tariff framework [Congress.gov CRS, 2026-03-26]"
  ],
  role: "Active Stabilizer",
  confidence: "medium",
  evidence: "adequate",
  contested: true,
  counterargument: "The strongest dissent scores this 'hurt,' not mixed. By the pack's own baseline, the major defense gains — USFJ-to-JFHQ reconstitution, JJOC as counterpart, ministerial EDD, formalized extended-deterrence guidelines with nuclear language — were all decided under the July and December 2024 SCC/EDD, so Trump's marginal contribution on the security track is largely execution of inherited plans plus Japan's own institutional reform. The clearest fresh presidential imprint is in the opposite direction: a 15% baseline tariff on a treaty ally under IEEPA authority later found by the Supreme Court not to authorize tariffs, a $550B directed-investment bargain not ratified by Congress, and PRC retaliation that imposed real costs on Japanese firms. On that reading, the net causal effect on the ally relationship versus the inherited path is negative, and the appropriate role is closer to Inheritor than Active Stabilizer. The 'helped' view (two PMs successfully transitioned, critical minerals and Technology Prosperity deals, reaffirmed nuclear umbrella, $36B first investment tranche) also has support but must contend with the alliance-instrumentalizing trade pressure.",
  levers: {
    security: "Executed Phase 1 of USFJ JFHQ upgrade in lockstep with Japan's JJOC standup — both decided under the July 2024 SCC; reaffirmed nuclear extended deterrence at the February 2026 EDD, building on the December 2024 EDD Guidelines; deepened trilateral (ROK, Australia) and quadrilateral (with Philippines) defense formats.",
    economicTech: "Imposed 15% baseline tariff under IEEPA/§232 while securing $550B Japanese investment framework, critical minerals and rare earths agreement, and a Technology Prosperity Deal on AI/quantum/biotech; §232 semiconductor proclamation created a company-specific onshoring pathway; PRC end-user controls on Japan partially offset technology gains.",
    coalition: "Quad Critical Minerals Initiative and four-pillar agenda relaunched under Rubio; Australia-Japan-U.S. TDC ministerial and Australia-Japan-Philippines-U.S. defense ministerial synchronized regional posture; Japan participated in the Pax Silica grouping per State and Nikkei reporting, though the pack notes formal structure and Japan's legal participation are not fully documented.",
    rivalDenial: "Coordinated with Japan on countering PRC coercive economic practices and non-market policies; expanded alliance posture in Japan's Southwest Islands facing China; PRC retaliated with end-user controls on dual-use exports and export curbs on 40 Japanese firms, a cost borne by the ally."
  },
  durability: "Mixed. Defense-architecture changes (JJOC-USFJ JFHQ interoperability, EDD institutionalization) are largely inherited bipartisan structures and likely sticky across administrations. The tariff/investment framework's durability is uncertain given the February 2026 Supreme Court IEEPA ruling and reliance on executive order rather than congressional ratification (pack flags ratification status as unresolved).",
  opportunityCost: "Tariffing a treaty ally and extracting a directed investment package absorbed bandwidth that might otherwise have gone to a formal 2+2 SCC (none documented in the window per pack) or further alliance-deepening initiatives; the pack notes Japan sought AUKUS Pillar II engagement but no formal inclusion was retrieved.",
  escalationRisk: "PRC retaliation materialized: MOFCOM end-user controls on dual-use exports to Japan [CIPE, 2026-01-06] and export curbs on 40 Japanese entities citing 'remilitarization' [Nikkei, 2026-02-24].",
  decisionVsExecution: "USFJ JFHQ upgrade, JJOC counterpart structure, and ministerial EDD with formalized guidelines were decided under the prior administration's July and December 2024 SCC/EDD; execution (Phase 1 announcement, JSDF JOC Cooperation Team, February 2026 EDD reaffirmation) occurred under Trump. The trade/investment framework and Technology Prosperity Deal were both decided and executed in this window.",
  grandStrategyDispute: "Whether instrumentalizing a core ally for tariff leverage and directed investment is consistent with — or corrosive to — long-term Indo-Pacific deterrence against China is genuinely disputed. The pack shows the alliance absorbed the shock and continued deepening on defense, but at the cost of PRC counter-pressure on Japanese firms and questions about the legal foundation of the bargain.",
  longHorizon: "If the $550B investment, critical minerals framework, and SMR/energy commitments materialize as announced (first $36B tranche disclosed February 2026), industrial integration deepens materially; if the IEEPA legal foundation collapses, the bargain may unwind.",
  omissionNote: "No primary text of a formal U.S.-Japan 2+2 SCC was retrieved for the term window; host-nation support renegotiation outcome, the Nippon Steel/U.S. Steel final determination, AUKUS Pillar II Japan formal inclusion, Japan-specific §232 semiconductor rate, the Supreme Court IEEPA opinion text, and reconciliation of the $550B and $332B figures are not in the pack.",
  linkedPolicies: ["South Korea", "Australia", "Philippines", "India", "China", "Taiwan", "North Korea"],
  sources: [
    {label: "White House — U.S.-Japan Joint Leaders' Statement", url: "https://www.whitehouse.gov/briefings-statements/2025/02/united-states-japan-joint-leaders-statement/"},
    {label: "DoD — USFJ Upgrade to Joint Force Command", url: "https://www.defense.gov/News/News-Stories/Article/Article/4139213/defense-secretary-announces-us-forces-japans-upgrade-to-joint-force-command/"},
    {label: "DoD — Hegseth Concludes Visit to Japan", url: "https://www.defense.gov/News/Releases/Release/Article/4139267/secretary-of-defense-pete-hegseth-concludes-visit-to-japan/"},
    {label: "DoD — SCC 2+2 Joint Statement (July 2024)", url: "https://www.defense.gov/News/Releases/Release/Article/3852169/joint-statement-of-the-security-consultative-committee-22/"},
    {label: "State — U.S.-Japan Extended Deterrence Dialogue", url: "https://www.state.gov/releases/office-of-the-spokesperson/2026/02/u-s-japan-extended-deterrence-dialogue/"},
    {label: "State (archived) — Guidelines for Extended Deterrence", url: "https://2021-2025.state.gov/government-of-the-united-states-of-america-government-of-japan-guidelines-for-extended-deterrence/"},
    {label: "White House — Implementing the U.S.-Japan Agreement (EO 14345)", url: "https://www.whitehouse.gov/presidential-actions/2025/09/implementing-the-united-states-japan-agreement/"},
    {label: "White House — Strategic Trade and Investment Agreement Fact Sheet", url: "https://www.whitehouse.gov/fact-sheets/2025/07/fact-sheet-president-donald-j-trump-secures-unprecedented-u-s-japan-strategic-trade-and-investment-agreement/"},
    {label: "White House — New Golden Age Implementation (Tokyo)", url: "https://www.whitehouse.gov/briefings-statements/2025/10/implementation-of-the-agreement-toward-a-new-golden-age-for-the-u-s-japan-alliance/"},
    {label: "White House — Critical Minerals and Rare Earths Framework", url: "https://www.whitehouse.gov/briefings-statements/2025/10/united-states-japan-framework-for-securing-the-supply-of-critical-minerals-and-rare-earths-through-mining-and-processing/"},
    {label: "White House — Technology Prosperity Deal", url: "https://www.whitehouse.gov/articles/2025/10/u-s-japan-technology-prosperity-deal/"},
    {label: "White House — Tokyo Visit Fact Sheet", url: "https://www.whitehouse.gov/fact-sheets/2025/10/28195/"},
    {label: "State — Quad Foreign Ministers Joint Statement (Washington)", url: "https://www.state.gov/releases/office-of-the-spokesperson/2025/07/joint-statement-from-the-quad-foreign-ministers-meeting-in-washington/"},
    {label: "State — Rubio Meeting with Quad Foreign Ministers", url: "https://www.state.gov/releases/office-of-the-spokesperson/2025/07/secretary-rubios-meeting-with-the-quad-foreign-ministers/"},
    {label: "DoD — TDC Ministerial Joint Statement (Australia-Japan-U.S.)", url: "https://www.defense.gov/News/Releases/Release/Article/4202592/trilateral-defense-consultations-ministerial-meeting-joint-statement-on-efforts/"},
    {label: "DoD — Australia-Japan-Philippines-U.S. Defense Ministers Joint Statement", url: "https://www.defense.gov/News/Releases/Release/Article/4202565/joint-statement-on-the-meeting-of-defense-ministers-from-australia-japan-the-ph/"},
    {label: "State — U.S.-Japan-ROK Trilateral Joint Statement (NYC)", url: "https://www.state.gov/releases/2025/09/joint-statement-from-the-trilateral-meeting-of-the-united-states-of-america-japan-and-the-republic-of-korea-in-new-york-city/"},
    {label: "State — Rubio Meeting with FM Motegi (Munich)", url: "https://www.state.gov/releases/office-of-the-spokesperson/2026/02/secretary-rubios-meeting-with-japanese-foreign-minister-motegi-2/"},
    {label: "Treasury — Joint Statement on FX (Treasury-MOF)", url: "https://home.treasury.gov/news/press-releases/sb0245"},
    {label: "CIPE — PRC Export Controls Targeting Japan", url: "https://www.cipe.org/resources/brief-prc-export-controls-targeting-japan-and-u-s-economic-security"},
    {label: "Nikkei — China Restricts Exports to Japanese Companies", url: "https://asia.nikkei.com/politics/international-relations/japan-china-tensions/china-restricts-exports-to-japanese-companies-to-curb-remilitarization"},
    {label: "CRS — Japan-U.S. Relations (IF10199)", url: "https://www.congress.gov/crs-product/IF10199"},
    {label: "CRS — U.S. Forces in Japan (IF12604)", url: "https://www.congress.gov/crs_external_products/IF/HTML/IF12604.html"},
    {label: "White House — March 2026 U.S.-Japan Alliance Fact Sheet", url: "https://www.whitehouse.gov/fact-sheets/2026/03/fact-sheet-president-donald-j-trump-strengthens-u-s-japan-alliance-for-the-benefit-of-all-americans/"},
    {label: "Federal Register — Section 232 Semiconductor Proclamation 11002", url: "https://www.federalregister.gov/documents/full_text/html/2026/01/20/2026-01052.html"},
    {label: "Federal Register — HTSUS Amendments Implementing U.S.-Japan Agreement", url: "https://www.federalregister.gov/documents/2025/09/16/2025-17908/implementing-certain-tariff-related-elements-of-the-united-states-japan-agreement"},
    {label: "State — Pax Silica Initiative", url: "https://www.state.gov/releases/office-of-the-spokesperson/2025/12/pax-silica-initiative"}
  ]
};

/* Foreign Policy Atlas — Italy (Trump 2nd term) — v3 entry from batch-1 overnight run.
   Pipeline: analyst=Claude (pack-only) · red-team=GPT · editor=Claude · tiebreaker auto-adjudicated. 2026-05-25. */
window.PRESIDENTS["trump"].dossier["Italy"] = {
  state: "core-ally",
  effect: "mixed",
  magnitude: null,
  region: "Europe",
  outcome: "Italy remained a core NATO ally throughout the period. The administration largely inherited a strong alliance and managed it: a first Trump-Meloni summit produced a broad joint statement and bilateral institutional tracks (JMC, RDP renewal, Space Dialogue) continued, while EU-wide reciprocal tariffs, Section 232 measures, a worsening DST dispute, and OFAC designations of Italian nationals introduced concrete frictions.",
  inherited: [
    "U.S. State Department characterized U.S.-Italy ties as 'warm and close relations as Allies, partners, and friends' with shared priorities on Ukraine, energy security, migration, and AI cooperation [State Department, 2024-04-16]",
    "Italy held the 2024 G7 presidency, co-chairing with the U.S. a G7+ Ministerial that mobilized over $4 billion for Ukraine's energy needs [State Department, 2024-09-23]",
    "State Department approved a $738 million FMS sale of six MQ-9 Block 5 UAS to Italy, citing NATO interoperability [DoD/DSCA, 2024-12-09]",
    "Inaugural U.S.-Italy Space Dialogue held in Rome October 10-11, 2024, including negotiations toward a Technology Safeguards Agreement for U.S. commercial space launches from Italy [State Department, 2024-10-15]",
    "Blinken and Tajani signed an MOU on countering foreign state information manipulation on the margins of the G7 in Capri [State Department, 2024-04-17]",
    "Biden planned a January 2025 Rome visit to meet Mattarella and Meloni to highlight the strength of the U.S.-Italy relationship [White House, 2024-12-20]"
  ],
  points: [
    "Trump and Meloni held their first official bilateral meeting at the White House, producing a joint leaders' statement affirming intent to 'further strengthen the U.S.-Italy strategic alliance' across security, economic, and technological issues [White House, 2025-04-18]",
    "The joint statement committed to defense co-production and co-development and reaffirmed 'unwavering commitment to NATO,' though no implementing co-production agreement is documented in the pack [White House, 2025-04-18]",
    "Italy signed The Hague Summit Declaration committing all Allies to invest 5% of GDP on defense and security-related spending by 2035, with at least 3.5% on core defense — a collective NATO decision, not a bilateral concession [NATO, 2025-06-25]",
    "Rubio's May 2025 Rome readout 'acknowledged Italy's steps to increase defense spending' and noted Tajani's commitment to the 5% GDP target [State Department, 2025-05-17]",
    "Per IAI (secondary source), the Meloni government decided in March 2025 that Italy would reach 2% of GDP on defense by end of 2025; a SIGAR/OAR report listed Italy among Allies below 2% in 2024 [IAI, undated; DoD, 2025-08-07]",
    "The 53rd U.S.-Italy Joint Military Commission convened in Rome focused on security cooperation initiatives and basing agreements, with the 54th scheduled in Aviano [EUCOM, 2025-05-14]",
    "DoD published the renewal of the Reciprocal Defense Procurement Agreement with Italy [Federal Register, 2025-03-19]",
    "EO 14257 imposed reciprocal tariffs on EU members including Italy; EO 14266 substituted a uniform 10% additional ad valorem rate during the suspension period, with direct material effect on Italian exporters [Federal Register, 2025-04-15]",
    "Proclamation 10896 reinstated and expanded Section 232 steel tariffs at 25% from most countries including Italy, with Proclamation 10947 further adjusting steel and aluminum measures [Federal Register, 2025-06-09]",
    "U.S.-EU Framework on Reciprocal Trade committed the EU to eliminate industrial-goods tariffs and to purchase $750 billion in U.S. energy and $40 billion in AI chips, applicable to Italy as an EU member; per the 2026 NTE the EU remained framework-only with no binding ART as of March 2026 [White House, 2025-08-21; USTR, 2026-03-04]",
    "USTR 2026 Special 301 Report flagged Italy's 3% digital services tax — with the 2025 Budget Law eliminating the €5.5 million Italian revenue threshold, broadening the tax's reach — as a market access concern [USTR, 2026-04-01]",
    "OFAC designated Italian national Francesca Albanese, U.N. Special Rapporteur, under EO 14203 ICC sanctions; no documented Italian government response is in the pack [OFAC, 2025-07-09]",
    "OFAC designated Italian national Elisabetta Caddeu under Iran EO 13902 [OFAC, 2025-07-30]",
    "OFAC updated the SDN entry for Italian national Cristian Diana under counter-narcotics EO 14059 [OFAC, 2026-01-02]",
    "Second U.S.-Italy Space Dialogue (April 9-10, 2026) followed up on the Trump-Meloni April 2025 space cooperation commitment; full State Department joint statement text was inaccessible in the pack [Office of Space Commerce, 2026-04-17]",
    "Joint statement aspirationally positioned Italy as 'a key regional data hub for the Mediterranean and North Africa' and named Italy a key node for IMEC tied to the Mattei Plan, but no implementing agreements, project deliverables, or 'trusted vendor' lists are documented in the pack [White House, 2025-04-18]",
    "Joint statement committed to increasing U.S. LNG exports to Italy and to Italian contributions to 'the maritime renaissance of the U.S. shipbuilding sector'; execution is not documented in the pack [White House, 2025-04-18]",
    "Rubio returned to Rome May 6-8, 2026, with Tajani readout citing maritime security, Ukraine, and Western economic interests [State Department, 2026-05-01]"
  ],
  role: "Inheritor",
  confidence: "medium",
  evidence: "adequate",
  contested: true,
  counterargument: "A 'helped' read is defensible: Trump secured Italy's signature on the 5% Hague pledge, formalized bilateral co-production language, IMEC/Mattei Plan/LNG/space cooperation tracks, and Meloni-Trump personal alignment produced more concrete bilateral architecture than the inherited baseline showed. A 'hurt' read is equally defensible: against an already strong inherited alliance, the cleanest term-window presidential actions with direct material effect on Italy were adverse — EO 14257/14266 reciprocal tariffs, Section 232 steel/aluminum, a worsening DST dispute broadened by the 2025 Budget Law, an OFAC designation of an Italian-national UN Special Rapporteur, and a U.S.-EU framework that remained nonbinding as of March 2026. Most claimed positives (IMEC, Mattei Plan, AI/cloud hub, 6G/quantum/biotech, trusted vendors, shipbuilding, Mars/lunar) are joint-statement language without documented execution, while the harms are implemented. The mixed call reflects that asymmetry rather than splitting the difference.",
  durability: "Mixed. The Hague 5% commitment runs to 2035 with a 2029 trajectory review and bilateral institutional tracks (JMC, Space Dialogue, RDP renewal) are durable structural processes that likely would have continued under any administration. The U.S.-EU trade framework remained framework-only as of March 2026 per the NTE, with no binding ART concluded, leaving tariff arrangements reversible. OFAC designations are reversible by future administrations.",
  opportunityCost: "Resources spent litigating EU-channel tariffs and the DST dispute, plus the political cost of the Albanese designation, traded against deeper Italy-specific economic deliverables; concrete IMEC, Mattei Plan, and 'trusted vendor' implementation remain undocumented in the pack.",
  escalationRisk: "Moderate around the Italy DST (Special 301 Watch List for the EU, broadened reach under the 2025 Budget Law) and post-suspension reciprocal tariff rates; Italian government response to the Albanese OFAC designation is undocumented in the pack.",
  decisionVsExecution: "Decisions (5% pledge as a NATO collective, Trump-Meloni joint statement, EU framework, OFAC designations, Section 232 reinstatement) are documented; execution on co-production, 'trusted vendor' lists, AI/quantum/6G working groups, Mattei Plan co-financing, IMEC project deliverables, and a binding U.S.-EU ART is not documented in the pack.",
  crossTheaterTradeoff: "Italy positioned rhetorically as a Mediterranean/North Africa data and energy hub via Mattei Plan and IMEC, linking European and Middle East/Africa theaters; G7 coordination on Iran, Ukraine, and maritime security used Italy as a continuing convening partner.",
  longHorizon: "The Hague 5% GDP defense investment trajectory extends to 2035; Artemis lunar and joint Mars missions (2026, 2028) are referenced as cooperation horizons but lack implementing detail in the pack; America250 framing anchors a longer commemorative arc.",
  omissionNote: "Italy's actual 2025 year-end defense spending figure, the post-August 2025 EU reciprocal tariff rate, Italian government reaction to the Albanese designation, JMC 54 outcomes, the full text of the Second Space Dialogue joint statement, and concrete IMEC/Mattei Plan project deliverables are not documented in the pack.",
  linkedPolicies: ["Ukraine", "Holy See"],
  sources: [
    {label: "White House — Trump-Meloni Joint Leaders' Statement", url: "https://www.whitehouse.gov/briefings-statements/2025/04/united-states-italy-joint-leaders-statement/"},
    {label: "White House — Trump-Meloni bilateral meeting", url: "https://www.whitehouse.gov/past-events/president-trump-participates-in-a-bilateral-meeting-with-the-prime-minister-of-italy-apr-17-2025/"},
    {label: "State Department — Rubio-Tajani May 2025 meeting", url: "https://www.state.gov/releases/office-of-the-spokesperson/2025/05/secretary-rubios-meeting-with-italian-foreign-minister-tajani"},
    {label: "State Department — Italy National Day statement", url: "https://www.state.gov/releases/2025/06/italy-national-day/"},
    {label: "State Department — Rubio-Tajani May 2026 meeting", url: "https://www.state.gov/releases/office-of-the-spokesperson/2026/05/secretary-rubios-meeting-with-italian-foreign-minister-tajani-3/"},
    {label: "State Department — Rubio travel to Italy and Vatican", url: "https://www.state.gov/releases/office-of-the-spokesperson/2026/05/secretary-rubios-travel-to-italy-and-the-vatican/"},
    {label: "NATO — Hague Summit Declaration", url: "https://www.nato.int/en/about-us/official-texts-and-resources/official-texts/2025/06/25/the-hague-summit-declaration"},
    {label: "NATO — defence expenditures and 5% commitment", url: "https://www.nato.int/en/what-we-do/introduction-to-nato/defence-expenditures-and-natos-5-commitment"},
    {label: "EUCOM — 53rd U.S.-Italy Joint Military Commission", url: "https://www.eucom.mil/article/43168/53rd-us-italy-joint-military-commission-concludes-in-rome"},
    {label: "Federal Register — RDP renewal with Italy", url: "https://www.federalregister.gov/documents/2025/03/19/2025-04494/conclusion-of-the-renewal-of-a-reciprocal-defense-procurement-agreement-with-the-government-of-the"},
    {label: "Federal Register — EO 14266 reciprocal tariff modification", url: "https://www.federalregister.gov/documents/full_text/html/2025/04/15/2025-06462.html"},
    {label: "Federal Register — EO 14257 reciprocal tariffs", url: "https://www.federalregister.gov/documents/full_text/html/2025/04/07/2025-06063.html"},
    {label: "Federal Register — Section 232 steel/aluminum proclamations", url: "https://www.federalregister.gov/documents/full_text/html/2025/06/09/2025-10524.html"},
    {label: "Federal Register — Implementing U.S.-EU Framework tariffs", url: "https://www.federalregister.gov/documents/2025/09/25/2025-18660/implementing-certain-tariff-related-elements-of-the-us-eu-framework-on-an-agreement-on-reciprocal"},
    {label: "White House — Joint Statement on U.S.-EU Trade Framework", url: "https://www.whitehouse.gov/briefings-statements/2025/08/joint-statement-on-a-united-states-european-union-framework-on-an-agreement-on-reciprocal-fair-and-balanced-trade/"},
    {label: "USTR 2026 Special 301 Report", url: "https://ustr.gov/sites/default/files/files/Press/Releases/2026/2026%20Special%20301%20Report.pdf"},
    {label: "USTR 2026 National Trade Estimate Report", url: "https://ustr.gov/sites/default/files/files/Press/Releases/2026/National%20Trade%20Estimate%20Report%202026.pdf"},
    {label: "OFAC — Albanese designation under EO 14203", url: "https://ofac.treasury.gov/recent-actions/20250709_33"},
    {label: "OFAC — Caddeu designation under Iran EO", url: "https://ofac.treasury.gov/recent-actions/20250730_33"},
    {label: "OFAC — Diana SDN update", url: "https://ofac.treasury.gov/recent-actions/20260102"},
    {label: "Office of Space Commerce — 2nd U.S.-Italy Space Dialogue", url: "https://space.commerce.gov/osc-participates-in-2nd-u-s-italy-space-dialogue/"},
    {label: "decode39 — America250 MOU", url: "https://decode39.com/12740/italy-u-s-mou-on-america250-diplomacy-alliance-and-the-western-hemisphere"},
    {label: "IAI — Meloni's defence policy", url: "https://www.iai.it/en/publications/c41/melonis-defence-policy-adjusting-balance-sheet-crises"},
    {label: "DoD SIGAR/OAR Q3 June 2025 report", url: "https://media.defense.gov/2025/Aug/15/2003781787/-1/-1/1/OAR_Q3_JUN2025_FINAL_508.PDF"},
    {label: "State Department — 2025 TIP Report: Italy", url: "https://www.state.gov/reports/2025-trafficking-in-persons-report/italy"}
  ]
};

/* Foreign Policy Atlas — South Korea (Trump 2nd term) — v3 entry from batch-1 overnight run.
   Pipeline: analyst=Claude (pack-only) · red-team=GPT · editor=Claude · tiebreaker auto-adjudicated. 2026-05-25. */
window.PRESIDENTS["trump"].dossier["South Korea"] = {
  state: "core-ally",
  effect: "mixed",
  magnitude: null,
  region: "Indo-Pacific",
  outcome: "Reciprocal tariffs imposed structural friction on a treaty ally and the 2026 NDS shifted primary DPRK-deterrence responsibility to Seoul with 'more limited U.S. support,' while a Gyeongju State Visit, 57th SCM, Technology Prosperity MOU, and Korea Strategic Trade and Investment Deal layered new commitments atop a largely inherited alliance architecture.",
  inherited: [
    "Mutual Defense Treaty reaffirmed as 'bedrock' and alliance as 'linchpin of peace, security, and prosperity' in the Indo-Pacific at the October 2024 2+2 [State Department, 2024-10-31]",
    "Washington Declaration's Nuclear Consultative Group institutionalized and U.S.-ROK Guidelines for Deterrence and Nuclear Operations completed by October 2024 [State Department, 2024-10-31]",
    "56th SCM committed U.S. to maintain current USFK force levels and characterized the alliance as 'stronger than ever' with FS24/UFS24 exercises 'more extensive than the past year' [Defense Department, 2024-10-30]",
    "12th Special Measures Agreement concluded by late October 2024 as 'tangible symbol' of alliance commitment [Defense Department, 2024-10-30]",
    "Successor 123 Agreement for Peaceful Nuclear Cooperation signed, creating a standing High-Level Bilateral Commission [State Department, 2025-01-01]",
    "Alliance commitment reaffirmed as 'ironclad' through ROK martial-law crisis, Yoon impeachment, and Acting President Choi handoff [State Department, 2025-01-06]",
    "Trilateral U.S.-Japan-ROK architecture institutionalized via Camp David follow-through and the January 2024 inaugural Trilateral Indo-Pacific Dialogue [State Department, 2024-01-06]"
  ],
  points: [
    "Reciprocal tariffs imposed on a treaty ally under EO 14257's national-emergency theory created structural trade friction, were extended and modified repeatedly, and were only partly resolved via the Korea Strategic Trade and Investment Deal whose specific tariff rate and PTAAP product list are not in retrieved primary text [USTR, 2025-11-13]",
    "2026 National Defense Strategy formally repositioned South Korea to take 'primary responsibility for deterring North Korea with critical but more limited U.S. support,' a doctrinal downgrade in U.S. Peninsula posture relative to the inherited baseline of maintained force levels and ironclad extended deterrence [Defense Department, 2026-01-23]",
    "Gyeongju State Visit produced a Joint Fact Sheet declaring 'a new chapter in the U.S.-ROK Alliance' and a Technology Prosperity Deal MOU covering AI, 6G, biotech, and quantum, though the SED later framed the deal as '$350 billion in investment in U.S. reindustrialization' while the November 13 fact sheet references $150B in FDI from August 25 — the relationship between the figures is unresolved [White House, 2025-11-13]",
    "57th SCM reaffirmed extended deterrence including nuclear, endorsed continued Conventional-Nuclear Integration tabletop exercises, and welcomed ROK's commitment to raise defense spending to 3.5% of GDP 'as soon as possible,' a pledge consistent with the administration's burden-shifting strategy [Defense Department, 2025-11-04]",
    "USFK tour normalization (24→36-month accompanied; 12→24 unaccompanied) took effect October 1, 2025 at ~28,500 troops centered on Camp Humphreys — a personnel-policy change atop maintained force levels, not a footprint expansion [USFK, 2025-07-29]",
    "Freedom Shield 25, UFS25, and FS26 proceeded on schedule with multi-domain operations and first-ever combined F-35 training in a Freedom Shield exercise, continuing the inherited exercise cadence [USFK, 2025-03-20]",
    "Trilateral architecture with Japan was sustained via Munich, Brussels, Kuala Lumpur, and New York foreign-ministers meetings and Trilateral Coordinating Secretariat sessions — continuity of inherited Camp David framework rather than new architecture [State Department, 2025-09-22]",
    "Major State Visit commercial deals were announced: Korean Air–Boeing ($36.2B), GE Aerospace engines ($13.7B), L3Harris AWACS ($2.3B), and a ReElement–POSCO rare-earth refining partnership [White House, 2025-10-29]",
    "ROK was enrolled as a participating country in the Pax Silica initiative on secure silicon supply chains, with no binding commitments or tech-sharing protocols documented in retrieved sources [State Department, 2025-12-01]",
    "ROK National Assembly passed implementing legislation for the Strategic Trade and Investment Deal in March 2026, providing legal basis for the November 2025 MOU [KEI, 2026-03-12]"
  ],
  role: "Inheritor",
  confidence: "medium",
  evidence: "adequate",
  contested: true,
  counterargument: "An Accelerator/'helped' reading emphasizes the second-ever ROK State Visit, $350B investment frame, Technology Prosperity Deal, Pax Silica enrollment, tour normalization, reaffirmed nuclear extended deterrence, 3.5% GDP defense pledge, and locked-in Boeing/GE/L3Harris deals as the deepest alliance modernization in years [White House, 2025-11-13]. A 'hurt' reading is at least as defensible: the administration's two clearest causal moves — tariff coercion against a treaty ally and an NDS that codifies reduced U.S. responsibility for DPRK deterrence — are structural negatives, while most positives are inherited continuity (extended deterrence, NCG, exercises, OPCON progress, trilateral, SMA) or unresolved MOUs and fact sheets whose specific tariff rates, PTAAP contents, and $150B/$350B reconciliation are not in primary text [Kharon, 2025-12-31]. The net call lands at mixed/Inheritor because the inherited alliance machinery absorbed administration pressure without rupture, but no clearly presidential, durable improvement large enough to offset tariffs and doctrinal downgrade is established in the pack.",
  durability: "Mixed. The 123 Agreement, NCG, tour normalization, and SCM communiqués are durable institutional anchors inherited or extending inherited frameworks; the Strategic Trade and Investment Deal remained non-binding MOUs/fact sheets as of year-end 2025 and depends on PTAAP listings and EO discretion, with ROK implementing legislation only passed in March 2026 [KEI, 2026-03-12].",
  opportunityCost: "Tariff-first opening with a treaty ally and explicit NDS downgrading of U.S. Peninsula responsibility consumed alliance political capital that could have been spent locking in trilateral and tech-coalition gains without coercive economic pressure [Defense Department, 2026-01-23].",
  escalationRisk: "Pack documents continued DPRK missile activity and deepening DPRK-Russia military cooperation including long-range missile support, against which the alliance reaffirmed extended deterrence and CNI exercises [State Department, 2025-09-22].",
  decisionVsExecution: "Decisions (tariff EOs, 2026 NDS posture shift, State Visit, Strategic Trade Deal MOU) are clearly presidential; execution on tariff relief mechanics, OPCON FOC certification timing, and investment disbursement remains incomplete in the pack window [Federal Register, 2025-12-04].",
  crossTheaterTradeoff: "Gyeongju also hosted the Trump–Xi side deal on rare earths, fentanyl precursors, and semiconductors, leveraging the ROK visit as a platform for China diplomacy [White House, 2025-11-01].",
  longHorizon: "If Seoul executes the 3.5% defense spending pledge and absorbs primary DPRK-deterrence responsibility, the alliance shifts toward a more symmetrical partnership; if the Strategic Trade Deal's non-binding pledges stall, the economic leg weakens [Defense Department, 2026-01-23].",
  omissionNote: "Specific ROK reciprocal tariff rate, PTAAP product list, SMA financial terms, OPCON transfer milestone date, Section 232 semiconductor rates for Samsung/SK Hynix, and the relationship between the $150B and $350B investment figures are not resolved in the pack.",
  linkedPolicies: ["Japan", "China", "North Korea"],
  levers: {
    security: "USFK posture maintained at ~28,500 troops with tour normalization; FS25/UFS25/FS26 combined exercises proceeded; extended deterrence including nuclear reaffirmed at 57th SCM with CNI tabletop exercises and Future-CFC FOC certification targeted for 2026; 2026 NDS shifts primary DPRK-deterrence responsibility to Seoul.",
    economicTech: "Reciprocal tariffs under EO 14257 followed by the non-binding Korea Strategic Trade and Investment Deal MOU (frame later described as $350B in SED readout), Technology Prosperity Deal MOU, Pax Silica participation, and State Visit Boeing/GE/L3Harris/ReElement-POSCO commercial announcements.",
    coalition: "Sustained U.S.-Japan-ROK trilateral through Munich, Brussels, Kuala Lumpur, and New York ministerials and Trilateral Coordinating Secretariat — continuity of inherited Camp David framework.",
    rivalDenial: "OFAC designations targeting DPRK IT-worker networks, arms traffickers, and bank facilitators (broadly targeted Treasury actions, not Korea-specific); joint condemnation of DPRK-Russia long-range missile cooperation; ROK enrolled in Pax Silica secure silicon supply chain."
  },
  sources: [
    {label: "White House Joint Fact Sheet Trump-Lee", url: "https://www.whitehouse.gov/fact-sheets/2025/11/joint-fact-sheet-on-president-donald-j-trumps-meeting-with-president-lee-jae-myung/"},
    {label: "57th SCM Joint Communiqué", url: "https://media.defense.gov/2025/Nov/14/2003820640/-1/-1/1/57-SECURITY-CONSULTATIVE-MEETING-JOINT-COMMUNIQUE.PDF"},
    {label: "56th SCM Joint Communiqué", url: "https://www.defense.gov/News/Releases/Release/Article/3951794/56th-security-consultative-meeting-joint-communique/"},
    {label: "2024 2+2 Joint Statement", url: "https://2021-2025.state.gov/joint-statement-of-the-2024-united-states-republic-of-korea-foreign-and-defense-ministerial-meeting-22/"},
    {label: "2026 National Defense Strategy", url: "https://media.defense.gov/2026/Jan/23/2003864773/-1/-1/0/2026-NATIONAL-DEFENSE-STRATEGY.PDF"},
    {label: "USTR Korea Strategic Trade and Investment Deal Fact Sheet", url: "https://ustr.gov/about/policy-offices/press-office/fact-sheets/2025/november/fact-sheet-united-states-and-korea-agree-korea-strategic-trade-and-investment-deal"},
    {label: "EO 14257 Reciprocal Tariffs", url: "https://www.whitehouse.gov/presidential-actions/2025/04/regulating-imports-with-a-reciprocal-tariff-to-rectify-trade-practices-that-contribute-to-large-and-persistent-annual-united-states-goods-trade-deficits/"},
    {label: "USFK Tour Normalization", url: "https://www.usfk.mil/Media/Press-Products/Press-Releases/Article/4259093/us-forces-korea-to-implement-tour-normalization-policy/"},
    {label: "Freedom Shield 25 Concludes", url: "https://www.usfk.mil/Media/Press-Products/Press-Releases/Article/4127797/freedom-shield-25-successfully-concludes/"},
    {label: "White House State Visit Deals Fact Sheet", url: "https://www.whitehouse.gov/fact-sheets/2025/10/fact-sheet-president-donald-j-trump-brings-home-more-billion-dollar-deals-during-state-visit-to-the-republic-of-korea/"},
    {label: "Pax Silica Initiative", url: "https://www.state.gov/releases/office-of-the-spokesperson/2025/12/pax-silica-initiative"},
    {label: "Trilateral NY Joint Statement", url: "https://www.state.gov/releases/2025/09/joint-statement-from-the-trilateral-meeting-of-the-united-states-of-america-japan-and-the-republic-of-korea-in-new-york-city/"},
    {label: "Federal Register U.S.-Korea Tariff Implementation", url: "https://www.federalregister.gov/documents/2025/12/04/2025-21940/implementing-certain-tariff-related-elements-of-the-us-korea-strategic-trade-and-investment-deal"},
    {label: "Trump-Xi Gyeongju Trade Deal", url: "https://www.whitehouse.gov/fact-sheets/2025/11/fact-sheet-president-donald-j-trump-strikes-deal-on-economic-and-trade-relations-with-china/"},
    {label: "Kharon Debrief on Korea Tariffs", url: "https://www.kharon.com/brief/kharon-debrief-2025-south-korea-us-tariffs-stimson-center-james-kim"},
    {label: "KEI Q1 2026 Ledger", url: "https://keia.org/analysis/q1-2026-u-s-korea-trade-investment-and-diplomacy-ledger"},
    {label: "123 Agreement", url: "https://www.state.gov/bureau-of-international-security-and-nonproliferation/releases/2025/01/u-s-republic-of-korea-r-o-k-agreement-for-peaceful-nuclear-cooperation/"},
    {label: "Blinken-Choi Acting President Meeting", url: "https://2021-2025.state.gov/secretary-blinkens-meeting-with-republic-of-korea-acting-president-choi/"},
    {label: "Trilateral Indo-Pacific Dialogue Inaugural", url: "https://2021-2025.state.gov/joint-statement-on-the-trilateral-united-states-japan-republic-of-korea-indo-pacific-dialogue/"},
    {label: "CRS R48877", url: "https://www.everycrsreport.com/reports/R48877.html"}
  ]
};

/* Foreign Policy Atlas — Australia (Trump 2nd term) — v3 entry from batch-1 overnight run.
   Pipeline: analyst=Claude (pack-only) · red-team=GPT · editor=Claude · tiebreaker auto-adjudicated. 2026-05-25. */
window.PRESIDENTS["trump"].dossier["Australia"] = {
  state: "core-ally",
  effect: "mixed",
  magnitude: null,
  region: "Indo-Pacific",
  outcome: "The U.S.-Australia alliance retained its inherited upward trajectory on defense industrial integration and AUKUS execution — trilateral naval nuclear propulsion agreement entry-into-force, Australian submarine industrial base payments, ITAR §126.7 finalization, AUSMIN 2025, and a Critical Minerals Framework — but the administration also imposed a 10% reciprocal tariff and terminated Australia's aluminum Section 232 alternative agreement on a non-retaliating treaty ally, pursued AD/CVD cases on Australian steel and silicon metal, and introduced months of uncertainty via the 'America First' AUKUS review before reaffirming continuity.",
  inherited: [
    "AUSMIN 2024 (August 6, 2024) described the alliance as 'unbreakable' with three pillars: defense, climate/critical minerals, and the Innovation Alliance [State Department, 2024-08-06]",
    "AUKUS Pillar I Optimal Pathway in motion: 60+ RAN personnel in U.S. SSN training pipeline, first U.S. SSN maintenance in Australia in August 2024, SRF-West targeted for as early as 2027 [Defense Department, 2024-09-26]",
    "August 2024 trilateral naval nuclear propulsion enabling agreement signed but not yet in force at transition [State Department, 2024-08-08]",
    "ITAR §126.7 interim final rule (August 20, 2024) created license-free defense trade among AUKUS partners effective September 1, 2024; Australia added to DPA Title III [State Department, 2024-08-16]",
    "Australia's 2023 pledge of $3B over five years to U.S. submarine industrial base was already in place at transition [Congressional Research Service, 2026-02-27]",
    "GMLRS co-production in Australia targeted for 2025 with co-assembly MOU to be finalized by December 2024; PrSM Joint Program Office announced [State Department, 2024-08-06]"
  ],
  points: [
    "EO 14257 (April 2, 2025) imposed a 10% reciprocal tariff on Australian imports under IEEPA, and Proclamation 10895 terminated Australia's Section 232 aluminum alternative agreement effective March 12, 2025 — new discretionary economic costs imposed on a non-retaliating treaty ally [Federal Register, 2025-02-18]",
    "Commerce issued an affirmative final antidumping determination on Australian corrosion-resistant steel (August 2025) and a preliminary affirmative CVD on Australian silicon metal (September 2025), additional trade-remedy pressure on Australian producers [Federal Register, 2025-08-29]",
    "The administration announced an 'America First' AUKUS review in June 2025, introducing months of uncertainty into an inherited program; both governments later stated AUKUS was 'full steam ahead,' with DPM Marles characterizing reviews as 'done' — consistent with continuity rather than acceleration beyond the inherited trajectory [Congressional Research Service, 2026-02-27]",
    "Trilateral Naval Nuclear Propulsion Cooperation Agreement (signed August 2024) entered into force January 17, 2025, permitting transfer of naval nuclear reactors and special nuclear material to Australia — execution of an inherited enabling agreement [Congressional Research Service, 2026-02-05]",
    "Australia made three tranches of submarine industrial base payments under its 2023 $3B pledge — ~$500M (February), ~$525M (July), ~$1B (December) in 2025 — uplifting the U.S. submarine industrial base; the underlying commitment predates the administration [Congressional Research Service, 2026-02-27]",
    "Trump-Albanese state visit (October 20, 2025) produced a Critical Minerals Framework with a six-month $1B-each mobilization target, EXIM Letters of Interest of more than $2.2B, and a Department of War commitment to a 100 MT/year gallium refinery in Western Australia — announced intentions and letters rather than consummated financial flows per the pack [White House, 2025-10-20]",
    "Hegseth-Marles Shangri-La bilateral concluded the PrSM MOU on Production, Sustainment, and Follow-On Development — described by DoD as its 'first long range fire cooperation on foreign soil' — alongside agreements for 155mm ammunition and GMLRS assembly in Australia, advancing co-production tracks targeted by AUSMIN 2024 [Defense Department, 2025-06-01]",
    "December 30, 2025 ITAR §126.7 final rule and FY2026 NDAA Section 1085 (AUKUS Improvement Act) and Section 1086 finalized and codified license-free defense trade and AUKUS-related reexport/retransfer authorities that built on the August 2024 interim rule [Federal Register, 2025-12-30]",
    "OFAC, Australia's DFAT, and UK FCDO issued coordinated trilateral cyber sanctions on November 19, 2025 against Russia-based bulletproof hosting providers Media Land and Aeza-linked entities, demonstrating operational alliance integration on sanctions enforcement [Treasury Department, 2025-11-19]"
  ],
  role: "Active Stabilizer",
  confidence: "medium",
  evidence: "adequate",
  contested: true,
  counterargument: "The pro-helped reading: even granting inherited momentum, the administration affirmatively did not derail AUKUS during its review, secured the NPP agreement's entry-into-force on its watch, finalized the ITAR §126.7 rule, codified AUKUS exemptions in the FY2026 NDAA, concluded a novel Critical Minerals Framework with EXIM/EFA coordination and a gallium refinery commitment, signed the PrSM MOU as DoD's 'first long range fire cooperation on foreign soil,' and hosted a state visit that produced $2B+ in Australian defense purchases and a $1.44T superannuation investment pledge. On this reading the economic costs of the 10% tariff and aluminum action — while real — are smaller than the defense, technology, and critical-minerals deliverables, justifying helped/material/Accelerator. The skeptic-and-now-editor reading prevailing here: most of those deliverables execute pre-2025 commitments (Australia's $3B sub-base pledge, ITAR interim rule, NPP enabling agreement, GMLRS/PrSM workstreams, AUSMIN cadence), the AUKUS review introduced uncertainty rather than acceleration, and the tariff and aluminum actions are direct presidential harms on a non-retaliating ally — netting to mixed.",
  durability: "Mixed. The naval nuclear propulsion treaty runs to 2075 and FY2026 NDAA codification of the AUKUS exemptions create statutory durability. The Critical Minerals Framework's six-month investment timeline and Technology Prosperity Deal remain unimplemented per the pack. The 10% reciprocal tariff sits on IEEPA emergency authority and could be reversed or escalated administratively.",
  opportunityCost: "Imposing the 10% reciprocal tariff and revoking Australia's aluminum Section 232 alternative agreement on a non-retaliating treaty ally absorbed political capital and signaled that even closest allies face baseline trade coercion — a cost paid against the alliance ledger that the AUKUS and critical-minerals workstreams had to offset.",
  escalationRisk: "Low bilaterally. AUKUS execution and force posture upgrades raise PRC counter-signaling risk in the Indo-Pacific, but the pack shows no Australian retrenchment.",
  decisionVsExecution: "Decisions attributable to the administration: imposing the 10% reciprocal tariff, terminating the aluminum Section 232 exemption, launching the 'America First' AUKUS review, signing the Critical Minerals Framework, and concluding the PrSM MOU. Execution of inherited workstreams: Australian payments to the U.S. submarine industrial base under the 2023 pledge, ITAR §126.7 finalization following the August 2024 interim rule, NPP agreement entry-into-force, and AUSMIN/AUKUS DMM cadence.",
  crossTheaterTradeoff: "AUKUS submarine transfers compete against U.S. Navy SSN inventory needs given the Virginia-class production backlog (1.1–1.2/year vs. 2.0/year goal), creating a Pacific-vs.-Atlantic readiness tradeoff flagged by CRS.",
  longHorizon: "AUKUS Pillar I commits both states to a 2075 horizon via the naval nuclear propulsion agreement; Australia's superannuation funds pledged to grow U.S. investments to $1.44T by 2035; SRF-West and Virginia-class sales extend into the 2030s.",
  omissionNote: "No primary text of the FY2026 NDAA Section 1085 enrolled language, the AUKUS review conclusions, or the Technology Prosperity Deal implementing document was retrieved; Mid-Range Capability live-fire test execution unconfirmed; the pack flags no primary documentation of formal financial close of the October 2025 critical-minerals investment package within the window; Hegseth's 3.5% GDP defense-spending ask is documented as a request, with no causal link to Australia's April 2026 NDS established in retrieved sources.",
  linkedPolicies: ["United Kingdom", "Japan", "India", "Philippines"],
  levers: {
    security: "AUKUS Pillar I executed inherited tracks (NPP treaty in force, USS Vermont maintenance at HMAS Stirling, three Australian submarine industrial base payments totaling ~$2B in 2025 under a 2023 pledge); Pillar II hypersonics (HyFliTE), AI-ASW, and maritime autonomy; PrSM MOU as DoD's 'first long range fire cooperation on foreign soil'; expanded force posture at Darwin, Tindal, and Queensland airbases; Mid-Range Capability live-fire planned in Australia but execution unconfirmed; 'America First' AUKUS review introduced mid-year uncertainty before reaffirmation.",
    economicTech: "10% reciprocal tariff (EO 14257) and termination of Section 232 aluminum alternative agreement (Proclamation 10895) imposed direct costs on a non-retaliating ally; Commerce AD/CVD determinations on Australian steel and silicon metal; partially offset by Critical Minerals Framework with $3B+ investment target (intentions/letters per pack), EXIM/EFA coordinated financing including a $600M Tronox package, and a gallium refinery commitment; ITAR §126.7 final rule and NDAA AUKUS Improvement Act finalized and codified license-free defense trade building on the August 2024 interim rule.",
    coalition: "Quad reactivated immediately (January 21, 2025 FM meeting); Quad Critical Minerals Initiative launched July 2025; first IPLN field training exercise December 2025; Australia-Japan-U.S. TDC ministerial and Australia-Japan-Philippines-U.S. defense ministers' joint statement; Pax Silica founding signatory — largely multilateral continuities rather than bilateral presidential achievements.",
    rivalDenial: "Coordinated trilateral OFAC-DFAT-FCDO sanctions on Russia-based ransomware infrastructure (November 19, 2025); joint statements on PRC human rights and Hong Kong transnational repression; Quad opposition to unilateral coercion in East/South China Seas citing UNCLOS and 2016 arbitral award.",
    leverage: "Hegseth publicly asked Australia to raise defense spending to 3.5% of GDP 'as soon as possible'; Australia's April 2026 NDS committed A$37.9B over a decade and described the U.S. alliance as 'fundamental,' though the pack does not establish causal linkage between the U.S. ask and Australian decisions."
  },
  sources: [
    {label: "White House — Fact Sheet on Trump-Albanese state visit", url: "https://www.whitehouse.gov/fact-sheets/2025/10/fact-sheet-president-donald-j-trump-closes-billion-dollar-deals-with-australia/"},
    {label: "White House — U.S.-Australia Critical Minerals Framework", url: "https://www.whitehouse.gov/briefings-statements/2025/10/united-states-australia-framework-for-securing-of-supply-in-the-mining-and-processing-of-critical-minerals-and-rare-earths/"},
    {label: "State Department — AUSMIN 2025 Joint Fact Sheet", url: "https://www.state.gov/releases/office-of-the-spokesperson/2025/12/joint-fact-sheet-on-australia-u-s-ministerial-consultations-ausmin-2025"},
    {label: "Defense Department — AUSMIN 2025 transcript", url: "https://www.defense.gov/News/Transcripts/Transcript/Article/4354174/secretary-of-war-pete-hegseth-and-secretary-of-state-marco-rubio-australian-dep/"},
    {label: "Minister for Defence (Australia) — AUKUS Defence Ministers' Meeting Joint Statement", url: "https://www.minister.defence.gov.au/statements/2025-12-11/aukus-defence-ministers-meeting-joint-statement"},
    {label: "CRS — AUKUS Pillar I (R48875)", url: "https://www.congress.gov/crs-product/R48875"},
    {label: "CRS — Naval Nuclear Propulsion Agreement (IF11999)", url: "https://www.congress.gov/crs-product/IF11999"},
    {label: "CRS — Virginia-class Submarine Program (RL32418)", url: "https://www.congress.gov/crs-product/RL32418"},
    {label: "Defense Department — Hegseth-Marles Shangri-La readout", url: "https://www.defense.gov/News/Releases/Release/Article/4202734/readout-of-secretary-of-defense-pete-hegseths-bilateral-meeting-with-australia/"},
    {label: "Defense Department — Hegseth Shangri-La Dialogue remarks", url: "https://www.defense.gov/News/Speeches/Speech/article/4202494/remarks-by-secretary-of-defense-pete-hegseth-at-the-2025-shangri-la-dialogue-in/"},
    {label: "Federal Register — EO 14257 reciprocal tariffs", url: "https://www.federalregister.gov/documents/full_text/html/2025/04/07/2025-06063.html"},
    {label: "Federal Register — EO 14266 modifying reciprocal tariffs", url: "https://www.federalregister.gov/documents/full_text/html/2025/04/15/2025-06462.html"},
    {label: "Federal Register — Proclamation 10895 aluminum Section 232", url: "https://www.federalregister.gov/documents/2025/02/18/2025-02832/adjusting-imports-of-aluminum-into-the-united-states"},
    {label: "Federal Register — ITAR §126.7 final rule", url: "https://www.federalregister.gov/documents/2025/12/30/2025-23998/international-traffic-in-arms-regulations-exemption-for-defense-trade-and-cooperation-among"},
    {label: "Federal Register — Corrosion-resistant steel from Australia final AD determination", url: "https://www.federalregister.gov/documents/2025/08/29/2025-16600/certain-corrosion-resistant-steel-products-from-australia-final-affirmative-determination-of-sales"},
    {label: "Federal Register — Silicon metal from Australia preliminary CVD", url: "https://www.federalregister.gov/documents/2025/09/26/2025-18689/silicon-metal-from-australia-preliminary-affirmative-countervailing-duty-determination-and-alignment"},
    {label: "Treasury Department — Trilateral cyber sanctions press release", url: "https://home.treasury.gov/news/press-releases/sb0319"},
    {label: "State Department — Quad FM Joint Statement (Washington, July 2025)", url: "https://www.state.gov/releases/office-of-the-spokesperson/2025/07/joint-statement-from-the-quad-foreign-ministers-meeting-in-washington/"},
    {label: "State Department — Quad FM Joint Statement (January 2025)", url: "https://www.state.gov/joint-statement-by-the-quad-foreign-ministers"},
    {label: "USNI News — Australia 2026 National Defense Strategy", url: "https://news.usni.org/2026/04/23/australia-to-increase-defense-spending-by-37-9b-over-next-decade"},
    {label: "Federal Register — EO 14383 America First Arms Transfer Strategy", url: "https://www.federalregister.gov/documents/full_text/html/2026/02/11/2026-02814.html"},
    {label: "Congress.gov — FY2026 NDAA S.1071 text", url: "https://www.congress.gov/bill/119th-congress/senate-bill/1071/text/eah"}
  ]
};

/* Foreign Policy Atlas — India (Trump 2nd term) — v3 entry from batch-1 overnight run.
   Pipeline: analyst=Claude (pack-only) · red-team=GPT · editor=Claude · tiebreaker auto-adjudicated. 2026-05-25. */
window.PRESIDENTS["trump"].dossier["India"] = {
  state: "aligned",
  effect: "mixed",
  magnitude: null,
  region: "Indo-Pacific",
  outcome: "The U.S.-India relationship saw both substantial deepening (COMPACT framework, signed 10-year Major Defense Partnership Framework, U.S.-brokered India-Pakistan ceasefire, expanded Quad activity) and an unprecedented mid-period rupture as Trump imposed an additional 25% tariff on India over Russian oil imports (EO 14329), before a February 2026 Interim Trade Agreement framework reset the bilateral track at an 18% reciprocal tariff — still above the pre-April 2025 baseline.",
  inherited: [
    "The 8th U.S.-India 2+2 Intersessional Dialogue advanced defense, space, clean energy, and industrial cooperation as a mature track [state.gov, 2024-09-16].",
    "The Quad Foreign Ministers' Meeting in Tokyo reaffirmed commitment to a free and open Indo-Pacific with India as a core member [state.gov, 2024-07-29].",
    "DoD and India's MoD signed a bilateral Security of Supply Arrangement, making India the 18th SOSA partner [defense.gov, 2024-08-22].",
    "iCET and INDUS-X were operating as flagship technology/defense innovation frameworks, with semiconductor, AI, space, and UAS workstreams [state.gov, 2025-01-17].",
    "India remained on USTR's Priority Watch List with persistent tariff, digital trade, and IP barriers catalogued in the NTE Report [ustr.gov, 2024-03-01].",
    "U.S. major defense sales to India had totaled over $24 billion since 2008, with defense cooperation already described as the 'load-bearing pillar' of the partnership [congress.gov, 2025-08-25]."
  ],
  points: [
    "Trump and Modi launched the 'U.S.-India COMPACT for the 21st Century' and TRUST frameworks at the February 2025 Official Working Visit, planning a 10-year defense partnership Framework and co-production of Javelins, Strykers, and additional P-8Is [whitehouse.gov, 2025-02-13].",
    "Hegseth and Singh signed the 2025 Framework for the U.S.-India Major Defense Partnership, described by DoD as the 'most ambitious and wide-ranging document yet,' superseding the 2023 Roadmap and designating India a logistics/MRO hub [defense.gov, 2025-10-31].",
    "Vance and Rubio brokered a May 10, 2025 India-Pakistan ceasefire after 48 hours of engagement with Modi and Sharif following the Pahalgam attack, though a Hoover survey assessed the brief conflict strengthened Pakistan's army and its China/Turkey ties [state.gov, 2025-05-10].",
    "Trump signed EO 14329 imposing an additional 25% tariff on Indian goods tied to India's Russian oil imports, effective August 27, 2025, on top of EO 14257 reciprocal tariffs — a self-inflicted bilateral rupture with no analogous shock on any other Quad partner [whitehouse.gov, 2025-08-06].",
    "A February 6, 2026 Joint Statement announced an Interim Trade Agreement framework cutting the reciprocal tariff on India from 26% to 18% (still above pre-April 2025 baseline), with India pledging industrial/agricultural tariff cuts and $500B in U.S. purchases; EO 14329 and EO 14257 were terminated February 20, 2026 [whitehouse.gov, 2026-02-06].",
    "Quad activity expanded under Rubio with a January 21, 2025 FM statement, a July 2025 Critical Minerals Initiative, the first IPLN field training exercise in Guam, and the 3rd CTWG hosted in New Delhi ahead of an India-hosted Leaders' Summit (Summit not yet documented as held) [state.gov, 2025-07-01].",
    "FMS approvals advanced (Excalibur projectiles, Javelin rounds), alongside a ~$946M Seahawk sustainment package, ~$1B F404 engine order, and ~$3B planned P-8I procurement reported by CRS for 2025 [congress.gov, 2026-03-10].",
    "The administration deemphasized human rights in bilateral engagement: CRS noted the second Trump Administration appeared to have 'deemphasized' human rights, while USCIRF's 2025 and 2026 reports recommended CPC designation for India with no retrieved evidence State acted [congress.gov, 2026-05-04]."
  ],
  role: "Accelerator",
  confidence: "low",
  evidence: "adequate",
  contested: true,
  counterargument: "A serious negative read — strong enough that contested:true is warranted — holds that the inherited trajectory (2+2, Quad ministerials, iCET, INDUS-X, SOSA, $24B+ FMS pipeline, 2023 Defense Industrial Roadmap) was already accelerating before January 2025, and that most cited positives (TRUST replacing iCET, INDUS Innovation replacing INDUS-X, the 10-year Framework, Quad meetings, exercises, FMS approvals) are continuations a counterfactual administration would likely have produced. By contrast, the most clearly Trump-attributable interventions — EO 14257 reciprocal tariffs and especially EO 14329's Russian-oil tariff — were a major, unforced, presidentially-directed shock that the February 2026 'reset' only partially undid: India remains at an 18% reciprocal tariff versus a pre-April 2025 baseline near zero on most reciprocal categories. On that reading the effect is hurt, not mixed, with Trump closer to a disruptor of the economic pillar than an accelerator. The mixed/Accelerator call holds only if one credits the defense Framework and ceasefire role as net-new acceleration; the pack supports either reading, and the negative case is materially stronger than the analyst initially conveyed.",
  durability: "Mixed. The 10-year defense Framework, FMS pipeline, Quad working-level architecture, and ASIA/INDUS Innovation industrial linkages have multi-year tails. The Interim Trade Agreement remains a framework rather than signed text, and the tariff terminations were executive orders reversible by the same authority that imposed them. Indian strategic memory of EO 14329 is likely to persist regardless of the February 2026 reset.",
  opportunityCost: "The April-August 2025 tariff escalation and EO 14329 consumed bilateral bandwidth that could have advanced ITAR reform, the RDP agreement, fifth-gen fighter/undersea policy review, and Quad Leaders' Summit preparation — all flagged as open gaps in the pack.",
  escalationRisk: "The Russian-oil tariff created a real but contained rupture that India did not let derail defense cooperation; the May 2025 India-Pakistan crisis was de-escalated via U.S. mediation. The Hoover survey noted the brief conflict strengthened Pakistan's army and its China/Turkey ties — a regional escalation risk not fully resolved.",
  decisionVsExecution: "Decision quality is split: the COMPACT/Major Defense Partnership and Quad agenda were coherent strategic decisions well-executed. EO 14329's targeting of India over Russian oil while Quad cooperation deepened reflected cross-cutting decision logic; execution required a six-month reset to repair.",
  crossTheaterTradeoff: "Using IEEPA tariffs against India as a Russia-pressure lever traded Indo-Pacific coalition cohesion for Russia-sanctions signaling. The DoD China Military Power Report assessed Beijing was already trying to 'capitalize on decreased tension along the LAC to stabilize bilateral relations and prevent the deepening of U.S.-India ties' — making the tariff episode strategically costly versus China.",
  grandStrategyDispute: "Whether India should be treated primarily as an indispensable balancer against China (warranting tariff forbearance) or as a transactional trade counterparty subject to the same reciprocity pressure as other partners. The administration pursued both simultaneously.",
  longHorizon: "If the Major Defense Partnership Framework, ASIA co-production, India-as-MRO-hub designation, and a future India-hosted Quad Leaders' Summit are executed, the structural alignment with India against Chinese power deepens materially over a decade. India's structural China concerns are likely to sustain alignment regardless of the U.S. administration, which itself cuts against attributing the alignment primarily to Trump.",
  omissionNote: "No primary readout of a completed India-hosted Quad Leaders' Summit was retrieved; the 2025 IRF Report was reportedly unreleased as of August 2025; no retrieved source confirms State action on USCIRF's CPC recommendation for India; full text of the Interim Trade Agreement and the Major Defense Partnership Framework were not retrieved; specific India-bilateral delta from repeal of the AI 'diffusion framework' not quantified in the pack.",
  levers: {
    security: "10-year Major Defense Partnership Framework signed; FMS pipeline expanded (Excalibur, Javelin, Seahawk sustainment, F404 engines, additional P-8Is); ASIA autonomous systems alliance launched; Tiger Triumph, Yudh Abhyas, Talisman Sabre, Super Garuda Shield exercises sustained (most on inherited tracks); U.S.-brokered India-Pakistan ceasefire May 2025.",
    coalition: "Quad working-level architecture expanded under Rubio with Critical Minerals Initiative, IPLN FTX in Guam, 3rd CTWG in New Delhi, and India slated to host the next Leaders' Summit (not yet documented as held); IMEC and I2U2 reactivation pledged.",
    rivalDenial: "Major Defense Partnership designates India a logistics/MRO hub for Indo-Pacific; COMPACT explicitly targets 'unfair practices in export controls by third parties seeking to exploit overconcentration of critical supply chains.'",
    economicTech: "TRUST framework replaced iCET with AI Infrastructure Roadmap; Pax Silica Declaration; commercial space trade mission to Bengaluru; semiconductor cooperation continued under inherited CHIPS ITSI partnership; per Kratsios remarks, the prior administration's AI 'diffusion framework' restrictions affecting India were repealed (bilateral magnitude not quantified in pack).",
    leverage: "EO 14257 reciprocal tariffs and EO 14329 Russian-oil tariff used as trade leverage; USTR characterized the resulting Interim Trade Agreement as 'reached through tariff leverage' with India committing to industrial/agricultural tariff cuts and $500B purchase pledge before both EOs were terminated — but the resulting 18% reciprocal tariff leaves India worse than the pre-April 2025 baseline."
  },
  linkedPolicies: ["Pakistan", "China", "Russia", "Australia", "Japan"],
  sources: [
    {label: "White House — U.S.-India Joint Leaders' Statement", url: "https://www.whitehouse.gov/briefings-statements/2025/02/united-states-india-joint-leaders-statement/"},
    {label: "White House — Trump-Modi Call Readout", url: "https://www.whitehouse.gov/briefings-statements/2025/01/readout-of-president-donald-j-trumps-call-with-prime-minister-modi-of-india/"},
    {label: "DoD — Framework for U.S.-India Major Defense Partnership Fact Sheet", url: "https://media.defense.gov/2025/Nov/13/2003820236/-1/-1/1/FACT-SHEET-FRAMEWORK-FOR-THE-US-INDIA-MAJOR-DEFENSE-PARTNERSHIP.PDF"},
    {label: "DoD — Hegseth-Jaishankar Meeting Readout", url: "https://www.defense.gov/News/News-Stories/Article/Article/4232258/us-india-talk-10-year-cooperative-framework-defense-cooperation-shared-prioriti/"},
    {label: "DoD — Hegseth Shangri-La Dialogue Remarks", url: "https://www.defense.gov/News/Speeches/Speech/article/4202494/remarks-by-secretary-of-defense-pete-hegseth-at-the-2025-shangri-la-dialogue-in/"},
    {label: "State — Announcing U.S.-Brokered India-Pakistan Ceasefire", url: "https://www.state.gov/releases/office-of-the-spokesperson/2025/05/announcing-a-u-s-brokered-ceasefire-between-india-and-pakistan/"},
    {label: "State — Rubio Call with Jaishankar (May 2025)", url: "https://www.state.gov/releases/office-of-the-spokesperson/2025/05/secretary-rubios-call-with-indian-external-affairs-minister-jaishankar/"},
    {label: "State — Quad FM Joint Statement (Jan 2025)", url: "https://www.state.gov/joint-statement-by-the-quad-foreign-ministers"},
    {label: "State — Quad FM Meeting Joint Statement (July 2025)", url: "https://www.state.gov/releases/office-of-the-spokesperson/2025/07/joint-statement-from-the-quad-foreign-ministers-meeting-in-washington/"},
    {label: "State — Quad IPLN FTX Conclusion", url: "https://www.state.gov/releases/office-of-the-spokesperson/2025/12/quad-concludes-field-training-exercise-to-advance-indo-pacific-logistics-network/"},
    {label: "State — 3rd Quad CTWG New Delhi", url: "https://www.state.gov/releases/office-of-the-spokesperson/2025/12/joint-statement-on-the-3rd-quad-counterterrorism-working-group-ctwg-meeting-between-india-japan-australia-and-the-united-states/"},
    {label: "White House — EO 14329 Russian Federation Tariff", url: "https://www.whitehouse.gov/presidential-actions/2025/08/addressing-threats-to-the-united-states-by-the-government-of-the-russian-federation/"},
    {label: "White House — EO 14329 Fact Sheet", url: "https://www.whitehouse.gov/fact-sheets/2025/08/fact-sheet-president-donald-j-trump-addresses-threats-to-the-united-states-by-the-government-of-the-russian-federation/"},
    {label: "Federal Register — Additional Duties on Products of India", url: "https://www.federalregister.gov/documents/2025/08/27/2025-16419/notice-of-implementation-of-additional-duties-on-products-of-india-pursuant-to-the-presidents"},
    {label: "Federal Register — EO 14257 Reciprocal Tariffs", url: "https://www.federalregister.gov/documents/full_text/html/2025/04/07/2025-06063.html"},
    {label: "White House — U.S.-India Joint Statement (Feb 2026)", url: "https://www.whitehouse.gov/briefings-statements/2026/02/united-states-india-joint-statement/"},
    {label: "White House — Historic Trade Deal Fact Sheet", url: "https://www.whitehouse.gov/fact-sheets/2026/02/fact-sheet-the-united-states-and-india-announce-historic-trade-deal/"},
    {label: "White House — Ending Certain Tariff Actions EO", url: "https://www.whitehouse.gov/presidential-actions/2026/02/ending-certain-tariff-actions/"},
    {label: "USTR — BTA Terms of Reference Fact Sheet", url: "https://ustr.gov/about/policy-offices/press-office/fact-sheets/2025/april/fact-sheet-us-india-establish-terms-reference-bilateral-trade-agreement"},
    {label: "DSCA — India Excalibur Projectiles FMS", url: "https://www.dsca.mil/Press-Media/Major-Arms-Sales/Article-Display/Article/4337518/india-excalibur-projectiles"},
    {label: "DSCA — India Javelin FMS", url: "https://www.dsca.mil/Press-Media/Major-Arms-Sales/Article-Display/Article/4337533/india-javelin-missile-system"},
    {label: "CRS — U.S.-India Defense Sales (IF12438)", url: "https://www.congress.gov/crs-product/IF12438"},
    {label: "CRS — U.S.-India Relations (IF12903)", url: "https://www.congress.gov/crs-product/IF12903"},
    {label: "CRS — India-U.S. Relations (R47597)", url: "https://www.congress.gov/crs-product/R47597"},
    {label: "DoD — 2025 China Military Power Report", url: "https://media.defense.gov/2025/Dec/23/2003849070/-1/-1/1/ANNUAL-REPORT-TO-CONGRESS-MILITARY-AND-SECURITY-DEVELOPMENTS-INVOLVING-THE-PEOPLES-REPUBLIC-OF-CHINA-2025.PDF"},
    {label: "USCIRF — India 2025 Annual Report Chapter", url: "https://www.uscirf.gov/sites/default/files/2025-04/India%202025%20USCIRF%20Annual%20Report.pdf"},
    {label: "USCIRF — 2026 Annual Report", url: "https://www.uscirf.gov/sites/default/files/2026-03/USCIRF_2026_AR_3326_NEW.pdf"},
    {label: "OFAC — Iran-Related Designations (Apr 2025)", url: "https://ofac.treasury.gov/recent-actions/20250410"},
    {label: "OFAC — Russia GL 133", url: "https://ofac.treasury.gov/recent-actions/20260305_33"},
    {label: "Hoover Institution — Survey of India 2026", url: "https://www.hoover.org/sites/default/files/research/docs/Ganguly_SurveyofIndia2026_ch03_web-260223.pdf"},
    {label: "State — Rubio-Jaishankar (May 2026)", url: "https://www.state.gov/releases/office-of-the-spokesperson/2026/05/secretary-of-state-marco-rubio-with-indian-external-affairs-minister-dr-subrahmanyam-jaishankar/"},
    {label: "White House — India AI Impact Summit", url: "https://www.whitehouse.gov/articles/2026/02/u-s-promotes-ai-adoption-sovereignty-and-exports-at-india-ai-impact-summit/"}
  ]
};

/* Foreign Policy Atlas — Saudi Arabia (Trump 2nd term) — v3 entry from batch-1 overnight run.
   Pipeline: analyst=Claude (pack-only) · red-team=GPT · editor=Claude · tiebreaker auto-adjudicated. 2026-05-25. */
window.PRESIDENTS["trump"].dossier["Saudi Arabia"] = {
  state: "aligned",
  effect: "helped",
  magnitude: "material",
  region: "Middle East",
  outcome: "U.S.-Saudi ties moved from a Biden-era reengagement with unresolved discussions of binding security commitments into a formalized strategic alignment anchored by a Major Non-NATO Ally designation, a Strategic Defense Agreement, a civil nuclear joint declaration, a Strategic AI Partnership, and large announced Saudi investment commitments, even as Iranian missile and drone attacks on the Kingdom during 'Operation Epic Fury' exposed Saudi territory and U.S. personnel to direct war spillover.",
  inherited: [
    "Biden administration had 'pivoted back toward a regional partnership approach' after initial reevaluation, with reengagement accelerating from 2022 onward [CRS, 2024-08-27]",
    "U.S.-Saudi normalization talks with Israel were stalled or complicated by Gaza, with Saudi Arabia conditioning normalization on a 'credible pathway' to a Palestinian state [CRS, 2024-08-27]",
    "Discussions about 'potentially binding mutual security commitments' were ongoing but unresolved; U.S. sought to remain Saudi Arabia's 'preferred security partner' against China/Russia inroads [CRS, 2024-08-27]",
    "A $78.5M MK 54 torpedo FMS was notified to Congress on January 3, 2025, seventeen days before inauguration [DSCA, 2025-01-03]",
    "C-SIPA was a Bahrain-only instrument as of late 2024; Saudi Arabia was not a signatory [State Department, 2024-09-12]",
    "Houthis were designated SDGT effective February 16, 2024, with direct bearing on Red Sea security and U.S.-Saudi alignment [State Department, 2024-01-17]"
  ],
  points: [
    "Trump's May 13, 2025 Riyadh state visit produced a $600 billion Saudi investment commitment and a $142 billion FMS Memoranda of Intent characterized by DoD as the largest defense sales deal in U.S. history, though the MOI's line-item composition is not public and overlaps with subsequent individual DSCA notifications [White House, 2025-05-13]",
    "The MBS Washington state visit on November 18-19, 2025 produced the U.S.-Saudi Strategic Defense Agreement, a Joint Declaration on Civil Nuclear Cooperation, an AI MOU, and an escalation of Saudi investment commitments to 'almost $1 trillion'; the texts of the SDA and civil nuclear declaration are not public [White House, 2025-11-18]",
    "President Trump formally designated Saudi Arabia a Major Non-NATO Ally via Presidential Determination, conferring priority access to U.S. military equipment and training and converting the long-discussed binding-commitment question into a presidential act [Federal Register, 2026-01-23]",
    "Saudi Arabia formally joined the National Guard State Partnership Program with Indiana and Oklahoma, a structural deepening of military-to-military ties beyond arms sales [Department of Defense, 2025-08-22]",
    "Rubio and FM Faisal bin Farhan signed a Strategic Artificial Intelligence Partnership covering advanced semiconductors, AI infrastructure, and capability-building; specific chip volumes, model designations, and license categories are not documented [State Department, 2025-11-01]",
    "FMS notifications during the term included PAC-3 MSE ($9.0B), AIM-120C-8 AMRAAM ($3.5B), F-15 sustainment ($3.0B), APKWS II ($100M), and helicopter sustainment/training (~$1B); F-35 future deliveries were referenced in a White House fact sheet but no formal DSCA notification has been retrieved [DSCA, 2026-01-30]",
    "Saudi Arabia hosted U.S.-Russia talks on Ukraine (Feb 18, 2025) and U.S.-Ukraine Black Sea expert group talks (March 2025), with Hegseth publicly thanking Riyadh as a diplomatic venue [Department of Defense, 2025-02-24]",
    "During Operation Epic Fury, Iran launched missile and drone attacks on Saudi cities, infrastructure, airports, military bases, and energy facilities; State authorized then ordered departure of U.S. personnel and elevated the Travel Advisory to Level 3 [Travel.state.gov, 2026-03-13]",
    "Rubio condemned the Iranian strikes on Saudi Arabia and discussed measures to reinforce Saudi defense in a call with FM Faisal bin Farhan [State Department, 2026-03-01]",
    "Energy Secretary Wright signed MOUs on energy cooperation and critical minerals in May 2025, followed by the November 2025 civil nuclear joint declaration; Saudi Arabia is not on the State Department's list of active 123 Agreement partners and no congressional submission is documented [Energy Department, 2025-11-18]"
  ],
  role: "Architect",
  confidence: "medium",
  evidence: "adequate",
  contested: true,
  counterargument: "Critics argue the verdict is closer to mixed than helped. The trajectory toward deeper partnership, resumed arms sales, and discussion of binding security commitments was inherited from Biden's post-2022 reengagement, so MNNA and SDA may be culmination rather than a Trump-caused break. Much of the headline evidence is aspirational or unverifiable: the $600B and 'almost $1T' are announced commitments rather than executed flows; the $142B is a Memoranda of Intent that likely overlaps with subsequent individual DSCA cases (double-counting risk); the SDA text is unavailable, so its obligations are unknown; the civil nuclear item is a pre-statutory joint declaration with no 123 Agreement submitted to Congress and no documented gold-standard nonproliferation commitment; the F-35 approval rests on a White House fact sheet only. The same period saw Iran strike Saudi cities, an attack referenced on U.S. Embassy Riyadh, and ordered departure of U.S. personnel — a relationship that became more formalized while also becoming more exposed to direct war spillover. Human-rights leverage was effectively abandoned (DRL global programs office eliminated; no Saudi-specific designations). Congressional reaction to MNNA, SDA, and the $142B package is not documented.",
  durability: "Mixed. MNNA designation, the State Partnership Program accession, and FMS deliveries already in train create institutional ties that survive personnel changes, but the SDA's text and enforcement mechanisms are unverified, the civil nuclear declaration still requires a formal 123 Agreement submission to Congress, large FMS packages remain subject to Congressional disapproval resolutions, and investment commitments depend on multi-year Saudi follow-through.",
  opportunityCost: "The administration de-prioritized human rights conditionality and democracy promotion as leverage tools; DRL global programs offices were eliminated and no Saudi-specific human rights designations occurred in the term window [fp4america.org, 2025-08-01].",
  escalationRisk: "Iran's missile and drone attacks on Saudi cities during Operation Epic Fury triggered ordered departure of U.S. personnel and a Level 3 Travel Advisory; deeper U.S. defense commitments under MNNA and SDA increase the risk of direct U.S.-Iran confrontation flowing from Saudi territory [Travel.state.gov, 2026-03-13].",
  decisionVsExecution: "Decisions on MNNA, SDA, AI Partnership, and the civil nuclear declaration are presidential acts; execution on the $1T investment pipeline, FMS deliveries (especially F-35 timelines and the line items inside the $142B MOI), and a formal 123 Agreement remain pending and depend on Congressional action and Saudi follow-through.",
  grandStrategyDispute: "Trump's Riyadh address explicitly rejected 'Western interventionist' and 'nation-builder' frameworks in favor of a Middle East 'defined by commerce, not chaos,' representing a deliberate break from democracy-promotion grand strategy that analysts contest [White House, 2025-05-13].",
  longHorizon: "Civil nuclear cooperation, advanced semiconductor access under the AI Partnership, and prospective F-35 deliveries set decade-plus trajectories that could lock in U.S.-Saudi technological interdependence and shape Gulf nonproliferation norms — if the underlying texts and congressional steps materialize.",
  omissionNote: "Saudi position on Abraham Accords normalization with Israel during the period is not documented in primary sources; whether Saudi Arabia endorsed the October 13, 2025 Trump Declaration on Gaza is not confirmed. SDA text, civil nuclear declaration text, F-35 DSCA notification, and Congressional reaction to MNNA and the $142B package are not retrieved. Nature and scale of the referenced attack on U.S. Embassy Riyadh are not documented.",
  linkedPolicies: ["Iran", "Israel", "Bahrain", "United Arab Emirates", "Qatar", "Egypt"],
  levers: {
    security: "MNNA designation, Strategic Defense Agreement (text not public), $142B FMS MOI, PAC-3 MSE and F-15 sustainment packages, F-35 future deliveries referenced in fact sheet, State Partnership Program accession, and reinforced air/missile defense discussion following Iranian strikes.",
    economicTech: "$600B-to-'almost $1T' Saudi investment commitments (announced, not executed), Strategic AI Partnership with advanced semiconductor supply framework, civil nuclear joint declaration (pre-123 Agreement), energy and critical minerals MOUs, and a Treasury Financial and Economic Partnership.",
    coalition: "Saudi Arabia hosted U.S.-Russia and U.S.-Ukraine Black Sea talks; joined the Sudan Quad with U.S., UAE, Egypt; hosted Global Coalition to Defeat ISIS Small Group meeting; participated in GCC ministerial and Critical Minerals Ministerial.",
    rivalDenial: "Strategic AI Partnership and semiconductor supply framework position the U.S. as Saudi Arabia's preferred technology partner against Chinese inroads; MNNA and SDA reinforce U.S. as preferred security partner versus China/Russia, continuing a goal explicit in inherited Biden-era policy."
  },
  sources: [
    {label: "CRS Report on U.S.-Saudi Relations", url: "https://www.congress.gov/crs-product/R48162"},
    {label: "DSCA: MK 54 Torpedoes notification", url: "https://www.dsca.mil/Press-Media/Major-Arms-Sales/Article-Display/Article/4021295/kingdom-of-saudi-arabia-mk-54-mod-0-lightweight-torpedoes"},
    {label: "State Department: Bahrain C-SIPA anniversary", url: "https://2021-2025.state.gov/one-year-anniversary-of-the-signing-of-the-u-s-bahrain-comprehensive-security-integration-and-prosperity-agreement/"},
    {label: "State Department press briefing Jan 17 2024 (Houthi SDGT)", url: "https://2021-2025.state.gov/briefings/department-press-briefing-january-17-2024/"},
    {label: "DoD: Hegseth welcomes Saudi Defense Minister", url: "https://www.defense.gov/News/News-Stories/Article/Article/4076119/hegseth-welcomes-saudi-defense-minister-to-pentagon-underscores-partnership/"},
    {label: "White House: $600B investment fact sheet", url: "https://www.whitehouse.gov/fact-sheets/2025/05/fact-sheet-president-donald-j-trump-secures-historic-600-billion-investment-commitment-in-saudi-arabia/"},
    {label: "White House: Trump Riyadh address", url: "https://www.whitehouse.gov/articles/2025/05/in-riyadh-president-trump-charts-the-course-for-a-prosperous-future-in-the-middle-east/"},
    {label: "DoD: Saudi accession to State Partnership Program", url: "https://www.defense.gov/News/News-Stories/Article/Article/4284178/us-saudi-arabia-strengthen-ties-through-state-partnership-program/"},
    {label: "State Department: Strategic AI Partnership joint statement", url: "https://www.state.gov/releases/office-of-the-spokesperson/2025/11/joint-statement-the-strategic-artificial-intelligence-partnership/"},
    {label: "White House: MBS visit fact sheet", url: "https://www.whitehouse.gov/fact-sheets/2025/11/fact-sheet-president-donald-j-trump-solidifies-economic-and-defense-partnership-with-the-kingdom-of-saudi-arabia/"},
    {label: "Federal Register: Saudi MNNA designation", url: "https://www.federalregister.gov/documents/2026/01/23/2026-01421/presidential-determination-on-designation-of-the-kingdom-of-saudi-arabia-as-a-major-non-nato-ally"},
    {label: "DSCA: PAC-3 MSE notification", url: "https://www.dsca.mil/Press-Media/Major-Arms-Sales/Article-Display/Article/4394629/kingdom-of-saudi-arabia-patriot-advanced-capability-3-missile-segment-enhanceme"},
    {label: "DSCA: F-15 sustainment notification", url: "https://www.dsca.mil/Press-Media/Major-Arms-Sales/Article-Display/Article/4396586/kingdom-of-saudi-arabia-f-15-sustainment"},
    {label: "DSCA: AIM-120C-8 AMRAAM notification", url: "https://www.dsca.mil/Press-Media/Major-Arms-Sales/Article-Display/Article/4173146/kingdom-of-saudi-arabia-aim-120c-8-advanced-medium-range-air-to-air-missiles"},
    {label: "Energy Department: Civil nuclear joint declaration", url: "https://www.energy.gov/articles/us-energy-secretary-and-saudi-arabias-energy-minister-announce-deal-civil-nuclear"},
    {label: "Energy Department: Energy and critical minerals MOUs", url: "https://www.energy.gov/articles/united-states-and-saudi-arabia-strengthen-alliance-energy-critical-mineral-deals"},
    {label: "State Department: 123 Agreements list", url: "https://www.state.gov/bureau-of-international-security-and-nonproliferation/releases/2025/01/123-agreements"},
    {label: "State Department: Rubio call on Iran strikes and Saudi defense", url: "https://www.state.gov/releases/office-of-the-spokesperson/2026/03/secretary-rubios-call-with-saudi-foreign-minister-prince-faisal-bin-farhan-al-saud-12/"},
    {label: "Travel.state.gov: Saudi Arabia Travel Advisory", url: "https://travel.state.gov/content/travel/en/traveladvisories/traveladvisories/saudi-arabia-travel-advisory.html"},
    {label: "White House: Operation Epic Fury", url: "https://www.whitehouse.gov/releases/2026/03/peace-through-strength-president-trump-launches-operation-epic-fury-to-crush-iranian-regime-end-nuclear-threat/"},
    {label: "Freedom House: NGO letter on MBS visit", url: "https://freedomhouse.org/article/us-prioritize-rights-during-saudi-leaders-visit"},
    {label: "FP4America: Democracy and human rights", url: "https://www.fp4america.org/issues/democracy-and-human-rights"},
    {label: "White House: Black Sea expert groups outcomes", url: "https://www.whitehouse.gov/briefings-statements/2025/03/outcomes-of-the-united-states-and-ukraine-expert-groups-on-the-black-sea/"},
    {label: "State Department: Sudan Quad joint statement", url: "https://www.state.gov/releases/2025/09/joint-statement-on-restoring-peace-and-security-in-sudan/"}
  ]
};

/* Foreign Policy Atlas — Egypt (Trump 2nd term) — v3 entry from batch-1 overnight run.
   Pipeline: analyst=Claude (pack-only) · red-team=GPT · editor=Claude · tiebreaker auto-adjudicated. 2026-05-25. */
window.PRESIDENTS["trump"].dossier["Egypt"] = {
  state: "aligned",
  effect: "mixed",
  magnitude: null,
  region: "Middle East / North Africa",
  outcome: "The U.S.-Egypt partnership remained strategically close across the term: FMF was exempted from the January 2025 aid pause and codified at $1.375B in P.L. 119-75 (with $320M conditioned but waivable), ~$5.6B in new FMS cases were notified, Bright Star 25 ran as a recurring biannual exercise, and Cairo participated as a co-mediator in Trump's Gaza process culminating in the October 2025 'Trump Declaration.' Treasury's SDGT designation of the Egyptian Muslim Brotherhood aligned with Cairo's longstanding posture. Much of this trajectory — Egypt as Gaza co-mediator, FMF anchoring, FMS pipeline, Strategic Dialogue/JEC machinery, biannual Bright Star — was inherited; offsetting negatives include continued documented human-rights abuses, USAID dismantling, a 41% Democracy Fund cut, and a trade-remedy action on Egyptian rebar.",
  inherited: [
    "State Department characterized U.S.-Egypt ties as 'a strong partnership based on mutual interest in Middle East peace and stability,' with $50B+ in cumulative military and $30B+ in economic assistance since 1978 [State Department, 2025-01-17]",
    "Inaugural U.S.-Egypt Strategic Dialogue convened in Cairo September 17-19, 2024, with Egypt's FM describing the relationship as 'strategic' and Egypt as a 'super-regional power' [State Department, 2024-09-18]",
    "Biden credited Egypt (with Qatar) as co-mediator of the January 15, 2025 Gaza ceasefire and hostage agreement, capping 'many months of intensive diplomacy' just five days before inauguration [State Department, 2025-01-15]",
    "Biden administration and Congress reprogrammed or withheld a cumulative $750M in FMF for Egypt across FY2020-FY2023 based on human-rights provisions [CRS, 2026-02-25]",
    "2023 and 2024 Country Reports on Human Rights Practices documented torture, arbitrary detention, political prisoners, and 'no significant changes' or 'remained concerning' assessments [State Department, 2024-04-17]",
    "Bright Star has been conducted since 1980 and resumed biannually from 2017, making BS25 a continuation of an inherited exercise schedule [CENTCOM, 2025-11-14]",
    "Approximately $12B in FMS cases for Egypt have been notified across both Biden and Trump administrations since October 7, 2023, indicating a cross-administration pipeline [CRS, 2026-02-25]"
  ],
  points: [
    "Trump exempted Egypt's FMF from the January 2025 90-day foreign-aid pause and signed P.L. 119-75 providing $1.375B in FMF with $320M conditioned on human-rights determinations subject to a national-security waiver; pack flags waiver invocation status as unknown [CRS, 2026-02-25]",
    "DSCA notified at least $5.6B in new FMS cases in 2025 — NASAMS ($4.67B), Fast Missile Craft modernization ($625M), AN/TPS-78 radar ($304M) — with Abrams refurbishment ($4.69B) in the FY2025 arms-transfer report, though notifications are not LOAs or deliveries [State Department, 2026-03-16]",
    "Trump visited Egypt October 13-14, 2025 to sign the 'Trump Declaration for Enduring Peace and Prosperity' tied to the Gaza peace agreement, with a follow-on pull-aside with Sisi at Davos on January 21, 2026; no full readout of the Egypt visit was retrieved [White House, 2025-10-14]",
    "USCENTCOM and the Egyptian Armed Forces co-hosted Exercise Bright Star 25 at Mohamed Naguib Military Base August 28-September 10, 2025 with over 46 nations invited, continuing a biannual cycle in place since 2017 [CENTCOM, 2025-08-29]",
    "Treasury designated the Egyptian Muslim Brotherhood as an SDGT on January 13, 2026 for material support to Hamas — a designation Cairo had sought since its own 2013 listing — though no primary source quantifies practical disruption [Treasury, 2026-01-13]",
    "Washington included Egypt in regional formats — the U.S.-Egypt-Saudi-UAE Sudan 'Quad,' the ALPS Sudan statement, two Libya Senior Officials Meetings, and the October 2025 eight-minister Gaza joint statement — building on Egypt's preexisting regional role [State Department, 2025-09-01]",
    "FMF conditionality persisted on paper while parallel democracy-promotion architecture was hollowed: USAID staff placed on administrative leave with ~1,600 RIF, FY2026 Democracy Fund cut 41%, and DRL global-programs and multilateral offices eliminated [FP4America, 2026-02-01]",
    "Human-rights conditions did not improve during the window: HRW recorded 44 in-custody deaths through September 2025, and Freedom House continued to rate Egypt 'Not Free,' even as the State Department published critical 2024 Country Reports and two Egypt-specific mandated reports [HRW, 2025-12-01]",
    "Commerce issued a preliminary affirmative LTFV determination on Egyptian steel rebar on March 13, 2026, signaling willingness to use trade-remedy tools against an aligned partner [Federal Register, 2026-03-13]"
  ],
  role: "Inheritor",
  confidence: "medium",
  evidence: "adequate",
  contested: true,
  counterargument: "An Accelerator reading is defensible: the administration secured a $75M FMF bump above baseline, won the EMB SDGT designation Cairo had long sought, elevated Cairo as co-signatory of the 'Trump Declaration,' and notified ~$5.6B in major new FMS cases including NASAMS — all of which point to active deepening rather than mere continuation. Conversely, a human-rights-focused critic could score this 'hurt' given the dismantling of USAID, the 41% Democracy Fund cut, DRL eliminations, and unchanged abuse patterns in Egypt. The pack's central unresolved question — what concrete improvement would not have happened anyway given Egypt's preexisting role as Gaza co-mediator, FMF anchor, and recurring Bright Star host — is not answered by primary sources, and CRS itself flags the gap between the ~$12B FMS pipeline since October 2023 and ~$1.3B/year in actual FMF. Magnitude is therefore left unscored and the role set to Inheritor with mixed effect.",
  durability: "Medium-to-high on the security lane: the FMF baseline and FMS pipeline are codified in P.L. 119-75 and multi-year LOAs, and the EMB SDGT designation creates legal effects that outlast the administration. Gaza-mediation centrality depends on Phase Two implementation of the 20-Point Plan, which remains contingent. Democracy-promotion damage (USAID RIF, Democracy Fund cut, DRL eliminations) is also durable absent reversal.",
  opportunityCost: "Retention of the $320M FMF withholding and continued publication of critical human-rights reporting preserved nominal leverage, but the parallel hollowing of USAID, DRL, and the Democracy Fund reduced the U.S. toolkit for pressing Cairo on detentions and civic space documented by HRW and Freedom House. Whether the national-security waiver was invoked is not documented in the pack.",
  decisionVsExecution: "Decisions (FMF exemption, EMB designation, Gaza visit, Quad formation) were presidential or cabinet-level; execution (FMS notifications, Bright Star, Libya SOMs) flowed through DSCA, CENTCOM, and the Rubio-Abdelatty channel with no documented breakdowns. Much of the execution layer reflects inherited bureaucratic momentum rather than new presidential direction.",
  crossTheaterTradeoff: "Egypt was leveraged simultaneously for Gaza mediation, Sudan diplomacy (Quad/ALPS), Libya unification, and Iran-related regional stability — concentrating demands on a single partner whose own human-rights and economic vulnerabilities went largely unaddressed in the pack.",
  grandStrategyDispute: "Whether 'selective alignment' (BRICS+ accession, Rosatom's El Dabaa, Russian Suez grain hub per Horn Review) constitutes hedging that erodes U.S. primacy, or a tolerable diversification by an aligned partner, is contested and not resolved by primary U.S. sources in the pack.",
  longHorizon: "The EMB SDGT designation, EO 14383 arms-transfer framework, and codified $1.375B FMF baseline are likely to outlast the term; the Gaza 'Board of Peace' architecture's longevity is unproven. The erosion of U.S. democracy-promotion infrastructure is also likely to persist.",
  omissionNote: "Pack does not document GERD trilateral outcomes after February 2025, Egypt's operational role in post-Hamas Gaza governance, Rafah/Philadelphi Corridor coordination with Israel, IMET/Section 333 levels, FMF waiver invocation status, FMS LOA signatures or deliveries, whether Egypt-specific ESF was caught in the Impoundment Control Act rescission, or primary readouts of the October 2025 Egypt visit or August-November 2025 bilateral engagement.",
  linkedPolicies: ["Israel", "Qatar", "Saudi Arabia", "United Arab Emirates", "Jordan", "Sudan", "Libya", "Iran"],
  sources: [
    {label: "State Department (handoff page)", url: "https://2021-2025.state.gov/countries-areas/egypt/"},
    {label: "Biden statement on Gaza ceasefire", url: "https://2021-2025.state.gov/2025/01/declaration-du-president-joe-biden/"},
    {label: "Blinken-Abdelatty Strategic Dialogue remarks", url: "https://2021-2025.state.gov/secretary-antony-j-blinken-and-egyptian-foreign-minister-badr-abdelatty-before-the-u-s-egypt-strategic-dialogue/"},
    {label: "CRS RL33003 (Egypt)", url: "https://www.congress.gov/crs-product/RL33003"},
    {label: "CRS IF10575 (Leahy Law)", url: "https://www.congress.gov/crs-product/IF10575"},
    {label: "WH readout Trump-Sisi call", url: "https://www.whitehouse.gov/briefings-statements/2025/02/readout-of-president-donald-j-trumps-call-with-president-el-sisi-of-egypt/"},
    {label: "WH Trump diplomatic triumph (Egypt visit)", url: "https://www.whitehouse.gov/articles/2025/10/widespread-acclaim-for-president-trumps-diplomatic-triumph/"},
    {label: "Trump Declaration for Enduring Peace and Prosperity", url: "https://www.whitehouse.gov/presidential-actions/2025/10/the-trump-declaration-for-enduring-peace-and-prosperity/"},
    {label: "WH Trump-Sisi Davos pull-aside", url: "https://www.whitehouse.gov/videos/president-trump-participates-in-a-pull-aside-with-the-president-of-the-arab-republic-of-egypt/"},
    {label: "DSCA Egypt Fast Missile Craft", url: "https://www.dsca.mil/Press-Media/Major-Arms-Sales/Article-Display/Article/4053400/egypt-fast-missile-craft-modernization"},
    {label: "DSCA Egypt AN/TPS-78", url: "https://www.dsca.mil/Press-Media/Major-Arms-Sales/Article-Display/Article/4053498/egypt-antps-78-long-range-radar"},
    {label: "DSCA Egypt NASAMS", url: "https://www.dsca.mil/Press-Media/Major-Arms-Sales/Article-Display/Article/4254503/egypt-national-advanced-surface-to-air-missile-system"},
    {label: "State PM FY2025 arms transfers report", url: "https://www.state.gov/releases/bureau-of-political-military-affairs/2026/03/fiscal-year-2025-u-s-arms-transfers-and-defense-trade"},
    {label: "CENTCOM Bright Star 25", url: "https://www.centcom.mil/MEDIA/PRESS-RELEASES/Press-Release-View/Article/4290124/us-and-egypt-host-exercise-bright-star-25/"},
    {label: "CENTCOM exercises page (Bright Star history)", url: "https://www.centcom.mil/OPERATIONS-AND-EXERCISES/EXERCISES/"},
    {label: "State terrorist designations of MB chapters", url: "https://www.state.gov/releases/office-of-the-spokesperson/2026/01/terrorist-designations-of-muslim-brotherhood-chapters/"},
    {label: "Treasury press release sb0357", url: "https://home.treasury.gov/news/press-releases/sb0357"},
    {label: "OFAC recent actions 2026-01-13", url: "https://ofac.treasury.gov/recent-actions/20260113"},
    {label: "Joint statement on Sudan (Quad)", url: "https://www.state.gov/releases/2025/09/joint-statement-on-restoring-peace-and-security-in-sudan/"},
    {label: "ALPS Sudan joint statement", url: "https://www.state.gov/releases/office-of-the-spokesperson/2025/08/joint-statement-from-the-alps-group-on-the-humanitarian-situation-in-sudan/"},
    {label: "Libya SOM chair statement", url: "https://www.state.gov/releases/office-of-the-spokesperson/2025/09/chair-statement-on-libya-senior-officials-meeting/"},
    {label: "Libya unified budget joint statement", url: "https://www.state.gov/releases/office-of-the-spokesperson/2026/04/joint-statement-on-libya-unified-budget-agreement/"},
    {label: "Rubio-Abdelatty meeting (Jul 2025)", url: "https://www.state.gov/releases/office-of-the-spokesperson/2025/07/secretary-rubios-meeting-with-egyptian-foreign-minister-abdelatty/"},
    {label: "Rubio-Abdelatty call (Dec 2025)", url: "https://www.state.gov/releases/office-of-the-spokesperson/2025/12/secretary-rubios-call-with-egypt-foreign-minister-abdelatty"},
    {label: "Rubio-Abdelatty call (Mar 2026)", url: "https://www.state.gov/releases/office-of-the-spokesperson/2026/03/secretary-rubios-call-with-egyptian-foreign-minister-abdelatty/"},
    {label: "Rubio-Abdelatty meeting (Apr 2026)", url: "https://www.state.gov/releases/office-of-the-spokesperson/2026/04/secretary-rubios-meeting-with-egyptian-foreign-minister-abdelatty-2/"},
    {label: "Landau Cairo travel", url: "https://www.state.gov/releases/office-of-the-spokesperson/2026/01/deputy-secretary-landaus-travel-to-egypt-ethiopia-kenya-and-djibouti/"},
    {label: "EO 14383 (arms transfer strategy)", url: "https://www.federalregister.gov/documents/full_text/html/2026/02/11/2026-02814.html"},
    {label: "Reevaluating foreign aid EO", url: "https://www.whitehouse.gov/presidential-actions/2025/01/reevaluating-and-realigning-united-states-foreign-aid/"},
    {label: "USAID homepage (RIF)", url: "https://www.usaid.gov/"},
    {label: "FP4America Democracy Fund cut", url: "https://www.fp4america.org/issues/democracy-and-human-rights"},
    {label: "HRW World Report 2026 Egypt", url: "https://www.hrw.org/world-report/2026/country-chapters/egypt"},
    {label: "Freedom House Egypt 2025", url: "https://freedomhouse.org/country/egypt/freedom-world/2025"},
    {label: "Horn Review (selective alignment)", url: "https://hornreview.org/2026/05/08/egypts-eastward-hedging-and-the-logic-of-selective-alignment/"},
    {label: "Commerce steel rebar preliminary LTFV", url: "https://www.federalregister.gov/documents/2026/03/13/2026-04947/steel-concrete-reinforcing-bar-from-egypt-preliminary-affirmative-determination-of-sales-at-less"},
    {label: "State 2024 HR Report Egypt", url: "https://www.state.gov/reports/2024-country-reports-on-human-rights-practices/egypt"}
  ],
  levers: {
    security: "Protected FMF from the aid pause and codified $1.375B in P.L. 119-75; notified ~$5.6B in new FMS cases (NASAMS, Fast Missile Craft, AN/TPS-78) and ran Bright Star 25 with 46+ invited nations as part of a biannual cycle predating the administration; CRS notes reinstated cash-flow financing.",
    coalition: "Included Egypt in the U.S.-Egypt-Saudi-UAE Sudan Quad, the ALPS coalition, Libya SOM formats, and the eight-minister Gaza joint statement endorsing Trump's plan, leveraging Egypt's preexisting regional role.",
    leverage: "Maintained the $320M FMF withholding tied to human-rights determinations subject to a national-security waiver (invocation status undocumented); published the Egypt End-Use Monitoring and 'Justice for Christians' reports; dismantling of USAID/DRL and the 41% Democracy Fund cut reduced parallel non-security leverage.",
    economicTech: "Deputy Secretary Landau led a Cairo economic-engagement trip with the AFRICOM commander; Commerce issued a preliminary affirmative LTFV on Egyptian rebar, signaling willingness to use trade-remedy tools against an aligned partner."
  }
};

/* Foreign Policy Atlas — Qatar (Trump 2nd term) — v3 entry from batch-1 overnight run.
   Pipeline: analyst=Claude (pack-only) · red-team=GPT · editor=Claude · tiebreaker auto-adjudicated. 2026-05-25. */
window.PRESIDENTS["trump"].dossier["Qatar"] = {
  state: "core-ally",
  effect: "helped",
  magnitude: "material",
  region: "Middle East",
  outcome: "U.S.–Qatar ties deepened from a robust inherited MNNA partnership to a presidentially-issued (non-justiciable, revocable) security assurance, a Statement of Intent on over $38 billion in defense cooperation, a White House-announced $1.2 trillion economic commitment package (largely aspirational/commercial), two major FMS cases, and continued U.S.-credited Qatari mediation on Gaza, DRC–Rwanda, and Israel–Iran tracks — though the term window also saw an Iranian missile strike on Al Udeid and an Israeli strike in Doha that the U.S. responded to reactively.",
  inherited: [
    "Qatar designated Major Non-NATO Ally in January 2022 with relationship framed as 50+ years of cooperation [State Department, 2024-03-05]",
    "Al Udeid Air Base hosted CENTCOM and AFCENT Forward Headquarters with Qatar paying a significant share of operating costs [State Department, 2024-03-05]",
    "16th U.S.-Qatar Military Consultative Commission convened at the Pentagon, with U.S. side welcoming Qatar's central role in regional security integration [Defense Department, 2024-10-15]",
    "Qatar served as active co-mediator with U.S. and Egypt on Gaza ceasefire/hostage negotiations through 2024, culminating in January 15, 2025 deal credited to trilateral diplomacy [State Department, 2025-01-15]",
    "Qatar's U.S. investment exceeded $45 billion and bilateral goods trade exceeded $4.6 billion in the year prior to March 2024 [State Department, 2024-03-05]"
  ],
  points: [
    "President Trump's May 14, 2025 Doha visit produced a White House-announced $1.2 trillion economic commitment (White House framing; pack flags 'historic' characterization as unverified) and a Statement of Intent on over $38 billion in defense cooperation including Al Udeid burden-sharing [White House, 2025-05-14]",
    "Executive Order of September 29, 2025 declared U.S. policy to treat any armed attack on Qatar's territory, sovereignty, or critical infrastructure as a threat to U.S. peace and security, with diplomatic, economic, and if necessary military measures — issued after Israel's strike in Doha and explicitly non-justiciable [White House, 2025-09-29]",
    "On June 23, 2025 U.S. and Qatari Patriot batteries jointly defeated an Iranian ballistic missile attack on Al Udeid with no casualties, an engagement JCS Chairman Caine described as the largest single Patriot engagement in U.S. military history [Defense Department, 2025-06-26]",
    "State Department approved a $1.96 billion MQ-9B FMS in March 2025 and a $4.01 billion PAC-2/PAC-3 replenishment under emergency determination in May 2026 [DSCA, 2025-03-26]",
    "Seventh U.S.-Qatar Strategic Dialogue in December 2025 framed ties as an 'enduring strategic partnership,' discussed (not yet established) a first bilateral combined air defense command post, and signed MOUs between Qatar's MOI/Lekhwiya and the FBI [State Department, 2025-12-17]",
    "U.S. publicly credited Qatar's mediation in the DRC–Rwanda peace process, the DRC–M23 Declaration of Principles, and the Trump Gaza Peace Plan [State Department, 2025-07-01]",
    "A reported Qatari offer of a luxury aircraft to serve as Air Force One drew Senate floor objections under the Foreign Emoluments Clause and a hold on DOJ nominees [Congress.gov, 2025-05-13]"
  ],
  role: "Accelerator",
  confidence: "medium",
  evidence: "adequate",
  contested: true,
  counterargument: "A serious case exists that this is closer to mixed than 'helped, major.' Qatar's strategic centrality — MNNA status, Al Udeid as CENTCOM forward HQ, an active U.S.-Qatar-Egypt mediation track, ~$45B in Qatari U.S. investment, and the 16th MCC — was inherited and structurally overdetermined, making most 2025 cooperation continuation rather than transformation. Two extraordinary security shocks occurred on Qatari soil (Iranian missile strike on Al Udeid; Israeli strike in Doha), and the headline upgrade — the September 29 EO — is non-justiciable, unilaterally revocable, lacks Senate treaty advice and consent, was issued reactively after a strike on Qatar, and the pack records no confirmed basing or DCA amendment flowing from it. The $1.2 trillion figure is White House framing that the pack itself flags as unverified, with most of it aspirational commercial activity. The reported aircraft offer raised foreign emoluments objections in Congress. On those grounds, 'Accelerator' fits the evidence better than 'Architect,' and 'material' better than 'major.'",
  levers: {
    security: "Presidential security assurance EO (non-justiciable, revocable), two major FMS cases ($1.96B MQ-9B; $4.01B Patriot replenishment under emergency determination), joint Patriot defense of Al Udeid against Iranian missile attack, new CENTCOM-led air defense operations cell at Al Udeid (January 2026), and Strategic Dialogue discussion of a first bilateral combined air defense command post (not yet established per retrieved sources).",
    coalition: "U.S. publicly credited Qatar's mediator role on Gaza (Trump Peace Plan), DRC–Rwanda, DRC–M23, and Israel–Iran ceasefire tracks; backed Qatar diplomatically after Israel's Doha strike alongside GCC 'attack on one is attack on all' framing.",
    economicTech: "White House-announced $1.2 trillion economic commitment package (pack flags as unverified framing) including $96B Boeing/GE order, $8.5B McDermott contract, $97B Parsons commitment, $1B Quantinuum JV, plus DOE LNG export approval for Golden Pass and joint U.S.-Qatar letter to EU on CSDDD. No Qatar-specific bilateral AI partnership analogous to those with Saudi Arabia, UAE, UK, Japan, or Korea.",
    leverage: "Used presidential visit, security assurance, and emergency-determination FMS to lock in Qatar's burden-sharing at Al Udeid and its mediator role on U.S.-priority files; little evidence leverage was used on human rights or kafala/labor issues."
  },
  durability: "Mixed. The September 29 EO is explicitly non-justiciable and revocable by a future president, and the pack records no confirmed new basing rights or DCA amendment flowing from it. FMS deliveries, the Boeing order, and the new air defense operations cell create longer-lived facts on the ground, but the formal assurance lacks treaty status and the headline economic figures are largely aspirational.",
  opportunityCost: "Human rights, labor/kafala reform, and trafficking concerns flagged by CRS and the TIP framework were absent from the Seventh Strategic Dialogue communiqué and the September 29 EO, indicating these levers were not exercised; no Qatar-specific AI/technology partnership parallel to those concluded with Saudi Arabia, UAE, UK, Japan, or Korea.",
  escalationRisk: "Material. The security assurance commits the U.S. to respond — potentially militarily — to attacks on Qatar, in a region where Iranian missiles already struck Al Udeid and Israel struck targets in Doha during the term window, without Senate treaty backing.",
  decisionVsExecution: "Decision-heavy on discretionary choices (presidential visit package, EO security assurance, emergency-determination Patriot FMS), but much of the operational tempo — exercises, MCC follow-through, mediator role — is execution along the inherited trajectory.",
  grandStrategyDispute: "Whether unilateral presidential security assurances to Gulf monarchies — without Senate treaty advice and consent — strengthen U.S. credibility or overextend U.S. commitments is genuinely contested among serious analysts.",
  omissionNote: "No Qatar-specific reciprocal tariff arrangement, bilateral AI partnership (unlike Saudi Arabia, UAE, UK, Japan, Korea), or human rights conditionality appears in the pack despite parallel frameworks with other partners. Pack also flags 'Secretary of War' language in EO §2(c) without explanation, and notes the Doha strike lacks independent primary documentation.",
  sources: [
    {label: "White House — Fact Sheet: $1.2 trillion Qatar commitment", url: "https://www.whitehouse.gov/fact-sheets/2025/05/fact-sheet-president-donald-j-trump-secures-historic-1-2-trillion-economic-commitment-in-qatar/"},
    {label: "White House — EO Assuring the Security of the State of Qatar", url: "https://www.whitehouse.gov/presidential-actions/2025/09/assuring-the-security-of-the-state-of-qatar/"},
    {label: "CENTCOM — U.S. and Qatari forces defend Al Udeid", url: "https://www.centcom.mil/MEDIA/PRESS-RELEASES/Press-Release-View/Article/4223915/us-and-qatari-forces-successfully-defend-against-iranian-ballistic-missile-atta/"},
    {label: "DoD — Hegseth/Caine Pentagon press conference", url: "https://www.defense.gov/News/Transcripts/Transcript/Article/4227366/defense-secretary-pete-hegseth-and-joint-chiefs-of-staff-chairman-gen-dan-caine/"},
    {label: "State — Seventh U.S.-Qatar Strategic Dialogue joint statement", url: "https://www.state.gov/releases/office-of-the-spokesperson/2025/12/joint-statement-on-the-seventh-united-states-qatar-strategic-dialogue-an-enduring-strategic-partnership"},
    {label: "DSCA — Qatar MQ-9B FMS", url: "https://www.dsca.mil/Press-Media/Major-Arms-Sales/Article-Display/Article/4136302/qatar-mq-9b-remotely-piloted-aircraft/"},
    {label: "State — Qatar Patriot missile replenishment", url: "https://www.state.gov/releases/bureau-of-political-military-affairs/2026/05/qatar-patriot-missile-replenishment/"},
    {label: "State — DRC-Rwanda peace talks with Qatar as observer", url: "https://www.state.gov/releases/office-of-the-spokesperson/2025/06/joint-statement-on-peace-talks-between-the-democratic-republic-of-the-congo-and-the-republic-of-rwanda-mediated-by-the-united-states-and-observed-by-the-state-of-qatar/"},
    {label: "State — Rubio travel to Israel, Qatar, UK", url: "https://www.state.gov/releases/office-of-the-spokesperson/2025/09/secretary-rubios-travel-to-israel-qatar-and-the-united-kingdom/"},
    {label: "State — Rubio with GCC FMs (post-Doha strike)", url: "https://www.state.gov/releases/office-of-the-spokesperson/2025/09/secretary-of-state-marco-rubio-kuwaiti-foreign-minister-abdullah-ali-al-yahya-and-gcc-secretary-general-jasem-mohamed-al-budaiwi-at-a-meeting-with-the-foreign-ministers-of-the-gulf-cooperation-counc/"},
    {label: "Congressional Record — Schumer objections on Qatar aircraft", url: "https://www.congress.gov/119/crec/2025/05/13/171/80/modified/CREC-2025-05-13-pt1-PgS2870-3.htm"},
    {label: "Congressional Record — Blumenthal S. Res. 219", url: "https://www.congress.gov/119/crec/2025/05/13/171/80/modified/CREC-2025-05-13-pt1-PgS2880.htm"},
    {label: "DoE — Golden Pass LNG export approval", url: "https://www.energy.gov/articles/doe-issues-export-approval-golden-pass-lng-accelerating-president-trumps-pledge-restore"},
    {label: "Federal Register — EO 'Assuring the Security of the State of Qatar'", url: "https://www.federalregister.gov/documents/2025/10/06/2025-19483/assuring-the-security-of-the-state-of-qatar"},
    {label: "CENTCOM — New air defense operations cell in Qatar", url: "https://www.centcom.mil/MEDIA/PRESS-RELEASES/Press-Release-View/Article/4376614/us-regional-partners-open-new-air-defense-operations-cell-in-qatar/"},
    {label: "CRS — Qatar: Issues for the 119th Congress", url: "https://www.congress.gov/crs_external_products/R/HTML/R47467.web.html"}
  ]
};

/* Foreign Policy Atlas — Poland (Trump 2nd term) — v3 entry from batch-1 overnight run.
   Pipeline: analyst=Claude (pack-only) · red-team=GPT · editor=Claude · tiebreaker auto-adjudicated. 2026-05-25. */
window.PRESIDENTS["trump"].dossier["Poland"] = {
  state: "core-ally",
  effect: "helped",
  magnitude: "modest",
  region: "Europe",
  outcome: "U.S.-Poland relationship maintained and incrementally deepened across defense, arms transfers, and critical minerals, with new FMF loan guarantee, major FMS approvals, head-of-state engagement with Nawrocki, and a Critical Minerals Framework at the 16th Strategic Dialogue; trade lever via EO 14257/Proclamation 11012 cut against the relationship, and most security scaffolding was inherited.",
  inherited: [
    "Thousands of U.S. and Allied forces hosted in Poland, including V Corps HQ (Forward) in Poznań and an EDI-funded ABCT rotation [State, 2024-07-08]",
    "$285M NATO combat equipment storage site at Powidz pre-positioning $4.3B of equipment for a 4,000-soldier ABCT [DoD Comptroller, 2024-03-01]",
    "Aegis Ashore Redzikowo declared mission-ready at NATO Washington Summit [NATO, 2024-07-10]",
    "Second $2B FMF direct loan with $60M grant subsidy issued to Poland in July 2024 [State, 2024-07-08]",
    "Poland spending ~4% of GDP on defense, highest in NATO [State, 2024-07-08]",
    "15th U.S.-Poland Strategic Dialogue held April 2024 with Duda-Tusk joint White House visit [State, 2024-04-22]",
    "Ongoing Polish procurement pipeline of F-35, Patriot, and Abrams already in motion [State, 2024-07-08]"
  ],
  points: [
    "Hegseth made Warsaw his first bilateral as SecDef, calling Poland 'the model ally on the continent' and confirming ~8,000 U.S. troops on rotational and partial permanent basis, while explicitly hedging that 'you can't make an assumption that America's presence will last forever' and deferring future troop decisions to the President [DoD, 2025-02-14]",
    "Issued a $4 billion FMF loan guarantee to Poland in July 2025, citing Apache, HIMARS, Patriot, and radar procurements and bringing cumulative U.S. FMF loan support to over $15 billion across three years — continuing an inherited financing channel rather than opening a new one [DSCA, 2025-07-25]",
    "Approved a cluster of major FMS cases — AMRAAM ($1.33B), SDB-I ($180M), F-35 sustainment ($1.85B), Javelins ($780M), Blanket Order Training ($200M) — between April and December 2025, largely processing Polish modernization decisions made before the administration [DSCA, 2025-09-18]",
    "Hosted Trump-Nawrocki White House bilateral and dispatched a Presidential Delegation led by SBA Administrator Loeffler to Nawrocki's inauguration; substantive readout of the September 3 bilateral not publicly released [White House, 2025-08-05]",
    "Held 16th Strategic Dialogue in Warsaw (April 2026), signing a Critical Minerals Framework and recording U.S. support for Poland's G20 accession and its goal of becoming a north-south LNG hub [State, 2026-04-30]",
    "Operationalized EDCA infrastructure (Powidz containerized housing, dining, bulk fuel) at the February 2026 EDCA Joint Commission, with Nawrocki ratifying the Labor Implementing Arrangement [EUCOM, 2026-02-27]",
    "Trade lever cut against the relationship: EO 14257 reciprocal tariffs, U.S.-EU tariff framework implementation, Proclamation 11012 import surcharge, DOTP antidumping determination, and mattresses circumvention inquiry imposed costs on Polish exporters [Federal Register, 2025-04-07]",
    "Administration publicly favored Nawrocki during the live Polish presidential campaign (Noem May 2025 speech; Nawrocki White House visit pre-election), which some observers characterized as political intervention in an ally's election [CRS, 2025-07-10]",
    "NATO Hague Summit produced an Alliance-wide 5%-of-GDP pledge by 2035; the White House attributed the breakthrough to Trump's leadership, but the commitment is multilateral and Poland was already near the threshold [NATO, 2025-06-25]"
  ],
  role: "Active Stabilizer",
  confidence: "medium",
  evidence: "adequate",
  contested: true,
  counterargument: "A skeptic argues this is closer to Inheritor: V Corps Forward, Aegis Ashore, Powidz prepositioning, the $2B FMF loan template, ~4% defense spending, and the Strategic Dialogue cadence were all inherited; FMS notifications process pre-existing Polish purchase decisions; the 16th Strategic Dialogue is the next numbered installment of an established track; and 'sustaining' ~8,000 troops while publicly warning that U.S. presence cannot be assumed permanent is maintenance with uncertainty, not acceleration. The trade lever (EO 14257, Proclamation 11012, antidumping actions) imposed real costs, and the administration's intervention in Poland's presidential election is a contested rather than unambiguously positive bilateral act. Under that reading the net effect is mixed, not helped.",
  durability: "Medium: EDCA infrastructure operationalization, multi-year FMS sustainment tails, and the $15B+ cumulative FMF loan stack create lock-in, but Hegseth explicitly reserved future troop posture to the President, and the Hague 5% pledge is Alliance-wide with a 2035 horizon dependent on successor administrations.",
  opportunityCost: "Tariff regime under EO 14257, U.S.-EU reciprocal framework, and Proclamation 11012 imposed friction on Polish exporters via the EU-wide schedule; trade lever pulled against the security lever and partially offset bilateral gains.",
  decisionVsExecution: "Both: Trump-level decisions on FMF guarantee, Nawrocki bilateral, Hague 5% push, and EO 14268 FMS reform; execution via Hegseth, Rubio, Hooker, and DSCA delivered the operational follow-through on an inherited trajectory.",
  linkedPolicies: ["Ukraine", "Germany", "Sweden", "Finland"],
  levers: {
    security: "First-bilateral signaling by Hegseth, ~8,000 U.S. troops sustained at inherited levels, EDCA Joint Commission and Powidz infrastructure operationalization, Eastern Sentry response following 10 September 2025 airspace violations.",
    economicTech: "Critical Minerals Framework signed April 2026; U.S. statements of support for Poland as north-south LNG hub and G20 accession (statements, not realized outcomes); civil nuclear engagement via Rubio Central Europe trip with Poland-specific terms not publicly retrieved.",
    coalition: "Hague 5% pledge (Alliance-wide), E5 format with Ukraine, B9/Nordic Summit engagement, 3SI Summit U.S. participation, Multinational Division Northeast HQ at Elbląg.",
    leverage: "$4B FMF loan guarantee plus AMRAAM/SDB/F-35/Javelin FMS cases anchoring Poland to U.S. defense industrial base over multi-year sustainment tails."
  },
  sources: [
    {label: "DoD - Hegseth lauds U.S.-Poland alliance", url: "https://www.defense.gov/News/News-Stories/Article/Article/4068503/hegseth-lauds-us-poland-alliance-reemphasizes-call-for-nato-countries-to-increa/"},
    {label: "DoD - Hegseth-Kosiniak-Kamysz Warsaw transcript", url: "https://www.defense.gov/News/Transcripts/Transcript/Article/4068636/defense-secretary-pete-hegseth-and-polish-deputy-prime-minister-wladyslaw-kosin/"},
    {label: "DoD - Hegseth UDCG remarks", url: "https://www.defense.gov/News/Speeches/Speech/article/4064113/opening-remarks-by-secretary-of-defense-pete-hegseth-at-ukraine-defense-contact/"},
    {label: "DoD - Hegseth hosts Polish counterpart at Pentagon", url: "https://www.defense.gov/News/News-Stories/Article/Article/4197967/defense-secretary-hosts-polish-counterpart-at-pentagon/"},
    {label: "DSCA - $4B FMF loan guarantee to Poland", url: "https://www.dsca.mil/Press-Media/Article-Display/Article/4254625/dsca-director-mike-miller-signs-a-4-billion-fmf-loan-guarantee-to-poland-advanc/"},
    {label: "State - $4B FMF loan guarantee announcement", url: "https://www.state.gov/releases/office-of-the-spokesperson/2025/07/u-s-delivers-4-billion-fmf-loan-guarantee-to-poland-advancing-strategic-partnership-and-strengthening-natos-eastern-flank/"},
    {label: "DSCA - Poland AMRAAM FMS", url: "https://www.dsca.mil/Press-Media/Major-Arms-Sales/Article-Display/Article/4168673/poland-aim-120d-advanced-medium-range-air-to-air-missiles"},
    {label: "DSCA - Poland SDB-I FMS", url: "https://www.dsca.mil/Press-Media/Major-Arms-Sales/Article-Display/Article/4194147/poland-gbu-39b-small-diameter-bombs"},
    {label: "DSCA - Poland F-35 sustainment FMS", url: "https://www.dsca.mil/Press-Media/Major-Arms-Sales/Article-Display/Article/4285956/poland-f-35-sustainment"},
    {label: "DoD - Poland Javelin FMS press release", url: "https://media.defense.gov/2025/Sep/18/2003801662/-1/-1/0/PRESS%20RELEASE%20-%20POLAND%2025-62%20CN.PDF"},
    {label: "DSCA - Poland Blanket Order Training FMS", url: "https://www.dsca.mil/Press-Media/Major-Arms-Sales/Article-Display/Article/4368289/poland-blanket-order-training"},
    {label: "White House - Presidential Delegation to Nawrocki inauguration", url: "https://www.whitehouse.gov/briefings-statements/2025/08/president-trump-announces-presidential-delegation-to-the-republic-of-poland-to-attend-the-inauguration-of-president-elect-karol-nawrocki/"},
    {label: "White House - Trump-Nawrocki bilateral", url: "https://www.whitehouse.gov/videos/president-trump-participates-in-a-bilateral-meeting-with-the-president-of-the-republic-of-poland/"},
    {label: "State - 16th U.S.-Poland Strategic Dialogue joint statement", url: "https://www.state.gov/releases/office-of-the-spokesperson/2026/04/joint-statement-on-the-strategic-dialogue-between-the-united-states-and-poland/"},
    {label: "EUCOM - U.S.-Poland EDCA Joint Commission", url: "https://www.eucom.mil/pressrelease/44269/us-poland-strengthen-defense-ties-at-edca-joint-commission"},
    {label: "NATO - Hague Summit Declaration", url: "https://www.nato.int/en/about-us/official-texts-and-resources/official-texts/2025/06/25/the-hague-summit-declaration"},
    {label: "White House - NATO breakthrough readout", url: "https://www.whitehouse.gov/releases/2025/06/president-trumps-leadership-vision-drives-nato-breakthrough/"},
    {label: "NATO - Eastern Sentry launch", url: "https://www.nato.int/en/news-and-events/articles/news/2025/09/12/nato-launches-eastern-sentry-to-bolster-posture-along-eastern-flank"},
    {label: "Federal Register - EO 14257 reciprocal tariffs", url: "https://www.federalregister.gov/documents/full_text/html/2025/04/07/2025-06063.html"},
    {label: "Federal Register - U.S.-EU reciprocal tariff framework", url: "https://www.federalregister.gov/documents/2025/09/25/2025-18660/implementing-certain-tariff-related-elements-of-the-us-eu-framework-on-an-agreement-on-reciprocal"},
    {label: "Federal Register - Proclamation 11012 import surcharge", url: "https://www.federalregister.gov/documents/full_text/html/2026/02/25/2026-03824.html"},
    {label: "Federal Register - DOTP from Poland AD determination", url: "https://www.federalregister.gov/documents/2025/03/28/2025-05316/dioctyl-terephthalate-from-poland-final-affirmative-determination-of-sales-at-less-than-fair-value"},
    {label: "Federal Register - Mattresses from Poland circumvention inquiry", url: "https://www.federalregister.gov/documents/2026/02/10/2026-02637/mattresses-from-poland-initiation-of-circumvention-inquiry-on-the-antidumping-duty-order"},
    {label: "State - On Poland's presidential election", url: "https://www.state.gov/releases/office-of-the-spokesperson/2025/06/on-polands-presidential-election/"},
    {label: "CRS report on Poland (R45784)", url: "https://www.congress.gov/crs-product/R45784"},
    {label: "State - 2025 Investment Climate Statement: Poland", url: "https://www.state.gov/reports/2025-investment-climate-statements/poland"},
    {label: "State - 3SI Summit strategic partnership", url: "https://www.state.gov/releases/office-of-the-spokesperson/2026/04/new-era-of-strategic-partnership-united-states-advances-key-investments-and-cooperation-at-the-three-seas-initiative-summit/"},
    {label: "GMF - Poland's broken defense consensus (SAFE veto)", url: "https://www.gmfus.org/news/polands-broken-defense-consensus"},
    {label: "OAR Q3 IG report (June 2025)", url: "https://media.defense.gov/2025/Aug/15/2003781787/-1/-1/1/OAR_Q3_JUN2025_FINAL_508.PDF"}
  ]
};

/* Foreign Policy Atlas — Hungary (Trump 2nd term) — v3 entry from batch-1 overnight run.
   Pipeline: analyst=Claude (pack-only) · red-team=GPT · editor=Claude · tiebreaker auto-adjudicated. 2026-05-25. */
window.PRESIDENTS["trump"].dossier["Hungary"] = {
  state: "strained",
  effect: "mixed",
  magnitude: null,
  region: "Europe",
  outcome: "Bilateral engagement intensified through a Trump-Orbán summit, Rubio and Vance Budapest visits, a Civil Nuclear IGA, Artemis Accords accession, and VWP restoration — but most headline deliverables remain non-binding MOUs or stated intent, democracy and rule-of-law concerns were de-emphasized, OFAC accommodations preserved Hungary's Russia-linked Paks II exposure, and Orbán's April 2026 electoral defeat left the personalist architecture facing an uncertain successor government.",
  inherited: [
    "Hungary entered the window as a 25-year NATO ally, with State marking the accession anniversary alongside Czechia and Poland [State Department, 2024-03-12]",
    "State Department's 2023 human rights report assessed that 'the human rights situation in Hungary deteriorated during the year,' citing judicial independence and media freedom problems [State Department, 2024-04-17]",
    "A Senate Foreign Relations minority staff report identified Hungary as 'significantly vulnerable to the Kremlin's corrupt agenda' in politics, business, and energy [Congress.gov, 2024-07-17]",
    "No OFAC designations targeted Hungarian officials or entities through January 20, 2025 [Treasury OFAC, 2024-12-31]",
    "Hungary was listed among NATO members in the alliance's collective posture, with 24 allies expected to meet the 2% threshold in 2024 [Defense.gov, 2024-07-08]"
  ],
  points: [
    "Trump hosted Orbán at the White House on November 7, 2025, producing a State fact sheet packaging ~$600M LNG, a ~$114M Westinghouse Paks I fuel deal, a Civil Nuclear MOU contemplating up to 10 SMRs (~$20B), GSOMIA renewal talks, and $700M in stated FMS intent — most items framed as commitments or negotiations rather than executed transactions [State Department, 2025-11-07]",
    "Rubio signed the U.S.-Hungary Civil Nuclear Intergovernmental Agreement in Budapest on February 16, 2026, with State framing Central Europe nuclear deals as 'over $15 billion in business opportunities for U.S. vendors' under EO 14299 [State Department, 2026-02-16]",
    "Vance's Budapest visit delivered MOL's $500M U.S. crude purchase, a FEED study for a U.S. SMR in Hungary, and MOUs between GE Vernova, Holtec, and Westinghouse and Hungary's MVM [White House, 2026-04-09]",
    "Hungary signed the Artemis Accords on October 22, 2025 alongside a Rubio-Szijjártó meeting, and the Visa Waiver Program was fully restored per the November 2025 State fact sheet [State Department, 2025-12-01]",
    "Available U.S. readouts (Landau-Magyar, Landau-Szijjártó, November 2025 fact sheet) frame engagement around 'mutual respect for sovereign decision-making' with no democracy or rule-of-law content, even as HRW reported a Hungarian bill that would 'eviscerate' civil society [Human Rights Watch, 2025-05-21]",
    "OFAC General License 132 specifically authorizes transactions involving the Paks II Russian-linked civil nuclear project, preserving rather than constraining Hungary's Russia-nuclear exposure [Treasury OFAC, 2025-12-17]",
    "Orbán was defeated on April 12, 2026 by Péter Magyar's Tisza party, and no primary U.S. government reaction to the election outcome appears in the pack [Hudson Institute, 2026-04-12]"
  ],
  role: "Architect",
  confidence: "medium",
  evidence: "adequate",
  contested: true,
  counterargument: "A defensible alternative reading is that the effect is mixed-to-negative: much of the announced value is non-binding MOUs and stated intent ($700M FMS with no DSCA notification, ~$20B SMR pipeline, GSOMIA renewal only launched); structural alliance items (Hague 5% pledge, Eastern Sentry, the multinational battlegroup in Hungary, Rutte/DSG visits) are NATO-collective rather than Trump bilateral wins; the administration accommodated Hungary's Russia-linked nuclear exposure via GL 132 and (per secondary reporting) a Russian-oil waiver; democracy tools were curtailed while the 'Transparency of Public Life' bill went unaddressed in U.S. readouts; and Orbán's April 2026 defeat ended Trump's principal counterparty, recasting the architecture as a personalist bet whose durability now depends on a Tisza government the U.S. has not publicly engaged.",
  durability: "Low to mixed. The Civil Nuclear IGA, Artemis Accords accession, and VWP restoration are formal instruments with multi-year horizons; but GSOMIA renewal, the $700M FMS, and the ~$20B SMR pipeline are unconsummated, and Orbán's April 2026 defeat by a two-thirds Tisza majority — with no documented U.S. outreach to the incoming government in the pack — introduces material uncertainty about whether the Orbán-era architecture binds a successor.",
  opportunityCost: "Democracy-promotion tools were de-emphasized or curtailed (NED funding disruption, OMB FY26 zero-funding proposal, 41% Democracy Fund cut, DRL RIFs), and no U.S. readout addressed Hungary's 'Transparency of Public Life' bill — costs borne to secure a commercial-and-alliance package whose binding content remains thin.",
  decisionVsExecution: "Decisions (summit, IGA signing, VWP restoration, Artemis accession) are documented and executed; the larger headline numbers ($700M FMS, $20B SMRs, GSOMIA renewal, Paks I lifetime extension) remain at the MOU/FEED/intent stage in the pack.",
  crossTheaterTradeoff: "Energy deliverables coincided with continued Hungarian exposure to Russian oil and the Paks II project: OFAC issued GL 132 specifically authorizing Paks II transactions and GL 115C for civil nuclear, and a secondary source reports a Hungary-specific Russian-oil waiver expiring November 2026 (not corroborated by a Hungary-named OFAC instrument in the pack) — easing Russia-sanctions pressure on a NATO ally to lock in U.S. commercial positioning.",
  longHorizon: "If the SMR pipeline, Paks I lifetime extension, and GSOMIA renewal mature, the U.S. could displace Russian civil-nuclear and energy footprint in Hungary for a generation; if the Tisza government renegotiates or the FMS/SMR commitments lapse, the late-term architecture thins to symbolic gains and a few executed items (VWP, Artemis, IGA).",
  omissionNote: "Pack contains no primary U.S. reaction to Orbán's April 12, 2026 defeat or to the incoming Tisza government, no Hungary-named OFAC instrument confirming the reported Russian-oil waiver, no retrieved Rubio-Orbán press transcript, and no retrieved Hungary chapter of the 2024 human rights report.",
  linkedPolicies: ["Poland", "Slovakia", "Romania", "Ukraine", "Russia"],
  levers: {
    security: "GSOMIA renewal launched (not concluded), $700M FMS stated intent (no DSCA notification in pack), Interagency Security Dialogue in Budapest, Artemis Accords accession, and Hungary's signature on the NATO-collective Hague 5% pledge.",
    economicTech: "Civil Nuclear IGA and MOU covering SMRs and spent-fuel storage; ~$600M LNG and $500M MOL crude purchases; ~$114M Westinghouse Paks I fuel deal; GE Vernova/Holtec/Westinghouse MOUs with MVM; VWP restoration.",
    rivalDenial: "Mixed: U.S. vendors were inserted into the SMR and fuel pipeline, but OFAC GL 132 (Paks II) and GL 115C (civil nuclear) preserve Hungary's Russia-linked nuclear track rather than displace it within the window.",
    coalition: "Central Europe civil-nuclear push paralleled the U.S.-Slovakia IGA and Three Seas engagement, embedding Hungary in a regional U.S.-led energy bloc — though this is a regional initiative, not a uniquely bilateral Hungary achievement.",
    leverage: "Reciprocal tariffs (EO 14257) and Section 232 semiconductor measures (Proclamation 11002) apply to Hungary at EU-tier; no Hungary-targeted carve-outs are documented in the pack."
  },
  sources: [
    {label: "State Department — U.S.-Hungary Relations Reach New Heights", url: "https://www.state.gov/releases/office-of-the-spokesperson/2025/11/u-s-hungary-relations-reach-new-heights"},
    {label: "White House — Advancing the U.S.-Hungary Bilateral Partnership", url: "https://www.whitehouse.gov/fact-sheets/2026/04/advancing-the-united-states-hungary-bilateral-partnership/"},
    {label: "State Department — Rubio Advances Civil Nuclear Deals in Central Europe", url: "https://www.state.gov/releases/office-of-the-spokesperson/2026/02/secretary-rubio-advances-national-security-through-civil-nuclear-deals-in-central-europe/"},
    {label: "State Department — Artemis Accords signing (Hungary, Malaysia, Philippines)", url: "https://www.state.gov/releases/office-of-the-spokesperson/2025/12/united-states-welcomes-hungary-malaysia-and-the-philippines-signing-the-artemis-accords/"},
    {label: "State Department — DiNanno travel to Hungary", url: "https://www.state.gov/releases/office-of-the-spokesperson/2025/12/under-secretary-for-arms-control-and-international-security-dinannos-travel-to-hungary-and-switzerland/"},
    {label: "State Department — Landau-Magyar meeting", url: "https://www.state.gov/releases/office-of-the-spokesperson/2025/04/deputy-secretary-landaus-meeting-with-hungarian-deputy-foreign-minister-magyar/"},
    {label: "State Department — Landau-Szijjártó call", url: "https://www.state.gov/releases/office-of-the-spokesperson/2025/06/deputy-secretary-landaus-call-with-hungarian-foreign-minister-szijjarto/"},
    {label: "State Department — Rubio-Szijjártó call", url: "https://www.state.gov/releases/office-of-the-spokesperson/2025/09/secretary-rubios-call-with-hungarian-foreign-minister-szijjarto/"},
    {label: "NATO — The Hague Summit Declaration", url: "https://www.nato.int/en/about-us/official-texts-and-resources/official-texts/2025/06/25/the-hague-summit-declaration"},
    {label: "State Department — NATO accession 25th anniversary (Czechia, Hungary, Poland)", url: "https://2021-2025.state.gov/nato-accession-anniversary-for-czechia-hungary-and-poland/"},
    {label: "State Department — 2023 Country Report on Human Rights: Hungary", url: "https://2021-2025.state.gov/reports/2023-country-reports-on-human-rights-practices/hungary/"},
    {label: "Senate Foreign Relations Committee minority staff — Putin's Asymmetric Assault", url: "https://www.congress.gov/committee-print/115th-congress/senate-committee-print/28110"},
    {label: "OFAC FAQs — GL 132 (Paks II)", url: "https://ofac.treasury.gov/faqs/topic/6626"},
    {label: "OFAC Recent Actions — December 17, 2025 (GL 115C, GL 132)", url: "https://ofac.treasury.gov/recent-actions/20251217"},
    {label: "OFAC Recent Actions — December 31, 2024", url: "https://ofac.treasury.gov/recent-actions/20241231"},
    {label: "Federal Register — Hungary ESTA validity", url: "https://www.federalregister.gov/documents/2025/09/18/2025-18031/hungary-electronic-system-for-travel-authorization-validity-and-eligibility"},
    {label: "Federal Register — Reciprocal Tariffs EO 14257", url: "https://www.federalregister.gov/documents/full_text/html/2025/04/07/2025-06063.html"},
    {label: "White House — Trump welcomes Orbán to the White House", url: "https://www.whitehouse.gov/videos/president-donald-j-trump-welcomes-hungarian-prime-minister-viktor-orban-to-the-white-house-%F0%9F%87%BA%F0%9F%87%B8%F0%9F%87%AD%F0%9F%87%BA/"},
    {label: "Hudson Institute — Change in Hungary (Kochis)", url: "https://www.hudson.org/politics-government/change-hungary-offers-trump-us-new-opportunities-daniel-kochis"},
    {label: "Squire Patton Boggs — Hungary after Orbán: Sanctions and Energy", url: "https://www.squirepattonboggs.com/insights/publications/hungary-after-orban-sanctions-trade-and-energy-implications"},
    {label: "Human Rights Watch — Hungary 'Transparency' bill", url: "https://www.hrw.org/news/2025/05/21/hungary-bill-threatens-eviscerate-democracy"},
    {label: "NED — Funding disruption statement", url: "https://www.ned.org/statement-on-neds-funding-disruption-and-program-suspensions/"},
    {label: "Defense.gov — NATO 2% threshold reporting", url: "https://www.defense.gov/News/News-Stories/Article/Article/3825855/us-officials-agree-natos-worth-is-unquestionable/"}
  ]
};

/* Foreign Policy Atlas — Netherlands (Trump 2nd term) — v3 entry from batch-1 overnight run.
   Pipeline: analyst=Claude (pack-only) · red-team=GPT · editor=Claude · tiebreaker auto-adjudicated. 2026-05-25. */
window.PRESIDENTS["trump"].dossier["Netherlands"] = {
  state: "aligned",
  effect: "mixed",
  magnitude: null,
  region: "Europe",
  outcome: "The Netherlands hosted the 2025 NATO Hague Summit where Allies adopted a 5% GDP defense spending target by 2035; Dutch defense spending was estimated at ~3.50% of GDP in 2025 (up from ~3.35% in 2024, an already-rising inherited trajectory). U.S. arms sales advanced (Tomahawk ~$2.19B in FY2025 top-ten, an F-35 case amended upward by ~$1.32B to ~$9.72B against an inherited pipeline, Hellfire $200M); the Netherlands funded a first U.S.-supplied equipment package for Ukraine under a new NATO initiative. Offsetting frictions were direct presidential actions striking core Dutch interests: E.O. 14203 ICC sanctions hit The Hague's host-state role and drew Dutch co-signature of a 79-nation rebuke; EU-wide reciprocal tariffs burdened Dutch trade; and Section 232 Proclamation 11002 explicitly targeted lithography and etching tools — central to Dutch industry — with no retrieved bilateral resolution. The Dutch MFA's April 2026 policy letter explicitly notes 'the position of the US is changing.'",
  inherited: [
    "Netherlands was 2nd-largest destination for U.S. FDI in 2022 and 3rd-largest investor into the U.S., with ~3,000 U.S.-owned firms supporting 240,000+ jobs [State Department, 2024-07-08]",
    "Netherlands confirmed in May 2024 as host of the 2025 NATO Summit in The Hague, with Hague Summit preparation already a U.S.–NATO agenda item under the prior administration [NATO, 2024-05-24]",
    "Washington Summit Declaration (July 2024) reaffirmed 2% GDP defense floor and committed Allies including the Netherlands to a €40B Ukraine assistance baseline; Rutte already calling on Allies to increase spending in December 2024 [NATO, 2024-07-10]",
    "Dutch defense spending already on upward path entering the term (~3.35% of GDP in 2024 est.) inside a broader NATO-wide push [NATO, 2025-08-28]",
    "Previously certified F-35 FMS case for 35 aircraft and munitions ($8.40B original) constituted an inherited FMS pipeline subsequently amended upward in the term window [Federal Register, 2026-05-14]",
    "Dutch FDI screening (VIFO/BTI) operational since 2022, but no outbound investment screening mechanism in place as of March 2024 [State Department, 2024-07-08]",
    "BIS implementation rules on additional semiconductor export controls effective April 2024 set the technology-controls baseline entering the term [Federal Register, 2024-04-04]",
    "Right-leaning Dutch cabinet formation post-November 2023 elections created policy uncertainty identified as a risk to the investment climate [State Department, 2024-07-08]"
  ],
  points: [
    "The Hague Summit's 5% GDP target by 2035 was adopted with Dutch backing announced ahead of the summit, but Dutch spending was already on a rising trajectory (~3.35% in 2024 est. to ~3.50% in 2025 est.) inside a NATO-wide process Rutte was already driving — presidential pressure accelerated rather than reversed the curve [NATO, 2025-08-28]",
    "U.S.–Netherlands defense trade activity included a ~$2.19B Tomahawk sale in the FY2025 top-ten FMS cases and a $200M Hellfire FMS notified in April 2026; a previously certified F-35/munitions case was amended upward by ~$1.32B to ~$9.72B, which is inherited pipeline business rather than fresh bilateral creation [State Department, 2026-03-16]",
    "Under a new NATO initiative (not a bilateral U.S. instrument), the Netherlands funded the first package of U.S.-supplied equipment for Ukraine, operationalizing burden-shifting that Rubio had urged on his April 2025 call with FM Veldkamp [NATO, 2025-08-04]",
    "E.O. 14203 ICC sanctions and successive OFAC/State designations of ICC officials, judges, and ICC-engaged NGOs created direct friction with The Hague's constitutional host-state role, prompting Dutch co-signature of a 79-nation joint statement opposing the U.S. measures [Government of the Netherlands, 2025-02-07]",
    "Section 232 Proclamation 11002 explicitly targeted 'advanced lithography and etching tools' and directed Commerce/USTR to negotiate SME arrangements, placing the Dutch semiconductor equipment sector under direct U.S. tariff/leverage pressure without a retrieved bilateral resolution [Federal Register, 2026-01-20]",
    "EU-wide reciprocal tariffs under E.O. 14257 (initially 20%, reduced to 10% under E.O. 14266) applied to Dutch trade flows alongside Proclamation 11012's temporary import surcharge, layering tariff costs onto a deeply integrated investment relationship [Federal Register, 2025-04-15]",
    "The Netherlands joined U.S.-led tech coalitions as a founding Pax Silica participant and chair of NATO's Transatlantic Quantum Community, though the pack discloses no bilateral U.S.–Netherlands technology-control commitments from these forums [State Department, 2025-12-01]",
    "The Dutch MFA's April 2026 Foreign Affairs Policy Letter explicitly states 'the position of the US is changing' and calls for the Netherlands to take 'a place at Europe's helm' — signaling a defensive recalibration toward European leadership even as routine bilateral cooperation continued [Government of the Netherlands, 2026-04-30]"
  ],
  role: "Inheritor",
  confidence: "medium",
  evidence: "adequate",
  contested: true,
  counterargument: "A reasonable analyst could score this 'helped' and label the role 'Accelerator,' arguing that the administration successfully delivered the 5% NATO pledge on Dutch soil, locked in multi-billion-dollar Dutch purchases of U.S. weapons, secured Dutch financing of U.S. equipment for Ukraine, and brought the Netherlands into Pax Silica and the NATO Quantum chairmanship. The opposing red-team view — reflected in this entry's downgrade from Accelerator to Inheritor — is that those positives are mostly inherited NATO machinery and preexisting Dutch spending momentum (Hague hosting was fixed in May 2024; Dutch spending was already ~3.35% in 2024; the F-35 case was a prior pipeline amendment), while the clearly Trump-authored deltas — E.O. 14203 ICC sanctions, EU reciprocal tariffs, and Section 232 lithography pressure — directly damaged core Dutch interests. The pack supports both readings; 'mixed' with Inheritor framing is the more conservative call given how much of the positive case is structural.",
  durability: "Mixed. The 5% spending pledge, FMS pipeline, and Dutch NATO Quantum chairmanship are structurally sticky but largely embedded in NATO institutions rather than bilateral instruments. ICC-sanctions friction and Section 232 SME bargaining remain unresolved at pack close, and the Dutch April 2026 policy letter signals durable European hedging that may outlast the term.",
  opportunityCost: "Section 232 SME negotiations and ICC sanctions absorbed bilateral bandwidth that could have produced a discrete U.S.–Netherlands technology-controls framework; the pack shows direction-setting (Commerce/USTR mandate) but no retrieved bilateral instrument.",
  escalationRisk: "Low on the security track; meaningful on tech controls, where unilateral Dutch national SME export controls and U.S. Section 232 action create overlapping regimes ripe for divergence.",
  decisionVsExecution: "Presidential decisions (Hague Summit pressure, E.O. 14203, Proclamation 11002, reciprocal tariffs) drove the bilateral agenda; execution flowed through Rubio's routine calls and standard FMS notifications.",
  crossTheaterTradeoff: "Hague 5% pledge and Dutch Ukraine financing align with the administration's burden-shifting strategy articulated in the 2026 NDS, nominally freeing U.S. resources for the Indo-Pacific — though much of this trajectory was already set under the prior administration's NATO process.",
  longHorizon: "Dutch MFA's April 2026 policy letter framing the U.S. as a 'changing' partner and urging Dutch leadership in Europe suggests a long-horizon hedge that may outlast the term regardless of near-term cooperation metrics.",
  omissionNote: "No retrieved primary source names ASML or documents specific bilateral EUV/DUV licensing negotiations during the window, despite Section 232 explicitly targeting lithography tools; no Trump–Schoof joint readout was retrieved beyond a White House video; Pax Silica's bilateral content is not disclosed.",
  linkedPolicies: ["Ukraine", "China", "Israel", "Taiwan"],
  levers: {
    security: "Hague 5% pledge (within NATO process), Dutch financing of U.S. equipment for Ukraine via new NATO initiative, FMS activity (Tomahawk ~$2.19B, F-35 amendment, Hellfire $200M), Volkel and NATO Defence Industry Forum activity.",
    coalition: "Hosted 2025 NATO Summit (inherited assignment); Dutch participation in Pax Silica, 2026 Critical Minerals Ministerial, and chair of NATO Transatlantic Quantum Community; co-signature of G7 RRM Hong Kong statement.",
    economicTech: "Section 232 Proclamation 11002 on semiconductors/SME targeting lithography and etching tools; reciprocal tariffs on EU (E.O. 14257/14266) and Proclamation 11012 surcharge; BIS advanced computing IC rules; AI Exports EO 14320.",
    rivalDenial: "Rubio–Veldkamp call emphasis on ensuring 'cutting-edge technology does not go to our strategic adversaries'; ongoing U.S. pressure on SME export controls toward China overlapping unilateral Dutch national controls."
  },
  sources: [
    {label: "State – Rubio call with FM Veldkamp", url: "https://www.state.gov/releases/office-of-the-spokesperson/2025/04/secretary-rubios-call-with-dutch-foreign-minister-caspar-veldkamp/"},
    {label: "State – Rubio call with FM Berendsen", url: "https://www.state.gov/releases/office-of-the-spokesperson/2026/02/secretary-rubios-call-with-dutch-foreign-minister-berendsen/"},
    {label: "State – Rubio meeting with FM Berendsen", url: "https://www.state.gov/releases/office-of-the-spokesperson/2026/04/secretary-rubios-meeting-with-dutch-foreign-minister-berendsen"},
    {label: "NATO – Hague Summit Declaration", url: "https://www.nato.int/en/about-us/official-texts-and-resources/official-texts/2025/06/25/the-hague-summit-declaration"},
    {label: "NATO – 2025 Hague Summit overview", url: "https://www.nato.int/en/news-and-events/events/2025/6/overview---2025-nato-summit-in-the-hague"},
    {label: "NATO – Defence Expenditure 2014–2025", url: "https://www.nato.int/en/news-and-events/articles/news/2025/08/28/defence-expenditure-of-nato-countries-2014-2025"},
    {label: "Government of the Netherlands – Support for NATO 5% target", url: "https://www.government.nl/latest/news/2025/06/13/the-netherlands-supports-nato-5-target"},
    {label: "Government of the Netherlands – 2026 Foreign Affairs Policy Letter", url: "https://www.government.nl/site/binaries/site-content/collections/documents/2026/04/30/policy-letterforeign-affairs-2026/bz-260416-001-en.pdf"},
    {label: "State – Netherlands Hellfire FMS", url: "https://www.state.gov/releases/bureau-of-political-military-affairs/2026/04/the-netherlands-hellfire-missiles/"},
    {label: "State – FY2025 Arms Transfers", url: "https://www.state.gov/releases/bureau-of-political-military-affairs/2026/03/fiscal-year-2025-u-s-arms-transfers-and-defense-trade"},
    {label: "Federal Register – Arms Sales Notification (F-35 amendment)", url: "https://www.federalregister.gov/documents/2026/05/14/2026-09652/arms-sales-notification"},
    {label: "NATO – First Dutch-funded U.S. package for Ukraine", url: "https://www.nato.int/en/news-and-events/articles/news/2025/08/04/secretary-general-welcomes-first-package-of-us-equipment-for-ukraine-funded-by-the-netherlands-under-new-nato-initiative"},
    {label: "White House – E.O. 14203 ICC sanctions", url: "https://www.whitehouse.gov/presidential-actions/2025/02/imposing-sanctions-on-the-international-criminal-court/"},
    {label: "Government of the Netherlands – 79-nation ICC joint statement", url: "https://www.government.nl/documents/2025/02/07/joint-statement---sanctions-international-criminal-court-icc"},
    {label: "OFAC – Karim Khan SDN designation", url: "https://ofac.treasury.gov/recent-actions/20250213"},
    {label: "Federal Register – Proclamation 11002 (Section 232 semiconductors/SME)", url: "https://www.federalregister.gov/documents/full_text/html/2026/01/20/2026-01052.html"},
    {label: "White House – Section 232 chips fact sheet", url: "https://www.whitehouse.gov/fact-sheets/2026/01/fact-sheet-president-donald-j-trump-takes-action-on-certain-advanced-computing-chips-to-protect-americas-economic-and-national-security/"},
    {label: "White House – E.O. 14257 reciprocal tariffs", url: "https://www.whitehouse.gov/presidential-actions/2025/04/addressing-certain-tariffs-on-imported-articles/"},
    {label: "Federal Register – E.O. 14266 modified tariff rates", url: "https://www.federalregister.gov/documents/full_text/html/2025/04/15/2025-06462.html"},
    {label: "Federal Register – Proclamation 11012 import surcharge", url: "https://www.federalregister.gov/documents/full_text/html/2026/02/25/2026-03824.html"},
    {label: "State – Pax Silica Initiative", url: "https://www.state.gov/releases/office-of-the-spokesperson/2025/12/pax-silica-initiative"},
    {label: "NATO – Netherlands chairs Transatlantic Quantum Community", url: "https://www.nato.int/en/news-and-events/articles/news/2026/05/13/the-netherlands-takes-on-chair-of-natos-transatlantic-quantum-community"},
    {label: "DoD – 2026 National Defense Strategy", url: "https://media.defense.gov/2026/Jan/23/2003864773/-1/-1/0/2026-NATIONAL-DEFENSE-STRATEGY.PDF"},
    {label: "State Investment Climate Statement 2024 (baseline)", url: "https://2021-2025.state.gov/reports/2024-investment-climate-statements/netherlands/"},
    {label: "NATO – 2024 announcement Netherlands hosts 2025 Summit", url: "https://www.nato.int/en/news-and-events/articles/news/2024/05/24/the-netherlands-to-host-2025-nato-summit-in-the-hague"},
    {label: "NATO – Washington Summit Declaration 2024 (baseline)", url: "https://www.nato.int/en/about-us/official-texts-and-resources/official-texts/2024/07/10/washington-summit-declaration"},
    {label: "Federal Register – BIS April 2024 advanced computing controls (baseline)", url: "https://www.federalregister.gov/documents/2024/04/04/2024-07004/implementation-of-additional-export-controls-certain-advanced-computing-items-supercomputer-and"}
  ]
};

/* Foreign Policy Atlas — Belgium (Trump 2nd term) — v3 entry from batch-1 overnight run.
   Pipeline: analyst=Claude (pack-only) · red-team=GPT · editor=Claude · tiebreaker auto-adjudicated. 2026-05-25. */
window.PRESIDENTS["trump"].dossier["Belgium"] = {
  state: "aligned",
  effect: "hurt",
  magnitude: "modest",
  region: "Europe",
  outcome: "Belgium remained a core NATO ally and host of alliance/EU headquarters, with bilateral engagement sustained through routine ministerial traffic and a $79M Hellfire FMS approval. But the net bilateral effect was negative: Belgium was swept into a new EU-wide 15% reciprocal tariff floor, a Section 232 pharmaceutical regime hit Belgium's leading export sector, and AD enforcement against Industeel Belgium added concrete duty liabilities — costs not offset by alliance-wide declarations Belgium would likely have signed regardless.",
  inherited: [
    "Belgium characterized by outgoing administration as 'a key ally in Western Europe,' rooted in NATO membership and hosting NATO HQ and major EU institutions in Brussels [State Department, 2024-04-03]",
    "Outgoing administration credited Belgium's 'strong military and humanitarian support for Ukraine' and praised its EU Council Presidency (Jan–June 2024) [State Department, 2024-07-21]",
    "Belgium signed the Washington Summit Declaration (July 2024) committing Allies to a €40 billion baseline for Ukraine security assistance [NATO, 2024-07-10]",
    "Sixth U.S.–EU Trade and Technology Council ministerial hosted in Leuven, Belgium (April 4–5, 2024), covering semiconductors, critical minerals, AI, and export controls [White House, 2024-04-05]",
    "Belgium characterized as 'highly-developed, long-time economic partner' and 'logistical gateway to Europe's major economies'; implemented OECD 15% global minimum tax January 1, 2024 [State Department, 2024-06-26]",
    "NATO SG (December 2024) already called on all Allies to increase defense spending beyond 2% GDP — pressure for higher Allied spending predated the term window [NATO, 2024-12-12]"
  ],
  points: [
    "Reciprocal tariffs initially imposed a 20% rate on the EU (EO 14257), paused to 10%, then settled at 15% under the July 27–28, 2025 U.S.–EU deal — Belgium as an EU member now subject to a new tariff floor with no equivalent in the inherited baseline [Federal Register, 2025-08-06]",
    "Proclamation 11020 (April 2, 2026) imposed Section 232 tariffs on pharmaceuticals — Belgium's leading export sector, with ~15% of Belgian pharmaceutical production exported to the U.S. in 2024 — at a preferential 15% EU rate, with onshoring/MFN pricing carve-outs but a 100% headline rate absent approved plans [White House, 2026-04-02]",
    "Commerce final AD results (May 15, 2026) determined Industeel Belgium S.A. sold carbon and alloy steel cut-to-length plate at less than normal value, with CBP instructed to assess AD duties; NLMK Belgium entities had no shipments during POR [Federal Register, 2026-05-15]",
    "Section 232 steel/aluminum (Proclamation 10947) was continued at 25% during the term, keeping Belgian steel exporters within scope absent specific exemptions [Federal Register, 2025-06-09]",
    "At the February 2025 NATO Defense Ministerial in Brussels, Secretary Hegseth called for 'more like 5 percent' of GDP on defense and warned U.S. willingness to act as 'permanent guarantor' could not endure under fiscal constraints [Department of Defense, 2025-02-13]",
    "The Hague Summit Declaration (June 25, 2025) committed all Allies, including Belgium, to invest 5% of GDP annually on defence by 2035 (≥3.5% core plus up to 1.5% security-related), with the U.S. National Day message to Belgium explicitly citing the commitment — though Belgium's national plan showing a credible path has not been retrieved [NATO, 2025-06-25]",
    "Belgium's estimated defence expenditure rose only marginally — to approximately 2.07% of GDP in 2025 from approximately 2.04% in 2024 — with all 32 Allies meeting or exceeding 2% in 2025 (vs. three in 2014); the Belgium-specific change within the term is small [NATO, 2026-04-08]",
    "Secretary Rubio met PM De Wever on the margins of the April 2025 NATO FM Meeting (only French-language readout body recovered); later meetings with DPM Prévot covered Venezuela, counternarcotics, and Gaza, reflecting routine bilateral diplomatic engagement [State Department, 2026-01-01]",
    "State Department approved a possible Foreign Military Sale to Belgium of Hellfire missiles and related equipment valued at up to $79 million for counterterrorism capability [Department of Defense, 2025-12-08]",
    "Rubio–Rutte readout at Helsingborg cited U.S. opposition to 'protectionist measures that risk NATO interoperability and readiness,' signaling continuing friction with European defense-industrial preferences [State Department, 2026-05-22]"
  ],
  role: "Spoiler",
  confidence: "medium",
  evidence: "adequate",
  contested: true,
  counterargument: "A reasonable analyst could score this 'mixed' or even modestly positive on alliance-management grounds: Belgium remained a treaty ally without rupture, hosted sustained cabinet-level U.S. traffic, received a $79M FMS approval, and signed onto a 5%-by-2035 Hague commitment that — if executed — would mark a generational shift in burden-sharing. On that view the trade harms are EU-wide rather than Belgium-targeted, the pharmaceutical 15% rate is preferential relative to the 100% headline, and the bilateral was sustained on autopilot rather than damaged. The hurt-modest call depends on weighing concrete new economic costs against alliance-wide declarations Belgium would plausibly have signed regardless.",
  durability: "Mixed. The Hague 5% commitment runs to 2035 with a 2029 trajectory review, giving it institutional staying power but limited near-term realized effect. The U.S.–EU 15% tariff framework and Section 232 pharmaceutical regime are codified in executive orders and reversible by a future administration. AD findings against Industeel Belgium create concrete duty liabilities until reviewed.",
  opportunityCost: "U.S. diplomatic bandwidth in Brussels concentrated on NATO-wide and EU-wide files (defense spending, reciprocal tariffs, critical minerals MOU) rather than bespoke bilateral initiatives with Belgium; no head-of-state visit and no new bilateral framework agreement identified in the pack.",
  decisionVsExecution: "Reciprocal tariff and Section 232 pharmaceutical actions were presidential decisions executed promptly with company-specific onshoring procedures delegated to BIS. The 5% defense target was a presidential/SecDef-driven decision pressed publicly from February 2025 and locked in at The Hague in June 2025, but execution depends on Belgian and other Allied national plans through 2035 — none of which has been retrieved.",
  linkedPolicies: [],
  omissionNote: "Pack could not confirm the identity of the post-January 2025 U.S. ambassador to Belgium; Belgium's national plan for the 5% Hague target; status of U.S. B61 nuclear weapons under NATO nuclear sharing in Belgium; specific Belgian military aid to Ukraine within the term window; the English-language Rubio–De Wever readout body; substantive content of the Landau–Prévot meeting; and the 2024 Country Reports on Human Rights Practices Belgium chapter (PDF inaccessible).",
  levers: {
    security: "Sustained NATO ministerial traffic through Brussels (host-capital effect); $79M Hellfire FMS approval; Hegseth-led pressure that produced Belgium's signature on the alliance-wide Hague 5%-by-2035 commitment, though Belgium's realized spending moved only from ~2.04% to ~2.07% of GDP in the window.",
    coalition: "Belgium remained anchored in NATO and EU collective frameworks as an institutional inheritor; new NATO command structure assigns all three Joint Force Commands to European leadership while the U.S. retains the three component commands.",
    economicTech: "EU-wide 15% reciprocal tariff applied to Belgian goods; continued Section 232 steel/aluminum at 25%; Section 232 pharmaceutical duties (15% EU rate with onshoring carve-outs) hit Belgium's leading export sector; AD findings against Industeel Belgium on CTL plate; U.S.–EU Critical Minerals MOU signed April 2026 with Belgium attending the ministerial."
  },
  sources: [
    {label: "State Department — Travel to France and Belgium, April 2024", url: "https://2021-2025.state.gov/secretary-travel/travel-to-france-and-belgium-april-1-5-2024/"},
    {label: "State Department — Belgium's National Day (2024)", url: "https://2021-2025.state.gov/belgiums-national-day-3/"},
    {label: "NATO — Washington Summit Declaration", url: "https://www.nato.int/en/about-us/official-texts-and-resources/official-texts/2024/07/10/washington-summit-declaration"},
    {label: "White House — U.S.–EU TTC Joint Statement", url: "https://www.whitehouse.gov/briefing-room/statements-releases/2024/04/05/u-s-eu-joint-statement-of-the-trade-and-technology-council-3/"},
    {label: "State Department — 2024 Investment Climate Statement: Belgium", url: "https://2021-2025.state.gov/reports/2024-investment-climate-statements/belgium/"},
    {label: "NATO — Secretary General call for >2% (Dec 2024)", url: "https://www.nato.int/en/news-and-events/articles/news/2024/12/12/nato-secretary-general-calls-on-allies-to-increase-defence-spending-to-prevent-war-nato-must-spend-more"},
    {label: "DoD — Hegseth travel to Germany, Belgium, Poland", url: "https://www.defense.gov/News/Advisories/Advisory/Article/4060059/secretary-of-defense-pete-hegseth-to-travel-to-germany-belgium-and-poland/"},
    {label: "DoD — Hegseth press conference after NATO ministerial", url: "https://www.defense.gov/News/Transcripts/Transcript/Article/4066734/secretary-of-defense-pete-hegseth-press-conference-following-nato-ministers-of/"},
    {label: "State Department — Rubio–De Wever readout (FR)", url: "https://www.state.gov/translations/french/entretien-du-secretaire-detat-rubio-avec-le-premier-ministre-belge-m-de-wever/"},
    {label: "NATO — The Hague Summit Declaration", url: "https://www.nato.int/en/about-us/official-texts-and-resources/official-texts/2025/06/25/the-hague-summit-declaration"},
    {label: "State Department — Belgium's National Day (2025)", url: "https://www.state.gov/releases/office-of-the-spokesperson/2025/07/belgiums-national-day/"},
    {label: "NATO — Funding NATO (updated April 2026)", url: "https://www.nato.int/en/what-we-do/introduction-to-nato/funding-nato"},
    {label: "DoD — Belgium 25-92 Hellfire FMS press release", url: "https://media.defense.gov/2025/Dec/08/2003839643/-1/-1/0/PRESS%20RELEASE%20-%20BELGIUM%2025-92.PDF"},
    {label: "Federal Register — EO 14257 (reciprocal tariffs)", url: "https://www.federalregister.gov/documents/full_text/html/2025/04/07/2025-06063.html"},
    {label: "Federal Register — Further Modifying Reciprocal Tariff Rates (EU 15%)", url: "https://www.federalregister.gov/documents/2025/08/06/2025-15010/further-modifying-the-reciprocal-tariff-rates"},
    {label: "Federal Register — Proclamation 10947 (Section 232 steel/aluminum)", url: "https://www.federalregister.gov/documents/full_text/html/2025/06/09/2025-10524.html"},
    {label: "White House — Proclamation 11020 (pharmaceuticals Section 232)", url: "https://www.whitehouse.gov/presidential-actions/2026/04/adjusting-imports-of-pharmaceuticals-and-pharmaceutical-ingredients-into-the-united-states/"},
    {label: "Federal Register — CTL Plate from Belgium, Final Results", url: "https://www.federalregister.gov/documents/2026/05/15/2026-09753/certain-carbon-and-alloy-steel-cut-to-length-plate-from-belgium-final-results-of-antidumping-duty"},
    {label: "State Department — 2025 Investment Climate Statement: Belgium", url: "https://www.state.gov/reports/2025-investment-climate-statements/belgium"},
    {label: "State Department — Rubio–Prévot readout", url: "https://www.state.gov/releases/office-of-the-spokesperson/2026/01/secretary-rubios-meeting-with-belgian-deputy-prime-minister-prevot/"},
    {label: "State Department — Rubio–Rutte at Helsingborg", url: "https://www.state.gov/releases/office-of-the-spokesperson/2026/05/secretary-rubios-meeting-with-nato-secretary-general-rutte-2/"},
    {label: "NATO — FMs wrap up preparations for Ankara Summit", url: "https://www.nato.int/en/news-and-events/articles/news/2026/05/22/nato-foreign-ministers-wrap-up-preparations-for-ankara-summit-in-helsingborg"},
    {label: "State Department — U.S.–EU Critical Minerals MOU signing", url: "https://www.state.gov/releases/office-of-the-spokesperson/2026/04/secretary-of-state-marco-rubio-and-european-union-trade-commissioner-maros-sefcovic-at-the-signing-of-a-memorandum-of-understanding-for-the-u-s-eu-strategic-partnership-on-critical-minerals-washing/"}
  ]
};

/* Foreign Policy Atlas — Spain (Trump 2nd term) — v3 entry from batch-1 overnight run.
   Pipeline: analyst=Claude (pack-only) · red-team=GPT · editor=Claude · tiebreaker auto-adjudicated. 2026-05-25. */
window.PRESIDENTS["trump"].dossier["Spain"] = {
  state: "strained",
  effect: "hurt",
  magnitude: "modest",
  region: "Europe",
  outcome: "Spain remained a NATO ally with operational military cooperation continuing through Rota, Morón, and major 2025 exercises, but the administration's affirmative new actions toward Spain were predominantly adverse — EU-level reciprocal tariffs and Section 232 steel measures reaching Spanish exporters, multiple Spain-specific AD/CVD outcomes, and sustained USTR friction over the DST and pharmaceutical pricing — while bilateral political engagement thinned to a single Cabinet-level meeting with no documented Trump-Sánchez head-of-state contact.",
  inherited: [
    "Blinken-Albares MOU on Foreign State Information Manipulation characterized the two as 'the strongest of NATO Allies' with cooperation on Ukraine and Middle East peace [State Department, 2024-05-10]",
    "Second U.S.-Spain Cyber and Digital Dialogue established an institutionalized track on cybersecurity and digital policy [State Department, 2024-06-12]",
    "Fourth U.S.-Spain Working Group on Central America convened in Washington on democracy, rule of law, migration, and transnational crime [State Department, 2024-12-05]",
    "FY2025 DoD military construction budget listed Spain at ~$141.2 million (up from ~$121.3M in FY2024), reflecting continued and rising U.S. infrastructure investment at Rota and Morón [DoD Comptroller, 2024-03-11]",
    "July 2024 Washington Summit Declaration reaffirmed the 2% GDP defense pledge as a 'minimum,' with Spain publicly below the threshold [NATO, 2024-07-10]",
    "Spain's own Foreign Action Strategy 2025-2028, issued at the start of the window, reaffirmed NATO and the transatlantic link as a 'core pillar' of Spanish foreign policy independent of U.S. action [Spanish MFA, 2025-01-01]",
    "1988 U.S.-Spain Defense Cooperation Agreement (amended 2015) frames the relationship as grounded in democracy and rule of law [U.S. Embassy Madrid, 2015]"
  ],
  points: [
    "The single documented Cabinet-level bilateral event in the 16-month window — Rubio's May 2025 meeting with Albares — acknowledged Spain's prior pledge to reach 2% of GDP but said 'more must be done,' and Rubio used the readout to highlight 'President Trump's decisive action to remedy our trade deficit with the EU,' framing trade pressure as a bilateral agenda item [State Department, 2025-05-01]",
    "EU-level IEEPA reciprocal tariffs (EO 14257, EO 14266, with extensions in July and August 2025 and an agricultural-scope modification in November 2025) reached Spanish exporters through EU membership; EO 14389 in February 2026 terminated several country-specific tariff actions but kept the EU-affecting reciprocal framework in place [Federal Register, 2026-02-25]",
    "Section 232 steel measures (Proclamation 10896 in February 2025, extended by Proclamation 10947 in June 2025) imposed 25% tariffs on Spanish steel and derivative steel articles [Federal Register, 2025-06-09]",
    "Commerce sustained Spain-specific trade-remedy actions across the window, with final AD/CVD review results on ripe olives, methionine, utility-scale wind towers, carbon steel flanges, and prestressed concrete steel wire strand from Spain [Federal Register, 2025-06-16]",
    "USTR materials flagged Spain's 3% Digital Services Tax as disproportionately hitting U.S. companies (64% U.S.-based vs. 5.1% Spanish), and the 2026 Special 301 Report named Spain on pharmaceutical pricing concerns, indicating sustained bilateral economic friction with no documented resolution [USTR, 2026-04-01]",
    "The August 2025 U.S.-EU trade framework and April 2026 Critical Minerals MOU channeled economic engagement through Brussels; Spain was not listed among the 54 delegations at the February 2026 Critical Minerals Ministerial [State Department, 2026-02-01]",
    "Spain signed the NATO Hague Summit Declaration committing all Allies to 5% of GDP by 2035 (3.5% core defense), raising the spending bar — though as a collective NATO commitment rather than a bilateral U.S.-Spain accomplishment [NATO, 2025-06-25]",
    "Operational military cooperation continued through BTEC 2025 coordinating 122 bilateral activities for 2026, and Spanish participation in Steadfast Dart 25, Defender Europe 25, Swift Response 25, UNITAS 2025, and Avenger Triad 25 — consistent with programmed continuity under the existing DCA framework [Spanish Joint Staff EMAD, 2025-04-10]",
    "A U.S. Navy environmental services contract naming Naval Station Rota confirmed continued U.S. operations at the base, with no documented disruption to or renegotiation of the Defense Cooperation Agreement [Defense.gov, 2025-01-21]",
    "U.S. assistance to Spain's November 2025 repatriation from the Roj camp produced a public State Department thank-you, a small but warm bilateral touchpoint [State Department, 2025-12-01]",
    "Ambassador Benjamín León, Jr. presented credentials to King Felipe VI in February 2026, ending a 13-month post-transition vacancy [U.S. Embassy Madrid, 2026-02-18]",
    "An outside analytical source characterized the U.S.-Spain relationship as 'approaching a strategic crossroads' early in the term, with U.S. concerns about an ally 'not fully aligned' with U.S. foreign policy interests [FPRI, 2025-05-01]"
  ],
  role: "Inheritor",
  confidence: "medium",
  evidence: "adequate",
  contested: true,
  counterargument: "The pack supports two rival readings. The case for 'mixed' or even 'helped/modest' rests on Rubio publicly acknowledging Spain's 2% achievement, Spain signing the Hague 5%/2035 commitment, continuing operational military cooperation across major exercises, the Roj repatriation thank-you, and an eventual ambassadorial confirmation — an active alliance-management story pushing Spain toward greater burden-sharing. The case for 'hurt' (adopted here) is that the administration's discrete, attributable new actions toward Spain were predominantly negative — EU-level reciprocal tariffs and Section 232 steel reaching Spanish exporters, five Spain-specific AD/CVD reviews sustained, USTR escalation on DST and pharmaceutical pricing, only one Cabinet-level bilateral meeting in 16 months, no documented Trump-Sánchez contact, and a 13-month ambassadorial vacancy — while the positives (Hague declaration, exercise calendar, DCA continuity) are largely inherited NATO and institutional machinery that would have proceeded absent the administration's affirmative effort. The strongest red-team challenge — name a concrete positive change in U.S.-Spain relations caused by Trump rather than inherited momentum — is not cleanly answered by the pack, which is why the role here is 'Inheritor' rather than 'Active Stabilizer.'",
  durability: "NATO institutional ties, the DCA framework at Rota and Morón, and embedded exercise programs are durable and largely insulated from political mood. Tariff treatment via EU-level instruments and the Hague 5% pathway will outlast the window; AD/CVD review outcomes lock in for years. The thinness of bilateral political channels is more easily reversed if either side prioritizes engagement.",
  opportunityCost: "With only one Cabinet-level bilateral meeting and no documented head-of-state contact, the administration left unused channels to convert Spain's 2% achievement into a broader political reset or to negotiate DST and pharmaceutical-pricing irritants bilaterally. The 13-month ambassadorial vacancy compounded that thinness.",
  decisionVsExecution: "The decision to route economic statecraft through the EU rather than Madrid is consistent with the broader U.S.-EU framework approach and is deliberate. Execution of bilateral political engagement — one Cabinet meeting, no leader contact, late ambassador — was thin relative to the alliance's stated importance, though the pack does not establish that thinness materially damaged operational cooperation.",
  crossTheaterTradeoff: "The 2026 NDS explicitly tells European allies to 'take primary responsibility' as the U.S. focuses on the homeland and Indo-Pacific, which is the strategic logic behind pressing Spain on burden-sharing through collective NATO mechanisms rather than bilateral upgrades.",
  longHorizon: "If Spain implements the Hague 5%/2035 commitment, it would represent a major long-horizon shift in Spanish defense capacity and U.S.-Spain interoperability; if Spain falls short — its 2025 spending percentage is not in the pack — it becomes a recurring friction point through the Ankara Summit cycle and beyond. Sustained tariff and DST/pharmaceutical-pricing frictions create medium-term commercial drag on the relationship.",
  omissionNote: "No primary-source record of any Trump-Sánchez head-of-state contact appears in the pack across the full 16-month window. Pentagon-to-Pentagon (Hegseth-Spanish MoD) contacts, the status of any DCA renegotiation, Spain-specific FMS notifications, Spain's actual 2025 defense-spending percentage, and Spain's individual Hague 5%-pathway plan are also not documented.",
  linkedPolicies: [],
  levers: {
    security: "Continued U.S. operations at Rota documented via Navy contract; major bilateral and NATO-framework exercises (Steadfast Dart 25, Defender Europe 25, Swift Response 25, UNITAS 2025, Avenger Triad 25) and BTEC coordination of 122 activities for 2026 — operational continuity under inherited DCA framework rather than new bilateral upgrade.",
    coalition: "NATO Hague Declaration locked all Allies including Spain into the 5%/2035 pathway as a collective commitment; Rubio's Antalya and Helsingborg engagements pushed allies including Spain on burden-sharing; Chair of NATO Military Committee visited Spain in February 2026. Bilateral political channel limited to one Cabinet-level meeting with no documented head-of-state contact.",
    economicTech: "EU-level IEEPA reciprocal tariffs (EO 14257, EO 14266, multiple extensions), Section 232 steel measures (Proclamations 10896, 10947), and five Spain-specific Commerce AD/CVD reviews (ripe olives AD and CVD, methionine, wind towers, carbon steel flanges, prestressed concrete wire strand); U.S.-EU August 2025 framework and April 2026 Critical Minerals MOU; sustained USTR friction over Spain's DST and pharmaceutical pricing in the 2026 Special 301 Report."
  },
  sources: [
    {label: "State Department — Rubio-Albares readout", url: "https://www.state.gov/releases/office-of-the-spokesperson/2025/05/secretary-rubios-meeting-with-spanish-foreign-minister-albares/"},
    {label: "NATO — Hague Summit Declaration", url: "https://www.nato.int/en/about-us/official-texts-and-resources/official-texts/2025/06/25/the-hague-summit-declaration"},
    {label: "State Department — Roj camp repatriation statement", url: "https://www.state.gov/releases/office-of-the-spokesperson/2025/12/united-states-applauds-spains-repatriation-of-displaced-persons-from-northeast-syria/"},
    {label: "U.S. Embassy Madrid", url: "https://es.usembassy.gov/es/"},
    {label: "Spanish Joint Staff (EMAD) — BTEC 2025", url: "https://emad.defensa.gob.es/en/prensa/noticias/2025/04/Listado/250410-ni-BTEC25.html"},
    {label: "DoD — Navy contract naming Rota", url: "https://www.defense.gov/News/Contracts/Contract/Article/4035485/"},
    {label: "White House — U.S.-EU trade framework joint statement", url: "https://www.whitehouse.gov/briefings-statements/2025/08/joint-statement-on-a-united-states-european-union-framework-on-an-agreement-on-reciprocal-fair-and-balanced-trade/"},
    {label: "Federal Register — EO 14257 reciprocal tariffs", url: "https://www.federalregister.gov/documents/full_text/html/2025/04/07/2025-06063.html"},
    {label: "Federal Register — EO 14389 Ending Certain Tariff Actions", url: "https://www.federalregister.gov/documents/full_text/html/2026/02/25/2026-03832.html"},
    {label: "Federal Register — Section 232 steel Proclamation 10947", url: "https://www.federalregister.gov/documents/full_text/html/2025/06/09/2025-10524.html"},
    {label: "Federal Register — Ripe olives AD review", url: "https://www.federalregister.gov/documents/2025/06/16/2025-10944/ripe-olives-from-spain-final-results-of-antidumping-duty-administrative-review-2022-2023"},
    {label: "Federal Register — Carbon steel flanges from Spain AD review", url: "https://www.federalregister.gov/documents/2026/02/23/2026-03482/carbon-steel-flanges-from-spain-final-results-of-antidumping-duty-administrative-review-2023-2024"},
    {label: "USTR — 2026 Special 301 Report", url: "https://ustr.gov/sites/default/files/files/Press/Releases/2026/2026%20Special%20301%20Report.pdf"},
    {label: "USTR — DST exhibit", url: "https://ustr.gov/sites/default/files/files/Issue_Areas/Enforcement/Section%20301/Coupang/Exhibit%2008.pdf"},
    {label: "State Department — 2026 Critical Minerals Ministerial", url: "https://www.state.gov/releases/office-of-the-spokesperson/2026/02/2026-critical-minerals-ministerial/"},
    {label: "DoD — 2026 National Defense Strategy", url: "https://media.defense.gov/2026/Jan/23/2003864773/-1/-1/0/2026-NATIONAL-DEFENSE-STRATEGY.PDF"},
    {label: "Spanish MFA — Foreign Action Strategy 2025-2028", url: "https://www.exteriores.gob.es/es/PoliticaExterior/Documents/EAE_2025-2028/Estrategia%20Acci%C3%B3n%20Exterior%20Ingl%C3%A9s.pdf"},
    {label: "FPRI — U.S.-Spain analysis", url: "https://www.fpri.org/article/2025/05/which-alternative-future-should-sanchez-and-trump-pursue-for-us-spain-relations"},
    {label: "NATO — Military Committee Chair visits Spain", url: "https://www.nato.int/en/news-and-events/articles/news/2026/02/06/chair-of-the-nato-military-committee-visits-spain"}
  ]
};

/* Foreign Policy Atlas — Sweden (Trump 2nd term) — v3 entry from batch-1 overnight run.
   Pipeline: analyst=Claude (pack-only) · red-team=GPT · editor=Claude · tiebreaker auto-adjudicated. 2026-05-25. */
window.PRESIDENTS["trump"].dossier["Sweden"] = {
  state: "aligned",
  effect: "helped",
  magnitude: "modest",
  region: "Europe",
  outcome: "Sweden's bilateral relationship with the United States deepened in defense, space, and technology on top of an already-favorable inherited baseline (NATO accession, DCA in force, 2% defense spending), while Sweden absorbed EU-wide reciprocal tariff exposure and continued AD orders on niche steel exports.",
  inherited: [
    "Sweden became NATO's 32nd member on March 7, 2024, ending over two centuries of military non-alignment [State Department, 2024-03-07]",
    "A U.S.–Sweden bilateral Defense Cooperation Agreement signed December 5, 2023 entered into force on August 15, 2024, layering bilateral access onto Article 5 [State Department, 2024-10-31]",
    "Sweden committed to meet NATO's 2% GDP defense spending guideline in 2024, with NATO leadership publicly welcoming the trajectory [NATO, 2024-10-16]",
    "Inaugural U.S.–Sweden Cyber and Digital Dialogue (May 2, 2024) and advanced wireless cooperation statement (Aug 6, 2024) set up a tech-cooperation track [State Department, 2024-05-03]",
    "TSA negotiations with the United States on space technology had been ongoing for five years before signature, indicating a pre-2025 diplomatic pipeline [Swedish Government, 2025-06-23]",
    "Nordic officials had flagged concern at handover about continued U.S. funding for Ukraine across the leadership transition [CRS, 2024-04-04]"
  ],
  points: [
    "Defense Secretary Hegseth hosted Swedish Defense Minister Jonson at the Pentagon and publicly praised Sweden's response to U.S. calls to move toward a 5% of GDP defense spending target by 2035 [Defense Department, 2025-12-04]",
    "State Department approved a possible $930 million FMS of 20 M142 HIMARS launchers with GMLRS, Extended Range GMLRS, and ATACMS munitions to Sweden — a notified decision, not yet a delivered capability [State Department, 2026-03-01]",
    "Secretary Rubio and FM Stenergard signed a non-legally-binding U.S.–Sweden Technology Prosperity Deal MOU in Helsingborg covering AI, connectivity, biomedicine, energy, space, quantum, and research security, with a 180-day exit clause and no funding commitment [White House, 2026-05-22]",
    "Sweden signed a Technology Safeguards Agreement (June 23, 2025) enabling U.S. launchers and advanced space tech to operate from Swedish territory including Esrange, described by Stockholm as 'of major strategic importance,' though after five years of pre-2025 negotiation [Swedish Government, 2025-06-23]",
    "Sweden acceded to the U.S.-led Pax Silica Initiative between the Dec 12, 2025 inaugural summit (which it did not attend) and April 16, 2026, joining a U.S.-anchored coalition on semiconductor and critical-mineral supply chains [State Department, 2026-04-16]",
    "Sweden made its first NATO Air Policing contribution with up to eight JAS 39 Gripens deployed to Poland (April–June 2025), and the Sweden-led Aurora 2026 exercise included U.S. Army short-range air defense elements on Gotland — primarily a NATO/alliance integration milestone [SHAPE, 2025-03-07]",
    "OFAC designated the Sweden-based Foxtrot Network and leader Rawa Majid as serving the Iranian regime, a unilateral U.S. sanctions action targeting Iranian use of Swedish criminal networks [Treasury, 2025-03-12]",
    "Sweden as an EU member became subject to the reciprocal tariff architecture under EO 14257 and successor modifications, and USITC affirmatively continued antidumping orders on non-oriented electrical steel from Sweden — concrete U.S.-imposed trade frictions [USITC, 2026-04-29]",
    "Nordic and Baltic Allies, including Sweden, funded a joint $500M PURL package of U.S.-sourced equipment for Ukraine, with Sweden also part of a separate Denmark–Norway–Sweden $500M package [NATO, 2025-11-13]"
  ],
  role: "Accelerator",
  levers: {
    security: "HIMARS/ATACMS FMS approval, Pentagon ministerial, and Sweden-led Aurora 2026 with U.S. Army air-defense elements on Gotland added bilateral content on top of the inherited DCA, though U.S. force posture in Sweden remains undocumented.",
    coalition: "Sweden's first NATO Air Policing rotation, Arctic Sentry, and Nordic-Baltic PURL packages reflect post-accession alliance integration that the administration encouraged but did not uniquely cause.",
    economicTech: "Technology Safeguards Agreement, non-binding Technology Prosperity Deal MOU, and Pax Silica accession bound Sweden into U.S.-led space, semiconductor, and AI frameworks, though MOU is non-binding and TSA followed five years of inherited negotiations.",
    rivalDenial: "OFAC's designation of the Sweden-based Foxtrot Network targeted Iranian regime use of Swedish criminal networks; research-security workstream in the MOU addresses tech-leakage concerns.",
    leverage: "EU-wide reciprocal tariffs under EO 14257 and continued AD orders on Swedish NOES applied trade pressure on Sweden as an EU member, partially offsetting bilateral political warmth; no Sweden-specific carve-out is documented."
  },
  confidence: "medium",
  evidence: "adequate",
  contested: true,
  counterargument: "The strongest counter is that Sweden's strategic trajectory was overwhelmingly locked in before 2025 — NATO accession (March 2024), DCA entry into force (August 2024), 2% spending commitment (2024), cyber/6G tracks (2024), and five years of TSA negotiation — so the administration is closer to an Inheritor than an Accelerator. On the same evidence, Air Policing, Arctic Sentry, and Aurora 2026 are NATO/Sweden-led processes rather than uniquely U.S.-presidential achievements; the Technology Prosperity Deal is explicitly non-binding with a 180-day exit; the Pax Silica 'first to sign' framing is an unverified superlative (Sweden was not at the inaugural summit); and EU-wide reciprocal tariffs plus continued AD orders on Swedish NOES are concrete U.S.-imposed frictions. A reasonable reader could score this 'mixed' rather than 'helped.'",
  durability: "Medium: the DCA, TSA, Pax Silica accession, and AD orders are codified or formal instruments; the Technology Prosperity Deal MOU is non-binding with a 180-day exit; the HIMARS FMS is a notification, not a delivered capability; and the 2026 NDS shift toward European allies taking 'primary responsibility' is policy direction, not commitment.",
  opportunityCost: "Reciprocal tariff exposure on Sweden as an EU member and continued AD orders on Swedish NOES created concrete economic friction even as bilateral political and defense ties deepened; no Sweden-specific carve-out is documented.",
  decisionVsExecution: "Decisions (HIMARS FMS approval, MOU signature, TSA signature, Pax Silica accession) are documented; execution (HIMARS deliveries, MOU Joint Committee stand-up, U.S. force posture under the DCA, Sweden's current defense-spending figure) is largely undocumented in the pack.",
  crossTheaterTradeoff: "Sweden's Pax Silica accession and the inherited 2024 U.S.–Sweden Indo-Pacific consultation align Stockholm with U.S. positioning on PRC tech and supply-chain competition, extending a European ally into Indo-Pacific economic statecraft.",
  longHorizon: "Aurora 2026, Arctic Sentry, the Technology Prosperity Deal, and TSA position Sweden as a long-horizon node for U.S. Baltic, Arctic, and space access; the 2026 U.S. NDS shift toward European allies taking 'primary responsibility' raises the salience of Sweden's defense-spending trajectory.",
  omissionNote: "Specific DCA access/basing provisions, the TSA operative text, U.S. force posture in Sweden, Sweden's actual current defense-spending figure, and Sweden's specific reciprocal tariff rate were not retrievable; Rubio's 'first to sign Pax Silica' characterization is flagged in the pack as an unverified superlative.",
  linkedPolicies: ["Finland", "Norway", "Denmark"],
  sources: [
    {label: "State Department — NATO/Sweden entry into force", url: "https://2021-2025.state.gov/nato-sweden-entry-into-force-march-7-2024/"},
    {label: "State Department — Sweden DCA treaty (24-815)", url: "https://2021-2025.state.gov/sweden-24-815/"},
    {label: "Defense Department — Hegseth hosts Swedish counterpart", url: "https://www.defense.gov/News/News-Stories/Article/Article/4350032/hegseth-hosts-swedish-counterpart-at-pentagon/"},
    {label: "State Department — Sweden HIMARS FMS", url: "https://www.state.gov/releases/bureau-of-political-military-affairs/2026/03/sweden-m142-high-mobility-artillery-rocket-systems/"},
    {label: "White House — U.S.–Sweden Technology Prosperity Deal", url: "https://www.whitehouse.gov/releases/2026/05/technology-prosperity-deal-between-the-united-states-and-sweden/"},
    {label: "State Department — Rubio/Stenergard TPD signing remarks", url: "https://www.state.gov/releases/office-of-the-spokesperson/2026/05/secretary-of-state-marco-rubio-and-swedish-foreign-minister-maria-malmer-stenergard-at-the-united-states-sweden-technology-prosperity-deal-signing-ceremony/"},
    {label: "Swedish Government — TSA with U.S. on space", url: "https://www.government.se/press-releases/2025/06/sweden-signs-agreement-with-us-on-advanced-space-technology/"},
    {label: "State Department — Finland joins Pax Silica (lists Sweden)", url: "https://www.state.gov/releases/office-of-the-spokesperson/2026/04/finland-joins-pax-silica-initiative/"},
    {label: "State Department — Pax Silica Initiative launch", url: "https://www.state.gov/releases/office-of-the-spokesperson/2025/12/pax-silica-initiative/"},
    {label: "SHAPE — Sweden's first NATO Air Policing contribution", url: "https://shape.nato.int/news-archive/2025/one-year-since-accession-sweden-announces-first-contribution-to-nato-air-policing-3"},
    {label: "NATO — Aurora 2026 deployment to Gotland and Latvia", url: "https://www.nato.int/en/multimedia/multimedia/videos/2026/05/13/allied-forces-deploy-to-latvia-and-gotland-for-large-scale-swedish-led-exercise"},
    {label: "Treasury OFAC — Foxtrot Network/Rawa Majid designation", url: "https://ofac.treasury.gov/recent-actions/20250312"},
    {label: "Treasury — Sanctions on Swedish gang serving Iran", url: "https://home.treasury.gov/news/press-releases/sb0047"},
    {label: "Federal Register — EO 14257 reciprocal tariffs", url: "https://www.federalregister.gov/documents/full_text/html/2025/04/07/2025-06063.html"},
    {label: "USITC — NOES sunset determinations (Sweden et al.)", url: "https://www.usitc.gov/press_room/news_release/2026/er0429_68497.htm"},
    {label: "Federal Register — NOES determinations notice", url: "https://www.federalregister.gov/documents/2026/05/13/2026-09445/non-oriented-electrical-steel-from-china-germany-japan-south-korea-sweden-and-taiwan-determinations"},
    {label: "Swedish Government — Statement of Foreign Policy 2026", url: "https://www.government.se/speeches/2026/02/statement-of-foreign-policy-2026"},
    {label: "NATO — Nordic/Baltic Allies PURL $500M package", url: "https://www.nato.int/en/news-and-events/articles/news/2025/11/13/nordic-and-baltic-allies-to-fund-joint-500m-purl-package-for-ukraine"},
    {label: "White House — America First Arms Transfer Strategy EO", url: "https://www.whitehouse.gov/presidential-actions/2026/02/establishing-an-america-first-arms-transfer-strategy/"},
    {label: "EPRS — 2026 U.S. National Defense Strategy briefing", url: "https://www.europarl.europa.eu/thinktank/en/document/EPRS_BRI(2026)785720"}
  ]
};

/* Foreign Policy Atlas — Norway (Trump 2nd term) — v3 entry from batch-1 overnight run.
   Pipeline: analyst=Claude (pack-only) · red-team=GPT · editor=Claude · tiebreaker auto-adjudicated. 2026-05-25. */
window.PRESIDENTS["trump"].dossier["Norway"] = {
  state: "aligned",
  effect: "hurt",
  magnitude: "modest",
  region: "Europe",
  outcome: "Norway remained a deeply aligned NATO partner on inherited security and Arctic trajectories, but the administration's novel decisions toward Norway were predominantly adverse: universal reciprocal tariffs, two Commerce trade-remedy investigations naming Norwegian exports, a Section 301 probe, and a U.S. campaign that displaced an IMO framework Norway backed.",
  inherited: [
    "NATO founding members; State Department called Norway 'a uniquely important ally for the United States' with long-aligned national security objectives [State Department, 2024-10-21]",
    "Norway committed to reach NATO's 2% GDP target in 2024 and to nearly double its defense budget over the following decade [Defense.gov, 2024-04-18]",
    "U.S. Marine Corps pre-positioned combat equipment in Norway and an updated long-standing defense cooperative agreement was in place as of mid-2024 [Defense.gov, 2024-07-30]",
    "DOD's 2024 Arctic Strategy identified Norway as a key Arctic ally and NATO's 'eyes and ears' in the region [Defense.gov, 2024-07-22]",
    "Blinken and FM Eide signed a U.S.-Norway MOU on critical minerals cooperation on September 30, 2024 [State Department, 2024-09-30]",
    "EUCOM described the 2025 Ford CSG deployment as 'a building block on the last three years' of U.S. CSG work off Norway, indicating a pre-existing CSG rotation pattern [EUCOM, 2025-09-09]"
  ],
  points: [
    "EO 14257 imposed a universal reciprocal-tariff baseline on imports from all partners including Norway as a non-EU EFTA/EEA state; EO 14266 maintained the baseline for non-retaliating partners [Federal Register, 2025-04-09]",
    "Commerce initiated antidumping and countervailing-duty investigations on Norwegian silicon metal (May 2025) and antidumping on high-purity dissolving pulp (Sept 2025) [Federal Register, 2025-05-21]",
    "USTR initiated a Section 301 investigation March 11, 2026 into structural excess capacity practices of 16 economies including Norway, with bilateral consultations sought [USTR, 2026-03-11]",
    "The U.S. led a coalition at IMO MEPC 84 that displaced the Net-Zero Framework Norway had supported, characterizing it as a 'global carbon tax' [State Department, 2026-05-01]",
    "USTR's 2026 Trade Policy Agenda listed Norway in neither the signed Agreements on Reciprocal Trade category nor the framework-deal category, while several European partners appeared in one or the other [USTR, 2026-02-16]",
    "Trump hosted PM Støre at the White House April 24, 2025 for a bilateral covering defense, Ukraine peace, and tariffs; Støre publicly 'saluted' Trump and endorsed a ceasefire push [White House, 2025-04-24]",
    "Rubio met FM Eide June 1, 2025 and 'expressed appreciation' for Norway's support for the 5% GDP defense pledge later endorsed at the Hague Summit [State Department, 2025-06-01]",
    "State approved two Norway-specific FMS cases: $370.9M for 300 AIM-9X Block II missiles and $2.6B for up to nine HH-60W combat rescue helicopters, though FMS notifications largely execute inherited procurement pipelines [DSCA, 2025-07-11]",
    "USS Gerald R. Ford Carrier Strike Group operated with Royal Norwegian Navy and Air Force in the High North Aug 23–Sep 8, 2025, which EUCOM explicitly framed as continuation of three prior years of CSG work off Norway [EUCOM, 2025-09-09]",
    "Norway participated in the 2026 Critical Minerals Ministerial and is listed in Arctic Seven/Arctic Allies framework titles, indicating continued multilateral inclusion even as new bilateral flagships (Pax Silica, TPDs, ICE Pact, ASC) went to Finland and Sweden [State Department, 2026-02-01]"
  ],
  role: "Inheritor",
  confidence: "medium",
  evidence: "adequate",
  contested: true,
  counterargument: "A reasonable analyst could score this 'mixed' rather than 'hurt, modest' by weighting the warm bilateral tone (Trump-Støre bilateral, Støre's public 'salute,' Rubio's Constitution Day statement), the $2.6B HH-60W and $370.9M AIM-9X FMS approvals, Norway's endorsement of the 5% GDP pledge, intensified CSG and NATO exercise activity in the High North, and continued inclusion in Arctic Seven/Arctic Allies and the Critical Minerals Ministerial. The trade-remedy actions are technical statutory processes affecting narrow product lines, and the reciprocal tariff applies universally rather than singling out Norway. The 'hurt' score depends on discounting inherited security continuity (which the draft's own decisionVsExecution language and EUCOM's 'building block on the last three years' quote support) and treating administration-caused trade actions as the net new bilateral signal.",
  decisionVsExecution: "Defense and Arctic cooperation tracked largely on inherited trajectories (pre-positioning, DCAs, CSG rotations, NATO exercises, Norway's own rearmament), with the administration executing rather than redesigning. The novel presidential decisions in-window touching Norway — universal reciprocal tariffs, AD/CVD initiations, Section 301, and the IMO NZF campaign — cut against Norway's interests. After discounting inherited continuity, the net Trump-caused bilateral effect is negative.",
  crossTheaterTradeoff: "New U.S. bilateral Arctic and tech flagships in-window (Arctic Security Cutter MOU with Finland, ICE Pact trilateral with Canada and Finland, Pax Silica with Finland as 14th signatory, Technology Prosperity Deal with Sweden) were structured around Finland and Sweden; Norway was not a signatory or named partner in any of these, though it remained inside multilateral Arctic Seven/Arctic Allies frameworks.",
  opportunityCost: "Norway was not named in the new bilateral Arctic/tech flagships (Pax Silica, TPDs, ICE Pact, ASC); the pack documents Norway's non-inclusion but does not document a rejected Norwegian bid or U.S. consideration-and-pass, so the 'foregone deepening' inference is suggestive rather than established [State Department, 2026-04-01].",
  durability: "Defense ties (FMS pipeline, pre-positioning, NATO exercises) are structurally durable; trade-remedy investigations and the Section 301 outcome remain open within the window and could harden or ease.",
  omissionNote: "U.S.-Norway SDCA page, 2024 Human Rights Report on Norway, Arctic Seven readout, Arctic Allies joint statement, and Rubio-Støre call readout were inaccessible; Norway-specific tariff rate and any Norwegian retaliatory posture not retrieved; no primary-source explanation for Norway's absence from Pax Silica/TPD/ICE Pact retrieved.",
  linkedPolicies: ["Finland", "Sweden", "Denmark"],
  sources: [
    {label: "State Department — Rubio-Eide meeting", url: "https://www.state.gov/releases/office-of-the-spokesperson/2025/06/secretary-rubios-meeting-with-norwegian-foreign-minister-eide/"},
    {label: "White House — Trump-Støre bilateral", url: "https://www.whitehouse.gov/past-events/president-trump-participates-in-a-bilateral-meeting-with-the-prime-minister-of-norway-apr-24-2025/"},
    {label: "White House — Støre 'salute Trump' video", url: "https://www.whitehouse.gov/past-events/norway-pm-store-i-salute-president-trump-we-need-to-have-a-ceasefire/"},
    {label: "State Department — Norway Constitution Day 2025", url: "https://www.state.gov/releases/office-of-the-spokesperson/2025/05/norway-constitution-day/"},
    {label: "NATO — Hague Summit Declaration", url: "https://www.nato.int/en/about-us/official-texts-and-resources/official-texts/2025/06/25/the-hague-summit-declaration"},
    {label: "EUCOM — Ford CSG in High North", url: "https://www.eucom.mil/article/43222/ford-carrier-strike-group-operates-in-the-high-north-with-nato-allies"},
    {label: "DSCA — Norway AIM-9X Block II", url: "https://www.dsca.mil/Press-Media/Major-Arms-Sales/Article-Display/Article/4173194/norway-aim-9x-block-ii-tactical-missiles"},
    {label: "DSCA — Norway HH-60W helicopters", url: "https://www.dsca.mil/Press-Media/Major-Arms-Sales/Article-Display/Article/4241742/norway-hh-60w-helicopters"},
    {label: "Federal Register — EO 14257 reciprocal tariffs", url: "https://www.federalregister.gov/documents/full_text/html/2025/04/07/2025-06063.html"},
    {label: "Federal Register — EO 14266 tariff modifications", url: "https://www.federalregister.gov/documents/full_text/html/2025/04/15/2025-06462.html"},
    {label: "Federal Register — silicon metal LTFV initiation (Norway)", url: "https://www.federalregister.gov/documents/2025/05/21/2025-09027/silicon-metal-from-angola-australia-the-lao-peoples-democratic-republic-and-norway-initiation-of"},
    {label: "Federal Register — silicon metal CVD initiation (Norway)", url: "https://www.federalregister.gov/documents/2025/05/21/2025-09028/silicon-metal-from-australia-the-lao-peoples-democratic-republic-norway-and-thailand-initiation-of"},
    {label: "Federal Register — high-purity dissolving pulp LTFV (Norway)", url: "https://www.federalregister.gov/documents/2025/09/08/2025-17129/high-purity-dissolving-pulp-from-brazil-and-norway-initiation-of-less-than-fair-value-investigations"},
    {label: "USTR — Section 301 investigations (Norway included)", url: "https://ustr.gov/about/policy-offices/press-office/press-releases/2026/march/ustr-initiates-section-301-investigations-relating-structural-excess-capacity-and-production"},
    {label: "USTR — 2026 Trade Policy Agenda", url: "https://ustr.gov/sites/default/files/files/Press/Releases/2026/2026%20Trade%20Policy%20Agenda%202025%20Annual%20Report.pdf"},
    {label: "State Department — 2026 Critical Minerals Ministerial", url: "https://www.state.gov/releases/office-of-the-spokesperson/2026/02/2026-critical-minerals-ministerial/"},
    {label: "State Department — Finland joins Pax Silica", url: "https://www.state.gov/releases/office-of-the-spokesperson/2026/04/finland-joins-pax-silica-initiative/"},
    {label: "White House — Arctic Security Cutters", url: "https://www.whitehouse.gov/presidential-actions/2025/10/construction-of-arctic-security-cutters/"},
    {label: "Federal Register — ICE Pact RFI", url: "https://www.federalregister.gov/documents/2026/04/06/2026-06648/request-for-information-icebreaker-collaboration-effort-ice-pact"},
    {label: "White House — U.S.-Sweden TPD", url: "https://www.whitehouse.gov/releases/2026/05/technology-prosperity-deal-between-the-united-states-and-sweden/"},
    {label: "State Department — IMO NZF coalition (2025)", url: "https://www.state.gov/releases/office-of-the-spokesperson/2025/10/taking-action-to-defend-america-from-the-uns-first-global-carbon-tax-the-international-maritime-organizations-imo-net-zero-framework-nzf/"},
    {label: "State Department — IMO MEPC 84 outcome", url: "https://www.state.gov/releases/office-of-the-spokesperson/2026/05/u-s-coalition-fractures-support-for-the-imo-global-carbon-tax-protecting-american-economic-interests/"},
    {label: "NATO — SG visits Cold Response 26", url: "https://www.nato.int/en/news-and-events/articles/news/2026/03/18/nato-secretary-general-visits-norway-and-observes-exercise-cold-response-26-in-the-high-north"},
    {label: "JWC NATO — STEADFAST DETERRENCE 2025", url: "https://www.jwc.nato.int/article/exercise-steadfast-deterrence-2025-certifies-shape-as-warfighting-hq-enables-operational-convergence-with-useucom/"}
  ]
};

/* Foreign Policy Atlas — Greece (Trump 2nd term) — v3 entry from batch-1 overnight run.
   Pipeline: analyst=Claude (pack-only) · red-team=GPT · editor=Claude · tiebreaker auto-adjudicated. 2026-05-25. */
window.PRESIDENTS["trump"].dossier["Greece"] = {
  state: "core-ally",
  effect: "mixed",
  magnitude: null,
  region: "Europe",
  outcome: "Greece remained a core NATO ally with the inherited MDCA basing architecture, multi-billion-dollar FMS pipeline, and Souda Bay/Alexandroupolis infrastructure intact. The Trump administration added a November 2025 bilateral Economic Security Declaration covering seven technology supply-chain stacks and hosted a 3+1 Energy Ministerial in Athens producing a joint condemnation of Russian oil-sanctions evasion, but no 2025–2026 Strategic Dialogue readout was retrieved and the new declarations have no retrieved implementation projects, leaving the term-window record dominated by maintenance of an already strong baseline.",
  inherited: [
    "Outgoing administration characterized U.S.–Greece partnership as 'the strongest it's ever been,' anchored by the fifth Strategic Dialogue and the 2021-updated MDCA [State Department, 2024-02-09]",
    "MDCA provided U.S. access, basing, and overflight at Souda Bay, Alexandroupoli, Larissa, and Stefanovikio, with infrastructure projects ongoing [State Department, 2024-02-09]",
    "$11.29 billion in active FMS cases with Greece, including F-16V upgrades, MH-60R Seahawks, and a pending sale of up to 40 F-35s [State Department, 2025-01-20]",
    "Greece exceeded its Wales Summit pledge by spending over 3.5% of GDP on defense, with over 45% on equipment and modernization [State Department, 2024-02-09]",
    "DFC provided a $125 million loan to ONEX Elefsis Shipyards, described as the first such agreement in Greece [State Department, 2024-02-09]",
    "Greece signed the Artemis Accords on February 9, 2024, as the 35th signatory [State Department, 2024-02-09]"
  ],
  points: [
    "Rubio's February 2025 meeting with FM Gerapetritis reaffirmed Greece as 'a valued NATO Ally and critical to regional stability,' covering defense spending, migration, Greece's 2025–2026 UNSC term, and regional energy, but no ministerial-level Strategic Dialogue readout was retrieved for the term window [State Department, 2025-02-28]",
    "The November 2025 U.S.–Greece Economic Security Declaration committed both governments to cooperation across seven technology supply-chain 'stacks' and to reducing dependencies on 'countries of concern,' though no implementing projects, funding, or binding mechanisms were retrieved [State Department, 2025-11-07]",
    "The 3+1 Energy Ministerial in Athens (U.S., Greece, Cyprus, Israel) condemned Russian attempts to circumvent oil sanctions and reaffirmed the Eastern Mediterranean Energy Center, with plans to reconvene in Washington in Q2 2026 [State Department, 2025-11-06]",
    "Routine security cooperation continued with a $58.15 million IDIQ base operations support contract for NSA Souda Bay running through June 2034 and an FMS contract modification drawing on Greek funds for HAWK project support — both routine execution against inherited authorities [Defense Department, 2025-05-13]",
    "Greece sent a delegation to the U.S.-hosted February 2026 Critical Minerals Ministerial convened by Secretary Rubio with 54 countries [State Department, 2026-02-01]",
    "The 2025 National Security Strategy framed European allies as needing to assume greater conventional-defense responsibility with 'critical but more limited' U.S. support, a posture that applies to Greece as a southeastern-flank ally [White House, 2025-11-01]",
    "A Just Security analysis flagged that the administration's use of export controls as 'transactional leverage' introduces uncertainty about the boundary between allied and adversary treatment, even for NATO members [Just Security, 2025-01-20]"
  ],
  role: "Inheritor",
  confidence: "medium",
  evidence: "adequate",
  contested: true,
  counterargument: "An affirmative reading is that the November 2025 Economic Security Declaration and 3+1 Energy Ministerial represent genuine new bilateral architecture under this administration — formalizing supply-chain and energy alignment that did not exist in this codified form on January 20, 2025 — and that continued Souda Bay contracting and FMS modifications, combined with Greece's inclusion in the Critical Minerals Ministerial, demonstrate active stewardship rather than passive inheritance. On that view the effect is helped/modest with an Active Stabilizer role. The skeptical reading, which the editor adopts, is that nearly every material asset of the relationship — MDCA, Souda Bay, F-35 track, $11.29B FMS pipeline, 3.5%+ defense spending, Eastern Med alignment — was inherited; the new declarations are declaratory with no retrieved implementation; the Strategic Dialogue format appears to have lapsed; and burden-shifting plus transactional export-control posture introduce mild downside risk. The genuine dispute is whether codifying a supply-chain frame without funded follow-through counts as helping versus merely re-labeling.",
  durability: "The November 2025 Economic Security Declaration and 3+1 framework are political commitments without retrieved implementing contracts, leaving durability dependent on follow-through at the planned Q2 2026 Washington ministerial. The underlying MDCA, Souda Bay basing, and FMS pipeline are treaty- and contract-anchored through the 2030s and would survive a change in administration.",
  opportunityCost: "No 2025–2026 ministerial-level Strategic Dialogue readout was retrieved, and broad foreign-assistance cuts plus systemic forbidden-error access to the Greece human rights chapter leave DRL/governance programming for Greece unquantified [State Department, 2025-08-12]",
  decisionVsExecution: "The Economic Security Declaration and 3+1 ministerial were presidential/cabinet-level decisions executed in Athens by Under Secretary Helberg, Ambassador Guilfoyle, and Deputy FM Theoharis; base-operations contracting and FMS modifications are routine execution against inherited authorities.",
  crossTheaterTradeoff: "U.S. engagement with Türkiye during the term (Rubio–Fidan, Landau–Yilmaz) focused on Syria and Ukraine without referencing Aegean or Eastern Mediterranean demarcation disputes, leaving Greece's regional concerns unaddressed in retrieved Türkiye readouts [State Department, 2025-06-01]",
  longHorizon: "The Economic Security Declaration's framing of supply-chain 'stacks' and the 3+1 Energy Dialogue's Q2 2026 Washington follow-up signal a multi-year agenda, but whether it binds Greece into U.S.-aligned technology and energy ecosystems depends on implementation that is not yet documented; Greece's own 12-year, ~€25 billion defense modernization plan provides an independent procurement runway.",
  omissionNote: "No U.S. government primary source within the term window addressed the Predator/spyware surveillance scandal, Greek asylum-seeker pushbacks, Aegean/FIR disputes, or MDCA renewal; the Greece 2024 Human Rights Report PDF returned a forbidden error.",
  linkedPolicies: ["Cyprus", "Israel", "Türkiye", "North Macedonia"],
  sources: [
    {label: "State Department — Rubio–Gerapetritis meeting readout", url: "https://www.state.gov/secretary-rubios-meeting-with-greek-foreign-minister-gerapetritis"},
    {label: "State Department — U.S. Security Cooperation with Greece fact sheet", url: "https://www.state.gov/u-s-security-cooperation-with-greece"},
    {label: "State Department — U.S.–Greece Economic Security Declaration", url: "https://www.state.gov/releases/2025/11/u-s-greece-economic-security-declaration"},
    {label: "U.S. Embassy Athens — Economic Security Declaration signing", url: "https://gr.usembassy.gov/the-united-states-and-greece-sign-economic-security-declaration/"},
    {label: "State Department — 3+1 Energy Ministerial joint statement", url: "https://www.state.gov/releases/office-of-the-spokesperson/2025/11/joint-statement-on-the-31-energy-ministerial-in-athens-greece/"},
    {label: "Defense Department — NSA Souda Bay IDIQ contract award", url: "https://www.defense.gov/News/Contracts/Contract/Article/4184406/"},
    {label: "Defense Department — HAWK FMS contract modification", url: "https://www.defense.gov/News/Contracts/Contract/Article/4291594/"},
    {label: "State Department — 2026 Critical Minerals Ministerial", url: "https://www.state.gov/releases/office-of-the-spokesperson/2026/02/2026-critical-minerals-ministerial/"},
    {label: "State Department — fifth U.S.–Greece Strategic Dialogue joint statement (baseline)", url: "https://2021-2025.state.gov/joint-statement-on-the-u-s-greece-strategic-dialogue-2/"},
    {label: "State Department — Blinken/Gerapetritis Artemis Accords remarks (baseline)", url: "https://2021-2025.state.gov/secretary-antony-j-blinken-at-the-artemis-accords-signing-ceremony-with-greek-foreign-minister-georgios-gerapetritis-nasa-administrator-bill-nelson-and-dr-daglis/"},
    {label: "White House — 2025 National Security Strategy", url: "https://www.whitehouse.gov/wp-content/uploads/2025/12/2025-National-Security-Strategy.pdf"},
    {label: "White House — Greek Independence Day proclamation 2025", url: "https://www.whitehouse.gov/presidential-actions/2025/03/greek-independence-day-a-national-day-of-celebration-of-greek-and-american-democracy-2025/"},
    {label: "State Department — Rubio call with Turkish FM Fidan", url: "https://www.state.gov/releases/office-of-the-spokesperson/2025/06/secretary-rubios-call-with-turkish-foreign-minister-fidan-2/"},
    {label: "State Department — 2025 Trafficking in Persons Report: Greece", url: "https://www.state.gov/reports/2025-trafficking-in-persons-report/greece"},
    {label: "Trade.gov — Greece Defense Country Commercial Guide", url: "https://www.trade.gov/country-commercial-guides/greece-defense"},
    {label: "White House — FMS reform executive order fact sheet", url: "https://www.whitehouse.gov/fact-sheets/2025/04/fact-sheet-president-donald-j-trump-reforms-foreign-defense-sales-to-improve-speed-and-accountability/"},
    {label: "Just Security — Export controls as trade policy", url: "https://www.justsecurity.org/121725/export-controls-trade-policy-new-terrain"},
    {label: "State Department — 2024 Country Reports on Human Rights Practices landing page", url: "https://www.state.gov/reports/2024-country-reports-on-human-rights-practices"}
  ]
};

/* Foreign Policy Atlas — Czechia (Trump 2nd term) — v3 entry from batch-1 overnight run.
   Pipeline: analyst=Claude (pack-only) · red-team=GPT · editor=Claude · tiebreaker auto-adjudicated. 2026-05-25. */
window.PRESIDENTS["trump"].dossier["Czechia"] = {
  state: "aligned",
  effect: "hurt",
  magnitude: "modest",
  region: "Europe",
  outcome: "Czechia remains a substantively aligned NATO partner on autopilot — defense modernization (a $181M FMS communications sale), SPP exercises, and NAC cyber solidarity continued — but the affirmative items are largely inherited alliance maintenance, while the Trump-caused deltas tilt negative: EU-wide reciprocal tariffs hit Czech exports, an ITC AD/CVD action targeted Czech freight rail couplers, Czechia was conspicuously omitted from Rubio's Central Europe civil-nuclear trip while Slovakia and Hungary received bilateral deliverables, no Rubio–Czech FM/PM readout is documented, and DRL reoriented democracy programming toward Babiš-aligned civil society. Czech public opinion shifted sharply negative.",
  inherited: [
    "Czechia entered the term as a 25-year NATO ally with defense spending described as 'soon to be 2.1 percent of GDP' [White House, 2024-04-15]",
    "F-35 acquisition characterized as 'the largest military procurement in Czechia's history' was already booked under the prior administration [State Department, 2024-12-18]",
    "Czechia was training up to ~9,000 Ukrainian forces and had provided more than $600 million in equipment, with authorization for an additional $6 billion in transfers [State Department, 2024-05-30]",
    "Czechia has served as the protecting power for U.S. interests in Syria since 2012, an arrangement Blinken affirmed in December 2024 [State Department, 2024-12-18]",
    "Prior administration described ties as reflecting 'deeply-shared values' across NATO defense, Ukraine, PRC/Taiwan, and energy security [State Department, 2024-12-18]"
  ],
  points: [
    "EU-wide reciprocal tariffs under EO 14257 and the 10% baseline under EO 14266 applied to Czech exports as an EU member state [Federal Register, 2025-04-07]",
    "ITC issued a preliminary affirmative AD/CVD determination on Czech freight rail couplers, a Czechia-specific trade-remedy action [Federal Register, 2026-05-06]",
    "Rubio's February 2026 Central Europe civil-nuclear trip covered only Bratislava and Budapest; Czechia—where Westinghouse is the U.S. contractor of record for the planned Dukovany expansion—was not a named stop and received no bilateral civil-nuclear deliverable [State Department, 2026-02-16]",
    "DRL Senior Advisor Samson's December 2025 Prague trip stated the U.S. was 'very excited to work with the Babiš government' and emphasized civil-society partners 'historically ignored by the international human rights establishment' [State Department, 2025-12-17]",
    "Czech public opinion shifted sharply: a CVVM survey found 73% of Czechs said Trump's actions weaken U.S. democracy, with negative views of U.S. foreign policy up about 10 points from March 2025 [CVVM, 2026-01-01]",
    "Czech political leaders condemned the suspension of U.S. military aid to Ukraine as 'a betrayal of an ally,' while continuing to characterize the U.S. as a formal ally [China-CEE Institute, 2025-06-02]",
    "DSCA notified Congress of a possible $181M FMS to Czechia for AN/PRC-160/163/167 radios and secure data links supporting Czech Armed Forces modernization and NATO interoperability — a continuation of an existing modernization trajectory rather than a new bilateral upgrade [DSCA, 2025-05-05]",
    "Rubio's October 2025 National Day statement saluted Czechia's 'vocal support for NATO's Hague commitments' and 'commitment to protecting freedom of speech' [State Department, 2025-10-01]",
    "The North Atlantic Council issued a formal solidarity statement on 'malicious cyber activities against the Czech Republic' — a NATO alliance act rather than a bilateral U.S. deliverable [NATO, 2025-05-28]",
    "Texas and Nebraska National Guard units continued long-running State Partnership Program cooperation with Czech forces, including Exercise Cyber Shield 2025 [Army.mil, 2025-06-13]"
  ],
  role: "Inheritor",
  confidence: "medium",
  evidence: "adequate",
  contested: true,
  counterargument: "A 'mixed' or even neutral reading is defensible. The negatives are real but magnitude-uncertain: the pack explicitly notes no primary source quantifies Czech export exposure to reciprocal tariffs, the rail-couplers case is one sectoral remedy, and 'diplomatic sidelining' (no Rubio readout, omission from the civil-nuclear trip, no Strategic Dialogue) are overlapping manifestations of the same deprioritization rather than independent harms. Meanwhile the $181M FMS, ITAR housekeeping, SPP exercises, NAC cyber solidarity, and Czech inclusion in Critical Minerals Ministerial and Three Seas frameworks are concrete continuity items. A 'hurt-modest' call rests on weighting caused negatives over inherited positives; an analyst who treats inherited continuity as still attributable to the current administration's choice to maintain it could land on 'mixed.'",
  durability: "Mixed and reversible. Tariff measures and AD/CVD actions are executive/agency instruments that can be modified; the FMS pipeline and SPP exercises are institutionally durable. Political alignment with the Babiš government and DRL's reoriented civil-society engagement are contingent on Czech domestic politics, including ongoing Pavel–Babiš cabinet disputes [FPRI, 2026-03-01].",
  opportunityCost: "Peer Central European and aligned states received bilateral instruments Czechia did not: Slovakia got FIRST Program FEED funding for Westinghouse, Hungary got a signed civil-nuclear IGA, Poland held a 16th Strategic Dialogue, North Macedonia held a Strategic Dialogue with a gas-supply MOU, and Sweden signed a Technology Prosperity Deal. No equivalent Czechia-specific bilateral deliverable is documented in the pack.",
  decisionVsExecution: "The major presidential decisions affecting Czechia (reciprocal tariffs, arms-transfer strategy, civil-nuclear focus on Slovakia/Hungary, DRL reorientation) were deliberate; execution on the Czechia track appears thin, with no documented Rubio–Czech ministerial readout in the term window.",
  omissionNote: "Notable absences: no bilateral Rubio–Czech FM or Rubio–PM Babiš readout located; no U.S.–Czechia civil-nuclear instrument despite Westinghouse's role at Dukovany (financing/123 status unconfirmed); no documented Czech-specific Three Seas or Critical Minerals Ministerial deliverable; Czech F-35 DSCA congressional notification not located; no primary source quantifies Czech tariff exposure.",
  linkedPolicies: ["Slovakia", "Hungary", "Poland", "Sweden"],
  sources: [
    {label: "DSCA: Czech Republic Communications Equipment FMS", url: "https://www.dsca.mil/Press-Media/Major-Arms-Sales/Article-Display/Article/4174285/czech-republic-communications-equipment"},
    {label: "State Department: Czechia National Day 2025", url: "https://www.state.gov/releases/office-of-the-spokesperson/2025/10/czechia-national-day/"},
    {label: "NATO: NAC Solidarity Statement on Czech Cyber", url: "https://www.nato.int/en/news-and-events/articles/news/2025/05/28/statement-of-solidarity-by-the-north-atlantic-council-concerning"},
    {label: "State Department: Rubio Civil Nuclear Deals in Central Europe", url: "https://www.state.gov/releases/office-of-the-spokesperson/2026/02/secretary-rubio-advances-national-security-through-civil-nuclear-deals-in-central-europe/"},
    {label: "Federal Register: Czech Freight Rail Couplers Preliminary AD/CVD", url: "https://www.federalregister.gov/documents/2026/05/06/2026-08954/certain-freight-rail-couplers-and-parts-thereof-from-the-czech-republic-preliminary-affirmative"},
    {label: "Federal Register: EO 14257 Reciprocal Tariff", url: "https://www.federalregister.gov/documents/full_text/html/2025/04/07/2025-06063.html"},
    {label: "Federal Register: EO 14266 Modifying Reciprocal Tariff Rates", url: "https://www.federalregister.gov/documents/full_text/html/2025/04/15/2025-06462.html"},
    {label: "State Department: DRL Senior Advisor Samson Digital Press Briefing", url: "https://www.state.gov/digital-press-briefing-senior-advisor-for-the-bureau-for-democracy-human-rights-and-labor-drl-samuel-samson"},
    {label: "CVVM: Czech Public on U.S. Relations January 2026", url: "https://cvvm.soc.cas.cz/en/press-releases/political/international-relations/6213-the-czech-public-on-the-current-situation-in-the-us-and-the-czech-republics-diplomatic-relations-with-selected-countries-january-2026"},
    {label: "China-CEE Institute: Czech Foreign Policy Briefing", url: "https://china-cee.eu/2025/06/02/czech-republic-external-relations-briefing-czech-republics-foreign-policy-orientation"},
    {label: "State Department: 2025 Investment Climate Statement Czechia", url: "https://www.state.gov/reports/2025-investment-climate-statements/czechia"},
    {label: "FPRI: Czech President-New Government Power Struggle", url: "https://www.fpri.org/article/2026/03/czech-president-new-government-in-early-power-struggle"},
    {label: "NATO: SG Visits Czechia to Meet PM Babiš", url: "https://www.nato.int/en/news-and-events/articles/news/2026/04/16/nato-secretary-general-visits-czechia-to-discuss-euro-atlantic-security-with-prime-minister-babis"},
    {label: "Army.mil: Texas/Nebraska Guard with Czechia on Cyber", url: "https://www.army.mil/article/286318/texas_nebraska_guard_train_with_czechia_against_cyber_threats"},
    {label: "White House: Biden-Fiala Bilateral Remarks (baseline)", url: "https://www.whitehouse.gov/briefing-room/speeches-remarks/2024/04/15/remarks-by-president-biden-and-prime-minister-petr-fiala-of-the-czech-republic-before-bilateral-meeting/"},
    {label: "State Department (archived): Blinken-Lipavský Call (baseline)", url: "https://2021-2025.state.gov/secretary-blinkens-call-with-foreign-minister-lipavsky/"}
  ]
};

/* Foreign Policy Atlas — Romania (Trump 2nd term) — v3 entry from batch-1 overnight run.
   Pipeline: analyst=Claude (pack-only) · red-team=GPT · editor=Claude · tiebreaker auto-adjudicated. 2026-05-25. */
window.PRESIDENTS["trump"].dossier["Romania"] = {
  state: "aligned",
  effect: "mixed",
  magnitude: null,
  region: "Europe",
  outcome: "U.S.-Romania ties continued operationally on inherited momentum: the Tenth Strategic Dialogue convened in Bucharest (December 2025), three Romania-relevant FMS approvals cleared, rotational armor at Mihail Kogălniceanu continued with planned Abrams augmentation, JIATF-401 counter-UAS marketplace access was extended to Romania, and NuScale advanced front-end engineering on RoPower's SMR. Against this, democracy-promotion tooling (USAID, NED) was disrupted early in the term, Rubio's February 2026 Central Europe civil nuclear trip produced Slovakia and Hungary deliverables but no Romania-specific instrument, and most of the positive record continued pre-2025 architecture.",
  inherited: [
    "Strategic partnership 25+ years old, with the ninth Strategic Dialogue (June 2024) affirming a 'deep and growing' partnership [State Department, 2024-06-26]",
    "$920 million FMF direct loan plus $60 million FMF grant signed September 2024 to accelerate Romanian defense modernization [State Department, 2024-09-25]",
    "September 2024 State Department determination approving a possible $7.2 billion sale of 32 F-35s to Romania, with LOA signed November 2024 [Congressional Research Service, 2025-02-28]",
    "Aegis Ashore BMD site at Deveselu operational since 2016 under a 2011 bilateral BMD agreement, with roughly $6.2 billion in active FMS cases [State Department, 2025-01-20]",
    "December 6, 2024 State statement on the Romanian Constitutional Court's annulment of the presidential election cited an 'unprecedented situation' regarding electoral integrity and foreign malign influence [State Department, 2024-12-06]",
    "FY2020-FY2024 U.S. provided ~$316 million in FMF and ~$220 million in EDI construction at Câmpia Turzii, Mihail Kogălniceanu, and Cincu [Congressional Research Service, 2025-02-28]",
    "NuScale/RoPower SMR project first announced at COP26 and advanced through the 2024 P-TECC Ministerial and a 2024 nuclear-safety technical cooperation agreement [State Department, 2024-07-19]"
  ],
  points: [
    "Tenth Strategic Dialogue convened in Bucharest December 16, 2025, covering defense co-production, Black Sea security, energy security, critical minerals, and border security — continuing the cadence established by the 2024 ninth round [U.S. Embassy Romania, 2025-12-19]",
    "Three Romania-relevant FMS approvals cleared in the term: a $280 million PATRIOT system, $84 million in GBU-39B Small Diameter Bombs, and Romania's share of a $103.9 million NSPA AIM-9X package — incremental additions atop the inherited ~$6.2B FMS book and $7.2B F-35 LOA [DSCA, 2025-04-28]",
    "1st Armored Division transferred authority to 3rd Infantry Division at Mihail Kogălniceanu in October 2025 as a routine Operation Atlantic Resolve rotation; Romania's defense chief stated the U.S. agreed to maintain force contribution and add an Abrams-equipped detachment, though U.S. Army Europe and Africa said details were still being worked out [Stars and Stripes, 2026-01-29]",
    "Army Secretary Driscoll and Romania's defense minister signed a JIATF-401 marketplace agreement giving Romania access to U.S. counter-UAS procurement — described in later releases as a foundational precedent for Australia, Poland, and South Korea [Army.mil, 2026-04-28]",
    "Merops counter-drone system was rapidly fielded to Romania and Poland in response to late-2025 airspace incursions, with U.S., Polish, and Romanian forces actively training on it [Army.mil, 2026-03-26]",
    "NRC approved NuScale's uprated 77 MWe SMR design (May 2025) while NuScale performed front-end engineering on RoPower's 462-MWe Romanian plant, advancing the SMR project inherited from COP26 [Department of Energy, 2025-05-30]",
    "Rubio publicly thanked Romania for 'swift and decisive support' for U.S. Middle East operations (April 2026), a posture OSW characterized as Romanian 'visible gestures of loyalty towards Washington' diverging from some European NATO members — i.e., Romanian positioning rather than a U.S.-caused bilateral gain [OSW, 2026-05-19]",
    "Rubio's flagship February 2026 Central Europe civil nuclear trip announced concrete deals in Slovakia and Hungary but no Romania-specific instrument, despite ongoing NuScale/RoPower work and offshore gas opportunities flagged in bilateral readouts [State Department, 2026-02-01]",
    "Early-term disruption to democracy-promotion tooling — USAID-wide administrative leave and RIF (February 2025) and NED's first-ever funding suspension (late January–March 2025) — weakened the U.S. democracy/rule-of-law leg during Romania's sensitive post-annulment period; downstream Romania-specific effects are undocumented in the pack [NED, 2025-02-25]",
    "Romania's January 2025 entry into the U.S. Visa Waiver Program was a process completed at the start of the term window, not a new presidential decision; bilateral readouts in October 2025 and April 2026 omitted democracy, rule of law, and anti-corruption topics [Congressional Research Service, 2025-02-28]"
  ],
  role: "Inheritor",
  confidence: "medium",
  evidence: "adequate",
  contested: true,
  counterargument: "The 'helped' reading: the administration sustained an unusually active operational tempo — a Tenth Strategic Dialogue, three FMS approvals, JIATF-401 access (only the second country to receive it), rapid Merops fielding after the late-2025 incursions, a planned Abrams detachment, and continued NuScale FEED on RoPower — while Romania publicly aligned with U.S. Middle East operations. On this read, the term-window adds, though incremental, modestly improved an already strong bilateral and justify an Active Stabilizer call with modest magnitude. The 'mixed/Inheritor' reading (adopted here): the major pillars — Deveselu, the $6.2B FMS book, the $920M FMF loan, the $7.2B F-35 LOA, the SMR project, Atlantic Resolve rotations, and the Strategic Dialogue cadence — were all locked in before January 2025, and the term-window deliverables are largely what a counterfactual administration would have produced. The administration also failed to deliver a Romania-specific civil nuclear instrument while securing them in Slovakia and Hungary, and disrupted USAID/NED capacity during Romania's most sensitive democratic moment in decades.",
  levers: {
    security: "Continued rotational armor presence at Mihail Kogălniceanu with 3ID rotation under Atlantic Resolve and a planned but not-yet-finalized Abrams detachment; three Romania-relevant FMS approvals (PATRIOT, GBU-39B, AIM-9X share) layered onto the inherited pipeline; JIATF-401 C-UAS marketplace access and Merops fielding in response to late-2025 airspace incursions",
    coalition: "Tenth Strategic Dialogue in Bucharest (Dec 2025) continuing the 2024 cadence; Rubio-Ţoiu meeting (Oct 2025) and call (Apr 2026); U.S. participation at B9 Bucharest Summit (where the 'NATO 3.0' construct signaled possible reduced U.S. conventional role in Europe); Three Seas Summit engagement led by Energy Secretary Wright",
    economicTech: "NuScale/RoPower SMR front-end engineering continued post-NRC design approval but no Romania-specific civil nuclear instrument was signed despite parallel Slovakia/Hungary deliverables; Romania included in 2026 Critical Minerals Ministerial; Visa Waiver Program entry effective January 2025",
    rivalDenial: "Counter-UAS fielding (Merops, JIATF-401) responsive to Russian drone incursions on NATO's eastern flank; Aegis Ashore at Deveselu continued operational; Romania's pre-existing Patriot transfer and F-16 pilot training support to Ukraine continued from baseline"
  },
  durability: "Medium. Force posture, FMS pipeline, and the Strategic Dialogue rest on durable 2005 DCA and 2011 partnership frameworks plus the inherited FMS book. Risks: Romanian grand-coalition collapse (April 2026) creates domestic political uncertainty; the B9 'NATO 3.0' construct signals possible U.S. conventional drawdown in Europe; civil nuclear progress depends on commercial follow-through not yet papered; democracy-promotion capacity was degraded early in the term.",
  decisionVsExecution: "Mostly execution of an inherited architecture (Deveselu, FMS book, F-35 LOA, FMF loan, SMR project, Atlantic Resolve rotations, Strategic Dialogue cadence). Discretionary additions include JIATF-401 access for Romania, the planned Abrams detachment, Merops fielding, and warm public framing of Romania's Middle East support. Discretionary subtractions include the USAID/NED disruptions and the failure to produce a Romania-specific civil nuclear instrument on Rubio's Central Europe trip.",
  omissionNote: "No Romania-specific civil nuclear instrument was signed during Rubio's February 2026 Central Europe trip despite parallel Slovakia and Hungary deliverables. Bilateral readouts (October 2025, April 2026) omitted democracy, rule of law, and anti-corruption. USAID Romania programming and DOJ rule-of-law assistance status post-February 2025 are undocumented in the pack.",
  linkedPolicies: ["Poland", "Moldova", "Ukraine", "Hungary", "Slovakia"],
  sources: [
    {label: "State Department — Joint Statement on Ninth Strategic Dialogue", url: "https://2021-2025.state.gov/joint-statement-on-the-u-s-romania-strategic-dialogue/"},
    {label: "State Department — $920M FMF Loan", url: "https://2021-2025.state.gov/920-million-u-s-romania-foreign-military-financing-direct-loan-strengthens-nato/"},
    {label: "State Department — Statement on Romanian Constitutional Court Ruling", url: "https://2021-2025.state.gov/statement-on-romanian-constitutional-courts-ruling-on-romanias-presidential-elections/"},
    {label: "State Department — U.S. Security Cooperation with Romania", url: "https://www.state.gov/u-s-security-cooperation-with-romania"},
    {label: "State Department — Under Secretary Jenkins Travels to Romania (SMR/P-TECC)", url: "https://2021-2025.state.gov/under-secretary-jenkins-travels-to-romania/"},
    {label: "CRS — Romania: Background and U.S. Relations (R48440)", url: "https://www.congress.gov/crs-product/R48440"},
    {label: "U.S. Embassy Romania — Tenth Strategic Dialogue Joint Statement", url: "https://ro.usembassy.gov/joint-statement-on-the-tenth-round-of-the-romania-united-states-strategic-dialogue/"},
    {label: "State Department — Rubio-Toiu Meeting Readout", url: "https://www.state.gov/releases/office-of-the-spokesperson/2025/10/secretary-rubios-meeting-with-romanian-foreign-minister-toiu/"},
    {label: "State Department — Rubio-Toiu Call Readout", url: "https://www.state.gov/releases/office-of-the-spokesperson/2026/04/secretary-rubios-call-with-romanian-foreign-minister-toiu-2/"},
    {label: "DSCA — Romania PATRIOT FMS", url: "https://www.dsca.mil/Press-Media/Major-Arms-Sales/Article-Display/Article/4167631/romania-patriot-air-defense-system"},
    {label: "DSCA — Romania GBU-39B FMS", url: "https://www.dsca.mil/Press-Media/Major-Arms-Sales/Article-Display/Article/4069171/romania-gbu-39b-small-diameter-bombs"},
    {label: "DSCA — NSPA AIM-9X FMS", url: "https://www.dsca.mil/Press-Media/Major-Arms-Sales/Article-Display/Article/4287772/nato-support-and-procurement-agency-aim-9x-sidewinder-missiles"},
    {label: "Army.mil — 1AD Transfers Authority to 3ID in Romania", url: "https://www.army.mil/article/288920/1st_armored_division_transfers_authority_to_3rd_infantry_division_in_romania"},
    {label: "Stars and Stripes — Romania US Tank Deployment", url: "https://www.stripes.com/branches/army/2026-01-29/romania-us-tank-deployment-20561792.html"},
    {label: "Stars and Stripes — Driscoll Romania Drones", url: "https://www.stripes.com/branches/army/2026-04-28/driscoll-romania-drones-21510089.html"},
    {label: "Army.mil — JIATF-401 Marketplace Agreement with Romania", url: "https://www.army.mil/article/292056/jiatf_401_marketplace_strengthens_allies_defense_against_drone_threats"},
    {label: "Army.mil — JIATF-401 Marketplace Broadens Allied Access", url: "https://www.army.mil/article/292660/jiatf_401_drone_defense_marketplace_broadens_allied_access_to_counter_drone_capabilities"},
    {label: "Army.mil — G-TEAD Merops Counter-Drone Deployment", url: "https://www.army.mil/article-amp/291379/g_tead_delivers_rapid_counter_drone_capability_to_natos_eastern_flank_demonstrating_the_power_of_accelerated_acquisition"},
    {label: "DOE — NRC Approves NuScale 77 MWe SMR Design", url: "https://www.energy.gov/ne/articles/nrc-approves-nuscale-powers-uprated-small-modular-reactor-design"},
    {label: "State Department — Rubio Civil Nuclear Deals in Central Europe", url: "https://www.state.gov/releases/office-of-the-spokesperson/2026/02/secretary-rubio-advances-national-security-through-civil-nuclear-deals-in-central-europe/"},
    {label: "State Department — 2026 Critical Minerals Ministerial", url: "https://www.state.gov/releases/office-of-the-spokesperson/2026/02/2026-critical-minerals-ministerial/"},
    {label: "OSW — Balancing and Appeasing: Bucharest's Foreign Policy", url: "https://www.osw.waw.pl/en/publikacje/analyses/2026-05-19/balancing-and-appeasing-bucharests-foreign-policy-amid-transatlantic"},
    {label: "OSW — Romania Breakup of Grand Coalition", url: "https://www.osw.waw.pl/en/publikacje/analyses/2026-04-27/romania-breakup-grand-coalition-and-a-new-phase-political-crisis"},
    {label: "NATO — B9 and Nordic Allies Summit Bucharest", url: "https://www.nato.int/en/news-and-events/articles/news/2026/05/13/nato-secretary-general-at-b9-and-nordic-allies-summit"},
    {label: "NATO — Rutte Visits Romania", url: "https://www.nato.int/en/news-and-events/articles/news/2025/11/06/nato-secretary-general-visits-romania"},
    {label: "NED — Statement on Funding Disruption and Program Suspensions", url: "https://www.ned.org/statement-on-neds-funding-disruption-and-program-suspensions/"},
    {label: "NED — Welcomes State Department Steps Toward Restoring Funding", url: "https://www.ned.org/ned-welcomes-state-departments-initial-steps-towards-restoring-funding/"}
  ]
};

/* Foreign Policy Atlas — Portugal (Trump 2nd term) — v3 entry from batch-1 overnight run.
   Pipeline: analyst=Claude (pack-only) · red-team=GPT · editor=Claude · tiebreaker auto-adjudicated. 2026-05-25. */
window.PRESIDENTS["trump"].dossier["Portugal"] = {
  state: "aligned",
  effect: "mixed",
  magnitude: null,
  region: "Europe",
  outcome: "The U.S.-Portugal relationship remained an aligned NATO partnership through the term, but most positive items were continuity of inherited institutional cadence (52nd SBC after the 51st had already met pre-transition, two Rubio-Rangel calls of which one readout is corrupted, Artemis welcome retrieved as title only, and Portugal's signature on an alliance-wide 5%-of-GDP Hague pledge) while the presidentially-caused content was net-new economic friction: EU-wide reciprocal tariffs (EO 14257/14266/14316), Section 232 steel/aluminum and copper duties, and a Portugal-specific Commerce antidumping review on uncoated paper.",
  inherited: [
    "Portugal is a founding NATO member with the Alliance framed as the bedrock of U.S. security at transition [State Department, 2024-07-10]",
    "The 51st U.S.-Portugal Standing Bilateral Commission convened in May 2024, indicating an active institutionalized senior bilateral dialogue at transition [State Department, 2024-05-15]",
    "U.S. FDI inflows to Portugal quadrupled in 2023 to €2.1 billion, making the U.S. Portugal's top foreign investor that year, with the U.S. as Portugal's largest non-EU trading partner per the 2024 ICS [State Department, 2024-07-15]",
    "A minority center-right Democratic Alliance government took office under PM Montenegro after March 2024 snap elections, presenting a new counterpart for U.S. engagement [State Department, 2024-07-15]",
    "Portugal was advancing battery-grade lithium mining (potentially among Europe's largest reserves) and renewable-energy/electric-mobility investment, with U.S. firms holding undersea cable infrastructure routing through Portugal [State Department, 2024-07-15]"
  ],
  points: [
    "The administration maintained the inherited institutional architecture, convening the 52nd Standing Bilateral Commission in Lisbon and marking the 30th anniversary of the Cooperation and Defense Agreement [U.S. Embassy Portugal, 2026-01-13]",
    "Secretary Rubio's March 2026 call with FM Rangel 'highlighted the continued strength of U.S.-Portugal bilateral ties' and thanked Portugal for 'close economic and defense cooperation,' reaffirming transatlantic security commitments [State Department, 2026-03-01]",
    "The Portugal National Day statement asked Portugal and all NATO Allies to raise defense spending to 5% of GDP; Portugal subsequently joined the alliance-wide Hague Declaration committing to 5% by 2035, though no Portugal-specific implementation pathway was documented [State Department, 2025-06-01]",
    "The U.S. welcomed Portugal's signing of the Artemis Accords, though only the page title was retrieved and specific bilateral commitments are unconfirmed in the pack [State Department, 2026-01-01]",
    "Portugal was caught in EU-wide reciprocal-tariff actions (EO 14257 baseline regime; EO 14266 suspending country-specific rates in favor of a uniform 10% additional ad valorem rate; EO 14316 extending that suspension to August 1, 2025) [Federal Register, 2025-04-15]",
    "Section 232 actions extended 25% tariffs on steel and aluminum (Proclamation 10947) and imposed duties on copper in all forms (Proclamation 10962), affecting Portuguese exporters [Federal Register, 2025-06-09]",
    "Commerce conducted a Portugal-specific antidumping administrative review of uncoated paper, issuing preliminary results in July 2025 and final results in March 2026 [Federal Register, 2026-03-19]",
    "Portugal was not listed among the 54 named delegations at the 2026 Critical Minerals Ministerial despite its lithium reserves, and no Portugal-specific FMS notification, CDE win, or critical-minerals deliverable was retrieved [State Department, 2026-02-01]"
  ],
  role: "Inheritor",
  confidence: "low",
  evidence: "thin",
  contested: true,
  counterargument: "The draft initially called this 'Active Stabilizer' mixed, citing the SBC, Rubio-Rangel calls, the 5% ask, and Artemis. The red team argues — and the pack supports — that these positives are largely continuity of inherited NATO/bilateral machinery (the 51st SBC met pre-transition; the 5% pledge is an alliance-wide declaration with no documented Portugal-specific pathway; the Artemis welcome is title-only; one of two call readouts is binary-corrupted), while the directly presidentially-caused content (EU-wide tariffs, Section 232 steel/aluminum/copper, Portugal-specific AD review) is concrete net-new friction. Under that view the effect tilts hurt-modest and the role is Inheritor (with added friction) rather than Active Stabilizer. A defender could still argue mixed: the institutional cadence was sustained rather than disrupted, Portugal did sign Artemis and endorse the 5% target on this administration's watch, and tariffs were applied EU-wide rather than as Portugal-specific punishment.",
  durability: "The institutional channels (SBC, NATO, Cooperation and Defense Agreement) are durable and treaty/agreement-backed. The tariff measures are executive-order based and reversible; the 5%-of-GDP Hague commitment is a 2035 alliance-wide pledge whose Portugal-specific execution path is undocumented in the pack.",
  opportunityCost: "Portugal's lithium reserves and undersea-cable hub position were not visibly leveraged: Portugal was not named among the 54 delegations at the 2026 Critical Minerals Ministerial despite the U.S.-EU Critical Minerals MOU signed the same period, and no Portugal-specific critical-minerals or data-infrastructure deliverable was retrieved.",
  decisionVsExecution: "Decisions to maintain bilateral cadence (SBC, calls, Artemis welcome) executed at a routine level; tariff decisions were executed through EU-wide instruments without Portugal-specific tailoring or carve-outs documented in the pack.",
  crossTheaterTradeoff: "The 5%-of-GDP defense ask and EU-wide reciprocal tariffs were applied uniformly across NATO/EU Allies, subordinating Portugal-specific equities to a transatlantic burden-sharing and trade-deficit framework.",
  longHorizon: "Portugal's signature on the Artemis Accords (substance unverified) and the 30th-anniversary framing of the Cooperation and Defense Agreement extend cooperative horizons; the 2035 Hague 5% target sets a decade-long alliance-wide burden-sharing track.",
  omissionNote: "No primary documents on Lajes Field/Azores basing, Portugal's actual NATO defense-spending trajectory, a Portugal-specific FMS notification, or Portuguese government responses to U.S. tariff and 5% framings were retrieved; the July 2025 Rubio-Rangel call readout is binary-corrupted, the January 2026 Artemis welcome statement was retrieved as title-only, the 2025 ICS for Portugal was inaccessible, and post-August 2025 EU tariff status is undocumented in the pack.",
  levers: {
    security: "Sustained NATO-anchored bilateral defense dialogue via the 52nd SBC and the March 2026 Rubio-Rangel call; pressed Portugal toward the 5%-of-GDP Hague target as part of an alliance-wide ask; UAS export policy update under EO 14268 applies a NATO-ally framework generally, with no Portugal-specific sale or authorization documented.",
    coalition: "Engaged Portugal primarily through NATO multilateral channels (Hague Summit, Helsingborg ministerial, Deputy SG visit) and U.S.-EU instruments (Space Dialogue, Critical Minerals MOU) rather than through Portugal-specific bilateral deliverables.",
    economicTech: "EU-wide reciprocal tariffs (EO 14257/14266/14316), Section 232 steel/aluminum and copper duties, and a Portugal-specific Commerce AD review on uncoated paper imposed net-new economic friction directly attributable to the administration; Artemis Accords signature opened a potential space-cooperation track whose substance is unconfirmed in the pack."
  },
  linkedPolicies: ["Spain"],
  sources: [
    {label: "State Department — 51st U.S.-Portugal SBC Joint Statement", url: "https://2021-2025.state.gov/joint-statement-on-the-51st-u-s-portugal-standing-bilateral-commission/"},
    {label: "State Department — 2024 Investment Climate Statement: Portugal", url: "https://2021-2025.state.gov/reports/2024-investment-climate-statements/portugal/"},
    {label: "State Department — Portugal National Day", url: "https://www.state.gov/releases/2025/06/portugal-national-day/"},
    {label: "State Department — Rubio-Rangel Call Readout (March 2026)", url: "https://www.state.gov/releases/office-of-the-spokesperson/2026/03/secretary-rubios-call-with-portuguese-foreign-minister-rangel-2/"},
    {label: "State Department — U.S. Welcomes Portugal's Signing of the Artemis Accords", url: "https://www.state.gov/releases/office-of-the-spokesperson/2026/01/united-states-welcomes-portugals-signing-of-the-artemis-accords/"},
    {label: "U.S. Embassy Portugal — 52nd SBC Readout", url: "https://pt.usembassy.gov/high-level-u-s-delegation-participates-in-the-52nd-session-of-the-standing-bilateral-commission-in-lisbon/"},
    {label: "NATO — The Hague Summit Declaration", url: "https://www.nato.int/en/about-us/official-texts-and-resources/official-texts/2025/06/25/the-hague-summit-declaration"},
    {label: "NATO — Secretary General Visits Spain and Portugal", url: "https://www.nato.int/en/news-and-events/articles/news/2025/01/27/nato-secretary-general-visits-spain-and-portugal"},
    {label: "Federal Register — EO 14257 Reciprocal Tariffs", url: "https://www.federalregister.gov/documents/full_text/html/2025/04/07/2025-06063.html"},
    {label: "Federal Register — EO 14266 Modifying Reciprocal Tariff Rates", url: "https://www.federalregister.gov/documents/2025/04/15/2025-06462/modifying-reciprocal-tariff-rates-to-reflect-trading-partner-retaliation-and-alignment"},
    {label: "Federal Register — EO 14316 Extending Tariff Modification", url: "https://www.federalregister.gov/documents/2025/07/10/2025-12962/extending-the-modification-of-the-reciprocal-tariff-rates"},
    {label: "Federal Register — Proclamation 10947 Section 232 Steel/Aluminum", url: "https://www.federalregister.gov/documents/full_text/html/2025/06/09/2025-10524.html"},
    {label: "Federal Register — Proclamation 10962 Section 232 Copper", url: "https://www.federalregister.gov/documents/full_text/html/2025/08/05/2025-14893.html"},
    {label: "Federal Register — Uncoated Paper from Portugal AD Preliminary Results", url: "https://www.federalregister.gov/documents/2025/07/11/2025-12952/certain-uncoated-paper-from-portugal-preliminary-results-of-the-administrative-review-of-the"},
    {label: "Federal Register — Uncoated Paper from Portugal AD Final Results", url: "https://www.federalregister.gov/documents/2026/03/19/2026-05441/certain-uncoated-paper-from-portugal-final-results-of-antidumping-duty-administrative-review"},
    {label: "State Department — UAS Export Policy Update", url: "https://www.state.gov/releases/bureau-of-political-military-affairs/2025/09/u-s-policy-update-on-the-export-of-unmanned-aerial-systems/"},
    {label: "State Department — 2026 Critical Minerals Ministerial", url: "https://www.state.gov/releases/office-of-the-spokesperson/2026/02/2026-critical-minerals-ministerial/"},
    {label: "State Department — U.S.-EU Critical Minerals MOU Signing", url: "https://www.state.gov/releases/office-of-the-spokesperson/2026/04/secretary-of-state-marco-rubio-and-european-union-trade-commissioner-maros-sefcovic-at-the-signing-of-a-memorandum-of-understanding-for-the-u-s-eu-strategic-partnership-on-critical-minerals-washing/"},
    {label: "State Department — Rubio-Rutte Meeting Helsingborg", url: "https://www.state.gov/releases/office-of-the-spokesperson/2026/05/secretary-rubios-meeting-with-nato-secretary-general-rutte-2/"},
    {label: "U.S. Embassy Portugal — Freedom 250", url: "https://pt.usembassy.gov/freedom-250/"}
  ]
};
