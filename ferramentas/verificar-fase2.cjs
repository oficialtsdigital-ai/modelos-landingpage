const fs=require('fs'),path=require('path');
const {chromium}=require('C:/Users/Tami/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const data=require('../dados-site.js'),contact=require('../compartilhado/contato-ts.js');
const root=path.resolve(__dirname,'..'),out=path.join(root,'output/ts-expansao/fase2'),base='http://127.0.0.1:4173/';
const assert=(value,message)=>{if(!value)throw Error(message)};
function inspectPublicFiles(){
 const forbidden=/fit[\s_-]*forma|fitformabsb|3543[\s()-]*4294|51\.763\.016\/0001-97/i;
 let files=0;
 function walk(dir){for(const entry of fs.readdirSync(dir,{withFileTypes:true})){
  const file=path.join(dir,entry.name);assert(!forbidden.test(file),'Identidade anterior no nome: '+file);
  if(entry.isDirectory())walk(file);else{files++;if(/\.(html|js|css|json|xml|txt|svg)$/.test(file))assert(!forbidden.test(fs.readFileSync(file,'utf8')),'Dados da proposta anterior em '+file);}
 }}
 walk(path.join(root,'publicar'));return files;
}
(async()=>{
 fs.mkdirSync(out,{recursive:true});
 const publicFiles=inspectPublicFiles();
 const browser=await chromium.launch({headless:true,channel:'msedge'});
 const errors=[],failed=[],reports=[];
 try{
  const page=await browser.newPage({viewport:{width:1440,height:1000}});
  page.on('pageerror',e=>errors.push(e.message));
  page.on('requestfailed',r=>failed.push({url:r.url(),error:r.failure()?.errorText}));
  page.on('response',r=>{if(r.status()>=400)failed.push({url:r.url(),status:r.status()})});
  await page.goto(base,{waitUntil:'networkidle'});
   assert(data.projects.length===16&&data.projects.filter(p=>p.category==='academias').length===4,'Galeria inconsistente após a fase 4');
   assert(data.projects.filter(p=>p.category==='personal').length===6&&data.projects.filter(p=>p.category==='saude').length===3&&data.plannedModels.length===9,'Páginas preservadas ou planejamento incorretos');
  for(const planned of data.plannedModels){assert((await page.request.get(new URL(planned.url,base).href)).status()===404,'Página planejada exposta: '+planned.id);assert(await page.locator(`[data-project="${planned.id}"]`).count()===0,'Modelo planejado na galeria');}
  assert(await page.locator('h1').textContent()==='Sites reais, feitos para o seu negócio.','Posicionamento limita o público');
  assert((await page.locator('.hero-note').textContent()).includes('negócios de outras cidades'),'Atendimento amplo ausente');
  assert(await page.title()===data.seo.title,'Title institucional fora da configuração');
  assert(await page.locator('meta[property="og:title"]').getAttribute('content')===data.seo.shareTitle,'Open Graph institucional desatualizado');
  const org=JSON.parse(await page.locator('script[type="application/ld+json"]').textContent())['@graph'].find(x=>x['@type']==='Organization');
  assert(org.address.addressLocality==='Seabra'&&!org.address.streetAddress&&!org.areaServed,'Sede incorreta ou área de atendimento limitada');
  await page.locator('[data-filter="academias"]').click();
  assert(await page.locator('[data-project]:visible').count()===4,'Filtro de academias incompleto');
  for(const model of data.projects.filter(p=>p.category==='academias')){
   const card=page.locator(`[data-project="${model.id}"]`);
   assert(await card.isVisible(),'Card invisível: '+model.id);
   assert((await card.locator('img').getAttribute('src')).includes(model.id),'Capa incorreta');
   const quote=new URL(await card.locator('.choose-link').getAttribute('href'));
   assert(quote.pathname==='/'+data.whatsapp&&quote.searchParams.get('text')===contact.demoMessage(model.name),'Mensagem incorreta na galeria');
  }
  const obsolete=await page.request.get(base+'clientes/fit-forma/');assert(obsolete.status()===404,'Rota da proposta anterior ainda pública');
  for(const model of data.projects.filter(p=>p.category==='academias')){
   const url=new URL(model.url,base).href;
   const response=await page.goto(url,{waitUntil:'networkidle'});assert(response.status()===200,'Modelo não encontrado');
   await page.evaluate(()=>document.fonts.ready);
   const meta=contact.demoMetadata(model);
   assert(await page.title()===meta.title,'Título demonstrativo incorreto');
   assert(await page.locator('meta[name="robots"]').getAttribute('content')===meta.robots,'Modelo deve ser demonstrativo');
   assert(await page.locator('h1').count()===1,'Quantidade de h1 incorreta');
   assert(await page.locator('.ts-demo').count()===1,'Barra ausente ou duplicada');
   assert(await page.locator('.ts-demo p').textContent()==='Modelo demonstrativo desenvolvido pela TS Digital.','Texto de demonstração incorreto');
   const back=await page.locator('.ts-demo a').first().evaluate(a=>a.href);
   assert(back===base+'index.html#modelos','Link de retorno fora da prévia');
   assert(await page.locator('[data-demo-quote],.ts-demo-quote').evaluateAll((links,expected)=>links.every(a=>new URL(a.href).pathname===expected.phone&&new URL(a.href).searchParams.get('text')===expected.message),{phone:'/'+data.whatsapp,message:contact.demoMessage(model.name)}),'Contato duplicado/incorreto: '+model.id);
   assert(await page.locator('a[href^="#"]').evaluateAll(links=>links.every(a=>document.getElementById(a.getAttribute('href').slice(1)))),'Âncora sem destino: '+model.id);
   await page.evaluate(async()=>{await Promise.all([...document.images].map(img=>{img.loading='eager';return img.decode()}))});
   assert(await page.locator('img').evaluateAll(imgs=>imgs.every(img=>img.complete&&img.naturalWidth>0)),'Imagem ausente');
   const viewports=[];
   for(const [width,height]of [[1440,1000],[1024,900],[768,1024],[390,844],[320,800]]){
    await page.setViewportSize({width,height});await page.evaluate(()=>scrollTo({top:0,behavior:'instant'}));
    const size=await page.evaluate(()=>({viewport:innerWidth,document:document.documentElement.scrollWidth,overflow:[...document.querySelectorAll('body *')].filter(el=>{const r=el.getBoundingClientRect();return r.width&&r.height&&(r.right>innerWidth+1||r.left< -1)&&getComputedStyle(el).position!=='fixed'&&el.tagName!=='DIALOG'&&!el.closest('.svg-defs')}).map(el=>el.className?.baseVal??el.className).slice(0,12)}));
    assert(size.document===width,'Transbordamento em '+model.id+': '+JSON.stringify(size));viewports.push(size);
    assert(await page.locator('.ts-demo a').evaluateAll(links=>links.every(a=>a.getBoundingClientRect().height>=44)),'Alvos pequenos na barra');
    if(width===1440||width===390)await page.screenshot({path:path.join(out,model.id+'-'+width+'.png'),fullPage:true});
    if(width===390){
     const menu=page.locator('[data-menu]'),nav=page.locator('[data-navigation]');
     assert(await menu.isVisible()&&!await nav.isVisible(),'Menu compacto incorreto');
     await menu.click();assert(await nav.isVisible()&&await menu.getAttribute('aria-expanded')==='true','Menu não abre');
     assert(await page.evaluate(()=>document.documentElement.scrollWidth===innerWidth),'Menu aberto transborda');
     await page.keyboard.press('Escape');assert(!await nav.isVisible()&&await menu.evaluate(e=>e===document.activeElement),'Menu não fecha/restaura foco');
     await menu.click();await nav.locator('a').first().click();assert(!await nav.isVisible(),'Menu não fecha ao navegar');
    }
   }
   await page.setViewportSize({width:1440,height:1000});
   const action=page.locator('[data-demo-action]').first();await action.click();
   assert(await page.locator('#demo-dialog').isVisible(),'Simulação não abre');
   assert(await page.locator('[data-demo-choice]').textContent()===await action.getAttribute('data-demo-action'),'Escolha não foi exibida');
   assert(/simulação|demonstração/.test(await page.locator('#demo-dialog').textContent()),'Ação sem identificação demonstrativa');
   await page.keyboard.press('Escape');assert(!await page.locator('#demo-dialog').isVisible()&&await action.evaluate(e=>e===document.activeElement),'Modal não fecha/restaura foco');
   const plan=page.locator('.plan-card:visible [data-demo-action]').first();await plan.click();
   assert((await page.locator('[data-demo-choice]').textContent()).includes('valor demonstrativo'),'Plano sem simulação');
   await page.locator('#demo-dialog button').click();assert(!await page.locator('#demo-dialog').isVisible(),'Botão de retorno falhou');
   if(model.id==='iron-force'){
    const tabs=page.locator('[role="tab"]');await tabs.first().focus();await page.keyboard.press('ArrowRight');
    assert(await tabs.nth(1).getAttribute('aria-selected')==='true'&&await page.locator('[role="tabpanel"]:visible .plan-card').count()===3,'Aba anual não funciona');
    assert(await page.locator('[role="tabpanel"]:visible .price strong').allTextContents().then(a=>a.join(',')==='129,189,249'),'Valores anuais incorretos');
    await page.keyboard.press('Home');assert(await tabs.first().getAttribute('aria-selected')==='true','Teclado de abas falhou');
   }
   if(model.id==='pulse-studio'){
    for(const day of await page.locator('[data-day]').all()){
     await day.click();assert(await day.getAttribute('aria-pressed')==='true'&&await page.locator('[data-schedule]:visible').count()===1,'Filtro de horários falhou');
     assert(await page.locator('[data-schedule]:visible').getAttribute('data-schedule')===await day.getAttribute('data-day'),'Dia incorreto');
    }
    const reserve=page.locator('[data-schedule]:visible a').first();await reserve.click();
    assert((await page.locator('[data-demo-choice]').textContent()).includes('reserva demonstrativa'),'Reserva sem simulação');await page.keyboard.press('Escape');
   }
   const summary=page.locator('.faq-list summary').first();await summary.click();
   assert(await page.locator('.faq-list details').first().getAttribute('open')!==null,'FAQ não abre');await summary.click();
   await page.emulateMedia({reducedMotion:'reduce'});assert(await page.evaluate(()=>getComputedStyle(document.documentElement).scrollBehavior==='auto'),'Movimento reduzido ausente');
   await page.keyboard.press('Tab');await page.locator('.ts-demo a').first().focus();assert(await page.locator('.ts-demo a').first().evaluate(e=>getComputedStyle(e).outlineStyle!=='none'),'Foco ausente');
   await page.locator('.ts-demo a').first().click();await page.waitForURL(base+'index.html#modelos');
   reports.push({id:model.id,viewports,navigation:true,modal:true,plans:true,faq:true,quote:true,returnToPortfolio:true,reducedMotion:true,images:true});
  }
  const noJS=await browser.newContext({javaScriptEnabled:false,viewport:{width:390,height:844}});
  for(const model of data.projects.filter(p=>p.category==='academias')){
   const plain=await noJS.newPage();await plain.goto(new URL(model.url,base).href);
   assert(await plain.locator('.ts-demo').isVisible()&&await plain.locator('.gym-nav').isVisible(),'Navegação básica sem JS ausente');
   assert((await plain.locator('noscript a').getAttribute('href')).startsWith('https://wa.me/'+data.whatsapp),'Contato sem JS ausente');
   assert(await plain.evaluate(()=>document.documentElement.scrollWidth===innerWidth),'Versão sem JS transborda');await plain.close();
  }await noJS.close();
  assert(!errors.length&&!failed.length,'Erros de navegador: '+JSON.stringify({errors,failed}));
  const result={publicFiles,oldRoute:404,noOldIdentity:true,projects:data.projects.length,planned:data.plannedModels.length,broadPositioning:true,models:reports,noJavaScript:true,errors,failed};
  fs.writeFileSync(path.join(out,'fase2-verificacao.json'),JSON.stringify(result,null,2)+'\n');
   console.log(JSON.stringify({models:reports.map(r=>({id:r.id,widths:r.viewports.map(v=>v.viewport)})),publicFiles,projects:data.projects.length,planned:data.plannedModels.length,oldRoute:404,errors,failed}));
 }finally{await browser.close()}
})().catch(error=>{console.error(error);process.exitCode=1});
