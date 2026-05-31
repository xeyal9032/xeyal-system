# Xeyal-System v1.5.1 Ultimate Build & Deploy Script
# Optimized for Hybrid Cloud Integration

$projectName = "xeyal-system"
$version = "1.5.1"
$rootPath = Resolve-Path ".."
$currentDir = Get-Location
$targetDir = "$env:LOCALAPPDATA\$projectName"

Clear-Host
Write-Host "====================================================" -ForegroundColor Cyan
Write-Host "   🚀 XEYAL-SYSTEM FULL-STACK BUILD ORCHESTRATOR" -ForegroundColor Cyan
Write-Host "====================================================" -ForegroundColor Cyan

# --- STAGE 1: Dependency Integrity Check ---
Write-Host "`n[1/4] Checking Module Integrity..." -ForegroundColor Yellow
$modules = @(
    @{ name = "Cloud Backend"; path = "$rootPath\xeyal-cloud" },
    @{ name = "Web Dashboard"; path = "$rootPath\xeyal-dashboard" },
    @{ name = "Core System"; path = "$currentDir" }
)

foreach ($m in $modules) {
    Write-Host "  Checking $($m.name)... " -NoNewline
    if (!(Test-Path "$($m.path)\node_modules")) {
        Write-Host "MISSING (Installing...)" -ForegroundColor Magenta
        Set-Location $m.path
        npm install --silent
        Set-Location $currentDir
    } else {
        Write-Host "OK" -ForegroundColor Green
    }
}

# --- STAGE 2: Environment Sync ---
Write-Host "`n[2/4] Syncing Core Components to Local AppData..." -ForegroundColor Yellow
if (!(Test-Path $targetDir)) { New-Item -ItemType Directory -Force -Path $targetDir | Out-Null }

$folders = @("cli", "core", "commands", "plugins", "config")
foreach ($f in $folders) {
    if (Test-Path "$currentDir\$f") {
        Copy-Item -Recurse -Force "$currentDir\$f" -Destination $targetDir
    }
}
Copy-Item "$currentDir\package.json" -Destination $targetDir
Copy-Item "$currentDir\FORGE_LIBRARY*.md" -Destination $targetDir -ErrorAction SilentlyContinue

# --- STAGE 3: Tauri Desktop Build ---
Write-Host "`n[3/4] Building Professional Desktop App (Tauri)..." -ForegroundColor Yellow
npm run build:desktop
if ($LASTEXITCODE -ne 0) {
    Write-Host "`n❌ FATAL ERROR: Tauri build failed. Check logs above." -ForegroundColor Red
    exit $LASTEXITCODE
}

# --- STAGE 4: Deployment & Launch ---
Write-Host "`n[4/4] Locating Integrated Installer..." -ForegroundColor Yellow
$installerDir = "$currentDir\desktop-app\src-tauri\target\release\bundle\nsis"
$installerName = "$($projectName)_$($version)_x64-setup.exe"
$fullInstallerPath = Join-Path $installerDir $installerName

if (Test-Path $fullInstallerPath) {
    Write-Host "`n✅ BUILD SUCCESSFUL! Hybrid Cloud stack is ready." -ForegroundColor Green
    Write-Host "Installer: $fullInstallerPath" -ForegroundColor Gray
    
    Write-Host "`nLaunching Installer..." -ForegroundColor Cyan
    Start-Process $fullInstallerPath
} else {
    Write-Host "`n❌ ERROR: Installer not found at: $fullInstallerPath" -ForegroundColor Red
}

Write-Host "`n====================================================" -ForegroundColor Cyan
Write-Host "   XEYAL-SYSTEM IS NOW PRODUCTION READY" -ForegroundColor Cyan
Write-Host "====================================================" -ForegroundColor Cyan
