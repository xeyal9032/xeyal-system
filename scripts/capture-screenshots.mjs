/**
 * Playwright ile gerçek ekran görüntüleri ve demo GIF üretir.
 * Kullanım: node scripts/capture-screenshots.mjs
 */
import { chromium } from 'playwright';
import { spawn } from 'child_process';
import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const ASSETS = path.join(ROOT, 'docs', 'assets');
const FRAMES = path.join(ASSETS, 'frames');

fs.mkdirSync(FRAMES, { recursive: true });

function waitForPort(port, timeout = 60000) {
  const start = Date.now();
  return new Promise((resolve, reject) => {
    const check = () => {
      const req = http.get(`http://127.0.0.1:${port}`, () => resolve());
      req.on('error', () => {
        if (Date.now() - start > timeout) reject(new Error(`Port ${port} hazır değil`));
        else setTimeout(check, 500);
      });
      req.end();
    };
    check();
  });
}

function startProcess(cwd, cmd, args, env = {}) {
  return spawn(cmd, args, {
    cwd,
    shell: true,
    stdio: 'ignore',
    detached: true,
    env: { ...process.env, ...env },
  });
}

async function captureDashboard(browser) {
  const dashDir = path.join(ROOT, 'xeyal-dashboard');
  const cloudDir = path.join(ROOT, 'xeyal-cloud');

  const cloud = startProcess(cloudDir, 'node', ['src/server.js']);
  const dash = startProcess(dashDir, 'npm', ['run', 'dev', '--', '--host', '127.0.0.1', '--port', '5173']);

  try {
    await waitForPort(4000);
    await waitForPort(5173);
    await new Promise((r) => setTimeout(r, 4000));

    const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
    await page.goto('http://127.0.0.1:5173', { waitUntil: 'networkidle' });
    await page.waitForTimeout(2000);

    await page.screenshot({ path: path.join(ASSETS, 'dashboard-preview.png'), fullPage: false });
    await page.screenshot({ path: path.join(FRAMES, 'frame-01-overview.png') });

    // Sekmeler arası geçiş — GIF kareleri
    const tabs = ['cloud', 'ai agents', 'error logs'];
    let i = 2;
    for (const tab of tabs) {
      const btn = page.locator('button, [role="tab"], nav *').filter({ hasText: new RegExp(tab, 'i') }).first();
      if (await btn.count()) {
        await btn.click({ timeout: 3000 }).catch(() => {});
        await page.waitForTimeout(1200);
        await page.screenshot({ path: path.join(FRAMES, `frame-0${i}-${tab.replace(/\s+/g, '-')}.png`) });
        i++;
      }
    }

    await page.close();
    console.log('✓ Dashboard ekran görüntüleri alındı');
  } finally {
    try { process.kill(-cloud.pid); } catch { /* */ }
    try { process.kill(-dash.pid); } catch { /* */ }
  }
}

async function captureMySystemDashboard(browser) {
  const sysDir = path.join(ROOT, 'my-system');
  const dashPublic = path.join(sysDir, 'dashboard', 'public');

  const server = spawn('npx', ['--yes', 'serve', dashPublic, '-l', '3456'], {
    cwd: sysDir,
    shell: true,
    stdio: 'ignore',
    detached: true,
  });

  try {
    await waitForPort(3456);
    await new Promise((r) => setTimeout(r, 1500));

    const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
    await page.goto('http://127.0.0.1:3456', { waitUntil: 'networkidle' });
    await page.waitForTimeout(1500);
    await page.screenshot({ path: path.join(ASSETS, 'mysystem-dashboard.png'), fullPage: false });
    await page.screenshot({ path: path.join(FRAMES, 'frame-desktop-dash.png') });
    await page.close();
    console.log('✓ my-system dashboard ekran görüntüsü alındı');
  } finally {
    try { process.kill(-server.pid); } catch { /* */ }
  }
}

async function captureDesktopUI(browser) {
  const htmlPath = path.join(ROOT, 'my-system', 'desktop-app', 'src', 'index.html');
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto(`file:///${htmlPath.replace(/\\/g, '/')}`, { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(2000);
  await page.screenshot({ path: path.join(ASSETS, 'desktop-preview.png'), fullPage: false });
  await page.screenshot({ path: path.join(FRAMES, 'frame-forge-ui.png') });
  await page.close();
  console.log('✓ Tauri desktop UI ekran görüntüsü alındı');
}

async function buildGif() {
  const { execSync } = await import('child_process');
  const concatFile = path.join(FRAMES, 'concat.txt').replace(/\\/g, '/');
  const outGif = path.join(ASSETS, 'demo.gif').replace(/\\/g, '/');

  const frames = fs.readdirSync(FRAMES).filter((f) => f.startsWith('frame-') && f.endsWith('.png')).sort();
  if (frames.length === 0) {
    console.warn('⚠ GIF için kare bulunamadı');
    return;
  }

  const lines = frames.flatMap((f) => [`file '${f}'`, 'duration 2.5']);
  lines.push(`file '${frames[frames.length - 1]}'`);
  fs.writeFileSync(path.join(FRAMES, 'concat.txt'), lines.join('\n') + '\n');

  const cmd = `ffmpeg -y -f concat -safe 0 -i "${concatFile}" -vf "scale=1200:-1:flags=lanczos,split[s0][s1];[s0]palettegen[p];[s1][p]paletteuse" -loop 0 "${outGif}"`;
  try {
    execSync(cmd, { cwd: FRAMES, stdio: 'inherit' });
    console.log('✓ demo.gif oluşturuldu');
  } catch (e) {
    console.warn('⚠ GIF oluşturulamadı:', e.message);
  }
}

async function main() {
  console.log('📸 Ekran görüntüleri alınıyor...\n');
  const browser = await chromium.launch({ headless: true });

  try {
    await captureDashboard(browser);
    await captureMySystemDashboard(browser);
    await captureDesktopUI(browser);
  } finally {
    await browser.close();
  }

  await buildGif();
  console.log('\n✅ Tamamlandı — docs/assets/ klasörünü kontrol edin');
}

main().catch((err) => {
  console.error('Hata:', err);
  process.exit(1);
});
