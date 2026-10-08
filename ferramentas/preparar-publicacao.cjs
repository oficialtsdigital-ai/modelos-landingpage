// Monta publicar/ só com o catálogo e os modelos de demonstração (clientes ficam de fora).
const fs = require('fs'), path = require('path');
const root = path.resolve(__dirname, '..'), dest = path.join(root, 'publicar');
const files = ['index.html', 'catalogo.css'];
const dirs = ['modelo01', 'modelo02', 'modelo03', 'modelo04', 'modelo05', 'modelo06', 'compartilhado'];
for (const item of [...files, ...dirs]) {
  if (!fs.existsSync(path.join(root, item))) { console.error('ERRO: não encontrei "' + item + '" no projeto.'); process.exit(1); }
}
fs.rmSync(dest, { recursive: true, force: true });
fs.mkdirSync(dest, { recursive: true });
for (const f of files) fs.copyFileSync(path.join(root, f), path.join(dest, f));
for (const d of dirs) fs.cpSync(path.join(root, d), path.join(dest, d), { recursive: true });
fs.writeFileSync(path.join(dest, '_headers'), [
  '/*', '  X-Content-Type-Options: nosniff', '  Referrer-Policy: strict-origin-when-cross-origin', '',
  '/compartilhado/fonts/*', '  Cache-Control: public, max-age=31536000, immutable', ''
].join('\n'));
console.log('Catálogo preparado em publicar/. Clientes não são incluídos.');
