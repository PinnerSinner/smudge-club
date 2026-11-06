// Right Angles: split rooms, fill them with primaries, then press play and the lines start to swing.
import { sfx } from '../sound.js';
import { clamp, offscreen, paperGrain, pick, pluck } from '../kit.js';

const FILLS = ['#f1ece0', '#d8312c', '#f3c613', '#1f3f9e', '#141414'];
const SCALE = [196, 220, 247, 294, 330, 392, 440, 494, 587, 659];
const LINE = 9;

export default function mount(ctx) {
  const s = ctx.surface({ aspect: 1.15, paper: true, maxPx: 2000 });
  const { W, H, px } = s;
  const { canvas, g } = s.layer({ alpha: false });

  let fill = FILLS[1], root = room();
  const tex = offscreen(W * px, H * px);
  {
    const t = tex.getContext('2d');
    t.scale(px, px);
    paperGrain(t, W, H, { alpha: 0.07, seed: 12 });
  }

  function room(colour = FILLS[0]) { return { colour, split: null }; }

  // Splits are stored as fractions of their parent, so moving a line rescales everything inside it.
  function layout(n, x, y, w, h, leaves, segs, depth = 0) {
    n.rect = [x, y, w, h];
    if (!n.split) { leaves.push(n); return; }
    const { axis, at } = n.split;
    const thick = Math.max(4, LINE - depth * 0.7);
    if (axis === 'x') {
      const k = w * at;
      layout(n.a, x, y, k, h, leaves, segs, depth + 1);
      layout(n.b, x + k, y, w - k, h, leaves, segs, depth + 1);
      segs.push({ n, axis, x1: x + k, y1: y, x2: x + k, y2: y + h, thick });
    } else {
      const k = h * at;
      layout(n.a, x, y, w, k, leaves, segs, depth + 1);
      layout(n.b, x, y + k, w, h - k, leaves, segs, depth + 1);
      segs.push({ n, axis, x1: x, y1: y + k, x2: x + w, y2: y + k, thick });
    }
  }

  let leaves = [], segs = [];
  const relayout = () => {
    leaves = [];
    segs = [];
    layout(root, 0, 0, W, H, leaves, segs);
    cars.forEach((c) => { if (c.seg >= segs.length) c.seg = Math.floor(Math.random() * segs.length); });
  };

  const leafAt = (x, y) => leaves.find((n) => { const [a, b, w, h] = n.rect; return x >= a && x <= a + w && y >= b && y <= b + h; });
  const lineAt = (x, y) => segs.find((l) => (l.axis === 'x' ? Math.abs(x - l.x1) < 9 && y >= l.y1 && y <= l.y2 : Math.abs(y - l.y1) < 9 && x >= l.x1 && x <= l.x2));

  function splitRoom(n, axis, pos) {
    const [x, y, w, h] = n.rect;
    const at = axis === 'x' ? (pos - x) / w : (pos - y) / h;
    if (at < 0.06 || at > 0.94) return;
    n.split = { axis, at };
    n.a = room(n.colour);
    n.b = room(n.colour);
    relayout();
    sfx('tock');
  }

  const P = { down: false, x: 0, y: 0, cx: 0, cy: 0, line: null };

  s.pointer({
    down(p) {
      Object.assign(P, { down: true, x: p.x, y: p.y, cx: p.x, cy: p.y, line: lineAt(p.x, p.y) });
      pushUndo();
    },
    move(p) {
      P.cx = p.x;
      P.cy = p.y;
      if (P.line) {
        const n = P.line.n, [x, y, w, h] = n.rect;
        n.split.at = P.line.axis === 'x' ? clamp((p.x - x) / w, 0.05, 0.95) : clamp((p.y - y) / h, 0.05, 0.95);
        relayout();
        P.line = segs.find((l) => l.n === n);
      }
    },
    hover(p) { s.el.style.cursor = lineAt(p.x, p.y) ? 'move' : 'crosshair'; },
    up() {
      const dx = P.cx - P.x, dy = P.cy - P.y, moved = Math.hypot(dx, dy) > 12;
      P.down = false;
      if (P.line) { P.line = null; return; }
      const n = leafAt(P.x, P.y);
      if (!n) return;
      if (moved) splitRoom(n, Math.abs(dy) > Math.abs(dx) ? 'x' : 'y', Math.abs(dy) > Math.abs(dx) ? P.x : P.y);
      else { n.colour = n.colour === fill ? FILLS[0] : fill; sfx('pop'); }
    },
  });

  // Cars ride the black lines. Junctions are where they turn, and where the painting makes a sound.
  const cars = [];
  function spawnCars(n) {
    cars.length = 0;
    if (!segs.length) return;
    for (let i = 0; i < n; i++) cars.push({ seg: i % segs.length, t: Math.random(), dir: Math.random() < 0.5 ? 1 : -1, c: pick(['#d8312c', '#f3c613', '#1f3f9e', '#f1ece0']), speed: 90 + Math.random() * 80, trail: [] });
  }

  function endpoint(l, dir) { return dir > 0 ? [l.x2, l.y2] : [l.x1, l.y1]; }

  function junction(c, l) {
    const [ex, ey] = endpoint(l, c.dir);
    const near = [];
    segs.forEach((o, i) => {
      if (o === l) return;
      const on = o.axis === 'x' ? Math.abs(o.x1 - ex) < 2 && ey >= o.y1 - 2 && ey <= o.y2 + 2 : Math.abs(o.y1 - ey) < 2 && ex >= o.x1 - 2 && ex <= o.x2 + 2;
      if (on) near.push(i);
    });
    if (near.length) {
      const k = pick(near), o = segs[k];
      c.seg = k;
      c.t = o.axis === 'x' ? (ey - o.y1) / (o.y2 - o.y1) : (ex - o.x1) / (o.x2 - o.x1);
      c.dir = Math.random() < 0.5 ? 1 : -1;
    } else {
      c.dir *= -1;
      c.t = clamp(c.t, 0, 1);
    }
    if (sound) {
      const note = SCALE[Math.floor(clamp(1 - ey / H, 0, 0.999) * SCALE.length)];
      pluck(note, { dur: 0.32, vol: 0.05, type: 'square', pan: (ex / W) * 2 - 1 });
    }
  }

  let boogie = false, sound = true;
  function render(dt) {
    g.fillStyle = FILLS[0];
    g.fillRect(0, 0, W, H);
    for (const n of leaves) {
      const [x, y, w, h] = n.rect;
      g.fillStyle = n.colour;
      g.fillRect(x, y, w + 0.5, h + 0.5);
    }
    g.fillStyle = '#121212';
    for (const l of segs) {
      if (l.axis === 'x') g.fillRect(l.x1 - l.thick / 2, l.y1, l.thick, l.y2 - l.y1);
      else g.fillRect(l.x1, l.y1 - l.thick / 2, l.x2 - l.x1, l.thick);
    }
    if (boogie) {
      for (const c of cars) {
        const l = segs[c.seg];
        if (!l) continue;
        const len = Math.hypot(l.x2 - l.x1, l.y2 - l.y1) || 1;
        c.t += (c.dir * c.speed * dt) / len;
        const x = l.x1 + (l.x2 - l.x1) * c.t, y = l.y1 + (l.y2 - l.y1) * c.t;
        c.trail.unshift([x, y]);
        if (c.trail.length > 42) c.trail.pop();
        g.fillStyle = c.c;
        const q = l.thick;
        for (let i = 0; i < c.trail.length; i += 7) g.fillRect(c.trail[i][0] - q / 2, c.trail[i][1] - q / 2, q, q);
        if (c.t <= 0 || c.t >= 1) junction(c, l);
      }
    }
    if (P.down && !P.line) {
      const dx = P.cx - P.x, dy = P.cy - P.y, n = leafAt(P.x, P.y);
      if (Math.hypot(dx, dy) > 12 && n) {
        const [x, y, w, h] = n.rect;
        g.fillStyle = 'rgba(18,18,18,.42)';
        if (Math.abs(dy) > Math.abs(dx)) g.fillRect(P.x - LINE / 2, y, LINE, h);
        else g.fillRect(x, P.y - LINE / 2, w, LINE);
      }
    }
    g.save();
    g.setTransform(1, 0, 0, 1, 0, 0);
    g.drawImage(tex, 0, 0);
    g.restore();
  }

  ctx.loop(render);

  const clone = (n) => (n.split ? { colour: n.colour, split: { ...n.split }, a: clone(n.a), b: clone(n.b) } : { colour: n.colour, split: null });
  const hist = [];
  const pushUndo = () => { hist.push(clone(root)); if (hist.length > 30) hist.shift(); };
  ctx.undo = () => { const r = hist.pop(); if (r) { root = r; relayout(); } };
  ctx.clear = () => { pushUndo(); root = room(); relayout(); cars.length = 0; boogie = false; playBtn.textContent = 'Boogie'; playBtn.classList.remove('on'); };
  ctx.snapshot = () => canvas;

  function compose() {
    pushUndo();
    root = room();
    relayout();
    for (let i = 0; i < 9; i++) {
      const ranked = [...leaves].sort((a, b) => b.rect[2] * b.rect[3] - a.rect[2] * a.rect[3]);
      const big = ranked[Math.floor(Math.random() * Math.min(3, ranked.length))];
      const [x, y, w, h] = big.rect, axis = w > h ? 'x' : 'y';
      splitRoom(big, axis, axis === 'x' ? x + w * (0.25 + Math.random() * 0.5) : y + h * (0.25 + Math.random() * 0.5));
    }
    [...leaves].sort(() => Math.random() - 0.5).slice(0, 4).forEach((n, i) => { n.colour = FILLS[(i % 3) + 1]; });
  }

  ctx.ui.swatches(FILLS, fill, (c) => { fill = c; });
  ctx.ui.sep();
  const playBtn = ctx.ui.button('Boogie', () => {
    boogie = !boogie;
    if (boogie) spawnCars(Math.min(26, 8 + segs.length));
    playBtn.textContent = boogie ? 'Stop' : 'Boogie';
    playBtn.classList.toggle('on', boogie);
  }, 'hot');
  ctx.ui.toggle('Sound', sound, (v) => { sound = v; });
  ctx.ui.button('Compose for me', compose);
  relayout();
  compose();
  hist.length = 0;
  ctx.hint('Drag across a room to split it. Tap to fill. Drag a line to nudge it. Then press Boogie.');
}
