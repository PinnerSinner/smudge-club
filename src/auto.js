// Auto: a ghost hand that paints by itself, so you can sit back and watch the geometry and the chance.
// It drives each toy through the same pointer handlers and dock controls a person would use.
import { brush } from './sound.js';
import { TAU, noise2 } from './kit.js';

const STOP = Symbol('stop');
const rand = (a, b) => a + Math.random() * (b - a);
const int = (a, b) => Math.floor(rand(a, b + 1));
const pickOne = (list) => list[Math.floor(Math.random() * list.length)];
const gcd = (a, b) => (b ? gcd(b, a % b) : a);

// ── Paths: every one a list of [x, y] points in surface coordinates ──
function curve(steps, fn) {
  const out = [];
  for (let i = 0; i <= steps; i++) out.push(fn(i / steps));
  return out;
}

const PATHS = {
  // r = cos(k t): petals, with a count set by k
  rose: (c, R) => {
    const k = int(2, 7), turn = k % 2 ? Math.PI : TAU, spin = rand(0, TAU);
    return curve(520, (t) => { const a = t * turn + spin, r = R * Math.cos(k * (a - spin)); return [c[0] + Math.cos(a) * r, c[1] + Math.sin(a) * r]; });
  },
  // a pen in a gear rolling inside a ring
  gears: (c, R) => {
    const big = int(5, 13), small = int(2, big - 1), d = rand(0.5, 1.2), turns = small / gcd(big, small);
    const norm = R / (big - small + small * d);
    return curve(900, (t) => {
      const a = t * turns * TAU, q = ((big - small) / small) * a;
      return [c[0] + norm * ((big - small) * Math.cos(a) + small * d * Math.cos(q)), c[1] + norm * ((big - small) * Math.sin(a) - small * d * Math.sin(q))];
    });
  },
  lissajous: (c, R, W, H) => {
    const p = pickOne([[3, 2], [5, 4], [3, 4], [5, 6], [7, 6], [2, 5]]), ph = rand(0, TAU), ax = Math.min(W * 0.44, R * 1.5), ay = Math.min(H * 0.44, R * 1.1);
    return curve(760, (t) => [c[0] + ax * Math.sin(p[0] * t * TAU + ph), c[1] + ay * Math.sin(p[1] * t * TAU)]);
  },
  spiral: (c, R) => {
    const turns = rand(3, 8), s = Math.random() < 0.5 ? 1 : -1, a0 = rand(0, TAU);
    return curve(620, (t) => { const a = a0 + s * t * turns * TAU, r = R * t; return [c[0] + Math.cos(a) * r, c[1] + Math.sin(a) * r]; });
  },
  star: (c, R) => {
    const n = pickOne([5, 7, 8, 9, 11, 12]);
    let k = int(2, Math.floor((n - 1) / 2));
    while (gcd(n, k) !== 1) k--;
    const a0 = rand(0, TAU), pts = [];
    for (let i = 0; i <= n; i++) {
      const a = a0 + ((i * k) / n) * TAU, b = a0 + (((i + 1) * k) / n) * TAU;
      if (i < n) for (let j = 0; j < 30; j++) { const u = j / 30; pts.push([c[0] + R * (Math.cos(a) * (1 - u) + Math.cos(b) * u), c[1] + R * (Math.sin(a) * (1 - u) + Math.sin(b) * u)]); }
    }
    return pts;
  },
  rings: (c, R) => {
    const n = int(3, 6), pts = [];
    for (let i = 1; i <= n; i++) { const r = (R * i) / n; for (let j = 0; j <= 110; j++) { const a = (j / 110) * TAU; pts.push([c[0] + Math.cos(a) * r, c[1] + Math.sin(a) * r]); } }
    return pts;
  },
  // a wander steered by smooth noise, the least geometric and most alive of the set
  flow: (c, R, W, H) => {
    const n = noise2(int(1, 9999)), pts = [];
    let x = rand(W * 0.15, W * 0.85), y = rand(H * 0.15, H * 0.85), a = rand(0, TAU);
    const step = Math.max(W, H) / 260;
    for (let i = 0; i < 560; i++) {
      a += (n(x * 0.006, y * 0.006) - 0.5) * 0.9;
      x += Math.cos(a) * step;
      y += Math.sin(a) * step;
      if (x < W * 0.05 || x > W * 0.95) a = Math.PI - a;
      if (y < H * 0.05 || y > H * 0.95) a = -a;
      pts.push([x, y]);
    }
    return pts;
  },
  wave: (c, R, W, H) => {
    const f = rand(1.5, 5), y0 = rand(H * 0.25, H * 0.75), amp = rand(H * 0.08, H * 0.28), l2r = Math.random() < 0.5;
    return curve(420, (t) => { const u = l2r ? t : 1 - t; return [W * (0.04 + 0.92 * u), y0 + Math.sin(t * f * TAU) * amp]; });
  },
  // big looping arm movements, for thrown paint
  fling: (c, R, W, H) => {
    const pts = [];
    let x = rand(W * 0.1, W * 0.9), y = rand(H * 0.1, H * 0.9), a = rand(0, TAU), turn = rand(-0.1, 0.1);
    for (let i = 0; i < 300; i++) {
      turn += rand(-0.02, 0.02);
      turn = Math.max(-0.16, Math.min(0.16, turn));
      a += turn;
      x += Math.cos(a) * 12;
      y += Math.sin(a) * 12;
      if (x < 0 || x > W) a = Math.PI - a;
      if (y < 0 || y > H) a = -a;
      pts.push([x, y]);
    }
    return pts;
  },
};
const GEOMETRY = ['rose', 'gears', 'lissajous', 'spiral', 'star', 'rings', 'flow', 'wave'];

