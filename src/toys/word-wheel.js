// Word Wheel: language in the round. Letters follow your stroke and repeat around a centre, growing with distance.
import { TAU, clamp, lerp } from '../kit.js';

const MANTRA = 'round and round the word goes ';
const INKS = {
  Plum: (r) => `hsl(${290 + r * 70},72%,${76 - r * 20}%)`,
  Gilt: (r) => `hsl(${44 - r * 16},82%,${74 - r * 16}%)`,
  Glass: (r) => `hsl(${r * 340},86%,68%)`,
  Bone: () => '#f3ead9',
  Ocean: (r) => `hsl(${170 + r * 60},78%,${72 - r * 16}%)`,
  Ember: (r) => `hsl(${50 - r * 50},94%,${70 - r * 12}%)`,
  Moss: (r) => `hsl(${70 + r * 70},58%,${70 - r * 18}%)`,
  Rose: (r) => `hsl(${345 - r * 40},84%,${80 - r * 18}%)`,
  Neon: (r) => `hsl(${(r * 900) % 360},100%,62%)`,
};

export default function mount(ctx) {
  const s = ctx.surface({ bleed: true, bg: '#160a1c', maxPx: 1800 });
  const { W, H } = s;
  const { canvas, g } = s.layer({ alpha: false });
  const guide = s.layer({ hit: false });
  const cx = W / 2, cy = H / 2, maxR = Math.hypot(W, H) / 2;
  const pushUndo = ctx.rasterUndo(canvas);

  let text = MANTRA, spokes = 12, mirror = true, ink = 'Plum', scale = 1, snap = false, cursor = 0, held = null;
  const st = { x: 0, y: 0, carry: 0 };

  function ground() {
    g.fillStyle = '#160a1c';
    g.fillRect(0, 0, W, H);
  }

  const sizeAt = (x, y) => clamp(Math.hypot(x - cx, y - cy) * 0.075 + 7, 7, 46) * scale;
  const pending = () => {
    if (!held) { const src = text.trim() ? text : MANTRA; held = src[cursor++ % src.length]; }
    return held;
  };

  function place(ch, x, y, a) {
    const sz = sizeAt(x, y), r = clamp(Math.hypot(x - cx, y - cy) / maxR);
    g.font = `600 ${sz.toFixed(1)}px Fraunces`;
    g.fillStyle = INKS[ink](r);
    g.textAlign = 'center';
    g.textBaseline = 'middle';
    for (let i = 0; i < spokes; i++) {
      for (const m of mirror ? [1, -1] : [1]) {
        g.save();
        g.translate(cx, cy);
        g.rotate((i / spokes) * TAU);
        g.scale(1, m);
        g.translate(x - cx, y - cy);
        g.rotate(a);
        g.fillText(ch, 0, 0);
        g.restore();
      }
    }
  }

  // Snap holds the letters on concentric rings, for rose-window tidiness.
  function snapped(p) {
    if (!snap) return p;
    const dx = p.x - cx, dy = p.y - cy, d = Math.hypot(dx, dy) || 1, ring = Math.max(1, Math.round(d / 34)) * 34;
    return { x: cx + (dx / d) * ring, y: cy + (dy / d) * ring };
  }

  function advance(q) {
    const dx = q.x - st.x, dy = q.y - st.y, d = Math.hypot(dx, dy);
    if (d < 0.5) return;
    const ux = dx / d, uy = dy / d, a = Math.atan2(dy, dx);
    let px = st.x, py = st.y, left = d, walked = st.carry;
    for (;;) {
      const ch = pending();
      g.font = `600 ${sizeAt(px, py).toFixed(1)}px Fraunces`;
      const need = g.measureText(ch).width + 1;
      if (walked + left < need) { st.carry = walked + left; break; }
      const step = need - walked;
      px += ux * step;
      py += uy * step;
      left -= step;
      walked = 0;
      place(ch, lerp(px, px - ux * need, 0.5), lerp(py, py - uy * need, 0.5), a);
      held = null;
    }
    st.x = q.x;
    st.y = q.y;
  }

  function drawGuide() {
    const c = guide.g;
    c.clearRect(0, 0, W, H);
    c.strokeStyle = 'rgba(255,255,255,.07)';
    c.lineWidth = 1;
    c.save();
    c.translate(cx, cy);
    for (let i = 0; i < spokes; i++) {
      const a = (i / spokes) * TAU;
      c.beginPath();
      c.moveTo(0, 0);
      c.lineTo(Math.cos(a) * maxR, Math.sin(a) * maxR);
      c.stroke();
    }
    if (snap) for (let r = 34; r < maxR; r += 34) { c.beginPath(); c.arc(0, 0, r, 0, TAU); c.stroke(); }
    c.restore();
  }

  s.pointer({
    down(p) {
      pushUndo();
      const q = snapped(p);
      st.x = q.x;
      st.y = q.y;
      st.carry = 0;
    },
    move(p) { advance(snapped(p)); },
  });

  ctx.clear = () => { pushUndo(); ground(); cursor = 0; held = null; };
  ctx.snapshot = () => canvas;

  ground();
  drawGuide();
  ctx.ui.text(MANTRA.trim(), (v) => { text = v + ' '; cursor = 0; held = null; }, 'Type a mantra');
  ctx.ui.sep();
  ctx.ui.select(Object.keys(INKS), ink, (v) => { ink = v; });
  ctx.ui.slider('Spokes', 3, 32, spokes, (v) => { spokes = v; drawGuide(); });
  ctx.ui.slider('Letters', 0.5, 2, scale, (v) => { scale = v; }, 0.05);
  ctx.ui.toggle('Mirror', mirror, (v) => { mirror = v; });
  ctx.ui.toggle('Rings', snap, (v) => { snap = v; drawGuide(); });
  ctx.hint('Paint outward from the middle. Letters are tiny at the centre and grow towards the edge.');
}
