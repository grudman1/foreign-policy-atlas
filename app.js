/* =====================================================================
   Foreign Policy Atlas -- application logic (president-agnostic).
   Data is supplied by data/<president>.js via the window.PRESIDENTS registry.
   This file renders whichever president is selected in the dropdown.
   ===================================================================== */

/* ---- tier config + map-name aliases (shared across presidents) ---- */
var TIERS={
  1:{c:"--t1",name:"Emerging gain",desc:"new &amp; real, not yet locked in"},
  2:{c:"--t2",name:"Solid gain",desc:"aligned &amp; institutionalizing"},
  3:{c:"--t3",name:"Established ally",desc:"maintained, not a new Trump win"},
  4:{c:"--t4",name:"In play",desc:"courted or contested"},
  5:{c:"--t5",name:"Strained / uncommitted",desc:"cooling or low-engagement"},
  6:{c:"--t6",name:"Adversarial / rival",desc:""},
  0:{c:"--t0",name:"United States",desc:""}
};
var ORDER=[2,1,3,4,5,6];
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
var hidden={}, selName=null, selRegion=null, tab="country", svgSel=null;
var ALLFEATS=null, REGIONFEATS=null, FEATFORKEY=null, nameToFeat={}, gOut=null, geoPath=null;

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


function buildLegend(){
  var L=document.getElementById("legend");
  L.innerHTML="";
  ORDER.forEach(function(t){
    var info=TIERS[t];
    var b=document.createElement("button");
    b.innerHTML='<span class="sw" style="background:var('+info.c+')"></span>'+info.name+
      '<span class="count" id="cnt'+t+'"></span>';
    b.onclick=function(){hidden[t]=!hidden[t];b.classList.toggle("dim",!!hidden[t]);paint();};
    L.appendChild(b);
  });
  var c={};Object.keys(DOSSIER).forEach(function(k){if(k!=="Venezuela_note"){var t=DOSSIER[k].tier;c[t]=(c[t]||0)+1;}});
  ORDER.forEach(function(t){var e=document.getElementById("cnt"+t);if(e)e.textContent=c[t]||0;});
}

function setTab(t){
  tab=t;
  document.getElementById("tabC").classList.toggle("on",t==="country");
  document.getElementById("tabR").classList.toggle("on",t==="region");
  document.getElementById("searchrow").style.display=(t==="country")?"block":"none";
  if(t==="region"){ if(selRegion) showRegion(selRegion); else showRegionList(); }
  else { selRegion=null; paint(); if(selName) showCountry(selName); else clearPanel(); }
}
function setTabSilent(t){
  tab=t;
  document.getElementById("tabC").classList.toggle("on",t==="country");
  document.getElementById("tabR").classList.toggle("on",t==="region");
  document.getElementById("searchrow").style.display=(t==="country")?"block":"none";
}
function clearPanel(){
  document.getElementById("pbody").innerHTML='<div class="empty">Click a country on the map or search above.</div>';
}

function outcomeBlock(k){
  var o=OUTCOMES[k];
  if(!o||o.best==="\u2014")return"";
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
    selName=null;paint();return;
  }
  selName=name;
  var info=TIERS[d.tier], pts=d.points.slice(), interp=false;
  if(pts[pts.length-1]==="interp"){interp=true;pts.pop();}
  var safeReg=(d.region||"").replace(/'/g,"\\'");
  var html='<div class="ph"><span class="sw" style="background:var('+info.c+')"></span><h2>'+k+'</h2></div>'+
    '<p class="tierline"><b style="color:var('+info.c+')">'+info.name+'</b>'+(info.desc?' &mdash; '+info.desc:'')+'</p>'+
    '<div class="reg" onclick="showRegion(\''+safeReg+'\')">'+(d.region||'')+' &rsaquo; view region</div>'+
    '<ul class="pts" style="--dotc:var('+info.c+')">';
  pts.forEach(function(p){html+='<li>'+p+'</li>';});
  html+='</ul>';
  if(interp)html+='<div class="interp">Interpretive placement \u2014 based on overall posture, not one named agreement; reasonable analysts could tier it differently.</div>';
  html+=outcomeBlock(k);
  pb.innerHTML=html;
  paint();
  drawInset("country",k);
}

