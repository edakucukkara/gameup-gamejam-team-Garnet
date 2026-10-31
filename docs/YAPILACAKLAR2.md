# Yapılacaklar 2 · eksikler

> 31 Ekim 2026 · Teslim: **1 Kasım 23:59** (WhatsApp'taki form, verilecek sunum şablonuyla) · Yapılanlar: [YAPILANLAR.md](YAPILANLAR.md)

## Teslimden önce mutlaka (P0)
- [ ] **Sunum:** Şablon gelince doldur. Ne anlatılacağı aşağıda, "Sunumda söylenecekler" başlığında.
- [x] **Kısa mod:** Açılışta "Hızlı oyun" (her tur 2 yıl, ~5 dk) ve "Tam oyun" seçimi var. Denge iki mod için `node tools/sim.js` ile ölçüldü.
- [ ] **60 saniyelik oynanış videosu ve 4–5 ekran görüntüsü:** Sunum ve itch.io sayfası için. Görüntüler şunları göstersin:
  - iki şişeden birini seçmek,
  - silik kapı ve "KAPANDI" damgası,
  - batan şişe notu,
  - Deniz'in bir mektubu,
  - "Artık Deniz'sin" finali.
- [ ] **Gerçek oyuncu testi (5–10 kişi):** Not al: kaçıncı yılda bitti, kilidi fark etti mi, Dosya'yı açtı mı, finali gördü mü, ne hissetti. Sunuma 2–3 rakam koy.
- [ ] **Kart metinlerini oku:** Ton, Türkçe ve doğruluk. Özellikle şunlar:
  - Deniz'in ağzından yeniden yazılan mektuplar, anılar (`FL`), sonlar ve final kartları (`EPI`),
  - 26 süreli kartın `idle` tarafı: açılmazsa kendiliğinden olan şey mantıklı mı?
- [ ] **Yayın:** Branch'i `main`'e al, GitHub Pages'i aç. itch.io için `index.html`, `data.js`, `engine.js` ve `ui.js` birlikte zip'lenmeli.
- [ ] **COP31 göndermesi kararı:** Deniz'in giriş mektubunda "Bu yıl dünya liderleri benim kıyımda, Antalya'da buluşuyor" satırı var. İstenmiyorsa `engine.js` → `introLetter` içinden çıkar.
- [ ] **Canlı yayınlar ve webinarlar:** %60 katılım puanlanıyor.

## Oyun eksikleri (P1)
- [ ] **Seçeneğin iklim etkisini önizleme:** Kart sürüklenirken pencerede "+0,1°C" gibi bir değişim görünsün. Model hazır: seçeneği dünyanın kopyasına uygula, `Engine.world` ile 2075'i hesapla, farkı göster.
- [ ] **İlk kilitte tek seferlik açıklama:** Kapılar artık silik geldiği için daha da gerekli: "Bir kapı kapandı. Ne olduğunu sonra anlayacaksın."
- [ ] **Hızlı oyunda kapılar:** Simülasyona göre hızlı oyunda insan gibi oynayanların ~%30'u 2029'daki kilit dışında kilit görmüyor. Finalde de ~%12–17 oyunda yalnızca 2 kapı ve son söz geliyor. Bayrağı az olan oyuncular için finale genel bir kart eklenebilir.
- [ ] **Karakter hikâyeleri:** Tala (ada), Ravi (tarla) ve Maria (orman) için onlarca yıla yayılan 2–3'er kart daha.
- [ ] **Eski dokümanlar:** `docs/TASARIM.md`, `docs/ICERIK-REHBERI.md` ve `docs/YAPILACAKLAR.md` hâlâ ilk tasarımı anlatıyor. Güncel anlatım şimdilik README'de.
- [ ] **Mavi Akdeniz zorluğu:** Düşünerek oynayanların ~%5–15'i ulaşıyor (dört denge 30–70 ve 2075'te ≤2,2°C). Oyuncu testine göre `engine.js` → `finalType` içinden ayarla.
- [ ] **Ses:** Kodla üretilmiş hafif bir fon müziği; ısındıkça değişebilir. Telifli müzik kullanma.

