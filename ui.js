/* Arayüz: portreler, 2075 sahnesi, testiler, şişeler ve mektup, ses, kayıt ve oyun akışı. data.js ve engine.js'ten sonra yüklenir. */

/* ---------- Portre çizimi ---------- */
function portrait(p,old){
 if(p.t==="gull") return `<svg viewBox="0 0 200 232"><circle cx="100" cy="112" r="74" fill="#fff" opacity=".18"/>
  <ellipse cx="96" cy="170" rx="56" ry="44" fill="#fff"/><path d="M48 168 Q90 138 150 172 Q100 196 48 168Z" fill="#9AA5AD"/>
  <path d="M60 190 L40 214 L74 200Z" fill="#3B4A54"/><circle cx="112" cy="106" r="34" fill="#fff"/>
  <path d="M140 104 L172 112 L140 120Z" fill="#F2B544"/><circle cx="160" cy="116" r="3" fill="#E5654E"/>
  <circle cx="176" cy="122" r="11" fill="none" stroke="#B5651D" stroke-width="7"/><circle cx="176" cy="122" r="11" fill="none" stroke="#F4EFE3" stroke-width="2" stroke-dasharray="2 4"/>
  <circle cx="122" cy="98" r="5" fill="#1d1d1d"/><path d="M114 88 L132 92" stroke="#1d1d1d" stroke-width="3" stroke-linecap="round"/>
  <rect x="80" y="210" width="5" height="22" fill="#F2B544"/><rect x="104" y="210" width="5" height="22" fill="#F2B544"/></svg>`;
 if(p.t==="cat") return `<svg viewBox="0 0 200 232"><circle cx="100" cy="112" r="74" fill="#fff" opacity=".18"/>
  <ellipse cx="100" cy="206" rx="62" ry="40" fill="#D9803A"/><path d="M52 104 L58 52 L92 86Z" fill="#E08E45"/><path d="M148 104 L142 52 L108 86Z" fill="#E08E45"/>
  <path d="M60 96 L63 66 L82 86Z" fill="#F4B7A0"/><path d="M140 96 L137 66 L118 86Z" fill="#F4B7A0"/>
  <ellipse cx="100" cy="128" rx="58" ry="50" fill="#E08E45"/><path d="M88 82 L92 104 M100 80 L100 104 M112 82 L108 104" stroke="#A85A22" stroke-width="5" stroke-linecap="round"/>
  <path d="M74 124 Q84 116 94 124" stroke="#1d1d1d" stroke-width="4" fill="none" stroke-linecap="round"/><path d="M106 124 Q116 116 126 124" stroke="#1d1d1d" stroke-width="4" fill="none" stroke-linecap="round"/>
  <path d="M94 138 L106 138 L100 146Z" fill="#E5786B"/><path d="M100 146 Q94 154 88 150 M100 146 Q106 154 112 150" stroke="#1d1d1d" stroke-width="2.5" fill="none" stroke-linecap="round"/>
  <path d="M40 136 L80 142 M40 150 L80 148 M160 136 L120 142 M160 150 L120 148" stroke="#fff" stroke-width="2" stroke-linecap="round"/>
  <text x="142" y="70" font-family="Caveat,cursive" font-size="26" fill="#0D2830" opacity=".55">z</text><text x="156" y="52" font-family="Caveat,cursive" font-size="20" fill="#0D2830" opacity=".4">z</text></svg>`;
 const s=p.skin, h=old?"#C9C9C9":p.hair, cap=p.cap||h;
 let back="",front="";
 switch(p.hs){
  case "long": back=`<path d="M60 112 Q56 62 100 60 Q144 62 140 112 L146 178 Q100 190 54 178Z" fill="${h}"/>`;
   front=`<path d="M63 106 Q64 66 100 64 Q137 66 137 106 Q126 80 96 80 Q76 82 63 106Z" fill="${h}"/>`;break;
  case "short": front=`<path d="M63 108 Q60 64 100 62 Q141 64 137 108 Q132 84 100 82 Q70 84 63 108Z" fill="${h}"/>`;break;
  case "curly": front=[[66,100],[70,82],[84,68],[100,63],[116,68],[130,82],[134,100]].map(([x,y])=>`<circle cx="${x}" cy="${y}" r="14" fill="${h}"/>`).join("");break;
  case "bun": front=`<circle cx="100" cy="56" r="15" fill="${h}"/><path d="M63 108 Q60 64 100 62 Q141 64 137 108 Q132 84 100 82 Q70 84 63 108Z" fill="${h}"/>`;break;
  case "bald": front=`<path d="M64 100 Q61 118 68 126 L71 102Z" fill="${h}"/><path d="M136 100 Q139 118 132 126 L129 102Z" fill="${h}"/>`;break;
  case "cap": front=`<path d="M64 104 Q62 116 68 122 L70 104Z" fill="${h}"/><path d="M62 100 Q62 62 100 62 Q138 62 138 100 Q120 92 100 92 Q80 92 62 100Z" fill="${cap}"/><ellipse cx="128" cy="99" rx="38" ry="6" fill="${cap}"/>`;break;
  case "helmet": front=`<path d="M60 104 Q60 60 100 60 Q140 60 140 104Z" fill="${cap}"/><rect x="94" y="60" width="12" height="44" rx="5" fill="#fff" opacity=".35"/><rect x="50" y="98" width="100" height="10" rx="5" fill="${cap}"/>`;break;
  case "scarf": back=`<path d="M56 116 Q54 56 100 56 Q146 56 144 116 Q150 162 132 172 L68 172 Q50 162 56 116Z" fill="${h}"/>`;
   front=`<path d="M64 102 Q66 68 100 68 Q134 68 136 102 Q128 82 100 82 Q72 82 64 102Z" fill="${h}"/>`;break;
 }
 const neck=`<rect x="88" y="138" width="24" height="26" fill="${s}"/><rect x="88" y="138" width="24" height="10" fill="#000" opacity=".12"/>`;
 const body=`<path d="M28 232 Q32 162 100 156 Q168 162 172 232Z" fill="${p.shirt}"/>`;
 const head=`<ellipse cx="100" cy="110" rx="36" ry="40" fill="${s}"/><circle cx="80" cy="124" r="6" fill="#E5654E" opacity=".22"/><circle cx="120" cy="124" r="6" fill="#E5654E" opacity=".22"/>`;
 const eyes=`<circle cx="87" cy="112" r="3.6" fill="#1d1d1d"/><circle cx="113" cy="112" r="3.6" fill="#1d1d1d"/>`+(old?`<path d="M80 104 L94 105 M106 105 L120 104" stroke="${h}" stroke-width="3" stroke-linecap="round"/>`:"");
 const beard=p.beard?`<path d="M65 112 Q66 152 100 154 Q134 152 135 112 Q128 140 100 141 Q72 140 65 112Z" fill="${h}"/>`:"";
 const mouth=`<path d="M91 131 Q100 137 109 131" stroke="#6B3A2A" stroke-width="3" fill="none" stroke-linecap="round"/>`;
 const mus=p.mus?`<path d="M86 127 Q100 118 114 127 Q100 131 86 127Z" fill="${h}"/>`:"";
 const gl=p.gl?`<circle cx="87" cy="112" r="10" fill="#fff" fill-opacity=".15" stroke="#1d1d1d" stroke-width="3"/><circle cx="113" cy="112" r="10" fill="#fff" fill-opacity=".15" stroke="#1d1d1d" stroke-width="3"/><path d="M97 112 L103 112" stroke="#1d1d1d" stroke-width="3"/>`:"";
 const sun=p.sun?`<rect x="74" y="104" width="24" height="14" rx="5" fill="#1d1d1d"/><rect x="102" y="104" width="24" height="14" rx="5" fill="#1d1d1d"/><path d="M98 110 L102 110" stroke="#1d1d1d" stroke-width="3"/>`:"";
 const tie=p.tie?`<path d="M100 158 L92 164 L100 170 L108 164Z" fill="#fff"/><path d="M96 168 L104 168 L107 200 L100 210 L93 200Z" fill="#C8452F"/>`:"";
 return `<svg viewBox="0 0 200 232"><circle cx="100" cy="112" r="74" fill="#fff" opacity=".18"/>${back}${body}${tie}${neck}${head}${eyes}${beard}${mouth}${mus}${gl}${sun}${front}</svg>`;
}

