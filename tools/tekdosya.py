"""Tek dosyalık oyun: çift tıklayınca tarayıcıda açılan Gelecekten-Mektup.html dosyasını hazırlar.

Kullanım (repo klasöründe):  py tools/tekdosya.py      (Mac/Linux: python3 tools/tekdosya.py)
Çıktı: dist/Gelecekten-Mektup.html  (dist/ git'e girmez)

data.js, engine.js ve ui.js sayfanın içine gömülür, simge data URI olur. Sunucu, kurulum ya da internet
gerekmez; internet yoksa yalnızca Google yazı tipleri yedek yazı tipine düşer. Uygulama kurulumu (manifest,
service worker) tek dosyada çalışmadığı için çıkarılır; o özellik GitHub Pages sürümünde var.
Jüriye, demo için ya da arkadaşlara göndermek için bu dosya yeterli.
"""
import base64, os, re, sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT = os.path.join(ROOT, "dist", "Gelecekten-Mektup.html")

def read(p): return open(os.path.join(ROOT, p), encoding="utf-8").read()

def main():
    if hasattr(sys.stdout, "reconfigure"): sys.stdout.reconfigure(errors="replace")
    html = read("index.html")
    for js in ["data.js", "engine.js", "ui.js"]:
        tag = f'<script src="{js}"></script>'
        if tag not in html: print(f"index.html içinde {tag} bulunamadı"); sys.exit(1)
        code = read(js).replace("</script", "<\\/script")
        html = html.replace(tag, f"<script>\n{code}\n</script>")
    html = re.sub(r'^if\("serviceWorker" in navigator.*\n', "", html, flags=re.M)
    html = re.sub(r'<link rel="manifest"[^>]*>\n?', "", html)
    html = re.sub(r'<link rel="apple-touch-icon"[^>]*>\n?', "", html)
    icon = "data:image/svg+xml;base64," + base64.b64encode(read("icons/icon.svg").encode()).decode()
    html = html.replace('href="icons/icon.svg"', f'href="{icon}"')
    os.makedirs(os.path.dirname(OUT), exist_ok=True)
    open(OUT, "w", encoding="utf-8", newline="\n").write(html)
    print(f"Hazır: {os.path.relpath(OUT, ROOT)}  ({os.path.getsize(OUT) / 1024:.0f} KB)")
    print("Çift tıklayınca tarayıcıda açılır. Jüriye ya da arkadaşlarına bu dosyayı gönderebilirsin.")

if __name__ == "__main__":
    main()
