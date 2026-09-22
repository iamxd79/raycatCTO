const {chromium,expect}=require('@playwright/test');
(async()=>{
 const browser=await chromium.launch({channel:'chrome',headless:true});
 try{
  const page=await browser.newPage({reducedMotion:'reduce'});
  let release;const gate=new Promise(resolve=>{release=resolve;});
  await page.route('**/museum/owner-*.webp',async route=>{await gate;await route.continue();});
  await page.goto('http://localhost:3000/museum',{waitUntil:'domcontentloaded'});
  await expect(page.locator('.museum-canvas canvas')).toHaveCount(1);
  await page.waitForTimeout(1000);
  await expect(page.locator('main')).toHaveClass(/phase-outside/);
  await expect(page.locator('.museum-loading')).toBeVisible();
  await expect(page.getByRole('button',{name:'SKIP INTRO'})).toBeDisabled();
  release();
  await expect(page.locator('.museum-loading')).toHaveCount(0);
  await expect(page.locator('main')).toHaveClass(/phase-inside/,{timeout:10000});
  await page.unroute('**/museum/owner-*.webp');
  await page.route('**/museum/owner-*.webp',route=>route.abort());
  await page.goto('http://localhost:3000/museum');
  await expect(page.locator('main')).toHaveClass(/museum-fallback/);
  await expect(page.locator('.museum-loading')).toHaveCount(0);
  console.log('PASS: delayed guide blocks intro, ready assets release intro, failed asset enables 2D');
 }finally{await browser.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});
