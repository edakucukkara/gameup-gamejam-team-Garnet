# Yapılanlar

> 30–31 Ekim 2026 · İlk sürümün (`main`) üzerine yapılan değişiklikler ve nedenleri. Kalan işler: [YAPILACAKLAR.md](YAPILACAKLAR.md)

## Neden değiştirdik
- **Özgünlük:** Binlerce takım AI ile oyun yapıyor; Reigns/Lapse türü ve "gelecekten mektup" fikri tek başına öne çıkmıyordu. Türe kendi mekaniğimizi ekledik: **Kapanan Kapılar**.
- **Takım geri bildirimi:** Oyunu doğrudan COP31'e bağlamamak, oyuncuyu küresel bir kurumun başına koymak, Amerika'yı andıran mavi-kırmızı renkleri değiştirmek, hızla yükselen Enerji'yi düzeltmek.
- **Bilimsel doğruluk:** İlk sürümde Antalya'nın kararları küresel deniz seviyesini değiştiriyordu; "Doğa 100 olursa ekonomi çöker" ve yenilenebilir enerjinin "Sönmeyen Işıklar"a götürmesi yanlış mesaj veriyordu.

## 1. Yeni tasarım · commit `3824237`
- **Küresel İklim Konseyi:** Oyuncu kurgusal bir konseyin başında. Kartlar baştan yazıldı; Pasifik'ten Tala, Batı Afrika'dan Ama, Pencaplı Ravi, Amazon'dan Maria, Konyalı Ayşe Teyze, Antalyalı Hasan… Deniz mektuplarını Antalya'dan yazıyor.
- **Göstergeler:** Doğa, **Uluslar**, **Fon**, Enerji (₺ simgesi madeni para oldu).
- **Kapanan Kapılar:** Bazı kararlar ileride bazı seçenekleri kalıcı olarak kapatıyor. Kartta "KAPANDI · yıl — sebep" damgası; kilitli tarafa kaydırınca kart sallanıyor. 2029'daki Afrika kartında herkes ilk kilidi görüyor (açılıştaki Fon kararına göre ya kömür ya güneş kapanıyor).
- **Final, "Deniz koltuğa geçer":** 2075'te Deniz Konsey'in başına geçiyor ve senin açık bıraktığın kapılarla karar veriyor. Bitiş ekranı Deniz'e bıraktığın kapıları listeliyor. *(Hanedanlık gibi okunduğu için değişti, bkz. 4. bölüm.)*
- **Yeniden yazılan sonlar:** Halksız Yeşil (doğayı korurken insanları unutmak), Ekleme Tuzağı (temizi ekleyip kirliyi bırakmamak), Satılık Konsey, Konsey Dağıldı, Fon Tükendi, Mavi Akdeniz…
- **Akdeniz paleti:** Kiremit, zeytin, kum, turkuaz.
- **Kod yapısı:** Tek dosya dörde ayrıldı (`data.js` içerik, `engine.js` kurallar, `ui.js` arayüz, `index.html`). Build adımı yok.
- **`tools/sim.js`:** Binlerce oyunu farklı oyuncu tipleriyle oynayıp dengeyi ölçüyor, içerik hatalarını yakalıyor.
- **Kaynaklar:** Bitiş ekranında oyundaki gerçek bilgilerin kaynakları.

## 2. Oyun testi turu · commit `ad34a57`, `703eb1a`
Yaklaşık 24.000 simüle oyun, 4 ekran boyutunda tarayıcı turları ve bir oyunun baştan sona okunmasıyla bulunup düzeltilenler:

