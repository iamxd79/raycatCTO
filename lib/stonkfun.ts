import { config } from './config';
export type LiveData={token?:any; rewards?:any; burns?:any; fetchedAt?:string; unavailable?:boolean};
async function get(path:string){const r=await fetch(`${config.api}/tokens/${config.mint}${path}`,{next:{revalidate:path?90:45}});if(!r.ok)throw new Error('unavailable');return r.json()}
export async function getRaycatData():Promise<LiveData>{try{const [t,r,b]=await Promise.all([get(''),get('/rewards'),get('/burns')]);return{token:t.data?.token,rewards:r.data?.rewards,burns:b.data?.totals,fetchedAt:new Date().toISOString()}}catch{return{unavailable:true}}}
