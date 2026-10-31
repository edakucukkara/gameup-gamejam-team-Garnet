# Gelecekten Mektup

> 2075'teki torunun Deniz sana mektup yazıyor. Masana her yıl dosyalar geliyor ve yalnız birine vaktin var. Verdiğin her karar Deniz'in dünyasını değiştiriyor; bazıları kapıları sonsuza dek kapatıyor.

**GameUp Game Jam · Takım Garnet**
**Tema:** İklim · COP31 Türkiye (Antalya)

Hikâye odaklı bir karar oyunu. Oyuncu 2026'da kurgusal **Küresel İklim Konseyi**'nin başına seçiliyor ve 2075'e kadar dünyanın iklim kararlarını veriyor. Mektupları torunu **Deniz** yazıyor; ona "Dede" ya da "Nine" diye sesleniyor.

## Oyunu farklı kılan şeyler

- **Başkan'ın masası.** Her yıl masana dünyanın dört bir yanından dosyalar gelir: teklifler, krizler, eski kararlarının sonuçları. Genelde iki, yoğun günlerde üç dosya olur ve **yalnız birine vaktin olur**.
  - Açmadığın dosya bekler, birkaç yıl sonra yine gelir.
  - Dosyanın son günü geçerse fırsat kaçar ve hiçbir şey yapmamanın sonucu kendiliğinden işler: kuyular izinsiz açılır, adaya fon gitmez. Karar vermemek de bir karardır.
- **Gelecekten not.** Ara sıra, her turda değil, Deniz masadaki dosyalardan biri hakkında 2075'ten kısa bir not sıkıştırır. Not ne yapacağını söylemez; o kararın ileride nasıl hatırlandığını ima eder.
- **Kapanan Kapılar.** Bazı kararlar ileride bazı seçenekleri kalıcı olarak kapatır.
  - Kapıyı kapatan kararı verdiğin anda kısa bir not çıkar: "Bu kararın bir bedeli olabilir…"
  - Yıllar sonra o konu masana geldiğinde kapalı seçenek görünmez; yalnızca açık kalan yol ve "Bu konuda elin bağlı" notu görünür.
- **Final ve çemberin kapanışı.** 2075'te görevin biter, Konsey yeni başkanını seçer ve sen bir süre Deniz'in gözünden onun hayatındaki fırsatlarla yüzleşirsin. Kapattığın kapılar onun önünde de kapalıdır.
  - Ardından "Bu kadarını başardık" ekranı açık kalanları ve olabilecekleri listeler: *Peki, daha iyisi olabilir miydi?*
  - Son sahnede Deniz 2026'daki büyüğüne ilk mektubu yazar. Bu, oyunun başında okuduğun mektuptur. İyi bir sona ulaştıysan bunun yerine bir teşekkür mektubu yazar. Mektup katlanır, zarfa girer ve 2075'ten 2026'ya uçar.

---

## Hızlı başlangıç

Kurulum ya da build adımı yok. `index.html`, `data.js`, `engine.js` ve `ui.js` aynı klasörde durmalı.

**Tarayıcıda açmak:** `index.html` dosyasına çift tıklayın.

**Yerel sunucuyla açmak** (önerilir; fontlar ve kayıt sistemi daha sorunsuz çalışır):

```bash
python -m http.server 8765
```

Sonra tarayıcıda `http://localhost:8765` adresini açın. Telefon görünümünü denemek için tarayıcının geliştirici araçlarında mobil görünümü açın (Ctrl+Shift+M).

**Demo modu:** Açılış ekranının sağ altındaki "Demo modu" bağlantısına basıp sonra Dede ya da Nine'yi seçin. Her tur 2 yıl ilerler ve mektuplar daha hızlı yazılır. Oynanış videosu çekmek için.

**Denge simülasyonu ve içerik kontrolü** (Node gerekir):

```bash
node tools/sim.js 3000            # tam oyun ve demo modu
node tools/sim.js 3000 --mod tam --detay
```