| Sorun | Düzeltme |
|---|---|
| Mektuplar aynı cümleleri tekrar ediyordu (oyun başına 6,6 satır) | Mektup havuzları büyüdü, aynı satır bir daha gelmiyor |
| Kilitler oyunun ortasında kayboluyordu | Kilit doğuran her kararın sonucu sıraya giriyor; yeni kilitler: erken uyarı → kasırga, derin deniz madenciliği → koruma alanı |
| Doğa ve Uluslar sürekli yukarı kayıyordu | Etkiler yeniden ayarlandı |
| Deniz'in doğduğu kart oyunu bitirebiliyordu | Kart etkisiz |
| Ölen oyuncu kilit mekaniğini görmüyordu | Bitişte "Bu zaman çizgisinde kapanan kapılar" |
| Finalde 2075'te süresi bitmiş bir sözleşme "hâlâ sürüyor" diyordu | Kilit 2029'daki Afrika kömür santrallerine bağlandı |
| 26 yaşındaki Deniz "okul bahçesinde solucan" anlatıyordu | Her mektup Deniz'in farklı bir yaşından (7–19) geliyor |
| Büyük harflerde Türkçe İ bozuktu ("ENERJI") | `lang="tr"` ve doctype eklendi |
| iPhone SE'de açılış düğmeleri ekrandan taşıyordu | Küçük ekran düzeni |
| Final 2–3 karta düşebiliyordu | İki yeni final kartı; çoğu oyuncu 5 kartlık final görüyor |

## 3. Arka plandaki dünya · commit `1a0fbb2`
Dört gösterge kartlarla anında değişiyor; arkada her yıl ilerleyen bir dünya modeli onları yavaşça itiyor (göstergelerin yanındaki ▲▼).

- **Isınma** birikimli CO₂'den: her 1000 milyar ton ≈ +0,45°C (IPCC AR6, TCRE). Metan kesintisi düşürüyor, aerosol yalnızca maskeliyor.
- **Deniz seviyesi** ısınmayla hızlanıyor, emisyon dursa da yükselmeye devam ediyor.
- **Enerji sistemi:** Temiz enerji S-eğrisiyle büyüyor; fosil santraller onlarca yıl yaşıyor; arz yetmezse piyasa gaz kuruyor; fazla arz talebi şişiriyor.
- **Ormanlar, okyanuslar, uyum kapasitesi** (afet zararını belirliyor) ve **güven ve adalet**.
- **7 eşik olayı:** mercanların kaybı (1,7°C), Amazon'un kuruması, şebeke çöküşü, büyük afet, 48 derecelik sıcak dalgası, göç dalgası ve olumlu eşik olarak temiz enerjinin fosilden ucuzlaması.
- **DOSYA paneli** (`D` tuşu): arka plandaki dünyanın raporu.
- **2075 penceresi:** bugünkü dünyanın 2075 tahmini. Ormanlar, fosil dumanı, türbin ve panel sayısı sistemlerden çiziliyor.
- **Bitiş ekranı:** 2075 karnesi ve bir sonraki oyun için ipucu.
- **Mavi Akdeniz** artık hem dört dengeyi (30–70) hem de 2075'te en fazla 2,2°C ısınmayı istiyor.
- **Düzeltilen hata:** İlk denge ayarında bir betik değerleri zincirleme değiştirmiş, bütün Fon maliyetlerini −5'e indirmişti. Tasarlanan değerlere geri alındı.

## 4. Final: koltuk değil, dünya miras kalır · commit `9d39942`
*(Aynı gün 5. bölümle yeniden değişti: Deniz artık torun değil, deniz. "Deniz olursun" finali korundu.)*

**Sorun:** Torunun 2075'te dedesinin ya da ninesinin koltuğuna oturması padişahlık, yani babadan oğula geçen iktidar gibi okunuyordu. Bu, iklim adaletinin tersi bir mesajdı. Reigns'in kral hanedanına da fazla benziyordu.

- **Yeni final:** 2075'te görev süren dolar ve Konsey yeni başkanını seçer. Oyuncu **Deniz olur**: 26 yaşında, Antalya'da yaşayan sıradan bir genç.
- **Kapılar artık Deniz'in hayatındaki fırsatlar:**
  - Belek'te caretta nöbeti tutmak
  - Konya'daki tarlayı ekmek
  - Losa'yla Tala'nın adasına dönmek
  - Amazon'u baştan başa yürümek
  - resife dalmak
  - Ama'nın köyünde güneş kooperatifi kurmak

  Oyuncunun yıllar önce kapattığı kapılar bu kartlarda kilitli gelir ve damgası oyuncunun kendi kararını gösterir.
