// Wet on Wet: a GPU simulation of ink on damp paper. Water spreads through fibres, carries pigment, and leaves
// dark tide lines where it stops. R = mobile ink, G = water, B = ink fixed into the paper.
import { clamp } from '../kit.js';
import { createGL, program, draw, pingPong, bind } from '../gl.js';

const NOISE = `
float hash(vec2 p){ return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453); }
float vnoise(vec2 p){ vec2 i=floor(p),f=fract(p); f=f*f*(3.-2.*f);
  return mix(mix(hash(i),hash(i+vec2(1,0)),f.x),mix(hash(i+vec2(0,1)),hash(i+vec2(1,1)),f.x),f.y); }
// Paper is long fibres: stretched noise at a few angles.
float fibre(vec2 p){
  float a = vnoise(p*vec2(.06,.5));
  float b = vnoise(vec2(p.x*.42+p.y*.2,p.y*.05-p.x*.1)+9.);
  float c = vnoise(p*.13+31.);
  return .35+.65*(a*.4+b*.4+c*.2);
}`;

const SIM = `
in vec2 uv; out vec4 o;
uniform sampler2D s; uniform vec2 px; uniform vec2 res; uniform float dry;
${NOISE}
void main(){
  vec4 c = texture(s,uv);
  vec4 l = texture(s,uv-vec2(px.x,0.)), r = texture(s,uv+vec2(px.x,0.));
  vec4 d = texture(s,uv-vec2(0.,px.y)), u = texture(s,uv+vec2(0.,px.y));
  float perm = fibre(uv*res);
  // Water levels out, faster along fibres.
  float wl = (l.g+r.g+d.g+u.g)*.25;
  float w = c.g+(wl-c.g)*.42*perm;
  // Pigment rides the water, pushed down the water's slope. Where the slope stops, it piles up: the tide line.
  vec2 grad = vec2(r.g-l.g,u.g-d.g);
  vec2 back = uv+grad*px*7.*perm;
  float ink = mix(c.r,texture(s,back).r,clamp(c.g*3.,0.,1.));
  // Plain diffusion, gated by how wet both cells are.
  float gate = clamp(min(c.g,wl)*5.,0.,1.)*perm;
  ink += ((l.r+r.r+d.r+u.r)*.25-c.r)*.24*gate;
  // Evaporation, and pigment settling as the paper dries.
  w = max(0.,w-w*.00011-.000004-dry);
  float settle = ink*(.0005+.03*(1.-clamp(w*12.,0.,1.)));
  o = vec4(max(0.,ink-settle),w,c.b+settle,1.);
}`;

const BRUSH = `
in vec2 uv; out vec4 o;
uniform sampler2D s; uniform vec2 a,b,res; uniform float rad,ink,water;
${NOISE}
void main(){
  vec4 c = texture(s,uv);
  vec2 p = uv*res, pa = p-a, ba = b-a;
  float h = clamp(dot(pa,ba)/max(dot(ba,ba),.001),0.,1.);
  float d = length(pa-ba*h);
  // Bristles: the brush edge breaks up, so dry strokes look dry.
  float bristle = .55+.9*vnoise(p*.55+a*.02);
  float m = smoothstep(rad,rad*.35,d*bristle);
  o = vec4(c.r+ink*m,min(1.,c.g+water*m),c.b,1.);
}`;

const VIEW = `
in vec2 uv; out vec4 o;
uniform sampler2D s; uniform vec2 res; uniform vec3 paper;
${NOISE}
void main(){
  vec4 c = texture(s,uv);
  float f = fibre(uv*res*1.6);
  float grain = vnoise(uv*res*1.4)*.05;
  float amt = c.r+c.b;
  // Beer-Lambert: thin ink is grey, thick ink is black, and never quite flat.
  vec3 inkc = vec3(.055,.058,.075);
  vec3 col = mix(paper,inkc,1.-exp(-amt*(1.25+f*.7)));
  col *= 1.-grain+c.g*.0;
  col -= vec3(.016,.014,.01)*clamp(c.g*2.2,0.,1.);
  o = vec4(col,1.);
}`;

