// Leadlight: draw lead, pour glass into the gaps, then drag the sun and watch colour land on the floor.
import { sfx } from '../sound.js';
import { TAU, clamp, hexRgb, noise2, offscreen } from '../kit.js';

const GLASS = ['#1f6fc4', '#d43d3d', '#e8b92e', '#2a9d6a', '#7a3db8', '#3fb3d8', '#e8772e', '#f3e9c8', '#7fc9a9', '#b0245f', '#12368a', '#f4d65a', '#ff8fb1', '#8fd14f', '#0f7a7a', '#c0a0e8', '#a84a1e', '#d8ecf4'];

export default function mount(ctx) {
  const s = ctx.surface({ bleed: true, maxPx: 1600 });
  const { W, H, px } = s;
  const { canvas, g } = s.layer({ alpha: false });

  // A pointed arch, sized to leave floor below it for the light to land on.
  const winH = H * 0.66, winW = Math.min(W * 0.62, winH * 0.74), wx = (W - winW) / 2, wy = 66;
  const LW = Math.round(winW * px), LH = Math.round(winH * px);   // working resolution of the pane map

  const lead = offscreen(LW, LH), lg = lead.getContext('2d', { willReadFrequently: true });
  lg.lineCap = 'round';
  lg.lineJoin = 'round';
  const shape = offscreen(LW, LH), hg = shape.getContext('2d');
  const panes = offscreen(LW, LH), pg = panes.getContext('2d');
  const paint = new Uint32Array(LW * LH);     // packed colour per pixel, 0 for unglazed
  const inside = new Uint8Array(LW * LH);

  let colour = GLASS[0], sun = 0.3, width = 5, dirty = true, tool = 'lead';

  function archPath(c, w, h) {
    const spring = h * 0.42;
    c.beginPath();
    c.moveTo(0, h);
    c.lineTo(0, spring);
    c.quadraticCurveTo(0, spring * 0.34, w / 2, 0);
    c.quadraticCurveTo(w, spring * 0.34, w, spring);
    c.lineTo(w, h);
    c.closePath();
  }

  archPath(hg, LW, LH);
  hg.fillStyle = '#fff';
  hg.fill();
  {
    const d = hg.getImageData(0, 0, LW, LH).data;
    for (let i = 0; i < inside.length; i++) inside[i] = d[i * 4 + 3] > 128 ? 1 : 0;
  }

  // Rippled, seedy hand-blown glass: a static texture laid over the panes.
  const texture = offscreen(LW, LH);
  {
    const x = texture.getContext('2d'), n = noise2(14), im = x.createImageData(LW, LH);
    for (let j = 0; j < LH; j++) for (let i = 0; i < LW; i++) {
      const v = n(i * 0.012, j * 0.05) * 0.6 + n(i * 0.05, j * 0.015) * 0.25 + n(i * 0.3, j * 0.3) * 0.15, o = (j * LW + i) * 4;
      im.data[o] = im.data[o + 1] = im.data[o + 2] = 90 + v * 150;
      im.data[o + 3] = 255;
    }
    x.putImageData(im, 0, 0);
  }

  const pack = (h) => { const [r, gg, b] = hexRgb(h); return ((255 << 24) | (b << 16) | (gg << 8) | r) >>> 0; };

  function leadData() { return lg.getImageData(0, 0, LW, LH).data; }

  function flood(x, y, c) {
    const walls = leadData();
    const blocked = (i) => walls[i * 4 + 3] > 90 || !inside[i];
    const start = y * LW + x;
    if (blocked(start)) return;
    const seen = new Uint8Array(LW * LH), st = [start];
    seen[start] = 1;
    while (st.length) {
      const i = st.pop();
      paint[i] = c;
      const px0 = i % LW;
      if (px0 > 0 && !seen[i - 1] && !blocked(i - 1)) { seen[i - 1] = 1; st.push(i - 1); }
      if (px0 < LW - 1 && !seen[i + 1] && !blocked(i + 1)) { seen[i + 1] = 1; st.push(i + 1); }
      if (i >= LW && !seen[i - LW] && !blocked(i - LW)) { seen[i - LW] = 1; st.push(i - LW); }
      if (i < LW * (LH - 1) && !seen[i + LW] && !blocked(i + LW)) { seen[i + LW] = 1; st.push(i + LW); }
    }
    dirty = true;
  }

  function rebuildPanes() {
    const im = pg.createImageData(LW, LH), px32 = new Uint32Array(im.data.buffer);
    const clear = pack('#3a3f4a');
    for (let i = 0; i < paint.length; i++) px32[i] = inside[i] ? paint[i] || clear : 0;
    pg.putImageData(im, 0, 0);
    pg.globalCompositeOperation = 'overlay';
    pg.drawImage(texture, 0, 0);
    pg.globalCompositeOperation = 'destination-in';
    pg.drawImage(shape, 0, 0);
    pg.globalCompositeOperation = 'source-over';
  }

  const toPane = (p) => [((p.x - wx) / winW) * LW, ((p.y - wy) / winH) * LH];
  let last = null, moved = 0, start = null;

  function leadLine(a, b) {
    lg.strokeStyle = '#141216';
    lg.lineWidth = width * px;
    lg.beginPath();
    lg.moveTo(a[0], a[1]);
    lg.lineTo(b[0], b[1]);
    lg.stroke();
    dirty = true;
  }

  s.pointer({
    down(p) {
      pushUndo();
      start = toPane(p);
      last = start;
      moved = 0;
    },
    move(p) {
      if (!last) return;
      const q = toPane(p);
      moved += Math.hypot(q[0] - last[0], q[1] - last[1]);
      if (tool === 'lead' && moved > 5) leadLine(last, q);
      last = q;
    },
    up(p) {
      if (!last) return;
      if (tool === 'glaze' || moved <= 5) {
        const [x, y] = toPane(p), i = Math.floor(y) * LW + Math.floor(x);
        if (x >= 0 && y >= 0 && x < LW && y < LH && inside[i]) { flood(Math.floor(x), Math.floor(y), pack(colour)); sfx('tink'); }
      }
      last = null;
    },
  });

  ctx.loop((_, t) => {
    if (dirty) { rebuildPanes(); dirty = false; }
    const sunX = wx + winW * (sun * 1.8 - 0.4), sunY = wy - 40;

    // Stone wall and floor.
    const wall = g.createLinearGradient(0, 0, 0, H);
    wall.addColorStop(0, '#26232b');
    wall.addColorStop(0.72, '#1a181e');
    wall.addColorStop(0.73, '#121014');
    wall.addColorStop(1, '#0b0a0d');
    g.fillStyle = wall;
    g.fillRect(0, 0, W, H);

    // Colour thrown through the glass: the window, flipped and skewed by the sun, blurred onto the floor.
    const floorY = wy + winH + 16, skew = (0.5 - sun) * 1.7;
    g.save();
    g.globalCompositeOperation = 'lighter';
    g.globalAlpha = 0.62;
    g.filter = 'blur(9px)';
    g.transform(1, 0, skew, 1, 0, 0);
    g.translate(wx - skew * floorY, floorY);
    g.drawImage(panes, 0, 0, winW, (H - floorY) * 1.25);
    g.restore();

    // The window itself, lit from behind.
    g.save();
    g.translate(wx, wy);
    g.shadowColor = 'rgba(0,0,0,.8)';
    g.shadowBlur = 40;
    archPath(g, winW, winH);
    g.fillStyle = '#0a090c';
    g.fill();
    g.shadowBlur = 0;
    g.clip();
    g.drawImage(panes, 0, 0, winW, winH);
    // Glass is bright where the sun sits behind it and dim elsewhere.
    const lit = g.createRadialGradient(sunX - wx, sunY - wy + winH * 0.26, 10, sunX - wx, sunY - wy + winH * 0.26, winH * 0.92);
    lit.addColorStop(0, 'rgba(255,245,210,.42)');
    lit.addColorStop(0.3, 'rgba(255,240,200,.1)');
    lit.addColorStop(1, 'rgba(0,0,10,.5)');
    g.fillStyle = lit;
    g.fillRect(0, 0, winW, winH);
    // Lead, with a thin highlight so it reads as metal.
    g.drawImage(lead, 0, 0, winW, winH);
    g.restore();

    g.save();
    g.translate(wx, wy);
    archPath(g, winW, winH);
    g.strokeStyle = '#3c3845';
    g.lineWidth = 7;
    g.stroke();
    g.restore();

    // Dust in the beam, for atmosphere.
    g.save();
    g.globalCompositeOperation = 'lighter';
    for (let i = 0; i < 28; i++) {
      const x = wx + winW * ((i * 0.137 + t * 0.008) % 1), y = wy + winH + 8 + ((i * 53) % Math.max(10, H - wy - winH - 10));
      g.fillStyle = `rgba(255,240,210,${0.08 + 0.1 * Math.sin(t + i)})`;
      g.beginPath();
      g.arc(x + skew * (y - floorY), y, 1.1, 0, TAU);
      g.fill();
    }
    g.restore();
  });

  const hist = [];
  const pushUndo = () => {
    const c = offscreen(LW, LH);
    c.getContext('2d').drawImage(lead, 0, 0);
    hist.push({ lead: c, paint: paint.slice() });
    if (hist.length > 14) hist.shift();
  };
  ctx.undo = () => {
    const h = hist.pop();
    if (!h) return;
    lg.clearRect(0, 0, LW, LH);
    lg.drawImage(h.lead, 0, 0);
    paint.set(h.paint);
    dirty = true;
  };
  ctx.clear = () => { pushUndo(); lg.clearRect(0, 0, LW, LH); paint.fill(0); dirty = true; };
  ctx.snapshot = () => canvas;

  // A starter tracery: wheel and mullions, so there are panes to glaze straight away.
  function tracery() {
    lg.strokeStyle = '#141216';
    lg.lineWidth = width * px;
    const cx = LW / 2, cy = LH * 0.36, r = LW * 0.3;
    for (const k of [0.34, 1]) { lg.beginPath(); lg.arc(cx, cy, r * k, 0, TAU); lg.stroke(); }
    for (let i = 0; i < 8; i++) {
      const a = (i / 8) * TAU;
      lg.beginPath();
      lg.moveTo(cx + Math.cos(a) * r * 0.34, cy + Math.sin(a) * r * 0.34);
      lg.lineTo(cx + Math.cos(a) * r, cy + Math.sin(a) * r);
      lg.stroke();
    }
    [0.25, 0.5, 0.75].forEach((f) => { lg.beginPath(); lg.moveTo(LW * f, cy + r + 3); lg.lineTo(LW * f, LH); lg.stroke(); });
    [0.72, 0.86].forEach((f) => { lg.beginPath(); lg.moveTo(0, LH * f); lg.lineTo(LW, LH * f); lg.stroke(); });
    lg.beginPath();
    lg.moveTo(0, cy + r + 3);
    lg.lineTo(LW, cy + r + 3);
    lg.stroke();
    // Glaze a few panes in the opening design.
    const seed = [[cx, cy, 2], [cx + r * 0.65, cy + r * 0.2, 0], [cx - r * 0.65, cy - r * 0.2, 0], [cx + r * 0.2, cy - r * 0.65, 1], [cx - r * 0.2, cy + r * 0.65, 1],
      [cx + r * 0.2, cy + r * 0.65, 5], [cx - r * 0.2, cy - r * 0.65, 5], [cx + r * 0.65, cy - r * 0.2, 3], [cx - r * 0.65, cy + r * 0.2, 3],
      [LW * 0.12, LH * 0.6, 1], [LW * 0.38, LH * 0.6, 7], [LW * 0.62, LH * 0.6, 0], [LW * 0.88, LH * 0.6, 6], [LW * 0.12, LH * 0.93, 4], [LW * 0.88, LH * 0.93, 4], [LW * 0.5 + 8, LH * 0.8, 2]];
    seed.forEach(([x, y, c]) => flood(Math.floor(x), Math.floor(y), pack(GLASS[c])));
  }

  ctx.ui.swatches(GLASS, colour, (c) => { colour = c; });
  ctx.ui.sep();
  ctx.ui.seg([['lead', 'Lead'], ['glaze', 'Glaze']], tool, (v) => { tool = v; });
  ctx.ui.slider('Lead', 2, 12, width, (v) => { width = v; });
  ctx.ui.slider('Sun', 0, 100, sun * 100, (v) => { sun = clamp(v / 100); });
  tracery();
  ctx.hint('Draw lead lines, tap a pane to glaze it, then drag the sun. Colour lands on the floor.');
}
