(()=>{var Yh="wp.muted",np=()=>{try{return localStorage.getItem(Yh)==="1"}catch{return!1}},kt=null,En=null,Qi=null,ji=null,Li=null,qs=np(),Kr=null,Ws=null,ip={bristle:{type:"bandpass",f:1300,q:.7,g:.13,sweep:1400},pencil:{type:"bandpass",f:3800,q:1.3,g:.05,sweep:1600},chalk:{type:"bandpass",f:2400,q:1.6,g:.08,sweep:1200},scratch:{type:"bandpass",f:3e3,q:3.2,g:.09,sweep:2600},sand:{type:"highpass",f:3600,q:.5,g:.06,sweep:1500},water:{type:"lowpass",f:520,q:2.4,g:.16,sweep:620},glass:{type:"bandpass",f:5200,q:7,g:.035,sweep:1500},shimmer:{type:"bandpass",f:6400,q:3,g:.02,sweep:2400},sizzle:{type:"highpass",f:5200,q:.8,g:.05,sweep:900,crackle:!0}};function Wh(n){let t=kt.sampleRate*3,e=kt.createBuffer(1,t,kt.sampleRate),i=e.getChannelData(0),s=0;for(let r=0;r<t;r++){let a=Math.random()*2-1;n==="brown"?(s=(s+.02*a)/1.02,i[r]=s*3.5):i[r]=a}return e}function sp(n=2.2){let t=kt.sampleRate*n,e=kt.createBuffer(2,t,kt.sampleRate);for(let i=0;i<2;i++){let s=e.getChannelData(i);for(let r=0;r<t;r++)s[r]=(Math.random()*2-1)*Math.pow(1-r/t,3.2)}return e}function $h(){if(kt)return!0;let n=window.AudioContext||window.webkitAudioContext;if(!n)return!1;kt=new n,ji=Wh("white"),Li=Wh("brown"),En=kt.createGain(),En.gain.value=qs?0:.85;let t=kt.createDynamicsCompressor();t.threshold.value=-14,t.ratio.value=6,En.connect(t),t.connect(kt.destination);let e=kt.createConvolver();return e.buffer=sp(),Qi=kt.createGain(),Qi.gain.value=.3,Qi.connect(e),e.connect(En),Xs.init(),!0}function fl(){return $h()?(kt.state==="suspended"&&kt.resume(),kt):null}function Zh(){return $h(),En}function pl(){fl()&&Kr&&!Ws&&Qh(Kr)}var Jr=()=>qs;function Kh(n){qs=n;try{localStorage.setItem(Yh,n?"1":"0")}catch{}kt&&En.gain.setTargetAtTime(n?0:.85,kt.currentTime,.05)}function xe(n,{dur:t=.2,vol:e=.1,type:i="sine",to:s=null,attack:r=.004,wet:a=0,delay:o=0,pan:l=0}={}){let c=kt.currentTime+o,u=kt.createOscillator(),d=kt.createGain();u.type=i,u.frequency.setValueAtTime(n,c),s&&u.frequency.exponentialRampToValueAtTime(s,c+t),d.gain.setValueAtTime(1e-4,c),d.gain.exponentialRampToValueAtTime(e,c+r),d.gain.exponentialRampToValueAtTime(1e-4,c+t),u.connect(d);let h=d;if(l&&kt.createStereoPanner){let f=kt.createStereoPanner();f.pan.value=l,d.connect(f),h=f}if(h.connect(En),a){let f=kt.createGain();f.gain.value=a,h.connect(f),f.connect(Qi)}u.start(c),u.stop(c+t+.05)}function sn({dur:n=.1,vol:t=.1,f:e=2e3,q:i=1,type:s="bandpass",to:r=null,attack:a=.002,wet:o=0,delay:l=0,src:c=ji}={}){let u=kt.currentTime+l,d=kt.createBufferSource(),h=kt.createBiquadFilter(),f=kt.createGain();if(d.buffer=c,d.loop=!0,h.type=s,h.frequency.setValueAtTime(e,u),r&&h.frequency.exponentialRampToValueAtTime(r,u+n),h.Q.value=i,f.gain.setValueAtTime(1e-4,u),f.gain.exponentialRampToValueAtTime(t,u+a),f.gain.exponentialRampToValueAtTime(1e-4,u+n),d.connect(h),h.connect(f),f.connect(En),o){let p=kt.createGain();p.gain.value=o,f.connect(p),p.connect(Qi)}d.start(u,Math.random()*2),d.stop(u+n+.05)}var rp={hover:()=>xe(2300,{dur:.025,vol:.008}),click:()=>{sn({dur:.03,vol:.05,f:2600,q:2}),xe(620,{dur:.05,vol:.03,type:"triangle",to:380})},pop:()=>xe(520,{dur:.09,vol:.09,to:980,attack:.008,wet:.2}),tock:()=>{xe(340,{dur:.07,vol:.09,type:"triangle",to:210}),sn({dur:.02,vol:.03,f:3e3})},on:()=>{xe(620,{dur:.07,vol:.05,type:"triangle"}),xe(930,{dur:.09,vol:.05,type:"triangle",delay:.05,wet:.2})},off:()=>{xe(760,{dur:.07,vol:.05,type:"triangle"}),xe(500,{dur:.09,vol:.05,type:"triangle",delay:.05})},slide:()=>xe(1500,{dur:.02,vol:.012,type:"triangle"}),flick:()=>{sn({dur:.1,vol:.09,f:900,q:.8,to:2400,attack:.02}),xe(170,{dur:.12,vol:.09,type:"triangle",to:95})},turn:()=>sn({dur:.26,vol:.06,f:500,q:.9,to:1800,attack:.08,wet:.2}),swish:()=>{sn({dur:.62,vol:.2,f:700,q:.6,to:3200,attack:.1,wet:.35}),[220,330,494].forEach((n,t)=>xe(n,{dur:1.3,vol:.035,attack:.25,delay:t*.07,wet:.7}))},back:()=>{sn({dur:.5,vol:.16,f:3e3,q:.6,to:600,attack:.06,wet:.35}),[494,330,247].forEach((n,t)=>xe(n,{dur:1,vol:.03,attack:.2,delay:t*.06,wet:.7}))},hang:()=>{xe(150,{dur:.16,vol:.16,type:"triangle",to:80}),sn({dur:.06,vol:.06,f:1500,delay:.02}),[523,659,784].forEach((n,t)=>xe(n,{dur:.5,vol:.04,delay:.12+t*.07,wet:.6}))},crack:()=>{xe(120,{dur:.2,vol:.2,type:"triangle",to:55});for(let n=0;n<7;n++)sn({dur:.03+Math.random()*.05,vol:.14,f:2500+Math.random()*4e3,q:4,delay:n*.018+Math.random()*.02,wet:.3});for(let n=0;n<5;n++)xe(1800+Math.random()*2600,{dur:.12,vol:.03,delay:.1+n*.05,wet:.5})},clink:()=>{let n=1700+Math.random()*900;xe(n,{dur:.3,vol:.06,wet:.5}),xe(n*2.76,{dur:.12,vol:.02,wet:.4})},shimmer:()=>[659,784,988,1175,1319,1568].forEach((n,t)=>xe(n,{dur:1.3,vol:.04,attack:.01,delay:t*.08,wet:.8})),plop:()=>xe(280+Math.random()*140,{dur:.16,vol:.13,to:820,attack:.012,wet:.45}),thud:()=>{xe(105,{dur:.2,vol:.2,type:"triangle",to:52}),sn({dur:.08,vol:.05,f:500,q:.8,src:Li})},paper:()=>{sn({dur:.34,vol:.09,f:2800,q:.6,to:1100,attack:.05,wet:.2}),sn({dur:.12,vol:.05,f:5e3,q:1,delay:.12})},tink:()=>{let n=2300+Math.random()*1400;xe(n,{dur:.5,vol:.05,wet:.7}),xe(n*1.5,{dur:.3,vol:.02,wet:.6})},breath:()=>sn({dur:1.1,vol:.13,f:900,q:.5,to:400,attack:.35,wet:.2}),shake:()=>{for(let n=0;n<9;n++)sn({dur:.05,vol:.09,f:3800,q:1.2,delay:n*.055})},blip:()=>xe(420+Math.random()*500,{dur:.05,vol:.03,type:"square"})};function Kt(n){!kt||qs||kt.state!=="running"||rp[n]?.()}var Xs={src:null,filter:null,gain:null,cfg:null,level:0,init(){this.src=kt.createBufferSource(),this.src.buffer=ji,this.src.loop=!0,this.filter=kt.createBiquadFilter(),this.gain=kt.createGain(),this.gain.gain.value=0,this.src.connect(this.filter),this.filter.connect(this.gain),this.gain.connect(En),this.src.start()},start(n){kt&&(this.cfg=ip[n]||null,this.cfg&&(this.filter.type=this.cfg.type,this.filter.frequency.value=this.cfg.f,this.filter.Q.value=this.cfg.q,this.gain.gain.setTargetAtTime(this.cfg.g*.25,kt.currentTime,.02)))},move(n){if(!kt||!this.cfg)return;let t=Math.min(1,n/1.6),e=this.cfg,i=kt.currentTime,s=e.crackle?.35+Math.random()*1.3:1;this.gain.gain.setTargetAtTime(e.g*(.25+t*.85)*s,i,.03),this.filter.frequency.setTargetAtTime(e.f+e.sweep*t,i,.05)},end(){!kt||!this.cfg||(this.gain.gain.setTargetAtTime(0,kt.currentTime,.08),this.cfg=null)}},Ni=null;function Jh(n){if(kt){if(!Ni){let t=kt.createOscillator(),e=kt.createGain();t.type="sawtooth";let i=kt.createBiquadFilter();i.type="lowpass",i.frequency.value=340,e.gain.value=0,t.connect(i),i.connect(e),e.connect(En),t.start(),Ni={o:t,g:e}}Ni.o.frequency.setTargetAtTime(38+n*62,kt.currentTime,.1),Ni.g.gain.setTargetAtTime(n*.035,kt.currentTime,.1)}}function ml(){if(!Ni)return;let{o:n,g:t}=Ni;t.gain.setTargetAtTime(0,kt.currentTime,.1),n.stop(kt.currentTime+.6),Ni=null}var qh=[220,247,294,330,370,440,494,587,659];function ci(n,t,e,i,s,r){let a=kt.createBufferSource(),o=kt.createBiquadFilter(),l=kt.createGain();return a.buffer=n,a.loop=!0,o.type=t,o.frequency.value=e,o.Q.value=i,l.gain.value=s,a.connect(o),o.connect(l),l.connect(r),a.start(0,Math.random()*2),{s:a,f:o,g:l}}function Hs(n,t,e,i,s){let r=kt.createOscillator(),a=kt.createGain();r.frequency.value=i,a.gain.value=e,n.value=t,r.connect(a),a.connect(n),r.start(),s.push(r)}function Xh(n,t,e,i){n.forEach((s,r)=>{let a=kt.createOscillator(),o=kt.createGain();a.frequency.value=s,a.detune.value=(r-1)*4,a.connect(o),o.connect(e);let l=kt.createGain();l.gain.value=.5,o.connect(l),l.connect(Qi),Hs(o.gain,t,t*.9,.03+r*.017,i),a.start(),i.push(a)})}var ap={studio(n,t,e){t.push(ci(Li,"lowpass",280,.3,.1,n).s),Xh([110,165,247],.012,n,t),e(7,13,()=>xe(qh[Math.floor(Math.random()*qh.length)]*2,{dur:2.4,vol:.016,attack:.02,wet:1,pan:Math.random()-.5}))},rain(n,t,e){let i=ci(ji,"bandpass",2600,.4,.028,n);t.push(i.s,ci(Li,"lowpass",300,.4,.12,n).s),Hs(i.g.gain,.028,.01,.09,t),e(.15,.9,()=>sn({dur:.03,vol:.02+Math.random()*.03,f:1700+Math.random()*3e3,q:5,wet:.25}))},water(n,t,e){let i=ci(Li,"lowpass",460,1.2,.2,n);t.push(i.s),Hs(i.f.frequency,460,180,.11,t),e(1.2,4.5,()=>xe(280+Math.random()*260,{dur:.15,vol:.022,to:640+Math.random()*300,attack:.02,wet:.7}))},wind(n,t){let e=ci(ji,"bandpass",620,1.4,.03,n);t.push(e.s,ci(Li,"lowpass",220,.3,.09,n).s),Hs(e.f.frequency,620,300,.05,t),Hs(e.g.gain,.03,.018,.07,t)},night(n,t,e){t.push(ci(Li,"lowpass",200,.3,.1,n).s),Xh([82,123,185,277],.01,n,t),e(4,10,()=>xe(1320+Math.random()*900,{dur:1.6,vol:.009,attack:.1,wet:1,pan:Math.random()*1.6-.8}))},hum(n,t){let e=kt.createOscillator(),i=kt.createGain();e.type="triangle",e.frequency.value=50,i.gain.value=.014,e.connect(i),i.connect(n),e.start(),t.push(e,ci(ji,"bandpass",7400,2,.004,n).s)}};function Qh(n){let t=ap[n];if(!t||!kt)return;let e=kt.createGain();e.gain.value=1e-4,e.gain.exponentialRampToValueAtTime(.4,kt.currentTime+1.6),e.connect(En);let i=[],s=[];t(e,i,(a,o,l)=>{let c=()=>{s[0]=setTimeout(()=>{!qs&&!document.hidden&&l(),c()},(a+Math.random()*(o-a))*1e3)};c()}),Ws={name:n,out:e,stops:i,timers:s}}function op(){if(!Ws)return;let n=Ws;Ws=null,n.timers.forEach(clearTimeout),n.out.gain.setTargetAtTime(1e-4,kt.currentTime,.4),setTimeout(()=>{n.stops.forEach(t=>{try{t.stop()}catch{}}),n.out.disconnect()},2200)}function Ys(n){Kr!==n&&(Kr=n,kt&&(op(),Qh(n)))}var ht=Math.PI*2,Ut=(n,t=0,e=1)=>Math.min(e,Math.max(t,n)),qt=(n,t,e)=>n+(t-n)*e,hi=(n,t,e)=>{let i=Ut((e-n)/(t-n));return i*i*(3-2*i)},Ve=(n,t,e,i)=>Math.hypot(n-e,t-i),$s=(n,t=Math.random)=>n[Math.floor(t()*n.length)];function Pe(n=1){let t=n>>>0||1;return()=>{t=t+1831565813>>>0;let e=t;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}}function Ze(n=1){let t=Pe(n),e=new Float32Array(65536);for(let s=0;s<e.length;s++)e[s]=t();let i=(s,r)=>e[(s&255)<<8|r&255];return(s,r)=>{let a=Math.floor(s),o=Math.floor(r),l=s-a,c=r-o,u=l*l*(3-2*l),d=c*c*(3-2*c);return qt(qt(i(a,o),i(a+1,o),u),qt(i(a,o+1),i(a+1,o+1),u),d)}}function hn(n){let t=parseInt(n.slice(1),16);return[t>>16&255,t>>8&255,t&255]}function Dt(n,t){let e=document.createElement("canvas");return e.width=Math.max(1,Math.round(n)),e.height=Math.max(1,Math.round(t)),e}var lp=()=>Math.min(window.devicePixelRatio||1,2);function jh({stage:n,dock:t,tipEl:e,toast:i,timbre:s="none"}){let r=[],a=new Set,o=0,l=!0,c=new Set,u=performance.now(),d=g=>{if(!l)return;let w=Math.min(.05,(g-u)/1e3);u=g;for(let _ of c)_(w,g/1e3);o=requestAnimationFrame(d)},h=(g,w,_,v)=>{g.addEventListener(w,_,v),r.push(()=>g.removeEventListener(w,_,v))},f=()=>n.getBoundingClientRect(),p=()=>a.forEach(g=>g()),T=new ResizeObserver(p);T.observe(n),r.push(()=>T.disconnect());let x={stage:n,dock:t,on:h,toast:i,snapshot:null,clear:null,undo:null,surface({aspect:g=null,bleed:w=!1,paper:_=!1,maxPx:v=2400,scale:R=1,bg:N=null}={}){let m=()=>{let b=f(),I=w?0:16,y=w?0:66,F=w?0:80;return{x:I,y,w:b.width-I*2,h:b.height-y-F}},M=b=>g?b.w/b.h>g?{w:b.h*g,h:b.h}:{w:b.w,h:b.w/g}:{w:b.w,h:b.h},L=m(),P=M(L),B=Math.round(P.w),C=Math.round(P.h),O=Math.min(lp()*R,v/Math.max(B,C)),D=document.createElement("div");D.className="surface"+(_?" paper":""),N&&(D.style.background=N),n.appendChild(D);let E=()=>{let b=m(),I,y;if(g)({w:I,h:y}=M(b));else{let F=Math.min(b.w/B,b.h/C);I=B*F,y=C*F}D.style.width=I+"px",D.style.height=y+"px",D.style.left=b.x+(b.w-I)/2+"px",D.style.top=b.y+(b.h-y)/2+"px"};return E(),a.add(E),{el:D,W:B,H:C,px:O,layer({gl:b=!1,alpha:I=!0,hit:y=!0,resolution:F=1}={}){let S=document.createElement("canvas");if(S.width=Math.round(B*O*F),S.height=Math.round(C*O*F),y||(S.className="nohit"),D.appendChild(S),b)return{canvas:S};let U=S.getContext("2d",{alpha:I,willReadFrequently:!1});return U.scale(O*F,O*F),U.lineCap="round",U.lineJoin="round",{canvas:S,g:U}},buffer(b=1,I={}){let y=Dt(B*O*b,C*O*b),F=y.getContext("2d",I);return F.scale(O*b,O*b),F.lineCap="round",F.lineJoin="round",{canvas:y,g:F}},pointer(b){let I=!1,y=null,F=U=>{let V=D.getBoundingClientRect();return{x:(U.clientX-V.left)/V.width*B,y:(U.clientY-V.top)/V.height*C,pressure:U.pressure||.5,shift:U.shiftKey,alt:U.altKey,button:U.button,type:U.pointerType}};h(D,"pointerdown",U=>{if(!(U.button>0)){I=!0;try{D.setPointerCapture(U.pointerId)}catch{}U.preventDefault(),x.dismissTip(),Xs.start(s),y={x:U.clientX,y:U.clientY,t:performance.now()},b.down?.(F(U))}}),h(D,"pointermove",U=>{if(!I){b.hover?.(F(U));return}let V=performance.now();Xs.move(Math.hypot(U.clientX-y.x,U.clientY-y.y)/Math.max(1,V-y.t)),y={x:U.clientX,y:U.clientY,t:V};let A=U.getCoalescedEvents?.()||[];if(A.length>1)for(let q of A)b.move?.(F(q));else b.move?.(F(U))});let S=U=>{I&&(I=!1,Xs.end(),b.up?.(F(U)))};h(D,"pointerup",S),h(D,"pointercancel",S),h(D,"pointerleave",U=>{I||b.leave?.(F(U))})}}},rasterUndo(g,w=16){let _=[],v=g.getContext("2d"),R=()=>{let N=Dt(g.width,g.height);N.getContext("2d").drawImage(g,0,0),_.push(N),_.length>w&&_.shift()};return x.undo=()=>{let N=_.pop();N&&(v.save(),v.setTransform(1,0,0,1,0,0),v.globalCompositeOperation="copy",v.drawImage(N,0,0),v.restore())},R},loop(g){return c.add(g),o||(u=performance.now(),o=requestAnimationFrame(d)),()=>c.delete(g)},hint(g){e.textContent=g,e.classList.remove("off");let w=setTimeout(x.dismissTip,7e3);r.push(()=>clearTimeout(w))},dismissTip(){e.classList.add("off")},ui:{sep(){let g=document.createElement("div");g.className="dock__sep",t.appendChild(g)},swatches(g,w,_){let v=document.createElement("div");v.className="sw";let R=g.map(m=>{let M=document.createElement("button");return M.style.background=m,M.setAttribute("aria-label",`Colour ${m}`),M.onclick=()=>N(m,!0),v.appendChild(M),[m,M]}),N=(m,M)=>{R.forEach(([L,P])=>P.classList.toggle("on",L===m)),M&&_(m)};return N(w),t.appendChild(v),{set:m=>N(m,!1)}},slider(g,w,_,v,R,N=1){let m=document.createElement("label");m.className="ctl",m.textContent=g;let M=document.createElement("input");return Object.assign(M,{type:"range",min:w,max:_,step:N,value:v}),M.oninput=()=>R(+M.value),m.appendChild(M),t.appendChild(m),M},seg(g,w,_){let v=document.createElement("div");v.className="seg";let R=g.map(m=>{let[M,L]=Array.isArray(m)?m:[m,m],P=document.createElement("button");return P.textContent=L,P.onclick=()=>{N(M),_(M)},v.appendChild(P),[M,P]}),N=m=>R.forEach(([M,L])=>L.classList.toggle("on",M===m));return N(w),t.appendChild(v),{set:N}},button(g,w,_=""){let v=document.createElement("button");return v.className="btn "+_,v.textContent=g,v.onclick=w,t.appendChild(v),v},toggle(g,w,_){let v=document.createElement("button");return v.className="btn"+(w?" on":""),v.textContent=g,v.setAttribute("aria-pressed",w),v.onclick=()=>{w=!w,v.classList.toggle("on",w),v.setAttribute("aria-pressed",w),_(w)},t.appendChild(v),v},text(g,w,_=""){let v=document.createElement("input");return v.className="txt",v.type="text",v.value=g,v.placeholder=_,v.spellcheck=!1,v.oninput=()=>w(v.value),v.addEventListener("keydown",R=>R.stopPropagation()),t.appendChild(v),v},readout(g=""){let w=document.createElement("span");return w.className="readout",w.textContent=g,t.appendChild(w),w}},destroy(){l=!1,cancelAnimationFrame(o),c.clear(),a.clear(),r.forEach(g=>g()),n.replaceChildren(),t.replaceChildren(),t.className="dock"}};return x}function Di(n,{dur:t=1.4,vol:e=.18,type:i="triangle",pan:s=0}={}){let r=fl();if(!r)return;let a=r.currentTime,o=r.createOscillator(),l=r.createGain();o.type=i,o.frequency.setValueAtTime(n,a),l.gain.setValueAtTime(0,a),l.gain.linearRampToValueAtTime(e,a+.006),l.gain.exponentialRampToValueAtTime(1e-4,a+t);let c=l;if(r.createStereoPanner){let u=r.createStereoPanner();u.pan.value=s,l.connect(u),c=u}o.connect(l),c.connect(Zh()),o.start(a),o.stop(a+t+.05)}function rn(n,t,e,{seed:i=3,alpha:s=.05,scale:r=1}={}){let a=Pe(i),o=Math.floor(t*e/26);n.save();for(let l=0;l<o;l++){let c=a()>.5?255:0;n.fillStyle=`rgba(${c},${c},${c},${s*a()})`,n.fillRect(a()*t,a()*e,r*(.6+a()*1.4),r*(.6+a()*1.4))}n.restore()}var cp=`#version 300 es
in vec2 p; out vec2 uv;
void main(){ uv = p*.5+.5; gl_Position = vec4(p,0.,1.); }`;function Fn(n,t={}){let e=n.getContext("webgl2",{antialias:!1,alpha:!1,preserveDrawingBuffer:!0,...t});if(!e)return null;let i=e.createBuffer();return e.bindBuffer(e.ARRAY_BUFFER,i),e.bufferData(e.ARRAY_BUFFER,new Float32Array([-1,-1,3,-1,-1,3]),e.STATIC_DRAW),e}function Ke(n,t){let e=(a,o)=>{let l=n.createShader(a);if(n.shaderSource(l,o),n.compileShader(l),!n.getShaderParameter(l,n.COMPILE_STATUS))throw new Error(n.getShaderInfoLog(l));return l},i=n.createProgram();if(n.attachShader(i,e(n.VERTEX_SHADER,cp)),n.attachShader(i,e(n.FRAGMENT_SHADER,`#version 300 es
precision highp float;
`+t)),n.bindAttribLocation(i,0,"p"),n.linkProgram(i),!n.getProgramParameter(i,n.LINK_STATUS))throw new Error(n.getProgramInfoLog(i));let s={},r=a=>a in s?s[a]:s[a]=n.getUniformLocation(i,a);return{use(){return n.useProgram(i),n.enableVertexAttribArray(0),n.vertexAttribPointer(0,2,n.FLOAT,!1,0,0),this},f(a,...o){return n[`uniform${o.length}f`](r(a),...o),this},i(a,o){return n.uniform1i(r(a),o),this}}}function _n(n){n.drawArrays(n.TRIANGLES,0,3)}function Ui(n,{filter:t=n.LINEAR,wrap:e=n.CLAMP_TO_EDGE}={}){let i=n.createTexture();return n.bindTexture(n.TEXTURE_2D,i),n.texParameteri(n.TEXTURE_2D,n.TEXTURE_MIN_FILTER,t),n.texParameteri(n.TEXTURE_2D,n.TEXTURE_MAG_FILTER,t),n.texParameteri(n.TEXTURE_2D,n.TEXTURE_WRAP_S,e),n.texParameteri(n.TEXTURE_2D,n.TEXTURE_WRAP_T,e),i}function ts(n,t,e,i){n.activeTexture(n.TEXTURE0+e),n.bindTexture(n.TEXTURE_2D,t),n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,!0),n.texImage2D(n.TEXTURE_2D,0,n.RGBA,n.RGBA,n.UNSIGNED_BYTE,i),n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,!1)}function yn(n,t,e){n.activeTexture(n.TEXTURE0+e),n.bindTexture(n.TEXTURE_2D,t)}function Qr(n,t,e,i=n.REPEAT){if(!n.getExtension("EXT_color_buffer_float")&&!n.getExtension("EXT_color_buffer_half_float"))return null;n.getExtension("OES_texture_float_linear");let s=()=>{let a=Ui(n,{filter:n.LINEAR,wrap:i});n.texImage2D(n.TEXTURE_2D,0,n.RGBA16F,t,e,0,n.RGBA,n.HALF_FLOAT,null);let o=n.createFramebuffer();return n.bindFramebuffer(n.FRAMEBUFFER,o),n.framebufferTexture2D(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,a,0),{tex:a,fbo:o}},r={a:s(),b:s(),w:t,h:e,swap(){let a=r.a;r.a=r.b,r.b=a}};return n.bindFramebuffer(n.FRAMEBUFFER,null),r}var jr=`
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
}`;var hp=["#16130f","#f2efe6","#d92b1f","#f2b705","#1f4fd8","#0f7a5a","#e0308a","#8a4a22"];function gl(n){let t=n.surface({paper:!0,bg:"#efe9dc",maxPx:1800}),{W:e,H:i,px:s}=t,r=t.layer({gl:!0}),a=t.buffer(),o=t.buffer(),l=Fn(r.canvas),c=()=>{a.g.fillStyle="#efe9dc",a.g.fillRect(0,0,e,i),o.g.fillStyle="#080000",o.g.fillRect(0,0,e,i),o.g.fillStyle="rgba(30,0,0,.5)";for(let C=0;C<e;C+=3)o.g.fillRect(C,0,1,i);for(let C=0;C<i;C+=3)o.g.fillRect(0,C,e,1)};c();let u=Ke(l,jr),d=Ui(l),h=Ui(l),f="#d92b1f",p=7,T=0,x=!0,g={x:e*.3,y:i*.2,down:!1,still:0},w=[],_=[];function v(C,O,D,E=f){a.g.fillStyle=E,a.g.beginPath(),a.g.arc(C,O,D,0,ht),a.g.fill();let z=o.g.createRadialGradient(C,O,D*.15,C,O,D*1.12);z.addColorStop(0,"rgba(235,255,0,.7)"),z.addColorStop(.6,"rgba(170,255,0,.5)"),z.addColorStop(1,"rgba(0,200,0,0)"),o.g.fillStyle=z,o.g.beginPath(),o.g.arc(C,O,D*1.12,0,ht),o.g.fill(),x=!0}function R(C,O,D,E,z,b=f){let I=Math.max(1,Math.ceil(Ve(C,O,D,E)/Math.max(1,z*.45)));for(let y=0;y<=I;y++){let F=y/I;v(qt(C,D,F),qt(O,E,F),z*(.8+Math.random()*.4),b)}}let N=(C,O,D,E,z)=>w.push({x:C,y:O,vx:D,vy:E,r:z,t:.05+Math.random()*.18,c:f});function m(C){let O=Ut(Math.hypot(C.vx,C.vy)/900,0,1);if(v(C.x,C.y,C.r,C.c),O>.2){let D=Math.atan2(C.vy,C.vx),E=C.r*(2+O*5),z=Math.max(3,Math.ceil(E/Math.max(.8,C.r*.4)));for(let I=1;I<=z;I++){let y=I/z;v(C.x+Math.cos(D)*E*y,C.y+Math.sin(D)*E*y,Math.max(.4,C.r*(1-y)**1.4),C.c)}let b=Math.floor(Math.random()*3);for(let I=0;I<b;I++){let y=D+(Math.random()-.5)*.9,F=E*(1.1+Math.random()*1.6);v(C.x+Math.cos(y)*F,C.y+Math.sin(y)*F,C.r*(.12+Math.random()*.3),C.c)}}C.r>6&&Math.random()<.5&&_.push({x:C.x,y:C.y,r:C.r*.42,life:1,c:C.c,wob:Math.random()*ht})}t.pointer({down(C){P(),g.down=!0,g.x=C.x,g.y=C.y,g.still=0,v(C.x,C.y,p*.9)},move(C){let O=C.x-g.x,D=C.y-g.y,E=Math.hypot(O,D),z=Ut(p*(1.15-E/44),p*.16,p*1.25);R(g.x,g.y,C.x,C.y,z);let b=Math.min(6,Math.floor(E/7));for(let I=0;I<b;I++){let y=Math.atan2(D,O)+(Math.random()-.5)*(.45+Math.random()*.5),F=(E*16+200)*(.3+Math.random());N(C.x,C.y,Math.cos(y)*F,Math.sin(y)*F,p*(.1+Math.random()*Math.random()*.75))}g.x=C.x,g.y=C.y,E>2&&(g.still=0)},hover(C){g.x=C.x,g.y=C.y},up(){g.down=!1}}),n.loop(C=>{if(g.down&&(g.still+=C,g.still>.12)){let E=p*(1+Math.min(4,g.still*2.2));v(g.x+(Math.random()-.5)*3,g.y+(Math.random()-.5)*3,E),g.still>.9&&Math.random()<.06&&_.push({x:g.x+(Math.random()-.5)*E,y:g.y+E*.7,r:p*.5,life:1.3,c:f,wob:Math.random()*ht})}for(let E=w.length-1;E>=0;E--){let z=w[E];z.t-=C,z.x+=z.vx*C,z.y+=z.vy*C,z.t<=0&&(m(z),w.splice(E,1))}let O=Math.sin(T),D=Math.cos(T);for(let E=_.length-1;E>=0;E--){let z=_[E];z.wob+=C*3,z.x+=(O*62+Math.sin(z.wob)*7)*C*z.life,z.y+=D*62*C*z.life,z.life-=C*(.32+Math.random()*.2),v(z.x,z.y,Math.max(.6,z.r*Ut(z.life,.3,1)),z.c),(z.life<=0||z.y>i+8||z.x<-8||z.x>e+8)&&_.splice(E,1)}x?(ts(l,d,0,a.canvas),ts(l,h,1,o.canvas),x=!1):(yn(l,d,0),yn(l,h,1)),l.viewport(0,0,r.canvas.width,r.canvas.height),u.use().i("color",0).i("height",1).f("px",1/(e*s),1/(i*s)).f("light",(g.x/e-.5)*2.2,-(g.y/i-.5)*2.2,.9).f("strength",1.9).f("gloss",60).f("spec",.62).f("grain",0).f("tint",1,1,1),_n(l)});let M=[],L=C=>{let O=Dt(C.width,C.height);return O.getContext("2d").drawImage(C,0,0),O},P=()=>{M.push([L(a.canvas),L(o.canvas)]),M.length>8&&M.shift()},B=(C,O)=>{C.g.save(),C.g.setTransform(1,0,0,1,0,0),C.g.drawImage(O,0,0),C.g.restore()};n.undo=()=>{let C=M.pop();C&&(_.length=0,w.length=0,B(a,C[0]),B(o,C[1]),x=!0)},n.clear=()=>{P(),_.length=0,w.length=0,c(),x=!0},n.snapshot=()=>r.canvas,n.ui.swatches(hp,f,C=>{f=C}),n.ui.sep(),n.ui.slider("Load",2,16,p,C=>{p=C}),n.ui.slider("Tilt",-60,60,0,C=>{T=C*Math.PI/180}),n.ui.button("Let rip",()=>{P();for(let C=0;C<4;C++){let O=Math.random()*e,D=Math.random()*i,E=Math.random()*ht;for(let z=0;z<70;z++){E+=(Math.random()-.5)*1.1;let b=Ut(O+Math.cos(E)*26,0,e),I=Ut(D+Math.sin(E)*26,0,i);R(O,D,b,I,p*(.2+Math.pow(Math.random(),3))),Math.random()<.3&&N(b,I,Math.cos(E)*700,Math.sin(E)*700,p*Math.random()*.8),O=b,D=I}}}),n.hint("Fling fast for spatter, hold still to pool. The light follows your hand.")}var tu={Tenmoku:["#6e3f22","#2a1712","#120c0d","#8a5a34"],Celadon:["#b9d4c4","#7fae9c","#4d7f70","#d7e6da"],Ash:["#d9d3c7","#a79f92","#6d675f","#ece7dc"],Cobalt:["#3a63a8","#1b3674","#0e1c44","#7da0d8"]},eu={Gold:["#fff4b0","#e2ad2c","#a8701a"],Silver:["#ffffff","#c6ccd4","#7b8290"],Copper:["#ffd2b0","#d67a44","#8c4522"]};function xl(n){let t=n.surface({bleed:!0}),{W:e,H:i,px:s}=t,{canvas:r,g:a}=t.layer({alpha:!1}),o=Math.min(e,i)*.34,l=e/2,c=i/2+6,u="Tenmoku",d="Gold",h=1,f=!0,p="whole",T,x=[],g=[],w=[],_=0,v=null,R={x:l,y:c},N=0,m=Dt(e*s,i*s);{let S=m.getContext("2d");S.scale(s,s);let U=S.createRadialGradient(e/2,i*.42,40,e/2,i/2,Math.max(e,i)*.75);U.addColorStop(0,"#d8cdb8"),U.addColorStop(.6,"#b6a78e"),U.addColorStop(1,"#7d705c"),S.fillStyle=U,S.fillRect(0,0,e,i),rn(S,e,i,{alpha:.05,seed:5})}function M(){let S=Math.ceil(o*2+8),U=Dt(S*s,S*s),V=U.getContext("2d");V.scale(s,s);let A=S/2,[q,W,Z,Y]=tu[u],et=V.createRadialGradient(A-o*.26,A-o*.3,o*.05,A,A,o);et.addColorStop(0,q),et.addColorStop(.5,W),et.addColorStop(.86,Z),et.addColorStop(.97,Z),et.addColorStop(1,Y),V.fillStyle=et,V.beginPath(),V.arc(A,A,o,0,ht),V.fill(),V.save(),V.beginPath(),V.arc(A,A,o*.985,0,ht),V.clip();let ft=Ze(h*7+3);for(let ut=0;ut<2600;ut++){let _t=Math.random()*ht,nt=Math.sqrt(Math.random())*o,dt=A+Math.cos(_t)*nt,pt=A+Math.sin(_t)*nt,bt=ft(dt*.03,pt*.03);V.fillStyle=`rgba(${bt>.5?"255,235,205":"0,0,0"},${Math.abs(bt-.5)*.09})`,V.beginPath(),V.arc(dt,pt,1+Math.random()*7,0,ht),V.fill()}let ct=V.createRadialGradient(A,A,o*.08,A,A,o*.46);return ct.addColorStop(0,"rgba(0,0,0,.42)"),ct.addColorStop(1,"rgba(0,0,0,0)"),V.fillStyle=ct,V.fillRect(0,0,S,S),V.fillStyle="rgba(255,255,255,.1)",V.beginPath(),V.ellipse(A-o*.34,A-o*.42,o*.2,o*.08,-.7,0,ht),V.fill(),V.restore(),{c:U,d:S}}function L(S,U,V,A,q){let W=(U+A)/2,Z=(V+q)/2,Y=A-U,et=q-V,ft=ut=>(ut[0]-W)*Y+(ut[1]-Z)*et,ct=[];for(let ut=0;ut<S.length;ut++){let _t=S[ut],nt=S[(ut+1)%S.length],dt=ft(_t),pt=ft(nt);if(dt<=0&&ct.push(_t),dt<0!=pt<0){let bt=dt/(dt-pt);ct.push([qt(_t[0],nt[0],bt),qt(_t[1],nt[1],bt)])}}return ct}let P=new Map,B=S=>`${Math.round(S[0]*2)},${Math.round(S[1]*2)}`;function C(S,U){let V=B(S),A=B(U),q=V<A,W=q?V+"|"+A:A+"|"+V,Z=P.get(W);if(!Z){let Y=q?S:U,et=q?U:S,ft=Pe([...W].reduce((dt,pt)=>dt*31+pt.charCodeAt(0)>>>0,7)),ct=Ve(Y[0],Y[1],et[0],et[1]),ut=Math.max(2,Math.floor(ct/11)),_t=-(et[1]-Y[1])/ct,nt=(et[0]-Y[0])/ct;Z=[Y];for(let dt=1;dt<ut;dt++){let pt=dt/ut,bt=(ft()-.5)*9*Math.sin(pt*Math.PI);Z.push([qt(Y[0],et[0],pt)+_t*bt,qt(Y[1],et[1],pt)+nt*bt])}Z.push(et),P.set(W,Z)}return q?Z:[...Z].reverse()}function O(){P.clear();let S=[];for(let A=0;A<72;A++)S.push([Math.cos(A/72*ht)*o,Math.sin(A/72*ht)*o]);let U=g.map((A,q)=>{let W=S;return g.forEach((Z,Y)=>{q!==Y&&(W=L(W,A[0],A[1],Z[0],Z[1]))}),W}).filter(A=>A.length>2),V=new Map;x=U.map((A,q)=>{let W=[];for(let ct=0;ct<A.length;ct++){let ut=A[ct],_t=A[(ct+1)%A.length];if(Math.hypot(ut[0],ut[1])>o-.6&&Math.hypot(_t[0],_t[1])>o-.6){W.push(ut);continue}let nt=C(ut,_t);W.push(...nt.slice(0,-1));let dt=[B(ut),B(_t)].sort().join("|");V.has(dt)||V.set(dt,{pts:nt,owners:[]}),V.get(dt).owners.push(q)}let Z=0,Y=0;W.forEach(ct=>{Z+=ct[0],Y+=ct[1]}),Z/=W.length,Y/=W.length;let et=Math.atan2(Y,Z)+(Math.random()-.5)*.5,ft=o*(.14+Math.random()*.34);return{id:q,path:W,gx:Z,gy:Y,x:Math.cos(et)*ft,y:Math.sin(et)*ft,a:(Math.random()-.5)*.7,home:!1}}),w=[...V.values()].filter(A=>A.owners.length===2).map(A=>({...A,fill:0}))}function D(S,U){let V=S-l,A=U-c;if(Math.hypot(V,A)>o||p==="mended")return;let q=p==="whole"?13:6;for(let W=0;W<q;W++){let Z=Math.random()*ht,Y=Math.pow(Math.random(),1.6)*o*.85,et=V+Math.cos(Z)*Y,ft=A+Math.sin(Z)*Y;Math.hypot(et,ft)<o*1.02&&g.length<34&&g.push([et,ft])}for(;g.length<8;){let W=Math.random()*ht,Z=Math.random()*o;g.push([Math.cos(W)*Z,Math.sin(W)*Z])}p="broken",_=1,Kt("crack"),O(),n.dismissTip(),setTimeout(()=>{f&&n.hint("Drag each piece back to where it belongs. Metal fills the seam as they meet.")},900)}let E=S=>{a.beginPath(),S.forEach(([U,V],A)=>A?a.lineTo(U,V):a.moveTo(U,V)),a.closePath()};function z(S,U){for(let V=x.length-1;V>=0;V--){let A=x[V],q=Math.cos(-A.a),W=Math.sin(-A.a),Z=S-(l+A.gx+A.x),Y=U-(c+A.gy+A.y),et=Z*q-Y*W+A.gx,ft=Z*W+Y*q+A.gy;if(E(A.path),a.isPointInPath(et*s,ft*s))return A}return null}function b(S){a.save(),a.translate(l+S.gx+S.x,c+S.gy+S.y),a.rotate(S.a),a.translate(-S.gx,-S.gy),S.home||(a.save(),a.shadowColor="rgba(30,20,10,.55)",a.shadowBlur=v===S?30:14,a.shadowOffsetY=v===S?22:8,E(S.path),a.fillStyle="#000",a.fill(),a.restore()),E(S.path),a.save(),a.clip(),a.drawImage(T.c,-T.d/2,-T.d/2,T.d,T.d),a.restore(),S.home||(E(S.path),a.strokeStyle="#c9b08d",a.lineWidth=1.5,a.stroke()),a.restore()}function I(S){if(S.fill<=0)return;let U=Math.max(2,Math.ceil(S.pts.length*S.fill)),[V,A,q]=eu[d],W=(Z,Y)=>{a.strokeStyle=Y,a.lineWidth=Z,a.beginPath();for(let et=0;et<U;et++)et?a.lineTo(l+S.pts[et][0],c+S.pts[et][1]):a.moveTo(l+S.pts[et][0],c+S.pts[et][1]);a.stroke()};a.lineCap="round",a.lineJoin="round",W(4.6,q),W(3,A),W(1.1,V);for(let Z=0;Z<U;Z+=3){let[Y,et]=S.pts[Z],ft=Ut(1-Ve(l+Y,c+et,R.x,R.y)/130);ft>0&&(a.fillStyle=`rgba(255,252,225,${ft*.9})`,a.beginPath(),a.arc(l+Y,c+et,1+ft*2.4,0,ht),a.fill())}}function y(){h++,p="whole",x=[],g=[],w=[],T=M(),n.hint("Strike the bowl. Go on. Strike it again if you like.")}t.pointer({down(S){if(R=S,p==="broken"){let U=z(S.x,S.y);if(U){v=U,U.home=!1,U.grabX=S.x-U.x,U.grabY=S.y-U.y,x.splice(x.indexOf(U),1),x.push(U);return}}D(S.x,S.y)},move(S){R=S,v&&(v.x=S.x-v.grabX,v.y=S.y-v.grabY,v.a*=.92)},hover(S){R=S},up(){v&&(Math.hypot(v.x,v.y)<o*.16&&(v.x=0,v.y=0,v.a=0,v.home=!0,Kt("clink")),v=null)}}),n.loop(S=>{a.save(),a.setTransform(1,0,0,1,0,0),a.drawImage(m,0,0),a.restore(),_>0&&(_=Math.max(0,_-S*3.4)),a.save(),a.translate((Math.random()-.5)*_*16,(Math.random()-.5)*_*16);let U=p==="broken"?x.filter(A=>A.home).length/x.length:1,V=a.createRadialGradient(l,c+o*.12,o*.7,l,c+o*.12,o*1.24);if(V.addColorStop(0,`rgba(40,28,16,${.5*U*U})`),V.addColorStop(1,"rgba(40,28,16,0)"),a.fillStyle=V,a.fillRect(0,0,e,i),p==="whole")a.drawImage(T.c,l-T.d/2,c-T.d/2,T.d,T.d);else{for(let A of x)A.home&&b(A);w.forEach(A=>{let q=A.owners.every(W=>x.find(Z=>Z.id===W)?.home);A.fill=q?Math.min(1,A.fill+S*1.5):Math.max(0,A.fill-S*4),I(A)});for(let A of x)A.home||b(A)}p==="broken"&&x.length&&x.every(A=>A.home)&&w.every(A=>A.fill>=1)&&(p="mended",N=1,Kt("shimmer"),n.toast("Mended. It is worth more now.")),N>0&&(N=Math.max(0,N-S*.8),a.fillStyle=`rgba(255,240,190,${N*.35})`,a.beginPath(),a.arc(l,c,o*1.02,0,ht),a.fill()),a.restore()}),n.clear=y,n.snapshot=()=>r,n.ui.seg(Object.keys(tu),u,S=>{u=S,T=M()}),n.ui.sep(),n.ui.seg(Object.keys(eu),d,S=>{d=S}),n.ui.sep(),n.ui.button("Gather all",()=>{p==="broken"&&x.forEach((S,U)=>setTimeout(()=>{if(!f)return;let V=S.x,A=S.y,q=S.a,W=performance.now(),Z=n.loop(()=>{let Y=Ut((performance.now()-W)/500),et=1-Math.pow(1-Y,3);S.x=qt(V,0,et),S.y=qt(A,0,et),S.a=qt(q,0,et),Y>=1&&(S.home=!0,Kt("clink"),Z())})},U*90))}),n.ui.button("New bowl",y);let F=n.destroy;n.destroy=()=>{f=!1,F()},y()}var nu=["#e9d9b5","#c7562e","#efb54a","#2e6f8e","#7a3e2c","#e58a3a","#264653","#b83a6a","#5d9c59","#f4f1ea"],_l={Flask:n=>n<.13?.125:n<.32?.125+hi(.13,.32,n)*.305:.43-Math.pow(Math.max(0,n-.9)/.065,3)*.05,Tall:n=>n<.1?.1:n<.2?.1+hi(.1,.2,n)*.2:.3-Math.pow(Math.max(0,n-.92)/.045,3)*.04,Gourd:n=>n<.08?.09:.1+Math.abs(Math.sin((n-.02)*6.1))*.3+n*.08};function yl(n){let t=document.createElement("div");t.style.cssText="position:absolute;inset:0;background:radial-gradient(70% 60% at 50% 40%,#3b4652,#14181e 75%)",n.stage.appendChild(t);let e=n.surface({aspect:.62,maxPx:1400}),{W:i,H:s}=e,r=190,a=Math.round(r/.62),o=e.layer(),l=e.layer({hit:!1}),c=Dt(r,a),u=c.getContext("2d"),d=u.createImageData(r,a),h=new Uint32Array(d.data.buffer),f=new Uint32Array(r*a),p=new Uint8Array(r*a),T=new Uint8Array(r*a),x=Pe(11),g="Flask",w=nu[1],_="pour",v=0,R=!1,N=14;function m(){p.fill(0);let I=_l[g];for(let y=0;y<a;y++){let F=y/a;if(F<.05||F>.965)continue;let S=I(F)*r,U=Math.floor(r/2-S),V=Math.ceil(r/2+S);for(let A=Math.max(0,U);A<Math.min(r,V);A++)p[y*r+A]=1}}let M=I=>{let[y,F,S]=hn(I),U=(x()-.5)*44,V=A=>Ut(Math.round(A+U),0,255);return(255<<24|V(S)<<16|V(F)<<8|V(y))>>>0},L={x:i/2,y:40,down:!1},P=I=>[Math.floor(I.x/i*r),Math.floor(I.y/s*a)];e.pointer({down(I){b(),L.down=!0,L.x=I.x,L.y=I.y},move(I){if(_==="poke"){let[y,F]=P(L),[S,U]=P(I),V=Math.max(Math.abs(S-y),Math.abs(U-F),1);for(let A=0;A<=V;A++)B(y+(S-y)*A/V,F+(U-F)*A/V)}L.x=I.x,L.y=I.y},hover(I){L.x=I.x,L.y=I.y},up(){L.down=!1}});function B(I,y){let F=Math.round(I),S=Math.round(y);for(let U=14;U>=-14;U--)for(let V=-2;V<=2;V++){let A=F+V,q=S+U;if(A<0||A>=r||q<1||q>=a-1)continue;let W=q*r+A;if(!f[W])continue;let Z=W+r*(3+Math.floor(x()*3));if(Z<f.length&&p[Z]&&!f[Z])f[Z]=f[W],f[W]=0;else{let Y=W+r;if(p[Y]){let et=f[Y];f[Y]=f[W],f[W]=et}}}}function C(){T.fill(0);for(let I=a-2;I>=0;I--){let y=x()<.5;for(let F=0;F<r;F++){let S=y?F:r-1-F,U=I*r+S,V=f[U];if(!V||T[U])continue;let A=U+r;if(p[A]&&!f[A]){f[A]=V,f[U]=0,T[A]=1;continue}let q=x()<.5+v*.5?1:-1,W=A+q,Z=A-q,Y=S+q>=0&&S+q<r&&p[W]&&!f[W],et=S-q>=0&&S-q<r&&p[Z]&&!f[Z];if((Y||et)&&x()<.86){let ft=Y?W:Z;f[ft]=V,f[U]=0,T[ft]=1}else if(v){q=v>0?1:-1;let ft=U+q;x()<Math.abs(v)&&S+q>=0&&S+q<r&&p[ft]&&!f[ft]&&(f[ft]=V,f[U]=0,T[ft]=1)}}}}function O(){if(!L.down||_!=="pour"||R)return;let[I]=P(L),y=Math.floor(a*.06),F=Ut(I,r/2-r*.1,r/2+r*.1);for(let S=0;S<N;S++){let U=Math.round(F+(x()-.5)*7),A=(y+Math.floor(x()*16))*r+U;p[A]&&!f[A]&&(f[A]=M(w))}}function D(){h.set(f),u.putImageData(d,0,0);let I=o.g;I.clearRect(0,0,i,s),I.imageSmoothingEnabled=!1,I.drawImage(c,0,0,i,s),I.imageSmoothingEnabled=!0}function E(){let I=l.g,y=_l[g];I.clearRect(0,0,i,s);let F=[];for(let V=0;V<=120;V++){let A=.05+V/120*.915;F.push([y(A)*i,A*s])}let S=()=>{I.beginPath(),F.forEach(([V,A],q)=>q?I.lineTo(i/2+V,A):I.moveTo(i/2+V,A)),[...F].reverse().forEach(([V,A])=>I.lineTo(i/2-V,A)),I.closePath()};I.save(),S(),I.fillStyle="rgba(215,235,245,.07)",I.fill(),I.clip();let U=I.createLinearGradient(i*.05,0,i*.95,0);if(U.addColorStop(0,"rgba(0,10,20,.5)"),U.addColorStop(.14,"rgba(255,255,255,.03)"),U.addColorStop(.24,"rgba(255,255,255,.17)"),U.addColorStop(.32,"rgba(255,255,255,.03)"),U.addColorStop(.5,"rgba(255,255,255,0)"),U.addColorStop(.88,"rgba(255,255,255,.07)"),U.addColorStop(1,"rgba(0,10,20,.5)"),I.fillStyle=U,I.fillRect(0,0,i,s),I.restore(),S(),I.strokeStyle="rgba(232,244,250,.72)",I.lineWidth=Math.max(2,i*.012),I.stroke(),R){let V=y(.05)*i,A=I.createLinearGradient(i/2-V,0,i/2+V,0);A.addColorStop(0,"#7b5a3a"),A.addColorStop(.45,"#c79a6a"),A.addColorStop(1,"#6d4f33"),I.fillStyle=A,I.beginPath(),I.roundRect(i/2-V*1.04,s*.008,V*2.08,s*.062,6),I.fill()}}n.loop(()=>{O(),C(),C(),D()});let z=[],b=()=>{z.push(f.slice()),z.length>12&&z.shift()};n.undo=()=>{let I=z.pop();I&&f.set(I)},n.clear=()=>{b(),f.fill(0),R=!1,E()},n.snapshot=()=>{let I=Dt(o.canvas.width,o.canvas.height),y=I.getContext("2d"),F=y.createRadialGradient(I.width/2,I.height*.4,10,I.width/2,I.height/2,I.height*.8);return F.addColorStop(0,"#3b4652"),F.addColorStop(1,"#14181e"),y.fillStyle=F,y.fillRect(0,0,I.width,I.height),y.drawImage(o.canvas,0,0),y.drawImage(l.canvas,0,0),I},m(),E(),n.ui.swatches(nu,w,I=>{w=I}),n.ui.sep(),n.ui.seg([["pour","Pour"],["poke","Poke"]],_,I=>{_=I,e.el.style.cursor=I==="poke"?"grab":"crosshair"}),n.ui.slider("Tilt",-100,100,0,I=>{v=I/100,e.el.style.transform=`rotate(${I*.07}deg)`}),n.ui.seg(Object.keys(_l),g,I=>{g=I,f.fill(0),m(),E()}),n.ui.button("Cork",()=>{R=!R,E()}),n.hint("Hold to pour. Switch to Poke and push the stick down the glass.")}var es={Harbour:{bath:"#e9dfc9",inks:["#1c425c","#b84a30","#e0aa46","#3a7a8c","#14202f","#f1e8d6"]},Peacock:{bath:"#0f2a2c",inks:["#1fa39a","#e6b93d","#c5426b","#2d5fb0","#f0e6cf","#123f46"]},Rosewater:{bath:"#f5e4dc",inks:["#c9546c","#7d2f4d","#e9a2a0","#3f5f7a","#f7f0e6","#d9894a"]},Bookbinder:{bath:"#d9c7a3",inks:["#6d2a1d","#21352d","#a87a2a","#1d2a44","#e8dcc0","#9c4a2a"]}};function vl(n){let t=n.surface({aspect:1.42,paper:!0,maxPx:2e3}),{W:e,H:i}=t,{canvas:s,g:r}=t.layer({alpha:!1}),a=t.layer({hit:!1}),o="Harbour",l=es[o].inks[0],c="drop",u=46,d=12,h=[],f=[],p=null,T=!1,x=!0;function g(b,I,y){let F=y*y;for(let S of h){let U=S.pts;for(let V=0;V<U.length;V+=2){let A=U[V]-b,q=U[V+1]-I,W=A*A+q*q||1e-4,Z=Math.sqrt(1+F/W);U[V]=b+A*Z,U[V+1]=I+q*Z}}}function w(b,I,y,F,S,U,V){let A=-F,q=y,W=Math.log(.01)/Math.log(U);for(let Z of h){let Y=Z.pts;for(let et=0;et<Y.length;et+=2){let ft=Math.abs((Y[et]-b)*A+(Y[et+1]-I)*q),ct=(Y[et]-b)*y+(Y[et+1]-I)*F;if(ft>W||Math.abs(ct)>V*2.2)continue;let ut=S*Math.pow(U,ft)*Math.exp(-(ct*ct)/(V*V));Y[et]+=y*ut,Y[et+1]+=F*ut}}}function _(b,I,y,F){for(let S of h){let U=S.pts;for(let V=0;V<U.length;V+=2){let A=U[V]-b,q=U[V+1]-I,W=Math.hypot(A,q),Z=y*Math.exp(-(W*W)/(F*F)),Y=Math.cos(Z),et=Math.sin(Z);U[V]=b+A*Y-q*et,U[V+1]=I+A*et+q*Y}}}function v(){for(let b of h){let I=b.pts;if(I.length>4e3)continue;let y=!1,F=[];for(let S=0;S<I.length;S+=2){let U=(S+2)%I.length;F.push(I[S],I[S+1]),Math.hypot(I[U]-I[S],I[U+1]-I[S+1])>5&&(F.push((I[S]+I[U])/2,(I[S+1]+I[U+1])/2),y=!0)}y&&(b.pts=F)}}let R=(b,I,y)=>{let S=new Array(192);for(let U=0;U<96;U++)S[U*2]=b+Math.cos(U/96*ht)*y,S[U*2+1]=I+Math.sin(U/96*ht)*y;return S};function N(b,I,y,F){h.push({pts:R(b,I,.5),colour:F}),Kt("plop"),f.push({x:b,y:I,r:y,grown:.5})}function m(b){for(let I=f.length-1;I>=0;I--){let y=f[I],F=Math.min(y.r,y.grown+(y.r-y.grown)*Math.min(1,b*7)+.8),S=Math.sqrt(Math.max(0,F*F-y.grown*y.grown));S>.01&&g(y.x,y.y,S),y.grown=F,y.grown>=y.r-.01&&f.splice(I,1),x=!0}}function M(){r.fillStyle=es[o].bath,r.fillRect(0,0,e,i);for(let b of h){let I=b.pts;r.fillStyle=b.colour,r.beginPath(),r.moveTo(I[0],I[1]);for(let y=2;y<I.length;y+=2)r.lineTo(I[y],I[y+1]);r.closePath(),r.fill()}}function L(b){let I=a.g;if(I.clearRect(0,0,e,i),T||p)return;let y=I.createLinearGradient(0,0,e,i),F=.5+Math.sin(b*.4)*.12;y.addColorStop(Ut(F-.25),"rgba(255,255,255,0)"),y.addColorStop(Ut(F),"rgba(255,255,255,.1)"),y.addColorStop(Ut(F+.25),"rgba(255,255,255,0)"),I.fillStyle=y,I.fillRect(0,0,e,i)}let P={x:0,y:0,down:!1,travelled:0};t.pointer({down(b){T||(D(),P.down=!0,P.x=b.x,P.y=b.y,P.travelled=0,c==="drop"&&N(b.x,b.y,u,l))},move(b){if(!P.down||T)return;let I=b.x-P.x,y=b.y-P.y,F=Math.hypot(I,y);if(F<1.5)return;let S=I/F,U=y/F;if(c==="rake"||c==="stylus"){let V=Math.ceil(F/5),A=F/V,q=Math.min(e,i)*.92/d;for(let W=1;W<=V;W++){let Z=P.x+I*W/V,Y=P.y+y*W/V;if(c==="stylus")w(Z,Y,S,U,A*.72,.955,44);else for(let et=0;et<d;et++){let ft=(et-(d-1)/2)*q;w(Z-U*ft,Y+S*ft,S,U,A*.66,.94,36)}v()}}else if(c==="swirl"){let V=I*(P.y-i/2)-y*(P.x-e/2)>0?-1:1;_(b.x,b.y,V*F*.012,90)}else P.travelled+=F,P.travelled>u*.8&&(P.travelled=0,N(b.x,b.y,u*.55,l));P.x=b.x,P.y=b.y,x=!0},up(){P.down=!1,v(),x=!0}});let B=Dt(s.width,s.height);function C(){M();let b=B.getContext("2d");b.setTransform(1,0,0,1,0,0),b.drawImage(s,0,0),b.scale(s.width/e,s.height/i),b.globalCompositeOperation="multiply",b.fillStyle="#fbf7ec",b.fillRect(0,0,e,i),b.globalCompositeOperation="source-over",rn(b,e,i,{alpha:.09,seed:2}),b.strokeStyle="rgba(246,240,226,.95)",b.lineWidth=Math.max(10,e*.018),b.strokeRect(0,0,e,i),b.setTransform(1,0,0,1,0,0),T=!0,n.toast("Printed. The bin skims the bath for another go.")}n.loop((b,I)=>{if(m(b),x&&(M(),x=!1,f.length||v()),L(I),T&&(r.save(),r.setTransform(1,0,0,1,0,0),r.drawImage(B,0,0),r.restore()),p){p.t+=b/1.6;let y=a.g,F=p.t;if(y.clearRect(0,0,e,i),F<.5){let S=Ut(F/.5);y.fillStyle="#f5efe1",y.fillRect(0,0,e*S,i);let U=y.createLinearGradient(e*S-60,0,e*S,0);U.addColorStop(0,"rgba(0,0,0,0)"),U.addColorStop(1,"rgba(0,0,0,.28)"),y.fillStyle=U,y.fillRect(e*S-60,0,60,i)}else{T||C();let S=Ut((F-.5)/.5);y.fillStyle="#f5efe1",y.fillRect(e*S,0,e*(1-S),i);let U=y.createLinearGradient(e*S,0,e*S+70,0);U.addColorStop(0,"rgba(0,0,0,.34)"),U.addColorStop(1,"rgba(0,0,0,0)"),y.fillStyle=U,y.fillRect(e*S,0,70,i)}p.t>=1&&(p=null)}});let O=[],D=()=>{O.push(h.map(b=>({...b,pts:b.pts.slice()}))),O.length>12&&O.shift()};n.undo=()=>{let b=O.pop();b&&!T&&(h=b,f=[],x=!0)},n.clear=()=>{h=[],f=[],T=!1,p=null,x=!0},n.snapshot=()=>T?B:s;let E=document.createElement("div");E.style.display="contents",n.dock.appendChild(E);let z=()=>{let b=new Set(n.dock.children);n.ui.swatches(es[o].inks,l,I=>{l=I}),E.replaceChildren(...[...n.dock.children].filter(I=>!b.has(I)))};z(),n.ui.sep(),n.ui.seg([["drop","Drop"],["rake","Rake"],["stylus","Stylus"],["swirl","Swirl"]],c,b=>{c=b}),n.ui.slider("Size",12,110,u,b=>{u=b}),n.ui.slider("Tines",3,28,d,b=>{d=b}),n.ui.seg(Object.keys(es),o,b=>{o=b,l=es[b].inks[0],z(),x=!0}),n.ui.button("Lay the paper",()=>{!p&&!T&&(p={t:0},Kt("paper"))},"hot");for(let b=0;b<26;b++){let I=e*(.08+.84*Math.random()),y=i*(.08+.84*Math.random()),F=40+Math.random()*50;g(I,y,F),h.push({pts:R(I,y,F),colour:es[o].inks[b%5]})}v(),n.hint("Tap to drop ink. Switch to Rake and drag across the bath. Then lay the paper.")}var Ml={Night:{sky:["#07101f","#10233f","#2a2342"],lights:["#ffb347","#ff5e62","#7ad7f0","#fff3c4","#ff8fb1"],fog:"rgb(174,190,208)"},Dawn:{sky:["#37436e","#b9708a","#f4b582"],lights:["#ffe2a8","#ffd0a0","#fff3c4"],fog:"rgb(226,216,214)"},Harbour:{sky:["#0b2233","#144058","#1f6372"],lights:["#ffd27a","#7fe0d0","#fff3c4","#ff7a59"],fog:"rgb(178,204,208)"}};function Sl(n){let t=n.surface({bleed:!0,maxPx:1500}),{W:e,H:i,px:s}=t,r=t.layer({alpha:!1}),a=t.layer(),o=t.layer(),l=a.g,c="Night",u=26,d=.5,h=Dt(e*s,i*s),f=Dt(e*s*.25,i*s*.25),p=f.getContext("2d"),T=[],x=[];function g(){let O=Ml[c],D=Pe(c.length*31),E=h.getContext("2d");E.setTransform(s,0,0,s,0,0);let z=E.createLinearGradient(0,0,0,i);O.sky.forEach((b,I)=>z.addColorStop(I/2,b)),E.fillStyle=z,E.fillRect(0,0,e,i);for(let b=0;b<3;b++){let I=i*(.5+b*.14),y=-20;for(;y<e+20;){let F=40+D()*90,S=(70+D()*240)*(1-b*.2);E.fillStyle=`rgba(${6+b*4},${10+b*5},${20+b*6},.96)`,E.fillRect(y,I-S,F,i);for(let U=I-S+8;U<i*.92;U+=13)for(let V=y+6;V<y+F-6;V+=10)D()<.26&&(E.fillStyle=O.lights[Math.floor(D()*O.lights.length)],E.globalAlpha=.45+D()*.5,E.fillRect(V,U,5,7),E.globalAlpha=1);y+=F+D()*10}}T.length=0;for(let b=0;b<26;b++)T.push({x:D()*e,y:i*(.42+D()*.5),r:10+D()*34,c:O.lights[b%O.lights.length],p:D()*ht});x.length=0;for(let b=0;b<12;b++)x.push({x:D()*e,y:i*(.8+b%3*.05),v:(b%2?-1:1)*(50+D()*70),c:b%2?"#ff4c4c":"#fff0c8"})}function w(O){let D=r.g;D.save(),D.setTransform(1,0,0,1,0,0),D.drawImage(h,0,0),D.restore(),D.save(),D.globalCompositeOperation="lighter";for(let E of T){let z=D.createRadialGradient(E.x,E.y,0,E.x,E.y,E.r);z.addColorStop(0,E.c),z.addColorStop(1,"rgba(0,0,0,0)"),D.globalAlpha=.16+.08*Math.sin(O*1.2+E.p),D.fillStyle=z,D.fillRect(E.x-E.r,E.y-E.r,E.r*2,E.r*2)}D.globalAlpha=.85;for(let E of x)D.fillStyle=E.c,D.beginPath(),D.arc(E.x,E.y,3,0,ht),D.arc(E.x+10,E.y,3,0,ht),D.fill();D.restore(),p.filter="blur(5px) saturate(1.7) brightness(1.3)",p.drawImage(r.canvas,0,0,f.width,f.height),p.filter="none"}let _=Dt(e*s*.5,i*s*.5),v=_.getContext("2d");v.scale(s*.5,s*.5),v.lineCap="round",v.lineJoin="round";function R(){v.globalCompositeOperation="source-over",v.fillStyle="#fff",v.fillRect(0,0,e,i)}function N(O,D,E,z,b){v.globalCompositeOperation="destination-out",v.strokeStyle="rgba(0,0,0,1)",v.lineWidth=b,v.beginPath(),v.moveTo(O,D),v.lineTo(E,z),v.stroke(),v.strokeStyle="rgba(0,0,0,.25)",v.lineWidth=b*1.5,v.stroke()}let m=[],M=[],L=[],P={x:0,y:0,acc:0},B=(O,D,E)=>M.push({x:O,y:D,fat:E});t.pointer({down(O){P.x=O.x,P.y=O.y,N(O.x,O.y,O.x+.1,O.y,u)},move(O){if(N(P.x,P.y,O.x,O.y,u),P.acc+=Math.hypot(O.x-P.x,O.y-P.y),P.acc>34){P.acc=0;let D=Math.random()<.5?-1:1;B(O.x+D*u*.55,O.y+(Math.random()-.3)*u,2+Math.random()*3.4)}P.x=O.x,P.y=O.y}});function C(O,D,E,z){let b=O.createRadialGradient(D-z*.3,E-z*.4,z*.1,D,E,z);b.addColorStop(0,"rgba(255,255,255,.75)"),b.addColorStop(.5,"rgba(180,210,235,.2)"),b.addColorStop(1,"rgba(10,20,40,.45)"),O.fillStyle=b,O.beginPath(),O.ellipse(D,E,z*.86,z*1.1,0,0,ht),O.fill()}n.loop((O,D)=>{for(let I of x)I.x+=I.v*O,I.x<-30&&(I.x=e+30),I.x>e+30&&(I.x=-30);w(D),d>0&&(v.globalCompositeOperation="source-over",v.globalAlpha=O*d*.05,v.fillStyle="#fff",v.fillRect(0,0,e,i),v.globalAlpha=1);for(let I=L.length-1;I>=0;I--){let y=L[I];y.t+=O;let F=v.createRadialGradient(e/2,i*.55,0,e/2,i*.55,Math.max(e,i)*qt(.2,.9,Ut(y.t/1.4)));F.addColorStop(0,"rgba(255,255,255,.18)"),F.addColorStop(1,"rgba(255,255,255,0)"),v.globalCompositeOperation="source-over",v.fillStyle=F,v.fillRect(0,0,e,i),y.t>1.4&&L.splice(I,1)}let E=a.canvas.width,z=a.canvas.height;l.save(),l.setTransform(1,0,0,1,0,0),l.globalCompositeOperation="copy",l.imageSmoothingQuality="high",l.drawImage(f,0,0,E,z),l.globalCompositeOperation="source-over",l.globalAlpha=.44,l.fillStyle=Ml[c].fog,l.fillRect(0,0,E,z),l.globalAlpha=1,l.globalCompositeOperation="destination-in",l.drawImage(_,0,0,E,z),l.restore();let b=o.g;b.clearRect(0,0,e,i);for(let I=M.length-1;I>=0;I--){let y=M[I];if(y.fat+=O*.5,y.fat>5&&Math.random()<.05){m.push({x:y.x,y:y.y,r:y.fat,v:60+Math.random()*120,wob:Math.random()*ht}),M.splice(I,1);continue}C(b,y.x,y.y,y.fat)}M.length>220&&M.splice(0,30),Math.random()<O*.9&&B(Math.random()*e,Math.random()*i*.7,1.5+Math.random()*2.5);for(let I=m.length-1;I>=0;I--){let y=m[I],F=y.x,S=y.y;y.wob+=O*5,y.y+=y.v*O,y.x+=Math.sin(y.wob)*18*O,y.v=Ut(y.v+(Math.random()-.48)*240*O,12,240),N(F,S,y.x,y.y,y.r*1.3),C(b,y.x,y.y,y.r),y.r=Math.max(1.5,y.r-O*.35),y.y>i+10&&m.splice(I,1)}}),n.clear=()=>{R(),M.length=0,m.length=0},n.snapshot=()=>{let O=Dt(r.canvas.width,r.canvas.height),D=O.getContext("2d");return D.drawImage(r.canvas,0,0),D.drawImage(a.canvas,0,0),D.drawImage(o.canvas,0,0),O},g(),R(),n.ui.seg(Object.keys(Ml),c,O=>{c=O,g()}),n.ui.sep(),n.ui.slider("Finger",10,70,u,O=>{u=O}),n.ui.slider("Fog returns",0,3,d,O=>{d=O},.1),n.ui.button("Breathe",()=>{L.push({t:0}),Kt("breath")},"hot"),n.hint("Draw on the glass with your finger. It will not stay clear for long.")}var iu={Neon:n=>`hsl(${n*300%360},96%,62%)`,Ember:n=>`hsl(${28+Math.sin(n*5)*26},98%,${58+Math.sin(n*3)*8}%)`,Ice:n=>`hsl(${190+Math.sin(n*4)*34},90%,${70+Math.sin(n*2)*8}%)`,Pearl:n=>`hsl(${(n*120+260)%360},60%,84%)`};function bl(n){let t=n.surface({bleed:!0,bg:"#07050f",maxPx:1800}),{W:e,H:i}=t,s=t.buffer(),r=t.layer({alpha:!1}),a=t.layer({hit:!1}),o=e/2,l=i/2,c=8,u=!0,d="Neon",h=3,f=0,p=0,T=0,x=!0,g=!0,w=null,_=n.rasterUndo(s.canvas);function v(m){let M=m.x-o,L=m.y-l,P=Math.cos(-p),B=Math.sin(-p);return{x:M*P-L*B,y:M*B+L*P}}function R(m,M){let L=s.g,P=Math.hypot(M.x-m.x,M.y-m.y),B=Ut(h*(1.5-P/40),h*.4,h*1.5);T+=.002+P*35e-5;let C=iu[d](T),O=()=>{L.beginPath(),L.moveTo(m.x,m.y),L.lineTo(M.x,M.y),L.stroke()};L.save(),L.translate(o,l),L.globalCompositeOperation="lighter",L.lineCap="round",L.strokeStyle=C;for(let D=0;D<c;D++)for(let E of u?[1,-1]:[1])L.save(),L.rotate(D/c*ht),L.scale(1,E),x&&(L.globalAlpha=.14,L.lineWidth=B*5,O()),L.globalAlpha=.9,L.lineWidth=B,O(),L.restore();L.restore()}t.pointer({down(m){_(),w=v(m),R(w,{x:w.x+.1,y:w.y})},move(m){let M=v(m);R(w,M),w=M},up(){w=null}});function N(){let m=a.g;if(m.clearRect(0,0,e,i),!g)return;m.save(),m.translate(o,l),m.strokeStyle="rgba(255,255,255,.1)",m.lineWidth=1;let M=Math.hypot(e,i),L=u?c*2:c;for(let P=0;P<L;P++){let B=P/L*ht+p;m.beginPath(),m.moveTo(0,0),m.lineTo(Math.cos(B)*M,Math.sin(B)*M),m.stroke()}m.restore()}n.loop(m=>{p+=f*m;let M=r.g;M.fillStyle="#07050f",M.fillRect(0,0,e,i),M.save(),M.translate(o,l),M.rotate(p),M.translate(-o,-l),M.drawImage(s.canvas,0,0,e,i),M.restore(),N()}),n.clear=()=>{_(),s.g.clearRect(0,0,e,i)},n.snapshot=()=>r.canvas,n.ui.seg(Object.keys(iu),d,m=>{d=m}),n.ui.sep(),n.ui.slider("Mirrors",2,24,c,m=>{c=m}),n.ui.toggle("Reflect",u,m=>{u=m}),n.ui.slider("Width",1,12,h,m=>{h=m}),n.ui.slider("Turn",-100,100,0,m=>{f=m/100}),n.ui.toggle("Glow",x,m=>{x=m}),n.ui.toggle("Guides",g,m=>{g=m}),n.hint("Draw anywhere. Then set it turning and paint on the wheel.")}var up=Math.sqrt(3)/2,dp=n=>{let t=n*Math.PI/180,e=Math.cos(t),i=Math.sin(t);return[e,i,-i,e,0,0]},wl=[1,0,0,1,0,0],au=[-1,0,0,1,0,0],fp=(n,t)=>[n[0]*t[0]+n[2]*t[1],n[1]*t[0]+n[3]*t[1],n[0]*t[2]+n[2]*t[3],n[1]*t[2]+n[3]*t[3],n[0]*t[4]+n[2]*t[5]+n[4],n[1]*t[4]+n[3]*t[5]+n[5]],ns=n=>Array.from({length:n},(t,e)=>dp(360/n*e)),su=n=>[...n,...n.map(t=>fp(t,au))],is=n=>[[n,0],[0,n]],Tl=n=>[[n,0],[n/2,n*up]],ru={p1:{lattice:is,ops:()=>[wl],label:"Slide"},p2:{lattice:is,ops:()=>ns(2),label:"Half turn"},pm:{lattice:is,ops:()=>[wl,au],label:"Mirror"},pg:{lattice:is,ops:n=>[wl,[-1,0,0,1,0,n/2]],label:"Glide"},p4:{lattice:is,ops:()=>ns(4),label:"Quarter"},p4m:{lattice:is,ops:()=>su(ns(4)),label:"Tile"},p3:{lattice:Tl,ops:()=>ns(3),label:"Triad"},p6:{lattice:Tl,ops:()=>ns(6),label:"Hex"},p6m:{lattice:Tl,ops:()=>su(ns(6)),label:"Snowflake"}},Zs=[["#f0e4c2","#123c30","#38b58a","#e8a33d","#c7482e"],["#123c30","#f0e4c2","#38b58a","#e8a33d","#ef8fa0"],["#f7efe6","#2a2a6e","#e0508a","#f2b705","#1fa39a"],["#1b1730","#f7efe6","#ff7a59","#7ad7f0","#c8a2ff"]];function El(n){let t=n.surface({bleed:!0,maxPx:1800}),{W:e,H:i}=t,{canvas:s,g:r}=t.layer({alpha:!1}),a=t.layer({hit:!1}),o=e/2,l=i/2,c="p4m",u=150,d=0,h=Zs[0][1],f=4,p=!0,T=[],x=null,g,w,_,v;function R(){let C=ru[c];g=C.lattice(u),w=C.ops(u);let[[O,D],[E,z]]=g,b=O*z-D*E;_=(y,F)=>[(y*z-F*E)/b,(-y*D+F*O)/b];let I=[[-o,-l],[e-o,-l],[-o,i-l],[e-o,i-l]].map(([y,F])=>_(y,F));v=[Math.min(...I.map(y=>y[0])),Math.max(...I.map(y=>y[0])),Math.min(...I.map(y=>y[1])),Math.max(...I.map(y=>y[1]))]}function N(C,O,D,E){let[[z,b],[I,y]]=g;for(let F of w){let S=F[0]*C+F[2]*O+F[4],U=F[1]*C+F[3]*O+F[5],V=F[0]*D+F[2]*E+F[4],A=F[1]*D+F[3]*E+F[5],[q,W]=_(S,U),Z=Math.floor(v[0]-q)-1,Y=Math.ceil(v[1]-q)+1,et=Math.floor(v[2]-W)-1,ft=Math.ceil(v[3]-W)+1;for(let ct=Z;ct<=Y;ct++)for(let ut=et;ut<=ft;ut++){let _t=o+ct*z+ut*I,nt=l+ct*b+ut*y;r.moveTo(S+_t,U+nt),r.lineTo(V+_t,A+nt)}}}function m(C,O=1){r.strokeStyle=C.colour,r.lineWidth=C.width,r.lineCap="round",r.lineJoin="round",r.beginPath();for(let D=O;D<C.pts.length;D++){let E=C.pts[D-1],z=C.pts[D];N(E[0],E[1],z[0],z[1])}r.stroke()}function M(){R(),r.fillStyle=Zs[d][0],r.fillRect(0,0,e,i);for(let C of T)m(C);L()}function L(){let C=a.g;if(C.clearRect(0,0,e,i),!p)return;let[[O,D],[E,z]]=g;C.strokeStyle=d%2?"rgba(255,255,255,.2)":"rgba(0,0,0,.16)",C.lineWidth=1,C.setLineDash([3,5]),C.beginPath();let b=Math.floor(v[0])-2,I=Math.ceil(v[1])+2,y=Math.floor(v[2])-2,F=Math.ceil(v[3])+2;for(let S=b;S<=I;S++)C.moveTo(o+S*O+y*E,l+S*D+y*z),C.lineTo(o+S*O+F*E,l+S*D+F*z);for(let S=y;S<=F;S++)C.moveTo(o+b*O+S*E,l+b*D+S*z),C.lineTo(o+I*O+S*E,l+I*D+S*z);C.stroke(),C.setLineDash([])}t.pointer({down(C){x={pts:[[C.x-o,C.y-l],[C.x-o+.1,C.y-l]],colour:h,width:f},T.push(x),m(x)},move(C){x&&(x.pts.push([C.x-o,C.y-l]),m(x,x.pts.length-1))},up(){x=null}}),n.undo=()=>{T.pop(),M()},n.clear=()=>{T=[],M()},n.snapshot=()=>s;let P=document.createElement("div");P.style.display="contents",n.dock.appendChild(P);let B=()=>{let C=new Set(n.dock.children);n.ui.swatches(Zs[d].slice(1),h,O=>{h=O}),P.replaceChildren(...[...n.dock.children].filter(O=>!C.has(O)))};B(),n.ui.sep(),n.ui.seg(Object.entries(ru).map(([C,O])=>[C,O.label]),c,C=>{c=C,M()}),n.ui.sep(),n.ui.slider("Tile",70,320,u,C=>{u=C,M()}),n.ui.slider("Pen",1,18,f,C=>{f=C}),n.ui.toggle("Seams",p,C=>{p=C,L()}),n.ui.button("Paper",()=>{d=(d+1)%Zs.length,h=Zs[d][1],B(),M()}),M(),n.hint("Draw anywhere, then switch symmetry and watch the whole wall re-weave itself.")}var Al="the brush remembers what the hand forgets and the hand forgets what the eye forgave ",ou=[["italic 400 %px Fraunces","Serif"],["400 %px Anton","Poster"],["600 %px Caveat","Hand"],['500 %px "DM Mono"',"Type"],["400 %px VT323","Pixel"]],lu=["#1b1a1f","#c23b5a","#1f4fd8","#0f7a5a","#b8741a","#f6e9e3"],cu={Cream:"#f6efe3",Blush:"#f6e0da",Night:"#141320",Sage:"#dfe5d4"};function Cl(n){let t=n.surface({paper:!0,maxPx:2200}),{W:e,H:i}=t,{canvas:s,g:r}=t.layer({alpha:!1}),a=n.rasterUndo(s),o=Al,l=ou[0][0],c=lu[0],u=34,d=!1,h="Cream",f=0,p={x:0,y:0,carry:0,last:0,sz:30};function T(){r.fillStyle=cu[h],r.fillRect(0,0,e,i),rn(r,e,i,{alpha:h==="Night"?.03:.05,seed:8})}let x=()=>{let N=o.trim()?o:Al;return N[f++%N.length]};function g(N,m,M){let L=N-p.x,P=m-p.y,B=Math.hypot(L,P);if(B<.5)return;let C=Math.max(1,M-p.last);p.last=M;let O=Ut(u*(1.7-B/C*.55),u*.36,u*2.1);p.sz=qt(p.sz,O,.16);let D=Math.atan2(P,L),E=p.carry,z=L/B,b=P/B,I=p.x,y=p.y,F=B;for(;;){let S=_(),U=r.measureText(S).width+p.sz*.05;if(E+F<U){p.carry=E+F;break}let V=U-E;I+=z*V,y+=b*V,F-=V,E=0,v(S,I-z*U*.5,y-b*U*.5,D),w=null}p.x=N,p.y=m}let w=null;function _(){return w||(w=x()),r.font=l.replace("%",p.sz.toFixed(1)),w}function v(N,m,M,L){r.save(),r.translate(m,M),r.rotate(L),r.font=l.replace("%",p.sz.toFixed(1)),r.fillStyle=d?`hsl(${f*5%360},70%,${h==="Night"?70:42}%)`:c,r.textAlign="center",r.textBaseline="middle",r.fillText(N,0,0),r.restore()}t.pointer({down(N){a(),p.x=N.x,p.y=N.y,p.carry=0,p.last=performance.now(),p.sz=u},move(N){g(N.x,N.y,performance.now())}}),n.clear=()=>{a(),f=0,T()},n.snapshot=()=>s,T(),n.ui.text(Al.trim(),N=>{o=N+" ",f=0,w=null},"Type your verse"),n.ui.sep(),n.ui.swatches(lu,c,N=>{c=N,d=!1,R.classList.remove("on")});let R=n.ui.toggle("Spectrum",d,N=>{d=N});n.ui.sep(),n.ui.seg(ou.map(([N,m])=>[N,m]),l,N=>{l=N}),n.ui.slider("Size",14,80,u,N=>{u=N}),n.ui.seg(Object.keys(cu),h,N=>{h=N,a(),T()}),n.hint("Paint slowly to shout, quickly to whisper. Type your own words in the dock.")}var ss=["#f1ece0","#d8312c","#f3c613","#1f3f9e","#141414"],hu=[196,220,247,294,330,392,440,494,587,659],Ks=9;function Rl(n){let t=n.surface({aspect:1.15,paper:!0,maxPx:2e3}),{W:e,H:i,px:s}=t,{canvas:r,g:a}=t.layer({alpha:!1}),o=ss[1],l=u(),c=Dt(e*s,i*s);{let E=c.getContext("2d");E.scale(s,s),rn(E,e,i,{alpha:.07,seed:12})}function u(E=ss[0]){return{colour:E,split:null}}function d(E,z,b,I,y,F,S,U=0){if(E.rect=[z,b,I,y],!E.split){F.push(E);return}let{axis:V,at:A}=E.split,q=Math.max(4,Ks-U*.7);if(V==="x"){let W=I*A;d(E.a,z,b,W,y,F,S,U+1),d(E.b,z+W,b,I-W,y,F,S,U+1),S.push({n:E,axis:V,x1:z+W,y1:b,x2:z+W,y2:b+y,thick:q})}else{let W=y*A;d(E.a,z,b,I,W,F,S,U+1),d(E.b,z,b+W,I,y-W,F,S,U+1),S.push({n:E,axis:V,x1:z,y1:b+W,x2:z+I,y2:b+W,thick:q})}}let h=[],f=[],p=()=>{h=[],f=[],d(l,0,0,e,i,h,f),_.forEach(E=>{E.seg>=f.length&&(E.seg=Math.floor(Math.random()*f.length))})},T=(E,z)=>h.find(b=>{let[I,y,F,S]=b.rect;return E>=I&&E<=I+F&&z>=y&&z<=y+S}),x=(E,z)=>f.find(b=>b.axis==="x"?Math.abs(E-b.x1)<9&&z>=b.y1&&z<=b.y2:Math.abs(z-b.y1)<9&&E>=b.x1&&E<=b.x2);function g(E,z,b){let[I,y,F,S]=E.rect,U=z==="x"?(b-I)/F:(b-y)/S;U<.06||U>.94||(E.split={axis:z,at:U},E.a=u(E.colour),E.b=u(E.colour),p(),Kt("tock"))}let w={down:!1,x:0,y:0,cx:0,cy:0,line:null};t.pointer({down(E){Object.assign(w,{down:!0,x:E.x,y:E.y,cx:E.x,cy:E.y,line:x(E.x,E.y)}),C()},move(E){if(w.cx=E.x,w.cy=E.y,w.line){let z=w.line.n,[b,I,y,F]=z.rect;z.split.at=w.line.axis==="x"?Ut((E.x-b)/y,.05,.95):Ut((E.y-I)/F,.05,.95),p(),w.line=f.find(S=>S.n===z)}},hover(E){t.el.style.cursor=x(E.x,E.y)?"move":"crosshair"},up(){let E=w.cx-w.x,z=w.cy-w.y,b=Math.hypot(E,z)>12;if(w.down=!1,w.line){w.line=null;return}let I=T(w.x,w.y);I&&(b?g(I,Math.abs(z)>Math.abs(E)?"x":"y",Math.abs(z)>Math.abs(E)?w.x:w.y):(I.colour=I.colour===o?ss[0]:o,Kt("pop")))}});let _=[];function v(E){if(_.length=0,!!f.length)for(let z=0;z<E;z++)_.push({seg:z%f.length,t:Math.random(),dir:Math.random()<.5?1:-1,c:$s(["#d8312c","#f3c613","#1f3f9e","#f1ece0"]),speed:90+Math.random()*80,trail:[]})}function R(E,z){return z>0?[E.x2,E.y2]:[E.x1,E.y1]}function N(E,z){let[b,I]=R(z,E.dir),y=[];if(f.forEach((F,S)=>{if(F===z)return;(F.axis==="x"?Math.abs(F.x1-b)<2&&I>=F.y1-2&&I<=F.y2+2:Math.abs(F.y1-I)<2&&b>=F.x1-2&&b<=F.x2+2)&&y.push(S)}),y.length){let F=$s(y),S=f[F];E.seg=F,E.t=S.axis==="x"?(I-S.y1)/(S.y2-S.y1):(b-S.x1)/(S.x2-S.x1),E.dir=Math.random()<.5?1:-1}else E.dir*=-1,E.t=Ut(E.t,0,1);if(M){let F=hu[Math.floor(Ut(1-I/i,0,.999)*hu.length)];Di(F,{dur:.32,vol:.05,type:"square",pan:b/e*2-1})}}let m=!1,M=!0;function L(E){a.fillStyle=ss[0],a.fillRect(0,0,e,i);for(let z of h){let[b,I,y,F]=z.rect;a.fillStyle=z.colour,a.fillRect(b,I,y+.5,F+.5)}a.fillStyle="#121212";for(let z of f)z.axis==="x"?a.fillRect(z.x1-z.thick/2,z.y1,z.thick,z.y2-z.y1):a.fillRect(z.x1,z.y1-z.thick/2,z.x2-z.x1,z.thick);if(m)for(let z of _){let b=f[z.seg];if(!b)continue;let I=Math.hypot(b.x2-b.x1,b.y2-b.y1)||1;z.t+=z.dir*z.speed*E/I;let y=b.x1+(b.x2-b.x1)*z.t,F=b.y1+(b.y2-b.y1)*z.t;z.trail.unshift([y,F]),z.trail.length>42&&z.trail.pop(),a.fillStyle=z.c;let S=b.thick;for(let U=0;U<z.trail.length;U+=7)a.fillRect(z.trail[U][0]-S/2,z.trail[U][1]-S/2,S,S);(z.t<=0||z.t>=1)&&N(z,b)}if(w.down&&!w.line){let z=w.cx-w.x,b=w.cy-w.y,I=T(w.x,w.y);if(Math.hypot(z,b)>12&&I){let[y,F,S,U]=I.rect;a.fillStyle="rgba(18,18,18,.42)",Math.abs(b)>Math.abs(z)?a.fillRect(w.x-Ks/2,F,Ks,U):a.fillRect(y,w.y-Ks/2,S,Ks)}}a.save(),a.setTransform(1,0,0,1,0,0),a.drawImage(c,0,0),a.restore()}n.loop(L);let P=E=>E.split?{colour:E.colour,split:{...E.split},a:P(E.a),b:P(E.b)}:{colour:E.colour,split:null},B=[],C=()=>{B.push(P(l)),B.length>30&&B.shift()};n.undo=()=>{let E=B.pop();E&&(l=E,p())},n.clear=()=>{C(),l=u(),p(),_.length=0,m=!1,D.textContent="Boogie",D.classList.remove("on")},n.snapshot=()=>r;function O(){C(),l=u(),p();for(let E=0;E<9;E++){let z=[...h].sort((V,A)=>A.rect[2]*A.rect[3]-V.rect[2]*V.rect[3]),b=z[Math.floor(Math.random()*Math.min(3,z.length))],[I,y,F,S]=b.rect,U=F>S?"x":"y";g(b,U,U==="x"?I+F*(.25+Math.random()*.5):y+S*(.25+Math.random()*.5))}[...h].sort(()=>Math.random()-.5).slice(0,4).forEach((E,z)=>{E.colour=ss[z%3+1]})}n.ui.swatches(ss,o,E=>{o=E}),n.ui.sep();let D=n.ui.button("Boogie",()=>{m=!m,m&&v(Math.min(26,8+f.length)),D.textContent=m?"Stop":"Boogie",D.classList.toggle("on",m)},"hot");n.ui.toggle("Sound",M,E=>{M=E}),n.ui.button("Compose for me",O),p(),O(),B.length=0,n.hint("Drag across a room to split it. Tap to fill. Drag a line to nudge it. Then press Boogie.")}var Il={Endless:1/0,"Two metres":7500,"One metre":3700,"A short pen":1500},Pl=37.8;function Ll(n){let t=n.surface({paper:!0,maxPx:2200}),{W:e,H:i}=t,{canvas:s,g:r}=t.layer({alpha:!1}),a=t.layer({hit:!1}),o="ready",l=[],c=0,u=Il.Endless,d=null,h=2.4,f="#191714";function p(){r.fillStyle="#efe7d6",r.fillRect(0,0,e,i),rn(r,e,i,{alpha:.05,seed:6})}let T=R=>h*(.7+1.6*Ut(1-R/1.3));function x(R,N,m){let M=(R.x+N.x)/2,L=(R.y+N.y)/2,P=(N.x+m.x)/2,B=(N.y+m.y)/2;r.strokeStyle=f,r.lineCap="round",r.lineWidth=N.w,r.beginPath(),r.moveTo(M,L),r.quadraticCurveTo(N.x,N.y,P,B),r.stroke()}function g(){if(o!=="drawing")return;o="done",Kt("tock");let R=l.length?(l[l.length-1].t-l[0].t)/1e3:0;v.textContent=`${(c/Pl/100).toFixed(2)} m of line in ${R.toFixed(1)} s`,n.toast("That is your line. It cannot be changed."),setTimeout(w,700)}t.pointer({down(R){if(o!=="ready"){n.toast("You lifted. Take a new sheet.");return}o="drawing",l=[{x:R.x,y:R.y,t:performance.now(),w:h}],c=0},move(R){if(o!=="drawing")return;let N=l[l.length-1],m=performance.now(),M=Math.hypot(R.x-N.x,R.y-N.y);if(M<1.2)return;c+=M;let L=u-c,P=M/Math.max(1,m-N.t),B=Number.isFinite(u)?Ut(L/260):1,C=qt(N.w,T(P),.3)*Math.max(.15,B);l.push({x:R.x,y:R.y,t:m,w:C}),l.length>=3&&x(l[l.length-3],l[l.length-2],l[l.length-1]),v.textContent=Number.isFinite(u)?`${Math.max(0,L/Pl/100).toFixed(2)} m of ink left`:`${(c/Pl/100).toFixed(2)} m and counting`,L<=0&&g()},up(){g()}});function w(){l.length<3||(d={i:2,start:performance.now(),t0:l[0].t},p())}n.loop(()=>{let R=a.g;if(R.clearRect(0,0,e,i),!d)return;let N=l[l.length-1].t-d.t0,m=Math.max(1,N/2e4),M=(performance.now()-d.start)*m+d.t0;for(;d.i<l.length&&l[d.i].t<=M;)x(l[d.i-2],l[d.i-1],l[d.i]),d.i++;let L=l[Math.min(d.i,l.length-1)];R.fillStyle="#d8312c",R.beginPath(),R.arc(L.x,L.y,4,0,ht),R.fill(),d.i>=l.length&&(d=null)});function _(){o!=="ready"&&Kt("paper"),o="ready",l=[],c=0,d=null,p(),v.textContent="Touch down when ready"}n.clear=_,n.snapshot=()=>s,n.ui.seg(Object.keys(Il),"Endless",R=>{u=Il[R]}),n.ui.sep(),n.ui.slider("Nib",1,7,h,R=>{h=R},.2),n.ui.seg([["#191714","Black"],["#1f3f9e","Blue"],["#a3261e","Red"]],f,R=>{f=R}),n.ui.button("Replay",()=>{o==="done"&&w()}),n.ui.button("New sheet",_,"hot");let v=n.ui.readout("");_(),n.hint("One line. It ends for good the moment you let go.")}var ta={Phosphor:{bg:"#04120b",line:"#3cf08f",glow:"rgba(60,240,143,.5)",fade:.012},Amber:{bg:"#140b02",line:"#ffb84a",glow:"rgba(255,184,74,.5)",fade:.012},Silver:{bg:"#b9bcc0",line:"#2b2d31",glow:null,fade:0},Paper:{bg:"#efe7d6",line:"#1b1a1f",glow:null,fade:0}};function Nl(n){let t=n.surface({bleed:!0,maxPx:1800}),{W:e,H:i,px:s}=t,{canvas:r,g:a}=t.layer({alpha:!1}),o=Math.min(e,i)*.05,l=72,c=Ut(Math.min(e,i)*.075,34,62),u=e-o*2,d=i-l-c*2-74,h={x:o,y:l,w:u,h:Math.max(160,d)},f=h.y+h.h+c+14,p=[{x:o+c+10,y:f,a:0,axis:"x"},{x:e-o-c-10,y:f,a:0,axis:"y"}],T="Phosphor",x={x:h.w/2,y:h.h/2},g=2,w=!0,_=!0,v=0,R=null,N=0,m=Dt(h.w*s,h.h*s),M=m.getContext("2d");M.scale(s,s),M.lineCap="round",M.lineJoin="round";function L(b,I){if(b=Ut(b,2,h.w-2),I=Ut(I,2,h.h-2),b===x.x&&I===x.y)return;let y=ta[T];M.strokeStyle=y.line,M.lineWidth=g,y.glow?(M.shadowColor=y.glow,M.shadowBlur=8):M.shadowBlur=0,M.beginPath(),M.moveTo(x.x,x.y),M.lineTo(b,I),M.stroke(),x.x=b,x.y=I}function P(b,I){b.a+=I;let y=I*62;b.axis==="x"?L(x.x+y,x.y):L(x.x,x.y-y),N+=Math.abs(I),w&&N>.22&&(N=0,Di(b.axis==="x"?1800:1500,{dur:.02,vol:.012,type:"square"}))}function B(b){v=Math.min(1,v+b),M.save(),M.setTransform(1,0,0,1,0,0),M.globalCompositeOperation="destination-out",M.fillStyle=`rgba(0,0,0,${.08+b*.5})`,M.fillRect(0,0,m.width,m.height),M.restore()}let C=null,O=null;t.pointer({down(b){R=null;let I=p.find(y=>Ve(b.x,b.y,y.x,y.y)<c*1.35);I?C={k:I,ang:Math.atan2(b.y-I.y,b.x-I.x)}:C={shaker:!0},O=b},move(b){if(C?.k){let I=C.k,y=Math.atan2(b.y-I.y,b.x-I.x),F=y-C.ang;F>Math.PI&&(F-=ht),F<-Math.PI&&(F+=ht),C.ang=y,P(I,F)}else C?.shaker&&O&&Math.hypot(b.x-O.x,b.y-O.y)>12&&B(.14);O=b},hover(b){t.el.style.cursor=p.some(I=>Ve(b.x,b.y,I.x,I.y)<c*1.35)?"grab":"default"},up(){C=null,O=null}}),n.on(t.el,"wheel",b=>{b.preventDefault();let I=t.el.getBoundingClientRect(),y=(b.clientX-I.left)/I.width*e;P(p[y<e/2?0:1],Ut(b.deltaY,-100,100)*.0024)},{passive:!1});let D=new Set;n.on(window,"keydown",b=>{b.key.startsWith("Arrow")&&(b.preventDefault(),D.add(b.key),n.dismissTip())}),n.on(window,"keyup",b=>D.delete(b.key));function E(b,I,y,F){let S=a.createLinearGradient(b,I,b,I+F);S.addColorStop(0,"#2c2d31"),S.addColorStop(.5,"#222327"),S.addColorStop(1,"#17181b"),a.fillStyle=S,a.fillRect(b,I,y,F)}function z(b){let I=c;a.save(),a.translate(b.x,b.y),a.shadowColor="rgba(0,0,0,.6)",a.shadowBlur=18,a.shadowOffsetY=8,a.fillStyle="#101114",a.beginPath(),a.arc(0,0,I*1.08,0,ht),a.fill(),a.shadowColor="transparent",a.save(),a.rotate(b.a),a.fillStyle="#5a5c61";for(let F=0;F<44;F++)a.rotate(ht/44),a.fillRect(I*.93,-1.3,I*.13,2.6);a.restore();let y=a.createConicGradient(.6,0,0);["#e8e9eb","#8d9096","#f4f5f6","#7f8288","#e2e3e6","#8a8d92","#e8e9eb"].forEach((F,S)=>y.addColorStop(S/6,F)),a.fillStyle=y,a.beginPath(),a.arc(0,0,I*.9,0,ht),a.fill(),a.rotate(b.a),a.fillStyle="#d8312c",a.fillRect(-1.8,-I*.84,3.6,I*.34),a.restore()}n.loop((b,I)=>{if(R){R.t+=b*R.speed;let A=h.w/2+Math.sin(R.t*R.fx+R.ph)*h.w*.42,q=h.h/2+Math.sin(R.t*R.fy)*h.h*.42,W=A-x.x,Z=q-x.y;p[0].a+=W/62,p[1].a-=Z/62,L(A,q)}let y=150*b/62;D.has("ArrowLeft")&&P(p[0],-y),D.has("ArrowRight")&&P(p[0],y),D.has("ArrowUp")&&P(p[1],y),D.has("ArrowDown")&&P(p[1],-y);let F=ta[T];F.fade&&!_&&(M.save(),M.setTransform(1,0,0,1,0,0),M.globalCompositeOperation="destination-out",M.fillStyle=`rgba(0,0,0,${F.fade})`,M.fillRect(0,0,m.width,m.height),M.restore()),v=Math.max(0,v-b*2.5);let S=Math.sin(I*60)*v*14,U=Math.cos(I*52)*v*9;if(a.save(),a.translate(S,U),E(-20,-20,e+40,i+40),a.fillStyle="#0b0c0e",a.beginPath(),a.roundRect(h.x-10,h.y-10,h.w+20,h.h+20,14),a.fill(),a.save(),a.beginPath(),a.roundRect(h.x,h.y,h.w,h.h,8),a.clip(),a.fillStyle=F.bg,a.fillRect(h.x,h.y,h.w,h.h),F.glow){a.strokeStyle="rgba(255,255,255,.04)",a.lineWidth=1,a.beginPath();for(let A=1;A<10;A++)a.moveTo(h.x+h.w*A/10,h.y),a.lineTo(h.x+h.w*A/10,h.y+h.h);for(let A=1;A<8;A++)a.moveTo(h.x,h.y+h.h*A/8),a.lineTo(h.x+h.w,h.y+h.h*A/8);a.stroke()}a.drawImage(m,h.x,h.y,h.w,h.h),a.fillStyle=F.line,a.beginPath(),a.arc(h.x+x.x,h.y+x.y,g+1,0,ht),a.fill();let V=a.createLinearGradient(h.x,h.y,h.x+h.w*.5,h.y+h.h);V.addColorStop(0,"rgba(255,255,255,.07)"),V.addColorStop(.4,"rgba(255,255,255,0)"),a.fillStyle=V,a.fillRect(h.x,h.y,h.w,h.h),a.restore(),p.forEach(z),a.fillStyle="rgba(240,240,236,.5)",a.font='500 11px "DM Mono"',a.textAlign="center",a.fillText("ACROSS",p[0].x+c*2.1,f+4),a.fillText("UP / DOWN",p[1].x-c*2.2,f+4),a.restore()}),n.clear=()=>{R=null,v=1,M.save(),M.setTransform(1,0,0,1,0,0),M.clearRect(0,0,m.width,m.height),M.restore()},n.snapshot=()=>{let b=Dt(m.width,m.height),I=b.getContext("2d");return I.fillStyle=ta[T].bg,I.fillRect(0,0,b.width,b.height),I.drawImage(m,0,0),b},n.ui.seg(Object.keys(ta),T,b=>{T=b}),n.ui.sep(),n.ui.slider("Weight",1,6,g,b=>{g=b},.5),n.ui.toggle("Hold trace",_,b=>{_=b}),n.ui.toggle("Clicks",w,b=>{w=b}),n.ui.button("Lissajous",()=>{let b=[[3,2],[5,4],[3,4],[5,2],[7,6]],[I,y]=b[Math.floor(Math.random()*b.length)];R=R?null:{t:0,fx:I,fy:y,ph:Math.random()*ht,speed:.8}}),n.ui.button("Shake",()=>{Kt("shake");for(let b=0;b<6;b++)B(.16)},"hot"),n.hint("Turn the knobs by dragging them, scrolling over them or using the arrow keys. Grab the casing to shake.")}function Dl(n){let t=n.surface({bleed:!0,maxPx:1800}),{W:e,H:i,px:s}=t,r=t.layer({gl:!0}),a=t.layer({hit:!1}),o=t.buffer(),l=t.buffer(),c=Fn(r.canvas),u=Ke(c,jr),d=Ui(c),h=Ui(c),f="rake",p=5,T=15,x=.24,g=!0,w=[],_=Ze(4);function v(){let y=o.g;y.fillStyle="#d9d0bd",y.fillRect(0,0,e,i);for(let F=0;F<e*i/22;F++){let S=Math.random();y.fillStyle=S>.5?`rgba(255,250,236,${(S-.5)*.3})`:`rgba(90,76,54,${(.5-S)*.3})`,y.fillRect(Math.random()*e,Math.random()*i,1.5,1.5)}R()}function R(){let y=l.g;y.fillStyle="#800000",y.fillRect(0,0,e,i);for(let F=0;F<i;F+=24)for(let S=0;S<e;S+=24){let U=118+_(S*.012,F*.012)*20;y.fillStyle=`rgba(${Math.round(U)},0,0,.5)`,y.fillRect(S,F,24,24)}g=!0}let N="rgb(50,0,0)",m="rgb(205,0,0)",M="rgb(128,0,0)";function L(y,F,S,U){let V=l.g,A=S-y,q=U-F,W=Math.hypot(A,q);if(W<.01)return;let Z=-q/W,Y=A/W,et=p*T,ft=(ct,ut,_t)=>{V.strokeStyle=_t,V.lineWidth=ut,V.beginPath(),V.moveTo(y+Z*ct,F+Y*ct),V.lineTo(S+Z*ct,U+Y*ct),V.stroke()};V.lineCap="butt",ft(0,et+T*.6,M),V.lineCap="round";for(let ct=0;ct<p;ct++){let ut=(ct-(p-1)/2)*T;ft(ut,T*.42,N),ft(ut+T/2,T*.34,m),ft(ut-T/2,T*.34,m)}g=!0}function P(y){let F=l.g,S=7;F.fillStyle=M,F.beginPath(),F.arc(y.x,y.y,y.r+S*T*.82+T,0,ht),F.fill();for(let U=0;U<S;U++){let V=y.r+T*.7+U*T*.82;F.strokeStyle=N,F.lineWidth=T*.36,F.beginPath(),F.arc(y.x,y.y,V,0,ht),F.stroke(),F.strokeStyle=m,F.lineWidth=T*.3,F.beginPath(),F.arc(y.x,y.y,V+T*.41,0,ht),F.stroke()}g=!0}function B(y,F,S){let U=[],V=11+Math.floor(Math.random()*5),A=Math.random()*40;for(let q=0;q<V;q++){let W=q/V*ht,Z=.76+_(Math.cos(W)*1.6+A,Math.sin(W)*1.6+A)*.5;U.push([Math.cos(W)*S*Z,Math.sin(W)*S*Z*.84])}return{x:y,y:F,r:S,pts:U,tone:50+Math.random()*34}}function C(y,F,S=0,U=0){y.beginPath(),F.pts.forEach(([V,A],q)=>{let W=F.pts[(q+1)%F.pts.length],Z=(V+W[0])/2,Y=(A+W[1])/2;q?y.quadraticCurveTo(F.x+S+V,F.y+U+A,F.x+S+Z,F.y+U+Y):y.moveTo(F.x+S+Z,F.y+U+Y)}),y.closePath()}function O(){let y=x*Math.PI;return[Math.cos(y)*1.25,.4,.34+Math.sin(y)*1.1]}function D(){let y=a.g,[F,S,U]=O();y.clearRect(0,0,e,i);for(let V of w){let A=V.r*.72/Math.max(.3,U);y.save(),y.filter="blur(5px)",y.fillStyle="rgba(40,30,20,.48)",C(y,V,-F*A,S*A),y.fill(),y.restore(),C(y,V);let q=V.x+F*V.r*.42,W=V.y-S*V.r*.6,Z=y.createRadialGradient(q,W,V.r*.08,V.x,V.y,V.r*1.15);Z.addColorStop(0,`rgb(${V.tone+88},${V.tone+82},${V.tone+76})`),Z.addColorStop(.55,`rgb(${V.tone+16},${V.tone+12},${V.tone+10})`),Z.addColorStop(1,`rgb(${V.tone-34},${V.tone-36},${V.tone-36})`),y.fillStyle=Z,y.fill()}}let E={x:0,y:0,down:!1,sx:0,sy:0};t.pointer({down(y){I(),Object.assign(E,{x:y.x,y:y.y,sx:y.x,sy:y.y,down:!0});let F=w.find(S=>Ve(S.x,S.y,y.x,y.y)<S.r);if(F&&f!=="stone"){E.tapped=F;return}if(E.tapped=null,f==="stone"){let S=B(y.x,y.y,24+Math.random()*44);w.push(S),Kt("thud"),P(S),D()}},move(y){if(E.down&&f==="rake"&&!(E.tapped&&Ve(y.x,y.y,E.sx,E.sy)<8)){let F=qt(E.x,y.x,.8),S=qt(E.y,y.y,.8);L(E.x,E.y,F,S),E.x=F,E.y=S}},up(){E.tapped&&(Kt("clink"),P(E.tapped)),E.down=!1}}),n.loop(()=>{g?(ts(c,d,0,o.canvas),ts(c,h,1,l.canvas),g=!1):(yn(c,d,0),yn(c,h,1));let[y,F,S]=O(),U=Ut(Math.sin(x*Math.PI));c.viewport(0,0,r.canvas.width,r.canvas.height),u.use().i("color",0).i("height",1).f("px",1/(e*s),1/(i*s)).f("light",y,F,S).f("strength",2.5).f("gloss",20).f("spec",0).f("grain",.4).f("tint",qt(1.08,1,U),qt(.9,1,U),qt(.76,1,U)),_n(c)});let z=[],b=y=>{let F=Dt(y.width,y.height);return F.getContext("2d").drawImage(y,0,0),F},I=()=>{z.push({h:b(l.canvas),rocks:w.slice()}),z.length>10&&z.shift()};n.undo=()=>{let y=z.pop();y&&(l.g.save(),l.g.setTransform(1,0,0,1,0,0),l.g.drawImage(y.h,0,0),l.g.restore(),w.length=0,w.push(...y.rocks),D(),g=!0)},n.clear=()=>{I(),w.length=0,R(),D()},n.snapshot=()=>{let y=Dt(r.canvas.width,r.canvas.height),F=y.getContext("2d");return F.drawImage(r.canvas,0,0),F.drawImage(a.canvas,0,0),y},v();for(let y=T*3;y<i+T*p;y+=T*p)L(-10,y,e+10,y);[[.34,.42,66],[.68,.6,42]].forEach(([y,F,S])=>{let U=B(e*y,i*F,S);w.push(U),P(U)}),D(),n.ui.seg([["rake","Rake"],["stone","Stone"]],f,y=>{f=y}),n.ui.sep(),n.ui.slider("Tines",1,9,p,y=>{p=y}),n.ui.slider("Spacing",8,26,T,y=>{T=y}),n.ui.slider("Sun",6,94,x*100,y=>{x=y/100,D()}),n.ui.button("Smooth",()=>{I(),R(),w.forEach(P)}),n.hint("Rake long slow lines. Tap a stone to ripple around it. Move the sun.")}var uu=["#e0507a","#ef8a2e","#fbd63f","#2fa66a","#1f5fb0","#7b52c7","#f5efdf","#1c1a22"];function Ul(n){let t=n.surface({paper:!0,bg:"#f5efdf",maxPx:2e3}),{W:e,H:i}=t,{canvas:s,g:r}=t.layer({alpha:!1}),a="#ef8a2e",o="#1f5fb0",l=35,c=5,u=13,d=34,h="Free",f=[],p=[],T=new Map,x=30,g=Dt(160,160*(i/e)),w=g.getContext("2d");{let O=g.width,D=g.height,E=w.createLinearGradient(0,0,0,D*.62);E.addColorStop(0,"#4a3a9a"),E.addColorStop(.5,"#e0507a"),E.addColorStop(1,"#f8a94a"),w.fillStyle=E,w.fillRect(0,0,O,D),w.fillStyle="#ffe680",w.beginPath(),w.arc(O*.62,D*.47,D*.13,0,ht),w.fill();let z=w.createLinearGradient(0,D*.62,0,D);z.addColorStop(0,"#2d6fb0"),z.addColorStop(1,"#10305e"),w.fillStyle=z,w.fillRect(0,D*.62,O,D),w.fillStyle="#ffd36b";for(let b=0;b<26;b++)w.fillRect(O*.62-(4+b*.7)+Math.sin(b*1.3)*3,D*.63+b*D*.014,(4+b*.7)*2,1.2);w.fillStyle="#20264a",w.beginPath(),w.moveTo(0,D*.62),w.lineTo(O*.22,D*.5),w.lineTo(O*.42,D*.62),w.fill()}let _=w.getImageData(0,0,g.width,g.height).data;function v(O,D){let E=Math.min(g.width-1,Math.floor(O/e*g.width)),b=(Math.min(g.height-1,Math.floor(D/i*g.height))*g.width+E)*4,I=42,y=()=>(Math.random()-.5)*I*2,F=S=>Math.max(0,Math.min(255,(S-128)*1.45+128+y()));return`rgb(${F(_[b])},${F(_[b+1])},${F(_[b+2])})`}let R=(O,D)=>`${Math.floor(O/x)},${Math.floor(D/x)}`;function N(O,D){let E=Math.floor(O/x),z=Math.floor(D/x),b=u*u;for(let I=-1;I<=1;I++)for(let y=-1;y<=1;y++){let F=T.get(`${E+I},${z+y}`);if(F){for(let S of F)if((S.x-O)**2+(S.y-D)**2<b)return!1}}return!0}function m(O){r.fillStyle=O.c,r.beginPath(),r.arc(O.x,O.y,O.r,0,ht),r.fill()}function M(O,D){if(O<0||D<0||O>e||D>i||!N(O,D))return;let E=h==="Scene"?v(O,D):Math.random()*100<l?o:a,z={x:O,y:D,r:c*(.86+Math.random()*.28),c:E};f.push(z);let b=R(O,D);T.has(b)||T.set(b,[]),T.get(b).push(z),m(z)}function L(O,D){for(let E=0;E<22;E++){let z=Math.random()*ht,b=Math.sqrt(Math.random())*d;M(O+Math.cos(z)*b,D+Math.sin(z)*b)}C.textContent=`${f.length.toLocaleString()} dots`}let P=null;t.pointer({down(O){p.push(f.length),P=O,L(O.x,O.y)},move(O){let D=Math.hypot(O.x-P.x,O.y-P.y),E=Math.ceil(D/(d*.6));for(let z=1;z<=E;z++)L(P.x+(O.x-P.x)*z/E,P.y+(O.y-P.y)*z/E);P=O},up(){P=null}});function B(){r.fillStyle="#f5efdf",r.fillRect(0,0,e,i),T=new Map;for(let O of f){m(O);let D=R(O.x,O.y);T.has(D)||T.set(D,[]),T.get(D).push(O)}C.textContent=`${f.length.toLocaleString()} dots`}n.undo=()=>{p.length&&(f.length=p.pop(),B())},n.clear=()=>{f=[],p=[],B()},n.snapshot=()=>s,n.ui.swatches(uu,a,O=>{a=O}),n.ui.sep(),n.ui.swatches(uu,o,O=>{o=O}),n.ui.sep(),n.ui.slider("Mix",0,100,l,O=>{l=O}),n.ui.slider("Dot",2,12,c,O=>{c=O,u=Math.max(u,O*2.1)}),n.ui.slider("Space",5,34,u,O=>{u=O}),n.ui.seg(["Free","Scene"],h,O=>{h=O}),n.ui.toggle("Squint",!1,O=>{s.style.transition="filter .7s",s.style.filter=O?`blur(${Math.max(4,u*.75)}px) saturate(1.25)`:""});let C=n.ui.readout("0 dots");B(),n.hint("Two colours, side by side. Dab away, then press Squint. Scene mode paints a hidden seascape.")}var du={Rainbow(n,t,e){let i=n.createLinearGradient(0,0,t,e);["#ff3d81","#ffb13d","#fff14d","#3dff9e","#3dc8ff","#7a5cff","#ff3dd0","#ff3d81","#ffb13d","#fff14d","#3dff9e"].forEach((s,r,a)=>i.addColorStop(r/(a.length-1),s)),n.fillStyle=i,n.fillRect(0,0,t,e)},Gold(n,t,e){let i=n.createLinearGradient(0,0,t,e*.4);["#7a4f12","#e8c15a","#fff4b8","#b98226","#ffe58f","#8a5c16","#f3d272","#fff8d0","#9c6c1c"].forEach((s,r,a)=>i.addColorStop(r/(a.length-1),s)),n.fillStyle=i,n.fillRect(0,0,t,e)},Galaxy(n,t,e){n.fillStyle="#0a0620",n.fillRect(0,0,t,e);let i=Ze(3);for(let s=0;s<90;s++){let r=Math.random()*t,a=Math.random()*e,o=60+Math.random()*230,l=n.createRadialGradient(r,a,0,r,a,o),c=230+i(r*.003,a*.003)*130;l.addColorStop(0,`hsla(${c},90%,62%,.36)`),l.addColorStop(1,"rgba(0,0,0,0)"),n.fillStyle=l,n.fillRect(r-o,a-o,o*2,o*2)}for(let s=0;s<2600;s++)n.fillStyle=`rgba(255,255,255,${Math.random()})`,n.fillRect(Math.random()*t,Math.random()*e,1.4,1.4)},Oil(n,t,e){let i=Ze(9),s=4,r=Math.ceil(t/s),a=Math.ceil(e/s),o=Dt(r,a),l=o.getContext("2d"),c=l.createImageData(r,a);for(let u=0;u<a;u++)for(let d=0;d<r;d++){let h=i(d*.012,u*.012)*3+i(d*.04,u*.04)*.6,f=(u*r+d)*4;c.data[f]=128+127*Math.cos(h*6.283),c.data[f+1]=128+127*Math.cos(h*6.283+2.1),c.data[f+2]=128+127*Math.cos(h*6.283+4.2),c.data[f+3]=255}l.putImageData(c,0,0),n.drawImage(o,0,0,t,e)}};function Fl(n){let t=n.surface({paper:!0,maxPx:2e3}),{W:e,H:i,px:s}=t,r=t.layer({alpha:!1,hit:!1}),a=t.layer(),o=t.layer({hit:!1}),l="Rainbow",c="Fine",u={x:0,y:0},d={x:0,y:0},h=n.rasterUndo(a.canvas),f=[],p=Dt(e*1.3,i*1.3),T=()=>du[l](p.getContext("2d"),p.width,p.height);function x(){let _=a.g;_.globalCompositeOperation="source-over",_.fillStyle="#0c0b0e",_.fillRect(0,0,e,i);let v=_.createLinearGradient(0,0,e,i);v.addColorStop(0,"rgba(255,255,255,.05)"),v.addColorStop(.5,"rgba(255,255,255,0)"),v.addColorStop(1,"rgba(255,255,255,.03)"),_.fillStyle=v,_.fillRect(0,0,e,i)}function g(_,v){let R=a.g,N=v.x-_.x,m=v.y-_.y,M=Math.hypot(N,m)||1;R.globalCompositeOperation="destination-out",R.strokeStyle="#000",R.lineCap="round";let L=(P,B,C)=>{R.lineWidth=C,R.beginPath(),R.moveTo(_.x+P,_.y+B),R.lineTo(v.x+P,v.y+B),R.stroke()};if(c==="Fine"&&L(0,0,2.6),c==="Wide"&&L(0,0,11),c==="Chisel")for(let P=-5;P<=5;P++)L(P*.9,-P*.9,1.5);if(c==="Comb"){let P=-m/M,B=N/M;for(let C=-3;C<=3;C++)L(P*C*6,B*C*6,1.4)}Math.random()<.4+M*.02&&f.length<240&&f.push({x:v.x,y:v.y,vx:(Math.random()-.5)*60+N*2,vy:-30-Math.random()*40,r:1+Math.random()*2.6,a:Math.random()*ht,spin:(Math.random()-.5)*12,life:1.6})}let w=null;t.pointer({down(_){h(),w=_,g(_,{x:_.x+.1,y:_.y})},move(_){g(w,_),w=_,d={x:_.x/e-.5,y:_.y/i-.5}},hover(_){d={x:_.x/e-.5,y:_.y/i-.5}},up(){w=null}}),n.loop((_,v)=>{u.x=qt(u.x,d.x,.06),u.y=qt(u.y,d.y,.06);let R=r.g,N=-(.15+u.x*.28+Math.sin(v*.3)*.02)*e,m=-(.15+u.y*.28+Math.cos(v*.24)*.02)*i;R.drawImage(p,N,m,e*1.3,i*1.3);let M=o.g;M.clearRect(0,0,e,i);for(let L=f.length-1;L>=0;L--){let P=f[L];P.vy+=420*_,P.x+=P.vx*_,P.y+=P.vy*_,P.a+=P.spin*_,P.life-=_,M.save(),M.translate(P.x,P.y),M.rotate(P.a),M.fillStyle="#0c0b0e",M.fillRect(-P.r,-P.r*.4,P.r*2,P.r*.8),M.restore(),(P.life<=0||P.y>i+10)&&f.splice(L,1)}}),n.clear=()=>{h(),x()},n.snapshot=()=>{let _=Dt(e*s,i*s),v=_.getContext("2d");return v.drawImage(r.canvas,0,0),v.drawImage(a.canvas,0,0),_},T(),x(),n.ui.seg(["Fine","Wide","Chisel","Comb"],c,_=>{c=_}),n.ui.sep(),n.ui.seg(Object.keys(du),l,_=>{l=_,T()}),n.ui.sep(),n.ui.button("Blow",()=>{for(let _=0;_<80;_++)f.push({x:Math.random()*e,y:i*(.4+Math.random()*.6),vx:200+Math.random()*500,vy:-200-Math.random()*200,r:1+Math.random()*2.4,a:0,spin:14,life:1})}),n.hint("Scrape through the black. Move around and watch the foil shift under your lines.")}var fu=["#f4dfc8","#e65f87","#f2b705","#35c9b0","#6c9bd2","#c8a2ff"],pu={Midnight:"#121527",Walnut:"#2c1c14",Felt:"#123026",Chalk:"#ece6d9"},pp=[0,2,4,7,9];function Ol(n){let t=n.surface({bleed:!0,maxPx:1800}),{W:e,H:i}=t,{canvas:s,g:r}=t.layer({alpha:!1}),a=fu[1],o="Midnight",l=1.2,c=[],u=[],d=null,h=null,f=Math.min(e,i)*.39,p=e/2,T=i/2+6;function x(L){let P=Math.round(36-Math.log2(Ut(L,20,1400)/20)*7.5),B=Math.floor(P/12),C=pp[Math.min(4,Math.floor((P%12+12)%12/2.4))];return 110*Math.pow(2,B+C/12-1)}let g=(L,P,B=16)=>{let C=null,O=B;for(let D of c){let E=Ve(L,P,D.x,D.y);E<O&&(O=E,C=D)}return C};function w(L,P){if(L===P||u.some(C=>C.a===L&&C.b===P||C.a===P&&C.b===L))return;let B={a:L,b:P,colour:a,weight:l,amp:0,len:Ve(L.x,L.y,P.x,P.y)};u.push(B),_(B,5)}function _(L,P){L.amp=Math.max(L.amp,P);let B=(L.a.x+L.b.x)/2;Di(x(L.len),{dur:1.3,vol:.09,pan:Ut(B/e*2-1,-1,1)})}function v(L,P,B,C,O,D,E,z){let b=(B-L)*(z-D)-(C-P)*(E-O);if(!b)return!1;let I=((O-L)*(z-D)-(D-P)*(E-O))/b,y=((O-L)*(C-P)-(D-P)*(B-L))/b;return I>=0&&I<=1&&y>=0&&y<=1}let R=null;t.pointer({down(L){let P=g(L.x,L.y);if(P){d=P,h=L;return}R={x:L.x,y:L.y,sx:L.x,sy:L.y,moved:!1,n:0}},move(L){if(d){h=L;let P=g(L.x,L.y,13);P&&P!==d&&(w(d,P),d=P);return}if(R){Ve(L.x,L.y,R.sx,R.sy)>6&&(R.moved=!0);for(let P of u)P.hot||v(R.x,R.y,L.x,L.y,P.a.x,P.a.y,P.b.x,P.b.y)&&(P.hot=.09,R.n++<14?_(P,9):P.amp=Math.max(P.amp,7));R.x=L.x,R.y=L.y}},up(L){if(d){let P=g(L.x,L.y,16);P&&P!==d&&w(d,P),d=null,h=null}else R&&!R.moved&&(c.push({x:L.x,y:L.y}),Di(1400,{dur:.05,vol:.05,type:"square"}));R=null}}),n.loop((L,P)=>{let B=o==="Chalk";r.fillStyle=pu[o],r.fillRect(0,0,e,i),r.lineCap="round";for(let C of u){C.hot&&(C.hot=Math.max(0,C.hot-L)),C.amp*=Math.exp(-L*3.6),C.amp<.05&&(C.amp=0);let O=(C.a.x+C.b.x)/2,D=(C.a.y+C.b.y)/2,E=-(C.b.y-C.a.y)/(C.len||1),z=(C.b.x-C.a.x)/(C.len||1),b=C.amp*Math.sin(P*(2200/Math.max(60,C.len)+16));r.strokeStyle=C.colour,r.lineWidth=C.weight+(C.amp>1?.5:0),r.globalAlpha=.74,r.beginPath(),r.moveTo(C.a.x,C.a.y),C.amp?r.quadraticCurveTo(O+E*b*2,D+z*b*2,C.b.x,C.b.y):r.lineTo(C.b.x,C.b.y),r.stroke()}r.globalAlpha=1,d&&h&&(r.strokeStyle=a,r.lineWidth=l,r.setLineDash([5,5]),r.beginPath(),r.moveTo(d.x,d.y),r.lineTo(h.x,h.y),r.stroke(),r.setLineDash([]));for(let C of c)r.fillStyle="rgba(0,0,0,.34)",r.beginPath(),r.arc(C.x+1.4,C.y+1.8,2.8,0,ht),r.fill(),r.fillStyle=B?"#4b4640":"#d9cdbd",r.beginPath(),r.arc(C.x,C.y,2.5,0,ht),r.fill()});function N(L,P){c=[],u=[];for(let B=0;B<L;B++){let C=B/L*ht-Math.PI/2;c.push({x:p+Math.cos(C)*f,y:T+Math.sin(C)*f})}for(let B=0;B<L;B++){let C=c[B],O=c[Math.round(B*P)%L];C!==O&&u.push({a:C,b:O,colour:a,weight:.9,amp:0,len:Ve(C.x,C.y,O.x,O.y)})}}let m=180,M=2;n.undo=()=>{u.length?u.pop():c.pop()},n.clear=()=>{c=[],u=[]},n.snapshot=()=>s,n.ui.swatches(fu,a,L=>{a=L}),n.ui.sep(),n.ui.seg(Object.keys(pu),o,L=>{o=L}),n.ui.slider("Gauge",.6,3,l,L=>{l=L},.1),n.ui.sep(),n.ui.slider("Pins",24,300,m,L=>{m=L,N(m,M)}),n.ui.slider("Times",2,40,M,L=>{M=L,N(m,M)},.1),n.ui.button("Ring",()=>{let L=[];for(let P=0;P<24;P++){let B=P/24*ht-Math.PI/2;L.push({x:p+Math.cos(B)*f,y:T+Math.sin(B)*f})}c.push(...L)}),N(m,M),n.hint("Tap to pin, drag pin to pin to wind thread, and swipe across strings to play them.")}var Js=["#00000000","#14111e","#3a3560","#6f6aa8","#c6c3e6","#f7f4ec","#d83a4a","#f08a4b","#fbd06b","#6fce5a","#1f8a70","#2d8fd5","#7ad7f0","#b14fc0","#ef8fb1","#7a4a2c"],Qs=4;function Bl(n){let t=n.surface({aspect:1,bg:"#2a2740",maxPx:1400}),{W:e,H:i}=t,{canvas:s,g:r}=t.layer();r.imageSmoothingEnabled=!1;let a=32,o=[],l=0,c=1,u="pencil",d=!1,h=!0,f=!1,p=6,T=0,x=!0,g=()=>new Uint8Array(a*a),w=()=>{o=Array.from({length:Qs},g)};function _(){let U=(q,W,Z,Y)=>{W>=0&&Z>=0&&W<a&&Z<a&&(q[Z*a+W]=Y)},V=[[9,8,0],[10,7,-1],[9,8,0],[8,9,1]],A=[0,-3,-5,-1];o.forEach((q,W)=>{let[Z,Y,et]=[V[W][1]+1,V[W][0],V[W][2]],ft=16,ct=19+A[W];for(let _t=-Y;_t<=Y;_t++)for(let nt=-Z;nt<=Z;nt++){let dt=nt*nt/(Z*Z)+_t*_t/(Y*Y);dt<=.93&&U(q,ft+nt,ct+_t,dt>.68?1:_t<-Y*.4&&nt<0?8:7)}[-3,3].forEach(_t=>{U(q,ft+_t,ct-2+et,1),U(q,ft+_t,ct-3+et,1),U(q,ft+_t+1,ct-3+et,5)});for(let _t=-1;_t<=1;_t++)U(q,ft+_t,ct+2+et,1);let ut=11-Math.abs(A[W]);for(let _t=-ut;_t<=ut;_t++)U(q,16+_t,29,2)})}let v=()=>e/a,R=U=>[Math.floor(U.x/e*a),Math.floor(U.y/i*a)],N=(U,V)=>U>=0&&V>=0&&U<a&&V<a;function m(U,V,A){let q=o[l];N(U,V)&&(q[V*a+U]=A,d&&(q[V*a+(a-1-U)]=A))}function M(U,V){u==="pencil"&&m(U,V,c),u==="erase"&&m(U,V,0),u==="dither"&&(U+V)%2===0&&m(U,V,c)}function L(U,V,A,q){let W=Math.abs(A-U),Z=-Math.abs(q-V),Y=U<A?1:-1,et=V<q?1:-1,ft=W+Z;for(;M(U,V),!(U===A&&V===q);){let ct=2*ft;ct>=Z&&(ft+=Z,U+=Y),ct<=W&&(ft+=W,V+=et)}}function P(U,V){let A=o[l],q=A[V*a+U];if(q===c)return;let W=[[U,V]];for(;W.length;){let[Z,Y]=W.pop();!N(Z,Y)||A[Y*a+Z]!==q||(A[Y*a+Z]=c,W.push([Z+1,Y],[Z-1,Y],[Z,Y+1],[Z,Y-1]))}}let B=null;t.pointer({down(U){E();let[V,A]=R(U);N(V,A)&&(u==="fill"?(P(V,A),B=null):u==="pick"?(c=o[l][A*a+V]||c,z.set(Js[c]),B=null):(M(V,A),B=[V,A],Kt("blip")),F())},move(U){if(!B)return;let[V,A]=R(U);L(B[0],B[1],V,A),B=[V,A],F()},up(){B=null}});function C(U,V,A,q=1){let W=A/a;U.globalAlpha=q;for(let Z=0;Z<a;Z++)for(let Y=0;Y<a;Y++){let et=V[Z*a+Y];et&&(U.fillStyle=Js[et],U.fillRect(Y*W,Z*W,W+.5,W+.5))}U.globalAlpha=1}function O(U,V){let A=V/a;U.fillStyle="#2a2740",U.fillRect(0,0,V,V),U.fillStyle="#322e4c";for(let q=0;q<a;q++)for(let W=q%2;W<a;W+=2)U.fillRect(W*A,q*A,A+.5,A+.5)}n.loop(U=>{if(f){T+=U*p;let V=Math.floor(T)%Qs;V!==l&&(l=V,y())}if(O(r,e),h&&!f&&C(r,o[(l+Qs-1)%Qs],e,.22),C(r,o[l],e),x&&!f){r.strokeStyle="rgba(255,255,255,.05)",r.lineWidth=1,r.beginPath();for(let V=1;V<a;V++){let A=V*v();r.moveTo(A,0),r.lineTo(A,i),r.moveTo(0,A),r.lineTo(e,A)}r.stroke()}});let D=[],E=()=>{D.push({i:l,f:o[l].slice()}),D.length>40&&D.shift()};n.undo=()=>{let U=D.pop();U&&(o[U.i].set(U.f),F())},n.clear=()=>{E(),o[l].fill(0),F()},n.snapshot=()=>{let U=Dt(a*16,a*16),V=U.getContext("2d");return O(V,U.width),C(V,o[l],U.width),U},n.dock.classList.add("dense");let z=n.ui.swatches(Js.slice(1),Js[c],U=>{c=Js.indexOf(U)});n.ui.sep(),n.ui.seg([["pencil","Pen"],["fill","Fill"],["dither","Dither"],["erase","Rub"],["pick","Pick"]],u,U=>{u=U}),n.ui.toggle("Mirror",d,U=>{d=U}),n.ui.sep();let b=document.createElement("div");b.className="sw",n.dock.appendChild(b);let I=Array.from({length:Qs},(U,V)=>{let A=document.createElement("button");A.style.cssText="width:34px;height:34px;border-radius:6px;padding:0;overflow:hidden;background:#2a2740",A.setAttribute("aria-label",`Frame ${V+1}`);let q=Dt(64,64);return q.style.cssText="width:100%;height:100%;display:block;image-rendering:pixelated",A.appendChild(q),A.onclick=()=>{l=V,T=V,y()},b.appendChild(A),{b:A,c:q}});function y(){I.forEach(({b:U},V)=>U.classList.toggle("on",V===l))}function F(){I.forEach(({c:U},V)=>{let A=U.getContext("2d");A.clearRect(0,0,64,64),C(A,o[V],64)})}n.ui.toggle("Onion",h,U=>{h=U});let S=n.ui.button("Play",()=>{f=!f,S.textContent=f?"Stop":"Play",S.classList.toggle("on",f)},"hot");n.ui.slider("Speed",2,14,p,U=>{p=U}),n.ui.seg([[16,"16"],[32,"32"],[48,"48"]],a,U=>{a=U,w(),F()}),w(),_(),F(),y(),n.hint("Meet Pip. Press Play, then draw your own over four frames with the onion skin on.")}var kl="round and round the word goes ",mu={Plum:n=>`hsl(${290+n*70},72%,${76-n*20}%)`,Gilt:n=>`hsl(${44-n*16},82%,${74-n*16}%)`,Glass:n=>`hsl(${n*340},86%,68%)`,Bone:()=>"#f3ead9"};function zl(n){let t=n.surface({bleed:!0,bg:"#160a1c",maxPx:1800}),{W:e,H:i}=t,{canvas:s,g:r}=t.layer({alpha:!1}),a=t.layer({hit:!1}),o=e/2,l=i/2,c=Math.hypot(e,i)/2,u=n.rasterUndo(s),d=kl,h=12,f=!0,p="Plum",T=1,x=!1,g=0,w=null,_={x:0,y:0,carry:0};function v(){r.fillStyle="#160a1c",r.fillRect(0,0,e,i)}let R=(B,C)=>Ut(Math.hypot(B-o,C-l)*.075+7,7,46)*T,N=()=>{if(!w){let B=d.trim()?d:kl;w=B[g++%B.length]}return w};function m(B,C,O,D){let E=R(C,O),z=Ut(Math.hypot(C-o,O-l)/c);r.font=`600 ${E.toFixed(1)}px Fraunces`,r.fillStyle=mu[p](z),r.textAlign="center",r.textBaseline="middle";for(let b=0;b<h;b++)for(let I of f?[1,-1]:[1])r.save(),r.translate(o,l),r.rotate(b/h*ht),r.scale(1,I),r.translate(C-o,O-l),r.rotate(D),r.fillText(B,0,0),r.restore()}function M(B){if(!x)return B;let C=B.x-o,O=B.y-l,D=Math.hypot(C,O)||1,E=Math.max(1,Math.round(D/34))*34;return{x:o+C/D*E,y:l+O/D*E}}function L(B){let C=B.x-_.x,O=B.y-_.y,D=Math.hypot(C,O);if(D<.5)return;let E=C/D,z=O/D,b=Math.atan2(O,C),I=_.x,y=_.y,F=D,S=_.carry;for(;;){let U=N();r.font=`600 ${R(I,y).toFixed(1)}px Fraunces`;let V=r.measureText(U).width+1;if(S+F<V){_.carry=S+F;break}let A=V-S;I+=E*A,y+=z*A,F-=A,S=0,m(U,qt(I,I-E*V,.5),qt(y,y-z*V,.5),b),w=null}_.x=B.x,_.y=B.y}function P(){let B=a.g;B.clearRect(0,0,e,i),B.strokeStyle="rgba(255,255,255,.07)",B.lineWidth=1,B.save(),B.translate(o,l);for(let C=0;C<h;C++){let O=C/h*ht;B.beginPath(),B.moveTo(0,0),B.lineTo(Math.cos(O)*c,Math.sin(O)*c),B.stroke()}if(x)for(let C=34;C<c;C+=34)B.beginPath(),B.arc(0,0,C,0,ht),B.stroke();B.restore()}t.pointer({down(B){u();let C=M(B);_.x=C.x,_.y=C.y,_.carry=0},move(B){L(M(B))}}),n.clear=()=>{u(),v(),g=0,w=null},n.snapshot=()=>s,v(),P(),n.ui.text(kl.trim(),B=>{d=B+" ",g=0,w=null},"Type a mantra"),n.ui.sep(),n.ui.seg(Object.keys(mu),p,B=>{p=B}),n.ui.slider("Spokes",3,32,h,B=>{h=B,P()}),n.ui.slider("Letters",.5,2,T,B=>{T=B},.05),n.ui.toggle("Mirror",f,B=>{f=B}),n.ui.toggle("Rings",x,B=>{x=B,P()}),n.hint("Paint outward from the middle. Letters are tiny at the centre and grow towards the edge.")}var gu=["#e0308a","#ffb000","#00a6d6","#4b2bc9","#18b369","#e8452d","#141318","#ffffff"];function Gl(n){let t=n.surface({bleed:!0,maxPx:1800}),{W:e,H:i,px:s}=t,{canvas:r,g:a}=t.layer({alpha:!1}),o=Math.min(e-40,i-166)/2,l=e/2,c=(i+66-80)/2,u=Math.ceil(o*2*s),d=Dt(u,u),h=d.getContext("2d");h.setTransform(s,0,0,s,o*s,o*s),h.lineCap="round";let f=gu[0],p=.55,T=1,x=0,g=0,w=!1,_=5,v=[],R={x:0,y:0,down:!1,wait:0};function N(){h.save(),h.setTransform(1,0,0,1,0,0),h.fillStyle="#fbf8f1",h.fillRect(0,0,u,u),h.restore()}function m(E,z){let b=E-l,I=z-c,y=Math.cos(-g),F=Math.sin(-g);return[b*y-I*F,b*F+I*y]}function M(){let[E,z]=m(R.x,R.y);if(!(Math.hypot(E,z)>o))for(let b=0;b<_+3;b++){let I=Math.random()*ht,y=Math.random()*9,F=E+Math.cos(I)*y,S=z+Math.sin(I)*y,U=.7+Math.pow(Math.random(),2)*3.4;v.length<1100&&v.push({x:F,y:S,vx:0,vy:0,r:U,c:f,life:7+Math.random()*3,drag:1.4+Math.random()*5}),h.fillStyle=f,h.beginPath(),h.arc(F,S,U,0,ht),h.fill()}}function L(E){let z=x,b=z*z;for(let I=v.length-1;I>=0;I--){let y=v[I],F=Math.hypot(y.x,y.y),S=b*F;if(y.life-=E,S>34){let W=b*y.x+2*z*y.vy,Z=b*y.y-2*z*y.vx;y.vx+=W*E,y.vy+=Z*E}let U=Math.exp(-E*y.drag);y.vx*=U,y.vy*=U;let V=y.x,A=y.y;y.x+=y.vx*E,y.y+=y.vy*E;let q=Math.hypot(y.x-V,y.y-A);if(q>.05){if(y.r=Math.max(.28,y.r-q*.007),y.r>1.2&&q>1.5&&Math.random()<.03&&v.length<1100){let W=(Math.random()-.5)*.7;v.push({x:y.x,y:y.y,vx:y.vx-y.vy*W,vy:y.vy+y.vx*W,r:y.r*.45,c:y.c,life:3,drag:.8+Math.random()*3})}h.strokeStyle=y.c,h.lineWidth=y.r*1.3,h.beginPath(),h.moveTo(V,A),h.lineTo(y.x,y.y),h.stroke()}(F>o+8||y.life<=0||y.r<=.3)&&v.splice(I,1)}}t.pointer({down(E){C(),R.down=!0,R.x=E.x,R.y=E.y},move(E){R.x=E.x,R.y=E.y},hover(E){R.x=E.x,R.y=E.y},up(){R.down=!1}});function P(E,z=1){a.save(),a.globalAlpha=z,a.translate(l,c),a.rotate(E),a.beginPath(),a.arc(0,0,o,0,ht),a.clip(),a.drawImage(d,-o,-o,o*2,o*2),a.restore()}n.loop(E=>{let z=w?0:p*7.5*T;x=qt(x,z,1-Math.exp(-E*(w?2.6:1.3))),w&&Math.abs(x)<.02&&(x=0),g+=x*E,R.down&&(R.wait-=E,R.wait<=0&&(M(),R.wait=.05+Math.random()*.13));for(let S=0;S<3;S++)L(E/3);let b=a.createRadialGradient(l,c,o*.8,l,c,Math.max(e,i)*.8);b.addColorStop(0,"#2b2630"),b.addColorStop(1,"#100e13"),a.fillStyle=b,a.fillRect(0,0,e,i),a.save(),a.shadowColor="rgba(0,0,0,.7)",a.shadowBlur=40,a.shadowOffsetY=18,a.fillStyle="#17151a",a.beginPath(),a.arc(l,c,o+14,0,ht),a.fill(),a.restore();let I=a.createConicGradient(.8,l,c);["#555","#bbb","#444","#999","#555"].forEach((S,U)=>I.addColorStop(U/4,S)),a.strokeStyle=I,a.lineWidth=3,a.beginPath(),a.arc(l,c,o+8,0,ht),a.stroke();let y=Math.abs(x)*.016,F=Ut(Math.round(y*26),1,6);P(g);for(let S=1;S<F;S++)P(g-x*.016*S/F,.5/S);a.fillStyle="#26232b",a.beginPath(),a.arc(l,c,11,0,ht),a.fill(),a.fillStyle="#c9c6cf",a.beginPath(),a.arc(l,c,4,0,ht),a.fill(),R.down&&(a.fillStyle=f,a.strokeStyle="#fff",a.lineWidth=2,a.beginPath(),a.arc(R.x,R.y,7,0,ht),a.fill(),a.stroke()),D.textContent=`${Math.abs(Math.round(x/ht*60))} rpm`,Jh(Math.abs(x)/7.5)});let B=[],C=()=>{let E=Dt(u,u);E.getContext("2d").drawImage(d,0,0),B.push(E),B.length>10&&B.shift()};n.undo=()=>{let E=B.pop();E&&(v.length=0,h.save(),h.setTransform(1,0,0,1,0,0),h.drawImage(E,0,0),h.restore())},n.clear=()=>{C(),v.length=0,N()},n.snapshot=()=>{let E=Dt(u,u),z=E.getContext("2d");return z.fillStyle="#14121a",z.fillRect(0,0,u,u),z.beginPath(),z.arc(u/2,u/2,u/2,0,ht),z.clip(),z.drawImage(d,0,0),E},N(),n.ui.swatches(gu,f,E=>{f=E}),n.ui.sep(),n.ui.slider("Throttle",0,100,p*100,E=>{p=E/100,w=!1,O.classList.remove("on")}),n.ui.slider("Flow",1,12,_,E=>{_=E}),n.ui.button("Reverse",()=>{T*=-1});let O=n.ui.toggle("Brake",!1,E=>{w=E});n.ui.button("New card",()=>n.clear(),"hot");let D=n.ui.readout("0 rpm");n.hint("Hold on the spinning card to squeeze paint. Hit the brake to see what you made.")}var Vl=`
float hash(vec2 p){ return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453); }
float vnoise(vec2 p){ vec2 i=floor(p),f=fract(p); f=f*f*(3.-2.*f);
  return mix(mix(hash(i),hash(i+vec2(1,0)),f.x),mix(hash(i+vec2(0,1)),hash(i+vec2(1,1)),f.x),f.y); }
// Paper is long fibres: stretched noise at a few angles.
float fibre(vec2 p){
  float a = vnoise(p*vec2(.06,.5));
  float b = vnoise(vec2(p.x*.42+p.y*.2,p.y*.05-p.x*.1)+9.);
  float c = vnoise(p*.13+31.);
  return .35+.65*(a*.4+b*.4+c*.2);
}`,mp=`
in vec2 uv; out vec4 o;
uniform sampler2D s; uniform vec2 px; uniform vec2 res; uniform float dry;
${Vl}
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
}`,gp=`
in vec2 uv; out vec4 o;
uniform sampler2D s; uniform vec2 a,b,res; uniform float rad,ink,water;
${Vl}
void main(){
  vec4 c = texture(s,uv);
  vec2 p = uv*res, pa = p-a, ba = b-a;
  float h = clamp(dot(pa,ba)/max(dot(ba,ba),.001),0.,1.);
  float d = length(pa-ba*h);
  // Bristles: the brush edge breaks up, so dry strokes look dry.
  float bristle = .55+.9*vnoise(p*.55+a*.02);
  float m = smoothstep(rad,rad*.35,d*bristle);
  o = vec4(c.r+ink*m,min(1.,c.g+water*m),c.b,1.);
}`,xp=`
in vec2 uv; out vec4 o;
uniform sampler2D s; uniform vec2 res; uniform vec3 paper;
${Vl}
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
}`,xu={Rice:[.94,.915,.86],Bone:[.97,.955,.925],Kraft:[.76,.66,.52]};function Hl(n){let t=n.surface({paper:!0,maxPx:1700}),{W:e,H:i,px:s}=t,r=t.layer({gl:!0}),a=Fn(r.canvas),o=Math.round(e*Math.min(s,1.25)),l=Math.round(i*Math.min(s,1.25)),c=Qr(a,o,l,a.CLAMP_TO_EDGE);if(!c){n.toast("This graphics card cannot run the ink simulation");return}let u=Ke(a,mp),d=Ke(a,gp),h=Ke(a,xp),f="ink",p=22,T=.5,x=1,g="Rice",w=0,_=.1,v=null;function R(L,P){a.bindFramebuffer(a.FRAMEBUFFER,c.b.fbo),a.viewport(0,0,o,l),L.use().i("s",0),yn(a,c.a.tex,0),P(L),_n(a),c.swap()}function N(L){a.bindFramebuffer(a.FRAMEBUFFER,c.a.fbo),a.clearColor(0,L,0,1),a.clear(a.COLOR_BUFFER_BIT)}let m=o/e;function M(L,P){let B=f==="water",C=Math.hypot(P.x-L.x,P.y-L.y);x=Math.max(.05,x-C*7e-4),R(d,O=>O.f("a",L.x*m,(i-L.y)*m).f("b",P.x*m,(i-P.y)*m).f("res",o,l).f("rad",p*m*(.65+x*.35)).f("ink",B?0:T*.34*x).f("water",B?.24:.06+T*.12*x))}t.pointer({down(L){x=1,v=L,M(L,{x:L.x+.2,y:L.y})},move(L){M(v,L),v=L},up(){v=null}}),n.loop(()=>{for(let L=0;L<4;L++)R(u,P=>P.f("px",1/o,1/l).f("res",o,l).f("dry",w));w=Math.max(0,w*.97-1e-5),a.bindFramebuffer(a.FRAMEBUFFER,null),a.viewport(0,0,r.canvas.width,r.canvas.height),h.use().i("s",0).f("res",o,l).f("paper",...xu[g]),yn(a,c.a.tex,0),_n(a)}),n.clear=()=>N(_),n.snapshot=()=>r.canvas,N(_),n.ui.seg([["ink","Ink"],["water","Water"]],f,L=>{f=L}),n.ui.sep(),n.ui.slider("Brush",6,70,p,L=>{p=L}),n.ui.slider("Load",10,100,T*100,L=>{T=L/100}),n.ui.slider("Damp",0,30,_*100,L=>{_=Ut(L/100,0,.3)}),n.ui.seg(Object.keys(xu),g,L=>{g=L}),n.ui.button("Dry it off",()=>{w=.01}),n.ui.button("Wet the sheet",()=>{let L=Ke(a,"in vec2 uv; out vec4 o; uniform sampler2D s; uniform float add; void main(){ vec4 c = texture(s,uv); o = vec4(c.r+c.b*.3,min(1.,c.g+add),c.b*.7,1.); }");R(L,P=>P.f("add",.12))}),n.hint("Touch the brush to damp paper and let go. The ink keeps moving without you.")}var _u=["#111116","#2b2f7a","#6d1a24","#0f5e4e","#7a3db8"],_p=["A moth, filing its taxes.","Two bears agreeing to disagree.","Your landlord, seen from below.","A pelvis with ambitions.","The exact shape of last Tuesday.","A very small dragon on a very long lunch.","Two chefs fighting over one soup.","Something your mother said in 1994.","A butterfly that has seen some things.","Beetle. Definitely a beetle. Moving on.","A rug, plotting.","Twin accountants at a seance."];function Wl(n){let t=n.surface({aspect:1.36,maxPx:1600}),{W:e,H:i,px:s}=t,r=t.layer({alpha:!1}),a=t.buffer(),o=r.g,l=n.rasterUndo(a.canvas),c=_u[0],u=26,d="open",h=0,f="",p=null,T=e/2,x=Dt(e*s,i*s);{let N=x.getContext("2d");N.scale(s,s),N.fillStyle="#f2eee4",N.fillRect(0,0,e,i),rn(N,e,i,{alpha:.05,seed:3})}function g(N,m,M){let L=a.g;L.fillStyle=c,L.beginPath(),L.arc(N,m,M,0,ht),L.fill();let P=Math.random()<.35?3:0;for(let B=0;B<P;B++){let C=Math.random()*ht,O=M*(1.2+Math.random()*2.2);L.beginPath(),L.arc(N+Math.cos(C)*O,m+Math.sin(C)*O,Math.random()*M*.2,0,ht),L.fill()}}t.pointer({down(N){d==="open"&&(l(),p=N,g(N.x,N.y,u),n.dismissTip())},move(N){if(!p)return;let m=Math.hypot(N.x-p.x,N.y-p.y),M=Math.ceil(m/(u*.3));for(let L=1;L<=M;L++)g(p.x+(N.x-p.x)*L/M,p.y+(N.y-p.y)*L/M,u*(.72+Math.random()*.5));p=N},up(){p=null}});function w(){let N=a.canvas.width,m=a.canvas.height,M=Dt(N,m),L=M.getContext("2d");L.drawImage(a.canvas,0,0),L.save(),L.translate(N,0),L.scale(-1,1),L.drawImage(a.canvas,0,0),L.restore();let P=Dt(N,m),B=P.getContext("2d");B.filter=`blur(${2.6*s}px)`,B.drawImage(M,0,0),B.filter="none";let C=B.getImageData(0,0,N,m),O=L.getImageData(0,0,N,m),D=C.data,E=Ze(Math.floor(Math.random()*999)+1),[z,b,I]=hn(c);for(let y=0;y<m;y++)for(let F=0;F<N;F++){let S=(y*N+F)*4,U=D[S+3]/255;if(U===0)continue;let V=Math.min(F,N-1-F),A=(E(V*.05/s,y*.05/s)-.5)*.5+(E(V*.2/s,y*.2/s)-.5)*.22,q=hi(.42,.58,U+A),W=O.data[S+3]>8;D[S]=W?O.data[S]:z,D[S+1]=W?O.data[S+1]:b,D[S+2]=W?O.data[S+2]:I,D[S+3]=q*255}B.putImageData(C,0,0),a.g.save(),a.g.setTransform(1,0,0,1,0,0),a.g.clearRect(0,0,N,m),a.g.drawImage(P,0,0),a.g.restore()}function _(){d==="open"&&(l(),d="closing",h=0,Kt("paper"),f="",R.textContent="")}function v(N){let m=N*Math.PI,M=Math.cos(m);o.drawImage(x,0,0,e*s/2,i*s,0,0,T,i),o.drawImage(a.canvas,0,0,a.canvas.width/2,a.canvas.height,0,0,T,i),o.save(),o.translate(T,0),o.scale(M,1),M>0?(o.drawImage(x,e*s/2,0,e*s/2,i*s,0,0,T,i),o.drawImage(a.canvas,a.canvas.width/2,0,a.canvas.width/2,a.canvas.height,0,0,T,i)):(o.fillStyle="#e4dfd2",o.fillRect(0,0,T,i)),o.fillStyle=`rgba(30,24,16,${Math.sin(m)*.28})`,o.fillRect(0,0,T,i),o.restore()}n.loop(N=>{if(o.fillStyle="#1b191e",o.fillRect(0,0,e,i),d==="open")o.save(),o.setTransform(1,0,0,1,0,0),o.drawImage(x,0,0),o.drawImage(a.canvas,0,0),o.restore();else if(h+=N,d==="closing"){let m=Ut(h/.75);v(m*m*(3-2*m)),m>=1&&(d="pressing",h=0,Kt("thud"))}else if(d==="pressing"){o.fillStyle="#e4dfd2",o.fillRect(0,0,T,i);let m=Ut(h/.9)*i,M=o.createLinearGradient(0,m-90,0,m+30);M.addColorStop(0,"rgba(30,24,16,0)"),M.addColorStop(.8,"rgba(30,24,16,.32)"),M.addColorStop(1,"rgba(30,24,16,0)"),o.fillStyle=M,o.fillRect(0,0,T,i),h>=.9&&(w(),d="opening",h=0,Kt("paper"))}else{let m=Ut(h/.75);v(1-m*m*(3-2*m)),m>=1&&(d="open",f=$s(_p),R.textContent=`The analyst notes: ${f}`)}o.strokeStyle="rgba(40,30,20,.16)",o.lineWidth=1,o.beginPath(),o.moveTo(T,0),o.lineTo(T,i),o.stroke()}),n.clear=()=>{l(),a.g.save(),a.g.setTransform(1,0,0,1,0,0),a.g.clearRect(0,0,a.canvas.width,a.canvas.height),a.g.restore(),R.textContent=""},n.snapshot=()=>r.canvas,n.ui.swatches(_u,c,N=>{c=N}),n.ui.sep(),n.ui.slider("Brush",6,60,u,N=>{u=N}),n.ui.button("Fold and press",_,"hot");let R=n.ui.readout("");n.hint("Dab ink on the left half, then Fold and press. Paint more and fold again to build it up.")}var ql=["#1f6fc4","#d43d3d","#e8b92e","#2a9d6a","#7a3db8","#3fb3d8","#e8772e","#f3e9c8","#7fc9a9","#b0245f"];function Xl(n){let t=n.surface({bleed:!0,maxPx:1600}),{W:e,H:i,px:s}=t,{canvas:r,g:a}=t.layer({alpha:!1}),o=i*.66,l=Math.min(e*.62,o*.74),c=(e-l)/2,u=66,d=Math.round(l*s),h=Math.round(o*s),f=Dt(d,h),p=f.getContext("2d",{willReadFrequently:!0});p.lineCap="round",p.lineJoin="round";let T=Dt(d,h),x=T.getContext("2d"),g=Dt(d,h),w=g.getContext("2d"),_=new Uint32Array(d*h),v=new Uint8Array(d*h),R=ql[0],N=.3,m=5,M=!0,L="lead";function P(A,q,W){let Z=W*.42;A.beginPath(),A.moveTo(0,W),A.lineTo(0,Z),A.quadraticCurveTo(0,Z*.34,q/2,0),A.quadraticCurveTo(q,Z*.34,q,Z),A.lineTo(q,W),A.closePath()}P(x,d,h),x.fillStyle="#fff",x.fill();{let A=x.getImageData(0,0,d,h).data;for(let q=0;q<v.length;q++)v[q]=A[q*4+3]>128?1:0}let B=Dt(d,h);{let A=B.getContext("2d"),q=Ze(14),W=A.createImageData(d,h);for(let Z=0;Z<h;Z++)for(let Y=0;Y<d;Y++){let et=q(Y*.012,Z*.05)*.6+q(Y*.05,Z*.015)*.25+q(Y*.3,Z*.3)*.15,ft=(Z*d+Y)*4;W.data[ft]=W.data[ft+1]=W.data[ft+2]=90+et*150,W.data[ft+3]=255}A.putImageData(W,0,0)}let C=A=>{let[q,W,Z]=hn(A);return(255<<24|Z<<16|W<<8|q)>>>0};function O(){return p.getImageData(0,0,d,h).data}function D(A,q,W){let Z=O(),Y=ut=>Z[ut*4+3]>90||!v[ut],et=q*d+A;if(Y(et))return;let ft=new Uint8Array(d*h),ct=[et];for(ft[et]=1;ct.length;){let ut=ct.pop();_[ut]=W;let _t=ut%d;_t>0&&!ft[ut-1]&&!Y(ut-1)&&(ft[ut-1]=1,ct.push(ut-1)),_t<d-1&&!ft[ut+1]&&!Y(ut+1)&&(ft[ut+1]=1,ct.push(ut+1)),ut>=d&&!ft[ut-d]&&!Y(ut-d)&&(ft[ut-d]=1,ct.push(ut-d)),ut<d*(h-1)&&!ft[ut+d]&&!Y(ut+d)&&(ft[ut+d]=1,ct.push(ut+d))}M=!0}function E(){let A=w.createImageData(d,h),q=new Uint32Array(A.data.buffer),W=C("#3a3f4a");for(let Z=0;Z<_.length;Z++)q[Z]=v[Z]?_[Z]||W:0;w.putImageData(A,0,0),w.globalCompositeOperation="overlay",w.drawImage(B,0,0),w.globalCompositeOperation="destination-in",w.drawImage(T,0,0),w.globalCompositeOperation="source-over"}let z=A=>[(A.x-c)/l*d,(A.y-u)/o*h],b=null,I=0,y=null;function F(A,q){p.strokeStyle="#141216",p.lineWidth=m*s,p.beginPath(),p.moveTo(A[0],A[1]),p.lineTo(q[0],q[1]),p.stroke(),M=!0}t.pointer({down(A){U(),y=z(A),b=y,I=0},move(A){if(!b)return;let q=z(A);I+=Math.hypot(q[0]-b[0],q[1]-b[1]),L==="lead"&&I>5&&F(b,q),b=q},up(A){if(b){if(L==="glaze"||I<=5){let[q,W]=z(A),Z=Math.floor(W)*d+Math.floor(q);q>=0&&W>=0&&q<d&&W<h&&v[Z]&&(D(Math.floor(q),Math.floor(W),C(R)),Kt("tink"))}b=null}}}),n.loop((A,q)=>{M&&(E(),M=!1);let W=c+l*(N*1.8-.4),Z=u-40,Y=a.createLinearGradient(0,0,0,i);Y.addColorStop(0,"#26232b"),Y.addColorStop(.72,"#1a181e"),Y.addColorStop(.73,"#121014"),Y.addColorStop(1,"#0b0a0d"),a.fillStyle=Y,a.fillRect(0,0,e,i);let et=u+o+16,ft=(.5-N)*1.7;a.save(),a.globalCompositeOperation="lighter",a.globalAlpha=.62,a.filter="blur(9px)",a.transform(1,0,ft,1,0,0),a.translate(c-ft*et,et),a.drawImage(g,0,0,l,(i-et)*1.25),a.restore(),a.save(),a.translate(c,u),a.shadowColor="rgba(0,0,0,.8)",a.shadowBlur=40,P(a,l,o),a.fillStyle="#0a090c",a.fill(),a.shadowBlur=0,a.clip(),a.drawImage(g,0,0,l,o);let ct=a.createRadialGradient(W-c,Z-u+o*.26,10,W-c,Z-u+o*.26,o*.92);ct.addColorStop(0,"rgba(255,245,210,.42)"),ct.addColorStop(.3,"rgba(255,240,200,.1)"),ct.addColorStop(1,"rgba(0,0,10,.5)"),a.fillStyle=ct,a.fillRect(0,0,l,o),a.drawImage(f,0,0,l,o),a.restore(),a.save(),a.translate(c,u),P(a,l,o),a.strokeStyle="#3c3845",a.lineWidth=7,a.stroke(),a.restore(),a.save(),a.globalCompositeOperation="lighter";for(let ut=0;ut<28;ut++){let _t=c+l*((ut*.137+q*.008)%1),nt=u+o+8+ut*53%Math.max(10,i-u-o-10);a.fillStyle=`rgba(255,240,210,${.08+.1*Math.sin(q+ut)})`,a.beginPath(),a.arc(_t+ft*(nt-et),nt,1.1,0,ht),a.fill()}a.restore()});let S=[],U=()=>{let A=Dt(d,h);A.getContext("2d").drawImage(f,0,0),S.push({lead:A,paint:_.slice()}),S.length>14&&S.shift()};n.undo=()=>{let A=S.pop();A&&(p.clearRect(0,0,d,h),p.drawImage(A.lead,0,0),_.set(A.paint),M=!0)},n.clear=()=>{U(),p.clearRect(0,0,d,h),_.fill(0),M=!0},n.snapshot=()=>r;function V(){p.strokeStyle="#141216",p.lineWidth=m*s;let A=d/2,q=h*.36,W=d*.3;for(let Y of[.34,1])p.beginPath(),p.arc(A,q,W*Y,0,ht),p.stroke();for(let Y=0;Y<8;Y++){let et=Y/8*ht;p.beginPath(),p.moveTo(A+Math.cos(et)*W*.34,q+Math.sin(et)*W*.34),p.lineTo(A+Math.cos(et)*W,q+Math.sin(et)*W),p.stroke()}[.25,.5,.75].forEach(Y=>{p.beginPath(),p.moveTo(d*Y,q+W+3),p.lineTo(d*Y,h),p.stroke()}),[.72,.86].forEach(Y=>{p.beginPath(),p.moveTo(0,h*Y),p.lineTo(d,h*Y),p.stroke()}),p.beginPath(),p.moveTo(0,q+W+3),p.lineTo(d,q+W+3),p.stroke(),[[A,q,2],[A+W*.65,q+W*.2,0],[A-W*.65,q-W*.2,0],[A+W*.2,q-W*.65,1],[A-W*.2,q+W*.65,1],[A+W*.2,q+W*.65,5],[A-W*.2,q-W*.65,5],[A+W*.65,q-W*.2,3],[A-W*.65,q+W*.2,3],[d*.12,h*.6,1],[d*.38,h*.6,7],[d*.62,h*.6,0],[d*.88,h*.6,6],[d*.12,h*.93,4],[d*.88,h*.93,4],[d*.5+8,h*.8,2]].forEach(([Y,et,ft])=>D(Math.floor(Y),Math.floor(et),C(ql[ft])))}n.ui.swatches(ql,R,A=>{R=A}),n.ui.sep(),n.ui.seg([["lead","Lead"],["glaze","Glaze"]],L,A=>{L=A}),n.ui.slider("Lead",2,12,m,A=>{m=A}),n.ui.slider("Sun",0,100,N*100,A=>{N=Ut(A/100)}),V(),n.hint("Draw lead lines, tap a pane to glaze it, then drag the sun. Colour lands on the floor.")}var yu={Sparkler:{core:"#fff6df",halo:"rgba(255,150,50,.2)",sparks:"rgba(255,190,90,"},Neon:{core:"#ffe3f2",halo:"rgba(255,40,140,.24)",sparks:null},Ice:{core:"#ecfaff",halo:"rgba(70,190,255,.22)",sparks:"rgba(140,220,255,"},Fairy:{core:"#fff2c9",halo:"rgba(255,210,120,.1)",dots:!0,sparks:null}};function Yl(n){let t=n.surface({bleed:!0,bg:"#040307",maxPx:1800}),{W:e,H:i,px:s}=t,r=t.buffer(),a=t.layer({alpha:!1}),o="Sparkler",l=3,c=0,u=!0,d=!0,h=!0,f=n.rasterUndo(r.canvas,8),p=[],T=Dt(e*s,i*s);{let m=T.getContext("2d"),M=Pe(8);m.scale(s,s),m.fillStyle="#000",m.beginPath(),m.moveTo(0,i);let L=0;for(;L<e+30;){let P=i*(.14+M()*.09);m.lineTo(L,i-P*.6),m.lineTo(L+9+M()*12,i-P),m.lineTo(L+20+M()*12,i-P*.58),L+=18+M()*18}m.lineTo(e,i),m.closePath(),m.fill()}let x=Pe(3),g=Array.from({length:240},()=>({a:x()*ht,d:Math.pow(x(),.6)*Math.hypot(e,i)*.8,b:.1+x()*.5,c:x()<.2?"180,200,255":x()<.4?"255,220,190":"255,255,255"})),w={x:e*.62,y:i*.22};function _(m,M){let L=r.g,P=yu[o];if(L.save(),L.globalCompositeOperation="lighter",L.lineCap="round",P.dots){let B=Math.hypot(M.x-m.x,M.y-m.y);if(R+=B,R>26){R=0;let C=["#ffd27a","#ff7a59","#7ad7f0","#9df08a"][Math.floor(Math.random()*4)],O=L.createRadialGradient(M.x,M.y,0,M.x,M.y,13+l);O.addColorStop(0,"#fff"),O.addColorStop(.2,C),O.addColorStop(1,"rgba(0,0,0,0)"),L.fillStyle=O,L.beginPath(),L.arc(M.x,M.y,13+l,0,ht),L.fill()}}else L.strokeStyle=P.halo,L.lineWidth=l*7,L.beginPath(),L.moveTo(m.x,m.y),L.lineTo(M.x,M.y),L.stroke(),L.lineWidth=l*3,L.stroke(),L.strokeStyle=P.core,L.lineWidth=l*.7,L.stroke();if(L.restore(),d&&P.sparks){let B=3+Math.floor(Math.random()*3);for(let C=0;C<B;C++){let O=Math.random()*ht,D=120+Math.random()*420;p.push({x:M.x,y:M.y,vx:Math.cos(O)*D,vy:Math.sin(O)*D,life:.1+Math.random()*.34,c:P.sparks})}p.length>500&&p.splice(0,120)}}let v=null,R=0;t.pointer({down(m){f(),v=m,_(m,{x:m.x+.2,y:m.y})},move(m){_(v,m),v=m},up(){v=null}}),n.loop(m=>{h&&(c+=m);let M=r.g;M.save(),M.globalCompositeOperation="lighter",M.lineCap="round";for(let C=p.length-1;C>=0;C--){let O=p[C],D=O.x,E=O.y;O.vy+=520*m,O.vx*=.985,O.x+=O.vx*m,O.y+=O.vy*m,O.life-=m,M.strokeStyle=`${O.c}${Ut(O.life*3,.05,.7)})`,M.lineWidth=.9,M.beginPath(),M.moveTo(D,E),M.lineTo(O.x,O.y),M.stroke(),O.life<=0&&p.splice(C,1)}if(u&&h)for(let C of g){let O=C.a;C.a+=m*.012,M.strokeStyle=`rgba(${C.c},${C.b*.34})`,M.lineWidth=.8,M.beginPath(),M.moveTo(w.x+Math.cos(O)*C.d,w.y+Math.sin(O)*C.d),M.lineTo(w.x+Math.cos(C.a)*C.d,w.y+Math.sin(C.a)*C.d),M.stroke()}M.restore();let L=a.g,P=Ut(c/90),B=L.createLinearGradient(0,0,0,i);B.addColorStop(0,`rgb(${4+P*8},${3+P*12},${7+P*32})`),B.addColorStop(1,`rgb(${5+P*40},${4+P*20},${8+P*34})`),L.fillStyle=B,L.fillRect(0,0,e,i),L.drawImage(r.canvas,0,0,e,i),L.save(),L.globalAlpha=.25+P*.7,L.drawImage(T,0,0,e,i),L.restore(),N.textContent=`${h?"Open":"Shut"} \xB7 ${Math.floor(c)} s`}),n.clear=()=>{f(),r.g.save(),r.g.setTransform(1,0,0,1,0,0),r.g.clearRect(0,0,r.canvas.width,r.canvas.height),r.g.restore(),c=0},n.snapshot=()=>a.canvas,n.ui.seg(Object.keys(yu),o,m=>{o=m}),n.ui.sep(),n.ui.slider("Width",1,9,l,m=>{l=m}),n.ui.toggle("Sparks",d,m=>{d=m}),n.ui.toggle("Star trails",u,m=>{u=m}),n.ui.toggle("Shutter",h,m=>{h=m});let N=n.ui.readout("Open \xB7 0 s");n.hint("Write on the dark. Leave the shutter open and the stars will start to trail behind you.")}var vu={Coral:[.0545,.062],Fingerprint:[.037,.06],Mitosis:[.0367,.0649],Worms:[.078,.061],Maze:[.029,.057],Bubbles:[.098,.0555]},Mu={Lagoon:[[.02,.09,.12],[.11,.64,.6],[.72,.98,.88]],Ember:[[.07,.02,.03],[.82,.22,.1],[1,.84,.5]],Orchid:[[.07,.03,.12],[.62,.22,.72],[1,.82,.92]],Lichen:[[.08,.1,.05],[.52,.6,.18],[.95,.93,.68]]},yp=`
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
}`,vp=`
in vec2 uv; out vec4 o;
uniform sampler2D s; uniform vec2 a,b; uniform float rad;
void main(){
  vec4 c = texture(s,uv);
  vec2 pa = uv-a, ba = b-a;
  float h = clamp(dot(pa,ba)/max(dot(ba,ba),1e-6),0.,1.);
  float m = step(length(pa-ba*h),rad);
  o = vec4(mix(c.r,.5,m),mix(c.g,.25,m),0.,1.);
}`,Mp=`
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
}`;function $l(n){let t=n.surface({aspect:1,maxPx:1500}),{W:e,H:i}=t,s=t.layer({gl:!0}),r=Fn(s.canvas),a=512,o=Qr(r,a,a);if(!o){n.toast("This graphics card cannot run the simulation");return}let l=Ke(r,yp),c=Ke(r,vp),u=Ke(r,Mp),d="Coral",h="Lagoon",f=10,p=.014,T=null;function x(R,N){r.bindFramebuffer(r.FRAMEBUFFER,o.b.fbo),r.viewport(0,0,a,a),R.use().i("s",0),yn(r,o.a.tex,0),N(R),_n(r),o.swap()}function g(){r.bindFramebuffer(r.FRAMEBUFFER,o.a.fbo),r.clearColor(1,0,0,1),r.clear(r.COLOR_BUFFER_BIT)}let w=(R,N)=>x(c,m=>m.f("a",R[0],R[1]).f("b",N[0],N[1]).f("rad",p)),_=R=>[R.x/e,1-R.y/i];t.pointer({down(R){T=_(R),w(T,T)},move(R){let N=_(R);w(T,N),T=N},up(){T=null}}),n.loop(()=>{let[R,N]=vu[d];for(let P=0;P<f;P++)x(l,B=>B.f("px",1/a,1/a).f("F",R).f("K",N));r.bindFramebuffer(r.FRAMEBUFFER,null),r.viewport(0,0,s.canvas.width,s.canvas.height);let[m,M,L]=Mu[h];u.use().i("s",0).f("px",1/a,1/a).f("c0",...m).f("c1",...M).f("c2",...L),yn(r,o.a.tex,0),_n(r)});function v(){for(let R=0;R<7;R++){let N=R/7*ht,m=.05+R%3*.1,M=[.5+Math.cos(N)*m,.5+Math.sin(N)*m];w(M,M)}}n.clear=()=>{g()},n.snapshot=()=>s.canvas,g(),v(),n.ui.seg(Object.keys(vu),d,R=>{d=R}),n.ui.sep(),n.ui.seg(Object.keys(Mu),h,R=>{h=R}),n.ui.sep(),n.ui.slider("Clock",1,24,f,R=>{f=R}),n.ui.slider("Seed",5,40,p*1e3,R=>{p=R/1e3}),n.hint("Touch the dish to seed it. Change species mid-growth and see what the colony does.")}var un={name:"Smudge Club",tagline:"thumbs required",prefix:"SC"},$n={name:"Marcoverse",url:"https://marcoverse.co.uk"},be=(n,t,e,i,s,r,a,o)=>({id:n,title:t,genre:e,glow:i,accent:s,blurb:r,tracks:a,mount:o}),an=[be("drip-feed","Drip Feed","Wet enamel, thrown","#e8452d","#e8452d","Fling gloss enamel at a floor-bound canvas. Speed makes spatter, stillness makes pools, and the light follows your hand across the wet paint.",["Fling (drag fast)","Pool (hold still)","Run (tilt the canvas)","Change the tin","Wait for it to dry"],gl),be("golden-repair","Golden Repair","Ceramics, broken on purpose","#c9962e","#d9a93a","Strike a glazed bowl until it gives, gather the pieces, and watch every seam fill with molten metal. It ends up better than it started.",["Strike (tap the bowl)","Gather (drag pieces home)","Pour the seam","Choose your metal","Throw a new bowl"],xl),be("sediment","Sediment","Falling grains, glass bottle","#d98a3d","#e29a4c","Pour coloured sand into a bottle, then do what the seaside craftsmen do: push a stick down the glass to pull the layers into mountains.",["Pour (hold to fall)","Poke (stick down the side)","Tilt the bottle","Swap the sand","Cork it"],yl),be("endpaper","Endpaper","Ink on water, lifted","#2f6f8f","#3b8bb3","Float ink on a still bath, drag a comb through it, then lay down the paper and lift off a print, like the inside cover of an old hardback.",["Drop (tap the water)","Rake (drag the comb)","Stir (swirl)","Lay the paper","Skim and start again"],vl),be("steamed-up","Steamed Up","Finger on cold glass","#3a5f8a","#6c9bd2","A window on a wet night. Draw with your finger and the city comes back into focus. Drops gather, run, and the fog creeps back in.",["Wipe (draw on the glass)","Run (drops find their way)","Breathe (fog it again)","Change the view","Leave it to mist"],Sl),be("hall-of-mirrors","Hall of Mirrors","Light, multiplied","#7a3df0","#a06bff","Every stroke is caught by a ring of mirrors and thrown back in glowing colour. Set the whole thing turning and paint on the wheel.",["Draw (one becomes many)","Add mirrors","Reflect or rotate","Set it turning","Change the light"],bl),be("wallpaper-group","Wallpaper Group","Seventeen ways to repeat","#2f9e77","#38b58a","Draw in one cell and the whole plane answers. Slide, turn and glide through the symmetry groups that wallpaper has been quietly using for centuries.",["Draw (in any tile)","Pick a symmetry","Show the seams","Scale the tile","Choose the paper"],El),be("wordsmear","Wordsmear","Poems along a wet line","#c23b5a","#e0557a","The brush is loaded with language. Write your own line and paint with it, as letters swell when you slow down and thin when you hurry.",["Type your verse","Paint (letters follow)","Slow down to shout","Pick a typeface","Turn the page"],Cl),be("right-angles","Right Angles","Neoplastic boogie","#d8312c","#e23a33","Split the plane, fill the rooms with primaries, then press play: small coloured cars set off down your black lines and the painting starts to swing.",["Split (drag across a room)","Fill (tap a room)","Nudge the lines","Boogie (press play)","Whitewash"],Rl),be("dont-lift","Don't Lift","One continuous line","#b8a98c","#c9b48a","You get one line. It starts when you touch down and ends for good when you let go. Then the pen plays your hesitation back to you.",["Touch down","Keep going","Don't lift","Watch the replay","Take a new sheet"],Ll),be("twin-dials","Twin Dials","Two knobs, one stubborn line","#27b36a","#35d07e","One dial runs left and right, the other up and down. Diagonals take patience. Curves take practice. Shake the whole unit to start again.",["Left dial (across)","Right dial (up and down)","Arrow keys work too","Switch the screen","Shake it clean"],Nl),be("raked","Raked","Dry garden, low sun","#a89878","#c2b08c","Comb pale gravel into furrows, set down your stones and let the ripples wrap around them. Drag the sun across the sky to rake the light as well.",["Rake (drag through)","Set a stone","Ripple (tap a stone)","Change the tines","Move the sun"],Dl),be("squint","Squint","Optical mixing, dot by dot","#e0a526","#efb93a","The brush lays down evenly spaced dots of pure colour. Up close they are confetti. Press Squint and your eyes do the mixing.",["Dab (dots keep their distance)","Layer two colours","Change the dot","Squint","Count your dots"],Ul),be("scratch-track","Scratch Track","Black wax over foil","#6b3df0","#8b5cf6","Scrape through the black and find the shimmering foil underneath. Curls of wax fall away, and the colours shift as your hand moves.",["Scrape (black comes off)","Change the nib","Pick the foil","Blow the flakes","Wax it over"],Fl),be("highly-strung","Highly Strung","Pins, thread, pitch","#c8486e","#e65f87","Hammer in pins and wind thread between them, then pluck it. Every string rings at a pitch set by its length, so your picture is also an instrument.",["Pin (tap to place)","Wind (drag pin to pin)","Pluck (flick a thread)","Times tables","Change the thread"],Ol),be("low-res","Low Res","Sixteen colours, four frames","#2d8fd5","#3fa7f0","A tiny grid and a limited palette. Then the twist: flip through four frames with onion skins and your drawing starts to walk.",["Pixel (click the grid)","Fill and dither","Mirror mode","Onion skin","Play the flipbook"],Bl),be("word-wheel","Word Wheel","Language, in the round","#b44ac0","#cf62dc","Paint with words, and the words are mirrored around the centre. Small letters build into rose windows you can almost read.",["Type the mantra","Paint from the middle","Add spokes","Mirror the letters","Change the ink"],zl),be("spin-cycle","Spin Cycle","Paint on a turntable","#e0308a","#f04a9c","Fairground spin art. Squeeze paint onto a spinning card and it races outward in comet tails. Hit the brake to see what you made.",["Squeeze (hold on the card)","Throttle (speed it up)","Reverse","Brake","New card"],Gl),be("wet-on-wet","Wet on Wet","Ink meets damp paper","#55606a","#8a97a3","Load a brush with sumi ink and touch it to damp paper. The ink crawls off along the fibres on its own, and you are only partly in charge.",["Touch (ink blooms)","Wet the paper","Load the brush","Dry it off","Fresh sheet"],Hl),be("fold-here","Fold Here","The inkblot test","#3c3c46","#9a9aa8","Dab ink on one half of the sheet, fold it shut, and press. Open it up and a stranger creature looks back. The analyst has notes.",["Dab (on the left)","Fold and press","Open it up","Read the verdict","Blot again"],Wl),be("leadlight","Leadlight","Stained glass, backlit","#2a7fbf","#3a9ae0","Draw the lead, pour coloured glass into the gaps, then drag the sun across the window and watch it throw colour.",["Lead (draw the lines)","Glaze (tap a pane)","Pick the glass","Move the sun","Reglaze"],Xl),be("long-exposure","Long Exposure","Sparkler on a slow shutter","#e8892b","#f59e3f","Hold the shutter open and write on the dark with a sparkler. Light stacks up, trails hang in the air, and nothing goes away until you close it.",["Write (light stacks)","Change the sparkler","Hold the shutter","Add sparks","Close the shutter"],Yl),be("slow-growth","Slow Growth","Two chemicals, one reef","#1fa8a0","#2cc4ba","Seed a dish with a touch and two reacting chemicals grow coral, fingerprints and mitosis from nothing. You are gardening a mathematical equation.",["Seed (touch the dish)","Pick a species","Change the dye","Speed the clock","Sterilise"],$l)],Sp={"drip-feed":["bristle","studio"],"golden-repair":["none","studio"],sediment:["sand","wind"],endpaper:["water","water"],"steamed-up":["glass","rain"],"hall-of-mirrors":["shimmer","night"],"wallpaper-group":["pencil","studio"],wordsmear:["pencil","studio"],"right-angles":["none","studio"],"dont-lift":["pencil","studio"],"twin-dials":["none","hum"],raked:["sand","wind"],squint:["chalk","studio"],"scratch-track":["scratch","studio"],"highly-strung":["none","night"],"low-res":["none","hum"],"word-wheel":["pencil","night"],"spin-cycle":["bristle","studio"],"wet-on-wet":["water","water"],"fold-here":["bristle","studio"],leadlight:["glass","studio"],"long-exposure":["sizzle","night"],"slow-growth":["water","water"]};an.forEach((n,t)=>{n.index=t,n.cat=`${un.prefix} ${String(t+1).padStart(3,"0")}`,[n.timbre,n.bed]=Sp[n.id]});var ju=0,Lc=1,td=2;var Nr=1,ed=2,Ls=3,Ei=0,en=1,Sn=2,Yi=0,Ns=1,Nc=2,Dc=3,Uc=4,nd=5;var $i=100,id=101,sd=102,rd=103,ad=104,od=200,ld=201,cd=202,hd=203,Fc=204,Oc=205,ud=206,dd=207,fd=208,pd=209,md=210,gd=211,xd=212,_d=213,yd=214,Ta=0,Ea=1,Aa=2,ys=3,Ca=4,Ra=5,Ia=6,Pa=7,Bc=0,vd=1,Md=2,bn=0,kc=1,zc=2,Gc=3,Vc=4,Hc=5,Wc=6,qc=7;var Xc=300,Zi=301,Ds=302,lo=303,co=304,Vi=1e3,Bn=1001,La=1002,Oe=1003,Sd=1004;var Dr=1005;var Qe=1006,ho=1007;var si=1008;var on=1009,Yc=1010,$c=1011,Us=1012,uo=1013,Pn=1014,Ln=1015,Nn=1016,fo=1017,po=1018,Ki=1020,Zc=35902,Kc=35899,Jc=1021,Qc=1022,Dn=1023,ei=1026,ri=1027,jc=1028,mo=1029,Ai=1030,go=1031;var xo=1033,Ur=33776,Fr=33777,Or=33778,Br=33779,_o=35840,yo=35841,vo=35842,Mo=35843,So=36196,bo=37492,wo=37496,To=37488,Eo=37489,kr=37490,Ao=37491,Co=37808,Ro=37809,Io=37810,Po=37811,Lo=37812,No=37813,Do=37814,Uo=37815,Fo=37816,Oo=37817,Bo=37818,ko=37819,zo=37820,Go=37821,Vo=36492,Ho=36494,Wo=36495,qo=36283,Xo=36284,zr=36285,Yo=36286;var ar=2300,Na=2301,ba=2302,vc=2303,Mc=2400,Sc=2401,bc=2402;var bd=3200;var $o=0,wd=1,ai="",qe="srgb",or="srgb-linear",lr="linear",fe="srgb";var wa=7680;var Td=519,Ed=512,Ad=513,Cd=514,th=515,Rd=516,Id=517,eh=518,nh=519,Pd=35044;var ih="300 es",Mn=2e3,vs=2001;function bp(n){for(let t=n.length-1;t>=0;--t)if(n[t]>=65535)return!0;return!1}function wp(n){return ArrayBuffer.isView(n)&&!(n instanceof DataView)}function cr(n){return document.createElementNS("http://www.w3.org/1999/xhtml",n)}function Ld(){let n=cr("canvas");return n.style.display="block",n}var Su={},Ms=null;function sh(...n){let t="THREE."+n.shift();Ms?Ms("log",t,...n):console.log(t,...n)}function Nd(n){let t=n[0];if(typeof t=="string"&&t.startsWith("TSL:")){let e=n[1];e&&e.isStackTrace?n[0]+=" "+e.getLocation():n[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return n}function Xt(...n){n=Nd(n);let t="THREE."+n.shift();if(Ms)Ms("warn",t,...n);else{let e=n[0];e&&e.isStackTrace?console.warn(e.getError(t)):console.warn(t,...n)}}function Yt(...n){n=Nd(n);let t="THREE."+n.shift();if(Ms)Ms("error",t,...n);else{let e=n[0];e&&e.isStackTrace?console.error(e.getError(t)):console.error(t,...n)}}function Gi(...n){let t=n.join(" ");t in Su||(Su[t]=!0,Xt(...n))}function Dd(n,t,e){return new Promise(function(i,s){function r(){switch(n.clientWaitSync(t,n.SYNC_FLUSH_COMMANDS_BIT,0)){case n.WAIT_FAILED:s();break;case n.TIMEOUT_EXPIRED:setTimeout(r,e);break;default:i()}}setTimeout(r,e)})}var Ud={[Ta]:Ta,[Aa]:Ia,[Ca]:Ca,[ys]:Ra,[Ea]:Ea,[Ia]:Aa,[Pa]:Pa,[Ra]:ys},zn=class{addEventListener(t,e){this._listeners===void 0&&(this._listeners={});let i=this._listeners;i[t]===void 0&&(i[t]=[]),i[t].indexOf(e)===-1&&i[t].push(e)}hasEventListener(t,e){let i=this._listeners;return i===void 0?!1:i[t]!==void 0&&i[t].indexOf(e)!==-1}removeEventListener(t,e){let i=this._listeners;if(i===void 0)return;let s=i[t];if(s!==void 0){let r=s.indexOf(e);r!==-1&&s.splice(r,1)}}dispatchEvent(t){let e=this._listeners;if(e===void 0)return;let i=e[t.type];if(i!==void 0){t.target=this;let s=i.slice(0);for(let r=0,a=s.length;r<a;r++)s[r].call(this,t);t.target=null}}},He=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];var Zl=Math.PI/180,Da=180/Math.PI;function Fs(){let n=Math.random()*4294967295|0,t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,i=Math.random()*4294967295|0;return(He[n&255]+He[n>>8&255]+He[n>>16&255]+He[n>>24&255]+"-"+He[t&255]+He[t>>8&255]+"-"+He[t>>16&15|64]+He[t>>24&255]+"-"+He[e&63|128]+He[e>>8&255]+"-"+He[e>>16&255]+He[e>>24&255]+He[i&255]+He[i>>8&255]+He[i>>16&255]+He[i>>24&255]).toLowerCase()}function se(n,t,e){return Math.max(t,Math.min(e,n))}function Tp(n,t){return(n%t+t)%t}function Kl(n,t,e){return(1-e)*n+e*t}function Fd(n){return Math.pow(2,Math.floor(Math.log(n)/Math.LN2))}function rh(n){switch(n.constructor){case Uint32Array:return 4294967295;case Uint16Array:return 65535;case Uint8Array:case Uint8ClampedArray:return 255;case Int32Array:return 2147483647;case Int16Array:return 32767;case Int8Array:return 127;default:return}}function Ep(n,t){if(t.constructor===Float32Array)return n;let e=rh(t);if(e===void 0)throw new Error("THREE.MathUtils: Invalid component type.");return Math.max(n/e,-1)}function Ap(n,t){if(t.constructor===Float32Array)return n;let e=rh(t);if(e===void 0)throw new Error("THREE.MathUtils: Invalid component type.");return Math.round(n*e)}var uh=class uh{constructor(t=0,e=0){this.x=t,this.y=e}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,e){return this.x=t,this.y=e,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;default:throw new Error("THREE.Vector2: index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("THREE.Vector2: index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){let e=this.x,i=this.y,s=t.elements;return this.x=s[0]*e+s[3]*i+s[6],this.y=s[1]*e+s[4]*i+s[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,e){return this.x=se(this.x,t.x,e.x),this.y=se(this.y,t.y,e.y),this}clampScalar(t,e){return this.x=se(this.x,t,e),this.y=se(this.y,t,e),this}clampLength(t,e){let i=this.length();return this.divideScalar(i||1).multiplyScalar(se(i,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){let e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;let i=this.dot(t)/e;return Math.acos(se(i,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){let e=this.x-t.x,i=this.y-t.y;return e*e+i*i}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this}lerpVectors(t,e,i){return this.x=t.x+(e.x-t.x)*i,this.y=t.y+(e.y-t.y)*i,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this}rotateAround(t,e){let i=Math.cos(e),s=Math.sin(e),r=this.x-t.x,a=this.y-t.y;return this.x=r*i-a*s+t.x,this.y=r*s+a*i+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}};uh.prototype.isVector2=!0;var Ct=uh,Gn=class{constructor(t=0,e=0,i=0,s=1){this.isQuaternion=!0,this._x=t,this._y=e,this._z=i,this._w=s}static slerpFlat(t,e,i,s,r,a,o){let l=i[s+0],c=i[s+1],u=i[s+2],d=i[s+3],h=r[a+0],f=r[a+1],p=r[a+2],T=r[a+3];if(d!==T||l!==h||c!==f||u!==p){let x=l*h+c*f+u*p+d*T;x<0&&(h=-h,f=-f,p=-p,T=-T,x=-x);let g=1-o;if(x<.9995){let w=Math.acos(x),_=Math.sin(w);g=Math.sin(g*w)/_,o=Math.sin(o*w)/_,l=l*g+h*o,c=c*g+f*o,u=u*g+p*o,d=d*g+T*o}else{l=l*g+h*o,c=c*g+f*o,u=u*g+p*o,d=d*g+T*o;let w=1/Math.sqrt(l*l+c*c+u*u+d*d);l*=w,c*=w,u*=w,d*=w}}t[e]=l,t[e+1]=c,t[e+2]=u,t[e+3]=d}static multiplyQuaternionsFlat(t,e,i,s,r,a){let o=i[s],l=i[s+1],c=i[s+2],u=i[s+3],d=r[a],h=r[a+1],f=r[a+2],p=r[a+3];return t[e]=o*p+u*d+l*f-c*h,t[e+1]=l*p+u*h+c*d-o*f,t[e+2]=c*p+u*f+o*h-l*d,t[e+3]=u*p-o*d-l*h-c*f,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,e,i,s){return this._x=t,this._y=e,this._z=i,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,e=!0){let i=t._x,s=t._y,r=t._z,a=t._order,o=Math.cos,l=Math.sin,c=o(i/2),u=o(s/2),d=o(r/2),h=l(i/2),f=l(s/2),p=l(r/2);switch(a){case"XYZ":this._x=h*u*d+c*f*p,this._y=c*f*d-h*u*p,this._z=c*u*p+h*f*d,this._w=c*u*d-h*f*p;break;case"YXZ":this._x=h*u*d+c*f*p,this._y=c*f*d-h*u*p,this._z=c*u*p-h*f*d,this._w=c*u*d+h*f*p;break;case"ZXY":this._x=h*u*d-c*f*p,this._y=c*f*d+h*u*p,this._z=c*u*p+h*f*d,this._w=c*u*d-h*f*p;break;case"ZYX":this._x=h*u*d-c*f*p,this._y=c*f*d+h*u*p,this._z=c*u*p-h*f*d,this._w=c*u*d+h*f*p;break;case"YZX":this._x=h*u*d+c*f*p,this._y=c*f*d+h*u*p,this._z=c*u*p-h*f*d,this._w=c*u*d-h*f*p;break;case"XZY":this._x=h*u*d-c*f*p,this._y=c*f*d-h*u*p,this._z=c*u*p+h*f*d,this._w=c*u*d+h*f*p;break;default:Xt("Quaternion: .setFromEuler() encountered an unknown order: "+a)}return e===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,e){let i=e/2,s=Math.sin(i);return this._x=t.x*s,this._y=t.y*s,this._z=t.z*s,this._w=Math.cos(i),this._onChangeCallback(),this}setFromRotationMatrix(t){let e=t.elements,i=e[0],s=e[4],r=e[8],a=e[1],o=e[5],l=e[9],c=e[2],u=e[6],d=e[10],h=i+o+d;if(h>0){let f=.5/Math.sqrt(h+1);this._w=.25/f,this._x=(u-l)*f,this._y=(r-c)*f,this._z=(a-s)*f}else if(i>o&&i>d){let f=2*Math.sqrt(1+i-o-d);this._w=(u-l)/f,this._x=.25*f,this._y=(s+a)/f,this._z=(r+c)/f}else if(o>d){let f=2*Math.sqrt(1+o-i-d);this._w=(r-c)/f,this._x=(s+a)/f,this._y=.25*f,this._z=(l+u)/f}else{let f=2*Math.sqrt(1+d-i-o);this._w=(a-s)/f,this._x=(r+c)/f,this._y=(l+u)/f,this._z=.25*f}return this._onChangeCallback(),this}setFromUnitVectors(t,e){let i=t.dot(e)+1;return i<1e-8?(i=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=i):(this._x=0,this._y=-t.z,this._z=t.y,this._w=i)):(this._x=t.y*e.z-t.z*e.y,this._y=t.z*e.x-t.x*e.z,this._z=t.x*e.y-t.y*e.x,this._w=i),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(se(this.dot(t),-1,1)))}rotateTowards(t,e){let i=this.angleTo(t);if(i===0)return this;let s=Math.min(1,e/i);return this.slerp(t,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,e){let i=t._x,s=t._y,r=t._z,a=t._w,o=e._x,l=e._y,c=e._z,u=e._w;return this._x=i*u+a*o+s*c-r*l,this._y=s*u+a*l+r*o-i*c,this._z=r*u+a*c+i*l-s*o,this._w=a*u-i*o-s*l-r*c,this._onChangeCallback(),this}slerp(t,e){let i=t._x,s=t._y,r=t._z,a=t._w,o=this.dot(t);o<0&&(i=-i,s=-s,r=-r,a=-a,o=-o);let l=1-e;if(o<.9995){let c=Math.acos(o),u=Math.sin(c);l=Math.sin(l*c)/u,e=Math.sin(e*c)/u,this._x=this._x*l+i*e,this._y=this._y*l+s*e,this._z=this._z*l+r*e,this._w=this._w*l+a*e,this._onChangeCallback()}else this._x=this._x*l+i*e,this._y=this._y*l+s*e,this._z=this._z*l+r*e,this._w=this._w*l+a*e,this.normalize();return this}slerpQuaternions(t,e,i){return this.copy(t).slerp(e,i)}random(){let t=2*Math.PI*Math.random(),e=2*Math.PI*Math.random(),i=Math.random(),s=Math.sqrt(1-i),r=Math.sqrt(i);return this.set(s*Math.sin(t),s*Math.cos(t),r*Math.sin(e),r*Math.cos(e))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,e=0){return this._x=t[e],this._y=t[e+1],this._z=t[e+2],this._w=t[e+3],this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._w,t}fromBufferAttribute(t,e){return this._x=t.getX(e),this._y=t.getY(e),this._z=t.getZ(e),this._w=t.getW(e),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}},dh=class dh{constructor(t=0,e=0,i=0){this.x=t,this.y=e,this.z=i}set(t,e,i){return i===void 0&&(i=this.z),this.x=t,this.y=e,this.z=i,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;default:throw new Error("THREE.Vector3: index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("THREE.Vector3: index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,e){return this.x=t.x*e.x,this.y=t.y*e.y,this.z=t.z*e.z,this}applyEuler(t){return this.applyQuaternion(bu.setFromEuler(t))}applyAxisAngle(t,e){return this.applyQuaternion(bu.setFromAxisAngle(t,e))}applyMatrix3(t){let e=this.x,i=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[3]*i+r[6]*s,this.y=r[1]*e+r[4]*i+r[7]*s,this.z=r[2]*e+r[5]*i+r[8]*s,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){let e=this.x,i=this.y,s=this.z,r=t.elements,a=1/(r[3]*e+r[7]*i+r[11]*s+r[15]);return this.x=(r[0]*e+r[4]*i+r[8]*s+r[12])*a,this.y=(r[1]*e+r[5]*i+r[9]*s+r[13])*a,this.z=(r[2]*e+r[6]*i+r[10]*s+r[14])*a,this}applyQuaternion(t){let e=this.x,i=this.y,s=this.z,r=t.x,a=t.y,o=t.z,l=t.w,c=2*(a*s-o*i),u=2*(o*e-r*s),d=2*(r*i-a*e);return this.x=e+l*c+a*d-o*u,this.y=i+l*u+o*c-r*d,this.z=s+l*d+r*u-a*c,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){let e=this.x,i=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[4]*i+r[8]*s,this.y=r[1]*e+r[5]*i+r[9]*s,this.z=r[2]*e+r[6]*i+r[10]*s,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,e){return this.x=se(this.x,t.x,e.x),this.y=se(this.y,t.y,e.y),this.z=se(this.z,t.z,e.z),this}clampScalar(t,e){return this.x=se(this.x,t,e),this.y=se(this.y,t,e),this.z=se(this.z,t,e),this}clampLength(t,e){let i=this.length();return this.divideScalar(i||1).multiplyScalar(se(i,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this}lerpVectors(t,e,i){return this.x=t.x+(e.x-t.x)*i,this.y=t.y+(e.y-t.y)*i,this.z=t.z+(e.z-t.z)*i,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,e){let i=t.x,s=t.y,r=t.z,a=e.x,o=e.y,l=e.z;return this.x=s*l-r*o,this.y=r*a-i*l,this.z=i*o-s*a,this}projectOnVector(t){let e=t.lengthSq();if(e===0)return this.set(0,0,0);let i=t.dot(this)/e;return this.copy(t).multiplyScalar(i)}projectOnPlane(t){return Jl.copy(this).projectOnVector(t),this.sub(Jl)}reflect(t){return this.sub(Jl.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){let e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;let i=this.dot(t)/e;return Math.acos(se(i,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){let e=this.x-t.x,i=this.y-t.y,s=this.z-t.z;return e*e+i*i+s*s}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,e,i){let s=Math.sin(e)*t;return this.x=s*Math.sin(i),this.y=Math.cos(e)*t,this.z=s*Math.cos(i),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,e,i){return this.x=t*Math.sin(e),this.y=i,this.z=t*Math.cos(e),this}setFromMatrixPosition(t){let e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this}setFromMatrixScale(t){let e=this.setFromMatrixColumn(t,0).length(),i=this.setFromMatrixColumn(t,1).length(),s=this.setFromMatrixColumn(t,2).length();return this.x=e,this.y=i,this.z=s,this}setFromMatrixColumn(t,e){return this.fromArray(t.elements,e*4)}setFromMatrix3Column(t,e){return this.fromArray(t.elements,e*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let t=Math.random()*Math.PI*2,e=Math.random()*2-1,i=Math.sqrt(1-e*e);return this.x=i*Math.cos(t),this.y=e,this.z=i*Math.sin(t),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}};dh.prototype.isVector3=!0;var J=dh,Jl=new J,bu=new Gn,fh=class fh{constructor(t,e,i,s,r,a,o,l,c){this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,e,i,s,r,a,o,l,c)}set(t,e,i,s,r,a,o,l,c){let u=this.elements;return u[0]=t,u[1]=s,u[2]=o,u[3]=e,u[4]=r,u[5]=l,u[6]=i,u[7]=a,u[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){let e=this.elements,i=t.elements;return e[0]=i[0],e[1]=i[1],e[2]=i[2],e[3]=i[3],e[4]=i[4],e[5]=i[5],e[6]=i[6],e[7]=i[7],e[8]=i[8],this}extractBasis(t,e,i){return t.setFromMatrix3Column(this,0),e.setFromMatrix3Column(this,1),i.setFromMatrix3Column(this,2),this}setFromMatrix4(t){let e=t.elements;return this.set(e[0],e[4],e[8],e[1],e[5],e[9],e[2],e[6],e[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){let i=t.elements,s=e.elements,r=this.elements,a=i[0],o=i[3],l=i[6],c=i[1],u=i[4],d=i[7],h=i[2],f=i[5],p=i[8],T=s[0],x=s[3],g=s[6],w=s[1],_=s[4],v=s[7],R=s[2],N=s[5],m=s[8];return r[0]=a*T+o*w+l*R,r[3]=a*x+o*_+l*N,r[6]=a*g+o*v+l*m,r[1]=c*T+u*w+d*R,r[4]=c*x+u*_+d*N,r[7]=c*g+u*v+d*m,r[2]=h*T+f*w+p*R,r[5]=h*x+f*_+p*N,r[8]=h*g+f*v+p*m,this}multiplyScalar(t){let e=this.elements;return e[0]*=t,e[3]*=t,e[6]*=t,e[1]*=t,e[4]*=t,e[7]*=t,e[2]*=t,e[5]*=t,e[8]*=t,this}determinant(){let t=this.elements,e=t[0],i=t[1],s=t[2],r=t[3],a=t[4],o=t[5],l=t[6],c=t[7],u=t[8];return e*a*u-e*o*c-i*r*u+i*o*l+s*r*c-s*a*l}invert(){let t=this.elements,e=t[0],i=t[1],s=t[2],r=t[3],a=t[4],o=t[5],l=t[6],c=t[7],u=t[8],d=u*a-o*c,h=o*l-u*r,f=c*r-a*l,p=e*d+i*h+s*f;if(p===0)return this.set(0,0,0,0,0,0,0,0,0);let T=1/p;return t[0]=d*T,t[1]=(s*c-u*i)*T,t[2]=(o*i-s*a)*T,t[3]=h*T,t[4]=(u*e-s*l)*T,t[5]=(s*r-o*e)*T,t[6]=f*T,t[7]=(i*l-c*e)*T,t[8]=(a*e-i*r)*T,this}transpose(){let t,e=this.elements;return t=e[1],e[1]=e[3],e[3]=t,t=e[2],e[2]=e[6],e[6]=t,t=e[5],e[5]=e[7],e[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){let e=this.elements;return t[0]=e[0],t[1]=e[3],t[2]=e[6],t[3]=e[1],t[4]=e[4],t[5]=e[7],t[6]=e[2],t[7]=e[5],t[8]=e[8],this}setUvTransform(t,e,i,s,r,a,o){let l=Math.cos(r),c=Math.sin(r);return this.set(i*l,i*c,-i*(l*a+c*o)+a+t,-s*c,s*l,-s*(-c*a+l*o)+o+e,0,0,1),this}scale(t,e){return Gi("Matrix3: .scale() is deprecated. Use .makeScale() instead."),this.premultiply(Ql.makeScale(t,e)),this}rotate(t){return Gi("Matrix3: .rotate() is deprecated. Use .makeRotation() instead."),this.premultiply(Ql.makeRotation(-t)),this}translate(t,e){return Gi("Matrix3: .translate() is deprecated. Use .makeTranslation() instead."),this.premultiply(Ql.makeTranslation(t,e)),this}makeTranslation(t,e){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,e,0,0,1),this}makeRotation(t){let e=Math.cos(t),i=Math.sin(t);return this.set(e,-i,0,i,e,0,0,0,1),this}makeScale(t,e){return this.set(t,0,0,0,e,0,0,0,1),this}equals(t){let e=this.elements,i=t.elements;for(let s=0;s<9;s++)if(e[s]!==i[s])return!1;return!0}fromArray(t,e=0){for(let i=0;i<9;i++)this.elements[i]=t[i+e];return this}toArray(t=[],e=0){let i=this.elements;return t[e]=i[0],t[e+1]=i[1],t[e+2]=i[2],t[e+3]=i[3],t[e+4]=i[4],t[e+5]=i[5],t[e+6]=i[6],t[e+7]=i[7],t[e+8]=i[8],t}clone(){return new this.constructor().fromArray(this.elements)}};fh.prototype.isMatrix3=!0;var Zt=fh,Ql=new Zt,wu=new Zt().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Tu=new Zt().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function Cp(){let n={enabled:!0,workingColorSpace:or,spaces:{},convert:function(s,r,a){return this.enabled===!1||r===a||!r||!a||(this.spaces[r].transfer===fe&&(s.r=ti(s.r),s.g=ti(s.g),s.b=ti(s.b)),this.spaces[r].primaries!==this.spaces[a].primaries&&(s.applyMatrix3(this.spaces[r].toXYZ),s.applyMatrix3(this.spaces[a].fromXYZ)),this.spaces[a].transfer===fe&&(s.r=_s(s.r),s.g=_s(s.g),s.b=_s(s.b))),s},workingToColorSpace:function(s,r){return this.convert(s,this.workingColorSpace,r)},colorSpaceToWorking:function(s,r){return this.convert(s,r,this.workingColorSpace)},getPrimaries:function(s){return this.spaces[s].primaries},getTransfer:function(s){return s===ai?lr:this.spaces[s].transfer},getToneMappingMode:function(s){return this.spaces[s].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(s,r=this.workingColorSpace){return s.fromArray(this.spaces[r].luminanceCoefficients)},define:function(s){Object.assign(this.spaces,s)},_getMatrix:function(s,r,a){return s.copy(this.spaces[a].fromXYZ).multiply(this.spaces[r].toXYZ)},_getDrawingBufferColorSpace:function(s){return this.spaces[s].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(s=this.workingColorSpace){return this.spaces[s].workingColorSpaceConfig.unpackColorSpace}},t=[.64,.33,.3,.6,.15,.06],e=[.2126,.7152,.0722],i=[.3127,.329];return n.define({[or]:{primaries:t,whitePoint:i,transfer:lr,toXYZ:wu,fromXYZ:Tu,luminanceCoefficients:e,workingColorSpaceConfig:{unpackColorSpace:qe},outputColorSpaceConfig:{drawingBufferColorSpace:qe}},[qe]:{primaries:t,whitePoint:i,transfer:fe,toXYZ:wu,fromXYZ:Tu,luminanceCoefficients:e,outputColorSpaceConfig:{drawingBufferColorSpace:qe}}}),n}var ce=Cp();function ti(n){return n<.04045?n*.0773993808:Math.pow(n*.9478672986+.0521327014,2.4)}function _s(n){return n<.0031308?n*12.92:1.055*Math.pow(n,.41666)-.055}var rs,Ua=class{static getDataURL(t,e="image/png"){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement>"u")return t.src;let i;if(t instanceof HTMLCanvasElement)i=t;else{rs===void 0&&(rs=cr("canvas")),rs.width=t.width,rs.height=t.height;let s=rs.getContext("2d");t instanceof ImageData?s.putImageData(t,0,0):s.drawImage(t,0,0,t.width,t.height),i=rs}return i.toDataURL(e)}static sRGBToLinear(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap){let e=cr("canvas");e.width=t.width,e.height=t.height;let i=e.getContext("2d");i.drawImage(t,0,0,t.width,t.height);let s=i.getImageData(0,0,t.width,t.height),r=s.data;for(let a=0;a<r.length;a++)r[a]=ti(r[a]/255)*255;return i.putImageData(s,0,0),e}else if(t.data){let e=t.data.slice(0);for(let i=0;i<e.length;i++)e instanceof Uint8Array||e instanceof Uint8ClampedArray?e[i]=Math.floor(ti(e[i]/255)*255):e[i]=ti(e[i]);return{data:e,width:t.width,height:t.height}}else return Xt("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}},Rp=0,Ss=class{constructor(t=null){this.isTextureSource=!0,Object.defineProperty(this,"id",{value:Rp++}),this.uuid=Fs(),this.data=t,this.dataReady=!0,this.version=0}getSize(t){let e=this.data;return typeof HTMLVideoElement<"u"&&e instanceof HTMLVideoElement?t.set(e.videoWidth,e.videoHeight,0):typeof VideoFrame<"u"&&e instanceof VideoFrame?t.set(e.displayWidth,e.displayHeight,0):e!==null?t.set(e.width||0,e.height||0,e.depth||0):t.set(0,0,0),t}set needsUpdate(t){t===!0&&this.version++}toJSON(t){let e=t===void 0||typeof t=="string";if(!e&&t.images[this.uuid]!==void 0)return t.images[this.uuid];let i={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let a=0,o=s.length;a<o;a++)s[a].isDataTexture?r.push(jl(s[a].image)):r.push(jl(s[a]))}else r=jl(s);i.url=r}return e||(t.images[this.uuid]=i),i}};function jl(n){return typeof HTMLImageElement<"u"&&n instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&n instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&n instanceof ImageBitmap?Ua.getDataURL(n):n.data?{data:Array.from(n.data),width:n.width,height:n.height,type:n.data.constructor.name}:(Xt("Texture: Unable to serialize Texture."),{})}var Ip=0,tc=new J,je=class n extends zn{constructor(t=n.DEFAULT_IMAGE,e=n.DEFAULT_MAPPING,i=Bn,s=Bn,r=Qe,a=si,o=Dn,l=on,c=n.DEFAULT_ANISOTROPY,u=ai){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Ip++}),this.uuid=Fs(),this.name="",this.source=new Ss(t),this.mipmaps=[],this.mapping=e,this.channel=0,this.wrapS=i,this.wrapT=s,this.magFilter=r,this.minFilter=a,this.anisotropy=c,this.format=o,this.internalFormat=null,this.type=l,this.offset=new Ct(0,0),this.repeat=new Ct(1,1),this.center=new Ct(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Zt,this.generateMipmaps=!0,this.mipmapsAutoUpdate=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=u,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(t&&t.depth&&t.depth>1),this.pmremVersion=0,this.isPMREMTexture=!1,this.normalized=!1}get width(){return this.source.getSize(tc).x}get height(){return this.source.getSize(tc).y}get depth(){return this.source.getSize(tc).z}get image(){return this.source.data}set image(t){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.normalized=t.normalized,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.mipmapsAutoUpdate=t.mipmapsAutoUpdate,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.renderTarget=t.renderTarget,this.isRenderTargetTexture=t.isRenderTargetTexture,this.isPMREMTexture=t.isPMREMTexture,this.isArrayTexture=t.isArrayTexture,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}setValues(t){for(let e in t){let i=t[e];if(i===void 0){Xt(`Texture.setValues(): parameter '${e}' has value of undefined.`);continue}let s=this[e];if(s===void 0){Xt(`Texture.setValues(): property '${e}' does not exist.`);continue}s&&i&&s.isVector2&&i.isVector2||s&&i&&s.isVector3&&i.isVector3||s&&i&&s.isMatrix3&&i.isMatrix3?s.copy(i):this[e]=i}}toJSON(t){let e=t===void 0||typeof t=="string";if(!e&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];let i={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,mipmapsAutoUpdate:this.mipmapsAutoUpdate,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(i.userData=this.userData),e||(t.textures[this.uuid]=i),i}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==Xc)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case Vi:t.x=t.x-Math.floor(t.x);break;case Bn:t.x=t.x<0?0:1;break;case La:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case Vi:t.y=t.y-Math.floor(t.y);break;case Bn:t.y=t.y<0?0:1;break;case La:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(t){t===!0&&this.pmremVersion++}};je.DEFAULT_IMAGE=null;je.DEFAULT_MAPPING=Xc;je.DEFAULT_ANISOTROPY=1;var ph=class ph{constructor(t=0,e=0,i=0,s=1){this.x=t,this.y=e,this.z=i,this.w=s}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,e,i,s){return this.x=t,this.y=e,this.z=i,this.w=s,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;case 3:this.w=e;break;default:throw new Error("THREE.Vector4: index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("THREE.Vector4: index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this.w=t.w+e.w,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this.w+=t.w*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this.w=t.w-e.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){let e=this.x,i=this.y,s=this.z,r=this.w,a=t.elements;return this.x=a[0]*e+a[4]*i+a[8]*s+a[12]*r,this.y=a[1]*e+a[5]*i+a[9]*s+a[13]*r,this.z=a[2]*e+a[6]*i+a[10]*s+a[14]*r,this.w=a[3]*e+a[7]*i+a[11]*s+a[15]*r,this}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this.w/=t.w,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);let e=Math.sqrt(1-t.w*t.w);return e<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/e,this.y=t.y/e,this.z=t.z/e),this}setAxisAngleFromRotationMatrix(t){let e,i,s,r,l=t.elements,c=l[0],u=l[4],d=l[8],h=l[1],f=l[5],p=l[9],T=l[2],x=l[6],g=l[10];if(Math.abs(u-h)<.01&&Math.abs(d-T)<.01&&Math.abs(p-x)<.01){if(Math.abs(u+h)<.1&&Math.abs(d+T)<.1&&Math.abs(p+x)<.1&&Math.abs(c+f+g-3)<.1)return this.set(1,0,0,0),this;e=Math.PI;let _=(c+1)/2,v=(f+1)/2,R=(g+1)/2,N=(u+h)/4,m=(d+T)/4,M=(p+x)/4;return _>v&&_>R?_<.01?(i=0,s=.707106781,r=.707106781):(i=Math.sqrt(_),s=N/i,r=m/i):v>R?v<.01?(i=.707106781,s=0,r=.707106781):(s=Math.sqrt(v),i=N/s,r=M/s):R<.01?(i=.707106781,s=.707106781,r=0):(r=Math.sqrt(R),i=m/r,s=M/r),this.set(i,s,r,e),this}let w=Math.sqrt((x-p)*(x-p)+(d-T)*(d-T)+(h-u)*(h-u));return Math.abs(w)<.001&&(w=1),this.x=(x-p)/w,this.y=(d-T)/w,this.z=(h-u)/w,this.w=Math.acos((c+f+g-1)/2),this}setFromMatrixPosition(t){let e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this.w=e[15],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,e){return this.x=se(this.x,t.x,e.x),this.y=se(this.y,t.y,e.y),this.z=se(this.z,t.z,e.z),this.w=se(this.w,t.w,e.w),this}clampScalar(t,e){return this.x=se(this.x,t,e),this.y=se(this.y,t,e),this.z=se(this.z,t,e),this.w=se(this.w,t,e),this}clampLength(t,e){let i=this.length();return this.divideScalar(i||1).multiplyScalar(se(i,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this.w+=(t.w-this.w)*e,this}lerpVectors(t,e,i){return this.x=t.x+(e.x-t.x)*i,this.y=t.y+(e.y-t.y)*i,this.z=t.z+(e.z-t.z)*i,this.w=t.w+(e.w-t.w)*i,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this.w=t[e+3],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t[e+3]=this.w,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this.w=t.getW(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}};ph.prototype.isVector4=!0;var Me=ph,Fa=class extends zn{constructor(t=1,e=1,i={}){super(),i=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Qe,depthBuffer:!0,stencilBuffer:!1,resolveColorBuffer:!0,resolveDepthBuffer:!0,resolveStencilBuffer:!0,storeMultisampledColorBuffer:!0,storeMultisampledDepthBuffer:!0,storeMultisampledStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1,useArrayDepthTexture:!1},i),this.isRenderTarget=!0,this.width=t,this.height=e,this.depth=i.depth,this.scissor=new Me(0,0,t,e),this.scissorTest=!1,this.viewport=new Me(0,0,t,e),this.textures=[];let s=i.count;for(let r=0;r<s;r++)this.textures[r]=new je({width:t,height:e,depth:i.depth}),this.textures[r].isRenderTargetTexture=!0,this.textures[r].renderTarget=this;this._setTextureOptions(i),this.depthBuffer=i.depthBuffer,this.stencilBuffer=i.stencilBuffer,this.resolveColorBuffer=i.resolveColorBuffer,this.resolveDepthBuffer=i.resolveDepthBuffer,this.resolveStencilBuffer=i.resolveStencilBuffer,this.storeMultisampledColorBuffer=i.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=i.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=i.storeMultisampledStencilBuffer,this._depthTexture=null,this.depthTexture=i.depthTexture,this.samples=i.samples,this.multiview=i.multiview,this.useArrayDepthTexture=i.useArrayDepthTexture}_setTextureOptions(t={}){let e={minFilter:Qe,generateMipmaps:!1,flipY:!1,internalFormat:null};t.mapping!==void 0&&(e.mapping=t.mapping),t.wrapS!==void 0&&(e.wrapS=t.wrapS),t.wrapT!==void 0&&(e.wrapT=t.wrapT),t.wrapR!==void 0&&(e.wrapR=t.wrapR),t.magFilter!==void 0&&(e.magFilter=t.magFilter),t.minFilter!==void 0&&(e.minFilter=t.minFilter),t.format!==void 0&&(e.format=t.format),t.type!==void 0&&(e.type=t.type),t.anisotropy!==void 0&&(e.anisotropy=t.anisotropy),t.colorSpace!==void 0&&(e.colorSpace=t.colorSpace),t.flipY!==void 0&&(e.flipY=t.flipY),t.generateMipmaps!==void 0&&(e.generateMipmaps=t.generateMipmaps),t.mipmapsAutoUpdate!==void 0&&(e.mipmapsAutoUpdate=t.mipmapsAutoUpdate),t.internalFormat!==void 0&&(e.internalFormat=t.internalFormat);for(let i=0;i<this.textures.length;i++)this.textures[i].setValues(e)}get texture(){return this.textures[0]}set texture(t){this.textures[0]=t}set depthTexture(t){this._depthTexture!==null&&this._depthTexture.renderTarget===this&&(this._depthTexture.renderTarget=null),t!==null&&t.renderTarget===null&&(t.renderTarget=this),this._depthTexture=t}get depthTexture(){return this._depthTexture}setSize(t,e,i=1){if(this.width!==t||this.height!==e||this.depth!==i){this.width=t,this.height=e,this.depth=i;for(let s=0,r=this.textures.length;s<r;s++)this.textures[s].image.width=t,this.textures[s].image.height=e,this.textures[s].image.depth=i,this.textures[s].isData3DTexture!==!0&&(this.textures[s].isArrayTexture=this.textures[s].image.depth>1);this.dispose()}this.viewport.set(0,0,t,e),this.scissor.set(0,0,t,e)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.textures.length=0;for(let e=0,i=t.textures.length;e<i;e++){this.textures[e]=t.textures[e].clone(),this.textures[e].isRenderTargetTexture=!0,this.textures[e].renderTarget=this;let s=Object.assign({},t.textures[e].image);this.textures[e].source=new Ss(s)}if(this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,this.resolveColorBuffer=t.resolveColorBuffer,this.resolveDepthBuffer=t.resolveDepthBuffer,this.resolveStencilBuffer=t.resolveStencilBuffer,this.storeMultisampledColorBuffer=t.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=t.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=t.storeMultisampledStencilBuffer,t.depthTexture!==null)if(t.depthTexture.renderTarget===t){let e=t.depthTexture.clone();e.renderTarget=null,this.depthTexture=e}else this.depthTexture=t.depthTexture;else this.depthTexture=null;return this.samples=t.samples,this.multiview=t.multiview,this.useArrayDepthTexture=t.useArrayDepthTexture,this}dispose(){this.dispatchEvent({type:"dispose"})}},mn=class extends Fa{constructor(t=1,e=1,i={}){super(t,e,i),this.isWebGLRenderTarget=!0}},hr=class extends je{constructor(t=null,e=1,i=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:e,height:i,depth:s},this.magFilter=Oe,this.minFilter=Oe,this.wrapR=Bn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}copy(t){return super.copy(t),this.wrapR=t.wrapR,this}addLayerUpdate(t){this.layerUpdates.add(t)}clearLayerUpdates(){this.layerUpdates.clear()}};var Oa=class extends je{constructor(t=null,e=1,i=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:e,height:i,depth:s},this.magFilter=Oe,this.minFilter=Oe,this.wrapR=Bn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}copy(t){return super.copy(t),this.wrapR=t.wrapR,this}};var oo=class oo{constructor(t,e,i,s,r,a,o,l,c,u,d,h,f,p,T,x){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,e,i,s,r,a,o,l,c,u,d,h,f,p,T,x)}set(t,e,i,s,r,a,o,l,c,u,d,h,f,p,T,x){let g=this.elements;return g[0]=t,g[4]=e,g[8]=i,g[12]=s,g[1]=r,g[5]=a,g[9]=o,g[13]=l,g[2]=c,g[6]=u,g[10]=d,g[14]=h,g[3]=f,g[7]=p,g[11]=T,g[15]=x,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new oo().fromArray(this.elements)}copy(t){let e=this.elements,i=t.elements;return e[0]=i[0],e[1]=i[1],e[2]=i[2],e[3]=i[3],e[4]=i[4],e[5]=i[5],e[6]=i[6],e[7]=i[7],e[8]=i[8],e[9]=i[9],e[10]=i[10],e[11]=i[11],e[12]=i[12],e[13]=i[13],e[14]=i[14],e[15]=i[15],this}copyPosition(t){let e=this.elements,i=t.elements;return e[12]=i[12],e[13]=i[13],e[14]=i[14],this}setFromMatrix3(t){let e=t.elements;return this.set(e[0],e[3],e[6],0,e[1],e[4],e[7],0,e[2],e[5],e[8],0,0,0,0,1),this}extractBasis(t,e,i){return this.determinantAffine()===0?(t.set(1,0,0),e.set(0,1,0),i.set(0,0,1),this):(t.setFromMatrixColumn(this,0),e.setFromMatrixColumn(this,1),i.setFromMatrixColumn(this,2),this)}makeBasis(t,e,i){return this.set(t.x,e.x,i.x,0,t.y,e.y,i.y,0,t.z,e.z,i.z,0,0,0,0,1),this}extractRotation(t){if(t.determinantAffine()===0)return this.identity();let e=this.elements,i=t.elements,s=1/as.setFromMatrixColumn(t,0).length(),r=1/as.setFromMatrixColumn(t,1).length(),a=1/as.setFromMatrixColumn(t,2).length();return e[0]=i[0]*s,e[1]=i[1]*s,e[2]=i[2]*s,e[3]=0,e[4]=i[4]*r,e[5]=i[5]*r,e[6]=i[6]*r,e[7]=0,e[8]=i[8]*a,e[9]=i[9]*a,e[10]=i[10]*a,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromEuler(t){let e=this.elements,i=t.x,s=t.y,r=t.z,a=Math.cos(i),o=Math.sin(i),l=Math.cos(s),c=Math.sin(s),u=Math.cos(r),d=Math.sin(r);if(t.order==="XYZ"){let h=a*u,f=a*d,p=o*u,T=o*d;e[0]=l*u,e[4]=-l*d,e[8]=c,e[1]=f+p*c,e[5]=h-T*c,e[9]=-o*l,e[2]=T-h*c,e[6]=p+f*c,e[10]=a*l}else if(t.order==="YXZ"){let h=l*u,f=l*d,p=c*u,T=c*d;e[0]=h+T*o,e[4]=p*o-f,e[8]=a*c,e[1]=a*d,e[5]=a*u,e[9]=-o,e[2]=f*o-p,e[6]=T+h*o,e[10]=a*l}else if(t.order==="ZXY"){let h=l*u,f=l*d,p=c*u,T=c*d;e[0]=h-T*o,e[4]=-a*d,e[8]=p+f*o,e[1]=f+p*o,e[5]=a*u,e[9]=T-h*o,e[2]=-a*c,e[6]=o,e[10]=a*l}else if(t.order==="ZYX"){let h=a*u,f=a*d,p=o*u,T=o*d;e[0]=l*u,e[4]=p*c-f,e[8]=h*c+T,e[1]=l*d,e[5]=T*c+h,e[9]=f*c-p,e[2]=-c,e[6]=o*l,e[10]=a*l}else if(t.order==="YZX"){let h=a*l,f=a*c,p=o*l,T=o*c;e[0]=l*u,e[4]=T-h*d,e[8]=p*d+f,e[1]=d,e[5]=a*u,e[9]=-o*u,e[2]=-c*u,e[6]=f*d+p,e[10]=h-T*d}else if(t.order==="XZY"){let h=a*l,f=a*c,p=o*l,T=o*c;e[0]=l*u,e[4]=-d,e[8]=c*u,e[1]=h*d+T,e[5]=a*u,e[9]=f*d-p,e[2]=p*d-f,e[6]=o*u,e[10]=T*d+h}return e[3]=0,e[7]=0,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromQuaternion(t){return this.compose(Pp,t,Lp)}lookAt(t,e,i){let s=this.elements;return dn.subVectors(t,e),dn.lengthSq()===0&&(dn.z=1),dn.normalize(),ui.crossVectors(i,dn),ui.lengthSq()===0&&(Math.abs(i.z)===1?dn.x+=1e-4:dn.z+=1e-4,dn.normalize(),ui.crossVectors(i,dn)),ui.normalize(),ea.crossVectors(dn,ui),s[0]=ui.x,s[4]=ea.x,s[8]=dn.x,s[1]=ui.y,s[5]=ea.y,s[9]=dn.y,s[2]=ui.z,s[6]=ea.z,s[10]=dn.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){let i=t.elements,s=e.elements,r=this.elements,a=i[0],o=i[4],l=i[8],c=i[12],u=i[1],d=i[5],h=i[9],f=i[13],p=i[2],T=i[6],x=i[10],g=i[14],w=i[3],_=i[7],v=i[11],R=i[15],N=s[0],m=s[4],M=s[8],L=s[12],P=s[1],B=s[5],C=s[9],O=s[13],D=s[2],E=s[6],z=s[10],b=s[14],I=s[3],y=s[7],F=s[11],S=s[15];return r[0]=a*N+o*P+l*D+c*I,r[4]=a*m+o*B+l*E+c*y,r[8]=a*M+o*C+l*z+c*F,r[12]=a*L+o*O+l*b+c*S,r[1]=u*N+d*P+h*D+f*I,r[5]=u*m+d*B+h*E+f*y,r[9]=u*M+d*C+h*z+f*F,r[13]=u*L+d*O+h*b+f*S,r[2]=p*N+T*P+x*D+g*I,r[6]=p*m+T*B+x*E+g*y,r[10]=p*M+T*C+x*z+g*F,r[14]=p*L+T*O+x*b+g*S,r[3]=w*N+_*P+v*D+R*I,r[7]=w*m+_*B+v*E+R*y,r[11]=w*M+_*C+v*z+R*F,r[15]=w*L+_*O+v*b+R*S,this}multiplyScalar(t){let e=this.elements;return e[0]*=t,e[4]*=t,e[8]*=t,e[12]*=t,e[1]*=t,e[5]*=t,e[9]*=t,e[13]*=t,e[2]*=t,e[6]*=t,e[10]*=t,e[14]*=t,e[3]*=t,e[7]*=t,e[11]*=t,e[15]*=t,this}determinant(){let t=this.elements,e=t[0],i=t[4],s=t[8],r=t[12],a=t[1],o=t[5],l=t[9],c=t[13],u=t[2],d=t[6],h=t[10],f=t[14],p=t[3],T=t[7],x=t[11],g=t[15],w=l*f-c*h,_=o*f-c*d,v=o*h-l*d,R=a*f-c*u,N=a*h-l*u,m=a*d-o*u;return e*(T*w-x*_+g*v)-i*(p*w-x*R+g*N)+s*(p*_-T*R+g*m)-r*(p*v-T*N+x*m)}determinantAffine(){let t=this.elements,e=t[0],i=t[4],s=t[8],r=t[1],a=t[5],o=t[9],l=t[2],c=t[6],u=t[10];return e*(a*u-o*c)-i*(r*u-o*l)+s*(r*c-a*l)}transpose(){let t=this.elements,e;return e=t[1],t[1]=t[4],t[4]=e,e=t[2],t[2]=t[8],t[8]=e,e=t[6],t[6]=t[9],t[9]=e,e=t[3],t[3]=t[12],t[12]=e,e=t[7],t[7]=t[13],t[13]=e,e=t[11],t[11]=t[14],t[14]=e,this}setPosition(t,e,i){let s=this.elements;return t.isVector3?(s[12]=t.x,s[13]=t.y,s[14]=t.z):(s[12]=t,s[13]=e,s[14]=i),this}invert(){let t=this.elements,e=t[0],i=t[1],s=t[2],r=t[3],a=t[4],o=t[5],l=t[6],c=t[7],u=t[8],d=t[9],h=t[10],f=t[11],p=t[12],T=t[13],x=t[14],g=t[15],w=e*o-i*a,_=e*l-s*a,v=e*c-r*a,R=i*l-s*o,N=i*c-r*o,m=s*c-r*l,M=u*T-d*p,L=u*x-h*p,P=u*g-f*p,B=d*x-h*T,C=d*g-f*T,O=h*g-f*x,D=w*O-_*C+v*B+R*P-N*L+m*M;if(D===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let E=1/D;return t[0]=(o*O-l*C+c*B)*E,t[1]=(s*C-i*O-r*B)*E,t[2]=(T*m-x*N+g*R)*E,t[3]=(h*N-d*m-f*R)*E,t[4]=(l*P-a*O-c*L)*E,t[5]=(e*O-s*P+r*L)*E,t[6]=(x*v-p*m-g*_)*E,t[7]=(u*m-h*v+f*_)*E,t[8]=(a*C-o*P+c*M)*E,t[9]=(i*P-e*C-r*M)*E,t[10]=(p*N-T*v+g*w)*E,t[11]=(d*v-u*N-f*w)*E,t[12]=(o*L-a*B-l*M)*E,t[13]=(e*B-i*L+s*M)*E,t[14]=(T*_-p*R-x*w)*E,t[15]=(u*R-d*_+h*w)*E,this}scale(t){let e=this.elements,i=t.x,s=t.y,r=t.z;return e[0]*=i,e[4]*=s,e[8]*=r,e[1]*=i,e[5]*=s,e[9]*=r,e[2]*=i,e[6]*=s,e[10]*=r,e[3]*=i,e[7]*=s,e[11]*=r,this}getMaxScaleOnAxis(){let t=this.elements,e=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],i=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],s=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(e,i,s))}makeTranslation(t,e,i){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,e,0,0,1,i,0,0,0,1),this}makeRotationX(t){let e=Math.cos(t),i=Math.sin(t);return this.set(1,0,0,0,0,e,-i,0,0,i,e,0,0,0,0,1),this}makeRotationY(t){let e=Math.cos(t),i=Math.sin(t);return this.set(e,0,i,0,0,1,0,0,-i,0,e,0,0,0,0,1),this}makeRotationZ(t){let e=Math.cos(t),i=Math.sin(t);return this.set(e,-i,0,0,i,e,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,e){let i=Math.cos(e),s=Math.sin(e),r=1-i,a=t.x,o=t.y,l=t.z,c=r*a,u=r*o;return this.set(c*a+i,c*o-s*l,c*l+s*o,0,c*o+s*l,u*o+i,u*l-s*a,0,c*l-s*o,u*l+s*a,r*l*l+i,0,0,0,0,1),this}makeScale(t,e,i){return this.set(t,0,0,0,0,e,0,0,0,0,i,0,0,0,0,1),this}makeShear(t,e,i,s,r,a){return this.set(1,i,r,0,t,1,a,0,e,s,1,0,0,0,0,1),this}compose(t,e,i){let s=this.elements,r=e._x,a=e._y,o=e._z,l=e._w,c=r+r,u=a+a,d=o+o,h=r*c,f=r*u,p=r*d,T=a*u,x=a*d,g=o*d,w=l*c,_=l*u,v=l*d,R=i.x,N=i.y,m=i.z;return s[0]=(1-(T+g))*R,s[1]=(f+v)*R,s[2]=(p-_)*R,s[3]=0,s[4]=(f-v)*N,s[5]=(1-(h+g))*N,s[6]=(x+w)*N,s[7]=0,s[8]=(p+_)*m,s[9]=(x-w)*m,s[10]=(1-(h+T))*m,s[11]=0,s[12]=t.x,s[13]=t.y,s[14]=t.z,s[15]=1,this}decompose(t,e,i){let s=this.elements;t.x=s[12],t.y=s[13],t.z=s[14];let r=this.determinantAffine();if(r===0)return i.set(1,1,1),e.identity(),this;let a=as.set(s[0],s[1],s[2]).length(),o=as.set(s[4],s[5],s[6]).length(),l=as.set(s[8],s[9],s[10]).length();r<0&&(a=-a),An.copy(this);let c=1/a,u=1/o,d=1/l;return An.elements[0]*=c,An.elements[1]*=c,An.elements[2]*=c,An.elements[4]*=u,An.elements[5]*=u,An.elements[6]*=u,An.elements[8]*=d,An.elements[9]*=d,An.elements[10]*=d,e.setFromRotationMatrix(An),i.x=a,i.y=o,i.z=l,this}makePerspective(t,e,i,s,r,a,o=Mn,l=!1){let c=this.elements,u=2*r/(e-t),d=2*r/(i-s),h=(e+t)/(e-t),f=(i+s)/(i-s),p,T;if(l)p=r/(a-r),T=a*r/(a-r);else if(o===Mn)p=-(a+r)/(a-r),T=-2*a*r/(a-r);else if(o===vs)p=-a/(a-r),T=-a*r/(a-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return c[0]=u,c[4]=0,c[8]=h,c[12]=0,c[1]=0,c[5]=d,c[9]=f,c[13]=0,c[2]=0,c[6]=0,c[10]=p,c[14]=T,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(t,e,i,s,r,a,o=Mn,l=!1){let c=this.elements,u=2/(e-t),d=2/(i-s),h=-(e+t)/(e-t),f=-(i+s)/(i-s),p,T;if(l)p=1/(a-r),T=a/(a-r);else if(o===Mn)p=-2/(a-r),T=-(a+r)/(a-r);else if(o===vs)p=-1/(a-r),T=-r/(a-r);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return c[0]=u,c[4]=0,c[8]=0,c[12]=h,c[1]=0,c[5]=d,c[9]=0,c[13]=f,c[2]=0,c[6]=0,c[10]=p,c[14]=T,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(t){let e=this.elements,i=t.elements;for(let s=0;s<16;s++)if(e[s]!==i[s])return!1;return!0}fromArray(t,e=0){for(let i=0;i<16;i++)this.elements[i]=t[i+e];return this}toArray(t=[],e=0){let i=this.elements;return t[e]=i[0],t[e+1]=i[1],t[e+2]=i[2],t[e+3]=i[3],t[e+4]=i[4],t[e+5]=i[5],t[e+6]=i[6],t[e+7]=i[7],t[e+8]=i[8],t[e+9]=i[9],t[e+10]=i[10],t[e+11]=i[11],t[e+12]=i[12],t[e+13]=i[13],t[e+14]=i[14],t[e+15]=i[15],t}};oo.prototype.isMatrix4=!0;var ye=oo,as=new J,An=new ye,Pp=new J(0,0,0),Lp=new J(1,1,1),ui=new J,ea=new J,dn=new J,Eu=new ye,Au=new Gn,ni=class n{constructor(t=0,e=0,i=0,s=n.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=e,this._z=i,this._order=s}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,e,i,s=this._order){return this._x=t,this._y=e,this._z=i,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,e=this._order,i=!0){let s=t.elements,r=s[0],a=s[4],o=s[8],l=s[1],c=s[5],u=s[9],d=s[2],h=s[6],f=s[10];switch(e){case"XYZ":this._y=Math.asin(se(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-u,f),this._z=Math.atan2(-a,r)):(this._x=Math.atan2(h,c),this._z=0);break;case"YXZ":this._x=Math.asin(-se(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(o,f),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-d,r),this._z=0);break;case"ZXY":this._x=Math.asin(se(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(-d,f),this._z=Math.atan2(-a,c)):(this._y=0,this._z=Math.atan2(l,r));break;case"ZYX":this._y=Math.asin(-se(d,-1,1)),Math.abs(d)<.9999999?(this._x=Math.atan2(h,f),this._z=Math.atan2(l,r)):(this._x=0,this._z=Math.atan2(-a,c));break;case"YZX":this._z=Math.asin(se(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-u,c),this._y=Math.atan2(-d,r)):(this._x=0,this._y=Math.atan2(o,f));break;case"XZY":this._z=Math.asin(-se(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(h,c),this._y=Math.atan2(o,r)):(this._x=Math.atan2(-u,f),this._y=0);break;default:Xt("Euler: .setFromRotationMatrix() encountered an unknown order: "+e)}return this._order=e,i===!0&&this._onChangeCallback(),this}setFromQuaternion(t,e,i){return Eu.makeRotationFromQuaternion(t),this.setFromRotationMatrix(Eu,e,i)}setFromVector3(t,e=this._order){return this.set(t.x,t.y,t.z,e)}reorder(t){return Au.setFromEuler(this),this.setFromQuaternion(Au,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}};ni.DEFAULT_ORDER="XYZ";var bs=class{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}},Np=0,Cu=new J,os=new Gn,Zn=new ye,na=new J,js=new J,Dp=new J,Up=new Gn,Ru=new J(1,0,0),Iu=new J(0,1,0),Pu=new J(0,0,1),Lu={type:"added"},Fp={type:"removed"},ls={type:"childadded",child:null},ec={type:"childremoved",child:null},tn=class n extends zn{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Np++}),this.uuid=Fs(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=n.DEFAULT_UP.clone();let t=new J,e=new ni,i=new Gn,s=new J(1,1,1);function r(){i.setFromEuler(e,!1)}function a(){e.setFromQuaternion(i,void 0,!1)}e._onChange(r),i._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:e},quaternion:{configurable:!0,enumerable:!0,value:i},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new ye},normalMatrix:{value:new Zt}}),this.matrix=new ye,this.matrixWorld=new ye,this.matrixAutoUpdate=n.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=n.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new bs,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale),this.pivot!==null&&this.position.copy(this.pivot).applyMatrix4(this.matrix).sub(this.pivot)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,e){this.quaternion.setFromAxisAngle(t,e)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,e){return os.setFromAxisAngle(t,e),this.quaternion.multiply(os),this}rotateOnWorldAxis(t,e){return os.setFromAxisAngle(t,e),this.quaternion.premultiply(os),this}rotateX(t){return this.rotateOnAxis(Ru,t)}rotateY(t){return this.rotateOnAxis(Iu,t)}rotateZ(t){return this.rotateOnAxis(Pu,t)}translateOnAxis(t,e){return Cu.copy(t).applyQuaternion(this.quaternion),this.position.add(Cu.multiplyScalar(e)),this}translateX(t){return this.translateOnAxis(Ru,t)}translateY(t){return this.translateOnAxis(Iu,t)}translateZ(t){return this.translateOnAxis(Pu,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(Zn.copy(this.matrixWorld).invert())}lookAt(t,e,i){t.isVector3?na.copy(t):na.set(t,e,i);let s=this.parent;this.updateWorldMatrix(!0,!1),js.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Zn.lookAt(js,na,this.up):Zn.lookAt(na,js,this.up),this.quaternion.setFromRotationMatrix(Zn),s&&(Zn.extractRotation(s.matrixWorld),os.setFromRotationMatrix(Zn),this.quaternion.premultiply(os.invert()))}add(t){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return t===this?(Yt("Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.removeFromParent(),t.parent=this,this.children.push(t),t.dispatchEvent(Lu),ls.child=t,this.dispatchEvent(ls),ls.child=null):Yt("Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.remove(arguments[i]);return this}let e=this.children.indexOf(t);return e!==-1&&(t.parent=null,this.children.splice(e,1),t.dispatchEvent(Fp),ec.child=t,this.dispatchEvent(ec),ec.child=null),this}removeFromParent(){let t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),Zn.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),Zn.multiply(t.parent.matrixWorld)),t.applyMatrix4(Zn),t.removeFromParent(),t.parent=this,this.children.push(t),t.updateWorldMatrix(!1,!0),t.dispatchEvent(Lu),ls.child=t,this.dispatchEvent(ls),ls.child=null,this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,e){if(this[t]===e)return this;for(let i=0,s=this.children.length;i<s;i++){let a=this.children[i].getObjectByProperty(t,e);if(a!==void 0)return a}}getObjectsByProperty(t,e,i=[]){this[t]===e&&i.push(this);let s=this.children;for(let r=0,a=s.length;r<a;r++)s[r].getObjectsByProperty(t,e,i);return i}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(js,t,Dp),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(js,Up,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);let e=this.matrixWorld.elements;return t.set(e[8],e[9],e[10]).normalize()}raycast(){}intersectsFrustum(){return!0}traverse(t){t(this);let e=this.children;for(let i=0,s=e.length;i<s;i++)e[i].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);let e=this.children;for(let i=0,s=e.length;i<s;i++)e[i].traverseVisible(t)}traverseAncestors(t){let e=this.parent;e!==null&&(t(e),e.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);let t=this.pivot;if(t!==null){let e=t.x,i=t.y,s=t.z,r=this.matrix.elements;r[12]+=e-r[0]*e-r[4]*i-r[8]*s,r[13]+=i-r[1]*e-r[5]*i-r[9]*s,r[14]+=s-r[2]*e-r[6]*i-r[10]*s}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,t=!0);let e=this.children;for(let i=0,s=e.length;i<s;i++)e[i].updateMatrixWorld(t)}updateWorldMatrix(t,e,i=!1){let s=this.parent;if(t===!0&&s!==null&&s.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||i)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,i=!0),e===!0){let r=this.children;for(let a=0,o=r.length;a<o;a++)r[a].updateWorldMatrix(!1,!0,i)}}toJSON(t){let e=t===void 0||typeof t=="string",i={};e&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},i.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});let s={};s.uuid=this.uuid,s.type=this.type,s.name=this.name,s.castShadow=this.castShadow,s.receiveShadow=this.receiveShadow,s.visible=this.visible,s.frustumCulled=this.frustumCulled,s.renderOrder=this.renderOrder,s.static=this.static,s.matrixAutoUpdate=this.matrixAutoUpdate,Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.pivot!==null&&(s.pivot=this.pivot.toArray()),this.morphTargetDictionary!==void 0&&(s.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(s.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.geometryInfo=this._geometryInfo.map(o=>({...o,boundingBox:o.boundingBox?o.boundingBox.toJSON():void 0,boundingSphere:o.boundingSphere?o.boundingSphere.toJSON():void 0})),s.instanceInfo=this._instanceInfo.map(o=>({...o})),s.availableInstanceIds=this._availableInstanceIds.slice(),s.availableGeometryIds=this._availableGeometryIds.slice(),s.nextIndexStart=this._nextIndexStart,s.nextVertexStart=this._nextVertexStart,s.geometryCount=this._geometryCount,s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.matricesTexture=this._matricesTexture.toJSON(t),s.indirectTexture=this._indirectTexture.toJSON(t),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(t)),this.boundingSphere!==null&&(s.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(s.boundingBox=this.boundingBox.toJSON()));function r(o,l){return o[l.uuid]===void 0&&(o[l.uuid]=l.toJSON(t)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(t.geometries,this.geometry);let o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){let l=o.shapes;if(Array.isArray(l))for(let c=0,u=l.length;c<u;c++){let d=l[c];r(t.shapes,d)}else r(t.shapes,l)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(t.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){let o=[];for(let l=0,c=this.material.length;l<c;l++)o.push(r(t.materials,this.material[l]));s.material=o}else s.material=r(t.materials,this.material);if(this.children.length>0){s.children=[];for(let o=0;o<this.children.length;o++)s.children.push(this.children[o].toJSON(t).object)}if(this.animations.length>0){s.animations=[];for(let o=0;o<this.animations.length;o++){let l=this.animations[o];s.animations.push(r(t.animations,l))}}if(e){let o=a(t.geometries),l=a(t.materials),c=a(t.textures),u=a(t.images),d=a(t.shapes),h=a(t.skeletons),f=a(t.animations),p=a(t.nodes);o.length>0&&(i.geometries=o),l.length>0&&(i.materials=l),c.length>0&&(i.textures=c),u.length>0&&(i.images=u),d.length>0&&(i.shapes=d),h.length>0&&(i.skeletons=h),f.length>0&&(i.animations=f),p.length>0&&(i.nodes=p)}return i.object=s,i;function a(o){let l=[];for(let c in o){let u=o[c];delete u.metadata,l.push(u)}return l}}clone(t){return new this.constructor().copy(this,t)}copy(t,e=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.pivot=t.pivot!==null?t.pivot.clone():null,this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.static=t.static,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),e===!0)for(let i=0;i<t.children.length;i++){let s=t.children[i];this.add(s.clone())}return this}dispose(){this.dispatchEvent({type:"dispose"})}};tn.DEFAULT_UP=new J(0,1,0);tn.DEFAULT_MATRIX_AUTO_UPDATE=!0;tn.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;var pn=class extends tn{constructor(){super(),this.isGroup=!0,this.type="Group"}},Op={type:"move"},ws=class{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new pn,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new pn,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new J,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new J),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new pn,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new J,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new J,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){let e=this._hand;if(e)for(let i of t.hand.values())this._getHandJoint(e,i)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,e,i){let s=null,r=null,a=null,o=this._targetRay,l=this._grip,c=this._hand;if(t&&e.session.visibilityState!=="visible-blurred"){if(c&&t.hand){a=!0;for(let T of t.hand.values()){let x=e.getJointPose(T,i),g=this._getHandJoint(c,T);x!==null&&(g.matrix.fromArray(x.transform.matrix),g.matrix.decompose(g.position,g.quaternion,g.scale),g.matrixWorldNeedsUpdate=!0,g.jointRadius=x.radius),g.visible=x!==null}let u=c.joints["index-finger-tip"],d=c.joints["thumb-tip"],h=u.position.distanceTo(d.position),f=.02,p=.005;c.inputState.pinching&&h>f+p?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!c.inputState.pinching&&h<=f-p&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else l!==null&&t.gripSpace&&(r=e.getPose(t.gripSpace,i),r!==null&&(l.matrix.fromArray(r.transform.matrix),l.matrix.decompose(l.position,l.quaternion,l.scale),l.matrixWorldNeedsUpdate=!0,r.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(r.linearVelocity)):l.hasLinearVelocity=!1,r.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(r.angularVelocity)):l.hasAngularVelocity=!1,l.eventsEnabled&&l.dispatchEvent({type:"gripUpdated",data:t,target:this})));o!==null&&(s=e.getPose(t.targetRaySpace,i),s===null&&r!==null&&(s=r),s!==null&&(o.matrix.fromArray(s.transform.matrix),o.matrix.decompose(o.position,o.quaternion,o.scale),o.matrixWorldNeedsUpdate=!0,s.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(s.linearVelocity)):o.hasLinearVelocity=!1,s.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(s.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(Op)))}return o!==null&&(o.visible=s!==null),l!==null&&(l.visible=r!==null),c!==null&&(c.visible=a!==null),this}_getHandJoint(t,e){if(t.joints[e.jointName]===void 0){let i=new pn;i.matrixAutoUpdate=!1,i.visible=!1,t.joints[e.jointName]=i,t.add(i)}return t.joints[e.jointName]}},Od={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},di={h:0,s:0,l:0},ia={h:0,s:0,l:0};function nc(n,t,e){return e<0&&(e+=1),e>1&&(e-=1),e<1/6?n+(t-n)*6*e:e<1/2?t:e<2/3?n+(t-n)*6*(2/3-e):n}var jt=class{constructor(t,e,i){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,e,i)}set(t,e,i){if(e===void 0&&i===void 0){let s=t;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(t,e,i);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,e=qe){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,ce.colorSpaceToWorking(this,e),this}setRGB(t,e,i,s=ce.workingColorSpace){return this.r=t,this.g=e,this.b=i,ce.colorSpaceToWorking(this,s),this}setHSL(t,e,i,s=ce.workingColorSpace){if(t=Tp(t,1),e=se(e,0,1),i=se(i,0,1),e===0)this.r=this.g=this.b=i;else{let r=i<=.5?i*(1+e):i+e-i*e,a=2*i-r;this.r=nc(a,r,t+1/3),this.g=nc(a,r,t),this.b=nc(a,r,t-1/3)}return ce.colorSpaceToWorking(this,s),this}setStyle(t,e=qe){function i(r){r!==void 0&&parseFloat(r)<1&&Xt("Color: Alpha component of "+t+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(t)){let r,a=s[1],o=s[2];switch(a){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d+(?:\.\d+)?|\.\d+)\s*)?$/.exec(o))return i(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,e);if(r=/^\s*(\d+(?:\.\d+)?|\.\d+)\%\s*,\s*(\d+(?:\.\d+)?|\.\d+)\%\s*,\s*(\d+(?:\.\d+)?|\.\d+)\%\s*(?:,\s*(\d+(?:\.\d+)?|\.\d+)\s*)?$/.exec(o))return i(r[4]),this.setRGB(Math.min(100,parseFloat(r[1]))/100,Math.min(100,parseFloat(r[2]))/100,Math.min(100,parseFloat(r[3]))/100,e);break;case"hsl":case"hsla":if(r=/^\s*([+-]?(?:\d+(?:\.\d+)?|\.\d+))\s*,\s*(\d+(?:\.\d+)?|\.\d+)\%\s*,\s*(\d+(?:\.\d+)?|\.\d+)\%\s*(?:,\s*(\d+(?:\.\d+)?|\.\d+)\s*)?$/.exec(o))return i(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,e);break;default:Xt("Color: Unknown color model "+t)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(t)){let r=s[1],a=r.length;if(a===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,e);if(a===6)return this.setHex(parseInt(r,16),e);Xt("Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,e);return this}setColorName(t,e=qe){let i=Od[t.toLowerCase()];return i!==void 0?this.setHex(i,e):Xt("Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=ti(t.r),this.g=ti(t.g),this.b=ti(t.b),this}copyLinearToSRGB(t){return this.r=_s(t.r),this.g=_s(t.g),this.b=_s(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=qe){return ce.workingToColorSpace(We.copy(this),t),Math.round(se(We.r*255,0,255))*65536+Math.round(se(We.g*255,0,255))*256+Math.round(se(We.b*255,0,255))}getHexString(t=qe){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,e=ce.workingColorSpace){ce.workingToColorSpace(We.copy(this),e);let i=We.r,s=We.g,r=We.b,a=Math.max(i,s,r),o=Math.min(i,s,r),l,c,u=(o+a)/2;if(o===a)l=0,c=0;else{let d=a-o;switch(c=u<=.5?d/(a+o):d/(2-a-o),a){case i:l=(s-r)/d+(s<r?6:0);break;case s:l=(r-i)/d+2;break;case r:l=(i-s)/d+4;break}l/=6}return t.h=l,t.s=c,t.l=u,t}getRGB(t,e=ce.workingColorSpace){return ce.workingToColorSpace(We.copy(this),e),t.r=We.r,t.g=We.g,t.b=We.b,t}getStyle(t=qe){ce.workingToColorSpace(We.copy(this),t);let e=We.r,i=We.g,s=We.b;return t!==qe?`color(${t} ${e.toFixed(3)} ${i.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(e*255)},${Math.round(i*255)},${Math.round(s*255)})`}offsetHSL(t,e,i){return this.getHSL(di),this.setHSL(di.h+t,di.s+e,di.l+i)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,e){return this.r=t.r+e.r,this.g=t.g+e.g,this.b=t.b+e.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,e){return this.r+=(t.r-this.r)*e,this.g+=(t.g-this.g)*e,this.b+=(t.b-this.b)*e,this}lerpColors(t,e,i){return this.r=t.r+(e.r-t.r)*i,this.g=t.g+(e.g-t.g)*i,this.b=t.b+(e.b-t.b)*i,this}lerpHSL(t,e){this.getHSL(di),t.getHSL(ia);let i=Kl(di.h,ia.h,e),s=Kl(di.s,ia.s,e),r=Kl(di.l,ia.l,e);return this.setHSL(i,s,r),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){let e=this.r,i=this.g,s=this.b,r=t.elements;return this.r=r[0]*e+r[3]*i+r[6]*s,this.g=r[1]*e+r[4]*i+r[7]*s,this.b=r[2]*e+r[5]*i+r[8]*s,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,e=0){return this.r=t[e],this.g=t[e+1],this.b=t[e+2],this}toArray(t=[],e=0){return t[e]=this.r,t[e+1]=this.g,t[e+2]=this.b,t}fromBufferAttribute(t,e){return this.r=t.getX(e),this.g=t.getY(e),this.b=t.getZ(e),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}},We=new jt;jt.NAMES=Od;var Ts=class extends tn{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new ni,this.environmentIntensity=1,this.environmentRotation=new ni,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,e){return super.copy(t,e),this.background=t.background!==null?t.background.clone():null,this.environment=t.environment!==null?t.environment.clone():null,this.fog=t.fog!==null?t.fog.clone():null,this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,this.backgroundRotation.copy(t.backgroundRotation),this.environmentIntensity=t.environmentIntensity,this.environmentRotation.copy(t.environmentRotation),this.overrideMaterial=t.overrideMaterial!==null?t.overrideMaterial.clone():null,this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){let e=super.toJSON(t);return this.fog!==null&&(e.object.fog=this.fog.toJSON()),e.object.backgroundBlurriness=this.backgroundBlurriness,e.object.backgroundIntensity=this.backgroundIntensity,e.object.backgroundRotation=this.backgroundRotation.toArray(),e.object.environmentIntensity=this.environmentIntensity,e.object.environmentRotation=this.environmentRotation.toArray(),e}},Cn=new J,Kn=new J,ic=new J,Jn=new J,cs=new J,hs=new J,Nu=new J,sc=new J,rc=new J,ac=new J,oc=new Me,lc=new Me,cc=new Me,gi=class n{constructor(t=new J,e=new J,i=new J){this.a=t,this.b=e,this.c=i}static getNormal(t,e,i,s){s.subVectors(i,e),Cn.subVectors(t,e),s.cross(Cn);let r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(t,e,i,s,r){Cn.subVectors(s,e),Kn.subVectors(i,e),ic.subVectors(t,e);let a=Cn.dot(Cn),o=Cn.dot(Kn),l=Cn.dot(ic),c=Kn.dot(Kn),u=Kn.dot(ic),d=a*c-o*o;if(d===0)return r.set(0,0,0),null;let h=1/d,f=(c*l-o*u)*h,p=(a*u-o*l)*h;return r.set(1-f-p,p,f)}static containsPoint(t,e,i,s){return this.getBarycoord(t,e,i,s,Jn)===null?!1:Jn.x>=0&&Jn.y>=0&&Jn.x+Jn.y<=1}static getInterpolation(t,e,i,s,r,a,o,l){return this.getBarycoord(t,e,i,s,Jn)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(r,Jn.x),l.addScaledVector(a,Jn.y),l.addScaledVector(o,Jn.z),l)}static getInterpolatedAttribute(t,e,i,s,r,a){return oc.setScalar(0),lc.setScalar(0),cc.setScalar(0),oc.fromBufferAttribute(t,e),lc.fromBufferAttribute(t,i),cc.fromBufferAttribute(t,s),a.setScalar(0),a.addScaledVector(oc,r.x),a.addScaledVector(lc,r.y),a.addScaledVector(cc,r.z),a}static isFrontFacing(t,e,i,s){return Cn.subVectors(i,e),Kn.subVectors(t,e),Cn.cross(Kn).dot(s)<0}set(t,e,i){return this.a.copy(t),this.b.copy(e),this.c.copy(i),this}setFromPointsAndIndices(t,e,i,s){return this.a.copy(t[e]),this.b.copy(t[i]),this.c.copy(t[s]),this}setFromAttributeAndIndices(t,e,i,s){return this.a.fromBufferAttribute(t,e),this.b.fromBufferAttribute(t,i),this.c.fromBufferAttribute(t,s),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return Cn.subVectors(this.c,this.b),Kn.subVectors(this.a,this.b),Cn.cross(Kn).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return n.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,e){return n.getBarycoord(t,this.a,this.b,this.c,e)}getInterpolation(t,e,i,s,r){return n.getInterpolation(t,this.a,this.b,this.c,e,i,s,r)}containsPoint(t){return n.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return n.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,e){let i=this.a,s=this.b,r=this.c,a,o;cs.subVectors(s,i),hs.subVectors(r,i),sc.subVectors(t,i);let l=cs.dot(sc),c=hs.dot(sc);if(l<=0&&c<=0)return e.copy(i);rc.subVectors(t,s);let u=cs.dot(rc),d=hs.dot(rc);if(u>=0&&d<=u)return e.copy(s);let h=l*d-u*c;if(h<=0&&l>=0&&u<=0&&l-u>0)return a=l/(l-u),e.copy(i).addScaledVector(cs,a);ac.subVectors(t,r);let f=cs.dot(ac),p=hs.dot(ac);if(p>=0&&f<=p)return e.copy(r);let T=f*c-l*p;if(T<=0&&c>=0&&p<=0)return o=c/(c-p),e.copy(i).addScaledVector(hs,o);let x=u*p-f*d;if(x<=0&&d-u>=0&&f-p>=0)return Nu.subVectors(r,s),o=(d-u)/(d-u+(f-p)),e.copy(s).addScaledVector(Nu,o);let g=1/(x+T+h);return a=T*g,o=h*g,e.copy(i).addScaledVector(cs,a).addScaledVector(hs,o)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}},xi=class{constructor(t=new J(1/0,1/0,1/0),e=new J(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=e}set(t,e){return this.min.copy(t),this.max.copy(e),this}setFromArray(t){this.makeEmpty();for(let e=0,i=t.length;e<i;e+=3)this.expandByPoint(Rn.fromArray(t,e));return this}setFromBufferAttribute(t){this.makeEmpty();for(let e=0,i=t.count;e<i;e++)this.expandByPoint(Rn.fromBufferAttribute(t,e));return this}setFromPoints(t){this.makeEmpty();for(let e=0,i=t.length;e<i;e++)this.expandByPoint(t[e]);return this}setFromCenterAndSize(t,e){let i=Rn.copy(e).multiplyScalar(.5);return this.min.copy(t).sub(i),this.max.copy(t).add(i),this}setFromObject(t,e=!1){return this.makeEmpty(),this.expandByObject(t,e)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,e=!1){t.updateWorldMatrix(!1,!1);let i=t.geometry;if(i!==void 0){let r=i.getAttribute("position");if(e===!0&&r!==void 0&&t.isInstancedMesh!==!0&&t.isBatchedMesh!==!0)for(let a=0,o=r.count;a<o;a++)t.isMesh===!0?t.getVertexPosition(a,Rn):Rn.fromBufferAttribute(r,a),Rn.applyMatrix4(t.matrixWorld),this.expandByPoint(Rn);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),sa.copy(t.boundingBox)):(i.boundingBox===null&&i.computeBoundingBox(),sa.copy(i.boundingBox)),sa.applyMatrix4(t.matrixWorld),this.union(sa)}let s=t.children;for(let r=0,a=s.length;r<a;r++)this.expandByObject(s[r],e);return this}containsPoint(t){return t.x>=this.min.x&&t.x<=this.max.x&&t.y>=this.min.y&&t.y<=this.max.y&&t.z>=this.min.z&&t.z<=this.max.z}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,e){return e.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return t.max.x>=this.min.x&&t.min.x<=this.max.x&&t.max.y>=this.min.y&&t.min.y<=this.max.y&&t.max.z>=this.min.z&&t.min.z<=this.max.z}intersectsSphere(t){return this.clampPoint(t.center,Rn),Rn.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let e,i;return t.normal.x>0?(e=t.normal.x*this.min.x,i=t.normal.x*this.max.x):(e=t.normal.x*this.max.x,i=t.normal.x*this.min.x),t.normal.y>0?(e+=t.normal.y*this.min.y,i+=t.normal.y*this.max.y):(e+=t.normal.y*this.max.y,i+=t.normal.y*this.min.y),t.normal.z>0?(e+=t.normal.z*this.min.z,i+=t.normal.z*this.max.z):(e+=t.normal.z*this.max.z,i+=t.normal.z*this.min.z),e<=-t.constant&&i>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(tr),ra.subVectors(this.max,tr),us.subVectors(t.a,tr),ds.subVectors(t.b,tr),fs.subVectors(t.c,tr),fi.subVectors(ds,us),pi.subVectors(fs,ds),Fi.subVectors(us,fs);let e=[0,-fi.z,fi.y,0,-pi.z,pi.y,0,-Fi.z,Fi.y,fi.z,0,-fi.x,pi.z,0,-pi.x,Fi.z,0,-Fi.x,-fi.y,fi.x,0,-pi.y,pi.x,0,-Fi.y,Fi.x,0];return!hc(e,us,ds,fs,ra)||(e=[1,0,0,0,1,0,0,0,1],!hc(e,us,ds,fs,ra))?!1:(aa.crossVectors(fi,pi),e=[aa.x,aa.y,aa.z],hc(e,us,ds,fs,ra))}clampPoint(t,e){return e.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,Rn).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(Rn).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(Qn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),Qn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),Qn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),Qn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),Qn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),Qn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),Qn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),Qn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(Qn),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(t){return this.min.fromArray(t.min),this.max.fromArray(t.max),this}},Qn=[new J,new J,new J,new J,new J,new J,new J,new J],Rn=new J,sa=new xi,us=new J,ds=new J,fs=new J,fi=new J,pi=new J,Fi=new J,tr=new J,ra=new J,aa=new J,Oi=new J;function hc(n,t,e,i,s){for(let r=0,a=n.length-3;r<=a;r+=3){Oi.fromArray(n,r);let o=s.x*Math.abs(Oi.x)+s.y*Math.abs(Oi.y)+s.z*Math.abs(Oi.z),l=t.dot(Oi),c=e.dot(Oi),u=i.dot(Oi);if(Math.max(-Math.max(l,c,u),Math.min(l,c,u))>o)return!1}return!0}var Ie=new J,oa=new Ct,Bp=0,kn=class extends zn{constructor(t,e,i=!1){if(super(),Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:Bp++}),this.name="",this.array=t,this.itemSize=e,this.count=t!==void 0?t.length/e:0,this.normalized=i,this.usage=Pd,this.updateRanges=[],this.gpuType=Ln,this.version=0,this._normalizationScale=t!==void 0?rh(t):void 0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this._normalizationScale=t._normalizationScale,this}copyAt(t,e,i){t*=this.itemSize,i*=e.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[t+s]=e.array[i+s];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let e=0,i=this.count;e<i;e++)oa.fromBufferAttribute(this,e),oa.applyMatrix3(t),this.setXY(e,oa.x,oa.y);else if(this.itemSize===3)for(let e=0,i=this.count;e<i;e++)Ie.fromBufferAttribute(this,e),Ie.applyMatrix3(t),this.setXYZ(e,Ie.x,Ie.y,Ie.z);return this}applyMatrix4(t){for(let e=0,i=this.count;e<i;e++)Ie.fromBufferAttribute(this,e),Ie.applyMatrix4(t),this.setXYZ(e,Ie.x,Ie.y,Ie.z);return this}applyNormalMatrix(t){for(let e=0,i=this.count;e<i;e++)Ie.fromBufferAttribute(this,e),Ie.applyNormalMatrix(t),this.setXYZ(e,Ie.x,Ie.y,Ie.z);return this}transformDirection(t){for(let e=0,i=this.count;e<i;e++)Ie.fromBufferAttribute(this,e),Ie.transformDirection(t),this.setXYZ(e,Ie.x,Ie.y,Ie.z);return this}set(t,e=0){return this.array.set(t,e),this}getComponent(t,e){let i=this.array[t*this.itemSize+e];return this.normalized&&(i=this._denormalize(i)),i}setComponent(t,e,i){return this.normalized&&(i=this._normalize(i)),this.array[t*this.itemSize+e]=i,this}getX(t){let e=this.array[t*this.itemSize];return this.normalized&&(e=this._denormalize(e)),e}setX(t,e){return this.normalized&&(e=this._normalize(e)),this.array[t*this.itemSize]=e,this}getY(t){let e=this.array[t*this.itemSize+1];return this.normalized&&(e=this._denormalize(e)),e}setY(t,e){return this.normalized&&(e=this._normalize(e)),this.array[t*this.itemSize+1]=e,this}getZ(t){let e=this.array[t*this.itemSize+2];return this.normalized&&(e=this._denormalize(e)),e}setZ(t,e){return this.normalized&&(e=this._normalize(e)),this.array[t*this.itemSize+2]=e,this}getW(t){let e=this.array[t*this.itemSize+3];return this.normalized&&(e=this._denormalize(e)),e}setW(t,e){return this.normalized&&(e=this._normalize(e)),this.array[t*this.itemSize+3]=e,this}setXY(t,e,i){return t*=this.itemSize,this.normalized&&(e=this._normalize(e),i=this._normalize(i)),this.array[t+0]=e,this.array[t+1]=i,this}setXYZ(t,e,i,s){return t*=this.itemSize,this.normalized&&(e=this._normalize(e),i=this._normalize(i),s=this._normalize(s)),this.array[t+0]=e,this.array[t+1]=i,this.array[t+2]=s,this}setXYZW(t,e,i,s,r){return t*=this.itemSize,this.normalized&&(e=this._normalize(e),i=this._normalize(i),s=this._normalize(s),r=this._normalize(r)),this.array[t+0]=e,this.array[t+1]=i,this.array[t+2]=s,this.array[t+3]=r,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return t.name=this.name,t.usage=this.usage,t.gpuType=this.gpuType,t}dispose(){this.dispatchEvent({type:"dispose"})}_denormalize(t){let e=this._normalizationScale;return e!==void 0?Math.max(t/e,-1):Ep(t,this.array)}_normalize(t){let e=this._normalizationScale;return e!==void 0?Math.round(t*e):Ap(t,this.array)}};var ur=class extends kn{constructor(t,e,i){super(new Uint16Array(t),e,i)}};var dr=class extends kn{constructor(t,e,i){super(new Uint32Array(t),e,i)}};var ke=class extends kn{constructor(t,e,i){super(new Float32Array(t),e,i)}},kp=new xi,er=new J,uc=new J,Es=class{constructor(t=new J,e=-1){this.isSphere=!0,this.center=t,this.radius=e}set(t,e){return this.center.copy(t),this.radius=e,this}setFromPoints(t,e){let i=this.center;e!==void 0?i.copy(e):kp.setFromPoints(t).getCenter(i);let s=0;for(let r=0,a=t.length;r<a;r++)s=Math.max(s,i.distanceToSquared(t[r]));return this.radius=Math.sqrt(s),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){let e=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=e*e}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,e){let i=this.center.distanceToSquared(t);return e.copy(t),i>this.radius*this.radius&&(e.sub(this.center).normalize(),e.multiplyScalar(this.radius).add(this.center)),e}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;er.subVectors(t,this.center);let e=er.lengthSq();if(e>this.radius*this.radius){let i=Math.sqrt(e),s=(i-this.radius)*.5;this.center.addScaledVector(er,s/i),this.radius+=s}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(uc.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(er.copy(t.center).add(uc)),this.expandByPoint(er.copy(t.center).sub(uc))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(t){return this.radius=t.radius,this.center.fromArray(t.center),this}},zp=0,vn=new ye,dc=new tn,ps=new J,fn=new xi,nr=new xi,Fe=new J,Vn=class n extends zn{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:zp++}),this.uuid=Fs(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={},this._transformed=!1}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(bp(t)?dr:ur)(t,1):this.index=t,this}setIndirect(t,e=0){return this.indirect=t,this.indirectOffset=e,this}getIndirect(){return this.indirect}getAttribute(t){return this.attributes[t]}setAttribute(t,e){return this.attributes[t]=e,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,e,i=0){this.groups.push({start:t,count:e,materialIndex:i})}clearGroups(){this.groups=[]}setDrawRange(t,e){this.drawRange.start=t,this.drawRange.count=e}applyMatrix4(t){let e=this.attributes.position;e!==void 0&&(e.applyMatrix4(t),e.needsUpdate=!0);let i=this.attributes.normal;if(i!==void 0){let r=new Zt().getNormalMatrix(t);i.applyNormalMatrix(r),i.needsUpdate=!0}let s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(t),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this._transformed=!0,this}applyQuaternion(t){return vn.makeRotationFromQuaternion(t),this.applyMatrix4(vn),this}rotateX(t){return vn.makeRotationX(t),this.applyMatrix4(vn),this}rotateY(t){return vn.makeRotationY(t),this.applyMatrix4(vn),this}rotateZ(t){return vn.makeRotationZ(t),this.applyMatrix4(vn),this}translate(t,e,i){return vn.makeTranslation(t,e,i),this.applyMatrix4(vn),this}scale(t,e,i){return vn.makeScale(t,e,i),this.applyMatrix4(vn),this}lookAt(t){return dc.lookAt(t),dc.updateMatrix(),this.applyMatrix4(dc.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(ps).negate(),this.translate(ps.x,ps.y,ps.z),this}setFromPoints(t){let e=this.getAttribute("position");if(e===void 0){let i=[];for(let s=0,r=t.length;s<r;s++){let a=t[s];i.push(a.x,a.y,a.z||0)}this.setAttribute("position",new ke(i,3))}else{let i=Math.min(t.length,e.count);for(let s=0;s<i;s++){let r=t[s];e.setXYZ(s,r.x,r.y,r.z||0)}t.length>e.count&&Xt("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),e.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new xi);let t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){Yt("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new J(-1/0,-1/0,-1/0),new J(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),e)for(let i=0,s=e.length;i<s;i++){let r=e[i];fn.setFromBufferAttribute(r),this.morphTargetsRelative?(Fe.addVectors(this.boundingBox.min,fn.min),this.boundingBox.expandByPoint(Fe),Fe.addVectors(this.boundingBox.max,fn.max),this.boundingBox.expandByPoint(Fe)):(this.boundingBox.expandByPoint(fn.min),this.boundingBox.expandByPoint(fn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&Yt('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Es);let t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){Yt("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new J,1/0);return}if(t){let i=this.boundingSphere.center;if(fn.setFromBufferAttribute(t),e)for(let r=0,a=e.length;r<a;r++){let o=e[r];nr.setFromBufferAttribute(o),this.morphTargetsRelative?(Fe.addVectors(fn.min,nr.min),fn.expandByPoint(Fe),Fe.addVectors(fn.max,nr.max),fn.expandByPoint(Fe)):(fn.expandByPoint(nr.min),fn.expandByPoint(nr.max))}fn.getCenter(i);let s=0;for(let r=0,a=t.count;r<a;r++)Fe.fromBufferAttribute(t,r),s=Math.max(s,i.distanceToSquared(Fe));if(e)for(let r=0,a=e.length;r<a;r++){let o=e[r],l=this.morphTargetsRelative;for(let c=0,u=o.count;c<u;c++)Fe.fromBufferAttribute(o,c),l&&(ps.fromBufferAttribute(t,c),Fe.add(ps)),s=Math.max(s,i.distanceToSquared(Fe))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&Yt('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){let t=this.index,e=this.attributes;if(t===null||e.position===void 0||e.normal===void 0||e.uv===void 0){Yt("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}let i=e.position,s=e.normal,r=e.uv,a=this.getAttribute("tangent");(a===void 0||a.count!==i.count)&&(a=new kn(new Float32Array(4*i.count),4),this.setAttribute("tangent",a));let o=[],l=[],c=new Uint8Array(i.count);for(let L=0;L<i.count;L++)o[L]=new J,l[L]=new J;let u=new J,d=new J,h=new J,f=new Ct,p=new Ct,T=new Ct,x=new J,g=new J;function w(L,P,B){c[L]=c[P]=c[B]=1,u.fromBufferAttribute(i,L),d.fromBufferAttribute(i,P),h.fromBufferAttribute(i,B),f.fromBufferAttribute(r,L),p.fromBufferAttribute(r,P),T.fromBufferAttribute(r,B),d.sub(u),h.sub(u),p.sub(f),T.sub(f);let C=1/(p.x*T.y-T.x*p.y);isFinite(C)&&(x.copy(d).multiplyScalar(T.y).addScaledVector(h,-p.y).multiplyScalar(C),g.copy(h).multiplyScalar(p.x).addScaledVector(d,-T.x).multiplyScalar(C),o[L].add(x),o[P].add(x),o[B].add(x),l[L].add(g),l[P].add(g),l[B].add(g))}let _=this.groups;_.length===0&&(_=[{start:0,count:t.count}]);for(let L=0,P=_.length;L<P;++L){let B=_[L],C=B.start,O=B.count;for(let D=C,E=C+O;D<E;D+=3)w(t.getX(D+0),t.getX(D+1),t.getX(D+2))}let v=new J,R=new J,N=new J,m=new J;function M(L){N.fromBufferAttribute(s,L),m.copy(N);let P=o[L];v.copy(P),v.sub(N.multiplyScalar(N.dot(P))).normalize(),R.crossVectors(m,P);let C=R.dot(l[L])<0?-1:1;a.setXYZW(L,v.x,v.y,v.z,C)}for(let L=0,P=i.count;L<P;++L)c[L]&&M(L);this._transformed=!0}computeVertexNormals(){let t=this.index,e=this.getAttribute("position");if(e!==void 0){let i=this.getAttribute("normal");if(i===void 0||i.count!==e.count)i=new kn(new Float32Array(e.count*3),3),this.setAttribute("normal",i);else for(let h=0,f=i.count;h<f;h++)i.setXYZ(h,0,0,0);let s=new J,r=new J,a=new J,o=new J,l=new J,c=new J,u=new J,d=new J;if(t)for(let h=0,f=t.count;h<f;h+=3){let p=t.getX(h+0),T=t.getX(h+1),x=t.getX(h+2);s.fromBufferAttribute(e,p),r.fromBufferAttribute(e,T),a.fromBufferAttribute(e,x),u.subVectors(a,r),d.subVectors(s,r),u.cross(d),o.fromBufferAttribute(i,p),l.fromBufferAttribute(i,T),c.fromBufferAttribute(i,x),o.add(u),l.add(u),c.add(u),i.setXYZ(p,o.x,o.y,o.z),i.setXYZ(T,l.x,l.y,l.z),i.setXYZ(x,c.x,c.y,c.z)}else for(let h=0,f=e.count;h<f;h+=3)s.fromBufferAttribute(e,h+0),r.fromBufferAttribute(e,h+1),a.fromBufferAttribute(e,h+2),u.subVectors(a,r),d.subVectors(s,r),u.cross(d),i.setXYZ(h+0,u.x,u.y,u.z),i.setXYZ(h+1,u.x,u.y,u.z),i.setXYZ(h+2,u.x,u.y,u.z);this.normalizeNormals(),i.needsUpdate=!0}}normalizeNormals(){let t=this.attributes.normal;for(let e=0,i=t.count;e<i;e++)Fe.fromBufferAttribute(t,e),Fe.normalize(),t.setXYZ(e,Fe.x,Fe.y,Fe.z)}toNonIndexed(){function t(o,l){let c=o.array,u=o.itemSize,d=o.normalized,h=new c.constructor(l.length*u),f=0,p=0;for(let T=0,x=l.length;T<x;T++){o.isInterleavedBufferAttribute?f=l[T]*o.data.stride+o.offset:f=l[T]*u;for(let g=0;g<u;g++)h[p++]=c[f++]}return new kn(h,u,d)}if(this.index===null)return Xt("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;let e=new n,i=this.index.array,s=this.attributes;for(let o in s){let l=s[o],c=t(l,i);e.setAttribute(o,c)}let r=this.morphAttributes;for(let o in r){let l=[],c=r[o];for(let u=0,d=c.length;u<d;u++){let h=c[u],f=t(h,i);l.push(f)}e.morphAttributes[o]=l}e.morphTargetsRelative=this.morphTargetsRelative;let a=this.groups;for(let o=0,l=a.length;o<l;o++){let c=a[o];e.addGroup(c.start,c.count,c.materialIndex)}return e}toJSON(){let t={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.parameters!==void 0&&this._transformed===!0?"BufferGeometry":this.type,t.name=this.name,Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0&&this._transformed!==!0){let l=this.parameters;for(let c in l)l[c]!==void 0&&(t[c]=l[c]);return t}t.data={attributes:{}};let e=this.index;e!==null&&(t.data.index={type:e.array.constructor.name,array:Array.prototype.slice.call(e.array)});let i=this.attributes;for(let l in i){let c=i[l];t.data.attributes[l]=c.toJSON(t.data)}let s={},r=!1;for(let l in this.morphAttributes){let c=this.morphAttributes[l],u=[];for(let d=0,h=c.length;d<h;d++){let f=c[d];u.push(f.toJSON(t.data))}u.length>0&&(s[l]=u,r=!0)}r&&(t.data.morphAttributes=s,t.data.morphTargetsRelative=this.morphTargetsRelative);let a=this.groups;a.length>0&&(t.data.groups=JSON.parse(JSON.stringify(a)));let o=this.boundingSphere;return o!==null&&(t.data.boundingSphere=o.toJSON()),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let e={};this.name=t.name;let i=t.index;i!==null&&this.setIndex(i.clone());let s=t.attributes;for(let c in s){let u=s[c];this.setAttribute(c,u.clone(e))}let r=t.morphAttributes;for(let c in r){let u=[],d=r[c];for(let h=0,f=d.length;h<f;h++)u.push(d[h].clone(e));this.morphAttributes[c]=u}this.morphTargetsRelative=t.morphTargetsRelative;let a=t.groups;for(let c=0,u=a.length;c<u;c++){let d=a[c];this.addGroup(d.start,d.count,d.materialIndex)}let o=t.boundingBox;o!==null&&(this.boundingBox=o.clone());let l=t.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this._transformed=t._transformed,this}dispose(){this.dispatchEvent({type:"dispose"})}};var fc=new J,Gp=new J,Vp=new Zt,In=class{constructor(t=new J(1,0,0),e=0){this.isPlane=!0,this.normal=t,this.constant=e}set(t,e){return this.normal.copy(t),this.constant=e,this}setComponents(t,e,i,s){return this.normal.set(t,e,i),this.constant=s,this}setFromNormalAndCoplanarPoint(t,e){return this.normal.copy(t),this.constant=-e.dot(this.normal),this}setFromCoplanarPoints(t,e,i){let s=fc.subVectors(i,e).cross(Gp.subVectors(t,e)).normalize();return this.setFromNormalAndCoplanarPoint(s,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){let t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,e){return e.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,e,i=!0){let s=t.delta(fc),r=this.normal.dot(s);if(r===0)return this.distanceToPoint(t.start)===0?e.copy(t.start):null;let a=-(t.start.dot(this.normal)+this.constant)/r;return i===!0&&(a<0||a>1)?null:e.copy(t.start).addScaledVector(s,a)}intersectsLine(t){let e=this.distanceToPoint(t.start),i=this.distanceToPoint(t.end);return e<0&&i>0||i<0&&e>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,e){let i=e||Vp.getNormalMatrix(t),s=this.coplanarPoint(fc).applyMatrix4(t),r=this.normal.applyMatrix3(i).normalize();return this.constant=-s.dot(r),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}toJSON(){return{normal:this.normal.toArray(),constant:this.constant}}fromJSON(t){return this.normal.fromArray(t.normal),this.constant=t.constant,this}},Hp=0,_i=class extends zn{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Hp++}),this.uuid=Fs(),this.name="",this.type="Material",this.blending=Ns,this.side=Ei,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Fc,this.blendDst=Oc,this.blendEquation=$i,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new jt(0,0,0),this.blendAlpha=0,this.depthFunc=ys,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Td,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=wa,this.stencilZFail=wa,this.stencilZPass=wa,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(let e in t){let i=t[e];if(i===void 0){Xt(`Material: parameter '${e}' has value of undefined.`);continue}let s=this[e];if(s===void 0){Xt(`Material: '${e}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(i):s&&s.isVector2&&i&&i.isVector2||s&&s.isEuler&&i&&i.isEuler||s&&s.isVector3&&i&&i.isVector3?s.copy(i):this[e]=i}}toJSON(t){let e=t===void 0||typeof t=="string";e&&(t={textures:{},images:{}});let i={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};i.uuid=this.uuid,i.type=this.type,i.blending=this.blending,i.side=this.side,i.shadowSide=this.shadowSide,i.vertexColors=this.vertexColors,i.opacity=this.opacity,i.transparent=this.transparent,i.blendSrc=this.blendSrc,i.blendDst=this.blendDst,i.blendEquation=this.blendEquation,i.blendSrcAlpha=this.blendSrcAlpha,i.blendDstAlpha=this.blendDstAlpha,i.blendEquationAlpha=this.blendEquationAlpha,i.blendColor=this.blendColor.getHex(),i.blendAlpha=this.blendAlpha,i.depthFunc=this.depthFunc,i.depthTest=this.depthTest,i.depthWrite=this.depthWrite,i.colorWrite=this.colorWrite,i.clipIntersection=this.clipIntersection,i.clipShadows=this.clipShadows,i.stencilWriteMask=this.stencilWriteMask,i.stencilFunc=this.stencilFunc,i.stencilRef=this.stencilRef,i.stencilFuncMask=this.stencilFuncMask,i.stencilFail=this.stencilFail,i.stencilZFail=this.stencilZFail,i.stencilZPass=this.stencilZPass,i.stencilWrite=this.stencilWrite,i.polygonOffset=this.polygonOffset,i.polygonOffsetFactor=this.polygonOffsetFactor,i.polygonOffsetUnits=this.polygonOffsetUnits,i.dithering=this.dithering,i.alphaTest=this.alphaTest,i.alphaHash=this.alphaHash,i.alphaToCoverage=this.alphaToCoverage,i.premultipliedAlpha=this.premultipliedAlpha,i.forceSinglePass=this.forceSinglePass,i.allowOverride=this.allowOverride,i.visible=this.visible,i.toneMapped=this.toneMapped,i.name=this.name,this.color&&this.color.isColor&&(i.color=this.color.getHex()),this.roughness!==void 0&&(i.roughness=this.roughness),this.metalness!==void 0&&(i.metalness=this.metalness),this.sheen!==void 0&&(i.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(i.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(i.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(i.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&(i.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(i.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(i.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(i.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(i.shininess=this.shininess),this.clearcoat!==void 0&&(i.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(i.clearcoatRoughness=this.clearcoatRoughness),this.diffuseRoughness!==void 0&&(i.diffuseRoughness=this.diffuseRoughness),this.diffuseRoughnessMap&&this.diffuseRoughnessMap.isTexture&&(i.diffuseRoughnessMap=this.diffuseRoughnessMap.toJSON(t).uuid),this.clearcoatMap&&this.clearcoatMap.isTexture&&(i.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(i.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(i.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,i.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(i.sheenColorMap=this.sheenColorMap.toJSON(t).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(i.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(t).uuid),this.dispersion!==void 0&&(i.dispersion=this.dispersion),this.retroreflectivity!==void 0&&(i.retroreflectivity=this.retroreflectivity),this.iridescence!==void 0&&(i.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(i.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessMinimum!==void 0&&(i.iridescenceThicknessMinimum=this.iridescenceThicknessMinimum),this.iridescenceThicknessMaximum!==void 0&&(i.iridescenceThicknessMaximum=this.iridescenceThicknessMaximum),this.iridescenceMap&&this.iridescenceMap.isTexture&&(i.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(i.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(i.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(i.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(i.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(i.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(i.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(i.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(i.lightMap=this.lightMap.toJSON(t).uuid,i.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(i.aoMap=this.aoMap.toJSON(t).uuid,i.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(i.bumpMap=this.bumpMap.toJSON(t).uuid,i.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(i.normalMap=this.normalMap.toJSON(t).uuid,i.normalMapType=this.normalMapType,i.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(i.displacementMap=this.displacementMap.toJSON(t).uuid,i.displacementScale=this.displacementScale,i.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(i.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(i.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(i.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(i.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(i.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(i.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(i.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(i.combine=this.combine)),this.envMapRotation!==void 0&&(i.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(i.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(i.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(i.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(i.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(i.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(i.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(i.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(i.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&(i.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(i.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(i.size=this.size),this.sizeAttenuation!==void 0&&(i.sizeAttenuation=this.sizeAttenuation),Array.isArray(this.clippingPlanes)&&this.clippingPlanes.length>0&&(i.clippingPlanes=this.clippingPlanes.map(r=>r.toJSON())),this.rotation!==void 0&&(i.rotation=this.rotation),this.depthPacking!==void 0&&(i.depthPacking=this.depthPacking),this.linewidth!==void 0&&(i.linewidth=this.linewidth),this.linecap!==void 0&&(i.linecap=this.linecap),this.linejoin!==void 0&&(i.linejoin=this.linejoin),this.dashSize!==void 0&&(i.dashSize=this.dashSize),this.gapSize!==void 0&&(i.gapSize=this.gapSize),this.scale!==void 0&&(i.scale=this.scale),this.wireframe!==void 0&&(i.wireframe=this.wireframe),this.wireframeLinewidth!==void 0&&(i.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!==void 0&&(i.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!==void 0&&(i.wireframeLinejoin=this.wireframeLinejoin),this.flatShading!==void 0&&(i.flatShading=this.flatShading),this.fog!==void 0&&(i.fog=this.fog),Object.keys(this.userData).length>0&&(i.userData=this.userData);function s(r){let a=[];for(let o in r){let l=r[o];delete l.metadata,a.push(l)}return a}if(e){let r=s(t.textures),a=s(t.images);r.length>0&&(i.textures=r),a.length>0&&(i.images=a)}return i}fromJSON(t,e){if(t.uuid!==void 0&&(this.uuid=t.uuid),t.name!==void 0&&(this.name=t.name),t.color!==void 0&&this.color!==void 0&&this.color.setHex(t.color),t.roughness!==void 0&&(this.roughness=t.roughness),t.metalness!==void 0&&(this.metalness=t.metalness),t.sheen!==void 0&&(this.sheen=t.sheen),t.sheenColor!==void 0&&(this.sheenColor=new jt().setHex(t.sheenColor)),t.sheenRoughness!==void 0&&(this.sheenRoughness=t.sheenRoughness),t.emissive!==void 0&&this.emissive!==void 0&&this.emissive.setHex(t.emissive),t.specular!==void 0&&this.specular!==void 0&&this.specular.setHex(t.specular),t.specularIntensity!==void 0&&(this.specularIntensity=t.specularIntensity),t.specularColor!==void 0&&this.specularColor!==void 0&&this.specularColor.setHex(t.specularColor),t.shininess!==void 0&&(this.shininess=t.shininess),t.clearcoat!==void 0&&(this.clearcoat=t.clearcoat),t.clearcoatRoughness!==void 0&&(this.clearcoatRoughness=t.clearcoatRoughness),t.diffuseRoughness!==void 0&&(this.diffuseRoughness=t.diffuseRoughness),t.dispersion!==void 0&&(this.dispersion=t.dispersion),t.retroreflectivity!==void 0&&(this.retroreflectivity=t.retroreflectivity),t.iridescence!==void 0&&(this.iridescence=t.iridescence),t.iridescenceIOR!==void 0&&(this.iridescenceIOR=t.iridescenceIOR),t.iridescenceThicknessMinimum!==void 0&&(this.iridescenceThicknessMinimum=t.iridescenceThicknessMinimum),t.iridescenceThicknessMaximum!==void 0&&(this.iridescenceThicknessMaximum=t.iridescenceThicknessMaximum),t.iridescenceThicknessRange!==void 0&&(this.iridescenceThicknessMinimum=t.iridescenceThicknessRange[0],this.iridescenceThicknessMaximum=t.iridescenceThicknessRange[1]),t.transmission!==void 0&&(this.transmission=t.transmission),t.thickness!==void 0&&(this.thickness=t.thickness),t.attenuationDistance!==void 0&&(this.attenuationDistance=t.attenuationDistance),t.attenuationColor!==void 0&&this.attenuationColor!==void 0&&this.attenuationColor.setHex(t.attenuationColor),t.anisotropy!==void 0&&(this.anisotropy=t.anisotropy),t.anisotropyRotation!==void 0&&(this.anisotropyRotation=t.anisotropyRotation),t.fog!==void 0&&(this.fog=t.fog),t.flatShading!==void 0&&(this.flatShading=t.flatShading),t.blending!==void 0&&(this.blending=t.blending),t.combine!==void 0&&(this.combine=t.combine),t.side!==void 0&&(this.side=t.side),t.shadowSide!==void 0&&(this.shadowSide=t.shadowSide),t.opacity!==void 0&&(this.opacity=t.opacity),t.transparent!==void 0&&(this.transparent=t.transparent),t.alphaTest!==void 0&&(this.alphaTest=t.alphaTest),t.alphaHash!==void 0&&(this.alphaHash=t.alphaHash),t.depthFunc!==void 0&&(this.depthFunc=t.depthFunc),t.depthTest!==void 0&&(this.depthTest=t.depthTest),t.depthWrite!==void 0&&(this.depthWrite=t.depthWrite),t.colorWrite!==void 0&&(this.colorWrite=t.colorWrite),t.clippingPlanes!==void 0&&(this.clippingPlanes=t.clippingPlanes.map(i=>new In().fromJSON(i))),t.clipIntersection!==void 0&&(this.clipIntersection=t.clipIntersection),t.clipShadows!==void 0&&(this.clipShadows=t.clipShadows),t.depthPacking!==void 0&&(this.depthPacking=t.depthPacking),t.blendSrc!==void 0&&(this.blendSrc=t.blendSrc),t.blendDst!==void 0&&(this.blendDst=t.blendDst),t.blendEquation!==void 0&&(this.blendEquation=t.blendEquation),t.blendSrcAlpha!==void 0&&(this.blendSrcAlpha=t.blendSrcAlpha),t.blendDstAlpha!==void 0&&(this.blendDstAlpha=t.blendDstAlpha),t.blendEquationAlpha!==void 0&&(this.blendEquationAlpha=t.blendEquationAlpha),t.blendColor!==void 0&&this.blendColor!==void 0&&this.blendColor.setHex(t.blendColor),t.blendAlpha!==void 0&&(this.blendAlpha=t.blendAlpha),t.stencilWriteMask!==void 0&&(this.stencilWriteMask=t.stencilWriteMask),t.stencilFunc!==void 0&&(this.stencilFunc=t.stencilFunc),t.stencilRef!==void 0&&(this.stencilRef=t.stencilRef),t.stencilFuncMask!==void 0&&(this.stencilFuncMask=t.stencilFuncMask),t.stencilFail!==void 0&&(this.stencilFail=t.stencilFail),t.stencilZFail!==void 0&&(this.stencilZFail=t.stencilZFail),t.stencilZPass!==void 0&&(this.stencilZPass=t.stencilZPass),t.stencilWrite!==void 0&&(this.stencilWrite=t.stencilWrite),t.wireframe!==void 0&&(this.wireframe=t.wireframe),t.wireframeLinewidth!==void 0&&(this.wireframeLinewidth=t.wireframeLinewidth),t.wireframeLinecap!==void 0&&(this.wireframeLinecap=t.wireframeLinecap),t.wireframeLinejoin!==void 0&&(this.wireframeLinejoin=t.wireframeLinejoin),t.rotation!==void 0&&(this.rotation=t.rotation),t.linewidth!==void 0&&(this.linewidth=t.linewidth),t.linecap!==void 0&&(this.linecap=t.linecap),t.linejoin!==void 0&&(this.linejoin=t.linejoin),t.dashSize!==void 0&&(this.dashSize=t.dashSize),t.gapSize!==void 0&&(this.gapSize=t.gapSize),t.scale!==void 0&&(this.scale=t.scale),t.polygonOffset!==void 0&&(this.polygonOffset=t.polygonOffset),t.polygonOffsetFactor!==void 0&&(this.polygonOffsetFactor=t.polygonOffsetFactor),t.polygonOffsetUnits!==void 0&&(this.polygonOffsetUnits=t.polygonOffsetUnits),t.dithering!==void 0&&(this.dithering=t.dithering),t.alphaToCoverage!==void 0&&(this.alphaToCoverage=t.alphaToCoverage),t.premultipliedAlpha!==void 0&&(this.premultipliedAlpha=t.premultipliedAlpha),t.forceSinglePass!==void 0&&(this.forceSinglePass=t.forceSinglePass),t.allowOverride!==void 0&&(this.allowOverride=t.allowOverride),t.visible!==void 0&&(this.visible=t.visible),t.toneMapped!==void 0&&(this.toneMapped=t.toneMapped),t.userData!==void 0&&(this.userData=t.userData),t.vertexColors!==void 0&&(typeof t.vertexColors=="number"?this.vertexColors=t.vertexColors>0:this.vertexColors=t.vertexColors),t.size!==void 0&&(this.size=t.size),t.sizeAttenuation!==void 0&&(this.sizeAttenuation=t.sizeAttenuation),t.map!==void 0&&(this.map=e[t.map]||null),t.matcap!==void 0&&(this.matcap=e[t.matcap]||null),t.alphaMap!==void 0&&(this.alphaMap=e[t.alphaMap]||null),t.bumpMap!==void 0&&(this.bumpMap=e[t.bumpMap]||null),t.bumpScale!==void 0&&(this.bumpScale=t.bumpScale),t.normalMap!==void 0&&(this.normalMap=e[t.normalMap]||null),t.normalMapType!==void 0&&(this.normalMapType=t.normalMapType),t.normalScale!==void 0){let i=t.normalScale;Array.isArray(i)===!1&&(i=[i,i]),this.normalScale=new Ct().fromArray(i)}return t.displacementMap!==void 0&&(this.displacementMap=e[t.displacementMap]||null),t.displacementScale!==void 0&&(this.displacementScale=t.displacementScale),t.displacementBias!==void 0&&(this.displacementBias=t.displacementBias),t.roughnessMap!==void 0&&(this.roughnessMap=e[t.roughnessMap]||null),t.metalnessMap!==void 0&&(this.metalnessMap=e[t.metalnessMap]||null),t.emissiveMap!==void 0&&(this.emissiveMap=e[t.emissiveMap]||null),t.emissiveIntensity!==void 0&&(this.emissiveIntensity=t.emissiveIntensity),t.specularMap!==void 0&&(this.specularMap=e[t.specularMap]||null),t.specularIntensityMap!==void 0&&(this.specularIntensityMap=e[t.specularIntensityMap]||null),t.specularColorMap!==void 0&&(this.specularColorMap=e[t.specularColorMap]||null),t.envMap!==void 0&&(this.envMap=e[t.envMap]||null),t.envMapRotation!==void 0&&this.envMapRotation.fromArray(t.envMapRotation),t.envMapIntensity!==void 0&&(this.envMapIntensity=t.envMapIntensity),t.reflectivity!==void 0&&(this.reflectivity=t.reflectivity),t.refractionRatio!==void 0&&(this.refractionRatio=t.refractionRatio),t.lightMap!==void 0&&(this.lightMap=e[t.lightMap]||null),t.lightMapIntensity!==void 0&&(this.lightMapIntensity=t.lightMapIntensity),t.aoMap!==void 0&&(this.aoMap=e[t.aoMap]||null),t.aoMapIntensity!==void 0&&(this.aoMapIntensity=t.aoMapIntensity),t.gradientMap!==void 0&&(this.gradientMap=e[t.gradientMap]||null),t.clearcoatMap!==void 0&&(this.clearcoatMap=e[t.clearcoatMap]||null),t.clearcoatRoughnessMap!==void 0&&(this.clearcoatRoughnessMap=e[t.clearcoatRoughnessMap]||null),t.clearcoatNormalMap!==void 0&&(this.clearcoatNormalMap=e[t.clearcoatNormalMap]||null),t.clearcoatNormalScale!==void 0&&(this.clearcoatNormalScale=new Ct().fromArray(t.clearcoatNormalScale)),t.diffuseRoughnessMap!==void 0&&(this.diffuseRoughnessMap=e[t.diffuseRoughnessMap]||null),t.iridescenceMap!==void 0&&(this.iridescenceMap=e[t.iridescenceMap]||null),t.iridescenceThicknessMap!==void 0&&(this.iridescenceThicknessMap=e[t.iridescenceThicknessMap]||null),t.transmissionMap!==void 0&&(this.transmissionMap=e[t.transmissionMap]||null),t.thicknessMap!==void 0&&(this.thicknessMap=e[t.thicknessMap]||null),t.anisotropyMap!==void 0&&(this.anisotropyMap=e[t.anisotropyMap]||null),t.sheenColorMap!==void 0&&(this.sheenColorMap=e[t.sheenColorMap]||null),t.sheenRoughnessMap!==void 0&&(this.sheenRoughnessMap=e[t.sheenRoughnessMap]||null),this}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;let e=t.clippingPlanes,i=null;if(e!==null){let s=e.length;i=new Array(s);for(let r=0;r!==s;++r)i[r]=e[r].clone()}return this.clippingPlanes=i,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.allowOverride=t.allowOverride,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}};var jn=new J,pc=new J,la=new J,ca=new J,fr=class{constructor(t=new J,e=new J(0,0,-1)){this.origin=t,this.direction=e}set(t,e){return this.origin.copy(t),this.direction.copy(e),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,e){return e.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,jn)),this}closestPointToPoint(t,e){e.subVectors(t,this.origin);let i=e.dot(this.direction);return i<0?e.copy(this.origin):e.copy(this.origin).addScaledVector(this.direction,i)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){let e=jn.subVectors(t,this.origin).dot(this.direction);return e<0?this.origin.distanceToSquared(t):(jn.copy(this.origin).addScaledVector(this.direction,e),jn.distanceToSquared(t))}distanceSqToSegment(t,e,i,s){pc.copy(t).add(e).multiplyScalar(.5),la.copy(e).sub(t).normalize(),ca.copy(this.origin).sub(pc);let r=t.distanceTo(e)*.5,a=-this.direction.dot(la),o=ca.dot(this.direction),l=-ca.dot(la),c=ca.lengthSq(),u=Math.abs(1-a*a),d,h,f,p;if(u>0)if(d=a*l-o,h=a*o-l,p=r*u,d>=0)if(h>=-p)if(h<=p){let T=1/u;d*=T,h*=T,f=d*(d+a*h+2*o)+h*(a*d+h+2*l)+c}else h=r,d=Math.max(0,-(a*h+o)),f=-d*d+h*(h+2*l)+c;else h=-r,d=Math.max(0,-(a*h+o)),f=-d*d+h*(h+2*l)+c;else h<=-p?(d=Math.max(0,-(-a*r+o)),h=d>0?-r:Math.min(Math.max(-r,-l),r),f=-d*d+h*(h+2*l)+c):h<=p?(d=0,h=Math.min(Math.max(-r,-l),r),f=h*(h+2*l)+c):(d=Math.max(0,-(a*r+o)),h=d>0?r:Math.min(Math.max(-r,-l),r),f=-d*d+h*(h+2*l)+c);else h=a>0?-r:r,d=Math.max(0,-(a*h+o)),f=-d*d+h*(h+2*l)+c;return i&&i.copy(this.origin).addScaledVector(this.direction,d),s&&s.copy(pc).addScaledVector(la,h),f}intersectSphere(t,e){if(t.radius<0)return null;jn.subVectors(t.center,this.origin);let i=jn.dot(this.direction),s=jn.dot(jn)-i*i,r=t.radius*t.radius;if(s>r)return null;let a=Math.sqrt(r-s),o=i-a,l=i+a;return l<0?null:o<0?this.at(l,e):this.at(o,e)}intersectsSphere(t){return t.radius<0?!1:this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){let e=t.normal.dot(this.direction);if(e===0)return t.distanceToPoint(this.origin)===0?0:null;let i=-(this.origin.dot(t.normal)+t.constant)/e;return i>=0?i:null}intersectPlane(t,e){let i=this.distanceToPlane(t);return i===null?null:this.at(i,e)}intersectsPlane(t){let e=t.distanceToPoint(this.origin);return e===0||t.normal.dot(this.direction)*e<0}intersectBox(t,e){let i,s,r,a,o,l,c=1/this.direction.x,u=1/this.direction.y,d=1/this.direction.z,h=this.origin;return c>=0?(i=(t.min.x-h.x)*c,s=(t.max.x-h.x)*c):(i=(t.max.x-h.x)*c,s=(t.min.x-h.x)*c),u>=0?(r=(t.min.y-h.y)*u,a=(t.max.y-h.y)*u):(r=(t.max.y-h.y)*u,a=(t.min.y-h.y)*u),i>a||r>s||((r>i||isNaN(i))&&(i=r),(a<s||isNaN(s))&&(s=a),d>=0?(o=(t.min.z-h.z)*d,l=(t.max.z-h.z)*d):(o=(t.max.z-h.z)*d,l=(t.min.z-h.z)*d),i>l||o>s)||((o>i||i!==i)&&(i=o),(l<s||s!==s)&&(s=l),s<0)?null:this.at(i>=0?i:s,e)}intersectsBox(t){return this.intersectBox(t,jn)!==null}intersectTriangle(t,e,i,s,r){let a=this.origin,o=this.direction,l=o.x,c=o.y,u=o.z,d=t.x-a.x,h=t.y-a.y,f=t.z-a.z,p=e.x-a.x,T=e.y-a.y,x=e.z-a.z,g=i.x-a.x,w=i.y-a.y,_=i.z-a.z,v=Math.abs(l),R=Math.abs(c),N=Math.abs(u),m,M,L,P,B,C,O,D,E,z,b,I;if(v>=R&&v>=N?(L=l,C=d,E=p,I=g,l>=0?(m=c,M=u,P=h,B=f,O=T,D=x,z=w,b=_):(m=u,M=c,P=f,B=h,O=x,D=T,z=_,b=w)):R>=N?(L=c,C=h,E=T,I=w,c>=0?(m=u,M=l,P=f,B=d,O=x,D=p,z=_,b=g):(m=l,M=u,P=d,B=f,O=p,D=x,z=g,b=_)):(L=u,C=f,E=x,I=_,u>=0?(m=l,M=c,P=d,B=h,O=p,D=T,z=g,b=w):(m=c,M=l,P=h,B=d,O=T,D=p,z=w,b=g)),L===0)return null;let y=m/L,F=M/L,S=1/L,U=P-y*C,V=B-F*C,A=O-y*E,q=D-F*E,W=z-y*I,Z=b-F*I,Y=W*q-Z*A,et=U*Z-V*W,ft=A*V-q*U;if(s){if(Y<0||et<0||ft<0)return null}else if((Y<0||et<0||ft<0)&&(Y>0||et>0||ft>0))return null;let ct=Y+et+ft;if(ct===0)return null;let ut=S*(Y*C+et*E+ft*I);return(ct>0?ut<0:ut>0)?null:this.at(ut/ct,r)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}},Hi=class extends _i{constructor(t){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new jt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new ni,this.combine=Bc,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}},Du=new ye,Bi=new fr,ha=new Es,Uu=new J,ua=new J,da=new J,fa=new J,mc=new J,pa=new J,Fu=new J,ma=new J,Xe=class extends tn{constructor(t=new Vn,e=new Hi){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=e,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0?this.morphTargetInfluences=t.morphTargetInfluences.slice():this.morphTargetInfluences=void 0,t.morphTargetDictionary!==void 0?this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary):this.morphTargetDictionary=void 0,this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){let e=this.geometry.morphAttributes,i=Object.keys(e);if(i.length>0){let s=e[i[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){let o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}getVertexPosition(t,e){let i=this.geometry,s=i.attributes.position,r=i.morphAttributes.position,a=i.morphTargetsRelative;e.fromBufferAttribute(s,t);let o=this.morphTargetInfluences;if(r&&o){pa.set(0,0,0);for(let l=0,c=r.length;l<c;l++){let u=o[l],d=r[l];u!==0&&(mc.fromBufferAttribute(d,t),a?pa.addScaledVector(mc,u):pa.addScaledVector(mc.sub(e),u))}e.add(pa)}return e}intersectsFrustum(t){return t.intersectsObject(this)}raycast(t,e){let i=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(i.boundingSphere===null&&i.computeBoundingSphere(),ha.copy(i.boundingSphere),ha.applyMatrix4(r),Bi.copy(t.ray).recast(t.near),!(ha.containsPoint(Bi.origin)===!1&&(Bi.intersectSphere(ha,Uu)===null||Bi.origin.distanceToSquared(Uu)>(t.far-t.near)**2))&&(Du.copy(r).invert(),Bi.copy(t.ray).applyMatrix4(Du),!(i.boundingBox!==null&&Bi.intersectsBox(i.boundingBox)===!1)&&this._computeIntersections(t,e,Bi)))}_computeIntersections(t,e,i){let s,r=this.geometry,a=this.material,o=r.index,l=r.attributes.position,c=r.attributes.uv,u=r.attributes.uv1,d=r.attributes.normal,h=r.groups,f=r.drawRange;if(o!==null)if(Array.isArray(a))for(let p=0,T=h.length;p<T;p++){let x=h[p],g=a[x.materialIndex],w=Math.max(x.start,f.start),_=Math.min(o.count,Math.min(x.start+x.count,f.start+f.count));for(let v=w,R=_;v<R;v+=3){let N=o.getX(v),m=o.getX(v+1),M=o.getX(v+2);s=ga(this,g,t,i,c,u,d,N,m,M),s&&(s.faceIndex=Math.floor(v/3),s.face.materialIndex=x.materialIndex,e.push(s))}}else{let p=Math.max(0,f.start),T=Math.min(o.count,f.start+f.count);for(let x=p,g=T;x<g;x+=3){let w=o.getX(x),_=o.getX(x+1),v=o.getX(x+2);s=ga(this,a,t,i,c,u,d,w,_,v),s&&(s.faceIndex=Math.floor(x/3),e.push(s))}}else if(l!==void 0)if(Array.isArray(a))for(let p=0,T=h.length;p<T;p++){let x=h[p],g=a[x.materialIndex],w=Math.max(x.start,f.start),_=Math.min(l.count,Math.min(x.start+x.count,f.start+f.count));for(let v=w,R=_;v<R;v+=3){let N=v,m=v+1,M=v+2;s=ga(this,g,t,i,c,u,d,N,m,M),s&&(s.faceIndex=Math.floor(v/3),s.face.materialIndex=x.materialIndex,e.push(s))}}else{let p=Math.max(0,f.start),T=Math.min(l.count,f.start+f.count);for(let x=p,g=T;x<g;x+=3){let w=x,_=x+1,v=x+2;s=ga(this,a,t,i,c,u,d,w,_,v),s&&(s.faceIndex=Math.floor(x/3),e.push(s))}}}};function Wp(n,t,e,i,s,r,a,o){let l;if(t.side===en?l=i.intersectTriangle(a,r,s,!0,o):l=i.intersectTriangle(s,r,a,t.side===Ei,o),l===null)return null;ma.copy(o),ma.applyMatrix4(n.matrixWorld);let c=e.ray.origin.distanceTo(ma);return c<e.near||c>e.far?null:{distance:c,point:ma.clone(),object:n}}function ga(n,t,e,i,s,r,a,o,l,c){n.getVertexPosition(o,ua),n.getVertexPosition(l,da),n.getVertexPosition(c,fa);let u=Wp(n,t,e,i,ua,da,fa,Fu);if(u){let d=new J;gi.getBarycoord(Fu,ua,da,fa,d),s&&(u.uv=gi.getInterpolatedAttribute(s,o,l,c,d,new Ct)),r&&(u.uv1=gi.getInterpolatedAttribute(r,o,l,c,d,new Ct)),a&&(u.normal=gi.getInterpolatedAttribute(a,o,l,c,d,new J),u.normal.dot(i.direction)>0&&u.normal.multiplyScalar(-1));let h={a:o,b:l,c,normal:new J,materialIndex:0};gi.getNormal(ua,da,fa,h.normal),u.face=h,u.barycoord=d}return u}var Ba=class extends je{constructor(t=null,e=1,i=1,s,r,a,o,l,c=Oe,u=Oe,d,h){super(null,a,o,l,c,u,s,r,d,h),this.isDataTexture=!0,this.image={data:t,width:e,height:i},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}};var ki=new Es,qp=new Ct(.5,.5),xa=new J,yi=class{constructor(t=new In,e=new In,i=new In,s=new In,r=new In,a=new In){this.planes=[t,e,i,s,r,a]}set(t,e,i,s,r,a){let o=this.planes;return o[0].copy(t),o[1].copy(e),o[2].copy(i),o[3].copy(s),o[4].copy(r),o[5].copy(a),this}copy(t){let e=this.planes;for(let i=0;i<6;i++)e[i].copy(t.planes[i]);return this}setFromProjectionMatrix(t,e=Mn,i=!1){let s=this.planes,r=t.elements,a=r[0],o=r[1],l=r[2],c=r[3],u=r[4],d=r[5],h=r[6],f=r[7],p=r[8],T=r[9],x=r[10],g=r[11],w=r[12],_=r[13],v=r[14],R=r[15];if(s[0].setComponents(c-a,f-u,g-p,R-w).normalize(),s[1].setComponents(c+a,f+u,g+p,R+w).normalize(),s[2].setComponents(c+o,f+d,g+T,R+_).normalize(),s[3].setComponents(c-o,f-d,g-T,R-_).normalize(),i)s[4].setComponents(l,h,x,v).normalize(),s[5].setComponents(c-l,f-h,g-x,R-v).normalize();else if(s[4].setComponents(c-l,f-h,g-x,R-v).normalize(),e===Mn)s[5].setComponents(c+l,f+h,g+x,R+v).normalize();else if(e===vs)s[5].setComponents(l,h,x,v).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+e);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),ki.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{let e=t.geometry;e.boundingSphere===null&&e.computeBoundingSphere(),ki.copy(e.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(ki)}intersectsSprite(t){ki.center.set(0,0,0);let e=qp.distanceTo(t.center);return ki.radius=.7071067811865476+e,ki.applyMatrix4(t.matrixWorld),this.intersectsSphere(ki)}intersectsSphere(t){let e=this.planes,i=t.center,s=-t.radius;for(let r=0;r<6;r++)if(e[r].distanceToPoint(i)<s)return!1;return!0}intersectsBox(t){let e=this.planes;for(let i=0;i<6;i++){let s=e[i];if(xa.x=s.normal.x>0?t.max.x:t.min.x,xa.y=s.normal.y>0?t.max.y:t.min.y,xa.z=s.normal.z>0?t.max.z:t.min.z,s.distanceToPoint(xa)<0)return!1}return!0}containsPoint(t){let e=this.planes;for(let i=0;i<6;i++)if(e[i].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}},Ou=new ye,ka=class n{constructor(){this.coordinateSystem=Mn,this._frustums=[],this._count=0}setFromArrayCamera(t){let e=t.cameras,i=this._frustums;for(let s=0;s<e.length;s++){let r=e[s];Ou.multiplyMatrices(r.projectionMatrix,r.matrixWorldInverse),i[s]===void 0&&(i[s]=new yi),i[s].setFromProjectionMatrix(Ou,r.coordinateSystem,r.reversedDepth)}return this._count=e.length,this}getFrustum(t){return this._frustums[t]}intersectsObject(t){let e=this._frustums;for(let i=0;i<this._count;i++)if(e[i].intersectsObject(t))return!0;return!1}intersectsSprite(t){let e=this._frustums;for(let i=0;i<this._count;i++)if(e[i].intersectsSprite(t))return!0;return!1}intersectsSphere(t){let e=this._frustums;for(let i=0;i<this._count;i++)if(e[i].intersectsSphere(t))return!0;return!1}intersectsBox(t){let e=this._frustums;for(let i=0;i<this._count;i++)if(e[i].intersectsBox(t))return!0;return!1}containsPoint(t){let e=this._frustums;for(let i=0;i<this._count;i++)if(e[i].containsPoint(t))return!0;return!1}copy(t){this.coordinateSystem=t.coordinateSystem;let e=this._frustums,i=t._frustums;for(let s=0;s<t._count;s++)e[s]===void 0&&(e[s]=new yi),e[s].copy(i[s]);return this._count=t._count,this}clone(){return new n().copy(this)}};var pr=class extends je{constructor(t=[],e=Zi,i,s,r,a,o,l,c,u){super(t,e,i,s,r,a,o,l,c,u),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}},vi=class extends je{constructor(t,e,i,s,r,a,o,l,c){super(t,e,i,s,r,a,o,l,c),this.isCanvasTexture=!0,this.needsUpdate=!0}};var ii=class extends je{constructor(t,e,i=Pn,s,r,a,o=Oe,l=Oe,c,u=ei,d=1){if(u!==ei&&u!==ri)throw new Error("THREE.DepthTexture: format must be either THREE.DepthFormat or THREE.DepthStencilFormat");let h={width:t,height:e,depth:d};super(h,s,r,a,o,l,u,i,c),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.source=new Ss(Object.assign({},t.image)),this.compareFunction=t.compareFunction,this}toJSON(t){let e=super.toJSON(t);return e.compareFunction=this.compareFunction,e}},mr=class extends ii{constructor(t,e=Pn,i=Zi,s,r,a=Oe,o=Oe,l,c=ei){let u={width:t,height:t,depth:1},d=[u,u,u,u,u,u];super(t,t,e,i,s,r,a,o,l,c),this.image=d,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(t){this.image=t}},gr=class extends je{constructor(t=null){super(),this.sourceTexture=t,this.isExternalTexture=!0}copy(t){return super.copy(t),this.sourceTexture=t.sourceTexture,this}},Mi=class n extends Vn{constructor(t=1,e=1,i=1,s=1,r=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:e,depth:i,widthSegments:s,heightSegments:r,depthSegments:a};let o=this;s=Math.floor(s),r=Math.floor(r),a=Math.floor(a);let l=[],c=[],u=[],d=[],h=0,f=0;p("z","y","x",-1,-1,i,e,t,a,r,0),p("z","y","x",1,-1,i,e,-t,a,r,1),p("x","z","y",1,1,t,i,e,s,a,2),p("x","z","y",1,-1,t,i,-e,s,a,3),p("x","y","z",1,-1,t,e,i,s,r,4),p("x","y","z",-1,-1,t,e,-i,s,r,5),this.setIndex(l),this.setAttribute("position",new ke(c,3)),this.setAttribute("normal",new ke(u,3)),this.setAttribute("uv",new ke(d,2));function p(T,x,g,w,_,v,R,N,m,M,L){let P=v/m,B=R/M,C=v/2,O=R/2,D=N/2,E=m+1,z=M+1,b=0,I=0,y=new J;for(let F=0;F<z;F++){let S=F*B-O;for(let U=0;U<E;U++){let V=U*P-C;y[T]=V*w,y[x]=S*_,y[g]=D,c.push(y.x,y.y,y.z),y[T]=0,y[x]=0,y[g]=N>0?1:-1,u.push(y.x,y.y,y.z),d.push(U/m),d.push(1-F/M),b+=1}}for(let F=0;F<M;F++)for(let S=0;S<m;S++){let U=h+S+E*F,V=h+S+E*(F+1),A=h+(S+1)+E*(F+1),q=h+(S+1)+E*F;l.push(U,V,q),l.push(V,A,q),I+=6}o.addGroup(f,I,L),f+=I,h+=b}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new n(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}};var gn=class{constructor(){this.type="Curve",this.arcLengthDivisions=200,this.needsUpdate=!1,this.cacheArcLengths=null}getPoint(){Xt("Curve: .getPoint() not implemented.")}getPointAt(t,e){let i=this.getUtoTmapping(t);return this.getPoint(i,e)}getPoints(t=5){let e=[];for(let i=0;i<=t;i++)e.push(this.getPoint(i/t));return e}getSpacedPoints(t=5){let e=[];for(let i=0;i<=t;i++)e.push(this.getPointAt(i/t));return e}getLength(){let t=this.getLengths();return t[t.length-1]}getLengths(t=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===t+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;let e=[],i,s=this.getPoint(0),r=0;e.push(0);for(let a=1;a<=t;a++)i=this.getPoint(a/t),r+=i.distanceTo(s),e.push(r),s=i;return this.cacheArcLengths=e,e}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(t,e=null){let i=this.getLengths(),s=0,r=i.length,a;e?a=e:a=t*i[r-1];let o=0,l=r-1,c;for(;o<=l;)if(s=Math.floor(o+(l-o)/2),c=i[s]-a,c<0)o=s+1;else if(c>0)l=s-1;else{l=s;break}if(s=l,i[s]===a)return s/(r-1);let u=i[s],h=i[s+1]-u,f=(a-u)/h;return(s+f)/(r-1)}getTangent(t,e){let s=t-1e-4,r=t+1e-4;s<0&&(s=0),r>1&&(r=1);let a=this.getPoint(s),o=this.getPoint(r),l=e||(a.isVector2?new Ct:new J);return l.copy(o).sub(a).normalize(),l}getTangentAt(t,e){let i=this.getUtoTmapping(t);return this.getTangent(i,e)}computeFrenetFrames(t,e=!1){let i=new J,s=[],r=[],a=[],o=new J,l=new ye;for(let f=0;f<=t;f++){let p=f/t;s[f]=this.getTangentAt(p,new J)}r[0]=new J,a[0]=new J;let c=Number.MAX_VALUE,u=Math.abs(s[0].x),d=Math.abs(s[0].y),h=Math.abs(s[0].z);u<=c&&(c=u,i.set(1,0,0)),d<=c&&(c=d,i.set(0,1,0)),h<=c&&i.set(0,0,1),o.crossVectors(s[0],i).normalize(),r[0].crossVectors(s[0],o),a[0].crossVectors(s[0],r[0]);for(let f=1;f<=t;f++){if(r[f]=r[f-1].clone(),a[f]=a[f-1].clone(),o.crossVectors(s[f-1],s[f]),o.length()>Number.EPSILON){o.normalize();let p=Math.acos(se(s[f-1].dot(s[f]),-1,1));r[f].applyMatrix4(l.makeRotationAxis(o,p))}a[f].crossVectors(s[f],r[f])}if(e===!0){let f=Math.acos(se(r[0].dot(r[t]),-1,1));f/=t,s[0].dot(o.crossVectors(r[0],r[t]))>0&&(f=-f);for(let p=1;p<=t;p++)r[p].applyMatrix4(l.makeRotationAxis(s[p],f*p)),a[p].crossVectors(s[p],r[p])}return{tangents:s,normals:r,binormals:a}}clone(){return new this.constructor().copy(this)}copy(t){return this.arcLengthDivisions=t.arcLengthDivisions,this.cacheArcLengths=null,this}toJSON(){let t={metadata:{version:4.7,type:"Curve",generator:"Curve.toJSON"}};return t.arcLengthDivisions=this.arcLengthDivisions,t.type=this.type,t}fromJSON(t){return this.arcLengthDivisions=t.arcLengthDivisions,this.cacheArcLengths=null,this}},As=class extends gn{constructor(t=0,e=0,i=1,s=1,r=0,a=Math.PI*2,o=!1,l=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=t,this.aY=e,this.xRadius=i,this.yRadius=s,this.aStartAngle=r,this.aEndAngle=a,this.aClockwise=o,this.aRotation=l}getPoint(t,e=new Ct){let i=e,s=Math.PI*2,r=this.aEndAngle-this.aStartAngle,a=Math.abs(r)<Number.EPSILON;for(;r<0;)r+=s;for(;r>s;)r-=s;r<Number.EPSILON&&(a?r=0:r=s),this.aClockwise===!0&&!a&&(r===s?r=-s:r=r-s);let o=this.aStartAngle+t*r,l=this.aX+this.xRadius*Math.cos(o),c=this.aY+this.yRadius*Math.sin(o);if(this.aRotation!==0){let u=Math.cos(this.aRotation),d=Math.sin(this.aRotation),h=l-this.aX,f=c-this.aY;l=h*u-f*d+this.aX,c=h*d+f*u+this.aY}return i.set(l,c)}copy(t){return super.copy(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}toJSON(){let t=super.toJSON();return t.aX=this.aX,t.aY=this.aY,t.xRadius=this.xRadius,t.yRadius=this.yRadius,t.aStartAngle=this.aStartAngle,t.aEndAngle=this.aEndAngle,t.aClockwise=this.aClockwise,t.aRotation=this.aRotation,t}fromJSON(t){return super.fromJSON(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}},za=class extends As{constructor(t,e,i,s,r,a){super(t,e,i,i,s,r,a),this.isArcCurve=!0,this.type="ArcCurve"}};function ah(){let n=0,t=0,e=0,i=0;function s(r,a,o,l){n=r,t=o,e=-3*r+3*a-2*o-l,i=2*r-2*a+o+l}return{initCatmullRom:function(r,a,o,l,c){s(a,o,c*(o-r),c*(l-a))},initNonuniformCatmullRom:function(r,a,o,l,c,u,d){let h=(a-r)/c-(o-r)/(c+u)+(o-a)/u,f=(o-a)/u-(l-a)/(u+d)+(l-o)/d;h*=u,f*=u,s(a,o,h,f)},calc:function(r){let a=r*r,o=a*r;return n+t*r+e*a+i*o}}}var Bu=new J,ku=new J,gc=new ah,xc=new ah,_c=new ah,Ga=class extends gn{constructor(t=[],e=!1,i="centripetal",s=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=t,this.closed=e,this.curveType=i,this.tension=s}getPoint(t,e=new J){let i=e,s=this.points,r=s.length,a=(r-(this.closed?0:1))*t,o=Math.floor(a),l=a-o;this.closed?o+=o>0?0:(Math.floor(Math.abs(o)/r)+1)*r:l===0&&o===r-1&&(o=r-2,l=1);let c,u;this.closed||o>0?c=s[(o-1)%r]:(ku.subVectors(s[0],s[1]).add(s[0]),c=ku);let d=s[o%r],h=s[(o+1)%r];if(this.closed||o+2<r?u=s[(o+2)%r]:(Bu.subVectors(s[r-1],s[r-2]).add(s[r-1]),u=Bu),this.curveType==="centripetal"||this.curveType==="chordal"){let f=this.curveType==="chordal"?.5:.25,p=Math.pow(c.distanceToSquared(d),f),T=Math.pow(d.distanceToSquared(h),f),x=Math.pow(h.distanceToSquared(u),f);T<1e-4&&(T=1),p<1e-4&&(p=T),x<1e-4&&(x=T),gc.initNonuniformCatmullRom(c.x,d.x,h.x,u.x,p,T,x),xc.initNonuniformCatmullRom(c.y,d.y,h.y,u.y,p,T,x),_c.initNonuniformCatmullRom(c.z,d.z,h.z,u.z,p,T,x)}else this.curveType==="catmullrom"&&(gc.initCatmullRom(c.x,d.x,h.x,u.x,this.tension),xc.initCatmullRom(c.y,d.y,h.y,u.y,this.tension),_c.initCatmullRom(c.z,d.z,h.z,u.z,this.tension));return i.set(gc.calc(l),xc.calc(l),_c.calc(l)),i}copy(t){super.copy(t),this.points=[];for(let e=0,i=t.points.length;e<i;e++){let s=t.points[e];this.points.push(s.clone())}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}toJSON(){let t=super.toJSON();t.points=[];for(let e=0,i=this.points.length;e<i;e++){let s=this.points[e];t.points.push(s.toArray())}return t.closed=this.closed,t.curveType=this.curveType,t.tension=this.tension,t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,i=t.points.length;e<i;e++){let s=t.points[e];this.points.push(new J().fromArray(s))}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}};function zu(n,t,e,i,s){let r=(i-t)*.5,a=(s-e)*.5,o=n*n,l=n*o;return(2*e-2*i+r+a)*l+(-3*e+3*i-2*r-a)*o+r*n+e}function Xp(n,t){let e=1-n;return e*e*t}function Yp(n,t){return 2*(1-n)*n*t}function $p(n,t){return n*n*t}function sr(n,t,e,i){return Xp(n,t)+Yp(n,e)+$p(n,i)}function Zp(n,t){let e=1-n;return e*e*e*t}function Kp(n,t){let e=1-n;return 3*e*e*n*t}function Jp(n,t){return 3*(1-n)*n*n*t}function Qp(n,t){return n*n*n*t}function rr(n,t,e,i,s){return Zp(n,t)+Kp(n,e)+Jp(n,i)+Qp(n,s)}var xr=class extends gn{constructor(t=new Ct,e=new Ct,i=new Ct,s=new Ct){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=t,this.v1=e,this.v2=i,this.v3=s}getPoint(t,e=new Ct){let i=e,s=this.v0,r=this.v1,a=this.v2,o=this.v3;return i.set(rr(t,s.x,r.x,a.x,o.x),rr(t,s.y,r.y,a.y,o.y)),i}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){let t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}},Va=class extends gn{constructor(t=new J,e=new J,i=new J,s=new J){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=t,this.v1=e,this.v2=i,this.v3=s}getPoint(t,e=new J){let i=e,s=this.v0,r=this.v1,a=this.v2,o=this.v3;return i.set(rr(t,s.x,r.x,a.x,o.x),rr(t,s.y,r.y,a.y,o.y),rr(t,s.z,r.z,a.z,o.z)),i}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){let t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}},_r=class extends gn{constructor(t=new Ct,e=new Ct){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=t,this.v2=e}getPoint(t,e=new Ct){let i=e;return t===1?i.copy(this.v2):(i.copy(this.v2).sub(this.v1),i.multiplyScalar(t).add(this.v1)),i}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new Ct){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){let t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}},Ha=class extends gn{constructor(t=new J,e=new J){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=t,this.v2=e}getPoint(t,e=new J){let i=e;return t===1?i.copy(this.v2):(i.copy(this.v2).sub(this.v1),i.multiplyScalar(t).add(this.v1)),i}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new J){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){let t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}},yr=class extends gn{constructor(t=new Ct,e=new Ct,i=new Ct){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=t,this.v1=e,this.v2=i}getPoint(t,e=new Ct){let i=e,s=this.v0,r=this.v1,a=this.v2;return i.set(sr(t,s.x,r.x,a.x),sr(t,s.y,r.y,a.y)),i}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){let t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}},Wa=class extends gn{constructor(t=new J,e=new J,i=new J){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=t,this.v1=e,this.v2=i}getPoint(t,e=new J){let i=e,s=this.v0,r=this.v1,a=this.v2;return i.set(sr(t,s.x,r.x,a.x),sr(t,s.y,r.y,a.y),sr(t,s.z,r.z,a.z)),i}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){let t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}},vr=class extends gn{constructor(t=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=t}getPoint(t,e=new Ct){let i=e,s=this.points,r=(s.length-1)*t,a=Math.floor(r),o=r-a,l=s[a===0?a:a-1],c=s[a],u=s[a>s.length-2?s.length-1:a+1],d=s[a>s.length-3?s.length-1:a+2];return i.set(zu(o,l.x,c.x,u.x,d.x),zu(o,l.y,c.y,u.y,d.y)),i}copy(t){super.copy(t),this.points=[];for(let e=0,i=t.points.length;e<i;e++){let s=t.points[e];this.points.push(s.clone())}return this}toJSON(){let t=super.toJSON();t.points=[];for(let e=0,i=this.points.length;e<i;e++){let s=this.points[e];t.points.push(s.toArray())}return t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,i=t.points.length;e<i;e++){let s=t.points[e];this.points.push(new Ct().fromArray(s))}return this}},wc=Object.freeze({__proto__:null,ArcCurve:za,CatmullRomCurve3:Ga,CubicBezierCurve:xr,CubicBezierCurve3:Va,EllipseCurve:As,LineCurve:_r,LineCurve3:Ha,QuadraticBezierCurve:yr,QuadraticBezierCurve3:Wa,SplineCurve:vr}),qa=class extends gn{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1,this.cacheLengths=null}add(t){this.curves.push(t)}closePath(){let t=this.curves[0].getPoint(0),e=this.curves[this.curves.length-1].getPoint(1);if(!t.equals(e)){let i=t.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new wc[i](e,t))}return this}getPoint(t,e){let i=t*this.getLength(),s=this.getCurveLengths(),r=0;for(;r<s.length;){if(s[r]>=i){let a=s[r]-i,o=this.curves[r],l=o.getLength(),c=l===0?0:1-a/l;return o.getPointAt(c,e)}r++}return null}getLength(){let t=this.getCurveLengths();return t[t.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;let t=[],e=0;for(let i=0,s=this.curves.length;i<s;i++)e+=this.curves[i].getLength(),t.push(e);return this.cacheLengths=t,t}getSpacedPoints(t=40){let e=[];for(let i=0;i<=t;i++)e.push(this.getPoint(i/t));return this.autoClose&&e.push(e[0]),e}getPoints(t=12){let e=[],i;for(let s=0,r=this.curves;s<r.length;s++){let a=r[s],o=a.isEllipseCurve?t*2:a.isLineCurve||a.isLineCurve3?1:a.isSplineCurve?t*a.points.length:t,l=a.getPoints(o);for(let c=0;c<l.length;c++){let u=l[c];i&&i.equals(u)||(e.push(u),i=u)}}return this.autoClose&&e.length>1&&!e[e.length-1].equals(e[0])&&e.push(e[0]),e}copy(t){super.copy(t),this.curves=[];for(let e=0,i=t.curves.length;e<i;e++){let s=t.curves[e];this.curves.push(s.clone())}return this.autoClose=t.autoClose,this.cacheLengths=null,this}toJSON(){let t=super.toJSON();t.autoClose=this.autoClose,t.curves=[];for(let e=0,i=this.curves.length;e<i;e++){let s=this.curves[e];t.curves.push(s.toJSON())}return t}fromJSON(t){super.fromJSON(t),this.autoClose=t.autoClose,this.curves=[];for(let e=0,i=t.curves.length;e<i;e++){let s=t.curves[e];this.curves.push(new wc[s.type]().fromJSON(s))}return this.cacheLengths=null,this}},Wi=class extends qa{constructor(t){super(),this.type="Path",this.currentPoint=new Ct,t&&this.setFromPoints(t)}setFromPoints(t){this.moveTo(t[0].x,t[0].y);for(let e=1,i=t.length;e<i;e++)this.lineTo(t[e].x,t[e].y);return this}moveTo(t,e){return this.currentPoint.set(t,e),this}lineTo(t,e){let i=new _r(this.currentPoint.clone(),new Ct(t,e));return this.curves.push(i),this.currentPoint.set(t,e),this}quadraticCurveTo(t,e,i,s){let r=new yr(this.currentPoint.clone(),new Ct(t,e),new Ct(i,s));return this.curves.push(r),this.currentPoint.set(i,s),this}bezierCurveTo(t,e,i,s,r,a){let o=new xr(this.currentPoint.clone(),new Ct(t,e),new Ct(i,s),new Ct(r,a));return this.curves.push(o),this.currentPoint.set(r,a),this}splineThru(t){let e=[this.currentPoint.clone()].concat(t),i=new vr(e);return this.curves.push(i),this.currentPoint.copy(t[t.length-1]),this}arc(t,e,i,s,r,a){let o=this.currentPoint.x,l=this.currentPoint.y;return this.absarc(t+o,e+l,i,s,r,a),this}absarc(t,e,i,s,r,a){return this.absellipse(t,e,i,i,s,r,a),this}ellipse(t,e,i,s,r,a,o,l){let c=this.currentPoint.x,u=this.currentPoint.y;return this.absellipse(t+c,e+u,i,s,r,a,o,l),this}absellipse(t,e,i,s,r,a,o,l){let c=new As(t,e,i,s,r,a,o,l);if(this.curves.length>0){let d=c.getPoint(0);d.equals(this.currentPoint)||this.lineTo(d.x,d.y)}this.curves.push(c);let u=c.getPoint(1);return this.currentPoint.copy(u),this}copy(t){return super.copy(t),this.currentPoint.copy(t.currentPoint),this}toJSON(){let t=super.toJSON();return t.currentPoint=this.currentPoint.toArray(),t}fromJSON(t){return super.fromJSON(t),this.currentPoint.fromArray(t.currentPoint),this}},Cs=class extends Wi{constructor(t){super(t),this.uuid=Fs(),this.type="Shape",this.holes=[]}getPointsHoles(t){let e=[];for(let i=0,s=this.holes.length;i<s;i++)e[i]=this.holes[i].getPoints(t);return e}extractPoints(t){return{shape:this.getPoints(t),holes:this.getPointsHoles(t)}}copy(t){super.copy(t),this.holes=[];for(let e=0,i=t.holes.length;e<i;e++){let s=t.holes[e];this.holes.push(s.clone())}return this}toJSON(){let t=super.toJSON();t.uuid=this.uuid,t.holes=[];for(let e=0,i=this.holes.length;e<i;e++){let s=this.holes[e];t.holes.push(s.toJSON())}return t}fromJSON(t){super.fromJSON(t),this.uuid=t.uuid,this.holes=[];for(let e=0,i=t.holes.length;e<i;e++){let s=t.holes[e];this.holes.push(new Wi().fromJSON(s))}return this}};function jp(n,t,e=2){let i=t&&t.length,s=i?t[0]*e:n.length,r=Bd(n,0,s,e,!0),a=[];if(!r||r.next===r.prev)return a;let o,l,c;if(i&&(r=sm(n,t,r,e)),n.length>80*e){o=n[0],l=n[1];let u=o,d=l;for(let h=e;h<s;h+=e){let f=n[h],p=n[h+1];f<o&&(o=f),p<l&&(l=p),f>u&&(u=f),p>d&&(d=p)}c=Math.max(u-o,d-l),c=c!==0?32767/c:0}return Mr(r,a,e,o,l,c,0),a}function Bd(n,t,e,i,s){let r;if(s===mm(n,t,e,i)>0)for(let a=t;a<e;a+=i)r=Gu(a/i|0,n[a],n[a+1],r);else for(let a=e-i;a>=t;a-=i)r=Gu(a/i|0,n[a],n[a+1],r);return r&&Rs(r,r.next)&&(br(r),r=r.next),r}function qi(n,t){if(!n)return n;t||(t=n);let e=n,i;do if(i=!1,!e.steiner&&(Rs(e,e.next)||we(e.prev,e,e.next)===0)){if(br(e),e=t=e.prev,e===e.next)break;i=!0}else e=e.next;while(i||e!==t);return t}function Mr(n,t,e,i,s,r,a){if(!n)return;!a&&r&&cm(n,i,s,r);let o=n;for(;n.prev!==n.next;){let l=n.prev,c=n.next;if(r?em(n,i,s,r):tm(n)){t.push(l.i,n.i,c.i),br(n),n=c.next,o=c.next;continue}if(n=c,n===o){a?a===1?(n=nm(qi(n),t),Mr(n,t,e,i,s,r,2)):a===2&&im(n,t,e,i,s,r):Mr(qi(n),t,e,i,s,r,1);break}}}function tm(n){let t=n.prev,e=n,i=n.next;if(we(t,e,i)>=0)return!1;let s=t.x,r=e.x,a=i.x,o=t.y,l=e.y,c=i.y,u=Math.min(s,r,a),d=Math.min(o,l,c),h=Math.max(s,r,a),f=Math.max(o,l,c),p=i.next;for(;p!==t;){if(p.x>=u&&p.x<=h&&p.y>=d&&p.y<=f&&ir(s,o,r,l,a,c,p.x,p.y)&&we(p.prev,p,p.next)>=0)return!1;p=p.next}return!0}function em(n,t,e,i){let s=n.prev,r=n,a=n.next;if(we(s,r,a)>=0)return!1;let o=s.x,l=r.x,c=a.x,u=s.y,d=r.y,h=a.y,f=Math.min(o,l,c),p=Math.min(u,d,h),T=Math.max(o,l,c),x=Math.max(u,d,h),g=Tc(f,p,t,e,i),w=Tc(T,x,t,e,i),_=n.prevZ,v=n.nextZ;for(;_&&_.z>=g&&v&&v.z<=w;){if(_.x>=f&&_.x<=T&&_.y>=p&&_.y<=x&&_!==s&&_!==a&&ir(o,u,l,d,c,h,_.x,_.y)&&we(_.prev,_,_.next)>=0||(_=_.prevZ,v.x>=f&&v.x<=T&&v.y>=p&&v.y<=x&&v!==s&&v!==a&&ir(o,u,l,d,c,h,v.x,v.y)&&we(v.prev,v,v.next)>=0))return!1;v=v.nextZ}for(;_&&_.z>=g;){if(_.x>=f&&_.x<=T&&_.y>=p&&_.y<=x&&_!==s&&_!==a&&ir(o,u,l,d,c,h,_.x,_.y)&&we(_.prev,_,_.next)>=0)return!1;_=_.prevZ}for(;v&&v.z<=w;){if(v.x>=f&&v.x<=T&&v.y>=p&&v.y<=x&&v!==s&&v!==a&&ir(o,u,l,d,c,h,v.x,v.y)&&we(v.prev,v,v.next)>=0)return!1;v=v.nextZ}return!0}function nm(n,t){let e=n;do{let i=e.prev,s=e.next.next;!Rs(i,s)&&zd(i,e,e.next,s)&&Sr(i,s)&&Sr(s,i)&&(t.push(i.i,e.i,s.i),br(e),br(e.next),e=n=s),e=e.next}while(e!==n);return qi(e)}function im(n,t,e,i,s,r){let a=n;do{let o=a.next.next;for(;o!==a.prev;){if(a.i!==o.i&&dm(a,o)){let l=Gd(a,o);a=qi(a,a.next),l=qi(l,l.next),Mr(a,t,e,i,s,r,0),Mr(l,t,e,i,s,r,0);return}o=o.next}a=a.next}while(a!==n)}function sm(n,t,e,i){let s=[];for(let r=0,a=t.length;r<a;r++){let o=t[r]*i,l=r<a-1?t[r+1]*i:n.length,c=Bd(n,o,l,i,!1);c===c.next&&(c.steiner=!0),s.push(um(c))}s.sort(rm);for(let r=0;r<s.length;r++)e=am(s[r],e);return e}function rm(n,t){let e=n.x-t.x;if(e===0&&(e=n.y-t.y,e===0)){let i=(n.next.y-n.y)/(n.next.x-n.x),s=(t.next.y-t.y)/(t.next.x-t.x);e=i-s}return e}function am(n,t){let e=om(n,t);if(!e)return t;let i=Gd(e,n);return qi(i,i.next),qi(e,e.next)}function om(n,t){let e=t,i=n.x,s=n.y,r=-1/0,a;if(Rs(n,e))return e;do{if(Rs(n,e.next))return e.next;if(s<=e.y&&s>=e.next.y&&e.next.y!==e.y){let d=e.x+(s-e.y)*(e.next.x-e.x)/(e.next.y-e.y);if(d<=i&&d>r&&(r=d,a=e.x<e.next.x?e:e.next,d===i))return a}e=e.next}while(e!==t);if(!a)return null;let o=a,l=a.x,c=a.y,u=1/0;e=a;do{if(i>=e.x&&e.x>=l&&i!==e.x&&kd(s<c?i:r,s,l,c,s<c?r:i,s,e.x,e.y)){let d=Math.abs(s-e.y)/(i-e.x);Sr(e,n)&&(d<u||d===u&&(e.x>a.x||e.x===a.x&&lm(a,e)))&&(a=e,u=d)}e=e.next}while(e!==o);return a}function lm(n,t){return we(n.prev,n,t.prev)<0&&we(t.next,n,n.next)<0}function cm(n,t,e,i){let s=n;do s.z===0&&(s.z=Tc(s.x,s.y,t,e,i)),s.prevZ=s.prev,s.nextZ=s.next,s=s.next;while(s!==n);s.prevZ.nextZ=null,s.prevZ=null,hm(s)}function hm(n){let t,e=1;do{let i=n,s;n=null;let r=null;for(t=0;i;){t++;let a=i,o=0;for(let c=0;c<e&&(o++,a=a.nextZ,!!a);c++);let l=e;for(;o>0||l>0&&a;)o!==0&&(l===0||!a||i.z<=a.z)?(s=i,i=i.nextZ,o--):(s=a,a=a.nextZ,l--),r?r.nextZ=s:n=s,s.prevZ=r,r=s;i=a}r.nextZ=null,e*=2}while(t>1);return n}function Tc(n,t,e,i,s){return n=(n-e)*s|0,t=(t-i)*s|0,n=(n|n<<8)&16711935,n=(n|n<<4)&252645135,n=(n|n<<2)&858993459,n=(n|n<<1)&1431655765,t=(t|t<<8)&16711935,t=(t|t<<4)&252645135,t=(t|t<<2)&858993459,t=(t|t<<1)&1431655765,n|t<<1}function um(n){let t=n,e=n;do(t.x<e.x||t.x===e.x&&t.y<e.y)&&(e=t),t=t.next;while(t!==n);return e}function kd(n,t,e,i,s,r,a,o){return(s-a)*(t-o)>=(n-a)*(r-o)&&(n-a)*(i-o)>=(e-a)*(t-o)&&(e-a)*(r-o)>=(s-a)*(i-o)}function ir(n,t,e,i,s,r,a,o){return!(n===a&&t===o)&&kd(n,t,e,i,s,r,a,o)}function dm(n,t){return n.next.i!==t.i&&n.prev.i!==t.i&&!fm(n,t)&&(Sr(n,t)&&Sr(t,n)&&pm(n,t)&&(we(n.prev,n,t.prev)||we(n,t.prev,t))||Rs(n,t)&&we(n.prev,n,n.next)>0&&we(t.prev,t,t.next)>0)}function we(n,t,e){return(t.y-n.y)*(e.x-t.x)-(t.x-n.x)*(e.y-t.y)}function Rs(n,t){return n.x===t.x&&n.y===t.y}function zd(n,t,e,i){let s=ya(we(n,t,e)),r=ya(we(n,t,i)),a=ya(we(e,i,n)),o=ya(we(e,i,t));return!!(s!==r&&a!==o||s===0&&_a(n,e,t)||r===0&&_a(n,i,t)||a===0&&_a(e,n,i)||o===0&&_a(e,t,i))}function _a(n,t,e){return t.x<=Math.max(n.x,e.x)&&t.x>=Math.min(n.x,e.x)&&t.y<=Math.max(n.y,e.y)&&t.y>=Math.min(n.y,e.y)}function ya(n){return n>0?1:n<0?-1:0}function fm(n,t){let e=n;do{if(e.i!==n.i&&e.next.i!==n.i&&e.i!==t.i&&e.next.i!==t.i&&zd(e,e.next,n,t))return!0;e=e.next}while(e!==n);return!1}function Sr(n,t){return we(n.prev,n,n.next)<0?we(n,t,n.next)>=0&&we(n,n.prev,t)>=0:we(n,t,n.prev)<0||we(n,n.next,t)<0}function pm(n,t){let e=n,i=!1,s=(n.x+t.x)/2,r=(n.y+t.y)/2;do e.y>r!=e.next.y>r&&e.next.y!==e.y&&s<(e.next.x-e.x)*(r-e.y)/(e.next.y-e.y)+e.x&&(i=!i),e=e.next;while(e!==n);return i}function Gd(n,t){let e=Ec(n.i,n.x,n.y),i=Ec(t.i,t.x,t.y),s=n.next,r=t.prev;return n.next=t,t.prev=n,e.next=s,s.prev=e,i.next=e,e.prev=i,r.next=i,i.prev=r,i}function Gu(n,t,e,i){let s=Ec(n,t,e);return i?(s.next=i.next,s.prev=i,i.next.prev=s,i.next=s):(s.prev=s,s.next=s),s}function br(n){n.next.prev=n.prev,n.prev.next=n.next,n.prevZ&&(n.prevZ.nextZ=n.nextZ),n.nextZ&&(n.nextZ.prevZ=n.prevZ)}function Ec(n,t,e){return{i:n,x:t,y:e,prev:null,next:null,z:0,prevZ:null,nextZ:null,steiner:!1}}function mm(n,t,e,i){let s=0;for(let r=t,a=e-i;r<e;r+=i)s+=(n[a]-n[r])*(n[r+1]+n[a+1]),a=r;return s}var Ac=class{static triangulate(t,e,i=2){return jp(t,e,i)}},zi=class n{static area(t){let e=t.length,i=0;for(let s=e-1,r=0;r<e;s=r++)i+=t[s].x*t[r].y-t[r].x*t[s].y;return i*.5}static isClockWise(t){return n.area(t)<0}static triangulateShape(t,e){let i=[],s=[],r=[];Vu(t),Hu(i,t);let a=t.length;e.forEach(Vu);for(let l=0;l<e.length;l++)s.push(a),a+=e[l].length,Hu(i,e[l]);let o=Ac.triangulate(i,s);for(let l=0;l<o.length;l+=3)r.push(o.slice(l,l+3));return r}};function Vu(n){let t=n.length;t>2&&n[t-1].equals(n[0])&&n.pop()}function Hu(n,t){for(let e=0;e<t.length;e++)n.push(t[e].x),n.push(t[e].y)}var wr=class n extends Vn{constructor(t=new Cs([new Ct(.5,.5),new Ct(-.5,.5),new Ct(-.5,-.5),new Ct(.5,-.5)]),e={}){super(),this.type="ExtrudeGeometry",this.parameters={shapes:t,options:e},t=Array.isArray(t)?t:[t];let i=this,s=[],r=[];for(let o=0,l=t.length;o<l;o++){let c=t[o];a(c)}this.setAttribute("position",new ke(s,3)),this.setAttribute("uv",new ke(r,2)),this.computeVertexNormals();function a(o){let l=[],c=e.curveSegments!==void 0?e.curveSegments:12,u=e.steps!==void 0?e.steps:1,d=e.depth!==void 0?e.depth:1,h=e.bevelEnabled!==void 0?e.bevelEnabled:!0,f=e.bevelThickness!==void 0?e.bevelThickness:.2,p=e.bevelSize!==void 0?e.bevelSize:f-.1,T=e.bevelOffset!==void 0?e.bevelOffset:0,x=e.bevelSegments!==void 0?e.bevelSegments:3,g=e.extrudePath,w=e.UVGenerator!==void 0?e.UVGenerator:gm,_,v=!1,R,N,m,M;if(g){_=g.getSpacedPoints(u),v=!0,h=!1;let nt=g.isCatmullRomCurve3?g.closed:!1;R=g.computeFrenetFrames(u,nt),N=new J,m=new J,M=new J}h||(x=0,f=0,p=0,T=0);let L=o.extractPoints(c),P=L.shape,B=L.holes;if(!zi.isClockWise(P)){P=P.reverse();for(let nt=0,dt=B.length;nt<dt;nt++){let pt=B[nt];zi.isClockWise(pt)&&(B[nt]=pt.reverse())}}function O(nt){let pt=10000000000000001e-36,bt=nt[0];for(let Rt=1;Rt<=nt.length;Rt++){let Qt=Rt%nt.length,Gt=nt[Qt],re=Gt.x-bt.x,ae=Gt.y-bt.y,ue=re*re+ae*ae,K=Math.max(Math.abs(Gt.x),Math.abs(Gt.y),Math.abs(bt.x),Math.abs(bt.y)),Ce=pt*K*K;if(ue<=Ce){nt.splice(Qt,1),Rt--;continue}bt=Gt}}O(P),B.forEach(O);let D=B.length,E=P;for(let nt=0;nt<D;nt++){let dt=B[nt];P=P.concat(dt)}function z(nt,dt,pt){return dt||Yt("ExtrudeGeometry: vec does not exist"),nt.clone().addScaledVector(dt,pt)}let b=P.length;function I(nt,dt,pt){let bt,Rt,Qt,Gt=nt.x-dt.x,re=nt.y-dt.y,ae=pt.x-nt.x,ue=pt.y-nt.y,K=Gt*Gt+re*re,Ce=Gt*ue-re*ae;if(Math.abs(Ce)>Number.EPSILON){let ie=Math.sqrt(K),me=Math.sqrt(ae*ae+ue*ue),Tt=dt.x-re/ie,Te=dt.y+Gt/ie,Wt=pt.x-ue/me,$t=pt.y+ae/me,H=((Wt-Tt)*ue-($t-Te)*ae)/(Gt*ue-re*ae);bt=Tt+Gt*H-nt.x,Rt=Te+re*H-nt.y;let k=bt*bt+Rt*Rt;if(k<=2)return new Ct(bt,Rt);Qt=Math.sqrt(k/2)}else{let ie=!1;Gt>Number.EPSILON?ae>Number.EPSILON&&(ie=!0):Gt<-Number.EPSILON?ae<-Number.EPSILON&&(ie=!0):Math.sign(re)===Math.sign(ue)&&(ie=!0),ie?(bt=-re,Rt=Gt,Qt=Math.sqrt(K)):(bt=Gt,Rt=re,Qt=Math.sqrt(K/2))}return new Ct(bt/Qt,Rt/Qt)}let y=[];for(let nt=0,dt=E.length,pt=dt-1,bt=nt+1;nt<dt;nt++,pt++,bt++)pt===dt&&(pt=0),bt===dt&&(bt=0),y[nt]=I(E[nt],E[pt],E[bt]);let F=[],S,U=y.concat();for(let nt=0,dt=D;nt<dt;nt++){let pt=B[nt];S=[];for(let bt=0,Rt=pt.length,Qt=Rt-1,Gt=bt+1;bt<Rt;bt++,Qt++,Gt++)Qt===Rt&&(Qt=0),Gt===Rt&&(Gt=0),S[bt]=I(pt[bt],pt[Qt],pt[Gt]);F.push(S),U=U.concat(S)}let V;if(x===0)V=zi.triangulateShape(E,B);else{let nt=[],dt=[];for(let pt=0;pt<x;pt++){let bt=pt/x,Rt=f*Math.cos(bt*Math.PI/2),Qt=p*Math.sin(bt*Math.PI/2)+T;for(let Gt=0,re=E.length;Gt<re;Gt++){let ae=z(E[Gt],y[Gt],Qt);et(ae.x,ae.y,-Rt),bt===0&&nt.push(ae)}for(let Gt=0,re=D;Gt<re;Gt++){let ae=B[Gt];S=F[Gt];let ue=[];for(let K=0,Ce=ae.length;K<Ce;K++){let ie=z(ae[K],S[K],Qt);et(ie.x,ie.y,-Rt),bt===0&&ue.push(ie)}bt===0&&dt.push(ue)}}V=zi.triangulateShape(nt,dt)}let A=V.length,q=p+T;for(let nt=0;nt<b;nt++){let dt=h?z(P[nt],U[nt],q):P[nt];v?(m.copy(R.normals[0]).multiplyScalar(dt.x),N.copy(R.binormals[0]).multiplyScalar(dt.y),M.copy(_[0]).add(m).add(N),et(M.x,M.y,M.z)):et(dt.x,dt.y,0)}for(let nt=1;nt<=u;nt++)for(let dt=0;dt<b;dt++){let pt=h?z(P[dt],U[dt],q):P[dt];v?(m.copy(R.normals[nt]).multiplyScalar(pt.x),N.copy(R.binormals[nt]).multiplyScalar(pt.y),M.copy(_[nt]).add(m).add(N),et(M.x,M.y,M.z)):et(pt.x,pt.y,d/u*nt)}for(let nt=x-1;nt>=0;nt--){let dt=nt/x,pt=f*Math.cos(dt*Math.PI/2),bt=p*Math.sin(dt*Math.PI/2)+T;for(let Rt=0,Qt=E.length;Rt<Qt;Rt++){let Gt=z(E[Rt],y[Rt],bt);et(Gt.x,Gt.y,d+pt)}for(let Rt=0,Qt=B.length;Rt<Qt;Rt++){let Gt=B[Rt];S=F[Rt];for(let re=0,ae=Gt.length;re<ae;re++){let ue=z(Gt[re],S[re],bt);v?et(ue.x,ue.y+_[u-1].y,_[u-1].x+pt):et(ue.x,ue.y,d+pt)}}}W(),Z();function W(){let nt=s.length/3;if(h){let dt=0,pt=b*dt;for(let bt=0;bt<A;bt++){let Rt=V[bt];ft(Rt[2]+pt,Rt[1]+pt,Rt[0]+pt)}dt=u+x*2,pt=b*dt;for(let bt=0;bt<A;bt++){let Rt=V[bt];ft(Rt[0]+pt,Rt[1]+pt,Rt[2]+pt)}}else{for(let dt=0;dt<A;dt++){let pt=V[dt];ft(pt[2],pt[1],pt[0])}for(let dt=0;dt<A;dt++){let pt=V[dt];ft(pt[0]+b*u,pt[1]+b*u,pt[2]+b*u)}}i.addGroup(nt,s.length/3-nt,0)}function Z(){let nt=s.length/3,dt=0;Y(E,dt),dt+=E.length;for(let pt=0,bt=B.length;pt<bt;pt++){let Rt=B[pt];Y(Rt,dt),dt+=Rt.length}i.addGroup(nt,s.length/3-nt,1)}function Y(nt,dt){let pt=nt.length;for(;--pt>=0;){let bt=pt,Rt=pt-1;Rt<0&&(Rt=nt.length-1);for(let Qt=0,Gt=u+x*2;Qt<Gt;Qt++){let re=b*Qt,ae=b*(Qt+1),ue=dt+bt+re,K=dt+Rt+re,Ce=dt+Rt+ae,ie=dt+bt+ae;ct(ue,K,Ce,ie)}}}function et(nt,dt,pt){l.push(nt),l.push(dt),l.push(pt)}function ft(nt,dt,pt){ut(nt),ut(dt),ut(pt);let bt=s.length/3,Rt=w.generateTopUV(i,s,bt-3,bt-2,bt-1);_t(Rt[0]),_t(Rt[1]),_t(Rt[2])}function ct(nt,dt,pt,bt){ut(nt),ut(dt),ut(bt),ut(dt),ut(pt),ut(bt);let Rt=s.length/3,Qt=w.generateSideWallUV(i,s,Rt-6,Rt-3,Rt-2,Rt-1);_t(Qt[0]),_t(Qt[1]),_t(Qt[3]),_t(Qt[1]),_t(Qt[2]),_t(Qt[3])}function ut(nt){s.push(l[nt*3+0]),s.push(l[nt*3+1]),s.push(l[nt*3+2])}function _t(nt){r.push(nt.x),r.push(nt.y)}}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}toJSON(){let t=super.toJSON(),e=this.parameters.shapes,i=this.parameters.options;return xm(e,i,t)}static fromJSON(t,e){let i=[];for(let r=0,a=t.shapes.length;r<a;r++){let o=e[t.shapes[r]];i.push(o)}let s=t.options.extrudePath;return s!==void 0&&(t.options.extrudePath=new wc[s.type]().fromJSON(s)),new n(i,t.options)}},gm={generateTopUV:function(n,t,e,i,s){let r=t[e*3],a=t[e*3+1],o=t[i*3],l=t[i*3+1],c=t[s*3],u=t[s*3+1];return[new Ct(r,a),new Ct(o,l),new Ct(c,u)]},generateSideWallUV:function(n,t,e,i,s,r){let a=t[e*3],o=t[e*3+1],l=t[e*3+2],c=t[i*3],u=t[i*3+1],d=t[i*3+2],h=t[s*3],f=t[s*3+1],p=t[s*3+2],T=t[r*3],x=t[r*3+1],g=t[r*3+2];return Math.abs(o-u)<Math.abs(a-c)?[new Ct(a,1-l),new Ct(c,1-d),new Ct(h,1-p),new Ct(T,1-g)]:[new Ct(o,1-l),new Ct(u,1-d),new Ct(f,1-p),new Ct(x,1-g)]}};function xm(n,t,e){if(e.shapes=[],Array.isArray(n))for(let i=0,s=n.length;i<s;i++){let r=n[i];e.shapes.push(r.uuid)}else e.shapes.push(n.uuid);return e.options=Object.assign({},t),t.extrudePath!==void 0&&(e.options.extrudePath=t.extrudePath.toJSON()),e}var Si=class n extends Vn{constructor(t=1,e=1,i=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:e,widthSegments:i,heightSegments:s};let r=t/2,a=e/2,o=Math.floor(i),l=Math.floor(s),c=o+1,u=l+1,d=t/o,h=e/l,f=[],p=[],T=[],x=[];for(let g=0;g<u;g++){let w=g*h-a;for(let _=0;_<c;_++){let v=_*d-r;p.push(v,-w,0),T.push(0,0,1),x.push(_/o),x.push(1-g/l)}}for(let g=0;g<l;g++)for(let w=0;w<o;w++){let _=w+c*g,v=w+c*(g+1),R=w+1+c*(g+1),N=w+1+c*g;f.push(_,v,N),f.push(v,R,N)}this.setIndex(f),this.setAttribute("position",new ke(p,3)),this.setAttribute("normal",new ke(T,3)),this.setAttribute("uv",new ke(x,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new n(t.width,t.height,t.widthSegments,t.heightSegments)}};var Tr=class n extends Vn{constructor(t=1,e=32,i=16,s=0,r=Math.PI*2,a=0,o=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:t,widthSegments:e,heightSegments:i,phiStart:s,phiLength:r,thetaStart:a,thetaLength:o},e=Math.max(3,Math.floor(e)),i=Math.max(2,Math.floor(i));let l=Math.min(a+o,Math.PI),c=0,u=[],d=new J,h=new J,f=[],p=[],T=[],x=[];for(let g=0;g<=i;g++){let w=[],_=g/i,v=a+_*o,R=t*Math.cos(v),N=Math.sqrt(t*t-R*R),m=0;g===0&&a===0?m=.5/e:g===i&&l===Math.PI&&(m=-.5/e);for(let M=0;M<=e;M++){let L=M/e,P=s+L*r;d.x=-N*Math.cos(P),d.y=R,d.z=N*Math.sin(P),p.push(d.x,d.y,d.z),h.copy(d).normalize(),T.push(h.x,h.y,h.z),x.push(L+m,1-_),w.push(c++)}u.push(w)}for(let g=0;g<i;g++)for(let w=0;w<e;w++){let _=u[g][w+1],v=u[g][w],R=u[g+1][w],N=u[g+1][w+1];(g!==0||a>0)&&f.push(_,v,N),(g!==i-1||l<Math.PI)&&f.push(v,R,N)}this.setIndex(f),this.setAttribute("position",new ke(p,3)),this.setAttribute("normal",new ke(T,3)),this.setAttribute("uv",new ke(x,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new n(t.radius,t.widthSegments,t.heightSegments,t.phiStart,t.phiLength,t.thetaStart,t.thetaLength)}};function Ji(n){let t={};for(let e in n){t[e]={};for(let i in n[e]){let s=n[e][i];if(Wu(s))s.isRenderTargetTexture?(Xt("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[e][i]=null):t[e][i]=s.clone();else if(Array.isArray(s))if(Wu(s[0])){let r=[];for(let a=0,o=s.length;a<o;a++)r[a]=s[a].clone();t[e][i]=r}else t[e][i]=s.slice();else t[e][i]=s}}return t}function Ye(n){let t={};for(let e=0;e<n.length;e++){let i=Ji(n[e]);for(let s in i)t[s]=i[s]}return t}function Wu(n){return n&&(n.isColor||n.isMatrix3||n.isMatrix4||n.isVector2||n.isVector3||n.isVector4||n.isTexture||n.isQuaternion)}function _m(n){let t=[];for(let e=0;e<n.length;e++)t.push(n[e].clone());return t}function oh(n){let t=n.getRenderTarget();return t===null?n.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:ce.workingColorSpace}var Vd={clone:Ji,merge:Ye},ym=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,vm=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`,Hn=class extends _i{constructor(t){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=ym,this.fragmentShader=vm,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=Ji(t.uniforms),this.uniformsGroups=_m(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this.defaultAttributeValues=Object.assign({},t.defaultAttributeValues),this.index0AttributeName=t.index0AttributeName,this.uniformsNeedUpdate=t.uniformsNeedUpdate,this}toJSON(t){let e=super.toJSON(t);e.glslVersion=this.glslVersion,e.uniforms={};for(let s in this.uniforms){let a=this.uniforms[s].value;a&&a.isTexture?e.uniforms[s]={type:"t",value:a.toJSON(t).uuid}:a&&a.isColor?e.uniforms[s]={type:"c",value:a.getHex()}:a&&a.isVector2?e.uniforms[s]={type:"v2",value:a.toArray()}:a&&a.isVector3?e.uniforms[s]={type:"v3",value:a.toArray()}:a&&a.isVector4?e.uniforms[s]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?e.uniforms[s]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?e.uniforms[s]={type:"m4",value:a.toArray()}:e.uniforms[s]={value:a}}Object.keys(this.defines).length>0&&(e.defines=this.defines),e.vertexShader=this.vertexShader,e.fragmentShader=this.fragmentShader,e.lights=this.lights,e.clipping=this.clipping;let i={};for(let s in this.extensions)this.extensions[s]===!0&&(i[s]=!0);return Object.keys(i).length>0&&(e.extensions=i),e}fromJSON(t,e){if(super.fromJSON(t,e),t.uniforms!==void 0)for(let i in t.uniforms){let s=t.uniforms[i];switch(this.uniforms[i]={},s.type){case"t":this.uniforms[i].value=e[s.value]||null;break;case"c":this.uniforms[i].value=new jt().setHex(s.value);break;case"v2":this.uniforms[i].value=new Ct().fromArray(s.value);break;case"v3":this.uniforms[i].value=new J().fromArray(s.value);break;case"v4":this.uniforms[i].value=new Me().fromArray(s.value);break;case"m3":this.uniforms[i].value=new Zt().fromArray(s.value);break;case"m4":this.uniforms[i].value=new ye().fromArray(s.value);break;default:this.uniforms[i].value=s.value}}if(t.defines!==void 0&&(this.defines=t.defines),t.vertexShader!==void 0&&(this.vertexShader=t.vertexShader),t.fragmentShader!==void 0&&(this.fragmentShader=t.fragmentShader),t.glslVersion!==void 0&&(this.glslVersion=t.glslVersion),t.extensions!==void 0)for(let i in t.extensions)this.extensions[i]=t.extensions[i];return t.lights!==void 0&&(this.lights=t.lights),t.clipping!==void 0&&(this.clipping=t.clipping),this}},Xa=class extends Hn{constructor(t){super(t),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}},Xi=class extends _i{constructor(t){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new jt(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new jt(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=$o,this.normalScale=new Ct(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new ni,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.defines={STANDARD:""},this.color.copy(t.color),this.roughness=t.roughness,this.metalness=t.metalness,this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.roughnessMap=t.roughnessMap,this.metalnessMap=t.metalnessMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.envMapIntensity=t.envMapIntensity,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}},Is=class extends Xi{constructor(t){super(),this.isMeshPhysicalMaterial=!0,this.defines={STANDARD:"",PHYSICAL:""},this.type="MeshPhysicalMaterial",this.anisotropyRotation=0,this.anisotropyMap=null,this.clearcoatMap=null,this.clearcoatRoughness=0,this.clearcoatRoughnessMap=null,this.clearcoatNormalScale=new Ct(1,1),this.clearcoatNormalMap=null,this.diffuseRoughnessMap=null,this.ior=1.5,Object.defineProperty(this,"reflectivity",{get:function(){return se(2.5*(this.ior-1)/(this.ior+1),0,1)},set:function(e){this.ior=(1+.4*e)/(1-.4*e)}}),this.iridescenceMap=null,this.iridescenceIOR=1.3,this.iridescenceThicknessMinimum=100,this.iridescenceThicknessMaximum=400,this.iridescenceThicknessMap=null,this.sheenColor=new jt(0),this.sheenColorMap=null,this.sheenRoughness=1,this.sheenRoughnessMap=null,this.transmissionMap=null,this.thickness=0,this.thicknessMap=null,this.attenuationDistance=1/0,this.attenuationColor=new jt(1,1,1),this.specularIntensity=1,this.specularIntensityMap=null,this.specularColor=new jt(1,1,1),this.specularColorMap=null,this._anisotropy=0,this._clearcoat=0,this._diffuseRoughness=0,this._dispersion=0,this._iridescence=0,this._retroreflectivity=0,this._sheen=0,this._transmission=0,this.setValues(t)}get anisotropy(){return this._anisotropy}set anisotropy(t){this._anisotropy>0!=t>0&&this.version++,this._anisotropy=t}get clearcoat(){return this._clearcoat}set clearcoat(t){this._clearcoat>0!=t>0&&this.version++,this._clearcoat=t}get diffuseRoughness(){return this._diffuseRoughness}set diffuseRoughness(t){this._diffuseRoughness>0!=t>0&&this.version++,this._diffuseRoughness=t}get iridescence(){return this._iridescence}set iridescence(t){this._iridescence>0!=t>0&&this.version++,this._iridescence=t}get dispersion(){return this._dispersion}set dispersion(t){this._dispersion>0!=t>0&&this.version++,this._dispersion=t}get retroreflectivity(){return this._retroreflectivity}set retroreflectivity(t){this._retroreflectivity>0!=t>0&&this.version++,this._retroreflectivity=t}get sheen(){return this._sheen}set sheen(t){this._sheen>0!=t>0&&this.version++,this._sheen=t}get transmission(){return this._transmission}set transmission(t){this._transmission>0!=t>0&&this.version++,this._transmission=t}get iridescenceThicknessRange(){return Gi('MeshPhysicalMaterial: The "iridescenceThicknessRange" property has been replaced by "iridescenceThicknessMinimum" and "iridescenceThicknessMaximum".'),[this.iridescenceThicknessMinimum,this.iridescenceThicknessMaximum]}set iridescenceThicknessRange(t){Gi('MeshPhysicalMaterial: The "iridescenceThicknessRange" property has been replaced by "iridescenceThicknessMinimum" and "iridescenceThicknessMaximum".'),this.iridescenceThicknessMinimum=t[0],this.iridescenceThicknessMaximum=t[1]}copy(t){return super.copy(t),this.defines={STANDARD:"",PHYSICAL:""},this.anisotropy=t.anisotropy,this.anisotropyRotation=t.anisotropyRotation,this.anisotropyMap=t.anisotropyMap,this.clearcoat=t.clearcoat,this.clearcoatMap=t.clearcoatMap,this.clearcoatRoughness=t.clearcoatRoughness,this.clearcoatRoughnessMap=t.clearcoatRoughnessMap,this.clearcoatNormalMap=t.clearcoatNormalMap,this.clearcoatNormalScale.copy(t.clearcoatNormalScale),this.diffuseRoughness=t.diffuseRoughness,this.diffuseRoughnessMap=t.diffuseRoughnessMap,this.dispersion=t.dispersion,this.ior=t.ior,this.iridescence=t.iridescence,this.iridescenceMap=t.iridescenceMap,this.iridescenceIOR=t.iridescenceIOR,this.iridescenceThicknessMinimum=t.iridescenceThicknessMinimum,this.iridescenceThicknessMaximum=t.iridescenceThicknessMaximum,this.iridescenceThicknessMap=t.iridescenceThicknessMap,this.retroreflectivity=t.retroreflectivity,this.sheen=t.sheen,this.sheenColor.copy(t.sheenColor),this.sheenColorMap=t.sheenColorMap,this.sheenRoughness=t.sheenRoughness,this.sheenRoughnessMap=t.sheenRoughnessMap,this.transmission=t.transmission,this.transmissionMap=t.transmissionMap,this.thickness=t.thickness,this.thicknessMap=t.thicknessMap,this.attenuationDistance=t.attenuationDistance,this.attenuationColor.copy(t.attenuationColor),this.specularIntensity=t.specularIntensity,this.specularIntensityMap=t.specularIntensityMap,this.specularColor.copy(t.specularColor),this.specularColorMap=t.specularColorMap,this}};var Ya=class extends _i{constructor(t){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=bd,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}},$a=class extends _i{constructor(t){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}};function ms(n,t){return!n||n.constructor===t?n:typeof t.BYTES_PER_ELEMENT=="number"?new t(n):Array.prototype.slice.call(n)}function va(n){return n!==void 0&&n.inTangents!==void 0&&n.outTangents!==void 0}var bi=class{constructor(t,e,i,s){this.parameterPositions=t,this._cachedIndex=0,this.resultBuffer=s!==void 0?s:new e.constructor(i),this.sampleValues=e,this.valueSize=i,this.settings=null,this.DefaultSettings_={}}evaluate(t){let e=this.parameterPositions,i=this._cachedIndex,s=e[i],r=e[i-1];n:{t:{let a;e:{i:if(!(t<s)){for(let o=i+2;;){if(s===void 0){if(t<r)break i;return i=e.length,this._cachedIndex=i,this.copySampleValue_(i-1)}if(i===o)break;if(r=s,s=e[++i],t<s)break t}a=e.length;break e}if(!(t>=r)){let o=e[1];t<o&&(i=2,r=o);for(let l=i-2;;){if(r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(i===l)break;if(s=r,r=e[--i-1],t>=r)break t}a=i,i=0;break e}break n}for(;i<a;){let o=i+a>>>1;t<e[o]?a=o:i=o+1}if(s=e[i],r=e[i-1],r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(s===void 0)return i=e.length,this._cachedIndex=i,this.copySampleValue_(i-1)}this._cachedIndex=i,this.intervalChanged_(i,r,s)}return this.interpolate_(i,r,t,s)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(t){let e=this.resultBuffer,i=this.sampleValues,s=this.valueSize,r=t*s;for(let a=0;a!==s;++a)e[a]=i[r+a];return e}interpolate_(){throw new Error("THREE.Interpolant: Call to abstract method.")}intervalChanged_(){}},Za=class extends bi{constructor(t,e,i,s){super(t,e,i,s),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:Mc,endingEnd:Mc}}intervalChanged_(t,e,i){let s=this.parameterPositions,r=t-2,a=t+1,o=s[r],l=s[a];if(o===void 0)switch(this.getSettings_().endingStart){case Sc:r=t,o=2*e-i;break;case bc:r=s.length-2,o=e+s[r]-s[r+1];break;default:r=t,o=i}if(l===void 0)switch(this.getSettings_().endingEnd){case Sc:a=t,l=2*i-e;break;case bc:a=1,l=i+s[1]-s[0];break;default:a=t-1,l=e}let c=(i-e)*.5,u=this.valueSize;this._weightPrev=c/(e-o),this._weightNext=c/(l-i),this._offsetPrev=r*u,this._offsetNext=a*u}interpolate_(t,e,i,s){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=t*o,c=l-o,u=this._offsetPrev,d=this._offsetNext,h=this._weightPrev,f=this._weightNext,p=(i-e)/(s-e),T=p*p,x=T*p,g=-h*x+2*h*T-h*p,w=(1+h)*x+(-1.5-2*h)*T+(-.5+h)*p+1,_=(-1-f)*x+(1.5+f)*T+.5*p,v=f*x-f*T;for(let R=0;R!==o;++R)r[R]=g*a[u+R]+w*a[c+R]+_*a[l+R]+v*a[d+R];return r}},Ka=class extends bi{constructor(t,e,i,s){super(t,e,i,s)}interpolate_(t,e,i,s){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=t*o,c=l-o,u=(i-e)/(s-e),d=1-u;for(let h=0;h!==o;++h)r[h]=a[c+h]*d+a[l+h]*u;return r}},Ja=class extends bi{constructor(t,e,i,s){super(t,e,i,s)}interpolate_(t){return this.copySampleValue_(t-1)}},Qa=class extends bi{interpolate_(t,e,i,s){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=t*o,c=l-o,u=this.inTangents,d=this.outTangents;if(!u||!d){let p=(i-e)/(s-e),T=1-p;for(let x=0;x!==o;++x)r[x]=a[c+x]*T+a[l+x]*p;return r}let h=o*2,f=t-1;for(let p=0;p!==o;++p){let T=a[c+p],x=a[l+p],g=f*h+p*2,w=d[g],_=d[g+1],v=t*h+p*2,R=u[v],N=u[v+1],m=Sm(i,e,w,R,s);r[p]=Hd(m,T,_,N,x)}return r}};function Hd(n,t,e,i,s){let r=1-n;return r*r*r*t+3*r*r*n*e+3*r*n*n*i+n*n*n*s}function Mm(n,t,e,i,s){let r=1-n;return 3*r*r*(e-t)+6*r*n*(i-e)+3*n*n*(s-i)}function Sm(n,t,e,i,s){let r=(n-t)/(s-t);for(let a=0;a<8;a++){let o=Hd(r,t,e,i,s)-n;if(Math.abs(o)<1e-10)break;let l=Mm(r,t,e,i,s);if(Math.abs(l)<1e-10)break;r=Math.max(0,Math.min(1,r-o/l))}return r}var xn=class{constructor(t,e,i,s){if(t===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(e===void 0||e.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+t);this.name=t,this.times=ms(e,this.TimeBufferType),this.values=ms(i,this.ValueBufferType),this.setInterpolation(s||this.DefaultInterpolation)}static toJSON(t){let e=t.constructor,i;if(e.toJSON!==this.toJSON)i=e.toJSON(t);else{i={name:t.name,times:ms(t.times,Array),values:ms(t.values,Array)};let s=t.getInterpolation();s!==t.DefaultInterpolation&&(i.interpolation=s),va(t.settings)&&(i.settings={inTangents:ms(t.settings.inTangents,Array),outTangents:ms(t.settings.outTangents,Array)})}return i.type=t.ValueTypeName,i}InterpolantFactoryMethodDiscrete(t){return new Ja(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodLinear(t){return new Ka(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodSmooth(t){return new Za(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodBezier(t){let e=new Qa(this.times,this.values,this.getValueSize(),t);return this.settings&&(e.inTangents=this.settings.inTangents,e.outTangents=this.settings.outTangents),e}setInterpolation(t){let e;switch(t){case ar:e=this.InterpolantFactoryMethodDiscrete;break;case Na:e=this.InterpolantFactoryMethodLinear;break;case ba:e=this.InterpolantFactoryMethodSmooth;break;case vc:e=this.InterpolantFactoryMethodBezier;break}if(e===void 0){let i="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(t!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(i);return Xt("KeyframeTrack:",i),this}return this.createInterpolant=e,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return ar;case this.InterpolantFactoryMethodLinear:return Na;case this.InterpolantFactoryMethodSmooth:return ba;case this.InterpolantFactoryMethodBezier:return vc}}getValueSize(){return this.values.length/this.times.length}shift(t){if(t!==0){let e=this.times;for(let i=0,s=e.length;i!==s;++i)e[i]+=t;va(this.settings)&&(qu(this.settings.inTangents,t),qu(this.settings.outTangents,t))}return this}scale(t){if(t!==1){let e=this.times;for(let i=0,s=e.length;i!==s;++i)e[i]*=t;va(this.settings)&&(Xu(this.settings.inTangents,t),Xu(this.settings.outTangents,t))}return this}trim(t,e){let i=this.times,s=i.length,r=0,a=s-1;for(;r!==s&&i[r]<t;)++r;for(;a!==-1&&i[a]>e;)--a;if(++a,r!==0||a!==s){r>=a&&(a=Math.max(a,1),r=a-1);let o=this.getValueSize();this.times=i.slice(r,a),this.values=this.values.slice(r*o,a*o)}return this}validate(){let t=!0,e=this.getValueSize();e-Math.floor(e)!==0&&(Yt("KeyframeTrack: Invalid value size in track.",this),t=!1);let i=this.times,s=this.values,r=i.length;r===0&&(Yt("KeyframeTrack: Track is empty.",this),t=!1);let a=null;for(let o=0;o!==r;o++){let l=i[o];if(typeof l=="number"&&isNaN(l)){Yt("KeyframeTrack: Time is not a valid number.",this,o,l),t=!1;break}if(a!==null&&a>l){Yt("KeyframeTrack: Out of order keys.",this,o,l,a),t=!1;break}a=l}if(s!==void 0&&wp(s))for(let o=0,l=s.length;o!==l;++o){let c=s[o];if(isNaN(c)){Yt("KeyframeTrack: Value is not a valid number.",this,o,c),t=!1;break}}return t}optimize(){let t=this.times.slice(),e=this.values.slice(),i=this.getValueSize(),s=this.getInterpolation()===ba,r=t.length-1,a=1;for(let o=1;o<r;++o){let l=!1,c=t[o],u=t[o+1];if(c!==u&&(o!==1||c!==t[0]))if(s)l=!0;else{let d=o*i,h=d-i,f=d+i;for(let p=0;p!==i;++p){let T=e[d+p];if(T!==e[h+p]||T!==e[f+p]){l=!0;break}}}if(l){if(o!==a){t[a]=t[o];let d=o*i,h=a*i;for(let f=0;f!==i;++f)e[h+f]=e[d+f]}++a}}if(r>0){t[a]=t[r];for(let o=r*i,l=a*i,c=0;c!==i;++c)e[l+c]=e[o+c];++a}return a!==t.length?(this.times=t.slice(0,a),this.values=e.slice(0,a*i)):(this.times=t,this.values=e),this}clone(){let t=this.times.slice(),e=this.values.slice(),i=this.constructor,s=new i(this.name,t,e);return s.createInterpolant=this.createInterpolant,va(this.settings)&&(s.settings={inTangents:this.settings.inTangents.slice(),outTangents:this.settings.outTangents.slice()}),s}};function qu(n,t){for(let e=0,i=n.length;e!==i;e+=2)n[e]+=t}function Xu(n,t){for(let e=0,i=n.length;e!==i;e+=2)n[e]*=t}xn.prototype.ValueTypeName="";xn.prototype.TimeBufferType=Float32Array;xn.prototype.ValueBufferType=Float32Array;xn.prototype.DefaultInterpolation=Na;var wi=class extends xn{constructor(t,e,i){super(t,e,i)}};wi.prototype.ValueTypeName="bool";wi.prototype.ValueBufferType=Array;wi.prototype.DefaultInterpolation=ar;wi.prototype.InterpolantFactoryMethodLinear=void 0;wi.prototype.InterpolantFactoryMethodSmooth=void 0;var ja=class extends xn{constructor(t,e,i,s){super(t,e,i,s)}};ja.prototype.ValueTypeName="color";var to=class extends xn{constructor(t,e,i,s){super(t,e,i,s)}};to.prototype.ValueTypeName="number";var eo=class extends bi{constructor(t,e,i,s){super(t,e,i,s)}interpolate_(t,e,i,s){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=(i-e)/(s-e),c=t*o;for(let u=c+o;c!==u;c+=4)Gn.slerpFlat(r,0,a,c-o,a,c,l);return r}},Er=class extends xn{constructor(t,e,i,s){super(t,e,i,s)}InterpolantFactoryMethodLinear(t){return new eo(this.times,this.values,this.getValueSize(),t)}};Er.prototype.ValueTypeName="quaternion";Er.prototype.InterpolantFactoryMethodSmooth=void 0;var Ti=class extends xn{constructor(t,e,i){super(t,e,i)}};Ti.prototype.ValueTypeName="string";Ti.prototype.ValueBufferType=Array;Ti.prototype.DefaultInterpolation=ar;Ti.prototype.InterpolantFactoryMethodLinear=void 0;Ti.prototype.InterpolantFactoryMethodSmooth=void 0;var no=class extends xn{constructor(t,e,i,s){super(t,e,i,s)}};no.prototype.ValueTypeName="vector";var io=class{constructor(t,e,i){let s=this,r=!1,a=0,o=0,l,c=[];this.onStart=void 0,this.onLoad=t,this.onProgress=e,this.onError=i,this._abortController=null,this.itemStart=function(u){o++,r===!1&&s.onStart!==void 0&&s.onStart(u,a,o),r=!0},this.itemEnd=function(u){a++,s.onProgress!==void 0&&s.onProgress(u,a,o),a===o&&(r=!1,s.onLoad!==void 0&&s.onLoad())},this.itemError=function(u){s.onError!==void 0&&s.onError(u)},this.resolveURL=function(u){return u=u.normalize("NFC"),l?l(u):u},this.setURLModifier=function(u){return l=u,this},this.addHandler=function(u,d){return c.push(u,d),this},this.removeHandler=function(u){let d=c.indexOf(u);return d!==-1&&c.splice(d,2),this},this.getHandler=function(u){for(let d=0,h=c.length;d<h;d+=2){let f=c[d],p=c[d+1];if(f.global&&(f.lastIndex=0),f.test(u))return p}return null},this.abort=function(){return this.abortController.abort(),this._abortController=null,this}}get abortController(){return this._abortController||(this._abortController=new AbortController),this._abortController}},Wd=new io,so=class{constructor(t){this.manager=t!==void 0?t:Wd,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={},this.priority="auto",this.cache="default",typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}load(){}loadAsync(t,e){let i=this;return new Promise(function(s,r){i.load(t,s,e,r)})}parse(){}setCrossOrigin(t){return this.crossOrigin=t,this}setWithCredentials(t){return this.withCredentials=t,this}setPath(t){return this.path=t,this}setResourcePath(t){return this.resourcePath=t,this}setRequestHeader(t){return this.requestHeader=t,this}setPriority(t){return this.priority=t,this}setCache(t){return this.cache=t,this}abort(){return this}};so.DEFAULT_MATERIAL_NAME="__DEFAULT";var Ar=class extends tn{static registerNode(t){this.prototype._lightNode=t}constructor(t,e=1){super(),this.isLight=!0,this.type="Light",this.color=new jt(t),this.intensity=e}copy(t,e){return super.copy(t,e),this.color.copy(t.color),this.intensity=t.intensity,this}toJSON(t){let e=super.toJSON(t);return e.object.color=this.color.getHex(),e.object.intensity=this.intensity,e}};var yc=new ye,Yu=new J,$u=new J,ro=class{constructor(t){this.camera=t,this.intensity=1,this.bias=0,this.biasNode=null,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new Ct(512,512),this.mapType=on,this.map=null,this.mapPass=null,this.matrix=new ye,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new yi,this._frameExtents=new Ct(1,1),this._viewportCount=1,this._viewports=[new Me(0,0,1,1)]}getViewportCount(){return this._viewportCount}getCamera(){return this.camera}getFrustum(){return this._frustum}updateMatrices(t){let e=this.camera;Yu.setFromMatrixPosition(t.matrixWorld),e.position.copy(Yu),$u.setFromMatrixPosition(t.target.matrixWorld),e.lookAt($u),e.updateMatrixWorld(),this._updateMatrix(e,this.matrix,this._frustum)}_updateMatrix(t,e,i,s){yc.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),i.setFromProjectionMatrix(yc,t.coordinateSystem,t.reversedDepth);let r=this._frameExtents,a=s?s.z/r.x:1,o=s?s.w/r.y:1,l=s?s.x/r.x:0,c=s?s.y/r.y:0;t.coordinateSystem===vs||t.reversedDepth?e.set(.5*a,0,0,.5*a+l,0,.5*o,0,.5*o+c,0,0,1,0,0,0,0,1):e.set(.5*a,0,0,.5*a+l,0,.5*o,0,.5*o+c,0,0,.5,.5,0,0,0,1),e.multiply(yc)}getViewport(t){return this._viewports[t]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(t){return this.camera=t.camera.clone(),this.intensity=t.intensity,this.bias=t.bias,this.radius=t.radius,this.autoUpdate=t.autoUpdate,this.needsUpdate=t.needsUpdate,this.normalBias=t.normalBias,this.blurSamples=t.blurSamples,this.mapSize.copy(t.mapSize),this.mapType=t.mapType,this.biasNode=t.biasNode,this}clone(){return new this.constructor().copy(this)}toJSON(){let t={};return t.intensity=this.intensity,t.bias=this.bias,t.normalBias=this.normalBias,t.radius=this.radius,t.blurSamples=this.blurSamples,t.mapSize=this.mapSize.toArray(),t.mapType=this.mapType,t.camera=this.camera.toJSON(!1).object,delete t.camera.matrix,t}},Ma=new J,Sa=new Gn,On=new J,Cr=class extends tn{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new ye,this.projectionMatrix=new ye,this.projectionMatrixInverse=new ye,this.coordinateSystem=Mn,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(t,e){return super.copy(t,e),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorld.decompose(Ma,Sa,On),On.x===1&&On.y===1&&On.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(Ma,Sa,On.set(1,1,1)).invert()}updateWorldMatrix(t,e,i=!1){super.updateWorldMatrix(t,e,i),this.matrixWorld.decompose(Ma,Sa,On),On.x===1&&On.y===1&&On.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(Ma,Sa,On.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}},mi=new J,Zu=new Ct,Ku=new Ct,Je=class extends Cr{constructor(t=50,e=1,i=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=i,this.far=s,this.focus=10,this.aspect=e,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){let e=.5*this.getFilmHeight()/t;this.fov=Da*2*Math.atan(e),this.updateProjectionMatrix()}getFocalLength(){let t=Math.tan(Zl*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return Da*2*Math.atan(Math.tan(Zl*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(t,e,i){mi.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),e.set(mi.x,mi.y).multiplyScalar(-t/mi.z),mi.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),i.set(mi.x,mi.y).multiplyScalar(-t/mi.z)}getViewSize(t,e){return this.getViewBounds(t,Zu,Ku),e.subVectors(Ku,Zu)}setViewOffset(t,e,i,s,r,a){this.aspect=t/e,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=i,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let t=this.near,e=t*Math.tan(Zl*.5*this.fov)/this.zoom,i=2*e,s=this.aspect*i,r=-.5*s,a=this.view;if(this.view!==null&&this.view.enabled){let l=a.fullWidth,c=a.fullHeight;r+=a.offsetX*s/l,e-=a.offsetY*i/c,s*=a.width/l,i*=a.height/c}let o=this.filmOffset;o!==0&&(r+=t*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,e,e-i,t,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){let e=super.toJSON(t);return e.object.fov=this.fov,e.object.zoom=this.zoom,e.object.near=this.near,e.object.far=this.far,e.object.focus=this.focus,e.object.aspect=this.aspect,this.view!==null&&(e.object.view=Object.assign({},this.view)),e.object.filmGauge=this.filmGauge,e.object.filmOffset=this.filmOffset,e}};var Rr=class extends Cr{constructor(t=-1,e=1,i=1,s=-1,r=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=e,this.top=i,this.bottom=s,this.near=r,this.far=a,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,e,i,s,r,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=i,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let t=(this.right-this.left)/(2*this.zoom),e=(this.top-this.bottom)/(2*this.zoom),i=(this.right+this.left)/2,s=(this.top+this.bottom)/2,r=i-t,a=i+t,o=s+e,l=s-e;if(this.view!==null&&this.view.enabled){let c=(this.right-this.left)/this.view.fullWidth/this.zoom,u=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=c*this.view.offsetX,a=r+c*this.view.width,o-=u*this.view.offsetY,l=o-u*this.view.height}this.projectionMatrix.makeOrthographic(r,a,o,l,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){let e=super.toJSON(t);return e.object.zoom=this.zoom,e.object.left=this.left,e.object.right=this.right,e.object.top=this.top,e.object.bottom=this.bottom,e.object.near=this.near,e.object.far=this.far,this.view!==null&&(e.object.view=Object.assign({},this.view)),e}},Cc=class extends ro{constructor(){super(new Rr(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}},Ir=class extends Ar{constructor(t,e){super(t,e),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(tn.DEFAULT_UP),this.updateMatrix(),this.target=new tn,this.shadow=new Cc}dispose(){super.dispose(),this.shadow.dispose()}copy(t){return super.copy(t),this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}toJSON(t){let e=super.toJSON(t);return e.object.shadow=this.shadow.toJSON(),e.object.target=this.target.uuid,e}},Pr=class extends Ar{constructor(t,e){super(t,e),this.isAmbientLight=!0,this.type="AmbientLight"}};var gs=-90,xs=1,Ps=class extends tn{constructor(t,e,i){super(),this.type="CubeCamera",this.renderTarget=i,this.coordinateSystem=null,this.activeMipmapLevel=0;let s=new Je(gs,xs,t,e);s.layers=this.layers,this.add(s);let r=new Je(gs,xs,t,e);r.layers=this.layers,this.add(r);let a=new Je(gs,xs,t,e);a.layers=this.layers,this.add(a);let o=new Je(gs,xs,t,e);o.layers=this.layers,this.add(o);let l=new Je(gs,xs,t,e);l.layers=this.layers,this.add(l);let c=new Je(gs,xs,t,e);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){let t=this.coordinateSystem,e=this.children.concat(),[i,s,r,a,o,l]=e;for(let c of e)this.remove(c);if(t===Mn)i.up.set(0,1,0),i.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(t===vs)i.up.set(0,-1,0),i.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(let c of e)this.add(c),c.updateMatrixWorld()}update(t,e){this.parent===null&&this.updateMatrixWorld();let{renderTarget:i,activeMipmapLevel:s}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());let[r,a,o,l,c,u]=this.children,d=t.getRenderTarget(),h=t.getActiveCubeFace(),f=t.getActiveMipmapLevel(),p=t.xr.enabled;t.xr.enabled=!1;let T=i.texture.mipmapsAutoUpdate;i.texture.mipmapsAutoUpdate=!1;let x=!1;t.isWebGLRenderer===!0?x=t.state.buffers.depth.getReversed():x=t.reversedDepthBuffer,t.setRenderTarget(i,0,s),x&&t.autoClear===!1&&t.clearDepth(),t.render(e,r),t.setRenderTarget(i,1,s),x&&t.autoClear===!1&&t.clearDepth(),t.render(e,a),t.setRenderTarget(i,2,s),x&&t.autoClear===!1&&t.clearDepth(),t.render(e,o),t.setRenderTarget(i,3,s),x&&t.autoClear===!1&&t.clearDepth(),t.render(e,l),t.setRenderTarget(i,4,s),x&&t.autoClear===!1&&t.clearDepth(),t.render(e,c),i.texture.mipmapsAutoUpdate=T,t.setRenderTarget(i,5,s),x&&t.autoClear===!1&&t.clearDepth(),t.render(e,u),t.setRenderTarget(d,h,f),t.xr.enabled=p,i.texture.needsPMREMUpdate=!0}},ao=class extends Je{constructor(t=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=t,this.perCameraFrustumCulled=!1}};var lh="\\[\\]\\.:\\/",bm=new RegExp("["+lh+"]","g"),ch="[^"+lh+"]",wm="[^"+lh.replace("\\.","")+"]",Tm=/((?:WC+[\/:])*)/.source.replace("WC",ch),Em=/(WCOD+)?/.source.replace("WCOD",wm),Am=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",ch),Cm=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",ch),Rm=new RegExp("^"+Tm+Em+Am+Cm+"$"),Im=["material","materials","bones","map"],Rc=class{constructor(t,e,i){let s=i||ve.parseTrackName(e);this._targetGroup=t,this._bindings=t.subscribe_(e,s)}getValue(t,e){this.bind();let i=this._targetGroup.nCachedObjects_,s=this._bindings[i];s!==void 0&&s.getValue(t,e)}setValue(t,e){let i=this._bindings;for(let s=this._targetGroup.nCachedObjects_,r=i.length;s!==r;++s)i[s].setValue(t,e)}bind(){let t=this._bindings;for(let e=this._targetGroup.nCachedObjects_,i=t.length;e!==i;++e)t[e].bind()}unbind(){let t=this._bindings;for(let e=this._targetGroup.nCachedObjects_,i=t.length;e!==i;++e)t[e].unbind()}},ve=class n{constructor(t,e,i){this.path=e,this.parsedPath=i||n.parseTrackName(e),this.node=n.findNode(t,this.parsedPath.nodeName),this.rootNode=t,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(t,e,i){return t&&t.isAnimationObjectGroup?new n.Composite(t,e,i):new n(t,e,i)}static sanitizeNodeName(t){return t.replace(/\s/g,"_").replace(bm,"")}static parseTrackName(t){let e=Rm.exec(t);if(e===null)throw new Error("THREE.PropertyBinding: Cannot parse trackName: "+t);let i={nodeName:e[2],objectName:e[3],objectIndex:e[4],propertyName:e[5],propertyIndex:e[6]},s=i.nodeName&&i.nodeName.lastIndexOf(".");if(s!==void 0&&s!==-1){let r=i.nodeName.substring(s+1);Im.indexOf(r)!==-1&&(i.nodeName=i.nodeName.substring(0,s),i.objectName=r)}if(i.propertyName===null||i.propertyName.length===0)throw new Error("THREE.PropertyBinding: can not parse propertyName from trackName: "+t);return i}static findNode(t,e){if(e===void 0||e===""||e==="."||e===-1||e===t.name||e===t.uuid)return t;if(t.skeleton){let i=t.skeleton.getBoneByName(e);if(i!==void 0)return i}if(t.children){let i=function(r){for(let a=0;a<r.length;a++){let o=r[a];if(o.name===e||o.uuid===e)return o;let l=i(o.children);if(l)return l}return null},s=i(t.children);if(s)return s}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(t,e){t[e]=this.targetObject[this.propertyName]}_getValue_array(t,e){let i=this.resolvedProperty;for(let s=0,r=i.length;s!==r;++s)t[e++]=i[s]}_getValue_arrayElement(t,e){t[e]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(t,e){this.resolvedProperty.toArray(t,e)}_setValue_direct(t,e){this.targetObject[this.propertyName]=t[e]}_setValue_direct_setNeedsUpdate(t,e){this.targetObject[this.propertyName]=t[e],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(t,e){this.targetObject[this.propertyName]=t[e],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(t,e){let i=this.resolvedProperty;for(let s=0,r=i.length;s!==r;++s)i[s]=t[e++]}_setValue_array_setNeedsUpdate(t,e){let i=this.resolvedProperty;for(let s=0,r=i.length;s!==r;++s)i[s]=t[e++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(t,e){let i=this.resolvedProperty;for(let s=0,r=i.length;s!==r;++s)i[s]=t[e++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(t,e){this.resolvedProperty[this.propertyIndex]=t[e]}_setValue_arrayElement_setNeedsUpdate(t,e){this.resolvedProperty[this.propertyIndex]=t[e],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(t,e){this.resolvedProperty[this.propertyIndex]=t[e],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(t,e){this.resolvedProperty.fromArray(t,e)}_setValue_fromArray_setNeedsUpdate(t,e){this.resolvedProperty.fromArray(t,e),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(t,e){this.resolvedProperty.fromArray(t,e),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(t,e){this.bind(),this.getValue(t,e)}_setValue_unbound(t,e){this.bind(),this.setValue(t,e)}bind(){let t=this.node,e=this.parsedPath,i=e.objectName,s=e.propertyName,r=e.propertyIndex;if(t||(t=n.findNode(this.rootNode,e.nodeName),this.node=t),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!t){Xt("PropertyBinding: No target node found for track: "+this.path+".");return}if(i){let c=e.objectIndex;switch(i){case"materials":if(!t.material){Yt("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!t.material.materials){Yt("PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}t=t.material.materials;break;case"bones":if(!t.skeleton){Yt("PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}t=t.skeleton.bones;for(let u=0;u<t.length;u++)if(t[u].name===c){c=u;break}break;case"map":if("map"in t){t=t.map;break}if(!t.material){Yt("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!t.material.map){Yt("PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}t=t.material.map;break;default:if(t[i]===void 0){Yt("PropertyBinding: Can not bind to objectName of node undefined.",this);return}t=t[i]}if(c!==void 0){if(t[c]===void 0){Yt("PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,t);return}t=t[c]}}let a=t[s];if(a===void 0){let c=e.nodeName;Yt("PropertyBinding: Trying to update property for track: "+c+"."+s+" but it wasn't found.",t);return}let o=this.Versioning.None;this.targetObject=t,t.isMaterial===!0?o=this.Versioning.NeedsUpdate:t.isObject3D===!0&&(o=this.Versioning.MatrixWorldNeedsUpdate);let l=this.BindingType.Direct;if(r!==void 0){if(s==="morphTargetInfluences"){if(!t.geometry){Yt("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!t.geometry.morphAttributes){Yt("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}t.morphTargetDictionary[r]!==void 0&&(r=t.morphTargetDictionary[r])}l=this.BindingType.ArrayElement,this.resolvedProperty=a,this.propertyIndex=r}else a.fromArray!==void 0&&a.toArray!==void 0?(l=this.BindingType.HasFromToArray,this.resolvedProperty=a):Array.isArray(a)?(l=this.BindingType.EntireArray,this.resolvedProperty=a):this.propertyName=s;this.getValue=this.GetterByBindingType[l],this.setValue=this.SetterByBindingTypeAndVersioning[l][o]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}};ve.Composite=Rc;ve.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};ve.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};ve.prototype.GetterByBindingType=[ve.prototype._getValue_direct,ve.prototype._getValue_array,ve.prototype._getValue_arrayElement,ve.prototype._getValue_toArray];ve.prototype.SetterByBindingTypeAndVersioning=[[ve.prototype._setValue_direct,ve.prototype._setValue_direct_setNeedsUpdate,ve.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[ve.prototype._setValue_array,ve.prototype._setValue_array_setNeedsUpdate,ve.prototype._setValue_array_setMatrixWorldNeedsUpdate],[ve.prototype._setValue_arrayElement,ve.prototype._setValue_arrayElement_setNeedsUpdate,ve.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[ve.prototype._setValue_fromArray,ve.prototype._setValue_fromArray_setNeedsUpdate,ve.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];var EM=new Float32Array(1);var Ju=new ye,Lr=class{constructor(t,e,i=0,s=1/0){this.ray=new fr(t,e),this.near=i,this.far=s,this.camera=null,this.layers=new bs,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(t,e){this.ray.set(t,e)}setFromCamera(t,e){e.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(t.x,t.y,.5).unproject(e).sub(this.ray.origin).normalize(),this.camera=e):e.isOrthographicCamera?(this.ray.origin.set(t.x,t.y,e.projectionMatrix.elements[14]).unproject(e),this.ray.direction.set(0,0,-1).transformDirection(e.matrixWorld),this.camera=e):Yt("Raycaster: Unsupported camera type: "+e.type)}setFromXRController(t){return Ju.identity().extractRotation(t.matrixWorld),this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(Ju),this}intersectObject(t,e=!0,i=[]){return Ic(t,this,i,e),i.sort(Qu),i}intersectObjects(t,e=!0,i=[]){for(let s=0,r=t.length;s<r;s++)Ic(t[s],this,i,e);return i.sort(Qu),i}};function Qu(n,t){return n.distance-t.distance}function Ic(n,t,e,i){let s=!0;if(n.layers.test(t.layers)&&n.raycast(t,e)===!1&&(s=!1),s===!0&&i===!0){let r=n.children;for(let a=0,o=r.length;a<o;a++)Ic(r[a],t,e,!0)}}var mh=class mh{constructor(t,e,i,s){this.elements=[1,0,0,1],t!==void 0&&this.set(t,e,i,s)}identity(){return this.set(1,0,0,1),this}fromArray(t,e=0){for(let i=0;i<4;i++)this.elements[i]=t[i+e];return this}set(t,e,i,s){let r=this.elements;return r[0]=t,r[2]=e,r[1]=i,r[3]=s,this}};mh.prototype.isMatrix2=!0;var Pc=mh;function hh(n,t,e,i){let s=Pm(i);switch(e){case Jc:return n*t;case jc:return n*t/s.components*s.byteLength;case mo:return n*t/s.components*s.byteLength;case Ai:return n*t*2/s.components*s.byteLength;case go:return n*t*2/s.components*s.byteLength;case Qc:return n*t*3/s.components*s.byteLength;case Dn:return n*t*4/s.components*s.byteLength;case xo:return n*t*4/s.components*s.byteLength;case Ur:case Fr:return Math.floor((n+3)/4)*Math.floor((t+3)/4)*8;case Or:case Br:return Math.floor((n+3)/4)*Math.floor((t+3)/4)*16;case yo:case Mo:return Math.max(n,16)*Math.max(t,8)/4;case _o:case vo:return Math.max(n,8)*Math.max(t,8)/2;case So:case bo:case To:case Eo:return Math.floor((n+3)/4)*Math.floor((t+3)/4)*8;case wo:case kr:case Ao:return Math.floor((n+3)/4)*Math.floor((t+3)/4)*16;case Co:return Math.floor((n+3)/4)*Math.floor((t+3)/4)*16;case Ro:return Math.floor((n+4)/5)*Math.floor((t+3)/4)*16;case Io:return Math.floor((n+4)/5)*Math.floor((t+4)/5)*16;case Po:return Math.floor((n+5)/6)*Math.floor((t+4)/5)*16;case Lo:return Math.floor((n+5)/6)*Math.floor((t+5)/6)*16;case No:return Math.floor((n+7)/8)*Math.floor((t+4)/5)*16;case Do:return Math.floor((n+7)/8)*Math.floor((t+5)/6)*16;case Uo:return Math.floor((n+7)/8)*Math.floor((t+7)/8)*16;case Fo:return Math.floor((n+9)/10)*Math.floor((t+4)/5)*16;case Oo:return Math.floor((n+9)/10)*Math.floor((t+5)/6)*16;case Bo:return Math.floor((n+9)/10)*Math.floor((t+7)/8)*16;case ko:return Math.floor((n+9)/10)*Math.floor((t+9)/10)*16;case zo:return Math.floor((n+11)/12)*Math.floor((t+9)/10)*16;case Go:return Math.floor((n+11)/12)*Math.floor((t+11)/12)*16;case Vo:case Ho:case Wo:return Math.ceil(n/4)*Math.ceil(t/4)*16;case qo:case Xo:return Math.ceil(n/4)*Math.ceil(t/4)*8;case zr:case Yo:return Math.ceil(n/4)*Math.ceil(t/4)*16}throw new Error(`Unable to determine texture byte length for ${e} format.`)}function Pm(n){switch(n){case on:case Yc:return{byteLength:1,components:1};case Us:case $c:case Nn:return{byteLength:2,components:1};case fo:case po:return{byteLength:2,components:4};case Pn:case uo:case Ln:return{byteLength:4,components:1};case Zc:case Kc:return{byteLength:4,components:3}}throw new Error(`THREE.TextureUtils: Unknown texture type ${n}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:"187"}}));typeof window<"u"&&(window.__THREE__?Xt("WARNING: Multiple instances of Three.js being imported."):window.__THREE__="187");function ff(){let n=null,t=!1,e=null,i=null;function s(r,a){i=n.requestAnimationFrame(s),e(r,a)}return{start:function(){t!==!0&&e!==null&&n!==null&&(i=n.requestAnimationFrame(s),t=!0)},stop:function(){n!==null&&n.cancelAnimationFrame(i),t=!1},setAnimationLoop:function(r){e=r},setContext:function(r){n=r}}}function Nm(n){let t=new WeakMap;function e(o,l){let c=o.array,u=o.usage,d=c.byteLength,h=n.createBuffer();n.bindBuffer(l,h),n.bufferData(l,c,u),o.onUploadCallback();let f;if(c instanceof Float32Array)f=n.FLOAT;else if(typeof Float16Array<"u"&&c instanceof Float16Array)f=n.HALF_FLOAT;else if(c instanceof Uint16Array)o.isFloat16BufferAttribute?f=n.HALF_FLOAT:f=n.UNSIGNED_SHORT;else if(c instanceof Int16Array)f=n.SHORT;else if(c instanceof Uint32Array)f=n.UNSIGNED_INT;else if(c instanceof Int32Array)f=n.INT;else if(c instanceof Int8Array)f=n.BYTE;else if(c instanceof Uint8Array)f=n.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)f=n.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:h,type:f,bytesPerElement:c.BYTES_PER_ELEMENT,version:o.version,size:d}}function i(o,l,c){let u=l.array,d=l.updateRanges;if(n.bindBuffer(c,o),d.length===0)n.bufferSubData(c,0,u);else{d.sort((f,p)=>f.start-p.start);let h=0;for(let f=1;f<d.length;f++){let p=d[h],T=d[f];T.start<=p.start+p.count+1?p.count=Math.max(p.count,T.start+T.count-p.start):(++h,d[h]=T)}d.length=h+1;for(let f=0,p=d.length;f<p;f++){let T=d[f];n.bufferSubData(c,T.start*u.BYTES_PER_ELEMENT,u,T.start,T.count)}l.clearUpdateRanges()}l.onUploadCallback()}function s(o){return o.isInterleavedBufferAttribute&&(o=o.data),t.get(o)}function r(o){o.isInterleavedBufferAttribute&&(o=o.data);let l=t.get(o);l&&(n.deleteBuffer(l.buffer),t.delete(o))}function a(o,l){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){let u=t.get(o);(!u||u.version<o.version)&&t.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}let c=t.get(o);if(c===void 0)t.set(o,e(o,l));else if(c.version<o.version){if(c.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");i(c.buffer,o,l),c.version=o.version}}return{get:s,remove:r,update:a}}var Dm=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,Um=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,Fm=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,Om=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Bm=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,km=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,zm=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,Gm=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,Vm=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec4 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 );
	}
#endif`,Hm=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,Wm=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,qm=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,Xm=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,Ym=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,$m=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,Zm=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,Km=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,Jm=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,Qm=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,jm=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,t0=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,e0=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,n0=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec4( 1.0 );
#endif
#ifdef USE_COLOR_ALPHA
	vColor *= color;
#elif defined( USE_COLOR )
	vColor.rgb *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.rgb *= instanceColor.rgb;
#endif
#ifdef USE_BATCHING_COLOR
	vColor *= getBatchingColor( getIndirectIndex( gl_DrawID ) );
#endif`,i0=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
#define inverseTransformDirection transformDirectionByInverseViewMatrix
vec3 transformNormalByInverseViewMatrix( in vec3 normal, in mat4 viewMatrix ) {
	return normalize( ( vec4( normal, 0.0 ) * viewMatrix ).xyz );
}
vec3 transformDirectionByInverseViewMatrix( in vec3 dir, in mat4 viewMatrix ) {
	return normalize( ( vec4( dir, 0.0 ) * viewMatrix ).xyz );
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,s0=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
#endif`,r0=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,a0=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,o0=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,l0=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,c0="gl_FragColor = linearToOutputTexel( gl_FragColor );",h0=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,u0=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * reflectVec );
		#ifdef ENVMAP_BLENDING_MULTIPLY
			outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_MIX )
			outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_ADD )
			outgoingLight += envColor.xyz * specularStrength * reflectivity;
		#endif
	#endif
#endif`,d0=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	uniform samplerCube envMap;
	#ifdef ENVMAP_TYPE_PMREM
		float roughnessToMip( const in float roughness ) {
			float r = clamp( roughness, 0.0, 1.0 );
			return ENVMAP_MAX_LOD * r * ( 2.0 - r );
		}
	#endif
#endif`,f0=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,p0=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,m0=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,g0=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,x0=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,_0=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,y0=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,v0=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,M0=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,S0=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,b0=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,w0=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_SUN_LIGHTS > 0
	struct SunLight {
		vec3 direction;
		vec3 color;
	};
	uniform SunLight sunLights[ NUM_SUN_LIGHTS ];
	void getSunLightInfo( const in SunLight sunLight, out IncidentLight light ) {
		light.color = sunLight.color;
		light.direction = sunLight.direction;
		light.visible = true;
	}
#endif
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif
#include <lightprobes_pars_fragment>`,T0=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_PMREM
			vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
			vec4 envMapColor = textureLod( envMap, envMapRotation * worldNormal, ENVMAP_MAX_LOD );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_PMREM
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, pow4( roughness ) ) );
			reflectVec = transformDirectionByInverseViewMatrix( reflectVec, viewMatrix );
			vec4 envMapColor = textureLod( envMap, envMapRotation * reflectVec, roughnessToMip( roughness ) );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_RETROREFLECTION
		vec3 getIBLRetroRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
			#ifdef ENVMAP_TYPE_PMREM
				vec3 retroVec = normalize( mix( viewDir, normal, pow4( roughness ) ) );
				retroVec = transformDirectionByInverseViewMatrix( retroVec, viewMatrix );
				vec4 envMapColor = textureLod( envMap, envMapRotation * retroVec, roughnessToMip( roughness ) );
				return envMapColor.rgb * envMapIntensity;
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_PMREM
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
		#ifdef USE_RETROREFLECTION
			vec3 getIBLAnisotropyRetroRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
				#ifdef ENVMAP_TYPE_PMREM
					vec3 bentNormal = cross( bitangent, viewDir );
					bentNormal = normalize( cross( bentNormal, bitangent ) );
					bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
					return getIBLRetroRadiance( viewDir, bentNormal, roughness );
				#else
					return vec3( 0.0 );
				#endif
			}
		#endif
	#endif
#endif`,E0=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,A0=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,C0=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,R0=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,I0=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.diffuseContribution = diffuseColor.rgb * ( 1.0 - metalnessFactor );
material.metalness = metalnessFactor;
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.045 );
material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef USE_DIFFUSE_ROUGHNESS
	float diffuseRoughnessFactor = diffuseRoughness;
	#ifdef USE_DIFFUSE_ROUGHNESSMAP
		diffuseRoughnessFactor *= texture2D( diffuseRoughnessMap, vDiffuseRoughnessMapUv ).r;
	#endif
	material.diffuseRoughness = saturate( diffuseRoughnessFactor );
#endif
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor;
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = vec3( 0.04 );
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.045 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_RETROREFLECTION
	material.retroreflectivity = retroreflectivity;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.0001, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,P0=`uniform sampler2D dfgLUT;
struct PhysicalMaterial {
	vec3 diffuseColor;
	vec3 diffuseContribution;
	vec3 specularColor;
	vec3 specularColorBlended;
	float roughness;
	float metalness;
	float specularF90;
	float dispersion;
	vec2 dfg;
	vec3 multiScatteringCompensation;
	#ifdef USE_DIFFUSE_ROUGHNESS
		float diffuseRoughness;
	#endif
	#ifdef USE_RETROREFLECTION
		float retroreflectivity;
	#endif
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0Dielectric;
		vec3 iridescenceF0Metallic;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
#ifdef USE_DIFFUSE_ROUGHNESS
	const float EON_EPSILON = 1e-7;
	float FON_DirectionalAlbedo( const in float mu, const in float roughness, const in float A ) {
		float muComp = 1.0 - mu;
		float gOverPi = muComp * ( 0.0571085289 + muComp * ( 0.491881867 + muComp * ( - 0.332181442 + muComp * 0.0714429953 ) ) );
		return A * ( 1.0 + roughness * gOverPi );
	}
	vec3 BRDF_EON( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 diffuseColor, const in float roughness ) {
		vec3 rho = saturate( diffuseColor );
		if ( roughness <= EON_EPSILON ) return BRDF_Lambert( rho );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float s = dot( lightDir, viewDir ) - dotNL * dotNV;
		float sOverT = ( s > 0.0 ) ? s / max( max( dotNL, dotNV ), EON_EPSILON ) : s;
		float A = 1.0 / ( 1.0 + ( 0.5 - 2.0 / ( 3.0 * PI ) ) * roughness );
		vec3 singleScatter = rho * RECIPROCAL_PI * A * ( 1.0 + roughness * sOverT );
		float averageAlbedo = A * ( 1.0 + ( 2.0 / 3.0 - 28.0 / ( 15.0 * PI ) ) * roughness );
		float albedoV = FON_DirectionalAlbedo( dotNV, roughness, A );
		float albedoL = FON_DirectionalAlbedo( dotNL, roughness, A );
		vec3 rhoMultiScatter = rho * rho * averageAlbedo / max( vec3( EON_EPSILON ), vec3( 1.0 ) - rho * ( 1.0 - averageAlbedo ) );
		vec3 multiScatter = rhoMultiScatter * RECIPROCAL_PI
			* max( EON_EPSILON, 1.0 - albedoV )
			* max( EON_EPSILON, 1.0 - albedoL )
			/ max( EON_EPSILON, 1.0 - averageAlbedo );
		return singleScatter + multiScatter;
	}
	vec3 EON_DirectionalAlbedo( const in vec3 diffuseColor, const in float roughness, const in float dotNV ) {
		vec3 rho = saturate( diffuseColor );
		if ( roughness <= EON_EPSILON ) return rho;
		float A = 1.0 / ( 1.0 + ( 0.5 - 2.0 / ( 3.0 * PI ) ) * roughness );
		float directionalAlbedo = FON_DirectionalAlbedo( dotNV, roughness, A );
		float averageAlbedo = A * ( 1.0 + ( 2.0 / 3.0 - 28.0 / ( 15.0 * PI ) ) * roughness );
		vec3 rhoMultiScatter = rho * rho * averageAlbedo / max( vec3( EON_EPSILON ), vec3( 1.0 ) - rho * ( 1.0 - averageAlbedo ) );
		return rho * directionalAlbedo + rhoMultiScatter * ( 1.0 - directionalAlbedo );
	}
#endif
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		return 0.5 / max( gv + gl, EPSILON );
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = max( material.clearcoatRoughness, 0.045 );
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColorBlended;
	float f90 = material.specularF90;
	float roughness = max( material.roughness, 0.045 );
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float alphaT = max( material.alphaT, alpha );
		float V = V_GGX_SmithCorrelated_Anisotropic( alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transpose( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float rInv = 1.0 / ( roughness + 0.1 );
	float a = -1.9362 + 1.0678 * roughness + 0.4573 * r2 - 0.8469 * rInv;
	float b = -0.6014 + 0.5538 * roughness - 0.4670 * r2 - 0.1255 * rInv;
	float DG = exp( a * dotNV + b );
	return saturate( DG );
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 fab = texture2D( dfgLUT, vec2( roughness, dotNV ) ).rg;
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec2 fab, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec2 fab, const in vec3 specularColor, const in float specularF90, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColorBlended * t2.x + ( material.specularF90 - material.specularColorBlended ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseContribution * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
		#ifdef USE_CLEARCOAT
			vec3 Ncc = geometryClearcoatNormal;
			vec2 uvClearcoat = LTC_Uv( Ncc, viewDir, material.clearcoatRoughness );
			vec4 t1Clearcoat = texture2D( ltc_1, uvClearcoat );
			vec4 t2Clearcoat = texture2D( ltc_2, uvClearcoat );
			mat3 mInvClearcoat = mat3(
				vec3( t1Clearcoat.x, 0, t1Clearcoat.y ),
				vec3(             0, 1,             0 ),
				vec3( t1Clearcoat.z, 0, t1Clearcoat.w )
			);
			vec3 fresnelClearcoat = material.clearcoatF0 * t2Clearcoat.x + ( material.clearcoatF90 - material.clearcoatF0 ) * t2Clearcoat.y;
			clearcoatSpecularDirect += lightColor * fresnelClearcoat * LTC_Evaluate( Ncc, viewDir, position, mInvClearcoat, rectCoords );
		#endif
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
 
 		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
 
 		float sheenAlbedoV = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
 		float sheenAlbedoL = IBLSheenBRDF( geometryNormal, directLight.direction, material.sheenRoughness );
 
 		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * max( sheenAlbedoV, sheenAlbedoL );
 
 		irradiance *= sheenEnergyComp;
 
 	#endif
	vec3 specularBRDF = BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	#ifdef USE_RETROREFLECTION
		vec3 retroViewDir = reflect( - geometryViewDir, geometryNormal );
		vec3 retroSpecularBRDF = BRDF_GGX( directLight.direction, retroViewDir, geometryNormal, material );
		specularBRDF = mix( specularBRDF, retroSpecularBRDF, saturate( material.retroreflectivity ) );
	#endif
	reflectedLight.directSpecular += irradiance * specularBRDF * material.multiScatteringCompensation;
	vec3 halfDir = normalize( directLight.direction + geometryViewDir );
	float dotVH = saturate( dot( geometryViewDir, halfDir ) );
	vec3 F = F_Schlick( material.specularColor, material.specularF90, dotVH );
	#ifdef USE_RETROREFLECTION
		vec3 retroHalfDir = normalize( directLight.direction + retroViewDir );
		float dotRetroVH = saturate( dot( retroViewDir, retroHalfDir ) );
		vec3 retroF = F_Schlick( material.specularColor, material.specularF90, dotRetroVH );
		F = mix( F, retroF, saturate( material.retroreflectivity ) );
	#endif
	#ifdef USE_DIFFUSE_ROUGHNESS
		vec3 diffuseBRDF = BRDF_EON( directLight.direction, geometryViewDir, geometryNormal, material.diffuseColor, material.diffuseRoughness ) * ( 1.0 - material.metalness );
	#else
		vec3 diffuseBRDF = BRDF_Lambert( material.diffuseContribution );
	#endif
	reflectedLight.directDiffuse += irradiance * diffuseBRDF * ( 1.0 - F );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( material.dfg, material.specularColor, material.specularF90, material.iridescence, material.iridescenceF0Dielectric, singleScattering, multiScattering );
	#else
		computeMultiscattering( material.dfg, material.specularColor, material.specularF90, singleScattering, multiScattering );
	#endif
	#ifdef USE_DIFFUSE_ROUGHNESS
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		vec3 diffuseAlbedo = EON_DirectionalAlbedo( material.diffuseColor, material.diffuseRoughness, dotNV ) * ( 1.0 - material.metalness );
		vec3 diffuse = irradiance * RECIPROCAL_PI * diffuseAlbedo * ( 1.0 - singleScattering - multiScattering );
	#else
		vec3 diffuse = irradiance * BRDF_Lambert( material.diffuseContribution ) * ( 1.0 - singleScattering - multiScattering );
	#endif
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		sheenSpecularIndirect += irradiance * material.sheenColor * sheenAlbedo * RECIPROCAL_PI;
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		diffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectDiffuse += diffuse;
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness ) * RECIPROCAL_PI;
 	#endif
	vec3 singleScatteringDielectric = vec3( 0.0 );
	vec3 multiScatteringDielectric = vec3( 0.0 );
	vec3 singleScatteringMetallic = vec3( 0.0 );
	vec3 multiScatteringMetallic = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( material.dfg, material.specularColor, material.specularF90, material.iridescence, material.iridescenceF0Dielectric, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscatteringIridescence( material.dfg, material.diffuseColor, material.specularF90, material.iridescence, material.iridescenceF0Metallic, singleScatteringMetallic, multiScatteringMetallic );
	#else
		computeMultiscattering( material.dfg, material.specularColor, material.specularF90, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscattering( material.dfg, material.diffuseColor, material.specularF90, singleScatteringMetallic, multiScatteringMetallic );
	#endif
	vec3 singleScattering = mix( singleScatteringDielectric, singleScatteringMetallic, material.metalness );
	vec3 multiScattering = mix( multiScatteringDielectric, multiScatteringMetallic, material.metalness );
	vec3 totalScatteringDielectric = singleScatteringDielectric + multiScatteringDielectric;
	#ifdef USE_DIFFUSE_ROUGHNESS
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		vec3 diffuse = EON_DirectionalAlbedo( material.diffuseColor, material.diffuseRoughness, dotNV ) * ( 1.0 - material.metalness ) * ( 1.0 - totalScatteringDielectric );
	#else
		vec3 diffuse = material.diffuseContribution * ( 1.0 - totalScatteringDielectric );
	#endif
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	vec3 indirectSpecular = radiance * singleScattering;
	indirectSpecular += multiScattering * cosineWeightedIrradiance;
	vec3 indirectDiffuse = diffuse * cosineWeightedIrradiance;
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		indirectSpecular *= sheenEnergyComp;
		indirectDiffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectSpecular += indirectSpecular;
	reflectedLight.indirectDiffuse += indirectDiffuse;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,L0=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		vec3 iridescenceFresnelDielectric = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		vec3 iridescenceFresnelMetallic = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.diffuseColor );
		material.iridescenceFresnel = mix( iridescenceFresnelDielectric, iridescenceFresnelMetallic, material.metalness );
		material.iridescenceF0Dielectric = Schlick_to_F0( iridescenceFresnelDielectric, 1.0, dotNVi );
		material.iridescenceF0Metallic = Schlick_to_F0( iridescenceFresnelMetallic, 1.0, dotNVi );
	}
#endif
#ifdef STANDARD
	float dotNVms = saturate( dot( geometryNormal, geometryViewDir ) );
	material.dfg = texture2D( dfgLUT, vec2( material.roughness, dotNVms ) ).rg;
	#if ( NUM_SUN_LIGHTS > 0 || NUM_DIR_LIGHTS > 0 || NUM_POINT_LIGHTS > 0 || NUM_SPOT_LIGHTS > 0 )
		float EssMs = material.dfg.x + material.dfg.y;
		material.multiScatteringCompensation = 1.0 + material.specularColorBlended * ( 1.0 / EssMs - 1.0 );
	#endif
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS ) && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SUN_LIGHTS > 0 ) && defined( RE_Direct )
	SunLight sunLight;
	#if defined( USE_SHADOWMAP ) && NUM_SUN_LIGHT_SHADOWS > 0
	SunLightShadow sunLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SUN_LIGHTS; i ++ ) {
		sunLight = sunLights[ i ];
		getSunLightInfo( sunLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SUN_LIGHT_SHADOWS )
		sunLightShadow = sunLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getSunShadow( sunShadowMap[ i ], sunLightShadow, UNROLLED_LOOP_INDEX ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_LIGHT_PROBE_GRIDS > 0
		vec3 probeWorldPos = ( ( vec4( geometryPosition, 1.0 ) - viewMatrix[ 3 ] ) * viewMatrix ).xyz;
		vec3 probeWorldNormal = transformNormalByInverseViewMatrix( geometryNormal, viewMatrix );
		int probeGrid = - 1;
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_LIGHT_PROBE_GRIDS; i ++ ) {
			if ( isInsideLightProbeGrid( probeWorldPos, probeWorldNormal, probesMin[ i ], probesMax[ i ], probesResolution[ i ] ) ) probeGrid = UNROLLED_LOOP_INDEX;
		}
		#pragma unroll_loop_end
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_LIGHT_PROBE_GRIDS; i ++ ) {
			if ( probeGrid == UNROLLED_LOOP_INDEX ) irradiance += getLightProbeGridIrradiance( probesSH[ i ], probesMin[ i ], probesMax[ i ], probesResolution[ i ], probeWorldPos, probeWorldNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,N0=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( ENVMAP_TYPE_PMREM )
		#if defined( STANDARD ) || defined( LAMBERT ) || defined( PHONG )
			iblIrradiance += getIBLIrradiance( geometryNormal );
		#endif
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		vec3 iblRadiance = getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		vec3 iblRadiance = getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_RETROREFLECTION
		#ifdef USE_ANISOTROPY
			vec3 retroIBLRadiance = getIBLAnisotropyRetroRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
		#else
			vec3 retroIBLRadiance = getIBLRetroRadiance( geometryViewDir, geometryNormal, material.roughness );
		#endif
		iblRadiance = mix( iblRadiance, retroIBLRadiance, saturate( material.retroreflectivity ) );
	#endif
	radiance += iblRadiance;
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,D0=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,U0=`#if NUM_LIGHT_PROBE_GRIDS > 0
uniform highp sampler3D probesSH[ NUM_LIGHT_PROBE_GRIDS ];
uniform vec3 probesMin[ NUM_LIGHT_PROBE_GRIDS ];
uniform vec3 probesMax[ NUM_LIGHT_PROBE_GRIDS ];
uniform vec3 probesResolution[ NUM_LIGHT_PROBE_GRIDS ];
bool isInsideLightProbeGrid( vec3 worldPos, vec3 worldNormal, vec3 probesMin, vec3 probesMax, vec3 probesResolution ) {
	vec3 spacing = ( probesMax - probesMin ) / probesResolution;
	vec3 samplePos = worldPos + worldNormal * spacing * 0.5;
	vec3 margin = spacing * 0.01;
	return all( greaterThanEqual( samplePos, probesMin - margin ) ) && all( lessThanEqual( samplePos, probesMax + margin ) );
}
vec3 getLightProbeGridIrradiance( highp sampler3D probesSH, vec3 probesMin, vec3 probesMax, vec3 probesResolution, vec3 worldPos, vec3 worldNormal ) {
	vec3 res = probesResolution;
	vec3 gridRange = probesMax - probesMin;
	vec3 probeSpacing = gridRange / res;
	vec3 samplePos = worldPos + worldNormal * probeSpacing * 0.5;
	vec3 uvw = clamp( ( samplePos - probesMin ) / gridRange, 0.5 / res, 1.0 - 0.5 / res );
	float nz          = res.z;
	float paddedSlices = nz + 2.0;
	float atlasDepth  = 7.0 * paddedSlices;
	float uvZBase     = uvw.z * nz + 1.0;
	vec4 s0 = texture( probesSH, vec3( uvw.xy, ( uvZBase                       ) / atlasDepth ) );
	vec4 s1 = texture( probesSH, vec3( uvw.xy, ( uvZBase +       paddedSlices   ) / atlasDepth ) );
	vec4 s2 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 2.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s3 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 3.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s4 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 4.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s5 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 5.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s6 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 6.0 * paddedSlices   ) / atlasDepth ) );
	vec3 c0 = s0.xyz;
	vec3 c1 = vec3( s0.w, s1.xy );
	vec3 c2 = vec3( s1.zw, s2.x );
	vec3 c3 = s2.yzw;
	vec3 c4 = s3.xyz;
	vec3 c5 = vec3( s3.w, s4.xy );
	vec3 c6 = vec3( s4.zw, s5.x );
	vec3 c7 = s5.yzw;
	vec3 c8 = s6.xyz;
	float x = worldNormal.x, y = worldNormal.y, z = worldNormal.z;
	vec3 result = c0 * 0.886227;
	result += c1 * 2.0 * 0.511664 * y;
	result += c2 * 2.0 * 0.511664 * z;
	result += c3 * 2.0 * 0.511664 * x;
	result += c4 * 2.0 * 0.429043 * x * y;
	result += c5 * 2.0 * 0.429043 * y * z;
	result += c6 * ( 0.743125 * z * z - 0.247708 );
	result += c7 * 2.0 * 0.429043 * x * z;
	result += c8 * 0.429043 * ( x * x - y * y );
	return max( result, vec3( 0.0 ) );
}
#endif`,F0=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,O0=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,B0=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,k0=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,z0=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,G0=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,V0=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,H0=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,W0=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,q0=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,X0=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,Y0=`#if defined( USE_MORPHCOLORS )
	#if defined( USE_COLOR_ALPHA )
		vColor *= morphTargetBaseInfluence;
	#elif defined( USE_COLOR )
		vColor.rgb *= morphTargetBaseInfluence;
	#endif
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor.rgb += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,$0=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Z0=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,K0=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,J0=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#ifdef DOUBLE_SIDED
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#ifdef DOUBLE_SIDED
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,Q0=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#if defined( USE_PACKED_NORMALMAP )
		mapN = vec3( mapN.xy, sqrt( saturate( 1.0 - dot( mapN.xy, mapN.xy ) ) ) );
	#endif
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,j0=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,tg=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,eg=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
		#ifdef FLIP_SIDED
			vBitangent = - vBitangent;
		#endif
	#endif
#endif`,ng=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,ig=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,sg=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,rg=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,ag=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,og=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,lg=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	#ifdef USE_REVERSED_DEPTH_BUFFER
	
		return depth * ( far - near ) - far;
	#else
		return depth * ( near - far ) - near;
	#endif
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	
	#ifdef USE_REVERSED_DEPTH_BUFFER
		return ( near * far ) / ( ( near - far ) * depth - near );
	#else
		return ( near * far ) / ( ( far - near ) * depth - far );
	#endif
}`,cg=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,hg=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,ug=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,dg=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,fg=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,pg=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,mg=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
		#define SUN_LIGHT_CASCADES 2
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow sunShadowMap[ NUM_SUN_LIGHT_SHADOWS ];
		#else
			uniform sampler2D sunShadowMap[ NUM_SUN_LIGHT_SHADOWS ];
		#endif
		uniform mat4 sunShadowMatrix[ NUM_SUN_LIGHT_SHADOWS * SUN_LIGHT_CASCADES ];
		uniform vec4 sunShadowCascade[ NUM_SUN_LIGHT_SHADOWS * SUN_LIGHT_CASCADES ];
		varying vec4 vSunShadowWorldPosition;
		varying vec3 vSunShadowWorldNormal;
		struct SunLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SunLightShadow sunLightShadows[ NUM_SUN_LIGHT_SHADOWS ];
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#else
			uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#endif
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#else
			uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#endif
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform samplerCubeShadow pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#elif defined( SHADOWMAP_TYPE_BASIC )
			uniform samplerCube pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#endif
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float interleavedGradientNoise( vec2 position ) {
			return fract( 52.9829189 * fract( dot( position, vec2( 0.06711056, 0.00583715 ) ) ) );
		}
		vec2 vogelDiskSample( int sampleIndex, int samplesCount, float phi ) {
			const float goldenAngle = 2.399963229728653;
			float r = sqrt( ( float( sampleIndex ) + 0.5 ) / float( samplesCount ) );
			float theta = float( sampleIndex ) * goldenAngle + phi;
			return vec2( cos( theta ), sin( theta ) ) * r;
		}
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float getShadow( sampler2DShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
				vec2 radius = shadowRadius * texelSize;
				float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
				shadow = (
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 0, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 1, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 2, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 3, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 4, 5, phi ) * radius, shadowCoord.z ) )
				) * 0.2;
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#elif defined( SHADOWMAP_TYPE_VSM )
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 distribution = texture2D( shadowMap, shadowCoord.xy ).rg;
				float mean = distribution.x;
				float variance = distribution.y * distribution.y;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					float hard_shadow = step( mean, shadowCoord.z );
				#else
					float hard_shadow = step( shadowCoord.z, mean );
				#endif
				
				if ( hard_shadow == 1.0 ) {
					shadow = 1.0;
				} else {
					variance = max( variance, 0.0000001 );
					float d = shadowCoord.z - mean;
					float p_max = variance / ( variance + d * d );
					p_max = clamp( ( p_max - 0.3 ) / 0.65, 0.0, 1.0 );
					shadow = max( hard_shadow, p_max );
				}
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#else
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				float depth = texture2D( shadowMap, shadowCoord.xy ).r;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					shadow = step( depth, shadowCoord.z );
				#else
					shadow = step( shadowCoord.z, depth );
				#endif
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#endif
	#if NUM_SUN_LIGHT_SHADOWS > 0
		float getSunShadow(
			#if defined( SHADOWMAP_TYPE_PCF )
				sampler2DShadow shadowMap,
			#else
				sampler2D shadowMap,
			#endif
			SunLightShadow sunLightShadow,
			int shadowIndex
		) {
			vec4 shadowWorldPosition = vec4( vSunShadowWorldPosition.xyz + vSunShadowWorldNormal * sunLightShadow.shadowNormalBias, 1.0 );
			float viewDepth = vSunShadowWorldPosition.w;
			int cascadeOffset = shadowIndex * SUN_LIGHT_CASCADES;
			float shadow = 1.0;
			for ( int i = SUN_LIGHT_CASCADES - 1; i >= 0; i -- ) {
				vec4 cascade = sunShadowCascade[ cascadeOffset + i ];
				if ( viewDepth >= cascade.x && viewDepth < cascade.y ) {
					float cascadeShadow = getShadow(
						shadowMap,
						sunLightShadow.shadowMapSize,
						sunLightShadow.shadowIntensity,
						sunLightShadow.shadowBias,
						sunLightShadow.shadowRadius,
						sunShadowMatrix[ cascadeOffset + i ] * shadowWorldPosition
					);
					shadow = mix( cascadeShadow, shadow, smoothstep( cascade.z, cascade.y, viewDepth ) );
				}
			}
			return shadow;
		}
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	#if defined( SHADOWMAP_TYPE_PCF )
	float getPointShadow( samplerCubeShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 bd3D = normalize( lightToPosition );
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			float lightDistance = length( lightToPosition );
			float depthRange = shadowCameraFar - shadowCameraNear;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				float depthA = - shadowCameraNear / depthRange - shadowBias;
				float depthB = shadowCameraNear * shadowCameraFar / ( depthRange * lightDistance );
			#else
				float depthA = shadowCameraFar / depthRange + shadowBias;
				float depthB = - shadowCameraNear * shadowCameraFar / ( depthRange * lightDistance );
			#endif
			float texelSize = shadowRadius / shadowMapSize.x;
			vec3 absDir = abs( bd3D );
			vec3 tangent = absDir.x > absDir.z ? vec3( 0.0, 1.0, 0.0 ) : vec3( 1.0, 0.0, 0.0 );
			tangent = normalize( cross( bd3D, tangent ) );
			vec3 bitangent = cross( bd3D, tangent );
			float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
			shadow = 0.0;
			for ( int i = 0; i < 5; i ++ ) {
				vec2 offset = vogelDiskSample( i, 5, phi );
				vec3 direction = bd3D + ( tangent * offset.x + bitangent * offset.y ) * texelSize;
				vec3 absDirection = abs( direction );
				float dp = depthA + depthB / max( max( absDirection.x, absDirection.y ), absDirection.z );
				shadow += texture( shadowMap, vec4( direction, dp ) );
			}
			shadow *= 0.2;
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#elif defined( SHADOWMAP_TYPE_BASIC )
	float getPointShadow( samplerCube shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			float depth = textureCube( shadowMap, bd3D ).r;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				depth = 1.0 - depth;
			#endif
			shadow = step( dp, depth );
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#endif
	#endif
#endif`,gg=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
		varying vec4 vSunShadowWorldPosition;
		varying vec3 vSunShadowWorldNormal;
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,xg=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_SUN_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	#ifdef HAS_NORMAL
		vec3 shadowWorldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
	#else
		vec3 shadowWorldNormal = vec3( 0.0 );
	#endif
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_SUN_LIGHT_SHADOWS > 0
		vSunShadowWorldPosition = vec4( worldPosition.xyz, - mvPosition.z );
		vSunShadowWorldNormal = shadowWorldNormal;
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,_g=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
	SunLightShadow sunLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SUN_LIGHT_SHADOWS; i ++ ) {
		sunLight = sunLightShadows[ i ];
		shadow *= receiveShadow ? getSunShadow( sunShadowMap[ i ], sunLight, UNROLLED_LOOP_INDEX ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0 && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,yg=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,vg=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,Mg=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,Sg=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,bg=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,wg=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,Tg=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,Eg=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,Ag=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseContribution, material.specularColorBlended, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,Cg=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		#else
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,Rg=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_DIFFUSE_ROUGHNESSMAP
	varying vec2 vDiffuseRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,Ig=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_DIFFUSE_ROUGHNESSMAP
	uniform mat3 diffuseRoughnessMapTransform;
	varying vec2 vDiffuseRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,Pg=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DIFFUSE_ROUGHNESSMAP
	vDiffuseRoughnessMapUv = ( diffuseRoughnessMapTransform * vec3( DIFFUSE_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,Lg=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,Ng=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,Dg=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Ug=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Fg=`uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <envmap_common_pars_fragment>
void main() {
	#ifdef ENVMAP_TYPE_PMREM
		vec4 texColor = textureLod( envMap, backgroundRotation * vWorldDirection, roughnessToMip( backgroundBlurriness ) );
	#else
		vec4 texColor = textureCube( envMap, backgroundRotation * vWorldDirection );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Og=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Bg=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,kg=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,zg=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	#ifdef USE_REVERSED_DEPTH_BUFFER
		float fragCoordZ = vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ];
	#else
		float fragCoordZ = 0.5 * vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ] + 0.5;
	#endif
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,Gg=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,Vg=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = vec4( dist, 0.0, 0.0, 1.0 );
}`,Hg=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,Wg=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,qg=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,Xg=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,Yg=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,$g=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Zg=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Kg=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Jg=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,Qg=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,jg=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,tx=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( normalize( normal ) * 0.5 + 0.5, diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,ex=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,nx=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,ix=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,sx=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DIFFUSE_ROUGHNESS
	uniform float diffuseRoughness;
	#ifdef USE_DIFFUSE_ROUGHNESSMAP
		uniform sampler2D diffuseRoughnessMap;
	#endif
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_RETROREFLECTION
	uniform float retroreflectivity;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
 
		outgoingLight = outgoingLight + sheenSpecularDirect + sheenSpecularIndirect;
 
 	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,rx=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,ax=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,ox=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,lx=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,cx=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,hx=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,ux=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,dx=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,ne={alphahash_fragment:Dm,alphahash_pars_fragment:Um,alphamap_fragment:Fm,alphamap_pars_fragment:Om,alphatest_fragment:Bm,alphatest_pars_fragment:km,aomap_fragment:zm,aomap_pars_fragment:Gm,batching_pars_vertex:Vm,batching_vertex:Hm,begin_vertex:Wm,beginnormal_vertex:qm,bsdfs:Xm,iridescence_fragment:Ym,bumpmap_pars_fragment:$m,clipping_planes_fragment:Zm,clipping_planes_pars_fragment:Km,clipping_planes_pars_vertex:Jm,clipping_planes_vertex:Qm,color_fragment:jm,color_pars_fragment:t0,color_pars_vertex:e0,color_vertex:n0,common:i0,defaultnormal_vertex:s0,displacementmap_pars_vertex:r0,displacementmap_vertex:a0,emissivemap_fragment:o0,emissivemap_pars_fragment:l0,colorspace_fragment:c0,colorspace_pars_fragment:h0,envmap_fragment:u0,envmap_common_pars_fragment:d0,envmap_pars_fragment:f0,envmap_pars_vertex:p0,envmap_physical_pars_fragment:T0,envmap_vertex:m0,fog_vertex:g0,fog_pars_vertex:x0,fog_fragment:_0,fog_pars_fragment:y0,gradientmap_pars_fragment:v0,lightmap_pars_fragment:M0,lights_lambert_fragment:S0,lights_lambert_pars_fragment:b0,lights_pars_begin:w0,lights_toon_fragment:E0,lights_toon_pars_fragment:A0,lights_phong_fragment:C0,lights_phong_pars_fragment:R0,lights_physical_fragment:I0,lights_physical_pars_fragment:P0,lights_fragment_begin:L0,lights_fragment_maps:N0,lights_fragment_end:D0,lightprobes_pars_fragment:U0,logdepthbuf_fragment:F0,logdepthbuf_pars_fragment:O0,logdepthbuf_pars_vertex:B0,logdepthbuf_vertex:k0,map_fragment:z0,map_pars_fragment:G0,map_particle_fragment:V0,map_particle_pars_fragment:H0,metalnessmap_fragment:W0,metalnessmap_pars_fragment:q0,morphinstance_vertex:X0,morphcolor_vertex:Y0,morphnormal_vertex:$0,morphtarget_pars_vertex:Z0,morphtarget_vertex:K0,normal_fragment_begin:J0,normal_fragment_maps:Q0,normal_pars_fragment:j0,normal_pars_vertex:tg,normal_vertex:eg,normalmap_pars_fragment:ng,clearcoat_normal_fragment_begin:ig,clearcoat_normal_fragment_maps:sg,clearcoat_pars_fragment:rg,iridescence_pars_fragment:ag,opaque_fragment:og,packing:lg,premultiplied_alpha_fragment:cg,project_vertex:hg,dithering_fragment:ug,dithering_pars_fragment:dg,roughnessmap_fragment:fg,roughnessmap_pars_fragment:pg,shadowmap_pars_fragment:mg,shadowmap_pars_vertex:gg,shadowmap_vertex:xg,shadowmask_pars_fragment:_g,skinbase_vertex:yg,skinning_pars_vertex:vg,skinning_vertex:Mg,skinnormal_vertex:Sg,specularmap_fragment:bg,specularmap_pars_fragment:wg,tonemapping_fragment:Tg,tonemapping_pars_fragment:Eg,transmission_fragment:Ag,transmission_pars_fragment:Cg,uv_pars_fragment:Rg,uv_pars_vertex:Ig,uv_vertex:Pg,worldpos_vertex:Lg,background_vert:Ng,background_frag:Dg,backgroundCube_vert:Ug,backgroundCube_frag:Fg,cube_vert:Og,cube_frag:Bg,depth_vert:kg,depth_frag:zg,distance_vert:Gg,distance_frag:Vg,equirect_vert:Hg,equirect_frag:Wg,linedashed_vert:qg,linedashed_frag:Xg,meshbasic_vert:Yg,meshbasic_frag:$g,meshlambert_vert:Zg,meshlambert_frag:Kg,meshmatcap_vert:Jg,meshmatcap_frag:Qg,meshnormal_vert:jg,meshnormal_frag:tx,meshphong_vert:ex,meshphong_frag:nx,meshphysical_vert:ix,meshphysical_frag:sx,meshtoon_vert:rx,meshtoon_frag:ax,points_vert:ox,points_frag:lx,shadow_vert:cx,shadow_frag:hx,sprite_vert:ux,sprite_frag:dx},Pt={common:{diffuse:{value:new jt(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Zt},alphaMap:{value:null},alphaMapTransform:{value:new Zt},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Zt}},envmap:{envMap:{value:null},envMapRotation:{value:new Zt},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Zt}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Zt}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Zt},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Zt},normalScale:{value:new Ct(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Zt},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Zt}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Zt}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Zt}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new jt(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},sunLights:{value:[],properties:{direction:{},color:{}}},sunLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},sunShadowMatrix:{value:[]},sunShadowCascade:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:[]},probesMin:{value:[]},probesMax:{value:[]},probesResolution:{value:[]}},points:{diffuse:{value:new jt(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Zt},alphaTest:{value:0},uvTransform:{value:new Zt}},sprite:{diffuse:{value:new jt(16777215)},opacity:{value:1},center:{value:new Ct(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Zt},alphaMap:{value:null},alphaMapTransform:{value:new Zt},alphaTest:{value:0}}},qn={basic:{uniforms:Ye([Pt.common,Pt.specularmap,Pt.envmap,Pt.aomap,Pt.lightmap,Pt.fog]),vertexShader:ne.meshbasic_vert,fragmentShader:ne.meshbasic_frag},lambert:{uniforms:Ye([Pt.common,Pt.specularmap,Pt.envmap,Pt.aomap,Pt.lightmap,Pt.emissivemap,Pt.bumpmap,Pt.normalmap,Pt.displacementmap,Pt.fog,Pt.lights,{emissive:{value:new jt(0)},envMapIntensity:{value:1}}]),vertexShader:ne.meshlambert_vert,fragmentShader:ne.meshlambert_frag},phong:{uniforms:Ye([Pt.common,Pt.specularmap,Pt.envmap,Pt.aomap,Pt.lightmap,Pt.emissivemap,Pt.bumpmap,Pt.normalmap,Pt.displacementmap,Pt.fog,Pt.lights,{emissive:{value:new jt(0)},specular:{value:new jt(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:ne.meshphong_vert,fragmentShader:ne.meshphong_frag},standard:{uniforms:Ye([Pt.common,Pt.envmap,Pt.aomap,Pt.lightmap,Pt.emissivemap,Pt.bumpmap,Pt.normalmap,Pt.displacementmap,Pt.roughnessmap,Pt.metalnessmap,Pt.fog,Pt.lights,{emissive:{value:new jt(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:ne.meshphysical_vert,fragmentShader:ne.meshphysical_frag},toon:{uniforms:Ye([Pt.common,Pt.aomap,Pt.lightmap,Pt.emissivemap,Pt.bumpmap,Pt.normalmap,Pt.displacementmap,Pt.gradientmap,Pt.fog,Pt.lights,{emissive:{value:new jt(0)}}]),vertexShader:ne.meshtoon_vert,fragmentShader:ne.meshtoon_frag},matcap:{uniforms:Ye([Pt.common,Pt.bumpmap,Pt.normalmap,Pt.displacementmap,Pt.fog,{matcap:{value:null}}]),vertexShader:ne.meshmatcap_vert,fragmentShader:ne.meshmatcap_frag},points:{uniforms:Ye([Pt.points,Pt.fog]),vertexShader:ne.points_vert,fragmentShader:ne.points_frag},dashed:{uniforms:Ye([Pt.common,Pt.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:ne.linedashed_vert,fragmentShader:ne.linedashed_frag},depth:{uniforms:Ye([Pt.common,Pt.displacementmap]),vertexShader:ne.depth_vert,fragmentShader:ne.depth_frag},normal:{uniforms:Ye([Pt.common,Pt.bumpmap,Pt.normalmap,Pt.displacementmap,{opacity:{value:1}}]),vertexShader:ne.meshnormal_vert,fragmentShader:ne.meshnormal_frag},sprite:{uniforms:Ye([Pt.sprite,Pt.fog]),vertexShader:ne.sprite_vert,fragmentShader:ne.sprite_frag},background:{uniforms:{uvTransform:{value:new Zt},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:ne.background_vert,fragmentShader:ne.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Zt}},vertexShader:ne.backgroundCube_vert,fragmentShader:ne.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:ne.cube_vert,fragmentShader:ne.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:ne.equirect_vert,fragmentShader:ne.equirect_frag},distance:{uniforms:Ye([Pt.common,Pt.displacementmap,{referencePosition:{value:new J},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:ne.distance_vert,fragmentShader:ne.distance_frag},shadow:{uniforms:Ye([Pt.lights,Pt.fog,{color:{value:new jt(0)},opacity:{value:1}}]),vertexShader:ne.shadow_vert,fragmentShader:ne.shadow_frag}};qn.physical={uniforms:Ye([qn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Zt},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Zt},clearcoatNormalScale:{value:new Ct(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Zt},diffuseRoughness:{value:0},diffuseRoughnessMap:{value:null},diffuseRoughnessMapTransform:{value:new Zt},dispersion:{value:0},retroreflectivity:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Zt},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Zt},sheen:{value:0},sheenColor:{value:new jt(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Zt},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Zt},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Zt},transmissionSamplerSize:{value:new Ct},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Zt},attenuationDistance:{value:0},attenuationColor:{value:new jt(0)},specularColor:{value:new jt(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Zt},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Zt},anisotropyVector:{value:new Ct},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Zt}}]),vertexShader:ne.meshphysical_vert,fragmentShader:ne.meshphysical_frag};var Zo={r:0,b:0,g:0},fx=new ye,pf=new Zt;pf.set(-1,0,0,0,1,0,0,0,1);function px(n,t,e,i,s,r){let a=new jt(0),o=s===!0?0:1,l,c,u=null,d=0,h=null;function f(w){let _=w.isScene===!0?w.background:null;if(_&&_.isTexture){let v=w.backgroundBlurriness>0;_=t.get(_,v)}return _}function p(w){let _=!1,v=f(w);v===null?x(a,o):v&&v.isColor&&(x(v,1),_=!0);let R=n.xr.getEnvironmentBlendMode();R==="additive"?e.buffers.color.setClear(0,0,0,1,r):R==="alpha-blend"&&e.buffers.color.setClear(0,0,0,0,r),(n.autoClear||_)&&(e.buffers.depth.setTest(!0),e.buffers.depth.setMask(!0),e.buffers.color.setMask(!0),n.clear(n.autoClearColor,n.autoClearDepth,n.autoClearStencil))}function T(w,_){let v=f(_);v&&v.isCubeTexture?(c===void 0&&(c=new Xe(new Mi(1,1,1),new Hn({name:"BackgroundCubeMaterial",uniforms:Ji(qn.backgroundCube.uniforms),vertexShader:qn.backgroundCube.vertexShader,fragmentShader:qn.backgroundCube.fragmentShader,side:en,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),c.geometry.deleteAttribute("uv"),c.onBeforeRender=function(R,N,m){this.matrixWorld.copyPosition(m.matrixWorld)},Object.defineProperty(c.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),i.update(c)),c.material.uniforms.envMap.value=v,c.material.uniforms.backgroundBlurriness.value=_.backgroundBlurriness,c.material.uniforms.backgroundIntensity.value=_.backgroundIntensity,c.material.uniforms.backgroundRotation.value.setFromMatrix4(fx.makeRotationFromEuler(_.backgroundRotation)).transpose(),v.isRenderTargetTexture===!1&&c.material.uniforms.backgroundRotation.value.premultiply(pf),c.material.toneMapped=ce.getTransfer(v.colorSpace)!==fe,(u!==v||d!==v.version||h!==n.toneMapping)&&(c.material.needsUpdate=!0,u=v,d=v.version,h=n.toneMapping),c.layers.enableAll(),w.unshift(c,c.geometry,c.material,0,0,null)):v&&v.isTexture&&(l===void 0&&(l=new Xe(new Si(2,2),new Hn({name:"BackgroundMaterial",uniforms:Ji(qn.background.uniforms),vertexShader:qn.background.vertexShader,fragmentShader:qn.background.fragmentShader,side:Ei,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),i.update(l)),l.material.uniforms.t2D.value=v,l.material.uniforms.backgroundIntensity.value=_.backgroundIntensity,l.material.toneMapped=ce.getTransfer(v.colorSpace)!==fe,v.matrixAutoUpdate===!0&&v.updateMatrix(),l.material.uniforms.uvTransform.value.copy(v.matrix),(u!==v||d!==v.version||h!==n.toneMapping)&&(l.material.needsUpdate=!0,u=v,d=v.version,h=n.toneMapping),l.layers.enableAll(),w.unshift(l,l.geometry,l.material,0,0,null))}function x(w,_){w.getRGB(Zo,oh(n)),e.buffers.color.setClear(Zo.r,Zo.g,Zo.b,_,r)}function g(){c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0),l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0)}return{getClearColor:function(){return a},setClearColor:function(w,_=1){a.set(w),o=_,x(a,o)},getClearAlpha:function(){return o},setClearAlpha:function(w){o=w,x(a,o)},render:p,addToRenderList:T,dispose:g}}function mx(n,t){let e=n.getParameter(n.MAX_VERTEX_ATTRIBS),i={},s=h(null),r=s,a=!1;function o(B,C,O,D,E){let z=!1,b=d(B,D,O,C);r!==b&&(r=b,c(r.object)),z=f(B,D,O,E),z&&p(B,D,O,E),E!==null&&t.update(E,n.ELEMENT_ARRAY_BUFFER),(z||a)&&(a=!1,v(B,C,O,D),E!==null&&n.bindBuffer(n.ELEMENT_ARRAY_BUFFER,t.get(E).buffer))}function l(){return n.createVertexArray()}function c(B){return n.bindVertexArray(B)}function u(B){return n.deleteVertexArray(B)}function d(B,C,O,D){let E=D.wireframe===!0,z=i[C.id];z===void 0&&(z={},i[C.id]=z);let b=B.isInstancedMesh===!0?B.id:0,I=z[b];I===void 0&&(I={},z[b]=I);let y=I[O.id];y===void 0&&(y={},I[O.id]=y);let F=y[E];return F===void 0&&(F=h(l()),y[E]=F),F}function h(B){let C=[],O=[],D=[];for(let E=0;E<e;E++)C[E]=0,O[E]=0,D[E]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:C,enabledAttributes:O,attributeDivisors:D,object:B,attributes:{},index:null}}function f(B,C,O,D){let E=r.attributes,z=C.attributes,b=0,I=O.getAttributes();for(let y in I)if(I[y].location>=0){let S=E[y],U=z[y];if(U===void 0&&(y==="instanceMatrix"&&B.instanceMatrix&&(U=B.instanceMatrix),y==="instanceColor"&&B.instanceColor&&(U=B.instanceColor)),S===void 0||S.attribute!==U||U&&S.data!==U.data)return!0;b++}return r.attributesNum!==b||r.index!==D}function p(B,C,O,D){let E={},z=C.attributes,b=0,I=O.getAttributes();for(let y in I)if(I[y].location>=0){let S=z[y];S===void 0&&(y==="instanceMatrix"&&B.instanceMatrix&&(S=B.instanceMatrix),y==="instanceColor"&&B.instanceColor&&(S=B.instanceColor));let U={};U.attribute=S,S&&S.data&&(U.data=S.data),E[y]=U,b++}r.attributes=E,r.attributesNum=b,r.index=D}function T(){let B=r.newAttributes;for(let C=0,O=B.length;C<O;C++)B[C]=0}function x(B){g(B,0)}function g(B,C){let O=r.newAttributes,D=r.enabledAttributes,E=r.attributeDivisors;O[B]=1,D[B]===0&&(n.enableVertexAttribArray(B),D[B]=1),E[B]!==C&&(n.vertexAttribDivisor(B,C),E[B]=C)}function w(){let B=r.newAttributes,C=r.enabledAttributes;for(let O=0,D=C.length;O<D;O++)C[O]!==B[O]&&(n.disableVertexAttribArray(O),C[O]=0)}function _(B,C,O,D,E,z,b){b===!0?n.vertexAttribIPointer(B,C,O,E,z):n.vertexAttribPointer(B,C,O,D,E,z)}function v(B,C,O,D){T();let E=D.attributes,z=O.getAttributes(),b=C.defaultAttributeValues;for(let I in z){let y=z[I];if(y.location>=0){let F=E[I];if(F===void 0&&(I==="instanceMatrix"&&B.instanceMatrix&&(F=B.instanceMatrix),I==="instanceColor"&&B.instanceColor&&(F=B.instanceColor)),F!==void 0){let S=F.normalized,U=F.itemSize,V=t.get(F);if(V===void 0)continue;let A=V.buffer,q=V.type,W=V.bytesPerElement,Z=q===n.INT||q===n.UNSIGNED_INT||F.gpuType===uo;if(F.isInterleavedBufferAttribute){let Y=F.data,et=Y.isInterleavedBuffer===!0?Y.stride:Y.itemSize,ft=F.offset;if(Y.isInstancedInterleavedBuffer||Y.isInstancedBufferAttribute){for(let ct=0;ct<y.locationSize;ct++)g(y.location+ct,Y.meshPerAttribute);B.isInstancedMesh!==!0&&D._maxInstanceCount===void 0&&(D._maxInstanceCount=Y.meshPerAttribute*Y.count)}else for(let ct=0;ct<y.locationSize;ct++)x(y.location+ct);n.bindBuffer(n.ARRAY_BUFFER,A);for(let ct=0;ct<y.locationSize;ct++)_(y.location+ct,U/y.locationSize,q,S,et*W,(ft+U/y.locationSize*ct)*W,Z)}else{if(F.isInstancedBufferAttribute){for(let Y=0;Y<y.locationSize;Y++)g(y.location+Y,F.meshPerAttribute);B.isInstancedMesh!==!0&&D._maxInstanceCount===void 0&&(D._maxInstanceCount=F.meshPerAttribute*F.count)}else for(let Y=0;Y<y.locationSize;Y++)x(y.location+Y);n.bindBuffer(n.ARRAY_BUFFER,A);for(let Y=0;Y<y.locationSize;Y++)_(y.location+Y,U/y.locationSize,q,S,U*W,U/y.locationSize*Y*W,Z)}}else if(b!==void 0){let S=b[I];if(S!==void 0)switch(S.length){case 2:n.vertexAttrib2fv(y.location,S);break;case 3:n.vertexAttrib3fv(y.location,S);break;case 4:n.vertexAttrib4fv(y.location,S);break;default:n.vertexAttrib1fv(y.location,S)}}}}w()}function R(){L();for(let B in i){let C=i[B];for(let O in C){let D=C[O];for(let E in D){let z=D[E];for(let b in z)u(z[b].object),delete z[b];delete D[E]}}delete i[B]}}function N(B){if(i[B.id]===void 0)return;let C=i[B.id];for(let O in C){let D=C[O];for(let E in D){let z=D[E];for(let b in z)u(z[b].object),delete z[b];delete D[E]}}delete i[B.id]}function m(B){for(let C in i){let O=i[C];for(let D in O){let E=O[D];if(E[B.id]===void 0)continue;let z=E[B.id];for(let b in z)u(z[b].object),delete z[b];delete E[B.id]}}}function M(B){for(let C in i){let O=i[C],D=B.isInstancedMesh===!0?B.id:0,E=O[D];if(E!==void 0){for(let z in E){let b=E[z];for(let I in b)u(b[I].object),delete b[I];delete E[z]}delete O[D],Object.keys(O).length===0&&delete i[C]}}}function L(){P(),a=!0,r!==s&&(r=s,c(r.object))}function P(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:o,reset:L,resetDefaultState:P,dispose:R,releaseStatesOfGeometry:N,releaseStatesOfObject:M,releaseStatesOfProgram:m,initAttributes:T,enableAttribute:x,disableUnusedAttributes:w}}function gx(n,t,e){let i;function s(l){i=l}function r(l,c){n.drawArrays(i,l,c),e.update(c,i,1)}function a(l,c,u){u!==0&&(n.drawArraysInstanced(i,l,c,u),e.update(c,i,u))}function o(l,c,u){if(u===0)return;t.get("WEBGL_multi_draw").multiDrawArraysWEBGL(i,l,0,c,0,u);let h=0;for(let f=0;f<u;f++)h+=c[f];e.update(h,i,1)}this.setMode=s,this.render=r,this.renderInstances=a,this.renderMultiDraw=o}function xx(n,t,e,i){let s;function r(){if(s!==void 0)return s;if(t.has("EXT_texture_filter_anisotropic")===!0){let m=t.get("EXT_texture_filter_anisotropic");s=n.getParameter(m.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function a(m){return!(m!==Dn&&i.convert(m)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(m){let M=m===Nn&&(t.has("EXT_color_buffer_half_float")||t.has("EXT_color_buffer_float"));return!(m!==on&&m!==Ln&&!M&&i.convert(m)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_TYPE))}function l(m){if(m==="highp"){if(n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.HIGH_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.HIGH_FLOAT).precision>0)return"highp";m="mediump"}return m==="mediump"&&n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.MEDIUM_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=e.precision!==void 0?e.precision:"highp",u=l(c);u!==c&&(Xt("WebGLRenderer:",c,"not supported, using",u,"instead."),c=u);let d=e.reversedDepthBuffer===!0&&t.has("EXT_clip_control"),h=e.logarithmicDepthBuffer===!0&&d===!1;e.reversedDepthBuffer===!0&&d===!1&&Xt("WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer."),e.logarithmicDepthBuffer===!0&&d===!0&&Xt("WebGLRenderer: Logarithmic depth buffer is ignored when reversed depth buffer is enabled.");let f=n.getParameter(n.MAX_TEXTURE_IMAGE_UNITS),p=n.getParameter(n.MAX_VERTEX_TEXTURE_IMAGE_UNITS),T=n.getParameter(n.MAX_TEXTURE_SIZE),x=n.getParameter(n.MAX_CUBE_MAP_TEXTURE_SIZE),g=n.getParameter(n.MAX_VERTEX_ATTRIBS),w=n.getParameter(n.MAX_VERTEX_UNIFORM_VECTORS),_=n.getParameter(n.MAX_VARYING_VECTORS),v=n.getParameter(n.MAX_FRAGMENT_UNIFORM_VECTORS),R=n.getParameter(n.MAX_SAMPLES),N=n.getParameter(n.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:l,textureFormatReadable:a,textureTypeReadable:o,precision:c,logarithmicDepthBuffer:h,reversedDepthBuffer:d,maxTextures:f,maxVertexTextures:p,maxTextureSize:T,maxCubemapSize:x,maxAttributes:g,maxVertexUniforms:w,maxVaryings:_,maxFragmentUniforms:v,maxSamples:R,samples:N}}function _x(n){let t=this,e=null,i=0,s=!1,r=!1,a=new In,o=new Zt,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(d,h){let f=d.length!==0||h||i!==0||s;return s=h,i=d.length,f},this.beginShadows=function(){r=!0,u(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(d,h){e=u(d,h,0)},this.setState=function(d,h,f){let p=d.clippingPlanes,T=d.clipIntersection,x=d.clipShadows,g=n.get(d);if(!s||p===null||p.length===0||r&&!x)r?u(null):c();else{let w=r?0:i,_=w*4,v=g.clippingState||null;l.value=v,v=u(p,h,_,f);for(let R=0;R!==_;++R)v[R]=e[R];g.clippingState=v,this.numIntersection=T?this.numPlanes:0,this.numPlanes+=w}};function c(){l.value!==e&&(l.value=e,l.needsUpdate=i>0),t.numPlanes=i,t.numIntersection=0}function u(d,h,f,p){let T=d!==null?d.length:0,x=null;if(T!==0){if(x=l.value,p!==!0||x===null){let g=f+T*4,w=h.matrixWorldInverse;o.getNormalMatrix(w),(x===null||x.length<g)&&(x=new Float32Array(g));for(let _=0,v=f;_!==T;++_,v+=4)a.copy(d[_]).applyMatrix4(w,o),a.normal.toArray(x,v),x[v+3]=a.constant}l.value=x,l.needsUpdate=!0}return t.numPlanes=T,t.numIntersection=0,x}}var Hr=class extends mn{constructor(t=1,e={}){super(t,t,e),this.isWebGLCubeRenderTarget=!0;let i={width:t,height:t,depth:1},s=[i,i,i,i,i,i];this.texture=new pr(s),this._setTextureOptions(e),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(t,e){this.texture.type=e.type,this.texture.colorSpace=e.colorSpace,this.texture.generateMipmaps=e.generateMipmaps,this.texture.minFilter=e.minFilter,this.texture.magFilter=e.magFilter;let i={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},s=new Mi(5,5,5),r=new Hn({name:"CubemapFromEquirect",uniforms:Ji(i.uniforms),vertexShader:i.vertexShader,fragmentShader:i.fragmentShader,side:en,blending:Yi});r.uniforms.tEquirect.value=e;let a=new Xe(s,r),o=e.minFilter;return e.minFilter===si&&(e.minFilter=Qe),new Ps(1,10,this).update(t,a),e.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(t,e=!0,i=!0,s=!0){let r=t.getRenderTarget();for(let a=0;a<6;a++)t.setRenderTarget(this,a),t.clear(e,i,s);t.setRenderTarget(r)}},qd=256,yx=3,vx=20,mf=256,gf=16,Mx=3,Sx=new J,bx=new jt,Bs=class n{constructor(t){this._renderer=t,this._cubeSize=0,this._sourceTarget=null,this._cubeCamera=new Ps(1,10,null),this._boxMesh=new Xe(new Mi(5,5,5),null),this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null,this._integrationMaterial=null}fromScene(t,e=0,i=.1,s=100,r={}){let{size:a=256,position:o=Sx}=r,l=this._renderer;this._setSize(a);let c=this._allocateTarget(),u=this._getSourceTarget(!0);e>0&&(u.texture.mipmapsAutoUpdate=!1);let d=l.autoClear,h=l.autoClearColor,f=l.autoClearDepth,p=l.autoClearStencil,T=t.background;l.autoClear=!0,l.autoClearColor=!0,l.autoClearDepth=!0,l.autoClearStencil=!0,T===null&&(t.background=l.getClearColor(bx));let x=new Ps(i,s,u);return x.position.copy(o),x.update(l,t),l.autoClear=d,l.autoClearColor=h,l.autoClearDepth=f,l.autoClearStencil=p,t.background=T,e>0&&(u.texture.mipmapsAutoUpdate=!0,this._blur(c,e)),this._applyPMREM(c),c}fromEquirectangular(t,e=null){return this._fromTexture(t,e)}fromCubemap(t,e=null){return this._fromTexture(t,e)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=$d(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Yd(),this._compileMaterial(this._equirectMaterial))}dispose(){this._sourceTarget!==null&&this._sourceTarget.dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._integrationMaterial!==null&&this._integrationMaterial.dispose(),this._boxMesh.geometry.dispose()}static lodToRoughness(t,e){return e>0?1-Math.sqrt(1-t/e):0}_setSize(t){this._cubeSize=Math.max(qd,Fd(t))}_fromTexture(t,e){t.mapping===Zi||t.mapping===Ds?this._setSize(t.image.length===0?qd:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4);let i=e||this._allocateTarget();return this._textureToCubemap(t),this._applyPMREM(i),i}_allocateTarget(){let t=this._cubeSize,e=Xd(t,!1,!1),i=Math.log2(t)-yx;for(let s=0;s<=i;s++)e.texture.mipmaps.push({width:t>>s,height:t>>s});return e.texture.name="PMREM",e.texture.isPMREMTexture=!0,e}_getSourceTarget(t=!1){let e=this._cubeSize,i=this._sourceTarget;return(i===null||i.width!==e||t&&i.depthBuffer===!1)&&(i!==null&&i.dispose(),this._sourceTarget=Xd(e,!0,t)),this._sourceTarget}_compileMaterial(t){this._boxMesh.material=t,this._renderer.compile(this._boxMesh,this._cubeCamera.children[0])}_renderCube(t,e,i){let s=this._boxMesh,r=this._cubeCamera;s.material=i,r.renderTarget=t,r.activeMipmapLevel=e;let a=t.width>>e;t.viewport.set(0,0,a,a),r.update(this._renderer,s),t.viewport.set(0,0,t.width,t.height)}_textureToCubemap(t){let e;t.mapping===Zi||t.mapping===Ds?(this._cubemapMaterial===null&&(this._cubemapMaterial=$d()),e=this._cubemapMaterial,e.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):(this._equirectMaterial===null&&(this._equirectMaterial=Yd()),e=this._equirectMaterial),e.uniforms.envMap.value=t,this._renderCube(this._getSourceTarget(),0,e)}_applyPMREM(t){this._ggxMaterial===null&&(this._ggxMaterial=wx(),this._integrationMaterial=Tx());let e=this._cubeSize,i=t.texture.mipmaps.length-1,s=this._ggxMaterial.uniforms;s.envMap.value=this._sourceTarget.texture;let r=this._integrationMaterial.uniforms;r.envMap.value=this._sourceTarget.texture,r.sourceLod.value=Math.log2(e/gf);for(let a=0;a<=i;a++){let o=n.lodToRoughness(a,i);if(a>i-Mx)r.roughness.value=o,this._renderCube(t,a,this._integrationMaterial);else{let l=o>0?Math.log2(e)+.5*Math.log2(6/(mf*Math.pow(o,4)))+.5:0;s.roughness.value=o,s.lodBias.value=l,this._renderCube(t,a,this._ggxMaterial)}}}_blur(t,e){this._blurMaterial===null&&(this._blurMaterial=Ex());let i=this._blurMaterial,s=i.uniforms,r=this._sourceTarget;s.sigma.value=Math.min(e,Math.PI)/Math.SQRT2,s.envMap.value=r.texture,this._renderCube(t,0,i),s.envMap.value=t.texture,this._renderCube(r,0,i)}};function Xd(n,t,e){return new Hr(n,{minFilter:si,generateMipmaps:t,type:Nn,colorSpace:or,depthBuffer:e})}function Wr(n,t,e){return new Hn({name:n,uniforms:t,vertexShader:ne.cube_vert,fragmentShader:e,side:en,blending:Yi,depthTest:!1,depthWrite:!1})}function wx(){return Wr("PMREMGGXConvolution",{envMap:{value:null},roughness:{value:0},lodBias:{value:0}},`

		#define GGX_SAMPLES ${mf}u

		varying vec3 vWorldDirection;

		uniform samplerCube envMap;
		uniform float roughness;
		uniform float lodBias;

		#include <common>

		// Van der Corput radical inverse
		float radicalInverse_VdC( uint bits ) {

			bits = ( bits << 16u ) | ( bits >> 16u );
			bits = ( ( bits & 0x55555555u ) << 1u ) | ( ( bits & 0xAAAAAAAAu ) >> 1u );
			bits = ( ( bits & 0x33333333u ) << 2u ) | ( ( bits & 0xCCCCCCCCu ) >> 2u );
			bits = ( ( bits & 0x0F0F0F0Fu ) << 4u ) | ( ( bits & 0xF0F0F0F0u ) >> 4u );
			bits = ( ( bits & 0x00FF00FFu ) << 8u ) | ( ( bits & 0xFF00FF00u ) >> 8u );
			return float( bits ) * 2.3283064365386963e-10; // / 0x100000000

		}

		// Hammersley sequence
		vec2 hammersley( uint i, uint N ) {

			return vec2( float( i ) / float( N ), radicalInverse_VdC( i ) );

		}

		void main() {

			vec3 N = normalize( vWorldDirection );

			// For very low roughness, just sample the environment directly
			if ( roughness < 0.001 ) {

				gl_FragColor = vec4( textureLod( envMap, N, 0.0 ).rgb, 1.0 );
				return;

			}

			float alpha = roughness * roughness;
			float alpha2 = alpha * alpha;

			// Tangent space basis for VNDF sampling
			vec3 up = abs( N.z ) < 0.999 ? vec3( 0.0, 0.0, 1.0 ) : vec3( 1.0, 0.0, 0.0 );
			vec3 tangent = normalize( cross( up, N ) );
			vec3 bitangent = cross( N, tangent );

			vec3 prefilteredColor = vec3( 0.0 );
			float totalWeight = 0.0;

			for ( uint i = 0u; i < GGX_SAMPLES; i ++ ) {

				vec2 Xi = hammersley( i, GGX_SAMPLES );

				// With V = N, sample the reflected direction directly.
				float invQ = 1.0 / ( 1.0 - Xi.x + alpha2 * Xi.x );
				float NdotL = ( 1.0 - Xi.x - alpha2 * Xi.x ) * invQ;

				if ( NdotL > 0.0 ) {

					float phi = 2.0 * PI * Xi.y;
					float sinTheta = 2.0 * alpha * sqrt( Xi.x * ( 1.0 - Xi.x ) ) * invQ;
					vec3 L = N * NdotL + ( tangent * cos( phi ) + bitangent * sin( phi ) ) * sinTheta;

					// Match the source mip to the sample's solid angle. The terms
					// independent of the sample are precomputed in lodBias.
					float d = alpha2 * invQ;
					float lod = max( log2( d ) + lodBias, 0.0 );

					// Weight by NdotL for the split-sum approximation
					prefilteredColor += textureLod( envMap, L, lod ).rgb * NdotL;
					totalWeight += NdotL;

				}

			}

			gl_FragColor = vec4( prefilteredColor / totalWeight, 1.0 );

		}
	`)}function Tx(){return Wr("PMREMGGXIntegration",{envMap:{value:null},roughness:{value:0},sourceLod:{value:0},sourceSize:{value:gf}},`

		varying vec3 vWorldDirection;

		uniform samplerCube envMap;
		uniform float roughness;
		uniform float sourceLod;
		uniform int sourceSize;

		void main() {

			vec3 N = normalize( vWorldDirection );

			float alpha = roughness * roughness;
			float alpha2 = alpha * alpha;

			float texelSize = 2.0 / float( sourceSize );

			vec3 prefilteredColor = vec3( 0.0 );
			float totalWeight = 0.0;

			// Pair opposite texels: only the one in N's hemisphere contributes.
			for ( int face = 0; face < 3; face ++ ) {

				for ( int y = 0; y < sourceSize; y ++ ) {

					for ( int x = 0; x < sourceSize; x ++ ) {

						vec2 uv = ( vec2( x, y ) + 0.5 ) * texelSize - 1.0;
						vec3 texelDirection = face == 0 ? vec3( 1.0, uv ) : ( face == 1 ? vec3( uv.x, 1.0, uv.y ) : vec3( uv, 1.0 ) );

						float invDistance = inversesqrt( 1.0 + dot( uv, uv ) );
						float NdotL = dot( N, texelDirection );
						texelDirection *= NdotL < 0.0 ? - 1.0 : 1.0;
						NdotL = abs( NdotL ) * invDistance;

						// With V = N, NdotH squared is ( 1 + NdotL ) / 2. Common factors
						// in the GGX distribution and texel solid angle cancel when normalized.
						float d = 1.0 + alpha2 + ( alpha2 - 1.0 ) * NdotL;
						float weight = NdotL * invDistance * invDistance * invDistance / ( d * d );

						prefilteredColor += textureLod( envMap, texelDirection, sourceLod ).rgb * weight;
						totalWeight += weight;

					}

				}

			}

			gl_FragColor = vec4( prefilteredColor / totalWeight, 1.0 );

		}
	`)}function Ex(){return Wr("PMREMSphericalGaussianBlur",{envMap:{value:null},sigma:{value:0}},`

		#define SAMPLES ${vx}
		#define GOLDEN_ANGLE 2.39996322973

		varying vec3 vWorldDirection;

		uniform samplerCube envMap;
		uniform float sigma;

		#include <common>

		void main() {

			vec3 outputDirection = normalize( vWorldDirection );

			vec3 up = abs( outputDirection.z ) < 0.999 ? vec3( 0.0, 0.0, 1.0 ) : vec3( 1.0, 0.0, 0.0 );
			vec3 tangent = normalize( cross( up, outputDirection ) );
			vec3 bitangent = cross( outputDirection, tangent );

			// Truncate the kernel at three standard deviations or at the antipode.
			float thetaMax = min( 3.0 * sigma, PI );
			float truncation = 1.0 - exp( - 0.5 * thetaMax * thetaMax / ( sigma * sigma ) );

			vec3 accumColor = vec3( 0.0 );
			float accumWeight = 0.0;

			for ( int i = 0; i < SAMPLES; i ++ ) {

				// Stratified inverse-CDF sampling of the Gaussian, placed on a golden-angle spiral.
				float stratum = ( float( i ) + 0.5 ) / float( SAMPLES );
				float theta = sigma * sqrt( - 2.0 * log( 1.0 - stratum * truncation ) );
				float phi = float( i ) * GOLDEN_ANGLE;

				vec3 offset = cos( phi ) * tangent + sin( phi ) * bitangent;
				vec3 sampleDirection = cos( theta ) * outputDirection + sin( theta ) * offset;

				// Correct the planar sample density to solid angle.
				float weight = sin( theta ) / theta;

				accumColor += weight * textureLod( envMap, sampleDirection, 0.0 ).rgb;
				accumWeight += weight;

			}

			gl_FragColor = vec4( accumColor / accumWeight, 1.0 );

		}
	`)}function Yd(){return Wr("PMREMEquirectangularToCubemap",{envMap:{value:null}},`

		varying vec3 vWorldDirection;

		uniform sampler2D envMap;

		#include <common>

		void main() {

			// Average four subpixel samples to preserve small, bright features.
			vec3 direction = normalize( vWorldDirection );
			vec3 dx = dFdx( direction ) * 0.25;
			vec3 dy = dFdy( direction ) * 0.25;

			vec3 color = textureLod( envMap, equirectUv( normalize( direction - dx - dy ) ), 0.0 ).rgb;
			color += textureLod( envMap, equirectUv( normalize( direction + dx - dy ) ), 0.0 ).rgb;
			color += textureLod( envMap, equirectUv( normalize( direction - dx + dy ) ), 0.0 ).rgb;
			color += textureLod( envMap, equirectUv( normalize( direction + dx + dy ) ), 0.0 ).rgb;
			gl_FragColor = vec4( color * 0.25, 1.0 );

		}
	`)}function $d(){return Wr("PMREMCubemapToCubemap",{envMap:{value:null},flipEnvMap:{value:-1}},`

		varying vec3 vWorldDirection;

		uniform samplerCube envMap;
		uniform float flipEnvMap;

		void main() {

			gl_FragColor = vec4( textureCube( envMap, vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) ).rgb, 1.0 );

		}
	`)}function Ax(n){let t=new WeakMap,e=new WeakMap,i=null;function s(h,f=!1){return h==null?null:f?a(h):r(h)}function r(h){if(h&&h.isTexture){let f=h.mapping;if(f===lo||f===co)if(t.has(h)){let p=t.get(h).texture;return o(p,h.mapping)}else{let p=h.image;if(p&&p.height>0){let T=new Hr(p.height);return T.fromEquirectangularTexture(n,h),t.set(h,T),h.addEventListener("dispose",c),o(T.texture,h.mapping)}else return null}}return h}function a(h){if(h&&h.isTexture&&h.isPMREMTexture!==!0){let f=h.mapping,p=f===lo||f===co,T=f===Zi||f===Ds;if(p||T){let x=e.get(h),g=x!==void 0?x.texture.pmremVersion:0;if(h.isRenderTargetTexture&&h.pmremVersion!==g)return i===null&&(i=new Bs(n)),x=p?i.fromEquirectangular(h,x):i.fromCubemap(h,x),x.texture.pmremVersion=h.pmremVersion,e.set(h,x),x.texture;if(x!==void 0)return x.texture;{let w=h.image;return p&&w&&w.height>0||T&&w&&l(w)?(i===null&&(i=new Bs(n)),x=p?i.fromEquirectangular(h):i.fromCubemap(h),x.texture.pmremVersion=h.pmremVersion,e.set(h,x),h.addEventListener("dispose",u),x.texture):null}}}return h}function o(h,f){return f===lo?h.mapping=Zi:f===co&&(h.mapping=Ds),h}function l(h){let f=0,p=6;for(let T=0;T<p;T++)h[T]!==void 0&&f++;return f===p}function c(h){let f=h.target;f.removeEventListener("dispose",c);let p=t.get(f);p!==void 0&&(t.delete(f),p.dispose())}function u(h){let f=h.target;f.removeEventListener("dispose",u);let p=e.get(f);p!==void 0&&(e.delete(f),p.dispose())}function d(){t=new WeakMap,e=new WeakMap,i!==null&&(i.dispose(),i=null)}return{get:s,dispose:d}}function Cx(n){let t={};function e(i){if(t[i]!==void 0)return t[i];let s=n.getExtension(i);return t[i]=s,s}return{has:function(i){return e(i)!==null},init:function(){e("EXT_color_buffer_float"),e("WEBGL_clip_cull_distance"),e("OES_texture_float_linear"),e("EXT_color_buffer_half_float"),e("WEBGL_multisampled_render_to_texture"),e("WEBGL_render_shared_exponent")},get:function(i){let s=e(i);return s===null&&Gi("WebGLRenderer: "+i+" extension not supported."),s}}}function Rx(n,t,e,i){let s={},r=new WeakMap,a=new FinalizationRegistry(p=>delete s[p]);function o(p){l(p.target)}function l(p){p.index!==null&&t.remove(p.index);for(let x in p.attributes)t.remove(p.attributes[x]);p.removeEventListener("dispose",o),delete s[p.id],a.unregister(p);let T=r.get(p);T&&(t.remove(T),r.delete(p)),i.releaseStatesOfGeometry(p),p.isInstancedBufferGeometry===!0&&delete p._maxInstanceCount,e.memory.geometries--}function c(p,T){return s[T.id]!==void 0||(T.addEventListener("dispose",o),s[T.id]=new WeakRef(T),a.register(T,T.id,T),e.memory.geometries++),T}function u(p){let T=p.attributes;for(let x in T)t.update(T[x],n.ARRAY_BUFFER)}function d(p){let T=p.index,x=p.attributes.position,g=0;if(x===void 0)return;let w=T!==null?T.array.length:x.array.length/3-1,_=x.count>=65535?dr:ur,v=new _(Math.ceil(w/3)*6,1),R=v.array;if(T!==null){let m=T.array;g=T.version;for(let M=0,L=0;M<w;M+=3){let P=m[M+0],B=m[M+1],C=m[M+2];R[L++]=P,R[L++]=B,R[L++]=B,R[L++]=C,R[L++]=C,R[L++]=P}}else{g=x.version;for(let m=0,M=0;m<w;m+=3){let L=m+0,P=m+1,B=m+2;R[M++]=L,R[M++]=P,R[M++]=P,R[M++]=B,R[M++]=B,R[M++]=L}}v.version=g;let N=r.get(p);N&&t.remove(N),r.set(p,v)}function h(p){let T=r.get(p);if(T){let x=p.index;x!==null&&T.version<x.version&&d(p)}else d(p);return r.get(p)}function f(){for(let p in s){let T=s[p].deref();T!==void 0&&l(T)}}return{get:c,update:u,getWireframeAttribute:h,dispose:f}}function Ix(n,t,e){let i;function s(d){i=d}let r,a;function o(d){r=d.type,a=d.bytesPerElement}function l(d,h){n.drawElements(i,h,r,d*a),e.update(h,i,1)}function c(d,h,f){f!==0&&(n.drawElementsInstanced(i,h,r,d*a,f),e.update(h,i,f))}function u(d,h,f){if(f===0)return;t.get("WEBGL_multi_draw").multiDrawElementsWEBGL(i,h,0,r,d,0,f);let T=0;for(let x=0;x<f;x++)T+=h[x];e.update(T,i,1)}this.setMode=s,this.setIndex=o,this.render=l,this.renderInstances=c,this.renderMultiDraw=u}function Px(n){let t={geometries:0,textures:0},e={frame:0,calls:0,triangles:0,points:0,lines:0};function i(r,a,o){switch(e.calls++,a){case n.TRIANGLES:e.triangles+=o*(r/3);break;case n.LINES:e.lines+=o*(r/2);break;case n.LINE_STRIP:e.lines+=o*(r-1);break;case n.LINE_LOOP:e.lines+=o*r;break;case n.POINTS:e.points+=o*r;break;default:Yt("WebGLInfo: Unknown draw mode:",a);break}}function s(){e.calls=0,e.triangles=0,e.points=0,e.lines=0}return{memory:t,render:e,programs:null,autoReset:!0,reset:s,update:i}}function Lx(n,t,e){let i=new WeakMap,s=new Me;function r(a,o,l){let c=a.morphTargetInfluences,u=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,d=u!==void 0?u.length:0,h=i.get(o);if(h===void 0||h.count!==d){let L=function(){m.dispose(),i.delete(o),o.removeEventListener("dispose",L)};h!==void 0&&h.texture.dispose();let f=o.morphAttributes.position!==void 0,p=o.morphAttributes.normal!==void 0,T=o.morphAttributes.color!==void 0,x=o.morphAttributes.position||[],g=o.morphAttributes.normal||[],w=o.morphAttributes.color||[],_=0;f===!0&&(_=1),p===!0&&(_=2),T===!0&&(_=3);let v=o.attributes.position.count*_,R=1;v>t.maxTextureSize&&(R=Math.ceil(v/t.maxTextureSize),v=t.maxTextureSize);let N=new Float32Array(v*R*4*d),m=new hr(N,v,R,d);m.type=Ln,m.needsUpdate=!0;let M=_*4;for(let P=0;P<d;P++){let B=x[P],C=g[P],O=w[P],D=v*R*4*P;for(let E=0;E<B.count;E++){let z=E*M;f===!0&&(s.fromBufferAttribute(B,E),N[D+z+0]=s.x,N[D+z+1]=s.y,N[D+z+2]=s.z,N[D+z+3]=0),p===!0&&(s.fromBufferAttribute(C,E),N[D+z+4]=s.x,N[D+z+5]=s.y,N[D+z+6]=s.z,N[D+z+7]=0),T===!0&&(s.fromBufferAttribute(O,E),N[D+z+8]=s.x,N[D+z+9]=s.y,N[D+z+10]=s.z,N[D+z+11]=O.itemSize===4?s.w:1)}}h={count:d,texture:m,size:new Ct(v,R)},i.set(o,h),o.addEventListener("dispose",L)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)l.getUniforms().setValue(n,"morphTexture",a.morphTexture,e);else{let f=0;for(let T=0;T<c.length;T++)f+=c[T];let p=o.morphTargetsRelative?1:1-f;l.getUniforms().setValue(n,"morphTargetBaseInfluence",p),l.getUniforms().setValue(n,"morphTargetInfluences",c)}l.getUniforms().setValue(n,"morphTargetsTexture",h.texture,e),l.getUniforms().setValue(n,"morphTargetsTextureSize",h.size)}return{update:r}}function Nx(n,t,e,i,s){let r=new WeakMap;function a(c){let u=s.render.frame,d=c.geometry,h=t.get(c,d);if(r.get(h)!==u&&(t.update(h),r.set(h,u)),c.isInstancedMesh&&(c.hasEventListener("dispose",l)===!1&&c.addEventListener("dispose",l),r.get(c)!==u&&(e.update(c.instanceMatrix,n.ARRAY_BUFFER),c.instanceColor!==null&&e.update(c.instanceColor,n.ARRAY_BUFFER),r.set(c,u))),c.isSkinnedMesh){let f=c.skeleton;r.get(f)!==u&&(f.update(),r.set(f,u))}return h}function o(){r=new WeakMap}function l(c){let u=c.target;u.removeEventListener("dispose",l),i.releaseStatesOfObject(u),e.remove(u.instanceMatrix),u.instanceColor!==null&&e.remove(u.instanceColor)}return{update:a,dispose:o}}var Dx={[kc]:"LINEAR_TONE_MAPPING",[zc]:"REINHARD_TONE_MAPPING",[Gc]:"CINEON_TONE_MAPPING",[Vc]:"ACES_FILMIC_TONE_MAPPING",[Wc]:"AGX_TONE_MAPPING",[qc]:"NEUTRAL_TONE_MAPPING",[Hc]:"CUSTOM_TONE_MAPPING"};function Ux(n,t,e,i,s,r){let a=new mn(t,e,{type:n,depthBuffer:s,stencilBuffer:r,samples:i?4:0,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,resolveDepthBuffer:!1,resolveStencilBuffer:!1}),o=null,l=null,c=null,u=new Vn;u.setAttribute("position",new ke([-1,3,0,-1,-1,0,3,-1,0],3)),u.setAttribute("uv",new ke([0,2,0,0,2,0],2));let d=new Xa({uniforms:{tDiffuse:{value:null}},vertexShader:`
			precision highp float;

			uniform mat4 modelViewMatrix;
			uniform mat4 projectionMatrix;

			attribute vec3 position;
			attribute vec2 uv;

			varying vec2 vUv;

			void main() {
				vUv = uv;
				gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
			}`,fragmentShader:`
			precision highp float;

			uniform sampler2D tDiffuse;

			varying vec2 vUv;

			#include <tonemapping_pars_fragment>
			#include <colorspace_pars_fragment>

			void main() {
				gl_FragColor = texture2D( tDiffuse, vUv );

				#ifdef LINEAR_TONE_MAPPING
					gl_FragColor.rgb = LinearToneMapping( gl_FragColor.rgb );
				#elif defined( REINHARD_TONE_MAPPING )
					gl_FragColor.rgb = ReinhardToneMapping( gl_FragColor.rgb );
				#elif defined( CINEON_TONE_MAPPING )
					gl_FragColor.rgb = CineonToneMapping( gl_FragColor.rgb );
				#elif defined( ACES_FILMIC_TONE_MAPPING )
					gl_FragColor.rgb = ACESFilmicToneMapping( gl_FragColor.rgb );
				#elif defined( AGX_TONE_MAPPING )
					gl_FragColor.rgb = AgXToneMapping( gl_FragColor.rgb );
				#elif defined( NEUTRAL_TONE_MAPPING )
					gl_FragColor.rgb = NeutralToneMapping( gl_FragColor.rgb );
				#elif defined( CUSTOM_TONE_MAPPING )
					gl_FragColor.rgb = CustomToneMapping( gl_FragColor.rgb );
				#endif

				#ifdef SRGB_TRANSFER
					gl_FragColor = sRGBTransferOETF( gl_FragColor );
				#endif
			}`,depthTest:!1,depthWrite:!1}),h=new Xe(u,d),f=new Rr(-1,1,1,-1,0,1),p=null,T=null,x=!1,g,w=null,_=[],v=!1;this.setSize=function(R,N){a.setSize(R,N),o!==null&&o.setSize(R,N),l!==null&&l.setSize(R,N);for(let m=0;m<_.length;m++){let M=_[m];M.setSize&&M.setSize(R,N)}},this.setEffects=function(R){_=R,v=_.length>0&&_[0].isRenderPass===!0;let N=a.width,m=a.height;_.length>0&&o===null&&(o=new mn(N,m,{type:Nn,depthBuffer:!1,stencilBuffer:!1}),l=new mn(N,m,{type:Nn,depthBuffer:!1,stencilBuffer:!1}));let M=s===!0&&_.some(L=>L.needsDepthTexture===!0);M!==(a.depthTexture!==null)&&(M===!0&&c===null&&(c=new ii(N,m),r===!0&&(c.format=ri,c.type=Ki)),a.dispose(),a.depthTexture=M?c:null,a.resolveDepthBuffer=M,a.storeMultisampledDepthBuffer=M);for(let L=0;L<_.length;L++){let P=_[L];P.setSize&&P.setSize(N,m),M&&P.needsDepthTexture===!0&&P.setDepthTexture&&P.setDepthTexture(c)}},this.begin=function(R,N){if(x||R.toneMapping===bn&&_.length===0)return!1;if(w=N,N!==null){let m=N.width,M=N.height;(a.width!==m||a.height!==M)&&this.setSize(m,M)}return v===!1&&R.setRenderTarget(a),g=R.toneMapping,R.toneMapping=bn,!0},this.hasRenderPass=function(){return v},this.end=function(R,N){R.toneMapping=g,x=!0;let m=a,M=o;for(let L=0;L<_.length;L++){let P=_[L];P.enabled!==!1&&(P.render(R,M,m,N),P.needsSwap!==!1&&(m=M,M=M===o?l:o))}if(p!==R.outputColorSpace||T!==R.toneMapping){p=R.outputColorSpace,T=R.toneMapping,d.defines={},ce.getTransfer(p)===fe&&(d.defines.SRGB_TRANSFER="");let L=Dx[T];L&&(d.defines[L]=""),d.needsUpdate=!0}d.uniforms.tDiffuse.value=m.texture,R.setRenderTarget(w),R.render(h,f),w=null,x=!1},this.isCompositing=function(){return x},this.dispose=function(){a.dispose(),o!==null&&o.dispose(),l!==null&&l.dispose(),u.dispose(),d.dispose()}}var xf=new je,_f=new ii(1,1),yf=new mr(1),vf=new hr,Mf=new Oa,Sf=new pr,Zd=[],Kd=[],Jd=new Float32Array(16),Qd=new Float32Array(9),jd=new Float32Array(4);function ks(n,t,e){let i=n[0];if(i<=0||i>0)return n;let s=t*e,r=Zd[s];if(r===void 0&&(r=new Float32Array(s),Zd[s]=r),t!==0){i.toArray(r,0);for(let a=1,o=0;a!==t;++a)o+=e,n[a].toArray(r,o)}return r}function Le(n,t){if(n.length!==t.length)return!1;for(let e=0,i=n.length;e<i;e++)if(n[e]!==t[e])return!1;return!0}function Ne(n,t){for(let e=0,i=t.length;e<i;e++)n[e]=t[e]}function Qo(n,t){let e=Kd[t];e===void 0&&(e=new Int32Array(t),Kd[t]=e);for(let i=0;i!==t;++i)e[i]=n.allocateTextureUnit();return e}function Fx(n,t){let e=this.cache;e[0]!==t&&(n.uniform1f(this.addr,t),e[0]=t)}function Ox(n,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(n.uniform2f(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Le(e,t))return;n.uniform2fv(this.addr,t),Ne(e,t)}}function Bx(n,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(n.uniform3f(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else if(t.r!==void 0)(e[0]!==t.r||e[1]!==t.g||e[2]!==t.b)&&(n.uniform3f(this.addr,t.r,t.g,t.b),e[0]=t.r,e[1]=t.g,e[2]=t.b);else{if(Le(e,t))return;n.uniform3fv(this.addr,t),Ne(e,t)}}function kx(n,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(n.uniform4f(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Le(e,t))return;n.uniform4fv(this.addr,t),Ne(e,t)}}function zx(n,t){let e=this.cache,i=t.elements;if(i===void 0){if(Le(e,t))return;n.uniformMatrix2fv(this.addr,!1,t),Ne(e,t)}else{if(Le(e,i))return;jd.set(i),n.uniformMatrix2fv(this.addr,!1,jd),Ne(e,i)}}function Gx(n,t){let e=this.cache,i=t.elements;if(i===void 0){if(Le(e,t))return;n.uniformMatrix3fv(this.addr,!1,t),Ne(e,t)}else{if(Le(e,i))return;Qd.set(i),n.uniformMatrix3fv(this.addr,!1,Qd),Ne(e,i)}}function Vx(n,t){let e=this.cache,i=t.elements;if(i===void 0){if(Le(e,t))return;n.uniformMatrix4fv(this.addr,!1,t),Ne(e,t)}else{if(Le(e,i))return;Jd.set(i),n.uniformMatrix4fv(this.addr,!1,Jd),Ne(e,i)}}function Hx(n,t){let e=this.cache;e[0]!==t&&(n.uniform1i(this.addr,t),e[0]=t)}function Wx(n,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(n.uniform2i(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Le(e,t))return;n.uniform2iv(this.addr,t),Ne(e,t)}}function qx(n,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(n.uniform3i(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(Le(e,t))return;n.uniform3iv(this.addr,t),Ne(e,t)}}function Xx(n,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(n.uniform4i(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Le(e,t))return;n.uniform4iv(this.addr,t),Ne(e,t)}}function Yx(n,t){let e=this.cache;e[0]!==t&&(n.uniform1ui(this.addr,t),e[0]=t)}function $x(n,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(n.uniform2ui(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Le(e,t))return;n.uniform2uiv(this.addr,t),Ne(e,t)}}function Zx(n,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(n.uniform3ui(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(Le(e,t))return;n.uniform3uiv(this.addr,t),Ne(e,t)}}function Kx(n,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(n.uniform4ui(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Le(e,t))return;n.uniform4uiv(this.addr,t),Ne(e,t)}}function jo(n){return n.version===0&&(n.compareFunction=nh,n.needsUpdate=!0),n}function Jx(n,t,e){let i=this.cache,s=e.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s);let r;this.type===n.SAMPLER_2D_SHADOW?r=jo(_f):r=xf,e.setTexture2D(t||r,s)}function Qx(n,t,e){let i=this.cache,s=e.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),e.setTexture3D(t||Mf,s)}function jx(n,t,e){let i=this.cache,s=e.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s);let r;this.type===n.SAMPLER_CUBE_SHADOW?r=jo(yf):r=Sf,e.setTextureCube(t||r,s)}function t_(n,t,e){let i=this.cache,s=e.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),e.setTexture2DArray(t||vf,s)}function e_(n){switch(n){case 5126:return Fx;case 35664:return Ox;case 35665:return Bx;case 35666:return kx;case 35674:return zx;case 35675:return Gx;case 35676:return Vx;case 5124:case 35670:return Hx;case 35667:case 35671:return Wx;case 35668:case 35672:return qx;case 35669:case 35673:return Xx;case 5125:return Yx;case 36294:return $x;case 36295:return Zx;case 36296:return Kx;case 35678:case 36198:case 36298:case 36306:case 35682:return Jx;case 35679:case 36299:case 36307:return Qx;case 35680:case 36300:case 36308:case 36293:return jx;case 36289:case 36303:case 36311:case 36292:return t_}}function n_(n,t){n.uniform1fv(this.addr,t)}function i_(n,t){let e=ks(t,this.size,2);n.uniform2fv(this.addr,e)}function s_(n,t){let e=ks(t,this.size,3);n.uniform3fv(this.addr,e)}function r_(n,t){let e=ks(t,this.size,4);n.uniform4fv(this.addr,e)}function a_(n,t){let e=ks(t,this.size,4);n.uniformMatrix2fv(this.addr,!1,e)}function o_(n,t){let e=ks(t,this.size,9);n.uniformMatrix3fv(this.addr,!1,e)}function l_(n,t){let e=ks(t,this.size,16);n.uniformMatrix4fv(this.addr,!1,e)}function c_(n,t){n.uniform1iv(this.addr,t)}function h_(n,t){n.uniform2iv(this.addr,t)}function u_(n,t){n.uniform3iv(this.addr,t)}function d_(n,t){n.uniform4iv(this.addr,t)}function f_(n,t){n.uniform1uiv(this.addr,t)}function p_(n,t){n.uniform2uiv(this.addr,t)}function m_(n,t){n.uniform3uiv(this.addr,t)}function g_(n,t){n.uniform4uiv(this.addr,t)}function x_(n,t,e){let i=this.cache,s=t.length,r=Qo(e,s);Le(i,r)||(n.uniform1iv(this.addr,r),Ne(i,r));let a;this.type===n.SAMPLER_2D_SHADOW?a=jo(_f):a=xf;for(let o=0;o!==s;++o)e.setTexture2D(t[o]||a,r[o])}function __(n,t,e){let i=this.cache,s=t.length,r=Qo(e,s);Le(i,r)||(n.uniform1iv(this.addr,r),Ne(i,r));for(let a=0;a!==s;++a)e.setTexture3D(t[a]||Mf,r[a])}function y_(n,t,e){let i=this.cache,s=t.length,r=Qo(e,s);Le(i,r)||(n.uniform1iv(this.addr,r),Ne(i,r));let a;this.type===n.SAMPLER_CUBE_SHADOW?a=jo(yf):a=Sf;for(let o=0;o!==s;++o)e.setTextureCube(t[o]||a,r[o])}function v_(n,t,e){let i=this.cache,s=t.length,r=Qo(e,s);Le(i,r)||(n.uniform1iv(this.addr,r),Ne(i,r));for(let a=0;a!==s;++a)e.setTexture2DArray(t[a]||vf,r[a])}function M_(n){switch(n){case 5126:return n_;case 35664:return i_;case 35665:return s_;case 35666:return r_;case 35674:return a_;case 35675:return o_;case 35676:return l_;case 5124:case 35670:return c_;case 35667:case 35671:return h_;case 35668:case 35672:return u_;case 35669:case 35673:return d_;case 5125:return f_;case 36294:return p_;case 36295:return m_;case 36296:return g_;case 35678:case 36198:case 36298:case 36306:case 35682:return x_;case 35679:case 36299:case 36307:return __;case 35680:case 36300:case 36308:case 36293:return y_;case 36289:case 36303:case 36311:case 36292:return v_}}var _h=class{constructor(t,e,i){this.id=t,this.addr=i,this.cache=[],this.type=e.type,this.setValue=e_(e.type)}},yh=class{constructor(t,e,i){this.id=t,this.addr=i,this.cache=[],this.type=e.type,this.size=e.size,this.setValue=M_(e.type)}},vh=class{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,e,i){let s=this.seq;for(let r=0,a=s.length;r!==a;++r){let o=s[r];o.setValue(t,e[o.id],i)}}},gh=/(\w+)(\])?(\[|\.)?/g;function tf(n,t){n.seq.push(t),n.map[t.id]=t}function S_(n,t,e){let i=n.name,s=i.length;for(gh.lastIndex=0;;){let r=gh.exec(i),a=gh.lastIndex,o=r[1],l=r[2]==="]",c=r[3];if(l&&(o=o|0),c===void 0||c==="["&&a+2===s){tf(e,c===void 0?new _h(o,n,t):new yh(o,n,t));break}else{let d=e.map[o];d===void 0&&(d=new vh(o),tf(e,d)),e=d}}}var Os=class{constructor(t,e){this.seq=[],this.map={};let i=t.getProgramParameter(e,t.ACTIVE_UNIFORMS);for(let a=0;a<i;++a){let o=t.getActiveUniform(e,a),l=t.getUniformLocation(e,o.name);S_(o,l,this)}let s=[],r=[];for(let a of this.seq)a.type===t.SAMPLER_2D_SHADOW||a.type===t.SAMPLER_CUBE_SHADOW||a.type===t.SAMPLER_2D_ARRAY_SHADOW?s.push(a):r.push(a);s.length>0&&(this.seq=s.concat(r))}setValue(t,e,i,s){let r=this.map[e];r!==void 0&&r.setValue(t,i,s)}setOptional(t,e,i){let s=e[i];s!==void 0&&this.setValue(t,i,s)}static upload(t,e,i,s){for(let r=0,a=e.length;r!==a;++r){let o=e[r],l=i[o.id];l.needsUpdate!==!1&&o.setValue(t,l.value,s)}}static seqWithValue(t,e){let i=[];for(let s=0,r=t.length;s!==r;++s){let a=t[s];a.id in e&&i.push(a)}return i}};function ef(n,t,e){let i=n.createShader(t);return n.shaderSource(i,e),n.compileShader(i),i}var b_=37297,w_=0;function T_(n,t){let e=n.split(`
`),i=[],s=Math.max(t-6,0),r=Math.min(t+6,e.length);for(let a=s;a<r;a++){let o=a+1;i.push(`${o===t?">":" "} ${o}: ${e[a]}`)}return i.join(`
`)}var nf=new Zt;function E_(n){ce._getMatrix(nf,ce.workingColorSpace,n);let t=`mat3( ${nf.elements.map(e=>e.toFixed(4))} )`;switch(ce.getTransfer(n)){case lr:return[t,"LinearTransferOETF"];case fe:return[t,"sRGBTransferOETF"];default:return Xt("WebGLProgram: Unsupported color space: ",n),[t,"LinearTransferOETF"]}}function sf(n,t,e){let i=n.getShaderParameter(t,n.COMPILE_STATUS),r=(n.getShaderInfoLog(t)||"").trim();if(i&&r==="")return"";let a=/ERROR: 0:(\d+)/.exec(r);if(a){let o=parseInt(a[1]);return e.toUpperCase()+`

`+r+`

`+T_(n.getShaderSource(t),o)}else return r}function A_(n,t){let e=E_(t);return[`vec4 ${n}( vec4 value ) {`,`	return ${e[1]}( vec4( ${e[0]} * value.rgb, value.a ) );`,"}"].join(`
`)}var C_={[kc]:"Linear",[zc]:"Reinhard",[Gc]:"Cineon",[Vc]:"ACESFilmic",[Wc]:"AgX",[qc]:"Neutral",[Hc]:"Custom"};function R_(n,t){let e=C_[t];return e===void 0?(Xt("WebGLProgram: Unsupported toneMapping:",t),"vec3 "+n+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+n+"( vec3 color ) { return "+e+"ToneMapping( color ); }"}var Ko=new J;function I_(){ce.getLuminanceCoefficients(Ko);let n=Ko.x.toFixed(4),t=Ko.y.toFixed(4),e=Ko.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${n}, ${t}, ${e} );`,"	return dot( weights, rgb );","}"].join(`
`)}function P_(n){return[n.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",n.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Vr).join(`
`)}function L_(n){let t=[];for(let e in n){let i=n[e];i!==!1&&t.push("#define "+e+" "+i)}return t.join(`
`)}function N_(n,t){let e={},i=n.getProgramParameter(t,n.ACTIVE_ATTRIBUTES);for(let s=0;s<i;s++){let r=n.getActiveAttrib(t,s),a=r.name,o=1;r.type===n.FLOAT_MAT2&&(o=2),r.type===n.FLOAT_MAT3&&(o=3),r.type===n.FLOAT_MAT4&&(o=4),e[a]={type:r.type,location:n.getAttribLocation(t,a),locationSize:o}}return e}function Vr(n){return n!==""}function rf(n,t){let e=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return n.replace(/NUM_SUN_LIGHTS/g,t.numSunLights).replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,e).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_SUN_LIGHT_SHADOWS/g,t.numSunLightShadows).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows).replace(/NUM_LIGHT_PROBE_GRIDS/g,t.numLightProbeGrids)}function af(n,t){return n.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}var D_=/^[ \t]*#include +<([\w\d./]+)>/gm;function Mh(n){return n.replace(D_,U_)}function U_(n,t){let e=ne[t];if(e===void 0)throw new Error("THREE.WebGLProgram: Can not resolve #include <"+t+">");return Mh(e)}var F_=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function of(n){return n.replace(F_,O_)}function O_(n,t,e,i){let s="";for(let r=parseInt(t);r<parseInt(e);r++)s+=i.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function lf(n){let t=`precision ${n.precision} float;
	precision ${n.precision} int;
	precision ${n.precision} sampler2D;
	precision ${n.precision} samplerCube;
	precision ${n.precision} sampler3D;
	precision ${n.precision} sampler2DArray;
	precision ${n.precision} sampler2DShadow;
	precision ${n.precision} samplerCubeShadow;
	precision ${n.precision} sampler2DArrayShadow;
	precision ${n.precision} isampler2D;
	precision ${n.precision} isampler3D;
	precision ${n.precision} isamplerCube;
	precision ${n.precision} isampler2DArray;
	precision ${n.precision} usampler2D;
	precision ${n.precision} usampler3D;
	precision ${n.precision} usamplerCube;
	precision ${n.precision} usampler2DArray;
	`;return n.precision==="highp"?t+=`
#define HIGH_PRECISION`:n.precision==="mediump"?t+=`
#define MEDIUM_PRECISION`:n.precision==="lowp"&&(t+=`
#define LOW_PRECISION`),t}var B_={[Nr]:"SHADOWMAP_TYPE_PCF",[Ls]:"SHADOWMAP_TYPE_VSM"};function k_(n){return B_[n.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}var z_={[Ds]:"ENVMAP_MODE_REFRACTION"};function G_(n){return n.envMap===!1?"ENVMAP_MODE_REFLECTION":z_[n.envMapMode]||"ENVMAP_MODE_REFLECTION"}var V_={[Bc]:"ENVMAP_BLENDING_MULTIPLY",[vd]:"ENVMAP_BLENDING_MIX",[Md]:"ENVMAP_BLENDING_ADD"};function H_(n){return n.envMap===!1?"ENVMAP_BLENDING_NONE":V_[n.combine]||"ENVMAP_BLENDING_NONE"}function W_(n,t,e,i){let s=n.getContext(),r=e.defines,a=e.vertexShader,o=e.fragmentShader,l=k_(e),c=e.envMapPMREM===!0?"ENVMAP_TYPE_PMREM":"ENVMAP_TYPE_CUBE",u=G_(e),d=H_(e),h=P_(e),f=L_(r),p=s.createProgram(),T,x,g=e.glslVersion?"#version "+e.glslVersion+`
`:"";e.isRawShaderMaterial?(T=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,f].filter(Vr).join(`
`),T.length>0&&(T+=`
`),x=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,f].filter(Vr).join(`
`),x.length>0&&(x+=`
`)):(T=[lf(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,f,e.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",e.batching?"#define USE_BATCHING":"",e.batchingColor?"#define USE_BATCHING_COLOR":"",e.instancing?"#define USE_INSTANCING":"",e.instancingColor?"#define USE_INSTANCING_COLOR":"",e.instancingMorph?"#define USE_INSTANCING_MORPH":"",e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+u:"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.displacementMap?"#define USE_DISPLACEMENTMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.diffuseRoughnessMap?"#define USE_DIFFUSE_ROUGHNESSMAP":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.mapUv?"#define MAP_UV "+e.mapUv:"",e.alphaMapUv?"#define ALPHAMAP_UV "+e.alphaMapUv:"",e.lightMapUv?"#define LIGHTMAP_UV "+e.lightMapUv:"",e.aoMapUv?"#define AOMAP_UV "+e.aoMapUv:"",e.emissiveMapUv?"#define EMISSIVEMAP_UV "+e.emissiveMapUv:"",e.bumpMapUv?"#define BUMPMAP_UV "+e.bumpMapUv:"",e.normalMapUv?"#define NORMALMAP_UV "+e.normalMapUv:"",e.displacementMapUv?"#define DISPLACEMENTMAP_UV "+e.displacementMapUv:"",e.metalnessMapUv?"#define METALNESSMAP_UV "+e.metalnessMapUv:"",e.roughnessMapUv?"#define ROUGHNESSMAP_UV "+e.roughnessMapUv:"",e.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+e.anisotropyMapUv:"",e.clearcoatMapUv?"#define CLEARCOATMAP_UV "+e.clearcoatMapUv:"",e.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+e.clearcoatNormalMapUv:"",e.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+e.clearcoatRoughnessMapUv:"",e.diffuseRoughnessMapUv?"#define DIFFUSE_ROUGHNESSMAP_UV "+e.diffuseRoughnessMapUv:"",e.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+e.iridescenceMapUv:"",e.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+e.iridescenceThicknessMapUv:"",e.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+e.sheenColorMapUv:"",e.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+e.sheenRoughnessMapUv:"",e.specularMapUv?"#define SPECULARMAP_UV "+e.specularMapUv:"",e.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+e.specularColorMapUv:"",e.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+e.specularIntensityMapUv:"",e.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+e.transmissionMapUv:"",e.thicknessMapUv?"#define THICKNESSMAP_UV "+e.thicknessMapUv:"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexNormals?"#define HAS_NORMAL":"",e.vertexColors?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.flatShading?"#define FLAT_SHADED":"",e.skinning?"#define USE_SKINNING":"",e.morphTargets?"#define USE_MORPHTARGETS":"",e.morphNormals&&e.flatShading===!1?"#define USE_MORPHNORMALS":"",e.morphColors?"#define USE_MORPHCOLORS":"",e.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+e.morphTextureStride:"",e.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+e.morphTargetsCount:"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.sizeAttenuation?"#define USE_SIZEATTENUATION":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",e.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Vr).join(`
`),x=[lf(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,f,e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",e.map?"#define USE_MAP":"",e.matcap?"#define USE_MATCAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+c:"",e.envMap?"#define "+u:"",e.envMap?"#define "+d:"",e.envMapPMREM?"#define ENVMAP_MAX_LOD "+e.envMapMaxLod+".0":"",e.envMapPMREM?"#define ENVMAP_SIZE "+e.envMapSize+".0":"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.packedNormalMap?"#define USE_PACKED_NORMALMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoat?"#define USE_CLEARCOAT":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.diffuseRoughness?"#define USE_DIFFUSE_ROUGHNESS":"",e.diffuseRoughnessMap?"#define USE_DIFFUSE_ROUGHNESSMAP":"",e.dispersion?"#define USE_DISPERSION":"",e.retroreflection?"#define USE_RETROREFLECTION":"",e.iridescence?"#define USE_IRIDESCENCE":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaTest?"#define USE_ALPHATEST":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.sheen?"#define USE_SHEEN":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors||e.instancingColor?"#define USE_COLOR":"",e.vertexAlphas||e.batchingColor?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.gradientMap?"#define USE_GRADIENTMAP":"",e.flatShading?"#define FLAT_SHADED":"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",e.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",e.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",e.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",e.toneMapping!==bn?"#define TONE_MAPPING":"",e.toneMapping!==bn?ne.tonemapping_pars_fragment:"",e.toneMapping!==bn?R_("toneMapping",e.toneMapping):"",e.dithering?"#define DITHERING":"",e.opaque?"#define OPAQUE":"",ne.colorspace_pars_fragment,A_("linearToOutputTexel",e.outputColorSpace),I_(),e.useDepthPacking?"#define DEPTH_PACKING "+e.depthPacking:"",`
`].filter(Vr).join(`
`)),a=Mh(a),a=rf(a,e),a=af(a,e),o=Mh(o),o=rf(o,e),o=af(o,e),a=of(a),o=of(o),e.isRawShaderMaterial!==!0&&(g=`#version 300 es
`,T=[h,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+T,x=["#define varying in",e.glslVersion===ih?"":"layout(location = 0) out highp vec4 pc_fragColor;",e.glslVersion===ih?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+x);let w=g+T+a,_=g+x+o,v=ef(s,s.VERTEX_SHADER,w),R=ef(s,s.FRAGMENT_SHADER,_);s.attachShader(p,v),s.attachShader(p,R),e.index0AttributeName!==void 0?s.bindAttribLocation(p,0,e.index0AttributeName):e.hasPositionAttribute===!0&&s.bindAttribLocation(p,0,"position"),s.linkProgram(p);function N(P){if(n.debug.checkShaderErrors){let B=s.getProgramInfoLog(p)||"",C=s.getShaderInfoLog(v)||"",O=s.getShaderInfoLog(R)||"",D=B.trim(),E=C.trim(),z=O.trim(),b=!0,I=!0;if(s.getProgramParameter(p,s.LINK_STATUS)===!1)if(b=!1,typeof n.debug.onShaderError=="function")n.debug.onShaderError(s,p,v,R);else{let y=sf(s,v,"vertex"),F=sf(s,R,"fragment");Yt("WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(p,s.VALIDATE_STATUS)+`

Material Name: `+P.name+`
Material Type: `+P.type+`

Program Info Log: `+D+`
`+y+`
`+F)}else D!==""?Xt("WebGLProgram: Program Info Log:",D):(E===""||z==="")&&(I=!1);I&&(P.diagnostics={runnable:b,programLog:D,vertexShader:{log:E,prefix:T},fragmentShader:{log:z,prefix:x}})}s.deleteShader(v),s.deleteShader(R),m=new Os(s,p),M=N_(s,p)}let m;this.getUniforms=function(){return m===void 0&&N(this),m};let M;this.getAttributes=function(){return M===void 0&&N(this),M};let L=e.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return L===!1&&(L=s.getProgramParameter(p,b_)),L},this.destroy=function(){i.releaseStatesOfProgram(this),s.deleteProgram(p),this.program=void 0},this.type=e.shaderType,this.name=e.shaderName,this.id=w_++,this.cacheKey=t,this.usedTimes=1,this.program=p,this.vertexShader=v,this.fragmentShader=R,this}var q_=0,Sh=class{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t,e,i){let s=this._getShaderCacheForMaterial(t);return s.has(e)===!1&&(s.add(e),e.usedTimes++),s.has(i)===!1&&(s.add(i),i.usedTimes++),this}remove(t){let e=this.materialCache.get(t);for(let i of e)i.usedTimes--,i.usedTimes===0&&this.shaderCache.delete(i.code);return this.materialCache.delete(t),this}getVertexShaderStage(t){return this._getShaderStage(t.vertexShader)}getFragmentShaderStage(t){return this._getShaderStage(t.fragmentShader)}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){let e=this.materialCache,i=e.get(t);return i===void 0&&(i=new Set,e.set(t,i)),i}_getShaderStage(t){let e=this.shaderCache,i=e.get(t);return i===void 0&&(i=new bh(t),e.set(t,i)),i}},bh=class{constructor(t){this.id=q_++,this.code=t,this.usedTimes=0}};function X_(n){return n===Ai||n===kr||n===zr}function Y_(n,t,e,i,s,r){let a=new bs,o=new Sh,l=new Set,c=[],u=new Map,d=i.logarithmicDepthBuffer,h={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function f(m){return l.add(m),m===0?"uv":`uv${m}`}function p(m,M,L,P,B,C){let O=P.fog,D=B.geometry,E=m.isMeshStandardMaterial||m.isMeshLambertMaterial||m.isMeshPhongMaterial?P.environment:null,z=m.isMeshStandardMaterial||m.isMeshLambertMaterial&&!m.envMap||m.isMeshPhongMaterial&&!m.envMap,b=t.get(m.envMap||E,z),I=h[m.type],y=i.precision;m.precision!==null&&(y=i.getMaxPrecision(m.precision),y!==m.precision&&Xt("WebGLProgram.getParameters:",m.precision,"not supported, using",y,"instead."));let F=D.morphAttributes.position||D.morphAttributes.normal||D.morphAttributes.color,S=F!==void 0?F.length:0,U=0;D.morphAttributes.position!==void 0&&(U=1),D.morphAttributes.normal!==void 0&&(U=2),D.morphAttributes.color!==void 0&&(U=3);let V,A,q,W;if(I){let It=qn[I];V=It.vertexShader,A=It.fragmentShader}else{V=m.vertexShader,A=m.fragmentShader;let It=o.getVertexShaderStage(m),pe=o.getFragmentShaderStage(m);o.update(m,It,pe),q=It.id,W=pe.id}let Z=n.getRenderTarget(),Y=n.state.buffers.depth.getReversed(),et=B.isInstancedMesh===!0,ft=B.isBatchedMesh===!0,ct=!!m.map,ut=!!m.matcap,_t=!!b,nt=_t&&b.isPMREMTexture===!0,dt=!!m.aoMap,pt=!!m.lightMap,bt=!!m.bumpMap&&m.wireframe===!1,Rt=!!m.normalMap,Qt=!!m.displacementMap,Gt=!!m.emissiveMap,re=!!m.metalnessMap,ae=!!m.roughnessMap,ue=m.anisotropy>0,K=m.clearcoat>0,Ce=m.diffuseRoughness>0,ie=m.dispersion>0,me=m.retroreflectivity>0,Tt=m.iridescence>0,Te=m.sheen>0,Wt=m.transmission>0,$t=ue&&!!m.anisotropyMap,H=K&&!!m.clearcoatMap,k=K&&!!m.clearcoatNormalMap,j=K&&!!m.clearcoatRoughnessMap,mt=Ce&&!!m.diffuseRoughnessMap,lt=Tt&&!!m.iridescenceMap,yt=Tt&&!!m.iridescenceThicknessMap,Et=Te&&!!m.sheenColorMap,rt=Te&&!!m.sheenRoughnessMap,at=!!m.specularMap,Mt=!!m.specularColorMap,X=!!m.specularIntensityMap,ot=Wt&&!!m.transmissionMap,st=Wt&&!!m.thicknessMap,St=!!m.gradientMap,xt=!!m.alphaMap,vt=m.alphaTest>0,Vt=!!m.alphaHash,ee=!!m.extensions,gt=bn;m.toneMapped&&(Z===null||Z.isXRRenderTarget===!0)&&(gt=n.toneMapping);let Ht=nt?b.isCompressedCubeTexture?b.image[0].mipmaps:b.mipmaps:null,te={shaderID:I,shaderType:m.type,shaderName:m.name,vertexShader:V,fragmentShader:A,defines:m.defines,customVertexShaderID:q,customFragmentShaderID:W,isRawShaderMaterial:m.isRawShaderMaterial===!0,glslVersion:m.glslVersion,precision:y,batching:ft,batchingColor:ft&&B._colorsTexture!==null,instancing:et,instancingColor:et&&B.instanceColor!==null,instancingMorph:et&&B.morphTexture!==null,outputColorSpace:Z===null?n.outputColorSpace:Z.isXRRenderTarget===!0?Z.texture.colorSpace:ce.workingColorSpace,alphaToCoverage:!!m.alphaToCoverage,map:ct,matcap:ut,envMap:_t,envMapMode:_t&&b.mapping,envMapPMREM:nt,envMapMaxLod:nt?Ht.length-1:null,envMapSize:nt?Ht[0].width:null,aoMap:dt,lightMap:pt,bumpMap:bt,normalMap:Rt,displacementMap:Qt,emissiveMap:Gt,normalMapObjectSpace:Rt&&m.normalMapType===wd,normalMapTangentSpace:Rt&&m.normalMapType===$o,packedNormalMap:Rt&&m.normalMapType===$o&&X_(m.normalMap.format),metalnessMap:re,roughnessMap:ae,anisotropy:ue,anisotropyMap:$t,clearcoat:K,clearcoatMap:H,clearcoatNormalMap:k,clearcoatRoughnessMap:j,diffuseRoughness:Ce,diffuseRoughnessMap:mt,dispersion:ie,retroreflection:me,iridescence:Tt,iridescenceMap:lt,iridescenceThicknessMap:yt,sheen:Te,sheenColorMap:Et,sheenRoughnessMap:rt,specularMap:at,specularColorMap:Mt,specularIntensityMap:X,transmission:Wt,transmissionMap:ot,thicknessMap:st,gradientMap:St,opaque:m.transparent===!1&&m.blending===Ns&&m.alphaToCoverage===!1,alphaMap:xt,alphaTest:vt,alphaHash:Vt,combine:m.combine,mapUv:ct&&f(m.map.channel),aoMapUv:dt&&f(m.aoMap.channel),lightMapUv:pt&&f(m.lightMap.channel),bumpMapUv:bt&&f(m.bumpMap.channel),normalMapUv:Rt&&f(m.normalMap.channel),displacementMapUv:Qt&&f(m.displacementMap.channel),emissiveMapUv:Gt&&f(m.emissiveMap.channel),metalnessMapUv:re&&f(m.metalnessMap.channel),roughnessMapUv:ae&&f(m.roughnessMap.channel),anisotropyMapUv:$t&&f(m.anisotropyMap.channel),clearcoatMapUv:H&&f(m.clearcoatMap.channel),clearcoatNormalMapUv:k&&f(m.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:j&&f(m.clearcoatRoughnessMap.channel),diffuseRoughnessMapUv:mt&&f(m.diffuseRoughnessMap.channel),iridescenceMapUv:lt&&f(m.iridescenceMap.channel),iridescenceThicknessMapUv:yt&&f(m.iridescenceThicknessMap.channel),sheenColorMapUv:Et&&f(m.sheenColorMap.channel),sheenRoughnessMapUv:rt&&f(m.sheenRoughnessMap.channel),specularMapUv:at&&f(m.specularMap.channel),specularColorMapUv:Mt&&f(m.specularColorMap.channel),specularIntensityMapUv:X&&f(m.specularIntensityMap.channel),transmissionMapUv:ot&&f(m.transmissionMap.channel),thicknessMapUv:st&&f(m.thicknessMap.channel),alphaMapUv:xt&&f(m.alphaMap.channel),vertexTangents:!!D.attributes.tangent&&(Rt||ue),vertexNormals:!!D.attributes.normal,vertexColors:m.vertexColors,vertexAlphas:m.vertexColors===!0&&!!D.attributes.color&&D.attributes.color.itemSize===4,pointsUvs:B.isPoints===!0&&!!D.attributes.uv&&(ct||xt),fog:!!O,useFog:m.fog===!0,fogExp2:!!O&&O.isFogExp2,flatShading:m.wireframe===!1&&(m.flatShading===!0||D.attributes.normal===void 0&&Rt===!1&&(m.isMeshLambertMaterial||m.isMeshPhongMaterial||m.isMeshStandardMaterial||m.isMeshPhysicalMaterial)),sizeAttenuation:m.sizeAttenuation===!0,logarithmicDepthBuffer:d,reversedDepthBuffer:Y,skinning:B.isSkinnedMesh===!0,hasPositionAttribute:D.attributes.position!==void 0,morphTargets:D.morphAttributes.position!==void 0,morphNormals:D.morphAttributes.normal!==void 0,morphColors:D.morphAttributes.color!==void 0,morphTargetsCount:S,morphTextureStride:U,numSunLights:M.sun.length,numDirLights:M.directional.length,numPointLights:M.point.length,numSpotLights:M.spot.length,numSpotLightMaps:M.spotLightMap.length,numRectAreaLights:M.rectArea.length,numHemiLights:M.hemi.length,numSunLightShadows:M.sunShadowMap.length,numDirLightShadows:M.directionalShadowMap.length,numPointLightShadows:M.pointShadowMap.length,numSpotLightShadows:M.spotShadowMap.length,numSpotLightShadowsWithMaps:M.numSpotLightShadowsWithMaps,numLightProbes:M.numLightProbes,numLightProbeGrids:C.filter(It=>It.texture!==null).length,numClippingPlanes:r.numPlanes,numClipIntersection:r.numIntersection,dithering:m.dithering,shadowMapEnabled:n.shadowMap.enabled&&L.length>0,shadowMapType:n.shadowMap.type,toneMapping:gt,decodeVideoTexture:ct&&m.map.isVideoTexture===!0&&ce.getTransfer(m.map.colorSpace)===fe,decodeVideoTextureEmissive:Gt&&m.emissiveMap.isVideoTexture===!0&&ce.getTransfer(m.emissiveMap.colorSpace)===fe,premultipliedAlpha:m.premultipliedAlpha,doubleSided:m.side===Sn,flipSided:m.side===en,useDepthPacking:m.depthPacking>=0,depthPacking:m.depthPacking||0,index0AttributeName:m.index0AttributeName,extensionClipCullDistance:ee&&m.extensions.clipCullDistance===!0&&e.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(ee&&m.extensions.multiDraw===!0||ft)&&e.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:e.has("KHR_parallel_shader_compile"),customProgramCacheKey:m.customProgramCacheKey()};return te.vertexUv1s=l.has(1),te.vertexUv2s=l.has(2),te.vertexUv3s=l.has(3),l.clear(),te}function T(m){let M=[];if(m.shaderID?M.push(m.shaderID):(M.push(m.customVertexShaderID),M.push(m.customFragmentShaderID)),m.defines!==void 0)for(let L in m.defines)M.push(L),M.push(m.defines[L]);return m.isRawShaderMaterial===!1&&(x(M,m),g(M,m),M.push(n.outputColorSpace)),M.push(m.customProgramCacheKey),M.join()}function x(m,M){m.push(M.precision),m.push(M.outputColorSpace),m.push(M.envMapMode),m.push(M.envMapPMREM),m.push(M.envMapMaxLod),m.push(M.envMapSize),m.push(M.mapUv),m.push(M.alphaMapUv),m.push(M.lightMapUv),m.push(M.aoMapUv),m.push(M.bumpMapUv),m.push(M.normalMapUv),m.push(M.displacementMapUv),m.push(M.emissiveMapUv),m.push(M.metalnessMapUv),m.push(M.roughnessMapUv),m.push(M.anisotropyMapUv),m.push(M.clearcoatMapUv),m.push(M.clearcoatNormalMapUv),m.push(M.clearcoatRoughnessMapUv),m.push(M.diffuseRoughnessMapUv),m.push(M.iridescenceMapUv),m.push(M.iridescenceThicknessMapUv),m.push(M.sheenColorMapUv),m.push(M.sheenRoughnessMapUv),m.push(M.specularMapUv),m.push(M.specularColorMapUv),m.push(M.specularIntensityMapUv),m.push(M.transmissionMapUv),m.push(M.thicknessMapUv),m.push(M.combine),m.push(M.fogExp2),m.push(M.sizeAttenuation),m.push(M.morphTargetsCount),m.push(M.numSunLights),m.push(M.numDirLights),m.push(M.numPointLights),m.push(M.numSpotLights),m.push(M.numSpotLightMaps),m.push(M.numHemiLights),m.push(M.numRectAreaLights),m.push(M.numSunLightShadows),m.push(M.numDirLightShadows),m.push(M.numPointLightShadows),m.push(M.numSpotLightShadows),m.push(M.numSpotLightShadowsWithMaps),m.push(M.numLightProbes),m.push(M.numLightProbeGrids),m.push(M.shadowMapType),m.push(M.toneMapping),m.push(M.numClippingPlanes),m.push(M.numClipIntersection),m.push(M.depthPacking)}function g(m,M){a.disableAll(),M.instancing&&a.enable(0),M.instancingColor&&a.enable(1),M.instancingMorph&&a.enable(2),M.matcap&&a.enable(3),M.envMap&&a.enable(4),M.normalMapObjectSpace&&a.enable(5),M.normalMapTangentSpace&&a.enable(6),M.clearcoat&&a.enable(7),M.iridescence&&a.enable(8),M.alphaTest&&a.enable(9),M.vertexColors&&a.enable(10),M.vertexAlphas&&a.enable(11),M.vertexUv1s&&a.enable(12),M.vertexUv2s&&a.enable(13),M.vertexUv3s&&a.enable(14),M.vertexTangents&&a.enable(15),M.anisotropy&&a.enable(16),M.alphaHash&&a.enable(17),M.batching&&a.enable(18),M.dispersion&&a.enable(19),M.retroreflection&&a.enable(24),M.diffuseRoughness&&a.enable(25),M.batchingColor&&a.enable(20),M.gradientMap&&a.enable(21),M.packedNormalMap&&a.enable(22),M.vertexNormals&&a.enable(23),m.push(a.mask),a.disableAll(),M.fog&&a.enable(0),M.useFog&&a.enable(1),M.flatShading&&a.enable(2),M.logarithmicDepthBuffer&&a.enable(3),M.reversedDepthBuffer&&a.enable(4),M.skinning&&a.enable(5),M.morphTargets&&a.enable(6),M.morphNormals&&a.enable(7),M.morphColors&&a.enable(8),M.premultipliedAlpha&&a.enable(9),M.shadowMapEnabled&&a.enable(10),M.doubleSided&&a.enable(11),M.flipSided&&a.enable(12),M.useDepthPacking&&a.enable(13),M.dithering&&a.enable(14),M.transmission&&a.enable(15),M.sheen&&a.enable(16),M.opaque&&a.enable(17),M.pointsUvs&&a.enable(18),M.decodeVideoTexture&&a.enable(19),M.decodeVideoTextureEmissive&&a.enable(20),M.alphaToCoverage&&a.enable(21),M.numLightProbeGrids>0&&a.enable(22),M.hasPositionAttribute&&a.enable(23),m.push(a.mask)}function w(m){let M=h[m.type],L;if(M){let P=qn[M];L=Vd.clone(P.uniforms)}else L=m.uniforms;return L}function _(m,M){let L=u.get(M);return L!==void 0?++L.usedTimes:(L=new W_(n,M,m,s),c.push(L),u.set(M,L)),L}function v(m){if(--m.usedTimes===0){let M=c.indexOf(m);c[M]=c[c.length-1],c.pop(),u.delete(m.cacheKey),m.destroy()}}function R(m){o.remove(m)}function N(){o.dispose()}return{getParameters:p,getProgramCacheKey:T,getUniforms:w,acquireProgram:_,releaseProgram:v,releaseShaderCache:R,programs:c,dispose:N}}function $_(){let n=new WeakMap;function t(a){return n.has(a)}function e(a){let o=n.get(a);return o===void 0&&(o={},n.set(a,o)),o}function i(a){n.delete(a)}function s(a,o,l){n.get(a)[o]=l}function r(){n=new WeakMap}return{has:t,get:e,remove:i,update:s,dispose:r}}function Z_(n,t){return n.groupOrder!==t.groupOrder?n.groupOrder-t.groupOrder:n.renderOrder!==t.renderOrder?n.renderOrder-t.renderOrder:n.material.id!==t.material.id?n.material.id-t.material.id:n.materialVariant!==t.materialVariant?n.materialVariant-t.materialVariant:n.z!==t.z?n.z-t.z:n.id-t.id}function cf(n,t){return n.groupOrder!==t.groupOrder?n.groupOrder-t.groupOrder:n.renderOrder!==t.renderOrder?n.renderOrder-t.renderOrder:n.z!==t.z?t.z-n.z:n.id-t.id}function hf(){let n=[],t=0,e=[],i=[],s=[];function r(){t=0,e.length=0,i.length=0,s.length=0}function a(h){let f=0;return h.isInstancedMesh&&(f+=2),h.isSkinnedMesh&&(f+=1),f}function o(h,f,p,T,x,g){let w=n[t];return w===void 0?(w={id:h.id,object:h,geometry:f,material:p,materialVariant:a(h),groupOrder:T,renderOrder:h.renderOrder,z:x,group:g},n[t]=w):(w.id=h.id,w.object=h,w.geometry=f,w.material=p,w.materialVariant=a(h),w.groupOrder=T,w.renderOrder=h.renderOrder,w.z=x,w.group=g),t++,w}function l(h,f,p,T,x,g,w){w.reversedDepth===!0&&(x=-x);let _=o(h,f,p,T,x,g);p.transmission>0?i.push(_):p.transparent===!0?s.push(_):e.push(_)}function c(h,f,p,T,x,g){let w=o(h,f,p,T,x,g);p.transmission>0?i.unshift(w):p.transparent===!0?s.unshift(w):e.unshift(w)}function u(h,f){e.length>1&&e.sort(h||Z_),i.length>1&&i.sort(f||cf),s.length>1&&s.sort(f||cf)}function d(){for(let h=t,f=n.length;h<f;h++){let p=n[h];if(p.id===null)break;p.id=null,p.object=null,p.geometry=null,p.material=null,p.group=null}}return{opaque:e,transmissive:i,transparent:s,init:r,push:l,unshift:c,finish:d,sort:u}}function K_(){let n=new WeakMap;function t(i,s){let r=n.get(i),a;return r===void 0?(a=new hf,n.set(i,[a])):s>=r.length?(a=new hf,r.push(a)):a=r[s],a}function e(){n=new WeakMap}return{get:t,dispose:e}}function J_(){let n={};return{get:function(t){if(n[t.id]!==void 0)return n[t.id];let e;switch(t.type){case"SunLight":case"DirectionalLight":e={direction:new J,color:new jt};break;case"SpotLight":e={position:new J,direction:new J,color:new jt,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":e={position:new J,color:new jt,distance:0,decay:0};break;case"HemisphereLight":e={direction:new J,skyColor:new jt,groundColor:new jt};break;case"RectAreaLight":e={color:new jt,position:new J,halfWidth:new J,halfHeight:new J};break}return n[t.id]=e,e}}}function Q_(){let n={};return{get:function(t){if(n[t.id]!==void 0)return n[t.id];let e;switch(t.type){case"SunLight":case"DirectionalLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ct};break;case"SpotLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ct};break;case"PointLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ct,shadowCameraNear:1,shadowCameraFar:1e3};break}return n[t.id]=e,e}}}var j_=0;function ty(n,t){return(t.castShadow?2:0)-(n.castShadow?2:0)+(t.map?1:0)-(n.map?1:0)}function ey(n){let t=new J_,e=Q_(),i={version:0,hash:{sunLength:-1,directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numSunShadows:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],sun:[],sunShadow:[],sunShadowMap:[],sunShadowMatrix:[],sunShadowCascade:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)i.probe.push(new J);let s=new J,r=new ye,a=new ye;function o(c){let u=0,d=0,h=0;for(let C=0;C<9;C++)i.probe[C].set(0,0,0);let f=0,p=0,T=0,x=0,g=0,w=0,_=0,v=0,R=0,N=0,m=0,M=0,L=0,P=0;c.sort(ty);for(let C=0,O=c.length;C<O;C++){let D=c[C],E=D.color,z=D.intensity,b=D.distance,I=null;if(D.shadow&&D.shadow.map&&(D.shadow.map.texture.format===Ai?I=D.shadow.map.texture:I=D.shadow.map.depthTexture||D.shadow.map.texture),D.isAmbientLight)u+=E.r*z,d+=E.g*z,h+=E.b*z;else if(D.isLightProbe){for(let y=0;y<9;y++)i.probe[y].addScaledVector(D.sh.coefficients[y],z);P++}else if(D.isSunLight){let y=t.get(D);if(y.color.copy(D.color).multiplyScalar(D.intensity),D.castShadow){let F=D.shadow,S=e.get(D);S.shadowIntensity=F.intensity,S.shadowBias=F.bias,S.shadowNormalBias=F.normalBias,S.shadowRadius=F.radius,S.shadowMapSize.copy(F.mapSize).multiply(F.getFrameExtents()),i.sunShadow[p]=S,i.sunShadowMap[p]=I;let U=F.getViewportCount();for(let V=0;V<U;V++)i.sunShadowMatrix[T+V]=F.getMatrix(V),i.sunShadowCascade[T+V]=F._cascadeData[V];T+=U,p++}i.sun[f]=y,f++}else if(D.isDirectionalLight){let y=t.get(D);if(y.color.copy(D.color).multiplyScalar(D.intensity),D.castShadow){let F=D.shadow,S=e.get(D);S.shadowIntensity=F.intensity,S.shadowBias=F.bias,S.shadowNormalBias=F.normalBias,S.shadowRadius=F.radius,S.shadowMapSize=F.mapSize,i.directionalShadow[x]=S,i.directionalShadowMap[x]=I,i.directionalShadowMatrix[x]=D.shadow.matrix,R++}i.directional[x]=y,x++}else if(D.isSpotLight){let y=t.get(D);y.position.setFromMatrixPosition(D.matrixWorld),y.color.copy(E).multiplyScalar(z),y.distance=b,y.coneCos=Math.cos(D.angle),y.penumbraCos=Math.cos(D.angle*(1-D.penumbra)),y.decay=D.decay,i.spot[w]=y;let F=D.shadow;if(D.map&&(i.spotLightMap[M]=D.map,M++,F.updateMatrices(D),D.castShadow&&L++),i.spotLightMatrix[w]=F.matrix,D.castShadow){let S=e.get(D);S.shadowIntensity=F.intensity,S.shadowBias=F.bias,S.shadowNormalBias=F.normalBias,S.shadowRadius=F.radius,S.shadowMapSize=F.mapSize,i.spotShadow[w]=S,i.spotShadowMap[w]=I,m++}w++}else if(D.isRectAreaLight){let y=t.get(D);y.color.copy(E).multiplyScalar(z),y.halfWidth.set(D.width*.5,0,0),y.halfHeight.set(0,D.height*.5,0),i.rectArea[_]=y,_++}else if(D.isPointLight){let y=t.get(D);if(y.color.copy(D.color).multiplyScalar(D.intensity),y.distance=D.distance,y.decay=D.decay,D.castShadow){let F=D.shadow,S=e.get(D);S.shadowIntensity=F.intensity,S.shadowBias=F.bias,S.shadowNormalBias=F.normalBias,S.shadowRadius=F.radius,S.shadowMapSize=F.mapSize,S.shadowCameraNear=F.camera.near,S.shadowCameraFar=F.camera.far,i.pointShadow[g]=S,i.pointShadowMap[g]=I,i.pointShadowMatrix[g]=D.shadow.matrix,N++}i.point[g]=y,g++}else if(D.isHemisphereLight){let y=t.get(D);y.skyColor.copy(D.color).multiplyScalar(z),y.groundColor.copy(D.groundColor).multiplyScalar(z),i.hemi[v]=y,v++}}_>0&&(n.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=Pt.LTC_FLOAT_1,i.rectAreaLTC2=Pt.LTC_FLOAT_2):(i.rectAreaLTC1=Pt.LTC_HALF_1,i.rectAreaLTC2=Pt.LTC_HALF_2)),i.ambient[0]=u,i.ambient[1]=d,i.ambient[2]=h;let B=i.hash;(B.sunLength!==f||B.directionalLength!==x||B.pointLength!==g||B.spotLength!==w||B.rectAreaLength!==_||B.hemiLength!==v||B.numSunShadows!==p||B.numDirectionalShadows!==R||B.numPointShadows!==N||B.numSpotShadows!==m||B.numSpotMaps!==M||B.numLightProbes!==P)&&(i.sun.length=f,i.directional.length=x,i.spot.length=w,i.rectArea.length=_,i.point.length=g,i.hemi.length=v,i.sunShadow.length=p,i.sunShadowMap.length=p,i.sunShadowMatrix.length=T,i.sunShadowCascade.length=T,i.directionalShadow.length=R,i.directionalShadowMap.length=R,i.directionalShadowMatrix.length=R,i.pointShadow.length=N,i.pointShadowMap.length=N,i.pointShadowMatrix.length=N,i.spotShadow.length=m,i.spotShadowMap.length=m,i.spotLightMatrix.length=m+M-L,i.spotLightMap.length=M,i.numSpotLightShadowsWithMaps=L,i.numLightProbes=P,B.sunLength=f,B.directionalLength=x,B.pointLength=g,B.spotLength=w,B.rectAreaLength=_,B.hemiLength=v,B.numSunShadows=p,B.numDirectionalShadows=R,B.numPointShadows=N,B.numSpotShadows=m,B.numSpotMaps=M,B.numLightProbes=P,i.version=j_++)}function l(c,u){let d=0,h=0,f=0,p=0,T=0,x=0,g=u.matrixWorldInverse;for(let w=0,_=c.length;w<_;w++){let v=c[w];if(v.isSunLight){let R=i.sun[d];R.direction.setFromMatrixPosition(v.matrixWorld),R.direction.transformDirection(g),d++}else if(v.isDirectionalLight){let R=i.directional[h];R.direction.setFromMatrixPosition(v.matrixWorld),s.setFromMatrixPosition(v.target.matrixWorld),R.direction.sub(s),R.direction.transformDirection(g),h++}else if(v.isSpotLight){let R=i.spot[p];R.position.setFromMatrixPosition(v.matrixWorld),R.position.applyMatrix4(g),R.direction.setFromMatrixPosition(v.matrixWorld),s.setFromMatrixPosition(v.target.matrixWorld),R.direction.sub(s),R.direction.transformDirection(g),p++}else if(v.isRectAreaLight){let R=i.rectArea[T];R.position.setFromMatrixPosition(v.matrixWorld),R.position.applyMatrix4(g),a.identity(),r.copy(v.matrixWorld),r.premultiply(g),a.extractRotation(r),R.halfWidth.set(v.width*.5,0,0),R.halfHeight.set(0,v.height*.5,0),R.halfWidth.applyMatrix4(a),R.halfHeight.applyMatrix4(a),T++}else if(v.isPointLight){let R=i.point[f];R.position.setFromMatrixPosition(v.matrixWorld),R.position.applyMatrix4(g),f++}else if(v.isHemisphereLight){let R=i.hemi[x];R.direction.setFromMatrixPosition(v.matrixWorld),R.direction.transformDirection(g),x++}}}return{setup:o,setupView:l,state:i}}function uf(n){let t=new ey(n),e=[],i=[],s=[];function r(d){u.camera=d,e.length=0,i.length=0,s.length=0}function a(d){d.isLightProbeGrid?s.push(d):e.push(d)}function o(d){i.push(d)}function l(){t.setup(e),s.sort((d,h)=>d.priority-h.priority||d.id-h.id)}function c(d){t.setupView(e,d)}let u={lightsArray:e,shadowsArray:i,lightProbeGridArray:s,camera:null,lights:t,transmissionRenderTarget:{},textureUnits:0};return{init:r,state:u,setupLights:l,setupLightsView:c,pushLight:a,pushShadow:o}}function ny(n){let t=new WeakMap;function e(s,r=0){let a=t.get(s),o;return a===void 0?(o=new uf(n),t.set(s,[o])):r>=a.length?(o=new uf(n),a.push(o)):o=a[r],o}function i(){t=new WeakMap}return{get:e,dispose:i}}var iy=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,sy=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ).rg;
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ).r;
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( max( 0.0, squared_mean - mean * mean ) );
	gl_FragColor = vec4( mean, std_dev, 0.0, 1.0 );
}`,ry=[new J(1,0,0),new J(-1,0,0),new J(0,1,0),new J(0,-1,0),new J(0,0,1),new J(0,0,-1)],ay=[new J(0,-1,0),new J(0,-1,0),new J(0,0,1),new J(0,0,-1),new J(0,-1,0),new J(0,-1,0)],df=new ye,Gr=new J,xh=new J;function oy(n,t,e){let i=new yi,s=new Ct,r=new Ct,a=new Me,o=new Ya,l=new $a,c={},u=e.maxTextureSize,d={[Ei]:en,[en]:Ei,[Sn]:Sn},h=new Hn({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Ct},radius:{value:4}},vertexShader:iy,fragmentShader:sy}),f=h.clone();f.defines.HORIZONTAL_PASS=1;let p=new Vn;p.setAttribute("position",new kn(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));let T=new Xe(p,h),x=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Nr;let g=this.type;this.render=function(N,m,M){if(x.enabled===!1||x.autoUpdate===!1&&x.needsUpdate===!1||N.length===0)return;this.type===ed&&(Xt("WebGLShadowMap: PCFSoftShadowMap has been removed. Using PCFShadowMap instead."),this.type=Nr);let L=n.getRenderTarget(),P=n.getActiveCubeFace(),B=n.getActiveMipmapLevel(),C=n.state;C.setBlending(Yi),C.buffers.depth.getReversed()===!0?C.buffers.color.setClear(0,0,0,0):C.buffers.color.setClear(1,1,1,1),C.buffers.depth.setTest(!0),C.setScissorTest(!1);let O=g!==this.type;O&&m.traverse(function(D){D.material&&(Array.isArray(D.material)?D.material.forEach(E=>E.needsUpdate=!0):D.material.needsUpdate=!0)});for(let D=0,E=N.length;D<E;D++){let z=N[D],b=z.shadow;if(b===void 0){Xt("WebGLShadowMap:",z,"has no shadow.");continue}if(b.autoUpdate===!1&&b.needsUpdate===!1)continue;s.copy(b.mapSize);let I=b.getFrameExtents();s.multiply(I),r.copy(b.mapSize),(s.x>u||s.y>u)&&(s.x>u&&(r.x=Math.floor(u/I.x),s.x=r.x*I.x,b.mapSize.x=r.x),s.y>u&&(r.y=Math.floor(u/I.y),s.y=r.y*I.y,b.mapSize.y=r.y));let y=n.state.buffers.depth.getReversed();if(b.camera._reversedDepth=y,b.map===null||O===!0){if(b.map!==null&&(b.map.depthTexture!==null&&(b.map.depthTexture.dispose(),b.map.depthTexture=null),b.map.dispose()),this.type===Ls){if(z.isPointLight){Xt("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}b.map=new mn(s.x,s.y,{format:Ai,type:Nn,minFilter:Qe,magFilter:Qe,generateMipmaps:!1}),b.map.texture.name=z.name+".shadowMap",b.map.depthTexture=new ii(s.x,s.y,Ln),b.map.depthTexture.name=z.name+".shadowMapDepth",b.map.depthTexture.format=ei,b.map.depthTexture.compareFunction=null,b.map.depthTexture.minFilter=Oe,b.map.depthTexture.magFilter=Oe}else z.isPointLight?(b.map=new Hr(s.x),b.map.depthTexture=new mr(s.x,Pn)):(b.map=new mn(s.x,s.y),b.map.depthTexture=new ii(s.x,s.y,Pn)),b.map.depthTexture.name=z.name+".shadowMap",b.map.depthTexture.format=ei,this.type===Nr?(b.map.depthTexture.compareFunction=y?eh:th,b.map.depthTexture.minFilter=Qe,b.map.depthTexture.magFilter=Qe):(b.map.depthTexture.compareFunction=null,b.map.depthTexture.minFilter=Oe,b.map.depthTexture.magFilter=Oe);b.camera.updateProjectionMatrix()}b.map.isWebGLCubeRenderTarget!==!0&&(b.map.width!==s.x||b.map.height!==s.y)&&b.map.setSize(s.x,s.y);let F=b.map.isWebGLCubeRenderTarget?6:b.getViewportCount();z.isPointLight!==!0&&b.updateMatrices(z,M);let S=(b.camera.layers.mask&4294967294)!==0?b.camera.layers:M.layers;for(let U=0;U<F;U++){let V=b.getCamera(U);if(z.isPointLight){let A=b.camera,q=b.matrix,W=z.distance||A.far;W!==A.far&&(A.far=W,A.updateProjectionMatrix()),Gr.setFromMatrixPosition(z.matrixWorld),A.position.copy(Gr),xh.copy(A.position),xh.add(ry[U]),A.up.copy(ay[U]),A.lookAt(xh),A.updateMatrixWorld(),q.makeTranslation(-Gr.x,-Gr.y,-Gr.z),df.multiplyMatrices(A.projectionMatrix,A.matrixWorldInverse),b._frustum.setFromProjectionMatrix(df,A.coordinateSystem,A.reversedDepth)}if(b.map.isWebGLCubeRenderTarget)n.setRenderTarget(b.map,U),n.clear();else{U===0&&(n.setRenderTarget(b.map),n.clear());let A=b.getViewport(U);a.set(r.x*A.x,r.y*A.y,r.x*A.z,r.y*A.w),C.viewport(a)}i=b.getFrustum(U),v(m,M,V,z,S,this.type)}b.isPointLightShadow!==!0&&this.type===Ls&&w(b,M),b.needsUpdate=!1}g=this.type,x.needsUpdate=!1,n.setRenderTarget(L,P,B)};function w(N,m){let M=t.update(T);h.defines.VSM_SAMPLES!==N.blurSamples&&(h.defines.VSM_SAMPLES=N.blurSamples,f.defines.VSM_SAMPLES=N.blurSamples,h.needsUpdate=!0,f.needsUpdate=!0),N.mapPass===null?N.mapPass=new mn(s.x,s.y,{format:Ai,type:Nn}):(N.mapPass.width!==N.map.width||N.mapPass.height!==N.map.height)&&N.mapPass.setSize(N.map.width,N.map.height),h.uniforms.shadow_pass.value=N.map.depthTexture,h.uniforms.resolution.value.set(N.map.width,N.map.height),h.uniforms.radius.value=N.radius,n.setRenderTarget(N.mapPass),n.clear(),n.renderBufferDirect(m,null,M,h,T,null),f.uniforms.shadow_pass.value=N.mapPass.texture,f.uniforms.resolution.value.set(N.map.width,N.map.height),f.uniforms.radius.value=N.radius,n.setRenderTarget(N.map),n.clear(),n.renderBufferDirect(m,null,M,f,T,null)}function _(N,m,M,L){let P=null,B=M.isPointLight===!0?N.customDistanceMaterial:N.customDepthMaterial;if(B!==void 0)P=B;else if(P=M.isPointLight===!0?l:o,n.localClippingEnabled&&m.clipShadows===!0&&Array.isArray(m.clippingPlanes)&&m.clippingPlanes.length!==0||m.displacementMap&&m.displacementScale!==0||m.alphaMap&&m.alphaTest>0||m.map&&m.alphaTest>0||m.alphaToCoverage===!0){let C=P.uuid,O=m.uuid,D=c[C];D===void 0&&(D={},c[C]=D);let E=D[O];E===void 0&&(E=P.clone(),D[O]=E,m.addEventListener("dispose",R)),P=E}if(P.visible=m.visible,P.wireframe=m.wireframe,L===Ls?P.side=m.shadowSide!==null?m.shadowSide:m.side:P.side=m.shadowSide!==null?m.shadowSide:d[m.side],P.alphaMap=m.alphaMap,P.alphaTest=m.alphaToCoverage===!0?.5:m.alphaTest,P.map=m.map,P.clipShadows=m.clipShadows,P.clippingPlanes=m.clippingPlanes,P.clipIntersection=m.clipIntersection,P.displacementMap=m.displacementMap,P.displacementScale=m.displacementScale,P.displacementBias=m.displacementBias,P.wireframeLinewidth=m.wireframeLinewidth,P.linewidth=m.linewidth,M.isPointLight===!0&&P.isMeshDistanceMaterial===!0){let C=n.properties.get(P);C.light=M}return P}function v(N,m,M,L,P,B){if(N.visible===!1)return;if(N.layers.test(P)&&(N.isMesh||N.isLine||N.isPoints)&&(N.castShadow||N.receiveShadow&&B===Ls)&&(!N.frustumCulled||N.intersectsFrustum(i))){N.modelViewMatrix.multiplyMatrices(M.matrixWorldInverse,N.matrixWorld);let D=t.update(N),E=N.material;if(Array.isArray(E)){let z=D.groups;for(let b=0,I=z.length;b<I;b++){let y=z[b],F=E[y.materialIndex];if(F&&F.visible){let S=_(N,F,L,B);N.onBeforeShadow(n,N,m,M,D,S,y),n.renderBufferDirect(M,null,D,S,N,y),N.onAfterShadow(n,N,m,M,D,S,y)}}}else if(E.visible){let z=_(N,E,L,B);N.onBeforeShadow(n,N,m,M,D,z,null),n.renderBufferDirect(M,null,D,z,N,null),N.onAfterShadow(n,N,m,M,D,z,null)}}let O=N.children;for(let D=0,E=O.length;D<E;D++)v(O[D],m,M,L,P,B)}function R(N){N.target.removeEventListener("dispose",R);for(let M in c){let L=c[M],P=N.target.uuid;P in L&&(L[P].dispose(),delete L[P])}}}function ly(n,t){function e(){let X=!1,ot=new Me,st=null,St=new Me(0,0,0,0);return{setMask:function(xt){st!==xt&&!X&&(n.colorMask(xt,xt,xt,xt),st=xt)},setLocked:function(xt){X=xt},setClear:function(xt,vt,Vt,ee,gt){gt===!0&&(xt*=ee,vt*=ee,Vt*=ee),ot.set(xt,vt,Vt,ee),St.equals(ot)===!1&&(n.clearColor(xt,vt,Vt,ee),St.copy(ot))},reset:function(){X=!1,st=null,St.set(-1,0,0,0)}}}function i(){let X=!1,ot=!1,st=null,St=null,xt=null;return{setReversed:function(vt){if(ot!==vt){let Vt=t.get("EXT_clip_control");vt?Vt.clipControlEXT(Vt.LOWER_LEFT_EXT,Vt.ZERO_TO_ONE_EXT):Vt.clipControlEXT(Vt.LOWER_LEFT_EXT,Vt.NEGATIVE_ONE_TO_ONE_EXT),ot=vt;let ee=xt;xt=null,this.setClear(ee)}},getReversed:function(){return ot},setTest:function(vt){vt?Y(n.DEPTH_TEST):et(n.DEPTH_TEST)},setMask:function(vt){st!==vt&&!X&&(n.depthMask(vt),st=vt)},setFunc:function(vt){if(ot&&(vt=Ud[vt]),St!==vt){switch(vt){case Ta:n.depthFunc(n.NEVER);break;case Ea:n.depthFunc(n.ALWAYS);break;case Aa:n.depthFunc(n.LESS);break;case ys:n.depthFunc(n.LEQUAL);break;case Ca:n.depthFunc(n.EQUAL);break;case Ra:n.depthFunc(n.GEQUAL);break;case Ia:n.depthFunc(n.GREATER);break;case Pa:n.depthFunc(n.NOTEQUAL);break;default:n.depthFunc(n.LEQUAL)}St=vt}},setLocked:function(vt){X=vt},setClear:function(vt){xt!==vt&&(xt=vt,ot&&(vt=1-vt),n.clearDepth(vt))},reset:function(){X=!1,st=null,St=null,xt=null,ot=!1}}}function s(){let X=!1,ot=null,st=null,St=null,xt=null,vt=null,Vt=null,ee=null,gt=null;return{setTest:function(Ht){X||(Ht?Y(n.STENCIL_TEST):et(n.STENCIL_TEST))},setMask:function(Ht){ot!==Ht&&!X&&(n.stencilMask(Ht),ot=Ht)},setFunc:function(Ht,te,It){(st!==Ht||St!==te||xt!==It)&&(n.stencilFunc(Ht,te,It),st=Ht,St=te,xt=It)},setOp:function(Ht,te,It){(vt!==Ht||Vt!==te||ee!==It)&&(n.stencilOp(Ht,te,It),vt=Ht,Vt=te,ee=It)},setLocked:function(Ht){X=Ht},setClear:function(Ht){gt!==Ht&&(n.clearStencil(Ht),gt=Ht)},reset:function(){X=!1,ot=null,st=null,St=null,xt=null,vt=null,Vt=null,ee=null,gt=null}}}let r=new e,a=new i,o=new s,l={},c=new WeakMap,u={},d={},h={},f=new WeakMap,p=[],T=null,x=!1,g=null,w=null,_=null,v=null,R=null,N=null,m=null,M=new jt(0,0,0),L=0,P=!1,B=null,C=null,O=null,D=null,E=null,z=n.getParameter(n.MAX_COMBINED_TEXTURE_IMAGE_UNITS),b=!1,I=0,y=n.getParameter(n.VERSION);y.indexOf("WebGL")!==-1?(I=parseFloat(/^WebGL (\d)/.exec(y)[1]),b=I>=1):y.indexOf("OpenGL ES")!==-1&&(I=parseFloat(/^OpenGL ES (\d)/.exec(y)[1]),b=I>=2);let F=null,S={},U=n.getParameter(n.SCISSOR_BOX),V=n.getParameter(n.VIEWPORT),A=new Me().fromArray(U),q=new Me().fromArray(V);function W(X,ot,st,St){let xt=new Uint8Array(4),vt=n.createTexture();n.bindTexture(X,vt),n.texParameteri(X,n.TEXTURE_MIN_FILTER,n.NEAREST),n.texParameteri(X,n.TEXTURE_MAG_FILTER,n.NEAREST);for(let Vt=0;Vt<st;Vt++)X===n.TEXTURE_3D||X===n.TEXTURE_2D_ARRAY?n.texImage3D(ot,0,n.RGBA,1,1,St,0,n.RGBA,n.UNSIGNED_BYTE,xt):n.texImage2D(ot+Vt,0,n.RGBA,1,1,0,n.RGBA,n.UNSIGNED_BYTE,xt);return vt}let Z={};Z[n.TEXTURE_2D]=W(n.TEXTURE_2D,n.TEXTURE_2D,1),Z[n.TEXTURE_CUBE_MAP]=W(n.TEXTURE_CUBE_MAP,n.TEXTURE_CUBE_MAP_POSITIVE_X,6),Z[n.TEXTURE_2D_ARRAY]=W(n.TEXTURE_2D_ARRAY,n.TEXTURE_2D_ARRAY,1,1),Z[n.TEXTURE_3D]=W(n.TEXTURE_3D,n.TEXTURE_3D,1,1),r.setClear(0,0,0,1),a.setClear(1),o.setClear(0),Y(n.DEPTH_TEST),a.setFunc(ys),bt(!1),Rt(Lc),Y(n.CULL_FACE),dt(Yi);function Y(X){u[X]!==!0&&(n.enable(X),u[X]=!0)}function et(X){u[X]!==!1&&(n.disable(X),u[X]=!1)}function ft(X,ot){return h[X]!==ot?(n.bindFramebuffer(X,ot),h[X]=ot,X===n.DRAW_FRAMEBUFFER&&(h[n.FRAMEBUFFER]=ot),X===n.FRAMEBUFFER&&(h[n.DRAW_FRAMEBUFFER]=ot),!0):!1}function ct(X,ot){let st=p,St=!1;if(X){st=f.get(ot),st===void 0&&(st=[],f.set(ot,st));let xt=X.textures;if(st.length!==xt.length||st[0]!==n.COLOR_ATTACHMENT0){for(let vt=0,Vt=xt.length;vt<Vt;vt++)st[vt]=n.COLOR_ATTACHMENT0+vt;st.length=xt.length,St=!0}}else st[0]!==n.BACK&&(st[0]=n.BACK,St=!0);St&&n.drawBuffers(st)}function ut(X){return T!==X?(n.useProgram(X),T=X,!0):!1}let _t={[$i]:n.FUNC_ADD,[id]:n.FUNC_SUBTRACT,[sd]:n.FUNC_REVERSE_SUBTRACT};_t[rd]=n.MIN,_t[ad]=n.MAX;let nt={[od]:n.ZERO,[ld]:n.ONE,[cd]:n.SRC_COLOR,[Fc]:n.SRC_ALPHA,[md]:n.SRC_ALPHA_SATURATE,[fd]:n.DST_COLOR,[ud]:n.DST_ALPHA,[hd]:n.ONE_MINUS_SRC_COLOR,[Oc]:n.ONE_MINUS_SRC_ALPHA,[pd]:n.ONE_MINUS_DST_COLOR,[dd]:n.ONE_MINUS_DST_ALPHA,[gd]:n.CONSTANT_COLOR,[xd]:n.ONE_MINUS_CONSTANT_COLOR,[_d]:n.CONSTANT_ALPHA,[yd]:n.ONE_MINUS_CONSTANT_ALPHA};function dt(X,ot,st,St,xt,vt,Vt,ee,gt,Ht){if(X===Yi){x===!0&&(et(n.BLEND),x=!1);return}if(x===!1&&(Y(n.BLEND),x=!0),X!==nd){if(X!==g||Ht!==P){if((w!==$i||R!==$i)&&(n.blendEquation(n.FUNC_ADD),w=$i,R=$i),Ht)switch(X){case Ns:n.blendFuncSeparate(n.ONE,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case Nc:n.blendFunc(n.ONE,n.ONE);break;case Dc:n.blendFuncSeparate(n.ZERO,n.ONE_MINUS_SRC_COLOR,n.ZERO,n.ONE);break;case Uc:n.blendFuncSeparate(n.DST_COLOR,n.ONE_MINUS_SRC_ALPHA,n.ZERO,n.ONE);break;default:Yt("WebGLState: Invalid blending: ",X);break}else switch(X){case Ns:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case Nc:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE,n.ONE,n.ONE);break;case Dc:Yt("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case Uc:Yt("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:Yt("WebGLState: Invalid blending: ",X);break}_=null,v=null,N=null,m=null,M.set(0,0,0),L=0,g=X,P=Ht}return}xt=xt||ot,vt=vt||st,Vt=Vt||St,(ot!==w||xt!==R)&&(n.blendEquationSeparate(_t[ot],_t[xt]),w=ot,R=xt),(st!==_||St!==v||vt!==N||Vt!==m)&&(n.blendFuncSeparate(nt[st],nt[St],nt[vt],nt[Vt]),_=st,v=St,N=vt,m=Vt),(ee.equals(M)===!1||gt!==L)&&(n.blendColor(ee.r,ee.g,ee.b,gt),M.copy(ee),L=gt),g=X,P=!1}function pt(X,ot){X.side===Sn?et(n.CULL_FACE):Y(n.CULL_FACE);let st=X.side===en;ot&&(st=!st),bt(st),X.blending===Ns&&X.transparent===!1?dt(Yi):dt(X.blending,X.blendEquation,X.blendSrc,X.blendDst,X.blendEquationAlpha,X.blendSrcAlpha,X.blendDstAlpha,X.blendColor,X.blendAlpha,X.premultipliedAlpha),a.setFunc(X.depthFunc),a.setTest(X.depthTest),a.setMask(X.depthWrite),r.setMask(X.colorWrite);let St=X.stencilWrite;o.setTest(St),St&&(o.setMask(X.stencilWriteMask),o.setFunc(X.stencilFunc,X.stencilRef,X.stencilFuncMask),o.setOp(X.stencilFail,X.stencilZFail,X.stencilZPass)),Gt(X.polygonOffset,X.polygonOffsetFactor,X.polygonOffsetUnits),X.alphaToCoverage===!0?Y(n.SAMPLE_ALPHA_TO_COVERAGE):et(n.SAMPLE_ALPHA_TO_COVERAGE)}function bt(X){B!==X&&(X?n.frontFace(n.CW):n.frontFace(n.CCW),B=X)}function Rt(X){X!==ju?(Y(n.CULL_FACE),X!==C&&(X===Lc?n.cullFace(n.BACK):X===td?n.cullFace(n.FRONT):n.cullFace(n.FRONT_AND_BACK))):et(n.CULL_FACE),C=X}function Qt(X){X!==O&&(b&&n.lineWidth(X),O=X)}function Gt(X,ot,st){X?(Y(n.POLYGON_OFFSET_FILL),(D!==ot||E!==st)&&(D=ot,E=st,a.getReversed()&&(ot=-ot,st=-st),n.polygonOffset(ot,st))):et(n.POLYGON_OFFSET_FILL)}function re(X){X?Y(n.SCISSOR_TEST):et(n.SCISSOR_TEST)}function ae(X){X===void 0&&(X=n.TEXTURE0+z-1),F!==X&&(n.activeTexture(X),F=X)}function ue(X,ot,st){st===void 0&&(F===null?st=n.TEXTURE0+z-1:st=F);let St=S[st];St===void 0&&(St={type:void 0,texture:void 0},S[st]=St),(St.type!==X||St.texture!==ot)&&(F!==st&&(n.activeTexture(st),F=st),n.bindTexture(X,ot||Z[X]),St.type=X,St.texture=ot)}function K(){let X=S[F];X!==void 0&&X.type!==void 0&&(n.bindTexture(X.type,null),X.type=void 0,X.texture=void 0)}function Ce(){try{n.compressedTexImage2D(...arguments)}catch(X){Yt("WebGLState:",X)}}function ie(){try{n.compressedTexImage3D(...arguments)}catch(X){Yt("WebGLState:",X)}}function me(){try{n.texSubImage2D(...arguments)}catch(X){Yt("WebGLState:",X)}}function Tt(){try{n.texSubImage3D(...arguments)}catch(X){Yt("WebGLState:",X)}}function Te(){try{n.compressedTexSubImage2D(...arguments)}catch(X){Yt("WebGLState:",X)}}function Wt(){try{n.compressedTexSubImage3D(...arguments)}catch(X){Yt("WebGLState:",X)}}function $t(){try{n.texStorage2D(...arguments)}catch(X){Yt("WebGLState:",X)}}function H(){try{n.texStorage3D(...arguments)}catch(X){Yt("WebGLState:",X)}}function k(){try{n.texImage2D(...arguments)}catch(X){Yt("WebGLState:",X)}}function j(){try{n.texImage3D(...arguments)}catch(X){Yt("WebGLState:",X)}}function mt(X){return d[X]!==void 0?d[X]:n.getParameter(X)}function lt(X,ot){d[X]!==ot&&(n.pixelStorei(X,ot),d[X]=ot)}function yt(X){A.equals(X)===!1&&(n.scissor(X.x,X.y,X.z,X.w),A.copy(X))}function Et(X){q.equals(X)===!1&&(n.viewport(X.x,X.y,X.z,X.w),q.copy(X))}function rt(X,ot){let st=c.get(ot);st===void 0&&(st=new WeakMap,c.set(ot,st));let St=st.get(X);St===void 0&&(St=n.getUniformBlockIndex(ot,X.name),n.uniformBlockBinding(ot,St,St),st.set(X,St))}function at(X,ot,st){let xt=c.get(ot).get(X);l[xt]!==st&&(n.bindBufferBase(n.UNIFORM_BUFFER,xt,st),l[xt]=st)}function Mt(){n.disable(n.BLEND),n.disable(n.CULL_FACE),n.disable(n.DEPTH_TEST),n.disable(n.POLYGON_OFFSET_FILL),n.disable(n.SCISSOR_TEST),n.disable(n.STENCIL_TEST),n.disable(n.SAMPLE_ALPHA_TO_COVERAGE),n.blendEquation(n.FUNC_ADD),n.blendFunc(n.ONE,n.ZERO),n.blendFuncSeparate(n.ONE,n.ZERO,n.ONE,n.ZERO),n.blendColor(0,0,0,0),n.colorMask(!0,!0,!0,!0),n.clearColor(0,0,0,0),n.depthMask(!0),n.depthFunc(n.LESS),a.setReversed(!1),n.clearDepth(1),n.stencilMask(4294967295),n.stencilFunc(n.ALWAYS,0,4294967295),n.stencilOp(n.KEEP,n.KEEP,n.KEEP),n.clearStencil(0),n.cullFace(n.BACK),n.frontFace(n.CCW),n.polygonOffset(0,0),n.activeTexture(n.TEXTURE0),n.bindFramebuffer(n.FRAMEBUFFER,null),n.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),n.bindFramebuffer(n.READ_FRAMEBUFFER,null),n.useProgram(null),n.lineWidth(1),n.scissor(0,0,n.canvas.width,n.canvas.height),n.viewport(0,0,n.canvas.width,n.canvas.height),n.pixelStorei(n.PACK_ALIGNMENT,4),n.pixelStorei(n.UNPACK_ALIGNMENT,4),n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,!1),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,n.BROWSER_DEFAULT_WEBGL),n.pixelStorei(n.PACK_ROW_LENGTH,0),n.pixelStorei(n.PACK_SKIP_PIXELS,0),n.pixelStorei(n.PACK_SKIP_ROWS,0),n.pixelStorei(n.UNPACK_ROW_LENGTH,0),n.pixelStorei(n.UNPACK_IMAGE_HEIGHT,0),n.pixelStorei(n.UNPACK_SKIP_PIXELS,0),n.pixelStorei(n.UNPACK_SKIP_ROWS,0),n.pixelStorei(n.UNPACK_SKIP_IMAGES,0),u={},d={},F=null,S={},h={},l={},f=new WeakMap,p=[],T=null,x=!1,g=null,w=null,_=null,v=null,R=null,N=null,m=null,M=new jt(0,0,0),L=0,P=!1,B=null,C=null,O=null,D=null,E=null,A.set(0,0,n.canvas.width,n.canvas.height),q.set(0,0,n.canvas.width,n.canvas.height),r.reset(),a.reset(),o.reset()}return{buffers:{color:r,depth:a,stencil:o},enable:Y,disable:et,bindFramebuffer:ft,drawBuffers:ct,useProgram:ut,setBlending:dt,setMaterial:pt,setFlipSided:bt,setCullFace:Rt,setLineWidth:Qt,setPolygonOffset:Gt,setScissorTest:re,activeTexture:ae,bindTexture:ue,unbindTexture:K,compressedTexImage2D:Ce,compressedTexImage3D:ie,texImage2D:k,texImage3D:j,pixelStorei:lt,getParameter:mt,updateUBOMapping:rt,uniformBlockBinding:at,texStorage2D:$t,texStorage3D:H,texSubImage2D:me,texSubImage3D:Tt,compressedTexSubImage2D:Te,compressedTexSubImage3D:Wt,scissor:yt,viewport:Et,reset:Mt}}function cy(n,t,e,i,s,r,a){let o=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new Ct,u=new WeakMap,d=new Set,h,f=new WeakMap,p=new Set,T=new FinalizationRegistry(H=>p.delete(H)),x=!1;try{x=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function g(H,k){return x?new OffscreenCanvas(H,k):cr("canvas")}function w(H,k,j){let mt=1,lt=$t(H);if((lt.width>j||lt.height>j)&&(mt=j/Math.max(lt.width,lt.height)),mt<1)if(typeof HTMLImageElement<"u"&&H instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&H instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&H instanceof ImageBitmap||typeof VideoFrame<"u"&&H instanceof VideoFrame){let yt=Math.floor(mt*lt.width),Et=Math.floor(mt*lt.height);h===void 0&&(h=g(yt,Et));let rt=k?g(yt,Et):h;return rt.width=yt,rt.height=Et,rt.getContext("2d").drawImage(H,0,0,yt,Et),Xt("WebGLRenderer: Texture has been resized from ("+lt.width+"x"+lt.height+") to ("+yt+"x"+Et+")."),rt}else return"data"in H&&Xt("WebGLRenderer: Image in DataTexture is too big ("+lt.width+"x"+lt.height+")."),H;return H}function _(H){return H.generateMipmaps}function v(H){n.generateMipmap(H)}function R(H){return H.isWebGLCubeRenderTarget?n.TEXTURE_CUBE_MAP:H.isWebGL3DRenderTarget?n.TEXTURE_3D:H.isWebGLArrayRenderTarget||H.isCompressedArrayTexture?n.TEXTURE_2D_ARRAY:n.TEXTURE_2D}function N(H,k,j,mt,lt,yt=!1){if(H!==null){if(n[H]!==void 0)return n[H];Xt("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+H+"'")}let Et;mt&&(Et=t.get("EXT_texture_norm16"),Et||Xt("WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension"));let rt=k;if(k===n.RED&&(j===n.FLOAT&&(rt=n.R32F),j===n.HALF_FLOAT&&(rt=n.R16F),j===n.UNSIGNED_BYTE&&(rt=n.R8),j===n.UNSIGNED_SHORT&&Et&&(rt=Et.R16_EXT),j===n.SHORT&&Et&&(rt=Et.R16_SNORM_EXT)),k===n.RED_INTEGER&&(j===n.UNSIGNED_BYTE&&(rt=n.R8UI),j===n.UNSIGNED_SHORT&&(rt=n.R16UI),j===n.UNSIGNED_INT&&(rt=n.R32UI),j===n.BYTE&&(rt=n.R8I),j===n.SHORT&&(rt=n.R16I),j===n.INT&&(rt=n.R32I)),k===n.RG&&(j===n.FLOAT&&(rt=n.RG32F),j===n.HALF_FLOAT&&(rt=n.RG16F),j===n.UNSIGNED_BYTE&&(rt=n.RG8),j===n.UNSIGNED_SHORT&&Et&&(rt=Et.RG16_EXT),j===n.SHORT&&Et&&(rt=Et.RG16_SNORM_EXT)),k===n.RG_INTEGER&&(j===n.UNSIGNED_BYTE&&(rt=n.RG8UI),j===n.UNSIGNED_SHORT&&(rt=n.RG16UI),j===n.UNSIGNED_INT&&(rt=n.RG32UI),j===n.BYTE&&(rt=n.RG8I),j===n.SHORT&&(rt=n.RG16I),j===n.INT&&(rt=n.RG32I)),k===n.RGB_INTEGER&&(j===n.UNSIGNED_BYTE&&(rt=n.RGB8UI),j===n.UNSIGNED_SHORT&&(rt=n.RGB16UI),j===n.UNSIGNED_INT&&(rt=n.RGB32UI),j===n.BYTE&&(rt=n.RGB8I),j===n.SHORT&&(rt=n.RGB16I),j===n.INT&&(rt=n.RGB32I)),k===n.RGBA_INTEGER&&(j===n.UNSIGNED_BYTE&&(rt=n.RGBA8UI),j===n.UNSIGNED_SHORT&&(rt=n.RGBA16UI),j===n.UNSIGNED_INT&&(rt=n.RGBA32UI),j===n.BYTE&&(rt=n.RGBA8I),j===n.SHORT&&(rt=n.RGBA16I),j===n.INT&&(rt=n.RGBA32I)),k===n.RGB&&(j===n.UNSIGNED_SHORT&&Et&&(rt=Et.RGB16_EXT),j===n.SHORT&&Et&&(rt=Et.RGB16_SNORM_EXT),j===n.UNSIGNED_INT_5_9_9_9_REV&&(rt=n.RGB9_E5),j===n.UNSIGNED_INT_10F_11F_11F_REV&&(rt=n.R11F_G11F_B10F)),k===n.RGBA){let at=yt?lr:ce.getTransfer(lt);j===n.FLOAT&&(rt=n.RGBA32F),j===n.HALF_FLOAT&&(rt=n.RGBA16F),j===n.UNSIGNED_BYTE&&(rt=at===fe?n.SRGB8_ALPHA8:n.RGBA8),j===n.UNSIGNED_SHORT&&Et&&(rt=Et.RGBA16_EXT),j===n.SHORT&&Et&&(rt=Et.RGBA16_SNORM_EXT),j===n.UNSIGNED_SHORT_4_4_4_4&&(rt=n.RGBA4),j===n.UNSIGNED_SHORT_5_5_5_1&&(rt=n.RGB5_A1)}return(rt===n.R16F||rt===n.R32F||rt===n.RG16F||rt===n.RG32F||rt===n.RGBA16F||rt===n.RGBA32F)&&t.get("EXT_color_buffer_float"),rt}function m(H,k){let j;return H?k===null||k===Pn||k===Ki?j=n.DEPTH24_STENCIL8:k===Ln?j=n.DEPTH32F_STENCIL8:k===Us&&(j=n.DEPTH24_STENCIL8,Xt("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):k===null||k===Pn||k===Ki?j=n.DEPTH_COMPONENT24:k===Ln?j=n.DEPTH_COMPONENT32F:k===Us&&(j=n.DEPTH_COMPONENT16),j}function M(H,k){return _(H)===!0||H.isFramebufferTexture&&H.minFilter!==Oe&&H.minFilter!==Qe?Math.log2(Math.max(k.width,k.height))+1:H.mipmaps.length>0?H.mipmaps.length:H.isCompressedTexture&&Array.isArray(H.image)?k.mipmaps.length:1}function L(H){let k=new WeakRef(H);i.get(H).__ref=k,p.add(k),T.register(H,k,k)}function P(H){let k=i.get(H).__ref;k!==void 0&&(p.delete(k),T.unregister(k))}function B(H){O(H.target)}function C(H){D(H.target)}function O(H){H.removeEventListener("dispose",B),P(H),z(H),H.isVideoTexture&&u.delete(H),H.isHTMLTexture&&d.delete(H)}function D(H){H.removeEventListener("dispose",C),P(H),I(H)}function E(){for(let H of p){let k=H.deref();k!==void 0&&(k.isRenderTarget===!0?D(k):O(k))}p.clear(),d.clear()}function z(H){let k=i.get(H);if(k.__webglInit===void 0)return;let j=H.source,mt=f.get(j);if(mt){let lt=mt[k.__cacheKey];lt.usedTimes--,lt.usedTimes===0&&b(H),Object.keys(mt).length===0&&f.delete(j)}i.remove(H)}function b(H){let k=i.get(H);n.deleteTexture(k.__webglTexture);let j=H.source,mt=f.get(j);delete mt[k.__cacheKey],a.memory.textures--}function I(H){let k=i.get(H);k.__depthDisposeCallback&&k.__depthDisposeCallback();let j=H.depthTexture;if(j&&j.renderTarget===H&&O(j),H.isWebGLCubeRenderTarget)for(let lt=0;lt<6;lt++){if(Array.isArray(k.__webglFramebuffer[lt]))for(let yt=0;yt<k.__webglFramebuffer[lt].length;yt++)n.deleteFramebuffer(k.__webglFramebuffer[lt][yt]);else n.deleteFramebuffer(k.__webglFramebuffer[lt]);k.__webglDepthbuffer&&n.deleteRenderbuffer(k.__webglDepthbuffer[lt])}else{if(Array.isArray(k.__webglFramebuffer))for(let lt=0;lt<k.__webglFramebuffer.length;lt++)n.deleteFramebuffer(k.__webglFramebuffer[lt]);else n.deleteFramebuffer(k.__webglFramebuffer);if(k.__webglDepthbuffer&&n.deleteRenderbuffer(k.__webglDepthbuffer),k.__webglMultisampledFramebuffer&&n.deleteFramebuffer(k.__webglMultisampledFramebuffer),k.__webglColorRenderbuffer)for(let lt=0;lt<k.__webglColorRenderbuffer.length;lt++)k.__webglColorRenderbuffer[lt]&&n.deleteRenderbuffer(k.__webglColorRenderbuffer[lt]);k.__webglDepthRenderbuffer&&n.deleteRenderbuffer(k.__webglDepthRenderbuffer)}let mt=H.textures;for(let lt=0,yt=mt.length;lt<yt;lt++){let Et=i.get(mt[lt]);Et.__webglTexture&&(n.deleteTexture(Et.__webglTexture),a.memory.textures--),i.remove(mt[lt])}i.remove(H)}let y=0;function F(){y=0}function S(){return y}function U(H){y=H}function V(){let H=y;return H>=s.maxTextures&&Xt("WebGLTextures: Trying to use "+(H+1)+" texture units while this GPU supports only "+s.maxTextures),y+=1,H}function A(H){let k=[];return k.push(H.wrapS),k.push(H.wrapT),k.push(H.wrapR||0),k.push(H.magFilter),k.push(H.minFilter),k.push(H.anisotropy),k.push(H.internalFormat),k.push(H.format),k.push(H.type),k.push(H.generateMipmaps),k.push(H.mipmapsAutoUpdate),k.push(H.premultiplyAlpha),k.push(H.flipY),k.push(H.unpackAlignment),k.push(H.colorSpace),k.join()}function q(H,k){let j=i.get(H);if(H.isVideoTexture&&Te(H),H.isRenderTargetTexture===!1&&H.isExternalTexture!==!0&&H.version>0&&j.__version!==H.version){let mt=H.image;if(mt===null)Xt("WebGLRenderer: Texture marked for update but no image data found.");else if(mt.complete===!1)Xt("WebGLRenderer: Texture marked for update but image is incomplete");else{pt(j,H,k);return}}else H.isExternalTexture&&(j.__webglTexture=H.sourceTexture?H.sourceTexture:null);e.bindTexture(n.TEXTURE_2D,j.__webglTexture,n.TEXTURE0+k)}function W(H,k){let j=i.get(H);if(H.isRenderTargetTexture===!1&&H.version>0&&j.__version!==H.version){pt(j,H,k);return}else H.isExternalTexture&&(j.__webglTexture=H.sourceTexture?H.sourceTexture:null);e.bindTexture(n.TEXTURE_2D_ARRAY,j.__webglTexture,n.TEXTURE0+k)}function Z(H,k){let j=i.get(H);if(H.isRenderTargetTexture===!1&&H.version>0&&j.__version!==H.version){pt(j,H,k);return}e.bindTexture(n.TEXTURE_3D,j.__webglTexture,n.TEXTURE0+k)}function Y(H,k){let j=i.get(H);if(H.version>0&&j.__version!==H.version){bt(j,H,k);return}e.bindTexture(n.TEXTURE_CUBE_MAP,j.__webglTexture,n.TEXTURE0+k)}let et={[Vi]:n.REPEAT,[Bn]:n.CLAMP_TO_EDGE,[La]:n.MIRRORED_REPEAT},ft={[Oe]:n.NEAREST,[Sd]:n.NEAREST_MIPMAP_NEAREST,[Dr]:n.NEAREST_MIPMAP_LINEAR,[Qe]:n.LINEAR,[ho]:n.LINEAR_MIPMAP_NEAREST,[si]:n.LINEAR_MIPMAP_LINEAR},ct={[Ed]:n.NEVER,[nh]:n.ALWAYS,[Ad]:n.LESS,[th]:n.LEQUAL,[Cd]:n.EQUAL,[eh]:n.GEQUAL,[Rd]:n.GREATER,[Id]:n.NOTEQUAL};function ut(H,k){if(k.type===Ln&&t.has("OES_texture_float_linear")===!1&&(k.magFilter===Qe||k.magFilter===ho||k.magFilter===Dr||k.magFilter===si||k.minFilter===Qe||k.minFilter===ho||k.minFilter===Dr||k.minFilter===si)&&Xt("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),n.texParameteri(H,n.TEXTURE_WRAP_S,et[k.wrapS]),n.texParameteri(H,n.TEXTURE_WRAP_T,et[k.wrapT]),(H===n.TEXTURE_3D||H===n.TEXTURE_2D_ARRAY)&&n.texParameteri(H,n.TEXTURE_WRAP_R,et[k.wrapR]),n.texParameteri(H,n.TEXTURE_MAG_FILTER,ft[k.magFilter]),n.texParameteri(H,n.TEXTURE_MIN_FILTER,ft[k.minFilter]),k.compareFunction&&(n.texParameteri(H,n.TEXTURE_COMPARE_MODE,n.COMPARE_REF_TO_TEXTURE),n.texParameteri(H,n.TEXTURE_COMPARE_FUNC,ct[k.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){if(k.magFilter===Oe||k.minFilter!==Dr&&k.minFilter!==si||k.type===Ln&&t.has("OES_texture_float_linear")===!1)return;if(k.anisotropy>1||i.get(k).__currentAnisotropy){let j=t.get("EXT_texture_filter_anisotropic");n.texParameterf(H,j.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(k.anisotropy,s.getMaxAnisotropy())),i.get(k).__currentAnisotropy=k.anisotropy}}}function _t(H,k){let j=!1;H.__webglInit===void 0&&(H.__webglInit=!0,k.addEventListener("dispose",B),L(k));let mt=k.source,lt=f.get(mt);lt===void 0&&(lt={},f.set(mt,lt));let yt=A(k);if(yt!==H.__cacheKey){lt[yt]===void 0&&(lt[yt]={texture:n.createTexture(),usedTimes:0},a.memory.textures++,j=!0),lt[yt].usedTimes++;let Et=lt[H.__cacheKey];Et!==void 0&&(lt[H.__cacheKey].usedTimes--,Et.usedTimes===0&&b(k)),H.__cacheKey=yt,H.__webglTexture=lt[yt].texture}return j}function nt(H,k,j){return Math.floor(Math.floor(H/j)/k)}function dt(H,k,j,mt){let yt=H.updateRanges;if(yt.length===0)e.texSubImage2D(n.TEXTURE_2D,0,0,0,k.width,k.height,j,mt,k.data);else{yt.sort((X,ot)=>X.start-ot.start);let Et=0;for(let X=1;X<yt.length;X++){let ot=yt[Et],st=yt[X],St=ot.start+ot.count,xt=nt(st.start,k.width,4),vt=nt(ot.start,k.width,4);st.start<=St+1&&xt===vt&&nt(st.start+st.count-1,k.width,4)===xt?ot.count=Math.max(ot.count,st.start+st.count-ot.start):(++Et,yt[Et]=st)}yt.length=Et+1;let rt=e.getParameter(n.UNPACK_ROW_LENGTH),at=e.getParameter(n.UNPACK_SKIP_PIXELS),Mt=e.getParameter(n.UNPACK_SKIP_ROWS);e.pixelStorei(n.UNPACK_ROW_LENGTH,k.width);for(let X=0,ot=yt.length;X<ot;X++){let st=yt[X],St=Math.floor(st.start/4),xt=Math.ceil(st.count/4),vt=St%k.width,Vt=Math.floor(St/k.width),ee=xt,gt=1;e.pixelStorei(n.UNPACK_SKIP_PIXELS,vt),e.pixelStorei(n.UNPACK_SKIP_ROWS,Vt),e.texSubImage2D(n.TEXTURE_2D,0,vt,Vt,ee,gt,j,mt,k.data)}H.clearUpdateRanges(),e.pixelStorei(n.UNPACK_ROW_LENGTH,rt),e.pixelStorei(n.UNPACK_SKIP_PIXELS,at),e.pixelStorei(n.UNPACK_SKIP_ROWS,Mt)}}function pt(H,k,j){let mt=n.TEXTURE_2D;(k.isDataArrayTexture||k.isCompressedArrayTexture)&&(mt=n.TEXTURE_2D_ARRAY),k.isData3DTexture&&(mt=n.TEXTURE_3D);let lt=_t(H,k),yt=k.source;e.bindTexture(mt,H.__webglTexture,n.TEXTURE0+j);let Et=i.get(yt);if(yt.version!==Et.__version||lt===!0){if(e.activeTexture(n.TEXTURE0+j),(typeof ImageBitmap<"u"&&k.image instanceof ImageBitmap)===!1){let gt=ce.getPrimaries(ce.workingColorSpace),Ht=k.colorSpace===ai?null:ce.getPrimaries(k.colorSpace),te=k.colorSpace===ai||gt===Ht?n.NONE:n.BROWSER_DEFAULT_WEBGL;e.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,k.flipY),e.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,k.premultiplyAlpha),e.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,te)}e.pixelStorei(n.UNPACK_ALIGNMENT,k.unpackAlignment);let at=w(k.image,!1,s.maxTextureSize);at=Wt(k,at);let Mt=r.convert(k.format,k.colorSpace),X=r.convert(k.type),ot=N(k.internalFormat,Mt,X,k.normalized,k.colorSpace,k.isVideoTexture);ut(mt,k);let st,St=k.mipmaps,xt=k.isVideoTexture!==!0,vt=Et.__version===void 0||lt===!0,Vt=yt.dataReady,ee=M(k,at);if(k.isDepthTexture)ot=m(k.format===ri,k.type),vt&&(xt?e.texStorage2D(n.TEXTURE_2D,1,ot,at.width,at.height):e.texImage2D(n.TEXTURE_2D,0,ot,at.width,at.height,0,Mt,X,null));else if(k.isDataTexture)if(St.length>0){xt&&vt&&e.texStorage2D(n.TEXTURE_2D,ee,ot,St[0].width,St[0].height);for(let gt=0,Ht=St.length;gt<Ht;gt++)st=St[gt],xt?Vt&&e.texSubImage2D(n.TEXTURE_2D,gt,0,0,st.width,st.height,Mt,X,st.data):e.texImage2D(n.TEXTURE_2D,gt,ot,st.width,st.height,0,Mt,X,st.data);k.generateMipmaps=!1}else xt?(vt&&e.texStorage2D(n.TEXTURE_2D,ee,ot,at.width,at.height),Vt&&dt(k,at,Mt,X)):e.texImage2D(n.TEXTURE_2D,0,ot,at.width,at.height,0,Mt,X,at.data);else if(k.isCompressedTexture)if(k.isCompressedArrayTexture){xt&&vt&&e.texStorage3D(n.TEXTURE_2D_ARRAY,ee,ot,St[0].width,St[0].height,at.depth);for(let gt=0,Ht=St.length;gt<Ht;gt++)if(st=St[gt],k.format!==Dn)if(Mt!==null)if(xt){if(Vt)if(k.layerUpdates.size>0){let te=hh(st.width,st.height,k.format,k.type);for(let It of k.layerUpdates){let pe=st.data.subarray(It*te/st.data.BYTES_PER_ELEMENT,(It+1)*te/st.data.BYTES_PER_ELEMENT);e.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,gt,0,0,It,st.width,st.height,1,Mt,pe)}}else e.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,gt,0,0,0,st.width,st.height,at.depth,Mt,st.data)}else e.compressedTexImage3D(n.TEXTURE_2D_ARRAY,gt,ot,st.width,st.height,at.depth,0,st.data,0,0);else Xt("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else xt?Vt&&e.texSubImage3D(n.TEXTURE_2D_ARRAY,gt,0,0,0,st.width,st.height,at.depth,Mt,X,st.data):e.texImage3D(n.TEXTURE_2D_ARRAY,gt,ot,st.width,st.height,at.depth,0,Mt,X,st.data);k.layerUpdates.size>0&&k.clearLayerUpdates()}else{xt&&vt&&e.texStorage2D(n.TEXTURE_2D,ee,ot,St[0].width,St[0].height);for(let gt=0,Ht=St.length;gt<Ht;gt++)st=St[gt],k.format!==Dn?Mt!==null?xt?Vt&&e.compressedTexSubImage2D(n.TEXTURE_2D,gt,0,0,st.width,st.height,Mt,st.data):e.compressedTexImage2D(n.TEXTURE_2D,gt,ot,st.width,st.height,0,st.data):Xt("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):xt?Vt&&e.texSubImage2D(n.TEXTURE_2D,gt,0,0,st.width,st.height,Mt,X,st.data):e.texImage2D(n.TEXTURE_2D,gt,ot,st.width,st.height,0,Mt,X,st.data)}else if(k.isDataArrayTexture)if(xt){if(vt&&e.texStorage3D(n.TEXTURE_2D_ARRAY,ee,ot,at.width,at.height,at.depth),Vt)if(k.layerUpdates.size>0){let gt=hh(at.width,at.height,k.format,k.type);for(let Ht of k.layerUpdates){let te=at.data.subarray(Ht*gt/at.data.BYTES_PER_ELEMENT,(Ht+1)*gt/at.data.BYTES_PER_ELEMENT);e.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,Ht,at.width,at.height,1,Mt,X,te)}k.clearLayerUpdates()}else e.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,0,at.width,at.height,at.depth,Mt,X,at.data)}else e.texImage3D(n.TEXTURE_2D_ARRAY,0,ot,at.width,at.height,at.depth,0,Mt,X,at.data);else if(k.isData3DTexture)xt?(vt&&e.texStorage3D(n.TEXTURE_3D,ee,ot,at.width,at.height,at.depth),Vt&&e.texSubImage3D(n.TEXTURE_3D,0,0,0,0,at.width,at.height,at.depth,Mt,X,at.data)):e.texImage3D(n.TEXTURE_3D,0,ot,at.width,at.height,at.depth,0,Mt,X,at.data);else if(k.isFramebufferTexture){if(vt)if(xt)e.texStorage2D(n.TEXTURE_2D,ee,ot,at.width,at.height);else{let gt=at.width,Ht=at.height;for(let te=0;te<ee;te++)e.texImage2D(n.TEXTURE_2D,te,ot,gt,Ht,0,Mt,X,null),gt>>=1,Ht>>=1}}else if(k.isHTMLTexture){if("texElementImage2D"in n){let gt=n.canvas;if(gt.hasAttribute("layoutsubtree")||gt.setAttribute("layoutsubtree","true"),at.parentNode!==gt){gt.appendChild(at),d.add(k),gt.onpaint=Ht=>{let te=Ht.changedElements;for(let It of d)te.includes(It.image)&&(It.needsUpdate=!0)},gt.requestPaint();return}if(n.texElementImage2D.length===3)n.texElementImage2D(n.TEXTURE_2D,n.RGBA8,at);else{let te=n.RGBA,It=n.RGBA,pe=n.UNSIGNED_BYTE;n.texElementImage2D(n.TEXTURE_2D,0,te,It,pe,at)}n.texParameteri(n.TEXTURE_2D,n.TEXTURE_MIN_FILTER,n.LINEAR),n.texParameteri(n.TEXTURE_2D,n.TEXTURE_WRAP_S,n.CLAMP_TO_EDGE),n.texParameteri(n.TEXTURE_2D,n.TEXTURE_WRAP_T,n.CLAMP_TO_EDGE)}}else if(St.length>0){if(xt&&vt){let gt=$t(St[0]);e.texStorage2D(n.TEXTURE_2D,ee,ot,gt.width,gt.height)}for(let gt=0,Ht=St.length;gt<Ht;gt++)st=St[gt],xt?Vt&&e.texSubImage2D(n.TEXTURE_2D,gt,0,0,Mt,X,st):e.texImage2D(n.TEXTURE_2D,gt,ot,Mt,X,st);k.generateMipmaps=!1}else if(xt){if(vt){let gt=$t(at);e.texStorage2D(n.TEXTURE_2D,ee,ot,gt.width,gt.height)}Vt&&e.texSubImage2D(n.TEXTURE_2D,0,0,0,Mt,X,at)}else e.texImage2D(n.TEXTURE_2D,0,ot,Mt,X,at);_(k)&&k.mipmapsAutoUpdate===!0&&v(mt),Et.__version=yt.version,k.onUpdate&&k.onUpdate(k)}H.__version=k.version}function bt(H,k,j){if(k.image.length!==6)return;let mt=_t(H,k),lt=k.source;e.bindTexture(n.TEXTURE_CUBE_MAP,H.__webglTexture,n.TEXTURE0+j);let yt=i.get(lt);if(lt.version!==yt.__version||mt===!0){e.activeTexture(n.TEXTURE0+j);let Et=ce.getPrimaries(ce.workingColorSpace),rt=k.colorSpace===ai?null:ce.getPrimaries(k.colorSpace),at=k.colorSpace===ai||Et===rt?n.NONE:n.BROWSER_DEFAULT_WEBGL;e.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,k.flipY),e.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,k.premultiplyAlpha),e.pixelStorei(n.UNPACK_ALIGNMENT,k.unpackAlignment),e.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,at);let Mt=k.isCompressedTexture||k.image[0].isCompressedTexture,X=k.image[0]&&k.image[0].isDataTexture,ot=[];for(let It=0;It<6;It++)!Mt&&!X?ot[It]=w(k.image[It],!0,s.maxCubemapSize):ot[It]=X?k.image[It].image:k.image[It],ot[It]=Wt(k,ot[It]);let st=ot[0],St=r.convert(k.format,k.colorSpace),xt=r.convert(k.type),vt=N(k.internalFormat,St,xt,k.normalized,k.colorSpace),Vt=k.isVideoTexture!==!0,ee=yt.__version===void 0||mt===!0,gt=lt.dataReady,Ht=M(k,st);ut(n.TEXTURE_CUBE_MAP,k);let te;if(k.isDepthTexture){if(vt=m(k.format===ri,k.type),ee)if(Vt)e.texStorage2D(n.TEXTURE_CUBE_MAP,1,vt,st.width,st.height);else for(let It=0;It<6;It++)e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+It,0,vt,st.width,st.height,0,St,xt,null)}else if(Mt){Vt&&ee&&e.texStorage2D(n.TEXTURE_CUBE_MAP,Ht,vt,st.width,st.height);for(let It=0;It<6;It++){te=ot[It].mipmaps;for(let pe=0;pe<te.length;pe++){let De=te[pe];k.format!==Dn?St!==null?Vt?gt&&e.compressedTexSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+It,pe,0,0,De.width,De.height,St,De.data):e.compressedTexImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+It,pe,vt,De.width,De.height,0,De.data):Xt("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):Vt?gt&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+It,pe,0,0,De.width,De.height,St,xt,De.data):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+It,pe,vt,De.width,De.height,0,St,xt,De.data)}}}else{if(te=k.mipmaps,Vt&&ee){te.length>0&&Ht++;let It=$t(ot[0]);e.texStorage2D(n.TEXTURE_CUBE_MAP,Ht,vt,It.width,It.height)}for(let It=0;It<6;It++)if(X){Vt?gt&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+It,0,0,0,ot[It].width,ot[It].height,St,xt,ot[It].data):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+It,0,vt,ot[It].width,ot[It].height,0,St,xt,ot[It].data);for(let pe=0;pe<te.length;pe++){let oi=te[pe].image[It].image;Vt?gt&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+It,pe+1,0,0,oi.width,oi.height,St,xt,oi.data):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+It,pe+1,vt,oi.width,oi.height,0,St,xt,oi.data)}}else{Vt?gt&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+It,0,0,0,St,xt,ot[It]):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+It,0,vt,St,xt,ot[It]);for(let pe=0;pe<te.length;pe++){let De=te[pe];Vt?gt&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+It,pe+1,0,0,St,xt,De.image[It]):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+It,pe+1,vt,St,xt,De.image[It])}}}_(k)&&k.mipmapsAutoUpdate===!0&&v(n.TEXTURE_CUBE_MAP),yt.__version=lt.version,k.onUpdate&&k.onUpdate(k)}H.__version=k.version}function Rt(H,k,j,mt,lt,yt){let Et=r.convert(j.format,j.colorSpace),rt=r.convert(j.type),at=N(j.internalFormat,Et,rt,j.normalized,j.colorSpace),Mt=i.get(k),X=i.get(j);if(X.__renderTarget=k,!Mt.__hasExternalTextures){let ot=Math.max(1,k.width>>yt),st=Math.max(1,k.height>>yt);lt===n.TEXTURE_3D||lt===n.TEXTURE_2D_ARRAY?e.texImage3D(lt,yt,at,ot,st,k.depth,0,Et,rt,null):e.texImage2D(lt,yt,at,ot,st,0,Et,rt,null)}e.bindFramebuffer(n.FRAMEBUFFER,H),Tt(k)?o.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,mt,lt,X.__webglTexture,0,me(k)):(lt===n.TEXTURE_2D||lt>=n.TEXTURE_CUBE_MAP_POSITIVE_X&&lt<=n.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&n.framebufferTexture2D(n.FRAMEBUFFER,mt,lt,X.__webglTexture,yt),e.bindFramebuffer(n.FRAMEBUFFER,null)}function Qt(H,k,j){if(n.bindRenderbuffer(n.RENDERBUFFER,H),k.depthBuffer){let mt=k.depthTexture,lt=mt&&mt.isDepthTexture?mt.type:null,yt=m(k.stencilBuffer,lt),Et=k.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;Tt(k)?o.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,me(k),yt,k.width,k.height):j?n.renderbufferStorageMultisample(n.RENDERBUFFER,me(k),yt,k.width,k.height):n.renderbufferStorage(n.RENDERBUFFER,yt,k.width,k.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,Et,n.RENDERBUFFER,H)}else{let mt=k.textures;for(let lt=0;lt<mt.length;lt++){let yt=mt[lt],Et=r.convert(yt.format,yt.colorSpace),rt=r.convert(yt.type),at=N(yt.internalFormat,Et,rt,yt.normalized,yt.colorSpace);Tt(k)?o.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,me(k),at,k.width,k.height):j?n.renderbufferStorageMultisample(n.RENDERBUFFER,me(k),at,k.width,k.height):n.renderbufferStorage(n.RENDERBUFFER,at,k.width,k.height)}}n.bindRenderbuffer(n.RENDERBUFFER,null)}function Gt(H,k,j){let mt=k.isWebGLCubeRenderTarget===!0;if(e.bindFramebuffer(n.FRAMEBUFFER,H),!(k.depthTexture&&k.depthTexture.isDepthTexture))throw new Error("THREE.WebGLTextures: renderTarget.depthTexture must be an instance of THREE.DepthTexture.");let lt=i.get(k.depthTexture);lt.__renderTarget=k;let yt=mt?k.depthTexture.image[0]:k.depthTexture.image;(!lt.__webglTexture||yt.width!==k.width||yt.height!==k.height)&&(yt.width=k.width,yt.height=k.height,k.depthTexture.needsUpdate=!0),mt?Y(k.depthTexture,0):q(k.depthTexture,0);let Et=lt.__webglTexture,rt=me(k),at=mt?n.TEXTURE_CUBE_MAP_POSITIVE_X+j:n.TEXTURE_2D,Mt=k.depthTexture.format===ri?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;if(k.depthTexture.format===ei)Tt(k)?o.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,Mt,at,Et,0,rt):n.framebufferTexture2D(n.FRAMEBUFFER,Mt,at,Et,0);else if(k.depthTexture.format===ri)Tt(k)?o.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,Mt,at,Et,0,rt):n.framebufferTexture2D(n.FRAMEBUFFER,Mt,at,Et,0);else throw new Error("THREE.WebGLTextures: Unknown depthTexture format.")}function re(H){let k=i.get(H),j=H.isWebGLCubeRenderTarget===!0;if(k.__boundDepthTexture!==H.depthTexture){let mt=H.depthTexture;if(k.__depthDisposeCallback&&k.__depthDisposeCallback(),mt){let lt=()=>{delete k.__boundDepthTexture,delete k.__depthDisposeCallback,mt.removeEventListener("dispose",lt)};mt.addEventListener("dispose",lt),k.__depthDisposeCallback=lt}k.__boundDepthTexture=mt}if(H.depthTexture&&!k.__autoAllocateDepthBuffer)if(j)for(let mt=0;mt<6;mt++)Gt(k.__webglFramebuffer[mt],H,mt);else H.texture.mipmaps.length>0?Gt(k.__webglFramebuffer[0],H,0):Gt(k.__webglFramebuffer,H,0);else if(j){k.__webglDepthbuffer=[];for(let mt=0;mt<6;mt++)if(e.bindFramebuffer(n.FRAMEBUFFER,k.__webglFramebuffer[mt]),k.__webglDepthbuffer[mt]===void 0)k.__webglDepthbuffer[mt]=n.createRenderbuffer(),Qt(k.__webglDepthbuffer[mt],H,!1);else{let lt=H.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,yt=k.__webglDepthbuffer[mt];n.bindRenderbuffer(n.RENDERBUFFER,yt),n.framebufferRenderbuffer(n.FRAMEBUFFER,lt,n.RENDERBUFFER,yt)}}else if(H.texture.mipmaps.length>0?e.bindFramebuffer(n.FRAMEBUFFER,k.__webglFramebuffer[0]):e.bindFramebuffer(n.FRAMEBUFFER,k.__webglFramebuffer),k.__webglDepthbuffer===void 0)k.__webglDepthbuffer=n.createRenderbuffer(),Qt(k.__webglDepthbuffer,H,!1);else{let lt=H.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,yt=k.__webglDepthbuffer;n.bindRenderbuffer(n.RENDERBUFFER,yt),n.framebufferRenderbuffer(n.FRAMEBUFFER,lt,n.RENDERBUFFER,yt)}e.bindFramebuffer(n.FRAMEBUFFER,null)}function ae(H,k,j){let mt=i.get(H);k!==void 0&&Rt(mt.__webglFramebuffer,H,H.texture,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,0),j!==void 0&&re(H)}function ue(H){let k=H.texture,j=i.get(H),mt=i.get(k);H.addEventListener("dispose",C),L(H);let lt=H.textures,yt=H.isWebGLCubeRenderTarget===!0,Et=lt.length>1;if(Et||(mt.__webglTexture===void 0&&(mt.__webglTexture=n.createTexture()),mt.__version=k.version,a.memory.textures++),yt){j.__webglFramebuffer=[];for(let rt=0;rt<6;rt++)if(k.mipmaps.length>0){j.__webglFramebuffer[rt]=[];for(let at=0;at<k.mipmaps.length;at++)j.__webglFramebuffer[rt][at]=n.createFramebuffer()}else j.__webglFramebuffer[rt]=n.createFramebuffer()}else{if(k.mipmaps.length>0){j.__webglFramebuffer=[];for(let rt=0;rt<k.mipmaps.length;rt++)j.__webglFramebuffer[rt]=n.createFramebuffer()}else j.__webglFramebuffer=n.createFramebuffer();if(Et)for(let rt=0,at=lt.length;rt<at;rt++){let Mt=i.get(lt[rt]);Mt.__webglTexture===void 0&&(Mt.__webglTexture=n.createTexture(),a.memory.textures++)}if(H.samples>0&&Tt(H)===!1){j.__webglMultisampledFramebuffer=n.createFramebuffer(),j.__webglColorRenderbuffer=[],e.bindFramebuffer(n.FRAMEBUFFER,j.__webglMultisampledFramebuffer);for(let rt=0;rt<lt.length;rt++){let at=lt[rt];j.__webglColorRenderbuffer[rt]=n.createRenderbuffer(),n.bindRenderbuffer(n.RENDERBUFFER,j.__webglColorRenderbuffer[rt]);let Mt=r.convert(at.format,at.colorSpace),X=r.convert(at.type),ot=N(at.internalFormat,Mt,X,at.normalized,at.colorSpace,H.isXRRenderTarget===!0),st=me(H);n.renderbufferStorageMultisample(n.RENDERBUFFER,st,ot,H.width,H.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+rt,n.RENDERBUFFER,j.__webglColorRenderbuffer[rt])}n.bindRenderbuffer(n.RENDERBUFFER,null),H.depthBuffer&&(j.__webglDepthRenderbuffer=n.createRenderbuffer(),Qt(j.__webglDepthRenderbuffer,H,!0)),e.bindFramebuffer(n.FRAMEBUFFER,null)}}if(yt){e.bindTexture(n.TEXTURE_CUBE_MAP,mt.__webglTexture),ut(n.TEXTURE_CUBE_MAP,k);for(let rt=0;rt<6;rt++)if(k.mipmaps.length>0)for(let at=0;at<k.mipmaps.length;at++)Rt(j.__webglFramebuffer[rt][at],H,k,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+rt,at);else Rt(j.__webglFramebuffer[rt],H,k,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+rt,0);_(k)?v(n.TEXTURE_CUBE_MAP):k.mipmaps.length>0&&n.texParameteri(n.TEXTURE_CUBE_MAP,n.TEXTURE_MAX_LEVEL,k.mipmaps.length-1),e.unbindTexture()}else if(Et){for(let rt=0,at=lt.length;rt<at;rt++){let Mt=lt[rt],X=i.get(Mt),ot=n.TEXTURE_2D;(H.isWebGL3DRenderTarget||H.isWebGLArrayRenderTarget)&&(ot=H.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY),e.bindTexture(ot,X.__webglTexture),ut(ot,Mt),Rt(j.__webglFramebuffer,H,Mt,n.COLOR_ATTACHMENT0+rt,ot,0),_(Mt)&&v(ot)}e.unbindTexture()}else{let rt=n.TEXTURE_2D;if((H.isWebGL3DRenderTarget||H.isWebGLArrayRenderTarget)&&(rt=H.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY),e.bindTexture(rt,mt.__webglTexture),ut(rt,k),k.mipmaps.length>0)for(let at=0;at<k.mipmaps.length;at++)Rt(j.__webglFramebuffer[at],H,k,n.COLOR_ATTACHMENT0,rt,at);else Rt(j.__webglFramebuffer,H,k,n.COLOR_ATTACHMENT0,rt,0);_(k)?v(rt):k.mipmaps.length>0&&n.texParameteri(rt,n.TEXTURE_MAX_LEVEL,k.mipmaps.length-1),e.unbindTexture()}H.depthBuffer&&re(H)}function K(H){let k=H.textures;for(let j=0,mt=k.length;j<mt;j++){let lt=k[j];if(_(lt)&&lt.mipmapsAutoUpdate===!0){let yt=R(H),Et=i.get(lt).__webglTexture;e.bindTexture(yt,Et),v(yt),e.unbindTexture()}}}let Ce=[];function ie(H){if(H.samples>0){if(Tt(H)===!1){let k=H.textures,j=H.width,mt=H.height,lt=n.COLOR_BUFFER_BIT,yt=H.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,Et=i.get(H),rt=k.length>1;if(rt)for(let Mt=0;Mt<k.length;Mt++)e.bindFramebuffer(n.FRAMEBUFFER,Et.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+Mt,n.RENDERBUFFER,null),e.bindFramebuffer(n.FRAMEBUFFER,Et.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+Mt,n.TEXTURE_2D,null,0);e.bindFramebuffer(n.READ_FRAMEBUFFER,Et.__webglMultisampledFramebuffer),H.texture.mipmaps.length>0?e.bindFramebuffer(n.DRAW_FRAMEBUFFER,Et.__webglFramebuffer[0]):e.bindFramebuffer(n.DRAW_FRAMEBUFFER,Et.__webglFramebuffer);for(let Mt=0;Mt<k.length;Mt++){if(H.resolveDepthBuffer&&(H.depthBuffer&&(lt|=n.DEPTH_BUFFER_BIT),H.stencilBuffer&&H.resolveStencilBuffer&&(lt|=n.STENCIL_BUFFER_BIT)),rt){n.framebufferRenderbuffer(n.READ_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.RENDERBUFFER,Et.__webglColorRenderbuffer[Mt]);let X=i.get(k[Mt]).__webglTexture;n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,X,0)}n.blitFramebuffer(0,0,j,mt,0,0,j,mt,lt,n.NEAREST),l===!0&&(Ce.length=0,Ce.push(n.COLOR_ATTACHMENT0+Mt),H.depthBuffer&&H.storeMultisampledDepthBuffer===!1&&Ce.push(yt),n.invalidateFramebuffer(n.READ_FRAMEBUFFER,Ce))}if(e.bindFramebuffer(n.READ_FRAMEBUFFER,null),e.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),rt)for(let Mt=0;Mt<k.length;Mt++){e.bindFramebuffer(n.FRAMEBUFFER,Et.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+Mt,n.RENDERBUFFER,Et.__webglColorRenderbuffer[Mt]);let X=i.get(k[Mt]).__webglTexture;e.bindFramebuffer(n.FRAMEBUFFER,Et.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+Mt,n.TEXTURE_2D,X,0)}e.bindFramebuffer(n.DRAW_FRAMEBUFFER,Et.__webglMultisampledFramebuffer)}else if(H.depthBuffer&&H.storeMultisampledDepthBuffer===!1&&l){let k=H.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,[k])}}}function me(H){return Math.min(s.maxSamples,H.samples)}function Tt(H){let k=i.get(H);return H.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&k.__useRenderToTexture!==!1}function Te(H){let k=a.render.frame;u.get(H)!==k&&(u.set(H,k),H.update())}function Wt(H,k){let j=H.colorSpace,mt=H.format,lt=H.type;return H.isCompressedTexture===!0||H.isVideoTexture===!0||j!==or&&j!==ai&&(ce.getTransfer(j)===fe?(mt!==Dn||lt!==on)&&Xt("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):Yt("WebGLTextures: Unsupported texture color space:",j)),k}function $t(H){return typeof HTMLImageElement<"u"&&H instanceof HTMLImageElement?(c.width=H.naturalWidth||H.width,c.height=H.naturalHeight||H.height):typeof VideoFrame<"u"&&H instanceof VideoFrame?(c.width=H.displayWidth,c.height=H.displayHeight):(c.width=H.width,c.height=H.height),c}this.allocateTextureUnit=V,this.resetTextureUnits=F,this.getTextureUnits=S,this.setTextureUnits=U,this.setTexture2D=q,this.setTexture2DArray=W,this.setTexture3D=Z,this.setTextureCube=Y,this.rebindTextures=ae,this.setupRenderTarget=ue,this.updateRenderTargetMipmap=K,this.updateMultisampleRenderTarget=ie,this.setupDepthRenderbuffer=re,this.setupFrameBufferTexture=Rt,this.useMultisampledRTT=Tt,this.dispose=E}function hy(n,t){function e(i,s=ai){let r,a=ce.getTransfer(s);if(i===on)return n.UNSIGNED_BYTE;if(i===fo)return n.UNSIGNED_SHORT_4_4_4_4;if(i===po)return n.UNSIGNED_SHORT_5_5_5_1;if(i===Zc)return n.UNSIGNED_INT_5_9_9_9_REV;if(i===Kc)return n.UNSIGNED_INT_10F_11F_11F_REV;if(i===Yc)return n.BYTE;if(i===$c)return n.SHORT;if(i===Us)return n.UNSIGNED_SHORT;if(i===uo)return n.INT;if(i===Pn)return n.UNSIGNED_INT;if(i===Ln)return n.FLOAT;if(i===Nn)return n.HALF_FLOAT;if(i===Jc)return n.ALPHA;if(i===Qc)return n.RGB;if(i===Dn)return n.RGBA;if(i===ei)return n.DEPTH_COMPONENT;if(i===ri)return n.DEPTH_STENCIL;if(i===jc)return n.RED;if(i===mo)return n.RED_INTEGER;if(i===Ai)return n.RG;if(i===go)return n.RG_INTEGER;if(i===xo)return n.RGBA_INTEGER;if(i===Ur||i===Fr||i===Or||i===Br)if(a===fe)if(r=t.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(i===Ur)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(i===Fr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(i===Or)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(i===Br)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=t.get("WEBGL_compressed_texture_s3tc"),r!==null){if(i===Ur)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(i===Fr)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(i===Or)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(i===Br)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(i===_o||i===yo||i===vo||i===Mo)if(r=t.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(i===_o)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(i===yo)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(i===vo)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(i===Mo)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(i===So||i===bo||i===wo||i===To||i===Eo||i===kr||i===Ao)if(r=t.get("WEBGL_compressed_texture_etc"),r!==null){if(i===So||i===bo)return a===fe?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(i===wo)return a===fe?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC;if(i===To)return r.COMPRESSED_R11_EAC;if(i===Eo)return r.COMPRESSED_SIGNED_R11_EAC;if(i===kr)return r.COMPRESSED_RG11_EAC;if(i===Ao)return r.COMPRESSED_SIGNED_RG11_EAC}else return null;if(i===Co||i===Ro||i===Io||i===Po||i===Lo||i===No||i===Do||i===Uo||i===Fo||i===Oo||i===Bo||i===ko||i===zo||i===Go)if(r=t.get("WEBGL_compressed_texture_astc"),r!==null){if(i===Co)return a===fe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(i===Ro)return a===fe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(i===Io)return a===fe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(i===Po)return a===fe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(i===Lo)return a===fe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(i===No)return a===fe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(i===Do)return a===fe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(i===Uo)return a===fe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(i===Fo)return a===fe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(i===Oo)return a===fe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(i===Bo)return a===fe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(i===ko)return a===fe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(i===zo)return a===fe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(i===Go)return a===fe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(i===Vo||i===Ho||i===Wo)if(r=t.get("EXT_texture_compression_bptc"),r!==null){if(i===Vo)return a===fe?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(i===Ho)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(i===Wo)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(i===qo||i===Xo||i===zr||i===Yo)if(r=t.get("EXT_texture_compression_rgtc"),r!==null){if(i===qo)return r.COMPRESSED_RED_RGTC1_EXT;if(i===Xo)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(i===zr)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(i===Yo)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return i===Ki?n.UNSIGNED_INT_24_8:n[i]!==void 0?n[i]:null}return{convert:e}}var uy=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,dy=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`,wh=class{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(t,e){if(this.texture===null){let i=new gr(t.texture);(t.depthNear!==e.depthNear||t.depthFar!==e.depthFar)&&(this.depthNear=t.depthNear,this.depthFar=t.depthFar),this.texture=i}}getMesh(t){if(this.texture!==null&&this.mesh===null){let e=t.cameras[0].viewport,i=new Hn({vertexShader:uy,fragmentShader:dy,uniforms:{depthColor:{value:this.texture},depthWidth:{value:e.z},depthHeight:{value:e.w}}});this.mesh=new Xe(new Si(20,20),i)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}},Th=class extends zn{constructor(t,e){super();let i=this,s=null,r=1,a=null,o="local-floor",l=1,c=null,u=null,d=null,h=null,f=null,p=null,T=typeof XRWebGLBinding<"u",x=new wh,g={},w=e.getContextAttributes(),_=null,v=null,R=[],N=[],m=new Ct,M=null,L=null,P=new Je;P.viewport=new Me;let B=new Je;B.viewport=new Me;let C=[P,B],O=new ao,D=null,E=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(A){let q=R[A];return q===void 0&&(q=new ws,R[A]=q),q.getTargetRaySpace()},this.getControllerGrip=function(A){let q=R[A];return q===void 0&&(q=new ws,R[A]=q),q.getGripSpace()},this.getHand=function(A){let q=R[A];return q===void 0&&(q=new ws,R[A]=q),q.getHandSpace()};function z(A){let q=N.indexOf(A.inputSource);if(q===-1)return;let W=R[q];W!==void 0&&(W.update(A.inputSource,A.frame,c||a),W.dispatchEvent({type:A.type,data:A.inputSource}))}function b(){s.removeEventListener("select",z),s.removeEventListener("selectstart",z),s.removeEventListener("selectend",z),s.removeEventListener("squeeze",z),s.removeEventListener("squeezestart",z),s.removeEventListener("squeezeend",z),s.removeEventListener("end",b),s.removeEventListener("inputsourceschange",I);for(let A=0;A<R.length;A++){let q=N[A];q!==null&&(N[A]=null,R[A].disconnect(q))}D=null,E=null,x.reset();for(let A in g)delete g[A];if(t.setRenderTarget(_),f=null,h=null,d=null,s=null,v=null,V.stop(),i.isPresenting=!1,t.setPixelRatio(M),t.setSize(m.width,m.height,!1),L!==null){let A=L.camera;A.fov=L.fov,A.zoom=L.zoom,A.updateProjectionMatrix(),L=null}i.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(A){r=A,i.isPresenting===!0&&Xt("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(A){o=A,i.isPresenting===!0&&Xt("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||a},this.setReferenceSpace=function(A){c=A},this.getBaseLayer=function(){return h!==null?h:f},this.getBinding=function(){return d===null&&T&&(d=new XRWebGLBinding(s,e)),d},this.getFrame=function(){return p},this.getSession=function(){return s},this.setSession=async function(A){if(s=A,s!==null){if(_=t.getRenderTarget(),s.addEventListener("select",z),s.addEventListener("selectstart",z),s.addEventListener("selectend",z),s.addEventListener("squeeze",z),s.addEventListener("squeezestart",z),s.addEventListener("squeezeend",z),s.addEventListener("end",b),s.addEventListener("inputsourceschange",I),w.xrCompatible!==!0&&await e.makeXRCompatible(),M=t.getPixelRatio(),t.getSize(m),T&&"createProjectionLayer"in XRWebGLBinding.prototype){let W=null,Z=null,Y=null;w.depth&&(Y=w.stencil?e.DEPTH24_STENCIL8:e.DEPTH_COMPONENT24,W=w.stencil?ri:ei,Z=w.stencil?Ki:Pn);let et={colorFormat:e.RGBA8,depthFormat:Y,scaleFactor:r};d=this.getBinding(),h=d.createProjectionLayer(et),s.updateRenderState({layers:[h]}),t.setPixelRatio(1),t.setSize(h.textureWidth,h.textureHeight,!1),v=new mn(h.textureWidth,h.textureHeight,{format:Dn,type:on,depthTexture:new ii(h.textureWidth,h.textureHeight,Z,void 0,void 0,void 0,void 0,void 0,void 0,W),stencilBuffer:w.stencil,colorSpace:t.outputColorSpace,samples:w.antialias?4:0,resolveDepthBuffer:h.ignoreDepthValues===!1,resolveStencilBuffer:h.ignoreDepthValues===!1,storeMultisampledDepthBuffer:h.ignoreDepthValues===!1,storeMultisampledStencilBuffer:h.ignoreDepthValues===!1})}else{let W={antialias:w.antialias,alpha:!0,depth:w.depth,stencil:w.stencil,framebufferScaleFactor:r};f=new XRWebGLLayer(s,e,W),s.updateRenderState({baseLayer:f}),t.setPixelRatio(1),t.setSize(f.framebufferWidth,f.framebufferHeight,!1),v=new mn(f.framebufferWidth,f.framebufferHeight,{format:Dn,type:on,colorSpace:t.outputColorSpace,stencilBuffer:w.stencil,resolveDepthBuffer:f.ignoreDepthValues===!1,resolveStencilBuffer:f.ignoreDepthValues===!1,storeMultisampledDepthBuffer:f.ignoreDepthValues===!1,storeMultisampledStencilBuffer:f.ignoreDepthValues===!1})}v.isXRRenderTarget=!0,this.setFoveation(l),c=null,a=await s.requestReferenceSpace(o),V.setContext(s),V.start(),i.isPresenting=!0,i.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return x.getDepthTexture()};function I(A){for(let q=0;q<A.removed.length;q++){let W=A.removed[q],Z=N.indexOf(W);Z>=0&&(N[Z]=null,R[Z].disconnect(W))}for(let q=0;q<A.added.length;q++){let W=A.added[q],Z=N.indexOf(W);if(Z===-1){for(let et=0;et<R.length;et++)if(et>=N.length){N.push(W),Z=et;break}else if(N[et]===null){N[et]=W,Z=et;break}if(Z===-1)break}let Y=R[Z];Y&&Y.connect(W)}}function y(A,q){q===null?A.matrixWorld.copy(A.matrix):A.matrixWorld.multiplyMatrices(q.matrixWorld,A.matrix),A.matrixWorldInverse.copy(A.matrixWorld).invert()}this.updateCamera=function(A){if(s===null)return;let q=A.near,W=A.far;x.texture!==null&&(x.depthNear>0&&(q=x.depthNear),x.depthFar>0&&(W=x.depthFar)),O.near=B.near=P.near=q,O.far=B.far=P.far=W,(D!==O.near||E!==O.far)&&(s.updateRenderState({depthNear:O.near,depthFar:O.far}),D=O.near,E=O.far),O.layers.mask=A.layers.mask|6,P.layers.mask=O.layers.mask&-5,B.layers.mask=O.layers.mask&-3;let Z=A.parent,Y=O.cameras;y(O,Z);for(let et=0;et<Y.length;et++)y(Y[et],Z);O.projectionMatrix.copy(P.projectionMatrix),O.projectionMatrixInverse.copy(P.projectionMatrixInverse),L===null&&A.isPerspectiveCamera&&(L={camera:A,fov:A.fov,zoom:A.zoom}),F(A,O,Z)};function F(A,q,W){W===null?A.matrix.copy(q.matrixWorld):(A.matrix.copy(W.matrixWorld),A.matrix.invert(),A.matrix.multiply(q.matrixWorld)),A.matrix.decompose(A.position,A.quaternion,A.scale),A.updateMatrixWorld(!0),A.projectionMatrix.copy(q.projectionMatrix),A.projectionMatrixInverse.copy(q.projectionMatrixInverse),A.isPerspectiveCamera&&(A.fov=Da*2*Math.atan(1/A.projectionMatrix.elements[5]),A.zoom=1)}this.getCamera=function(){return O},this.getFoveation=function(){if(!(h===null&&f===null))return l},this.setFoveation=function(A){l=A,h!==null&&(h.fixedFoveation=A),f!==null&&f.fixedFoveation!==void 0&&(f.fixedFoveation=A)},this.hasDepthSensing=function(){return x.texture!==null},this.getDepthSensingMesh=function(){return x.getMesh(O)},this.getCameraTexture=function(A){return g[A]};let S=null;function U(A,q){if(u=q.getViewerPose(c||a),p=q,u!==null){let W=u.views;f!==null&&(t.setRenderTargetFramebuffer(v,f.framebuffer),t.setRenderTarget(v));let Z=!1;W.length!==O.cameras.length&&(O.cameras.length=0,Z=!0);for(let ct=0;ct<W.length;ct++){let ut=W[ct],_t=null;if(f!==null)_t=f.getViewport(ut);else{let dt=d.getViewSubImage(h,ut);_t=dt.viewport,ct===0&&(t.setRenderTargetTextures(v,dt.colorTexture,dt.depthStencilTexture),t.setRenderTarget(v))}let nt=C[ct];nt===void 0&&(nt=new Je,nt.layers.enable(ct),nt.viewport=new Me,C[ct]=nt),nt.matrix.fromArray(ut.transform.matrix),nt.matrix.decompose(nt.position,nt.quaternion,nt.scale),nt.projectionMatrix.fromArray(ut.projectionMatrix),nt.projectionMatrixInverse.copy(nt.projectionMatrix).invert(),nt.viewport.set(_t.x,_t.y,_t.width,_t.height),ct===0&&(O.matrix.copy(nt.matrix),O.matrix.decompose(O.position,O.quaternion,O.scale)),Z===!0&&O.cameras.push(nt)}let Y=s.enabledFeatures;if(Y&&Y.includes("depth-sensing")&&s.depthUsage=="gpu-optimized"&&T){d=i.getBinding();let ct=d.getDepthInformation(W[0]);ct&&ct.isValid&&ct.texture&&x.init(ct,s.renderState)}if(Y&&Y.includes("camera-access")&&T){t.state.unbindTexture(),d=i.getBinding();for(let ct=0;ct<W.length;ct++){let ut=W[ct].camera;if(ut){let _t=g[ut];_t||(_t=new gr,g[ut]=_t);let nt=d.getCameraImage(ut);_t.sourceTexture=nt}}}}for(let W=0;W<R.length;W++){let Z=N[W],Y=R[W];Z!==null&&Y!==void 0&&Y.update(Z,q,c||a)}S&&S(A,q),q.detectedPlanes&&i.dispatchEvent({type:"planesdetected",data:q}),p=null}let V=new ff;V.setAnimationLoop(U),this.setAnimationLoop=function(A){S=A},this.dispose=function(){}}},fy=new ye,bf=new Zt;bf.set(-1,0,0,0,1,0,0,0,1);function py(n,t){function e(x,g){x.matrixAutoUpdate===!0&&x.updateMatrix(),g.value.copy(x.matrix)}function i(x,g){g.color.getRGB(x.fogColor.value,oh(n)),g.isFog?(x.fogNear.value=g.near,x.fogFar.value=g.far):g.isFogExp2&&(x.fogDensity.value=g.density)}function s(x,g,w,_,v){g.isNodeMaterial?g.uniformsNeedUpdate=!1:g.isMeshBasicMaterial?r(x,g):g.isMeshLambertMaterial?(r(x,g),g.envMap&&(x.envMapIntensity.value=g.envMapIntensity)):g.isMeshToonMaterial?(r(x,g),d(x,g)):g.isMeshPhongMaterial?(r(x,g),u(x,g),g.envMap&&(x.envMapIntensity.value=g.envMapIntensity)):g.isMeshStandardMaterial?(r(x,g),h(x,g),g.isMeshPhysicalMaterial&&f(x,g,v)):g.isMeshMatcapMaterial?(r(x,g),p(x,g)):g.isMeshDepthMaterial?r(x,g):g.isMeshDistanceMaterial?(r(x,g),T(x,g)):g.isMeshNormalMaterial?r(x,g):g.isLineBasicMaterial?(a(x,g),g.isLineDashedMaterial&&o(x,g)):g.isPointsMaterial?l(x,g,w,_):g.isSpriteMaterial?c(x,g):g.isShadowMaterial?(x.color.value.copy(g.color),x.opacity.value=g.opacity):g.isShaderMaterial&&(g.uniformsNeedUpdate=!1)}function r(x,g){x.opacity.value=g.opacity,g.color&&x.diffuse.value.copy(g.color),g.emissive&&x.emissive.value.copy(g.emissive).multiplyScalar(g.emissiveIntensity),g.map&&(x.map.value=g.map,e(g.map,x.mapTransform)),g.alphaMap&&(x.alphaMap.value=g.alphaMap,e(g.alphaMap,x.alphaMapTransform)),g.bumpMap&&(x.bumpMap.value=g.bumpMap,e(g.bumpMap,x.bumpMapTransform),x.bumpScale.value=g.bumpScale,g.side===en&&(x.bumpScale.value*=-1)),g.normalMap&&(x.normalMap.value=g.normalMap,e(g.normalMap,x.normalMapTransform),x.normalScale.value.copy(g.normalScale),g.side===en&&x.normalScale.value.negate()),g.displacementMap&&(x.displacementMap.value=g.displacementMap,e(g.displacementMap,x.displacementMapTransform),x.displacementScale.value=g.displacementScale,x.displacementBias.value=g.displacementBias),g.emissiveMap&&(x.emissiveMap.value=g.emissiveMap,e(g.emissiveMap,x.emissiveMapTransform)),g.specularMap&&(x.specularMap.value=g.specularMap,e(g.specularMap,x.specularMapTransform)),g.alphaTest>0&&(x.alphaTest.value=g.alphaTest);let w=t.get(g),_=w.envMap,v=w.envMapRotation;_&&(x.envMap.value=_,x.envMapRotation.value.setFromMatrix4(fy.makeRotationFromEuler(v)).transpose(),_.isCubeTexture&&_.isRenderTargetTexture===!1&&x.envMapRotation.value.premultiply(bf),x.reflectivity.value=g.reflectivity,x.ior.value=g.ior,x.refractionRatio.value=g.refractionRatio),g.lightMap&&(x.lightMap.value=g.lightMap,x.lightMapIntensity.value=g.lightMapIntensity,e(g.lightMap,x.lightMapTransform)),g.aoMap&&(x.aoMap.value=g.aoMap,x.aoMapIntensity.value=g.aoMapIntensity,e(g.aoMap,x.aoMapTransform))}function a(x,g){x.diffuse.value.copy(g.color),x.opacity.value=g.opacity,g.map&&(x.map.value=g.map,e(g.map,x.mapTransform))}function o(x,g){x.dashSize.value=g.dashSize,x.totalSize.value=g.dashSize+g.gapSize,x.scale.value=g.scale}function l(x,g,w,_){x.diffuse.value.copy(g.color),x.opacity.value=g.opacity,x.size.value=g.size*w,x.scale.value=_*.5,g.map&&(x.map.value=g.map,e(g.map,x.uvTransform)),g.alphaMap&&(x.alphaMap.value=g.alphaMap,e(g.alphaMap,x.alphaMapTransform)),g.alphaTest>0&&(x.alphaTest.value=g.alphaTest)}function c(x,g){x.diffuse.value.copy(g.color),x.opacity.value=g.opacity,x.rotation.value=g.rotation,g.map&&(x.map.value=g.map,e(g.map,x.mapTransform)),g.alphaMap&&(x.alphaMap.value=g.alphaMap,e(g.alphaMap,x.alphaMapTransform)),g.alphaTest>0&&(x.alphaTest.value=g.alphaTest)}function u(x,g){x.specular.value.copy(g.specular),x.shininess.value=Math.max(g.shininess,1e-4)}function d(x,g){g.gradientMap&&(x.gradientMap.value=g.gradientMap)}function h(x,g){x.metalness.value=g.metalness,g.metalnessMap&&(x.metalnessMap.value=g.metalnessMap,e(g.metalnessMap,x.metalnessMapTransform)),x.roughness.value=g.roughness,g.roughnessMap&&(x.roughnessMap.value=g.roughnessMap,e(g.roughnessMap,x.roughnessMapTransform)),g.envMap&&(x.envMapIntensity.value=g.envMapIntensity)}function f(x,g,w){x.ior.value=g.ior,g.diffuseRoughness>0&&(x.diffuseRoughness.value=g.diffuseRoughness,g.diffuseRoughnessMap&&(x.diffuseRoughnessMap.value=g.diffuseRoughnessMap,e(g.diffuseRoughnessMap,x.diffuseRoughnessMapTransform))),g.sheen>0&&(x.sheenColor.value.copy(g.sheenColor).multiplyScalar(g.sheen),x.sheenRoughness.value=g.sheenRoughness,g.sheenColorMap&&(x.sheenColorMap.value=g.sheenColorMap,e(g.sheenColorMap,x.sheenColorMapTransform)),g.sheenRoughnessMap&&(x.sheenRoughnessMap.value=g.sheenRoughnessMap,e(g.sheenRoughnessMap,x.sheenRoughnessMapTransform))),g.clearcoat>0&&(x.clearcoat.value=g.clearcoat,x.clearcoatRoughness.value=g.clearcoatRoughness,g.clearcoatMap&&(x.clearcoatMap.value=g.clearcoatMap,e(g.clearcoatMap,x.clearcoatMapTransform)),g.clearcoatRoughnessMap&&(x.clearcoatRoughnessMap.value=g.clearcoatRoughnessMap,e(g.clearcoatRoughnessMap,x.clearcoatRoughnessMapTransform)),g.clearcoatNormalMap&&(x.clearcoatNormalMap.value=g.clearcoatNormalMap,e(g.clearcoatNormalMap,x.clearcoatNormalMapTransform),x.clearcoatNormalScale.value.copy(g.clearcoatNormalScale),g.side===en&&x.clearcoatNormalScale.value.negate())),g.dispersion>0&&(x.dispersion.value=g.dispersion),g.retroreflectivity>0&&(x.retroreflectivity.value=g.retroreflectivity),g.iridescence>0&&(x.iridescence.value=g.iridescence,x.iridescenceIOR.value=g.iridescenceIOR,x.iridescenceThicknessMinimum.value=g.iridescenceThicknessMinimum,x.iridescenceThicknessMaximum.value=g.iridescenceThicknessMaximum,g.iridescenceMap&&(x.iridescenceMap.value=g.iridescenceMap,e(g.iridescenceMap,x.iridescenceMapTransform)),g.iridescenceThicknessMap&&(x.iridescenceThicknessMap.value=g.iridescenceThicknessMap,e(g.iridescenceThicknessMap,x.iridescenceThicknessMapTransform))),g.transmission>0&&(x.transmission.value=g.transmission,x.transmissionSamplerMap.value=w.texture,x.transmissionSamplerSize.value.set(w.width,w.height),g.transmissionMap&&(x.transmissionMap.value=g.transmissionMap,e(g.transmissionMap,x.transmissionMapTransform)),x.thickness.value=g.thickness,g.thicknessMap&&(x.thicknessMap.value=g.thicknessMap,e(g.thicknessMap,x.thicknessMapTransform)),x.attenuationDistance.value=g.attenuationDistance,x.attenuationColor.value.copy(g.attenuationColor)),g.anisotropy>0&&(x.anisotropyVector.value.set(g.anisotropy*Math.cos(g.anisotropyRotation),g.anisotropy*Math.sin(g.anisotropyRotation)),g.anisotropyMap&&(x.anisotropyMap.value=g.anisotropyMap,e(g.anisotropyMap,x.anisotropyMapTransform))),x.specularIntensity.value=g.specularIntensity,x.specularColor.value.copy(g.specularColor),g.specularColorMap&&(x.specularColorMap.value=g.specularColorMap,e(g.specularColorMap,x.specularColorMapTransform)),g.specularIntensityMap&&(x.specularIntensityMap.value=g.specularIntensityMap,e(g.specularIntensityMap,x.specularIntensityMapTransform))}function p(x,g){g.matcap&&(x.matcap.value=g.matcap)}function T(x,g){let w=t.get(g).light;x.referencePosition.value.setFromMatrixPosition(w.matrixWorld),x.nearDistance.value=w.shadow.camera.near,x.farDistance.value=w.shadow.camera.far}return{refreshFogUniforms:i,refreshMaterialUniforms:s}}function my(n,t,e,i){let s={},r={};function a(w,_){let v=_.program;i.uniformBlockBinding(w,v,s[w.id])}function o(w,_){let v=s[w.id];v===void 0&&(p(w),v=l(w),s[w.id]=v,w.addEventListener("dispose",x));let R=_.program;i.updateUBOMapping(w,R);let N=t.render.frame;r[w.id]!==N&&(c(w),r[w.id]=N)}function l(w){let _=n.createBuffer(),v=w.__size,R=w.usage;return n.bindBuffer(n.UNIFORM_BUFFER,_),n.bufferData(n.UNIFORM_BUFFER,v,R),n.bindBuffer(n.UNIFORM_BUFFER,null),_}function c(w){let _=s[w.id],v=w.uniforms,R=w.__cache;n.bindBuffer(n.UNIFORM_BUFFER,_);for(let N=0,m=v.length;N<m;N++){let M=v[N];if(Array.isArray(M))for(let L=0,P=M.length;L<P;L++)u(M[L],N,L,R);else u(M,N,0,R)}n.bindBuffer(n.UNIFORM_BUFFER,null)}function u(w,_,v,R){if(h(w,_,v,R)===!0){let N=w.__offset,m=w.value;if(Array.isArray(m)){let M=0;for(let L=0;L<m.length;L++){let P=m[L],B=T(P,!0);d(P,w.__data,M),M+=B.storage/Float32Array.BYTES_PER_ELEMENT}}else d(m,w.__data,0);n.bufferSubData(n.UNIFORM_BUFFER,N,w.__data)}}function d(w,_,v){typeof w=="number"||typeof w=="boolean"?_[v]=w:w.isMatrix3?(_[v]=w.elements[0],_[v+1]=w.elements[1],_[v+2]=w.elements[2],_[v+3]=0,_[v+4]=w.elements[3],_[v+5]=w.elements[4],_[v+6]=w.elements[5],_[v+7]=0,_[v+8]=w.elements[6],_[v+9]=w.elements[7],_[v+10]=w.elements[8],_[v+11]=0):ArrayBuffer.isView(w)?_.set(w.subarray(0,_.length-v),v):w.toArray(_,v)}function h(w,_,v,R){let N=w.value,m=_+"_"+v;if(Array.isArray(N)){R[m]===void 0&&(R[m]=[]);let M=R[m],L=!1;for(let P=0;P<N.length;P++)f(N[P],M,P)===!0&&(L=!0);return L}return f(N,R,m)}function f(w,_,v){if(_[v]===void 0)return typeof w=="number"||typeof w=="boolean"?_[v]=w:ArrayBuffer.isView(w)?_[v]=w.slice():_[v]=w.clone(),!0;{let R=_[v];if(typeof w=="number"||typeof w=="boolean"){if(R!==w)return _[v]=w,!0}else{if(ArrayBuffer.isView(w))return!0;if(R.equals(w)===!1)return R.copy(w),!0}}return!1}function p(w){let _=w.uniforms,v=0,R=16;for(let m=0,M=_.length;m<M;m++){let L=Array.isArray(_[m])?_[m]:[_[m]];for(let P=0,B=L.length;P<B;P++){let C=L[P],O=Array.isArray(C.value)?C.value:[C.value],D=Array.isArray(_[m])||Array.isArray(C.value),E=v;for(let b=0,I=O.length;b<I;b++){let y=O[b],F=T(y,D),S=v%R,U=S%F.boundary,V=S+U;v+=U,V!==0&&R-V<F.storage&&(v+=R-V),b===0&&(E=v),v+=F.storage}let z=C.type==="int"?Int32Array:C.type==="uint"?Uint32Array:Float32Array;C.__data=new z((v-E)/Float32Array.BYTES_PER_ELEMENT),C.__offset=E}}let N=v%R;return N>0&&(v+=R-N),w.__size=v,w.__cache={},this}function T(w,_){let v={boundary:0,storage:0};return typeof w=="number"||typeof w=="boolean"?(v.boundary=4,v.storage=4):w.isVector2?(v.boundary=8,v.storage=8):w.isVector3||w.isColor?(v.boundary=16,v.storage=12):w.isVector4?(v.boundary=16,v.storage=16):w.isMatrix3?(v.boundary=16,v.storage=48):w.isMatrix4?(v.boundary=16,v.storage=64):w.isTexture?Xt("WebGLRenderer: Texture samplers can not be part of an uniforms group."):ArrayBuffer.isView(w)?(v.boundary=16,v.storage=w.byteLength):Xt("WebGLRenderer: Unsupported uniform value type.",w),_===!0&&(v.boundary=16,v.storage=Math.ceil(v.storage/16)*16),v}function x(w){let _=w.target;_.removeEventListener("dispose",x),n.deleteBuffer(s[_.id]),delete s[_.id],delete r[_.id]}function g(){for(let w in s)n.deleteBuffer(s[w]);s={},r={}}return{bind:a,update:o,dispose:g}}var gy=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]),Wn=null;function xy(){return Wn===null&&(Wn=new Ba(gy,16,16,Ai,Nn),Wn.name="DFG_LUT",Wn.minFilter=Qe,Wn.magFilter=Qe,Wn.wrapS=Bn,Wn.wrapT=Bn,Wn.generateMipmaps=!1,Wn.needsUpdate=!0),Wn}var Jo=class{constructor(t={}){let{canvas:e=Ld(),context:i=null,depth:s=!0,stencil:r=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:u="default",failIfMajorPerformanceCaveat:d=!1,reversedDepthBuffer:h=!1,outputBufferType:f=on}=t;this.isWebGLRenderer=!0;let p;if(i!==null){if(typeof WebGLRenderingContext<"u"&&i instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");p=i.getContextAttributes().alpha}else p=a;let T=f,x=new Set([xo,go,mo]),g=new Set([on,Pn,Us,Ki,fo,po]),w=new Uint32Array(4),_=new Int32Array(4),v={textures:[],min:[],max:[],resolution:[]},R=null,N=null,m=[],M=[],L=null;this.domElement=e,this.debug={checkShaderErrors:!0,diagnostics:{keywords:!1},onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=bn,this.toneMappingExposure=1,this.transmissionResolutionScale=1;let P=this,B=!1,C=null,O=null,D=null,E=null;this._outputColorSpace=qe;let z=0,b=0,I=null,y=-1,F=null,S=new Me,U=new Me,V=null,A=new jt(0),q=0,W=e.width,Z=e.height,Y=1,et=null,ft=null,ct=new Me(0,0,W,Z),ut=new Me(0,0,W,Z),_t=!1,nt=new yi,dt=new ka,pt=!1,bt=!1,Rt=new ye,Qt=new J,Gt=new Me,re={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0},ae=!1;function ue(){return I===null?Y:1}let K=i;function Ce(G,$){return e.getContext(G,$)}let ie,me,Tt,Te,Wt,$t,H,k,j,mt,lt,yt,Et,rt,at,Mt,X,ot,st,St,xt,vt,Vt;try{let G={alpha:!0,depth:s,stencil:r,antialias:o,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:u,failIfMajorPerformanceCaveat:d};if("setAttribute"in e&&e.setAttribute("data-engine",`three.js r${"187"}`),e.addEventListener("webglcontextlost",Ht,!1),e.addEventListener("webglcontextrestored",te,!1),e.addEventListener("webglcontextcreationerror",It,!1),K===null){let $="webgl2";if(K=Ce($,G),K===null)throw Ce($)?new Error("THREE.WebGLRenderer: Error creating WebGL context with your selected attributes."):new Error("THREE.WebGLRenderer: Error creating WebGL context.")}ee()}catch(G){throw e.removeEventListener("webglcontextlost",Ht,!1),e.removeEventListener("webglcontextrestored",te,!1),e.removeEventListener("webglcontextcreationerror",It,!1),Yt("WebGLRenderer: "+G.message),G}function ee(){ie=new Cx(K),ie.init(),xt=new hy(K,ie),me=new xx(K,ie,t,xt),Tt=new ly(K,ie),me.reversedDepthBuffer&&h&&Tt.buffers.depth.setReversed(!0),O=K.createFramebuffer(),D=K.createFramebuffer(),E=K.createFramebuffer(),Te=new Px(K),Wt=new $_,$t=new cy(K,ie,Tt,Wt,me,xt,Te),H=new Ax(P),k=new Nm(K),vt=new mx(K,k),j=new Rx(K,k,Te,vt),mt=new Nx(K,j,k,vt,Te),ot=new Lx(K,me,$t),at=new _x(Wt),lt=new Y_(P,H,ie,me,vt,at),yt=new py(P,Wt),Et=new K_,rt=new ny(ie),X=new px(P,H,Tt,mt,p,l),Mt=new oy(P,mt,me),Vt=new my(K,Te,me,Tt),st=new gx(K,ie,Te),St=new Ix(K,ie,Te),Te.programs=lt.programs,P.capabilities=me,P.extensions=ie,P.properties=Wt,P.renderLists=Et,P.shadowMap=Mt,P.state=Tt,P.info=Te}T!==on&&(L=new Ux(T,e.width,e.height,o,s,r));let gt=new Th(P,K);this.xr=gt,this.getContext=function(){return K},this.getContextAttributes=function(){return K.getContextAttributes()},this.forceContextLoss=function(){let G=ie.get("WEBGL_lose_context");G&&G.loseContext()},this.forceContextRestore=function(){let G=ie.get("WEBGL_lose_context");G&&G.restoreContext()},this.getPixelRatio=function(){return Y},this.setPixelRatio=function(G){G!==void 0&&(Y=G,this.setSize(W,Z,!1))},this.getSize=function(G){return G.set(W,Z)},this.setSize=function(G,$,it=!0){if(gt.isPresenting){Xt("WebGLRenderer: Can't change size while VR device is presenting.");return}W=G,Z=$,e.width=Math.floor(G*Y),e.height=Math.floor($*Y),it===!0&&(e.style.width=G+"px",e.style.height=$+"px"),L!==null&&L.setSize(e.width,e.height),this.setViewport(0,0,G,$)},this.getDrawingBufferSize=function(G){return G.set(W*Y,Z*Y).floor()},this.setDrawingBufferSize=function(G,$,it){W=G,Z=$,Y=it,e.width=Math.floor(G*it),e.height=Math.floor($*it),this.setViewport(0,0,G,$)},this.setEffects=function(G){if(T===on){Yt("WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(G){for(let $=0;$<G.length;$++)if(G[$].isOutputPass===!0){Xt("WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}L.setEffects(G||[])},this.getCurrentViewport=function(G){return G.copy(S)},this.getViewport=function(G){return G.copy(ct)},this.setViewport=function(G,$,it,Q){G.isVector4?ct.set(G.x,G.y,G.z,G.w):ct.set(G,$,it,Q),Tt.viewport(S.copy(ct).multiplyScalar(ue()).round())},this.getScissor=function(G){return G.copy(ut)},this.setScissor=function(G,$,it,Q){G.isVector4?ut.set(G.x,G.y,G.z,G.w):ut.set(G,$,it,Q),Tt.scissor(U.copy(ut).multiplyScalar(ue()).round())},this.getScissorTest=function(){return _t},this.setScissorTest=function(G){Tt.setScissorTest(_t=G)},this.setOpaqueSort=function(G){et=G},this.setTransparentSort=function(G){ft=G},this.getClearColor=function(G){return G.copy(X.getClearColor())},this.setClearColor=function(){X.setClearColor(...arguments)},this.getClearAlpha=function(){return X.getClearAlpha()},this.setClearAlpha=function(){X.setClearAlpha(...arguments)},this.clear=function(G=!0,$=!0,it=!0){let Q=0;if(G){let tt=!1;if(I!==null){let At=I.texture.format;tt=x.has(At)}if(tt){let At=I.texture.type,Ft=g.has(At),wt=X.getClearColor(),Lt=X.getClearAlpha(),zt=wt.r,Jt=wt.g,oe=wt.b;Ft?(w[0]=zt,w[1]=Jt,w[2]=oe,w[3]=Lt,K.clearBufferuiv(K.COLOR,0,w)):(_[0]=zt,_[1]=Jt,_[2]=oe,_[3]=Lt,K.clearBufferiv(K.COLOR,0,_))}else Q|=K.COLOR_BUFFER_BIT}$&&(Q|=K.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),it&&(Q|=K.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),Q!==0&&K.clear(Q)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(G){G.setRenderer(this),C=G},this.dispose=function(){e.removeEventListener("webglcontextlost",Ht,!1),e.removeEventListener("webglcontextrestored",te,!1),e.removeEventListener("webglcontextcreationerror",It,!1),X.dispose(),Et.dispose(),rt.dispose(),$t.dispose(),Wt.dispose(),H.dispose(),mt.dispose(),j.dispose(),vt.dispose(),Vt.dispose(),lt.dispose(),gt.dispose(),gt.removeEventListener("sessionstart",Dh),gt.removeEventListener("sessionend",Uh),Ri.stop()};function Ht(G){G.preventDefault(),sh("WebGLRenderer: Context Lost."),B=!0}function te(){sh("WebGLRenderer: Context Restored."),B=!1;let G=Te.autoReset,$=Mt.enabled,it=Mt.autoUpdate,Q=Mt.needsUpdate,tt=Mt.type;ee(),Te.autoReset=G,Mt.enabled=$,Mt.autoUpdate=it,Mt.needsUpdate=Q,Mt.type=tt}function It(G){Yt("WebGLRenderer: A WebGL context could not be created. Reason: ",G.statusMessage)}function pe(G){let $=G.target;$.removeEventListener("dispose",pe),De($)}function De(G){oi(G),Wt.remove(G)}function oi(G){let $=Wt.get(G).programs;$!==void 0&&($.forEach(function(it){lt.releaseProgram(it)}),G.isShaderMaterial&&lt.releaseShaderCache(G))}this.renderBufferDirect=function(G,$,it,Q,tt,At){$===null&&($=re);let Ft=tt.isMesh&&tt.matrixWorld.determinantAffine()<0,wt=jf(G,$,it,Q,tt);Tt.setMaterial(Q,Ft);let Lt=it.index,zt=1;if(Q.wireframe===!0){if(Lt=j.getWireframeAttribute(it),Lt===void 0)return;zt=2}let Jt=it.drawRange,oe=it.attributes.position,Ot=Jt.start*zt,le=(Jt.start+Jt.count)*zt;At!==null&&(Ot=Math.max(Ot,At.start*zt),le=Math.min(le,(At.start+At.count)*zt)),Lt!==null?(Ot=Math.max(Ot,0),le=Math.min(le,Lt.count)):oe!=null&&(Ot=Math.max(Ot,0),le=Math.min(le,oe.count));let Re=le-Ot;if(Re<0||Re===1/0)return;vt.setup(tt,Q,wt,it,Lt);let _e,ge=st;if(Lt!==null&&(_e=k.get(Lt),ge=St,ge.setIndex(_e)),tt.isMesh)Q.wireframe===!0?(Tt.setLineWidth(Q.wireframeLinewidth*ue()),ge.setMode(K.LINES)):ge.setMode(K.TRIANGLES);else if(tt.isLine){let ze=Q.linewidth;ze===void 0&&(ze=1),Tt.setLineWidth(ze*ue()),tt.isLineSegments?ge.setMode(K.LINES):tt.isLineLoop?ge.setMode(K.LINE_LOOP):ge.setMode(K.LINE_STRIP)}else tt.isPoints?ge.setMode(K.POINTS):tt.isSprite&&ge.setMode(K.TRIANGLES);if(tt.isBatchedMesh)if(ie.get("WEBGL_multi_draw"))ge.renderMultiDraw(tt._multiDrawStarts,tt._multiDrawCounts,tt._multiDrawCount);else{let ze=tt._multiDrawStarts,Bt=tt._multiDrawCounts,$e=tt._multiDrawCount,de=Lt?k.get(Lt).bytesPerElement:1,Ii=Wt.get(Q).currentProgram.getUniforms();for(let Ge=0;Ge<$e;Ge++)Ii.setValue(K,"_gl_DrawID",Ge),ge.render(ze[Ge]/de,Bt[Ge])}else if(tt.isInstancedMesh)ge.renderInstances(Ot,Re,tt.count);else if(it.isInstancedBufferGeometry){let ze=it._maxInstanceCount!==void 0?it._maxInstanceCount:1/0,Bt=Math.min(it.instanceCount,ze);ge.renderInstances(Ot,Re,Bt)}else ge.render(Ot,Re)};function Nh(G,$,it,Q){C!==null&&G.isNodeMaterial&&C.setObject(Q,G),pt===!0&&at.setState(G,it,!1),G.transparent===!0&&G.side===Sn&&G.forceSinglePass===!1?(G.side=en,G.needsUpdate=!0,Vs(G,$,Q),G.side=Ei,G.needsUpdate=!0,Vs(G,$,Q),G.side=Sn):Vs(G,$,Q)}this.compile=function(G,$,it=null){it===null&&(it=G),C!==null&&C.renderStart(G,$,it),N=rt.get(it),N.init($),M.push(N),it.traverseVisible(function(tt){tt.isLight&&tt.layers.test($.layers)&&(N.pushLight(tt),tt.castShadow&&N.pushShadow(tt))}),G!==it&&G.traverseVisible(function(tt){tt.isLight&&tt.layers.test($.layers)&&(N.pushLight(tt),tt.castShadow&&N.pushShadow(tt))}),N.setupLights(),C!==null&&C.updateLights(N.state.lightsArray),bt=this.localClippingEnabled,pt=at.init(this.clippingPlanes,bt),pt===!0&&at.setGlobalState(this.clippingPlanes,$),C!==null&&Mt.render(N.state.shadowsArray,it,$);let Q=new Set;return G.traverse(function(tt){if(!(tt.isMesh||tt.isPoints||tt.isLine||tt.isSprite))return;let At=tt.material;if(At)if(Array.isArray(At))for(let Ft=0;Ft<At.length;Ft++){let wt=At[Ft];Nh(wt,it,$,tt),Q.add(wt)}else Nh(At,it,$,tt),Q.add(At)}),N=M.pop(),C!==null&&C.renderEnd(),Q},this.compileAsync=function(G,$,it=null){let Q=this.compile(G,$,it);return new Promise(tt=>{function At(){if(Q.forEach(function(Ft){let Lt=Wt.get(Ft).currentProgram;(Lt===void 0||Lt.isReady())&&Q.delete(Ft)}),Q.size===0){tt(G);return}setTimeout(At,10)}ie.get("KHR_parallel_shader_compile")!==null?At():setTimeout(At,10)})};let ul=null;function Jf(G){ul&&ul(G)}function Dh(){Ri.stop()}function Uh(){Ri.start()}let Ri=new ff;Ri.setAnimationLoop(Jf),typeof self<"u"&&Ri.setContext(self),this.setAnimationLoop=function(G){ul=G,gt.setAnimationLoop(G),G===null?Ri.stop():Ri.start()},gt.addEventListener("sessionstart",Dh),gt.addEventListener("sessionend",Uh),this.render=function(G,$){if($!==void 0&&$.isCamera!==!0){Yt("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(B===!0)return;C!==null&&C.renderStart(G,$);let it=gt.enabled===!0&&gt.isPresenting===!0,Q=L!==null&&(I===null||it)&&L.begin(P,I);if(G.matrixWorldAutoUpdate===!0&&G.updateMatrixWorld(),$.parent===null&&$.matrixWorldAutoUpdate===!0&&$.updateMatrixWorld(),gt.enabled===!0&&gt.isPresenting===!0&&(L===null||L.isCompositing()===!1)&&(gt.cameraAutoUpdate===!0&&gt.updateCamera($),$=gt.getCamera()),G.isScene===!0&&G.onBeforeRender(P,G,$,I),N=rt.get(G,M.length),N.init($),N.state.textureUnits=$t.getTextureUnits(),M.push(N),Rt.multiplyMatrices($.projectionMatrix,$.matrixWorldInverse),$.isArrayCamera?dt.setFromArrayCamera($):nt.setFromProjectionMatrix(Rt,Mn,$.reversedDepth),bt=this.localClippingEnabled,pt=at.init(this.clippingPlanes,bt),R=Et.get(G,m.length),R.init(),m.push(R),this.info.render.frame++,gt.enabled===!0&&gt.isPresenting===!0){let Ft=P.xr.getDepthSensingMesh();Ft!==null&&dl(Ft,$,-1/0,P.sortObjects)}dl(G,$,0,P.sortObjects),R.finish(),C!==null&&C.updateLights(N.state.lightsArray),P.sortObjects===!0&&R.sort(et,ft),ae=gt.enabled===!1||gt.isPresenting===!1||gt.hasDepthSensing()===!1,ae&&X.addToRenderList(R,G),this.info.autoReset===!0&&this.info.reset(),pt===!0&&at.beginShadows();let tt=N.state.shadowsArray;if(Mt.render(tt,G,$),pt===!0&&at.endShadows(),(Q&&L.hasRenderPass())===!1){let Ft=R.opaque,wt=R.transmissive;if(N.setupLights(),$.isArrayCamera){let Lt=$.cameras;if(wt.length>0)for(let zt=0,Jt=Lt.length;zt<Jt;zt++){let oe=Lt[zt];Oh(Ft,wt,G,oe)}ae&&X.render(G);for(let zt=0,Jt=Lt.length;zt<Jt;zt++){let oe=Lt[zt];Fh(R,G,oe,oe.viewport)}}else wt.length>0&&Oh(Ft,wt,G,$),ae&&X.render(G),Fh(R,G,$)}I!==null&&b===0&&($t.updateMultisampleRenderTarget(I),$t.updateRenderTargetMipmap(I)),Q&&L.end(P),G.isScene===!0&&G.onAfterRender(P,G,$),vt.resetDefaultState(),y=-1,F=null,M.pop(),M.length>0?(N=M[M.length-1],$t.setTextureUnits(N.state.textureUnits),pt===!0&&at.setGlobalState(P.clippingPlanes,N.state.camera)):N=null,m.pop(),m.length>0?R=m[m.length-1]:R=null,C!==null&&C.renderEnd()};function dl(G,$,it,Q){if(G.visible===!1)return;if(G.layers.test($.layers)){if(G.isGroup)it=G.renderOrder;else if(G.isLOD)G.autoUpdate===!0&&G.update($);else if(G.isLight)N.pushLight(G),G.castShadow&&N.pushShadow(G);else if(G.isSprite){let Ft=$.isArrayCamera?dt:nt;if(!G.frustumCulled||G.intersectsFrustum(Ft)){Q&&Gt.setFromMatrixPosition(G.matrixWorld).applyMatrix4(Rt);let wt=mt.update(G),Lt=G.material;Lt.visible&&R.push(G,wt,Lt,it,Gt.z,null,$)}}else if(G.isMesh||G.isLine||G.isPoints){let Ft=$.isArrayCamera?dt:nt;if(!G.frustumCulled||G.intersectsFrustum(Ft)){let wt=mt.update(G),Lt=G.material;if(Q&&(G.boundingSphere!==void 0?(G.boundingSphere===null&&G.computeBoundingSphere(),Gt.copy(G.boundingSphere.center)):(wt.boundingSphere===null&&wt.computeBoundingSphere(),Gt.copy(wt.boundingSphere.center)),Gt.applyMatrix4(G.matrixWorld).applyMatrix4(Rt)),Array.isArray(Lt)){let zt=wt.groups;for(let Jt=0,oe=zt.length;Jt<oe;Jt++){let Ot=zt[Jt],le=Lt[Ot.materialIndex];le&&le.visible&&R.push(G,wt,le,it,Gt.z,Ot,$)}}else Lt.visible&&R.push(G,wt,Lt,it,Gt.z,null,$)}}}let At=G.children;for(let Ft=0,wt=At.length;Ft<wt;Ft++)dl(At[Ft],$,it,Q)}function Fh(G,$,it,Q){let{opaque:tt,transmissive:At,transparent:Ft}=G;N.setupLightsView(it),pt===!0&&at.setGlobalState(P.clippingPlanes,it),Q&&Tt.viewport(S.copy(Q)),tt.length>0&&$r(tt,$,it),At.length>0&&$r(At,$,it),Ft.length>0&&$r(Ft,$,it),Tt.buffers.depth.setTest(!0),Tt.buffers.depth.setMask(!0),Tt.buffers.color.setMask(!0),Tt.setPolygonOffset(!1)}function Oh(G,$,it,Q){if((it.isScene===!0?it.overrideMaterial:null)!==null)return;if(N.state.transmissionRenderTarget[Q.id]===void 0){let Ot=ie.has("EXT_color_buffer_half_float")||ie.has("EXT_color_buffer_float");N.state.transmissionRenderTarget[Q.id]=new mn(1,1,{generateMipmaps:!0,type:Ot?Nn:on,minFilter:si,samples:Math.max(4,me.samples),stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,colorSpace:ce.workingColorSpace})}let At=N.state.transmissionRenderTarget[Q.id],Ft=Q.viewport||S;At.setSize(Ft.z*P.transmissionResolutionScale,Ft.w*P.transmissionResolutionScale);let wt=P.getRenderTarget(),Lt=P.getActiveCubeFace(),zt=P.getActiveMipmapLevel();P.setRenderTarget(At),P.getClearColor(A),q=P.getClearAlpha(),q<1&&P.setClearColor(16777215,.5),P.clear(),ae&&X.render(it);let Jt=P.toneMapping;P.toneMapping=bn;let oe=Q.viewport;if(Q.viewport!==void 0&&(Q.viewport=void 0),N.setupLightsView(Q),pt===!0&&at.setGlobalState(P.clippingPlanes,Q),$r(G,it,Q),$t.updateMultisampleRenderTarget(At),$t.updateRenderTargetMipmap(At),ie.has("WEBGL_multisampled_render_to_texture")===!1){let Ot=!1;for(let le=0,Re=$.length;le<Re;le++){let _e=$[le],{object:ge,geometry:ze,material:Bt,group:$e}=_e;if(Bt.side===Sn&&ge.layers.test(Q.layers)){let de=Bt.side;Bt.side=en,Bt.needsUpdate=!0,Bh(ge,it,Q,ze,Bt,$e),Bt.side=de,Bt.needsUpdate=!0,Ot=!0}}Ot===!0&&($t.updateMultisampleRenderTarget(At),$t.updateRenderTargetMipmap(At))}P.setRenderTarget(wt,Lt,zt),P.setClearColor(A,q),oe!==void 0&&(Q.viewport=oe),P.toneMapping=Jt}function $r(G,$,it){let Q=$.isScene===!0?$.overrideMaterial:null;for(let tt=0,At=G.length;tt<At;tt++){let Ft=G[tt],{object:wt,geometry:Lt,group:zt}=Ft,Jt=Ft.material;Jt.allowOverride===!0&&Q!==null&&(Jt=Q),wt.layers.test(it.layers)&&Bh(wt,$,it,Lt,Jt,zt)}}function Bh(G,$,it,Q,tt,At){C!==null&&tt.isNodeMaterial&&C.setObject(G,tt),G.onBeforeRender(P,$,it,Q,tt,At),G.modelViewMatrix.multiplyMatrices(it.matrixWorldInverse,G.matrixWorld),G.normalMatrix.getNormalMatrix(G.modelViewMatrix),tt.onBeforeRender(P,$,it,Q,G,At),tt.transparent===!0&&tt.side===Sn&&tt.forceSinglePass===!1?(tt.side=en,tt.needsUpdate=!0,P.renderBufferDirect(it,$,Q,tt,G,At),tt.side=Ei,tt.needsUpdate=!0,P.renderBufferDirect(it,$,Q,tt,G,At),tt.side=Sn):P.renderBufferDirect(it,$,Q,tt,G,At),G.onAfterRender(P,$,it,Q,tt,At)}function kh(G){let $=0;for(let it of G)it.texture!==null&&$++;return $}function Vs(G,$,it){$.isScene!==!0&&($=re);let Q=Wt.get(G),tt=N.state.lights,At=N.state.shadowsArray,Ft=tt.state.version,wt=lt.getParameters(G,tt.state,At,$,it,N.state.lightProbeGridArray),Lt=lt.getProgramCacheKey(wt),zt=Q.programs;Q.environment=G.isMeshStandardMaterial||G.isMeshLambertMaterial||G.isMeshPhongMaterial?$.environment:null,Q.fog=$.fog;let Jt=G.isMeshStandardMaterial||G.isMeshLambertMaterial&&!G.envMap||G.isMeshPhongMaterial&&!G.envMap;Q.envMap=H.get(G.envMap||Q.environment,Jt),Q.envMapRotation=Q.environment!==null&&G.envMap===null?$.environmentRotation:G.envMapRotation,zt===void 0&&(G.addEventListener("dispose",pe),zt=new Map,Q.programs=zt,Q.programVariants=new Map);let oe=zt.get(Lt);if(oe!==void 0){if(Q.currentProgram===oe&&Q.lightsStateVersion===Ft)return Gh(G,wt),oe}else wt.uniforms=lt.getUniforms(G),C!==null&&G.isNodeMaterial&&C.build(G,it,wt),G.onBeforeCompile(wt,P),oe=lt.acquireProgram(wt,Lt),zt.set(Lt,oe),Q.uniforms=wt.uniforms;let Ot=Q.uniforms;return(!G.isShaderMaterial&&!G.isRawShaderMaterial||G.clipping===!0)&&(Ot.clippingPlanes=at.uniform),Gh(G,wt),Q.needsLights=ep(G),Q.lightsStateVersion=Ft,Q.needsLights&&(Ot.ambientLightColor.value=tt.state.ambient,Ot.lightProbe.value=tt.state.probe,Ot.sunLights.value=tt.state.sun,Ot.sunLightShadows.value=tt.state.sunShadow,Ot.directionalLights.value=tt.state.directional,Ot.directionalLightShadows.value=tt.state.directionalShadow,Ot.spotLights.value=tt.state.spot,Ot.spotLightShadows.value=tt.state.spotShadow,Ot.rectAreaLights.value=tt.state.rectArea,Ot.ltc_1.value=tt.state.rectAreaLTC1,Ot.ltc_2.value=tt.state.rectAreaLTC2,Ot.pointLights.value=tt.state.point,Ot.pointLightShadows.value=tt.state.pointShadow,Ot.hemisphereLights.value=tt.state.hemi,Ot.sunShadowMatrix.value=tt.state.sunShadowMatrix,Ot.sunShadowCascade.value=tt.state.sunShadowCascade,Ot.directionalShadowMatrix.value=tt.state.directionalShadowMatrix,Ot.spotLightMatrix.value=tt.state.spotLightMatrix,Ot.spotLightMap.value=tt.state.spotLightMap,Ot.pointShadowMatrix.value=tt.state.pointShadowMatrix),Q.numLightProbeGrids=kh(N.state.lightProbeGridArray),Q.currentProgram=oe,Q.uniformsList=null,oe}function Qf(G,$,it,Q,tt){let At=Wt.get(G),Ft=At.currentProgram.id+","+Q+","+tt,wt=At.programVariants.get(Ft);return wt===void 0?(wt=Vs(G,$,it),At.programVariants.set(Ft,wt)):(At.currentProgram=wt,At.uniformsList=null,At.outputColorSpace=Q,At.toneMapping=tt),wt}function zh(G){if(G.uniformsList===null){let $=G.currentProgram.getUniforms();G.uniformsList=Os.seqWithValue($.seq,G.uniforms)}return G.uniformsList}function Gh(G,$){let it=Wt.get(G);it.outputColorSpace=$.outputColorSpace,it.batching=$.batching,it.batchingColor=$.batchingColor,it.instancing=$.instancing,it.instancingColor=$.instancingColor,it.instancingMorph=$.instancingMorph,it.skinning=$.skinning,it.morphTargets=$.morphTargets,it.morphNormals=$.morphNormals,it.morphColors=$.morphColors,it.morphTargetsCount=$.morphTargetsCount,it.numClippingPlanes=$.numClippingPlanes,it.numIntersection=$.numClipIntersection,it.vertexAlphas=$.vertexAlphas,it.vertexTangents=$.vertexTangents,it.toneMapping=$.toneMapping}function jf(G,$,it,Q,tt){$.isScene!==!0&&($=re),$t.resetTextureUnits();let At=$.fog,Ft=Q.isMeshStandardMaterial||Q.isMeshLambertMaterial||Q.isMeshPhongMaterial?$.environment:null,wt=I===null?P.outputColorSpace:I.isXRRenderTarget===!0?I.texture.colorSpace:ce.workingColorSpace,Lt=Q.isMeshStandardMaterial||Q.isMeshLambertMaterial&&!Q.envMap||Q.isMeshPhongMaterial&&!Q.envMap,zt=H.get(Q.envMap||Ft,Lt),Jt=Q.vertexColors===!0&&!!it.attributes.color&&it.attributes.color.itemSize===4,oe=!!it.attributes.tangent&&(!!Q.normalMap||Q.anisotropy>0),Ot=!!it.morphAttributes.position,le=!!it.morphAttributes.normal,Re=!!it.morphAttributes.color,_e=bn;Q.toneMapped&&(I===null||I.isXRRenderTarget===!0)&&(_e=P.toneMapping);let ge=it.morphAttributes.position||it.morphAttributes.normal||it.morphAttributes.color,ze=ge!==void 0?ge.length:0,Bt=Wt.get(Q),$e=N.state.lights;if(pt===!0&&(bt===!0||G!==F)){let Se=G===F&&Q.id===y;at.setState(Q,G,Se)}let de=!1,Ii=!1;Q.version===Bt.__version?Bt.needsLights&&Bt.lightsStateVersion!==$e.state.version||tt.isBatchedMesh&&Bt.batching===!1||!tt.isBatchedMesh&&Bt.batching===!0||tt.isBatchedMesh&&Bt.batchingColor===!0&&tt._colorsTexture===null||tt.isBatchedMesh&&Bt.batchingColor===!1&&tt._colorsTexture!==null||tt.isInstancedMesh&&Bt.instancing===!1||!tt.isInstancedMesh&&Bt.instancing===!0||tt.isSkinnedMesh&&Bt.skinning===!1||!tt.isSkinnedMesh&&Bt.skinning===!0||tt.isInstancedMesh&&Bt.instancingColor===!0&&tt.instanceColor===null||tt.isInstancedMesh&&Bt.instancingColor===!1&&tt.instanceColor!==null||tt.isInstancedMesh&&Bt.instancingMorph===!0&&tt.morphTexture===null||tt.isInstancedMesh&&Bt.instancingMorph===!1&&tt.morphTexture!==null||Bt.envMap!==zt||Q.fog===!0&&Bt.fog!==At||Bt.numClippingPlanes!==void 0&&(Bt.numClippingPlanes!==at.numPlanes||Bt.numIntersection!==at.numIntersection)||Bt.vertexAlphas!==Jt||Bt.vertexTangents!==oe||Bt.morphTargets!==Ot||Bt.morphNormals!==le||Bt.morphColors!==Re||Bt.morphTargetsCount!==ze||Bt.numLightProbeGrids!==kh(N.state.lightProbeGridArray)?de=!0:(Bt.outputColorSpace!==wt||Bt.toneMapping!==_e)&&(Ii=!0):(de=!0,Bt.__version=Q.version);let Ge=Bt.currentProgram;(de===!0||Ii===!0)&&(Ge=Ii===!0?Qf(Q,$,tt,wt,_e):Vs(Q,$,tt),C&&Q.isNodeMaterial&&C.onUpdateProgram(Q,Ge,Bt));let Zr=!1,li=!1,Pi=!1,he=Ge.getUniforms(),Be=Bt.uniforms;if(Tt.useProgram(Ge.program)&&(Zr=!0,li=!0,Pi=!0),Q.id!==y&&(y=Q.id,li=!0),Zr||F!==G){Tt.buffers.depth.getReversed()&&G.reversedDepth!==!0&&(G._reversedDepth=!0,G.updateProjectionMatrix()),he.setValue(K,"projectionMatrix",G.projectionMatrix),he.setValue(K,"viewMatrix",G.matrixWorldInverse);let Ue=he.map.cameraPosition;Ue!==void 0&&Ue.setValue(K,Qt.setFromMatrixPosition(G.matrixWorld)),me.logarithmicDepthBuffer&&he.setValue(K,"logDepthBufFC",2/(Math.log(G.far+1)/Math.LN2)),(Q.isMeshPhongMaterial||Q.isMeshToonMaterial||Q.isMeshLambertMaterial||Q.isMeshBasicMaterial||Q.isMeshStandardMaterial||Q.isShaderMaterial)&&he.setValue(K,"isOrthographic",G.isOrthographicCamera===!0),F!==G&&(F=G,li=!0,Pi=!0)}if(Bt.needsLights&&($e.state.sunShadowMap.length>0&&he.setValue(K,"sunShadowMap",$e.state.sunShadowMap,$t),$e.state.directionalShadowMap.length>0&&he.setValue(K,"directionalShadowMap",$e.state.directionalShadowMap,$t),$e.state.spotShadowMap.length>0&&he.setValue(K,"spotShadowMap",$e.state.spotShadowMap,$t),$e.state.pointShadowMap.length>0&&he.setValue(K,"pointShadowMap",$e.state.pointShadowMap,$t)),tt.isSkinnedMesh){he.setOptional(K,tt,"bindMatrix"),he.setOptional(K,tt,"bindMatrixInverse");let Se=tt.skeleton;Se&&(Se.boneTexture===null&&Se.computeBoneTexture(),he.setValue(K,"boneTexture",Se.boneTexture,$t))}tt.isBatchedMesh&&(he.setOptional(K,tt,"batchingTexture"),he.setValue(K,"batchingTexture",tt._matricesTexture,$t),he.setOptional(K,tt,"batchingIdTexture"),he.setValue(K,"batchingIdTexture",tt._indirectTexture,$t),he.setOptional(K,tt,"batchingColorTexture"),tt._colorsTexture!==null&&he.setValue(K,"batchingColorTexture",tt._colorsTexture,$t));let Tn=it.morphAttributes;if((Tn.position!==void 0||Tn.normal!==void 0||Tn.color!==void 0)&&ot.update(tt,it,Ge),(li||Bt.receiveShadow!==tt.receiveShadow)&&(Bt.receiveShadow=tt.receiveShadow,he.setValue(K,"receiveShadow",tt.receiveShadow)),(Q.isMeshStandardMaterial||Q.isMeshLambertMaterial||Q.isMeshPhongMaterial)&&Q.envMap===null&&$.environment!==null&&(Be.envMapIntensity.value=$.environmentIntensity),Be.dfgLUT!==void 0&&(Be.dfgLUT.value=xy()),li){if(he.setValue(K,"toneMappingExposure",P.toneMappingExposure),Bt.needsLights&&tp(Be,Pi),At&&Q.fog===!0&&yt.refreshFogUniforms(Be,At),yt.refreshMaterialUniforms(Be,Q,Y,Z,N.state.transmissionRenderTarget[G.id]),Bt.needsLights&&Bt.numLightProbeGrids>0){let Se=v,Ue=0;for(let Yn of N.state.lightProbeGridArray)Yn.texture!==null&&(Se.textures[Ue]=Yn.texture,Se.min[Ue]=Yn.boundingBox.min,Se.max[Ue]=Yn.boundingBox.max,Se.resolution[Ue]=Yn.resolution,Ue++);for(let Yn in Se)Se[Yn].length=Ue;Be.probesSH.value=Se.textures,Be.probesMin.value=Se.min,Be.probesMax.value=Se.max,Be.probesResolution.value=Se.resolution}Os.upload(K,zh(Bt),Be,$t)}if(Q.isShaderMaterial&&Q.uniformsNeedUpdate===!0&&(Os.upload(K,zh(Bt),Be,$t),Q.uniformsNeedUpdate=!1),Q.isSpriteMaterial&&he.setValue(K,"center",tt.center),he.setValue(K,"modelViewMatrix",tt.modelViewMatrix),he.setValue(K,"normalMatrix",tt.normalMatrix),he.setValue(K,"modelMatrix",tt.matrixWorld),Q.uniformsGroups!==void 0){let Se=Q.uniformsGroups;for(let Ue=0,Yn=Se.length;Ue<Yn;Ue++){let Hh=Se[Ue];Vt.update(Hh,Ge),Vt.bind(Hh,Ge)}}return Ge}function tp(G,$){G.ambientLightColor.needsUpdate=$,G.lightProbe.needsUpdate=$,G.sunLights.needsUpdate=$,G.sunLightShadows.needsUpdate=$,G.directionalLights.needsUpdate=$,G.directionalLightShadows.needsUpdate=$,G.pointLights.needsUpdate=$,G.pointLightShadows.needsUpdate=$,G.spotLights.needsUpdate=$,G.spotLightShadows.needsUpdate=$,G.rectAreaLights.needsUpdate=$,G.hemisphereLights.needsUpdate=$}function ep(G){return G.isMeshLambertMaterial||G.isMeshToonMaterial||G.isMeshPhongMaterial||G.isMeshStandardMaterial||G.isShadowMaterial||G.isShaderMaterial&&G.lights===!0}this.getActiveCubeFace=function(){return z},this.getActiveMipmapLevel=function(){return b},this.getRenderTarget=function(){return I},this.setRenderTargetTextures=function(G,$,it){let Q=Wt.get(G);Q.__autoAllocateDepthBuffer=G.resolveDepthBuffer===!1,Q.__autoAllocateDepthBuffer===!1&&(Q.__useRenderToTexture=!1),Wt.get(G.texture).__webglTexture=$,Wt.get(G.depthTexture).__webglTexture=Q.__autoAllocateDepthBuffer?void 0:it,Q.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(G,$){let it=Wt.get(G);it.__webglFramebuffer=$,it.__useDefaultFramebuffer=$===void 0},this.setRenderTarget=function(G,$=0,it=0){I=G,z=$,b=it;let Q=null,tt=!1,At=!1;if(G){let wt=Wt.get(G);if(wt.__useDefaultFramebuffer!==void 0){Tt.bindFramebuffer(K.FRAMEBUFFER,wt.__webglFramebuffer),S.copy(G.viewport),U.copy(G.scissor),V=G.scissorTest,Tt.viewport(S),Tt.scissor(U),Tt.setScissorTest(V),y=-1;return}else if(wt.__webglFramebuffer===void 0)$t.setupRenderTarget(G);else if(wt.__hasExternalTextures)$t.rebindTextures(G,Wt.get(G.texture).__webglTexture,Wt.get(G.depthTexture).__webglTexture);else if(G.depthBuffer){let Jt=G.depthTexture;if(wt.__boundDepthTexture!==Jt){if(Jt!==null&&Wt.has(Jt)&&(G.width!==Jt.image.width||G.height!==Jt.image.height))throw new Error("THREE.WebGLRenderer: Attached DepthTexture is initialized to the incorrect size.");$t.setupDepthRenderbuffer(G)}}let Lt=G.texture;(Lt.isData3DTexture||Lt.isDataArrayTexture||Lt.isCompressedArrayTexture)&&(At=!0);let zt=Wt.get(G).__webglFramebuffer;G.isWebGLCubeRenderTarget?(Array.isArray(zt[$])?Q=zt[$][it]:Q=zt[$],tt=!0):G.samples>0&&$t.useMultisampledRTT(G)===!1?Q=Wt.get(G).__webglMultisampledFramebuffer:Array.isArray(zt)?Q=zt[it]:Q=zt,S.copy(G.viewport),U.copy(G.scissor),V=G.scissorTest}else S.copy(ct).multiplyScalar(Y).floor(),U.copy(ut).multiplyScalar(Y).floor(),V=_t;if(it!==0&&(Q=O),Tt.bindFramebuffer(K.FRAMEBUFFER,Q)&&Tt.drawBuffers(G,Q),Tt.viewport(S),Tt.scissor(U),Tt.setScissorTest(V),tt){let wt=Wt.get(G.texture);K.framebufferTexture2D(K.FRAMEBUFFER,K.COLOR_ATTACHMENT0,K.TEXTURE_CUBE_MAP_POSITIVE_X+$,wt.__webglTexture,it)}else if(At){let wt=$;for(let Lt=0;Lt<G.textures.length;Lt++){let zt=Wt.get(G.textures[Lt]);K.framebufferTextureLayer(K.FRAMEBUFFER,K.COLOR_ATTACHMENT0+Lt,zt.__webglTexture,it,wt)}}else if(G!==null&&it!==0){let wt=Wt.get(G.texture);K.framebufferTexture2D(K.FRAMEBUFFER,K.COLOR_ATTACHMENT0,K.TEXTURE_2D,wt.__webglTexture,it)}y=-1};function Vh(G){let $=Wt.get(G);return($.__readFormat!==G.format||$.__readType!==G.type)&&($.__readFormat=G.format,$.__readType=G.type,$.__formatReadable=me.textureFormatReadable(G.format),$.__typeReadable=me.textureTypeReadable(G.type)),$}this.readRenderTargetPixels=function(G,$,it,Q,tt,At,Ft,wt=0){if(!(G&&G.isWebGLRenderTarget)){Yt("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Lt=Wt.get(G).__webglFramebuffer;if(G.isWebGLCubeRenderTarget&&Ft!==void 0&&(Lt=Lt[Ft],Array.isArray(Lt)&&(Lt=Lt[0])),Lt){Tt.bindFramebuffer(K.FRAMEBUFFER,Lt);try{let zt=G.textures[wt],Jt=zt.format,oe=zt.type;G.textures.length>1&&K.readBuffer(K.COLOR_ATTACHMENT0+wt);let Ot=Vh(zt);if(Ot.__formatReadable===!1){Yt("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(Ot.__typeReadable===!1){Yt("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}$>=0&&$<=G.width-Q&&it>=0&&it<=G.height-tt&&K.readPixels($,it,Q,tt,xt.convert(Jt),xt.convert(oe),At)}finally{let zt=I!==null?Wt.get(I).__webglFramebuffer:null;Tt.bindFramebuffer(K.FRAMEBUFFER,zt)}}},this.readRenderTargetPixelsAsync=async function(G,$,it,Q,tt,At,Ft,wt=0){if(!(G&&G.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Lt=Wt.get(G).__webglFramebuffer;if(G.isWebGLCubeRenderTarget&&Ft!==void 0&&(Lt=Lt[Ft],Array.isArray(Lt)&&(Lt=Lt[0])),Lt)if($>=0&&$<=G.width-Q&&it>=0&&it<=G.height-tt){Tt.bindFramebuffer(K.FRAMEBUFFER,Lt);let zt=G.textures[wt],Jt=zt.format,oe=zt.type;G.textures.length>1&&K.readBuffer(K.COLOR_ATTACHMENT0+wt);let Ot=Vh(zt);if(Ot.__formatReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(Ot.__typeReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");let le=K.createBuffer();K.bindBuffer(K.PIXEL_PACK_BUFFER,le),K.bufferData(K.PIXEL_PACK_BUFFER,At.byteLength,K.STREAM_READ),K.readPixels($,it,Q,tt,xt.convert(Jt),xt.convert(oe),0),K.bindBuffer(K.PIXEL_PACK_BUFFER,null);let Re=I!==null?Wt.get(I).__webglFramebuffer:null;Tt.bindFramebuffer(K.FRAMEBUFFER,Re);let _e=K.fenceSync(K.SYNC_GPU_COMMANDS_COMPLETE,0);return K.flush(),await Dd(K,_e,4),K.bindBuffer(K.PIXEL_PACK_BUFFER,le),K.getBufferSubData(K.PIXEL_PACK_BUFFER,0,At),K.bindBuffer(K.PIXEL_PACK_BUFFER,null),K.deleteBuffer(le),K.deleteSync(_e),At}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(G,$=null,it=0){let Q=Math.pow(2,-it),tt=Math.floor(G.image.width*Q),At=Math.floor(G.image.height*Q),Ft=$!==null?$.x:0,wt=$!==null?$.y:0;$t.setTexture2D(G,0),K.copyTexSubImage2D(K.TEXTURE_2D,it,0,0,Ft,wt,tt,At),Tt.unbindTexture()},this.copyTextureToTexture=function(G,$,it=null,Q=null,tt=0,At=0){let Ft,wt,Lt,zt,Jt,oe,Ot,le,Re,_e=G.isCompressedTexture?G.mipmaps[At]:G.image;if(it!==null)Ft=it.max.x-it.min.x,wt=it.max.y-it.min.y,Lt=it.isBox3?it.max.z-it.min.z:1,zt=it.min.x,Jt=it.min.y,oe=it.isBox3?it.min.z:0;else{let he=Math.pow(2,-tt);Ft=Math.floor(_e.width*he),wt=Math.floor(_e.height*he),G.isDataArrayTexture?Lt=_e.depth:G.isData3DTexture?Lt=Math.floor(_e.depth*he):Lt=1,zt=0,Jt=0,oe=0}Q!==null?(Ot=Q.x,le=Q.y,Re=Q.z):(Ot=0,le=0,Re=0);let ge=xt.convert($.format),ze=xt.convert($.type),Bt;$.isData3DTexture?($t.setTexture3D($,0),Bt=K.TEXTURE_3D):$.isDataArrayTexture||$.isCompressedArrayTexture?($t.setTexture2DArray($,0),Bt=K.TEXTURE_2D_ARRAY):($t.setTexture2D($,0),Bt=K.TEXTURE_2D),Tt.activeTexture(K.TEXTURE0),Tt.pixelStorei(K.UNPACK_FLIP_Y_WEBGL,$.flipY),Tt.pixelStorei(K.UNPACK_PREMULTIPLY_ALPHA_WEBGL,$.premultiplyAlpha),Tt.pixelStorei(K.UNPACK_ALIGNMENT,$.unpackAlignment);let $e=Tt.getParameter(K.UNPACK_ROW_LENGTH),de=Tt.getParameter(K.UNPACK_IMAGE_HEIGHT),Ii=Tt.getParameter(K.UNPACK_SKIP_PIXELS),Ge=Tt.getParameter(K.UNPACK_SKIP_ROWS),Zr=Tt.getParameter(K.UNPACK_SKIP_IMAGES);Tt.pixelStorei(K.UNPACK_ROW_LENGTH,_e.width),Tt.pixelStorei(K.UNPACK_IMAGE_HEIGHT,_e.height),Tt.pixelStorei(K.UNPACK_SKIP_PIXELS,zt),Tt.pixelStorei(K.UNPACK_SKIP_ROWS,Jt),Tt.pixelStorei(K.UNPACK_SKIP_IMAGES,oe);let li=G.isDataArrayTexture||G.isData3DTexture,Pi=$.isDataArrayTexture||$.isData3DTexture;if(G.isDepthTexture){let he=Wt.get(G),Be=Wt.get($),Tn=Wt.get(he.__renderTarget),Se=Wt.get(Be.__renderTarget);Tt.bindFramebuffer(K.READ_FRAMEBUFFER,Tn.__webglFramebuffer),Tt.bindFramebuffer(K.DRAW_FRAMEBUFFER,Se.__webglFramebuffer);for(let Ue=0;Ue<Lt;Ue++)li&&(K.framebufferTextureLayer(K.READ_FRAMEBUFFER,K.COLOR_ATTACHMENT0,Wt.get(G).__webglTexture,tt,oe+Ue),K.framebufferTextureLayer(K.DRAW_FRAMEBUFFER,K.COLOR_ATTACHMENT0,Wt.get($).__webglTexture,At,Re+Ue)),K.blitFramebuffer(zt,Jt,zt+Ft,Jt+wt,Ot,le,Ot+Ft,le+wt,K.DEPTH_BUFFER_BIT,K.NEAREST);Tt.bindFramebuffer(K.READ_FRAMEBUFFER,null),Tt.bindFramebuffer(K.DRAW_FRAMEBUFFER,null)}else if(tt!==0||G.isRenderTargetTexture||Wt.has(G)){let he=Wt.get(G),Be=Wt.get($);Tt.bindFramebuffer(K.READ_FRAMEBUFFER,D),Tt.bindFramebuffer(K.DRAW_FRAMEBUFFER,E);for(let Tn=0;Tn<Lt;Tn++)li?K.framebufferTextureLayer(K.READ_FRAMEBUFFER,K.COLOR_ATTACHMENT0,he.__webglTexture,tt,oe+Tn):K.framebufferTexture2D(K.READ_FRAMEBUFFER,K.COLOR_ATTACHMENT0,K.TEXTURE_2D,he.__webglTexture,tt),Pi?K.framebufferTextureLayer(K.DRAW_FRAMEBUFFER,K.COLOR_ATTACHMENT0,Be.__webglTexture,At,Re+Tn):K.framebufferTexture2D(K.DRAW_FRAMEBUFFER,K.COLOR_ATTACHMENT0,K.TEXTURE_2D,Be.__webglTexture,At),tt!==0?K.blitFramebuffer(zt,Jt,zt+Ft,Jt+wt,Ot,le,Ot+Ft,le+wt,K.COLOR_BUFFER_BIT,K.NEAREST):Pi?K.copyTexSubImage3D(Bt,At,Ot,le,Re+Tn,zt,Jt,Ft,wt):K.copyTexSubImage2D(Bt,At,Ot,le,zt,Jt,Ft,wt);Tt.bindFramebuffer(K.READ_FRAMEBUFFER,null),Tt.bindFramebuffer(K.DRAW_FRAMEBUFFER,null)}else Pi?G.isDataTexture||G.isData3DTexture?K.texSubImage3D(Bt,At,Ot,le,Re,Ft,wt,Lt,ge,ze,_e.data):$.isCompressedArrayTexture?K.compressedTexSubImage3D(Bt,At,Ot,le,Re,Ft,wt,Lt,ge,_e.data):K.texSubImage3D(Bt,At,Ot,le,Re,Ft,wt,Lt,ge,ze,_e):G.isDataTexture?K.texSubImage2D(K.TEXTURE_2D,At,Ot,le,Ft,wt,ge,ze,_e.data):G.isCompressedTexture?K.compressedTexSubImage2D(K.TEXTURE_2D,At,Ot,le,_e.width,_e.height,ge,_e.data):K.texSubImage2D(K.TEXTURE_2D,At,Ot,le,Ft,wt,ge,ze,_e);Tt.pixelStorei(K.UNPACK_ROW_LENGTH,$e),Tt.pixelStorei(K.UNPACK_IMAGE_HEIGHT,de),Tt.pixelStorei(K.UNPACK_SKIP_PIXELS,Ii),Tt.pixelStorei(K.UNPACK_SKIP_ROWS,Ge),Tt.pixelStorei(K.UNPACK_SKIP_IMAGES,Zr),At===0&&$.generateMipmaps===!0&&$.mipmapsAutoUpdate===!0&&K.generateMipmap(Bt),Tt.unbindTexture()},this.initRenderTarget=function(G){Wt.get(G).__webglFramebuffer===void 0&&$t.setupRenderTarget(G)},this.initTexture=function(G){G.isCubeTexture?$t.setTextureCube(G,0):G.isData3DTexture?$t.setTexture3D(G,0):G.isDataArrayTexture||G.isCompressedArrayTexture?$t.setTexture2DArray(G,0):$t.setTexture2D(G,0),Tt.unbindTexture()},this.resetState=function(){z=0,b=0,I=null,Tt.reset(),vt.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Mn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;let e=this.getContext();e.drawingBufferColorSpace=ce._getDrawingBufferColorSpace(t),e.unpackColorSpace=ce._getUnpackColorSpace()}};var Nt=1e3,Eh=null;function Tf(n){Eh=n}function qr(n,t,e,i,{font:s="400 90px Fraunces",fill:r="#111",align:a="left",spacing:o=0,base:l="alphabetic"}={}){n.save(),n.font=s,n.fillStyle=r,n.textAlign=a,n.textBaseline=l,"letterSpacing"in n&&(n.letterSpacing=`${o}px`),n.fillText(t,e,i),n.restore()}var wf=(n,t,e,i,s,r="left")=>qr(n,t,i,s,{font:'500 19px "DM Mono"',fill:e,align:r,spacing:2});function Ae(n,t){n.fillStyle=t,n.fillRect(0,0,Nt,Nt)}function yy(n,t,e,i,s,r){n.fillStyle=r,n.beginPath(),n.arc(e,i,s,0,ht),n.fill();let a=5+s*.5;for(let o=0;o<a;o++){let l=t()*ht,c=s*(1+t()*t()*3.6),u=s*.22*t();n.beginPath(),n.arc(e+Math.cos(l)*c,i+Math.sin(l)*c,u,0,ht),n.fill()}}var vy={"drip-feed"(n,t){Ae(n,"#f3eee3");let e=["#16130f","#e8452d","#1f4fd8","#f2b705"];for(let i=0;i<16;i++){let s=e[i%4],r=t()*Nt,a=t()*Nt,o=t()*ht;n.strokeStyle=s,n.fillStyle=s;for(let l=0;l<90;l++){o+=(t()-.5)*.9;let c=r+Math.cos(o)*26,u=a+Math.sin(o)*26;n.lineWidth=1+Math.pow(t(),3)*12,n.lineCap="round",n.beginPath(),n.moveTo(r,a),n.lineTo(c,u),n.stroke(),t()<.14&&yy(n,t,c,u,3+t()*11,s),r=c,a=u,(r<-60||r>Nt+60)&&(o=Math.PI-o),(a<-60||a>Nt+60)&&(o=-o)}}},"golden-repair"(n,t){let e=n.createLinearGradient(0,0,0,Nt);e.addColorStop(0,"#d9cfbb"),e.addColorStop(1,"#b9ab90"),Ae(n,e);let i=500,s=500,r=390;n.save(),n.shadowColor="rgba(40,25,10,.55)",n.shadowBlur=70,n.shadowOffsetY=40,n.fillStyle="#1e1a1d",n.beginPath(),n.arc(i,s,r,0,ht),n.fill(),n.restore();let a=n.createRadialGradient(i-90,s-110,20,i,s,r);a.addColorStop(0,"#5b3a2c"),a.addColorStop(.55,"#2a1b1e"),a.addColorStop(.92,"#100d10"),a.addColorStop(1,"#6a4a34"),n.fillStyle=a,n.beginPath(),n.arc(i,s,r,0,ht),n.fill(),n.save(),n.beginPath(),n.arc(i,s,r,0,ht),n.clip();let o=(l,c,u,d,h)=>{n.beginPath(),n.moveTo(l,c);for(let p=0;p<d;p++)u+=(t()-.5)*.95,l+=Math.cos(u)*36,c+=Math.sin(u)*36,n.lineTo(l,c),t()<.2&&h>3&&(n.stroke(),o(l,c,u+(t()-.5)*2,d-p-2,h*.6),n.beginPath(),n.moveTo(l,c));let f=n.createLinearGradient(i-r,s-r,i+r,s+r);f.addColorStop(0,"#fff0a8"),f.addColorStop(.5,"#d9a226"),f.addColorStop(1,"#fbe07a"),n.strokeStyle=f,n.lineWidth=h,n.lineJoin="round",n.stroke()};for(let l=0;l<6;l++){let c=l/6*ht+t();o(i+Math.cos(c)*26,s+Math.sin(c)*26,c,12,7)}n.restore()},sediment(n,t){let e=Ze(9),i=["#e9d9b5","#c7562e","#efb54a","#2e6f8e","#f2e7d0","#7a3e2c","#e58a3a","#264653"],s=Dt(250,250),r=s.getContext("2d"),a=r.createImageData(250,250);for(let o=0;o<250;o++)for(let l=0;l<250;l++){let c=o+(e(l*.022,4)-.5)*110+(e(l*.09,9)-.5)*22,u=i[Ut(Math.floor((c+40)/41),0,7)],[d,h,f]=hn(u),p=(t()-.5)*44,T=(o*250+l)*4;a.data[T]=d+p,a.data[T+1]=h+p,a.data[T+2]=f+p,a.data[T+3]=255}r.putImageData(a,0,0),n.imageSmoothingEnabled=!1,n.drawImage(s,0,0,Nt,Nt),n.imageSmoothingEnabled=!0},endpaper(n){let t=Ze(5),e=400,i=Dt(e,e),s=i.getContext("2d"),r=s.createImageData(e,e),a=[[244,236,220],[28,66,92],[184,74,48],[224,170,70],[58,122,140],[20,32,48]];for(let o=0;o<e;o++)for(let l=0;l<e;l++){let c=l/e,u=o/e,d=Math.sin(u*44)*.03,h=c+(t(c*3,u*3)-.5)*.5+d,f=u+(t(c*3+7,u*3+3)-.5)*.5;h+=(t(h*9,f*9)-.5)*.09;let p=Math.floor((h*6.5+Math.sin(f*7)*1.1+8)*2.4),T=a[(p%6+6)%6],x=(o*e+l)*4;r.data[x]=T[0],r.data[x+1]=T[1],r.data[x+2]=T[2],r.data[x+3]=255}s.putImageData(r,0,0),n.drawImage(i,0,0,Nt,Nt)},"steamed-up"(n,t){let e=n.createLinearGradient(0,0,0,Nt);e.addColorStop(0,"#0a1626"),e.addColorStop(.6,"#16314f"),e.addColorStop(1,"#2a1f3a"),Ae(n,e);let i=()=>{for(let o=0;o<90;o++){let l=["#ffb347","#ff5e62","#7ad7f0","#fff3c4"][o%4],c=t()*Nt,u=300+t()*620,d=12+t()*54;n.globalAlpha=.25+t()*.5,n.fillStyle=l,n.beginPath(),n.arc(c,u,d,0,ht),n.fill()}n.globalAlpha=1};n.save(),i(),n.restore(),n.fillStyle="rgba(210,225,240,.62)",n.fillRect(0,0,Nt,Nt);let s=Dt(Nt,Nt),r=s.getContext("2d");r.font="600 300px Caveat",r.textAlign="center",r.lineJoin="round",r.strokeStyle="#000",r.lineWidth=16,r.strokeText("steamed",490,430),r.strokeText("up",500,690),r.globalCompositeOperation="source-in";let a=r.createLinearGradient(0,0,0,Nt);a.addColorStop(0,"#071222"),a.addColorStop(1,"#23375a"),r.fillStyle=a,r.fillRect(0,0,Nt,Nt),n.drawImage(s,0,0),n.strokeStyle="rgba(7,18,34,.7)",n.lineCap="round";for(let o=0;o<9;o++){let l=120+t()*760,c=500+t()*200;n.lineWidth=3+t()*6,n.beginPath(),n.moveTo(l,c),n.lineTo(l+(t()-.5)*18,c+120+t()*240),n.stroke()}},"hall-of-mirrors"(n,t){Ae(n,"#07050f"),n.save(),n.translate(500,500),n.globalCompositeOperation="lighter";let e=12;for(let i=0;i<7;i++){let s=250+i*28,r=70+i*56;for(let a=0;a<e;a++){n.save(),n.rotate(a/e*ht);for(let o of[1,-1])n.save(),n.scale(1,o),n.strokeStyle=`hsla(${s},95%,62%,.5)`,n.lineWidth=3+i*.5,n.shadowColor=`hsl(${s},100%,60%)`,n.shadowBlur=24,n.beginPath(),n.moveTo(r*.3,0),n.bezierCurveTo(r*.7,r*.5,r*1.1,r*.25,r*1.25,0),n.stroke(),n.restore();n.restore()}}n.restore()},"wallpaper-group"(n){Ae(n,"#123c30");let t=125,e=t*Math.sqrt(3)/2;for(let i=-1;i<12;i++)for(let s=-1;s<10;s++){let r=s*t+(i%2?t/2:0),a=i*e;for(let o=0;o<3;o++)n.save(),n.translate(r,a),n.rotate(o/3*ht),n.fillStyle=["#f0e4c2","#38b58a","#e8a33d"][o],n.beginPath(),n.moveTo(0,0),n.bezierCurveTo(t*.35,-t*.1,t*.3,t*.42,0,t*.56),n.bezierCurveTo(-t*.14,t*.34,-t*.04,t*.14,0,0),n.fill(),n.restore()}},wordsmear(n){Ae(n,"#f6e9e3");let t="the brush remembers what the hand forgets and the hand forgets what the eye forgave ",e=.25,i=0;for(n.fillStyle="#c23b5a",n.textAlign="center",n.textBaseline="middle";e<31;){let s=8+e*15,r=e,a=500+Math.cos(r)*s,o=500+Math.sin(r)*s,l=12+e*1.75;n.save(),n.translate(a,o),n.rotate(r+Math.PI/2),n.font=`italic 400 ${l}px Fraunces`,n.fillText(t[i%t.length],0,0),n.restore(),e+=l*.56/s,i++}},"right-angles"(n){Ae(n,"#f1ece0");let t=(i,s,r,a,o)=>{n.fillStyle=o,n.fillRect(i,s,r,a)};t(0,0,380,300,"#d8312c"),t(740,0,260,180,"#f3c613"),t(380,560,360,440,"#1f3f9e"),t(0,800,180,200,"#f3c613"),t(860,730,140,270,"#d8312c"),n.fillStyle="#111",[[0,296,Nt,16],[370,0,16,Nt],[734,0,16,Nt],[0,552,Nt,16],[0,796,380,16],[734,172,266,16],[176,796,12,204],[734,724,266,12],[856,724,12,276]].forEach(i=>n.fillRect(...i));let e=["#d8312c","#f3c613","#1f3f9e","#f1ece0"];for(let i=0;i<26;i++)n.fillStyle=e[i%4],n.fillRect(i*40+4,298,14,12),n.fillRect(372,40+i*37,12,14)},"dont-lift"(n){Ae(n,"#efe7d6"),n.strokeStyle="#191714",n.lineWidth=5,n.lineCap="round",n.lineJoin="round",n.beginPath();let t=[[60,700],[170,690],[230,640],[190,540],[300,420],[330,300],[460,190],[640,230],[730,350],[700,430],[770,520],[710,540],[730,590],[690,610],[700,660],[610,700],[520,660],[470,720],[540,780],[420,800],[380,650],[470,520],[560,480],[470,450],[400,500],[450,400],[570,390],[610,440],[540,450],[620,510],[820,640],[940,660]];n.moveTo(...t[0]);for(let e=1;e<t.length-1;e++)n.quadraticCurveTo(t[e][0],t[e][1],(t[e][0]+t[e+1][0])/2,(t[e][1]+t[e+1][1])/2);n.lineTo(...t[t.length-1]),n.stroke()},"twin-dials"(n){Ae(n,"#14161a"),n.fillStyle="#04120b",n.fillRect(70,70,860,660),n.save(),n.beginPath(),n.rect(70,70,860,660),n.clip(),n.strokeStyle="#3cf08f",n.lineWidth=4,n.shadowColor="#35d07e",n.shadowBlur=22,n.lineJoin="round",n.beginPath();let t=120,e=660;n.moveTo(t,e),[[0,-480],[120,0],[0,390],[120,0],[0,-300],[120,0],[0,210],[120,0],[0,-120],[90,0],[0,60],[90,0],[0,-340]].forEach(([s,r])=>{t+=s,e+=r,n.lineTo(t,e)}),n.stroke(),n.restore();for(let s of[160,840]){let r=n.createRadialGradient(s-18,836,6,s,852,76);r.addColorStop(0,"#f4f4f2"),r.addColorStop(.7,"#9b9ea3"),r.addColorStop(1,"#55585e"),n.fillStyle=r,n.beginPath(),n.arc(s,852,76,0,ht),n.fill(),n.strokeStyle="#2a2c30",n.lineWidth=6,n.beginPath(),n.moveTo(s,852),n.lineTo(s+30,800),n.stroke()}},raked(n){Ae(n,"#d9d0bd");let t=(e,i,s,r)=>{for(let a=0;a<r;a++){let o=s+a*17;n.strokeStyle="rgba(120,104,78,.55)",n.lineWidth=4,n.beginPath(),n.arc(e,i,o,0,ht),n.stroke(),n.strokeStyle="rgba(255,250,235,.7)",n.lineWidth=3,n.beginPath(),n.arc(e+2,i+3,o,0,ht),n.stroke()}};for(let e=0;e<62;e++){let i=e*17;n.strokeStyle="rgba(120,104,78,.5)",n.lineWidth=4,n.beginPath(),n.moveTo(0,i),n.lineTo(Nt,i),n.stroke(),n.strokeStyle="rgba(255,250,235,.7)",n.lineWidth=3,n.beginPath(),n.moveTo(0,i+4),n.lineTo(Nt,i+4),n.stroke()}for(let[e,i,s,r]of[[350,420,96,200],[700,640,62,130]]){n.fillStyle="#d9d0bd",n.beginPath(),n.arc(e,i,r,0,ht),n.fill(),t(e,i,s+14,Math.floor((r-s)/17)),n.save(),n.shadowColor="rgba(40,30,20,.6)",n.shadowBlur=30,n.shadowOffsetX=24,n.shadowOffsetY=18;let a=n.createRadialGradient(e-s*.3,i-s*.4,4,e,i,s);a.addColorStop(0,"#77706a"),a.addColorStop(1,"#2e2b2a"),n.fillStyle=a,n.beginPath(),n.ellipse(e,i,s,s*.8,.4,0,ht),n.fill(),n.restore()}},squint(n,t){Ae(n,"#f5efdf");let e=[];for(let i=0;i<9e3&&e.length<3e3;i++){let s=t()*Nt,r=t()*Nt;e.some(a=>(a[0]-s)**2+(a[1]-r)**2<280)||e.push([s,r])}for(let[i,s]of e){let r=Math.hypot(i-500,s-380),a=s<560,o=a?t()<.5?"#ef8a2e":"#e0507a":t()<.55?"#1f5fb0":"#e8a43a";r<150?o=t()<.8?"#fbd63f":"#fff4cf":a&&r<280&&t()<.5?o="#f5b83d":a&&s<200&&t()<.5&&(o="#7b52c7"),n.fillStyle=o,n.beginPath(),n.arc(i,s,7,0,ht),n.fill()}},"scratch-track"(n,t){let e=n.createLinearGradient(0,0,Nt,Nt);["#ff3d81","#ffb13d","#fff14d","#3dff9e","#3dc8ff","#7a5cff","#ff3dd0"].forEach((r,a)=>e.addColorStop(a/6,r)),Ae(n,e);let i=Dt(Nt,Nt),s=i.getContext("2d");s.fillStyle="#0a0a0c",s.fillRect(0,0,Nt,Nt),s.globalCompositeOperation="destination-out",s.lineCap="round",s.lineJoin="round";for(let r=0;r<80;r++){let a=80+r*6.4,o=t()*ht,l=o+.3+t()*2.2;s.lineWidth=2+t()*3,s.beginPath(),s.arc(500,500,a,o,l),s.stroke()}n.drawImage(i,0,0)},"highly-strung"(n){Ae(n,"#121527");let t=180,e=[500,500],i=430,s=r=>[e[0]+Math.cos(r/t*ht-Math.PI/2)*i,e[1]+Math.sin(r/t*ht-Math.PI/2)*i];n.lineWidth=1.2;for(let r=0;r<t;r++){let[a,o]=s(r),[l,c]=s(r*2);n.strokeStyle=`hsla(${335+r/t*55},85%,68%,.62)`,n.beginPath(),n.moveTo(a,o),n.lineTo(l,c),n.stroke()}n.fillStyle="#f4dfc8";for(let r=0;r<t;r+=2){let[a,o]=s(r);n.beginPath(),n.arc(a,o,2.8,0,ht),n.fill()}},"low-res"(n,t){let i=Nt/40,s=["#1a1040","#3b1a6e","#7a2a8c","#d0446e","#f08a4b","#fbd06b"];for(let r=0;r<40;r++)for(let a=0;a<40;a++){let o=r/26*5,l=Math.floor(o),c=(a+r)%2&&o-l>.5?1:0;n.fillStyle=s[Math.min(5,l+c)],n.fillRect(a*i,r*i,i+1,i+1)}for(let r=0;r<40;r++)n.fillStyle="#fff4d0",n.fillRect(Math.floor(t()*40)*i,Math.floor(t()*12)*i,i,i);n.fillStyle="#ffe680";for(let r=-6;r<=6;r++)for(let a=-6;a<=6;a++)a*a+r*r<38&&n.fillRect((20+a)*i,(20+r)*i,i,i);for(let r=0;r<40;r++){let a=26+Math.round(Math.sin(r*.4)*2+Math.sin(r*.13)*3);for(let o=a;o<40;o++)n.fillStyle=o===a?"#2fbf71":(r+o)%3?"#14433f":"#1b5c50",n.fillRect(r*i,o*i,i+1,i+1)}},"word-wheel"(n){Ae(n,"#160a1c"),n.save(),n.translate(500,500);let t="round and round the word goes round";n.textBaseline="middle";for(let e=0;e<8;e++){let i=62+e*50,s=8+e*4,r=15+e*3.6;for(let a=0;a<s;a++)n.save(),n.rotate(a/s*ht+e*.2),n.translate(i,0),n.font=`600 ${r}px Fraunces`,n.fillStyle=`hsl(${290+e*11},72%,${74-e*3}%)`,n.fillText(t.split(" ")[e%7],0,0),n.restore()}n.restore()},"spin-cycle"(n,t){Ae(n,"#fdfaf5");let e=[500,500],i=["#e0308a","#ffb000","#00a6d6","#4b2bc9","#18b369"];for(let s=0;s<15;s++){let r=i[s%5],a=t()*ht,o=30+t()*120;for(let l=0;l<40;l++){let c=a+(t()-.5)*.5;n.strokeStyle=r,n.lineCap="round",n.beginPath();let u=o;for(let d=0;d<34;d++){let h=c+u/500*1.5,f=e[0]+Math.cos(h)*u,p=e[1]+Math.sin(h)*u;d?n.lineTo(f,p):n.moveTo(f,p),u+=7+t()*14}n.lineWidth=1+t()*t()*9,n.stroke()}}n.fillStyle="#fdfaf5",n.beginPath(),n.arc(500,500,34,0,ht),n.fill()},"wet-on-wet"(n,t){Ae(n,"#eee7d8"),n.save(),n.filter="blur(10px)";for(let e=0;e<260;e++){let i=-1.1+e/260*5.3,s=300+Math.sin(e*.21)*12;n.fillStyle=`rgba(24,24,28,${.1+.26*(1-e/260)})`,n.beginPath(),n.arc(500+Math.cos(i)*s,430+Math.sin(i)*s,42-e*.12+t()*16,0,ht),n.fill()}n.restore(),n.save(),n.filter="blur(2px)",n.lineCap="round";for(let e=0;e<210;e++){let i=-1.1+e/260*5.3,s=300+(t()-.5)*50;n.strokeStyle=`rgba(16,16,20,${.55*(1-e/240)})`,n.lineWidth=1+t()*7,n.beginPath(),n.moveTo(500+Math.cos(i)*s,430+Math.sin(i)*s),n.lineTo(500+Math.cos(i+.06)*(s+8),430+Math.sin(i+.06)*(s+8)),n.stroke()}n.restore(),n.fillStyle="#b3261e",n.fillRect(868,830,62,62)},"fold-here"(n,t){Ae(n,"#f2eee4");let e=Dt(Nt,Nt),i=e.getContext("2d");i.fillStyle="#121216";let s=(r,a,o)=>{i.beginPath(),i.ellipse(r,a,o,o*(.7+t()*.6),t()*3,0,ht),i.fill()};for(let r=0;r<46;r++){let a=110+t()*640,o=300*Math.sin((a-90)/680*Math.PI);s(500-t()*o,a,14+t()*80)}i.fillRect(476,170,24,560);for(let r=0;r<260;r++)s(500-t()*400,90+t()*720,t()*t()*11);i.globalCompositeOperation="destination-out";for(let r=0;r<10;r++)s(380+t()*100,200+t()*480,10+t()*24);n.drawImage(e,0,0,500,Nt,0,0,500,Nt),n.save(),n.translate(Nt,0),n.scale(-1,1),n.drawImage(e,0,0,500,Nt,0,0,500,Nt),n.restore(),n.setLineDash([10,10]),n.strokeStyle="rgba(18,18,22,.35)",n.lineWidth=2,n.beginPath(),n.moveTo(500,0),n.lineTo(500,70),n.stroke(),n.setLineDash([])},leadlight(n,t){Ae(n,"#111");let e=Array.from({length:70},()=>[t()*Nt,t()*Nt]),i=["#1f6fc4","#d43d3d","#e8b92e","#2a9d6a","#7a3db8","#3fb3d8","#e8772e"],s=250,r=Dt(s,s),a=r.getContext("2d"),o=a.createImageData(s,s);for(let l=0;l<s;l++)for(let c=0;c<s;c++){let u=1e9,d=1e9,h=0;for(let _=0;_<e.length;_++){let v=Math.hypot(e[_][0]/4-c,e[_][1]/4-l);v<u?(d=u,u=v,h=_):v<d&&(d=v)}let f=(l*s+c)*4,p=d-u<1.5,[T,x,g]=hn(i[h%7]),w=1-u/34*.45;o.data[f]=p?18:T*w+34,o.data[f+1]=p?18:x*w+34,o.data[f+2]=p?20:g*w+34,o.data[f+3]=255}a.putImageData(o,0,0),n.drawImage(r,0,0,Nt,Nt)},"long-exposure"(n,t){Ae(n,"#050406"),n.save(),n.globalCompositeOperation="lighter",n.lineCap="round",n.lineJoin="round",n.font="600 390px Caveat",n.textAlign="center";for(let e=0;e<3;e++)n.strokeStyle=["rgba(255,120,30,.22)","rgba(255,190,90,.5)","rgba(255,250,225,.95)"][e],n.lineWidth=[26,10,3][e],n.shadowColor="#ff8a2e",n.shadowBlur=[40,22,6][e],n.strokeText("long",500,410),n.strokeText("exp.",500,730);n.shadowBlur=0;for(let e=0;e<500;e++){let i=t()*ht,s=t()*480,r=500+Math.cos(i)*s,a=480+Math.sin(i)*s;n.strokeStyle=`rgba(255,${130+t()*110},60,${t()*.7})`,n.lineWidth=1,n.beginPath(),n.moveTo(r,a),n.lineTo(r+Math.cos(i)*t()*42,a+Math.sin(i)*t()*42+10),n.stroke()}n.restore()},"slow-growth"(n){let t=Ze(21),e=500,i=Dt(e,e),s=i.getContext("2d"),r=s.createImageData(e,e);for(let a=0;a<e;a++)for(let o=0;o<e;o++){let l=o+(t(o*.012,a*.012)-.5)*90,c=a+(t(o*.012+9,a*.012+5)-.5)*90,u=Math.sin(l*.17+3*t(l*.03,c*.03)*6)+Math.sin(c*.17+3*t(c*.03,l*.03)*6),d=Ut(u*3+.5),h=(a*e+o)*4;r.data[h]=qt(6,170,d),r.data[h+1]=qt(40,244,d),r.data[h+2]=qt(52,226,d),r.data[h+3]=255}s.putImageData(r,0,0),n.drawImage(i,0,0,Nt,Nt)}};function My(n){rn(n,Nt,Nt,{alpha:.05,seed:7})}function tl(n,t,e=null){let i=t.getContext("2d");if(i.setTransform(t.width/Nt,0,0,t.height/Nt,0,0),i.save(),e){let s=Math.max(Nt/e.width,Nt/e.height);Ae(i,"#111"),i.drawImage(e,(Nt-e.width*s)/2,(Nt-e.height*s)/2,e.width*s,e.height*s)}else vy[n.id](i,Pe(n.index*977+13)),My(i);i.restore()}function Ef(n,t){let e=t.getContext("2d");e.setTransform(t.width/Nt,0,0,t.height/Nt,0,0);let i=Pe(n.index+91),s="#2a2420";Ae(e,"#c9b995");for(let o=0;o<5200;o++)e.fillStyle=`rgba(${i()<.5?"255,245,220":"70,52,30"},${i()*.09})`,i()<.5?e.fillRect(i()*Nt,i()*Nt,40+i()*90,1):e.fillRect(i()*Nt,i()*Nt,1,40+i()*90);let r=92,a=(o,l,c,u,d)=>{let h=d==="x"?e.createLinearGradient(0,l,0,l+u):e.createLinearGradient(o,0,o+c,0);h.addColorStop(0,"#d2a874"),h.addColorStop(.5,"#c0935c"),h.addColorStop(1,"#a87a48"),e.fillStyle=h,e.fillRect(o,l,c,u),e.strokeStyle="rgba(80,50,22,.2)",e.lineWidth=1;for(let f=0;f<26;f++){if(e.beginPath(),d==="x"){let p=l+i()*u;e.moveTo(o,p),e.bezierCurveTo(o+c*.3,p+i()*7-3,o+c*.7,p+i()*7-3,o+c,p)}else{let p=o+i()*c;e.moveTo(p,l),e.bezierCurveTo(p+i()*7-3,l+u*.3,p+i()*7-3,l+u*.7,p,l+u)}e.stroke()}e.strokeStyle="rgba(40,24,10,.45)",e.lineWidth=2,e.strokeRect(o,l,c,u)};a(0,0,Nt,r,"x"),a(0,Nt-r,Nt,r,"x"),a(0,0,r,Nt,"y"),a(Nt-r,0,r,Nt,"y"),a(r,Nt/2-38,Nt-r*2,76,"x"),e.strokeStyle="#7d7f84",e.lineWidth=3;for(let o=0;o<18;o++){let l=70+o*50,c=()=>i()*8-4;for(let[u,d,h]of[[l,20,0],[l,Nt-20,0],[20,l,1.57],[Nt-20,l,1.57]])e.save(),e.translate(u+c(),d+c()),e.rotate(h+(i()-.5)*.2),e.beginPath(),e.moveTo(-13,0),e.lineTo(13,0),e.stroke(),e.restore()}e.save(),e.translate(500,500),e.rotate(-.018),e.shadowColor="rgba(40,24,10,.45)",e.shadowBlur=14,e.shadowOffsetY=5,e.fillStyle="#f5efe1",e.fillRect(-335,-320,670,640),e.shadowColor="transparent",qr(e,n.title,-295,-240,{font:"400 62px Fraunces",fill:s,spacing:-1}),qr(e,n.genre,-295,-196,{font:"italic 400 30px Fraunces",fill:"rgba(42,36,32,.7)"}),e.fillStyle=n.accent,e.fillRect(-295,-172,590,3),n.tracks.forEach((o,l)=>{let c=-114+l*62;qr(e,`${l+1}.`,-295,c,{font:"600 42px Caveat",fill:n.accent}),qr(e,o,-252,c,{font:"600 44px Caveat",fill:s})}),Eh&&(e.save(),e.translate(238,-246),e.rotate(.09),e.drawImage(Eh,-54,-55,108,109),e.restore()),wf(e,n.cat,"rgba(42,36,32,.7)",-295,286),wf(e,`${un.name.toUpperCase()}: ${un.tagline.toUpperCase()}`,"rgba(42,36,32,.7)",295,286,"right"),e.restore()}function Af(n,t=6){let i=Dt(14,14),s=i.getContext("2d",{willReadFrequently:!0});s.drawImage(n,0,0,14,14);let r=s.getImageData(0,0,14,14).data,a=[];for(let c=0;c<r.length;c+=4)a.push([r[c],r[c+1],r[c+2]]);let o=c=>Math.max(...c)-Math.min(...c),l=[a.reduce((c,u)=>o(u)>o(c)?u:c)];for(;l.length<t;){let c=a[0],u=-1;for(let d of a){let h=Math.min(...l.map(f=>(d[0]-f[0])**2+(d[1]-f[1])**2+(d[2]-f[2])**2));h>u&&(u=h,c=d)}l.push(c)}return l.map(([c,u,d])=>c<<16|u<<8|d)}var wn=an.length,il=1.3,Ah=.085,el=1024,Sy=2.95,Cf=n=>1-Math.pow(1-n,3),Rf=n=>n<.5?4*n*n*n:1-Math.pow(-2*n+2,3)/2,nl=n=>(n=(n%wn+wn)%wn,n>wn/2?n-wn:n);function by(n){let t=new Ts;t.background=new jt(789520);let e=(r,a,o,l,c,u)=>{let d=new Xe(new Si(r,a),new Hi({color:new jt(u,u,u),side:Sn}));d.position.set(o,l,c),d.lookAt(0,0,0),t.add(d)};e(7,1.4,0,5,3,6),e(1.2,8,-6,0,3,4),e(1.2,8,6,1,2,2.5),e(3,3,3,3,6,2);let i=new Bs(n),s=i.fromScene(t,.02).texture;return i.dispose(),s}function wy(){let t=Dt(64,64),e=t.getContext("2d"),i=e.createImageData(64,64),s=(a,o)=>{let l=Math.sin(a/64*Math.PI*16),c=Math.sin(o/64*Math.PI*16);return((Math.floor(a/4)+Math.floor(o/4))%2?l:c)*.5};for(let a=0;a<64;a++)for(let o=0;o<64;o++){let l=s(o+1,a)-s(o-1,a),c=s(o,a+1)-s(o,a-1),u=(a*64+o)*4;i.data[u]=128+l*90,i.data[u+1]=128+c*90,i.data[u+2]=255,i.data[u+3]=255}e.putImageData(i,0,0);let r=new vi(t);return r.wrapS=r.wrapT=Vi,r.repeat.set(30,30),r}function Ty(){let n=Dt(512,512),t=n.getContext("2d"),e=Pe(7);t.fillStyle="#a06a3a",t.fillRect(0,0,512,512);for(let s=0;s<240;s++){let r=e()*512;t.strokeStyle=`rgba(${e()<.5?"70,38,14":"214,164,108"},${.06+e()*.18})`,t.lineWidth=.6+e()*2.2,t.beginPath(),t.moveTo(0,r),t.bezierCurveTo(170,r+e()*26-13,340,r+e()*26-13,512,r),t.stroke()}for(let s=0;s<60;s++)t.fillStyle=`hsla(${e()*360},40%,50%,${e()*.1})`,t.beginPath(),t.ellipse(e()*512,e()*512,8+e()*34,4+e()*16,e()*3,0,6.3),t.fill();let i=new vi(n);return i.colorSpace=qe,i.wrapS=i.wrapT=Vi,i}function Ey(){let n=Dt(128,128),t=n.getContext("2d");return t.filter="blur(11px)",t.fillStyle="rgba(0,0,0,.55)",t.fillRect(36,36,56,56),new vi(n)}function Ay(){let n=new Cs;n.moveTo(-.56,-.05),n.bezierCurveTo(-.62,.32,-.2,.54,.16,.47),n.bezierCurveTo(.5,.41,.68,.14,.6,-.14),n.bezierCurveTo(.53,-.4,.24,-.5,0,-.44),n.bezierCurveTo(-.13,-.41,-.12,-.3,-.04,-.27),n.bezierCurveTo(.06,-.23,.02,-.13,-.12,-.17),n.bezierCurveTo(-.3,-.22,-.5,-.32,-.56,-.05);let t=new Wi;return t.absellipse(-.36,.1,.075,.095,0,Math.PI*2,!0,0),n.holes.push(t),new wr(n,{depth:.024,bevelEnabled:!0,bevelSize:.012,bevelThickness:.009,bevelSegments:3,curveSegments:28})}function Cy(){let n=new Mi(il,il,Ah),t=n.attributes.uv,e=.035;for(let i=0;i<16;i++){let s=t.getX(i),r=t.getY(i),a=Math.floor(i/4);a===0&&t.setXY(i,1-e*(1-s),r),a===1&&t.setXY(i,e*s,r),a===2&&t.setXY(i,s,1-e*(1-r)),a===3&&t.setXY(i,s,e*r)}return n}var Ry=[[.34,.26,.085],[.09,.34,.07],[-.16,.34,.078],[.46,.02,.07],[.38,-.2,.082],[.14,-.3,.062]];function If({mount:n,onFocus:t,onOpenRequest:e,onHover:i,onPointer:s}){let r=new Jo({antialias:!0,alpha:!0,powerPreference:"high-performance"});r.setPixelRatio(Math.min(window.devicePixelRatio||1,2)),r.setClearColor(0,0),r.toneMapping=bn;let a=r.domElement;a.className="gl",a.setAttribute("aria-label","Rack of painted canvases"),n.appendChild(a);let o=new Ts;o.environment=by(r);let l=new Je(30,1,.1,50);l.position.set(0,0,4.3);let c=new Ir(16777215,1.5);c.position.set(-1.6,2.6,4),o.add(c,new Pr(16777215,.75));let u={canvas:Cy(),shadow:new Si(il*2.2,il*2.2),palette:Ay(),blob:new Tr(1,18,12)},d=wy(),h={shadow:new Hi({map:Ey(),transparent:!0,depthWrite:!1}),palette:new Is({map:Ty(),roughness:.52,clearcoat:.4,clearcoatRoughness:.4})},f=new pn;o.add(f);function p(S){let U=new pn,V=new pn;U.add(V);let A=new Xi({color:new jt(S.glow),roughness:.62,normalMap:d,normalScale:new Ct(.32,.32),envMapIntensity:.14,emissive:16777215,emissiveIntensity:.88}),q=new Xi({color:13220245,roughness:.85,envMapIntensity:.2,emissive:16777215,emissiveIntensity:.86}),W=new Xe(u.canvas,[A,A,A,A,A,q]),Z=new Xe(u.shadow,h.shadow);Z.position.set(.05,-.07,-Ah/2-.19);let Y=new pn,et=new pn,ft=new Xe(u.palette,h.palette);et.add(ft);let ct=Ry.map(([nt,dt,pt])=>{let bt=new Xe(u.blob,new Is({color:S.accent,roughness:.3,clearcoat:1,clearcoatRoughness:.2,emissive:S.accent,emissiveIntensity:.3}));return bt.position.set(nt,dt,.04),bt.scale.set(pt,pt*(.8+Math.abs(nt*7)%.3),pt*.42),et.add(bt),bt});et.scale.setScalar(1.08),Y.add(et),Y.position.z=-Ah/2-.05,V.add(Z,Y,W),U.visible=!1,f.add(U);let ut=.93+Pe(S.index*31+5)()*.13,_t={rel:S,root:U,spin:V,holder:Y,palette:et,blobs:ct,front:A,back:q,scale:ut,ready:!1};return U.traverse(nt=>{nt.isMesh&&(nt.userData.item=_t)}),Z.userData.item=null,_t}let T=an.map(p),x=new Map,g=S=>{let U=new vi(S);return U.colorSpace=qe,U.anisotropy=Math.min(8,r.capabilities.getMaxAnisotropy()),U};function w(S){let U=S.coverCanvas||(S.coverCanvas=Dt(el,el));tl(S.rel,U,x.get(S.rel.id));let V=S.backCanvas||(S.backCanvas=Dt(el,el));S.ready||Ef(S.rel,V);for(let[A,q]of[[S.front,U],[S.back,V]])A.map?A.map.needsUpdate=!0:A.map=g(q),A.emissiveMap=A.map,A.color.set(2894892),A.needsUpdate=!0;Af(U,S.blobs.length).forEach((A,q)=>{S.blobs[q].material.color.setHex(A),S.blobs[q].material.emissive.setHex(A)}),S.ready=!0}let _={pos:0,target:0,snapAt:0,spin:0,spinVel:0,dragging:!1,mx:0,my:0,anim:null,running:!0,par:1,zoom:{index:-1,e:0}};function v(){let S=n.clientWidth,U=n.clientHeight;r.setSize(S,U,!1),l.aspect=S/U,l.position.z=S/U<.8?4.3*(.8/(S/U))*.92:4.3,l.updateProjectionMatrix()}new ResizeObserver(v).observe(n),v();function R(S,U,V){let A=Math.abs(U),q=Math.sign(U)||0,W=hi(0,1,A),Z=Math.max(0,A-1),Y=_.zoom.index===S.rel.index,et=1+(Y?0:_.zoom.e*1.5),ft=-q*(W*1+Z*.34-Math.max(0,Z-2)*.05)*et,ct=-W*.62-Z*.1+(Y?_.zoom.e*Sy:0);S.root.position.set(0,ft,ct),S.root.rotation.set(q*W*.92,0,q*W*.012),S.root.scale.setScalar(qt(S.scale,1,Y?_.zoom.e:0)),S.root.visible=A<6.5;let ut=1-W;if(A<1.5){let _t=Cf(ut)*(Y?1-_.zoom.e:1);S.holder.position.x=.7*_t,S.holder.position.y=-.06*_t,S.palette.rotation.z=-.5+Math.sin(V*.5+S.rel.index)*.035;let nt=S.rel.index===C?hi(-.05,.7,Math.cos(_.spin)):1;S.palette.scale.setScalar(1.08*Math.max(.001,nt))}return ut}let N=new Lr,m=new Ct;function M(S,U){let V=a.getBoundingClientRect();m.set((S-V.left)/V.width*2-1,-((U-V.top)/V.height)*2+1),N.setFromCamera(m,l);for(let A of N.intersectObjects(f.children,!0))if(A.object.userData.item)return A.object.userData.item;return null}let L=S=>{_.target+=nl(S-_.target),_.snapAt=0},P=S=>{_.target=Math.round(_.target)+S,_.snapAt=0};a.addEventListener("wheel",S=>{if(S.preventDefault(),_.anim)return;let U=S.deltaMode===1?S.deltaY*28:S.deltaY;_.target+=Ut(U,-160,160)*.0042,_.snapAt=performance.now()+130},{passive:!1});let B=null;a.addEventListener("pointerdown",S=>{if(!(S.button>0||_.anim)){B={x:S.clientX,y:S.clientY,lx:S.clientX,axis:null,t:performance.now(),startTarget:_.target};try{a.setPointerCapture(S.pointerId)}catch{}}}),a.addEventListener("pointermove",S=>{let U=a.getBoundingClientRect();if(_.mx=(S.clientX-U.left)/U.width*2-1,_.my=(S.clientY-U.top)/U.height*2-1,s?.(_.mx,_.my),!B){_.hoverX=S.clientX,_.hoverY=S.clientY,_.hoverDirty=!0;return}let V=S.clientX-B.x,A=S.clientY-B.y;if(!B.axis&&Math.hypot(V,A)>6&&(B.axis=Math.abs(V)>Math.abs(A)?"spin":"browse",_.dragging=!0,n.classList.add("is-dragging"),i(null)),B.axis==="spin"){let q=(S.clientX-B.lx)*.0105;_.spin+=q,_.spinVel=qt(_.spinVel,q*26,.4)}else B.axis==="browse"&&(_.target=B.startTarget-A/(n.clientHeight*.3),_.snapAt=1/0);B.lx=S.clientX}),a.addEventListener("pointerup",S=>{if(!B)return;let U=B.axis,V=B;if(B=null,_.dragging=!1,n.classList.remove("is-dragging"),U==="browse"){_.snapAt=0;return}if(U||performance.now()-V.t>600)return;let A=M(S.clientX,S.clientY);A&&(Math.abs(nl(A.rel.index-_.pos))<.5?e(A.rel):L(A.rel.index))}),a.addEventListener("pointercancel",()=>{B=null,_.dragging=!1,n.classList.remove("is-dragging")}),a.addEventListener("pointerleave",()=>i(null));let C=-1,O=[],D=performance.now(),E=0;function z(){let S=Math.round(_.pos),U=[];for(let V=0;V<=wn/2;V++)for(let A of V?[1,-1]:[1])U.push(((S+A*V)%wn+wn)%wn);O=U.filter(V=>!T[V].ready)}function b(S){if(!_.running)return;requestAnimationFrame(b);let U=Math.min(.05,(S-D)/1e3),V=S/1e3;if(D=S,O.length){let W=T[O.shift()];W.ready||w(W)}_.snapAt&&S>_.snapAt&&!_.dragging&&(_.target=Math.round(_.target),_.snapAt=0),_.pos=qt(_.pos,_.target,1-Math.exp(-U*9)),Math.abs(_.target-_.pos)<5e-4&&(_.pos=_.target);let A=(Math.round(_.pos)%wn+wn)%wn;if(A!==C&&(C!==-1&&(_.spin=0,_.spinVel=0,Kt("flick")),C=A,E=0,z(),t(an[A])),!_.dragging&&!_.anim){_.spin+=_.spinVel*U,_.spinVel*=Math.exp(-U*3.2);let W=Math.round(_.spin/Math.PI),Z=Math.abs(_.spinVel)<2.2?1:0;_.spin=qt(_.spin,W*Math.PI,Z*(1-Math.exp(-U*7)))}let q=Math.round(_.spin/Math.PI);q!==E&&(E=q,Kt("turn")),_.par=qt(_.par,_.anim?0:1,1-Math.exp(-U*12));for(let W of T){let Z=R(W,nl(W.rel.index-_.pos),V),Y=W.rel.index===C;W.spin.rotation.y=qt(W.spin.rotation.y,Y?_.spin+_.mx*.14*Z*_.par:0,Y?1:.2),W.spin.rotation.x=Y?_.my*.09*Z*_.par:0}if(_.anim&&_.anim(S),_.hoverDirty&&!_.anim){_.hoverDirty=!1;let W=M(_.hoverX,_.hoverY);i(W?{x:_.hoverX,y:_.hoverY,label:Math.abs(nl(W.rel.index-_.pos))<.5?"Paint":W.rel.title}:null)}r.render(o,l)}function I(S,U){return new Promise(V=>{let A=performance.now();_.anim=q=>{let W=Ut((q-A)/S);U(W),W>=1&&(_.anim=null,V())}})}let y=matchMedia("(prefers-reduced-motion: reduce)").matches,F={get focused(){return an[C]},next:()=>P(1),prev:()=>P(-1),goTo:L,jump(S){_.pos=_.target=S},flip(){_.spinVel=0,_.spin=(Math.round(_.spin/Math.PI)+1)*Math.PI},setPressing(S,U){U?x.set(S,U):x.delete(S);let V=T.find(A=>A.rel.id===S);V?.ready&&w(V)},coverCanvas(S){let U=T[S];return U.ready||w(U),U.coverCanvas},async open(S,U){let V=T[S.index];V.ready||w(V),_.spinVel=0,_.zoom.index=S.index;let A=_.spin,q=Math.round(_.spin/(Math.PI*2))*Math.PI*2;if(y){_.zoom.e=1,U();return}let W=!1;await I(820,Z=>{_.spin=qt(A,q,Rf(Math.min(1,Z*2.2))),_.zoom.e=Rf(Z),Z>.42&&!W&&(W=!0,U())})},async close(){if(y){_.zoom.e=0,_.zoom.index=-1;return}await I(720,S=>{_.zoom.e=1-Cf(S)}),_.zoom.index=-1},settleZoom(){_.zoom.e=1},pause(){_.running=!1},resume(){_.running||(_.running=!0,D=performance.now(),requestAnimationFrame(b))},state:_};return z(),requestAnimationFrame(b),F}function Pf(){try{return!!document.createElement("canvas").getContext("webgl2")}catch{return!1}}var Iy=`
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
}`,Py=n=>hn(n).map(t=>Math.pow(t/255,1.5));function Lf(n){let t=document.createElement("canvas");t.className="backdrop",t.setAttribute("aria-hidden","true"),n.prepend(t);let e=Fn(t,{preserveDrawingBuffer:!1});if(!e)return{tint(){},pause(){},resume(){},pointer(){}};let i=Ke(e,Iy),s=()=>{let w=Math.min(1,620/n.clientWidth);t.width=Math.max(2,Math.round(n.clientWidth*w)),t.height=Math.max(2,Math.round(n.clientHeight*w)),e.viewport(0,0,t.width,t.height)};new ResizeObserver(s).observe(n),s();let r=matchMedia("(prefers-reduced-motion: reduce)").matches,a=[.3,.1,.1],o=a,l=1,c=!0,u=0,d=0,h=0,f=0,p=0,T=0,x=performance.now();function g(w){if(!c||(requestAnimationFrame(g),w-u<33))return;let _=Math.min(.1,(w-u)/1e3);u=w,l=Math.min(1,l+_*.8),h=qt(h,p,.04),f=qt(f,T,.04),d=qt(d,document.documentElement.dataset.theme==="light"?1:0,.08);let v=l*l*(3-2*l);i.use().f("t",r?40:(w-x)/1e3+200).f("aspect",t.width/t.height).f("light",d).f("blend",v).f("m",h,f).f("ca",...a).f("cb",...o),_n(e)}return requestAnimationFrame(g),{tint(w){let _=l*l*(3-2*l);a=a.map((v,R)=>qt(v,o[R],_)),o=Py(w),l=0},pointer(w,_){p=w,T=_},pause(){c=!1},resume(){c||(c=!0,requestAnimationFrame(g))}}}var Nf=6,Df=30;function Uf(n){let t=document.createElement("canvas");t.className="wipe",t.setAttribute("aria-hidden","true"),n.appendChild(t);let e=t.getContext("2d"),i=matchMedia("(prefers-reduced-motion: reduce)").matches,s=()=>{t.width=Math.ceil(innerWidth/2),t.height=Math.ceil(innerHeight/2)};s(),addEventListener("resize",s);function r(){let o=[],l=t.height/Nf;for(let c=0;c<Nf;c++){let u=[];for(let d=0;d<Df;d++)u.push({y:(c-.28+d/Df*1.56)*l,lag:Math.random()*.2,w:l*(.08+Math.random()*.1),wob:(Math.random()-.5)*l*.2,shade:(Math.random()-.5)*.28});o.push({dir:c%2?-1:1,start:c*.075,bristles:u})}return o}function a(o,l){return new Promise(c=>{if(i){c();return}let u=r(),d=performance.now(),h=t.width,f=new Map,p=T=>{let x=Ut((T-d)/o);for(let g of u)for(let w of g.bristles){let _=Ut((x-g.start-w.lag*.5)/.525),v=_*_*(3-2*_),R=f.get(w)??0;if(v<=R)continue;f.set(w,v);let N=g.dir>0?R*h*1.08-8:h-R*h*1.08+8,m=g.dir>0?v*h*1.08:h-v*h*1.08,M=w.y+Math.sin(R*5)*w.wob,L=w.y+Math.sin(v*5)*w.wob;l(w,N,M,m,L)}x<1?requestAnimationFrame(p):c()};requestAnimationFrame(p)})}return{async cover(o){let[l,c,u]=hn(o),d=h=>{let f=p=>Math.round(Ut(h<0?p*(1+h):p+(255-p)*h,0,255));return`rgb(${f(l)},${f(c)},${f(u)})`};e.globalCompositeOperation="source-over",e.lineCap="round",await a(430,(h,f,p,T,x)=>{e.strokeStyle=d(h.shade),e.lineWidth=h.w,e.beginPath(),e.moveTo(f,p),e.lineTo(T,x),e.stroke()}),e.fillStyle=d(0),e.fillRect(0,0,t.width,t.height)},async reveal(){e.globalCompositeOperation="destination-out",e.lineCap="round",await a(460,(o,l,c,u,d)=>{e.lineWidth=o.w*1.5,e.beginPath(),e.moveTo(l,c),e.lineTo(u,d),e.stroke()}),e.globalCompositeOperation="source-over",e.clearRect(0,0,t.width,t.height)}}}var Ff="The paint slowly comes alive: pigment drifts and shimmers across the surface, gentle camera push-in, painterly, no new objects.",sl=location.protocol==="file:"?null:"api/alive",zs=n=>String(n).replace(/[&<>"]/g,t=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"})[t]);function Ly(n){let t=Math.min(1,1280/Math.max(n.width,n.height)),e=Dt(n.width*t,n.height*t),i=e.getContext("2d");return i.fillStyle="#111",i.fillRect(0,0,e.width,e.height),i.drawImage(n,0,0,e.width,e.height),e.toDataURL("image/jpeg",.9)}function Of(n){let t=document.createElement("div");t.className="alive",t.setAttribute("role","dialog"),t.setAttribute("aria-modal","true"),t.setAttribute("aria-label","Bring it to life"),t.innerHTML='<div class="alive__card"></div>',n.appendChild(t);let e=t.firstChild,i=0,s="",r=null,a="",o=()=>{i++,t.classList.remove("on"),e.replaceChildren()};t.addEventListener("pointerdown",T=>{T.target===t&&o()}),addEventListener("keydown",T=>{T.key==="Escape"&&t.classList.contains("on")&&(T.stopImmediatePropagation(),o())},!0);let l=T=>{e.innerHTML=T,e.querySelector("[data-close]")?.addEventListener("click",o)};function c(){l(`<h3>Bring it to life</h3>
      <p>This turns your painting into a five second video with Higgsfield. It needs the small local server, because your Higgsfield key must stay off the web page.</p>
      <pre>1. Copy .env.example to .env
2. Paste your key from console.higgsfield.ai
3. npm start
4. Open http://localhost:5200</pre>
      <div class="alive__row"><button class="btn" data-close>Got it</button></div>`)}function u(){l(`<h3>Bring it to life</h3>
      <p>${zs(a)} becomes a five second video. Tell it how the paint should move.</p>
      <img src="${s}" alt="Your painting">
      <textarea aria-label="How the paint should move">${zs(Ff)}</textarea>
      <div class="alive__row">
        <span class="note">Your painting is sent to Higgsfield, and each video is charged to your Higgsfield balance.</span>
        <button class="btn" data-close>Not now</button>
        <button class="btn hot" data-go>Make the video</button>
      </div>`),e.querySelector("[data-go]").onclick=()=>p(e.querySelector("textarea").value.trim()||Ff)}function d(T){l(`<h3>Waking the paint<span class="alive__dots"></span></h3>
      <p>${zs(T)}</p>
      <img src="${s}" alt="Your painting">
      <div class="alive__row"><span class="note">You can leave this open. It usually takes a few minutes.</span><button class="btn" data-close>Stop watching</button></div>`)}function h(T){l(`<h3>That didn't take</h3><p>${zs(T)}</p>
      <div class="alive__row"><button class="btn" data-close>Close</button><button class="btn hot" data-retry>Try again</button></div>`),e.querySelector("[data-retry]").onclick=u}function f(T){Kt("shimmer"),l(`<h3>It's alive</h3>
      <video src="${zs(T)}" controls autoplay loop muted playsinline></video>
      <p>Higgsfield keeps this file for about seven days, so download it if you want to keep it.</p>
      <div class="alive__row"><button class="btn" data-close>Close</button><a class="btn" style="display:inline-flex;align-items:center;text-decoration:none" href="${zs(T)}" download target="_blank" rel="noopener">Download</a></div>`)}async function p(T){let x=++i;d("Sending your painting over.");let g;try{let v=await fetch(sl,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({image:s,prompt:T})}),R=await v.json();if(!v.ok)throw new Error(R.error||"The server turned that down.");g=R.id}catch(v){x===i&&h(v.message);return}let w=Date.now(),_=4e3;for(;x===i;){if(await new Promise(v=>setTimeout(v,_)),x!==i)return;_=Math.min(15e3,_*1.3);try{let v=await fetch(`${sl}/${g}`),R=await v.json();if(x!==i)return;if(!v.ok)throw new Error(R.error||"Lost track of that request.");if(R.status==="completed"&&R.video){f(R.video);return}if(R.status==="nsfw"){h("Higgsfield's content filter stopped this one.");return}if(R.status==="failed"||R.status==="canceled"){h(R.error||"Higgsfield could not finish this one.");return}d(R.status==="in_progress"?"The paint is moving.":"Waiting in the queue.")}catch(v){h(v.message);return}if(Date.now()-w>900*1e3){h("This is taking too long, so I stopped watching. Check your Higgsfield console.");return}}}return{async open(T,x){if(r=T,a=x,s=Ly(r),t.classList.add("on"),!sl){c();return}try{(await(await fetch(`${sl}/status`)).json()).ready?u():c()}catch{c()}}}}var rl="data:image/png;base64,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";var Yr=n=>{let t=document.createElement("template");return t.innerHTML=n.trim(),t.content.firstChild},Xn={back:'<svg viewBox="0 0 24 24"><path d="M15 5l-7 7 7 7"/></svg>',undo:'<svg viewBox="0 0 24 24"><path d="M9 7L4 12l5 5M4 12h11a5 5 0 010 10h-2"/></svg>',clear:'<svg viewBox="0 0 24 24"><path d="M5 7h14M10 7V4h4v3M7 7l1 13h8l1-13"/></svg>',save:'<svg viewBox="0 0 24 24"><path d="M12 4v11M7 11l5 5 5-5M5 20h14"/></svg>',hang:'<svg viewBox="0 0 24 24"><path d="M12 3v4M12 7L5 12M12 7l7 5M4 12h16v9H4z"/></svg>',spark:'<svg viewBox="0 0 24 24"><path d="M12 3l1.8 6.2L20 11l-6.2 1.8L12 19l-1.8-6.2L4 11l6.2-1.8zM19 17l.7 2.3L22 20l-2.3.7L19 23l-.7-2.3L16 20l2.3-.7z"/></svg>',grid:'<svg viewBox="0 0 24 24"><path d="M4 4h6v6H4zM14 4h6v6h-6zM4 14h6v6H4zM14 14h6v6h-6z"/></svg>',moon:'<svg viewBox="0 0 24 24"><path d="M20 14A8 8 0 1110 4a7 7 0 0010 10z"/></svg>',sound:'<svg viewBox="0 0 24 24"><path d="M4 9v6h4l5 4V5L8 9zM16 9a4 4 0 010 6M18.500 6.500a8 8 0 010 11"/></svg>',silent:'<svg viewBox="0 0 24 24"><path d="M4 9v6h4l5 4V5L8 9zM17 9.500l4 5M21 9.500l-4 5"/></svg>'},ll=document.getElementById("app");document.title=`${un.name}: ${un.tagline}`;var Xr={get(n){try{return localStorage.getItem(n)}catch{return null}},set(n,t){try{return localStorage.setItem(n,t),!0}catch{return!1}},del(n){try{localStorage.removeItem(n)}catch{}}},Rh=n=>`mym.pressing.${n}`,Wf=`<a class="maker" href="${$n.url}" target="_blank" rel="noopener" aria-label="Made by ${$n.name}"><img src="${rl}" alt="${$n.name} logo"><span>Made by<br><b>${$n.name}</b></span></a>`,cn=Yr(`<section class="shelf" aria-label="${un.name} rack">
  <div class="shelf__grain"></div>
  <header class="top">
    <h1 class="brand" style="margin:0;font-weight:400">${un.name}<em>${un.tagline}</em></h1>
    <div class="top__right">
      <button class="round" data-act="cat" aria-label="See the whole collection">${Xn.grid}<span class="lbl">Collection</span></button>
      <button class="round" data-act="sound" aria-label="Sound on or off"></button>
      <button class="round" data-act="theme" aria-label="Switch between dark and light">${Xn.moon}</button>
    </div>
  </header>
  <div class="credit" aria-live="polite">
    <div class="credit__n"><b class="n"></b> / ${String(an.length).padStart(2,"0")} &nbsp; <span class="c"></span></div>
    <h2 class="credit__t"></h2>
    <p class="credit__s"></p>
    <button class="credit__play">Pick up the brush \u2197</button>
  </div>
  ${Wf}
  <div class="hint">Scroll the rack \xB7 Drag to turn \xB7 Click to paint</div>
  <nav class="ticks" aria-label="Jump to a canvas"></nav>
  <div class="pill"></div>
</section>`);ll.appendChild(cn);{let n=Dt(220,220),t=n.getContext("2d"),e=Pe(4),i=t.createImageData(220,220);for(let s=0;s<i.data.length;s+=4){let r=e()*255;i.data[s]=i.data[s+1]=i.data[s+2]=r,i.data[s+3]=255}t.putImageData(i,0,0),cn.querySelector(".shelf__grain").style.backgroundImage=`url(${n.toDataURL()})`}var Ci=Yr(`<section class="cat" aria-label="Collection" aria-hidden="true">
  <div class="cat__head"><div class="brand">The collection</div><button class="round" data-act="catclose">Close</button></div>
  <div class="cat__grid"></div><div class="cat__foot">${Wf}</div></section>`);ll.appendChild(Ci);var nn=Yr(`<section class="toy" aria-hidden="true">
  <div class="toy__stage"></div>
  <div class="toy__bar">
    <button class="round" data-act="back" aria-label="Back to the rack">${Xn.back}<span class="lbl">Rack</span></button>
    <div class="toy__title"><b></b><span></span></div>
    <a class="toy__maker" href="${$n.url}" target="_blank" rel="noopener" aria-label="Made by ${$n.name}" title="Made by ${$n.name}"><img src="${rl}" alt="${$n.name} logo"></a>
    <div class="toy__spacer"></div>
    <button class="round" data-act="sound" aria-label="Sound on or off"></button>
    <button class="round" data-act="undo" aria-label="Undo">${Xn.undo}</button>
    <button class="round" data-act="clear" aria-label="Start again">${Xn.clear}</button>
    <button class="round" data-act="save" aria-label="Save as PNG">${Xn.save}</button>
    <button class="round" data-act="alive" title="Turn your painting into a short video">${Xn.spark}<span class="lbl">Bring to life</span></button>
    <button class="round primary" data-act="hang" title="Hang your painting on the rack">${Xn.hang}<span class="lbl">Hang it</span></button>
  </div>
  <div class="tip off"></div>
  <div class="dock" role="toolbar" aria-label="Toy controls"></div>
  <div class="toast" role="status"></div>
</section>`);ll.appendChild(nn);var Bf=nn.querySelector(".toy__stage"),kf=nn.querySelector(".dock"),Dy=nn.querySelector(".tip"),Ch=nn.querySelector(".toast"),zf=0,Ih=n=>{Ch.textContent=n,Ch.classList.add("on"),clearTimeout(zf),zf=setTimeout(()=>Ch.classList.remove("on"),2400)},Uy=location.protocol==="file:"||["localhost","127.0.0.1"].includes(location.hostname);Uy||(nn.querySelector("[data-act=alive]").style.display="none");var cl=Lf(cn),ol=Uf(ll),Fy=Of(nn);function qf(){document.querySelectorAll("[data-act=sound]").forEach(n=>{n.innerHTML=Jr()?Xn.silent:Xn.sound,n.setAttribute("aria-pressed",String(!Jr()))})}qf();var Oy=cn.querySelector(".credit .n"),By=cn.querySelector(".credit .c"),ky=cn.querySelector(".credit__t"),zy=cn.querySelector(".credit__s"),Xf=cn.querySelector(".ticks");an.forEach((n,t)=>{let e=Yr(`<button aria-label="${n.title.replace(/"/g,"")}"><i></i></button>`);e.onclick=()=>Ee?.goTo(t),Xf.appendChild(e)});function Gf(n){Oy.textContent=String(n.index+1).padStart(2,"0"),By.textContent=n.cat,ky.textContent=n.title,zy.textContent=n.blurb,[...Xf.children].forEach((t,e)=>t.classList.toggle("on",e===n.index)),document.documentElement.style.setProperty("--accent",n.accent),cl.tint(n.glow)}var al=cn.querySelector(".pill");function Yf(n){if(!n){al.classList.remove("on");return}al.textContent=n.label,al.style.transform=`translate(${n.x+16}px, ${n.y+14}px)`,al.classList.add("on")}var $f=Pf(),Ee=null;async function Gy(n){let t=Xr.get(Rh(n));if(!t)return;let e=new Image;e.src=t;try{await e.decode(),Ee?.setPressing(n,e)}catch{Xr.del(Rh(n))}}var ln=null,Un=null,Gs=!1;function Zf(n){Bf.replaceChildren(),kf.replaceChildren(),nn.querySelector(".toy__title b").textContent=n.title,nn.querySelector(".toy__title span").textContent=`${n.cat} \xB7 ${n.genre}`;let t=jh({stage:Bf,dock:kf,tipEl:Dy,toast:Ih,timbre:n.timbre});n.mount(t,n),nn.querySelector("[data-act=undo]").style.display=t.undo?"":"none",Un=t}async function Vy(n){if(Gs||ln===n)return;Gs=!0,ln=n,Yf(null),document.title=`${n.title} \xB7 ${un.name}`,Ee&&Ee.focused?.index!==n.index&&Ee.jump(n.index),document.documentElement.style.setProperty("--accent",n.accent),Zf(n),Kt("swish");let t,e=new Promise(s=>{t=s}),i=()=>ol.cover(n.accent).then(t);Ee?await Ee.open(n,i):i(),await e,nn.classList.add("on"),nn.setAttribute("aria-hidden","false"),cn.style.visibility="hidden",Ee?.pause(),cl.pause(),Ys(n.bed),await ol.reveal(),Gs=!1,location.hash!==`#/${n.id}`&&hl()}async function Hy(){if(Gs||!ln)return;Gs=!0;let n=ln;Kt("back"),await ol.cover(n.accent),Un?.destroy(),Un=null,ml(),nn.classList.remove("on"),nn.setAttribute("aria-hidden","true"),cn.style.visibility="",Ee?.resume(),cl.resume(),Ys("studio"),document.title=`${un.name}: ${un.tagline}`,ln=null;let t=Ee?.close();await ol.reveal(),await t,Gs=!1,hl()}function hl(){let n=location.hash.replace(/^#\/?/,""),t=an.find(e=>e.id===n);t?t!==ln&&(ln?Wy(t):Vy(t)):ln&&Hy()}function Wy(n){Un?.destroy(),ml(),ln=n,Zf(n),Ys(n.bed)}addEventListener("hashchange",hl);nn.addEventListener("click",n=>{let t=n.target.closest("[data-act]")?.dataset.act;if(!(!t||!Un)){if(t==="back"&&(location.hash="#/"),t==="undo"&&Un.undo?.(),t==="clear"&&Un.clear?.(),t==="alive"){let e=Un.snapshot?.();e&&Fy.open(e,ln.title)}if(t==="save"){let e=Un.snapshot?.();if(!e)return;let i=document.createElement("a");i.download=`${ln.id}.png`,i.href=e.toDataURL("image/png"),i.click(),Ih("Saved as a PNG")}if(t==="hang"){let e=Un.snapshot?.();if(!e)return;let i=640,s=Dt(i,i),r=s.getContext("2d"),a=Math.max(i/e.width,i/e.height);r.fillStyle="#111",r.fillRect(0,0,i,i),r.drawImage(e,(i-e.width*a)/2,(i-e.height*a)/2,e.width*a,e.height*a);let o=Xr.set(Rh(ln.id),s.toDataURL("image/jpeg",.82));Ee?.setPressing(ln.id,s),Kt("hang"),Ih(o?"Hung on the rack. It takes this canvas's place.":"Hung for this visit (browser storage is full)")}}});cn.addEventListener("click",n=>{let t=n.target.closest("[data-act]")?.dataset.act;if(t==="theme"){let e=document.documentElement,i=e.dataset.theme==="dark"?"light":"dark";e.dataset.theme=i,Xr.set("mym.theme",i)}t==="cat"&&Kf()});cn.querySelector(".credit__play").onclick=()=>{Ee?.focused&&(location.hash=`#/${Ee.focused.id}`)};Ci.addEventListener("click",n=>{let t=n.target.closest("[data-id]");n.target.closest("[data-act=catclose]")&&Ph(),t&&(Ph(),Ee?.jump(an.findIndex(e=>e.id===t.dataset.id)),location.hash=`#/${t.dataset.id}`)});function Kf(){let n=Ci.querySelector(".cat__grid");n.children.length||an.forEach((t,e)=>{let i=Yr(`<button class="cat__item" data-id="${t.id}"><b>${t.title}</b><span>${t.cat}</span></button>`),s=Dt(360,360);Ee?s.getContext("2d").drawImage(Ee.coverCanvas(e),0,0,360,360):tl(t,s),i.prepend(s),n.appendChild(i)}),Ci.classList.add("on"),Ci.setAttribute("aria-hidden","false")}function Ph(){$f&&(Ci.classList.remove("on"),Ci.setAttribute("aria-hidden","true"))}addEventListener("pointerdown",pl,{capture:!0});addEventListener("keydown",pl,{capture:!0});addEventListener("click",n=>{let t=n.target.closest?.("button, a.btn");if(t){if(t.dataset.act==="sound"){Kh(!Jr()),qf(),Kt("on");return}t.getAttribute("aria-pressed")!==null?Kt(t.getAttribute("aria-pressed")==="true"?"off":"on"):t.closest(".sw")?Kt("pop"):t.closest(".seg")?Kt("tock"):Kt("click")}},!0);var Vf=0;addEventListener("input",n=>{if(n.target.type!=="range")return;let t=performance.now();t-Vf>45&&(Vf=t,Kt("slide"))},!0);addEventListener("pointerover",n=>{let t=n.target.closest?.("button");n.pointerType==="mouse"&&t&&!t.contains(n.relatedTarget)&&Kt("hover")},!0);addEventListener("keydown",n=>{if(!n.target.matches?.("input, textarea")){if(ln){n.key==="Escape"&&(location.hash="#/"),(n.ctrlKey||n.metaKey)&&n.key==="z"&&(n.preventDefault(),Un?.undo?.());return}n.key==="Escape"&&Ph(),!(!Ee||Ci.classList.contains("on"))&&((n.key==="ArrowDown"||n.key==="ArrowRight"||n.key==="j")&&(n.preventDefault(),Ee.next()),(n.key==="ArrowUp"||n.key==="ArrowLeft"||n.key==="k")&&(n.preventDefault(),Ee.prev()),n.key==="f"&&Ee.flip(),n.key==="Enter"&&n.target===document.body&&(location.hash=`#/${Ee.focused.id}`))}});var Hf=Xr.get("mym.theme");Hf&&(document.documentElement.dataset.theme=Hf);var qy=["400 40px Fraunces","600 40px Fraunces","italic 400 40px Fraunces",'400 40px "DM Mono"','500 40px "DM Mono"',"400 40px Anton",'400 40px "Instrument Serif"','italic 400 40px "Instrument Serif"',"600 40px Caveat","700 40px Unbounded","400 40px VT323",'500 40px "Space Grotesk"','700 40px "Space Grotesk"'],Lh=new Image;Lh.src=rl;Ys("studio");Promise.all([...qy.map(n=>document.fonts.load(n)),Lh.decode().then(()=>Tf(Lh))]).catch(()=>{}).then(()=>{$f?(Ee=If({mount:cn,onFocus:Gf,onHover:Yf,onPointer:(n,t)=>cl.pointer(n,t),onOpenRequest:n=>{location.hash=`#/${n.id}`}}),an.forEach(n=>Gy(n.id))):(Gf(an[0]),Kf()),hl()});})();
/*! Bundled license information:

three/build/three.core.js:
three/build/three.module.js:
  (**
   * @license
   * Copyright 2010-2026 Three.js Authors
   * SPDX-License-Identifier: MIT
   *)
*/
