// Endpaper: mathematically exact ink marbling. Each drop displaces every existing contour outward
// (area-preserving) and comb passes shear them. Contours are vector polygons, so edges stay crisp.
import { sfx } from '../sound.js';
import { TAU, clamp, offscreen, paperGrain } from '../kit.js';

const BATHS = {
  Harbour: { bath: '#e9dfc9', inks: ['#1c425c', '#b84a30', '#e0aa46', '#3a7a8c', '#14202f', '#f1e8d6'] },
  Peacock: { bath: '#0f2a2c', inks: ['#1fa39a', '#e6b93d', '#c5426b', '#2d5fb0', '#f0e6cf', '#123f46'] },
  Rosewater: { bath: '#f5e4dc', inks: ['#c9546c', '#7d2f4d', '#e9a2a0', '#3f5f7a', '#f7f0e6', '#d9894a'] },
  Bookbinder: { bath: '#d9c7a3', inks: ['#6d2a1d', '#21352d', '#a87a2a', '#1d2a44', '#e8dcc0', '#9c4a2a'] },
};

export default function mount(ctx) {
  const s = ctx.surface({ aspect: 1.42, paper: true, maxPx: 2000 });
  const { W, H } = s;
  const { canvas, g } = s.layer({ alpha: false });
  const water = s.layer({ hit: false });

  let bath = 'Harbour', ink = BATHS[bath].inks[0], tool = 'drop', dropSize = 46, tines = 12;
  let shapes = [], blooming = [], paper = null, printed = false, dirty = true;

  // Displacing a point for a drop of radius r at c: P' = c + (P-c) * sqrt(1 + r^2/|P-c|^2)
  function applyDrop(cx, cy, r) {
    const r2 = r * r;
    for (const sh of shapes) {
      const p = sh.pts;
      for (let i = 0; i < p.length; i += 2) {
        const dx = p[i] - cx, dy = p[i + 1] - cy, d2 = dx * dx + dy * dy || 0.0001;
        const k = Math.sqrt(1 + r2 / d2);
        p[i] = cx + dx * k;
        p[i + 1] = cy + dy * k;
      }
    }
  }

  // Tine tip at (x0,y0) heading (ux,uy): P' = P + z * c^|d| along the line, where d is distance from it.
  // The pull fades within `tip` of the tine, so ink is tugged as it passes and then let go.
  function applyStroke(x0, y0, ux, uy, z, c, tip) {
    const nx = -uy, ny = ux, reach = Math.log(0.01) / Math.log(c);
    for (const sh of shapes) {
      const p = sh.pts;
      for (let i = 0; i < p.length; i += 2) {
        const d = Math.abs((p[i] - x0) * nx + (p[i + 1] - y0) * ny);
        const along = (p[i] - x0) * ux + (p[i + 1] - y0) * uy;
        if (d > reach || Math.abs(along) > tip * 2.2) continue;
        const k = z * Math.pow(c, d) * Math.exp(-(along * along) / (tip * tip));
        p[i] += ux * k;
        p[i + 1] += uy * k;
      }
    }
  }

  // Swirl: rotate around a centre, falling off with distance.
  function applySwirl(cx, cy, amt, reach) {
    for (const sh of shapes) {
      const p = sh.pts;
      for (let i = 0; i < p.length; i += 2) {
        const dx = p[i] - cx, dy = p[i + 1] - cy, d = Math.hypot(dx, dy);
        const a = amt * Math.exp(-(d * d) / (reach * reach));
        const co = Math.cos(a), si = Math.sin(a);
        p[i] = cx + dx * co - dy * si;
        p[i + 1] = cy + dx * si + dy * co;
      }
    }
  }

  // Stretched contours get extra points, so they stay smooth however far they are combed.
  function refine() {
    for (const sh of shapes) {
      const p = sh.pts;
      if (p.length > 4000) continue;
      let grew = false;
      const out = [];
      for (let i = 0; i < p.length; i += 2) {
        const j = (i + 2) % p.length;
        out.push(p[i], p[i + 1]);
        if (Math.hypot(p[j] - p[i], p[j + 1] - p[i + 1]) > 5) { out.push((p[i] + p[j]) / 2, (p[i + 1] + p[j + 1]) / 2); grew = true; }
      }
      if (grew) sh.pts = out;
    }
  }

  const circle = (x, y, r) => {
    const n = 96, pts = new Array(n * 2);
    for (let i = 0; i < n; i++) {
      pts[i * 2] = x + Math.cos((i / n) * TAU) * r;
      pts[i * 2 + 1] = y + Math.sin((i / n) * TAU) * r;
    }
    return pts;
  };

  // New ink starts as a pinprick and blooms outward over a few frames, pushing the old ink aside.
  function addDrop(x, y, r, colour) {
    shapes.push({ pts: circle(x, y, 0.5), colour });
    sfx('plop');
    blooming.push({ x, y, r, grown: 0.5 });
  }

  function growBlooms(dt) {
    for (let i = blooming.length - 1; i >= 0; i--) {
      const b = blooming[i];
      const next = Math.min(b.r, b.grown + (b.r - b.grown) * Math.min(1, dt * 7) + 0.8);
      // Area-preserving growth: the same as a further drop of radius sqrt(next^2 - grown^2).
      const step = Math.sqrt(Math.max(0, next * next - b.grown * b.grown));
      if (step > 0.01) applyDrop(b.x, b.y, step);
      b.grown = next;
      if (b.grown >= b.r - 0.01) blooming.splice(i, 1);
      dirty = true;
    }
  }

  function render() {
    g.fillStyle = BATHS[bath].bath;
    g.fillRect(0, 0, W, H);
    for (const sh of shapes) {
      const p = sh.pts;
      g.fillStyle = sh.colour;
      g.beginPath();
      g.moveTo(p[0], p[1]);
      for (let i = 2; i < p.length; i += 2) g.lineTo(p[i], p[i + 1]);
      g.closePath();
      g.fill();
    }
  }

  // Water sheen on top, so the bath reads as liquid until the paper comes down.
  function renderWater(t) {
    const w = water.g;
    w.clearRect(0, 0, W, H);
    if (printed || paper) return;
    const sheen = w.createLinearGradient(0, 0, W, H);
    const o = 0.5 + Math.sin(t * 0.4) * 0.12;
    sheen.addColorStop(clamp(o - 0.25), 'rgba(255,255,255,0)');
    sheen.addColorStop(clamp(o), 'rgba(255,255,255,.1)');
    sheen.addColorStop(clamp(o + 0.25), 'rgba(255,255,255,0)');
    w.fillStyle = sheen;
    w.fillRect(0, 0, W, H);
  }

  const pointer = { x: 0, y: 0, down: false, travelled: 0 };

  s.pointer({
    down(p) {
      if (printed) return;
      pushUndo();
      pointer.down = true;
      pointer.x = p.x;
      pointer.y = p.y;
      pointer.travelled = 0;
      if (tool === 'drop') addDrop(p.x, p.y, dropSize, ink);
    },
    move(p) {
      if (!pointer.down || printed) return;
      const dx = p.x - pointer.x, dy = p.y - pointer.y, d = Math.hypot(dx, dy);
      if (d < 1.5) return;
      const ux = dx / d, uy = dy / d;
      if (tool === 'rake' || tool === 'stylus') {
        // Contours tear if a point jumps too far between samples, so long moves are walked in small steps.
        const steps = Math.ceil(d / 5), z = d / steps;
        const gap = (Math.min(W, H) * 0.92) / tines;
        for (let k = 1; k <= steps; k++) {
          const x = pointer.x + (dx * k) / steps, y = pointer.y + (dy * k) / steps;
          if (tool === 'stylus') applyStroke(x, y, ux, uy, z * 0.72, 0.955, 44);
          else for (let i = 0; i < tines; i++) {
            const o = (i - (tines - 1) / 2) * gap;
            applyStroke(x - uy * o, y + ux * o, ux, uy, z * 0.66, 0.94, 36);
          }
          refine();
        }
      } else if (tool === 'swirl') {
        const cross = dx * (pointer.y - H / 2) - dy * (pointer.x - W / 2) > 0 ? -1 : 1;
        applySwirl(p.x, p.y, cross * d * 0.012, 90);
      } else {
        pointer.travelled += d;
        if (pointer.travelled > dropSize * 0.8) { pointer.travelled = 0; addDrop(p.x, p.y, dropSize * 0.55, ink); }
      }
      pointer.x = p.x;
      pointer.y = p.y;
      dirty = true;
    },
    up() { pointer.down = false; refine(); dirty = true; },
  });

  const print = offscreen(canvas.width, canvas.height);
  function finishPrint() {
    render();
    const p = print.getContext('2d');
    p.setTransform(1, 0, 0, 1, 0, 0);
    p.drawImage(canvas, 0, 0);
    p.scale(canvas.width / W, canvas.height / H);
    // Ink sits on paper: a slight multiply tone, grain and a pale deckle edge.
    p.globalCompositeOperation = 'multiply';
    p.fillStyle = '#fbf7ec';
    p.fillRect(0, 0, W, H);
    p.globalCompositeOperation = 'source-over';
    paperGrain(p, W, H, { alpha: 0.09, seed: 2 });
    p.strokeStyle = 'rgba(246,240,226,.95)';
    p.lineWidth = Math.max(10, W * 0.018);
    p.strokeRect(0, 0, W, H);
    p.setTransform(1, 0, 0, 1, 0, 0);
    printed = true;
    ctx.toast('Printed. The bin skims the bath for another go.');
  }

  ctx.loop((dt, t) => {
    growBlooms(dt);
    if (dirty) { render(); dirty = false; if (!blooming.length) refine(); }
    renderWater(t);
    if (printed) {
      g.save();
      g.setTransform(1, 0, 0, 1, 0, 0);
      g.drawImage(print, 0, 0);
      g.restore();
    }
    // The sheet rolls across the bath, then peels away holding the print.
    if (paper) {
      paper.t += dt / 1.6;
      const w = water.g, k = paper.t;
      w.clearRect(0, 0, W, H);
      if (k < 0.5) {
        const down = clamp(k / 0.5);
        w.fillStyle = '#f5efe1';
        w.fillRect(0, 0, W * down, H);
        const edge = w.createLinearGradient(W * down - 60, 0, W * down, 0);
        edge.addColorStop(0, 'rgba(0,0,0,0)');
        edge.addColorStop(1, 'rgba(0,0,0,.28)');
        w.fillStyle = edge;
        w.fillRect(W * down - 60, 0, 60, H);
      } else {
        if (!printed) finishPrint();
        const up = clamp((k - 0.5) / 0.5);
        w.fillStyle = '#f5efe1';
        w.fillRect(W * up, 0, W * (1 - up), H);
        const edge = w.createLinearGradient(W * up, 0, W * up + 70, 0);
        edge.addColorStop(0, 'rgba(0,0,0,.34)');
        edge.addColorStop(1, 'rgba(0,0,0,0)');
        w.fillStyle = edge;
        w.fillRect(W * up, 0, 70, H);
      }
      if (paper.t >= 1) paper = null;
    }
  });

  const hist = [];
  const pushUndo = () => {
    hist.push(shapes.map((sh) => ({ ...sh, pts: sh.pts.slice() })));
    if (hist.length > 12) hist.shift();
  };
  ctx.undo = () => { const st = hist.pop(); if (st && !printed) { shapes = st; blooming = []; dirty = true; } };
  ctx.clear = () => {
    shapes = [];
    blooming = [];
    printed = false;
    paper = null;
    dirty = true;
  };
  ctx.snapshot = () => (printed ? print : canvas);

  // Ink swatches change with the bath, so they live in their own slot in the dock.
  const inkBox = document.createElement('div');
  inkBox.style.display = 'contents';
  ctx.dock.appendChild(inkBox);
  const showInks = () => {
    const before = new Set(ctx.dock.children);
    ctx.ui.swatches(BATHS[bath].inks, ink, (c) => { ink = c; });
    inkBox.replaceChildren(...[...ctx.dock.children].filter((c) => !before.has(c)));
  };
  showInks();
  ctx.ui.sep();
  ctx.ui.seg([['drop', 'Drop'], ['rake', 'Rake'], ['stylus', 'Stylus'], ['swirl', 'Swirl']], tool, (v) => { tool = v; });
  ctx.ui.slider('Size', 12, 110, dropSize, (v) => { dropSize = v; });
  ctx.ui.slider('Tines', 3, 28, tines, (v) => { tines = v; });
  ctx.ui.seg(Object.keys(BATHS), bath, (v) => { bath = v; ink = BATHS[v].inks[0]; showInks(); dirty = true; });
  ctx.ui.button('Lay the paper', () => { if (!paper && !printed) { paper = { t: 0 }; sfx('paper'); } }, 'hot');

  // Start with a loaded bath, so the first rake already has something to pull.
  for (let i = 0; i < 26; i++) {
    const x = W * (0.08 + 0.84 * Math.random()), y = H * (0.08 + 0.84 * Math.random()), r = 40 + Math.random() * 50;
    applyDrop(x, y, r);
    shapes.push({ pts: circle(x, y, r), colour: BATHS[bath].inks[i % 5] });
  }
  refine();
  ctx.hint('Tap to drop ink. Switch to Rake and drag across the bath. Then lay the paper.');
}
