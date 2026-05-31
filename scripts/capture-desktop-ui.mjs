/**
 * Desktop UI sekmelerinin ekran goruntulerini alir (HTML tabanli).
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
const SRC = path.join(ROOT, 'my-system', 'desktop-app', 'src');

function waitForPort(port) {
  return new Promise((resolve, reject) => {
    const start = Date.now();
    const check = () => {
      const req = http.get(`http://127.0.0.1:${port}`, () => resolve());
      req.on('error', () => {
        if (Date.now() - start > 30000) reject(new Error('port timeout'));
        else setTimeout(check, 400);
      });
      req.end();
    };
    check();
  });
}

async function main() {
  fs.mkdirSync(ASSETS, { recursive: true });
  const server = spawn('npx', ['--yes', 'serve', SRC, '-l', '3457'], {
    cwd: ROOT,
    shell: true,
    stdio: 'ignore',
    detached: true,
  });

  try {
    await waitForPort(3457);
    await new Promise((r) => setTimeout(r, 1500));

    const browser = await chromium.launch({ headless: true });
    const page = await browser.newPage({ viewport: { width: 1000, height: 720 } });
    await page.goto('http://127.0.0.1:3457', { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(1000);

    // Welcome + ana uygulama
    await page.evaluate(() => {
      document.getElementById('onboarding-overlay')?.classList.add('hidden');
      document.getElementById('welcome-overlay')?.classList.add('hidden');
      document.getElementById('main-app')?.classList.remove('hidden');
    });
    await page.waitForTimeout(600);

    const tabs = [
      { id: 'tab-cockpit', file: 'desktop-app-cockpit.png', label: 'Cockpit' },
      { id: 'tab-forge', file: 'desktop-app-forge.png', label: 'AI Forge' },
      { id: 'tab-swarm', file: 'desktop-app-swarm.png', label: 'Swarm' },
      { id: 'tab-skills', file: 'desktop-app-skills.png', label: 'Skills' },
      { id: 'tab-cloud', file: 'desktop-app-cloud.png', label: 'Cloud' },
    ];

    for (const tab of tabs) {
      await page.click(`#${tab.id}`).catch(() => {});
      await page.waitForTimeout(900);
      await page.screenshot({ path: path.join(ASSETS, tab.file) });
    }

    // Welcome ekrani
    await page.evaluate(() => {
      document.getElementById('main-app')?.classList.add('hidden');
      const w = document.getElementById('welcome-overlay');
      w?.classList.remove('hidden', 'fade-out');
    });
    await page.waitForTimeout(500);
    await page.screenshot({ path: path.join(ASSETS, 'desktop-app-welcome.png') });

    await page.close();
    await browser.close();

    // Hero gorsel
    const hero = fs.existsSync(path.join(ASSETS, 'desktop-app-exe.png'))
      ? 'desktop-app-exe.png'
      : 'desktop-app-cockpit.png';
    fs.copyFileSync(path.join(ASSETS, hero), path.join(ASSETS, 'desktop-preview.png'));

    console.log('✓ Desktop UI sekmeleri kaydedildi');
  } finally {
    try { process.kill(-server.pid); } catch { /* */ }
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
