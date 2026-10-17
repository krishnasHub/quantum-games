// Checks the physics, then checks every level: the reference setup earns three stars, the empty level earns none,
// and each trap (a tempting wrong idea) falls short. The simulation has no randomness, so every result is exact.
// Levels run in parallel worker processes. Usage: node tests/verify-levels.js [level number to run just one]
const fs=require('fs'),path=require('path'),vm=require('vm'),{fork}=require('child_process');

function load(){
  const html=fs.readFileSync(path.join(__dirname,'..','index.html'),'utf8'),ctx=vm.createContext({});
  vm.runInContext(html.match(/<script id="engine">([\s\S]*?)<\/script>/)[1],ctx);
  vm.runInContext(fs.readFileSync(path.join(__dirname,'solutions.js'),'utf8'),ctx);
  return ctx;
}
const stars=(L,x)=>L.stars.filter(s=>x*100>=s-1e-9).length;
const fmt=r=>`exit ${(r.exit*100).toFixed(1)}%, lost ${(r.lost*100).toFixed(1)}%, wandering ${(r.left*100).toFixed(1)}%`;

if(process.argv[2]==='--worker'){
  const ctx=load(),E=ctx.QEngine,i=+process.argv[3],L=E.LEVELS[i],sol=ctx.QSolutions[i],out={i,lines:[],failed:0};
  const line=(ok,text)=>{if(!ok)out.failed++;out.lines.push(`${ok?'PASS':'FAIL'} ${text}`);};
  const fits=pl=>(pl||[]).every(p=>E.canPlace(L,pl,p))&&Object.entries((pl||[]).reduce((m,p)=>(m[p.type]=(m[p.type]||0)+1,m),{})).every(([t,n])=>n<=(L.parts[t]||0));
  const r=E.run(L,sol.placed||[],sol.launch);
  line(fits(sol.placed)&&stars(L,r.exit)===3,`${i+1}. ${L.name}: reference setup earns 3 stars (${fmt(r)})`);
  const e=E.run(L,[]);
  line(stars(L,e.exit)===0,`${i+1}. ${L.name}: the empty level earns no stars (${fmt(e)})`);
  for(const t of ctx.QTraps.filter(t=>t.level===i)){
    const q=E.run(L,t.placed||[],t.launch);
    line(fits(t.placed)&&stars(L,q.exit)<t.below,`${i+1}. ${L.name}: trap "${t.name}" earns under ${t.below} star${t.below>1?'s':''} (${fmt(q)})`);
  }
  process.send(out);process.exit(0);
}

const ctx=load(),E=ctx.QEngine;let failed=0;
function check(name,ok,detail){if(!ok)failed++;console.log(`${ok?'PASS':'FAIL'} physics: ${name} (${detail})`);}
{
  // Probability is conserved when there are no detectors; the launched packet sits at the uncertainty bound,
  // and spreading never takes it below.
  const L={...E.LEVELS[0],map:E.LEVELS[0].map.map(r=>r.replace(/E/g,'.'))},s=E.makeSim(E.buildLevel(L,[]));
  const u0=E.stats(s);let minU=Math.min(u0.ux,u0.uy);
  for(let t=0;t<120;t++){E.step(s);if(t%20===19){const st=E.stats(s);minU=Math.min(minU,st.ux,st.uy);}}
  check('probability is conserved',Math.abs(E.norm2(s)-1)<1e-6,`norm ${E.norm2(s).toFixed(8)}`);
  check('the launched packet sits at the uncertainty bound',Math.abs(u0.ux-0.5)<0.01,`dx*dp = ${u0.ux.toFixed(3)}`);
  check('dx*dp never drops below hbar/2',minU>=0.499,`min ${minU.toFixed(3)}`);
  // Narrow packets carry a wider spread of momentum than wide ones.
  const n=E.stats(E.makeSim(E.buildLevel(E.LEVELS[0],[]),{width:'narrow'})),w=E.stats(E.makeSim(E.buildLevel(E.LEVELS[0],[]),{width:'wide'}));
  check('a narrower packet has a wider momentum spread',n.dkx>2*w.dkx,`dp narrow ${n.dkx.toFixed(3)}, wide ${w.dkx.toFixed(3)}`);
  // Tunnelling: one full-speed hit on a thin barrier lets some, but not most, of the wave through.
  const T={map:E.LEVELS[3].map.map(r=>r.replace(/x/g,'.')),dir:0,T:4},ts=E.makeSim(E.buildLevel(T,[]));let tr=0;
  while(!ts.done){E.step(ts);let p=0;for(let y=0;y<E.NY;y++)for(let x=13*E.TILE;x<E.NX;x++){const i=y*E.NX+x;p+=ts.re[i]**2+ts.im[i]**2;}tr=Math.max(tr,p+ts.exit);}
  check('a barrier taller than the energy still leaks a fraction',tr>0.05&&tr<0.35,`transmitted ${(tr*100).toFixed(1)}%`);
}
E.LEVELS.forEach((L,i)=>L.map.forEach((r,y)=>{if(r.length!==E.TW){console.log(`FAIL ${L.name}: row ${y} is ${r.length} wide`);failed++;}}));
const only=process.argv[2]?[+process.argv[2]-1]:E.LEVELS.map((_,i)=>i),results=[];let pending=only.length;
for(const i of only){const w=fork(__filename,['--worker',i]);w.on('message',m=>results[m.i]=m);w.on('exit',()=>{if(--pending===0)report();});}
function report(){
  for(const m of results.filter(Boolean)){m.lines.forEach(l=>console.log(l));failed+=m.failed;}
  console.log(failed?`\n${failed} check(s) failed`:'\nAll levels verified');
  process.exit(failed?1:0);
}
