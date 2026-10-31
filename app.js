const $=(s,r=document)=>r.querySelector(s),$$=(s,r=document)=>[...r.querySelectorAll(s)],app=$('#app'),RM=matchMedia('(prefers-reduced-motion:reduce)').matches;
const sp=(t,d=0)=>t.split(' ').map((w,k)=>`<span class="w">${[...w].map((c,i)=>`<span style="--i:${i+k*3};--d:${d}ms">${c}</span>`).join('')}</span>`).join(' ');
const cmp=new Set(),all=B.flatMap(b=>b.props.map(p=>({k:b.id+'/'+p.id,b,p,l:b.props.length>1?b.name.split(' ')[0]+': '+p.name:b.name})));
const I=b=>IMG[b.id],PI=(b,p)=>I(b).p[p.id]||[],sq=a=>[...a.filter(x=>!x.lo),...a.filter(x=>x.lo)];
const lum=h=>{const c=[1,3,5].map(i=>{const v=parseInt(h.substr(i,2),16)/255;return v<=.03928?v/12.92:Math.pow((v+.055)/1.055,2.4)});return .2126*c[0]+.7152*c[1]+.0722*c[2]};
const acc=b=>lum(b.pal[2])>.12?b.pal[2]:b.pal[3],pal=b=>`--a:${acc(b)};--ca:${acc(b)}`;
const pend='<span class="pend">Figures pending verification</span>',tg=x=>x&&x.v?x.v+(x.t?`<span class="tag" title="${TAGS[x.t]}">${x.t}</span>`:''):pend;
const LBL={};let lbk='',lbi=0,clean=()=>{},cur={},booted=false;
const fig=(k,i,im,cls='')=>`<figure class="ri ${cls}" data-act="lb" data-k="${k}" data-i="${i}"><img src="${im.s}" alt="${im.c}" loading="lazy" style="object-position:${im.fx||'50% 50%'}"><figcaption>${im.c}</figcaption></figure>`;
const slotEl=l=>`<div class="slot">Photo to be added<br>${l}</div>`;
const sec=(id,t,h,b)=>`<section class="sec" id="${id}"><div class="sh2 rv"><small>${t}</small><h2>${h}</h2></div>${b}</section>`;
const ul=a=>`<ul class="pl">${a.map(x=>`<li>${x}</li>`).join('')}</ul>`;
/* ---------- router ---------- */
function route(){clean();clean=()=>{};const[p,id,pid]=(location.hash.slice(2)||'').split('/');
 $$('#links a').forEach(a=>a.classList.toggle('on',a.dataset.r===(p===''?'home':p==='b'||p==='portfolio'?'portfolio':p)));
 $('#links').classList.remove('open');document.body.classList.toggle('pj',p==='b');document.body.classList.remove('nh');scrollTo({top:0,behavior:'instant'});app.className='fade';app.removeAttribute('style');document.documentElement.style.setProperty('--ca','#c68642');
 ({'':()=>home(),portfolio:()=>home(),b:()=>project(id,pid),compare,invest,brief:briefPage}[p]||home)();obs();onScroll()}
function nav(){if(!booted)return;const v=$('#veil');v.className='in';setTimeout(()=>{route();v.className='out'},430)}
addEventListener('hashchange',nav);$('#mb').onclick=()=>$('#links').classList.toggle('open');
function obs(){const io=new IntersectionObserver(e=>e.forEach(x=>{if(x.isIntersecting){x.target.classList.add('in');if(x.target.dataset.to)cnt(x.target);io.unobserve(x.target)}}),{threshold:.12});$$('.rv,.ri,[data-to]').forEach(e=>io.observe(e))}
function cnt(el){const to=+el.dataset.to;if(RM){el.textContent=to;return}let n=0;const t=setInterval(()=>{el.textContent=++n;if(n>=to)clearInterval(t)},Math.max(40,900/to))}
let tk=0,ly=0;function onScroll(){if(tk)return;tk=requestAnimationFrame(()=>{tk=0;const y=scrollY;$('#nav').classList.toggle('s',y>80);document.body.classList.toggle('nh',document.body.classList.contains('pj')&&y>ly&&y>300);ly=y;$('#prog').style.width=(scrollY/Math.max(1,document.body.scrollHeight-innerHeight)*100)+'%';
 $$('[data-par]').forEach(e=>{const r=e.parentElement.getBoundingClientRect();if(r.bottom<-200||r.top>innerHeight+200)return;e.style.transform=`translate3d(0,${((r.top+r.height/2-innerHeight/2)*e.dataset.par*-1).toFixed(1)}px,0)`});
 const s=$$('#sub [data-t]');if(s.length){let a=null;s.forEach(b=>{const t=document.getElementById(b.dataset.t);if(t&&t.getBoundingClientRect().top<innerHeight*.4)a=b});s.forEach(b=>b.classList.toggle('on',b===a))}})}