/* ---------- 2075 sahnesi ---------- */
const W={};
function buildWorld(){
 const trees=[],blds=[],people=[];
 for(let i=0;i<16;i++){const x=12+i*22+((i*37)%9)-4, y=104+((i*13)%5)-2;
  trees.push(`<g class="w-t tree"><rect x="${x-1}" y="${y}" width="2" height="5" fill="#3A2A20"/><path d="M${x} ${y-14} L${x+6} ${y+1} L${x-6} ${y+1}Z" fill="${i%3?'#2F7D4F':'#3E9460'}"/></g>`);}
 const B=[[122,14,30],[138,18,44],[158,12,26],[172,20,52],[194,14,36],[210,16,30],[228,12,22],[242,18,40]];
 B.forEach(([x,w,h])=>{let win="";for(let yy=112-h+5;yy<108;yy+=7)for(let xx=x+3;xx<x+w-3;xx+=5)win+=`<rect x="${xx}" y="${yy}" width="2.4" height="3" fill="#FFD98A"/>`;
  blds.push(`<g class="w-t bld"><rect x="${x}" y="${112-h}" width="${w}" height="${h}" fill="#1E3F4C"/><g class="w-t win">${win}</g></g>`);});
 const pc=["#E5654E","#F2B544","#EAF2EF","#3CC8B4","#9B7FD1","#F4A261","#EAF2EF","#E07A5F"];
 for(let i=0;i<8;i++){const x=24+i*42;people.push(`<g class="w-t ppl"><circle cx="${x}" cy="107" r="1.8" fill="#2B1B12"/><rect x="${x-1.6}" y="109" width="3.2" height="5" rx="1.4" fill="${pc[i]}"/></g>`);}
 const turb=[[40,72],[76,66],[110,54]].map(([x,y])=>`<g><rect x="${x-.7}" y="${y-18}" width="1.4" height="18" fill="#EAF2EF"/><g class="blade" style="transform-origin:${x}px ${y-18}px;transform-box:view-box"><path d="M${x} ${y-18} L${x+.8} ${y-29} L${x-.8} ${y-29}Z M${x} ${y-18} L${x+10} ${y-13} L${x+9} ${y-11}Z M${x} ${y-18} L${x-10} ${y-13} L${x-9} ${y-11}Z" fill="#EAF2EF"/></g></g>`).join("");
 const panels=[0,1,2,3].map(i=>`<path d="M${284+i*14} 106 l10 0 l-3 -5 l-10 0Z" fill="#2E5AAC" stroke="#9CC3F0" stroke-width=".5"/>`).join("");
 document.getElementById("world").innerHTML=`
 <defs><linearGradient id="sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#2E7391"/><stop offset=".6" stop-color="#9ED5D4"/><stop offset="1" stop-color="#F6D9A8"/></linearGradient>
 <linearGradient id="smog" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#5E4630"/><stop offset="1" stop-color="#D08A48"/></linearGradient>
 <linearGradient id="seaG" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#2AA6A6"/><stop offset="1" stop-color="#145E73"/></linearGradient></defs>
 <rect width="360" height="150" fill="url(#sky)"/>
 <rect id="wHeat" class="w-t" width="360" height="150" fill="#E8742C" opacity="0"/>
 <rect id="wHaze" class="w-t" width="360" height="112" fill="#F3F0E8" opacity="0"/>
 <rect id="wSmog" class="w-t" width="360" height="150" fill="url(#smog)" opacity="0"/>
 <circle id="wSun" class="w-t" cx="300" cy="44" r="15" fill="#FFD27A"/>
 <g id="wBirds" class="w-t"><path d="M60 30 q4 -4 8 0 q4 -4 8 0" stroke="#173F4A" stroke-width="1.4" fill="none"/><path d="M84 22 q3 -3 6 0 q3 -3 6 0" stroke="#173F4A" stroke-width="1.2" fill="none"/></g>
 <path d="M0 96 L40 72 L76 84 L110 54 L150 80 L190 62 L232 86 L270 60 L312 82 L360 68 L360 112 L0 112Z" fill="#3D6B6A"/>
 <g id="wTurb" class="w-t">${turb}</g>
 <path d="M0 104 Q60 92 120 100 T240 98 T360 100 V114 H0Z" fill="#2F5D57"/>
 <g id="wTrees">${trees.join("")}</g>
 <g id="wPanels" class="w-t">${panels}</g>
 <g id="wChimney" class="w-t"><rect x="262" y="78" width="7" height="34" fill="#5B5B5B"/><g><circle class="smoke" cx="265" cy="76" r="5" fill="#6E6E6E"/><circle class="smoke" cx="265" cy="76" r="5" fill="#6E6E6E"/><circle class="smoke" cx="265" cy="76" r="5" fill="#6E6E6E"/></g></g>
 <g id="wBld">${blds.join("")}</g>
 <rect x="0" y="112" width="360" height="5" fill="#D9C08E"/>
 <g id="wPpl">${people.join("")}</g>
 <g id="wSea" class="w-t"><rect x="0" y="117" width="360" height="60" fill="url(#seaG)"/>
  <path class="wave" d="M0 118 q6 -2 12 0 t12 0 t12 0 t12 0 t12 0 t12 0 t12 0 t12 0 t12 0 t12 0 t12 0 t12 0 t12 0 t12 0 t12 0 t12 0 t12 0 t12 0 t12 0 t12 0 t12 0 t12 0 t12 0 t12 0 t12 0 t12 0 t12 0 t12 0 t12 0 t12 0 t12 0 t12 0" stroke="#BFEDE6" stroke-width="1.2" fill="none" opacity=".8"/>
  <g id="wBuoy" class="w-t"><circle cx="300" cy="124" r="2.2" fill="#F2B544"/><circle cx="322" cy="128" r="2.2" fill="#F2B544"/><circle cx="342" cy="123" r="2.2" fill="#F2B544"/></g>
  <g id="wBottles"></g></g>
 <rect id="wDim" class="w-t" width="360" height="150" fill="#06141A" opacity="0"/>`;
 W.trees=[...document.querySelectorAll("#wTrees .tree")];
 W.blds=[...document.querySelectorAll("#wBld .bld")];
 W.wins=[...document.querySelectorAll("#wBld .win")];
 W.ppl=[...document.querySelectorAll("#wPpl .ppl")];
 W.turbs=[...document.querySelectorAll("#wTurb > g")];W.panels=[...document.querySelectorAll("#wPanels path")];
 ["wSmog","wHeat","wHaze","wSun","wBirds","wTurb","wPanels","wChimney","wSea","wBuoy","wBottles","wDim"].forEach(id=>W[id]=document.getElementById(id));
}
function updateWorld(){
 const {d,h,e,n}=S.m, F=f=>S.flags.includes(f), w=Engine.world(S), s=S.s, share=Math.min(1,s.tk/s.tal);
 // Sahne arka plandaki dünyayı gösterir: ormanlar, fosil dumanı, 2075 ısınması ve deniz seviyesi tahmini
 const t=Math.round(s.or/100*W.trees.length*1.2);
 W.trees.forEach((g,i)=>g.style.opacity=i<t?1:0);
 W.wSmog.style.opacity=(Math.max(0,(s.fk-40)/80)*.7+Math.max(0,(45-d)/45)*.3).toFixed(2);
 W.wHeat.style.opacity=Math.max(0,Math.min(.45,(w.t-1.6)/1.2*.45)).toFixed(2);
 W.wHaze.style.opacity=F("aerosol")?.35:0;
 W.wSun.style.opacity=d<25?0.5:1;
 W.wBirds.style.opacity=s.or>55?1:0;
 W.wSea.style.transform=`translateY(${-((w.sl-30)/20*14).toFixed(1)}px)`;
 W.blds.forEach((g,i)=>g.style.transform=`scaleY(${(0.5+e/100*(0.9+i%3*0.25)).toFixed(2)})`);
 W.wins.forEach(g=>g.style.opacity=Math.min(1,n/70));
 W.wDim.style.opacity=n<35?((35-n)/35*0.55).toFixed(2):0;
 const p=Math.round(h/100*W.ppl.length);
 W.ppl.forEach((g,i)=>g.style.opacity=i<p?1:0);
 W.turbs.forEach((g,i)=>g.style.opacity=share>=.3+i*.15?1:0);
 W.panels.forEach((g,i)=>g.style.opacity=share>=.2+i*.1?1:0);
 W.wChimney.style.opacity=s.fk>55?1:0;
 W.wBuoy.style.opacity=F("dalga")?1:0;
 // Denizdeki şişeler: ne olduklarını söylemez, yalnızca ne zaman kıyıya döneceklerini
 W.wBottles.innerHTML=(S.queue||[]).filter(q=>q.at<2076).sort((a,b)=>a.at-b.at).slice(0,9).map((q,i)=>{
  const x=(18+Math.min(1,Math.max(0,(q.at-S.year)/24))*320).toFixed(0),y=126+(i%2)*9;
  return `<g transform="translate(${x} ${y})"><g class="sbob" style="animation-delay:${i*.4}s"><title>${q.at} yılında kıyıya dönecek</title>`+
   `<rect x="-1.6" y="-9" width="3.2" height="2.6" rx=".8" fill="#B5835A"/><path d="M-1.4 -6.4h2.8v1.4q2.4 1.2 2.4 3.4v5.2q0 1.6-1.6 1.6h-4.4q-1.6 0-1.6-1.6v-5.2q0-2.2 2.4-3.4z" fill="#BFEDE6" fill-opacity=".55" stroke="#EAF2EF" stroke-width=".5"/>`+
   `<rect x="-1.5" y="-2.6" width="3" height="4.4" rx=".6" fill="#F6EEDC"/><text y="-11" text-anchor="middle" font-family="JetBrains Mono,monospace" font-size="5.5" fill="#EAF2EF" opacity=".85">${q.at}</text></g></g>`}).join("");
 document.getElementById("wstat").textContent=`+${(Math.round(w.t0*10)/10).toString().replace(".",",")}°C${F("aerosol")?"*":""} · deniz +${w.sl} cm`;
}

