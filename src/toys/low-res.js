// Low Res: a sixteen-colour pixel editor that is secretly a flipbook. Four frames, onion skins, and it walks.
import { sfx } from '../sound.js';
import { offscreen } from '../kit.js';

const PALETTE = ['#00000000', '#14111e', '#3a3560', '#6f6aa8', '#c6c3e6', '#f7f4ec', '#d83a4a', '#f08a4b', '#fbd06b', '#6fce5a', '#1f8a70', '#2d8fd5', '#7ad7f0', '#b14fc0', '#ef8fb1', '#7a4a2c'];
const FRAMES = 4;

export default function mount(ctx) {
  const s = ctx.surface({ aspect: 1, bg: '#2a2740', maxPx: 1400 });
  const { W, H } = s;
  const { canvas, g } = s.layer();
  g.imageSmoothingEnabled = false;

  let N = 32, frames = [], current = 0, colour = 1, tool = 'pencil', mirror = false, onion = true, playing = false, fps = 6, playT = 0, showGrid = true;

  const blank = () => new Uint8Array(N * N);
  const reset = () => { frames = Array.from({ length: FRAMES }, blank); };

  // Sample character: a small original blob called Pip, bouncing on the spot.
  function pip() {
    const put = (f, x, y, c) => { if (x >= 0 && y >= 0 && x < N && y < N) f[y * N + x] = c; };
    const squash = [[9, 8, 0], [10, 7, -1], [9, 8, 0], [8, 9, 1]];
    const lift = [0, -3, -5, -1];
    frames.forEach((f, i) => {
      const [rx, ry, eye] = [squash[i][1] + 1, squash[i][0], squash[i][2]];
      const cx = 16, cy = 19 + lift[i];
      for (let y = -ry; y <= ry; y++) for (let x = -rx; x <= rx; x++) {
        const d = (x * x) / (rx * rx) + (y * y) / (ry * ry);
        if (d <= 0.93) put(f, cx + x, cy + y, d > 0.68 ? 1 : y < -ry * 0.4 && x < 0 ? 8 : 7);
      }
      [-3, 3].forEach((e) => { put(f, cx + e, cy - 2 + eye, 1); put(f, cx + e, cy - 3 + eye, 1); put(f, cx + e + 1, cy - 3 + eye, 5); });
      for (let x = -1; x <= 1; x++) put(f, cx + x, cy + 2 + eye, 1);
      const w = 11 - Math.abs(lift[i]);
      for (let x = -w; x <= w; x++) put(f, 16 + x, 29, 2);
    });
  }

  const cell = () => W / N;
  const at = (p) => [Math.floor((p.x / W) * N), Math.floor((p.y / H) * N)];
  const inb = (x, y) => x >= 0 && y >= 0 && x < N && y < N;

  function set(x, y, c) {
    const f = frames[current];
    if (!inb(x, y)) return;
    f[y * N + x] = c;
    if (mirror) f[y * N + (N - 1 - x)] = c;
  }

  function paint(x, y) {
    if (tool === 'pencil') set(x, y, colour);
    if (tool === 'erase') set(x, y, 0);
    if (tool === 'dither' && (x + y) % 2 === 0) set(x, y, colour);
  }

  function line(x0, y0, x1, y1) {
    const dx = Math.abs(x1 - x0), dy = -Math.abs(y1 - y0), sx = x0 < x1 ? 1 : -1, sy = y0 < y1 ? 1 : -1;
    let e = dx + dy;
    for (;;) {
      paint(x0, y0);
      if (x0 === x1 && y0 === y1) break;
      const e2 = 2 * e;
      if (e2 >= dy) { e += dy; x0 += sx; }
      if (e2 <= dx) { e += dx; y0 += sy; }
    }
  }

  function flood(x, y) {
    const f = frames[current], from = f[y * N + x];
    if (from === colour) return;
    const st = [[x, y]];
    while (st.length) {
      const [a, b] = st.pop();
      if (!inb(a, b) || f[b * N + a] !== from) continue;
      f[b * N + a] = colour;
      st.push([a + 1, b], [a - 1, b], [a, b + 1], [a, b - 1]);
    }
  }

  let last = null;
  s.pointer({
    down(p) {
      pushUndo();
      const [x, y] = at(p);
      if (!inb(x, y)) return;
      if (tool === 'fill') { flood(x, y); last = null; } else if (tool === 'pick') {
        colour = frames[current][y * N + x] || colour;
        sw.set(PALETTE[colour]);
        last = null;
      } else { paint(x, y); last = [x, y]; sfx('blip'); }
      thumbs();
    },
    move(p) {
      if (!last) return;
      const [x, y] = at(p);
      line(last[0], last[1], x, y);
      last = [x, y];
      thumbs();
    },
    up() { last = null; },
  });

  function drawFrame(target, f, size, alpha = 1) {
    const c = size / N;
    target.globalAlpha = alpha;
    for (let y = 0; y < N; y++) for (let x = 0; x < N; x++) {
      const v = f[y * N + x];
      if (v) { target.fillStyle = PALETTE[v]; target.fillRect(x * c, y * c, c + 0.5, c + 0.5); }
    }
    target.globalAlpha = 1;
  }

  function checker(target, size) {
    const c = size / N;
    target.fillStyle = '#2a2740';
    target.fillRect(0, 0, size, size);
    target.fillStyle = '#322e4c';
    for (let y = 0; y < N; y++) for (let x = y % 2; x < N; x += 2) target.fillRect(x * c, y * c, c + 0.5, c + 0.5);
  }

  ctx.loop((dt) => {
    if (playing) {
      playT += dt * fps;
      const next = Math.floor(playT) % FRAMES;
      if (next !== current) { current = next; highlight(); }
    }
    checker(g, W);
    if (onion && !playing) drawFrame(g, frames[(current + FRAMES - 1) % FRAMES], W, 0.22);
    drawFrame(g, frames[current], W);
    if (showGrid && !playing) {
      g.strokeStyle = 'rgba(255,255,255,.05)';
      g.lineWidth = 1;
      g.beginPath();
      for (let i = 1; i < N; i++) { const q = i * cell(); g.moveTo(q, 0); g.lineTo(q, H); g.moveTo(0, q); g.lineTo(W, q); }
      g.stroke();
    }
  });

  const hist = [];
  const pushUndo = () => { hist.push({ i: current, f: frames[current].slice() }); if (hist.length > 40) hist.shift(); };
  ctx.undo = () => { const h = hist.pop(); if (h) { frames[h.i].set(h.f); thumbs(); } };
  ctx.clear = () => { pushUndo(); frames[current].fill(0); thumbs(); };
  ctx.snapshot = () => {
    const c = offscreen(N * 16, N * 16), x = c.getContext('2d');
    checker(x, c.width);
    drawFrame(x, frames[current], c.width);
    return c;
  };

  ctx.dock.classList.add('dense');
  const sw = ctx.ui.swatches(PALETTE.slice(1), PALETTE[colour], (c) => { colour = PALETTE.indexOf(c); });
  ctx.ui.sep();
  ctx.ui.seg([['pencil', 'Pen'], ['fill', 'Fill'], ['dither', 'Dither'], ['erase', 'Rub'], ['pick', 'Pick']], tool, (v) => { tool = v; });
  ctx.ui.toggle('Mirror', mirror, (v) => { mirror = v; });
  ctx.ui.sep();

  // Frame strip: small live thumbnails in the dock.
  const strip = document.createElement('div');
  strip.className = 'sw';
  ctx.dock.appendChild(strip);
  const thumbCanvases = Array.from({ length: FRAMES }, (_, i) => {
    const b = document.createElement('button');
    b.style.cssText = 'width:34px;height:34px;border-radius:6px;padding:0;overflow:hidden;background:#2a2740';
    b.setAttribute('aria-label', `Frame ${i + 1}`);
    const c = offscreen(64, 64);
    c.style.cssText = 'width:100%;height:100%;display:block;image-rendering:pixelated';
    b.appendChild(c);
    b.onclick = () => { current = i; playT = i; highlight(); };
    strip.appendChild(b);
    return { b, c };
  });
  function highlight() { thumbCanvases.forEach(({ b }, i) => b.classList.toggle('on', i === current)); }
  function thumbs() {
    thumbCanvases.forEach(({ c }, i) => {
      const x = c.getContext('2d');
      x.clearRect(0, 0, 64, 64);
      drawFrame(x, frames[i], 64);
    });
  }

  ctx.ui.toggle('Onion', onion, (v) => { onion = v; });
  const play = ctx.ui.button('Play', () => {
    playing = !playing;
    play.textContent = playing ? 'Stop' : 'Play';
    play.classList.toggle('on', playing);
  }, 'hot');
  ctx.ui.slider('Speed', 2, 14, fps, (v) => { fps = v; });
  ctx.ui.seg([[16, '16'], [32, '32'], [48, '48']], N, (v) => { N = v; reset(); thumbs(); });

  reset();
  pip();
  thumbs();
  highlight();
  ctx.hint('Meet Pip. Press Play, then draw your own over four frames with the onion skin on.');
}
