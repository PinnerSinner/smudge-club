// Wordsmear: a brush loaded with language. Letters are laid along the stroke, swelling as you slow down.
import { clamp, lerp, paperGrain } from '../kit.js';

const VERSE = 'the brush remembers what the hand forgets and the hand forgets what the eye forgave ';
const FACES = [['italic 400 %px Fraunces', 'Serif'], ['400 %px Anton', 'Poster'], ['600 %px Caveat', 'Hand'], ['500 %px "DM Mono"', 'Type'], ['400 %px VT323', 'Pixel']];
const INKS = ['#1b1a1f', '#c23b5a', '#1f4fd8', '#0f7a5a', '#b8741a', '#f6e9e3'];
const PAPERS = { Cream: '#f6efe3', Blush: '#f6e0da', Night: '#141320', Sage: '#dfe5d4' };

export default function mount(ctx) {
  const s = ctx.surface({ paper: true, maxPx: 2200 });
  const { W, H } = s;
  const { canvas, g } = s.layer({ alpha: false });
  const pushUndo = ctx.rasterUndo(canvas);

  let text = VERSE, face = FACES[0][0], ink = INKS[0], base = 34, gradient = false, paper = 'Cream', cursor = 0;
  const st = { x: 0, y: 0, carry: 0, last: 0, sz: 30 };

  function fillPaper() {
    g.fillStyle = PAPERS[paper];
    g.fillRect(0, 0, W, H);
    paperGrain(g, W, H, { alpha: paper === 'Night' ? 0.03 : 0.05, seed: 8 });
  }

  const nextChar = () => {
    const src = text.trim() ? text : VERSE;
    return src[cursor++ % src.length];
  };

  function advance(x, y, now) {
    const dx = x - st.x, dy = y - st.y, d = Math.hypot(dx, dy);
    if (d < 0.5) return;
    const dt = Math.max(1, now - st.last);
    st.last = now;
    // Slow hand, big letters. The size eases so words do not jitter.
    const target = clamp(base * (1.7 - (d / dt) * 0.55), base * 0.36, base * 2.1);
    st.sz = lerp(st.sz, target, 0.16);
    const a = Math.atan2(dy, dx);
    let walked = st.carry;
    const ux = dx / d, uy = dy / d;
    let px = st.x, py = st.y, left = d;
    for (;;) {
      const ch = pending();
      const need = g.measureText(ch).width + st.sz * 0.05;
      if (walked + left < need) { st.carry = walked + left; break; }
      const step = need - walked;
      px += ux * step;
      py += uy * step;
      left -= step;
      walked = 0;
      place(ch, px - ux * need * 0.5, py - uy * need * 0.5, a);
      held = null;
    }
    st.x = x;
    st.y = y;
  }

  let held = null;
  function pending() {
    if (!held) held = nextChar();
    g.font = face.replace('%', st.sz.toFixed(1));
    return held;
  }

  function place(ch, x, y, a) {
    g.save();
    g.translate(x, y);
    g.rotate(a);
    g.font = face.replace('%', st.sz.toFixed(1));
    g.fillStyle = gradient ? `hsl(${(cursor * 5) % 360},70%,${paper === 'Night' ? 70 : 42}%)` : ink;
    g.textAlign = 'center';
    g.textBaseline = 'middle';
    g.fillText(ch, 0, 0);
    g.restore();
  }

  s.pointer({
    down(p) {
      pushUndo();
      st.x = p.x;
      st.y = p.y;
      st.carry = 0;
      st.last = performance.now();
      st.sz = base;
    },
    move(p) { advance(p.x, p.y, performance.now()); },
  });

  ctx.clear = () => { pushUndo(); cursor = 0; fillPaper(); };
  ctx.snapshot = () => canvas;

  fillPaper();
  ctx.ui.text(VERSE.trim(), (v) => { text = v + ' '; cursor = 0; held = null; }, 'Type your verse');
  ctx.ui.sep();
  ctx.ui.swatches(INKS, ink, (c) => { ink = c; gradient = false; rainbow.classList.remove('on'); });
  const rainbow = ctx.ui.toggle('Spectrum', gradient, (v) => { gradient = v; });
  ctx.ui.sep();
  ctx.ui.seg(FACES.map(([f, l]) => [f, l]), face, (v) => { face = v; });
  ctx.ui.slider('Size', 14, 80, base, (v) => { base = v; });
  ctx.ui.seg(Object.keys(PAPERS), paper, (v) => { paper = v; pushUndo(); fillPaper(); });
  ctx.hint('Paint slowly to shout, quickly to whisper. Type your own words in the dock.');
}
