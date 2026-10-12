const fs = require('fs');
const path = require('path');
const data = require('../dados-site.js');
const {whatsappURL: contact, demoMessage} = require('../compartilhado/contato-ts.js');
const {validateData} = require('./validar-dados.cjs');
const {renderVitrine,renderHero,renderSchema}=require('./renderizar-vitrine.cjs');
const root = path.resolve(__dirname, '..');
const escape = s => String(s).replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;');
const icon = name => `<svg class="icon" aria-hidden="true"><use href="#icon-${escape(name)}"/></svg>`;
function renderSite() {
  validateData(data);
  const categories = new Map(data.categories.map(c => [c.id,c]));
  const ids = new Set();
  for (const p of data.projects) {
    if (ids.has(p.id) || !categories.has(p.category) || !['demonstracao','apresentacao','real'].includes(p.status)) throw new Error('Projeto inválido: '+p.id);
    ids.add(p.id);
    for (const file of [p.image,p.url]) {
      if (/^https:\/\//.test(file)) continue;
      const resolved = path.resolve(root,file);
      if (!resolved.startsWith(root+path.sep) || !fs.existsSync(resolved)) throw new Error('Arquivo do projeto não encontrado: '+file);
    }
  }
  const filters = data.categories.map((c,i) => `<button type="button" class="filter-button" data-filter="${escape(c.id)}" aria-pressed="${i===0}" aria-controls="project-grid">${escape(c.name)}</button>`).join('\n');
  const niches = data.niches.map(n => `<article class="niche-card">${icon(n.icon)}<h3>${escape(n.title)}</h3><p>${escape(n.description)}</p><p class="niche-features">${escape(n.features)}</p><a class="niche-explore" href="#modelos" data-explore="${escape(n.category)}" data-interest="${escape(n.id)}">Explorar possibilidades ${icon('arrow')}</a></article>`).join('\n');
  const cards=renderVitrine(data,root);
  const organization=renderSchema(data);
  let html = fs.readFileSync(path.join(root,'index.html'),'utf8');
  const metadata = `<title>${escape(data.seo.title)}</title>
  <meta name="description" content="${escape(data.seo.description)}">
  <link rel="canonical" href="${escape(data.siteUrl)}">
  <meta property="og:title" content="${escape(data.seo.shareTitle)}">
  <meta property="og:description" content="${escape(data.seo.shareDescription)}">
  <meta property="og:type" content="website"><meta property="og:locale" content="pt_BR">
  <meta property="og:url" content="${escape(data.siteUrl)}">
  <meta property="og:image" content="${escape(new URL(data.seo.shareImage,data.siteUrl).href)}">
  <meta property="og:image:width" content="1200"><meta property="og:image:height" content="630">
  <meta property="og:image:alt" content="${escape(data.seo.shareImageAlt)}">
  <meta name="twitter:card" content="summary_large_image">`;
  const sections = {HERO:renderHero(data,root),METADATA:metadata,NICHES:niches,FILTERS:filters,PROJECTS:cards,SCHEMA:`<script type="application/ld+json">${JSON.stringify(organization).replaceAll('<','\\u003c')}</script>`};
  for (const [key,value] of Object.entries(sections)) {
    const pattern = new RegExp(`(<!-- TS:${key} -->)[\\s\\S]*?(<!-- /TS:${key} -->)`);
    if (!pattern.test(html)) throw new Error('Marcador de geração ausente: '+key);
    html = html.replace(pattern,(_,a,b)=>a+'\n'+value+'\n'+b);
  }
  html = html.replace(/(<a\b[^>]*\bdata-whatsapp="([^"]*)"[^>]*>)/g,(_,tag,message)=>{
    const decoded = message.replaceAll('&quot;','"').replaceAll('&amp;','&').replaceAll('&lt;','<').replaceAll('&gt;','>');
    const href = escape(contact(decoded));
    return /\bhref="[^"]*"/.test(tag)?tag.replace(/\bhref="[^"]*"/,`href="${href}"`):tag.replace('<a ',`<a href="${href}" `);
  });
  html = html.replace(/(<span data-contact-number>)[^<]*(<\/span>)/g,`$1${escape(data.whatsappDisplay)}$2`);
  html = html.replace(/(<span data-contact-location>)[^<]*(<\/span>)/g,`$1${escape(data.location.city+', '+data.location.regionName)}$2`);
  html = html.replace(/(<p id="project-count"[^>]*>)[^<]*(<\/p>)/,`$1${data.projects.length} projetos demonstrativos$2`);
  html=html.replace(/(<span data-price-from>|<strong data-price-from>)[^<]*(<\/span>|<\/strong>)/g,(_,a,b)=>a+new Intl.NumberFormat('pt-BR',{style:'currency',currency:'BRL',maximumFractionDigits:0}).format(data.pricing.from)+b);
  fs.writeFileSync(path.join(root,'index.html'),html);
  fs.writeFileSync(path.join(root,'robots.txt'),`User-agent: *\nAllow: /\nDisallow: /clientes/\nDisallow: /output/\nDisallow: /ferramentas/\n\nSitemap: ${data.siteUrl}sitemap.xml\n`);
  fs.writeFileSync(path.join(root,'sitemap.xml'),`<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n  <url><loc>${escape(data.siteUrl)}</loc><lastmod>${data.seo.updated}</lastmod></url>\n</urlset>\n`);
  return data.projects.length;
}
module.exports = {renderSite};
if (require.main === module) console.log('Homepage atualizada com '+renderSite()+' demonstrações e propostas.');
