// Denge simülasyonu ve içerik kontrolü. Kullanım: node tools/sim.js [oyun sayısı] [--detay] [--mod tam|hizli]
// data.js ve engine.js'i tarayıcıdaki gibi aynı ortamda yükler, farklı oyuncu tipleriyle binlerce oyun oynar.
const fs=require("fs"),path=require("path"),vm=require("vm");
const ctx=vm.createContext({});
for(const f of ["data.js","engine.js"])vm.runInContext(fs.readFileSync(path.join(__dirname,"..",f),"utf8"),ctx,{filename:f});

function harness(N,modes){
 const errs=[],warn=[],all=CARDS.concat(EPI);
 /* ---------- İçerik kontrolü ---------- */
 const setFlags=new Set(Object.keys(TRIG));all.forEach(c=>["l","r"].forEach(s=>{if(c[s].f)setFlags.add(c[s].f)}));
 const keys=new Set(MK.concat(HK,["x","f","nx","lock"]));
 Object.keys(TRIG).forEach(id=>{if(!byId[id]||!byId[id].ev)errs.push(`${id}: olay kartı yok (ev:1)`)});
 CARDS.filter(c=>c.ev&&!TRIG[c.id]).forEach(c=>errs.push(`${c.id}: olay koşulu (TRIG) yok`));
 // Süresi olan kart açılmadan batabilir: neyin kendiliğinden olacağı (idle) yazılmalı
 CARDS.filter(c=>c.max&&!c.at&&!c.ev).forEach(c=>{if(!c.idle)warn.push(`${c.id}: max var ama idle yok (açılmadan batarsa hiçbir şey olmaz)`)});
 CARDS.filter(c=>c.idle&&!c[c.idle]).forEach(c=>errs.push(`${c.id}: idle tarafı yok (${c.idle})`));
 all.forEach(c=>{
  ["l","r"].forEach(s=>Object.keys(c[s]).forEach(k=>{if(!keys.has(k))errs.push(`${c.id}.${s}: bilinmeyen alan (${k})`)}));
  if(!CH[c.c])errs.push(`${c.id}: karakter yok (${c.c})`);
  ["l","r"].forEach(s=>{const o=c[s];
   (o.lock||[]).forEach(k=>{
    if(!LOCKS[k])errs.push(`${c.id}.${s}: LOCKS'ta sebep yok (${k})`);
    if(k[0]!=="@"&&!setFlags.has(k))errs.push(`${c.id}.${s}: kilit bayrağı hiçbir seçenekte konmuyor (${k})`);});
   if(o.nx)(Array.isArray(o.nx[0])?o.nx:[o.nx]).forEach(([id])=>{if(!byId[id])errs.push(`${c.id}.${s}: sıradaki kart yok (${id})`)});
   if(o.f&&!FL[o.f])warn.push(`${c.id}.${s}: "${o.f}" için mektup satırı (FL) yok`);
   if(o.x.length>24)warn.push(`${c.id}.${s}: seçenek metni uzun (${o.x.length} harf): ${o.x}`);});
  if(c.t.length>150)warn.push(`${c.id}: soru metni uzun (${c.t.length} harf)`);
  (c.req||[]).concat(c.need||[]).forEach(f=>{if(!setFlags.has(f))errs.push(`${c.id}: koşul bayrağı hiç konmuyor (${f})`)});
 });
 /* ---------- Oyuncu tipleri ----------
  Her tur iki adım: hangi şişe açılacak (bottle), hangi cevap verilecek (side).
  Kahin tipler (yesil, kahverengi, dengeli) etkileri tam bilir. "insan" tipleri yalnızca bir insanın görebileceğine
  yakın davranır: kırmızıya yaklaşan göstergeyi kurtarmaya çalışır, son tarihi yaklaşan şişeyi öne alır, bazen yanılır. */
 const coin=(r)=>r()<.5?"l":"r";
 const rescue=(S,c)=>{const k=MK.find(k=>S.m[k]<=20||S.m[k]>=80);if(!k)return null;const d=o=>Math.abs(S.m[k]+(o[k]||0)-50);return d(c.l)<=d(c.r)?"l":"r"};
 // İklime iyilik puanı: arka plan etkilerinden (temiz kapasite, büyüme, fosil, talep, orman, okyanus, metan, uyum)
 const clim=o=>(o.tk||0)+(o.r||0)*600-(o.fk||0)-(o.tal||0)*.6+(o.or||0)*.4+(o.ok||0)*.2+(o.mt||0)*6+(o.uy||0)*.2+(o.rm||0)*3;
 const green=o=>-clim(o)-(o.d||0)/10, brown=o=>-clim(o)+(o.e||0)/10;
 const cost=(S,o)=>MK.reduce((a,k)=>a+(S.m[k]+(o[k]||0)-50)**2,0);
 const bal=(S,c)=>cost(S,c.l)-clim(c.l)*20<=cost(S,c.r)-clim(c.r)*20?"l":"r";
 // Şişe seçimi: kartın en iyi cevabına göre puan (küçük olan iyi); acil = son tarihi en yakın olan
 const best=(score)=>(S,ids)=>ids.map(id=>{const c=byId[id];return[id,Math.min(score(S,c.l),score(S,c.r))]}).sort((a,b)=>a[1]-b[1])[0][0];
 const urgent=(S,ids,r)=>{const w=ids.filter(id=>byId[id].max).sort((a,b)=>byId[a].max-byId[b].max);return w.length?w[0]:ids[Math.floor(r()*ids.length)]};
 const any=(S,ids,r)=>ids[Math.floor(r()*ids.length)];
 const pickers={
  rastgele:{bottle:any,side:(S,c,r)=>coin(r)},
  "hep-sol":{bottle:(S,ids)=>ids[0],side:()=>"l"},
  "hep-sağ":{bottle:(S,ids)=>ids[0],side:()=>"r"},
  yesil:{bottle:best((S,o)=>green(o)),side:(S,c)=>green(c.l)<=green(c.r)?"l":"r"},
  kahverengi:{bottle:best((S,o)=>-brown(o)),side:(S,c)=>brown(c.l)>=brown(c.r)?"l":"r"},
  dengeli:{bottle:best((S,o)=>cost(S,o)-clim(o)*20),side:bal},
  "insan-yeşil":{bottle:(S,ids,r)=>r()<.5?urgent(S,ids,r):any(S,ids,r),side:(S,c,r)=>r()<.15?coin(r):rescue(S,c)||(green(c.l)<=green(c.r)?"l":"r")},
  "insan-dengeli":{bottle:(S,ids,r)=>r()<.5?urgent(S,ids,r):any(S,ids,r),side:(S,c,r)=>r()<.25?coin(r):rescue(S,c)||(cost(S,c.l)<=cost(S,c.r)?"l":"r")},
 };
 let seed=7;const rnd=()=>(seed=(seed*16807)%2147483647)/2147483647;
 const res={};
 for(const mode of modes)for(const [name,P] of Object.entries(pickers)){
  const r={n:N,ends:{},year:0,turns:0,t:0,tem:0,uy:0,ev:{},band:{lo:0,mid:0,hi:0},hits:0,firstLock:[],noLock:0,shut:0,doors:0,full:0,both:0,epi:{},rep:0,lrep:0,kill:{},sunk:0,sunkAny:0};
  for(let i=0;i<N;i++){
   const S=Engine.newState(mode),seen=new Set(),lines=new Set();let end=null;
   while(!end){
    Engine.tide(S,rnd);
    const ids=S.offer.map(o=>o.id),id=ids.length>1?P.bottle(S,ids,rnd):ids[0];
    const L=Engine.open(S,id),c=byId[id];
    if(seen.has(c.id))r.rep++;seen.add(c.id);
    if(L.l&&L.r)r.both++;
    let side=P.side(S,c,rnd);if(L[side])side=side==="l"?"r":"l";
    const dead=Engine.apply(S,side);r.turns++;
    if(LETTER_YEARS.includes(S.year)&&!dead)Engine.midLetter(S,rnd).split("\n").slice(1,-1).forEach(l=>{if(lines.has(l))r.lrep++;lines.add(l)});
    if(dead){end=dead;const k=c.id+"→"+dead;r.kill[k]=(r.kill[k]||0)+1;}
    else if(S.year>=2075){
     Engine.startEpi(S);r.epi[S.epi.length]=(r.epi[S.epi.length]||0)+1;
     for(;;){const Le=Engine.epiDraw(S);if(Engine.epiApply(S,Le.l?"r":"l"))break;}
     end=Engine.finalType(S);r.full++;r.shut+=S.doors.filter(d=>d.lock).length;r.doors+=S.doors.length;
     r.t+=S.s.T;r.tem+=Math.min(1,S.s.tk/S.s.tal);r.uy+=S.s.uy;r.band[Engine.band(S)]++;
    }
   }
   S.fired.forEach(e=>r.ev[e]=(r.ev[e]||0)+1);
   const fl=S.hits.find(h=>h.id!=="afrika");if(fl)r.firstLock.push(fl.seen);else r.noLock++;
   r.ends[end]=(r.ends[end]||0)+1;r.year+=Math.min(S.year,2075);r.hits+=S.hits.length;r.sunk+=S.sunk.length;if(S.sunk.length)r.sunkAny++;
  }
  res[mode+" · "+name]=r;
 }
 // Kart başına ortalama kayma (rastgele seçimde)
 const drift={};MK.forEach(k=>{drift[k]=CARDS.filter(c=>!c.chain).reduce((a,c)=>a+((c.l[k]||0)+(c.r[k]||0))/2,0)/CARDS.filter(c=>!c.chain).length});
 return{errs,warn,res,drift};
}

