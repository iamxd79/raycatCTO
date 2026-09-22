'use client';
import {useEffect,useState} from 'react';
export default function RayCatDialogue({text,reduced,onClose}:{text:string;reduced:boolean;onClose:()=>void}){
 const [count,setCount]=useState(reduced?text.length:0);
 useEffect(()=>{setCount(reduced?text.length:0);if(reduced)return;let current=0;const timer=setInterval(()=>{current=Math.min(text.length,current+2);setCount(current);if(current===text.length)clearInterval(timer);},32);return()=>clearInterval(timer);},[text,reduced]);
 return <aside className="raycat-dialogue" aria-label="RayCat's recollection"><span>RAYCAT</span><p aria-live="polite" className="guide-sr">{text}</p><p aria-hidden="true">{text.slice(0,count)}<span className="guide-untyped">{text.slice(count)}</span></p><button onClick={()=>count<text.length?setCount(text.length):onClose()}>{count<text.length?'Show full text':'Close'}</button></aside>;
}
