/* =====================================================================
   Foreign Policy Atlas -- data for ONE president.

   To add another president: copy this file (e.g. data/biden.js), change
   the id/label/headline/blurb/asOf/foot and the three data objects, then
   add a <script src="data/biden.js"></script> line in index.html.

   Schema:
     dossier[country] = { tier:1-6|0, region:"...", points:[ "...", ("interp") ] }
         tiers: 1 emerging | 2 solid | 3 established | 4 in play
                5 strained | 6 adversarial | 0 = the US itself
         a trailing "interp" string in points[] flags an interpretive placement
     regions[name]   = { tilt, dynamics, projects:[...], goal, stakes }
     outcomes[country] = { best, base, down }
   ===================================================================== */

window.PRESIDENTS = window.PRESIDENTS || {};
window.PRESIDENTS["trump"] = {
  id: "trump",
  label: "Donald Trump \u2014 2nd term",
  headline: "Has Trump Set the US Up for the New World Order?",
  blurb: "Interactive country &amp; regional ledger of US foreign alignment &mdash; compiled May 2026. Each entry includes the agreements behind its rating and a best / base / downside outcome line.",
  asOf: "May 2026 (projected timeline)",
  foot:
  "<b>Method &amp; caveats.</b> Tiers and outcomes reflect US foreign-policy posture as of May 2026, from contemporary reporting. "+
  "Six tiers: three greens for aligned states (emerging \u2192 solid \u2192 established), blue for unresolved/courted, gray for strained/uncommitted, red for adversarial. "+
  "Outcome lines are analytical projections, not predictions \u2014 the spread between best and downside is the point. "+
  "Venezuela sits in <i>solid gain</i> at the user's direction; the stricter view is 'strong in-play' absent a stable partner government. "+
  "Interpretive placements rest on overall posture, not a single agreement. Regional 'stakes' deliberately state both the upside and the damage case. "+
  "Region label positions are approximate, for navigation only.",
  dossier: {}, regions: {}, outcomes: {}
};

// Trump-era US alignment dossier — compiled May 2026
// tier codes: 1 emerging | 2 solid | 3 established | 4 inplay | 5 strained | 6 adversarial | 0 US
// Each entry: tier + array of reasoning points. Points are grounded in reporting through May 2026.
// "interp" flag marks placements that are interpretive judgments rather than driven by a specific named event.

