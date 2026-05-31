/**
 * Tauri masaustu uygulamasini acip ekran goruntusu alir.
 * Kullanim: node scripts/capture-desktop-app.mjs
 */
import { spawn, execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const ASSETS = path.join(ROOT, 'docs', 'assets');

const EXE_CANDIDATES = [
  path.join(ROOT, 'my-system', 'desktop-app', 'src-tauri', 'target', 'release', 'desktop-app.exe'),
  path.join(ROOT, 'my-system', 'desktop-app', 'src-tauri', 'target', 'release', 'xeyal-system.exe'),
];

function findExe() {
  for (const p of EXE_CANDIDATES) {
    if (fs.existsSync(p)) return p;
  }
  return null;
}

function captureWindows(exePath, outputName, waitMs = 6000) {
  const outPath = path.join(ASSETS, outputName);
  const ps = `
Add-Type @"
using System;
using System.Runtime.InteropServices;
using System.Drawing;
using System.Drawing.Imaging;
public class WinCap {
  [DllImport("user32.dll")] public static extern bool SetForegroundWindow(IntPtr hWnd);
  [DllImport("user32.dll")] public static extern bool ShowWindow(IntPtr hWnd, int nCmdShow);
  [DllImport("user32.dll")] public static extern bool GetWindowRect(IntPtr hWnd, out RECT lpRect);
  public struct RECT { public int Left, Top, Right, Bottom; }
  public static void CaptureProcess(string procName, string outFile, int waitMs) {
    System.Threading.Thread.Sleep(waitMs);
    var procs = System.Diagnostics.Process.GetProcessesByName(procName);
    if (procs.Length == 0) throw new Exception("Pencere bulunamadi: " + procName);
    var p = procs[procs.Length - 1];
    ShowWindow(p.MainWindowHandle, 9);
    SetForegroundWindow(p.MainWindowHandle);
    System.Threading.Thread.Sleep(1200);
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
"@
$procName = [System.IO.Path]::GetFileNameWithoutExtension('${exePath.replace(/\\/g, '\\\\')}')
$p = Start-Process -FilePath '${exePath.replace(/\\/g, '\\\\')}' -PassThru
try {
  [WinCap]::CaptureProcess($procName, '${outPath.replace(/\\/g, '\\\\')}', ${waitMs})
  Write-Output "OK"
} finally {
  if (!$p.HasExited) { Stop-Process -Id $p.Id -Force -ErrorAction SilentlyContinue }
}
`;
  execSync(`powershell -NoProfile -ExecutionPolicy Bypass -Command "${ps.replace(/"/g, '\\"').replace(/\n/g, '; ')}"`, { stdio: 'inherit' });
}

async function captureViaDevServer() {
  const { chromium } = await import('playwright');
  const sysDir = path.join(ROOT, 'my-system', 'desktop-app', 'src');
  const server = spawn('npx', ['--yes', 'serve', sysDir, '-l', '3457'], {
    cwd: ROOT,
    shell: true,
    stdio: 'ignore',
    detached: true,
  });

  try {
    await new Promise((r) => setTimeout(r, 2000));
    const browser = await chromium.launch({ headless: true });
    const page = await browser.newPage({ viewport: { width: 1000, height: 720 } });
    await page.goto('http://127.0.0.1:3457', { waitUntil: 'networkidle' });
    await page.waitForTimeout(1500);

    // Onboarding ekrani gorunur olabilir — gizle, ana dashboard'u goster
    await page.evaluate(() => {
      const ob = document.getElementById('onboarding-overlay');
      if (ob) ob.classList.add('hidden');
      const app = document.getElementById('app-container');
      if (app) app.classList.remove('hidden');
    });
    await page.waitForTimeout(800);

    await page.screenshot({ path: path.join(ASSETS, 'desktop-app-main.png'), fullPage: false });

    // Forge / onboarding ekrani
    await page.evaluate(() => {
      const ob = document.getElementById('onboarding-overlay');
      if (ob) ob.classList.remove('hidden');
      const app = document.getElementById('app-container');
      if (app) app.classList.add('hidden');
    });
    await page.waitForTimeout(500);
    await page.screenshot({ path: path.join(ASSETS, 'desktop-app-onboarding.png'), fullPage: false });

    await browser.close();
    console.log('✓ Dev server uzerinden desktop UI goruntuleri alindi');
  } finally {
    try { process.kill(-server.pid); } catch { /* */ }
  }
}

async function main() {
  fs.mkdirSync(ASSETS, { recursive: true });
  const exe = findExe();

  if (exe) {
    console.log(`📸 Tauri EXE bulundu: ${exe}`);
    try {
      captureWindows(exe, 'desktop-app-exe.png', 7000);
      console.log('✓ Gercek EXE penceresi yakalandi');
    } catch (e) {
      console.warn('⚠ EXE yakalama basarisiz, dev server fallback:', e.message);
      await captureViaDevServer();
    }
  } else {
    console.log('ℹ EXE bulunamadi — UI goruntuleri dev server ile aliniyor');
    await captureViaDevServer();
  }

  // Hero birlestir: exe varsa onu kullan
  const hero = fs.existsSync(path.join(ASSETS, 'desktop-app-exe.png'))
    ? 'desktop-app-exe.png'
    : 'desktop-app-main.png';
  if (fs.existsSync(path.join(ASSETS, hero))) {
    fs.copyFileSync(path.join(ASSETS, hero), path.join(ASSETS, 'desktop-preview.png'));
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
