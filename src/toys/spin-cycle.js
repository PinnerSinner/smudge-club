// Spin Cycle: fairground spin art. Paint droplets obey centrifugal and Coriolis forces in the disc's rotating frame.
import { TAU, clamp, lerp, offscreen } from '../kit.js';
import { motor } from '../sound.js';

const PAINTS = ['#e0308a', '#ffb000', '#00a6d6', '#4b2bc9', '#18b369', '#e8452d', '#141318', '#ffffff'];

export default function mount(ctx) {
  const s = ctx.surface({ bleed: true, maxPx: 1800 });
  const { W, H, px } = s;
  const { canvas, g } = s.layer({ alpha: false });
  const R = Math.min(W - 40, H - 166) / 2, cx = W / 2, cy = (H + 66 - 80) / 2;

  const size = Math.ceil(R * 2 * px);
  const card = offscreen(size, size);
  const cg = card.getContext('2d');
  cg.setTransform(px, 0, 0, px, R * px, R * px);   // origin at the disc's centre
  cg.lineCap = 'round';

  let colour = PAINTS[0], throttle = 0.55, dir = 1, omega = 0, angle = 0, braking = false, flow = 5;
  const drops = [];
  const P = { x: 0, y: 0, down: false, wait: 0 };

  function blank() {
    cg.save();
    cg.setTransform(1, 0, 0, 1, 0, 0);
    cg.fillStyle = '#fbf8f1';
    cg.fillRect(0, 0, size, size);
    cg.restore();
  }

  // Pointer position on the spinning card.
  function toCard(x, y) {
    const dx = x - cx, dy = y - cy, c = Math.cos(-angle), sn = Math.sin(-angle);
    return [dx * c - dy * sn, dx * sn + dy * c];
  }

  function squirt() {
    const [x, y] = toCard(P.x, P.y);
    if (Math.hypot(x, y) > R) return;
    for (let i = 0; i < flow + 3; i++) {
      const a = Math.random() * TAU, d = Math.random() * 9;
      const dx = x + Math.cos(a) * d, dy = y + Math.sin(a) * d, r = 0.7 + Math.pow(Math.random(), 2) * 3.4;
      // Every drop has its own stickiness, which is what fans a single squeeze out into a comet tail.
      if (drops.length < 1100) drops.push({ x: dx, y: dy, vx: 0, vy: 0, r, c: colour, life: 7 + Math.random() * 3, drag: 1.4 + Math.random() * 5 });
      cg.fillStyle = colour;
      cg.beginPath();
      cg.arc(dx, dy, r, 0, TAU);
      cg.fill();
    }
  }

  function stepDrops(dt) {
    // Work in the card's frame: a = w^2 r (outward) + 2 w (v x z), with sticky friction on the card.
    const w = omega, w2 = w * w;
    for (let i = drops.length - 1; i >= 0; i--) {
      const d = drops[i], rr = Math.hypot(d.x, d.y);
      const pull = w2 * rr;
      d.life -= dt;
      if (pull > 34) {
        const ax = w2 * d.x + 2 * w * d.vy, ay = w2 * d.y - 2 * w * d.vx;
        d.vx += ax * dt;
        d.vy += ay * dt;
      }
      const drag = Math.exp(-dt * d.drag);
      d.vx *= drag;
      d.vy *= drag;
      const ox = d.x, oy = d.y;
      d.x += d.vx * dt;
      d.y += d.vy * dt;
      const moved = Math.hypot(d.x - ox, d.y - oy);
      if (moved > 0.05) {
        // A travelling drop leaves paint behind, thinning until it dries out.
        d.r = Math.max(0.28, d.r - moved * 0.007);
        // Fast, fat drops shed finer spray sideways as they go.
        if (d.r > 1.2 && moved > 1.5 && Math.random() < 0.03 && drops.length < 1100) {
          const k = (Math.random() - 0.5) * 0.7;
          drops.push({ x: d.x, y: d.y, vx: d.vx - d.vy * k, vy: d.vy + d.vx * k, r: d.r * 0.45, c: d.c, life: 3, drag: 0.8 + Math.random() * 3 });
        }
        cg.strokeStyle = d.c;
        cg.lineWidth = d.r * 1.3;
        cg.beginPath();
        cg.moveTo(ox, oy);
        cg.lineTo(d.x, d.y);
        cg.stroke();
      }
      if (rr > R + 8 || d.life <= 0 || d.r <= 0.3) drops.splice(i, 1);
    }
  }

  s.pointer({
    down(p) { pushUndo(); P.down = true; P.x = p.x; P.y = p.y; },
    move(p) { P.x = p.x; P.y = p.y; },
    hover(p) { P.x = p.x; P.y = p.y; },
    up() { P.down = false; },
  });

  function drawDisc(a, alpha = 1) {
    g.save();
    g.globalAlpha = alpha;
    g.translate(cx, cy);
    g.rotate(a);
    g.beginPath();
    g.arc(0, 0, R, 0, TAU);
    g.clip();
    g.drawImage(card, -R, -R, R * 2, R * 2);
    g.restore();
  }

  ctx.loop((dt) => {
    const want = braking ? 0 : throttle * 7.5 * dir;
    omega = lerp(omega, want, 1 - Math.exp(-dt * (braking ? 2.6 : 1.3)));
    if (braking && Math.abs(omega) < 0.02) omega = 0;
    angle += omega * dt;

    // The bottle spits in bursts. A steady stream would just paint a solid ring on the moving card.
    if (P.down) {
      P.wait -= dt;
      if (P.wait <= 0) { squirt(); P.wait = 0.05 + Math.random() * 0.13; }
    }
    for (let k = 0; k < 3; k++) stepDrops(dt / 3);

    const bg = g.createRadialGradient(cx, cy, R * 0.8, cx, cy, Math.max(W, H) * 0.8);
    bg.addColorStop(0, '#2b2630');
    bg.addColorStop(1, '#100e13');
    g.fillStyle = bg;
    g.fillRect(0, 0, W, H);

    // Platter.
    g.save();
    g.shadowColor = 'rgba(0,0,0,.7)';
    g.shadowBlur = 40;
    g.shadowOffsetY = 18;
    g.fillStyle = '#17151a';
    g.beginPath();
    g.arc(cx, cy, R + 14, 0, TAU);
    g.fill();
    g.restore();
    const rim = g.createConicGradient(0.8, cx, cy);
    ['#555', '#bbb', '#444', '#999', '#555'].forEach((c, i) => rim.addColorStop(i / 4, c));
    g.strokeStyle = rim;
    g.lineWidth = 3;
    g.beginPath();
    g.arc(cx, cy, R + 8, 0, TAU);
    g.stroke();

    // Motion blur: a few ghost passes along the arc swept this frame.
    const sweep = Math.abs(omega) * 0.016, ghosts = clamp(Math.round(sweep * 26), 1, 6);
    drawDisc(angle);
    for (let i = 1; i < ghosts; i++) drawDisc(angle - (omega * 0.016 * i) / ghosts, 0.5 / i);

    // Spindle.
    g.fillStyle = '#26232b';
    g.beginPath();
    g.arc(cx, cy, 11, 0, TAU);
    g.fill();
    g.fillStyle = '#c9c6cf';
    g.beginPath();
    g.arc(cx, cy, 4, 0, TAU);
    g.fill();

    // Nozzle marker.
    if (P.down) {
      g.fillStyle = colour;
      g.strokeStyle = '#fff';
      g.lineWidth = 2;
      g.beginPath();
      g.arc(P.x, P.y, 7, 0, TAU);
      g.fill();
      g.stroke();
    }
    rpm.textContent = `${Math.abs(Math.round((omega / TAU) * 60))} rpm`;
    motor(Math.abs(omega) / 7.5);
  });

  const stack = [];
  const pushUndo = () => {
    const c = offscreen(size, size);
    c.getContext('2d').drawImage(card, 0, 0);
    stack.push(c);
    if (stack.length > 10) stack.shift();
  };
  ctx.undo = () => {
    const c = stack.pop();
    if (!c) return;
    drops.length = 0;
    cg.save();
    cg.setTransform(1, 0, 0, 1, 0, 0);
    cg.drawImage(c, 0, 0);
    cg.restore();
  };
  ctx.clear = () => { pushUndo(); drops.length = 0; blank(); };
  ctx.snapshot = () => {
    const c = offscreen(size, size), x = c.getContext('2d');
    x.fillStyle = '#14121a';
    x.fillRect(0, 0, size, size);
    x.beginPath();
    x.arc(size / 2, size / 2, size / 2, 0, TAU);
    x.clip();
    x.drawImage(card, 0, 0);
    return c;
  };

  blank();
  ctx.ui.swatches(PAINTS, colour, (c) => { colour = c; });
  ctx.ui.sep();
  ctx.ui.slider('Throttle', 0, 100, throttle * 100, (v) => { throttle = v / 100; braking = false; brake.classList.remove('on'); });
  ctx.ui.slider('Flow', 1, 12, flow, (v) => { flow = v; });
  ctx.ui.button('Reverse', () => { dir *= -1; });
  const brake = ctx.ui.toggle('Brake', false, (v) => { braking = v; });
  ctx.ui.button('New card', () => ctx.clear(), 'hot');
  const rpm = ctx.ui.readout('0 rpm');
  ctx.hint('Hold on the spinning card to squeeze paint. Hit the brake to see what you made.');
}