Sekiz oyuncu tipiyle binlerce oyun oynar. Her tip önce hangi dosyayı açacağını, sonra kararını seçer. Çıktıda sonların dağılımı, 2075 ısınması, kapanan kapılar ve vakti dolan dosyalar var. Kartlardaki hatalı kilit, eksik zincir kartı, eksik mektup satırı ya da `idle`'ı olmayan süreli kart varsa da söyler. İçerik değiştirdikten sonra çalıştırın.

## Nasıl oynanır

| Kontrol | Ne yapar |
|---|---|
| Dosyaya dokun ya da `1` `2` `3` | O dosyayı açar; diğerleri bekler |
| Karara dokun ya da `1` `2`, `←` `→` | Kararı verir |
| Kararın üzerine gel | Hangi dengelerin değişeceğini gösterir: göstergenin altında küçük ya da büyük bir nokta belirir. Yönünü göstermez. Sahnede de kararın izi soluk bir önizleme olarak görünür. |
| `R` ya da RAPOR | Dünya raporu: arka plandaki dünyanın durumu ve danışman notu |

**Amaç:** Dört dengeyi korumak: 🌳 **Doğa**, 👥 **Uluslar**, 🪙 **Fon**, ⚡ **Enerji**. Biri sıfırlanırsa (0) ya da taşarsa (100) zaman çizgisi kopar.

## Arka plandaki dünya

Dört denge kararlarla anında değişir. Arkada ise her yıl ilerleyen bir dünya modeli çalışır ve dengeleri yavaşça iter (etiketlerin yanındaki ▲▼). **RAPOR** düğmesi bu dünyayı oyuncunun dilinde gösterir: 2075 ısınma tahmini bir ölçek üzerinde, bu yılın dengelere etkisi, temiz enerji payı, ormanlar, okyanuslar, afetlere hazırlık, güven ve adalet çubukları ve en zayıf noktaya göre bir danışman notu.

| Sistem | Nasıl çalışır | Neyi iter |
|---|---|---|
| Isınma | Birikimli CO₂’den: her 1000 milyar ton ≈ +0,45°C (IPCC AR6). Metan kesintisi düşürür, aerosol yalnızca maskeler | Ekosistemler, talep, afetler |
| Deniz seviyesi | Isınmayla hızlanır, emisyon dursa da yükselir | Afet zararı |
| Temiz enerji / fosil / talep | Temiz enerji S-eğrisiyle büyür; fosil yavaş emekliye ayrılır; arz yetmezse piyasa gaz kurar; fazla arz talebi şişirir | Enerji, emisyon |
| Ormanlar, okyanuslar | Kararlar ve ısınma | Doğa, karbon tutumu |
| Uyum kapasitesi | Yatırımla artar, bakımsız kalınca azalır; afet zararını belirler | Fon, Uluslar |
| Güven ve adalet | Bedeli kime yüklediğine göre | Uluslar |

Dünya bir eşiği geçince bir **olay dosyası** gelir; bekletilemez. Yedi olay var: mercanların kaybı (1,7°C), Amazon’un kuruması, şebeke çöküşü, büyük afet, 48 derecelik sıcak dalgası, göç dalgası ve olumlu eşik olarak temiz enerjinin fosilden ucuzlaması.

Üstteki pencere, bugünkü dünyanın yeni karar alınmazsa 2075’e nasıl varacağının tahminidir. Mavi Akdeniz sonu için dört denge 30–70 arasında olmalı ve 2075 ısınması 2,2°C’yi geçmemeli.

## Özellikler