- **Son kart:** Elif, Deniz'e torunlarına ne bırakacağını sorar.
- **Metinler:** Giriş ekranı, giriş mektubu ("2075'te o kapıların önünde ben duracağım"), 2075 mektubu, üst çubuk ("Artık Deniz'sin") ve bitiş ekranı ("Görevin bitti · Dünya Deniz'e kaldı") değişti.
- **Kaynaklar:** İki kaynak eklendi:
  - Almanya Anayasa Mahkemesi'nin Neubauer kararı (2021): ertelenen emisyon azaltımı gençlerin gelecekteki özgürlüklerini kısıtlar. Kapanan Kapılar'ın hukuktaki karşılığı.
  - WMO'nun Daniel fırtınası açıklaması: erken uyarı kartının dayanağı.
- **Küçük düzeltmeler:**
  - Gençlik koltuğu satırında annenin koltukta oturması yerine oy kullanması anlatılıyor.
  - Zaman kapsülü satırı her yaşta tutarlı.
  - Final etiketleri 24 harfin altında; içerik kontrolü 0 uyarı veriyor.

## 5. Denizden Mektup: yeni oynanış · commit `1540308`
**Neden:** Takım geri bildirimi üç noktada toplandı:
- **Lapse'a benzerlik:** Oyun Lapse'a fazla benziyordu (tek kart, sağa sola kaydırma, üstte dört gösterge). Farklı bir arayüz ve mekanik istendi.
- **Kilitlerin muğlaklığı:** Kapanan seçenekler muğlak görünmeliydi.
- **Mektubun sebebi:** Mektubu yazanın neden yazdığı da farklı olabilirdi. Takımın önerisi: *"Ben dünyadaki suların lideriyim. Siz insanlar geçmişte beni kötü kullandınız; şimdi değiştirebiliriz."*

- **Deniz artık torun değil, deniz:** Okyanusların, nehirlerin, yağmurun, buzulların ve toprağın altındaki suyun sesi. Oyunun adı **Denizden Mektup** oldu.
  - Giriş mektubu, Deniz'in mektupları, anı satırları (`FL`) ve 12 son Deniz'in ağzından yeniden yazıldı.
  - Aile kartlarında torunun adı geçmiyor.
- **Kıyıya vuran şişeler:** Kaydırma kaldırıldı. Her tur kıyıya iki şişe vurur ve yalnız biri açılır. Açılmayan denize döner, birkaç yıl sonra yine gelir.
  - 26 kartın son yılı var. Süresi dolan şişe açılmadan batar ve hiçbir şey yapmamanın sonucu kendiliğinden işler (`idle`). Örneğin kuyulara izin verilmiş, otel yapılmış, kızın İstanbul'a taşınmış olur. Mesaj: karar vermemek de bir karardır.
  - Batış oyunu tek başına bitirmez.
  - Zorunlu kartlar ve olaylar tek şişe olarak gelir, bekletilemez.
- **Mektup ve cevap:** Açılan mektup kâğıt üzerinde, karakterin portresi posta pulu gibi. Cevaplar el yazısıyla iki satır; tıklanarak ya da `1` `2` tuşlarıyla seçilir.
- **Muğlak kapılar:** Kapanan cevap silik ve okunmaz görünür, damgada yalnızca "KAPANDI · yıl" yazar. Ne olduğu ve neden kapandığı Deniz'in mektuplarında ve bitiş ekranında açılır.
- **Dört denge dört testi oldu:** Testi kurursa ya da taşarsa oyun biter. Cevabın üzerine gelince değişecek testiler çalkalanır; yönü söylenmez.
- **Denizde şişeler:** Sonucu yıllar sonra dönecek kararlar ve ertelenen mektuplar, 2075 penceresindeki denizde yalnızca dönecekleri yılla görünür.
- **Final, Deniz olursun:** 2075'te insanlar denizden bir şey ister: adaya dönmek, caretta yavrularını karşılamak, Konya'ya suyunu geri vermek, Amazon'a yağmur taşımak… Kapattığın kapıları veremezsin. Son kartta Elif, Deniz'e insanlara son sözünü sorar.
- **İki mod:** Hızlı oyun (her tur 2 yıl, ~25 karar, ~5 dk) ve tam oyun (her tur 1 yıl, ~49 karar). Hızlı oyunda kararların arka plan etkisi iki yıllık sayılır.
- **Simülasyon:** `tools/sim.js` artık iki adımı (şişe seçimi, cevap) ve iki modu ölçüyor; süreli kartta `idle` eksikse uyarıyor.

