# ================================================
# XEYAL-SYSTEM - Release Paketleyici
# Gelistirici bu scripti calistirarak ZIP olusturur
# Kullanim: ./package-release.ps1
# ================================================

$version = "1.5.1"
$outputName = "xeyal-system-v$version-windows"
$outputZip = "..\$outputName.zip"
$stagingDir = "..\$outputName"

Write-Host ""
Write-Host "============================================" -ForegroundColor Cyan
Write-Host "  XEYAL-SYSTEM Release Paketleyici" -ForegroundColor Cyan
Write-Host "============================================" -ForegroundColor Cyan
Write-Host ""

# Onceki staging klasorunu temizle
if (Test-Path $stagingDir) {
    Write-Host "Onceki staging klasoru temizleniyor..." -ForegroundColor Yellow
    Remove-Item -Recurse -Force $stagingDir
}
if (Test-Path $outputZip) {
    Remove-Item -Force $outputZip
}

# Staging klasorunu olustur
New-Item -ItemType Directory -Path $stagingDir | Out-Null
Write-Host "Staging klasoru olusturuldu: $stagingDir" -ForegroundColor Green

# Kaynak dosyalari kopyala
Write-Host "[1/3] Sistem dosyalari kopyalaniyor..." -ForegroundColor Yellow
$itemsToCopy = @("cli", "core", "commands", "plugins", "config", "package.json", "install.ps1", "INSTALL_GUIDE.md")
foreach ($item in $itemsToCopy) {
    if (Test-Path $item) {
        Copy-Item -Recurse -Path $item -Destination $stagingDir
        Write-Host "  Kopyalandi: $item" -ForegroundColor Gray
    } else {
        Write-Host "  ATLANDI (bulunamadi): $item" -ForegroundColor Yellow
    }
}

# Infografik dosyasini kopyala (Absolute path'den)
$infographicSrc = "C:\Users\xeyal\.gemini\antigravity\brain\37d42378-06c0-4558-a591-e30b4c4600ce\xeyal_system_installation_guide_1776556674229.png"
if (Test-Path $infographicSrc) {
    Copy-Item -Path $infographicSrc -Destination "$stagingDir\installation_guide.png"
    Write-Host "  Kopyalandi: installation_guide.png (AI Generated)" -ForegroundColor Cyan
}

# Setup .exe dosyasini kopyala
Write-Host "[2/3] Kurulum dosyasi kopyalaniyor..." -ForegroundColor Yellow
$exePath = "desktop-app\src-tauri\target\release\bundle\nsis\xeyal-system_${version}_x64-setup.exe"
if (Test-Path $exePath) {
    Copy-Item -Path $exePath -Destination $stagingDir
    Write-Host "  Kopyalandi: $(Split-Path $exePath -Leaf)" -ForegroundColor Gray
} else {
    Write-Host "  UYARI: .exe bulunamadi. Once 'npm run build:desktop' calistirin!" -ForegroundColor Red
}

# node_modules'u kopyalama
$nmPath = "$stagingDir\node_modules"
if (Test-Path $nmPath) {
    Remove-Item -Recurse -Force $nmPath
}

# ZIP ollustur
Write-Host "[3/3] ZIP paketi olusturuluyor..." -ForegroundColor Yellow
Compress-Archive -Path $stagingDir -DestinationPath $outputZip -Force
Remove-Item -Recurse -Force $stagingDir

$zipSize = [math]::Round((Get-Item $outputZip).Length / 1MB, 2)
Write-Host ""
Write-Host "============================================" -ForegroundColor Cyan
Write-Host "  PAKET HAZIRLANDI!" -ForegroundColor Green
Write-Host "============================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Dosya : $(Resolve-Path $outputZip)" -ForegroundColor White
Write-Host "Boyut : $zipSize MB" -ForegroundColor White
Write-Host ""
Write-Host "Kullaniciya bu ZIP dosyasini gonderin." -ForegroundColor Yellow
Write-Host "Kullanici ZIP'i acip 'install.ps1' calistirsin." -ForegroundColor Yellow
Write-Host ""
