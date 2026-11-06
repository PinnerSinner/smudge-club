// Scratch Track: a waxed black board over shimmering foil. The foil shifts under the board as your hand moves.
import { TAU, lerp, noise2, offscreen } from '../kit.js';

const FOILS = {
  Rainbow(g, w, h) {
    const l = g.createLinearGradient(0, 0, w, h);
    ['#ff3d81', '#ffb13d', '#fff14d', '#3dff9e', '#3dc8ff', '#7a5cff', '#ff3dd0', '#ff3d81', '#ffb13d', '#fff14d', '#3dff9e'].forEach((c, i, a) => l.addColorStop(i / (a.length - 1), c));
    g.fillStyle = l;
    g.fillRect(0, 0, w, h);
  },
  Gold(g, w, h) {
    const l = g.createLinearGradient(0, 0, w, h * 0.4);
    ['#7a4f12', '#e8c15a', '#fff4b8', '#b98226', '#ffe58f', '#8a5c16', '#f3d272', '#fff8d0', '#9c6c1c'].forEach((c, i, a) => l.addColorStop(i / (a.length - 1), c));
    g.fillStyle = l;
    g.fillRect(0, 0, w, h);
  },
  Galaxy(g, w, h) {
    g.fillStyle = '#0a0620';
    g.fillRect(0, 0, w, h);
    const n = noise2(3);
    for (let i = 0; i < 90; i++) {
      const x = Math.random() * w, y = Math.random() * h, r = 60 + Math.random() * 230;
      const c = g.createRadialGradient(x, y, 0, x, y, r);
      const hue = 230 + n(x * 0.003, y * 0.003) * 130;
      c.addColorStop(0, `hsla(${hue},90%,62%,.36)`);
      c.addColorStop(1, 'rgba(0,0,0,0)');
      g.fillStyle = c;
      g.fillRect(x - r, y - r, r * 2, r * 2);
    }
    for (let i = 0; i < 2600; i++) {
      g.fillStyle = `rgba(255,255,255,${Math.random()})`;
      g.fillRect(Math.random() * w, Math.random() * h, 1.4, 1.4);
    }
  },
  Oil(g, w, h) {
    const n = noise2(9), s = 4, cw = Math.ceil(w / s), ch = Math.ceil(h / s);
    const c = offscreen(cw, ch), x = c.getContext('2d'), im = x.createImageData(cw, ch);
    for (let j = 0; j < ch; j++) for (let i = 0; i < cw; i++) {
      const v = n(i * 0.012, j * 0.012) * 3 + n(i * 0.04, j * 0.04) * 0.6, o = (j * cw + i) * 4;
      im.data[o] = 128 + 127 * Math.cos(v * 6.283);
      im.data[o + 1] = 128 + 127 * Math.cos(v * 6.283 + 2.1);
      im.data[o + 2] = 128 + 127 * Math.cos(v * 6.283 + 4.2);
      im.data[o + 3] = 255;
    }
    x.putImageData(im, 0, 0);
    g.drawImage(c, 0, 0, w, h);
  },
};