## 6. Kararlarla değişen, canlı sahne
**Neden:** 2075 penceresi yalnızca genel dengeleri (ağaç sayısı, duman, deniz) gösteriyordu. Takım daha etkileşimli ve göze hitap eden bir sahne istedi: kararlar sahnede görünsün, sahne canlı olsun.

**Kararların izleri:** Önemli her karar ve olay pencereye kalıcı bir iz bırakıyor (`ui.js` → `DEC`, notlar `CAP`). Tablonun tamamı README'de.
- Kömür santrali dumanla ya da kapanınca müze bayrağıyla görünüyor; gaz platformu yanıyor.
- Ormandan otoyol geçiyor ve ağaçlar devriliyor. Koruma koridorunda jaguar yürüyor, yerli halka verilen toprakta kulübe duruyor.
- Tarlalarda obruklar açılıyor ya da tarlalar yeşil kalıyor.
- Kumsalda otel ve marina ya da yuva yapan carettalar görünüyor.
- Kıyıda mangrovlar, karides havuzları, sulak alan ya da beton set var.
- Açık deniz türbinleri, dağda güneş tarlası, batarya parkı ve dalga şamandıraları kuruluyor.
- Kıyıdan hızlı tren geçiyor ya da otoyolda araba trafiği akıyor.
- Aerosol püskürten uçak ve kıyıda erken uyarı kulesi görünüyor.
- Kıyı evleri yerinde kalıyor, yıkılıyor ya da taşınıp çatıları su altında kalıyor.
- Ada korunuyor ya da batıyor; balıklar dönüyor ya da denizde plastik yüzüyor.
- Olaylar da sahneye geliyor: kuruyan ağaçlar, sıcak dalgası, göç tekneleri.

**Önizleme:** Cevabın üzerine gelince iz soluk ve yanıp sönen bir önizleme olarak görünüyor, altta "Seçersen: …" notu çıkıyor. Seçince iz büyüyerek beliriyor, not birkaç saniye kalıyor.

**Canlılık:**
- Martı sürüsü kanat çırparak uçuyor. Bir martı süzülüp kumsala konuyor, gagalıyor, çırparak havalanıyor.
- İnsanlar kumsalda yürüyor, çiftler sohbet ediyor. Balondaki simge dünyanın durumunu gösteriyor: sıcakta güneş, karanlıkta sönük ampul, deniz iyiyse balık, değilse kalp.
- Jaguar koridorda dört bacakla yürüyor, kuyruğunu sallıyor.
- Carettalar kürek çeker gibi ilerliyor, yavrular denize iniyor.
- Okyanus sağlıklıysa yunus zıplıyor. Zıplama tek bir parabol: gövde her an yörüngeye teğet dönüyor; çıkışta ve dalışta suda halkalar ve damlalar beliriyor.
- Bulutlar süzülüyor, ağaçlar sallanıyor, denizden yelkenli geçiyor.
- Kıyı evleri begonvilli, kiremit çatılı, mavi kapılı Akdeniz evleri.
- İnsan sayısı Uluslar'a, kuşlar ormanlara bağlı. Uluslar düşünce kumsal boşalıyor, orman yok olunca martılar gidiyor.

**Takımın incelemesiyle düzeltilenler:**