window.PRESIDENTS["trump"].dossier = {

  // ===== SOLID GAINS =====
  "Argentina": {tier:2, region:"South America", points:[
    "Oct 2025: US Treasury opened a $20B currency-swap line via the Exchange Stabilization Fund — the first large-scale direct US rescue of a foreign economy since the 1995 Mexico bailout.",
    "Argentina wound down its Chinese central-bank swap line, repaying ~90% of what it had drawn from Beijing — a concrete shift out of China's financial orbit.",
    "Milei's libertarian bloc won the Oct 2025 midterms after visible Trump backing; Argentina drew and then repaid $2.5B of the swap.",
    "A US-Argentina trade deal is in negotiation. Strategic assets: lithium triangle, Vaca Muerta shale.",
    "Durability risk: alignment is ideological and leader-specific — Trump said he would not 'waste time' if Milei lost. One election from reversal."]},
  "El Salvador": {tier:2, region:"Central America", points:[
    "Jan 29, 2026: signed a reciprocal trade agreement giving US firms preferential access to El Salvador's critical-minerals supply chain, tied to clean-tech and defense investment.",
    "Deepened intelligence-sharing and migration cooperation; El Salvador accepted US deportees including to its mega-prison.",
    "Bukele is young, domestically dominant, and ideologically aligned with the MAGA movement.",
    "Durability risk: heavily personalized around Bukele; the relationship has not been tested by a leadership change."]},
  "Panama": {tier:2, region:"Central America", points:[
    "Early 2025: under US pressure and threats to 'retake' the Canal, Panama withdrew from China's Belt and Road Initiative — the first country to exit.",
    "Long-term port concessions held by a Hong Kong-based firm were placed under review.",
    "Custodies the interoceanic canal — the single most strategic chokepoint in the hemisphere; geography makes the alignment durable.",
    "Friction point: the pressure was coercive and unpopular domestically; sovereignty resentment persists."]},
  "Ecuador": {tier:2, region:"South America", points:[
    "Mar 2026: conducted its first joint military operation with the US against a drug-trafficking group.",
    "President Noboa, re-elected and pro-US, has pushed to allow foreign military installations again (reversing a constitutional ban).",
    "Founding member of the Shield of the Americas counter-cartel coalition.",
    "Durability risk: security-driven and leader-dependent; Ecuador's politics are volatile."]},
  "Venezuela": {tier:2, region:"South America", points:[
    "Jan 2026: US operation captured Nicolás Maduro and removed him to the US for trial on narco-terrorism and trafficking charges.",
    "Removed the regime that anchored Chinese, Russian and Iranian influence in the hemisphere; US now has decisive say over the world's largest proven oil reserves.",
    "MAJOR CAVEAT: there is not yet a stable aligned government to be a 'partner.' This is closer to a post-regime transition than an institutionalized alliance — analogous to Iraq 2003. Counted as a solid gain at user's direction; the honest analytic view is a strong in-play bet.",
    "The boat strikes and capture drew sovereignty and rule-of-law objections across the region."]},
  "Hungary": {tier:2, region:"Europe", points:[
    "Orbán is the most ideologically aligned EU leader; close personal and movement ties to Trump.",
    "Negotiated its own US currency-swap arrangement — unusual bilateral financial cooperation.",
    "Functions as a US-aligned wedge inside the EU and NATO, often blocking consensus on Ukraine.",
    "Caveat: the alignment is with Orbán personally and runs against the EU mainstream, not a US-Europe partnership."]},

  // ===== ESTABLISHED / STRONG ALLIES =====
  "Israel": {tier:3, region:"Middle East", points:[
    "The anchor US ally in the region; the relationship predates Trump and is institutionally deep.",
    "Central to the Abraham Accords framework, which has persisted and expanded.",
    "Strong alignment on Iran — the June 2025 strikes on Iranian nuclear sites were closely coordinated.",
    "Not a new 'gain' — a maintained core relationship."]},
  "United Arab Emirates": {tier:3, region:"Middle East", points:[
    "Part of a ~$2 trillion Gulf investment pledge into the US announced during Trump's May 2025 visit.",
    "Deep AI and advanced-tech cooperation with the US.",
    "Abraham Accords signatory; a maintained, strengthening partnership.",
    "Strain: Goldman Sachs estimated UAE GDP could fall 8-10% in 2026 from the Strait of Hormuz disruption tied to the Iran war."]},
  "Saudi Arabia": {tier:3, region:"Middle East", points:[
    "Anchored the ~$2T Gulf investment pledge; major arms and tech deals.",
    "Israel normalization remains STALLED — Riyadh refuses without concrete movement toward a Palestinian state.",
    "Strain: estimated ~5% GDP hit in 2026 from the Hormuz disruption.",
    "A strong but transactional partnership; the marquee prize (normalization) is unrealized."]},
  "Qatar": {tier:3, region:"Middle East", points:[
    "Hosts the largest US military base in the region (Al Udeid).",
    "Part of Gulf investment and defense cooperation; active diplomatic mediator (Gaza, others).",
    "Maintained strong partner."]},
  "Bahrain": {tier:3, region:"Middle East", points:[
    "Hosts the US Fifth Fleet; an Abraham Accords signatory.",
    "Small but reliably aligned; a maintained relationship."]},
  "Philippines": {tier:3, region:"Southeast Asia", points:[
    "Treaty alliance remains strong with deepening defense cooperation.",
    "EDCA base access expanded; investment around Subic Bay.",
    "A genuine frontline state vs. China in the South China Sea — both maintained and strategically rising in value."]},
  "Australia": {tier:3, region:"Oceania", points:[
    "AUKUS submarine pact remains intact; secured relatively favorable trade and defense outcomes in 2025.",
    "Core Five Eyes and Indo-Pacific ally.",
    "Strain: navigating Trump's transactional style and US 'strategic straddle' pressure; broadly maintained."]},
  "Poland": {tier:3, region:"Europe", points:[
    "Among the most pro-US states in Europe; actively wants a larger permanent US troop presence.",
    "High defense spending — a model of the burden-sharing Trump demands.",
    "A frontline NATO state; maintained and arguably strengthened."]},
  "Singapore": {tier:3, region:"Southeast Asia", points:[
    "Member of Pax Silica, the US-led AI and supply-chain security bloc.",
    "Long-standing defense and economic partner; hosts rotational US naval assets.",
    "Maintained strong partner."]},
  "Egypt": {tier:3, region:"Middle East", points:[
    "Long-standing major non-NATO ally; large US military aid relationship.",
    "Key mediator on Gaza ceasefire diplomacy.",
    "Maintained; relationship is transactional and stable."]},
  "Jordan": {tier:3, region:"Middle East", points:[
    "Major non-NATO ally; deep security and intelligence cooperation.",
    "Maintained, though strained by regional war pressures and refugee burdens."]},
  "Morocco": {tier:3, region:"North Africa", points:[
    "Abraham Accords signatory; US recognized its sovereignty over Western Sahara.",
    "Stable, maintained partner with growing defense ties."]},
  "Kuwait": {tier:3, region:"Middle East", points:[
    "Major non-NATO ally; hosts significant US military presence.",
    "Maintained Gulf partner."]},
  "Papua New Guinea": {tier:3, region:"Oceania", points:[
    "Defense cooperation agreement gives the US expanded access — a counter to Chinese inroads in the Pacific.",
    "Maintained/strengthening partner in a contested region."]},

  // ===== EMERGING GAINS =====
  "Vietnam": {tier:1, region:"Southeast Asia", points:[
    "Markedly closer partnership through 2025-26; a manufacturing and demographic winner hedging hard against China.",
    "Trade friction was managed without rupture; defense and supply-chain ties deepened.",
    "Not yet institutionalized into a formal alliance — emerging."]},
  "India": {tier:1, region:"South Asia", points:[
    "Feb 2026: trade deal cut US tariffs from 50% to 18% after India agreed to stop buying Russian oil.",
    "Invited into 'Pax Silica,' the US-led AI and critical-minerals supply-chain initiative.",
    "Damage-then-repair: the 2025 tariff crisis caused real distrust that China and Russia exploited; India ended up more aligned but trust was burned.",
    "Strategic value: demographic giant, key China counterweight — but India guards its strategic autonomy and BRICS membership."]},
  "Pakistan": {tier:1, region:"South Asia", points:[
    "2026 State Dept testimony: US and Pakistan cooperating to develop Pakistan's critical-mineral resources, with US seed financing plus private-sector investment.",
    "Expanding energy and agriculture trade; ongoing counterterrorism cooperation.",
    "A notable warming — some analysts framed it as 'Pakistan conquered the US while India lost Trump' during the 2025 India friction.",
    "Emerging and transactional; historically volatile."]},
  "Kazakhstan": {tier:1, region:"Eurasia", points:[
    "Signed onto the Abraham Accords — a Muslim-majority former Soviet state; the administration expects other Caspian states to follow.",
    "Critical-minerals cooperation; a hedge against both Russia and China.",
    "Emerging — a real diplomatic opening, not yet a deep partnership."]},
  "Dem. Rep. Congo": {tier:1, region:"Sub-Saharan Africa", points:[
    "Dec 2025: signed a minerals-for-security deal with the US (alongside Rwanda) opening cobalt and coltan reserves to US government and companies.",
    "Lobito Corridor node — rail link to move copper/cobalt to the Atlantic, bypassing Chinese-controlled supply chains.",
    "Fragile: the associated peace is precarious, M23 remains potent, and Congolese lawyers filed a constitutional challenge to the partnership agreement.",
    "Trump's 'they said please take our minerals' framing fuels exploitation resentment."]},
  "Nigeria": {tier:1, region:"Sub-Saharan Africa", points:[
    "Relationship cratered to its lowest since the 1970s over Trump's 'Christian genocide' accusation and threats of military intervention; AFRICOM struck ISIS militants in Sokoto on Christmas Day 2025.",
    "Jan 22, 2026: the two countries inaugurated a Nigeria-US Joint Working Group on counterterrorism — Abuja successfully converted the threat into cooperation.",
    "Foundation is contested and coercive — Nigerian officials and even Christian leaders rejected the 'genocide' framing.",
    "Strategic weight: West Africa's anchor, ~230M people."]},
  "Angola": {tier:1, region:"Sub-Saharan Africa", points:[
    "Central node of the Lobito Corridor — its Atlantic ports anchor the US-backed rail route for Congolese/Zambian copper and cobalt.",
    "Dec 2025: DFC signed a $553M loan for the Lobito Atlantic Railway.",
    "A genuine infrastructure partnership (continued from a G7 initiative), not a smash-and-grab — but early-stage."]},
  "Zambia": {tier:1, region:"Sub-Saharan Africa", points:[
    "Copper-belt origin point for the Lobito Corridor; processing facilities planned along the route.",
    "Emerging partner in the US critical-minerals strategy."]},
  "Guinea": {tier:1, region:"Sub-Saharan Africa", points:[
    "US-led 'Liberty Corridor' connects the Nimba mining district to a new deepwater port.",
    "Emerging resource partner; governance and stability risks remain."]},
  "Côte d'Ivoire": {tier:1, region:"Sub-Saharan Africa", points:[
    "Engaged on critical-minerals cooperation; one of the more stable West African economies.",
    "Emerging — early-stage engagement.", "interp"]},
  "Kenya": {tier:1, region:"Sub-Saharan Africa", points:[
    "Major non-NATO ally designation (2024) carried forward; security and tech cooperation continues.",
    "Emerging/maintained — relationship is real but not a marquee Trump initiative.", "interp"]},
  "Liberia": {tier:1, region:"Sub-Saharan Africa", points:[
    "One of five West African states Trump met in July 2025 under the 'aid to trade' framing.",
    "Historic US ties; emerging transactional engagement.", "interp"]},
  "Senegal": {tier:1, region:"Sub-Saharan Africa", points:[
    "Met with Trump in the July 2025 mini-summit; stable democracy, engaged on trade.",
    "Emerging — early-stage.", "interp"]},
  "Mauritania": {tier:1, region:"Sub-Saharan Africa", points:[
    "Part of the July 2025 five-nation meeting; counterterrorism relevance in the Sahel periphery.",
    "Emerging — early-stage.", "interp"]},
  "Indonesia": {tier:1, region:"Southeast Asia", points:[
    "Defense ties deepened; a ~280M-person giant central to Indo-Pacific balancing.",
    "Trade managed without rupture.",
    "Emerging — Indonesia traditionally guards non-alignment.", "interp"]},
  "Cambodia": {tier:1, region:"Southeast Asia", points:[
    "US improved relations despite Cambodia's prior drift toward Beijing; critical-minerals agreement signed.",
    "A notable pull-back from China's orbit — emerging and reversible."]},
  "Thailand": {tier:1, region:"Southeast Asia", points:[
    "Treaty ally; signed a critical-minerals agreement with the US.",
    "Relationship is long-standing but was cooler — counted emerging given renewed minerals engagement.", "interp"]},
  "Malaysia": {tier:1, region:"Southeast Asia", points:[
    "Critical-minerals (rare-earth processing) cooperation with the US.",
    "Emerging — Malaysia balances carefully between the US and China.", "interp"]},
  "Mongolia": {tier:1, region:"East Asia", points:[
    "US interest in Mongolia's critical minerals as a 'third neighbor' alternative to Russia and China.",
    "Emerging — landlocked geography limits how far this can go.", "interp"]},
  "Armenia": {tier:1, region:"Eurasia", points:[
    "US helped broker an Armenia-Azerbaijan peace framework; Armenia is tilting away from Russia.",
    "Emerging realignment — early and fragile."]},
  "Azerbaijan": {tier:1, region:"Eurasia", points:[
    "Party to the US-brokered peace framework with Armenia; energy-exporting state.",
    "Emerging — Azerbaijan also maintains close ties with Turkey and Russia.", "interp"]},
  "Uzbekistan": {tier:1, region:"Eurasia", points:[
    "Central Asian C5 engagement; critical-minerals and counterbalancing interest.",
    "Emerging — early-stage.", "interp"]},
  "Turkmenistan": {tier:1, region:"Eurasia", points:[
    "Energy-rich; peripheral C5 engagement.",
    "Emerging/nominal — among the world's most isolated states.", "interp"]},
  "Kyrgyzstan": {tier:1, region:"Eurasia", points:[
    "Part of C5 Central Asia engagement.", "Emerging/nominal.", "interp"]},
  "Tajikistan": {tier:1, region:"Eurasia", points:[
    "Part of C5 Central Asia engagement; Afghanistan-border security relevance.",
    "Emerging/nominal.", "interp"]},
  "Oman": {tier:1, region:"Middle East", points:[
    "Quiet diplomatic interlocutor (notably with Iran); stable Gulf state.",
    "Emerging/maintained — counted here given its mediating rather than allied posture.", "interp"]},
  "Turkey": {tier:1, region:"Middle East", points:[
    "Transactional engagement with Trump; NATO member with independent ambitions.",
    "Emerging/contested — cooperation on some files, friction on others (Syria, defense).", "interp"]},
  "Italy": {tier:1, region:"Europe", points:[
    "PM Meloni is among the most Trump-sympathetic EU leaders; positioned as a transatlantic bridge.",
    "Emerging within the populist-right tilt — but Italy remains embedded in EU/NATO consensus.", "interp"]},
  "Czechia": {tier:1, region:"Europe", points:[
    "Babiš's return shifts Prague toward the populist-right, Trump-sympathetic bloc.",
    "Emerging — early.", "interp"]},
  "Slovakia": {tier:1, region:"Europe", points:[
    "Fico government is populist and skeptical of Ukraine aid, tilting toward Trump's line.",
    "Emerging — ideological tilt more than a deepened US partnership.", "interp"]},
  "Guatemala": {tier:1, region:"Central America", points:[
    "Migration cooperation; accepted deportee flows.",
    "Emerging — relationship driven mainly by migration enforcement.", "interp"]},
  "Honduras": {tier:1, region:"Central America", points:[
    "Member of the Shield of the Americas coalition; migration and security cooperation.",
    "Emerging — politically variable.", "interp"]},
  "Costa Rica": {tier:1, region:"Central America", points:[
    "Security cooperation; aligned on counter-narcotics.",
    "Emerging.", "interp"]},
  "Dominican Republic": {tier:1, region:"Caribbean", points:[
    "Shield of the Americas member; close migration and security cooperation.",
    "Emerging/stable.", "interp"]},
  "Trinidad and Tobago": {tier:1, region:"Caribbean", points:[
    "Shield of the Americas member; energy producer near Venezuela.",
    "Emerging.", "interp"]},
  "Jamaica": {tier:1, region:"Caribbean", points:[
    "Security and counter-narcotics cooperation.", "Emerging.", "interp"]},
  "Belize": {tier:1, region:"Central America", points:[
    "Small-state security cooperation.", "Emerging/nominal.", "interp"]},
  "Paraguay": {tier:1, region:"South America", points:[
    "Shield of the Americas member; conservative government aligned with the US.",
    "Emerging.", "interp"]},
  "Bolivia": {tier:1, region:"South America", points:[
    "2025 election of Rodrigo Paz ended ~two decades of MAS socialist rule — a tilt away from the China/Russia orbit.",
    "Holds the largest lithium reserves in the triangle — strategically significant if alignment holds.",
    "Emerging — very early, and Bolivian resource nationalism is strong."]},
  "Guyana": {tier:1, region:"South America", points:[
    "Fastest-growing economy on earth from the offshore oil boom; ExxonMobil deeply embedded.",
    "Security incentive to shelter under the US given Venezuela's Essequibo claim; Shield of the Americas member.",
    "Emerging — small now, wealthy and strategic soon."]},
  "Chile": {tier:1, region:"South America", points:[
    "Dec 2025 election of right-wing José Antonio Kast shifts Santiago toward the US-aligned bloc.",
    "Major copper and lithium producer.",
    "Emerging — incoming government, alignment untested."]},
  "Peru": {tier:1, region:"South America", points:[
    "Conservative-leaning government; counter-narcotics and trade cooperation.",
    "Emerging — Peruvian politics are highly unstable.", "interp"]},

  // ===== IN PLAY =====
  "Cuba": {tier:4, region:"Caribbean", points:[
    "Jan 2026: Trump declared a national emergency and created a mechanism to tariff any country supplying oil to Cuba.",
    "May 1, 2026: EO 14404 imposed Iran-style secondary sanctions; designated the military conglomerate GAESA.",
    "The administration has stated regime change in Cuba is a goal by year-end.",
    "Risks: humanitarian and migration blowback onto the US; secondary sanctions antagonize allies like Canada.",
    "A pressure campaign, not yet any kind of gain — outcome unresolved."]},
  "Venezuela_note": {tier:4, region:"South America", points:["(See Venezuela entry — placed in solid gains at user direction.)"]},
  "Russia": {tier:4, region:"Eurasia", points:[
    "Trump is actively pursuing a reset — a bilateral US-Russia track aimed at improved relations and business deals.",
    "US military aid to Ukraine has virtually dried up; Trump has often blamed Ukraine for the war and floated sanctions relief.",
    "Skeptical reading: Putin's participation in peace talks is widely assessed as performative — humoring Trump while Russian forces press the battlefield.",
    "Genuinely unresolved — could become a Trump signature achievement or a costly miscalculation. The single highest-variance entry on the map."]},
  "Belarus": {tier:4, region:"Eurasia", points:[
    "Limited prisoner-release diplomacy and quiet contacts.",
    "In play only at the margins — remains closely tied to Moscow.", "interp"]},
  "Syria": {tier:4, region:"Middle East", points:[
    "Post-Assad transition; the US moved to lift major sanctions to support the new government.",
    "In play — a genuine opening, but the new order is fragile and unproven."]},
  "Serbia": {tier:4, region:"Europe", points:[
    "Balances among the US, EU, Russia and China; Trump-family business ties in Belgrade.",
    "In play — courted, but non-aligned by design.", "interp"]},
  "Rwanda": {tier:4, region:"Sub-Saharan Africa", points:[
    "Co-signed the Dec 2025 minerals/peace deal — but backs the M23 militia whose advance the deal is meant to stop.",
    "In play and deeply ambiguous — partner on paper, destabilizer in practice."]},
  "Taiwan": {tier:4, region:"East Asia", points:[
    "A record ~$11.1B US arms package continued to flow.",
    "At the May 2026 Beijing summit Trump said he made 'no commitment either way' on stopping arms sales; Xi warned of possible 'conflicts' if Taiwan is mishandled.",
    "In play and the highest-stakes case — the 2027 window will test whether arms-plus-ambiguity deters Beijing.",
    "Not a 'relationship' question so much as a deterrence bet."]},

  // ===== STRAINED / UNCOMMITTED =====
  "Brazil": {tier:5, region:"South America", points:[
    "2025: Trump imposed tariffs up to 50% and sanctioned a Supreme Court justice under the Magnitsky Act — retaliation for Brazil's prosecution of Bolsonaro.",
    "Lula said the relationship moved 'from win-win to lose-lose'; Brazil filed at the WTO and passed reciprocity legislation.",
    "May 2026: a White House meeting created a working group with a 30-day deadline to resolve the tariff dispute — a thaw.",
    "Structural fact: China is Brazil's largest trading partner; Brazil is a BRICS member committed to non-alignment regardless of who holds the White House."]},
  "Mexico": {tier:5, region:"North America", points:[
    "Threatened 25% tariffs; intense pressure over fentanyl, migration and cartels.",
    "President Sheinbaum (left) threatened to pull out of the Shield of the Americas summit in protest.",
    "Cooperation continues under pressure, but the relationship is adversarial in tone."]},
  "Canada": {tier:5, region:"North America", points:[
    "Threatened 25% tariffs; repeated '51st state' rhetoric strained the relationship badly.",
    "Canada's blocking statute constrains US extraterritorial (Cuba) sanctions — a point of friction.",
    "A core ally treated as an adversary on trade."]},
  "Colombia": {tier:5, region:"South America", points:[
    "President Petro (left) clashed publicly with Trump over deportation flights and threatened to exit the Shield of the Americas.",
    "Historically the closest US security partner in South America — now strained."]},
  "Uruguay": {tier:5, region:"South America", points:[
    "Left-leaning government; no particular warmth with Washington.",
    "Uncommitted — low salience.", "interp"]},
  "United Kingdom": {tier:5, region:"Europe", points:[
    "Remains a core ally and Five Eyes member, but navigating Trump's tariff and burden-sharing pressure.",
    "Strained in tone rather than substance — counted with the cooling institutional core.", "interp"]},
  "France": {tier:5, region:"Europe", points:[
    "A leading voice for European 'strategic autonomy' — explicitly hedging against US reliability.",
    "Friction over tariffs, Ukraine and NATO direction."]},
  "Germany": {tier:5, region:"Europe", points:[
    "Tariff and defense-spending friction; central to EU contingency planning for a paralyzed alliance.",
    "Strained — a core ally drifting."]},
  "Denmark": {tier:5, region:"Europe", points:[
    "Jan 2026: Washington pressured Denmark to cede Greenland, threatening tariffs; the EU readied its Anti-Coercion Instrument before Trump withdrew the threat.",
    "Threatening to take a NATO ally's territory is the sharpest single rupture in the transatlantic relationship."]},
  "Greenland": {tier:5, region:"Europe", points:[
    "Object of explicit US acquisition pressure in Jan 2026.",
    "Strained — the territory and its population have resisted; an autonomy/sovereignty flashpoint."]},
  "Ukraine": {tier:5, region:"Europe", points:[
    "US military and financial aid has virtually dried up; Trump has blamed Kyiv for the war.",
    "Europeans now effectively pay the US to keep weapons flowing; Trump has called Zelensky a greater obstacle than Putin.",
    "A former close partner now strained and sidelined in its own peace process."]},
  "Georgia": {tier:5, region:"Europe", points:[
    "Governing party has drifted toward Moscow; democratic backsliding.",
    "Strained/drifting — not a US-driven outcome.", "interp"]},
  "Japan": {tier:5, region:"East Asia", points:[
    "Treaty alliance formally intact under PM Takaichi, but Tokyo is unlocking dormant arms-export capacity out of concern about US preoccupation with Middle East wars.",
    "Charitable reading: burden-shifting working as designed. Skeptical reading: an anchor ally hedging because it no longer fully trusts US focus.",
    "Counted strained because the trajectory is toward self-reliance, not deeper integration."]},
  "South Korea": {tier:5, region:"East Asia", points:[
    "Pursuing 'strategic autonomy' and an independent military buildup amid doubts about US reliability.",
    "Treaty alliance intact; trust trajectory negative — same hedging pattern as Japan."]},
  "South Africa": {tier:5, region:"Sub-Saharan Africa", points:[
    "Antagonized over the disputed 'white genocide' / Afrikaner narrative; Trump granted Afrikaners refugee status and reportedly moved to raise the intake from ~7,500 to ~17,500.",
    "Trump skipped the G20 summit hosted in South Africa.",
    "The continent's most industrialized economy and a G20 member — and one of the sharpest US-Africa ruptures."]},
  "Somalia": {tier:5, region:"Sub-Saharan Africa", points:[
    "Publicly derided by Trump; minimal constructive engagement.",
    "Strained.", "interp"]},
  "Ethiopia": {tier:5, region:"Sub-Saharan Africa", points:[
    "Aid cuts hit hard; tension over regional conflicts and Red Sea access.",
    "Strained.", "interp"]},
  "Ghana": {tier:5, region:"Sub-Saharan Africa", points:[
    "Foreign-aid freeze affected programs; no marquee partnership.",
    "Uncommitted/strained.", "interp"]},
  "Sudan": {tier:5, region:"Sub-Saharan Africa", points:[
    "Civil war; US engagement limited and humanitarian.",
    "Strained/uncommitted.", "interp"]},
  "Iraq": {tier:5, region:"Middle East", points:[
    "Caught between US and Iranian influence; militia tensions.",
    "Strained — a difficult, contested relationship.", "interp"]},
  "Lebanon": {tier:5, region:"Middle East", points:[
    "Hezbollah's role and the country's fragility limit US engagement.",
    "Strained/uncommitted.", "interp"]},
  "Algeria": {tier:5, region:"North Africa", points:[
    "Russia-aligned defense posture; cool relations with Washington.",
    "Strained/uncommitted.", "interp"]},
  "Tunisia": {tier:5, region:"North Africa", points:[
    "Democratic backsliding; aid cuts; low engagement.",
    "Uncommitted.", "interp"]},
  "Libya": {tier:5, region:"North Africa", points:[
    "Divided governance; no coherent US partnership.",
    "Strained/uncommitted.", "interp"]},
  "Bangladesh": {tier:5, region:"South Asia", points:[
    "Post-transition political flux ahead of elections; the US was historically wary of the interim order.",
    "Uncommitted — relationship in flux.", "interp"]},
  "Sri Lanka": {tier:5, region:"South Asia", points:[
    "A leftist government in Colombo; the US has been cautious.",
    "Strained/uncommitted; China retains influence.", "interp"]},
  "Nepal": {tier:5, region:"South Asia", points:[
    "Caught between India and China; minimal US priority.",
    "Uncommitted.", "interp"]},
  "New Zealand": {tier:5, region:"Oceania", points:[
    "Five Eyes member but more independent-minded; tariff and alignment friction.",
    "Strained in tone — counted with the cooling democratic core.", "interp"]},
  "Haiti": {tier:5, region:"Caribbean", points:[
    "Gang-driven state collapse; US engagement is crisis-management, not partnership.",
    "Strained/uncommitted.", "interp"]},
  "Fiji": {tier:5, region:"Oceania", points:[
    "Pacific state courted by both the US and China.",
    "Uncommitted/contested.", "interp"]},
  "Moldova": {tier:5, region:"Europe", points:[
    "Pro-EU government under Russian pressure; modest US engagement.",
    "Uncommitted — counted with the strained European set.", "interp"]},

  // ===== ADVERSARIAL =====
  "Iran": {tier:6, region:"Middle East", points:[
    "June 2025: US struck Iranian nuclear sites; an active war state through 2026.",
    "Iran retained ~70% of its prewar missile stockpile and proved more resilient than expected; closure of the Strait of Hormuz disrupted global trade.",
    "The single biggest active drag on the foreign-policy ledger."]},
  "China": {tier:6, region:"East Asia", points:[
    "May 2026 Beijing summit produced mainly a preserved trade truce — assessed as underwhelming, with no chip-export breakthrough.",
    "Xi declined to broker an Iran exit for Trump; Taiwan exchange left deterrence ambiguous.",
    "A managed rivalry — stabilized, not 'won.' The load-bearing relationship for the whole thesis."]},
  "North Korea": {tier:6, region:"East Asia", points:[
    "No breakthrough; nuclear program advancing.",
    "Adversarial — episodic Trump outreach has not changed the fundamentals.", "interp"]},
  "Nicaragua": {tier:6, region:"Central America", points:[
    "Ortega's authoritarian regime; aligned with Russia, China, Cuba, Venezuela.",
    "Adversarial."]},
  "Yemen": {tier:6, region:"Middle East", points:[
    "Houthi authorities targeted in US strikes over Red Sea shipping attacks.",
    "Adversarial (with respect to the Houthi-controlled areas)."]},
  "Mali": {tier:6, region:"Sub-Saharan Africa", points:[
    "Post-coup junta aligned with Russia (Wagner/Africa Corps); expelled Western forces.",
    "Adversarial/lost to the Russian orbit."]},
  "Burkina Faso": {tier:6, region:"Sub-Saharan Africa", points:[
    "Junta aligned with Russia; part of the Sahel bloc that broke with the West.",
    "Adversarial/lost."]},
  "Niger": {tier:6, region:"Sub-Saharan Africa", points:[
    "Post-2023-coup junta ejected US forces and the drone base; turned to Russia.",
    "Adversarial/lost — a concrete strategic setback in the Sahel."]},
  "Afghanistan": {tier:6, region:"South Asia", points:[
    "Taliban-governed; no normal relations.",
    "Adversarial."]},
  "Myanmar": {tier:6, region:"Southeast Asia", points:[
    "Military junta; civil war; sanctioned.",
    "Adversarial."]},

  // ===== UNITED STATES =====
  "United States of America": {tier:0, region:"—", points:["The United States."]}
};

