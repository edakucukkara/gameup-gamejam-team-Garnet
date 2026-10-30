// Denge simülasyonu ve içerik kontrolü. Kullanım: node tools/sim.js [strateji başına oyun sayısı]
// data.js ve engine.js'i tarayıcıdaki gibi aynı ortamda yükler, dört oyuncu tipiyle binlerce oyun oynar.
const fs=require("fs"),path=require("path"),vm=require("vm");
const ctx=vm.createContext({});
for(const f of ["data.js","engine.js"])vm.runInContext(fs.readFileSync(path.join(__dirname,"..",f),"utf8"),ctx,{filename:f});

function harness(N){
 const errs=[],warn=[],all=CARDS.concat(EPI);
 /* ---------- İçerik kontrolü ---------- */
 const setFlags=new Set();all.forEach(c=>["l","r"].forEach(s=>{if(c[s].f)setFlags.add(c[s].f)}));
 all.forEach(c=>{
  if(!CH[c.c])errs.push(`${c.id}: karakter yok (${c.c})`);
  ["l","r"].forEach(s=>{const o=c[s];
   (o.lock||[]).forEach(k=>{
    if(!LOCKS[k])errs.push(`${c.id}.${s}: LOCKS'ta sebep yok (${k})`);
    if(k[0]!=="@"&&!setFlags.has(k))errs.push(`${c.id}.${s}: kilit bayrağı hiçbir seçenekte konmuyor (${k})`);});
   if(o.nx&&!(byId[o.nx[0]]&&byId[o.nx[0]].chain))errs.push(`${c.id}.${s}: zincir kartı yok (${o.nx[0]})`);
   if(o.f&&!FL[o.f])warn.push(`${c.id}.${s}: "${o.f}" için mektup satırı (FL) yok`);});
  (c.req||[]).concat(c.need||[]).forEach(f=>{if(!setFlags.has(f))errs.push(`${c.id}: koşul bayrağı hiç konmuyor (${f})`)});
 });
 /* ---------- Oyuncu tipleri ---------- */
 const pickers={
  rastgele:(S,c,r)=>r()<.5?"l":"r",
  yesil:(S,c)=>{const v=o=>(o.c||0)-(o.d||0)/10;return v(c.l)<=v(c.r)?"l":"r"},
  kahverengi:(S,c)=>{const v=o=>(o.c||0)+(o.e||0)/10;return v(c.l)>=v(c.r)?"l":"r"},
  dengeli:(S,c)=>{const cost=o=>MK.reduce((a,k)=>a+(S.m[k]+(o[k]||0)-50)**2,0)+(o.c||0)*20;return cost(c.l)<=cost(c.r)?"l":"r"},
 };
 let seed=7;const rnd=()=>(seed=(seed*16807)%2147483647)/2147483647;
 const res={};
 for(const [name,pick] of Object.entries(pickers)){
  const r={ends:{},year:0,t:0,hits:0,shut:0,doors:0,full:0,both:0,n:N};
  for(let i=0;i<N;i++){
   const S=Engine.newState("Dede");let end=null;
   while(!end){
    const L=Engine.draw(S,rnd),c=byId[S.card];
    if(L.l&&L.r)r.both++;
    let side=pick(S,c,rnd);if(L[side])side=side==="l"?"r":"l";
    const dead=Engine.apply(S,side);
    if(LETTER_YEARS.includes(S.year))Engine.midLetter(S,rnd);
    if(dead)end=dead;
    else if(S.year>=2075){
     Engine.startEpi(S);
     for(;;){const Le=Engine.epiDraw(S);if(Engine.epiApply(S,Le.l?"r":"l"))break;}
     end=Engine.finalType(S);r.full++;r.shut+=S.doors.filter(d=>d.lock).length;r.doors+=S.doors.length;
    }
   }
   r.ends[end]=(r.ends[end]||0)+1;r.year+=Math.min(S.year,2075);r.t+=Engine.world(S).t;r.hits+=S.hits.length;
  }
  res[name]=r;
 }
 return{errs,warn,res};
}

const N=+process.argv[2]||3000;
const {errs,warn,res}=vm.runInContext(`(${harness})(${N})`,ctx);
const pct=(a,b)=>(100*a/b).toFixed(0).padStart(3)+"%";
console.log(`İçerik: ${errs.length} hata, ${warn.length} uyarı`);
errs.forEach(e=>console.log("  HATA  "+e));warn.forEach(w=>console.log("  uyarı "+w));
for(const [k,r] of Object.entries(res)){
 const ends=Object.entries(r.ends).sort((a,b)=>b[1]-a[1]).map(([e,n])=>`${e} ${pct(n,r.n).trim()}`).join(" · ");
 console.log(`\n${k.padEnd(10)} 2075'e varan${pct(r.full,r.n)} · ort. yıl ${(r.year/r.n).toFixed(0)} · 2075 ısınması +${(r.t/r.n).toFixed(2)}°C · oyunda görülen kilit ${(r.hits/r.n).toFixed(1)}`+
  (r.full?` · Deniz'e kapanan kapı ${(r.shut/r.full).toFixed(1)}/${(r.doors/r.full).toFixed(1)}`:"")+(r.both?` · İKİ SEÇENEĞİ DE KİLİTLİ KART: ${r.both}`:""));
 console.log("           "+ends);
}
if(errs.length||Object.values(res).some(r=>r.both))process.exitCode=1;
