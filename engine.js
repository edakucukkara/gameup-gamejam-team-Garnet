/* Oyun motoru: DOM'a dokunmaz. Tarayıcıda ui.js, Node'da tools/sim.js kullanır. data.js'ten sonra yüklenir. */
const MK=["d","h","e","n"], MN={d:"Doğa",h:"Uluslar",e:"Fon",n:"Enerji"};
const byId=Object.fromEntries(CARDS.concat(EPI).map(c=>[c.id,c]));
const clamp=v=>Math.max(0,Math.min(100,v));

const Engine={
 newState(hitap){
  return{m:{d:50,h:50,e:50,n:50},path:.5,year:2026,flags:[],fy:{},used:[],queue:[],hitap,said:[],hits:[],told:0,card:null,count:0,epi:null,ei:0,doors:[]};
 },
 has(S,f){return S.flags.includes(f)},
 fill(S,s){return s.replace(/\{E\}/g,S.hitap==="Dede"?"Baba":"Anne").replace(/\{H\}/g,S.hitap).replace(/\{Y\}/g,S.year)},

 /* 2075 için yaklaşık değerler (IPCC AR6): path 0 ≈ SSP1-2.6, .5 ≈ SSP2-4.5, 1 ≈ SSP3-7.0.
    Aerosol ısınmayı maskeler ama deniz seviyesini durdurmaz. */
 world(S){
  const p=S.path,lerp=(a,b,c)=>p<.5?a+(b-a)*p*2:b+(c-b)*(p-.5)*2,t0=lerp(1.8,2.4,3.0);
  return{t:Math.round((t0-(this.has(S,"aerosol")?.5:0))*10)/10,t0,sl:Math.round(lerp(32,38,45))};
 },
 // Mektuplar ve kilitler maskelenmemiş ısınmaya bakar: aerosolle "2 derecenin altında kaldık" denmez
 band(S){const t=this.world(S).t0;return t<2?"lo":t>=2.7?"hi":"mid"},

 /* Kapanan kapılar: seçeneğin lock listesindeki bayraklardan biri varsa kapalıdır */
 lockOf(S,o){
  for(const k of o.lock||[]){
   const on=k==="@hot"?this.world(S).t0>=2.8:k==="@notcut"?S.path>.4:this.has(S,k);
   if(on)return{k,y:S.fy[k]||S.year,why:LOCKS[k]};
  }
  return null;
 },
 locks(S,c){return{l:this.lockOf(S,c.l),r:this.lockOf(S,c.r)}},

 okCard(S,c){
  if(c.at||c.chain||S.used.includes(c.id))return false;
  if(c.min&&S.year<c.min)return false; if(c.max&&S.year>c.max)return false;
  if(c.req&&!c.req.every(f=>this.has(S,f)))return false;
  return true;
 },
 pickCard(S,rnd=Math.random){
  const forced=CARDS.find(c=>c.at===S.year&&!S.used.includes(c.id)); if(forced)return forced;
  // Sıradaki sonuç kartı vakti geldiyse gelir; havuz kartıysa kendi başlangıç yılını da bekler
  const qi=S.queue.findIndex(q=>q.at<=S.year&&!(byId[q.id].min>S.year));
  if(qi>=0){const c=byId[S.queue.splice(qi,1)[0].id];if(c&&!S.used.includes(c.id))return c;}
  let pool=CARDS.filter(c=>this.okCard(S,c));
  if(!pool.length){S.used=S.used.filter(id=>byId[id].at||byId[id].chain);pool=CARDS.filter(c=>this.okCard(S,c));}
  if(!pool.length)pool=CARDS.filter(c=>!c.at&&!c.chain);
  return pool[Math.floor(rnd()*pool.length)];
 },
 // Kartı seçer, gösterilen kilitleri mektuplar için kaydeder
 draw(S,rnd){
  const c=this.pickCard(S,rnd),L=this.locks(S,c);S.card=c.id;
  ["l","r"].forEach(s=>{if(L[s])S.hits.push({id:c.id,x:c[s].x,seen:S.year,...L[s]})});
  return L;
 },
 // Seçimi uygular; bir denge 0 ya da 100 olursa son kimliğini döndürür
 apply(S,side){
  const c=byId[S.card],o=c[side];
  MK.forEach(k=>S.m[k]=clamp(S.m[k]+(o[k]||0)));
  S.path=Math.max(0,Math.min(1,S.path+(o.c||0)/100));
  if(o.f&&!this.has(S,o.f)){S.flags.push(o.f);S.fy[o.f]=S.year;}
  if(o.nx)(Array.isArray(o.nx[0])?o.nx:[o.nx]).forEach(([id,y])=>S.queue.push({id,at:S.year+y}));
  S.used.push(c.id);S.count++;S.year++;
  const dead=MK.find(k=>S.m[k]<=0||S.m[k]>=100);
  return dead?dead+(S.m[dead]<=0?"0":"100"):null;
 },
 finalType(S){
  const bal=MK.every(k=>S.m[k]>=30&&S.m[k]<=70);
  if(bal&&this.has(S,"kapsul")&&this.has(S,"denizkiyi"))return"sonsuz";
  if(bal)return"mavi"; if(S.m.d>=65)return"yesil"; return"kirilgan";
 },

 /* Final: kapısı kapanmış kartlar öne alınır, en fazla 4 kart + kapanış kartı */
 epilogue(S){
  const shut=c=>{const L=this.locks(S,c);return L.l||L.r?1:0};
  const pool=EPI.filter(c=>!c.last&&(!c.need||c.need.some(f=>this.has(S,f)))).sort((a,b)=>shut(b)-shut(a));
  return pool.slice(0,4).concat(EPI.filter(c=>c.last)).map(c=>c.id);
 },
 startEpi(S){S.epi=this.epilogue(S);S.ei=0;S.card=S.epi[0]},
 epiDraw(S){S.card=S.epi[S.ei];return this.locks(S,byId[S.card])},
 // Deniz'in seçimini kaydeder; final bittiyse true döndürür
 epiApply(S,side){
  const c=byId[S.card];
  if(c.l.lock||c.r.lock){const o=c.l.lock?c.l:c.r;S.doors.push({id:c.id,x:o.x,lock:this.lockOf(S,o)});}
  S.ei++;return S.ei>=S.epi.length;
 },

 /* ---------- Mektuplar ---------- */
 // Aynı satır iki kez gelmez: kullanılmamış varyantlardan biri; hepsi kullanıldıysa satır atlanır
 line(S,key,arr,rnd=Math.random){
  const free=arr.map((_,j)=>j).filter(j=>!S.said.includes(key+j));
  if(!free.length)return null;
  const j=free[Math.floor(rnd()*free.length)];S.said.push(key+j);return arr[j];
 },
 introLetter(S){
  return `Sevgili ${S.hitap},\nBu mektubu sana nasıl gönderdiğimi sorma, uzun hikâye. Ben Deniz, torununum. Senin zamanında daha doğmadım bile.\nAnnem hep 2026’yı anlatır: dünya liderlerinin Antalya’da buluştuğu, senin de Küresel İklim Konseyi’nin başına seçildiğin yıl.\nBir şey daha: Bazı kararlar kapıları kalıcı olarak kapatıyor. 2075’te o koltuğa ben oturacağım. Bana hangi kapıları açık bırakacaksın?`;
 },
 midLetter(S,rnd){
  const lines=[`Sevgili ${S.hitap},`];
  if(S.year===2050)lines.push("Annem doğduğum günü anlattı. Beni ilk kucağına aldığında ağlamışsın.");
  let worst=null,dist=0;MK.forEach(k=>{const dd=Math.abs(S.m[k]-50);if(dd>dist){dist=dd;worst=k}});
  const wl=dist>=25?this.line(S,`w.${worst}.${S.m[worst]<50?"lo":"hi"}.`,WORLD_LINES[worst][S.m[worst]<50?"lo":"hi"],rnd):null;
  lines.push(wl||this.line(S,"calm.",CALM,rnd));
  if(S.year>=2038){const b=this.band(S);lines.push(this.line(S,`c.${b}.`,CLIMATE[b],rnd));}
  const hit=S.hits.slice(S.told).pop(),tpl=hit&&this.line(S,"lock.",LOCKLINES,rnd);S.told=S.hits.length;
  if(tpl)lines.push(tpl.replace("{Y}",hit.y).replace("{W}",hit.why));
  else{const fresh=S.flags.filter(f=>FL[f]&&!S.said.includes(f));if(fresh.length){const f=fresh[fresh.length-1];S.said.push(f);lines.push(FL[f]);}}
  lines.push(S.year>=2062?"2075’e az kaldı. Seni bekliyorum.":"Bir sonraki mektupta görüşürüz.");
  return lines.filter(Boolean).join("\n");
 },
 epiLetter(S){
  const n=S.epi.filter(id=>{const L=this.locks(S,byId[id]);return L.l||L.r}).length;
  return `Sevgili ${S.hitap},\nBugün Konsey’in başına seçildim. Senin koltuğuna oturuyorum.\nMasadaki dosyalara baktım. `+
   (n?`${n} kapıyı benim için çoktan kapatmışsın.`:"Kapıları açık bırakmışsın. Teşekkür ederim.")+"\nŞimdi sıra bende.";
 },
 endText(S,id){
  const E=ENDINGS[id],death=!["mavi","yesil","kirilgan","sonsuz"].includes(id);
  let t=`Sevgili ${S.hitap},\n`+this.fill(S,E.t);
  if(death&&S.year<2049)t+="\nAnnem bu dünyaya çocuk getirmemeye karar vermiş. Yani ben belki de hiç doğmadım. Bu mektubu kim yazıyor, bilmiyorum.";
  if(!death){const f=S.flags.filter(x=>FL[x]).slice(-2);if(f.length)t+="\n"+f.map(x=>FL[x]).join(" ");}
  return{t,death};
 },
};
