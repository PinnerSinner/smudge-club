// The rack: stretched canvases you scroll through, turn over and step up to.
import * as THREE from 'three';
import { RELEASES } from './catalogue.js';
import { drawCover, drawBack } from './covers.js';
import { clamp, lerp, offscreen, rng, smooth } from './kit.js';
import { sfx } from './sound.js';

const N = RELEASES.length;
const SIZE = 1.3, DEPTH = 0.085, TEX = 1024, ZOOM = 2.95;
const easeOut = (t) => 1 - Math.pow(1 - t, 3);
const easeInOut = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
const wrap = (d) => { d = ((d % N) + N) % N; return d > N / 2 ? d - N : d; };

// Soft studio lights for the wet paint to catch. Built in code, so no HDR download.
function studioEnv(renderer) {
  const s = new THREE.Scene();
  s.background = new THREE.Color(0x0c0c10);
  const box = (w, h, x, y, z, i) => {
    const m = new THREE.Mesh(new THREE.PlaneGeometry(w, h), new THREE.MeshBasicMaterial({ color: new THREE.Color(i, i, i), side: THREE.DoubleSide }));
    m.position.set(x, y, z);
    m.lookAt(0, 0, 0);
    s.add(m);
  };
  box(7, 1.4, 0, 5, 3, 6);
  box(1.2, 8, -6, 0, 3, 4);
  box(1.2, 8, 6, 1, 2, 2.5);
  box(3, 3, 3, 3, 6, 2);
  const pm = new THREE.PMREMGenerator(renderer);
  const t = pm.fromScene(s, 0.02).texture;
  pm.dispose();
  return t;
}

// A tiling normal map of linen weave, so the light catches the tooth of the canvas.
function weaveNormal() {
  const n = 64, c = offscreen(n, n), g = c.getContext('2d'), im = g.createImageData(n, n);
  const h = (x, y) => {
    const a = Math.sin((x / n) * Math.PI * 16), b = Math.sin((y / n) * Math.PI * 16);
    return ((Math.floor(x / 4) + Math.floor(y / 4)) % 2 ? a : b) * 0.5;
  };
  for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) {
    const dx = h(x + 1, y) - h(x - 1, y), dy = h(x, y + 1) - h(x, y - 1), o = (y * n + x) * 4;
    im.data[o] = 128 + dx * 90;
    im.data[o + 1] = 128 + dy * 90;
    im.data[o + 2] = 255;
    im.data[o + 3] = 255;
  }
  g.putImageData(im, 0, 0);
  const t = new THREE.CanvasTexture(c);
  t.wrapS = t.wrapT = THREE.RepeatWrapping;
  t.repeat.set(30, 30);
  return t;
}

function shadowTexture() {
  const c = offscreen(128, 128), g = c.getContext('2d');
  g.filter = 'blur(11px)';
  g.fillStyle = 'rgba(0,0,0,.55)';
  g.fillRect(36, 36, 56, 56);
  return new THREE.CanvasTexture(c);
}

// Canvas geometry with gallery-wrapped sides: each edge samples the outermost sliver of the painting.
function canvasGeometry() {
  const b = new THREE.BoxGeometry(SIZE, SIZE, DEPTH);
  const uv = b.attributes.uv, wrapBand = 0.035;
  for (let i = 0; i < 16; i++) {
    const u = uv.getX(i), v = uv.getY(i), f = Math.floor(i / 4);
    if (f === 0) uv.setXY(i, 1 - wrapBand * (1 - u), v);
    if (f === 1) uv.setXY(i, wrapBand * u, v);
    if (f === 2) uv.setXY(i, u, 1 - wrapBand * (1 - v));
    if (f === 3) uv.setXY(i, u, wrapBand * v);
  }
  return b;
}

