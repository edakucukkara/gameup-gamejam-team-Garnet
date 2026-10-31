@echo off
rem Gelecekten Mektup: oyunu yerel sunucuyla açar (Windows). Çift tıklayın; kapatmak için bu pencereyi kapatın.
cd /d "%~dp0"
set PORT=8765
where py >nul 2>nul && (set PY=py) || (set PY=python)
start "" "http://localhost:%PORT%/"
echo Oyun acildi: http://localhost:%PORT%/
echo Denge testi:  http://localhost:%PORT%/tools/test.html
echo Kapatmak icin bu pencereyi kapatin.
%PY% -m http.server %PORT%
if errorlevel 1 (
  echo.
  echo Sunucu baslatilamadi. Port %PORT% baska bir program tarafindan kullaniliyor olabilir
  echo ya da Python kurulu degil: https://www.python.org/downloads/
  pause
)
