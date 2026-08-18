// Exports each slide as an editable SVG: live <text>, vector rects, embedded
// rasters. Walks the rendered DOM so the browser's own line-breaking and
// adaptive sizing are preserved exactly as in the PNG export.
//
//   node svg.mjs <outDir> [width] [height]
import { chromium } from '/opt/node22/lib/node_modules/playwright/index.mjs';
import { mkdirSync, writeFileSync } from 'node:fs';

const OUT = process.argv[2];
const W = Number(process.argv[3] ?? 1080);
const H = Number(process.argv[4] ?? 1350);
mkdirSync(OUT, { recursive: true });

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: W, height: H }, deviceScaleFactor: 1 });
await page.goto('http://localhost:3333', { waitUntil: 'networkidle' });
await page.evaluate(() => document.fonts.ready);
await page.addStyleTag({ content: 'nextjs-portal, [data-nextjs-toast], #__next-build-watcher { display: none !important; }' });

await page.waitForTimeout(1200);

const handles = await page.evaluateHandle((canvasW) => {
  return [...document.querySelectorAll('div')].filter((el) => {
    const s = getComputedStyle(el);
    return s.position === 'fixed' && s.opacity === '0' && Math.round(el.getBoundingClientRect().width) === canvasW;
  });
}, W);

const count = await page.evaluate((els) => els.length, handles);
console.log('slides:', count);

