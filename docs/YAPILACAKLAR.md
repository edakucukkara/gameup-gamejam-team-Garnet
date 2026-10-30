# Yol Haritası ve Playtest Notları

## Durum

- [x] Çekirdek mekanik: kaydırma, 4 denge, önizleme noktaları, yıl sayacı
- [x] 66 kart, 22 karakter, zincirleme olaylar, bayraklar
- [x] Deniz'in dinamik mektupları (giriş + 7 ara mektup + son mektup)
- [x] Canlı 2075 sahnesi
- [x] 12 son ve son koleksiyonu
- [x] Telefon ve bilgisayar uyumu, ses, klavye kontrolü
- [x] İlk yayın (tek dosya `index.html`)

## Playtest notları

### Playtest 1 (Eda)
- İlk oyunda kaybedildi, açılan son: **Sönmeyen Işıklar** (Enerji 100).
- Not: "Yeşil" seçenekler (güneş paneli, rüzgâr, dalga santrali, ısı pompası) Enerji'yi yükseltiyor ve Enerji'yi düşüren seçenekler daha az. İyi niyetli oynayan oyuncu Enerji'yi tavana vurdurabiliyor. Bu tasarım gereği ("bolluk tuzağı") ama bir oyunda çok erken oluyorsa ayar gerekebilir.

### Kart verisinin toplamları
Tüm seçeneklerdeki etkilerin toplamı (132 seçenek):

| Gösterge | Artış toplamı | Azalış toplamı |
|---|---|---|
| Doğa | +375 | −280 |
| Halk | +375 | −350 |
| Kasa | +300 | −485 |
| Enerji | +190 | −170 |

Yorum: Kasa genel olarak aşağı baskılı (iyi: gerilim yaratıyor). Doğa yukarı baskılı, yani yeşil oynayan oyuncu Doğa 100'e de vurabilir. Enerji'de az kart var, bu yüzden her kart büyük etki yapıyor.

## Açık işler (öncelik sırasıyla)

### Denge
- [ ] Daha fazla playtest yapıp hangi sonun ne sıklıkla açıldığını not edin
- [ ] Enerji'yi düşüren 3–4 yeni kart ekleyin (ör. klima talebi, veri merkezi, kripto madenciliği, yaz turizmi zirvesi)
- [ ] `n:15` olan bazı yeşil enerji seçeneklerini `n:10`'a çekmeyi deneyin
- [ ] Oyunun ilk 5 yılında ölümü engellemek için başlangıç kartlarını yumuşatmayı düşünün

### İçerik
- [ ] Kartların yazımını okuyup düzeltin (Türkçe yazım, ton)
- [ ] Sıfır Atık ve Gıda Güvenliği için 3–4 kart daha
- [ ] Ece ile ilgili 1–2 aile kartı daha (duygusal bağ)
- [ ] Gizli son "Sonsuz Mektup" için bir ipucu mektubu

### Cila
- [ ] Başlangıçta kısa bir öğretici (ilk kartta "kaydır" animasyonu)
- [ ] Bitiş ekranında sonucu paylaşma metni
- [ ] Arka plan müziği (telifsiz, düşük ses, kapatılabilir)
- [ ] İngilizce dil desteği (uluslararası jüri için)

### Teslim
- [ ] itch.io sayfası: kapak görseli, 3–4 ekran görüntüsü, kısa açıklama
- [ ] GitHub Pages'i açın (README'de anlatılıyor)
- [ ] Jam teslim formunda COP31 alt temalarıyla bağlantıyı anlatan paragraf
