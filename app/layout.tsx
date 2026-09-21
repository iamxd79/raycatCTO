import type { Metadata } from 'next'; import './globals.css';
export const metadata:Metadata={title:'RAYCAT — Hold $RAYCAT. Earn $RAY.',description:'RayCat rewards eligible $RAYCAT holders in $RAY.',metadataBase:new URL('https://raycat.example')};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="en"><body>{children}</body></html>}
