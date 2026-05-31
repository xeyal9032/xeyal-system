# create-desktop-shortcut.ps1
# Masaustune Xeyal-System kisayolu ekler

$TargetFile = "C:\Users\xeyal\Desktop\systemx\my-system\desktop-app\src-tauri\target\release\desktop-app.exe"

if (!(Test-Path $TargetFile)) {
    Write-Host "Hata: Derlenmis (.exe) dosyasi bulunamadi!" -ForegroundColor Red
    Write-Host "Once 'npm run build:desktop' komutunu calistirmalisiniz." -ForegroundColor Yellow
    return
}

$WshShell = New-Object -ComObject WScript.Shell
$ShortcutPath = "$HOME\Desktop\Xeyal-System.lnk"
$Shortcut = $WshShell.CreateShortcut($ShortcutPath)
$Shortcut.TargetPath = $TargetFile
$Shortcut.WorkingDirectory = "C:\Users\xeyal\Desktop\systemx\my-system\desktop-app\src-tauri"
$Shortcut.IconLocation = "$TargetFile,0"
$Shortcut.Description = "Xeyal-System: Otonom Gelistirici Isletim Sistemi"
$Shortcut.Save()

Write-Host "Basarili! Masaustune kisayol olusturuldu: $ShortcutPath" -ForegroundColor Green
