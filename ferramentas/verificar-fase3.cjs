const fs=require('fs'),path=require('path'),crypto=require('crypto');
const {chromium}=require('C:/Users/Tami/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const data=require('../dados-site.js'),contact=require('../compartilhado/contato-ts.js');
const root=path.resolve(__dirname,'..'),out=path.join(root,'output/ts-expansao/fase3'),base='http://127.0.0.1:4173/';
const assert=(value,message)=>{if(!value)throw Error(message)};
const HEALTH=['odonto-prime','vitalis-clinica','equilibrio-fisio'];
const HEALTH_DIR=id=>'modelos/saude/'+id+'/index.html';
const UNUSED_INTERESTS=['beleza'];
function inspectPublicFiles(){
 const forbidden=/fit[\s_-]*forma|fitformabsb|3543[\s()-]*4294|51\.763\.016\/0001-97/i;
 let files=0;
 function walk(dir){for(const entry of fs.readdirSync(dir,{withFileTypes:true})){
  const file=path.join(dir,entry.name);assert(!forbidden.test(file),'Identidade anterior no nome: '+file);
  if(entry.isDirectory())walk(file);else{files++;if(/\.(html|js|css|json|xml|txt|svg)$/.test(file))assert(!forbidden.test(fs.readFileSync(file,'utf8')),'Dados da proposta anterior em '+file);}
 }}
 walk(path.join(root,'publicar'));return files;
}
function inspectBaseline(){
 const baseline=JSON.parse(fs.readFileSync(path.join(out,'paginas-preservadas.json'),'utf8'));
 for(const [file,hash] of Object.entries(baseline)){
  for(const source of [path.join(root,file),path.join(root,'publicar',file)]){
   assert(fs.existsSync(source),'Arquivo preservado ausente: '+source);
   assert((file.startsWith('modelos/')&&file.endsWith('index.html'))?require('./preservacao.cjs')(root,file,source):crypto.createHash('sha256').update(fs.readFileSync(source)).digest('hex')===hash,'Arquivo preservado alterado: '+source);
  }
 }
 return Object.keys(baseline).length;
}
function inspectPrivacy(file){
 const html=fs.readFileSync(path.join(root,file),'utf8');
 assert(!/\b(name|telefone|phone|email|e-mail|cpf|rg)\s*=\s*"(?:text|tel|email)"/i.test(html),'Campo de dados pessoais em '+file);
 assert(!/type="(?:tel|email)"/i.test(html),'Entrada de contato em '+file);
 assert(!/(CRM|CRO|CREFITO|RQE)[-.\s]?\d/i.test(html),'Registro profissional em '+file);
 assert(!/(antes|depois)\s*\/\s*(depois|antes)/i.test(html),'Antes e depois em '+file);
 return true;
}
(async()=>{
 fs.mkdirSync(out,{recursive:true});
 const publicFiles=inspectPublicFiles();
 const preserved=inspectBaseline();
 HEALTH.forEach(id=>inspectPrivacy(HEALTH_DIR(id)));
 const browser=await chromium.launch({headless:true,channel:'msedge'});
 const errors=[],failed=[],reports=[];
 try{
  const page=await browser.newPage({viewport:{width:1440,height:1000}});
  page.on('pageerror',e=>errors.push(e.message));
  page.on('requestfailed',r=>failed.push({url:r.url(),error:r.failure()?.errorText}));
  page.on('response',r=>{if(r.status()>=400)failed.push({url:r.url(),status:r.status()})});
  await page.goto(base,{waitUntil:'networkidle'});
   assert(data.projects.length===15&&data.plannedModels.length===9,'Galeria inconsistente após a fase 4');
  assert(data.projects.filter(p=>p.category==='saude').length===3,'Modelos de saúde ausentes da galeria');
  assert(data.projects.filter(p=>p.category==='personal').length===6&&data.projects.filter(p=>p.category==='academias').length===3,'Modelos anteriores não preservados');
  assert(data.projects.filter(p=>p.category==='saude').every(p=>p.status==='demonstracao'&&p.image&&p.resources?.length&&p.type&&p.label&&p.paletteName),'Metadados dos modelos de saúde incompletos');
  for(const planned of data.plannedModels){
   assert((await page.request.get(new URL(planned.url,base).href)).status()===404,'Página planejada exposta: '+planned.id);
   assert(await page.locator(`[data-project="${planned.id}"]`).count()===0,'Modelo planejado na galeria');
  }
   assert(await page.locator('#project-count').textContent().then(t=>t.includes('6 de '+data.projects.length+' projetos demonstrativos')),'Contagem da galeria desatualizada');
  await page.locator('[data-filter="saude"]').click();
  assert(await page.locator('[data-project]:visible').count()===3,'Filtro de saúde incompleto');
  for(const model of data.projects.filter(p=>p.category==='saude')){
   const card=page.locator(`[data-project="${model.id}"]`);
   assert(await card.isVisible(),'Card invisível: '+model.id);
   assert((await card.locator('img').getAttribute('src')).includes(model.id),'Capa incorreta: '+model.id);
   assert(await card.locator('img').getAttribute('srcset').then(s=>s.includes(model.id+'-720.webp')),'Variante de capa ausente: '+model.id);
   const quote=new URL(await card.locator('.choose-link').getAttribute('href'));
   assert(quote.pathname==='/'+data.whatsapp&&quote.searchParams.get('text')===contact.demoMessage(model.name),'Mensagem incorreta na galeria: '+model.id);
  }
  await page.locator('[data-interest="odontologia"]').click();
  assert(await page.locator('[data-project]:visible').count()===3&&!await page.locator('#portfolio-empty').isVisible(),'Odontologia deveria mostrar os modelos de saúde');
  await page.locator(`[data-interest="${UNUSED_INTERESTS[0]}"]`).click();
  assert(await page.locator('#portfolio-empty').isVisible(),'Estado vazio ausente em uma categoria ainda não implementada');
  await page.locator('[data-filter="todos"]').click();
  for(const id of HEALTH){
   const model=contact.findModel(id);
   const url=new URL(model.url,base).href;
   const response=await page.goto(url,{waitUntil:'networkidle'});
   assert(response.status()===200,'Modelo não encontrado: '+id);
   await page.evaluate(()=>document.fonts.ready);
   const meta=contact.demoMetadata(model);
   assert(await page.title()===meta.title,'Título demonstrativo incorreto: '+id);
   assert(await page.locator('meta[name="robots"]').getAttribute('content')===meta.robots,'Modelo deve ser demonstrativo: '+id);
   assert(await page.locator('link[rel="canonical"]').getAttribute('href')===meta.url,'Canonical incorreto: '+id);
   assert(await page.locator('h1').count()===1,'Quantidade de h1 incorreta: '+id);
   assert(await page.locator('main').count()===1&&await page.locator('footer').count()===1,'Estrutura incompleta: '+id);
   assert(await page.locator('.ts-demo').count()===1,'Barra ausente ou duplicada: '+id);
   assert(await page.locator('.ts-demo p').textContent()==='Modelo demonstrativo desenvolvido pela TS Digital.','Texto de demonstração incorreto: '+id);
   assert(await page.locator('.ts-demo a').first().evaluate(a=>a.href)===base+'index.html#modelos','Link de retorno fora da prévia: '+id);
   assert(await page.locator('.ts-demo a').last().evaluate(a=>a.textContent.includes('Solicitar um site como este')),'CTA de orçamento ausente: '+id);
   assert(await page.locator('[data-demo-quote],.ts-demo-quote').evaluateAll((links,expected)=>links.every(a=>{const url=new URL(a.href);return url.pathname===expected.phone&&url.searchParams.get('text')===expected.message}),{phone:'/'+data.whatsapp,message:contact.demoMessage(model.name)}),'Contato incorreto: '+id);
   assert(await page.locator('a[href^="#"]').evaluateAll(links=>links.every(a=>document.getElementById(a.getAttribute('href').slice(1)))),'Âncora sem destino: '+id);
   assert(await page.locator('a[href^="#"]').count()>4,'Navegação interna incompleta: '+id);
   await page.evaluate(async()=>{await Promise.all([...document.images].map(img=>{img.loading='eager';return img.decode()}))});
   assert(await page.locator('img').evaluateAll(imgs=>imgs.every(img=>img.complete&&img.naturalWidth>0)),'Imagem ausente: '+id);
   assert(await page.locator('.faq-list details').count()>=4,'FAQ incompleto: '+id);
   const viewports=[];
   for(const [width,height] of [[1440,1000],[1024,900],[768,1024],[390,844],[320,800]]){
    await page.setViewportSize({width,height});await page.evaluate(()=>scrollTo({top:0,behavior:'instant'}));
    const size=await page.evaluate(()=>({viewport:innerWidth,document:document.documentElement.scrollWidth,overflow:[...document.querySelectorAll('body *')].filter(el=>{const r=el.getBoundingClientRect();return r.width&&r.height&&(r.right>innerWidth+1||r.left< -1)&&getComputedStyle(el).position!=='fixed'&&el.tagName!=='DIALOG'&&!el.closest('.svg-defs')}).map(el=>el.className?.baseVal??el.className).slice(0,12)}));
    assert(size.document===width&&!size.overflow.length,'Transbordamento em '+id+' em '+width+'px: '+JSON.stringify(size));viewports.push(size);
    assert(await page.locator('.ts-demo a').evaluateAll(links=>links.every(a=>a.getBoundingClientRect().height>=44)),'Alvos pequenos na barra: '+id+' em '+width+'px');
    const smallTargets=await page.locator('main a,main button,main summary').evaluateAll(nodes=>nodes.filter(n=>{const r=n.getBoundingClientRect();return r.width>0&&r.height>0&&r.height<44}).map(n=>(n.textContent||'').trim().slice(0,40)));
    assert(!smallTargets.length,'Alvos menores que 44px em '+id+' em '+width+'px: '+JSON.stringify(smallTargets));
    if(width===1440||width===390)await page.screenshot({path:path.join(out,id+'-'+width+'.png'),fullPage:true});
    if(width===390){
     const menu=page.locator('[data-menu]'),nav=page.locator('[data-navigation]');
     assert(await menu.isVisible()&&!await nav.isVisible(),'Menu compacto incorreto: '+id);
     await menu.click();assert(await nav.isVisible()&&await menu.getAttribute('aria-expanded')==='true','Menu não abre: '+id);
     assert(await page.evaluate(()=>document.documentElement.scrollWidth===innerWidth),'Menu aberto transborda: '+id);
     await page.keyboard.press('Escape');assert(!await nav.isVisible()&&await menu.evaluate(e=>e===document.activeElement),'Menu não fecha/restaura foco: '+id);
     await menu.click();await nav.locator('a').first().click();assert(!await nav.isVisible(),'Menu não fecha ao navegar: '+id);
    }
   }
   await page.setViewportSize({width:1440,height:1000});
   const action=page.locator('[data-demo-action]').first();await action.click();
   assert(await page.locator('#demo-dialog').isVisible(),'Simulação não abre: '+id);
   assert(await page.locator('[data-demo-choice]').textContent()===await action.getAttribute('data-demo-action'),'Escolha não foi exibida: '+id);
   assert(/simulação|demonstrativo/i.test(await page.locator('#demo-dialog').textContent()),'Ação sem identificação demonstrativa: '+id);
   assert(await page.locator('#demo-dialog').evaluate(d=>!d.querySelector('input,select,textarea')),'Diálogo coleta dados: '+id);
   await page.keyboard.press('Escape');assert(!await page.locator('#demo-dialog').isVisible()&&await action.evaluate(e=>e===document.activeElement),'Modal não fecha/restaura foco: '+id);
   const report={id,viewports,navigation:true,modal:true,faq:true,quote:true,returnToPortfolio:true,images:true};
   if(id==='vitalis-clinica'){
    const status=page.locator('#service-status');
    assert((await status.textContent()).includes('6 atendimentos demonstrativos')&&await page.locator('[data-service-category]:visible').count()===6,'Contagem inicial de serviços incorreta');
    for(const [filter,expected] of [['consultas',3],['acompanhamento',3],['todos',6]]){
     await page.locator(`[data-service-filter="${filter}"]`).click();
     assert(await page.locator('[data-service-category]:visible').count()===expected,'Filtro '+filter+' incorreto');
     assert(await page.locator(`[data-service-filter="${filter}"]`).getAttribute('aria-pressed')==='true','Filtro '+filter+' sem estado pressionado');
     assert((await status.textContent()).includes(String(expected)+' atendimentos demonstrativos'),'Status não atualizou: '+filter);
    }
    await page.keyboard.press('Tab');
    await page.locator('[data-service-filter="consultas"]').focus();
    await page.keyboard.press('Enter');
    assert(await page.locator('[data-service-category]:visible').count()===3,'Filtro por teclado falhou');
    assert(await page.locator('[data-service-filter="consultas"]').evaluate(e=>getComputedStyle(e).outlineStyle!=='none'),'Foco ausente no filtro');
    const serviceOptions=await page.locator('#service option').allTextContents(),periodOptions=await page.locator('#period option').allTextContents();
    assert(serviceOptions.length===7&&serviceOptions[0]==='Selecione o atendimento','Opções de atendimento inválidas');
    assert(periodOptions.length===3&&periodOptions[0]==='Selecione o turno','Opções de turno inválidas');
    await page.selectOption('#service',{index:1});await page.selectOption('#period',{index:1});
    await page.locator('[data-demo-appointment] button[type="submit"]').click();
    assert(await page.locator('#demo-dialog').isVisible(),'Agendamento demonstrativo não abre');
    assert(/·/.test(await page.locator('[data-demo-choice]').textContent()),'Resumo do agendamento ausente');
    await page.locator('#demo-dialog button').click();assert(!await page.locator('#demo-dialog').isVisible(),'Retorno do agendamento falhou');
    report.filters=true;report.appointment=true;
   }
   if(id==='equilibrio-fisio'){
    const details=page.locator('.care-detail');const count=await details.count();
    assert(count===4,'Acordeão de serviços incompleto');
    for(let i=0;i<count;i++){
     const item=details.nth(i);assert(await item.getAttribute('open')===null,'Item aberto antes do clique');
     await item.locator('summary').click();assert(await item.getAttribute('open')!==null,'Acordeão não abre');
     assert(await item.locator('a[data-demo-action]').isVisible(),'CTA do serviço ausente');
     if(i===0)await page.screenshot({path:path.join(out,id+'-servicos-abertos.png'),fullPage:false});
     await item.locator('summary').click();assert(await item.getAttribute('open')===null,'Acordeão não fecha');
    }
    await details.nth(0).locator('summary').focus();await page.keyboard.press('Enter');
    assert(await details.nth(0).getAttribute('open')!==null,'Acordeão não responde ao teclado');
    await page.keyboard.press('Enter');
    report.accordion=true;
   }
   if(id==='odonto-prime'){
    assert(await page.locator('.care-row').count()===4,'Linhas de cuidado incompletas');
    assert(await page.locator('.hero-portrait img').count()===1,'Retrato editorial ausente');
    report.careRows=true;
   }
   const summary=page.locator('.faq-list summary').first();await summary.click();
   assert(await page.locator('.faq-list details').first().getAttribute('open')!==null,'FAQ não abre: '+id);await summary.click();
   await page.emulateMedia({reducedMotion:'reduce'});assert(await page.evaluate(()=>getComputedStyle(document.documentElement).scrollBehavior==='auto'),'Movimento reduzido ausente: '+id);
   await page.emulateMedia({reducedMotion:'no-preference'});
   await page.keyboard.press('Tab');
   await page.locator('.ts-demo a').first().focus();
   assert(await page.locator('.ts-demo a').first().evaluate(e=>getComputedStyle(e).outlineStyle!=='none'),'Foco ausente: '+id);
   await page.locator('.ts-demo a').first().click();await page.waitForURL(base+'index.html#modelos');
   reports.push(report);
  }
  const noJS=await browser.newContext({javaScriptEnabled:false,viewport:{width:390,height:844}});
  for(const id of HEALTH){
   const plain=await noJS.newPage();await plain.goto(new URL(HEALTH_DIR(id),base).href);
   assert(await plain.locator('.ts-demo').isVisible()&&await plain.locator('.gym-nav').isVisible(),'Navegação básica sem JS ausente: '+id);
   assert((await plain.locator('noscript a').getAttribute('href')).startsWith('https://wa.me/'+data.whatsapp),'Contato sem JS ausente: '+id);
   assert(await plain.locator('h1').isVisible(),'Conteúdo sem JS ausente: '+id);
   assert(await plain.evaluate(()=>document.documentElement.scrollWidth===innerWidth),'Versão sem JS transborda: '+id);
   if(id==='vitalis-clinica')assert(!await plain.locator('.service-filters').isVisible()&&await plain.locator('.service-card:visible').count()===6,'Serviços sem JS incorretos');
   if(id==='equilibrio-fisio')assert(await plain.locator('.care-detail').count()===4,'Acordeão sem JS ausente');
   await plain.close();
  }await noJS.close();
  assert(!errors.length&&!failed.length,'Erros de navegador: '+JSON.stringify({errors,failed}));
  const result={publicFiles,preservedFiles:preserved,noOldIdentity:true,projects:data.projects.length,planned:data.plannedModels.length,healthModels:reports,privacy:true,noJavaScript:true,errors,failed};
  fs.writeFileSync(path.join(out,'fase3-verificacao.json'),JSON.stringify(result,null,2)+'\n');
   console.log(JSON.stringify({models:reports.map(r=>({id:r.id,widths:r.viewports.map(v=>v.viewport)})),projects:data.projects.length,planned:data.plannedModels.length,preserved,publicFiles,errors,failed}));
 }finally{await browser.close()}
})().catch(error=>{console.error(error);process.exitCode=1});