// Regional analysis layer — compiled May 2026
window.PRESIDENTS["trump"].regions = {
  "South America": {
    tilt:"Tilting US",
    dynamics:"The sharpest swing on the board. A wave of right-populist election wins (Milei in Argentina, Kast incoming in Chile, Paz ending two decades of socialism in Bolivia) has aligned with a forceful US reassertion of the Monroe Doctrine. The leftist holdouts \u2014 Brazil, Colombia \u2014 are now the exceptions rather than the trend.",
    projects:["Shield of the Americas \u2014 18-nation counter-cartel military coalition","$20B Argentina currency-swap rescue","Maduro capture and the Venezuela transition"],
    goal:"Re-establish an uncontested US sphere: push China out of resource and infrastructure deals, secure lithium and oil, and lock in a bloc of aligned governments.",
    stakes:"Upside: a contiguous aligned hemisphere with privileged access to the lithium triangle and Venezuelan/Guyanese oil \u2014 a genuine strategic asset for the energy transition. Downside: the bloc is leader-dependent and organized around a negative agenda (anti-cartel, anti-China); a few election losses could unwind much of it, and the heavyweight, Brazil, remains non-aligned."
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
    dynamics:"Both neighbors are treated as adversaries on trade. Tariff threats, fentanyl and migration pressure, and '51st state' rhetoric toward Canada have produced the worst US-Canada and US-Mexico tone in decades \u2014 even as deep economic integration continues underneath.",
    projects:["Tariff leverage on both partners","Cross-border cartel and fentanyl enforcement"],
    goal:"Extract migration and security concessions; rebalance trade terms.",
    stakes:"Upside: tighter border and supply-chain concessions. Downside: alienating the two countries most economically fused with the US is strategically costly and pushes both to diversify away from Washington."
  },
  "Europe": {
    tilt:"Strained",
    dynamics:"The weakest region for the US under Trump, and the one that resists charitable reframing. The institutional core (France, Germany, UK, Nordics) is cooling and building 'strategic autonomy'; the Greenland pressure on Denmark was a genuine rupture. The one growth area is the populist right \u2014 Hungary, and tilts in Italy, Slovakia, Czechia \u2014 but that bloc forms against the EU mainstream, not as a US-Europe partnership.",
    projects:["Greenland acquisition pressure","Burden-shifting: Europe pays for US weapons to Ukraine","Bilateral ties with populist-right governments"],
    goal:"Force European defense self-reliance, reduce US security subsidy, and deal bilaterally rather than through the EU.",
    stakes:"Upside: a Europe that finally carries its own defense burden. Downside: the world's largest bloc of wealthy democracies hedging against US reliability \u2014 contingency-planning for a paralyzed NATO is the opposite of 'setting up' the alliance for a competitive era."
  },
  "Eurasia": {
    tilt:"In play",
    dynamics:"The highest-variance region. Trump is actively courting Russia for a reset while aid to Ukraine has dried up; simultaneously the US has made real openings in Central Asia and the Caucasus (Kazakhstan into the Abraham Accords, an Armenia-Azerbaijan peace framework) that quietly chip at Russia's periphery.",
    projects:["US-Russia bilateral reset track","Armenia-Azerbaijan peace framework","Central Asia C5 critical-minerals engagement"],
    goal:"End the Ukraine war on terms Trump can claim, normalize with Moscow, and pull Caspian/Central Asian states into a minerals-and-security orbit.",
    stakes:"Upside: a Russia reset plus Central Asian minerals access would be a signature realignment. Downside: a deal that rewards aggression damages US credibility globally, and analysts widely read Putin's diplomacy as performative \u2014 stringing Trump along while gaining ground."
  },
  "Middle East": {
    tilt:"Mixed \u2014 strong ties under a war cloud",
    dynamics:"Deep economic enmeshment with the Gulf (a ~$2T investment pledge, AI partnerships) and a persisting, expanding Abraham Accords framework \u2014 all sitting on top of an active war with Iran that is damaging the very Gulf economies the US is bound to.",
    projects:["Abraham Accords expansion (Kazakhstan added)","~$2 trillion Gulf investment pledge","Iran strikes and ongoing confrontation","Syria sanctions relief for the post-Assad government"],
    goal:"Lock in an anti-Iran coalition, bind the Gulf economically to the US, and complete Saudi-Israel normalization.",
    stakes:"Upside: a durable US-anchored regional order with Iran contained and normalization complete. Downside: the Iran war is a live drag \u2014 Hormuz disruption, ~5-10% Gulf GDP hits, stalled Saudi normalization \u2014 and a bad off-ramp would undercut the whole regional gain."
  },
  "North Africa": {
    tilt:"Mixed / low-engagement",
    dynamics:"A thin region for the US. Morocco is a solid Accords partner; Egypt is a maintained major ally; the rest (Algeria, Tunisia, Libya) are strained, divided, or Russia-leaning, with aid cuts reducing US presence.",
    projects:["Morocco partnership / Western Sahara recognition","Egypt security relationship"],
    goal:"Hold key partners, manage migration into Europe, limit Russian and Islamist footholds.",
    stakes:"Upside: stable anchor states. Downside: low engagement cedes ground \u2014 Russia and China fill the vacuum in the contested states."
  },
  "Sub-Saharan Africa": {
    tilt:"In play \u2014 narrow and transactional",
    dynamics:"The 21st-century demographic story, engaged through a deliberately narrow lens. The US dissolved its Bureau of African Affairs and closed embassies, shifting to 'trade not aid' \u2014 targeted minerals-and-security deals (DRC, the Lobito corridor states, Guinea) rather than broad partnership. The Sahel (Mali, Burkina Faso, Niger) has been lost outright to Russia.",
    projects:["DRC minerals-for-security deal","Lobito Corridor \u2014 minerals rail bypassing Chinese supply chains","Guinea 'Liberty Corridor'","Nigeria counterterrorism working group"],
    goal:"Secure critical minerals (cobalt, coltan, copper), break Chinese refining dominance, and run counterterrorism \u2014 without large development commitments.",
    stakes:"Upside: a non-Chinese critical-mineral supply chain and security footholds in West/Central Africa. Downside: a shrunken diplomatic presence and extractive framing cede the demographic future to China's patient, broad-based strategy; one-year AGOA uncertainty discourages the long-term investment that would actually tie the continent to the US."
  },
  "South Asia": {
    tilt:"Mixed",
    dynamics:"India is the prize and the cautionary tale at once \u2014 a brutal 2025 tariff crisis, then a 2026 trade deal that left India more aligned (off Russian oil, into Pax Silica) but with trust burned. Pakistan warmed via a minerals partnership. The smaller states drift or sit uncommitted.",
    projects:["US-India trade deal + Pax Silica membership","Pakistan critical-minerals partnership"],
    goal:"Build India into the central counterweight to China; keep smaller states from tipping fully into Beijing's orbit.",
    stakes:"Upside: a deep US-India axis is one of the most valuable possible alignments of the century. Downside: India guards its strategic autonomy and BRICS ties \u2014 the damage-then-repair cycle showed how fast trust can be spent, and competitors exploited the gap."
  },
  "East Asia": {
    tilt:"Mixed \u2014 the decisive theater",
    dynamics:"The region that decides the thesis. China is a managed rivalry \u2014 stabilized at the May 2026 Beijing summit, not won. Treaty allies Japan and South Korea are formally intact but hedging toward self-reliance. Taiwan is the highest-stakes unresolved case.",
    projects:["May 2026 Beijing summit \u2014 preserved trade truce","Record ~$11.1B Taiwan arms package","Pax Silica tech-and-minerals bloc"],
    goal:"Manage the China rivalry without war, deter a move on Taiwan, and keep allies aligned while pushing them to spend more.",
    stakes:"Upside: successful deterrence plus rearmed, capable allies. Downside: allied hedging means the new order organizes partly around US unreliability; the 2027 Taiwan window is an untested bet on whether arms-plus-ambiguity holds."
  },
  "Southeast Asia": {
    tilt:"Tilting US",
    dynamics:"A quiet success story. The frontline maritime states \u2014 Philippines, Vietnam, Indonesia \u2014 are moving toward the US as a China hedge, and critical-minerals deals (Cambodia, Malaysia, Thailand) have pulled even China-leaning states partly back. The US is gaining the swing states that matter most for China competition.",
    projects:["Philippines EDCA base expansion","Vietnam/Indonesia defense deepening","Critical-minerals agreements (Cambodia, Malaysia, Thailand)","Pax Silica (Singapore)"],
    goal:"Build a maritime coalition along China's southern flank and secure rare-earth processing outside China.",
    stakes:"Upside: an aligned arc of fast-growing, young, strategically placed economies \u2014 close to the ideal 'future winners' bet. Downside: ASEAN states hedge by instinct and will not choose sides cleanly; gains are real but reversible."
  },
  "Oceania": {
    tilt:"Mostly aligned",
    dynamics:"AUKUS holds and Australia remains a core ally; Papua New Guinea's defense pact is a real counter to Chinese Pacific inroads. New Zealand is more independent-minded; the island states are an active US-China contest.",
    projects:["AUKUS submarine pact","Papua New Guinea defense cooperation agreement","Pacific Islands engagement vs. China"],
    goal:"Hold the second island chain, deny China basing access in the Pacific.",
    stakes:"Upside: a secured Pacific approach. Downside: small island states are genuinely up for grabs, and Trump's transactional style strains even reliable allies like Australia."
  }
};

