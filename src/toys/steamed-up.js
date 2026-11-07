// Steamed Up: a live scene behind fogged glass. Your finger clears the fog, drops run, the mist creeps back.
import { sfx } from '../sound.js';
import { TAU, clamp, lerp, offscreen, rng } from '../kit.js';

const VIEWS = {
  Night: { sky: ['#07101f', '#10233f', '#2a2342'], lights: ['#ffb347', '#ff5e62', '#7ad7f0', '#fff3c4', '#ff8fb1'], fog: 'rgb(174,190,208)' },
  Dawn: { sky: ['#37436e', '#b9708a', '#f4b582'], lights: ['#ffe2a8', '#ffd0a0', '#fff3c4'], fog: 'rgb(226,216,214)' },
  Harbour: { sky: ['#0b2233', '#144058', '#1f6372'], lights: ['#ffd27a', '#7fe0d0', '#fff3c4', '#ff7a59'], fog: 'rgb(178,204,208)' },
  Dusk: { sky: ['#1c1440', '#6a2a7a', '#e8724a'], lights: ['#ffb35a', '#ff6a8a', '#ffe08a', '#b08aff'], fog: 'rgb(200,180,205)' },
  Neon: { sky: ['#07040f', '#1a0a3a', '#3a0a4a'], lights: ['#ff2fb0', '#22e6ff', '#c6ff3d', '#ff8a1f', '#8a5cff'], fog: 'rgb(170,160,205)' },
  Forest: { sky: ['#061a14', '#0f3a2c', '#2f6a4a'], lights: ['#d9f27a', '#ffe08a', '#7af0b0'], fog: 'rgb(180,205,188)' },
};

