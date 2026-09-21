'use client';
import {useEffect,useState} from 'react';
export default function RayCatDialogue({text,reduced,onClose}:{text:string;reduced:boolean;onClose:()=>void}){
 const [count,setCount]=useState(reduced?text.length:0);
 useEffect(()=>{setCount(reduced?text.length:0);if(reduced)return;const timer=setInterval(()=>setCount(n=>Math.min(text.length,n+2)),32);return()=>clearInterval(timer);},[text,reduced]);
 return <aside className="raycat-dialogue" aria-label="RayCat's recollection"><span>RAYCAT</span><p aria-live="polite" className="guide-sr">{text}</p><p aria-hidden="true">{text.slice(0,count)}<span className="guide-untyped">{text.slice(count)}</span></p><button onClick={()=>count<text.length?setCount(text.length):onClose()}>{count<text.length?'Show full text':'Close'}</button></aside>;
}
