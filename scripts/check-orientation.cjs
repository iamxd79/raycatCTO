const {chromium}=require('@playwright/test');
const fs=require('fs');
async function main(){
 const browser=await chromium.launch({channel:'chrome',headless:true});
 const results=[];
 for(const [name,width,height] of [['desktop',1440,1000],['mobile',390,844]]){
  const page=await browser.newPage({viewport:{width,height}});
  for(const route of ['/','/museum','/museum?room=old-world']){
   await page.goto('http://localhost:3000'+route,{waitUntil:'networkidle'});
   await page.locator('img').evaluateAll(async nodes=>{await Promise.all(nodes.map(n=>{n.loading='eager';return n.decode().catch(()=>{});}));});
   await page.screenshot({path:`review/orientation/${name}-${route==='/'?'home':route.includes('?')?'room':'museum'}.jpg`,fullPage:true,type:'jpeg',quality:65});
   const images=await page.locator('img').evaluateAll(nodes=>nodes.map(n=>({src:n.currentSrc,loaded:n.complete&&n.naturalWidth>0,transform:getComputedStyle(n).transform})));
   if(images.some(i=>i.src.includes('canonical.webp')))throw Error('Stale canonical on '+route);
   if(images.some(i=>!i.loaded))throw Error('Unloaded image on '+route);
   results.push({name,route,images});
  }
  await page.close();
 }
 await browser.close();fs.writeFileSync('review/orientation/browser-check.json',JSON.stringify(results,null,2));console.log('Desktop/mobile home and Museum image checks passed.');
}
main().catch(e=>{console.error(e);process.exit(1)});
