import { chromium } from '/opt/node22/lib/node_modules/playwright/index.mjs';
import { readdirSync, readFileSync } from 'node:fs';

const DIR = process.argv[2];
const OUT = process.argv[3];
const W = 1080, H = 1350;

const files = readdirSync(DIR).filter((f) => f.endsWith('.png')).sort();
const imgs = files
  .map((f) => `data:image/png;base64,${readFileSync(`${DIR}/${f}`).toString('base64')}`)
  .map((src) => `<img src="${src}">`)
  .join('\n');

const html = `<!doctype html><meta charset="utf-8"><style>
  @page { size: ${W}px ${H}px; margin: 0; }
  html, body { margin: 0; padding: 0; background: #000; }
  img { display: block; width: ${W}px; height: ${H}px; page-break-after: always; }
  img:last-child { page-break-after: auto; }
</style>${imgs}`;

const browser = await chromium.launch();
const page = await browser.newPage();
await page.setContent(html, { waitUntil: 'load' });
await page.pdf({ path: OUT, width: `${W}px`, height: `${H}px`, printBackground: true, margin: { top: 0, right: 0, bottom: 0, left: 0 } });
await browser.close();
console.log('pages:', files.length, '->', OUT);
