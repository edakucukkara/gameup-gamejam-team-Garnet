<p align="center"><img src="icons/icon-512.png" width="128" alt="Gelecekten Mektup simgesi: gün batımında Antalya denizinin üstünde uçak postası zarfı"></p>

<h1 align="center">Gelecekten Mektup</h1>

<p align="center"><b>2075'teki torunun Deniz sana mektup yazıyor.<br>Masana gelen dosyaların hepsine yetişemeden verdiğin her karar onun dünyasını değiştiriyor.</b></p>

<p align="center">
  <a href="#indir"><b>▶ İndir ve oyna</b></a> ·
  <a href="docs/TASARIM.md">Tasarım</a> ·
  <a href="#degisiklik">Değişiklik yapmak</a> ·
  <a href="docs/TESLIM.md">Teslim</a>
</p>

<p align="center">GameUp Game Jam 2026 · Takım Garnet · Tema: İklim · COP31 Türkiye (Antalya)</p>

---

<a id="indir"></a>
## İndir ve oyna

Kurulum gerekmez; oyun tarayıcıda açılır.

1. Bu sayfanın üstündeki yeşil **Code** düğmesi → **Download ZIP**.
2. ZIP'i bir klasöre çıkarın (sağ tık → *Tümünü ayıkla*).
3. Klasördeki **`index.html`** dosyasına çift tıklayın. Oyun varsayılan tarayıcıda açılır.
   - Windows'ta **`oyna.bat`**'a çift tıklamak daha iyidir: oyunu küçük bir yerel sunucuyla açar, yazı tipleri ve kayıtlar her tarayıcıda düzgün çalışır.

**Başkasına göndermek için tek dosya:** Repo klasöründe `py tools/tekdosya.py` çalıştırın → `dist/Gelecekten-Mektup.html`. Bu tek dosya, çift tıklayınca açılan oyunun tamamıdır; jüriye ya da arkadaşlara WhatsApp, Drive veya e-postayla gönderilebilir.

**Tarayıcıda link (ileride):** Repo herkese açılıp GitHub Pages açılınca oyun https://edakucukkara.github.io/gameup-gamejam-team-Garnet/ adresinde de oynanır ve telefona uygulama gibi kurulabilir (adımlar aşağıda, *Yayınlama*).

---

## Oyun

Yıl 2026. Kurgusal **Küresel İklim Konseyi**'nin başına seçildin. Masanda bir mektup duruyor: 2075'ten, torunun **Deniz**'den. 2075'e kadar dünyanın iklim kararlarını sen vereceksin.

- **Başkan'ın masası.** Her yıl masana dünyanın dört bir yanından dosyalar gelir: Pasifik'te batan bir ada, Konya'da kuruyan kuyular, Belek'te caretta yuvaları, Amazon'dan geçecek bir otoyol. Genelde iki, yoğun günlerde üç dosya olur ve **yalnız birine vaktin olur**. Bekleyen dosyanın son günü geçerse fırsat kaçar ve karar senin yerine verilir: karar vermemek de bir karardır.
- **Dört denge.** 🌳 Doğa, 👥 Uluslar, 🪙 Fon, ⚡ Enerji. Biri sıfırlanır ya da taşarsa zaman çizgisi kopar. Yalnızca "yeşil" seçmek de kaybettirir.
- **Kapanan kapılar.** Bazı kararlar ileride bazı seçenekleri sonsuza dek kapatır. Kararı verdiğin anda "Bu kararın bir bedeli olabilir" notu çıkar; yıllar sonra o konu masana geldiğinde elin bağlıdır.
- **Gelecekten not.** Arada bir Deniz, masadaki dosyalardan biri hakkında 2075'ten küçük bir not sıkıştırır.
- **Yaşayan bir dünya.** Arkada gerçek verilere dayanan basit bir iklim modeli çalışır: birikimli CO₂, deniz seviyesi, enerji sistemi, ormanlar, okyanuslar, afetlere hazırlık, güven. Eşikler aşılınca olaylar gelir. Üstteki "Deniz'in dünyası" penceresi kararlarınla canlı olarak değişir; Deniz 2049'da doğar ve kumsalda büyür.
- **Final ve çember.** 2075'e ulaşırsan bir süre Deniz'in gözünden bakarsın. Sonra "Bu kadarını başardık… Peki, daha iyisi olabilir miydi?" ve son sahne: Deniz 2026'daki büyüğüne, oyunun başında okuduğun o ilk mektubu yazar. İyi bir sona ulaştıysan bunun yerine bir teşekkür mektubu yazar.

