// Slow Growth: Gray-Scott reaction-diffusion on the GPU, in a petri dish. Touch it to seed new growth.
import { TAU } from '../kit.js';
import { createGL, program, draw, pingPong, bind } from '../gl.js';

const SPECIES = {
  Coral: [0.0545, 0.062],
  Fingerprint: [0.037, 0.06],
  Mitosis: [0.0367, 0.0649],
  Worms: [0.078, 0.061],
  Maze: [0.029, 0.057],
  Bubbles: [0.098, 0.0555],
};
const DYES = {
  Lagoon: [[0.02, 0.09, 0.12], [0.11, 0.64, 0.6], [0.72, 0.98, 0.88]],
  Ember: [[0.07, 0.02, 0.03], [0.82, 0.22, 0.1], [1, 0.84, 0.5]],
  Orchid: [[0.07, 0.03, 0.12], [0.62, 0.22, 0.72], [1, 0.82, 0.92]],
  Lichen: [[0.08, 0.1, 0.05], [0.52, 0.6, 0.18], [0.95, 0.93, 0.68]],
  Ocean: [[0.01, 0.04, 0.14], [0.08, 0.3, 0.82], [0.72, 0.92, 1]],
  Neon: [[0.03, 0.01, 0.08], [0.95, 0.1, 0.72], [0.75, 1, 0.3]],
  Sunset: [[0.1, 0.03, 0.16], [0.94, 0.3, 0.32], [1, 0.86, 0.42]],
  Bone: [[0.1, 0.09, 0.08], [0.6, 0.54, 0.46], [0.97, 0.94, 0.86]],
  Rose: [[0.12, 0.02, 0.07], [0.88, 0.32, 0.5], [1, 0.86, 0.88]],
  Ice: [[0.02, 0.07, 0.12], [0.36, 0.72, 0.86], [0.92, 1, 1]],
};

const SIM = `
in vec2 uv; out vec4 o;
uniform sampler2D s; uniform vec2 px; uniform float F,K;
void main(){
  vec2 c = texture(s,uv).rg;
  vec2 lap = -c;
  lap += .2*(texture(s,uv+vec2(px.x,0.)).rg+texture(s,uv-vec2(px.x,0.)).rg+texture(s,uv+vec2(0.,px.y)).rg+texture(s,uv-vec2(0.,px.y)).rg);
  lap += .05*(texture(s,uv+px).rg+texture(s,uv-px).rg+texture(s,uv+vec2(px.x,-px.y)).rg+texture(s,uv+vec2(-px.x,px.y)).rg);
  float r = c.r*c.g*c.g;
  float u = c.r+(1.*lap.r-r+F*(1.-c.r));
  float v = c.g+(.5*lap.g+r-(F+K)*c.g);
  // The glass wall of the dish.
  float wall = step(.49,length(uv-.5));
  o = vec4(mix(clamp(u,0.,1.),1.,wall),mix(clamp(v,0.,1.),0.,wall),0.,1.);
}`;

const SEED = `
in vec2 uv; out vec4 o;
uniform sampler2D s; uniform vec2 a,b; uniform float rad;
void main(){
  vec4 c = texture(s,uv);
  vec2 pa = uv-a, ba = b-a;
  float h = clamp(dot(pa,ba)/max(dot(ba,ba),1e-6),0.,1.);
  float m = step(length(pa-ba*h),rad);
  o = vec4(mix(c.r,.5,m),mix(c.g,.25,m),0.,1.);
}`;

