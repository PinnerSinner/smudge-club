// Don't Lift: one line, one go. Lift the pen and the drawing is finished, then it replays your hesitation.
import { sfx } from '../sound.js';
import { TAU, clamp, lerp, paperGrain } from '../kit.js';

const INK = { Endless: Infinity, 'Two metres': 7500, 'One metre': 3700, 'A short pen': 1500 };
const PX_PER_CM = 37.8;

export default function mount(ctx) {
  const s = ctx.surface({ paper: true, maxPx: 2200 });
  const { W, H } = s;
  const { canvas, g } = s.layer({ alpha: false });
  const penLayer = s.layer({ hit: false });

  let state = 'ready', pts = [], total = 0, budget = INK.Endless, replay = null, base = 2.4, ink = '#191714';

  function sheet() {
    g.fillStyle = '#efe7d6';
    g.fillRect(0, 0, W, H);
    paperGrain(g, W, H, { alpha: 0.05, seed: 6 });
  }

  // Where the hand slows, ink pools. That is what makes the line read as a confession.
  const widthAt = (speed) => base * (0.7 + 1.6 * clamp(1 - speed / 1.3));

  function segment(a, b, c) {
    // Midpoint quadratic: smooth at any speed, and each piece joins the next exactly.
    const m1x = (a.x + b.x) / 2, m1y = (a.y + b.y) / 2, m2x = (b.x + c.x) / 2, m2y = (b.y + c.y) / 2;
    g.strokeStyle = ink;
    g.lineCap = 'round';
    g.lineWidth = b.w;
    g.beginPath();
    g.moveTo(m1x, m1y);
    g.quadraticCurveTo(b.x, b.y, m2x, m2y);
    g.stroke();
  }

  function finish() {
    if (state !== 'drawing') return;
    state = 'done';
    sfx('tock');
    const secs = pts.length ? (pts[pts.length - 1].t - pts[0].t) / 1000 : 0;
    stats.textContent = `${(total / PX_PER_CM / 100).toFixed(2)} m of line in ${secs.toFixed(1)} s`;
    ctx.toast('That is your line. It cannot be changed.');
    setTimeout(startReplay, 700);
  }

  s.pointer({
    down(p) {
      if (state !== 'ready') { ctx.toast('You lifted. Take a new sheet.'); return; }
      state = 'drawing';
      pts = [{ x: p.x, y: p.y, t: performance.now(), w: base }];
      total = 0;
    },
    move(p) {
      if (state !== 'drawing') return;
      const last = pts[pts.length - 1], now = performance.now();
      const d = Math.hypot(p.x - last.x, p.y - last.y);
      if (d < 1.2) return;
      total += d;
      const left = budget - total;
      const speed = d / Math.max(1, now - last.t);
      // The nib starves as the ink runs out.
      const starve = Number.isFinite(budget) ? clamp(left / 260) : 1;
      const w = lerp(last.w, widthAt(speed), 0.3) * Math.max(0.15, starve);
      pts.push({ x: p.x, y: p.y, t: now, w });
      if (pts.length >= 3) segment(pts[pts.length - 3], pts[pts.length - 2], pts[pts.length - 1]);
      stats.textContent = Number.isFinite(budget) ? `${Math.max(0, left / PX_PER_CM / 100).toFixed(2)} m of ink left` : `${(total / PX_PER_CM / 100).toFixed(2)} m and counting`;
      if (left <= 0) finish();
    },
    up() { finish(); },
  });

  function startReplay() {
    if (pts.length < 3) return;
    replay = { i: 2, start: performance.now(), t0: pts[0].t };
    sheet();
  }

  ctx.loop(() => {
    const pen = penLayer.g;
    pen.clearRect(0, 0, W, H);
    if (!replay) return;
    const span = pts[pts.length - 1].t - replay.t0;
    // Replays run in real time, except that very long drawings are compressed to about 20 seconds.
    const rate = Math.max(1, span / 20000);
    const clock = (performance.now() - replay.start) * rate + replay.t0;
    while (replay.i < pts.length && pts[replay.i].t <= clock) {
      segment(pts[replay.i - 2], pts[replay.i - 1], pts[replay.i]);
      replay.i++;
    }
    const at = pts[Math.min(replay.i, pts.length - 1)];
    pen.fillStyle = '#d8312c';
    pen.beginPath();
    pen.arc(at.x, at.y, 4, 0, TAU);
    pen.fill();
    if (replay.i >= pts.length) replay = null;
  });

  function fresh() {
    if (state !== 'ready') sfx('paper');
    state = 'ready';
    pts = [];
    total = 0;
    replay = null;
    sheet();
    stats.textContent = 'Touch down when ready';
  }

  ctx.clear = fresh;
  ctx.snapshot = () => canvas;
  ctx.ui.seg(Object.keys(INK), 'Endless', (v) => { budget = INK[v]; });
  ctx.ui.sep();
  ctx.ui.slider('Nib', 1, 7, base, (v) => { base = v; }, 0.2);
  ctx.ui.seg([['#191714', 'Black'], ['#1f3f9e', 'Blue'], ['#a3261e', 'Red']], ink, (v) => { ink = v; });
  ctx.ui.button('Replay', () => { if (state === 'done') startReplay(); });
  ctx.ui.button('New sheet', fresh, 'hot');
  const stats = ctx.ui.readout('');
  fresh();
  ctx.hint('One line. It ends for good the moment you let go.');
}