export default function mount(ctx) {
  const s = ctx.surface({ paper: true, maxPx: 2000 });
  const { W, H, px } = s;
  const foilLayer = s.layer({ alpha: false, hit: false });
  const wax = s.layer();
  const flakeLayer = s.layer({ hit: false });

  let foil = 'Rainbow', nib = 'Fine', shift = { x: 0, y: 0 }, target = { x: 0, y: 0 };
  const pushUndo = ctx.rasterUndo(wax.canvas);
  const flakes = [];

  // The foil sheet is larger than the board, so sliding it under the holes reads as shimmer.
  const sheet = offscreen(W * 1.3, H * 1.3);
  const paintFoil = () => FOILS[foil](sheet.getContext('2d'), sheet.width, sheet.height);

  function waxOver() {
    const g = wax.g;
    g.globalCompositeOperation = 'source-over';
    g.fillStyle = '#0c0b0e';
    g.fillRect(0, 0, W, H);
    const l = g.createLinearGradient(0, 0, W, H);
    l.addColorStop(0, 'rgba(255,255,255,.05)');
    l.addColorStop(0.5, 'rgba(255,255,255,0)');
    l.addColorStop(1, 'rgba(255,255,255,.03)');
    g.fillStyle = l;
    g.fillRect(0, 0, W, H);
  }

  function scrape(a, b) {
    const g = wax.g, dx = b.x - a.x, dy = b.y - a.y, d = Math.hypot(dx, dy) || 1;
    g.globalCompositeOperation = 'destination-out';
    g.strokeStyle = '#000';
    g.lineCap = 'round';
    const line = (ox, oy, w) => { g.lineWidth = w; g.beginPath(); g.moveTo(a.x + ox, a.y + oy); g.lineTo(b.x + ox, b.y + oy); g.stroke(); };
    if (nib === 'Fine') line(0, 0, 2.6);
    if (nib === 'Wide') line(0, 0, 11);
    if (nib === 'Chisel') {
      // A broad nib held at 45 degrees, for calligraphic thicks and thins.
      for (let i = -5; i <= 5; i++) line(i * 0.9, -i * 0.9, 1.5);
    }
    if (nib === 'Comb') {
      const nx = -dy / d, ny = dx / d;
      for (let i = -3; i <= 3; i++) line(nx * i * 6, ny * i * 6, 1.4);
    }
    if (Math.random() < 0.4 + d * 0.02 && flakes.length < 240) {
      flakes.push({ x: b.x, y: b.y, vx: (Math.random() - 0.5) * 60 + dx * 2, vy: -30 - Math.random() * 40, r: 1 + Math.random() * 2.6, a: Math.random() * TAU, spin: (Math.random() - 0.5) * 12, life: 1.6 });
    }
  }

  let last = null;
  s.pointer({
    down(p) { pushUndo(); last = p; scrape(p, { x: p.x + 0.1, y: p.y }); },
    move(p) { scrape(last, p); last = p; target = { x: (p.x / W - 0.5), y: (p.y / H - 0.5) }; },
    hover(p) { target = { x: (p.x / W - 0.5), y: (p.y / H - 0.5) }; },
    up() { last = null; },
  });

  ctx.loop((dt, t) => {
    shift.x = lerp(shift.x, target.x, 0.06);
    shift.y = lerp(shift.y, target.y, 0.06);
    const g = foilLayer.g;
    const ox = -(0.15 + shift.x * 0.28 + Math.sin(t * 0.3) * 0.02) * W;
    const oy = -(0.15 + shift.y * 0.28 + Math.cos(t * 0.24) * 0.02) * H;
    g.drawImage(sheet, ox, oy, W * 1.3, H * 1.3);

    const f = flakeLayer.g;
    f.clearRect(0, 0, W, H);
    for (let i = flakes.length - 1; i >= 0; i--) {
      const k = flakes[i];
      k.vy += 420 * dt;
      k.x += k.vx * dt;
      k.y += k.vy * dt;
      k.a += k.spin * dt;
      k.life -= dt;
      f.save();
      f.translate(k.x, k.y);
      f.rotate(k.a);
      f.fillStyle = '#0c0b0e';
      f.fillRect(-k.r, -k.r * 0.4, k.r * 2, k.r * 0.8);
      f.restore();
      if (k.life <= 0 || k.y > H + 10) flakes.splice(i, 1);
    }
  });

  ctx.clear = () => { pushUndo(); waxOver(); };
  ctx.snapshot = () => {
    const c = offscreen(W * px, H * px), g = c.getContext('2d');
    g.drawImage(foilLayer.canvas, 0, 0);
    g.drawImage(wax.canvas, 0, 0);
    return c;
  };

  paintFoil();
  waxOver();
  ctx.ui.seg(['Fine', 'Wide', 'Chisel', 'Comb'], nib, (v) => { nib = v; });
  ctx.ui.sep();
  ctx.ui.seg(Object.keys(FOILS), foil, (v) => { foil = v; paintFoil(); });
  ctx.ui.sep();
  ctx.ui.button('Blow', () => {
    for (let i = 0; i < 80; i++) {
      flakes.push({ x: Math.random() * W, y: H * (0.4 + Math.random() * 0.6), vx: 200 + Math.random() * 500, vy: -200 - Math.random() * 200, r: 1 + Math.random() * 2.4, a: 0, spin: 14, life: 1 });
    }
  });
  ctx.hint('Scrape through the black. Move around and watch the foil shift under your lines.');
}
