const fs=require('fs'),sharp=require('sharp');
async function main(){
 const source='C:/Users/EXPRESS COMPUTERS/Downloads/the-guide.svg';
 fs.copyFileSync(source,'public/museum/owner-source.svg');
 for(const [name,width] of [['small',384],['large',768]])await sharp(source).resize({width}).webp({quality:94,alphaQuality:100}).toFile(`public/museum/owner-${name}.webp`);
 let p='components/museum/engine.ts',s=fs.readFileSync(p,'utf8');
 s="import {welcomeRayCat} from './welcome-raycat';\n"+s;
 s=s.replace(' function free(){',' let owner:ReturnType<typeof welcomeRayCat>|null=null;\n function free(){owner?.dispose();owner=null;');
 s=s.replace("cat=picture('/images/raycat/canonical-corrected.webp',0,1.7,-2,1.2,1.2,'cat','welcome');","owner=welcomeRayCat(group,state.quality==='low'||host.clientWidth<800);for(const x of [-3.4,3.4]){box(x,4,-8,.4,8,14,'#30241c');lamp(x,4,-5);lamp(x,4,-10);}box(0,8,-8,7,.3,14,'#211a15');box(0,.025,-8,3,.04,14,'#49302b');box(0,4,-16,7,8,.3,'#241c17');for(let i=0;i<6;i++)box(0,i*.25,-12-i*.5,4,.25,.5,'#66513b');lamp(0,6,-13);");
 s=s.replace("state.phase==='welcome')cat.parent!.position.z=-2-Math.max(0,elapsed-1)*1.5","state.phase==='welcome')cat.visible=true");
 s=s.replace("if(wheel&&!state.reduced)","if(owner)owner.update(state.phase==='welcome'?elapsed:0,state.reduced);if(wheel&&!state.reduced)");
 s=s.replace("Math.max(4,32-elapsed*5):2:12","Math.max(5,32-elapsed*5):5-Math.max(0,elapsed-4.6)*2:12");
 fs.writeFileSync(p,s);
 p='components/museum/Museum.tsx';s=fs.readFileSync(p,'utf8');
 s=s.replace('reduced?500:4000','reduced?3200:7000');
 s=s.replace('{phase===\'welcome\'&&<div className="museum-welcome"><p>Welcome home.</p>{fallback&&<Image src="/images/raycat/canonical-corrected.webp" alt="RayCat welcomes you" width={120} height={120}/>}</div>}',`{phase==='welcome'&&<>{fallback&&<div className="museum-owner-fallback"><Image src="/museum/owner-small.webp" alt="RayCat, the mansion owner, inviting you inside" width={384} height={461}/></div>}<div className="museum-welcome"><p>Welcome home.</p></div></>}`);
 s+='\nimport "./welcome.css";\n';fs.writeFileSync(p,s);
 console.log(await sharp('public/museum/owner-large.webp').metadata());
}
main().catch(e=>{console.error(e);process.exit(1)});