/* ---------- Göstergeler ---------- */
const ICON={
 d:`<path d="M12 1.5 L19.5 12.5 H15.5 L20.5 19.5 H13.5 V23 H10.5 V19.5 H3.5 L8.5 12.5 H4.5 Z"/>`,
 h:`<circle cx="8" cy="6.5" r="3.6"/><circle cx="16.5" cy="7.5" r="3"/><path d="M1.5 22 Q1.5 12 8 12 Q14.5 12 14.5 22Z"/><path d="M15.5 22 Q15.5 13.5 17 13.2 Q22.5 13 22.5 22Z"/>`,
 e:`<ellipse cx="12" cy="5.5" rx="8" ry="3"/><path d="M4 5.5 V9.5 Q4 12.5 12 12.5 Q20 12.5 20 9.5 V5.5 Q20 8.5 12 8.5 Q4 8.5 4 5.5Z"/><path d="M4 12 V16 Q4 19 12 19 Q20 19 20 16 V12 Q20 15 12 15 Q4 15 4 12Z"/><path d="M4 18.5 V20 Q4 23 12 23 Q20 23 20 20 V18.5 Q20 21.5 12 21.5 Q4 21.5 4 18.5Z"/>`,
 n:`<path d="M14 1 L4 14 H11 L9.5 23 L20 9.5 H13 Z"/>`
};
// Dört denge dört testi: kurursa (0) ya da taşarsa (100) oyun biter
const AMPH=`<path d="M8 1H16V2.6H14.6V5.2C14.6 6.4 16 7.2 17.6 8.2C20.8 10.2 22 13 22 16.4C22 22.2 17.8 26.6 12 28.6C6.2 26.6 2 22.2 2 16.4C2 13 3.2 10.2 6.4 8.2C8 7.2 9.4 6.4 9.4 5.2V2.6H8Z"/>`;
function buildMeters(){
 document.getElementById("meters").innerHTML=MK.map(k=>`<div class="meter" id="m_${k}">
  <svg viewBox="0 0 24 30"><defs><clipPath id="c_${k}"><rect class="lvl" id="r_${k}" x="-4" y="15" width="32" height="34" style="transition:y .6s cubic-bezier(.3,.7,.3,1)"/></clipPath></defs>
  <path class="handle" d="M9.4 4C6.2 4 4.6 5.6 5 9.4M14.6 4C17.8 4 19.4 5.6 19 9.4"/>
  <g class="base">${AMPH}</g><g class="fill" clip-path="url(#c_${k})">${AMPH}</g>
  <g class="ic" transform="translate(7.2 12) scale(.4)">${ICON[k]}</g></svg>
  <span class="lbl">${MN[k]}<i class="pr" id="pr_${k}"></i></span><span class="dot" id="dot_${k}"></span></div>`).join("");
}
function renderMeters(prev){
 MK.forEach(k=>{
  const v=S.m[k];document.getElementById("r_"+k).setAttribute("y",(28.6-27.6*v/100).toFixed(2));
  const el=document.getElementById("m_"+k);
  el.classList.toggle("danger",v<=15||v>=85);
  // Arka plandaki sistemlerin yıllık itişi
  const d=S.last?S.last[k]:0,pr=document.getElementById("pr_"+k);
  pr.textContent=d>=1.5?"▲▲":d>=.5?"▲":d<=-1.5?"▼▼":d<=-.5?"▼":"";pr.className="pr"+(d<0?" neg":"");
  pr.title=pr.textContent?`Arka plan etkisi: ${d>0?"+":""}${d.toFixed(1)} / yıl`:"";
  if(prev&&prev[k]!==v){const c=v>prev[k]?"up":"down";el.classList.remove("up","down");void el.offsetWidth;el.classList.add(c);setTimeout(()=>el.classList.remove(c),700);}
 });
}
// Önizleme: hangi testinin ne kadar çalkalanacağı (yönü söylenmez)
function showDots(o){MK.forEach(k=>{const v=o?Math.abs(o[k]||0):0,m=document.getElementById("m_"+k);
 document.getElementById("dot_"+k).className="dot"+(v>=12?" lg":v>0?" sm":"");
 m.classList.toggle("pv-sm",v>0&&v<12);m.classList.toggle("pv-lg",v>=12);});}

