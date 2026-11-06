// All the sound in the site, synthesised live: no audio files. Starts on the first gesture, as browsers require.

const KEY = 'wp.muted';
const saved = () => { try { return localStorage.getItem(KEY) === '1'; } catch { return false; } };

let ac = null, master = null, room = null, white = null, brown = null;
let muted = saved(), wantBed = null, bed = null;

// What the hand sounds like on each surface. Faster strokes open the filter and raise the level.
const TIMBRES = {
  bristle: { type: 'bandpass', f: 1300, q: 0.7, g: 0.13, sweep: 1400 },
  pencil: { type: 'bandpass', f: 3800, q: 1.3, g: 0.05, sweep: 1600 },
  chalk: { type: 'bandpass', f: 2400, q: 1.6, g: 0.08, sweep: 1200 },
  scratch: { type: 'bandpass', f: 3000, q: 3.2, g: 0.09, sweep: 2600 },
  sand: { type: 'highpass', f: 3600, q: 0.5, g: 0.06, sweep: 1500 },
  water: { type: 'lowpass', f: 520, q: 2.4, g: 0.16, sweep: 620 },
  glass: { type: 'bandpass', f: 5200, q: 7, g: 0.035, sweep: 1500 },
  shimmer: { type: 'bandpass', f: 6400, q: 3, g: 0.02, sweep: 2400 },
  sizzle: { type: 'highpass', f: 5200, q: 0.8, g: 0.05, sweep: 900, crackle: true },
};

function noise(kind) {
  const n = ac.sampleRate * 3, b = ac.createBuffer(1, n, ac.sampleRate), d = b.getChannelData(0);
  let last = 0;
  for (let i = 0; i < n; i++) {
    const w = Math.random() * 2 - 1;
    if (kind === 'brown') { last = (last + 0.02 * w) / 1.02; d[i] = last * 3.5; } else d[i] = w;
  }
  return b;
}

// A short generated impulse, so everything sits in the same large, soft room.
function impulse(seconds = 2.2) {
  const n = ac.sampleRate * seconds, b = ac.createBuffer(2, n, ac.sampleRate);
  for (let c = 0; c < 2; c++) {
    const d = b.getChannelData(c);
    for (let i = 0; i < n; i++) d[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / n, 3.2);
  }
  return b;
}

function boot() {
  if (ac) return true;
  const A = window.AudioContext || window.webkitAudioContext;
  if (!A) return false;
  ac = new A();
  white = noise('white');
  brown = noise('brown');
  master = ac.createGain();
  master.gain.value = muted ? 0 : 0.85;
  const limit = ac.createDynamicsCompressor();
  limit.threshold.value = -14;
  limit.ratio.value = 6;
  master.connect(limit);
  limit.connect(ac.destination);
  const verb = ac.createConvolver();
  verb.buffer = impulse();
  room = ac.createGain();
  room.gain.value = 0.3;
  room.connect(verb);
  verb.connect(master);
  brush.init();
  return true;
}

export function audioContext() {
  if (!boot()) return null;
  if (ac.state === 'suspended') ac.resume();
  return ac;
}
export function bus() { boot(); return master; }

// Called from the first gesture, then ambience can begin.
export function unlock() {
  if (!audioContext()) return;
  if (wantBed && !bed) startBed(wantBed);
}

export const isMuted = () => muted;
export function setMuted(v) {
  muted = v;
  try { localStorage.setItem(KEY, v ? '1' : '0'); } catch { /* private window */ }
  if (ac) master.gain.setTargetAtTime(v ? 0 : 0.85, ac.currentTime, 0.05);
}

function tone(freq, { dur = 0.2, vol = 0.1, type = 'sine', to = null, attack = 0.004, wet = 0, delay = 0, pan = 0 } = {}) {
  const t = ac.currentTime + delay, o = ac.createOscillator(), g = ac.createGain();
  o.type = type;
  o.frequency.setValueAtTime(freq, t);
  if (to) o.frequency.exponentialRampToValueAtTime(to, t + dur);
  g.gain.setValueAtTime(0.0001, t);
  g.gain.exponentialRampToValueAtTime(vol, t + attack);
  g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
  o.connect(g);
  let out = g;
  if (pan && ac.createStereoPanner) { const p = ac.createStereoPanner(); p.pan.value = pan; g.connect(p); out = p; }
  out.connect(master);
  if (wet) { const s = ac.createGain(); s.gain.value = wet; out.connect(s); s.connect(room); }
  o.start(t);
  o.stop(t + dur + 0.05);
}