export function createAuto(ctx, { id, timbre, onChange }) {
  const driver = ctx.driver;
  let token = 0, running = false, ghost = null, held = false;

  const show = (x, y) => {
    if (!ghost) return;
    ghost.style.opacity = 1;
    ghost.style.left = `${(x / a.W) * 100}%`;
    ghost.style.top = `${(y / a.H) * 100}%`;
  };
  const at = (x, y) => ({ x, y, pressure: 0.5, button: 0, type: 'auto' });

  const a = {
    W: driver?.s.W || 0,
    H: driver?.s.H || 0,
    ctx, rand, int, pickOne,
    chance: (p) => Math.random() < p,
    live(mine) { if (mine !== token) throw STOP; },
    async wait(ms) {
      const mine = token;
      await new Promise((r) => setTimeout(r, ms));
      a.live(mine);
    },
    // Paints along a path at a set duration, one pointer move per frame, like a real hand.
    async stroke(points, { ms = 3000 } = {}) {
      const mine = token, h = driver.h;
      const start = performance.now();
      brush.start(timbre);
      held = true;
      h.down?.(at(...points[0]));
      show(...points[0]);
      let last = points[0], lastT = start;
      for (;;) {
        await new Promise((r) => requestAnimationFrame(r));
        a.live(mine);
        const now = performance.now(), k = Math.min(1, (now - start) / ms);
        const p = points[Math.min(points.length - 1, Math.floor(k * (points.length - 1)))];
        h.move?.(at(p[0], p[1]));
        show(p[0], p[1]);
        brush.move(Math.hypot(p[0] - last[0], p[1] - last[1]) / Math.max(1, now - lastT));
        last = p;
        lastT = now;
        if (k >= 1) break;
      }
      held = false;
      brush.end();
      h.up?.(at(...last));
    },
    async hold(x, y, ms) {
      const mine = token, h = driver.h;
      brush.start(timbre);
      held = true;
      h.down?.(at(x, y));
      show(x, y);
      await a.wait(ms);
      a.live(mine);
      held = false;
      brush.end();
      h.up?.(at(x, y));
    },
    async tap(x, y) {
      driver.h.down?.(at(x, y));
      show(x, y);
      await a.wait(70);
      driver.h.up?.(at(x, y));
    },
    path(kind, { size = 0.43, at: centre } = {}) {
      const { W, H } = a, R = Math.min(W, H) * size;
      const c = centre || [W / 2 + rand(-0.06, 0.06) * W, H / 2 + rand(-0.06, 0.06) * H];
      return PATHS[kind || pickOne(GEOMETRY)](c, R, W, H);
    },
    line: (x0, y0, x1, y1, n = 60) => curve(n, (t) => [x0 + (x1 - x0) * t, y0 + (y1 - y0) * t]),
    // Back-and-forth rows that cover the whole surface.
    sweep(rows = 12) {
      const pts = [];
      for (let r = 0; r < rows; r++) {
        const y = a.H * ((r + 0.5) / rows), l2r = r % 2 === 0;
        for (let i = 0; i <= 40; i++) pts.push([a.W * (l2r ? i / 40 : 1 - i / 40), y]);
      }
      return pts;
    },

    // ── Working the dock, exactly as a person would ──
    button(label) {
      const want = label.toLowerCase();
      return [...ctx.dock.querySelectorAll('button')].find((b) => b.textContent.trim().toLowerCase() === want);
    },
    press(label) { a.button(label)?.click(); },
    toggle(label, on) {
      const b = a.button(label);
      if (b && b.classList.contains('on') !== on) b.click();
    },
    colour() {
      const list = [...ctx.dock.querySelectorAll('.sw button')];
      if (list.length) pickOne(list).click();
    },
    set(label, value) {
      const box = [...ctx.dock.querySelectorAll('label.ctl')].find((l) => l.textContent.trim().toLowerCase() === label.toLowerCase());
      const input = box?.querySelector('input');
      if (!input) return;
      input.value = value;
      input.dispatchEvent(new Event('input', { bubbles: true }));
    },
    // Moves a slider smoothly over time, so its effect can be watched.
    async slide(label, from, to, ms) {
      const mine = token, start = performance.now();
      for (;;) {
        await new Promise((r) => setTimeout(r, 40));
        a.live(mine);
        const k = Math.min(1, (performance.now() - start) / ms);
        a.set(label, from + (to - from) * k);
        if (k >= 1) break;
      }
    },
    // Picks at random from the seg or dropdown that offers this option.
    choose(option) {
      const seg = a.button(option)?.closest('.seg');
      if (seg) { pickOne([...seg.querySelectorAll('button')]).click(); return; }
      const select = [...ctx.dock.querySelectorAll('select')].find((s) => [...s.options].some((o) => o.textContent === option));
      if (select) { select.selectedIndex = int(0, select.options.length - 1); select.dispatchEvent(new Event('change', { bubbles: true })); }
    },
    // Rolls the dice on every dropdown, tab and slider in the dock.
    shuffle({ skip = [] } = {}) {
      const skipped = skip.map((s) => s.toLowerCase());
      ctx.dock.querySelectorAll('.seg').forEach((seg) => {
        const list = [...seg.querySelectorAll('button')];
        if (!list.some((b) => skipped.includes(b.textContent.trim().toLowerCase()))) pickOne(list).click();
      });
      ctx.dock.querySelectorAll('select').forEach((s) => {
        s.selectedIndex = int(0, s.options.length - 1);
        s.dispatchEvent(new Event('change', { bubbles: true }));
      });
      ctx.dock.querySelectorAll('label.ctl').forEach((l) => {
        if (skipped.includes(l.textContent.trim().toLowerCase())) return;
        const i = l.querySelector('input');
        i.value = rand(+i.min + (i.max - i.min) * 0.15, +i.max - (i.max - i.min) * 0.15);
        i.dispatchEvent(new Event('input', { bubbles: true }));
      });
    },
    clear() { ctx.clear?.(); },
  };

  const run = async (script) => {
    try { await script(a); } catch (e) { if (e !== STOP) throw e; }
  };

  return {
    available: Boolean(driver),
    get running() { return running; },
    start() {
      if (running || !driver) return;
      running = true;
      token++;
      ghost = document.createElement('div');
      ghost.className = 'ghost';
      driver.s.el.appendChild(ghost);
      ctx.dismissTip();
      onChange(true);
      run(SCRIPTS[id] || painter());
    },
    stop() {
      if (!running) return;
      running = false;
      token++;
      if (held) {
        held = false;
        brush.end();
        driver.h.up?.(at(a.W / 2, a.H / 2));
      }
      ghost?.remove();
      ghost = null;
      onChange(false);
    },
  };
}

