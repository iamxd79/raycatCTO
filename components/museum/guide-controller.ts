import * as THREE from 'three';
import {artworks, MuseumState} from './model';

/** One actor survives scene rebuilds. No walking is simulated without walk frames. */
export function createGuideController(scene:THREE.Scene, low:boolean, onError:()=>void){
 const actor=new THREE.Group();scene.add(actor);
 const material=new THREE.MeshStandardMaterial({transparent:true,alphaTest:.025,roughness:1,side:THREE.DoubleSide});
 const figure=new THREE.Mesh(new THREE.PlaneGeometry(2.1,2.52),material);figure.position.y=1.26;actor.add(figure);
 const light=new THREE.PointLight('#39d0d8',8,8);light.position.set(0,3,2);actor.add(light);
 let disposed=false,loaded=false,location='',opacity=0;
 const destination=new THREE.Vector3();
 let pending=false;
 const ready=new Promise<void>((resolve,reject)=>{
  new THREE.TextureLoader().load(low?'/museum/owner-small.webp':'/museum/owner-large.webp',texture=>{
   if(disposed){texture.dispose();resolve();return;}
   texture.colorSpace=THREE.SRGBColorSpace;material.map=texture;material.needsUpdate=true;loaded=true;resolve();
  },undefined,()=>{reject(new Error('Guide texture unavailable'));});
 });
 void ready.catch(()=>{if(!disposed)onError();});
 return {ready,update(dt:number,state:MuseumState,camera:THREE.Camera){
  const outside=state.phase!=='inside';
  const art=artworks.find(a=>a.id===state.activeArtwork);
  const key=outside?'entrance':`${state.room}:${state.page}:${art?.id||''}`;
  if(key!==location){
   location=key;const anchor=!outside&&art?.guide?.guideAnchor;
   destination.set(anchor?anchor[0]:outside?.75:3,0,anchor?anchor[2]:outside?-5:-3);
   pending=true;
  }
  const show=loaded&&state.guide&&(outside?state.phase==='welcome':true);
  // Re-anchor only while invisible, never slide a still image across the floor.
  opacity=THREE.MathUtils.clamp(opacity+(show&&!pending?1:-1)*dt*4,0,1);
  if(pending&&(opacity===0||state.reduced)){actor.position.copy(destination);pending=false;opacity=0;}
  if(state.reduced)opacity=show?1:0;
  material.opacity=opacity;actor.visible=opacity>0;light.intensity=8*opacity;
  actor.rotation.y=Math.atan2(camera.position.x-actor.position.x,camera.position.z-actor.position.z);
  actor.userData={state:state.focus?'presenting':outside?'welcoming':'waiting',artwork:art?.id||null};
 },dispose(){disposed=true;material.map?.dispose();material.dispose();figure.geometry.dispose();scene.remove(actor);}};
}
