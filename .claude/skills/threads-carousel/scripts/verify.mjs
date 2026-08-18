// Rasterises each exported SVG inside the app's own document, so the self-hosted
// webfonts are available and the check reflects the SVG, not a font fallback.
import { chromium } from '/opt/node22/lib/node_modules/playwright/index.mjs';
import { readdirSync, readFileSync, mkdirSync } from 'node:fs';

const DIR = process.argv[2], OUT = process.argv[3];
mkdirSync(OUT, { recursive: true });
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1080, height: 1350 }, deviceScaleFactor: 1 });
await page.goto('http://localhost:3333', { waitUntil: 'networkidle' });
await page.evaluate(() => document.fonts.ready);
await page.addStyleTag({ content: 'nextjs-portal, [data-nextjs-toast], #__next-build-watcher { display: none !important; }' });


for (const f of readdirSync(DIR).filter((x) => x.endsWith('.svg')).sort()) {
  const svg = readFileSync(`${DIR}/${f}`, 'utf8');
  await page.evaluate((markup) => {
    document.body.innerHTML = `<div id="svghost" style="position:fixed;top:0;left:0;margin:0">${markup}</div>`;
    document.body.style.margin = '0';
  }, svg);
  await page.waitForTimeout(400);
  await page.locator('#svghost').screenshot({ path: `${OUT}/${f.replace('.svg', '.png')}`, scale: 'css' });
  console.log('rasterizado', f);
}
await browser.close();
