import { chromium } from '@playwright/test';
import { mkdir, writeFile } from 'node:fs/promises';
const output = process.env.SCREENSHOT_DIR || 'artifacts/layout-only';
const base = process.env.TEST_BASE_URL || 'http://localhost:3000';
await mkdir(output, {recursive:true});
const browser = await chromium.launch({proxy:process.env.HTTPS_PROXY?{server:process.env.HTTPS_PROXY,bypass:'localhost,127.0.0.1'}:undefined,executablePath:process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE || undefined});
const page = await browser.newPage({deviceScaleFactor:1});
const routes = [['home','/'],['stays','/stays'],['stay-detail','/stays/sunrise-water-villa'],['experiences','/experiences'],['experience-detail','/experiences/snorkeling'],['destinations','/destinations'],['destination-detail','/destinations/maafushi'],['travel-guide','/travel-guide'],['article','/travel-guide/best-time-to-visit'],['about','/about'],['plan-your-trip','/plan-your-trip']];
const results=[];
try {
 for (const [device,width] of [['desktop',1440],['mobile',390]]) {
  await page.setViewportSize({width,height:1000});
  for (const [name,route] of routes) {
   await page.goto(base+route,{waitUntil:'domcontentloaded'});
   await page.locator('main h1').waitFor();
   await page.evaluate(()=>document.fonts.ready);
   // Scroll through the page so below-fold lazy photographs can load.
   await page.evaluate(async()=>{for(let y=0;y<document.body.scrollHeight;y+=800){window.scrollTo(0,y);await new Promise(r=>setTimeout(r,30));}window.scrollTo(0,0);});
   await page.waitForTimeout(600);
   const images=await page.locator('img').evaluateAll(items=>({total:items.length,loaded:items.filter(i=>i.complete&&i.naturalWidth>0).length}));
   const overflow=await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth);
   await page.screenshot({path:`${output}/${name}-${device}.png`,fullPage:true});
   results.push({route,device,width,images,overflow});
   console.log(name,device,JSON.stringify({images,overflow}));
  }
 }
 await writeFile(`${output}/capture-report.json`,JSON.stringify({capturedAt:new Date().toISOString(),note:'Not client-ready if photographs are unavailable. Read per-route image counts.',results},null,2));
} finally { await browser.close(); }