| Sorun | Düzeltme |
|---|---|
| Kıyı evleri suyun içinde görünüyordu | Evler karada, şehrin önünde. Deniz seviyesi görüntüsü oyun başındaki tahminden (~+42 cm) başlıyor; daha kötüsünde deniz kıyıya çıkıyor, +52 cm'de kıyı su altında |
| Dağdaki türbin havada uçuyordu | Türbinler sırt çizgisinin üstünde |
| Açık deniz türbinleri suya girmiş gibiydi | Denizden yükselen direk, su hizasında sarı geçiş parçası |
| Denizde çalılar vardı | Mangrovlar, sazlar ve karides havuzları kıyıda, kumun üstünde |
| Beton set yol gibi duruyordu | Su hizasında, dalgaların çarptığı bir rıhtım duvarı |
| Uçak kuyruklu yıldız gibiydi | Ok kanatlı uçak silüeti ve arkasında solan püskürtme bulutu |
| Martılar çizgi gibiydi, konuşları kötüydü | Yan profilden martılar: kanatlar omuzdan çırpıyor, uçları siyah; konan martı süzülüp iniyor, ayakta gagalıyor, aynı yöne havalanıyor |
| Caretta yukarıdan bakışla çizilmişti | Yan profil: kubbe kabuk, baş, kürek gibi paletler |
| Jaguar şekilsizdi | Yan profil: rozet benekleri, kulaklar, dört bacakla adım, sallanan kuyruk |
| Ormanın altındaki renkli kutucuklar anlaşılmıyordu | Yandan çizilmiş arabalar, şeritli yol, kesintisiz akan trafik |
| Yunus kötü görünüyordu ve zıplaması takılıyordu | Yan profil yunus; tek parabol halinde akıcı zıplama |
| Zıplamadan sonraki sıçrama kötüydü | Suda genişleyen halkalar ve yukarı fırlayıp düşen damlalar |
| Kumsalda iki martı vardı, martı carettanın sırtına konuyordu | Eski çizim silindi, iniş noktası ve kumsaldakiler yeniden yerleştirildi |
| Not ile sıcaklık kutusu çakışıyordu | Not pencerenin altında |

- **İki yeni bayrak:** Beton set (`betonset`) ve otoyollar (`otoyol`).
- **Kontrol yöntemi:**
  - Dört karar senaryosu (en kötü, en yeşil, sulak alan, beton set) yüksek çözünürlükte çizdirildi.
  - Canlılar, animasyon belli anlarda dondurularak 5–6 kat büyütülmüş karelerde incelendi.
  - Yunusun yörüngesi, 9 anın üst üste çizildiği bir karede kontrol edildi.
  - Her değişiklikten sonra iki modda baştan sona oyun oynatıldı.

## 7. Eda'nın seçimleri: Gelecekten Mektup'a dönüş · branch `secimler`
**Neden:** Eda arkadaşının sürümünü oynadı ve her şeyi tutmak yerine seçerek ilerlemek istedi. Kararlar:
- **Deniz yine torun.** Suların sesi fikri özgündü ama oyuncunun duygusal bağı torunla daha güçlü. Dede/Nine hitabı, Ece'li aile kartları ve torunun ağzından mektuplar geri geldi. Metinler 4. bölümdeki (commit `9d39942`) torun sürümünden alındı; sonradan eklenen `betonset` ve `otoyol` anıları torunun ağzından yazıldı. Oyunun adı yine **Gelecekten Mektup**.
- **Şişeler yerine Başkan'ın masası.** Konsey başkanına sorunların denizden şişeyle gelmesi mantıklı gelmedi. Mekanik aynı kaldı (birini seç, diğeri bekler, son günü geçerse fırsat kaçar), görünüm ve dil değişti: her yıl masaya manila dosyalar gelir. Yoğun günlerde (yaklaşık %22) üç dosya gelir; yalnız birine vakit vardır.
- **Gelecekten not.** Deniz ara sıra (en erken 2028, en sık dört turda bir, %35 olasılıkla) masadaki dosyalardan biri hakkında kısa bir not sıkıştırır. Notlar `data.js` → `HINTS` (28 dosya).
- **Kapanan kapılar artık seçim ekranında görünmüyor.** Kapıyı kapatan karardan hemen sonra yumuşak bir bildirim çıkar ("Bu kararın bir bedeli olabilir"; `data.js` → `DOORS`, 14 kapı). Yıllar sonra o dosya geldiğinde kilitli seçenek gizlenir; yalnızca açık kalan yol ve "Bu konuda elin bağlı · yıl" notu görünür. Silik yazı ve "KAPANDI" damgası kaldırıldı.
- **Hızlı oyun kaldırıldı, yerine demo modu.** Açılış ekranının köşesinde küçük bir "Demo modu" bağlantısı var: video çekimi için her tur 2 yıl ve daha hızlı yazılan mektuplar. Motor tarafında eski `hizli` modu kullanılıyor, böylece `tools/sim.js` değişmeden çalışır.
- **Final: Deniz'in gözünden, sonra çemberin kapanışı.** 2075'te oyuncu Deniz'in hayatındaki fırsatlarla yüzleşir (torun sürümündeki `EPI` kartları). Ardından:
  - "Bu kadarını başardık" ekranı: 2075 karnesi, açık kalan kapılar, "Peki, daha iyisi olabilir miydi?" ve olabilecekler.
  - Animasyonlu son sahne: 2075 gecesinde Antalya penceresi, Deniz 2026'daki büyüğüne mektup yazar. Bu oyunun açılış mektubudur, böylece çember kapanır. İyi sonlarda (Mavi Akdeniz, Yeşil Miras, Sonsuz Mektup) bir teşekkür mektubu olur. Mektup katlanır, zarfa girer, damgalanır ve uçar; yıl 2075'ten 2026'ya geri sayar.
