import { config } from './config';
export type LiveData={token?:any; rewards?:any; burns?:any; fetchedAt?:string; unavailable?:boolean};
async function get(path:string){const r=await fetch(`${config.api}/tokens/${config.mint}${path}`,{next:{revalidate:path?90:45},signal:AbortSignal.timeout(8000)});if(!r.ok)throw new Error('unavailable');return r.json()}
export async function getRaycatData():Promise<LiveData>{
 const results=await Promise.allSettled([get(''),get('/rewards'),get('/burns')]);
 const [t,r,b]=results.map(result=>result.status==='fulfilled'?result.value:undefined);
 const dates=[t,r,b].map(x=>x?.meta?.generatedAt).filter((v):v is string=>typeof v==='string'&&Number.isFinite(Date.parse(v))).sort();
 return {token:t?.data?.token,rewards:r?.data?.rewards,burns:b?.data?.totals,fetchedAt:dates[0],unavailable:results.some(x=>x.status==='rejected')};
}
