const fs=require('fs');
let p='components/museum/Museum.tsx',s=fs.readFileSync(p,'utf8');
s=s.replace('<div className="museum-canvas" ref={host} aria-label="Interactive museum architecture"/>','<div className="museum-canvas" ref={host} aria-label="Interactive museum architecture"/>{(phase===\'outside\'||phase===\'approach\')&&<div className="museum-exterior-photo" aria-hidden="true"><Image src="/museum/exterior.webp" alt="" fill priority sizes="100vw"/></div>}');
s=s.replace('src="/images/backgrounds/estate.webp"','src="/museum/exterior.webp"');
s=s.replace("if(params.get('fallback')==='1')setFallback(true);", "if(params.get('fallback')==='1')setFallback(true);");
fs.writeFileSync(p,s);
p='components/museum/engine.ts';s=fs.readFileSync(p,'utf8');
s=s.replace('let state=initial,','let state=initial,');
s=s.replace('walk=0,yaw=0,pitch=0,pulse=0','walk=0,strafe=0,yaw=0,pitch=0,pulse=0');
s=s.replace('const loader=new THREE.TextureLoader();','const loader=new THREE.TextureLoader();let generation=0;');
s=s.replace("const mat=new THREE.MeshBasicMaterial({color:'#8e8271'});","const generationAtLoad=generation;const mat=new THREE.MeshBasicMaterial({color:'#8e8271'});");
s=s.replace('if(disposed||!m.parent)','if(disposed||generationAtLoad!==generation)');
s=s.replace('function free(){group.traverse','function free(){generation++;group.traverse');
s=s.replace('function draw(){free();walk=0;yaw=0;','function draw(){free();walk=0;strafe=0;yaw=0;');
s=s.replace('const h=3.1,w=Math.min(3.8,h*ratio);','const h=4.4,w=Math.min(5.2,h*ratio);');
s=s.replace("if(keys.has('a'))yaw+=dt*.4;if(keys.has('d'))yaw-=dt*.4;","if(keys.has('a'))strafe-=dt*2;if(keys.has('d'))strafe+=dt*2;strafe=THREE.MathUtils.clamp(strafe,-9,9);");
s=s.replace("state.mode==='explore'?Math.sin(yaw)*2:0","state.mode==='explore'?strafe:Math.sin(yaw)*.7");
s=s.replace('camera.lookAt(Math.sin(yaw)*5,','camera.lookAt(camera.position.x+Math.sin(yaw)*7,');
s=s.replace('pitch=THREE.MathUtils.clamp(pitch+dy*.008,-2,2);','pitch=THREE.MathUtils.clamp(pitch+dy*.005,-1.3,1.3);if(e.pointerType===\'touch\')walk=THREE.MathUtils.clamp(walk-dy*.025,-2,16);');
s=s.replace("scene.add(new THREE.HemisphereLight('#a8b9d8','#3c2414',2))","scene.add(new THREE.HemisphereLight('#a8b9d8','#3c2414',1.15))");
s=s.replace("sun.position.set(-6,12,9)","sun.position.set(-6,12,9)");
s=s.replace("else{const list=state.room==='secret'",`else{
 for(const y of [1.6,6.8,10.8])box(0,y,-11.62,24,.13,.16,'#786040');
 if(state.room==='ancient'){for(const x of [-10,10]){const column=new THREE.Mesh(new THREE.CylinderGeometry(.4,.55,5,16),material('#7f7058'));column.position.set(x,2.5,-6);group.add(column);box(x,.2,-6,1.4,.4,1.4,'#847257');box(x,5,-6,1.2,.35,1.2,'#847257');}box(0,.6,1,4,1.2,2,'#716451');}
 if(state.room==='old-world'){box(0,1.2,0,4,.15,2,'#593d26');for(const x of [-1.7,1.7])box(x,.6,0,.2,1.2,1.7,'#332315');const globe=new THREE.Mesh(new THREE.SphereGeometry(.65,24,16),material('#657264'));globe.position.set(1,1.95,0);group.add(globe);box(-1,1.4,0,1,.25,.7,'#9b8160');}
 if(state.room==='golden-age'){box(0,.7,1,5,.6,1.5,'#55372e');for(const x of [-2,2])box(x,.3,1,.2,.6,1,'#95754a');}
 if(state.room==='modern'){for(const x of [-8,8])box(x,.9,3,1.8,1.8,1.8,'#4c4439');}
 const list=state.room==='secret'`);
fs.writeFileSync(p,s);
p='components/museum/materials.ts';s=fs.readFileSync(p,'utf8').replace('canvas.width=canvas.height=128','canvas.width=canvas.height=512').replaceAll('128','512').replace('random()*.14','random()*.05').replace('y+=32','y+=128');s=s.replace("tex.colorSpace=THREE.SRGBColorSpace;","tex.colorSpace=THREE.SRGBColorSpace;tex.repeat.set(3,3);tex.anisotropy=4;");fs.writeFileSync(p,s);
