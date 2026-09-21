import * as THREE from 'three';
import {artworks} from './model';

/** A grounded, stationary owner; walking is intentionally gated on real frames. */
export function createRoomGuide(parent:THREE.Group,room:string,page:number,low:boolean){
 const actor=new THREE.Group();parent.add(actor);
 const art=artworks.filter(a=>a.room===room).slice(page*6,page*6+6).find(a=>a.guide);
 const anchor=art?.guide?.guideAnchor??[3,0,-3];actor.position.set(anchor[0],anchor[1],anchor[2]);
 const material=new THREE.MeshStandardMaterial({transparent:true,alphaTest:.03,roughness:1,depthWrite:false});
 const figure=new THREE.Mesh(new THREE.PlaneGeometry(2.1,2.52),material);figure.position.y=1.26;actor.add(figure);
 let disposed=false;new THREE.TextureLoader().load(`/museum/owner-${low?'small':'large'}.webp`,texture=>{if(disposed){texture.dispose();return;}texture.colorSpace=THREE.SRGBColorSpace;material.map=texture;material.needsUpdate=true;});
 const shadowMaterial=new THREE.MeshBasicMaterial({color:'#090604',transparent:true,opacity:.25,depthWrite:false});
 const shadow=new THREE.Mesh(new THREE.CircleGeometry(.65,32),shadowMaterial);shadow.rotation.x=-Math.PI/2;shadow.scale.y=.45;shadow.position.y=.035;actor.add(shadow);
 const light=new THREE.PointLight('#ffe2ba',8,7,2);light.position.set(anchor[0],3,anchor[2]+2);parent.add(light);
 let opacity=0;
 return {update(dt:number,on:boolean,reduced:boolean){
  // Remain seated/standing in the environment when disabled, rather than popping away.
  opacity=Math.min(1,opacity+dt*1.5);material.opacity=opacity;shadowMaterial.opacity=.25*opacity;
  figure.rotation.y=on?-.06:0;
  actor.userData.guideState=on?'waiting':'idle';
 },dispose(){disposed=true;}};
}
