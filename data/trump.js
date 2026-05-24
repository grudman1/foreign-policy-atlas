/* =====================================================================
   Foreign Policy Atlas — Donald Trump, 2nd term
   Snapshot date: May 2026 (projected timeline)
   Baseline: end of Joe Biden's administration (Jan 2025)

   Schema v2: state    (core-ally | aligned | neutral | strained | adversarial)
              delta    (↑↑ | ↑ | → | ↓ | ↓↓)
              baseline (one sentence — where Trump found the relationship on day one)

   To add another president: copy this file (e.g. data/biden.js), change
   the id/label/headline/blurb/asOf/foot and the three data objects, then
   add a <script src="data/biden.js"></script> line in index.html.
   ===================================================================== */

window.PRESIDENTS = window.PRESIDENTS || {};
window.PRESIDENTS["trump"] = {
  id: "trump",
  label: "Donald Trump — 2nd term",
  headline: "U.S. Strategic Position — Trump Second Term",
  blurb: "Alignment state &amp; shift from the Biden baseline, by country &amp; region &mdash; May 2026",
  asOf: "May 2026 (projected timeline)",
  foot:
  "<b>Method &amp; caveats.</b> Every entry uses a two-axis read. "+
  "<b>State</b> (color) is where the relationship stands as of May 2026 — core-ally, aligned, neutral, strained, or adversarial. "+
  "<b>Delta</b> (arrow) is what Trump changed from the end of Biden's administration — ↑↑ major gain, ↑ modest gain, → held, ↓ modest damage, ↓↓ major damage. "+
  "The combination is the point: a country can be adversarial-but-improving, or a core-ally-that-got-damaged. Each entry also has a <b>baseline</b> sentence stating what Trump inherited — so the delta is verifiable, not asserted. "+
  "Outcome lines (best / base / downside) are explicitly analytical projections, not predictions — the spread is the point. "+
  "Venezuela sits in <i>aligned / major gain</i> at the user's direction; the stricter analytic read is closer to <i>adversarial / major gain</i> absent a stable partner government — noted in its entry. "+
  "Interpretive placements (“interp”) rest on overall posture rather than one named event; reasonable analysts could score them differently. "+
  "Regional 'stakes' deliberately state both the upside and the damage case. Region label positions are approximate, for navigation only.",
  dossier: {}, regions: {}, outcomes: {}
};

/* =====================================================================
   DOSSIER — per-country entries
   state codes:    core-ally | aligned | neutral | strained | adversarial
   delta codes:    ↑↑  ↑  →  ↓  ↓↓
   baseline:       one sentence on where Biden left the relationship
   "interp" as last item in points[] flags an interpretive placement
   ===================================================================== */

