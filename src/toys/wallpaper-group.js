// Wallpaper Group: strokes are stored as vectors and replayed through a real plane symmetry group,
// so switching group or tile size re-weaves your whole drawing.
const S3 = Math.sqrt(3) / 2;
const rot = (deg) => { const a = (deg * Math.PI) / 180, c = Math.cos(a), s = Math.sin(a); return [c, s, -s, c, 0, 0]; };
const I = [1, 0, 0, 1, 0, 0];
const flipX = [-1, 0, 0, 1, 0, 0];
const mul = (m, n) => [
  m[0] * n[0] + m[2] * n[1], m[1] * n[0] + m[3] * n[1],
  m[0] * n[2] + m[2] * n[3], m[1] * n[2] + m[3] * n[3],
  m[0] * n[4] + m[2] * n[5] + m[4], m[1] * n[4] + m[3] * n[5] + m[5],
];
const rots = (n) => Array.from({ length: n }, (_, i) => rot((360 / n) * i));
const withMirror = (ops) => [...ops, ...ops.map((o) => mul(o, flipX))];

const SQUARE = (s) => [[s, 0], [0, s]];
const HEX = (s) => [[s, 0], [s / 2, s * S3]];

// Lattice plus point operations: enough of the seventeen groups to feel the difference.
const GROUPS = {
  p1: { lattice: SQUARE, ops: () => [I], label: 'Slide' },
  p2: { lattice: SQUARE, ops: () => rots(2), label: 'Half turn' },
  pm: { lattice: SQUARE, ops: () => [I, flipX], label: 'Mirror' },
  pg: { lattice: SQUARE, ops: (s) => [I, [-1, 0, 0, 1, 0, s / 2]], label: 'Glide' },
  p4: { lattice: SQUARE, ops: () => rots(4), label: 'Quarter' },
  p4m: { lattice: SQUARE, ops: () => withMirror(rots(4)), label: 'Tile' },
  p3: { lattice: HEX, ops: () => rots(3), label: 'Triad' },
  p6: { lattice: HEX, ops: () => rots(6), label: 'Hex' },
  p6m: { lattice: HEX, ops: () => withMirror(rots(6)), label: 'Snowflake' },
};

const PAPERS = [
  ['#f0e4c2', '#123c30', '#38b58a', '#e8a33d', '#c7482e'],
  ['#123c30', '#f0e4c2', '#38b58a', '#e8a33d', '#ef8fa0'],
  ['#f7efe6', '#2a2a6e', '#e0508a', '#f2b705', '#1fa39a'],
  ['#1b1730', '#f7efe6', '#ff7a59', '#7ad7f0', '#c8a2ff'],
];

