const fs = require('fs');
const path = require('path');
const net = require('net');
const {pathToFileURL} = require('url');
const {chromium} = require('C:/Users/Tami/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
(async()=>{
  const port=9337;
  await new Promise((resolve,reject)=>{const probe=net.createServer();probe.on('error',reject);probe.listen(port,'127.0.0.1',()=>probe.close(resolve))});
  const browser=await chromium.launch({headless:true,channel:'msedge',args:['--remote-debugging-port='+port]});
  try {
    const lighthouse=(await import(pathToFileURL('C:/Users/Tami/AppData/Local/npm-cache/_npx/0f94ee7615faf582/node_modules/lighthouse/core/index.js').href)).default;
    const result=await lighthouse(process.env.TS_QA_URL||'http://127.0.0.1:4173/',{port,output:['html','json'],logLevel:'error',onlyCategories:process.env.TS_QA_FAST?['accessibility','best-practices']:['performance','accessibility','best-practices','seo']});
    const dir=path.resolve(process.env.TS_QA_OUTPUT||'output/ts-institucional');
    fs.mkdirSync(dir,{recursive:true});
    fs.writeFileSync(path.join(dir,'lighthouse.report.html'),result.report[0]);
    fs.writeFileSync(path.join(dir,'lighthouse.report.json'),result.report[1]);
    console.log(JSON.stringify({scores:Object.fromEntries(Object.entries(result.lhr.categories).map(([k,v])=>[k,Math.round(v.score*100)])),failedAudits:Object.entries(result.lhr.audits).filter(([k,a])=>a.score!==null&&a.score<1).map(([id,a])=>({id,title:a.title,score:a.score,displayValue:a.displayValue})),metrics:{lcp:result.lhr.audits['largest-contentful-paint']?.numericValue,cls:result.lhr.audits['cumulative-layout-shift']?.numericValue}}));
  } finally {await browser.close();}
})().catch(e=>{console.error(e);process.exit(1)});
