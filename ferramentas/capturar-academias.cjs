const fs=require('fs'),path=require('path');
const {pathToFileURL}=require('url');
const {chromium}=require('C:/Users/Tami/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const sharp=require('C:/Users/Tami/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/sharp');
const root=path.resolve(__dirname,'..'),out=path.join(root,'output/ts-expansao/fase2');
(async()=>{
 fs.mkdirSync(out,{recursive:true});
 const browser=await chromium.launch({headless:true,channel:'msedge'});
 try{
  const page=await browser.newPage();
  for(const id of ['iron-force','viva-fit','pulse-studio','movimento-performance']){
   await page.setViewportSize({width:1440,height:1000});
   await page.goto(pathToFileURL(path.join(root,'modelos/academias',id,'index.html')).href,{waitUntil:'networkidle'});
   await page.evaluate(()=>document.fonts.ready);
   await page.screenshot({path:path.join(out,id+'-desktop.png'),fullPage:true});
   const desktop=await page.screenshot();
   await sharp(desktop).resize(1000,699).webp({quality:86}).toFile(path.join(root,'assets/catalogo',id+'.webp'));
   await sharp(desktop).resize(720,503).webp({quality:82}).toFile(path.join(root,'assets/catalogo',id+'-720.webp'));
   await page.setViewportSize({width:390,height:844});
   await page.screenshot({path:path.join(out,id+'-mobile.png'),fullPage:true});
   if(id==='iron-force'){
    const mobile=await page.screenshot();
    await sharp(mobile).webp({quality:86}).toFile(path.join(root,'assets/catalogo/iron-force-mobile.webp'));
    await sharp(mobile).resize({width:230}).webp({quality:82}).toFile(path.join(root,'assets/catalogo/iron-force-mobile-230.webp'));
   }
   console.log('Capturas reais: '+id);
  }
 }finally{await browser.close();}
})().catch(error=>{console.error(error);process.exitCode=1});
