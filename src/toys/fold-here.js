// Fold Here: dab ink on one half, fold, press, open. A wet mirror image with feathered edges appears.
import { sfx } from '../sound.js';
import { TAU, clamp, hexRgb, noise2, offscreen, paperGrain, pick, smooth } from '../kit.js';

const INKS = ['#111116', '#2b2f7a', '#6d1a24', '#0f5e4e', '#7a3db8', '#c7562e', '#b83a6a', '#1f7a9a', '#b8741a', '#d92b1f', '#2f8a4a', '#e0308a', '#5a4a3a', '#4a5a7a'];
const VERDICTS = [
  'A moth, filing its taxes.',
  'Two bears agreeing to disagree.',
  'Your landlord, seen from below.',
  'A pelvis with ambitions.',
  'The exact shape of last Tuesday.',
  'A very small dragon on a very long lunch.',
  'Two chefs fighting over one soup.',
  'Something your mother said in 1994.',
  'A butterfly that has seen some things.',
  'Beetle. Definitely a beetle. Moving on.',
  'A rug, plotting.',
  'Twin accountants at a seance.',
];

export default function mount(ctx) {
  const s = ctx.surface({ aspect: 1.36, maxPx: 1600 });
  const { W, H, px } = s;
  const view = s.layer({ alpha: false });
  const ink = s.buffer();
  const g = view.g;
  const pushUndo = ctx.rasterUndo(ink.canvas);

  let colour = INKS[0], size = 26, phase = 'open', t = 0, verdict = '', last = null;
  const MID = W / 2;

  const sheet = offscreen(W * px, H * px);
  {
    const p = sheet.getContext('2d');
    p.scale(px, px);
    p.fillStyle = '#f2eee4';
    p.fillRect(0, 0, W, H);
    paperGrain(p, W, H, { alpha: 0.05, seed: 3 });
  }

  function dab(x, y, r) {
    const c = ink.g;
    c.fillStyle = colour;
    c.beginPath();
    c.arc(x, y, r, 0, TAU);
    c.fill();
    // Spit from the brush.
    const n = Math.random() < 0.35 ? 3 : 0;
    for (let i = 0; i < n; i++) {
      const a = Math.random() * TAU, d = r * (1.2 + Math.random() * 2.2);
      c.beginPath();
      c.arc(x + Math.cos(a) * d, y + Math.sin(a) * d, Math.random() * r * 0.2, 0, TAU);
      c.fill();
    }
  }

  s.pointer({
    down(p) { if (phase !== 'open') return; pushUndo(); last = p; dab(p.x, p.y, size); ctx.dismissTip(); },
    move(p) {
      if (!last) return;
      const d = Math.hypot(p.x - last.x, p.y - last.y), n = Math.ceil(d / (size * 0.3));
      for (let i = 1; i <= n; i++) dab(last.x + ((p.x - last.x) * i) / n, last.y + ((p.y - last.y) * i) / n, size * (0.72 + Math.random() * 0.5));
      last = p;
    },
    up() { last = null; },
  });

  // The press: ink is copied across the fold, then blurred and re-thresholded against noise so that
  // the two wet layers merge and their edges feather out like real blotted ink.
  function press() {
    const w = ink.canvas.width, h = ink.canvas.height;
    const m = offscreen(w, h), x = m.getContext('2d');
    x.drawImage(ink.canvas, 0, 0);
    x.save();
    x.translate(w, 0);
    x.scale(-1, 1);
    x.drawImage(ink.canvas, 0, 0);
    x.restore();
    const b = offscreen(w, h), y = b.getContext('2d');
    y.filter = `blur(${2.6 * px}px)`;
    y.drawImage(m, 0, 0);
    y.filter = 'none';
    const src = y.getImageData(0, 0, w, h), sharp = x.getImageData(0, 0, w, h), d = src.data;
    const n = noise2(Math.floor(Math.random() * 999) + 1);
    const [r0, g0, b0] = hexRgb(colour);
    for (let j = 0; j < h; j++) for (let i = 0; i < w; i++) {
      const o = (j * w + i) * 4, a = d[o + 3] / 255;
      if (a === 0) continue;
      // Mirror the noise too, so the print stays symmetrical.
      const u = Math.min(i, w - 1 - i);
      const fray = (n(u * 0.05 / px, j * 0.05 / px) - 0.5) * 0.5 + (n(u * 0.2 / px, j * 0.2 / px) - 0.5) * 0.22;
      const al = smooth(0.42, 0.58, a + fray);
      const has = sharp.data[o + 3] > 8;
      d[o] = has ? sharp.data[o] : r0;
      d[o + 1] = has ? sharp.data[o + 1] : g0;
      d[o + 2] = has ? sharp.data[o + 2] : b0;
      d[o + 3] = al * 255;
    }
    y.putImageData(src, 0, 0);
    ink.g.save();
    ink.g.setTransform(1, 0, 0, 1, 0, 0);
    ink.g.clearRect(0, 0, w, h);
    ink.g.drawImage(b, 0, 0);
    ink.g.restore();
  }

  function fold() {
    if (phase !== 'open') return;
    pushUndo();
    phase = 'closing';
    t = 0;
    sfx('paper');
    verdict = '';
    notes.textContent = '';
  }

  // The right half swings over the crease: scaleX from 1 through 0 to -1, with shading as it turns.
  function drawSwing(q) {
    const a = q * Math.PI, c = Math.cos(a);
    g.drawImage(sheet, 0, 0, W * px / 2, H * px, 0, 0, MID, H);
    g.drawImage(ink.canvas, 0, 0, ink.canvas.width / 2, ink.canvas.height, 0, 0, MID, H);
    g.save();
    g.translate(MID, 0);
    g.scale(c, 1);
    if (c > 0) {
      g.drawImage(sheet, W * px / 2, 0, W * px / 2, H * px, 0, 0, MID, H);
      g.drawImage(ink.canvas, ink.canvas.width / 2, 0, ink.canvas.width / 2, ink.canvas.height, 0, 0, MID, H);
    } else {
      g.fillStyle = '#e4dfd2';
      g.fillRect(0, 0, MID, H);
    }
    g.fillStyle = `rgba(30,24,16,${Math.sin(a) * 0.28})`;
    g.fillRect(0, 0, MID, H);
    g.restore();
  }

  ctx.loop((dt) => {
    g.fillStyle = '#1b191e';
    g.fillRect(0, 0, W, H);
    if (phase === 'open') {
      g.save();
      g.setTransform(1, 0, 0, 1, 0, 0);
      g.drawImage(sheet, 0, 0);
      g.drawImage(ink.canvas, 0, 0);
      g.restore();
    } else {
      t += dt;
      if (phase === 'closing') {
        const q = clamp(t / 0.75);
        drawSwing(q * q * (3 - 2 * q));
        if (q >= 1) { phase = 'pressing'; t = 0; sfx('thud'); }
      } else if (phase === 'pressing') {
        g.fillStyle = '#e4dfd2';
        g.fillRect(0, 0, MID, H);
        // A hand-shaped shadow rolls down the closed sheet.
        const y = clamp(t / 0.9) * H;
        const roll = g.createLinearGradient(0, y - 90, 0, y + 30);
        roll.addColorStop(0, 'rgba(30,24,16,0)');
        roll.addColorStop(0.8, 'rgba(30,24,16,.32)');
        roll.addColorStop(1, 'rgba(30,24,16,0)');
        g.fillStyle = roll;
        g.fillRect(0, 0, MID, H);
        if (t >= 0.9) { press(); phase = 'opening'; t = 0; sfx('paper'); }
      } else {
        const q = clamp(t / 0.75);
        drawSwing(1 - q * q * (3 - 2 * q));
        if (q >= 1) {
          phase = 'open';
          verdict = pick(VERDICTS);
          notes.textContent = `The analyst notes: ${verdict}`;
        }
      }
    }
    // The crease.
    g.strokeStyle = 'rgba(40,30,20,.16)';
    g.lineWidth = 1;
    g.beginPath();
    g.moveTo(MID, 0);
    g.lineTo(MID, H);
    g.stroke();
  });

  ctx.clear = () => {
    pushUndo();
    ink.g.save();
    ink.g.setTransform(1, 0, 0, 1, 0, 0);
    ink.g.clearRect(0, 0, ink.canvas.width, ink.canvas.height);
    ink.g.restore();
    notes.textContent = '';
  };
  ctx.snapshot = () => view.canvas;

  ctx.ui.swatches(INKS, colour, (c) => { colour = c; });
  ctx.ui.sep();
  ctx.ui.slider('Brush', 6, 60, size, (v) => { size = v; });
  ctx.ui.button('Fold and press', fold, 'hot');
  const notes = ctx.ui.readout('');
  ctx.hint('Dab ink on the left half, then Fold and press. Paint more and fold again to build it up.');
}
