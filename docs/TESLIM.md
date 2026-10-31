# Teslim · GameUp Game Jam 2026

Teslimde kopyalanıp yapıştırılacak metinler ve kontrol listesi. Linkleri yayına aldıktan sonra doldurun.

| | |
|---|---|
| Oyun (GitHub Pages) | https://edakucukkara.github.io/gameup-gamejam-team-Garnet/ |
| Kaynak kod | https://github.com/edakucukkara/gameup-gamejam-team-Garnet |
| Tek dosya (jüriye gönderilecek) | `py tools/tekdosya.py` → `dist/Gelecekten-Mektup.html` (çift tıklayınca açılır) |
| itch.io (isteğe bağlı) | `py tools/paket.py` → `dist/gelecekten-mektup.zip` |

## Kontrol listesi
- [ ] PR `main`'e birleştirildi.
- [ ] GitHub Pages açık, oyun telefonda açılıyor, "Ana ekrana ekle" ile kuruluyor.
- [ ] Denge testi yeşil (`/tools/test.html`).
- [ ] Tek dosya hazırlandı ve başka bir bilgisayarda çift tıklayınca açıldığı denendi.
- [ ] (İsteğe bağlı) Repo herkese açıldıysa GitHub Pages linki forma eklendi; itch.io yalnızca jam formu isterse.
- [ ] Video ve ekran görüntüleri hazır.
- [ ] Jam formu dolduruldu, linkler eklendi.

## Kısa tanıtım (bir cümle)
2075'teki torunun Deniz sana mektup yazıyor: Küresel İklim Konseyi'nin başında, masana gelen dosyaların hepsine yetişemeden verdiğin her karar onun dünyasını değiştiriyor.

## itch.io sayfa metni
> **Gelecekten Mektup**
>
> Yıl 2026. Küresel İklim Konseyi'nin başına seçildin. Masanda bir mektup duruyor: 2075'ten, torunun Deniz'den.
>
> Her yıl masana dünyanın dört bir yanından dosyalar gelir: Pasifik'te batan bir ada, Konya'da kuruyan kuyular, Belek'te caretta yuvaları, Amazon'dan geçecek bir otoyol. Yalnız birine vaktin var. Bekleyen dosyanın vakti dolarsa karar senin yerine verilir.
>
> Dört dengeyi koru: Doğa, Uluslar, Fon, Enerji. Biri sıfırlanır ya da taşarsa zaman çizgisi kopar. Bazı kararlar kapıları sonsuza dek kapatır; yıllar sonra o konu masana geldiğinde elin bağlıdır. Arada bir Deniz, gelecekten küçük bir not sıkıştırır.
>
> Arkada gerçek verilere dayanan basit bir iklim modeli çalışır: birikimli CO₂, deniz seviyesi, enerji sistemi, ormanlar, okyanuslar. 2075'e ulaşırsan Deniz'in gözünden bakarsın ve oyun, onun sana ilk mektubu yazdığı anla bir çember gibi kapanır.
>
> 12 son · yaklaşık 10 dakika · telefon ve bilgisayar · Türkçe
>
> Telefonda "Ana ekrana ekle" ile uygulama gibi kurulabilir, internetsiz de çalışır.

**itch.io ayarları:** Kind of project: HTML · zip'i yükle → "This file will be played in the browser" · Viewport 440 × 820 · "Mobile friendly" ve "Fullscreen button" açık · Genre: Interactive Fiction / Simulation · Etiketler: `climate`, `cop31`, `narrative`, `choices`, `card-game`, `turkish`, `mobile`, `educational`.