/* ---------- Ses ---------- */
let AC=null,muted=false;
function tone(f,dur,type="sine",vol=.05){if(muted)return;try{AC=AC||new (window.AudioContext||window.webkitAudioContext)();const o=AC.createOscillator(),g=AC.createGain();o.type=type;o.frequency.value=f;g.gain.value=vol;g.gain.exponentialRampToValueAtTime(.0001,AC.currentTime+dur);o.connect(g).connect(AC.destination);o.start();o.stop(AC.currentTime+dur);}catch(e){}}
const sfx={thud:()=>tone(140,.22,"square",.05),swipe:()=>tone(320,.12,"triangle",.04),pick:()=>tone(520,.16,"sine",.04),letter:()=>{tone(660,.5);setTimeout(()=>tone(880,.6),120)},end:()=>{tone(392,.7);setTimeout(()=>tone(523,.8),180);setTimeout(()=>tone(659,1),360)}};

/* ---------- Kayıt ---------- */
function loadEnds(){try{return JSON.parse(localStorage.getItem("gm_endings")||"[]")}catch(e){return[]}}
function saveEnd(id){try{const a=loadEnds();if(!a.includes(id)){a.push(id);localStorage.setItem("gm_endings",JSON.stringify(a))}}catch(e){}}

/* ---------- Oyun ---------- */
let S=null,busy=false,cur=null;   // cur: açık mektubun geldiği şişe (sonuç mu, geri mi döndü)
const $=id=>document.getElementById(id);