window.PRESIDENTS["trump"].dossier = {

  // ===== WESTERN HEMISPHERE — SOUTH AMERICA =====
  "Argentina": {
    state:"aligned", delta:"↑↑", region:"South America",
    baseline:"Neutral/transactional — Milei newly elected, no major US financial relationship established under Biden.",
    points:[
      "Oct 2025: US Treasury opened a $20B currency-swap line via the Exchange Stabilization Fund — the first large-scale direct US rescue of a foreign economy since the 1995 Mexico bailout.",
      "Argentina wound down its Chinese central-bank swap line, repaying ~90% of what it had drawn from Beijing — a concrete shift out of China's financial orbit.",
      "Milei's libertarian bloc won the Oct 2025 midterms after visible Trump backing; Argentina drew and then repaid $2.5B of the swap.",
      "A US-Argentina trade deal is in negotiation. Strategic assets: lithium triangle, Vaca Muerta shale.",
      "Durability risk: alignment is ideological and leader-specific — Trump said he would not 'waste time' if Milei lost. One election from reversal."
    ]
  },
  "Ecuador": {
    state:"aligned", delta:"↑", region:"South America",
    baseline:"Aligned and rising — Noboa elected with US backing under Biden; security cooperation already growing, no joint ops or base-access changes yet.",
    points:[
      "Mar 2026: conducted its first joint military operation with the US against a drug-trafficking group.",
      "President Noboa, re-elected and pro-US, has pushed to allow foreign military installations again (reversing a constitutional ban).",
      "Founding member of the Shield of the Americas counter-cartel coalition.",
      "Durability risk: security-driven and leader-dependent; Ecuador's politics are volatile."
    ]
  },
  "Venezuela": {
    state:"aligned", delta:"↑↑", region:"South America",
    baseline:"Adversarial — Maduro entrenched under Biden, anchoring Chinese, Russian and Iranian influence; sanctions in place but no breakthrough.",
    points:[
      "Jan 2026: US operation captured Nicolás Maduro and removed him to the US for trial on narco-terrorism and trafficking charges.",
      "Removed the regime that anchored Chinese, Russian and Iranian influence in the hemisphere; US now has decisive say over the world's largest proven oil reserves.",
      "MAJOR CAVEAT: there is not yet a stable aligned government to be a 'partner.' This is closer to a post-regime transition than an institutionalized alliance — analogous to Iraq 2003. Counted as <i>aligned / major gain</i> at user's direction; the honest analytic view is <i>adversarial / major gain</i> — the regime fell but no aligned successor is yet in place.",
      "The boat strikes and capture drew sovereignty and rule-of-law objections across the region."
    ]
  },
  "Bolivia": {
    state:"aligned", delta:"↑↑", region:"South America",
    baseline:"Strained — MAS government under Biden aligned with China and Russia; lithium discussions ran through Moscow and Beijing only, no US relationship of substance.",
    points:[
      "2025 election of Rodrigo Paz ended ~two decades of MAS socialist rule — a tilt away from the China/Russia orbit.",
      "Holds the largest lithium reserves in the triangle — strategically significant if alignment holds.",
      "Emerging — very early, and Bolivian resource nationalism is strong."
    ]
  },
  "Chile": {
    state:"aligned", delta:"↑", region:"South America",
    baseline:"Neutral — Boric left govt under Biden cool to US instincts but cooperated on lithium and Venezuela; no marquee US-Chile initiative.",
    points:[
      "Dec 2025 election of right-wing José Antonio Kast shifts Santiago toward the US-aligned bloc.",
      "Major copper and lithium producer.",
      "Emerging — incoming government, alignment untested."
    ]
  },
  "Guyana": {
    state:"aligned", delta:"↑", region:"South America",
    baseline:"Aligned and rising — Biden-era ExxonMobil oil boom; US naval cooperation begun amid Essequibo tensions with Venezuela.",
    points:[
      "Fastest-growing economy on earth from the offshore oil boom; ExxonMobil deeply embedded.",
      "Security incentive to shelter under the US given Venezuela's Essequibo claim; Shield of the Americas member.",
      "Emerging — small now, wealthy and strategic soon."
    ]
  },
  "Paraguay": {
    state:"aligned", delta:"→", region:"South America",
    baseline:"Aligned — conservative Peña govt under Biden, pro-US, recognizes Taiwan; steady low-profile cooperation.",
    points:[
      "Shield of the Americas member; conservative government aligned with the US.",
      "Modest deepening under Trump, but no marquee initiative.",
      "interp"
    ]
  },
  "Peru": {
    state:"aligned", delta:"→", region:"South America",
    baseline:"Aligned — Boluarte govt cooperative with Biden on counter-narcotics; chronic political instability the persistent backdrop.",
    points:[
      "Conservative-leaning government; counter-narcotics and trade cooperation maintained.",
      "No marquee Trump-era shift; Peruvian politics remain unstable.",
      "interp"
    ]
  },
  "Brazil": {
    state:"strained", delta:"↓↓", region:"South America",
    baseline:"Neutral/cooperative — Lula govt under Biden was non-aligned but worked with Washington on climate, the Amazon, and Venezuela; trade ties stable.",
    points:[
      "2025: Trump imposed tariffs up to 50% and sanctioned a Supreme Court justice under the Magnitsky Act — retaliation for Brazil's prosecution of Bolsonaro.",
      "Lula said the relationship moved 'from win-win to lose-lose'; Brazil filed at the WTO and passed reciprocity legislation.",
      "May 2026: a White House meeting created a working group with a 30-day deadline to resolve the tariff dispute — a thaw.",
      "Structural fact: China is Brazil's largest trading partner; Brazil is a BRICS member committed to non-alignment regardless of who holds the White House."
    ]
  },
  "Colombia": {
    state:"strained", delta:"↓", region:"South America",
    baseline:"Aligned but strained — Petro left govt had friction with Biden but the historic US-Colombia security partnership continued underneath.",
    points:[
      "President Petro (left) clashed publicly with Trump over deportation flights and threatened to exit the Shield of the Americas.",
      "Historically the closest US security partner in South America — now strained.",
      "Damage is at the political/leader layer; institutional security ties largely intact."
    ]
  },
  "Uruguay": {
    state:"neutral", delta:"→", region:"South America",
    baseline:"Neutral — low-key low-engagement ties under Biden; no notable initiative either way.",
    points:[
      "Left-leaning government; no particular warmth with Washington under Trump either.",
      "Uncommitted — low salience.",
      "interp"
    ]
  },

  // ===== WESTERN HEMISPHERE — CENTRAL AMERICA =====
  "El Salvador": {
    state:"aligned", delta:"↑↑", region:"Central America",
    baseline:"Strained — Biden admin publicly critical of Bukele over democratic backsliding and the mega-prison; cooperation thin.",
    points:[
      "Jan 29, 2026: signed a reciprocal trade agreement giving US firms preferential access to El Salvador's critical-minerals supply chain, tied to clean-tech and defense investment.",
      "Deepened intelligence-sharing and migration cooperation; El Salvador accepted US deportees including to its mega-prison.",
      "Bukele is young, domestically dominant, and ideologically aligned with the MAGA movement.",
      "Durability risk: heavily personalized around Bukele; the relationship has not been tested by a leadership change."
    ]
  },
  "Panama": {
    state:"aligned", delta:"↑↑", region:"Central America",
    baseline:"Aligned but China-engaged — Belt and Road member under Biden, Hong Kong-affiliated firm holding long-term port concessions; no US push to unwind either.",
    points:[
      "Early 2025: under US pressure and threats to 'retake' the Canal, Panama withdrew from China's Belt and Road Initiative — the first country to exit.",
      "Long-term port concessions held by a Hong Kong-based firm were placed under review.",
      "Custodies the interoceanic canal — the single most strategic chokepoint in the hemisphere; geography makes the alignment durable.",
      "Friction point: the pressure was coercive and unpopular domestically; sovereignty resentment persists."
    ]
  },
  "Guatemala": {
    state:"aligned", delta:"→", region:"Central America",
    baseline:"Aligned — Arévalo govt installed with US backing under Biden; democratic restoration was a Biden priority and cooperation steady.",
    points:[
      "Migration cooperation; accepted deportee flows under Trump.",
      "Relationship now driven mainly by migration enforcement rather than the democracy-promotion frame Biden used.",
      "interp"
    ]
  },
  "Honduras": {
    state:"neutral", delta:"→", region:"Central America",
    baseline:"Neutral — Xiomara Castro left-leaning govt under Biden, transactional ties on migration and aid; no special alignment.",
    points:[
      "Member of the Shield of the Americas coalition; migration and security cooperation maintained.",
      "Politically variable — awaiting election outcomes to test direction.",
      "interp"
    ]
  },
  "Costa Rica": {
    state:"aligned", delta:"→", region:"Central America",
    baseline:"Aligned — stable democratic partner under Biden; low-engagement steady ties on counter-narcotics.",
    points:[
      "Security cooperation; aligned on counter-narcotics.",
      "Maintained, no marquee Trump-era initiative.",
      "interp"
    ]
  },
  "Belize": {
    state:"neutral", delta:"→", region:"Central America",
    baseline:"Neutral — minimal Biden-era engagement; small-state security ties.",
    points:[
      "Small-state security cooperation continues.",
      "Nominal engagement; no marquee change.",
      "interp"
    ]
  },
  "Nicaragua": {
    state:"adversarial", delta:"→", region:"Central America",
    baseline:"Adversarial — Ortega regime sanctioned under Biden; aligned with Russia, China, Cuba, Venezuela.",
    points:[
      "Ortega's authoritarian regime; aligned with Russia, China, Cuba, Venezuela.",
      "No Trump-era change in substance — adversarial throughout."
    ]
  },

  // ===== WESTERN HEMISPHERE — CARIBBEAN =====
  "Cuba": {
    state:"adversarial", delta:"↓↓", region:"Caribbean",
    baseline:"Adversarial but slowly normalizing — Biden had begun limited family-travel and remittance reforms after Trump 1's tightening; no breakthrough.",
    points:[
      "Jan 2026: Trump declared a national emergency and created a mechanism to tariff any country supplying oil to Cuba.",
      "May 1, 2026: EO 14404 imposed Iran-style secondary sanctions; designated the military conglomerate GAESA.",
      "The administration has stated regime change in Cuba is a goal by year-end.",
      "Risks: humanitarian and migration blowback onto the US; secondary sanctions antagonize allies like Canada.",
      "A pressure campaign, not yet any kind of gain — outcome unresolved."
    ]
  },
  "Dominican Republic": {
    state:"aligned", delta:"→", region:"Caribbean",
    baseline:"Aligned — Abinader govt close to Biden on Haiti and migration; steady cooperation.",
    points:[
      "Shield of the Americas member; close migration and security cooperation.",
      "Maintained — not a new initiative.",
      "interp"
    ]
  },
  "Trinidad and Tobago": {
    state:"aligned", delta:"↑", region:"Caribbean",
    baseline:"Neutral — limited Biden-era engagement; energy producer with Venezuela ties.",
    points:[
      "Shield of the Americas member; energy producer near Venezuela.",
      "Modest warming driven by Venezuela proximity and counter-trafficking.",
      "interp"
    ]
  },
  "Jamaica": {
    state:"aligned", delta:"→", region:"Caribbean",
    baseline:"Aligned — steady low-engagement counter-narcotics ties under Biden.",
    points:[
      "Security and counter-narcotics cooperation continues.",
      "No marquee Trump-era initiative.",
      "interp"
    ]
  },
  "Haiti": {
    state:"strained", delta:"→", region:"Caribbean",
    baseline:"Strained — state in collapse under Biden; Kenya-led multinational mission deployed; US engagement crisis-management only.",
    points:[
      "Gang-driven state collapse; US engagement is crisis-management, not partnership.",
      "No Trump-era shift in substance; trajectory remains downward.",
      "interp"
    ]
  },

  // ===== WESTERN HEMISPHERE — NORTH AMERICA =====
  "Mexico": {
    state:"strained", delta:"↓", region:"North America",
    baseline:"Aligned but pressured — Biden's relationship with AMLO and then Sheinbaum was cooperative on migration and trade; USMCA functional.",
    points:[
      "Threatened 25% tariffs; intense pressure over fentanyl, migration and cartels.",
      "President Sheinbaum (left) threatened to pull out of the Shield of the Americas summit in protest.",
      "Cooperation continues under pressure, but the relationship is adversarial in tone."
    ]
  },
  "Canada": {
    state:"strained", delta:"↓↓", region:"North America",
    baseline:"Core ally — Biden-era US-Canada relationship was deeply integrated; Five Eyes; USMCA functional; no public friction of consequence.",
    points:[
      "Threatened 25% tariffs; repeated '51st state' rhetoric strained the relationship badly.",
      "Canada's blocking statute constrains US extraterritorial (Cuba) sanctions — a point of friction.",
      "A core ally treated as an adversary on trade."
    ]
  },

  // ===== EUROPE =====
  "Hungary": {
    state:"aligned", delta:"↑↑", region:"Europe",
    baseline:"Strained — Biden admin publicly critical of Orbán on democracy and Ukraine; cooperation minimal beyond NATO essentials.",
    points:[
      "Orbán is the most ideologically aligned EU leader; close personal and movement ties to Trump.",
      "Negotiated its own US currency-swap arrangement — unusual bilateral financial cooperation.",
      "Functions as a US-aligned wedge inside the EU and NATO, often blocking consensus on Ukraine.",
      "Caveat: the alignment is with Orbán personally and runs against the EU mainstream, not a US-Europe partnership."
    ]
  },
  "Poland": {
    state:"core-ally", delta:"→", region:"Europe",
    baseline:"Core ally and rising — Biden-era US troop presence already expanded; Polish defense spending among NATO's highest; relationship institutionally deep.",
    points:[
      "Among the most pro-US states in Europe; actively wants a larger permanent US troop presence.",
      "High defense spending — a model of the burden-sharing Trump demands.",
      "A frontline NATO state; maintained, with marginal further deepening under Trump."
    ]
  },
  "Italy": {
    state:"aligned", delta:"↑", region:"Europe",
    baseline:"Aligned — Meloni constructive partner to Biden on Ukraine; firmly EU/NATO mainstream despite right-wing domestic politics.",
    points:[
      "PM Meloni is among the most Trump-sympathetic EU leaders; positioned as a transatlantic bridge.",
      "Emerging within the populist-right tilt — but Italy remains embedded in EU/NATO consensus.",
      "interp"
    ]
  },
  "Czechia": {
    state:"aligned", delta:"→", region:"Europe",
    baseline:"Aligned — Biden-era Fiala govt strongly pro-US, top European voice on Ukraine; relationship institutionally close.",
    points:[
      "Babiš's return shifts Prague toward the populist-right, Trump-sympathetic bloc.",
      "Net effect ambiguous: tilt is ideological-rightward rather than a deepening of US-Czechia ties.",
      "interp"
    ]
  },
  "Slovakia": {
    state:"strained", delta:"→", region:"Europe",
    baseline:"Strained — Fico government already in power and pro-Russia / anti-Ukraine-aid under Biden; cool to Washington.",
    points:[
      "Fico government is populist and skeptical of Ukraine aid, tilting toward Trump's line.",
      "Ideological tilt more than a deepened US partnership.",
      "interp"
    ]
  },
  "United Kingdom": {
    state:"core-ally", delta:"↓", region:"Europe",
    baseline:"Core ally — Biden-era special relationship intact; Ukraine support tightly coordinated; Five Eyes anchor.",
    points:[
      "Remains a core ally and Five Eyes member, but navigating Trump's tariff and burden-sharing pressure.",
      "Strained in tone rather than substance — the institutional spine of the alliance holds.",
      "interp"
    ]
  },
  "France": {
    state:"strained", delta:"↓", region:"Europe",
    baseline:"Aligned — Macron's 'strategic autonomy' theme persistent under Biden, but NATO and Ukraine cooperation strong; no rupture.",
    points:[
      "A leading voice for European 'strategic autonomy' — explicitly hedging against US reliability.",
      "Friction over tariffs, Ukraine and NATO direction."
    ]
  },
  "Germany": {
    state:"strained", delta:"↓↓", region:"Europe",
    baseline:"Core ally — Biden-era US-Germany ties strong on Ukraine and NATO; trade frictions limited; no significant rupture.",
    points:[
      "Tariff and defense-spending friction; central to EU contingency planning for a paralyzed alliance.",
      "Strained — a core ally drifting."
    ]
  },
  "Denmark": {
    state:"strained", delta:"↓↓", region:"Europe",
    baseline:"Core ally — Biden-era Denmark close NATO partner; no significant friction; Greenland not a US topic.",
    points:[
      "Jan 2026: Washington pressured Denmark to cede Greenland, threatening tariffs; the EU readied its Anti-Coercion Instrument before Trump withdrew the threat.",
      "Threatening to take a NATO ally's territory is the sharpest single rupture in the transatlantic relationship."
    ]
  },
  "Greenland": {
    state:"strained", delta:"↓↓", region:"Europe",
    baseline:"Aligned — Biden-era engagement low-profile; US base at Pituffik operational; no acquisition pressure.",
    points:[
      "Object of explicit US acquisition pressure in Jan 2026.",
      "The territory and its population have resisted; an autonomy/sovereignty flashpoint."
    ]
  },
  "Ukraine": {
    state:"strained", delta:"↓↓", region:"Europe",
    baseline:"Aligned and central — Biden-era partnership the marquee US foreign-policy commitment; tens of billions in military aid and intelligence support.",
    points:[
      "US military and financial aid has virtually dried up; Trump has blamed Kyiv for the war.",
      "Europeans now effectively pay the US to keep weapons flowing; Trump has called Zelensky a greater obstacle than Putin.",
      "A former close partner now strained and sidelined in its own peace process."
    ]
  },
  "Georgia": {
    state:"strained", delta:"→", region:"Europe",
    baseline:"Strained — Biden-era Georgian Dream govt already drifting toward Moscow; democratic backsliding underway.",
    points:[
      "Governing party has drifted further toward Moscow; democratic backsliding continues.",
      "Drifting — not a US-driven outcome.",
      "interp"
    ]
  },
  "Moldova": {
    state:"strained", delta:"↓", region:"Europe",
    baseline:"Aligned — Sandu pro-Western govt under Biden, supported under sustained Russian pressure.",
    points:[
      "Pro-EU government under Russian pressure; US engagement has receded as Europe focus dims.",
      "Counted with the strained European set under Trump.",
      "interp"
    ]
  },
  "Serbia": {
    state:"neutral", delta:"→", region:"Europe",
    baseline:"Neutral — Biden-era engagement transactional; Vučić balancing US, EU, Russia, China.",
    points:[
      "Balances among the US, EU, Russia and China; Trump-family business ties in Belgrade.",
      "Courted, but non-aligned by design.",
      "interp"
    ]
  },

  // ===== EURASIA / POST-SOVIET =====
  "Russia": {
    state:"adversarial", delta:"↑", region:"Eurasia",
    baseline:"Adversarial — Biden maintained strong Ukraine military aid and broad Russia sanctions; no bilateral engagement of substance.",
    points:[
      "Trump is actively pursuing a reset — a bilateral US-Russia track aimed at improved relations and business deals.",
      "US military aid to Ukraine has virtually dried up; Trump has often blamed Ukraine for the war and floated sanctions relief.",
      "Skeptical reading: Putin's participation in peace talks is widely assessed as performative — humoring Trump while Russian forces press the battlefield.",
      "Genuinely unresolved — could become a Trump signature achievement or a costly miscalculation. The single highest-variance entry on the map."
    ]
  },
  "Belarus": {
    state:"adversarial", delta:"→", region:"Eurasia",
    baseline:"Adversarial — Biden-era US relationship minimal; comprehensive sanctions in place; Lukashenko fully aligned with Moscow.",
    points:[
      "Limited prisoner-release diplomacy and quiet contacts.",
      "In play only at the margins — remains closely tied to Moscow.",
      "interp"
    ]
  },
  "Armenia": {
    state:"neutral", delta:"↑", region:"Eurasia",
    baseline:"Neutral, tilting west — under Biden, Armenia began drifting away from Russia after the 2023 Karabakh defeat; no formal realignment.",
    points:[
      "US helped broker an Armenia-Azerbaijan peace framework; Armenia is tilting away from Russia.",
      "Emerging realignment — early and fragile."
    ]
  },
  "Azerbaijan": {
    state:"neutral", delta:"↑", region:"Eurasia",
    baseline:"Neutral — Biden-era engagement transactional, complicated by Nagorno-Karabakh; Baku close to Turkey and Russia.",
    points:[
      "Party to the US-brokered peace framework with Armenia; energy-exporting state.",
      "Azerbaijan also maintains close ties with Turkey and Russia.",
      "interp"
    ]
  },
  "Kazakhstan": {
    state:"aligned", delta:"↑", region:"Eurasia",
    baseline:"Neutral — Biden's C5+1 framework was nominal; Kazakhstan still Russia-tied through Eurasian Economic Union.",
    points:[
      "Signed onto the Abraham Accords — a Muslim-majority former Soviet state; the administration expects other Caspian states to follow.",
      "Critical-minerals cooperation; a hedge against both Russia and China.",
      "Emerging — a real diplomatic opening, not yet a deep partnership."
    ]
  },
  "Uzbekistan": {
    state:"neutral", delta:"↑", region:"Eurasia",
    baseline:"Neutral — Biden-era C5+1 nominal; Uzbekistan cautiously diversifying without leaving the Russia/China orbit.",
    points:[
      "Central Asian C5 engagement; critical-minerals and counterbalancing interest.",
      "Early-stage.",
      "interp"
    ]
  },
  "Turkmenistan": {
    state:"neutral", delta:"→", region:"Eurasia",
    baseline:"Neutral/nominal — one of the world's most isolated states; minimal Biden-era engagement.",
    points:[
      "Energy-rich; peripheral C5 engagement.",
      "Nominal — among the world's most isolated states.",
      "interp"
    ]
  },
  "Kyrgyzstan": {
    state:"neutral", delta:"→", region:"Eurasia",
    baseline:"Neutral/nominal — limited Biden-era engagement; Russia-dominated security environment.",
    points:[
      "Part of C5 Central Asia engagement.",
      "Nominal.",
      "interp"
    ]
  },
  "Tajikistan": {
    state:"neutral", delta:"→", region:"Eurasia",
    baseline:"Neutral — Biden engagement focused on Afghan-border security after the 2021 withdrawal; modest.",
    points:[
      "Part of C5 Central Asia engagement; Afghanistan-border security relevance.",
      "Nominal.",
      "interp"
    ]
  },

  // ===== MIDDLE EAST =====
  "Israel": {
    state:"core-ally", delta:"↑", region:"Middle East",
    baseline:"Core ally but strained — Biden-Netanyahu tensions over Gaza conduct and settlements were severe in 2024; aid still flowing but public friction high.",
    points:[
      "The anchor US ally in the region; the relationship predates Trump and is institutionally deep.",
      "Central to the Abraham Accords framework, which has persisted and expanded.",
      "Strong alignment on Iran — the June 2025 strikes on Iranian nuclear sites were closely coordinated.",
      "The Trump-Netanyahu tone is notably warmer than Biden's, but the institutional substance was already deep."
    ]
  },
  "United Arab Emirates": {
    state:"core-ally", delta:"↑", region:"Middle East",
    baseline:"Aligned and deep — Abraham Accords intact under Biden, but UAE was openly hedging with China on tech, especially AI.",
    points:[
      "Part of a ~$2 trillion Gulf investment pledge into the US announced during Trump's May 2025 visit.",
      "Deep AI and advanced-tech cooperation with the US, partly displacing the China hedge.",
      "Abraham Accords signatory; a strengthening partnership.",
      "Strain: Goldman Sachs estimated UAE GDP could fall 8-10% in 2026 from the Strait of Hormuz disruption tied to the Iran war."
    ]
  },
  "Saudi Arabia": {
    state:"aligned", delta:"↑", region:"Middle East",
    baseline:"Aligned but cool — Biden pursued normalization track late in term after early 'pariah' posture, but no breakthrough; oil and arms ties intact.",
    points:[
      "Anchored the ~$2T Gulf investment pledge; major arms and tech deals.",
      "Israel normalization remains STALLED — Riyadh refuses without concrete movement toward a Palestinian state.",
      "Strain: estimated ~5% GDP hit in 2026 from the Hormuz disruption.",
      "A strong but transactional partnership; the marquee prize (normalization) is unrealized."
    ]
  },
  "Qatar": {
    state:"core-ally", delta:"→", region:"Middle East",
    baseline:"Core ally — Al Udeid base operational under Biden, major non-NATO ally; Gaza mediation role institutionalized.",
    points:[
      "Hosts the largest US military base in the region (Al Udeid).",
      "Part of Gulf investment and defense cooperation; active diplomatic mediator (Gaza, others).",
      "Maintained strong partner."
    ]
  },
  "Bahrain": {
    state:"aligned", delta:"→", region:"Middle East",
    baseline:"Aligned — Fifth Fleet host and Abraham Accords signatory from prior Trump term; quietly maintained under Biden.",
    points:[
      "Hosts the US Fifth Fleet; an Abraham Accords signatory.",
      "Small but reliably aligned; a maintained relationship."
    ]
  },
  "Egypt": {
    state:"aligned", delta:"→", region:"Middle East",
    baseline:"Aligned but cool — Biden had paused some military aid over human rights; mediation role on Gaza preserved core ties.",
    points:[
      "Long-standing major non-NATO ally; large US military aid relationship restored to full flow.",
      "Key mediator on Gaza ceasefire diplomacy.",
      "Maintained; relationship is transactional and stable."
    ]
  },
  "Jordan": {
    state:"core-ally", delta:"→", region:"Middle East",
    baseline:"Core ally — Biden-era major non-NATO ally backed through regional war pressure and refugee burdens.",
    points:[
      "Major non-NATO ally; deep security and intelligence cooperation.",
      "Maintained, though strained by regional war pressures and refugee burdens."
    ]
  },
  "Kuwait": {
    state:"aligned", delta:"→", region:"Middle East",
    baseline:"Aligned — major non-NATO ally under Biden; hosts significant US military presence; steady.",
    points:[
      "Major non-NATO ally; hosts significant US military presence.",
      "Maintained Gulf partner."
    ]
  },
  "Oman": {
    state:"aligned", delta:"→", region:"Middle East",
    baseline:"Aligned — quiet mediator under Biden, especially on Iran channels; stable Gulf partner.",
    points:[
      "Quiet diplomatic interlocutor (notably with Iran); stable Gulf state.",
      "Maintained — counted here given its mediating rather than allied posture.",
      "interp"
    ]
  },
  "Turkey": {
    state:"strained", delta:"→", region:"Middle East",
    baseline:"Strained — S-400 sanctions in place under Biden; Sweden NATO accession brinkmanship; transactional cooperation only.",
    points:[
      "Transactional engagement with Trump; NATO member with independent ambitions.",
      "Cooperation on some files (post-Assad Syria), friction on others (defense, regional posture).",
      "interp"
    ]
  },
  "Syria": {
    state:"neutral", delta:"↑", region:"Middle East",
    baseline:"Strained/in transition — Assad fell Dec 2024; Biden took first steps on sanctions relief in his final weeks but the policy was unfinished.",
    points:[
      "Post-Assad transition; the US moved to lift major sanctions to support the new government.",
      "In play — a genuine opening, but the new order is fragile and unproven."
    ]
  },
  "Iraq": {
    state:"strained", delta:"→", region:"Middle East",
    baseline:"Strained — Biden balancing Iranian influence and Iraqi sovereignty; Shiite-militia tensions chronic; cooperation on counter-ISIS held.",
    points:[
      "Caught between US and Iranian influence; militia tensions continue.",
      "A difficult, contested relationship.",
      "interp"
    ]
  },
  "Lebanon": {
    state:"strained", delta:"→", region:"Middle East",
    baseline:"Strained — Hezbollah's role and the country's fragility constrained Biden-era engagement throughout the term.",
    points:[
      "Hezbollah's role and the country's fragility limit US engagement.",
      "Strained/uncommitted.",
      "interp"
    ]
  },
  "Iran": {
    state:"adversarial", delta:"↓↓", region:"Middle East",
    baseline:"Adversarial — JCPOA revival failed under Biden; sanctions in place; Iranian proxies (Houthis, Hezbollah, Shiite militias) active across the region.",
    points:[
      "June 2025: US struck Iranian nuclear sites; an active war state through 2026.",
      "Iran retained ~70% of its prewar missile stockpile and proved more resilient than expected; closure of the Strait of Hormuz disrupted global trade.",
      "The single biggest active drag on the foreign-policy ledger.",
      "Argument for ↓↓ from an already-adversarial baseline: the relationship moved from cold standoff to open war — a major deterioration."
    ]
  },
  "Yemen": {
    state:"adversarial", delta:"→", region:"Middle East",
    baseline:"Adversarial — Biden re-designated Houthis as Specially Designated Global Terrorists late 2023 after Red Sea attacks; airstrikes already ongoing.",
    points:[
      "Houthi authorities targeted in continued US strikes over Red Sea shipping attacks.",
      "Adversarial throughout — the campaign Biden began continues with no resolution."
    ]
  },

  // ===== NORTH AFRICA =====
  "Morocco": {
    state:"aligned", delta:"→", region:"North Africa",
    baseline:"Aligned — Abraham Accords partner with Western Sahara recognition; Biden maintained the relationship and the recognition.",
    points:[
      "Abraham Accords signatory; US recognition of Moroccan sovereignty over Western Sahara intact.",
      "Stable, maintained partner with growing defense ties."
    ]
  },
  "Algeria": {
    state:"strained", delta:"→", region:"North Africa",
    baseline:"Strained — Russia-aligned defense posture under Biden; cool relations with Washington.",
    points:[
      "Russia-aligned defense posture; cool relations with Washington continue.",
      "Strained/uncommitted.",
      "interp"
    ]
  },
  "Tunisia": {
    state:"strained", delta:"→", region:"North Africa",
    baseline:"Strained — Biden-era Saied autocratic consolidation, US aid cuts already in motion.",
    points:[
      "Democratic backsliding; aid cuts continue; low engagement.",
      "Uncommitted.",
      "interp"
    ]
  },
  "Libya": {
    state:"strained", delta:"→", region:"North Africa",
    baseline:"Strained — divided governance under Biden; no coherent US partnership; civil-war legacy unresolved.",
    points:[
      "Divided governance; no coherent US partnership.",
      "Strained/uncommitted.",
      "interp"
    ]
  },

  // ===== SUB-SAHARAN AFRICA =====
  "Dem. Rep. Congo": {
    state:"aligned", delta:"↑↑", region:"Sub-Saharan Africa",
    baseline:"Neutral — Biden engaged through aid programs; no marquee minerals partnership; Chinese cobalt dominance unchallenged.",
    points:[
      "Dec 2025: signed a minerals-for-security deal with the US (alongside Rwanda) opening cobalt and coltan reserves to US government and companies.",
      "Lobito Corridor node — rail link to move copper/cobalt to the Atlantic, bypassing Chinese-controlled supply chains.",
      "Fragile: the associated peace is precarious, M23 remains potent, and Congolese lawyers filed a constitutional challenge to the partnership agreement.",
      "Trump's 'they said please take our minerals' framing fuels exploitation resentment."
    ]
  },
  "Nigeria": {
    state:"strained", delta:"↓", region:"Sub-Saharan Africa",
    baseline:"Aligned — Biden-era partnership covered counterterrorism, trade, and democracy support; West Africa's anchor and the largest African economy.",
    points:[
      "Relationship cratered to its lowest since the 1970s over Trump's 'Christian genocide' accusation and threats of military intervention; AFRICOM struck ISIS militants in Sokoto on Christmas Day 2025.",
      "Jan 22, 2026: the two countries inaugurated a Nigeria-US Joint Working Group on counterterrorism — Abuja successfully converted the threat into cooperation.",
      "Foundation is contested and coercive — Nigerian officials and even Christian leaders rejected the 'genocide' framing.",
      "Strategic weight: West Africa's anchor, ~230M people — net damage exceeds the recovery on the joint working group.",
      "interp"
    ]
  },
  "Angola": {
    state:"aligned", delta:"↑", region:"Sub-Saharan Africa",
    baseline:"Aligned/rising — Biden launched the Lobito Corridor as a G7 Partnership for Global Infrastructure initiative; cooperation already trajectory-positive.",
    points:[
      "Central node of the Lobito Corridor — its Atlantic ports anchor the US-backed rail route for Congolese/Zambian copper and cobalt.",
      "Dec 2025: DFC signed a $553M loan for the Lobito Atlantic Railway.",
      "A genuine infrastructure partnership (continued from a G7 initiative), not a smash-and-grab — but early-stage."
    ]
  },
  "Zambia": {
    state:"aligned", delta:"↑", region:"Sub-Saharan Africa",
    baseline:"Neutral/rising — Biden-era Lobito Corridor engagement just starting; HH government pro-engagement but no marquee deal yet.",
    points:[
      "Copper-belt origin point for the Lobito Corridor; processing facilities planned along the route.",
      "Emerging partner in the US critical-minerals strategy."
    ]
  },
  "Guinea": {
    state:"neutral", delta:"↑", region:"Sub-Saharan Africa",
    baseline:"Neutral — limited Biden-era engagement; junta governance and instability the persistent backdrop.",
    points:[
      "US-led 'Liberty Corridor' connects the Nimba mining district to a new deepwater port.",
      "Emerging resource partner; governance and stability risks remain."
    ]
  },
  "Côte d'Ivoire": {
    state:"aligned", delta:"↑", region:"Sub-Saharan Africa",
    baseline:"Neutral/aligned — modest Biden-era engagement focused on West African stability and counterterrorism.",
    points:[
      "Engaged on critical-minerals cooperation; one of the more stable West African economies.",
      "Early-stage engagement.",
      "interp"
    ]
  },
  "Kenya": {
    state:"aligned", delta:"→", region:"Sub-Saharan Africa",
    baseline:"Aligned — designated major non-NATO ally under Biden in 2024; Haiti mission leadership a Biden-era ask.",
    points:[
      "Major non-NATO ally designation (2024) carried forward; security and tech cooperation continues.",
      "Maintained — not a marquee Trump initiative.",
      "interp"
    ]
  },
  "Liberia": {
    state:"neutral", delta:"→", region:"Sub-Saharan Africa",
    baseline:"Neutral — historic US ties but low engagement under Biden.",
    points:[
      "One of five West African states Trump met in July 2025 under the 'aid to trade' framing.",
      "Historic US ties; emerging transactional engagement.",
      "interp"
    ]
  },
  "Senegal": {
    state:"neutral", delta:"→", region:"Sub-Saharan Africa",
    baseline:"Neutral — stable democratic partner under Biden, low-profile engagement.",
    points:[
      "Met with Trump in the July 2025 mini-summit; stable democracy, engaged on trade.",
      "Early-stage.",
      "interp"
    ]
  },
  "Mauritania": {
    state:"neutral", delta:"→", region:"Sub-Saharan Africa",
    baseline:"Neutral — minimal Biden-era engagement; counterterrorism relevance on the Sahel periphery.",
    points:[
      "Part of the July 2025 five-nation meeting; counterterrorism relevance in the Sahel periphery.",
      "Early-stage.",
      "interp"
    ]
  },
  "Rwanda": {
    state:"strained", delta:"→", region:"Sub-Saharan Africa",
    baseline:"Strained — Biden admin had been increasingly critical of Rwandan support for M23 in eastern Congo.",
    points:[
      "Co-signed the Dec 2025 minerals/peace deal — but backs the M23 militia whose advance the deal is meant to stop.",
      "Partner on paper, destabilizer in practice — the net trajectory has not improved."
    ]
  },
  "South Africa": {
    state:"strained", delta:"↓↓", region:"Sub-Saharan Africa",
    baseline:"Neutral/cool — Biden-era ANC govt non-aligned and Russia-sympathetic; minimal substantive cooperation but no public rupture.",
    points:[
      "Antagonized over the disputed 'white genocide' / Afrikaner narrative; Trump granted Afrikaners refugee status and reportedly moved to raise the intake from ~7,500 to ~17,500.",
      "Trump skipped the G20 summit hosted in South Africa.",
      "The continent's most industrialized economy and a G20 member — and one of the sharpest US-Africa ruptures."
    ]
  },
  "Somalia": {
    state:"strained", delta:"↓", region:"Sub-Saharan Africa",
    baseline:"Aligned (transactional) — Biden-era US counterterrorism cooperation against al-Shabaab continued throughout.",
    points:[
      "Publicly derided by Trump; minimal constructive engagement.",
      "Counterterrorism cooperation reduced; relationship strained.",
      "interp"
    ]
  },
  "Ethiopia": {
    state:"strained", delta:"↓", region:"Sub-Saharan Africa",
    baseline:"Strained — Biden-era relationship cool over Tigray war fallout, but humanitarian aid flowing.",
    points:[
      "Aid cuts hit hard; tension over regional conflicts and Red Sea access.",
      "Strained.",
      "interp"
    ]
  },
  "Ghana": {
    state:"strained", delta:"↓", region:"Sub-Saharan Africa",
    baseline:"Aligned — Biden-era democratic partner; trade and development cooperation; AGOA beneficiary in good standing.",
    points:[
      "Foreign-aid freeze affected programs; no marquee partnership.",
      "Uncommitted/strained.",
      "interp"
    ]
  },
  "Sudan": {
    state:"strained", delta:"→", region:"Sub-Saharan Africa",
    baseline:"Strained — civil war erupted April 2023; Biden engagement humanitarian-only by end of term.",
    points:[
      "Civil war; US engagement limited and humanitarian.",
      "Strained/uncommitted.",
      "interp"
    ]
  },
  "Mali": {
    state:"adversarial", delta:"→", region:"Sub-Saharan Africa",
    baseline:"Adversarial/lost — Biden-era Mali expelled French and increasingly Western forces; Russia/Wagner moved in.",
    points:[
      "Post-coup junta aligned with Russia (Wagner/Africa Corps); expelled Western forces.",
      "Lost to the Russian orbit — trajectory unchanged under Trump."
    ]
  },
  "Burkina Faso": {
    state:"adversarial", delta:"→", region:"Sub-Saharan Africa",
    baseline:"Adversarial — Biden-era junta aligned with Russia/Mali/Niger axis; broke with the West.",
    points:[
      "Junta aligned with Russia; part of the Sahel bloc that broke with the West.",
      "Adversarial/lost — no change in substance."
    ]
  },
  "Niger": {
    state:"adversarial", delta:"→", region:"Sub-Saharan Africa",
    baseline:"Adversarial/lost — 2023 coup; Biden negotiated US drone-base withdrawal in 2024; junta turned to Russia.",
    points:[
      "Post-2023-coup junta ejected US forces and the drone base; turned to Russia.",
      "The strategic setback was inherited, not created, but unrepaired."
    ]
  },

  // ===== SOUTH ASIA =====
  "India": {
    state:"aligned", delta:"↑", region:"South Asia",
    baseline:"Aligned — Biden's iCET initiative on tech, defense ties expanding; major US-India platform built and operating.",
    points:[
      "Feb 2026: trade deal cut US tariffs from 50% to 18% after India agreed to stop buying Russian oil.",
      "Invited into 'Pax Silica,' the US-led AI and critical-minerals supply-chain initiative.",
      "Damage-then-repair: the 2025 tariff crisis caused real distrust that China and Russia exploited; India ended up more aligned but trust was burned.",
      "Strategic value: demographic giant, key China counterweight — but India guards its strategic autonomy and BRICS membership."
    ]
  },
  "Pakistan": {
    state:"aligned", delta:"↑", region:"South Asia",
    baseline:"Strained/transactional — Biden's relationship was distant, focused narrowly on Afghanistan exit and counterterrorism; no marquee cooperation.",
    points:[
      "2026 State Dept testimony: US and Pakistan cooperating to develop Pakistan's critical-mineral resources, with US seed financing plus private-sector investment.",
      "Expanding energy and agriculture trade; ongoing counterterrorism cooperation.",
      "A notable warming — some analysts framed it as 'Pakistan conquered the US while India lost Trump' during the 2025 India friction.",
      "Emerging and transactional; historically volatile."
    ]
  },
  "Bangladesh": {
    state:"neutral", delta:"→", region:"South Asia",
    baseline:"Strained/in flux — Hasina ousted Aug 2024 under Biden; interim Yunus govt engagement cautious; political flux pending elections.",
    points:[
      "Post-transition political flux ahead of elections; the US was historically wary of the interim order.",
      "Uncommitted — relationship in flux.",
      "interp"
    ]
  },
  "Sri Lanka": {
    state:"neutral", delta:"→", region:"South Asia",
    baseline:"Neutral/cool — leftist Dissanayake elected Sept 2024 under Biden; engagement cautious; China retains influence.",
    points:[
      "A leftist government in Colombo; the US has been cautious.",
      "China retains influence; trajectory unchanged.",
      "interp"
    ]
  },
  "Nepal": {
    state:"neutral", delta:"→", region:"South Asia",
    baseline:"Neutral — Biden engagement modest; Nepal balancing India and China; low US priority.",
    points:[
      "Caught between India and China; minimal US priority under Trump as well.",
      "Uncommitted.",
      "interp"
    ]
  },
  "Afghanistan": {
    state:"adversarial", delta:"→", region:"South Asia",
    baseline:"Adversarial — Taliban-controlled since 2021 withdrawal; no Biden-era normalization; no normal relations.",
    points:[
      "Taliban-governed; no normal relations.",
      "Adversarial — unchanged."
    ]
  },

  // ===== EAST ASIA =====
  "China": {
    state:"adversarial", delta:"→", region:"East Asia",
    baseline:"Adversarial — Biden-era 'manage competition' framework; trade and tech restrictions deepening; Taiwan deterrence the central concern.",
    points:[
      "May 2026 Beijing summit produced mainly a preserved trade truce — assessed as underwhelming, with no chip-export breakthrough.",
      "Xi declined to broker an Iran exit for Trump; Taiwan exchange left deterrence ambiguous.",
      "A managed rivalry — stabilized, not 'won.' The load-bearing relationship for the whole thesis.",
      "Argument for ↓: stabilization without leverage gain is arguably a relative loss as China's position consolidates."
    ]
  },
  "Taiwan": {
    state:"aligned", delta:"→", region:"East Asia",
    baseline:"Aligned and rising — Biden expanded arms sales and made public commitments to defend Taiwan; deterrence the central question.",
    points:[
      "A record ~$11.1B US arms package continued to flow.",
      "At the May 2026 Beijing summit Trump said he made 'no commitment either way' on stopping arms sales; Xi warned of possible 'conflicts' if Taiwan is mishandled.",
      "The 2027 window will test whether arms-plus-ambiguity deters Beijing.",
      "Not a 'relationship' question so much as a deterrence bet — not a clean state/delta call."
    ]
  },
  "Japan": {
    state:"core-ally", delta:"↓", region:"East Asia",
    baseline:"Core ally — Biden-Kishida summit deepened defense integration; Japan increased defense spending; trust trajectory positive.",
    points:[
      "Treaty alliance formally intact under PM Takaichi, but Tokyo is unlocking dormant arms-export capacity out of concern about US preoccupation with Middle East wars.",
      "Charitable reading: burden-shifting working as designed. Skeptical reading: an anchor ally hedging because it no longer fully trusts US focus.",
      "Trajectory is toward self-reliance, not deeper integration — a quiet drift even within an intact alliance."
    ]
  },
  "South Korea": {
    state:"core-ally", delta:"↓", region:"East Asia",
    baseline:"Core ally — Biden-era ROK alliance strong; nuclear consultation deepened under Yoon via the Washington Declaration (2023).",
    points:[
      "Pursuing 'strategic autonomy' and an independent military buildup amid doubts about US reliability.",
      "Treaty alliance intact; trust trajectory negative — same hedging pattern as Japan."
    ]
  },
  "Mongolia": {
    state:"neutral", delta:"↑", region:"East Asia",
    baseline:"Neutral — Biden-era 'third neighbor' diplomacy ongoing but limited; landlocked geography caps strategic relevance.",
    points:[
      "US interest in Mongolia's critical minerals as a 'third neighbor' alternative to Russia and China.",
      "Landlocked geography limits how far this can go.",
      "interp"
    ]
  },
  "North Korea": {
    state:"adversarial", delta:"→", region:"East Asia",
    baseline:"Adversarial — Biden engagement minimal; nuclear program advanced steadily; no breakthrough or contact of substance.",
    points:[
      "No breakthrough; nuclear program advancing.",
      "Episodic Trump outreach has not changed the fundamentals.",
      "interp"
    ]
  },

  // ===== SOUTHEAST ASIA =====
  "Philippines": {
    state:"core-ally", delta:"→", region:"Southeast Asia",
    baseline:"Core ally and rising — Marcos's 2023-24 pivot to the US under Biden expanded EDCA base access and South China Sea cooperation; relationship already deepening.",
    points:[
      "Treaty alliance remains strong with deepening defense cooperation.",
      "EDCA base access expanded; investment around Subic Bay.",
      "A genuine frontline state vs. China in the South China Sea — both maintained and strategically rising in value."
    ]
  },
  "Vietnam": {
    state:"aligned", delta:"↑", region:"Southeast Asia",
    baseline:"Aligned — Biden upgraded to Comprehensive Strategic Partnership in Sept 2023; manufacturing and defense ties expanding.",
    points:[
      "Markedly closer partnership through 2025-26; a manufacturing and demographic winner hedging hard against China.",
      "Trade friction was managed without rupture; defense and supply-chain ties deepened.",
      "Builds on the Biden-era CSP upgrade rather than starting from scratch."
    ]
  },
  "Indonesia": {
    state:"aligned", delta:"↑", region:"Southeast Asia",
    baseline:"Aligned — Biden upgraded to Comprehensive Strategic Partnership in Nov 2023; defense ties already expanding.",
    points:[
      "Defense ties deepened; a ~280M-person giant central to Indo-Pacific balancing.",
      "Trade managed without rupture.",
      "Indonesia traditionally guards non-alignment.",
      "interp"
    ]
  },
  "Singapore": {
    state:"core-ally", delta:"→", region:"Southeast Asia",
    baseline:"Core ally — long-standing defense and economic partner under Biden; hosts rotational US naval assets; institutionally close.",
    points:[
      "Member of Pax Silica, the US-led AI and supply-chain security bloc.",
      "Long-standing defense and economic partner; hosts rotational US naval assets.",
      "Maintained strong partner."
    ]
  },
  "Cambodia": {
    state:"neutral", delta:"↑", region:"Southeast Asia",
    baseline:"Strained — Biden admin had sanctioned officials over democratic backsliding; Cambodia drifting toward Beijing on Ream naval base.",
    points:[
      "US improved relations despite Cambodia's prior drift toward Beijing; critical-minerals agreement signed.",
      "A notable pull-back from China's orbit — emerging and reversible."
    ]
  },
  "Thailand": {
    state:"aligned", delta:"↑", region:"Southeast Asia",
    baseline:"Aligned but cool — treaty ally but the relationship had been distant under Biden with the post-2014-coup overhang and democratic concerns.",
    points:[
      "Treaty ally; signed a critical-minerals agreement with the US.",
      "Relationship was long-standing but cooler — modest warming under Trump.",
      "interp"
    ]
  },
  "Malaysia": {
    state:"neutral", delta:"↑", region:"Southeast Asia",
    baseline:"Neutral — careful US-China balancer under Biden; engagement transactional.",
    points:[
      "Critical-minerals (rare-earth processing) cooperation with the US.",
      "Malaysia balances carefully between the US and China.",
      "interp"
    ]
  },
  "Myanmar": {
    state:"adversarial", delta:"→", region:"Southeast Asia",
    baseline:"Adversarial — Biden-era junta sanctioned; civil war ongoing; no normal relations.",
    points:[
      "Military junta; civil war; sanctioned.",
      "Adversarial — unchanged."
    ]
  },

  // ===== OCEANIA =====
  "Australia": {
    state:"core-ally", delta:"→", region:"Oceania",
    baseline:"Core ally — AUKUS pact established under Biden; Five Eyes; trade and defense ties institutionally deep.",
    points:[
      "AUKUS submarine pact remains intact; secured relatively favorable trade and defense outcomes in 2025.",
      "Core Five Eyes and Indo-Pacific ally.",
      "Strain: navigating Trump's transactional style and US 'strategic straddle' pressure; broadly maintained."
    ]
  },
  "Papua New Guinea": {
    state:"aligned", delta:"↑", region:"Oceania",
    baseline:"Aligned — defense cooperation agreement signed under Biden (2023); the Pacific contest framing predates Trump.",
    points:[
      "Defense cooperation agreement gives the US expanded access — a counter to Chinese inroads in the Pacific.",
      "Maintained/strengthening partner in a contested region."
    ]
  },
  "New Zealand": {
    state:"aligned", delta:"↓", region:"Oceania",
    baseline:"Aligned — Five Eyes member under Biden; intelligence cooperation routine; independent foreign-policy streak managed within the alliance.",
    points:[
      "Five Eyes member but more independent-minded; tariff and alignment friction.",
      "Strained in tone — counted with the cooling democratic core.",
      "interp"
    ]
  },
  "Fiji": {
    state:"neutral", delta:"→", region:"Oceania",
    baseline:"Neutral — Biden-era Pacific contest ongoing; Fiji balancing US and China.",
    points:[
      "Pacific state courted by both the US and China.",
      "Uncommitted/contested.",
      "interp"
    ]
  },

  // ===== UNITED STATES =====
  "United States of America": {
    state:"us", delta:"—", region:"—",
    baseline:"—",
    points:["The United States."]
  }
};

