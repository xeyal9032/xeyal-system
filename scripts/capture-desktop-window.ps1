# Tauri masaustu penceresinin ekran goruntusunu alir
param(
    [string]$ExePath,
    [string]$OutFile,
    [int]$WaitMs = 9000
)

$ErrorActionPreference = 'Stop'

$code = @'
using System;
using System.Diagnostics;
using System.Drawing;
using System.Drawing.Imaging;
using System.Runtime.InteropServices;
using System.Threading;

public static class WinCap {
  [DllImport("user32.dll")] public static extern bool SetForegroundWindow(IntPtr hWnd);
  [DllImport("user32.dll")] public static extern bool ShowWindow(IntPtr hWnd, int nCmdShow);
  [DllImport("user32.dll")] public static extern bool GetWindowRect(IntPtr hWnd, out RECT lpRect);
  public struct RECT { public int Left, Top, Right, Bottom; }

  public static void CaptureProcess(string procName, string outFile, int waitMs) {
    Thread.Sleep(waitMs);
    var procs = Process.GetProcessesByName(procName);
    if (procs.Length == 0) throw new Exception("Pencere bulunamadi: " + procName);
    var p = procs[procs.Length - 1];
    ShowWindow(p.MainWindowHandle, 9);
    SetForegroundWindow(p.MainWindowHandle);
    Thread.Sleep(1500);
    RECT r; GetWindowRect(p.MainWindowHandle, out r);
    int w = Math.Max(400, r.Right - r.Left);
    int h = Math.Max(300, r.Bottom - r.Top);
    using (var bmp = new Bitmap(w, h)) {
      using (var g = Graphics.FromImage(bmp)) {
        g.CopyFromScreen(new Point(r.Left, r.Top), Point.Empty, new Size(w, h));
      }
      bmp.Save(outFile, ImageFormat.Png);
    }
  }
}
'@

Add-Type -TypeDefinition $code -ReferencedAssemblies @('System.Drawing.dll', 'System.Windows.Forms.dll')

$procName = [System.IO.Path]::GetFileNameWithoutExtension($ExePath)
$p = Start-Process -FilePath $ExePath -PassThru

try {
    [WinCap]::CaptureProcess($procName, $OutFile, $WaitMs)
    Write-Output "OK: $OutFile"
}
finally {
    if ($p -and !$p.HasExited) {
        Stop-Process -Id $p.Id -Force -ErrorAction SilentlyContinue
    }
}
