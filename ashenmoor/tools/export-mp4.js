// Export an Ashenmoor episode page to MP4 (1280x720, 30 fps, H.264 + AAC).
// Usage: node export-mp4.js <episode.html> <out.mp4> [fps]
// Needs: npm i playwright, and ffmpeg on the PATH. The page must define
// window.__drawAt(seconds) and window.__renderAudio(sampleRate) (see ashenmoor-episode-1.html).
const {chromium}=require('playwright');
const fs=require('fs'),path=require('path'),os=require('os'),{spawn}=require('child_process');

(async()=>{
  const [src,out,fpsArg]=process.argv.slice(2);
  if(!src||!out){console.error('Usage: node export-mp4.js <episode.html> <out.mp4> [fps]');process.exit(1)}
  const fps=+(fpsArg||30),SR=44100,tmp=fs.mkdtempSync(path.join(os.tmpdir(),'ashenmoor-'));
  // The published page has no <html> skeleton, so wrap it like the artifact host does.
  fs.writeFileSync(path.join(tmp,'page.html'),'<!doctype html><html><head><meta charset="utf-8"></head><body>'+fs.readFileSync(src,'utf8')+'</body></html>');
  const exe=process.env.CHROMIUM_PATH||(fs.existsSync('/opt/pw-browsers/chromium-1194/chrome-linux/chrome')?'/opt/pw-browsers/chromium-1194/chrome-linux/chrome':undefined);
  const browser=await chromium.launch(exe?{executablePath:exe}:{});
  const page=await (await browser.newContext({ignoreHTTPSErrors:true,viewport:{width:1400,height:1000}})).newPage();
  page.on('pageerror',e=>console.error('page error:',e.message));
  await page.goto('file://'+path.join(tmp,'page.html'));
  await page.evaluate(()=>document.fonts.ready);await page.waitForTimeout(1500);

  // 1. Soundtrack, rendered offline so it is sample exact.
  const len=await page.evaluate(sr=>window.__renderAudio(sr),SR),pcm=Buffer.alloc(len),CH=1<<22;
  for(let i=0;i<len;i+=CH)Buffer.from(await page.evaluate(([a,b])=>window.__pcmChunk(a,b),[i,CH]),'base64').copy(pcm,i);
  const wav=Buffer.alloc(44);wav.write('RIFF',0);wav.writeUInt32LE(36+len,4);wav.write('WAVEfmt ',8);wav.writeUInt32LE(16,16);wav.writeUInt16LE(1,20);wav.writeUInt16LE(1,22);
  wav.writeUInt32LE(SR,24);wav.writeUInt32LE(SR*2,28);wav.writeUInt16LE(2,32);wav.writeUInt16LE(16,34);wav.write('data',36);wav.writeUInt32LE(len,40);
  const wavPath=path.join(tmp,'audio.wav');fs.writeFileSync(wavPath,Buffer.concat([wav,pcm]));

  // 2. Frames, piped straight into ffmpeg.
  const total=Math.round(len/2/SR*fps);
  const ff=spawn('ffmpeg',['-y','-loglevel','error','-f','image2pipe','-framerate',String(fps),'-c:v','png','-i','-','-i',wavPath,
    '-c:v','libx264','-preset','medium','-crf','18','-pix_fmt','yuv420p','-c:a','aac','-b:a','192k','-shortest','-movflags','+faststart',out],{stdio:['pipe','inherit','inherit']});
  for(let f=0;f<total;f++){
    const url=await page.evaluate(p=>window.__drawAt(p),f/fps);
    if(!ff.stdin.write(Buffer.from(url.slice(url.indexOf(',')+1),'base64')))await new Promise(r=>ff.stdin.once('drain',r));
    if(f%(fps*10)===0)console.log('frame',f,'/',total);
  }
  ff.stdin.end();await new Promise(r=>ff.on('close',r));
  await browser.close();fs.rmSync(tmp,{recursive:true,force:true});
  console.log('wrote',out);
})();
