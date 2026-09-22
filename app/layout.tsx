import type { Metadata } from 'next'; import './tokens.css'; import './globals.css';
export const metadata:Metadata={metadataBase:new URL(process.env.NEXT_PUBLIC_SITE_URL||'http://localhost:3000'),title:'RAYCAT — Hold $RAYCAT. Earn $RAY.',description:'RayCat rewards eligible $RAYCAT holders in $RAY.',icons:{icon:'/icon.png',apple:'/apple-icon.png'},openGraph:{images:[{url:'/images/brand/raycat-og.png',width:1200,height:630,alt:'RAYCAT — Hold $RAYCAT. Earn $RAY.'}],title:'RAYCAT — Hold $RAYCAT. Earn $RAY.',description:'RayCat rewards eligible $RAYCAT holders in $RAY.'},twitter:{card:'summary_large_image',images:['/images/brand/raycat-og.png'],title:'RAYCAT — Hold $RAYCAT. Earn $RAY.'}};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="en"><body>{children}</body></html>}

import "./brand.css";

import "./hero-composition.css";

import "./layout-system.css";
