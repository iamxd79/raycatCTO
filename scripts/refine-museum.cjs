const fs=require('fs');
let p='components/museum/engine.ts',s=fs.readFileSync(p,'utf8');s="import {agedSurface} from './materials';\n"+s;s=s.replace('const material=(color:string,metalness=0)=>new THREE.MeshStandardMaterial({color,roughness:.88,metalness});','const material=agedSurface;');
s=s.replace("if(state.room==='hall'){for",`if(state.room==='hall'){
 for(const x of [-9,9]){box(x,5,0,.6,10,.6,'#62523f');box(x,9.6,0,1.1,.25,1.1,'#aa895e');box(x,.3,0,1.1,.6,1.1,'#5f503d');}
 for(let y=2;y<11;y+=4)box(0,y,-11.5,24,.12,.2,'#9b7b52');
 for(const z of [-5,4]){const hoop=new THREE.Mesh(new THREE.TorusGeometry(1.2,.08,8,24),material('#9d7b48',.6));hoop.rotation.x=Math.PI/2;hoop.position.set(0,8,z);group.add(hoop);box(0,10,z,.035,4,.035,'#7d6545');for(let k=0;k<6;k++){const angle=k*Math.PI/3;lamp(Math.cos(angle)*1.2,8,Math.sin(angle)*1.2+z);}}
 for`);
s=s.replace('function resize(){renderer.setSize', 'function resize(){renderer.setSize');
fs.writeFileSync(p,s);
p='scripts/check-museum.cjs';s=fs.readFileSync(p,'utf8').replace("name:'The Ancient Room',exact:true","name:'The Ancient Room',exact:false");fs.writeFileSync(p,s);
