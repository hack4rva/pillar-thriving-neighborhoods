/**
 * Smoke-check a multi-pillar deployment of this explorer.
 *
 * One built bundle can serve every pillar by way of `?pillar=<slug>`, reading
 * `data/<slug>/` instead of `data/`. A wrong path or a missing directory fails
 * as an empty graph rather than a visible error, so this loads each pillar and
 * asserts it got nodes, reporting the views its data left visible.
 *
 *   node scripts/verify-deployment.mjs <baseUrl> <slug> [slug...]
 *
 * Example (against the rvahacks site, which hosts all seven):
 *   node scripts/verify-deployment.mjs http://localhost:4173/knowledge-graph \
 *     thriving-built-environment thriving-families
 */
import { chromium } from 'playwright';

const [base, ...slugs] = process.argv.slice(2);
if (!base || !slugs.length) {
  console.error('usage: verify-deployment.mjs <baseUrl> <slug> [slug...]');
  process.exit(2);
}

const browser = await chromium.launch();
let failures = 0;

const check = async (label, url) => {
  const page = await browser.newPage();
  const errors = [];
  page.on('console', (m) => m.type() === 'error' && errors.push(m.text()));
  page.on('pageerror', (e) => errors.push(String(e)));
  page.on('requestfailed', (r) => errors.push(`${r.url()} ${r.failure()?.errorText}`));

  await page.goto(url, { waitUntil: 'networkidle' });
  const r = await page.evaluate(() => ({
    nodes: window.__kg?.nodeCount ?? 0,
    title: document.querySelector('#pillar-name')?.textContent ?? '',
    subtitle: document.querySelector('#app-subtitle')?.textContent ?? '',
    views: [...document.querySelectorAll('#mode-switch button')]
      .filter((b) => !b.hidden)
      .map((b) => b.textContent.trim()),
  }));
  await page.close();

  const ok = r.nodes > 0 && errors.length === 0;
  if (!ok) failures++;
  console.log(
    `${ok ? 'ok  ' : 'FAIL'} ${label.padEnd(30)} nodes=${String(r.nodes).padStart(3)}  ` +
      `"${r.title}" — ${r.subtitle}\n      views: ${r.views.join(', ')}` +
      (errors.length ? `\n      errors: ${errors.slice(0, 3).join(' | ')}` : ''),
  );
};

for (const slug of slugs) await check(slug, `${base}/index.html?pillar=${slug}`);
// A bare visit must still work: it falls back to the root data/.
await check('(no ?pillar= fallback)', `${base}/index.html`);

await browser.close();
process.exit(failures ? 1 : 0);
