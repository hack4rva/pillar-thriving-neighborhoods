/**
 * Headless smoke check for a ported pillar explorer.
 *   node scripts/verify-pillar.mjs <url> [screenshot.png]
 * Confirms the graph loads, reports which views survived capability gating,
 * and fails loudly on any console or request error.
 */
import { chromium } from 'playwright';

const url = process.argv[2] ?? 'http://localhost:4173/';
const shot = process.argv[3];

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
const errors = [];
page.on('pageerror', (e) => errors.push(String(e)));
page.on('console', (m) => { if (m.type() === 'error') errors.push(m.text()); });
page.on('response', (r) => { if (r.status() >= 400) errors.push(`${r.status()} ${r.url()}`); });

await page.goto(url, { waitUntil: 'networkidle' });
await page.waitForFunction(() => window.__kg?.nodeCount > 0, null, { timeout: 30000 });
await page.waitForTimeout(3000);

const info = await page.evaluate(() => ({
  nodes: window.__kg.nodeCount,
  title: document.querySelector('#pillar-name')?.textContent,
  subtitle: document.querySelector('#app-subtitle')?.textContent,
  visible: [...document.querySelectorAll('#mode-switch button')]
    .filter((b) => !b.hidden).map((b) => b.textContent.trim()),
  hidden: [...document.querySelectorAll('#mode-switch button')]
    .filter((b) => b.hidden).map((b) => b.textContent.trim()),
  active: document.querySelector('#mode-switch button.active')?.textContent.trim(),
}));

console.log(`  title      : ${info.title} — ${info.subtitle}`);
console.log(`  nodes      : ${info.nodes}`);
console.log(`  views      : ${info.visible.join(', ')}`);
console.log(`  gated off  : ${info.hidden.join(', ') || '(none)'}`);
console.log(`  landing    : ${info.active}`);
console.log(`  errors     : ${errors.length}${errors.length ? ' -> ' + errors.slice(0, 3).join(' | ') : ''}`);

if (shot) await page.screenshot({ path: shot });
await browser.close();
process.exit(errors.length ? 1 : 0);
