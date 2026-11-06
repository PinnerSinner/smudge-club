// All the paintings on the rack, plus the back of each canvas. Pure code, no images.
import { SITE } from './catalogue.js';
import { TAU, clamp, lerp, rng, noise2, offscreen, hexRgb, paperGrain } from './kit.js';

const S = 1000; // every cover is drawn in a 1000-unit square

// Marco's logo, stamped on the label on the back of every canvas.
let makerMark = null;
export function setMakerMark(image) { makerMark = image; }

function type(g, text, x, y, { font = '400 90px Fraunces', fill = '#111', align = 'left', spacing = 0, base = 'alphabetic' } = {}) {
  g.save();
  g.font = font;
  g.fillStyle = fill;
  g.textAlign = align;
  g.textBaseline = base;
  if ('letterSpacing' in g) g.letterSpacing = `${spacing}px`;
  g.fillText(text, x, y);
  g.restore();
}

const small = (g, r, c, x, y, align = 'left') => type(g, r, x, y, { font: '500 19px "DM Mono"', fill: c, align, spacing: 2 });

function fill(g, c) { g.fillStyle = c; g.fillRect(0, 0, S, S); }

function splat(g, r, x, y, rad, c) {
  g.fillStyle = c;
  g.beginPath(); g.arc(x, y, rad, 0, TAU); g.fill();
  const n = 5 + rad * 0.5;
  for (let i = 0; i < n; i++) {
    const a = r() * TAU, d = rad * (1 + r() * r() * 3.6), s = rad * 0.22 * r();
    g.beginPath(); g.arc(x + Math.cos(a) * d, y + Math.sin(a) * d, s, 0, TAU); g.fill();
  }
}

