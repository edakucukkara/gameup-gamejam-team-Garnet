/* Arayüz: portreler, 2075 sahnesi, göstergeler, masa ve dosyalar, mektuplar, final, ses, kayıt ve oyun akışı. data.js ve engine.js'ten sonra yüklenir. */

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

/* ---------- 2075 sahnesi ----------
 Genel dengeler (orman, duman, ısınma, deniz seviyesi) sürekli çizilir. Önemli kararlar ve olaylar sahneye kalıcı bir iz
 bırakır (DEC). Cevabın üzerine gelince o kararın izi soluk bir önizleme olarak görünür; seçince canlanır ve kısa bir not çıkar.
 Yerleşim (viewBox 360×150): solda kıyı ve orman, ortada tarla ve şehir, sağda santral, otel ve bataryalar; önde deniz. */
const W={seen:new Set()};
// Hangi iz hangi bayrakla görünür. F(bayrak): var mı · s: arka plandaki dünya
const DEC={
 dPlant:(F,s)=>F("komur")||F("afrikakomur")||F("komurkapat")||s.fk>55,
 dSmoke:(F,s)=>!F("komurkapat")&&(F("komur")||F("afrikakomur")||s.fk>55),
 dSmokeHeavy:F=>!F("komurkapat")&&(F("komur")||F("afrikakomur")),
 dMuseum:F=>F("komurkapat"),
 dGas:F=>F("gazfon")&&!F("gazkapat"),
 dRoad:F=>F("ormanyol"),
 dJaguar:F=>F("koridor"),
 dHut:F=>F("yerli"),
 dHotel:F=>F("otel"),dMarina:F=>F("otel"),
 dTurtles:F=>F("caretta"),
 dMangrove:F=>F("mangrov"),dPonds:F=>F("mangrovkes"),dReeds:F=>F("dogalkiyi"),dWall:F=>F("betonset"),
 dSinks:F=>F("kuyu"),dGreen:F=>(F("sayac")||F("damla"))&&!F("kuyu"),
 dOffshore:F=>F("ruzgar"),dBattery:F=>F("batarya"),dBuoy:F=>F("dalga"),
 dMine:F=>F("madencilik"),
 dTrain:F=>F("tren"),dCars:F=>F("otoyol"),
 dPlane:F=>F("aerosol"),
 dTower:F=>F("uyari"),
 dCastle:F=>F("denizkiyi"),
 dHouses:F=>!F("tasindi")&&!F("ev_afet"),dRuins:F=>!F("tasindi")&&F("ev_afet"),dSunken:F=>F("tasindi"),
 dIsland:F=>!F("adared"),dIslandWall:F=>F("adafon")&&!F("adared"),dIslet:F=>F("adared"),
 dFish:F=>F("avyasak"),dPlastic:(F,s)=>!F("plastik")&&s.ok<48,
 dBoats:F=>F("ev_goc"),dShimmer:F=>F("ev_sicak"),dDolphin:(F,s)=>s.ok>=55,
};
// İz ilk göründüğünde sahnenin üstünde çıkan not (önizlemede "Seçersen: …")
const CAP={
 komur:"Kömür santralleri 20 yıl daha yanacak",komurkapat:"Kömür santrali kapandı, müze oluyor",afrikakomur:"Kömür santralleri kuruldu, duman yükseliyor",
 afrikagunes:"Güneş panelleri ve bataryalar ışık getirdi",gazfon:"Denize gaz platformu kuruldu",gazkapat:"Gaz platformu söküldü",
 ormanyol:"Ormanın ortasından otoyol geçti",koridor:"Koruma koridoru: jaguarlar geri döndü",yerli:"Orman, içinde yaşayanlara emanet",
 otel:"Kumsala dev otel ve marina kuruldu",caretta:"Kumsal korunuyor: carettalar yuva yapıyor",
 mangrov:"Mangrovlar kıyıyı koruyor",mangrovkes:"Mangrovlar kesildi, yerine karides havuzları",dogalkiyi:"Sulak alanlar dalgaları emiyor",betonset:"Kıyıya beton set çekildi",
 kuyu:"Sınırsız kuyular: ovada obruklar açıldı",sayac:"Kuyulara sayaç: ova yeşil kaldı",damla:"Damla sulama: tarlalar yeşil",
 ruzgar:"Açık denize rüzgâr türbinleri kuruldu",gunes:"Dağa güneş tarlası kuruldu",batarya:"Batarya parkı kuruldu",dalga:"Dalga santrali şamandıraları denizde",
 madencilik:"Derin deniz madeni: su bulanıyor",tren:"Kıyıdan hızlı tren geçiyor",otoyol:"Otoyollar arabayla doldu",
 aerosol:"Gökyüzüne aerosol püskürtülüyor",uyari:"Kıyıya erken uyarı kulesi kuruldu",tasindi:"Kıyı mahallesi taşındı, eski evler su altında",
 adafon:"Ada, uyum fonuyla korunuyor",adared:"Ada sulara gömülüyor",avyasak:"Balıklar geri döndü",plastik:"Denizde plastik azalıyor",
 ev_sicak:"48 derecelik sıcak dalgası",ev_afet:"Büyük afet: kıyıdaki evler yıkıldı",ev_amazon:"Ormanın bir kısmı kurudu",denizkiyi:"Deniz’le kumsalda kumdan kale",ev_goc:"Göç dalgası: denizde tekneler",
};
function buildWorld(){
 const g=(id,body)=>`<g id="${id}" class="dc">${body}</g>`;
 // Orman: soldaki yamaçta; 4. ve 5. ağaç otoyolun geçeceği yerde
 const trees=[];for(let i=0;i<10;i++){const x=10+i*11, y=104+((i*13)%5)-2;
  trees.push(`<g class="tree${i===4||i===5?" road":""}"><rect x="${x-1}" y="${y}" width="2" height="5" fill="#3A2A20"/><path class="sway" style="animation-delay:${-i*.7}s" d="M${x} ${y-14} L${x+6} ${y+1} L${x-6} ${y+1}Z" fill="${i%3?'#2F7D4F':'#3E9460'}"/></g>`);}
 const B=[[152,14,30],[168,18,44],[188,12,26],[202,20,52],[224,12,34],[238,9,24]],blds=[];
 B.forEach(([x,w,h])=>{let win="";for(let yy=112-h+5;yy<108;yy+=7)for(let xx=x+3;xx<x+w-3;xx+=5)win+=`<rect x="${xx}" y="${yy}" width="2.4" height="3" fill="#FFD98A"/>`;
  blds.push(`<g class="w-t bld"><rect x="${x}" y="${112-h}" width="${w}" height="${h}" fill="#1E3F4C"/><g class="w-t win">${win}</g></g>`);});
 // İnsan: ayakları y=0'da; walk = kumsalda gidip gelir, chat = karşısındakiyle konuşur
 const person=(c,hair,cls)=>`<g class="${cls}"><g class="leg l"><path d="M-.6 -3 v3" stroke="#2B3A40" stroke-width="1" stroke-linecap="round"/></g><g class="leg r"><path d="M.6 -3 v3" stroke="#2B3A40" stroke-width="1" stroke-linecap="round"/></g><rect x="-1.7" y="-7.6" width="3.4" height="4.8" rx="1.3" fill="${c}"/><circle cx="0" cy="-9.3" r="1.7" fill="#C98E64"/><path d="M-1.7 -9.6 q1.7 -2.2 3.4 0" fill="${hair}"/></g>`;
 // Konuşma balonu: biri üç nokta, öbürü dünyanın hâline göre simge (ticon); sırayla açılıp kapanır
 const bubble=(x,cls,d,inner)=>`<g class="${cls}" style="animation-delay:${d}s"><g transform="translate(${x} 102.5)"><rect x="-6.5" y="-5.6" width="13" height="7.4" rx="2.8" fill="#FFFFFF"/><path d="M-1.2 1.6 l1.2 2.2 l1.2 -2.2z" fill="#FFFFFF"/>${inner}</g></g>`;
 const dots=`<circle cx="-2.6" cy="-1.9" r=".75" fill="#22474D"/><circle cx="0" cy="-1.9" r=".75" fill="#22474D"/><circle cx="2.6" cy="-1.9" r=".75" fill="#22474D"/>`;
 const chatPair=(x,c1,c2,d)=>`<g class="w-t ppl"><g transform="translate(${x} 118)">${person(c1,"#2B1B12","chat")}</g></g>`+
  `<g class="w-t ppl"><g transform="translate(${x+7} 118) scale(-1 1)">${person(c2,"#5A3825","chat")}</g>${bubble(x,"bubA",-d,dots)}${bubble(x+7,"bubB",-d,'<g class="ticon"></g>')}</g>`;
 const walker=(x,d,c,dur)=>`<g class="w-t ppl"><g transform="translate(${x} 118)"><g class="walk" style="--d:${d}px;animation-duration:${dur}s">${person(c,"#2B1B12","")}</g></g></g>`;
 // ---- Canlılar: hepsi yan profil, ayakları/merkezi (0,0) ----
 // Uçan martı: gövde, baş, gaga; kanatlar omuzdan menteşeli, uçları siyah. cls: "flap" çırpar, "glide" süzülür
 const wing=(m,cls,d)=>`<g class="w${m<0?"L":"R"} ${cls}${m<0?"L":"R"}" style="animation-delay:${d}s"><path d="M${.4*m} -.3 Q${3*m} -2.9 ${5.4*m} -2.4 L${7.8*m} -3.7 Q${6.3*m} -1.2 ${4.6*m} -1 Q${2.4*m} -.6 ${.4*m} .5Z" fill="#EEF2F2" stroke="#7E8C92" stroke-width=".3"/><path d="M${5.4*m} -2.4 L${7.8*m} -3.7 L${6.5*m} -1.4Z" fill="#26343A"/></g>`;
 const gullFly=(cls,d=0)=>`${wing(-1,cls,d)}<ellipse cx="0" cy="0" rx="2.7" ry="1.35" fill="#FFFFFF" stroke="#A7B4B8" stroke-width=".25"/><path d="M-2.6 -.2 l-1.5 -.7 l.15 1.4z" fill="#26343A"/><circle cx="2.8" cy="-.55" r="1.1" fill="#FFFFFF"/><circle cx="3.15" cy="-.8" r=".22" fill="#1B2A30"/><path d="M3.8 -.65 l1.4 .3 l-1.4 .38z" fill="#F2B544"/>${wing(1,cls,d)}`;
 // Ayakta martı: beyaz gövde, gri sırt, siyah kuyruk ucu, sarı gaga ve kırmızı benek; baş gagalarken eğilir
 const gullStand=`<path d="M-.5 -1.7 l-.25 1.7 M.6 -1.7 l.1 1.7" stroke="#E8A46A" stroke-width=".5" stroke-linecap="round"/><path d="M-3.9 -3.2 Q-1.6 -5.7 1.6 -4.9 Q3.3 -4.4 3.2 -3 Q2.5 -1.5 0 -1.5 Q-2.9 -1.6 -3.9 -3.2Z" fill="#FFFFFF" stroke="#B5C0C3" stroke-width=".25"/><path d="M-4.1 -3.4 Q-1.2 -5.3 1.8 -4.4 Q.8 -2.9 -1.6 -2.7 Q-3.4 -2.8 -4.1 -3.4Z" fill="#9AA9AE"/><path d="M-4.1 -3.4 l-1.7 .45 l1.5 .55z" fill="#26343A"/><ellipse cx="2.2" cy="-4.7" rx="1" ry="1.1" fill="#FFFFFF"/><g class="ghead"><circle cx="2.8" cy="-5.7" r="1.3" fill="#FFFFFF" stroke="#B5C0C3" stroke-width=".2"/><circle cx="3.2" cy="-6" r=".24" fill="#1B2A30"/><path d="M4 -5.8 l1.8 .3 l-1.8 .48z" fill="#F2B544"/><circle cx="5.2" cy="-5.55" r=".2" fill="#E5654E"/></g>`;
 // Caretta: kubbe kabuk ve plakaları, açık renk alt kenar, iri baş, kürek gibi çalışan paletler
 const turtle=s=>`<g transform="scale(${s})"><path class="rflip" d="M-3.2 -1.2 Q-5.2 -.4 -6 .2 Q-4.2 .5 -2.8 -.3Z" fill="#9A6232"/><path d="M-4.4 -1 Q-4 -5.2 .4 -5.4 Q4.2 -5.2 4.6 -1.4Z" fill="#8A4E25"/><path d="M-2.2 -1.2 Q-2 -3.8 .2 -4.6 M2.2 -1.2 Q2.2 -3.6 .6 -4.8 M-3.6 -2.8 Q.4 -3.7 4 -2.8" stroke="#5E3216" stroke-width=".4" fill="none"/><path d="M-4.6 -1 H4.8" stroke="#E2C08A" stroke-width=".8" stroke-linecap="round"/><path d="M4.2 -2.6 Q6.8 -3.7 7.8 -2.2 Q7.6 -.9 5.4 -.9 Q4.4 -1.1 4.2 -2.6Z" fill="#B5793E"/><circle cx="6.6" cy="-2.5" r=".3" fill="#1B1208"/><path class="fflip" d="M2.4 -1.2 Q5 -.4 6 .4 Q3.6 .6 1.8 -.4Z" fill="#9A6232"/></g>`;
 // Jaguar: uzun gövde, rozet benekleri, kulaklı baş, adım atan dört bacak, sallanan kuyruk
 const leg=(x,c,cls)=>`<g class="jleg ${cls}"><rect x="${x}" y="-3.7" width="1.4" height="3.7" rx=".6" fill="${c}"/></g>`;
 const jaguar=`<path class="jtail" d="M-6.2 -5.2 Q-9.6 -6.6 -10.6 -3.8 Q-11 -2 -9.7 -1.5" stroke="#D9A441" stroke-width="1.2" fill="none" stroke-linecap="round"/>${leg(-5.3,"#B8862F","b1")}${leg(3.4,"#B8862F","f1")}<path d="M-6.4 -5.4 Q-3.2 -7.5 2.2 -7.1 Q5.4 -6.9 6.4 -5.2 Q6.6 -3.4 5.2 -3 L-5.4 -3 Q-7 -3.6 -6.4 -5.4Z" fill="#D9A441"/><path d="M-4.8 -3.3 Q0 -2.5 4.8 -3.3" stroke="#F2DAA6" stroke-width=".9" fill="none"/>${[[-4.4,-5.2],[-2.4,-6.2],[-.2,-5.5],[1.8,-6.3],[3.8,-5.1],[-1.4,-4.2],[1,-4.2],[-3.4,-4]].map(([x,y])=>`<circle cx="${x}" cy="${y}" r=".55" fill="none" stroke="#4A2E14" stroke-width=".35"/><circle cx="${x+.1}" cy="${y}" r=".15" fill="#4A2E14"/>`).join("")}${leg(-4,"#D9A441","b2")}${leg(4.5,"#D9A441","f2")}<g class="jhead"><path d="M5.2 -6.8 Q6.4 -8.9 8.6 -8.3 Q10.2 -7.7 10 -6 Q9.6 -4.9 7.6 -4.9 Q5.8 -5.1 5.2 -6.8Z" fill="#D9A441"/><path d="M6.3 -8.3 l.5 -1.5 l1.1 1.3z" fill="#B8862F"/><circle cx="8.7" cy="-7.2" r=".32" fill="#1B1208"/><circle cx="10" cy="-6.2" r=".36" fill="#6B3A2A"/><path d="M8.4 -5.4 q.8 .45 1.4 0" stroke="#6B3A2A" stroke-width=".25" fill="none"/></g>`;
 const people=[chatPair(153,"#E5654E","#3CC8B4",0),walker(14,34,"#F2B544",15),walker(196,42,"#9B7FD1",18),chatPair(330,"#F4A261","#EAF2EF",3)];
 const blade=(x,y,r)=>`<g class="blade" style="transform-origin:${x}px ${y}px;transform-box:view-box"><path d="M${x} ${y} L${x+.8} ${y-r} L${x-.8} ${y-r}Z M${x} ${y} L${x+r*.87} ${y+r*.5} L${x+r*.8} ${y+r*.6}Z M${x} ${y} L${x-r*.87} ${y+r*.5} L${x-r*.8} ${y+r*.6}Z" fill="#EAF2EF"/></g>`;
 const turb=[[40,72],[110,54],[190,62]].map(([x,y])=>`<g><rect x="${x-.7}" y="${y-18}" width="1.4" height="18" fill="#EAF2EF"/>${blade(x,y-18,11)}</g>`).join("");
 // Güneş tarlası: tarlaların üstündeki yamaçta; panel sayısı temiz enerji payıyla da artar
 const solar=[[118,74],[127,74],[122,79],[131,79],[126,84],[135,84],[130,89],[139,89]].map(([x,y])=>`<path class="dc sol" d="M${x} ${y} l7 0 l-2 -3 l-7 0Z" fill="#2E5AAC" stroke="#9CC3F0" stroke-width=".5"/>`).join("");
 const puff=(x,y,c,r,n)=>[0,1,2].slice(0,n).map(i=>`<circle class="smoke" cx="${x}" cy="${y}" r="${r}" fill="${c}" style="animation-delay:${i*1.3}s"/>`).join("");
 document.getElementById("world").innerHTML=`
 <defs><linearGradient id="sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#2E7391"/><stop offset=".6" stop-color="#9ED5D4"/><stop offset="1" stop-color="#F6D9A8"/></linearGradient>
 <linearGradient id="smog" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#5E4630"/><stop offset="1" stop-color="#D08A48"/></linearGradient>
 <clipPath id="roadClip"><rect x="0" y="100" width="151" height="14"/></clipPath><linearGradient id="spray" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#FFFFFF" stop-opacity="0"/><stop offset=".7" stop-color="#FFFFFF" stop-opacity=".5"/><stop offset="1" stop-color="#FFFFFF" stop-opacity=".85"/></linearGradient>
 <linearGradient id="seaG" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#2AA6A6"/><stop offset="1" stop-color="#145E73"/></linearGradient></defs>
 <rect width="360" height="150" fill="url(#sky)"/>
 <rect id="wHeat" class="w-t" width="360" height="150" fill="#E8742C" opacity="0"/>
 <rect id="wHaze" class="w-t" width="360" height="112" fill="#F3F0E8" opacity="0"/>
 <rect id="wSmog" class="w-t" width="360" height="150" fill="url(#smog)" opacity="0"/>
 <circle id="wSun" class="w-t" cx="300" cy="40" r="14" fill="#FFD27A"/>
 <g id="wBirds" class="w-t"><g class="flock">${[[0,0,0],[11,-5,.2],[21,2,.35],[31,-3,.1]].map(([x,y,d])=>`<g transform="translate(${x} ${y})"><g class="bob" style="animation-delay:${-d*6}s">${gullFly("flap",-d)}</g></g>`).join("")}</g>
</g>
 ${[[0,28,"-18s"],[1,36,"-52s"]].map(([i,y,d])=>`<g class="cloud" style="animation-delay:${d};animation-duration:${80+i*25}s"><g transform="translate(0 ${y})"><ellipse cx="0" cy="0" rx="10" ry="3.2" fill="#FFFFFF" opacity=".5"/><ellipse cx="4" cy="-2.2" rx="6" ry="3" fill="#FFFFFF" opacity=".5"/><ellipse cx="-4" cy="-1.2" rx="4.5" ry="2.4" fill="#FFFFFF" opacity=".45"/></g></g>`).join("")}
 ${g("dPlane",`<path d="M112 47 Q150 41 188 43 L188 46 Q150 49 112 55Z" fill="url(#spray)"/>${[[124,49,1.1],[132,52,.9],[140,46,1],[148,50,.8],[156,47,.9],[164,49.5,.7],[171,45.5,.8],[178,47.5,.6]].map(([x,y,r])=>`<circle cx="${x}" cy="${y}" r="${r}" fill="#FFFFFF" opacity=".55"/>`).join("")}
  <g class="fly"><path d="M187 44.6 L203 43.4 Q207 43.6 207 44.6 Q207 45.6 203 45.8 L187 45.6Z" fill="#F4F7F6" stroke="#9AA9A6" stroke-width=".35"/><path d="M196 44.4 L191 38.6 L193.4 38.6 L199.6 44.4Z M196 45.4 L191.6 50 L194 50 L199.6 45.4Z" fill="#DCE4E2" stroke="#9AA9A6" stroke-width=".3"/><path d="M188 44.4 L186 40.6 L187.8 40.6 L190.6 44.2Z" fill="#DCE4E2" stroke="#9AA9A6" stroke-width=".3"/><circle cx="187.4" cy="45.2" r=".9" fill="#FFFFFF"/></g>`)}
 <path d="M0 96 L40 72 L76 84 L110 54 L150 80 L190 62 L232 86 L270 60 L312 82 L360 68 L360 112 L0 112Z" fill="#3D6B6A"/>
 <g id="wTurb" class="w-t">${turb}</g>
 <g id="wSolar">${solar}</g>
 <path d="M0 104 Q60 92 120 100 T240 98 T360 100 V114 H0Z" fill="#2F5D57"/>
 ${g("dRoad",`<path d="M55 95 L62 95 L67 112 L50 112Z" fill="#8B6A45"/><path d="M58.5 96 L58.5 112" stroke="#E9D9A6" stroke-width=".6" stroke-dasharray="2 2"/>`)}
 <g id="wTrees">${trees.join("")}</g>
 ${g("dJaguar",`<path d="M6 108 Q60 104 110 108" stroke="#5FBF73" stroke-width="1.4" fill="none" opacity=".5"/><g class="prowl"><g transform="translate(24 108.4) scale(.95)">${jaguar}</g></g>`)}
 ${g("dHut",`<rect x="20" y="104.5" width="7" height="4.5" fill="#8B5E3C"/><path d="M19 105 L23.5 100.5 L28 105Z" fill="#C9A15A"/>`)}
 <g id="wFields"><path d="M114 109 L118 99 L131 99 L128 109Z" fill="#B9A15A"/><path d="M130 109 L133 99 L148 99 L146 109Z" fill="#A7B35C"/>
  <path d="M117 101.5h13M116 104h13M115 106.5h13M132 101.5h15M131.5 104h15M131 106.5h15" stroke="#00000022" stroke-width=".6"/></g>
 ${g("dGreen",`<path d="M114 109 L118 99 L131 99 L128 109Z M130 109 L133 99 L148 99 L146 109Z" fill="#6DAA4F"/><path d="M117 101.5h13M116 104h13M115 106.5h13M132 101.5h15M131.5 104h15M131 106.5h15" stroke="#BFEDE6" stroke-width=".5" stroke-dasharray="1 1.5"/>`)}
 ${g("dSinks",`<path d="M114 109 L118 99 L131 99 L128 109Z M130 109 L133 99 L148 99 L146 109Z" fill="#CDB46A"/><ellipse cx="123" cy="105" rx="3.2" ry="1.7" fill="#2A1E14"/><ellipse cx="140" cy="102" rx="2.6" ry="1.3" fill="#2A1E14"/><ellipse cx="135" cy="107" rx="1.8" ry=".9" fill="#2A1E14"/><path d="M126 105 l3 1 M120 104.5 l-2 -1 M142.6 102 l2 .8" stroke="#2A1E14" stroke-width=".5"/>`)}
 ${g("dTower",`<rect x="149.3" y="93" width="1.4" height="20" fill="#C9D6D3"/><rect x="147.6" y="91" width="4.8" height="3" rx=".6" fill="#EAF2EF"/><circle class="blink" cx="150" cy="90" r="1.4" fill="#E5654E"/><path d="M153.5 90 q2 1.5 0 3 M155.5 89 q3 2.5 0 5" stroke="#E5654E" stroke-width=".5" fill="none"/>`)}
 ${g("dPlant",`<rect x="254" y="74" width="5" height="21" fill="#8A8A8A"/><rect x="266" y="78" width="5" height="17" fill="#8A8A8A"/><rect x="254" y="78" width="5" height="1.6" fill="#C8452F"/><rect x="266" y="82" width="5" height="1.6" fill="#C8452F"/><rect x="250" y="94" width="28" height="18" fill="#6B5A4E"/><rect x="253" y="98" width="5" height="4" fill="#3A302A"/><rect x="262" y="98" width="5" height="4" fill="#3A302A"/><rect x="271" y="98" width="4" height="4" fill="#3A302A"/>`)}
 ${g("dSmoke",`${puff(256.5,72,"#7A7A7A",4,3)}${puff(268.5,76,"#7A7A7A",4,3)}`)}
 ${g("dSmokeHeavy",`${puff(256.5,70,"#3A3A3A",6,2)}${puff(268.5,74,"#3A3A3A",6,2)}`)}
 ${g("dMuseum",`<rect x="256.2" y="64" width=".7" height="10" fill="#EAF2EF"/><path d="M256.9 64.2 h6 l-1.6 1.8 l1.6 1.8 h-6z" fill="#3CC8B4"/><rect x="250" y="94" width="28" height="3" fill="#3CC8B4"/>`)}
 <g id="wBld">${blds.join("")}</g>
 ${g("dShimmer",`${[160,190,220].map((x,i)=>`<path class="heat" style="animation-delay:${i*.5}s" d="M${x} 86 q3 -3 0 -6 t0 -6 t0 -6" stroke="#FFD2A0" stroke-width="1.2" fill="none" opacity=".7"/>`).join("")}`)}
 ${g("dBattery",`${[332,341,350].map(x=>`<rect x="${x}" y="103" width="7" height="9" rx="1" fill="#3C6E71"/><path d="M${x+4} 104.5 l-2 3.2 h1.6 l-.8 2.6 l2.4 -3.6 h-1.6z" fill="#F2B544"/>`).join("")}`)}
 <rect x="0" y="112" width="360" height="8" fill="#D9C08E"/>
 ${g("dMangrove",`${[[5,111],[13,110],[21,111.4],[29,110.2],[37,111.2],[45,110.6]].map(([x,y])=>`<path d="M${x-2.4} ${y+9} q2.4 -6 2.4 -7 M${x+2.4} ${y+9} q-2.4 -6 -2.4 -7 M${x} ${y+9} v-7" stroke="#4A3626" stroke-width=".7" fill="none"/><circle cx="${x}" cy="${y}" r="3.6" fill="#2E6B3F"/><circle cx="${x+2}" cy="${y-1.8}" r="2.4" fill="#3E8A50"/>`).join("")}`)}
 ${g("dReeds",`<path d="${Array.from({length:16},(_,i)=>`M${3+i*3} 119 q${i%2?1:-1} -4 ${i%2?.5:-.5} -8`).join(" ")}" stroke="#9DB46A" stroke-width=".9" fill="none"/>`)}
 ${g("dPonds",`${[2,17,32].map(x=>`<rect x="${x}" y="111" width="13" height="7" fill="#7FC3C0" stroke="#9A9A8A" stroke-width="1"/>`).join("")}`)}
 <g id="wSea" class="w-t"><rect x="0" y="119" width="360" height="60" fill="url(#seaG)"/>
  <g class="sail"><g transform="translate(0 131)"><path d="M-5 0 h10 l-2 2.4 h-6z" fill="#EAF2EF"/><path d="M0 0 v-9 l5 8.2z" fill="#F6EEDC"/><path d="M-.4 -1 v-7 l-3.4 7z" fill="#E5654E"/></g></g>
  ${g("dDolphin",`${[[221,146.2],[257,146.2]].map(([x,y])=>`<g class="splash"><g transform="translate(${x} ${y})"><ellipse class="rip" rx="4.2" ry="1.1" fill="none" stroke="#DDF3EF" stroke-width=".5"/><ellipse class="rip2" rx="4.2" ry="1.1" fill="none" stroke="#DDF3EF" stroke-width=".4"/>${[[-1.8,-3.4],[0,-4.6],[1.8,-3.2],[-3,-2],[3,-2.2]].map(([dx,dy])=>`<circle class="drop" style="--dx:${dx}px;--dy:${dy}px" r=".45" fill="#EAF2EF"/>`).join("")}</g></g>`).join("")}<g class="dolph"><path d="M-6.6 -.1 L-9.6 -2.4 Q-9.1 -.6 -8.3 0 Q-9.1 .8 -9.6 2.2Z" fill="#4F7383"/><path d="M-7 0 Q-4 -3.5 2 -3.3 Q5.4 -3.1 6.6 -1.5 L8.8 -1.1 Q9 -.6 8.5 -.35 L6.4 -.2 Q4 1.4 -1 1.25 Q-5 1.05 -7 0Z" fill="#5F8494"/><path d="M-5 .35 Q0 1.6 6.1 -.3 Q3 1 -1 1.05 Q-4 .95 -5 .35Z" fill="#CFDDE1"/><path d="M-.8 -3.25 Q.3 -5.8 2.1 -5.5 Q1 -4.5 1.3 -3.2Z" fill="#4F7383"/><path d="M1.6 .35 Q.8 2.3 -.7 2.7 Q.3 1.3 .5 .35Z" fill="#4F7383"/><circle cx="5" cy="-1.9" r=".32" fill="#10202A"/><path d="M8.5 -.75 Q6.8 -.55 5.6 -.85" stroke="#3E5C68" stroke-width=".25" fill="none"/></g>`)}
  <path class="wave" d="M0 120 ${"q6 -2 12 0 ".repeat(1)}${"t12 0 ".repeat(31)}" stroke="#BFEDE6" stroke-width="1.2" fill="none" opacity=".8"/>
  ${g("dPlastic",`${[[64,124,"#E85D75"],[96,138,"#F2B544"],[134,127,"#EAF2EF"],[178,144,"#E85D75"],[214,123,"#3CC8B4"],[246,139,"#F2B544"],[288,131,"#EAF2EF"],[318,145,"#E85D75"]].map(([x,y,c])=>`<rect x="${x}" y="${y}" width="2.6" height="1.4" rx=".5" fill="${c}" transform="rotate(${x%40-20} ${x} ${y})"/>`).join("")}`)}
  ${g("dSunken",`${[198,208,218,228].map(x=>`<path d="M${x-1} 122 L${x+4} 118.5 L${x+9} 122Z" fill="#9C6B55" opacity=".85"/>`).join("")}<path d="M195 123 h44" stroke="#BFEDE6" stroke-width=".6" opacity=".7"/>`)}
  ${g("dIsland",`<ellipse cx="167" cy="141" rx="16" ry="3.6" fill="#E3CF9B"/><path d="M155 141 q12 -6 24 0z" fill="#5E9A55"/><path d="M168 140 q1 -6 -1 -10" stroke="#7A5532" stroke-width="1.1" fill="none"/><path d="M167 130 q-5 -1 -7 2 M167 130 q4 -2 7 1 M167 130 q-2 -4 -6 -4 M167 130 q3 -4 6 -3" stroke="#3E9460" stroke-width="1.1" fill="none"/>`)}
  ${g("dIslandWall",`<path d="M149 141 q18 9 36 0" stroke="#B5BABF" stroke-width="1.4" fill="none"/><rect x="160" y="137" width="4" height="3" fill="#EDE6D6"/><rect x="172" y="137.4" width="4" height="3" fill="#EDE6D6"/>`)}
  ${g("dIslet",`<ellipse cx="167" cy="142.5" rx="5" ry="1.2" fill="#E3CF9B"/><path d="M168 142 q2 -5 5 -7" stroke="#7A5532" stroke-width="1" fill="none"/><path d="M173 135 q-3 -1 -5 1 M173 135 q2 1 2 4" stroke="#8C7A4A" stroke-width=".9" fill="none"/>`)}
  ${g("dFish",`<g class="jump"><path d="M188 127 q3 -6 7 -1 l2 -1.6 l-.6 2.6 l-1.4 -1 q-4 4 -7 1z" fill="#C9D6D3"/></g><g class="jump" style="animation-delay:.9s"><path d="M199 129 q3 -6 7 -1 l2 -1.6 l-.6 2.6 l-1.4 -1 q-4 4 -7 1z" fill="#C9D6D3"/></g>`)}
  ${g("dBoats",`${[108,122,136].map((x,i)=>`<path d="M${x} 131 h11 l-2 3 h-7z" fill="#C9693C"/>${[1,3,5,7,9].map(j=>`<circle cx="${x+j}" cy="130" r=".9" fill="${["#F2B544","#EAF2EF","#E5654E","#3CC8B4","#9B7FD1"][(i+j)%5]}"/>`).join("")}`).join("")}`)}
  ${g("dMarina",`${[288,300,312].map(x=>`<path d="M${x} 123 h9 l-1.5 2.4 h-6z" fill="#EAF2EF"/><path d="M${x+4.5} 123 v-7 l3 6z" fill="#EAF2EF" stroke="#C9D6D3" stroke-width=".3"/>`).join("")}`)}
  ${g("dMine",`<ellipse cx="266" cy="141" rx="18" ry="3.4" fill="#7A5A3A" opacity=".55"/><path d="M250 128 h30 l-3 5 h-24z" fill="#3A3F44"/><rect x="262" y="122" width="9" height="6" fill="#C9693C"/><path d="M256 128 l-4 -9 l10 4" stroke="#F2B544" stroke-width="1" fill="none"/><path d="M252 119 v14" stroke="#9A9A8A" stroke-width=".6" stroke-dasharray="1 1"/>`)}
  ${g("dBuoy",`<circle cx="114" cy="146" r="2.2" fill="#F2B544"/><circle cx="126" cy="143" r="2.2" fill="#F2B544"/><circle cx="138" cy="146" r="2.2" fill="#F2B544"/>`)}
  ${g("dOffshore",`${[[70,0],[90,3],[110,1]].map(([x,d])=>`<rect x="${x-1.5}" y="${142+d}" width="3" height="10" fill="#8E949A"/><rect x="${x-1.9}" y="${138.5+d}" width="3.8" height="3.8" fill="#F2B544"/><rect x="${x-.7}" y="${125+d}" width="1.4" height="14" fill="#EAF2EF"/><rect x="${x-1.2}" y="${124+d}" width="3" height="1.8" rx=".7" fill="#EAF2EF"/>${blade(x,125+d,7)}<path d="M${x-4} ${142.5+d} q4 -1.6 8 0" stroke="#BFEDE6" stroke-width=".6" fill="none"/>`).join("")}`)}
  ${g("dGas",`<path d="M333 128 v18 M349 128 v18 M333 136 l16 6 M349 136 l-16 6" stroke="#8A8A8A" stroke-width="1"/><rect x="330" y="125.5" width="22" height="3" fill="#6E6E6E"/><path d="M336 125.5 l3 -11 l3 11" stroke="#8A8A8A" stroke-width=".9" fill="none"/><path d="M350 125.5 l5 -6" stroke="#8A8A8A" stroke-width=".9"/><path class="flame" d="M355 119.5 q-2 -3 0 -6 q2 3 0 6z" fill="#F2A33A"/>`)}
  </g>
 ${g("dWall",`<rect x="0" y="114.5" width="360" height="6" fill="#8E949A"/><rect x="0" y="114.5" width="360" height="1.4" fill="#C9CED3"/><path d="${Array.from({length:30},(_,i)=>`M${i*12+6} 116 v4.5`).join(" ")} M0 118.2 H360" stroke="#6E7378" stroke-width=".45"/>${[30,96,170,250,342].map((x,i)=>`<path class="splash" style="animation-delay:${i*.7}s" d="M${x-3} 120 q1 -4 3 -5 q2 1 3 5" stroke="#EAF2EF" stroke-width=".9" fill="none"/>`).join("")}`)}
 ${g("dHotel",`<rect x="284" y="84" width="40" height="30" fill="#EDE6D6"/><rect x="284" y="84" width="40" height="3" fill="#C9693C"/>${Array.from({length:12},(_,i)=>`<rect x="${287+(i%6)*6}" y="${90+Math.floor(i/6)*8}" width="3.6" height="4" fill="#5FA8D3"/>`).join("")}<rect x="300" y="106" width="8" height="8" fill="#9C8B70"/><path d="M290 116 l3 -4 l3 4 M313 116 l3 -4 l3 4" stroke="#E5654E" stroke-width="1" fill="none"/>`)}
 ${g("dHouses",`<rect x="196" y="106" width="9" height="7" fill="#F4EFE6"/><path d="M195 106.4 L200.5 102.4 L206 106.4Z" fill="#C9693C"/><path d="M195 106.4 L200.5 102.4" stroke="#9E4E2C" stroke-width=".5"/><rect x="199.4" y="109.4" width="2.2" height="3.6" rx=".8" fill="#2F6E9E"/><rect x="202.6" y="107.6" width="1.9" height="1.9" fill="#FFD98A"/><path d="M202.3 107.6 v1.9 M204.8 107.6 v1.9" stroke="#2F6E9E" stroke-width=".5"/>${[[196.4,107.4],[197.6,108.4],[196.2,109.8],[197.4,111],[198.4,107.2]].map(([x,y])=>`<circle cx="${x}" cy="${y}" r=".8" fill="#D9478A"/>`).join("")}
  <rect x="207" y="102.5" width="8" height="10.5" fill="#EFE3CC"/><path d="M206.2 102.9 L211 99.6 L215.8 102.9Z" fill="#B85A30"/><rect x="208.4" y="104.2" width="1.8" height="1.8" fill="#FFD98A"/><rect x="211.8" y="104.2" width="1.8" height="1.8" fill="#FFD98A"/><path d="M206.6 107.2 h8.8" stroke="#8C6B4E" stroke-width=".55"/><path d="M207 107.2 v1.3 M209 107.2 v1.3 M211 107.2 v1.3 M213 107.2 v1.3 M215 107.2 v1.3" stroke="#8C6B4E" stroke-width=".3"/><rect x="209.8" y="109.6" width="2.2" height="3.4" rx=".8" fill="#2F6E9E"/>
  <rect x="217" y="107" width="8" height="6" fill="#F7F3EA"/><rect x="216.6" y="106.3" width="8.8" height=".9" fill="#D9CFBF"/><path d="M217 104.6 h8 M218 104.6 v1.7 M221 104.6 v1.7 M224 104.6 v1.7" stroke="#8C6B4E" stroke-width=".4"/><path d="M217.4 104.4 q3.6 -1.4 7.4 0" stroke="#5E9A55" stroke-width=".9" fill="none"/><rect x="218.4" y="108.4" width="2" height="2" fill="#FFD98A"/><rect x="221.6" y="109.4" width="2" height="3.6" rx=".7" fill="#3CA0A0"/><rect x="224.6" y="111.4" width="1.4" height="1.6" fill="#B85A30"/><circle cx="225.3" cy="110.6" r="1" fill="#5E9A55"/>
  <path d="M226.6 113 v-4.4" stroke="#6B5235" stroke-width=".7"/><circle cx="226.6" cy="107.6" r="1.8" fill="#7E9A5A"/>
  <rect x="228.5" y="105.5" width="10" height="7.5" fill="#F4EFE6"/><path d="M227.7 105.9 L233.5 101.6 L239.3 105.9Z" fill="#C9693C"/><rect x="235.4" y="101.6" width="1.4" height="2.8" fill="#B85A30"/><rect x="230" y="107.4" width="2" height="2" fill="#FFD98A"/><rect x="235" y="107.4" width="2" height="2" fill="#FFD98A"/><rect x="232.6" y="109.8" width="2" height="3.2" rx=".7" fill="#2F6E9E"/>`)}
 ${g("dRuins",`${[198,208,218,228].map((x,i)=>`<path d="M${x} 113 v-${3+i%2*2} l2 1 l2 -2 l2 2 l2 -1 v${3+i%2*2}z" fill="#BDB4A2"/><path d="M${x-1} ${108+i%2} l6 -2.5 l3 2" stroke="#6E4B3A" stroke-width="1" fill="none"/>`).join("")}<circle cx="205" cy="113.4" r=".9" fill="#8A7F6E"/><circle cx="224" cy="113" r=".8" fill="#8A7F6E"/>`)}
 ${g("dTurtles",`${[[82,117.6,0],[102,117.4,-5]].map(([x,y,d])=>`<path d="M${x-14} ${y-.3} h10" stroke="#B49A6A" stroke-width=".6" stroke-dasharray="1 .9"/><g transform="translate(${x} ${y})"><g class="tcrawl" style="animation-delay:${d}s">${turtle(1)}</g></g>`).join("")}${[[116,116.4,0],[121,117,-1.3],[126,116.2,-2.6]].map(([x,y,d])=>`<g transform="translate(${x} ${y})"><g class="hatch" style="animation-delay:${d}s">${turtle(.34)}</g></g>`).join("")}`)}
 <g id="wPpl">${people.join("")}</g>
 ${g("dCastle",`<path d="M48 118 v-3.4 h1.2 v1 h1.2 v-1 h1.2 v1 h1.2 v-1 h1.2 v3.4z" fill="#E3C98F"/><rect x="50.4" y="112.2" width="2" height="2.4" fill="#E3C98F"/><path d="M51.4 112.2 v-2.2 l1.6 .7 l-1.6 .7" stroke="#8C7A4A" stroke-width=".3" fill="#EF6461"/><g transform="translate(57 118)">${person("#7FD1C7","#D0D0D0","chat")}</g>`)}
 <g id="wDeniz" class="w-t" style="opacity:0"><g id="wDenizS" transform="translate(64 118)">${person("#F2A65A","#3B2416","chat")}<g id="wKite"><path d="M1.6 -6.4 L13 -27" stroke="#EAF2EF" stroke-width=".3"/><g class="kite"><path d="M13 -31 l3 4 l-3 4 l-3 -4z" fill="#F2A65A"/><path d="M13 -31 v8 M10 -27 h6" stroke="#B8473A" stroke-width=".3"/><path d="M13 -23 q-1.4 2 .6 3.6 q-2 1.2 0 3" stroke="#EF6461" stroke-width=".45" fill="none"/></g></g></g></g>
 <g id="wGull" class="w-t"><g class="g1"><g transform="scale(-1 1)"><g class="g1glide">${gullFly("glide")}</g><g class="g1stand"><g class="peck">${gullStand}</g></g><g class="g1flap">${gullFly("flap")}</g></g></g></g>
 ${g("dTrain",`<path d="M0 110 H151" stroke="#6E5F4E" stroke-width=".9"/><g class="ride"><rect x="0" y="105.8" width="10" height="3.6" rx="1.6" fill="#EAF2EF"/><rect x="11" y="105.8" width="9" height="3.6" rx=".8" fill="#EAF2EF"/><rect x="21" y="105.8" width="9" height="3.6" rx=".8" fill="#EAF2EF"/><path d="M1 107.6 H29" stroke="#3CC8B4" stroke-width=".8"/></g>`)}
 ${g("dCars",`<rect x="0" y="108" width="151" height="3.6" fill="#55595C"/><path d="M0 109.8 H151" stroke="#E9E4D4" stroke-width=".35" stroke-dasharray="2 2"/><g clip-path="url(#roadClip)"><g class="traffic">${Array.from({length:11},(_,i)=>{const x=-16+i*16,c=["#E5654E","#F2B544","#EAF2EF","#5FA8D3","#9B7FD1"][i%5];return `<g transform="translate(${x} 110.9)"><rect x="0" y="-1.9" width="6.6" height="1.7" rx=".6" fill="${c}"/><path d="M1.3 -1.9 l.9 -1.3 h2.2 l1 1.3z" fill="${c}"/><path d="M1.8 -1.95 l.6 -.9 h.8 v.9z M3.6 -1.95 v-.9 h.7 l.7 .9z" fill="#BFE3F2"/><circle cx="1.4" cy="-.2" r=".6" fill="#1E1E1E"/><circle cx="5.2" cy="-.2" r=".6" fill="#1E1E1E"/><circle cx="1.4" cy="-.2" r=".22" fill="#9A9A9A"/><circle cx="5.2" cy="-.2" r=".22" fill="#9A9A9A"/></g>`}).join("")}</g></g>`)}
 <rect id="wDim" class="w-t" width="360" height="150" fill="#06141A" opacity="0"/>`;
 // Yunus: tek bir parabol (yatayda sabit hız, dikeyde yerçekimi); gövde her an yörüngeye teğet döner.
 // Sıçramalar aynı zaman çizelgesinde: girişte döngünün başında, çıkışta sıçrama bitince
 const J=8000,jf=.2,N=32,x0=220,x1=258,yb=146,hj=15,kf=[];
 for(let i=0;i<=N;i++){const u=i/N,a=Math.atan2(-4*hj*(1-2*u),x1-x0)*180/Math.PI;
  kf.push({offset:jf*u,transform:`translate(${(x0+(x1-x0)*u).toFixed(2)}px,${(yb-4*hj*u*(1-u)).toFixed(2)}px) rotate(${a.toFixed(1)}deg)`,opacity:u<.1?u/.1:u>.9?(1-u)/.1:1});}
 kf.push({offset:1,transform:kf[N].transform,opacity:0});
 const dol=document.querySelector("#dDolphin .dolph"),loop={duration:J,iterations:Infinity};
 if(dol&&dol.animate){
  dol.animate(kf,loop);
  document.querySelectorAll("#dDolphin .splash").forEach((sp,j)=>{const t=j?jf:0;
   sp.querySelectorAll(".rip,.rip2").forEach((r,k)=>{const s0=t+k*.025;r.animate([{offset:0,opacity:0,transform:"scale(.2)"},{offset:s0,opacity:0,transform:"scale(.2)"},{offset:s0+.004,opacity:.9,transform:"scale(.3)",easing:"ease-out"},{offset:s0+.17,opacity:0,transform:`scale(${1.6+k*.35})`},{offset:1,opacity:0,transform:"scale(1.6)"}],loop);});
   sp.querySelectorAll(".drop").forEach(d=>{const dx=parseFloat(d.style.getPropertyValue("--dx")),dy=parseFloat(d.style.getPropertyValue("--dy"));
    d.animate([{offset:0,opacity:0,transform:"translate(0,0)"},{offset:t,opacity:0,transform:"translate(0,0)"},{offset:t+.003,opacity:1,transform:"translate(0,0)",easing:"ease-out"},{offset:t+.05,opacity:1,transform:`translate(${dx}px,${dy}px)`,easing:"ease-in"},{offset:t+.1,opacity:0,transform:`translate(${dx*1.7}px,1px)`},{offset:1,opacity:0,transform:"translate(0,0)"}],loop);});});
 }
 W.trees=[...document.querySelectorAll("#wTrees .tree")];
 W.blds=[...document.querySelectorAll("#wBld .bld")];
 W.wins=[...document.querySelectorAll("#wBld .win")];
 W.ppl=[...document.querySelectorAll("#wPpl .ppl")];
 W.turbs=[...document.querySelectorAll("#wTurb > g")];W.sol=[...document.querySelectorAll("#wSolar .sol")];
 ["wSmog","wHeat","wHaze","wSun","wBirds","wGull","wTurb","wSea","wDim","wDeniz","wDenizS","wKite"].concat(Object.keys(DEC)).forEach(id=>W[id]=document.getElementById(id));
}
// Bir izin üç hâli: açık (on), önizlemede belirecek (gin), önizlemede kaybolacak (gout); yeni açılan iz "pop" ile canlanır
function mark(el,now,pre,live){
 const was=el.classList.contains("on")||el.classList.contains("gout");
 el.classList.toggle("on",now&&pre);el.classList.toggle("gin",!now&&pre);el.classList.toggle("gout",now&&!pre);
 if(live&&now&&!was){el.classList.remove("pop");void el.getBoundingClientRect();el.classList.add("pop");}
}
// pf: önizlenen seçeneğin bırakacağı bayrak (cevabın üzerine gelince)
function updateWorld(pf){
 const {d,h,e,n}=S.m, has=f=>S.flags.includes(f), F=f=>has(f)||f===pf, w=Engine.world(S), s=S.s, share=Math.min(1,s.tk/s.tal), live=W.live&&!pf;
 // Genel dünya: ormanlar, fosil dumanı, 2075 ısınması ve deniz seviyesi tahmini
 const t=Math.round(s.or/100*W.trees.length*1.2);
 W.trees.forEach((g,i)=>{g.style.opacity=i<t?1:0;const road=g.classList.contains("road");
  g.classList.toggle("fell",road&&has("ormanyol"));g.classList.toggle("gout",road&&!has("ormanyol")&&pf==="ormanyol");
  g.classList.toggle("dry",i%2===0&&has("ev_amazon"));});
 W.wSmog.style.opacity=(Math.max(0,(s.fk-40)/80)*.7+Math.max(0,(45-d)/45)*.3).toFixed(2);
 W.wHeat.style.opacity=Math.max(0,Math.min(.45,(w.t-1.6)/1.2*.45)).toFixed(2);
 W.wHaze.style.opacity=has("aerosol")?.35:0;
 W.wSun.style.opacity=d<25?0.5:1;
 W.wBirds.style.opacity=W.wGull.style.opacity=s.or>55?1:0;
 // Deniz kumsalı kademeli örter: başlangıç tahmini (~+42 cm) kumu açık bırakır, +52 cm'de kıyı su altında
 W.wSea.style.transform=`translateY(${-(cap((w.sl-42)/10,0,1)*8).toFixed(1)}px)`;
 W.blds.forEach((g,i)=>g.style.transform=`scaleY(${(0.5+e/100*(0.9+i%3*0.25)).toFixed(2)})`);
 W.wins.forEach(g=>g.style.opacity=Math.min(1,n/70));
 W.wDim.style.opacity=n<35?((35-n)/35*0.55).toFixed(2):0;
 const p=Math.round(h/100*W.ppl.length);
 W.ppl.forEach((g,i)=>g.style.opacity=i<p?1:0);
 // Sohbet balonu: sıcakta güneş, karanlıkta sönük ampul, deniz iyiyse balık, değilse kalp
 const ic=w.t0>=2.4?`<circle cx="0" cy="-1.9" r="1.6" fill="#E8742C"/><path d="M0 -4.6v.9M0 .8v-.9M-2.7 -1.9h.9M2.7 -1.9h-.9M-1.9 -3.8l.6 .6M1.9 -3.8l-.6 .6M-1.9 0l.6 -.6M1.9 0l-.6 -.6" stroke="#E8742C" stroke-width=".55"/>`
  :n<35?`<circle cx="0" cy="-2.4" r="1.6" fill="#9AA5AD"/><rect x="-.8" y="-1" width="1.6" height="1.2" fill="#5A6570"/>`
  :s.ok>=55?`<path d="M-2.6 -1.9 q2 -2 4 0 q-2 2 -4 0z M1.4 -1.9 l1.6 -1.2 v2.4z" fill="#3C9AC9"/>`
  :`<path d="M0 -.2 C-3 -2.2 -2.4 -4.8 -.6 -4.2 Q0 -4 0 -3.4 Q0 -4 .6 -4.2 C2.4 -4.8 3 -2.2 0 -.2Z" fill="#E5654E"/>`;
 document.querySelectorAll("#world .ticon").forEach(t=>t.innerHTML=ic);
 W.turbs.forEach((g,i)=>g.style.opacity=share>=.3+i*.15?1:0);
 // Güneş tarlası: karar varsa tam, yoksa temiz enerji payı kadar
 const sun=f=>f("gunes")||f("afrikagunes");
 W.sol.forEach((el,i)=>{const base=share>=.25+i*.07;mark(el,base||sun(has),base||sun(F),live)});
 // Kararların izleri
 for(const [id,on] of Object.entries(DEC))if(W[id])mark(W[id],!!on(has,s),!!on(F,s),live);
 // Torun Deniz 2049'da doğar ve kumsalda büyür; çocukken uçurtma uçurur
 const age=S.year-2049;W.wDeniz.style.opacity=age>=2?1:0;
 W.wDenizS.setAttribute("transform",`translate(64 118) scale(${(age<3?.55:Math.min(1,.55+(age-3)*.035)).toFixed(2)})`);
 W.wKite.style.display=age>=4&&age<=16?"":"none";
 document.getElementById("wstat").textContent=`+${(Math.round(w.t0*10)/10).toString().replace(".",",")}°C${has("aerosol")?"*":""} · deniz +${w.sl} cm`;
 // Not: önizlemede "Seçersen: …"; kararla ya da olayla yeni beliren izde birkaç saniye
 if(pf){showCap(CAP[pf],true);return;}
 if(document.getElementById("wcap").classList.contains("pre"))showCap(null);
 const fresh=S.flags.filter(f=>CAP[f]&&!W.seen.has(f));fresh.forEach(f=>W.seen.add(f));
 if(fresh.length&&W.live)showCap(CAP[fresh[fresh.length-1]]);
 else if(age>=0&&!W.seen.has("@deniz")){W.seen.add("@deniz");if(W.live)showCap("Deniz doğdu");}
 W.live=true;
}
let capT=null;
function showCap(t,pre){
 const c=document.getElementById("wcap"),wd=c.parentElement;clearTimeout(capT);
 if(!t){c.hidden=true;c.classList.remove("pre");wd.classList.remove("capping");return;}
 c.textContent=(pre?"Seçersen: ":"")+t;c.classList.toggle("pre",!!pre);c.hidden=false;wd.classList.add("capping");
 if(!pre)capT=setTimeout(()=>showCap(null),3800);
}

/* ---------- Göstergeler ---------- */
const ICON={
 d:`<path d="M12 1.5 L19.5 12.5 H15.5 L20.5 19.5 H13.5 V23 H10.5 V19.5 H3.5 L8.5 12.5 H4.5 Z"/>`,
 h:`<circle cx="8" cy="6.5" r="3.6"/><circle cx="16.5" cy="7.5" r="3"/><path d="M1.5 22 Q1.5 12 8 12 Q14.5 12 14.5 22Z"/><path d="M15.5 22 Q15.5 13.5 17 13.2 Q22.5 13 22.5 22Z"/>`,
 e:`<ellipse cx="12" cy="5.5" rx="8" ry="3"/><path d="M4 5.5 V9.5 Q4 12.5 12 12.5 Q20 12.5 20 9.5 V5.5 Q20 8.5 12 8.5 Q4 8.5 4 5.5Z"/><path d="M4 12 V16 Q4 19 12 19 Q20 19 20 16 V12 Q20 15 12 15 Q4 15 4 12Z"/><path d="M4 18.5 V20 Q4 23 12 23 Q20 23 20 20 V18.5 Q20 21.5 12 21.5 Q4 21.5 4 18.5Z"/>`,
 n:`<path d="M14 1 L4 14 H11 L9.5 23 L20 9.5 H13 Z"/>`
};
// Dört denge: 0'a inerse ya da 100'e çıkarsa oyun biter; iki uçtaki kırmızımsı bölge tehlike alanı
function buildMeters(){
 $("meters").innerHTML=MK.map(k=>`<div class="meter" id="m_${k}"><svg class="ic" viewBox="0 0 24 24" aria-hidden="true">${ICON[k]}</svg>
  <span class="lbl">${MN[k]}<i class="pr" id="pr_${k}"></i></span><span class="bar" role="img" aria-label="${MN[k]}"><i id="b_${k}"></i></span><span class="dot" id="dot_${k}"></span></div>`).join("");
}
function renderMeters(prev){
 MK.forEach(k=>{
  const v=S.m[k],el=$("m_"+k);$("b_"+k).style.width=v+"%";
  el.classList.toggle("danger",v<=15||v>=85);
  // Arka plandaki sistemlerin yıllık itişi
  const d=S.last?S.last[k]:0,pr=$("pr_"+k);
  pr.textContent=d>=1.5?"▲▲":d>=.5?"▲":d<=-1.5?"▼▼":d<=-.5?"▼":"";pr.className="pr"+(d<0?" neg":"");
  pr.title=pr.textContent?`Arka plan etkisi: ${d>0?"+":""}${d.toFixed(1)} / yıl`:"";
  if(prev&&prev[k]!==v){const c=v>prev[k]?"up":"down";el.classList.remove("up","down");void el.offsetWidth;el.classList.add(c);setTimeout(()=>el.classList.remove(c),700);}
 });
}
// Önizleme: hangi dengenin ne kadar değişeceği (yönü söylenmez)
function showDots(o){MK.forEach(k=>{const v=o?Math.abs(o[k]||0):0;$("dot_"+k).className="dot"+(v>=12?" lg":v>0?" sm":"");});}

/* ---------- Ses ---------- */
let AC=null,muted=false;
function tone(f,dur,type="sine",vol=.05){if(muted)return;try{AC=AC||new (window.AudioContext||window.webkitAudioContext)();const o=AC.createOscillator(),g=AC.createGain();o.type=type;o.frequency.value=f;g.gain.value=vol;g.gain.exponentialRampToValueAtTime(.0001,AC.currentTime+dur);o.connect(g).connect(AC.destination);o.start();o.stop(AC.currentTime+dur);}catch(e){}}
const sfx={thud:()=>tone(140,.22,"square",.05),swipe:()=>tone(320,.12,"triangle",.04),pick:()=>tone(520,.16,"sine",.04),letter:()=>{tone(660,.5);setTimeout(()=>tone(880,.6),120)},end:()=>{tone(392,.7);setTimeout(()=>tone(523,.8),180);setTimeout(()=>tone(659,1),360)}};

/* ---------- Kayıt ---------- */
function loadEnds(){try{return JSON.parse(localStorage.getItem("gm_endings")||"[]")}catch(e){return[]}}
function saveEnd(id){try{const a=loadEnds();if(!a.includes(id)){a.push(id);localStorage.setItem("gm_endings",JSON.stringify(a))}}catch(e){}}

/* ---------- Oyun ---------- */
let S=null,busy=false,cur=null,demo=false;   // cur: açık dosyanın geldiği yer (kararın sonucu mu, bekleyen mi)
const $=id=>document.getElementById(id);
const fmt=v=>(Math.round(v*10)/10).toString().replace(".",",");
const GOOD=["mavi","yesil","sonsuz"];
// Sahnenin ortası tek seferde tek görünüm: masa, açık dosya ya da kapı bildirimi
function view(id){["deskView","cardView","doorView"].forEach(v=>$(v).hidden=v!==id);}

function newGame(mode,hitap){
 S=Engine.newState(mode,hitap);cur=null;document.body.classList.remove("epi");W.seen=new Set();W.pf=null;W.live=false;
 renderMeters();updateWorld();renderYear();$("lapsed").hidden=true;view(null);
 showLetter(Engine.introLetter(S),nextTurn,"2026 · Masanda bir mektup duruyor",2075);
}
function renderYear(){
 $("year").textContent=Math.min(S.year,2075);
 const l=2075-S.year;$("left").textContent=S.epi?"Deniz’in gözünden":l>0?`2075’e ${l} yıl`+(S.step===2?" · demo":""):"2075";
}
function setHint(t){$("hint").textContent=t==="desk"?"Bir dosya aç · 1 2 3 · R: dünya raporu":t==="card"?"Kararını ver · 1 2 ya da ← → · Noktalar değişecek dengeleri gösterir":"";}
// Yeni yıl: dosyalar masaya gelir; tek dosya (zorunlu kart, olay) beklemeden açılır
function nextTurn(){
 if(S.epi){Engine.epiDraw(S);cur=null;showCard(true);busy=false;return;}
 showLapsed(Engine.tide(S));updateWorld();
 if(S.offer.length===1){cur=S.offer[0];Engine.open(S,cur.id);showCard(true);}
 else showDesk();
 busy=false;
}
function showLapsed(list){
 const el=$("lapsed");el.hidden=!list.length;
 if(list.length)el.textContent=list.map(x=>`${CH[byId[x.id].c].n}: dosyanın vakti doldu.${x.x?` Karar senin yerine verildi: “${x.x}”.`:""}`).join(" ");
}
// İlk cümle, en fazla ~90 harf
function tease(t){const f=t.split(/(?<=[.?!])\s/)[0];return"“"+(f.length>90?f.slice(0,87).replace(/\s\S*$/,"")+"…":f)+"”"}
function showDesk(){
 view("deskView");$("deskView").classList.toggle("full",S.offer.length>2);
 $("dlead").innerHTML=`Masanda ${S.offer.length} dosya var.${S.busy?'<span class="busy">YOĞUN GÜN</span>':""}<small>Bugün yalnız birine vaktin var.</small>`;
 // Gelecekten not: ara sıra Deniz, masadaki dosyalardan biri hakkında 2075'ten bir şey söyler
 const N=S.note;$("fnote").hidden=!N;
 if(N)$("fnote").innerHTML=`<div class="fnote"><div><b>Gelecekten not · ${CH[byId[N.id].c].n} dosyası hakkında</b><p>${S.hitap},<br>${N.t}<span>Deniz</span></p></div></div>`;
 $("folders").innerHTML=S.offer.map((o,i)=>{
  const c=byId[o.id],ch=CH[c.c],tags=[];
  if(c.max)tags.push(`<i class="due">Son gün ${c.max}</i>`);
  if(o.from)tags.push(`<i>↩ ${o.from} kararının sonucu</i>`);else if(o.back)tags.push(`<i>Bekleyen dosya</i>`);
  if(N&&N.id===o.id)tags.push(`<i class="note">✉ Deniz’in notu</i>`);
  return `<button class="folder" data-tab="${ch.r}" style="--cbg:${ch.bg};--d:${i*110}ms"><span class="face" aria-hidden="true">${portrait(ch.p,c.old)}</span>`+
   `<span class="fm"><span class="fw">${ch.n}</span><span class="ft">${tease(Engine.fill(S,c.t))}</span>${tags.length?`<span class="ftags">${tags.join("")}</span>`:""}</span><span class="k">${i+1}</span></button>`;}).join("");
 [...$("folders").children].forEach((b,i)=>b.addEventListener("click",()=>pickFolder(i)));
 setHint("desk");
}
function pickFolder(i){
 if(busy||!S.offer||!S.offer[i])return;busy=true;sfx.pick();
 [...$("folders").children].forEach((b,j)=>b.classList.add(j===i?"pick":"go"));
 setTimeout(()=>{cur=S.offer[i];Engine.open(S,cur.id);updateWorld();showCard(true);busy=false;},430);
}
function showCard(anim){
 view("cardView");
 const c=byId[S.card],ch=CH[c.c],L=Engine.locks(S,c),sh=$("sheet");
 if(L.l&&L.r)L.r=null;   // iki yol birden kapanmaz; olursa en azından biri açık kalsın
 sh.className="sheet";$("photo").style.setProperty("--cbg",ch.bg);$("photo").innerHTML=portrait(ch.p,c.old);
 $("whoN").textContent=ch.n;$("whoR").textContent=ch.r;
 const tag=S.epi?"2075 · Deniz’in hayatından":c.ev?"Olay · bekleyemez":c.at?"Bekleyemez":cur&&cur.from?`${cur.from} kararının sonucu`:cur&&cur.back?"Bekleyen dosya":c.max?`Son gün ${c.max}`:"";
 $("stag").textContent=tag;$("stag").hidden=!tag;
 $("qt").textContent=Engine.fill(S,c.t);
 // Kapanan kapı kartta seçenek olarak görünmez: yalnızca açık kalan yol ve neden elinin bağlı olduğu
 ["l","r"].forEach(s=>{$(s==="l"?"btnL":"btnR").hidden=!!L[s];$(s==="l"?"btnLt":"btnRt").textContent=c[s].x;});
 $("kR").textContent=L.l?"1":"2";
 const k=L.l||L.r;$("bound").hidden=!k;
 if(k)$("bound").innerHTML=`<b>${S.epi?"Bu kapı kapalı":"Bu konuda elin bağlı"} · ${k.y}</b>${k.why}.`;
 showSide(null);setHint("card");
 if(anim){void sh.offsetWidth;sh.classList.add("in");}
}
function showSide(side){
 const o=side&&!S.epi&&S.card?byId[S.card][side]:null;
 showDots(o);
 const pf=o&&o.f&&CAP[o.f]&&!S.flags.includes(o.f)?o.f:null;
 if(pf!==W.pf){W.pf=pf;updateWorld(pf);}
}
// Karar verilir, dosya kapanıp arşive gider
function commit(side){
 if(busy||!S||!S.card||$("cardView").hidden||$(side==="l"?"btnL":"btnR").hidden)return;
 busy=true;sfx.swipe();showSide(null);
 const sh=$("sheet");sh.classList.remove("in");void sh.offsetWidth;sh.classList.add("out");
 setTimeout(()=>choose(side),380);
}
function choose(side){
 if(S.epi){Engine.epiApply(S,side)?setTimeout(showReflect,300):nextTurn();return;}
 const prev={...S.m},dead=Engine.apply(S,side);cur=null;
 renderMeters(prev);updateWorld();renderYear();$("lapsed").hidden=true;
 if(dead){setTimeout(()=>endGame(dead),650);return;}
 const go=()=>{
  if(S.year>=2075){setTimeout(startEpilogue,450);return;}
  const li=LETTER_YEARS.indexOf(S.year);
  // Her ara mektup Deniz'in farklı bir yaşından gelir (7, 9, … 19); damga yazıldığı yılı gösterir
  if(li>=0){setTimeout(()=>showLetter(Engine.midLetter(S),nextTurn,`${S.year} · Masana bir mektup bırakılmış`,2056+li*2),300);return;}
  nextTurn();
 };
 const doors=Engine.freshDoors(S);
 doors.length?setTimeout(()=>showDoors(doors,go),350):go();
}
// Kapı bildirimi: bu karar ileride bazı yolları kapatacak; seçenek o gün kartta görünmeyecek
function showDoors(list,then){
 view("doorView");busy=false;sfx.thud();setHint("");
 $("doorText").innerHTML=list.map(t=>`<p>${t}</p>`).join("");
 $("doorOk").onclick=()=>{$("doorView").hidden=true;busy=true;then();};
 $("doorOk").focus({preventScroll:true});
}
// 2075: görev biter, Konsey yeni başkanını seçer; oyuncu bir süre Deniz'in yerine geçer
function startEpilogue(){
 Engine.startEpi(S);document.body.classList.add("epi");renderYear();view(null);
 showLetter(Engine.epiLetter(S),nextTurn,"2075 · Deniz’den",2075);
}

/* Mektup gösterimi: daktilo efekti, dokununca tamamlanır */
let typer=null;
function typeInto(el,text,done){
 clearInterval(typer);el.textContent="";
 const reduce=matchMedia("(prefers-reduced-motion: reduce)").matches;
 if(reduce){el.textContent=text;done&&done();return;}
 let i=0;typer=setInterval(()=>{i+=demo?4:2;el.textContent=text.slice(0,i);if(i>=text.length){clearInterval(typer);typer=null;done&&done();}},18);
 el.onclick=()=>{if(typer){clearInterval(typer);typer=null;el.textContent=text;done&&done();}};
}
function overlay(id){const ov=$(id);ov.hidden=false;ov.classList.remove("in");void ov.offsetWidth;ov.classList.add("in");return ov;}
function showLetter(text,then,from,pm){
 busy=true;sfx.letter();overlay("letterScreen");
 $("lfrom").textContent=from;
 $("lpm").innerHTML=`ANTALYA<br>·<br>${pm||2075}`;
 typeInto($("ltext"),text);
 $("lnext").onclick=()=>{clearInterval(typer);$("letterScreen").hidden=true;then();};
 $("lnext").focus({preventScroll:true});
}

/* ---------- Final: Bu kadarını başardık · çemberin kapanışı ---------- */
function showReflect(){
 busy=true;view(null);
 const w=Engine.world(S),doors=S.doors,shut=doors.filter(d=>d.lock),open=doors.filter(d=>!d.lock);
 $("rfTitle").textContent=!doors.length||shut.length?"Bu kadarını başardık":"Bütün kapılar açık kaldı";
 $("rfKarne").innerHTML=[["Isınma",`+${fmt(w.t0)}°C`],["Deniz seviyesi",`+${w.sl} cm`],["Temiz enerji",`%${w.tem}`],["Açık kapı",`${open.length}/${doors.length}`]]
  .map(([a,b])=>`<span><b>${b}</b>${a}</span>`).join("");
 $("rfDoors").innerHTML=open.length?`<p class="dh">Deniz’in önünde açık kalanlar</p>`+open.map(d=>`<div class="door"><b>✓ ${d.x}</b></div>`).join(""):"";
 const lapsed=S.sunk.length;
 $("rfQ").textContent=shut.length||lapsed?"Peki, daha iyisi olabilir miydi?":"Daha iyisi olabilir miydi? Belki. Ama bu kadarı bile kolay değildi.";
 $("rfMiss").innerHTML=(shut.length?`<p class="dh">Olabilirdi</p>`+shut.map(d=>`<div class="door shut"><b>🔒 ${d.x}</b><span>${d.lock.y}: ${d.lock.why}</span></div>`).join(""):"")+
  (lapsed?`<div class="door shut"><b>${lapsed} dosyanın vakti doldu</b><span>Kararı senin yerine zaman verdi.</span></div>`:"");
 overlay("reflectScreen");
 $("rfNext").onclick=()=>{$("reflectScreen").hidden=true;showLoop(Engine.finalType(S));};
 $("rfNext").focus({preventScroll:true});
}
// Deniz, 2026'daki büyüğüne ilk mektubu yazar: oyun açılışındaki mektup budur. İyi sonlarda bir teşekkür mektubu olur
function drawLoopSky(){
 const stars=Array.from({length:24},(_,i)=>`<circle cx="${(i*47+13)%220}" cy="${(i*29)%46+4}" r="${i%3?.45:.8}" fill="#fff" opacity="${(.35+(i%4)*.15).toFixed(2)}"/>`).join("");
 $("loopsky").innerHTML=`<defs><linearGradient id="lsk" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#21404C"/><stop offset="1" stop-color="#D08A55"/></linearGradient></defs>
  <rect width="220" height="100" fill="url(#lsk)"/>${stars}<circle cx="168" cy="24" r="9" fill="#F7F1E3"/><circle cx="172" cy="21" r="8" fill="#21404C" opacity=".35"/>
  <path d="M0 62 L30 46 L58 57 L86 38 L118 55 L150 44 L182 59 L220 49 V70 H0Z" fill="#4A3340"/>
  <g fill="#F4C77A">${[[34,64],[46,62],[58,65],[72,63],[98,60],[110,63],[122,61],[134,64],[146,62]].map(([x,y])=>`<rect x="${x}" y="${y}" width="1.6" height="1.6"/>`).join("")}</g>
  <rect y="68" width="220" height="32" fill="#1E6E73"/><path d="M160 71 h16 M155 77 h26 M161 83 h14 M157 89 h22 M162 95 h12" stroke="#F7F1E3" stroke-width=".8" opacity=".45"/>
  <path d="M110 0 V100 M0 50 H220" stroke="#2A1B12" stroke-width="3"/><rect width="220" height="100" fill="none" stroke="#2A1B12" stroke-width="6"/>
  <g>${[[110,48],[96,40],[124,38],[104,28],[118,58],[90,56]].map(([x,y],i)=>`<circle class="spark" cx="${x}" cy="${y}" r="${1.4+i%2}" style="transform-box:fill-box;transform-origin:center;animation-delay:${i*.12}s"/>`).join("")}</g>`;
}
function rollYear(from,to,ms){
 const t0=performance.now(),el=$("lyear");
 const f=t=>{const u=Math.min(1,(t-t0)/ms),e=u<.5?2*u*u:1-Math.pow(-2*u+2,2)/2;el.textContent=Math.round(from+(to-from)*e);if(u<1)requestAnimationFrame(f);};
 requestAnimationFrame(f);
}
function showLoop(id){
 busy=true;drawLoopSky();sfx.letter();
 const good=GOOD.includes(id),text=Engine.loopLetter(S,id);
 $("lyear").textContent="2075";$("lpaper").className="lpaper";$("lpaper").hidden=false;
 $("lenv").hidden=true;$("lenv").className="lenv";$("lline").hidden=true;$("lgo").hidden=true;$("lgo").textContent="Mektubu gönder";
 overlay("loopScreen");
 typeInto($("ltext2"),text,()=>{$("lgo").hidden=false;$("lgo").focus({preventScroll:true});});
 $("lgo").onclick=()=>{
  $("lgo").hidden=true;clearInterval(typer);$("ltext2").textContent=text;
  $("lpaper").classList.add("fold");sfx.pick();
  setTimeout(()=>{$("lpaper").hidden=true;$("lenvTo").innerHTML=`${S.hitap}’ye<br>Antalya, 2026`;$("lenv").hidden=false;$("lenv").classList.add("show");},950);
  setTimeout(()=>{$("lenv").classList.add("fly");document.querySelectorAll("#loopsky .spark").forEach(s=>s.classList.add("go"));rollYear(2075,2026,1700);tone(988,.9,"sine",.03);},2500);
  setTimeout(()=>{
   $("lenv").hidden=true;const l=$("lline");l.hidden=false;l.classList.remove("in");void l.offsetWidth;l.classList.add("in");
   l.textContent=good?"2026, Antalya. Masanda bir mektup duruyor. Birinin sana teşekkür etmek için zamanın öbür ucundan yazdığını bilmiyorsun henüz."
    :"2026, Antalya. Masanda bir mektup duruyor. Açtığında her şey yeniden başlıyor: belki bu kez başka kapılar açık kalır.";
   $("lgo").textContent="Devam";$("lgo").hidden=false;$("lgo").focus({preventScroll:true});
   $("lgo").onclick=()=>{$("loopScreen").hidden=true;endGame(id);};
  },4400);
 };
}
function endGame(id){
 busy=true;sfx.end();saveEnd(id);view(null);
 const E=ENDINGS[id],{t,death}=Engine.endText(S,id),w=Engine.world(S),got=loadEnds();
 // Final oynandıysa Deniz'in kapıları, oynanmadıysa bu zaman çizgisinde kapanan kapılar
 const doors=S.doors.length?S.doors:[...new Map(S.hits.map(h=>[h.id+h.x,{x:h.x,lock:h}])).values()],shut=doors.filter(d=>d.lock);
 $("epm").className="postmark"+(death?" red":"");
 $("epm").innerHTML=death?`SON<br>·<br>${S.year}`:"ANTALYA<br>·<br>2075";
 $("efrom").textContent=death?`Zaman çizgisi ${S.year} yılında koptu`:"Görevin bitti · Deniz’den son mektup";
 $("ename").textContent=E.n;
 // Sonun altında bir sonraki oyun için ipucu; Kırılgan Umut neyin eksik kaldığını söyler
 const bal=MK.every(k=>S.m[k]>=30&&S.m[k]<=70),t0=fmt(w.t0);
 const hint=id==="kirilgan"?(bal?`İpucu: Dengeyi korudun ama 2075 ısınması +${t0}°C. Mavi Akdeniz için 2,2°C’nin altında kalmalı.`
  :"İpucu: Dört denge de 30–70 arasında kalır ve ısınma 2,2°C’nin altında olursa Mavi Akdeniz’e ulaşırsın."):E.h||"";
 $("ehint").textContent=hint;$("ehint").hidden=!hint;
 $("estats").innerHTML=`<span><b>${Math.min(S.year,2075)}</b>ulaşılan yıl</span>`+
  (S.doors.length?`<span><b>${shut.length}/${S.doors.length}</b>kapı kapalı</span>`:`<span><b>${shut.length}</b>kapanan kapı</span>`)+`<span><b>${got.length}/12</b>son keşfedildi</span>`;
 $("edoors").hidden=!doors.length;
 $("edoors").innerHTML=doors.length?`<p class="dh">${S.doors.length?"Deniz’e bıraktığın kapılar":"Bu zaman çizgisinde kapanan kapılar"}</p>`+doors.map(d=>d.lock
  ?`<div class="door shut"><b>🔒 ${d.x}</b><span>Kapandı · ${d.lock.y}: ${d.lock.why}</span></div>`
  :`<div class="door"><b>✓ ${d.x}</b><span>Açık kaldı</span></div>`).join(""):"";
 // Vakti dolan dosyalar: kimin dosyasıydı, zaman yerine neye karar verdi
 const sk=S.sunk||[];$("elapsed").hidden=!sk.length;
 $("elapsed").innerHTML=sk.length?`<p class="dh">Vakti dolan dosyalar</p>`+sk.map(x=>`<div class="door shut"><b>${CH[byId[x.id].c].n} · ${x.y}</b><span>${x.x?`Kendiliğinden oldu: “${x.x}”`:"Kimse cevap vermedi"}</span></div>`).join(""):"";
 const s=S.s,r=v=>String(Math.round(v));
 $("ekarne").innerHTML=`<p class="dh">${death?"Bu gidişle 2075":"2075 karnesi"}</p>`+[["Isınma",`+${t0}°C`],["Deniz seviyesi",`+${w.sl} cm`],
  ["Temiz enerji",`%${w.tem}`],["Ormanlar",r(s.or)],["Okyanuslar",r(s.ok)],["Uyum",r(s.uy)],["Güven",r(s.gv)]].map(([a,b])=>`<span><b>${b}</b>${a}</span>`).join("");
 $("egrid").innerHTML=END_ORDER.map(k=>`<div class="chip${got.includes(k)?" got":""}${k===id?" now":""}">${got.includes(k)?ENDINGS[k].n:"? ? ?"}</div>`).join("");
 $("esrc").innerHTML=SOURCES.map(s=>`<li>${s}</li>`).join("");
 overlay("endScreen");
 typeInto($("etext"),t);
 S.card=null;
}

/* ---------- Dünya raporu: arka plandaki sistemler, oyuncunun dilinde ---------- */
function advice(S){
 const s=S.s,share=s.tk/s.tal,gap=s.tk+s.fk-s.tal;
 if(s.uy<30)return"Afetlere hazırlık zayıf: her sel ve fırtına Fon’u eritiyor. Erken uyarı, mangrov ve kıyı kararları bunu azaltır.";
 if(s.gv<42)return"Güven azalıyor: Uluslar her yıl biraz geriliyor. Bedeli yoksullara yüklenen kararlardan kaçın, adaleti gözet.";
 if(gap>6)return"Enerji arzı talepten fazla: ucuzluk tüketimi şişiriyor. Temiz enerji eklerken eski santralleri de kapat.";
 if(gap<-3)return"Enerji yetmiyor: yaz zirvesinde kesinti riski var. Yeni temiz kapasite ve verimlilik kararları işe yarar.";
 if(s.or<50)return"Ormanlar küçülüyor ve Doğa her yıl biraz geriliyor. Orman koruma kararları yıllarca geri öder.";
 if(s.ok<45)return"Okyanuslar zorlanıyor. Av kotası, plastik antlaşması ve deniz koruma alanları yardımcı olur.";
 if(S.year>=2034&&share<.4)return"Temiz enerji yavaş büyüyor. 2075 ısınmasını en çok güneş, rüzgâr ve şebeke kararları belirler.";
 return"Dünya şimdilik dengede. Böyle devam: dosyaların arasında uzun vadeli olanları kaçırma.";
}
function openReport(){
 if(!S)return;
 const s=S.s,p=S.ps||s,w=Engine.world(S),t=w.t0,share=Math.min(1,s.tk/s.tal);
 const st=t<2?["Hedefe yakın","ok"]:t<2.5?["Sınırda","mid"]:["Tehlikeli","bad"];
 const pos=v=>(cap((v-1.4)/(3.2-1.4),0,1)*100).toFixed(1);
 const row=(name,v,k,tip)=>{const d=s[k]-p[k],lv=v>=60?["İyi","ok"]:v>=40?["Orta","mid"]:["Zayıf","bad"],
  ar=Math.abs(d)<.05?"":d>0?" ▲":" ▼";
  return `<div class="rrow"><b>${name}</b><em class="${lv[1]}">${lv[0]}${ar}</em><span class="rbar"><i style="width:${cap(v,0,100).toFixed(0)}%"></i></span>${tip?`<small>${tip}</small>`:""}</div>`;};
 const L=S.last;
 $("rtitle").textContent=`Dünya raporu · ${Math.min(S.year,2075)}`;
 $("rbody").innerHTML=`<div class="fc"><span class="big2">+${fmt(t)}°C</span><span class="fl"><b>2075 tahmini: ${st[0]}</b>Hiç yeni karar alınmasa 2075’te dünya bu kadar ısınmış olur. Deniz +${w.sl} cm yükselir.</span>
   <div class="scale"><i style="left:${pos(t)}%"></i>${[1.5,2,2.5,3].map(v=>`<span style="left:${pos(v)}%">${fmt(v)}°</span>`).join("")}</div></div>`+
  (L?`<div class="push">${MK.map(k=>{const v=Math.round(L[k]*10)/10;return `<span class="${v>=.5?"g":v<=-.5?"b":""}">${MN[k]} ${v>0?"+":v<0?"−":"±"}${fmt(Math.abs(v))}</span>`}).join("")}</div>`:"")+
  row("Temiz enerji payı",share*100,"tk",`Elektriğin %${Math.round(share*100)}’i temiz kaynaklardan.`)+
  row("Ormanlar",s.or,"or","Ormanlar her yıl Doğa’yı besler.")+
  row("Okyanuslar",s.ok,"ok","")+
  row("Afetlere hazırlık",s.uy,"uy",`Afetlerin yıllık zararı Fon’dan çıkar (şu an ${fmt(s.D)}).`)+
  row("Güven ve adalet",s.gv,"gv","Güven Uluslar’ı her yıl iter.")+
  `<p class="advice"><b>Danışman notu</b>${advice(S)}</p>`+
  `<details class="more"><summary>Ayrıntılar</summary><p>Bugünkü ısınma +${fmt(s.T0)}°C${s.aer?` (aerosolle hissedilen +${fmt(s.T)}°C)`:""}<br>Yıllık CO₂ ${Math.round(s.em)} milyar ton<br>Deniz seviyesi bugün +${Math.round(s.sl)} cm<br>Fosil altyapı ${Math.round(s.fk)} · enerji talebi ${Math.round(s.tal)} (2026 = 100)<br>Isınma birikimli CO₂’den hesaplanır: her 1000 milyar ton ≈ +0,45°C.</p></details>`;
 overlay("report");$("rclose").focus({preventScroll:true});
}
$("raporBtn").addEventListener("click",openReport);
$("rclose").addEventListener("click",()=>{$("report").hidden=true;});

/* ---------- Cevaplar ve tuşlar ---------- */
["l","r"].forEach(s=>{const b=$(s==="l"?"btnL":"btnR");
 b.addEventListener("mouseenter",()=>{if(!busy)showSide(s)});
 b.addEventListener("mouseleave",()=>{if(!busy)showSide(null)});
 b.addEventListener("focus",()=>{if(!busy)showSide(s)});
 b.addEventListener("blur",()=>showSide(null));
 b.addEventListener("click",()=>commit(s));});
document.addEventListener("keydown",e=>{
 const enter=e.key==="Enter"||e.key===" ";
 if(!$("report").hidden){if(e.key==="Escape"||e.key==="Enter"){e.preventDefault();$("report").hidden=true;}return;}
 if(!$("letterScreen").hidden){if(enter){e.preventDefault();$("lnext").click();}return;}
 if(!$("startScreen").hidden||!$("reflectScreen").hidden||!$("loopScreen").hidden||!$("endScreen").hidden)return;
 if(!$("doorView").hidden&&enter){e.preventDefault();$("doorOk").click();return;}
 if("rRdD".includes(e.key)&&e.key.length===1&&!busy){openReport();return;}
 if(busy||!S)return;
 const i=e.key==="1"||e.key==="ArrowLeft"?0:e.key==="2"||e.key==="ArrowRight"?1:e.key==="3"?2:-1;if(i<0)return;
 if(!$("deskView").hidden)pickFolder(i);
 else if(!$("cardView").hidden){const vis=["l","r"].filter(s=>!$(s==="l"?"btnL":"btnR").hidden);if(vis[i])commit(vis[i]);}
});

$("mute").addEventListener("click",()=>{muted=!muted;$("mute").textContent=muted?"SES KAPALI":"SES AÇIK";$("mute").setAttribute("aria-pressed",muted);});
// Demo modu: video çekimi için her tur 2 yıl, mektuplar daha hızlı yazılır
$("demoBtn").addEventListener("click",()=>{demo=!demo;$("demoBtn").textContent=demo?"Demo modu açık · her tur 2 yıl":"Demo modu";$("demoBtn").setAttribute("aria-pressed",demo);});
document.querySelectorAll("[data-h]").forEach(b=>b.addEventListener("click",()=>{$("startScreen").hidden=true;newGame(demo?"hizli":"tam",b.dataset.h);}));
$("again").addEventListener("click",()=>{$("endScreen").hidden=true;showStart();});
function showStart(){const g=loadEnds().length;$("found").textContent=g?`Keşfedilen sonlar: ${g}/12`:"12 farklı son seni bekliyor.";document.body.classList.remove("epi");view(null);$("startScreen").hidden=false;}

/* ---------- Başlat ---------- */
buildMeters();buildWorld();
function boot(data){
 if(data&&data.S&&data.S.step&&data.S.hitap){S=data.S;demo=S.step===2;W.seen=new Set(S.flags.concat(S.year>=2049?["@deniz"]:[]));W.live=false;$("startScreen").hidden=true;document.body.classList.toggle("epi",!!S.epi);renderMeters();updateWorld();renderYear();
  busy=false;if(S.card)showCard(false);else if(S.offer)showDesk();else nextTurn();return;}
 S=Engine.newState("tam","Dede");
 renderMeters();updateWorld();renderYear();busy=true;showStart();
}
const hot=window.claude&&window.claude.hot;
if(hot&&hot.snapshot)hot.snapshot(()=>({S}));
if(hot&&hot.ready)hot.ready(boot);else boot(hot&&hot.data||{});
