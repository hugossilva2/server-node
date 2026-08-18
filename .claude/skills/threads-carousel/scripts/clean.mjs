// Removes leftover near-white background pixels from a cut-out PNG and trims
// the transparent margin. Safe only for subjects with no white clothing.
import { chromium } from '/opt/node22/lib/node_modules/playwright/index.mjs';
import { readFileSync, writeFileSync } from 'node:fs';

const [src, out, thrRaw] = process.argv.slice(2);
const threshold = Number(thrRaw ?? 232);

const browser = await chromium.launch();
const page = await browser.newPage();
const mime = /\.jpe?g$/i.test(src) ? 'image/jpeg' : /\.webp$/i.test(src) ? 'image/webp' : 'image/png';
const dataUrl = `data:${mime};base64,${readFileSync(src).toString('base64')}`;

const result = await page.evaluate(async ({ dataUrl, threshold }) => {
  const img = new Image();
  img.src = dataUrl;
  await img.decode();

  const c = document.createElement('canvas');
  c.width = img.naturalWidth;
  c.height = img.naturalHeight;
  const ctx = c.getContext('2d', { willReadFrequently: true });
  ctx.drawImage(img, 0, 0);

  const id = ctx.getImageData(0, 0, c.width, c.height);
  const d = id.data;
  let cleared = 0;
  for (let i = 0; i < d.length; i += 4) {
    if (d[i + 3] > 0 && d[i] >= threshold && d[i + 1] >= threshold && d[i + 2] >= threshold) {
      d[i + 3] = 0;
      cleared++;
    }
  }
  ctx.putImageData(id, 0, 0);

  // Trim fully transparent margins so the cut-out anchors tight to its subject.
  let minX = c.width, minY = c.height, maxX = -1, maxY = -1;
  for (let y = 0; y < c.height; y++) {
    for (let x = 0; x < c.width; x++) {
      if (d[(y * c.width + x) * 4 + 3] > 8) {
        if (x < minX) minX = x;
        if (x > maxX) maxX = x;
        if (y < minY) minY = y;
        if (y > maxY) maxY = y;
      }
    }
  }
  const w = maxX - minX + 1, h = maxY - minY + 1;
  const t = document.createElement('canvas');
  t.width = w;
  t.height = h;
  t.getContext('2d').drawImage(c, minX, minY, w, h, 0, 0, w, h);

  return { url: t.toDataURL('image/png'), cleared, w, h, from: `${c.width}x${c.height}` };
}, { dataUrl, threshold });

writeFileSync(out, Buffer.from(result.url.split(',')[1], 'base64'));
console.log(`${src} ${result.from} -> ${result.w}x${result.h}, ${result.cleared} px limpos`);
await browser.close();
