/* =====================================================================
   Foreign Policy Atlas — application logic (president-agnostic).
   Data is supplied by data/<president>.js via the window.PRESIDENTS registry.
   This file renders whichever president is selected in the dropdown.

   Schema v3 — "President Effect" model. Two independent axes:
     state    = the COLOR — where the relationship stands today.
                core-ally | aligned | neutral | strained | adversarial | us
     effect   = the ARROW — what THIS president caused vs. the inherited
                trajectory. helped | mixed | hurt | unscored
     magnitude= modest | material | major  (only for helped/hurt)

   See CLAUDE.md for methodology and data/_example.js for a worked entry.

   Back-compat with v2 data (which used `delta` / `baseline` / "interp"):
     missing `effect`      → treated as "unscored" (no arrow, still color)
     missing `inherited`   → falls back to `baseline`
     trailing "interp" in points[] → treated as contested
     all new optional fields absent → render nothing, no errors.
   ===================================================================== */

/* ---- state config (the COLOR) — unchanged across presidents ---- */
var STATE_COLOR = {
  "core-ally":   "--s-core",
  "aligned":     "--s-aligned",
  "neutral":     "--s-neutral",
  "strained":    "--s-strained",
  "adversarial": "--s-adversarial",
  "us":          "--s-us"
};
var STATE_NAME = {
  "core-ally":   "Core ally",
  "aligned":     "Aligned",
  "neutral":     "Neutral",
  "strained":    "Strained",
  "adversarial": "Adversarial",
  "us":          "United States"
};
var STATE_DESC = {
  "core-ally":   "treaty-level or institutionally deep",
  "aligned":     "partner; moving together on most issues",
  "neutral":     "transactional; no strong pull either way",
  "strained":    "cooling, damaged, or low-engagement",
  "adversarial": "active rivalry or hostility",
  "us":          ""
};
var STATE_ORDER = ["core-ally","aligned","neutral","strained","adversarial"];

/* ---- effect config (the ARROW) — net causal effect vs. inherited trajectory ---- */
var EFFECT_ORDER = ["helped","mixed","hurt","unscored"];
var EFFECT_NAME = {
  "helped":   "Helped",
  "mixed":    "Mixed / unclear",
  "hurt":     "Hurt",
  "unscored": "Unscored"
};
/* Effect → legend glyph (small unicode for the chip; the on-map arrow geometry
   is drawn separately by appendDeltaMark). Mixed is a short bar, unscored a
   small dot. */
var EFFECT_GLYPH = {
  "helped":   "↑",
  "mixed":    "—",
  "hurt":     "↓",
  "unscored": "·"
};
var MAGNITUDE_ORDER = ["modest","material","major"];
var MAGNITUDE_NAME = {
  "modest":   "modest",
  "material": "material",
  "major":    "major"
};
var UNSCORED_REASON_NAME = {
  "noMaterialEffect":     "no material effect",
  "noPresidentialEffect": "not driven by the president",
  "systemicOnly":         "systemic forces only",
  "insufficientEvidence": "insufficient evidence"
};
/* Labels for the optional/conditional notes in a v3 dossier. Order matters:
   the dossier renders them in this sequence when present. */
var CONDITIONAL_NOTE_ORDER = [
  "durability",
  "opportunityCost",
  "escalationRisk",
  "decisionVsExecution",
  "crossTheaterTradeoff",
  "grandStrategyDispute",
  "longHorizon",
  "omissionNote"
];
var CONDITIONAL_NOTE_LABEL = {
  durability:           "Durability",
  opportunityCost:      "Opportunity cost",
  escalationRisk:       "Escalation risk",
  decisionVsExecution:  "Decision vs. execution",
  crossTheaterTradeoff: "Cross-theater trade-off",
  grandStrategyDispute: "Grand-strategy dispute",
  longHorizon:          "Long horizon",
  omissionNote:         "Omission"
};

/* The 5 levers (per CLAUDE.md). An entry's `levers` is an OBJECT keyed by
   lever id with short prose values; include only the levers that are
   relevant (checklist, not a required five). LEVER_ORDER pins the render
   order so two entries with different lever sets still read consistently. */
var LEVER_ORDER = ["security","leverage","rivalDenial","coalition","economicTech"];
var LEVER_LABEL = {
  security:     "Security / threat",
  leverage:     "Leverage / dependence",
  rivalDenial:  "Rival-denial",
  coalition:    "Coalition / institutional",
  economicTech: "Economic / tech"
};

/* ---- v3 read helpers with v2 back-compat. Use these everywhere instead of
        reading entry.effect / entry.inherited / entry.contested directly so the
        v2 fallback is centralized. ---- */
function effectOf(entry){
  if(!entry) return "unscored";
  if(entry.effect && EFFECT_NAME[entry.effect]) return entry.effect;
  return "unscored"; // v2 entries (no `effect` field) read as unscored
}
function magnitudeOf(entry){
  // Only meaningful for helped/hurt; null for everything else per CLAUDE.md.
  if(!entry) return null;
  var e=effectOf(entry);
  if(e!=="helped" && e!=="hurt") return null;
  return MAGNITUDE_NAME[entry.magnitude] ? entry.magnitude : null;
}
function inheritedOf(entry){
  // Returns the raw `inherited` value, which v3 allows to be either:
  //   - a string (single-sentence prose), or
  //   - an array of strings (one bullet per item, for entries whose inherited
  //     trajectory reads as a list of factors rather than one sentence).
  // Callers that need a flat string (AI context serialization) should pass the
  // result through inheritedTextOf().
  if(!entry) return "";
  if(entry.inherited){
    if(Array.isArray(entry.inherited) && entry.inherited.length) return entry.inherited;
    if(typeof entry.inherited === "string" && entry.inherited!=="—") return entry.inherited;
  }
  if(entry.baseline  && entry.baseline !=="—") return entry.baseline;  // v2 fallback
  return "";
}
function inheritedTextOf(entry){
  // Flattened to a single string for AI-context serialization.
  var v = inheritedOf(entry);
  if(Array.isArray(v)) return v.join(" ");
  return v || "";
}
function isContestedEntry(entry){
  if(!entry) return false;
  if(entry.contested===true) return true;
  // v2 fallback: trailing "interp" in points[]
  var pts=entry.points||[];
  return pts.length>0 && pts[pts.length-1]==="interp";
}
function pointsOf(entry){
  // Strip the trailing "interp" sentinel (v2) so it doesn't render as a point.
  var pts=(entry && entry.points)?entry.points.slice():[];
  if(pts.length && pts[pts.length-1]==="interp") pts.pop();
  return pts;
}

var ALIAS={
  "Dem. Rep. Congo":"Dem. Rep. Congo","Czech Rep.":"Czechia","Macedonia":"North Macedonia",
  "Dominican Rep.":"Dominican Republic"
};

/* ---- region label layout (shared) ---- */
// Region label anchor points (in 960x480 projection space) placed in ocean / empty areas,
// each with a target point inside the region the leader line points to.
var RLAYOUT={
  "North America":   {lx:70, ly:120, tx:200,ty:150},
  "Central America": {lx:95, ly:300, tx:225,ty:245},
  "Caribbean":       {lx:330,ly:200, tx:272,ty:238},
  "South America":   {lx:205,ly:440, tx:300,ty:340},
  "Europe":          {lx:430,ly:108, tx:495,ty:135},
  "North Africa":    {lx:445,ly:278, tx:505,ty:212},
  "Sub-Saharan Africa":{lx:455,ly:415,tx:540,ty:330},
  "Eurasia":         {lx:720,ly:26,  tx:660,ty:120},
  "Middle East":     {lx:648,ly:330, tx:585,ty:212},
  "South Asia":      {lx:735,ly:330, tx:678,ty:235},
  "East Asia":       {lx:892,ly:158, tx:792,ty:170},
  "Southeast Asia":  {lx:912,ly:330, tx:800,ty:262},
  "Oceania":         {lx:890,ly:445, tx:850,ty:360}
};


/* ---- shared UI / map state ---- */
var hiddenState={}, hiddenEffect={}, selName=null, selRegion=null, tab="country", svgSel=null;
var _zoomK=1;  // current zoom transform.k; used by paintDeltas for screen-space arrow promotion
var _panMoved=false;  // true if the current pointer interaction has moved (drag), so the trailing .panbg click is suppressed
var ALLFEATS=null, REGIONFEATS=null, FEATFORKEY=null, nameToFeat={}, gOut=null, gD=null, geoPath=null;

/* ---- current-president state (reassigned by loadPresident) ---- */
var CURRENT=null, DOSSIER={}, REGIONS={}, OUTCOMES={}, regionOf={}, allKeys=[];

function presidentList(){ return Object.keys(window.PRESIDENTS||{}); }

function loadPresident(id){
  CURRENT=id;
  var P=window.PRESIDENTS[id]||{};
  DOSSIER=P.dossier||{}; REGIONS=P.regions||{}; OUTCOMES=P.outcomes||{};
  regionOf={};
  Object.keys(DOSSIER).forEach(function(k){ if(k!=="Venezuela_note") regionOf[k]=DOSSIER[k].region; });
  allKeys=Object.keys(DOSSIER).filter(function(k){ return k!=="Venezuela_note"; });
}

function keyFor(n){ if(ALIAS[n]&&DOSSIER[ALIAS[n]])return ALIAS[n]; if(DOSSIER[n])return n; return null; }
function cssv(v){return getComputedStyle(document.documentElement).getPropertyValue(v).trim();}


/* ---- legend with two rows (state + effect) and live counts ----------
   State row is unchanged. The second row is the v3 EFFECT axis (helped /
   mixed / hurt / unscored), with a president-agnostic label derived from
   P.subject (e.g. "Trump's effect"). v2 entries with no `effect` field
   count toward Unscored.                                              */
function buildLegend(){
  var L=document.getElementById("legend");
  L.innerHTML="";
  var P=window.PRESIDENTS[CURRENT]||{};

  // count distribution (skip Venezuela_note and the US entry)
  var sc={}, ec={};
  Object.keys(DOSSIER).forEach(function(k){
    if(k==="Venezuela_note") return;
    var d=DOSSIER[k];
    if(!d || d.state==="us") return;
    sc[d.state]=(sc[d.state]||0)+1;
    var e=effectOf(d);
    ec[e]=(ec[e]||0)+1;
  });

  // ----- state row -----
  var rowS=document.createElement("div"); rowS.className="legrow";
  var lblS=document.createElement("span"); lblS.className="leglabel"; lblS.textContent="State";
  rowS.appendChild(lblS);
  STATE_ORDER.forEach(function(s){
    var b=document.createElement("button");
    b.innerHTML='<span class="sw" style="background:var('+STATE_COLOR[s]+')"></span>'+
                STATE_NAME[s]+'<span class="count">'+(sc[s]||0)+'</span>';
    if(hiddenState[s]) b.classList.add("dim");
    b.onclick=function(){
      hiddenState[s]=!hiddenState[s];
      b.classList.toggle("dim",!!hiddenState[s]);
      paint(); paintDeltas();
    };
    rowS.appendChild(b);
  });
  L.appendChild(rowS);

  // ----- effect row -----
  var rowE=document.createElement("div"); rowE.className="legrow";
  var lblE=document.createElement("span"); lblE.className="leglabel";
  lblE.textContent = P.subject ? (P.subject+"'s effect") : "President's effect";
  rowE.appendChild(lblE);
  EFFECT_ORDER.forEach(function(e){
    var b=document.createElement("button");
    b.innerHTML='<span class="darr" data-effect="'+e+'">'+EFFECT_GLYPH[e]+'</span>'+
                EFFECT_NAME[e]+'<span class="count">'+(ec[e]||0)+'</span>';
    if(hiddenEffect[e]) b.classList.add("dim");
    b.onclick=function(){
      hiddenEffect[e]=!hiddenEffect[e];
      b.classList.toggle("dim",!!hiddenEffect[e]);
      paint(); paintDeltas();
    };
    rowE.appendChild(b);
  });
  L.appendChild(rowE);
}

/* Tabs: 'dossier' | 'askai'. Selecting a country/region brings Dossier
   forward; clicking the Ask AI tab shows the chat UI. The country/region
   distinction has moved into the selection state (selName/selRegion). */
