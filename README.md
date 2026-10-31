# Denizden Mektup

> Deniz, dünyadaki bütün suların sesi, sana mektup yazıyor. Her tur kıyına iki şişe vurur ve yalnız birini açabilirsin. Verdiğin her karar dünyayı değiştirir; bazıları kapıları sonsuza dek kapatır.

**GameUp Game Jam · Takım Garnet**
**Tema:** İklim · COP31 Türkiye (Antalya)

Hikâye odaklı bir karar oyunu. Oyuncu 2026'da kurgusal **Küresel İklim Konseyi**'nin başına seçiliyor ve 2075'e kadar dünyanın iklim kararlarını veriyor.

Mektupları **Deniz** yazıyor: okyanusların, nehirlerin, yağmurun, buzulların ve toprağın altındaki suyun sesi. *"Siz insanlar beni yıllarca kötü kullandınız. Ama şimdi birlikte değiştirebiliriz."*

## Oyunu farklı kılan üç şey

- **Kıyıya vuran şişeler.** Her tur dünyanın dört bir yanından iki mektup gelir ve yalnız birini açabilirsin. Kimi dinleyeceğini sen seçersin.
  - Açmadığın şişe denize döner ve sonra yine gelir.
  - Süresi dolan şişe açılmadan batar. O zaman hiçbir şey yapmamanın sonucu kendiliğinden işler: kuyular izinsiz açılmaya devam eder, adaya fon gitmez. Karar vermemek de bir karardır.
- **Kapanan Kapılar.** Bazı kararlar ileride bazı seçenekleri kalıcı olarak kapatır.
  - Kapanan seçenek mektupta silik ve okunmaz görünür; üstünde yalnızca **"KAPANDI · yıl"** damgası olur.
  - Ne olduğu ve neden kapandığı Deniz'in mektuplarında ve bitiş ekranında ortaya çıkar.
- **Final: Deniz olursun.** 2075'te görevin biter ve Konsey yeni başkanını seçer. Bu kez insanlar senden, yani denizden bir şey ister:
  - Losa büyükannesinin adasına dönmek ister.
  - Dr. Nil caretta yavrularının sana koşmasını bekler.
  - Mert, Konya'daki tarla için toprağın altındaki suyunu geri ister.

  Kapattığın kapıları veremezsin. Koltuk miras kalmaz; miras kalan şey dünyadır.

---

## Hızlı başlangıç

Kurulum ya da build adımı yok. `index.html`, `data.js`, `engine.js` ve `ui.js` aynı klasörde durmalı.

**Tarayıcıda açmak:** `index.html` dosyasına çift tıklayın.

**Yerel sunucuyla açmak** (önerilir; fontlar ve kayıt sistemi daha sorunsuz çalışır):

```bash
python -m http.server 8765
```

Sonra tarayıcıda `http://localhost:8765` adresini açın. Telefon görünümünü denemek için tarayıcının geliştirici araçlarında mobil görünümü açın (Ctrl+Shift+M).

**Denge simülasyonu ve içerik kontrolü** (Node gerekir):

```bash
node tools/sim.js 3000            # iki mod da
node tools/sim.js 3000 --mod hizli --detay
```

Sekiz oyuncu tipiyle binlerce oyun oynar. Her tip önce hangi şişeyi açacağını, sonra cevabını seçer. Çıktıda şunlar var:
- sonların dağılımı,
- 2075 ısınması,
- kapanan kapılar,
- batan şişeler.

Kartlardaki hatalı kilit, eksik zincir kartı, eksik mektup satırı ya da `idle`'ı olmayan süreli kart varsa da söyler. İçerik değiştirdikten sonra çalıştırın.

## Nasıl oynanır

| Kontrol | Ne yapar |
|---|---|
| Şişeye dokun ya da `1` / `2` | O şişeyi açar; diğeri denize döner |
| Cevaba dokun ya da `1` `2`, `←` `→` | Cevabı seçer; mektup şişeye girip denize atılır |
| Cevabın üzerine gel | Hangi testilerin değişeceğini gösterir: testi çalkalanır, altında küçük ya da büyük bir nokta belirir. Yönünü göstermez. |
| 🔒 silik cevap | Kapanmış kapı. Seçilemez; denersen mektup sallanır. |
| `D` ya da DOSYA | Arka plandaki dünyanın raporu |