function newGame(mode){
 S=Engine.newState(mode);cur=null;document.body.classList.remove("epi");
 renderMeters();updateWorld();renderYear();$("sunk").hidden=true;$("tideView").hidden=true;$("letterView").hidden=true;
 showLetter(Engine.introLetter(S),nextTurn,"Deniz’den · 2026");
}
function renderYear(){
 $("year").textContent=Math.min(S.year,2075);
 const l=2075-S.year;$("left").textContent=S.epi?"Artık Deniz’sin":l>0?`2075’e ${l} yıl`+(S.step===2?" · hızlı":""):"2075";
}
function setHint(t){$("hint").textContent=t==="tide"?"Bir şişe seç · 1 2 ya da ← → · D: dünyanın raporu":"Cevabını seç · 1 2 ya da ← → · Çalkalanan testiler değişecek dengeleri gösterir";}
// Yeni tur: gelgit şişeleri getirir; tek şişe (zorunlu kart, olay) beklemeden açılır
function nextTurn(){
 if(S.epi){Engine.epiDraw(S);cur=null;showLetterCard(true);busy=false;return;}
 showSunk(Engine.tide(S));updateWorld();
 if(S.offer.length===1){cur=S.offer[0];Engine.open(S,cur.id);showLetterCard(true);}
 else showTide();
 busy=false;
}
function showSunk(list){
 const el=$("sunk");el.hidden=!list.length;
 if(list.length)el.textContent=`🫧 ${list.map(x=>CH[byId[x.id].c].n).join(", ")}: şişe açılmadan battı. Senin yerine zaman karar verdi.`;
}
// İlk cümle, en fazla ~90 harf
function tease(t){const f=t.split(/(?<=[.?!])\s/)[0];return"“"+(f.length>90?f.slice(0,87).replace(/\s\S*$/,"")+"…":f)+"”"}
const BOTTLE=`<svg viewBox="0 0 24 48"><rect x="9" y="1" width="6" height="5" rx="1.5" fill="#B5835A"/><path d="M9.5 6h5v6q0 2 3 4q2.5 2 2.5 6v20q0 4-4 4h-8q-4 0-4-4v-20q0-4 2.5-6q3-2 3-4z" fill="#BFEDE6" fill-opacity=".22" stroke="#BFEDE6" stroke-width="1.2"/><g transform="rotate(-8 12 30)"><rect x="8" y="22" width="8" height="16" rx="2" fill="#F6EEDC"/><path d="M9.5 25.5h5M9.5 28.5h5M9.5 31.5h4" stroke="#22474D" stroke-width=".8"/></g></svg>`;
function showTide(){
 $("letterView").hidden=true;$("tideView").hidden=false;
 $("tlead").innerHTML=`Kıyıya iki şişe vurdu.<small>Yalnız birini açabilirsin. Diğeri denize döner.</small>`;
 $("bottles").innerHTML=S.offer.map((o,i)=>{
  const c=byId[o.id],ch=CH[c.c],tags=[];
  if(c.max)tags.push(`<i class="urg">⏳ son yıl ${c.max}</i>`);
  if(o.from)tags.push(`<i>↩ kararının sonucu · ${o.from}</i>`);else if(o.back)tags.push(`<i>🌊 geri döndü</i>`);
  return `<button class="bottle" style="--cbg:${ch.bg};--d:${i*110}ms"><span class="glass" aria-hidden="true">${BOTTLE}</span>`+
   `<span class="bm"><span class="bw"><span class="bface">${portrait(ch.p,c.old)}</span><b>${ch.n}</b><small>${ch.r}</small></span>`+
   `<span class="bt">${tease(Engine.fill(S,c.t))}</span>${tags.length?`<span class="btags">${tags.join("")}</span>`:""}</span><span class="k">${i+1}</span></button>`;}).join("");
 [...$("bottles").children].forEach((b,i)=>b.addEventListener("click",()=>pickBottle(i)));
 setHint("tide");
}
function pickBottle(i){
 if(busy||!S.offer||!S.offer[i])return;busy=true;sfx.pick();
 [...$("bottles").children].forEach((b,j)=>b.classList.add(j===i?"pick":"go"));
 setTimeout(()=>{cur=S.offer[i];Engine.open(S,cur.id);updateWorld();showLetterCard(true);busy=false;},430);
}
function showLetterCard(anim){
 $("tideView").hidden=true;$("letterView").hidden=false;
 const c=byId[S.card],ch=CH[c.c],L=Engine.locks(S,c),lp=$("lp");
 lp.className="lp";lp.style.setProperty("--cbg",ch.bg);
 $("lstamp").innerHTML=portrait(ch.p,c.old);
 $("who").innerHTML=`${ch.n} <small>${ch.r}</small>`;
 const tag=S.epi?"2075 · Deniz’e yazılan mektup":c.ev?"Olay · bu şişe beklemez":c.at?"Bu şişe beklemez":cur&&cur.from?`Kararının sonucu · ${cur.from}`:cur&&cur.back?"Geri dönen şişe":"";
 $("ltag").textContent=tag;$("ltag").hidden=!tag;
 $("qt").textContent=Engine.fill(S,c.t);
 ["l","r"].forEach(s=>{const o=c[s],k=L[s],b=$(s==="l"?"btnL":"btnR");
  // Kapanan kapı muğlak görünür: yazısı silik ve okunmaz; ne olduğu bitiş ekranında açılır
  $(s==="l"?"btnLt":"btnRt").innerHTML=k?`🔒 <span class="smear" aria-hidden="true">${smear(o.x)}</span>`:o.x;
  b.classList.toggle("locked",!!k);b.setAttribute("aria-disabled",k?"true":"false");
  k?b.setAttribute("aria-label","Kapalı kapı"):b.removeAttribute("aria-label");});
 // Damga yalnızca yılı söyler; sebebi mektuplarda ve bitiş ekranında
 const k=L.l||L.r,ll=$("lockline");ll.hidden=!k;
 if(k)ll.innerHTML=`<b>KAPANDI · ${k.y}</b>`;
 showSide(null);setHint("letter");
 if(anim){void lp.offsetWidth;lp.classList.add("in");}
}
// Kapanan seçeneğin yazısı: aynı uzunlukta, harfleri karışık; hep aynı görünsün diye metinden türetilir
function smear(t){
 let h=0;for(const ch of t)h=(h*31+ch.charCodeAt(0))>>>0;
 const a="aeıioöuüklmnrstyzçğş";
 return [...t].map(ch=>ch===" "?" ":a[(h=(h*1103515245+12345)>>>0)%a.length]).join("");
}
function showSide(side){
 const o=side&&!S.epi&&S.card?byId[S.card][side]:null;
 showDots(o&&!Engine.lockOf(S,o)?o:null);
}
function refuse(){
 sfx.thud();const lp=$("lp"),ll=$("lockline");
 lp.classList.remove("shake","in");void lp.offsetWidth;lp.classList.add("shake");
 ll.classList.remove("stamp");void ll.offsetWidth;ll.classList.add("stamp");
}
// Cevap yazılır, mektup şişeye girer ve denize atılır
function commit(side){
 if(busy||!S||!S.card||$("letterView").hidden)return;
 if(Engine.lockOf(S,byId[S.card][side])){refuse();return;}
 busy=true;sfx.swipe();showSide(null);
 const lp=$("lp");lp.classList.remove("in","shake");void lp.offsetWidth;lp.classList.add("out");
 setTimeout(()=>choose(side),380);
}
function choose(side){
 if(S.epi){Engine.epiApply(S,side)?setTimeout(()=>endGame(Engine.finalType(S)),300):nextTurn();return;}
 const prev={...S.m},dead=Engine.apply(S,side);cur=null;
 renderMeters(prev);updateWorld();renderYear();$("sunk").hidden=true;
 if(dead){setTimeout(()=>endGame(dead),650);return;}
 if(S.year>=2075){setTimeout(startEpilogue,650);return;}
 if(LETTER_YEARS.includes(S.year)){setTimeout(()=>showLetter(Engine.midLetter(S),nextTurn,`Deniz’den · ${S.year}`),450);return;}
 nextTurn();
}
// 2075: görev biter, oyuncu Deniz olur; insanlar ondan bir şey ister (koltuk miras kalmaz)
function startEpilogue(){
 Engine.startEpi(S);document.body.classList.add("epi");renderYear();
 showLetter(Engine.epiLetter(S),nextTurn,"Deniz’den · 2075");
}

