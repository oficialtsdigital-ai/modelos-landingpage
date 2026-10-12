const fs = require('fs');
const path = require('path');
const {chromium} = require('C:/Users/Tami/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const data = require('../dados-site.js');
const contact = require('../compartilhado/contato-ts.js');
const url = 'http://127.0.0.1:4173/';
const out = path.resolve(__dirname,'../output/ts-expansao/fase1');
const assert = (value,message) => {if(!value)throw new Error(message)};
(async()=>{
  fs.mkdirSync(out,{recursive:true});
  const browser = await chromium.launch({headless:true,channel:'msedge'});
  try {
    const page = await browser.newPage({viewport:{width:1440,height:1000}});
    await page.goto(url,{waitUntil:'networkidle'});
    assert(await page.title()===data.seo.title,'Title fora da configuração');
    assert(await page.locator('h1').textContent()==='Seu negócio merece um site à altura do que você oferece.','Hero incorreta');
    assert(await page.locator('meta[name="description"]').getAttribute('content')===data.seo.description,'Descrição SEO incorreta');
    assert(await page.locator('meta[property="og:title"]').getAttribute('content')===data.seo.shareTitle,'Open Graph incorreto');
    assert(await page.locator('link[rel="canonical"]').getAttribute('href')===data.siteUrl,'Canonical incorreto');
    const schema = JSON.parse(await page.locator('script[type="application/ld+json"]').textContent());
    const org = schema['@graph'].find(item=>item['@type']==='Organization');
    assert(org.telephone==='+'+data.whatsapp&&org.address.addressLocality==='Seabra'&&org.address.addressRegion==='BA'&&org.address.addressCountry==='BR','Dados locais incorretos');
    assert(!org.address.streetAddress&&!org.address.postalCode&&!org.aggregateRating&&!org.taxID,'Informação não confirmada no schema');
    assert((await page.locator('.footer-positioning').textContent()).includes('sites'),'Rodapé sem posicionamento');
    assert(await page.locator('.footer-location [data-contact-location]').textContent()==='Seabra, Bahia','Localização visível incorreta');
    assert(await page.locator('[data-contact-number]').evaluateAll((nodes,number)=>nodes.every(node=>node.textContent===number),data.whatsappDisplay),'Número visível inconsistente');
    for (const model of data.projects.filter(project=>project.status==='demonstracao')) {
      const href = await page.locator(`[data-project="${model.id}"] .choose-link`).getAttribute('href');
      assert(new URL(href).searchParams.get('text')===contact.demoMessage(model.name),'Mensagem de modelo incorreta: '+model.id);
    }
    const plannedCounts = {};
    for (const model of data.plannedModels) {
      const response = await page.request.get(new URL(model.url,url).href);
      assert(response.status()===404,'Modelo planejado exposto antes da implementação: '+model.id);
      assert(await page.locator(`[data-project="${model.id}"]`).count()===0,'Modelo planejado na galeria: '+model.id);
      plannedCounts[model.category]=(plannedCounts[model.category]||0)+1;
    }
    assert(data.plannedModels.length===9&&Object.values(plannedCounts).every(count=>count===3),'Planejamento dos 15 modelos restantes incompleto');
    const fixtureURL = url+'__ts_demo_test__';
    const fixture = `<!doctype html><html lang="pt-BR"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><link rel="stylesheet" href="/compartilhado/fonts.css"><link rel="stylesheet" href="/compartilhado/demonstracao.css"><style>body{margin:0}main{padding:40px;font-family:Manrope,sans-serif}</style><script src="/dados-site.js" defer></script><script src="/compartilhado/contato-ts.js" defer></script><script src="/compartilhado/demonstracao.js" defer></script></head><body data-demo-model="iron-force"><main><h1>Verificação interna da barra</h1><p>Esta página existe apenas durante o teste.</p></main></body></html>`;
    await page.route(fixtureURL,route=>route.fulfill({contentType:'text/html',body:fixture}));
    await page.goto(fixtureURL,{waitUntil:'networkidle'});
    assert(await page.locator('.ts-demo').count()===1,'Barra de demonstração ausente');
    assert(await page.locator('.ts-demo p').textContent()==='Modelo demonstrativo desenvolvido pela TS Digital.','Texto de demonstração incorreto');
    const quote = new URL(await page.locator('.ts-demo-quote').getAttribute('href'));
    assert(quote.pathname==='/'+data.whatsapp&&quote.searchParams.get('text')===contact.demoMessage('IRON FORCE'),'CTA da barra incorreto');
    const back = await page.locator('.ts-demo a').first().getAttribute('href');
    assert(back===url+'index.html#modelos','Volta ao portfólio fora da prévia local');
    const viewports = [];
    for (const width of [1440,768,390,320]) {
      await page.setViewportSize({width,height:844});
      const report = await page.evaluate(()=>({width:innerWidth,document:document.documentElement.scrollWidth}));
      assert(report.width===report.document,'Barra transborda em '+width);
      assert(await page.locator('.ts-demo a').evaluateAll(links=>links.every(link=>link.getBoundingClientRect().height>=44)),'Alvo de toque menor que 44px');
      viewports.push(report);
      if(width===1440||width===390)await page.locator('.ts-demo').screenshot({path:path.join(out,'barra-'+width+'.png')});
    }
    await page.evaluate(()=>window.TS_DEMO.mount('iron-force'));
    assert(await page.locator('.ts-demo').count()===1,'Barra duplicada');
    await page.locator('.ts-demo a').first().focus();
    assert(await page.locator('.ts-demo a').first().evaluate(link=>getComputedStyle(link).outlineStyle!=='none'),'Barra sem foco visível');
    await page.locator('.ts-demo a').first().click();
    await page.waitForURL(url+'index.html#modelos');
    assert(await page.locator('h1').textContent()==='Seu negócio merece um site à altura do que você oferece.','Retorno ao portfólio falhou');
    const report = {localSEO:true,confirmedSchema:true,visibleContact:true,modelMessages:true,plannedCounts,plannedPagesNotExposed:true,demoBar:true,demoBarViewports:viewports,returnToPortfolio:true};
    fs.writeFileSync(path.join(out,'fase1-verificacao.json'),JSON.stringify(report,null,2)+'\n');
    console.log(JSON.stringify(report));
  } finally {await browser.close();}
})().catch(error=>{console.error(error);process.exitCode=1});