const ART = {
  'drip-feed'(g, r) {
    fill(g, '#f3eee3');
    const inks = ['#16130f', '#e8452d', '#1f4fd8', '#f2b705'];
    for (let k = 0; k < 16; k++) {
      const c = inks[k % 4];
      let x = r() * S, y = r() * S, a = r() * TAU;
      g.strokeStyle = c; g.fillStyle = c;
      for (let i = 0; i < 90; i++) {
        a += (r() - 0.5) * 0.9;
        const nx = x + Math.cos(a) * 26, ny = y + Math.sin(a) * 26;
        g.lineWidth = 1 + Math.pow(r(), 3) * 12; g.lineCap = 'round';
        g.beginPath(); g.moveTo(x, y); g.lineTo(nx, ny); g.stroke();
        if (r() < 0.14) splat(g, r, nx, ny, 3 + r() * 11, c);
        x = nx; y = ny;
        if (x < -60 || x > S + 60) a = Math.PI - a;
        if (y < -60 || y > S + 60) a = -a;
      }
    }
  },
  'golden-repair'(g, r) {
    const bg = g.createLinearGradient(0, 0, 0, S);
    bg.addColorStop(0, '#d9cfbb'); bg.addColorStop(1, '#b9ab90');
    fill(g, bg);
    const cx = 500, cy = 500, R = 390;
    g.save(); g.shadowColor = 'rgba(40,25,10,.55)'; g.shadowBlur = 70; g.shadowOffsetY = 40;
    g.fillStyle = '#1e1a1d'; g.beginPath(); g.arc(cx, cy, R, 0, TAU); g.fill(); g.restore();
    const gl = g.createRadialGradient(cx - 90, cy - 110, 20, cx, cy, R);
    gl.addColorStop(0, '#5b3a2c'); gl.addColorStop(0.55, '#2a1b1e'); gl.addColorStop(0.92, '#100d10'); gl.addColorStop(1, '#6a4a34');
    g.fillStyle = gl; g.beginPath(); g.arc(cx, cy, R, 0, TAU); g.fill();
    g.save(); g.beginPath(); g.arc(cx, cy, R, 0, TAU); g.clip();
    const gold = (x, y, a, n, w) => {
      g.beginPath(); g.moveTo(x, y);
      for (let i = 0; i < n; i++) {
        a += (r() - 0.5) * 0.95; x += Math.cos(a) * 36; y += Math.sin(a) * 36;
        g.lineTo(x, y);
        if (r() < 0.2 && w > 3) { g.stroke(); gold(x, y, a + (r() - 0.5) * 2, n - i - 2, w * 0.6); g.beginPath(); g.moveTo(x, y); }
      }
      const gg = g.createLinearGradient(cx - R, cy - R, cx + R, cy + R);
      gg.addColorStop(0, '#fff0a8'); gg.addColorStop(0.5, '#d9a226'); gg.addColorStop(1, '#fbe07a');
      g.strokeStyle = gg; g.lineWidth = w; g.lineJoin = 'round'; g.stroke();
    };
    for (let i = 0; i < 6; i++) { const a = (i / 6) * TAU + r(); gold(cx + Math.cos(a) * 26, cy + Math.sin(a) * 26, a, 12, 7); }
    g.restore();
  },
  sediment(g, r) {
    const n = noise2(9), bands = ['#e9d9b5', '#c7562e', '#efb54a', '#2e6f8e', '#f2e7d0', '#7a3e2c', '#e58a3a', '#264653'];
    const c = offscreen(250, 250), x = c.getContext('2d'), im = x.createImageData(250, 250);
    for (let j = 0; j < 250; j++) for (let i = 0; i < 250; i++) {
      const y = j + (n(i * 0.022, 4) - 0.5) * 110 + (n(i * 0.09, 9) - 0.5) * 22;
      const b = bands[clamp(Math.floor((y + 40) / 41), 0, 7)];
      const [R, G, B] = hexRgb(b), v = (r() - 0.5) * 44, o = (j * 250 + i) * 4;
      im.data[o] = R + v; im.data[o + 1] = G + v; im.data[o + 2] = B + v; im.data[o + 3] = 255;
    }
    x.putImageData(im, 0, 0);
    g.imageSmoothingEnabled = false; g.drawImage(c, 0, 0, S, S); g.imageSmoothingEnabled = true;
  },
  endpaper(g) {
    const n = noise2(5), w = 400, c = offscreen(w, w), x = c.getContext('2d'), im = x.createImageData(w, w);
    const pal = [[244, 236, 220], [28, 66, 92], [184, 74, 48], [224, 170, 70], [58, 122, 140], [20, 32, 48]];
    for (let j = 0; j < w; j++) for (let i = 0; i < w; i++) {
      let u = i / w, v = j / w;
      const comb = Math.sin(v * 44) * 0.03;
      let wx = u + (n(u * 3, v * 3) - 0.5) * 0.5 + comb, wy = v + (n(u * 3 + 7, v * 3 + 3) - 0.5) * 0.5;
      wx += (n(wx * 9, wy * 9) - 0.5) * 0.09;
      const k = Math.floor((wx * 6.5 + Math.sin(wy * 7) * 1.1 + 8) * 2.4), p = pal[((k % 6) + 6) % 6], o = (j * w + i) * 4;
      im.data[o] = p[0]; im.data[o + 1] = p[1]; im.data[o + 2] = p[2]; im.data[o + 3] = 255;
    }
    x.putImageData(im, 0, 0);
    g.drawImage(c, 0, 0, S, S);
  },
  'steamed-up'(g, r) {
    const bg = g.createLinearGradient(0, 0, 0, S);
    bg.addColorStop(0, '#0a1626'); bg.addColorStop(0.6, '#16314f'); bg.addColorStop(1, '#2a1f3a');
    fill(g, bg);
    const lights = () => {
      for (let i = 0; i < 90; i++) {
        const c = ['#ffb347', '#ff5e62', '#7ad7f0', '#fff3c4'][i % 4], x = r() * S, y = 300 + r() * 620, rad = 12 + r() * 54;
        g.globalAlpha = 0.25 + r() * 0.5; g.fillStyle = c;
        g.beginPath(); g.arc(x, y, rad, 0, TAU); g.fill();
      }
      g.globalAlpha = 1;
    };
    g.save(); lights(); g.restore();
    g.fillStyle = 'rgba(210,225,240,.62)'; g.fillRect(0, 0, S, S);
    const m = offscreen(S, S), x = m.getContext('2d');
    x.font = '600 300px Caveat'; x.textAlign = 'center'; x.lineJoin = 'round';
    x.strokeStyle = '#000'; x.lineWidth = 16; x.strokeText('steamed', 490, 430); x.strokeText('up', 500, 690);
    x.globalCompositeOperation = 'source-in';
    const b = x.createLinearGradient(0, 0, 0, S);
    b.addColorStop(0, '#071222'); b.addColorStop(1, '#23375a');
    x.fillStyle = b; x.fillRect(0, 0, S, S);
    g.drawImage(m, 0, 0);
    g.strokeStyle = 'rgba(7,18,34,.7)'; g.lineCap = 'round';
    for (let i = 0; i < 9; i++) {
      const px = 120 + r() * 760, py = 500 + r() * 200;
      g.lineWidth = 3 + r() * 6; g.beginPath(); g.moveTo(px, py); g.lineTo(px + (r() - 0.5) * 18, py + 120 + r() * 240); g.stroke();
    }
  },
  'hall-of-mirrors'(g, r) {
    fill(g, '#07050f');
    g.save(); g.translate(500, 500); g.globalCompositeOperation = 'lighter';
    const N = 12;
    for (let k = 0; k < 7; k++) {
      const hue = 250 + k * 28, rad = 70 + k * 56;
      for (let i = 0; i < N; i++) {
        g.save(); g.rotate((i / N) * TAU);
        for (const m of [1, -1]) {
          g.save(); g.scale(1, m);
          g.strokeStyle = `hsla(${hue},95%,62%,.5)`; g.lineWidth = 3 + k * 0.5;
          g.shadowColor = `hsl(${hue},100%,60%)`; g.shadowBlur = 24;
          g.beginPath(); g.moveTo(rad * 0.3, 0);
          g.bezierCurveTo(rad * 0.7, rad * 0.5, rad * 1.1, rad * 0.25, rad * 1.25, 0);
          g.stroke(); g.restore();
        }
        g.restore();
      }
    }
    g.restore();
  },
  'wallpaper-group'(g) {
    fill(g, '#123c30');
    const s = 125, h = s * Math.sqrt(3) / 2;
    for (let j = -1; j < 12; j++) for (let i = -1; i < 10; i++) {
      const x = i * s + (j % 2 ? s / 2 : 0), y = j * h;
      for (let k = 0; k < 3; k++) {
        g.save(); g.translate(x, y); g.rotate((k / 3) * TAU);
        g.fillStyle = ['#f0e4c2', '#38b58a', '#e8a33d'][k];
        g.beginPath(); g.moveTo(0, 0); g.bezierCurveTo(s * 0.35, -s * 0.1, s * 0.3, s * 0.42, 0, s * 0.56);
        g.bezierCurveTo(-s * 0.14, s * 0.34, -s * 0.04, s * 0.14, 0, 0); g.fill(); g.restore();
      }
    }
  },
  wordsmear(g) {
    fill(g, '#f6e9e3');
    const line = 'the brush remembers what the hand forgets and the hand forgets what the eye forgave ';
    let t = 0.25, i = 0;
    g.fillStyle = '#c23b5a'; g.textAlign = 'center'; g.textBaseline = 'middle';
    while (t < 31) {
      const rad = 8 + t * 15, a = t, x = 500 + Math.cos(a) * rad, y = 500 + Math.sin(a) * rad, sz = 12 + t * 1.75;
      g.save(); g.translate(x, y); g.rotate(a + Math.PI / 2);
      g.font = `italic 400 ${sz}px Fraunces`; g.fillText(line[i % line.length], 0, 0); g.restore();
      t += (sz * 0.56) / rad; i++;
    }
  },
  'right-angles'(g) {
    fill(g, '#f1ece0');
    const R = (x, y, w, h, c) => { g.fillStyle = c; g.fillRect(x, y, w, h); };
    R(0, 0, 380, 300, '#d8312c'); R(740, 0, 260, 180, '#f3c613'); R(380, 560, 360, 440, '#1f3f9e'); R(0, 800, 180, 200, '#f3c613'); R(860, 730, 140, 270, '#d8312c');
    g.fillStyle = '#111';
    [[0, 296, S, 16], [370, 0, 16, S], [734, 0, 16, S], [0, 552, S, 16], [0, 796, 380, 16], [734, 172, 266, 16], [176, 796, 12, 204], [734, 724, 266, 12], [856, 724, 12, 276]].forEach((a) => g.fillRect(...a));
    const cars = ['#d8312c', '#f3c613', '#1f3f9e', '#f1ece0'];
    for (let i = 0; i < 26; i++) { g.fillStyle = cars[i % 4]; g.fillRect(i * 40 + 4, 298, 14, 12); g.fillRect(372, 40 + i * 37, 12, 14); }
  },
  'dont-lift'(g) {
    fill(g, '#efe7d6');
    g.strokeStyle = '#191714'; g.lineWidth = 5; g.lineCap = 'round'; g.lineJoin = 'round';
    // one unbroken line: a face in profile, wandering in from the left margin and out to the right
    g.beginPath();
    const P = [[60, 700], [170, 690], [230, 640], [190, 540], [300, 420], [330, 300], [460, 190], [640, 230], [730, 350], [700, 430], [770, 520], [710, 540], [730, 590], [690, 610], [700, 660], [610, 700], [520, 660], [470, 720], [540, 780], [420, 800], [380, 650], [470, 520], [560, 480], [470, 450], [400, 500], [450, 400], [570, 390], [610, 440], [540, 450], [620, 510], [820, 640], [940, 660]];
    g.moveTo(...P[0]);
    for (let i = 1; i < P.length - 1; i++) {
      g.quadraticCurveTo(P[i][0], P[i][1], (P[i][0] + P[i + 1][0]) / 2, (P[i][1] + P[i + 1][1]) / 2);
    }
    g.lineTo(...P[P.length - 1]); g.stroke();
  },
  'twin-dials'(g) {
    fill(g, '#14161a');
    g.fillStyle = '#04120b'; g.fillRect(70, 70, 860, 660);
    g.save(); g.beginPath(); g.rect(70, 70, 860, 660); g.clip();
    g.strokeStyle = '#3cf08f'; g.lineWidth = 4; g.shadowColor = '#35d07e'; g.shadowBlur = 22; g.lineJoin = 'round';
    g.beginPath();
    let x = 120, y = 660; g.moveTo(x, y);
    const steps = [[0, -480], [120, 0], [0, 390], [120, 0], [0, -300], [120, 0], [0, 210], [120, 0], [0, -120], [90, 0], [0, 60], [90, 0], [0, -340]];
    steps.forEach(([a, b]) => { x += a; y += b; g.lineTo(x, y); });
    g.stroke(); g.restore();
    for (const kx of [160, 840]) {
      const k = g.createRadialGradient(kx - 18, 836, 6, kx, 852, 76);
      k.addColorStop(0, '#f4f4f2'); k.addColorStop(0.7, '#9b9ea3'); k.addColorStop(1, '#55585e');
      g.fillStyle = k; g.beginPath(); g.arc(kx, 852, 76, 0, TAU); g.fill();
      g.strokeStyle = '#2a2c30'; g.lineWidth = 6; g.beginPath(); g.moveTo(kx, 852); g.lineTo(kx + 30, 800); g.stroke();
    }
  },
  raked(g) {
    fill(g, '#d9d0bd');
    const ring = (cx, cy, r0, n) => {
      for (let i = 0; i < n; i++) {
        const rad = r0 + i * 17;
        g.strokeStyle = 'rgba(120,104,78,.55)'; g.lineWidth = 4; g.beginPath(); g.arc(cx, cy, rad, 0, TAU); g.stroke();
        g.strokeStyle = 'rgba(255,250,235,.7)'; g.lineWidth = 3; g.beginPath(); g.arc(cx + 2, cy + 3, rad, 0, TAU); g.stroke();
      }
    };
    for (let i = 0; i < 62; i++) {
      const y = i * 17;
      g.strokeStyle = 'rgba(120,104,78,.5)'; g.lineWidth = 4; g.beginPath(); g.moveTo(0, y); g.lineTo(S, y); g.stroke();
      g.strokeStyle = 'rgba(255,250,235,.7)'; g.lineWidth = 3; g.beginPath(); g.moveTo(0, y + 4); g.lineTo(S, y + 4); g.stroke();
    }
    for (const [cx, cy, a, b] of [[350, 420, 96, 200], [700, 640, 62, 130]]) {
      g.fillStyle = '#d9d0bd'; g.beginPath(); g.arc(cx, cy, b, 0, TAU); g.fill();
      ring(cx, cy, a + 14, Math.floor((b - a) / 17));
      g.save(); g.shadowColor = 'rgba(40,30,20,.6)'; g.shadowBlur = 30; g.shadowOffsetX = 24; g.shadowOffsetY = 18;
      const st = g.createRadialGradient(cx - a * 0.3, cy - a * 0.4, 4, cx, cy, a);
      st.addColorStop(0, '#77706a'); st.addColorStop(1, '#2e2b2a');
      g.fillStyle = st; g.beginPath(); g.ellipse(cx, cy, a, a * 0.8, 0.4, 0, TAU); g.fill(); g.restore();
    }
  },
  squint(g, r) {
    fill(g, '#f5efdf');
    const pts = [];
    for (let i = 0; i < 9000 && pts.length < 3000; i++) {
      const x = r() * S, y = r() * S;
      if (pts.some((p) => (p[0] - x) ** 2 + (p[1] - y) ** 2 < 280)) continue;
      pts.push([x, y]);
    }
    for (const [x, y] of pts) {
      const d = Math.hypot(x - 500, y - 380), sky = y < 560;
      let c = sky ? (r() < 0.5 ? '#ef8a2e' : '#e0507a') : (r() < 0.55 ? '#1f5fb0' : '#e8a43a');
      if (d < 150) c = r() < 0.8 ? '#fbd63f' : '#fff4cf';
      else if (sky && d < 280 && r() < 0.5) c = '#f5b83d';
      else if (sky && y < 200 && r() < 0.5) c = '#7b52c7';
      g.fillStyle = c; g.beginPath(); g.arc(x, y, 7, 0, TAU); g.fill();
    }
  },
  'scratch-track'(g, r) {
    const f = g.createLinearGradient(0, 0, S, S);
    ['#ff3d81', '#ffb13d', '#fff14d', '#3dff9e', '#3dc8ff', '#7a5cff', '#ff3dd0'].forEach((c, i) => f.addColorStop(i / 6, c));
    fill(g, f);
    const m = offscreen(S, S), x = m.getContext('2d');
    x.fillStyle = '#0a0a0c'; x.fillRect(0, 0, S, S);
    x.globalCompositeOperation = 'destination-out'; x.lineCap = 'round'; x.lineJoin = 'round';
    for (let i = 0; i < 80; i++) {
      const rad = 80 + i * 6.4, a0 = r() * TAU, a1 = a0 + 0.3 + r() * 2.2;
      x.lineWidth = 2 + r() * 3; x.beginPath(); x.arc(500, 500, rad, a0, a1); x.stroke();
    }
    g.drawImage(m, 0, 0);
  },
  'highly-strung'(g) {
    fill(g, '#121527');
    const N = 180, c = [500, 500], R = 430;
    const P = (i) => [c[0] + Math.cos((i / N) * TAU - Math.PI / 2) * R, c[1] + Math.sin((i / N) * TAU - Math.PI / 2) * R];
    g.lineWidth = 1.2;
    for (let i = 0; i < N; i++) {
      const [ax, ay] = P(i), [bx, by] = P(i * 2);
      g.strokeStyle = `hsla(${335 + (i / N) * 55},85%,68%,.62)`;
      g.beginPath(); g.moveTo(ax, ay); g.lineTo(bx, by); g.stroke();
    }
    g.fillStyle = '#f4dfc8';
    for (let i = 0; i < N; i += 2) { const [x, y] = P(i); g.beginPath(); g.arc(x, y, 2.8, 0, TAU); g.fill(); }
  },
  'low-res'(g, r) {
    const n = 40, p = S / n;
    const sky = ['#1a1040', '#3b1a6e', '#7a2a8c', '#d0446e', '#f08a4b', '#fbd06b'];
    for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) {
      const t = (y / 26) * 5, a = Math.floor(t), d = (x + y) % 2 && t - a > 0.5 ? 1 : 0;
      g.fillStyle = sky[Math.min(5, a + d)]; g.fillRect(x * p, y * p, p + 1, p + 1);
    }
    for (let i = 0; i < 40; i++) { g.fillStyle = '#fff4d0'; g.fillRect(Math.floor(r() * n) * p, Math.floor(r() * 12) * p, p, p); }
    g.fillStyle = '#ffe680';
    for (let y = -6; y <= 6; y++) for (let x = -6; x <= 6; x++) if (x * x + y * y < 38) g.fillRect((20 + x) * p, (20 + y) * p, p, p);
    for (let x = 0; x < n; x++) {
      const h = 26 + Math.round(Math.sin(x * 0.4) * 2 + Math.sin(x * 0.13) * 3);
      for (let y = h; y < n; y++) { g.fillStyle = y === h ? '#2fbf71' : (x + y) % 3 ? '#14433f' : '#1b5c50'; g.fillRect(x * p, y * p, p + 1, p + 1); }
    }
  },
  'word-wheel'(g) {
    fill(g, '#160a1c');
    g.save(); g.translate(500, 500);
    const words = 'round and round the word goes round';
    g.textBaseline = 'middle';
    for (let k = 0; k < 8; k++) {
      const rad = 62 + k * 50, n = 8 + k * 4, sz = 15 + k * 3.6;
      for (let i = 0; i < n; i++) {
        g.save(); g.rotate((i / n) * TAU + k * 0.2); g.translate(rad, 0);
        g.font = `600 ${sz}px Fraunces`;
        g.fillStyle = `hsl(${290 + k * 11},72%,${74 - k * 3}%)`;
        g.fillText(words.split(' ')[k % 7], 0, 0); g.restore();
      }
    }
    g.restore();
  },
  'spin-cycle'(g, r) {
    fill(g, '#fdfaf5');
    const C = [500, 500], inks = ['#e0308a', '#ffb000', '#00a6d6', '#4b2bc9', '#18b369'];
    for (let k = 0; k < 15; k++) {
      const c = inks[k % 5], a0 = r() * TAU, r0 = 30 + r() * 120;
      for (let i = 0; i < 40; i++) {
        const a = a0 + (r() - 0.5) * 0.5;
        g.strokeStyle = c; g.lineCap = 'round';
        g.beginPath();
        let rad = r0;
        for (let t = 0; t < 34; t++) {
          const th = a + (rad / 500) * 1.5;
          const x = C[0] + Math.cos(th) * rad, y = C[1] + Math.sin(th) * rad;
          t ? g.lineTo(x, y) : g.moveTo(x, y);
          rad += 7 + r() * 14;
        }
        g.lineWidth = 1 + r() * r() * 9; g.stroke();
      }
    }
    g.fillStyle = '#fdfaf5'; g.beginPath(); g.arc(500, 500, 34, 0, TAU); g.fill();
  },
  'wet-on-wet'(g, r) {
    fill(g, '#eee7d8');
    g.save(); g.filter = 'blur(10px)';
    for (let i = 0; i < 260; i++) {
      const a = -1.1 + (i / 260) * 5.3, rad = 300 + Math.sin(i * 0.21) * 12;
      g.fillStyle = `rgba(24,24,28,${0.1 + 0.26 * (1 - i / 260)})`;
      g.beginPath(); g.arc(500 + Math.cos(a) * rad, 430 + Math.sin(a) * rad, 42 - i * 0.12 + r() * 16, 0, TAU); g.fill();
    }
    g.restore();
    g.save(); g.filter = 'blur(2px)'; g.lineCap = 'round';
    for (let i = 0; i < 210; i++) {
      const a = -1.1 + (i / 260) * 5.3, rad = 300 + (r() - 0.5) * 50;
      g.strokeStyle = `rgba(16,16,20,${0.55 * (1 - i / 240)})`; g.lineWidth = 1 + r() * 7;
      g.beginPath(); g.moveTo(500 + Math.cos(a) * rad, 430 + Math.sin(a) * rad);
      g.lineTo(500 + Math.cos(a + 0.06) * (rad + 8), 430 + Math.sin(a + 0.06) * (rad + 8)); g.stroke();
    }
    g.restore();
    g.fillStyle = '#b3261e'; g.fillRect(868, 830, 62, 62);
  },
  'fold-here'(g, r) {
    fill(g, '#f2eee4');
    const m = offscreen(S, S), x = m.getContext('2d');
    x.fillStyle = '#121216';
    const blob = (px, py, s) => { x.beginPath(); x.ellipse(px, py, s, s * (0.7 + r() * 0.6), r() * 3, 0, TAU); x.fill(); };
    for (let i = 0; i < 46; i++) {
      const y = 110 + r() * 640, w = 300 * Math.sin(((y - 90) / 680) * Math.PI);
      blob(500 - r() * w, y, 14 + r() * 80);
    }
    x.fillRect(476, 170, 24, 560);
    for (let i = 0; i < 260; i++) blob(500 - r() * 400, 90 + r() * 720, r() * r() * 11);
    x.globalCompositeOperation = 'destination-out';
    for (let i = 0; i < 10; i++) blob(380 + r() * 100, 200 + r() * 480, 10 + r() * 24);
    g.drawImage(m, 0, 0, 500, S, 0, 0, 500, S);
    g.save(); g.translate(S, 0); g.scale(-1, 1); g.drawImage(m, 0, 0, 500, S, 0, 0, 500, S); g.restore();
    g.setLineDash([10, 10]); g.strokeStyle = 'rgba(18,18,22,.35)'; g.lineWidth = 2; g.beginPath(); g.moveTo(500, 0); g.lineTo(500, 70); g.stroke(); g.setLineDash([]);
  },
  leadlight(g, r) {
    fill(g, '#111');
    const pts = Array.from({ length: 70 }, () => [r() * S, r() * S]);
    const glass = ['#1f6fc4', '#d43d3d', '#e8b92e', '#2a9d6a', '#7a3db8', '#3fb3d8', '#e8772e'];
    const w = 250, c = offscreen(w, w), x = c.getContext('2d'), im = x.createImageData(w, w);
    for (let j = 0; j < w; j++) for (let i = 0; i < w; i++) {
      let a = 1e9, b = 1e9, ai = 0;
      for (let k = 0; k < pts.length; k++) {
        const d = Math.hypot(pts[k][0] / 4 - i, pts[k][1] / 4 - j);
        if (d < a) { b = a; a = d; ai = k; } else if (d < b) b = d;
      }
      const o = (j * w + i) * 4, lead = b - a < 1.5, [R, G, B] = hexRgb(glass[ai % 7]), v = 1 - (a / 34) * 0.45;
      im.data[o] = lead ? 18 : R * v + 34; im.data[o + 1] = lead ? 18 : G * v + 34; im.data[o + 2] = lead ? 20 : B * v + 34; im.data[o + 3] = 255;
    }
    x.putImageData(im, 0, 0);
    g.drawImage(c, 0, 0, S, S);
  },
  'long-exposure'(g, r) {
    fill(g, '#050406');
    g.save(); g.globalCompositeOperation = 'lighter'; g.lineCap = 'round'; g.lineJoin = 'round';
    g.font = '600 390px Caveat'; g.textAlign = 'center';
    for (let pass = 0; pass < 3; pass++) {
      g.strokeStyle = ['rgba(255,120,30,.22)', 'rgba(255,190,90,.5)', 'rgba(255,250,225,.95)'][pass];
      g.lineWidth = [26, 10, 3][pass];
      g.shadowColor = '#ff8a2e'; g.shadowBlur = [40, 22, 6][pass];
      g.strokeText('long', 500, 410);
      g.strokeText('exp.', 500, 730);
    }
    g.shadowBlur = 0;
    for (let i = 0; i < 500; i++) {
      const a = r() * TAU, d = r() * 480, x = 500 + Math.cos(a) * d, y = 480 + Math.sin(a) * d;
      g.strokeStyle = `rgba(255,${130 + r() * 110},60,${r() * 0.7})`; g.lineWidth = 1;
      g.beginPath(); g.moveTo(x, y); g.lineTo(x + Math.cos(a) * r() * 42, y + Math.sin(a) * r() * 42 + 10); g.stroke();
    }
    g.restore();
  },
  'slow-growth'(g) {
    const n = noise2(21), w = 500, c = offscreen(w, w), x = c.getContext('2d'), im = x.createImageData(w, w);
    for (let j = 0; j < w; j++) for (let i = 0; i < w; i++) {
      const wx = i + (n(i * 0.012, j * 0.012) - 0.5) * 90, wy = j + (n(i * 0.012 + 9, j * 0.012 + 5) - 0.5) * 90;
      const f = Math.sin(wx * 0.17 + 3 * n(wx * 0.03, wy * 0.03) * 6) + Math.sin(wy * 0.17 + 3 * n(wy * 0.03, wx * 0.03) * 6);
      const t = clamp(f * 3 + 0.5), o = (j * w + i) * 4;
      im.data[o] = lerp(6, 170, t); im.data[o + 1] = lerp(40, 244, t); im.data[o + 2] = lerp(52, 226, t); im.data[o + 3] = 255;
    }
    x.putImageData(im, 0, 0);
    g.drawImage(c, 0, 0, S, S);
  },
};

