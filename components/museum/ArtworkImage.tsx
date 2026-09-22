'use client';
import {useState} from 'react';
import Image from 'next/image';

/** Local derivatives are already optimized; share their cache with WebGL. */
export default function ArtworkImage({src,alt,preview,fill=false,width,height}:{src:string;alt:string;preview?:string;fill?:boolean;width?:number;height?:number}){
 const [status,setStatus]=useState<'loading'|'ready'|'error'>('loading');
 const [attempt,setAttempt]=useState(0);
 return <div className={`museum-art-image ${fill?'is-focus':''}`} aria-busy={status==='loading'}>
  {preview&&<Image src={preview} alt="" fill aria-hidden="true" className="art-preview"/>}
  <Image key={attempt} src={src} alt={alt} fill={fill} width={fill?undefined:width} height={fill?undefined:height} onLoad={()=>setStatus('ready')} onError={()=>setStatus('error')} style={{opacity:status==='ready'?1:0}}/>
  {status!=='ready'&&<div className="museum-image-status" role="status">{status==='loading'?'Loading artwork…':<>Artwork unavailable. <button onClick={e=>{e.stopPropagation();setStatus('loading');setAttempt(n=>n+1);}}>Retry image</button></>}</div>}
 </div>;
}