for (let i = 0; i < count; i++) {
  const svg = await page.evaluate(
    async ({ els, idx, W, H }) => {
      const root = els[idx];
      root.style.opacity = '1';
      root.style.zIndex = '99999';
      await new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r)));

      const box = root.getBoundingClientRect();
      const OX = box.left;
      const OY = box.top;
      const out = [];
      const esc = (t) =>
        t.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
      const n = (v) => Math.round(v * 100) / 100;
      const isVisible = (c) => c && c !== 'none' && !/rgba\(\s*0,\s*0,\s*0,\s*0\s*\)/.test(c) && c !== 'transparent';
      const hasEmoji = (t) => /\p{Extended_Pictographic}/u.test(t);

      // Colour emoji has no vector form Illustrator can use — bake it to a bitmap.
      const emojiToImage = (text, fontSize, fontFamily) => {
        const pad = Math.ceil(fontSize * 0.3);
        const c = document.createElement('canvas');
        c.width = Math.ceil(fontSize * 1.6) + pad * 2;
        c.height = Math.ceil(fontSize * 1.6) + pad * 2;
        const ctx = c.getContext('2d');
        ctx.font = `${fontSize}px ${fontFamily}`;
        ctx.textBaseline = 'top';
        ctx.fillText(text, pad, pad);
        return c.toDataURL('image/png');
      };

      // Baseline of a line box, from real font metrics for that style.
      const mc = document.createElement('canvas').getContext('2d');
      const baselineIn = (rect, cs) => {
        mc.font = `${cs.fontStyle} ${cs.fontWeight} ${cs.fontSize} ${cs.fontFamily}`;
        const m = mc.measureText('Hxg');
        const asc = m.actualBoundingBoxAscent || parseFloat(cs.fontSize) * 0.8;
        const desc = m.actualBoundingBoxDescent || parseFloat(cs.fontSize) * 0.2;
        return rect.top + (rect.height - (asc + desc)) / 2 + asc;
      };

      const toDataUrl = async (url) => {
        const res = await fetch(url);
        const blob = await res.blob();
        return await new Promise((r) => {
          const fr = new FileReader();
          fr.onload = () => r(fr.result);
          fr.readAsDataURL(blob);
        });
      };

      const pending = [];

      const walk = (el, inheritedOpacity) => {
        const cs = getComputedStyle(el);
        if (cs.display === 'none' || cs.visibility === 'hidden') return;
        const o = inheritedOpacity * parseFloat(cs.opacity || '1');
        if (o === 0) return;
        const r = el.getBoundingClientRect();
        const x = r.left - OX;
        const y = r.top - OY;

        const radius = parseFloat(cs.borderTopLeftRadius) || 0;
        if (isVisible(cs.backgroundColor)) {
          out.push(
            `<rect x="${n(x)}" y="${n(y)}" width="${n(r.width)}" height="${n(r.height)}"` +
              (radius ? ` rx="${n(radius)}"` : '') +
              ` fill="${cs.backgroundColor}"${o < 1 ? ` fill-opacity="${n(o)}"` : ''}/>`
          );
        }
        const bw = parseFloat(cs.borderTopWidth) || 0;
        if (bw > 0 && isVisible(cs.borderTopColor)) {
          out.push(
            `<rect x="${n(x + bw / 2)}" y="${n(y + bw / 2)}" width="${n(r.width - bw)}" height="${n(r.height - bw)}"` +
              (radius ? ` rx="${n(radius)}"` : '') +
              ` fill="none" stroke="${cs.borderTopColor}" stroke-width="${n(bw)}"/>`
          );
        }

        if (el.tagName === 'IMG') {
          // Resample to 2x the displayed size: the source art is far larger than
          // it renders, and full-res base64 makes the SVG unusably heavy.
          const cw = Math.max(1, Math.round(r.width * 2));
          const ch = Math.max(1, Math.round(r.height * 2));
          const c = document.createElement('canvas');
          c.width = cw;
          c.height = ch;
          c.getContext('2d').drawImage(el, 0, 0, cw, ch);
          out.push(
            `<image x="${n(x)}" y="${n(y)}" width="${n(r.width)}" height="${n(r.height)}"` +
              ` preserveAspectRatio="none" href="${c.toDataURL('image/png')}"/>`
          );
          return;
        }

        for (const node of el.childNodes) {
          if (node.nodeType !== 3) continue;
          let raw = node.textContent;
          if (!raw || !raw.trim()) continue;
          // Same character count either way, so offsets still line up with the DOM.
          if (cs.textTransform === 'uppercase') raw = raw.toUpperCase();
          else if (cs.textTransform === 'lowercase') raw = raw.toLowerCase();

          if (hasEmoji(raw)) {
            const fs = parseFloat(cs.fontSize);
            const er = document.createRange();
            er.selectNodeContents(node);
            const eb = er.getBoundingClientRect();
            const side = Math.max(eb.width, eb.height, fs);
            const d = emojiToImage(raw.trim(), fs, cs.fontFamily);
            // emojiToImage pads by 0.3em on a 1.6em canvas — keep that ratio here.
            const canvasSide = fs * 1.6 + Math.ceil(fs * 0.3) * 2;
            const scale = canvasSide / fs;
            out.push(
              `<image x="${n(eb.left - OX - fs * 0.3)}" y="${n(eb.top - OY - fs * 0.3)}"` +
                ` width="${n(fs * scale)}" height="${n(fs * scale)}" href="${d}"/>`
            );
            continue;
          }

          // One <text> per visual line. Split by measuring each character's own
          // rect: a width-proportional split guesses wrong and cuts words apart.
          const range = document.createRange();
          const lines = [];
          for (let ci = 0; ci < raw.length; ci++) {
            range.setStart(node, ci);
            range.setEnd(node, ci + 1);
            const q = range.getBoundingClientRect();
            if (q.width === 0 && q.height === 0) continue;
            const key = Math.round(q.top);
            const last = lines[lines.length - 1];
            if (last && Math.abs(last.top - key) <= 1) {
              last.text += raw[ci];
              last.left = Math.min(last.left, q.left);
              last.right = Math.max(last.right, q.right);
              last.height = Math.max(last.height, q.height);
            } else {
              lines.push({ top: key, rectTop: q.top, left: q.left, right: q.right, height: q.height, text: raw[ci] });
            }
          }

          for (const L of lines) {
            const piece = L.text.trim();
            if (!piece) continue;
            // Re-measure x from the trimmed start so leading spaces don't shift it.
            const lead = L.text.length - L.text.replace(/^\s+/, '').length;
            let lx = L.left;
            if (lead > 0) {
              const idx = raw.indexOf(L.text) + lead;
              if (idx >= 0 && idx < raw.length) {
                range.setStart(node, idx);
                range.setEnd(node, idx + 1);
                lx = range.getBoundingClientRect().left;
              }
            }
            const ls = cs.letterSpacing !== 'normal' ? parseFloat(cs.letterSpacing) : 0;
            const lineRect = { top: L.rectTop, height: L.height };
            out.push(
              `<text x="${n(lx - OX)}" y="${n(baselineIn(lineRect, cs) - OY)}"` +
                ` font-family="${esc(cs.fontFamily.replace(/"/g, ''))}"` +
                ` font-size="${n(parseFloat(cs.fontSize))}"` +
                ` font-weight="${cs.fontWeight}"` +
                (ls ? ` letter-spacing="${n(ls)}"` : '') +
                ` fill="${cs.color}"${o < 1 ? ` fill-opacity="${n(o)}"` : ''}` +
                ` xml:space="preserve">${esc(piece)}</text>`
            );
          }
        }

        for (const child of el.children) walk(child, o);
      };

      walk(root, 1);
      await Promise.all(pending);

      root.style.opacity = '0';
      root.style.zIndex = '-1';

      return (
        `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"` +
        ` width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">\n` +
        out.filter(Boolean).join('\n') +
        `\n</svg>\n`
      );
    },
    { els: handles, idx: i, W, H }
  );

  const name = String(i + 1).padStart(2, '0');
  writeFileSync(`${OUT}/${name}.svg`, svg);
  console.log('saved', `${name}.svg`, `${(svg.length / 1024).toFixed(0)} KB`);
}

await browser.close();
