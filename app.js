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

function setTab(t){
  tab=t;
  document.getElementById("tabC").classList.toggle("on",t==="country");
  document.getElementById("tabR").classList.toggle("on",t==="region");
  document.getElementById("searchrow").style.display=(t==="country")?"block":"none";
  if(t==="region"){ if(selRegion) showRegion(selRegion); else showRegionList(); }
  else { selRegion=null; paint(); paintDeltas(); if(selName) showCountry(selName); else clearPanel(); }
}
function setTabSilent(t){
  tab=t;
  document.getElementById("tabC").classList.toggle("on",t==="country");
  document.getElementById("tabR").classList.toggle("on",t==="region");
  document.getElementById("searchrow").style.display=(t==="country")?"block":"none";
}
function clearPanel(){
  document.getElementById("pbody").innerHTML='<div class="empty">Click a country on the map or search above.</div>';
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
    pb.innerHTML='<div class="empty"><b>'+name+'</b> is not individually classified in this ledger '+
      '(shown neutral on the map). Most unclassified states were not part of a distinct Trump-era initiative through May 2026.</div>';
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
  drawInset("country",k);
}

function showRegionList(){
  var pb=document.getElementById("pbody");
  var html='<div class="empty" style="padding-top:2px;margin-bottom:6px">Pick a region — or click a region label on the map — for its dynamics, flagship projects, US goal, and long-term stakes.</div><div class="reglist">';
  Object.keys(REGIONS).forEach(function(r){
    html+='<button onclick="showRegion(\''+r.replace(/'/g,"\\'")+'\')">'+r+'</button>';
  });
  html+='</div>';
  pb.innerHTML=html;
}

function showRegion(r){
  setTabSilent("region");
  var R=REGIONS[r], pb=document.getElementById("pbody");
  if(!R){showRegionList();return;}
  selRegion=r; selName=null; refreshAnalysisBtns();
  var html='<div class="backrow"><button onclick="backToRegions()">&lsaquo; all regions</button></div>'+
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
  drawInset("region",r);
}
function backToRegions(){ selRegion=null; showRegionList(); paint(); paintDeltas(); refreshAnalysisBtns(); }


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

/* ---- delta chevrons at country centroids (separate g-layer for z-order) ----
   Each chevron is sized to the country it sits inside, so a tiny island
   gets a small mark and Russia gets a big one. Single-arrow chevrons
   (↑ → ↓) can be roughly as wide as the country; double-arrow chevrons
   (↑↑ ↓↓) need ~2x horizontal room so they're scaled down.
*/
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
    var c=geoPath.centroid(f);
    if(!c || isNaN(c[0])) return;
    var bb=geoPath.bounds(f);
    var w=bb[1][0]-bb[0][0], h=bb[1][1]-bb[0][1];
    // size: fit by the more constraining of width and height.
    // text width ≈ 0.6 * fontSize per character; height ≈ fontSize.
    var nchar = d.delta.length; // 1 for ↑→↓, 2 for ↑↑/↓↓
    var sz = Math.min(w / (0.62*nchar), h * 0.85);
    if (sz < 3.5) return;        // too cramped — skip entirely
    if (sz > 18) sz = 18;        // ceiling so Russia etc. don't get a huge label
    gD.append("text")
      .attr("x", c[0]).attr("y", c[1])
      .attr("text-anchor","middle")
      .attr("dominant-baseline","middle")
      .attr("class","delta-lbl")
      .attr("data-delta", d.delta)
      .style("font-size", sz.toFixed(2)+"px")
      .text(d.delta);
  });
}