function setTab(t){
  if(t!=="dossier" && t!=="askai") t="dossier";
  tab=t;
  var tD=document.getElementById("tabDossier");
  var tA=document.getElementById("tabAskAI");
  var pD=document.getElementById("paneDossier");
  var pA=document.getElementById("paneAskAI");
  if(tD){tD.classList.toggle("on",t==="dossier");tD.setAttribute("aria-selected",t==="dossier"?"true":"false");}
  if(tA){tA.classList.toggle("on",t==="askai");  tA.setAttribute("aria-selected",t==="askai"?"true":"false");}
  if(pD) pD.classList.toggle("on",t==="dossier");
  if(pA) pA.classList.toggle("on",t==="askai");
  if(t==="askai") refreshAnalysisBtns();
  // On mobile, switching tabs implies expanding the bottom sheet.
  openSheet();
}
function setTabSilent(_t){
  // Called from showCountry/showRegion when a selection is made. Always
  // bring the Dossier tab forward so the user sees the dossier they opened.
  setTab("dossier");
}
function clearPanel(){
  var pb=document.getElementById("pbody"); if(!pb) return;
  var hasRegions = REGIONS && Object.keys(REGIONS).length > 0;
  var html='<div class="empty-state">'+
    '<h2 class="empty-h">Tap any country</h2>'+
    '<p class="empty-lead">to see the current U.S. strategic position and how it changed this term'+
      (hasRegions ? ' &mdash; or jump straight into a region below.' : '.')+'</p>';
  if(hasRegions){
    html+='<p class="empty-sub">Regions</p><div class="reglist">';
    Object.keys(REGIONS).forEach(function(r){
      html+='<button type="button" onclick="showRegion(\''+r.replace(/'/g,"\\'")+'\')">'+r+'</button>';
    });
    html+='</div>';
  }
  html+='</div>';
  pb.innerHTML=html;
  refreshAnalysisBtns();
  // No selection → hide the dock entirely; the small floating "Panel" button
  // (rendered in index.html, controlled by _setDockHidden) takes its place so
  // the Ask AI tab remains reachable for global queries.
  _setDockHidden(true);
}

/* ---- Dock visibility — show only when there's something to read ----
   Tying dock visibility to selection state cleans up the map view at rest.
   The "Panel" toggle in index.html re-opens the dock manually (defaulting to
   the Ask AI tab, since the empty Dossier state has no actionable content). */
function _setDockHidden(hidden){
  var dock = document.getElementById("dock");
  var btn  = document.getElementById("dockOpenBtn");
  if(dock) dock.classList.toggle("dock-hidden", !!hidden);
  if(btn)  btn.hidden = !hidden;
}
function openDockManual(){
  _setDockHidden(false);
  // No selection → Ask AI is the only meaningful action; bring it forward.
  if(!selName && !selRegion) setTab("askai");
}

function outcomeBlock(k){
  var o=OUTCOMES[k];
  if(!o||o.best==="—")return"";
  return '<div class="outcome"><h3>Outcome line &mdash; what this could become</h3>'+
    '<div class="ocell"><span class="otag g">Best</span><span>'+o.best+'</span></div>'+
    '<div class="ocell"><span class="otag m">Base</span><span>'+o.base+'</span></div>'+
    '<div class="ocell"><span class="otag b">Downside</span><span>'+o.down+'</span></div></div>';
}

/* ---- Dossier v3 redesign: helpers for the "summary + drill-down" layout ----
   The dossier used to render every section expanded — inherited, outcome, 8
   sourced points, counterargument, 5 lever rows, meta chips, conditional notes,
   sources, etc. — and a reader had to scan the whole thing to find the gist.
   The new layout shows an at-a-glance summary (badges + Inherited → Now
   contrast) and tucks everything else into collapsible <details> sections.   */

/* Split `outcome` at the first sentence boundary so the at-a-glance "Now" line
   stays short; the rest (if any) drops into the drill-down. The regex skips
   abbreviations like "U.S.", "U.N.", "Sept." by requiring the char before the
   period to be lowercase / a digit / a closing bracket-or-quote, AND the char
   after the space to be uppercase. */
function _splitOutcomeHeadline(text){
  if(!text) return {first:"", rest:""};
  var re = /([a-z\d\)\]"’”])([.!?])(\s+)([A-Z])/;
  var m = re.exec(text);
  if(!m) return {first: text.trim(), rest: ""};
  var endIdx = m.index + m[1].length + m[2].length;
  return {
    first: text.slice(0, endIdx).trim(),
    rest:  text.slice(endIdx).trim()
  };
}

/* Repeated-application of the same sentence-boundary rule: split a paragraph
   into its constituent sentences so each can render as its own <p>. Used by
   _renderProseBlock so multi-sentence prose doesn't read as a wall. */
function _splitSentences(text){
  if(!text) return [];
  var out=[], lastIdx=0, m;
  var re = /([a-z\d\)\]"’”])([.!?])(\s+)([A-Z])/g;
  while((m = re.exec(text)) !== null){
    var endIdx = m.index + m[1].length + m[2].length;
    var part = text.slice(lastIdx, endIdx).trim();
    if(part) out.push(part);
    lastIdx = endIdx;
  }
  if(lastIdx < text.length){
    var tail = text.slice(lastIdx).trim();
    if(tail) out.push(tail);
  }
  return out;
}

/* Render a prose value consistently — either as a bulleted list (when the value
   is an array of items) or as one or more <p> paragraphs (when it's a string).
   The principle: don't mix bullets and sentences within a single block. Authors
   choose by the value shape; the renderer never silently bullets prose or
   prose-ifies a list. */
function _renderProseBlock(value){
  if(value === null || value === undefined) return "";
  if(Array.isArray(value)){
    var items = value.filter(function(v){return v && v!=="—";});
    if(!items.length) return "";
    var ul = '<ul class="prose-bullets">';
    items.forEach(function(item){ ul += '<li>'+item+'</li>'; });
    ul += '</ul>';
    return ul;
  }
  if(typeof value !== "string" || !value || value==="—") return "";
  var sentences = _splitSentences(value);
  if(sentences.length <= 1){
    return '<p class="prose-p">'+value+'</p>';
  }
  return sentences.map(function(s){return '<p class="prose-p">'+s+'</p>';}).join('');
}

/* Wrap arbitrary HTML in a collapsible <details> section. Returns "" when the
   content is empty so callers can append unconditionally without `if` guards.
   `meta` is an optional small counter (e.g. "8 sources") rendered next to the
   title so closed sections still telegraph what's inside. */
function _detailsSection(title, contentHtml, meta){
  if(!contentHtml || !contentHtml.trim()) return "";
  var metaHtml = meta ? '<span class="dsec-meta">'+_escHtml(meta)+'</span>' : '';
  return '<details class="dsec">'+
         '<summary class="dsec-h">'+
           '<span class="dsec-title">'+_escHtml(title)+'</span>'+
           metaHtml+
           '<span class="dsec-chev" aria-hidden="true">&#8964;</span>'+
         '</summary>'+
         '<div class="dsec-body">'+contentHtml+'</div>'+
         '</details>';
}

/* Build the lever rows (object form preferred; legacy array form supported).
   Returns "" when nothing renders, so the result can flow straight into
   _detailsSection without an extra empty-check. */
function _buildLeversHtml(d){
  if(!d || !d.levers) return "";
  var rows="";
  if(!Array.isArray(d.levers) && typeof d.levers === "object"){
    LEVER_ORDER.forEach(function(id){
      // Route through _dsvLeverProse so this helper handles BOTH the
      // legacy plain-string shape AND the new {text, summary} object
      // shape (the dossier visualization prefers .summary; this
      // legacy/fallback path prefers .text so the bullet shows the
      // technical version — but if a lever only has .summary, that
      // wins too).
      var prose = _dsvLeverProse(d.levers[id]);
      if(prose){
        // _renderProseBlock paragraph-splits multi-sentence lever values so
        // they don't read as one run-on wall under the label.
        rows+='<div class="condnote"><span class="condnote-lab">'+LEVER_LABEL[id]+'</span>'+
              _renderProseBlock(prose)+'</div>';
      }
    });
  } else if(Array.isArray(d.levers) && d.levers.length){
    d.levers.forEach(function(L){
      if(!L || !L.lever) return;
      var label=LEVER_LABEL[L.lever]||L.lever;
      var sign =L.sign ? _escHtml(L.sign) : '';
      rows+='<div class="condnote"><span class="condnote-lab">'+label+'</span>'+
            (sign?'<p class="prose-p">'+sign+'</p>':'')+'</div>';
    });
  }
  return rows;
}

/* ---- Country dossier — visualization layer ----------------------------
   showCountry() composes a dossier from seven named builder functions.
   Each builder returns "" when its inputs are absent so v2 entries, the
   US home cell, `unscored` entries, and entries without a pack all
   degrade gracefully. The top-to-bottom order is:

     A _dsvHeader      country name, state swatch, exports, region row
     B _dsvVerdict     the mechanical verdict + outcome first sentence
     C _dsvTrajectory  inline-SVG inherited-vs-actual chart
     D _dsvTimeline    dotted timeline (pack.timeline — single source)
     E _dsvLevers      five-levers grid
     F _dsvCertainty   confidence/evidence/role chips + counterargument
     G _dsvFooter      collapsible <details> + linked policies + pack chip

   ADDING A NEW DOSSIER FIELD MUST NEVER REQUIRE CHANGING showCountry —
   route it through one of these builders, or add a new builder named
   _dsv<Section> and slot it into the dispatcher. */
function showCountry(name){
  setTabSilent("country");
  selRegion=null;
  // A click on the map (classified or not) brings the dock back if it was
  // hidden from the empty-state.
  _setDockHidden(false);
  var k=keyFor(name)||name, d=DOSSIER[k], pb=document.getElementById("pbody");
  if(!d){
    pb.innerHTML='<div class="empty-state"><h2 class="empty-h">'+name+'</h2>'+
      '<p class="empty-lead">isn\'t individually classified in this ledger (shown neutral on the map). Most unclassified states did not see a distinct shift in U.S. strategic posture during this term.</p></div>';
    selName=null; paint(); paintDeltas(); return;
  }
  selName=name; refreshAnalysisBtns();

  var P    = window.PRESIDENTS[CURRENT] || {};
  var pack = packFor(k);

  var html =
      _dsvHeader(d, k)
    + _dsvVerdict(d, k, P)
    + _dsvTrajectory(d, pack)
    + _dsvTimeline(pack)
    + _dsvLevers(d)
    + _dsvCertainty(d)
    + _dsvFooter(d, k, pack);

  pb.innerHTML=html;
  paint(); paintDeltas();
  var fF=FEATFORKEY&&FEATFORKEY(k); if(fF) flyTo(fF);
}

/* ---- A. Header ---------------------------------------------------------
   State swatch + country name + top-3 export glyphs + region row + the
   honesty pills (contested / editor-directed) that must surface above the
   fold per CLAUDE.md. The US home entry suppresses the badges row. */
function _dsvHeader(d, k){
  var sColor = STATE_COLOR[d.state] || "--s-neutral";
  var sName  = STATE_NAME [d.state] || "Unclassified";
  var sDesc  = STATE_DESC [d.state] || "";
  var safeReg= (d.region||"").replace(/'/g,"\\'");
  var contested = isContestedEntry(d);
  var mag       = magnitudeOf(d);

  var expHtml = '';
  var expList = (window.COUNTRY_EXPORTS||{})[k];
  if(expList && expList.length){
    expHtml = '<span class="exports" title="Top exports" aria-label="Top exports">';
    expList.slice(0,3).forEach(function(x){
      expHtml += '<span class="exp-sym" title="'+_escHtml(x.label||'')+'" aria-label="'+_escHtml(x.label||'')+'">'+(x.sym||'')+'</span>';
    });
    expHtml += '</span>';
  }

  var html = '<div class="ph"><span class="sw" style="background:var('+sColor+')"></span>'+
             '<h2>'+_escHtml(k)+'</h2>'+expHtml+'</div>';

  if(d.state !== "us"){
    html += '<div class="badges">';
    html += '<span class="badge"><span class="sw" style="background:var('+sColor+')"></span>'+
            '<b>'+_escHtml(sName)+'</b>'+(sDesc?' &middot; '+_escHtml(sDesc):'')+'</span>';
    if(d.effect && EFFECT_NAME[d.effect]){
      var effLabel = EFFECT_NAME[d.effect];
      if(mag) effLabel += ' &middot; '+_escHtml(MAGNITUDE_NAME[mag]||mag);
      if(d.effect==="unscored" && d.unscoredReason && UNSCORED_REASON_NAME[d.unscoredReason]){
        effLabel += ' &middot; '+_escHtml(UNSCORED_REASON_NAME[d.unscoredReason]);
      }
      html += '<span class="badge"><span class="darr" data-effect="'+d.effect+'">'+EFFECT_GLYPH[d.effect]+'</span>'+
              '<b>'+effLabel+'</b></span>';
    }
    if(contested){
      html += '<span class="badge badge-warn" title="Reasonable analysts could score this differently">contested</span>';
    }
    if(d.userDirected){
      html += '<span class="badge badge-warn" title="Set at editor\'s direction against the stricter analytic read">editor-directed</span>';
    }
    html += '</div>';
  }

  if(d.region){
    if(REGIONS && REGIONS[d.region]){
      html += '<div class="reg" onclick="showRegion(\''+safeReg+'\')">'+_escHtml(d.region)+' &rsaquo; view region</div>';
    } else if(d.region !== "—"){
      html += '<div class="reg reg-static">'+_escHtml(d.region)+'</div>';
    }
  }
  return html;
}

/* ---- Renderer-side text helpers (read-only on data) -------------------
   These helpers shape existing dossier prose into the visual layer's
   smaller surfaces. They strip noise (inline source brackets) and
   shorten (clip at the first hard punctuation) — they never invent
   text. Each pathway prefers an optional authored field if present and
   falls back to the existing technical field, so adding an author-
   curated version later flips the surface automatically without any
   code change. */

/* Remove inline [Source, 2025-01-12]-style citation tokens from prose so
   the top-of-dossier summary doesn't carry footnote chatter. Collapses
   the double space the deletion leaves behind. */
function _stripBracketedSources(s){
  if(typeof s !== "string") return "";
  return s.replace(/\[[^\]]*\]/g, "").replace(/\s{2,}/g, " ").trim();
}

/* Clip a string at the EARLIER of the first '.' or first ';' that
   actually terminates a clause — abstract first-clause for the at-a-
   glance summary. Russia's outcome runs as one semicolon-delimited
   paragraph; the sentence-boundary regex used elsewhere wouldn't trim
   it, hence the simpler stop-at-first-hard-punctuation rule.
   ';' is always a stop. '.' is only a stop when it's followed by
   whitespace (or end-of-string) — i.e. a real sentence terminator, not
   an internal abbreviation dot like "U.S.-Canada" or "i.e." or "..."
   (where each '.' is followed by another non-space character). Strips
   inline citation brackets after clipping. */
function _dsvShortFirstClause(text){
  if(typeof text !== "string" || !text) return "";
  var n = text.length, cut = -1;
  function isUpper(ch){ return ch >= 'A' && ch <= 'Z'; }
  for(var i = 0; i < n; i++){
    var c = text[i];
    if(c === ';'){ cut = i; break; }
    if(c === '.'){
      var next = (i + 1 < n) ? text[i+1] : '';
      // A '.' followed by a non-space (letter / digit / '.') is an
      // INTERNAL abbreviation dot — e.g. the dot AFTER U in "U.S." —
      // skip it.
      if(next !== '' && !/\s/.test(next)) continue;
      // A '.' followed by space/end could either be a real sentence
      // terminator OR the TRAILING dot of an initialism that happens
      // to sit at the end of a clause (e.g. "...the U.S. as ..."). If
      // the previous two chars match "<UPPER>.<UPPER>", treat this as
      // the trailing dot of an initialism and keep scanning.
      if(i >= 2 && text[i-2] === '.' && isUpper(text[i-1])){
        continue;
      }
      cut = i; break;
    }
  }
  var head = (cut >= 0) ? text.slice(0, cut) : text;
  return _stripBracketedSources(head);
}

/* Parse a pack timeline date ("YYYY-MM" or "YYYY-MM-DD") to a real-time
   ms value. Bare "YYYY-MM" anchors to the 15th of the month (midpoint)
   so events sit cleanly between month ticks on the strip. */
function _dsvDateToTimeMs(date){
  if(typeof date !== "string") return NaN;
  var m = /^(\d{4})-(\d{2})(?:-(\d{2}))?$/.exec(date);
  if(!m) return NaN;
  var y = +m[1], mo = +m[2] - 1, d = m[3] ? +m[3] : 15;
  return Date.UTC(y, mo, d);
}

/* Best-effort parser for the president-level asOf string. Accepts
   "YYYY-MM[-DD]" verbatim, "Month YYYY" (e.g. "May 2026"), and the
   common "May 2026 (projected timeline)" form. Falls back to NaN. */
var _DSV_MONTHS = {jan:0,feb:1,mar:2,apr:3,may:4,jun:5,jul:6,aug:7,sep:8,oct:9,nov:10,dec:11};
function _dsvAsOfToTimeMs(asOf){
  if(typeof asOf !== "string") return NaN;
  var ms = _dsvDateToTimeMs(asOf);
  if(!isNaN(ms)) return ms;
  // "May 2026", "May 2026 (projected timeline)", "May 2026 - projected"
  var m = /([A-Za-z]+)\s+(\d{4})/.exec(asOf);
  if(m){
    var key = m[1].slice(0,3).toLowerCase();
    if(key in _DSV_MONTHS){
      return Date.UTC(+m[2], _DSV_MONTHS[key], 15);
    }
  }
  return NaN;
}

/* Format a pack date as MON 'YY (e.g. "2025-02" → "FEB '25"). */
var _DSV_MONLABEL = ["JAN","FEB","MAR","APR","MAY","JUN","JUL","AUG","SEP","OCT","NOV","DEC"];
function _dsvMonYY(date){
  var ms = _dsvDateToTimeMs(date);
  if(isNaN(ms)) return _escHtml(date||"");
  var dt = new Date(ms);
  var mo = _DSV_MONLABEL[dt.getUTCMonth()];
  var yy = String(dt.getUTCFullYear()).slice(-2);
  return mo + " '" + yy;
}

/* Resolve a single lever value to DISPLAY prose for the dossier
   surface. Accepts the legacy plain-string shape AND an object shape
   `{summary, text}`. For display, `summary` (citation-free, plain
   English) wins — it's what a reader sees on the dossier.

   Renderer-only: lets a future author add a friendlier summary to any
   lever without changing the data file's required shape. */
function _dsvLeverProse(v){
  if(typeof v === "string") return (v && v !== "—") ? v : "";
  if(v && typeof v === "object"){
    var s = v.summary || v.text || "";
    if(typeof s === "string" && s && s !== "—") return s;
  }
  return "";
}

/* Resolve a single lever value to TECHNICAL/AUDIT prose — the
   sourced, citation-bearing version. Used by the Ask AI context
   builder so the model receives grounded, source-tagged text (with
   the `[Source, date]` brackets intact) instead of the citation-free
   plain-English summary. For the legacy string shape, the string IS
   the technical text. For the object shape, prefer `.text`; falls
   back to `.summary` only as a last resort so the AI context is
   never empty when an entry has only authored a summary so far. */
function _dsvLeverTechText(v){
  if(typeof v === "string") return (v && v !== "—") ? v : "";
  if(v && typeof v === "object"){
    var s = v.text || v.summary || "";
    if(typeof s === "string" && s && s !== "—") return s;
  }
  return "";
}

/* ---- B. The verdict ---------------------------------------------------
   MECHANICAL TEMPLATE — generates no new prose; routes on role+effect.
   The first sentence of the existing `outcome` field renders beneath
   the headline verbatim.

   Two templates, chosen by role:

   1. Causal template (default) — for roles that name the president as
      a causal agent: Architect, Accelerator, Closer, Stabilizer, Active
      Stabilizer, Spoiler, Neglect. The effect attaches to "the U.S.
      position toward {Country}" — never to the bare country — because
      hurt means the U.S. position weakened, not that the country
      itself was weakened. Followed by an uppercase mono clause
      "measured against the trajectory they inherited."

        helped/hurt: "{Subject} {adverb} {strengthened|weakened} the
                     U.S. position toward {Country}."
        mixed:       "{Subject} had a mixed effect on the U.S. position
                     toward {Country}."

   2. Non-causal template — for Inheritor and Bystander. These roles
      explicitly assert the president did NOT cause the effect, so the
      headline must not cast them as the causal agent and the inherited-
      trajectory clause is dropped (the causal counterfactual is moot
      when the role itself denies attribution).

        helped/hurt: "Under {Subject}, the U.S. position toward
                     {Country} is {adverb} {stronger|weaker} — an
                     inherited, structural shift rather than this
                     president's doing."
        mixed:       "Under {Subject}, the U.S. position toward
                     {Country} is mixed — shaped by inherited,
                     structural forces rather than this president's
                     action."

   Omitted entirely for `unscored` and for the US home cell. */
var DSV_VERBS     = { helped: "strengthened", hurt: "weakened" };
var DSV_ADJS      = { helped: "stronger",     hurt: "weaker"   };
var DSV_ADVERBS   = { modest: "modestly",  material: "materially", major: "sharply" };
var DSV_NONCAUSAL_ROLES = { "Inheritor": 1, "Bystander": 1 };
function _dsvVerdict(d, k, P){
  if(d.state === "us") return "";
  var eff = effectOf(d);
  if(eff === "unscored") return "";
  if(eff !== "helped" && eff !== "hurt" && eff !== "mixed") return "";

  var subject = P.subject || "This president";
  var country = _escHtml(k);
  var mag     = magnitudeOf(d);
  var adv     = (mag && DSV_ADVERBS[mag]) ? DSV_ADVERBS[mag]+' ' : '';
  var nonCausal = !!DSV_NONCAUSAL_ROLES[d.role];

  var head, clauseHtml;
  if(nonCausal){
    // Non-causal: the state of the position is described; the president
    // is the time frame ("Under X"), not the agent. The "rather than this
    // president's doing/action" tail makes the role read explicit.
    if(eff === "mixed"){
      head = 'Under '+_escHtml(subject)+', the U.S. position toward '+country+
             ' is mixed &mdash; shaped by inherited, structural forces rather than this president\'s action.';
    } else {
      var adjCls = (eff === "helped") ? "dsv-verb-helped" : "dsv-verb-hurt";
      head = 'Under '+_escHtml(subject)+', the U.S. position toward '+country+
             ' is '+adv+'<span class="'+adjCls+'">'+DSV_ADJS[eff]+'</span>'+
             ' &mdash; an inherited, structural shift rather than this president\'s doing.';
    }
    // No inherited-trajectory clause — the role itself denies causal attribution.
    clauseHtml = '';
  } else {
    // Causal: the president is the verb's subject.
    if(eff === "mixed"){
      head = _escHtml(subject)+' had a mixed effect on the U.S. position toward '+country+'.';
    } else {
      var verbCls = (eff === "helped") ? "dsv-verb-helped" : "dsv-verb-hurt";
      head = _escHtml(subject)+' '+adv+'<span class="'+verbCls+'">'+DSV_VERBS[eff]+'</span>'+
             ' the U.S. position toward '+country+'.';
    }
    clauseHtml = '<span class="dsv-verdict-clause">measured against the trajectory they inherited</span>';
  }

  // Explainer paragraph precedence:
  //   1. optional d.verdictExplainer (author-curated plain English)
  //   2. else: outcome clipped at the EARLIER of the first '.' or first
  //      ';', citation tokens stripped — short enough not to dominate
  //      the top of the panel. Russia's outcome runs as a single
  //      semicolon-delimited paragraph, so the sentence-boundary
  //      heuristic alone would leave the whole paragraph here.
  //   3. else: nothing.
  // The full verbatim outcome remains accessible in the footer's
  // "Full causal argument" <details> — moved out of the verdict block
  // so it doesn't dominate the top.
  var outFull = (d.outcome && d.outcome !== "—") ? d.outcome : "";
  var summary;
  if(typeof d.verdictExplainer === "string" && d.verdictExplainer.trim()){
    summary = _escHtml(d.verdictExplainer.trim());
  } else {
    summary = _escHtml(_dsvShortFirstClause(outFull));
  }
  var summaryHtml = summary ? '<p class="dsv-verdict-outcome">'+summary+'</p>' : '';

  return '<section class="dsv-section dsv-verdict">'+
           '<h3 class="dsv-verdict-h">'+head+'</h3>'+
           clauseHtml+
           summaryHtml+
         '</section>';
}

/* ---- C. Trajectory chart ----------------------------------------------
   Inline SVG: a "stronger ↑ / weaker ↓ U.S. position" axis, Jan 2025 →
   asOf. A dashed inherited path (gray, hollow endpoint) and a solid
   effect-colored path (filled endpoint) start from the same origin and
   diverge to encode the president's net effect against the counterfactual.

   Endpoint values:
     - From pack.trajectory.{inheritedEnd, actualEnd} when provided.
     - Else derived: inheritedEnd = 0 (the counterfactual IS the unchanged
       baseline), actualEnd = sign(effect) × {modest:0.33, material:0.66,
       major:1}.

   Omitted for unscored, US home, AND mixed-without-pack-trajectory
   (overlapping flat paths would read as a rendering bug). */
var DSV_MAG_WEIGHT = { modest: 0.33, material: 0.66, major: 1 };
function _dsvTrajectory(d, pack){
  if(d.state === "us") return "";
  var eff = effectOf(d);
  if(eff === "unscored") return "";

  var t   = (pack && pack.trajectory) || null;
  var hasPackTraj = !!(t && (t.inheritedEnd != null || t.actualEnd != null));
  if(eff === "mixed" && !hasPackTraj) return "";  // avoid degenerate chart

  // Resolve endpoint values, clamped to [-1, 1].
  function clamp(v){ v = +v; if(isNaN(v)) v = 0; return Math.max(-1, Math.min(1, v)); }
  var inheritedEnd, actualEnd;
  if(hasPackTraj){
    inheritedEnd = clamp(t.inheritedEnd != null ? t.inheritedEnd : 0);
    actualEnd    = clamp(t.actualEnd    != null ? t.actualEnd    : 0);
  } else {
    inheritedEnd = 0;
    var w = DSV_MAG_WEIGHT[magnitudeOf(d)] || 0.33;
    actualEnd = (eff === "helped" ? w : -w);
  }

  // SVG geometry — taller + wider canvas so endpoint labels + arrow have
  // breathing room. The chart is responsive (width:100%, height:auto via
  // SVG aspect ratio); viewBox is in design pixels.
  //
  // endX is intentionally pulled well left of the viewBox right edge so
  // the endpoint labels ("inherited path", "where this president took
  // it") and the magnitude callout have ~200px of clear space to render
  // without being clipped. The D1 strip below mirrors this same endX so
  // the two surfaces share an aligned x-axis.
  var W = 720, H = 240, startX = 70, endX = 520, midY = 130, range = 80;
  var yFor = function(v){ return midY - v * range; };
  var yInh = yFor(inheritedEnd), yAct = yFor(actualEnd);
  var midX = (startX + endX) / 2;
  // Smooth quadratic that bows toward the endpoint so neither path looks
  // like a straight diagonal — the bow conveys "trajectory" visually.
  var pathInh = 'M '+startX+' '+midY+' Q '+midX+' '+((midY + yInh)/2)+' '+endX+' '+yInh;
  var pathAct = 'M '+startX+' '+midY+' Q '+midX+' '+((midY + yAct)/2)+' '+endX+' '+yAct;
  var actCls  = 'dsv-traj-act-'+eff;

  // Magnitude callout — magnitude adjective for helped/hurt, "mixed" for mixed
  var callout;
  if(eff === "mixed"){
    callout = 'mixed';
  } else {
    var magName = MAGNITUDE_NAME[magnitudeOf(d)] || '';
    var stem    = (eff === "helped") ? 'stronger' : 'weaker';
    callout = (magName ? magName + ' ' : '') + stem;
  }
  var asOfLabel = _escHtml(((window.PRESIDENTS[CURRENT]||{}).asOf) || "today");

  // Endpoint labels go to the right of each dot; clamp y so they don't
  // crash into each other when the paths converge.
  var dotR        = 8;
  var labelOffset = 14;            // px gap between dot and label
  var labelX      = endX + labelOffset;
  // If the two endpoint dots are within 18 px vertically, nudge the
  // inherited label up and the actual label down so they don't overlap.
  var converged   = Math.abs(yInh - yAct) < 18;
  var inhLabelY   = converged ? Math.min(yInh, yAct) - 8 : yInh + 4;
  var actLabelY   = converged ? Math.max(yInh, yAct) + 12 : yAct + 4;
  // Callout sits one line below the "where this president took it" label.
  var calloutY    = actLabelY + 22;

  // Arrow chevron just to the right of the actual endpoint, pointing in
  // the direction the actual path diverged from the baseline. Hidden for
  // mixed (no direction).
  var arrowHtml = '';
  if(eff === "helped" || eff === "hurt"){
    var arrCx = endX + 1, arrCy = yAct;
    var dir   = (actualEnd >= 0) ? -1 : 1;     // -1 = up arrow, +1 = down
    var arrH  = 18;                            // vertical reach of the head
    var arrW  = 11;                            // half-width
    // Triangle pointing along `dir` from (arrCx, arrCy + 6*dir) to
    // (arrCx, arrCy + (6+arrH)*dir), with side vertices at ±arrW.
    var tipY  = arrCy + (6 + arrH) * dir;
    var baseY = arrCy + 6 * dir;
    var pts = arrCx+','+tipY+' '+(arrCx-arrW)+','+baseY+' '+(arrCx+arrW)+','+baseY;
    arrowHtml = '<polygon class="dsv-traj-arrow '+actCls+'" points="'+pts+'"/>';
  }

  var svg = ''
    + '<svg viewBox="0 0 '+W+' '+H+'" role="img" aria-label="Trajectory chart: inherited vs. actual U.S. position">'
    // Bold axis headings — placed outside the path zone so they read big.
    +   '<text class="dsv-traj-axis dsv-traj-axis-top" x="'+startX+'" y="22" text-anchor="start">stronger U.S. position</text>'
    +   '<text class="dsv-traj-axis dsv-traj-axis-bot" x="'+startX+'" y="'+(H-12)+'" text-anchor="start">weaker U.S. position</text>'
    // Mid baseline (dashed, low-contrast)
    +   '<line class="dsv-traj-mid" x1="'+startX+'" y1="'+midY+'" x2="'+endX+'" y2="'+midY+'"/>'
    // Date ticks
    +   '<text class="dsv-traj-tick" x="'+startX+'" y="'+(midY+30)+'" text-anchor="start">Jan 2025</text>'
    +   '<text class="dsv-traj-tick" x="'+endX+'" y="'+(midY+30)+'" text-anchor="end">'+asOfLabel+'</text>'
    // Bold start dot at Jan 2025 origin
    +   '<circle class="dsv-traj-start-dot" cx="'+startX+'" cy="'+midY+'" r="7"/>'
    // Paths
    +   '<path class="dsv-traj-inh" d="'+pathInh+'"/>'
    +   '<path class="dsv-traj-act '+actCls+'" d="'+pathAct+'"/>'
    // Inherited endpoint: hollow dot + inline label
    +   '<circle class="dsv-traj-inh-dot" cx="'+endX+'" cy="'+yInh+'" r="'+dotR+'"/>'
    +   '<text class="dsv-traj-end-label dsv-traj-end-inh" x="'+labelX+'" y="'+inhLabelY+'" text-anchor="start">inherited path</text>'
    // Actual endpoint: filled dot + arrow + inline label
    +   '<circle class="dsv-traj-act-dot '+actCls+'" cx="'+endX+'" cy="'+yAct+'" r="'+(dotR+0.5)+'"/>'
    +   arrowHtml
    +   '<text class="dsv-traj-end-label dsv-traj-end-act '+actCls+'" x="'+labelX+'" y="'+actLabelY+'" text-anchor="start">where this president took it</text>'
    // Magnitude callout (big mono)
    +   '<text class="dsv-traj-callout '+actCls+'" x="'+labelX+'" y="'+calloutY+'" text-anchor="start">'+_escHtml(callout)+'</text>'
    + '</svg>';

  return '<section class="dsv-section">'+
           '<p class="dsv-eyebrow">Compared to what?</p>'+
           '<div class="dsv-traj">'+svg+'</div>'+
         '</section>';
}

/* ---- D. Timeline ------------------------------------------------------
   READ-ONLY from window.PACKS[CURRENT][k].timeline — never parses
   points[]. Two parts:

     D1  horizontal strip    one time axis, Jan 2025 → P.asOf (shares
                             the SAME x-window as the C trajectory
                             chart so they line up visually). Sign-
                             colored dots positioned by date and above/
                             below the line by sign (strengthened
                             above, weakened below, mixed on-line).
                             Neutral legend below: only the three
                             sign labels — no per-entry glosses.
     D2  event list          mono date "MON 'YY", sign-colored disc,
                             bold label — em-dash — description.
                             Description prefers optional event.blurb
                             else falls back to event.detail.

   SINGLE-SOURCE RULE: both D1 and D2 — and the evidence-pack modal —
   read the SAME timeline[] array. A sign fix in data/packs/... shows
   up everywhere with no code change. */
var DSV_SIGNS = { weakened: 1, strengthened: 1, mixed: 1 };
var DSV_SIGN_LABEL = { weakened:"weakened", strengthened:"strengthened", mixed:"mixed" };
function _dsvTimeline(pack){
  if(!pack || !Array.isArray(pack.timeline) || !pack.timeline.length) return "";

  // -------- D1: horizontal strip ----------------------------------------
  // x-window: Jan 2025 (term start) → P.asOf, so this axis is the SAME
  // window as the C chart. If asOf doesn't parse, fall back to the last
  // datable event so the strip still renders.
  var P       = (window.PRESIDENTS[CURRENT] || {});
  var startMs = Date.UTC(2025, 0, 1);
  var asOfMs  = _dsvAsOfToTimeMs(P.asOf);
  if(isNaN(asOfMs)){
    var maxMs = -Infinity;
    pack.timeline.forEach(function(t){
      var ms = _dsvDateToTimeMs(t && t.date);
      if(!isNaN(ms) && ms > maxMs) maxMs = ms;
    });
    asOfMs = (maxMs > -Infinity) ? maxMs : startMs + 30*86400000;
  }
  if(asOfMs <= startMs) asOfMs = startMs + 30*86400000;   // degenerate fallback
  var span = asOfMs - startMs;

  // Strip SVG geometry — mirrors the trajectory chart's x-range
  // (startX=70, endX=520) so the two surfaces stack with aligned time
  // axes. The date ticks line up exactly under their counterparts in C.
  var SW = 720, SH = 120, sx0 = 70, sx1 = 520, sMidY = 60;
  function xFor(ms){
    if(isNaN(ms)) return null;
    var t = Math.max(0, Math.min(1, (ms - startMs) / span));
    return sx0 + t * (sx1 - sx0);
  }
  var dots = '';
  pack.timeline.forEach(function(t){
    if(!t) return;
    var ms = _dsvDateToTimeMs(t.date);
    var cx = xFor(ms);
    if(cx == null) return;   // unparseable date → skip on the strip only
    var sign = DSV_SIGNS[t.sign] ? t.sign : 'mixed';
    var cy   = sign === 'strengthened' ? sMidY - 22
             : sign === 'weakened'     ? sMidY + 22
             : sMidY;
    dots += '<circle class="dsv-tl-strip-dot sign-'+sign+'" cx="'+cx.toFixed(1)+'" cy="'+cy+'" r="6">'+
              '<title>'+_escHtml((t.label||'')+' — '+sign)+'</title>'+
            '</circle>';
  });

  var asOfLabel = _escHtml(P.asOf || "today");
  var stripSvg = ''
    + '<svg viewBox="0 0 '+SW+' '+SH+'" role="img" aria-label="Timeline strip: events by date and sign">'
    +   '<line class="dsv-tl-strip-axis" x1="'+sx0+'" y1="'+sMidY+'" x2="'+sx1+'" y2="'+sMidY+'"/>'
    +   '<text class="dsv-traj-tick" x="'+sx0+'" y="'+(SH-12)+'" text-anchor="start">Jan 2025</text>'
    +   '<text class="dsv-traj-tick" x="'+sx1+'" y="'+(SH-12)+'" text-anchor="end">'+asOfLabel+'</text>'
    +   dots
    + '</svg>';

  // Neutral legend — three signs only, no per-entry glosses.
  var legend = '<div class="dsv-tl-legend">'
    +   '<span class="dsv-tl-legpill"><span class="dsv-tl-dot sign-strengthened"></span>strengthened</span>'
    +   '<span class="dsv-tl-legpill"><span class="dsv-tl-dot sign-weakened"></span>weakened</span>'
    +   '<span class="dsv-tl-legpill"><span class="dsv-tl-dot sign-mixed"></span>mixed</span>'
    + '</div>';

  // -------- D2: event list ----------------------------------------------
  var rows = '';
  pack.timeline.forEach(function(t){
    if(!t) return;
    var sign = DSV_SIGNS[t.sign] ? t.sign : 'mixed';
    // Description: prefer optional event.blurb (author-curated plain English)
    // else fall back to event.detail. Renderer-only — adding `blurb` to any
    // pack entry later flips the surface automatically.
    var body = (typeof t.blurb === "string" && t.blurb.trim())
                  ? t.blurb.trim()
                  : (t.detail || '');
    var src = '';
    if(t.sourceLabel || t.sourceUrl){
      var lab = _escHtml(t.sourceLabel || t.sourceUrl || '');
      src = '<div class="dsv-tl-src">'+
        (t.sourceUrl
          ? '<a href="'+_escHtml(t.sourceUrl)+'" target="_blank" rel="noopener noreferrer">'+lab+'</a>'
          : lab)+
        '</div>';
    }
    rows += '<li>'+
              '<span class="dsv-tl-dot sign-'+sign+'" title="'+_escHtml(sign)+'"></span>'+
              '<div class="dsv-tl-date">'+_dsvMonYY(t.date||'')+'</div>'+
              '<div class="dsv-tl-text">'+
                '<span class="dsv-tl-label">'+_escHtml(t.label||'')+'</span>'+
                (body ? ' <span class="dsv-tl-dash">&mdash;</span> <span class="dsv-tl-body">'+_escHtml(body)+'</span>' : '')+
                src+
              '</div>'+
            '</li>';
  });

  return '<section class="dsv-section">'+
           '<p class="dsv-eyebrow">What actually happened, when</p>'+
           '<div class="dsv-tl-strip">'+stripSvg+'</div>'+
           legend+
           '<ul class="dsv-tl-list">'+rows+'</ul>'+
         '</section>';
}

/* ---- E. Levers grid ---------------------------------------------------
   Renders the five levers as labeled prose blocks. Per-lever prose flows
   through _dsvLeverProse() which accepts BOTH the legacy plain-string
   shape (used today) and an optional object shape `{summary, text}` where
   `summary` (plain-English) wins over `text`. Renderer-only: lets a
   future author add a friendlier summary to any lever without changing
   the data file's required shape. Falls back to the existing
   _buildLeversHtml() output when no per-lever object shape is present
   (so the legacy object-of-strings shape used by every current entry
   keeps rendering exactly as before). */
function _dsvLevers(d){
  if(!d || !d.levers || Array.isArray(d.levers) || typeof d.levers !== "object"){
    // Legacy/array shape or no levers → defer to the existing helper,
    // which already handles those cases (and returns "" when empty).
    var legacy = _buildLeversHtml(d);
    if(!legacy) return "";
    return '<section class="dsv-section">'+
             '<p class="dsv-eyebrow">Why we scored it</p>'+
             legacy+
           '</section>';
  }

  // Object form — iterate LEVER_ORDER for stable display order, prefer
  // .summary then .text then the string-shape value.
  var rows = "";
  LEVER_ORDER.forEach(function(id){
    var prose = _dsvLeverProse(d.levers[id]);
    if(!prose) return;
    rows += '<div class="condnote"><span class="condnote-lab">'+LEVER_LABEL[id]+'</span>'+
            _renderProseBlock(prose)+'</div>';
  });
  if(!rows) return "";
  return '<section class="dsv-section">'+
           '<p class="dsv-eyebrow">Why we scored it</p>'+
           rows+
         '</section>';
}

/* ---- F. Certainty + counterargument -----------------------------------
   Role / Confidence / Evidence chips, contested pill, and the FULL
   counterargument framed as "the other side of the argument." No
   truncation. Returns "" if none of the inputs have content. */
function _dsvCertainty(d){
  var chips = [];
  if(d.role)       chips.push({lab:'Role',       val:d.role});
  if(d.confidence) chips.push({lab:'Confidence', val:d.confidence});
  if(d.evidence)   chips.push({lab:'Evidence',   val:d.evidence});

  var hasCounter = d.counterargument && d.counterargument !== "—";
  var hasContested = isContestedEntry(d);

  if(!chips.length && !hasCounter && !hasContested) return "";

  var html = '<section class="dsv-section">'+
             '<p class="dsv-eyebrow">How sure we are</p>';

  if(chips.length || hasContested){
    html += '<div class="dsv-meta-row">';
    chips.forEach(function(c){
      html += '<span class="metachip"><span class="mclab">'+c.lab+'</span><span class="mcval">'+_escHtml(c.val)+'</span></span>';
    });
    if(hasContested){
      html += '<span class="badge badge-warn" title="Reasonable analysts could score this differently">contested</span>';
    }
    html += '</div>';
  }

  if(hasCounter){
    html += '<div class="dsv-counter">'+
              '<h4>The other side of the argument</h4>'+
              _renderProseBlock(d.counterargument)+
            '</div>';
  }

  html += '</section>';
  return html;
}

/* ---- G. Collapsible footer + linked policies + pack chip --------------
   Three <details>: full causal argument (points + outcome remainder),
   analytic notes (conditional notes + userDirected), and the full
   sources list. Followed by linked-policies chips, the outcomeBlock
   projection, and — when a pack exists for this country — the existing
   "View the evidence pack" button (second consumer of pack.timeline). */
function _dsvFooter(d, k, pack){
  var html = '';

  // ----- 1. Full causal argument
  // The full outcome (every sentence, citations intact) lives here — the
  // top-of-dossier summary only shows the short clipped first clause, so
  // the verbatim text needs an accessible home for audit.
  var pts      = pointsOf(d);
  var sColor   = STATE_COLOR[d.state] || "--s-neutral";
  var outFull  = (d.outcome && d.outcome !== "—") ? d.outcome : "";
  var inherited= inheritedOf(d);
  var hasInh   = Array.isArray(inherited) ? inherited.length>0 : !!inherited;

  var whyHtml = '';
  if(hasInh){
    whyHtml += '<div class="condnote"><span class="condnote-lab">Inherited trajectory</span>'+
               _renderProseBlock(inherited)+'</div>';
  }
  if(outFull){
    whyHtml += '<div class="outcome-rest"><span class="blab">Outcome (verbatim)</span>'+
               _renderProseBlock(outFull)+'</div>';
  }
  if(pts.length){
    if(whyHtml) whyHtml += '<div class="dsec-sublab">Causal argument</div>';
    whyHtml += '<ul class="pts" style="--dotc:var('+sColor+')">';
    pts.forEach(function(p){ whyHtml += '<li>'+p+'</li>'; });
    whyHtml += '</ul>';
  }
  var whyMeta = pts.length ? (pts.length+" point"+(pts.length===1?"":"s")) : "";
  html += _detailsSection("Full causal argument", whyHtml, whyMeta);

  // ----- 2. Analytic notes — conditional notes + user-directed.
  // Role/Confidence/Evidence chips moved up to F (don't duplicate).
  var anHtml = '';
  CONDITIONAL_NOTE_ORDER.forEach(function(field){
    var v = d[field];
    if(v && v !== "—"){
      anHtml += '<div class="condnote"><span class="condnote-lab">'+CONDITIONAL_NOTE_LABEL[field]+'</span>'+
                _renderProseBlock(v)+'</div>';
    }
  });
  if(d.userDirected){
    anHtml += '<div class="userdir"><span class="blab">User-directed placement</span>'+d.userDirected+'</div>';
  }
  html += _detailsSection("Analytic notes", anHtml);

  // ----- 3. Sources
  var srcHtml = '';
  if(d.sources && d.sources.length){
    srcHtml = '<ul class="sources">';
    d.sources.forEach(function(s){
      if(!s) return;
      var label = _escHtml(s.label||"");
      if(s.url){
        srcHtml += '<li><a href="'+_escHtml(s.url)+'" target="_blank" rel="noopener noreferrer">'+label+'</a></li>';
      } else {
        srcHtml += '<li>'+label+'</li>';
      }
    });
    srcHtml += '</ul>';
  }
  var srcMeta = (d.sources && d.sources.length) ? (d.sources.length+" source"+(d.sources.length===1?"":"s")) : "";
  html += _detailsSection("Sources", srcHtml, srcMeta);

  // ----- Linked policies (always-visible chips)
  if(d.linkedPolicies && d.linkedPolicies.length){
    html += '<div class="sech">Linked policies</div><div class="linked-row">';
    d.linkedPolicies.forEach(function(lp){
      var safe = lp.replace(/'/g,"\\'");
      html += '<button type="button" class="linkchip" onclick="showCountry(\''+safe+'\')">'+_escHtml(lp)+'</button>';
    });
    html += '</div>';
  }

  // ----- Best/base/down projections
  html += outcomeBlock(k);

  // ----- Evidence-pack chip — second consumer of pack.timeline
  if(pack){
    html += '<div class="sech">Evidence</div>'+
            '<div class="linked-row">'+
              '<button type="button" class="linkchip" onclick="openPack(\''+
                k.replace(/'/g,"\\'")+'\')">View the evidence pack</button>'+
            '</div>';
  }

  return html;
}

/* ---- Evidence-pack resolution -------------------------------------------
   Packs live in data/packs/<president>/<country>.js and self-register on
   window.PACKS[president][CountryKey]. Uses the same keyFor/ALIAS resolution
   as the dossier so the pack key always lines up with the entry it backs.
   Returns the pack object or null. */
function packFor(nameOrKey){
  if(!CURRENT) return null;
  var byPres = (window.PACKS||{})[CURRENT];
  if(!byPres) return null;
  // Try as-is first (caller may already pass a resolved dossier key), then
  // fall back to keyFor() so a raw map-name resolves through the alias table.
  if(byPres[nameOrKey]) return byPres[nameOrKey];
  var k = keyFor(nameOrKey);
  if(k && byPres[k]) return byPres[k];
  return null;
}

function showRegion(r){
  setTabSilent("region");
  _setDockHidden(false);
  var R=REGIONS[r], pb=document.getElementById("pbody");
  if(!R){ goOverview(); return; }
  selRegion=r; selName=null; refreshAnalysisBtns();
  var html='<div class="backrow"><button type="button" onclick="goOverview()">&lsaquo; overview</button></div>'+
    '<div class="ph"><h2>'+r+'</h2></div>'+
    '<div class="tiltbadge">'+R.tilt+'</div>'+
    '<div class="sech">Regional dynamics</div><p style="margin:0;font-size:13.4px">'+R.dynamics+'</p>'+
    '<div class="sech">Flagship projects &amp; initiatives</div><div>';
  R.projects.forEach(function(p){html+='<div class="proj">'+p+'</div>';});
  html+='</div><div class="sech">US strategic goal</div><div class="rgoal">'+R.goal+'</div>'+
    '<div class="sech">Long-term stakes &mdash; benefit vs. damage</div>'+
    '<p style="margin:0;font-size:13.4px">'+R.stakes+'</p>';
  pb.innerHTML=html;
  paint(); paintDeltas();
  var rf=REGIONFEATS&&REGIONFEATS[r];
  if(rf && rf.length) flyTo({type:"FeatureCollection",features:rf});
}
/* Legacy entry points kept for back-compat with any data-side or external callers. */
function showRegionList(){ goOverview(); }
function backToRegions(){ goOverview(); }


/* ---- map painting (state-based) ---- */
function paint(){
  if(!svgSel)return;
  svgSel.selectAll(".cty").each(function(d){
    var k=keyFor(d.properties.name);
    var entry=k?DOSSIER[k]:null;
    var s=entry?entry.state:null;
    var e=entry?effectOf(entry):null;
    var dim = !!s && (hiddenState[s] || (e && hiddenEffect[e]));
    var fill=(!s||dim) ? cssv("--nd") : cssv(STATE_COLOR[s]||"--s-neutral");
    var el=d3.select(this);
    el.attr("fill",fill);
    el.classed("sel",d.properties.name===selName);
    var inReg = selRegion && k && regionOf[k]===selRegion;
    el.classed("dimmed", !!selRegion && !inReg);
  });
  svgSel.selectAll(".rgoutline").classed("show",function(d){return d===selRegion;});
  svgSel.selectAll(".rglabel").classed("active",function(d){return d===selRegion;});
}

/* For multi-polygon countries (US with Alaska/Hawaii, Russia across the
   antimeridian, Philippines, Indonesia, Greece, Norway, etc.), the raw
   centroid drifts toward the average of all sub-polygons and often
   lands in the ocean. Pick the largest projected sub-polygon and label
   that one instead. Returns {cx, cy, w, h} or null if unprojectable. */
function bestLabelTarget(feature, pathArg){
  if(!feature || !feature.geometry) return null;
  var path = pathArg || geoPath;
  var target = feature;
  if(feature.geometry.type === "MultiPolygon"){
    var polys = feature.geometry.coordinates;
    var bestArea = -Infinity, bestIdx = 0;
    for(var i=0;i<polys.length;i++){
      var a = path.area({type:"Polygon", coordinates: polys[i]});
      if(a > bestArea){ bestArea = a; bestIdx = i; }
    }
    target = { type:"Polygon", coordinates: polys[bestIdx] };
  }
  var c = path.centroid(target);
  if(!c || isNaN(c[0])) return null;
  var bb = path.bounds(target);
  return { cx: c[0], cy: c[1], w: bb[1][0]-bb[0][0], h: bb[1][1]-bb[0][1] };
}

/* ---- effect marks at country centroids (separate g-layer for z-order) ----
   Each mark is sized to the country it sits inside (size-to-country with a
   clamp ceiling). Tiny countries get a dot fallback; the smallest are skipped.
   `_zoomK` makes the size/dot thresholds screen-space, so zooming in promotes
   dots to full arrows as countries grow on screen.

   v3 semantics:
     direction  ← effect    helped=up, hurt=down, mixed=short horizontal bar
     weight     ← magnitude major=double chevron, material=single bold,
                              modest=single light
     unscored / missing effect → DRAW NOTHING (not even the dot fallback)
   Styling: white inner stroke over a dark outline, exactly as before.       */
function appendDeltaMark(parentG, cx, cy, effect, magnitude, size){
  // unscored or unknown → no mark at all (per spec: do not fall back to dot).
  if(!effect || effect==="unscored") return;
  if(effect!=="helped" && effect!=="hurt" && effect!=="mixed") return;

  // tiny-country dot fallback: state is still encoded by color; the dot just
  // signals "there is an effect here" when the country is too small for a
  // legible arrow. Threshold is screen-space (size * _zoomK) so zooming in
  // promotes dot → arrow.
  if(size * _zoomK < 9){
    var r = Math.max(size * 0.34, 2);
    parentG.append("circle")
      .attr("cx", cx).attr("cy", cy).attr("r", r)
      .attr("fill", "var(--arrow-fill)")
      .attr("stroke", "var(--arrow-outline)")
      .attr("stroke-width", 1.2);
    return;
  }

  // --- Mixed: a single short horizontal bar through (cx, cy). No chevron. --
  if(effect==="mixed"){
    var barL = size * 0.7;
    var dM = "M "+(cx-barL/2)+" "+cy+" L "+(cx+barL/2)+" "+cy;
    var wIm = Math.max(size * 0.16, 1.4);
    var wOm = wIm + Math.max(size * 0.12, 1.5);
    parentG.append("path").attr("d", dM)
      .attr("fill","none").attr("stroke","var(--arrow-outline)")
      .attr("stroke-width", wOm).attr("stroke-linecap","round");
    parentG.append("path").attr("d", dM)
      .attr("fill","none").attr("stroke","var(--arrow-fill)")
      .attr("stroke-width", wIm).attr("stroke-linecap","round");
    return;
  }

  // --- Helped / Hurt: up- or down-pointing arrow. Geometry built up-facing
  //     centered on (cx, cy) and rotated 180° for hurt. -----------------
  var deg = (effect==="hurt") ? 180 : 0;
  var dbl = (magnitude==="major");   // double chevron for major

  var s = size * 0.5;
  var c = size * 0.30;
  var g = size * 0.26;
  var d = "M "+cx+" "+(cy+s)+" L "+cx+" "+(cy-s)+
          " M "+(cx-c)+" "+(cy-s+c)+" L "+cx+" "+(cy-s)+" L "+(cx+c)+" "+(cy-s+c);
  if(dbl){
    d += " M "+(cx-c)+" "+(cy-s+c+g)+" L "+cx+" "+(cy-s+g)+" L "+(cx+c)+" "+(cy-s+c+g);
  }

  // Stroke weight scales with magnitude. modest is the lighter variant;
  // material is the default; major already reads heavy via the double head.
  var wI, wO;
  if(magnitude==="modest"){
    wI = Math.max(size * 0.12, 1.05);
    wO = wI + Math.max(size * 0.10, 1.2);
  } else {
    // material (default) and major
    wI = Math.max(size * 0.15, 1.3);
    wO = wI + Math.max(size * 0.12, 1.5);
  }

  var grp = parentG.append("g")
    .attr("transform", "rotate("+deg+" "+cx+" "+cy+")");
  // outline first (under)
  grp.append("path").attr("d", d)
    .attr("fill", "none")
    .attr("stroke", "var(--arrow-outline)")
    .attr("stroke-width", wO)
    .attr("stroke-linecap", "round")
    .attr("stroke-linejoin", "round");
  // inner stroke (over)
  grp.append("path").attr("d", d)
    .attr("fill", "none")
    .attr("stroke", "var(--arrow-fill)")
    .attr("stroke-width", wI)
    .attr("stroke-linecap", "round")
    .attr("stroke-linejoin", "round");
}

function paintDeltas(){
  if(!gD || !ALLFEATS) return;
  gD.selectAll("*").remove();
  ALLFEATS.forEach(function(f){
    var k=keyFor(f.properties.name);
    if(!k) return;
    var d=DOSSIER[k];
    if(!d || d.state==="us") return;
    var e=effectOf(d);
    if(e==="unscored") return;                     // no arrow for unscored / v2
    if(hiddenState[d.state] || hiddenEffect[e]) return;
    if(selRegion && regionOf[k]!==selRegion) return;
    var pos = bestLabelTarget(f);
    if(!pos) return;
    var m = Math.min(pos.w, pos.h);
    if(m * _zoomK < 5) return;                     // screen-space skip; zooming exposes more arrows
    var size = Math.min(m * 0.34, 30);             // ceiling so huge countries aren't giant

    // Wrap in a <g> so the whole mark (plus a transparent hit circle) is clickable
    var hitG = gD.append("g")
      .attr("class","delta-hit")
      .style("cursor","pointer")
      .on("click", (function(name){ return function(ev){
        ev.stopPropagation();
        showCountry(name);
      }; })(k));
    // Invisible circle behind the mark so small arrows are still easy to tap/click
    var hitR = Math.max(size * 0.65, 9) / _zoomK;
    hitG.append("circle")
      .attr("cx", pos.cx).attr("cy", pos.cy).attr("r", hitR)
      .attr("fill","transparent").attr("stroke","none");
    appendDeltaMark(hitG, pos.cx, pos.cy, e, magnitudeOf(d), size);
  });
}

/* ---- fly-to (replaces the old inset detail map) ----------------------
   Animates the main map's existing zoom transform to frame the given
   feature/collection. Reuses the 960×480 projection space so RLAYOUT,
   delta arrow sizing, and the zoom translateExtent all keep working. */
function prefersReducedMotion(){
  return !!(window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches);
}
function flyTo(featureOrCollection){
  if(!featureOrCollection || !geoPath || !_mapZoom || !svgSel) return;
  var b = geoPath.bounds(featureOrCollection);
  if(!b || !isFinite(b[0][0]) || !isFinite(b[1][0])) return;
  var dx = b[1][0]-b[0][0], dy = b[1][1]-b[0][1];
  var cx = (b[0][0]+b[1][0])/2, cy = (b[0][1]+b[1][1])/2;
  // 0.45 = "comfortable" fit: leaves room around the selection, not edge-tight.
  var scale = Math.max(1, Math.min(8, 0.45 / Math.max(dx/960, dy/480)));
  var t = d3.zoomIdentity
    .translate(960/2 - scale*cx, 480/2 - scale*cy)
    .scale(scale);
  var dur = prefersReducedMotion() ? 0 : 700;
  svgSel.transition().duration(dur).call(_mapZoom.transform, t);
}
function zoomBy(factor){
  if(!svgSel || !_mapZoom) return;
  var dur = prefersReducedMotion() ? 0 : 220;
  svgSel.transition().duration(dur).call(_mapZoom.scaleBy, factor);
}


/* Region outlines depend on which countries the current president maps to a
   region, so they are rebuilt on every president switch. */
function buildRegionGeometry(){
  if(!FEATFORKEY) return;
  // Clear any previous outlines unconditionally; we'll re-add only if the
  // current president actually defines regions.
  if(gOut) gOut.selectAll("*").remove();
  REGIONFEATS={};
  if(!REGIONS || !Object.keys(REGIONS).length) return; // region layer is gated on regions existing
  var rf={};
  Object.keys(regionOf).forEach(function(k){
    var r=regionOf[k]; if(!r||r==="—") return;
    var f=FEATFORKEY(k); if(!f) return;
    (rf[r]=rf[r]||[]).push(f);
  });
  REGIONFEATS=rf;
  if(gOut && geoPath){
    Object.keys(rf).forEach(function(r){
      gOut.append("path").datum(r).attr("class","rgoutline")
        .attr("d", geoPath({type:"FeatureCollection",features:rf[r]}));
    });
  }
}

function renderHeader(){
  var P=window.PRESIDENTS[CURRENT]||{};
  // President-agnostic fallback: when there's no explicit headline override,
  // derive one from P.subject so the title isn't hard-coded to any one POTUS.
  var fallback = P.subject ? ("How has "+P.subject+" reshaped US foreign policy?")
                            : "Foreign Policy Atlas";
  var hl=document.getElementById("hl");    if(hl) hl.textContent=P.headline||fallback;
  var bl=document.getElementById("blurb"); if(bl) bl.innerHTML=P.blurb||"";
  var ao=document.getElementById("asof");  if(ao) ao.textContent=P.asOf?("As of "+P.asOf):"";
}

function populateSelector(){
  var sel=document.getElementById("presel"); if(!sel) return;
  sel.innerHTML="";
  presidentList().forEach(function(id){
    var o=document.createElement("option");
    o.value=id; o.textContent=(window.PRESIDENTS[id]&&window.PRESIDENTS[id].label)||id;
    sel.appendChild(o);
  });
  sel.value=CURRENT;
  sel.onchange=function(){ switchPresident(this.value); };
}

function switchPresident(id){
  if(!window.PRESIDENTS[id]) return;
  loadPresident(id);
  selName=null; selRegion=null; hiddenState={}; hiddenEffect={};
  renderHeader();
  buildLegend();
  buildRegionGeometry();
  paint(); paintDeltas();
  resetMapZoom();
  setTab("dossier");
  clearPanel();
}


var _mapZoom=null;  // d3.zoom behavior, exposed for reset

/* Simplified polygon footprints of major mountain ranges — used purely as
   a visual geographic cue; coordinates are approximate ridge-area outlines. */
/* Major river centerlines — hardcoded so there's no CDN dependency.
   Coordinates are [lon, lat] approximate ridge/centerline paths. */
var PHY_RIVERS = { type:"FeatureCollection", features:[
  {type:"Feature",geometry:{type:"LineString",coordinates:[[-74,-5],[-70,-4],[-65,-3],[-60,-3],[-55,-2],[-50,-1],[-48,-1]]}},  // Amazon
  {type:"Feature",geometry:{type:"LineString",coordinates:[[-96,46],[-96,44],[-93,41],[-91,38],[-91,33],[-89,29]]}},           // Mississippi
  {type:"Feature",geometry:{type:"LineString",coordinates:[[32,0],[31,5],[33,10],[33,15],[31,22],[32,28],[31,30]]}},            // Nile
  {type:"Feature",geometry:{type:"LineString",coordinates:[[17,-7],[18,-4],[17,-1],[18,1],[16,2]]}},                           // Congo
  {type:"Feature",geometry:{type:"LineString",coordinates:[[92,32],[97,31],[100,28],[104,29],[108,30],[114,30],[118,31],[121,31]]}}, // Yangtze
  {type:"Feature",geometry:{type:"LineString",coordinates:[[96,35],[103,37],[106,38],[109,37],[111,36],[114,35],[119,37]]}},    // Yellow River
  {type:"Feature",geometry:{type:"LineString",coordinates:[[94,28],[100,22],[102,18],[104,14],[105,12],[106,10]]}},             // Mekong
  {type:"Feature",geometry:{type:"LineString",coordinates:[[78,31],[80,28],[83,26],[87,24],[88,23],[90,23],[92,24]]}},          // Ganges-Brahmaputra
  {type:"Feature",geometry:{type:"LineString",coordinates:[[80,33],[75,32],[72,29],[68,25],[67,24]]}},                         // Indus
  {type:"Feature",geometry:{type:"LineString",coordinates:[[32,57],[36,56],[44,53],[49,47],[51,46]]}},                         // Volga
  {type:"Feature",geometry:{type:"LineString",coordinates:[[8,48],[13,48],[16,48],[18,47],[20,46],[25,45],[28,45],[30,46]]}},   // Danube
  {type:"Feature",geometry:{type:"LineString",coordinates:[[-8,11],[-3,14],[2,15],[8,15],[8,12],[5,8],[3,6]]}},                // Niger
  {type:"Feature",geometry:{type:"LineString",coordinates:[[62,53],[63,58],[66,62],[69,65],[67,67]]}},                         // Ob
  {type:"Feature",geometry:{type:"LineString",coordinates:[[93,52],[92,55],[90,60],[87,65],[83,68],[80,69]]}},                 // Yenisei
  {type:"Feature",geometry:{type:"LineString",coordinates:[[111,55],[115,57],[120,60],[124,62],[126,66],[127,68],[129,70]]}},   // Lena
  {type:"Feature",geometry:{type:"LineString",coordinates:[[-118,59],[-122,62],[-128,65],[-133,68],[-135,69]]}},               // Mackenzie
  {type:"Feature",geometry:{type:"LineString",coordinates:[[-52,-23],[-57,-21],[-58,-17],[-58,-24],[-59,-33],[-58,-34]]}}      // Parana
]};

/* Mountain ridge polylines — each is an array of [lon, lat] waypoints that
   traces the spine of the range. sampleAlongLine() places triangle symbols
   at regular SVG-pixel intervals so the full extent is covered. */
var MTN_RIDGES = [
  [[71,35],[76,34],[80,31],[84,28],[88,27],[92,27],[96,26]],          // Himalayas
  [[62,36],[66,36],[70,36],[74,37]],                                   // Hindu Kush / Karakoram
  [[70,38],[76,40],[82,42],[88,43],[93,43]],                          // Pamir / Tian Shan
  [[45,37],[48,34],[51,31],[55,29],[57,28]],                          // Zagros
  [[39,41],[43,43],[46,43],[50,42]],                                   // Caucasus
  [[6,44],[9,46],[11,47],[14,47],[16,47]],                             // Alps
  [[60,68],[60,65],[60,61],[59,57],[59,54]],                           // Urals
  [[6,58],[9,62],[14,65],[17,68]],                                     // Scandinavian Mountains
  [[-5,34],[-1,33],[3,33],[7,33],[9,31]],                              // Atlas
  [[34,14],[37,11],[39,9],[42,7]],                                     // Ethiopian Highlands
  [[-125,50],[-120,46],[-117,42],[-113,38],[-108,34],[-105,30]],      // Rockies
  [[-84,34],[-80,37],[-77,40],[-74,43],[-70,46]],                     // Appalachians
  [[-74,11],[-75,5],[-76,0],[-77,-5],[-76,-10],[-70,-15],            // Andes (full — N→S)
   [-69,-20],[-68,-26],[-68,-33],[-70,-38],[-72,-43],[-73,-50]],
  [[152,-27],[149,-32],[147,-35],[144,-37]],                           // Great Dividing Range
  [[-104,27],[-102,22],[-100,18],[-97,17]]                            // Sierra Madre
];

/* Sample evenly-spaced points (in SVG pixel space) along a projected polyline.
   pts — array of already-projected [x,y]; step — spacing in px. */
function sampleAlongLine(pts, step){
  var out=[],dist=0,next=step/2;
  for(var i=1;i<pts.length;i++){
    var ax=pts[i-1][0],ay=pts[i-1][1],bx=pts[i][0],by=pts[i][1];
    var dx=bx-ax,dy=by-ay,seg=Math.sqrt(dx*dx+dy*dy);
    if(seg<0.001) continue;
    while(next<=dist+seg){
      var t=(next-dist)/seg;
      out.push([ax+t*dx,ay+t*dy]);
      next+=step;
    }
    dist+=seg;
  }
  return out;
}

function startMap(){
  d3.json("https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json").then(function(world){
    var host=document.getElementById("map");host.textContent="";
    var feats=topojson.feature(world,world.objects.countries).features
              .filter(function(d){return d.properties.name!=="Antarctica";});
    ALLFEATS=feats;
    var proj=d3.geoEqualEarth().fitSize([960,480],{type:"FeatureCollection",features:feats});
    geoPath=d3.geoPath(proj);
    // Keep the projection in 960×480 space (RLAYOUT, paintDeltas, and the
    // zoom transform all assume it). To go full-bleed we set preserveAspectRatio
    // to "xMidYMid slice" so the SVG fills/crops its container instead of
    // letterboxing.
    svgSel=d3.select(host).append("svg")
      .attr("viewBox","0 0 960 480")
      .attr("preserveAspectRatio","xMidYMid slice")
      .attr("role","img").attr("aria-label","World map of US alignment");

    // Invisible background rect — does two jobs:
    //   1. Makes drag-to-pan work when starting from open ocean (d3.zoom
    //      needs an element to grab).
    //   2. Treats a click on the ocean as "click off the current selection",
    //      mirroring the map-app convention. The drag-vs-click distinction
    //      is gated on `_panMoved`, set by the zoom callbacks below — a true
    //      drag suppresses the trailing click, while a quick tap fires it.
    svgSel.append("rect").attr("class","panbg")
      .attr("width",960).attr("height",480).attr("fill","transparent")
      .on("click", function(){
        if(_panMoved){ _panMoved=false; return; }
        if(selName || selRegion) clearSelection();
        else _setDockHidden(true);   // already empty, just collapse the panel
      });

    // Single transform group that gets the zoom/pan; all map layers live inside it
    var gMap = svgSel.append("g").attr("class","zoom-group");

    // Base physical layers (below country fills)
    gMap.append("path").datum({type:"Sphere"})
      .attr("class","phy-ocean").attr("d",geoPath);
    gMap.append("path").datum(d3.geoGraticule().step([30,30])())
      .attr("class","phy-graticule").attr("d",geoPath);

    var gC=gMap.append("g");
    gC.selectAll("path").data(feats).join("path")
      .attr("class","cty")
      .attr("d",geoPath).attr("stroke",cssv("--stroke")).attr("stroke-width",0.5)
      .on("click",function(e,d){showCountry(d.properties.name);})
      .append("title").text(function(d){return d.properties.name;});

    nameToFeat={};
    feats.forEach(function(f){ nameToFeat[f.properties.name]=f; });
    FEATFORKEY=function(k){
      if(nameToFeat[k])return nameToFeat[k];
      var alt={"Dem. Rep. Congo":"Dem. Rep. Congo","Czechia":"Czech Rep.",
               "North Macedonia":"Macedonia","Dominican Republic":"Dominican Rep."};
      if(alt[k]&&nameToFeat[alt[k]])return nameToFeat[alt[k]];
      return null;
    };

    // Rivers above country fills so they're visible
    gMap.append("path").datum(PHY_RIVERS)
      .attr("class","phy-rivers").attr("d",geoPath);

    // Mountain triangle symbols — sampled at 9px intervals along ridge polylines
    // so every range is represented across its full geographic extent.
    var gMtn=gMap.append("g").attr("class","mtn-layer");
    MTN_RIDGES.forEach(function(ridge){
      var projPts=ridge.map(function(c){return proj(c);})
        .filter(function(p){return p&&!isNaN(p[0])&&!isNaN(p[1]);});
      if(projPts.length<2) return;
      sampleAlongLine(projPts,9).forEach(function(p){
        gMtn.append("path")
          .attr("class","mtn-sym")
          .attr("transform","translate("+p[0].toFixed(1)+","+p[1].toFixed(1)+")")
          .attr("d","M0,-3 L2.5,2 L-2.5,2 Z");
      });
    });

    gOut=gMap.append("g");   // region outline group (rebuilt per president)
    gD =gMap.append("g").attr("class","delta-layer"); // delta chevrons

    // Region labels with leader lines (RLAYOUT is hard-coded in 960x480 space).
    // Built only when the current president actually defines regions — until
    // v3 regions are re-derived, the labels are suppressed (they'd all
    // dead-end at showRegion → goOverview otherwise).
    if(REGIONS && Object.keys(REGIONS).length){
      var gL=gMap.append("g");
      Object.keys(RLAYOUT).forEach(function(r){
        var Lp=RLAYOUT[r];
        var g=gL.append("g").attr("class","rglabel").datum(r)
          .on("click",function(){showRegion(r);});
        g.append("line").attr("class","rglead")
          .attr("x1",Lp.lx).attr("y1",Lp.ly).attr("x2",Lp.tx).attr("y2",Lp.ty);
        g.append("circle").attr("class","rgdot")
          .attr("cx",Lp.tx).attr("cy",Lp.ty).attr("r",2.4);
        var anchor = Lp.lx<140 ? "start" : (Lp.lx>820?"end":"middle");
        var txt=g.append("text")
          .attr("x",Lp.lx).attr("y",Lp.ly)
          .attr("text-anchor",anchor)
          .text(r);
        var tw=txt.node().getComputedTextLength();
        var padX=14, padY=13;
        var rx = anchor==="start" ? Lp.lx-padX : (anchor==="end" ? Lp.lx-tw-padX : Lp.lx-tw/2-padX);
        g.insert("rect",":first-child")
          .attr("class","rghit")
          .attr("x",rx).attr("y",Lp.ly-padY)
          .attr("width",tw+padX*2).attr("height",padY*2)
          .attr("rx",6);
      });
    }

    // Zoom + pan. scaleExtent: 1 = unzoomed (full world), up to 12x.
    // translateExtent keeps the map roughly within the original viewport so
    // you can't pan the world off-screen.
    // The "start" handler resets _panMoved; the "zoom" handler sets it to
    // true on any pointer-driven movement. The panbg click handler reads
    // _panMoved to tell a drag from a tap, so panning the map doesn't
    // accidentally clear the user's selection.
    _mapZoom = d3.zoom()
      .scaleExtent([1, 12])
      .translateExtent([[-100,-100],[1060,580]])
      .on("start", function(){ _panMoved = false; })
      .on("zoom", function(event){
        gMap.attr("transform", event.transform);
        if(event.transform.k !== _zoomK){ _zoomK=event.transform.k; paintDeltas(); }
        var src = event.sourceEvent;
        if(src && (src.type === "mousemove" || src.type === "touchmove")) _panMoved = true;
      });
    svgSel.call(_mapZoom);
    // Disable D3's default double-click-to-zoom; we use the button for reset.
    svgSel.on("dblclick.zoom", null);

    buildRegionGeometry();
    paint(); paintDeltas();
  }).catch(function(){
    document.getElementById("map").innerHTML='<div class="map-loading">Map data could not be loaded. Country search still works.</div>';
  });
}

/* Reset the map zoom/pan back to the default world view. Exposed for the
   Reset button in index.html. */
function resetMapZoom(){
  if(!svgSel || !_mapZoom) return;
  var dur = prefersReducedMotion() ? 0 : 280;
  svgSel.transition().duration(dur).call(_mapZoom.transform, d3.zoomIdentity);
}

/* Clear all selection state and return to the friendly overview. */
function goOverview(){
  selName=null; selRegion=null;
  paint(); paintDeltas();
  setTab("dossier");
  clearPanel();
  resetMapZoom();
}

/* Clear selection WITHOUT resetting the map zoom. Used for ocean clicks where
   the user is signaling "close this dossier" but not "go back to the full
   world view" — they're likely still inspecting a region they've zoomed into. */
function clearSelection(){
  selName=null; selRegion=null;
  paint(); paintDeltas();
  setTab("dossier");
  clearPanel();  // hides the dock via _setDockHidden(true)
}

/* ---- floating chrome helpers (legend, methodology modal, mobile sheet) ---- */
function toggleLegend(){
  var card=document.getElementById("legendCard");
  var btn =document.getElementById("legendToggle");
  if(!card) return;
  var collapsed=card.classList.toggle("collapsed");
  if(btn) btn.setAttribute("aria-expanded", collapsed?"false":"true");
}
var _methPrevFocus=null;
function openMethodology(){
  var m=document.getElementById("methodologyModal");
  if(!m) return;
  _methPrevFocus=document.activeElement;
  // Lazy-load the iframe on first open — the methodology page is ~62 KB
  // (its own fonts + CSS); no point fetching it at page-init for users
  // who never click the button. Subsequent opens reuse the cached page
  // including scroll position.
  var iframe=document.getElementById("methodologyFrame");
  if(iframe && !iframe.getAttribute("src")){
    iframe.setAttribute("src","/methodology.html");
    // Bind Escape inside the iframe too — same-origin so contentDocument
    // is accessible. Without this, Esc only works while focus is in the
    // parent app, not while the user is scrolling/interacting with the
    // methodology page itself. Backdrop click and × button still close
    // independently if this hook ever fails (cross-origin / sandbox).
    iframe.addEventListener("load", function(){
      try {
        iframe.contentDocument.addEventListener("keydown", function(e){
          if(e.key === "Escape") closeMethodology();
        });
      } catch(_) { /* same-origin guard tripped — non-blocking */ }
    }, { once: true });
  }
  m.hidden=false;
  // Focus the close button so Esc + keyboard navigation just work.
  var closeBtn=m.querySelector(".modal-close");
  if(closeBtn) closeBtn.focus();
}
function closeMethodology(){
  var m=document.getElementById("methodologyModal");
  if(!m) return;
  m.hidden=true;
  if(_methPrevFocus && _methPrevFocus.focus) _methPrevFocus.focus();
}

/* ---- Evidence-pack modal ----------------------------------------------
   Mirrors the methodology-modal pattern (role=dialog, aria-modal,
   backdrop-click close, focus to the close button, Esc handled via the
   global keydown handler below). Content is built as DOM here — no iframe.
   The canonical 7 memo angles fix the render order so the layout stays
   consistent across packs even when some angles are omitted. */
var PACK_MEMO_ORDER = [
  "Diplomacy",
  "Security",
  "Economic statecraft",
  "Technology & export controls",
  "Human rights",
  "Regional dynamics",
  "Time cuts"
];
var PACK_SIGN_LABEL = {
  weakened:     "Weakened",
  strengthened: "Strengthened",
  mixed:        "Mixed"
};
var _packPrevFocus=null;

function openPack(nameOrKey){
  var p = packFor(nameOrKey);
  var modal = document.getElementById("packModal");
  var body  = document.getElementById("packBody");
  if(!p || !modal || !body) return;
  _packPrevFocus = document.activeElement;
  body.innerHTML = _renderPackHtml(p, nameOrKey);
  modal.hidden = false;
  var closeBtn = modal.querySelector(".modal-close");
  if(closeBtn) closeBtn.focus();
}
function closePack(){
  var modal = document.getElementById("packModal");
  if(!modal) return;
  modal.hidden = true;
  // Reset scroll for the next open so a long pack doesn't reopen mid-scroll.
  var body = document.getElementById("packBody");
  if(body) body.scrollTop = 0;
  if(_packPrevFocus && _packPrevFocus.focus) _packPrevFocus.focus();
}

/* Build the full pack modal body. All prose flows through _renderProseBlock
   so multi-sentence values render as separate paragraphs (no run-on walls).
   Memos go through _detailsSection (collapsed by default). Nothing is
   stripped — empty fields are simply not rendered. */
function _renderPackHtml(p, fallbackName){
  var title = _escHtml(p.country || fallbackName || "");
  var meta  = [];
  if(p.packVersion) meta.push('<b>v'+_escHtml(p.packVersion)+'</b>');
  if(p.asOf)        meta.push('asOf: '+_escHtml(p.asOf));
  if(p.pipeline)    meta.push(_escHtml(p.pipeline));

  var html = '';

  // --- Header: country · "Evidence pack" · packVersion · pipeline -----------
  html += '<div class="pack-head">';
  html += '<h2>'+title+'</h2>';
  html += '<span class="pack-kind">Evidence pack</span>';
  if(meta.length){
    html += '<div class="pack-meta">'+meta.join(' &nbsp;·&nbsp; ')+'</div>';
  }
  html += '</div>';

  // --- Timeline (required, non-empty per schema) ---------------------------
  if(Array.isArray(p.timeline) && p.timeline.length){
    html += '<div class="pack-sech">Timeline</div>';
    html += '<ul class="pack-timeline">';
    p.timeline.forEach(function(t){
      if(!t) return;
      var signCls = (t.sign==="strengthened" || t.sign==="weakened" || t.sign==="mixed")
                    ? ('sign-'+t.sign) : 'sign-mixed';
      var signTitle = PACK_SIGN_LABEL[t.sign] || "Mixed";
      var srcHtml = '';
      if(t.sourceLabel || t.sourceUrl){
        var lab = _escHtml(t.sourceLabel || t.sourceUrl || '');
        srcHtml = '<div class="pt-src">'+
          (t.sourceUrl
             ? '<a href="'+_escHtml(t.sourceUrl)+'" target="_blank" rel="noopener noreferrer">'+lab+'</a>'
             : lab)+
          '</div>';
      }
      html +=
        '<li>'+
          '<div class="pt-date">'+_escHtml(t.date||'')+'</div>'+
          '<div class="pt-sign '+signCls+'" title="'+_escHtml(signTitle)+'" aria-label="'+_escHtml(signTitle)+'"></div>'+
          '<div class="pt-text">'+
            '<div class="pt-label">'+_escHtml(t.label||'')+'</div>'+
            (t.detail ? '<div class="pt-detail">'+_escHtml(t.detail)+'</div>' : '')+
            srcHtml+
          '</div>'+
        '</li>';
    });
    html += '</ul>';
  }

  // --- Baseline ------------------------------------------------------------
  if(p.baseline){
    html += '<div class="pack-sech">Inherited trajectory</div>';
    html += '<div class="pack-block">'+_renderProseBlock(p.baseline)+'</div>';
  }

  // --- What happened -------------------------------------------------------
  if(p.whatHappened){
    html += '<div class="pack-sech">What happened</div>';
    html += '<div class="pack-block">'+_renderProseBlock(p.whatHappened)+'</div>';
  }

  // --- The 7 policy-angle memos, rendered through _detailsSection ---------
  // Fix render order with PACK_MEMO_ORDER so layouts stay consistent across
  // packs; unknown angles get appended at the end so nothing is dropped (the
  // validator flags them separately).
  if(Array.isArray(p.memos) && p.memos.length){
    html += '<div class="pack-sech">Memos by angle</div>';
    var byAngle = {};
    p.memos.forEach(function(m){
      if(!m || !m.angle) return;
      // Preserve first occurrence; duplicates surface in the validator, but
      // the renderer should still show something rather than blank out.
      if(!byAngle[m.angle]) byAngle[m.angle] = m;
    });
    var rendered = {};
    PACK_MEMO_ORDER.forEach(function(angle){
      var m = byAngle[angle]; if(!m) return;
      html += _renderMemoSection(m);
      rendered[angle] = true;
    });
    // Any non-canonical angles (validator warns; renderer doesn't strip).
    p.memos.forEach(function(m){
      if(!m || !m.angle || rendered[m.angle]) return;
      if(PACK_MEMO_ORDER.indexOf(m.angle) !== -1) return;
      html += _renderMemoSection(m);
    });
  }

  // --- Attribution signals -------------------------------------------------
  if(Array.isArray(p.attributionSignals) && p.attributionSignals.length){
    html += '<div class="pack-sech">Attribution signals</div>';
    html += '<ul class="pack-list">';
    p.attributionSignals.forEach(function(s){
      if(!s) return;
      var text = _escHtml(s.text||'');
      var srcHtml = '';
      if(s.sourceLabel || s.sourceUrl){
        var lab = _escHtml(s.sourceLabel || s.sourceUrl || '');
        srcHtml = '<span class="pl-src">'+
          (s.sourceUrl
            ? '<a href="'+_escHtml(s.sourceUrl)+'" target="_blank" rel="noopener noreferrer">'+lab+'</a>'
            : lab)+
          '</span>';
      }
      html += '<li>'+text+srcHtml+'</li>';
    });
    html += '</ul>';
  }

  // --- Contested points ----------------------------------------------------
  if(Array.isArray(p.contestedPoints) && p.contestedPoints.length){
    html += '<div class="pack-sech">Contested points</div>';
    html += '<ul class="pack-list">';
    p.contestedPoints.forEach(function(c){
      if(!c) return;
      html += '<li>'+_escHtml(c)+'</li>';
    });
    html += '</ul>';
  }

  // --- Gaps ----------------------------------------------------------------
  if(Array.isArray(p.gaps) && p.gaps.length){
    html += '<div class="pack-sech">Gaps the pack could not close</div>';
    html += '<ul class="pack-list">';
    p.gaps.forEach(function(g){
      if(!g) return;
      html += '<li>'+_escHtml(g)+'</li>';
    });
    html += '</ul>';
  }

  // --- Sources (full list at the bottom) -----------------------------------
  if(Array.isArray(p.sources) && p.sources.length){
    html += '<div class="pack-sech">Sources</div>';
    html += '<ul class="sources">';
    p.sources.forEach(function(s){
      if(!s) return;
      var lab = _escHtml(s.label||'');
      if(s.url){
        html += '<li><a href="'+_escHtml(s.url)+'" target="_blank" rel="noopener noreferrer">'+lab+'</a></li>';
      } else {
        html += '<li>'+lab+'</li>';
      }
    });
    html += '</ul>';
  }

  return html;
}

/* Render one memo as a collapsible <details>. Reuses _detailsSection so the
   chevron/title styling matches the dossier accordion. Per-memo sources go
   in a small list at the end of the body. */
function _renderMemoSection(m){
  if(!m || !m.angle) return "";
  var inner = _renderProseBlock(m.text||"");
  if(Array.isArray(m.sources) && m.sources.length){
    inner += '<ul class="pack-memo-sources">';
    m.sources.forEach(function(s){
      if(!s) return;
      var lab = _escHtml(s.label||'');
      if(s.url){
        inner += '<li><a href="'+_escHtml(s.url)+'" target="_blank" rel="noopener noreferrer">'+lab+'</a></li>';
      } else {
        inner += '<li>'+lab+'</li>';
      }
    });
    inner += '</ul>';
  }
  return _detailsSection(m.angle, inner);
}

/* Mobile bottom-sheet: tap the handle / tab bar / any panel content area to
   expand from peek; tap outside the dock to collapse. On desktop these are
   no-ops because the CSS class has no effect. */
function openSheet(){
  var dock=document.getElementById("dock");
  if(dock) dock.classList.add("sheet-open");
}
function closeSheet(){
  var dock=document.getElementById("dock");
  if(dock) dock.classList.remove("sheet-open");
}
function toggleSheet(){
  var dock=document.getElementById("dock");
  if(dock) dock.classList.toggle("sheet-open");
}

/* Desktop-only: widen the dock panel to ~820px for more reading room.
   Session state only (no localStorage). Mobile CSS forces width:100%
   on the bottom sheet, so this class is a desktop affordance. */
function toggleDockExpand(){
  var dock=document.getElementById("dock");
  var btn =document.getElementById("dockExpand");
  if(!dock) return;
  var expanded=dock.classList.toggle("expanded");
  if(btn){
    btn.setAttribute("aria-pressed", expanded?"true":"false");
    btn.title = expanded ? "Restore panel" : "Expand panel";
    btn.setAttribute("aria-label", expanded ? "Restore panel" : "Expand panel");
    btn.innerHTML = expanded ? "&#10529;" : "&#10530;"; // ⤡ restore vs. ⤢ maximize
  }
}

/* ---- country search (uses the global allKeys for the current president) ---- */
document.getElementById("search").addEventListener("keydown",function(e){
  if(e.key!=="Enter")return;
  var q=this.value.trim().toLowerCase();if(!q)return;
  var hit=allKeys.find(function(k){return k.toLowerCase()===q;})||
          allKeys.find(function(k){return k.toLowerCase().indexOf(q)===0;})||
          allKeys.find(function(k){return k.toLowerCase().indexOf(q)>-1;});
  if(hit)showCountry(hit);
  else document.getElementById("pbody").innerHTML='<div class="empty-state"><h2 class="empty-h">Nothing matched</h2><p class="empty-lead">No country matches that search. Try another spelling.</p></div>';
});


/* ---- global keyboard: Esc closes modal / collapses sheet / clears selection ---- */
document.addEventListener("keydown",function(e){
  if(e.key!=="Escape") return;
  // Modal precedence: evidence pack first (most recently-opened surface),
  // then methodology, then the mobile sheet, then the country/region selection.
  var pm=document.getElementById("packModal");
  if(pm && !pm.hidden){ closePack(); return; }
  var m=document.getElementById("methodologyModal");
  if(m && !m.hidden){ closeMethodology(); return; }
  var dock=document.getElementById("dock");
  if(dock && dock.classList.contains("sheet-open")){ closeSheet(); return; }
  if(selName || selRegion){ goOverview(); }
});


/* ---- init ---- */
(function(){
  var first=presidentList()[0];
  if(first) loadPresident(first);
  populateSelector();
  renderHeader();
  buildLegend();
  clearPanel();
  startMap();
  document.getElementById("acustomq").addEventListener("keydown",function(e){
    if(e.key==="Enter") runCustomQ();
  });
  // On narrow viewports the legend card defaults to collapsed (just the
  // Filter button) to leave room for the search and the map.
  if(window.matchMedia && window.matchMedia("(max-width:720px)").matches){
    var lc=document.getElementById("legendCard");
    var lt=document.getElementById("legendToggle");
    if(lc) lc.classList.add("collapsed");
    if(lt) lt.setAttribute("aria-expanded","false");
  }
})();

/* ---- AI Analysis panel ---- */
var _aAbort=null;
var _aPreset=-1;

/* Legacy entry point retained for any callers (e.g. _runQuery's guard). In
   the redesigned UI, "opening analysis" means switching to the Ask AI tab. */
function toggleAnalysis(){ setTab("askai"); }

function refreshAnalysisBtns(){
  var label=_buildContextLabel();
  var el=document.getElementById("acontext");
  if(el) el.innerHTML=label?"Focus: <b>"+_escHtml(label)+"</b>":"";
  var inp=document.getElementById("acustomq");
  if(inp){
    if(selName) inp.placeholder="Ask about "+selName+"…";
    else if(selRegion) inp.placeholder="Ask about the "+selRegion+" region…";
    else inp.placeholder="Ask your own question about this foreign policy posture…";
  }
}

function _buildContextLabel(){
  if(selName) return selName;
  if(selRegion) return selRegion+" region";
  return "";
}

function _keyForIn(name, dossier){
  if(ALIAS[name]&&dossier[ALIAS[name]]) return ALIAS[name];
  if(dossier[name]) return name;
  return null;
}

/* Per-entry summary for the LLM context. Reads v3 fields with v2 back-compat:
   missing `effect` → "unscored"; missing `inherited` → use `baseline`. */
function _entrySummary(d){
  if(!d) return "";
  var L=[];
  L.push("State: "+(STATE_NAME[d.state]||d.state)+".");
  var e=effectOf(d), m=magnitudeOf(d);
  L.push("Effect: "+(EFFECT_NAME[e]||e)+(m?(" ("+MAGNITUDE_NAME[m]+")"):"")+".");
  if(e==="unscored" && d.unscoredReason)
    L.push("Unscored reason: "+(UNSCORED_REASON_NAME[d.unscoredReason]||d.unscoredReason)+".");
  if(d.role)        L.push("Role: "+d.role+".");
  if(d.confidence)  L.push("Confidence: "+d.confidence+".");
  if(d.evidence)    L.push("Evidence: "+d.evidence+".");
  if(d.contested)   L.push("Contested: yes.");
  var inh=inheritedTextOf(d);
  if(inh)           L.push("Inherited trajectory: "+inh);
  if(d.outcome && d.outcome!=="—")
                    L.push("Outcome (what happened to US position): "+d.outcome);
  var pts=pointsOf(d);
  if(pts.length)    L.push("Causal argument:\n"+pts.map(function(p){return "• "+p;}).join("\n"));
  if(d.counterargument && d.counterargument!=="—")
                    L.push("Counterargument: "+d.counterargument);
  CONDITIONAL_NOTE_ORDER.forEach(function(field){
    if(d[field] && d[field]!=="—")
      L.push(CONDITIONAL_NOTE_LABEL[field]+": "+d[field]);
  });
  // The 5 levers (object form; back-compat for the legacy array form too) —
  // one line per present lever so the AI panel sees the per-lever reasoning.
  if(d.levers){
    var leverLines=[];
    if(!Array.isArray(d.levers) && typeof d.levers === "object"){
      LEVER_ORDER.forEach(function(id){
        // AI grounding: use _dsvLeverTechText, NOT _dsvLeverProse.
        // The model needs the sourced, citation-bearing `.text`
        // (with [Source, date] brackets), not the citation-free
        // plain-English `.summary` the dossier surface shows.
        // For the legacy plain-string shape, the string is the
        // technical text; for object-shape values, prefer .text and
        // fall back to .summary only if .text is missing.
        var v = _dsvLeverTechText(d.levers[id]);
        if(v) leverLines.push(LEVER_LABEL[id]+" — "+v);
      });
    } else if(Array.isArray(d.levers)){
      d.levers.forEach(function(item){
        if(!item || !item.lever) return;
        var label=LEVER_LABEL[item.lever]||item.lever;
        var sign =item.sign ? " ("+item.sign+")" : "";
        leverLines.push(label+sign);
      });
    }
    if(leverLines.length) L.push("Five levers:\n"+leverLines.map(function(s){return "• "+s;}).join("\n"));
  }
  if(d.userDirected)L.push("User-directed placement note: "+d.userDirected);
  return L.join("\n");
}

function buildContext(){
  var ids=presidentList();
  var lines=[
    "You are an analytical assistant for the Foreign Policy Atlas, a sourced ledger of U.S. foreign-policy posture across administrations.",
    "Loaded presidents: "+ids.map(function(id){return (window.PRESIDENTS[id].label||id)+" (as of "+(window.PRESIDENTS[id].asOf||"unknown")+")";}).join("; ")+".",
    "Currently displayed on the map: "+((window.PRESIDENTS[CURRENT]||{}).label||CURRENT)+".",
    "",
    "The atlas reads on TWO INDEPENDENT AXES:",
    "  • state  — where the U.S. relationship STANDS today: Core Ally | Aligned | Neutral | Strained | Adversarial.",
    "  • effect — what THIS president CAUSED vs. the inherited trajectory: helped | mixed | hurt | unscored.",
    "Magnitude (modest | material | major) applies only to helped/hurt.",
    "`effect` is measured against the `inherited` field (the fixed counterfactual), not against an idealized baseline.",
    "Treat `outcome` (what happened to the US position) as distinct from `effect` (the president's causal contribution).",
    "Entries without an `effect` field are legacy/awaiting migration; treat them as unscored and rely on `state` plus any `inherited`/points."
  ];

  if(selName){
    lines.push("","=== Country: "+selName+" — across all loaded presidents ===");
    ids.forEach(function(id){
      var P=window.PRESIDENTS[id];
      var dos=P.dossier||{}, outs=P.outcomes||{};
      var k=_keyForIn(selName,dos);
      var d=k?dos[k]:null;
      lines.push("","-- "+(P.label||id)+" --");
      if(!d){ lines.push("No individual entry for this country under this administration."); return; }
      lines.push(_entrySummary(d));
      var o=outs[k];
      if(o&&o.best&&o.best!=="—")
        lines.push("Projected outcomes — Best: "+o.best+" | Base: "+o.base+" | Downside: "+o.down);
    });
  } else if(selRegion){
    lines.push("","=== Region: "+selRegion+" — across all loaded presidents ===");
    ids.forEach(function(id){
      var P=window.PRESIDENTS[id];
      var dos=P.dossier||{}, regs=P.regions||{};
      var R=regs[selRegion];
      lines.push("","-- "+(P.label||id)+" --");
      if(R){
        lines.push("Tilt: "+R.tilt);
        lines.push("Dynamics: "+R.dynamics);
        if(R.projects&&R.projects.length) lines.push("Projects: "+R.projects.join("; "));
        lines.push("US goal: "+R.goal);
        lines.push("Stakes: "+R.stakes);
      }
      var rc=Object.keys(dos).filter(function(k){return dos[k]&&dos[k].region===selRegion&&dos[k].state!=="us"&&k!=="Venezuela_note";});
      if(rc.length){
        lines.push("Countries in this region (state · effect [magnitude]):");
        rc.forEach(function(k){
          var d=dos[k], m=magnitudeOf(d);
          lines.push("  "+k+": "+(STATE_NAME[d.state]||d.state)+" · "+EFFECT_NAME[effectOf(d)]+(m?(" ("+MAGNITUDE_NAME[m]+")"):"")+
                     (d.contested?" [contested]":""));
        });
      }
    });
  } else {
    lines.push("","=== Full atlas — all loaded presidents ===");
    ids.forEach(function(id){
      var P=window.PRESIDENTS[id];
      var dos=P.dossier||{};
      var keys=Object.keys(dos).filter(function(k){return dos[k]&&dos[k].state!=="us"&&k!=="Venezuela_note";});
      lines.push("","-- "+(P.label||id)+" ("+keys.length+" entries) --");
      var sCounts={}, eCounts={};
      keys.forEach(function(k){
        var d=dos[k];
        sCounts[d.state]=(sCounts[d.state]||0)+1;
        var e=effectOf(d); eCounts[e]=(eCounts[e]||0)+1;
      });
      var sParts=[]; STATE_ORDER.forEach(function(s){if(sCounts[s])sParts.push(STATE_NAME[s]+" "+sCounts[s]);});
      var eParts=[]; EFFECT_ORDER.forEach(function(e){if(eCounts[e])eParts.push(EFFECT_NAME[e]+" "+eCounts[e]);});
      if(sParts.length) lines.push("  By state:  "+sParts.join(" | "));
      if(eParts.length) lines.push("  By effect: "+eParts.join(" | "));
      keys.forEach(function(k){
        var d=dos[k], m=magnitudeOf(d);
        lines.push("  "+k+": "+(STATE_NAME[d.state]||d.state)+" · "+EFFECT_NAME[effectOf(d)]+(m?(" ("+MAGNITUDE_NAME[m]+")"):"")+
                   " · region:"+(d.region||"—")+(d.contested?" [contested]":""));
      });
    });
  }
  return lines.join("\n");
}

var PRESETS_COUNTRY=[
  "Summarize the regional trends relevant to this country's current alignment.",
  "What are the key risks that could shift this country's alignment over the next 12 months?",
  "Provide historical context: how does this country's current posture compare to its relationships with previous U.S. administrations?"
];
var PRESETS_REGION=[
  "Summarize the dominant trends across countries in this region.",
  "What are the key risks that could shift alignment in this region over the next 12 months?",
  "Provide historical context: how does this region's current posture compare to prior U.S. administrations?"
];
var PRESETS_GLOBAL=[
  "Summarize the major regional trends visible across the full atlas.",
  "What are the highest-risk countries or regions for alignment shifts over the next 12 months?",
  "How does this global alignment pattern compare historically to prior administrations?"
];

function _getPresets(){
  if(selName) return PRESETS_COUNTRY;
  if(selRegion) return PRESETS_REGION;
  return PRESETS_GLOBAL;
}

function runAnalysis(idx){
  _aPreset=idx;
  [0,1,2].forEach(function(i){
    var b=document.getElementById("abtn"+i);
    if(b) b.classList.toggle("asel",i===idx);
  });
  _runQuery(_getPresets()[idx]);
}

function runCustomQ(){
  var inp=document.getElementById("acustomq");
  if(!inp) return;
  var q=inp.value.trim(); if(!q) return;
  _aPreset=-1;
  [0,1,2].forEach(function(i){var b=document.getElementById("abtn"+i);if(b)b.classList.remove("asel");});
  _runQuery(q);
}

function _setABtnsDisabled(dis){
  [0,1,2].forEach(function(i){var b=document.getElementById("abtn"+i);if(b)b.disabled=dis;});
  var inp=document.getElementById("acustomq"); if(inp) inp.disabled=dis;
  var sb=document.querySelector(".asend"); if(sb) sb.disabled=dis;
}

function _runQuery(question){
  if(_aAbort){_aAbort.abort();_aAbort=null;}
  var sec=document.getElementById("analysisSection");
  if(sec&&!sec.classList.contains("aopen")) toggleAnalysis();
  var res=document.getElementById("aresult");
  if(!res) return;
  res.innerHTML='<span class="aload">Thinking…</span>';
  _setABtnsDisabled(true);

  var ctrl=new AbortController();
  _aAbort=ctrl;

  fetch("/api/analyze",{
    method:"POST",
    headers:{"Content-Type":"application/json"},
    signal:ctrl.signal,
    body:JSON.stringify({
      model:"claude-opus-4-7",
      max_tokens:1024,
      stream:true,
      system:buildContext(),
      messages:[{role:"user",content:question}]
    })
  }).then(function(resp){
    if(!resp.ok){
      return resp.text().then(function(t){
        res.innerHTML='<span class="aload">Error '+resp.status+': '+_escHtml(t)+'</span>';
        _setABtnsDisabled(false); _aAbort=null;
      });
    }
    var reader=resp.body.getReader();
    var decoder=new TextDecoder();
    var buf="",fullText="";
    res.innerHTML="";

    function pump(){
      reader.read().then(function(chunk){
        if(chunk.done){
          _renderMarkdown(fullText,res);
          _setABtnsDisabled(false); _aAbort=null;
          var cl=document.createElement("button");
          cl.className="aclear"; cl.textContent="Clear";
          cl.onclick=function(){res.innerHTML="";};
          res.appendChild(cl);
          return;
        }
        buf+=decoder.decode(chunk.value,{stream:true});
        var lines=buf.split("\n"); buf=lines.pop();
        lines.forEach(function(line){
          if(!line.startsWith("data:")) return;
          var data=line.slice(5).trim();
          if(data==="[DONE]") return;
          try{
            var ev=JSON.parse(data);
            if(ev.type==="content_block_delta"&&ev.delta&&ev.delta.type==="text_delta"){
              fullText+=ev.delta.text;
              res.textContent=fullText;
            }
          }catch(e){}
        });
        pump();
      }).catch(function(err){
        if(err.name!=="AbortError")
          res.innerHTML='<span class="aload">Stream error: '+_escHtml(err.message)+'</span>';
        _setABtnsDisabled(false); _aAbort=null;
      });
    }
    pump();
  }).catch(function(err){
    if(err.name!=="AbortError")
      res.innerHTML='<span class="aload">Request failed: '+_escHtml(err.message)+'</span>';
    _setABtnsDisabled(false); _aAbort=null;
  });
}

function _escHtml(s){
  return String(s).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;");
}

function _renderMarkdown(text,el){
  var blocks=text.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").split(/\n\n+/);
  var html=blocks.map(function(block){
    block=block.trim(); if(!block) return "";
    if(/^#{1,3} /.test(block))
      return block.replace(/^#{1,3} (.+)$/,"<h4>$1</h4>");
    if(/^[-*] /.test(block)){
      var items=block.split(/\n/).map(function(l){return l.replace(/^[-*] (.+)$/,"<li>$1</li>");}).join("");
      return "<ul>"+items+"</ul>";
    }
    var p=block
      .replace(/\*\*(.+?)\*\*/g,"<strong>$1</strong>")
      .replace(/\*(.+?)\*/g,"<em>$1</em>")
      .replace(/\n/g," ");
    return "<p>"+p+"</p>";
  }).join("");
  el.innerHTML=html;
}
