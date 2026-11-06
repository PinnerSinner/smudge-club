// Highly Strung: hammer pins, wind thread, then pluck. Every string rings at a pitch set by its length.
import { TAU, clamp, dist, pluck } from '../kit.js';

const THREADS = ['#f4dfc8', '#e65f87', '#f2b705', '#35c9b0', '#6c9bd2', '#c8a2ff'];
const BOARDS = { Midnight: '#121527', Walnut: '#2c1c14', Felt: '#123026', Chalk: '#ece6d9' };
const PENTA = [0, 2, 4, 7, 9];

export default function mount(ctx) {
  const s = ctx.surface({ bleed: true, maxPx: 1800 });
  const { W, H } = s;
  const { canvas, g } = s.layer({ alpha: false });

  let colour = THREADS[1], board = 'Midnight', weight = 1.2;
  let pins = [], threads = [], drag = null, ghost = null;
  const R = Math.min(W, H) * 0.39, cx = W / 2, cy = H / 2 + 6;

  // Long strings ring low, short strings high, snapped to a pentatonic scale so any strum sounds fine.
  function pitch(len) {
    const semis = Math.round(36 - Math.log2(clamp(len, 20, 1400) / 20) * 7.5);
    const oct = Math.floor(semis / 12), deg = PENTA[Math.min(4, Math.floor((((semis % 12) + 12) % 12) / 2.4))];
    return 110 * Math.pow(2, oct + deg / 12 - 1);
  }

  const nearestPin = (x, y, r = 16) => {
    let best = null, bd = r;
    for (const p of pins) { const d = dist(x, y, p.x, p.y); if (d < bd) { bd = d; best = p; } }
    return best;
  };

  function addThread(a, b) {
    if (a === b || threads.some((t) => (t.a === a && t.b === b) || (t.a === b && t.b === a))) return;
    const t = { a, b, colour, weight, amp: 0, len: dist(a.x, a.y, b.x, b.y) };
    threads.push(t);
    twang(t, 5);
  }

  function twang(t, amp) {
    t.amp = Math.max(t.amp, amp);
    const mid = (t.a.x + t.b.x) / 2;
    pluck(pitch(t.len), { dur: 1.3, vol: 0.09, pan: clamp((mid / W) * 2 - 1, -1, 1) });
  }

  function crosses(ax, ay, bx, by, cx2, cy2, dx, dy) {
    const d = (bx - ax) * (dy - cy2) - (by - ay) * (dx - cx2);
    if (!d) return false;
    const u = ((cx2 - ax) * (dy - cy2) - (cy2 - ay) * (dx - cx2)) / d;
    const v = ((cx2 - ax) * (by - ay) - (cy2 - ay) * (bx - ax)) / d;
    return u >= 0 && u <= 1 && v >= 0 && v <= 1;
  }

  let strum = null;
  s.pointer({
    down(p) {
      const pin = nearestPin(p.x, p.y);
      if (pin) { drag = pin; ghost = p; return; }
      strum = { x: p.x, y: p.y, sx: p.x, sy: p.y, moved: false, n: 0 };
    },
    move(p) {
      if (drag) {
        ghost = p;
        // Passing over another pin winds the thread round it and carries on.
        const over = nearestPin(p.x, p.y, 13);
        if (over && over !== drag) { addThread(drag, over); drag = over; }
        return;
      }
      if (!strum) return;
      if (dist(p.x, p.y, strum.sx, strum.sy) > 6) strum.moved = true;
      for (const t of threads) {
        if (t.hot) continue;
        if (crosses(strum.x, strum.y, p.x, p.y, t.a.x, t.a.y, t.b.x, t.b.y)) {
          t.hot = 0.09;
          // Dense string art would be a wall of noise, so a strum only voices the first few.
          if (strum.n++ < 14) twang(t, 9);
          else t.amp = Math.max(t.amp, 7);
        }
      }
      strum.x = p.x;
      strum.y = p.y;
    },
    up(p) {
      if (drag) {
        const over = nearestPin(p.x, p.y, 16);
        if (over && over !== drag) addThread(drag, over);
        drag = null;
        ghost = null;
      } else if (strum && !strum.moved) {
        pins.push({ x: p.x, y: p.y });
        pluck(1400, { dur: 0.05, vol: 0.05, type: 'square' });
      }
      strum = null;
    },
  });

  ctx.loop((dt, t) => {
    const light = board === 'Chalk';
    g.fillStyle = BOARDS[board];
    g.fillRect(0, 0, W, H);

    g.lineCap = 'round';
    for (const th of threads) {
      if (th.hot) th.hot = Math.max(0, th.hot - dt);
      th.amp *= Math.exp(-dt * 3.6);
      if (th.amp < 0.05) th.amp = 0;
      const mx = (th.a.x + th.b.x) / 2, my = (th.a.y + th.b.y) / 2;
      const nx = -(th.b.y - th.a.y) / (th.len || 1), ny = (th.b.x - th.a.x) / (th.len || 1);
      const o = th.amp * Math.sin(t * (2200 / Math.max(60, th.len) + 16));
      g.strokeStyle = th.colour;
      g.lineWidth = th.weight + (th.amp > 1 ? 0.5 : 0);
      g.globalAlpha = 0.74;
      g.beginPath();
      g.moveTo(th.a.x, th.a.y);
      if (th.amp) g.quadraticCurveTo(mx + nx * o * 2, my + ny * o * 2, th.b.x, th.b.y);
      else g.lineTo(th.b.x, th.b.y);
      g.stroke();
    }
    g.globalAlpha = 1;

    if (drag && ghost) {
      g.strokeStyle = colour;
      g.lineWidth = weight;
      g.setLineDash([5, 5]);
      g.beginPath();
      g.moveTo(drag.x, drag.y);
      g.lineTo(ghost.x, ghost.y);
      g.stroke();
      g.setLineDash([]);
    }

    for (const p of pins) {
      g.fillStyle = 'rgba(0,0,0,.34)';
      g.beginPath();
      g.arc(p.x + 1.4, p.y + 1.8, 2.8, 0, TAU);
      g.fill();
      g.fillStyle = light ? '#4b4640' : '#d9cdbd';
      g.beginPath();
      g.arc(p.x, p.y, 2.5, 0, TAU);
      g.fill();
    }
  });

  function timesTable(n, k) {
    pins = [];
    threads = [];
    for (let i = 0; i < n; i++) {
      const a = (i / n) * TAU - Math.PI / 2;
      pins.push({ x: cx + Math.cos(a) * R, y: cy + Math.sin(a) * R });
    }
    for (let i = 0; i < n; i++) {
      const a = pins[i], b = pins[Math.round(i * k) % n];
      if (a === b) continue;
      threads.push({ a, b, colour, weight: 0.9, amp: 0, len: dist(a.x, a.y, b.x, b.y) });
    }
  }

  let pinCount = 180, mult = 2;
  ctx.undo = () => {
    if (threads.length) threads.pop();
    else pins.pop();
  };
  ctx.clear = () => { pins = []; threads = []; };
  ctx.snapshot = () => canvas;

  ctx.ui.swatches(THREADS, colour, (c) => { colour = c; });
  ctx.ui.sep();
  ctx.ui.seg(Object.keys(BOARDS), board, (v) => { board = v; });
  ctx.ui.slider('Gauge', 0.6, 3, weight, (v) => { weight = v; }, 0.1);
  ctx.ui.sep();
  ctx.ui.slider('Pins', 24, 300, pinCount, (v) => { pinCount = v; timesTable(pinCount, mult); });
  ctx.ui.slider('Times', 2, 40, mult, (v) => { mult = v; timesTable(pinCount, mult); }, 0.1);
  ctx.ui.button('Ring', () => {
    const ring = [];
    for (let i = 0; i < 24; i++) {
      const a = (i / 24) * TAU - Math.PI / 2;
      ring.push({ x: cx + Math.cos(a) * R, y: cy + Math.sin(a) * R });
    }
    pins.push(...ring);
  });

  timesTable(pinCount, mult);
  ctx.hint('Tap to pin, drag pin to pin to wind thread, and swipe across strings to play them.');
}
