const data = require('../dados-site.js');
const {demoMessage, demoMetadata, whatsappURL} = require('../compartilhado/contato-ts.js');
function validateData(config) {
  const assert = (condition,message) => {if(!condition)throw new Error(message)};
  assert(/^\d{10,15}$/.test(config.whatsapp),'Número de WhatsApp inválido');
  assert(/^https:\/\//.test(config.siteUrl)&&config.siteUrl.endsWith('/'),'URL institucional inválida');
  assert(config.location.city&&config.location.region&&config.location.country,'Localização incompleta');
  assert(config.seo.title&&config.seo.description&&config.seo.shareTitle&&config.seo.shareImageAlt,'SEO institucional incompleto');
  assert(/^\d{4}-\d{2}-\d{2}$/.test(config.seo.updated),'Data de atualização inválida');
  assert(config.pricing?.from===497&&config.pricing.currency==='BRL','Investimento inicial inválido');
  assert(config.previewMessage?.includes('prévia do meu site'),'Mensagem de prévia ausente');
  const categoryIds = new Set(config.categories.map(category=>category.id));
  assert(categoryIds.size===config.categories.length,'Categorias duplicadas');
  const modelIds = new Set();
  const routes = new Set();
  for (const model of [...config.projects,...config.plannedModels,...(config.legacyModels||[])]) {
    assert(/^[a-z0-9-]+$/.test(model.id)&&!modelIds.has(model.id),'ID de modelo inválido ou duplicado: '+model.id);
    assert(categoryIds.has(model.category)&&model.category!=='todos','Categoria de modelo inválida: '+model.id);
    assert(model.name&&model.style&&model.url&&!routes.has(model.url),'Metadados ou rota inválidos: '+model.id);
    assert(model.palette.length>=2&&model.palette.every(color=>/^#[a-f0-9]{6}$/i.test(color)),'Paleta inválida: '+model.id);
    modelIds.add(model.id);routes.add(model.url);
  }
  for(const project of config.projects)assert(project.focus&&project.goal&&project.status==='demonstracao','Objetivo ou identificação fictícia ausente: '+project.id);
  assert(config.featuredProjects.length===6&&config.featuredProjects.every(id=>config.projects.some(p=>p.id===id)),'Seleção inicial inválida');
  for (const model of config.plannedModels) {
    assert(Number.isInteger(model.phase)&&model.phase>=2&&model.phase<=7,'Fase inválida: '+model.id);
    assert(model.url===`./modelos/${model.category}/${model.id}/index.html`,'Rota planejada inválida: '+model.id);
  }
  for (const niche of config.niches) assert(categoryIds.has(niche.category),'Categoria do segmento inválida: '+niche.id);
  return true;
}
module.exports = {validateData};
if (require.main === module) {
  validateData(data);
  const sample = data.plannedModels[0]||data.projects[0];
  const link = new URL(whatsappURL(demoMessage(sample.name)));
  if (link.pathname!=='/'+data.whatsapp||!link.searchParams.get('text')||!demoMetadata(sample).title) throw new Error('Contato ou metadados da demonstração inválidos');
  console.log('Configuração válida: '+data.projects.length+' páginas disponíveis e '+data.plannedModels.length+' modelos planejados.');
}
