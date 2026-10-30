# Gelecekten Mektup

> 2075'teki torunun Deniz sana mektup yazıyor. Bugün verdiğin her karar onun dünyasını değiştiriyor ve bazı kapıları sonsuza dek kapatıyor.

**GameUp Game Jam · Takım Garnet**
**Tema:** İklim · COP31 Türkiye (Antalya)

*Lapse* ve *Reigns* tarzında, kartları sağa ya da sola kaydırarak oynanan, hikâye odaklı bir karar oyunu. Oyuncu 2026'da kurgusal **Küresel İklim Konseyi**'nin başına seçiliyor ve 2075'e kadar dünyanın iklim kararlarını veriyor. Torunu Deniz ona Antalya'dan, 2075'ten mektup yazıyor.

**Türden farkı: Kapanan Kapılar.** Reigns'te iki seçenek de hep oradadır; iklimde değil. Bazı kararlar ileride bazı seçenekleri kalıcı olarak kapatır (kömür santralinin ömrünü uzatmak, ormanın ortasından yol geçirmek, sınırsız kuyu izni vermek…). Kapanan seçenek kartta kilitli görünür ve üstünde **"KAPANDI · yıl — sebep"** damgası olur. 2075'te Konsey'in başına **Deniz geçer** ve senin açık bıraktığın kapılarla karar verir.

---

## Hızlı başlangıç

Kurulum ya da build adımı yok. `index.html`, `data.js`, `engine.js` ve `ui.js` aynı klasörde durmalı.

**Tarayıcıda açmak:** `index.html` dosyasına çift tıklayın.

**Yerel sunucuyla açmak (önerilir; fontlar ve kayıt sistemi daha sorunsuz çalışır):**

```bash
python -m http.server 8765
```

Sonra tarayıcıda `http://localhost:8765` adresini açın. Telefon görünümünü denemek için tarayıcının geliştirici araçlarında mobil görünümü (Ctrl+Shift+M) açın.

**Denge simülasyonu ve içerik kontrolü** (Node gerekir):

```bash
node tools/sim.js 3000
```

Dört oyuncu tipiyle (rastgele, yeşil, kahverengi, dengeli) binlerce oyun oynar; sonların dağılımını, 2075 ısınmasını ve kaç kapının kapandığını yazar. Kartlardaki hatalı kilit, eksik zincir kartı ya da eksik mektup satırı varsa da söyler. İçerik değiştirdikten sonra çalıştırın.

## Nasıl oynanır

| Kontrol | Ne yapar |
|---|---|
| Kartı sola / sağa sürükle | Seçeneği seçer |
| `←` / `→` tuşları | Klavyeyle seçer |
| Alttaki düğmeler | Tıklayarak seçer, üzerine gelince önizleme gösterir |
| Göstergelerin altındaki noktalar | O seçimin hangi dengeleri değiştireceğini gösterir (küçük nokta az, büyük nokta çok). Yönünü göstermez. |
| 🔒 kilitli seçenek | Seçilemez; kart sallanır ve damga kapının neden kapandığını hatırlatır. |

**Amaç:** Dört dengeyi korumak: 🌳 **Doğa**, 👥 **Uluslar**, 🪙 **Fon**, ⚡ **Enerji**.
Biri **0'a inerse** ya da **100'e çıkarsa** zaman çizgisi kopar ve oyun biter. 2075'e ulaşırsan Deniz Konsey'in başına geçer, kalan kapılarla son kararlarını verir ve son mektubunu yazar.

## Özellikler

