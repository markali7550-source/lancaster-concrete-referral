import sharp from "sharp"; import fs from "fs";
const f=["/tmp/deleted/home-hero.webp","/tmp/deleted/process-band.webp","/tmp/deleted/process-services-index.webp"];
const comp=[]; let y=0; const W=1080;
for(const p of f){ const m=await sharp(p).metadata();
  console.log(`  ${p.split("/").pop().padEnd(30)} ${m.width}x${m.height}  ${(fs.statSync(p).size/1024).toFixed(1)} KB`);
  const b=await sharp(p).resize(W).png().toBuffer();
  comp.push({input:b,left:0,top:y}); y+=(await sharp(b).metadata()).height+8; }
fs.writeFileSync("/tmp/sheets/three.png", await sharp({create:{width:W,height:y,channels:3,background:"#c00"}}).composite(comp).png().toBuffer());
