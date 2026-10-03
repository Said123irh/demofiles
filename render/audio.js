// Plays a scene in real time and records its Web Audio output to a webm file.
const {chromium}=require('playwright');const fs=require('fs');
(async()=>{
  const [file,out,maxSec]=process.argv.slice(2);
  const b=await chromium.launch({executablePath:'/opt/pw-browsers/chromium',args:['--autoplay-policy=no-user-gesture-required']});
  const p=await b.newPage({viewport:{width:1300,height:900}});
  const errs=[];p.on('pageerror',e=>errs.push(e.message));
  await p.addInitScript(()=>{
    const wrap=O=>{if(!O)return O;const W=function(...a){const c=new O(...a);window.__ac=c;window.__rec=c.createMediaStreamDestination();return c};W.prototype=O.prototype;return W};
    window.AudioContext=wrap(window.AudioContext);if(window.webkitAudioContext)window.webkitAudioContext=window.AudioContext;
    const oc=AudioNode.prototype.connect;
    AudioNode.prototype.connect=function(d,...r){const res=oc.call(this,d,...r);try{if(window.__ac&&d===window.__ac.destination)oc.call(this,window.__rec)}catch(e){}return res};
  });
  await p.goto('file://'+file);await p.waitForTimeout(1200);
  const len=await p.evaluate(()=>parseFloat(document.getElementById('sc').max));
  const lim=maxSec?Math.min(len,+maxSec):len;
  await p.evaluate(()=>{document.getElementById('big').click();const chunks=[];window.__chunks=chunks;
    const r=new MediaRecorder(window.__rec.stream,{mimeType:'audio/webm;codecs=opus',audioBitsPerSecond:256000});window.__mr=r;r.ondataavailable=e=>chunks.push(e.data);r.start(250)});
  await p.waitForTimeout(lim*1000+600);
  const b64=await p.evaluate(()=>new Promise(res=>{window.__mr.onstop=async()=>{const bl=new Blob(window.__chunks,{type:'audio/webm'});const buf=new Uint8Array(await bl.arrayBuffer());let s='';for(let i=0;i<buf.length;i+=32768)s+=String.fromCharCode.apply(null,buf.subarray(i,i+32768));res(btoa(s))};window.__mr.stop()}));
  fs.writeFileSync(out,Buffer.from(b64,'base64'));
  console.log(out,'len',len,'recorded',lim,'errors',JSON.stringify(errs));await b.close();
})();