export default function mount(ctx) {
  const s = ctx.surface({ bleed: true, maxPx: 1500 });
  const { W, H, px } = s;
  const view = s.layer({ alpha: false });
  const fogLayer = s.layer();
  const dropsLayer = s.layer();
  const fog = fogLayer.g;

  let name = 'Night', finger = 26, returnRate = 0.5;
  const scene = offscreen(W * px, H * px);
  const blur = offscreen(W * px * 0.25, H * px * 0.25);
  const bg = blur.getContext('2d');
  const lights = [], cars = [];

  function buildScene() {
    const v = VIEWS[name], r = rng(name.length * 31);
    const c = scene.getContext('2d');
    c.setTransform(px, 0, 0, px, 0, 0);
    const sky = c.createLinearGradient(0, 0, 0, H);
    v.sky.forEach((col, i) => sky.addColorStop(i / 2, col));
    c.fillStyle = sky;
    c.fillRect(0, 0, W, H);
    // Layered skyline with lit windows.
    for (let layer = 0; layer < 3; layer++) {
      const base = H * (0.5 + layer * 0.14);
      let x = -20;
      while (x < W + 20) {
        const w = 40 + r() * 90, h = (70 + r() * 240) * (1 - layer * 0.2);
        c.fillStyle = `rgba(${6 + layer * 4},${10 + layer * 5},${20 + layer * 6},.96)`;
        c.fillRect(x, base - h, w, H);
        for (let wy = base - h + 8; wy < H * 0.92; wy += 13) {
          for (let wx = x + 6; wx < x + w - 6; wx += 10) {
            if (r() < 0.26) {
              c.fillStyle = v.lights[Math.floor(r() * v.lights.length)];
              c.globalAlpha = 0.45 + r() * 0.5;
              c.fillRect(wx, wy, 5, 7);
              c.globalAlpha = 1;
            }
          }
        }
        x += w + r() * 10;
      }
    }
    lights.length = 0;
    for (let i = 0; i < 26; i++) lights.push({ x: r() * W, y: H * (0.42 + r() * 0.5), r: 10 + r() * 34, c: v.lights[i % v.lights.length], p: r() * TAU });
    cars.length = 0;
    for (let i = 0; i < 12; i++) cars.push({ x: r() * W, y: H * (0.8 + (i % 3) * 0.05), v: (i % 2 ? -1 : 1) * (50 + r() * 70), c: i % 2 ? '#ff4c4c' : '#fff0c8' });
  }

  function drawView(t) {
    const g = view.g;
    g.save();
    g.setTransform(1, 0, 0, 1, 0, 0);
    g.drawImage(scene, 0, 0);
    g.restore();
    g.save();
    g.globalCompositeOperation = 'lighter';
    for (const l of lights) {
      const grd = g.createRadialGradient(l.x, l.y, 0, l.x, l.y, l.r);
      grd.addColorStop(0, l.c);
      grd.addColorStop(1, 'rgba(0,0,0,0)');
      g.globalAlpha = 0.16 + 0.08 * Math.sin(t * 1.2 + l.p);
      g.fillStyle = grd;
      g.fillRect(l.x - l.r, l.y - l.r, l.r * 2, l.r * 2);
    }
    g.globalAlpha = 0.85;
    for (const c of cars) {
      g.fillStyle = c.c;
      g.beginPath();
      g.arc(c.x, c.y, 3, 0, TAU);
      g.arc(c.x + 10, c.y, 3, 0, TAU);
      g.fill();
    }
    g.restore();
    // Blurring at quarter size is far cheaper than blurring the full frame, and looks the same through fog.
    bg.filter = 'blur(5px) saturate(1.7) brightness(1.3)';
    bg.drawImage(view.canvas, 0, 0, blur.width, blur.height);
    bg.filter = 'none';
  }

  // The fog is a blurred copy of the view with a pale veil, shown through a mask the finger erases.
  const mask = offscreen(W * px * 0.5, H * px * 0.5);
  const mg = mask.getContext('2d');
  mg.scale(px * 0.5, px * 0.5);
  mg.lineCap = 'round';
  mg.lineJoin = 'round';

  function refog() {
    mg.globalCompositeOperation = 'source-over';
    mg.fillStyle = '#fff';
    mg.fillRect(0, 0, W, H);
  }

  function wipe(x0, y0, x1, y1, w) {
    mg.globalCompositeOperation = 'destination-out';
    mg.strokeStyle = 'rgba(0,0,0,1)';
    mg.lineWidth = w;
    mg.beginPath();
    mg.moveTo(x0, y0);
    mg.lineTo(x1, y1);
    mg.stroke();
    // A softer halo around the fingertip.
    mg.strokeStyle = 'rgba(0,0,0,.25)';
    mg.lineWidth = w * 1.5;
    mg.stroke();
  }

  const runs = [], beads = [], breaths = [];
  const pointer = { x: 0, y: 0, acc: 0 };
  const bead = (x, y, r) => beads.push({ x, y, fat: r });

  s.pointer({
    down(p) {
      pointer.x = p.x;
      pointer.y = p.y;
      wipe(p.x, p.y, p.x + 0.1, p.y, finger);
    },
    move(p) {
      wipe(pointer.x, pointer.y, p.x, p.y, finger);
      pointer.acc += Math.hypot(p.x - pointer.x, p.y - pointer.y);
      // Water pushed aside by the finger collects along the stroke as beads.
      if (pointer.acc > 34) {
        pointer.acc = 0;
        const side = Math.random() < 0.5 ? -1 : 1;
        bead(p.x + side * finger * 0.55, p.y + (Math.random() - 0.3) * finger, 2 + Math.random() * 3.4);
      }
      pointer.x = p.x;
      pointer.y = p.y;
    },
  });

  function drawDrop(g, x, y, r) {
    const grad = g.createRadialGradient(x - r * 0.3, y - r * 0.4, r * 0.1, x, y, r);
    grad.addColorStop(0, 'rgba(255,255,255,.75)');
    grad.addColorStop(0.5, 'rgba(180,210,235,.2)');
    grad.addColorStop(1, 'rgba(10,20,40,.45)');
    g.fillStyle = grad;
    g.beginPath();
    g.ellipse(x, y, r * 0.86, r * 1.1, 0, 0, TAU);
    g.fill();
  }

  ctx.loop((dt, t) => {
    for (const c of cars) { c.x += c.v * dt; if (c.x < -30) c.x = W + 30; if (c.x > W + 30) c.x = -30; }
    drawView(t);

    // The fog slowly creeps back in.
    if (returnRate > 0) {
      mg.globalCompositeOperation = 'source-over';
      mg.globalAlpha = dt * returnRate * 0.05;
      mg.fillStyle = '#fff';
      mg.fillRect(0, 0, W, H);
      mg.globalAlpha = 1;
    }

    for (let i = breaths.length - 1; i >= 0; i--) {
      const b = breaths[i];
      b.t += dt;
      const grd = mg.createRadialGradient(W / 2, H * 0.55, 0, W / 2, H * 0.55, Math.max(W, H) * lerp(0.2, 0.9, clamp(b.t / 1.4)));
      grd.addColorStop(0, 'rgba(255,255,255,.18)');
      grd.addColorStop(1, 'rgba(255,255,255,0)');
      mg.globalCompositeOperation = 'source-over';
      mg.fillStyle = grd;
      mg.fillRect(0, 0, W, H);
      if (b.t > 1.4) breaths.splice(i, 1);
    }

    // Fog pixels: blurred scene plus veil, cut by the mask.
    const fw = fogLayer.canvas.width, fh = fogLayer.canvas.height;
    fog.save();
    fog.setTransform(1, 0, 0, 1, 0, 0);
    fog.globalCompositeOperation = 'copy';
    fog.imageSmoothingQuality = 'high';
    fog.drawImage(blur, 0, 0, fw, fh);
    fog.globalCompositeOperation = 'source-over';
    fog.globalAlpha = 0.44;
    fog.fillStyle = VIEWS[name].fog;
    fog.fillRect(0, 0, fw, fh);
    fog.globalAlpha = 1;
    fog.globalCompositeOperation = 'destination-in';
    fog.drawImage(mask, 0, 0, fw, fh);
    fog.restore();

    // Beads swell and, once heavy, run down clearing a track.
    const dg = dropsLayer.g;
    dg.clearRect(0, 0, W, H);
    for (let i = beads.length - 1; i >= 0; i--) {
      const b = beads[i];
      b.fat += dt * 0.5;
      if (b.fat > 5 && Math.random() < 0.05) {
        runs.push({ x: b.x, y: b.y, r: b.fat, v: 60 + Math.random() * 120, wob: Math.random() * TAU });
        beads.splice(i, 1);
        continue;
      }
      drawDrop(dg, b.x, b.y, b.fat);
    }
    if (beads.length > 220) beads.splice(0, 30);
    if (Math.random() < dt * 0.9) bead(Math.random() * W, Math.random() * H * 0.7, 1.5 + Math.random() * 2.5);

    for (let i = runs.length - 1; i >= 0; i--) {
      const r = runs[i], ox = r.x, oy = r.y;
      r.wob += dt * 5;
      r.y += r.v * dt;
      r.x += Math.sin(r.wob) * 18 * dt;
      // Stop-start, the way real drops move.
      r.v = clamp(r.v + (Math.random() - 0.48) * 240 * dt, 12, 240);
      wipe(ox, oy, r.x, r.y, r.r * 1.3);
      drawDrop(dg, r.x, r.y, r.r);
      r.r = Math.max(1.5, r.r - dt * 0.35);
      if (r.y > H + 10) runs.splice(i, 1);
    }
  });

  ctx.clear = () => { refog(); beads.length = 0; runs.length = 0; };
  ctx.snapshot = () => {
    const c = offscreen(view.canvas.width, view.canvas.height), g = c.getContext('2d');
    g.drawImage(view.canvas, 0, 0);
    g.drawImage(fogLayer.canvas, 0, 0);
    g.drawImage(dropsLayer.canvas, 0, 0);
    return c;
  };

  buildScene();
  refog();
  ctx.ui.seg(Object.keys(VIEWS), name, (v) => { name = v; buildScene(); });
  ctx.ui.sep();
  ctx.ui.slider('Finger', 10, 70, finger, (v) => { finger = v; });
  ctx.ui.slider('Fog returns', 0, 3, returnRate, (v) => { returnRate = v; }, 0.1);
  ctx.ui.button('Breathe', () => { breaths.push({ t: 0 }); sfx('breath'); }, 'hot');
  ctx.hint('Draw on the glass with your finger. It will not stay clear for long.');
}
