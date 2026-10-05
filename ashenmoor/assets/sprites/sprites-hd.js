// Ashenmoor HD sprites. Each character keeps its design and on-screen size, but is drawn on a grid twice as fine:
// the 1x pixel art is doubled, then refined (rounded shapes, shaped eyes with a shine, cheeks, folds, rivets),
// shaded with light from the upper right, and given a dark outline. One HD pixel is half a world pixel.
// Usage: const HD=makeHD(SPRITES) where SPRITES is sprites.json; HD.wick[0..2], HD.bram, HD.hound[0..1], HD.sentry, HD.pile, HD.oswin, HD.oswinLying.
function makeHD(S){
  const PAL=Object.assign({},S.palette);
  const hex=c=>{const n=parseInt(c.slice(1),16);return [n>>16&255,n>>8&255,n&255]};
  const mix=(c,t,k)=>c.map((v,i)=>Math.round(v+(t[i]-v)*k));
  function up2(rows,pal){const w=Math.max(...rows.map(r=>r.length)),h=rows.length,c=document.createElement('canvas');c.width=w*2;c.height=h*2;const x=c.getContext('2d');
    rows.forEach((r,j)=>{for(let i=0;i<r.length;i++){const col=pal[r[i]];if(col){x.fillStyle=col;x.fillRect(i*2,j*2,2,2)}}});return c}
  // bevel: lit edges on top and right, shadowed edges on the left and bottom, decided from the flat colours
  function shade(c,lit,dim,skip){lit=lit==null?.16:lit;dim=dim==null?.2:dim;const sk=new Set((skip||[]).map(h=>parseInt(h.slice(1),16)));const x=c.getContext('2d'),w=c.width,h=c.height,id=x.getImageData(0,0,w,h),d=id.data,o=new Uint8ClampedArray(d);
    const key=(i,j)=>i<0||j<0||i>=w||j>=h||d[(j*w+i)*4+3]===0?-1:(d[(j*w+i)*4]<<16)|(d[(j*w+i)*4+1]<<8)|d[(j*w+i)*4+2];
    for(let j=0;j<h;j++)for(let i=0;i<w;i++){const k=key(i,j);if(k<0||sk.has(k))continue;const p=(j*w+i)*4;let c3=[d[p],d[p+1],d[p+2]];
      if(key(i,j-1)!==k||key(i+1,j)!==k)c3=mix(c3,[255,244,226],lit);else if(key(i-1,j)!==k||key(i,j+1)!==k)c3=mix(c3,[8,6,18],dim);
      o[p]=c3[0];o[p+1]=c3[1];o[p+2]=c3[2]}
    id.data.set(o);x.putImageData(id,0,0);return c}
  function pad(c){const n=document.createElement('canvas');n.width=c.width+2;n.height=c.height+2;n.getContext('2d').drawImage(c,1,1);return n}
  function outline(c,col){const x=c.getContext('2d'),w=c.width,h=c.height,d=x.getImageData(0,0,w,h).data,a=(i,j)=>i>=0&&j>=0&&i<w&&j<h&&d[(j*w+i)*4+3]>0;
    x.fillStyle=col||'#120d18';for(let j=0;j<h;j++)for(let i=0;i<w;i++)if(!a(i,j)&&(a(i-1,j)||a(i+1,j)||a(i,j-1)||a(i,j+1)))x.fillRect(i,j,1,1);return c}
  function paint(c,list){const x=c.getContext('2d');for(const [col,pts] of list){for(const p of pts){if(col===null)x.clearRect(p[0],p[1],p[2]||1,p[3]||1);else{x.fillStyle=col;x.fillRect(p[0],p[1],p[2]||1,p[3]||1)}}}return c}
  // small features (eyes, sockets, teeth) stay flat so the shading never puts ridges around them
  const FLAT=['#e6e2da','#1b1422','#1a1620','#2a4a74'];
  const build=(rows,pal,detail,ol,lit,dim)=>{const c=up2(rows,pal);if(detail&&detail.pre)paint(c,detail.pre);shade(c,lit,dim,FLAT.concat(detail&&detail.flat||[]));if(detail&&detail.post)paint(c,detail.post);return outline(pad(c),ol)};

  // Wick: hair with a shine and strands, jagged bangs, round eyes with a highlight, rosy cheeks, cloak clasp, fold and stitched patch
  const W=S.wick.frames,wickDetail={
    pre:[[null,[[6,0],[19,0],[4,2],[21,2],[2,4],[23,4]]],
      ['#2b2233',[[8,8],[9,8],[10,8],[13,8],[14,8],[17,8],[18,8],[21,8],[9,9],[14,9],[18,9]]],
      ['#e9b48c',[[10,10],[11,10],[18,10],[19,10]]]],
    post:[['#5e4c74',[[10,2,5,1],[8,3,2,1],[15,1,3,1]]],['#1c1524',[[16,4],[17,5],[12,4],[13,5],[6,6],[5,7]]],
      ['#1b1422',[[12,10,2,4],[20,10,2,4]]],['#3d2c58',[[12,13,2,1],[20,13,2,1]]],['#ffffff',[[12,10],[20,10]]],['#f6f1e8',[[10,11,2,3],[18,11,2,3]]],
      ['#e8958a',[[8,15,2,1],[20,15,2,1]]],['#d8b04a',[[16,19],[17,19]]],['#565968',[[10,22,1,6]]],['#c9a878',[[14,22],[15,25]]]]};
  const wick=['idle','walk1','walk2'].map(f=>build(W[f],PAL,wickDetail));
  const bram=build(S.bram.frames.idle,PAL,{post:[['#1b1422',[[14,6,2,2]]],['#ffffff',[[14,6]]],['#f6f1e8',[[12,6,2,2]]],['#d8d2c8',[[8,14,10,1]]]]});
  const hound=['walk1','walk2'].map(f=>build(S.gloomhound.frames[f],PAL,null,'#05040a',.22,.1));
  // Bone-Wight Sentry: deep eye sockets, cracked skull, plate edges and rivets, ribs showing through the gaps
  const sentry=build(S.sentry.frames.idle,PAL,{post:[['#0a0810',[[6,8,2,2],[12,8,2,2]]],['#8a8070',[[9,7],[10,6],[10,5]]],['#9a94a0',[[8,16],[14,16],[20,16],[10,30],[18,30]]],
    ['#cfc6ae',[[11,24,2,1],[11,26,2,1],[15,24,2,1],[15,26,2,1]]],['#6a3a22',[[3,19],[24,19],[13,25],[19,33]]]]});
  const pile=build(S.sentry.frames.pile,PAL,{post:[['#0a0810',[[14,4,2,2],[18,4,2,2]]]]});
  // Sir Oswin Hale, ghost knight of Eldmere (new in Episode 3). Faces left. Pale blue; draw him a little see-through.
  const OP={m:'#9fd0f0',M:'#6a9cc6',f:'#dff3ff',e:'#2a4a74',b:'#c4e2f4',c:'#4f7eab',h:'#c8ecff'};
  const OR=["....mmmmmm......","...mMmmmmmm.....","..mmmmmmmmmm....","..mfffffffmM....","..fefffefffM....","..ffffffffmM....","..fbbbbbffmMc...","...bbbbbbmMcc...",
    "...mmmmmmmmccc..",".hmmmmmmmmmmhcc.",".mmmmmmmmmmmmcc.",".mm.mmmmmmm.mmc.",".ff.mmmmmmm.mmc.",".ff.mmmmmmm.ffc.",".f..mmmmmmm..fc.","....MMMMMMM...c.",
    "....mmmmmmm...c.","....mm...mm...c.","....mm...mm.....","....mm...mm.....","....mM...mM.....","....mm...mm.....","...mmm...mmm....","...MMM...MMM...."];
  const oswin=build(OR,OP,{post:[['#ffffff',[[4,8],[14,8]]],['#e8f6ff',[[6,6,10,1]]],['#9cc8e4',[[6,13,8,1]]]],flat:['#c4e2f4']},'#1f3a5c',.2,.18);
  const oswinLying=(()=>{const c=document.createElement('canvas');c.width=oswin.height;c.height=oswin.width;const x=c.getContext('2d');x.translate(0,c.height);x.rotate(-Math.PI/2);x.drawImage(oswin,0,0);return c})();
  return {wick,bram,hound,sentry,pile,oswin,oswinLying,outline,shade};
}
if(typeof module!=='undefined')module.exports={makeHD};
