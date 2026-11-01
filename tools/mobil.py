"""Mobil paket: Capacitor'ın Android/iOS uygulamasına koyacağı www/ klasörünü üretir.

Kullanım (repo klasöründe):
    python3 tools/mobil.py            # www/ üretir ve android/ + ios/ projelerine kopyalar (npx cap sync)
    python3 tools/mobil.py --apk      # ayrıca hata ayıklama APK'sı derler → dist/Gelecekten-Mektup.apk

Web sürümünden (tools/yayin.py → dist/pwa) farkları:
  - Yazı tipleri internetten değil fonts/ klasöründen gelir; uygulama ilk açılışta da internetsiz aynı görünür.
  - Manifest ve service worker yok: dosyalar zaten cihazda, önbelleğe gerek yok.
JS, web sürümündeki gibi küçültülüp karartılır (tools/yayin.py'deki minify()).
"""
import os, re, shutil, subprocess, sys

sys.dont_write_bytecode = True  # tools/__pycache__ oluşmasın
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from yayin import ROOT, ICONS, minify, read  # noqa: E402

WWW = os.path.join(ROOT, "www")
FONTS_LINK = re.compile(r'<link rel="preconnect" href="https://fonts\.googleapis\.com">\s*'
                        r'<link rel="preconnect" href="https://fonts\.gstatic\.com" crossorigin>\s*'
                        r'<link rel="stylesheet" href="https://fonts\.googleapis\.com/[^"]*">')


def build_www(mini):
    shutil.rmtree(WWW, ignore_errors=True)
    os.makedirs(os.path.join(WWW, "icons"))
    open(os.path.join(WWW, "app.min.js"), "w", encoding="utf-8", newline="\n").write(mini)

    html = read("index.html")
    html, n = re.subn(r'<script src="data.js"></script>\s*<script src="engine.js"></script>\s*'
                      r'<script src="ui.js"></script>', '<script src="app.min.js"></script>', html, count=1)
    html, m = FONTS_LINK.subn('<link rel="stylesheet" href="fonts/fonts.css">', html, count=1)
    if not (n and m):
        sys.exit("index.html beklenen <script>/yazı tipi satırlarını içermiyor; tools/mobil.py'yi güncelleyin.")
    html = re.sub(r'<link rel="manifest"[^>]*>\n?', "", html)
    html = re.sub(r'<link rel="apple-touch-icon"[^>]*>\n?', "", html)
    open(os.path.join(WWW, "index.html"), "w", encoding="utf-8", newline="\n").write(html)

    shutil.copytree(os.path.join(ROOT, "fonts"), os.path.join(WWW, "fonts"))
    for ic in ICONS:
        shutil.copy(os.path.join(ROOT, "icons", ic), os.path.join(WWW, "icons", ic))


def run(cmd, cwd=ROOT):
    print("$", " ".join(cmd))
    if subprocess.run(cmd, cwd=cwd).returncode:
        sys.exit(f"Komut hata verdi: {' '.join(cmd)}")


def main():
    if hasattr(sys.stdout, "reconfigure"):
        sys.stdout.reconfigure(errors="replace")
    build_www(minify())
    print(f"www/ hazir ({sum(len(f) for _, _, f in os.walk(WWW))} dosya)")
    run(["npx", "cap", "sync"])
    if "--apk" in sys.argv:
        run(["./gradlew", "assembleDebug"], cwd=os.path.join(ROOT, "android"))
        apk = os.path.join(ROOT, "dist", "Gelecekten-Mektup.apk")
        shutil.copy(os.path.join(ROOT, "android", "app", "build", "outputs", "apk", "debug", "app-debug.apk"), apk)
        print(f"APK: {os.path.relpath(apk, ROOT)}  ({os.path.getsize(apk)/1024/1024:.1f} MB)")


if __name__ == "__main__":
    main()
