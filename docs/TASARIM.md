# Oyun Tasarım Dokümanı · Gelecekten Mektup

> Güncel sürümü anlatır (`secimler`, 31 Ekim 2026). Nasıl bu noktaya gelindiği: [YAPILANLAR.md](YAPILANLAR.md).

## 1. Konsept

**Tek cümle:** 2075'teki torunun Deniz'den mektuplar alırken 2026'dan 2075'e kadar dünyanın iklim kararlarını veriyorsun; masana gelen dosyaların hepsine yetişemiyorsun ve bazı kararlar kapıları sonsuza dek kapatıyor.

**Neden bu tema:** COP31'in odak alanlarının hepsi (yenilenebilir enerji, karbon ayak izi, iklime dirençli şehirler, gıda güvenliği, okyanuslar, iklim eğitimi, sıfır atık) dosyaların içine dağıtıldı. Ana mesaj mekaniğin kendisinde: **sürdürülebilirlik bir denge meselesidir.** Yalnızca "yeşil" seçen oyuncu da kaybeder (Halksız Yeşil, Ekleme Tuzağı, Fon Tükendi).

**Fikrin dayanağı:** Almanya Anayasa Mahkemesi'nin Neubauer kararı (2021): bugün ertelenen emisyon azaltımı gençlerin gelecekteki özgürlüklerini kısıtlar. "Kapanan kapılar" bu fikri oynanabilir hâle getirir.

**İlham ve fark:** *Lapse*, *Reigns*. Onlarda tek kart ve iki seçenek vardır. Bizde her yıl birkaç dosya gelir ve oyuncu hangisine vakit ayıracağını seçer; ertelenen dosyanın vakti dolarsa karar oyuncunun yerine verilir.

**Platform:** Web (HTML5), öncelik telefon; bilgisayarda klavye ve fareyle de oynanır. Telefona uygulama gibi kurulabilir (PWA), internetsiz çalışır.

**Süre:** Tam oyun 49 yıl, yaklaşık 10–12 dakika. Demo modu (video için) her turda 2 yıl ilerler.

## 2. Hikâye

