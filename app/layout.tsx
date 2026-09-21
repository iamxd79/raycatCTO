import type { Metadata } from 'next'; import './globals.css';
export const metadata:Metadata={title:'RAYCAT — Hold $RAYCAT. Earn $RAY.',description:'RayCat rewards eligible $RAYCAT holders in $RAY.',icons:{icon:'/icon.png',apple:'/apple-icon.png'},openGraph:{title:'RAYCAT — Hold $RAYCAT. Earn $RAY.',description:'RayCat rewards eligible $RAYCAT holders in $RAY.'},twitter:{card:'summary',title:'RAYCAT — Hold $RAYCAT. Earn $RAY.'}};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="en"><body>{children}</body></html>}

import "./brand.css";

import "./hero-composition.css";

import "./layout-system.css";
