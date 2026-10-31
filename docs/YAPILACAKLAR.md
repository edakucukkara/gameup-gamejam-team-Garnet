# Yapılacaklar

> 31 Ekim 2026 · Teslim: **1 Kasım 23:59** (WhatsApp'taki form, verilecek sunum şablonuyla) · Yapılanlar: [YAPILANLAR.md](YAPILANLAR.md) · Teslim metinleri: [TESLIM.md](TESLIM.md)

## Teslimden önce mutlaka (P0)
- [ ] **PR'ı `main`'e birleştir** (`secimler` dalı).
- [ ] **GitHub Pages'i aç** ve oyunun açıldığını telefonda dene (adımlar README'de). Telefona "Ana ekrana ekle" ile kurulumu da dene.
- [ ] **itch.io sayfası:** `py tools/paket.py` → `dist/gelecekten-mektup.zip`'i yükle. Sayfa metni, etiketler ve ayarlar [TESLIM.md](TESLIM.md)'de.
- [ ] **60 saniyelik oynanış videosu ve 4–5 ekran görüntüsü** (demo modu bunun için):
  - masada iki ya da üç dosya ve gelecekten not,
  - kapı bildirimi ve yıllar sonra "Bu konuda elin bağlı",
  - Deniz'in bir mektubu,
  - "Bu kadarını başardık" ekranı,
  - mektubun 2026'ya uçtuğu son sahne.
- [ ] **Sunum:** Şablon gelince doldur; söylenecekler [TESLIM.md](TESLIM.md)'de.
- [ ] **Gerçek oyuncu testi (5–10 kişi):** Kaçıncı yılda bitti, kapı bildirimlerini anladı mı, Rapor'u açtı mı, gelecekten notu fark etti mi, finali gördü mü, ne hissetti. Sunuma 2–3 rakam koy.
- [ ] **Metinleri oku:** Ton, Türkçe ve doğruluk. Özellikle torun Deniz'in mektupları ve anıları (`FL`), sonlar, final kartları (`EPI`), gelecekten notlar (`HINTS`), kapı bildirimleri (`DOORS`) ve 26 süreli dosyanın `idle` tarafı.
- [ ] **COP31 göndermesi kararı:** Giriş mektubunda "dünya liderlerinin Antalya’da buluştuğu" yıl geçiyor. İstenmiyorsa `engine.js` → `introLetter`.
- [ ] **Canlı yayınlar ve webinarlar:** %60 katılım puanlanıyor.

## Oyun eksikleri (P1)
- [ ] **Seçeneğin iklim etkisini önizleme:** Kararın üzerine gelince pencerede "+0,1°C" gibi bir değişim. Model hazır: seçeneği dünyanın kopyasına uygula, `Engine.world` ile 2075'i hesapla, farkı göster.
- [ ] **Demo modunda kapılar:** Testte demo modunda dengeli oynayanların ~%54'ü 2029 dışında kilit görmüyor; finalde %14 oyunda yalnızca 3 kart geliyor. Bayrağı az olan oyuncular için finale genel bir kart eklenebilir.
- [ ] **Karakter hikâyeleri:** Tala, Ravi ve Maria için onlarca yıla yayılan 2–3'er dosya daha.
- [ ] **Sahne:** Günün saati (sabah/akşam ışığı), mevsim, finalde 26 yaşındaki Deniz'in kıyıda yürümesi.
- [ ] **Mavi Akdeniz zorluğu:** Testte insan gibi dengeli oynayanların ~%8'i ulaşıyor. Oyuncu testine göre `engine.js` → `finalType`.
- [ ] **Ses:** Kodla üretilmiş hafif bir fon müziği; telifli müzik yok.

## İsteğe bağlı (P2)
- [ ] 2075 kartpostalı: bitiş ekranından paylaş.
- [ ] Kuşak modu: 2050'de "Telefonu senden genç birine ver".
- [ ] İngilizce sürüm.
- [ ] Android uygulaması (APK): aynı kod Capacitor ile paketlenebilir. Jam'den sonra.
- [ ] Erişilebilirlik: kapı bildirimi ve rapor için ekran okuyucu duyuruları.

## Son test sonuçları (31 Ekim, `tools/test.html`, tip başına 1000 oyun)
| Oyuncu tipi | Tam oyun: 2075'e varan | Demo: 2075'e varan |
|---|---|---|
| İnsan gibi dengeli | %79 | %83 |
| İnsan gibi yeşil | %36 | %52 |
| Rastgele | %8 | %25 |
| Kâhin dengeli | %100 | %98 |

İçerik kontrolü: 0 hata, 0 uyarı, iki seçeneği birden kilitli dosya yok. Dengeli oynayanda 2075 ısınması ≈ +2,0–2,2°C; hiç karar almadan ≈ +2,5°C.

## Bilinen küçük sorunlar
- İki (yoğun günde üç) dosya geldiği için havuz daha hızlı azalıyor; kâhin dengeli oyuncuda oyun başına ~0,24 dosya tekrar ediyor. 2060 sonrası için birkaç dosya daha eklenebilir.
- Bekleyen dosya birkaç kez geri dönebiliyor; aynı kişinin dosyası üst üste görülebilir.
- Aerosol: rakamlar maskesiz ısınmayı, Rapor'un ayrıntıları hissedilen ısınmayı da gösteriyor. Oyuncu testinde anlaşılıp anlaşılmadığına bak.
- Uygulama içi önizleme tarayıcıları (ör. bazı editörlerin) service worker'a izin vermez; konsolda "An unknown error occurred when fetching the script" görünür. Oyun yine çalışır; gerçek Chrome/Safari'de bu hata yoktur.
