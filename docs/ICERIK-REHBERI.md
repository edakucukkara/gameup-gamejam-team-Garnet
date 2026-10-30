# İçerik Rehberi · Kart, mektup ve son ekleme

Tüm içerik `index.html` dosyasının `<script>` bölümünde, düz Türkçe metin olarak duruyor. Bu rehber kod bilmeden içerik eklemeyi anlatıyor. Değişiklikten sonra sayfayı yenilemeniz yeterli.

## Yeni kart eklemek

`CARDS` listesine şu biçimde bir satır ekleyin:

```js
{id:"bisikletyarisi", c:"elif", min:2030, max:2050,
 t:"Antalya’da arabasız bir pazar günü düzenleyelim mi? Bütün şehir bisiklete binsin!",
 l:{x:"Esnaf kızar", e:5, h:-5},
 r:{x:"Düzenleyelim", h:10, d:5, e:-5, f:"arabasizgun"}},
```

| Alan | Zorunlu | Anlamı |
|---|---|---|
| `id` | ✔ | Benzersiz kısa isim (Türkçe karakter ve boşluk kullanmayın) |
| `c` | ✔ | Konuşan karakterin anahtarı (`CH` listesinden) |
| `t` | ✔ | Kartın metni. `{E}` yazarsanız oyuncunun seçimine göre "Anne" ya da "Baba" olur. |
| `l` / `r` | ✔ | Sol ve sağ seçenek |
| `x` | ✔ | Seçeneğin düğme yazısı (kısa tutun, en fazla ~18 karakter) |
| `d` `h` `e` `n` | | Doğa, Halk, Kasa, Enerji etkileri (ör. `d:10`, `e:-15`) |
| `f` | | Bu seçim bırakılınca eklenecek bayrak |
| `nx` | | `["kartId", 5]`: 5 yıl sonra o kartı getir (zincir) |
| `min` / `max` | | Kartın çıkabileceği yıl aralığı |
| `req` | | `["gunes"]`: sadece bu bayraklar varsa çıkar |
| `at` | | O yıl kesin çıkar (zorunlu hikâye kartı) |
| `chain` | | `1` ise kart sadece bir zincirle (`nx`) gelir, rastgele çıkmaz |
| `old` | | `1` ise karakter yaşlı çizilir (gri saç) |

### Denge kuralları
- Bir seçenek genelde **2–3 göstergeye** dokunsun.
- Etki büyüklükleri: hafif **5**, normal **10**, büyük **15**, dramatik **20** (nadiren).
- **İki seçenek de bir şeye mal olsun.** "Doğru cevap" belli olan kartlar oyunu sıkıcı yapar. Yeşil seçenek genelde Kasa ya da Halk'a, ekonomik seçenek Doğa'ya mal olmalı.
- Sağ ve sol seçenek toplamları kabaca eşit büyüklükte olsun.

### Yazım üslubu
- 1–2 cümle. Karakter kendi ağzından, gündelik dille konuşur.
- Oyuncuya "Başkan" denir. Cinsiyet belirten hitap kullanmayın.
- Gerçek yerler kullanın: Konyaaltı, Patara, Toroslar, Kaleiçi, Alanya, Olimpos, Manavgat, Düden.
- Arada mizah kartları koyun (martı, kedi, turist Hans). Ciddi konu, hafif ton.

## Yeni karakter eklemek

`CH` listesine ekleyin:

```js
umut:{n:"Umut", r:"Rehber", bg:"#6BA368",
      p:{skin:"#D9A27E", hair:"#2B1B12", hs:"short", shirt:"#264653", gl:1}},
```

| Portre alanı | Seçenekler |
|---|---|
| `hs` (saç) | `short`, `long`, `curly`, `bun`, `bald`, `cap` (şapka), `helmet` (baret), `scarf` (başörtüsü) |
| `skin`, `hair`, `shirt`, `cap` | Renk kodu (`#RRGGBB`) |
| `gl` | `1` → gözlük |
| `sun` | `1` → güneş gözlüğü |
| `beard`, `mus` | `1` → sakal, bıyık |
| `tie` | `1` → kravat |
| `t` | `"gull"` ya da `"cat"` → hayvan portresi |

`bg` kartın arka plan rengidir; her karakter için farklı olsun ki oyuncu kim konuşuyor hemen anlasın.

## Mektuplara yeni satır eklemek

- **Bayrak anısı:** `FL` listesine `bayrakAdi: "Deniz’in cümlesi."` ekleyin. Bu bayrağı bırakan bir kart seçilince sonraki mektupta Deniz bundan bahseder.
- **Dünya uyarıları:** `WORLD_LINES` içinde her göstergenin `lo` (düşük) ve `hi` (yüksek) metni var.
- **Sakin satırlar:** `CALM` listesi; hiçbir gösterge kritik değilken kullanılır.

## Yeni son eklemek

1. `ENDINGS` listesine `{n:"İsim", t:"Metin"}` ekleyin (`{Y}` yıl olarak değişir).
2. `END_ORDER` listesine ID'yi ekleyin.
3. `finalType()` fonksiyonuna koşulunu yazın.
4. Bitiş ekranındaki "x/12" sayısını yeni toplamla güncelleyin (`endGame` ve `showStart` içinde).

## Değişiklikten sonra kontrol listesi
- [ ] Tarayıcı konsolunda (F12) kırmızı hata yok
- [ ] Yeni kart en az bir kez göründü (test için `min`/`max` aralığını geçici olarak daraltabilirsiniz)
- [ ] Düğme yazısı telefonda tek ya da iki satıra sığıyor
- [ ] Metinlerde düz tırnak (`'`) yerine `’` kullanıldı
