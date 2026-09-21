const fs=require('fs');
let path='app/page.tsx',s=fs.readFileSync(path,'utf8');
s="import Dashboard from '../components/dashboard/Dashboard';\nimport {getAnalytics} from '../lib/stonkboard';\n"+s;
s=s.replace('const d=await getRaycatData();','const [d,analytics]=await Promise.all([getRaycatData(),getAnalytics()]);');
s=s.replace(/<section className="live section">[\s\S]*?<\/section>/,'<Dashboard initial={{official:d,analytics}}/>');fs.writeFileSync(path,s);
path='lib/stonkfun.ts';s=fs.readFileSync(path,'utf8');
s=s.replace("{next:{revalidate:path?90:45}}","{next:{revalidate:path?90:45},signal:AbortSignal.timeout(8000)}");
s=s.replace(/export async function getRaycatData[\s\S]*/,`export async function getRaycatData():Promise<LiveData>{
 const results=await Promise.allSettled([get(''),get('/rewards'),get('/burns')]);
 const [t,r,b]=results.map(result=>result.status==='fulfilled'?result.value:undefined);
 const dates=[t,r,b].map(x=>x?.meta?.generatedAt).filter((v):v is string=>typeof v==='string'&&Number.isFinite(Date.parse(v))).sort();
 return {token:t?.data?.token,rewards:r?.data?.rewards,burns:b?.data?.totals,fetchedAt:dates[0],unavailable:results.some(x=>x.status==='rejected')};
}
`);fs.writeFileSync(path,s);
