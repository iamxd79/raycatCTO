const fs=require('fs'),sharp=require('sharp');
async function main(){
 const dir='public/images/brand';fs.mkdirSync(dir,{recursive:true});
 const original=fs.readFileSync('C:/Users/EXPRESS COMPUTERS/Downloads/logo-pfp.svg','utf8');
 if(!original.includes('transform="matrix(-1 0 0 1 342 0)"'))throw Error('Expected source mirror not found');
 const corrected=original.replace('transform="matrix(-1 0 0 1 342 0)"','');
 fs.writeFileSync(dir+'/raycat-source.svg',corrected);
 fs.copyFileSync('C:/Users/EXPRESS COMPUTERS/AppData/Local/Temp/codex-clipboard-8474bc10-de34-463f-a3da-745059056f1b.png',dir+'/raydium-original.png');
 await sharp(Buffer.from(corrected)).webp({quality:95}).toFile('public/images/raycat/canonical-corrected.webp');
 for(const [size,name] of [[32,'icon.png'],[180,'apple-icon.png']])await sharp(Buffer.from(corrected)).extract({left:35,top:55,width:272,height:272}).resize(size,size).png().toFile('app/'+name);
 await sharp(Buffer.from(corrected)).extract({left:35,top:55,width:272,height:272}).resize(16,16).png().toFile(dir+'/raycat-16.png');
 const walk=d=>fs.readdirSync(d,{withFileTypes:true}).flatMap(e=>e.isDirectory()?walk(d+'/'+e.name):[d+'/'+e.name]);
 for(const p of [...walk('app'),...walk('components'),...walk('scripts'),'refresh-brand.cjs']){if(!/\.(tsx?|cjs|css)$/.test(p)||p.endsWith('correct-canonical.cjs'))continue;let s=fs.readFileSync(p,'utf8');s=s.replaceAll('/images/raycat/canonical.webp','/images/raycat/canonical-corrected.webp').replaceAll('C:/Users/EXPRESS COMPUTERS/Downloads/logo-pfp.svg','public/images/brand/raycat-source.svg');fs.writeFileSync(p,s);}
 fs.mkdirSync('review/orientation',{recursive:true});
 if(fs.existsSync('public/images/raycat/canonical.webp'))fs.renameSync('public/images/raycat/canonical.webp','review/orientation/obsolete-mirrored-canonical.webp');
 const files=fs.readdirSync('public/image').filter(f=>/^\d+-.*\.png$/.test(f)).sort((a,b)=>parseInt(a)-parseInt(b));
 for(let batch=0;batch<5;batch++){let tiles=[];for(let j=0;j<20;j++){const i=batch*20+j,file=files[i];if(!file)break;const label=Buffer.from(`<svg width="256" height="24"><rect width="256" height="24" fill="#fff"/><text x="8" y="17" font-size="16" fill="#000">${parseInt(file)}</text></svg>`);const tile=await sharp('public/image/'+file).resize(256,256,{fit:'contain',background:'#222'}).extend({bottom:24,background:'#fff'}).composite([{input:label,left:0,top:256}]).jpeg({quality:75}).toBuffer();tiles.push({input:tile,left:(j%4)*256,top:Math.floor(j/4)*280});}await sharp({create:{width:1024,height:1400,channels:3,background:'#222'}}).composite(tiles).jpeg({quality:75}).toFile(`review/orientation/sheet-${batch+1}.jpg`);}
 console.log('Corrected canonical source, derivatives and references; generated five artwork audit sheets.');
}
main().catch(e=>{console.error(e);process.exit(1)});