function grainOver(g) { paperGrain(g, S, S, { alpha: 0.05, seed: 7 }); }

export function drawCover(release, c, pressing = null) {
  const g = c.getContext('2d');
  g.setTransform(c.width / S, 0, 0, c.height / S, 0, 0);
  g.save();
  if (pressing) {
    const k = Math.max(S / pressing.width, S / pressing.height);
    fill(g, '#111');
    g.drawImage(pressing, (S - pressing.width * k) / 2, (S - pressing.height * k) / 2, pressing.width * k, pressing.height * k);
  } else {
    ART[release.id](g, rng(release.index * 977 + 13));
    grainOver(g);
  }
  g.restore();
}

// The back of the canvas: raw linen, a wooden stretcher, staples, and a gallery label with pencilled notes.
export function drawBack(release, c) {
  const g = c.getContext('2d');
  g.setTransform(c.width / S, 0, 0, c.height / S, 0, 0);
  const r = rng(release.index + 91), ink = '#2a2420';

  fill(g, '#c9b995');
  for (let i = 0; i < 5200; i++) {
    g.fillStyle = `rgba(${r() < 0.5 ? '255,245,220' : '70,52,30'},${r() * 0.09})`;
    if (r() < 0.5) g.fillRect(r() * S, r() * S, 40 + r() * 90, 1);
    else g.fillRect(r() * S, r() * S, 1, 40 + r() * 90);
  }

  const bar = 92;
  const wood = (x, y, w, h, along) => {
    const l = along === 'x' ? g.createLinearGradient(0, y, 0, y + h) : g.createLinearGradient(x, 0, x + w, 0);
    l.addColorStop(0, '#d2a874'); l.addColorStop(0.5, '#c0935c'); l.addColorStop(1, '#a87a48');
    g.fillStyle = l;
    g.fillRect(x, y, w, h);
    g.strokeStyle = 'rgba(80,50,22,.2)';
    g.lineWidth = 1;
    for (let i = 0; i < 26; i++) {
      g.beginPath();
      if (along === 'x') { const q = y + r() * h; g.moveTo(x, q); g.bezierCurveTo(x + w * 0.3, q + r() * 7 - 3, x + w * 0.7, q + r() * 7 - 3, x + w, q); } else { const q = x + r() * w; g.moveTo(q, y); g.bezierCurveTo(q + r() * 7 - 3, y + h * 0.3, q + r() * 7 - 3, y + h * 0.7, q, y + h); }
      g.stroke();
    }
    g.strokeStyle = 'rgba(40,24,10,.45)';
    g.lineWidth = 2;
    g.strokeRect(x, y, w, h);
  };
  wood(0, 0, S, bar, 'x');
  wood(0, S - bar, S, bar, 'x');
  wood(0, 0, bar, S, 'y');
  wood(S - bar, 0, bar, S, 'y');
  wood(bar, S / 2 - 38, S - bar * 2, 76, 'x');

  // Staples round the turned-over edge, a little wonky as they always are.
  g.strokeStyle = '#7d7f84';
  g.lineWidth = 3;
  for (let i = 0; i < 18; i++) {
    const p = 70 + i * 50, j = () => r() * 8 - 4;
    for (const [x, y, a] of [[p, 20, 0], [p, S - 20, 0], [20, p, 1.57], [S - 20, p, 1.57]]) {
      g.save(); g.translate(x + j(), y + j()); g.rotate(a + (r() - 0.5) * 0.2);
      g.beginPath(); g.moveTo(-13, 0); g.lineTo(13, 0); g.stroke();
      g.restore();
    }
  }

  // Gallery label, pasted on slightly crooked.
  g.save();
  g.translate(500, 500);
  g.rotate(-0.018);
  g.shadowColor = 'rgba(40,24,10,.45)'; g.shadowBlur = 14; g.shadowOffsetY = 5;
  g.fillStyle = '#f5efe1';
  g.fillRect(-335, -320, 670, 640);
  g.shadowColor = 'transparent';
  type(g, release.title, -295, -240, { font: '400 62px Fraunces', fill: ink, spacing: -1 });
  type(g, release.genre, -295, -196, { font: 'italic 400 30px Fraunces', fill: 'rgba(42,36,32,.7)' });
  g.fillStyle = release.accent;
  g.fillRect(-295, -172, 590, 3);
  release.tracks.forEach((t, i) => {
    const y = -114 + i * 62;
    type(g, `${i + 1}.`, -295, y, { font: '600 42px Caveat', fill: release.accent });
    type(g, t, -252, y, { font: '600 44px Caveat', fill: ink });
  });
  if (makerMark) {
    g.save();
    g.translate(238, -246);
    g.rotate(0.09);
    g.drawImage(makerMark, -54, -55, 108, 109);
    g.restore();
  }
  small(g, release.cat, 'rgba(42,36,32,.7)', -295, 286);
  small(g, `${SITE.name.toUpperCase()}: ${SITE.tagline.toUpperCase()}`, 'rgba(42,36,32,.7)', 295, 286, 'right');
  g.restore();
}

// The colours actually in a painting, for the blobs on its palette: the most vivid one, then whatever is furthest from those picked so far.
export function paintsFrom(canvas, count = 6) {
  const n = 14, o = offscreen(n, n), x = o.getContext('2d', { willReadFrequently: true });
  x.drawImage(canvas, 0, 0, n, n);
  const d = x.getImageData(0, 0, n, n).data, px = [];
  for (let i = 0; i < d.length; i += 4) px.push([d[i], d[i + 1], d[i + 2]]);
  const vivid = (p) => Math.max(...p) - Math.min(...p);
  const picked = [px.reduce((a, b) => (vivid(b) > vivid(a) ? b : a))];
  while (picked.length < count) {
    let best = px[0], bd = -1;
    for (const p of px) {
      const m = Math.min(...picked.map((q) => (p[0] - q[0]) ** 2 + (p[1] - q[1]) ** 2 + (p[2] - q[2]) ** 2));
      if (m > bd) { bd = m; best = p; }
    }
    picked.push(best);
  }
  return picked.map(([r, g, b]) => (r << 16) | (g << 8) | b);
}
