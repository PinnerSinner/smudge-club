// "Bring it to life": sends your finished painting to Higgsfield through the local server and plays back a short video.
// The API key never reaches this file. It stays on the server, as Higgsfield requires.
import { offscreen } from './kit.js';
import { sfx } from './sound.js';

const PROMPT = 'The paint slowly comes alive: pigment drifts and shimmers across the surface, gentle camera push-in, painterly, no new objects.';
const API = location.protocol === 'file:' ? null : 'api/alive';

const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

function toJpeg(canvas) {
  const k = Math.min(1, 1280 / Math.max(canvas.width, canvas.height));
  const o = offscreen(canvas.width * k, canvas.height * k), g = o.getContext('2d');
  g.fillStyle = '#111';
  g.fillRect(0, 0, o.width, o.height);
  g.drawImage(canvas, 0, 0, o.width, o.height);
  return o.toDataURL('image/jpeg', 0.9);
}

export function createAlive(host) {
  const el = document.createElement('div');
  el.className = 'alive';
  el.setAttribute('role', 'dialog');
  el.setAttribute('aria-modal', 'true');
  el.setAttribute('aria-label', 'Bring it to life');
  el.innerHTML = '<div class="alive__card"></div>';
  host.appendChild(el);
  const card = el.firstChild;
  let run = 0, preview = '', source = null, title = '';

  const close = () => { run++; el.classList.remove('on'); card.replaceChildren(); };
  el.addEventListener('pointerdown', (e) => { if (e.target === el) close(); });
  addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && el.classList.contains('on')) { e.stopImmediatePropagation(); close(); }
  }, true);

  const show = (html) => {
    card.innerHTML = html;
    card.querySelector('[data-close]')?.addEventListener('click', close);
  };

  function setup() {
    show(`<h3>Bring it to life</h3>
      <p>This turns your painting into a five second video with Higgsfield. It needs the small local server, because your Higgsfield key must stay off the web page.</p>
      <pre>1. Copy .env.example to .env
2. Paste your key from console.higgsfield.ai
3. npm start
4. Open http://localhost:5200</pre>
      <div class="alive__row"><button class="btn" data-close>Got it</button></div>`);
  }

  function ready() {
    show(`<h3>Bring it to life</h3>
      <p>${esc(title)} becomes a five second video. Tell it how the paint should move.</p>
      <img src="${preview}" alt="Your painting">
      <textarea aria-label="How the paint should move">${esc(PROMPT)}</textarea>
      <div class="alive__row">
        <span class="note">Your painting is sent to Higgsfield, and each video is charged to your Higgsfield balance.</span>
        <button class="btn" data-close>Not now</button>
        <button class="btn hot" data-go>Make the video</button>
      </div>`);
    card.querySelector('[data-go]').onclick = () => generate(card.querySelector('textarea').value.trim() || PROMPT);
  }

  function working(text) {
    show(`<h3>Waking the paint<span class="alive__dots"></span></h3>
      <p>${esc(text)}</p>
      <img src="${preview}" alt="Your painting">
      <div class="alive__row"><span class="note">You can leave this open. It usually takes a few minutes.</span><button class="btn" data-close>Stop watching</button></div>`);
  }

  function failed(message) {
    show(`<h3>That didn't take</h3><p>${esc(message)}</p>
      <div class="alive__row"><button class="btn" data-close>Close</button><button class="btn hot" data-retry>Try again</button></div>`);
    card.querySelector('[data-retry]').onclick = ready;
  }

  function done(url) {
    sfx('shimmer');
    show(`<h3>It's alive</h3>
      <video src="${esc(url)}" controls autoplay loop muted playsinline></video>
      <p>Higgsfield keeps this file for about seven days, so download it if you want to keep it.</p>
      <div class="alive__row"><button class="btn" data-close>Close</button><a class="btn" style="display:inline-flex;align-items:center;text-decoration:none" href="${esc(url)}" download target="_blank" rel="noopener">Download</a></div>`);
  }

  async function generate(prompt) {
    const mine = ++run;
    working('Sending your painting over.');
    let id;
    try {
      const r = await fetch(API, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ image: preview, prompt }) });
      const j = await r.json();
      if (!r.ok) throw new Error(j.error || 'The server turned that down.');
      id = j.id;
    } catch (e) {
      if (mine === run) failed(e.message);
      return;
    }
    // Poll gently: the work happens on Higgsfield's side and takes minutes, not seconds.
    const started = Date.now();
    let wait = 4000;
    while (mine === run) {
      await new Promise((res) => setTimeout(res, wait));
      if (mine !== run) return;
      wait = Math.min(15000, wait * 1.3);
      try {
        const r = await fetch(`${API}/${id}`), j = await r.json();
        if (mine !== run) return;
        if (!r.ok) throw new Error(j.error || 'Lost track of that request.');
        if (j.status === 'completed' && j.video) { done(j.video); return; }
        if (j.status === 'nsfw') { failed('Higgsfield\'s content filter stopped this one.'); return; }
        if (j.status === 'failed' || j.status === 'canceled') { failed(j.error || 'Higgsfield could not finish this one.'); return; }
        working(j.status === 'in_progress' ? 'The paint is moving.' : 'Waiting in the queue.');
      } catch (e) {
        failed(e.message);
        return;
      }
      if (Date.now() - started > 15 * 60 * 1000) { failed('This is taking too long, so I stopped watching. Check your Higgsfield console.'); return; }
    }
  }

  return {
    async open(canvas, name) {
      source = canvas;
      title = name;
      preview = toJpeg(source);
      el.classList.add('on');
      if (!API) { setup(); return; }
      try {
        const r = await fetch(`${API}/status`), j = await r.json();
        if (j.ready) ready(); else setup();
      } catch { setup(); }
    },
  };
}
