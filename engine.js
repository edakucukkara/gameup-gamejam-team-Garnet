/* Oyun motoru: DOM'a dokunmaz. Tarayıcıda ui.js, Node'da tools/sim.js kullanır. data.js'ten sonra yüklenir. */
const MK=["d","h","e","n"], MN={d:"Doğa",h:"Uluslar",e:"Fon",n:"Enerji"};
const byId=Object.fromEntries(CARDS.concat(EPI).map(c=>[c.id,c]));
const clamp=v=>Math.max(0,Math.min(100,v));
const cap=(v,a,b)=>Math.max(a,Math.min(b,v));

/* ---------- Arka plan: dünya sistemleri ----------
 Görünen dört denge kartlarla anında değişir; arkadaki sistemler her yıl onları yavaşça iter.
 tk temiz enerji kapasitesi · fk fosil kapasite · tal enerji talebi (2026 talebi = 100) · r temiz kapasitenin yıllık büyümesi
 tg talebin yıllık artışı (%) · or ormanlar · ok okyanuslar · uy uyum kapasitesi · gv güven ve adalet (0–100)
 mt metan programı (0–1) · rm havadan karbon çekme (Gt/yıl) · em yıllık CO₂ (Gt) · cum 2026'dan beri birikimli CO₂ (Gt)
 T ısınma (°C, sanayi öncesine göre; T0 aerosolsüz) · sl deniz seviyesi (cm, 2000'e göre) · D yıllık afet zararı */
const SYS0={tk:20,fk:85,tal:100,r:.025,tg:.8,or:60,ok:55,uy:30,gv:50,mt:0,mtr:0,rm:0,aer:0,em:40,cum:0,T:1.4,T0:1.4,sl:10,D:.56};
const HK=["tk","fk","tal","r","tg","or","ok","uy","gv","mt","rm"]; // seçeneklerin arka plan etkileri

const Sys={
 // Dünyayı bir yıl ilerletir
 step(s,y){
  s.tk+=s.tk*s.r*Math.max(0,1-s.tk/(s.tal*1.1));              // temiz enerji S-eğrisiyle büyür, talebe yaklaşınca yavaşlar
  s.fk*=s.tk>s.tal*.8?.9:s.tk>s.tal*.6?.95:.98;                // fosil emekliye ayrılır; temiz enerji ucuzlayınca daha hızlı
  const extra=Math.max(0,s.tk+s.fk-s.tal);                     // fazla arz ucuzluk getirir, talep şişer (geri tepme)
  s.tal*=1+(s.tg+Math.max(0,s.T-1.4)*.5+extra*.03)/100;        // ısındıkça klima talebi de artar
  const gap=s.tal-s.tk-s.fk;if(gap>0)s.fk+=gap*.7;             // arz yetmezse piyasa gaz santrali kurar
  const land=cap(4*(1-(s.or-60)/40),-1,8);                     // orman kaybı karbon salar, korunan orman tutar
  s.em=36*Math.max(0,s.tal-s.tk)/80+land;s.cum+=s.em-s.rm;
  s.mtr=Math.min(1,s.mt,s.mtr+.1);                             // metan kesintisi birkaç yılda etkisini gösterir
  // Her 1000 milyar ton CO₂ ≈ +0,45°C (IPCC AR6, TCRE); diğer gazlar yavaşça ekler, metan kesintisi düşürür
  s.T0=1.4+.00045*s.cum+.002*(y-2026)-.2*s.mtr;s.T=s.T0-(s.aer?.5:0);
  s.sl+=.45*(s.T0-.5);                                         // deniz ısınmayla hızlanır, emisyon dursa da yükselir
  s.or=cap(s.or-.15*Math.max(0,s.T-1.5),0,100);s.ok=cap(s.ok-.2*Math.max(0,s.T-1.2),0,100);
  s.uy=cap(s.uy-.3,0,100);s.gv=cap(s.gv,0,100);
  s.D=(Math.max(0,s.T-1.2)*3+Math.max(0,s.sl-15)/8)*(1-s.uy/100); // tehlike × hazırlıksızlık
 },
};
// Durum olayları: koşul gerçekleşince ilgili kart (data.js'te ev:1) bir kez gelir ve aynı adlı bayrağı bırakır
const TRIG={
 ev_mercan:s=>s.T>=1.7,
 ev_sebeke:s=>s.tk+s.fk-s.tal<-6,
 ev_temiz:s=>s.tk>=s.tal*.5,
 ev_afet:s=>s.D>=3,
 ev_sicak:s=>s.T>=2,
 ev_goc:s=>s.D>=2&&s.gv<45,
 ev_amazon:s=>s.or<40||(s.T>=2.3&&s.or<55),
};

