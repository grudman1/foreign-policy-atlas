/* =====================================================================
   Foreign Policy Atlas — EVIDENCE PACK
   Russia (Trump 2nd term)

   Author rule: every claim here traces to data/trump.js -> Russia.
   The pack reorganizes that research for a viewable surface; it does not
   introduce a new verdict, source, or fact not already in the entry.
   ===================================================================== */

window.PACKS = window.PACKS || {};
window.PACKS["trump"] = window.PACKS["trump"] || {};

window.PACKS["trump"]["Russia"] = {
  country: "Russia",
  president: "trump",
  asOf: "May 2026 (projected timeline)",
  packVersion: "1.0",
  pipeline: "analyst=Claude (pack-only) · red-team=GPT · editor=Claude · adjudicated→hurt. 2026-05-25",

  /* ---- THE SPINE: author-curated, guaranteed-faithful timeline ----
     One entry per datable event present in the dossier entry's
     points[]/outcome/notes. Chronological. */
  timeline: [
    { date: "2025-02-12", label: "Hegseth in Brussels",
      sign: "weakened",
      detail: "Rules out Ukrainian NATO membership before talks and tells Europe to carry the 'overwhelming share' of aid.",
      blurb: "The Defense Secretary publicly takes Ukrainian NATO membership off the table before negotiations and tells Europe to shoulder most of the aid burden.",
      sourceLabel: "DoD — Hegseth opening remarks UDCG Brussels",
      sourceUrl: "https://www.defense.gov/News/Speeches/Speech/article/4064113/opening-remarks-by-secretary-of-defense-pete-hegseth-at-ukraine-defense-contact/" },

    { date: "2025-02", label: "Marc Fogel released",
      sign: "strengthened",
      detail: "Released via the new Witkoff channel — an output the inherited frozen relationship couldn't have produced.",
      blurb: "A jailed American is freed through the new bilateral channel — an early concrete output the inherited frozen relationship couldn't have produced.",
      sourceLabel: "White House — NSA statement on Fogel release",
      sourceUrl: "https://www.whitehouse.gov/briefings-statements/2025/02/statement-from-the-national-security-advisor/" },

    { date: "2025-02-18", label: "Rubio–Lavrov consultation mechanism",
      sign: "mixed",
      detail: "First ministerial meeting establishes a consultation mechanism; Sen. Durbin charges Trump 'publicly gave away huge concessions' on 1991 borders and NATO membership.",
      blurb: "Top diplomats meet for the first time at this level since the invasion and set up an ongoing consultation channel; Senate critics charge the administration with conceding key points before talks even start.",
      sourceLabel: "State — Rubio-Lavrov meeting Feb 18, 2025",
      sourceUrl: "https://www.state.gov/secretary-rubios-meeting-with-russian-foreign-minister-lavrov" },

    { date: "2025-03", label: "Riyadh Black Sea expert groups",
      sign: "mixed",
      detail: "US–Russia expert groups on the Black Sea convene in Riyadh; readouts contain no political prisoner or human rights conditions.",
      blurb: "U.S. and Russian experts meet in Riyadh on Black Sea security, with readouts that omit any human-rights or political-prisoner conditions.",
      sourceLabel: "White House — Outcomes of US-Russia expert groups Black Sea (Riyadh)",
      sourceUrl: "https://www.whitehouse.gov/briefings-statements/2025/03/outcomes-of-the-united-states-and-russia-expert-groups-on-the-black-sea/" },

    { date: "2025-04-10", label: "EO 14024 renewed",
      sign: "mixed",
      detail: "Trump continues the EO 14024 sanctions emergency, preserving the inherited architecture against Russia's harmful foreign activities.",
      blurb: "The administration formally renews the main Russia sanctions emergency, keeping the inherited sanctions architecture in place.",
      sourceLabel: "Federal Register — Continuation of EO 14024 emergency (Trump)",
      sourceUrl: "https://www.federalregister.gov/documents/2025/04/14/2025-06399/continuation-of-the-national-emergency-with-respect-to-specified-harmful-foreign-activities-of-the-government-of-the-russian-federation" },

    { date: "2025-06-25", label: "Hague Summit — 5% by 2035",
      sign: "mixed",
      detail: "Alliance codifies a 5%-of-GDP allied spending pledge by 2035 with Russia named the 'long-term threat'; the pack does not establish Trump as the primary cause versus European reaction.",
      blurb: "NATO commits to a 5%-of-GDP defense spending goal by 2035 with Russia named the long-term threat, though European threat perception is plausibly the bigger driver.",
      sourceLabel: "NATO — The Hague Summit Declaration",
      sourceUrl: "https://www.nato.int/en/about-us/official-texts-and-resources/official-texts/2025/06/25/the-hague-summit-declaration" },

    { date: "2025-07", label: "Pentagon capability review pauses aid",
      sign: "weakened",
      detail: "DoD 'capability review' pauses Ukraine transfers before partial resumption; secondary reporting cites aid falling from above $19B in 2024 toward ~$400M authorized for 2026.",
      blurb: "A Pentagon capability review temporarily halts Ukraine transfers, beginning a multi-month drawdown that secondary reporting estimates at roughly a 98% cut by 2026.",
      sourceLabel: "DoD — Capability review on Ukraine aid",
      sourceUrl: "https://www.defense.gov/News/News-Stories/Article/Article/4234179/dod-capability-review-to-analyze-where-military-aid-goes-ensure-america-is-first/" },

    { date: "2025-08-07", label: "Submarine repositioning",
      sign: "mixed",
      detail: "U.S. submarine repositioning is publicly framed as signaling toward Russia amid the bilateral process.",
      blurb: "U.S. submarines are publicly repositioned as a signal to Russia while the bilateral channel is active.",
      sourceLabel: "DoD, 2025-08-07",
      sourceUrl: "" },

    { date: "2025-08-11", label: "EO 14329 — 25% secondary tariff",
      sign: "mixed",
      detail: "EO 14329 imposes a 25% ad valorem secondary tariff on importers of Russian oil with an explicit ceasefire demand.",
      blurb: "A new executive order imposes a 25% secondary tariff on buyers of Russian oil, conditioned on a Russia-Ukraine ceasefire.",
      sourceLabel: "Federal Register — EO 14329 Addressing Threats",
      sourceUrl: "https://www.federalregister.gov/documents/2025/08/11/2025-15267/addressing-threats-to-the-united-states-by-the-government-of-the-russian-federation" },

    { date: "2025-08-19", label: "Alaska summit",
      sign: "mixed",
      detail: "Trump–Putin Alaska summit is followed by a White House meeting with Zelensky and European leaders; substantive terms are not in primary sources.",
      blurb: "Trump and Putin meet in Alaska, followed by a White House meeting with Zelensky and European leaders; substantive terms are not disclosed in primary sources.",
      sourceLabel: "White House — Peace summit hailed game-changer (Aug 18-19)",
      sourceUrl: "https://www.whitehouse.gov/releases/2025/08/president-trumps-peace-summit-hailed-as-a-game-changer/" },

    { date: "2025-09-09", label: "Largest aerial attack of the war",
      sign: "weakened",
      detail: "Sen. Wicker cites Russia's 'largest aerial attack of the war' — 800+ drones/missiles — during the diplomatic process.",
      blurb: "Russia launches its largest aerial attack of the war — more than 800 drones and missiles — even as the diplomatic process continues.",
      sourceLabel: "Congressional Record — Wicker floor on Russia largest aerial attack",
      sourceUrl: "https://www.congress.gov/119/crec/2025/09/09/171/147/modified/CREC-2025-09-09-pt1-PgS6447-2.htm" },

    { date: "2025-10-16", label: "Trump–Putin call",
      sign: "mixed",
      detail: "A leader-level call sustains the bilateral channel; substantive content is not documented in primary sources.",
      blurb: "Trump and Putin hold a leader-level call that keeps the bilateral channel alive, with no substantive content disclosed.",
      sourceLabel: "",
      sourceUrl: "" },

    { date: "2025-10-22", label: "Rosneft & Lukoil designated",
      sign: "mixed",
      detail: "OFAC designates Rosneft and Lukoil with an explicit ceasefire demand attached.",
      blurb: "Treasury formally sanctions Russia's two largest oil companies, tying the designations to a ceasefire demand.",
      sourceLabel: "OFAC — Rosneft/Lukoil designations Oct 22, 2025",
      sourceUrl: "https://ofac.treasury.gov/recent-actions/20251022" },

    { date: "2025-11-13", label: "BIS export controls maintained",
      sign: "mixed",
      detail: "BIS Entity List additions and Aeroflot/UTair/Rossiya TDO renewals are maintained; criminal export-control prosecutions continue.",
      blurb: "Commerce maintains and extends export-control measures against Russian airlines and other entities, with criminal enforcement continuing.",
      sourceLabel: "Federal Register, 2025-11-13",
      sourceUrl: "" },

    { date: "2025-11-23", label: "Geneva US–Ukraine framework",
      sign: "mixed",
      detail: "Geneva talks produce a U.S.–Ukraine 'updated and refined peace framework' that the Ukrainian delegation says addressed its principal concerns; no Russian acceptance or trilateral endorsement is documented.",
      blurb: "U.S. and Ukrainian negotiators in Geneva agree on a refined peace framework that addresses Kyiv's main concerns, but Russia neither signs nor endorses it.",
      sourceLabel: "White House — Joint Statement US-Ukraine Geneva talks",
      sourceUrl: "https://www.whitehouse.gov/briefings-statements/2025/11/joint-statement-on-united-states-ukraine-meeting/" },

    { date: "2025-12-01", label: "Human-rights framing recedes",
      sign: "weakened",
      detail: "Rubio's Russia National Day statement omits human rights conditions; the 2025 NSS critiques post-Cold War democracy promotion; USAID dismantling halts anti-Russia disinformation programming.",
      blurb: "The administration drops human-rights language from Russia statements and winds down anti-Russia disinformation programs, narrowing the values-based pressure track.",
      sourceLabel: "White House — 2025 National Security Strategy",
      sourceUrl: "https://www.whitehouse.gov/wp-content/uploads/2025/12/2025-National-Security-Strategy.pdf" },

    { date: "2026-02-01", label: "New START expires",
      sign: "weakened",
      detail: "New START expires February 5, 2026 with no successor framework or negotiating mandate; the U.S. announces a 'new era' of arms control while alleging Russian violations.",
      blurb: "The last U.S.-Russia nuclear arms-control treaty lapses with no successor and no negotiating mandate, leaving a structural vacuum on strategic weapons.",
      sourceLabel: "State — CD statement on New START expiration",
      sourceUrl: "https://www.state.gov/releases/bureau-of-arms-control-and-nonproliferation/2026/02/statement-to-the-conference-on-disarmament-2/" },

    { date: "2026-02-24", label: "'Peace Through Strength' fact sheet",
      sign: "weakened",
      detail: "White House fact sheet lists eight 'ended' conflicts — Russia–Ukraine is not among them.",
      blurb: "The White House publishes a list of conflicts it claims to have ended — Russia-Ukraine is conspicuously not on it.",
      sourceLabel: "White House — Peace Through Strength fact sheet (Feb 24, 2026)",
      sourceUrl: "https://www.whitehouse.gov/articles/2026/02/president-trumps-peace-through-strength-renewed-american-leadership-and-global-security/" },

    { date: "2026-04-07", label: "Talks 'placed on hold'",
      sign: "weakened",
      detail: "Foreign Affairs reports talks placed on hold by April 2026 and a temporary unsanctioning of Russian oil after the Strait of Hormuz closure.",
      blurb: "Outside reporting indicates the Russia-Ukraine talks are placed on hold and Russian oil sanctions are temporarily relaxed amid a Middle East crisis.",
      sourceLabel: "Foreign Affairs — Flawed Formula for Peace in Ukraine",
      sourceUrl: "https://www.foreignaffairs.com/ukraine/flawed-formula-peace-ukraine" }
  ],

  /* ---- THE EVIDENCE PACK PROPER ---- */

  baseline: "EO 14024 sanctions architecture and the REPO Act framework with ~$300B G7-immobilized Russian sovereign assets; ~$66.5–66.9B cumulative U.S. security assistance to Ukraine since the 2022 invasion; the January 10, 2025 Biden-era energy-sector sanctions package against Gazprom Neft, Surgutneftegas and ~80 entities; an active war 'significantly degraded' but unresolved, with New START still in force and ~12,000 DPRK troops deployed to Kursk.",

  whatHappened: "Over 2025–2026, Trump opened a leader-level bilateral channel — Witkoff secured Marc Fogel's release, Rubio–Lavrov established a consultation mechanism, an Alaska summit was followed by a White House meeting with Zelensky and European leaders, and the November 23 Geneva talks produced a U.S.–Ukraine 'updated and refined peace framework' the Ukrainian delegation said addressed its principal concerns. The administration preserved EO 14024 (April 10, 2025 renewal) and added selective new pressure — EO 14329 imposing a 25% ad valorem secondary tariff on importers of Russian oil and OFAC's October 22 designation of Rosneft and Lukoil with an explicit ceasefire demand. Secondary analysis reports U.S. military aid to Ukraine fell from above $19B in 2024 to ~$400M authorized for 2026 (~98% reduction); a July 2025 Pentagon 'capability review' paused transfers before partial resumption. Hegseth declared NATO membership 'not a realistic outcome' and demanded Europe provide the 'overwhelming share' of aid; the Hague Summit codified a 5%-of-GDP allied spending pledge by 2035 with Russia named the 'long-term threat.' New START expired February 5, 2026 with no successor. Russia continued and intensified attacks during the diplomatic process — Sen. Wicker cited Russia's 'largest aerial attack of the war' in September 2025; a February 24, 2026 White House 'Peace Through Strength' fact sheet listing eight 'ended' conflicts did not include Russia–Ukraine; Foreign Affairs reported talks 'placed on hold' by April 2026 and a temporary unsanctioning of Russian oil after the Strait of Hormuz closure. Human rights framing receded — Rubio's Russia National Day statement omitted human rights conditions, Riyadh and peace readouts contained no political prisoner language, USAID dismantling halted anti-Russia disinformation programming, and the 2025 NSS critiqued post-Cold War democracy promotion.",

  memos: [
    {
      angle: "Diplomacy",
      text: "Trump opened a leader-level bilateral channel with unusual presidential attention — Witkoff secured Marc Fogel's release, Rubio–Lavrov established a consultation mechanism in February, the Alaska summit was followed by a White House meeting with Zelensky and European leaders, and the November 23 Geneva talks produced a U.S.–Ukraine 'updated and refined peace framework' the Ukrainian delegation said addressed its principal concerns. The pack documents no Russian acceptance or trilateral endorsement of the Geneva draft; substantive terms from Alaska and the October 16 Trump–Putin call are not in primary sources. Decision quality is contested — Sen. Durbin charged Trump 'publicly gave away huge concessions' on 1991 borders and NATO membership, and Hegseth publicly narrowed Ukraine's end-state by declaring NATO membership 'not a realistic outcome' before negotiations. Execution showed presidential-level attention, but the pack shows no closed deal, no documented Russia-side concession, and a stalled process by April 2026.",
      sources: [
        {label: "White House — NSA statement on Fogel release", url: "https://www.whitehouse.gov/briefings-statements/2025/02/statement-from-the-national-security-advisor/"},
        {label: "State — Rubio-Lavrov meeting Feb 18, 2025", url: "https://www.state.gov/secretary-rubios-meeting-with-russian-foreign-minister-lavrov"},
        {label: "White House — Peace summit hailed game-changer (Aug 18-19)", url: "https://www.whitehouse.gov/releases/2025/08/president-trumps-peace-summit-hailed-as-a-game-changer/"},
        {label: "White House — Joint Statement US-Ukraine Geneva talks", url: "https://www.whitehouse.gov/briefings-statements/2025/11/joint-statement-on-united-states-ukraine-meeting/"},
        {label: "Congressional Record — Durbin floor statement on concessions", url: "https://www.congress.gov/119/crec/2025/02/18/171/32/modified/CREC-2025-02-18-pt1-PgS1002.htm"}
      ]
    },
    {
      angle: "Security",
      text: "U.S. military aid to Ukraine was paused in July 2025 after a Pentagon 'capability review' before partial resumption; secondary reporting from Foreign Affairs cites a ~98% reduction by 2026 (from above $19B in 2024 to ~$400M authorized for 2026). No U.S. troops were committed for any post-war mission. Submarine repositioning in August 2025 functioned as signaling toward Russia. Escalation risk is material — Russia's September 2025 largest-aerial-attack-of-the-war, North Korean troop involvement in Kursk inherited from baseline, and New START's expiration without successor all raise vertical and horizontal escalation risk, offset only partially by the active bilateral channel whose substantive outputs are largely undisclosed.",
      sources: [
        {label: "DoD — Support for Ukraine timeline", url: "https://www.defense.gov/Spotlights/Support-for-Ukraine/Timeline/"},
        {label: "DoD — Capability review on Ukraine aid", url: "https://www.defense.gov/News/News-Stories/Article/Article/4234179/dod-capability-review-to-analyze-where-military-aid-goes-ensure-america-is-first/"},
        {label: "Foreign Affairs — Flawed Formula for Peace in Ukraine", url: "https://www.foreignaffairs.com/ukraine/flawed-formula-peace-ukraine"},
        {label: "Congressional Record — Wicker floor on Russia largest aerial attack", url: "https://www.congress.gov/119/crec/2025/09/09/171/147/modified/CREC-2025-09-09-pt1-PgS6447-2.htm"}
      ]
    },
    {
      angle: "Economic statecraft",
      text: "The inherited sanctions architecture was preserved — Trump renewed EO 14024 on April 10, 2025 — and selectively escalated with new instruments. EO 14329 imposed a 25% ad valorem secondary tariff on importers of Russian oil; OFAC's October 22 designation of Rosneft and Lukoil carried an explicit ceasefire demand. These actions are offset by reported temporary oil-sanctions relief in 2026 after the Strait of Hormuz closure, multiple SDN removals (Usmanov-linked, year-end batches), and Gibson Dunn's observation that the pace of new Russia sanctions slowed in 2025. Harder coercive options foreclosed: Graham's S.1241 500% tariff bill never advanced. The full EO 14329 text and follow-on country determinations remain partly unretrieved.",
      sources: [
        {label: "Federal Register — Continuation of EO 14024 emergency (Trump)", url: "https://www.federalregister.gov/documents/2025/04/14/2025-06399/continuation-of-the-national-emergency-with-respect-to-specified-harmful-foreign-activities-of-the-government-of-the-russian-federation"},
        {label: "Federal Register — EO 14329 Addressing Threats", url: "https://www.federalregister.gov/documents/2025/08/11/2025-15267/addressing-threats-to-the-united-states-by-the-government-of-the-russian-federation"},
        {label: "OFAC — Rosneft/Lukoil designations Oct 22, 2025", url: "https://ofac.treasury.gov/recent-actions/20251022"},
        {label: "Gibson Dunn — International Trade 2025 Year-End Update", url: "https://www.gibsondunn.com/international-trade-2025-year-end-update"}
      ]
    },
    {
      angle: "Technology & export controls",
      text: "BIS Entity List additions and Aeroflot/UTair/Rossiya Temporary Denial Order renewals were maintained. Affiliate end-user controls were expanded then suspended for one year (Russia-applicability not determinable from retrieved text). Criminal export-control prosecutions continued. New START expired February 5, 2026 with no successor framework or negotiating mandate documented, leaving a structural arms-control vacuum on the strategic-systems front.",
      sources: [
        {label: "Federal Register — EO 14329 Addressing Threats", url: "https://www.federalregister.gov/documents/2025/08/11/2025-15267/addressing-threats-to-the-united-states-by-the-government-of-the-russian-federation"},
        {label: "State — CD statement on New START expiration", url: "https://www.state.gov/releases/bureau-of-arms-control-and-nonproliferation/2026/02/statement-to-the-conference-on-disarmament-2/"}
      ]
    },
    {
      angle: "Human rights",
      text: "Human rights framing receded across the administration's Russia posture: Rubio's Russia National Day statement omitted human rights conditions, the Riyadh and peace readouts contained no political prisoner language, USAID dismantling halted anti-Russia disinformation programming, and the 2025 NSS critiqued post-Cold War democracy promotion. The State Department's Russia Travel Advisory remained at Level 4 and the 2025 TIP Report kept Russia at Tier 3 — inherited classifications retained rather than upgraded into bilateral leverage.",
      sources: [
        {label: "White House — 2025 National Security Strategy", url: "https://www.whitehouse.gov/wp-content/uploads/2025/12/2025-National-Security-Strategy.pdf"},
        {label: "State — Russia Travel Advisory Level 4", url: "https://travel.state.gov/en/international-travel/travel-advisories/russia.html"},
        {label: "State — 2025 TIP Report Russia Tier 3", url: "https://www.state.gov/reports/2025-trafficking-in-persons-report/russia"}
      ]
    },
    {
      angle: "Regional dynamics",
      text: "NATO burden shifted to Europe: Hegseth's Brussels speech demanded Europe carry the 'overwhelming share' of aid and the Hague Summit codified a 5%-of-GDP allied spending pledge by 2035 with Russia named the 'long-term threat.' UK and France were publicly designated as core security-guarantee providers. The pack does not establish Trump as the primary cause of the Hague 5% figure versus European reaction to Russia and longstanding burden-sharing pressure; Foreign Affairs' 'How Europe Found Its Nerve' frames the shift as European-driven.",
      sources: [
        {label: "DoD — Hegseth opening remarks UDCG Brussels", url: "https://www.defense.gov/News/Speeches/Speech/article/4064113/opening-remarks-by-secretary-of-defense-pete-hegseth-at-ukraine-defense-contact/"},
        {label: "NATO — The Hague Summit Declaration", url: "https://www.nato.int/en/about-us/official-texts-and-resources/official-texts/2025/06/25/the-hague-summit-declaration"},
        {label: "Foreign Affairs — How Europe Found Its Nerve", url: "https://www.foreignaffairs.com/europe/how-europe-found-its-nerve"}
      ]
    },
    {
      angle: "Time cuts",
      text: "Durability is low-to-medium: the Geneva draft is unsigned and Russia is not documented as a party; the bilateral channel depends on personal Trump–Putin engagement; New START's expiration creates a structural arms-control vacuum; and the aid drawdown and 2026 NDS Line of Effort 3 ('allies will take the lead' in Europe) are institutionalized in strategy documents that outlast any single negotiation. Pack-supported long-horizon effects: codified European 5% defense spending trajectory through 2035, institutionalized 'Europe leads' posture in the 2026 NDS, post-New START arms-control vacuum requiring a new framework, and weakening of the democracy/anti-disinformation ecosystem via USAID dismantling. Cross-theater trade-off: the 2026 NDS explicitly subordinates Europe to Indo-Pacific China deterrence; Foreign Affairs reports administration focus shifted to Iran after the March 2026 Strait of Hormuz closure, directly displacing Ukraine diplomatic bandwidth and reportedly triggering temporary Russian oil sanctions relief.",
      sources: [
        {label: "DoD — 2026 National Defense Strategy", url: "https://media.defense.gov/2026/Jan/23/2003864773/-1/-1/0/2026-NATIONAL-DEFENSE-STRATEGY.PDF"},
        {label: "Foreign Affairs — Flawed Formula for Peace in Ukraine", url: "https://www.foreignaffairs.com/ukraine/flawed-formula-peace-ukraine"}
      ]
    }
  ],

  attributionSignals: [
    { text: "Marc Fogel's release via the Witkoff channel is an output the inherited frozen relationship couldn't have produced — direct attribution to the new bilateral channel.",
      sourceLabel: "White House — NSA statement on Fogel release",
      sourceUrl: "https://www.whitehouse.gov/briefings-statements/2025/02/statement-from-the-national-security-advisor/" },
    { text: "Trump preserved EO 14024 with the April 10, 2025 renewal — a presidential decision rather than a continuation by default.",
      sourceLabel: "Federal Register — Continuation of EO 14024 emergency (Trump)",
      sourceUrl: "https://www.federalregister.gov/documents/2025/04/14/2025-06399/continuation-of-the-national-emergency-with-respect-to-specified-harmful-foreign-activities-of-the-government-of-the-russian-federation" },
    { text: "EO 14329's 25% secondary tariff and the October Rosneft/Lukoil designations carried explicit ceasefire demands attributable to the administration.",
      sourceLabel: "Federal Register — EO 14329 Addressing Threats",
      sourceUrl: "https://www.federalregister.gov/documents/2025/08/11/2025-15267/addressing-threats-to-the-united-states-by-the-government-of-the-russian-federation" },
    { text: "The Hague 5%-of-GDP pledge is NOT cleanly attributable to Trump — the pack flags European threat perception and longstanding burden-sharing pressure as plausibly primary drivers.",
      sourceLabel: "Foreign Affairs — How Europe Found Its Nerve",
      sourceUrl: "https://www.foreignaffairs.com/europe/how-europe-found-its-nerve" },
    { text: "The ~98% aid reduction figure is from Foreign Affairs analysis, not primary DoD budget execution data — attribution rests on a secondary source.",
      sourceLabel: "Foreign Affairs — Flawed Formula for Peace in Ukraine",
      sourceUrl: "https://www.foreignaffairs.com/ukraine/flawed-formula-peace-ukraine" }
  ],

  contestedPoints: [
    "Trump's engagement produced documented outputs absent under a counterfactual of pure disengagement — Fogel's release, the Rubio–Lavrov consultation mechanism, the Alaska leader summit, and the Geneva framework the Ukrainian delegation said addressed its principal concerns.",
    "The inherited sanctions architecture was preserved (EO 14024 renewed April 2025) and selectively escalated with new instruments (EO 14329 secondary tariff, Rosneft/Lukoil designations) — meaningfully distinct from abandonment.",
    "The ~98% aid reduction figure is Foreign Affairs analysis, not primary DoD budget execution data.",
    "The Hague 5% burden-shift is plausibly driven by European threat perception rather than U.S. abdication.",
    "On a restrainer/prioritizer reading the administration operationalized burden-shift and a focus on China while retaining selective coercive tools; on a primacist/coalition reading the same actions weakened Ukraine's negotiating position — the sign of the effect depends on which school you hold.",
    "Decision quality is contested (concessions on borders/NATO before talks per Durbin; publicly narrowed end-state per Hegseth), but execution showed unusual presidential-level attention."
  ],

  gaps: [
    "Russian MFA/Kremlin readouts of the bilateral process.",
    "The Alaska summit textual readout.",
    "The substance of the October 16 Trump–Putin call.",
    "The U.S. 'comprehensive peace plan' or '28-point plan' text.",
    "Primary documentation of the post-March 2026 temporary oil-sanctions rollback beyond Foreign Affairs.",
    "Primary budget/execution data for the ~98% aid cut figure.",
    "Evidence of Russian acceptance of the Geneva draft.",
    "Full EO 14329 text and its follow-on country determinations.",
    "Russia-applicability of the affiliate end-user controls expansion-then-suspension."
  ],

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