function burst({ dur = 0.1, vol = 0.1, f = 2000, q = 1, type = 'bandpass', to = null, attack = 0.002, wet = 0, delay = 0, src = white } = {}) {
  const t = ac.currentTime + delay, s = ac.createBufferSource(), fl = ac.createBiquadFilter(), g = ac.createGain();
  s.buffer = src;
  s.loop = true;
  fl.type = type;
  fl.frequency.setValueAtTime(f, t);
  if (to) fl.frequency.exponentialRampToValueAtTime(to, t + dur);
  fl.Q.value = q;
  g.gain.setValueAtTime(0.0001, t);
  g.gain.exponentialRampToValueAtTime(vol, t + attack);
  g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
  s.connect(fl);
  fl.connect(g);
  g.connect(master);
  if (wet) { const w = ac.createGain(); w.gain.value = wet; g.connect(w); w.connect(room); }
  s.start(t, Math.random() * 2);
  s.stop(t + dur + 0.05);
}

const SFX = {
  hover: () => tone(2300, { dur: 0.025, vol: 0.008 }),
  click: () => { burst({ dur: 0.03, vol: 0.05, f: 2600, q: 2 }); tone(620, { dur: 0.05, vol: 0.03, type: 'triangle', to: 380 }); },
  pop: () => tone(520, { dur: 0.09, vol: 0.09, to: 980, attack: 0.008, wet: 0.2 }),
  tock: () => { tone(340, { dur: 0.07, vol: 0.09, type: 'triangle', to: 210 }); burst({ dur: 0.02, vol: 0.03, f: 3000 }); },
  on: () => { tone(620, { dur: 0.07, vol: 0.05, type: 'triangle' }); tone(930, { dur: 0.09, vol: 0.05, type: 'triangle', delay: 0.05, wet: 0.2 }); },
  off: () => { tone(760, { dur: 0.07, vol: 0.05, type: 'triangle' }); tone(500, { dur: 0.09, vol: 0.05, type: 'triangle', delay: 0.05 }); },
  slide: () => tone(1500, { dur: 0.02, vol: 0.012, type: 'triangle' }),
  flick: () => { burst({ dur: 0.1, vol: 0.09, f: 900, q: 0.8, to: 2400, attack: 0.02 }); tone(170, { dur: 0.12, vol: 0.09, type: 'triangle', to: 95 }); },
  turn: () => burst({ dur: 0.26, vol: 0.06, f: 500, q: 0.9, to: 1800, attack: 0.08, wet: 0.2 }),
  // A loaded brush dragged right across the screen, with a soft swell under it.
  swish: () => {
    burst({ dur: 0.62, vol: 0.2, f: 700, q: 0.6, to: 3200, attack: 0.1, wet: 0.35 });
    [220, 330, 494].forEach((n, i) => tone(n, { dur: 1.3, vol: 0.035, attack: 0.25, delay: i * 0.07, wet: 0.7 }));
  },
  back: () => {
    burst({ dur: 0.5, vol: 0.16, f: 3000, q: 0.6, to: 600, attack: 0.06, wet: 0.35 });
    [494, 330, 247].forEach((n, i) => tone(n, { dur: 1, vol: 0.03, attack: 0.2, delay: i * 0.06, wet: 0.7 }));
  },
  hang: () => { tone(150, { dur: 0.16, vol: 0.16, type: 'triangle', to: 80 }); burst({ dur: 0.06, vol: 0.06, f: 1500, delay: 0.02 }); [523, 659, 784].forEach((n, i) => tone(n, { dur: 0.5, vol: 0.04, delay: 0.12 + i * 0.07, wet: 0.6 })); },
  crack: () => {
    tone(120, { dur: 0.2, vol: 0.2, type: 'triangle', to: 55 });
    for (let i = 0; i < 7; i++) burst({ dur: 0.03 + Math.random() * 0.05, vol: 0.14, f: 2500 + Math.random() * 4000, q: 4, delay: i * 0.018 + Math.random() * 0.02, wet: 0.3 });
    for (let i = 0; i < 5; i++) tone(1800 + Math.random() * 2600, { dur: 0.12, vol: 0.03, delay: 0.1 + i * 0.05, wet: 0.5 });
  },
  clink: () => { const f = 1700 + Math.random() * 900; tone(f, { dur: 0.3, vol: 0.06, wet: 0.5 }); tone(f * 2.76, { dur: 0.12, vol: 0.02, wet: 0.4 }); },
  shimmer: () => [659, 784, 988, 1175, 1319, 1568].forEach((n, i) => tone(n, { dur: 1.3, vol: 0.04, attack: 0.01, delay: i * 0.08, wet: 0.8 })),
  plop: () => tone(280 + Math.random() * 140, { dur: 0.16, vol: 0.13, to: 820, attack: 0.012, wet: 0.45 }),
  thud: () => { tone(105, { dur: 0.2, vol: 0.2, type: 'triangle', to: 52 }); burst({ dur: 0.08, vol: 0.05, f: 500, q: 0.8, src: brown }); },
  paper: () => { burst({ dur: 0.34, vol: 0.09, f: 2800, q: 0.6, to: 1100, attack: 0.05, wet: 0.2 }); burst({ dur: 0.12, vol: 0.05, f: 5000, q: 1, delay: 0.12 }); },
  tink: () => { const f = 2300 + Math.random() * 1400; tone(f, { dur: 0.5, vol: 0.05, wet: 0.7 }); tone(f * 1.5, { dur: 0.3, vol: 0.02, wet: 0.6 }); },
  breath: () => burst({ dur: 1.1, vol: 0.13, f: 900, q: 0.5, to: 400, attack: 0.35, wet: 0.2 }),
  shake: () => { for (let i = 0; i < 9; i++) burst({ dur: 0.05, vol: 0.09, f: 3800, q: 1.2, delay: i * 0.055 }); },
  blip: () => tone(420 + Math.random() * 500, { dur: 0.05, vol: 0.03, type: 'square' }),
};