const VIEW = `
in vec2 uv; out vec4 o;
uniform sampler2D s; uniform vec2 px; uniform vec3 c0,c1,c2;
void main(){
  float v = texture(s,uv).g;
  float t = smoothstep(.04,.34,v);
  vec3 col = t<.5 ? mix(c0,c1,t*2.) : mix(c1,c2,t*2.-1.);
  // Height from concentration, so the colony looks wet and raised.
  float dx = texture(s,uv+vec2(px.x,0.)).g-texture(s,uv-vec2(px.x,0.)).g;
  float dy = texture(s,uv+vec2(0.,px.y)).g-texture(s,uv-vec2(0.,px.y)).g;
  vec3 n = normalize(vec3(-dx*9.,-dy*9.,1.));
  float dif = dot(n,normalize(vec3(-.5,.6,.7)));
  float spec = pow(max(dot(n,normalize(vec3(-.25,.3,1.))),0.),60.);
  col = col*(.62+.5*dif)+spec*.3*t;
  float r = length(uv-.5);
  float edge = smoothstep(.492,.484,r);
  vec3 rim = vec3(.74,.8,.82)*smoothstep(.47,.49,r)*.34*edge;
  float sheen = smoothstep(.1,.0,abs(r-.43))*max(0.,dot(normalize(uv-.5),normalize(vec2(-.6,.8))))*.14;
  vec3 table = vec3(.045,.05,.058);
  o = vec4(mix(table,col+rim+sheen,edge),1.);
}`;

export default function mount(ctx) {
  const s = ctx.surface({ aspect: 1, maxPx: 1500 });
  const { W, H } = s;
  const out = s.layer({ gl: true });
  const gl = createGL(out.canvas);
  const N = 512;
  const pp = pingPong(gl, N, N);
  if (!pp) { ctx.toast('This graphics card cannot run the simulation'); return; }

  const sim = program(gl, SIM), seed = program(gl, SEED), view = program(gl, VIEW);
  let species = 'Coral', dye = 'Lagoon', speed = 10, rad = 0.014, last = null;

  function pass(prog, set) {
    gl.bindFramebuffer(gl.FRAMEBUFFER, pp.b.fbo);
    gl.viewport(0, 0, N, N);
    prog.use().i('s', 0);
    bind(gl, pp.a.tex, 0);
    set(prog);
    draw(gl);
    pp.swap();
  }

  function sterilise() {
    gl.bindFramebuffer(gl.FRAMEBUFFER, pp.a.fbo);
    gl.clearColor(1, 0, 0, 1);
    gl.clear(gl.COLOR_BUFFER_BIT);
  }

  const paint = (a, b) => pass(seed, (p) => p.f('a', a[0], a[1]).f('b', b[0], b[1]).f('rad', rad));
  const toUv = (p) => [p.x / W, 1 - p.y / H];

  s.pointer({
    down(p) { last = toUv(p); paint(last, last); },
    move(p) { const q = toUv(p); paint(last, q); last = q; },
    up() { last = null; },
  });

  ctx.loop(() => {
    const [F, K] = SPECIES[species];
    for (let i = 0; i < speed; i++) pass(sim, (p) => p.f('px', 1 / N, 1 / N).f('F', F).f('K', K));
    gl.bindFramebuffer(gl.FRAMEBUFFER, null);
    gl.viewport(0, 0, out.canvas.width, out.canvas.height);
    const [a, b, c] = DYES[dye];
    view.use().i('s', 0).f('px', 1 / N, 1 / N).f('c0', ...a).f('c1', ...b).f('c2', ...c);
    bind(gl, pp.a.tex, 0);
    draw(gl);
  });

  function inoculate() {
    for (let i = 0; i < 7; i++) {
      const t = (i / 7) * TAU, d = 0.05 + (i % 3) * 0.1, q = [0.5 + Math.cos(t) * d, 0.5 + Math.sin(t) * d];
      paint(q, q);
    }
  }

  ctx.clear = () => { sterilise(); };
  ctx.snapshot = () => out.canvas;

  sterilise();
  inoculate();
  ctx.ui.seg(Object.keys(SPECIES), species, (v) => { species = v; });
  ctx.ui.sep();
  ctx.ui.select(Object.keys(DYES), dye, (v) => { dye = v; });
  ctx.ui.sep();
  ctx.ui.slider('Clock', 1, 24, speed, (v) => { speed = v; });
  ctx.ui.slider('Seed', 5, 40, rad * 1000, (v) => { rad = v / 1000; });
  ctx.hint('Touch the dish to seed it. Change species mid-growth and see what the colony does.');
}
