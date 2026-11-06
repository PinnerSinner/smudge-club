// The far-off background: pigment slowly unfurling in deep water, with motes drifting at different depths.
// Rendered small and stretched, so it costs almost nothing and stays soft and distant.
import { createGL, program, draw } from './gl.js';
import { hexRgb, lerp } from './kit.js';

const FRAG = `
in vec2 uv; out vec4 o;
uniform float t,aspect,light,blend; uniform vec2 m; uniform vec3 ca,cb;
float hash(vec2 p){ return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453); }
float noise(vec2 p){ vec2 i=floor(p),f=fract(p); f=f*f*(3.-2.*f);
  return mix(mix(hash(i),hash(i+vec2(1,0)),f.x),mix(hash(i+vec2(0,1)),hash(i+vec2(1,1)),f.x),f.y); }
float fbm(vec2 p){ float a=.5,s=0.; for(int i=0;i<4;i++){ s+=a*noise(p); p=p*2.03+vec2(11.3,7.1); a*=.5; } return s; }

void main(){
  vec2 p = (uv-.5)*vec2(aspect,1.)*1.9 + m*.06;
  float s = t*.016;
  // Domain warping: noise bent by noise, twice, which is what makes it read as ink rather than clouds.
  vec2 q = vec2(fbm(p+vec2(0.,s)), fbm(p+vec2(5.2,1.3)-s*.8));
  vec2 r = vec2(fbm(p+3.2*q+vec2(1.7,9.2)+s*.5), fbm(p+3.2*q+vec2(8.3,2.8)-s*.35));
  float f = fbm(p+3.6*r);

  vec3 tint = mix(ca,cb,blend);
  vec3 alt = tint.gbr*.6+tint*.4;   // a neighbouring hue, so the ink is never one flat colour
  float body = smoothstep(.28,.82,f);
  // Thin tide lines through the pigment, like marbling seen from a long way off.
  float rings = smoothstep(.07,.0,abs(fract(f*7.+length(q)*3.)-.5))*smoothstep(.34,.6,f);

  float vig = smoothstep(1.25,.25,length((uv-.5)*vec2(1.15,1.)*1.9));
  vec3 dark = vec3(.043,.039,.05);
  vec3 col = dark + (tint*body*body*.62 + alt*smoothstep(.45,.75,length(r))*.16 + tint*rings*.1)*(.3+.7*vig);

  // Motes at three depths. Nearer ones move faster and further against the mouse.
  for(int i=0;i<3;i++){
    float k = float(i)+1.;
    vec2 g = (uv*vec2(aspect,1.)+m*.012*k+vec2(t*.0016*k,-t*.0034*k))*(9.+k*7.);
    vec2 id = floor(g), c = fract(g)-.5;
    float h = hash(id+k*17.);
    vec2 off = vec2(hash(id+3.1),hash(id+7.7))-.5;
    float d = length(c-off*.7);
    float tw = .5+.5*sin(t*(.3+h)+h*40.);
    col += mix(tint,vec3(1.),.45)*smoothstep(.09/k+.03,.0,d)*step(.72,h)*tw*(.2/k+.06);
  }

  // Daylight version: the same pigment, as a watercolour wash on paper.
  vec3 paper = vec3(.914,.9,.875);
  vec3 wash = paper*(1.-(1.-tint)*body*body*.5) - rings*.03*(1.-tint);
  col = mix(col,wash,light);
  o = vec4(col,1.);
}`;

const toVec = (hex) => hexRgb(hex).map((c) => Math.pow(c / 255, 1.5));

export function createBackdrop(host) {
  const canvas = document.createElement('canvas');
  canvas.className = 'backdrop';
  canvas.setAttribute('aria-hidden', 'true');
  host.prepend(canvas);
  const gl = createGL(canvas, { preserveDrawingBuffer: false });
  if (!gl) return { tint() {}, pause() {}, resume() {}, pointer() {} };
  const prog = program(gl, FRAG);

  const fit = () => {
    const k = Math.min(1, 620 / host.clientWidth);
    canvas.width = Math.max(2, Math.round(host.clientWidth * k));
    canvas.height = Math.max(2, Math.round(host.clientHeight * k));
    gl.viewport(0, 0, canvas.width, canvas.height);
  };
  new ResizeObserver(fit).observe(host);
  fit();

  const calm = matchMedia('(prefers-reduced-motion: reduce)').matches;
  let a = [0.3, 0.1, 0.1], b = a, blend = 1, running = true, last = 0, light = 0, mx = 0, my = 0, tx = 0, ty = 0;
  const t0 = performance.now();

  function frame(now) {
    if (!running) return;
    requestAnimationFrame(frame);
    // 30fps is plenty for something this slow.
    if (now - last < 33) return;
    const dt = Math.min(0.1, (now - last) / 1000);
    last = now;
    blend = Math.min(1, blend + dt * 0.8);
    mx = lerp(mx, tx, 0.04);
    my = lerp(my, ty, 0.04);
    light = lerp(light, document.documentElement.dataset.theme === 'light' ? 1 : 0, 0.08);
    const e = blend * blend * (3 - 2 * blend);
    prog.use()
      .f('t', calm ? 40 : (now - t0) / 1000 + 200).f('aspect', canvas.width / canvas.height).f('light', light).f('blend', e)
      .f('m', mx, my).f('ca', ...a).f('cb', ...b);
    draw(gl);
  }
  requestAnimationFrame(frame);

  return {
    // Crossfade from wherever the colour is now to the new painting's colour.
    tint(hex) {
      const e = blend * blend * (3 - 2 * blend);
      a = a.map((v, i) => lerp(v, b[i], e));
      b = toVec(hex);
      blend = 0;
    },
    pointer(x, y) { tx = x; ty = y; },
    pause() { running = false; },
    resume() { if (!running) { running = true; requestAnimationFrame(frame); } },
  };
}