- **Yeni palet: retro poster.** Eda dört seçenek arasından eski bir Antalya turizm afişi havasını seçti: kum zemin, krem kâğıt, kiremit turuncu vurgu, petrol yeşili ikinci renk, koyu kahve metin. Klasör sekmeleri ve uçak postası kenarı turuncu-petrol; son sahne alacakaranlık tonlarında. (Önce denenen gece mavisi palet beğenilmedi.) Testiler yerine sade çubuk göstergeler (iki uçtaki tehlike bölgesi görünür).
- **Dünya raporu (eski adıyla Dosya) oyuncu dostu hâle geldi.** "Dosya" artık masadaki dosyalar olduğu için panelin adı **Rapor** (`R` tuşu). Rakam tablosu yerine: 2075 ısınma tahmini bir renk ölçeğinde, bu yılın dengelere etkisi, beş sistem için durum çubukları ("İyi / Orta / Zayıf" ve yön), en zayıf noktaya göre bir **danışman notu**; rakamlar "Ayrıntılar" altında.
- **Sahne:** Deniz 2049'da doğar ve kumsalda büyür, çocukken uçurtma uçurur; doğduğu yıl sahnede "Deniz doğdu" notu çıkar. Onu kıyıya götürdüysen (`denizkiyi`) büyüğüyle kumdan kale yapar.
- **Düzeltilenler:** Açık dosyada karakter pulu metnin üstüne biniyordu; fotoğraf artık ataşla başlığın yanında. Rapordaki "−0" gösterimi düzeldi.
- **Arkadaşın sürümünden aynen kalanlar:** Küresel İklim Konseyi ve kartları, iklim modeli ve olaylar, yeni sonlar ve enerji düzeltmesi (Ekleme Tuzağı), kilit sistemi, süreli dosyalar ve `idle`, canlı sahnenin tamamı, kaynaklar.

- **Uygulama olarak kurulum (PWA) ve simge:** `manifest.webmanifest`, `sw.js` (çevrimdışı çalışma) ve `icons/` (gün batımında Antalya denizinin üstünde uçak postası zarfı). Telefonda "Ana ekrana ekle" ile uygulama gibi açılır.
- **Test ve teslim araçları:** `tools/sim.js` artık tarayıcıda da çalışıyor (`tools/test.html`, Node gerekmez). `tools/paket.py` itch.io zip'ini hazırlıyor ve eksik dosyayı yakalıyor. `oyna.bat` Windows'ta çift tıklayınca oyunu açıyor. Dokümanlar (TASARIM, İÇERİK-REHBERİ, YAPILACAKLAR, yeni TESLIM) güncel oyuna göre yeniden yazıldı; YAPILACAKLAR2 YAPILACAKLAR'a birleştirildi.

