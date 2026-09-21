import {unstable_cache} from 'next/cache';
import {config} from './config';
export type Analytics={observedAt?:string;holders?:number;growth7d?:number;apr7d?:number;rayPrice?:number;priceAt?:string;rank?:number;note?:string};
async function fetchAnalytics():Promise<Analytics|null>{
 try{
  const response=await fetch('https://thestonkboard.com/api/snapshot',{cache:'no-store',signal:AbortSignal.timeout(8000)});
  if(!response.ok)throw Error('Analytics unavailable');
  const snapshot=await response.json();
  if(snapshot.schemaVersion!==1||!Array.isArray(snapshot.coins))return null;
  const coin=snapshot.coins.find((c:{mint:string})=>c.mint===config.mint);if(!coin)return null;
  const y=coin.yield;
  return {observedAt:y?.holderObservedAt,holders:y?.holderCount,growth7d:coin.holderChanges?.['7d']?.status==='ready'?coin.holderChanges['7d'].change:undefined,apr7d:y?.hours168h===168?y.apr7d:undefined,rayPrice:coin.rewardsPaid?.quotePriceUsd,priceAt:coin.rewardsPaid?.observedAt,rank:coin.rank,note:y?.note};
 }catch{return null;}
}

export const getAnalytics=unstable_cache(fetchAnalytics,["raycat-analytics-v1"],{revalidate:900});