function drawInset(mode, key){
  var host=document.getElementById("inset");
  var titleEl=document.getElementById("insettitle");
  var hintEl=document.getElementById("insethint");
  if(!ALLFEATS){host.innerHTML='<div class="insetempty">Map still loading…</div>';return;}

  // determine the focus features and which to highlight
  var focusFeats=[], hi={};
  if(mode==="country"){
    var f=FEATFORKEY(key); if(f){focusFeats=[f];hi[key]=1;}
    titleEl.textContent="Detail — "+key;
    hintEl.textContent="zoomed to the selected country";
  } else if(mode==="region"){
    focusFeats=(REGIONFEATS[key]||[]).slice();
    focusFeats.forEach(function(ff){hi[ff.properties.name]=1;});
    titleEl.textContent="Detail — "+key;
    hintEl.textContent="zoomed to the selected region";
  }
  if(!focusFeats.length){
    host.innerHTML='<div class="insetempty">No map geometry available for this selection.</div>';
    return;
  }

  // bounding box of focus, with padding, then include neighbours for context
  var fc={type:"FeatureCollection",features:focusFeats};
  var W=720,H=300;
  var padProj=d3.geoMercator().fitExtent([[24,24],[W-24,H-24]],fc);
  var b=d3.geoPath(padProj).bounds(fc);
  var mx=(b[1][0]-b[0][0])*0.55+30, my=(b[1][1]-b[0][1])*0.55+30;
  var win=[[b[0][0]-mx,b[0][1]-my],[b[1][0]+mx,b[1][1]+my]];
  var context=ALLFEATS.filter(function(ft){
    var c=padProj(d3.geoCentroid(ft));
    if(!c||isNaN(c[0]))return false;
    return c[0]>=win[0][0]&&c[0]<=win[1][0]&&c[1]>=win[0][1]&&c[1]<=win[1][1];
  });
  focusFeats.forEach(function(ff){ if(context.indexOf(ff)<0)context.push(ff); });

  var path2=d3.geoPath(padProj);
  host.innerHTML="";
  var svg2=d3.select(host).append("svg").attr("viewBox","0 0 "+W+" "+H)
    .attr("role","img").attr("aria-label","Zoomed detail map of "+key);
  svg2.append("rect").attr("width",W).attr("height",H).attr("fill","transparent");

  svg2.append("g").selectAll("path").data(context).join("path")
    .attr("class","cty2")
    .attr("d",path2)
    .attr("stroke",cssv("--stroke")).attr("stroke-width",0.6)
    .attr("fill",function(d){
      var k=keyFor(d.properties.name);
      var entry=k?DOSSIER[k]:null;
      var s=entry?entry.state:null;
      return (!s) ? cssv("--nd") : cssv(STATE_COLOR[s]||"--s-neutral");
    })
    .classed("dim2",function(d){return !hi[d.properties.name];})
    .classed("sel2",function(d){return !!hi[d.properties.name];})
    .style("cursor","pointer")
    .on("click",function(e,d){showCountry(d.properties.name);})
    .append("title").text(function(d){return d.properties.name;});

  // delta chevrons inside the inset (larger font than the main map)
  svg2.append("g").selectAll("text").data(focusFeats.filter(function(ff){
    var k=keyFor(ff.properties.name);
    var d=k?DOSSIER[k]:null;
    return d && d.delta && d.delta!=="—" && d.state!=="us";
  })).join("text")
    .attr("class","delta-lbl")
    .style("font-size","13px")
    .attr("text-anchor","middle").attr("dominant-baseline","middle")
    .attr("x",function(d){return path2.centroid(d)[0];})
    .attr("y",function(d){return path2.centroid(d)[1];})
    .attr("data-delta",function(d){
      var k=keyFor(d.properties.name);
      return DOSSIER[k].delta;
    })
    .text(function(d){
      var k=keyFor(d.properties.name);
      return DOSSIER[k].delta;
    });

  // labels for highlighted features (only if reasonably large on screen)
  svg2.append("g").selectAll("text.lbl2").data(focusFeats).join("text")
    .attr("class","lbl2")
    .attr("transform",function(d){var c=path2.centroid(d); return "translate("+(c[0])+","+(c[1]+12)+")";})
    .attr("text-anchor","middle").attr("dy","0.32em")
    .each(function(d){
      var bb=path2.bounds(d);
      var w=bb[1][0]-bb[0][0], h=bb[1][1]-bb[0][1];
      if(w>34&&h>20) d3.select(this).text(d.properties.name);
    });
}
function clearInset(){
  var host=document.getElementById("inset");
  document.getElementById("insettitle").textContent="Detail view";
  document.getElementById("insethint").textContent="select a country or region to zoom in";
  host.innerHTML='<div class="insetempty">Click any country or region to see a zoomed-in detail map here.</div>';
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
  clearInset();
  if(tab==="region") showRegionList(); else clearPanel();
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
    svgSel=d3.select(host).append("svg").attr("viewBox","0 0 960 480")
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
    document.getElementById("map").innerHTML='<p style="color:var(--ink3);padding:20px">Map data could not be loaded. Country search and the Region tab still work.</p>';
  });
}

