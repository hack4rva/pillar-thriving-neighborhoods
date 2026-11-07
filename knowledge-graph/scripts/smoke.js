#!/usr/bin/env node
// Quick headless smoke test: serve dist/, load in Chromium, report console errors.
import { chromium } from 'playwright';
import { createServer } from 'node:http';
import { readFileSync, existsSync } from 'node:fs';
import { resolve, extname } from 'node:path';

const ROOT = resolve(import.meta.dirname, '..', 'dist');
const MIME = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json' };

const server = createServer((req, res) => {
  let path = resolve(ROOT, '.' + (req.url === '/' ? '/index.html' : req.url.split('?')[0]));
  if (!existsSync(path)) { res.writeHead(404); res.end('nf'); return; }
  res.writeHead(200, { 'Content-Type': MIME[extname(path)] ?? 'application/octet-stream' });
  res.end(readFileSync(path));
}).listen(8931);

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1600, height: 1000 } });
const errors = [];
page.on('console', (msg) => { if (msg.type() === 'error') errors.push(msg.text()); });
page.on('pageerror', (err) => errors.push(String(err)));

await page.goto('http://localhost:8931/');
await page.waitForTimeout(5000);

const stats = await page.textContent('#stats');
const hint = await page.textContent('#graph-hint');
console.log('stats:', stats?.trim());
console.log('hint:', hint?.trim());
console.log('console errors:', errors.length ? errors : 'none');

await browser.close();
server.close();
process.exit(errors.length ? 1 : 0);
