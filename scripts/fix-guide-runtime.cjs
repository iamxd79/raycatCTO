const fs=require('fs');
let p='components/museum/engine.ts',s=fs.readFileSync(p,'utf8');
s="import {createRoomGuide} from './room-guide';\n"+s;
s=s.replace(' let owner:', ' let roomGuide:ReturnType<typeof createRoomGuide>|null=null;\n let owner:');
s=s.replace('function free(){owner?.dispose();','function free(){roomGuide?.dispose();roomGuide=null;owner?.dispose();');
s=s.replace(' draw();function resize()'," draw();function resize()");
s=s.replace(" else {box(0,7,-12", " else {roomGuide=createRoomGuide(group,state.room,state.page,state.quality==='low'||host.clientWidth<800);box(0,7,-12");
s=s.replace('if(wheel&&!state.reduced)', 'roomGuide?.update(dt,state.guide,state.reduced);if(wheel&&!state.reduced)');
// Authored viewing zones are evaluated in the horizontal plane. The original 3D
// radius was unreachable for left-wall paintings in guided navigation.
s=s.replace("o.getWorldPosition(new THREE.Vector3()).distanceTo(camera.position)<7", "(()=>{const point=o.getWorldPosition(new THREE.Vector3());return Math.hypot(point.x-camera.position.x,point.z-camera.position.z)<(artworks.find(a=>a.id===o.userData.id)?.guide?.triggerRadius??9);})()");
fs.writeFileSync(p,s);
p='data/museumArtworks.json';const entries=JSON.parse(fs.readFileSync(p,'utf8'));const stories={
 '001':'They called it rent.\nI preferred recurring income.',
 '002':'The vault was smaller then.\nSo were my expenses.',
 '007':'It has been turning for years.\nI rarely interrupt it.',
 '008':'A very long trip.\nNo decent chairs.',
 '049':'I kept the receipts.\nEventually, they needed a building.'
};for(const a of entries){if(stories[a.id]){const i=entries.filter(x=>x.room===a.room).findIndex(x=>x.id===a.id)%6;const x=i<3?-7+i*7:i===3?-9:9;const z=i<3?-8:i===5?4:-4;a.guideLevel='featured';a.guide={story:stories[a.id],triggerRadius:10,guideAnchor:[x+(x<0?2:-2),0,z],lookAt:[x,4,z-3]};}}fs.writeFileSync(p,JSON.stringify(entries,null,2)+'\n');
p='components/museum/Museum.tsx';s=fs.readFileSync(p,'utf8');s=s.replace("if(kind==='art'){const a=", "if(kind==='art'){tell(id);const a=");
s=s.replace("{dialogue&&guide&&!menu&&!focus&&", "{dialogue&&guide&&!menu&&!focus&&");
s=s.replace('<div className="focus-details"><div>', '<div className="focus-details">{guide&&focus.guide&&<RayCatDialogue key={focus.id} text={focus.guide.story} reduced={reduced} onClose={()=>setDialogue(null)}/>}<div>');
s=s.replace('{phase===\'inside\'&&<div className="museum-flat-wall">',`{phase==='inside'&&guide&&<Image className="fallback-room-owner" src="/museum/owner-small.webp" alt="RayCat, owner of the Museum" width={160} height={192}/>} {phase==='inside'&&<div className="museum-flat-wall">`);
fs.writeFileSync(p,s);
