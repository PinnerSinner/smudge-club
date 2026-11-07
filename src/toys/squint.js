// Squint: dots keep their distance from each other. Paint two pure colours and let your eyes do the mixing.
import { PAINTBOX, TAU, offscreen } from '../kit.js';

const COLOURS = [...new Set(['#ef8a2e', '#1f5fb0', ...PAINTBOX])].slice(0, 16);

export default function mount(ctx) {
  const s = ctx.surface({ paper: true, bg: '#f5efdf', maxPx: 2000 });
  const { W, H } = s;
  const { canvas, g } = s.layer({ alpha: false });

  let a = '#ef8a2e', b = '#1f5fb0', mix = 35, dot = 5, spacing = 13, brush = 34, source = 'Free';
  let dots = [], strokes = [], cells = new Map();
  const cellSize = 30;

  // A hidden seascape: in Scene mode each dot samples it, then splits the colour into two pure neighbours.
  const scene = offscreen(160, 160 * (H / W));
  const sg = scene.getContext('2d');
  {
    const w = scene.width, h = scene.height;
    const sky = sg.createLinearGradient(0, 0, 0, h * 0.62);
    sky.addColorStop(0, '#4a3a9a');
    sky.addColorStop(0.5, '#e0507a');
    sky.addColorStop(1, '#f8a94a');
    sg.fillStyle = sky;
    sg.fillRect(0, 0, w, h);
    sg.fillStyle = '#ffe680';
    sg.beginPath();
    sg.arc(w * 0.62, h * 0.47, h * 0.13, 0, TAU);
    sg.fill();
    const sea = sg.createLinearGradient(0, h * 0.62, 0, h);
    sea.addColorStop(0, '#2d6fb0');
    sea.addColorStop(1, '#10305e');
    sg.fillStyle = sea;
    sg.fillRect(0, h * 0.62, w, h);
    sg.fillStyle = '#ffd36b';
    for (let i = 0; i < 26; i++) sg.fillRect(w * 0.62 - (4 + i * 0.7) + Math.sin(i * 1.3) * 3, h * 0.63 + i * h * 0.014, (4 + i * 0.7) * 2, 1.2);
    sg.fillStyle = '#20264a';
    sg.beginPath();
    sg.moveTo(0, h * 0.62);
    sg.lineTo(w * 0.22, h * 0.5);
    sg.lineTo(w * 0.42, h * 0.62);
    sg.fill();
  }
  const scenePixels = sg.getImageData(0, 0, scene.width, scene.height).data;

  function sampled(x, y) {
    const sx = Math.min(scene.width - 1, Math.floor((x / W) * scene.width));
    const sy = Math.min(scene.height - 1, Math.floor((y / H) * scene.height));
    const i = (sy * scene.width + sx) * 4;
    const j = 42, v = () => (Math.random() - 0.5) * j * 2;
    const sat = (c) => Math.max(0, Math.min(255, (c - 128) * 1.45 + 128 + v()));
    return `rgb(${sat(scenePixels[i])},${sat(scenePixels[i + 1])},${sat(scenePixels[i + 2])})`;
  }

  const key = (x, y) => `${Math.floor(x / cellSize)},${Math.floor(y / cellSize)}`;
  function clear(x, y) {
    const cx = Math.floor(x / cellSize), cy = Math.floor(y / cellSize), r2 = spacing * spacing;
    for (let i = -1; i <= 1; i++) for (let j = -1; j <= 1; j++) {
      const c = cells.get(`${cx + i},${cy + j}`);
      if (c) for (const d of c) if ((d.x - x) ** 2 + (d.y - y) ** 2 < r2) return false;
    }
    return true;
  }

  function drawDot(d) {
    g.fillStyle = d.c;
    g.beginPath();
    g.arc(d.x, d.y, d.r, 0, TAU);
    g.fill();
  }

  function place(x, y) {
    if (x < 0 || y < 0 || x > W || y > H || !clear(x, y)) return;
    const c = source === 'Scene' ? sampled(x, y) : Math.random() * 100 < mix ? b : a;
    const d = { x, y, r: dot * (0.86 + Math.random() * 0.28), c };
    dots.push(d);
    const k = key(x, y);
    if (!cells.has(k)) cells.set(k, []);
    cells.get(k).push(d);
    drawDot(d);
  }

  function dab(x, y) {
    // Dart throwing inside the brush: only placements that respect the spacing survive.
    for (let i = 0; i < 22; i++) {
      const t = Math.random() * TAU, r = Math.sqrt(Math.random()) * brush;
      place(x + Math.cos(t) * r, y + Math.sin(t) * r);
    }
    count.textContent = `${dots.length.toLocaleString()} dots`;
  }

  let last = null;
  s.pointer({
    down(p) { strokes.push(dots.length); last = p; dab(p.x, p.y); },
    move(p) {
      const d = Math.hypot(p.x - last.x, p.y - last.y), n = Math.ceil(d / (brush * 0.6));
      for (let i = 1; i <= n; i++) dab(last.x + ((p.x - last.x) * i) / n, last.y + ((p.y - last.y) * i) / n);
      last = p;
    },
    up() { last = null; },
  });

  function repaint() {
    g.fillStyle = '#f5efdf';
    g.fillRect(0, 0, W, H);
    cells = new Map();
    for (const d of dots) {
      drawDot(d);
      const k = key(d.x, d.y);
      if (!cells.has(k)) cells.set(k, []);
      cells.get(k).push(d);
    }
    count.textContent = `${dots.length.toLocaleString()} dots`;
  }

  ctx.undo = () => { if (strokes.length) { dots.length = strokes.pop(); repaint(); } };
  ctx.clear = () => { dots = []; strokes = []; repaint(); };
  ctx.snapshot = () => canvas;

  ctx.ui.swatches(COLOURS, a, (c) => { a = c; });
  ctx.ui.sep();
  ctx.ui.swatches(COLOURS, b, (c) => { b = c; });
  ctx.ui.sep();
  ctx.ui.slider('Mix', 0, 100, mix, (v) => { mix = v; });
  ctx.ui.slider('Dot', 2, 12, dot, (v) => { dot = v; spacing = Math.max(spacing, v * 2.1); });
  ctx.ui.slider('Space', 5, 34, spacing, (v) => { spacing = v; });
  ctx.ui.seg(['Free', 'Scene'], source, (v) => { source = v; });
  ctx.ui.toggle('Squint', false, (on) => {
    canvas.style.transition = 'filter .7s';
    canvas.style.filter = on ? `blur(${Math.max(4, spacing * 0.75)}px) saturate(1.25)` : '';
  });
  const count = ctx.ui.readout('0 dots');
  repaint();
  ctx.hint('Two colours, side by side. Dab away, then press Squint. Scene mode paints a hidden seascape.');
}
