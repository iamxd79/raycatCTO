import {Artwork,rooms} from './model';
export default function Navigation({room,page,pages,seen,total,list,onRoom,onWall,onArt,onReset}:{room:string;page:number;pages:number;seen:number;total:number;list:Artwork[];onRoom:(id:string)=>void;onWall:(n:number)=>void;onArt:(a:Artwork)=>void;onReset:()=>void}){
 const index=rooms.findIndex(r=>r.id===room);
 return <nav className="museum-navigation" aria-label="Museum navigation">
   <div className="museum-wayfinding"><button onClick={()=>onRoom('hall')} disabled={room==='hall'} aria-label="Return to Grand Hall">⌂ <span>Grand Hall</span></button><label><span className="sr-only">Choose a room</span><select aria-label="Choose a room" value={room} onChange={e=>onRoom(e.target.value)}>{rooms.map(r=><option key={r.id} value={r.id}>{r.name}</option>)}{room==='secret'&&<option value="secret">Secret Treasury</option>}</select></label><button onClick={()=>onRoom(rooms[(index+1+rooms.length)%rooms.length].id)}>Next room →</button></div>
   {room!=='hall'&&<div className="museum-art-navigation"><button aria-label="Previous wall" disabled={page===0} onClick={()=>onWall(-1)}>←</button><label><span className="sr-only">Choose an artwork on this wall</span><select aria-label="Choose an artwork on this wall" value="" onChange={e=>{const a=list.find(a=>a.id===e.target.value);if(a)onArt(a);}}><option value="" disabled>Inspect artwork · wall {page+1}/{pages}</option>{list.slice(page*6,page*6+6).map(a=><option key={a.id} value={a.id}>{a.title}</option>)}</select></label><button aria-label="Next wall" disabled={page>=pages-1} onClick={()=>onWall(1)}>→</button></div>}
   <div className="museum-navigation-meta"><span>{seen} / {total} sightings</span><button onClick={onReset}>Reset view</button></div>
 </nav>;
}
