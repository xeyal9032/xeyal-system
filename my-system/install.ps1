# ================================================
# XEYAL-SYSTEM - Otomatik Kurulum Scripti
# Kullanici bu dosyayi calistirarak sistemi kurar
# ================================================

$ErrorActionPreference = "Stop"

Write-Host ""
Write-Host "============================================" -ForegroundColor Cyan
Write-Host "  XEYAL-SYSTEM v1.5.1 - KURULUM" -ForegroundColor Cyan
Write-Host "============================================" -ForegroundColor Cyan
Write-Host ""

# 1. Node.js kontrolu
Write-Host "[1/4] Node.js kontrol ediliyor..." -ForegroundColor Yellow
if (!(Get-Command "node" -ErrorAction SilentlyContinue)) {
    Write-Host ""
    Write-Host "HATA: Node.js bulunamadi!" -ForegroundColor Red
    Write-Host "Lutfen once Node.js indirip kurun: https://nodejs.org" -ForegroundColor Red
    Write-Host "Kurduktan sonra bu scripti tekrar calistirin." -ForegroundColor Yellow
    Write-Host ""
    Read-Host "Cikis icin Enter'a basin"
    exit 1
}
$nodeVersion = node -v
Write-Host "OK: Node.js $nodeVersion mevcut." -ForegroundColor Green

# 2. npm bagimliliklar kurulumu
Write-Host "[2/4] Sistem bagimliliklari kuruluyor..." -ForegroundColor Yellow
npm install --silent
if ($LASTEXITCODE -ne 0) {
    Write-Host "HATA: npm install basarisiz oldu!" -ForegroundColor Red
    Read-Host "Cikis icin Enter'a basin"
    exit 1
}
Write-Host "OK: Bagimliliklar kuruldu." -ForegroundColor Green

# 3. Desktop uygulamasini kur
Write-Host "[3/4] Masaustu uygulamasi kuruluyor..." -ForegroundColor Yellow
$setupFile = Get-ChildItem -Path "." -Filter "*setup*.exe" | Select-Object -First 1
if (!$setupFile) {
    $setupFile = Get-ChildItem -Path "." -Filter "*.exe" | Select-Object -First 1
}

if ($setupFile) {
    Write-Host "Kurulum dosyasi bulundu: $($setupFile.Name)" -ForegroundColor Green
    Start-Process -FilePath $setupFile.FullName -Wait
    Write-Host "OK: Masaustu uygulamasi kuruldu." -ForegroundColor Green
    
    # Copy CLI files to AppData where the installed exe expects them
    $appDataTarget = "$env:LOCALAPPDATA\xeyal-system"
    Write-Host "Sistem dosyalari kopyalaniyor: $appDataTarget" -ForegroundColor Yellow
    
    if (!(Test-Path $appDataTarget)) {
        New-Item -ItemType Directory -Path $appDataTarget -Force | Out-Null
    }
    
    $systemItems = @("cli", "core", "commands", "plugins", "config", "package.json")
    foreach ($item in $systemItems) {
        if (Test-Path $item) {
            Copy-Item -Recurse -Force -Path $item -Destination $appDataTarget
        }
    }
    
    # Install node_modules in the AppData location
    Push-Location $appDataTarget
    npm install --silent
    Pop-Location
    
    Write-Host "OK: Sistem dosyalari yerlestirildi." -ForegroundColor Green
} else {
    Write-Host "UYARI: .exe kurulum dosyasi bulunamadi, atlandi." -ForegroundColor Yellow
}

# 4. Masaüstu kisayolu olustur
Write-Host "[4/4] Masaustu kisayolu olusturuluyor..." -ForegroundColor Yellow
$currentDir = (Get-Location).Path
$shortcutPath = "$env:USERPROFILE\Desktop\Xeyal-System.lnk"
$WScript = New-Object -ComObject WScript.Shell
$shortcut = $WScript.CreateShortcut($shortcutPath)
$shortcut.TargetPath = "powershell.exe"
$shortcut.Arguments = "-NoExit -Command `"cd '$currentDir'; npm run desktop`""
$shortcut.WorkingDirectory = $currentDir
$shortcut.Description = "Xeyal-System Developer OS"
$shortcut.Save()
Write-Host "OK: Kisayol olusturuldu -> Masaustu\Xeyal-System.lnk" -ForegroundColor Green

# Tamamlandi
Write-Host ""
Write-Host "============================================" -ForegroundColor Cyan
Write-Host "  KURULUM TAMAMLANDI!" -ForegroundColor Green
Write-Host "============================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Sistemi baslatmak icin masaustundeki" -ForegroundColor White
Write-Host "'Xeyal-System' kisayolunu kullanin." -ForegroundColor White
Write-Host ""
Write-Host "Veya su komutu calistirin:" -ForegroundColor White
Write-Host "  npm run desktop" -ForegroundColor Cyan
Write-Host ""
Read-Host "Devam etmek icin Enter'a basin"