addEventListener('scroll',onScroll,{passive:true});
/* ---------- HOME: curved 3D carousel ---------- */
function home(){app.innerHTML=`<section class="home"><div class="hh"><h1>${sp('Ideas Worth Exploring.',900)}<br><em>${sp('Businesses Worth Building.',1500)}</em></h1><p>Explore opportunities. Understand the investment. Compare the possibilities. Discover what could be built.</p></div>
<div class="stage" id="stage" tabindex="0" aria-label="Business carousel. Use arrow keys, drag or scroll."><div class="ring" id="ring">${B.map((b,i)=>`<article class="card" data-i="${i}"><img src="${I(b).card}" alt="${b.name}" draggable="false" style="object-position:${I(b).fx}"><div class="sh"></div><div class="dim"></div><div class="nm">${b.n}</div><div class="tt">${b.name}<small>EXPLORE ↗</small></div></article>`).join('')}</div></div>
<div class="info"><div class="dots" id="dots">${B.map((b,i)=>`<i data-i="${i}"></i>`).join('')}</div><div class="no" id="in"></div><h2 id="ih"></h2><p id="ip2"></p><div class="row"><button class="btn" id="pv" aria-label="Previous">←</button><button class="btn solid" id="go">Explore business →</button><button class="btn" id="cp">+ Compare</button><button class="btn" id="nx" aria-label="Next">→</button></div></div></section>`;
 const n=B.length,step=20,span=n*step,ring=$('#ring'),stage=$('#stage'),cards=$$('.card',ring),home=$('.home');let ang=-48,vel=0,dn=false,sx=0,sa=0,mv=0,lx=0,raf=0,snap=0,R=0,sel=-1,close=0;
 if(RM){ang=0;snap=0}
 const lay=()=>{const vw=innerWidth,cw=vw<700?Math.max(120,vw*.36):Math.min(260,Math.max(170,vw*.16)),h=Math.min(cw*1.65,stage.clientHeight*.8);R=cw*3.2;stage.style.perspective=cw*3.7+'px';ring.style.transform=`translateZ(${R*.8}px)`;cards.forEach(c=>{c.style.width=cw+'px';c.style.height=h+'px';c.style.marginLeft=-cw/2+'px';c.style.marginTop=-h/2+'px'});draw()};
 const info=i=>{const b=B[i];home.style.setProperty('--ca',acc(b));document.documentElement.style.setProperty('--ca',acc(b));$('#in').textContent=b.n+' / 0'+n;$('#ih').textContent=b.name;$('#ip2').textContent=b.short;$$('#dots i').forEach((d,j)=>d.classList.toggle('on',j===i));upC()};
 const upC=()=>{if(sel>=0)$('#cp').textContent=B[sel].props.every(p=>cmp.has(B[sel].id+'/'+p.id))?'✓ In comparison':'+ Compare'};
 function draw(){let best=0,bd=999;cards.forEach((c,i)=>{const e=((-i*step+ang+90)%span+span)%span-90,a=Math.abs(e);c.style.transform=`rotateY(${e}deg) translateZ(${-R}px)`;c.style.setProperty('--d',Math.min(.78,a/75*.72).toFixed(2));c.style.visibility=a>86?'hidden':'visible';if(a<bd){bd=a;best=i}});cards.forEach((c,i)=>c.classList.toggle('on',i===best&&bd<step/2));if(best!==sel){sel=best;info(best)}}
 const tick=()=>{if(!dn){if(Math.abs(vel)>.04&&snap===null){ang+=vel;vel*=.945}else{const t=snap??Math.round(ang/step)*step;ang+=(t-ang)*(RM?1:.1);if(Math.abs(t-ang)<.03){ang=t;snap=null;vel=0;draw();raf=0;return}}}draw();raf=requestAnimationFrame(tick)};
 const run=()=>{if(!raf)raf=requestAnimationFrame(tick)};
 const goTo=i=>{const cu=Math.round(ang/step),d=((i-cu)%n+n+Math.floor(n/2))%n-Math.floor(n/2);snap=(cu+d)*step;vel=0;run()};
 const mvH=e=>{if(!dn)return;const dx=e.clientX-lx;mv+=Math.abs(dx);vel=-dx*.09;ang=sa-(e.clientX-sx)*.09;lx=e.clientX;run()};
 const upH=()=>{dn=false;removeEventListener('pointermove',mvH);removeEventListener('pointerup',upH);if(Math.abs(vel)<.04)snap=null;run()};
 stage.onpointerdown=e=>{dn=true;snap=null;sx=lx=e.clientX;sa=ang;mv=0;vel=0;addEventListener('pointermove',mvH);addEventListener('pointerup',upH)};
 home.addEventListener('wheel',e=>{e.preventDefault();snap=null;const d=Math.abs(e.deltaX)>Math.abs(e.deltaY)?e.deltaX:e.deltaY;vel=Math.max(-5,Math.min(5,vel+d*.011));run()},{passive:false});
 cards.forEach(c=>c.addEventListener('click',()=>{if(mv>6)return;const i=+c.dataset.i;i===sel?location.hash='#/b/'+B[i].id:goTo(i)}));
 $$('#dots i').forEach(d=>d.onclick=()=>goTo(+d.dataset.i));
 $('#pv').onclick=()=>goTo(sel-1);$('#nx').onclick=()=>goTo(sel+1);$('#go').onclick=()=>location.hash='#/b/'+B[sel].id;
 $('#cp').onclick=()=>{const b=B[sel],ks=b.props.map(p=>b.id+'/'+p.id),on=ks.every(k=>cmp.has(k));ks.forEach(k=>on?cmp.delete(k):cmp.add(k));upC()};
 const key=e=>{if(e.key==='ArrowRight')goTo(sel+1);if(e.key==='ArrowLeft')goTo(sel-1);if(e.key==='Enter'&&!e.target.closest('button,a'))location.hash='#/b/'+B[sel].id};
 addEventListener('keydown',key);addEventListener('resize',lay);clean=()=>{cancelAnimationFrame(raf);removeEventListener('keydown',key);removeEventListener('resize',lay);removeEventListener('pointermove',mvH);removeEventListener('pointerup',upH)};
 lay();run()}
