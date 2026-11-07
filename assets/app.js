(()=>{var vh="wp.muted",Mf=()=>{try{return localStorage.getItem(vh)==="1"}catch{return!1}},Nt=null,wn=null,Ji=null,Qi=null,Ni=null,Hs=Mf(),Or=null,Vs=null,Sf={bristle:{type:"bandpass",f:1300,q:.7,g:.13,sweep:1400},pencil:{type:"bandpass",f:3800,q:1.3,g:.05,sweep:1600},chalk:{type:"bandpass",f:2400,q:1.6,g:.08,sweep:1200},scratch:{type:"bandpass",f:3e3,q:3.2,g:.09,sweep:2600},sand:{type:"highpass",f:3600,q:.5,g:.06,sweep:1500},water:{type:"lowpass",f:520,q:2.4,g:.16,sweep:620},glass:{type:"bandpass",f:5200,q:7,g:.035,sweep:1500},shimmer:{type:"bandpass",f:6400,q:3,g:.02,sweep:2400},sizzle:{type:"highpass",f:5200,q:.8,g:.05,sweep:900,crackle:!0}};function xh(n){let t=Nt.sampleRate*3,e=Nt.createBuffer(1,t,Nt.sampleRate),i=e.getChannelData(0),s=0;for(let r=0;r<t;r++){let a=Math.random()*2-1;n==="brown"?(s=(s+.02*a)/1.02,i[r]=s*3.5):i[r]=a}return e}function bf(n=2.2){let t=Nt.sampleRate*n,e=Nt.createBuffer(2,t,Nt.sampleRate);for(let i=0;i<2;i++){let s=e.getChannelData(i);for(let r=0;r<t;r++)s[r]=(Math.random()*2-1)*Math.pow(1-r/t,3.2)}return e}function Mh(){if(Nt)return!0;let n=window.AudioContext||window.webkitAudioContext;if(!n)return!1;Nt=new n,Qi=xh("white"),Ni=xh("brown"),wn=Nt.createGain(),wn.gain.value=Hs?0:.85;let t=Nt.createDynamicsCompressor();t.threshold.value=-14,t.ratio.value=6,wn.connect(t),t.connect(Nt.destination);let e=Nt.createConvolver();return e.buffer=bf(),Ji=Nt.createGain(),Ji.gain.value=.3,Ji.connect(e),e.connect(wn),pn.init(),!0}function Zo(){return Mh()?(Nt.state==="suspended"&&Nt.resume(),Nt):null}function Sh(){return Mh(),wn}function Ko(){Zo()&&Or&&!Vs&&Th(Or)}var Fr=()=>Hs;function bh(n){Hs=n;try{localStorage.setItem(vh,n?"1":"0")}catch{}Nt&&wn.gain.setTargetAtTime(n?0:.85,Nt.currentTime,.05)}function le(n,{dur:t=.2,vol:e=.1,type:i="sine",to:s=null,attack:r=.004,wet:a=0,delay:o=0,pan:l=0}={}){let c=Nt.currentTime+o,u=Nt.createOscillator(),f=Nt.createGain();u.type=i,u.frequency.setValueAtTime(n,c),s&&u.frequency.exponentialRampToValueAtTime(s,c+t),f.gain.setValueAtTime(1e-4,c),f.gain.exponentialRampToValueAtTime(e,c+r),f.gain.exponentialRampToValueAtTime(1e-4,c+t),u.connect(f);let h=f;if(l&&Nt.createStereoPanner){let d=Nt.createStereoPanner();d.pan.value=l,f.connect(d),h=d}if(h.connect(wn),a){let d=Nt.createGain();d.gain.value=a,h.connect(d),d.connect(Ji)}u.start(c),u.stop(c+t+.05)}function Ke({dur:n=.1,vol:t=.1,f:e=2e3,q:i=1,type:s="bandpass",to:r=null,attack:a=.002,wet:o=0,delay:l=0,src:c=Qi}={}){let u=Nt.currentTime+l,f=Nt.createBufferSource(),h=Nt.createBiquadFilter(),d=Nt.createGain();if(f.buffer=c,f.loop=!0,h.type=s,h.frequency.setValueAtTime(e,u),r&&h.frequency.exponentialRampToValueAtTime(r,u+n),h.Q.value=i,d.gain.setValueAtTime(1e-4,u),d.gain.exponentialRampToValueAtTime(t,u+a),d.gain.exponentialRampToValueAtTime(1e-4,u+n),f.connect(h),h.connect(d),d.connect(wn),o){let p=Nt.createGain();p.gain.value=o,d.connect(p),p.connect(Ji)}f.start(u,Math.random()*2),f.stop(u+n+.05)}var wf={hover:()=>le(2300,{dur:.025,vol:.008}),click:()=>{Ke({dur:.03,vol:.05,f:2600,q:2}),le(620,{dur:.05,vol:.03,type:"triangle",to:380})},pop:()=>le(520,{dur:.09,vol:.09,to:980,attack:.008,wet:.2}),tock:()=>{le(340,{dur:.07,vol:.09,type:"triangle",to:210}),Ke({dur:.02,vol:.03,f:3e3})},on:()=>{le(620,{dur:.07,vol:.05,type:"triangle"}),le(930,{dur:.09,vol:.05,type:"triangle",delay:.05,wet:.2})},off:()=>{le(760,{dur:.07,vol:.05,type:"triangle"}),le(500,{dur:.09,vol:.05,type:"triangle",delay:.05})},slide:()=>le(1500,{dur:.02,vol:.012,type:"triangle"}),flick:()=>{Ke({dur:.1,vol:.09,f:900,q:.8,to:2400,attack:.02}),le(170,{dur:.12,vol:.09,type:"triangle",to:95})},turn:()=>Ke({dur:.26,vol:.06,f:500,q:.9,to:1800,attack:.08,wet:.2}),swish:()=>{Ke({dur:.62,vol:.2,f:700,q:.6,to:3200,attack:.1,wet:.35}),[220,330,494].forEach((n,t)=>le(n,{dur:1.3,vol:.035,attack:.25,delay:t*.07,wet:.7}))},back:()=>{Ke({dur:.5,vol:.16,f:3e3,q:.6,to:600,attack:.06,wet:.35}),[494,330,247].forEach((n,t)=>le(n,{dur:1,vol:.03,attack:.2,delay:t*.06,wet:.7}))},hang:()=>{le(150,{dur:.16,vol:.16,type:"triangle",to:80}),Ke({dur:.06,vol:.06,f:1500,delay:.02}),[523,659,784].forEach((n,t)=>le(n,{dur:.5,vol:.04,delay:.12+t*.07,wet:.6}))},crack:()=>{le(120,{dur:.2,vol:.2,type:"triangle",to:55});for(let n=0;n<7;n++)Ke({dur:.03+Math.random()*.05,vol:.14,f:2500+Math.random()*4e3,q:4,delay:n*.018+Math.random()*.02,wet:.3});for(let n=0;n<5;n++)le(1800+Math.random()*2600,{dur:.12,vol:.03,delay:.1+n*.05,wet:.5})},clink:()=>{let n=1700+Math.random()*900;le(n,{dur:.3,vol:.06,wet:.5}),le(n*2.76,{dur:.12,vol:.02,wet:.4})},shimmer:()=>[659,784,988,1175,1319,1568].forEach((n,t)=>le(n,{dur:1.3,vol:.04,attack:.01,delay:t*.08,wet:.8})),plop:()=>le(280+Math.random()*140,{dur:.16,vol:.13,to:820,attack:.012,wet:.45}),thud:()=>{le(105,{dur:.2,vol:.2,type:"triangle",to:52}),Ke({dur:.08,vol:.05,f:500,q:.8,src:Ni})},paper:()=>{Ke({dur:.34,vol:.09,f:2800,q:.6,to:1100,attack:.05,wet:.2}),Ke({dur:.12,vol:.05,f:5e3,q:1,delay:.12})},tink:()=>{let n=2300+Math.random()*1400;le(n,{dur:.5,vol:.05,wet:.7}),le(n*1.5,{dur:.3,vol:.02,wet:.6})},breath:()=>Ke({dur:1.1,vol:.13,f:900,q:.5,to:400,attack:.35,wet:.2}),shake:()=>{for(let n=0;n<9;n++)Ke({dur:.05,vol:.09,f:3800,q:1.2,delay:n*.055})},blip:()=>le(420+Math.random()*500,{dur:.05,vol:.03,type:"square"})};function qt(n){!Nt||Hs||Nt.state!=="running"||wf[n]?.()}var pn={src:null,filter:null,gain:null,cfg:null,level:0,init(){this.src=Nt.createBufferSource(),this.src.buffer=Qi,this.src.loop=!0,this.filter=Nt.createBiquadFilter(),this.gain=Nt.createGain(),this.gain.gain.value=0,this.src.connect(this.filter),this.filter.connect(this.gain),this.gain.connect(wn),this.src.start()},start(n){Nt&&(this.cfg=Sf[n]||null,this.cfg&&(this.filter.type=this.cfg.type,this.filter.frequency.value=this.cfg.f,this.filter.Q.value=this.cfg.q,this.gain.gain.setTargetAtTime(this.cfg.g*.25,Nt.currentTime,.02)))},move(n){if(!Nt||!this.cfg)return;let t=Math.min(1,n/1.6),e=this.cfg,i=Nt.currentTime,s=e.crackle?.35+Math.random()*1.3:1;this.gain.gain.setTargetAtTime(e.g*(.25+t*.85)*s,i,.03),this.filter.frequency.setTargetAtTime(e.f+e.sweep*t,i,.05)},end(){!Nt||!this.cfg||(this.gain.gain.setTargetAtTime(0,Nt.currentTime,.08),this.cfg=null)}},Di=null;function wh(n){if(Nt){if(!Di){let t=Nt.createOscillator(),e=Nt.createGain();t.type="sawtooth";let i=Nt.createBiquadFilter();i.type="lowpass",i.frequency.value=340,e.gain.value=0,t.connect(i),i.connect(e),e.connect(wn),t.start(),Di={o:t,g:e}}Di.o.frequency.setTargetAtTime(38+n*62,Nt.currentTime,.1),Di.g.gain.setTargetAtTime(n*.035,Nt.currentTime,.1)}}function Jo(){if(!Di)return;let{o:n,g:t}=Di;t.gain.setTargetAtTime(0,Nt.currentTime,.1),n.stop(Nt.currentTime+.6),Di=null}var yh=[220,247,294,330,370,440,494,587,659];function hi(n,t,e,i,s,r){let a=Nt.createBufferSource(),o=Nt.createBiquadFilter(),l=Nt.createGain();return a.buffer=n,a.loop=!0,o.type=t,o.frequency.value=e,o.Q.value=i,l.gain.value=s,a.connect(o),o.connect(l),l.connect(r),a.start(0,Math.random()*2),{s:a,f:o,g:l}}function Gs(n,t,e,i,s){let r=Nt.createOscillator(),a=Nt.createGain();r.frequency.value=i,a.gain.value=e,n.value=t,r.connect(a),a.connect(n),r.start(),s.push(r)}function _h(n,t,e,i){n.forEach((s,r)=>{let a=Nt.createOscillator(),o=Nt.createGain();a.frequency.value=s,a.detune.value=(r-1)*4,a.connect(o),o.connect(e);let l=Nt.createGain();l.gain.value=.5,o.connect(l),l.connect(Ji),Gs(o.gain,t,t*.9,.03+r*.017,i),a.start(),i.push(a)})}var Tf={studio(n,t,e){t.push(hi(Ni,"lowpass",280,.3,.1,n).s),_h([110,165,247],.012,n,t),e(7,13,()=>le(yh[Math.floor(Math.random()*yh.length)]*2,{dur:2.4,vol:.016,attack:.02,wet:1,pan:Math.random()-.5}))},rain(n,t,e){let i=hi(Qi,"bandpass",2600,.4,.028,n);t.push(i.s,hi(Ni,"lowpass",300,.4,.12,n).s),Gs(i.g.gain,.028,.01,.09,t),e(.15,.9,()=>Ke({dur:.03,vol:.02+Math.random()*.03,f:1700+Math.random()*3e3,q:5,wet:.25}))},water(n,t,e){let i=hi(Ni,"lowpass",460,1.2,.2,n);t.push(i.s),Gs(i.f.frequency,460,180,.11,t),e(1.2,4.5,()=>le(280+Math.random()*260,{dur:.15,vol:.022,to:640+Math.random()*300,attack:.02,wet:.7}))},wind(n,t){let e=hi(Qi,"bandpass",620,1.4,.03,n);t.push(e.s,hi(Ni,"lowpass",220,.3,.09,n).s),Gs(e.f.frequency,620,300,.05,t),Gs(e.g.gain,.03,.018,.07,t)},night(n,t,e){t.push(hi(Ni,"lowpass",200,.3,.1,n).s),_h([82,123,185,277],.01,n,t),e(4,10,()=>le(1320+Math.random()*900,{dur:1.6,vol:.009,attack:.1,wet:1,pan:Math.random()*1.6-.8}))},hum(n,t){let e=Nt.createOscillator(),i=Nt.createGain();e.type="triangle",e.frequency.value=50,i.gain.value=.014,e.connect(i),i.connect(n),e.start(),t.push(e,hi(Qi,"bandpass",7400,2,.004,n).s)}};function Th(n){let t=Tf[n];if(!t||!Nt)return;let e=Nt.createGain();e.gain.value=1e-4,e.gain.exponentialRampToValueAtTime(.4,Nt.currentTime+1.6),e.connect(wn);let i=[],s=[];t(e,i,(a,o,l)=>{let c=()=>{s[0]=setTimeout(()=>{!Hs&&!document.hidden&&l(),c()},(a+Math.random()*(o-a))*1e3)};c()}),Vs={name:n,out:e,stops:i,timers:s}}function Ef(){if(!Vs)return;let n=Vs;Vs=null,n.timers.forEach(clearTimeout),n.out.gain.setTargetAtTime(1e-4,Nt.currentTime,.4),setTimeout(()=>{n.stops.forEach(t=>{try{t.stop()}catch{}}),n.out.disconnect()},2200)}function Ws(n){Or!==n&&(Or=n,Nt&&(Ef(),Th(n)))}var st=Math.PI*2,sn=["#16130f","#f2efe6","#6d7a86","#b8a98c","#8a4a22","#c7562e","#d92b1f","#f2672a","#f2b705","#f7e34a","#8fd14f","#0f7a5a","#1fa39a","#35c9e0","#1f4fd8","#1c2a6e","#7a3db8","#b83a9c","#e0308a","#ff8fb1"],At=(n,t=0,e=1)=>Math.min(e,Math.max(t,n)),zt=(n,t,e)=>n+(t-n)*e,Ui=(n,t,e)=>{let i=At((e-n)/(t-n));return i*i*(3-2*i)},Fe=(n,t,e,i)=>Math.hypot(n-e,t-i),qs=(n,t=Math.random)=>n[Math.floor(t()*n.length)];function Ie(n=1){let t=n>>>0||1;return()=>{t=t+1831565813>>>0;let e=t;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}}function De(n=1){let t=Ie(n),e=new Float32Array(65536);for(let s=0;s<e.length;s++)e[s]=t();let i=(s,r)=>e[(s&255)<<8|r&255];return(s,r)=>{let a=Math.floor(s),o=Math.floor(r),l=s-a,c=r-o,u=l*l*(3-2*l),f=c*c*(3-2*c);return zt(zt(i(a,o),i(a+1,o),u),zt(i(a,o+1),i(a+1,o+1),u),f)}}function rn(n){let t=parseInt(n.slice(1),16);return[t>>16&255,t>>8&255,t&255]}function Ct(n,t){let e=document.createElement("canvas");return e.width=Math.max(1,Math.round(n)),e.height=Math.max(1,Math.round(t)),e}var Af=()=>Math.min(window.devicePixelRatio||1,2);function Eh({stage:n,dock:t,tipEl:e,toast:i,timbre:s="none"}){let r=[],a=new Set,o=0,l=!0,c=new Set,u=performance.now(),f=m=>{if(!l)return;let M=Math.min(.05,(m-u)/1e3);u=m;for(let y of c)y(M,m/1e3);o=requestAnimationFrame(f)},h=(m,M,y,w)=>{m.addEventListener(M,y,w),r.push(()=>m.removeEventListener(M,y,w))},d=()=>n.getBoundingClientRect(),p=()=>a.forEach(m=>m()),T=new ResizeObserver(p);T.observe(n),r.push(()=>T.disconnect());let x={stage:n,dock:t,on:h,toast:i,snapshot:null,clear:null,undo:null,surface({aspect:m=null,bleed:M=!1,paper:y=!1,maxPx:w=2400,scale:I=1,bg:L=null}={}){let g=()=>{let b=d(),P=M?0:16,A=M?0:66,N=M?0:80;return{x:P,y:A,w:b.width-P*2,h:b.height-A-N}},_=b=>m?b.w/b.h>m?{w:b.h*m,h:b.h}:{w:b.w,h:b.w/m}:{w:b.w,h:b.h},U=g(),C=_(U),F=Math.round(C.w),E=Math.round(C.h),O=Math.min(Af()*I,w/Math.max(F,E)),D=document.createElement("div");D.className="surface"+(y?" paper":""),L&&(D.style.background=L),n.appendChild(D);let R=()=>{let b=g(),P,A;if(m)({w:P,h:A}=_(b));else{let N=Math.min(b.w/F,b.h/E);P=F*N,A=E*N}D.style.width=P+"px",D.style.height=A+"px",D.style.left=b.x+(b.w-P)/2+"px",D.style.top=b.y+(b.h-A)/2+"px"};R(),a.add(R);let B={el:D,W:F,H:E,px:O,layer({gl:b=!1,alpha:P=!0,hit:A=!0,resolution:N=1}={}){let v=document.createElement("canvas");if(v.width=Math.round(F*O*N),v.height=Math.round(E*O*N),A||(v.className="nohit"),D.appendChild(v),b)return{canvas:v};let G=v.getContext("2d",{alpha:P,willReadFrequently:!1});return G.scale(O*N,O*N),G.lineCap="round",G.lineJoin="round",{canvas:v,g:G}},buffer(b=1,P={}){let A=Ct(F*O*b,E*O*b),N=A.getContext("2d",P);return N.scale(O*b,O*b),N.lineCap="round",N.lineJoin="round",{canvas:A,g:N}},pointer(b){x.driver=x.driver||{s:B,h:b};let P=!1,A=null,N=G=>{let q=D.getBoundingClientRect();return{x:(G.clientX-q.left)/q.width*F,y:(G.clientY-q.top)/q.height*E,pressure:G.pressure||.5,shift:G.shiftKey,alt:G.altKey,button:G.button,type:G.pointerType}};h(D,"pointerdown",G=>{if(!(G.button>0)){P=!0;try{D.setPointerCapture(G.pointerId)}catch{}G.preventDefault(),x.dismissTip(),x.onTouch?.(),pn.start(s),A={x:G.clientX,y:G.clientY,t:performance.now()},b.down?.(N(G))}}),h(D,"pointermove",G=>{if(!P){b.hover?.(N(G));return}let q=performance.now();pn.move(Math.hypot(G.clientX-A.x,G.clientY-A.y)/Math.max(1,q-A.t)),A={x:G.clientX,y:G.clientY,t:q};let S=G.getCoalescedEvents?.()||[];if(S.length>1)for(let V of S)b.move?.(N(V));else b.move?.(N(G))});let v=G=>{P&&(P=!1,pn.end(),b.up?.(N(G)))};h(D,"pointerup",v),h(D,"pointercancel",v),h(D,"pointerleave",G=>{P||b.leave?.(N(G))})}};return B},rasterUndo(m,M=16){let y=[],w=m.getContext("2d"),I=()=>{let L=Ct(m.width,m.height);L.getContext("2d").drawImage(m,0,0),y.push(L),y.length>M&&y.shift()};return x.undo=()=>{let L=y.pop();L&&(w.save(),w.setTransform(1,0,0,1,0,0),w.globalCompositeOperation="copy",w.drawImage(L,0,0),w.restore())},I},loop(m){return c.add(m),o||(u=performance.now(),o=requestAnimationFrame(f)),()=>c.delete(m)},hint(m){e.textContent=m,e.classList.remove("off");let M=setTimeout(x.dismissTip,7e3);r.push(()=>clearTimeout(M))},dismissTip(){e.classList.add("off")},ui:{sep(){let m=document.createElement("div");m.className="dock__sep",t.appendChild(m)},swatches(m,M,y,{custom:w=!0}={}){let I=document.createElement("div");I.className="sw";let L=m.map(_=>{let U=document.createElement("button");return U.style.background=_,U.setAttribute("aria-label",`Colour ${_}`),U.onclick=()=>g(_,!0),I.appendChild(U),[_,U]}),g=(_,U)=>{L.forEach(([C,F])=>F.classList.toggle("on",C===_)),U&&y(_)};if(g(M),w){let _=document.createElement("label");_.className="sw__more",_.title="Any colour you like";let U=document.createElement("input");U.type="color",U.value=M.length===7?M:"#e0308a",U.setAttribute("aria-label","Any colour you like"),U.oninput=()=>g(U.value,!0),_.appendChild(U),I.appendChild(_)}return t.appendChild(I),{set:_=>g(_,!1)}},slider(m,M,y,w,I,L=1){let g=document.createElement("label");g.className="ctl",g.textContent=m;let _=document.createElement("input");return Object.assign(_,{type:"range",min:M,max:y,step:L,value:w}),_.oninput=()=>I(+_.value),g.appendChild(_),t.appendChild(g),_},seg(m,M,y){let w=document.createElement("div");w.className="seg";let I=m.map(g=>{let[_,U]=Array.isArray(g)?g:[g,g],C=document.createElement("button");return C.textContent=U,C.onclick=()=>{L(_),y(_)},w.appendChild(C),[_,C]}),L=g=>I.forEach(([_,U])=>U.classList.toggle("on",_===g));return L(M),t.appendChild(w),{set:L}},select(m,M,y){let w=document.createElement("select");return w.className="pick",m.forEach(I=>{let[L,g]=Array.isArray(I)?I:[I,I];w.add(new Option(g,L,!1,L===M))}),w.onchange=()=>y(w.value),t.appendChild(w),w},button(m,M,y=""){let w=document.createElement("button");return w.className="btn "+y,w.textContent=m,w.onclick=M,t.appendChild(w),w},toggle(m,M,y){let w=document.createElement("button");return w.className="btn"+(M?" on":""),w.textContent=m,w.setAttribute("aria-pressed",M),w.onclick=()=>{M=!M,w.classList.toggle("on",M),w.setAttribute("aria-pressed",M),y(M)},t.appendChild(w),w},text(m,M,y=""){let w=document.createElement("input");return w.className="txt",w.type="text",w.value=m,w.placeholder=y,w.spellcheck=!1,w.oninput=()=>M(w.value),w.addEventListener("keydown",I=>I.stopPropagation()),t.appendChild(w),w},readout(m=""){let M=document.createElement("span");return M.className="readout",M.textContent=m,t.appendChild(M),M}},destroy(){l=!1,cancelAnimationFrame(o),c.clear(),a.clear(),r.forEach(m=>m()),n.replaceChildren(),t.replaceChildren(),t.className="dock"}};return x}function Oi(n,{dur:t=1.4,vol:e=.18,type:i="triangle",pan:s=0}={}){let r=Zo();if(!r)return;let a=r.currentTime,o=r.createOscillator(),l=r.createGain();o.type=i,o.frequency.setValueAtTime(n,a),l.gain.setValueAtTime(0,a),l.gain.linearRampToValueAtTime(e,a+.006),l.gain.exponentialRampToValueAtTime(1e-4,a+t);let c=l;if(r.createStereoPanner){let u=r.createStereoPanner();u.pan.value=s,l.connect(u),c=u}o.connect(l),c.connect(Sh()),o.start(a),o.stop(a+t+.05)}function Je(n,t,e,{seed:i=3,alpha:s=.05,scale:r=1}={}){let a=Ie(i),o=Math.floor(t*e/26);n.save();for(let l=0;l<o;l++){let c=a()>.5?255:0;n.fillStyle=`rgba(${c},${c},${c},${s*a()})`,n.fillRect(a()*t,a()*e,r*(.6+a()*1.4),r*(.6+a()*1.4))}n.restore()}var Cf=`#version 300 es
in vec2 p; out vec2 uv;
void main(){ uv = p*.5+.5; gl_Position = vec4(p,0.,1.); }`;function Fn(n,t={}){let e=n.getContext("webgl2",{antialias:!1,alpha:!1,preserveDrawingBuffer:!0,...t});if(!e)return null;let i=e.createBuffer();return e.bindBuffer(e.ARRAY_BUFFER,i),e.bufferData(e.ARRAY_BUFFER,new Float32Array([-1,-1,3,-1,-1,3]),e.STATIC_DRAW),e}function He(n,t){let e=(a,o)=>{let l=n.createShader(a);if(n.shaderSource(l,o),n.compileShader(l),!n.getShaderParameter(l,n.COMPILE_STATUS))throw new Error(n.getShaderInfoLog(l));return l},i=n.createProgram();if(n.attachShader(i,e(n.VERTEX_SHADER,Cf)),n.attachShader(i,e(n.FRAGMENT_SHADER,`#version 300 es
precision highp float;
`+t)),n.bindAttribLocation(i,0,"p"),n.linkProgram(i),!n.getProgramParameter(i,n.LINK_STATUS))throw new Error(n.getProgramInfoLog(i));let s={},r=a=>a in s?s[a]:s[a]=n.getUniformLocation(i,a);return{use(){return n.useProgram(i),n.enableVertexAttribArray(0),n.vertexAttribPointer(0,2,n.FLOAT,!1,0,0),this},f(a,...o){return n[`uniform${o.length}f`](r(a),...o),this},i(a,o){return n.uniform1i(r(a),o),this}}}function mn(n){n.drawArrays(n.TRIANGLES,0,3)}function Fi(n,{filter:t=n.LINEAR,wrap:e=n.CLAMP_TO_EDGE}={}){let i=n.createTexture();return n.bindTexture(n.TEXTURE_2D,i),n.texParameteri(n.TEXTURE_2D,n.TEXTURE_MIN_FILTER,t),n.texParameteri(n.TEXTURE_2D,n.TEXTURE_MAG_FILTER,t),n.texParameteri(n.TEXTURE_2D,n.TEXTURE_WRAP_S,e),n.texParameteri(n.TEXTURE_2D,n.TEXTURE_WRAP_T,e),i}function ji(n,t,e,i){n.activeTexture(n.TEXTURE0+e),n.bindTexture(n.TEXTURE_2D,t),n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,!0),n.texImage2D(n.TEXTURE_2D,0,n.RGBA,n.RGBA,n.UNSIGNED_BYTE,i),n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,!1)}function gn(n,t,e){n.activeTexture(n.TEXTURE0+e),n.bindTexture(n.TEXTURE_2D,t)}function kr(n,t,e,i=n.REPEAT){if(!n.getExtension("EXT_color_buffer_float")&&!n.getExtension("EXT_color_buffer_half_float"))return null;n.getExtension("OES_texture_float_linear");let s=()=>{let a=Fi(n,{filter:n.LINEAR,wrap:i});n.texImage2D(n.TEXTURE_2D,0,n.RGBA16F,t,e,0,n.RGBA,n.HALF_FLOAT,null);let o=n.createFramebuffer();return n.bindFramebuffer(n.FRAMEBUFFER,o),n.framebufferTexture2D(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,a,0),{tex:a,fbo:o}},r={a:s(),b:s(),w:t,h:e,swap(){let a=r.a;r.a=r.b,r.b=a}};return n.bindFramebuffer(n.FRAMEBUFFER,null),r}var Br=`
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
}`;var Rf=sn;function Qo(n){let t=n.surface({paper:!0,bg:"#efe9dc",maxPx:1800}),{W:e,H:i,px:s}=t,r=t.layer({gl:!0}),a=t.buffer(),o=t.buffer(),l=Fn(r.canvas),c=()=>{a.g.fillStyle="#efe9dc",a.g.fillRect(0,0,e,i),o.g.fillStyle="#080000",o.g.fillRect(0,0,e,i),o.g.fillStyle="rgba(30,0,0,.5)";for(let E=0;E<e;E+=3)o.g.fillRect(E,0,1,i);for(let E=0;E<i;E+=3)o.g.fillRect(0,E,e,1)};c();let u=He(l,Br),f=Fi(l),h=Fi(l),d="#d92b1f",p=7,T=0,x=!0,m={x:e*.3,y:i*.2,down:!1,still:0},M=[],y=[];function w(E,O,D,R=d){a.g.fillStyle=R,a.g.beginPath(),a.g.arc(E,O,D,0,st),a.g.fill();let B=o.g.createRadialGradient(E,O,D*.15,E,O,D*1.12);B.addColorStop(0,"rgba(235,255,0,.7)"),B.addColorStop(.6,"rgba(170,255,0,.5)"),B.addColorStop(1,"rgba(0,200,0,0)"),o.g.fillStyle=B,o.g.beginPath(),o.g.arc(E,O,D*1.12,0,st),o.g.fill(),x=!0}function I(E,O,D,R,B,b=d){let P=Math.max(1,Math.ceil(Fe(E,O,D,R)/Math.max(1,B*.45)));for(let A=0;A<=P;A++){let N=A/P;w(zt(E,D,N),zt(O,R,N),B*(.8+Math.random()*.4),b)}}let L=(E,O,D,R,B)=>M.push({x:E,y:O,vx:D,vy:R,r:B,t:.05+Math.random()*.18,c:d});function g(E){let O=At(Math.hypot(E.vx,E.vy)/900,0,1);if(w(E.x,E.y,E.r,E.c),O>.2){let D=Math.atan2(E.vy,E.vx),R=E.r*(2+O*5),B=Math.max(3,Math.ceil(R/Math.max(.8,E.r*.4)));for(let P=1;P<=B;P++){let A=P/B;w(E.x+Math.cos(D)*R*A,E.y+Math.sin(D)*R*A,Math.max(.4,E.r*(1-A)**1.4),E.c)}let b=Math.floor(Math.random()*3);for(let P=0;P<b;P++){let A=D+(Math.random()-.5)*.9,N=R*(1.1+Math.random()*1.6);w(E.x+Math.cos(A)*N,E.y+Math.sin(A)*N,E.r*(.12+Math.random()*.3),E.c)}}E.r>6&&Math.random()<.5&&y.push({x:E.x,y:E.y,r:E.r*.42,life:1,c:E.c,wob:Math.random()*st})}t.pointer({down(E){C(),m.down=!0,m.x=E.x,m.y=E.y,m.still=0,w(E.x,E.y,p*.9)},move(E){let O=E.x-m.x,D=E.y-m.y,R=Math.hypot(O,D),B=At(p*(1.15-R/44),p*.16,p*1.25);I(m.x,m.y,E.x,E.y,B);let b=Math.min(6,Math.floor(R/7));for(let P=0;P<b;P++){let A=Math.atan2(D,O)+(Math.random()-.5)*(.45+Math.random()*.5),N=(R*16+200)*(.3+Math.random());L(E.x,E.y,Math.cos(A)*N,Math.sin(A)*N,p*(.1+Math.random()*Math.random()*.75))}m.x=E.x,m.y=E.y,R>2&&(m.still=0)},hover(E){m.x=E.x,m.y=E.y},up(){m.down=!1}}),n.loop(E=>{if(m.down&&(m.still+=E,m.still>.12)){let R=p*(1+Math.min(4,m.still*2.2));w(m.x+(Math.random()-.5)*3,m.y+(Math.random()-.5)*3,R),m.still>.9&&Math.random()<.06&&y.push({x:m.x+(Math.random()-.5)*R,y:m.y+R*.7,r:p*.5,life:1.3,c:d,wob:Math.random()*st})}for(let R=M.length-1;R>=0;R--){let B=M[R];B.t-=E,B.x+=B.vx*E,B.y+=B.vy*E,B.t<=0&&(g(B),M.splice(R,1))}let O=Math.sin(T),D=Math.cos(T);for(let R=y.length-1;R>=0;R--){let B=y[R];B.wob+=E*3,B.x+=(O*62+Math.sin(B.wob)*7)*E*B.life,B.y+=D*62*E*B.life,B.life-=E*(.32+Math.random()*.2),w(B.x,B.y,Math.max(.6,B.r*At(B.life,.3,1)),B.c),(B.life<=0||B.y>i+8||B.x<-8||B.x>e+8)&&y.splice(R,1)}x?(ji(l,f,0,a.canvas),ji(l,h,1,o.canvas),x=!1):(gn(l,f,0),gn(l,h,1)),l.viewport(0,0,r.canvas.width,r.canvas.height),u.use().i("color",0).i("height",1).f("px",1/(e*s),1/(i*s)).f("light",(m.x/e-.5)*2.2,-(m.y/i-.5)*2.2,.9).f("strength",1.9).f("gloss",60).f("spec",.62).f("grain",0).f("tint",1,1,1),mn(l)});let _=[],U=E=>{let O=Ct(E.width,E.height);return O.getContext("2d").drawImage(E,0,0),O},C=()=>{_.push([U(a.canvas),U(o.canvas)]),_.length>8&&_.shift()},F=(E,O)=>{E.g.save(),E.g.setTransform(1,0,0,1,0,0),E.g.drawImage(O,0,0),E.g.restore()};n.undo=()=>{let E=_.pop();E&&(y.length=0,M.length=0,F(a,E[0]),F(o,E[1]),x=!0)},n.clear=()=>{C(),y.length=0,M.length=0,c(),x=!0},n.snapshot=()=>r.canvas,n.ui.swatches(Rf,d,E=>{d=E}),n.ui.sep(),n.ui.slider("Load",2,16,p,E=>{p=E}),n.ui.slider("Tilt",-60,60,0,E=>{T=E*Math.PI/180}),n.ui.button("Let rip",()=>{C();for(let E=0;E<4;E++){let O=Math.random()*e,D=Math.random()*i,R=Math.random()*st;for(let B=0;B<70;B++){R+=(Math.random()-.5)*1.1;let b=At(O+Math.cos(R)*26,0,e),P=At(D+Math.sin(R)*26,0,i);I(O,D,b,P,p*(.2+Math.pow(Math.random(),3))),Math.random()<.3&&L(b,P,Math.cos(R)*700,Math.sin(R)*700,p*Math.random()*.8),O=b,D=P}}}),n.hint("Fling fast for spatter, hold still to pool. The light follows your hand.")}var Ah={Tenmoku:["#6e3f22","#2a1712","#120c0d","#8a5a34"],Celadon:["#b9d4c4","#7fae9c","#4d7f70","#d7e6da"],Ash:["#d9d3c7","#a79f92","#6d675f","#ece7dc"],Cobalt:["#3a63a8","#1b3674","#0e1c44","#7da0d8"],Oxblood:["#a8332c","#6d1a1c","#2c0b0f","#c9705a"],Jade:["#4fa883","#1f6a55","#0c3029","#9fd4b8"],Honey:["#e8b64a","#b37a1e","#5a370d","#f4d690"],Plum:["#7d4a9c","#44235f","#1d0e2c","#b692cc"],Blush:["#ecc3bd","#cf8f8c","#8a5356","#f6e1dc"],Midnight:["#2c3448","#141a2a","#080b14","#59647e"]},Ch={Gold:["#fff4b0","#e2ad2c","#a8701a"],Silver:["#ffffff","#c6ccd4","#7b8290"],Copper:["#ffd2b0","#d67a44","#8c4522"],Rose:["#ffe0dc","#e89a9a","#a05a64"],Bronze:["#f0d09a","#a8783c","#5e3f1c"],Platinum:["#ffffff","#dfe6ee","#9fb0c4"]};function jo(n){let t=n.surface({bleed:!0}),{W:e,H:i,px:s}=t,{canvas:r,g:a}=t.layer({alpha:!1}),o=Math.min(e,i)*.34,l=e/2,c=i/2+6,u="Tenmoku",f="Gold",h=1,d=!0,p="whole",T,x=[],m=[],M=[],y=0,w=null,I={x:l,y:c},L=0,g=Ct(e*s,i*s);{let v=g.getContext("2d");v.scale(s,s);let G=v.createRadialGradient(e/2,i*.42,40,e/2,i/2,Math.max(e,i)*.75);G.addColorStop(0,"#d8cdb8"),G.addColorStop(.6,"#b6a78e"),G.addColorStop(1,"#7d705c"),v.fillStyle=G,v.fillRect(0,0,e,i),Je(v,e,i,{alpha:.05,seed:5})}function _(){let v=Math.ceil(o*2+8),G=Ct(v*s,v*s),q=G.getContext("2d");q.scale(s,s);let S=v/2,[V,W,Z,Y]=Ah[u],j=q.createRadialGradient(S-o*.26,S-o*.3,o*.05,S,S,o);j.addColorStop(0,V),j.addColorStop(.5,W),j.addColorStop(.86,Z),j.addColorStop(.97,Z),j.addColorStop(1,Y),q.fillStyle=j,q.beginPath(),q.arc(S,S,o,0,st),q.fill(),q.save(),q.beginPath(),q.arc(S,S,o*.985,0,st),q.clip();let ct=De(h*7+3);for(let ht=0;ht<2600;ht++){let Rt=Math.random()*st,Ut=Math.sqrt(Math.random())*o,Ft=S+Math.cos(Rt)*Ut,Jt=S+Math.sin(Rt)*Ut,ce=ct(Ft*.03,Jt*.03);q.fillStyle=`rgba(${ce>.5?"255,235,205":"0,0,0"},${Math.abs(ce-.5)*.09})`,q.beginPath(),q.arc(Ft,Jt,1+Math.random()*7,0,st),q.fill()}let ut=q.createRadialGradient(S,S,o*.08,S,S,o*.46);return ut.addColorStop(0,"rgba(0,0,0,.42)"),ut.addColorStop(1,"rgba(0,0,0,0)"),q.fillStyle=ut,q.fillRect(0,0,v,v),q.fillStyle="rgba(255,255,255,.1)",q.beginPath(),q.ellipse(S-o*.34,S-o*.42,o*.2,o*.08,-.7,0,st),q.fill(),q.restore(),{c:G,d:v}}function U(v,G,q,S,V){let W=(G+S)/2,Z=(q+V)/2,Y=S-G,j=V-q,ct=ht=>(ht[0]-W)*Y+(ht[1]-Z)*j,ut=[];for(let ht=0;ht<v.length;ht++){let Rt=v[ht],Ut=v[(ht+1)%v.length],Ft=ct(Rt),Jt=ct(Ut);if(Ft<=0&&ut.push(Rt),Ft<0!=Jt<0){let ce=Ft/(Ft-Jt);ut.push([zt(Rt[0],Ut[0],ce),zt(Rt[1],Ut[1],ce)])}}return ut}let C=new Map,F=v=>`${Math.round(v[0]*2)},${Math.round(v[1]*2)}`;function E(v,G){let q=F(v),S=F(G),V=q<S,W=V?q+"|"+S:S+"|"+q,Z=C.get(W);if(!Z){let Y=V?v:G,j=V?G:v,ct=Ie([...W].reduce((Ft,Jt)=>Ft*31+Jt.charCodeAt(0)>>>0,7)),ut=Fe(Y[0],Y[1],j[0],j[1]),ht=Math.max(2,Math.floor(ut/11)),Rt=-(j[1]-Y[1])/ut,Ut=(j[0]-Y[0])/ut;Z=[Y];for(let Ft=1;Ft<ht;Ft++){let Jt=Ft/ht,ce=(ct()-.5)*9*Math.sin(Jt*Math.PI);Z.push([zt(Y[0],j[0],Jt)+Rt*ce,zt(Y[1],j[1],Jt)+Ut*ce])}Z.push(j),C.set(W,Z)}return V?Z:[...Z].reverse()}function O(){C.clear();let v=[];for(let S=0;S<72;S++)v.push([Math.cos(S/72*st)*o,Math.sin(S/72*st)*o]);let G=m.map((S,V)=>{let W=v;return m.forEach((Z,Y)=>{V!==Y&&(W=U(W,S[0],S[1],Z[0],Z[1]))}),W}).filter(S=>S.length>2),q=new Map;x=G.map((S,V)=>{let W=[];for(let ut=0;ut<S.length;ut++){let ht=S[ut],Rt=S[(ut+1)%S.length];if(Math.hypot(ht[0],ht[1])>o-.6&&Math.hypot(Rt[0],Rt[1])>o-.6){W.push(ht);continue}let Ut=E(ht,Rt);W.push(...Ut.slice(0,-1));let Ft=[F(ht),F(Rt)].sort().join("|");q.has(Ft)||q.set(Ft,{pts:Ut,owners:[]}),q.get(Ft).owners.push(V)}let Z=0,Y=0;W.forEach(ut=>{Z+=ut[0],Y+=ut[1]}),Z/=W.length,Y/=W.length;let j=Math.atan2(Y,Z)+(Math.random()-.5)*.5,ct=o*(.14+Math.random()*.34);return{id:V,path:W,gx:Z,gy:Y,x:Math.cos(j)*ct,y:Math.sin(j)*ct,a:(Math.random()-.5)*.7,home:!1}}),M=[...q.values()].filter(S=>S.owners.length===2).map(S=>({...S,fill:0}))}function D(v,G){let q=v-l,S=G-c;if(Math.hypot(q,S)>o||p==="mended")return;let V=p==="whole"?13:6;for(let W=0;W<V;W++){let Z=Math.random()*st,Y=Math.pow(Math.random(),1.6)*o*.85,j=q+Math.cos(Z)*Y,ct=S+Math.sin(Z)*Y;Math.hypot(j,ct)<o*1.02&&m.length<34&&m.push([j,ct])}for(;m.length<8;){let W=Math.random()*st,Z=Math.random()*o;m.push([Math.cos(W)*Z,Math.sin(W)*Z])}p="broken",y=1,qt("crack"),O(),n.dismissTip(),setTimeout(()=>{d&&n.hint("Drag each piece back to where it belongs. Metal fills the seam as they meet.")},900)}let R=v=>{a.beginPath(),v.forEach(([G,q],S)=>S?a.lineTo(G,q):a.moveTo(G,q)),a.closePath()};function B(v,G){for(let q=x.length-1;q>=0;q--){let S=x[q],V=Math.cos(-S.a),W=Math.sin(-S.a),Z=v-(l+S.gx+S.x),Y=G-(c+S.gy+S.y),j=Z*V-Y*W+S.gx,ct=Z*W+Y*V+S.gy;if(R(S.path),a.isPointInPath(j*s,ct*s))return S}return null}function b(v){a.save(),a.translate(l+v.gx+v.x,c+v.gy+v.y),a.rotate(v.a),a.translate(-v.gx,-v.gy),v.home||(a.save(),a.shadowColor="rgba(30,20,10,.55)",a.shadowBlur=w===v?30:14,a.shadowOffsetY=w===v?22:8,R(v.path),a.fillStyle="#000",a.fill(),a.restore()),R(v.path),a.save(),a.clip(),a.drawImage(T.c,-T.d/2,-T.d/2,T.d,T.d),a.restore(),v.home||(R(v.path),a.strokeStyle="#c9b08d",a.lineWidth=1.5,a.stroke()),a.restore()}function P(v){if(v.fill<=0)return;let G=Math.max(2,Math.ceil(v.pts.length*v.fill)),[q,S,V]=Ch[f],W=(Z,Y)=>{a.strokeStyle=Y,a.lineWidth=Z,a.beginPath();for(let j=0;j<G;j++)j?a.lineTo(l+v.pts[j][0],c+v.pts[j][1]):a.moveTo(l+v.pts[j][0],c+v.pts[j][1]);a.stroke()};a.lineCap="round",a.lineJoin="round",W(4.6,V),W(3,S),W(1.1,q);for(let Z=0;Z<G;Z+=3){let[Y,j]=v.pts[Z],ct=At(1-Fe(l+Y,c+j,I.x,I.y)/130);ct>0&&(a.fillStyle=`rgba(255,252,225,${ct*.9})`,a.beginPath(),a.arc(l+Y,c+j,1+ct*2.4,0,st),a.fill())}}function A(){h++,p="whole",x=[],m=[],M=[],T=_(),n.hint("Strike the bowl. Go on. Strike it again if you like.")}t.pointer({down(v){if(I=v,p==="broken"){let G=B(v.x,v.y);if(G){w=G,G.home=!1,G.grabX=v.x-G.x,G.grabY=v.y-G.y,x.splice(x.indexOf(G),1),x.push(G);return}}D(v.x,v.y)},move(v){I=v,w&&(w.x=v.x-w.grabX,w.y=v.y-w.grabY,w.a*=.92)},hover(v){I=v},up(){w&&(Math.hypot(w.x,w.y)<o*.16&&(w.x=0,w.y=0,w.a=0,w.home=!0,qt("clink")),w=null)}}),n.loop(v=>{a.save(),a.setTransform(1,0,0,1,0,0),a.drawImage(g,0,0),a.restore(),y>0&&(y=Math.max(0,y-v*3.4)),a.save(),a.translate((Math.random()-.5)*y*16,(Math.random()-.5)*y*16);let G=p==="broken"?x.filter(S=>S.home).length/x.length:1,q=a.createRadialGradient(l,c+o*.12,o*.7,l,c+o*.12,o*1.24);if(q.addColorStop(0,`rgba(40,28,16,${.5*G*G})`),q.addColorStop(1,"rgba(40,28,16,0)"),a.fillStyle=q,a.fillRect(0,0,e,i),p==="whole")a.drawImage(T.c,l-T.d/2,c-T.d/2,T.d,T.d);else{for(let S of x)S.home&&b(S);M.forEach(S=>{let V=S.owners.every(W=>x.find(Z=>Z.id===W)?.home);S.fill=V?Math.min(1,S.fill+v*1.5):Math.max(0,S.fill-v*4),P(S)});for(let S of x)S.home||b(S)}p==="broken"&&x.length&&x.every(S=>S.home)&&M.every(S=>S.fill>=1)&&(p="mended",L=1,qt("shimmer"),n.toast("Mended. It is worth more now.")),L>0&&(L=Math.max(0,L-v*.8),a.fillStyle=`rgba(255,240,190,${L*.35})`,a.beginPath(),a.arc(l,c,o*1.02,0,st),a.fill()),a.restore()}),n.clear=A,n.snapshot=()=>r,n.ui.select(Object.keys(Ah),u,v=>{u=v,T=_()}),n.ui.sep(),n.ui.select(Object.keys(Ch),f,v=>{f=v}),n.ui.sep(),n.ui.button("Gather all",()=>{p==="broken"&&x.forEach((v,G)=>setTimeout(()=>{if(!d)return;let q=v.x,S=v.y,V=v.a,W=performance.now(),Z=n.loop(()=>{let Y=At((performance.now()-W)/500),j=1-Math.pow(1-Y,3);v.x=zt(q,0,j),v.y=zt(S,0,j),v.a=zt(V,0,j),Y>=1&&(v.home=!0,qt("clink"),Z())})},G*90))}),n.ui.button("New bowl",A);let N=n.destroy;n.destroy=()=>{d=!1,N()},A()}var Rh=["#f4f1ea","#e9d9b5","#efb54a","#e58a3a","#c7562e","#a82e2a","#7a3e2c","#3a2a22","#b83a6a","#e78fb0","#7a4aa8","#2e3f8e","#2e6f8e","#5fb8c9","#264653","#2f8a6a","#5d9c59","#b9c94a"],tl={Flask:n=>n<.13?.125:n<.32?.125+Ui(.13,.32,n)*.305:.43-Math.pow(Math.max(0,n-.9)/.065,3)*.05,Tall:n=>n<.1?.1:n<.2?.1+Ui(.1,.2,n)*.2:.3-Math.pow(Math.max(0,n-.92)/.045,3)*.04,Gourd:n=>n<.08?.09:.1+Math.abs(Math.sin((n-.02)*6.1))*.3+n*.08};function el(n){let t=document.createElement("div");t.style.cssText="position:absolute;inset:0;background:radial-gradient(70% 60% at 50% 40%,#3b4652,#14181e 75%)",n.stage.appendChild(t);let e=n.surface({aspect:.62,maxPx:1400}),{W:i,H:s}=e,r=190,a=Math.round(r/.62),o=e.layer(),l=e.layer({hit:!1}),c=Ct(r,a),u=c.getContext("2d"),f=u.createImageData(r,a),h=new Uint32Array(f.data.buffer),d=new Uint32Array(r*a),p=new Uint8Array(r*a),T=new Uint8Array(r*a),x=Ie(11),m="Flask",M=Rh[1],y="pour",w=0,I=!1,L=14;function g(){p.fill(0);let P=tl[m];for(let A=0;A<a;A++){let N=A/a;if(N<.05||N>.965)continue;let v=P(N)*r,G=Math.floor(r/2-v),q=Math.ceil(r/2+v);for(let S=Math.max(0,G);S<Math.min(r,q);S++)p[A*r+S]=1}}let _=P=>{let[A,N,v]=rn(P),G=(x()-.5)*44,q=S=>At(Math.round(S+G),0,255);return(255<<24|q(v)<<16|q(N)<<8|q(A))>>>0},U={x:i/2,y:40,down:!1},C=P=>[Math.floor(P.x/i*r),Math.floor(P.y/s*a)];e.pointer({down(P){b(),U.down=!0,U.x=P.x,U.y=P.y},move(P){if(y==="poke"){let[A,N]=C(U),[v,G]=C(P),q=Math.max(Math.abs(v-A),Math.abs(G-N),1);for(let S=0;S<=q;S++)F(A+(v-A)*S/q,N+(G-N)*S/q)}U.x=P.x,U.y=P.y},hover(P){U.x=P.x,U.y=P.y},up(){U.down=!1}});function F(P,A){let N=Math.round(P),v=Math.round(A);for(let G=14;G>=-14;G--)for(let q=-2;q<=2;q++){let S=N+q,V=v+G;if(S<0||S>=r||V<1||V>=a-1)continue;let W=V*r+S;if(!d[W])continue;let Z=W+r*(3+Math.floor(x()*3));if(Z<d.length&&p[Z]&&!d[Z])d[Z]=d[W],d[W]=0;else{let Y=W+r;if(p[Y]){let j=d[Y];d[Y]=d[W],d[W]=j}}}}function E(){T.fill(0);for(let P=a-2;P>=0;P--){let A=x()<.5;for(let N=0;N<r;N++){let v=A?N:r-1-N,G=P*r+v,q=d[G];if(!q||T[G])continue;let S=G+r;if(p[S]&&!d[S]){d[S]=q,d[G]=0,T[S]=1;continue}let V=x()<.5+w*.5?1:-1,W=S+V,Z=S-V,Y=v+V>=0&&v+V<r&&p[W]&&!d[W],j=v-V>=0&&v-V<r&&p[Z]&&!d[Z];if((Y||j)&&x()<.86){let ct=Y?W:Z;d[ct]=q,d[G]=0,T[ct]=1}else if(w){V=w>0?1:-1;let ct=G+V;x()<Math.abs(w)&&v+V>=0&&v+V<r&&p[ct]&&!d[ct]&&(d[ct]=q,d[G]=0,T[ct]=1)}}}}function O(){if(!U.down||y!=="pour"||I)return;let[P]=C(U),A=Math.floor(a*.06),N=At(P,r/2-r*.1,r/2+r*.1);for(let v=0;v<L;v++){let G=Math.round(N+(x()-.5)*7),S=(A+Math.floor(x()*16))*r+G;p[S]&&!d[S]&&(d[S]=_(M))}}function D(){h.set(d),u.putImageData(f,0,0);let P=o.g;P.clearRect(0,0,i,s),P.imageSmoothingEnabled=!1,P.drawImage(c,0,0,i,s),P.imageSmoothingEnabled=!0}function R(){let P=l.g,A=tl[m];P.clearRect(0,0,i,s);let N=[];for(let q=0;q<=120;q++){let S=.05+q/120*.915;N.push([A(S)*i,S*s])}let v=()=>{P.beginPath(),N.forEach(([q,S],V)=>V?P.lineTo(i/2+q,S):P.moveTo(i/2+q,S)),[...N].reverse().forEach(([q,S])=>P.lineTo(i/2-q,S)),P.closePath()};P.save(),v(),P.fillStyle="rgba(215,235,245,.07)",P.fill(),P.clip();let G=P.createLinearGradient(i*.05,0,i*.95,0);if(G.addColorStop(0,"rgba(0,10,20,.5)"),G.addColorStop(.14,"rgba(255,255,255,.03)"),G.addColorStop(.24,"rgba(255,255,255,.17)"),G.addColorStop(.32,"rgba(255,255,255,.03)"),G.addColorStop(.5,"rgba(255,255,255,0)"),G.addColorStop(.88,"rgba(255,255,255,.07)"),G.addColorStop(1,"rgba(0,10,20,.5)"),P.fillStyle=G,P.fillRect(0,0,i,s),P.restore(),v(),P.strokeStyle="rgba(232,244,250,.72)",P.lineWidth=Math.max(2,i*.012),P.stroke(),I){let q=A(.05)*i,S=P.createLinearGradient(i/2-q,0,i/2+q,0);S.addColorStop(0,"#7b5a3a"),S.addColorStop(.45,"#c79a6a"),S.addColorStop(1,"#6d4f33"),P.fillStyle=S,P.beginPath(),P.roundRect(i/2-q*1.04,s*.008,q*2.08,s*.062,6),P.fill()}}n.loop(()=>{O(),E(),E(),D()});let B=[],b=()=>{B.push(d.slice()),B.length>12&&B.shift()};n.undo=()=>{let P=B.pop();P&&d.set(P)},n.clear=()=>{b(),d.fill(0),I=!1,R()},n.snapshot=()=>{let P=Ct(o.canvas.width,o.canvas.height),A=P.getContext("2d"),N=A.createRadialGradient(P.width/2,P.height*.4,10,P.width/2,P.height/2,P.height*.8);return N.addColorStop(0,"#3b4652"),N.addColorStop(1,"#14181e"),A.fillStyle=N,A.fillRect(0,0,P.width,P.height),A.drawImage(o.canvas,0,0),A.drawImage(l.canvas,0,0),P},g(),R(),n.ui.swatches(Rh,M,P=>{M=P}),n.ui.sep(),n.ui.seg([["pour","Pour"],["poke","Poke"]],y,P=>{y=P,e.el.style.cursor=P==="poke"?"grab":"crosshair"}),n.ui.slider("Tilt",-100,100,0,P=>{w=P/100,e.el.style.transform=`rotate(${P*.07}deg)`}),n.ui.seg(Object.keys(tl),m,P=>{m=P,d.fill(0),g(),R()}),n.ui.button("Cork",()=>{I=!I,R()}),n.hint("Hold to pour. Switch to Poke and push the stick down the glass.")}var ts={Harbour:{bath:"#e9dfc9",inks:["#1c425c","#b84a30","#e0aa46","#3a7a8c","#14202f","#f1e8d6","#7a3e5c","#5d8a5a","#d9754a","#9fc4d0"]},Peacock:{bath:"#0f2a2c",inks:["#1fa39a","#e6b93d","#c5426b","#2d5fb0","#f0e6cf","#123f46","#7bd0b0","#e87a3d","#6a3fb0","#d9e86a"]},Rosewater:{bath:"#f5e4dc",inks:["#c9546c","#7d2f4d","#e9a2a0","#3f5f7a","#f7f0e6","#d9894a","#a06ac0","#5fa89a","#e8c35a","#2e2a3a"]},Bookbinder:{bath:"#d9c7a3",inks:["#6d2a1d","#21352d","#a87a2a","#1d2a44","#e8dcc0","#9c4a2a","#4f6a3a","#7a2f4a","#c9a24a","#3a5a6d"]},Sunset:{bath:"#2a1540",inks:["#ff6a4d","#ffb347","#ff4f8b","#ffe08a","#7a3dd0","#3fd0d0","#f7f0e6","#c02a6a","#ff8fb1","#1f2f7a"]},Lagoon:{bath:"#dff2ee",inks:["#0f7a7a","#1f4fd8","#35c9b0","#f2b705","#e0308a","#14304a","#8fd14f","#f2672a","#7a3db8","#ffffff"]},Neon:{bath:"#0a0a12",inks:["#ff2fb0","#22e6ff","#c6ff3d","#ff8a1f","#8a5cff","#ffffff","#ff3d4f","#2fff9a","#ffe63d","#3d7aff"]}};function nl(n){let t=n.surface({aspect:1.42,paper:!0,maxPx:2e3}),{W:e,H:i}=t,{canvas:s,g:r}=t.layer({alpha:!1}),a=t.layer({hit:!1}),o="Harbour",l=ts[o].inks[0],c="drop",u=46,f=12,h=[],d=[],p=null,T=!1,x=!0;function m(b,P,A){let N=A*A;for(let v of h){let G=v.pts;for(let q=0;q<G.length;q+=2){let S=G[q]-b,V=G[q+1]-P,W=S*S+V*V||1e-4,Z=Math.sqrt(1+N/W);G[q]=b+S*Z,G[q+1]=P+V*Z}}}function M(b,P,A,N,v,G,q){let S=-N,V=A,W=Math.log(.01)/Math.log(G);for(let Z of h){let Y=Z.pts;for(let j=0;j<Y.length;j+=2){let ct=Math.abs((Y[j]-b)*S+(Y[j+1]-P)*V),ut=(Y[j]-b)*A+(Y[j+1]-P)*N;if(ct>W||Math.abs(ut)>q*2.2)continue;let ht=v*Math.pow(G,ct)*Math.exp(-(ut*ut)/(q*q));Y[j]+=A*ht,Y[j+1]+=N*ht}}}function y(b,P,A,N){for(let v of h){let G=v.pts;for(let q=0;q<G.length;q+=2){let S=G[q]-b,V=G[q+1]-P,W=Math.hypot(S,V),Z=A*Math.exp(-(W*W)/(N*N)),Y=Math.cos(Z),j=Math.sin(Z);G[q]=b+S*Y-V*j,G[q+1]=P+S*j+V*Y}}}function w(){for(let b of h){let P=b.pts;if(P.length>4e3)continue;let A=!1,N=[];for(let v=0;v<P.length;v+=2){let G=(v+2)%P.length;N.push(P[v],P[v+1]),Math.hypot(P[G]-P[v],P[G+1]-P[v+1])>5&&(N.push((P[v]+P[G])/2,(P[v+1]+P[G+1])/2),A=!0)}A&&(b.pts=N)}}let I=(b,P,A)=>{let v=new Array(192);for(let G=0;G<96;G++)v[G*2]=b+Math.cos(G/96*st)*A,v[G*2+1]=P+Math.sin(G/96*st)*A;return v};function L(b,P,A,N){h.push({pts:I(b,P,.5),colour:N}),qt("plop"),d.push({x:b,y:P,r:A,grown:.5})}function g(b){for(let P=d.length-1;P>=0;P--){let A=d[P],N=Math.min(A.r,A.grown+(A.r-A.grown)*Math.min(1,b*7)+.8),v=Math.sqrt(Math.max(0,N*N-A.grown*A.grown));v>.01&&m(A.x,A.y,v),A.grown=N,A.grown>=A.r-.01&&d.splice(P,1),x=!0}}function _(){r.fillStyle=ts[o].bath,r.fillRect(0,0,e,i);for(let b of h){let P=b.pts;r.fillStyle=b.colour,r.beginPath(),r.moveTo(P[0],P[1]);for(let A=2;A<P.length;A+=2)r.lineTo(P[A],P[A+1]);r.closePath(),r.fill()}}function U(b){let P=a.g;if(P.clearRect(0,0,e,i),T||p)return;let A=P.createLinearGradient(0,0,e,i),N=.5+Math.sin(b*.4)*.12;A.addColorStop(At(N-.25),"rgba(255,255,255,0)"),A.addColorStop(At(N),"rgba(255,255,255,.1)"),A.addColorStop(At(N+.25),"rgba(255,255,255,0)"),P.fillStyle=A,P.fillRect(0,0,e,i)}let C={x:0,y:0,down:!1,travelled:0};t.pointer({down(b){T||(D(),C.down=!0,C.x=b.x,C.y=b.y,C.travelled=0,c==="drop"&&L(b.x,b.y,u,l))},move(b){if(!C.down||T)return;let P=b.x-C.x,A=b.y-C.y,N=Math.hypot(P,A);if(N<1.5)return;let v=P/N,G=A/N;if(c==="rake"||c==="stylus"){let q=Math.ceil(N/5),S=N/q,V=Math.min(e,i)*.92/f;for(let W=1;W<=q;W++){let Z=C.x+P*W/q,Y=C.y+A*W/q;if(c==="stylus")M(Z,Y,v,G,S*.72,.955,44);else for(let j=0;j<f;j++){let ct=(j-(f-1)/2)*V;M(Z-G*ct,Y+v*ct,v,G,S*.66,.94,36)}w()}}else if(c==="swirl"){let q=P*(C.y-i/2)-A*(C.x-e/2)>0?-1:1;y(b.x,b.y,q*N*.012,90)}else C.travelled+=N,C.travelled>u*.8&&(C.travelled=0,L(b.x,b.y,u*.55,l));C.x=b.x,C.y=b.y,x=!0},up(){C.down=!1,w(),x=!0}});let F=Ct(s.width,s.height);function E(){_();let b=F.getContext("2d");b.setTransform(1,0,0,1,0,0),b.drawImage(s,0,0),b.scale(s.width/e,s.height/i),b.globalCompositeOperation="multiply",b.fillStyle="#fbf7ec",b.fillRect(0,0,e,i),b.globalCompositeOperation="source-over",Je(b,e,i,{alpha:.09,seed:2}),b.strokeStyle="rgba(246,240,226,.95)",b.lineWidth=Math.max(10,e*.018),b.strokeRect(0,0,e,i),b.setTransform(1,0,0,1,0,0),T=!0,n.toast("Printed. The bin skims the bath for another go.")}n.loop((b,P)=>{if(g(b),x&&(_(),x=!1,d.length||w()),U(P),T&&(r.save(),r.setTransform(1,0,0,1,0,0),r.drawImage(F,0,0),r.restore()),p){p.t+=b/1.6;let A=a.g,N=p.t;if(A.clearRect(0,0,e,i),N<.5){let v=At(N/.5);A.fillStyle="#f5efe1",A.fillRect(0,0,e*v,i);let G=A.createLinearGradient(e*v-60,0,e*v,0);G.addColorStop(0,"rgba(0,0,0,0)"),G.addColorStop(1,"rgba(0,0,0,.28)"),A.fillStyle=G,A.fillRect(e*v-60,0,60,i)}else{T||E();let v=At((N-.5)/.5);A.fillStyle="#f5efe1",A.fillRect(e*v,0,e*(1-v),i);let G=A.createLinearGradient(e*v,0,e*v+70,0);G.addColorStop(0,"rgba(0,0,0,.34)"),G.addColorStop(1,"rgba(0,0,0,0)"),A.fillStyle=G,A.fillRect(e*v,0,70,i)}p.t>=1&&(p=null)}});let O=[],D=()=>{O.push(h.map(b=>({...b,pts:b.pts.slice()}))),O.length>12&&O.shift()};n.undo=()=>{let b=O.pop();b&&!T&&(h=b,d=[],x=!0)},n.clear=()=>{h=[],d=[],T=!1,p=null,x=!0},n.snapshot=()=>T?F:s;let R=document.createElement("div");R.style.display="contents",n.dock.appendChild(R);let B=()=>{let b=new Set(n.dock.children);n.ui.swatches(ts[o].inks,l,P=>{l=P}),R.replaceChildren(...[...n.dock.children].filter(P=>!b.has(P)))};B(),n.ui.sep(),n.ui.seg([["drop","Drop"],["rake","Rake"],["stylus","Stylus"],["swirl","Swirl"]],c,b=>{c=b}),n.ui.slider("Size",12,110,u,b=>{u=b}),n.ui.slider("Tines",3,28,f,b=>{f=b}),n.ui.select(Object.keys(ts),o,b=>{o=b,l=ts[b].inks[0],B(),x=!0}),n.ui.button("Lay the paper",()=>{!p&&!T&&(p={t:0},qt("paper"))},"hot");for(let b=0;b<26;b++){let P=e*(.08+.84*Math.random()),A=i*(.08+.84*Math.random()),N=40+Math.random()*50;m(P,A,N),h.push({pts:I(P,A,N),colour:ts[o].inks[b%5]})}w(),n.hint("Tap to drop ink. Switch to Rake and drag across the bath. Then lay the paper.")}var il={Night:{sky:["#07101f","#10233f","#2a2342"],lights:["#ffb347","#ff5e62","#7ad7f0","#fff3c4","#ff8fb1"],fog:"rgb(174,190,208)"},Dawn:{sky:["#37436e","#b9708a","#f4b582"],lights:["#ffe2a8","#ffd0a0","#fff3c4"],fog:"rgb(226,216,214)"},Harbour:{sky:["#0b2233","#144058","#1f6372"],lights:["#ffd27a","#7fe0d0","#fff3c4","#ff7a59"],fog:"rgb(178,204,208)"},Dusk:{sky:["#1c1440","#6a2a7a","#e8724a"],lights:["#ffb35a","#ff6a8a","#ffe08a","#b08aff"],fog:"rgb(200,180,205)"},Neon:{sky:["#07040f","#1a0a3a","#3a0a4a"],lights:["#ff2fb0","#22e6ff","#c6ff3d","#ff8a1f","#8a5cff"],fog:"rgb(170,160,205)"},Forest:{sky:["#061a14","#0f3a2c","#2f6a4a"],lights:["#d9f27a","#ffe08a","#7af0b0"],fog:"rgb(180,205,188)"}};function sl(n){let t=n.surface({bleed:!0,maxPx:1500}),{W:e,H:i,px:s}=t,r=t.layer({alpha:!1}),a=t.layer(),o=t.layer(),l=a.g,c="Night",u=26,f=.5,h=Ct(e*s,i*s),d=Ct(e*s*.25,i*s*.25),p=d.getContext("2d"),T=[],x=[];function m(){let O=il[c],D=Ie(c.length*31),R=h.getContext("2d");R.setTransform(s,0,0,s,0,0);let B=R.createLinearGradient(0,0,0,i);O.sky.forEach((b,P)=>B.addColorStop(P/2,b)),R.fillStyle=B,R.fillRect(0,0,e,i);for(let b=0;b<3;b++){let P=i*(.5+b*.14),A=-20;for(;A<e+20;){let N=40+D()*90,v=(70+D()*240)*(1-b*.2);R.fillStyle=`rgba(${6+b*4},${10+b*5},${20+b*6},.96)`,R.fillRect(A,P-v,N,i);for(let G=P-v+8;G<i*.92;G+=13)for(let q=A+6;q<A+N-6;q+=10)D()<.26&&(R.fillStyle=O.lights[Math.floor(D()*O.lights.length)],R.globalAlpha=.45+D()*.5,R.fillRect(q,G,5,7),R.globalAlpha=1);A+=N+D()*10}}T.length=0;for(let b=0;b<26;b++)T.push({x:D()*e,y:i*(.42+D()*.5),r:10+D()*34,c:O.lights[b%O.lights.length],p:D()*st});x.length=0;for(let b=0;b<12;b++)x.push({x:D()*e,y:i*(.8+b%3*.05),v:(b%2?-1:1)*(50+D()*70),c:b%2?"#ff4c4c":"#fff0c8"})}function M(O){let D=r.g;D.save(),D.setTransform(1,0,0,1,0,0),D.drawImage(h,0,0),D.restore(),D.save(),D.globalCompositeOperation="lighter";for(let R of T){let B=D.createRadialGradient(R.x,R.y,0,R.x,R.y,R.r);B.addColorStop(0,R.c),B.addColorStop(1,"rgba(0,0,0,0)"),D.globalAlpha=.16+.08*Math.sin(O*1.2+R.p),D.fillStyle=B,D.fillRect(R.x-R.r,R.y-R.r,R.r*2,R.r*2)}D.globalAlpha=.85;for(let R of x)D.fillStyle=R.c,D.beginPath(),D.arc(R.x,R.y,3,0,st),D.arc(R.x+10,R.y,3,0,st),D.fill();D.restore(),p.filter="blur(5px) saturate(1.7) brightness(1.3)",p.drawImage(r.canvas,0,0,d.width,d.height),p.filter="none"}let y=Ct(e*s*.5,i*s*.5),w=y.getContext("2d");w.scale(s*.5,s*.5),w.lineCap="round",w.lineJoin="round";function I(){w.globalCompositeOperation="source-over",w.fillStyle="#fff",w.fillRect(0,0,e,i)}function L(O,D,R,B,b){w.globalCompositeOperation="destination-out",w.strokeStyle="rgba(0,0,0,1)",w.lineWidth=b,w.beginPath(),w.moveTo(O,D),w.lineTo(R,B),w.stroke(),w.strokeStyle="rgba(0,0,0,.25)",w.lineWidth=b*1.5,w.stroke()}let g=[],_=[],U=[],C={x:0,y:0,acc:0},F=(O,D,R)=>_.push({x:O,y:D,fat:R});t.pointer({down(O){C.x=O.x,C.y=O.y,L(O.x,O.y,O.x+.1,O.y,u)},move(O){if(L(C.x,C.y,O.x,O.y,u),C.acc+=Math.hypot(O.x-C.x,O.y-C.y),C.acc>34){C.acc=0;let D=Math.random()<.5?-1:1;F(O.x+D*u*.55,O.y+(Math.random()-.3)*u,2+Math.random()*3.4)}C.x=O.x,C.y=O.y}});function E(O,D,R,B){let b=O.createRadialGradient(D-B*.3,R-B*.4,B*.1,D,R,B);b.addColorStop(0,"rgba(255,255,255,.75)"),b.addColorStop(.5,"rgba(180,210,235,.2)"),b.addColorStop(1,"rgba(10,20,40,.45)"),O.fillStyle=b,O.beginPath(),O.ellipse(D,R,B*.86,B*1.1,0,0,st),O.fill()}n.loop((O,D)=>{for(let P of x)P.x+=P.v*O,P.x<-30&&(P.x=e+30),P.x>e+30&&(P.x=-30);M(D),f>0&&(w.globalCompositeOperation="source-over",w.globalAlpha=O*f*.05,w.fillStyle="#fff",w.fillRect(0,0,e,i),w.globalAlpha=1);for(let P=U.length-1;P>=0;P--){let A=U[P];A.t+=O;let N=w.createRadialGradient(e/2,i*.55,0,e/2,i*.55,Math.max(e,i)*zt(.2,.9,At(A.t/1.4)));N.addColorStop(0,"rgba(255,255,255,.18)"),N.addColorStop(1,"rgba(255,255,255,0)"),w.globalCompositeOperation="source-over",w.fillStyle=N,w.fillRect(0,0,e,i),A.t>1.4&&U.splice(P,1)}let R=a.canvas.width,B=a.canvas.height;l.save(),l.setTransform(1,0,0,1,0,0),l.globalCompositeOperation="copy",l.imageSmoothingQuality="high",l.drawImage(d,0,0,R,B),l.globalCompositeOperation="source-over",l.globalAlpha=.44,l.fillStyle=il[c].fog,l.fillRect(0,0,R,B),l.globalAlpha=1,l.globalCompositeOperation="destination-in",l.drawImage(y,0,0,R,B),l.restore();let b=o.g;b.clearRect(0,0,e,i);for(let P=_.length-1;P>=0;P--){let A=_[P];if(A.fat+=O*.5,A.fat>5&&Math.random()<.05){g.push({x:A.x,y:A.y,r:A.fat,v:60+Math.random()*120,wob:Math.random()*st}),_.splice(P,1);continue}E(b,A.x,A.y,A.fat)}_.length>220&&_.splice(0,30),Math.random()<O*.9&&F(Math.random()*e,Math.random()*i*.7,1.5+Math.random()*2.5);for(let P=g.length-1;P>=0;P--){let A=g[P],N=A.x,v=A.y;A.wob+=O*5,A.y+=A.v*O,A.x+=Math.sin(A.wob)*18*O,A.v=At(A.v+(Math.random()-.48)*240*O,12,240),L(N,v,A.x,A.y,A.r*1.3),E(b,A.x,A.y,A.r),A.r=Math.max(1.5,A.r-O*.35),A.y>i+10&&g.splice(P,1)}}),n.clear=()=>{I(),_.length=0,g.length=0},n.snapshot=()=>{let O=Ct(r.canvas.width,r.canvas.height),D=O.getContext("2d");return D.drawImage(r.canvas,0,0),D.drawImage(a.canvas,0,0),D.drawImage(o.canvas,0,0),O},m(),I(),n.ui.seg(Object.keys(il),c,O=>{c=O,m()}),n.ui.sep(),n.ui.slider("Finger",10,70,u,O=>{u=O}),n.ui.slider("Fog returns",0,3,f,O=>{f=O},.1),n.ui.button("Breathe",()=>{U.push({t:0}),qt("breath")},"hot"),n.hint("Draw on the glass with your finger. It will not stay clear for long.")}var Ih={Neon:n=>`hsl(${n*300%360},96%,62%)`,Ember:n=>`hsl(${28+Math.sin(n*5)*26},98%,${58+Math.sin(n*3)*8}%)`,Ice:n=>`hsl(${190+Math.sin(n*4)*34},90%,${70+Math.sin(n*2)*8}%)`,Pearl:n=>`hsl(${(n*120+260)%360},60%,84%)`,Aurora:n=>`hsl(${140+Math.sin(n*3)*60},92%,62%)`,Sunset:n=>`hsl(${(340+Math.sin(n*3)*42+360)%360},96%,62%)`,Rose:n=>`hsl(${330+Math.sin(n*4)*18},90%,${70+Math.sin(n*2)*8}%)`,Acid:n=>`hsl(${72+Math.sin(n*6)*30},100%,58%)`,Ultraviolet:n=>`hsl(${268+Math.sin(n*4)*28},96%,66%)`,Gold:n=>`hsl(${44+Math.sin(n*3)*8},92%,${60+Math.sin(n*5)*10}%)`};function rl(n){let t=n.surface({bleed:!0,bg:"#07050f",maxPx:1800}),{W:e,H:i}=t,s=t.buffer(),r=t.layer({alpha:!1}),a=t.layer({hit:!1}),o=e/2,l=i/2,c=8,u=!0,f="Neon",h=3,d=0,p=0,T=0,x=!0,m=!0,M=null,y=n.rasterUndo(s.canvas);function w(g){let _=g.x-o,U=g.y-l,C=Math.cos(-p),F=Math.sin(-p);return{x:_*C-U*F,y:_*F+U*C}}function I(g,_){let U=s.g,C=Math.hypot(_.x-g.x,_.y-g.y),F=At(h*(1.5-C/40),h*.4,h*1.5);T+=.002+C*35e-5;let E=Ih[f](T),O=()=>{U.beginPath(),U.moveTo(g.x,g.y),U.lineTo(_.x,_.y),U.stroke()};U.save(),U.translate(o,l),U.globalCompositeOperation="lighter",U.lineCap="round",U.strokeStyle=E;for(let D=0;D<c;D++)for(let R of u?[1,-1]:[1])U.save(),U.rotate(D/c*st),U.scale(1,R),x&&(U.globalAlpha=.14,U.lineWidth=F*5,O()),U.globalAlpha=.9,U.lineWidth=F,O(),U.restore();U.restore()}t.pointer({down(g){y(),M=w(g),I(M,{x:M.x+.1,y:M.y})},move(g){let _=w(g);I(M,_),M=_},up(){M=null}});function L(){let g=a.g;if(g.clearRect(0,0,e,i),!m)return;g.save(),g.translate(o,l),g.strokeStyle="rgba(255,255,255,.1)",g.lineWidth=1;let _=Math.hypot(e,i),U=u?c*2:c;for(let C=0;C<U;C++){let F=C/U*st+p;g.beginPath(),g.moveTo(0,0),g.lineTo(Math.cos(F)*_,Math.sin(F)*_),g.stroke()}g.restore()}n.loop(g=>{p+=d*g;let _=r.g;_.fillStyle="#07050f",_.fillRect(0,0,e,i),_.save(),_.translate(o,l),_.rotate(p),_.translate(-o,-l),_.drawImage(s.canvas,0,0,e,i),_.restore(),L()}),n.clear=()=>{y(),s.g.clearRect(0,0,e,i)},n.snapshot=()=>r.canvas,n.ui.select(Object.keys(Ih),f,g=>{f=g}),n.ui.sep(),n.ui.slider("Mirrors",2,24,c,g=>{c=g}),n.ui.toggle("Reflect",u,g=>{u=g}),n.ui.slider("Width",1,12,h,g=>{h=g}),n.ui.slider("Turn",-100,100,0,g=>{d=g/100}),n.ui.toggle("Glow",x,g=>{x=g}),n.ui.toggle("Guides",m,g=>{m=g}),n.hint("Draw anywhere. Then set it turning and paint on the wheel.")}var If=Math.sqrt(3)/2,Pf=n=>{let t=n*Math.PI/180,e=Math.cos(t),i=Math.sin(t);return[e,i,-i,e,0,0]},al=[1,0,0,1,0,0],Nh=[-1,0,0,1,0,0],Lf=(n,t)=>[n[0]*t[0]+n[2]*t[1],n[1]*t[0]+n[3]*t[1],n[0]*t[2]+n[2]*t[3],n[1]*t[2]+n[3]*t[3],n[0]*t[4]+n[2]*t[5]+n[4],n[1]*t[4]+n[3]*t[5]+n[5]],es=n=>Array.from({length:n},(t,e)=>Pf(360/n*e)),Ph=n=>[...n,...n.map(t=>Lf(t,Nh))],ns=n=>[[n,0],[0,n]],ol=n=>[[n,0],[n/2,n*If]],Lh={p1:{lattice:ns,ops:()=>[al],label:"Slide"},p2:{lattice:ns,ops:()=>es(2),label:"Half turn"},pm:{lattice:ns,ops:()=>[al,Nh],label:"Mirror"},pg:{lattice:ns,ops:n=>[al,[-1,0,0,1,0,n/2]],label:"Glide"},p4:{lattice:ns,ops:()=>es(4),label:"Quarter"},p4m:{lattice:ns,ops:()=>Ph(es(4)),label:"Tile"},p3:{lattice:ol,ops:()=>es(3),label:"Triad"},p6:{lattice:ol,ops:()=>es(6),label:"Hex"},p6m:{lattice:ol,ops:()=>Ph(es(6)),label:"Snowflake"}},Xs=[["#f0e4c2","#123c30","#38b58a","#e8a33d","#c7482e"],["#123c30","#f0e4c2","#38b58a","#e8a33d","#ef8fa0"],["#f7efe6","#2a2a6e","#e0508a","#f2b705","#1fa39a"],["#1b1730","#f7efe6","#ff7a59","#7ad7f0","#c8a2ff"],["#f2c4c4","#7a1f3d","#f7efe6","#2a6a6a","#e8a33d"],["#c9e4dc","#1c425c","#e0508a","#f7efe6","#f2672a"],["#f2b705","#16130f","#d92b1f","#f7efe6","#1f4fd8"],["#3a1440","#ffb347","#ff4f8b","#35c9e0","#f7efe6"]];function ll(n){let t=n.surface({bleed:!0,maxPx:1800}),{W:e,H:i}=t,{canvas:s,g:r}=t.layer({alpha:!1}),a=t.layer({hit:!1}),o=e/2,l=i/2,c="p4m",u=150,f=0,h=Xs[0][1],d=4,p=!0,T=[],x=null,m,M,y,w;function I(){let E=Lh[c];m=E.lattice(u),M=E.ops(u);let[[O,D],[R,B]]=m,b=O*B-D*R;y=(A,N)=>[(A*B-N*R)/b,(-A*D+N*O)/b];let P=[[-o,-l],[e-o,-l],[-o,i-l],[e-o,i-l]].map(([A,N])=>y(A,N));w=[Math.min(...P.map(A=>A[0])),Math.max(...P.map(A=>A[0])),Math.min(...P.map(A=>A[1])),Math.max(...P.map(A=>A[1]))]}function L(E,O,D,R){let[[B,b],[P,A]]=m;for(let N of M){let v=N[0]*E+N[2]*O+N[4],G=N[1]*E+N[3]*O+N[5],q=N[0]*D+N[2]*R+N[4],S=N[1]*D+N[3]*R+N[5],[V,W]=y(v,G),Z=Math.floor(w[0]-V)-1,Y=Math.ceil(w[1]-V)+1,j=Math.floor(w[2]-W)-1,ct=Math.ceil(w[3]-W)+1;for(let ut=Z;ut<=Y;ut++)for(let ht=j;ht<=ct;ht++){let Rt=o+ut*B+ht*P,Ut=l+ut*b+ht*A;r.moveTo(v+Rt,G+Ut),r.lineTo(q+Rt,S+Ut)}}}function g(E,O=1){r.strokeStyle=E.colour,r.lineWidth=E.width,r.lineCap="round",r.lineJoin="round",r.beginPath();for(let D=O;D<E.pts.length;D++){let R=E.pts[D-1],B=E.pts[D];L(R[0],R[1],B[0],B[1])}r.stroke()}function _(){I(),r.fillStyle=Xs[f][0],r.fillRect(0,0,e,i);for(let E of T)g(E);U()}function U(){let E=a.g;if(E.clearRect(0,0,e,i),!p)return;let[[O,D],[R,B]]=m;E.strokeStyle=f%2?"rgba(255,255,255,.2)":"rgba(0,0,0,.16)",E.lineWidth=1,E.setLineDash([3,5]),E.beginPath();let b=Math.floor(w[0])-2,P=Math.ceil(w[1])+2,A=Math.floor(w[2])-2,N=Math.ceil(w[3])+2;for(let v=b;v<=P;v++)E.moveTo(o+v*O+A*R,l+v*D+A*B),E.lineTo(o+v*O+N*R,l+v*D+N*B);for(let v=A;v<=N;v++)E.moveTo(o+b*O+v*R,l+b*D+v*B),E.lineTo(o+P*O+v*R,l+P*D+v*B);E.stroke(),E.setLineDash([])}t.pointer({down(E){x={pts:[[E.x-o,E.y-l],[E.x-o+.1,E.y-l]],colour:h,width:d},T.push(x),g(x)},move(E){x&&(x.pts.push([E.x-o,E.y-l]),g(x,x.pts.length-1))},up(){x=null}}),n.undo=()=>{T.pop(),_()},n.clear=()=>{T=[],_()},n.snapshot=()=>s;let C=document.createElement("div");C.style.display="contents",n.dock.appendChild(C);let F=()=>{let E=new Set(n.dock.children);n.ui.swatches([...new Set([...Xs[f].slice(1),...sn])].slice(0,20),h,O=>{h=O}),C.replaceChildren(...[...n.dock.children].filter(O=>!E.has(O)))};F(),n.ui.sep(),n.ui.seg(Object.entries(Lh).map(([E,O])=>[E,O.label]),c,E=>{c=E,_()}),n.ui.sep(),n.ui.slider("Tile",70,320,u,E=>{u=E,_()}),n.ui.slider("Pen",1,18,d,E=>{d=E}),n.ui.toggle("Seams",p,E=>{p=E,U()}),n.ui.button("Paper",()=>{f=(f+1)%Xs.length,h=Xs[f][1],F(),_()}),_(),n.hint("Draw anywhere, then switch symmetry and watch the whole wall re-weave itself.")}var cl="the brush remembers what the hand forgets and the hand forgets what the eye forgave ",Dh=[["italic 400 %px Fraunces","Serif"],["400 %px Anton","Poster"],["600 %px Caveat","Hand"],['500 %px "DM Mono"',"Type"],["400 %px VT323","Pixel"]],Uh=sn,Oh={Cream:"#f6efe3",Blush:"#f6e0da",Night:"#141320",Sage:"#dfe5d4",Sky:"#d6e8f2",Butter:"#f7e7a8",Plum:"#2c1538",Teal:"#0f3a3f"};function hl(n){let t=n.surface({paper:!0,maxPx:2200}),{W:e,H:i}=t,{canvas:s,g:r}=t.layer({alpha:!1}),a=n.rasterUndo(s),o=cl,l=Dh[0][0],c=Uh[0],u=34,f=!1,h="Cream",d=0,p={x:0,y:0,carry:0,last:0,sz:30};function T(){r.fillStyle=Oh[h],r.fillRect(0,0,e,i),Je(r,e,i,{alpha:["Night","Plum","Teal"].includes(h)?.03:.05,seed:8})}let x=()=>{let L=o.trim()?o:cl;return L[d++%L.length]};function m(L,g,_){let U=L-p.x,C=g-p.y,F=Math.hypot(U,C);if(F<.5)return;let E=Math.max(1,_-p.last);p.last=_;let O=At(u*(1.7-F/E*.55),u*.36,u*2.1);p.sz=zt(p.sz,O,.16);let D=Math.atan2(C,U),R=p.carry,B=U/F,b=C/F,P=p.x,A=p.y,N=F;for(;;){let v=y(),G=r.measureText(v).width+p.sz*.05;if(R+N<G){p.carry=R+N;break}let q=G-R;P+=B*q,A+=b*q,N-=q,R=0,w(v,P-B*G*.5,A-b*G*.5,D),M=null}p.x=L,p.y=g}let M=null;function y(){return M||(M=x()),r.font=l.replace("%",p.sz.toFixed(1)),M}function w(L,g,_,U){r.save(),r.translate(g,_),r.rotate(U),r.font=l.replace("%",p.sz.toFixed(1)),r.fillStyle=f?`hsl(${d*5%360},70%,${["Night","Plum","Teal"].includes(h)?70:42}%)`:c,r.textAlign="center",r.textBaseline="middle",r.fillText(L,0,0),r.restore()}t.pointer({down(L){a(),p.x=L.x,p.y=L.y,p.carry=0,p.last=performance.now(),p.sz=u},move(L){m(L.x,L.y,performance.now())}}),n.clear=()=>{a(),d=0,T()},n.snapshot=()=>s,T(),n.ui.text(cl.trim(),L=>{o=L+" ",d=0,M=null},"Type your verse"),n.ui.sep(),n.ui.swatches(Uh,c,L=>{c=L,f=!1,I.classList.remove("on")});let I=n.ui.toggle("Spectrum",f,L=>{f=L});n.ui.sep(),n.ui.seg(Dh.map(([L,g])=>[L,g]),l,L=>{l=L}),n.ui.slider("Size",14,80,u,L=>{u=L}),n.ui.select(Object.keys(Oh),h,L=>{h=L,a(),T()}),n.hint("Paint slowly to shout, quickly to whisper. Type your own words in the dock.")}var is=["#f1ece0","#d8312c","#f3c613","#1f3f9e","#141414","#e9762b","#2f7f6f","#7fb7c9","#e98aa0","#6d4aa8","#8d8a84","#a8c64a"],Fh=[196,220,247,294,330,392,440,494,587,659],Ys=9;function ul(n){let t=n.surface({aspect:1.15,paper:!0,maxPx:2e3}),{W:e,H:i,px:s}=t,{canvas:r,g:a}=t.layer({alpha:!1}),o=is[1],l=u(),c=Ct(e*s,i*s);{let R=c.getContext("2d");R.scale(s,s),Je(R,e,i,{alpha:.07,seed:12})}function u(R=is[0]){return{colour:R,split:null}}function f(R,B,b,P,A,N,v,G=0){if(R.rect=[B,b,P,A],!R.split){N.push(R);return}let{axis:q,at:S}=R.split,V=Math.max(4,Ys-G*.7);if(q==="x"){let W=P*S;f(R.a,B,b,W,A,N,v,G+1),f(R.b,B+W,b,P-W,A,N,v,G+1),v.push({n:R,axis:q,x1:B+W,y1:b,x2:B+W,y2:b+A,thick:V})}else{let W=A*S;f(R.a,B,b,P,W,N,v,G+1),f(R.b,B,b+W,P,A-W,N,v,G+1),v.push({n:R,axis:q,x1:B,y1:b+W,x2:B+P,y2:b+W,thick:V})}}let h=[],d=[],p=()=>{h=[],d=[],f(l,0,0,e,i,h,d),y.forEach(R=>{R.seg>=d.length&&(R.seg=Math.floor(Math.random()*d.length))})},T=(R,B)=>h.find(b=>{let[P,A,N,v]=b.rect;return R>=P&&R<=P+N&&B>=A&&B<=A+v}),x=(R,B)=>d.find(b=>b.axis==="x"?Math.abs(R-b.x1)<9&&B>=b.y1&&B<=b.y2:Math.abs(B-b.y1)<9&&R>=b.x1&&R<=b.x2);function m(R,B,b){let[P,A,N,v]=R.rect,G=B==="x"?(b-P)/N:(b-A)/v;G<.06||G>.94||(R.split={axis:B,at:G},R.a=u(R.colour),R.b=u(R.colour),p(),qt("tock"))}let M={down:!1,x:0,y:0,cx:0,cy:0,line:null};t.pointer({down(R){Object.assign(M,{down:!0,x:R.x,y:R.y,cx:R.x,cy:R.y,line:x(R.x,R.y)}),E()},move(R){if(M.cx=R.x,M.cy=R.y,M.line){let B=M.line.n,[b,P,A,N]=B.rect;B.split.at=M.line.axis==="x"?At((R.x-b)/A,.05,.95):At((R.y-P)/N,.05,.95),p(),M.line=d.find(v=>v.n===B)}},hover(R){t.el.style.cursor=x(R.x,R.y)?"move":"crosshair"},up(){let R=M.cx-M.x,B=M.cy-M.y,b=Math.hypot(R,B)>12;if(M.down=!1,M.line){M.line=null;return}let P=T(M.x,M.y);P&&(b?m(P,Math.abs(B)>Math.abs(R)?"x":"y",Math.abs(B)>Math.abs(R)?M.x:M.y):(P.colour=P.colour===o?is[0]:o,qt("pop")))}});let y=[];function w(R){if(y.length=0,!!d.length)for(let B=0;B<R;B++)y.push({seg:B%d.length,t:Math.random(),dir:Math.random()<.5?1:-1,c:qs(["#d8312c","#f3c613","#1f3f9e","#f1ece0"]),speed:90+Math.random()*80,trail:[]})}function I(R,B){return B>0?[R.x2,R.y2]:[R.x1,R.y1]}function L(R,B){let[b,P]=I(B,R.dir),A=[];if(d.forEach((N,v)=>{if(N===B)return;(N.axis==="x"?Math.abs(N.x1-b)<2&&P>=N.y1-2&&P<=N.y2+2:Math.abs(N.y1-P)<2&&b>=N.x1-2&&b<=N.x2+2)&&A.push(v)}),A.length){let N=qs(A),v=d[N];R.seg=N,R.t=v.axis==="x"?(P-v.y1)/(v.y2-v.y1):(b-v.x1)/(v.x2-v.x1),R.dir=Math.random()<.5?1:-1}else R.dir*=-1,R.t=At(R.t,0,1);if(_){let N=Fh[Math.floor(At(1-P/i,0,.999)*Fh.length)];Oi(N,{dur:.32,vol:.05,type:"square",pan:b/e*2-1})}}let g=!1,_=!0;function U(R){a.fillStyle=is[0],a.fillRect(0,0,e,i);for(let B of h){let[b,P,A,N]=B.rect;a.fillStyle=B.colour,a.fillRect(b,P,A+.5,N+.5)}a.fillStyle="#121212";for(let B of d)B.axis==="x"?a.fillRect(B.x1-B.thick/2,B.y1,B.thick,B.y2-B.y1):a.fillRect(B.x1,B.y1-B.thick/2,B.x2-B.x1,B.thick);if(g)for(let B of y){let b=d[B.seg];if(!b)continue;let P=Math.hypot(b.x2-b.x1,b.y2-b.y1)||1;B.t+=B.dir*B.speed*R/P;let A=b.x1+(b.x2-b.x1)*B.t,N=b.y1+(b.y2-b.y1)*B.t;B.trail.unshift([A,N]),B.trail.length>42&&B.trail.pop(),a.fillStyle=B.c;let v=b.thick;for(let G=0;G<B.trail.length;G+=7)a.fillRect(B.trail[G][0]-v/2,B.trail[G][1]-v/2,v,v);(B.t<=0||B.t>=1)&&L(B,b)}if(M.down&&!M.line){let B=M.cx-M.x,b=M.cy-M.y,P=T(M.x,M.y);if(Math.hypot(B,b)>12&&P){let[A,N,v,G]=P.rect;a.fillStyle="rgba(18,18,18,.42)",Math.abs(b)>Math.abs(B)?a.fillRect(M.x-Ys/2,N,Ys,G):a.fillRect(A,M.y-Ys/2,v,Ys)}}a.save(),a.setTransform(1,0,0,1,0,0),a.drawImage(c,0,0),a.restore()}n.loop(U);let C=R=>R.split?{colour:R.colour,split:{...R.split},a:C(R.a),b:C(R.b)}:{colour:R.colour,split:null},F=[],E=()=>{F.push(C(l)),F.length>30&&F.shift()};n.undo=()=>{let R=F.pop();R&&(l=R,p())},n.clear=()=>{E(),l=u(),p(),y.length=0,g=!1,D.textContent="Boogie",D.classList.remove("on")},n.snapshot=()=>r;function O(){E(),l=u(),p();for(let R=0;R<9;R++){let B=[...h].sort((q,S)=>S.rect[2]*S.rect[3]-q.rect[2]*q.rect[3]),b=B[Math.floor(Math.random()*Math.min(3,B.length))],[P,A,N,v]=b.rect,G=N>v?"x":"y";m(b,G,G==="x"?P+N*(.25+Math.random()*.5):A+v*(.25+Math.random()*.5))}[...h].sort(()=>Math.random()-.5).slice(0,4).forEach((R,B)=>{R.colour=is[B%3+1]})}n.ui.swatches(is,o,R=>{o=R}),n.ui.sep();let D=n.ui.button("Boogie",()=>{g=!g,g&&w(Math.min(26,8+d.length)),D.textContent=g?"Stop":"Boogie",D.classList.toggle("on",g)},"hot");n.ui.toggle("Sound",_,R=>{_=R}),n.ui.button("Compose for me",O),p(),O(),F.length=0,n.hint("Drag across a room to split it. Tap to fill. Drag a line to nudge it. Then press Boogie.")}var dl={Endless:1/0,"Two metres":7500,"One metre":3700,"A short pen":1500},fl=37.8;function pl(n){let t=n.surface({paper:!0,maxPx:2200}),{W:e,H:i}=t,{canvas:s,g:r}=t.layer({alpha:!1}),a=t.layer({hit:!1}),o="ready",l=[],c=0,u=dl.Endless,f=null,h=2.4,d="#191714";function p(){r.fillStyle="#efe7d6",r.fillRect(0,0,e,i),Je(r,e,i,{alpha:.05,seed:6})}let T=I=>h*(.7+1.6*At(1-I/1.3));function x(I,L,g){let _=(I.x+L.x)/2,U=(I.y+L.y)/2,C=(L.x+g.x)/2,F=(L.y+g.y)/2;r.strokeStyle=d,r.lineCap="round",r.lineWidth=L.w,r.beginPath(),r.moveTo(_,U),r.quadraticCurveTo(L.x,L.y,C,F),r.stroke()}function m(){if(o!=="drawing")return;o="done",qt("tock");let I=l.length?(l[l.length-1].t-l[0].t)/1e3:0;w.textContent=`${(c/fl/100).toFixed(2)} m of line in ${I.toFixed(1)} s`,n.toast("That is your line. It cannot be changed."),setTimeout(M,700)}t.pointer({down(I){if(o!=="ready"){n.toast("You lifted. Take a new sheet.");return}o="drawing",l=[{x:I.x,y:I.y,t:performance.now(),w:h}],c=0},move(I){if(o!=="drawing")return;let L=l[l.length-1],g=performance.now(),_=Math.hypot(I.x-L.x,I.y-L.y);if(_<1.2)return;c+=_;let U=u-c,C=_/Math.max(1,g-L.t),F=Number.isFinite(u)?At(U/260):1,E=zt(L.w,T(C),.3)*Math.max(.15,F);l.push({x:I.x,y:I.y,t:g,w:E}),l.length>=3&&x(l[l.length-3],l[l.length-2],l[l.length-1]),w.textContent=Number.isFinite(u)?`${Math.max(0,U/fl/100).toFixed(2)} m of ink left`:`${(c/fl/100).toFixed(2)} m and counting`,U<=0&&m()},up(){m()}});function M(){l.length<3||(f={i:2,start:performance.now(),t0:l[0].t},p())}n.loop(()=>{let I=a.g;if(I.clearRect(0,0,e,i),!f)return;let L=l[l.length-1].t-f.t0,g=Math.max(1,L/2e4),_=(performance.now()-f.start)*g+f.t0;for(;f.i<l.length&&l[f.i].t<=_;)x(l[f.i-2],l[f.i-1],l[f.i]),f.i++;let U=l[Math.min(f.i,l.length-1)];I.fillStyle="#d8312c",I.beginPath(),I.arc(U.x,U.y,4,0,st),I.fill(),f.i>=l.length&&(f=null)});function y(){o!=="ready"&&qt("paper"),o="ready",l=[],c=0,f=null,p(),w.textContent="Touch down when ready"}n.clear=y,n.snapshot=()=>s,n.ui.seg(Object.keys(dl),"Endless",I=>{u=dl[I]}),n.ui.sep(),n.ui.slider("Nib",1,7,h,I=>{h=I},.2),n.ui.swatches(sn,sn[0],I=>{d=I}),n.ui.button("Replay",()=>{o==="done"&&M()}),n.ui.button("New sheet",y,"hot");let w=n.ui.readout("");y(),n.hint("One line. It ends for good the moment you let go.")}var zr={Phosphor:{bg:"#04120b",line:"#3cf08f",glow:"rgba(60,240,143,.5)",fade:.012},Amber:{bg:"#140b02",line:"#ffb84a",glow:"rgba(255,184,74,.5)",fade:.012},Silver:{bg:"#b9bcc0",line:"#2b2d31",glow:null,fade:0},Paper:{bg:"#efe7d6",line:"#1b1a1f",glow:null,fade:0},Ice:{bg:"#03101a",line:"#6fd8ff",glow:"rgba(111,216,255,.5)",fade:.012},Rose:{bg:"#16040c",line:"#ff6fa8",glow:"rgba(255,111,168,.5)",fade:.012},Violet:{bg:"#0c0618",line:"#b48aff",glow:"rgba(180,138,255,.5)",fade:.012},Blueprint:{bg:"#123a7a",line:"#eaf2ff",glow:null,fade:0}};function ml(n){let t=n.surface({bleed:!0,maxPx:1800}),{W:e,H:i,px:s}=t,{canvas:r,g:a}=t.layer({alpha:!1}),o=Math.min(e,i)*.05,l=72,c=At(Math.min(e,i)*.075,34,62),u=e-o*2,f=i-l-c*2-74,h={x:o,y:l,w:u,h:Math.max(160,f)},d=h.y+h.h+c+14,p=[{x:o+c+10,y:d,a:0,axis:"x"},{x:e-o-c-10,y:d,a:0,axis:"y"}],T="Phosphor",x={x:h.w/2,y:h.h/2},m=2,M=!0,y=!0,w=0,I=null,L=0,g=Ct(h.w*s,h.h*s),_=g.getContext("2d");_.scale(s,s),_.lineCap="round",_.lineJoin="round";function U(b,P){if(b=At(b,2,h.w-2),P=At(P,2,h.h-2),b===x.x&&P===x.y)return;let A=zr[T];_.strokeStyle=A.line,_.lineWidth=m,A.glow?(_.shadowColor=A.glow,_.shadowBlur=8):_.shadowBlur=0,_.beginPath(),_.moveTo(x.x,x.y),_.lineTo(b,P),_.stroke(),x.x=b,x.y=P}function C(b,P){b.a+=P;let A=P*62;b.axis==="x"?U(x.x+A,x.y):U(x.x,x.y-A),L+=Math.abs(P),M&&L>.22&&(L=0,Oi(b.axis==="x"?1800:1500,{dur:.02,vol:.012,type:"square"}))}function F(b){w=Math.min(1,w+b),_.save(),_.setTransform(1,0,0,1,0,0),_.globalCompositeOperation="destination-out",_.fillStyle=`rgba(0,0,0,${.08+b*.5})`,_.fillRect(0,0,g.width,g.height),_.restore()}let E=null,O=null;t.pointer({down(b){I=null;let P=p.find(A=>Fe(b.x,b.y,A.x,A.y)<c*1.35);P?E={k:P,ang:Math.atan2(b.y-P.y,b.x-P.x)}:E={shaker:!0},O=b},move(b){if(E?.k){let P=E.k,A=Math.atan2(b.y-P.y,b.x-P.x),N=A-E.ang;N>Math.PI&&(N-=st),N<-Math.PI&&(N+=st),E.ang=A,C(P,N)}else E?.shaker&&O&&Math.hypot(b.x-O.x,b.y-O.y)>12&&F(.14);O=b},hover(b){t.el.style.cursor=p.some(P=>Fe(b.x,b.y,P.x,P.y)<c*1.35)?"grab":"default"},up(){E=null,O=null}}),n.on(t.el,"wheel",b=>{b.preventDefault();let P=t.el.getBoundingClientRect(),A=(b.clientX-P.left)/P.width*e;C(p[A<e/2?0:1],At(b.deltaY,-100,100)*.0024)},{passive:!1});let D=new Set;n.on(window,"keydown",b=>{b.key.startsWith("Arrow")&&(b.preventDefault(),D.add(b.key),n.dismissTip())}),n.on(window,"keyup",b=>D.delete(b.key));function R(b,P,A,N){let v=a.createLinearGradient(b,P,b,P+N);v.addColorStop(0,"#2c2d31"),v.addColorStop(.5,"#222327"),v.addColorStop(1,"#17181b"),a.fillStyle=v,a.fillRect(b,P,A,N)}function B(b){let P=c;a.save(),a.translate(b.x,b.y),a.shadowColor="rgba(0,0,0,.6)",a.shadowBlur=18,a.shadowOffsetY=8,a.fillStyle="#101114",a.beginPath(),a.arc(0,0,P*1.08,0,st),a.fill(),a.shadowColor="transparent",a.save(),a.rotate(b.a),a.fillStyle="#5a5c61";for(let N=0;N<44;N++)a.rotate(st/44),a.fillRect(P*.93,-1.3,P*.13,2.6);a.restore();let A=a.createConicGradient(.6,0,0);["#e8e9eb","#8d9096","#f4f5f6","#7f8288","#e2e3e6","#8a8d92","#e8e9eb"].forEach((N,v)=>A.addColorStop(v/6,N)),a.fillStyle=A,a.beginPath(),a.arc(0,0,P*.9,0,st),a.fill(),a.rotate(b.a),a.fillStyle="#d8312c",a.fillRect(-1.8,-P*.84,3.6,P*.34),a.restore()}n.loop((b,P)=>{if(I){I.t+=b*I.speed;let S=h.w/2+Math.sin(I.t*I.fx+I.ph)*h.w*.42,V=h.h/2+Math.sin(I.t*I.fy)*h.h*.42,W=S-x.x,Z=V-x.y;p[0].a+=W/62,p[1].a-=Z/62,U(S,V)}let A=150*b/62;D.has("ArrowLeft")&&C(p[0],-A),D.has("ArrowRight")&&C(p[0],A),D.has("ArrowUp")&&C(p[1],A),D.has("ArrowDown")&&C(p[1],-A);let N=zr[T];N.fade&&!y&&(_.save(),_.setTransform(1,0,0,1,0,0),_.globalCompositeOperation="destination-out",_.fillStyle=`rgba(0,0,0,${N.fade})`,_.fillRect(0,0,g.width,g.height),_.restore()),w=Math.max(0,w-b*2.5);let v=Math.sin(P*60)*w*14,G=Math.cos(P*52)*w*9;if(a.save(),a.translate(v,G),R(-20,-20,e+40,i+40),a.fillStyle="#0b0c0e",a.beginPath(),a.roundRect(h.x-10,h.y-10,h.w+20,h.h+20,14),a.fill(),a.save(),a.beginPath(),a.roundRect(h.x,h.y,h.w,h.h,8),a.clip(),a.fillStyle=N.bg,a.fillRect(h.x,h.y,h.w,h.h),N.glow){a.strokeStyle="rgba(255,255,255,.04)",a.lineWidth=1,a.beginPath();for(let S=1;S<10;S++)a.moveTo(h.x+h.w*S/10,h.y),a.lineTo(h.x+h.w*S/10,h.y+h.h);for(let S=1;S<8;S++)a.moveTo(h.x,h.y+h.h*S/8),a.lineTo(h.x+h.w,h.y+h.h*S/8);a.stroke()}a.drawImage(g,h.x,h.y,h.w,h.h),a.fillStyle=N.line,a.beginPath(),a.arc(h.x+x.x,h.y+x.y,m+1,0,st),a.fill();let q=a.createLinearGradient(h.x,h.y,h.x+h.w*.5,h.y+h.h);q.addColorStop(0,"rgba(255,255,255,.07)"),q.addColorStop(.4,"rgba(255,255,255,0)"),a.fillStyle=q,a.fillRect(h.x,h.y,h.w,h.h),a.restore(),p.forEach(B),a.fillStyle="rgba(240,240,236,.5)",a.font='500 11px "DM Mono"',a.textAlign="center",a.fillText("ACROSS",p[0].x+c*2.1,d+4),a.fillText("UP / DOWN",p[1].x-c*2.2,d+4),a.restore()}),n.clear=()=>{I=null,w=1,_.save(),_.setTransform(1,0,0,1,0,0),_.clearRect(0,0,g.width,g.height),_.restore()},n.snapshot=()=>{let b=Ct(g.width,g.height),P=b.getContext("2d");return P.fillStyle=zr[T].bg,P.fillRect(0,0,b.width,b.height),P.drawImage(g,0,0),b},n.ui.select(Object.keys(zr),T,b=>{T=b}),n.ui.sep(),n.ui.slider("Weight",1,6,m,b=>{m=b},.5),n.ui.toggle("Hold trace",y,b=>{y=b}),n.ui.toggle("Clicks",M,b=>{M=b}),n.ui.button("Lissajous",()=>{let b=[[3,2],[5,4],[3,4],[5,2],[7,6]],[P,A]=b[Math.floor(Math.random()*b.length)];I=I?null:{t:0,fx:P,fy:A,ph:Math.random()*st,speed:.8}}),n.ui.button("Shake",()=>{qt("shake");for(let b=0;b<6;b++)F(.16)},"hot"),n.hint("Turn the knobs by dragging them, scrolling over them or using the arrow keys. Grab the casing to shake.")}var Gr={Pale:[1,1,1],Rust:[1.02,.66,.5],Slate:[.56,.62,.7],Moss:[.66,.78,.54],Rose:[1.04,.78,.76],Basalt:[.34,.34,.38],Ochre:[1.04,.84,.46]};function gl(n){let t=n.surface({bleed:!0,maxPx:1800}),{W:e,H:i,px:s}=t,r=t.layer({gl:!0}),a=t.layer({hit:!1}),o=t.buffer(),l=t.buffer(),c=Fn(r.canvas),u=He(c,Br),f=Fi(c),h=Fi(c),d="rake",p=5,T=15,x=.24,m=!0,M="Pale",y=[],w=De(4);function I(){let N=o.g;N.fillStyle="#d9d0bd",N.fillRect(0,0,e,i);for(let v=0;v<e*i/22;v++){let G=Math.random();N.fillStyle=G>.5?`rgba(255,250,236,${(G-.5)*.3})`:`rgba(90,76,54,${(.5-G)*.3})`,N.fillRect(Math.random()*e,Math.random()*i,1.5,1.5)}L()}function L(){let N=l.g;N.fillStyle="#800000",N.fillRect(0,0,e,i);for(let v=0;v<i;v+=24)for(let G=0;G<e;G+=24){let q=118+w(G*.012,v*.012)*20;N.fillStyle=`rgba(${Math.round(q)},0,0,.5)`,N.fillRect(G,v,24,24)}m=!0}let g="rgb(50,0,0)",_="rgb(205,0,0)",U="rgb(128,0,0)";function C(N,v,G,q){let S=l.g,V=G-N,W=q-v,Z=Math.hypot(V,W);if(Z<.01)return;let Y=-W/Z,j=V/Z,ct=p*T,ut=(ht,Rt,Ut)=>{S.strokeStyle=Ut,S.lineWidth=Rt,S.beginPath(),S.moveTo(N+Y*ht,v+j*ht),S.lineTo(G+Y*ht,q+j*ht),S.stroke()};S.lineCap="butt",ut(0,ct+T*.6,U),S.lineCap="round";for(let ht=0;ht<p;ht++){let Rt=(ht-(p-1)/2)*T;ut(Rt,T*.42,g),ut(Rt+T/2,T*.34,_),ut(Rt-T/2,T*.34,_)}m=!0}function F(N){let v=l.g,G=7;v.fillStyle=U,v.beginPath(),v.arc(N.x,N.y,N.r+G*T*.82+T,0,st),v.fill();for(let q=0;q<G;q++){let S=N.r+T*.7+q*T*.82;v.strokeStyle=g,v.lineWidth=T*.36,v.beginPath(),v.arc(N.x,N.y,S,0,st),v.stroke(),v.strokeStyle=_,v.lineWidth=T*.3,v.beginPath(),v.arc(N.x,N.y,S+T*.41,0,st),v.stroke()}m=!0}function E(N,v,G){let q=[],S=11+Math.floor(Math.random()*5),V=Math.random()*40;for(let W=0;W<S;W++){let Z=W/S*st,Y=.76+w(Math.cos(Z)*1.6+V,Math.sin(Z)*1.6+V)*.5;q.push([Math.cos(Z)*G*Y,Math.sin(Z)*G*Y*.84])}return{x:N,y:v,r:G,pts:q,tone:50+Math.random()*34}}function O(N,v,G=0,q=0){N.beginPath(),v.pts.forEach(([S,V],W)=>{let Z=v.pts[(W+1)%v.pts.length],Y=(S+Z[0])/2,j=(V+Z[1])/2;W?N.quadraticCurveTo(v.x+G+S,v.y+q+V,v.x+G+Y,v.y+q+j):N.moveTo(v.x+G+Y,v.y+q+j)}),N.closePath()}function D(){let N=x*Math.PI;return[Math.cos(N)*1.25,.4,.34+Math.sin(N)*1.1]}function R(){let N=a.g,[v,G,q]=D();N.clearRect(0,0,e,i);for(let S of y){let V=S.r*.72/Math.max(.3,q);N.save(),N.filter="blur(5px)",N.fillStyle="rgba(40,30,20,.48)",O(N,S,-v*V,G*V),N.fill(),N.restore(),O(N,S);let W=S.x+v*S.r*.42,Z=S.y-G*S.r*.6,Y=N.createRadialGradient(W,Z,S.r*.08,S.x,S.y,S.r*1.15);Y.addColorStop(0,`rgb(${S.tone+88},${S.tone+82},${S.tone+76})`),Y.addColorStop(.55,`rgb(${S.tone+16},${S.tone+12},${S.tone+10})`),Y.addColorStop(1,`rgb(${S.tone-34},${S.tone-36},${S.tone-36})`),N.fillStyle=Y,N.fill()}}let B={x:0,y:0,down:!1,sx:0,sy:0};t.pointer({down(N){A(),Object.assign(B,{x:N.x,y:N.y,sx:N.x,sy:N.y,down:!0});let v=y.find(G=>Fe(G.x,G.y,N.x,N.y)<G.r);if(v&&d!=="stone"){B.tapped=v;return}if(B.tapped=null,d==="stone"){let G=E(N.x,N.y,24+Math.random()*44);y.push(G),qt("thud"),F(G),R()}},move(N){if(B.down&&d==="rake"&&!(B.tapped&&Fe(N.x,N.y,B.sx,B.sy)<8)){let v=zt(B.x,N.x,.8),G=zt(B.y,N.y,.8);C(B.x,B.y,v,G),B.x=v,B.y=G}},up(){B.tapped&&(qt("clink"),F(B.tapped)),B.down=!1}}),n.loop(()=>{m?(ji(c,f,0,o.canvas),ji(c,h,1,l.canvas),m=!1):(gn(c,f,0),gn(c,h,1));let[N,v,G]=D(),q=At(Math.sin(x*Math.PI));c.viewport(0,0,r.canvas.width,r.canvas.height),u.use().i("color",0).i("height",1).f("px",1/(e*s),1/(i*s)).f("light",N,v,G).f("strength",2.5).f("gloss",20).f("spec",0).f("grain",.4).f("tint",zt(1.08,1,q)*Gr[M][0],zt(.9,1,q)*Gr[M][1],zt(.76,1,q)*Gr[M][2]),mn(c)});let b=[],P=N=>{let v=Ct(N.width,N.height);return v.getContext("2d").drawImage(N,0,0),v},A=()=>{b.push({h:P(l.canvas),rocks:y.slice()}),b.length>10&&b.shift()};n.undo=()=>{let N=b.pop();N&&(l.g.save(),l.g.setTransform(1,0,0,1,0,0),l.g.drawImage(N.h,0,0),l.g.restore(),y.length=0,y.push(...N.rocks),R(),m=!0)},n.clear=()=>{A(),y.length=0,L(),R()},n.snapshot=()=>{let N=Ct(r.canvas.width,r.canvas.height),v=N.getContext("2d");return v.drawImage(r.canvas,0,0),v.drawImage(a.canvas,0,0),N},I();for(let N=T*3;N<i+T*p;N+=T*p)C(-10,N,e+10,N);[[.34,.42,66],[.68,.6,42]].forEach(([N,v,G])=>{let q=E(e*N,i*v,G);y.push(q),F(q)}),R(),n.ui.seg([["rake","Rake"],["stone","Stone"]],d,N=>{d=N}),n.ui.select(Object.keys(Gr),M,N=>{M=N}),n.ui.sep(),n.ui.slider("Tines",1,9,p,N=>{p=N}),n.ui.slider("Spacing",8,26,T,N=>{T=N}),n.ui.slider("Sun",6,94,x*100,N=>{x=N/100,R()}),n.ui.button("Smooth",()=>{A(),L(),y.forEach(F)}),n.hint("Rake long slow lines. Tap a stone to ripple around it. Move the sun.")}var kh=[...new Set(["#ef8a2e","#1f5fb0",...sn])].slice(0,16);function xl(n){let t=n.surface({paper:!0,bg:"#f5efdf",maxPx:2e3}),{W:e,H:i}=t,{canvas:s,g:r}=t.layer({alpha:!1}),a="#ef8a2e",o="#1f5fb0",l=35,c=5,u=13,f=34,h="Free",d=[],p=[],T=new Map,x=30,m=Ct(160,160*(i/e)),M=m.getContext("2d");{let O=m.width,D=m.height,R=M.createLinearGradient(0,0,0,D*.62);R.addColorStop(0,"#4a3a9a"),R.addColorStop(.5,"#e0507a"),R.addColorStop(1,"#f8a94a"),M.fillStyle=R,M.fillRect(0,0,O,D),M.fillStyle="#ffe680",M.beginPath(),M.arc(O*.62,D*.47,D*.13,0,st),M.fill();let B=M.createLinearGradient(0,D*.62,0,D);B.addColorStop(0,"#2d6fb0"),B.addColorStop(1,"#10305e"),M.fillStyle=B,M.fillRect(0,D*.62,O,D),M.fillStyle="#ffd36b";for(let b=0;b<26;b++)M.fillRect(O*.62-(4+b*.7)+Math.sin(b*1.3)*3,D*.63+b*D*.014,(4+b*.7)*2,1.2);M.fillStyle="#20264a",M.beginPath(),M.moveTo(0,D*.62),M.lineTo(O*.22,D*.5),M.lineTo(O*.42,D*.62),M.fill()}let y=M.getImageData(0,0,m.width,m.height).data;function w(O,D){let R=Math.min(m.width-1,Math.floor(O/e*m.width)),b=(Math.min(m.height-1,Math.floor(D/i*m.height))*m.width+R)*4,P=42,A=()=>(Math.random()-.5)*P*2,N=v=>Math.max(0,Math.min(255,(v-128)*1.45+128+A()));return`rgb(${N(y[b])},${N(y[b+1])},${N(y[b+2])})`}let I=(O,D)=>`${Math.floor(O/x)},${Math.floor(D/x)}`;function L(O,D){let R=Math.floor(O/x),B=Math.floor(D/x),b=u*u;for(let P=-1;P<=1;P++)for(let A=-1;A<=1;A++){let N=T.get(`${R+P},${B+A}`);if(N){for(let v of N)if((v.x-O)**2+(v.y-D)**2<b)return!1}}return!0}function g(O){r.fillStyle=O.c,r.beginPath(),r.arc(O.x,O.y,O.r,0,st),r.fill()}function _(O,D){if(O<0||D<0||O>e||D>i||!L(O,D))return;let R=h==="Scene"?w(O,D):Math.random()*100<l?o:a,B={x:O,y:D,r:c*(.86+Math.random()*.28),c:R};d.push(B);let b=I(O,D);T.has(b)||T.set(b,[]),T.get(b).push(B),g(B)}function U(O,D){for(let R=0;R<22;R++){let B=Math.random()*st,b=Math.sqrt(Math.random())*f;_(O+Math.cos(B)*b,D+Math.sin(B)*b)}E.textContent=`${d.length.toLocaleString()} dots`}let C=null;t.pointer({down(O){p.push(d.length),C=O,U(O.x,O.y)},move(O){let D=Math.hypot(O.x-C.x,O.y-C.y),R=Math.ceil(D/(f*.6));for(let B=1;B<=R;B++)U(C.x+(O.x-C.x)*B/R,C.y+(O.y-C.y)*B/R);C=O},up(){C=null}});function F(){r.fillStyle="#f5efdf",r.fillRect(0,0,e,i),T=new Map;for(let O of d){g(O);let D=I(O.x,O.y);T.has(D)||T.set(D,[]),T.get(D).push(O)}E.textContent=`${d.length.toLocaleString()} dots`}n.undo=()=>{p.length&&(d.length=p.pop(),F())},n.clear=()=>{d=[],p=[],F()},n.snapshot=()=>s,n.ui.swatches(kh,a,O=>{a=O}),n.ui.sep(),n.ui.swatches(kh,o,O=>{o=O}),n.ui.sep(),n.ui.slider("Mix",0,100,l,O=>{l=O}),n.ui.slider("Dot",2,12,c,O=>{c=O,u=Math.max(u,O*2.1)}),n.ui.slider("Space",5,34,u,O=>{u=O}),n.ui.seg(["Free","Scene"],h,O=>{h=O}),n.ui.toggle("Squint",!1,O=>{s.style.transition="filter .7s",s.style.filter=O?`blur(${Math.max(4,u*.75)}px) saturate(1.25)`:""});let E=n.ui.readout("0 dots");F(),n.hint("Two colours, side by side. Dab away, then press Squint. Scene mode paints a hidden seascape.")}var ss=n=>(t,e,i)=>{let s=t.createLinearGradient(0,0,e,i);n.forEach((r,a,o)=>s.addColorStop(a/(o.length-1),r)),t.fillStyle=s,t.fillRect(0,0,e,i)},Bh={Rainbow(n,t,e){let i=n.createLinearGradient(0,0,t,e);["#ff3d81","#ffb13d","#fff14d","#3dff9e","#3dc8ff","#7a5cff","#ff3dd0","#ff3d81","#ffb13d","#fff14d","#3dff9e"].forEach((s,r,a)=>i.addColorStop(r/(a.length-1),s)),n.fillStyle=i,n.fillRect(0,0,t,e)},Sunset:ss(["#3a1a6e","#c02a6a","#ff5a4d","#ffb347","#ffe08a","#ff6a8a","#7a3dd0","#ff5a4d","#ffb347"]),Ocean:ss(["#06304a","#0f7a9a","#35e0d0","#c0fff0","#1fa3d8","#123a8a","#35c9e0","#7affd8","#0f7a9a"]),Silver:ss(["#6a7078","#e8ecf0","#ffffff","#9aa2ac","#f0f4f8","#7a828c","#dfe6ee","#ffffff","#8a929c"]),Copper:ss(["#5a2a12","#d67a44","#ffd2b0","#a8532a","#ffb88a","#6d3418","#e8945a","#ffe0c8","#8c4522"]),Candy:ss(["#ff8fb1","#ffe08a","#8ff0d0","#a0c4ff","#d8a0ff","#ff8fb1","#ffe08a","#8ff0d0","#a0c4ff"]),Acid:ss(["#0a2a0a","#3dff5a","#e6ff3d","#1fd8a0","#c6ff3d","#0f6a3a","#3dff9e","#fff14d","#2fbf4a"]),Gold(n,t,e){let i=n.createLinearGradient(0,0,t,e*.4);["#7a4f12","#e8c15a","#fff4b8","#b98226","#ffe58f","#8a5c16","#f3d272","#fff8d0","#9c6c1c"].forEach((s,r,a)=>i.addColorStop(r/(a.length-1),s)),n.fillStyle=i,n.fillRect(0,0,t,e)},Galaxy(n,t,e){n.fillStyle="#0a0620",n.fillRect(0,0,t,e);let i=De(3);for(let s=0;s<90;s++){let r=Math.random()*t,a=Math.random()*e,o=60+Math.random()*230,l=n.createRadialGradient(r,a,0,r,a,o),c=230+i(r*.003,a*.003)*130;l.addColorStop(0,`hsla(${c},90%,62%,.36)`),l.addColorStop(1,"rgba(0,0,0,0)"),n.fillStyle=l,n.fillRect(r-o,a-o,o*2,o*2)}for(let s=0;s<2600;s++)n.fillStyle=`rgba(255,255,255,${Math.random()})`,n.fillRect(Math.random()*t,Math.random()*e,1.4,1.4)},Oil(n,t,e){let i=De(9),s=4,r=Math.ceil(t/s),a=Math.ceil(e/s),o=Ct(r,a),l=o.getContext("2d"),c=l.createImageData(r,a);for(let u=0;u<a;u++)for(let f=0;f<r;f++){let h=i(f*.012,u*.012)*3+i(f*.04,u*.04)*.6,d=(u*r+f)*4;c.data[d]=128+127*Math.cos(h*6.283),c.data[d+1]=128+127*Math.cos(h*6.283+2.1),c.data[d+2]=128+127*Math.cos(h*6.283+4.2),c.data[d+3]=255}l.putImageData(c,0,0),n.drawImage(o,0,0,t,e)}};function yl(n){let t=n.surface({paper:!0,maxPx:2e3}),{W:e,H:i,px:s}=t,r=t.layer({alpha:!1,hit:!1}),a=t.layer(),o=t.layer({hit:!1}),l="Rainbow",c="Fine",u={x:0,y:0},f={x:0,y:0},h=n.rasterUndo(a.canvas),d=[],p=Ct(e*1.3,i*1.3),T=()=>Bh[l](p.getContext("2d"),p.width,p.height);function x(){let y=a.g;y.globalCompositeOperation="source-over",y.fillStyle="#0c0b0e",y.fillRect(0,0,e,i);let w=y.createLinearGradient(0,0,e,i);w.addColorStop(0,"rgba(255,255,255,.05)"),w.addColorStop(.5,"rgba(255,255,255,0)"),w.addColorStop(1,"rgba(255,255,255,.03)"),y.fillStyle=w,y.fillRect(0,0,e,i)}function m(y,w){let I=a.g,L=w.x-y.x,g=w.y-y.y,_=Math.hypot(L,g)||1;I.globalCompositeOperation="destination-out",I.strokeStyle="#000",I.lineCap="round";let U=(C,F,E)=>{I.lineWidth=E,I.beginPath(),I.moveTo(y.x+C,y.y+F),I.lineTo(w.x+C,w.y+F),I.stroke()};if(c==="Fine"&&U(0,0,2.6),c==="Wide"&&U(0,0,11),c==="Chisel")for(let C=-5;C<=5;C++)U(C*.9,-C*.9,1.5);if(c==="Comb"){let C=-g/_,F=L/_;for(let E=-3;E<=3;E++)U(C*E*6,F*E*6,1.4)}Math.random()<.4+_*.02&&d.length<240&&d.push({x:w.x,y:w.y,vx:(Math.random()-.5)*60+L*2,vy:-30-Math.random()*40,r:1+Math.random()*2.6,a:Math.random()*st,spin:(Math.random()-.5)*12,life:1.6})}let M=null;t.pointer({down(y){h(),M=y,m(y,{x:y.x+.1,y:y.y})},move(y){m(M,y),M=y,f={x:y.x/e-.5,y:y.y/i-.5}},hover(y){f={x:y.x/e-.5,y:y.y/i-.5}},up(){M=null}}),n.loop((y,w)=>{u.x=zt(u.x,f.x,.06),u.y=zt(u.y,f.y,.06);let I=r.g,L=-(.15+u.x*.28+Math.sin(w*.3)*.02)*e,g=-(.15+u.y*.28+Math.cos(w*.24)*.02)*i;I.drawImage(p,L,g,e*1.3,i*1.3);let _=o.g;_.clearRect(0,0,e,i);for(let U=d.length-1;U>=0;U--){let C=d[U];C.vy+=420*y,C.x+=C.vx*y,C.y+=C.vy*y,C.a+=C.spin*y,C.life-=y,_.save(),_.translate(C.x,C.y),_.rotate(C.a),_.fillStyle="#0c0b0e",_.fillRect(-C.r,-C.r*.4,C.r*2,C.r*.8),_.restore(),(C.life<=0||C.y>i+10)&&d.splice(U,1)}}),n.clear=()=>{h(),x()},n.snapshot=()=>{let y=Ct(e*s,i*s),w=y.getContext("2d");return w.drawImage(r.canvas,0,0),w.drawImage(a.canvas,0,0),y},T(),x(),n.ui.seg(["Fine","Wide","Chisel","Comb"],c,y=>{c=y}),n.ui.sep(),n.ui.select(Object.keys(Bh),l,y=>{l=y,T()}),n.ui.sep(),n.ui.button("Blow",()=>{for(let y=0;y<80;y++)d.push({x:Math.random()*e,y:i*(.4+Math.random()*.6),vx:200+Math.random()*500,vy:-200-Math.random()*200,r:1+Math.random()*2.4,a:0,spin:14,life:1})}),n.hint("Scrape through the black. Move around and watch the foil shift under your lines.")}var zh=["#f4dfc8","#e65f87","#f2b705","#35c9b0","#6c9bd2","#c8a2ff","#ffffff","#ff5a3d","#ff9a2e","#f7e34a","#8fd14f","#22e6ff","#3d7aff","#ff4fd8","#b0b8c4","#16130f"],Gh={Midnight:"#121527",Walnut:"#2c1c14",Felt:"#123026",Chalk:"#ece6d9",Oxblood:"#2c0d14",Plum:"#22102e",Teal:"#0c2f36",Charcoal:"#1a1a1c"},Nf=[0,2,4,7,9];function _l(n){let t=n.surface({bleed:!0,maxPx:1800}),{W:e,H:i}=t,{canvas:s,g:r}=t.layer({alpha:!1}),a=zh[1],o="Midnight",l=1.2,c=[],u=[],f=null,h=null,d=Math.min(e,i)*.39,p=e/2,T=i/2+6;function x(U){let C=Math.round(36-Math.log2(At(U,20,1400)/20)*7.5),F=Math.floor(C/12),E=Nf[Math.min(4,Math.floor((C%12+12)%12/2.4))];return 110*Math.pow(2,F+E/12-1)}let m=(U,C,F=16)=>{let E=null,O=F;for(let D of c){let R=Fe(U,C,D.x,D.y);R<O&&(O=R,E=D)}return E};function M(U,C){if(U===C||u.some(E=>E.a===U&&E.b===C||E.a===C&&E.b===U))return;let F={a:U,b:C,colour:a,weight:l,amp:0,len:Fe(U.x,U.y,C.x,C.y)};u.push(F),y(F,5)}function y(U,C){U.amp=Math.max(U.amp,C);let F=(U.a.x+U.b.x)/2;Oi(x(U.len),{dur:1.3,vol:.09,pan:At(F/e*2-1,-1,1)})}function w(U,C,F,E,O,D,R,B){let b=(F-U)*(B-D)-(E-C)*(R-O);if(!b)return!1;let P=((O-U)*(B-D)-(D-C)*(R-O))/b,A=((O-U)*(E-C)-(D-C)*(F-U))/b;return P>=0&&P<=1&&A>=0&&A<=1}let I=null;t.pointer({down(U){let C=m(U.x,U.y);if(C){f=C,h=U;return}I={x:U.x,y:U.y,sx:U.x,sy:U.y,moved:!1,n:0}},move(U){if(f){h=U;let C=m(U.x,U.y,13);C&&C!==f&&(M(f,C),f=C);return}if(I){Fe(U.x,U.y,I.sx,I.sy)>6&&(I.moved=!0);for(let C of u)C.hot||w(I.x,I.y,U.x,U.y,C.a.x,C.a.y,C.b.x,C.b.y)&&(C.hot=.09,I.n++<14?y(C,9):C.amp=Math.max(C.amp,7));I.x=U.x,I.y=U.y}},up(U){if(f){let C=m(U.x,U.y,16);C&&C!==f&&M(f,C),f=null,h=null}else I&&!I.moved&&(c.push({x:U.x,y:U.y}),Oi(1400,{dur:.05,vol:.05,type:"square"}));I=null}}),n.loop((U,C)=>{let F=o==="Chalk";r.fillStyle=Gh[o],r.fillRect(0,0,e,i),r.lineCap="round";for(let E of u){E.hot&&(E.hot=Math.max(0,E.hot-U)),E.amp*=Math.exp(-U*3.6),E.amp<.05&&(E.amp=0);let O=(E.a.x+E.b.x)/2,D=(E.a.y+E.b.y)/2,R=-(E.b.y-E.a.y)/(E.len||1),B=(E.b.x-E.a.x)/(E.len||1),b=E.amp*Math.sin(C*(2200/Math.max(60,E.len)+16));r.strokeStyle=E.colour,r.lineWidth=E.weight+(E.amp>1?.5:0),r.globalAlpha=.74,r.beginPath(),r.moveTo(E.a.x,E.a.y),E.amp?r.quadraticCurveTo(O+R*b*2,D+B*b*2,E.b.x,E.b.y):r.lineTo(E.b.x,E.b.y),r.stroke()}r.globalAlpha=1,f&&h&&(r.strokeStyle=a,r.lineWidth=l,r.setLineDash([5,5]),r.beginPath(),r.moveTo(f.x,f.y),r.lineTo(h.x,h.y),r.stroke(),r.setLineDash([]));for(let E of c)r.fillStyle="rgba(0,0,0,.34)",r.beginPath(),r.arc(E.x+1.4,E.y+1.8,2.8,0,st),r.fill(),r.fillStyle=F?"#4b4640":"#d9cdbd",r.beginPath(),r.arc(E.x,E.y,2.5,0,st),r.fill()});function L(U,C){c=[],u=[];for(let F=0;F<U;F++){let E=F/U*st-Math.PI/2;c.push({x:p+Math.cos(E)*d,y:T+Math.sin(E)*d})}for(let F=0;F<U;F++){let E=c[F],O=c[Math.round(F*C)%U];E!==O&&u.push({a:E,b:O,colour:a,weight:.9,amp:0,len:Fe(E.x,E.y,O.x,O.y)})}}let g=180,_=2;n.undo=()=>{u.length?u.pop():c.pop()},n.clear=()=>{c=[],u=[]},n.snapshot=()=>s,n.ui.swatches(zh,a,U=>{a=U}),n.ui.sep(),n.ui.select(Object.keys(Gh),o,U=>{o=U}),n.ui.slider("Gauge",.6,3,l,U=>{l=U},.1),n.ui.sep(),n.ui.slider("Pins",24,300,g,U=>{g=U,L(g,_)}),n.ui.slider("Times",2,40,_,U=>{_=U,L(g,_)},.1),n.ui.button("Ring",()=>{let U=[];for(let C=0;C<24;C++){let F=C/24*st-Math.PI/2;U.push({x:p+Math.cos(F)*d,y:T+Math.sin(F)*d})}c.push(...U)}),L(g,_),n.hint("Tap to pin, drag pin to pin to wind thread, and swipe across strings to play them.")}var Vr={Classic:["#00000000","#14111e","#3a3560","#6f6aa8","#c6c3e6","#f7f4ec","#d83a4a","#f08a4b","#fbd06b","#6fce5a","#1f8a70","#2d8fd5","#7ad7f0","#b14fc0","#ef8fb1","#7a4a2c"],Sunset:["#00000000","#1a0f2e","#3f1d5c","#7a2a8c","#c0367a","#f04a6a","#f8784a","#fba84a","#fdd76a","#fff4d0","#2a3f7a","#3f7ab0","#7ac8d0","#2f6a5a","#7ab060","#5a2f2a"],Forest:["#00000000","#0f1a14","#1f3a2a","#2f6a4a","#4f9a5a","#8fc85a","#d0e07a","#f4f0c0","#7a5a3a","#a87a4a","#d0a06a","#3a6a7a","#6aa8b0","#c04a3a","#e8903a","#f0c84a"],Candy:["#00000000","#2a1a3a","#5a4a8a","#a08ae0","#d8c8ff","#fff6f0","#ff5a8a","#ff9ab8","#ffd0dc","#ffe08a","#8ff0a8","#5ad8c0","#6ac0ff","#b8e0ff","#ff9a5a","#c87a5a"],Arcade:["#00000000","#000000","#1d2b53","#7e2553","#008751","#ab5236","#5f574f","#c2c3c7","#fff1e8","#ff004d","#ffa300","#ffec27","#00e436","#29adff","#83769c","#ff77a8"]},ki=Vr.Classic,$s=4;function vl(n){let t=n.surface({aspect:1,bg:"#2a2740",maxPx:1400}),{W:e,H:i}=t,{canvas:s,g:r}=t.layer();r.imageSmoothingEnabled=!1;let a=32,o=[],l=0,c=1,u="pencil",f=!1,h=!0,d=!1,p=6,T=0,x=!0,m=()=>new Uint8Array(a*a),M=()=>{o=Array.from({length:$s},m)};function y(){let S=(Z,Y,j,ct)=>{Y>=0&&j>=0&&Y<a&&j<a&&(Z[j*a+Y]=ct)},V=[[9,8,0],[10,7,-1],[9,8,0],[8,9,1]],W=[0,-3,-5,-1];o.forEach((Z,Y)=>{let[j,ct,ut]=[V[Y][1]+1,V[Y][0],V[Y][2]],ht=16,Rt=19+W[Y];for(let Ft=-ct;Ft<=ct;Ft++)for(let Jt=-j;Jt<=j;Jt++){let ce=Jt*Jt/(j*j)+Ft*Ft/(ct*ct);ce<=.93&&S(Z,ht+Jt,Rt+Ft,ce>.68?1:Ft<-ct*.4&&Jt<0?8:7)}[-3,3].forEach(Ft=>{S(Z,ht+Ft,Rt-2+ut,1),S(Z,ht+Ft,Rt-3+ut,1),S(Z,ht+Ft+1,Rt-3+ut,5)});for(let Ft=-1;Ft<=1;Ft++)S(Z,ht+Ft,Rt+2+ut,1);let Ut=11-Math.abs(W[Y]);for(let Ft=-Ut;Ft<=Ut;Ft++)S(Z,16+Ft,29,2)})}let w=()=>e/a,I=S=>[Math.floor(S.x/e*a),Math.floor(S.y/i*a)],L=(S,V)=>S>=0&&V>=0&&S<a&&V<a;function g(S,V,W){let Z=o[l];L(S,V)&&(Z[V*a+S]=W,f&&(Z[V*a+(a-1-S)]=W))}function _(S,V){u==="pencil"&&g(S,V,c),u==="erase"&&g(S,V,0),u==="dither"&&(S+V)%2===0&&g(S,V,c)}function U(S,V,W,Z){let Y=Math.abs(W-S),j=-Math.abs(Z-V),ct=S<W?1:-1,ut=V<Z?1:-1,ht=Y+j;for(;_(S,V),!(S===W&&V===Z);){let Rt=2*ht;Rt>=j&&(ht+=j,S+=ct),Rt<=Y&&(ht+=Y,V+=ut)}}function C(S,V){let W=o[l],Z=W[V*a+S];if(Z===c)return;let Y=[[S,V]];for(;Y.length;){let[j,ct]=Y.pop();!L(j,ct)||W[ct*a+j]!==Z||(W[ct*a+j]=c,Y.push([j+1,ct],[j-1,ct],[j,ct+1],[j,ct-1]))}}let F=null;t.pointer({down(S){R();let[V,W]=I(S);L(V,W)&&(u==="fill"?(C(V,W),F=null):u==="pick"?(c=o[l][W*a+V]||c,b.set(ki[c]),F=null):(_(V,W),F=[V,W],qt("blip")),G())},move(S){if(!F)return;let[V,W]=I(S);U(F[0],F[1],V,W),F=[V,W],G()},up(){F=null}});function E(S,V,W,Z=1){let Y=W/a;S.globalAlpha=Z;for(let j=0;j<a;j++)for(let ct=0;ct<a;ct++){let ut=V[j*a+ct];ut&&(S.fillStyle=ki[ut],S.fillRect(ct*Y,j*Y,Y+.5,Y+.5))}S.globalAlpha=1}function O(S,V){let W=V/a;S.fillStyle="#2a2740",S.fillRect(0,0,V,V),S.fillStyle="#322e4c";for(let Z=0;Z<a;Z++)for(let Y=Z%2;Y<a;Y+=2)S.fillRect(Y*W,Z*W,W+.5,W+.5)}n.loop(S=>{if(d){T+=S*p;let V=Math.floor(T)%$s;V!==l&&(l=V,v())}if(O(r,e),h&&!d&&E(r,o[(l+$s-1)%$s],e,.22),E(r,o[l],e),x&&!d){r.strokeStyle="rgba(255,255,255,.05)",r.lineWidth=1,r.beginPath();for(let V=1;V<a;V++){let W=V*w();r.moveTo(W,0),r.lineTo(W,i),r.moveTo(0,W),r.lineTo(e,W)}r.stroke()}});let D=[],R=()=>{D.push({i:l,f:o[l].slice()}),D.length>40&&D.shift()};n.undo=()=>{let S=D.pop();S&&(o[S.i].set(S.f),G())},n.clear=()=>{R(),o[l].fill(0),G()},n.snapshot=()=>{let S=Ct(a*16,a*16),V=S.getContext("2d");return O(V,S.width),E(V,o[l],S.width),S},n.dock.classList.add("dense");let B=document.createElement("div");B.style.display="contents",n.dock.appendChild(B);let b,P=()=>{let S=new Set(n.dock.children);b=n.ui.swatches(ki.slice(1),ki[c],V=>{c=ki.indexOf(V)},{custom:!1}),B.replaceChildren(...[...n.dock.children].filter(V=>!S.has(V)))};ki=Vr.Classic,P(),n.ui.select(Object.keys(Vr),"Classic",S=>{ki=Vr[S],P(),G()}),n.ui.sep(),n.ui.seg([["pencil","Pen"],["fill","Fill"],["dither","Dither"],["erase","Rub"],["pick","Pick"]],u,S=>{u=S}),n.ui.toggle("Mirror",f,S=>{f=S}),n.ui.sep();let A=document.createElement("div");A.className="strip",n.dock.appendChild(A);let N=Array.from({length:$s},(S,V)=>{let W=document.createElement("button");W.style.cssText="width:34px;height:34px;border-radius:6px;padding:0;overflow:hidden;background:#2a2740",W.setAttribute("aria-label",`Frame ${V+1}`);let Z=Ct(64,64);return Z.style.cssText="width:100%;height:100%;display:block;image-rendering:pixelated",W.appendChild(Z),W.onclick=()=>{l=V,T=V,v()},A.appendChild(W),{b:W,c:Z}});function v(){N.forEach(({b:S},V)=>S.classList.toggle("on",V===l))}function G(){N.forEach(({c:S},V)=>{let W=S.getContext("2d");W.clearRect(0,0,64,64),E(W,o[V],64)})}n.ui.toggle("Onion",h,S=>{h=S});let q=n.ui.button("Play",()=>{d=!d,q.textContent=d?"Stop":"Play",q.classList.toggle("on",d)},"hot");n.ui.slider("Speed",2,14,p,S=>{p=S}),n.ui.seg([[16,"16"],[32,"32"],[48,"48"]],a,S=>{a=S,M(),G()}),M(),y(),G(),v(),n.hint("Meet Pip. Press Play, then draw your own over four frames with the onion skin on.")}var Ml="round and round the word goes ",Vh={Plum:n=>`hsl(${290+n*70},72%,${76-n*20}%)`,Gilt:n=>`hsl(${44-n*16},82%,${74-n*16}%)`,Glass:n=>`hsl(${n*340},86%,68%)`,Bone:()=>"#f3ead9",Ocean:n=>`hsl(${170+n*60},78%,${72-n*16}%)`,Ember:n=>`hsl(${50-n*50},94%,${70-n*12}%)`,Moss:n=>`hsl(${70+n*70},58%,${70-n*18}%)`,Rose:n=>`hsl(${345-n*40},84%,${80-n*18}%)`,Neon:n=>`hsl(${n*900%360},100%,62%)`};function Sl(n){let t=n.surface({bleed:!0,bg:"#160a1c",maxPx:1800}),{W:e,H:i}=t,{canvas:s,g:r}=t.layer({alpha:!1}),a=t.layer({hit:!1}),o=e/2,l=i/2,c=Math.hypot(e,i)/2,u=n.rasterUndo(s),f=Ml,h=12,d=!0,p="Plum",T=1,x=!1,m=0,M=null,y={x:0,y:0,carry:0};function w(){r.fillStyle="#160a1c",r.fillRect(0,0,e,i)}let I=(F,E)=>At(Math.hypot(F-o,E-l)*.075+7,7,46)*T,L=()=>{if(!M){let F=f.trim()?f:Ml;M=F[m++%F.length]}return M};function g(F,E,O,D){let R=I(E,O),B=At(Math.hypot(E-o,O-l)/c);r.font=`600 ${R.toFixed(1)}px Fraunces`,r.fillStyle=Vh[p](B),r.textAlign="center",r.textBaseline="middle";for(let b=0;b<h;b++)for(let P of d?[1,-1]:[1])r.save(),r.translate(o,l),r.rotate(b/h*st),r.scale(1,P),r.translate(E-o,O-l),r.rotate(D),r.fillText(F,0,0),r.restore()}function _(F){if(!x)return F;let E=F.x-o,O=F.y-l,D=Math.hypot(E,O)||1,R=Math.max(1,Math.round(D/34))*34;return{x:o+E/D*R,y:l+O/D*R}}function U(F){let E=F.x-y.x,O=F.y-y.y,D=Math.hypot(E,O);if(D<.5)return;let R=E/D,B=O/D,b=Math.atan2(O,E),P=y.x,A=y.y,N=D,v=y.carry;for(;;){let G=L();r.font=`600 ${I(P,A).toFixed(1)}px Fraunces`;let q=r.measureText(G).width+1;if(v+N<q){y.carry=v+N;break}let S=q-v;P+=R*S,A+=B*S,N-=S,v=0,g(G,zt(P,P-R*q,.5),zt(A,A-B*q,.5),b),M=null}y.x=F.x,y.y=F.y}function C(){let F=a.g;F.clearRect(0,0,e,i),F.strokeStyle="rgba(255,255,255,.07)",F.lineWidth=1,F.save(),F.translate(o,l);for(let E=0;E<h;E++){let O=E/h*st;F.beginPath(),F.moveTo(0,0),F.lineTo(Math.cos(O)*c,Math.sin(O)*c),F.stroke()}if(x)for(let E=34;E<c;E+=34)F.beginPath(),F.arc(0,0,E,0,st),F.stroke();F.restore()}t.pointer({down(F){u();let E=_(F);y.x=E.x,y.y=E.y,y.carry=0},move(F){U(_(F))}}),n.clear=()=>{u(),w(),m=0,M=null},n.snapshot=()=>s,w(),C(),n.ui.text(Ml.trim(),F=>{f=F+" ",m=0,M=null},"Type a mantra"),n.ui.sep(),n.ui.select(Object.keys(Vh),p,F=>{p=F}),n.ui.slider("Spokes",3,32,h,F=>{h=F,C()}),n.ui.slider("Letters",.5,2,T,F=>{T=F},.05),n.ui.toggle("Mirror",d,F=>{d=F}),n.ui.toggle("Rings",x,F=>{x=F,C()}),n.hint("Paint outward from the middle. Letters are tiny at the centre and grow towards the edge.")}var Df=sn;function bl(n){let t=n.surface({bleed:!0,maxPx:1800}),{W:e,H:i,px:s}=t,{canvas:r,g:a}=t.layer({alpha:!1}),o=Math.min(e-40,i-166)/2,l=e/2,c=(i+66-80)/2,u=Math.ceil(o*2*s),f=Ct(u,u),h=f.getContext("2d");h.setTransform(s,0,0,s,o*s,o*s),h.lineCap="round";let d="#e0308a",p=.55,T=1,x=0,m=0,M=!1,y=5,w=[],I={x:0,y:0,down:!1,wait:0};function L(){h.save(),h.setTransform(1,0,0,1,0,0),h.fillStyle="#fbf8f1",h.fillRect(0,0,u,u),h.restore()}function g(R,B){let b=R-l,P=B-c,A=Math.cos(-m),N=Math.sin(-m);return[b*A-P*N,b*N+P*A]}function _(){let[R,B]=g(I.x,I.y);if(!(Math.hypot(R,B)>o))for(let b=0;b<y+3;b++){let P=Math.random()*st,A=Math.random()*9,N=R+Math.cos(P)*A,v=B+Math.sin(P)*A,G=.7+Math.pow(Math.random(),2)*3.4;w.length<1100&&w.push({x:N,y:v,vx:0,vy:0,r:G,c:d,life:7+Math.random()*3,drag:1.4+Math.random()*5}),h.fillStyle=d,h.beginPath(),h.arc(N,v,G,0,st),h.fill()}}function U(R){let B=x,b=B*B;for(let P=w.length-1;P>=0;P--){let A=w[P],N=Math.hypot(A.x,A.y),v=b*N;if(A.life-=R,v>34){let W=b*A.x+2*B*A.vy,Z=b*A.y-2*B*A.vx;A.vx+=W*R,A.vy+=Z*R}let G=Math.exp(-R*A.drag);A.vx*=G,A.vy*=G;let q=A.x,S=A.y;A.x+=A.vx*R,A.y+=A.vy*R;let V=Math.hypot(A.x-q,A.y-S);if(V>.05){if(A.r=Math.max(.28,A.r-V*.007),A.r>1.2&&V>1.5&&Math.random()<.03&&w.length<1100){let W=(Math.random()-.5)*.7;w.push({x:A.x,y:A.y,vx:A.vx-A.vy*W,vy:A.vy+A.vx*W,r:A.r*.45,c:A.c,life:3,drag:.8+Math.random()*3})}h.strokeStyle=A.c,h.lineWidth=A.r*1.3,h.beginPath(),h.moveTo(q,S),h.lineTo(A.x,A.y),h.stroke()}(N>o+8||A.life<=0||A.r<=.3)&&w.splice(P,1)}}t.pointer({down(R){E(),I.down=!0,I.x=R.x,I.y=R.y},move(R){I.x=R.x,I.y=R.y},hover(R){I.x=R.x,I.y=R.y},up(){I.down=!1}});function C(R,B=1){a.save(),a.globalAlpha=B,a.translate(l,c),a.rotate(R),a.beginPath(),a.arc(0,0,o,0,st),a.clip(),a.drawImage(f,-o,-o,o*2,o*2),a.restore()}n.loop(R=>{let B=M?0:p*7.5*T;x=zt(x,B,1-Math.exp(-R*(M?2.6:1.3))),M&&Math.abs(x)<.02&&(x=0),m+=x*R,I.down&&(I.wait-=R,I.wait<=0&&(_(),I.wait=.05+Math.random()*.13));for(let v=0;v<3;v++)U(R/3);let b=a.createRadialGradient(l,c,o*.8,l,c,Math.max(e,i)*.8);b.addColorStop(0,"#2b2630"),b.addColorStop(1,"#100e13"),a.fillStyle=b,a.fillRect(0,0,e,i),a.save(),a.shadowColor="rgba(0,0,0,.7)",a.shadowBlur=40,a.shadowOffsetY=18,a.fillStyle="#17151a",a.beginPath(),a.arc(l,c,o+14,0,st),a.fill(),a.restore();let P=a.createConicGradient(.8,l,c);["#555","#bbb","#444","#999","#555"].forEach((v,G)=>P.addColorStop(G/4,v)),a.strokeStyle=P,a.lineWidth=3,a.beginPath(),a.arc(l,c,o+8,0,st),a.stroke();let A=Math.abs(x)*.016,N=At(Math.round(A*26),1,6);C(m);for(let v=1;v<N;v++)C(m-x*.016*v/N,.5/v);a.fillStyle="#26232b",a.beginPath(),a.arc(l,c,11,0,st),a.fill(),a.fillStyle="#c9c6cf",a.beginPath(),a.arc(l,c,4,0,st),a.fill(),I.down&&(a.fillStyle=d,a.strokeStyle="#fff",a.lineWidth=2,a.beginPath(),a.arc(I.x,I.y,7,0,st),a.fill(),a.stroke()),D.textContent=`${Math.abs(Math.round(x/st*60))} rpm`,wh(Math.abs(x)/7.5)});let F=[],E=()=>{let R=Ct(u,u);R.getContext("2d").drawImage(f,0,0),F.push(R),F.length>10&&F.shift()};n.undo=()=>{let R=F.pop();R&&(w.length=0,h.save(),h.setTransform(1,0,0,1,0,0),h.drawImage(R,0,0),h.restore())},n.clear=()=>{E(),w.length=0,L()},n.snapshot=()=>{let R=Ct(u,u),B=R.getContext("2d");return B.fillStyle="#14121a",B.fillRect(0,0,u,u),B.beginPath(),B.arc(u/2,u/2,u/2,0,st),B.clip(),B.drawImage(f,0,0),R},L(),n.ui.swatches(Df,d,R=>{d=R}),n.ui.sep(),n.ui.slider("Throttle",0,100,p*100,R=>{p=R/100,M=!1,O.classList.remove("on")}),n.ui.slider("Flow",1,12,y,R=>{y=R}),n.ui.button("Reverse",()=>{T*=-1});let O=n.ui.toggle("Brake",!1,R=>{M=R});n.ui.button("New card",()=>n.clear(),"hot");let D=n.ui.readout("0 rpm");n.hint("Hold on the spinning card to squeeze paint. Hit the brake to see what you made.")}var wl=`
float hash(vec2 p){ return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453); }
float vnoise(vec2 p){ vec2 i=floor(p),f=fract(p); f=f*f*(3.-2.*f);
  return mix(mix(hash(i),hash(i+vec2(1,0)),f.x),mix(hash(i+vec2(0,1)),hash(i+vec2(1,1)),f.x),f.y); }
// Paper is long fibres: stretched noise at a few angles.
float fibre(vec2 p){
  float a = vnoise(p*vec2(.06,.5));
  float b = vnoise(vec2(p.x*.42+p.y*.2,p.y*.05-p.x*.1)+9.);
  float c = vnoise(p*.13+31.);
  return .35+.65*(a*.4+b*.4+c*.2);
}`,Uf=`
in vec2 uv; out vec4 o;
uniform sampler2D s; uniform vec2 px; uniform vec2 res; uniform float dry;
${wl}
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
}`,Of=`
in vec2 uv; out vec4 o;
uniform sampler2D s; uniform vec2 a,b,res; uniform float rad,ink,water;
${wl}
void main(){
  vec4 c = texture(s,uv);
  vec2 p = uv*res, pa = p-a, ba = b-a;
  float h = clamp(dot(pa,ba)/max(dot(ba,ba),.001),0.,1.);
  float d = length(pa-ba*h);
  // Bristles: the brush edge breaks up, so dry strokes look dry.
  float bristle = .55+.9*vnoise(p*.55+a*.02);
  float m = smoothstep(rad,rad*.35,d*bristle);
  o = vec4(c.r+ink*m,min(1.,c.g+water*m),c.b,1.);
}`,Ff=`
in vec2 uv; out vec4 o;
uniform sampler2D s; uniform vec2 res; uniform vec3 paper, inkc;
${wl}
void main(){
  vec4 c = texture(s,uv);
  float f = fibre(uv*res*1.6);
  float grain = vnoise(uv*res*1.4)*.05;
  float amt = c.r+c.b;
  // Beer-Lambert: thin ink is grey, thick ink is black, and never quite flat.
  vec3 col = mix(paper,inkc,1.-exp(-amt*(1.25+f*.7)));
  col *= 1.-grain+c.g*.0;
  col -= vec3(.016,.014,.01)*clamp(c.g*2.2,0.,1.);
  o = vec4(col,1.);
}`,Hh={Rice:[.94,.915,.86],Bone:[.97,.955,.925],Kraft:[.76,.66,.52],Blush:[.95,.86,.83],Sky:[.85,.91,.94]},Wh={Sumi:[.055,.058,.075],Indigo:[.06,.1,.36],Sepia:[.27,.15,.07],Oxblood:[.36,.05,.07],Moss:[.1,.26,.13],Violet:[.27,.09,.42],Teal:[.03,.3,.32],Rust:[.56,.2,.06],Rose:[.72,.14,.36]};function Tl(n){let t=n.surface({paper:!0,maxPx:1700}),{W:e,H:i,px:s}=t,r=t.layer({gl:!0}),a=Fn(r.canvas),o=Math.round(e*Math.min(s,1.25)),l=Math.round(i*Math.min(s,1.25)),c=kr(a,o,l,a.CLAMP_TO_EDGE);if(!c){n.toast("This graphics card cannot run the ink simulation");return}let u=He(a,Uf),f=He(a,Of),h=He(a,Ff),d="Sumi",p="ink",T=22,x=.5,m=1,M="Rice",y=0,w=.1,I=null;function L(C,F){a.bindFramebuffer(a.FRAMEBUFFER,c.b.fbo),a.viewport(0,0,o,l),C.use().i("s",0),gn(a,c.a.tex,0),F(C),mn(a),c.swap()}function g(C){a.bindFramebuffer(a.FRAMEBUFFER,c.a.fbo),a.clearColor(0,C,0,1),a.clear(a.COLOR_BUFFER_BIT)}let _=o/e;function U(C,F){let E=p==="water",O=Math.hypot(F.x-C.x,F.y-C.y);m=Math.max(.05,m-O*7e-4),L(f,D=>D.f("a",C.x*_,(i-C.y)*_).f("b",F.x*_,(i-F.y)*_).f("res",o,l).f("rad",T*_*(.65+m*.35)).f("ink",E?0:x*.34*m).f("water",E?.24:.06+x*.12*m))}t.pointer({down(C){m=1,I=C,U(C,{x:C.x+.2,y:C.y})},move(C){U(I,C),I=C},up(){I=null}}),n.loop(()=>{for(let C=0;C<4;C++)L(u,F=>F.f("px",1/o,1/l).f("res",o,l).f("dry",y));y=Math.max(0,y*.97-1e-5),a.bindFramebuffer(a.FRAMEBUFFER,null),a.viewport(0,0,r.canvas.width,r.canvas.height),h.use().i("s",0).f("res",o,l).f("paper",...Hh[M]).f("inkc",...Wh[d]),gn(a,c.a.tex,0),mn(a)}),n.clear=()=>g(w),n.snapshot=()=>r.canvas,g(w),n.ui.seg([["ink","Ink"],["water","Water"]],p,C=>{p=C}),n.ui.sep(),n.ui.slider("Brush",6,70,T,C=>{T=C}),n.ui.slider("Load",10,100,x*100,C=>{x=C/100}),n.ui.slider("Damp",0,30,w*100,C=>{w=At(C/100,0,.3)}),n.ui.select(Object.keys(Wh),d,C=>{d=C}),n.ui.select(Object.keys(Hh),M,C=>{M=C}),n.ui.button("Dry it off",()=>{y=.01}),n.ui.button("Wet the sheet",()=>{let C=He(a,"in vec2 uv; out vec4 o; uniform sampler2D s; uniform float add; void main(){ vec4 c = texture(s,uv); o = vec4(c.r+c.b*.3,min(1.,c.g+add),c.b*.7,1.); }");L(C,F=>F.f("add",.12))}),n.hint("Touch the brush to damp paper and let go. The ink keeps moving without you.")}var qh=["#111116","#2b2f7a","#6d1a24","#0f5e4e","#7a3db8","#c7562e","#b83a6a","#1f7a9a","#b8741a","#d92b1f","#2f8a4a","#e0308a","#5a4a3a","#4a5a7a"],kf=["A moth, filing its taxes.","Two bears agreeing to disagree.","Your landlord, seen from below.","A pelvis with ambitions.","The exact shape of last Tuesday.","A very small dragon on a very long lunch.","Two chefs fighting over one soup.","Something your mother said in 1994.","A butterfly that has seen some things.","Beetle. Definitely a beetle. Moving on.","A rug, plotting.","Twin accountants at a seance."];function El(n){let t=n.surface({aspect:1.36,maxPx:1600}),{W:e,H:i,px:s}=t,r=t.layer({alpha:!1}),a=t.buffer(),o=r.g,l=n.rasterUndo(a.canvas),c=qh[0],u=26,f="open",h=0,d="",p=null,T=e/2,x=Ct(e*s,i*s);{let L=x.getContext("2d");L.scale(s,s),L.fillStyle="#f2eee4",L.fillRect(0,0,e,i),Je(L,e,i,{alpha:.05,seed:3})}function m(L,g,_){let U=a.g;U.fillStyle=c,U.beginPath(),U.arc(L,g,_,0,st),U.fill();let C=Math.random()<.35?3:0;for(let F=0;F<C;F++){let E=Math.random()*st,O=_*(1.2+Math.random()*2.2);U.beginPath(),U.arc(L+Math.cos(E)*O,g+Math.sin(E)*O,Math.random()*_*.2,0,st),U.fill()}}t.pointer({down(L){f==="open"&&(l(),p=L,m(L.x,L.y,u),n.dismissTip())},move(L){if(!p)return;let g=Math.hypot(L.x-p.x,L.y-p.y),_=Math.ceil(g/(u*.3));for(let U=1;U<=_;U++)m(p.x+(L.x-p.x)*U/_,p.y+(L.y-p.y)*U/_,u*(.72+Math.random()*.5));p=L},up(){p=null}});function M(){let L=a.canvas.width,g=a.canvas.height,_=Ct(L,g),U=_.getContext("2d");U.drawImage(a.canvas,0,0),U.save(),U.translate(L,0),U.scale(-1,1),U.drawImage(a.canvas,0,0),U.restore();let C=Ct(L,g),F=C.getContext("2d");F.filter=`blur(${2.6*s}px)`,F.drawImage(_,0,0),F.filter="none";let E=F.getImageData(0,0,L,g),O=U.getImageData(0,0,L,g),D=E.data,R=De(Math.floor(Math.random()*999)+1),[B,b,P]=rn(c);for(let A=0;A<g;A++)for(let N=0;N<L;N++){let v=(A*L+N)*4,G=D[v+3]/255;if(G===0)continue;let q=Math.min(N,L-1-N),S=(R(q*.05/s,A*.05/s)-.5)*.5+(R(q*.2/s,A*.2/s)-.5)*.22,V=Ui(.42,.58,G+S),W=O.data[v+3]>8;D[v]=W?O.data[v]:B,D[v+1]=W?O.data[v+1]:b,D[v+2]=W?O.data[v+2]:P,D[v+3]=V*255}F.putImageData(E,0,0),a.g.save(),a.g.setTransform(1,0,0,1,0,0),a.g.clearRect(0,0,L,g),a.g.drawImage(C,0,0),a.g.restore()}function y(){f==="open"&&(l(),f="closing",h=0,qt("paper"),d="",I.textContent="")}function w(L){let g=L*Math.PI,_=Math.cos(g);o.drawImage(x,0,0,e*s/2,i*s,0,0,T,i),o.drawImage(a.canvas,0,0,a.canvas.width/2,a.canvas.height,0,0,T,i),o.save(),o.translate(T,0),o.scale(_,1),_>0?(o.drawImage(x,e*s/2,0,e*s/2,i*s,0,0,T,i),o.drawImage(a.canvas,a.canvas.width/2,0,a.canvas.width/2,a.canvas.height,0,0,T,i)):(o.fillStyle="#e4dfd2",o.fillRect(0,0,T,i)),o.fillStyle=`rgba(30,24,16,${Math.sin(g)*.28})`,o.fillRect(0,0,T,i),o.restore()}n.loop(L=>{if(o.fillStyle="#1b191e",o.fillRect(0,0,e,i),f==="open")o.save(),o.setTransform(1,0,0,1,0,0),o.drawImage(x,0,0),o.drawImage(a.canvas,0,0),o.restore();else if(h+=L,f==="closing"){let g=At(h/.75);w(g*g*(3-2*g)),g>=1&&(f="pressing",h=0,qt("thud"))}else if(f==="pressing"){o.fillStyle="#e4dfd2",o.fillRect(0,0,T,i);let g=At(h/.9)*i,_=o.createLinearGradient(0,g-90,0,g+30);_.addColorStop(0,"rgba(30,24,16,0)"),_.addColorStop(.8,"rgba(30,24,16,.32)"),_.addColorStop(1,"rgba(30,24,16,0)"),o.fillStyle=_,o.fillRect(0,0,T,i),h>=.9&&(M(),f="opening",h=0,qt("paper"))}else{let g=At(h/.75);w(1-g*g*(3-2*g)),g>=1&&(f="open",d=qs(kf),I.textContent=`The analyst notes: ${d}`)}o.strokeStyle="rgba(40,30,20,.16)",o.lineWidth=1,o.beginPath(),o.moveTo(T,0),o.lineTo(T,i),o.stroke()}),n.clear=()=>{l(),a.g.save(),a.g.setTransform(1,0,0,1,0,0),a.g.clearRect(0,0,a.canvas.width,a.canvas.height),a.g.restore(),I.textContent=""},n.snapshot=()=>r.canvas,n.ui.swatches(qh,c,L=>{c=L}),n.ui.sep(),n.ui.slider("Brush",6,60,u,L=>{u=L}),n.ui.button("Fold and press",y,"hot");let I=n.ui.readout("");n.hint("Dab ink on the left half, then Fold and press. Paint more and fold again to build it up.")}var Al=["#1f6fc4","#d43d3d","#e8b92e","#2a9d6a","#7a3db8","#3fb3d8","#e8772e","#f3e9c8","#7fc9a9","#b0245f","#12368a","#f4d65a","#ff8fb1","#8fd14f","#0f7a7a","#c0a0e8","#a84a1e","#d8ecf4"];function Cl(n){let t=n.surface({bleed:!0,maxPx:1600}),{W:e,H:i,px:s}=t,{canvas:r,g:a}=t.layer({alpha:!1}),o=i*.66,l=Math.min(e*.62,o*.74),c=(e-l)/2,u=66,f=Math.round(l*s),h=Math.round(o*s),d=Ct(f,h),p=d.getContext("2d",{willReadFrequently:!0});p.lineCap="round",p.lineJoin="round";let T=Ct(f,h),x=T.getContext("2d"),m=Ct(f,h),M=m.getContext("2d"),y=new Uint32Array(f*h),w=new Uint8Array(f*h),I=Al[0],L=.3,g=5,_=!0,U="lead";function C(S,V,W){let Z=W*.42;S.beginPath(),S.moveTo(0,W),S.lineTo(0,Z),S.quadraticCurveTo(0,Z*.34,V/2,0),S.quadraticCurveTo(V,Z*.34,V,Z),S.lineTo(V,W),S.closePath()}C(x,f,h),x.fillStyle="#fff",x.fill();{let S=x.getImageData(0,0,f,h).data;for(let V=0;V<w.length;V++)w[V]=S[V*4+3]>128?1:0}let F=Ct(f,h);{let S=F.getContext("2d"),V=De(14),W=S.createImageData(f,h);for(let Z=0;Z<h;Z++)for(let Y=0;Y<f;Y++){let j=V(Y*.012,Z*.05)*.6+V(Y*.05,Z*.015)*.25+V(Y*.3,Z*.3)*.15,ct=(Z*f+Y)*4;W.data[ct]=W.data[ct+1]=W.data[ct+2]=90+j*150,W.data[ct+3]=255}S.putImageData(W,0,0)}let E=S=>{let[V,W,Z]=rn(S);return(255<<24|Z<<16|W<<8|V)>>>0};function O(){return p.getImageData(0,0,f,h).data}function D(S,V,W){let Z=O(),Y=ht=>Z[ht*4+3]>90||!w[ht],j=V*f+S;if(Y(j))return;let ct=new Uint8Array(f*h),ut=[j];for(ct[j]=1;ut.length;){let ht=ut.pop();y[ht]=W;let Rt=ht%f;Rt>0&&!ct[ht-1]&&!Y(ht-1)&&(ct[ht-1]=1,ut.push(ht-1)),Rt<f-1&&!ct[ht+1]&&!Y(ht+1)&&(ct[ht+1]=1,ut.push(ht+1)),ht>=f&&!ct[ht-f]&&!Y(ht-f)&&(ct[ht-f]=1,ut.push(ht-f)),ht<f*(h-1)&&!ct[ht+f]&&!Y(ht+f)&&(ct[ht+f]=1,ut.push(ht+f))}_=!0}function R(){let S=M.createImageData(f,h),V=new Uint32Array(S.data.buffer),W=E("#3a3f4a");for(let Z=0;Z<y.length;Z++)V[Z]=w[Z]?y[Z]||W:0;M.putImageData(S,0,0),M.globalCompositeOperation="overlay",M.drawImage(F,0,0),M.globalCompositeOperation="destination-in",M.drawImage(T,0,0),M.globalCompositeOperation="source-over"}let B=S=>[(S.x-c)/l*f,(S.y-u)/o*h],b=null,P=0,A=null;function N(S,V){p.strokeStyle="#141216",p.lineWidth=g*s,p.beginPath(),p.moveTo(S[0],S[1]),p.lineTo(V[0],V[1]),p.stroke(),_=!0}t.pointer({down(S){G(),A=B(S),b=A,P=0},move(S){if(!b)return;let V=B(S);P+=Math.hypot(V[0]-b[0],V[1]-b[1]),U==="lead"&&P>5&&N(b,V),b=V},up(S){if(b){if(U==="glaze"||P<=5){let[V,W]=B(S),Z=Math.floor(W)*f+Math.floor(V);V>=0&&W>=0&&V<f&&W<h&&w[Z]&&(D(Math.floor(V),Math.floor(W),E(I)),qt("tink"))}b=null}}}),n.loop((S,V)=>{_&&(R(),_=!1);let W=c+l*(L*1.8-.4),Z=u-40,Y=a.createLinearGradient(0,0,0,i);Y.addColorStop(0,"#26232b"),Y.addColorStop(.72,"#1a181e"),Y.addColorStop(.73,"#121014"),Y.addColorStop(1,"#0b0a0d"),a.fillStyle=Y,a.fillRect(0,0,e,i);let j=u+o+16,ct=(.5-L)*1.7;a.save(),a.globalCompositeOperation="lighter",a.globalAlpha=.62,a.filter="blur(9px)",a.transform(1,0,ct,1,0,0),a.translate(c-ct*j,j),a.drawImage(m,0,0,l,(i-j)*1.25),a.restore(),a.save(),a.translate(c,u),a.shadowColor="rgba(0,0,0,.8)",a.shadowBlur=40,C(a,l,o),a.fillStyle="#0a090c",a.fill(),a.shadowBlur=0,a.clip(),a.drawImage(m,0,0,l,o);let ut=a.createRadialGradient(W-c,Z-u+o*.26,10,W-c,Z-u+o*.26,o*.92);ut.addColorStop(0,"rgba(255,245,210,.42)"),ut.addColorStop(.3,"rgba(255,240,200,.1)"),ut.addColorStop(1,"rgba(0,0,10,.5)"),a.fillStyle=ut,a.fillRect(0,0,l,o),a.drawImage(d,0,0,l,o),a.restore(),a.save(),a.translate(c,u),C(a,l,o),a.strokeStyle="#3c3845",a.lineWidth=7,a.stroke(),a.restore(),a.save(),a.globalCompositeOperation="lighter";for(let ht=0;ht<28;ht++){let Rt=c+l*((ht*.137+V*.008)%1),Ut=u+o+8+ht*53%Math.max(10,i-u-o-10);a.fillStyle=`rgba(255,240,210,${.08+.1*Math.sin(V+ht)})`,a.beginPath(),a.arc(Rt+ct*(Ut-j),Ut,1.1,0,st),a.fill()}a.restore()});let v=[],G=()=>{let S=Ct(f,h);S.getContext("2d").drawImage(d,0,0),v.push({lead:S,paint:y.slice()}),v.length>14&&v.shift()};n.undo=()=>{let S=v.pop();S&&(p.clearRect(0,0,f,h),p.drawImage(S.lead,0,0),y.set(S.paint),_=!0)},n.clear=()=>{G(),p.clearRect(0,0,f,h),y.fill(0),_=!0},n.snapshot=()=>r;function q(){p.strokeStyle="#141216",p.lineWidth=g*s;let S=f/2,V=h*.36,W=f*.3;for(let Y of[.34,1])p.beginPath(),p.arc(S,V,W*Y,0,st),p.stroke();for(let Y=0;Y<8;Y++){let j=Y/8*st;p.beginPath(),p.moveTo(S+Math.cos(j)*W*.34,V+Math.sin(j)*W*.34),p.lineTo(S+Math.cos(j)*W,V+Math.sin(j)*W),p.stroke()}[.25,.5,.75].forEach(Y=>{p.beginPath(),p.moveTo(f*Y,V+W+3),p.lineTo(f*Y,h),p.stroke()}),[.72,.86].forEach(Y=>{p.beginPath(),p.moveTo(0,h*Y),p.lineTo(f,h*Y),p.stroke()}),p.beginPath(),p.moveTo(0,V+W+3),p.lineTo(f,V+W+3),p.stroke(),[[S,V,2],[S+W*.65,V+W*.2,0],[S-W*.65,V-W*.2,0],[S+W*.2,V-W*.65,1],[S-W*.2,V+W*.65,1],[S+W*.2,V+W*.65,5],[S-W*.2,V-W*.65,5],[S+W*.65,V-W*.2,3],[S-W*.65,V+W*.2,3],[f*.12,h*.6,1],[f*.38,h*.6,7],[f*.62,h*.6,0],[f*.88,h*.6,6],[f*.12,h*.93,4],[f*.88,h*.93,4],[f*.5+8,h*.8,2]].forEach(([Y,j,ct])=>D(Math.floor(Y),Math.floor(j),E(Al[ct])))}n.ui.swatches(Al,I,S=>{I=S}),n.ui.sep(),n.ui.seg([["lead","Lead"],["glaze","Glaze"]],U,S=>{U=S}),n.ui.slider("Lead",2,12,g,S=>{g=S}),n.ui.slider("Sun",0,100,L*100,S=>{L=At(S/100)}),q(),n.hint("Draw lead lines, tap a pane to glaze it, then drag the sun. Colour lands on the floor.")}var Xh={Sparkler:{core:"#fff6df",halo:"rgba(255,150,50,.2)",sparks:"rgba(255,190,90,"},Neon:{core:"#ffe3f2",halo:"rgba(255,40,140,.24)",sparks:null},Ice:{core:"#ecfaff",halo:"rgba(70,190,255,.22)",sparks:"rgba(140,220,255,"},Fairy:{core:"#fff2c9",halo:"rgba(255,210,120,.1)",dots:!0,sparks:null},Ember:{core:"#ffd8b0",halo:"rgba(255,60,20,.26)",sparks:"rgba(255,110,50,"},Gold:{core:"#fff8d0",halo:"rgba(255,200,60,.22)",sparks:"rgba(255,220,110,"},Emerald:{core:"#e4fff0",halo:"rgba(30,230,130,.22)",sparks:"rgba(120,255,180,"},Violet:{core:"#f0e4ff",halo:"rgba(150,70,255,.24)",sparks:"rgba(190,140,255,"},Rose:{core:"#ffe8f0",halo:"rgba(255,90,150,.22)",sparks:"rgba(255,150,190,"},Laser:{core:"#ffe4e4",halo:"rgba(255,20,40,.26)",sparks:null}};function Rl(n){let t=n.surface({bleed:!0,bg:"#040307",maxPx:1800}),{W:e,H:i,px:s}=t,r=t.buffer(),a=t.layer({alpha:!1}),o="Sparkler",l=3,c=0,u=!0,f=!0,h=!0,d=n.rasterUndo(r.canvas,8),p=[],T=Ct(e*s,i*s);{let g=T.getContext("2d"),_=Ie(8);g.scale(s,s),g.fillStyle="#000",g.beginPath(),g.moveTo(0,i);let U=0;for(;U<e+30;){let C=i*(.14+_()*.09);g.lineTo(U,i-C*.6),g.lineTo(U+9+_()*12,i-C),g.lineTo(U+20+_()*12,i-C*.58),U+=18+_()*18}g.lineTo(e,i),g.closePath(),g.fill()}let x=Ie(3),m=Array.from({length:240},()=>({a:x()*st,d:Math.pow(x(),.6)*Math.hypot(e,i)*.8,b:.1+x()*.5,c:x()<.2?"180,200,255":x()<.4?"255,220,190":"255,255,255"})),M={x:e*.62,y:i*.22};function y(g,_){let U=r.g,C=Xh[o];if(U.save(),U.globalCompositeOperation="lighter",U.lineCap="round",C.dots){let F=Math.hypot(_.x-g.x,_.y-g.y);if(I+=F,I>26){I=0;let E=["#ffd27a","#ff7a59","#7ad7f0","#9df08a"][Math.floor(Math.random()*4)],O=U.createRadialGradient(_.x,_.y,0,_.x,_.y,13+l);O.addColorStop(0,"#fff"),O.addColorStop(.2,E),O.addColorStop(1,"rgba(0,0,0,0)"),U.fillStyle=O,U.beginPath(),U.arc(_.x,_.y,13+l,0,st),U.fill()}}else U.strokeStyle=C.halo,U.lineWidth=l*7,U.beginPath(),U.moveTo(g.x,g.y),U.lineTo(_.x,_.y),U.stroke(),U.lineWidth=l*3,U.stroke(),U.strokeStyle=C.core,U.lineWidth=l*.7,U.stroke();if(U.restore(),f&&C.sparks){let F=3+Math.floor(Math.random()*3);for(let E=0;E<F;E++){let O=Math.random()*st,D=120+Math.random()*420;p.push({x:_.x,y:_.y,vx:Math.cos(O)*D,vy:Math.sin(O)*D,life:.1+Math.random()*.34,c:C.sparks})}p.length>500&&p.splice(0,120)}}let w=null,I=0;t.pointer({down(g){d(),w=g,y(g,{x:g.x+.2,y:g.y})},move(g){y(w,g),w=g},up(){w=null}}),n.loop(g=>{h&&(c+=g);let _=r.g;_.save(),_.globalCompositeOperation="lighter",_.lineCap="round";for(let E=p.length-1;E>=0;E--){let O=p[E],D=O.x,R=O.y;O.vy+=520*g,O.vx*=.985,O.x+=O.vx*g,O.y+=O.vy*g,O.life-=g,_.strokeStyle=`${O.c}${At(O.life*3,.05,.7)})`,_.lineWidth=.9,_.beginPath(),_.moveTo(D,R),_.lineTo(O.x,O.y),_.stroke(),O.life<=0&&p.splice(E,1)}if(u&&h)for(let E of m){let O=E.a;E.a+=g*.012,_.strokeStyle=`rgba(${E.c},${E.b*.34})`,_.lineWidth=.8,_.beginPath(),_.moveTo(M.x+Math.cos(O)*E.d,M.y+Math.sin(O)*E.d),_.lineTo(M.x+Math.cos(E.a)*E.d,M.y+Math.sin(E.a)*E.d),_.stroke()}_.restore();let U=a.g,C=At(c/90),F=U.createLinearGradient(0,0,0,i);F.addColorStop(0,`rgb(${4+C*8},${3+C*12},${7+C*32})`),F.addColorStop(1,`rgb(${5+C*40},${4+C*20},${8+C*34})`),U.fillStyle=F,U.fillRect(0,0,e,i),U.drawImage(r.canvas,0,0,e,i),U.save(),U.globalAlpha=.25+C*.7,U.drawImage(T,0,0,e,i),U.restore(),L.textContent=`${h?"Open":"Shut"} \xB7 ${Math.floor(c)} s`}),n.clear=()=>{d(),r.g.save(),r.g.setTransform(1,0,0,1,0,0),r.g.clearRect(0,0,r.canvas.width,r.canvas.height),r.g.restore(),c=0},n.snapshot=()=>a.canvas,n.ui.select(Object.keys(Xh),o,g=>{o=g}),n.ui.sep(),n.ui.slider("Width",1,9,l,g=>{l=g}),n.ui.toggle("Sparks",f,g=>{f=g}),n.ui.toggle("Star trails",u,g=>{u=g}),n.ui.toggle("Shutter",h,g=>{h=g});let L=n.ui.readout("Open \xB7 0 s");n.hint("Write on the dark. Leave the shutter open and the stars will start to trail behind you.")}var Yh={Coral:[.0545,.062],Fingerprint:[.037,.06],Mitosis:[.0367,.0649],Worms:[.078,.061],Maze:[.029,.057],Bubbles:[.098,.0555]},$h={Lagoon:[[.02,.09,.12],[.11,.64,.6],[.72,.98,.88]],Ember:[[.07,.02,.03],[.82,.22,.1],[1,.84,.5]],Orchid:[[.07,.03,.12],[.62,.22,.72],[1,.82,.92]],Lichen:[[.08,.1,.05],[.52,.6,.18],[.95,.93,.68]],Ocean:[[.01,.04,.14],[.08,.3,.82],[.72,.92,1]],Neon:[[.03,.01,.08],[.95,.1,.72],[.75,1,.3]],Sunset:[[.1,.03,.16],[.94,.3,.32],[1,.86,.42]],Bone:[[.1,.09,.08],[.6,.54,.46],[.97,.94,.86]],Rose:[[.12,.02,.07],[.88,.32,.5],[1,.86,.88]],Ice:[[.02,.07,.12],[.36,.72,.86],[.92,1,1]]},Bf=`
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
}`,zf=`
in vec2 uv; out vec4 o;
uniform sampler2D s; uniform vec2 a,b; uniform float rad;
void main(){
  vec4 c = texture(s,uv);
  vec2 pa = uv-a, ba = b-a;
  float h = clamp(dot(pa,ba)/max(dot(ba,ba),1e-6),0.,1.);
  float m = step(length(pa-ba*h),rad);
  o = vec4(mix(c.r,.5,m),mix(c.g,.25,m),0.,1.);
}`,Gf=`
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
}`;function Il(n){let t=n.surface({aspect:1,maxPx:1500}),{W:e,H:i}=t,s=t.layer({gl:!0}),r=Fn(s.canvas),a=512,o=kr(r,a,a);if(!o){n.toast("This graphics card cannot run the simulation");return}let l=He(r,Bf),c=He(r,zf),u=He(r,Gf),f="Coral",h="Lagoon",d=10,p=.014,T=null;function x(I,L){r.bindFramebuffer(r.FRAMEBUFFER,o.b.fbo),r.viewport(0,0,a,a),I.use().i("s",0),gn(r,o.a.tex,0),L(I),mn(r),o.swap()}function m(){r.bindFramebuffer(r.FRAMEBUFFER,o.a.fbo),r.clearColor(1,0,0,1),r.clear(r.COLOR_BUFFER_BIT)}let M=(I,L)=>x(c,g=>g.f("a",I[0],I[1]).f("b",L[0],L[1]).f("rad",p)),y=I=>[I.x/e,1-I.y/i];t.pointer({down(I){T=y(I),M(T,T)},move(I){let L=y(I);M(T,L),T=L},up(){T=null}}),n.loop(()=>{let[I,L]=Yh[f];for(let C=0;C<d;C++)x(l,F=>F.f("px",1/a,1/a).f("F",I).f("K",L));r.bindFramebuffer(r.FRAMEBUFFER,null),r.viewport(0,0,s.canvas.width,s.canvas.height);let[g,_,U]=$h[h];u.use().i("s",0).f("px",1/a,1/a).f("c0",...g).f("c1",..._).f("c2",...U),gn(r,o.a.tex,0),mn(r)});function w(){for(let I=0;I<7;I++){let L=I/7*st,g=.05+I%3*.1,_=[.5+Math.cos(L)*g,.5+Math.sin(L)*g];M(_,_)}}n.clear=()=>{m()},n.snapshot=()=>s.canvas,m(),w(),n.ui.seg(Object.keys(Yh),f,I=>{f=I}),n.ui.sep(),n.ui.select(Object.keys($h),h,I=>{h=I}),n.ui.sep(),n.ui.slider("Clock",1,24,d,I=>{d=I}),n.ui.slider("Seed",5,40,p*1e3,I=>{p=I/1e3}),n.hint("Touch the dish to seed it. Change species mid-growth and see what the colony does.")}var Yn={name:"Smudge Club",prefix:"SC"},$n={name:"Marcoverse",url:"https://marcoverse.co.uk"},ye=(n,t,e,i,s,r,a,o)=>({id:n,title:t,genre:e,glow:i,accent:s,blurb:r,tracks:a,mount:o}),Qe=[ye("drip-feed","Drip Feed","Wet enamel, thrown","#e8452d","#e8452d","Fling gloss enamel at a floor-bound canvas. Speed makes spatter, stillness makes pools, and the light follows your hand across the wet paint.",["Fling (drag fast)","Pool (hold still)","Run (tilt the canvas)","Change the tin","Wait for it to dry"],Qo),ye("golden-repair","Golden Repair","Ceramics, broken on purpose","#c9962e","#d9a93a","Strike a glazed bowl until it gives, gather the pieces, and watch every seam fill with molten metal. It ends up better than it started.",["Strike (tap the bowl)","Gather (drag pieces home)","Pour the seam","Choose your metal","Throw a new bowl"],jo),ye("sediment","Sediment","Falling grains, glass bottle","#d98a3d","#e29a4c","Pour coloured sand into a bottle, then do what the seaside craftsmen do: push a stick down the glass to pull the layers into mountains.",["Pour (hold to fall)","Poke (stick down the side)","Tilt the bottle","Swap the sand","Cork it"],el),ye("endpaper","Endpaper","Ink on water, lifted","#2f6f8f","#3b8bb3","Float ink on a still bath, drag a comb through it, then lay down the paper and lift off a print, like the inside cover of an old hardback.",["Drop (tap the water)","Rake (drag the comb)","Stir (swirl)","Lay the paper","Skim and start again"],nl),ye("steamed-up","Steamed Up","Finger on cold glass","#3a5f8a","#6c9bd2","A window on a wet night. Draw with your finger and the city comes back into focus. Drops gather, run, and the fog creeps back in.",["Wipe (draw on the glass)","Run (drops find their way)","Breathe (fog it again)","Change the view","Leave it to mist"],sl),ye("hall-of-mirrors","Hall of Mirrors","Light, multiplied","#7a3df0","#a06bff","Every stroke is caught by a ring of mirrors and thrown back in glowing colour. Set the whole thing turning and paint on the wheel.",["Draw (one becomes many)","Add mirrors","Reflect or rotate","Set it turning","Change the light"],rl),ye("wallpaper-group","Wallpaper Group","Seventeen ways to repeat","#2f9e77","#38b58a","Draw in one cell and the whole plane answers. Slide, turn and glide through the symmetry groups that wallpaper has been quietly using for centuries.",["Draw (in any tile)","Pick a symmetry","Show the seams","Scale the tile","Choose the paper"],ll),ye("wordsmear","Wordsmear","Poems along a wet line","#c23b5a","#e0557a","The brush is loaded with language. Write your own line and paint with it, as letters swell when you slow down and thin when you hurry.",["Type your verse","Paint (letters follow)","Slow down to shout","Pick a typeface","Turn the page"],hl),ye("right-angles","Right Angles","Neoplastic boogie","#d8312c","#e23a33","Split the plane, fill the rooms with primaries, then press play: small coloured cars set off down your black lines and the painting starts to swing.",["Split (drag across a room)","Fill (tap a room)","Nudge the lines","Boogie (press play)","Whitewash"],ul),ye("dont-lift","Don't Lift","One continuous line","#b8a98c","#c9b48a","You get one line. It starts when you touch down and ends for good when you let go. Then the pen plays your hesitation back to you.",["Touch down","Keep going","Don't lift","Watch the replay","Take a new sheet"],pl),ye("twin-dials","Twin Dials","Two knobs, one stubborn line","#27b36a","#35d07e","One dial runs left and right, the other up and down. Diagonals take patience. Curves take practice. Shake the whole unit to start again.",["Left dial (across)","Right dial (up and down)","Arrow keys work too","Switch the screen","Shake it clean"],ml),ye("raked","Raked","Dry garden, low sun","#a89878","#c2b08c","Comb pale gravel into furrows, set down your stones and let the ripples wrap around them. Drag the sun across the sky to rake the light as well.",["Rake (drag through)","Set a stone","Ripple (tap a stone)","Change the tines","Move the sun"],gl),ye("squint","Squint","Optical mixing, dot by dot","#e0a526","#efb93a","The brush lays down evenly spaced dots of pure colour. Up close they are confetti. Press Squint and your eyes do the mixing.",["Dab (dots keep their distance)","Layer two colours","Change the dot","Squint","Count your dots"],xl),ye("scratch-track","Scratch Track","Black wax over foil","#6b3df0","#8b5cf6","Scrape through the black and find the shimmering foil underneath. Curls of wax fall away, and the colours shift as your hand moves.",["Scrape (black comes off)","Change the nib","Pick the foil","Blow the flakes","Wax it over"],yl),ye("highly-strung","Highly Strung","Pins, thread, pitch","#c8486e","#e65f87","Hammer in pins and wind thread between them, then pluck it. Every string rings at a pitch set by its length, so your picture is also an instrument.",["Pin (tap to place)","Wind (drag pin to pin)","Pluck (flick a thread)","Times tables","Change the thread"],_l),ye("low-res","Low Res","Sixteen colours, four frames","#2d8fd5","#3fa7f0","A tiny grid and a limited palette. Then the twist: flip through four frames with onion skins and your drawing starts to walk.",["Pixel (click the grid)","Fill and dither","Mirror mode","Onion skin","Play the flipbook"],vl),ye("word-wheel","Word Wheel","Language, in the round","#b44ac0","#cf62dc","Paint with words, and the words are mirrored around the centre. Small letters build into rose windows you can almost read.",["Type the mantra","Paint from the middle","Add spokes","Mirror the letters","Change the ink"],Sl),ye("spin-cycle","Spin Cycle","Paint on a turntable","#e0308a","#f04a9c","Fairground spin art. Squeeze paint onto a spinning card and it races outward in comet tails. Hit the brake to see what you made.",["Squeeze (hold on the card)","Throttle (speed it up)","Reverse","Brake","New card"],bl),ye("wet-on-wet","Wet on Wet","Ink meets damp paper","#55606a","#8a97a3","Load a brush with sumi ink and touch it to damp paper. The ink crawls off along the fibres on its own, and you are only partly in charge.",["Touch (ink blooms)","Wet the paper","Load the brush","Dry it off","Fresh sheet"],Tl),ye("fold-here","Fold Here","The inkblot test","#3c3c46","#9a9aa8","Dab ink on one half of the sheet, fold it shut, and press. Open it up and a stranger creature looks back. The analyst has notes.",["Dab (on the left)","Fold and press","Open it up","Read the verdict","Blot again"],El),ye("leadlight","Leadlight","Stained glass, backlit","#2a7fbf","#3a9ae0","Draw the lead, pour coloured glass into the gaps, then drag the sun across the window and watch it throw colour.",["Lead (draw the lines)","Glaze (tap a pane)","Pick the glass","Move the sun","Reglaze"],Cl),ye("long-exposure","Long Exposure","Sparkler on a slow shutter","#e8892b","#f59e3f","Hold the shutter open and write on the dark with a sparkler. Light stacks up, trails hang in the air, and nothing goes away until you close it.",["Write (light stacks)","Change the sparkler","Hold the shutter","Add sparks","Close the shutter"],Rl),ye("slow-growth","Slow Growth","Two chemicals, one reef","#1fa8a0","#2cc4ba","Seed a dish with a touch and two reacting chemicals grow coral, fingerprints and mitosis from nothing. You are gardening a mathematical equation.",["Seed (touch the dish)","Pick a species","Change the dye","Speed the clock","Sterilise"],Il)],Vf={"drip-feed":["bristle","studio"],"golden-repair":["none","studio"],sediment:["sand","wind"],endpaper:["water","water"],"steamed-up":["glass","rain"],"hall-of-mirrors":["shimmer","night"],"wallpaper-group":["pencil","studio"],wordsmear:["pencil","studio"],"right-angles":["none","studio"],"dont-lift":["pencil","studio"],"twin-dials":["none","hum"],raked:["sand","wind"],squint:["chalk","studio"],"scratch-track":["scratch","studio"],"highly-strung":["none","night"],"low-res":["none","hum"],"word-wheel":["pencil","night"],"spin-cycle":["bristle","studio"],"wet-on-wet":["water","water"],"fold-here":["bristle","studio"],leadlight:["glass","studio"],"long-exposure":["sizzle","night"],"slow-growth":["water","water"]};Qe.forEach((n,t)=>{n.index=t,n.cat=`${Yn.prefix} ${String(t+1).padStart(3,"0")}`,[n.timbre,n.bed]=Vf[n.id]});var vu=0,oc=1,Mu=2;var yr=1,Su=2,Is=3,Ei=0,Ze=1,vn=2,qi=0,Ps=1,lc=2,cc=3,hc=4,bu=5;var Xi=100,wu=101,Tu=102,Eu=103,Au=104,Cu=200,Ru=201,Iu=202,Pu=203,uc=204,dc=205,Lu=206,Nu=207,Du=208,Uu=209,Ou=210,Fu=211,ku=212,Bu=213,zu=214,ua=0,da=1,fa=2,_s=3,pa=4,ma=5,ga=6,xa=7,fc=0,Gu=1,Vu=2,Mn=0,pc=1,mc=2,gc=3,xc=4,yc=5,_c=6,vc=7;var Mc=300,Yi=301,Ls=302,Va=303,Ha=304,vs=1e3,Bn=1001,ya=1002,Le=1003,Hu=1004;var _r=1005;var Xe=1006,Wa=1007;var si=1008;var tn=1009,Sc=1010,bc=1011,Ns=1012,qa=1013,In=1014,Pn=1015,Ln=1016,Xa=1017,Ya=1018,$i=1020,wc=35902,Tc=35899,Ec=1021,Ac=1022,Nn=1023,ei=1026,ri=1027,Cc=1028,$a=1029,Ai=1030,Za=1031;var Ka=1033,vr=33776,Mr=33777,Sr=33778,br=33779,Ja=35840,Qa=35841,ja=35842,to=35843,eo=36196,no=37492,io=37496,so=37488,ro=37489,wr=37490,ao=37491,oo=37808,lo=37809,co=37810,ho=37811,uo=37812,fo=37813,po=37814,mo=37815,go=37816,xo=37817,yo=37818,_o=37819,vo=37820,Mo=37821,So=36492,bo=36494,wo=36495,To=36283,Eo=36284,Tr=36285,Ao=36286;var tr=2300,_a=2301,ca=2302,jl=2303,tc=2400,ec=2401,nc=2402;var Wu=3200;var Co=0,qu=1,ai="",We="srgb",er="srgb-linear",nr="linear",re="srgb";var ha=7680;var Xu=519,Yu=512,$u=513,Zu=514,Rc=515,Ku=516,Ju=517,Ic=518,Pc=519,Qu=35044;var Lc="300 es",yn=2e3,Ms=2001;function Hf(n){for(let t=n.length-1;t>=0;--t)if(n[t]>=65535)return!0;return!1}function Wf(n){return ArrayBuffer.isView(n)&&!(n instanceof DataView)}function ir(n){return document.createElementNS("http://www.w3.org/1999/xhtml",n)}function ju(){let n=ir("canvas");return n.style.display="block",n}var Zh={},Ss=null;function Nc(...n){let t="THREE."+n.shift();Ss?Ss("log",t,...n):console.log(t,...n)}function td(n){let t=n[0];if(typeof t=="string"&&t.startsWith("TSL:")){let e=n[1];e&&e.isStackTrace?n[0]+=" "+e.getLocation():n[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return n}function Gt(...n){n=td(n);let t="THREE."+n.shift();if(Ss)Ss("warn",t,...n);else{let e=n[0];e&&e.isStackTrace?console.warn(e.getError(t)):console.warn(t,...n)}}function Vt(...n){n=td(n);let t="THREE."+n.shift();if(Ss)Ss("error",t,...n);else{let e=n[0];e&&e.isStackTrace?console.error(e.getError(t)):console.error(t,...n)}}function js(...n){let t=n.join(" ");t in Zh||(Zh[t]=!0,Gt(...n))}function ed(n,t,e){return new Promise(function(i,s){function r(){switch(n.clientWaitSync(t,n.SYNC_FLUSH_COMMANDS_BIT,0)){case n.WAIT_FAILED:s();break;case n.TIMEOUT_EXPIRED:setTimeout(r,e);break;default:i()}}setTimeout(r,e)})}var nd={[ua]:ua,[fa]:ga,[pa]:pa,[_s]:ma,[da]:da,[ga]:fa,[xa]:xa,[ma]:_s},Gn=class{addEventListener(t,e){this._listeners===void 0&&(this._listeners={});let i=this._listeners;i[t]===void 0&&(i[t]=[]),i[t].indexOf(e)===-1&&i[t].push(e)}hasEventListener(t,e){let i=this._listeners;return i===void 0?!1:i[t]!==void 0&&i[t].indexOf(e)!==-1}removeEventListener(t,e){let i=this._listeners;if(i===void 0)return;let s=i[t];if(s!==void 0){let r=s.indexOf(e);r!==-1&&s.splice(r,1)}}dispatchEvent(t){let e=this._listeners;if(e===void 0)return;let i=e[t.type];if(i!==void 0){t.target=this;let s=i.slice(0);for(let r=0,a=s.length;r<a;r++)s[r].call(this,t);t.target=null}}},ke=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];var Pl=Math.PI/180,va=180/Math.PI;function Er(){let n=Math.random()*4294967295|0,t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,i=Math.random()*4294967295|0;return(ke[n&255]+ke[n>>8&255]+ke[n>>16&255]+ke[n>>24&255]+"-"+ke[t&255]+ke[t>>8&255]+"-"+ke[t>>16&15|64]+ke[t>>24&255]+"-"+ke[e&63|128]+ke[e>>8&255]+"-"+ke[e>>16&255]+ke[e>>24&255]+ke[i&255]+ke[i>>8&255]+ke[i>>16&255]+ke[i>>24&255]).toLowerCase()}function ne(n,t,e){return Math.max(t,Math.min(e,n))}function qf(n,t){return(n%t+t)%t}function Ll(n,t,e){return(1-e)*n+e*t}function id(n){return Math.pow(2,Math.floor(Math.log(n)/Math.LN2))}function Dc(n){switch(n.constructor){case Uint32Array:return 4294967295;case Uint16Array:return 65535;case Uint8Array:case Uint8ClampedArray:return 255;case Int32Array:return 2147483647;case Int16Array:return 32767;case Int8Array:return 127;default:return}}function Xf(n,t){if(t.constructor===Float32Array)return n;let e=Dc(t);if(e===void 0)throw new Error("THREE.MathUtils: Invalid component type.");return Math.max(n/e,-1)}function Yf(n,t){if(t.constructor===Float32Array)return n;let e=Dc(t);if(e===void 0)throw new Error("THREE.MathUtils: Invalid component type.");return Math.round(n*e)}var Bc=class Bc{constructor(t=0,e=0){this.x=t,this.y=e}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,e){return this.x=t,this.y=e,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;default:throw new Error("THREE.Vector2: index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("THREE.Vector2: index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){let e=this.x,i=this.y,s=t.elements;return this.x=s[0]*e+s[3]*i+s[6],this.y=s[1]*e+s[4]*i+s[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,e){return this.x=ne(this.x,t.x,e.x),this.y=ne(this.y,t.y,e.y),this}clampScalar(t,e){return this.x=ne(this.x,t,e),this.y=ne(this.y,t,e),this}clampLength(t,e){let i=this.length();return this.divideScalar(i||1).multiplyScalar(ne(i,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){let e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;let i=this.dot(t)/e;return Math.acos(ne(i,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){let e=this.x-t.x,i=this.y-t.y;return e*e+i*i}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this}lerpVectors(t,e,i){return this.x=t.x+(e.x-t.x)*i,this.y=t.y+(e.y-t.y)*i,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this}rotateAround(t,e){let i=Math.cos(e),s=Math.sin(e),r=this.x-t.x,a=this.y-t.y;return this.x=r*i-a*s+t.x,this.y=r*s+a*i+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}};Bc.prototype.isVector2=!0;var Qt=Bc,Vn=class{constructor(t=0,e=0,i=0,s=1){this.isQuaternion=!0,this._x=t,this._y=e,this._z=i,this._w=s}static slerpFlat(t,e,i,s,r,a,o){let l=i[s+0],c=i[s+1],u=i[s+2],f=i[s+3],h=r[a+0],d=r[a+1],p=r[a+2],T=r[a+3];if(f!==T||l!==h||c!==d||u!==p){let x=l*h+c*d+u*p+f*T;x<0&&(h=-h,d=-d,p=-p,T=-T,x=-x);let m=1-o;if(x<.9995){let M=Math.acos(x),y=Math.sin(M);m=Math.sin(m*M)/y,o=Math.sin(o*M)/y,l=l*m+h*o,c=c*m+d*o,u=u*m+p*o,f=f*m+T*o}else{l=l*m+h*o,c=c*m+d*o,u=u*m+p*o,f=f*m+T*o;let M=1/Math.sqrt(l*l+c*c+u*u+f*f);l*=M,c*=M,u*=M,f*=M}}t[e]=l,t[e+1]=c,t[e+2]=u,t[e+3]=f}static multiplyQuaternionsFlat(t,e,i,s,r,a){let o=i[s],l=i[s+1],c=i[s+2],u=i[s+3],f=r[a],h=r[a+1],d=r[a+2],p=r[a+3];return t[e]=o*p+u*f+l*d-c*h,t[e+1]=l*p+u*h+c*f-o*d,t[e+2]=c*p+u*d+o*h-l*f,t[e+3]=u*p-o*f-l*h-c*d,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,e,i,s){return this._x=t,this._y=e,this._z=i,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,e=!0){let i=t._x,s=t._y,r=t._z,a=t._order,o=Math.cos,l=Math.sin,c=o(i/2),u=o(s/2),f=o(r/2),h=l(i/2),d=l(s/2),p=l(r/2);switch(a){case"XYZ":this._x=h*u*f+c*d*p,this._y=c*d*f-h*u*p,this._z=c*u*p+h*d*f,this._w=c*u*f-h*d*p;break;case"YXZ":this._x=h*u*f+c*d*p,this._y=c*d*f-h*u*p,this._z=c*u*p-h*d*f,this._w=c*u*f+h*d*p;break;case"ZXY":this._x=h*u*f-c*d*p,this._y=c*d*f+h*u*p,this._z=c*u*p+h*d*f,this._w=c*u*f-h*d*p;break;case"ZYX":this._x=h*u*f-c*d*p,this._y=c*d*f+h*u*p,this._z=c*u*p-h*d*f,this._w=c*u*f+h*d*p;break;case"YZX":this._x=h*u*f+c*d*p,this._y=c*d*f+h*u*p,this._z=c*u*p-h*d*f,this._w=c*u*f-h*d*p;break;case"XZY":this._x=h*u*f-c*d*p,this._y=c*d*f-h*u*p,this._z=c*u*p+h*d*f,this._w=c*u*f+h*d*p;break;default:Gt("Quaternion: .setFromEuler() encountered an unknown order: "+a)}return e===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,e){let i=e/2,s=Math.sin(i);return this._x=t.x*s,this._y=t.y*s,this._z=t.z*s,this._w=Math.cos(i),this._onChangeCallback(),this}setFromRotationMatrix(t){let e=t.elements,i=e[0],s=e[4],r=e[8],a=e[1],o=e[5],l=e[9],c=e[2],u=e[6],f=e[10],h=i+o+f;if(h>0){let d=.5/Math.sqrt(h+1);this._w=.25/d,this._x=(u-l)*d,this._y=(r-c)*d,this._z=(a-s)*d}else if(i>o&&i>f){let d=2*Math.sqrt(1+i-o-f);this._w=(u-l)/d,this._x=.25*d,this._y=(s+a)/d,this._z=(r+c)/d}else if(o>f){let d=2*Math.sqrt(1+o-i-f);this._w=(r-c)/d,this._x=(s+a)/d,this._y=.25*d,this._z=(l+u)/d}else{let d=2*Math.sqrt(1+f-i-o);this._w=(a-s)/d,this._x=(r+c)/d,this._y=(l+u)/d,this._z=.25*d}return this._onChangeCallback(),this}setFromUnitVectors(t,e){let i=t.dot(e)+1;return i<1e-8?(i=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=i):(this._x=0,this._y=-t.z,this._z=t.y,this._w=i)):(this._x=t.y*e.z-t.z*e.y,this._y=t.z*e.x-t.x*e.z,this._z=t.x*e.y-t.y*e.x,this._w=i),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(ne(this.dot(t),-1,1)))}rotateTowards(t,e){let i=this.angleTo(t);if(i===0)return this;let s=Math.min(1,e/i);return this.slerp(t,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,e){let i=t._x,s=t._y,r=t._z,a=t._w,o=e._x,l=e._y,c=e._z,u=e._w;return this._x=i*u+a*o+s*c-r*l,this._y=s*u+a*l+r*o-i*c,this._z=r*u+a*c+i*l-s*o,this._w=a*u-i*o-s*l-r*c,this._onChangeCallback(),this}slerp(t,e){let i=t._x,s=t._y,r=t._z,a=t._w,o=this.dot(t);o<0&&(i=-i,s=-s,r=-r,a=-a,o=-o);let l=1-e;if(o<.9995){let c=Math.acos(o),u=Math.sin(c);l=Math.sin(l*c)/u,e=Math.sin(e*c)/u,this._x=this._x*l+i*e,this._y=this._y*l+s*e,this._z=this._z*l+r*e,this._w=this._w*l+a*e,this._onChangeCallback()}else this._x=this._x*l+i*e,this._y=this._y*l+s*e,this._z=this._z*l+r*e,this._w=this._w*l+a*e,this.normalize();return this}slerpQuaternions(t,e,i){return this.copy(t).slerp(e,i)}random(){let t=2*Math.PI*Math.random(),e=2*Math.PI*Math.random(),i=Math.random(),s=Math.sqrt(1-i),r=Math.sqrt(i);return this.set(s*Math.sin(t),s*Math.cos(t),r*Math.sin(e),r*Math.cos(e))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,e=0){return this._x=t[e],this._y=t[e+1],this._z=t[e+2],this._w=t[e+3],this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._w,t}fromBufferAttribute(t,e){return this._x=t.getX(e),this._y=t.getY(e),this._z=t.getZ(e),this._w=t.getW(e),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}},zc=class zc{constructor(t=0,e=0,i=0){this.x=t,this.y=e,this.z=i}set(t,e,i){return i===void 0&&(i=this.z),this.x=t,this.y=e,this.z=i,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;default:throw new Error("THREE.Vector3: index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("THREE.Vector3: index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,e){return this.x=t.x*e.x,this.y=t.y*e.y,this.z=t.z*e.z,this}applyEuler(t){return this.applyQuaternion(Kh.setFromEuler(t))}applyAxisAngle(t,e){return this.applyQuaternion(Kh.setFromAxisAngle(t,e))}applyMatrix3(t){let e=this.x,i=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[3]*i+r[6]*s,this.y=r[1]*e+r[4]*i+r[7]*s,this.z=r[2]*e+r[5]*i+r[8]*s,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){let e=this.x,i=this.y,s=this.z,r=t.elements,a=1/(r[3]*e+r[7]*i+r[11]*s+r[15]);return this.x=(r[0]*e+r[4]*i+r[8]*s+r[12])*a,this.y=(r[1]*e+r[5]*i+r[9]*s+r[13])*a,this.z=(r[2]*e+r[6]*i+r[10]*s+r[14])*a,this}applyQuaternion(t){let e=this.x,i=this.y,s=this.z,r=t.x,a=t.y,o=t.z,l=t.w,c=2*(a*s-o*i),u=2*(o*e-r*s),f=2*(r*i-a*e);return this.x=e+l*c+a*f-o*u,this.y=i+l*u+o*c-r*f,this.z=s+l*f+r*u-a*c,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){let e=this.x,i=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[4]*i+r[8]*s,this.y=r[1]*e+r[5]*i+r[9]*s,this.z=r[2]*e+r[6]*i+r[10]*s,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,e){return this.x=ne(this.x,t.x,e.x),this.y=ne(this.y,t.y,e.y),this.z=ne(this.z,t.z,e.z),this}clampScalar(t,e){return this.x=ne(this.x,t,e),this.y=ne(this.y,t,e),this.z=ne(this.z,t,e),this}clampLength(t,e){let i=this.length();return this.divideScalar(i||1).multiplyScalar(ne(i,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this}lerpVectors(t,e,i){return this.x=t.x+(e.x-t.x)*i,this.y=t.y+(e.y-t.y)*i,this.z=t.z+(e.z-t.z)*i,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,e){let i=t.x,s=t.y,r=t.z,a=e.x,o=e.y,l=e.z;return this.x=s*l-r*o,this.y=r*a-i*l,this.z=i*o-s*a,this}projectOnVector(t){let e=t.lengthSq();if(e===0)return this.set(0,0,0);let i=t.dot(this)/e;return this.copy(t).multiplyScalar(i)}projectOnPlane(t){return Nl.copy(this).projectOnVector(t),this.sub(Nl)}reflect(t){return this.sub(Nl.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){let e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;let i=this.dot(t)/e;return Math.acos(ne(i,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){let e=this.x-t.x,i=this.y-t.y,s=this.z-t.z;return e*e+i*i+s*s}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,e,i){let s=Math.sin(e)*t;return this.x=s*Math.sin(i),this.y=Math.cos(e)*t,this.z=s*Math.cos(i),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,e,i){return this.x=t*Math.sin(e),this.y=i,this.z=t*Math.cos(e),this}setFromMatrixPosition(t){let e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this}setFromMatrixScale(t){let e=this.setFromMatrixColumn(t,0).length(),i=this.setFromMatrixColumn(t,1).length(),s=this.setFromMatrixColumn(t,2).length();return this.x=e,this.y=i,this.z=s,this}setFromMatrixColumn(t,e){return this.fromArray(t.elements,e*4)}setFromMatrix3Column(t,e){return this.fromArray(t.elements,e*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let t=Math.random()*Math.PI*2,e=Math.random()*2-1,i=Math.sqrt(1-e*e);return this.x=i*Math.cos(t),this.y=e,this.z=i*Math.sin(t),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}};zc.prototype.isVector3=!0;var nt=zc,Nl=new nt,Kh=new Vn,Gc=class Gc{constructor(t,e,i,s,r,a,o,l,c){this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,e,i,s,r,a,o,l,c)}set(t,e,i,s,r,a,o,l,c){let u=this.elements;return u[0]=t,u[1]=s,u[2]=o,u[3]=e,u[4]=r,u[5]=l,u[6]=i,u[7]=a,u[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){let e=this.elements,i=t.elements;return e[0]=i[0],e[1]=i[1],e[2]=i[2],e[3]=i[3],e[4]=i[4],e[5]=i[5],e[6]=i[6],e[7]=i[7],e[8]=i[8],this}extractBasis(t,e,i){return t.setFromMatrix3Column(this,0),e.setFromMatrix3Column(this,1),i.setFromMatrix3Column(this,2),this}setFromMatrix4(t){let e=t.elements;return this.set(e[0],e[4],e[8],e[1],e[5],e[9],e[2],e[6],e[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){let i=t.elements,s=e.elements,r=this.elements,a=i[0],o=i[3],l=i[6],c=i[1],u=i[4],f=i[7],h=i[2],d=i[5],p=i[8],T=s[0],x=s[3],m=s[6],M=s[1],y=s[4],w=s[7],I=s[2],L=s[5],g=s[8];return r[0]=a*T+o*M+l*I,r[3]=a*x+o*y+l*L,r[6]=a*m+o*w+l*g,r[1]=c*T+u*M+f*I,r[4]=c*x+u*y+f*L,r[7]=c*m+u*w+f*g,r[2]=h*T+d*M+p*I,r[5]=h*x+d*y+p*L,r[8]=h*m+d*w+p*g,this}multiplyScalar(t){let e=this.elements;return e[0]*=t,e[3]*=t,e[6]*=t,e[1]*=t,e[4]*=t,e[7]*=t,e[2]*=t,e[5]*=t,e[8]*=t,this}determinant(){let t=this.elements,e=t[0],i=t[1],s=t[2],r=t[3],a=t[4],o=t[5],l=t[6],c=t[7],u=t[8];return e*a*u-e*o*c-i*r*u+i*o*l+s*r*c-s*a*l}invert(){let t=this.elements,e=t[0],i=t[1],s=t[2],r=t[3],a=t[4],o=t[5],l=t[6],c=t[7],u=t[8],f=u*a-o*c,h=o*l-u*r,d=c*r-a*l,p=e*f+i*h+s*d;if(p===0)return this.set(0,0,0,0,0,0,0,0,0);let T=1/p;return t[0]=f*T,t[1]=(s*c-u*i)*T,t[2]=(o*i-s*a)*T,t[3]=h*T,t[4]=(u*e-s*l)*T,t[5]=(s*r-o*e)*T,t[6]=d*T,t[7]=(i*l-c*e)*T,t[8]=(a*e-i*r)*T,this}transpose(){let t,e=this.elements;return t=e[1],e[1]=e[3],e[3]=t,t=e[2],e[2]=e[6],e[6]=t,t=e[5],e[5]=e[7],e[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){let e=this.elements;return t[0]=e[0],t[1]=e[3],t[2]=e[6],t[3]=e[1],t[4]=e[4],t[5]=e[7],t[6]=e[2],t[7]=e[5],t[8]=e[8],this}setUvTransform(t,e,i,s,r,a,o){let l=Math.cos(r),c=Math.sin(r);return this.set(i*l,i*c,-i*(l*a+c*o)+a+t,-s*c,s*l,-s*(-c*a+l*o)+o+e,0,0,1),this}scale(t,e){return js("Matrix3: .scale() is deprecated. Use .makeScale() instead."),this.premultiply(Dl.makeScale(t,e)),this}rotate(t){return js("Matrix3: .rotate() is deprecated. Use .makeRotation() instead."),this.premultiply(Dl.makeRotation(-t)),this}translate(t,e){return js("Matrix3: .translate() is deprecated. Use .makeTranslation() instead."),this.premultiply(Dl.makeTranslation(t,e)),this}makeTranslation(t,e){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,e,0,0,1),this}makeRotation(t){let e=Math.cos(t),i=Math.sin(t);return this.set(e,-i,0,i,e,0,0,0,1),this}makeScale(t,e){return this.set(t,0,0,0,e,0,0,0,1),this}equals(t){let e=this.elements,i=t.elements;for(let s=0;s<9;s++)if(e[s]!==i[s])return!1;return!0}fromArray(t,e=0){for(let i=0;i<9;i++)this.elements[i]=t[i+e];return this}toArray(t=[],e=0){let i=this.elements;return t[e]=i[0],t[e+1]=i[1],t[e+2]=i[2],t[e+3]=i[3],t[e+4]=i[4],t[e+5]=i[5],t[e+6]=i[6],t[e+7]=i[7],t[e+8]=i[8],t}clone(){return new this.constructor().fromArray(this.elements)}};Gc.prototype.isMatrix3=!0;var Ht=Gc,Dl=new Ht,Jh=new Ht().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Qh=new Ht().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function $f(){let n={enabled:!0,workingColorSpace:er,spaces:{},convert:function(s,r,a){return this.enabled===!1||r===a||!r||!a||(this.spaces[r].transfer===re&&(s.r=ti(s.r),s.g=ti(s.g),s.b=ti(s.b)),this.spaces[r].primaries!==this.spaces[a].primaries&&(s.applyMatrix3(this.spaces[r].toXYZ),s.applyMatrix3(this.spaces[a].fromXYZ)),this.spaces[a].transfer===re&&(s.r=ys(s.r),s.g=ys(s.g),s.b=ys(s.b))),s},workingToColorSpace:function(s,r){return this.convert(s,this.workingColorSpace,r)},colorSpaceToWorking:function(s,r){return this.convert(s,r,this.workingColorSpace)},getPrimaries:function(s){return this.spaces[s].primaries},getTransfer:function(s){return s===ai?nr:this.spaces[s].transfer},getToneMappingMode:function(s){return this.spaces[s].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(s,r=this.workingColorSpace){return s.fromArray(this.spaces[r].luminanceCoefficients)},define:function(s){Object.assign(this.spaces,s)},_getMatrix:function(s,r,a){return s.copy(this.spaces[a].fromXYZ).multiply(this.spaces[r].toXYZ)},_getDrawingBufferColorSpace:function(s){return this.spaces[s].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(s=this.workingColorSpace){return this.spaces[s].workingColorSpaceConfig.unpackColorSpace}},t=[.64,.33,.3,.6,.15,.06],e=[.2126,.7152,.0722],i=[.3127,.329];return n.define({[er]:{primaries:t,whitePoint:i,transfer:nr,toXYZ:Jh,fromXYZ:Qh,luminanceCoefficients:e,workingColorSpaceConfig:{unpackColorSpace:We},outputColorSpaceConfig:{drawingBufferColorSpace:We}},[We]:{primaries:t,whitePoint:i,transfer:re,toXYZ:Jh,fromXYZ:Qh,luminanceCoefficients:e,outputColorSpaceConfig:{drawingBufferColorSpace:We}}}),n}var ee=$f();function ti(n){return n<.04045?n*.0773993808:Math.pow(n*.9478672986+.0521327014,2.4)}function ys(n){return n<.0031308?n*12.92:1.055*Math.pow(n,.41666)-.055}var rs,Ma=class{static getDataURL(t,e="image/png"){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement>"u")return t.src;let i;if(t instanceof HTMLCanvasElement)i=t;else{rs===void 0&&(rs=ir("canvas")),rs.width=t.width,rs.height=t.height;let s=rs.getContext("2d");t instanceof ImageData?s.putImageData(t,0,0):s.drawImage(t,0,0,t.width,t.height),i=rs}return i.toDataURL(e)}static sRGBToLinear(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap){let e=ir("canvas");e.width=t.width,e.height=t.height;let i=e.getContext("2d");i.drawImage(t,0,0,t.width,t.height);let s=i.getImageData(0,0,t.width,t.height),r=s.data;for(let a=0;a<r.length;a++)r[a]=ti(r[a]/255)*255;return i.putImageData(s,0,0),e}else if(t.data){let e=t.data.slice(0);for(let i=0;i<e.length;i++)e instanceof Uint8Array||e instanceof Uint8ClampedArray?e[i]=Math.floor(ti(e[i]/255)*255):e[i]=ti(e[i]);return{data:e,width:t.width,height:t.height}}else return Gt("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}},Zf=0,bs=class{constructor(t=null){this.isTextureSource=!0,Object.defineProperty(this,"id",{value:Zf++}),this.uuid=Er(),this.data=t,this.dataReady=!0,this.version=0}getSize(t){let e=this.data;return typeof HTMLVideoElement<"u"&&e instanceof HTMLVideoElement?t.set(e.videoWidth,e.videoHeight,0):typeof VideoFrame<"u"&&e instanceof VideoFrame?t.set(e.displayWidth,e.displayHeight,0):e!==null?t.set(e.width||0,e.height||0,e.depth||0):t.set(0,0,0),t}set needsUpdate(t){t===!0&&this.version++}toJSON(t){let e=t===void 0||typeof t=="string";if(!e&&t.images[this.uuid]!==void 0)return t.images[this.uuid];let i={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let a=0,o=s.length;a<o;a++)s[a].isDataTexture?r.push(Ul(s[a].image)):r.push(Ul(s[a]))}else r=Ul(s);i.url=r}return e||(t.images[this.uuid]=i),i}};function Ul(n){return typeof HTMLImageElement<"u"&&n instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&n instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&n instanceof ImageBitmap?Ma.getDataURL(n):n.data?{data:Array.from(n.data),width:n.width,height:n.height,type:n.data.constructor.name}:(Gt("Texture: Unable to serialize Texture."),{})}var Kf=0,Ol=new nt,Ye=class n extends Gn{constructor(t=n.DEFAULT_IMAGE,e=n.DEFAULT_MAPPING,i=Bn,s=Bn,r=Xe,a=si,o=Nn,l=tn,c=n.DEFAULT_ANISOTROPY,u=ai){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Kf++}),this.uuid=Er(),this.name="",this.source=new bs(t),this.mipmaps=[],this.mapping=e,this.channel=0,this.wrapS=i,this.wrapT=s,this.magFilter=r,this.minFilter=a,this.anisotropy=c,this.format=o,this.internalFormat=null,this.type=l,this.offset=new Qt(0,0),this.repeat=new Qt(1,1),this.center=new Qt(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Ht,this.generateMipmaps=!0,this.mipmapsAutoUpdate=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=u,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(t&&t.depth&&t.depth>1),this.pmremVersion=0,this.isPMREMTexture=!1,this.normalized=!1}get width(){return this.source.getSize(Ol).x}get height(){return this.source.getSize(Ol).y}get depth(){return this.source.getSize(Ol).z}get image(){return this.source.data}set image(t){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.normalized=t.normalized,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.mipmapsAutoUpdate=t.mipmapsAutoUpdate,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.renderTarget=t.renderTarget,this.isRenderTargetTexture=t.isRenderTargetTexture,this.isPMREMTexture=t.isPMREMTexture,this.isArrayTexture=t.isArrayTexture,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}setValues(t){for(let e in t){let i=t[e];if(i===void 0){Gt(`Texture.setValues(): parameter '${e}' has value of undefined.`);continue}let s=this[e];if(s===void 0){Gt(`Texture.setValues(): property '${e}' does not exist.`);continue}s&&i&&s.isVector2&&i.isVector2||s&&i&&s.isVector3&&i.isVector3||s&&i&&s.isMatrix3&&i.isMatrix3?s.copy(i):this[e]=i}}toJSON(t){let e=t===void 0||typeof t=="string";if(!e&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];let i={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,mipmapsAutoUpdate:this.mipmapsAutoUpdate,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(i.userData=this.userData),e||(t.textures[this.uuid]=i),i}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==Mc)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case vs:t.x=t.x-Math.floor(t.x);break;case Bn:t.x=t.x<0?0:1;break;case ya:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case vs:t.y=t.y-Math.floor(t.y);break;case Bn:t.y=t.y<0?0:1;break;case ya:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(t){t===!0&&this.pmremVersion++}};Ye.DEFAULT_IMAGE=null;Ye.DEFAULT_MAPPING=Mc;Ye.DEFAULT_ANISOTROPY=1;var Vc=class Vc{constructor(t=0,e=0,i=0,s=1){this.x=t,this.y=e,this.z=i,this.w=s}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,e,i,s){return this.x=t,this.y=e,this.z=i,this.w=s,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;case 3:this.w=e;break;default:throw new Error("THREE.Vector4: index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("THREE.Vector4: index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this.w=t.w+e.w,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this.w+=t.w*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this.w=t.w-e.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){let e=this.x,i=this.y,s=this.z,r=this.w,a=t.elements;return this.x=a[0]*e+a[4]*i+a[8]*s+a[12]*r,this.y=a[1]*e+a[5]*i+a[9]*s+a[13]*r,this.z=a[2]*e+a[6]*i+a[10]*s+a[14]*r,this.w=a[3]*e+a[7]*i+a[11]*s+a[15]*r,this}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this.w/=t.w,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);let e=Math.sqrt(1-t.w*t.w);return e<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/e,this.y=t.y/e,this.z=t.z/e),this}setAxisAngleFromRotationMatrix(t){let e,i,s,r,l=t.elements,c=l[0],u=l[4],f=l[8],h=l[1],d=l[5],p=l[9],T=l[2],x=l[6],m=l[10];if(Math.abs(u-h)<.01&&Math.abs(f-T)<.01&&Math.abs(p-x)<.01){if(Math.abs(u+h)<.1&&Math.abs(f+T)<.1&&Math.abs(p+x)<.1&&Math.abs(c+d+m-3)<.1)return this.set(1,0,0,0),this;e=Math.PI;let y=(c+1)/2,w=(d+1)/2,I=(m+1)/2,L=(u+h)/4,g=(f+T)/4,_=(p+x)/4;return y>w&&y>I?y<.01?(i=0,s=.707106781,r=.707106781):(i=Math.sqrt(y),s=L/i,r=g/i):w>I?w<.01?(i=.707106781,s=0,r=.707106781):(s=Math.sqrt(w),i=L/s,r=_/s):I<.01?(i=.707106781,s=.707106781,r=0):(r=Math.sqrt(I),i=g/r,s=_/r),this.set(i,s,r,e),this}let M=Math.sqrt((x-p)*(x-p)+(f-T)*(f-T)+(h-u)*(h-u));return Math.abs(M)<.001&&(M=1),this.x=(x-p)/M,this.y=(f-T)/M,this.z=(h-u)/M,this.w=Math.acos((c+d+m-1)/2),this}setFromMatrixPosition(t){let e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this.w=e[15],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,e){return this.x=ne(this.x,t.x,e.x),this.y=ne(this.y,t.y,e.y),this.z=ne(this.z,t.z,e.z),this.w=ne(this.w,t.w,e.w),this}clampScalar(t,e){return this.x=ne(this.x,t,e),this.y=ne(this.y,t,e),this.z=ne(this.z,t,e),this.w=ne(this.w,t,e),this}clampLength(t,e){let i=this.length();return this.divideScalar(i||1).multiplyScalar(ne(i,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this.w+=(t.w-this.w)*e,this}lerpVectors(t,e,i){return this.x=t.x+(e.x-t.x)*i,this.y=t.y+(e.y-t.y)*i,this.z=t.z+(e.z-t.z)*i,this.w=t.w+(e.w-t.w)*i,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this.w=t[e+3],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t[e+3]=this.w,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this.w=t.getW(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}};Vc.prototype.isVector4=!0;var me=Vc,Sa=class extends Gn{constructor(t=1,e=1,i={}){super(),i=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Xe,depthBuffer:!0,stencilBuffer:!1,resolveColorBuffer:!0,resolveDepthBuffer:!0,resolveStencilBuffer:!0,storeMultisampledColorBuffer:!0,storeMultisampledDepthBuffer:!0,storeMultisampledStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1,useArrayDepthTexture:!1},i),this.isRenderTarget=!0,this.width=t,this.height=e,this.depth=i.depth,this.scissor=new me(0,0,t,e),this.scissorTest=!1,this.viewport=new me(0,0,t,e),this.textures=[];let s=i.count;for(let r=0;r<s;r++)this.textures[r]=new Ye({width:t,height:e,depth:i.depth}),this.textures[r].isRenderTargetTexture=!0,this.textures[r].renderTarget=this;this._setTextureOptions(i),this.depthBuffer=i.depthBuffer,this.stencilBuffer=i.stencilBuffer,this.resolveColorBuffer=i.resolveColorBuffer,this.resolveDepthBuffer=i.resolveDepthBuffer,this.resolveStencilBuffer=i.resolveStencilBuffer,this.storeMultisampledColorBuffer=i.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=i.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=i.storeMultisampledStencilBuffer,this._depthTexture=null,this.depthTexture=i.depthTexture,this.samples=i.samples,this.multiview=i.multiview,this.useArrayDepthTexture=i.useArrayDepthTexture}_setTextureOptions(t={}){let e={minFilter:Xe,generateMipmaps:!1,flipY:!1,internalFormat:null};t.mapping!==void 0&&(e.mapping=t.mapping),t.wrapS!==void 0&&(e.wrapS=t.wrapS),t.wrapT!==void 0&&(e.wrapT=t.wrapT),t.wrapR!==void 0&&(e.wrapR=t.wrapR),t.magFilter!==void 0&&(e.magFilter=t.magFilter),t.minFilter!==void 0&&(e.minFilter=t.minFilter),t.format!==void 0&&(e.format=t.format),t.type!==void 0&&(e.type=t.type),t.anisotropy!==void 0&&(e.anisotropy=t.anisotropy),t.colorSpace!==void 0&&(e.colorSpace=t.colorSpace),t.flipY!==void 0&&(e.flipY=t.flipY),t.generateMipmaps!==void 0&&(e.generateMipmaps=t.generateMipmaps),t.mipmapsAutoUpdate!==void 0&&(e.mipmapsAutoUpdate=t.mipmapsAutoUpdate),t.internalFormat!==void 0&&(e.internalFormat=t.internalFormat);for(let i=0;i<this.textures.length;i++)this.textures[i].setValues(e)}get texture(){return this.textures[0]}set texture(t){this.textures[0]=t}set depthTexture(t){this._depthTexture!==null&&this._depthTexture.renderTarget===this&&(this._depthTexture.renderTarget=null),t!==null&&t.renderTarget===null&&(t.renderTarget=this),this._depthTexture=t}get depthTexture(){return this._depthTexture}setSize(t,e,i=1){if(this.width!==t||this.height!==e||this.depth!==i){this.width=t,this.height=e,this.depth=i;for(let s=0,r=this.textures.length;s<r;s++)this.textures[s].image.width=t,this.textures[s].image.height=e,this.textures[s].image.depth=i,this.textures[s].isData3DTexture!==!0&&(this.textures[s].isArrayTexture=this.textures[s].image.depth>1);this.dispose()}this.viewport.set(0,0,t,e),this.scissor.set(0,0,t,e)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.textures.length=0;for(let e=0,i=t.textures.length;e<i;e++){this.textures[e]=t.textures[e].clone(),this.textures[e].isRenderTargetTexture=!0,this.textures[e].renderTarget=this;let s=Object.assign({},t.textures[e].image);this.textures[e].source=new bs(s)}if(this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,this.resolveColorBuffer=t.resolveColorBuffer,this.resolveDepthBuffer=t.resolveDepthBuffer,this.resolveStencilBuffer=t.resolveStencilBuffer,this.storeMultisampledColorBuffer=t.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=t.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=t.storeMultisampledStencilBuffer,t.depthTexture!==null)if(t.depthTexture.renderTarget===t){let e=t.depthTexture.clone();e.renderTarget=null,this.depthTexture=e}else this.depthTexture=t.depthTexture;else this.depthTexture=null;return this.samples=t.samples,this.multiview=t.multiview,this.useArrayDepthTexture=t.useArrayDepthTexture,this}dispose(){this.dispatchEvent({type:"dispose"})}},ln=class extends Sa{constructor(t=1,e=1,i={}){super(t,e,i),this.isWebGLRenderTarget=!0}},sr=class extends Ye{constructor(t=null,e=1,i=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:e,height:i,depth:s},this.magFilter=Le,this.minFilter=Le,this.wrapR=Bn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}copy(t){return super.copy(t),this.wrapR=t.wrapR,this}addLayerUpdate(t){this.layerUpdates.add(t)}clearLayerUpdates(){this.layerUpdates.clear()}};var ba=class extends Ye{constructor(t=null,e=1,i=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:e,height:i,depth:s},this.magFilter=Le,this.minFilter=Le,this.wrapR=Bn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}copy(t){return super.copy(t),this.wrapR=t.wrapR,this}};var Ga=class Ga{constructor(t,e,i,s,r,a,o,l,c,u,f,h,d,p,T,x){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,e,i,s,r,a,o,l,c,u,f,h,d,p,T,x)}set(t,e,i,s,r,a,o,l,c,u,f,h,d,p,T,x){let m=this.elements;return m[0]=t,m[4]=e,m[8]=i,m[12]=s,m[1]=r,m[5]=a,m[9]=o,m[13]=l,m[2]=c,m[6]=u,m[10]=f,m[14]=h,m[3]=d,m[7]=p,m[11]=T,m[15]=x,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new Ga().fromArray(this.elements)}copy(t){let e=this.elements,i=t.elements;return e[0]=i[0],e[1]=i[1],e[2]=i[2],e[3]=i[3],e[4]=i[4],e[5]=i[5],e[6]=i[6],e[7]=i[7],e[8]=i[8],e[9]=i[9],e[10]=i[10],e[11]=i[11],e[12]=i[12],e[13]=i[13],e[14]=i[14],e[15]=i[15],this}copyPosition(t){let e=this.elements,i=t.elements;return e[12]=i[12],e[13]=i[13],e[14]=i[14],this}setFromMatrix3(t){let e=t.elements;return this.set(e[0],e[3],e[6],0,e[1],e[4],e[7],0,e[2],e[5],e[8],0,0,0,0,1),this}extractBasis(t,e,i){return this.determinantAffine()===0?(t.set(1,0,0),e.set(0,1,0),i.set(0,0,1),this):(t.setFromMatrixColumn(this,0),e.setFromMatrixColumn(this,1),i.setFromMatrixColumn(this,2),this)}makeBasis(t,e,i){return this.set(t.x,e.x,i.x,0,t.y,e.y,i.y,0,t.z,e.z,i.z,0,0,0,0,1),this}extractRotation(t){if(t.determinantAffine()===0)return this.identity();let e=this.elements,i=t.elements,s=1/as.setFromMatrixColumn(t,0).length(),r=1/as.setFromMatrixColumn(t,1).length(),a=1/as.setFromMatrixColumn(t,2).length();return e[0]=i[0]*s,e[1]=i[1]*s,e[2]=i[2]*s,e[3]=0,e[4]=i[4]*r,e[5]=i[5]*r,e[6]=i[6]*r,e[7]=0,e[8]=i[8]*a,e[9]=i[9]*a,e[10]=i[10]*a,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromEuler(t){let e=this.elements,i=t.x,s=t.y,r=t.z,a=Math.cos(i),o=Math.sin(i),l=Math.cos(s),c=Math.sin(s),u=Math.cos(r),f=Math.sin(r);if(t.order==="XYZ"){let h=a*u,d=a*f,p=o*u,T=o*f;e[0]=l*u,e[4]=-l*f,e[8]=c,e[1]=d+p*c,e[5]=h-T*c,e[9]=-o*l,e[2]=T-h*c,e[6]=p+d*c,e[10]=a*l}else if(t.order==="YXZ"){let h=l*u,d=l*f,p=c*u,T=c*f;e[0]=h+T*o,e[4]=p*o-d,e[8]=a*c,e[1]=a*f,e[5]=a*u,e[9]=-o,e[2]=d*o-p,e[6]=T+h*o,e[10]=a*l}else if(t.order==="ZXY"){let h=l*u,d=l*f,p=c*u,T=c*f;e[0]=h-T*o,e[4]=-a*f,e[8]=p+d*o,e[1]=d+p*o,e[5]=a*u,e[9]=T-h*o,e[2]=-a*c,e[6]=o,e[10]=a*l}else if(t.order==="ZYX"){let h=a*u,d=a*f,p=o*u,T=o*f;e[0]=l*u,e[4]=p*c-d,e[8]=h*c+T,e[1]=l*f,e[5]=T*c+h,e[9]=d*c-p,e[2]=-c,e[6]=o*l,e[10]=a*l}else if(t.order==="YZX"){let h=a*l,d=a*c,p=o*l,T=o*c;e[0]=l*u,e[4]=T-h*f,e[8]=p*f+d,e[1]=f,e[5]=a*u,e[9]=-o*u,e[2]=-c*u,e[6]=d*f+p,e[10]=h-T*f}else if(t.order==="XZY"){let h=a*l,d=a*c,p=o*l,T=o*c;e[0]=l*u,e[4]=-f,e[8]=c*u,e[1]=h*f+T,e[5]=a*u,e[9]=d*f-p,e[2]=p*f-d,e[6]=o*u,e[10]=T*f+h}return e[3]=0,e[7]=0,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromQuaternion(t){return this.compose(Jf,t,Qf)}lookAt(t,e,i){let s=this.elements;return an.subVectors(t,e),an.lengthSq()===0&&(an.z=1),an.normalize(),ui.crossVectors(i,an),ui.lengthSq()===0&&(Math.abs(i.z)===1?an.x+=1e-4:an.z+=1e-4,an.normalize(),ui.crossVectors(i,an)),ui.normalize(),Hr.crossVectors(an,ui),s[0]=ui.x,s[4]=Hr.x,s[8]=an.x,s[1]=ui.y,s[5]=Hr.y,s[9]=an.y,s[2]=ui.z,s[6]=Hr.z,s[10]=an.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){let i=t.elements,s=e.elements,r=this.elements,a=i[0],o=i[4],l=i[8],c=i[12],u=i[1],f=i[5],h=i[9],d=i[13],p=i[2],T=i[6],x=i[10],m=i[14],M=i[3],y=i[7],w=i[11],I=i[15],L=s[0],g=s[4],_=s[8],U=s[12],C=s[1],F=s[5],E=s[9],O=s[13],D=s[2],R=s[6],B=s[10],b=s[14],P=s[3],A=s[7],N=s[11],v=s[15];return r[0]=a*L+o*C+l*D+c*P,r[4]=a*g+o*F+l*R+c*A,r[8]=a*_+o*E+l*B+c*N,r[12]=a*U+o*O+l*b+c*v,r[1]=u*L+f*C+h*D+d*P,r[5]=u*g+f*F+h*R+d*A,r[9]=u*_+f*E+h*B+d*N,r[13]=u*U+f*O+h*b+d*v,r[2]=p*L+T*C+x*D+m*P,r[6]=p*g+T*F+x*R+m*A,r[10]=p*_+T*E+x*B+m*N,r[14]=p*U+T*O+x*b+m*v,r[3]=M*L+y*C+w*D+I*P,r[7]=M*g+y*F+w*R+I*A,r[11]=M*_+y*E+w*B+I*N,r[15]=M*U+y*O+w*b+I*v,this}multiplyScalar(t){let e=this.elements;return e[0]*=t,e[4]*=t,e[8]*=t,e[12]*=t,e[1]*=t,e[5]*=t,e[9]*=t,e[13]*=t,e[2]*=t,e[6]*=t,e[10]*=t,e[14]*=t,e[3]*=t,e[7]*=t,e[11]*=t,e[15]*=t,this}determinant(){let t=this.elements,e=t[0],i=t[4],s=t[8],r=t[12],a=t[1],o=t[5],l=t[9],c=t[13],u=t[2],f=t[6],h=t[10],d=t[14],p=t[3],T=t[7],x=t[11],m=t[15],M=l*d-c*h,y=o*d-c*f,w=o*h-l*f,I=a*d-c*u,L=a*h-l*u,g=a*f-o*u;return e*(T*M-x*y+m*w)-i*(p*M-x*I+m*L)+s*(p*y-T*I+m*g)-r*(p*w-T*L+x*g)}determinantAffine(){let t=this.elements,e=t[0],i=t[4],s=t[8],r=t[1],a=t[5],o=t[9],l=t[2],c=t[6],u=t[10];return e*(a*u-o*c)-i*(r*u-o*l)+s*(r*c-a*l)}transpose(){let t=this.elements,e;return e=t[1],t[1]=t[4],t[4]=e,e=t[2],t[2]=t[8],t[8]=e,e=t[6],t[6]=t[9],t[9]=e,e=t[3],t[3]=t[12],t[12]=e,e=t[7],t[7]=t[13],t[13]=e,e=t[11],t[11]=t[14],t[14]=e,this}setPosition(t,e,i){let s=this.elements;return t.isVector3?(s[12]=t.x,s[13]=t.y,s[14]=t.z):(s[12]=t,s[13]=e,s[14]=i),this}invert(){let t=this.elements,e=t[0],i=t[1],s=t[2],r=t[3],a=t[4],o=t[5],l=t[6],c=t[7],u=t[8],f=t[9],h=t[10],d=t[11],p=t[12],T=t[13],x=t[14],m=t[15],M=e*o-i*a,y=e*l-s*a,w=e*c-r*a,I=i*l-s*o,L=i*c-r*o,g=s*c-r*l,_=u*T-f*p,U=u*x-h*p,C=u*m-d*p,F=f*x-h*T,E=f*m-d*T,O=h*m-d*x,D=M*O-y*E+w*F+I*C-L*U+g*_;if(D===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let R=1/D;return t[0]=(o*O-l*E+c*F)*R,t[1]=(s*E-i*O-r*F)*R,t[2]=(T*g-x*L+m*I)*R,t[3]=(h*L-f*g-d*I)*R,t[4]=(l*C-a*O-c*U)*R,t[5]=(e*O-s*C+r*U)*R,t[6]=(x*w-p*g-m*y)*R,t[7]=(u*g-h*w+d*y)*R,t[8]=(a*E-o*C+c*_)*R,t[9]=(i*C-e*E-r*_)*R,t[10]=(p*L-T*w+m*M)*R,t[11]=(f*w-u*L-d*M)*R,t[12]=(o*U-a*F-l*_)*R,t[13]=(e*F-i*U+s*_)*R,t[14]=(T*y-p*I-x*M)*R,t[15]=(u*I-f*y+h*M)*R,this}scale(t){let e=this.elements,i=t.x,s=t.y,r=t.z;return e[0]*=i,e[4]*=s,e[8]*=r,e[1]*=i,e[5]*=s,e[9]*=r,e[2]*=i,e[6]*=s,e[10]*=r,e[3]*=i,e[7]*=s,e[11]*=r,this}getMaxScaleOnAxis(){let t=this.elements,e=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],i=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],s=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(e,i,s))}makeTranslation(t,e,i){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,e,0,0,1,i,0,0,0,1),this}makeRotationX(t){let e=Math.cos(t),i=Math.sin(t);return this.set(1,0,0,0,0,e,-i,0,0,i,e,0,0,0,0,1),this}makeRotationY(t){let e=Math.cos(t),i=Math.sin(t);return this.set(e,0,i,0,0,1,0,0,-i,0,e,0,0,0,0,1),this}makeRotationZ(t){let e=Math.cos(t),i=Math.sin(t);return this.set(e,-i,0,0,i,e,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,e){let i=Math.cos(e),s=Math.sin(e),r=1-i,a=t.x,o=t.y,l=t.z,c=r*a,u=r*o;return this.set(c*a+i,c*o-s*l,c*l+s*o,0,c*o+s*l,u*o+i,u*l-s*a,0,c*l-s*o,u*l+s*a,r*l*l+i,0,0,0,0,1),this}makeScale(t,e,i){return this.set(t,0,0,0,0,e,0,0,0,0,i,0,0,0,0,1),this}makeShear(t,e,i,s,r,a){return this.set(1,i,r,0,t,1,a,0,e,s,1,0,0,0,0,1),this}compose(t,e,i){let s=this.elements,r=e._x,a=e._y,o=e._z,l=e._w,c=r+r,u=a+a,f=o+o,h=r*c,d=r*u,p=r*f,T=a*u,x=a*f,m=o*f,M=l*c,y=l*u,w=l*f,I=i.x,L=i.y,g=i.z;return s[0]=(1-(T+m))*I,s[1]=(d+w)*I,s[2]=(p-y)*I,s[3]=0,s[4]=(d-w)*L,s[5]=(1-(h+m))*L,s[6]=(x+M)*L,s[7]=0,s[8]=(p+y)*g,s[9]=(x-M)*g,s[10]=(1-(h+T))*g,s[11]=0,s[12]=t.x,s[13]=t.y,s[14]=t.z,s[15]=1,this}decompose(t,e,i){let s=this.elements;t.x=s[12],t.y=s[13],t.z=s[14];let r=this.determinantAffine();if(r===0)return i.set(1,1,1),e.identity(),this;let a=as.set(s[0],s[1],s[2]).length(),o=as.set(s[4],s[5],s[6]).length(),l=as.set(s[8],s[9],s[10]).length();r<0&&(a=-a),Tn.copy(this);let c=1/a,u=1/o,f=1/l;return Tn.elements[0]*=c,Tn.elements[1]*=c,Tn.elements[2]*=c,Tn.elements[4]*=u,Tn.elements[5]*=u,Tn.elements[6]*=u,Tn.elements[8]*=f,Tn.elements[9]*=f,Tn.elements[10]*=f,e.setFromRotationMatrix(Tn),i.x=a,i.y=o,i.z=l,this}makePerspective(t,e,i,s,r,a,o=yn,l=!1){let c=this.elements,u=2*r/(e-t),f=2*r/(i-s),h=(e+t)/(e-t),d=(i+s)/(i-s),p,T;if(l)p=r/(a-r),T=a*r/(a-r);else if(o===yn)p=-(a+r)/(a-r),T=-2*a*r/(a-r);else if(o===Ms)p=-a/(a-r),T=-a*r/(a-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return c[0]=u,c[4]=0,c[8]=h,c[12]=0,c[1]=0,c[5]=f,c[9]=d,c[13]=0,c[2]=0,c[6]=0,c[10]=p,c[14]=T,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(t,e,i,s,r,a,o=yn,l=!1){let c=this.elements,u=2/(e-t),f=2/(i-s),h=-(e+t)/(e-t),d=-(i+s)/(i-s),p,T;if(l)p=1/(a-r),T=a/(a-r);else if(o===yn)p=-2/(a-r),T=-(a+r)/(a-r);else if(o===Ms)p=-1/(a-r),T=-r/(a-r);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return c[0]=u,c[4]=0,c[8]=0,c[12]=h,c[1]=0,c[5]=f,c[9]=0,c[13]=d,c[2]=0,c[6]=0,c[10]=p,c[14]=T,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(t){let e=this.elements,i=t.elements;for(let s=0;s<16;s++)if(e[s]!==i[s])return!1;return!0}fromArray(t,e=0){for(let i=0;i<16;i++)this.elements[i]=t[i+e];return this}toArray(t=[],e=0){let i=this.elements;return t[e]=i[0],t[e+1]=i[1],t[e+2]=i[2],t[e+3]=i[3],t[e+4]=i[4],t[e+5]=i[5],t[e+6]=i[6],t[e+7]=i[7],t[e+8]=i[8],t[e+9]=i[9],t[e+10]=i[10],t[e+11]=i[11],t[e+12]=i[12],t[e+13]=i[13],t[e+14]=i[14],t[e+15]=i[15],t}};Ga.prototype.isMatrix4=!0;var de=Ga,as=new nt,Tn=new de,Jf=new nt(0,0,0),Qf=new nt(1,1,1),ui=new nt,Hr=new nt,an=new nt,jh=new de,tu=new Vn,ni=class n{constructor(t=0,e=0,i=0,s=n.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=e,this._z=i,this._order=s}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,e,i,s=this._order){return this._x=t,this._y=e,this._z=i,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,e=this._order,i=!0){let s=t.elements,r=s[0],a=s[4],o=s[8],l=s[1],c=s[5],u=s[9],f=s[2],h=s[6],d=s[10];switch(e){case"XYZ":this._y=Math.asin(ne(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-u,d),this._z=Math.atan2(-a,r)):(this._x=Math.atan2(h,c),this._z=0);break;case"YXZ":this._x=Math.asin(-ne(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(o,d),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-f,r),this._z=0);break;case"ZXY":this._x=Math.asin(ne(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(-f,d),this._z=Math.atan2(-a,c)):(this._y=0,this._z=Math.atan2(l,r));break;case"ZYX":this._y=Math.asin(-ne(f,-1,1)),Math.abs(f)<.9999999?(this._x=Math.atan2(h,d),this._z=Math.atan2(l,r)):(this._x=0,this._z=Math.atan2(-a,c));break;case"YZX":this._z=Math.asin(ne(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-u,c),this._y=Math.atan2(-f,r)):(this._x=0,this._y=Math.atan2(o,d));break;case"XZY":this._z=Math.asin(-ne(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(h,c),this._y=Math.atan2(o,r)):(this._x=Math.atan2(-u,d),this._y=0);break;default:Gt("Euler: .setFromRotationMatrix() encountered an unknown order: "+e)}return this._order=e,i===!0&&this._onChangeCallback(),this}setFromQuaternion(t,e,i){return jh.makeRotationFromQuaternion(t),this.setFromRotationMatrix(jh,e,i)}setFromVector3(t,e=this._order){return this.set(t.x,t.y,t.z,e)}reorder(t){return tu.setFromEuler(this),this.setFromQuaternion(tu,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}};ni.DEFAULT_ORDER="XYZ";var ws=class{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}},jf=0,eu=new nt,os=new Vn,Zn=new de,Wr=new nt,Zs=new nt,tp=new nt,ep=new Vn,nu=new nt(1,0,0),iu=new nt(0,1,0),su=new nt(0,0,1),ru={type:"added"},np={type:"removed"},ls={type:"childadded",child:null},Fl={type:"childremoved",child:null},$e=class n extends Gn{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:jf++}),this.uuid=Er(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=n.DEFAULT_UP.clone();let t=new nt,e=new ni,i=new Vn,s=new nt(1,1,1);function r(){i.setFromEuler(e,!1)}function a(){e.setFromQuaternion(i,void 0,!1)}e._onChange(r),i._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:e},quaternion:{configurable:!0,enumerable:!0,value:i},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new de},normalMatrix:{value:new Ht}}),this.matrix=new de,this.matrixWorld=new de,this.matrixAutoUpdate=n.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=n.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new ws,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale),this.pivot!==null&&this.position.copy(this.pivot).applyMatrix4(this.matrix).sub(this.pivot)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,e){this.quaternion.setFromAxisAngle(t,e)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,e){return os.setFromAxisAngle(t,e),this.quaternion.multiply(os),this}rotateOnWorldAxis(t,e){return os.setFromAxisAngle(t,e),this.quaternion.premultiply(os),this}rotateX(t){return this.rotateOnAxis(nu,t)}rotateY(t){return this.rotateOnAxis(iu,t)}rotateZ(t){return this.rotateOnAxis(su,t)}translateOnAxis(t,e){return eu.copy(t).applyQuaternion(this.quaternion),this.position.add(eu.multiplyScalar(e)),this}translateX(t){return this.translateOnAxis(nu,t)}translateY(t){return this.translateOnAxis(iu,t)}translateZ(t){return this.translateOnAxis(su,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(Zn.copy(this.matrixWorld).invert())}lookAt(t,e,i){t.isVector3?Wr.copy(t):Wr.set(t,e,i);let s=this.parent;this.updateWorldMatrix(!0,!1),Zs.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Zn.lookAt(Zs,Wr,this.up):Zn.lookAt(Wr,Zs,this.up),this.quaternion.setFromRotationMatrix(Zn),s&&(Zn.extractRotation(s.matrixWorld),os.setFromRotationMatrix(Zn),this.quaternion.premultiply(os.invert()))}add(t){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return t===this?(Vt("Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.removeFromParent(),t.parent=this,this.children.push(t),t.dispatchEvent(ru),ls.child=t,this.dispatchEvent(ls),ls.child=null):Vt("Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.remove(arguments[i]);return this}let e=this.children.indexOf(t);return e!==-1&&(t.parent=null,this.children.splice(e,1),t.dispatchEvent(np),Fl.child=t,this.dispatchEvent(Fl),Fl.child=null),this}removeFromParent(){let t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),Zn.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),Zn.multiply(t.parent.matrixWorld)),t.applyMatrix4(Zn),t.removeFromParent(),t.parent=this,this.children.push(t),t.updateWorldMatrix(!1,!0),t.dispatchEvent(ru),ls.child=t,this.dispatchEvent(ls),ls.child=null,this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,e){if(this[t]===e)return this;for(let i=0,s=this.children.length;i<s;i++){let a=this.children[i].getObjectByProperty(t,e);if(a!==void 0)return a}}getObjectsByProperty(t,e,i=[]){this[t]===e&&i.push(this);let s=this.children;for(let r=0,a=s.length;r<a;r++)s[r].getObjectsByProperty(t,e,i);return i}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Zs,t,tp),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Zs,ep,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);let e=this.matrixWorld.elements;return t.set(e[8],e[9],e[10]).normalize()}raycast(){}intersectsFrustum(){return!0}traverse(t){t(this);let e=this.children;for(let i=0,s=e.length;i<s;i++)e[i].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);let e=this.children;for(let i=0,s=e.length;i<s;i++)e[i].traverseVisible(t)}traverseAncestors(t){let e=this.parent;e!==null&&(t(e),e.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);let t=this.pivot;if(t!==null){let e=t.x,i=t.y,s=t.z,r=this.matrix.elements;r[12]+=e-r[0]*e-r[4]*i-r[8]*s,r[13]+=i-r[1]*e-r[5]*i-r[9]*s,r[14]+=s-r[2]*e-r[6]*i-r[10]*s}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,t=!0);let e=this.children;for(let i=0,s=e.length;i<s;i++)e[i].updateMatrixWorld(t)}updateWorldMatrix(t,e,i=!1){let s=this.parent;if(t===!0&&s!==null&&s.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||i)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,i=!0),e===!0){let r=this.children;for(let a=0,o=r.length;a<o;a++)r[a].updateWorldMatrix(!1,!0,i)}}toJSON(t){let e=t===void 0||typeof t=="string",i={};e&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},i.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});let s={};s.uuid=this.uuid,s.type=this.type,s.name=this.name,s.castShadow=this.castShadow,s.receiveShadow=this.receiveShadow,s.visible=this.visible,s.frustumCulled=this.frustumCulled,s.renderOrder=this.renderOrder,s.static=this.static,s.matrixAutoUpdate=this.matrixAutoUpdate,Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.pivot!==null&&(s.pivot=this.pivot.toArray()),this.morphTargetDictionary!==void 0&&(s.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(s.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.geometryInfo=this._geometryInfo.map(o=>({...o,boundingBox:o.boundingBox?o.boundingBox.toJSON():void 0,boundingSphere:o.boundingSphere?o.boundingSphere.toJSON():void 0})),s.instanceInfo=this._instanceInfo.map(o=>({...o})),s.availableInstanceIds=this._availableInstanceIds.slice(),s.availableGeometryIds=this._availableGeometryIds.slice(),s.nextIndexStart=this._nextIndexStart,s.nextVertexStart=this._nextVertexStart,s.geometryCount=this._geometryCount,s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.matricesTexture=this._matricesTexture.toJSON(t),s.indirectTexture=this._indirectTexture.toJSON(t),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(t)),this.boundingSphere!==null&&(s.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(s.boundingBox=this.boundingBox.toJSON()));function r(o,l){return o[l.uuid]===void 0&&(o[l.uuid]=l.toJSON(t)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(t.geometries,this.geometry);let o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){let l=o.shapes;if(Array.isArray(l))for(let c=0,u=l.length;c<u;c++){let f=l[c];r(t.shapes,f)}else r(t.shapes,l)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(t.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){let o=[];for(let l=0,c=this.material.length;l<c;l++)o.push(r(t.materials,this.material[l]));s.material=o}else s.material=r(t.materials,this.material);if(this.children.length>0){s.children=[];for(let o=0;o<this.children.length;o++)s.children.push(this.children[o].toJSON(t).object)}if(this.animations.length>0){s.animations=[];for(let o=0;o<this.animations.length;o++){let l=this.animations[o];s.animations.push(r(t.animations,l))}}if(e){let o=a(t.geometries),l=a(t.materials),c=a(t.textures),u=a(t.images),f=a(t.shapes),h=a(t.skeletons),d=a(t.animations),p=a(t.nodes);o.length>0&&(i.geometries=o),l.length>0&&(i.materials=l),c.length>0&&(i.textures=c),u.length>0&&(i.images=u),f.length>0&&(i.shapes=f),h.length>0&&(i.skeletons=h),d.length>0&&(i.animations=d),p.length>0&&(i.nodes=p)}return i.object=s,i;function a(o){let l=[];for(let c in o){let u=o[c];delete u.metadata,l.push(u)}return l}}clone(t){return new this.constructor().copy(this,t)}copy(t,e=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.pivot=t.pivot!==null?t.pivot.clone():null,this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.static=t.static,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),e===!0)for(let i=0;i<t.children.length;i++){let s=t.children[i];this.add(s.clone())}return this}dispose(){this.dispatchEvent({type:"dispose"})}};$e.DEFAULT_UP=new nt(0,1,0);$e.DEFAULT_MATRIX_AUTO_UPDATE=!0;$e.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;var Rn=class extends $e{constructor(){super(),this.isGroup=!0,this.type="Group"}},ip={type:"move"},Ts=class{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Rn,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Rn,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new nt,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new nt),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Rn,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new nt,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new nt,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){let e=this._hand;if(e)for(let i of t.hand.values())this._getHandJoint(e,i)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,e,i){let s=null,r=null,a=null,o=this._targetRay,l=this._grip,c=this._hand;if(t&&e.session.visibilityState!=="visible-blurred"){if(c&&t.hand){a=!0;for(let T of t.hand.values()){let x=e.getJointPose(T,i),m=this._getHandJoint(c,T);x!==null&&(m.matrix.fromArray(x.transform.matrix),m.matrix.decompose(m.position,m.quaternion,m.scale),m.matrixWorldNeedsUpdate=!0,m.jointRadius=x.radius),m.visible=x!==null}let u=c.joints["index-finger-tip"],f=c.joints["thumb-tip"],h=u.position.distanceTo(f.position),d=.02,p=.005;c.inputState.pinching&&h>d+p?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!c.inputState.pinching&&h<=d-p&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else l!==null&&t.gripSpace&&(r=e.getPose(t.gripSpace,i),r!==null&&(l.matrix.fromArray(r.transform.matrix),l.matrix.decompose(l.position,l.quaternion,l.scale),l.matrixWorldNeedsUpdate=!0,r.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(r.linearVelocity)):l.hasLinearVelocity=!1,r.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(r.angularVelocity)):l.hasAngularVelocity=!1,l.eventsEnabled&&l.dispatchEvent({type:"gripUpdated",data:t,target:this})));o!==null&&(s=e.getPose(t.targetRaySpace,i),s===null&&r!==null&&(s=r),s!==null&&(o.matrix.fromArray(s.transform.matrix),o.matrix.decompose(o.position,o.quaternion,o.scale),o.matrixWorldNeedsUpdate=!0,s.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(s.linearVelocity)):o.hasLinearVelocity=!1,s.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(s.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(ip)))}return o!==null&&(o.visible=s!==null),l!==null&&(l.visible=r!==null),c!==null&&(c.visible=a!==null),this}_getHandJoint(t,e){if(t.joints[e.jointName]===void 0){let i=new Rn;i.matrixAutoUpdate=!1,i.visible=!1,t.joints[e.jointName]=i,t.add(i)}return t.joints[e.jointName]}},sd={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},di={h:0,s:0,l:0},qr={h:0,s:0,l:0};function kl(n,t,e){return e<0&&(e+=1),e>1&&(e-=1),e<1/6?n+(t-n)*6*e:e<1/2?t:e<2/3?n+(t-n)*6*(2/3-e):n}var Zt=class{constructor(t,e,i){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,e,i)}set(t,e,i){if(e===void 0&&i===void 0){let s=t;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(t,e,i);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,e=We){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,ee.colorSpaceToWorking(this,e),this}setRGB(t,e,i,s=ee.workingColorSpace){return this.r=t,this.g=e,this.b=i,ee.colorSpaceToWorking(this,s),this}setHSL(t,e,i,s=ee.workingColorSpace){if(t=qf(t,1),e=ne(e,0,1),i=ne(i,0,1),e===0)this.r=this.g=this.b=i;else{let r=i<=.5?i*(1+e):i+e-i*e,a=2*i-r;this.r=kl(a,r,t+1/3),this.g=kl(a,r,t),this.b=kl(a,r,t-1/3)}return ee.colorSpaceToWorking(this,s),this}setStyle(t,e=We){function i(r){r!==void 0&&parseFloat(r)<1&&Gt("Color: Alpha component of "+t+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(t)){let r,a=s[1],o=s[2];switch(a){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d+(?:\.\d+)?|\.\d+)\s*)?$/.exec(o))return i(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,e);if(r=/^\s*(\d+(?:\.\d+)?|\.\d+)\%\s*,\s*(\d+(?:\.\d+)?|\.\d+)\%\s*,\s*(\d+(?:\.\d+)?|\.\d+)\%\s*(?:,\s*(\d+(?:\.\d+)?|\.\d+)\s*)?$/.exec(o))return i(r[4]),this.setRGB(Math.min(100,parseFloat(r[1]))/100,Math.min(100,parseFloat(r[2]))/100,Math.min(100,parseFloat(r[3]))/100,e);break;case"hsl":case"hsla":if(r=/^\s*([+-]?(?:\d+(?:\.\d+)?|\.\d+))\s*,\s*(\d+(?:\.\d+)?|\.\d+)\%\s*,\s*(\d+(?:\.\d+)?|\.\d+)\%\s*(?:,\s*(\d+(?:\.\d+)?|\.\d+)\s*)?$/.exec(o))return i(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,e);break;default:Gt("Color: Unknown color model "+t)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(t)){let r=s[1],a=r.length;if(a===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,e);if(a===6)return this.setHex(parseInt(r,16),e);Gt("Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,e);return this}setColorName(t,e=We){let i=sd[t.toLowerCase()];return i!==void 0?this.setHex(i,e):Gt("Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=ti(t.r),this.g=ti(t.g),this.b=ti(t.b),this}copyLinearToSRGB(t){return this.r=ys(t.r),this.g=ys(t.g),this.b=ys(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=We){return ee.workingToColorSpace(Be.copy(this),t),Math.round(ne(Be.r*255,0,255))*65536+Math.round(ne(Be.g*255,0,255))*256+Math.round(ne(Be.b*255,0,255))}getHexString(t=We){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,e=ee.workingColorSpace){ee.workingToColorSpace(Be.copy(this),e);let i=Be.r,s=Be.g,r=Be.b,a=Math.max(i,s,r),o=Math.min(i,s,r),l,c,u=(o+a)/2;if(o===a)l=0,c=0;else{let f=a-o;switch(c=u<=.5?f/(a+o):f/(2-a-o),a){case i:l=(s-r)/f+(s<r?6:0);break;case s:l=(r-i)/f+2;break;case r:l=(i-s)/f+4;break}l/=6}return t.h=l,t.s=c,t.l=u,t}getRGB(t,e=ee.workingColorSpace){return ee.workingToColorSpace(Be.copy(this),e),t.r=Be.r,t.g=Be.g,t.b=Be.b,t}getStyle(t=We){ee.workingToColorSpace(Be.copy(this),t);let e=Be.r,i=Be.g,s=Be.b;return t!==We?`color(${t} ${e.toFixed(3)} ${i.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(e*255)},${Math.round(i*255)},${Math.round(s*255)})`}offsetHSL(t,e,i){return this.getHSL(di),this.setHSL(di.h+t,di.s+e,di.l+i)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,e){return this.r=t.r+e.r,this.g=t.g+e.g,this.b=t.b+e.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,e){return this.r+=(t.r-this.r)*e,this.g+=(t.g-this.g)*e,this.b+=(t.b-this.b)*e,this}lerpColors(t,e,i){return this.r=t.r+(e.r-t.r)*i,this.g=t.g+(e.g-t.g)*i,this.b=t.b+(e.b-t.b)*i,this}lerpHSL(t,e){this.getHSL(di),t.getHSL(qr);let i=Ll(di.h,qr.h,e),s=Ll(di.s,qr.s,e),r=Ll(di.l,qr.l,e);return this.setHSL(i,s,r),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){let e=this.r,i=this.g,s=this.b,r=t.elements;return this.r=r[0]*e+r[3]*i+r[6]*s,this.g=r[1]*e+r[4]*i+r[7]*s,this.b=r[2]*e+r[5]*i+r[8]*s,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,e=0){return this.r=t[e],this.g=t[e+1],this.b=t[e+2],this}toArray(t=[],e=0){return t[e]=this.r,t[e+1]=this.g,t[e+2]=this.b,t}fromBufferAttribute(t,e){return this.r=t.getX(e),this.g=t.getY(e),this.b=t.getZ(e),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}},Be=new Zt;Zt.NAMES=sd;var Es=class extends $e{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new ni,this.environmentIntensity=1,this.environmentRotation=new ni,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,e){return super.copy(t,e),this.background=t.background!==null?t.background.clone():null,this.environment=t.environment!==null?t.environment.clone():null,this.fog=t.fog!==null?t.fog.clone():null,this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,this.backgroundRotation.copy(t.backgroundRotation),this.environmentIntensity=t.environmentIntensity,this.environmentRotation.copy(t.environmentRotation),this.overrideMaterial=t.overrideMaterial!==null?t.overrideMaterial.clone():null,this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){let e=super.toJSON(t);return this.fog!==null&&(e.object.fog=this.fog.toJSON()),e.object.backgroundBlurriness=this.backgroundBlurriness,e.object.backgroundIntensity=this.backgroundIntensity,e.object.backgroundRotation=this.backgroundRotation.toArray(),e.object.environmentIntensity=this.environmentIntensity,e.object.environmentRotation=this.environmentRotation.toArray(),e}},En=new nt,Kn=new nt,Bl=new nt,Jn=new nt,cs=new nt,hs=new nt,au=new nt,zl=new nt,Gl=new nt,Vl=new nt,Hl=new me,Wl=new me,ql=new me,gi=class n{constructor(t=new nt,e=new nt,i=new nt){this.a=t,this.b=e,this.c=i}static getNormal(t,e,i,s){s.subVectors(i,e),En.subVectors(t,e),s.cross(En);let r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(t,e,i,s,r){En.subVectors(s,e),Kn.subVectors(i,e),Bl.subVectors(t,e);let a=En.dot(En),o=En.dot(Kn),l=En.dot(Bl),c=Kn.dot(Kn),u=Kn.dot(Bl),f=a*c-o*o;if(f===0)return r.set(0,0,0),null;let h=1/f,d=(c*l-o*u)*h,p=(a*u-o*l)*h;return r.set(1-d-p,p,d)}static containsPoint(t,e,i,s){return this.getBarycoord(t,e,i,s,Jn)===null?!1:Jn.x>=0&&Jn.y>=0&&Jn.x+Jn.y<=1}static getInterpolation(t,e,i,s,r,a,o,l){return this.getBarycoord(t,e,i,s,Jn)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(r,Jn.x),l.addScaledVector(a,Jn.y),l.addScaledVector(o,Jn.z),l)}static getInterpolatedAttribute(t,e,i,s,r,a){return Hl.setScalar(0),Wl.setScalar(0),ql.setScalar(0),Hl.fromBufferAttribute(t,e),Wl.fromBufferAttribute(t,i),ql.fromBufferAttribute(t,s),a.setScalar(0),a.addScaledVector(Hl,r.x),a.addScaledVector(Wl,r.y),a.addScaledVector(ql,r.z),a}static isFrontFacing(t,e,i,s){return En.subVectors(i,e),Kn.subVectors(t,e),En.cross(Kn).dot(s)<0}set(t,e,i){return this.a.copy(t),this.b.copy(e),this.c.copy(i),this}setFromPointsAndIndices(t,e,i,s){return this.a.copy(t[e]),this.b.copy(t[i]),this.c.copy(t[s]),this}setFromAttributeAndIndices(t,e,i,s){return this.a.fromBufferAttribute(t,e),this.b.fromBufferAttribute(t,i),this.c.fromBufferAttribute(t,s),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return En.subVectors(this.c,this.b),Kn.subVectors(this.a,this.b),En.cross(Kn).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return n.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,e){return n.getBarycoord(t,this.a,this.b,this.c,e)}getInterpolation(t,e,i,s,r){return n.getInterpolation(t,this.a,this.b,this.c,e,i,s,r)}containsPoint(t){return n.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return n.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,e){let i=this.a,s=this.b,r=this.c,a,o;cs.subVectors(s,i),hs.subVectors(r,i),zl.subVectors(t,i);let l=cs.dot(zl),c=hs.dot(zl);if(l<=0&&c<=0)return e.copy(i);Gl.subVectors(t,s);let u=cs.dot(Gl),f=hs.dot(Gl);if(u>=0&&f<=u)return e.copy(s);let h=l*f-u*c;if(h<=0&&l>=0&&u<=0&&l-u>0)return a=l/(l-u),e.copy(i).addScaledVector(cs,a);Vl.subVectors(t,r);let d=cs.dot(Vl),p=hs.dot(Vl);if(p>=0&&d<=p)return e.copy(r);let T=d*c-l*p;if(T<=0&&c>=0&&p<=0)return o=c/(c-p),e.copy(i).addScaledVector(hs,o);let x=u*p-d*f;if(x<=0&&f-u>=0&&d-p>=0)return au.subVectors(r,s),o=(f-u)/(f-u+(d-p)),e.copy(s).addScaledVector(au,o);let m=1/(x+T+h);return a=T*m,o=h*m,e.copy(i).addScaledVector(cs,a).addScaledVector(hs,o)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}},xi=class{constructor(t=new nt(1/0,1/0,1/0),e=new nt(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=e}set(t,e){return this.min.copy(t),this.max.copy(e),this}setFromArray(t){this.makeEmpty();for(let e=0,i=t.length;e<i;e+=3)this.expandByPoint(An.fromArray(t,e));return this}setFromBufferAttribute(t){this.makeEmpty();for(let e=0,i=t.count;e<i;e++)this.expandByPoint(An.fromBufferAttribute(t,e));return this}setFromPoints(t){this.makeEmpty();for(let e=0,i=t.length;e<i;e++)this.expandByPoint(t[e]);return this}setFromCenterAndSize(t,e){let i=An.copy(e).multiplyScalar(.5);return this.min.copy(t).sub(i),this.max.copy(t).add(i),this}setFromObject(t,e=!1){return this.makeEmpty(),this.expandByObject(t,e)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,e=!1){t.updateWorldMatrix(!1,!1);let i=t.geometry;if(i!==void 0){let r=i.getAttribute("position");if(e===!0&&r!==void 0&&t.isInstancedMesh!==!0&&t.isBatchedMesh!==!0)for(let a=0,o=r.count;a<o;a++)t.isMesh===!0?t.getVertexPosition(a,An):An.fromBufferAttribute(r,a),An.applyMatrix4(t.matrixWorld),this.expandByPoint(An);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),Xr.copy(t.boundingBox)):(i.boundingBox===null&&i.computeBoundingBox(),Xr.copy(i.boundingBox)),Xr.applyMatrix4(t.matrixWorld),this.union(Xr)}let s=t.children;for(let r=0,a=s.length;r<a;r++)this.expandByObject(s[r],e);return this}containsPoint(t){return t.x>=this.min.x&&t.x<=this.max.x&&t.y>=this.min.y&&t.y<=this.max.y&&t.z>=this.min.z&&t.z<=this.max.z}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,e){return e.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return t.max.x>=this.min.x&&t.min.x<=this.max.x&&t.max.y>=this.min.y&&t.min.y<=this.max.y&&t.max.z>=this.min.z&&t.min.z<=this.max.z}intersectsSphere(t){return this.clampPoint(t.center,An),An.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let e,i;return t.normal.x>0?(e=t.normal.x*this.min.x,i=t.normal.x*this.max.x):(e=t.normal.x*this.max.x,i=t.normal.x*this.min.x),t.normal.y>0?(e+=t.normal.y*this.min.y,i+=t.normal.y*this.max.y):(e+=t.normal.y*this.max.y,i+=t.normal.y*this.min.y),t.normal.z>0?(e+=t.normal.z*this.min.z,i+=t.normal.z*this.max.z):(e+=t.normal.z*this.max.z,i+=t.normal.z*this.min.z),e<=-t.constant&&i>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(Ks),Yr.subVectors(this.max,Ks),us.subVectors(t.a,Ks),ds.subVectors(t.b,Ks),fs.subVectors(t.c,Ks),fi.subVectors(ds,us),pi.subVectors(fs,ds),Bi.subVectors(us,fs);let e=[0,-fi.z,fi.y,0,-pi.z,pi.y,0,-Bi.z,Bi.y,fi.z,0,-fi.x,pi.z,0,-pi.x,Bi.z,0,-Bi.x,-fi.y,fi.x,0,-pi.y,pi.x,0,-Bi.y,Bi.x,0];return!Xl(e,us,ds,fs,Yr)||(e=[1,0,0,0,1,0,0,0,1],!Xl(e,us,ds,fs,Yr))?!1:($r.crossVectors(fi,pi),e=[$r.x,$r.y,$r.z],Xl(e,us,ds,fs,Yr))}clampPoint(t,e){return e.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,An).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(An).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(Qn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),Qn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),Qn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),Qn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),Qn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),Qn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),Qn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),Qn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(Qn),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(t){return this.min.fromArray(t.min),this.max.fromArray(t.max),this}},Qn=[new nt,new nt,new nt,new nt,new nt,new nt,new nt,new nt],An=new nt,Xr=new xi,us=new nt,ds=new nt,fs=new nt,fi=new nt,pi=new nt,Bi=new nt,Ks=new nt,Yr=new nt,$r=new nt,zi=new nt;function Xl(n,t,e,i,s){for(let r=0,a=n.length-3;r<=a;r+=3){zi.fromArray(n,r);let o=s.x*Math.abs(zi.x)+s.y*Math.abs(zi.y)+s.z*Math.abs(zi.z),l=t.dot(zi),c=e.dot(zi),u=i.dot(zi);if(Math.max(-Math.max(l,c,u),Math.min(l,c,u))>o)return!1}return!0}var be=new nt,Zr=new Qt,sp=0,zn=class extends Gn{constructor(t,e,i=!1){if(super(),Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:sp++}),this.name="",this.array=t,this.itemSize=e,this.count=t!==void 0?t.length/e:0,this.normalized=i,this.usage=Qu,this.updateRanges=[],this.gpuType=Pn,this.version=0,this._normalizationScale=t!==void 0?Dc(t):void 0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this._normalizationScale=t._normalizationScale,this}copyAt(t,e,i){t*=this.itemSize,i*=e.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[t+s]=e.array[i+s];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let e=0,i=this.count;e<i;e++)Zr.fromBufferAttribute(this,e),Zr.applyMatrix3(t),this.setXY(e,Zr.x,Zr.y);else if(this.itemSize===3)for(let e=0,i=this.count;e<i;e++)be.fromBufferAttribute(this,e),be.applyMatrix3(t),this.setXYZ(e,be.x,be.y,be.z);return this}applyMatrix4(t){for(let e=0,i=this.count;e<i;e++)be.fromBufferAttribute(this,e),be.applyMatrix4(t),this.setXYZ(e,be.x,be.y,be.z);return this}applyNormalMatrix(t){for(let e=0,i=this.count;e<i;e++)be.fromBufferAttribute(this,e),be.applyNormalMatrix(t),this.setXYZ(e,be.x,be.y,be.z);return this}transformDirection(t){for(let e=0,i=this.count;e<i;e++)be.fromBufferAttribute(this,e),be.transformDirection(t),this.setXYZ(e,be.x,be.y,be.z);return this}set(t,e=0){return this.array.set(t,e),this}getComponent(t,e){let i=this.array[t*this.itemSize+e];return this.normalized&&(i=this._denormalize(i)),i}setComponent(t,e,i){return this.normalized&&(i=this._normalize(i)),this.array[t*this.itemSize+e]=i,this}getX(t){let e=this.array[t*this.itemSize];return this.normalized&&(e=this._denormalize(e)),e}setX(t,e){return this.normalized&&(e=this._normalize(e)),this.array[t*this.itemSize]=e,this}getY(t){let e=this.array[t*this.itemSize+1];return this.normalized&&(e=this._denormalize(e)),e}setY(t,e){return this.normalized&&(e=this._normalize(e)),this.array[t*this.itemSize+1]=e,this}getZ(t){let e=this.array[t*this.itemSize+2];return this.normalized&&(e=this._denormalize(e)),e}setZ(t,e){return this.normalized&&(e=this._normalize(e)),this.array[t*this.itemSize+2]=e,this}getW(t){let e=this.array[t*this.itemSize+3];return this.normalized&&(e=this._denormalize(e)),e}setW(t,e){return this.normalized&&(e=this._normalize(e)),this.array[t*this.itemSize+3]=e,this}setXY(t,e,i){return t*=this.itemSize,this.normalized&&(e=this._normalize(e),i=this._normalize(i)),this.array[t+0]=e,this.array[t+1]=i,this}setXYZ(t,e,i,s){return t*=this.itemSize,this.normalized&&(e=this._normalize(e),i=this._normalize(i),s=this._normalize(s)),this.array[t+0]=e,this.array[t+1]=i,this.array[t+2]=s,this}setXYZW(t,e,i,s,r){return t*=this.itemSize,this.normalized&&(e=this._normalize(e),i=this._normalize(i),s=this._normalize(s),r=this._normalize(r)),this.array[t+0]=e,this.array[t+1]=i,this.array[t+2]=s,this.array[t+3]=r,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return t.name=this.name,t.usage=this.usage,t.gpuType=this.gpuType,t}dispose(){this.dispatchEvent({type:"dispose"})}_denormalize(t){let e=this._normalizationScale;return e!==void 0?Math.max(t/e,-1):Xf(t,this.array)}_normalize(t){let e=this._normalizationScale;return e!==void 0?Math.round(t*e):Yf(t,this.array)}};var rr=class extends zn{constructor(t,e,i){super(new Uint16Array(t),e,i)}};var ar=class extends zn{constructor(t,e,i){super(new Uint32Array(t),e,i)}};var _n=class extends zn{constructor(t,e,i){super(new Float32Array(t),e,i)}},rp=new xi,Js=new nt,Yl=new nt,As=class{constructor(t=new nt,e=-1){this.isSphere=!0,this.center=t,this.radius=e}set(t,e){return this.center.copy(t),this.radius=e,this}setFromPoints(t,e){let i=this.center;e!==void 0?i.copy(e):rp.setFromPoints(t).getCenter(i);let s=0;for(let r=0,a=t.length;r<a;r++)s=Math.max(s,i.distanceToSquared(t[r]));return this.radius=Math.sqrt(s),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){let e=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=e*e}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,e){let i=this.center.distanceToSquared(t);return e.copy(t),i>this.radius*this.radius&&(e.sub(this.center).normalize(),e.multiplyScalar(this.radius).add(this.center)),e}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;Js.subVectors(t,this.center);let e=Js.lengthSq();if(e>this.radius*this.radius){let i=Math.sqrt(e),s=(i-this.radius)*.5;this.center.addScaledVector(Js,s/i),this.radius+=s}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(Yl.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(Js.copy(t.center).add(Yl)),this.expandByPoint(Js.copy(t.center).sub(Yl))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(t){return this.radius=t.radius,this.center.fromArray(t.center),this}},ap=0,xn=new de,$l=new $e,ps=new nt,on=new xi,Qs=new xi,Pe=new nt,yi=class n extends Gn{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:ap++}),this.uuid=Er(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={},this._transformed=!1}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(Hf(t)?ar:rr)(t,1):this.index=t,this}setIndirect(t,e=0){return this.indirect=t,this.indirectOffset=e,this}getIndirect(){return this.indirect}getAttribute(t){return this.attributes[t]}setAttribute(t,e){return this.attributes[t]=e,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,e,i=0){this.groups.push({start:t,count:e,materialIndex:i})}clearGroups(){this.groups=[]}setDrawRange(t,e){this.drawRange.start=t,this.drawRange.count=e}applyMatrix4(t){let e=this.attributes.position;e!==void 0&&(e.applyMatrix4(t),e.needsUpdate=!0);let i=this.attributes.normal;if(i!==void 0){let r=new Ht().getNormalMatrix(t);i.applyNormalMatrix(r),i.needsUpdate=!0}let s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(t),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this._transformed=!0,this}applyQuaternion(t){return xn.makeRotationFromQuaternion(t),this.applyMatrix4(xn),this}rotateX(t){return xn.makeRotationX(t),this.applyMatrix4(xn),this}rotateY(t){return xn.makeRotationY(t),this.applyMatrix4(xn),this}rotateZ(t){return xn.makeRotationZ(t),this.applyMatrix4(xn),this}translate(t,e,i){return xn.makeTranslation(t,e,i),this.applyMatrix4(xn),this}scale(t,e,i){return xn.makeScale(t,e,i),this.applyMatrix4(xn),this}lookAt(t){return $l.lookAt(t),$l.updateMatrix(),this.applyMatrix4($l.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(ps).negate(),this.translate(ps.x,ps.y,ps.z),this}setFromPoints(t){let e=this.getAttribute("position");if(e===void 0){let i=[];for(let s=0,r=t.length;s<r;s++){let a=t[s];i.push(a.x,a.y,a.z||0)}this.setAttribute("position",new _n(i,3))}else{let i=Math.min(t.length,e.count);for(let s=0;s<i;s++){let r=t[s];e.setXYZ(s,r.x,r.y,r.z||0)}t.length>e.count&&Gt("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),e.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new xi);let t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){Vt("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new nt(-1/0,-1/0,-1/0),new nt(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),e)for(let i=0,s=e.length;i<s;i++){let r=e[i];on.setFromBufferAttribute(r),this.morphTargetsRelative?(Pe.addVectors(this.boundingBox.min,on.min),this.boundingBox.expandByPoint(Pe),Pe.addVectors(this.boundingBox.max,on.max),this.boundingBox.expandByPoint(Pe)):(this.boundingBox.expandByPoint(on.min),this.boundingBox.expandByPoint(on.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&Vt('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new As);let t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){Vt("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new nt,1/0);return}if(t){let i=this.boundingSphere.center;if(on.setFromBufferAttribute(t),e)for(let r=0,a=e.length;r<a;r++){let o=e[r];Qs.setFromBufferAttribute(o),this.morphTargetsRelative?(Pe.addVectors(on.min,Qs.min),on.expandByPoint(Pe),Pe.addVectors(on.max,Qs.max),on.expandByPoint(Pe)):(on.expandByPoint(Qs.min),on.expandByPoint(Qs.max))}on.getCenter(i);let s=0;for(let r=0,a=t.count;r<a;r++)Pe.fromBufferAttribute(t,r),s=Math.max(s,i.distanceToSquared(Pe));if(e)for(let r=0,a=e.length;r<a;r++){let o=e[r],l=this.morphTargetsRelative;for(let c=0,u=o.count;c<u;c++)Pe.fromBufferAttribute(o,c),l&&(ps.fromBufferAttribute(t,c),Pe.add(ps)),s=Math.max(s,i.distanceToSquared(Pe))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&Vt('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){let t=this.index,e=this.attributes;if(t===null||e.position===void 0||e.normal===void 0||e.uv===void 0){Vt("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}let i=e.position,s=e.normal,r=e.uv,a=this.getAttribute("tangent");(a===void 0||a.count!==i.count)&&(a=new zn(new Float32Array(4*i.count),4),this.setAttribute("tangent",a));let o=[],l=[],c=new Uint8Array(i.count);for(let U=0;U<i.count;U++)o[U]=new nt,l[U]=new nt;let u=new nt,f=new nt,h=new nt,d=new Qt,p=new Qt,T=new Qt,x=new nt,m=new nt;function M(U,C,F){c[U]=c[C]=c[F]=1,u.fromBufferAttribute(i,U),f.fromBufferAttribute(i,C),h.fromBufferAttribute(i,F),d.fromBufferAttribute(r,U),p.fromBufferAttribute(r,C),T.fromBufferAttribute(r,F),f.sub(u),h.sub(u),p.sub(d),T.sub(d);let E=1/(p.x*T.y-T.x*p.y);isFinite(E)&&(x.copy(f).multiplyScalar(T.y).addScaledVector(h,-p.y).multiplyScalar(E),m.copy(h).multiplyScalar(p.x).addScaledVector(f,-T.x).multiplyScalar(E),o[U].add(x),o[C].add(x),o[F].add(x),l[U].add(m),l[C].add(m),l[F].add(m))}let y=this.groups;y.length===0&&(y=[{start:0,count:t.count}]);for(let U=0,C=y.length;U<C;++U){let F=y[U],E=F.start,O=F.count;for(let D=E,R=E+O;D<R;D+=3)M(t.getX(D+0),t.getX(D+1),t.getX(D+2))}let w=new nt,I=new nt,L=new nt,g=new nt;function _(U){L.fromBufferAttribute(s,U),g.copy(L);let C=o[U];w.copy(C),w.sub(L.multiplyScalar(L.dot(C))).normalize(),I.crossVectors(g,C);let E=I.dot(l[U])<0?-1:1;a.setXYZW(U,w.x,w.y,w.z,E)}for(let U=0,C=i.count;U<C;++U)c[U]&&_(U);this._transformed=!0}computeVertexNormals(){let t=this.index,e=this.getAttribute("position");if(e!==void 0){let i=this.getAttribute("normal");if(i===void 0||i.count!==e.count)i=new zn(new Float32Array(e.count*3),3),this.setAttribute("normal",i);else for(let h=0,d=i.count;h<d;h++)i.setXYZ(h,0,0,0);let s=new nt,r=new nt,a=new nt,o=new nt,l=new nt,c=new nt,u=new nt,f=new nt;if(t)for(let h=0,d=t.count;h<d;h+=3){let p=t.getX(h+0),T=t.getX(h+1),x=t.getX(h+2);s.fromBufferAttribute(e,p),r.fromBufferAttribute(e,T),a.fromBufferAttribute(e,x),u.subVectors(a,r),f.subVectors(s,r),u.cross(f),o.fromBufferAttribute(i,p),l.fromBufferAttribute(i,T),c.fromBufferAttribute(i,x),o.add(u),l.add(u),c.add(u),i.setXYZ(p,o.x,o.y,o.z),i.setXYZ(T,l.x,l.y,l.z),i.setXYZ(x,c.x,c.y,c.z)}else for(let h=0,d=e.count;h<d;h+=3)s.fromBufferAttribute(e,h+0),r.fromBufferAttribute(e,h+1),a.fromBufferAttribute(e,h+2),u.subVectors(a,r),f.subVectors(s,r),u.cross(f),i.setXYZ(h+0,u.x,u.y,u.z),i.setXYZ(h+1,u.x,u.y,u.z),i.setXYZ(h+2,u.x,u.y,u.z);this.normalizeNormals(),i.needsUpdate=!0}}normalizeNormals(){let t=this.attributes.normal;for(let e=0,i=t.count;e<i;e++)Pe.fromBufferAttribute(t,e),Pe.normalize(),t.setXYZ(e,Pe.x,Pe.y,Pe.z)}toNonIndexed(){function t(o,l){let c=o.array,u=o.itemSize,f=o.normalized,h=new c.constructor(l.length*u),d=0,p=0;for(let T=0,x=l.length;T<x;T++){o.isInterleavedBufferAttribute?d=l[T]*o.data.stride+o.offset:d=l[T]*u;for(let m=0;m<u;m++)h[p++]=c[d++]}return new zn(h,u,f)}if(this.index===null)return Gt("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;let e=new n,i=this.index.array,s=this.attributes;for(let o in s){let l=s[o],c=t(l,i);e.setAttribute(o,c)}let r=this.morphAttributes;for(let o in r){let l=[],c=r[o];for(let u=0,f=c.length;u<f;u++){let h=c[u],d=t(h,i);l.push(d)}e.morphAttributes[o]=l}e.morphTargetsRelative=this.morphTargetsRelative;let a=this.groups;for(let o=0,l=a.length;o<l;o++){let c=a[o];e.addGroup(c.start,c.count,c.materialIndex)}return e}toJSON(){let t={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.parameters!==void 0&&this._transformed===!0?"BufferGeometry":this.type,t.name=this.name,Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0&&this._transformed!==!0){let l=this.parameters;for(let c in l)l[c]!==void 0&&(t[c]=l[c]);return t}t.data={attributes:{}};let e=this.index;e!==null&&(t.data.index={type:e.array.constructor.name,array:Array.prototype.slice.call(e.array)});let i=this.attributes;for(let l in i){let c=i[l];t.data.attributes[l]=c.toJSON(t.data)}let s={},r=!1;for(let l in this.morphAttributes){let c=this.morphAttributes[l],u=[];for(let f=0,h=c.length;f<h;f++){let d=c[f];u.push(d.toJSON(t.data))}u.length>0&&(s[l]=u,r=!0)}r&&(t.data.morphAttributes=s,t.data.morphTargetsRelative=this.morphTargetsRelative);let a=this.groups;a.length>0&&(t.data.groups=JSON.parse(JSON.stringify(a)));let o=this.boundingSphere;return o!==null&&(t.data.boundingSphere=o.toJSON()),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let e={};this.name=t.name;let i=t.index;i!==null&&this.setIndex(i.clone());let s=t.attributes;for(let c in s){let u=s[c];this.setAttribute(c,u.clone(e))}let r=t.morphAttributes;for(let c in r){let u=[],f=r[c];for(let h=0,d=f.length;h<d;h++)u.push(f[h].clone(e));this.morphAttributes[c]=u}this.morphTargetsRelative=t.morphTargetsRelative;let a=t.groups;for(let c=0,u=a.length;c<u;c++){let f=a[c];this.addGroup(f.start,f.count,f.materialIndex)}let o=t.boundingBox;o!==null&&(this.boundingBox=o.clone());let l=t.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this._transformed=t._transformed,this}dispose(){this.dispatchEvent({type:"dispose"})}};var Zl=new nt,op=new nt,lp=new Ht,Cn=class{constructor(t=new nt(1,0,0),e=0){this.isPlane=!0,this.normal=t,this.constant=e}set(t,e){return this.normal.copy(t),this.constant=e,this}setComponents(t,e,i,s){return this.normal.set(t,e,i),this.constant=s,this}setFromNormalAndCoplanarPoint(t,e){return this.normal.copy(t),this.constant=-e.dot(this.normal),this}setFromCoplanarPoints(t,e,i){let s=Zl.subVectors(i,e).cross(op.subVectors(t,e)).normalize();return this.setFromNormalAndCoplanarPoint(s,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){let t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,e){return e.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,e,i=!0){let s=t.delta(Zl),r=this.normal.dot(s);if(r===0)return this.distanceToPoint(t.start)===0?e.copy(t.start):null;let a=-(t.start.dot(this.normal)+this.constant)/r;return i===!0&&(a<0||a>1)?null:e.copy(t.start).addScaledVector(s,a)}intersectsLine(t){let e=this.distanceToPoint(t.start),i=this.distanceToPoint(t.end);return e<0&&i>0||i<0&&e>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,e){let i=e||lp.getNormalMatrix(t),s=this.coplanarPoint(Zl).applyMatrix4(t),r=this.normal.applyMatrix3(i).normalize();return this.constant=-s.dot(r),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}toJSON(){return{normal:this.normal.toArray(),constant:this.constant}}fromJSON(t){return this.normal.fromArray(t.normal),this.constant=t.constant,this}},cp=0,_i=class extends Gn{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:cp++}),this.uuid=Er(),this.name="",this.type="Material",this.blending=Ps,this.side=Ei,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=uc,this.blendDst=dc,this.blendEquation=Xi,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Zt(0,0,0),this.blendAlpha=0,this.depthFunc=_s,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Xu,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=ha,this.stencilZFail=ha,this.stencilZPass=ha,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(let e in t){let i=t[e];if(i===void 0){Gt(`Material: parameter '${e}' has value of undefined.`);continue}let s=this[e];if(s===void 0){Gt(`Material: '${e}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(i):s&&s.isVector2&&i&&i.isVector2||s&&s.isEuler&&i&&i.isEuler||s&&s.isVector3&&i&&i.isVector3?s.copy(i):this[e]=i}}toJSON(t){let e=t===void 0||typeof t=="string";e&&(t={textures:{},images:{}});let i={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};i.uuid=this.uuid,i.type=this.type,i.blending=this.blending,i.side=this.side,i.shadowSide=this.shadowSide,i.vertexColors=this.vertexColors,i.opacity=this.opacity,i.transparent=this.transparent,i.blendSrc=this.blendSrc,i.blendDst=this.blendDst,i.blendEquation=this.blendEquation,i.blendSrcAlpha=this.blendSrcAlpha,i.blendDstAlpha=this.blendDstAlpha,i.blendEquationAlpha=this.blendEquationAlpha,i.blendColor=this.blendColor.getHex(),i.blendAlpha=this.blendAlpha,i.depthFunc=this.depthFunc,i.depthTest=this.depthTest,i.depthWrite=this.depthWrite,i.colorWrite=this.colorWrite,i.clipIntersection=this.clipIntersection,i.clipShadows=this.clipShadows,i.stencilWriteMask=this.stencilWriteMask,i.stencilFunc=this.stencilFunc,i.stencilRef=this.stencilRef,i.stencilFuncMask=this.stencilFuncMask,i.stencilFail=this.stencilFail,i.stencilZFail=this.stencilZFail,i.stencilZPass=this.stencilZPass,i.stencilWrite=this.stencilWrite,i.polygonOffset=this.polygonOffset,i.polygonOffsetFactor=this.polygonOffsetFactor,i.polygonOffsetUnits=this.polygonOffsetUnits,i.dithering=this.dithering,i.alphaTest=this.alphaTest,i.alphaHash=this.alphaHash,i.alphaToCoverage=this.alphaToCoverage,i.premultipliedAlpha=this.premultipliedAlpha,i.forceSinglePass=this.forceSinglePass,i.allowOverride=this.allowOverride,i.visible=this.visible,i.toneMapped=this.toneMapped,i.name=this.name,this.color&&this.color.isColor&&(i.color=this.color.getHex()),this.roughness!==void 0&&(i.roughness=this.roughness),this.metalness!==void 0&&(i.metalness=this.metalness),this.sheen!==void 0&&(i.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(i.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(i.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(i.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&(i.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(i.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(i.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(i.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(i.shininess=this.shininess),this.clearcoat!==void 0&&(i.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(i.clearcoatRoughness=this.clearcoatRoughness),this.diffuseRoughness!==void 0&&(i.diffuseRoughness=this.diffuseRoughness),this.diffuseRoughnessMap&&this.diffuseRoughnessMap.isTexture&&(i.diffuseRoughnessMap=this.diffuseRoughnessMap.toJSON(t).uuid),this.clearcoatMap&&this.clearcoatMap.isTexture&&(i.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(i.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(i.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,i.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(i.sheenColorMap=this.sheenColorMap.toJSON(t).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(i.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(t).uuid),this.dispersion!==void 0&&(i.dispersion=this.dispersion),this.retroreflectivity!==void 0&&(i.retroreflectivity=this.retroreflectivity),this.iridescence!==void 0&&(i.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(i.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessMinimum!==void 0&&(i.iridescenceThicknessMinimum=this.iridescenceThicknessMinimum),this.iridescenceThicknessMaximum!==void 0&&(i.iridescenceThicknessMaximum=this.iridescenceThicknessMaximum),this.iridescenceMap&&this.iridescenceMap.isTexture&&(i.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(i.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(i.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(i.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(i.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(i.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(i.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(i.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(i.lightMap=this.lightMap.toJSON(t).uuid,i.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(i.aoMap=this.aoMap.toJSON(t).uuid,i.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(i.bumpMap=this.bumpMap.toJSON(t).uuid,i.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(i.normalMap=this.normalMap.toJSON(t).uuid,i.normalMapType=this.normalMapType,i.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(i.displacementMap=this.displacementMap.toJSON(t).uuid,i.displacementScale=this.displacementScale,i.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(i.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(i.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(i.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(i.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(i.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(i.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(i.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(i.combine=this.combine)),this.envMapRotation!==void 0&&(i.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(i.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(i.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(i.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(i.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(i.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(i.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(i.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(i.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&(i.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(i.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(i.size=this.size),this.sizeAttenuation!==void 0&&(i.sizeAttenuation=this.sizeAttenuation),Array.isArray(this.clippingPlanes)&&this.clippingPlanes.length>0&&(i.clippingPlanes=this.clippingPlanes.map(r=>r.toJSON())),this.rotation!==void 0&&(i.rotation=this.rotation),this.depthPacking!==void 0&&(i.depthPacking=this.depthPacking),this.linewidth!==void 0&&(i.linewidth=this.linewidth),this.linecap!==void 0&&(i.linecap=this.linecap),this.linejoin!==void 0&&(i.linejoin=this.linejoin),this.dashSize!==void 0&&(i.dashSize=this.dashSize),this.gapSize!==void 0&&(i.gapSize=this.gapSize),this.scale!==void 0&&(i.scale=this.scale),this.wireframe!==void 0&&(i.wireframe=this.wireframe),this.wireframeLinewidth!==void 0&&(i.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!==void 0&&(i.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!==void 0&&(i.wireframeLinejoin=this.wireframeLinejoin),this.flatShading!==void 0&&(i.flatShading=this.flatShading),this.fog!==void 0&&(i.fog=this.fog),Object.keys(this.userData).length>0&&(i.userData=this.userData);function s(r){let a=[];for(let o in r){let l=r[o];delete l.metadata,a.push(l)}return a}if(e){let r=s(t.textures),a=s(t.images);r.length>0&&(i.textures=r),a.length>0&&(i.images=a)}return i}fromJSON(t,e){if(t.uuid!==void 0&&(this.uuid=t.uuid),t.name!==void 0&&(this.name=t.name),t.color!==void 0&&this.color!==void 0&&this.color.setHex(t.color),t.roughness!==void 0&&(this.roughness=t.roughness),t.metalness!==void 0&&(this.metalness=t.metalness),t.sheen!==void 0&&(this.sheen=t.sheen),t.sheenColor!==void 0&&(this.sheenColor=new Zt().setHex(t.sheenColor)),t.sheenRoughness!==void 0&&(this.sheenRoughness=t.sheenRoughness),t.emissive!==void 0&&this.emissive!==void 0&&this.emissive.setHex(t.emissive),t.specular!==void 0&&this.specular!==void 0&&this.specular.setHex(t.specular),t.specularIntensity!==void 0&&(this.specularIntensity=t.specularIntensity),t.specularColor!==void 0&&this.specularColor!==void 0&&this.specularColor.setHex(t.specularColor),t.shininess!==void 0&&(this.shininess=t.shininess),t.clearcoat!==void 0&&(this.clearcoat=t.clearcoat),t.clearcoatRoughness!==void 0&&(this.clearcoatRoughness=t.clearcoatRoughness),t.diffuseRoughness!==void 0&&(this.diffuseRoughness=t.diffuseRoughness),t.dispersion!==void 0&&(this.dispersion=t.dispersion),t.retroreflectivity!==void 0&&(this.retroreflectivity=t.retroreflectivity),t.iridescence!==void 0&&(this.iridescence=t.iridescence),t.iridescenceIOR!==void 0&&(this.iridescenceIOR=t.iridescenceIOR),t.iridescenceThicknessMinimum!==void 0&&(this.iridescenceThicknessMinimum=t.iridescenceThicknessMinimum),t.iridescenceThicknessMaximum!==void 0&&(this.iridescenceThicknessMaximum=t.iridescenceThicknessMaximum),t.iridescenceThicknessRange!==void 0&&(this.iridescenceThicknessMinimum=t.iridescenceThicknessRange[0],this.iridescenceThicknessMaximum=t.iridescenceThicknessRange[1]),t.transmission!==void 0&&(this.transmission=t.transmission),t.thickness!==void 0&&(this.thickness=t.thickness),t.attenuationDistance!==void 0&&(this.attenuationDistance=t.attenuationDistance),t.attenuationColor!==void 0&&this.attenuationColor!==void 0&&this.attenuationColor.setHex(t.attenuationColor),t.anisotropy!==void 0&&(this.anisotropy=t.anisotropy),t.anisotropyRotation!==void 0&&(this.anisotropyRotation=t.anisotropyRotation),t.fog!==void 0&&(this.fog=t.fog),t.flatShading!==void 0&&(this.flatShading=t.flatShading),t.blending!==void 0&&(this.blending=t.blending),t.combine!==void 0&&(this.combine=t.combine),t.side!==void 0&&(this.side=t.side),t.shadowSide!==void 0&&(this.shadowSide=t.shadowSide),t.opacity!==void 0&&(this.opacity=t.opacity),t.transparent!==void 0&&(this.transparent=t.transparent),t.alphaTest!==void 0&&(this.alphaTest=t.alphaTest),t.alphaHash!==void 0&&(this.alphaHash=t.alphaHash),t.depthFunc!==void 0&&(this.depthFunc=t.depthFunc),t.depthTest!==void 0&&(this.depthTest=t.depthTest),t.depthWrite!==void 0&&(this.depthWrite=t.depthWrite),t.colorWrite!==void 0&&(this.colorWrite=t.colorWrite),t.clippingPlanes!==void 0&&(this.clippingPlanes=t.clippingPlanes.map(i=>new Cn().fromJSON(i))),t.clipIntersection!==void 0&&(this.clipIntersection=t.clipIntersection),t.clipShadows!==void 0&&(this.clipShadows=t.clipShadows),t.depthPacking!==void 0&&(this.depthPacking=t.depthPacking),t.blendSrc!==void 0&&(this.blendSrc=t.blendSrc),t.blendDst!==void 0&&(this.blendDst=t.blendDst),t.blendEquation!==void 0&&(this.blendEquation=t.blendEquation),t.blendSrcAlpha!==void 0&&(this.blendSrcAlpha=t.blendSrcAlpha),t.blendDstAlpha!==void 0&&(this.blendDstAlpha=t.blendDstAlpha),t.blendEquationAlpha!==void 0&&(this.blendEquationAlpha=t.blendEquationAlpha),t.blendColor!==void 0&&this.blendColor!==void 0&&this.blendColor.setHex(t.blendColor),t.blendAlpha!==void 0&&(this.blendAlpha=t.blendAlpha),t.stencilWriteMask!==void 0&&(this.stencilWriteMask=t.stencilWriteMask),t.stencilFunc!==void 0&&(this.stencilFunc=t.stencilFunc),t.stencilRef!==void 0&&(this.stencilRef=t.stencilRef),t.stencilFuncMask!==void 0&&(this.stencilFuncMask=t.stencilFuncMask),t.stencilFail!==void 0&&(this.stencilFail=t.stencilFail),t.stencilZFail!==void 0&&(this.stencilZFail=t.stencilZFail),t.stencilZPass!==void 0&&(this.stencilZPass=t.stencilZPass),t.stencilWrite!==void 0&&(this.stencilWrite=t.stencilWrite),t.wireframe!==void 0&&(this.wireframe=t.wireframe),t.wireframeLinewidth!==void 0&&(this.wireframeLinewidth=t.wireframeLinewidth),t.wireframeLinecap!==void 0&&(this.wireframeLinecap=t.wireframeLinecap),t.wireframeLinejoin!==void 0&&(this.wireframeLinejoin=t.wireframeLinejoin),t.rotation!==void 0&&(this.rotation=t.rotation),t.linewidth!==void 0&&(this.linewidth=t.linewidth),t.linecap!==void 0&&(this.linecap=t.linecap),t.linejoin!==void 0&&(this.linejoin=t.linejoin),t.dashSize!==void 0&&(this.dashSize=t.dashSize),t.gapSize!==void 0&&(this.gapSize=t.gapSize),t.scale!==void 0&&(this.scale=t.scale),t.polygonOffset!==void 0&&(this.polygonOffset=t.polygonOffset),t.polygonOffsetFactor!==void 0&&(this.polygonOffsetFactor=t.polygonOffsetFactor),t.polygonOffsetUnits!==void 0&&(this.polygonOffsetUnits=t.polygonOffsetUnits),t.dithering!==void 0&&(this.dithering=t.dithering),t.alphaToCoverage!==void 0&&(this.alphaToCoverage=t.alphaToCoverage),t.premultipliedAlpha!==void 0&&(this.premultipliedAlpha=t.premultipliedAlpha),t.forceSinglePass!==void 0&&(this.forceSinglePass=t.forceSinglePass),t.allowOverride!==void 0&&(this.allowOverride=t.allowOverride),t.visible!==void 0&&(this.visible=t.visible),t.toneMapped!==void 0&&(this.toneMapped=t.toneMapped),t.userData!==void 0&&(this.userData=t.userData),t.vertexColors!==void 0&&(typeof t.vertexColors=="number"?this.vertexColors=t.vertexColors>0:this.vertexColors=t.vertexColors),t.size!==void 0&&(this.size=t.size),t.sizeAttenuation!==void 0&&(this.sizeAttenuation=t.sizeAttenuation),t.map!==void 0&&(this.map=e[t.map]||null),t.matcap!==void 0&&(this.matcap=e[t.matcap]||null),t.alphaMap!==void 0&&(this.alphaMap=e[t.alphaMap]||null),t.bumpMap!==void 0&&(this.bumpMap=e[t.bumpMap]||null),t.bumpScale!==void 0&&(this.bumpScale=t.bumpScale),t.normalMap!==void 0&&(this.normalMap=e[t.normalMap]||null),t.normalMapType!==void 0&&(this.normalMapType=t.normalMapType),t.normalScale!==void 0){let i=t.normalScale;Array.isArray(i)===!1&&(i=[i,i]),this.normalScale=new Qt().fromArray(i)}return t.displacementMap!==void 0&&(this.displacementMap=e[t.displacementMap]||null),t.displacementScale!==void 0&&(this.displacementScale=t.displacementScale),t.displacementBias!==void 0&&(this.displacementBias=t.displacementBias),t.roughnessMap!==void 0&&(this.roughnessMap=e[t.roughnessMap]||null),t.metalnessMap!==void 0&&(this.metalnessMap=e[t.metalnessMap]||null),t.emissiveMap!==void 0&&(this.emissiveMap=e[t.emissiveMap]||null),t.emissiveIntensity!==void 0&&(this.emissiveIntensity=t.emissiveIntensity),t.specularMap!==void 0&&(this.specularMap=e[t.specularMap]||null),t.specularIntensityMap!==void 0&&(this.specularIntensityMap=e[t.specularIntensityMap]||null),t.specularColorMap!==void 0&&(this.specularColorMap=e[t.specularColorMap]||null),t.envMap!==void 0&&(this.envMap=e[t.envMap]||null),t.envMapRotation!==void 0&&this.envMapRotation.fromArray(t.envMapRotation),t.envMapIntensity!==void 0&&(this.envMapIntensity=t.envMapIntensity),t.reflectivity!==void 0&&(this.reflectivity=t.reflectivity),t.refractionRatio!==void 0&&(this.refractionRatio=t.refractionRatio),t.lightMap!==void 0&&(this.lightMap=e[t.lightMap]||null),t.lightMapIntensity!==void 0&&(this.lightMapIntensity=t.lightMapIntensity),t.aoMap!==void 0&&(this.aoMap=e[t.aoMap]||null),t.aoMapIntensity!==void 0&&(this.aoMapIntensity=t.aoMapIntensity),t.gradientMap!==void 0&&(this.gradientMap=e[t.gradientMap]||null),t.clearcoatMap!==void 0&&(this.clearcoatMap=e[t.clearcoatMap]||null),t.clearcoatRoughnessMap!==void 0&&(this.clearcoatRoughnessMap=e[t.clearcoatRoughnessMap]||null),t.clearcoatNormalMap!==void 0&&(this.clearcoatNormalMap=e[t.clearcoatNormalMap]||null),t.clearcoatNormalScale!==void 0&&(this.clearcoatNormalScale=new Qt().fromArray(t.clearcoatNormalScale)),t.diffuseRoughnessMap!==void 0&&(this.diffuseRoughnessMap=e[t.diffuseRoughnessMap]||null),t.iridescenceMap!==void 0&&(this.iridescenceMap=e[t.iridescenceMap]||null),t.iridescenceThicknessMap!==void 0&&(this.iridescenceThicknessMap=e[t.iridescenceThicknessMap]||null),t.transmissionMap!==void 0&&(this.transmissionMap=e[t.transmissionMap]||null),t.thicknessMap!==void 0&&(this.thicknessMap=e[t.thicknessMap]||null),t.anisotropyMap!==void 0&&(this.anisotropyMap=e[t.anisotropyMap]||null),t.sheenColorMap!==void 0&&(this.sheenColorMap=e[t.sheenColorMap]||null),t.sheenRoughnessMap!==void 0&&(this.sheenRoughnessMap=e[t.sheenRoughnessMap]||null),this}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;let e=t.clippingPlanes,i=null;if(e!==null){let s=e.length;i=new Array(s);for(let r=0;r!==s;++r)i[r]=e[r].clone()}return this.clippingPlanes=i,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.allowOverride=t.allowOverride,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}};var jn=new nt,Kl=new nt,Kr=new nt,Jr=new nt,or=class{constructor(t=new nt,e=new nt(0,0,-1)){this.origin=t,this.direction=e}set(t,e){return this.origin.copy(t),this.direction.copy(e),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,e){return e.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,jn)),this}closestPointToPoint(t,e){e.subVectors(t,this.origin);let i=e.dot(this.direction);return i<0?e.copy(this.origin):e.copy(this.origin).addScaledVector(this.direction,i)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){let e=jn.subVectors(t,this.origin).dot(this.direction);return e<0?this.origin.distanceToSquared(t):(jn.copy(this.origin).addScaledVector(this.direction,e),jn.distanceToSquared(t))}distanceSqToSegment(t,e,i,s){Kl.copy(t).add(e).multiplyScalar(.5),Kr.copy(e).sub(t).normalize(),Jr.copy(this.origin).sub(Kl);let r=t.distanceTo(e)*.5,a=-this.direction.dot(Kr),o=Jr.dot(this.direction),l=-Jr.dot(Kr),c=Jr.lengthSq(),u=Math.abs(1-a*a),f,h,d,p;if(u>0)if(f=a*l-o,h=a*o-l,p=r*u,f>=0)if(h>=-p)if(h<=p){let T=1/u;f*=T,h*=T,d=f*(f+a*h+2*o)+h*(a*f+h+2*l)+c}else h=r,f=Math.max(0,-(a*h+o)),d=-f*f+h*(h+2*l)+c;else h=-r,f=Math.max(0,-(a*h+o)),d=-f*f+h*(h+2*l)+c;else h<=-p?(f=Math.max(0,-(-a*r+o)),h=f>0?-r:Math.min(Math.max(-r,-l),r),d=-f*f+h*(h+2*l)+c):h<=p?(f=0,h=Math.min(Math.max(-r,-l),r),d=h*(h+2*l)+c):(f=Math.max(0,-(a*r+o)),h=f>0?r:Math.min(Math.max(-r,-l),r),d=-f*f+h*(h+2*l)+c);else h=a>0?-r:r,f=Math.max(0,-(a*h+o)),d=-f*f+h*(h+2*l)+c;return i&&i.copy(this.origin).addScaledVector(this.direction,f),s&&s.copy(Kl).addScaledVector(Kr,h),d}intersectSphere(t,e){if(t.radius<0)return null;jn.subVectors(t.center,this.origin);let i=jn.dot(this.direction),s=jn.dot(jn)-i*i,r=t.radius*t.radius;if(s>r)return null;let a=Math.sqrt(r-s),o=i-a,l=i+a;return l<0?null:o<0?this.at(l,e):this.at(o,e)}intersectsSphere(t){return t.radius<0?!1:this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){let e=t.normal.dot(this.direction);if(e===0)return t.distanceToPoint(this.origin)===0?0:null;let i=-(this.origin.dot(t.normal)+t.constant)/e;return i>=0?i:null}intersectPlane(t,e){let i=this.distanceToPlane(t);return i===null?null:this.at(i,e)}intersectsPlane(t){let e=t.distanceToPoint(this.origin);return e===0||t.normal.dot(this.direction)*e<0}intersectBox(t,e){let i,s,r,a,o,l,c=1/this.direction.x,u=1/this.direction.y,f=1/this.direction.z,h=this.origin;return c>=0?(i=(t.min.x-h.x)*c,s=(t.max.x-h.x)*c):(i=(t.max.x-h.x)*c,s=(t.min.x-h.x)*c),u>=0?(r=(t.min.y-h.y)*u,a=(t.max.y-h.y)*u):(r=(t.max.y-h.y)*u,a=(t.min.y-h.y)*u),i>a||r>s||((r>i||isNaN(i))&&(i=r),(a<s||isNaN(s))&&(s=a),f>=0?(o=(t.min.z-h.z)*f,l=(t.max.z-h.z)*f):(o=(t.max.z-h.z)*f,l=(t.min.z-h.z)*f),i>l||o>s)||((o>i||i!==i)&&(i=o),(l<s||s!==s)&&(s=l),s<0)?null:this.at(i>=0?i:s,e)}intersectsBox(t){return this.intersectBox(t,jn)!==null}intersectTriangle(t,e,i,s,r){let a=this.origin,o=this.direction,l=o.x,c=o.y,u=o.z,f=t.x-a.x,h=t.y-a.y,d=t.z-a.z,p=e.x-a.x,T=e.y-a.y,x=e.z-a.z,m=i.x-a.x,M=i.y-a.y,y=i.z-a.z,w=Math.abs(l),I=Math.abs(c),L=Math.abs(u),g,_,U,C,F,E,O,D,R,B,b,P;if(w>=I&&w>=L?(U=l,E=f,R=p,P=m,l>=0?(g=c,_=u,C=h,F=d,O=T,D=x,B=M,b=y):(g=u,_=c,C=d,F=h,O=x,D=T,B=y,b=M)):I>=L?(U=c,E=h,R=T,P=M,c>=0?(g=u,_=l,C=d,F=f,O=x,D=p,B=y,b=m):(g=l,_=u,C=f,F=d,O=p,D=x,B=m,b=y)):(U=u,E=d,R=x,P=y,u>=0?(g=l,_=c,C=f,F=h,O=p,D=T,B=m,b=M):(g=c,_=l,C=h,F=f,O=T,D=p,B=M,b=m)),U===0)return null;let A=g/U,N=_/U,v=1/U,G=C-A*E,q=F-N*E,S=O-A*R,V=D-N*R,W=B-A*P,Z=b-N*P,Y=W*V-Z*S,j=G*Z-q*W,ct=S*q-V*G;if(s){if(Y<0||j<0||ct<0)return null}else if((Y<0||j<0||ct<0)&&(Y>0||j>0||ct>0))return null;let ut=Y+j+ct;if(ut===0)return null;let ht=v*(Y*E+j*R+ct*P);return(ut>0?ht<0:ht>0)?null:this.at(ht/ut,r)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}},Hi=class extends _i{constructor(t){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Zt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new ni,this.combine=fc,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}},ou=new de,Gi=new or,Qr=new As,lu=new nt,jr=new nt,ta=new nt,ea=new nt,Jl=new nt,na=new nt,cu=new nt,ia=new nt,je=class extends $e{constructor(t=new yi,e=new Hi){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=e,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0?this.morphTargetInfluences=t.morphTargetInfluences.slice():this.morphTargetInfluences=void 0,t.morphTargetDictionary!==void 0?this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary):this.morphTargetDictionary=void 0,this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){let e=this.geometry.morphAttributes,i=Object.keys(e);if(i.length>0){let s=e[i[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){let o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}getVertexPosition(t,e){let i=this.geometry,s=i.attributes.position,r=i.morphAttributes.position,a=i.morphTargetsRelative;e.fromBufferAttribute(s,t);let o=this.morphTargetInfluences;if(r&&o){na.set(0,0,0);for(let l=0,c=r.length;l<c;l++){let u=o[l],f=r[l];u!==0&&(Jl.fromBufferAttribute(f,t),a?na.addScaledVector(Jl,u):na.addScaledVector(Jl.sub(e),u))}e.add(na)}return e}intersectsFrustum(t){return t.intersectsObject(this)}raycast(t,e){let i=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(i.boundingSphere===null&&i.computeBoundingSphere(),Qr.copy(i.boundingSphere),Qr.applyMatrix4(r),Gi.copy(t.ray).recast(t.near),!(Qr.containsPoint(Gi.origin)===!1&&(Gi.intersectSphere(Qr,lu)===null||Gi.origin.distanceToSquared(lu)>(t.far-t.near)**2))&&(ou.copy(r).invert(),Gi.copy(t.ray).applyMatrix4(ou),!(i.boundingBox!==null&&Gi.intersectsBox(i.boundingBox)===!1)&&this._computeIntersections(t,e,Gi)))}_computeIntersections(t,e,i){let s,r=this.geometry,a=this.material,o=r.index,l=r.attributes.position,c=r.attributes.uv,u=r.attributes.uv1,f=r.attributes.normal,h=r.groups,d=r.drawRange;if(o!==null)if(Array.isArray(a))for(let p=0,T=h.length;p<T;p++){let x=h[p],m=a[x.materialIndex],M=Math.max(x.start,d.start),y=Math.min(o.count,Math.min(x.start+x.count,d.start+d.count));for(let w=M,I=y;w<I;w+=3){let L=o.getX(w),g=o.getX(w+1),_=o.getX(w+2);s=sa(this,m,t,i,c,u,f,L,g,_),s&&(s.faceIndex=Math.floor(w/3),s.face.materialIndex=x.materialIndex,e.push(s))}}else{let p=Math.max(0,d.start),T=Math.min(o.count,d.start+d.count);for(let x=p,m=T;x<m;x+=3){let M=o.getX(x),y=o.getX(x+1),w=o.getX(x+2);s=sa(this,a,t,i,c,u,f,M,y,w),s&&(s.faceIndex=Math.floor(x/3),e.push(s))}}else if(l!==void 0)if(Array.isArray(a))for(let p=0,T=h.length;p<T;p++){let x=h[p],m=a[x.materialIndex],M=Math.max(x.start,d.start),y=Math.min(l.count,Math.min(x.start+x.count,d.start+d.count));for(let w=M,I=y;w<I;w+=3){let L=w,g=w+1,_=w+2;s=sa(this,m,t,i,c,u,f,L,g,_),s&&(s.faceIndex=Math.floor(w/3),s.face.materialIndex=x.materialIndex,e.push(s))}}else{let p=Math.max(0,d.start),T=Math.min(l.count,d.start+d.count);for(let x=p,m=T;x<m;x+=3){let M=x,y=x+1,w=x+2;s=sa(this,a,t,i,c,u,f,M,y,w),s&&(s.faceIndex=Math.floor(x/3),e.push(s))}}}};function hp(n,t,e,i,s,r,a,o){let l;if(t.side===Ze?l=i.intersectTriangle(a,r,s,!0,o):l=i.intersectTriangle(s,r,a,t.side===Ei,o),l===null)return null;ia.copy(o),ia.applyMatrix4(n.matrixWorld);let c=e.ray.origin.distanceTo(ia);return c<e.near||c>e.far?null:{distance:c,point:ia.clone(),object:n}}function sa(n,t,e,i,s,r,a,o,l,c){n.getVertexPosition(o,jr),n.getVertexPosition(l,ta),n.getVertexPosition(c,ea);let u=hp(n,t,e,i,jr,ta,ea,cu);if(u){let f=new nt;gi.getBarycoord(cu,jr,ta,ea,f),s&&(u.uv=gi.getInterpolatedAttribute(s,o,l,c,f,new Qt)),r&&(u.uv1=gi.getInterpolatedAttribute(r,o,l,c,f,new Qt)),a&&(u.normal=gi.getInterpolatedAttribute(a,o,l,c,f,new nt),u.normal.dot(i.direction)>0&&u.normal.multiplyScalar(-1));let h={a:o,b:l,c,normal:new nt,materialIndex:0};gi.getNormal(jr,ta,ea,h.normal),u.face=h,u.barycoord=f}return u}var wa=class extends Ye{constructor(t=null,e=1,i=1,s,r,a,o,l,c=Le,u=Le,f,h){super(null,a,o,l,c,u,s,r,f,h),this.isDataTexture=!0,this.image={data:t,width:e,height:i},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}};var Vi=new As,up=new Qt(.5,.5),ra=new nt,vi=class{constructor(t=new Cn,e=new Cn,i=new Cn,s=new Cn,r=new Cn,a=new Cn){this.planes=[t,e,i,s,r,a]}set(t,e,i,s,r,a){let o=this.planes;return o[0].copy(t),o[1].copy(e),o[2].copy(i),o[3].copy(s),o[4].copy(r),o[5].copy(a),this}copy(t){let e=this.planes;for(let i=0;i<6;i++)e[i].copy(t.planes[i]);return this}setFromProjectionMatrix(t,e=yn,i=!1){let s=this.planes,r=t.elements,a=r[0],o=r[1],l=r[2],c=r[3],u=r[4],f=r[5],h=r[6],d=r[7],p=r[8],T=r[9],x=r[10],m=r[11],M=r[12],y=r[13],w=r[14],I=r[15];if(s[0].setComponents(c-a,d-u,m-p,I-M).normalize(),s[1].setComponents(c+a,d+u,m+p,I+M).normalize(),s[2].setComponents(c+o,d+f,m+T,I+y).normalize(),s[3].setComponents(c-o,d-f,m-T,I-y).normalize(),i)s[4].setComponents(l,h,x,w).normalize(),s[5].setComponents(c-l,d-h,m-x,I-w).normalize();else if(s[4].setComponents(c-l,d-h,m-x,I-w).normalize(),e===yn)s[5].setComponents(c+l,d+h,m+x,I+w).normalize();else if(e===Ms)s[5].setComponents(l,h,x,w).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+e);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),Vi.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{let e=t.geometry;e.boundingSphere===null&&e.computeBoundingSphere(),Vi.copy(e.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(Vi)}intersectsSprite(t){Vi.center.set(0,0,0);let e=up.distanceTo(t.center);return Vi.radius=.7071067811865476+e,Vi.applyMatrix4(t.matrixWorld),this.intersectsSphere(Vi)}intersectsSphere(t){let e=this.planes,i=t.center,s=-t.radius;for(let r=0;r<6;r++)if(e[r].distanceToPoint(i)<s)return!1;return!0}intersectsBox(t){let e=this.planes;for(let i=0;i<6;i++){let s=e[i];if(ra.x=s.normal.x>0?t.max.x:t.min.x,ra.y=s.normal.y>0?t.max.y:t.min.y,ra.z=s.normal.z>0?t.max.z:t.min.z,s.distanceToPoint(ra)<0)return!1}return!0}containsPoint(t){let e=this.planes;for(let i=0;i<6;i++)if(e[i].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}},hu=new de,Ta=class n{constructor(){this.coordinateSystem=yn,this._frustums=[],this._count=0}setFromArrayCamera(t){let e=t.cameras,i=this._frustums;for(let s=0;s<e.length;s++){let r=e[s];hu.multiplyMatrices(r.projectionMatrix,r.matrixWorldInverse),i[s]===void 0&&(i[s]=new vi),i[s].setFromProjectionMatrix(hu,r.coordinateSystem,r.reversedDepth)}return this._count=e.length,this}getFrustum(t){return this._frustums[t]}intersectsObject(t){let e=this._frustums;for(let i=0;i<this._count;i++)if(e[i].intersectsObject(t))return!0;return!1}intersectsSprite(t){let e=this._frustums;for(let i=0;i<this._count;i++)if(e[i].intersectsSprite(t))return!0;return!1}intersectsSphere(t){let e=this._frustums;for(let i=0;i<this._count;i++)if(e[i].intersectsSphere(t))return!0;return!1}intersectsBox(t){let e=this._frustums;for(let i=0;i<this._count;i++)if(e[i].intersectsBox(t))return!0;return!1}containsPoint(t){let e=this._frustums;for(let i=0;i<this._count;i++)if(e[i].containsPoint(t))return!0;return!1}copy(t){this.coordinateSystem=t.coordinateSystem;let e=this._frustums,i=t._frustums;for(let s=0;s<t._count;s++)e[s]===void 0&&(e[s]=new vi),e[s].copy(i[s]);return this._count=t._count,this}clone(){return new n().copy(this)}};var lr=class extends Ye{constructor(t=[],e=Yi,i,s,r,a,o,l,c,u){super(t,e,i,s,r,a,o,l,c,u),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}},Wi=class extends Ye{constructor(t,e,i,s,r,a,o,l,c){super(t,e,i,s,r,a,o,l,c),this.isCanvasTexture=!0,this.needsUpdate=!0}};var ii=class extends Ye{constructor(t,e,i=In,s,r,a,o=Le,l=Le,c,u=ei,f=1){if(u!==ei&&u!==ri)throw new Error("THREE.DepthTexture: format must be either THREE.DepthFormat or THREE.DepthStencilFormat");let h={width:t,height:e,depth:f};super(h,s,r,a,o,l,u,i,c),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.source=new bs(Object.assign({},t.image)),this.compareFunction=t.compareFunction,this}toJSON(t){let e=super.toJSON(t);return e.compareFunction=this.compareFunction,e}},cr=class extends ii{constructor(t,e=In,i=Yi,s,r,a=Le,o=Le,l,c=ei){let u={width:t,height:t,depth:1},f=[u,u,u,u,u,u];super(t,t,e,i,s,r,a,o,l,c),this.image=f,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(t){this.image=t}},hr=class extends Ye{constructor(t=null){super(),this.sourceTexture=t,this.isExternalTexture=!0}copy(t){return super.copy(t),this.sourceTexture=t.sourceTexture,this}},Mi=class n extends yi{constructor(t=1,e=1,i=1,s=1,r=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:e,depth:i,widthSegments:s,heightSegments:r,depthSegments:a};let o=this;s=Math.floor(s),r=Math.floor(r),a=Math.floor(a);let l=[],c=[],u=[],f=[],h=0,d=0;p("z","y","x",-1,-1,i,e,t,a,r,0),p("z","y","x",1,-1,i,e,-t,a,r,1),p("x","z","y",1,1,t,i,e,s,a,2),p("x","z","y",1,-1,t,i,-e,s,a,3),p("x","y","z",1,-1,t,e,i,s,r,4),p("x","y","z",-1,-1,t,e,-i,s,r,5),this.setIndex(l),this.setAttribute("position",new _n(c,3)),this.setAttribute("normal",new _n(u,3)),this.setAttribute("uv",new _n(f,2));function p(T,x,m,M,y,w,I,L,g,_,U){let C=w/g,F=I/_,E=w/2,O=I/2,D=L/2,R=g+1,B=_+1,b=0,P=0,A=new nt;for(let N=0;N<B;N++){let v=N*F-O;for(let G=0;G<R;G++){let q=G*C-E;A[T]=q*M,A[x]=v*y,A[m]=D,c.push(A.x,A.y,A.z),A[T]=0,A[x]=0,A[m]=L>0?1:-1,u.push(A.x,A.y,A.z),f.push(G/g),f.push(1-N/_),b+=1}}for(let N=0;N<_;N++)for(let v=0;v<g;v++){let G=h+v+R*N,q=h+v+R*(N+1),S=h+(v+1)+R*(N+1),V=h+(v+1)+R*N;l.push(G,q,V),l.push(q,S,V),P+=6}o.addGroup(d,P,U),d+=P,h+=b}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new n(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}};var Si=class n extends yi{constructor(t=1,e=1,i=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:e,widthSegments:i,heightSegments:s};let r=t/2,a=e/2,o=Math.floor(i),l=Math.floor(s),c=o+1,u=l+1,f=t/o,h=e/l,d=[],p=[],T=[],x=[];for(let m=0;m<u;m++){let M=m*h-a;for(let y=0;y<c;y++){let w=y*f-r;p.push(w,-M,0),T.push(0,0,1),x.push(y/o),x.push(1-m/l)}}for(let m=0;m<l;m++)for(let M=0;M<o;M++){let y=M+c*m,w=M+c*(m+1),I=M+1+c*(m+1),L=M+1+c*m;d.push(y,w,L),d.push(w,I,L)}this.setIndex(d),this.setAttribute("position",new _n(p,3)),this.setAttribute("normal",new _n(T,3)),this.setAttribute("uv",new _n(x,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new n(t.width,t.height,t.widthSegments,t.heightSegments)}};function Zi(n){let t={};for(let e in n){t[e]={};for(let i in n[e]){let s=n[e][i];if(uu(s))s.isRenderTargetTexture?(Gt("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[e][i]=null):t[e][i]=s.clone();else if(Array.isArray(s))if(uu(s[0])){let r=[];for(let a=0,o=s.length;a<o;a++)r[a]=s[a].clone();t[e][i]=r}else t[e][i]=s.slice();else t[e][i]=s}}return t}function ze(n){let t={};for(let e=0;e<n.length;e++){let i=Zi(n[e]);for(let s in i)t[s]=i[s]}return t}function uu(n){return n&&(n.isColor||n.isMatrix3||n.isMatrix4||n.isVector2||n.isVector3||n.isVector4||n.isTexture||n.isQuaternion)}function dp(n){let t=[];for(let e=0;e<n.length;e++)t.push(n[e].clone());return t}function Uc(n){let t=n.getRenderTarget();return t===null?n.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:ee.workingColorSpace}var rd={clone:Zi,merge:ze},fp=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,pp=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`,Hn=class extends _i{constructor(t){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=fp,this.fragmentShader=pp,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=Zi(t.uniforms),this.uniformsGroups=dp(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this.defaultAttributeValues=Object.assign({},t.defaultAttributeValues),this.index0AttributeName=t.index0AttributeName,this.uniformsNeedUpdate=t.uniformsNeedUpdate,this}toJSON(t){let e=super.toJSON(t);e.glslVersion=this.glslVersion,e.uniforms={};for(let s in this.uniforms){let a=this.uniforms[s].value;a&&a.isTexture?e.uniforms[s]={type:"t",value:a.toJSON(t).uuid}:a&&a.isColor?e.uniforms[s]={type:"c",value:a.getHex()}:a&&a.isVector2?e.uniforms[s]={type:"v2",value:a.toArray()}:a&&a.isVector3?e.uniforms[s]={type:"v3",value:a.toArray()}:a&&a.isVector4?e.uniforms[s]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?e.uniforms[s]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?e.uniforms[s]={type:"m4",value:a.toArray()}:e.uniforms[s]={value:a}}Object.keys(this.defines).length>0&&(e.defines=this.defines),e.vertexShader=this.vertexShader,e.fragmentShader=this.fragmentShader,e.lights=this.lights,e.clipping=this.clipping;let i={};for(let s in this.extensions)this.extensions[s]===!0&&(i[s]=!0);return Object.keys(i).length>0&&(e.extensions=i),e}fromJSON(t,e){if(super.fromJSON(t,e),t.uniforms!==void 0)for(let i in t.uniforms){let s=t.uniforms[i];switch(this.uniforms[i]={},s.type){case"t":this.uniforms[i].value=e[s.value]||null;break;case"c":this.uniforms[i].value=new Zt().setHex(s.value);break;case"v2":this.uniforms[i].value=new Qt().fromArray(s.value);break;case"v3":this.uniforms[i].value=new nt().fromArray(s.value);break;case"v4":this.uniforms[i].value=new me().fromArray(s.value);break;case"m3":this.uniforms[i].value=new Ht().fromArray(s.value);break;case"m4":this.uniforms[i].value=new de().fromArray(s.value);break;default:this.uniforms[i].value=s.value}}if(t.defines!==void 0&&(this.defines=t.defines),t.vertexShader!==void 0&&(this.vertexShader=t.vertexShader),t.fragmentShader!==void 0&&(this.fragmentShader=t.fragmentShader),t.glslVersion!==void 0&&(this.glslVersion=t.glslVersion),t.extensions!==void 0)for(let i in t.extensions)this.extensions[i]=t.extensions[i];return t.lights!==void 0&&(this.lights=t.lights),t.clipping!==void 0&&(this.clipping=t.clipping),this}},Ea=class extends Hn{constructor(t){super(t),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}},Cs=class extends _i{constructor(t){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new Zt(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Zt(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Co,this.normalScale=new Qt(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new ni,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.defines={STANDARD:""},this.color.copy(t.color),this.roughness=t.roughness,this.metalness=t.metalness,this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.roughnessMap=t.roughnessMap,this.metalnessMap=t.metalnessMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.envMapIntensity=t.envMapIntensity,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}};var Aa=class extends _i{constructor(t){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=Wu,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}},Ca=class extends _i{constructor(t){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}};function ms(n,t){return!n||n.constructor===t?n:typeof t.BYTES_PER_ELEMENT=="number"?new t(n):Array.prototype.slice.call(n)}function aa(n){return n!==void 0&&n.inTangents!==void 0&&n.outTangents!==void 0}var bi=class{constructor(t,e,i,s){this.parameterPositions=t,this._cachedIndex=0,this.resultBuffer=s!==void 0?s:new e.constructor(i),this.sampleValues=e,this.valueSize=i,this.settings=null,this.DefaultSettings_={}}evaluate(t){let e=this.parameterPositions,i=this._cachedIndex,s=e[i],r=e[i-1];n:{t:{let a;e:{i:if(!(t<s)){for(let o=i+2;;){if(s===void 0){if(t<r)break i;return i=e.length,this._cachedIndex=i,this.copySampleValue_(i-1)}if(i===o)break;if(r=s,s=e[++i],t<s)break t}a=e.length;break e}if(!(t>=r)){let o=e[1];t<o&&(i=2,r=o);for(let l=i-2;;){if(r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(i===l)break;if(s=r,r=e[--i-1],t>=r)break t}a=i,i=0;break e}break n}for(;i<a;){let o=i+a>>>1;t<e[o]?a=o:i=o+1}if(s=e[i],r=e[i-1],r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(s===void 0)return i=e.length,this._cachedIndex=i,this.copySampleValue_(i-1)}this._cachedIndex=i,this.intervalChanged_(i,r,s)}return this.interpolate_(i,r,t,s)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(t){let e=this.resultBuffer,i=this.sampleValues,s=this.valueSize,r=t*s;for(let a=0;a!==s;++a)e[a]=i[r+a];return e}interpolate_(){throw new Error("THREE.Interpolant: Call to abstract method.")}intervalChanged_(){}},Ra=class extends bi{constructor(t,e,i,s){super(t,e,i,s),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:tc,endingEnd:tc}}intervalChanged_(t,e,i){let s=this.parameterPositions,r=t-2,a=t+1,o=s[r],l=s[a];if(o===void 0)switch(this.getSettings_().endingStart){case ec:r=t,o=2*e-i;break;case nc:r=s.length-2,o=e+s[r]-s[r+1];break;default:r=t,o=i}if(l===void 0)switch(this.getSettings_().endingEnd){case ec:a=t,l=2*i-e;break;case nc:a=1,l=i+s[1]-s[0];break;default:a=t-1,l=e}let c=(i-e)*.5,u=this.valueSize;this._weightPrev=c/(e-o),this._weightNext=c/(l-i),this._offsetPrev=r*u,this._offsetNext=a*u}interpolate_(t,e,i,s){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=t*o,c=l-o,u=this._offsetPrev,f=this._offsetNext,h=this._weightPrev,d=this._weightNext,p=(i-e)/(s-e),T=p*p,x=T*p,m=-h*x+2*h*T-h*p,M=(1+h)*x+(-1.5-2*h)*T+(-.5+h)*p+1,y=(-1-d)*x+(1.5+d)*T+.5*p,w=d*x-d*T;for(let I=0;I!==o;++I)r[I]=m*a[u+I]+M*a[c+I]+y*a[l+I]+w*a[f+I];return r}},Ia=class extends bi{constructor(t,e,i,s){super(t,e,i,s)}interpolate_(t,e,i,s){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=t*o,c=l-o,u=(i-e)/(s-e),f=1-u;for(let h=0;h!==o;++h)r[h]=a[c+h]*f+a[l+h]*u;return r}},Pa=class extends bi{constructor(t,e,i,s){super(t,e,i,s)}interpolate_(t){return this.copySampleValue_(t-1)}},La=class extends bi{interpolate_(t,e,i,s){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=t*o,c=l-o,u=this.inTangents,f=this.outTangents;if(!u||!f){let p=(i-e)/(s-e),T=1-p;for(let x=0;x!==o;++x)r[x]=a[c+x]*T+a[l+x]*p;return r}let h=o*2,d=t-1;for(let p=0;p!==o;++p){let T=a[c+p],x=a[l+p],m=d*h+p*2,M=f[m],y=f[m+1],w=t*h+p*2,I=u[w],L=u[w+1],g=gp(i,e,M,I,s);r[p]=ad(g,T,y,L,x)}return r}};function ad(n,t,e,i,s){let r=1-n;return r*r*r*t+3*r*r*n*e+3*r*n*n*i+n*n*n*s}function mp(n,t,e,i,s){let r=1-n;return 3*r*r*(e-t)+6*r*n*(i-e)+3*n*n*(s-i)}function gp(n,t,e,i,s){let r=(n-t)/(s-t);for(let a=0;a<8;a++){let o=ad(r,t,e,i,s)-n;if(Math.abs(o)<1e-10)break;let l=mp(r,t,e,i,s);if(Math.abs(l)<1e-10)break;r=Math.max(0,Math.min(1,r-o/l))}return r}var cn=class{constructor(t,e,i,s){if(t===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(e===void 0||e.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+t);this.name=t,this.times=ms(e,this.TimeBufferType),this.values=ms(i,this.ValueBufferType),this.setInterpolation(s||this.DefaultInterpolation)}static toJSON(t){let e=t.constructor,i;if(e.toJSON!==this.toJSON)i=e.toJSON(t);else{i={name:t.name,times:ms(t.times,Array),values:ms(t.values,Array)};let s=t.getInterpolation();s!==t.DefaultInterpolation&&(i.interpolation=s),aa(t.settings)&&(i.settings={inTangents:ms(t.settings.inTangents,Array),outTangents:ms(t.settings.outTangents,Array)})}return i.type=t.ValueTypeName,i}InterpolantFactoryMethodDiscrete(t){return new Pa(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodLinear(t){return new Ia(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodSmooth(t){return new Ra(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodBezier(t){let e=new La(this.times,this.values,this.getValueSize(),t);return this.settings&&(e.inTangents=this.settings.inTangents,e.outTangents=this.settings.outTangents),e}setInterpolation(t){let e;switch(t){case tr:e=this.InterpolantFactoryMethodDiscrete;break;case _a:e=this.InterpolantFactoryMethodLinear;break;case ca:e=this.InterpolantFactoryMethodSmooth;break;case jl:e=this.InterpolantFactoryMethodBezier;break}if(e===void 0){let i="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(t!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(i);return Gt("KeyframeTrack:",i),this}return this.createInterpolant=e,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return tr;case this.InterpolantFactoryMethodLinear:return _a;case this.InterpolantFactoryMethodSmooth:return ca;case this.InterpolantFactoryMethodBezier:return jl}}getValueSize(){return this.values.length/this.times.length}shift(t){if(t!==0){let e=this.times;for(let i=0,s=e.length;i!==s;++i)e[i]+=t;aa(this.settings)&&(du(this.settings.inTangents,t),du(this.settings.outTangents,t))}return this}scale(t){if(t!==1){let e=this.times;for(let i=0,s=e.length;i!==s;++i)e[i]*=t;aa(this.settings)&&(fu(this.settings.inTangents,t),fu(this.settings.outTangents,t))}return this}trim(t,e){let i=this.times,s=i.length,r=0,a=s-1;for(;r!==s&&i[r]<t;)++r;for(;a!==-1&&i[a]>e;)--a;if(++a,r!==0||a!==s){r>=a&&(a=Math.max(a,1),r=a-1);let o=this.getValueSize();this.times=i.slice(r,a),this.values=this.values.slice(r*o,a*o)}return this}validate(){let t=!0,e=this.getValueSize();e-Math.floor(e)!==0&&(Vt("KeyframeTrack: Invalid value size in track.",this),t=!1);let i=this.times,s=this.values,r=i.length;r===0&&(Vt("KeyframeTrack: Track is empty.",this),t=!1);let a=null;for(let o=0;o!==r;o++){let l=i[o];if(typeof l=="number"&&isNaN(l)){Vt("KeyframeTrack: Time is not a valid number.",this,o,l),t=!1;break}if(a!==null&&a>l){Vt("KeyframeTrack: Out of order keys.",this,o,l,a),t=!1;break}a=l}if(s!==void 0&&Wf(s))for(let o=0,l=s.length;o!==l;++o){let c=s[o];if(isNaN(c)){Vt("KeyframeTrack: Value is not a valid number.",this,o,c),t=!1;break}}return t}optimize(){let t=this.times.slice(),e=this.values.slice(),i=this.getValueSize(),s=this.getInterpolation()===ca,r=t.length-1,a=1;for(let o=1;o<r;++o){let l=!1,c=t[o],u=t[o+1];if(c!==u&&(o!==1||c!==t[0]))if(s)l=!0;else{let f=o*i,h=f-i,d=f+i;for(let p=0;p!==i;++p){let T=e[f+p];if(T!==e[h+p]||T!==e[d+p]){l=!0;break}}}if(l){if(o!==a){t[a]=t[o];let f=o*i,h=a*i;for(let d=0;d!==i;++d)e[h+d]=e[f+d]}++a}}if(r>0){t[a]=t[r];for(let o=r*i,l=a*i,c=0;c!==i;++c)e[l+c]=e[o+c];++a}return a!==t.length?(this.times=t.slice(0,a),this.values=e.slice(0,a*i)):(this.times=t,this.values=e),this}clone(){let t=this.times.slice(),e=this.values.slice(),i=this.constructor,s=new i(this.name,t,e);return s.createInterpolant=this.createInterpolant,aa(this.settings)&&(s.settings={inTangents:this.settings.inTangents.slice(),outTangents:this.settings.outTangents.slice()}),s}};function du(n,t){for(let e=0,i=n.length;e!==i;e+=2)n[e]+=t}function fu(n,t){for(let e=0,i=n.length;e!==i;e+=2)n[e]*=t}cn.prototype.ValueTypeName="";cn.prototype.TimeBufferType=Float32Array;cn.prototype.ValueBufferType=Float32Array;cn.prototype.DefaultInterpolation=_a;var wi=class extends cn{constructor(t,e,i){super(t,e,i)}};wi.prototype.ValueTypeName="bool";wi.prototype.ValueBufferType=Array;wi.prototype.DefaultInterpolation=tr;wi.prototype.InterpolantFactoryMethodLinear=void 0;wi.prototype.InterpolantFactoryMethodSmooth=void 0;var Na=class extends cn{constructor(t,e,i,s){super(t,e,i,s)}};Na.prototype.ValueTypeName="color";var Da=class extends cn{constructor(t,e,i,s){super(t,e,i,s)}};Da.prototype.ValueTypeName="number";var Ua=class extends bi{constructor(t,e,i,s){super(t,e,i,s)}interpolate_(t,e,i,s){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=(i-e)/(s-e),c=t*o;for(let u=c+o;c!==u;c+=4)Vn.slerpFlat(r,0,a,c-o,a,c,l);return r}},ur=class extends cn{constructor(t,e,i,s){super(t,e,i,s)}InterpolantFactoryMethodLinear(t){return new Ua(this.times,this.values,this.getValueSize(),t)}};ur.prototype.ValueTypeName="quaternion";ur.prototype.InterpolantFactoryMethodSmooth=void 0;var Ti=class extends cn{constructor(t,e,i){super(t,e,i)}};Ti.prototype.ValueTypeName="string";Ti.prototype.ValueBufferType=Array;Ti.prototype.DefaultInterpolation=tr;Ti.prototype.InterpolantFactoryMethodLinear=void 0;Ti.prototype.InterpolantFactoryMethodSmooth=void 0;var Oa=class extends cn{constructor(t,e,i,s){super(t,e,i,s)}};Oa.prototype.ValueTypeName="vector";var Fa=class{constructor(t,e,i){let s=this,r=!1,a=0,o=0,l,c=[];this.onStart=void 0,this.onLoad=t,this.onProgress=e,this.onError=i,this._abortController=null,this.itemStart=function(u){o++,r===!1&&s.onStart!==void 0&&s.onStart(u,a,o),r=!0},this.itemEnd=function(u){a++,s.onProgress!==void 0&&s.onProgress(u,a,o),a===o&&(r=!1,s.onLoad!==void 0&&s.onLoad())},this.itemError=function(u){s.onError!==void 0&&s.onError(u)},this.resolveURL=function(u){return u=u.normalize("NFC"),l?l(u):u},this.setURLModifier=function(u){return l=u,this},this.addHandler=function(u,f){return c.push(u,f),this},this.removeHandler=function(u){let f=c.indexOf(u);return f!==-1&&c.splice(f,2),this},this.getHandler=function(u){for(let f=0,h=c.length;f<h;f+=2){let d=c[f],p=c[f+1];if(d.global&&(d.lastIndex=0),d.test(u))return p}return null},this.abort=function(){return this.abortController.abort(),this._abortController=null,this}}get abortController(){return this._abortController||(this._abortController=new AbortController),this._abortController}},od=new Fa,ka=class{constructor(t){this.manager=t!==void 0?t:od,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={},this.priority="auto",this.cache="default",typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}load(){}loadAsync(t,e){let i=this;return new Promise(function(s,r){i.load(t,s,e,r)})}parse(){}setCrossOrigin(t){return this.crossOrigin=t,this}setWithCredentials(t){return this.withCredentials=t,this}setPath(t){return this.path=t,this}setResourcePath(t){return this.resourcePath=t,this}setRequestHeader(t){return this.requestHeader=t,this}setPriority(t){return this.priority=t,this}setCache(t){return this.cache=t,this}abort(){return this}};ka.DEFAULT_MATERIAL_NAME="__DEFAULT";var dr=class extends $e{static registerNode(t){this.prototype._lightNode=t}constructor(t,e=1){super(),this.isLight=!0,this.type="Light",this.color=new Zt(t),this.intensity=e}copy(t,e){return super.copy(t,e),this.color.copy(t.color),this.intensity=t.intensity,this}toJSON(t){let e=super.toJSON(t);return e.object.color=this.color.getHex(),e.object.intensity=this.intensity,e}};var Ql=new de,pu=new nt,mu=new nt,Ba=class{constructor(t){this.camera=t,this.intensity=1,this.bias=0,this.biasNode=null,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new Qt(512,512),this.mapType=tn,this.map=null,this.mapPass=null,this.matrix=new de,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new vi,this._frameExtents=new Qt(1,1),this._viewportCount=1,this._viewports=[new me(0,0,1,1)]}getViewportCount(){return this._viewportCount}getCamera(){return this.camera}getFrustum(){return this._frustum}updateMatrices(t){let e=this.camera;pu.setFromMatrixPosition(t.matrixWorld),e.position.copy(pu),mu.setFromMatrixPosition(t.target.matrixWorld),e.lookAt(mu),e.updateMatrixWorld(),this._updateMatrix(e,this.matrix,this._frustum)}_updateMatrix(t,e,i,s){Ql.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),i.setFromProjectionMatrix(Ql,t.coordinateSystem,t.reversedDepth);let r=this._frameExtents,a=s?s.z/r.x:1,o=s?s.w/r.y:1,l=s?s.x/r.x:0,c=s?s.y/r.y:0;t.coordinateSystem===Ms||t.reversedDepth?e.set(.5*a,0,0,.5*a+l,0,.5*o,0,.5*o+c,0,0,1,0,0,0,0,1):e.set(.5*a,0,0,.5*a+l,0,.5*o,0,.5*o+c,0,0,.5,.5,0,0,0,1),e.multiply(Ql)}getViewport(t){return this._viewports[t]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(t){return this.camera=t.camera.clone(),this.intensity=t.intensity,this.bias=t.bias,this.radius=t.radius,this.autoUpdate=t.autoUpdate,this.needsUpdate=t.needsUpdate,this.normalBias=t.normalBias,this.blurSamples=t.blurSamples,this.mapSize.copy(t.mapSize),this.mapType=t.mapType,this.biasNode=t.biasNode,this}clone(){return new this.constructor().copy(this)}toJSON(){let t={};return t.intensity=this.intensity,t.bias=this.bias,t.normalBias=this.normalBias,t.radius=this.radius,t.blurSamples=this.blurSamples,t.mapSize=this.mapSize.toArray(),t.mapType=this.mapType,t.camera=this.camera.toJSON(!1).object,delete t.camera.matrix,t}},oa=new nt,la=new Vn,kn=new nt,fr=class extends $e{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new de,this.projectionMatrix=new de,this.projectionMatrixInverse=new de,this.coordinateSystem=yn,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(t,e){return super.copy(t,e),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorld.decompose(oa,la,kn),kn.x===1&&kn.y===1&&kn.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(oa,la,kn.set(1,1,1)).invert()}updateWorldMatrix(t,e,i=!1){super.updateWorldMatrix(t,e,i),this.matrixWorld.decompose(oa,la,kn),kn.x===1&&kn.y===1&&kn.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(oa,la,kn.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}},mi=new nt,gu=new Qt,xu=new Qt,qe=class extends fr{constructor(t=50,e=1,i=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=i,this.far=s,this.focus=10,this.aspect=e,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){let e=.5*this.getFilmHeight()/t;this.fov=va*2*Math.atan(e),this.updateProjectionMatrix()}getFocalLength(){let t=Math.tan(Pl*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return va*2*Math.atan(Math.tan(Pl*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(t,e,i){mi.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),e.set(mi.x,mi.y).multiplyScalar(-t/mi.z),mi.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),i.set(mi.x,mi.y).multiplyScalar(-t/mi.z)}getViewSize(t,e){return this.getViewBounds(t,gu,xu),e.subVectors(xu,gu)}setViewOffset(t,e,i,s,r,a){this.aspect=t/e,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=i,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let t=this.near,e=t*Math.tan(Pl*.5*this.fov)/this.zoom,i=2*e,s=this.aspect*i,r=-.5*s,a=this.view;if(this.view!==null&&this.view.enabled){let l=a.fullWidth,c=a.fullHeight;r+=a.offsetX*s/l,e-=a.offsetY*i/c,s*=a.width/l,i*=a.height/c}let o=this.filmOffset;o!==0&&(r+=t*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,e,e-i,t,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){let e=super.toJSON(t);return e.object.fov=this.fov,e.object.zoom=this.zoom,e.object.near=this.near,e.object.far=this.far,e.object.focus=this.focus,e.object.aspect=this.aspect,this.view!==null&&(e.object.view=Object.assign({},this.view)),e.object.filmGauge=this.filmGauge,e.object.filmOffset=this.filmOffset,e}};var pr=class extends fr{constructor(t=-1,e=1,i=1,s=-1,r=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=e,this.top=i,this.bottom=s,this.near=r,this.far=a,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,e,i,s,r,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=i,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let t=(this.right-this.left)/(2*this.zoom),e=(this.top-this.bottom)/(2*this.zoom),i=(this.right+this.left)/2,s=(this.top+this.bottom)/2,r=i-t,a=i+t,o=s+e,l=s-e;if(this.view!==null&&this.view.enabled){let c=(this.right-this.left)/this.view.fullWidth/this.zoom,u=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=c*this.view.offsetX,a=r+c*this.view.width,o-=u*this.view.offsetY,l=o-u*this.view.height}this.projectionMatrix.makeOrthographic(r,a,o,l,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){let e=super.toJSON(t);return e.object.zoom=this.zoom,e.object.left=this.left,e.object.right=this.right,e.object.top=this.top,e.object.bottom=this.bottom,e.object.near=this.near,e.object.far=this.far,this.view!==null&&(e.object.view=Object.assign({},this.view)),e}},ic=class extends Ba{constructor(){super(new pr(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}},mr=class extends dr{constructor(t,e){super(t,e),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy($e.DEFAULT_UP),this.updateMatrix(),this.target=new $e,this.shadow=new ic}dispose(){super.dispose(),this.shadow.dispose()}copy(t){return super.copy(t),this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}toJSON(t){let e=super.toJSON(t);return e.object.shadow=this.shadow.toJSON(),e.object.target=this.target.uuid,e}},gr=class extends dr{constructor(t,e){super(t,e),this.isAmbientLight=!0,this.type="AmbientLight"}};var gs=-90,xs=1,Rs=class extends $e{constructor(t,e,i){super(),this.type="CubeCamera",this.renderTarget=i,this.coordinateSystem=null,this.activeMipmapLevel=0;let s=new qe(gs,xs,t,e);s.layers=this.layers,this.add(s);let r=new qe(gs,xs,t,e);r.layers=this.layers,this.add(r);let a=new qe(gs,xs,t,e);a.layers=this.layers,this.add(a);let o=new qe(gs,xs,t,e);o.layers=this.layers,this.add(o);let l=new qe(gs,xs,t,e);l.layers=this.layers,this.add(l);let c=new qe(gs,xs,t,e);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){let t=this.coordinateSystem,e=this.children.concat(),[i,s,r,a,o,l]=e;for(let c of e)this.remove(c);if(t===yn)i.up.set(0,1,0),i.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(t===Ms)i.up.set(0,-1,0),i.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(let c of e)this.add(c),c.updateMatrixWorld()}update(t,e){this.parent===null&&this.updateMatrixWorld();let{renderTarget:i,activeMipmapLevel:s}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());let[r,a,o,l,c,u]=this.children,f=t.getRenderTarget(),h=t.getActiveCubeFace(),d=t.getActiveMipmapLevel(),p=t.xr.enabled;t.xr.enabled=!1;let T=i.texture.mipmapsAutoUpdate;i.texture.mipmapsAutoUpdate=!1;let x=!1;t.isWebGLRenderer===!0?x=t.state.buffers.depth.getReversed():x=t.reversedDepthBuffer,t.setRenderTarget(i,0,s),x&&t.autoClear===!1&&t.clearDepth(),t.render(e,r),t.setRenderTarget(i,1,s),x&&t.autoClear===!1&&t.clearDepth(),t.render(e,a),t.setRenderTarget(i,2,s),x&&t.autoClear===!1&&t.clearDepth(),t.render(e,o),t.setRenderTarget(i,3,s),x&&t.autoClear===!1&&t.clearDepth(),t.render(e,l),t.setRenderTarget(i,4,s),x&&t.autoClear===!1&&t.clearDepth(),t.render(e,c),i.texture.mipmapsAutoUpdate=T,t.setRenderTarget(i,5,s),x&&t.autoClear===!1&&t.clearDepth(),t.render(e,u),t.setRenderTarget(f,h,d),t.xr.enabled=p,i.texture.needsPMREMUpdate=!0}},za=class extends qe{constructor(t=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=t,this.perCameraFrustumCulled=!1}};var Oc="\\[\\]\\.:\\/",xp=new RegExp("["+Oc+"]","g"),Fc="[^"+Oc+"]",yp="[^"+Oc.replace("\\.","")+"]",_p=/((?:WC+[\/:])*)/.source.replace("WC",Fc),vp=/(WCOD+)?/.source.replace("WCOD",yp),Mp=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",Fc),Sp=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",Fc),bp=new RegExp("^"+_p+vp+Mp+Sp+"$"),wp=["material","materials","bones","map"],sc=class{constructor(t,e,i){let s=i||ue.parseTrackName(e);this._targetGroup=t,this._bindings=t.subscribe_(e,s)}getValue(t,e){this.bind();let i=this._targetGroup.nCachedObjects_,s=this._bindings[i];s!==void 0&&s.getValue(t,e)}setValue(t,e){let i=this._bindings;for(let s=this._targetGroup.nCachedObjects_,r=i.length;s!==r;++s)i[s].setValue(t,e)}bind(){let t=this._bindings;for(let e=this._targetGroup.nCachedObjects_,i=t.length;e!==i;++e)t[e].bind()}unbind(){let t=this._bindings;for(let e=this._targetGroup.nCachedObjects_,i=t.length;e!==i;++e)t[e].unbind()}},ue=class n{constructor(t,e,i){this.path=e,this.parsedPath=i||n.parseTrackName(e),this.node=n.findNode(t,this.parsedPath.nodeName),this.rootNode=t,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(t,e,i){return t&&t.isAnimationObjectGroup?new n.Composite(t,e,i):new n(t,e,i)}static sanitizeNodeName(t){return t.replace(/\s/g,"_").replace(xp,"")}static parseTrackName(t){let e=bp.exec(t);if(e===null)throw new Error("THREE.PropertyBinding: Cannot parse trackName: "+t);let i={nodeName:e[2],objectName:e[3],objectIndex:e[4],propertyName:e[5],propertyIndex:e[6]},s=i.nodeName&&i.nodeName.lastIndexOf(".");if(s!==void 0&&s!==-1){let r=i.nodeName.substring(s+1);wp.indexOf(r)!==-1&&(i.nodeName=i.nodeName.substring(0,s),i.objectName=r)}if(i.propertyName===null||i.propertyName.length===0)throw new Error("THREE.PropertyBinding: can not parse propertyName from trackName: "+t);return i}static findNode(t,e){if(e===void 0||e===""||e==="."||e===-1||e===t.name||e===t.uuid)return t;if(t.skeleton){let i=t.skeleton.getBoneByName(e);if(i!==void 0)return i}if(t.children){let i=function(r){for(let a=0;a<r.length;a++){let o=r[a];if(o.name===e||o.uuid===e)return o;let l=i(o.children);if(l)return l}return null},s=i(t.children);if(s)return s}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(t,e){t[e]=this.targetObject[this.propertyName]}_getValue_array(t,e){let i=this.resolvedProperty;for(let s=0,r=i.length;s!==r;++s)t[e++]=i[s]}_getValue_arrayElement(t,e){t[e]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(t,e){this.resolvedProperty.toArray(t,e)}_setValue_direct(t,e){this.targetObject[this.propertyName]=t[e]}_setValue_direct_setNeedsUpdate(t,e){this.targetObject[this.propertyName]=t[e],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(t,e){this.targetObject[this.propertyName]=t[e],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(t,e){let i=this.resolvedProperty;for(let s=0,r=i.length;s!==r;++s)i[s]=t[e++]}_setValue_array_setNeedsUpdate(t,e){let i=this.resolvedProperty;for(let s=0,r=i.length;s!==r;++s)i[s]=t[e++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(t,e){let i=this.resolvedProperty;for(let s=0,r=i.length;s!==r;++s)i[s]=t[e++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(t,e){this.resolvedProperty[this.propertyIndex]=t[e]}_setValue_arrayElement_setNeedsUpdate(t,e){this.resolvedProperty[this.propertyIndex]=t[e],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(t,e){this.resolvedProperty[this.propertyIndex]=t[e],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(t,e){this.resolvedProperty.fromArray(t,e)}_setValue_fromArray_setNeedsUpdate(t,e){this.resolvedProperty.fromArray(t,e),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(t,e){this.resolvedProperty.fromArray(t,e),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(t,e){this.bind(),this.getValue(t,e)}_setValue_unbound(t,e){this.bind(),this.setValue(t,e)}bind(){let t=this.node,e=this.parsedPath,i=e.objectName,s=e.propertyName,r=e.propertyIndex;if(t||(t=n.findNode(this.rootNode,e.nodeName),this.node=t),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!t){Gt("PropertyBinding: No target node found for track: "+this.path+".");return}if(i){let c=e.objectIndex;switch(i){case"materials":if(!t.material){Vt("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!t.material.materials){Vt("PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}t=t.material.materials;break;case"bones":if(!t.skeleton){Vt("PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}t=t.skeleton.bones;for(let u=0;u<t.length;u++)if(t[u].name===c){c=u;break}break;case"map":if("map"in t){t=t.map;break}if(!t.material){Vt("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!t.material.map){Vt("PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}t=t.material.map;break;default:if(t[i]===void 0){Vt("PropertyBinding: Can not bind to objectName of node undefined.",this);return}t=t[i]}if(c!==void 0){if(t[c]===void 0){Vt("PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,t);return}t=t[c]}}let a=t[s];if(a===void 0){let c=e.nodeName;Vt("PropertyBinding: Trying to update property for track: "+c+"."+s+" but it wasn't found.",t);return}let o=this.Versioning.None;this.targetObject=t,t.isMaterial===!0?o=this.Versioning.NeedsUpdate:t.isObject3D===!0&&(o=this.Versioning.MatrixWorldNeedsUpdate);let l=this.BindingType.Direct;if(r!==void 0){if(s==="morphTargetInfluences"){if(!t.geometry){Vt("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!t.geometry.morphAttributes){Vt("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}t.morphTargetDictionary[r]!==void 0&&(r=t.morphTargetDictionary[r])}l=this.BindingType.ArrayElement,this.resolvedProperty=a,this.propertyIndex=r}else a.fromArray!==void 0&&a.toArray!==void 0?(l=this.BindingType.HasFromToArray,this.resolvedProperty=a):Array.isArray(a)?(l=this.BindingType.EntireArray,this.resolvedProperty=a):this.propertyName=s;this.getValue=this.GetterByBindingType[l],this.setValue=this.SetterByBindingTypeAndVersioning[l][o]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}};ue.Composite=sc;ue.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};ue.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};ue.prototype.GetterByBindingType=[ue.prototype._getValue_direct,ue.prototype._getValue_array,ue.prototype._getValue_arrayElement,ue.prototype._getValue_toArray];ue.prototype.SetterByBindingTypeAndVersioning=[[ue.prototype._setValue_direct,ue.prototype._setValue_direct_setNeedsUpdate,ue.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[ue.prototype._setValue_array,ue.prototype._setValue_array_setNeedsUpdate,ue.prototype._setValue_array_setMatrixWorldNeedsUpdate],[ue.prototype._setValue_arrayElement,ue.prototype._setValue_arrayElement_setNeedsUpdate,ue.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[ue.prototype._setValue_fromArray,ue.prototype._setValue_fromArray_setNeedsUpdate,ue.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];var Sv=new Float32Array(1);var yu=new de,xr=class{constructor(t,e,i=0,s=1/0){this.ray=new or(t,e),this.near=i,this.far=s,this.camera=null,this.layers=new ws,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(t,e){this.ray.set(t,e)}setFromCamera(t,e){e.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(t.x,t.y,.5).unproject(e).sub(this.ray.origin).normalize(),this.camera=e):e.isOrthographicCamera?(this.ray.origin.set(t.x,t.y,e.projectionMatrix.elements[14]).unproject(e),this.ray.direction.set(0,0,-1).transformDirection(e.matrixWorld),this.camera=e):Vt("Raycaster: Unsupported camera type: "+e.type)}setFromXRController(t){return yu.identity().extractRotation(t.matrixWorld),this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(yu),this}intersectObject(t,e=!0,i=[]){return rc(t,this,i,e),i.sort(_u),i}intersectObjects(t,e=!0,i=[]){for(let s=0,r=t.length;s<r;s++)rc(t[s],this,i,e);return i.sort(_u),i}};function _u(n,t){return n.distance-t.distance}function rc(n,t,e,i){let s=!0;if(n.layers.test(t.layers)&&n.raycast(t,e)===!1&&(s=!1),s===!0&&i===!0){let r=n.children;for(let a=0,o=r.length;a<o;a++)rc(r[a],t,e,!0)}}var Hc=class Hc{constructor(t,e,i,s){this.elements=[1,0,0,1],t!==void 0&&this.set(t,e,i,s)}identity(){return this.set(1,0,0,1),this}fromArray(t,e=0){for(let i=0;i<4;i++)this.elements[i]=t[i+e];return this}set(t,e,i,s){let r=this.elements;return r[0]=t,r[2]=e,r[1]=i,r[3]=s,this}};Hc.prototype.isMatrix2=!0;var ac=Hc;function kc(n,t,e,i){let s=Tp(i);switch(e){case Ec:return n*t;case Cc:return n*t/s.components*s.byteLength;case $a:return n*t/s.components*s.byteLength;case Ai:return n*t*2/s.components*s.byteLength;case Za:return n*t*2/s.components*s.byteLength;case Ac:return n*t*3/s.components*s.byteLength;case Nn:return n*t*4/s.components*s.byteLength;case Ka:return n*t*4/s.components*s.byteLength;case vr:case Mr:return Math.floor((n+3)/4)*Math.floor((t+3)/4)*8;case Sr:case br:return Math.floor((n+3)/4)*Math.floor((t+3)/4)*16;case Qa:case to:return Math.max(n,16)*Math.max(t,8)/4;case Ja:case ja:return Math.max(n,8)*Math.max(t,8)/2;case eo:case no:case so:case ro:return Math.floor((n+3)/4)*Math.floor((t+3)/4)*8;case io:case wr:case ao:return Math.floor((n+3)/4)*Math.floor((t+3)/4)*16;case oo:return Math.floor((n+3)/4)*Math.floor((t+3)/4)*16;case lo:return Math.floor((n+4)/5)*Math.floor((t+3)/4)*16;case co:return Math.floor((n+4)/5)*Math.floor((t+4)/5)*16;case ho:return Math.floor((n+5)/6)*Math.floor((t+4)/5)*16;case uo:return Math.floor((n+5)/6)*Math.floor((t+5)/6)*16;case fo:return Math.floor((n+7)/8)*Math.floor((t+4)/5)*16;case po:return Math.floor((n+7)/8)*Math.floor((t+5)/6)*16;case mo:return Math.floor((n+7)/8)*Math.floor((t+7)/8)*16;case go:return Math.floor((n+9)/10)*Math.floor((t+4)/5)*16;case xo:return Math.floor((n+9)/10)*Math.floor((t+5)/6)*16;case yo:return Math.floor((n+9)/10)*Math.floor((t+7)/8)*16;case _o:return Math.floor((n+9)/10)*Math.floor((t+9)/10)*16;case vo:return Math.floor((n+11)/12)*Math.floor((t+9)/10)*16;case Mo:return Math.floor((n+11)/12)*Math.floor((t+11)/12)*16;case So:case bo:case wo:return Math.ceil(n/4)*Math.ceil(t/4)*16;case To:case Eo:return Math.ceil(n/4)*Math.ceil(t/4)*8;case Tr:case Ao:return Math.ceil(n/4)*Math.ceil(t/4)*16}throw new Error(`Unable to determine texture byte length for ${e} format.`)}function Tp(n){switch(n){case tn:case Sc:return{byteLength:1,components:1};case Ns:case bc:case Ln:return{byteLength:2,components:1};case Xa:case Ya:return{byteLength:2,components:4};case In:case qa:case Pn:return{byteLength:4,components:1};case wc:case Tc:return{byteLength:4,components:3}}throw new Error(`THREE.TextureUtils: Unknown texture type ${n}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:"187"}}));typeof window<"u"&&(window.__THREE__?Gt("WARNING: Multiple instances of Three.js being imported."):window.__THREE__="187");function Rd(){let n=null,t=!1,e=null,i=null;function s(r,a){i=n.requestAnimationFrame(s),e(r,a)}return{start:function(){t!==!0&&e!==null&&n!==null&&(i=n.requestAnimationFrame(s),t=!0)},stop:function(){n!==null&&n.cancelAnimationFrame(i),t=!1},setAnimationLoop:function(r){e=r},setContext:function(r){n=r}}}function Ap(n){let t=new WeakMap;function e(o,l){let c=o.array,u=o.usage,f=c.byteLength,h=n.createBuffer();n.bindBuffer(l,h),n.bufferData(l,c,u),o.onUploadCallback();let d;if(c instanceof Float32Array)d=n.FLOAT;else if(typeof Float16Array<"u"&&c instanceof Float16Array)d=n.HALF_FLOAT;else if(c instanceof Uint16Array)o.isFloat16BufferAttribute?d=n.HALF_FLOAT:d=n.UNSIGNED_SHORT;else if(c instanceof Int16Array)d=n.SHORT;else if(c instanceof Uint32Array)d=n.UNSIGNED_INT;else if(c instanceof Int32Array)d=n.INT;else if(c instanceof Int8Array)d=n.BYTE;else if(c instanceof Uint8Array)d=n.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)d=n.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:h,type:d,bytesPerElement:c.BYTES_PER_ELEMENT,version:o.version,size:f}}function i(o,l,c){let u=l.array,f=l.updateRanges;if(n.bindBuffer(c,o),f.length===0)n.bufferSubData(c,0,u);else{f.sort((d,p)=>d.start-p.start);let h=0;for(let d=1;d<f.length;d++){let p=f[h],T=f[d];T.start<=p.start+p.count+1?p.count=Math.max(p.count,T.start+T.count-p.start):(++h,f[h]=T)}f.length=h+1;for(let d=0,p=f.length;d<p;d++){let T=f[d];n.bufferSubData(c,T.start*u.BYTES_PER_ELEMENT,u,T.start,T.count)}l.clearUpdateRanges()}l.onUploadCallback()}function s(o){return o.isInterleavedBufferAttribute&&(o=o.data),t.get(o)}function r(o){o.isInterleavedBufferAttribute&&(o=o.data);let l=t.get(o);l&&(n.deleteBuffer(l.buffer),t.delete(o))}function a(o,l){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){let u=t.get(o);(!u||u.version<o.version)&&t.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}let c=t.get(o);if(c===void 0)t.set(o,e(o,l));else if(c.version<o.version){if(c.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");i(c.buffer,o,l),c.version=o.version}}return{get:s,remove:r,update:a}}var Cp=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,Rp=`#ifdef USE_ALPHAHASH
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
#endif`,Ip=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,Pp=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Lp=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,Np=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,Dp=`#ifdef USE_AOMAP
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
#endif`,Up=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,Op=`#ifdef USE_BATCHING
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
#endif`,Fp=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,kp=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,Bp=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,zp=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,Gp=`#ifdef USE_IRIDESCENCE
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
#endif`,Vp=`#ifdef USE_BUMPMAP
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
#endif`,Hp=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,Wp=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,qp=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,Xp=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,Yp=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,$p=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,Zp=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,Kp=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
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
#endif`,Jp=`#define PI 3.141592653589793
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
} // validated`,Qp=`vec3 transformedNormal = objectNormal;
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
#endif`,jp=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,tm=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,em=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,nm=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,im="gl_FragColor = linearToOutputTexel( gl_FragColor );",sm=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,rm=`#ifdef USE_ENVMAP
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
#endif`,am=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	uniform samplerCube envMap;
	#ifdef ENVMAP_TYPE_PMREM
		float roughnessToMip( const in float roughness ) {
			float r = clamp( roughness, 0.0, 1.0 );
			return ENVMAP_MAX_LOD * r * ( 2.0 - r );
		}
	#endif
#endif`,om=`#ifdef USE_ENVMAP
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
#endif`,lm=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,cm=`#ifdef USE_ENVMAP
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
#endif`,hm=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,um=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,dm=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,fm=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,pm=`#ifdef USE_GRADIENTMAP
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
}`,mm=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,gm=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,xm=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,ym=`uniform bool receiveShadow;
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
#include <lightprobes_pars_fragment>`,_m=`#ifdef USE_ENVMAP
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
#endif`,vm=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,Mm=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,Sm=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,bm=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,wm=`PhysicalMaterial material;
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
#endif`,Tm=`uniform sampler2D dfgLUT;
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
}`,Em=`
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
#endif`,Am=`#if defined( RE_IndirectDiffuse )
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
#endif`,Cm=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,Rm=`#if NUM_LIGHT_PROBE_GRIDS > 0
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
#endif`,Im=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,Pm=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Lm=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Nm=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,Dm=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,Um=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,Om=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,Fm=`#if defined( USE_POINTS_UV )
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
#endif`,km=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,Bm=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,zm=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,Gm=`#if defined( USE_MORPHCOLORS )
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
#endif`,Vm=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Hm=`#ifdef USE_MORPHTARGETS
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
#endif`,Wm=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,qm=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,Xm=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,Ym=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,$m=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Zm=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
		#ifdef FLIP_SIDED
			vBitangent = - vBitangent;
		#endif
	#endif
#endif`,Km=`#ifdef USE_NORMALMAP
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
#endif`,Jm=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,Qm=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,jm=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,t0=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,e0=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,n0=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,i0=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,s0=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,r0=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,a0=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,o0=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,l0=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,c0=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,h0=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,u0=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_SUN_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,d0=`float getShadowMask() {
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
}`,f0=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,p0=`#ifdef USE_SKINNING
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
#endif`,m0=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,g0=`#ifdef USE_SKINNING
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
#endif`,x0=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,y0=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,_0=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,v0=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,M0=`#ifdef USE_TRANSMISSION
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
#endif`,S0=`#ifdef USE_TRANSMISSION
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
#endif`,b0=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,w0=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,T0=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,E0=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,A0=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,C0=`uniform sampler2D t2D;
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
}`,R0=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,I0=`uniform float backgroundBlurriness;
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
}`,P0=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,L0=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,N0=`#include <common>
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
}`,D0=`#if DEPTH_PACKING == 3200
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
}`,U0=`#define DISTANCE
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
}`,O0=`#define DISTANCE
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
}`,F0=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,k0=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,B0=`uniform float scale;
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
}`,z0=`uniform vec3 diffuse;
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
}`,G0=`#include <common>
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
}`,V0=`uniform vec3 diffuse;
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
}`,H0=`#define LAMBERT
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
}`,W0=`#define LAMBERT
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
}`,q0=`#define MATCAP
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
}`,X0=`#define MATCAP
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
}`,Y0=`#define NORMAL
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
}`,$0=`#define NORMAL
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
}`,Z0=`#define PHONG
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
}`,K0=`#define PHONG
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
}`,J0=`#define STANDARD
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
}`,Q0=`#define STANDARD
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
}`,j0=`#define TOON
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
}`,tg=`#define TOON
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
}`,eg=`uniform float size;
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
}`,ng=`uniform vec3 diffuse;
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
}`,ig=`#include <common>
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
}`,sg=`uniform vec3 color;
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
}`,rg=`uniform float rotation;
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
}`,ag=`uniform vec3 diffuse;
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
}`,Kt={alphahash_fragment:Cp,alphahash_pars_fragment:Rp,alphamap_fragment:Ip,alphamap_pars_fragment:Pp,alphatest_fragment:Lp,alphatest_pars_fragment:Np,aomap_fragment:Dp,aomap_pars_fragment:Up,batching_pars_vertex:Op,batching_vertex:Fp,begin_vertex:kp,beginnormal_vertex:Bp,bsdfs:zp,iridescence_fragment:Gp,bumpmap_pars_fragment:Vp,clipping_planes_fragment:Hp,clipping_planes_pars_fragment:Wp,clipping_planes_pars_vertex:qp,clipping_planes_vertex:Xp,color_fragment:Yp,color_pars_fragment:$p,color_pars_vertex:Zp,color_vertex:Kp,common:Jp,defaultnormal_vertex:Qp,displacementmap_pars_vertex:jp,displacementmap_vertex:tm,emissivemap_fragment:em,emissivemap_pars_fragment:nm,colorspace_fragment:im,colorspace_pars_fragment:sm,envmap_fragment:rm,envmap_common_pars_fragment:am,envmap_pars_fragment:om,envmap_pars_vertex:lm,envmap_physical_pars_fragment:_m,envmap_vertex:cm,fog_vertex:hm,fog_pars_vertex:um,fog_fragment:dm,fog_pars_fragment:fm,gradientmap_pars_fragment:pm,lightmap_pars_fragment:mm,lights_lambert_fragment:gm,lights_lambert_pars_fragment:xm,lights_pars_begin:ym,lights_toon_fragment:vm,lights_toon_pars_fragment:Mm,lights_phong_fragment:Sm,lights_phong_pars_fragment:bm,lights_physical_fragment:wm,lights_physical_pars_fragment:Tm,lights_fragment_begin:Em,lights_fragment_maps:Am,lights_fragment_end:Cm,lightprobes_pars_fragment:Rm,logdepthbuf_fragment:Im,logdepthbuf_pars_fragment:Pm,logdepthbuf_pars_vertex:Lm,logdepthbuf_vertex:Nm,map_fragment:Dm,map_pars_fragment:Um,map_particle_fragment:Om,map_particle_pars_fragment:Fm,metalnessmap_fragment:km,metalnessmap_pars_fragment:Bm,morphinstance_vertex:zm,morphcolor_vertex:Gm,morphnormal_vertex:Vm,morphtarget_pars_vertex:Hm,morphtarget_vertex:Wm,normal_fragment_begin:qm,normal_fragment_maps:Xm,normal_pars_fragment:Ym,normal_pars_vertex:$m,normal_vertex:Zm,normalmap_pars_fragment:Km,clearcoat_normal_fragment_begin:Jm,clearcoat_normal_fragment_maps:Qm,clearcoat_pars_fragment:jm,iridescence_pars_fragment:t0,opaque_fragment:e0,packing:n0,premultiplied_alpha_fragment:i0,project_vertex:s0,dithering_fragment:r0,dithering_pars_fragment:a0,roughnessmap_fragment:o0,roughnessmap_pars_fragment:l0,shadowmap_pars_fragment:c0,shadowmap_pars_vertex:h0,shadowmap_vertex:u0,shadowmask_pars_fragment:d0,skinbase_vertex:f0,skinning_pars_vertex:p0,skinning_vertex:m0,skinnormal_vertex:g0,specularmap_fragment:x0,specularmap_pars_fragment:y0,tonemapping_fragment:_0,tonemapping_pars_fragment:v0,transmission_fragment:M0,transmission_pars_fragment:S0,uv_pars_fragment:b0,uv_pars_vertex:w0,uv_vertex:T0,worldpos_vertex:E0,background_vert:A0,background_frag:C0,backgroundCube_vert:R0,backgroundCube_frag:I0,cube_vert:P0,cube_frag:L0,depth_vert:N0,depth_frag:D0,distance_vert:U0,distance_frag:O0,equirect_vert:F0,equirect_frag:k0,linedashed_vert:B0,linedashed_frag:z0,meshbasic_vert:G0,meshbasic_frag:V0,meshlambert_vert:H0,meshlambert_frag:W0,meshmatcap_vert:q0,meshmatcap_frag:X0,meshnormal_vert:Y0,meshnormal_frag:$0,meshphong_vert:Z0,meshphong_frag:K0,meshphysical_vert:J0,meshphysical_frag:Q0,meshtoon_vert:j0,meshtoon_frag:tg,points_vert:eg,points_frag:ng,shadow_vert:ig,shadow_frag:sg,sprite_vert:rg,sprite_frag:ag},wt={common:{diffuse:{value:new Zt(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Ht},alphaMap:{value:null},alphaMapTransform:{value:new Ht},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Ht}},envmap:{envMap:{value:null},envMapRotation:{value:new Ht},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Ht}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Ht}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Ht},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Ht},normalScale:{value:new Qt(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Ht},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Ht}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Ht}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Ht}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Zt(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},sunLights:{value:[],properties:{direction:{},color:{}}},sunLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},sunShadowMatrix:{value:[]},sunShadowCascade:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:[]},probesMin:{value:[]},probesMax:{value:[]},probesResolution:{value:[]}},points:{diffuse:{value:new Zt(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Ht},alphaTest:{value:0},uvTransform:{value:new Ht}},sprite:{diffuse:{value:new Zt(16777215)},opacity:{value:1},center:{value:new Qt(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Ht},alphaMap:{value:null},alphaMapTransform:{value:new Ht},alphaTest:{value:0}}},qn={basic:{uniforms:ze([wt.common,wt.specularmap,wt.envmap,wt.aomap,wt.lightmap,wt.fog]),vertexShader:Kt.meshbasic_vert,fragmentShader:Kt.meshbasic_frag},lambert:{uniforms:ze([wt.common,wt.specularmap,wt.envmap,wt.aomap,wt.lightmap,wt.emissivemap,wt.bumpmap,wt.normalmap,wt.displacementmap,wt.fog,wt.lights,{emissive:{value:new Zt(0)},envMapIntensity:{value:1}}]),vertexShader:Kt.meshlambert_vert,fragmentShader:Kt.meshlambert_frag},phong:{uniforms:ze([wt.common,wt.specularmap,wt.envmap,wt.aomap,wt.lightmap,wt.emissivemap,wt.bumpmap,wt.normalmap,wt.displacementmap,wt.fog,wt.lights,{emissive:{value:new Zt(0)},specular:{value:new Zt(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:Kt.meshphong_vert,fragmentShader:Kt.meshphong_frag},standard:{uniforms:ze([wt.common,wt.envmap,wt.aomap,wt.lightmap,wt.emissivemap,wt.bumpmap,wt.normalmap,wt.displacementmap,wt.roughnessmap,wt.metalnessmap,wt.fog,wt.lights,{emissive:{value:new Zt(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Kt.meshphysical_vert,fragmentShader:Kt.meshphysical_frag},toon:{uniforms:ze([wt.common,wt.aomap,wt.lightmap,wt.emissivemap,wt.bumpmap,wt.normalmap,wt.displacementmap,wt.gradientmap,wt.fog,wt.lights,{emissive:{value:new Zt(0)}}]),vertexShader:Kt.meshtoon_vert,fragmentShader:Kt.meshtoon_frag},matcap:{uniforms:ze([wt.common,wt.bumpmap,wt.normalmap,wt.displacementmap,wt.fog,{matcap:{value:null}}]),vertexShader:Kt.meshmatcap_vert,fragmentShader:Kt.meshmatcap_frag},points:{uniforms:ze([wt.points,wt.fog]),vertexShader:Kt.points_vert,fragmentShader:Kt.points_frag},dashed:{uniforms:ze([wt.common,wt.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Kt.linedashed_vert,fragmentShader:Kt.linedashed_frag},depth:{uniforms:ze([wt.common,wt.displacementmap]),vertexShader:Kt.depth_vert,fragmentShader:Kt.depth_frag},normal:{uniforms:ze([wt.common,wt.bumpmap,wt.normalmap,wt.displacementmap,{opacity:{value:1}}]),vertexShader:Kt.meshnormal_vert,fragmentShader:Kt.meshnormal_frag},sprite:{uniforms:ze([wt.sprite,wt.fog]),vertexShader:Kt.sprite_vert,fragmentShader:Kt.sprite_frag},background:{uniforms:{uvTransform:{value:new Ht},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Kt.background_vert,fragmentShader:Kt.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Ht}},vertexShader:Kt.backgroundCube_vert,fragmentShader:Kt.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Kt.cube_vert,fragmentShader:Kt.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Kt.equirect_vert,fragmentShader:Kt.equirect_frag},distance:{uniforms:ze([wt.common,wt.displacementmap,{referencePosition:{value:new nt},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Kt.distance_vert,fragmentShader:Kt.distance_frag},shadow:{uniforms:ze([wt.lights,wt.fog,{color:{value:new Zt(0)},opacity:{value:1}}]),vertexShader:Kt.shadow_vert,fragmentShader:Kt.shadow_frag}};qn.physical={uniforms:ze([qn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Ht},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Ht},clearcoatNormalScale:{value:new Qt(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Ht},diffuseRoughness:{value:0},diffuseRoughnessMap:{value:null},diffuseRoughnessMapTransform:{value:new Ht},dispersion:{value:0},retroreflectivity:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Ht},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Ht},sheen:{value:0},sheenColor:{value:new Zt(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Ht},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Ht},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Ht},transmissionSamplerSize:{value:new Qt},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Ht},attenuationDistance:{value:0},attenuationColor:{value:new Zt(0)},specularColor:{value:new Zt(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Ht},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Ht},anisotropyVector:{value:new Qt},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Ht}}]),vertexShader:Kt.meshphysical_vert,fragmentShader:Kt.meshphysical_frag};var Ro={r:0,b:0,g:0},og=new de,Id=new Ht;Id.set(-1,0,0,0,1,0,0,0,1);function lg(n,t,e,i,s,r){let a=new Zt(0),o=s===!0?0:1,l,c,u=null,f=0,h=null;function d(M){let y=M.isScene===!0?M.background:null;if(y&&y.isTexture){let w=M.backgroundBlurriness>0;y=t.get(y,w)}return y}function p(M){let y=!1,w=d(M);w===null?x(a,o):w&&w.isColor&&(x(w,1),y=!0);let I=n.xr.getEnvironmentBlendMode();I==="additive"?e.buffers.color.setClear(0,0,0,1,r):I==="alpha-blend"&&e.buffers.color.setClear(0,0,0,0,r),(n.autoClear||y)&&(e.buffers.depth.setTest(!0),e.buffers.depth.setMask(!0),e.buffers.color.setMask(!0),n.clear(n.autoClearColor,n.autoClearDepth,n.autoClearStencil))}function T(M,y){let w=d(y);w&&w.isCubeTexture?(c===void 0&&(c=new je(new Mi(1,1,1),new Hn({name:"BackgroundCubeMaterial",uniforms:Zi(qn.backgroundCube.uniforms),vertexShader:qn.backgroundCube.vertexShader,fragmentShader:qn.backgroundCube.fragmentShader,side:Ze,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),c.geometry.deleteAttribute("uv"),c.onBeforeRender=function(I,L,g){this.matrixWorld.copyPosition(g.matrixWorld)},Object.defineProperty(c.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),i.update(c)),c.material.uniforms.envMap.value=w,c.material.uniforms.backgroundBlurriness.value=y.backgroundBlurriness,c.material.uniforms.backgroundIntensity.value=y.backgroundIntensity,c.material.uniforms.backgroundRotation.value.setFromMatrix4(og.makeRotationFromEuler(y.backgroundRotation)).transpose(),w.isRenderTargetTexture===!1&&c.material.uniforms.backgroundRotation.value.premultiply(Id),c.material.toneMapped=ee.getTransfer(w.colorSpace)!==re,(u!==w||f!==w.version||h!==n.toneMapping)&&(c.material.needsUpdate=!0,u=w,f=w.version,h=n.toneMapping),c.layers.enableAll(),M.unshift(c,c.geometry,c.material,0,0,null)):w&&w.isTexture&&(l===void 0&&(l=new je(new Si(2,2),new Hn({name:"BackgroundMaterial",uniforms:Zi(qn.background.uniforms),vertexShader:qn.background.vertexShader,fragmentShader:qn.background.fragmentShader,side:Ei,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),i.update(l)),l.material.uniforms.t2D.value=w,l.material.uniforms.backgroundIntensity.value=y.backgroundIntensity,l.material.toneMapped=ee.getTransfer(w.colorSpace)!==re,w.matrixAutoUpdate===!0&&w.updateMatrix(),l.material.uniforms.uvTransform.value.copy(w.matrix),(u!==w||f!==w.version||h!==n.toneMapping)&&(l.material.needsUpdate=!0,u=w,f=w.version,h=n.toneMapping),l.layers.enableAll(),M.unshift(l,l.geometry,l.material,0,0,null))}function x(M,y){M.getRGB(Ro,Uc(n)),e.buffers.color.setClear(Ro.r,Ro.g,Ro.b,y,r)}function m(){c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0),l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0)}return{getClearColor:function(){return a},setClearColor:function(M,y=1){a.set(M),o=y,x(a,o)},getClearAlpha:function(){return o},setClearAlpha:function(M){o=M,x(a,o)},render:p,addToRenderList:T,dispose:m}}function cg(n,t){let e=n.getParameter(n.MAX_VERTEX_ATTRIBS),i={},s=h(null),r=s,a=!1;function o(F,E,O,D,R){let B=!1,b=f(F,D,O,E);r!==b&&(r=b,c(r.object)),B=d(F,D,O,R),B&&p(F,D,O,R),R!==null&&t.update(R,n.ELEMENT_ARRAY_BUFFER),(B||a)&&(a=!1,w(F,E,O,D),R!==null&&n.bindBuffer(n.ELEMENT_ARRAY_BUFFER,t.get(R).buffer))}function l(){return n.createVertexArray()}function c(F){return n.bindVertexArray(F)}function u(F){return n.deleteVertexArray(F)}function f(F,E,O,D){let R=D.wireframe===!0,B=i[E.id];B===void 0&&(B={},i[E.id]=B);let b=F.isInstancedMesh===!0?F.id:0,P=B[b];P===void 0&&(P={},B[b]=P);let A=P[O.id];A===void 0&&(A={},P[O.id]=A);let N=A[R];return N===void 0&&(N=h(l()),A[R]=N),N}function h(F){let E=[],O=[],D=[];for(let R=0;R<e;R++)E[R]=0,O[R]=0,D[R]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:E,enabledAttributes:O,attributeDivisors:D,object:F,attributes:{},index:null}}function d(F,E,O,D){let R=r.attributes,B=E.attributes,b=0,P=O.getAttributes();for(let A in P)if(P[A].location>=0){let v=R[A],G=B[A];if(G===void 0&&(A==="instanceMatrix"&&F.instanceMatrix&&(G=F.instanceMatrix),A==="instanceColor"&&F.instanceColor&&(G=F.instanceColor)),v===void 0||v.attribute!==G||G&&v.data!==G.data)return!0;b++}return r.attributesNum!==b||r.index!==D}function p(F,E,O,D){let R={},B=E.attributes,b=0,P=O.getAttributes();for(let A in P)if(P[A].location>=0){let v=B[A];v===void 0&&(A==="instanceMatrix"&&F.instanceMatrix&&(v=F.instanceMatrix),A==="instanceColor"&&F.instanceColor&&(v=F.instanceColor));let G={};G.attribute=v,v&&v.data&&(G.data=v.data),R[A]=G,b++}r.attributes=R,r.attributesNum=b,r.index=D}function T(){let F=r.newAttributes;for(let E=0,O=F.length;E<O;E++)F[E]=0}function x(F){m(F,0)}function m(F,E){let O=r.newAttributes,D=r.enabledAttributes,R=r.attributeDivisors;O[F]=1,D[F]===0&&(n.enableVertexAttribArray(F),D[F]=1),R[F]!==E&&(n.vertexAttribDivisor(F,E),R[F]=E)}function M(){let F=r.newAttributes,E=r.enabledAttributes;for(let O=0,D=E.length;O<D;O++)E[O]!==F[O]&&(n.disableVertexAttribArray(O),E[O]=0)}function y(F,E,O,D,R,B,b){b===!0?n.vertexAttribIPointer(F,E,O,R,B):n.vertexAttribPointer(F,E,O,D,R,B)}function w(F,E,O,D){T();let R=D.attributes,B=O.getAttributes(),b=E.defaultAttributeValues;for(let P in B){let A=B[P];if(A.location>=0){let N=R[P];if(N===void 0&&(P==="instanceMatrix"&&F.instanceMatrix&&(N=F.instanceMatrix),P==="instanceColor"&&F.instanceColor&&(N=F.instanceColor)),N!==void 0){let v=N.normalized,G=N.itemSize,q=t.get(N);if(q===void 0)continue;let S=q.buffer,V=q.type,W=q.bytesPerElement,Z=V===n.INT||V===n.UNSIGNED_INT||N.gpuType===qa;if(N.isInterleavedBufferAttribute){let Y=N.data,j=Y.isInterleavedBuffer===!0?Y.stride:Y.itemSize,ct=N.offset;if(Y.isInstancedInterleavedBuffer||Y.isInstancedBufferAttribute){for(let ut=0;ut<A.locationSize;ut++)m(A.location+ut,Y.meshPerAttribute);F.isInstancedMesh!==!0&&D._maxInstanceCount===void 0&&(D._maxInstanceCount=Y.meshPerAttribute*Y.count)}else for(let ut=0;ut<A.locationSize;ut++)x(A.location+ut);n.bindBuffer(n.ARRAY_BUFFER,S);for(let ut=0;ut<A.locationSize;ut++)y(A.location+ut,G/A.locationSize,V,v,j*W,(ct+G/A.locationSize*ut)*W,Z)}else{if(N.isInstancedBufferAttribute){for(let Y=0;Y<A.locationSize;Y++)m(A.location+Y,N.meshPerAttribute);F.isInstancedMesh!==!0&&D._maxInstanceCount===void 0&&(D._maxInstanceCount=N.meshPerAttribute*N.count)}else for(let Y=0;Y<A.locationSize;Y++)x(A.location+Y);n.bindBuffer(n.ARRAY_BUFFER,S);for(let Y=0;Y<A.locationSize;Y++)y(A.location+Y,G/A.locationSize,V,v,G*W,G/A.locationSize*Y*W,Z)}}else if(b!==void 0){let v=b[P];if(v!==void 0)switch(v.length){case 2:n.vertexAttrib2fv(A.location,v);break;case 3:n.vertexAttrib3fv(A.location,v);break;case 4:n.vertexAttrib4fv(A.location,v);break;default:n.vertexAttrib1fv(A.location,v)}}}}M()}function I(){U();for(let F in i){let E=i[F];for(let O in E){let D=E[O];for(let R in D){let B=D[R];for(let b in B)u(B[b].object),delete B[b];delete D[R]}}delete i[F]}}function L(F){if(i[F.id]===void 0)return;let E=i[F.id];for(let O in E){let D=E[O];for(let R in D){let B=D[R];for(let b in B)u(B[b].object),delete B[b];delete D[R]}}delete i[F.id]}function g(F){for(let E in i){let O=i[E];for(let D in O){let R=O[D];if(R[F.id]===void 0)continue;let B=R[F.id];for(let b in B)u(B[b].object),delete B[b];delete R[F.id]}}}function _(F){for(let E in i){let O=i[E],D=F.isInstancedMesh===!0?F.id:0,R=O[D];if(R!==void 0){for(let B in R){let b=R[B];for(let P in b)u(b[P].object),delete b[P];delete R[B]}delete O[D],Object.keys(O).length===0&&delete i[E]}}}function U(){C(),a=!0,r!==s&&(r=s,c(r.object))}function C(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:o,reset:U,resetDefaultState:C,dispose:I,releaseStatesOfGeometry:L,releaseStatesOfObject:_,releaseStatesOfProgram:g,initAttributes:T,enableAttribute:x,disableUnusedAttributes:M}}function hg(n,t,e){let i;function s(l){i=l}function r(l,c){n.drawArrays(i,l,c),e.update(c,i,1)}function a(l,c,u){u!==0&&(n.drawArraysInstanced(i,l,c,u),e.update(c,i,u))}function o(l,c,u){if(u===0)return;t.get("WEBGL_multi_draw").multiDrawArraysWEBGL(i,l,0,c,0,u);let h=0;for(let d=0;d<u;d++)h+=c[d];e.update(h,i,1)}this.setMode=s,this.render=r,this.renderInstances=a,this.renderMultiDraw=o}function ug(n,t,e,i){let s;function r(){if(s!==void 0)return s;if(t.has("EXT_texture_filter_anisotropic")===!0){let g=t.get("EXT_texture_filter_anisotropic");s=n.getParameter(g.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function a(g){return!(g!==Nn&&i.convert(g)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(g){let _=g===Ln&&(t.has("EXT_color_buffer_half_float")||t.has("EXT_color_buffer_float"));return!(g!==tn&&g!==Pn&&!_&&i.convert(g)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_TYPE))}function l(g){if(g==="highp"){if(n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.HIGH_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.HIGH_FLOAT).precision>0)return"highp";g="mediump"}return g==="mediump"&&n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.MEDIUM_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=e.precision!==void 0?e.precision:"highp",u=l(c);u!==c&&(Gt("WebGLRenderer:",c,"not supported, using",u,"instead."),c=u);let f=e.reversedDepthBuffer===!0&&t.has("EXT_clip_control"),h=e.logarithmicDepthBuffer===!0&&f===!1;e.reversedDepthBuffer===!0&&f===!1&&Gt("WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer."),e.logarithmicDepthBuffer===!0&&f===!0&&Gt("WebGLRenderer: Logarithmic depth buffer is ignored when reversed depth buffer is enabled.");let d=n.getParameter(n.MAX_TEXTURE_IMAGE_UNITS),p=n.getParameter(n.MAX_VERTEX_TEXTURE_IMAGE_UNITS),T=n.getParameter(n.MAX_TEXTURE_SIZE),x=n.getParameter(n.MAX_CUBE_MAP_TEXTURE_SIZE),m=n.getParameter(n.MAX_VERTEX_ATTRIBS),M=n.getParameter(n.MAX_VERTEX_UNIFORM_VECTORS),y=n.getParameter(n.MAX_VARYING_VECTORS),w=n.getParameter(n.MAX_FRAGMENT_UNIFORM_VECTORS),I=n.getParameter(n.MAX_SAMPLES),L=n.getParameter(n.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:l,textureFormatReadable:a,textureTypeReadable:o,precision:c,logarithmicDepthBuffer:h,reversedDepthBuffer:f,maxTextures:d,maxVertexTextures:p,maxTextureSize:T,maxCubemapSize:x,maxAttributes:m,maxVertexUniforms:M,maxVaryings:y,maxFragmentUniforms:w,maxSamples:I,samples:L}}function dg(n){let t=this,e=null,i=0,s=!1,r=!1,a=new Cn,o=new Ht,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(f,h){let d=f.length!==0||h||i!==0||s;return s=h,i=f.length,d},this.beginShadows=function(){r=!0,u(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(f,h){e=u(f,h,0)},this.setState=function(f,h,d){let p=f.clippingPlanes,T=f.clipIntersection,x=f.clipShadows,m=n.get(f);if(!s||p===null||p.length===0||r&&!x)r?u(null):c();else{let M=r?0:i,y=M*4,w=m.clippingState||null;l.value=w,w=u(p,h,y,d);for(let I=0;I!==y;++I)w[I]=e[I];m.clippingState=w,this.numIntersection=T?this.numPlanes:0,this.numPlanes+=M}};function c(){l.value!==e&&(l.value=e,l.needsUpdate=i>0),t.numPlanes=i,t.numIntersection=0}function u(f,h,d,p){let T=f!==null?f.length:0,x=null;if(T!==0){if(x=l.value,p!==!0||x===null){let m=d+T*4,M=h.matrixWorldInverse;o.getNormalMatrix(M),(x===null||x.length<m)&&(x=new Float32Array(m));for(let y=0,w=d;y!==T;++y,w+=4)a.copy(f[y]).applyMatrix4(M,o),a.normal.toArray(x,w),x[w+3]=a.constant}l.value=x,l.needsUpdate=!0}return t.numPlanes=T,t.numIntersection=0,x}}var Rr=class extends ln{constructor(t=1,e={}){super(t,t,e),this.isWebGLCubeRenderTarget=!0;let i={width:t,height:t,depth:1},s=[i,i,i,i,i,i];this.texture=new lr(s),this._setTextureOptions(e),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(t,e){this.texture.type=e.type,this.texture.colorSpace=e.colorSpace,this.texture.generateMipmaps=e.generateMipmaps,this.texture.minFilter=e.minFilter,this.texture.magFilter=e.magFilter;let i={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},s=new Mi(5,5,5),r=new Hn({name:"CubemapFromEquirect",uniforms:Zi(i.uniforms),vertexShader:i.vertexShader,fragmentShader:i.fragmentShader,side:Ze,blending:qi});r.uniforms.tEquirect.value=e;let a=new je(s,r),o=e.minFilter;return e.minFilter===si&&(e.minFilter=Xe),new Rs(1,10,this).update(t,a),e.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(t,e=!0,i=!0,s=!0){let r=t.getRenderTarget();for(let a=0;a<6;a++)t.setRenderTarget(this,a),t.clear(e,i,s);t.setRenderTarget(r)}},ld=256,fg=3,pg=20,Pd=256,Ld=16,mg=3,gg=new nt,xg=new Zt,Us=class n{constructor(t){this._renderer=t,this._cubeSize=0,this._sourceTarget=null,this._cubeCamera=new Rs(1,10,null),this._boxMesh=new je(new Mi(5,5,5),null),this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null,this._integrationMaterial=null}fromScene(t,e=0,i=.1,s=100,r={}){let{size:a=256,position:o=gg}=r,l=this._renderer;this._setSize(a);let c=this._allocateTarget(),u=this._getSourceTarget(!0);e>0&&(u.texture.mipmapsAutoUpdate=!1);let f=l.autoClear,h=l.autoClearColor,d=l.autoClearDepth,p=l.autoClearStencil,T=t.background;l.autoClear=!0,l.autoClearColor=!0,l.autoClearDepth=!0,l.autoClearStencil=!0,T===null&&(t.background=l.getClearColor(xg));let x=new Rs(i,s,u);return x.position.copy(o),x.update(l,t),l.autoClear=f,l.autoClearColor=h,l.autoClearDepth=d,l.autoClearStencil=p,t.background=T,e>0&&(u.texture.mipmapsAutoUpdate=!0,this._blur(c,e)),this._applyPMREM(c),c}fromEquirectangular(t,e=null){return this._fromTexture(t,e)}fromCubemap(t,e=null){return this._fromTexture(t,e)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=ud(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=hd(),this._compileMaterial(this._equirectMaterial))}dispose(){this._sourceTarget!==null&&this._sourceTarget.dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._integrationMaterial!==null&&this._integrationMaterial.dispose(),this._boxMesh.geometry.dispose()}static lodToRoughness(t,e){return e>0?1-Math.sqrt(1-t/e):0}_setSize(t){this._cubeSize=Math.max(ld,id(t))}_fromTexture(t,e){t.mapping===Yi||t.mapping===Ls?this._setSize(t.image.length===0?ld:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4);let i=e||this._allocateTarget();return this._textureToCubemap(t),this._applyPMREM(i),i}_allocateTarget(){let t=this._cubeSize,e=cd(t,!1,!1),i=Math.log2(t)-fg;for(let s=0;s<=i;s++)e.texture.mipmaps.push({width:t>>s,height:t>>s});return e.texture.name="PMREM",e.texture.isPMREMTexture=!0,e}_getSourceTarget(t=!1){let e=this._cubeSize,i=this._sourceTarget;return(i===null||i.width!==e||t&&i.depthBuffer===!1)&&(i!==null&&i.dispose(),this._sourceTarget=cd(e,!0,t)),this._sourceTarget}_compileMaterial(t){this._boxMesh.material=t,this._renderer.compile(this._boxMesh,this._cubeCamera.children[0])}_renderCube(t,e,i){let s=this._boxMesh,r=this._cubeCamera;s.material=i,r.renderTarget=t,r.activeMipmapLevel=e;let a=t.width>>e;t.viewport.set(0,0,a,a),r.update(this._renderer,s),t.viewport.set(0,0,t.width,t.height)}_textureToCubemap(t){let e;t.mapping===Yi||t.mapping===Ls?(this._cubemapMaterial===null&&(this._cubemapMaterial=ud()),e=this._cubemapMaterial,e.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):(this._equirectMaterial===null&&(this._equirectMaterial=hd()),e=this._equirectMaterial),e.uniforms.envMap.value=t,this._renderCube(this._getSourceTarget(),0,e)}_applyPMREM(t){this._ggxMaterial===null&&(this._ggxMaterial=yg(),this._integrationMaterial=_g());let e=this._cubeSize,i=t.texture.mipmaps.length-1,s=this._ggxMaterial.uniforms;s.envMap.value=this._sourceTarget.texture;let r=this._integrationMaterial.uniforms;r.envMap.value=this._sourceTarget.texture,r.sourceLod.value=Math.log2(e/Ld);for(let a=0;a<=i;a++){let o=n.lodToRoughness(a,i);if(a>i-mg)r.roughness.value=o,this._renderCube(t,a,this._integrationMaterial);else{let l=o>0?Math.log2(e)+.5*Math.log2(6/(Pd*Math.pow(o,4)))+.5:0;s.roughness.value=o,s.lodBias.value=l,this._renderCube(t,a,this._ggxMaterial)}}}_blur(t,e){this._blurMaterial===null&&(this._blurMaterial=vg());let i=this._blurMaterial,s=i.uniforms,r=this._sourceTarget;s.sigma.value=Math.min(e,Math.PI)/Math.SQRT2,s.envMap.value=r.texture,this._renderCube(t,0,i),s.envMap.value=t.texture,this._renderCube(r,0,i)}};function cd(n,t,e){return new Rr(n,{minFilter:si,generateMipmaps:t,type:Ln,colorSpace:er,depthBuffer:e})}function Ir(n,t,e){return new Hn({name:n,uniforms:t,vertexShader:Kt.cube_vert,fragmentShader:e,side:Ze,blending:qi,depthTest:!1,depthWrite:!1})}function yg(){return Ir("PMREMGGXConvolution",{envMap:{value:null},roughness:{value:0},lodBias:{value:0}},`

		#define GGX_SAMPLES ${Pd}u

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
	`)}function _g(){return Ir("PMREMGGXIntegration",{envMap:{value:null},roughness:{value:0},sourceLod:{value:0},sourceSize:{value:Ld}},`

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
	`)}function vg(){return Ir("PMREMSphericalGaussianBlur",{envMap:{value:null},sigma:{value:0}},`

		#define SAMPLES ${pg}
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
	`)}function hd(){return Ir("PMREMEquirectangularToCubemap",{envMap:{value:null}},`

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
	`)}function ud(){return Ir("PMREMCubemapToCubemap",{envMap:{value:null},flipEnvMap:{value:-1}},`

		varying vec3 vWorldDirection;

		uniform samplerCube envMap;
		uniform float flipEnvMap;

		void main() {

			gl_FragColor = vec4( textureCube( envMap, vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) ).rgb, 1.0 );

		}
	`)}function Mg(n){let t=new WeakMap,e=new WeakMap,i=null;function s(h,d=!1){return h==null?null:d?a(h):r(h)}function r(h){if(h&&h.isTexture){let d=h.mapping;if(d===Va||d===Ha)if(t.has(h)){let p=t.get(h).texture;return o(p,h.mapping)}else{let p=h.image;if(p&&p.height>0){let T=new Rr(p.height);return T.fromEquirectangularTexture(n,h),t.set(h,T),h.addEventListener("dispose",c),o(T.texture,h.mapping)}else return null}}return h}function a(h){if(h&&h.isTexture&&h.isPMREMTexture!==!0){let d=h.mapping,p=d===Va||d===Ha,T=d===Yi||d===Ls;if(p||T){let x=e.get(h),m=x!==void 0?x.texture.pmremVersion:0;if(h.isRenderTargetTexture&&h.pmremVersion!==m)return i===null&&(i=new Us(n)),x=p?i.fromEquirectangular(h,x):i.fromCubemap(h,x),x.texture.pmremVersion=h.pmremVersion,e.set(h,x),x.texture;if(x!==void 0)return x.texture;{let M=h.image;return p&&M&&M.height>0||T&&M&&l(M)?(i===null&&(i=new Us(n)),x=p?i.fromEquirectangular(h):i.fromCubemap(h),x.texture.pmremVersion=h.pmremVersion,e.set(h,x),h.addEventListener("dispose",u),x.texture):null}}}return h}function o(h,d){return d===Va?h.mapping=Yi:d===Ha&&(h.mapping=Ls),h}function l(h){let d=0,p=6;for(let T=0;T<p;T++)h[T]!==void 0&&d++;return d===p}function c(h){let d=h.target;d.removeEventListener("dispose",c);let p=t.get(d);p!==void 0&&(t.delete(d),p.dispose())}function u(h){let d=h.target;d.removeEventListener("dispose",u);let p=e.get(d);p!==void 0&&(e.delete(d),p.dispose())}function f(){t=new WeakMap,e=new WeakMap,i!==null&&(i.dispose(),i=null)}return{get:s,dispose:f}}function Sg(n){let t={};function e(i){if(t[i]!==void 0)return t[i];let s=n.getExtension(i);return t[i]=s,s}return{has:function(i){return e(i)!==null},init:function(){e("EXT_color_buffer_float"),e("WEBGL_clip_cull_distance"),e("OES_texture_float_linear"),e("EXT_color_buffer_half_float"),e("WEBGL_multisampled_render_to_texture"),e("WEBGL_render_shared_exponent")},get:function(i){let s=e(i);return s===null&&js("WebGLRenderer: "+i+" extension not supported."),s}}}function bg(n,t,e,i){let s={},r=new WeakMap,a=new FinalizationRegistry(p=>delete s[p]);function o(p){l(p.target)}function l(p){p.index!==null&&t.remove(p.index);for(let x in p.attributes)t.remove(p.attributes[x]);p.removeEventListener("dispose",o),delete s[p.id],a.unregister(p);let T=r.get(p);T&&(t.remove(T),r.delete(p)),i.releaseStatesOfGeometry(p),p.isInstancedBufferGeometry===!0&&delete p._maxInstanceCount,e.memory.geometries--}function c(p,T){return s[T.id]!==void 0||(T.addEventListener("dispose",o),s[T.id]=new WeakRef(T),a.register(T,T.id,T),e.memory.geometries++),T}function u(p){let T=p.attributes;for(let x in T)t.update(T[x],n.ARRAY_BUFFER)}function f(p){let T=p.index,x=p.attributes.position,m=0;if(x===void 0)return;let M=T!==null?T.array.length:x.array.length/3-1,y=x.count>=65535?ar:rr,w=new y(Math.ceil(M/3)*6,1),I=w.array;if(T!==null){let g=T.array;m=T.version;for(let _=0,U=0;_<M;_+=3){let C=g[_+0],F=g[_+1],E=g[_+2];I[U++]=C,I[U++]=F,I[U++]=F,I[U++]=E,I[U++]=E,I[U++]=C}}else{m=x.version;for(let g=0,_=0;g<M;g+=3){let U=g+0,C=g+1,F=g+2;I[_++]=U,I[_++]=C,I[_++]=C,I[_++]=F,I[_++]=F,I[_++]=U}}w.version=m;let L=r.get(p);L&&t.remove(L),r.set(p,w)}function h(p){let T=r.get(p);if(T){let x=p.index;x!==null&&T.version<x.version&&f(p)}else f(p);return r.get(p)}function d(){for(let p in s){let T=s[p].deref();T!==void 0&&l(T)}}return{get:c,update:u,getWireframeAttribute:h,dispose:d}}function wg(n,t,e){let i;function s(f){i=f}let r,a;function o(f){r=f.type,a=f.bytesPerElement}function l(f,h){n.drawElements(i,h,r,f*a),e.update(h,i,1)}function c(f,h,d){d!==0&&(n.drawElementsInstanced(i,h,r,f*a,d),e.update(h,i,d))}function u(f,h,d){if(d===0)return;t.get("WEBGL_multi_draw").multiDrawElementsWEBGL(i,h,0,r,f,0,d);let T=0;for(let x=0;x<d;x++)T+=h[x];e.update(T,i,1)}this.setMode=s,this.setIndex=o,this.render=l,this.renderInstances=c,this.renderMultiDraw=u}function Tg(n){let t={geometries:0,textures:0},e={frame:0,calls:0,triangles:0,points:0,lines:0};function i(r,a,o){switch(e.calls++,a){case n.TRIANGLES:e.triangles+=o*(r/3);break;case n.LINES:e.lines+=o*(r/2);break;case n.LINE_STRIP:e.lines+=o*(r-1);break;case n.LINE_LOOP:e.lines+=o*r;break;case n.POINTS:e.points+=o*r;break;default:Vt("WebGLInfo: Unknown draw mode:",a);break}}function s(){e.calls=0,e.triangles=0,e.points=0,e.lines=0}return{memory:t,render:e,programs:null,autoReset:!0,reset:s,update:i}}function Eg(n,t,e){let i=new WeakMap,s=new me;function r(a,o,l){let c=a.morphTargetInfluences,u=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,f=u!==void 0?u.length:0,h=i.get(o);if(h===void 0||h.count!==f){let U=function(){g.dispose(),i.delete(o),o.removeEventListener("dispose",U)};h!==void 0&&h.texture.dispose();let d=o.morphAttributes.position!==void 0,p=o.morphAttributes.normal!==void 0,T=o.morphAttributes.color!==void 0,x=o.morphAttributes.position||[],m=o.morphAttributes.normal||[],M=o.morphAttributes.color||[],y=0;d===!0&&(y=1),p===!0&&(y=2),T===!0&&(y=3);let w=o.attributes.position.count*y,I=1;w>t.maxTextureSize&&(I=Math.ceil(w/t.maxTextureSize),w=t.maxTextureSize);let L=new Float32Array(w*I*4*f),g=new sr(L,w,I,f);g.type=Pn,g.needsUpdate=!0;let _=y*4;for(let C=0;C<f;C++){let F=x[C],E=m[C],O=M[C],D=w*I*4*C;for(let R=0;R<F.count;R++){let B=R*_;d===!0&&(s.fromBufferAttribute(F,R),L[D+B+0]=s.x,L[D+B+1]=s.y,L[D+B+2]=s.z,L[D+B+3]=0),p===!0&&(s.fromBufferAttribute(E,R),L[D+B+4]=s.x,L[D+B+5]=s.y,L[D+B+6]=s.z,L[D+B+7]=0),T===!0&&(s.fromBufferAttribute(O,R),L[D+B+8]=s.x,L[D+B+9]=s.y,L[D+B+10]=s.z,L[D+B+11]=O.itemSize===4?s.w:1)}}h={count:f,texture:g,size:new Qt(w,I)},i.set(o,h),o.addEventListener("dispose",U)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)l.getUniforms().setValue(n,"morphTexture",a.morphTexture,e);else{let d=0;for(let T=0;T<c.length;T++)d+=c[T];let p=o.morphTargetsRelative?1:1-d;l.getUniforms().setValue(n,"morphTargetBaseInfluence",p),l.getUniforms().setValue(n,"morphTargetInfluences",c)}l.getUniforms().setValue(n,"morphTargetsTexture",h.texture,e),l.getUniforms().setValue(n,"morphTargetsTextureSize",h.size)}return{update:r}}function Ag(n,t,e,i,s){let r=new WeakMap;function a(c){let u=s.render.frame,f=c.geometry,h=t.get(c,f);if(r.get(h)!==u&&(t.update(h),r.set(h,u)),c.isInstancedMesh&&(c.hasEventListener("dispose",l)===!1&&c.addEventListener("dispose",l),r.get(c)!==u&&(e.update(c.instanceMatrix,n.ARRAY_BUFFER),c.instanceColor!==null&&e.update(c.instanceColor,n.ARRAY_BUFFER),r.set(c,u))),c.isSkinnedMesh){let d=c.skeleton;r.get(d)!==u&&(d.update(),r.set(d,u))}return h}function o(){r=new WeakMap}function l(c){let u=c.target;u.removeEventListener("dispose",l),i.releaseStatesOfObject(u),e.remove(u.instanceMatrix),u.instanceColor!==null&&e.remove(u.instanceColor)}return{update:a,dispose:o}}var Cg={[pc]:"LINEAR_TONE_MAPPING",[mc]:"REINHARD_TONE_MAPPING",[gc]:"CINEON_TONE_MAPPING",[xc]:"ACES_FILMIC_TONE_MAPPING",[_c]:"AGX_TONE_MAPPING",[vc]:"NEUTRAL_TONE_MAPPING",[yc]:"CUSTOM_TONE_MAPPING"};function Rg(n,t,e,i,s,r){let a=new ln(t,e,{type:n,depthBuffer:s,stencilBuffer:r,samples:i?4:0,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,resolveDepthBuffer:!1,resolveStencilBuffer:!1}),o=null,l=null,c=null,u=new yi;u.setAttribute("position",new _n([-1,3,0,-1,-1,0,3,-1,0],3)),u.setAttribute("uv",new _n([0,2,0,0,2,0],2));let f=new Ea({uniforms:{tDiffuse:{value:null}},vertexShader:`
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
			}`,depthTest:!1,depthWrite:!1}),h=new je(u,f),d=new pr(-1,1,1,-1,0,1),p=null,T=null,x=!1,m,M=null,y=[],w=!1;this.setSize=function(I,L){a.setSize(I,L),o!==null&&o.setSize(I,L),l!==null&&l.setSize(I,L);for(let g=0;g<y.length;g++){let _=y[g];_.setSize&&_.setSize(I,L)}},this.setEffects=function(I){y=I,w=y.length>0&&y[0].isRenderPass===!0;let L=a.width,g=a.height;y.length>0&&o===null&&(o=new ln(L,g,{type:Ln,depthBuffer:!1,stencilBuffer:!1}),l=new ln(L,g,{type:Ln,depthBuffer:!1,stencilBuffer:!1}));let _=s===!0&&y.some(U=>U.needsDepthTexture===!0);_!==(a.depthTexture!==null)&&(_===!0&&c===null&&(c=new ii(L,g),r===!0&&(c.format=ri,c.type=$i)),a.dispose(),a.depthTexture=_?c:null,a.resolveDepthBuffer=_,a.storeMultisampledDepthBuffer=_);for(let U=0;U<y.length;U++){let C=y[U];C.setSize&&C.setSize(L,g),_&&C.needsDepthTexture===!0&&C.setDepthTexture&&C.setDepthTexture(c)}},this.begin=function(I,L){if(x||I.toneMapping===Mn&&y.length===0)return!1;if(M=L,L!==null){let g=L.width,_=L.height;(a.width!==g||a.height!==_)&&this.setSize(g,_)}return w===!1&&I.setRenderTarget(a),m=I.toneMapping,I.toneMapping=Mn,!0},this.hasRenderPass=function(){return w},this.end=function(I,L){I.toneMapping=m,x=!0;let g=a,_=o;for(let U=0;U<y.length;U++){let C=y[U];C.enabled!==!1&&(C.render(I,_,g,L),C.needsSwap!==!1&&(g=_,_=_===o?l:o))}if(p!==I.outputColorSpace||T!==I.toneMapping){p=I.outputColorSpace,T=I.toneMapping,f.defines={},ee.getTransfer(p)===re&&(f.defines.SRGB_TRANSFER="");let U=Cg[T];U&&(f.defines[U]=""),f.needsUpdate=!0}f.uniforms.tDiffuse.value=g.texture,I.setRenderTarget(M),I.render(h,d),M=null,x=!1},this.isCompositing=function(){return x},this.dispose=function(){a.dispose(),o!==null&&o.dispose(),l!==null&&l.dispose(),u.dispose(),f.dispose()}}var Nd=new Ye,Dd=new ii(1,1),Ud=new cr(1),Od=new sr,Fd=new ba,kd=new lr,dd=[],fd=[],pd=new Float32Array(16),md=new Float32Array(9),gd=new Float32Array(4);function Os(n,t,e){let i=n[0];if(i<=0||i>0)return n;let s=t*e,r=dd[s];if(r===void 0&&(r=new Float32Array(s),dd[s]=r),t!==0){i.toArray(r,0);for(let a=1,o=0;a!==t;++a)o+=e,n[a].toArray(r,o)}return r}function Te(n,t){if(n.length!==t.length)return!1;for(let e=0,i=n.length;e<i;e++)if(n[e]!==t[e])return!1;return!0}function Ee(n,t){for(let e=0,i=t.length;e<i;e++)n[e]=t[e]}function Lo(n,t){let e=fd[t];e===void 0&&(e=new Int32Array(t),fd[t]=e);for(let i=0;i!==t;++i)e[i]=n.allocateTextureUnit();return e}function Ig(n,t){let e=this.cache;e[0]!==t&&(n.uniform1f(this.addr,t),e[0]=t)}function Pg(n,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(n.uniform2f(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Te(e,t))return;n.uniform2fv(this.addr,t),Ee(e,t)}}function Lg(n,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(n.uniform3f(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else if(t.r!==void 0)(e[0]!==t.r||e[1]!==t.g||e[2]!==t.b)&&(n.uniform3f(this.addr,t.r,t.g,t.b),e[0]=t.r,e[1]=t.g,e[2]=t.b);else{if(Te(e,t))return;n.uniform3fv(this.addr,t),Ee(e,t)}}function Ng(n,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(n.uniform4f(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Te(e,t))return;n.uniform4fv(this.addr,t),Ee(e,t)}}function Dg(n,t){let e=this.cache,i=t.elements;if(i===void 0){if(Te(e,t))return;n.uniformMatrix2fv(this.addr,!1,t),Ee(e,t)}else{if(Te(e,i))return;gd.set(i),n.uniformMatrix2fv(this.addr,!1,gd),Ee(e,i)}}function Ug(n,t){let e=this.cache,i=t.elements;if(i===void 0){if(Te(e,t))return;n.uniformMatrix3fv(this.addr,!1,t),Ee(e,t)}else{if(Te(e,i))return;md.set(i),n.uniformMatrix3fv(this.addr,!1,md),Ee(e,i)}}function Og(n,t){let e=this.cache,i=t.elements;if(i===void 0){if(Te(e,t))return;n.uniformMatrix4fv(this.addr,!1,t),Ee(e,t)}else{if(Te(e,i))return;pd.set(i),n.uniformMatrix4fv(this.addr,!1,pd),Ee(e,i)}}function Fg(n,t){let e=this.cache;e[0]!==t&&(n.uniform1i(this.addr,t),e[0]=t)}function kg(n,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(n.uniform2i(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Te(e,t))return;n.uniform2iv(this.addr,t),Ee(e,t)}}function Bg(n,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(n.uniform3i(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(Te(e,t))return;n.uniform3iv(this.addr,t),Ee(e,t)}}function zg(n,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(n.uniform4i(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Te(e,t))return;n.uniform4iv(this.addr,t),Ee(e,t)}}function Gg(n,t){let e=this.cache;e[0]!==t&&(n.uniform1ui(this.addr,t),e[0]=t)}function Vg(n,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(n.uniform2ui(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Te(e,t))return;n.uniform2uiv(this.addr,t),Ee(e,t)}}function Hg(n,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(n.uniform3ui(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(Te(e,t))return;n.uniform3uiv(this.addr,t),Ee(e,t)}}function Wg(n,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(n.uniform4ui(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Te(e,t))return;n.uniform4uiv(this.addr,t),Ee(e,t)}}function No(n){return n.version===0&&(n.compareFunction=Pc,n.needsUpdate=!0),n}function qg(n,t,e){let i=this.cache,s=e.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s);let r;this.type===n.SAMPLER_2D_SHADOW?r=No(Dd):r=Nd,e.setTexture2D(t||r,s)}function Xg(n,t,e){let i=this.cache,s=e.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),e.setTexture3D(t||Fd,s)}function Yg(n,t,e){let i=this.cache,s=e.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s);let r;this.type===n.SAMPLER_CUBE_SHADOW?r=No(Ud):r=kd,e.setTextureCube(t||r,s)}function $g(n,t,e){let i=this.cache,s=e.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),e.setTexture2DArray(t||Od,s)}function Zg(n){switch(n){case 5126:return Ig;case 35664:return Pg;case 35665:return Lg;case 35666:return Ng;case 35674:return Dg;case 35675:return Ug;case 35676:return Og;case 5124:case 35670:return Fg;case 35667:case 35671:return kg;case 35668:case 35672:return Bg;case 35669:case 35673:return zg;case 5125:return Gg;case 36294:return Vg;case 36295:return Hg;case 36296:return Wg;case 35678:case 36198:case 36298:case 36306:case 35682:return qg;case 35679:case 36299:case 36307:return Xg;case 35680:case 36300:case 36308:case 36293:return Yg;case 36289:case 36303:case 36311:case 36292:return $g}}function Kg(n,t){n.uniform1fv(this.addr,t)}function Jg(n,t){let e=Os(t,this.size,2);n.uniform2fv(this.addr,e)}function Qg(n,t){let e=Os(t,this.size,3);n.uniform3fv(this.addr,e)}function jg(n,t){let e=Os(t,this.size,4);n.uniform4fv(this.addr,e)}function tx(n,t){let e=Os(t,this.size,4);n.uniformMatrix2fv(this.addr,!1,e)}function ex(n,t){let e=Os(t,this.size,9);n.uniformMatrix3fv(this.addr,!1,e)}function nx(n,t){let e=Os(t,this.size,16);n.uniformMatrix4fv(this.addr,!1,e)}function ix(n,t){n.uniform1iv(this.addr,t)}function sx(n,t){n.uniform2iv(this.addr,t)}function rx(n,t){n.uniform3iv(this.addr,t)}function ax(n,t){n.uniform4iv(this.addr,t)}function ox(n,t){n.uniform1uiv(this.addr,t)}function lx(n,t){n.uniform2uiv(this.addr,t)}function cx(n,t){n.uniform3uiv(this.addr,t)}function hx(n,t){n.uniform4uiv(this.addr,t)}function ux(n,t,e){let i=this.cache,s=t.length,r=Lo(e,s);Te(i,r)||(n.uniform1iv(this.addr,r),Ee(i,r));let a;this.type===n.SAMPLER_2D_SHADOW?a=No(Dd):a=Nd;for(let o=0;o!==s;++o)e.setTexture2D(t[o]||a,r[o])}function dx(n,t,e){let i=this.cache,s=t.length,r=Lo(e,s);Te(i,r)||(n.uniform1iv(this.addr,r),Ee(i,r));for(let a=0;a!==s;++a)e.setTexture3D(t[a]||Fd,r[a])}function fx(n,t,e){let i=this.cache,s=t.length,r=Lo(e,s);Te(i,r)||(n.uniform1iv(this.addr,r),Ee(i,r));let a;this.type===n.SAMPLER_CUBE_SHADOW?a=No(Ud):a=kd;for(let o=0;o!==s;++o)e.setTextureCube(t[o]||a,r[o])}function px(n,t,e){let i=this.cache,s=t.length,r=Lo(e,s);Te(i,r)||(n.uniform1iv(this.addr,r),Ee(i,r));for(let a=0;a!==s;++a)e.setTexture2DArray(t[a]||Od,r[a])}function mx(n){switch(n){case 5126:return Kg;case 35664:return Jg;case 35665:return Qg;case 35666:return jg;case 35674:return tx;case 35675:return ex;case 35676:return nx;case 5124:case 35670:return ix;case 35667:case 35671:return sx;case 35668:case 35672:return rx;case 35669:case 35673:return ax;case 5125:return ox;case 36294:return lx;case 36295:return cx;case 36296:return hx;case 35678:case 36198:case 36298:case 36306:case 35682:return ux;case 35679:case 36299:case 36307:return dx;case 35680:case 36300:case 36308:case 36293:return fx;case 36289:case 36303:case 36311:case 36292:return px}}var Xc=class{constructor(t,e,i){this.id=t,this.addr=i,this.cache=[],this.type=e.type,this.setValue=Zg(e.type)}},Yc=class{constructor(t,e,i){this.id=t,this.addr=i,this.cache=[],this.type=e.type,this.size=e.size,this.setValue=mx(e.type)}},$c=class{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,e,i){let s=this.seq;for(let r=0,a=s.length;r!==a;++r){let o=s[r];o.setValue(t,e[o.id],i)}}},Wc=/(\w+)(\])?(\[|\.)?/g;function xd(n,t){n.seq.push(t),n.map[t.id]=t}function gx(n,t,e){let i=n.name,s=i.length;for(Wc.lastIndex=0;;){let r=Wc.exec(i),a=Wc.lastIndex,o=r[1],l=r[2]==="]",c=r[3];if(l&&(o=o|0),c===void 0||c==="["&&a+2===s){xd(e,c===void 0?new Xc(o,n,t):new Yc(o,n,t));break}else{let f=e.map[o];f===void 0&&(f=new $c(o),xd(e,f)),e=f}}}var Ds=class{constructor(t,e){this.seq=[],this.map={};let i=t.getProgramParameter(e,t.ACTIVE_UNIFORMS);for(let a=0;a<i;++a){let o=t.getActiveUniform(e,a),l=t.getUniformLocation(e,o.name);gx(o,l,this)}let s=[],r=[];for(let a of this.seq)a.type===t.SAMPLER_2D_SHADOW||a.type===t.SAMPLER_CUBE_SHADOW||a.type===t.SAMPLER_2D_ARRAY_SHADOW?s.push(a):r.push(a);s.length>0&&(this.seq=s.concat(r))}setValue(t,e,i,s){let r=this.map[e];r!==void 0&&r.setValue(t,i,s)}setOptional(t,e,i){let s=e[i];s!==void 0&&this.setValue(t,i,s)}static upload(t,e,i,s){for(let r=0,a=e.length;r!==a;++r){let o=e[r],l=i[o.id];l.needsUpdate!==!1&&o.setValue(t,l.value,s)}}static seqWithValue(t,e){let i=[];for(let s=0,r=t.length;s!==r;++s){let a=t[s];a.id in e&&i.push(a)}return i}};function yd(n,t,e){let i=n.createShader(t);return n.shaderSource(i,e),n.compileShader(i),i}var xx=37297,yx=0;function _x(n,t){let e=n.split(`
`),i=[],s=Math.max(t-6,0),r=Math.min(t+6,e.length);for(let a=s;a<r;a++){let o=a+1;i.push(`${o===t?">":" "} ${o}: ${e[a]}`)}return i.join(`
`)}var _d=new Ht;function vx(n){ee._getMatrix(_d,ee.workingColorSpace,n);let t=`mat3( ${_d.elements.map(e=>e.toFixed(4))} )`;switch(ee.getTransfer(n)){case nr:return[t,"LinearTransferOETF"];case re:return[t,"sRGBTransferOETF"];default:return Gt("WebGLProgram: Unsupported color space: ",n),[t,"LinearTransferOETF"]}}function vd(n,t,e){let i=n.getShaderParameter(t,n.COMPILE_STATUS),r=(n.getShaderInfoLog(t)||"").trim();if(i&&r==="")return"";let a=/ERROR: 0:(\d+)/.exec(r);if(a){let o=parseInt(a[1]);return e.toUpperCase()+`

`+r+`

`+_x(n.getShaderSource(t),o)}else return r}function Mx(n,t){let e=vx(t);return[`vec4 ${n}( vec4 value ) {`,`	return ${e[1]}( vec4( ${e[0]} * value.rgb, value.a ) );`,"}"].join(`
`)}var Sx={[pc]:"Linear",[mc]:"Reinhard",[gc]:"Cineon",[xc]:"ACESFilmic",[_c]:"AgX",[vc]:"Neutral",[yc]:"Custom"};function bx(n,t){let e=Sx[t];return e===void 0?(Gt("WebGLProgram: Unsupported toneMapping:",t),"vec3 "+n+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+n+"( vec3 color ) { return "+e+"ToneMapping( color ); }"}var Io=new nt;function wx(){ee.getLuminanceCoefficients(Io);let n=Io.x.toFixed(4),t=Io.y.toFixed(4),e=Io.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${n}, ${t}, ${e} );`,"	return dot( weights, rgb );","}"].join(`
`)}function Tx(n){return[n.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",n.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Cr).join(`
`)}function Ex(n){let t=[];for(let e in n){let i=n[e];i!==!1&&t.push("#define "+e+" "+i)}return t.join(`
`)}function Ax(n,t){let e={},i=n.getProgramParameter(t,n.ACTIVE_ATTRIBUTES);for(let s=0;s<i;s++){let r=n.getActiveAttrib(t,s),a=r.name,o=1;r.type===n.FLOAT_MAT2&&(o=2),r.type===n.FLOAT_MAT3&&(o=3),r.type===n.FLOAT_MAT4&&(o=4),e[a]={type:r.type,location:n.getAttribLocation(t,a),locationSize:o}}return e}function Cr(n){return n!==""}function Md(n,t){let e=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return n.replace(/NUM_SUN_LIGHTS/g,t.numSunLights).replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,e).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_SUN_LIGHT_SHADOWS/g,t.numSunLightShadows).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows).replace(/NUM_LIGHT_PROBE_GRIDS/g,t.numLightProbeGrids)}function Sd(n,t){return n.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}var Cx=/^[ \t]*#include +<([\w\d./]+)>/gm;function Zc(n){return n.replace(Cx,Rx)}function Rx(n,t){let e=Kt[t];if(e===void 0)throw new Error("THREE.WebGLProgram: Can not resolve #include <"+t+">");return Zc(e)}var Ix=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function bd(n){return n.replace(Ix,Px)}function Px(n,t,e,i){let s="";for(let r=parseInt(t);r<parseInt(e);r++)s+=i.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function wd(n){let t=`precision ${n.precision} float;
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
#define LOW_PRECISION`),t}var Lx={[yr]:"SHADOWMAP_TYPE_PCF",[Is]:"SHADOWMAP_TYPE_VSM"};function Nx(n){return Lx[n.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}var Dx={[Ls]:"ENVMAP_MODE_REFRACTION"};function Ux(n){return n.envMap===!1?"ENVMAP_MODE_REFLECTION":Dx[n.envMapMode]||"ENVMAP_MODE_REFLECTION"}var Ox={[fc]:"ENVMAP_BLENDING_MULTIPLY",[Gu]:"ENVMAP_BLENDING_MIX",[Vu]:"ENVMAP_BLENDING_ADD"};function Fx(n){return n.envMap===!1?"ENVMAP_BLENDING_NONE":Ox[n.combine]||"ENVMAP_BLENDING_NONE"}function kx(n,t,e,i){let s=n.getContext(),r=e.defines,a=e.vertexShader,o=e.fragmentShader,l=Nx(e),c=e.envMapPMREM===!0?"ENVMAP_TYPE_PMREM":"ENVMAP_TYPE_CUBE",u=Ux(e),f=Fx(e),h=Tx(e),d=Ex(r),p=s.createProgram(),T,x,m=e.glslVersion?"#version "+e.glslVersion+`
`:"";e.isRawShaderMaterial?(T=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,d].filter(Cr).join(`
`),T.length>0&&(T+=`
`),x=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,d].filter(Cr).join(`
`),x.length>0&&(x+=`
`)):(T=[wd(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,d,e.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",e.batching?"#define USE_BATCHING":"",e.batchingColor?"#define USE_BATCHING_COLOR":"",e.instancing?"#define USE_INSTANCING":"",e.instancingColor?"#define USE_INSTANCING_COLOR":"",e.instancingMorph?"#define USE_INSTANCING_MORPH":"",e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+u:"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.displacementMap?"#define USE_DISPLACEMENTMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.diffuseRoughnessMap?"#define USE_DIFFUSE_ROUGHNESSMAP":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.mapUv?"#define MAP_UV "+e.mapUv:"",e.alphaMapUv?"#define ALPHAMAP_UV "+e.alphaMapUv:"",e.lightMapUv?"#define LIGHTMAP_UV "+e.lightMapUv:"",e.aoMapUv?"#define AOMAP_UV "+e.aoMapUv:"",e.emissiveMapUv?"#define EMISSIVEMAP_UV "+e.emissiveMapUv:"",e.bumpMapUv?"#define BUMPMAP_UV "+e.bumpMapUv:"",e.normalMapUv?"#define NORMALMAP_UV "+e.normalMapUv:"",e.displacementMapUv?"#define DISPLACEMENTMAP_UV "+e.displacementMapUv:"",e.metalnessMapUv?"#define METALNESSMAP_UV "+e.metalnessMapUv:"",e.roughnessMapUv?"#define ROUGHNESSMAP_UV "+e.roughnessMapUv:"",e.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+e.anisotropyMapUv:"",e.clearcoatMapUv?"#define CLEARCOATMAP_UV "+e.clearcoatMapUv:"",e.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+e.clearcoatNormalMapUv:"",e.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+e.clearcoatRoughnessMapUv:"",e.diffuseRoughnessMapUv?"#define DIFFUSE_ROUGHNESSMAP_UV "+e.diffuseRoughnessMapUv:"",e.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+e.iridescenceMapUv:"",e.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+e.iridescenceThicknessMapUv:"",e.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+e.sheenColorMapUv:"",e.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+e.sheenRoughnessMapUv:"",e.specularMapUv?"#define SPECULARMAP_UV "+e.specularMapUv:"",e.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+e.specularColorMapUv:"",e.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+e.specularIntensityMapUv:"",e.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+e.transmissionMapUv:"",e.thicknessMapUv?"#define THICKNESSMAP_UV "+e.thicknessMapUv:"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexNormals?"#define HAS_NORMAL":"",e.vertexColors?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.flatShading?"#define FLAT_SHADED":"",e.skinning?"#define USE_SKINNING":"",e.morphTargets?"#define USE_MORPHTARGETS":"",e.morphNormals&&e.flatShading===!1?"#define USE_MORPHNORMALS":"",e.morphColors?"#define USE_MORPHCOLORS":"",e.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+e.morphTextureStride:"",e.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+e.morphTargetsCount:"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.sizeAttenuation?"#define USE_SIZEATTENUATION":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",e.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Cr).join(`
`),x=[wd(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,d,e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",e.map?"#define USE_MAP":"",e.matcap?"#define USE_MATCAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+c:"",e.envMap?"#define "+u:"",e.envMap?"#define "+f:"",e.envMapPMREM?"#define ENVMAP_MAX_LOD "+e.envMapMaxLod+".0":"",e.envMapPMREM?"#define ENVMAP_SIZE "+e.envMapSize+".0":"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.packedNormalMap?"#define USE_PACKED_NORMALMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoat?"#define USE_CLEARCOAT":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.diffuseRoughness?"#define USE_DIFFUSE_ROUGHNESS":"",e.diffuseRoughnessMap?"#define USE_DIFFUSE_ROUGHNESSMAP":"",e.dispersion?"#define USE_DISPERSION":"",e.retroreflection?"#define USE_RETROREFLECTION":"",e.iridescence?"#define USE_IRIDESCENCE":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaTest?"#define USE_ALPHATEST":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.sheen?"#define USE_SHEEN":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors||e.instancingColor?"#define USE_COLOR":"",e.vertexAlphas||e.batchingColor?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.gradientMap?"#define USE_GRADIENTMAP":"",e.flatShading?"#define FLAT_SHADED":"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",e.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",e.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",e.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",e.toneMapping!==Mn?"#define TONE_MAPPING":"",e.toneMapping!==Mn?Kt.tonemapping_pars_fragment:"",e.toneMapping!==Mn?bx("toneMapping",e.toneMapping):"",e.dithering?"#define DITHERING":"",e.opaque?"#define OPAQUE":"",Kt.colorspace_pars_fragment,Mx("linearToOutputTexel",e.outputColorSpace),wx(),e.useDepthPacking?"#define DEPTH_PACKING "+e.depthPacking:"",`
`].filter(Cr).join(`
`)),a=Zc(a),a=Md(a,e),a=Sd(a,e),o=Zc(o),o=Md(o,e),o=Sd(o,e),a=bd(a),o=bd(o),e.isRawShaderMaterial!==!0&&(m=`#version 300 es
`,T=[h,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+T,x=["#define varying in",e.glslVersion===Lc?"":"layout(location = 0) out highp vec4 pc_fragColor;",e.glslVersion===Lc?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+x);let M=m+T+a,y=m+x+o,w=yd(s,s.VERTEX_SHADER,M),I=yd(s,s.FRAGMENT_SHADER,y);s.attachShader(p,w),s.attachShader(p,I),e.index0AttributeName!==void 0?s.bindAttribLocation(p,0,e.index0AttributeName):e.hasPositionAttribute===!0&&s.bindAttribLocation(p,0,"position"),s.linkProgram(p);function L(C){if(n.debug.checkShaderErrors){let F=s.getProgramInfoLog(p)||"",E=s.getShaderInfoLog(w)||"",O=s.getShaderInfoLog(I)||"",D=F.trim(),R=E.trim(),B=O.trim(),b=!0,P=!0;if(s.getProgramParameter(p,s.LINK_STATUS)===!1)if(b=!1,typeof n.debug.onShaderError=="function")n.debug.onShaderError(s,p,w,I);else{let A=vd(s,w,"vertex"),N=vd(s,I,"fragment");Vt("WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(p,s.VALIDATE_STATUS)+`

Material Name: `+C.name+`
Material Type: `+C.type+`

Program Info Log: `+D+`
`+A+`
`+N)}else D!==""?Gt("WebGLProgram: Program Info Log:",D):(R===""||B==="")&&(P=!1);P&&(C.diagnostics={runnable:b,programLog:D,vertexShader:{log:R,prefix:T},fragmentShader:{log:B,prefix:x}})}s.deleteShader(w),s.deleteShader(I),g=new Ds(s,p),_=Ax(s,p)}let g;this.getUniforms=function(){return g===void 0&&L(this),g};let _;this.getAttributes=function(){return _===void 0&&L(this),_};let U=e.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return U===!1&&(U=s.getProgramParameter(p,xx)),U},this.destroy=function(){i.releaseStatesOfProgram(this),s.deleteProgram(p),this.program=void 0},this.type=e.shaderType,this.name=e.shaderName,this.id=yx++,this.cacheKey=t,this.usedTimes=1,this.program=p,this.vertexShader=w,this.fragmentShader=I,this}var Bx=0,Kc=class{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t,e,i){let s=this._getShaderCacheForMaterial(t);return s.has(e)===!1&&(s.add(e),e.usedTimes++),s.has(i)===!1&&(s.add(i),i.usedTimes++),this}remove(t){let e=this.materialCache.get(t);for(let i of e)i.usedTimes--,i.usedTimes===0&&this.shaderCache.delete(i.code);return this.materialCache.delete(t),this}getVertexShaderStage(t){return this._getShaderStage(t.vertexShader)}getFragmentShaderStage(t){return this._getShaderStage(t.fragmentShader)}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){let e=this.materialCache,i=e.get(t);return i===void 0&&(i=new Set,e.set(t,i)),i}_getShaderStage(t){let e=this.shaderCache,i=e.get(t);return i===void 0&&(i=new Jc(t),e.set(t,i)),i}},Jc=class{constructor(t){this.id=Bx++,this.code=t,this.usedTimes=0}};function zx(n){return n===Ai||n===wr||n===Tr}function Gx(n,t,e,i,s,r){let a=new ws,o=new Kc,l=new Set,c=[],u=new Map,f=i.logarithmicDepthBuffer,h={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function d(g){return l.add(g),g===0?"uv":`uv${g}`}function p(g,_,U,C,F,E){let O=C.fog,D=F.geometry,R=g.isMeshStandardMaterial||g.isMeshLambertMaterial||g.isMeshPhongMaterial?C.environment:null,B=g.isMeshStandardMaterial||g.isMeshLambertMaterial&&!g.envMap||g.isMeshPhongMaterial&&!g.envMap,b=t.get(g.envMap||R,B),P=h[g.type],A=i.precision;g.precision!==null&&(A=i.getMaxPrecision(g.precision),A!==g.precision&&Gt("WebGLProgram.getParameters:",g.precision,"not supported, using",A,"instead."));let N=D.morphAttributes.position||D.morphAttributes.normal||D.morphAttributes.color,v=N!==void 0?N.length:0,G=0;D.morphAttributes.position!==void 0&&(G=1),D.morphAttributes.normal!==void 0&&(G=2),D.morphAttributes.color!==void 0&&(G=3);let q,S,V,W;if(P){let bt=qn[P];q=bt.vertexShader,S=bt.fragmentShader}else{q=g.vertexShader,S=g.fragmentShader;let bt=o.getVertexShaderStage(g),ae=o.getFragmentShaderStage(g);o.update(g,bt,ae),V=bt.id,W=ae.id}let Z=n.getRenderTarget(),Y=n.state.buffers.depth.getReversed(),j=F.isInstancedMesh===!0,ct=F.isBatchedMesh===!0,ut=!!g.map,ht=!!g.matcap,Rt=!!b,Ut=Rt&&b.isPMREMTexture===!0,Ft=!!g.aoMap,Jt=!!g.lightMap,ce=!!g.bumpMap&&g.wireframe===!1,ge=!!g.normalMap,On=!!g.displacementMap,Ae=!!g.emissiveMap,hn=!!g.metalnessMap,un=!!g.roughnessMap,dn=g.anisotropy>0,K=g.clearcoat>0,fn=g.diffuseRoughness>0,fe=g.dispersion>0,pe=g.retroreflectivity>0,St=g.iridescence>0,we=g.sheen>0,Bt=g.transmission>0,Wt=dn&&!!g.anisotropyMap,H=K&&!!g.clearcoatMap,k=K&&!!g.clearcoatNormalMap,Q=K&&!!g.clearcoatRoughnessMap,dt=fn&&!!g.diffuseRoughnessMap,lt=St&&!!g.iridescenceMap,mt=St&&!!g.iridescenceThicknessMap,vt=we&&!!g.sheenColorMap,rt=we&&!!g.sheenRoughnessMap,at=!!g.specularMap,xt=!!g.specularColorMap,X=!!g.specularIntensityMap,ot=Bt&&!!g.transmissionMap,it=Bt&&!!g.thicknessMap,yt=!!g.gradientMap,pt=!!g.alphaMap,gt=g.alphaTest>0,Ot=!!g.alphaHash,$t=!!g.extensions,ft=Mn;g.toneMapped&&(Z===null||Z.isXRRenderTarget===!0)&&(ft=n.toneMapping);let kt=Ut?b.isCompressedCubeTexture?b.image[0].mipmaps:b.mipmaps:null,Yt={shaderID:P,shaderType:g.type,shaderName:g.name,vertexShader:q,fragmentShader:S,defines:g.defines,customVertexShaderID:V,customFragmentShaderID:W,isRawShaderMaterial:g.isRawShaderMaterial===!0,glslVersion:g.glslVersion,precision:A,batching:ct,batchingColor:ct&&F._colorsTexture!==null,instancing:j,instancingColor:j&&F.instanceColor!==null,instancingMorph:j&&F.morphTexture!==null,outputColorSpace:Z===null?n.outputColorSpace:Z.isXRRenderTarget===!0?Z.texture.colorSpace:ee.workingColorSpace,alphaToCoverage:!!g.alphaToCoverage,map:ut,matcap:ht,envMap:Rt,envMapMode:Rt&&b.mapping,envMapPMREM:Ut,envMapMaxLod:Ut?kt.length-1:null,envMapSize:Ut?kt[0].width:null,aoMap:Ft,lightMap:Jt,bumpMap:ce,normalMap:ge,displacementMap:On,emissiveMap:Ae,normalMapObjectSpace:ge&&g.normalMapType===qu,normalMapTangentSpace:ge&&g.normalMapType===Co,packedNormalMap:ge&&g.normalMapType===Co&&zx(g.normalMap.format),metalnessMap:hn,roughnessMap:un,anisotropy:dn,anisotropyMap:Wt,clearcoat:K,clearcoatMap:H,clearcoatNormalMap:k,clearcoatRoughnessMap:Q,diffuseRoughness:fn,diffuseRoughnessMap:dt,dispersion:fe,retroreflection:pe,iridescence:St,iridescenceMap:lt,iridescenceThicknessMap:mt,sheen:we,sheenColorMap:vt,sheenRoughnessMap:rt,specularMap:at,specularColorMap:xt,specularIntensityMap:X,transmission:Bt,transmissionMap:ot,thicknessMap:it,gradientMap:yt,opaque:g.transparent===!1&&g.blending===Ps&&g.alphaToCoverage===!1,alphaMap:pt,alphaTest:gt,alphaHash:Ot,combine:g.combine,mapUv:ut&&d(g.map.channel),aoMapUv:Ft&&d(g.aoMap.channel),lightMapUv:Jt&&d(g.lightMap.channel),bumpMapUv:ce&&d(g.bumpMap.channel),normalMapUv:ge&&d(g.normalMap.channel),displacementMapUv:On&&d(g.displacementMap.channel),emissiveMapUv:Ae&&d(g.emissiveMap.channel),metalnessMapUv:hn&&d(g.metalnessMap.channel),roughnessMapUv:un&&d(g.roughnessMap.channel),anisotropyMapUv:Wt&&d(g.anisotropyMap.channel),clearcoatMapUv:H&&d(g.clearcoatMap.channel),clearcoatNormalMapUv:k&&d(g.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:Q&&d(g.clearcoatRoughnessMap.channel),diffuseRoughnessMapUv:dt&&d(g.diffuseRoughnessMap.channel),iridescenceMapUv:lt&&d(g.iridescenceMap.channel),iridescenceThicknessMapUv:mt&&d(g.iridescenceThicknessMap.channel),sheenColorMapUv:vt&&d(g.sheenColorMap.channel),sheenRoughnessMapUv:rt&&d(g.sheenRoughnessMap.channel),specularMapUv:at&&d(g.specularMap.channel),specularColorMapUv:xt&&d(g.specularColorMap.channel),specularIntensityMapUv:X&&d(g.specularIntensityMap.channel),transmissionMapUv:ot&&d(g.transmissionMap.channel),thicknessMapUv:it&&d(g.thicknessMap.channel),alphaMapUv:pt&&d(g.alphaMap.channel),vertexTangents:!!D.attributes.tangent&&(ge||dn),vertexNormals:!!D.attributes.normal,vertexColors:g.vertexColors,vertexAlphas:g.vertexColors===!0&&!!D.attributes.color&&D.attributes.color.itemSize===4,pointsUvs:F.isPoints===!0&&!!D.attributes.uv&&(ut||pt),fog:!!O,useFog:g.fog===!0,fogExp2:!!O&&O.isFogExp2,flatShading:g.wireframe===!1&&(g.flatShading===!0||D.attributes.normal===void 0&&ge===!1&&(g.isMeshLambertMaterial||g.isMeshPhongMaterial||g.isMeshStandardMaterial||g.isMeshPhysicalMaterial)),sizeAttenuation:g.sizeAttenuation===!0,logarithmicDepthBuffer:f,reversedDepthBuffer:Y,skinning:F.isSkinnedMesh===!0,hasPositionAttribute:D.attributes.position!==void 0,morphTargets:D.morphAttributes.position!==void 0,morphNormals:D.morphAttributes.normal!==void 0,morphColors:D.morphAttributes.color!==void 0,morphTargetsCount:v,morphTextureStride:G,numSunLights:_.sun.length,numDirLights:_.directional.length,numPointLights:_.point.length,numSpotLights:_.spot.length,numSpotLightMaps:_.spotLightMap.length,numRectAreaLights:_.rectArea.length,numHemiLights:_.hemi.length,numSunLightShadows:_.sunShadowMap.length,numDirLightShadows:_.directionalShadowMap.length,numPointLightShadows:_.pointShadowMap.length,numSpotLightShadows:_.spotShadowMap.length,numSpotLightShadowsWithMaps:_.numSpotLightShadowsWithMaps,numLightProbes:_.numLightProbes,numLightProbeGrids:E.filter(bt=>bt.texture!==null).length,numClippingPlanes:r.numPlanes,numClipIntersection:r.numIntersection,dithering:g.dithering,shadowMapEnabled:n.shadowMap.enabled&&U.length>0,shadowMapType:n.shadowMap.type,toneMapping:ft,decodeVideoTexture:ut&&g.map.isVideoTexture===!0&&ee.getTransfer(g.map.colorSpace)===re,decodeVideoTextureEmissive:Ae&&g.emissiveMap.isVideoTexture===!0&&ee.getTransfer(g.emissiveMap.colorSpace)===re,premultipliedAlpha:g.premultipliedAlpha,doubleSided:g.side===vn,flipSided:g.side===Ze,useDepthPacking:g.depthPacking>=0,depthPacking:g.depthPacking||0,index0AttributeName:g.index0AttributeName,extensionClipCullDistance:$t&&g.extensions.clipCullDistance===!0&&e.has("WEBGL_clip_cull_distance"),extensionMultiDraw:($t&&g.extensions.multiDraw===!0||ct)&&e.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:e.has("KHR_parallel_shader_compile"),customProgramCacheKey:g.customProgramCacheKey()};return Yt.vertexUv1s=l.has(1),Yt.vertexUv2s=l.has(2),Yt.vertexUv3s=l.has(3),l.clear(),Yt}function T(g){let _=[];if(g.shaderID?_.push(g.shaderID):(_.push(g.customVertexShaderID),_.push(g.customFragmentShaderID)),g.defines!==void 0)for(let U in g.defines)_.push(U),_.push(g.defines[U]);return g.isRawShaderMaterial===!1&&(x(_,g),m(_,g),_.push(n.outputColorSpace)),_.push(g.customProgramCacheKey),_.join()}function x(g,_){g.push(_.precision),g.push(_.outputColorSpace),g.push(_.envMapMode),g.push(_.envMapPMREM),g.push(_.envMapMaxLod),g.push(_.envMapSize),g.push(_.mapUv),g.push(_.alphaMapUv),g.push(_.lightMapUv),g.push(_.aoMapUv),g.push(_.bumpMapUv),g.push(_.normalMapUv),g.push(_.displacementMapUv),g.push(_.emissiveMapUv),g.push(_.metalnessMapUv),g.push(_.roughnessMapUv),g.push(_.anisotropyMapUv),g.push(_.clearcoatMapUv),g.push(_.clearcoatNormalMapUv),g.push(_.clearcoatRoughnessMapUv),g.push(_.diffuseRoughnessMapUv),g.push(_.iridescenceMapUv),g.push(_.iridescenceThicknessMapUv),g.push(_.sheenColorMapUv),g.push(_.sheenRoughnessMapUv),g.push(_.specularMapUv),g.push(_.specularColorMapUv),g.push(_.specularIntensityMapUv),g.push(_.transmissionMapUv),g.push(_.thicknessMapUv),g.push(_.combine),g.push(_.fogExp2),g.push(_.sizeAttenuation),g.push(_.morphTargetsCount),g.push(_.numSunLights),g.push(_.numDirLights),g.push(_.numPointLights),g.push(_.numSpotLights),g.push(_.numSpotLightMaps),g.push(_.numHemiLights),g.push(_.numRectAreaLights),g.push(_.numSunLightShadows),g.push(_.numDirLightShadows),g.push(_.numPointLightShadows),g.push(_.numSpotLightShadows),g.push(_.numSpotLightShadowsWithMaps),g.push(_.numLightProbes),g.push(_.numLightProbeGrids),g.push(_.shadowMapType),g.push(_.toneMapping),g.push(_.numClippingPlanes),g.push(_.numClipIntersection),g.push(_.depthPacking)}function m(g,_){a.disableAll(),_.instancing&&a.enable(0),_.instancingColor&&a.enable(1),_.instancingMorph&&a.enable(2),_.matcap&&a.enable(3),_.envMap&&a.enable(4),_.normalMapObjectSpace&&a.enable(5),_.normalMapTangentSpace&&a.enable(6),_.clearcoat&&a.enable(7),_.iridescence&&a.enable(8),_.alphaTest&&a.enable(9),_.vertexColors&&a.enable(10),_.vertexAlphas&&a.enable(11),_.vertexUv1s&&a.enable(12),_.vertexUv2s&&a.enable(13),_.vertexUv3s&&a.enable(14),_.vertexTangents&&a.enable(15),_.anisotropy&&a.enable(16),_.alphaHash&&a.enable(17),_.batching&&a.enable(18),_.dispersion&&a.enable(19),_.retroreflection&&a.enable(24),_.diffuseRoughness&&a.enable(25),_.batchingColor&&a.enable(20),_.gradientMap&&a.enable(21),_.packedNormalMap&&a.enable(22),_.vertexNormals&&a.enable(23),g.push(a.mask),a.disableAll(),_.fog&&a.enable(0),_.useFog&&a.enable(1),_.flatShading&&a.enable(2),_.logarithmicDepthBuffer&&a.enable(3),_.reversedDepthBuffer&&a.enable(4),_.skinning&&a.enable(5),_.morphTargets&&a.enable(6),_.morphNormals&&a.enable(7),_.morphColors&&a.enable(8),_.premultipliedAlpha&&a.enable(9),_.shadowMapEnabled&&a.enable(10),_.doubleSided&&a.enable(11),_.flipSided&&a.enable(12),_.useDepthPacking&&a.enable(13),_.dithering&&a.enable(14),_.transmission&&a.enable(15),_.sheen&&a.enable(16),_.opaque&&a.enable(17),_.pointsUvs&&a.enable(18),_.decodeVideoTexture&&a.enable(19),_.decodeVideoTextureEmissive&&a.enable(20),_.alphaToCoverage&&a.enable(21),_.numLightProbeGrids>0&&a.enable(22),_.hasPositionAttribute&&a.enable(23),g.push(a.mask)}function M(g){let _=h[g.type],U;if(_){let C=qn[_];U=rd.clone(C.uniforms)}else U=g.uniforms;return U}function y(g,_){let U=u.get(_);return U!==void 0?++U.usedTimes:(U=new kx(n,_,g,s),c.push(U),u.set(_,U)),U}function w(g){if(--g.usedTimes===0){let _=c.indexOf(g);c[_]=c[c.length-1],c.pop(),u.delete(g.cacheKey),g.destroy()}}function I(g){o.remove(g)}function L(){o.dispose()}return{getParameters:p,getProgramCacheKey:T,getUniforms:M,acquireProgram:y,releaseProgram:w,releaseShaderCache:I,programs:c,dispose:L}}function Vx(){let n=new WeakMap;function t(a){return n.has(a)}function e(a){let o=n.get(a);return o===void 0&&(o={},n.set(a,o)),o}function i(a){n.delete(a)}function s(a,o,l){n.get(a)[o]=l}function r(){n=new WeakMap}return{has:t,get:e,remove:i,update:s,dispose:r}}function Hx(n,t){return n.groupOrder!==t.groupOrder?n.groupOrder-t.groupOrder:n.renderOrder!==t.renderOrder?n.renderOrder-t.renderOrder:n.material.id!==t.material.id?n.material.id-t.material.id:n.materialVariant!==t.materialVariant?n.materialVariant-t.materialVariant:n.z!==t.z?n.z-t.z:n.id-t.id}function Td(n,t){return n.groupOrder!==t.groupOrder?n.groupOrder-t.groupOrder:n.renderOrder!==t.renderOrder?n.renderOrder-t.renderOrder:n.z!==t.z?t.z-n.z:n.id-t.id}function Ed(){let n=[],t=0,e=[],i=[],s=[];function r(){t=0,e.length=0,i.length=0,s.length=0}function a(h){let d=0;return h.isInstancedMesh&&(d+=2),h.isSkinnedMesh&&(d+=1),d}function o(h,d,p,T,x,m){let M=n[t];return M===void 0?(M={id:h.id,object:h,geometry:d,material:p,materialVariant:a(h),groupOrder:T,renderOrder:h.renderOrder,z:x,group:m},n[t]=M):(M.id=h.id,M.object=h,M.geometry=d,M.material=p,M.materialVariant=a(h),M.groupOrder=T,M.renderOrder=h.renderOrder,M.z=x,M.group=m),t++,M}function l(h,d,p,T,x,m,M){M.reversedDepth===!0&&(x=-x);let y=o(h,d,p,T,x,m);p.transmission>0?i.push(y):p.transparent===!0?s.push(y):e.push(y)}function c(h,d,p,T,x,m){let M=o(h,d,p,T,x,m);p.transmission>0?i.unshift(M):p.transparent===!0?s.unshift(M):e.unshift(M)}function u(h,d){e.length>1&&e.sort(h||Hx),i.length>1&&i.sort(d||Td),s.length>1&&s.sort(d||Td)}function f(){for(let h=t,d=n.length;h<d;h++){let p=n[h];if(p.id===null)break;p.id=null,p.object=null,p.geometry=null,p.material=null,p.group=null}}return{opaque:e,transmissive:i,transparent:s,init:r,push:l,unshift:c,finish:f,sort:u}}function Wx(){let n=new WeakMap;function t(i,s){let r=n.get(i),a;return r===void 0?(a=new Ed,n.set(i,[a])):s>=r.length?(a=new Ed,r.push(a)):a=r[s],a}function e(){n=new WeakMap}return{get:t,dispose:e}}function qx(){let n={};return{get:function(t){if(n[t.id]!==void 0)return n[t.id];let e;switch(t.type){case"SunLight":case"DirectionalLight":e={direction:new nt,color:new Zt};break;case"SpotLight":e={position:new nt,direction:new nt,color:new Zt,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":e={position:new nt,color:new Zt,distance:0,decay:0};break;case"HemisphereLight":e={direction:new nt,skyColor:new Zt,groundColor:new Zt};break;case"RectAreaLight":e={color:new Zt,position:new nt,halfWidth:new nt,halfHeight:new nt};break}return n[t.id]=e,e}}}function Xx(){let n={};return{get:function(t){if(n[t.id]!==void 0)return n[t.id];let e;switch(t.type){case"SunLight":case"DirectionalLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Qt};break;case"SpotLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Qt};break;case"PointLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Qt,shadowCameraNear:1,shadowCameraFar:1e3};break}return n[t.id]=e,e}}}var Yx=0;function $x(n,t){return(t.castShadow?2:0)-(n.castShadow?2:0)+(t.map?1:0)-(n.map?1:0)}function Zx(n){let t=new qx,e=Xx(),i={version:0,hash:{sunLength:-1,directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numSunShadows:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],sun:[],sunShadow:[],sunShadowMap:[],sunShadowMatrix:[],sunShadowCascade:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)i.probe.push(new nt);let s=new nt,r=new de,a=new de;function o(c){let u=0,f=0,h=0;for(let E=0;E<9;E++)i.probe[E].set(0,0,0);let d=0,p=0,T=0,x=0,m=0,M=0,y=0,w=0,I=0,L=0,g=0,_=0,U=0,C=0;c.sort($x);for(let E=0,O=c.length;E<O;E++){let D=c[E],R=D.color,B=D.intensity,b=D.distance,P=null;if(D.shadow&&D.shadow.map&&(D.shadow.map.texture.format===Ai?P=D.shadow.map.texture:P=D.shadow.map.depthTexture||D.shadow.map.texture),D.isAmbientLight)u+=R.r*B,f+=R.g*B,h+=R.b*B;else if(D.isLightProbe){for(let A=0;A<9;A++)i.probe[A].addScaledVector(D.sh.coefficients[A],B);C++}else if(D.isSunLight){let A=t.get(D);if(A.color.copy(D.color).multiplyScalar(D.intensity),D.castShadow){let N=D.shadow,v=e.get(D);v.shadowIntensity=N.intensity,v.shadowBias=N.bias,v.shadowNormalBias=N.normalBias,v.shadowRadius=N.radius,v.shadowMapSize.copy(N.mapSize).multiply(N.getFrameExtents()),i.sunShadow[p]=v,i.sunShadowMap[p]=P;let G=N.getViewportCount();for(let q=0;q<G;q++)i.sunShadowMatrix[T+q]=N.getMatrix(q),i.sunShadowCascade[T+q]=N._cascadeData[q];T+=G,p++}i.sun[d]=A,d++}else if(D.isDirectionalLight){let A=t.get(D);if(A.color.copy(D.color).multiplyScalar(D.intensity),D.castShadow){let N=D.shadow,v=e.get(D);v.shadowIntensity=N.intensity,v.shadowBias=N.bias,v.shadowNormalBias=N.normalBias,v.shadowRadius=N.radius,v.shadowMapSize=N.mapSize,i.directionalShadow[x]=v,i.directionalShadowMap[x]=P,i.directionalShadowMatrix[x]=D.shadow.matrix,I++}i.directional[x]=A,x++}else if(D.isSpotLight){let A=t.get(D);A.position.setFromMatrixPosition(D.matrixWorld),A.color.copy(R).multiplyScalar(B),A.distance=b,A.coneCos=Math.cos(D.angle),A.penumbraCos=Math.cos(D.angle*(1-D.penumbra)),A.decay=D.decay,i.spot[M]=A;let N=D.shadow;if(D.map&&(i.spotLightMap[_]=D.map,_++,N.updateMatrices(D),D.castShadow&&U++),i.spotLightMatrix[M]=N.matrix,D.castShadow){let v=e.get(D);v.shadowIntensity=N.intensity,v.shadowBias=N.bias,v.shadowNormalBias=N.normalBias,v.shadowRadius=N.radius,v.shadowMapSize=N.mapSize,i.spotShadow[M]=v,i.spotShadowMap[M]=P,g++}M++}else if(D.isRectAreaLight){let A=t.get(D);A.color.copy(R).multiplyScalar(B),A.halfWidth.set(D.width*.5,0,0),A.halfHeight.set(0,D.height*.5,0),i.rectArea[y]=A,y++}else if(D.isPointLight){let A=t.get(D);if(A.color.copy(D.color).multiplyScalar(D.intensity),A.distance=D.distance,A.decay=D.decay,D.castShadow){let N=D.shadow,v=e.get(D);v.shadowIntensity=N.intensity,v.shadowBias=N.bias,v.shadowNormalBias=N.normalBias,v.shadowRadius=N.radius,v.shadowMapSize=N.mapSize,v.shadowCameraNear=N.camera.near,v.shadowCameraFar=N.camera.far,i.pointShadow[m]=v,i.pointShadowMap[m]=P,i.pointShadowMatrix[m]=D.shadow.matrix,L++}i.point[m]=A,m++}else if(D.isHemisphereLight){let A=t.get(D);A.skyColor.copy(D.color).multiplyScalar(B),A.groundColor.copy(D.groundColor).multiplyScalar(B),i.hemi[w]=A,w++}}y>0&&(n.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=wt.LTC_FLOAT_1,i.rectAreaLTC2=wt.LTC_FLOAT_2):(i.rectAreaLTC1=wt.LTC_HALF_1,i.rectAreaLTC2=wt.LTC_HALF_2)),i.ambient[0]=u,i.ambient[1]=f,i.ambient[2]=h;let F=i.hash;(F.sunLength!==d||F.directionalLength!==x||F.pointLength!==m||F.spotLength!==M||F.rectAreaLength!==y||F.hemiLength!==w||F.numSunShadows!==p||F.numDirectionalShadows!==I||F.numPointShadows!==L||F.numSpotShadows!==g||F.numSpotMaps!==_||F.numLightProbes!==C)&&(i.sun.length=d,i.directional.length=x,i.spot.length=M,i.rectArea.length=y,i.point.length=m,i.hemi.length=w,i.sunShadow.length=p,i.sunShadowMap.length=p,i.sunShadowMatrix.length=T,i.sunShadowCascade.length=T,i.directionalShadow.length=I,i.directionalShadowMap.length=I,i.directionalShadowMatrix.length=I,i.pointShadow.length=L,i.pointShadowMap.length=L,i.pointShadowMatrix.length=L,i.spotShadow.length=g,i.spotShadowMap.length=g,i.spotLightMatrix.length=g+_-U,i.spotLightMap.length=_,i.numSpotLightShadowsWithMaps=U,i.numLightProbes=C,F.sunLength=d,F.directionalLength=x,F.pointLength=m,F.spotLength=M,F.rectAreaLength=y,F.hemiLength=w,F.numSunShadows=p,F.numDirectionalShadows=I,F.numPointShadows=L,F.numSpotShadows=g,F.numSpotMaps=_,F.numLightProbes=C,i.version=Yx++)}function l(c,u){let f=0,h=0,d=0,p=0,T=0,x=0,m=u.matrixWorldInverse;for(let M=0,y=c.length;M<y;M++){let w=c[M];if(w.isSunLight){let I=i.sun[f];I.direction.setFromMatrixPosition(w.matrixWorld),I.direction.transformDirection(m),f++}else if(w.isDirectionalLight){let I=i.directional[h];I.direction.setFromMatrixPosition(w.matrixWorld),s.setFromMatrixPosition(w.target.matrixWorld),I.direction.sub(s),I.direction.transformDirection(m),h++}else if(w.isSpotLight){let I=i.spot[p];I.position.setFromMatrixPosition(w.matrixWorld),I.position.applyMatrix4(m),I.direction.setFromMatrixPosition(w.matrixWorld),s.setFromMatrixPosition(w.target.matrixWorld),I.direction.sub(s),I.direction.transformDirection(m),p++}else if(w.isRectAreaLight){let I=i.rectArea[T];I.position.setFromMatrixPosition(w.matrixWorld),I.position.applyMatrix4(m),a.identity(),r.copy(w.matrixWorld),r.premultiply(m),a.extractRotation(r),I.halfWidth.set(w.width*.5,0,0),I.halfHeight.set(0,w.height*.5,0),I.halfWidth.applyMatrix4(a),I.halfHeight.applyMatrix4(a),T++}else if(w.isPointLight){let I=i.point[d];I.position.setFromMatrixPosition(w.matrixWorld),I.position.applyMatrix4(m),d++}else if(w.isHemisphereLight){let I=i.hemi[x];I.direction.setFromMatrixPosition(w.matrixWorld),I.direction.transformDirection(m),x++}}}return{setup:o,setupView:l,state:i}}function Ad(n){let t=new Zx(n),e=[],i=[],s=[];function r(f){u.camera=f,e.length=0,i.length=0,s.length=0}function a(f){f.isLightProbeGrid?s.push(f):e.push(f)}function o(f){i.push(f)}function l(){t.setup(e),s.sort((f,h)=>f.priority-h.priority||f.id-h.id)}function c(f){t.setupView(e,f)}let u={lightsArray:e,shadowsArray:i,lightProbeGridArray:s,camera:null,lights:t,transmissionRenderTarget:{},textureUnits:0};return{init:r,state:u,setupLights:l,setupLightsView:c,pushLight:a,pushShadow:o}}function Kx(n){let t=new WeakMap;function e(s,r=0){let a=t.get(s),o;return a===void 0?(o=new Ad(n),t.set(s,[o])):r>=a.length?(o=new Ad(n),a.push(o)):o=a[r],o}function i(){t=new WeakMap}return{get:e,dispose:i}}var Jx=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,Qx=`uniform sampler2D shadow_pass;
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
}`,jx=[new nt(1,0,0),new nt(-1,0,0),new nt(0,1,0),new nt(0,-1,0),new nt(0,0,1),new nt(0,0,-1)],ty=[new nt(0,-1,0),new nt(0,-1,0),new nt(0,0,1),new nt(0,0,-1),new nt(0,-1,0),new nt(0,-1,0)],Cd=new de,Ar=new nt,qc=new nt;function ey(n,t,e){let i=new vi,s=new Qt,r=new Qt,a=new me,o=new Aa,l=new Ca,c={},u=e.maxTextureSize,f={[Ei]:Ze,[Ze]:Ei,[vn]:vn},h=new Hn({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Qt},radius:{value:4}},vertexShader:Jx,fragmentShader:Qx}),d=h.clone();d.defines.HORIZONTAL_PASS=1;let p=new yi;p.setAttribute("position",new zn(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));let T=new je(p,h),x=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=yr;let m=this.type;this.render=function(L,g,_){if(x.enabled===!1||x.autoUpdate===!1&&x.needsUpdate===!1||L.length===0)return;this.type===Su&&(Gt("WebGLShadowMap: PCFSoftShadowMap has been removed. Using PCFShadowMap instead."),this.type=yr);let U=n.getRenderTarget(),C=n.getActiveCubeFace(),F=n.getActiveMipmapLevel(),E=n.state;E.setBlending(qi),E.buffers.depth.getReversed()===!0?E.buffers.color.setClear(0,0,0,0):E.buffers.color.setClear(1,1,1,1),E.buffers.depth.setTest(!0),E.setScissorTest(!1);let O=m!==this.type;O&&g.traverse(function(D){D.material&&(Array.isArray(D.material)?D.material.forEach(R=>R.needsUpdate=!0):D.material.needsUpdate=!0)});for(let D=0,R=L.length;D<R;D++){let B=L[D],b=B.shadow;if(b===void 0){Gt("WebGLShadowMap:",B,"has no shadow.");continue}if(b.autoUpdate===!1&&b.needsUpdate===!1)continue;s.copy(b.mapSize);let P=b.getFrameExtents();s.multiply(P),r.copy(b.mapSize),(s.x>u||s.y>u)&&(s.x>u&&(r.x=Math.floor(u/P.x),s.x=r.x*P.x,b.mapSize.x=r.x),s.y>u&&(r.y=Math.floor(u/P.y),s.y=r.y*P.y,b.mapSize.y=r.y));let A=n.state.buffers.depth.getReversed();if(b.camera._reversedDepth=A,b.map===null||O===!0){if(b.map!==null&&(b.map.depthTexture!==null&&(b.map.depthTexture.dispose(),b.map.depthTexture=null),b.map.dispose()),this.type===Is){if(B.isPointLight){Gt("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}b.map=new ln(s.x,s.y,{format:Ai,type:Ln,minFilter:Xe,magFilter:Xe,generateMipmaps:!1}),b.map.texture.name=B.name+".shadowMap",b.map.depthTexture=new ii(s.x,s.y,Pn),b.map.depthTexture.name=B.name+".shadowMapDepth",b.map.depthTexture.format=ei,b.map.depthTexture.compareFunction=null,b.map.depthTexture.minFilter=Le,b.map.depthTexture.magFilter=Le}else B.isPointLight?(b.map=new Rr(s.x),b.map.depthTexture=new cr(s.x,In)):(b.map=new ln(s.x,s.y),b.map.depthTexture=new ii(s.x,s.y,In)),b.map.depthTexture.name=B.name+".shadowMap",b.map.depthTexture.format=ei,this.type===yr?(b.map.depthTexture.compareFunction=A?Ic:Rc,b.map.depthTexture.minFilter=Xe,b.map.depthTexture.magFilter=Xe):(b.map.depthTexture.compareFunction=null,b.map.depthTexture.minFilter=Le,b.map.depthTexture.magFilter=Le);b.camera.updateProjectionMatrix()}b.map.isWebGLCubeRenderTarget!==!0&&(b.map.width!==s.x||b.map.height!==s.y)&&b.map.setSize(s.x,s.y);let N=b.map.isWebGLCubeRenderTarget?6:b.getViewportCount();B.isPointLight!==!0&&b.updateMatrices(B,_);let v=(b.camera.layers.mask&4294967294)!==0?b.camera.layers:_.layers;for(let G=0;G<N;G++){let q=b.getCamera(G);if(B.isPointLight){let S=b.camera,V=b.matrix,W=B.distance||S.far;W!==S.far&&(S.far=W,S.updateProjectionMatrix()),Ar.setFromMatrixPosition(B.matrixWorld),S.position.copy(Ar),qc.copy(S.position),qc.add(jx[G]),S.up.copy(ty[G]),S.lookAt(qc),S.updateMatrixWorld(),V.makeTranslation(-Ar.x,-Ar.y,-Ar.z),Cd.multiplyMatrices(S.projectionMatrix,S.matrixWorldInverse),b._frustum.setFromProjectionMatrix(Cd,S.coordinateSystem,S.reversedDepth)}if(b.map.isWebGLCubeRenderTarget)n.setRenderTarget(b.map,G),n.clear();else{G===0&&(n.setRenderTarget(b.map),n.clear());let S=b.getViewport(G);a.set(r.x*S.x,r.y*S.y,r.x*S.z,r.y*S.w),E.viewport(a)}i=b.getFrustum(G),w(g,_,q,B,v,this.type)}b.isPointLightShadow!==!0&&this.type===Is&&M(b,_),b.needsUpdate=!1}m=this.type,x.needsUpdate=!1,n.setRenderTarget(U,C,F)};function M(L,g){let _=t.update(T);h.defines.VSM_SAMPLES!==L.blurSamples&&(h.defines.VSM_SAMPLES=L.blurSamples,d.defines.VSM_SAMPLES=L.blurSamples,h.needsUpdate=!0,d.needsUpdate=!0),L.mapPass===null?L.mapPass=new ln(s.x,s.y,{format:Ai,type:Ln}):(L.mapPass.width!==L.map.width||L.mapPass.height!==L.map.height)&&L.mapPass.setSize(L.map.width,L.map.height),h.uniforms.shadow_pass.value=L.map.depthTexture,h.uniforms.resolution.value.set(L.map.width,L.map.height),h.uniforms.radius.value=L.radius,n.setRenderTarget(L.mapPass),n.clear(),n.renderBufferDirect(g,null,_,h,T,null),d.uniforms.shadow_pass.value=L.mapPass.texture,d.uniforms.resolution.value.set(L.map.width,L.map.height),d.uniforms.radius.value=L.radius,n.setRenderTarget(L.map),n.clear(),n.renderBufferDirect(g,null,_,d,T,null)}function y(L,g,_,U){let C=null,F=_.isPointLight===!0?L.customDistanceMaterial:L.customDepthMaterial;if(F!==void 0)C=F;else if(C=_.isPointLight===!0?l:o,n.localClippingEnabled&&g.clipShadows===!0&&Array.isArray(g.clippingPlanes)&&g.clippingPlanes.length!==0||g.displacementMap&&g.displacementScale!==0||g.alphaMap&&g.alphaTest>0||g.map&&g.alphaTest>0||g.alphaToCoverage===!0){let E=C.uuid,O=g.uuid,D=c[E];D===void 0&&(D={},c[E]=D);let R=D[O];R===void 0&&(R=C.clone(),D[O]=R,g.addEventListener("dispose",I)),C=R}if(C.visible=g.visible,C.wireframe=g.wireframe,U===Is?C.side=g.shadowSide!==null?g.shadowSide:g.side:C.side=g.shadowSide!==null?g.shadowSide:f[g.side],C.alphaMap=g.alphaMap,C.alphaTest=g.alphaToCoverage===!0?.5:g.alphaTest,C.map=g.map,C.clipShadows=g.clipShadows,C.clippingPlanes=g.clippingPlanes,C.clipIntersection=g.clipIntersection,C.displacementMap=g.displacementMap,C.displacementScale=g.displacementScale,C.displacementBias=g.displacementBias,C.wireframeLinewidth=g.wireframeLinewidth,C.linewidth=g.linewidth,_.isPointLight===!0&&C.isMeshDistanceMaterial===!0){let E=n.properties.get(C);E.light=_}return C}function w(L,g,_,U,C,F){if(L.visible===!1)return;if(L.layers.test(C)&&(L.isMesh||L.isLine||L.isPoints)&&(L.castShadow||L.receiveShadow&&F===Is)&&(!L.frustumCulled||L.intersectsFrustum(i))){L.modelViewMatrix.multiplyMatrices(_.matrixWorldInverse,L.matrixWorld);let D=t.update(L),R=L.material;if(Array.isArray(R)){let B=D.groups;for(let b=0,P=B.length;b<P;b++){let A=B[b],N=R[A.materialIndex];if(N&&N.visible){let v=y(L,N,U,F);L.onBeforeShadow(n,L,g,_,D,v,A),n.renderBufferDirect(_,null,D,v,L,A),L.onAfterShadow(n,L,g,_,D,v,A)}}}else if(R.visible){let B=y(L,R,U,F);L.onBeforeShadow(n,L,g,_,D,B,null),n.renderBufferDirect(_,null,D,B,L,null),L.onAfterShadow(n,L,g,_,D,B,null)}}let O=L.children;for(let D=0,R=O.length;D<R;D++)w(O[D],g,_,U,C,F)}function I(L){L.target.removeEventListener("dispose",I);for(let _ in c){let U=c[_],C=L.target.uuid;C in U&&(U[C].dispose(),delete U[C])}}}function ny(n,t){function e(){let X=!1,ot=new me,it=null,yt=new me(0,0,0,0);return{setMask:function(pt){it!==pt&&!X&&(n.colorMask(pt,pt,pt,pt),it=pt)},setLocked:function(pt){X=pt},setClear:function(pt,gt,Ot,$t,ft){ft===!0&&(pt*=$t,gt*=$t,Ot*=$t),ot.set(pt,gt,Ot,$t),yt.equals(ot)===!1&&(n.clearColor(pt,gt,Ot,$t),yt.copy(ot))},reset:function(){X=!1,it=null,yt.set(-1,0,0,0)}}}function i(){let X=!1,ot=!1,it=null,yt=null,pt=null;return{setReversed:function(gt){if(ot!==gt){let Ot=t.get("EXT_clip_control");gt?Ot.clipControlEXT(Ot.LOWER_LEFT_EXT,Ot.ZERO_TO_ONE_EXT):Ot.clipControlEXT(Ot.LOWER_LEFT_EXT,Ot.NEGATIVE_ONE_TO_ONE_EXT),ot=gt;let $t=pt;pt=null,this.setClear($t)}},getReversed:function(){return ot},setTest:function(gt){gt?Y(n.DEPTH_TEST):j(n.DEPTH_TEST)},setMask:function(gt){it!==gt&&!X&&(n.depthMask(gt),it=gt)},setFunc:function(gt){if(ot&&(gt=nd[gt]),yt!==gt){switch(gt){case ua:n.depthFunc(n.NEVER);break;case da:n.depthFunc(n.ALWAYS);break;case fa:n.depthFunc(n.LESS);break;case _s:n.depthFunc(n.LEQUAL);break;case pa:n.depthFunc(n.EQUAL);break;case ma:n.depthFunc(n.GEQUAL);break;case ga:n.depthFunc(n.GREATER);break;case xa:n.depthFunc(n.NOTEQUAL);break;default:n.depthFunc(n.LEQUAL)}yt=gt}},setLocked:function(gt){X=gt},setClear:function(gt){pt!==gt&&(pt=gt,ot&&(gt=1-gt),n.clearDepth(gt))},reset:function(){X=!1,it=null,yt=null,pt=null,ot=!1}}}function s(){let X=!1,ot=null,it=null,yt=null,pt=null,gt=null,Ot=null,$t=null,ft=null;return{setTest:function(kt){X||(kt?Y(n.STENCIL_TEST):j(n.STENCIL_TEST))},setMask:function(kt){ot!==kt&&!X&&(n.stencilMask(kt),ot=kt)},setFunc:function(kt,Yt,bt){(it!==kt||yt!==Yt||pt!==bt)&&(n.stencilFunc(kt,Yt,bt),it=kt,yt=Yt,pt=bt)},setOp:function(kt,Yt,bt){(gt!==kt||Ot!==Yt||$t!==bt)&&(n.stencilOp(kt,Yt,bt),gt=kt,Ot=Yt,$t=bt)},setLocked:function(kt){X=kt},setClear:function(kt){ft!==kt&&(n.clearStencil(kt),ft=kt)},reset:function(){X=!1,ot=null,it=null,yt=null,pt=null,gt=null,Ot=null,$t=null,ft=null}}}let r=new e,a=new i,o=new s,l={},c=new WeakMap,u={},f={},h={},d=new WeakMap,p=[],T=null,x=!1,m=null,M=null,y=null,w=null,I=null,L=null,g=null,_=new Zt(0,0,0),U=0,C=!1,F=null,E=null,O=null,D=null,R=null,B=n.getParameter(n.MAX_COMBINED_TEXTURE_IMAGE_UNITS),b=!1,P=0,A=n.getParameter(n.VERSION);A.indexOf("WebGL")!==-1?(P=parseFloat(/^WebGL (\d)/.exec(A)[1]),b=P>=1):A.indexOf("OpenGL ES")!==-1&&(P=parseFloat(/^OpenGL ES (\d)/.exec(A)[1]),b=P>=2);let N=null,v={},G=n.getParameter(n.SCISSOR_BOX),q=n.getParameter(n.VIEWPORT),S=new me().fromArray(G),V=new me().fromArray(q);function W(X,ot,it,yt){let pt=new Uint8Array(4),gt=n.createTexture();n.bindTexture(X,gt),n.texParameteri(X,n.TEXTURE_MIN_FILTER,n.NEAREST),n.texParameteri(X,n.TEXTURE_MAG_FILTER,n.NEAREST);for(let Ot=0;Ot<it;Ot++)X===n.TEXTURE_3D||X===n.TEXTURE_2D_ARRAY?n.texImage3D(ot,0,n.RGBA,1,1,yt,0,n.RGBA,n.UNSIGNED_BYTE,pt):n.texImage2D(ot+Ot,0,n.RGBA,1,1,0,n.RGBA,n.UNSIGNED_BYTE,pt);return gt}let Z={};Z[n.TEXTURE_2D]=W(n.TEXTURE_2D,n.TEXTURE_2D,1),Z[n.TEXTURE_CUBE_MAP]=W(n.TEXTURE_CUBE_MAP,n.TEXTURE_CUBE_MAP_POSITIVE_X,6),Z[n.TEXTURE_2D_ARRAY]=W(n.TEXTURE_2D_ARRAY,n.TEXTURE_2D_ARRAY,1,1),Z[n.TEXTURE_3D]=W(n.TEXTURE_3D,n.TEXTURE_3D,1,1),r.setClear(0,0,0,1),a.setClear(1),o.setClear(0),Y(n.DEPTH_TEST),a.setFunc(_s),ce(!1),ge(oc),Y(n.CULL_FACE),Ft(qi);function Y(X){u[X]!==!0&&(n.enable(X),u[X]=!0)}function j(X){u[X]!==!1&&(n.disable(X),u[X]=!1)}function ct(X,ot){return h[X]!==ot?(n.bindFramebuffer(X,ot),h[X]=ot,X===n.DRAW_FRAMEBUFFER&&(h[n.FRAMEBUFFER]=ot),X===n.FRAMEBUFFER&&(h[n.DRAW_FRAMEBUFFER]=ot),!0):!1}function ut(X,ot){let it=p,yt=!1;if(X){it=d.get(ot),it===void 0&&(it=[],d.set(ot,it));let pt=X.textures;if(it.length!==pt.length||it[0]!==n.COLOR_ATTACHMENT0){for(let gt=0,Ot=pt.length;gt<Ot;gt++)it[gt]=n.COLOR_ATTACHMENT0+gt;it.length=pt.length,yt=!0}}else it[0]!==n.BACK&&(it[0]=n.BACK,yt=!0);yt&&n.drawBuffers(it)}function ht(X){return T!==X?(n.useProgram(X),T=X,!0):!1}let Rt={[Xi]:n.FUNC_ADD,[wu]:n.FUNC_SUBTRACT,[Tu]:n.FUNC_REVERSE_SUBTRACT};Rt[Eu]=n.MIN,Rt[Au]=n.MAX;let Ut={[Cu]:n.ZERO,[Ru]:n.ONE,[Iu]:n.SRC_COLOR,[uc]:n.SRC_ALPHA,[Ou]:n.SRC_ALPHA_SATURATE,[Du]:n.DST_COLOR,[Lu]:n.DST_ALPHA,[Pu]:n.ONE_MINUS_SRC_COLOR,[dc]:n.ONE_MINUS_SRC_ALPHA,[Uu]:n.ONE_MINUS_DST_COLOR,[Nu]:n.ONE_MINUS_DST_ALPHA,[Fu]:n.CONSTANT_COLOR,[ku]:n.ONE_MINUS_CONSTANT_COLOR,[Bu]:n.CONSTANT_ALPHA,[zu]:n.ONE_MINUS_CONSTANT_ALPHA};function Ft(X,ot,it,yt,pt,gt,Ot,$t,ft,kt){if(X===qi){x===!0&&(j(n.BLEND),x=!1);return}if(x===!1&&(Y(n.BLEND),x=!0),X!==bu){if(X!==m||kt!==C){if((M!==Xi||I!==Xi)&&(n.blendEquation(n.FUNC_ADD),M=Xi,I=Xi),kt)switch(X){case Ps:n.blendFuncSeparate(n.ONE,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case lc:n.blendFunc(n.ONE,n.ONE);break;case cc:n.blendFuncSeparate(n.ZERO,n.ONE_MINUS_SRC_COLOR,n.ZERO,n.ONE);break;case hc:n.blendFuncSeparate(n.DST_COLOR,n.ONE_MINUS_SRC_ALPHA,n.ZERO,n.ONE);break;default:Vt("WebGLState: Invalid blending: ",X);break}else switch(X){case Ps:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case lc:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE,n.ONE,n.ONE);break;case cc:Vt("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case hc:Vt("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:Vt("WebGLState: Invalid blending: ",X);break}y=null,w=null,L=null,g=null,_.set(0,0,0),U=0,m=X,C=kt}return}pt=pt||ot,gt=gt||it,Ot=Ot||yt,(ot!==M||pt!==I)&&(n.blendEquationSeparate(Rt[ot],Rt[pt]),M=ot,I=pt),(it!==y||yt!==w||gt!==L||Ot!==g)&&(n.blendFuncSeparate(Ut[it],Ut[yt],Ut[gt],Ut[Ot]),y=it,w=yt,L=gt,g=Ot),($t.equals(_)===!1||ft!==U)&&(n.blendColor($t.r,$t.g,$t.b,ft),_.copy($t),U=ft),m=X,C=!1}function Jt(X,ot){X.side===vn?j(n.CULL_FACE):Y(n.CULL_FACE);let it=X.side===Ze;ot&&(it=!it),ce(it),X.blending===Ps&&X.transparent===!1?Ft(qi):Ft(X.blending,X.blendEquation,X.blendSrc,X.blendDst,X.blendEquationAlpha,X.blendSrcAlpha,X.blendDstAlpha,X.blendColor,X.blendAlpha,X.premultipliedAlpha),a.setFunc(X.depthFunc),a.setTest(X.depthTest),a.setMask(X.depthWrite),r.setMask(X.colorWrite);let yt=X.stencilWrite;o.setTest(yt),yt&&(o.setMask(X.stencilWriteMask),o.setFunc(X.stencilFunc,X.stencilRef,X.stencilFuncMask),o.setOp(X.stencilFail,X.stencilZFail,X.stencilZPass)),Ae(X.polygonOffset,X.polygonOffsetFactor,X.polygonOffsetUnits),X.alphaToCoverage===!0?Y(n.SAMPLE_ALPHA_TO_COVERAGE):j(n.SAMPLE_ALPHA_TO_COVERAGE)}function ce(X){F!==X&&(X?n.frontFace(n.CW):n.frontFace(n.CCW),F=X)}function ge(X){X!==vu?(Y(n.CULL_FACE),X!==E&&(X===oc?n.cullFace(n.BACK):X===Mu?n.cullFace(n.FRONT):n.cullFace(n.FRONT_AND_BACK))):j(n.CULL_FACE),E=X}function On(X){X!==O&&(b&&n.lineWidth(X),O=X)}function Ae(X,ot,it){X?(Y(n.POLYGON_OFFSET_FILL),(D!==ot||R!==it)&&(D=ot,R=it,a.getReversed()&&(ot=-ot,it=-it),n.polygonOffset(ot,it))):j(n.POLYGON_OFFSET_FILL)}function hn(X){X?Y(n.SCISSOR_TEST):j(n.SCISSOR_TEST)}function un(X){X===void 0&&(X=n.TEXTURE0+B-1),N!==X&&(n.activeTexture(X),N=X)}function dn(X,ot,it){it===void 0&&(N===null?it=n.TEXTURE0+B-1:it=N);let yt=v[it];yt===void 0&&(yt={type:void 0,texture:void 0},v[it]=yt),(yt.type!==X||yt.texture!==ot)&&(N!==it&&(n.activeTexture(it),N=it),n.bindTexture(X,ot||Z[X]),yt.type=X,yt.texture=ot)}function K(){let X=v[N];X!==void 0&&X.type!==void 0&&(n.bindTexture(X.type,null),X.type=void 0,X.texture=void 0)}function fn(){try{n.compressedTexImage2D(...arguments)}catch(X){Vt("WebGLState:",X)}}function fe(){try{n.compressedTexImage3D(...arguments)}catch(X){Vt("WebGLState:",X)}}function pe(){try{n.texSubImage2D(...arguments)}catch(X){Vt("WebGLState:",X)}}function St(){try{n.texSubImage3D(...arguments)}catch(X){Vt("WebGLState:",X)}}function we(){try{n.compressedTexSubImage2D(...arguments)}catch(X){Vt("WebGLState:",X)}}function Bt(){try{n.compressedTexSubImage3D(...arguments)}catch(X){Vt("WebGLState:",X)}}function Wt(){try{n.texStorage2D(...arguments)}catch(X){Vt("WebGLState:",X)}}function H(){try{n.texStorage3D(...arguments)}catch(X){Vt("WebGLState:",X)}}function k(){try{n.texImage2D(...arguments)}catch(X){Vt("WebGLState:",X)}}function Q(){try{n.texImage3D(...arguments)}catch(X){Vt("WebGLState:",X)}}function dt(X){return f[X]!==void 0?f[X]:n.getParameter(X)}function lt(X,ot){f[X]!==ot&&(n.pixelStorei(X,ot),f[X]=ot)}function mt(X){S.equals(X)===!1&&(n.scissor(X.x,X.y,X.z,X.w),S.copy(X))}function vt(X){V.equals(X)===!1&&(n.viewport(X.x,X.y,X.z,X.w),V.copy(X))}function rt(X,ot){let it=c.get(ot);it===void 0&&(it=new WeakMap,c.set(ot,it));let yt=it.get(X);yt===void 0&&(yt=n.getUniformBlockIndex(ot,X.name),n.uniformBlockBinding(ot,yt,yt),it.set(X,yt))}function at(X,ot,it){let pt=c.get(ot).get(X);l[pt]!==it&&(n.bindBufferBase(n.UNIFORM_BUFFER,pt,it),l[pt]=it)}function xt(){n.disable(n.BLEND),n.disable(n.CULL_FACE),n.disable(n.DEPTH_TEST),n.disable(n.POLYGON_OFFSET_FILL),n.disable(n.SCISSOR_TEST),n.disable(n.STENCIL_TEST),n.disable(n.SAMPLE_ALPHA_TO_COVERAGE),n.blendEquation(n.FUNC_ADD),n.blendFunc(n.ONE,n.ZERO),n.blendFuncSeparate(n.ONE,n.ZERO,n.ONE,n.ZERO),n.blendColor(0,0,0,0),n.colorMask(!0,!0,!0,!0),n.clearColor(0,0,0,0),n.depthMask(!0),n.depthFunc(n.LESS),a.setReversed(!1),n.clearDepth(1),n.stencilMask(4294967295),n.stencilFunc(n.ALWAYS,0,4294967295),n.stencilOp(n.KEEP,n.KEEP,n.KEEP),n.clearStencil(0),n.cullFace(n.BACK),n.frontFace(n.CCW),n.polygonOffset(0,0),n.activeTexture(n.TEXTURE0),n.bindFramebuffer(n.FRAMEBUFFER,null),n.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),n.bindFramebuffer(n.READ_FRAMEBUFFER,null),n.useProgram(null),n.lineWidth(1),n.scissor(0,0,n.canvas.width,n.canvas.height),n.viewport(0,0,n.canvas.width,n.canvas.height),n.pixelStorei(n.PACK_ALIGNMENT,4),n.pixelStorei(n.UNPACK_ALIGNMENT,4),n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,!1),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,n.BROWSER_DEFAULT_WEBGL),n.pixelStorei(n.PACK_ROW_LENGTH,0),n.pixelStorei(n.PACK_SKIP_PIXELS,0),n.pixelStorei(n.PACK_SKIP_ROWS,0),n.pixelStorei(n.UNPACK_ROW_LENGTH,0),n.pixelStorei(n.UNPACK_IMAGE_HEIGHT,0),n.pixelStorei(n.UNPACK_SKIP_PIXELS,0),n.pixelStorei(n.UNPACK_SKIP_ROWS,0),n.pixelStorei(n.UNPACK_SKIP_IMAGES,0),u={},f={},N=null,v={},h={},l={},d=new WeakMap,p=[],T=null,x=!1,m=null,M=null,y=null,w=null,I=null,L=null,g=null,_=new Zt(0,0,0),U=0,C=!1,F=null,E=null,O=null,D=null,R=null,S.set(0,0,n.canvas.width,n.canvas.height),V.set(0,0,n.canvas.width,n.canvas.height),r.reset(),a.reset(),o.reset()}return{buffers:{color:r,depth:a,stencil:o},enable:Y,disable:j,bindFramebuffer:ct,drawBuffers:ut,useProgram:ht,setBlending:Ft,setMaterial:Jt,setFlipSided:ce,setCullFace:ge,setLineWidth:On,setPolygonOffset:Ae,setScissorTest:hn,activeTexture:un,bindTexture:dn,unbindTexture:K,compressedTexImage2D:fn,compressedTexImage3D:fe,texImage2D:k,texImage3D:Q,pixelStorei:lt,getParameter:dt,updateUBOMapping:rt,uniformBlockBinding:at,texStorage2D:Wt,texStorage3D:H,texSubImage2D:pe,texSubImage3D:St,compressedTexSubImage2D:we,compressedTexSubImage3D:Bt,scissor:mt,viewport:vt,reset:xt}}function iy(n,t,e,i,s,r,a){let o=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new Qt,u=new WeakMap,f=new Set,h,d=new WeakMap,p=new Set,T=new FinalizationRegistry(H=>p.delete(H)),x=!1;try{x=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function m(H,k){return x?new OffscreenCanvas(H,k):ir("canvas")}function M(H,k,Q){let dt=1,lt=Wt(H);if((lt.width>Q||lt.height>Q)&&(dt=Q/Math.max(lt.width,lt.height)),dt<1)if(typeof HTMLImageElement<"u"&&H instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&H instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&H instanceof ImageBitmap||typeof VideoFrame<"u"&&H instanceof VideoFrame){let mt=Math.floor(dt*lt.width),vt=Math.floor(dt*lt.height);h===void 0&&(h=m(mt,vt));let rt=k?m(mt,vt):h;return rt.width=mt,rt.height=vt,rt.getContext("2d").drawImage(H,0,0,mt,vt),Gt("WebGLRenderer: Texture has been resized from ("+lt.width+"x"+lt.height+") to ("+mt+"x"+vt+")."),rt}else return"data"in H&&Gt("WebGLRenderer: Image in DataTexture is too big ("+lt.width+"x"+lt.height+")."),H;return H}function y(H){return H.generateMipmaps}function w(H){n.generateMipmap(H)}function I(H){return H.isWebGLCubeRenderTarget?n.TEXTURE_CUBE_MAP:H.isWebGL3DRenderTarget?n.TEXTURE_3D:H.isWebGLArrayRenderTarget||H.isCompressedArrayTexture?n.TEXTURE_2D_ARRAY:n.TEXTURE_2D}function L(H,k,Q,dt,lt,mt=!1){if(H!==null){if(n[H]!==void 0)return n[H];Gt("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+H+"'")}let vt;dt&&(vt=t.get("EXT_texture_norm16"),vt||Gt("WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension"));let rt=k;if(k===n.RED&&(Q===n.FLOAT&&(rt=n.R32F),Q===n.HALF_FLOAT&&(rt=n.R16F),Q===n.UNSIGNED_BYTE&&(rt=n.R8),Q===n.UNSIGNED_SHORT&&vt&&(rt=vt.R16_EXT),Q===n.SHORT&&vt&&(rt=vt.R16_SNORM_EXT)),k===n.RED_INTEGER&&(Q===n.UNSIGNED_BYTE&&(rt=n.R8UI),Q===n.UNSIGNED_SHORT&&(rt=n.R16UI),Q===n.UNSIGNED_INT&&(rt=n.R32UI),Q===n.BYTE&&(rt=n.R8I),Q===n.SHORT&&(rt=n.R16I),Q===n.INT&&(rt=n.R32I)),k===n.RG&&(Q===n.FLOAT&&(rt=n.RG32F),Q===n.HALF_FLOAT&&(rt=n.RG16F),Q===n.UNSIGNED_BYTE&&(rt=n.RG8),Q===n.UNSIGNED_SHORT&&vt&&(rt=vt.RG16_EXT),Q===n.SHORT&&vt&&(rt=vt.RG16_SNORM_EXT)),k===n.RG_INTEGER&&(Q===n.UNSIGNED_BYTE&&(rt=n.RG8UI),Q===n.UNSIGNED_SHORT&&(rt=n.RG16UI),Q===n.UNSIGNED_INT&&(rt=n.RG32UI),Q===n.BYTE&&(rt=n.RG8I),Q===n.SHORT&&(rt=n.RG16I),Q===n.INT&&(rt=n.RG32I)),k===n.RGB_INTEGER&&(Q===n.UNSIGNED_BYTE&&(rt=n.RGB8UI),Q===n.UNSIGNED_SHORT&&(rt=n.RGB16UI),Q===n.UNSIGNED_INT&&(rt=n.RGB32UI),Q===n.BYTE&&(rt=n.RGB8I),Q===n.SHORT&&(rt=n.RGB16I),Q===n.INT&&(rt=n.RGB32I)),k===n.RGBA_INTEGER&&(Q===n.UNSIGNED_BYTE&&(rt=n.RGBA8UI),Q===n.UNSIGNED_SHORT&&(rt=n.RGBA16UI),Q===n.UNSIGNED_INT&&(rt=n.RGBA32UI),Q===n.BYTE&&(rt=n.RGBA8I),Q===n.SHORT&&(rt=n.RGBA16I),Q===n.INT&&(rt=n.RGBA32I)),k===n.RGB&&(Q===n.UNSIGNED_SHORT&&vt&&(rt=vt.RGB16_EXT),Q===n.SHORT&&vt&&(rt=vt.RGB16_SNORM_EXT),Q===n.UNSIGNED_INT_5_9_9_9_REV&&(rt=n.RGB9_E5),Q===n.UNSIGNED_INT_10F_11F_11F_REV&&(rt=n.R11F_G11F_B10F)),k===n.RGBA){let at=mt?nr:ee.getTransfer(lt);Q===n.FLOAT&&(rt=n.RGBA32F),Q===n.HALF_FLOAT&&(rt=n.RGBA16F),Q===n.UNSIGNED_BYTE&&(rt=at===re?n.SRGB8_ALPHA8:n.RGBA8),Q===n.UNSIGNED_SHORT&&vt&&(rt=vt.RGBA16_EXT),Q===n.SHORT&&vt&&(rt=vt.RGBA16_SNORM_EXT),Q===n.UNSIGNED_SHORT_4_4_4_4&&(rt=n.RGBA4),Q===n.UNSIGNED_SHORT_5_5_5_1&&(rt=n.RGB5_A1)}return(rt===n.R16F||rt===n.R32F||rt===n.RG16F||rt===n.RG32F||rt===n.RGBA16F||rt===n.RGBA32F)&&t.get("EXT_color_buffer_float"),rt}function g(H,k){let Q;return H?k===null||k===In||k===$i?Q=n.DEPTH24_STENCIL8:k===Pn?Q=n.DEPTH32F_STENCIL8:k===Ns&&(Q=n.DEPTH24_STENCIL8,Gt("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):k===null||k===In||k===$i?Q=n.DEPTH_COMPONENT24:k===Pn?Q=n.DEPTH_COMPONENT32F:k===Ns&&(Q=n.DEPTH_COMPONENT16),Q}function _(H,k){return y(H)===!0||H.isFramebufferTexture&&H.minFilter!==Le&&H.minFilter!==Xe?Math.log2(Math.max(k.width,k.height))+1:H.mipmaps.length>0?H.mipmaps.length:H.isCompressedTexture&&Array.isArray(H.image)?k.mipmaps.length:1}function U(H){let k=new WeakRef(H);i.get(H).__ref=k,p.add(k),T.register(H,k,k)}function C(H){let k=i.get(H).__ref;k!==void 0&&(p.delete(k),T.unregister(k))}function F(H){O(H.target)}function E(H){D(H.target)}function O(H){H.removeEventListener("dispose",F),C(H),B(H),H.isVideoTexture&&u.delete(H),H.isHTMLTexture&&f.delete(H)}function D(H){H.removeEventListener("dispose",E),C(H),P(H)}function R(){for(let H of p){let k=H.deref();k!==void 0&&(k.isRenderTarget===!0?D(k):O(k))}p.clear(),f.clear()}function B(H){let k=i.get(H);if(k.__webglInit===void 0)return;let Q=H.source,dt=d.get(Q);if(dt){let lt=dt[k.__cacheKey];lt.usedTimes--,lt.usedTimes===0&&b(H),Object.keys(dt).length===0&&d.delete(Q)}i.remove(H)}function b(H){let k=i.get(H);n.deleteTexture(k.__webglTexture);let Q=H.source,dt=d.get(Q);delete dt[k.__cacheKey],a.memory.textures--}function P(H){let k=i.get(H);k.__depthDisposeCallback&&k.__depthDisposeCallback();let Q=H.depthTexture;if(Q&&Q.renderTarget===H&&O(Q),H.isWebGLCubeRenderTarget)for(let lt=0;lt<6;lt++){if(Array.isArray(k.__webglFramebuffer[lt]))for(let mt=0;mt<k.__webglFramebuffer[lt].length;mt++)n.deleteFramebuffer(k.__webglFramebuffer[lt][mt]);else n.deleteFramebuffer(k.__webglFramebuffer[lt]);k.__webglDepthbuffer&&n.deleteRenderbuffer(k.__webglDepthbuffer[lt])}else{if(Array.isArray(k.__webglFramebuffer))for(let lt=0;lt<k.__webglFramebuffer.length;lt++)n.deleteFramebuffer(k.__webglFramebuffer[lt]);else n.deleteFramebuffer(k.__webglFramebuffer);if(k.__webglDepthbuffer&&n.deleteRenderbuffer(k.__webglDepthbuffer),k.__webglMultisampledFramebuffer&&n.deleteFramebuffer(k.__webglMultisampledFramebuffer),k.__webglColorRenderbuffer)for(let lt=0;lt<k.__webglColorRenderbuffer.length;lt++)k.__webglColorRenderbuffer[lt]&&n.deleteRenderbuffer(k.__webglColorRenderbuffer[lt]);k.__webglDepthRenderbuffer&&n.deleteRenderbuffer(k.__webglDepthRenderbuffer)}let dt=H.textures;for(let lt=0,mt=dt.length;lt<mt;lt++){let vt=i.get(dt[lt]);vt.__webglTexture&&(n.deleteTexture(vt.__webglTexture),a.memory.textures--),i.remove(dt[lt])}i.remove(H)}let A=0;function N(){A=0}function v(){return A}function G(H){A=H}function q(){let H=A;return H>=s.maxTextures&&Gt("WebGLTextures: Trying to use "+(H+1)+" texture units while this GPU supports only "+s.maxTextures),A+=1,H}function S(H){let k=[];return k.push(H.wrapS),k.push(H.wrapT),k.push(H.wrapR||0),k.push(H.magFilter),k.push(H.minFilter),k.push(H.anisotropy),k.push(H.internalFormat),k.push(H.format),k.push(H.type),k.push(H.generateMipmaps),k.push(H.mipmapsAutoUpdate),k.push(H.premultiplyAlpha),k.push(H.flipY),k.push(H.unpackAlignment),k.push(H.colorSpace),k.join()}function V(H,k){let Q=i.get(H);if(H.isVideoTexture&&we(H),H.isRenderTargetTexture===!1&&H.isExternalTexture!==!0&&H.version>0&&Q.__version!==H.version){let dt=H.image;if(dt===null)Gt("WebGLRenderer: Texture marked for update but no image data found.");else if(dt.complete===!1)Gt("WebGLRenderer: Texture marked for update but image is incomplete");else{Jt(Q,H,k);return}}else H.isExternalTexture&&(Q.__webglTexture=H.sourceTexture?H.sourceTexture:null);e.bindTexture(n.TEXTURE_2D,Q.__webglTexture,n.TEXTURE0+k)}function W(H,k){let Q=i.get(H);if(H.isRenderTargetTexture===!1&&H.version>0&&Q.__version!==H.version){Jt(Q,H,k);return}else H.isExternalTexture&&(Q.__webglTexture=H.sourceTexture?H.sourceTexture:null);e.bindTexture(n.TEXTURE_2D_ARRAY,Q.__webglTexture,n.TEXTURE0+k)}function Z(H,k){let Q=i.get(H);if(H.isRenderTargetTexture===!1&&H.version>0&&Q.__version!==H.version){Jt(Q,H,k);return}e.bindTexture(n.TEXTURE_3D,Q.__webglTexture,n.TEXTURE0+k)}function Y(H,k){let Q=i.get(H);if(H.version>0&&Q.__version!==H.version){ce(Q,H,k);return}e.bindTexture(n.TEXTURE_CUBE_MAP,Q.__webglTexture,n.TEXTURE0+k)}let j={[vs]:n.REPEAT,[Bn]:n.CLAMP_TO_EDGE,[ya]:n.MIRRORED_REPEAT},ct={[Le]:n.NEAREST,[Hu]:n.NEAREST_MIPMAP_NEAREST,[_r]:n.NEAREST_MIPMAP_LINEAR,[Xe]:n.LINEAR,[Wa]:n.LINEAR_MIPMAP_NEAREST,[si]:n.LINEAR_MIPMAP_LINEAR},ut={[Yu]:n.NEVER,[Pc]:n.ALWAYS,[$u]:n.LESS,[Rc]:n.LEQUAL,[Zu]:n.EQUAL,[Ic]:n.GEQUAL,[Ku]:n.GREATER,[Ju]:n.NOTEQUAL};function ht(H,k){if(k.type===Pn&&t.has("OES_texture_float_linear")===!1&&(k.magFilter===Xe||k.magFilter===Wa||k.magFilter===_r||k.magFilter===si||k.minFilter===Xe||k.minFilter===Wa||k.minFilter===_r||k.minFilter===si)&&Gt("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),n.texParameteri(H,n.TEXTURE_WRAP_S,j[k.wrapS]),n.texParameteri(H,n.TEXTURE_WRAP_T,j[k.wrapT]),(H===n.TEXTURE_3D||H===n.TEXTURE_2D_ARRAY)&&n.texParameteri(H,n.TEXTURE_WRAP_R,j[k.wrapR]),n.texParameteri(H,n.TEXTURE_MAG_FILTER,ct[k.magFilter]),n.texParameteri(H,n.TEXTURE_MIN_FILTER,ct[k.minFilter]),k.compareFunction&&(n.texParameteri(H,n.TEXTURE_COMPARE_MODE,n.COMPARE_REF_TO_TEXTURE),n.texParameteri(H,n.TEXTURE_COMPARE_FUNC,ut[k.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){if(k.magFilter===Le||k.minFilter!==_r&&k.minFilter!==si||k.type===Pn&&t.has("OES_texture_float_linear")===!1)return;if(k.anisotropy>1||i.get(k).__currentAnisotropy){let Q=t.get("EXT_texture_filter_anisotropic");n.texParameterf(H,Q.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(k.anisotropy,s.getMaxAnisotropy())),i.get(k).__currentAnisotropy=k.anisotropy}}}function Rt(H,k){let Q=!1;H.__webglInit===void 0&&(H.__webglInit=!0,k.addEventListener("dispose",F),U(k));let dt=k.source,lt=d.get(dt);lt===void 0&&(lt={},d.set(dt,lt));let mt=S(k);if(mt!==H.__cacheKey){lt[mt]===void 0&&(lt[mt]={texture:n.createTexture(),usedTimes:0},a.memory.textures++,Q=!0),lt[mt].usedTimes++;let vt=lt[H.__cacheKey];vt!==void 0&&(lt[H.__cacheKey].usedTimes--,vt.usedTimes===0&&b(k)),H.__cacheKey=mt,H.__webglTexture=lt[mt].texture}return Q}function Ut(H,k,Q){return Math.floor(Math.floor(H/Q)/k)}function Ft(H,k,Q,dt){let mt=H.updateRanges;if(mt.length===0)e.texSubImage2D(n.TEXTURE_2D,0,0,0,k.width,k.height,Q,dt,k.data);else{mt.sort((X,ot)=>X.start-ot.start);let vt=0;for(let X=1;X<mt.length;X++){let ot=mt[vt],it=mt[X],yt=ot.start+ot.count,pt=Ut(it.start,k.width,4),gt=Ut(ot.start,k.width,4);it.start<=yt+1&&pt===gt&&Ut(it.start+it.count-1,k.width,4)===pt?ot.count=Math.max(ot.count,it.start+it.count-ot.start):(++vt,mt[vt]=it)}mt.length=vt+1;let rt=e.getParameter(n.UNPACK_ROW_LENGTH),at=e.getParameter(n.UNPACK_SKIP_PIXELS),xt=e.getParameter(n.UNPACK_SKIP_ROWS);e.pixelStorei(n.UNPACK_ROW_LENGTH,k.width);for(let X=0,ot=mt.length;X<ot;X++){let it=mt[X],yt=Math.floor(it.start/4),pt=Math.ceil(it.count/4),gt=yt%k.width,Ot=Math.floor(yt/k.width),$t=pt,ft=1;e.pixelStorei(n.UNPACK_SKIP_PIXELS,gt),e.pixelStorei(n.UNPACK_SKIP_ROWS,Ot),e.texSubImage2D(n.TEXTURE_2D,0,gt,Ot,$t,ft,Q,dt,k.data)}H.clearUpdateRanges(),e.pixelStorei(n.UNPACK_ROW_LENGTH,rt),e.pixelStorei(n.UNPACK_SKIP_PIXELS,at),e.pixelStorei(n.UNPACK_SKIP_ROWS,xt)}}function Jt(H,k,Q){let dt=n.TEXTURE_2D;(k.isDataArrayTexture||k.isCompressedArrayTexture)&&(dt=n.TEXTURE_2D_ARRAY),k.isData3DTexture&&(dt=n.TEXTURE_3D);let lt=Rt(H,k),mt=k.source;e.bindTexture(dt,H.__webglTexture,n.TEXTURE0+Q);let vt=i.get(mt);if(mt.version!==vt.__version||lt===!0){if(e.activeTexture(n.TEXTURE0+Q),(typeof ImageBitmap<"u"&&k.image instanceof ImageBitmap)===!1){let ft=ee.getPrimaries(ee.workingColorSpace),kt=k.colorSpace===ai?null:ee.getPrimaries(k.colorSpace),Yt=k.colorSpace===ai||ft===kt?n.NONE:n.BROWSER_DEFAULT_WEBGL;e.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,k.flipY),e.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,k.premultiplyAlpha),e.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,Yt)}e.pixelStorei(n.UNPACK_ALIGNMENT,k.unpackAlignment);let at=M(k.image,!1,s.maxTextureSize);at=Bt(k,at);let xt=r.convert(k.format,k.colorSpace),X=r.convert(k.type),ot=L(k.internalFormat,xt,X,k.normalized,k.colorSpace,k.isVideoTexture);ht(dt,k);let it,yt=k.mipmaps,pt=k.isVideoTexture!==!0,gt=vt.__version===void 0||lt===!0,Ot=mt.dataReady,$t=_(k,at);if(k.isDepthTexture)ot=g(k.format===ri,k.type),gt&&(pt?e.texStorage2D(n.TEXTURE_2D,1,ot,at.width,at.height):e.texImage2D(n.TEXTURE_2D,0,ot,at.width,at.height,0,xt,X,null));else if(k.isDataTexture)if(yt.length>0){pt&&gt&&e.texStorage2D(n.TEXTURE_2D,$t,ot,yt[0].width,yt[0].height);for(let ft=0,kt=yt.length;ft<kt;ft++)it=yt[ft],pt?Ot&&e.texSubImage2D(n.TEXTURE_2D,ft,0,0,it.width,it.height,xt,X,it.data):e.texImage2D(n.TEXTURE_2D,ft,ot,it.width,it.height,0,xt,X,it.data);k.generateMipmaps=!1}else pt?(gt&&e.texStorage2D(n.TEXTURE_2D,$t,ot,at.width,at.height),Ot&&Ft(k,at,xt,X)):e.texImage2D(n.TEXTURE_2D,0,ot,at.width,at.height,0,xt,X,at.data);else if(k.isCompressedTexture)if(k.isCompressedArrayTexture){pt&&gt&&e.texStorage3D(n.TEXTURE_2D_ARRAY,$t,ot,yt[0].width,yt[0].height,at.depth);for(let ft=0,kt=yt.length;ft<kt;ft++)if(it=yt[ft],k.format!==Nn)if(xt!==null)if(pt){if(Ot)if(k.layerUpdates.size>0){let Yt=kc(it.width,it.height,k.format,k.type);for(let bt of k.layerUpdates){let ae=it.data.subarray(bt*Yt/it.data.BYTES_PER_ELEMENT,(bt+1)*Yt/it.data.BYTES_PER_ELEMENT);e.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,ft,0,0,bt,it.width,it.height,1,xt,ae)}}else e.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,ft,0,0,0,it.width,it.height,at.depth,xt,it.data)}else e.compressedTexImage3D(n.TEXTURE_2D_ARRAY,ft,ot,it.width,it.height,at.depth,0,it.data,0,0);else Gt("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else pt?Ot&&e.texSubImage3D(n.TEXTURE_2D_ARRAY,ft,0,0,0,it.width,it.height,at.depth,xt,X,it.data):e.texImage3D(n.TEXTURE_2D_ARRAY,ft,ot,it.width,it.height,at.depth,0,xt,X,it.data);k.layerUpdates.size>0&&k.clearLayerUpdates()}else{pt&&gt&&e.texStorage2D(n.TEXTURE_2D,$t,ot,yt[0].width,yt[0].height);for(let ft=0,kt=yt.length;ft<kt;ft++)it=yt[ft],k.format!==Nn?xt!==null?pt?Ot&&e.compressedTexSubImage2D(n.TEXTURE_2D,ft,0,0,it.width,it.height,xt,it.data):e.compressedTexImage2D(n.TEXTURE_2D,ft,ot,it.width,it.height,0,it.data):Gt("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):pt?Ot&&e.texSubImage2D(n.TEXTURE_2D,ft,0,0,it.width,it.height,xt,X,it.data):e.texImage2D(n.TEXTURE_2D,ft,ot,it.width,it.height,0,xt,X,it.data)}else if(k.isDataArrayTexture)if(pt){if(gt&&e.texStorage3D(n.TEXTURE_2D_ARRAY,$t,ot,at.width,at.height,at.depth),Ot)if(k.layerUpdates.size>0){let ft=kc(at.width,at.height,k.format,k.type);for(let kt of k.layerUpdates){let Yt=at.data.subarray(kt*ft/at.data.BYTES_PER_ELEMENT,(kt+1)*ft/at.data.BYTES_PER_ELEMENT);e.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,kt,at.width,at.height,1,xt,X,Yt)}k.clearLayerUpdates()}else e.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,0,at.width,at.height,at.depth,xt,X,at.data)}else e.texImage3D(n.TEXTURE_2D_ARRAY,0,ot,at.width,at.height,at.depth,0,xt,X,at.data);else if(k.isData3DTexture)pt?(gt&&e.texStorage3D(n.TEXTURE_3D,$t,ot,at.width,at.height,at.depth),Ot&&e.texSubImage3D(n.TEXTURE_3D,0,0,0,0,at.width,at.height,at.depth,xt,X,at.data)):e.texImage3D(n.TEXTURE_3D,0,ot,at.width,at.height,at.depth,0,xt,X,at.data);else if(k.isFramebufferTexture){if(gt)if(pt)e.texStorage2D(n.TEXTURE_2D,$t,ot,at.width,at.height);else{let ft=at.width,kt=at.height;for(let Yt=0;Yt<$t;Yt++)e.texImage2D(n.TEXTURE_2D,Yt,ot,ft,kt,0,xt,X,null),ft>>=1,kt>>=1}}else if(k.isHTMLTexture){if("texElementImage2D"in n){let ft=n.canvas;if(ft.hasAttribute("layoutsubtree")||ft.setAttribute("layoutsubtree","true"),at.parentNode!==ft){ft.appendChild(at),f.add(k),ft.onpaint=kt=>{let Yt=kt.changedElements;for(let bt of f)Yt.includes(bt.image)&&(bt.needsUpdate=!0)},ft.requestPaint();return}if(n.texElementImage2D.length===3)n.texElementImage2D(n.TEXTURE_2D,n.RGBA8,at);else{let Yt=n.RGBA,bt=n.RGBA,ae=n.UNSIGNED_BYTE;n.texElementImage2D(n.TEXTURE_2D,0,Yt,bt,ae,at)}n.texParameteri(n.TEXTURE_2D,n.TEXTURE_MIN_FILTER,n.LINEAR),n.texParameteri(n.TEXTURE_2D,n.TEXTURE_WRAP_S,n.CLAMP_TO_EDGE),n.texParameteri(n.TEXTURE_2D,n.TEXTURE_WRAP_T,n.CLAMP_TO_EDGE)}}else if(yt.length>0){if(pt&&gt){let ft=Wt(yt[0]);e.texStorage2D(n.TEXTURE_2D,$t,ot,ft.width,ft.height)}for(let ft=0,kt=yt.length;ft<kt;ft++)it=yt[ft],pt?Ot&&e.texSubImage2D(n.TEXTURE_2D,ft,0,0,xt,X,it):e.texImage2D(n.TEXTURE_2D,ft,ot,xt,X,it);k.generateMipmaps=!1}else if(pt){if(gt){let ft=Wt(at);e.texStorage2D(n.TEXTURE_2D,$t,ot,ft.width,ft.height)}Ot&&e.texSubImage2D(n.TEXTURE_2D,0,0,0,xt,X,at)}else e.texImage2D(n.TEXTURE_2D,0,ot,xt,X,at);y(k)&&k.mipmapsAutoUpdate===!0&&w(dt),vt.__version=mt.version,k.onUpdate&&k.onUpdate(k)}H.__version=k.version}function ce(H,k,Q){if(k.image.length!==6)return;let dt=Rt(H,k),lt=k.source;e.bindTexture(n.TEXTURE_CUBE_MAP,H.__webglTexture,n.TEXTURE0+Q);let mt=i.get(lt);if(lt.version!==mt.__version||dt===!0){e.activeTexture(n.TEXTURE0+Q);let vt=ee.getPrimaries(ee.workingColorSpace),rt=k.colorSpace===ai?null:ee.getPrimaries(k.colorSpace),at=k.colorSpace===ai||vt===rt?n.NONE:n.BROWSER_DEFAULT_WEBGL;e.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,k.flipY),e.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,k.premultiplyAlpha),e.pixelStorei(n.UNPACK_ALIGNMENT,k.unpackAlignment),e.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,at);let xt=k.isCompressedTexture||k.image[0].isCompressedTexture,X=k.image[0]&&k.image[0].isDataTexture,ot=[];for(let bt=0;bt<6;bt++)!xt&&!X?ot[bt]=M(k.image[bt],!0,s.maxCubemapSize):ot[bt]=X?k.image[bt].image:k.image[bt],ot[bt]=Bt(k,ot[bt]);let it=ot[0],yt=r.convert(k.format,k.colorSpace),pt=r.convert(k.type),gt=L(k.internalFormat,yt,pt,k.normalized,k.colorSpace),Ot=k.isVideoTexture!==!0,$t=mt.__version===void 0||dt===!0,ft=lt.dataReady,kt=_(k,it);ht(n.TEXTURE_CUBE_MAP,k);let Yt;if(k.isDepthTexture){if(gt=g(k.format===ri,k.type),$t)if(Ot)e.texStorage2D(n.TEXTURE_CUBE_MAP,1,gt,it.width,it.height);else for(let bt=0;bt<6;bt++)e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+bt,0,gt,it.width,it.height,0,yt,pt,null)}else if(xt){Ot&&$t&&e.texStorage2D(n.TEXTURE_CUBE_MAP,kt,gt,it.width,it.height);for(let bt=0;bt<6;bt++){Yt=ot[bt].mipmaps;for(let ae=0;ae<Yt.length;ae++){let Ce=Yt[ae];k.format!==Nn?yt!==null?Ot?ft&&e.compressedTexSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+bt,ae,0,0,Ce.width,Ce.height,yt,Ce.data):e.compressedTexImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+bt,ae,gt,Ce.width,Ce.height,0,Ce.data):Gt("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):Ot?ft&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+bt,ae,0,0,Ce.width,Ce.height,yt,pt,Ce.data):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+bt,ae,gt,Ce.width,Ce.height,0,yt,pt,Ce.data)}}}else{if(Yt=k.mipmaps,Ot&&$t){Yt.length>0&&kt++;let bt=Wt(ot[0]);e.texStorage2D(n.TEXTURE_CUBE_MAP,kt,gt,bt.width,bt.height)}for(let bt=0;bt<6;bt++)if(X){Ot?ft&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+bt,0,0,0,ot[bt].width,ot[bt].height,yt,pt,ot[bt].data):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+bt,0,gt,ot[bt].width,ot[bt].height,0,yt,pt,ot[bt].data);for(let ae=0;ae<Yt.length;ae++){let li=Yt[ae].image[bt].image;Ot?ft&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+bt,ae+1,0,0,li.width,li.height,yt,pt,li.data):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+bt,ae+1,gt,li.width,li.height,0,yt,pt,li.data)}}else{Ot?ft&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+bt,0,0,0,yt,pt,ot[bt]):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+bt,0,gt,yt,pt,ot[bt]);for(let ae=0;ae<Yt.length;ae++){let Ce=Yt[ae];Ot?ft&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+bt,ae+1,0,0,yt,pt,Ce.image[bt]):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+bt,ae+1,gt,yt,pt,Ce.image[bt])}}}y(k)&&k.mipmapsAutoUpdate===!0&&w(n.TEXTURE_CUBE_MAP),mt.__version=lt.version,k.onUpdate&&k.onUpdate(k)}H.__version=k.version}function ge(H,k,Q,dt,lt,mt){let vt=r.convert(Q.format,Q.colorSpace),rt=r.convert(Q.type),at=L(Q.internalFormat,vt,rt,Q.normalized,Q.colorSpace),xt=i.get(k),X=i.get(Q);if(X.__renderTarget=k,!xt.__hasExternalTextures){let ot=Math.max(1,k.width>>mt),it=Math.max(1,k.height>>mt);lt===n.TEXTURE_3D||lt===n.TEXTURE_2D_ARRAY?e.texImage3D(lt,mt,at,ot,it,k.depth,0,vt,rt,null):e.texImage2D(lt,mt,at,ot,it,0,vt,rt,null)}e.bindFramebuffer(n.FRAMEBUFFER,H),St(k)?o.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,dt,lt,X.__webglTexture,0,pe(k)):(lt===n.TEXTURE_2D||lt>=n.TEXTURE_CUBE_MAP_POSITIVE_X&&lt<=n.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&n.framebufferTexture2D(n.FRAMEBUFFER,dt,lt,X.__webglTexture,mt),e.bindFramebuffer(n.FRAMEBUFFER,null)}function On(H,k,Q){if(n.bindRenderbuffer(n.RENDERBUFFER,H),k.depthBuffer){let dt=k.depthTexture,lt=dt&&dt.isDepthTexture?dt.type:null,mt=g(k.stencilBuffer,lt),vt=k.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;St(k)?o.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,pe(k),mt,k.width,k.height):Q?n.renderbufferStorageMultisample(n.RENDERBUFFER,pe(k),mt,k.width,k.height):n.renderbufferStorage(n.RENDERBUFFER,mt,k.width,k.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,vt,n.RENDERBUFFER,H)}else{let dt=k.textures;for(let lt=0;lt<dt.length;lt++){let mt=dt[lt],vt=r.convert(mt.format,mt.colorSpace),rt=r.convert(mt.type),at=L(mt.internalFormat,vt,rt,mt.normalized,mt.colorSpace);St(k)?o.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,pe(k),at,k.width,k.height):Q?n.renderbufferStorageMultisample(n.RENDERBUFFER,pe(k),at,k.width,k.height):n.renderbufferStorage(n.RENDERBUFFER,at,k.width,k.height)}}n.bindRenderbuffer(n.RENDERBUFFER,null)}function Ae(H,k,Q){let dt=k.isWebGLCubeRenderTarget===!0;if(e.bindFramebuffer(n.FRAMEBUFFER,H),!(k.depthTexture&&k.depthTexture.isDepthTexture))throw new Error("THREE.WebGLTextures: renderTarget.depthTexture must be an instance of THREE.DepthTexture.");let lt=i.get(k.depthTexture);lt.__renderTarget=k;let mt=dt?k.depthTexture.image[0]:k.depthTexture.image;(!lt.__webglTexture||mt.width!==k.width||mt.height!==k.height)&&(mt.width=k.width,mt.height=k.height,k.depthTexture.needsUpdate=!0),dt?Y(k.depthTexture,0):V(k.depthTexture,0);let vt=lt.__webglTexture,rt=pe(k),at=dt?n.TEXTURE_CUBE_MAP_POSITIVE_X+Q:n.TEXTURE_2D,xt=k.depthTexture.format===ri?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;if(k.depthTexture.format===ei)St(k)?o.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,xt,at,vt,0,rt):n.framebufferTexture2D(n.FRAMEBUFFER,xt,at,vt,0);else if(k.depthTexture.format===ri)St(k)?o.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,xt,at,vt,0,rt):n.framebufferTexture2D(n.FRAMEBUFFER,xt,at,vt,0);else throw new Error("THREE.WebGLTextures: Unknown depthTexture format.")}function hn(H){let k=i.get(H),Q=H.isWebGLCubeRenderTarget===!0;if(k.__boundDepthTexture!==H.depthTexture){let dt=H.depthTexture;if(k.__depthDisposeCallback&&k.__depthDisposeCallback(),dt){let lt=()=>{delete k.__boundDepthTexture,delete k.__depthDisposeCallback,dt.removeEventListener("dispose",lt)};dt.addEventListener("dispose",lt),k.__depthDisposeCallback=lt}k.__boundDepthTexture=dt}if(H.depthTexture&&!k.__autoAllocateDepthBuffer)if(Q)for(let dt=0;dt<6;dt++)Ae(k.__webglFramebuffer[dt],H,dt);else H.texture.mipmaps.length>0?Ae(k.__webglFramebuffer[0],H,0):Ae(k.__webglFramebuffer,H,0);else if(Q){k.__webglDepthbuffer=[];for(let dt=0;dt<6;dt++)if(e.bindFramebuffer(n.FRAMEBUFFER,k.__webglFramebuffer[dt]),k.__webglDepthbuffer[dt]===void 0)k.__webglDepthbuffer[dt]=n.createRenderbuffer(),On(k.__webglDepthbuffer[dt],H,!1);else{let lt=H.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,mt=k.__webglDepthbuffer[dt];n.bindRenderbuffer(n.RENDERBUFFER,mt),n.framebufferRenderbuffer(n.FRAMEBUFFER,lt,n.RENDERBUFFER,mt)}}else if(H.texture.mipmaps.length>0?e.bindFramebuffer(n.FRAMEBUFFER,k.__webglFramebuffer[0]):e.bindFramebuffer(n.FRAMEBUFFER,k.__webglFramebuffer),k.__webglDepthbuffer===void 0)k.__webglDepthbuffer=n.createRenderbuffer(),On(k.__webglDepthbuffer,H,!1);else{let lt=H.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,mt=k.__webglDepthbuffer;n.bindRenderbuffer(n.RENDERBUFFER,mt),n.framebufferRenderbuffer(n.FRAMEBUFFER,lt,n.RENDERBUFFER,mt)}e.bindFramebuffer(n.FRAMEBUFFER,null)}function un(H,k,Q){let dt=i.get(H);k!==void 0&&ge(dt.__webglFramebuffer,H,H.texture,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,0),Q!==void 0&&hn(H)}function dn(H){let k=H.texture,Q=i.get(H),dt=i.get(k);H.addEventListener("dispose",E),U(H);let lt=H.textures,mt=H.isWebGLCubeRenderTarget===!0,vt=lt.length>1;if(vt||(dt.__webglTexture===void 0&&(dt.__webglTexture=n.createTexture()),dt.__version=k.version,a.memory.textures++),mt){Q.__webglFramebuffer=[];for(let rt=0;rt<6;rt++)if(k.mipmaps.length>0){Q.__webglFramebuffer[rt]=[];for(let at=0;at<k.mipmaps.length;at++)Q.__webglFramebuffer[rt][at]=n.createFramebuffer()}else Q.__webglFramebuffer[rt]=n.createFramebuffer()}else{if(k.mipmaps.length>0){Q.__webglFramebuffer=[];for(let rt=0;rt<k.mipmaps.length;rt++)Q.__webglFramebuffer[rt]=n.createFramebuffer()}else Q.__webglFramebuffer=n.createFramebuffer();if(vt)for(let rt=0,at=lt.length;rt<at;rt++){let xt=i.get(lt[rt]);xt.__webglTexture===void 0&&(xt.__webglTexture=n.createTexture(),a.memory.textures++)}if(H.samples>0&&St(H)===!1){Q.__webglMultisampledFramebuffer=n.createFramebuffer(),Q.__webglColorRenderbuffer=[],e.bindFramebuffer(n.FRAMEBUFFER,Q.__webglMultisampledFramebuffer);for(let rt=0;rt<lt.length;rt++){let at=lt[rt];Q.__webglColorRenderbuffer[rt]=n.createRenderbuffer(),n.bindRenderbuffer(n.RENDERBUFFER,Q.__webglColorRenderbuffer[rt]);let xt=r.convert(at.format,at.colorSpace),X=r.convert(at.type),ot=L(at.internalFormat,xt,X,at.normalized,at.colorSpace,H.isXRRenderTarget===!0),it=pe(H);n.renderbufferStorageMultisample(n.RENDERBUFFER,it,ot,H.width,H.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+rt,n.RENDERBUFFER,Q.__webglColorRenderbuffer[rt])}n.bindRenderbuffer(n.RENDERBUFFER,null),H.depthBuffer&&(Q.__webglDepthRenderbuffer=n.createRenderbuffer(),On(Q.__webglDepthRenderbuffer,H,!0)),e.bindFramebuffer(n.FRAMEBUFFER,null)}}if(mt){e.bindTexture(n.TEXTURE_CUBE_MAP,dt.__webglTexture),ht(n.TEXTURE_CUBE_MAP,k);for(let rt=0;rt<6;rt++)if(k.mipmaps.length>0)for(let at=0;at<k.mipmaps.length;at++)ge(Q.__webglFramebuffer[rt][at],H,k,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+rt,at);else ge(Q.__webglFramebuffer[rt],H,k,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+rt,0);y(k)?w(n.TEXTURE_CUBE_MAP):k.mipmaps.length>0&&n.texParameteri(n.TEXTURE_CUBE_MAP,n.TEXTURE_MAX_LEVEL,k.mipmaps.length-1),e.unbindTexture()}else if(vt){for(let rt=0,at=lt.length;rt<at;rt++){let xt=lt[rt],X=i.get(xt),ot=n.TEXTURE_2D;(H.isWebGL3DRenderTarget||H.isWebGLArrayRenderTarget)&&(ot=H.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY),e.bindTexture(ot,X.__webglTexture),ht(ot,xt),ge(Q.__webglFramebuffer,H,xt,n.COLOR_ATTACHMENT0+rt,ot,0),y(xt)&&w(ot)}e.unbindTexture()}else{let rt=n.TEXTURE_2D;if((H.isWebGL3DRenderTarget||H.isWebGLArrayRenderTarget)&&(rt=H.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY),e.bindTexture(rt,dt.__webglTexture),ht(rt,k),k.mipmaps.length>0)for(let at=0;at<k.mipmaps.length;at++)ge(Q.__webglFramebuffer[at],H,k,n.COLOR_ATTACHMENT0,rt,at);else ge(Q.__webglFramebuffer,H,k,n.COLOR_ATTACHMENT0,rt,0);y(k)?w(rt):k.mipmaps.length>0&&n.texParameteri(rt,n.TEXTURE_MAX_LEVEL,k.mipmaps.length-1),e.unbindTexture()}H.depthBuffer&&hn(H)}function K(H){let k=H.textures;for(let Q=0,dt=k.length;Q<dt;Q++){let lt=k[Q];if(y(lt)&&lt.mipmapsAutoUpdate===!0){let mt=I(H),vt=i.get(lt).__webglTexture;e.bindTexture(mt,vt),w(mt),e.unbindTexture()}}}let fn=[];function fe(H){if(H.samples>0){if(St(H)===!1){let k=H.textures,Q=H.width,dt=H.height,lt=n.COLOR_BUFFER_BIT,mt=H.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,vt=i.get(H),rt=k.length>1;if(rt)for(let xt=0;xt<k.length;xt++)e.bindFramebuffer(n.FRAMEBUFFER,vt.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+xt,n.RENDERBUFFER,null),e.bindFramebuffer(n.FRAMEBUFFER,vt.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+xt,n.TEXTURE_2D,null,0);e.bindFramebuffer(n.READ_FRAMEBUFFER,vt.__webglMultisampledFramebuffer),H.texture.mipmaps.length>0?e.bindFramebuffer(n.DRAW_FRAMEBUFFER,vt.__webglFramebuffer[0]):e.bindFramebuffer(n.DRAW_FRAMEBUFFER,vt.__webglFramebuffer);for(let xt=0;xt<k.length;xt++){if(H.resolveDepthBuffer&&(H.depthBuffer&&(lt|=n.DEPTH_BUFFER_BIT),H.stencilBuffer&&H.resolveStencilBuffer&&(lt|=n.STENCIL_BUFFER_BIT)),rt){n.framebufferRenderbuffer(n.READ_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.RENDERBUFFER,vt.__webglColorRenderbuffer[xt]);let X=i.get(k[xt]).__webglTexture;n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,X,0)}n.blitFramebuffer(0,0,Q,dt,0,0,Q,dt,lt,n.NEAREST),l===!0&&(fn.length=0,fn.push(n.COLOR_ATTACHMENT0+xt),H.depthBuffer&&H.storeMultisampledDepthBuffer===!1&&fn.push(mt),n.invalidateFramebuffer(n.READ_FRAMEBUFFER,fn))}if(e.bindFramebuffer(n.READ_FRAMEBUFFER,null),e.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),rt)for(let xt=0;xt<k.length;xt++){e.bindFramebuffer(n.FRAMEBUFFER,vt.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+xt,n.RENDERBUFFER,vt.__webglColorRenderbuffer[xt]);let X=i.get(k[xt]).__webglTexture;e.bindFramebuffer(n.FRAMEBUFFER,vt.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+xt,n.TEXTURE_2D,X,0)}e.bindFramebuffer(n.DRAW_FRAMEBUFFER,vt.__webglMultisampledFramebuffer)}else if(H.depthBuffer&&H.storeMultisampledDepthBuffer===!1&&l){let k=H.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,[k])}}}function pe(H){return Math.min(s.maxSamples,H.samples)}function St(H){let k=i.get(H);return H.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&k.__useRenderToTexture!==!1}function we(H){let k=a.render.frame;u.get(H)!==k&&(u.set(H,k),H.update())}function Bt(H,k){let Q=H.colorSpace,dt=H.format,lt=H.type;return H.isCompressedTexture===!0||H.isVideoTexture===!0||Q!==er&&Q!==ai&&(ee.getTransfer(Q)===re?(dt!==Nn||lt!==tn)&&Gt("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):Vt("WebGLTextures: Unsupported texture color space:",Q)),k}function Wt(H){return typeof HTMLImageElement<"u"&&H instanceof HTMLImageElement?(c.width=H.naturalWidth||H.width,c.height=H.naturalHeight||H.height):typeof VideoFrame<"u"&&H instanceof VideoFrame?(c.width=H.displayWidth,c.height=H.displayHeight):(c.width=H.width,c.height=H.height),c}this.allocateTextureUnit=q,this.resetTextureUnits=N,this.getTextureUnits=v,this.setTextureUnits=G,this.setTexture2D=V,this.setTexture2DArray=W,this.setTexture3D=Z,this.setTextureCube=Y,this.rebindTextures=un,this.setupRenderTarget=dn,this.updateRenderTargetMipmap=K,this.updateMultisampleRenderTarget=fe,this.setupDepthRenderbuffer=hn,this.setupFrameBufferTexture=ge,this.useMultisampledRTT=St,this.dispose=R}function sy(n,t){function e(i,s=ai){let r,a=ee.getTransfer(s);if(i===tn)return n.UNSIGNED_BYTE;if(i===Xa)return n.UNSIGNED_SHORT_4_4_4_4;if(i===Ya)return n.UNSIGNED_SHORT_5_5_5_1;if(i===wc)return n.UNSIGNED_INT_5_9_9_9_REV;if(i===Tc)return n.UNSIGNED_INT_10F_11F_11F_REV;if(i===Sc)return n.BYTE;if(i===bc)return n.SHORT;if(i===Ns)return n.UNSIGNED_SHORT;if(i===qa)return n.INT;if(i===In)return n.UNSIGNED_INT;if(i===Pn)return n.FLOAT;if(i===Ln)return n.HALF_FLOAT;if(i===Ec)return n.ALPHA;if(i===Ac)return n.RGB;if(i===Nn)return n.RGBA;if(i===ei)return n.DEPTH_COMPONENT;if(i===ri)return n.DEPTH_STENCIL;if(i===Cc)return n.RED;if(i===$a)return n.RED_INTEGER;if(i===Ai)return n.RG;if(i===Za)return n.RG_INTEGER;if(i===Ka)return n.RGBA_INTEGER;if(i===vr||i===Mr||i===Sr||i===br)if(a===re)if(r=t.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(i===vr)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(i===Mr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(i===Sr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(i===br)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=t.get("WEBGL_compressed_texture_s3tc"),r!==null){if(i===vr)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(i===Mr)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(i===Sr)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(i===br)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(i===Ja||i===Qa||i===ja||i===to)if(r=t.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(i===Ja)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(i===Qa)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(i===ja)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(i===to)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(i===eo||i===no||i===io||i===so||i===ro||i===wr||i===ao)if(r=t.get("WEBGL_compressed_texture_etc"),r!==null){if(i===eo||i===no)return a===re?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(i===io)return a===re?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC;if(i===so)return r.COMPRESSED_R11_EAC;if(i===ro)return r.COMPRESSED_SIGNED_R11_EAC;if(i===wr)return r.COMPRESSED_RG11_EAC;if(i===ao)return r.COMPRESSED_SIGNED_RG11_EAC}else return null;if(i===oo||i===lo||i===co||i===ho||i===uo||i===fo||i===po||i===mo||i===go||i===xo||i===yo||i===_o||i===vo||i===Mo)if(r=t.get("WEBGL_compressed_texture_astc"),r!==null){if(i===oo)return a===re?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(i===lo)return a===re?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(i===co)return a===re?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(i===ho)return a===re?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(i===uo)return a===re?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(i===fo)return a===re?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(i===po)return a===re?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(i===mo)return a===re?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(i===go)return a===re?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(i===xo)return a===re?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(i===yo)return a===re?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(i===_o)return a===re?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(i===vo)return a===re?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(i===Mo)return a===re?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(i===So||i===bo||i===wo)if(r=t.get("EXT_texture_compression_bptc"),r!==null){if(i===So)return a===re?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(i===bo)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(i===wo)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(i===To||i===Eo||i===Tr||i===Ao)if(r=t.get("EXT_texture_compression_rgtc"),r!==null){if(i===To)return r.COMPRESSED_RED_RGTC1_EXT;if(i===Eo)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(i===Tr)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(i===Ao)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return i===$i?n.UNSIGNED_INT_24_8:n[i]!==void 0?n[i]:null}return{convert:e}}var ry=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,ay=`
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

}`,Qc=class{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(t,e){if(this.texture===null){let i=new hr(t.texture);(t.depthNear!==e.depthNear||t.depthFar!==e.depthFar)&&(this.depthNear=t.depthNear,this.depthFar=t.depthFar),this.texture=i}}getMesh(t){if(this.texture!==null&&this.mesh===null){let e=t.cameras[0].viewport,i=new Hn({vertexShader:ry,fragmentShader:ay,uniforms:{depthColor:{value:this.texture},depthWidth:{value:e.z},depthHeight:{value:e.w}}});this.mesh=new je(new Si(20,20),i)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}},jc=class extends Gn{constructor(t,e){super();let i=this,s=null,r=1,a=null,o="local-floor",l=1,c=null,u=null,f=null,h=null,d=null,p=null,T=typeof XRWebGLBinding<"u",x=new Qc,m={},M=e.getContextAttributes(),y=null,w=null,I=[],L=[],g=new Qt,_=null,U=null,C=new qe;C.viewport=new me;let F=new qe;F.viewport=new me;let E=[C,F],O=new za,D=null,R=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(S){let V=I[S];return V===void 0&&(V=new Ts,I[S]=V),V.getTargetRaySpace()},this.getControllerGrip=function(S){let V=I[S];return V===void 0&&(V=new Ts,I[S]=V),V.getGripSpace()},this.getHand=function(S){let V=I[S];return V===void 0&&(V=new Ts,I[S]=V),V.getHandSpace()};function B(S){let V=L.indexOf(S.inputSource);if(V===-1)return;let W=I[V];W!==void 0&&(W.update(S.inputSource,S.frame,c||a),W.dispatchEvent({type:S.type,data:S.inputSource}))}function b(){s.removeEventListener("select",B),s.removeEventListener("selectstart",B),s.removeEventListener("selectend",B),s.removeEventListener("squeeze",B),s.removeEventListener("squeezestart",B),s.removeEventListener("squeezeend",B),s.removeEventListener("end",b),s.removeEventListener("inputsourceschange",P);for(let S=0;S<I.length;S++){let V=L[S];V!==null&&(L[S]=null,I[S].disconnect(V))}D=null,R=null,x.reset();for(let S in m)delete m[S];if(t.setRenderTarget(y),d=null,h=null,f=null,s=null,w=null,q.stop(),i.isPresenting=!1,t.setPixelRatio(_),t.setSize(g.width,g.height,!1),U!==null){let S=U.camera;S.fov=U.fov,S.zoom=U.zoom,S.updateProjectionMatrix(),U=null}i.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(S){r=S,i.isPresenting===!0&&Gt("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(S){o=S,i.isPresenting===!0&&Gt("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||a},this.setReferenceSpace=function(S){c=S},this.getBaseLayer=function(){return h!==null?h:d},this.getBinding=function(){return f===null&&T&&(f=new XRWebGLBinding(s,e)),f},this.getFrame=function(){return p},this.getSession=function(){return s},this.setSession=async function(S){if(s=S,s!==null){if(y=t.getRenderTarget(),s.addEventListener("select",B),s.addEventListener("selectstart",B),s.addEventListener("selectend",B),s.addEventListener("squeeze",B),s.addEventListener("squeezestart",B),s.addEventListener("squeezeend",B),s.addEventListener("end",b),s.addEventListener("inputsourceschange",P),M.xrCompatible!==!0&&await e.makeXRCompatible(),_=t.getPixelRatio(),t.getSize(g),T&&"createProjectionLayer"in XRWebGLBinding.prototype){let W=null,Z=null,Y=null;M.depth&&(Y=M.stencil?e.DEPTH24_STENCIL8:e.DEPTH_COMPONENT24,W=M.stencil?ri:ei,Z=M.stencil?$i:In);let j={colorFormat:e.RGBA8,depthFormat:Y,scaleFactor:r};f=this.getBinding(),h=f.createProjectionLayer(j),s.updateRenderState({layers:[h]}),t.setPixelRatio(1),t.setSize(h.textureWidth,h.textureHeight,!1),w=new ln(h.textureWidth,h.textureHeight,{format:Nn,type:tn,depthTexture:new ii(h.textureWidth,h.textureHeight,Z,void 0,void 0,void 0,void 0,void 0,void 0,W),stencilBuffer:M.stencil,colorSpace:t.outputColorSpace,samples:M.antialias?4:0,resolveDepthBuffer:h.ignoreDepthValues===!1,resolveStencilBuffer:h.ignoreDepthValues===!1,storeMultisampledDepthBuffer:h.ignoreDepthValues===!1,storeMultisampledStencilBuffer:h.ignoreDepthValues===!1})}else{let W={antialias:M.antialias,alpha:!0,depth:M.depth,stencil:M.stencil,framebufferScaleFactor:r};d=new XRWebGLLayer(s,e,W),s.updateRenderState({baseLayer:d}),t.setPixelRatio(1),t.setSize(d.framebufferWidth,d.framebufferHeight,!1),w=new ln(d.framebufferWidth,d.framebufferHeight,{format:Nn,type:tn,colorSpace:t.outputColorSpace,stencilBuffer:M.stencil,resolveDepthBuffer:d.ignoreDepthValues===!1,resolveStencilBuffer:d.ignoreDepthValues===!1,storeMultisampledDepthBuffer:d.ignoreDepthValues===!1,storeMultisampledStencilBuffer:d.ignoreDepthValues===!1})}w.isXRRenderTarget=!0,this.setFoveation(l),c=null,a=await s.requestReferenceSpace(o),q.setContext(s),q.start(),i.isPresenting=!0,i.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return x.getDepthTexture()};function P(S){for(let V=0;V<S.removed.length;V++){let W=S.removed[V],Z=L.indexOf(W);Z>=0&&(L[Z]=null,I[Z].disconnect(W))}for(let V=0;V<S.added.length;V++){let W=S.added[V],Z=L.indexOf(W);if(Z===-1){for(let j=0;j<I.length;j++)if(j>=L.length){L.push(W),Z=j;break}else if(L[j]===null){L[j]=W,Z=j;break}if(Z===-1)break}let Y=I[Z];Y&&Y.connect(W)}}function A(S,V){V===null?S.matrixWorld.copy(S.matrix):S.matrixWorld.multiplyMatrices(V.matrixWorld,S.matrix),S.matrixWorldInverse.copy(S.matrixWorld).invert()}this.updateCamera=function(S){if(s===null)return;let V=S.near,W=S.far;x.texture!==null&&(x.depthNear>0&&(V=x.depthNear),x.depthFar>0&&(W=x.depthFar)),O.near=F.near=C.near=V,O.far=F.far=C.far=W,(D!==O.near||R!==O.far)&&(s.updateRenderState({depthNear:O.near,depthFar:O.far}),D=O.near,R=O.far),O.layers.mask=S.layers.mask|6,C.layers.mask=O.layers.mask&-5,F.layers.mask=O.layers.mask&-3;let Z=S.parent,Y=O.cameras;A(O,Z);for(let j=0;j<Y.length;j++)A(Y[j],Z);O.projectionMatrix.copy(C.projectionMatrix),O.projectionMatrixInverse.copy(C.projectionMatrixInverse),U===null&&S.isPerspectiveCamera&&(U={camera:S,fov:S.fov,zoom:S.zoom}),N(S,O,Z)};function N(S,V,W){W===null?S.matrix.copy(V.matrixWorld):(S.matrix.copy(W.matrixWorld),S.matrix.invert(),S.matrix.multiply(V.matrixWorld)),S.matrix.decompose(S.position,S.quaternion,S.scale),S.updateMatrixWorld(!0),S.projectionMatrix.copy(V.projectionMatrix),S.projectionMatrixInverse.copy(V.projectionMatrixInverse),S.isPerspectiveCamera&&(S.fov=va*2*Math.atan(1/S.projectionMatrix.elements[5]),S.zoom=1)}this.getCamera=function(){return O},this.getFoveation=function(){if(!(h===null&&d===null))return l},this.setFoveation=function(S){l=S,h!==null&&(h.fixedFoveation=S),d!==null&&d.fixedFoveation!==void 0&&(d.fixedFoveation=S)},this.hasDepthSensing=function(){return x.texture!==null},this.getDepthSensingMesh=function(){return x.getMesh(O)},this.getCameraTexture=function(S){return m[S]};let v=null;function G(S,V){if(u=V.getViewerPose(c||a),p=V,u!==null){let W=u.views;d!==null&&(t.setRenderTargetFramebuffer(w,d.framebuffer),t.setRenderTarget(w));let Z=!1;W.length!==O.cameras.length&&(O.cameras.length=0,Z=!0);for(let ut=0;ut<W.length;ut++){let ht=W[ut],Rt=null;if(d!==null)Rt=d.getViewport(ht);else{let Ft=f.getViewSubImage(h,ht);Rt=Ft.viewport,ut===0&&(t.setRenderTargetTextures(w,Ft.colorTexture,Ft.depthStencilTexture),t.setRenderTarget(w))}let Ut=E[ut];Ut===void 0&&(Ut=new qe,Ut.layers.enable(ut),Ut.viewport=new me,E[ut]=Ut),Ut.matrix.fromArray(ht.transform.matrix),Ut.matrix.decompose(Ut.position,Ut.quaternion,Ut.scale),Ut.projectionMatrix.fromArray(ht.projectionMatrix),Ut.projectionMatrixInverse.copy(Ut.projectionMatrix).invert(),Ut.viewport.set(Rt.x,Rt.y,Rt.width,Rt.height),ut===0&&(O.matrix.copy(Ut.matrix),O.matrix.decompose(O.position,O.quaternion,O.scale)),Z===!0&&O.cameras.push(Ut)}let Y=s.enabledFeatures;if(Y&&Y.includes("depth-sensing")&&s.depthUsage=="gpu-optimized"&&T){f=i.getBinding();let ut=f.getDepthInformation(W[0]);ut&&ut.isValid&&ut.texture&&x.init(ut,s.renderState)}if(Y&&Y.includes("camera-access")&&T){t.state.unbindTexture(),f=i.getBinding();for(let ut=0;ut<W.length;ut++){let ht=W[ut].camera;if(ht){let Rt=m[ht];Rt||(Rt=new hr,m[ht]=Rt);let Ut=f.getCameraImage(ht);Rt.sourceTexture=Ut}}}}for(let W=0;W<I.length;W++){let Z=L[W],Y=I[W];Z!==null&&Y!==void 0&&Y.update(Z,V,c||a)}v&&v(S,V),V.detectedPlanes&&i.dispatchEvent({type:"planesdetected",data:V}),p=null}let q=new Rd;q.setAnimationLoop(G),this.setAnimationLoop=function(S){v=S},this.dispose=function(){}}},oy=new de,Bd=new Ht;Bd.set(-1,0,0,0,1,0,0,0,1);function ly(n,t){function e(x,m){x.matrixAutoUpdate===!0&&x.updateMatrix(),m.value.copy(x.matrix)}function i(x,m){m.color.getRGB(x.fogColor.value,Uc(n)),m.isFog?(x.fogNear.value=m.near,x.fogFar.value=m.far):m.isFogExp2&&(x.fogDensity.value=m.density)}function s(x,m,M,y,w){m.isNodeMaterial?m.uniformsNeedUpdate=!1:m.isMeshBasicMaterial?r(x,m):m.isMeshLambertMaterial?(r(x,m),m.envMap&&(x.envMapIntensity.value=m.envMapIntensity)):m.isMeshToonMaterial?(r(x,m),f(x,m)):m.isMeshPhongMaterial?(r(x,m),u(x,m),m.envMap&&(x.envMapIntensity.value=m.envMapIntensity)):m.isMeshStandardMaterial?(r(x,m),h(x,m),m.isMeshPhysicalMaterial&&d(x,m,w)):m.isMeshMatcapMaterial?(r(x,m),p(x,m)):m.isMeshDepthMaterial?r(x,m):m.isMeshDistanceMaterial?(r(x,m),T(x,m)):m.isMeshNormalMaterial?r(x,m):m.isLineBasicMaterial?(a(x,m),m.isLineDashedMaterial&&o(x,m)):m.isPointsMaterial?l(x,m,M,y):m.isSpriteMaterial?c(x,m):m.isShadowMaterial?(x.color.value.copy(m.color),x.opacity.value=m.opacity):m.isShaderMaterial&&(m.uniformsNeedUpdate=!1)}function r(x,m){x.opacity.value=m.opacity,m.color&&x.diffuse.value.copy(m.color),m.emissive&&x.emissive.value.copy(m.emissive).multiplyScalar(m.emissiveIntensity),m.map&&(x.map.value=m.map,e(m.map,x.mapTransform)),m.alphaMap&&(x.alphaMap.value=m.alphaMap,e(m.alphaMap,x.alphaMapTransform)),m.bumpMap&&(x.bumpMap.value=m.bumpMap,e(m.bumpMap,x.bumpMapTransform),x.bumpScale.value=m.bumpScale,m.side===Ze&&(x.bumpScale.value*=-1)),m.normalMap&&(x.normalMap.value=m.normalMap,e(m.normalMap,x.normalMapTransform),x.normalScale.value.copy(m.normalScale),m.side===Ze&&x.normalScale.value.negate()),m.displacementMap&&(x.displacementMap.value=m.displacementMap,e(m.displacementMap,x.displacementMapTransform),x.displacementScale.value=m.displacementScale,x.displacementBias.value=m.displacementBias),m.emissiveMap&&(x.emissiveMap.value=m.emissiveMap,e(m.emissiveMap,x.emissiveMapTransform)),m.specularMap&&(x.specularMap.value=m.specularMap,e(m.specularMap,x.specularMapTransform)),m.alphaTest>0&&(x.alphaTest.value=m.alphaTest);let M=t.get(m),y=M.envMap,w=M.envMapRotation;y&&(x.envMap.value=y,x.envMapRotation.value.setFromMatrix4(oy.makeRotationFromEuler(w)).transpose(),y.isCubeTexture&&y.isRenderTargetTexture===!1&&x.envMapRotation.value.premultiply(Bd),x.reflectivity.value=m.reflectivity,x.ior.value=m.ior,x.refractionRatio.value=m.refractionRatio),m.lightMap&&(x.lightMap.value=m.lightMap,x.lightMapIntensity.value=m.lightMapIntensity,e(m.lightMap,x.lightMapTransform)),m.aoMap&&(x.aoMap.value=m.aoMap,x.aoMapIntensity.value=m.aoMapIntensity,e(m.aoMap,x.aoMapTransform))}function a(x,m){x.diffuse.value.copy(m.color),x.opacity.value=m.opacity,m.map&&(x.map.value=m.map,e(m.map,x.mapTransform))}function o(x,m){x.dashSize.value=m.dashSize,x.totalSize.value=m.dashSize+m.gapSize,x.scale.value=m.scale}function l(x,m,M,y){x.diffuse.value.copy(m.color),x.opacity.value=m.opacity,x.size.value=m.size*M,x.scale.value=y*.5,m.map&&(x.map.value=m.map,e(m.map,x.uvTransform)),m.alphaMap&&(x.alphaMap.value=m.alphaMap,e(m.alphaMap,x.alphaMapTransform)),m.alphaTest>0&&(x.alphaTest.value=m.alphaTest)}function c(x,m){x.diffuse.value.copy(m.color),x.opacity.value=m.opacity,x.rotation.value=m.rotation,m.map&&(x.map.value=m.map,e(m.map,x.mapTransform)),m.alphaMap&&(x.alphaMap.value=m.alphaMap,e(m.alphaMap,x.alphaMapTransform)),m.alphaTest>0&&(x.alphaTest.value=m.alphaTest)}function u(x,m){x.specular.value.copy(m.specular),x.shininess.value=Math.max(m.shininess,1e-4)}function f(x,m){m.gradientMap&&(x.gradientMap.value=m.gradientMap)}function h(x,m){x.metalness.value=m.metalness,m.metalnessMap&&(x.metalnessMap.value=m.metalnessMap,e(m.metalnessMap,x.metalnessMapTransform)),x.roughness.value=m.roughness,m.roughnessMap&&(x.roughnessMap.value=m.roughnessMap,e(m.roughnessMap,x.roughnessMapTransform)),m.envMap&&(x.envMapIntensity.value=m.envMapIntensity)}function d(x,m,M){x.ior.value=m.ior,m.diffuseRoughness>0&&(x.diffuseRoughness.value=m.diffuseRoughness,m.diffuseRoughnessMap&&(x.diffuseRoughnessMap.value=m.diffuseRoughnessMap,e(m.diffuseRoughnessMap,x.diffuseRoughnessMapTransform))),m.sheen>0&&(x.sheenColor.value.copy(m.sheenColor).multiplyScalar(m.sheen),x.sheenRoughness.value=m.sheenRoughness,m.sheenColorMap&&(x.sheenColorMap.value=m.sheenColorMap,e(m.sheenColorMap,x.sheenColorMapTransform)),m.sheenRoughnessMap&&(x.sheenRoughnessMap.value=m.sheenRoughnessMap,e(m.sheenRoughnessMap,x.sheenRoughnessMapTransform))),m.clearcoat>0&&(x.clearcoat.value=m.clearcoat,x.clearcoatRoughness.value=m.clearcoatRoughness,m.clearcoatMap&&(x.clearcoatMap.value=m.clearcoatMap,e(m.clearcoatMap,x.clearcoatMapTransform)),m.clearcoatRoughnessMap&&(x.clearcoatRoughnessMap.value=m.clearcoatRoughnessMap,e(m.clearcoatRoughnessMap,x.clearcoatRoughnessMapTransform)),m.clearcoatNormalMap&&(x.clearcoatNormalMap.value=m.clearcoatNormalMap,e(m.clearcoatNormalMap,x.clearcoatNormalMapTransform),x.clearcoatNormalScale.value.copy(m.clearcoatNormalScale),m.side===Ze&&x.clearcoatNormalScale.value.negate())),m.dispersion>0&&(x.dispersion.value=m.dispersion),m.retroreflectivity>0&&(x.retroreflectivity.value=m.retroreflectivity),m.iridescence>0&&(x.iridescence.value=m.iridescence,x.iridescenceIOR.value=m.iridescenceIOR,x.iridescenceThicknessMinimum.value=m.iridescenceThicknessMinimum,x.iridescenceThicknessMaximum.value=m.iridescenceThicknessMaximum,m.iridescenceMap&&(x.iridescenceMap.value=m.iridescenceMap,e(m.iridescenceMap,x.iridescenceMapTransform)),m.iridescenceThicknessMap&&(x.iridescenceThicknessMap.value=m.iridescenceThicknessMap,e(m.iridescenceThicknessMap,x.iridescenceThicknessMapTransform))),m.transmission>0&&(x.transmission.value=m.transmission,x.transmissionSamplerMap.value=M.texture,x.transmissionSamplerSize.value.set(M.width,M.height),m.transmissionMap&&(x.transmissionMap.value=m.transmissionMap,e(m.transmissionMap,x.transmissionMapTransform)),x.thickness.value=m.thickness,m.thicknessMap&&(x.thicknessMap.value=m.thicknessMap,e(m.thicknessMap,x.thicknessMapTransform)),x.attenuationDistance.value=m.attenuationDistance,x.attenuationColor.value.copy(m.attenuationColor)),m.anisotropy>0&&(x.anisotropyVector.value.set(m.anisotropy*Math.cos(m.anisotropyRotation),m.anisotropy*Math.sin(m.anisotropyRotation)),m.anisotropyMap&&(x.anisotropyMap.value=m.anisotropyMap,e(m.anisotropyMap,x.anisotropyMapTransform))),x.specularIntensity.value=m.specularIntensity,x.specularColor.value.copy(m.specularColor),m.specularColorMap&&(x.specularColorMap.value=m.specularColorMap,e(m.specularColorMap,x.specularColorMapTransform)),m.specularIntensityMap&&(x.specularIntensityMap.value=m.specularIntensityMap,e(m.specularIntensityMap,x.specularIntensityMapTransform))}function p(x,m){m.matcap&&(x.matcap.value=m.matcap)}function T(x,m){let M=t.get(m).light;x.referencePosition.value.setFromMatrixPosition(M.matrixWorld),x.nearDistance.value=M.shadow.camera.near,x.farDistance.value=M.shadow.camera.far}return{refreshFogUniforms:i,refreshMaterialUniforms:s}}function cy(n,t,e,i){let s={},r={};function a(M,y){let w=y.program;i.uniformBlockBinding(M,w,s[M.id])}function o(M,y){let w=s[M.id];w===void 0&&(p(M),w=l(M),s[M.id]=w,M.addEventListener("dispose",x));let I=y.program;i.updateUBOMapping(M,I);let L=t.render.frame;r[M.id]!==L&&(c(M),r[M.id]=L)}function l(M){let y=n.createBuffer(),w=M.__size,I=M.usage;return n.bindBuffer(n.UNIFORM_BUFFER,y),n.bufferData(n.UNIFORM_BUFFER,w,I),n.bindBuffer(n.UNIFORM_BUFFER,null),y}function c(M){let y=s[M.id],w=M.uniforms,I=M.__cache;n.bindBuffer(n.UNIFORM_BUFFER,y);for(let L=0,g=w.length;L<g;L++){let _=w[L];if(Array.isArray(_))for(let U=0,C=_.length;U<C;U++)u(_[U],L,U,I);else u(_,L,0,I)}n.bindBuffer(n.UNIFORM_BUFFER,null)}function u(M,y,w,I){if(h(M,y,w,I)===!0){let L=M.__offset,g=M.value;if(Array.isArray(g)){let _=0;for(let U=0;U<g.length;U++){let C=g[U],F=T(C,!0);f(C,M.__data,_),_+=F.storage/Float32Array.BYTES_PER_ELEMENT}}else f(g,M.__data,0);n.bufferSubData(n.UNIFORM_BUFFER,L,M.__data)}}function f(M,y,w){typeof M=="number"||typeof M=="boolean"?y[w]=M:M.isMatrix3?(y[w]=M.elements[0],y[w+1]=M.elements[1],y[w+2]=M.elements[2],y[w+3]=0,y[w+4]=M.elements[3],y[w+5]=M.elements[4],y[w+6]=M.elements[5],y[w+7]=0,y[w+8]=M.elements[6],y[w+9]=M.elements[7],y[w+10]=M.elements[8],y[w+11]=0):ArrayBuffer.isView(M)?y.set(M.subarray(0,y.length-w),w):M.toArray(y,w)}function h(M,y,w,I){let L=M.value,g=y+"_"+w;if(Array.isArray(L)){I[g]===void 0&&(I[g]=[]);let _=I[g],U=!1;for(let C=0;C<L.length;C++)d(L[C],_,C)===!0&&(U=!0);return U}return d(L,I,g)}function d(M,y,w){if(y[w]===void 0)return typeof M=="number"||typeof M=="boolean"?y[w]=M:ArrayBuffer.isView(M)?y[w]=M.slice():y[w]=M.clone(),!0;{let I=y[w];if(typeof M=="number"||typeof M=="boolean"){if(I!==M)return y[w]=M,!0}else{if(ArrayBuffer.isView(M))return!0;if(I.equals(M)===!1)return I.copy(M),!0}}return!1}function p(M){let y=M.uniforms,w=0,I=16;for(let g=0,_=y.length;g<_;g++){let U=Array.isArray(y[g])?y[g]:[y[g]];for(let C=0,F=U.length;C<F;C++){let E=U[C],O=Array.isArray(E.value)?E.value:[E.value],D=Array.isArray(y[g])||Array.isArray(E.value),R=w;for(let b=0,P=O.length;b<P;b++){let A=O[b],N=T(A,D),v=w%I,G=v%N.boundary,q=v+G;w+=G,q!==0&&I-q<N.storage&&(w+=I-q),b===0&&(R=w),w+=N.storage}let B=E.type==="int"?Int32Array:E.type==="uint"?Uint32Array:Float32Array;E.__data=new B((w-R)/Float32Array.BYTES_PER_ELEMENT),E.__offset=R}}let L=w%I;return L>0&&(w+=I-L),M.__size=w,M.__cache={},this}function T(M,y){let w={boundary:0,storage:0};return typeof M=="number"||typeof M=="boolean"?(w.boundary=4,w.storage=4):M.isVector2?(w.boundary=8,w.storage=8):M.isVector3||M.isColor?(w.boundary=16,w.storage=12):M.isVector4?(w.boundary=16,w.storage=16):M.isMatrix3?(w.boundary=16,w.storage=48):M.isMatrix4?(w.boundary=16,w.storage=64):M.isTexture?Gt("WebGLRenderer: Texture samplers can not be part of an uniforms group."):ArrayBuffer.isView(M)?(w.boundary=16,w.storage=M.byteLength):Gt("WebGLRenderer: Unsupported uniform value type.",M),y===!0&&(w.boundary=16,w.storage=Math.ceil(w.storage/16)*16),w}function x(M){let y=M.target;y.removeEventListener("dispose",x),n.deleteBuffer(s[y.id]),delete s[y.id],delete r[y.id]}function m(){for(let M in s)n.deleteBuffer(s[M]);s={},r={}}return{bind:a,update:o,dispose:m}}var hy=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]),Wn=null;function uy(){return Wn===null&&(Wn=new wa(hy,16,16,Ai,Ln),Wn.name="DFG_LUT",Wn.minFilter=Xe,Wn.magFilter=Xe,Wn.wrapS=Bn,Wn.wrapT=Bn,Wn.generateMipmaps=!1,Wn.needsUpdate=!0),Wn}var Po=class{constructor(t={}){let{canvas:e=ju(),context:i=null,depth:s=!0,stencil:r=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:u="default",failIfMajorPerformanceCaveat:f=!1,reversedDepthBuffer:h=!1,outputBufferType:d=tn}=t;this.isWebGLRenderer=!0;let p;if(i!==null){if(typeof WebGLRenderingContext<"u"&&i instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");p=i.getContextAttributes().alpha}else p=a;let T=d,x=new Set([Ka,Za,$a]),m=new Set([tn,In,Ns,$i,Xa,Ya]),M=new Uint32Array(4),y=new Int32Array(4),w={textures:[],min:[],max:[],resolution:[]},I=null,L=null,g=[],_=[],U=null;this.domElement=e,this.debug={checkShaderErrors:!0,diagnostics:{keywords:!1},onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=Mn,this.toneMappingExposure=1,this.transmissionResolutionScale=1;let C=this,F=!1,E=null,O=null,D=null,R=null;this._outputColorSpace=We;let B=0,b=0,P=null,A=-1,N=null,v=new me,G=new me,q=null,S=new Zt(0),V=0,W=e.width,Z=e.height,Y=1,j=null,ct=null,ut=new me(0,0,W,Z),ht=new me(0,0,W,Z),Rt=!1,Ut=new vi,Ft=new Ta,Jt=!1,ce=!1,ge=new de,On=new nt,Ae=new me,hn={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0},un=!1;function dn(){return P===null?Y:1}let K=i;function fn(z,$){return e.getContext(z,$)}let fe,pe,St,we,Bt,Wt,H,k,Q,dt,lt,mt,vt,rt,at,xt,X,ot,it,yt,pt,gt,Ot;try{let z={alpha:!0,depth:s,stencil:r,antialias:o,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:u,failIfMajorPerformanceCaveat:f};if("setAttribute"in e&&e.setAttribute("data-engine",`three.js r${"187"}`),e.addEventListener("webglcontextlost",kt,!1),e.addEventListener("webglcontextrestored",Yt,!1),e.addEventListener("webglcontextcreationerror",bt,!1),K===null){let $="webgl2";if(K=fn($,z),K===null)throw fn($)?new Error("THREE.WebGLRenderer: Error creating WebGL context with your selected attributes."):new Error("THREE.WebGLRenderer: Error creating WebGL context.")}$t()}catch(z){throw e.removeEventListener("webglcontextlost",kt,!1),e.removeEventListener("webglcontextrestored",Yt,!1),e.removeEventListener("webglcontextcreationerror",bt,!1),Vt("WebGLRenderer: "+z.message),z}function $t(){fe=new Sg(K),fe.init(),pt=new sy(K,fe),pe=new ug(K,fe,t,pt),St=new ny(K,fe),pe.reversedDepthBuffer&&h&&St.buffers.depth.setReversed(!0),O=K.createFramebuffer(),D=K.createFramebuffer(),R=K.createFramebuffer(),we=new Tg(K),Bt=new Vx,Wt=new iy(K,fe,St,Bt,pe,pt,we),H=new Mg(C),k=new Ap(K),gt=new cg(K,k),Q=new bg(K,k,we,gt),dt=new Ag(K,Q,k,gt,we),ot=new Eg(K,pe,Wt),at=new dg(Bt),lt=new Gx(C,H,fe,pe,gt,at),mt=new ly(C,Bt),vt=new Wx,rt=new Kx(fe),X=new lg(C,H,St,dt,p,l),xt=new ey(C,dt,pe),Ot=new cy(K,we,pe,St),it=new hg(K,fe,we),yt=new wg(K,fe,we),we.programs=lt.programs,C.capabilities=pe,C.extensions=fe,C.properties=Bt,C.renderLists=vt,C.shadowMap=xt,C.state=St,C.info=we}T!==tn&&(U=new Rg(T,e.width,e.height,o,s,r));let ft=new jc(C,K);this.xr=ft,this.getContext=function(){return K},this.getContextAttributes=function(){return K.getContextAttributes()},this.forceContextLoss=function(){let z=fe.get("WEBGL_lose_context");z&&z.loseContext()},this.forceContextRestore=function(){let z=fe.get("WEBGL_lose_context");z&&z.restoreContext()},this.getPixelRatio=function(){return Y},this.setPixelRatio=function(z){z!==void 0&&(Y=z,this.setSize(W,Z,!1))},this.getSize=function(z){return z.set(W,Z)},this.setSize=function(z,$,et=!0){if(ft.isPresenting){Gt("WebGLRenderer: Can't change size while VR device is presenting.");return}W=z,Z=$,e.width=Math.floor(z*Y),e.height=Math.floor($*Y),et===!0&&(e.style.width=z+"px",e.style.height=$+"px"),U!==null&&U.setSize(e.width,e.height),this.setViewport(0,0,z,$)},this.getDrawingBufferSize=function(z){return z.set(W*Y,Z*Y).floor()},this.setDrawingBufferSize=function(z,$,et){W=z,Z=$,Y=et,e.width=Math.floor(z*et),e.height=Math.floor($*et),this.setViewport(0,0,z,$)},this.setEffects=function(z){if(T===tn){Vt("WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(z){for(let $=0;$<z.length;$++)if(z[$].isOutputPass===!0){Gt("WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}U.setEffects(z||[])},this.getCurrentViewport=function(z){return z.copy(v)},this.getViewport=function(z){return z.copy(ut)},this.setViewport=function(z,$,et,J){z.isVector4?ut.set(z.x,z.y,z.z,z.w):ut.set(z,$,et,J),St.viewport(v.copy(ut).multiplyScalar(dn()).round())},this.getScissor=function(z){return z.copy(ht)},this.setScissor=function(z,$,et,J){z.isVector4?ht.set(z.x,z.y,z.z,z.w):ht.set(z,$,et,J),St.scissor(G.copy(ht).multiplyScalar(dn()).round())},this.getScissorTest=function(){return Rt},this.setScissorTest=function(z){St.setScissorTest(Rt=z)},this.setOpaqueSort=function(z){j=z},this.setTransparentSort=function(z){ct=z},this.getClearColor=function(z){return z.copy(X.getClearColor())},this.setClearColor=function(){X.setClearColor(...arguments)},this.getClearAlpha=function(){return X.getClearAlpha()},this.setClearAlpha=function(){X.setClearAlpha(...arguments)},this.clear=function(z=!0,$=!0,et=!0){let J=0;if(z){let tt=!1;if(P!==null){let Mt=P.texture.format;tt=x.has(Mt)}if(tt){let Mt=P.texture.type,It=m.has(Mt),_t=X.getClearColor(),Tt=X.getClearAlpha(),Dt=_t.r,Xt=_t.g,jt=_t.b;It?(M[0]=Dt,M[1]=Xt,M[2]=jt,M[3]=Tt,K.clearBufferuiv(K.COLOR,0,M)):(y[0]=Dt,y[1]=Xt,y[2]=jt,y[3]=Tt,K.clearBufferiv(K.COLOR,0,y))}else J|=K.COLOR_BUFFER_BIT}$&&(J|=K.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),et&&(J|=K.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),J!==0&&K.clear(J)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(z){z.setRenderer(this),E=z},this.dispose=function(){e.removeEventListener("webglcontextlost",kt,!1),e.removeEventListener("webglcontextrestored",Yt,!1),e.removeEventListener("webglcontextcreationerror",bt,!1),X.dispose(),vt.dispose(),rt.dispose(),Wt.dispose(),Bt.dispose(),H.dispose(),dt.dispose(),Q.dispose(),gt.dispose(),Ot.dispose(),lt.dispose(),ft.dispose(),ft.removeEventListener("sessionstart",oh),ft.removeEventListener("sessionend",lh),Ii.stop()};function kt(z){z.preventDefault(),Nc("WebGLRenderer: Context Lost."),F=!0}function Yt(){Nc("WebGLRenderer: Context Restored."),F=!1;let z=we.autoReset,$=xt.enabled,et=xt.autoUpdate,J=xt.needsUpdate,tt=xt.type;$t(),we.autoReset=z,xt.enabled=$,xt.autoUpdate=et,xt.needsUpdate=J,xt.type=tt}function bt(z){Vt("WebGLRenderer: A WebGL context could not be created. Reason: ",z.statusMessage)}function ae(z){let $=z.target;$.removeEventListener("dispose",ae),Ce($)}function Ce(z){li(z),Bt.remove(z)}function li(z){let $=Bt.get(z).programs;$!==void 0&&($.forEach(function(et){lt.releaseProgram(et)}),z.isShaderMaterial&&lt.releaseShaderCache(z))}this.renderBufferDirect=function(z,$,et,J,tt,Mt){$===null&&($=hn);let It=tt.isMesh&&tt.matrixWorld.determinantAffine()<0,_t=yf(z,$,et,J,tt);St.setMaterial(J,It);let Tt=et.index,Dt=1;if(J.wireframe===!0){if(Tt=Q.getWireframeAttribute(et),Tt===void 0)return;Dt=2}let Xt=et.drawRange,jt=et.attributes.position,Pt=Xt.start*Dt,te=(Xt.start+Xt.count)*Dt;Mt!==null&&(Pt=Math.max(Pt,Mt.start*Dt),te=Math.min(te,(Mt.start+Mt.count)*Dt)),Tt!==null?(Pt=Math.max(Pt,0),te=Math.min(te,Tt.count)):jt!=null&&(Pt=Math.max(Pt,0),te=Math.min(te,jt.count));let Se=te-Pt;if(Se<0||Se===1/0)return;gt.setup(tt,J,_t,et,Tt);let he,oe=it;if(Tt!==null&&(he=k.get(Tt),oe=yt,oe.setIndex(he)),tt.isMesh)J.wireframe===!0?(St.setLineWidth(J.wireframeLinewidth*dn()),oe.setMode(K.LINES)):oe.setMode(K.TRIANGLES);else if(tt.isLine){let Ue=J.linewidth;Ue===void 0&&(Ue=1),St.setLineWidth(Ue*dn()),tt.isLineSegments?oe.setMode(K.LINES):tt.isLineLoop?oe.setMode(K.LINE_LOOP):oe.setMode(K.LINE_STRIP)}else tt.isPoints?oe.setMode(K.POINTS):tt.isSprite&&oe.setMode(K.TRIANGLES);if(tt.isBatchedMesh)if(fe.get("WEBGL_multi_draw"))oe.renderMultiDraw(tt._multiDrawStarts,tt._multiDrawCounts,tt._multiDrawCount);else{let Ue=tt._multiDrawStarts,Lt=tt._multiDrawCounts,Ve=tt._multiDrawCount,se=Tt?k.get(Tt).bytesPerElement:1,Pi=Bt.get(J).currentProgram.getUniforms();for(let Oe=0;Oe<Ve;Oe++)Pi.setValue(K,"_gl_DrawID",Oe),oe.render(Ue[Oe]/se,Lt[Oe])}else if(tt.isInstancedMesh)oe.renderInstances(Pt,Se,tt.count);else if(et.isInstancedBufferGeometry){let Ue=et._maxInstanceCount!==void 0?et._maxInstanceCount:1/0,Lt=Math.min(et.instanceCount,Ue);oe.renderInstances(Pt,Se,Lt)}else oe.render(Pt,Se)};function ah(z,$,et,J){E!==null&&z.isNodeMaterial&&E.setObject(J,z),Jt===!0&&at.setState(z,et,!1),z.transparent===!0&&z.side===vn&&z.forceSinglePass===!1?(z.side=Ze,z.needsUpdate=!0,zs(z,$,J),z.side=Ei,z.needsUpdate=!0,zs(z,$,J),z.side=vn):zs(z,$,J)}this.compile=function(z,$,et=null){et===null&&(et=z),E!==null&&E.renderStart(z,$,et),L=rt.get(et),L.init($),_.push(L),et.traverseVisible(function(tt){tt.isLight&&tt.layers.test($.layers)&&(L.pushLight(tt),tt.castShadow&&L.pushShadow(tt))}),z!==et&&z.traverseVisible(function(tt){tt.isLight&&tt.layers.test($.layers)&&(L.pushLight(tt),tt.castShadow&&L.pushShadow(tt))}),L.setupLights(),E!==null&&E.updateLights(L.state.lightsArray),ce=this.localClippingEnabled,Jt=at.init(this.clippingPlanes,ce),Jt===!0&&at.setGlobalState(this.clippingPlanes,$),E!==null&&xt.render(L.state.shadowsArray,et,$);let J=new Set;return z.traverse(function(tt){if(!(tt.isMesh||tt.isPoints||tt.isLine||tt.isSprite))return;let Mt=tt.material;if(Mt)if(Array.isArray(Mt))for(let It=0;It<Mt.length;It++){let _t=Mt[It];ah(_t,et,$,tt),J.add(_t)}else ah(Mt,et,$,tt),J.add(Mt)}),L=_.pop(),E!==null&&E.renderEnd(),J},this.compileAsync=function(z,$,et=null){let J=this.compile(z,$,et);return new Promise(tt=>{function Mt(){if(J.forEach(function(It){let Tt=Bt.get(It).currentProgram;(Tt===void 0||Tt.isReady())&&J.delete(It)}),J.size===0){tt(z);return}setTimeout(Mt,10)}fe.get("KHR_parallel_shader_compile")!==null?Mt():setTimeout(Mt,10)})};let Yo=null;function gf(z){Yo&&Yo(z)}function oh(){Ii.stop()}function lh(){Ii.start()}let Ii=new Rd;Ii.setAnimationLoop(gf),typeof self<"u"&&Ii.setContext(self),this.setAnimationLoop=function(z){Yo=z,ft.setAnimationLoop(z),z===null?Ii.stop():Ii.start()},ft.addEventListener("sessionstart",oh),ft.addEventListener("sessionend",lh),this.render=function(z,$){if($!==void 0&&$.isCamera!==!0){Vt("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(F===!0)return;E!==null&&E.renderStart(z,$);let et=ft.enabled===!0&&ft.isPresenting===!0,J=U!==null&&(P===null||et)&&U.begin(C,P);if(z.matrixWorldAutoUpdate===!0&&z.updateMatrixWorld(),$.parent===null&&$.matrixWorldAutoUpdate===!0&&$.updateMatrixWorld(),ft.enabled===!0&&ft.isPresenting===!0&&(U===null||U.isCompositing()===!1)&&(ft.cameraAutoUpdate===!0&&ft.updateCamera($),$=ft.getCamera()),z.isScene===!0&&z.onBeforeRender(C,z,$,P),L=rt.get(z,_.length),L.init($),L.state.textureUnits=Wt.getTextureUnits(),_.push(L),ge.multiplyMatrices($.projectionMatrix,$.matrixWorldInverse),$.isArrayCamera?Ft.setFromArrayCamera($):Ut.setFromProjectionMatrix(ge,yn,$.reversedDepth),ce=this.localClippingEnabled,Jt=at.init(this.clippingPlanes,ce),I=vt.get(z,g.length),I.init(),g.push(I),this.info.render.frame++,ft.enabled===!0&&ft.isPresenting===!0){let It=C.xr.getDepthSensingMesh();It!==null&&$o(It,$,-1/0,C.sortObjects)}$o(z,$,0,C.sortObjects),I.finish(),E!==null&&E.updateLights(L.state.lightsArray),C.sortObjects===!0&&I.sort(j,ct),un=ft.enabled===!1||ft.isPresenting===!1||ft.hasDepthSensing()===!1,un&&X.addToRenderList(I,z),this.info.autoReset===!0&&this.info.reset(),Jt===!0&&at.beginShadows();let tt=L.state.shadowsArray;if(xt.render(tt,z,$),Jt===!0&&at.endShadows(),(J&&U.hasRenderPass())===!1){let It=I.opaque,_t=I.transmissive;if(L.setupLights(),$.isArrayCamera){let Tt=$.cameras;if(_t.length>0)for(let Dt=0,Xt=Tt.length;Dt<Xt;Dt++){let jt=Tt[Dt];hh(It,_t,z,jt)}un&&X.render(z);for(let Dt=0,Xt=Tt.length;Dt<Xt;Dt++){let jt=Tt[Dt];ch(I,z,jt,jt.viewport)}}else _t.length>0&&hh(It,_t,z,$),un&&X.render(z),ch(I,z,$)}P!==null&&b===0&&(Wt.updateMultisampleRenderTarget(P),Wt.updateRenderTargetMipmap(P)),J&&U.end(C),z.isScene===!0&&z.onAfterRender(C,z,$),gt.resetDefaultState(),A=-1,N=null,_.pop(),_.length>0?(L=_[_.length-1],Wt.setTextureUnits(L.state.textureUnits),Jt===!0&&at.setGlobalState(C.clippingPlanes,L.state.camera)):L=null,g.pop(),g.length>0?I=g[g.length-1]:I=null,E!==null&&E.renderEnd()};function $o(z,$,et,J){if(z.visible===!1)return;if(z.layers.test($.layers)){if(z.isGroup)et=z.renderOrder;else if(z.isLOD)z.autoUpdate===!0&&z.update($);else if(z.isLight)L.pushLight(z),z.castShadow&&L.pushShadow(z);else if(z.isSprite){let It=$.isArrayCamera?Ft:Ut;if(!z.frustumCulled||z.intersectsFrustum(It)){J&&Ae.setFromMatrixPosition(z.matrixWorld).applyMatrix4(ge);let _t=dt.update(z),Tt=z.material;Tt.visible&&I.push(z,_t,Tt,et,Ae.z,null,$)}}else if(z.isMesh||z.isLine||z.isPoints){let It=$.isArrayCamera?Ft:Ut;if(!z.frustumCulled||z.intersectsFrustum(It)){let _t=dt.update(z),Tt=z.material;if(J&&(z.boundingSphere!==void 0?(z.boundingSphere===null&&z.computeBoundingSphere(),Ae.copy(z.boundingSphere.center)):(_t.boundingSphere===null&&_t.computeBoundingSphere(),Ae.copy(_t.boundingSphere.center)),Ae.applyMatrix4(z.matrixWorld).applyMatrix4(ge)),Array.isArray(Tt)){let Dt=_t.groups;for(let Xt=0,jt=Dt.length;Xt<jt;Xt++){let Pt=Dt[Xt],te=Tt[Pt.materialIndex];te&&te.visible&&I.push(z,_t,te,et,Ae.z,Pt,$)}}else Tt.visible&&I.push(z,_t,Tt,et,Ae.z,null,$)}}}let Mt=z.children;for(let It=0,_t=Mt.length;It<_t;It++)$o(Mt[It],$,et,J)}function ch(z,$,et,J){let{opaque:tt,transmissive:Mt,transparent:It}=z;L.setupLightsView(et),Jt===!0&&at.setGlobalState(C.clippingPlanes,et),J&&St.viewport(v.copy(J)),tt.length>0&&Dr(tt,$,et),Mt.length>0&&Dr(Mt,$,et),It.length>0&&Dr(It,$,et),St.buffers.depth.setTest(!0),St.buffers.depth.setMask(!0),St.buffers.color.setMask(!0),St.setPolygonOffset(!1)}function hh(z,$,et,J){if((et.isScene===!0?et.overrideMaterial:null)!==null)return;if(L.state.transmissionRenderTarget[J.id]===void 0){let Pt=fe.has("EXT_color_buffer_half_float")||fe.has("EXT_color_buffer_float");L.state.transmissionRenderTarget[J.id]=new ln(1,1,{generateMipmaps:!0,type:Pt?Ln:tn,minFilter:si,samples:Math.max(4,pe.samples),stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,colorSpace:ee.workingColorSpace})}let Mt=L.state.transmissionRenderTarget[J.id],It=J.viewport||v;Mt.setSize(It.z*C.transmissionResolutionScale,It.w*C.transmissionResolutionScale);let _t=C.getRenderTarget(),Tt=C.getActiveCubeFace(),Dt=C.getActiveMipmapLevel();C.setRenderTarget(Mt),C.getClearColor(S),V=C.getClearAlpha(),V<1&&C.setClearColor(16777215,.5),C.clear(),un&&X.render(et);let Xt=C.toneMapping;C.toneMapping=Mn;let jt=J.viewport;if(J.viewport!==void 0&&(J.viewport=void 0),L.setupLightsView(J),Jt===!0&&at.setGlobalState(C.clippingPlanes,J),Dr(z,et,J),Wt.updateMultisampleRenderTarget(Mt),Wt.updateRenderTargetMipmap(Mt),fe.has("WEBGL_multisampled_render_to_texture")===!1){let Pt=!1;for(let te=0,Se=$.length;te<Se;te++){let he=$[te],{object:oe,geometry:Ue,material:Lt,group:Ve}=he;if(Lt.side===vn&&oe.layers.test(J.layers)){let se=Lt.side;Lt.side=Ze,Lt.needsUpdate=!0,uh(oe,et,J,Ue,Lt,Ve),Lt.side=se,Lt.needsUpdate=!0,Pt=!0}}Pt===!0&&(Wt.updateMultisampleRenderTarget(Mt),Wt.updateRenderTargetMipmap(Mt))}C.setRenderTarget(_t,Tt,Dt),C.setClearColor(S,V),jt!==void 0&&(J.viewport=jt),C.toneMapping=Xt}function Dr(z,$,et){let J=$.isScene===!0?$.overrideMaterial:null;for(let tt=0,Mt=z.length;tt<Mt;tt++){let It=z[tt],{object:_t,geometry:Tt,group:Dt}=It,Xt=It.material;Xt.allowOverride===!0&&J!==null&&(Xt=J),_t.layers.test(et.layers)&&uh(_t,$,et,Tt,Xt,Dt)}}function uh(z,$,et,J,tt,Mt){E!==null&&tt.isNodeMaterial&&E.setObject(z,tt),z.onBeforeRender(C,$,et,J,tt,Mt),z.modelViewMatrix.multiplyMatrices(et.matrixWorldInverse,z.matrixWorld),z.normalMatrix.getNormalMatrix(z.modelViewMatrix),tt.onBeforeRender(C,$,et,J,z,Mt),tt.transparent===!0&&tt.side===vn&&tt.forceSinglePass===!1?(tt.side=Ze,tt.needsUpdate=!0,C.renderBufferDirect(et,$,J,tt,z,Mt),tt.side=Ei,tt.needsUpdate=!0,C.renderBufferDirect(et,$,J,tt,z,Mt),tt.side=vn):C.renderBufferDirect(et,$,J,tt,z,Mt),z.onAfterRender(C,$,et,J,tt,Mt)}function dh(z){let $=0;for(let et of z)et.texture!==null&&$++;return $}function zs(z,$,et){$.isScene!==!0&&($=hn);let J=Bt.get(z),tt=L.state.lights,Mt=L.state.shadowsArray,It=tt.state.version,_t=lt.getParameters(z,tt.state,Mt,$,et,L.state.lightProbeGridArray),Tt=lt.getProgramCacheKey(_t),Dt=J.programs;J.environment=z.isMeshStandardMaterial||z.isMeshLambertMaterial||z.isMeshPhongMaterial?$.environment:null,J.fog=$.fog;let Xt=z.isMeshStandardMaterial||z.isMeshLambertMaterial&&!z.envMap||z.isMeshPhongMaterial&&!z.envMap;J.envMap=H.get(z.envMap||J.environment,Xt),J.envMapRotation=J.environment!==null&&z.envMap===null?$.environmentRotation:z.envMapRotation,Dt===void 0&&(z.addEventListener("dispose",ae),Dt=new Map,J.programs=Dt,J.programVariants=new Map);let jt=Dt.get(Tt);if(jt!==void 0){if(J.currentProgram===jt&&J.lightsStateVersion===It)return ph(z,_t),jt}else _t.uniforms=lt.getUniforms(z),E!==null&&z.isNodeMaterial&&E.build(z,et,_t),z.onBeforeCompile(_t,C),jt=lt.acquireProgram(_t,Tt),Dt.set(Tt,jt),J.uniforms=_t.uniforms;let Pt=J.uniforms;return(!z.isShaderMaterial&&!z.isRawShaderMaterial||z.clipping===!0)&&(Pt.clippingPlanes=at.uniform),ph(z,_t),J.needsLights=vf(z),J.lightsStateVersion=It,J.needsLights&&(Pt.ambientLightColor.value=tt.state.ambient,Pt.lightProbe.value=tt.state.probe,Pt.sunLights.value=tt.state.sun,Pt.sunLightShadows.value=tt.state.sunShadow,Pt.directionalLights.value=tt.state.directional,Pt.directionalLightShadows.value=tt.state.directionalShadow,Pt.spotLights.value=tt.state.spot,Pt.spotLightShadows.value=tt.state.spotShadow,Pt.rectAreaLights.value=tt.state.rectArea,Pt.ltc_1.value=tt.state.rectAreaLTC1,Pt.ltc_2.value=tt.state.rectAreaLTC2,Pt.pointLights.value=tt.state.point,Pt.pointLightShadows.value=tt.state.pointShadow,Pt.hemisphereLights.value=tt.state.hemi,Pt.sunShadowMatrix.value=tt.state.sunShadowMatrix,Pt.sunShadowCascade.value=tt.state.sunShadowCascade,Pt.directionalShadowMatrix.value=tt.state.directionalShadowMatrix,Pt.spotLightMatrix.value=tt.state.spotLightMatrix,Pt.spotLightMap.value=tt.state.spotLightMap,Pt.pointShadowMatrix.value=tt.state.pointShadowMatrix),J.numLightProbeGrids=dh(L.state.lightProbeGridArray),J.currentProgram=jt,J.uniformsList=null,jt}function xf(z,$,et,J,tt){let Mt=Bt.get(z),It=Mt.currentProgram.id+","+J+","+tt,_t=Mt.programVariants.get(It);return _t===void 0?(_t=zs(z,$,et),Mt.programVariants.set(It,_t)):(Mt.currentProgram=_t,Mt.uniformsList=null,Mt.outputColorSpace=J,Mt.toneMapping=tt),_t}function fh(z){if(z.uniformsList===null){let $=z.currentProgram.getUniforms();z.uniformsList=Ds.seqWithValue($.seq,z.uniforms)}return z.uniformsList}function ph(z,$){let et=Bt.get(z);et.outputColorSpace=$.outputColorSpace,et.batching=$.batching,et.batchingColor=$.batchingColor,et.instancing=$.instancing,et.instancingColor=$.instancingColor,et.instancingMorph=$.instancingMorph,et.skinning=$.skinning,et.morphTargets=$.morphTargets,et.morphNormals=$.morphNormals,et.morphColors=$.morphColors,et.morphTargetsCount=$.morphTargetsCount,et.numClippingPlanes=$.numClippingPlanes,et.numIntersection=$.numClipIntersection,et.vertexAlphas=$.vertexAlphas,et.vertexTangents=$.vertexTangents,et.toneMapping=$.toneMapping}function yf(z,$,et,J,tt){$.isScene!==!0&&($=hn),Wt.resetTextureUnits();let Mt=$.fog,It=J.isMeshStandardMaterial||J.isMeshLambertMaterial||J.isMeshPhongMaterial?$.environment:null,_t=P===null?C.outputColorSpace:P.isXRRenderTarget===!0?P.texture.colorSpace:ee.workingColorSpace,Tt=J.isMeshStandardMaterial||J.isMeshLambertMaterial&&!J.envMap||J.isMeshPhongMaterial&&!J.envMap,Dt=H.get(J.envMap||It,Tt),Xt=J.vertexColors===!0&&!!et.attributes.color&&et.attributes.color.itemSize===4,jt=!!et.attributes.tangent&&(!!J.normalMap||J.anisotropy>0),Pt=!!et.morphAttributes.position,te=!!et.morphAttributes.normal,Se=!!et.morphAttributes.color,he=Mn;J.toneMapped&&(P===null||P.isXRRenderTarget===!0)&&(he=C.toneMapping);let oe=et.morphAttributes.position||et.morphAttributes.normal||et.morphAttributes.color,Ue=oe!==void 0?oe.length:0,Lt=Bt.get(J),Ve=L.state.lights;if(Jt===!0&&(ce===!0||z!==N)){let xe=z===N&&J.id===A;at.setState(J,z,xe)}let se=!1,Pi=!1;J.version===Lt.__version?Lt.needsLights&&Lt.lightsStateVersion!==Ve.state.version||tt.isBatchedMesh&&Lt.batching===!1||!tt.isBatchedMesh&&Lt.batching===!0||tt.isBatchedMesh&&Lt.batchingColor===!0&&tt._colorsTexture===null||tt.isBatchedMesh&&Lt.batchingColor===!1&&tt._colorsTexture!==null||tt.isInstancedMesh&&Lt.instancing===!1||!tt.isInstancedMesh&&Lt.instancing===!0||tt.isSkinnedMesh&&Lt.skinning===!1||!tt.isSkinnedMesh&&Lt.skinning===!0||tt.isInstancedMesh&&Lt.instancingColor===!0&&tt.instanceColor===null||tt.isInstancedMesh&&Lt.instancingColor===!1&&tt.instanceColor!==null||tt.isInstancedMesh&&Lt.instancingMorph===!0&&tt.morphTexture===null||tt.isInstancedMesh&&Lt.instancingMorph===!1&&tt.morphTexture!==null||Lt.envMap!==Dt||J.fog===!0&&Lt.fog!==Mt||Lt.numClippingPlanes!==void 0&&(Lt.numClippingPlanes!==at.numPlanes||Lt.numIntersection!==at.numIntersection)||Lt.vertexAlphas!==Xt||Lt.vertexTangents!==jt||Lt.morphTargets!==Pt||Lt.morphNormals!==te||Lt.morphColors!==Se||Lt.morphTargetsCount!==Ue||Lt.numLightProbeGrids!==dh(L.state.lightProbeGridArray)?se=!0:(Lt.outputColorSpace!==_t||Lt.toneMapping!==he)&&(Pi=!0):(se=!0,Lt.__version=J.version);let Oe=Lt.currentProgram;(se===!0||Pi===!0)&&(Oe=Pi===!0?xf(J,$,tt,_t,he):zs(J,$,tt),E&&J.isNodeMaterial&&E.onUpdateProgram(J,Oe,Lt));let Ur=!1,ci=!1,Li=!1,ie=Oe.getUniforms(),Ne=Lt.uniforms;if(St.useProgram(Oe.program)&&(Ur=!0,ci=!0,Li=!0),J.id!==A&&(A=J.id,ci=!0),Ur||N!==z){St.buffers.depth.getReversed()&&z.reversedDepth!==!0&&(z._reversedDepth=!0,z.updateProjectionMatrix()),ie.setValue(K,"projectionMatrix",z.projectionMatrix),ie.setValue(K,"viewMatrix",z.matrixWorldInverse);let Re=ie.map.cameraPosition;Re!==void 0&&Re.setValue(K,On.setFromMatrixPosition(z.matrixWorld)),pe.logarithmicDepthBuffer&&ie.setValue(K,"logDepthBufFC",2/(Math.log(z.far+1)/Math.LN2)),(J.isMeshPhongMaterial||J.isMeshToonMaterial||J.isMeshLambertMaterial||J.isMeshBasicMaterial||J.isMeshStandardMaterial||J.isShaderMaterial)&&ie.setValue(K,"isOrthographic",z.isOrthographicCamera===!0),N!==z&&(N=z,ci=!0,Li=!0)}if(Lt.needsLights&&(Ve.state.sunShadowMap.length>0&&ie.setValue(K,"sunShadowMap",Ve.state.sunShadowMap,Wt),Ve.state.directionalShadowMap.length>0&&ie.setValue(K,"directionalShadowMap",Ve.state.directionalShadowMap,Wt),Ve.state.spotShadowMap.length>0&&ie.setValue(K,"spotShadowMap",Ve.state.spotShadowMap,Wt),Ve.state.pointShadowMap.length>0&&ie.setValue(K,"pointShadowMap",Ve.state.pointShadowMap,Wt)),tt.isSkinnedMesh){ie.setOptional(K,tt,"bindMatrix"),ie.setOptional(K,tt,"bindMatrixInverse");let xe=tt.skeleton;xe&&(xe.boneTexture===null&&xe.computeBoneTexture(),ie.setValue(K,"boneTexture",xe.boneTexture,Wt))}tt.isBatchedMesh&&(ie.setOptional(K,tt,"batchingTexture"),ie.setValue(K,"batchingTexture",tt._matricesTexture,Wt),ie.setOptional(K,tt,"batchingIdTexture"),ie.setValue(K,"batchingIdTexture",tt._indirectTexture,Wt),ie.setOptional(K,tt,"batchingColorTexture"),tt._colorsTexture!==null&&ie.setValue(K,"batchingColorTexture",tt._colorsTexture,Wt));let bn=et.morphAttributes;if((bn.position!==void 0||bn.normal!==void 0||bn.color!==void 0)&&ot.update(tt,et,Oe),(ci||Lt.receiveShadow!==tt.receiveShadow)&&(Lt.receiveShadow=tt.receiveShadow,ie.setValue(K,"receiveShadow",tt.receiveShadow)),(J.isMeshStandardMaterial||J.isMeshLambertMaterial||J.isMeshPhongMaterial)&&J.envMap===null&&$.environment!==null&&(Ne.envMapIntensity.value=$.environmentIntensity),Ne.dfgLUT!==void 0&&(Ne.dfgLUT.value=uy()),ci){if(ie.setValue(K,"toneMappingExposure",C.toneMappingExposure),Lt.needsLights&&_f(Ne,Li),Mt&&J.fog===!0&&mt.refreshFogUniforms(Ne,Mt),mt.refreshMaterialUniforms(Ne,J,Y,Z,L.state.transmissionRenderTarget[z.id]),Lt.needsLights&&Lt.numLightProbeGrids>0){let xe=w,Re=0;for(let Xn of L.state.lightProbeGridArray)Xn.texture!==null&&(xe.textures[Re]=Xn.texture,xe.min[Re]=Xn.boundingBox.min,xe.max[Re]=Xn.boundingBox.max,xe.resolution[Re]=Xn.resolution,Re++);for(let Xn in xe)xe[Xn].length=Re;Ne.probesSH.value=xe.textures,Ne.probesMin.value=xe.min,Ne.probesMax.value=xe.max,Ne.probesResolution.value=xe.resolution}Ds.upload(K,fh(Lt),Ne,Wt)}if(J.isShaderMaterial&&J.uniformsNeedUpdate===!0&&(Ds.upload(K,fh(Lt),Ne,Wt),J.uniformsNeedUpdate=!1),J.isSpriteMaterial&&ie.setValue(K,"center",tt.center),ie.setValue(K,"modelViewMatrix",tt.modelViewMatrix),ie.setValue(K,"normalMatrix",tt.normalMatrix),ie.setValue(K,"modelMatrix",tt.matrixWorld),J.uniformsGroups!==void 0){let xe=J.uniformsGroups;for(let Re=0,Xn=xe.length;Re<Xn;Re++){let gh=xe[Re];Ot.update(gh,Oe),Ot.bind(gh,Oe)}}return Oe}function _f(z,$){z.ambientLightColor.needsUpdate=$,z.lightProbe.needsUpdate=$,z.sunLights.needsUpdate=$,z.sunLightShadows.needsUpdate=$,z.directionalLights.needsUpdate=$,z.directionalLightShadows.needsUpdate=$,z.pointLights.needsUpdate=$,z.pointLightShadows.needsUpdate=$,z.spotLights.needsUpdate=$,z.spotLightShadows.needsUpdate=$,z.rectAreaLights.needsUpdate=$,z.hemisphereLights.needsUpdate=$}function vf(z){return z.isMeshLambertMaterial||z.isMeshToonMaterial||z.isMeshPhongMaterial||z.isMeshStandardMaterial||z.isShadowMaterial||z.isShaderMaterial&&z.lights===!0}this.getActiveCubeFace=function(){return B},this.getActiveMipmapLevel=function(){return b},this.getRenderTarget=function(){return P},this.setRenderTargetTextures=function(z,$,et){let J=Bt.get(z);J.__autoAllocateDepthBuffer=z.resolveDepthBuffer===!1,J.__autoAllocateDepthBuffer===!1&&(J.__useRenderToTexture=!1),Bt.get(z.texture).__webglTexture=$,Bt.get(z.depthTexture).__webglTexture=J.__autoAllocateDepthBuffer?void 0:et,J.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(z,$){let et=Bt.get(z);et.__webglFramebuffer=$,et.__useDefaultFramebuffer=$===void 0},this.setRenderTarget=function(z,$=0,et=0){P=z,B=$,b=et;let J=null,tt=!1,Mt=!1;if(z){let _t=Bt.get(z);if(_t.__useDefaultFramebuffer!==void 0){St.bindFramebuffer(K.FRAMEBUFFER,_t.__webglFramebuffer),v.copy(z.viewport),G.copy(z.scissor),q=z.scissorTest,St.viewport(v),St.scissor(G),St.setScissorTest(q),A=-1;return}else if(_t.__webglFramebuffer===void 0)Wt.setupRenderTarget(z);else if(_t.__hasExternalTextures)Wt.rebindTextures(z,Bt.get(z.texture).__webglTexture,Bt.get(z.depthTexture).__webglTexture);else if(z.depthBuffer){let Xt=z.depthTexture;if(_t.__boundDepthTexture!==Xt){if(Xt!==null&&Bt.has(Xt)&&(z.width!==Xt.image.width||z.height!==Xt.image.height))throw new Error("THREE.WebGLRenderer: Attached DepthTexture is initialized to the incorrect size.");Wt.setupDepthRenderbuffer(z)}}let Tt=z.texture;(Tt.isData3DTexture||Tt.isDataArrayTexture||Tt.isCompressedArrayTexture)&&(Mt=!0);let Dt=Bt.get(z).__webglFramebuffer;z.isWebGLCubeRenderTarget?(Array.isArray(Dt[$])?J=Dt[$][et]:J=Dt[$],tt=!0):z.samples>0&&Wt.useMultisampledRTT(z)===!1?J=Bt.get(z).__webglMultisampledFramebuffer:Array.isArray(Dt)?J=Dt[et]:J=Dt,v.copy(z.viewport),G.copy(z.scissor),q=z.scissorTest}else v.copy(ut).multiplyScalar(Y).floor(),G.copy(ht).multiplyScalar(Y).floor(),q=Rt;if(et!==0&&(J=O),St.bindFramebuffer(K.FRAMEBUFFER,J)&&St.drawBuffers(z,J),St.viewport(v),St.scissor(G),St.setScissorTest(q),tt){let _t=Bt.get(z.texture);K.framebufferTexture2D(K.FRAMEBUFFER,K.COLOR_ATTACHMENT0,K.TEXTURE_CUBE_MAP_POSITIVE_X+$,_t.__webglTexture,et)}else if(Mt){let _t=$;for(let Tt=0;Tt<z.textures.length;Tt++){let Dt=Bt.get(z.textures[Tt]);K.framebufferTextureLayer(K.FRAMEBUFFER,K.COLOR_ATTACHMENT0+Tt,Dt.__webglTexture,et,_t)}}else if(z!==null&&et!==0){let _t=Bt.get(z.texture);K.framebufferTexture2D(K.FRAMEBUFFER,K.COLOR_ATTACHMENT0,K.TEXTURE_2D,_t.__webglTexture,et)}A=-1};function mh(z){let $=Bt.get(z);return($.__readFormat!==z.format||$.__readType!==z.type)&&($.__readFormat=z.format,$.__readType=z.type,$.__formatReadable=pe.textureFormatReadable(z.format),$.__typeReadable=pe.textureTypeReadable(z.type)),$}this.readRenderTargetPixels=function(z,$,et,J,tt,Mt,It,_t=0){if(!(z&&z.isWebGLRenderTarget)){Vt("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Tt=Bt.get(z).__webglFramebuffer;if(z.isWebGLCubeRenderTarget&&It!==void 0&&(Tt=Tt[It],Array.isArray(Tt)&&(Tt=Tt[0])),Tt){St.bindFramebuffer(K.FRAMEBUFFER,Tt);try{let Dt=z.textures[_t],Xt=Dt.format,jt=Dt.type;z.textures.length>1&&K.readBuffer(K.COLOR_ATTACHMENT0+_t);let Pt=mh(Dt);if(Pt.__formatReadable===!1){Vt("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(Pt.__typeReadable===!1){Vt("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}$>=0&&$<=z.width-J&&et>=0&&et<=z.height-tt&&K.readPixels($,et,J,tt,pt.convert(Xt),pt.convert(jt),Mt)}finally{let Dt=P!==null?Bt.get(P).__webglFramebuffer:null;St.bindFramebuffer(K.FRAMEBUFFER,Dt)}}},this.readRenderTargetPixelsAsync=async function(z,$,et,J,tt,Mt,It,_t=0){if(!(z&&z.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Tt=Bt.get(z).__webglFramebuffer;if(z.isWebGLCubeRenderTarget&&It!==void 0&&(Tt=Tt[It],Array.isArray(Tt)&&(Tt=Tt[0])),Tt)if($>=0&&$<=z.width-J&&et>=0&&et<=z.height-tt){St.bindFramebuffer(K.FRAMEBUFFER,Tt);let Dt=z.textures[_t],Xt=Dt.format,jt=Dt.type;z.textures.length>1&&K.readBuffer(K.COLOR_ATTACHMENT0+_t);let Pt=mh(Dt);if(Pt.__formatReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(Pt.__typeReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");let te=K.createBuffer();K.bindBuffer(K.PIXEL_PACK_BUFFER,te),K.bufferData(K.PIXEL_PACK_BUFFER,Mt.byteLength,K.STREAM_READ),K.readPixels($,et,J,tt,pt.convert(Xt),pt.convert(jt),0),K.bindBuffer(K.PIXEL_PACK_BUFFER,null);let Se=P!==null?Bt.get(P).__webglFramebuffer:null;St.bindFramebuffer(K.FRAMEBUFFER,Se);let he=K.fenceSync(K.SYNC_GPU_COMMANDS_COMPLETE,0);return K.flush(),await ed(K,he,4),K.bindBuffer(K.PIXEL_PACK_BUFFER,te),K.getBufferSubData(K.PIXEL_PACK_BUFFER,0,Mt),K.bindBuffer(K.PIXEL_PACK_BUFFER,null),K.deleteBuffer(te),K.deleteSync(he),Mt}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(z,$=null,et=0){let J=Math.pow(2,-et),tt=Math.floor(z.image.width*J),Mt=Math.floor(z.image.height*J),It=$!==null?$.x:0,_t=$!==null?$.y:0;Wt.setTexture2D(z,0),K.copyTexSubImage2D(K.TEXTURE_2D,et,0,0,It,_t,tt,Mt),St.unbindTexture()},this.copyTextureToTexture=function(z,$,et=null,J=null,tt=0,Mt=0){let It,_t,Tt,Dt,Xt,jt,Pt,te,Se,he=z.isCompressedTexture?z.mipmaps[Mt]:z.image;if(et!==null)It=et.max.x-et.min.x,_t=et.max.y-et.min.y,Tt=et.isBox3?et.max.z-et.min.z:1,Dt=et.min.x,Xt=et.min.y,jt=et.isBox3?et.min.z:0;else{let ie=Math.pow(2,-tt);It=Math.floor(he.width*ie),_t=Math.floor(he.height*ie),z.isDataArrayTexture?Tt=he.depth:z.isData3DTexture?Tt=Math.floor(he.depth*ie):Tt=1,Dt=0,Xt=0,jt=0}J!==null?(Pt=J.x,te=J.y,Se=J.z):(Pt=0,te=0,Se=0);let oe=pt.convert($.format),Ue=pt.convert($.type),Lt;$.isData3DTexture?(Wt.setTexture3D($,0),Lt=K.TEXTURE_3D):$.isDataArrayTexture||$.isCompressedArrayTexture?(Wt.setTexture2DArray($,0),Lt=K.TEXTURE_2D_ARRAY):(Wt.setTexture2D($,0),Lt=K.TEXTURE_2D),St.activeTexture(K.TEXTURE0),St.pixelStorei(K.UNPACK_FLIP_Y_WEBGL,$.flipY),St.pixelStorei(K.UNPACK_PREMULTIPLY_ALPHA_WEBGL,$.premultiplyAlpha),St.pixelStorei(K.UNPACK_ALIGNMENT,$.unpackAlignment);let Ve=St.getParameter(K.UNPACK_ROW_LENGTH),se=St.getParameter(K.UNPACK_IMAGE_HEIGHT),Pi=St.getParameter(K.UNPACK_SKIP_PIXELS),Oe=St.getParameter(K.UNPACK_SKIP_ROWS),Ur=St.getParameter(K.UNPACK_SKIP_IMAGES);St.pixelStorei(K.UNPACK_ROW_LENGTH,he.width),St.pixelStorei(K.UNPACK_IMAGE_HEIGHT,he.height),St.pixelStorei(K.UNPACK_SKIP_PIXELS,Dt),St.pixelStorei(K.UNPACK_SKIP_ROWS,Xt),St.pixelStorei(K.UNPACK_SKIP_IMAGES,jt);let ci=z.isDataArrayTexture||z.isData3DTexture,Li=$.isDataArrayTexture||$.isData3DTexture;if(z.isDepthTexture){let ie=Bt.get(z),Ne=Bt.get($),bn=Bt.get(ie.__renderTarget),xe=Bt.get(Ne.__renderTarget);St.bindFramebuffer(K.READ_FRAMEBUFFER,bn.__webglFramebuffer),St.bindFramebuffer(K.DRAW_FRAMEBUFFER,xe.__webglFramebuffer);for(let Re=0;Re<Tt;Re++)ci&&(K.framebufferTextureLayer(K.READ_FRAMEBUFFER,K.COLOR_ATTACHMENT0,Bt.get(z).__webglTexture,tt,jt+Re),K.framebufferTextureLayer(K.DRAW_FRAMEBUFFER,K.COLOR_ATTACHMENT0,Bt.get($).__webglTexture,Mt,Se+Re)),K.blitFramebuffer(Dt,Xt,Dt+It,Xt+_t,Pt,te,Pt+It,te+_t,K.DEPTH_BUFFER_BIT,K.NEAREST);St.bindFramebuffer(K.READ_FRAMEBUFFER,null),St.bindFramebuffer(K.DRAW_FRAMEBUFFER,null)}else if(tt!==0||z.isRenderTargetTexture||Bt.has(z)){let ie=Bt.get(z),Ne=Bt.get($);St.bindFramebuffer(K.READ_FRAMEBUFFER,D),St.bindFramebuffer(K.DRAW_FRAMEBUFFER,R);for(let bn=0;bn<Tt;bn++)ci?K.framebufferTextureLayer(K.READ_FRAMEBUFFER,K.COLOR_ATTACHMENT0,ie.__webglTexture,tt,jt+bn):K.framebufferTexture2D(K.READ_FRAMEBUFFER,K.COLOR_ATTACHMENT0,K.TEXTURE_2D,ie.__webglTexture,tt),Li?K.framebufferTextureLayer(K.DRAW_FRAMEBUFFER,K.COLOR_ATTACHMENT0,Ne.__webglTexture,Mt,Se+bn):K.framebufferTexture2D(K.DRAW_FRAMEBUFFER,K.COLOR_ATTACHMENT0,K.TEXTURE_2D,Ne.__webglTexture,Mt),tt!==0?K.blitFramebuffer(Dt,Xt,Dt+It,Xt+_t,Pt,te,Pt+It,te+_t,K.COLOR_BUFFER_BIT,K.NEAREST):Li?K.copyTexSubImage3D(Lt,Mt,Pt,te,Se+bn,Dt,Xt,It,_t):K.copyTexSubImage2D(Lt,Mt,Pt,te,Dt,Xt,It,_t);St.bindFramebuffer(K.READ_FRAMEBUFFER,null),St.bindFramebuffer(K.DRAW_FRAMEBUFFER,null)}else Li?z.isDataTexture||z.isData3DTexture?K.texSubImage3D(Lt,Mt,Pt,te,Se,It,_t,Tt,oe,Ue,he.data):$.isCompressedArrayTexture?K.compressedTexSubImage3D(Lt,Mt,Pt,te,Se,It,_t,Tt,oe,he.data):K.texSubImage3D(Lt,Mt,Pt,te,Se,It,_t,Tt,oe,Ue,he):z.isDataTexture?K.texSubImage2D(K.TEXTURE_2D,Mt,Pt,te,It,_t,oe,Ue,he.data):z.isCompressedTexture?K.compressedTexSubImage2D(K.TEXTURE_2D,Mt,Pt,te,he.width,he.height,oe,he.data):K.texSubImage2D(K.TEXTURE_2D,Mt,Pt,te,It,_t,oe,Ue,he);St.pixelStorei(K.UNPACK_ROW_LENGTH,Ve),St.pixelStorei(K.UNPACK_IMAGE_HEIGHT,se),St.pixelStorei(K.UNPACK_SKIP_PIXELS,Pi),St.pixelStorei(K.UNPACK_SKIP_ROWS,Oe),St.pixelStorei(K.UNPACK_SKIP_IMAGES,Ur),Mt===0&&$.generateMipmaps===!0&&$.mipmapsAutoUpdate===!0&&K.generateMipmap(Lt),St.unbindTexture()},this.initRenderTarget=function(z){Bt.get(z).__webglFramebuffer===void 0&&Wt.setupRenderTarget(z)},this.initTexture=function(z){z.isCubeTexture?Wt.setTextureCube(z,0):z.isData3DTexture?Wt.setTexture3D(z,0):z.isDataArrayTexture||z.isCompressedArrayTexture?Wt.setTexture2DArray(z,0):Wt.setTexture2D(z,0),St.unbindTexture()},this.resetState=function(){B=0,b=0,P=null,St.reset(),gt.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return yn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;let e=this.getContext();e.drawingBufferColorSpace=ee._getDrawingBufferColorSpace(t),e.unpackColorSpace=ee._getUnpackColorSpace()}};var Et=1e3,th=null;function Gd(n){th=n}function Pr(n,t,e,i,{font:s="400 90px Fraunces",fill:r="#111",align:a="left",spacing:o=0,base:l="alphabetic"}={}){n.save(),n.font=s,n.fillStyle=r,n.textAlign=a,n.textBaseline=l,"letterSpacing"in n&&(n.letterSpacing=`${o}px`),n.fillText(t,e,i),n.restore()}var zd=(n,t,e,i,s,r="left")=>Pr(n,t,i,s,{font:'500 19px "DM Mono"',fill:e,align:r,spacing:2});function Me(n,t){n.fillStyle=t,n.fillRect(0,0,Et,Et)}function fy(n,t,e,i,s,r){n.fillStyle=r,n.beginPath(),n.arc(e,i,s,0,st),n.fill();let a=5+s*.5;for(let o=0;o<a;o++){let l=t()*st,c=s*(1+t()*t()*3.6),u=s*.22*t();n.beginPath(),n.arc(e+Math.cos(l)*c,i+Math.sin(l)*c,u,0,st),n.fill()}}var py={"drip-feed"(n,t){Me(n,"#f3eee3");let e=["#16130f","#e8452d","#1f4fd8","#f2b705"];for(let i=0;i<16;i++){let s=e[i%4],r=t()*Et,a=t()*Et,o=t()*st;n.strokeStyle=s,n.fillStyle=s;for(let l=0;l<90;l++){o+=(t()-.5)*.9;let c=r+Math.cos(o)*26,u=a+Math.sin(o)*26;n.lineWidth=1+Math.pow(t(),3)*12,n.lineCap="round",n.beginPath(),n.moveTo(r,a),n.lineTo(c,u),n.stroke(),t()<.14&&fy(n,t,c,u,3+t()*11,s),r=c,a=u,(r<-60||r>Et+60)&&(o=Math.PI-o),(a<-60||a>Et+60)&&(o=-o)}}},"golden-repair"(n,t){let e=n.createLinearGradient(0,0,0,Et);e.addColorStop(0,"#d9cfbb"),e.addColorStop(1,"#b9ab90"),Me(n,e);let i=500,s=500,r=390;n.save(),n.shadowColor="rgba(40,25,10,.55)",n.shadowBlur=70,n.shadowOffsetY=40,n.fillStyle="#1e1a1d",n.beginPath(),n.arc(i,s,r,0,st),n.fill(),n.restore();let a=n.createRadialGradient(i-90,s-110,20,i,s,r);a.addColorStop(0,"#5b3a2c"),a.addColorStop(.55,"#2a1b1e"),a.addColorStop(.92,"#100d10"),a.addColorStop(1,"#6a4a34"),n.fillStyle=a,n.beginPath(),n.arc(i,s,r,0,st),n.fill(),n.save(),n.beginPath(),n.arc(i,s,r,0,st),n.clip();let o=(l,c,u,f,h)=>{n.beginPath(),n.moveTo(l,c);for(let p=0;p<f;p++)u+=(t()-.5)*.95,l+=Math.cos(u)*36,c+=Math.sin(u)*36,n.lineTo(l,c),t()<.2&&h>3&&(n.stroke(),o(l,c,u+(t()-.5)*2,f-p-2,h*.6),n.beginPath(),n.moveTo(l,c));let d=n.createLinearGradient(i-r,s-r,i+r,s+r);d.addColorStop(0,"#fff0a8"),d.addColorStop(.5,"#d9a226"),d.addColorStop(1,"#fbe07a"),n.strokeStyle=d,n.lineWidth=h,n.lineJoin="round",n.stroke()};for(let l=0;l<6;l++){let c=l/6*st+t();o(i+Math.cos(c)*26,s+Math.sin(c)*26,c,12,7)}n.restore()},sediment(n,t){let e=De(9),i=["#e9d9b5","#c7562e","#efb54a","#2e6f8e","#f2e7d0","#7a3e2c","#e58a3a","#264653"],s=Ct(250,250),r=s.getContext("2d"),a=r.createImageData(250,250);for(let o=0;o<250;o++)for(let l=0;l<250;l++){let c=o+(e(l*.022,4)-.5)*110+(e(l*.09,9)-.5)*22,u=i[At(Math.floor((c+40)/41),0,7)],[f,h,d]=rn(u),p=(t()-.5)*44,T=(o*250+l)*4;a.data[T]=f+p,a.data[T+1]=h+p,a.data[T+2]=d+p,a.data[T+3]=255}r.putImageData(a,0,0),n.imageSmoothingEnabled=!1,n.drawImage(s,0,0,Et,Et),n.imageSmoothingEnabled=!0},endpaper(n){let t=De(5),e=400,i=Ct(e,e),s=i.getContext("2d"),r=s.createImageData(e,e),a=[[244,236,220],[28,66,92],[184,74,48],[224,170,70],[58,122,140],[20,32,48]];for(let o=0;o<e;o++)for(let l=0;l<e;l++){let c=l/e,u=o/e,f=Math.sin(u*44)*.03,h=c+(t(c*3,u*3)-.5)*.5+f,d=u+(t(c*3+7,u*3+3)-.5)*.5;h+=(t(h*9,d*9)-.5)*.09;let p=Math.floor((h*6.5+Math.sin(d*7)*1.1+8)*2.4),T=a[(p%6+6)%6],x=(o*e+l)*4;r.data[x]=T[0],r.data[x+1]=T[1],r.data[x+2]=T[2],r.data[x+3]=255}s.putImageData(r,0,0),n.drawImage(i,0,0,Et,Et)},"steamed-up"(n,t){let e=n.createLinearGradient(0,0,0,Et);e.addColorStop(0,"#0a1626"),e.addColorStop(.6,"#16314f"),e.addColorStop(1,"#2a1f3a"),Me(n,e);let i=()=>{for(let o=0;o<90;o++){let l=["#ffb347","#ff5e62","#7ad7f0","#fff3c4"][o%4],c=t()*Et,u=300+t()*620,f=12+t()*54;n.globalAlpha=.25+t()*.5,n.fillStyle=l,n.beginPath(),n.arc(c,u,f,0,st),n.fill()}n.globalAlpha=1};n.save(),i(),n.restore(),n.fillStyle="rgba(210,225,240,.62)",n.fillRect(0,0,Et,Et);let s=Ct(Et,Et),r=s.getContext("2d");r.font="600 300px Caveat",r.textAlign="center",r.lineJoin="round",r.strokeStyle="#000",r.lineWidth=16,r.strokeText("steamed",490,430),r.strokeText("up",500,690),r.globalCompositeOperation="source-in";let a=r.createLinearGradient(0,0,0,Et);a.addColorStop(0,"#071222"),a.addColorStop(1,"#23375a"),r.fillStyle=a,r.fillRect(0,0,Et,Et),n.drawImage(s,0,0),n.strokeStyle="rgba(7,18,34,.7)",n.lineCap="round";for(let o=0;o<9;o++){let l=120+t()*760,c=500+t()*200;n.lineWidth=3+t()*6,n.beginPath(),n.moveTo(l,c),n.lineTo(l+(t()-.5)*18,c+120+t()*240),n.stroke()}},"hall-of-mirrors"(n,t){Me(n,"#07050f"),n.save(),n.translate(500,500),n.globalCompositeOperation="lighter";let e=12;for(let i=0;i<7;i++){let s=250+i*28,r=70+i*56;for(let a=0;a<e;a++){n.save(),n.rotate(a/e*st);for(let o of[1,-1])n.save(),n.scale(1,o),n.strokeStyle=`hsla(${s},95%,62%,.5)`,n.lineWidth=3+i*.5,n.shadowColor=`hsl(${s},100%,60%)`,n.shadowBlur=24,n.beginPath(),n.moveTo(r*.3,0),n.bezierCurveTo(r*.7,r*.5,r*1.1,r*.25,r*1.25,0),n.stroke(),n.restore();n.restore()}}n.restore()},"wallpaper-group"(n){Me(n,"#123c30");let t=125,e=t*Math.sqrt(3)/2;for(let i=-1;i<12;i++)for(let s=-1;s<10;s++){let r=s*t+(i%2?t/2:0),a=i*e;for(let o=0;o<3;o++)n.save(),n.translate(r,a),n.rotate(o/3*st),n.fillStyle=["#f0e4c2","#38b58a","#e8a33d"][o],n.beginPath(),n.moveTo(0,0),n.bezierCurveTo(t*.35,-t*.1,t*.3,t*.42,0,t*.56),n.bezierCurveTo(-t*.14,t*.34,-t*.04,t*.14,0,0),n.fill(),n.restore()}},wordsmear(n){Me(n,"#f6e9e3");let t="the brush remembers what the hand forgets and the hand forgets what the eye forgave ",e=.25,i=0;for(n.fillStyle="#c23b5a",n.textAlign="center",n.textBaseline="middle";e<31;){let s=8+e*15,r=e,a=500+Math.cos(r)*s,o=500+Math.sin(r)*s,l=12+e*1.75;n.save(),n.translate(a,o),n.rotate(r+Math.PI/2),n.font=`italic 400 ${l}px Fraunces`,n.fillText(t[i%t.length],0,0),n.restore(),e+=l*.56/s,i++}},"right-angles"(n){Me(n,"#f1ece0");let t=(i,s,r,a,o)=>{n.fillStyle=o,n.fillRect(i,s,r,a)};t(0,0,380,300,"#d8312c"),t(740,0,260,180,"#f3c613"),t(380,560,360,440,"#1f3f9e"),t(0,800,180,200,"#f3c613"),t(860,730,140,270,"#d8312c"),n.fillStyle="#111",[[0,296,Et,16],[370,0,16,Et],[734,0,16,Et],[0,552,Et,16],[0,796,380,16],[734,172,266,16],[176,796,12,204],[734,724,266,12],[856,724,12,276]].forEach(i=>n.fillRect(...i));let e=["#d8312c","#f3c613","#1f3f9e","#f1ece0"];for(let i=0;i<26;i++)n.fillStyle=e[i%4],n.fillRect(i*40+4,298,14,12),n.fillRect(372,40+i*37,12,14)},"dont-lift"(n){Me(n,"#efe7d6"),n.strokeStyle="#191714",n.lineWidth=5,n.lineCap="round",n.lineJoin="round",n.beginPath();let t=[[60,700],[170,690],[230,640],[190,540],[300,420],[330,300],[460,190],[640,230],[730,350],[700,430],[770,520],[710,540],[730,590],[690,610],[700,660],[610,700],[520,660],[470,720],[540,780],[420,800],[380,650],[470,520],[560,480],[470,450],[400,500],[450,400],[570,390],[610,440],[540,450],[620,510],[820,640],[940,660]];n.moveTo(...t[0]);for(let e=1;e<t.length-1;e++)n.quadraticCurveTo(t[e][0],t[e][1],(t[e][0]+t[e+1][0])/2,(t[e][1]+t[e+1][1])/2);n.lineTo(...t[t.length-1]),n.stroke()},"twin-dials"(n){Me(n,"#14161a"),n.fillStyle="#04120b",n.fillRect(70,70,860,660),n.save(),n.beginPath(),n.rect(70,70,860,660),n.clip(),n.strokeStyle="#3cf08f",n.lineWidth=4,n.shadowColor="#35d07e",n.shadowBlur=22,n.lineJoin="round",n.beginPath();let t=120,e=660;n.moveTo(t,e),[[0,-480],[120,0],[0,390],[120,0],[0,-300],[120,0],[0,210],[120,0],[0,-120],[90,0],[0,60],[90,0],[0,-340]].forEach(([s,r])=>{t+=s,e+=r,n.lineTo(t,e)}),n.stroke(),n.restore();for(let s of[160,840]){let r=n.createRadialGradient(s-18,836,6,s,852,76);r.addColorStop(0,"#f4f4f2"),r.addColorStop(.7,"#9b9ea3"),r.addColorStop(1,"#55585e"),n.fillStyle=r,n.beginPath(),n.arc(s,852,76,0,st),n.fill(),n.strokeStyle="#2a2c30",n.lineWidth=6,n.beginPath(),n.moveTo(s,852),n.lineTo(s+30,800),n.stroke()}},raked(n){Me(n,"#d9d0bd");let t=(e,i,s,r)=>{for(let a=0;a<r;a++){let o=s+a*17;n.strokeStyle="rgba(120,104,78,.55)",n.lineWidth=4,n.beginPath(),n.arc(e,i,o,0,st),n.stroke(),n.strokeStyle="rgba(255,250,235,.7)",n.lineWidth=3,n.beginPath(),n.arc(e+2,i+3,o,0,st),n.stroke()}};for(let e=0;e<62;e++){let i=e*17;n.strokeStyle="rgba(120,104,78,.5)",n.lineWidth=4,n.beginPath(),n.moveTo(0,i),n.lineTo(Et,i),n.stroke(),n.strokeStyle="rgba(255,250,235,.7)",n.lineWidth=3,n.beginPath(),n.moveTo(0,i+4),n.lineTo(Et,i+4),n.stroke()}for(let[e,i,s,r]of[[350,420,96,200],[700,640,62,130]]){n.fillStyle="#d9d0bd",n.beginPath(),n.arc(e,i,r,0,st),n.fill(),t(e,i,s+14,Math.floor((r-s)/17)),n.save(),n.shadowColor="rgba(40,30,20,.6)",n.shadowBlur=30,n.shadowOffsetX=24,n.shadowOffsetY=18;let a=n.createRadialGradient(e-s*.3,i-s*.4,4,e,i,s);a.addColorStop(0,"#77706a"),a.addColorStop(1,"#2e2b2a"),n.fillStyle=a,n.beginPath(),n.ellipse(e,i,s,s*.8,.4,0,st),n.fill(),n.restore()}},squint(n,t){Me(n,"#f5efdf");let e=[];for(let i=0;i<9e3&&e.length<3e3;i++){let s=t()*Et,r=t()*Et;e.some(a=>(a[0]-s)**2+(a[1]-r)**2<280)||e.push([s,r])}for(let[i,s]of e){let r=Math.hypot(i-500,s-380),a=s<560,o=a?t()<.5?"#ef8a2e":"#e0507a":t()<.55?"#1f5fb0":"#e8a43a";r<150?o=t()<.8?"#fbd63f":"#fff4cf":a&&r<280&&t()<.5?o="#f5b83d":a&&s<200&&t()<.5&&(o="#7b52c7"),n.fillStyle=o,n.beginPath(),n.arc(i,s,7,0,st),n.fill()}},"scratch-track"(n,t){let e=n.createLinearGradient(0,0,Et,Et);["#ff3d81","#ffb13d","#fff14d","#3dff9e","#3dc8ff","#7a5cff","#ff3dd0"].forEach((r,a)=>e.addColorStop(a/6,r)),Me(n,e);let i=Ct(Et,Et),s=i.getContext("2d");s.fillStyle="#0a0a0c",s.fillRect(0,0,Et,Et),s.globalCompositeOperation="destination-out",s.lineCap="round",s.lineJoin="round";for(let r=0;r<80;r++){let a=80+r*6.4,o=t()*st,l=o+.3+t()*2.2;s.lineWidth=2+t()*3,s.beginPath(),s.arc(500,500,a,o,l),s.stroke()}n.drawImage(i,0,0)},"highly-strung"(n){Me(n,"#121527");let t=180,e=[500,500],i=430,s=r=>[e[0]+Math.cos(r/t*st-Math.PI/2)*i,e[1]+Math.sin(r/t*st-Math.PI/2)*i];n.lineWidth=1.2;for(let r=0;r<t;r++){let[a,o]=s(r),[l,c]=s(r*2);n.strokeStyle=`hsla(${335+r/t*55},85%,68%,.62)`,n.beginPath(),n.moveTo(a,o),n.lineTo(l,c),n.stroke()}n.fillStyle="#f4dfc8";for(let r=0;r<t;r+=2){let[a,o]=s(r);n.beginPath(),n.arc(a,o,2.8,0,st),n.fill()}},"low-res"(n,t){let i=Et/40,s=["#1a1040","#3b1a6e","#7a2a8c","#d0446e","#f08a4b","#fbd06b"];for(let r=0;r<40;r++)for(let a=0;a<40;a++){let o=r/26*5,l=Math.floor(o),c=(a+r)%2&&o-l>.5?1:0;n.fillStyle=s[Math.min(5,l+c)],n.fillRect(a*i,r*i,i+1,i+1)}for(let r=0;r<40;r++)n.fillStyle="#fff4d0",n.fillRect(Math.floor(t()*40)*i,Math.floor(t()*12)*i,i,i);n.fillStyle="#ffe680";for(let r=-6;r<=6;r++)for(let a=-6;a<=6;a++)a*a+r*r<38&&n.fillRect((20+a)*i,(20+r)*i,i,i);for(let r=0;r<40;r++){let a=26+Math.round(Math.sin(r*.4)*2+Math.sin(r*.13)*3);for(let o=a;o<40;o++)n.fillStyle=o===a?"#2fbf71":(r+o)%3?"#14433f":"#1b5c50",n.fillRect(r*i,o*i,i+1,i+1)}},"word-wheel"(n){Me(n,"#160a1c"),n.save(),n.translate(500,500);let t="round and round the word goes round";n.textBaseline="middle";for(let e=0;e<8;e++){let i=62+e*50,s=8+e*4,r=15+e*3.6;for(let a=0;a<s;a++)n.save(),n.rotate(a/s*st+e*.2),n.translate(i,0),n.font=`600 ${r}px Fraunces`,n.fillStyle=`hsl(${290+e*11},72%,${74-e*3}%)`,n.fillText(t.split(" ")[e%7],0,0),n.restore()}n.restore()},"spin-cycle"(n,t){Me(n,"#fdfaf5");let e=[500,500],i=["#e0308a","#ffb000","#00a6d6","#4b2bc9","#18b369"];for(let s=0;s<15;s++){let r=i[s%5],a=t()*st,o=30+t()*120;for(let l=0;l<40;l++){let c=a+(t()-.5)*.5;n.strokeStyle=r,n.lineCap="round",n.beginPath();let u=o;for(let f=0;f<34;f++){let h=c+u/500*1.5,d=e[0]+Math.cos(h)*u,p=e[1]+Math.sin(h)*u;f?n.lineTo(d,p):n.moveTo(d,p),u+=7+t()*14}n.lineWidth=1+t()*t()*9,n.stroke()}}n.fillStyle="#fdfaf5",n.beginPath(),n.arc(500,500,34,0,st),n.fill()},"wet-on-wet"(n,t){Me(n,"#eee7d8"),n.save(),n.filter="blur(10px)";for(let e=0;e<260;e++){let i=-1.1+e/260*5.3,s=300+Math.sin(e*.21)*12;n.fillStyle=`rgba(24,24,28,${.1+.26*(1-e/260)})`,n.beginPath(),n.arc(500+Math.cos(i)*s,430+Math.sin(i)*s,42-e*.12+t()*16,0,st),n.fill()}n.restore(),n.save(),n.filter="blur(2px)",n.lineCap="round";for(let e=0;e<210;e++){let i=-1.1+e/260*5.3,s=300+(t()-.5)*50;n.strokeStyle=`rgba(16,16,20,${.55*(1-e/240)})`,n.lineWidth=1+t()*7,n.beginPath(),n.moveTo(500+Math.cos(i)*s,430+Math.sin(i)*s),n.lineTo(500+Math.cos(i+.06)*(s+8),430+Math.sin(i+.06)*(s+8)),n.stroke()}n.restore(),n.fillStyle="#b3261e",n.fillRect(868,830,62,62)},"fold-here"(n,t){Me(n,"#f2eee4");let e=Ct(Et,Et),i=e.getContext("2d");i.fillStyle="#121216";let s=(r,a,o)=>{i.beginPath(),i.ellipse(r,a,o,o*(.7+t()*.6),t()*3,0,st),i.fill()};for(let r=0;r<46;r++){let a=110+t()*640,o=300*Math.sin((a-90)/680*Math.PI);s(500-t()*o,a,14+t()*80)}i.fillRect(476,170,24,560);for(let r=0;r<260;r++)s(500-t()*400,90+t()*720,t()*t()*11);i.globalCompositeOperation="destination-out";for(let r=0;r<10;r++)s(380+t()*100,200+t()*480,10+t()*24);n.drawImage(e,0,0,500,Et,0,0,500,Et),n.save(),n.translate(Et,0),n.scale(-1,1),n.drawImage(e,0,0,500,Et,0,0,500,Et),n.restore(),n.setLineDash([10,10]),n.strokeStyle="rgba(18,18,22,.35)",n.lineWidth=2,n.beginPath(),n.moveTo(500,0),n.lineTo(500,70),n.stroke(),n.setLineDash([])},leadlight(n,t){Me(n,"#111");let e=Array.from({length:70},()=>[t()*Et,t()*Et]),i=["#1f6fc4","#d43d3d","#e8b92e","#2a9d6a","#7a3db8","#3fb3d8","#e8772e"],s=250,r=Ct(s,s),a=r.getContext("2d"),o=a.createImageData(s,s);for(let l=0;l<s;l++)for(let c=0;c<s;c++){let u=1e9,f=1e9,h=0;for(let y=0;y<e.length;y++){let w=Math.hypot(e[y][0]/4-c,e[y][1]/4-l);w<u?(f=u,u=w,h=y):w<f&&(f=w)}let d=(l*s+c)*4,p=f-u<1.5,[T,x,m]=rn(i[h%7]),M=1-u/34*.45;o.data[d]=p?18:T*M+34,o.data[d+1]=p?18:x*M+34,o.data[d+2]=p?20:m*M+34,o.data[d+3]=255}a.putImageData(o,0,0),n.drawImage(r,0,0,Et,Et)},"long-exposure"(n,t){Me(n,"#050406"),n.save(),n.globalCompositeOperation="lighter",n.lineCap="round",n.lineJoin="round",n.font="600 390px Caveat",n.textAlign="center";for(let e=0;e<3;e++)n.strokeStyle=["rgba(255,120,30,.22)","rgba(255,190,90,.5)","rgba(255,250,225,.95)"][e],n.lineWidth=[26,10,3][e],n.shadowColor="#ff8a2e",n.shadowBlur=[40,22,6][e],n.strokeText("long",500,410),n.strokeText("exp.",500,730);n.shadowBlur=0;for(let e=0;e<500;e++){let i=t()*st,s=t()*480,r=500+Math.cos(i)*s,a=480+Math.sin(i)*s;n.strokeStyle=`rgba(255,${130+t()*110},60,${t()*.7})`,n.lineWidth=1,n.beginPath(),n.moveTo(r,a),n.lineTo(r+Math.cos(i)*t()*42,a+Math.sin(i)*t()*42+10),n.stroke()}n.restore()},"slow-growth"(n){let t=De(21),e=500,i=Ct(e,e),s=i.getContext("2d"),r=s.createImageData(e,e);for(let a=0;a<e;a++)for(let o=0;o<e;o++){let l=o+(t(o*.012,a*.012)-.5)*90,c=a+(t(o*.012+9,a*.012+5)-.5)*90,u=Math.sin(l*.17+3*t(l*.03,c*.03)*6)+Math.sin(c*.17+3*t(c*.03,l*.03)*6),f=At(u*3+.5),h=(a*e+o)*4;r.data[h]=zt(6,170,f),r.data[h+1]=zt(40,244,f),r.data[h+2]=zt(52,226,f),r.data[h+3]=255}s.putImageData(r,0,0),n.drawImage(i,0,0,Et,Et)}};function my(n){Je(n,Et,Et,{alpha:.05,seed:7})}function Do(n,t,e=null){let i=t.getContext("2d");if(i.setTransform(t.width/Et,0,0,t.height/Et,0,0),i.save(),e){let s=Math.max(Et/e.width,Et/e.height);Me(i,"#111"),i.drawImage(e,(Et-e.width*s)/2,(Et-e.height*s)/2,e.width*s,e.height*s)}else py[n.id](i,Ie(n.index*977+13)),my(i);i.restore()}function Vd(n,t){let e=t.getContext("2d");e.setTransform(t.width/Et,0,0,t.height/Et,0,0);let i=Ie(n.index+91),s="#2a2420";Me(e,"#c9b995");for(let o=0;o<5200;o++)e.fillStyle=`rgba(${i()<.5?"255,245,220":"70,52,30"},${i()*.09})`,i()<.5?e.fillRect(i()*Et,i()*Et,40+i()*90,1):e.fillRect(i()*Et,i()*Et,1,40+i()*90);let r=92,a=(o,l,c,u,f)=>{let h=f==="x"?e.createLinearGradient(0,l,0,l+u):e.createLinearGradient(o,0,o+c,0);h.addColorStop(0,"#d2a874"),h.addColorStop(.5,"#c0935c"),h.addColorStop(1,"#a87a48"),e.fillStyle=h,e.fillRect(o,l,c,u),e.strokeStyle="rgba(80,50,22,.2)",e.lineWidth=1;for(let d=0;d<26;d++){if(e.beginPath(),f==="x"){let p=l+i()*u;e.moveTo(o,p),e.bezierCurveTo(o+c*.3,p+i()*7-3,o+c*.7,p+i()*7-3,o+c,p)}else{let p=o+i()*c;e.moveTo(p,l),e.bezierCurveTo(p+i()*7-3,l+u*.3,p+i()*7-3,l+u*.7,p,l+u)}e.stroke()}e.strokeStyle="rgba(40,24,10,.45)",e.lineWidth=2,e.strokeRect(o,l,c,u)};a(0,0,Et,r,"x"),a(0,Et-r,Et,r,"x"),a(0,0,r,Et,"y"),a(Et-r,0,r,Et,"y"),a(r,Et/2-38,Et-r*2,76,"x"),e.strokeStyle="#7d7f84",e.lineWidth=3;for(let o=0;o<18;o++){let l=70+o*50,c=()=>i()*8-4;for(let[u,f,h]of[[l,20,0],[l,Et-20,0],[20,l,1.57],[Et-20,l,1.57]])e.save(),e.translate(u+c(),f+c()),e.rotate(h+(i()-.5)*.2),e.beginPath(),e.moveTo(-13,0),e.lineTo(13,0),e.stroke(),e.restore()}e.save(),e.translate(500,500),e.rotate(-.018),e.shadowColor="rgba(40,24,10,.45)",e.shadowBlur=14,e.shadowOffsetY=5,e.fillStyle="#f5efe1",e.fillRect(-335,-320,670,640),e.shadowColor="transparent",Pr(e,n.title,-295,-240,{font:"400 62px Fraunces",fill:s,spacing:-1}),Pr(e,n.genre,-295,-196,{font:"italic 400 30px Fraunces",fill:"rgba(42,36,32,.7)"}),e.fillStyle=n.accent,e.fillRect(-295,-172,590,3),n.tracks.forEach((o,l)=>{let c=-114+l*62;Pr(e,`${l+1}.`,-295,c,{font:"600 42px Caveat",fill:n.accent}),Pr(e,o,-252,c,{font:"600 44px Caveat",fill:s})}),th&&(e.save(),e.translate(238,-246),e.rotate(.09),e.drawImage(th,-54,-55,108,109),e.restore()),zd(e,n.cat,"rgba(42,36,32,.7)",-295,286),zd(e,Yn.name.toUpperCase(),"rgba(42,36,32,.7)",295,286,"right"),e.restore()}var Sn=Qe.length,Fo=1.3,Wd=.085,Uo=1024,gy=2.95,xy=n=>1-Math.pow(1-n,3),Hd=n=>n<.5?4*n*n*n:1-Math.pow(-2*n+2,3)/2,Oo=n=>(n=(n%Sn+Sn)%Sn,n>Sn/2?n-Sn:n);function yy(n){let t=new Es;t.background=new Zt(789520);let e=(r,a,o,l,c,u)=>{let f=new je(new Si(r,a),new Hi({color:new Zt(u,u,u),side:vn}));f.position.set(o,l,c),f.lookAt(0,0,0),t.add(f)};e(7,1.4,0,5,3,6),e(1.2,8,-6,0,3,4),e(1.2,8,6,1,2,2.5),e(3,3,3,3,6,2);let i=new Us(n),s=i.fromScene(t,.02).texture;return i.dispose(),s}function _y(){let t=Ct(64,64),e=t.getContext("2d"),i=e.createImageData(64,64),s=(a,o)=>{let l=Math.sin(a/64*Math.PI*16),c=Math.sin(o/64*Math.PI*16);return((Math.floor(a/4)+Math.floor(o/4))%2?l:c)*.5};for(let a=0;a<64;a++)for(let o=0;o<64;o++){let l=s(o+1,a)-s(o-1,a),c=s(o,a+1)-s(o,a-1),u=(a*64+o)*4;i.data[u]=128+l*90,i.data[u+1]=128+c*90,i.data[u+2]=255,i.data[u+3]=255}e.putImageData(i,0,0);let r=new Wi(t);return r.wrapS=r.wrapT=vs,r.repeat.set(30,30),r}function vy(){let n=Ct(128,128),t=n.getContext("2d");return t.filter="blur(11px)",t.fillStyle="rgba(0,0,0,.55)",t.fillRect(36,36,56,56),new Wi(n)}function My(){let n=new Mi(Fo,Fo,Wd),t=n.attributes.uv,e=.035;for(let i=0;i<16;i++){let s=t.getX(i),r=t.getY(i),a=Math.floor(i/4);a===0&&t.setXY(i,1-e*(1-s),r),a===1&&t.setXY(i,e*s,r),a===2&&t.setXY(i,s,1-e*(1-r)),a===3&&t.setXY(i,s,e*r)}return n}function qd({mount:n,onFocus:t,onOpenRequest:e,onHover:i,onPointer:s}){let r=new Po({antialias:!0,alpha:!0,powerPreference:"high-performance"});r.setPixelRatio(Math.min(window.devicePixelRatio||1,2)),r.setClearColor(0,0),r.toneMapping=Mn;let a=r.domElement;a.className="gl",a.setAttribute("aria-label","Rack of painted canvases"),n.appendChild(a);let o=new Es;o.environment=yy(r);let l=new qe(30,1,.1,50);l.position.set(0,0,4.3);let c=new mr(16777215,1.5);c.position.set(-1.6,2.6,4),o.add(c,new gr(16777215,.75));let u={canvas:My(),shadow:new Si(Fo*2.2,Fo*2.2)},f=_y(),h={shadow:new Hi({map:vy(),transparent:!0,depthWrite:!1})},d=new Rn;o.add(d);function p(v){let G=new Rn,q=new Rn;G.add(q);let S=new Cs({color:new Zt(v.glow),roughness:.62,normalMap:f,normalScale:new Qt(.32,.32),envMapIntensity:.14,emissive:16777215,emissiveIntensity:.88}),V=new Cs({color:13220245,roughness:.85,envMapIntensity:.2,emissive:16777215,emissiveIntensity:.86}),W=new je(u.canvas,[S,S,S,S,S,V]),Z=new je(u.shadow,h.shadow);Z.position.set(.05,-.07,-Wd/2-.19),q.add(Z,W),G.visible=!1,d.add(G);let Y=.93+Ie(v.index*31+5)()*.13,j={rel:v,root:G,spin:q,front:S,back:V,scale:Y,ready:!1};return G.traverse(ct=>{ct.isMesh&&(ct.userData.item=j)}),Z.userData.item=null,j}let T=Qe.map(p),x=new Map,m=v=>{let G=new Wi(v);return G.colorSpace=We,G.anisotropy=Math.min(8,r.capabilities.getMaxAnisotropy()),G};function M(v){let G=v.coverCanvas||(v.coverCanvas=Ct(Uo,Uo));Do(v.rel,G,x.get(v.rel.id));let q=v.backCanvas||(v.backCanvas=Ct(Uo,Uo));v.ready||Vd(v.rel,q);for(let[S,V]of[[v.front,G],[v.back,q]])S.map?S.map.needsUpdate=!0:S.map=m(V),S.emissiveMap=S.map,S.color.set(2894892),S.needsUpdate=!0;v.ready=!0}let y={pos:0,target:0,snapAt:0,spin:0,spinVel:0,dragging:!1,mx:0,my:0,anim:null,running:!0,par:1,zoom:{index:-1,e:0}};function w(){let v=n.clientWidth,G=n.clientHeight;r.setSize(v,G,!1),l.aspect=v/G,l.position.z=v/G<.8?4.3*(.8/(v/G))*.92:4.3,l.updateProjectionMatrix()}new ResizeObserver(w).observe(n),w();function I(v,G){let q=Math.abs(G),S=Math.sign(G)||0,V=Ui(0,1,q),W=Math.max(0,q-1),Z=y.zoom.index===v.rel.index,Y=1+(Z?0:y.zoom.e*1.5),j=-S*(V*1+W*.34-Math.max(0,W-2)*.05)*Y,ct=-V*.62-W*.1+(Z?y.zoom.e*gy:0);return v.root.position.set(0,j,ct),v.root.rotation.set(S*V*.92,0,S*V*.012),v.root.scale.setScalar(zt(v.scale,1,Z?y.zoom.e:0)),v.root.visible=q<6.5,1-V}let L=new xr,g=new Qt;function _(v,G){let q=a.getBoundingClientRect();g.set((v-q.left)/q.width*2-1,-((G-q.top)/q.height)*2+1),L.setFromCamera(g,l);for(let S of L.intersectObjects(d.children,!0))if(S.object.userData.item)return S.object.userData.item;return null}let U=v=>{y.target+=Oo(v-y.target),y.snapAt=0},C=v=>{y.target=Math.round(y.target)+v,y.snapAt=0};a.addEventListener("wheel",v=>{if(v.preventDefault(),y.anim)return;let G=v.deltaMode===1?v.deltaY*28:v.deltaY;y.target+=At(G,-160,160)*.0042,y.snapAt=performance.now()+130},{passive:!1});let F=null;a.addEventListener("pointerdown",v=>{if(!(v.button>0||y.anim)){F={x:v.clientX,y:v.clientY,lx:v.clientX,axis:null,t:performance.now(),startTarget:y.target};try{a.setPointerCapture(v.pointerId)}catch{}}}),a.addEventListener("pointermove",v=>{let G=a.getBoundingClientRect();if(y.mx=(v.clientX-G.left)/G.width*2-1,y.my=(v.clientY-G.top)/G.height*2-1,s?.(y.mx,y.my),!F){y.hoverX=v.clientX,y.hoverY=v.clientY,y.hoverDirty=!0;return}let q=v.clientX-F.x,S=v.clientY-F.y;if(!F.axis&&Math.hypot(q,S)>6&&(F.axis=Math.abs(q)>Math.abs(S)?"spin":"browse",y.dragging=!0,n.classList.add("is-dragging"),i(null)),F.axis==="spin"){let V=(v.clientX-F.lx)*.0105;y.spin+=V,y.spinVel=zt(y.spinVel,V*26,.4)}else F.axis==="browse"&&(y.target=F.startTarget-S/(n.clientHeight*.3),y.snapAt=1/0);F.lx=v.clientX}),a.addEventListener("pointerup",v=>{if(!F)return;let G=F.axis,q=F;if(F=null,y.dragging=!1,n.classList.remove("is-dragging"),G==="browse"){y.snapAt=0;return}if(G||performance.now()-q.t>600)return;let S=_(v.clientX,v.clientY);S&&(Math.abs(Oo(S.rel.index-y.pos))<.5?e(S.rel):U(S.rel.index))}),a.addEventListener("pointercancel",()=>{F=null,y.dragging=!1,n.classList.remove("is-dragging")}),a.addEventListener("pointerleave",()=>i(null));let E=-1,O=[],D=performance.now(),R=0;function B(){let v=Math.round(y.pos),G=[];for(let q=0;q<=Sn/2;q++)for(let S of q?[1,-1]:[1])G.push(((v+S*q)%Sn+Sn)%Sn);O=G.filter(q=>!T[q].ready)}function b(v){if(!y.running)return;requestAnimationFrame(b);let G=Math.min(.05,(v-D)/1e3);if(D=v,O.length){let V=T[O.shift()];V.ready||M(V)}y.snapAt&&v>y.snapAt&&!y.dragging&&(y.target=Math.round(y.target),y.snapAt=0),y.pos=zt(y.pos,y.target,1-Math.exp(-G*9)),Math.abs(y.target-y.pos)<5e-4&&(y.pos=y.target);let q=(Math.round(y.pos)%Sn+Sn)%Sn;if(q!==E&&(E!==-1&&(y.spin=0,y.spinVel=0,qt("flick")),E=q,R=0,B(),t(Qe[q])),!y.dragging&&!y.anim){y.spin+=y.spinVel*G,y.spinVel*=Math.exp(-G*3.2);let V=Math.round(y.spin/Math.PI),W=Math.abs(y.spinVel)<2.2?1:0;y.spin=zt(y.spin,V*Math.PI,W*(1-Math.exp(-G*7)))}let S=Math.round(y.spin/Math.PI);S!==R&&(R=S,qt("turn")),y.par=zt(y.par,y.anim?0:1,1-Math.exp(-G*12));for(let V of T){let W=I(V,Oo(V.rel.index-y.pos)),Z=V.rel.index===E;V.spin.rotation.y=zt(V.spin.rotation.y,Z?y.spin+y.mx*.14*W*y.par:0,Z?1:.2),V.spin.rotation.x=Z?y.my*.09*W*y.par:0}if(y.anim&&y.anim(v),y.hoverDirty&&!y.anim){y.hoverDirty=!1;let V=_(y.hoverX,y.hoverY);i(V?{x:y.hoverX,y:y.hoverY,label:Math.abs(Oo(V.rel.index-y.pos))<.5?"Paint":V.rel.title}:null)}r.render(o,l)}function P(v,G){return new Promise(q=>{let S=performance.now();y.anim=V=>{let W=At((V-S)/v);G(W),W>=1&&(y.anim=null,q())}})}let A=matchMedia("(prefers-reduced-motion: reduce)").matches,N={get focused(){return Qe[E]},next:()=>C(1),prev:()=>C(-1),goTo:U,jump(v){y.pos=y.target=v},flip(){y.spinVel=0,y.spin=(Math.round(y.spin/Math.PI)+1)*Math.PI},setPressing(v,G){G?x.set(v,G):x.delete(v);let q=T.find(S=>S.rel.id===v);q?.ready&&M(q)},coverCanvas(v){let G=T[v];return G.ready||M(G),G.coverCanvas},async open(v,G){let q=T[v.index];q.ready||M(q),y.spinVel=0,y.zoom.index=v.index;let S=y.spin,V=Math.round(y.spin/(Math.PI*2))*Math.PI*2;if(A){y.zoom.e=1,G();return}let W=!1;await P(820,Z=>{y.spin=zt(S,V,Hd(Math.min(1,Z*2.2))),y.zoom.e=Hd(Z),Z>.42&&!W&&(W=!0,G())})},async close(){if(A){y.zoom.e=0,y.zoom.index=-1;return}await P(720,v=>{y.zoom.e=1-xy(v)}),y.zoom.index=-1},settleZoom(){y.zoom.e=1},pause(){y.running=!1},resume(){y.running||(y.running=!0,D=performance.now(),requestAnimationFrame(b))},state:y};return B(),requestAnimationFrame(b),N}function Xd(){try{return!!document.createElement("canvas").getContext("webgl2")}catch{return!1}}var Sy=`
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
}`,by=n=>rn(n).map(t=>Math.pow(t/255,1.5));function Yd(n){let t=document.createElement("canvas");t.className="backdrop",t.setAttribute("aria-hidden","true"),n.prepend(t);let e=Fn(t,{preserveDrawingBuffer:!1});if(!e)return{tint(){},pause(){},resume(){},pointer(){}};let i=He(e,Sy),s=()=>{let M=Math.min(1,620/n.clientWidth);t.width=Math.max(2,Math.round(n.clientWidth*M)),t.height=Math.max(2,Math.round(n.clientHeight*M)),e.viewport(0,0,t.width,t.height)};new ResizeObserver(s).observe(n),s();let r=matchMedia("(prefers-reduced-motion: reduce)").matches,a=[.3,.1,.1],o=a,l=1,c=!0,u=0,f=0,h=0,d=0,p=0,T=0,x=performance.now();function m(M){if(!c||(requestAnimationFrame(m),M-u<33))return;let y=Math.min(.1,(M-u)/1e3);u=M,l=Math.min(1,l+y*.8),h=zt(h,p,.04),d=zt(d,T,.04),f=zt(f,document.documentElement.dataset.theme==="light"?1:0,.08);let w=l*l*(3-2*l);i.use().f("t",r?40:(M-x)/1e3+200).f("aspect",t.width/t.height).f("light",f).f("blend",w).f("m",h,d).f("ca",...a).f("cb",...o),mn(e)}return requestAnimationFrame(m),{tint(M){let y=l*l*(3-2*l);a=a.map((w,I)=>zt(w,o[I],y)),o=by(M),l=0},pointer(M,y){p=M,T=y},pause(){c=!1},resume(){c||(c=!0,requestAnimationFrame(m))}}}var $d=6,Zd=30;function Kd(n){let t=document.createElement("canvas");t.className="wipe",t.setAttribute("aria-hidden","true"),n.appendChild(t);let e=t.getContext("2d"),i=matchMedia("(prefers-reduced-motion: reduce)").matches,s=()=>{t.width=Math.ceil(innerWidth/2),t.height=Math.ceil(innerHeight/2)};s(),addEventListener("resize",s);function r(){let o=[],l=t.height/$d;for(let c=0;c<$d;c++){let u=[];for(let f=0;f<Zd;f++)u.push({y:(c-.28+f/Zd*1.56)*l,lag:Math.random()*.2,w:l*(.08+Math.random()*.1),wob:(Math.random()-.5)*l*.2,shade:(Math.random()-.5)*.28});o.push({dir:c%2?-1:1,start:c*.075,bristles:u})}return o}function a(o,l){return new Promise(c=>{if(i){c();return}let u=r(),f=performance.now(),h=t.width,d=new Map,p=T=>{let x=At((T-f)/o);for(let m of u)for(let M of m.bristles){let y=At((x-m.start-M.lag*.5)/.525),w=y*y*(3-2*y),I=d.get(M)??0;if(w<=I)continue;d.set(M,w);let L=m.dir>0?I*h*1.08-8:h-I*h*1.08+8,g=m.dir>0?w*h*1.08:h-w*h*1.08,_=M.y+Math.sin(I*5)*M.wob,U=M.y+Math.sin(w*5)*M.wob;l(M,L,_,g,U)}x<1?requestAnimationFrame(p):c()};requestAnimationFrame(p)})}return{async cover(o){let[l,c,u]=rn(o),f=h=>{let d=p=>Math.round(At(h<0?p*(1+h):p+(255-p)*h,0,255));return`rgb(${d(l)},${d(c)},${d(u)})`};e.globalCompositeOperation="source-over",e.lineCap="round",await a(430,(h,d,p,T,x)=>{e.strokeStyle=f(h.shade),e.lineWidth=h.w,e.beginPath(),e.moveTo(d,p),e.lineTo(T,x),e.stroke()}),e.fillStyle=f(0),e.fillRect(0,0,t.width,t.height)},async reveal(){e.globalCompositeOperation="destination-out",e.lineCap="round",await a(460,(o,l,c,u,f)=>{e.lineWidth=o.w*1.5,e.beginPath(),e.moveTo(l,c),e.lineTo(u,f),e.stroke()}),e.globalCompositeOperation="source-over",e.clearRect(0,0,t.width,t.height)}}}var Jd="The paint slowly comes alive: pigment drifts and shimmers across the surface, gentle camera push-in, painterly, no new objects.",ko=location.protocol==="file:"?null:"api/alive",Fs=n=>String(n).replace(/[&<>"]/g,t=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"})[t]);function wy(n){let t=Math.min(1,1280/Math.max(n.width,n.height)),e=Ct(n.width*t,n.height*t),i=e.getContext("2d");return i.fillStyle="#111",i.fillRect(0,0,e.width,e.height),i.drawImage(n,0,0,e.width,e.height),e.toDataURL("image/jpeg",.9)}function Qd(n){let t=document.createElement("div");t.className="alive",t.setAttribute("role","dialog"),t.setAttribute("aria-modal","true"),t.setAttribute("aria-label","Bring it to life"),t.innerHTML='<div class="alive__card"></div>',n.appendChild(t);let e=t.firstChild,i=0,s="",r=null,a="",o=()=>{i++,t.classList.remove("on"),e.replaceChildren()};t.addEventListener("pointerdown",T=>{T.target===t&&o()}),addEventListener("keydown",T=>{T.key==="Escape"&&t.classList.contains("on")&&(T.stopImmediatePropagation(),o())},!0);let l=T=>{e.innerHTML=T,e.querySelector("[data-close]")?.addEventListener("click",o)};function c(){l(`<h3>Bring it to life</h3>
      <p>This turns your painting into a five second video with Higgsfield. It needs the small local server, because your Higgsfield key must stay off the web page.</p>
      <pre>1. Copy .env.example to .env
2. Paste your key from console.higgsfield.ai
3. npm start
4. Open http://localhost:5200</pre>
      <div class="alive__row"><button class="btn" data-close>Got it</button></div>`)}function u(){l(`<h3>Bring it to life</h3>
      <p>${Fs(a)} becomes a five second video. Tell it how the paint should move.</p>
      <img src="${s}" alt="Your painting">
      <textarea aria-label="How the paint should move">${Fs(Jd)}</textarea>
      <div class="alive__row">
        <span class="note">Your painting is sent to Higgsfield, and each video is charged to your Higgsfield balance.</span>
        <button class="btn" data-close>Not now</button>
        <button class="btn hot" data-go>Make the video</button>
      </div>`),e.querySelector("[data-go]").onclick=()=>p(e.querySelector("textarea").value.trim()||Jd)}function f(T){l(`<h3>Waking the paint<span class="alive__dots"></span></h3>
      <p>${Fs(T)}</p>
      <img src="${s}" alt="Your painting">
      <div class="alive__row"><span class="note">You can leave this open. It usually takes a few minutes.</span><button class="btn" data-close>Stop watching</button></div>`)}function h(T){l(`<h3>That didn't take</h3><p>${Fs(T)}</p>
      <div class="alive__row"><button class="btn" data-close>Close</button><button class="btn hot" data-retry>Try again</button></div>`),e.querySelector("[data-retry]").onclick=u}function d(T){qt("shimmer"),l(`<h3>It's alive</h3>
      <video src="${Fs(T)}" controls autoplay loop muted playsinline></video>
      <p>Higgsfield keeps this file for about seven days, so download it if you want to keep it.</p>
      <div class="alive__row"><button class="btn" data-close>Close</button><a class="btn" style="display:inline-flex;align-items:center;text-decoration:none" href="${Fs(T)}" download target="_blank" rel="noopener">Download</a></div>`)}async function p(T){let x=++i;f("Sending your painting over.");let m;try{let w=await fetch(ko,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({image:s,prompt:T})}),I=await w.json();if(!w.ok)throw new Error(I.error||"The server turned that down.");m=I.id}catch(w){x===i&&h(w.message);return}let M=Date.now(),y=4e3;for(;x===i;){if(await new Promise(w=>setTimeout(w,y)),x!==i)return;y=Math.min(15e3,y*1.3);try{let w=await fetch(`${ko}/${m}`),I=await w.json();if(x!==i)return;if(!w.ok)throw new Error(I.error||"Lost track of that request.");if(I.status==="completed"&&I.video){d(I.video);return}if(I.status==="nsfw"){h("Higgsfield's content filter stopped this one.");return}if(I.status==="failed"||I.status==="canceled"){h(I.error||"Higgsfield could not finish this one.");return}f(I.status==="in_progress"?"The paint is moving.":"Waiting in the queue.")}catch(w){h(w.message);return}if(Date.now()-M>900*1e3){h("This is taking too long, so I stopped watching. Check your Higgsfield console.");return}}}return{async open(T,x){if(r=T,a=x,s=wy(r),t.classList.add("on"),!ko){c();return}try{(await(await fetch(`${ko}/status`)).json()).ready?u():c()}catch{c()}}}}var jd=Symbol("stop"),_e=(n,t)=>n+Math.random()*(t-n),oi=(n,t)=>Math.floor(_e(n,t+1)),Ki=n=>n[Math.floor(Math.random()*n.length)],eh=(n,t)=>t?eh(t,n%t):n;function ks(n,t){let e=[];for(let i=0;i<=n;i++)e.push(t(i/n));return e}var Ty={rose:(n,t)=>{let e=oi(2,7),i=e%2?Math.PI:st,s=_e(0,st);return ks(520,r=>{let a=r*i+s,o=t*Math.cos(e*(a-s));return[n[0]+Math.cos(a)*o,n[1]+Math.sin(a)*o]})},gears:(n,t)=>{let e=oi(5,13),i=oi(2,e-1),s=_e(.5,1.2),r=i/eh(e,i),a=t/(e-i+i*s);return ks(900,o=>{let l=o*r*st,c=(e-i)/i*l;return[n[0]+a*((e-i)*Math.cos(l)+i*s*Math.cos(c)),n[1]+a*((e-i)*Math.sin(l)-i*s*Math.sin(c))]})},lissajous:(n,t,e,i)=>{let s=Ki([[3,2],[5,4],[3,4],[5,6],[7,6],[2,5]]),r=_e(0,st),a=Math.min(e*.44,t*1.5),o=Math.min(i*.44,t*1.1);return ks(760,l=>[n[0]+a*Math.sin(s[0]*l*st+r),n[1]+o*Math.sin(s[1]*l*st)])},spiral:(n,t)=>{let e=_e(3,8),i=Math.random()<.5?1:-1,s=_e(0,st);return ks(620,r=>{let a=s+i*r*e*st,o=t*r;return[n[0]+Math.cos(a)*o,n[1]+Math.sin(a)*o]})},star:(n,t)=>{let e=Ki([5,7,8,9,11,12]),i=oi(2,Math.floor((e-1)/2));for(;eh(e,i)!==1;)i--;let s=_e(0,st),r=[];for(let a=0;a<=e;a++){let o=s+a*i/e*st,l=s+(a+1)*i/e*st;if(a<e)for(let c=0;c<30;c++){let u=c/30;r.push([n[0]+t*(Math.cos(o)*(1-u)+Math.cos(l)*u),n[1]+t*(Math.sin(o)*(1-u)+Math.sin(l)*u)])}}return r},rings:(n,t)=>{let e=oi(3,6),i=[];for(let s=1;s<=e;s++){let r=t*s/e;for(let a=0;a<=110;a++){let o=a/110*st;i.push([n[0]+Math.cos(o)*r,n[1]+Math.sin(o)*r])}}return i},flow:(n,t,e,i)=>{let s=De(oi(1,9999)),r=[],a=_e(e*.15,e*.85),o=_e(i*.15,i*.85),l=_e(0,st),c=Math.max(e,i)/260;for(let u=0;u<560;u++)l+=(s(a*.006,o*.006)-.5)*.9,a+=Math.cos(l)*c,o+=Math.sin(l)*c,(a<e*.05||a>e*.95)&&(l=Math.PI-l),(o<i*.05||o>i*.95)&&(l=-l),r.push([a,o]);return r},wave:(n,t,e,i)=>{let s=_e(1.5,5),r=_e(i*.25,i*.75),a=_e(i*.08,i*.28),o=Math.random()<.5;return ks(420,l=>{let c=o?l:1-l;return[e*(.04+.92*c),r+Math.sin(l*s*st)*a]})},fling:(n,t,e,i)=>{let s=[],r=_e(e*.1,e*.9),a=_e(i*.1,i*.9),o=_e(0,st),l=_e(-.1,.1);for(let c=0;c<300;c++)l+=_e(-.02,.02),l=Math.max(-.16,Math.min(.16,l)),o+=l,r+=Math.cos(o)*12,a+=Math.sin(o)*12,(r<0||r>e)&&(o=Math.PI-o),(a<0||a>i)&&(o=-o),s.push([r,a]);return s}},Ey=["rose","gears","lissajous","spiral","star","rings","flow","wave"];function tf(n,{id:t,timbre:e,onChange:i}){let s=n.driver,r=0,a=!1,o=null,l=!1,c=(d,p)=>{o&&(o.style.opacity=1,o.style.left=`${d/f.W*100}%`,o.style.top=`${p/f.H*100}%`)},u=(d,p)=>({x:d,y:p,pressure:.5,button:0,type:"auto"}),f={W:s?.s.W||0,H:s?.s.H||0,ctx:n,rand:_e,int:oi,pickOne:Ki,chance:d=>Math.random()<d,live(d){if(d!==r)throw jd},async wait(d){let p=r;await new Promise(T=>setTimeout(T,d)),f.live(p)},async stroke(d,{ms:p=3e3}={}){let T=r,x=s.h,m=performance.now();pn.start(e),l=!0,x.down?.(u(...d[0])),c(...d[0]);let M=d[0],y=m;for(;;){await new Promise(g=>requestAnimationFrame(g)),f.live(T);let w=performance.now(),I=Math.min(1,(w-m)/p),L=d[Math.min(d.length-1,Math.floor(I*(d.length-1)))];if(x.move?.(u(L[0],L[1])),c(L[0],L[1]),pn.move(Math.hypot(L[0]-M[0],L[1]-M[1])/Math.max(1,w-y)),M=L,y=w,I>=1)break}l=!1,pn.end(),x.up?.(u(...M))},async hold(d,p,T){let x=r,m=s.h;pn.start(e),l=!0,m.down?.(u(d,p)),c(d,p),await f.wait(T),f.live(x),l=!1,pn.end(),m.up?.(u(d,p))},async tap(d,p){s.h.down?.(u(d,p)),c(d,p),await f.wait(70),s.h.up?.(u(d,p))},path(d,{size:p=.43,at:T}={}){let{W:x,H:m}=f,M=Math.min(x,m)*p,y=T||[x/2+_e(-.06,.06)*x,m/2+_e(-.06,.06)*m];return Ty[d||Ki(Ey)](y,M,x,m)},line:(d,p,T,x,m=60)=>ks(m,M=>[d+(T-d)*M,p+(x-p)*M]),sweep(d=12){let p=[];for(let T=0;T<d;T++){let x=f.H*((T+.5)/d),m=T%2===0;for(let M=0;M<=40;M++)p.push([f.W*(m?M/40:1-M/40),x])}return p},button(d){let p=d.toLowerCase();return[...n.dock.querySelectorAll("button")].find(T=>T.textContent.trim().toLowerCase()===p)},press(d){f.button(d)?.click()},toggle(d,p){let T=f.button(d);T&&T.classList.contains("on")!==p&&T.click()},colour(){let d=[...n.dock.querySelectorAll(".sw button")];d.length&&Ki(d).click()},set(d,p){let x=[...n.dock.querySelectorAll("label.ctl")].find(m=>m.textContent.trim().toLowerCase()===d.toLowerCase())?.querySelector("input");x&&(x.value=p,x.dispatchEvent(new Event("input",{bubbles:!0})))},async slide(d,p,T,x){let m=r,M=performance.now();for(;;){await new Promise(w=>setTimeout(w,40)),f.live(m);let y=Math.min(1,(performance.now()-M)/x);if(f.set(d,p+(T-p)*y),y>=1)break}},choose(d){let p=f.button(d)?.closest(".seg");if(p){Ki([...p.querySelectorAll("button")]).click();return}let T=[...n.dock.querySelectorAll("select")].find(x=>[...x.options].some(m=>m.textContent===d));T&&(T.selectedIndex=oi(0,T.options.length-1),T.dispatchEvent(new Event("change",{bubbles:!0})))},shuffle({skip:d=[]}={}){let p=d.map(T=>T.toLowerCase());n.dock.querySelectorAll(".seg").forEach(T=>{let x=[...T.querySelectorAll("button")];x.some(m=>p.includes(m.textContent.trim().toLowerCase()))||Ki(x).click()}),n.dock.querySelectorAll("select").forEach(T=>{T.selectedIndex=oi(0,T.options.length-1),T.dispatchEvent(new Event("change",{bubbles:!0}))}),n.dock.querySelectorAll("label.ctl").forEach(T=>{if(p.includes(T.textContent.trim().toLowerCase()))return;let x=T.querySelector("input");x.value=_e(+x.min+(x.max-x.min)*.15,+x.max-(x.max-x.min)*.15),x.dispatchEvent(new Event("input",{bubbles:!0}))})},clear(){n.clear?.()}},h=async d=>{try{await d(f)}catch(p){if(p!==jd)throw p}};return{available:!!s,get running(){return a},start(){a||!s||(a=!0,r++,o=document.createElement("div"),o.className="ghost",s.s.el.appendChild(o),n.dismissTip(),i(!0),h(Ay[t]||Bo()))},stop(){a&&(a=!1,r++,l&&(l=!1,pn.end(),s.h.up?.(u(f.W/2,f.H/2))),o?.remove(),o=null,i(!1))}}}function Bo({kinds:n=null,ms:t=[2600,5200],rest:e=[150,700],admire:i=3800,strokes:s=[5,10],skip:r=[],size:a}={}){return async o=>{for(;;){o.shuffle({skip:r});let l=o.int(...s);for(let c=0;c<l;c++)o.colour(),await o.stroke(o.path(n&&o.pickOne(n),{size:a}),{ms:o.rand(...t)}),await o.wait(o.rand(...e));await o.wait(i),o.clear(),await o.wait(500)}}}var Ay={"drip-feed":async n=>{for(;;){n.shuffle();let t=n.int(7,13);for(let e=0;e<t;e++)n.colour(),await n.stroke(n.path("fling"),{ms:n.rand(1100,2400)}),n.chance(.35)&&await n.hold(n.rand(.15,.85)*n.W,n.rand(.15,.7)*n.H,n.rand(500,1300));await n.wait(4500),n.clear()}},"golden-repair":async n=>{for(;;)n.choose("Tenmoku"),n.choose("Gold"),await n.wait(1400),await n.tap(n.W/2+n.rand(-90,90),n.H/2+n.rand(-90,90)),await n.wait(1300),await n.tap(n.W/2+n.rand(-160,160),n.H/2+n.rand(-160,160)),await n.wait(2600),n.press("Gather all"),await n.wait(10500),n.press("New bowl"),await n.wait(600)},sediment:async n=>{for(;;){n.press("Pour"),n.choose("Flask"),n.set("Tilt",0),await n.wait(400);let t=n.int(10,15);for(let e=0;e<t;e++){if(n.colour(),await n.hold(n.W/2+n.rand(-30,30),n.H*.1,n.rand(2200,4200)),n.chance(.45)){await n.wait(1200),n.press("Poke");for(let i=n.int(2,4);i>0;i--){let s=n.rand(.2,.8)*n.W;await n.stroke(n.line(s,n.H*.45,s+n.rand(-14,14),n.H*.93,40),{ms:900})}n.press("Pour")}n.chance(.25)?n.set("Tilt",n.rand(-60,60)):n.chance(.5)&&n.set("Tilt",0)}n.set("Tilt",0),await n.wait(2500),n.press("Cork"),await n.wait(4500),n.clear()}},endpaper:async n=>{for(;;){n.choose("Harbour"),n.press("Drop");for(let e=n.int(16,28);e>0;e--)n.colour(),n.set("Size",n.rand(22,85)),await n.tap(n.rand(.05,.95)*n.W,n.rand(.05,.95)*n.H),await n.wait(200);await n.wait(600),n.press("Rake"),n.set("Tines",n.int(7,22));let t=n.chance(.5);for(let e=n.int(2,4);e>0;e--){let i=n.rand(.2,.8),s=e%2===0,r=t?n.line(s?n.W:0,n.H*i,s?0:n.W,n.H*i,90):n.line(n.W*i,s?n.H:0,n.W*i,s?0:n.H,90);await n.stroke(r,{ms:2100})}n.chance(.55)&&(n.press("Swirl"),await n.stroke(n.path("spiral",{size:.3}),{ms:3e3})),await n.wait(1400),n.press("Lay the paper"),await n.wait(7500),n.clear()}},"steamed-up":async n=>{for(;;){n.choose("Night"),n.set("Finger",n.rand(16,40)),n.set("Fog returns",.4);for(let t=n.int(3,6);t>0;t--)await n.stroke(n.path(n.pickOne(["rose","star","wave","spiral","lissajous"])),{ms:n.rand(3200,5400)}),await n.wait(800);await n.wait(4500),n.press("Breathe"),await n.wait(1500),n.press("Breathe"),await n.wait(1500),n.clear()}},"wallpaper-group":async n=>{for(;;){n.press("Paper"),n.set("Tile",n.rand(120,260)),n.set("Pen",n.rand(2,9));for(let t=n.int(4,7);t>0;t--)n.colour(),await n.stroke(n.path(n.pickOne(["rose","star","wave","flow"]),{size:.16}),{ms:n.rand(1800,3200)});for(let t=0;t<5;t++)n.choose("Tile"),await n.wait(2100);n.clear()}},"right-angles":async n=>{for(;;){n.press("Compose for me"),await n.wait(1e3);for(let t=n.int(3,6);t>0;t--)n.colour(),await n.tap(n.rand(.05,.95)*n.W,n.rand(.05,.95)*n.H),await n.wait(380);n.press("Boogie"),await n.wait(12e3),n.press("Stop"),await n.wait(400)}},"dont-lift":async n=>{for(;;){n.press("New sheet"),n.colour(),n.set("Nib",n.rand(1.5,4)),await n.wait(500);let t=n.rand(7e3,11e3);await n.stroke(n.path(n.pickOne(["gears","flow","lissajous","rose"])),{ms:t}),await n.wait(t+3500)}},"twin-dials":async n=>{for(;;)n.choose("Phosphor"),n.press("Lissajous"),await n.wait(n.rand(13e3,19e3)),n.press("Lissajous"),await n.wait(1800),n.press("Shake"),await n.wait(900),n.press("Shake"),await n.wait(1100),n.clear()},raked:async n=>{for(;;){n.choose("Pale"),n.press("Stone");for(let t=n.int(1,4);t>0;t--)await n.tap(n.rand(.15,.85)*n.W,n.rand(.2,.75)*n.H),await n.wait(500);n.press("Rake"),n.set("Tines",n.int(3,8)),n.set("Spacing",n.rand(11,20));for(let t=n.int(3,5);t>0;t--)await n.stroke(n.path(n.pickOne(["wave","spiral","flow","lissajous"])),{ms:n.rand(4500,7e3)});await n.slide("Sun",8,92,9e3),await n.wait(1500),n.clear()}},squint:async n=>{for(;;)n.choose("Free"),n.colour(),n.set("Dot",n.rand(3,7)),n.set("Space",n.rand(10,18)),n.set("Mix",n.rand(20,60)),await n.stroke(n.sweep(n.int(9,14)),{ms:15e3}),await n.wait(1e3),n.toggle("Squint",!0),await n.wait(3800),n.toggle("Squint",!1),await n.wait(1600),n.clear()},"highly-strung":async n=>{for(;;){n.colour(),n.choose("Midnight"),n.set("Pins",n.int(90,280));let t=n.rand(2,6);await n.slide("Times",t,t+n.rand(4,26),15e3),await n.stroke(n.line(n.W*.02,n.rand(.2,.8)*n.H,n.W*.98,n.rand(.2,.8)*n.H,80),{ms:1700}),await n.wait(2200)}},"low-res":async n=>{n.toggle("Mirror",!0),n.press("Pen");let t=32;for(;;){n.choose("Classic");let e=[];for(let s=n.int(7,12);s>0;s--){let r=[],a=n.int(5,15),o=n.int(6,26);for(let l=n.int(4,14);l>0;l--)a+=n.int(-1,1),o+=n.int(-1,1),r.push([a,o]);e.push({pts:r,swatch:n.int(0,14)})}let i=[...n.ctx.dock.querySelectorAll(".sw button")];for(let s=1;s<=4;s++){n.ctx.dock.querySelector(`[aria-label="Frame ${s}"]`)?.click(),n.clear();let r=()=>n.int(-1,1)*(s%2);for(let a of e){i[a.swatch]?.click();let o=r(),l=r();await n.stroke(a.pts.map(([c,u])=>[(c+o+.5)/t*n.W,(u+l+.5)/t*n.H]),{ms:260})}}n.press("Play"),await n.wait(6500),n.press("Stop")}},"spin-cycle":async n=>{for(;;){n.set("Throttle",n.rand(45,98)),await n.wait(1800);for(let t=n.int(6,11);t>0;t--){n.colour();let e=n.rand(0,Math.PI*2),i=n.rand(.04,.3)*Math.min(n.W,n.H);await n.hold(n.W/2+Math.cos(e)*i,n.H/2+Math.sin(e)*i,n.rand(400,1200)),await n.wait(n.rand(100,500))}await n.wait(1500),n.toggle("Brake",!0),await n.wait(4200),n.toggle("Brake",!1),n.press("New card")}},"wet-on-wet":async n=>{for(;;){n.press("Ink"),n.choose("Sumi"),n.set("Damp",n.rand(8,22)),n.clear();for(let t=n.int(4,7);t>0;t--)n.set("Brush",n.rand(12,46)),n.set("Load",n.rand(40,100)),await n.stroke(n.path(n.pickOne(["flow","wave","rose","spiral"])),{ms:n.rand(2600,4800)}),await n.wait(n.rand(1600,3400));await n.wait(6e3)}},"fold-here":async n=>{for(;;){for(let t=n.int(1,2);t>0;t--){n.colour();for(let e=n.int(4,8);e>0;e--){n.set("Brush",n.rand(10,42));let i=n.rand(.1,.46)*n.W,s=n.rand(.1,.9)*n.H;await n.stroke(n.line(i,s,i+n.rand(-90,70),s+n.rand(-90,90),26),{ms:n.rand(350,800)})}await n.wait(400),n.press("Fold and press"),await n.wait(4600)}await n.wait(3400),n.clear()}},leadlight:async n=>{let t=async()=>{n.press("Glaze");for(let e=n.int(18,30);e>0;e--)n.colour(),await n.tap(n.rand(.32,.68)*n.W,n.rand(.1,.72)*n.H),await n.wait(220)};for(;;){await t(),await n.slide("Sun",5,95,8e3),await n.wait(800),n.clear(),n.press("Lead");for(let e=n.int(7,11);e>0;e--)await n.stroke(n.line(n.W*n.rand(.3,.5),n.H*n.rand(.05,.75),n.W*n.rand(.5,.7),n.H*n.rand(.05,.75),40),{ms:650})}},"slow-growth":async n=>{for(;;){n.choose("Coral"),n.choose("Lagoon"),n.set("Clock",20),n.set("Seed",n.rand(10,26));for(let t=n.int(2,4);t>0;t--)await n.stroke(n.path(n.pickOne(["rose","star","spiral","rings"]),{size:.26}),{ms:2200});await n.wait(15e3),n.choose("Coral"),await n.wait(11e3),n.clear()}},"hall-of-mirrors":async n=>{for(;;){n.choose("Neon"),n.set("Mirrors",n.int(5,14)),n.set("Width",n.rand(1,2.6)),n.set("Turn",n.rand(-30,30)),n.toggle("Glow",n.chance(.6));for(let t=n.int(4,7);t>0;t--){let e=n.path(n.pickOne(["rose","gears","spiral","flow"])),i=n.int(0,Math.floor(e.length*.65));await n.stroke(e.slice(i,i+Math.floor(e.length*.28)),{ms:n.rand(1800,3200)}),await n.wait(n.rand(200,700))}await n.wait(5e3),n.clear(),await n.wait(500)}},wordsmear:Bo({kinds:["spiral","wave","rose","flow"],ms:[4500,8e3],strokes:[3,6]}),"word-wheel":Bo({kinds:["wave","flow","rose"],ms:[3e3,4500],strokes:[2,3],size:.3,skip:["Letters"]}),"long-exposure":Bo({ms:[2800,5e3],strokes:[4,7],admire:5e3})};var zo="data:image/png;base64,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";var Nr=n=>{let t=document.createElement("template");return t.innerHTML=n.trim(),t.content.firstChild},Dn={back:'<svg viewBox="0 0 24 24"><path d="M15 5l-7 7 7 7"/></svg>',undo:'<svg viewBox="0 0 24 24"><path d="M9 7L4 12l5 5M4 12h11a5 5 0 010 10h-2"/></svg>',clear:'<svg viewBox="0 0 24 24"><path d="M5 7h14M10 7V4h4v3M7 7l1 13h8l1-13"/></svg>',save:'<svg viewBox="0 0 24 24"><path d="M12 4v11M7 11l5 5 5-5M5 20h14"/></svg>',hang:'<svg viewBox="0 0 24 24"><path d="M12 3v4M12 7L5 12M12 7l7 5M4 12h16v9H4z"/></svg>',spark:'<svg viewBox="0 0 24 24"><path d="M12 3l1.8 6.2L20 11l-6.2 1.8L12 19l-1.8-6.2L4 11l6.2-1.8zM19 17l.7 2.3L22 20l-2.3.7L19 23l-.7-2.3L16 20l2.3-.7z"/></svg>',grid:'<svg viewBox="0 0 24 24"><path d="M4 4h6v6H4zM14 4h6v6h-6zM4 14h6v6H4zM14 14h6v6h-6z"/></svg>',auto:'<svg viewBox="0 0 24 24"><path d="M4 20c3-1 4-3 5-5l3 3c-2 1-4 2-8 2zM10 13l8-9 3 3-9 8z"/></svg>',moon:'<svg viewBox="0 0 24 24"><path d="M20 14A8 8 0 1110 4a7 7 0 0010 10z"/></svg>',sound:'<svg viewBox="0 0 24 24"><path d="M4 9v6h4l5 4V5L8 9zM16 9a4 4 0 010 6M18.500 6.500a8 8 0 010 11"/></svg>',silent:'<svg viewBox="0 0 24 24"><path d="M4 9v6h4l5 4V5L8 9zM17 9.500l4 5M21 9.500l-4 5"/></svg>'},Wo=document.getElementById("app");document.title=Yn.name;var Lr={get(n){try{return localStorage.getItem(n)}catch{return null}},set(n,t){try{return localStorage.setItem(n,t),!0}catch{return!1}},del(n){try{localStorage.removeItem(n)}catch{}}},ih=n=>`mym.pressing.${n}`,cf=`<a class="maker" href="${$n.url}" target="_blank" rel="noopener" aria-label="Made by ${$n.name}"><img src="${zo}" alt="${$n.name} logo"><span>Made by<br><b>${$n.name}</b></span></a>`,nn=Nr(`<section class="shelf" aria-label="${Yn.name} rack">
  <div class="shelf__grain"></div>
  <header class="top">
    <h1 class="brand" style="margin:0;font-weight:400">${Yn.name}</h1>
    <div class="top__right">
      <button class="round" data-act="cat" aria-label="See the whole collection">${Dn.grid}<span class="lbl">Collection</span></button>
      <button class="round" data-act="sound" aria-label="Sound on or off"></button>
      <button class="round" data-act="theme" aria-label="Switch between dark and light">${Dn.moon}</button>
    </div>
  </header>
  <div class="credit" aria-live="polite">
    <div class="credit__n"><b class="n"></b> / ${String(Qe.length).padStart(2,"0")} &nbsp; <span class="c"></span></div>
    <h2 class="credit__t"></h2>
    <p class="credit__s"></p>
    <button class="credit__play">Pick up the brush \u2197</button>
  </div>
  ${cf}
  <div class="hint">Scroll the rack \xB7 Drag to turn \xB7 Click to paint</div>
  <nav class="ticks" aria-label="Jump to a canvas"></nav>
  <div class="pill"></div>
</section>`);Wo.appendChild(nn);{let n=Ct(220,220),t=n.getContext("2d"),e=Ie(4),i=t.createImageData(220,220);for(let s=0;s<i.data.length;s+=4){let r=e()*255;i.data[s]=i.data[s+1]=i.data[s+2]=r,i.data[s+3]=255}t.putImageData(i,0,0),nn.querySelector(".shelf__grain").style.backgroundImage=`url(${n.toDataURL()})`}var Ci=Nr(`<section class="cat" aria-label="Collection" aria-hidden="true">
  <div class="cat__head"><div class="brand">The collection</div><button class="round" data-act="catclose">Close</button></div>
  <div class="cat__grid"></div><div class="cat__foot">${cf}</div></section>`);Wo.appendChild(Ci);var Ge=Nr(`<section class="toy" aria-hidden="true">
  <div class="toy__stage"></div>
  <div class="toy__bar">
    <button class="round" data-act="back" aria-label="Back to the rack">${Dn.back}<span class="lbl">Rack</span></button>
    <div class="toy__title"><b></b><span></span></div>
    <a class="toy__maker" href="${$n.url}" target="_blank" rel="noopener" aria-label="Made by ${$n.name}" title="Made by ${$n.name}"><img src="${zo}" alt="${$n.name} logo"></a>
    <div class="toy__spacer"></div>
    <button class="round" data-act="auto" title="Let it paint itself. Touch the canvas to take over.">${Dn.auto}<span class="lbl">Auto</span></button>
    <button class="round" data-act="sound" aria-label="Sound on or off"></button>
    <button class="round" data-act="undo" aria-label="Undo">${Dn.undo}</button>
    <button class="round" data-act="clear" aria-label="Start again">${Dn.clear}</button>
    <button class="round" data-act="save" aria-label="Save as PNG">${Dn.save}</button>
    <button class="round" data-act="alive" title="Turn your painting into a short video">${Dn.spark}<span class="lbl">Bring to life</span></button>
    <button class="round primary" data-act="hang" title="Hang your painting on the rack">${Dn.hang}<span class="lbl">Hang it</span></button>
  </div>
  <div class="tip off"></div>
  <div class="dock" role="toolbar" aria-label="Toy controls"></div>
  <div class="toast" role="status"></div>
</section>`);Wo.appendChild(Ge);var ef=Ge.querySelector(".toy__stage"),nf=Ge.querySelector(".dock"),Ry=Ge.querySelector(".tip"),nh=Ge.querySelector(".toast"),sf=0,Vo=n=>{nh.textContent=n,nh.classList.add("on"),clearTimeout(sf),sf=setTimeout(()=>nh.classList.remove("on"),2400)},Iy=location.protocol==="file:"||["localhost","127.0.0.1"].includes(location.hostname);Iy||(Ge.querySelector("[data-act=alive]").style.display="none");var qo=Yd(nn),Ho=Kd(Wo),Py=Qd(Ge);function hf(){document.querySelectorAll("[data-act=sound]").forEach(n=>{n.innerHTML=Fr()?Dn.silent:Dn.sound,n.setAttribute("aria-pressed",String(!Fr()))})}hf();var Ly=nn.querySelector(".credit .n"),Ny=nn.querySelector(".credit .c"),Dy=nn.querySelector(".credit__t"),Uy=nn.querySelector(".credit__s"),uf=nn.querySelector(".ticks");Qe.forEach((n,t)=>{let e=Nr(`<button aria-label="${n.title.replace(/"/g,"")}"><i></i></button>`);e.onclick=()=>ve?.goTo(t),uf.appendChild(e)});function rf(n){Ly.textContent=String(n.index+1).padStart(2,"0"),Ny.textContent=n.cat,Dy.textContent=n.title,Uy.textContent=n.blurb,[...uf.children].forEach((t,e)=>t.classList.toggle("on",e===n.index)),document.documentElement.style.setProperty("--accent",n.accent),qo.tint(n.glow)}var Go=nn.querySelector(".pill");function df(n){if(!n){Go.classList.remove("on");return}Go.textContent=n.label,Go.style.transform=`translate(${n.x+16}px, ${n.y+14}px)`,Go.classList.add("on")}var ff=Xd(),ve=null;async function Oy(n){let t=Lr.get(ih(n));if(!t)return;let e=new Image;e.src=t;try{await e.decode(),ve?.setPressing(n,e)}catch{Lr.del(ih(n))}}var en=null,Un=null,Ri=null,Bs=!1,af=Ge.querySelector("[data-act=auto]");function pf(n){ef.replaceChildren(),nf.replaceChildren(),Ge.querySelector(".toy__title b").textContent=n.title,Ge.querySelector(".toy__title span").textContent=`${n.cat} \xB7 ${n.genre}`;let t=Eh({stage:ef,dock:nf,tipEl:Ry,toast:Vo,timbre:n.timbre});n.mount(t,n),Ge.querySelector("[data-act=undo]").style.display=t.undo?"":"none",Un=t,Ri=tf(t,{id:n.id,timbre:n.timbre,onChange:e=>af.classList.toggle("on",e)}),t.onTouch=()=>Ri.stop(),af.style.display=Ri.available?"":"none"}async function Fy(n){if(Bs||en===n)return;Bs=!0,en=n,df(null),document.title=`${n.title} \xB7 ${Yn.name}`,ve&&ve.focused?.index!==n.index&&ve.jump(n.index),document.documentElement.style.setProperty("--accent",n.accent),pf(n),qt("swish");let t,e=new Promise(s=>{t=s}),i=()=>Ho.cover(n.accent).then(t);ve?await ve.open(n,i):i(),await e,Ge.classList.add("on"),Ge.setAttribute("aria-hidden","false"),nn.style.visibility="hidden",ve?.pause(),qo.pause(),Ws(n.bed),await Ho.reveal(),Bs=!1,location.hash!==`#/${n.id}`&&Xo()}async function ky(){if(Bs||!en)return;Bs=!0;let n=en;qt("back"),await Ho.cover(n.accent),Ri?.stop(),Un?.destroy(),Un=null,Jo(),Ge.classList.remove("on"),Ge.setAttribute("aria-hidden","true"),nn.style.visibility="",ve?.resume(),qo.resume(),Ws("studio"),document.title=Yn.name,en=null;let t=ve?.close();await Ho.reveal(),await t,Bs=!1,Xo()}function Xo(){let n=location.hash.replace(/^#\/?/,""),t=Qe.find(e=>e.id===n);t?t!==en&&(en?By(t):Fy(t)):en&&ky()}function By(n){Ri?.stop(),Un?.destroy(),Jo(),en=n,pf(n),Ws(n.bed)}addEventListener("hashchange",Xo);Ge.addEventListener("click",n=>{let t=n.target.closest("[data-act]")?.dataset.act;if(!(!t||!Un)){if(t==="back"&&(location.hash="#/"),t==="auto"&&(Ri.running?Ri.stop():(Ri.start(),Vo("Painting by itself. Touch the canvas to take over."))),t==="undo"&&Un.undo?.(),t==="clear"&&Un.clear?.(),t==="alive"){let e=Un.snapshot?.();e&&Py.open(e,en.title)}if(t==="save"){let e=Un.snapshot?.();if(!e)return;let i=document.createElement("a");i.download=`${en.id}.png`,i.href=e.toDataURL("image/png"),i.click(),Vo("Saved as a PNG")}if(t==="hang"){let e=Un.snapshot?.();if(!e)return;let i=640,s=Ct(i,i),r=s.getContext("2d"),a=Math.max(i/e.width,i/e.height);r.fillStyle="#111",r.fillRect(0,0,i,i),r.drawImage(e,(i-e.width*a)/2,(i-e.height*a)/2,e.width*a,e.height*a);let o=Lr.set(ih(en.id),s.toDataURL("image/jpeg",.82));ve?.setPressing(en.id,s),qt("hang"),Vo(o?"Hung on the rack. It takes this canvas's place.":"Hung for this visit (browser storage is full)")}}});nn.addEventListener("click",n=>{let t=n.target.closest("[data-act]")?.dataset.act;if(t==="theme"){let e=document.documentElement,i=e.dataset.theme==="dark"?"light":"dark";e.dataset.theme=i,Lr.set("mym.theme",i)}t==="cat"&&mf()});nn.querySelector(".credit__play").onclick=()=>{ve?.focused&&(location.hash=`#/${ve.focused.id}`)};Ci.addEventListener("click",n=>{let t=n.target.closest("[data-id]");n.target.closest("[data-act=catclose]")&&sh(),t&&(sh(),ve?.jump(Qe.findIndex(e=>e.id===t.dataset.id)),location.hash=`#/${t.dataset.id}`)});function mf(){let n=Ci.querySelector(".cat__grid");n.children.length||Qe.forEach((t,e)=>{let i=Nr(`<button class="cat__item" data-id="${t.id}"><b>${t.title}</b><span>${t.cat}</span></button>`),s=Ct(360,360);ve?s.getContext("2d").drawImage(ve.coverCanvas(e),0,0,360,360):Do(t,s),i.prepend(s),n.appendChild(i)}),Ci.classList.add("on"),Ci.setAttribute("aria-hidden","false")}function sh(){ff&&(Ci.classList.remove("on"),Ci.setAttribute("aria-hidden","true"))}addEventListener("pointerdown",Ko,{capture:!0});addEventListener("keydown",Ko,{capture:!0});addEventListener("click",n=>{let t=n.target.closest?.("button, a.btn");if(t){if(t.dataset.act==="sound"){bh(!Fr()),hf(),qt("on");return}t.getAttribute("aria-pressed")!==null?qt(t.getAttribute("aria-pressed")==="true"?"off":"on"):t.closest(".sw")?qt("pop"):t.closest(".seg")?qt("tock"):qt("click")}},!0);var of=0;addEventListener("input",n=>{if(n.target.type!=="range")return;let t=performance.now();t-of>45&&(of=t,qt("slide"))},!0);addEventListener("pointerover",n=>{let t=n.target.closest?.("button");n.pointerType==="mouse"&&t&&!t.contains(n.relatedTarget)&&qt("hover")},!0);addEventListener("keydown",n=>{if(!n.target.matches?.("input, textarea")){if(en){n.key==="Escape"&&(location.hash="#/"),(n.ctrlKey||n.metaKey)&&n.key==="z"&&(n.preventDefault(),Un?.undo?.());return}n.key==="Escape"&&sh(),!(!ve||Ci.classList.contains("on"))&&((n.key==="ArrowDown"||n.key==="ArrowRight"||n.key==="j")&&(n.preventDefault(),ve.next()),(n.key==="ArrowUp"||n.key==="ArrowLeft"||n.key==="k")&&(n.preventDefault(),ve.prev()),n.key==="f"&&ve.flip(),n.key==="Enter"&&n.target===document.body&&(location.hash=`#/${ve.focused.id}`))}});var lf=Lr.get("mym.theme");lf&&(document.documentElement.dataset.theme=lf);var zy=["400 40px Fraunces","600 40px Fraunces","italic 400 40px Fraunces",'400 40px "DM Mono"','500 40px "DM Mono"',"400 40px Anton",'400 40px "Instrument Serif"','italic 400 40px "Instrument Serif"',"600 40px Caveat","700 40px Unbounded","400 40px VT323",'500 40px "Space Grotesk"','700 40px "Space Grotesk"'],rh=new Image;rh.src=zo;Ws("studio");Promise.all([...zy.map(n=>document.fonts.load(n)),rh.decode().then(()=>Gd(rh))]).catch(()=>{}).then(()=>{ff?(ve=qd({mount:nn,onFocus:rf,onHover:df,onPointer:(n,t)=>qo.pointer(n,t),onOpenRequest:n=>{location.hash=`#/${n.id}`}}),Qe.forEach(n=>Oy(n.id))):(rf(Qe[0]),mf()),Xo()});})();
/*! Bundled license information:

three/build/three.core.js:
three/build/three.module.js:
  (**
   * @license
   * Copyright 2010-2026 Three.js Authors
   * SPDX-License-Identifier: MIT
   *)
*/