/* Mektup gösterimi: daktilo efekti, dokununca tamamlanır */
let typer=null;
function typeInto(el,text,done){
 clearInterval(typer);el.textContent="";
 const reduce=matchMedia("(prefers-reduced-motion: reduce)").matches;
 if(reduce){el.textContent=text;done&&done();return;}
 let i=0;typer=setInterval(()=>{i+=2;el.textContent=text.slice(0,i);if(i>=text.length){clearInterval(typer);typer=null;done&&done();}},18);
 el.onclick=()=>{if(typer){clearInterval(typer);typer=null;el.textContent=text;done&&done();}};
}
function showLetter(text,then,from){
 busy=true;sfx.letter();
 const ov=$("letterScreen");ov.hidden=false;ov.classList.remove("in");void ov.offsetWidth;ov.classList.add("in");
 $("lfrom").textContent=from||`Deniz’den · ${S.year}`;
 $("lpm").innerHTML=`AKDENİZ<br>·<br>${Math.min(S.year,2075)}`;
 typeInto($("ltext"),text);
 $("lnext").onclick=()=>{clearInterval(typer);ov.hidden=true;then();};
 $("lnext").focus({preventScroll:true});
}
function endGame(id){
 busy=true;sfx.end();saveEnd(id);
 const E=ENDINGS[id],{t,death}=Engine.endText(S,id),w=Engine.world(S),got=loadEnds();
 // Final oynandıysa Deniz'in kapıları, oynanmadıysa bu zaman çizgisinde kapanan kapılar
 const doors=S.doors.length?S.doors:[...new Map(S.hits.map(h=>[h.id+h.x,{x:h.x,lock:h}])).values()],shut=doors.filter(d=>d.lock);
 $("epm").className="postmark"+(death?" red":"");
 $("epm").innerHTML=death?`SON<br>·<br>${S.year}`:"AKDENİZ<br>·<br>2075";
 $("efrom").textContent=death?`Zaman çizgisi ${S.year} yılında koptu`:"Görevin bitti · Deniz’den son mektup";
 $("ename").textContent=E.n;
 // Sonun altında bir sonraki oyun için ipucu; Kırılgan Umut neyin eksik kaldığını söyler
 const bal=MK.every(k=>S.m[k]>=30&&S.m[k]<=70),t0=(Math.round(w.t0*10)/10).toString().replace(".",",");
 const hint=id==="kirilgan"?(bal?`İpucu: Dengeyi korudun ama 2075 ısınması +${t0}°C. Mavi Akdeniz için 2,2°C’nin altında kalmalı.`
  :"İpucu: Dört denge de 30–70 arasında kalır ve ısınma 2,2°C’nin altında olursa Mavi Akdeniz’e ulaşırsın."):E.h||"";
 $("ehint").textContent=hint;$("ehint").hidden=!hint;
 $("estats").innerHTML=`<span><b>${Math.min(S.year,2075)}</b>ulaşılan yıl</span>`+
  (S.doors.length?`<span><b>${shut.length}/${S.doors.length}</b>kapı kapalı</span>`:`<span><b>${shut.length}</b>kapanan kapı</span>`)+`<span><b>${got.length}/12</b>son keşfedildi</span>`;
 $("edoors").hidden=!doors.length;
 $("edoors").innerHTML=doors.length?`<p class="dh">${S.doors.length?"Deniz’e bıraktığın kapılar":"Bu zaman çizgisinde kapanan kapılar"}</p>`+doors.map(d=>d.lock
  ?`<div class="door shut"><b>🔒 ${d.x}</b><span>KAPANDI · ${d.lock.y} — ${d.lock.why}</span></div>`
  :`<div class="door"><b>✓ ${d.x}</b><span>Açık kaldı</span></div>`).join(""):"";
 // Açılmadan batan şişeler: kimin mektubuydu, zaman yerine neye karar verdi
 const sk=S.sunk||[];$("esunk").hidden=!sk.length;
 $("esunk").innerHTML=sk.length?`<p class="dh">Açılmadan batan şişeler</p>`+sk.map(x=>`<div class="door shut"><b>🫧 ${CH[byId[x.id].c].n} · ${x.y}</b><span>${x.x?`Kendiliğinden oldu: “${x.x}”`:"Kimse cevap vermedi"}</span></div>`).join(""):"";
 const s=S.s,r=v=>String(Math.round(v));
 $("ekarne").innerHTML=`<p class="dh">${death?"Bu gidişle 2075":"2075 karnesi"}</p>`+[["Isınma",`+${(Math.round(w.t0*10)/10).toString().replace(".",",")}°C`],["Deniz seviyesi",`+${w.sl} cm`],
  ["Temiz enerji",`%${w.tem}`],["Ormanlar",r(s.or)],["Okyanuslar",r(s.ok)],["Uyum",r(s.uy)],["Güven",r(s.gv)]].map(([a,b])=>`<span><b>${b}</b>${a}</span>`).join("");
 $("egrid").innerHTML=END_ORDER.map(k=>`<div class="chip${got.includes(k)?" got":""}${k===id?" now":""}">${got.includes(k)?ENDINGS[k].n:"? ? ?"}</div>`).join("");
 $("esrc").innerHTML=SOURCES.map(s=>`<li>${s}</li>`).join("");
 const ov=$("endScreen");ov.hidden=false;ov.classList.remove("in");void ov.offsetWidth;ov.classList.add("in");
 typeInto($("etext"),t);
 S.card=null;
}