/* ---------- PROJECT ---------- */
function project(id,pid){const i=B.findIndex(x=>x.id===id);if(i<0)return home();const b=B[i],g=I(b),q=sq(g.all);cur={b,pi:Math.max(0,b.props.findIndex(p=>p.id===pid)),sc:0};app.style.cssText=pal(b);document.documentElement.style.setProperty('--ca',acc(b));
 const nb=B[(i+1)%B.length],pr=B.length,multi=b.props.length>1,ins=q[1]||q[0];
 const NOEQ=['cloud','brands','laundry','homestay','processing'],noeq=NOEQ.includes(b.id),secs=[['overview','Overview'],...(multi?[['proposals','Proposals']]:[]),['products','Products'],['gallery','Gallery'],...(noeq?[]:[['equipment','Equipment']]),...(b.ember?[['ember','Café']]:[])];
 LBL['hero'+b.id]=[ins];const lk='ov'+b.id;LBL[lk]=[q[2]||q[0],q[3]||q[1]||q[0]];
 app.innerHTML=`<article class="proj L-${b.layout}"><section class="hero"><div class="hbg" data-par=".22"><img src="${g.hero}" alt="${b.name}" style="object-position:${g.fx}"></div><div class="hg"></div><div class="hnum">${b.n}</div><button class="btn back" data-act="home">← Back to Portfolio</button>
 <div class="hc"><h1 class="${b.name.length>22?'long':''}">${sp(b.name,350)}</h1><p class="hint">${b.short}</p></div>
 <figure class="hinset ri in" data-par="-.1" data-act="lb" data-k="hero${b.id}" data-i="0"><img src="${ins.s}" alt="${ins.c}" style="object-position:${ins.fx||'50% 50%'}"></figure>
 <div class="hmeta mono"><div class="sw">${b.pal.map(c=>`<i style="background:${c}" title="${c}"></i>`).join('')}</div>${b.props.length} PROPOSAL${b.props.length>1?'S':''}<div class="cue">SCROLL</div></div></section>
 <nav class="sub" id="sub"><button class="bk" data-act="home">← Portfolio</button>${secs.map(s=>`<button data-act="go" data-t="${s[0]}">${s[1]}</button>`).join('')}</nav>
 ${sec('overview','Business concept','The <em>idea</em>',`<div class="ov"><div class="rv"><p class="lead">${b.concept}</p>${b.note?`<div class="note">${b.note}</div>`:''}<div class="stats"><div><b data-to="${b.props.length}">0</b><span class="mono">PROPOSALS</span></div><div><b data-to="${b.props.reduce((a,p)=>a+p.items.length,0)}">0</b><span class="mono">PRODUCT LINES</span></div></div></div><div class="lay" data-par="-.05">${fig(lk,0,LBL[lk][0])}${fig(lk,1,LBL[lk][1])}</div></div>`)}
 ${multi?sec('proposals','Select a proposal',`${b.props.length} separate <em>portfolios</em>`,`<div class="pick" id="pick">${b.props.map((p,j)=>{const im=PI(b,p)[0];return`<button class="pk ${j===cur.pi?'on':''}" data-act="prop" data-j="${j}">${im?`<img src="${im.s}" alt="${p.name}" style="object-position:${im.fx||'50% 50%'}">`:slotEl(p.name)}<span><small>0${j+1}</small>${p.name}</span></button>`}).join('')}</div><div class="pnav"><button class="btn" data-act="pp">← Previous</button><button class="btn" data-act="pn">Next →</button></div>`):''}
 <div id="pb"></div>${compMore(b)}${b.ember?sec('ember','Café','Feasibility <em>study</em>',ember()):''}
 <div class="nextb"><button class="btn" data-act="home">← Portfolio</button><a class="btn solid" href="#/b/${nb.id}">Next ${nb.n} · ${nb.name} →</a></div></article>`;
 body()}