// The general routine: roll the settings, lay down a few figures, admire them, start again.
function painter({ kinds = null, ms = [2600, 5200], rest = [150, 700], admire = 3800, strokes = [5, 10], skip = [], size } = {}) {
  return async (a) => {
    for (;;) {
      a.shuffle({ skip });
      const n = a.int(...strokes);
      for (let i = 0; i < n; i++) {
        a.colour();
        await a.stroke(a.path(kinds && a.pickOne(kinds), { size }), { ms: a.rand(...ms) });
        await a.wait(a.rand(...rest));
      }
      await a.wait(admire);
      a.clear();
      await a.wait(500);
    }
  };
}

// Toys whose beauty is in something other than drawing lines get a routine of their own.
const SCRIPTS = {
  'drip-feed': async (a) => {
    for (;;) {
      a.shuffle();
      const n = a.int(7, 13);
      for (let i = 0; i < n; i++) {
        a.colour();
        await a.stroke(a.path('fling'), { ms: a.rand(1100, 2400) });
        if (a.chance(0.35)) await a.hold(a.rand(0.15, 0.85) * a.W, a.rand(0.15, 0.7) * a.H, a.rand(500, 1300));
      }
      await a.wait(4500);
      a.clear();
    }
  },

  'golden-repair': async (a) => {
    for (;;) {
      a.choose('Tenmoku');
      a.choose('Gold');
      await a.wait(1400);
      await a.tap(a.W / 2 + a.rand(-90, 90), a.H / 2 + a.rand(-90, 90));
      await a.wait(1300);
      await a.tap(a.W / 2 + a.rand(-160, 160), a.H / 2 + a.rand(-160, 160));
      await a.wait(2600);
      a.press('Gather all');
      await a.wait(10500);
      a.press('New bowl');
      await a.wait(600);
    }
  },

  sediment: async (a) => {
    for (;;) {
      a.press('Pour');
      a.choose('Flask');
      a.set('Tilt', 0);
      await a.wait(400);
      const layers = a.int(10, 15);
      for (let i = 0; i < layers; i++) {
        a.colour();
        await a.hold(a.W / 2 + a.rand(-30, 30), a.H * 0.1, a.rand(2200, 4200));
        if (a.chance(0.45)) {
          await a.wait(1200);
          a.press('Poke');
          for (let k = a.int(2, 4); k > 0; k--) {
            const x = a.rand(0.2, 0.8) * a.W;
            await a.stroke(a.line(x, a.H * 0.45, x + a.rand(-14, 14), a.H * 0.93, 40), { ms: 900 });
          }
          a.press('Pour');
        }
        if (a.chance(0.25)) a.set('Tilt', a.rand(-60, 60));
        else if (a.chance(0.5)) a.set('Tilt', 0);
      }
      a.set('Tilt', 0);
      await a.wait(2500);
      a.press('Cork');
      await a.wait(4500);
      a.clear();
    }
  },

  endpaper: async (a) => {
    for (;;) {
      a.choose('Harbour');
      a.press('Drop');
      for (let i = a.int(16, 28); i > 0; i--) {
        a.colour();
        a.set('Size', a.rand(22, 85));
        await a.tap(a.rand(0.05, 0.95) * a.W, a.rand(0.05, 0.95) * a.H);
        await a.wait(200);
      }
      await a.wait(600);
      a.press('Rake');
      a.set('Tines', a.int(7, 22));
      const across = a.chance(0.5);
      for (let i = a.int(2, 4); i > 0; i--) {
        const f = a.rand(0.2, 0.8), back = i % 2 === 0;
        const line = across ? a.line(back ? a.W : 0, a.H * f, back ? 0 : a.W, a.H * f, 90) : a.line(a.W * f, back ? a.H : 0, a.W * f, back ? 0 : a.H, 90);
        await a.stroke(line, { ms: 2100 });
      }
      if (a.chance(0.55)) {
        a.press('Swirl');
        await a.stroke(a.path('spiral', { size: 0.3 }), { ms: 3000 });
      }
      await a.wait(1400);
      a.press('Lay the paper');
      await a.wait(7500);
      a.clear();
    }
  },

  'steamed-up': async (a) => {
    for (;;) {
      a.choose('Night');
      a.set('Finger', a.rand(16, 40));
      a.set('Fog returns', 0.4);
      for (let i = a.int(3, 6); i > 0; i--) {
        await a.stroke(a.path(a.pickOne(['rose', 'star', 'wave', 'spiral', 'lissajous'])), { ms: a.rand(3200, 5400) });
        await a.wait(800);
      }
      await a.wait(4500);
      a.press('Breathe');
      await a.wait(1500);
      a.press('Breathe');
      await a.wait(1500);
      a.clear();
    }
  },

  'wallpaper-group': async (a) => {
    for (;;) {
      a.press('Paper');
      a.set('Tile', a.rand(120, 260));
      a.set('Pen', a.rand(2, 9));
      for (let i = a.int(4, 7); i > 0; i--) {
        a.colour();
        await a.stroke(a.path(a.pickOne(['rose', 'star', 'wave', 'flow']), { size: 0.16 }), { ms: a.rand(1800, 3200) });
      }
      // The best part: the same marks, woven through one symmetry after another.
      for (let i = 0; i < 5; i++) {
        a.choose('Tile');
        await a.wait(2100);
      }
      a.clear();
    }
  },

  'right-angles': async (a) => {
    for (;;) {
      a.press('Compose for me');
      await a.wait(1000);
      for (let i = a.int(3, 6); i > 0; i--) {
        a.colour();
        await a.tap(a.rand(0.05, 0.95) * a.W, a.rand(0.05, 0.95) * a.H);
        await a.wait(380);
      }
      a.press('Boogie');
      await a.wait(12000);
      a.press('Stop');
      await a.wait(400);
    }
  },

  'dont-lift': async (a) => {
    for (;;) {
      a.press('New sheet');
      a.colour();
      a.set('Nib', a.rand(1.5, 4));
      await a.wait(500);
      const ms = a.rand(7000, 11000);
      await a.stroke(a.path(a.pickOne(['gears', 'flow', 'lissajous', 'rose'])), { ms });
      await a.wait(ms + 3500); // it replays itself
    }
  },

  'twin-dials': async (a) => {
    for (;;) {
      a.choose('Phosphor');
      a.press('Lissajous');
      await a.wait(a.rand(13000, 19000));
      a.press('Lissajous');
      await a.wait(1800);
      a.press('Shake');
      await a.wait(900);
      a.press('Shake');
      await a.wait(1100);
      a.clear();
    }
  },

  raked: async (a) => {
    for (;;) {
      a.choose('Pale');
      a.press('Stone');
      for (let i = a.int(1, 4); i > 0; i--) {
        await a.tap(a.rand(0.15, 0.85) * a.W, a.rand(0.2, 0.75) * a.H);
        await a.wait(500);
      }
      a.press('Rake');
      a.set('Tines', a.int(3, 8));
      a.set('Spacing', a.rand(11, 20));
      for (let i = a.int(3, 5); i > 0; i--) {
        await a.stroke(a.path(a.pickOne(['wave', 'spiral', 'flow', 'lissajous'])), { ms: a.rand(4500, 7000) });
      }
      await a.slide('Sun', 8, 92, 9000);
      await a.wait(1500);
      a.clear();
    }
  },

  squint: async (a) => {
    for (;;) {
      a.choose('Free');
      a.colour();
      a.set('Dot', a.rand(3, 7));
      a.set('Space', a.rand(10, 18));
      a.set('Mix', a.rand(20, 60));
      await a.stroke(a.sweep(a.int(9, 14)), { ms: 15000 });
      await a.wait(1000);
      a.toggle('Squint', true);
      await a.wait(3800);
      a.toggle('Squint', false);
      await a.wait(1600);
      a.clear();
    }
  },

  'highly-strung': async (a) => {
    for (;;) {
      a.colour();
      a.choose('Midnight');
      a.set('Pins', a.int(90, 280));
      const from = a.rand(2, 6);
      // Sliding through the times tables is where the cardioids and nephroids bloom and collapse.
      await a.slide('Times', from, from + a.rand(4, 26), 15000);
      await a.stroke(a.line(a.W * 0.02, a.rand(0.2, 0.8) * a.H, a.W * 0.98, a.rand(0.2, 0.8) * a.H, 80), { ms: 1700 });
      await a.wait(2200);
    }
  },

  'low-res': async (a) => {
    a.toggle('Mirror', true);
    a.press('Pen');
    const N = 32;
    for (;;) {
      a.choose('Classic');
      // One creature, drawn four times with a slight shiver, so that it comes alive when played.
      const marks = [];
      for (let i = a.int(7, 12); i > 0; i--) {
        const pts = [];
        let x = a.int(5, 15), y = a.int(6, 26);
        for (let k = a.int(4, 14); k > 0; k--) {
          x += a.int(-1, 1);
          y += a.int(-1, 1);
          pts.push([x, y]);
        }
        marks.push({ pts, swatch: a.int(0, 14) });
      }
      const swatches = [...a.ctx.dock.querySelectorAll('.sw button')];
      for (let f = 1; f <= 4; f++) {
        a.ctx.dock.querySelector(`[aria-label="Frame ${f}"]`)?.click();
        a.clear();
        const shiver = () => a.int(-1, 1) * (f % 2);
        for (const m of marks) {
          swatches[m.swatch]?.click();
          const ox = shiver(), oy = shiver();
          await a.stroke(m.pts.map(([x, y]) => [((x + ox + 0.5) / N) * a.W, ((y + oy + 0.5) / N) * a.H]), { ms: 260 });
        }
      }
      a.press('Play');
      await a.wait(6500);
      a.press('Stop');
    }
  },

  'spin-cycle': async (a) => {
    for (;;) {
      a.set('Throttle', a.rand(45, 98));
      await a.wait(1800);
      for (let i = a.int(6, 11); i > 0; i--) {
        a.colour();
        const t = a.rand(0, Math.PI * 2), r = a.rand(0.04, 0.3) * Math.min(a.W, a.H);
        await a.hold(a.W / 2 + Math.cos(t) * r, a.H / 2 + Math.sin(t) * r, a.rand(400, 1200));
        await a.wait(a.rand(100, 500));
      }
      await a.wait(1500);
      a.toggle('Brake', true);
      await a.wait(4200);
      a.toggle('Brake', false);
      a.press('New card');
    }
  },

  'wet-on-wet': async (a) => {
    for (;;) {
      a.press('Ink');
      a.choose('Sumi');
      a.set('Damp', a.rand(8, 22));
      a.clear();
      for (let i = a.int(4, 7); i > 0; i--) {
        a.set('Brush', a.rand(12, 46));
        a.set('Load', a.rand(40, 100));
        await a.stroke(a.path(a.pickOne(['flow', 'wave', 'rose', 'spiral'])), { ms: a.rand(2600, 4800) });
        await a.wait(a.rand(1600, 3400));
      }
      await a.wait(6000);
    }
  },

  'fold-here': async (a) => {
    for (;;) {
      for (let layer = a.int(1, 2); layer > 0; layer--) {
        a.colour();
        for (let i = a.int(4, 8); i > 0; i--) {
          a.set('Brush', a.rand(10, 42));
          const x = a.rand(0.1, 0.46) * a.W, y = a.rand(0.1, 0.9) * a.H;
          await a.stroke(a.line(x, y, x + a.rand(-90, 70), y + a.rand(-90, 90), 26), { ms: a.rand(350, 800) });
        }
        await a.wait(400);
        a.press('Fold and press');
        await a.wait(4600);
      }
      await a.wait(3400);
      a.clear();
    }
  },

  leadlight: async (a) => {
    const glaze = async () => {
      a.press('Glaze');
      for (let i = a.int(18, 30); i > 0; i--) {
        a.colour();
        await a.tap(a.rand(0.32, 0.68) * a.W, a.rand(0.1, 0.72) * a.H);
        await a.wait(220);
      }
    };
    for (;;) {
      await glaze();
      await a.slide('Sun', 5, 95, 8000);
      await a.wait(800);
      a.clear();
      // Fresh tracery: chords across the window, for new panes to fill.
      a.press('Lead');
      for (let i = a.int(7, 11); i > 0; i--) {
        await a.stroke(a.line(a.W * a.rand(0.3, 0.5), a.H * a.rand(0.05, 0.75), a.W * a.rand(0.5, 0.7), a.H * a.rand(0.05, 0.75), 40), { ms: 650 });
      }
    }
  },

  'slow-growth': async (a) => {
    for (;;) {
      a.choose('Coral');
      a.choose('Lagoon');
      a.set('Clock', 20);
      a.set('Seed', a.rand(10, 26));
      for (let i = a.int(2, 4); i > 0; i--) await a.stroke(a.path(a.pickOne(['rose', 'star', 'spiral', 'rings']), { size: 0.26 }), { ms: 2200 });
      await a.wait(15000);
      a.choose('Coral');
      await a.wait(11000);
      a.clear();
    }
  },

  // Light adds up here, so whole figures through many mirrors burn out to white. Fine fragments build a mandala instead.
  'hall-of-mirrors': async (a) => {
    for (;;) {
      a.choose('Neon');
      a.set('Mirrors', a.int(5, 14));
      a.set('Width', a.rand(1, 2.6));
      a.set('Turn', a.rand(-30, 30));
      a.toggle('Glow', a.chance(0.6));
      for (let i = a.int(4, 7); i > 0; i--) {
        const pts = a.path(a.pickOne(['rose', 'gears', 'spiral', 'flow']));
        const from = a.int(0, Math.floor(pts.length * 0.65));
        await a.stroke(pts.slice(from, from + Math.floor(pts.length * 0.28)), { ms: a.rand(1800, 3200) });
        await a.wait(a.rand(200, 700));
      }
      await a.wait(5000);
      a.clear();
      await a.wait(500);
    }
  },

  'wordsmear': painter({ kinds: ['spiral', 'wave', 'rose', 'flow'], ms: [4500, 8000], strokes: [3, 6] }),
  'word-wheel': painter({ kinds: ['wave', 'flow', 'rose'], ms: [3000, 4500], strokes: [2, 3], size: 0.3, skip: ['Letters'] }),
  'long-exposure': painter({ ms: [2800, 5000], strokes: [4, 7], admire: 5000 }),
};
