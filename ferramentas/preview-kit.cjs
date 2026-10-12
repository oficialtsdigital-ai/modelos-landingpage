const fs = require('fs');
const path = require('path');
const { chromium } = require('C:/Users/Tami/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');

(async () => {
  const browser = await chromium.launch({ headless: true, channel: 'msedge' });
  const page = await browser.newPage({ viewport: { width: 1440, height: 1200 }, deviceScaleFactor: 1 });
  const root = path.resolve('output/ts-digital');
  await page.goto('file:///' + path.join(root, 'index.html').replace(/\\/g, '/'));
  await page.evaluate(() => document.fonts.ready);
  for (const img of await page.locator('img').all()) await img.evaluate(i => i.decode());
  const reports = await page.evaluate(() => ({
    galleryOverflow: document.documentElement.scrollWidth > innerWidth,
    assets: document.querySelectorAll('.asset-card').length,
    imagesLoaded: [...document.images].every(i => i.complete && i.naturalWidth > 0)
  }));
  console.log(JSON.stringify(reports));
  if (reports.galleryOverflow || reports.assets !== 11 || !reports.imagesLoaded) throw new Error('Galeria incompleta');
  const grids = page.locator('.assets');
  for (const [i, name] of ['feed', 'carrossel', 'stories'].entries()) {
    await grids.nth(i).screenshot({ path: path.resolve('output/ts-digital-' + name + '-preview.png') });
  }
  await page.locator('.logos').screenshot({ path: path.resolve('output/ts-digital-logos-preview.png') });
  const links = await page.locator('a[href]').evaluateAll(as => as.map(a => a.getAttribute('href')).filter(h => !h.startsWith('#')));
  const missing = links.filter(h => !fs.existsSync(path.resolve(root, h)));
  if (missing.length) throw new Error('Links ausentes: ' + missing.join(', '));
  console.log('Downloads locais verificados: ' + links.length);
  await browser.close();
})().catch(e => { console.error(e.message); process.exitCode = 1; });
