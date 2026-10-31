# İçerik Rehberi · Dosya, mektup, not ve son ekleme

Bütün içerik `data.js` içinde, düz Türkçe metin olarak duruyor. Bu rehber kod bilmeden içerik eklemeyi anlatıyor. Değişiklikten sonra sayfayı yenileyin ve **denge testini** çalıştırın (en altta).

## Yeni dosya (kart) eklemek

`CARDS` listesine şu biçimde bir satır ekleyin:

```js
{id:"bisiklet", idle:"l", c:"yusuf", min:2030, max:2046,
 t:"Şehirlerde arabasız pazar günleri düzenleyelim mi? Bütün dünya bisiklete binsin!",
 l:{x:"Esnaf kızar", e:5, h:-5},
 r:{x:"Düzenleyelim", h:5, d:5, e:-5, f:"arabasiz", tal:-1}},
```

| Alan | Zorunlu | Anlamı |
|---|---|---|
| `id` | ✔ | Benzersiz kısa isim (Türkçe karakter ve boşluk yok) |
| `c` | ✔ | Konuşan karakterin anahtarı (`CH` listesinden) |
| `t` | ✔ | Dosyanın metni (en fazla ~150 harf). Masada ilk cümlesi görünür. |
| `l` / `r` | ✔ | İki seçenek |
| `x` | ✔ | Seçeneğin düğme yazısı (en fazla 24 harf) |
| `d` `h` `e` `n` | | Doğa, Uluslar, Fon, Enerji etkileri (ör. `d:10`, `e:-5`) |
| `tk` `fk` `tal` `r` `tg` `or` `ok` `uy` `gv` `mt` `rm` | | Arka plandaki dünyaya etkiler (anlamları `engine.js` → `SYS0` üstünde) |
| `f` | | Seçim bir bayrak bırakır (mektup anısı, sahne izi, kilit) |
| `nx` | | `["kartId", 10]`: 10 yıl sonra o dosyayı getir (zincir). Birden fazlası için `[["a",6],["b",12]]` |
| `lock` | | `["bayrak"]`: bu bayrak varsa seçenek kapanır |
| `min` / `max` | | Dosyanın gelebileceği yıl aralığı. `max` aynı zamanda **son gün**dür. |
| `idle` | `max` varsa ✔ | `"l"` ya da `"r"`: vakti dolarsa kendiliğinden işleyen seçenek ("hiçbir şey yapmamak" hangisiyse) |
| `req` | | `["gunes"]`: yalnızca bu bayraklar varsa gelir |
| `at` | | O yıl kesin ve tek başına gelir |
| `chain` | | `1`: yalnızca bir zincirle (`nx`) gelir |
| `old` | | `1`: karakter yaşlı çizilir |

**Metindeki yer tutucular:** `{E}` → Ece'nin hitabı ("Baba"/"Anne"), `{H}` → Deniz'in hitabı ("Dede"/"Nine"), `{Y}` → yıl.

### Denge kuralları
- Bir seçenek genelde **2–3 dengeye** dokunsun. Büyüklükler: hafif **5**, normal **10**, büyük **15**.
- **İki seçenek de bir şeye mal olsun.** Yeşil seçenek genelde Fon ya da Uluslar'a, ekonomik seçenek Doğa'ya mal olsun.
- Temiz enerji eklerken Enerji'yi çok yükseltmeyin; Ekleme Tuzağı'na (Enerji 100) kolay düşülür.

### Yazım üslubu
- 1–2 cümle; karakter kendi ağzından, gündelik dille konuşur. Oyuncuya "Başkan" denir, cinsiyet belirten hitap yok.
- Gerçek yerler ve olgular: Belek, Konya Ovası, Toroslar, Pencap, Amazon, Pasifik adaları.
- Arada mizah dosyaları (martı, kedi, turist Hans): ciddi konu, hafif ton.
- Metinlerde düz tırnak (`'`) yerine `’` kullanın.

