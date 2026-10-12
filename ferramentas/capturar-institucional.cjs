const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const {chromium} = require('C:/Users/Tami/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const sharp = require('C:/Users/Tami/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/sharp');
const root = path.resolve(__dirname, '..');
function hashes(dir, result = {}) {
  for (const entry of fs.readdirSync(dir, {withFileTypes: true})) {
    const file = path.join(dir, entry.name);
    if (entry.isDirectory()) hashes(file, result);
    else result[path.relative(root, file).replace(/\\/g, '/')] = crypto.createHash('sha256').update(fs.readFileSync(file)).digest('hex');
  }
  return result;
}
(async () => {
  const baseline = {};
  for (const d of ['modelo01','modelo02','modelo03','modelo04','modelo05','modelo06','clientes/caique','clientes/fit-forma']) hashes(path.join(root,d),baseline);
  fs.writeFileSync(path.join(root,'output/ts-institucional/rotas-preservadas.json'),JSON.stringify(baseline,null,2)+'\n');
  const browser = await chromium.launch({headless:true,channel:'msedge'});
  const page = await browser.newPage({viewport:{width:1440,height:1000},deviceScaleFactor:1,reducedMotion:'reduce'});
  await page.goto('file:///'+path.join(root,'clientes/fit-forma/index.html').replace(/\\/g,'/'));
  await page.evaluate(()=>document.fonts.ready);
  await page.locator('img').evaluateAll(is=>Promise.all(is.map(i=>i.decode())));
  await page.screenshot({path:path.join(root,'output/ts-institucional/fit-forma-desktop.png')});
  await sharp(path.join(root,'output/ts-institucional/fit-forma-desktop.png')).resize(1000,699,{fit:'cover',position:'top'}).webp({quality:82}).toFile(path.join(root,'assets/catalogo/fit-forma.webp'));
  await page.setViewportSize({width:390,height:844});
  await page.screenshot({path:path.join(root,'output/ts-institucional/fit-forma-mobile.png')});
  await sharp(path.join(root,'output/ts-institucional/fit-forma-mobile.png')).webp({quality:82}).toFile(path.join(root,'assets/catalogo/fit-forma-mobile.webp'));
  await browser.close();
  console.log('Rotas registradas: '+Object.keys(baseline).length+' arquivos. Capturas reais da Fit Forma exportadas.');
})().catch(e=>{console.error(e);process.exit(1)});