const N=+process.argv[2]||3000, detail=process.argv.includes("--detay");
const mi=process.argv.indexOf("--mod"),modes=mi>0?[process.argv[mi+1]]:["tam","hizli"];
const {errs,warn,res,drift}=vm.runInContext(`(${harness})(${N},${JSON.stringify(modes)})`,ctx);
const pct=(a,b)=>(b?100*a/b:0).toFixed(0)+"%";
console.log(`İçerik: ${errs.length} hata, ${warn.length} uyarı · kart başı kayma: `+Object.entries(drift).map(([k,v])=>`${k} ${v>=0?"+":""}${v.toFixed(2)}`).join(", "));
errs.forEach(e=>console.log("  HATA  "+e));if(detail)warn.forEach(w=>console.log("  uyarı "+w));
for(const [k,r] of Object.entries(res)){
 const top=(o,n)=>Object.entries(o).sort((a,b)=>b[1]-a[1]).slice(0,n);
 const fl=r.firstLock.length?(r.firstLock.reduce((a,b)=>a+b,0)/r.firstLock.length).toFixed(0):"-";
 console.log(`\n${k.padEnd(22)} 2075'e varan ${pct(r.full,r.n).padStart(4)} · ort. yıl ${(r.year/r.n).toFixed(0)} · tur ${(r.turns/r.n).toFixed(0)} · batan şişe ${(r.sunk/r.n).toFixed(1)} (hiç batmayan ${pct(r.n-r.sunkAny,r.n)}) · görülen kilit ${(r.hits/r.n).toFixed(1)} (2029 dışında hiç görmeyen ${pct(r.noLock,r.n)}, ilk yenisi ort. ${fl})`+
  (r.full?` · 2075 +${(r.t/r.full).toFixed(2)}°C, temiz %${(100*r.tem/r.full).toFixed(0)}, uyum ${(r.uy/r.full).toFixed(0)} (${["lo","mid","hi"].map(b=>b+" "+pct(r.band[b],r.full)).join(" ")}) · Deniz'e kapanan ${(r.shut/r.full).toFixed(1)}/${(r.doors/r.full).toFixed(1)} · final kart sayısı ${top(r.epi,4).map(([n,c])=>n+":"+pct(c,r.full)).join(" ")}`:"")+
  ` · tekrar kart/oyun ${(r.rep/r.n).toFixed(2)} · tekrar mektup satırı/oyun ${(r.lrep/r.n).toFixed(2)}`+(r.both?` · İKİ SEÇENEĞİ DE KİLİTLİ: ${r.both}`:""));
 console.log("                       sonlar: "+top(r.ends,12).map(([e,n])=>`${e} ${pct(n,r.n)}`).join(" · "));
 if(detail)console.log("                       öldüren kartlar: "+top(r.kill,6).map(([e,n])=>`${e} ${pct(n,r.n)}`).join(" · "));
 if(detail)console.log("                       olaylar: "+top(r.ev,8).map(([e,n])=>`${e.slice(3)} ${pct(n,r.n)}`).join(" · "));
}
if(errs.length||Object.values(res).some(r=>r.both))process.exitCode=1;