/* Note marker preserved from v1 for the Venezuela placement caveat.
   Filtered out of the main map by app.js; not a country entry. */
window.PRESIDENTS["trump"].dossier["Venezuela_note"] = {
  state:"neutral", delta:"→", region:"South America",
  baseline:"—",
  points:["(See Venezuela entry — placed in aligned/major gain at user direction; stricter analytic view is adversarial/major gain.)"]
};

/* =====================================================================
   REGIONS — per-region narrative layer
   ===================================================================== */
window.PRESIDENTS["trump"].regions = {
  "South America": {
    tilt:"Tilting US",
    dynamics:"The sharpest swing on the board. A wave of right-populist election wins (Milei in Argentina, Kast incoming in Chile, Paz ending two decades of socialism in Bolivia) has aligned with a forceful US reassertion of the Monroe Doctrine. The leftist holdouts — Brazil, Colombia — are now the exceptions rather than the trend.",
    projects:["Shield of the Americas — 18-nation counter-cartel military coalition","$20B Argentina currency-swap rescue","Maduro capture and the Venezuela transition"],
    goal:"Re-establish an uncontested US sphere: push China out of resource and infrastructure deals, secure lithium and oil, and lock in a bloc of aligned governments.",
    stakes:"Upside: a contiguous aligned hemisphere with privileged access to the lithium triangle and Venezuelan/Guyanese oil — a genuine strategic asset for the energy transition. Downside: the bloc is leader-dependent and organized around a negative agenda (anti-cartel, anti-China); a few election losses could unwind much of it, and the heavyweight, Brazil, remains non-aligned."
  },
  "Central America": {
    tilt:"Tilting US",
    dynamics:"Engagement here runs almost entirely through migration enforcement and counter-narcotics. Bukele's El Salvador is the model the US is promoting; most states are cooperating on deportation flows and cartel pressure in exchange for trade and security ties.",
    projects:["El Salvador critical-minerals trade agreement","Shield of the Americas membership (Honduras, others)","Migration-cooperation arrangements"],
    goal:"Convert the isthmus into a migration buffer and a secure logistics corridor; reward aligned strongmen, isolate Nicaragua.",
    stakes:"Upside: a stable near-abroad and a working migration architecture. Downside: heavy reliance on personalist leaders, and pressure tactics that can curdle into resentment or instability (Haiti is the cautionary case)."
  },
  "Caribbean": {
    tilt:"Mixed",
    dynamics:"A patchwork. Several states cooperate on security and migration; Cuba is under a full pressure campaign; Haiti is in state collapse. The region's salience has risen because of the Venezuela operation and the Cuba secondary-sanctions push.",
    projects:["EO 14404 secondary sanctions on Cuba","Shield of the Americas (Dominican Republic, Trinidad & Tobago)","Caribbean drug-interdiction buildup"],
    goal:"Close the Cuba foothold, deny China and Russia naval access, and control trafficking routes.",
    stakes:"Upside: a sealed maritime approach to the US mainland. Downside: a Cuban humanitarian collapse drives a migration crisis straight back at the US, and secondary sanctions antagonize Canada and others."
  },
  "North America": {
    tilt:"Strained",
    dynamics:"Both neighbors are treated as adversaries on trade. Tariff threats, fentanyl and migration pressure, and '51st state' rhetoric toward Canada have produced the worst US-Canada and US-Mexico tone in decades — even as deep economic integration continues underneath.",
    projects:["Tariff leverage on both partners","Cross-border cartel and fentanyl enforcement"],
    goal:"Extract migration and security concessions; rebalance trade terms.",
    stakes:"Upside: tighter border and supply-chain concessions. Downside: alienating the two countries most economically fused with the US is strategically costly and pushes both to diversify away from Washington."
  },
  "Europe": {
    tilt:"Strained",
    dynamics:"The weakest region for the US under Trump, and the one that resists charitable reframing. The institutional core (France, Germany, UK, Nordics) is cooling and building 'strategic autonomy'; the Greenland pressure on Denmark was a genuine rupture. The one growth area is the populist right — Hungary, and tilts in Italy, Slovakia, Czechia — but that bloc forms against the EU mainstream, not as a US-Europe partnership.",
    projects:["Greenland acquisition pressure","Burden-shifting: Europe pays for US weapons to Ukraine","Bilateral ties with populist-right governments"],
    goal:"Force European defense self-reliance, reduce US security subsidy, and deal bilaterally rather than through the EU.",
    stakes:"Upside: a Europe that finally carries its own defense burden. Downside: the world's largest bloc of wealthy democracies hedging against US reliability — contingency-planning for a paralyzed NATO is the opposite of 'setting up' the alliance for a competitive era."
  },
  "Eurasia": {
    tilt:"In play",
    dynamics:"The highest-variance region. Trump is actively courting Russia for a reset while aid to Ukraine has dried up; simultaneously the US has made real openings in Central Asia and the Caucasus (Kazakhstan into the Abraham Accords, an Armenia-Azerbaijan peace framework) that quietly chip at Russia's periphery.",
    projects:["US-Russia bilateral reset track","Armenia-Azerbaijan peace framework","Central Asia C5 critical-minerals engagement"],
    goal:"End the Ukraine war on terms Trump can claim, normalize with Moscow, and pull Caspian/Central Asian states into a minerals-and-security orbit.",
    stakes:"Upside: a Russia reset plus Central Asian minerals access would be a signature realignment. Downside: a deal that rewards aggression damages US credibility globally, and analysts widely read Putin's diplomacy as performative — stringing Trump along while gaining ground."
  },
  "Middle East": {
    tilt:"Mixed — strong ties under a war cloud",
    dynamics:"Deep economic enmeshment with the Gulf (a ~$2T investment pledge, AI partnerships) and a persisting, expanding Abraham Accords framework — all sitting on top of an active war with Iran that is damaging the very Gulf economies the US is bound to.",
    projects:["Abraham Accords expansion (Kazakhstan added)","~$2 trillion Gulf investment pledge","Iran strikes and ongoing confrontation","Syria sanctions relief for the post-Assad government"],
    goal:"Lock in an anti-Iran coalition, bind the Gulf economically to the US, and complete Saudi-Israel normalization.",
    stakes:"Upside: a durable US-anchored regional order with Iran contained and normalization complete. Downside: the Iran war is a live drag — Hormuz disruption, ~5-10% Gulf GDP hits, stalled Saudi normalization — and a bad off-ramp would undercut the whole regional gain."
  },
  "North Africa": {
    tilt:"Mixed / low-engagement",
    dynamics:"A thin region for the US. Morocco is a solid Accords partner; Egypt is a maintained major ally; the rest (Algeria, Tunisia, Libya) are strained, divided, or Russia-leaning, with aid cuts reducing US presence.",
    projects:["Morocco partnership / Western Sahara recognition","Egypt security relationship"],
    goal:"Hold key partners, manage migration into Europe, limit Russian and Islamist footholds.",
    stakes:"Upside: stable anchor states. Downside: low engagement cedes ground — Russia and China fill the vacuum in the contested states."
  },
  "Sub-Saharan Africa": {
    tilt:"In play — narrow and transactional",
    dynamics:"The 21st-century demographic story, engaged through a deliberately narrow lens. The US dissolved its Bureau of African Affairs and closed embassies, shifting to 'trade not aid' — targeted minerals-and-security deals (DRC, the Lobito corridor states, Guinea) rather than broad partnership. The Sahel (Mali, Burkina Faso, Niger) has been lost outright to Russia.",
    projects:["DRC minerals-for-security deal","Lobito Corridor — minerals rail bypassing Chinese supply chains","Guinea 'Liberty Corridor'","Nigeria counterterrorism working group"],
    goal:"Secure critical minerals (cobalt, coltan, copper), break Chinese refining dominance, and run counterterrorism — without large development commitments.",
    stakes:"Upside: a non-Chinese critical-mineral supply chain and security footholds in West/Central Africa. Downside: a shrunken diplomatic presence and extractive framing cede the demographic future to China's patient, broad-based strategy; one-year AGOA uncertainty discourages the long-term investment that would actually tie the continent to the US."
  },
  "South Asia": {
    tilt:"Mixed",
    dynamics:"India is the prize and the cautionary tale at once — a brutal 2025 tariff crisis, then a 2026 trade deal that left India more aligned (off Russian oil, into Pax Silica) but with trust burned. Pakistan warmed via a minerals partnership. The smaller states drift or sit uncommitted.",
    projects:["US-India trade deal + Pax Silica membership","Pakistan critical-minerals partnership"],
    goal:"Build India into the central counterweight to China; keep smaller states from tipping fully into Beijing's orbit.",
    stakes:"Upside: a deep US-India axis is one of the most valuable possible alignments of the century. Downside: India guards its strategic autonomy and BRICS ties — the damage-then-repair cycle showed how fast trust can be spent, and competitors exploited the gap."
  },
  "East Asia": {
    tilt:"Mixed — the decisive theater",
    dynamics:"The region that decides the thesis. China is a managed rivalry — stabilized at the May 2026 Beijing summit, not won. Treaty allies Japan and South Korea are formally intact but hedging toward self-reliance. Taiwan is the highest-stakes unresolved case.",
    projects:["May 2026 Beijing summit — preserved trade truce","Record ~$11.1B Taiwan arms package","Pax Silica tech-and-minerals bloc"],
    goal:"Manage the China rivalry without war, deter a move on Taiwan, and keep allies aligned while pushing them to spend more.",
    stakes:"Upside: successful deterrence plus rearmed, capable allies. Downside: allied hedging means the new order organizes partly around US unreliability; the 2027 Taiwan window is an untested bet on whether arms-plus-ambiguity holds."
  },
  "Southeast Asia": {
    tilt:"Tilting US",
    dynamics:"A quiet success story. The frontline maritime states — Philippines, Vietnam, Indonesia — are moving toward the US as a China hedge, and critical-minerals deals (Cambodia, Malaysia, Thailand) have pulled even China-leaning states partly back. The US is gaining the swing states that matter most for China competition.",
    projects:["Philippines EDCA base expansion","Vietnam/Indonesia defense deepening","Critical-minerals agreements (Cambodia, Malaysia, Thailand)","Pax Silica (Singapore)"],
    goal:"Build a maritime coalition along China's southern flank and secure rare-earth processing outside China.",
    stakes:"Upside: an aligned arc of fast-growing, young, strategically placed economies — close to the ideal 'future winners' bet. Downside: ASEAN states hedge by instinct and will not choose sides cleanly; gains are real but reversible."
  },
  "Oceania": {
    tilt:"Mostly aligned",
    dynamics:"AUKUS holds and Australia remains a core ally; Papua New Guinea's defense pact is a real counter to Chinese Pacific inroads. New Zealand is more independent-minded; the island states are an active US-China contest.",
    projects:["AUKUS submarine pact","Papua New Guinea defense cooperation agreement","Pacific Islands engagement vs. China"],
    goal:"Hold the second island chain, deny China basing access in the Pacific.",
    stakes:"Upside: a secured Pacific approach. Downside: small island states are genuinely up for grabs, and Trump's transactional style strains even reliable allies like Australia."
  }
};