const Engine={
 // "tam": her tur 1 yıl · "hizli": demo çekimi için her tur 2 yıl, kararların arka plan etkisi de iki yıllık sayılır
 // hitap: torun Deniz oyuncuya "Dede" ya da "Nine" der
 newState(mode="tam",hitap="Dede"){
  return{m:{d:50,h:50,e:50,n:50},s:{...SYS0},year:2026,mode,hitap,step:mode==="hizli"?2:1,flags:[],fy:{},fired:[],used:[],queue:[],offer:null,busy:false,note:null,hinted:[],lastNote:0,noted:[],sunk:[],said:[],hits:[],told:0,card:null,count:0,epi:null,ei:0,doors:[],last:null,ps:null};
 },
 has(S,f){return S.flags.includes(f)},
 fill(S,s){return s.replace(/\{E\}/g,S.hitap==="Nine"?"Anne":"Baba").replace(/\{H\}/g,S.hitap).replace(/\{Y\}/g,S.year)},

 // 2075 tahmini: bugünkü dünya yeni karar alınmadan 2075'e nasıl varır (her kararda bir kez hesaplanır)
 world(S){
  if(S._wc===S.count)return S._w;
  const s={...S.s};for(let y=S.year;y<2075;y++)Sys.step(s,y);
  S._wc=S.count;
  return S._w={t:Math.round(s.T*10)/10,t0:s.T0,sl:Math.round(s.sl),tem:Math.round(100*Math.min(1,s.tk/s.tal))};
 },
 // Adadaki palmiye kararların yönünü gösterir. Sağlığı (0–100) her kararda 2075 ısınma tahmini, doğa ve okyanustaki
 // değişimle oynar, her yıl dünyanın o anki hâline göre bir dengeye doğru çekilir. Sağlık dört görünüme çevrilir
 // (v: 0 kuruyor, 1 solgun, 2 sağlıklı, 3 gür); her sınırda ±3 pay vardır ki palmiye her kararda gidip gelmesin.
 // Kırılmak zordur: kururken sağlık üst üste iki kararda 12'nin altında kalmalı (lo). Kırıldıktan sonra arka arkaya
 // üç karar iyi yönde olursa (gs) ya da sağlık 60'ı geçerse öbür yanında yenisi filizlenir. n: kırılma, re: filizlenme, vc: görünüm değişimi sayısı;
 // born: doğduğu yıl (boyu yaşına göre), fa: kırıldığındaki yaşı
 palm(S){
  if(S.palm&&S.palm.c===S.count)return S.palm;
  const w=this.world(S),P=S.palm||(S.palm={h:65,v:2,up:1,born:2014,slot:0,n:0,re:0,vc:0,fa:0,gs:0,c:-1,t0:w.t0,d:S.m.d,ok:S.s.ok});
  const eq=55+(2.45-w.t0)*150+(S.m.d-50)*.3, g=-(w.t0-P.t0)*400+(S.m.d-P.d)*.5+(S.s.ok-P.ok)*.8;
  P.h=Math.max(0,Math.min(100,P.h+(eq-P.h)*(1-.7**S.step)+g*2));
  P.gs=g>.5?P.gs+1:g<0?0:P.gs;
  Object.assign(P,{t0:w.t0,d:S.m.d,ok:S.s.ok,c:S.count});
  if(P.up){
   const B=[35,50,65],v=P.v;
   while(P.v<3&&P.h>=B[P.v]+3)P.v++;
   while(P.v>0&&P.h<B[P.v-1]-3)P.v--;
   if(P.v!==v)P.vc++;
   P.lo=P.v===0&&P.h<=12?(P.lo||0)+1:0;
   if(P.lo>=2){P.up=0;P.n++;P.lo=0;P.fa=S.year-P.born;}
  }
  else if(P.h>=60||P.gs>=3){P.up=1;P.re++;P.born=S.year;P.slot^=1;P.h=Math.max(P.h,52);P.v=2;P.gs=0;}
  return P;
 },
 // Mektuplar maskelenmemiş ısınmaya bakar: aerosolle "2 derecenin altında kaldık" denmez
 band(S){const t=this.world(S).t0;return t<2?"lo":t>=2.5?"hi":"mid"},

 /* Kapanan kapılar: seçeneğin lock listesindeki bayraklardan biri varsa kapalıdır */
 lockOf(S,o){
  for(const k of o.lock||[]){
   const on=k==="@hot"?this.world(S).t0>=2.6:k==="@notcut"?S.s.em>20:this.has(S,k);
   if(on)return{k,y:S.fy[k]||S.year,why:LOCKS[k]};
  }
  return null;
 },
 locks(S,c){return{l:this.lockOf(S,c.l),r:this.lockOf(S,c.r)}},

 // Bekleyen (ertelenmiş ya da sonucu beklenen) dosya havuzdan tekrar çıkmaz
 okCard(S,c){
  if(c.at||c.chain||c.ev||S.used.includes(c.id)||S.queue.some(q=>q.id===c.id))return false;
  if(c.min&&S.year<c.min)return false; if(c.max&&S.year>c.max)return false;
  if(c.req&&!c.req.every(f=>this.has(S,f)))return false;
  return true;
 },
 poolCard(S,rnd,skip){
  const ok=c=>this.okCard(S,c)&&!skip.includes(c.id);
  let pool=CARDS.filter(ok);
  if(!pool.length){S.used=S.used.filter(id=>byId[id].at||byId[id].chain||byId[id].ev);pool=CARDS.filter(ok);}
  return pool.length?pool[Math.floor(rnd()*pool.length)]:null;
 },
 /* Gündem: bu yılın dosyaları Başkan'ın masasına gelir (S.offer); yalnız birine vakit vardır.
  Zorunlu kart ve eşik olayı tek gelir, bekletilemez. Yoksa iki dosya gelir, yoğun günlerde üç (S.busy):
  önce vakti gelenler (kararlarının sonuçları, bekleyen dosyalar), sonra havuzdan.
  Önce süresi dolan dosyalar düşer (fırsat kaçar); onları döndürür. Ara sıra Deniz'den bir not gelir (S.note).
  (Fonksiyon adı tide eski şişe mekaniğinden kaldı; tools/sim.js de bu adı kullanır.) */
 tide(S,rnd=Math.random){
  const sunk=this.expire(S);let ids;
  const forced=CARDS.find(c=>c.at&&c.at<=S.year&&!S.used.includes(c.id));
  const ev=!forced&&Object.keys(TRIG).find(id=>!S.fired.includes(id)&&TRIG[id](S.s));
  if(forced)ids=[forced.id];
  else if(ev){const c=byId[ev];S.fired.push(ev);S.flags.push(ev);S.fy[ev]=S.year;HK.forEach(k=>{if(c.fire&&c.fire[k])S.s[k]+=c.fire[k]});S._wc=-1;ids=[ev];}
  else{
   const n=S.year>=2029&&rnd()<.22?3:2;S.busy=n===3;
   ids=[];S.queue=S.queue.filter(q=>!S.used.includes(q.id));   // açılmış kartın sonucu ikinci kez gelmez
   S.queue.filter(q=>q.at<=S.year&&!(byId[q.id].min>S.year)).sort((a,b)=>a.at-b.at)
    .forEach(q=>{if(ids.length<n&&!ids.includes(q.id))ids.push(q.id)});
   while(ids.length<n){const c=this.poolCard(S,rnd,ids);if(!c)break;ids.push(c.id);}
  }
  if(forced||ev)S.busy=false;
  S.offer=ids.map(id=>{const q=S.queue.find(q=>q.id===id);return{id,from:q?q.from:null,back:!!(q&&q.p)}});
  S.queue=S.queue.filter(q=>!ids.includes(q.id));
  S.note=null;
  if(ids.length>1&&S.year>=2028&&S.count-S.lastNote>=4&&rnd()<.35){
   const h=ids.filter(id=>HINTS[id]&&!S.hinted.includes(id));
   if(h.length){const id=h[Math.floor(rnd()*h.length)];S.note={id,t:HINTS[id]};S.hinted.push(id);S.lastNote=S.count;}
  }
  return sunk;
 },
 // Bu kararla kapanmaya başlayan kapılar: seçimden hemen sonra bir kez bildirilir
 freshDoors(S){
  const f=S.flags.filter(k=>DOORS[k]&&!S.noted.includes(k));S.noted.push(...f);
  return f.map(k=>DOORS[k]);
 },
 // Seçilen dosya açılır; açılmayanlar bekler ve birkaç yıl sonra yine gelir. Görülen kilitler mektuplar için kaydedilir
 open(S,id){
  S.offer.forEach(o=>{if(o.id!==id)S.queue.push({id:o.id,at:S.year+(S.step===2?4:3),p:1,from:o.from})});
  S.offer=null;S.card=id;
  const c=byId[id],L=this.locks(S,c);
  ["l","r"].forEach(s=>{if(L[s])S.hits.push({id:c.id,x:c[s].x,seen:S.year,...L[s]})});
  return L;
 },
 // Süresi dolan bekleyen dosya düşer (fırsat kaçar) ve hiçbir şey yapmamanın sonucu (idle) işler; bu kimseyi öldürmez
 expire(S){
  const sunk=[];
  S.queue=S.queue.filter(q=>{
   const c=byId[q.id];if(!q.p||!c.max||S.year<=c.max)return true;
   const o=c.idle&&c[c.idle];if(o)this.effects(S,o,true);
   S.used.push(c.id);sunk.push({id:c.id,y:S.year,x:o?o.x:null});return false;});
  S.sunk.push(...sunk);return sunk;
 },
 // Seçeneğin etkileri: görünen dengeler, arka plan (demo modunda iki yıllık), bayrak, sıradaki kartlar
 effects(S,o,soft){
  MK.forEach(k=>{const v=S.m[k]+(o[k]||0);S.m[k]=soft?cap(v,1,99):clamp(v)});
  HK.forEach(k=>{if(o[k])S.s[k]+=o[k]*S.step});
  if(o.f&&!this.has(S,o.f)){S.flags.push(o.f);S.fy[o.f]=S.year;if(o.f==="aerosol")S.s.aer=1;}
  if(o.nx)(Array.isArray(o.nx[0])?o.nx:[o.nx]).forEach(([id,y])=>S.queue.push({id,at:S.year+y,from:S.year}));
  S._wc=-1;
 },
 // Seçimi uygular, dünyayı bir tur (1 ya da 2 yıl) ilerletir; bir denge 0 ya da 100 olursa son kimliğini döndürür
 apply(S,side){
  const c=byId[S.card];S.ps={...S.s};this.palm(S);
  this.effects(S,c[side]);S.used.push(c.id);S.count++;S.card=null;
  const avg={d:0,h:0,e:0,n:0};let dead=null;
  for(let i=0;i<S.step&&!dead;i++){
   Sys.step(S.s,S.year);S.year++;
   const dr=this.drift(S);MK.forEach(k=>{S.m[k]=clamp(S.m[k]+dr[k]);avg[k]+=dr[k]/S.step});
   dead=MK.find(k=>S.m[k]<=0||S.m[k]>=100);
  }
  S.last=avg;this.palm(S);
  return dead?dead+(S.m[dead]<=0?"0":"100"):null;
 },
 // Arka plandaki sistemlerin görünen dengelere yıllık itişi (en fazla ±3)
 drift(S){
  const s=S.s,F=f=>this.has(S,f),c=v=>cap(v,-3,3);
  return{
   d:c(((s.or+s.ok)/2-55)/15),
   h:c((s.gv-50)/15-s.D*(F("multeci")?.1:.2)),
   // Fon: üye katkısı − afet zararı + karbon geliri (emisyon düştükçe azalır) + uçuş vergisi − sübvansiyon
   e:c(1-s.D*.5+(F("karbonfiyat")?.03*s.em*(F("muafiyet")?.7:1):0)+(F("ucakvergi")?.4:0)-(F("subv")?.8:0)),
   n:cap((s.tk+s.fk-s.tal-5)/6,-2.5,3),
  };
 },
 // Başarı sonları dünyanın durumuna da bakar: dengeyi korusan bile ısınma yüksekse dünya kırılgandır
 finalType(S){
  const bal=MK.every(k=>S.m[k]>=30&&S.m[k]<=70),t=this.world(S).t0;
  if(bal&&t<=2.2&&this.has(S,"kapsul")&&this.has(S,"denizkiyi"))return"sonsuz";
  if(bal&&t<=2.2)return"mavi"; if(S.m.d>=65)return"yesil"; return"kirilgan";
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
 // Mektupları torun Deniz 2075'ten yazar
 introLetter(S){
  return `Sevgili ${S.hitap},\nBu mektubu sana nasıl gönderdiğimi sorma, uzun hikâye. Ben Deniz, torununum. Senin zamanında daha doğmadım bile.\n`+
   "Annem hep 2026’yı anlatır: dünya liderlerinin Antalya’da buluştuğu, senin de Küresel İklim Konseyi’nin başına seçildiğin yıl.\n"+
   "Masana her gün dosyalar gelecek ve hepsine yetişemeyeceksin. Bekleyen bir dosyanın vakti dolarsa karar senin yerine verilir. Arada bir ben de dosyaların arasına küçük bir not sıkıştıracağım.\n"+
   "Bir şey daha: Bazı kararlar kapıları kalıcı olarak kapatıyor. 2075’te o kapıların önünde ben duracağım.";
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
 // 2075: görev biter, Konsey yeni başkanını seçer; oyuncu bir süre Deniz'in yerine geçer
 epiLetter(S){
  const n=S.epi.filter(id=>{const L=this.locks(S,byId[id]);return L.l||L.r}).length;
  return `Sevgili ${S.hitap},\nBugün görev süren doldu. Konsey yeni başkanını seçti; ben de kendi hayatımın kararlarını vermeye başlıyorum.\n`+
   (n?`Önümdeki kapılardan ${n>1?n+" tanesini":"birini"} sen çoktan kapatmışsın.`:"Önümdeki kapıları açık bırakmışsın. Teşekkür ederim.")+
   "\nŞimdi bir süre benim yerimde ol: kararları sen ver, kapıları benim gözümden gör.";
 },
 // Çemberin kapanışı: 2075'te Deniz, 2026'daki büyüğüne ilk mektubu yazar. İyi sonlarda bu bir teşekkür mektubudur
 loopLetter(S,id){
  if(["mavi","yesil","sonsuz"].includes(id))return `Sevgili ${S.hitap},\nBu mektubu sana nasıl gönderdiğimi sorma. Yalnızca teşekkür etmek istedim.\nAçık bıraktığın kapılar, zor günlerde verdiğin kararlar, masanda bekleyen o dosyalar için.\nBenim dünyam senin ellerinde başladı.`;
  return this.introLetter(S);
 },
 endText(S,id){
  const E=ENDINGS[id],death=!["mavi","yesil","kirilgan","sonsuz"].includes(id);
  let t=`Sevgili ${S.hitap},\n`+this.fill(S,E.t);
  if(death&&S.year<2049)t+="\nAnnem bu dünyaya çocuk getirmemeye karar vermiş. Yani ben belki de hiç doğmadım. Bu mektubu kim yazıyor, bilmiyorum.";
  if(!death){const f=S.flags.filter(x=>FL[x]).slice(-2);if(f.length)t+="\n"+f.map(x=>FL[x]).join(" ");}
  return{t,death};
 },
};