export default function mount(ctx) {
  const s = ctx.surface({ bleed: true, maxPx: 1800 });
  const { W, H } = s;
  const { canvas, g } = s.layer({ alpha: false });
  const seams = s.layer({ hit: false });
  const ox = W / 2, oy = H / 2;

  let group = 'p4m', size = 150, paper = 0, colour = PAPERS[0][1], width = 4, showSeams = true;
  let strokes = [], current = null, lattice, ops, inv, range;

  function configure() {
    const G = GROUPS[group];
    lattice = G.lattice(size);
    ops = G.ops(size);
    const [[ax, ay], [bx, by]] = lattice, det = ax * by - ay * bx;
    inv = (x, y) => [(x * by - y * bx) / det, (-x * ay + y * ax) / det];
    const corners = [[-ox, -oy], [W - ox, -oy], [-ox, H - oy], [W - ox, H - oy]].map(([x, y]) => inv(x, y));
    range = [Math.min(...corners.map((c) => c[0])), Math.max(...corners.map((c) => c[0])), Math.min(...corners.map((c) => c[1])), Math.max(...corners.map((c) => c[1]))];
  }

  // Every image of a segment that lands on screen goes into one path, so a stroke is a single draw.
  function addSegment(x0, y0, x1, y1) {
    const [[ax, ay], [bx, by]] = lattice;
    for (const m of ops) {
      const px0 = m[0] * x0 + m[2] * y0 + m[4], py0 = m[1] * x0 + m[3] * y0 + m[5];
      const px1 = m[0] * x1 + m[2] * y1 + m[4], py1 = m[1] * x1 + m[3] * y1 + m[5];
      const [u, v] = inv(px0, py0);
      const i0 = Math.floor(range[0] - u) - 1, i1 = Math.ceil(range[1] - u) + 1;
      const j0 = Math.floor(range[2] - v) - 1, j1 = Math.ceil(range[3] - v) + 1;
      for (let i = i0; i <= i1; i++) for (let j = j0; j <= j1; j++) {
        const tx = ox + i * ax + j * bx, ty = oy + i * ay + j * by;
        g.moveTo(px0 + tx, py0 + ty);
        g.lineTo(px1 + tx, py1 + ty);
      }
    }
  }

  function paintStroke(st, from = 1) {
    g.strokeStyle = st.colour;
    g.lineWidth = st.width;
    g.lineCap = 'round';
    g.lineJoin = 'round';
    g.beginPath();
    for (let i = from; i < st.pts.length; i++) {
      const a = st.pts[i - 1], b = st.pts[i];
      addSegment(a[0], a[1], b[0], b[1]);
    }
    g.stroke();
  }

  function redraw() {
    configure();
    g.fillStyle = PAPERS[paper][0];
    g.fillRect(0, 0, W, H);
    for (const st of strokes) paintStroke(st);
    drawSeams();
  }

  function drawSeams() {
    const c = seams.g;
    c.clearRect(0, 0, W, H);
    if (!showSeams) return;
    const [[ax, ay], [bx, by]] = lattice;
    c.strokeStyle = paper % 2 ? 'rgba(255,255,255,.2)' : 'rgba(0,0,0,.16)';
    c.lineWidth = 1;
    c.setLineDash([3, 5]);
    c.beginPath();
    const r0 = Math.floor(range[0]) - 2, r1 = Math.ceil(range[1]) + 2, r2 = Math.floor(range[2]) - 2, r3 = Math.ceil(range[3]) + 2;
    for (let i = r0; i <= r1; i++) { c.moveTo(ox + i * ax + r2 * bx, oy + i * ay + r2 * by); c.lineTo(ox + i * ax + r3 * bx, oy + i * ay + r3 * by); }
    for (let j = r2; j <= r3; j++) { c.moveTo(ox + r0 * ax + j * bx, oy + r0 * ay + j * by); c.lineTo(ox + r1 * ax + j * bx, oy + r1 * ay + j * by); }
    c.stroke();
    c.setLineDash([]);
  }

  s.pointer({
    down(p) {
      current = { pts: [[p.x - ox, p.y - oy], [p.x - ox + 0.1, p.y - oy]], colour, width };
      strokes.push(current);
      paintStroke(current);
    },
    move(p) {
      if (!current) return;
      current.pts.push([p.x - ox, p.y - oy]);
      paintStroke(current, current.pts.length - 1);
    },
    up() { current = null; },
  });

  ctx.undo = () => { strokes.pop(); redraw(); };
  ctx.clear = () => { strokes = []; redraw(); };
  ctx.snapshot = () => canvas;

  const colourBox = document.createElement('div');
  colourBox.style.display = 'contents';
  ctx.dock.appendChild(colourBox);
  const showColours = () => {
    const before = new Set(ctx.dock.children);
    ctx.ui.swatches(PAPERS[paper].slice(1), colour, (c) => { colour = c; });
    colourBox.replaceChildren(...[...ctx.dock.children].filter((c) => !before.has(c)));
  };
  showColours();
  ctx.ui.sep();
  ctx.ui.seg(Object.entries(GROUPS).map(([k, v]) => [k, v.label]), group, (v) => { group = v; redraw(); });
  ctx.ui.sep();
  ctx.ui.slider('Tile', 70, 320, size, (v) => { size = v; redraw(); });
  ctx.ui.slider('Pen', 1, 18, width, (v) => { width = v; });
  ctx.ui.toggle('Seams', showSeams, (v) => { showSeams = v; drawSeams(); });
  ctx.ui.button('Paper', () => {
    paper = (paper + 1) % PAPERS.length;
    colour = PAPERS[paper][1];
    showColours();
    redraw();
  });

  redraw();
  ctx.hint('Draw anywhere, then switch symmetry and watch the whole wall re-weave itself.');
}