- **Oyuncu:** 2026'da kurgusal **Küresel İklim Konseyi**'nin başına seçilen kişi. Kartlarda "Başkan" diye hitap edilir, cinsiyeti belirtilmez.
- **Deniz:** Oyuncunun torunu. 2049'da doğar, 2075'te 26 yaşındadır. Oyuncuya başta seçilen hitapla ("Dede" ya da "Nine") yazar.
- **Ece:** Oyuncunun kızı, Deniz'in annesi. Aile dosyalarında görünür: İstanbul'a taşınma kararı (2030'lar), Deniz'in doğumu (2049, zorunlu), Deniz'i denize götürme (2056–2062). Ece oyuncuya "Baba" ya da "Anne" der.
- **Zaman paradoksu:** Deniz 2075'ten yazar; mektuplar oyuncunun kararlarıyla birlikte değişir. 2049'dan önce kaybedilirse Deniz belki hiç doğmamıştır; son mektup bunu söyler.
- **Çember:** Oyunun son sahnesinde Deniz, 2026'daki büyüğüne ilk mektubu yazar. Bu mektup oyunun açılışında okunan mektuptur.

## 3. Temel mekanik

### Dört denge

| Anahtar | Gösterge | 0 olursa | 100 olursa |
|---|---|---|---|
| `d` | 🌳 Doğa | **Kavrulan Dünya** | **Halksız Yeşil**: doğa korunur ama içinde yaşayanlar unutulur |
| `h` | 👥 Uluslar | **Konsey Dağıldı** | **Alkış Tuzağı**: herkes memnun, hiçbir söz bağlayıcı değil |
| `e` | 🪙 Fon | **Fon Tükendi** | **Satılık Konsey**: fosil şirketlerinin parası gündemi belirler |
| `n` | ⚡ Enerji | **Karanlık Yaz** | **Ekleme Tuzağı**: temizi ekleyip kirliyi bırakmamak |

- Hepsi 50'den başlar, 0–100 arasındadır. ≤ 15 ya da ≥ 85 olunca gösterge kırmızıya döner.
- Bir seçenek genelde 2–3 dengeyi ±5 / ±10 / ±15 değiştirir.
- **Önizleme:** Kararın üzerine gelince değişecek dengelerin altında nokta çıkar (küçük < 12, büyük ≥ 12). Yön gösterilmez. Sahnede de kararın izi soluk bir önizleme olarak görünür ("Seçersen: …").

### Başkan'ın masası (her yıl)
`engine.js` → `tide` (adı eski şişe mekaniğinden kaldı).

1. **Vakti dolan dosyalar düşer:** Bekleyen bir dosyanın son günü (`max`) geçtiyse fırsat kaçar ve `idle` tarafındaki seçenek kendiliğinden işler. Bu oyunu tek başına bitirmez. 26 dosyanın son günü var.
2. **Zorunlu dosya** (`at`: 2026 açılış, 2029 Afrika, 2049 Deniz'in doğumu) ya da **eşik olayı** varsa tek başına gelir, bekletilemez.
3. Yoksa masaya **iki dosya**, 2029'dan sonra yaklaşık %22 olasılıkla **üç dosya** ("yoğun gün") gelir. Önce vakti gelmiş sonuçlar ve bekleyen dosyalar, sonra havuzdan rastgele dosyalar.
4. Oyuncu **birini açar**. Açılmayanlar 3 yıl (demo modunda 4 yıl) sonra yeniden gelir.

### Gelecekten not
En erken 2028'de, en sık dört turda bir ve %35 olasılıkla, masadaki dosyalardan biri için Deniz'in kısa bir notu gelir (`HINTS`, 28 dosya). Not ne yapılacağını söylemez; o kararın 2075'te nasıl hatırlandığını ima eder. İlgili dosyada "✉ Deniz'in notu" etiketi görünür.

### Kapanan kapılar
- Seçeneklerde `lock:["bayrak"]` alanı varsa ve o bayrak konmuşsa seçenek kapalıdır (16 kilit sebebi, `LOCKS`). `@hot` (2075 ısınması ≥ 2,6°C) ve `@notcut` (emisyon hâlâ yüksek) iklime bağlı kilitlerdir.
- **Karar anında:** Kapıyı kapatacak bayrak konunca "Bu kararın bir bedeli olabilir" notu çıkar (`DOORS`, 14 kapı).
- **Yıllar sonra:** O dosya geldiğinde kapalı seçenek görünmez; yalnızca açık kalan yol ve "Bu konuda elin bağlı · yıl" notu görünür.
- 2029 Afrika dosyasında her oyuncu ilk kilidi görür: açılıştaki Fon kararına göre ya kömür ya güneş kapanmıştır.
- Kilitler ara mektuplarda ve bitiş ekranında da anlatılır.

### Bayraklar
Seçimler kalıcı bayrak bırakır (`f`). Bayraklar mektuplarda anı satırı (`FL`, 67 satır), sahnede kalıcı iz (37 iz), başka dosyaların koşulu (`req`), kilitler ve gizli son için kullanılır.

## 4. Arka plandaki dünya
`engine.js` → `Sys`. Her yıl ilerler ve dört dengeyi en fazla ±3 iter (etiketlerin yanında ▲▼).

| Sistem | Nasıl çalışır |
|---|---|
| Isınma | Birikimli CO₂: her 1000 milyar ton ≈ +0,45°C (IPCC AR6, TCRE). Metan kesintisi düşürür, aerosol yalnızca maskeler. |
| Deniz seviyesi | Isınmayla hızlanır, emisyon dursa da yükselir. |
| Enerji | Temiz kapasite S-eğrisiyle büyür; fosil yavaş emekliye ayrılır; arz yetmezse piyasa gaz kurar; fazla arz talebi şişirir. |
| Ormanlar, okyanuslar | Kararlar ve ısınma. |
| Uyum kapasitesi | Afet zararını belirler; bakımsız kalınca azalır. |
| Güven ve adalet | Bedelin kime yüklendiğine göre değişir. |

**7 eşik olayı** (`TRIG`): mercanlar (1,7°C), şebeke çöküşü, temiz enerjinin ucuzlaması (olumlu), büyük afet, 48°C sıcak dalgası, göç dalgası, Amazon'un kuruması.

**Rapor paneli** (`R`): 2075 ısınma tahmini renk ölçeğinde, bu yılın dengelere etkisi, beş sistem için "İyi / Orta / Zayıf" çubukları, en zayıf noktaya göre danışman notu ve ayrıntılı rakamlar.

## 5. Mektuplar
- **Giriş mektubu:** Oyun başında.
- **Ara mektuplar:** 2032, 2038, 2044, 2050, 2056, 2062, 2068. Her biri Deniz'in farklı bir yaşından (7, 9 … 19) gelir; damgada yazıldığı yıl görünür.
  1. Hitap ("Sevgili Dede/Nine,"), 2050'de doğum satırı.
  2. **Dünya satırı:** 50'den en uzak denge 25 puandan uzaksa o dengenin düşük/yüksek uyarısı (`WORLD_LINES`), değilse sakin satır (`CALM`). Örtük ipucudur.
  3. 2038'den sonra **iklim satırı** (`CLIMATE`): 2075 ısınmasına göre <2°C, 2–2,5°C, ≥2,5°C.
  4. **Kapı ya da anı satırı:** Yeni görülen kilit varsa `LOCKLINES`, yoksa bahsedilmemiş en yeni bayrağın anısı (`FL`).
  5. Kapanış. Aynı satır bir oyunda iki kez gelmez.
- Daktilo efektiyle yazılır, dokununca tamamlanır.

## 6. Final ve sonlar

**2075'e ulaşılırsa:**
1. Deniz'in mektubu: "Görev süren doldu… Şimdi bir süre benim yerimde ol."
2. **Deniz'in gözünden** en fazla 4 dosya ve kapanış dosyası (`EPI`, 11 kart). Bunlar Deniz'in hayatındaki fırsatlardır (caretta nöbeti, Konya'daki tarla, Tala'nın adası…). Oyuncunun kapattığı kapılar burada da kapalıdır; kapısı kapanmış kartlar öne alınır.
3. **"Bu kadarını başardık"** ekranı: 2075 karnesi, açık kalan kapılar, "Peki, daha iyisi olabilir miydi?" ve olabilecekler.
4. **Çember sahnesi:** Antalya'da alacakaranlık bir pencere; Deniz 2026'ya mektup yazar (iyi sonlarda teşekkür mektubu). Mektup katlanır, zarfa girer, damgalanır ve uçar; yıl 2075'ten 2026'ya geri sayar.
5. Bitiş ekranı.

| ID | Son | Koşul |
|---|---|---|
| `d0` … `n100` | 8 kaybetme sonu | Bir denge 0 ya da 100 |
| `sonsuz` | **Sonsuz Mektup** (gizli) | Dört denge 30–70, 2075 ısınması ≤ 2,2°C, `kapsul` ve `denizkiyi` bayrakları |
| `mavi` | **Mavi Akdeniz** | Dört denge 30–70 ve 2075 ısınması ≤ 2,2°C |
| `yesil` | **Yeşil Miras** | Doğa ≥ 65 |
| `kirilgan` | **Kırılgan Umut** | 2075'e ulaşıldı, diğer durumlar |

Bitiş ekranı: Deniz'in mektubu, bir sonraki oyun için ipucu, kapılar, vakti dolan dosyalar, 2075 karnesi, 12 sonluk koleksiyon (`localStorage` → `gm_endings`) ve kaynaklar.

## 7. Karakterler (26)

| Anahtar | Karakter | Hikâyedeki yeri |
|---|---|---|
| `elif` | Elif, gençlik delegesi | Açılış, gençlik koltuğu, finalin son sorusu |
| `tala` / `losa` | Tala ve torunu Losa, Pasifik ada ülkeleri | Ada uyum fonu zinciri, finalde adaya dönüş |
| `ama` | Ama, Batı Afrikalı enerji bakanı | 2029 Afrika kilidi, gazdan çıkış |
| `ravi` | Ravi, Pencaplı çiftçi | Su, sıcak dalgaları |
| `maria` | Maria, Amazon orman bekçisi | Otoyol, yerli tapuları, koruma koridoru |
| `stone`, `kemal`, `kuzey` | Petrol CEO'su, Kömür Birliği, Kuzey Birliği | Fosil baskısı, muafiyetler |
| `wei`, `can` | Batarya üreticisi, teknoloji girişimcisi | Madencilik, veri merkezleri, aerosol, karbon çekme |
| `selin`, `nil`, `yusuf` | Bilim danışmanı, deniz biyoloğu, uyum mühendisi | Bilim, okyanus, afet ve kıyı kararları |
| `leyla`, `zeynep` | Gazeteci, öğretmen | Basın, iklim eğitimi, zaman kapsülü |
| `ayse` / `mert` | Konyalı Ayşe Teyze ve torunu | Kuyular ve obruklar |
| `ece` | Ece, oyuncunun kızı | Aile dosyaları |
| `hasan` / `kerem` | Antalyalı balıkçı baba ve oğul | Av kotası zinciri |
| `murat`, `gulsum`, `hans` | Otelci, emekli, turist | Belek, gündelik hayat, turizm (mizah) |
| `marti`, `kedi` | Martı ve sokak kedisi Tekir | Mizah dosyaları |

`old: 1` olan dosyalarda karakterin saçı ağarır.

## 8. Görsel kimlik
- **Palet: retro poster.** Eski bir Antalya turizm afişi: kum zemin `#F1E2C4`, krem kâğıt `#FBF4E6`, kiremit turuncu `#D35F2A`, petrol yeşili `#1E6E73`, koyu kahve mürekkep `#3A2618`. Tanımlar `index.html` → `:root`.
- **Fontlar (Google Fonts):** Bricolage Grotesque (başlıklar), Figtree (metin), JetBrains Mono (yıl, etiketler), Caveat (Deniz'in el yazısı).
- **Masa:** Krem dosya kartları, petrol yeşili sekmelerde karakterin rolü, lastik damga gibi "Son gün" etiketi.
- **Mektuplar:** Turuncu-petrol uçak postası kenarı, satırlı kâğıt, "ANTALYA" posta damgası.
- **Portreler:** Kodla çizilen düz SVG portreler (`ui.js` → `portrait`).
- **2075 sahnesi:** SVG; 37 karar izi, martılar, insanlar, jaguar, carettalar, yunus, trafik, yelkenli. Deniz 2049'da doğar ve kumsalda büyür. Kararlar dengeleri ve dünya sistemlerini çizer: ağaç sayısı ormanlara, duman fosile, deniz seviyesi 2075 tahminine, bina boyları Fon'a, pencere ışıkları Enerji'ye, kumsaldaki insanlar Uluslar'a bağlıdır.
- **Simge:** Gün batımında Antalya denizinin üstünde uçak postası zarfı (`icons/icon.svg`).
