# Xeyal-System Otomatik Senkronizasyon, Derleme ve Kurulum Betiği
# Bu betik yerel dosyaları LOCALAPPDATA'ya taşır, yeni bir EXE üretir ve otomatik kurar.

$ErrorActionPreference = "Stop"

# 1. Sürüm bilgisini al
$pkg = Get-Content "package.json" | ConvertFrom-Json
$version = $pkg.version
$target = "$env:LOCALAPPDATA\xeyal-system"
$exePath = "desktop-app\src-tauri\target\release\bundle\nsis\xeyal-system_$($version)_x64-setup.exe"

Write-Host "`n[1/3] 🔄 Dosyalar Senkronize Ediliyor (v$version)..." -ForegroundColor Cyan
if (!(Test-Path $target)) { 
    New-Item -ItemType Directory -Path $target -Force | Out-Null 
}

# Gereksiz dosyaları temizle ve güncel olanları kopyala
$folders = @("cli", "core", "commands", "plugins", "config", "dashboard")
foreach ($folder in $folders) {
    if (Test-Path $folder) {
        Write-Host "   - Kopyalanıyor: $folder"
        Copy-Item -Recurse -Force $folder $target
    }
}
Copy-Item "package.json" $target
Copy-Item "FORGE_LIBRARY*.md" $target -ErrorAction SilentlyContinue
Write-Host "✅ Senkronizasyon Tamamlandı." -ForegroundColor Green

Write-Host "`n[2/3] 🏗️  Masaüstü Uygulaması Derleniyor (Tauri)..." -ForegroundColor Yellow
npm run build:desktop

Write-Host "`n[3/3] 🚀 Otomatik Kurulum Başlatılıyor..." -ForegroundColor Cyan
if (Test-Path $exePath) {
    Write-Host "✨ İşlem Başarılı! Kurulum sessiz modda yapılıyor..." -ForegroundColor Green
    # /S flag'i ile kullanıcı etkileşimi olmadan arka planda kurar
    Start-Process -FilePath $exePath -ArgumentList "/S" -Wait
    Write-Host "✅ Kurulum Tamamlandı! Uygulamanız güncellendi." -ForegroundColor Green
} else {
    Write-Host "❌ Hata: Derlenmiş EXE dosyası bulunamadı: $exePath" -ForegroundColor Red
}

Write-Host "`n🌟 Xeyal-System Güncel ve Hazır!`n" -ForegroundColor DarkGreen
