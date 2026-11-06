// Long Exposure: light stacks up while the shutter is open, and stars slowly trail across the frame behind you.
import { TAU, clamp, offscreen, rng } from '../kit.js';

const LIGHTS = {
  Sparkler: { core: '#fff6df', halo: 'rgba(255,150,50,.2)', sparks: 'rgba(255,190,90,' },
  Neon: { core: '#ffe3f2', halo: 'rgba(255,40,140,.24)', sparks: null },
  Ice: { core: '#ecfaff', halo: 'rgba(70,190,255,.22)', sparks: 'rgba(140,220,255,' },
  Fairy: { core: '#fff2c9', halo: 'rgba(255,210,120,.1)', dots: true, sparks: null },
};

export default function mount(ctx) {
  const s = ctx.surface({ bleed: true, bg: '#040307', maxPx: 1800 });
  const { W, H, px } = s;
  const film = s.buffer();
  const view = s.layer({ alpha: false });

  let light = 'Sparkler', width = 3, exposure = 0, stars = true, sparksOn = true, open = true;
  const pushUndo = ctx.rasterUndo(film.canvas, 8);
  const sparks = [];

  // A dark treeline, slowly appearing as the exposure builds.
  const land = offscreen(W * px, H * px);
  {
    const c = land.getContext('2d'), r = rng(8);
    c.scale(px, px);
    c.fillStyle = '#000';
    c.beginPath();
    c.moveTo(0, H);
    let x = 0;
    while (x < W + 30) {
      const h = H * (0.14 + r() * 0.09);
      c.lineTo(x, H - h * 0.6);
      c.lineTo(x + 9 + r() * 12, H - h);
      c.lineTo(x + 20 + r() * 12, H - h * 0.58);
      x += 18 + r() * 18;
    }
    c.lineTo(W, H);
    c.closePath();
    c.fill();
  }

  const r0 = rng(3), starList = Array.from({ length: 240 }, () => ({ a: r0() * TAU, d: Math.pow(r0(), 0.6) * Math.hypot(W, H) * 0.8, b: 0.1 + r0() * 0.5, c: r0() < 0.2 ? '180,200,255' : r0() < 0.4 ? '255,220,190' : '255,255,255' }));
  const pole = { x: W * 0.62, y: H * 0.22 };

  function stroke(a, b) {
    const g = film.g, L = LIGHTS[light];
    g.save();
    g.globalCompositeOperation = 'lighter';
    g.lineCap = 'round';
    if (L.dots) {
      const d = Math.hypot(b.x - a.x, b.y - a.y);
      carry += d;
      if (carry > 26) {
        carry = 0;
        const hue = ['#ffd27a', '#ff7a59', '#7ad7f0', '#9df08a'][Math.floor(Math.random() * 4)];
        const q = g.createRadialGradient(b.x, b.y, 0, b.x, b.y, 13 + width);
        q.addColorStop(0, '#fff');
        q.addColorStop(0.2, hue);
        q.addColorStop(1, 'rgba(0,0,0,0)');
        g.fillStyle = q;
        g.beginPath();
        g.arc(b.x, b.y, 13 + width, 0, TAU);
        g.fill();
      }
    } else {
      g.strokeStyle = L.halo;
      g.lineWidth = width * 7;
      g.beginPath();
      g.moveTo(a.x, a.y);
      g.lineTo(b.x, b.y);
      g.stroke();
      g.lineWidth = width * 3;
      g.stroke();
      g.strokeStyle = L.core;
      g.lineWidth = width * 0.7;
      g.stroke();
    }
    g.restore();
    if (sparksOn && L.sparks) {
      const n = 3 + Math.floor(Math.random() * 3);
      for (let i = 0; i < n; i++) {
        const t = Math.random() * TAU, v = 120 + Math.random() * 420;
        sparks.push({ x: b.x, y: b.y, vx: Math.cos(t) * v, vy: Math.sin(t) * v, life: 0.1 + Math.random() * 0.34, c: L.sparks });
      }
      if (sparks.length > 500) sparks.splice(0, 120);
    }
  }

  let last = null, carry = 0;
  s.pointer({
    down(p) { pushUndo(); last = p; stroke(p, { x: p.x + 0.2, y: p.y }); },
    move(p) { stroke(last, p); last = p; },
    up() { last = null; },
  });

  ctx.loop((dt) => {
    if (open) exposure += dt;
    const g = film.g;

    // Sparks are burned into the film as they fly.
    g.save();
    g.globalCompositeOperation = 'lighter';
    g.lineCap = 'round';
    for (let i = sparks.length - 1; i >= 0; i--) {
      const k = sparks[i], ox = k.x, oy = k.y;
      k.vy += 520 * dt;
      k.vx *= 0.985;
      k.x += k.vx * dt;
      k.y += k.vy * dt;
      k.life -= dt;
      g.strokeStyle = `${k.c}${clamp(k.life * 3, 0.05, 0.7)})`;
      g.lineWidth = 0.9;
      g.beginPath();
      g.moveTo(ox, oy);
      g.lineTo(k.x, k.y);
      g.stroke();
      if (k.life <= 0) sparks.splice(i, 1);
    }
    // Stars wheel around the pole, drawing arcs that only exist because the shutter is open.
    if (stars && open) {
      for (const st of starList) {
        const a0 = st.a;
        st.a += dt * 0.012;
        g.strokeStyle = `rgba(${st.c},${st.b * 0.34})`;
        g.lineWidth = 0.8;
        g.beginPath();
        g.moveTo(pole.x + Math.cos(a0) * st.d, pole.y + Math.sin(a0) * st.d);
        g.lineTo(pole.x + Math.cos(st.a) * st.d, pole.y + Math.sin(st.a) * st.d);
        g.stroke();
      }
    }
    g.restore();

    const v = view.g, ambient = clamp(exposure / 90);
    const sky = v.createLinearGradient(0, 0, 0, H);
    sky.addColorStop(0, `rgb(${4 + ambient * 8},${3 + ambient * 12},${7 + ambient * 32})`);
    sky.addColorStop(1, `rgb(${5 + ambient * 40},${4 + ambient * 20},${8 + ambient * 34})`);
    v.fillStyle = sky;
    v.fillRect(0, 0, W, H);
    v.drawImage(film.canvas, 0, 0, W, H);
    v.save();
    v.globalAlpha = 0.25 + ambient * 0.7;
    v.drawImage(land, 0, 0, W, H);
    v.restore();
    clock.textContent = `${open ? 'Open' : 'Shut'} · ${Math.floor(exposure)} s`;
  });

  ctx.clear = () => {
    pushUndo();
    film.g.save();
    film.g.setTransform(1, 0, 0, 1, 0, 0);
    film.g.clearRect(0, 0, film.canvas.width, film.canvas.height);
    film.g.restore();
    exposure = 0;
  };
  ctx.snapshot = () => view.canvas;

  ctx.ui.seg(Object.keys(LIGHTS), light, (v) => { light = v; });
  ctx.ui.sep();
  ctx.ui.slider('Width', 1, 9, width, (v) => { width = v; });
  ctx.ui.toggle('Sparks', sparksOn, (v) => { sparksOn = v; });
  ctx.ui.toggle('Star trails', stars, (v) => { stars = v; });
  ctx.ui.toggle('Shutter', open, (v) => { open = v; });
  const clock = ctx.ui.readout('Open · 0 s');
  ctx.hint('Write on the dark. Leave the shutter open and the stars will start to trail behind you.');
}
