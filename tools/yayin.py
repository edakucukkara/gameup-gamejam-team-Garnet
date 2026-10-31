"""Yayın paketi: oyunu küçültülmüş (minify) ve okunması zorlaştırılmış (obfuscate) tek dosyaya indirir.

Kullanım (repo klasöründe):
    python3 tools/yayin.py            # esbuild'i npx ile çalıştırır (Node gerekir)
    ESBUILD=/yol/esbuild python3 tools/yayin.py   # hazır bir esbuild'i kullanır

Üretilenler (dist/ git'e girmez):
  dist/pwa/            → HTTPS bir yere yüklenecek PWA paketi (telefona uygulama gibi kurulur, çevrimdışı çalışır)
  dist/Gelecekten-Mektup.html  → çift tıklayınca açılan tek dosya (jüri, demo ve arkadaşlar için)

data.js + engine.js + ui.js tek bir işleve (IIFE) sarılıp küçültülür; değişken adları anlamsızlaşır, yorumlar
silinir. Repodaki okunur kaynak dosyalar değişmez; yalnız dist/ içindekiler karartılır. Bu bir kapı kilididir,
kasa değil: metinler yine ekranda görünür, kararlı biri kodu yine çözebilir. Asıl koruma repo'nun private olması
ve telif notudur.
"""
import base64, hashlib, os, re, shutil, subprocess, sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SRC = ["data.js", "engine.js", "ui.js"]
ICONS = ["icon.svg", "icon-192.png", "icon-512.png", "icon-180.png", "icon-maskable-512.png"]
BANNER = "/* (c) 2026 Team Garnet - Gelecekten Mektup. Tum haklari saklidir. */"


def read(p):
    return open(os.path.join(ROOT, p), encoding="utf-8").read()


def esbuild_cmd():
    env = os.environ.get("ESBUILD")
    if env:
        return [env]
    if shutil.which("esbuild"):
        return ["esbuild"]
    if shutil.which("npx"):
        return ["npx", "--yes", "esbuild@0.21.5"]
    sys.exit("esbuild bulunamadi. Node kurun (npx gelir) ya da ESBUILD=/yol/esbuild verin.")


def minify():
    """Üç dosyayı tek IIFE'ye sarıp küçültür; karartılmış JS'i döndürür."""
    wrapped = "(()=>{\n" + "\n".join(read(f) for f in SRC) + "\n})();\n"
    tmp = os.path.join(ROOT, "dist", "_wrapped.js")
    os.makedirs(os.path.dirname(tmp), exist_ok=True)
    open(tmp, "w", encoding="utf-8", newline="\n").write(wrapped)
    try:
        out = subprocess.run(
            esbuild_cmd() + [tmp, "--minify", "--target=es2019", "--charset=utf8", f"--banner:js={BANNER}"],
            capture_output=True, text=True)
    finally:
        os.remove(tmp)
    if out.returncode:
        sys.exit("esbuild hata verdi:\n" + out.stderr.strip())
    return out.stdout


def build_single(mini):
    """Tek dosya: küçültülmüş JS gömülü, manifest/service worker yok, simge data URI."""
    html = read("index.html")
    block = "<script>\n" + mini.replace("</script", "<\\/script") + "\n</script>"
    html = re.sub(r'<script src="data.js"></script>\s*<script src="engine.js"></script>\s*'
                  r'<script src="ui.js"></script>', lambda m: block, html, count=1)
    html = re.sub(r'^if\("serviceWorker" in navigator.*\n', "", html, flags=re.M)
    html = re.sub(r'<link rel="manifest"[^>]*>\n?', "", html)
    html = re.sub(r'<link rel="apple-touch-icon"[^>]*>\n?', "", html)
    icon = "data:image/svg+xml;base64," + base64.b64encode(read("icons/icon.svg").encode()).decode()
    html = html.replace('href="icons/icon.svg"', f'href="{icon}"')
    out = os.path.join(ROOT, "dist", "Gelecekten-Mektup.html")
    open(out, "w", encoding="utf-8", newline="\n").write(html)
    return out, len(html.encode())


def build_pwa(mini):
    """PWA paketi: index.html (tek app.min.js), app.min.js, manifest, sw.js (güncel önbellek), simgeler."""
    d = os.path.join(ROOT, "dist", "pwa")
    shutil.rmtree(d, ignore_errors=True)
    os.makedirs(os.path.join(d, "icons"), exist_ok=True)
    open(os.path.join(d, "app.min.js"), "w", encoding="utf-8", newline="\n").write(mini)

    html = re.sub(r'<script src="data.js"></script>\s*<script src="engine.js"></script>\s*'
                  r'<script src="ui.js"></script>', '<script src="app.min.js"></script>',
                  read("index.html"), count=1)
    open(os.path.join(d, "index.html"), "w", encoding="utf-8", newline="\n").write(html)

    open(os.path.join(d, "manifest.webmanifest"), "w", encoding="utf-8", newline="\n").write(read("manifest.webmanifest"))

    # sw.js: üç kaynak dosya yerine app.min.js; önbellek adı içeriğe göre değişir, böylece oyuncu yeni sürümü alır
    sw = read("sw.js")
    sw = sw.replace('"data.js","engine.js","ui.js"', '"app.min.js"')
    ver = hashlib.sha1((mini + html).encode()).hexdigest()[:8]
    sw = re.sub(r'const CACHE="[^"]*"', f'const CACHE="gelecekten-mektup-{ver}"', sw)
    open(os.path.join(d, "sw.js"), "w", encoding="utf-8", newline="\n").write(sw)

    for ic in ICONS:
        shutil.copy(os.path.join(ROOT, "icons", ic), os.path.join(d, "icons", ic))
    return d, ver


def main():
    if hasattr(sys.stdout, "reconfigure"):
        sys.stdout.reconfigure(errors="replace")
    raw = sum(len(read(f).encode()) for f in SRC)
    mini = minify()
    single, sz = build_single(mini)
    pwa, ver = build_pwa(mini)
    print(f"Kaynak JS {raw/1024:.0f} KB -> kucultulmus {len(mini.encode())/1024:.0f} KB")
    print(f"Tek dosya : {os.path.relpath(single, ROOT)}  ({sz/1024:.0f} KB) - cift tiklayinca acilir")
    print(f"PWA paketi: {os.path.relpath(pwa, ROOT)}/  (onbellek surumu {ver})")
    print("  HTTPS bir yere yukleyin (Netlify/Cloudflare Pages/itch.io). Telefonda 'Ana ekrana ekle' ile kurulur.")


if __name__ == "__main__":
    main()
