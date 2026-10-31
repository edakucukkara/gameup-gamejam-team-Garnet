"""Teslim paketi: itch.io'ya yüklenecek zip'i hazırlar.

Kullanım (repo klasöründe):  py tools/paket.py      (Mac/Linux: python3 tools/paket.py)
Çıktı: dist/gelecekten-mektup.zip  (dist/ ve .zip dosyaları git'e girmez)

Zip yalnızca oyunun çalışması için gereken dosyaları içerir; index.html zip'in kökündedir (itch.io bunu ister).
Bir dosya eksikse ya da sw.js'teki önbellek listesinde olup diskte yoksa durur ve söyler.
"""
import os, re, sys, zipfile

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
FILES = ["index.html", "data.js", "engine.js", "ui.js", "manifest.webmanifest", "sw.js",
         "icons/icon.svg", "icons/icon-192.png", "icons/icon-512.png", "icons/icon-180.png", "icons/icon-maskable-512.png"]

def main():
    if hasattr(sys.stdout, "reconfigure"): sys.stdout.reconfigure(errors="replace")
    missing = [f for f in FILES if not os.path.isfile(os.path.join(ROOT, f))]
    sw = open(os.path.join(ROOT, "sw.js"), encoding="utf-8").read()
    shell = re.search(r"const SHELL=\[(.*?)\]", sw, re.S).group(1)
    for f in re.findall(r'"([^"]+)"', shell):
        if f != "./" and f not in FILES:
            missing.append(f + " (sw.js önbellek listesinde ama pakette yok)")
    if missing:
        print("Paket hazırlanamadı, eksik dosyalar:\n  " + "\n  ".join(missing)); sys.exit(1)
    out = os.path.join(ROOT, "dist", "gelecekten-mektup.zip")
    os.makedirs(os.path.dirname(out), exist_ok=True)
    with zipfile.ZipFile(out, "w", zipfile.ZIP_DEFLATED) as z:
        for f in FILES: z.write(os.path.join(ROOT, f), f)
    kb = os.path.getsize(out) / 1024
    print(f"Hazır: {os.path.relpath(out, ROOT)}  ({len(FILES)} dosya, {kb:.0f} KB)")
    print("itch.io: Kind of project = HTML, zip'i yükle, 'This file will be played in the browser' işaretle,")
    print("         pencere 440 x 820, 'Mobile friendly' ve 'Fullscreen button' açık.")

if __name__ == "__main__":
    main()