## İsteğe bağlı (P2)
- [ ] 2075 kartpostalı: bitiş ekranından paylaş ya da yazıcıdan bas.
- [ ] Kuşak modu: 2050'de "Telefonu senden genç birine ver".
- [ ] İngilizce sürüm.
- [ ] Erişilebilirlik: kilit damgası ve Dosya için ekran okuyucu duyuruları.

## Bilinen küçük sorunlar
- Her tur iki şişe geldiği için havuz daha hızlı azalıyor. Tam oyunda simülasyondaki kâhin oyuncu tipinde (dengeli) oyun başına ~0,15 kart tekrar ediyor. 2060 sonrası için birkaç kart daha eklenebilir.
- Ertelenen şişe birkaç kez geri dönebiliyor; aynı kişinin mektubu (ör. kedi) üst üste görülebilir.
- Konuşan okyanus ve su fikri Conservation International'ın 2014 "Nature Is Speaking" kampanyasında var: Harrison Ford okyanusu, Penélope Cruz suyu seslendirdi. Bizi ayıran şeyler mektuplar, şişe seçimi, kapanan kapılar ve iklim modeli. Jüri sorarsa bunu söyle.
- Aerosol: rakamlar maskesiz ısınmayı, Dosya ise hissedilen ısınmayı da gösteriyor. Oyuncu testinde anlaşılıp anlaşılmadığına bak.
- İklim modeli öğretici bir basitleştirme; kaynaklar ekranında yazıyor. Jüri sorarsa: ısınma IPCC'nin TCRE değeriyle (her 1000 milyar ton CO₂ ≈ +0,45°C), deniz seviyesi yarı-ampirik bir modelle hesaplanıyor; 2075 sonuçları IPCC aralıklarında.

## Sunumda söylenecekler
- **Türden farkımız:**
  - Lapse ve Reigns'te tek kart ve iki seçenek vardır. Bizde her tur iki şişe gelir ve kimi dinleyeceğini sen seçersin. Ertelediğin mektup batabilir; o zaman karar senin yerine verilir.
  - Kapanan kapılar silik görünür; ne olduklarını sonradan anlarsın.
  - Reigns'te taht el değiştirir; bizde koltuk değil, dünya miras kalır. 2075'te sen deniz olursun.
- **Neden su:** Mektupları Deniz, yani bütün suların sesi yazıyor. UN-Water'a göre iklim değişikliği ekosistemleri ve insanları en çok su üzerinden etkiliyor: kuraklık, sel, yükselen deniz.
- **Fikrin dayanağı:** Almanya Anayasa Mahkemesi 2021'de (Neubauer kararı) bugün ertelenen emisyon azaltımının gençlerin gelecekteki özgürlüklerini kısıtladığına hükmetti. Kapanan Kapılar bu fikri oynanabilir hâle getiriyor.
- **Yaşayan bir dünya:** Arkada birikimli CO₂, deniz seviyesi, enerji sistemi, ormanlar, okyanuslar, uyum ve güven çalışıyor. Eşikler aşılınca olaylar geliyor. Dosya panelinde görülebiliyor.
- **Gerçek ve yerel:** Konya obrukları, Belek carettaları (Anamur'da yavruların %85'i dişi), Antalya'da Temmuz 2025'te 46,1°C, Akdeniz'in dünya ortalamasından %20 hızlı ısınması.
- **Mesaj:** Tek başına yeşil yetmez (Halksız Yeşil), temiz enerji eklemek yetmez kirliyi bırakmak gerekir (Ekleme Tuzağı), adalet olmadan uzlaşı dağılır (Konsey Dağıldı).
- **Test edilmiş denge:** `tools/sim.js` binlerce oyunla ölçüyor. İnsan gibi dengeli oynayanların tam oyunda %75'i, hızlı oyunda %83'ü 2075'e varıyor.

## Nasıl test edilir
```bash
python -m http.server 8765          # oyunu aç: http://localhost:8765
node tools/sim.js 3000 --detay      # denge ve içerik kontrolü (0 hata olmalı)
```