**Amaç:** Dört testiyi dengede tutmak: 🌳 **Doğa**, 👥 **Uluslar**, 🪙 **Fon**, ⚡ **Enerji**. Biri kurursa (0) ya da taşarsa (100) zaman çizgisi kopar.

**İki mod:**

| Mod | Tur | Karar | Süre | Kimin için |
|---|---|---|---|---|
| Hızlı oyun | 2 yıl | ~25 | ~5 dk | Jüri ve fuar |
| Tam oyun | 1 yıl | ~49 | ~10 dk | Bütün hikâye |

Hızlı oyunda kararların arka plandaki etkisi de iki yıllık sayılır. Denge iki mod için ayrı ölçüldü.

## Arka plandaki dünya

Dört testi kararlarla anında değişir. Arkada ise her yıl ilerleyen bir dünya modeli çalışır ve testileri yavaşça iter (etiketlerin yanındaki ▲▼). **DOSYA** düğmesi (ya da `D` tuşu) bu dünyayı gösterir:

| Sistem | Nasıl çalışır | Neyi iter |
|---|---|---|
| Isınma | Birikimli CO₂’den: her 1000 milyar ton ≈ +0,45°C (IPCC AR6). Metan kesintisi düşürür, aerosol yalnızca maskeler | Ekosistemler, talep, afetler |
| Deniz seviyesi | Isınmayla hızlanır, emisyon dursa da yükselir | Afet zararı |
| Temiz enerji / fosil / talep | Temiz enerji S-eğrisiyle büyür; fosil yavaş emekliye ayrılır; arz yetmezse piyasa gaz kurar; fazla arz talebi şişirir | Enerji, emisyon |
| Ormanlar, okyanuslar | Kararlar ve ısınma | Doğa, karbon tutumu |
| Uyum kapasitesi | Yatırımla artar, bakımsız kalınca azalır; afet zararını belirler | Fon, Uluslar |
| Güven ve adalet | Bedeli kime yüklediğine göre | Uluslar |

Dünya bir eşiği geçince **olay şişesi** gelir; bu şişe bekletilemez. Yedi olay var:
- mercanların kaybı (1,7°C),
- Amazon’un kuruması,
- şebeke çöküşü,
- büyük afet,
- 48 derecelik sıcak dalgası,
- göç dalgası,
- temiz enerjinin fosilden ucuzlaması (olumlu eşik).

Üstteki pencere, bugünkü dünyanın yeni karar alınmazsa 2075’e nasıl varacağının tahminidir. Denizde süzülen şişeler, sonucu yıllar sonra dönecek kararların ve ertelediğin mektuplardır; yalnızca dönecekleri yılı gösterirler. Mavi Akdeniz sonu için dört denge 30–70 arasında olmalı ve 2075 ısınması 2,2°C’yi geçmemeli.

## Özellikler

