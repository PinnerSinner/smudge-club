// Tiny raw WebGL2 helpers for the shader-driven toys.

const VERT = `#version 300 es
in vec2 p; out vec2 uv;
void main(){ uv = p*.5+.5; gl_Position = vec4(p,0.,1.); }`;

export function createGL(canvas, attrs = {}) {
  const gl = canvas.getContext('webgl2', { antialias: false, alpha: false, preserveDrawingBuffer: true, ...attrs });
  if (!gl) return null;
  const buf = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buf);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
  return gl;
}

export function program(gl, frag) {
  const sh = (type, src) => {
    const s = gl.createShader(type);
    gl.shaderSource(s, src);
    gl.compileShader(s);
    if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) throw new Error(gl.getShaderInfoLog(s));
    return s;
  };
  const p = gl.createProgram();
  gl.attachShader(p, sh(gl.VERTEX_SHADER, VERT));
  gl.attachShader(p, sh(gl.FRAGMENT_SHADER, '#version 300 es\nprecision highp float;\n' + frag));
  gl.bindAttribLocation(p, 0, 'p');
  gl.linkProgram(p);
  if (!gl.getProgramParameter(p, gl.LINK_STATUS)) throw new Error(gl.getProgramInfoLog(p));
  const cache = {};
  const loc = (n) => (n in cache ? cache[n] : (cache[n] = gl.getUniformLocation(p, n)));
  return {
    use() { gl.useProgram(p); gl.enableVertexAttribArray(0); gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0); return this; },
    f(n, ...v) { gl[`uniform${v.length}f`](loc(n), ...v); return this; },
    i(n, v) { gl.uniform1i(loc(n), v); return this; },
  };
}

export function draw(gl) { gl.drawArrays(gl.TRIANGLES, 0, 3); }

export function texture(gl, { filter = gl.LINEAR, wrap = gl.CLAMP_TO_EDGE } = {}) {
  const t = gl.createTexture();
  gl.bindTexture(gl.TEXTURE_2D, t);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, filter);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, filter);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, wrap);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, wrap);
  return t;
}

export function upload(gl, tex, unit, source) {
  gl.activeTexture(gl.TEXTURE0 + unit);
  gl.bindTexture(gl.TEXTURE_2D, tex);
  gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, source);
  gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, false);
}

export function bind(gl, tex, unit) {
  gl.activeTexture(gl.TEXTURE0 + unit);
  gl.bindTexture(gl.TEXTURE_2D, tex);
}

// Float ping-pong target for simulations. Returns null if the GPU cannot render to float.
export function pingPong(gl, w, h, wrap = gl.REPEAT) {
  if (!gl.getExtension('EXT_color_buffer_float') && !gl.getExtension('EXT_color_buffer_half_float')) return null;
  gl.getExtension('OES_texture_float_linear');
  const make = () => {
    const tex = texture(gl, { filter: gl.LINEAR, wrap });
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA16F, w, h, 0, gl.RGBA, gl.HALF_FLOAT, null);
    const fbo = gl.createFramebuffer();
    gl.bindFramebuffer(gl.FRAMEBUFFER, fbo);
    gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, tex, 0);
    return { tex, fbo };
  };
  const pp = { a: make(), b: make(), w, h, swap() { const t = pp.a; pp.a = pp.b; pp.b = t; } };
  gl.bindFramebuffer(gl.FRAMEBUFFER, null);
  return pp;
}

// Relief lighting: colour + height canvases become wet, lit, glossy surfaces.
export const RELIEF_FRAG = `
in vec2 uv; out vec4 o;
uniform sampler2D color, height;
uniform vec2 px; uniform vec3 light; uniform float strength, gloss, spec, grain; uniform vec3 tint;
float rnd(vec2 p){ return fract(sin(dot(p, vec2(12.9898,78.233)))*43758.5453); }
float h(vec2 p){
  float c = texture(height,p).r*.4;
  c += (texture(height,p+vec2(px.x,0.)).r + texture(height,p-vec2(px.x,0.)).r
      + texture(height,p+vec2(0.,px.y)).r + texture(height,p-vec2(0.,px.y)).r)*.15;
  return c;
}
void main(){
  vec2 d = px*1.5;
  float hx = h(uv+vec2(d.x,0.))-h(uv-vec2(d.x,0.));
  float hy = h(uv+vec2(0.,d.y))-h(uv-vec2(0.,d.y));
  float gr = (rnd(floor(uv/px))-.5)*grain;
  vec3 n = normalize(vec3(-hx*strength+gr,-hy*strength+gr*.7,1.));
  vec3 L = normalize(light);
  float dif = clamp(dot(n,L),0.,1.);
  vec3 H = normalize(L+vec3(0.,0.,1.));
  float sp = pow(clamp(dot(n,H),0.,1.),gloss)*spec;
  vec4 c = texture(color,uv);
  float flat_ = clamp(dot(vec3(0.,0.,1.),L),.05,1.);
  vec3 col = c.rgb*tint*(.32+.68*dif/flat_);
  o = vec4(col+sp*texture(height,uv).g,1.);
}`;
