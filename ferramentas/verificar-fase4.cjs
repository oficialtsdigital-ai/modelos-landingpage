/* Verificação da Fase 4 — modelos de restaurantes.
   Confere galeria, privacidade, cardápios fictícios, reserva simulada,
   efeitos próprios, acessibilidade e ausência de dependências externas. */
const fs=require('fs'),path=require('path'),crypto=require('crypto');
const {chromium}=require('C:/Users/Tami/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const data=require('../dados-site.js'),contact=require('../compartilhado/contato-ts.js');
const {menus,restaurantes}=require('./dados-restaurantes.cjs');
const root=path.resolve(__dirname,'..'),out=path.join(root,'output/ts-expansao/fase4'),base='http://127.0.0.1:4173/';
const assert=(value,message)=>{if(!value)throw Error(message)};
const RESTAURANTS=['brasa-sabor','sushi-kai','bella-pizza'];
const FILE=id=>'modelos/restaurantes/'+id+'/index.html';
const WIDTHS=[1440,1024,768,390,320];

function inspectExternalDependencies(){
 const targets=[
  ...RESTAURANTS.map(FILE),
  'compartilhado/efeitos.js','compartilhado/efeitos.css',
  'compartilhado/restaurantes.js','compartilhado/restaurantes-base.css',
  'ferramentas/dados-restaurantes.cjs'
 ];
 let checked=0;
 for(const relative of targets){
  const file=path.join(root,relative);
  assert(fs.existsSync(file),'Arquivo da fase 4 ausente: '+relative);
  const content=fs.readFileSync(file,'utf8');
  assert(!/https?:\/\/(?:cdn|unpkg|cdnjs|jsdelivr|fonts\.googleapis|fonts\.gstatic)\./i.test(content),'Dependência externa em '+relative);
  checked++;
 }
 return checked;
}
function inspectBaseline(){
 const baseline=JSON.parse(fs.readFileSync(path.join(root,'output/ts-expansao/fase3/paginas-preservadas.json'),'utf8'));
 for(const [file,hash] of Object.entries(baseline)){
  for(const source of [path.join(root,file),path.join(root,'publicar',file)]){
   assert(fs.existsSync(source),'Arquivo preservado ausente: '+source);
   assert((file.startsWith('modelos/')&&file.endsWith('index.html'))?require('./preservacao.cjs')(root,file,source):crypto.createHash('sha256').update(fs.readFileSync(source)).digest('hex')===hash,'Arquivo preservado alterado: '+source);
  }
 }
 return Object.keys(baseline).length;
}
function inspectPrivacy(id){
 const html=fs.readFileSync(path.join(root,FILE(id)),'utf8');
 assert(!/\b(name|telefone|phone|email|e-mail|cpf|rg)\s*=\s*"(?:text|tel|email)"/i.test(html),'Campo de dados pessoais em '+id);
 assert(!/type="(?:tel|email)"/i.test(html),'Entrada de contato em '+id);
 assert(!/type="date"/i.test(html),'Data nativa de navegador em '+id);
 assert(/data-demo-reservation/.test(html),'Formulário de reserva simulada ausente em '+id);
 assert(/menu-seal/.test(html),'Selo de demonstração do cardápio ausente em '+id);
 return true;
}
(async()=>{
 fs.mkdirSync(out,{recursive:true});
 const externalChecked=inspectExternalDependencies();
 const preserved=inspectBaseline();
 RESTAURANTS.forEach(inspectPrivacy);
 const browser=await chromium.launch({headless:true,channel:'msedge'});
 const errors=[],failed=[],reports=[];
 try{
  const page=await browser.newPage({viewport:{width:1440,height:1000}});
  page.on('pageerror',e=>errors.push(e.message));
  page.on('requestfailed',r=>failed.push({url:r.url(),error:r.failure()?.errorText}));
  page.on('response',r=>{if(r.status()>=400)failed.push({url:r.url(),status:r.status()})});
  await page.goto(base,{waitUntil:'networkidle'});
  assert(data.projects.length===15&&data.plannedModels.length===9,'Galeria da fase 4 incompleta');
  assert(data.projects.filter(p=>p.category==='restaurantes').length===3,'Modelos de restaurantes ausentes da galeria');
  assert(data.projects.filter(p=>p.category==='personal').length===6&&data.projects.filter(p=>p.category==='academias').length===3&&data.projects.filter(p=>p.category==='saude').length===3,'Modelos anteriores não preservados');
  assert(data.projects.filter(p=>p.category==='restaurantes').every(p=>p.status==='demonstracao'&&p.image&&p.resources?.length&&p.type&&p.label&&p.paletteName),'Metadados dos restaurantes incompletos');
  for(const planned of data.plannedModels){
   assert((await page.request.get(new URL(planned.url,base).href)).status()===404,'Página planejada exposta: '+planned.id);
   assert(await page.locator(`[data-project="${planned.id}"]`).count()===0,'Modelo planejado na galeria');
  }
  for(const id of RESTAURANTS){
   const model=data.projects.find(p=>p.id===id);
   assert(await page.locator(`[data-project="${id}"]`).count()===1,'Modelo fora da galeria: '+id);
   assert(fs.existsSync(path.join(root,model.image.slice(2))),'Capa ausente: '+model.image);
  }
  for(const id of RESTAURANTS){
   const url=new URL('modelos/restaurantes/'+id+'/',base).href;
   const response=await page.goto(url,{waitUntil:'networkidle'});
   assert(response.status()===200,'Modelo indisponível: '+id);
   await page.evaluate(()=>document.fonts.ready);
   const menuSections=await page.locator('.menu-section').count();
   const menuItems=await page.locator('.menu-item').count();
   const prices=await page.locator('.menu-price').count();
   assert(menuSections===menus[id].length,'Seções do cardápio incompletas em '+id);
   assert(menuItems===menus[id].reduce((sum,g)=>sum+g.items.length,0),'Itens do cardápio incompletos em '+id);
   assert(prices===menuItems,'Preços ausentes em '+id);
   assert((await page.locator('.menu-seal').textContent()).includes('fictícios'),'Selo sem aviso de preço fictício em '+id);
   // reserva simulada
   await page.locator('[data-reserve-open]').first().click();
   await page.waitForSelector('#demo-dialog[open]');
   const fieldCount=await page.locator('[data-demo-reservation] select').count();
   assert(fieldCount===3,'Campos da reserva incompletos em '+id);
   await page.locator('[data-demo-reservation] button[type=submit]').click();
   const alertMessage=await page.locator('[data-demo-message]').textContent();
   assert(alertMessage.includes('escolha'),'Validação da reserva falhou em '+id);
   await page.selectOption('#table',{index:1});
   await page.selectOption('#day',{index:1});
   await page.selectOption('#shift',{index:1});
   await page.locator('[data-demo-reservation] button[type=submit]').click();
   const okMessage=await page.locator('[data-demo-message]').textContent();
   assert(okMessage.includes('Nenhum dado foi enviado'),'Confirmação da reserva sem aviso de privacidade em '+id);
   assert(await page.locator('#demo-dialog input[type=text],#demo-dialog input[type=tel],#demo-dialog input[type=email]').count()===0,'Coleta de dados pessoais na reserva de '+id);
   await page.keyboard.press('Escape');
   assert(await page.locator('#demo-dialog[open]').count()===0,'Escape não fecha o diálogo em '+id);
   // efeitos e acessibilidade
   assert(await page.evaluate(()=>document.documentElement.classList.contains('fx-ready')),'Motor de efeitos não inicializou em '+id);
   const h1Visible=await page.locator('h1').evaluate(el=>getComputedStyle(el).opacity==='1'&&getComputedStyle(el.querySelector('.fx-word')||el).opacity==='1');
   assert(h1Visible,'Título do herói invisível em '+id);
   assert(await page.locator('img:not([alt])').count()===0,'Imagem sem texto alternativo em '+id);
   assert(await page.locator('h1').count()===1,'Mais de um H1 em '+id);
   // FAQ
   await page.locator('.faq-list summary').first().click();
   assert(await page.locator('.faq-list details[open]').count()===1,'FAQ não abre em '+id);
   await page.locator('.faq-list summary').first().click();
   // larguras
   const widths=[];
   for(const width of WIDTHS){
    await page.setViewportSize({width,height:844});
    await page.evaluate(()=>scrollTo({top:0,behavior:'instant'}));
    const report=await page.evaluate(()=>({viewport:innerWidth,document:document.documentElement.scrollWidth}));
    assert(report.document===width,'Overflow horizontal em '+id+' a '+width+'px: '+report.document);
    widths.push(report);
    if(width===390){
     await page.locator('[data-nav]').click();
     assert(await page.locator('[data-nav-panel].is-open').count()===1,'Menu móvel não abre em '+id);
     await page.keyboard.press('Escape');
     assert(await page.locator('[data-nav-panel].is-open').count()===0,'Escape não fecha o menu em '+id);
    }
   }
   // sem JavaScript
   await page.setViewportSize({width:1440,height:1000});
   const noJS=await browser.newContext({javaScriptEnabled:false,viewport:{width:390,height:844}});
   const basic=await noJS.newPage();
   await basic.goto(url,{waitUntil:'load'});
   assert(await basic.locator('.menu-item').count()===menuItems,'Cardápio depende de JS em '+id);
   assert(await basic.locator('.menu-price').first().evaluate(el=>getComputedStyle(el).opacity==='1'),'Preços ocultos sem JS em '+id);
   await noJS.close();
   // movimento reduzido
   await page.emulateMedia({reducedMotion:'reduce'});
   await page.reload({waitUntil:'networkidle'});
   const reducedOk=await page.locator('.menu-item').first().evaluate(el=>getComputedStyle(el).opacity==='1');
   assert(reducedOk,'Movimento reduzido esconde conteúdo em '+id);
   await page.emulateMedia({reducedMotion:'no-preference'});
   reports.push({id,menuSections,menuItems,prices,widths:widths.length});
   console.log('Verificado: '+id+' ('+menuSections+' seções, '+menuItems+' itens)');
  }
  assert(!errors.length&&!failed.length,'Erros de script ou recursos: '+JSON.stringify({errors,failed}));
  const result={externalFilesChecked:externalChecked,preservedFiles:preserved,projects:data.projects.length,planned:data.plannedModels.length,restaurantModels:reports,privacy:true,effectsEngine:'próprio',noExternalDependencies:true,noJavaScript:true,reducedMotion:true,errors,failed};
  fs.writeFileSync(path.join(out,'fase4-verificacao.json'),JSON.stringify(result,null,2)+'\n');
  console.log(JSON.stringify({...result,restaurantModels:reports.map(r=>r.id)}));
 }finally{await browser.close();}
})().catch(error=>{console.error(error);process.exitCode=1});
