const personalizeText = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
const brandConfig=window.MODEL_CONFIG || {};
while(personalizeText.nextNode()){
 const node=personalizeText.currentNode;
 if(['SCRIPT','STYLE'].includes(node.parentElement.tagName))continue;
 node.nodeValue=node.nodeValue
   .replaceAll('Studio Personal',brandConfig.brandName || 'Studio Personal')
   .replaceAll('STUDIO PERSONAL',(brandConfig.brandName || 'Studio Personal').toUpperCase())
   .replaceAll('Marina Costa',brandConfig.coachName || 'Marina Costa')
   .replaceAll('MARINA COSTA',(brandConfig.coachName || 'Marina Costa').toUpperCase());
}
const config = window.MODEL_CONFIG || {};
document.querySelectorAll('[data-field]').forEach(element => {
  const key = element.dataset.field;
  if (config[key] !== undefined) element.textContent = config[key];
});
document.querySelectorAll('[data-field="heroTitle"]').forEach(element => {
 const lines=element.textContent.split('\n');
 element.replaceChildren();
 lines.forEach((line,index)=>{
  if(index)element.append(document.createElement('br'));
  if(index===lines.length-1){
   const accent=document.createElement('span');accent.style.color='var(--accent)';accent.textContent=line;element.append(accent);
  }else element.append(document.createTextNode(line));
 });
});
if(config.pageTitle) document.title = config.pageTitle;
const description=document.querySelector('meta[name="description"]');
if(description && config.description) description.content=config.description;
if(config.accent) {
 document.documentElement.style.setProperty('--accent',config.accent);
 document.querySelectorAll('[style*="--accent:"]').forEach(e=>e.style.setProperty('--accent',config.accent));
}
if(config.background) {
 document.documentElement.style.setProperty('--bg',config.background);
 document.querySelectorAll('[style*="--ground:"]').forEach(e=>e.style.setProperty('--ground',config.background));
}
const instagram=(config.instagram || '').replace(/^@/,'');
document.querySelectorAll('[data-field="instagramLabel"]').forEach(e=>e.textContent=instagram?'@'+instagram:'Instagram a definir');
document.querySelectorAll('[data-instagram]').forEach(link=>{
 if(instagram) link.href='https://www.instagram.com/'+encodeURIComponent(instagram)+'/';
 else {link.removeAttribute('target');link.removeAttribute('rel');link.href='#contato';}
});
const number=(config.whatsapp||'').replace(/\D/g,'');
document.querySelectorAll('[data-whatsapp]').forEach(link=>{
 link.href=number?'https://wa.me/'+number+'?text='+encodeURIComponent(config.message||'Olá! Gostaria de conhecer seu acompanhamento.'):'#contato';
 if(!number)link.addEventListener('click',event=>{
  event.preventDefault();
  const info=document.querySelector('.demo-contact');
  info.hidden=false;
  info.scrollIntoView({behavior:'smooth',block:'center'});
 });
});
if(config.demo !== false){
 const banner=document.createElement('div');banner.className='demo-banner';
 const back=document.createElement('a');back.href='../';back.textContent='← Catálogo';
 const label=document.createElement('span');label.textContent='Modelo demonstrativo · Conteúdo e números fictícios';
 banner.append(back,label);document.body.prepend(banner);
 const info=document.createElement('p');info.className='demo-contact';info.hidden=true;info.tabIndex=-1;
 info.textContent='Este é um modelo de demonstração. O WhatsApp, as fotos e as informações serão personalizados para cada profissional.';
 document.querySelector('#contato').append(info);
}