function body(){const{b,pi,sc}=cur,p=b.props[pi],f=p.f||{},fin=(p.fin||{})[SCEN[sc]]||{},ims=sq(PI(b,p).length?PI(b,p):[]),k='g'+b.id+p.id;LBL[k]=ims;
 history.replaceState(null,'','#/b/'+b.id+(b.props.length>1?'/'+p.id:''));
 const eqI={'laundry/main':1,'agri/micro':0,'cloud/main':4},eqk=b.id+'/'+p.id,ei=b.id==='processing'?0:eqI[eqk],eim=ei!==undefined?PI(b,p)[ei]:null;LBL['eq'+k]=eim?[eim]:[];
 const bn=5/15*100,mk=f.invest&&f.invest.num!=null?Math.min(100,f.invest.num/15*100):null;
 $('#pb').innerHTML=`<div class="pbar rv"><h3>${p.name}</h3><p>${p.sum}</p></div>
 ${sec('products','Products & services','What it <em>offers</em>',`<div>${p.items.map((x,j)=>{const im=ims.length?ims[j%ims.length]:null;return`<div class="prow"><div class="tx rv"><b>0${j+1}</b><h3>${x[0]}</h3><p>${x[1]}</p></div><div class="ph">${im?fig(k,j%ims.length,im):slotEl(p.name)}</div></div>`}).join('')}</div>`)}
 ${agriMore(p)}
 ${sec('gallery','Photography','The <em>gallery</em>',ims.length?`<div class="mos">${ims.map((im,j)=>fig(k,j,im)).join('')}</div>`:`<div class="mos">${[0,1,2].map(()=>slotEl(p.name)).join('')}</div>`)}
 ${['cloud','brands','laundry','homestay','processing'].includes(b.id)?'':sec('equipment','Equipment & infrastructure','The <em>equipment</em>',`<div class="${eim?'eq':''}">${eim?fig('eq'+k,0,eim):''}<div class="eql">${p.eq.length?p.eq.map(e=>`<div class="cell"><strong>${e}</strong></div>`).join(''):`<div class="cell"><span class="pend">Equipment list pending research.</span></div>`}</div></div>`)}
`;
 obs();onScroll()}
