const fs=require('fs'),path=require('path');
const {chromium}=require('C:/Users/Tami/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const sharp=require('C:/Users/Tami/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/sharp');
const root=path.resolve(__dirname,'..'),out=path.join(root,'output/ts-expansao/fase4');
const base=process.env.TS_PREVIEW_URL||'http://127.0.0.1:4173/';
const ids=['brasa-sabor','sushi-kai','bella-pizza'];
(async()=>{
 fs.mkdirSync(out,{recursive:true});
 const browser=await chromium.launch({headless:true,channel:'msedge'});
 try{
  const page=await browser.newPage();
  for(const id of ids){
   await page.setViewportSize({width:1440,height:1000});
   const url=new URL('modelos/restaurantes/'+id+'/',base).href;
   const response=await page.goto(url,{waitUntil:'networkidle'});
   if(!response||response.status()!==200)throw new Error('Modelo indisponível para captura: '+id+' ('+(response?.status()||'sem resposta')+')');
   await page.evaluate(()=>document.fonts.ready);
   await page.evaluate(async()=>{await Promise.all([...document.images].map(i=>{i.loading='eager';return i.decode().catch(()=>{})}))});
   await page.evaluate(async()=>{
    const step=Math.round(window.innerHeight*0.8);
    for(let y=0;y<document.body.scrollHeight;y+=step){
     scrollTo({top:y,behavior:'instant'});
     await new Promise(r=>setTimeout(r,120));
    }
    scrollTo({top:0,behavior:'instant'});
   });
   await page.evaluate(()=>scrollTo({top:0,behavior:'instant'}));
   await page.waitForTimeout(1400);
   await page.screenshot({path:path.join(out,id+'-desktop.png'),fullPage:true});
   const desktop=await page.screenshot();
   await sharp(desktop).resize(1000,699).webp({quality:86}).toFile(path.join(root,'assets/catalogo',id+'.webp'));
   await sharp(desktop).resize(720,503).webp({quality:82}).toFile(path.join(root,'assets/catalogo',id+'-720.webp'));
   await page.setViewportSize({width:390,height:844});
   await page.evaluate(()=>scrollTo({top:0,behavior:'instant'}));
   await page.screenshot({path:path.join(out,id+'-mobile.png'),fullPage:true});
   const mobile=await page.screenshot();
   await sharp(mobile).webp({quality:86}).toFile(path.join(root,'assets/catalogo',id+'-mobile.webp'));
   await sharp(mobile).resize({width:230}).webp({quality:82}).toFile(path.join(root,'assets/catalogo',id+'-mobile-230.webp'));
   console.log('Capturas reais: '+id);
  }
 }finally{await browser.close();}
})().catch(error=>{console.error(error);process.exitCode=1});
