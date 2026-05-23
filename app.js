/* =====================================================================
   Foreign Policy Atlas — application logic (president-agnostic).
   Data is supplied by data/<president>.js via the window.PRESIDENTS registry.
   This file renders whichever president is selected in the dropdown.

   Schema v2: each dossier entry has
     state    — core-ally | aligned | neutral | strained | adversarial | us
     delta    — ↑↑ | ↑ | → | ↓ | ↓↓ | —
     baseline — one sentence on what the prior administration left behind
     region, points[]
   The map color comes from state; an overlaid chevron at each country
   centroid shows delta.
   ===================================================================== */

/* ---- state + delta config (shared across presidents) ---- */
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

var DELTA_ORDER = ["↑↑","↑","→","↓","↓↓"];
var DELTA_NAME = {
  "↑↑": "major gain",
  "↑":      "modest gain",
  "→":      "held",
  "↓":      "modest damage",
  "↓↓":"major damage"
};

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
var hiddenState={}, hiddenDelta={}, selName=null, selRegion=null, tab="country", svgSel=null;
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


/* ---- legend with two rows (state + delta) and live counts ---- */
function buildLegend(){
  var L=document.getElementById("legend");
  L.innerHTML="";

  // count distribution for both axes (skip Venezuela_note and the US entry)
  var sc={}, dc={};
  Object.keys(DOSSIER).forEach(function(k){
    if(k==="Venezuela_note") return;
    var d=DOSSIER[k];
    if(!d || d.state==="us") return;
    sc[d.state]=(sc[d.state]||0)+1;
    if(d.delta) dc[d.delta]=(dc[d.delta]||0)+1;
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

  // ----- delta row -----
  var rowD=document.createElement("div"); rowD.className="legrow";
  var lblD=document.createElement("span"); lblD.className="leglabel"; lblD.textContent="Trump moved it";
  rowD.appendChild(lblD);
  DELTA_ORDER.forEach(function(da){
    var b=document.createElement("button");
    b.innerHTML='<span class="darr" data-delta="'+da+'">'+da+'</span>'+
                DELTA_NAME[da]+'<span class="count">'+(dc[da]||0)+'</span>';
    if(hiddenDelta[da]) b.classList.add("dim");
    b.onclick=function(){
      hiddenDelta[da]=!hiddenDelta[da];
      b.classList.toggle("dim",!!hiddenDelta[da]);
      paint(); paintDeltas();
    };
    rowD.appendChild(b);
  });
  L.appendChild(rowD);
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
  var html='<div class="empty-state">'+
    '<h2 class="empty-h">Tap any country</h2>'+
    '<p class="empty-lead">to see how its alignment shifted under this president &mdash; or jump straight into a region below.</p>'+
    '<p class="empty-sub">Regions</p>'+
    '<div class="reglist">';
  Object.keys(REGIONS).forEach(function(r){
    html+='<button type="button" onclick="showRegion(\''+r.replace(/'/g,"\\'")+'\')">'+r+'</button>';
  });
  html+='</div></div>';
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
      '<p class="empty-lead">isn\'t individually classified in this ledger (shown neutral on the map). Most unclassified states were not part of a distinct Trump-era initiative through May 2026.</p></div>';
    selName=null; paint(); paintDeltas(); return;
  }
  selName=name; refreshAnalysisBtns();
  var sColor=STATE_COLOR[d.state]||"--s-neutral";
  var sName =STATE_NAME [d.state]||"Unclassified";
  var sDesc =STATE_DESC [d.state]||"";

  var pts=(d.points||[]).slice(), interp=false;
  if(pts.length && pts[pts.length-1]==="interp"){interp=true;pts.pop();}
  var safeReg=(d.region||"").replace(/'/g,"\\'");

  var html='<div class="ph"><span class="sw" style="background:var('+sColor+')"></span><h2>'+k+'</h2></div>';

  // state + delta badges (suppressed for the US entry)
  if(d.state!=="us"){
    html+='<div class="badges">'+
      '<span class="badge"><span class="sw" style="background:var('+sColor+')"></span>'+
        '<b>'+sName+'</b>'+(sDesc?' &middot; '+sDesc:'')+'</span>';
    if(d.delta && d.delta!=="—"){
      html+='<span class="badge"><span class="darr" data-delta="'+d.delta+'">'+d.delta+'</span>'+
            '<b>'+(DELTA_NAME[d.delta]||"")+'</b> &middot; vs. prior administration</span>';
    }
    html+='</div>';
  }

  html+='<div class="reg" onclick="showRegion(\''+safeReg+'\')">'+(d.region||'')+' &rsaquo; view region</div>';

  // baseline block (skip if missing or em-dash)
  if(d.baseline && d.baseline!=="—"){
    html+='<div class="baseline"><span class="blab">Inherited from prior administration</span>'+d.baseline+'</div>';
  }

  html+='<ul class="pts" style="--dotc:var('+sColor+')">';
  pts.forEach(function(p){html+='<li>'+p+'</li>';});
  html+='</ul>';

  if(interp){
    html+='<div class="interp">Interpretive placement — based on overall posture rather than a single named event; reasonable analysts could score this differently.</div>';
  }
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
    var da=entry?entry.delta:null;
    var dim = !!s && (hiddenState[s] || (da && hiddenDelta[da]));
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

/* ---- delta marks at country centroids (separate g-layer for z-order) ----
   Each mark is sized to the country it sits inside, so a tiny island gets a
   small mark and Russia gets a clamped (not giant) one. The mark is a soft
   white-with-dark-outline arrow rotated to match the delta direction; the
   "strong" deltas (↑↑ / ↓↓) use a stacked double chevron head. Countries too
   small for an arrow get a dot fallback; ones too small even for that are
   skipped entirely.
*/
function appendDeltaMark(parentG, cx, cy, delta, size){
  // tiny: dot fallback (state still gets a visible mark, but no glyph)
  if(size < 9){
    var r = Math.max(size * 0.34, 2);
    parentG.append("circle")
      .attr("cx", cx).attr("cy", cy).attr("r", r)
      .attr("fill", "var(--arrow-fill)")
      .attr("stroke", "var(--arrow-outline)")
      .attr("stroke-width", 1.2);
    return;
  }
  // delta -> rotation (up=0°, right=90°, down=180°) and head style
  var deg, dbl;
  if(delta === "↑↑"){ deg = 0;   dbl = true;  }
  else if(delta === "↑"){ deg = 0;   dbl = false; }
  else if(delta === "→"){ deg = 90;  dbl = false; }
  else if(delta === "↓"){ deg = 180; dbl = false; }
  else if(delta === "↓↓"){ deg = 180; dbl = true;  }
  else return;

  // up-pointing arrow geometry centered on (cx, cy); rotated below.
  var s = size * 0.5;
  var c = size * 0.30;
  var g = size * 0.26;
  var d = "M "+cx+" "+(cy+s)+" L "+cx+" "+(cy-s)+
          " M "+(cx-c)+" "+(cy-s+c)+" L "+cx+" "+(cy-s)+" L "+(cx+c)+" "+(cy-s+c);
  if(dbl){
    d += " M "+(cx-c)+" "+(cy-s+c+g)+" L "+cx+" "+(cy-s+g)+" L "+(cx+c)+" "+(cy-s+c+g);
  }

  var wI = Math.max(size * 0.15, 1.3);
  var wO = wI + Math.max(size * 0.12, 1.5);

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
    if(!d || !d.delta || d.delta==="—" || d.state==="us") return;
    if(hiddenState[d.state] || hiddenDelta[d.delta]) return;
    if(selRegion && regionOf[k]!==selRegion) return;
    var pos = bestLabelTarget(f);
    if(!pos) return;
    var m = Math.min(pos.w, pos.h);
    if(m < 5) return;                    // too small for any mark
    var size = Math.min(m * 0.34, 30);   // 30 = ceiling so huge countries aren't giant
    appendDeltaMark(gD, pos.cx, pos.cy, d.delta, size);
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
  var rf={};
  Object.keys(regionOf).forEach(function(k){
    var r=regionOf[k]; if(!r||r==="—") return;
    var f=FEATFORKEY(k); if(!f) return;
    (rf[r]=rf[r]||[]).push(f);
  });
  REGIONFEATS=rf;
  if(gOut && geoPath){
    gOut.selectAll("*").remove();
    Object.keys(rf).forEach(function(r){
      gOut.append("path").datum(r).attr("class","rgoutline")
        .attr("d", geoPath({type:"FeatureCollection",features:rf[r]}));
    });
  }
}

function renderHeader(){
  var P=window.PRESIDENTS[CURRENT]||{};
  var hl=document.getElementById("hl");    if(hl) hl.textContent=P.headline||"Foreign Policy Atlas";
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
  selName=null; selRegion=null; hiddenState={}; hiddenDelta={};
  renderHeader();
  buildLegend();
  buildRegionGeometry();
  paint(); paintDeltas();
  resetMapZoom();
  setTab("dossier");
  clearPanel();
}


var _mapZoom=null;  // d3.zoom behavior, exposed for reset

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

    gOut=gMap.append("g");   // region outline group (rebuilt per president)
    gD =gMap.append("g").attr("class","delta-layer"); // delta chevrons

    // region labels with leader lines (layout-based; shared across presidents)
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

    // Zoom + pan. scaleExtent: 1 = unzoomed (full world), up to 12x.
    // translateExtent keeps the map roughly within the original viewport so
    // you can't pan the world off-screen.
    _mapZoom = d3.zoom()
      .scaleExtent([1, 12])
      .translateExtent([[-100,-100],[1060,580]])
      .on("zoom", function(event){
        gMap.attr("transform", event.transform);
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

function buildContext(){
  var ids=presidentList();
  var lines=[
    "You are an analytical assistant for the Foreign Policy Atlas, a ledger of U.S. foreign-policy alignment across administrations.",
    "Loaded presidents: "+ids.map(function(id){return (window.PRESIDENTS[id].label||id)+" (as of "+(window.PRESIDENTS[id].asOf||"unknown")+")";}).join("; ")+".",
    "Currently displayed on the map: "+((window.PRESIDENTS[CURRENT]||{}).label||CURRENT)+".",
    "States: Core Ally | Aligned | Neutral | Strained | Adversarial.",
    "Deltas (↑↑ ↑ → ↓ ↓↓): change from the prior administration's baseline."
  ];

  if(selName){
    lines.push("","=== Country: "+selName+" — across all presidents ===");
    ids.forEach(function(id){
      var P=window.PRESIDENTS[id];
      var dos=P.dossier||{}, outs=P.outcomes||{};
      var k=_keyForIn(selName,dos);
      var d=k?dos[k]:null;
      lines.push("","-- "+(P.label||id)+" --");
      if(!d){lines.push("No individual entry for this country under this administration."); return;}
      lines.push("State: "+(STATE_NAME[d.state]||d.state)+". Delta: "+(d.delta||"—")+".");
      if(d.baseline&&d.baseline!=="—") lines.push("Inherited baseline: "+d.baseline);
      var pts=(d.points||[]).filter(function(p){return p!=="interp";});
      if(pts.length) lines.push("Evidence:\n"+pts.map(function(p){return "• "+p;}).join("\n"));
      var o=outs[k];
      if(o&&o.best&&o.best!=="—")
        lines.push("Outcomes — Best: "+o.best+" | Base: "+o.base+" | Downside: "+o.down);
    });
  } else if(selRegion){
    lines.push("","=== Region: "+selRegion+" — across all presidents ===");
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
        lines.push("Countries:");
        rc.forEach(function(k){
          var d=dos[k];
          lines.push("  "+k+": "+(STATE_NAME[d.state]||d.state)+" (delta: "+(d.delta||"—")+")");
        });
      }
    });
  } else {
    lines.push("","=== Full atlas — all presidents ===");
    ids.forEach(function(id){
      var P=window.PRESIDENTS[id];
      var dos=P.dossier||{};
      var keys=Object.keys(dos).filter(function(k){return dos[k]&&dos[k].state!=="us"&&k!=="Venezuela_note";});
      lines.push("","-- "+(P.label||id)+" ("+keys.length+" entries) --");
      var counts={};
      keys.forEach(function(k){var s=dos[k].state; counts[s]=(counts[s]||0)+1;});
      STATE_ORDER.forEach(function(s){if(counts[s])lines.push("  "+(STATE_NAME[s]||s)+": "+counts[s]);});
      keys.forEach(function(k){
        var d=dos[k];
        lines.push("  "+k+": "+(STATE_NAME[d.state]||d.state)+" delta:"+(d.delta||"—")+" region:"+(d.region||"—"));
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
