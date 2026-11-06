// Sediment: a falling-sand cellular automaton inside a glass bottle, with the seaside poking stick.
import { clamp, hexRgb, rng, offscreen, smooth } from '../kit.js';

const SANDS = ['#e9d9b5', '#c7562e', '#efb54a', '#2e6f8e', '#7a3e2c', '#e58a3a', '#264653', '#b83a6a', '#5d9c59', '#f4f1ea'];

// Bottle profile: half-width as a function of height, from cork to base.
const SHAPES = {
  Flask: (t) => (t < 0.13 ? 0.125 : t < 0.32 ? 0.125 + smooth(0.13, 0.32, t) * 0.305 : 0.43 - Math.pow(Math.max(0, t - 0.9) / 0.065, 3) * 0.05),
  Tall: (t) => (t < 0.1 ? 0.1 : t < 0.2 ? 0.1 + smooth(0.1, 0.2, t) * 0.2 : 0.3 - Math.pow(Math.max(0, t - 0.92) / 0.045, 3) * 0.04),
  Gourd: (t) => (t < 0.08 ? 0.09 : 0.1 + Math.abs(Math.sin((t - 0.02) * 6.1)) * 0.3 + t * 0.08),
};

export default function mount(ctx) {
  const backdrop = document.createElement('div');
  backdrop.style.cssText = 'position:absolute;inset:0;background:radial-gradient(70% 60% at 50% 40%,#3b4652,#14181e 75%)';
  ctx.stage.appendChild(backdrop);

  const s = ctx.surface({ aspect: 0.62, maxPx: 1400 });
  const { W, H } = s;
  const GW = 190, GH = Math.round(GW / 0.62);
  const scene = s.layer();
  const glass = s.layer({ hit: false });

  const sim = offscreen(GW, GH), sg = sim.getContext('2d');
  const img = sg.createImageData(GW, GH);
  const px32 = new Uint32Array(img.data.buffer);
  const grid = new Uint32Array(GW * GH);   // 0 is empty, anything else is a packed ABGR grain
  const mask = new Uint8Array(GW * GH);    // 1 is inside the bottle
  const moved = new Uint8Array(GW * GH);
  const r = rng(11);

  let shape = 'Flask', colour = SANDS[1], tool = 'pour', tiltX = 0, corked = false;
  const FLOW = 14;

  function buildMask() {
    mask.fill(0);
    const f = SHAPES[shape];
    for (let y = 0; y < GH; y++) {
      const t = y / GH;
      if (t < 0.05 || t > 0.965) continue;
      const hw = f(t) * GW;
      const a = Math.floor(GW / 2 - hw), b = Math.ceil(GW / 2 + hw);
      for (let x = Math.max(0, a); x < Math.min(GW, b); x++) mask[y * GW + x] = 1;
    }
  }

  const pack = (c) => {
    const [R, G, B] = hexRgb(c), v = (r() - 0.5) * 44;
    const q = (n) => clamp(Math.round(n + v), 0, 255);
    return ((255 << 24) | (q(B) << 16) | (q(G) << 8) | q(R)) >>> 0;
  };

  const pointer = { x: W / 2, y: 40, down: false };
  const cell = (p) => [Math.floor((p.x / W) * GW), Math.floor((p.y / H) * GH)];

  s.pointer({
    down(p) { pushUndo(); pointer.down = true; pointer.x = p.x; pointer.y = p.y; },
    move(p) {
      if (tool === 'poke') {
        const [x0, y0] = cell(pointer), [x1, y1] = cell(p);
        const n = Math.max(Math.abs(x1 - x0), Math.abs(y1 - y0), 1);
        for (let i = 0; i <= n; i++) poke(x0 + ((x1 - x0) * i) / n, y0 + ((y1 - y0) * i) / n);
      }
      pointer.x = p.x;
      pointer.y = p.y;
    },
    hover(p) { pointer.x = p.x; pointer.y = p.y; },
    up() { pointer.down = false; },
  });

  // Dragging the stick through the sand carries grains down with it, which is how the mountains get made.
  function poke(fx, fy) {
    const x = Math.round(fx), y = Math.round(fy);
    for (let dy = 14; dy >= -14; dy--) {
      for (let dx = -2; dx <= 2; dx++) {
        const ax = x + dx, ay = y + dy;
        if (ax < 0 || ax >= GW || ay < 1 || ay >= GH - 1) continue;
        const i = ay * GW + ax;
        if (!grid[i]) continue;
        const below = i + GW * (3 + Math.floor(r() * 3));
        if (below < grid.length && mask[below] && !grid[below]) { grid[below] = grid[i]; grid[i] = 0; } else {
          const j = i + GW;
          if (mask[j]) { const t = grid[j]; grid[j] = grid[i]; grid[i] = t; }
        }
      }
    }
  }

  function step() {
    moved.fill(0);
    for (let y = GH - 2; y >= 0; y--) {
      const lr = r() < 0.5;
      for (let k = 0; k < GW; k++) {
        const x = lr ? k : GW - 1 - k, i = y * GW + x, c = grid[i];
        if (!c || moved[i]) continue;
        const d = i + GW;
        if (mask[d] && !grid[d]) { grid[d] = c; grid[i] = 0; moved[d] = 1; continue; }
        let sgn = r() < 0.5 + tiltX * 0.5 ? 1 : -1;
        const a = d + sgn, b = d - sgn;
        const okA = x + sgn >= 0 && x + sgn < GW && mask[a] && !grid[a];
        const okB = x - sgn >= 0 && x - sgn < GW && mask[b] && !grid[b];
        // A little cohesion, so sand holds a slope instead of levelling like water.
        if ((okA || okB) && r() < 0.86) {
          const to = okA ? a : b;
          grid[to] = c;
          grid[i] = 0;
          moved[to] = 1;
        } else if (tiltX) {
          // Tilted, the top layer slides sideways along the surface.
          sgn = tiltX > 0 ? 1 : -1;
          const side = i + sgn;
          if (r() < Math.abs(tiltX) && x + sgn >= 0 && x + sgn < GW && mask[side] && !grid[side]) {
            grid[side] = c;
            grid[i] = 0;
            moved[side] = 1;
          }
        }
      }
    }
  }

  function pour() {
    if (!pointer.down || tool !== 'pour' || corked) return;
    const [x] = cell(pointer);
    const top = Math.floor(GH * 0.06);
    // The funnel feeds the neck, steered gently by where you are pointing.
    const cx = clamp(x, GW / 2 - GW * 0.1, GW / 2 + GW * 0.1);
    for (let i = 0; i < FLOW; i++) {
      const gx = Math.round(cx + (r() - 0.5) * 7), gy = top + Math.floor(r() * 16);
      const idx = gy * GW + gx;
      if (mask[idx] && !grid[idx]) grid[idx] = pack(colour);
    }
  }

  function render() {
    px32.set(grid);
    sg.putImageData(img, 0, 0);
    const g = scene.g;
    g.clearRect(0, 0, W, H);
    g.imageSmoothingEnabled = false;
    g.drawImage(sim, 0, 0, W, H);
    g.imageSmoothingEnabled = true;
  }

  function drawGlass() {
    const g = glass.g, f = SHAPES[shape];
    g.clearRect(0, 0, W, H);
    const pts = [];
    for (let i = 0; i <= 120; i++) { const t = 0.05 + (i / 120) * 0.915; pts.push([f(t) * W, t * H]); }
    const outline = () => {
      g.beginPath();
      pts.forEach(([hw, y], i) => (i ? g.lineTo(W / 2 + hw, y) : g.moveTo(W / 2 + hw, y)));
      [...pts].reverse().forEach(([hw, y]) => g.lineTo(W / 2 - hw, y));
      g.closePath();
    };
    g.save();
    outline();
    g.fillStyle = 'rgba(215,235,245,.07)';
    g.fill();
    g.clip();
    const edge = g.createLinearGradient(W * 0.05, 0, W * 0.95, 0);
    edge.addColorStop(0, 'rgba(0,10,20,.5)');
    edge.addColorStop(0.14, 'rgba(255,255,255,.03)');
    edge.addColorStop(0.24, 'rgba(255,255,255,.17)');
    edge.addColorStop(0.32, 'rgba(255,255,255,.03)');
    edge.addColorStop(0.5, 'rgba(255,255,255,0)');
    edge.addColorStop(0.88, 'rgba(255,255,255,.07)');
    edge.addColorStop(1, 'rgba(0,10,20,.5)');
    g.fillStyle = edge;
    g.fillRect(0, 0, W, H);
    g.restore();
    outline();
    g.strokeStyle = 'rgba(232,244,250,.72)';
    g.lineWidth = Math.max(2, W * 0.012);
    g.stroke();
    if (corked) {
      const hw = f(0.05) * W;
      const cork = g.createLinearGradient(W / 2 - hw, 0, W / 2 + hw, 0);
      cork.addColorStop(0, '#7b5a3a');
      cork.addColorStop(0.45, '#c79a6a');
      cork.addColorStop(1, '#6d4f33');
      g.fillStyle = cork;
      g.beginPath();
      g.roundRect(W / 2 - hw * 1.04, H * 0.008, hw * 2.08, H * 0.062, 6);
      g.fill();
    }
  }

  ctx.loop(() => { pour(); step(); step(); render(); });

  const undoStack = [];
  const pushUndo = () => { undoStack.push(grid.slice()); if (undoStack.length > 12) undoStack.shift(); };
  ctx.undo = () => { const st = undoStack.pop(); if (st) grid.set(st); };
  ctx.clear = () => { pushUndo(); grid.fill(0); corked = false; drawGlass(); };
  ctx.snapshot = () => {
    const c = offscreen(scene.canvas.width, scene.canvas.height), g = c.getContext('2d');
    const bg = g.createRadialGradient(c.width / 2, c.height * 0.4, 10, c.width / 2, c.height / 2, c.height * 0.8);
    bg.addColorStop(0, '#3b4652');
    bg.addColorStop(1, '#14181e');
    g.fillStyle = bg;
    g.fillRect(0, 0, c.width, c.height);
    g.drawImage(scene.canvas, 0, 0);
    g.drawImage(glass.canvas, 0, 0);
    return c;
  };

  buildMask();
  drawGlass();
  ctx.ui.swatches(SANDS, colour, (c) => { colour = c; });
  ctx.ui.sep();
  ctx.ui.seg([['pour', 'Pour'], ['poke', 'Poke']], tool, (v) => { tool = v; s.el.style.cursor = v === 'poke' ? 'grab' : 'crosshair'; });
  ctx.ui.slider('Tilt', -100, 100, 0, (v) => { tiltX = v / 100; s.el.style.transform = `rotate(${v * 0.07}deg)`; });
  ctx.ui.seg(Object.keys(SHAPES), shape, (v) => { shape = v; grid.fill(0); buildMask(); drawGlass(); });
  ctx.ui.button('Cork', () => { corked = !corked; drawGlass(); });
  ctx.hint('Hold to pour. Switch to Poke and push the stick down the glass.');
}
