# desktop-launcher.ps1
# Xeyal-System Masaustu Baslatici ve Kurucu

Write-Host "--- Xeyal-System Masaustu Uygulamasi Hazirlaniyor ---" -ForegroundColor Cyan

# 1. Bagimlilik Kontrolu
if (!(Get-Command "node" -ErrorAction SilentlyContinue)) {
    Write-Host "Hata: Node.js yuklu degil! Lutfen https://nodejs.org/ adresinden indirin." -ForegroundColor Red
    return
}

if (!(Get-Command "cargo" -ErrorAction SilentlyContinue)) {
    Write-Host "Uyari: Rust (Cargo) yuklu degil. Masaustu uygulamasi icin gereklidir." -ForegroundColor Yellow
}

# 2. NPM Bagimliliklarini Yukle
Write-Host "Bagimliliklar kontrol ediliyor..." -ForegroundColor DarkCyan
npm install

# 3. Uygulamayi Baslat
Write-Host "Arayuz baslatiliyor... Lutfen bekleyin." -ForegroundColor Magenta
npm run desktop