export function sfx(name) {
  if (!ac || muted || ac.state !== 'running') return;
  SFX[name]?.();
}

// The continuous noise under a stroke, shared by every toy.
export const brush = {
  src: null, filter: null, gain: null, cfg: null, level: 0,
  init() {
    this.src = ac.createBufferSource();
    this.src.buffer = white;
    this.src.loop = true;
    this.filter = ac.createBiquadFilter();
    this.gain = ac.createGain();
    this.gain.gain.value = 0;
    this.src.connect(this.filter);
    this.filter.connect(this.gain);
    this.gain.connect(master);
    this.src.start();
  },
  start(timbre) {
    if (!ac) return;
    this.cfg = TIMBRES[timbre] || null;
    if (!this.cfg) return;
    this.filter.type = this.cfg.type;
    this.filter.frequency.value = this.cfg.f;
    this.filter.Q.value = this.cfg.q;
    this.gain.gain.setTargetAtTime(this.cfg.g * 0.25, ac.currentTime, 0.02);
  },
  move(speed) {
    if (!ac || !this.cfg) return;
    const k = Math.min(1, speed / 1.6), c = this.cfg, t = ac.currentTime;
    const flicker = c.crackle ? 0.35 + Math.random() * 1.3 : 1;
    this.gain.gain.setTargetAtTime(c.g * (0.25 + k * 0.85) * flicker, t, 0.03);
    this.filter.frequency.setTargetAtTime(c.f + c.sweep * k, t, 0.05);
  },
  end() {
    if (!ac || !this.cfg) return;
    this.gain.gain.setTargetAtTime(0, ac.currentTime, 0.08);
    this.cfg = null;
  },
};

// Spin Cycle's motor: a low hum that climbs with the platter.
let motorNodes = null;
export function motor(level) {
  if (!ac) return;
  if (!motorNodes) {
    const o = ac.createOscillator(), g = ac.createGain();
    o.type = 'sawtooth';
    const lp = ac.createBiquadFilter();
    lp.type = 'lowpass';
    lp.frequency.value = 340;
    g.gain.value = 0;
    o.connect(lp);
    lp.connect(g);
    g.connect(master);
    o.start();
    motorNodes = { o, g };
  }
  motorNodes.o.frequency.setTargetAtTime(38 + level * 62, ac.currentTime, 0.1);
  motorNodes.g.gain.setTargetAtTime(level * 0.035, ac.currentTime, 0.1);
}
export function stopMotor() {
  if (!motorNodes) return;
  const { o, g } = motorNodes;
  g.gain.setTargetAtTime(0, ac.currentTime, 0.1);
  o.stop(ac.currentTime + 0.6);
  motorNodes = null;
}

// ── Ambience: the room each toy lives in ──
const SCALE = [220, 247, 294, 330, 370, 440, 494, 587, 659];

function loop(buffer, type, freq, q, level, out) {
  const s = ac.createBufferSource(), f = ac.createBiquadFilter(), g = ac.createGain();
  s.buffer = buffer;
  s.loop = true;
  f.type = type;
  f.frequency.value = freq;
  f.Q.value = q;
  g.gain.value = level;
  s.connect(f);
  f.connect(g);
  g.connect(out);
  s.start(0, Math.random() * 2);
  return { s, f, g };
}

