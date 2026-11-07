// Twin Dials: an instrument, not a toy. Two aluminium knobs drive one stubborn line across a screen.
import { sfx } from '../sound.js';
import { TAU, clamp, dist, offscreen, pluck } from '../kit.js';

const SCREENS = {
  Phosphor: { bg: '#04120b', line: '#3cf08f', glow: 'rgba(60,240,143,.5)', fade: 0.012 },
  Amber: { bg: '#140b02', line: '#ffb84a', glow: 'rgba(255,184,74,.5)', fade: 0.012 },
  Silver: { bg: '#b9bcc0', line: '#2b2d31', glow: null, fade: 0 },
  Paper: { bg: '#efe7d6', line: '#1b1a1f', glow: null, fade: 0 },
  Ice: { bg: '#03101a', line: '#6fd8ff', glow: 'rgba(111,216,255,.5)', fade: 0.012 },
  Rose: { bg: '#16040c', line: '#ff6fa8', glow: 'rgba(255,111,168,.5)', fade: 0.012 },
  Violet: { bg: '#0c0618', line: '#b48aff', glow: 'rgba(180,138,255,.5)', fade: 0.012 },
  Blueprint: { bg: '#123a7a', line: '#eaf2ff', glow: null, fade: 0 },
};

export default function mount(ctx) {
  const s = ctx.surface({ bleed: true, maxPx: 1800 });
  const { W, H, px } = s;
  const { canvas, g } = s.layer({ alpha: false });

  // Screen and knob geometry adapts to the window it was opened in.
  const pad = Math.min(W, H) * 0.05, top = 72, knobR = clamp(Math.min(W, H) * 0.075, 34, 62);
  const sw = W - pad * 2, sh = H - top - knobR * 2 - 74;
  const scr = { x: pad, y: top, w: sw, h: Math.max(160, sh) };
  const ky = scr.y + scr.h + knobR + 14;
  const knobs = [{ x: pad + knobR + 10, y: ky, a: 0, axis: 'x' }, { x: W - pad - knobR - 10, y: ky, a: 0, axis: 'y' }];

  let theme = 'Phosphor', pen = { x: scr.w / 2, y: scr.h / 2 }, weight = 2, clicks = true, persist = true;
  let shake = 0, sweep = null, clickAcc = 0;

  const trail = offscreen(scr.w * px, scr.h * px);
  const tg = trail.getContext('2d');
  tg.scale(px, px);
  tg.lineCap = 'round';
  tg.lineJoin = 'round';

  function moveTo(nx, ny) {
    nx = clamp(nx, 2, scr.w - 2);
    ny = clamp(ny, 2, scr.h - 2);
    if (nx === pen.x && ny === pen.y) return;
    const t = SCREENS[theme];
    tg.strokeStyle = t.line;
    tg.lineWidth = weight;
    if (t.glow) { tg.shadowColor = t.glow; tg.shadowBlur = 8; } else tg.shadowBlur = 0;
    tg.beginPath();
    tg.moveTo(pen.x, pen.y);
    tg.lineTo(nx, ny);
    tg.stroke();
    pen.x = nx;
    pen.y = ny;
  }

  function turn(k, delta) {
    k.a += delta;
    const d = delta * 62;
    if (k.axis === 'x') moveTo(pen.x + d, pen.y);
    else moveTo(pen.x, pen.y - d);
    clickAcc += Math.abs(delta);
    if (clicks && clickAcc > 0.22) {
      clickAcc = 0;
      pluck(k.axis === 'x' ? 1800 : 1500, { dur: 0.02, vol: 0.012, type: 'square' });
    }
  }

  function shakeClean(amount) {
    shake = Math.min(1, shake + amount);
    tg.save();
    tg.setTransform(1, 0, 0, 1, 0, 0);
    tg.globalCompositeOperation = 'destination-out';
    tg.fillStyle = `rgba(0,0,0,${0.08 + amount * 0.5})`;
    tg.fillRect(0, 0, trail.width, trail.height);
    tg.restore();
  }

  let grab = null, prev = null;
  s.pointer({
    down(p) {
      sweep = null;
      const k = knobs.find((n) => dist(p.x, p.y, n.x, n.y) < knobR * 1.35);
      if (k) grab = { k, ang: Math.atan2(p.y - k.y, p.x - k.x) };
      else grab = { shaker: true };
      prev = p;
    },
    move(p) {
      if (grab?.k) {
        const k = grab.k, a = Math.atan2(p.y - k.y, p.x - k.x);
        let d = a - grab.ang;
        if (d > Math.PI) d -= TAU;
        if (d < -Math.PI) d += TAU;
        grab.ang = a;
        turn(k, d);
      } else if (grab?.shaker && prev) {
        // Grab the casing and shake: fast reversals wipe the screen.
        const speed = Math.hypot(p.x - prev.x, p.y - prev.y);
        if (speed > 12) shakeClean(0.14);
      }
      prev = p;
    },
    hover(p) { s.el.style.cursor = knobs.some((n) => dist(p.x, p.y, n.x, n.y) < knobR * 1.35) ? 'grab' : 'default'; },
    up() { grab = null; prev = null; },
  });

  ctx.on(s.el, 'wheel', (e) => {
    e.preventDefault();
    const r = s.el.getBoundingClientRect(), x = ((e.clientX - r.left) / r.width) * W;
    turn(knobs[x < W / 2 ? 0 : 1], clamp(e.deltaY, -100, 100) * 0.0024);
  }, { passive: false });

  const held = new Set();
  ctx.on(window, 'keydown', (e) => {
    if (e.key.startsWith('Arrow')) { e.preventDefault(); held.add(e.key); ctx.dismissTip(); }
  });
  ctx.on(window, 'keyup', (e) => held.delete(e.key));

  function brushed(x, y, w, h) {
    const m = g.createLinearGradient(x, y, x, y + h);
    m.addColorStop(0, '#2c2d31');
    m.addColorStop(0.5, '#222327');
    m.addColorStop(1, '#17181b');
    g.fillStyle = m;
    g.fillRect(x, y, w, h);
  }

  function drawKnob(k) {
    const R = knobR;
    g.save();
    g.translate(k.x, k.y);
    g.shadowColor = 'rgba(0,0,0,.6)';
    g.shadowBlur = 18;
    g.shadowOffsetY = 8;
    g.fillStyle = '#101114';
    g.beginPath();
    g.arc(0, 0, R * 1.08, 0, TAU);
    g.fill();
    g.shadowColor = 'transparent';
    // Knurled rim.
    g.save();
    g.rotate(k.a);
    g.fillStyle = '#5a5c61';
    for (let i = 0; i < 44; i++) {
      g.rotate(TAU / 44);
      g.fillRect(R * 0.93, -1.3, R * 0.13, 2.6);
    }
    g.restore();
    // Spun aluminium cap: a conic sweep gives the fixed highlight that stays still while the knob turns.
    const cap = g.createConicGradient(0.6, 0, 0);
    ['#e8e9eb', '#8d9096', '#f4f5f6', '#7f8288', '#e2e3e6', '#8a8d92', '#e8e9eb'].forEach((c, i) => cap.addColorStop(i / 6, c));
    g.fillStyle = cap;
    g.beginPath();
    g.arc(0, 0, R * 0.9, 0, TAU);
    g.fill();
    g.rotate(k.a);
    g.fillStyle = '#d8312c';
    g.fillRect(-1.8, -R * 0.84, 3.6, R * 0.34);
    g.restore();
  }

  ctx.loop((dt, t) => {
    if (sweep) {
      sweep.t += dt * sweep.speed;
      const x = scr.w / 2 + Math.sin(sweep.t * sweep.fx + sweep.ph) * scr.w * 0.42;
      const y = scr.h / 2 + Math.sin(sweep.t * sweep.fy) * scr.h * 0.42;
      const dx = x - pen.x, dy = y - pen.y;
      knobs[0].a += dx / 62;
      knobs[1].a -= dy / 62;
      moveTo(x, y);
    }
    const speed = 150 * dt / 62;
    if (held.has('ArrowLeft')) turn(knobs[0], -speed);
    if (held.has('ArrowRight')) turn(knobs[0], speed);
    if (held.has('ArrowUp')) turn(knobs[1], speed);
    if (held.has('ArrowDown')) turn(knobs[1], -speed);

    const th = SCREENS[theme];
    // Phosphor decays unless persistence is held on.
    if (th.fade && !persist) {
      tg.save();
      tg.setTransform(1, 0, 0, 1, 0, 0);
      tg.globalCompositeOperation = 'destination-out';
      tg.fillStyle = `rgba(0,0,0,${th.fade})`;
      tg.fillRect(0, 0, trail.width, trail.height);
      tg.restore();
    }

    shake = Math.max(0, shake - dt * 2.5);
    const ox = Math.sin(t * 60) * shake * 14, oy = Math.cos(t * 52) * shake * 9;

    g.save();
    g.translate(ox, oy);
    brushed(-20, -20, W + 40, H + 40);

    // Screen with bezel, glass, scanlines.
    g.fillStyle = '#0b0c0e';
    g.beginPath();
    g.roundRect(scr.x - 10, scr.y - 10, scr.w + 20, scr.h + 20, 14);
    g.fill();
    g.save();
    g.beginPath();
    g.roundRect(scr.x, scr.y, scr.w, scr.h, 8);
    g.clip();
    g.fillStyle = th.bg;
    g.fillRect(scr.x, scr.y, scr.w, scr.h);
    if (th.glow) {
      g.strokeStyle = 'rgba(255,255,255,.04)';
      g.lineWidth = 1;
      g.beginPath();
      for (let i = 1; i < 10; i++) { g.moveTo(scr.x + (scr.w * i) / 10, scr.y); g.lineTo(scr.x + (scr.w * i) / 10, scr.y + scr.h); }
      for (let i = 1; i < 8; i++) { g.moveTo(scr.x, scr.y + (scr.h * i) / 8); g.lineTo(scr.x + scr.w, scr.y + (scr.h * i) / 8); }
      g.stroke();
    }
    g.drawImage(trail, scr.x, scr.y, scr.w, scr.h);
    g.fillStyle = th.line;
    g.beginPath();
    g.arc(scr.x + pen.x, scr.y + pen.y, weight + 1, 0, TAU);
    g.fill();
    const sheen = g.createLinearGradient(scr.x, scr.y, scr.x + scr.w * 0.5, scr.y + scr.h);
    sheen.addColorStop(0, 'rgba(255,255,255,.07)');
    sheen.addColorStop(0.4, 'rgba(255,255,255,0)');
    g.fillStyle = sheen;
    g.fillRect(scr.x, scr.y, scr.w, scr.h);
    g.restore();

    knobs.forEach(drawKnob);
    g.fillStyle = 'rgba(240,240,236,.5)';
    g.font = '500 11px "DM Mono"';
    g.textAlign = 'center';
    g.fillText('ACROSS', knobs[0].x + knobR * 2.1, ky + 4);
    g.fillText('UP / DOWN', knobs[1].x - knobR * 2.2, ky + 4);
    g.restore();
  });

  ctx.clear = () => { sweep = null; shake = 1; tg.save(); tg.setTransform(1, 0, 0, 1, 0, 0); tg.clearRect(0, 0, trail.width, trail.height); tg.restore(); };
  ctx.snapshot = () => {
    const c = offscreen(trail.width, trail.height), x = c.getContext('2d');
    x.fillStyle = SCREENS[theme].bg;
    x.fillRect(0, 0, c.width, c.height);
    x.drawImage(trail, 0, 0);
    return c;
  };

  ctx.ui.select(Object.keys(SCREENS), theme, (v) => { theme = v; });
  ctx.ui.sep();
  ctx.ui.slider('Weight', 1, 6, weight, (v) => { weight = v; }, 0.5);
  ctx.ui.toggle('Hold trace', persist, (v) => { persist = v; });
  ctx.ui.toggle('Clicks', clicks, (v) => { clicks = v; });
  ctx.ui.button('Lissajous', () => {
    const ratios = [[3, 2], [5, 4], [3, 4], [5, 2], [7, 6]], [fx, fy] = ratios[Math.floor(Math.random() * ratios.length)];
    sweep = sweep ? null : { t: 0, fx, fy, ph: Math.random() * TAU, speed: 0.8 };
  });
  ctx.ui.button('Shake', () => { sfx('shake'); for (let i = 0; i < 6; i++) shakeClean(0.16); }, 'hot');
  ctx.hint('Turn the knobs by dragging them, scrolling over them or using the arrow keys. Grab the casing to shake.');
}
