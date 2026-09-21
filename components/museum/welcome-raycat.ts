import * as THREE from 'three';

export function welcomeRayCat(parent: THREE.Group, low: boolean) {
 const owner = new THREE.Group();
 owner.position.set(.75, 0, -5);
 parent.add(owner);
 let disposed = false;
 const material = new THREE.MeshStandardMaterial({transparent:true,alphaTest:.025,roughness:1,metalness:0,side:THREE.FrontSide});
 const figure = new THREE.Mesh(new THREE.PlaneGeometry(2.1,2.52),material);
 figure.position.y=1.26;
 owner.add(figure);
 new THREE.TextureLoader().load(`/museum/owner-${low?'small':'large'}.webp`,texture=>{
  if(disposed){texture.dispose();return;}
  texture.colorSpace=THREE.SRGBColorSpace;material.map=texture;material.needsUpdate=true;
 });
 const shadow=new THREE.Mesh(new THREE.CircleGeometry(.8,32),new THREE.MeshBasicMaterial({color:'#080504',transparent:true,opacity:.28,depthWrite:false}));
 shadow.rotation.x=-Math.PI/2;shadow.scale.y=.48;shadow.position.y=.04;owner.add(shadow);
 const light=new THREE.PointLight('#ffd8a1',12,9,2);light.position.set(1,3,-2);parent.add(light);
 return {update(seconds:number,reduced:boolean){
  const ahead=reduced?0:Math.max(0,seconds-4.6);
  owner.position.z=-5-ahead*1.5;
  figure.position.y=1.26+(reduced?0:Math.sin(seconds*1.6)*.008);
  material.opacity=reduced?1:1-THREE.MathUtils.smoothstep(seconds,5.2,6.8);
  light.intensity=12*THREE.MathUtils.smoothstep(seconds,0,1.4);
 },dispose(){disposed=true;}};
}
