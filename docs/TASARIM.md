# Oyun Tasarım Dokümanı · Gelecekten Mektup

## 1. Konsept

**Tek cümle:** 2075'teki torunundan mektuplar alırken, 2026'dan 2075'e kadar Antalya'nın iklim kararlarını veriyorsun.

**Neden bu tema:** COP31'in odak alanlarının hepsi (yenilenebilir enerji, karbon ayak izi, iklime dirençli şehirler, gıda güvenliği, okyanuslar, iklim eğitimi, sıfır atık) kartların içine dağıtıldı. Oyunun ana mesajı mekaniğin kendisinde: **sürdürülebilirlik bir denge meselesidir.** Sadece "yeşil" seçimleri yapan oyuncu da kaybeder (kasa boşalır, halk desteği gider ya da enerji bolluğu tüketimi patlatır).

**İlham:** *Lapse: A Forgotten Future*, *Reigns*.

**Hedef platform:** Web (HTML5), öncelik telefon. Bilgisayarda klavye ve fareyle de oynanır.

**Bir oyun süresi:** 49 kart (2026 → 2075) + 7 mektup ≈ 8–12 dakika. Kaybetmek daha erken bitirir.

## 2. Hikâye

- **Oyuncu:** 2026'da, COP31 Antalya'da bittikten sonra kentin İklim Konseyi'nin başına geçen kişi. Kartlarda "Başkan" diye hitap edilir. Cinsiyeti belirtilmez; Deniz'in hitabı ("Dede" / "Nine") başta oyuncu tarafından seçilir.
- **Deniz:** Oyuncunun torunu. 2049'da doğar, 2075'te 26 yaşındadır. Adı bilerek seçildi: deniz/okyanus temasına bağlanıyor.
- **Ece:** Oyuncunun kızı, Deniz'in annesi. Kişisel kartlarda görünür (İstanbul'a taşınma kararı, Deniz'in doğumu, Deniz'i denize götürme).
- **Zaman paradoksu:** Deniz 2075'ten yazıyor, bu yüzden mektuplar oyuncunun kararlarıyla birlikte değişir. 2049'dan önce kaybedilirse Deniz hiç doğmamış olabilir; son mektupta bu söylenir.

## 3. Temel mekanik

### Dört denge

| Anahtar | Gösterge | 0 olursa | 100 olursa |
|---|---|---|---|
| `d` | 🌳 Doğa | **Kavrulan Toprak**: ekolojik çöküş | **Sessiz Orman**: ekonomi çöker, insanlar göç eder |
| `h` | 👥 Halk | **Görevden Alındın**: halk desteği biter | **Alkış Tuzağı**: kimseye hayır denmez, zor kararlar ertelenir |
| `e` | ₺ Kasa | **Kasa Boşaldı**: belediye iflas eder | **Beton Cennet**: kıyı otellerle dolar |
| `n` | ⚡ Enerji | **Karanlık Yaz**: şebeke çöker | **Sönmeyen Işıklar**: bolluk tüketimi patlatır, ısı adası |

- Tüm göstergeler **50**'den başlar, 0–100 arasındadır.
- Bir gösterge **≤ 15 ya da ≥ 85** olunca kırmızıya döner ve nabız gibi atar (uyarı).
- Bir seçenek genelde 2–3 göstergeyi **±5 / ±10 / ±15 / ±20** değiştirir.

### Önizleme noktaları
Kart sürüklenirken (ya da düğmenin üzerine gelince) değişecek göstergelerin altında nokta çıkar:
- Küçük nokta: etki < 12
- Büyük nokta: etki ≥ 12

Yön gösterilmez. Oyuncu metinden tahmin eder; planlamanın özü bu.

