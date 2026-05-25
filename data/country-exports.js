/* =====================================================================
   Foreign Policy Atlas — country-level reference data: top exports.

   Pure reference (not per-president), so it lives in its own file and is
   loaded once. Each entry is the country's three largest exports by value,
   approximated from OEC / World Bank-style rankings. The point is a
   glanceable economic-shape cue beside the country name, not a sourced
   claim — so coarse buckets (e.g. one icon for "crude oil") are fine.

   Schema: window.COUNTRY_EXPORTS[<dossier key>] = [
     { sym: "<emoji>", label: "<plain-text export name>" }, ...   // 3 items
   ]

   Keys must match the dossier key (i.e. what keyFor() resolves to). For
   countries with name-mismatches handled by the ALIAS table in app.js,
   key against the dossier side, not the map side.
   ===================================================================== */

window.COUNTRY_EXPORTS = {

  /* --- Americas --------------------------------------------------------- */
  "United States of America": [
    {sym:"⚗️", label:"Refined petroleum"},
    {sym:"✈️", label:"Aircraft"},
    {sym:"⚙️", label:"Machinery"}
  ],
  "Canada":      [{sym:"🛢️",label:"Crude oil"},{sym:"🚗",label:"Cars"},{sym:"🪵",label:"Wood / lumber"}],
  "Mexico":      [{sym:"🚗",label:"Cars"},{sym:"💻",label:"Electronics"},{sym:"🛢️",label:"Crude oil"}],
  "Belize":      [{sym:"🍬",label:"Sugar"},{sym:"🍌",label:"Bananas"},{sym:"🍊",label:"Citrus"}],
  "Costa Rica":  [{sym:"🩺",label:"Medical instruments"},{sym:"🍌",label:"Bananas"},{sym:"🍍",label:"Pineapples"}],
  "El Salvador": [{sym:"👕",label:"Garments"},{sym:"🍬",label:"Sugar"},{sym:"☕",label:"Coffee"}],
  "Guatemala":   [{sym:"🍌",label:"Bananas"},{sym:"🍬",label:"Sugar"},{sym:"☕",label:"Coffee"}],
  "Honduras":    [{sym:"👕",label:"Garments"},{sym:"☕",label:"Coffee"},{sym:"🍌",label:"Bananas"}],
  "Nicaragua":   [{sym:"👕",label:"Garments"},{sym:"☕",label:"Coffee"},{sym:"🪙",label:"Gold"}],
  "Panama":      [{sym:"⚗️",label:"Refined petroleum"},{sym:"🐟",label:"Fish"},{sym:"🍌",label:"Bananas"}],
  "Cuba":        [{sym:"🚬",label:"Cigars"},{sym:"🍬",label:"Sugar"},{sym:"🔩",label:"Nickel"}],
  "Dominican Republic":[{sym:"🪙",label:"Gold"},{sym:"🩺",label:"Medical instruments"},{sym:"🚬",label:"Cigars"}],
  "Haiti":       [{sym:"👕",label:"Garments"},{sym:"🛢️",label:"Re-exported oil"},{sym:"🥭",label:"Mangoes"}],
  "Jamaica":     [{sym:"🔩",label:"Alumina / bauxite"},{sym:"⚗️",label:"Refined petroleum"},{sym:"🥃",label:"Rum"}],
  "Trinidad and Tobago":[{sym:"⛽",label:"Natural gas"},{sym:"🛢️",label:"Crude oil"},{sym:"🌱",label:"Ammonia"}],

  "Argentina":   [{sym:"🫘",label:"Soybean meal"},{sym:"🌽",label:"Corn"},{sym:"🥩",label:"Beef"}],
  "Bolivia":     [{sym:"⛽",label:"Natural gas"},{sym:"🪙",label:"Gold"},{sym:"🔩",label:"Zinc"}],
  "Brazil":      [{sym:"🫘",label:"Soybeans"},{sym:"⛏️",label:"Iron ore"},{sym:"🛢️",label:"Crude oil"}],
  "Chile":       [{sym:"🔩",label:"Copper"},{sym:"🐟",label:"Salmon / fish"},{sym:"🍇",label:"Fruit"}],
  "Colombia":    [{sym:"🛢️",label:"Crude oil"},{sym:"☕",label:"Coffee"},{sym:"🪨",label:"Coal"}],
  "Ecuador":     [{sym:"🛢️",label:"Crude oil"},{sym:"🍌",label:"Bananas"},{sym:"🍤",label:"Shrimp"}],
  "Guyana":      [{sym:"🛢️",label:"Crude oil"},{sym:"🪙",label:"Gold"},{sym:"🍚",label:"Rice"}],
  "Paraguay":    [{sym:"🫘",label:"Soybeans"},{sym:"🥩",label:"Beef"},{sym:"⚡",label:"Electricity"}],
  "Peru":        [{sym:"🔩",label:"Copper"},{sym:"🪙",label:"Gold"},{sym:"🐟",label:"Fishmeal"}],
  "Uruguay":     [{sym:"🥩",label:"Beef"},{sym:"🫘",label:"Soybeans"},{sym:"🪵",label:"Wood pulp"}],
  "Venezuela":   [{sym:"🛢️",label:"Crude oil"},{sym:"🪙",label:"Gold"},{sym:"⚗️",label:"Refined petroleum"}],

  /* --- Europe ----------------------------------------------------------- */
  "United Kingdom":[{sym:"🚗",label:"Cars"},{sym:"⚙️",label:"Machinery"},{sym:"💊",label:"Pharmaceuticals"}],
  "France":      [{sym:"✈️",label:"Aircraft"},{sym:"⚙️",label:"Machinery"},{sym:"💊",label:"Pharmaceuticals"}],
  "Germany":     [{sym:"🚗",label:"Cars"},{sym:"⚙️",label:"Machinery"},{sym:"💊",label:"Pharmaceuticals"}],
  "Italy":       [{sym:"⚙️",label:"Machinery"},{sym:"💊",label:"Pharmaceuticals"},{sym:"🚗",label:"Cars"}],
  "Spain":       [{sym:"🚗",label:"Cars"},{sym:"⚗️",label:"Refined petroleum"},{sym:"💊",label:"Pharmaceuticals"}],
  "Portugal":    [{sym:"🚗",label:"Cars"},{sym:"⚙️",label:"Machinery"},{sym:"👞",label:"Footwear"}],
  "Netherlands": [{sym:"⚙️",label:"Machinery"},{sym:"⚗️",label:"Refined petroleum"},{sym:"💻",label:"Electronics"}],
  "Belgium":     [{sym:"💊",label:"Pharmaceuticals"},{sym:"🚗",label:"Cars"},{sym:"💎",label:"Diamonds"}],
  "Ireland":     [{sym:"💊",label:"Pharmaceuticals"},{sym:"💻",label:"Electronics"},{sym:"🩺",label:"Medical instruments"}],
  "Switzerland": [{sym:"💊",label:"Pharmaceuticals"},{sym:"🪙",label:"Gold"},{sym:"⌚",label:"Watches"}],
  "Austria":     [{sym:"⚙️",label:"Machinery"},{sym:"🚗",label:"Cars / parts"},{sym:"💊",label:"Pharmaceuticals"}],
  "Denmark":     [{sym:"💊",label:"Pharmaceuticals"},{sym:"⚙️",label:"Machinery"},{sym:"🥩",label:"Meat"}],
  "Norway":      [{sym:"🛢️",label:"Crude oil"},{sym:"⛽",label:"Natural gas"},{sym:"🐟",label:"Fish / salmon"}],
  "Sweden":      [{sym:"🚗",label:"Cars"},{sym:"⚙️",label:"Machinery"},{sym:"📱",label:"Telecom equipment"}],
  "Finland":     [{sym:"📄",label:"Paper / pulp"},{sym:"⚙️",label:"Machinery"},{sym:"⚗️",label:"Refined petroleum"}],
  "Greenland":   [{sym:"🐟",label:"Fish"},{sym:"🍤",label:"Shrimp / crustaceans"},{sym:"⛏️",label:"Minerals"}],
  "Poland":      [{sym:"🚗",label:"Cars / parts"},{sym:"⚙️",label:"Machinery"},{sym:"🔋",label:"Batteries"}],
  "Czechia":     [{sym:"🚗",label:"Cars"},{sym:"⚙️",label:"Machinery"},{sym:"💻",label:"Computers"}],
  "Slovakia":    [{sym:"🚗",label:"Cars"},{sym:"💻",label:"Electronics"},{sym:"⚙️",label:"Machinery"}],
  "Hungary":     [{sym:"🚗",label:"Cars"},{sym:"💻",label:"Electronics"},{sym:"⚙️",label:"Machinery"}],
  "Romania":     [{sym:"🚗",label:"Cars / parts"},{sym:"⚙️",label:"Machinery"},{sym:"📱",label:"Electronics"}],
  "Bulgaria":    [{sym:"⚗️",label:"Refined petroleum"},{sym:"🔩",label:"Copper"},{sym:"🌾",label:"Wheat"}],
  "Greece":      [{sym:"⚗️",label:"Refined petroleum"},{sym:"💊",label:"Pharmaceuticals"},{sym:"🐟",label:"Fish"}],
  "Serbia":      [{sym:"🚗",label:"Cars / parts"},{sym:"🔌",label:"Electrical equipment"},{sym:"⚙️",label:"Machinery"}],
  "Moldova":     [{sym:"🔌",label:"Insulated wire"},{sym:"🌻",label:"Sunflower seeds"},{sym:"🍷",label:"Wine"}],

  /* --- Eurasia / Caucasus / Central Asia ------------------------------- */
  "Russia":      [{sym:"🛢️",label:"Crude oil"},{sym:"⛽",label:"Natural gas"},{sym:"🌾",label:"Wheat"}],
  "Ukraine":     [{sym:"🌽",label:"Corn"},{sym:"🌻",label:"Sunflower oil"},{sym:"⛏️",label:"Iron ore"}],
  "Belarus":     [{sym:"⚗️",label:"Refined petroleum"},{sym:"🌱",label:"Fertilizers"},{sym:"🧀",label:"Dairy"}],
  "Georgia":     [{sym:"🔩",label:"Copper / ferroalloys"},{sym:"🚗",label:"Re-exported cars"},{sym:"🍷",label:"Wine"}],
  "Armenia":     [{sym:"🔩",label:"Copper ore"},{sym:"🪙",label:"Gold"},{sym:"🚬",label:"Rolled tobacco"}],
  "Azerbaijan":  [{sym:"🛢️",label:"Crude oil"},{sym:"⛽",label:"Natural gas"},{sym:"⚗️",label:"Refined petroleum"}],
  "Kazakhstan":  [{sym:"🛢️",label:"Crude oil"},{sym:"🔩",label:"Copper"},{sym:"☢️",label:"Uranium"}],
  "Kyrgyzstan":  [{sym:"🪙",label:"Gold"},{sym:"⚗️",label:"Refined petroleum"},{sym:"🥬",label:"Vegetables"}],
  "Tajikistan":  [{sym:"🪙",label:"Gold"},{sym:"🔩",label:"Aluminum"},{sym:"🧵",label:"Cotton"}],
  "Turkmenistan":[{sym:"⛽",label:"Natural gas"},{sym:"⚗️",label:"Refined petroleum"},{sym:"🧵",label:"Cotton"}],
  "Uzbekistan":  [{sym:"🪙",label:"Gold"},{sym:"⛽",label:"Natural gas"},{sym:"🧵",label:"Cotton"}],
  "Mongolia":    [{sym:"🪨",label:"Coal"},{sym:"🔩",label:"Copper"},{sym:"⛏️",label:"Iron ore"}],

  /* --- Middle East / North Africa -------------------------------------- */
  "Turkey":      [{sym:"🚗",label:"Cars"},{sym:"⚙️",label:"Machinery"},{sym:"🪙",label:"Gold"}],
  "Saudi Arabia":[{sym:"🛢️",label:"Crude oil"},{sym:"⛽",label:"Natural gas"},{sym:"🧪",label:"Petrochemicals"}],
  "Iran":        [{sym:"🛢️",label:"Crude oil"},{sym:"⛽",label:"Natural gas"},{sym:"🧪",label:"Petrochemicals"}],
  "Iraq":        [{sym:"🛢️",label:"Crude oil"},{sym:"⛽",label:"Natural gas"},{sym:"🌴",label:"Dates"}],
  "Israel":      [{sym:"💎",label:"Diamonds"},{sym:"💻",label:"Electronics / chips"},{sym:"💊",label:"Pharmaceuticals"}],
  "Jordan":      [{sym:"🌱",label:"Fertilizers"},{sym:"👕",label:"Garments"},{sym:"💊",label:"Pharmaceuticals"}],
  "Lebanon":     [{sym:"🪙",label:"Gold"},{sym:"💍",label:"Jewelry"},{sym:"🔩",label:"Copper"}],
  "Syria":       [{sym:"🛢️",label:"Crude oil"},{sym:"🍊",label:"Fruit"},{sym:"🌶️",label:"Spices"}],
  "Yemen":       [{sym:"🛢️",label:"Crude oil"},{sym:"🐟",label:"Fish"},{sym:"🪙",label:"Gold"}],
  "Kuwait":      [{sym:"🛢️",label:"Crude oil"},{sym:"⚗️",label:"Refined petroleum"},{sym:"⛽",label:"Natural gas"}],
  "Bahrain":     [{sym:"🔩",label:"Aluminum"},{sym:"⚗️",label:"Refined petroleum"},{sym:"⛏️",label:"Iron"}],
  "Qatar":       [{sym:"⛽",label:"Natural gas"},{sym:"🛢️",label:"Crude oil"},{sym:"🌱",label:"Ammonia"}],
  "Oman":        [{sym:"🛢️",label:"Crude oil"},{sym:"⛽",label:"Natural gas"},{sym:"⚗️",label:"Refined petroleum"}],
  "United Arab Emirates":[{sym:"🛢️",label:"Crude oil"},{sym:"🪙",label:"Gold"},{sym:"💍",label:"Jewelry"}],
  "Egypt":       [{sym:"🛢️",label:"Crude oil"},{sym:"🪙",label:"Gold"},{sym:"🌱",label:"Fertilizers"}],
  "Libya":       [{sym:"🛢️",label:"Crude oil"},{sym:"⛽",label:"Natural gas"},{sym:"🪙",label:"Gold"}],
  "Tunisia":     [{sym:"👕",label:"Garments"},{sym:"🔌",label:"Electrical equipment"},{sym:"🛢️",label:"Crude oil"}],
  "Algeria":     [{sym:"⛽",label:"Natural gas"},{sym:"🛢️",label:"Crude oil"},{sym:"⚗️",label:"Refined petroleum"}],
  "Morocco":     [{sym:"🚗",label:"Cars"},{sym:"🌱",label:"Fertilizers"},{sym:"👕",label:"Garments"}],
  "Mauritania":  [{sym:"⛏️",label:"Iron ore"},{sym:"🐟",label:"Fish"},{sym:"🪙",label:"Gold"}],

  /* --- Sub-Saharan Africa ---------------------------------------------- */
  "Nigeria":     [{sym:"🛢️",label:"Crude oil"},{sym:"⛽",label:"Natural gas"},{sym:"🍫",label:"Cocoa"}],
  "Ghana":       [{sym:"🪙",label:"Gold"},{sym:"🛢️",label:"Crude oil"},{sym:"🍫",label:"Cocoa"}],
  "Senegal":     [{sym:"🪙",label:"Gold"},{sym:"⚗️",label:"Refined petroleum"},{sym:"🐟",label:"Fish"}],
  "Mali":        [{sym:"🪙",label:"Gold"},{sym:"🧵",label:"Cotton"},{sym:"🌱",label:"Fertilizer inputs"}],
  "Burkina Faso":[{sym:"🪙",label:"Gold"},{sym:"🧵",label:"Cotton"},{sym:"🔩",label:"Zinc"}],
  "Niger":       [{sym:"🪙",label:"Gold"},{sym:"☢️",label:"Uranium"},{sym:"🛢️",label:"Crude oil"}],
  "Guinea":      [{sym:"⛏️",label:"Bauxite"},{sym:"🪙",label:"Gold"},{sym:"🔩",label:"Aluminum"}],
  "Liberia":     [{sym:"🚢",label:"Flag-of-convenience shipping"},{sym:"⛏️",label:"Iron ore"},{sym:"🌳",label:"Rubber"}],
  "Sudan":       [{sym:"🪙",label:"Gold"},{sym:"🌰",label:"Sesame"},{sym:"🐐",label:"Livestock"}],
  "Somalia":     [{sym:"🐐",label:"Livestock"},{sym:"🌰",label:"Sesame"},{sym:"🪙",label:"Gold"}],
  "Ethiopia":    [{sym:"☕",label:"Coffee"},{sym:"🪙",label:"Gold"},{sym:"🥬",label:"Vegetables / pulses"}],
  "Kenya":       [{sym:"🍵",label:"Tea"},{sym:"💐",label:"Cut flowers"},{sym:"☕",label:"Coffee"}],
  "Rwanda":      [{sym:"🪙",label:"Gold"},{sym:"☕",label:"Coffee"},{sym:"🍵",label:"Tea"}],
  "Dem. Rep. Congo":[{sym:"🔩",label:"Copper"},{sym:"🔋",label:"Cobalt"},{sym:"🪙",label:"Gold"}],
  "Angola":      [{sym:"🛢️",label:"Crude oil"},{sym:"💎",label:"Diamonds"},{sym:"⚗️",label:"Refined petroleum"}],
  "Zambia":      [{sym:"🔩",label:"Copper"},{sym:"🪙",label:"Gold"},{sym:"🧪",label:"Sulfuric acid"}],
  "South Africa":[{sym:"🪙",label:"Gold"},{sym:"💍",label:"Platinum"},{sym:"🚗",label:"Cars"}],

  /* --- South Asia ------------------------------------------------------- */
  "Afghanistan": [{sym:"🪨",label:"Coal"},{sym:"🪙",label:"Gold"},{sym:"🍇",label:"Grapes / dried fruit"}],
  "Pakistan":    [{sym:"🧵",label:"Textiles"},{sym:"🍚",label:"Rice"},{sym:"👕",label:"Garments"}],
  "India":       [{sym:"⚗️",label:"Refined petroleum"},{sym:"💎",label:"Gems / jewelry"},{sym:"💊",label:"Pharmaceuticals"}],
  "Bangladesh":  [{sym:"👕",label:"Garments"},{sym:"🧵",label:"Textiles"},{sym:"🐟",label:"Frozen fish / shrimp"}],
  "Sri Lanka":   [{sym:"🍵",label:"Tea"},{sym:"👕",label:"Garments"},{sym:"🛞",label:"Rubber products"}],
  "Nepal":       [{sym:"🌴",label:"Palm oil (re-export)"},{sym:"🛢️",label:"Soybean oil (re-export)"},{sym:"🧶",label:"Carpets"}],

  /* --- East / Southeast Asia & Oceania --------------------------------- */
  "China":       [{sym:"💻",label:"Electronics"},{sym:"⚙️",label:"Machinery"},{sym:"🔌",label:"Integrated circuits"}],
  "Japan":       [{sym:"🚗",label:"Cars"},{sym:"⚙️",label:"Machinery"},{sym:"💻",label:"Electronics"}],
  "South Korea": [{sym:"🔌",label:"Semiconductors"},{sym:"🚗",label:"Cars"},{sym:"🚢",label:"Ships"}],
  "North Korea": [{sym:"🪨",label:"Coal"},{sym:"⛏️",label:"Iron ore"},{sym:"👕",label:"Textiles"}],
  "Taiwan":      [{sym:"🔌",label:"Semiconductors"},{sym:"💻",label:"Electronics"},{sym:"⚙️",label:"Machinery"}],
  "Philippines": [{sym:"💻",label:"Electronics"},{sym:"⚙️",label:"Machinery"},{sym:"🪙",label:"Gold"}],
  "Vietnam":     [{sym:"💻",label:"Electronics"},{sym:"👕",label:"Textiles / garments"},{sym:"👟",label:"Footwear"}],
  "Thailand":    [{sym:"💻",label:"Electronics"},{sym:"🚗",label:"Cars"},{sym:"🛞",label:"Rubber"}],
  "Malaysia":    [{sym:"💻",label:"Electronics"},{sym:"🌴",label:"Palm oil"},{sym:"⛽",label:"Natural gas"}],
  "Singapore":   [{sym:"🔌",label:"Integrated circuits"},{sym:"⚗️",label:"Refined petroleum"},{sym:"⚙️",label:"Machinery"}],
  "Indonesia":   [{sym:"🪨",label:"Coal"},{sym:"🌴",label:"Palm oil"},{sym:"⛏️",label:"Iron / steel"}],
  "Cambodia":    [{sym:"👕",label:"Garments"},{sym:"👟",label:"Footwear"},{sym:"💻",label:"Electronics"}],
  "Myanmar":     [{sym:"⛽",label:"Natural gas"},{sym:"👕",label:"Garments"},{sym:"🌿",label:"Vegetables / pulses"}],
  "Australia":   [{sym:"⛏️",label:"Iron ore"},{sym:"🪨",label:"Coal"},{sym:"⛽",label:"Natural gas"}],
  "New Zealand": [{sym:"🥛",label:"Dairy"},{sym:"🥩",label:"Meat"},{sym:"🪵",label:"Wood"}],
  "Papua New Guinea":[{sym:"⛽",label:"Natural gas"},{sym:"🪙",label:"Gold"},{sym:"🔩",label:"Copper"}],
  "Fiji":        [{sym:"💧",label:"Bottled water"},{sym:"🐟",label:"Fish"},{sym:"🍬",label:"Sugar"}],

  /* --- Round 2: filling the rest of the world map --- */

  /* Europe — Baltics, Balkans, micro-states, Iceland */
  "Iceland":     [{sym:"🔩",label:"Aluminum"},{sym:"🐟",label:"Fish"},{sym:"⛏️",label:"Ferroalloys"}],
  "Estonia":     [{sym:"💻",label:"Electronics"},{sym:"⚗️",label:"Refined petroleum"},{sym:"🪵",label:"Wood"}],
  "Latvia":      [{sym:"🪵",label:"Wood"},{sym:"⚙️",label:"Machinery"},{sym:"📱",label:"Electronics"}],
  "Lithuania":   [{sym:"⚗️",label:"Refined petroleum"},{sym:"🛋️",label:"Furniture"},{sym:"⚙️",label:"Machinery"}],
  "Slovenia":    [{sym:"🚗",label:"Cars"},{sym:"💊",label:"Pharmaceuticals"},{sym:"⚙️",label:"Machinery"}],
  "Croatia":     [{sym:"⚗️",label:"Refined petroleum"},{sym:"⚡",label:"Electricity"},{sym:"💊",label:"Medicines"}],
  "Bosnia and Herzegovina":[{sym:"🔩",label:"Aluminum"},{sym:"⚡",label:"Electricity"},{sym:"👞",label:"Footwear"}],
  "Bosnia and Herz.":[{sym:"🔩",label:"Aluminum"},{sym:"⚡",label:"Electricity"},{sym:"👞",label:"Footwear"}],
  "North Macedonia":[{sym:"🧪",label:"Catalysts"},{sym:"🚗",label:"Car parts"},{sym:"⛏️",label:"Ferroalloys"}],
  "Albania":     [{sym:"👞",label:"Footwear"},{sym:"👕",label:"Garments"},{sym:"⛏️",label:"Chromium / ore"}],
  "Montenegro":  [{sym:"🔩",label:"Aluminum"},{sym:"⚡",label:"Electricity"},{sym:"⛽",label:"Mineral fuels"}],
  "Kosovo":      [{sym:"🔩",label:"Base metals / scrap"},{sym:"⚗️",label:"Refined petroleum"},{sym:"⛏️",label:"Ferro-nickel"}],
  "Cyprus":      [{sym:"🚢",label:"Ships"},{sym:"💻",label:"Computers"},{sym:"💊",label:"Pharmaceuticals"}],
  "N. Cyprus":   [{sym:"🍊",label:"Citrus"},{sym:"🧀",label:"Dairy"},{sym:"👕",label:"Garments"}],
  "Luxembourg":  [{sym:"⛏️",label:"Iron / steel"},{sym:"🛞",label:"Rubber / tires"},{sym:"⚙️",label:"Machinery"}],
  "Malta":       [{sym:"🔌",label:"Integrated circuits"},{sym:"⚗️",label:"Refined petroleum"},{sym:"💊",label:"Pharmaceuticals"}],

  /* Sub-Saharan Africa — full sweep */
  "Sierra Leone":[{sym:"⛏️",label:"Iron / titanium ore"},{sym:"💎",label:"Diamonds"},{sym:"🪙",label:"Gold"}],
  "Guinea-Bissau":[{sym:"🌰",label:"Cashews"},{sym:"🪵",label:"Timber"},{sym:"🐟",label:"Fish"}],
  "Gambia":      [{sym:"🌰",label:"Cashews"},{sym:"🐟",label:"Fish"},{sym:"⚗️",label:"Refined petroleum"}],
  "The Gambia":  [{sym:"🌰",label:"Cashews"},{sym:"🐟",label:"Fish"},{sym:"⚗️",label:"Refined petroleum"}],
  "Côte d'Ivoire":[{sym:"🍫",label:"Cocoa"},{sym:"🪙",label:"Gold"},{sym:"🌰",label:"Cashews"}],
  "Ivory Coast": [{sym:"🍫",label:"Cocoa"},{sym:"🪙",label:"Gold"},{sym:"🌰",label:"Cashews"}],
  "Togo":        [{sym:"⚗️",label:"Refined petroleum (re-export)"},{sym:"🪙",label:"Gold"},{sym:"🧵",label:"Cotton"}],
  "Benin":       [{sym:"🧵",label:"Cotton"},{sym:"🪙",label:"Gold"},{sym:"🫘",label:"Soybeans"}],
  "Cameroon":    [{sym:"🛢️",label:"Crude oil"},{sym:"🍫",label:"Cocoa"},{sym:"🪵",label:"Wood"}],
  "Central African Republic":[{sym:"🪙",label:"Gold"},{sym:"💎",label:"Diamonds"},{sym:"🪵",label:"Wood"}],
  "Central African Rep.":[{sym:"🪙",label:"Gold"},{sym:"💎",label:"Diamonds"},{sym:"🪵",label:"Wood"}],
  "Chad":        [{sym:"🛢️",label:"Crude oil"},{sym:"🪙",label:"Gold"},{sym:"🐐",label:"Livestock"}],
  "Republic of Congo":[{sym:"🛢️",label:"Crude oil"},{sym:"🔩",label:"Copper"},{sym:"🪵",label:"Wood"}],
  "Congo":       [{sym:"🛢️",label:"Crude oil"},{sym:"🔩",label:"Copper"},{sym:"🪵",label:"Wood"}],
  "Gabon":       [{sym:"🛢️",label:"Crude oil"},{sym:"⛏️",label:"Manganese"},{sym:"🪵",label:"Wood"}],
  "Equatorial Guinea":[{sym:"🛢️",label:"Crude oil"},{sym:"⛽",label:"Natural gas"},{sym:"🧪",label:"Methanol"}],
  "Eq. Guinea":  [{sym:"🛢️",label:"Crude oil"},{sym:"⛽",label:"Natural gas"},{sym:"🧪",label:"Methanol"}],
  "Eritrea":     [{sym:"🔩",label:"Zinc / copper"},{sym:"⚗️",label:"Refined petroleum"},{sym:"🐟",label:"Fish"}],
  "Djibouti":    [{sym:"🐐",label:"Livestock (re-export)"},{sym:"⚡",label:"Electricity"},{sym:"🪙",label:"Gold (re-export)"}],
  "South Sudan": [{sym:"🛢️",label:"Crude oil"},{sym:"🪵",label:"Wood"},{sym:"🐐",label:"Livestock"}],
  "S. Sudan":    [{sym:"🛢️",label:"Crude oil"},{sym:"🪵",label:"Wood"},{sym:"🐐",label:"Livestock"}],
  "Uganda":      [{sym:"🪙",label:"Gold"},{sym:"☕",label:"Coffee"},{sym:"🐟",label:"Fish"}],
  "Tanzania":    [{sym:"🪙",label:"Gold"},{sym:"🚬",label:"Tobacco"},{sym:"☕",label:"Coffee"}],
  "Mozambique":  [{sym:"🔩",label:"Aluminum"},{sym:"🪨",label:"Coal"},{sym:"⛽",label:"Natural gas"}],
  "Madagascar":  [{sym:"🔩",label:"Nickel"},{sym:"🌸",label:"Vanilla"},{sym:"👕",label:"Garments"}],
  "Botswana":    [{sym:"💎",label:"Diamonds"},{sym:"🥩",label:"Beef"},{sym:"🔩",label:"Copper"}],
  "Namibia":     [{sym:"💎",label:"Diamonds"},{sym:"☢️",label:"Uranium"},{sym:"🐟",label:"Fish"}],
  "Zimbabwe":    [{sym:"🪙",label:"Gold"},{sym:"🚬",label:"Tobacco"},{sym:"⛏️",label:"Ferroalloys"}],
  "Malawi":      [{sym:"🚬",label:"Tobacco"},{sym:"🍵",label:"Tea"},{sym:"🍬",label:"Sugar"}],
  "Lesotho":     [{sym:"💎",label:"Diamonds"},{sym:"👕",label:"Garments"},{sym:"💧",label:"Water"}],
  "Eswatini":    [{sym:"🍬",label:"Sugar"},{sym:"🪵",label:"Wood pulp"},{sym:"👕",label:"Garments"}],
  "Swaziland":   [{sym:"🍬",label:"Sugar"},{sym:"🪵",label:"Wood pulp"},{sym:"👕",label:"Garments"}],
  "Burundi":     [{sym:"🪙",label:"Gold"},{sym:"☕",label:"Coffee"},{sym:"🍵",label:"Tea"}],
  "W. Sahara":   [{sym:"⛏️",label:"Phosphates"},{sym:"🐟",label:"Fish"},{sym:"🐐",label:"Livestock"}],
  "Western Sahara":[{sym:"⛏️",label:"Phosphates"},{sym:"🐟",label:"Fish"},{sym:"🐐",label:"Livestock"}],

  /* Middle East — fill */
  "Palestine":   [{sym:"🪨",label:"Stone / building materials"},{sym:"🌿",label:"Vegetables / olive oil"},{sym:"🧪",label:"Plastics"}],

  /* South / Southeast Asia — fill */
  "Bhutan":      [{sym:"⚡",label:"Electricity"},{sym:"🔩",label:"Ferroalloys"},{sym:"🪨",label:"Cement / stone"}],
  "Maldives":    [{sym:"🐟",label:"Fish"},{sym:"⚗️",label:"Refined petroleum (re-export)"},{sym:"🏝️",label:"Tourism services"}],
  "Laos":        [{sym:"⚡",label:"Electricity"},{sym:"🔩",label:"Copper"},{sym:"🪙",label:"Gold"}],
  "Brunei":      [{sym:"⛽",label:"Natural gas"},{sym:"🛢️",label:"Crude oil"},{sym:"🧪",label:"Methanol"}],
  "Timor-Leste": [{sym:"🛢️",label:"Crude oil"},{sym:"⛽",label:"Natural gas"},{sym:"☕",label:"Coffee"}],
  "East Timor":  [{sym:"🛢️",label:"Crude oil"},{sym:"⛽",label:"Natural gas"},{sym:"☕",label:"Coffee"}],

  /* Oceania — fill */
  "Solomon Is.": [{sym:"🪵",label:"Wood / logs"},{sym:"🐟",label:"Fish"},{sym:"🌴",label:"Palm oil"}],
  "Solomon Islands":[{sym:"🪵",label:"Wood / logs"},{sym:"🐟",label:"Fish"},{sym:"🌴",label:"Palm oil"}],
  "Vanuatu":     [{sym:"🐟",label:"Fish"},{sym:"🥥",label:"Copra / coconut"},{sym:"🪵",label:"Wood"}],
  "New Caledonia":[{sym:"⛏️",label:"Nickel ore"},{sym:"🔩",label:"Ferronickel"},{sym:"🐟",label:"Fish"}],
  "Samoa":       [{sym:"🐟",label:"Fish"},{sym:"🥥",label:"Coconut oil"},{sym:"🍌",label:"Bananas"}],

  /* Caribbean / Americas — fill */
  "Bahamas":     [{sym:"🚢",label:"Ships"},{sym:"🍤",label:"Crustaceans"},{sym:"⚗️",label:"Refined petroleum"}],
  "The Bahamas": [{sym:"🚢",label:"Ships"},{sym:"🍤",label:"Crustaceans"},{sym:"⚗️",label:"Refined petroleum"}],
  "Suriname":    [{sym:"🪙",label:"Gold"},{sym:"🛢️",label:"Crude oil"},{sym:"🪵",label:"Wood"}],
  "French Guiana":[{sym:"🚀",label:"Aerospace / rockets"},{sym:"🪙",label:"Gold"},{sym:"🐟",label:"Fish"}],
  "Falkland Is.":[{sym:"🐟",label:"Fish (squid)"},{sym:"🥩",label:"Meat"},{sym:"🧶",label:"Wool"}],
  "Falkland Islands":[{sym:"🐟",label:"Fish (squid)"},{sym:"🥩",label:"Meat"},{sym:"🧶",label:"Wool"}],
  "Puerto Rico": [{sym:"💊",label:"Pharmaceuticals"},{sym:"🩺",label:"Medical instruments"},{sym:"🧪",label:"Chemicals"}]
};
