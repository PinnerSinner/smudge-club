// Smudge Club's small server: serves the site and keeps the Higgsfield key out of the browser.
// `npm start`, then open http://localhost:5200. No dependencies.
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { randomUUID } from 'node:crypto';
import { fileURLToPath } from 'node:url';

const ROOT = path.dirname(fileURLToPath(import.meta.url));

// A minimal .env reader, so there is nothing extra to install.
try {
  for (const line of fs.readFileSync(path.join(ROOT, '.env'), 'utf8').split(/\r?\n/)) {
    const m = line.match(/^\s*([A-Z_]+)\s*=\s*(.*?)\s*$/);
    if (m && !(m[1] in process.env)) process.env[m[1]] = m[2].replace(/^["']|["']$/g, '');
  }
} catch { /* no .env yet: the site still runs, just without Bring it to life */ }

const { HF_API_KEY_ID: KEY_ID, HF_API_KEY_SECRET: KEY_SECRET } = process.env;
const BASE = process.env.HF_API_BASE || 'https://api.higgsfield.ai';
const MODEL = process.env.HF_MODEL || '/kling-video/v2.5-turbo/standard/image-to-video';
const DAILY_LIMIT = Number(process.env.HF_DAILY_LIMIT || 20);
const PORT = Number(process.env.PORT || 5200);
const HOST = process.env.HOST || '127.0.0.1';
const READY = Boolean(KEY_ID && KEY_SECRET);
const MAX_BODY = 12 * 1024 * 1024;

const TYPES = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript', '.css': 'text/css', '.woff2': 'font/woff2', '.map': 'application/json' };

// Each generation costs real money, so a runaway page or a shared link cannot empty the balance.
let spent = { day: '', count: 0 };
function allowSpend() {
  const day = new Date().toISOString().slice(0, 10);
  if (spent.day !== day) spent = { day, count: 0 };
  if (spent.count >= DAILY_LIMIT) return false;
  spent.count++;
  return true;
}

const auth = { Authorization: `Key ${KEY_ID}:${KEY_SECRET}` };

async function hf(url, options = {}) {
  const r = await fetch(url.startsWith('http') ? url : BASE + url, {
    ...options,
    headers: { ...auth, 'Content-Type': 'application/json', ...options.headers },
  });
  const text = await r.text();
  let body = {};
  try { body = JSON.parse(text); } catch { /* some errors are plain text */ }
  if (!r.ok) {
    const e = new Error(explain(r.status, body));
    e.status = r.status;
    throw e;
  }
  return body;
}

function explain(status, body) {
  if (status === 401) return 'Higgsfield did not accept the key in .env.';
  if (status === 402) return 'Your Higgsfield balance needs topping up.';
  if ([404, 423, 503].includes(status)) return 'That Higgsfield model is not available on this account. Set a different HF_MODEL in .env.';
  if (status === 429) return 'Higgsfield says slow down. Try again in a minute.';
  return typeof body.detail === 'string' ? body.detail : `Higgsfield returned an error (${status}).`;
}

async function createVideo({ image, prompt }) {
  const m = /^data:image\/jpeg;base64,(.+)$/.exec(image || '');
  if (!m) throw Object.assign(new Error('Expected a JPEG of the painting.'), { status: 400 });
  if (typeof prompt !== 'string' || !prompt.trim() || prompt.length > 1500) throw Object.assign(new Error('The prompt needs to be between 1 and 1500 characters.'), { status: 400 });
  if (!allowSpend()) throw Object.assign(new Error(`The daily limit of ${DAILY_LIMIT} videos has been reached. Raise HF_DAILY_LIMIT in .env if you meant to.`), { status: 429 });

  // 1. Upload to Higgsfield storage through a presigned URL. Credentials must not go to that URL.
  const up = await hf('/files/generate-upload-url', { method: 'POST', body: JSON.stringify({ content_type: 'image/jpeg' }) });
  const put = await fetch(up.upload_url, { method: 'PUT', headers: up.upload_headers, body: Buffer.from(m[1], 'base64') });
  if (!put.ok) throw Object.assign(new Error(`The upload to Higgsfield storage failed (${put.status}).`), { status: 502 });

  // 2. Submit the generation. The idempotency key stops a retried request being billed twice.
  const job = await hf(MODEL, {
    method: 'POST',
    headers: { 'Idempotency-Key': randomUUID() },
    body: JSON.stringify({ prompt: prompt.trim(), image_url: up.public_url, duration: 5 }),
  });
  return { id: job.request_id };
}

async function readStatus(id) {
  const j = await hf(`/requests/${id}/status`);
  return { status: j.status, video: j.video?.url || null, error: j.error || null };
}

function send(res, status, body) {
  res.writeHead(status, { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' });
  res.end(JSON.stringify(body));
}

function readBody(req) {
  return new Promise((resolve, reject) => {
    let size = 0;
    const parts = [];
    req.on('data', (c) => {
      size += c.length;
      if (size > MAX_BODY) { reject(Object.assign(new Error('That image is too large.'), { status: 413 })); req.destroy(); } else parts.push(c);
    });
    req.on('end', () => resolve(Buffer.concat(parts).toString()));
    req.on('error', reject);
  });
}

// Only this site may spend the balance: other pages open in the same browser must not be able to.
function sameOrigin(req) {
  const origin = req.headers.origin;
  return !origin || new URL(origin).host === req.headers.host;
}

async function api(req, res, url) {
  if (url === '/api/alive/status') return send(res, 200, { ready: READY });
  if (!READY) return send(res, 503, { error: 'Add your Higgsfield key to .env first.' });
  try {
    if (url === '/api/alive' && req.method === 'POST') {
      if (!sameOrigin(req) || !String(req.headers['content-type']).startsWith('application/json')) return send(res, 403, { error: 'Not allowed.' });
      return send(res, 200, await createVideo(JSON.parse(await readBody(req))));
    }
    const m = /^\/api\/alive\/([0-9a-f-]{36})$/i.exec(url);
    if (m && req.method === 'GET') return send(res, 200, await readStatus(m[1]));
    return send(res, 404, { error: 'Not found.' });
  } catch (e) {
    return send(res, e.status && e.status < 600 ? e.status : 500, { error: e.message || 'Something went wrong.' });
  }
}

function serve(res, url) {
  // Only the site itself is public: never .env, the source or node_modules.
  const rel = url === '/' ? 'index.html' : decodeURIComponent(url).replace(/^\/+/, '');
  const file = path.normalize(path.join(ROOT, rel));
  const allowed = rel === 'index.html' || file.startsWith(path.join(ROOT, 'assets') + path.sep);
  if (!allowed) { res.writeHead(404); res.end('Not found'); return; }
  fs.readFile(file, (err, data) => {
    if (err) { res.writeHead(404); res.end('Not found'); return; }
    res.writeHead(200, { 'Content-Type': TYPES[path.extname(file)] || 'application/octet-stream' });
    res.end(data);
  });
}

http.createServer((req, res) => {
  const url = req.url.split('?')[0];
  if (url.startsWith('/api/')) api(req, res, url);
  else serve(res, url);
}).listen(PORT, HOST, () => {
  console.log(`Smudge Club is on http://localhost:${PORT}`);
  console.log(READY ? `Bring it to life is on: ${MODEL}, up to ${DAILY_LIMIT} videos a day.` : 'Bring it to life is off until you add a key to .env (see .env.example).');
});
