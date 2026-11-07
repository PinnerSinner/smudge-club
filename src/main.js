// App shell: builds the page, routes between the rack and the toys, and handles hanging your work.
import { MAKER, RELEASES, SITE } from './catalogue.js';
import { createShelf, webglAvailable } from './shelf.js';
import { createBackdrop } from './backdrop.js';
import { createWipe } from './wipe.js';
import { createAlive } from './alive.js';
import { createAuto } from './auto.js';
import { drawCover, setMakerMark } from './covers.js';
import logo from '../assets/marcoverse.png';
import { createToyContext, offscreen, rng } from './kit.js';
import { ambience, isMuted, setMuted, sfx, stopMotor, unlock } from './sound.js';

const $ = (html) => { const t = document.createElement('template'); t.innerHTML = html.trim(); return t.content.firstChild; };
const ICON = {
  back: '<svg viewBox="0 0 24 24"><path d="M15 5l-7 7 7 7"/></svg>',
  undo: '<svg viewBox="0 0 24 24"><path d="M9 7L4 12l5 5M4 12h11a5 5 0 010 10h-2"/></svg>',
  clear: '<svg viewBox="0 0 24 24"><path d="M5 7h14M10 7V4h4v3M7 7l1 13h8l1-13"/></svg>',
  save: '<svg viewBox="0 0 24 24"><path d="M12 4v11M7 11l5 5 5-5M5 20h14"/></svg>',
  hang: '<svg viewBox="0 0 24 24"><path d="M12 3v4M12 7L5 12M12 7l7 5M4 12h16v9H4z"/></svg>',
  spark: '<svg viewBox="0 0 24 24"><path d="M12 3l1.8 6.2L20 11l-6.2 1.8L12 19l-1.8-6.2L4 11l6.2-1.8zM19 17l.7 2.3L22 20l-2.3.7L19 23l-.7-2.3L16 20l2.3-.7z"/></svg>',
  grid: '<svg viewBox="0 0 24 24"><path d="M4 4h6v6H4zM14 4h6v6h-6zM4 14h6v6H4zM14 14h6v6h-6z"/></svg>',
  auto: '<svg viewBox="0 0 24 24"><path d="M4 20c3-1 4-3 5-5l3 3c-2 1-4 2-8 2zM10 13l8-9 3 3-9 8z"/></svg>',
  moon: '<svg viewBox="0 0 24 24"><path d="M20 14A8 8 0 1110 4a7 7 0 0010 10z"/></svg>',
  sound: '<svg viewBox="0 0 24 24"><path d="M4 9v6h4l5 4V5L8 9zM16 9a4 4 0 010 6M18.500 6.500a8 8 0 010 11"/></svg>',
  silent: '<svg viewBox="0 0 24 24"><path d="M4 9v6h4l5 4V5L8 9zM17 9.500l4 5M21 9.500l-4 5"/></svg>',
};

const app = document.getElementById('app');
document.title = SITE.name;
const store = {
  get(k) { try { return localStorage.getItem(k); } catch { return null; } },
  set(k, v) { try { localStorage.setItem(k, v); return true; } catch { return false; } },
  del(k) { try { localStorage.removeItem(k); } catch { /* private window */ } },
};
const hangKey = (id) => `mym.pressing.${id}`;
const badge = `<a class="maker" href="${MAKER.url}" target="_blank" rel="noopener" aria-label="Made by ${MAKER.name}"><img src="${logo}" alt="${MAKER.name} logo"><span>Made by<br><b>${MAKER.name}</b></span></a>`;