/* =====================================================================
   OUTCOMES — best / base / downside projection lines
   ===================================================================== */
window.PRESIDENTS["trump"].outcomes = {
  "Argentina":{best:"Milei's model outlasts him; Argentina becomes a stable, durably US-aligned lithium-and-energy partner and proof that the bet works.",base:"A reliable partner while Milei governs; trade ties deepen but institutionalization stays incomplete.",down:"A Peronist win in 2027 reverses alignment; the $20B becomes a politically toxic debt with little lasting US gain."},
  "El Salvador":{best:"Trade and minerals ties institutionalize; El Salvador becomes a durable Central American anchor beyond Bukele.",base:"A close, cooperative partner as long as Bukele holds power.",down:"Personalist rule and democratic erosion make the relationship hostage to one man's fortunes."},
  "Panama":{best:"Permanent canal-security cooperation and a China-free logistics hub — geography keeps this durable.",base:"Reliable canal access; lingering resentment managed.",down:"Sovereignty backlash brings an anti-US government; cooperation narrows to the minimum."},
  "Ecuador":{best:"Joint operations and base access turn Ecuador into a permanent Pacific security partner.",base:"Security cooperation continues while Noboa governs.",down:"Volatile politics return a hostile government; the opening closes."},
  "Venezuela":{best:"A stable, US-aligned government takes hold; the largest oil reserves on earth re-enter the US orbit — a generational strategic win.",base:"A messy but functional transition; partial US influence over the energy sector.",down:"State collapse, insurgency, or a failed transition turns it into an open-ended commitment — an Iraq-2003 analogy."},
  "Hungary":{best:"A durable US foothold inside the EU; a model for other populist-right governments.",base:"An aligned irritant within the EU while Orbán governs.",down:"Orbán falls or the EU isolates Budapest; the foothold evaporates."},
  "Israel":{best:"Anchors a normalized, US-led regional order with Iran contained.",base:"Remains the core regional ally; relationship deep and stable.",down:"Regional war or normalization collapse strains even this relationship."},
  "United Arab Emirates":{best:"Deep AI/tech and capital integration makes the UAE a permanent strategic-economic partner.",base:"A strong, transactional Gulf partnership.",down:"Prolonged Iran war and GDP damage sour the economic bet."},
  "Saudi Arabia":{best:"Saudi-Israel normalization completes; Riyadh becomes the linchpin of a US-anchored region.",base:"A strong but transactional partner; normalization stays stalled.",down:"War damage and a frozen Palestinian track push Riyadh to hedge toward China."},
  "Qatar":{best:"Continues as a reliable basing host and indispensable mediator.",base:"Stable maintained partner.",down:"Regional escalation complicates its balancing act."},
  "Bahrain":{best:"Fifth Fleet host indefinitely; quietly reliable.",base:"Stable small partner.",down:"Domestic or regional instability raises its risk profile."},
  "Philippines":{best:"Becomes the firm southern anchor of the Indo-Pacific coalition; bases and deterrence locked in.",base:"A strong treaty ally with steady cooperation.",down:"A future administration swings back toward Beijing, as has happened before."},
  "Australia":{best:"AUKUS delivers; Australia is the secure southern pillar of China deterrence.",base:"Core ally, managing Trump's style.",down:"Transactional friction and AUKUS delays erode confidence."},
  "Poland":{best:"Becomes the central US military hub in Europe — a model frontline ally.",base:"A reliably pro-US, high-spending partner.",down:"Abandonment fears if US security guarantees look unreliable."},
  "Singapore":{best:"A permanent tech-and-logistics node in the US Indo-Pacific architecture.",base:"Stable partner that still hedges.",down:"China pressure narrows its room to align."},
  "Egypt":{best:"Stays a stable security anchor and Gaza mediator.",base:"Maintained transactional ally.",down:"Aid friction or regional war strains the relationship."},
  "Jordan":{best:"Remains a quietly indispensable security and intelligence partner.",base:"Maintained ally under regional pressure.",down:"Refugee and war pressures destabilize it."},
  "Morocco":{best:"Deepens into a leading African security and economic partner.",base:"Stable Accords partner.",down:"Western Sahara or regional tension complicates ties."},
  "Kuwait":{best:"Continues as a reliable Gulf basing partner.",base:"Stable maintained ally.",down:"Regional escalation raises exposure."},
  "Papua New Guinea":{best:"A durable Pacific security partner that blocks Chinese basing.",base:"Cooperation continues with capacity limits.",down:"Chinese inducements outbid a thin US presence."},
  "Vietnam":{best:"Becomes a manufacturing-and-security partner second only to the Philippines in the region — a textbook 'future winner' captured.",base:"A steadily closer partner that still formally hedges.",down:"China pressure or a leadership shift caps the alignment."},
  "India":{best:"A deep US-India axis on tech, defense and supply chains — the decisive counterweight to China.",base:"A closer but autonomy-guarding partner; cooperation real but bounded.",down:"Another trust rupture sends India back toward strategic distance and BRICS."},
  "Pakistan":{best:"Minerals and counterterrorism ties mature into a stable partnership.",base:"A transactional, issue-by-issue relationship.",down:"Historic volatility and the India dynamic snap it back to estrangement."},
  "Kazakhstan":{best:"Anchors a Caspian bloc tilting toward the US on minerals and diplomacy — a real dent in Russia's periphery.",base:"A modest but genuine diplomatic opening.",down:"Russian and Chinese proximity reabsorb it."},
  "Dem. Rep. Congo":{best:"The minerals deal holds, the peace stabilizes, and a non-Chinese cobalt supply chain takes root.",base:"Partial minerals access amid continued instability.",down:"The peace collapses, M23 advances, and the deal is voided — minerals without stability."},
  "Nigeria":{best:"The counterterrorism partnership matures and Nigeria becomes West Africa's US security anchor.",base:"Working-level cooperation continues, with underlying resentment.",down:"The 'genocide' framing and coercion produce a backlash government that ejects the US."},
  "Angola":{best:"The Lobito Corridor delivers; Angola becomes a key logistics-and-minerals partner.",base:"The rail project advances slowly with partial benefit.",down:"Financing or governance failures stall the corridor."},
  "Zambia":{best:"Copper-belt integration into a US-aligned supply chain.",base:"Incremental progress on the corridor.",down:"The corridor underdelivers; China retains the copper trade."},
  "Guinea":{best:"The Liberty Corridor opens a major non-Chinese minerals route.",base:"Slow, partial development.",down:"Instability or junta politics derail it."},
  "Côte d'Ivoire":{best:"Becomes a stable West African economic partner.",base:"Modest minerals and trade engagement.",down:"Engagement fades to nominal."},
  "Kenya":{best:"Matures into an East African security-and-tech hub for the US.",base:"Steady maintained partner.",down:"Aid cuts and competing offers cool the relationship."},
  "Liberia":{best:"Historic ties convert into a modern trade partnership.",base:"Low-level transactional engagement.",down:"Neglect lets the relationship lapse."},
  "Senegal":{best:"A stable democratic partner and West African anchor.",base:"Early-stage trade engagement.",down:"Engagement stays nominal."},
  "Mauritania":{best:"A useful Sahel-periphery counterterrorism partner.",base:"Limited security cooperation.",down:"Sahel instability spills over."},
  "Indonesia":{best:"The ~280M-person giant tilts durably toward the US security orbit.",base:"Closer defense ties; non-alignment preserved.",down:"Indonesia reverts to strict equidistance."},
  "Cambodia":{best:"A genuine, lasting pull-back from China's orbit.",base:"Improved ties that remain reversible.",down:"China reabsorbs it — the most likely path given the base relationship."},
  "Thailand":{best:"The treaty alliance is revitalized via minerals cooperation.",base:"Warmer but still-hedging ally.",down:"Domestic politics and China ties keep it cool."},
  "Malaysia":{best:"A key rare-earth processing partner outside China.",base:"Careful, balanced cooperation.",down:"Stays equidistant; gains stay marginal."},
  "Mongolia":{best:"A 'third neighbor' minerals partner with symbolic and real value.",base:"Limited, geography-capped cooperation.",down:"Russia and China squeeze the opening shut."},
  "Armenia":{best:"A durable tilt away from Russia toward the West.",base:"A fragile but real reorientation.",down:"Security pressure forces it back toward Moscow."},
  "Azerbaijan":{best:"An energy partner and stabilized Caucasus anchor.",base:"Transactional engagement alongside Turkey/Russia ties.",down:"Reverts to balancing with little US gain."},
  "Uzbekistan":{best:"Anchors C5 minerals cooperation.",base:"Modest engagement.",down:"Stays in the Russia/China orbit."},
  "Turkmenistan":{best:"Marginal energy engagement opens slightly.",base:"Nominal contact.",down:"Remains isolated and irrelevant to US strategy."},
  "Kyrgyzstan":{best:"Minor C5 cooperation gains.",base:"Nominal engagement.",down:"Russia-dominated; no real opening."},
  "Tajikistan":{best:"A useful Afghan-border security partner.",base:"Limited security contact.",down:"Stays in Russia's security orbit."},
  "Oman":{best:"Continues as an indispensable quiet mediator.",base:"Stable balancing partner.",down:"Regional war narrows its mediating space."},
  "Turkey":{best:"Transactional cooperation stabilizes into a workable partnership.",base:"Issue-by-issue deals amid recurring friction.",down:"Friction on Syria and defense pushes it further toward independent and Russia-tilted positions."},
  "Italy":{best:"Meloni becomes the effective US-Europe bridge, softening transatlantic friction.",base:"A sympathetic but EU-bound partner.",down:"EU pressure or a government change ends the tilt."},
  "Czechia":{best:"Joins a stable populist-right pro-US cluster.",base:"A modest ideological tilt.",down:"The tilt reverses at the next election."},
  "Slovakia":{best:"A reliable Trump-aligned voice in Central Europe.",base:"Ideological alignment without deep partnership.",down:"Reverts with a government change."},
  "Guatemala":{best:"Migration cooperation broadens into genuine partnership.",base:"Transactional migration-driven ties.",down:"Migration leverage breeds resentment."},
  "Honduras":{best:"A stable security partner in the coalition.",base:"Cooperation that tracks domestic politics.",down:"A leftward swing exits the coalition."},
  "Costa Rica":{best:"A stable democratic security partner.",base:"Steady low-key cooperation.",down:"Engagement stays minimal."},
  "Dominican Republic":{best:"A firm Caribbean security anchor.",base:"Stable cooperation.",down:"Migration/economic strain complicates ties."},
  "Trinidad and Tobago":{best:"An energy-and-security partner near Venezuela.",base:"Steady cooperation.",down:"Venezuela spillover destabilizes it."},
  "Jamaica":{best:"A reliable counter-narcotics partner.",base:"Steady cooperation.",down:"Engagement stays thin."},
  "Belize":{best:"Minor but reliable security cooperation.",base:"Nominal engagement.",down:"Negligible strategic role."},
  "Paraguay":{best:"A stable conservative partner and coalition member.",base:"Steady alignment.",down:"A political shift weakens ties."},
  "Bolivia":{best:"The post-MAS government opens the largest lithium reserves in the triangle to the West — a major future-winner capture.",base:"A cautious tilt; resource nationalism limits the upside.",down:"MAS returns or nationalism slams the door."},
  "Guyana":{best:"The oil-boom state becomes a wealthy, firmly US-aligned partner — the purest 'small now, strategic soon' win.",base:"Close ties driven by oil and the Venezuela threat.",down:"The Essequibo dispute escalates into open conflict."},
  "Chile":{best:"Kast aligns a major copper/lithium producer with the US bloc.",base:"A modest tilt; Chile's institutions moderate it.",down:"The alignment proves shallow or short-lived."},
  "Peru":{best:"A stable Andean security-and-minerals partner.",base:"Cooperation amid chronic instability.",down:"Political chaos makes any alignment unreliable."},
  "Cuba":{best:"Pressure forces a transition to a non-hostile government — the Caribbean foothold closes for good.",base:"A weakened regime hangs on; sanctions bite without toppling it.",down:"Humanitarian collapse triggers a mass-migration crisis that lands on the US."},
  "Russia":{best:"A Ukraine settlement Trump can credibly claim, plus a managed reset that splits Russia from China.",base:"A frozen conflict and partial, fragile normalization.",down:"Putin pockets concessions, gains on the battlefield, and US global credibility takes a major hit."},
  "Belarus":{best:"Marginal opening via prisoner diplomacy.",base:"Nominal contact.",down:"Remains a Russian satellite."},
  "Syria":{best:"The post-Assad government stabilizes as a non-hostile, sanctions-relieved state — a strategic gain from a former adversary.",base:"A fragile transition with partial US influence.",down:"The new order collapses into renewed civil conflict."},
  "Serbia":{best:"Tilts modestly toward the US/EU on the strength of business ties.",base:"Continues balancing all sides.",down:"Drifts further toward Russia and China."},
  "Rwanda":{best:"Honors the deal, reins in M23, and the regional peace holds.",base:"Nominal compliance while M23 support quietly continues.",down:"Backing for M23 collapses the peace and the minerals deal with it."},
  "Taiwan":{best:"Arms-plus-ambiguity successfully deters Beijing through the 2027 window; the status quo holds.",base:"Sustained tension without conflict; deterrence untested but intact.",down:"Deterrence fails — a blockade or strike on Taiwan, the defining crisis of the era."},
  "Brazil":{best:"The tariff thaw matures into pragmatic coexistence.",base:"A transactional relationship; Brazil stays firmly non-aligned.",down:"Renewed clashes push Brazil deeper into BRICS and China's economic orbit."},
  "Mexico":{best:"Pressure yields durable migration and security cooperation.",base:"Tense but functional management of shared problems.",down:"A tariff war and nationalist backlash rupture North American integration."},
  "Canada":{best:"Trade tensions resolve; the alliance steadies.",base:"A cooler, more transactional but intact relationship.",down:"Sustained hostility pushes Canada to actively diversify away from the US."},
  "Colombia":{best:"Post-Petro politics restore the old close security partnership.",base:"Strained coexistence on counter-narcotics.",down:"A lasting rupture with the historic regional security partner."},
  "Uruguay":{best:"Quiet, stable low-level ties.",base:"Minimal engagement.",down:"Drifts toward regional/China economic blocs."},
  "United Kingdom":{best:"Navigates Trump and stays the closest European partner.",base:"A cooler but intact special relationship.",down:"Tariff and security friction erodes the core alliance."},
  "France":{best:"Strategic-autonomy friction stays rhetorical; cooperation holds.",base:"A functional but distrustful relationship.",down:"France leads a real European decoupling from US strategic dependence."},
  "Germany":{best:"Trade and defense friction resolves; Germany rearms within the alliance.",base:"A strained but intact partnership.",down:"A core ally hedges hard and the transatlantic link frays."},
  "Denmark":{best:"The Greenland crisis is defused and ties normalize.",base:"Lasting damage but a functional relationship.",down:"The episode permanently poisons US-Nordic and US-EU trust."},
  "Greenland":{best:"Pressure eases; an autonomy-respecting partnership emerges.",base:"Wary coexistence.",down:"Coercion radicalizes Greenlandic and Danish opinion against the US."},
  "Ukraine":{best:"A settlement preserves a sovereign, rebuildable Ukraine.",base:"A frozen conflict on disadvantageous terms.",down:"Abandonment leads to partition or collapse — a signal to allies worldwide."},
  "Georgia":{best:"A democratic course-correction reopens Western ties.",base:"Continued drift toward Moscow.",down:"Full absorption into Russia's orbit."},
  "Japan":{best:"Burden-shifting succeeds: a rearmed, capable Japan deepens the alliance.",base:"A formally intact alliance with quiet hedging.",down:"Eroded trust pushes Japan toward genuine strategic independence."},
  "South Korea":{best:"A stronger, more capable ally that still anchors to the US.",base:"An intact alliance amid autonomy-seeking.",down:"Doubt about US reliability drives independent — even nuclear — hedging."},
  "South Africa":{best:"Tensions cool; the continent's biggest economy re-engages.",base:"A strained, distant relationship.",down:"A lasting rupture pushes South Africa further into BRICS."},
  "Somalia":{best:"Counterterrorism cooperation finds a footing.",base:"Minimal crisis-driven engagement.",down:"State collapse and extremist gains continue."},
  "Ethiopia":{best:"Relations stabilize around regional security.",base:"Cool, low-engagement ties.",down:"Conflict and Red Sea tension push it toward rivals."},
  "Ghana":{best:"A stable democratic partner re-engages on trade.",base:"Low-engagement ties.",down:"Aid cuts cede ground to China."},
  "Sudan":{best:"Civil war ends and limited engagement resumes.",base:"Humanitarian-only contact.",down:"State fragmentation and rival-power influence deepen."},
  "Iraq":{best:"Balances the US and Iran without rupture.",base:"A difficult, contested relationship persists.",down:"Iranian influence and militia pressure force the US out."},
  "Lebanon":{best:"Reform and stabilization allow renewed engagement.",base:"Fragile, limited contact.",down:"Collapse or renewed war ends US engagement."},
  "Algeria":{best:"A modest opening from its Russia-aligned posture.",base:"Cool, distant relations.",down:"Deeper alignment with Russia."},
  "Tunisia":{best:"Democratic recovery reopens partnership.",base:"Low-engagement ties.",down:"Authoritarian consolidation and rival influence."},
  "Libya":{best:"Unification enables a coherent US relationship.",base:"Engagement with rival factions.",down:"Permanent division and proxy competition."},
  "Bangladesh":{best:"Post-transition politics produce a stable, US-friendly government.",base:"A relationship in flux pending elections.",down:"Instability or a China tilt."},
  "Sri Lanka":{best:"Pragmatic engagement despite the leftist government.",base:"Cautious, limited ties.",down:"Deeper dependence on China."},
  "Nepal":{best:"Modest engagement gains.",base:"Caught between India and China.",down:"Falls into Beijing's orbit."},
  "New Zealand":{best:"Five Eyes ties hold despite friction.",base:"A cooler but intact relationship.",down:"Independent drift weakens the partnership."},
  "Haiti":{best:"Stabilization allows a real partnership to begin.",base:"Continued crisis management.",down:"Total state collapse and a regional migration crisis."},
  "Fiji":{best:"Tilts toward the US in the Pacific contest.",base:"Continues balancing US and China.",down:"Chinese inducements win it over."},
  "Moldova":{best:"Holds its pro-Western course with US support.",base:"Survives under sustained Russian pressure.",down:"Destabilized or absorbed into Russia's orbit."},
  "Iran":{best:"A settlement verifiably ends the nuclear program — a historic win.",base:"A degraded but resilient Iran; simmering confrontation.",down:"A wider war, a closed Hormuz, and a global energy shock."},
  "China":{best:"Stable managed competition; deterrence holds and the US gains relative ground.",base:"A managed rivalry — stabilized truce, no decisive edge.",down:"Escalation to conflict, most likely over Taiwan."},
  "North Korea":{best:"A freeze or confidence-building deal caps the program.",base:"No change; the program advances.",down:"A provocation or proliferation crisis."},
  "Nicaragua":{best:"Regime change opens a path to normalization.",base:"Continued authoritarian hostility.",down:"Deeper alignment with Russia and China on the US doorstep."},
  "Yemen":{best:"Houthi shipping attacks are deterred and Red Sea traffic recovers.",base:"Episodic strikes contain the threat.",down:"Sustained disruption of a global trade artery."},
  "Mali":{best:"A future government re-opens to the West.",base:"Stays in the Russian orbit.",down:"A permanent Russian foothold and spreading instability."},
  "Burkina Faso":{best:"A course-correction reopens engagement.",base:"Stays Russia-aligned.",down:"Deepening Sahel instability and extremist gains."},
  "Niger":{best:"A future government restores security cooperation and base access.",base:"Stays Russia-aligned; the US foothold stays lost.",down:"A permanent strategic loss in the central Sahel."},
  "Afghanistan":{best:"Limited counterterrorism understandings emerge.",base:"No normal relations.",down:"A renewed terrorist safe haven."},
  "Myanmar":{best:"A transition reopens the door to engagement.",base:"Continued isolation.",down:"Deeper dependence on China amid civil war."},
  "United States of America":{best:"—",base:"—",down:"—"}
};