**12 son** · yaklaşık 10 dakika · telefon ve bilgisayar · Türkçe · telefona uygulama gibi kurulabilir, internetsiz çalışır.

### Kontroller
| | |
|---|---|
| Dosyaya dokun ya da `1` `2` `3` | O dosyayı açar; diğerleri bekler |
| Karara dokun ya da `1` `2`, `←` `→` | Kararı verir |
| Kararın üzerine gel | Değişecek dengelerin altında nokta çıkar (küçük az, büyük çok; yön gösterilmez). Sahnede kararın izi soluk bir önizleme olarak görünür. |
| `R` ya da RAPOR | Dünya raporu: 2075 ısınma tahmini, sistemlerin durumu, danışman notu |

### COP31 ile bağlantı
COP31'in odak alanlarının hepsi dosyalara dağıtıldı: yenilenebilir enerji, karbon ayak izi, iklime dirençli şehirler, gıda güvenliği, okyanuslar, iklim eğitimi ve sıfır atık. Kapanan kapılar fikri Almanya Anayasa Mahkemesi'nin Neubauer kararına (2021) dayanır: bugün ertelenen her karar gelecek kuşakların seçeneklerini daraltır. Ayrıntılı paragraf: [docs/TESLIM.md](docs/TESLIM.md).

---

## Geliştirme

