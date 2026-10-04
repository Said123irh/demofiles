// Render the thumbnails drawn in tools/thumbnails.html to ashenmoor/thumbnails/*.png. Usage: node render-thumbnails.js
const {chromium}=require('playwright');const fs=require('fs');
(async()=>{const b=await chromium.launch({executablePath:process.env.CHROMIUM_PATH||'/opt/pw-browsers/chromium-1194/chrome-linux/chrome'});
const p=await (await b.newContext({ignoreHTTPSErrors:true,viewport:{width:1400,height:1600}})).newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message));
const sp=fs.readFileSync(''+__dirname+'/../assets/sprites/sprites.json','utf8');
fs.writeFileSync(''+require('os').tmpdir()+'/ashenmoor-thumbs.html','<!doctype html><html><head><meta charset="utf-8"><style>@font-face{font-family:Anton;src:url(data:font/woff2;base64,'+fs.readFileSync(''+__dirname+'/../assets/fonts/anton.woff2').toString('base64')+') format("woff2")}</style></head><body><script>window.SPRITES='+sp+'<\/script>'+fs.readFileSync(''+__dirname+'/../tools/thumbnails.html','utf8').replace(/<link[^>]*>/g,'')+'</body></html>');
await p.goto('file://'+require('os').tmpdir()+'/ashenmoor-thumbs.html');await p.waitForFunction(()=>window.__done,null,{timeout:15000});await p.waitForTimeout(300);console.log('anton', await p.evaluate(()=>document.fonts.check('150px Anton')));
for(const id of ['t1','t2']){const u=await p.evaluate(i=>document.getElementById(i).toDataURL('image/png'),id);fs.writeFileSync(''+__dirname+'/../thumbnails/episode-1-thumbnail-'+(id==='t1'?'A':'B')+'.png',Buffer.from(u.split(',')[1],'base64'))}
console.log(errs);await b.close()})();
