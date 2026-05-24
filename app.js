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
  if(!entry) return "";
  if(entry.inherited && entry.inherited!=="—") return entry.inherited;
  if(entry.baseline  && entry.baseline !=="—") return entry.baseline;  // v2 fallback
  return "";
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
}

function outcomeBlock(k){
  var o=OUTCOMES[k];
  if(!o||o.best==="—")return"";
  return '<div class="outcome"><h3>Outcome line &mdash; what this could become</h3>'+
    '<div class="ocell"><span class="otag g">Best</span><span>'+o.best+'</span></div>'+
    '<div class="ocell"><span class="otag m">Base</span><span>'+o.base+'</span></div>'+
    '<div class="ocell"><span class="otag b">Downside</span><span>'+o.down+'</span></div></div>';
}

function showCountry(name){
  setTabSilent("country");
  selRegion=null;
  var k=keyFor(name)||name, d=DOSSIER[k], pb=document.getElementById("pbody");
  if(!d){
    pb.innerHTML='<div class="empty-state"><h2 class="empty-h">'+name+'</h2>'+
      '<p class="empty-lead">isn\'t individually classified in this ledger (shown neutral on the map). Most unclassified states did not see a distinct shift in U.S. strategic posture during this term.</p></div>';
    selName=null; paint(); paintDeltas(); return;
  }
  selName=name; refreshAnalysisBtns();
  var sColor=STATE_COLOR[d.state]||"--s-neutral";
  var sName =STATE_NAME [d.state]||"Unclassified";
  var sDesc =STATE_DESC [d.state]||"";

  // v3 fields with v2 back-compat
  var eff       = effectOf(d);            // helped|mixed|hurt|unscored
  var mag       = magnitudeOf(d);          // modest|material|major|null
  var inherited = inheritedOf(d);          // v3 inherited || v2 baseline
  var contested = isContestedEntry(d);     // v3 contested || trailing "interp"
  var pts       = pointsOf(d);             // points minus the "interp" sentinel
  var safeReg   = (d.region||"").replace(/'/g,"\\'");

  var html='<div class="ph"><span class="sw" style="background:var('+sColor+')"></span><h2>'+_escHtml(k)+'</h2></div>';

  // ----- Badges: state always; effect when the entry has been scored -----
  if(d.state!=="us"){
    html+='<div class="badges">';
    html+='<span class="badge"><span class="sw" style="background:var('+sColor+')"></span>'+
      '<b>'+_escHtml(sName)+'</b>'+(sDesc?' &middot; '+_escHtml(sDesc):'')+'</span>';
    // Effect badge — only rendered when the entry actually carries an `effect`
    // field. v2 entries (no `effect`) keep a clean state-only header until
    // they've been re-derived to v3.
    if(d.effect && EFFECT_NAME[d.effect]){
      var effLabel = EFFECT_NAME[d.effect];
      if(mag) effLabel += ' &middot; '+_escHtml(MAGNITUDE_NAME[mag]||mag);
      if(d.effect==="unscored" && d.unscoredReason && UNSCORED_REASON_NAME[d.unscoredReason]){
        effLabel += ' &middot; '+_escHtml(UNSCORED_REASON_NAME[d.unscoredReason]);
      }
      html+='<span class="badge"><span class="darr" data-effect="'+d.effect+'">'+EFFECT_GLYPH[d.effect]+'</span>'+
            '<b>'+effLabel+'</b> &middot; net effect vs. inherited trajectory</span>';
    }
    html+='</div>';
  }

  // Region link is interactive only when the current president actually has a
  // regions block. Until v3 regions are re-derived, render the region name as
  // a plain non-interactive label rather than a dead link.
  if(d.region){
    if(REGIONS && REGIONS[d.region]){
      html+='<div class="reg" onclick="showRegion(\''+safeReg+'\')">'+_escHtml(d.region)+' &rsaquo; view region</div>';
    } else if(d.region!=="—"){
      html+='<div class="reg reg-static">'+_escHtml(d.region)+'</div>';
    }
  }

  // ----- Inherited trajectory (the fixed counterfactual) -----
  if(inherited){
    html+='<div class="baseline"><span class="blab">Inherited trajectory (the counterfactual)</span>'+inherited+'</div>';
  }

  // ----- Outcome line: what HAPPENED to the US position (distinct from the
  //       causal points, and distinct from the OUTCOMES best/base/down block) -----
  if(d.outcome && d.outcome!=="—"){
    html+='<div class="outcome-line"><span class="blab">What happened to the US position</span>'+d.outcome+'</div>';
  }

  // ----- Points: the causal argument -----
  if(pts.length){
    html+='<ul class="pts" style="--dotc:var('+sColor+')">';
    pts.forEach(function(p){html+='<li>'+p+'</li>';});
    html+='</ul>';
  }

  // ----- Counterargument -----
  if(d.counterargument && d.counterargument!=="—"){
    html+='<div class="counterarg"><span class="blab">Strongest counterargument</span>'+d.counterargument+'</div>';
  }

  // ----- Five levers (v3 object form; back-compat to legacy array) -----
  if(d.levers){
    if(!Array.isArray(d.levers) && typeof d.levers === "object"){
      // Object form: keyed by lever id, value is short prose.
      var leverRows="";
      LEVER_ORDER.forEach(function(id){
        var prose=d.levers[id];
        if(prose && prose!=="—"){
          leverRows+='<div class="condnote"><span class="condnote-lab">'+LEVER_LABEL[id]+'</span>'+prose+'</div>';
        }
      });
      if(leverRows){
        html+='<div class="sech">Five levers</div>'+leverRows;
      }
    } else if(Array.isArray(d.levers) && d.levers.length){
      // Legacy array form: [{lever, sign}]. Renders as label · sign so
      // nothing breaks while data is migrating to the object shape.
      var legacyRows="";
      d.levers.forEach(function(L){
        if(!L || !L.lever) return;
        var label=LEVER_LABEL[L.lever]||L.lever;
        var sign =L.sign ? ' &middot; '+_escHtml(L.sign) : '';
        legacyRows+='<div class="condnote"><span class="condnote-lab">'+label+'</span>'+sign+'</div>';
      });
      if(legacyRows){
        html+='<div class="sech">Five levers</div>'+legacyRows;
      }
    }
  }

  // ----- Meta chips: Role · Confidence · Evidence -----
  var metaChips=[];
  if(d.role)                            metaChips.push({lab:'Role',       val:d.role});
  if(d.confidence)                      metaChips.push({lab:'Confidence', val:d.confidence});
  if(d.evidence)                        metaChips.push({lab:'Evidence',   val:d.evidence});
  if(metaChips.length){
    html+='<div class="metachips">';
    metaChips.forEach(function(c){
      html+='<span class="metachip"><span class="mclab">'+c.lab+'</span><span class="mcval">'+_escHtml(c.val)+'</span></span>';
    });
    html+='</div>';
  }

  // ----- Conditional analytic notes, each a labelled single-line block -----
  CONDITIONAL_NOTE_ORDER.forEach(function(field){
    var v=d[field];
    if(v && v!=="—"){
      html+='<div class="condnote"><span class="condnote-lab">'+CONDITIONAL_NOTE_LABEL[field]+'</span>'+v+'</div>';
    }
  });

  // ----- User-directed placement (Venezuela template) -----
  if(d.userDirected){
    html+='<div class="userdir"><span class="blab">User-directed placement</span>'+d.userDirected+'</div>';
  }

  // ----- Sources (label→url where url present) -----
  if(d.sources && d.sources.length){
    html+='<div class="sech">Sources</div><ul class="sources">';
    d.sources.forEach(function(s){
      if(!s) return;
      var label = _escHtml(s.label||"");
      if(s.url){
        html+='<li><a href="'+_escHtml(s.url)+'" target="_blank" rel="noopener noreferrer">'+label+'</a></li>';
      } else {
        html+='<li>'+label+'</li>';
      }
    });
    html+='</ul>';
  }

  // ----- Linked policies: clickable cross-card chips -----
  if(d.linkedPolicies && d.linkedPolicies.length){
    html+='<div class="sech">Linked policies</div><div class="linked-row">';
    d.linkedPolicies.forEach(function(lp){
      var safe=lp.replace(/'/g,"\\'");
      html+='<button type="button" class="linkchip" onclick="showCountry(\''+safe+'\')">'+_escHtml(lp)+'</button>';
    });
    html+='</div>';
  }

  // ----- Contested marker (replaces the old v2 "interp" note) -----
  if(contested){
    html+='<div class="interp">Contested call &mdash; reasonable analysts could score this differently.</div>';
  }

  // ----- Existing OUTCOMES best/base/down (kept verbatim — distinct from the
  //       v3 `outcome` field above) -----
  html+=outcomeBlock(k);

  pb.innerHTML=html;
  paint(); paintDeltas();
  var fF=FEATFORKEY&&FEATFORKEY(k); if(fF) flyTo(fF);
}

function showRegion(r){
  setTabSilent("region");
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
    appendDeltaMark(gD, pos.cx, pos.cy, e, magnitudeOf(d), size);
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
  var ft=document.getElementById("foot");  if(ft) ft.innerHTML=P.foot||"";
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

var PHY_MOUNTAINS = { type:"FeatureCollection", features:[
  // Himalayas & high Tibetan rim
  {type:"Feature",geometry:{type:"Polygon",coordinates:[[[66,34],[72,33],[78,31],[85,28],[92,26],[97,25],[97,28],[92,30],[85,31],[78,34],[72,36],[66,36],[66,34]]]}},
  // Hindu Kush / Karakoram / Pamir
  {type:"Feature",geometry:{type:"Polygon",coordinates:[[[58,36],[75,36],[75,39],[58,39],[58,36]]]}},
  // Alps
  {type:"Feature",geometry:{type:"Polygon",coordinates:[[[5,43.5],[17,46],[17,48],[5,46],[5,43.5]]]}},
  // Caucasus
  {type:"Feature",geometry:{type:"Polygon",coordinates:[[[37,40],[50,40],[50,44],[37,44],[37,40]]]}},
  // Zagros (Iran / Iraq border)
  {type:"Feature",geometry:{type:"Polygon",coordinates:[[[44,27],[58,27],[58,37],[44,37],[44,27]]]}},
  // Ural Mountains
  {type:"Feature",geometry:{type:"Polygon",coordinates:[[[56,50],[63,50],[63,68],[56,68],[56,50]]]}},
  // Scandinavian Mountains
  {type:"Feature",geometry:{type:"Polygon",coordinates:[[[4,57],[18,57],[25,70],[11,70],[4,57]]]}},
  // Atlas Mountains
  {type:"Feature",geometry:{type:"Polygon",coordinates:[[[-6,30],[11,30],[11,36],[-6,36],[-6,30]]]}},
  // Ethiopian Highlands
  {type:"Feature",geometry:{type:"Polygon",coordinates:[[[33,5],[43,5],[43,15],[33,15],[33,5]]]}},
  // Tian Shan / Altai
  {type:"Feature",geometry:{type:"Polygon",coordinates:[[[68,40],[95,40],[95,50],[68,50],[68,40]]]}},
  // Rocky Mountains / Sierra Nevada
  {type:"Feature",geometry:{type:"Polygon",coordinates:[[[-128,48],[-103,32],[-108,32],[-125,48],[-128,48]]]}},
  // Appalachians
  {type:"Feature",geometry:{type:"Polygon",coordinates:[[[-86,30],[-80,30],[-67,47],[-73,47],[-86,30]]]}},
  // Andes
  {type:"Feature",geometry:{type:"Polygon",coordinates:[[[-82,11],[-65,-16],[-68,-55],[-76,-55],[-80,-16],[-82,11]]]}},
  // Great Dividing Range (Australia)
  {type:"Feature",geometry:{type:"Polygon",coordinates:[[[148,-11],[154,-11],[151,-38],[145,-38],[148,-11]]]}}
]};

function startMap(){
  d3.json("https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json").then(function(world){
    var host=document.getElementById("map");host.textContent="";
    var feats=topojson.feature(world,world.objects.countries).features
              .filter(function(d){return d.properties.name!=="Antarctica";});
    ALLFEATS=feats;
    var proj=d3.geoNaturalEarth1().fitSize([960,480],{type:"FeatureCollection",features:feats});
    geoPath=d3.geoPath(proj);
    // Keep the projection in 960×480 space (RLAYOUT, paintDeltas, and the
    // zoom transform all assume it). To go full-bleed we set preserveAspectRatio
    // to "xMidYMid slice" so the SVG fills/crops its container instead of
    // letterboxing.
    svgSel=d3.select(host).append("svg")
      .attr("viewBox","0 0 960 480")
      .attr("preserveAspectRatio","xMidYMid slice")
      .attr("role","img").attr("aria-label","World map of US alignment");

    // Invisible background rect so drag-to-pan works when starting from ocean
    svgSel.append("rect").attr("class","panbg")
      .attr("width",960).attr("height",480).attr("fill","transparent");

    // Single transform group that gets the zoom/pan; all map layers live inside it
    var gMap = svgSel.append("g").attr("class","zoom-group");

    // Base physical layers (below country fills)
    gMap.append("path").datum({type:"Sphere"})
      .attr("class","phy-ocean").attr("d",geoPath);
    gMap.append("path").datum(d3.geoGraticule().step([30,30])())
      .attr("class","phy-graticule").attr("d",geoPath);
    gMap.append("path").datum(PHY_RIVERS)
      .attr("class","phy-rivers").attr("d",geoPath);

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

    // Mountains above country fills so they're visible (multiply blend darkens terrain areas)
    gMap.append("path").datum(PHY_MOUNTAINS)
      .attr("class","phy-mtns").attr("d",geoPath);

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
    _mapZoom = d3.zoom()
      .scaleExtent([1, 12])
      .translateExtent([[-100,-100],[1060,580]])
      .on("zoom", function(event){
        gMap.attr("transform", event.transform);
        if(event.transform.k !== _zoomK){ _zoomK=event.transform.k; paintDeltas(); }
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
  var inh=inheritedOf(d);
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
        var v=d.levers[id];
        if(v && v!=="—") leverLines.push(LEVER_LABEL[id]+" — "+v);
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
