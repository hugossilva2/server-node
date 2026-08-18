import { chromium } from '/opt/node22/lib/node_modules/playwright/index.mjs';
import { mkdirSync } from 'node:fs';

const OUT = process.argv[2];
const W = Number(process.argv[3] ?? 1080);
const H = Number(process.argv[4] ?? 1350);
mkdirSync(OUT, { recursive: true });

const browser = await chromium.launch();
const page = await browser.newPage({
  viewport: { width: W, height: H },
  deviceScaleFactor: 1,
});
await page.goto('http://localhost:3333', { waitUntil: 'networkidle' });
await page.evaluate(() => document.fonts.ready);
await page.addStyleTag({ content: 'nextjs-portal, [data-nextjs-toast], #__next-build-watcher { display: none !important; }' });

await page.waitForTimeout(1500);

// The export slides are the offscreen fixed-position divs rendered at full canvas size.
const handles = await page.evaluateHandle((canvasW) => {
  const all = [...document.querySelectorAll('div')].filter((el) => {
    const s = getComputedStyle(el);
    return s.position === 'fixed' && s.opacity === '0' && Math.round(el.getBoundingClientRect().width) === canvasW;
  });
  return all;
}, W);

const count = await page.evaluate((els) => els.length, handles);
console.log('offscreen export slides found:', count);
if (count === 0) throw new Error('no offscreen slides matched');

for (let i = 0; i < count; i++) {
  const el = await page.evaluateHandle(({ els, idx }) => {
    const node = els[idx];
    node.style.opacity = '1';
    node.style.zIndex = '99999';
    return node;
  }, { els: handles, idx: i });
  await page.waitForTimeout(250);
  const n = String(i + 1).padStart(2, '0');
  await el.asElement().screenshot({ path: `${OUT}/${n}.png`, scale: 'css' });
  await page.evaluate(({ els, idx }) => {
    els[idx].style.opacity = '0';
    els[idx].style.zIndex = '-1';
  }, { els: handles, idx: i });
  console.log('saved', `${n}.png`);
}

await browser.close();

