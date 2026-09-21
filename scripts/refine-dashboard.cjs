const fs=require('fs');
let p='lib/stonkboard.ts',s=fs.readFileSync(p,'utf8');
s="import {unstable_cache} from 'next/cache';\n"+s;
s=s.replace('export async function getAnalytics():Promise<Analytics|null>{','async function fetchAnalytics():Promise<Analytics|null>{');
s=s.replace("next:{revalidate:900}","cache:'no-store'");
s+='\nexport const getAnalytics=unstable_cache(fetchAnalytics,["raycat-analytics-v1"],{revalidate:900});\n';fs.writeFileSync(p,s);