## Kapı kilidi eklemek
1. Kapanacak seçeneğe `lock:["bayrak"]` yazın.
2. `LOCKS` listesine sebebi ekleyin (geçmiş zamanda, oyuncuya hitapla): `otel:"Belek kumsalına otel ve marina kurulmasına izin verdin"`.
3. `DOORS` listesine karar anında çıkacak yumuşak notu ekleyin: `otel:"Kumsala beton girdi. Belek’i carettalar için korumak artık eskisi kadar kolay değil."`. Not neyin kapandığını söyler ama sert olmaz.
4. Kilitli seçenek kartta görünmez; açık kalan seçenek tek başına ve "Bu konuda elin bağlı" notuyla gelir. İki seçeneği birden kapatmayın (test bunu yakalar).

## Gelecekten not eklemek
`HINTS` listesine dosyanın `id`'siyle bir cümle ekleyin. Deniz 2075'ten konuşur, ne yapılacağını söylemez, o kararın nasıl hatırlandığını ima eder:

```js
otel:"Okulda Belek’i anlattılar: bir otel kararıyla kumsalın nasıl daraldığını. O dosya şimdi senin masanda mı?",
```

## Yeni karakter eklemek

```js
umut:{n:"Umut", r:"Rehber", bg:"#6BA368",
      p:{skin:"#D9A27E", hair:"#2B1B12", hs:"short", shirt:"#264653", gl:1}},
```

| Portre alanı | Seçenekler |
|---|---|
| `hs` (saç) | `short`, `long`, `curly`, `bun`, `bald`, `cap` (şapka), `helmet` (baret), `scarf` (başörtüsü) |
| `skin`, `hair`, `shirt`, `cap` | Renk kodu (`#RRGGBB`) |
| `gl` / `sun` / `beard` / `mus` / `tie` | `1` → gözlük / güneş gözlüğü / sakal / bıyık / kravat |
| `t` | `"gull"` ya da `"cat"` → hayvan portresi |

`r` masada dosyanın sekmesinde yazar. `bg` portrenin arka planıdır; her karakter için farklı olsun.

## Mektuplar
- **Anı satırı:** `FL` listesine `bayrak:"Deniz’in cümlesi."`. O bayrağı bırakan seçim yapılınca sonraki mektupta Deniz bundan bahseder. Torunun ağzından, çoğu zaman annesinden ya da okuldan duyduğunu anlatarak.
- **Dünya uyarıları:** `WORLD_LINES` → her dengenin `lo` ve `hi` satırları.
- **Sakin satırlar:** `CALM`. **İklim satırları:** `CLIMATE` (`lo` / `mid` / `hi`).
- **Kapı satırları:** `LOCKLINES` (`{Y}` = yıl, `{W}` = sebep).
- Giriş, final ve çember mektupları `engine.js` → `introLetter`, `epiLetter`, `loopLetter` içinde.

## Final kartları
`EPI` listesine ekleyin. `need:["bayrak", …]` bayraklardan biri varsa kart gelir; `last:1` her zaman en sondadır. Kilitli seçenek oyuncunun kapattığı bir kapıyı temsil eder (`lock` alanı).

## Sahneye iz eklemek
`ui.js` → `DEC` (hangi bayrakla görüneceği), `CAP` (ilk göründüğünde çıkan not) ve `buildWorld` içinde `g("dİsim", svg)` ile çizim. Sahne 360×150 birimlik bir SVG.

## Yeni son eklemek
1. `ENDINGS` listesine `{n:"İsim", h:"İpucu", t:"Metin"}` ekleyin (`{Y}` yıl olur).
2. `END_ORDER` listesine ID'yi ekleyin.
3. `engine.js` → `finalType` içine koşulu yazın.
4. "x/12" sayısını güncelleyin (`ui.js` → `endGame` ve `showStart`).

## Değişiklikten sonra kontrol listesi
- [ ] Denge testi yeşil: oyunu açıp `http://localhost:8765/tools/test.html` → "Testi çalıştır" (ya da `node tools/sim.js 3000 --detay`). **0 hata** olmalı, uyarıları da okuyun.
- [ ] Tarayıcı konsolunda (F12) kırmızı hata yok.
- [ ] Yeni dosya en az bir kez göründü (test için `min`/`max` aralığını geçici daraltabilirsiniz).
- [ ] Düğme yazısı telefonda bir ya da iki satıra sığıyor.
- [ ] Yeni bir dosya (görsel, ses) eklediyseniz `sw.js` → `SHELL` ve `tools/paket.py` → `FILES` listelerine de ekleyip `CACHE` adını artırdınız.