const PAPERS = { Rice: [0.94, 0.915, 0.86], Bone: [0.97, 0.955, 0.925], Kraft: [0.76, 0.66, 0.52] };

export default function mount(ctx) {
  const s = ctx.surface({ paper: true, maxPx: 1700 });
  const { W, H, px } = s;
  const out = s.layer({ gl: true });
  const gl = createGL(out.canvas);
  const GW = Math.round(W * Math.min(px, 1.25)), GH = Math.round(H * Math.min(px, 1.25));
  const pp = pingPong(gl, GW, GH, gl.CLAMP_TO_EDGE);
  if (!pp) { ctx.toast('This graphics card cannot run the ink simulation'); return; }

  const sim = program(gl, SIM), brush = program(gl, BRUSH), view = program(gl, VIEW);
  let tool = 'ink', size = 22, load = 0.5, left = 1, paper = 'Rice', dry = 0, dampness = 0.1, last = null;

  function pass(prog, set) {
    gl.bindFramebuffer(gl.FRAMEBUFFER, pp.b.fbo);
    gl.viewport(0, 0, GW, GH);
    prog.use().i('s', 0);
    bind(gl, pp.a.tex, 0);
    set(prog);
    draw(gl);
    pp.swap();
  }

  function dampen(amount) {
    gl.bindFramebuffer(gl.FRAMEBUFFER, pp.a.fbo);
    gl.clearColor(0, amount, 0, 1);
    gl.clear(gl.COLOR_BUFFER_BIT);
  }

  const k = GW / W;
  function dab(a, b) {
    const wet = tool === 'water';
    const walked = Math.hypot(b.x - a.x, b.y - a.y);
    left = Math.max(0.05, left - walked * 0.0007);
    pass(brush, (p) => p
      .f('a', a.x * k, (H - a.y) * k).f('b', b.x * k, (H - b.y) * k).f('res', GW, GH)
      .f('rad', size * k * (0.65 + left * 0.35))
      .f('ink', wet ? 0 : load * 0.34 * left)
      .f('water', wet ? 0.24 : 0.06 + load * 0.12 * left));
  }

  s.pointer({
    down(p) { left = 1; last = p; dab(p, { x: p.x + 0.2, y: p.y }); },
    move(p) { dab(last, p); last = p; },
    up() { last = null; },
  });

  ctx.loop(() => {
    for (let i = 0; i < 4; i++) pass(sim, (p) => p.f('px', 1 / GW, 1 / GH).f('res', GW, GH).f('dry', dry));
    dry = Math.max(0, dry * 0.97 - 0.00001);
    gl.bindFramebuffer(gl.FRAMEBUFFER, null);
    gl.viewport(0, 0, out.canvas.width, out.canvas.height);
    view.use().i('s', 0).f('res', GW, GH).f('paper', ...PAPERS[paper]);
    bind(gl, pp.a.tex, 0);
    draw(gl);
  });

  ctx.clear = () => dampen(dampness);
  ctx.snapshot = () => out.canvas;

  dampen(dampness);
  ctx.ui.seg([['ink', 'Ink'], ['water', 'Water']], tool, (v) => { tool = v; });
  ctx.ui.sep();
  ctx.ui.slider('Brush', 6, 70, size, (v) => { size = v; });
  ctx.ui.slider('Load', 10, 100, load * 100, (v) => { load = v / 100; });
  ctx.ui.slider('Damp', 0, 30, dampness * 100, (v) => { dampness = clamp(v / 100, 0, 0.3); });
  ctx.ui.seg(Object.keys(PAPERS), paper, (v) => { paper = v; });
  ctx.ui.button('Dry it off', () => { dry = 0.01; });
  ctx.ui.button('Wet the sheet', () => {
    // Flood a light wash over everything, without disturbing what is already there.
    const wash = program(gl, `in vec2 uv; out vec4 o; uniform sampler2D s; uniform float add; void main(){ vec4 c = texture(s,uv); o = vec4(c.r+c.b*.3,min(1.,c.g+add),c.b*.7,1.); }`);
    pass(wash, (p) => p.f('add', 0.12));
  });
  ctx.hint('Touch the brush to damp paper and let go. The ink keeps moving without you.');
}