function showRegionList(){
  var pb=document.getElementById("pbody");
  var html='<div class="empty" style="padding-top:2px;margin-bottom:6px">Pick a region \u2014 or click a region label on the map \u2014 for its dynamics, flagship projects, US goal, and long-term stakes.</div><div class="reglist">';
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
  selRegion=r; selName=null;
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
  paint();
  drawInset("region",r);
}
function backToRegions(){ selRegion=null; showRegionList(); paint(); }

function paint(){
  if(!svgSel)return;
  svgSel.selectAll(".cty").each(function(d){
    var k=keyFor(d.properties.name);
    var t=k?DOSSIER[k].tier:null;
    var fill=(t===null||t===undefined||hidden[t])?cssv("--nd"):cssv(TIERS[t].c);
    var el=d3.select(this);
    el.attr("fill",fill);
    el.classed("sel",d.properties.name===selName);
    var inReg = selRegion && k && regionOf[k]===selRegion;
    el.classed("dimmed", !!selRegion && !inReg);
  });
  // region outline + label active state
  svgSel.selectAll(".rgoutline").classed("show",function(d){return d===selRegion;});
  svgSel.selectAll(".rglabel").classed("active",function(d){return d===selRegion;});
}

function drawInset(mode, key){
  var host=document.getElementById("inset");
  var titleEl=document.getElementById("insettitle");
  var hintEl=document.getElementById("insethint");
  if(!ALLFEATS){host.innerHTML='<div class="insetempty">Map still loading\u2026</div>';return;}

  // determine the focus features and which to highlight
  var focusFeats=[], hi={};
  if(mode==="country"){
    var f=FEATFORKEY(key); if(f){focusFeats=[f];hi[key]=1;}
    titleEl.textContent="Detail \u2014 "+key;
    hintEl.textContent="zoomed to the selected country";
  } else if(mode==="region"){
    focusFeats=(REGIONFEATS[key]||[]).slice();
    focusFeats.forEach(function(ff){hi[ff.properties.name]=1;});
    titleEl.textContent="Detail \u2014 "+key;
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
  // expand: find all features whose centroid falls in a padded screen window
  var b=d3.geoPath(padProj).bounds(fc);
  var mx=(b[1][0]-b[0][0])*0.55+30, my=(b[1][1]-b[0][1])*0.55+30;
  var win=[[b[0][0]-mx,b[0][1]-my],[b[1][0]+mx,b[1][1]+my]];
  var context=ALLFEATS.filter(function(ft){
    var c=padProj(d3.geoCentroid(ft));
    if(!c||isNaN(c[0]))return false;
    return c[0]>=win[0][0]&&c[0]<=win[1][0]&&c[1]>=win[0][1]&&c[1]<=win[1][1];
  });
  // make sure focus features are included
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
      var t=k?DOSSIER[k].tier:null;
      return (t===null||t===undefined)?cssv("--nd"):cssv(TIERS[t].c);
    })
    .classed("dim2",function(d){return !hi[d.properties.name];})
    .classed("sel2",function(d){return !!hi[d.properties.name];})
    .style("cursor","pointer")
    .on("click",function(e,d){showCountry(d.properties.name);})
    .append("title").text(function(d){return d.properties.name;});

  // labels for highlighted features (only if reasonably large on screen)
  svg2.append("g").selectAll("text").data(focusFeats).join("text")
    .attr("class","lbl2")
    .attr("transform",function(d){var c=path2.centroid(d);return "translate("+c+")";})
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
    var r=regionOf[k]; if(!r||r==="\u2014") return;
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
  selName=null; selRegion=null; hidden={};
  renderHeader();
  buildLegend();
  buildRegionGeometry();
  paint();
  clearInset();
  if(tab==="region") showRegionList(); else clearPanel();
}


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

    var gC=svgSel.append("g");
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

    gOut=svgSel.append("g");   // region outline group (rebuilt per president)

    // region labels with leader lines (layout-based; shared across presidents)
    var gL=svgSel.append("g");
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

    buildRegionGeometry();
    paint();
  }).catch(function(){
    document.getElementById("map").innerHTML='<p style="color:var(--ink3);padding:20px">Map data could not be loaded. Country search and the Region tab still work.</p>';
  });
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
})();
