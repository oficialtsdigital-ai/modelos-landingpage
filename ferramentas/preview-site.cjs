const http = require('http');
const fs = require('fs');
const path = require('path');
const {headersFor} = require('./cabecalhos.cjs');
const root = fs.realpathSync(path.resolve(__dirname,'../publicar'));
const port = 4173;
const types = {'.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8','.js':'text/javascript; charset=utf-8','.svg':'image/svg+xml','.webp':'image/webp','.png':'image/png','.jpg':'image/jpeg','.woff2':'font/woff2','.xml':'application/xml; charset=utf-8','.txt':'text/plain; charset=utf-8'};
const server = http.createServer((req,res) => {
  try {
    if(!['GET','HEAD'].includes(req.method)){res.writeHead(405,{'Allow':'GET, HEAD'});res.end();return;}
    const pathname = decodeURIComponent(new URL(req.url,'http://127.0.0.1').pathname);
    let file = path.resolve(root,'.'+pathname);
    if (file!==root && !file.startsWith(root+path.sep)) {res.writeHead(403);res.end();return;}
    if (fs.existsSync(file) && fs.statSync(file).isDirectory()) file=path.join(file,'index.html');
    if (!fs.existsSync(file) || !fs.statSync(file).isFile()) {res.writeHead(404);res.end('Página não encontrada');return;}
    const real = fs.realpathSync(file);
    if (!real.startsWith(root+path.sep)) {res.writeHead(403);res.end();return;}
    res.writeHead(200,{'Content-Type':types[path.extname(real)]||'application/octet-stream','Cache-Control':'no-cache',...headersFor(path.join(root,'_headers'),pathname)});
    if (req.method==='HEAD') {res.end();return;}
    fs.createReadStream(real).pipe(res);
  } catch {res.writeHead(400);res.end('Solicitação inválida');}
});
server.listen(port,'127.0.0.1',()=>console.log('Prévia local: http://127.0.0.1:'+port+'/'));
