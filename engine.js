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
 newState(hitap){
  return{m:{d:50,h:50,e:50,n:50},s:{...SYS0},year:2026,flags:[],fy:{},fired:[],used:[],queue:[],hitap,said:[],hits:[],told:0,card:null,count:0,epi:null,ei:0,doors:[],last:null,ps:null};
 },
 has(S,f){return S.flags.includes(f)},
 fill(S,s){return s.replace(/\{E\}/g,S.hitap==="Dede"?"Baba":"Anne").replace(/\{H\}/g,S.hitap).replace(/\{Y\}/g,S.year)},

 // 2075 tahmini: bugünkü dünya yeni karar alınmadan 2075'e nasıl varır (her kararda bir kez hesaplanır)
 world(S){
  if(S._wc===S.count)return S._w;
  const s={...S.s};for(let y=S.year;y<2075;y++)Sys.step(s,y);
  S._wc=S.count;
  return S._w={t:Math.round(s.T*10)/10,t0:s.T0,sl:Math.round(s.sl),tem:Math.round(100*Math.min(1,s.tk/s.tal))};
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

 okCard(S,c){
  if(c.at||c.chain||c.ev||S.used.includes(c.id))return false;
  if(c.min&&S.year<c.min)return false; if(c.max&&S.year>c.max)return false;
  if(c.req&&!c.req.every(f=>this.has(S,f)))return false;
  return true;
 },
 pickCard(S,rnd=Math.random){
  const forced=CARDS.find(c=>c.at===S.year&&!S.used.includes(c.id)); if(forced)return forced;
  // Dünya bir eşiği geçtiyse olay kartı öne geçer
  const ev=Object.keys(TRIG).find(id=>!S.fired.includes(id)&&TRIG[id](S.s));
  if(ev){const c=byId[ev];S.fired.push(ev);S.flags.push(ev);S.fy[ev]=S.year;HK.forEach(k=>{if(c.fire&&c.fire[k])S.s[k]+=c.fire[k]});S._wc=-1;return c;}
  // Sıradaki sonuç kartı vakti geldiyse gelir; havuz kartıysa kendi başlangıç yılını da bekler
  const qi=S.queue.findIndex(q=>q.at<=S.year&&!(byId[q.id].min>S.year));
  if(qi>=0){const c=byId[S.queue.splice(qi,1)[0].id];if(c&&!S.used.includes(c.id))return c;}
  let pool=CARDS.filter(c=>this.okCard(S,c));
  if(!pool.length){S.used=S.used.filter(id=>byId[id].at||byId[id].chain||byId[id].ev);pool=CARDS.filter(c=>this.okCard(S,c));}
  if(!pool.length)pool=CARDS.filter(c=>!c.at&&!c.chain&&!c.ev);
  return pool[Math.floor(rnd()*pool.length)];
 },
 // Kartı seçer, gösterilen kilitleri mektuplar için kaydeder
 draw(S,rnd){
  const c=this.pickCard(S,rnd),L=this.locks(S,c);S.card=c.id;
  ["l","r"].forEach(s=>{if(L[s])S.hits.push({id:c.id,x:c[s].x,seen:S.year,...L[s]})});
  return L;
 },
 // Seçimi uygular, dünyayı bir yıl ilerletir; bir denge 0 ya da 100 olursa son kimliğini döndürür
 apply(S,side){
  const c=byId[S.card],o=c[side],s=S.s;S.ps={...s};
  MK.forEach(k=>S.m[k]=clamp(S.m[k]+(o[k]||0)));
  HK.forEach(k=>{if(o[k])s[k]+=o[k]});
  if(o.f&&!this.has(S,o.f)){S.flags.push(o.f);S.fy[o.f]=S.year;if(o.f==="aerosol")s.aer=1;}
  if(o.nx)(Array.isArray(o.nx[0])?o.nx:[o.nx]).forEach(([id,y])=>S.queue.push({id,at:S.year+y}));
  S.used.push(c.id);S.count++;
  Sys.step(s,S.year);S.year++;
  const dr=this.drift(S);MK.forEach(k=>S.m[k]=clamp(S.m[k]+dr[k]));S.last=dr;
  const dead=MK.find(k=>S.m[k]<=0||S.m[k]>=100);
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
 introLetter(S){
  return `Sevgili ${S.hitap},\nBu mektubu sana nasıl gönderdiğimi sorma, uzun hikâye. Ben Deniz, torununum. Senin zamanında daha doğmadım bile.\nAnnem hep 2026’yı anlatır: dünya liderlerinin Antalya’da buluştuğu, senin de Küresel İklim Konseyi’nin başına seçildiğin yıl.\nBir şey daha: Bazı kararlar kapıları kalıcı olarak kapatıyor. 2075’te o kapıların önünde ben duracağım. Bana hangilerini açık bırakacaksın?`;
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
  return `Sevgili ${S.hitap},\nBugün görev süren doldu. Konsey yeni başkanını seçti; ben de kendi hayatımın kararlarını vermeye başlıyorum.\n`+
   (n?`Önümdeki kapılardan ${n>1?n+" tanesini":"birini"} sen çoktan kapatmışsın.`:"Önümdeki kapıları açık bırakmışsın. Teşekkür ederim.")+
   "\nŞimdi bir süre benim yerimde ol: kararları sen ver, kapıları benim gözümden gör.";
 },
 endText(S,id){
  const E=ENDINGS[id],death=!["mavi","yesil","kirilgan","sonsuz"].includes(id);
  let t=`Sevgili ${S.hitap},\n`+this.fill(S,E.t);
  if(death&&S.year<2049)t+="\nAnnem bu dünyaya çocuk getirmemeye karar vermiş. Yani ben belki de hiç doğmadım. Bu mektubu kim yazıyor, bilmiyorum.";
  if(!death){const f=S.flags.filter(x=>FL[x]).slice(-2);if(f.length)t+="\n"+f.map(x=>FL[x]).join(" ");}
  return{t,death};
 },
};
