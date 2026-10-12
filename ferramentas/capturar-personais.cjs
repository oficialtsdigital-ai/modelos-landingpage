const fs=require('fs'),path=require('path');
const {chromium}=require('C:/Users/Tami/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const sharp=require('C:/Users/Tami/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/sharp');
const {projects}=require('./dados-personais.cjs');
const root=path.resolve(__dirname,'..'),out=path.join(root,'output/ts-auditoria/personais');
(async()=>{fs.mkdirSync(out,{recursive:true});const browser=await chromium.launch({channel:'msedge',headless:true});try{const page=await browser.newPage({reducedMotion:'reduce'});for(const p of projects){
 await page.setViewportSize({width:1440,height:1000});const response=await page.goto('http://127.0.0.1:4173/'+p.url.slice(2),{waitUntil:'networkidle'});if(response.status()!==200)throw Error('Captura indisponível: '+p.id);
 await page.evaluate(()=>document.fonts.ready);await page.locator('img').evaluateAll(imgs=>Promise.all(imgs.map(i=>{i.loading='eager';return i.decode()})));
 await page.screenshot({path:path.join(out,p.id+'-desktop.png'),fullPage:true});const shot=await page.screenshot();
 await sharp(shot).resize(1000,699).webp({quality:84}).toFile(path.join(root,'assets/catalogo',p.id+'.webp'));await sharp(shot).resize(720,503).webp({quality:80}).toFile(path.join(root,'assets/catalogo',p.id+'-720.webp'));
 await page.setViewportSize({width:390,height:844});await page.screenshot({path:path.join(out,p.id+'-mobile.png'),fullPage:true});const mobile=await page.screenshot();await sharp(mobile).webp({quality:82}).toFile(path.join(root,'assets/catalogo',p.id+'-mobile.webp'));await sharp(mobile).resize(230).webp({quality:78}).toFile(path.join(root,'assets/catalogo',p.id+'-mobile-230.webp'));console.log('Captura real: '+p.id);
 }}finally{await browser.close()}})().catch(e=>{console.error(e);process.exitCode=1});
