(() => {
 'use strict';
 const data=window.TS_DIGITAL,contact=window.TS_CONTACT;
 if(!data||!contact)return;
 document.documentElement.classList.add('js');
 document.querySelectorAll('[data-whatsapp]').forEach(link=>{const message=link.hasAttribute('data-preview')?contact.previewMessage():link.dataset.whatsapp;link.dataset.whatsapp=message;link.href=contact.whatsappURL(message)});
 document.querySelectorAll('[data-contact-number]').forEach(el=>el.textContent=data.whatsappDisplay);
 const menu=document.querySelector('.menu-toggle'),nav=document.querySelector('.site-nav');
 const closeMenu=()=>{menu.setAttribute('aria-expanded','false');nav.classList.remove('is-open')};
 menu.addEventListener('click',()=>{const open=menu.getAttribute('aria-expanded')!=='true';menu.setAttribute('aria-expanded',String(open));nav.classList.toggle('is-open',open)});
 nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',closeMenu));
 document.addEventListener('keydown',e=>{if(e.key==='Escape'&&menu.getAttribute('aria-expanded')==='true'){closeMenu();menu.focus()}});
 document.addEventListener('click',e=>{if(menu.getAttribute('aria-expanded')==='true'&&!e.target.closest('.site-header'))closeMenu()});
 const filters=[...document.querySelectorAll('[data-filter]')],cards=[...document.querySelectorAll('[data-project]')];
 const count=document.querySelector('#project-count'),empty=document.querySelector('#portfolio-empty'),more=document.querySelector('[data-more-projects]');
 const emptyContact=empty.querySelector('[data-whatsapp]'),featured=new Set(data.featuredProjects);
 let state={category:'todos',complete:false};
 function readState(){const params=new URLSearchParams(location.search);return {category:data.categories.some(c=>c.id===params.get('segmento'))?params.get('segmento'):'todos',complete:params.get('vitrine')==='completa'}}
 function render(interest){
  const current=data.categories.find(c=>c.id===state.category);
  filters.forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.filter===state.category)));
  let visible=0;
  cards.forEach(card=>{card.hidden=state.category==='todos'?(!state.complete&&!featured.has(card.dataset.project)):card.dataset.category!==state.category;if(!card.hidden)visible++});
  empty.hidden=visible>0;
  const limited=state.category==='todos'&&!state.complete;
  count.textContent=visible?`${limited?visible+' de '+cards.length:visible} projetos demonstrativos${state.category==='todos'?'':' em '+current.name}`:`Vamos pensar em um projeto para ${current.name.toLowerCase()}.`;
  more.parentElement.hidden=state.category!=='todos';more.setAttribute('aria-expanded',String(state.complete));more.textContent=state.complete?'Mostrar seleção de projetos':'Explorar todos os '+cards.length+' projetos';
  if(!visible){const niche=data.niches.find(n=>n.id===interest)||data.niches.find(n=>n.category===state.category);empty.querySelector('[data-empty-interest]').textContent=niche?.title||current.name;const message=`Olá! Quero uma prévia do meu site com a TS Digital. Meu negócio é do segmento ${niche?.title||current.name} e gostaria de conversar sobre uma criação personalizada.`;emptyContact.dataset.whatsapp=message;emptyContact.href=contact.whatsappURL(message)}
 }
 function updateURL(hash){const url=new URL(location.href);if(state.category==='todos')url.searchParams.delete('segmento');else url.searchParams.set('segmento',state.category);if(state.complete)url.searchParams.set('vitrine','completa');else url.searchParams.delete('vitrine');if(hash)url.hash='modelos';history.pushState(null,'',url)}
 filters.forEach(b=>b.addEventListener('click',()=>{state.category=b.dataset.filter;state.complete=false;render();updateURL(false)}));
 more.addEventListener('click',()=>{state.complete=!state.complete;render();updateURL(false);if(!state.complete){document.querySelector('#modelos').scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'});filters[0].focus({preventScroll:true})}});
 document.querySelectorAll('[data-explore]').forEach(a=>a.addEventListener('click',e=>{e.preventDefault();state={category:a.dataset.explore,complete:false};render(a.dataset.interest);updateURL(true);document.querySelector('#modelos').scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'})}));
 window.addEventListener('popstate',()=>{state=readState();render()});state=readState();render();
})();