- **71 karar kartı ve 7 olay kartı, 26 karakter.** Pasifik'ten Tala, Batı Afrika'dan Ama, Pencaplı çiftçi Ravi, Amazon'dan Maria, Konyalı Ayşe Teyze, Antalyalı balıkçı Hasan, simit hırsızı martı…
- **Süreli mektuplar:** 26 kartın son yılı var. Açılmadan batan şişe, hiçbir şey yapmamanın sonucunu (`idle`) kendiliğinden işletir; batış tek başına oyunu bitirmez.
- **Kapanan Kapılar:** 12 karar kilidi, 2 eşik olayı kilidi (Amazon, mercanlar) ve 2 iklim kilidi (ısınma çok yükselirse ya da emisyon düşmezse). 2029'daki Afrika kartında her oyuncu ilk kilidi görür: açılıştaki Fon kararına göre ya kömür ya güneş kapanır.
- **Final, Deniz olursun:** En fazla 4 kapı ve son söz. Bitiş ekranı Deniz'e bıraktığın kapıları ve açılmadan batan şişeleri listeler.
- **İklim modeli:** 2075 sıcaklığı ve deniz seviyesi arka plandaki dünyadan hesaplanır (yukarıdaki tablo). Aerosol ısınmayı maskeler ama deniz seviyesini durdurmaz.
- **Deniz'in mektupları:** 2032'den 2068'e kadar altı yılda bir gelir. Mektuplarda şunlar geçer: en kritik denge, ısınma düzeyi, kapanan kapılar ve verdiğin kararlar. Aynı cümle tekrar etmez.
- **Canlı 2075 sahnesi:** Ağaçlar, ısınmayla kızaran gökyüzü, aerosolle beyazlayan hava, deniz seviyesi, şehir ışıkları, türbinler, paneller ve denizde dönmeyi bekleyen şişeler.
- **12 son:** 8 kaybetme sonu (Halksız Yeşil, Ekleme Tuzağı, Satılık Konsey…) ve 4 başarı sonu (biri gizli). Bulunan sonlar tarayıcıda kaydedilir.
- **Kaynaklar:** Bitiş ekranında oyundaki gerçek bilgilerin kaynakları listelenir.
- **Erişim:** Telefonda ve bilgisayarda çalışır, ses açılıp kapatılabilir, `prefers-reduced-motion` ayarına uyar.

## Repo yapısı

```
index.html              Sayfa iskeleti ve stiller (Akdeniz paleti)
data.js                 İçerik: karakterler, kartlar, kilit sebepleri, final, Deniz'in mektupları, sonlar, kaynaklar
engine.js               Oyun kuralları (DOM'a dokunmaz): gelgit ve şişeler, kilitler, iklim modeli, mektup metinleri
ui.js                   Arayüz: portreler, 2075 sahnesi, testiler, şişeler ve mektup, ekranlar
tools/sim.js            Denge simülasyonu ve içerik kontrolü
docs/                   Yapılanlar ve yapılacaklar; TASARIM ve İÇERİK-REHBERİ ilk sürüme göre (güncellenecek)
```

## İçerik alanları (data.js)

| Alan | Anlamı |
|---|---|
| `d` `h` `e` `n` | Doğa, Uluslar, Fon, Enerji üzerindeki etki |
| `tk` `fk` `tal` `r` `tg` | Arka plan: temiz kapasite, fosil kapasite, talep, temiz büyüme hızı, talep artışı |
| `or` `ok` `uy` `gv` `mt` `rm` | Arka plan: orman, okyanus, uyum, güven ve adalet, metan programı, karbon çekme |
| `ev:1`, `fire` | Olay kartı (koşulu engine.js `TRIG` içinde); `fire` gelirken dünyaya etkisi |
| `f` | Seçim bir bayrak bırakır (mektuplar, sahne ve kilitler bunu kullanır) |
| `lock:["bayrak"]` | Bu bayrak varsa seçenek kapanır; sebebi `LOCKS` içinde yazar |
| `nx:["kart",yıl]` | Zincirleme kart ve kaç yıl sonra geleceği (denizde şişe olarak görünür) |
| `idle:"l"` / `"r"` | Şişe son yılına (`max`) kadar açılmazsa batar ve bu seçenek kendiliğinden işler |
| `at` / `min` / `max` / `req` / `chain` / `old` | Zorunlu yıl / yıl aralığı / gerekli bayrak / yalnız zincirle gelir / saçlar ağarır |
| `EPI` | Finaldeki kartlar; `need` bayraklarından biri varsa gelir |

## Yayınlama (jam teslimi)

**itch.io:**
1. `index.html`, `data.js`, `engine.js` ve `ui.js` dosyalarını birlikte zip'leyin.
2. itch.io'da yeni proje açın; *Kind of project* olarak *HTML* seçin.
3. Zip'i yükleyin ve *This file will be played in the browser* seçeneğini işaretleyin.
4. Pencere boyutunu 440 × 820 yapın ve "Mobile friendly" seçeneğini açın.

**GitHub Pages:** Repo → Settings → Pages → *Deploy from a branch* → `main` / `root`. Oyun birkaç dakika içinde `https://edakucukkara.github.io/gameup-gamejam-team-Garnet/` adresinde açılır.

## Takım

Takım Garnet · GameUp Game Jam 2026
