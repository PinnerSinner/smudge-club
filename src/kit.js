// Shared toolkit every toy is built on: surfaces, pointer handling, dock controls, undo.
import { audioContext, bus, brush } from './sound.js';

export const TAU = Math.PI * 2;
export const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));
export const lerp = (a, b, t) => a + (b - a) * t;
export const smooth = (a, b, v) => { const t = clamp((v - a) / (b - a)); return t * t * (3 - 2 * t); };
export const dist = (ax, ay, bx, by) => Math.hypot(ax - bx, ay - by);
export const pick = (a, r = Math.random) => a[Math.floor(r() * a.length)];

export function rng(seed = 1) {
  let s = seed >>> 0 || 1;
  return () => {
    s = (s + 0x6d2b79f5) >>> 0;
    let t = s;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// Small value noise, enough for wobble and texture.
export function noise2(seed = 1) {
  const r = rng(seed), p = new Float32Array(65536);
  for (let i = 0; i < p.length; i++) p[i] = r();
  const at = (x, y) => p[((x & 255) << 8) | (y & 255)];
  return (x, y) => {
    const xi = Math.floor(x), yi = Math.floor(y), fx = x - xi, fy = y - yi;
    const u = fx * fx * (3 - 2 * fx), v = fy * fy * (3 - 2 * fy);
    return lerp(lerp(at(xi, yi), at(xi + 1, yi), u), lerp(at(xi, yi + 1), at(xi + 1, yi + 1), u), v);
  };
}

export function hexRgb(h) {
  const n = parseInt(h.slice(1), 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}
export const rgba = (h, a) => { const [r, g, b] = hexRgb(h); return `rgba(${r},${g},${b},${a})`; };
export function hsl(h, s, l, a = 1) { return `hsla(${h},${s}%,${l}%,${a})`; }
export function shade(h, k) {
  const [r, g, b] = hexRgb(h);
  const f = (c) => Math.round(clamp(k < 0 ? c * (1 + k) : c + (255 - c) * k, 0, 255));
  return `rgb(${f(r)},${f(g)},${f(b)})`;
}

export function offscreen(w, h) {
  const c = document.createElement('canvas');
  c.width = Math.max(1, Math.round(w));
  c.height = Math.max(1, Math.round(h));
  return c;
}

const DPR = () => Math.min(window.devicePixelRatio || 1, 2);

// Builds the context handed to a toy's mount(). Everything registered here is torn down by destroy().
export function createToyContext({ stage, dock, tipEl, toast, timbre = 'none' }) {
  const cleanups = [];
  const resizers = new Set();
  let raf = 0, alive = true;
  const loops = new Set();
  let last = performance.now();

  const tick = (now) => {
    if (!alive) return;
    const dt = Math.min(0.05, (now - last) / 1000);
    last = now;
    for (const fn of loops) fn(dt, now / 1000);
    raf = requestAnimationFrame(tick);
  };

  const on = (el, ev, fn, opt) => {
    el.addEventListener(ev, fn, opt);
    cleanups.push(() => el.removeEventListener(ev, fn, opt));
  };

  const stageRect = () => stage.getBoundingClientRect();
  const relayout = () => resizers.forEach((f) => f());
  const ro = new ResizeObserver(relayout);
  ro.observe(stage);
  cleanups.push(() => ro.disconnect());

  const ctx = {
    stage, dock, on, toast,
    snapshot: null, clear: null, undo: null,

    // A fixed-resolution drawing surface. Resizing the window refits it, so art is never lost.
    // bleed: fills the viewport. Otherwise it sits between the top bar and the dock.
    surface({ aspect = null, bleed = false, paper = false, maxPx = 2400, scale = 1, bg = null } = {}) {
      const area = () => {
        const r = stageRect();
        const pad = bleed ? 0 : 16, top = bleed ? 0 : 66, bottom = bleed ? 0 : 80;
        return { x: pad, y: top, w: r.width - pad * 2, h: r.height - top - bottom };
      };
      const fit = (a) => {
        if (!aspect) return { w: a.w, h: a.h };
        return a.w / a.h > aspect ? { w: a.h * aspect, h: a.h } : { w: a.w, h: a.w / aspect };
      };
      const a0 = area();
      const f0 = fit(a0);
      const W = Math.round(f0.w), H = Math.round(f0.h);
      const px = Math.min(DPR() * scale, maxPx / Math.max(W, H));

      const el = document.createElement('div');
      el.className = 'surface' + (paper ? ' paper' : '');
      if (bg) el.style.background = bg;
      stage.appendChild(el);

      const place = () => {
        const a = area();
        let w, h;
        if (aspect) ({ w, h } = fit(a));
        else { const k = Math.min(a.w / W, a.h / H); w = W * k; h = H * k; }
        el.style.width = w + 'px';
        el.style.height = h + 'px';
        el.style.left = a.x + (a.w - w) / 2 + 'px';
        el.style.top = a.y + (a.h - h) / 2 + 'px';
      };
      place();
      resizers.add(place);

      const s = {
        el, W, H, px,
        layer({ gl = false, alpha = true, hit = true, resolution = 1 } = {}) {
          const c = document.createElement('canvas');
          c.width = Math.round(W * px * resolution);
          c.height = Math.round(H * px * resolution);
          if (!hit) c.className = 'nohit';
          el.appendChild(c);
          if (gl) return { canvas: c };
          const g = c.getContext('2d', { alpha, willReadFrequently: false });
          g.scale(px * resolution, px * resolution);
          g.lineCap = 'round';
          g.lineJoin = 'round';
          return { canvas: c, g };
        },
        // offscreen canvas in the surface's coordinate space
        buffer(resolution = 1, opts = {}) {
          const c = offscreen(W * px * resolution, H * px * resolution);
          const g = c.getContext('2d', opts);
          g.scale(px * resolution, px * resolution);
          g.lineCap = 'round';
          g.lineJoin = 'round';
          return { canvas: c, g };
        },
        // Pointer drawing in surface coordinates, with coalesced events for smooth lines.
        pointer(h) {
          let down = false, track = null;
          const toLocal = (e) => {
            const r = el.getBoundingClientRect();
            return { x: ((e.clientX - r.left) / r.width) * W, y: ((e.clientY - r.top) / r.height) * H, pressure: e.pressure || 0.5, shift: e.shiftKey, alt: e.altKey, button: e.button, type: e.pointerType };
          };
          on(el, 'pointerdown', (e) => {
            if (e.button > 0) return;
            down = true;
            try { el.setPointerCapture(e.pointerId); } catch { /* synthetic events have no capture */ }
            e.preventDefault();
            ctx.dismissTip();
            brush.start(timbre);
            track = { x: e.clientX, y: e.clientY, t: performance.now() };
            h.down?.(toLocal(e));
          });
          on(el, 'pointermove', (e) => {
            if (!down) { h.hover?.(toLocal(e)); return; }
            const now = performance.now();
            brush.move(Math.hypot(e.clientX - track.x, e.clientY - track.y) / Math.max(1, now - track.t));
            track = { x: e.clientX, y: e.clientY, t: now };
            const list = e.getCoalescedEvents?.() || [];
            if (list.length > 1) for (const c of list) h.move?.(toLocal(c));
            else h.move?.(toLocal(e));
          });
          const end = (e) => { if (down) { down = false; brush.end(); h.up?.(toLocal(e)); } };
          on(el, 'pointerup', end);
          on(el, 'pointercancel', end);
          on(el, 'pointerleave', (e) => { if (!down) h.leave?.(toLocal(e)); });
        },
      };
      return s;
    },

    // A raster undo stack for toys that paint onto one canvas.
    rasterUndo(canvas, limit = 16) {
      const stack = [];
      const g = canvas.getContext('2d');
      const push = () => {
        const c = offscreen(canvas.width, canvas.height);
        c.getContext('2d').drawImage(canvas, 0, 0);
        stack.push(c);
        if (stack.length > limit) stack.shift();
      };
      ctx.undo = () => {
        const c = stack.pop();
        if (!c) return;
        g.save();
        g.setTransform(1, 0, 0, 1, 0, 0);
        g.globalCompositeOperation = 'copy';
        g.drawImage(c, 0, 0);
        g.restore();
      };
      return push;
    },

    loop(fn) {
      loops.add(fn);
      if (!raf) { last = performance.now(); raf = requestAnimationFrame(tick); }
      return () => loops.delete(fn);
    },

    hint(text) {
      tipEl.textContent = text;
      tipEl.classList.remove('off');
      const t = setTimeout(ctx.dismissTip, 7000);
      cleanups.push(() => clearTimeout(t));
    },
    dismissTip() { tipEl.classList.add('off'); },

    ui: {
      sep() { const d = document.createElement('div'); d.className = 'dock__sep'; dock.appendChild(d); },
      swatches(colors, value, fn) {
        const w = document.createElement('div');
        w.className = 'sw';
        const btns = colors.map((c) => {
          const b = document.createElement('button');
          b.style.background = c;
          b.setAttribute('aria-label', `Colour ${c}`);
          b.onclick = () => set(c, true);
          w.appendChild(b);
          return [c, b];
        });
        const set = (c, fire) => { btns.forEach(([k, b]) => b.classList.toggle('on', k === c)); if (fire) fn(c); };
        set(value);
        dock.appendChild(w);
        return { set: (c) => set(c, false) };
      },
      slider(label, min, max, value, fn, step = 1) {
        const l = document.createElement('label');
        l.className = 'ctl';
        l.textContent = label;
        const i = document.createElement('input');
        Object.assign(i, { type: 'range', min, max, step, value });
        i.oninput = () => fn(+i.value);
        l.appendChild(i);
        dock.appendChild(l);
        return i;
      },
      seg(options, value, fn) {
        const w = document.createElement('div');
        w.className = 'seg';
        const btns = options.map((o) => {
          const [v, label] = Array.isArray(o) ? o : [o, o];
          const b = document.createElement('button');
          b.textContent = label;
          b.onclick = () => { set(v); fn(v); };
          w.appendChild(b);
          return [v, b];
        });
        const set = (v) => btns.forEach(([k, b]) => b.classList.toggle('on', k === v));
        set(value);
        dock.appendChild(w);
        return { set };
      },
      button(label, fn, cls = '') {
        const b = document.createElement('button');
        b.className = 'btn ' + cls;
        b.textContent = label;
        b.onclick = fn;
        dock.appendChild(b);
        return b;
      },
      toggle(label, value, fn) {
        const b = document.createElement('button');
        b.className = 'btn' + (value ? ' on' : '');
        b.textContent = label;
        b.setAttribute('aria-pressed', value);
        b.onclick = () => { value = !value; b.classList.toggle('on', value); b.setAttribute('aria-pressed', value); fn(value); };
        dock.appendChild(b);
        return b;
      },
      text(value, fn, placeholder = '') {
        const i = document.createElement('input');
        i.className = 'txt';
        i.type = 'text';
        i.value = value;
        i.placeholder = placeholder;
        i.spellcheck = false;
        i.oninput = () => fn(i.value);
        i.addEventListener('keydown', (e) => e.stopPropagation());
        dock.appendChild(i);
        return i;
      },
      readout(text = '') {
        const s = document.createElement('span');
        s.className = 'readout';
        s.textContent = text;
        dock.appendChild(s);
        return s;
      },
    },

    destroy() {
      alive = false;
      cancelAnimationFrame(raf);
      loops.clear();
      resizers.clear();
      cleanups.forEach((f) => f());
      stage.replaceChildren();
      dock.replaceChildren();
      dock.className = 'dock';
    },
  };
  return ctx;
}

export function pluck(freq, { dur = 1.4, vol = 0.18, type = 'triangle', pan = 0 } = {}) {
  const a = audioContext();
  if (!a) return;
  const t = a.currentTime, o = a.createOscillator(), g = a.createGain();
  o.type = type;
  o.frequency.setValueAtTime(freq, t);
  g.gain.setValueAtTime(0, t);
  g.gain.linearRampToValueAtTime(vol, t + 0.006);
  g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
  let out = g;
  if (a.createStereoPanner) { const p = a.createStereoPanner(); p.pan.value = pan; g.connect(p); out = p; }
  o.connect(g);
  out.connect(bus());
  o.start(t);
  o.stop(t + dur + 0.05);
}

// Soft paper grain drawn over a context, used by several toys and covers.
export function paperGrain(g, w, h, { seed = 3, alpha = 0.05, scale = 1 } = {}) {
  const r = rng(seed), n = Math.floor((w * h) / 26);
  g.save();
  for (let i = 0; i < n; i++) {
    const v = r() > 0.5 ? 255 : 0;
    g.fillStyle = `rgba(${v},${v},${v},${alpha * r()})`;
    g.fillRect(r() * w, r() * h, scale * (0.6 + r() * 1.4), scale * (0.6 + r() * 1.4));
  }
  g.restore();
}
