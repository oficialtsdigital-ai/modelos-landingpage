/* Cinco experiências demonstrativas. Nenhum dado é enviado ou armazenado. */
(()=>{
 'use strict';document.documentElement.classList.add('personal-js');
 const menu=document.querySelector('[data-personal-menu]'),nav=document.querySelector('.p-nav');
 const closeMenu=()=>{menu.setAttribute('aria-expanded','false');nav.classList.remove('is-open')};
 menu.addEventListener('click',()=>{const open=menu.getAttribute('aria-expanded')!=='true';menu.setAttribute('aria-expanded',String(open));nav.classList.toggle('is-open',open)});
 nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',closeMenu));
 document.addEventListener('keydown',e=>{if(e.key==='Escape'&&menu.getAttribute('aria-expanded')==='true'){closeMenu();menu.focus()}});
 document.addEventListener('click',e=>{if(menu.getAttribute('aria-expanded')==='true'&&!e.target.closest('.p-header'))closeMenu()});
 const model=window.TS_CONTACT.findModel(document.body.dataset.demoModel);
 document.querySelectorAll('[data-demo-quote]').forEach(a=>a.href=window.TS_CONTACT.whatsappURL(window.TS_CONTACT.demoMessage(model.name)));
 const dialog=document.querySelector('#personal-dialog'),body=dialog.querySelector('[data-personal-dialog-content]');let trigger,activeProduct=false;
 function show(title,content,source){trigger=source||document.activeElement;dialog.querySelector('h2').textContent=title;body.replaceChildren();if(typeof content==='string'){const p=document.createElement('p');p.textContent=content;body.append(p)}else body.append(content);closeMenu();if(!dialog.open)dialog.showModal();dialog.querySelector('[data-personal-close]').focus()}
 document.querySelectorAll('[data-personal-action]').forEach(button=>button.addEventListener('click',()=>show('Uma conversa demonstrativa.',button.dataset.personalAction,button)));
 document.querySelectorAll('[data-personal-close]').forEach(button=>button.addEventListener('click',()=>dialog.close()));
 dialog.addEventListener('click',event=>{if(event.target===dialog){const r=dialog.getBoundingClientRect();if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom)dialog.close()}});
 dialog.addEventListener('close',()=>{if(activeProduct){const url=new URL(location.href);url.searchParams.delete('produto');url.searchParams.delete('ref');history.replaceState(null,'',url);activeProduct=false}if(trigger?.getClientRects().length)trigger.focus()});
 document.querySelectorAll('[data-tab-group]').forEach(group=>{
  const tabs=[...group.querySelectorAll('[role=tab]')];
  const activate=tab=>tabs.forEach(item=>{const selected=item===tab;item.setAttribute('aria-selected',String(selected));item.tabIndex=selected?0:-1;document.getElementById(item.getAttribute('aria-controls')).hidden=!selected});
  tabs.forEach((tab,i)=>{tab.addEventListener('click',()=>activate(tab));tab.addEventListener('keydown',event=>{const next=event.key==='ArrowRight'?tabs[(i+1)%tabs.length]:event.key==='ArrowLeft'?tabs[(i-1+tabs.length)%tabs.length]:event.key==='Home'?tabs[0]:event.key==='End'?tabs.at(-1):null;if(next){event.preventDefault();activate(next);next.focus()}})});
 });
 const goals=document.querySelector('[data-goal-form]');if(goals)goals.addEventListener('submit',event=>{event.preventDefault();if(!goals.reportValidity())return;show('Primeira conversa: demonstração.','Objetivo ilustrativo: '+new FormData(goals).get('goal')+'. Nenhuma informação foi enviada.',goals.querySelector('button[type=submit]'))});
 const visit=document.querySelector('[data-visit-form]');if(visit){const days=[...visit.querySelectorAll('[data-visit-day]')];days.forEach(button=>button.addEventListener('click',()=>{days.forEach(day=>day.setAttribute('aria-pressed',String(day===button)));visit.elements.day.value=button.dataset.visitDay;visit.querySelectorAll('[name=time]').forEach(input=>input.checked=false);visit.querySelector('[data-visit-status]').textContent=button.dataset.visitDay+' · escolha um horário demonstrativo.'}));visit.addEventListener('submit',event=>{event.preventDefault();if(!visit.reportValidity())return;const values=new FormData(visit);show('Agendamento demonstrativo.',values.get('day')+' às '+values.get('time')+'. Nenhuma conversa foi marcada ou enviada.',visit.querySelector('button[type=submit]'))})}
 document.querySelectorAll('[data-course-preview]').forEach(button=>button.addEventListener('click',()=>{const template=document.getElementById('course-content-'+button.dataset.coursePreview);show('Prévia de conteúdo demonstrativo.',template.content.cloneNode(true),button)}));
 dialog.addEventListener('click',event=>{const button=event.target.closest('[data-course-buy]');if(button)dialog.querySelector('[data-course-status]').textContent='Compra demonstrativa. Nenhum pagamento, cadastro ou acesso a um curso real será realizado.'});
 const filters=[...document.querySelectorAll('[data-product-filter]')],products=[...document.querySelectorAll('[data-product-category]')];
 filters.forEach(button=>button.addEventListener('click',()=>{filters.forEach(item=>item.setAttribute('aria-pressed',String(item===button)));let count=0;products.forEach(product=>{product.hidden=button.dataset.productFilter!=='todos'&&product.dataset.productCategory!==button.dataset.productFilter;if(!product.hidden)count++});document.querySelector('#product-status').textContent=count+' produtos demonstrativos · '+button.textContent.trim()}));
 const links=[...document.querySelectorAll('[data-product-link]')];
 function showProduct(id,source){const product=products.find(item=>item.dataset.productId===id),template=document.getElementById('product-content-'+id);if(!product||!template)return;show(product.querySelector('h3').textContent+' · demonstração',template.content.cloneNode(true),source);activeProduct=true}
 links.forEach(link=>link.addEventListener('click',event=>{if(event.ctrlKey||event.metaKey||event.shiftKey||event.altKey)return;event.preventDefault();history.pushState(null,'',link.href);showProduct(link.dataset.productLink,link)}));
 if(links.length){const id=new URLSearchParams(location.search).get('produto');if(id)showProduct(id,links.find(a=>a.dataset.productLink===id));addEventListener('popstate',()=>{const selected=new URLSearchParams(location.search).get('produto');if(selected)showProduct(selected,links.find(a=>a.dataset.productLink===selected));else if(dialog.open){activeProduct=false;dialog.close()}})}
})();