function drift(param, centre, depth, rate, out) {
  const l = ac.createOscillator(), d = ac.createGain();
  l.frequency.value = rate;
  d.gain.value = depth;
  param.value = centre;
  l.connect(d);
  d.connect(param);
  l.start();
  out.push(l);
}

function pad(notes, level, out, stops) {
  notes.forEach((n, i) => {
    const o = ac.createOscillator(), g = ac.createGain();
    o.frequency.value = n;
    o.detune.value = (i - 1) * 4;
    o.connect(g);
    g.connect(out);
    const send = ac.createGain();
    send.gain.value = 0.5;
    g.connect(send);
    send.connect(room);
    drift(g.gain, level, level * 0.9, 0.03 + i * 0.017, stops);
    o.start();
    stops.push(o);
  });
}

const BEDS = {
  // A big quiet studio: air, a slow chord, and now and then a distant note.
  studio(out, stops, every) {
    stops.push(loop(brown, 'lowpass', 280, 0.3, 0.1, out).s);
    pad([110, 165, 247], 0.012, out, stops);
    every(7, 13, () => tone(SCALE[Math.floor(Math.random() * SCALE.length)] * 2, { dur: 2.4, vol: 0.016, attack: 0.02, wet: 1, pan: Math.random() - 0.5 }));
  },
  rain(out, stops, every) {
    const r = loop(white, 'bandpass', 2600, 0.4, 0.028, out);
    stops.push(r.s, loop(brown, 'lowpass', 300, 0.4, 0.12, out).s);
    drift(r.g.gain, 0.028, 0.01, 0.09, stops);
    every(0.15, 0.9, () => burst({ dur: 0.03, vol: 0.02 + Math.random() * 0.03, f: 1700 + Math.random() * 3000, q: 5, wet: 0.25 }));
  },
  water(out, stops, every) {
    const w = loop(brown, 'lowpass', 460, 1.2, 0.2, out);
    stops.push(w.s);
    drift(w.f.frequency, 460, 180, 0.11, stops);
    every(1.2, 4.5, () => tone(280 + Math.random() * 260, { dur: 0.15, vol: 0.022, to: 640 + Math.random() * 300, attack: 0.02, wet: 0.7 }));
  },
  wind(out, stops) {
    const w = loop(white, 'bandpass', 620, 1.4, 0.03, out);
    stops.push(w.s, loop(brown, 'lowpass', 220, 0.3, 0.09, out).s);
    drift(w.f.frequency, 620, 300, 0.05, stops);
    drift(w.g.gain, 0.03, 0.018, 0.07, stops);
  },
  night(out, stops, every) {
    stops.push(loop(brown, 'lowpass', 200, 0.3, 0.1, out).s);
    pad([82, 123, 185, 277], 0.01, out, stops);
    every(4, 10, () => tone(1320 + Math.random() * 900, { dur: 1.6, vol: 0.009, attack: 0.1, wet: 1, pan: Math.random() * 1.6 - 0.8 }));
  },
  hum(out, stops) {
    const o = ac.createOscillator(), g = ac.createGain();
    o.type = 'triangle';
    o.frequency.value = 50;
    g.gain.value = 0.014;
    o.connect(g);
    g.connect(out);
    o.start();
    stops.push(o, loop(white, 'bandpass', 7400, 2, 0.004, out).s);
  },
};

function startBed(name) {
  const make = BEDS[name];
  if (!make || !ac) return;
  const out = ac.createGain();
  out.gain.value = 0.0001;
  // Ambience sits well under everything else: you should notice it only if it stopped.
  out.gain.exponentialRampToValueAtTime(0.4, ac.currentTime + 1.6);
  out.connect(master);
  const stops = [], timers = [];
  const every = (min, max, fn) => {
    const go = () => {
      timers[0] = setTimeout(() => { if (!muted && !document.hidden) fn(); go(); }, (min + Math.random() * (max - min)) * 1000);
    };
    go();
  };
  make(out, stops, every);
  bed = { name, out, stops, timers };
}

function stopBed() {
  if (!bed) return;
  const b = bed;
  bed = null;
  b.timers.forEach(clearTimeout);
  b.out.gain.setTargetAtTime(0.0001, ac.currentTime, 0.4);
  setTimeout(() => {
    b.stops.forEach((n) => { try { n.stop(); } catch { /* already stopped */ } });
    b.out.disconnect();
  }, 2200);
}

export function ambience(name) {
  if (wantBed === name) return;
  wantBed = name;
  if (!ac) return;
  stopBed();
  startBed(name);
}