// ── Rack DOM ──
const shelfEl = $(`<section class="shelf" aria-label="${SITE.name} rack">
  <div class="shelf__grain"></div>
  <header class="top">
    <h1 class="brand" style="margin:0;font-weight:400">${SITE.name}</h1>
    <div class="top__right">
      <button class="round" data-act="cat" aria-label="See the whole collection">${ICON.grid}<span class="lbl">Collection</span></button>
      <button class="round" data-act="sound" aria-label="Sound on or off"></button>
      <button class="round" data-act="theme" aria-label="Switch between dark and light">${ICON.moon}</button>
    </div>
  </header>
  <div class="credit" aria-live="polite">
    <div class="credit__n"><b class="n"></b> / ${String(RELEASES.length).padStart(2, '0')} &nbsp; <span class="c"></span></div>
    <h2 class="credit__t"></h2>
    <p class="credit__s"></p>
    <button class="credit__play">Pick up the brush ↗</button>
  </div>
  ${badge}
  <div class="hint">Scroll the rack · Drag to turn · Click to paint</div>
  <nav class="ticks" aria-label="Jump to a canvas"></nav>
  <div class="pill"></div>
</section>`);
app.appendChild(shelfEl);

// Grain tile, so the stage has some tooth to it.
{
  const c = offscreen(220, 220), g = c.getContext('2d'), r = rng(4), im = g.createImageData(220, 220);
  for (let i = 0; i < im.data.length; i += 4) { const v = r() * 255; im.data[i] = im.data[i + 1] = im.data[i + 2] = v; im.data[i + 3] = 255; }
  g.putImageData(im, 0, 0);
  shelfEl.querySelector('.shelf__grain').style.backgroundImage = `url(${c.toDataURL()})`;
}

const catEl = $(`<section class="cat" aria-label="Collection" aria-hidden="true">
  <div class="cat__head"><div class="brand">The collection</div><button class="round" data-act="catclose">Close</button></div>
  <div class="cat__grid"></div><div class="cat__foot">${badge}</div></section>`);
app.appendChild(catEl);

const toyEl = $(`<section class="toy" aria-hidden="true">
  <div class="toy__stage"></div>
  <div class="toy__bar">
    <button class="round" data-act="back" aria-label="Back to the rack">${ICON.back}<span class="lbl">Rack</span></button>
    <div class="toy__title"><b></b><span></span></div>
    <a class="toy__maker" href="${MAKER.url}" target="_blank" rel="noopener" aria-label="Made by ${MAKER.name}" title="Made by ${MAKER.name}"><img src="${logo}" alt="${MAKER.name} logo"></a>
    <div class="toy__spacer"></div>
    <button class="round" data-act="auto" title="Let it paint itself. Touch the canvas to take over.">${ICON.auto}<span class="lbl">Auto</span></button>
    <button class="round" data-act="sound" aria-label="Sound on or off"></button>
    <button class="round" data-act="undo" aria-label="Undo">${ICON.undo}</button>
    <button class="round" data-act="clear" aria-label="Start again">${ICON.clear}</button>
    <button class="round" data-act="save" aria-label="Save as PNG">${ICON.save}</button>
    <button class="round" data-act="alive" title="Turn your painting into a short video">${ICON.spark}<span class="lbl">Bring to life</span></button>
    <button class="round primary" data-act="hang" title="Hang your painting on the rack">${ICON.hang}<span class="lbl">Hang it</span></button>
  </div>
  <div class="tip off"></div>
  <div class="dock" role="toolbar" aria-label="Toy controls"></div>
  <div class="toast" role="status"></div>
</section>`);
app.appendChild(toyEl);

const stage = toyEl.querySelector('.toy__stage'), dock = toyEl.querySelector('.dock');
const tipEl = toyEl.querySelector('.tip'), toastEl = toyEl.querySelector('.toast');
let toastT = 0;
const toast = (msg) => {
  toastEl.textContent = msg;
  toastEl.classList.add('on');
  clearTimeout(toastT);
  toastT = setTimeout(() => toastEl.classList.remove('on'), 2400);
};

// Bring it to life needs the local server that holds the Higgsfield key, so the public site does not offer it.
const local = location.protocol === 'file:' || ['localhost', '127.0.0.1'].includes(location.hostname);
if (!local) toyEl.querySelector('[data-act=alive]').style.display = 'none';

