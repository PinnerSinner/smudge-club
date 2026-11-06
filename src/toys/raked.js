// Raked: a real height field of gravel, lit by a low sun you can drag across the sky.
import { sfx } from '../sound.js';
import { TAU, clamp, dist, lerp, noise2, offscreen } from '../kit.js';
import { createGL, program, draw, texture, upload, bind, RELIEF_FRAG } from '../gl.js';

export default function mount(ctx) {
  const s = ctx.surface({ bleed: true, maxPx: 1800 });
  const { W, H, px } = s;
  const out = s.layer({ gl: true });
  const stones = s.layer({ hit: false });
  const col = s.buffer();
  const hgt = s.buffer();
  const gl = createGL(out.canvas);
  const prog = program(gl, RELIEF_FRAG);
  const tc = texture(gl), th = texture(gl);

  let tool = 'rake', tines = 5, spread = 15, sun = 0.24, dirty = true;
  const rocks = [];
  const n = noise2(4);

  function gravel() {
    const g = col.g;
    g.fillStyle = '#d9d0bd';
    g.fillRect(0, 0, W, H);
    for (let i = 0; i < (W * H) / 22; i++) {
      const v = Math.random();
      g.fillStyle = v > 0.5 ? `rgba(255,250,236,${(v - 0.5) * 0.3})` : `rgba(90,76,54,${(0.5 - v) * 0.3})`;
      g.fillRect(Math.random() * W, Math.random() * H, 1.5, 1.5);
    }
    smooth();
  }

  function smooth() {
    const g = hgt.g;
    g.fillStyle = '#800000';
    g.fillRect(0, 0, W, H);
    // A very slight unevenness, so an unraked bed still looks like gravel rather than plastic.
    for (let y = 0; y < H; y += 24) {
      for (let x = 0; x < W; x += 24) {
        const v = 118 + n(x * 0.012, y * 0.012) * 20;
        g.fillStyle = `rgba(${Math.round(v)},0,0,.5)`;
        g.fillRect(x, y, 24, 24);
      }
    }
    dirty = true;
  }

  const groove = 'rgb(50,0,0)', ridge = 'rgb(205,0,0)', bed = 'rgb(128,0,0)';

  function rakeSegment(ax, ay, bx, by) {
    const g = hgt.g, dx = bx - ax, dy = by - ay, d = Math.hypot(dx, dy);
    if (d < 0.01) return;
    const nx = -dy / d, ny = dx / d, span = tines * spread;
    const line = (o, w, c) => {
      g.strokeStyle = c;
      g.lineWidth = w;
      g.beginPath();
      g.moveTo(ax + nx * o, ay + ny * o);
      g.lineTo(bx + nx * o, by + ny * o);
      g.stroke();
    };
    g.lineCap = 'butt';
    line(0, span + spread * 0.6, bed);
    g.lineCap = 'round';
    for (let i = 0; i < tines; i++) {
      const o = (i - (tines - 1) / 2) * spread;
      line(o, spread * 0.42, groove);
      line(o + spread / 2, spread * 0.34, ridge);
      line(o - spread / 2, spread * 0.34, ridge);
    }
    dirty = true;
  }

  // Concentric ripples, as if the stone had dropped into still water.
  function ripple(r) {
    const g = hgt.g, count = 7;
    g.fillStyle = bed;
    g.beginPath();
    g.arc(r.x, r.y, r.r + count * spread * 0.82 + spread, 0, TAU);
    g.fill();
    for (let i = 0; i < count; i++) {
      const rad = r.r + spread * 0.7 + i * spread * 0.82;
      g.strokeStyle = groove;
      g.lineWidth = spread * 0.36;
      g.beginPath();
      g.arc(r.x, r.y, rad, 0, TAU);
      g.stroke();
      g.strokeStyle = ridge;
      g.lineWidth = spread * 0.3;
      g.beginPath();
      g.arc(r.x, r.y, rad + spread * 0.41, 0, TAU);
      g.stroke();
    }
    dirty = true;
  }

  function makeRock(x, y, r) {
    const pts = [], c = 11 + Math.floor(Math.random() * 5), seed = Math.random() * 40;
    for (let i = 0; i < c; i++) {
      const a = (i / c) * TAU, k = 0.76 + n(Math.cos(a) * 1.6 + seed, Math.sin(a) * 1.6 + seed) * 0.5;
      pts.push([Math.cos(a) * r * k, Math.sin(a) * r * k * 0.84]);
    }
    return { x, y, r, pts, tone: 50 + Math.random() * 34 };
  }

  function outline(g, r, ox = 0, oy = 0) {
    g.beginPath();
    r.pts.forEach(([x, y], i) => {
      const nx = r.pts[(i + 1) % r.pts.length];
      const mx = (x + nx[0]) / 2, my = (y + nx[1]) / 2;
      if (!i) g.moveTo(r.x + ox + mx, r.y + oy + my);
      else g.quadraticCurveTo(r.x + ox + x, r.y + oy + y, r.x + ox + mx, r.y + oy + my);
    });
    g.closePath();
  }

  function sunVector() {
    const a = sun * Math.PI;
    // The sun climbs in an arc: low in the east, high at noon, low in the west.
    return [Math.cos(a) * 1.25, 0.4, 0.34 + Math.sin(a) * 1.1];
  }

  function drawStones() {
    const g = stones.g, [sx, sy, sz] = sunVector();
    g.clearRect(0, 0, W, H);
    for (const r of rocks) {
      const k = (r.r * 0.72) / Math.max(0.3, sz);
      g.save();
      g.filter = 'blur(5px)';
      g.fillStyle = 'rgba(40,30,20,.48)';
      outline(g, r, -sx * k, sy * k);
      g.fill();
      g.restore();
      outline(g, r);
      const hx = r.x + sx * r.r * 0.42, hy = r.y - sy * r.r * 0.6;
      const f = g.createRadialGradient(hx, hy, r.r * 0.08, r.x, r.y, r.r * 1.15);
      f.addColorStop(0, `rgb(${r.tone + 88},${r.tone + 82},${r.tone + 76})`);
      f.addColorStop(0.55, `rgb(${r.tone + 16},${r.tone + 12},${r.tone + 10})`);
      f.addColorStop(1, `rgb(${r.tone - 34},${r.tone - 36},${r.tone - 36})`);
      g.fillStyle = f;
      g.fill();
    }
  }

  const P = { x: 0, y: 0, down: false, sx: 0, sy: 0 };

  s.pointer({
    down(p) {
      pushUndo();
      Object.assign(P, { x: p.x, y: p.y, sx: p.x, sy: p.y, down: true });
      const hit = rocks.find((r) => dist(r.x, r.y, p.x, p.y) < r.r);
      if (hit && tool !== 'stone') { P.tapped = hit; return; }
      P.tapped = null;
      if (tool === 'stone') {
        const r = makeRock(p.x, p.y, 24 + Math.random() * 44);
        rocks.push(r);
        sfx('thud');
        ripple(r);
        drawStones();
      }
    },
    move(p) {
      if (!P.down) return;
      if (tool === 'rake' && !(P.tapped && dist(p.x, p.y, P.sx, P.sy) < 8)) {
        // Follow with a little lag, as a rake drags behind the hand.
        const tx = lerp(P.x, p.x, 0.8), ty = lerp(P.y, p.y, 0.8);
        rakeSegment(P.x, P.y, tx, ty);
        P.x = tx;
        P.y = ty;
      }
    },
    up() {
      if (P.tapped) { sfx('clink'); ripple(P.tapped); }
      P.down = false;
    },
  });

  ctx.loop(() => {
    if (dirty) {
      upload(gl, tc, 0, col.canvas);
      upload(gl, th, 1, hgt.canvas);
      dirty = false;
    } else { bind(gl, tc, 0); bind(gl, th, 1); }
    const [sx, sy, sz] = sunVector(), noon = clamp(Math.sin(sun * Math.PI));
    gl.viewport(0, 0, out.canvas.width, out.canvas.height);
    prog.use().i('color', 0).i('height', 1)
      .f('px', 1 / (W * px), 1 / (H * px))
      .f('light', sx, sy, sz)
      .f('strength', 2.5).f('gloss', 20).f('spec', 0).f('grain', 0.4)
      .f('tint', lerp(1.08, 1, noon), lerp(0.9, 1, noon), lerp(0.76, 1, noon));
    draw(gl);
  });

  const stack = [];
  const copy = (c) => { const o = offscreen(c.width, c.height); o.getContext('2d').drawImage(c, 0, 0); return o; };
  const pushUndo = () => { stack.push({ h: copy(hgt.canvas), rocks: rocks.slice() }); if (stack.length > 10) stack.shift(); };
  ctx.undo = () => {
    const st = stack.pop();
    if (!st) return;
    hgt.g.save();
    hgt.g.setTransform(1, 0, 0, 1, 0, 0);
    hgt.g.drawImage(st.h, 0, 0);
    hgt.g.restore();
    rocks.length = 0;
    rocks.push(...st.rocks);
    drawStones();
    dirty = true;
  };
  ctx.clear = () => { pushUndo(); rocks.length = 0; smooth(); drawStones(); };
  ctx.snapshot = () => {
    const c = offscreen(out.canvas.width, out.canvas.height), g = c.getContext('2d');
    g.drawImage(out.canvas, 0, 0);
    g.drawImage(stones.canvas, 0, 0);
    return c;
  };

  gravel();
  // Open on a bed that has already been combed once, with two stones set.
  for (let y = spread * 3; y < H + spread * tines; y += spread * tines) rakeSegment(-10, y, W + 10, y);
  [[0.34, 0.42, 66], [0.68, 0.6, 42]].forEach(([x, y, r]) => { const k = makeRock(W * x, H * y, r); rocks.push(k); ripple(k); });
  drawStones();

  ctx.ui.seg([['rake', 'Rake'], ['stone', 'Stone']], tool, (v) => { tool = v; });
  ctx.ui.sep();
  ctx.ui.slider('Tines', 1, 9, tines, (v) => { tines = v; });
  ctx.ui.slider('Spacing', 8, 26, spread, (v) => { spread = v; });
  ctx.ui.slider('Sun', 6, 94, sun * 100, (v) => { sun = v / 100; drawStones(); });
  ctx.ui.button('Smooth', () => { pushUndo(); smooth(); rocks.forEach(ripple); });
  ctx.hint('Rake long slow lines. Tap a stone to ripple around it. Move the sun.');
}
