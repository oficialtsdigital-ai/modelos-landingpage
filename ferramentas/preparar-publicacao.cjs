// Monta publicar/ com o catálogo, modelos e clientes autorizados para apresentação.
const fs = require('fs'), path = require('path');
const root = fs.realpathSync(path.resolve(__dirname, '..')), dest = path.resolve(root, 'publicar');
if (path.dirname(dest) !== root || (fs.existsSync(dest) && fs.realpathSync(dest) !== dest)) {
  throw new Error('O destino da publicação precisa ser a pasta publicar dentro do projeto.');
}
const {renderSite} = require('./renderizar-institucional.cjs');
const {renderDemonstrations} = require('./renderizar-demonstracoes.cjs');
const {renderHeaders} = require('./cabecalhos.cjs');
renderDemonstrations();
const projects = renderSite();
const files = ['index.html', 'catalogo.css', 'dados-site.js', 'institucional.js', 'robots.txt', 'sitemap.xml'];
const data = require('../dados-site.js');
const projectDirs = data.projects.filter(project => !/^https:\/\//.test(project.url)).map(project => path.dirname(project.url.replace(/^\.\//,'')));
const dirs = [...new Set(['modelo01', 'modelo02', 'modelo03', 'modelo04', 'modelo05', 'modelo06', 'compartilhado', 'assets/catalogo', 'assets/ts-digital', 'clientes/caique', ...projectDirs])];
for (const item of [...files, ...dirs]) {
  if (!fs.existsSync(path.join(root, item))) { console.error('ERRO: não encontrei "' + item + '" no projeto.'); process.exit(1); }
}
fs.rmSync(dest, { recursive: true, force: true });
fs.mkdirSync(dest, { recursive: true });
for (const f of files) fs.copyFileSync(path.join(root, f), path.join(dest, f));
for (const d of dirs) fs.cpSync(path.join(root, d), path.join(dest, d), { recursive: true });
fs.writeFileSync(path.join(dest, '_headers'), renderHeaders(root));
console.log('Site institucional preparado em publicar/ com '+projects+' modelos. Personais e proposta do Caique preservados. Nenhuma publicação foi executada.');