/* ---------- Dosya: arka plandaki dünya sistemleri ---------- */
function openDossier(){
 if(!S)return;const s=S.s,p=S.ps||s,w=Engine.world(S),f=(v,dg=0)=>v.toFixed(dg).replace(".",",");
 // good: değerin artması iyi mi; ok yönü ve rengi buna göre
 const tr=(k,good)=>{const d=s[k]-p[k];if(Math.abs(d)<.002*Math.max(1,Math.abs(s[k])))return"";return`<i class="${(d>0)===good?"":"bad"}">${d>0?"▲":"▼"}</i>`};
 const rows=[
  // Aerosol ısınmayı yalnızca maskeler: rakam maskesiz ısınmayı gösterir, hissedilen ayrıca yazılır
  ["🌡️","Isınma",`+${f(s.T0,2)}°C`+tr("T0",false),(s.aer?`aerosolle hissedilen +${f(s.T,2)}°C · `:"")+`2075 tahmini: +${f(w.t0,1)}°C`],
  ["💨","Yıllık CO₂",`${f(s.em)} milyar ton`+tr("em",false),"Isınma birikimli CO₂ ile artar"],
  ["🌊","Deniz seviyesi",`+${f(s.sl)} cm`+tr("sl",false),`2075 tahmini: +${w.sl} cm · emisyon dursa da yükselir`],
  ["⚡","Temiz enerji payı",`%${Math.round(100*Math.min(1,s.tk/s.tal))}`+tr("tk",true),`yıllık büyüme hızı %${f(100*s.r,1)}`],
  ["🏭","Fosil altyapı",f(s.fk)+tr("fk",false),"santraller onlarca yıl yanar"],
  ["🔌","Enerji talebi",f(s.tal)+tr("tal",false),"2026 = 100 · ısındıkça klima talebi artar"],
  ["🌳","Ormanlar",`${f(s.or)}/100`+tr("or",true),""],
  ["🐠","Okyanuslar",`${f(s.ok)}/100`+tr("ok",true),""],
  ["🛡️","Uyum kapasitesi",`${f(s.uy)}/100`+tr("uy",true),`yıllık afet zararı: ${f(s.D,1)}`],
  ["🤝","Güven ve adalet",`${f(s.gv)}/100`+tr("gv",true),""],
 ];
 $("dtitle").textContent=`Dünya raporu · ${Math.min(S.year,2075)}`;
 $("drows").innerHTML=rows.map(([ic,n,v,sm])=>`<div class="drow"><span class="ic">${ic}</span><b>${n}</b><span class="v">${v}</span>${sm?`<small>${sm}</small>`:""}</div>`).join("");
 const L=S.last;$("dpush").textContent=L?"Bu yıl göstergelere etkisi: "+MK.map(k=>`${MN[k]} ${L[k]>=0?"+":"−"}${f(Math.abs(L[k]),1)}`).join(" · "):"Henüz bir yıl geçmedi.";
 const ov=$("dossier");ov.hidden=false;ov.classList.remove("in");void ov.offsetWidth;ov.classList.add("in");$("dclose").focus({preventScroll:true});
}
$("dosyaBtn").addEventListener("click",openDossier);
$("dclose").addEventListener("click",()=>{$("dossier").hidden=true;});

