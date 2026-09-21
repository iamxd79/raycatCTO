'use client';
import {useEffect,useRef,useState} from 'react';
import Image from 'next/image';
import {Menu,X,ArrowUpRight} from 'lucide-react';
import {config} from '../lib/config';
import './site-nav.css';
const links=[['top','Home'],['live','Live'],['lore','Lore'],['rewards','Rewards'],['flywheel','Flywheel'],['museum','Museum'],['community','Community'],['buy','Buy']];
export default function SiteNav(){const [open,setOpen]=useState(false);const toggle=useRef<HTMLButtonElement>(null),panel=useRef<HTMLElement>(null);
 useEffect(()=>{if(!open)return;const close=(e:KeyboardEvent)=>{if(e.key==='Escape'){setOpen(false);toggle.current?.focus();}};const outside=(e:PointerEvent)=>{if(!panel.current?.contains(e.target as Node)&&!toggle.current?.contains(e.target as Node))setOpen(false);};const resize=()=>{if(innerWidth>1150)setOpen(false);};document.addEventListener('keydown',close);document.addEventListener('pointerdown',outside);window.addEventListener('resize',resize);return()=>{document.removeEventListener('keydown',close);document.removeEventListener('pointerdown',outside);window.removeEventListener('resize',resize);};},[open]);
 return <header className="site-nav"><a className="brand" href="#top" onClick={()=>setOpen(false)}><Image src="/images/raycat/canonical-corrected.webp" alt="" width={36} height={36}/>RAYCAT</a><nav id="section-navigation" ref={panel} aria-label="Main navigation" className={open?'is-open':''}>{links.map(([id,label])=><a key={id} href={`#${id}`} onClick={()=>setOpen(false)}>{label}</a>)}</nav><a className="button small nav-buy" href={config.buyUrl||config.tokenUrl} target="_blank" rel="noreferrer">BUY $RAYCAT <ArrowUpRight size={14}/></a><button className="nav-toggle" ref={toggle} aria-label={open?'Close menu':'Open menu'} aria-expanded={open} aria-controls="section-navigation" onClick={()=>setOpen(v=>!v)}>{open?<X size={22}/>:<Menu size={22}/>}</button></header>;
}