Kurulum ya da build adımı yok: düz HTML, CSS ve JavaScript. Gerekenler: Git, bir tarayıcı ve Python (yalnızca yerel sunucu ve paket betikleri için; Windows'ta `py`).

<a id="degisiklik"></a>
### Takım için: değişiklik yapmak
`main` her zaman oynanabilir son hâldir. Değişiklikleri ayrı bir dalda yapıp PR ile `main`'e alıyoruz.

**İlk kez (bir kere):**
```bash
git clone https://github.com/edakucukkara/gameup-gamejam-team-Garnet.git
```

**Her değişiklikte:**
1. En son hâli alın ve yeni bir dal açın (dal adı işi anlatsın):
   ```bash
   git switch main
   ```
   ```bash
   git pull
   ```
   ```bash
   git switch -c yeni-kartlar
   ```
2. Değişikliği yapın. Neyin nerede olduğu:
   | Ne değiştirmek istiyorsunuz? | Dosya |
   |---|---|
   | Kart metni, yeni kart, karakter, mektup, not, son | `data.js` (rehber: [docs/ICERIK-REHBERI.md](docs/ICERIK-REHBERI.md)) |
   | Kurallar, iklim modeli, mektup kurgusu | `engine.js` |
   | Ekranlar, 2075 sahnesi, animasyonlar | `ui.js` |
   | Renkler, yazı tipleri, yerleşim | `index.html` (üstteki `:root` renkleri) |
3. Oyunu açıp deneyin (`oyna.bat` ya da aşağıdaki komut) ve **denge testini** çalıştırın: `http://localhost:8765/tools/test.html` → yeşil olmalı.
4. Kaydedip gönderin:
   ```bash
   git add -A
   ```
   ```bash
   git commit -m "Ne değişti, kısaca"
   ```
   ```bash
   git push -u origin yeni-kartlar
   ```
5. GitHub'da çıkan **Compare & pull request** düğmesiyle PR açın; diğer kişi bakıp birleştirir.
6. Birleştikten sonra jüriye gidecek dosyayı yenileyin: `py tools/tekdosya.py`.

Yaptığınız önemli değişiklikleri ve nedenlerini [docs/YAPILANLAR.md](docs/YAPILANLAR.md)'ye, açık işleri [docs/YAPILACAKLAR.md](docs/YAPILACAKLAR.md)'ye yazın.

### Oyunu çalıştırmak
Oyun yerel bir sunucuyla açılmalı (dosyaya çift tıklayınca da açılır ama fontlar, kayıt ve uygulama kurulumu sunucuyla düzgün çalışır).

- **Windows:** `oyna.bat` dosyasına çift tıklayın. Tarayıcıda oyun açılır; kapatmak için siyah pencereyi kapatın.
- **Elle (Windows):**
  ```bash
  py -m http.server 8765
  ```
- **Mac / Linux:**
  ```bash
  python3 -m http.server 8765
  ```

Sonra `http://localhost:8765` adresini açın. Telefon görünümü için F12 → Ctrl+Shift+M.

**Sorun çıkarsa:**
- **`python` bulunamadı ya da Microsoft Store açılıyor:** Windows'ta `python` yerine `py` yazın.
- **"Address already in use" ya da sayfa eski oyunu gösteriyor:** 8765'i başka bir sunucu kullanıyordur. Başka bir port deneyin (`py -m http.server 8770` → `http://localhost:8770`) ya da eski pencereyi kapatın.
- **PowerShell açılırken conda hata raporu yazıyor:** Bu oyunla ilgili değil, Anaconda'nın başlangıç betiğinden geliyor. Komutlar yine çalışır.

**Demo modu:** Açılış ekranının sağ altındaki "Demo modu" → sonra Dede ya da Nine. Her tur 2 yıl ilerler, mektuplar hızlı yazılır. Oynanış videosu çekmek için.

### Test
Kart, mektup ya da kilit değiştirdikten sonra çalıştırın. Oyunu farklı oyuncu tipleriyle binlerce kez oynar ve içerikteki hataları arar (eksik zincir kartı, tanımsız kilit, eksik mektup satırı, `idle`'ı olmayan süreli dosya, iki seçeneği birden kilitli dosya).

- **Tarayıcıda (Node gerekmez):** oyunu açıkken `http://localhost:8765/tools/test.html` → "Testi çalıştır". Sonuç yeşilse tamam.
- **Node ile:**
  ```bash
  node tools/sim.js 3000 --detay
  ```

Son sonuçlar [docs/YAPILACAKLAR.md](docs/YAPILACAKLAR.md)'de.

### Uygulama olarak kurulum (PWA)
Oyun telefona kendi simgesiyle kurulabilir, adres çubuğu olmadan tam ekran açılır ve internet olmadan da çalışır. HTTPS gerekir (GitHub Pages yeterli; `localhost` da sayılır).

- **Bilgisayar (Chrome/Edge):** Oyunu açın → adres çubuğundaki "Yükle" simgesi. F12 → *Application* → *Manifest* (simge ve ad) ve *Service workers* (activated). Çevrimdışı denemek için *Network* → "Offline" seçip sayfayı yenileyin.
- **Android (Chrome):** GitHub Pages adresi → menü (⋮) → "Ana ekrana ekle" ya da "Uygulamayı yükle".
- **iPhone (Safari):** GitHub Pages adresi → Paylaş → "Ana Ekrana Ekle".
- **Güncelleme:** Kurulu oyun önce önbellekteki sürümü açar, yenisini arkada indirir; yeni sürüm bir sonraki açılışta görünür. Geliştirirken eski sürüm görürseniz iki kez yenileyin ya da F12 → *Application* → *Service workers* → "Update on reload". Yeni bir dosya eklerseniz `sw.js` → `SHELL` listesine ekleyip `CACHE` adını artırın.
- Bazı editörlerin içindeki önizleme tarayıcıları service worker'a izin vermez; konsolda bir kayıt hatası görünür ama oyun çalışır.

### Yayınlama
- **Tek dosya (en kolayı; jüri, demo ve arkadaşlar için):**
  ```bash
  py tools/tekdosya.py
  ```
  `dist/Gelecekten-Mektup.html` oluşur. Bu tek dosyaya çift tıklayınca oyun tarayıcıda açılır; sunucu, kurulum ya da internet gerekmez. WhatsApp, Drive ya da e-postayla gönderilebilir. (Telefona uygulama gibi kurulum bu sürümde yok; o GitHub Pages sürümünde.)
- **GitHub Pages:** Repo → Settings → Pages → *Deploy from a branch* → `main` / `/ (root)` → Save. Birkaç dakika sonra oyun `https://edakucukkara.github.io/gameup-gamejam-team-Garnet/` adresinde açılır.
- **itch.io paketi (isteğe bağlı):**
  ```bash
  py tools/paket.py
  ```
  `dist/gelecekten-mektup.zip` oluşur (Mac/Linux: `python3 tools/paket.py`). itch.io'da *Kind of project: HTML* → zip'i yükle → "This file will be played in the browser" → pencere 440 × 820, "Mobile friendly" ve "Fullscreen button" açık. Sayfa metni ve etiketler [docs/TESLIM.md](docs/TESLIM.md)'de.

### Repo yapısı
```
index.html              Sayfa iskeleti ve stiller (retro poster paleti)
data.js                 İçerik: karakterler, dosyalar, kilitler, kapı bildirimleri, gelecekten notlar, final, mektuplar, sonlar, kaynaklar
engine.js               Kurallar (DOM'a dokunmaz): masa ve dosyalar, kilitler, iklim modeli, mektup metinleri
ui.js                   Arayüz: portreler, 2075 sahnesi, göstergeler, masa, final ve çember sahnesi, rapor
manifest.webmanifest    Uygulama tanımı (ad, simge, renk)
sw.js                   Service worker: çevrimdışı çalışma
icons/                  Simge (icon.svg asıl çizim; PNG'ler ondan üretildi)
oyna.bat                Windows'ta tek tıkla çalıştırma
tools/sim.js            Denge simülasyonu ve içerik kontrolü (Node ve tarayıcı)
tools/test.html         Simülasyonun tarayıcı sayfası
tools/tekdosya.py       Çift tıklayınca açılan tek dosyalık oyunu hazırlar
tools/paket.py          itch.io zip'ini hazırlar (isteğe bağlı)
docs/TASARIM.md         Oyun tasarım dokümanı: mekanik, sistemler, sonlar, karakterler, görsel kimlik
docs/ICERIK-REHBERI.md  Kod bilmeden dosya, kilit, not, mektup ve son ekleme
docs/YAPILACAKLAR.md    Açık işler, son test sonuçları, bilinen sorunlar
docs/YAPILANLAR.md      Değişikliklerin tarihçesi ve gerekçeleri
docs/TESLIM.md          Jam teslimi: kontrol listesi, itch.io metni, COP31 paragrafı, sunum notları
```

İçerik eklemek için kod bilmek gerekmiyor: [docs/ICERIK-REHBERI.md](docs/ICERIK-REHBERI.md).

### Kaynaklar
Oyundaki gerçek bilgilerin kaynakları (IPCC AR6, UNEP/CCAC, MedECC, FAO, MGM, WMO, Neubauer kararı…) oyunun bitiş ekranında ve `data.js` → `SOURCES` içinde. İklim modeli öğretici bir basitleştirmedir. Küresel İklim Konseyi, karakterler ve şirketler kurgudur.

## Takım
Takım Garnet · GameUp Game Jam 2026