function ember(){return `<div class="em2"><div><p style="font:200 clamp(22px,2.4vw,34px)/1.3 var(--serif)">A small café under 500 sq. ft., seating about 10–20 guests.</p>${ul(EMBER.rules)}<h4>Features to test for fit</h4>${ul(EMBER.features)}</div><div><h4 style="margin-top:0">Sunday singing sessions</h4>${ul(EMBER.sing)}<h4>Marketing, first six months</h4>${ul(EMBER.mkt)}</div></div>
<h4 style="font:200 30px var(--serif);margin:44px 0 14px">Implementation · 10 stages</h4><div class="offers" style="grid-template-columns:repeat(5,1fr)">${EMBER.stages.map((s,j)=>`<div class="cell"><small style="margin:0 0 8px">Stage ${j+1}</small><strong style="font-size:17px">${s}</strong></div>`).join('')}</div>${emberMore()}`}
/* ---------- COMPARE ---------- */
function compare(){app.innerHTML=`<section class="page"><h1>${sp('Compare Businesses')}</h1><p>Select proposals to compare side by side. Cafés and sub-proposals are never merged. Cells show verified figures only.</p><div class="chips">${all.map(a=>`<button class="chip ${cmp.has(a.k)?'on':''}" data-act="cmp" data-k="${a.k}" data-re="1"><img src="${(PI(a.b,a.p)[0]||I(a.b).all[0]).s}" alt="" loading="lazy"><span>${a.b.n} · ${a.l}</span></button>`).join('')}</div><div id="ct"></div><p class="leg">${XD.figNote}</p></section>`;ctab()}
function ctab(){const s=all.filter(a=>cmp.has(a.k));$('#ct').innerHTML=s.length<2?'<p class="pend">Select at least two proposals.</p>':`<div class="tw"><table><tr><th></th>${s.map(a=>`<th>${a.l}</th>`).join('')}</tr><tr><td>Key consideration</td>${s.map(a=>`<td>${a.b.note||'—'}</td>`).join('')}</tr>${CMP.map(r=>`<tr><td>${r[1]}</td>${s.map(a=>`<td>${tg((a.p.f||{})[r[0]])}</td>`).join('')}</tr>`).join('')}</table></div>`}
/* ---------- INVEST ---------- */
function invest(){const cats=[['invest','Setup costs'],['wc','Working capital'],['cont','Contingency'],['monthly','Monthly expenses'],['rev','Revenue'],['net','Profitability']];let c=0;
 const draw=()=>{const k=cats[c][0],rows=all.map(a=>({a,x:(a.p.f||{})[k]})),mx=Math.max(10,...rows.map(r=>r.x&&r.x.num||0));$('#iv').innerHTML=rows.map(r=>`<div class="bar"><span>${r.a.l}</span><div>${k==='invest'?`<span class="band" style="left:${5/mx*100}%;width:${5/mx*100}%"></span>`:''}${r.x&&r.x.num!=null?`<i style="width:${r.x.num/mx*100}%"></i>`:`<span class="pend" style="position:relative;padding-left:10px;line-height:28px">pending</span>`}</div></div>`).join('')+(k==='invest'?'<p class="leg">GREEN BAND = ₹5–10 LAKH STARTING BUDGET. NOT EVERY BUSINESS IS ASSUMED TO FIT IT.</p>':'');$$('#ic .btn').forEach((b,j)=>b.classList.toggle('on',j===c))};
 app.innerHTML=`<section class="page"><h1>${sp('Investment Overview')}</h1><p>Immediate feasibility (₹5–10 lakh) is kept separate from the long-term ambition of ₹10 lakh monthly net profit. At a 15% net margin that would need about ₹66.7 lakh in monthly revenue: an ambition, not a forecast.</p><div class="tabs" id="ic" style="margin-top:34px">${cats.map((x,j)=>`<button class="btn" data-j="${j}">${x[1]}</button>`).join('')}</div><div id="iv"></div><p class="leg">${XD.figNote}</p></section>`;
 $$('#ic .btn').forEach(b=>b.onclick=()=>{c=+b.dataset.j;draw()});draw()}
