// Hall of Mirrors: strokes repeated around a centre in glowing light, optionally on a turning wheel.
import { TAU, clamp } from '../kit.js';

const LIGHTS = {
  Neon: (t) => `hsl(${(t * 300) % 360},96%,62%)`,
  Ember: (t) => `hsl(${28 + Math.sin(t * 5) * 26},98%,${58 + Math.sin(t * 3) * 8}%)`,
  Ice: (t) => `hsl(${190 + Math.sin(t * 4) * 34},90%,${70 + Math.sin(t * 2) * 8}%)`,
  Pearl: (t) => `hsl(${(t * 120 + 260) % 360},60%,84%)`,
  Aurora: (t) => `hsl(${140 + Math.sin(t * 3) * 60},92%,62%)`,
  Sunset: (t) => `hsl(${(340 + Math.sin(t * 3) * 42 + 360) % 360},96%,62%)`,
  Rose: (t) => `hsl(${330 + Math.sin(t * 4) * 18},90%,${70 + Math.sin(t * 2) * 8}%)`,
  Acid: (t) => `hsl(${72 + Math.sin(t * 6) * 30},100%,58%)`,
  Ultraviolet: (t) => `hsl(${268 + Math.sin(t * 4) * 28},96%,66%)`,
  Gold: (t) => `hsl(${44 + Math.sin(t * 3) * 8},92%,${60 + Math.sin(t * 5) * 10}%)`,
};

export default function mount(ctx) {
  const s = ctx.surface({ bleed: true, bg: '#07050f', maxPx: 1800 });
  const { W, H } = s;
  const art = s.buffer();
  const view = s.layer({ alpha: false });
  const guide = s.layer({ hit: false });
  const cx = W / 2, cy = H / 2;

  let n = 8, mirror = true, light = 'Neon', width = 3, turn = 0, angle = 0, hueT = 0, glow = true, showGuide = true, last = null;
  const pushUndo = ctx.rasterUndo(art.canvas);

  // Undo the wheel's rotation, so the mark lands on the turning surface.
  function toArt(p) {
    const dx = p.x - cx, dy = p.y - cy, c = Math.cos(-angle), si = Math.sin(-angle);
    return { x: dx * c - dy * si, y: dx * si + dy * c };
  }

  function stroke(a, b) {
    const g = art.g;
    const speed = Math.hypot(b.x - a.x, b.y - a.y);
    const w = clamp(width * (1.5 - speed / 40), width * 0.4, width * 1.5);
    hueT += 0.002 + speed * 0.00035;
    const col = LIGHTS[light](hueT);
    const seg = () => { g.beginPath(); g.moveTo(a.x, a.y); g.lineTo(b.x, b.y); g.stroke(); };
    g.save();
    g.translate(cx, cy);
    g.globalCompositeOperation = 'lighter';
    g.lineCap = 'round';
    g.strokeStyle = col;
    for (let i = 0; i < n; i++) {
      for (const m of mirror ? [1, -1] : [1]) {
        g.save();
        g.rotate((i / n) * TAU);
        g.scale(1, m);
        if (glow) {
          g.globalAlpha = 0.14;
          g.lineWidth = w * 5;
          seg();
        }
        g.globalAlpha = 0.9;
        g.lineWidth = w;
        seg();
        g.restore();
      }
    }
    g.restore();
  }

  s.pointer({
    down(p) { pushUndo(); last = toArt(p); stroke(last, { x: last.x + 0.1, y: last.y }); },
    move(p) { const q = toArt(p); stroke(last, q); last = q; },
    up() { last = null; },
  });

  function drawGuide() {
    const g = guide.g;
    g.clearRect(0, 0, W, H);
    if (!showGuide) return;
    g.save();
    g.translate(cx, cy);
    g.strokeStyle = 'rgba(255,255,255,.1)';
    g.lineWidth = 1;
    const R = Math.hypot(W, H), count = mirror ? n * 2 : n;
    for (let i = 0; i < count; i++) {
      const a = (i / count) * TAU + angle;
      g.beginPath();
      g.moveTo(0, 0);
      g.lineTo(Math.cos(a) * R, Math.sin(a) * R);
      g.stroke();
    }
    g.restore();
  }

  ctx.loop((dt) => {
    angle += turn * dt;
    const g = view.g;
    g.fillStyle = '#07050f';
    g.fillRect(0, 0, W, H);
    g.save();
    g.translate(cx, cy);
    g.rotate(angle);
    g.translate(-cx, -cy);
    g.drawImage(art.canvas, 0, 0, W, H);
    g.restore();
    drawGuide();
  });

  ctx.clear = () => { pushUndo(); art.g.clearRect(0, 0, W, H); };
  ctx.snapshot = () => view.canvas;

  ctx.ui.select(Object.keys(LIGHTS), light, (v) => { light = v; });
  ctx.ui.sep();
  ctx.ui.slider('Mirrors', 2, 24, n, (v) => { n = v; });
  ctx.ui.toggle('Reflect', mirror, (v) => { mirror = v; });
  ctx.ui.slider('Width', 1, 12, width, (v) => { width = v; });
  ctx.ui.slider('Turn', -100, 100, 0, (v) => { turn = v / 100; });
  ctx.ui.toggle('Glow', glow, (v) => { glow = v; });
  ctx.ui.toggle('Guides', showGuide, (v) => { showGuide = v; });
  ctx.hint('Draw anywhere. Then set it turning and paint on the wheel.');
}