### Kart seçimi (`pickCard`)
Her yıl için sırasıyla:
1. **Zorunlu kart:** `at` alanı o yıla eşit olan kart (2026 açılış, 2049 Deniz'in doğumu).
2. **Zincir kuyruğu:** önceki kararların `nx` ile kuyruğa eklediği, zamanı gelmiş kart.
3. **Rastgele havuz:** kullanılmamış, yıl aralığı (`min`/`max`) ve bayrak şartı (`req`) uyan kartlar.
4. Havuz boşalırsa genel kartlar yeniden kullanılabilir hâle gelir.

### Bayraklar (flags)
Bazı seçimler kalıcı bir **bayrak** bırakır (`f: "caretta"` gibi). Bayraklar:
- Mektuplarda bu karardan bahsedilmesini sağlar,
- 2075 sahnesinde görsel değişiklik yapar (`ruzgar` → türbinler, `gunes` → paneller, `komur` → baca dumanı, `dalga` → şamandıralar),
- Başka kartların açılmasını sağlar (`req: ["gunes"]` → kedi kartı),
- Gizli sonun şartıdır.

## 4. Mektup sistemi

- **Giriş mektubu:** oyun başında.
- **Ara mektuplar:** 2032, 2038, 2044, 2050, 2056, 2062, 2068.
- **Son mektup:** oyun bittiğinde (kayıp ya da 2075).

Ara mektubun yapısı:
1. Hitap: "Sevgili Dede/Nine,"
2. (2050'ye özel) Deniz'in doğumu hakkında bir satır
3. **Dünya satırı:** 50'den en uzak gösterge 25 puandan fazla uzaksa, o göstergenin düşük/yüksek uyarı metni (`WORLD_LINES`). Değilse sakin bir satır (`CALM`). **Bu satırlar oyuncuya örtük ipucu verir.**
4. **Anı satırı:** daha önce bahsedilmemiş en yeni bayrağın metni (`FL`).
5. Kapanış.

Mektuplar daktilo efektiyle yazılır, dokununca tamamlanır.

## 5. Sonlar

| ID | İsim | Koşul |
|---|---|---|
| `d0` … `n100` | 8 kaybetme sonu | Bir gösterge 0 ya da 100 |
| `sonsuz` | **Sonsuz Mektup** (gizli) | 2075'te tüm göstergeler 30–70 arası + `kapsul` + `denizkiyi` bayrakları |
| `mavi` | **Mavi Antalya** | 2075'te tüm göstergeler 30–70 arası |
| `yesil` | **Yeşil Miras** | 2075'te Doğa ≥ 65 |
| `kirilgan` | **Kırılgan Umut** | 2075'e ulaşıldı, diğer durumlar |

Bulunan sonlar `localStorage` içinde `gm_endings` anahtarıyla saklanır. Bitiş ekranında 12 sonluk koleksiyon gösterilir.

## 6. Karakterler

| Anahtar | Karakter | Rolü hikâyede |
|---|---|---|
| `elif` | Elif, iklim aktivisti | Gençlik, vicdan, ilk kart |
| `hasan` / `kerem` | Balıkçı baba ve oğul | Av yasağı zinciri |
| `murat` | Murat Bey, otel yatırımcısı | Turizm, beton, yeşil aklama |
| `ayse` / `mert` | Çiftçi Ayşe Teyze ve torunu | Gıda güvenliği, kuşaklar |
| `selin` | Dr. Selin, iklim bilimci | Teknoloji ve bilim kararları |
| `kemal` | Kemal Bey, enerji şirketi | Fosil yakıt baskısı |
| `zeynep` | Zeynep, öğretmen | İklim eğitimi, zaman kapsülü |
| `yusuf` | Yusuf, belediye mühendisi | Altyapı, sel, sıcak hava |
| `can` | Can, girişimci | Yeni teknolojiler, mahremiyet |
| `leyla` | Leyla, gazeteci | Basın, şeffaflık |
| `nil` | Dr. Nil, deniz biyoloğu | Okyanuslar, caretta, mercan |
| `ece` | Ece, oyuncunun kızı | Aile ve duygusal kartlar |
| `bakan` | Bakanlık temsilcisi | Ulusal ölçekli büyük kararlar |
| `hans` | Hans, turist | Turizmin dışarıdan bakışı (mizah) |
| `ahmet` | Ahmet, köy kooperatifi | Yerel gıda |
| `ali` | Ali, 9 yaşında öğrenci | Çocukların sesi |
| `gulsum` | Gülsüm Hanım, mahalle sakini | Gündelik hayatın itirazları |
| `bekir` | Bekir Usta, esnaf | Ekonomik itirazlar |
| `marti` / `kedi` | Martı ve sokak kedisi Tekir | Mizah kartları |

Kartlarda `old: 1` alanı varsa karakterin saçı ağarır (geç dönem kartları).

## 7. Görsel kimlik

- **Zemin:** gece Akdeniz'i lacivert-yeşil tonları; vurgu turkuaz, uyarı güneş sarısı, tehlike kor kırmızısı.
- **Mektuplar:** uçak postası (kırmızı-mavi çizgili kenar), satırlı kâğıt, "ANTALYA · 2075" posta damgası, el yazısı fontu (Caveat), dolma kalem mavisi mürekkep.
- **Fontlar:** Bricolage Grotesque (başlıklar), Figtree (metin), JetBrains Mono (yıl, etiketler), Caveat (mektuplar). Hepsi Google Fonts.
- **Portreler:** kodla çizilen düz (flat) SVG portreler. Görsel dosya yok, her şey `index.html` içinde.
- **2075 sahnesi:** SVG; değerler CSS geçişleriyle yumuşak değişir.

## 8. Sahne eşlemesi (`updateWorld`)

| Görsel | Neye bağlı |
|---|---|
| Ağaç sayısı | Doğa |
| Duman / turuncu gökyüzü | Doğa düşükse (kömür açıksa ekstra) |
| Deniz seviyesi | 100 − Doğa |
| Bina yükseklikleri | Kasa |
| Pencere ışıkları, karartma | Enerji |
| Sahildeki insanlar | Halk |
| Türbin, panel, baca, şamandıra | Bayraklar |
| Deniz seviyesi (cm) | `18 + (100 − Doğa) × 0,7` (+5 Kasa > 70 ise) |
| Temmuz sıcaklığı | `31 + (100 − Doğa) × 0,06` (+1,2 Enerji > 85 ise) |
