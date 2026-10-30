# Gelecekten Mektup

> 2075'teki torunun Deniz sana mektup yazıyor. Bugün verdiğin her karar onun dünyasını değiştiriyor.

**GameUp Game Jam · Takım Garnet**
**Tema:** İklim · COP31 Türkiye (Antalya)

*Lapse* ve *Reigns* tarzında, kartları sağa ya da sola kaydırarak oynanan, hikâye odaklı bir karar oyunu. Oyuncu 2026'da Antalya İklim Konseyi'nin başına geçiyor ve 2075'e kadar kenti yönetiyor. Her karar bir yıl ilerletiyor ve üstteki "Deniz'in dünyası" penceresi kararlara göre anında değişiyor.

---

## Hızlı başlangıç

Oyun tek bir dosya: [`index.html`](index.html). Kurulum ya da build adımı yok.

**Tarayıcıda açmak:** `index.html` dosyasına çift tıklayın.

**Yerel sunucuyla açmak (önerilir; fontlar ve kayıt sistemi daha sorunsuz çalışır):**

```bash
python -m http.server 8765
```

Sonra tarayıcıda `http://localhost:8765` adresini açın. Telefon görünümünü denemek için tarayıcının geliştirici araçlarında mobil görünümü (Ctrl+Shift+M) açın.

## Nasıl oynanır

| Kontrol | Ne yapar |
|---|---|
| Kartı sola / sağa sürükle | Seçeneği seçer |
| `←` / `→` tuşları | Klavyeyle seçer |
| Alttaki düğmeler | Tıklayarak seçer, üzerine gelince önizleme gösterir |
| Göstergelerin altındaki noktalar | O seçimin hangi dengeleri değiştireceğini gösterir (küçük nokta az, büyük nokta çok). Yönünü göstermez. |

**Amaç:** Dört dengeyi korumak: 🌳 **Doğa**, 👥 **Halk**, ₺ **Kasa**, ⚡ **Enerji**.
Biri **0'a inerse** ya da **100'e çıkarsa** zaman çizgisi kopar ve oyun biter. 2075'e ulaşırsan Deniz'in son mektubunu okursun.

## Özellikler

- **66 karar kartı**, 22 karakter (balıkçı Hasan, otelci Murat Bey, iklim bilimci Dr. Selin, sokak kedisi Tekir, simit hırsızı martı…)
- **Deniz'in mektupları:** 2032'den 2068'e kadar altı yılda bir gelir. Mektuplar oyuncunun kararlarına göre yazılır: en kritik dengeden ve oyuncunun verdiği belirli kararlardan bahseder.
- **Canlı 2075 sahnesi:** ağaçlar, deniz seviyesi, duman, şehir ışıkları, insanlar, rüzgâr türbinleri, güneş panelleri. Altında deniz seviyesi (cm) ve temmuz sıcaklığı yazar.
- **Zincirleme olaylar:** bazı kararların sonuçları yıllar sonra geri döner (ör. av yasağı → 14 yıl sonra balık festivali).
- **12 son:** 8 kaybetme sonu, 4 başarı sonu (biri gizli). Bulunan sonlar tarayıcıda kaydedilir.
- **Kişiselleştirme:** Deniz oyuncuya "Dede" ya da "Nine" diye seslenir.
- Telefon ve bilgisayarda çalışır, ses açılıp kapatılabilir, `prefers-reduced-motion` ayarına uyar.

## Repo yapısı

```
index.html              Oyunun tamamı (HTML + CSS + JS, tek dosya)
docs/TASARIM.md         Oyun tasarım dokümanı: mekanik, sistemler, sonlar, karakterler
docs/ICERIK-REHBERI.md  Kart, mektup ve son ekleme/düzenleme rehberi
docs/YAPILACAKLAR.md    Yol haritası, playtest notları, açık işler
```

## Kod içinde nereye bakmalı

`index.html` içindeki `<script>` bölümü şu sırayla ilerler:

| Bölüm | İçerik |
|---|---|
| `CH` | Karakterler: isim, rol, kart rengi, portre parametreleri |
| `CARDS` | Tüm karar kartları |
| `LETTER_YEARS`, `WORLD_LINES`, `CALM`, `FL` | Mektup sistemi metinleri |
| `ENDINGS`, `END_ORDER` | 12 sonun isimleri ve metinleri |
| `portrait()` | Karakter portrelerini SVG olarak çizen fonksiyon |
| `buildWorld()`, `updateWorld()` | 2075 sahnesi |
| `pickCard()`, `choose()`, `finalType()` | Oyun döngüsü ve kurallar |

İçerik eklemek için kod bilmek gerekmiyor; [docs/ICERIK-REHBERI.md](docs/ICERIK-REHBERI.md) adım adım anlatıyor.

## Yayınlama (jam teslimi)

**itch.io:** `index.html` dosyasını zip'leyin → itch.io'da yeni proje → *Kind of project: HTML* → zip'i yükleyin → *This file will be played in the browser* seçeneğini işaretleyin. Önerilen pencere boyutu: 440 × 820, "Mobile friendly" açık.

**GitHub Pages:** Repo → Settings → Pages → *Deploy from a branch* → `main` / `root`. Oyun birkaç dakika içinde `https://edakucukkara.github.io/gameup-gamejam-team-Garnet/` adresinde açılır.

## Takım

Takım Garnet · GameUp Game Jam 2026