## COP31 alt temalarıyla bağlantı (form paragrafı)
Gelecekten Mektup, COP31'in odak alanlarının hepsini oyuncunun masasına gelen dosyalara dağıtır. **Yenilenebilir enerji:** güneş tarlaları, açık deniz rüzgârı, batarya parkları ve kömürden çıkış; temiz enerji eklerken eskisini kapatmamak "Ekleme Tuzağı" sonuna götürür. **Karbon ayak izi:** karbon fiyatı, sık uçana vergi, metan sızıntıları, veri merkezleri. **İklime dirençli şehirler:** erken uyarı sistemleri, mangrovlar ya da beton setler, planlı geri çekilme, sıcak dalgası merkezleri. **Gıda güvenliği:** Konya'daki kuyular ve obruklar, damla sulama, tuza dayanıklı tohum bankası, gıda israfı. **Okyanuslar:** av kotası, plastik antlaşması, derin deniz madenciliği, Belek carettaları, mercanlar. **İklim eğitimi:** okullara iklim dersi, gençlik koltuğu, gazetecilik. **Sıfır atık:** kompost ve israf hedefleri. Oyunun mesajı mekaniğin kendisinde: tek başına yeşil seçmek yetmez, sürdürülebilirlik doğa, insanlar, bütçe ve enerji arasında bir dengedir. Kapanan kapılar mekaniği, Almanya Anayasa Mahkemesi'nin Neubauer kararındaki fikre dayanır: bugün ertelenen her karar gelecek kuşakların seçeneklerini daraltır. Deniz Antalya'dan yazar; oyun Antalya'nın kıyısını, Toroslar'ı, Belek'i ve Konya Ovası'nı merkeze alır.

## Sunumda söylenecekler
- **Türden farkımız:**
  - Lapse ve Reigns'te tek kart ve iki seçenek vardır. Bizde her yıl masana birkaç dosya gelir ve hangisine vakit ayıracağını sen seçersin. Bekleyen dosyanın vakti dolarsa karar senin yerine verilir: karar vermemek de bir karardır.
  - Bazı kararlar kapıları kalıcı olarak kapatır; yıllar sonra o konu geldiğinde elin bağlıdır.
  - Reigns'te taht el değiştirir; bizde koltuk değil, dünya miras kalır. 2075'te torununun gözünden bakarsın ve oyun, onun sana ilk mektubu yazdığı anla bir çember gibi kapanır.
- **Neden torun:** İklim kararlarının bedelini en çok bugün henüz doğmamış olanlar ödüyor. Mektuplar o kuşağın sesi.
- **Fikrin dayanağı:** Neubauer kararı (2021): ertelenen emisyon azaltımı gençlerin gelecekteki özgürlüklerini kısıtlar.
- **Yaşayan bir dünya:** Arkada birikimli CO₂ (IPCC AR6 TCRE: her 1000 milyar ton ≈ +0,45°C), deniz seviyesi, enerji sistemi, ormanlar, okyanuslar, uyum ve güven çalışıyor. Eşikler aşılınca olaylar geliyor. Rapor panelinde oyuncunun dilinde görülebiliyor.
- **Gerçek ve yerel:** Konya obrukları, Belek carettaları (Anamur'da yavruların %85'i dişi), Antalya'da Temmuz 2025'te 46,1°C, Akdeniz'in dünya ortalamasından %20 hızlı ısınması. Kaynaklar oyunun bitiş ekranında.
- **Mesaj:** Tek başına yeşil yetmez (Halksız Yeşil), temiz enerji eklemek yetmez kirliyi bırakmak gerekir (Ekleme Tuzağı), adalet olmadan uzlaşı dağılır (Konsey Dağıldı).
- **Test edilmiş denge:** Simülasyon binlerce oyunla ölçüyor. İnsan gibi dengeli oynayanların %79'u 2075'e varıyor; yalnızca yeşil oynayanların %36'sı.
- **Her yerde oynanır:** Web'de açılır, telefona uygulama gibi kurulur, internetsiz çalışır.
- **Jüri sorarsa:** İklim modeli öğretici bir basitleştirme; 2075 sonuçları IPCC aralıklarında. Konsey, karakterler ve şirketler kurgu.
