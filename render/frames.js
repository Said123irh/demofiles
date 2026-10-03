// Seeks a scene frame by frame and pipes the canvas as JPEG into ffmpeg (video only).
const {chromium}=require('playwright');const {spawn}=require('child_process');
(async()=>{
  const [file,out,fps,maxSec]=process.argv.slice(2);const FPS=+fps||30;
  const b=await chromium.launch({executablePath:'/opt/pw-browsers/chromium'});
  const p=await b.newPage({viewport:{width:1300,height:1400}});
  const errs=[];p.on('pageerror',e=>errs.push(e.message));
  await p.goto('file://'+file);await p.waitForTimeout(1500);
  const len=await p.evaluate(()=>parseFloat(document.getElementById('sc').max));
  const lim=maxSec?Math.min(len,+maxSec):len,N=Math.round(lim*FPS);
  const ff=spawn('ffmpeg',['-y','-hide_banner','-loglevel','error','-f','image2pipe','-framerate',String(FPS),'-c:v','mjpeg','-i','-','-c:v','libx264','-preset','medium','-crf','17','-pix_fmt','yuv420p','-r',String(FPS),out],{stdio:['pipe','inherit','inherit']});
  for(let i=0;i<N;i++){
    const d=await p.evaluate(t=>{window.__seek(t);return document.getElementById('c').toDataURL('image/jpeg',.95).split(',')[1]},i/FPS);
    if(!ff.stdin.write(Buffer.from(d,'base64')))await new Promise(r=>ff.stdin.once('drain',r));
  }
  ff.stdin.end();await new Promise(r=>ff.on('close',r));
  console.log(out,'frames',N,'errors',JSON.stringify(errs));await b.close();
})();
