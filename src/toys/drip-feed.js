// Drip Feed: thrown enamel with real relief. Colour and height paint separately, then a shader lights the wet surface.
import { PAINTBOX, TAU, clamp, dist, lerp, offscreen } from '../kit.js';
import { createGL, program, draw, texture, upload, bind, RELIEF_FRAG } from '../gl.js';

const TINS = PAINTBOX;

export default function mount(ctx) {
  const s = ctx.surface({ paper: true, bg: '#efe9dc', maxPx: 1800 });
  const { W, H, px } = s;
  const out = s.layer({ gl: true });
  const col = s.buffer();
  const hgt = s.buffer();
  const gl = createGL(out.canvas);

  const prime = () => {
    col.g.fillStyle = '#efe9dc';
    col.g.fillRect(0, 0, W, H);
    // A faint canvas weave in the height map, so bare ground still catches the light.
    hgt.g.fillStyle = '#080000';
    hgt.g.fillRect(0, 0, W, H);
    hgt.g.fillStyle = 'rgba(30,0,0,.5)';
    for (let x = 0; x < W; x += 3) hgt.g.fillRect(x, 0, 1, H);
    for (let y = 0; y < H; y += 3) hgt.g.fillRect(0, y, W, 1);
  };
  prime();

  const prog = program(gl, RELIEF_FRAG);
  const tc = texture(gl), th = texture(gl);

  let colour = '#d92b1f', size = 7, tilt = 0, dirty = true;
  const pointer = { x: W * 0.3, y: H * 0.2, down: false, still: 0 };
  const flights = [], runs = [];

  // Height is the red channel; green is wetness, which drives the specular highlight.
  function blob(x, y, r, c = colour) {
    col.g.fillStyle = c;
    col.g.beginPath();
    col.g.arc(x, y, r, 0, TAU);
    col.g.fill();
    const grd = hgt.g.createRadialGradient(x, y, r * 0.15, x, y, r * 1.12);
    grd.addColorStop(0, 'rgba(235,255,0,.7)');
    grd.addColorStop(0.6, 'rgba(170,255,0,.5)');
    grd.addColorStop(1, 'rgba(0,200,0,0)');
    hgt.g.fillStyle = grd;
    hgt.g.beginPath();
    hgt.g.arc(x, y, r * 1.12, 0, TAU);
    hgt.g.fill();
    dirty = true;
  }

  function strand(x0, y0, x1, y1, w, c = colour) {
    const n = Math.max(1, Math.ceil(dist(x0, y0, x1, y1) / Math.max(1, w * 0.45)));
    for (let i = 0; i <= n; i++) {
      const t = i / n;
      blob(lerp(x0, x1, t), lerp(y0, y1, t), w * (0.8 + Math.random() * 0.4), c);
    }
  }

  const throwDrop = (x, y, vx, vy, r) => flights.push({ x, y, vx, vy, r, t: 0.05 + Math.random() * 0.18, c: colour });

  function land(f) {
    const stretch = clamp(Math.hypot(f.vx, f.vy) / 900, 0, 1);
    blob(f.x, f.y, f.r, f.c);
    if (stretch > 0.2) {
      // Fast drops land as a teardrop that tapers along their heading, then spit a few stray satellites.
      const a = Math.atan2(f.vy, f.vx), len = f.r * (2 + stretch * 5);
      const steps = Math.max(3, Math.ceil(len / Math.max(0.8, f.r * 0.4)));
      for (let i = 1; i <= steps; i++) {
        const t = i / steps;
        blob(f.x + Math.cos(a) * len * t, f.y + Math.sin(a) * len * t, Math.max(0.4, f.r * (1 - t) ** 1.4), f.c);
      }
      const strays = Math.floor(Math.random() * 3);
      for (let i = 0; i < strays; i++) {
        const sa = a + (Math.random() - 0.5) * 0.9, d = len * (1.1 + Math.random() * 1.6);
        blob(f.x + Math.cos(sa) * d, f.y + Math.sin(sa) * d, f.r * (0.12 + Math.random() * 0.3), f.c);
      }
    }
    if (f.r > 6 && Math.random() < 0.5) runs.push({ x: f.x, y: f.y, r: f.r * 0.42, life: 1, c: f.c, wob: Math.random() * TAU });
  }

  s.pointer({
    down(p) {
      pushUndo();
      pointer.down = true;
      pointer.x = p.x;
      pointer.y = p.y;
      pointer.still = 0;
      blob(p.x, p.y, size * 0.9);
    },
    move(p) {
      const dx = p.x - pointer.x, dy = p.y - pointer.y, sp = Math.hypot(dx, dy);
      // Slow lines are fat, fast lines thin to a whip.
      const w = clamp(size * (1.15 - sp / 44), size * 0.16, size * 1.25);
      strand(pointer.x, pointer.y, p.x, p.y, w);
      const flicks = Math.min(6, Math.floor(sp / 7));
      for (let i = 0; i < flicks; i++) {
        const a = Math.atan2(dy, dx) + (Math.random() - 0.5) * (0.45 + Math.random() * 0.5);
        const v = (sp * 16 + 200) * (0.3 + Math.random());
        throwDrop(p.x, p.y, Math.cos(a) * v, Math.sin(a) * v, size * (0.1 + Math.random() * Math.random() * 0.75));
      }
      pointer.x = p.x;
      pointer.y = p.y;
      if (sp > 2) pointer.still = 0;
    },
    hover(p) { pointer.x = p.x; pointer.y = p.y; },
    up() { pointer.down = false; },
  });

  ctx.loop((dt) => {
    if (pointer.down) {
      pointer.still += dt;
      if (pointer.still > 0.12) {
        // Holding still pours a growing pool that eventually runs.
        const r = size * (1 + Math.min(4, pointer.still * 2.2));
        blob(pointer.x + (Math.random() - 0.5) * 3, pointer.y + (Math.random() - 0.5) * 3, r);
        if (pointer.still > 0.9 && Math.random() < 0.06) {
          runs.push({ x: pointer.x + (Math.random() - 0.5) * r, y: pointer.y + r * 0.7, r: size * 0.5, life: 1.3, c: colour, wob: Math.random() * TAU });
        }
      }
    }
    for (let i = flights.length - 1; i >= 0; i--) {
      const f = flights[i];
      f.t -= dt;
      f.x += f.vx * dt;
      f.y += f.vy * dt;
      if (f.t <= 0) { land(f); flights.splice(i, 1); }
    }
    const gx = Math.sin(tilt), gy = Math.cos(tilt);
    for (let i = runs.length - 1; i >= 0; i--) {
      const r = runs[i];
      r.wob += dt * 3;
      r.x += (gx * 62 + Math.sin(r.wob) * 7) * dt * r.life;
      r.y += gy * 62 * dt * r.life;
      r.life -= dt * (0.32 + Math.random() * 0.2);
      blob(r.x, r.y, Math.max(0.6, r.r * clamp(r.life, 0.3, 1)), r.c);
      if (r.life <= 0 || r.y > H + 8 || r.x < -8 || r.x > W + 8) runs.splice(i, 1);
    }

    if (dirty) {
      upload(gl, tc, 0, col.canvas);
      upload(gl, th, 1, hgt.canvas);
      dirty = false;
    } else { bind(gl, tc, 0); bind(gl, th, 1); }
    gl.viewport(0, 0, out.canvas.width, out.canvas.height);
    prog.use().i('color', 0).i('height', 1)
      .f('px', 1 / (W * px), 1 / (H * px))
      .f('light', (pointer.x / W - 0.5) * 2.2, -(pointer.y / H - 0.5) * 2.2, 0.9)
      .f('strength', 1.9).f('gloss', 60).f('spec', 0.62).f('grain', 0).f('tint', 1, 1, 1);
    draw(gl);
  });

  const stack = [];
  const copy = (c) => { const o = offscreen(c.width, c.height); o.getContext('2d').drawImage(c, 0, 0); return o; };
  const pushUndo = () => {
    stack.push([copy(col.canvas), copy(hgt.canvas)]);
    if (stack.length > 8) stack.shift();
  };
  const restore = (b, c) => { b.g.save(); b.g.setTransform(1, 0, 0, 1, 0, 0); b.g.drawImage(c, 0, 0); b.g.restore(); };
  ctx.undo = () => {
    const st = stack.pop();
    if (!st) return;
    runs.length = 0;
    flights.length = 0;
    restore(col, st[0]);
    restore(hgt, st[1]);
    dirty = true;
  };
  ctx.clear = () => { pushUndo(); runs.length = 0; flights.length = 0; prime(); dirty = true; };
  ctx.snapshot = () => out.canvas;

  ctx.ui.swatches(TINS, colour, (c) => { colour = c; });
  ctx.ui.sep();
  ctx.ui.slider('Load', 2, 16, size, (v) => { size = v; });
  ctx.ui.slider('Tilt', -60, 60, 0, (v) => { tilt = (v * Math.PI) / 180; });
  ctx.ui.button('Let rip', () => {
    pushUndo();
    // A random gestural pass, for anyone who wants to see what the paint can do.
    for (let k = 0; k < 4; k++) {
      let x = Math.random() * W, y = Math.random() * H, a = Math.random() * TAU;
      for (let i = 0; i < 70; i++) {
        a += (Math.random() - 0.5) * 1.1;
        const nx = clamp(x + Math.cos(a) * 26, 0, W), ny = clamp(y + Math.sin(a) * 26, 0, H);
        strand(x, y, nx, ny, size * (0.2 + Math.pow(Math.random(), 3)));
        if (Math.random() < 0.3) throwDrop(nx, ny, Math.cos(a) * 700, Math.sin(a) * 700, size * Math.random() * 0.8);
        x = nx;
        y = ny;
      }
    }
  });
  ctx.hint('Fling fast for spatter, hold still to pool. The light follows your hand.');
}
