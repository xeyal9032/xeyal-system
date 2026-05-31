# Xeyal-System - KURULUM ve BASLATICI
# Bu script sistemi sifirdan kurar ve GUI'yi baslatir.

Write-Host "--- Xeyal-System Kurulumu Baslatiliyor ---" -ForegroundColor Cyan

# 1. Kok Dizin Bagimliliklari
Write-Host "[1/3] Ana sistem bagimliliklari kuruluyor..." -ForegroundColor Yellow
npm install

# 2. Arayuz Bagimliliklari
Write-Host "[2/3] GUI bagimliliklari kuruluyor..." -ForegroundColor Yellow
cd desktop-app
npm install
cd ..

# 3. GUI Baslatiliyor
Write-Host "[3/3] Sistem derleniyor ve baslatiliyor... Lutfen bekleyin." -ForegroundColor Cyan
npm run desktop