/* Reset the map zoom/pan back to the default world view. Exposed for the
   Reset button in index.html. */
function resetMapZoom(){
  if(!svgSel || !_mapZoom) return;
  svgSel.transition().duration(280).call(_mapZoom.transform, d3.zoomIdentity);
}

/* ---- country search (uses the global allKeys for the current president) ---- */
document.getElementById("search").addEventListener("keydown",function(e){
  if(e.key!=="Enter")return;
  var q=this.value.trim().toLowerCase();if(!q)return;
  var hit=allKeys.find(function(k){return k.toLowerCase()===q;})||
          allKeys.find(function(k){return k.toLowerCase().indexOf(q)===0;})||
          allKeys.find(function(k){return k.toLowerCase().indexOf(q)>-1;});
  if(hit)showCountry(hit);
  else document.getElementById("pbody").innerHTML='<div class="empty">No country matching that search.</div>';
});


/* ---- init ---- */
(function(){
  var first=presidentList()[0];
  if(first) loadPresident(first);
  populateSelector();
  renderHeader();
  buildLegend();
  clearInset();
  startMap();
  document.getElementById("acustomq").addEventListener("keydown",function(e){
    if(e.key==="Enter") runCustomQ();
  });
})();

/* ---- AI Analysis panel ---- */
var _aAbort=null;
var _aPreset=-1;

function toggleAnalysis(){
  var sec=document.getElementById("analysisSection");
  var hdr=document.getElementById("analysisHeader");
  if(!sec) return;
  var open=sec.classList.toggle("aopen");
  hdr.setAttribute("aria-expanded",open?"true":"false");
}

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

function buildContext(){
  var P=window.PRESIDENTS[CURRENT]||{};
  var label=P.label||CURRENT;
  var lines=[
    "You are an analytical assistant helping a researcher use the Foreign Policy Atlas, an interactive ledger of U.S. foreign-policy alignment.",
    "President: "+label+". As of: "+(P.asOf||"unknown")+".",
    "Relationship states used: Core Ally, Aligned, Neutral, Strained, Adversarial.",
    "Deltas (↑1 ↑ → ↓ ↓2) show change from the prior administration's baseline."
  ];
  if(selName){
    var k=keyFor(selName)||selName;
    var d=DOSSIER[k];
    if(d){
      lines.push("--- Country dossier: "+k+" ---");
      lines.push("State: "+(STATE_NAME[d.state]||d.state)+". Delta: "+(d.delta||"—")+".");
      if(d.baseline && d.baseline!=="—") lines.push("Inherited baseline: "+d.baseline);
      var pts=(d.points||[]).filter(function(p){return p!=="interp";});
      if(pts.length) lines.push("Evidence:\n"+pts.map(function(p){return "• "+p;}).join("\n"));
      var o=OUTCOMES[k];
      if(o&&o.best&&o.best!=="—")
        lines.push("Outcome projections — Best: "+o.best+" | Base: "+o.base+" | Downside: "+o.down);
    }
  } else if(selRegion){
    var R=REGIONS[selRegion];
    if(R){
      lines.push("--- Region: "+selRegion+" ---");
      lines.push("Tilt: "+R.tilt);
      lines.push("Dynamics: "+R.dynamics);
      lines.push("Flagship projects: "+R.projects.join("; "));
      lines.push("US strategic goal: "+R.goal);
      lines.push("Stakes: "+R.stakes);
    }
    var rc=allKeys.filter(function(k){return regionOf[k]===selRegion;});
    if(rc.length){
      lines.push("Countries in this region:");
      rc.forEach(function(k){
        var d=DOSSIER[k];
        if(d) lines.push("  "+k+": "+(STATE_NAME[d.state]||d.state)+" (delta: "+(d.delta||"—")+")");
      });
    }
  } else {
    lines.push("Full atlas ("+allKeys.length+" entries):");
    allKeys.forEach(function(k){
      var d=DOSSIER[k]; if(!d||d.state==="us") return;
      lines.push("  "+k+": "+(STATE_NAME[d.state]||d.state)+" delta:"+(d.delta||"—")+" region:"+(d.region||"—"));
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