- **71 karar kartı ve 7 olay kartı, 26 karakter.** Pasifik'ten Tala, Batı Afrika'dan Ama, Pencaplı çiftçi Ravi, Amazon'dan Maria, Konyalı Ayşe Teyze, Antalyalı balıkçı Hasan, oyuncunun kızı Ece, simit hırsızı martı…
- **Süreli dosyalar:** 26 kartın son günü var. Vakti dolan dosya, hiçbir şey yapmamanın sonucunu (`idle`) kendiliğinden işletir; bu tek başına oyunu bitirmez.
- **Kapanan Kapılar:** 12 karar kilidi, 2 eşik olayı kilidi (Amazon, mercanlar) ve 2 iklim kilidi. 14 kapı için karar anında yumuşak bir bildirim yazıldı (`DOORS`).
- **Gelecekten notlar:** 28 dosya için Deniz'in ipucu notları (`HINTS`). En erken 2028'de, en sık dört turda bir ve yalnızca bazen gelir.
- **Deniz'in mektupları:** 2032'den 2068'e kadar altı yılda bir gelir; her biri Deniz'in farklı bir yaşından (7, 9 … 19), damgada yazıldığı yıl. Mektuplarda en kritik denge, ısınma düzeyi, kapanan kapılar ve verdiğin kararlar geçer. Aynı cümle tekrar etmez. 2049'dan önce kaybedersen Deniz belki hiç doğmamıştır.
- **Kararlarla değişen 2075 sahnesi:** Önemli her karar sahneye kalıcı bir iz bırakır (santral, otoyol, obruk, otel, carettalar, mangrov, beton set, türbinler, tren, ada…). Martılar, insanlar, jaguar, carettalar, yunus, trafik ve yelkenliyle canlı bir sahne.
  - Deniz 2049'da doğar ve kumsalda büyür; çocukken uçurtma uçurur. Onu kıyıya götürdüysen yanında büyüğüyle kumdan kale yapar.
- **12 son:** 8 kaybetme sonu (Halksız Yeşil, Ekleme Tuzağı, Satılık Konsey…) ve 4 başarı sonu (biri gizli). Bulunan sonlar tarayıcıda kaydedilir.
- **Kaynaklar:** Bitiş ekranında oyundaki gerçek bilgilerin kaynakları listelenir.
- **Erişim:** Telefonda ve bilgisayarda çalışır, ses açılıp kapatılabilir, `prefers-reduced-motion` ayarına uyar.

## Repo yapısı

```
index.html              Sayfa iskeleti ve stiller (retro poster paleti)
data.js                 İçerik: karakterler, kartlar, kilit sebepleri, kapı bildirimleri, gelecekten notlar, final, mektuplar, sonlar, kaynaklar
engine.js               Oyun kuralları (DOM'a dokunmaz): gündem ve dosyalar, kilitler, iklim modeli, mektup metinleri
ui.js                   Arayüz: portreler, 2075 sahnesi, göstergeler, masa, açık dosya, final ve çember sahnesi, rapor
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
| `lock:["bayrak"]` | Bu bayrak varsa seçenek kapanır; sebebi `LOCKS`, karar anındaki bildirim `DOORS` içinde |
| `nx:["kart",yıl]` | Zincirleme kart ve kaç yıl sonra geleceği |
| `idle:"l"` / `"r"` | Dosya son gününe (`max`) kadar açılmazsa vakti dolar ve bu seçenek kendiliğinden işler |
| `at` / `min` / `max` / `req` / `chain` / `old` | Zorunlu yıl / yıl aralığı / gerekli bayrak / yalnız zincirle gelir / saçlar ağarır |
| `HINTS` | Kart id'sine göre Deniz'in gelecekten notu |
| `EPI` | Finaldeki kartlar; `need` bayraklarından biri varsa gelir |
| `{E}` `{H}` `{Y}` | Metinde Ece'nin hitabı (Baba/Anne), Deniz'in hitabı (Dede/Nine), yıl |

## Yayınlama (jam teslimi)

**itch.io:**
1. `index.html`, `data.js`, `engine.js` ve `ui.js` dosyalarını birlikte zip'leyin.
2. itch.io'da yeni proje açın; *Kind of project* olarak *HTML* seçin.
3. Zip'i yükleyin ve *This file will be played in the browser* seçeneğini işaretleyin.
4. Pencere boyutunu 440 × 820 yapın ve "Mobile friendly" seçeneğini açın.

**GitHub Pages:** Repo → Settings → Pages → *Deploy from a branch* → `main` / `root`. Oyun birkaç dakika içinde `https://edakucukkara.github.io/gameup-gamejam-team-Garnet/` adresinde açılır.

## Takım

Takım Garnet · GameUp Game Jam 2026