- **69 karar kartı**, 26 karakter: Pasifik'ten Tala, Batı Afrika'dan Ama, Pencaplı çiftçi Ravi, Amazon'dan Maria, Konyalı Ayşe Teyze, Antalyalı balıkçı Hasan, simit hırsızı martı…
- **Kapanan Kapılar:** 9 karar kilidi ve 2 iklim kilidi (ısınma çok yükselirse ya da emisyon düşmezse); 2029'daki Afrika kartında her oyuncu ilk kilidi görür (açılıştaki Fon kararına göre ya kömür ya güneş kapanır).
- **Deniz'in finali:** 2075'te Deniz koltuğa oturur; en fazla 4 dosya + kapanış konuşması. Bitiş ekranı Deniz'e bıraktığın kapıları listeler.
- **Doğru iklim modeli:** 2075 sıcaklığı ve deniz seviyesi, emisyon kararlarından (kartlardaki `c`) IPCC AR6 senaryolarına göre hesaplanır (+1,8°C ile +3,0°C, 32 ile 45 cm arası). Aerosol ısınmayı maskeler ama deniz seviyesini durdurmaz.
- **Deniz'in mektupları:** 2032'den 2068'e kadar altı yılda bir gelir; en kritik dengeden, ısınma düzeyinden, kapanan kapılardan ve verdiğin kararlardan bahseder. Aynı cümle tekrar etmez.
- **Canlı 2075 sahnesi:** ağaçlar, ısınmayla kızaran gökyüzü, aerosolle beyazlayan hava, deniz seviyesi, şehir ışıkları, türbinler, paneller.
- **12 son:** 8 kaybetme sonu (Halksız Yeşil, Ekleme Tuzağı, Satılık Konsey…), 4 başarı sonu (biri gizli). Bulunan sonlar tarayıcıda kaydedilir.
- **Kaynaklar:** Bitiş ekranında oyundaki gerçek bilgilerin kaynakları listelenir.
- Telefon ve bilgisayarda çalışır, ses açılıp kapatılabilir, `prefers-reduced-motion` ayarına uyar.

## Repo yapısı

```
index.html              Sayfa iskeleti ve stiller (Akdeniz paleti)
data.js                 İçerik: karakterler, kartlar, kilit sebepleri, Deniz'in finali, mektuplar, sonlar, kaynaklar
engine.js               Oyun kuralları (DOM'a dokunmaz): kart seçimi, kilitler, iklim modeli, mektup metinleri
ui.js                   Arayüz: portreler, 2075 sahnesi, göstergeler, kaydırma, ekranlar
tools/sim.js            Denge simülasyonu ve içerik kontrolü
docs/                   Tasarım dokümanı, içerik rehberi, yapılacaklar (ilk sürüme göre; güncellenecek)
```

## İçerik alanları (data.js)

| Alan | Anlamı |
|---|---|
| `d` `h` `e` `n` | Doğa, Uluslar, Fon, Enerji üzerindeki etki |
| `c` | Emisyon etkisi (eksi = azaltır); 2075 sıcaklığını ve deniz seviyesini belirler |
| `f` | Seçim bir bayrak bırakır (mektuplar, sahne, kilitler bunu kullanır) |
| `lock:["bayrak"]` | Bu bayrak varsa seçenek kapanır; sebep `LOCKS` içinde yazar |
| `nx:["kart",yıl]` | Zincirleme kart, kaç yıl sonra geleceği |
| `at` / `min` / `max` / `req` / `chain` / `old` | Zorunlu yıl / yıl aralığı / gerekli bayrak / yalnız zincirle gelir / saçlar ağarır |
| `EPI` | Deniz'in finalindeki kartlar; `need` bayraklarından biri varsa gelir |

## Yayınlama (jam teslimi)

**itch.io:** `index.html`, `data.js`, `engine.js` ve `ui.js` dosyalarını birlikte zip'leyin → itch.io'da yeni proje → *Kind of project: HTML* → zip'i yükleyin → *This file will be played in the browser* seçeneğini işaretleyin. Önerilen pencere boyutu: 440 × 820, "Mobile friendly" açık.

**GitHub Pages:** Repo → Settings → Pages → *Deploy from a branch* → `main` / `root`. Oyun birkaç dakika içinde `https://edakucukkara.github.io/gameup-gamejam-team-Garnet/` adresinde açılır.

## Takım

Takım Garnet · GameUp Game Jam 2026
