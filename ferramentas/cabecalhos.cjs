const fs=require('fs'),path=require('path'),crypto=require('crypto');
function renderHeaders(root){
 const hashes=new Set();
 function scan(dir){for(const file of fs.readdirSync(dir,{withFileTypes:true})){const p=path.join(dir,file.name);if(file.isDirectory())scan(p);else if(file.name.endsWith('.html')){for(const script of fs.readFileSync(p,'utf8').matchAll(/<script\b[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g))hashes.add("'sha256-"+crypto.createHash('sha256').update(script[1]).digest('base64')+"'")}}}
 scan(path.join(root,'modelos'));scan(path.join(root,'publicar'));
 const policy="default-src 'self'; script-src 'self' "+[...hashes].join(' ')+"; style-src 'self' 'unsafe-inline'; img-src 'self' data:; font-src 'self'; connect-src 'self'; object-src 'none'; base-uri 'self'; form-action 'none'; frame-ancestors 'none'";
 return ['/*','  X-Content-Type-Options: nosniff','  Referrer-Policy: strict-origin-when-cross-origin','  X-Frame-Options: DENY','  Permissions-Policy: camera=(), microphone=(), geolocation=(), payment=()',...['/','/index.html','/modelos/*'].flatMap(route=>[route,'  Content-Security-Policy: '+policy]),'/compartilhado/fonts/*','  Cache-Control: public, max-age=31536000, immutable','/assets/*','  Cache-Control: public, max-age=3600',''].join('\n');
}
function headersFor(file,pathname){
 const result={};let matches=false;
 for(const line of fs.readFileSync(file,'utf8').split(/\r?\n/)){
  if(!line.trim()||line.startsWith('#'))continue;
  if(!/^\s/.test(line)){const pattern='^'+line.replace(/[.+?^${}()|[\]\\]/g,'\\$&').replace(/\*/g,'.*')+'$';matches=new RegExp(pattern).test(pathname)}
  else if(matches){const colon=line.indexOf(':');if(colon>0)result[line.slice(0,colon).trim()]=line.slice(colon+1).trim()}
 }
 return result;
}
module.exports={renderHeaders,headersFor};
