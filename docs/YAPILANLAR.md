# Yapılanlar · `kapanan-kapilar` branch'i

> 30–31 Ekim 2026 · İlk sürümün (`main`) üzerine yapılan değişiklikler ve nedenleri. Kalan işler: [YAPILACAKLAR2.md](YAPILACAKLAR2.md)

## Neden değiştirdik
- **Özgünlük:** Binlerce takım AI ile oyun yapıyor; Reigns/Lapse türü ve "gelecekten mektup" fikri tek başına öne çıkmıyordu. Türe kendi mekaniğimizi ekledik: **Kapanan Kapılar**.
- **Takım geri bildirimi:** Oyunu doğrudan COP31'e bağlamamak, oyuncuyu küresel bir kurumun başına koymak, Amerika'yı andıran mavi-kırmızı renkleri değiştirmek, hızla yükselen Enerji'yi düzeltmek.
- **Bilimsel doğruluk:** İlk sürümde Antalya'nın kararları küresel deniz seviyesini değiştiriyordu; "Doğa 100 olursa ekonomi çöker" ve yenilenebilir enerjinin "Sönmeyen Işıklar"a götürmesi yanlış mesaj veriyordu.

## 1. Yeni tasarım · commit `3824237`
- **Küresel İklim Konseyi:** Oyuncu kurgusal bir konseyin başında. Kartlar baştan yazıldı; Pasifik'ten Tala, Batı Afrika'dan Ama, Pencaplı Ravi, Amazon'dan Maria, Konyalı Ayşe Teyze, Antalyalı Hasan… Deniz mektuplarını Antalya'dan yazıyor.
- **Göstergeler:** Doğa, **Uluslar**, **Fon**, Enerji (₺ simgesi madeni para oldu).
- **Kapanan Kapılar:** Bazı kararlar ileride bazı seçenekleri kalıcı olarak kapatıyor. Kartta "KAPANDI · yıl — sebep" damgası; kilitli tarafa kaydırınca kart sallanıyor. 2029'daki Afrika kartında herkes ilk kilidi görüyor (açılıştaki Fon kararına göre ya kömür ya güneş kapanıyor).
- **Final, "Deniz koltuğa geçer":** 2075'te Deniz Konsey'in başına geçiyor ve senin açık bıraktığın kapılarla karar veriyor. Bitiş ekranı Deniz'e bıraktığın kapıları listeliyor.
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

## Bugünkü durum
| | |
|---|---|
| İçerik | 71 kart + 7 olay, 11 final kartı, 26 karakter, 16 kilit sebebi, 12 son |
| İçerik kontrolü | 0 hata (`node tools/sim.js 3000 --detay`) |
| Hiç karar almadan 2075 | ≈ +2,5°C (bugünkü politikalara yakın) |
| İnsan gibi dengeli oynayan | %78'i 2075'e varıyor, ≈ +2,1°C, %55 temiz enerji |
| İnsan gibi yalnızca yeşil oynayan | %36'sı varıyor; siyaseti ve enerjiyi ihmal edince kaybediyor |
| Rastgele oynayan | %8'i varıyor, ortalama 2052'de bitiyor |
| Tarayıcı | 375×667, 390×844, 440×820, 1280×800 ekranlarda baştan sona hatasız |
