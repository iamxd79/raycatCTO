import {artworks} from './model';

// Only warm the next wall after explicit pointer/keyboard intent. No GPU cache.
const warmed=new Set<string>();
export function prefetchWall(room:string,page=0){
 const connection=(navigator as Navigator & {connection?:{saveData?:boolean;effectiveType?:string}}).connection;
 if(connection?.saveData||connection?.effectiveType?.includes('2g'))return;
 for(const art of artworks.filter(a=>a.room===room).slice(page*6,page*6+6)){
  if(warmed.has(art.thumbnail))continue;
  warmed.add(art.thumbnail);
  const image=new window.Image();image.src=art.thumbnail;
  image.onerror=()=>warmed.delete(art.thumbnail);
 }
}
