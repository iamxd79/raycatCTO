export const valid=(n:unknown):n is number=>typeof n==='number'&&Number.isFinite(n);
export const compact=(n:unknown)=>valid(n)?new Intl.NumberFormat('en-US',{notation:'compact',maximumFractionDigits:2}).format(n):'—';
export const usd=(n:unknown)=>valid(n)?'$'+(Math.abs(n)>=1000?compact(n):n.toFixed(2)):'—';
export const price=(n:unknown)=>valid(n)?new Intl.NumberFormat('en-US',{style:'currency',currency:'USD',maximumSignificantDigits:5}).format(n):'—';
export const percent=(n:unknown,signed=false)=>valid(n)?`${signed&&n>0?'+':''}${n.toFixed(1)}%`:'—';
