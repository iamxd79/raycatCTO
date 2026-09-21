const {chromium}=require('@playwright/test');
async function main(){const browser=await chromium.launch({channel:'chrome',headless:true});
 for(const [name,width,reducedMotion] of [['desktop',1440,'no-preference'],['mobile',390,'no-preference'],['reduced',390,'reduce']]){
  const page=await browser.newPage({viewport:{width,height:900},reducedMotion});const errors=[];page.on('pageerror',e=>errors.push(e.message));
  await page.goto('http://localhost:3000/museum');await page.getByRole('button',{name:'ENTER',exact:false}).click();
  await page.locator('.phase-welcome').waitFor();await page.waitForTimeout(reducedMotion==='reduce'?1200:3300);
  await page.screenshot({path:`review/owner-${name}.jpg`,type:'jpeg',quality:75});
  await page.locator('.phase-inside').waitFor({timeout:12000});
  if(errors.length)throw Error(errors.join('\n'));console.log(name+': entrance → welcome → Grand Hall passed');await page.close();
 }await browser.close();}
main().catch(e=>{console.error(e);process.exit(1)});