const backdrop = createBackdrop(shelfEl);
const wipe = createWipe(app);
const alive = createAlive(toyEl);

function paintSoundButtons() {
  document.querySelectorAll('[data-act=sound]').forEach((b) => {
    b.innerHTML = isMuted() ? ICON.silent : ICON.sound;
    b.setAttribute('aria-pressed', String(!isMuted()));
  });
}
paintSoundButtons();

// ── Focus credits ──
const creditN = shelfEl.querySelector('.credit .n'), creditC = shelfEl.querySelector('.credit .c');
const creditT = shelfEl.querySelector('.credit__t'), creditS = shelfEl.querySelector('.credit__s');
const ticks = shelfEl.querySelector('.ticks');
RELEASES.forEach((r, i) => {
  const b = $(`<button aria-label="${r.title.replace(/"/g, '')}"><i></i></button>`);
  b.onclick = () => shelf?.goTo(i);
  ticks.appendChild(b);
});

function onFocus(rel) {
  creditN.textContent = String(rel.index + 1).padStart(2, '0');
  creditC.textContent = rel.cat;
  creditT.textContent = rel.title;
  creditS.textContent = rel.blurb;
  [...ticks.children].forEach((b, i) => b.classList.toggle('on', i === rel.index));
  document.documentElement.style.setProperty('--accent', rel.accent);
  backdrop.tint(rel.glow);
}

const pill = shelfEl.querySelector('.pill');
function onHover(h) {
  if (!h) { pill.classList.remove('on'); return; }
  pill.textContent = h.label;
  pill.style.transform = `translate(${h.x + 16}px, ${h.y + 14}px)`;
  pill.classList.add('on');
}

const hasGL = webglAvailable();
let shelf = null;

// ── Hanging: your painting takes its place on the rack ──
async function loadHung(id) {
  const src = store.get(hangKey(id));
  if (!src) return;
  const img = new Image();
  img.src = src;
  try { await img.decode(); shelf?.setPressing(id, img); } catch { store.del(hangKey(id)); }
}

// ── Toy lifecycle ──
let current = null, currentCtx = null, currentAuto = null, busy = false;
const autoBtn = toyEl.querySelector('[data-act=auto]');

function mountToy(rel) {
  stage.replaceChildren();
  dock.replaceChildren();
  toyEl.querySelector('.toy__title b').textContent = rel.title;
  toyEl.querySelector('.toy__title span').textContent = `${rel.cat} · ${rel.genre}`;
  const ctx = createToyContext({ stage, dock, tipEl, toast, timbre: rel.timbre });
  rel.mount(ctx, rel);
  toyEl.querySelector('[data-act=undo]').style.display = ctx.undo ? '' : 'none';
  currentCtx = ctx;
  currentAuto = createAuto(ctx, { id: rel.id, timbre: rel.timbre, onChange: (on) => autoBtn.classList.toggle('on', on) });
  ctx.onTouch = () => currentAuto.stop();
  autoBtn.style.display = currentAuto.available ? '' : 'none';
}

async function openToy(rel) {
  if (busy || current === rel) return;
  busy = true;
  current = rel;
  onHover(null);
  document.title = `${rel.title} · ${SITE.name}`;
  if (shelf && shelf.focused?.index !== rel.index) shelf.jump(rel.index);
  document.documentElement.style.setProperty('--accent', rel.accent);
  mountToy(rel);
  sfx('swish');

  let covered;
  const painted = new Promise((r) => { covered = r; });
  const paintOver = () => wipe.cover(rel.accent).then(covered);
  if (shelf) await shelf.open(rel, paintOver); else paintOver();
  await painted;

  toyEl.classList.add('on');
  toyEl.setAttribute('aria-hidden', 'false');
  shelfEl.style.visibility = 'hidden';
  shelf?.pause();
  backdrop.pause();
  ambience(rel.bed);
  await wipe.reveal();
  busy = false;
  if (location.hash !== `#/${rel.id}`) sync();
}

