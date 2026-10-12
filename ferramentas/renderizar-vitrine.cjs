const fs=require('fs'),path=require('path');
const {whatsappURL,demoMessage}=require('../compartilhado/contato-ts.js');
const esc=s=>String(s).replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;');
const icon=name=>`<svg class="icon" aria-hidden="true"><use href="#icon-${name}"/></svg>`;
function renderVitrine(data,root){
 const categories=new Map(data.categories.map(c=>[c.id,c.name]));
 const ordered=[...data.projects].sort((a,b)=>{const x=data.featuredProjects.indexOf(a.id),y=data.featuredProjects.indexOf(b.id);return (x<0?999:x)-(y<0?999:y)});
 return ordered.map(p=>{
  const small=p.image.replace('.webp','-720.webp');
  const responsive=fs.existsSync(path.resolve(root,small))?`srcset="${esc(small)} 720w, ${esc(p.image)} 1000w" sizes="(max-width:600px) calc(100vw - 40px), (max-width:1000px) calc((100vw - 70px)/2), 605px"`:'';
  return `<article class="model-card" data-project="${p.id}" data-category="${p.category}" aria-labelledby="project-${p.id}"><a class="model-preview" href="${esc(p.url)}" target="_blank" rel="noopener noreferrer" title="Abrir ${esc(p.name)} em uma nova aba"><div class="window-bar"><span class="window-dots" aria-hidden="true"><i></i><i></i><i></i></span><span>${esc(p.focus)}</span><span class="preview-label">Projeto fictício</span></div><img src="${esc(p.image)}" ${responsive} alt="Prévia navegável do projeto fictício ${esc(p.name)}" width="1000" height="699" loading="lazy" decoding="async"><span class="preview-open">Ver projeto completo${icon('arrow')}</span></a><div class="model-info"><div class="project-tags"><span>${esc(categories.get(p.category))}</span><span>${esc(p.type)}</span></div><p class="project-focus">${esc(p.focus)}</p><h3 id="project-${p.id}">${esc(p.name)}</h3><p class="project-goal"><strong>Pensado para:</strong> ${esc(p.goal)}</p><p>${esc(p.description)}</p><ul class="model-features">${p.resources.map(item=>`<li>${icon('check')}${esc(item)}</li>`).join('')}</ul><div class="model-actions"><a class="button" href="${esc(p.url)}" target="_blank" rel="noopener noreferrer" aria-label="Explorar este projeto: ${esc(p.name)} em uma nova aba">Explorar este projeto${icon('arrow')}</a><a class="choose-link" href="${esc(whatsappURL(demoMessage(p.name)))}" data-whatsapp="${esc(demoMessage(p.name))}" target="_blank" rel="noopener noreferrer">Quero uma prévia para meu negócio${icon('arrow')}</a></div></div></article>`;
 }).join('\n');
}
function renderHero(data,root){
 const desktop=data.projects.find(p=>p.id==='modelo02');
 const requested=data.projects.find(p=>p.id==='modelo02');
 const phone=requested;
 return `<div class="showcase-caption"><span>Projetos com objetivos diferentes</span><strong>Explore a experiência completa.</strong></div><a class="showcase-window showcase-desktop" href="${desktop.url}" target="_blank" rel="noopener noreferrer" title="Abrir ${desktop.name} em uma nova aba"><div class="window-bar"><span class="window-dots" aria-hidden="true"><i></i><i></i><i></i></span><span>${desktop.label} · ${desktop.name}</span></div><img src="${desktop.image}" srcset="${desktop.image.replace('.webp','-720.webp')} 720w, ${desktop.image} 1000w" sizes="(max-width:600px) 82vw, (max-width:850px) 46vw, 550px" alt="Prévia do projeto fictício ${desktop.name} no computador" width="1000" height="699" fetchpriority="high"><span class="showcase-link">Explorar o modelo${icon('arrow')}</span></a><a class="showcase-phone" href="${phone.url}" target="_blank" rel="noopener noreferrer" aria-label="Explorar o projeto fictício ${phone.name} em uma nova aba"><img src="${phone.image.replace('.webp','-mobile.webp')}" srcset="${phone.image.replace('.webp','-mobile.webp')} 390w" sizes="(max-width:600px) 31vw, 170px" alt="Prévia do projeto fictício ${phone.name} no celular" width="390" height="844" fetchpriority="high"><span class="phone-speaker" aria-hidden="true"></span></a><p class="showcase-footnote">Capturas das demonstrações, com marcas fictícias.</p>`;
}
function renderSchema(data){
 const organization=data.siteUrl+'#organization';
 return {'@context':'https://schema.org','@graph':[
  {'@type':'Organization','@id':organization,name:data.brand,url:data.siteUrl,description:data.seo.description,logo:new URL('assets/ts-digital/logo.svg',data.siteUrl).href,telephone:'+'+data.whatsapp,address:{'@type':'PostalAddress',addressLocality:data.location.city,addressRegion:data.location.region,addressCountry:data.location.country}},
  {'@type':'WebSite','@id':data.siteUrl+'#website',url:data.siteUrl,name:data.brand,inLanguage:'pt-BR',publisher:{'@id':organization}},
  {'@type':'WebPage','@id':data.siteUrl+'#webpage',url:data.siteUrl,name:data.seo.title,description:data.seo.description,inLanguage:'pt-BR',isPartOf:{'@id':data.siteUrl+'#website'},about:{'@id':data.siteUrl+'#service'}},
  {'@type':'Service','@id':data.siteUrl+'#service',name:'Criação de sites personalizados',serviceType:'Desenvolvimento de sites, landing pages e catálogos digitais',provider:{'@id':organization},areaServed:{'@type':'Country',name:'Brasil'},description:'Design, conteúdo e recursos planejados conforme a necessidade do negócio, com atendimento em Seabra e online para outras cidades.'}
 ]};
}
module.exports={renderVitrine,renderHero,renderSchema};
