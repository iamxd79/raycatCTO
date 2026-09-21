const fs = require('fs');
const sharp = require('sharp');
async function run(){
 fs.mkdirSync('public/images/raycat',{recursive:true}); fs.mkdirSync('public/images/backgrounds',{recursive:true});
 await sharp('public/images/brand/raycat-source.svg').webp({quality:92}).toFile('public/images/raycat/canonical-corrected.webp');
 await sharp('C:/Users/EXPRESS COMPUTERS/Downloads/bg-img.svg').resize({width:1672}).webp({quality:84}).toFile('public/images/backgrounds/estate.webp');
 for(const [size,name] of [[32,'icon.png'],[180,'apple-icon.png']]) await sharp('public/images/brand/raycat-source.svg').extract({left:35,top:55,width:272,height:272}).resize(size,size).png().toFile('app/'+name);
 let p=fs.readFileSync('app/page.tsx','utf8');
 p="import Image from 'next/image';\n"+p;
 p=p.replace('<a className="brand" href="#top">RAYCAT</a>','<a className="brand" href="/"><Image src="/images/raycat/canonical-corrected.webp" alt="" width={36} height={36}/>RAYCAT</a>');
 p=p.replace('<div className="hero-art"><div className="moon"/><div className="estate"/><div className="cat"><span className="ears"/><span className="face"><i/><i/></span><span className="scarf"/></div></div>','<div className="hero-art"><Image className="hero-background" src="/images/backgrounds/estate.webp" alt="" fill priority sizes="100vw"/></div>');
 p=p.replace('<div className="portrait-cat cat"><span className="ears"/><span className="face"><i/><i/></span><span className="scarf"/></div>','<Image src="/images/raycat/canonical-corrected.webp" alt="The original RayCat" fill sizes="(max-width:800px) 90vw, 40vw"/>');
 p=p.replace('<div className="gear">✦</div>','<Image className="wheel-art" src="/image/07-the-flywheel.png" alt="RayCat beside an antique industrial flywheel" width={560} height={420} sizes="(max-width:800px) 90vw, 45vw"/>');
 p=p.replace('<div className="door"><div className="door-light"/></div>','<div className="museum-art"><Image src="/image/49-the-museum-of-raycat.png" alt="RayCat’s collection of historical artifacts" width={650} height={650} sizes="(max-width:800px) 90vw, 45vw"/></div>');
 fs.writeFileSync('app/page.tsx',p);
 let l=fs.readFileSync('app/layout.tsx','utf8').replace(",metadataBase:new URL('https://raycat.example')",",icons:{icon:'/icon.png',apple:'/apple-icon.png'},openGraph:{title:'RAYCAT — Hold $RAYCAT. Earn $RAY.',description:'RayCat rewards eligible $RAYCAT holders in $RAY.'},twitter:{card:'summary',title:'RAYCAT — Hold $RAYCAT. Earn $RAY.'}"); fs.writeFileSync('app/layout.tsx',l);
}
run().catch(e=>{console.error(e);process.exit(1)});