async function closeToy() {
  if (busy || !current) return;
  busy = true;
  const rel = current;
  sfx('back');
  await wipe.cover(rel.accent);
  currentAuto?.stop();
  currentCtx?.destroy();
  currentCtx = null;
  stopMotor();
  toyEl.classList.remove('on');
  toyEl.setAttribute('aria-hidden', 'true');
  shelfEl.style.visibility = '';
  shelf?.resume();
  backdrop.resume();
  ambience('studio');
  document.title = SITE.name;
  current = null;
  const stepBack = shelf?.close();
  await wipe.reveal();
  await stepBack;
  busy = false;
  sync();
}

function sync() {
  const id = location.hash.replace(/^#\/?/, '');
  const rel = RELEASES.find((r) => r.id === id);
  if (rel) { if (rel !== current) { if (current) swapToy(rel); else openToy(rel); } } else if (current) closeToy();
}
function swapToy(rel) {
  currentAuto?.stop();
  currentCtx?.destroy();
  stopMotor();
  current = rel;
  mountToy(rel);
  ambience(rel.bed);
}
addEventListener('hashchange', sync);

// ── Controls ──
toyEl.addEventListener('click', (e) => {
  const act = e.target.closest('[data-act]')?.dataset.act;
  if (!act || !currentCtx) return;
  if (act === 'back') location.hash = '#/';
  if (act === 'auto') {
    if (currentAuto.running) currentAuto.stop();
    else { currentAuto.start(); toast('Painting by itself. Touch the canvas to take over.'); }
  }
  if (act === 'undo') currentCtx.undo?.();
  if (act === 'clear') currentCtx.clear?.();
  if (act === 'alive') {
    const c = currentCtx.snapshot?.();
    if (c) alive.open(c, current.title);
  }
  if (act === 'save') {
    const c = currentCtx.snapshot?.();
    if (!c) return;
    const a = document.createElement('a');
    a.download = `${current.id}.png`;
    a.href = c.toDataURL('image/png');
    a.click();
    toast('Saved as a PNG');
  }
  if (act === 'hang') {
    const c = currentCtx.snapshot?.();
    if (!c) return;
    const n = 640, o = offscreen(n, n), g = o.getContext('2d');
    const k = Math.max(n / c.width, n / c.height);
    g.fillStyle = '#111';
    g.fillRect(0, 0, n, n);
    g.drawImage(c, (n - c.width * k) / 2, (n - c.height * k) / 2, c.width * k, c.height * k);
    const ok = store.set(hangKey(current.id), o.toDataURL('image/jpeg', 0.82));
    shelf?.setPressing(current.id, o);
    sfx('hang');
    toast(ok ? 'Hung on the rack. It takes this canvas\'s place.' : 'Hung for this visit (browser storage is full)');
  }
});

shelfEl.addEventListener('click', (e) => {
  const act = e.target.closest('[data-act]')?.dataset.act;
  if (act === 'theme') {
    const r = document.documentElement;
    const next = r.dataset.theme === 'dark' ? 'light' : 'dark';
    r.dataset.theme = next;
    store.set('mym.theme', next);
  }
  if (act === 'cat') openCatalogue();
});
shelfEl.querySelector('.credit__play').onclick = () => { if (shelf?.focused) location.hash = `#/${shelf.focused.id}`; };
catEl.addEventListener('click', (e) => {
  const item = e.target.closest('[data-id]');
  if (e.target.closest('[data-act=catclose]')) closeCatalogue();
  if (item) {
    closeCatalogue();
    shelf?.jump(RELEASES.findIndex((r) => r.id === item.dataset.id));
    location.hash = `#/${item.dataset.id}`;
  }
});

function openCatalogue() {
  const grid = catEl.querySelector('.cat__grid');
  if (!grid.children.length) {
    RELEASES.forEach((r, i) => {
      const b = $(`<button class="cat__item" data-id="${r.id}"><b>${r.title}</b><span>${r.cat}</span></button>`);
      const c = offscreen(360, 360);
      if (shelf) c.getContext('2d').drawImage(shelf.coverCanvas(i), 0, 0, 360, 360); else drawCover(r, c);
      b.prepend(c);
      grid.appendChild(b);
    });
  }
  catEl.classList.add('on');
  catEl.setAttribute('aria-hidden', 'false');
}
function closeCatalogue() {
  if (!hasGL) return;
  catEl.classList.remove('on');
  catEl.setAttribute('aria-hidden', 'true');
}

// ── Interface sound, wired once for every control in the site ──
addEventListener('pointerdown', unlock, { capture: true });
addEventListener('keydown', unlock, { capture: true });

addEventListener('click', (e) => {
  const b = e.target.closest?.('button, a.btn');
  if (!b) return;
  if (b.dataset.act === 'sound') {
    setMuted(!isMuted());
    paintSoundButtons();
    sfx('on');
    return;
  }
  if (b.getAttribute('aria-pressed') !== null) sfx(b.getAttribute('aria-pressed') === 'true' ? 'off' : 'on');
  else if (b.closest('.sw')) sfx('pop');
  else if (b.closest('.seg')) sfx('tock');
  else sfx('click');
}, true);

let lastSlide = 0;
addEventListener('input', (e) => {
  if (e.target.type !== 'range') return;
  const now = performance.now();
  if (now - lastSlide > 45) { lastSlide = now; sfx('slide'); }
}, true);

addEventListener('pointerover', (e) => {
  const b = e.target.closest?.('button');
  if (e.pointerType === 'mouse' && b && !b.contains(e.relatedTarget)) sfx('hover');
}, true);

addEventListener('keydown', (e) => {
  if (e.target.matches?.('input, textarea')) return;
  if (current) {
    if (e.key === 'Escape') location.hash = '#/';
    if ((e.ctrlKey || e.metaKey) && e.key === 'z') { e.preventDefault(); currentCtx?.undo?.(); }
    return;
  }
  if (e.key === 'Escape') closeCatalogue();
  if (!shelf || catEl.classList.contains('on')) return;
  if (e.key === 'ArrowDown' || e.key === 'ArrowRight' || e.key === 'j') { e.preventDefault(); shelf.next(); }
  if (e.key === 'ArrowUp' || e.key === 'ArrowLeft' || e.key === 'k') { e.preventDefault(); shelf.prev(); }
  if (e.key === 'f') shelf.flip();
  if (e.key === 'Enter' && e.target === document.body) location.hash = `#/${shelf.focused.id}`;
});

// Boot
const savedTheme = store.get('mym.theme');
if (savedTheme) document.documentElement.dataset.theme = savedTheme;

// A few paintings use real type, so faces must be ready before the first paint.
const FACES = ['400 40px Fraunces', '600 40px Fraunces', 'italic 400 40px Fraunces', '400 40px "DM Mono"', '500 40px "DM Mono"', '400 40px Anton',
  '400 40px "Instrument Serif"', 'italic 400 40px "Instrument Serif"', '600 40px Caveat', '700 40px Unbounded', '400 40px VT323', '500 40px "Space Grotesk"', '700 40px "Space Grotesk"'];

const mark = new Image();
mark.src = logo;

ambience('studio');
Promise.all([...FACES.map((f) => document.fonts.load(f)), mark.decode().then(() => setMakerMark(mark))]).catch(() => {}).then(() => {
  if (hasGL) {
    shelf = createShelf({
      mount: shelfEl,
      onFocus,
      onHover,
      onPointer: (x, y) => backdrop.pointer(x, y),
      onOpenRequest: (rel) => { location.hash = `#/${rel.id}`; },
    });
    RELEASES.forEach((r) => loadHung(r.id));
  } else {
    onFocus(RELEASES[0]);
    openCatalogue();
  }
  sync();
});
