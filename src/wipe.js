// The transition: a loaded brush paints over the screen in broad bristly strokes, then wipes them away.
import { clamp, hexRgb } from './kit.js';

const ROWS = 6, BRISTLES = 30;

export function createWipe(host) {
  const c = document.createElement('canvas');
  c.className = 'wipe';
  c.setAttribute('aria-hidden', 'true');
  host.appendChild(c);
  const g = c.getContext('2d');
  const calm = matchMedia('(prefers-reduced-motion: reduce)').matches;

  const fit = () => {
    c.width = Math.ceil(innerWidth / 2);
    c.height = Math.ceil(innerHeight / 2);
  };
  fit();
  addEventListener('resize', fit);

  // Each bristle starts a little ahead of or behind its neighbours, which gives the stroke its ragged front.
  function strokes() {
    const rows = [], rowH = c.height / ROWS;
    for (let r = 0; r < ROWS; r++) {
      const bristles = [];
      for (let b = 0; b < BRISTLES; b++) {
        bristles.push({
          y: (r - 0.28 + (b / BRISTLES) * 1.56) * rowH,
          lag: Math.random() * 0.2,
          w: rowH * (0.08 + Math.random() * 0.1),
          wob: (Math.random() - 0.5) * rowH * 0.2,
          shade: (Math.random() - 0.5) * 0.28,
        });
      }
      rows.push({ dir: r % 2 ? -1 : 1, start: r * 0.075, bristles });
    }
    return rows;
  }

  function run(ms, draw) {
    return new Promise((done) => {
      if (calm) { done(); return; }
      const rows = strokes(), t0 = performance.now(), W = c.width;
      const heads = new Map();
      const step = (now) => {
        const k = clamp((now - t0) / ms);
        for (const row of rows) {
          for (const b of row.bristles) {
            const p = clamp((k - row.start - b.lag * 0.5) / (1 - 0.375 - 0.1));
            const e = p * p * (3 - 2 * p), was = heads.get(b) ?? 0;
            if (e <= was) continue;
            heads.set(b, e);
            const x0 = row.dir > 0 ? was * W * 1.08 - 8 : W - was * W * 1.08 + 8;
            const x1 = row.dir > 0 ? e * W * 1.08 : W - e * W * 1.08;
            const y0 = b.y + Math.sin(was * 5) * b.wob, y1 = b.y + Math.sin(e * 5) * b.wob;
            draw(b, x0, y0, x1, y1);
          }
        }
        if (k < 1) requestAnimationFrame(step); else done();
      };
      requestAnimationFrame(step);
    });
  }

  return {
    // Paints the whole screen; resolves once it is fully covered.
    async cover(hex) {
      const [r, gr, bl] = hexRgb(hex);
      const tone = (s) => {
        const f = (v) => Math.round(clamp(s < 0 ? v * (1 + s) : v + (255 - v) * s, 0, 255));
        return `rgb(${f(r)},${f(gr)},${f(bl)})`;
      };
      g.globalCompositeOperation = 'source-over';
      g.lineCap = 'round';
      await run(430, (b, x0, y0, x1, y1) => {
        g.strokeStyle = tone(b.shade);
        g.lineWidth = b.w;
        g.beginPath();
        g.moveTo(x0, y0);
        g.lineTo(x1, y1);
        g.stroke();
      });
      g.fillStyle = tone(0);
      g.fillRect(0, 0, c.width, c.height);
    },
    // Wipes the paint back off, revealing whatever is underneath.
    async reveal() {
      g.globalCompositeOperation = 'destination-out';
      g.lineCap = 'round';
      await run(460, (b, x0, y0, x1, y1) => {
        g.lineWidth = b.w * 1.5;
        g.beginPath();
        g.moveTo(x0, y0);
        g.lineTo(x1, y1);
        g.stroke();
      });
      g.globalCompositeOperation = 'source-over';
      g.clearRect(0, 0, c.width, c.height);
    },
  };
}