## 8. Adadaki palmiye · branch `ada-palmiye`
Denizin ortasındaki adada artık kararlara sık ama abartısız tepki veren bir palmiye var.
- **Zamanla büyür.** 2026'da genç bir palmiye; her yıl biraz uzar, 2060'larda tam boyuna ulaşır.
- **Dört hâl.** Gür (koyu yeşil, fazladan yaprak ve hindistancevizi, biraz daha iri), sağlıklı, solgun (yapraklar sararır, sarkar, bir kısmı dökülür, cevizler düşer) ve kuruyor (kahverengi, birkaç yaprak kalır, boyu çöker). Geçişler yavaşça renk ve biçim değiştirerek olur. İnsan gibi dengeli oynayanda tam oyunda ortalama ~7 kez hâl değiştirir (her ~7 kararda bir); sınırlarda pay olduğu için her kararda gidip gelmez.
- **Kırılmak zordur.** Yalnız kururken ve sağlığı üst üste iki kararda çok düşük kalırsa: gövde ortadan kırılır, tepesi denize devrilir, suya çarptığı yerde halka açılır, taç dalgalarda açığa sürüklenip kaybolur; adada kütük kalır. Not: "Palmiye kırıldı, dalgalar onu açığa sürüklüyor".
- **İyiye dönünce yeniden doğar.** Kırıldıktan sonra arka arkaya üç karar iyi yönde olursa kütüğün yanında kumdaki bir hindistancevizinden filiz çıkar ("Adada yeni bir palmiye filizlendi"), yıllar içinde yeni bir palmiyeye dönüşür; eski kütük hatıra olarak kalır. Filiz de dört hâli gösterir.
- **Neye bakıyor?** `Engine.palm`: 0–100 arası bir sağlık. Her kararda 2075 ısınma tahminindeki, doğa göstergesindeki ve okyanus sağlığındaki değişimle oynar ve dünyanın o anki hâline göre bir dengeye çekilir; yani **son kararların yönüne** tepki verir. Durum `S.palm`'da, kaydedilen oyunla birlikte geri gelir. Oyun dengesine etkisi yok.
- **Simülasyon (`tools/sim.js`, tam oyun):** her zaman kötü seçende palmiye hep kırılır; rastgele oynayanda %26; insan gibi dengeli oynayanda %6, yeşil ve dengeli oynayanda ~%1. Kırıldıktan sonra iyi oynamaya dönen oyuncuda %97–98'i yeniden filizlenir (medyan 3 karar; demo modunda %79–85, kalanında oyun daha önce biter). Sim çıktısına palmiye satırı eklendi (kırılan, filizlenen, sonda kırık, oyun başına hâl değişimi).
- **Not konumu:** Palmiye kırılırken ya da filizlenirken sahnedeki not üste çıkar, böylece ada görünür kalır.
- **Kontrol:** Dört hâl, filiz hâlleri, büyüme, kütük, sağa ve sola devrilme, sürüklenme kare kare yakından incelendi; kötü (demo) ve dengeli (tam) oynanan iki oyunda konsolda hata yok.

## Bugünkü durum (31 Ekim, `secimler`)
| | |
|---|---|
| İçerik | 71 dosya + 7 olay, 11 final kartı, 26 karakter, 16 kilit sebebi, 14 kapı bildirimi, 28 gelecekten not, 26 süreli dosya, 67 anı satırı, 12 son |
| İçerik kontrolü | 0 hata, 0 uyarı, iki seçeneği birden kilitli dosya yok (`tools/test.html`, tip başına 1000 oyun) |
| Hiç karar almadan 2075 | ≈ +2,5°C (bugünkü politikalara yakın) |
| İnsan gibi dengeli oynayan | Tam oyunda %79'u, demo modunda %83'ü 2075'e varıyor; ≈ +2,1–2,2°C |
| İnsan gibi yalnızca yeşil oynayan | Tam %36, demo %52; siyaseti ve enerjiyi ihmal edince kaybediyor |
| Rastgele oynayan | Tam %8, demo %25 |
| Vakti dolan dosya | İnsan gibi oynayanda oyun başına ~0,7 |
| Tarayıcı | Telefon boyutunda (375×812) açılıştan çember sahnesine kadar bütün ekranlar, kaybetme sonu ve demo modu: konsolda hata yok. Teslim zip'i boş bir klasörden açılıp oynatıldı. |
| Sahne | 37 karar ve olay izi, önizleme ve not; martılar, insanlar, jaguar, carettalar, yunus, trafik, yelkenli; büyüyen Deniz; kararlara göre gürleşen, solan, kırılan ve yeniden filizlenen ada palmiyesi |