// Outcome lines per country — best case / base case / downside
window.PRESIDENTS["trump"].outcomes = {
  "Argentina":{best:"Milei's model outlasts him; Argentina becomes a stable, durably US-aligned lithium-and-energy partner and proof that the bet works.",base:"A reliable partner while Milei governs; trade ties deepen but institutionalization stays incomplete.",down:"A Peronist win in 2027 reverses alignment; the $20B becomes a politically toxic debt with little lasting US gain."},
  "El Salvador":{best:"Trade and minerals ties institutionalize; El Salvador becomes a durable Central American anchor beyond Bukele.",base:"A close, cooperative partner as long as Bukele holds power.",down:"Personalist rule and democratic erosion make the relationship hostage to one man's fortunes."},
  "Panama":{best:"Permanent canal-security cooperation and a China-free logistics hub \u2014 geography keeps this durable.",base:"Reliable canal access; lingering resentment managed.",down:"Sovereignty backlash brings an anti-US government; cooperation narrows to the minimum."},
  "Ecuador":{best:"Joint operations and base access turn Ecuador into a permanent Pacific security partner.",base:"Security cooperation continues while Noboa governs.",down:"Volatile politics return a hostile government; the opening closes."},
  "Venezuela":{best:"A stable, US-aligned government takes hold; the largest oil reserves on earth re-enter the US orbit \u2014 a generational strategic win.",base:"A messy but functional transition; partial US influence over the energy sector.",down:"State collapse, insurgency, or a failed transition turns it into an open-ended commitment \u2014 an Iraq-2003 analogy."},
  "Hungary":{best:"A durable US foothold inside the EU; a model for other populist-right governments.",base:"An aligned irritant within the EU while Orb\u00e1n governs.",down:"Orb\u00e1n falls or the EU isolates Budapest; the foothold evaporates."},
  "Israel":{best:"Anchors a normalized, US-led regional order with Iran contained.",base:"Remains the core regional ally; relationship deep and stable.",down:"Regional war or normalization collapse strains even this relationship."},
  "United Arab Emirates":{best:"Deep AI/tech and capital integration makes the UAE a permanent strategic-economic partner.",base:"A strong, transactional Gulf partnership.",down:"Prolonged Iran war and GDP damage sour the economic bet."},
  "Saudi Arabia":{best:"Saudi-Israel normalization completes; Riyadh becomes the linchpin of a US-anchored region.",base:"A strong but transactional partner; normalization stays stalled.",down:"War damage and a frozen Palestinian track push Riyadh to hedge toward China."},
  "Qatar":{best:"Continues as a reliable basing host and indispensable mediator.",base:"Stable maintained partner.",down:"Regional escalation complicates its balancing act."},
  "Bahrain":{best:"Fifth Fleet host indefinitely; quietly reliable.",base:"Stable small partner.",down:"Domestic or regional instability raises its risk profile."},
  "Philippines":{best:"Becomes the firm southern anchor of the Indo-Pacific coalition; bases and deterrence locked in.",base:"A strong treaty ally with steady cooperation.",down:"A future administration swings back toward Beijing, as has happened before."},
  "Australia":{best:"AUKUS delivers; Australia is the secure southern pillar of China deterrence.",base:"Core ally, managing Trump's style.",down:"Transactional friction and AUKUS delays erode confidence."},
  "Poland":{best:"Becomes the central US military hub in Europe \u2014 a model frontline ally.",base:"A reliably pro-US, high-spending partner.",down:"Abandonment fears if US security guarantees look unreliable."},
  "Singapore":{best:"A permanent tech-and-logistics node in the US Indo-Pacific architecture.",base:"Stable partner that still hedges.",down:"China pressure narrows its room to align."},
  "Egypt":{best:"Stays a stable security anchor and Gaza mediator.",base:"Maintained transactional ally.",down:"Aid friction or regional war strains the relationship."},
  "Jordan":{best:"Remains a quietly indispensable security and intelligence partner.",base:"Maintained ally under regional pressure.",down:"Refugee and war pressures destabilize it."},
  "Morocco":{best:"Deepens into a leading African security and economic partner.",base:"Stable Accords partner.",down:"Western Sahara or regional tension complicates ties."},
  "Kuwait":{best:"Continues as a reliable Gulf basing partner.",base:"Stable maintained ally.",down:"Regional escalation raises exposure."},
  "Papua New Guinea":{best:"A durable Pacific security partner that blocks Chinese basing.",base:"Cooperation continues with capacity limits.",down:"Chinese inducements outbid a thin US presence."},
  "Vietnam":{best:"Becomes a manufacturing-and-security partner second only to the Philippines in the region \u2014 a textbook 'future winner' captured.",base:"A steadily closer partner that still formally hedges.",down:"China pressure or a leadership shift caps the alignment."},
  "India":{best:"A deep US-India axis on tech, defense and supply chains \u2014 the decisive counterweight to China.",base:"A closer but autonomy-guarding partner; cooperation real but bounded.",down:"Another trust rupture sends India back toward strategic distance and BRICS."},
  "Pakistan":{best:"Minerals and counterterrorism ties mature into a stable partnership.",base:"A transactional, issue-by-issue relationship.",down:"Historic volatility and the India dynamic snap it back to estrangement."},
  "Kazakhstan":{best:"Anchors a Caspian bloc tilting toward the US on minerals and diplomacy \u2014 a real dent in Russia's periphery.",base:"A modest but genuine diplomatic opening.",down:"Russian and Chinese proximity reabsorb it."},
  "Dem. Rep. Congo":{best:"The minerals deal holds, the peace stabilizes, and a non-Chinese cobalt supply chain takes root.",base:"Partial minerals access amid continued instability.",down:"The peace collapses, M23 advances, and the deal is voided \u2014 minerals without stability."},
  "Nigeria":{best:"The counterterrorism partnership matures and Nigeria becomes West Africa's US security anchor.",base:"Working-level cooperation continues, with underlying resentment.",down:"The 'genocide' framing and coercion produce a backlash government that ejects the US."},
  "Angola":{best:"The Lobito Corridor delivers; Angola becomes a key logistics-and-minerals partner.",base:"The rail project advances slowly with partial benefit.",down:"Financing or governance failures stall the corridor."},
  "Zambia":{best:"Copper-belt integration into a US-aligned supply chain.",base:"Incremental progress on the corridor.",down:"The corridor underdelivers; China retains the copper trade."},
  "Guinea":{best:"The Liberty Corridor opens a major non-Chinese minerals route.",base:"Slow, partial development.",down:"Instability or junta politics derail it."},
  "C\u00f4te d'Ivoire":{best:"Becomes a stable West African economic partner.",base:"Modest minerals and trade engagement.",down:"Engagement fades to nominal."},
  "Kenya":{best:"Matures into an East African security-and-tech hub for the US.",base:"Steady maintained partner.",down:"Aid cuts and competing offers cool the relationship."},
  "Liberia":{best:"Historic ties convert into a modern trade partnership.",base:"Low-level transactional engagement.",down:"Neglect lets the relationship lapse."},
  "Senegal":{best:"A stable democratic partner and West African anchor.",base:"Early-stage trade engagement.",down:"Engagement stays nominal."},
  "Mauritania":{best:"A useful Sahel-periphery counterterrorism partner.",base:"Limited security cooperation.",down:"Sahel instability spills over."},
  "Indonesia":{best:"The ~280M-person giant tilts durably toward the US security orbit.",base:"Closer defense ties; non-alignment preserved.",down:"Indonesia reverts to strict equidistance."},
  "Cambodia":{best:"A genuine, lasting pull-back from China's orbit.",base:"Improved ties that remain reversible.",down:"China reabsorbs it \u2014 the most likely path given the base relationship."},
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
  "Bolivia":{best:"The post-MAS government opens the largest lithium reserves in the triangle to the West \u2014 a major future-winner capture.",base:"A cautious tilt; resource nationalism limits the upside.",down:"MAS returns or nationalism slams the door."},
  "Guyana":{best:"The oil-boom state becomes a wealthy, firmly US-aligned partner \u2014 the purest 'small now, strategic soon' win.",base:"Close ties driven by oil and the Venezuela threat.",down:"The Essequibo dispute escalates into open conflict."},
  "Chile":{best:"Kast aligns a major copper/lithium producer with the US bloc.",base:"A modest tilt; Chile's institutions moderate it.",down:"The alignment proves shallow or short-lived."},
  "Peru":{best:"A stable Andean security-and-minerals partner.",base:"Cooperation amid chronic instability.",down:"Political chaos makes any alignment unreliable."},
  "Cuba":{best:"Pressure forces a transition to a non-hostile government \u2014 the Caribbean foothold closes for good.",base:"A weakened regime hangs on; sanctions bite without toppling it.",down:"Humanitarian collapse triggers a mass-migration crisis that lands on the US."},
  "Russia":{best:"A Ukraine settlement Trump can credibly claim, plus a managed reset that splits Russia from China.",base:"A frozen conflict and partial, fragile normalization.",down:"Putin pockets concessions, gains on the battlefield, and US global credibility takes a major hit."},
  "Belarus":{best:"Marginal opening via prisoner diplomacy.",base:"Nominal contact.",down:"Remains a Russian satellite."},
  "Syria":{best:"The post-Assad government stabilizes as a non-hostile, sanctions-relieved state \u2014 a strategic gain from a former adversary.",base:"A fragile transition with partial US influence.",down:"The new order collapses into renewed civil conflict."},
  "Serbia":{best:"Tilts modestly toward the US/EU on the strength of business ties.",base:"Continues balancing all sides.",down:"Drifts further toward Russia and China."},
  "Rwanda":{best:"Honors the deal, reins in M23, and the regional peace holds.",base:"Nominal compliance while M23 support quietly continues.",down:"Backing for M23 collapses the peace and the minerals deal with it."},
  "Taiwan":{best:"Arms-plus-ambiguity successfully deters Beijing through the 2027 window; the status quo holds.",base:"Sustained tension without conflict; deterrence untested but intact.",down:"Deterrence fails \u2014 a blockade or strike on Taiwan, the defining crisis of the era."},
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
  "Ukraine":{best:"A settlement preserves a sovereign, rebuildable Ukraine.",base:"A frozen conflict on disadvantageous terms.",down:"Abandonment leads to partition or collapse \u2014 a signal to allies worldwide."},
  "Georgia":{best:"A democratic course-correction reopens Western ties.",base:"Continued drift toward Moscow.",down:"Full absorption into Russia's orbit."},
  "Japan":{best:"Burden-shifting succeeds: a rearmed, capable Japan deepens the alliance.",base:"A formally intact alliance with quiet hedging.",down:"Eroded trust pushes Japan toward genuine strategic independence."},
  "South Korea":{best:"A stronger, more capable ally that still anchors to the US.",base:"An intact alliance amid autonomy-seeking.",down:"Doubt about US reliability drives independent \u2014 even nuclear \u2014 hedging."},
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
  "Iran":{best:"A settlement verifiably ends the nuclear program \u2014 a historic win.",base:"A degraded but resilient Iran; simmering confrontation.",down:"A wider war, a closed Hormuz, and a global energy shock."},
  "China":{best:"Stable managed competition; deterrence holds and the US gains relative ground.",base:"A managed rivalry \u2014 stabilized truce, no decisive edge.",down:"Escalation to conflict, most likely over Taiwan."},
  "North Korea":{best:"A freeze or confidence-building deal caps the program.",base:"No change; the program advances.",down:"A provocation or proliferation crisis."},
  "Nicaragua":{best:"Regime change opens a path to normalization.",base:"Continued authoritarian hostility.",down:"Deeper alignment with Russia and China on the US doorstep."},
  "Yemen":{best:"Houthi shipping attacks are deterred and Red Sea traffic recovers.",base:"Episodic strikes contain the threat.",down:"Sustained disruption of a global trade artery."},
  "Mali":{best:"A future government re-opens to the West.",base:"Stays in the Russian orbit.",down:"A permanent Russian foothold and spreading instability."},
  "Burkina Faso":{best:"A course-correction reopens engagement.",base:"Stays Russia-aligned.",down:"Deepening Sahel instability and extremist gains."},
  "Niger":{best:"A future government restores security cooperation and base access.",base:"Stays Russia-aligned; the US foothold stays lost.",down:"A permanent strategic loss in the central Sahel."},
  "Afghanistan":{best:"Limited counterterrorism understandings emerge.",base:"No normal relations.",down:"A renewed terrorist safe haven."},
  "Myanmar":{best:"A transition reopens the door to engagement.",base:"Continued isolation.",down:"Deeper dependence on China amid civil war."},
  "United States of America":{best:"\u2014",base:"\u2014",down:"\u2014"}
};
