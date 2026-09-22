const {chromium,expect}=require('@playwright/test');
(async()=>{
 const browser=await chromium.launch({channel:'chrome',headless:true});
 try{
  const page=await browser.newPage({reducedMotion:'reduce'});
  const errors=[];page.on('pageerror',e=>errors.push(e.message));
  await page.goto('http://localhost:3000/museum?art=001');
  await expect(page.locator('dialog[open] .raycat-dialogue')).toBeVisible();
  await page.waitForTimeout(2000);
  await expect(page.locator('dialog[open] .raycat-dialogue')).toBeVisible();
  await page.getByRole('button',{name:'NEXT →',exact:true}).click();
  await expect(page.locator('dialog .focus-top')).toContainText('002');
  await expect(page.locator('dialog .raycat-dialogue')).toContainText('vault');
  await page.getByRole('button',{name:'CLOSE ✕',exact:true}).click();
  await page.getByRole('button',{name:'GUIDE: ON',exact:true}).click();
  await expect(page.locator('.raycat-dialogue')).toHaveCount(0);
  await page.goto('http://localhost:3000/museum?room=old-world&fallback=1');
  await page.locator('.flat-art').first().click();
  await expect(page.locator('dialog .raycat-dialogue')).toBeVisible();
  await page.getByRole('button',{name:'CLOSE ✕',exact:true}).click();
  await page.locator('.flat-art').first().click();
  await expect(page.locator('dialog .raycat-dialogue')).toBeVisible();
  await page.screenshot({path:'review/museum-p0-focus.png'});
  if(errors.length)throw Error(errors.join('\n'));
  console.log('PASS: deep link, persistent focus dialogue, next artwork, guide toggle, 2D reopen; no page errors');
 }finally{await browser.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});