export function createShelf({ mount, onFocus, onOpenRequest, onHover, onPointer }) {
  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  renderer.setClearColor(0x000000, 0);
  renderer.toneMapping = THREE.NoToneMapping;
  const dom = renderer.domElement;
  dom.className = 'gl';
  dom.setAttribute('aria-label', 'Rack of painted canvases');
  mount.appendChild(dom);

  const scene = new THREE.Scene();
  scene.environment = studioEnv(renderer);
  const camera = new THREE.PerspectiveCamera(30, 1, 0.1, 50);
  camera.position.set(0, 0, 4.3);
  const key = new THREE.DirectionalLight(0xffffff, 1.5);
  key.position.set(-1.6, 2.6, 4);
  scene.add(key, new THREE.AmbientLight(0xffffff, 0.75));

  const geo = {
    canvas: canvasGeometry(),
    shadow: new THREE.PlaneGeometry(SIZE * 2.2, SIZE * 2.2),
  };
  const weave = weaveNormal();
  const mat = {
    shadow: new THREE.MeshBasicMaterial({ map: shadowTexture(), transparent: true, depthWrite: false }),
  };

  const group = new THREE.Group();
  scene.add(group);

  function makeCanvas(rel) {
    const root = new THREE.Group();
    const spin = new THREE.Group();
    root.add(spin);

    const front = new THREE.MeshStandardMaterial({ color: new THREE.Color(rel.glow), roughness: 0.62, normalMap: weave, normalScale: new THREE.Vector2(0.32, 0.32), envMapIntensity: 0.14, emissive: 0xffffff, emissiveIntensity: 0.88 });
    const back = new THREE.MeshStandardMaterial({ color: 0xc9b995, roughness: 0.85, envMapIntensity: 0.2, emissive: 0xffffff, emissiveIntensity: 0.86 });
    const body = new THREE.Mesh(geo.canvas, [front, front, front, front, front, back]);

    const shadow = new THREE.Mesh(geo.shadow, mat.shadow);
    shadow.position.set(0.05, -0.07, -DEPTH / 2 - 0.19);

    spin.add(shadow, body);
    root.visible = false;
    group.add(root);

    const k = 0.93 + rng(rel.index * 31 + 5)() * 0.13;
    const c = { rel, root, spin, front, back, scale: k, ready: false };
    root.traverse((o) => { if (o.isMesh) o.userData.item = c; });
    shadow.userData.item = null;
    return c;
  }

  const items = RELEASES.map(makeCanvas);
  const pressings = new Map();

  const toTexture = (canvas) => {
    const t = new THREE.CanvasTexture(canvas);
    t.colorSpace = THREE.SRGBColorSpace;
    t.anisotropy = Math.min(8, renderer.capabilities.getMaxAnisotropy());
    return t;
  };

  function paint(c) {
    const cv = c.coverCanvas || (c.coverCanvas = offscreen(TEX, TEX));
    drawCover(c.rel, cv, pressings.get(c.rel.id));
    const bk = c.backCanvas || (c.backCanvas = offscreen(TEX, TEX));
    if (!c.ready) drawBack(c.rel, bk);
    for (const [m, canvas] of [[c.front, cv], [c.back, bk]]) {
      if (m.map) m.map.needsUpdate = true;
      else m.map = toTexture(canvas);
      m.emissiveMap = m.map;
      m.color.set(0x2c2c2c);
      m.needsUpdate = true;
    }
    c.ready = true;
  }

  const state = {
    pos: 0, target: 0, snapAt: 0, spin: 0, spinVel: 0, dragging: false,
    mx: 0, my: 0, anim: null, running: true, par: 1,
    zoom: { index: -1, e: 0 },
  };

  function resize() {
    const w = mount.clientWidth, h = mount.clientHeight;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    // Keep the rack readable on tall narrow phones.
    camera.position.z = w / h < 0.8 ? 4.3 * (0.8 / (w / h)) * 0.92 : 4.3;
    camera.updateProjectionMatrix();
  }
  new ResizeObserver(resize).observe(mount);
  resize();

  // ── Layout: canvases leaning in a rack above and below the one you are looking at ──
  function place(c, d) {
    const a = Math.abs(d), s = Math.sign(d) || 0;
    const near = smooth(0, 1, a), far = Math.max(0, a - 1);
    const stepping = state.zoom.index === c.rel.index;
    const part = 1 + (stepping ? 0 : state.zoom.e * 1.5);
    const y = -s * (near * 1.0 + far * 0.34 - Math.max(0, far - 2) * 0.05) * part;
    const z = -near * 0.62 - far * 0.1 + (stepping ? state.zoom.e * ZOOM : 0);
    c.root.position.set(0, y, z);
    c.root.rotation.set(s * near * 0.92, 0, s * near * 0.012);
    c.root.scale.setScalar(lerp(c.scale, 1, stepping ? state.zoom.e : 0));
    c.root.visible = a < 6.5;
    return 1 - near;
  }

  const raycaster = new THREE.Raycaster();
  const ndc = new THREE.Vector2();
  function pick(x, y) {
    const r = dom.getBoundingClientRect();
    ndc.set(((x - r.left) / r.width) * 2 - 1, -((y - r.top) / r.height) * 2 + 1);
    raycaster.setFromCamera(ndc, camera);
    for (const h of raycaster.intersectObjects(group.children, true)) if (h.object.userData.item) return h.object.userData.item;
    return null;
  }

  // ── Input ──
  const goTo = (i) => { state.target += wrap(i - state.target); state.snapAt = 0; };
  const step = (n) => { state.target = Math.round(state.target) + n; state.snapAt = 0; };

  dom.addEventListener('wheel', (e) => {
    e.preventDefault();
    if (state.anim) return;
    const px = e.deltaMode === 1 ? e.deltaY * 28 : e.deltaY;
    state.target += clamp(px, -160, 160) * 0.0042;
    state.snapAt = performance.now() + 130;
  }, { passive: false });

  let press = null;
  dom.addEventListener('pointerdown', (e) => {
    if (e.button > 0 || state.anim) return;
    press = { x: e.clientX, y: e.clientY, lx: e.clientX, axis: null, t: performance.now(), startTarget: state.target };
    try { dom.setPointerCapture(e.pointerId); } catch { /* synthetic events */ }
  });
  dom.addEventListener('pointermove', (e) => {
    const r = dom.getBoundingClientRect();
    state.mx = ((e.clientX - r.left) / r.width) * 2 - 1;
    state.my = ((e.clientY - r.top) / r.height) * 2 - 1;
    onPointer?.(state.mx, state.my);
    if (!press) { state.hoverX = e.clientX; state.hoverY = e.clientY; state.hoverDirty = true; return; }
    const dx = e.clientX - press.x, dy = e.clientY - press.y;
    if (!press.axis && Math.hypot(dx, dy) > 6) {
      press.axis = Math.abs(dx) > Math.abs(dy) ? 'spin' : 'browse';
      state.dragging = true;
      mount.classList.add('is-dragging');
      onHover(null);
    }
    if (press.axis === 'spin') {
      const d = (e.clientX - press.lx) * 0.0105;
      state.spin += d;
      state.spinVel = lerp(state.spinVel, d * 26, 0.4);
    } else if (press.axis === 'browse') {
      state.target = press.startTarget - dy / (mount.clientHeight * 0.3);
      state.snapAt = Infinity;
    }
    press.lx = e.clientX;
  });
  dom.addEventListener('pointerup', (e) => {
    if (!press) return;
    const moved = press.axis, p = press;
    press = null;
    state.dragging = false;
    mount.classList.remove('is-dragging');
    if (moved === 'browse') { state.snapAt = 0; return; }
    if (moved || performance.now() - p.t > 600) return;
    const c = pick(e.clientX, e.clientY);
    if (!c) return;
    if (Math.abs(wrap(c.rel.index - state.pos)) < 0.5) onOpenRequest(c.rel);
    else goTo(c.rel.index);
  });
  dom.addEventListener('pointercancel', () => { press = null; state.dragging = false; mount.classList.remove('is-dragging'); });
  dom.addEventListener('pointerleave', () => onHover(null));

  // ── Animation ──
  let focusIdx = -1, queue = [], last = performance.now(), lastFace = 0;

  function queuePaints() {
    const center = Math.round(state.pos), order = [];
    for (let k = 0; k <= N / 2; k++) for (const s of k ? [1, -1] : [1]) order.push((((center + s * k) % N) + N) % N);
    queue = order.filter((i) => !items[i].ready);
  }

  function frame(now) {
    if (!state.running) return;
    requestAnimationFrame(frame);
    const dt = Math.min(0.05, (now - last) / 1000);
    last = now;

    if (queue.length) { const c = items[queue.shift()]; if (!c.ready) paint(c); }
    if (state.snapAt && now > state.snapAt && !state.dragging) { state.target = Math.round(state.target); state.snapAt = 0; }

    state.pos = lerp(state.pos, state.target, 1 - Math.exp(-dt * 9));
    if (Math.abs(state.target - state.pos) < 0.0005) state.pos = state.target;

    const idx = ((Math.round(state.pos) % N) + N) % N;
    if (idx !== focusIdx) {
      if (focusIdx !== -1) { state.spin = 0; state.spinVel = 0; sfx('flick'); }
      focusIdx = idx;
      lastFace = 0;
      queuePaints();
      onFocus(RELEASES[idx]);
    }

    // Spin: inertia while free, then settle on whichever face is nearest.
    if (!state.dragging && !state.anim) {
      state.spin += state.spinVel * dt;
      state.spinVel *= Math.exp(-dt * 3.2);
      const nearest = Math.round(state.spin / Math.PI);
      const settle = Math.abs(state.spinVel) < 2.2 ? 1 : 0;
      state.spin = lerp(state.spin, nearest * Math.PI, settle * (1 - Math.exp(-dt * 7)));
    }
    const face = Math.round(state.spin / Math.PI);
    if (face !== lastFace) { lastFace = face; sfx('turn'); }

    state.par = lerp(state.par, state.anim ? 0 : 1, 1 - Math.exp(-dt * 12));
    for (const c of items) {
      const f = place(c, wrap(c.rel.index - state.pos));
      const isFocus = c.rel.index === focusIdx;
      c.spin.rotation.y = lerp(c.spin.rotation.y, isFocus ? state.spin + state.mx * 0.14 * f * state.par : 0, isFocus ? 1 : 0.2);
      c.spin.rotation.x = isFocus ? state.my * 0.09 * f * state.par : 0;
    }

    if (state.anim) state.anim(now);

    if (state.hoverDirty && !state.anim) {
      state.hoverDirty = false;
      const c = pick(state.hoverX, state.hoverY);
      if (!c) onHover(null);
      else onHover({ x: state.hoverX, y: state.hoverY, label: Math.abs(wrap(c.rel.index - state.pos)) < 0.5 ? 'Paint' : c.rel.title });
    }
    renderer.render(scene, camera);
  }

  function tween(ms, fn) {
    return new Promise((res) => {
      const t0 = performance.now();
      state.anim = (now) => {
        const k = clamp((now - t0) / ms);
        fn(k);
        if (k >= 1) { state.anim = null; res(); }
      };
    });
  }

  const calm = matchMedia('(prefers-reduced-motion: reduce)').matches;

  const api = {
    get focused() { return RELEASES[focusIdx]; },
    next: () => step(1),
    prev: () => step(-1),
    goTo,
    jump(i) { state.pos = state.target = i; },
    flip() { state.spinVel = 0; state.spin = (Math.round(state.spin / Math.PI) + 1) * Math.PI; },
    setPressing(id, image) {
      if (image) pressings.set(id, image); else pressings.delete(id);
      const c = items.find((k) => k.rel.id === id);
      if (c?.ready) paint(c);
    },
    coverCanvas(i) {
      const c = items[i];
      if (!c.ready) paint(c);
      return c.coverCanvas;
    },

    // You step up to the canvas: it turns to face you, the rack parts, and it fills your view.
    async open(rel, onNearly) {
      const c = items[rel.index];
      if (!c.ready) paint(c);
      state.spinVel = 0;
      state.zoom.index = rel.index;
      const from = state.spin, to = Math.round(state.spin / (Math.PI * 2)) * Math.PI * 2;
      if (calm) { state.zoom.e = 1; onNearly(); return; }
      let fired = false;
      await tween(820, (k) => {
        state.spin = lerp(from, to, easeInOut(Math.min(1, k * 2.2)));
        state.zoom.e = easeInOut(k);
        if (k > 0.42 && !fired) { fired = true; onNearly(); }
      });
    },
    async close() {
      if (calm) { state.zoom.e = 0; state.zoom.index = -1; return; }
      await tween(720, (k) => { state.zoom.e = 1 - easeOut(k); });
      state.zoom.index = -1;
    },
    // Used on a deep link, where there is no rack yet to step back from.
    settleZoom() { state.zoom.e = 1; },
    pause() { state.running = false; },
    resume() {
      if (state.running) return;
      state.running = true;
      last = performance.now();
      requestAnimationFrame(frame);
    },
    state,
  };

  queuePaints();
  requestAnimationFrame(frame);
  return api;
}

export function webglAvailable() {
  try { return !!document.createElement('canvas').getContext('webgl2'); } catch { return false; }
}