/* ---------- global actions ---------- */
const dr=(h,html)=>{$('#drc').innerHTML=`<h3>${h}</h3>${html}`;$('#dr').classList.add('open');$('#scrim').classList.add('open')};
const closeAll=()=>{$('#dr').classList.remove('open');$('#scrim').classList.remove('open');$('#lb').classList.remove('open')};
const lbShow=()=>{const l=LBL[lbk]||[],im=l[lbi];if(!im)return;$('#lbc').innerHTML=`<img src="${im.s}" alt="${im.c}"><figcaption>${im.c} · ${lbi+1}/${l.length}</figcaption>`;$$('.lbn').forEach(x=>x.style.display=l.length>1?'':'none')};
addEventListener('keydown',e=>{if(e.key==='Escape')closeAll();if($('#lb').classList.contains('open')){const n=(LBL[lbk]||[]).length;if(e.key==='ArrowRight'){lbi=(lbi+1)%n;lbShow()}if(e.key==='ArrowLeft'){lbi=(lbi-1+n)%n;lbShow()}}});
document.addEventListener('click',e=>{const t=e.target.closest('[data-act]');if(!t)return;const a=t.dataset.act,{b,pi}=cur;
 if(a==='close'){if(e.target===t||t.classList.contains('x'))closeAll()}
 else if(a==='home')location.hash='#/';
 else if(a==='go')document.getElementById(t.dataset.t).scrollIntoView({behavior:RM?'auto':'smooth'});
 else if(a==='lb'){lbk=t.dataset.k;lbi=+t.dataset.i;$('#lb').classList.add('open');lbShow()}
 else if(a==='lbp'||a==='lbn'){const n=LBL[lbk].length;lbi=(lbi+(a==='lbn'?1:-1)+n)%n;lbShow()}
 else if(a==='prop'||a==='pp'||a==='pn'){const n=b.props.length;cur.pi=a==='prop'?+t.dataset.j:(pi+(a==='pn'?1:-1)+n)%n;cur.sc=0;$$('#pick .pk').forEach((x,j)=>x.classList.toggle('on',j===cur.pi));body();document.getElementById('products').scrollIntoView({behavior:RM?'auto':'smooth'})}
 else if(a==='sc'){cur.sc=+t.dataset.j;const y=scrollY;body();scrollTo({top:y,behavior:'instant'})}
 else if(a==='step'){$$('.nd',t.parentNode).forEach(x=>x.classList.toggle('on',x===t));$('#sd').textContent=$('span',t).textContent+': detailed step information is pending verification.'}
 else if(a==='tl'){$$('button',t.parentNode).forEach(x=>x.classList.toggle('on',x===t));$('#td').textContent=t.textContent.slice(2)+': timing and actions are pending verification.'}
 else if(a==='cmp'){cmp.has(t.dataset.k)?cmp.delete(t.dataset.k):cmp.add(t.dataset.k);if(t.dataset.re){t.classList.toggle('on');ctab()}else t.textContent=cmp.has(t.dataset.k)?'✓ In comparison':'+ Compare'}
 else if(a==='dr'){const p=b.props[pi],L={market:['Market research',`<p>Coimbatore market, customer segments, competitors and locations.</p>${ul(p.topics)}`],invest:['Investment breakdown',ul(FIN.slice(0,4))],equip:['Equipment',p.eq.length?ul(p.eq):'<p class="pend">Pending research.</p>'],fin:['Full financial analysis',ul(FIN)+'<p>Conservative, realistic and optimistic scenarios, each assumption stated.</p>'],mkt:['Marketing strategy',p.mkt.length?ul(p.mkt):ul(OFFERS)],risk:['Risks & compliance',(b.note?`<div class="note">${b.note}</div>`:'')+'<p>Licences, registrations, food safety and business risks, verified from official sources.</p>']}[t.dataset.k];dr(L[0],`<p class="pend" style="margin-bottom:14px">${p.name}: scope of analysis. Figures pending verification.</p>${L[1]}`)}
});
/* ---------- boot / intro ---------- */
(async function(){$('#it').innerHTML=sp('The Business Portfolio',200);const u=B.map(b=>I(b).card);let n=0;const up=()=>{const p=Math.round(n/u.length*100);$('#ip').style.width=p+'%';$('#ic').textContent=String(p).padStart(3,'0')};
 await Promise.all([...u.map(x=>new Promise(r=>{const m=new Image();m.onload=m.onerror=()=>{n++;up();r()};m.src=x})),new Promise(r=>setTimeout(r,RM?150:2300))]);
 booted=true;route();document.body.classList.remove('boot');$('#intro').classList.add('done');setTimeout(()=>$('#intro').remove(),1300)})();