/* ---------- Cevaplar ve tuşlar ---------- */
["l","r"].forEach(s=>{const b=$(s==="l"?"btnL":"btnR");
 b.addEventListener("mouseenter",()=>{if(!busy)showSide(s)});
 b.addEventListener("mouseleave",()=>{if(!busy)showSide(null)});
 b.addEventListener("focus",()=>{if(!busy)showSide(s)});
 b.addEventListener("blur",()=>showSide(null));
 b.addEventListener("click",()=>commit(s));});
document.addEventListener("keydown",e=>{
 if(!$("dossier").hidden){if(e.key==="Escape"||e.key==="Enter"){e.preventDefault();$("dossier").hidden=true;}return;}
 if((e.key==="d"||e.key==="D")&&!busy){openDossier();return;}
 if(!$("letterScreen").hidden&&(e.key==="Enter"||e.key===" ")){e.preventDefault();$("lnext").click();return;}
 if(busy||!S)return;
 const i=e.key==="1"||e.key==="ArrowLeft"?0:e.key==="2"||e.key==="ArrowRight"?1:-1;if(i<0)return;
 if(!$("tideView").hidden)pickBottle(i);else commit(i?"r":"l");});

$("mute").addEventListener("click",()=>{muted=!muted;$("mute").textContent=muted?"SES KAPALI":"SES AÇIK";$("mute").setAttribute("aria-pressed",muted);});
document.querySelectorAll("[data-mode]").forEach(b=>b.addEventListener("click",()=>{$("startScreen").hidden=true;newGame(b.dataset.mode);}));
$("again").addEventListener("click",()=>{$("endScreen").hidden=true;showStart();});
function showStart(){const g=loadEnds().length;$("found").textContent=g?`Keşfedilen sonlar: ${g}/12`:"12 farklı son seni bekliyor.";document.body.classList.remove("epi");const ov=$("startScreen");ov.hidden=false;}

/* ---------- Başlat ---------- */
buildMeters();buildWorld();
function boot(data){
 if(data&&data.S&&data.S.step){S=data.S;$("startScreen").hidden=true;document.body.classList.toggle("epi",!!S.epi);renderMeters();updateWorld();renderYear();
  busy=false;if(S.card)showLetterCard(false);else if(S.offer)showTide();else nextTurn();return;}
 S=Engine.newState("tam");
 renderMeters();updateWorld();renderYear();busy=true;showStart();
}
const hot=window.claude&&window.claude.hot;
if(hot&&hot.snapshot)hot.snapshot(()=>({S}));
if(hot&&hot.ready)hot.ready(boot);else boot(hot&&hot.data||{});
