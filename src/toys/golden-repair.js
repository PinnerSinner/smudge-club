// Golden Repair: Voronoi-shattered bowl. Drag pieces home, and every shared seam fills with molten metal.
import { sfx } from '../sound.js';
import { TAU, clamp, dist, lerp, offscreen, rng, noise2, paperGrain } from '../kit.js';

const GLAZES = {
  Tenmoku: ['#6e3f22', '#2a1712', '#120c0d', '#8a5a34'],
  Celadon: ['#b9d4c4', '#7fae9c', '#4d7f70', '#d7e6da'],
  Ash: ['#d9d3c7', '#a79f92', '#6d675f', '#ece7dc'],
  Cobalt: ['#3a63a8', '#1b3674', '#0e1c44', '#7da0d8'],
};
const METALS = {
  Gold: ['#fff4b0', '#e2ad2c', '#a8701a'],
  Silver: ['#ffffff', '#c6ccd4', '#7b8290'],
  Copper: ['#ffd2b0', '#d67a44', '#8c4522'],
};

export default function mount(ctx) {
  const s = ctx.surface({ bleed: true });
  const { W, H, px } = s;
  const { canvas, g } = s.layer({ alpha: false });
  const R = Math.min(W, H) * 0.34, cx = W / 2, cy = H / 2 + 6;

  let glaze = 'Tenmoku', metal = 'Gold', seed = 1, alive = true;
  let phase = 'whole';      // whole -> broken -> mended
  let bowl, pieces = [], seeds = [], seams = [], shake = 0, drag = null, glint = { x: cx, y: cy }, flash = 0;

  const table = offscreen(W * px, H * px);
  {
    const t = table.getContext('2d');
    t.scale(px, px);
    const grd = t.createRadialGradient(W / 2, H * 0.42, 40, W / 2, H / 2, Math.max(W, H) * 0.75);
    grd.addColorStop(0, '#d8cdb8');
    grd.addColorStop(0.6, '#b6a78e');
    grd.addColorStop(1, '#7d705c');
    t.fillStyle = grd;
    t.fillRect(0, 0, W, H);
    paperGrain(t, W, H, { alpha: 0.05, seed: 5 });
  }

  // The bowl, painted once from above: rim, glaze pooling towards the well, a little crawl of ash.
  function makeBowl() {
    const d = Math.ceil(R * 2 + 8), c = offscreen(d * px, d * px), b = c.getContext('2d');
    b.scale(px, px);
    const m = d / 2, [hi, mid, dark, rim] = GLAZES[glaze];
    const body = b.createRadialGradient(m - R * 0.26, m - R * 0.3, R * 0.05, m, m, R);
    body.addColorStop(0, hi);
    body.addColorStop(0.5, mid);
    body.addColorStop(0.86, dark);
    body.addColorStop(0.97, dark);
    body.addColorStop(1, rim);
    b.fillStyle = body;
    b.beginPath();
    b.arc(m, m, R, 0, TAU);
    b.fill();
    b.save();
    b.beginPath();
    b.arc(m, m, R * 0.985, 0, TAU);
    b.clip();
    const n = noise2(seed * 7 + 3);
    for (let i = 0; i < 2600; i++) {
      const a = Math.random() * TAU, rr = Math.sqrt(Math.random()) * R;
      const x = m + Math.cos(a) * rr, y = m + Math.sin(a) * rr, v = n(x * 0.03, y * 0.03);
      b.fillStyle = `rgba(${v > 0.5 ? '255,235,205' : '0,0,0'},${Math.abs(v - 0.5) * 0.09})`;
      b.beginPath();
      b.arc(x, y, 1 + Math.random() * 7, 0, TAU);
      b.fill();
    }
    // Well of the bowl and a soft window reflection.
    const well = b.createRadialGradient(m, m, R * 0.08, m, m, R * 0.46);
    well.addColorStop(0, 'rgba(0,0,0,.42)');
    well.addColorStop(1, 'rgba(0,0,0,0)');
    b.fillStyle = well;
    b.fillRect(0, 0, d, d);
    b.fillStyle = 'rgba(255,255,255,.1)';
    b.beginPath();
    b.ellipse(m - R * 0.34, m - R * 0.42, R * 0.2, R * 0.08, -0.7, 0, TAU);
    b.fill();
    b.restore();
    return { c, d };
  }

  // Keep the side of the bisector nearer a (Sutherland-Hodgman against one half-plane).
  function clipPoly(poly, ax, ay, bx, by) {
    const mx = (ax + bx) / 2, my = (ay + by) / 2, nx = bx - ax, ny = by - ay;
    const side = (p) => (p[0] - mx) * nx + (p[1] - my) * ny;
    const out = [];
    for (let i = 0; i < poly.length; i++) {
      const p = poly[i], q = poly[(i + 1) % poly.length], sp = side(p), sq = side(q);
      if (sp <= 0) out.push(p);
      if (sp < 0 !== sq < 0) {
        const t = sp / (sp - sq);
        out.push([lerp(p[0], q[0], t), lerp(p[1], q[1], t)]);
      }
    }
    return out;
  }

  // Every shared edge gets the same jagged path on both sides, so pieces fit together exactly.
  const jagCache = new Map();
  const vkey = (p) => `${Math.round(p[0] * 2)},${Math.round(p[1] * 2)}`;
  function jag(a, b) {
    const ka = vkey(a), kb = vkey(b), forward = ka < kb;
    const id = forward ? ka + '|' + kb : kb + '|' + ka;
    let path = jagCache.get(id);
    if (!path) {
      const p0 = forward ? a : b, p1 = forward ? b : a;
      const r = rng([...id].reduce((h, c) => (h * 31 + c.charCodeAt(0)) >>> 0, 7));
      const len = dist(p0[0], p0[1], p1[0], p1[1]), n = Math.max(2, Math.floor(len / 11));
      const nx = -(p1[1] - p0[1]) / len, ny = (p1[0] - p0[0]) / len;
      path = [p0];
      for (let i = 1; i < n; i++) {
        const t = i / n, o = (r() - 0.5) * 9 * Math.sin(t * Math.PI);
        path.push([lerp(p0[0], p1[0], t) + nx * o, lerp(p0[1], p1[1], t) + ny * o]);
      }
      path.push(p1);
      jagCache.set(id, path);
    }
    return forward ? path : [...path].reverse();
  }

  function shatter() {
    jagCache.clear();
    const circle = [];
    for (let i = 0; i < 72; i++) circle.push([Math.cos((i / 72) * TAU) * R, Math.sin((i / 72) * TAU) * R]);
    const cells = seeds.map((p, i) => {
      let poly = circle;
      seeds.forEach((q, j) => { if (i !== j) poly = clipPoly(poly, p[0], p[1], q[0], q[1]); });
      return poly;
    }).filter((p) => p.length > 2);

    const edgeOwners = new Map();
    pieces = cells.map((poly, id) => {
      const path = [];
      for (let i = 0; i < poly.length; i++) {
        const a = poly[i], b = poly[(i + 1) % poly.length];
        if (Math.hypot(a[0], a[1]) > R - 0.6 && Math.hypot(b[0], b[1]) > R - 0.6) { path.push(a); continue; }
        const j = jag(a, b);
        path.push(...j.slice(0, -1));
        const k = [vkey(a), vkey(b)].sort().join('|');
        if (!edgeOwners.has(k)) edgeOwners.set(k, { pts: j, owners: [] });
        edgeOwners.get(k).owners.push(id);
      }
      let gx = 0, gy = 0;
      path.forEach((p) => { gx += p[0]; gy += p[1]; });
      gx /= path.length;
      gy /= path.length;
      const away = Math.atan2(gy, gx) + (Math.random() - 0.5) * 0.5, push = R * (0.14 + Math.random() * 0.34);
      return { id, path, gx, gy, x: Math.cos(away) * push, y: Math.sin(away) * push, a: (Math.random() - 0.5) * 0.7, home: false };
    });
    seams = [...edgeOwners.values()].filter((e) => e.owners.length === 2).map((e) => ({ ...e, fill: 0 }));
  }

  function strike(x, y) {
    const lx = x - cx, ly = y - cy;
    if (Math.hypot(lx, ly) > R || phase === 'mended') return;
    const n = phase === 'whole' ? 13 : 6;
    for (let i = 0; i < n; i++) {
      const a = Math.random() * TAU, d = Math.pow(Math.random(), 1.6) * R * 0.85;
      const sx = lx + Math.cos(a) * d, sy = ly + Math.sin(a) * d;
      if (Math.hypot(sx, sy) < R * 1.02 && seeds.length < 34) seeds.push([sx, sy]);
    }
    // Keep at least a handful of pieces even from an edge strike.
    while (seeds.length < 8) { const a = Math.random() * TAU, d = Math.random() * R; seeds.push([Math.cos(a) * d, Math.sin(a) * d]); }
    phase = 'broken';
    shake = 1;
    sfx('crack');
    shatter();
    ctx.dismissTip();
    setTimeout(() => { if (alive) ctx.hint('Drag each piece back to where it belongs. Metal fills the seam as they meet.'); }, 900);
  }

  const trace = (path) => {
    g.beginPath();
    path.forEach(([a, b], k) => (k ? g.lineTo(a, b) : g.moveTo(a, b)));
    g.closePath();
  };

  function pieceAt(x, y) {
    for (let i = pieces.length - 1; i >= 0; i--) {
      const p = pieces[i];
      const c = Math.cos(-p.a), sn = Math.sin(-p.a);
      const dx = x - (cx + p.gx + p.x), dy = y - (cy + p.gy + p.y);
      const rx = dx * c - dy * sn + p.gx, ry = dx * sn + dy * c + p.gy;
      trace(p.path);
      // isPointInPath tests in canvas pixels, and the path was built under the surface's px scale.
      if (g.isPointInPath(rx * px, ry * px)) return p;
    }
    return null;
  }

  function drawPiece(p) {
    g.save();
    g.translate(cx + p.gx + p.x, cy + p.gy + p.y);
    g.rotate(p.a);
    g.translate(-p.gx, -p.gy);
    if (!p.home) {
      g.save();
      g.shadowColor = 'rgba(30,20,10,.55)';
      g.shadowBlur = drag === p ? 30 : 14;
      g.shadowOffsetY = drag === p ? 22 : 8;
      trace(p.path);
      g.fillStyle = '#000';
      g.fill();
      g.restore();
    }
    trace(p.path);
    g.save();
    g.clip();
    g.drawImage(bowl.c, -bowl.d / 2, -bowl.d / 2, bowl.d, bowl.d);
    g.restore();
    // Bare clay shows along any broken edge that has not been mended.
    if (!p.home) {
      trace(p.path);
      g.strokeStyle = '#c9b08d';
      g.lineWidth = 1.5;
      g.stroke();
    }
    g.restore();
  }

  function drawSeam(e) {
    if (e.fill <= 0) return;
    const upto = Math.max(2, Math.ceil(e.pts.length * e.fill));
    const [hi, mid, lo] = METALS[metal];
    const line = (w, c) => {
      g.strokeStyle = c;
      g.lineWidth = w;
      g.beginPath();
      for (let i = 0; i < upto; i++) i ? g.lineTo(cx + e.pts[i][0], cy + e.pts[i][1]) : g.moveTo(cx + e.pts[i][0], cy + e.pts[i][1]);
      g.stroke();
    };
    g.lineCap = 'round';
    g.lineJoin = 'round';
    line(4.6, lo);
    line(3, mid);
    line(1.1, hi);
    // The seam catches the light wherever the pointer goes.
    for (let i = 0; i < upto; i += 3) {
      const [x, y] = e.pts[i];
      const k = clamp(1 - dist(cx + x, cy + y, glint.x, glint.y) / 130);
      if (k > 0) {
        g.fillStyle = `rgba(255,252,225,${k * 0.9})`;
        g.beginPath();
        g.arc(cx + x, cy + y, 1 + k * 2.4, 0, TAU);
        g.fill();
      }
    }
  }

  function reset() {
    seed++;
    phase = 'whole';
    pieces = [];
    seeds = [];
    seams = [];
    bowl = makeBowl();
    ctx.hint('Strike the bowl. Go on. Strike it again if you like.');
  }

  s.pointer({
    down(p) {
      glint = p;
      if (phase === 'broken') {
        const hit = pieceAt(p.x, p.y);
        if (hit) {
          drag = hit;
          hit.home = false;
          hit.grabX = p.x - hit.x;
          hit.grabY = p.y - hit.y;
          pieces.splice(pieces.indexOf(hit), 1);
          pieces.push(hit);
          return;
        }
      }
      strike(p.x, p.y);
    },
    move(p) {
      glint = p;
      if (drag) { drag.x = p.x - drag.grabX; drag.y = p.y - drag.grabY; drag.a *= 0.92; }
    },
    hover(p) { glint = p; },
    up() {
      if (!drag) return;
      if (Math.hypot(drag.x, drag.y) < R * 0.16) { drag.x = 0; drag.y = 0; drag.a = 0; drag.home = true; sfx('clink'); }
      drag = null;
    },
  });

  ctx.loop((dt) => {
    g.save();
    g.setTransform(1, 0, 0, 1, 0, 0);
    g.drawImage(table, 0, 0);
    g.restore();

    if (shake > 0) shake = Math.max(0, shake - dt * 3.4);
    g.save();
    g.translate((Math.random() - 0.5) * shake * 16, (Math.random() - 0.5) * shake * 16);

    // Contact shadow under the bowl.
    // It only appears once the bowl is whole, since loose shards throw their own shadows.
    const whole = phase === 'broken' ? pieces.filter((p) => p.home).length / pieces.length : 1;
    const sh = g.createRadialGradient(cx, cy + R * 0.12, R * 0.7, cx, cy + R * 0.12, R * 1.24);
    sh.addColorStop(0, `rgba(40,28,16,${0.5 * whole * whole})`);
    sh.addColorStop(1, 'rgba(40,28,16,0)');
    g.fillStyle = sh;
    g.fillRect(0, 0, W, H);

    if (phase === 'whole') {
      g.drawImage(bowl.c, cx - bowl.d / 2, cy - bowl.d / 2, bowl.d, bowl.d);
    } else {
      // Home pieces first, loose shards on top.
      for (const p of pieces) if (p.home) drawPiece(p);
      seams.forEach((e) => {
        const ready = e.owners.every((id) => pieces.find((q) => q.id === id)?.home);
        e.fill = ready ? Math.min(1, e.fill + dt * 1.5) : Math.max(0, e.fill - dt * 4);
        drawSeam(e);
      });
      for (const p of pieces) if (!p.home) drawPiece(p);
    }

    if (phase === 'broken' && pieces.length && pieces.every((p) => p.home) && seams.every((e) => e.fill >= 1)) {
      phase = 'mended';
      flash = 1;
      sfx('shimmer');
      ctx.toast('Mended. It is worth more now.');
    }
    if (flash > 0) {
      flash = Math.max(0, flash - dt * 0.8);
      g.fillStyle = `rgba(255,240,190,${flash * 0.35})`;
      g.beginPath();
      g.arc(cx, cy, R * 1.02, 0, TAU);
      g.fill();
    }
    g.restore();
  });

  ctx.clear = reset;
  ctx.snapshot = () => canvas;
  ctx.ui.seg(Object.keys(GLAZES), glaze, (v) => { glaze = v; bowl = makeBowl(); });
  ctx.ui.sep();
  ctx.ui.seg(Object.keys(METALS), metal, (v) => { metal = v; });
  ctx.ui.sep();
  ctx.ui.button('Gather all', () => {
    if (phase !== 'broken') return;
    // Sweep every shard home in a slow settling motion.
    pieces.forEach((p, i) => setTimeout(() => {
      if (!alive) return;
      const sx = p.x, sy = p.y, sa = p.a, t0 = performance.now();
      const stop = ctx.loop(() => {
        const t = clamp((performance.now() - t0) / 500), e = 1 - Math.pow(1 - t, 3);
        p.x = lerp(sx, 0, e);
        p.y = lerp(sy, 0, e);
        p.a = lerp(sa, 0, e);
        if (t >= 1) { p.home = true; sfx('clink'); stop(); }
      });
    }, i * 90));
  });
  ctx.ui.button('New bowl', reset);

  const destroy = ctx.destroy;
  ctx.destroy = () => { alive = false; destroy(); };
  reset();
}
