const fs=require('fs'),path=require('path');
const data=require('../dados-site.js');
const restaurantData=require('./dados-restaurantes.cjs');
const content={...require('./dados-academias.cjs'),...require('./dados-saude.cjs'),...restaurantData.restaurantes};
const menus=restaurantData.menus;
const contact=require('../compartilhado/contato-ts.js');
const root=path.resolve(__dirname,'..');
const escape=value=>String(value).replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;');
const icon=name=>`<svg class="icon" aria-hidden="true"><use href="#${name}"/></svg>`;
const icons='<svg class="svg-defs" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><defs><symbol id="arrow" viewBox="0 0 24 24"><path d="M5 19 19 5M5 5h14v14"/></symbol><symbol id="check" viewBox="0 0 24 24"><path d="m5 12 4 4L19 6"/></symbol><symbol id="clock" viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><path d="M12 6v6l4 2"/></symbol><symbol id="weight" viewBox="0 0 24 24"><path d="M8 12h8M5 7v10M8 5v14M16 5v14M19 7v10M3 12h2m14 0h2"/></symbol><symbol id="move" viewBox="0 0 24 24"><circle cx="14" cy="4" r="2"/><path d="m5 10 5-3 4 3 4 1M10 7l-2 7 5 3-1 5M8 14l-4 6"/></symbol><symbol id="heart" viewBox="0 0 24 24"><path d="M12 21 3 12C-2 5 7-1 12 6c5-7 14-1 9 6Z"/></symbol></defs></svg>';
const symbol=(id,body)=>`<symbol id="${id}" viewBox="0 0 24 24">${body}</symbol>`;
const iconSet=list=>icons.replace('</defs>',list.join('')+'</defs>');
const SAUDE_ICONS=iconSet([
 symbol('tooth','<path d="M12 5c-5-4-10 0-8 6 1 3 1 9 4 9 2 0 1-6 4-6s2 6 4 6c3 0 3-6 4-9 2-6-3-10-8-6Z"/>'),
 symbol('smile','<circle cx="12" cy="12" r="9"/><path d="M7 13c1 5 9 5 10 0M8 8h.01M16 8h.01"/>'),
 symbol('health','<path d="M9 3h6v6h6v6h-6v6H9v-6H3V9h6Z"/>'),
 symbol('spark','<path d="m12 3 3 6 6 3-6 3-3 6-3-6-6-3 6-3Z"/>'),
 symbol('leaf','<path d="M5 19C0 8 7 3 20 3c0 13-4 19-15 16Zm0 0L16 7"/>'),
 symbol('chat','<path d="M4 3h16v14H9l-5 4V3Z"/><path d="M8 8h8M8 12h5"/>'),
 symbol('pin','<path d="M12 22S4 13 4 8a8 8 0 0 1 16 0c0 5-8 14-8 14Z"/><circle cx="12" cy="8" r="3"/>')
]);
const RESTAURANT_ICONS=iconSet([
 symbol('flame','<path d="M12 22c4 0 7-3 7-7 0-5-4-6-3-11-4 2-9 6-9 11 0 4 2 7 5 7Z"/><path d="M12 22c2 0 3.5-1.6 3.5-3.5 0-2.4-2-3-1.8-5.5-1.7 1-3.7 2.6-3.7 5 0 2 1 4 2 4Z"/>'),
 symbol('fish','<path d="M2 12c4-5 9-7 13-7 3 0 5 2 5 2l2-3v16l-2-3s-2 2-5 2c-4 0-9-2-13-7Z"/><circle cx="16" cy="11" r="1"/>'),
 symbol('wheat','<path d="M12 22V9M12 9c0-3 1.5-5 4-6 1 3-1 5.5-4 6Zm0 0c0-3-1.5-5-4-6-1 3 1 5.5 4 6Zm0 5c0-3 1.5-5 4-6 1 3-1 5.5-4 6Zm0 0c0-3-1.5-5-4-6-1 3 1 5.5 4 6Z"/>'),
 symbol('wine','<path d="M8 3h8v5a4 4 0 0 1-8 0V3ZM12 12v7M9 22h6"/>'),
 symbol('pizza','<path d="M3 6c6-3 12-3 18 0L12 21 3 6Z"/><circle cx="10" cy="10" r="1"/><circle cx="14" cy="13" r="1"/>'),
 symbol('seat','<path d="M5 11V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v6M3 11h18v6H3v-6Zm2 6v4m14-4v4"/>'),
 symbol('menu-book','<path d="M4 4h16v16H4z"/><path d="M8 9h8M8 13h5"/>'),
 symbol('pin','<path d="M12 22S4 13 4 8a8 8 0 0 1 16 0c0 5-8 14-8 14Z"/><circle cx="12" cy="8" r="3"/>')
]);
function renderDemonstrations(ids=data.projects.map(model=>model.id)){
 let count=0;
 for(const id of ids){
  const model=contact.findModel(id);if(!model||!content[id])continue;
  const file=path.resolve(root,model.url);
  if(!file.startsWith(root+path.sep)||!fs.existsSync(file))throw new Error('Página da demonstração ausente: '+id);
  const relative=path.relative(path.dirname(file),root).replaceAll('\\','/')+'/';
  const meta=contact.demoMetadata(model);
  const metadata=`<title>${escape(meta.title)}</title><meta name="description" content="${escape(meta.description)}"><meta name="robots" content="${meta.robots}"><link rel="canonical" href="${escape(meta.url)}"><meta property="og:title" content="${escape(meta.title)}"><meta property="og:description" content="${escape(meta.description)}"><meta property="og:type" content="website"><meta property="og:locale" content="pt_BR"><meta property="og:url" content="${escape(meta.url)}">`;
  const quote=contact.whatsappURL(contact.demoMessage(model.name));
  const bar=`<aside class="ts-demo" aria-label="Informações do modelo demonstrativo"><p>Modelo demonstrativo desenvolvido pela TS Digital.</p><nav aria-label="Navegação da demonstração"><a href="${relative}${data.portfolioAnchor}">Voltar ao portfólio</a><a class="ts-demo-quote" href="${escape(quote)}" target="_blank" rel="noopener noreferrer">Solicitar um site como este</a></nav></aside>`;
  const plan=(p,i,variant='')=>`<article class="plan-card ${i===1?'featured':''} ${variant}"><p class="plan-category">${escape(p.description)}</p><h3>${escape(p.name)}</h3><p class="price"><span>R$</span><strong>${p.price}</strong><span>,00<small>/mês</small></span></p><ul>${p.items.map(item=>`<li>${icon('check')}${escape(item)}</li>`).join('')}</ul><a class="button" href="#contato" data-demo-action="${escape(p.name)} — R$ ${p.price},00/mês (valor demonstrativo)">${id==='pulse-studio'?'Escolher assinatura':'Conhecer este plano'}${icon('arrow')}</a></article>`;
  const team=person=>`<article class="team-person"><span class="team-initial" aria-hidden="true">${escape(person.initials)}</span><div><h3>${escape(person.name)}</h3><p>${escape(person.role)}</p></div></article>`;
   const sections={DEMO_META:metadata,DEMO:bar};
    if(model.category==='saude')sections.ICONS=SAUDE_ICONS;
    if(model.category==='restaurantes')sections.ICONS=RESTAURANT_ICONS;
  if(model.category!=='saude'&&model.category!=='restaurantes')sections.ICONS=icons;
  if(model.category==='saude'){
   const c=content[id];
   const action=name=>escape(name+' — atendimento demonstrativo');
   sections.SERVICES=c.services.map(service=>{
    const title=escape(service.name),description=escape(service.description);
    if(id==='odonto-prime')return `<article class="care-row">${icon(service.icon)}<div><h3>${title}</h3><p>${description}</p></div><a href="#contato" data-demo-action="${action(service.name)}" aria-label="Conhecer ${title}">${icon('arrow')}</a></article>`;
    if(id==='vitalis-clinica')return `<article class="service-card" data-service-category="${service.category}">${icon(service.icon)}<h3>${title}</h3><p>${description}</p><a class="text-link" href="#contato" data-demo-action="${action(service.name)}">Conhecer atendimento${icon('arrow')}</a></article>`;
    return `<details class="care-detail"><summary><span>${title}</span><span class="expand-icon" aria-hidden="true">+</span></summary><div><p>${description}</p><a class="text-link" href="#contato" data-demo-action="${action(service.name)}">Conversar sobre atendimento${icon('arrow')}</a></div></details>`;
   }).join('\n');
   sections.HOURS='<dl class="hours">'+c.hours.map(([day,time])=>`<div><dt>${escape(day)}</dt><dd>${escape(time)}</dd></div>`).join('')+'</dl>';
   sections.LOCATION=`<p class="location-note">${escape(c.location)}</p>`;
   if(c.profile)sections.PROFILE=`<p class="section-intro">${escape(c.profile.label)}</p><h2>${escape(c.profile.title)}</h2><p>${escape(c.profile.description)}</p><div class="profile-name"><span class="profile-initial" aria-hidden="true">${c.profile.initials}</span><div><h3>${escape(c.profile.name)}</h3><p>Personagem da demonstração</p></div></div>`;
   if(c.coverage)sections.COVERAGE=c.coverage.map(name=>`<li>${icon('health')}<span>${escape(name)}</span></li>`).join('');
   if(c.periods){sections.SERVICE_OPTIONS='<option value="">Selecione o atendimento</option>'+c.services.map(service=>`<option>${escape(service.name)}</option>`).join('');sections.PERIOD_OPTIONS='<option value="">Selecione o turno</option>'+c.periods.map(period=>`<option>${escape(period)}</option>`).join('');}
  }
     if(model.category==='restaurantes'){
    const c=content[id];
    const sectionsMenu=menus[id];
    sections.MENU=sectionsMenu.map(group=>`<section class="menu-section" id="menu-${group.id}" aria-labelledby="menu-${group.id}-title"><header class="menu-section-head">${group.note?`<p class="menu-kicker">${escape(group.note)}</p>`:''}<h3 id="menu-${group.id}-title">${escape(group.title)}</h3></header><ul class="menu-list">${group.items.map(item=>`<li class="menu-item"><div class="menu-item-head"><h4>${escape(item.name)}</h4><p class="menu-price"><span class="sr-only">Valor fictício: </span>${escape(item.price)}</p></div><p class="menu-desc">${escape(item.desc)}</p>${item.tag?`<p class="menu-tag">${escape(item.tag)}</p>`:''}</li>`).join('')}</ul></section>`).join('\n');
    sections.HOURS='<dl class="hours">'+c.hours.map(([day,time])=>`<div><dt>${escape(day)}</dt><dd>${escape(time)}</dd></div>`).join('')+'</dl>';
    sections.LOCATION=`<p class="location-note">${escape(c.location)}</p>`;
    sections.TABLE_OPTIONS='<option value="">Quantas pessoas</option>'+c.mesas.map(mesa=>`<option>${escape(mesa)}</option>`).join('');
    sections.SHIFT_OPTIONS='<option value="">Qual período</option>'+c.turnos.map(turno=>`<option>${escape(turno)}</option>`).join('');
   }
   if(content[id].monthly){sections.MONTHLY=content[id].monthly.map((p,i)=>plan(p,i)).join('\n');sections.ANNUAL=content[id].annual.map((p,i)=>plan(p,i)).join('\n')}
  if(content[id].plans)sections.PLANS=content[id].plans.map((p,i)=>plan(p,i,id==='viva-fit'?'soft-plan':'')).join('\n');
  if(content[id].team)sections.TEAM=content[id].team.map(team).join('\n');
  if(content[id].schedule)sections.SCHEDULE=Object.entries(content[id].schedule).map(([day,classes],index)=>`<div data-schedule="${day}" ${index?'hidden':''} class="schedule-list">${classes.map(([time,name,type,duration])=>`<article><time>${time}</time><div><h3>${escape(name)}</h3><p>${escape(type)}</p></div><span>${duration}</span><a href="#contato" data-demo-action="${escape(name)} às ${time} — reserva demonstrativa">Reservar${icon('arrow')}</a></article>`).join('')}</div>`).join('\n');
  let html=fs.readFileSync(file,'utf8');
  for(const [key,value]of Object.entries(sections)){
   const pattern=new RegExp(`(<!-- TS:${key} -->)[\\s\\S]*?(<!-- /TS:${key} -->)`);
   if(!pattern.test(html))throw new Error('Marcador '+key+' ausente: '+id);
   html=html.replace(pattern,(_,a,b)=>a+'\n'+value+'\n'+b);
  }
  html=html.replace(/<a\b[^>]*\bdata-demo-quote[^>]*>/g,tag=>/\bhref="[^"]*"/.test(tag)?tag.replace(/\bhref="[^"]*"/,`href="${escape(quote)}"`):tag.replace('<a ',`<a href="${escape(quote)}" `));
  fs.writeFileSync(file,html);count++;
 }
 return count;
}
module.exports={renderDemonstrations};
if(require.main===module)console.log('Demonstrações renderizadas: '+renderDemonstrations(process.argv.slice(2).length?process.argv.slice(2):undefined));
