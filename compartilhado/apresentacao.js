/* Interações da reformulação: cardápio e pedido apenas demonstrativos. */
(() => {
 'use strict';
 const buttons=[...document.querySelectorAll('[data-menu-filter]')];
 const sections=[...document.querySelectorAll('.menu-section')];
 const board=document.querySelector('.menu-board');
 const status=document.querySelector('#menu-status');
 buttons.forEach(button=>button.addEventListener('click',()=>{
  const category=button.dataset.menuFilter;
  buttons.forEach(item=>item.setAttribute('aria-pressed',String(item===button)));
  let count=0;
  sections.forEach(section=>{
   const visible=category==='todos'||section.id==='menu-'+category;
   section.hidden=!visible;section.classList.remove('is-selected');
   if(visible){count+=section.querySelectorAll('.menu-item').length;requestAnimationFrame(()=>section.classList.add('is-selected'))}
  });
  board.classList.toggle('is-filtered',category!=='todos');
  status.textContent=button.textContent.trim()+' · '+count+' opções no cardápio demonstrativo';
 }));
 const order=document.querySelector('#order-dialog');
 if(!order)return;
 let trigger;
 document.querySelectorAll('[data-order-open]').forEach(button=>button.addEventListener('click',()=>{
  trigger=button;order.querySelector('[data-order-status]').textContent='';
  order.showModal();order.querySelector('select').focus();
 }));
 order.querySelector('[data-order-close]').addEventListener('click',()=>order.close());
 order.addEventListener('close',()=>trigger?.focus());
 order.addEventListener('click',event=>{if(event.target===order){const r=order.getBoundingClientRect();if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom)order.close()}});
 order.querySelector('form').addEventListener('submit',event=>{
  event.preventDefault();
  const select=order.querySelector('select');
  if(!select.reportValidity())return;
  order.querySelector('[data-order-status]').textContent='Pedido demonstrativo: '+select.value+'. Nenhum pedido foi enviado e nenhum pagamento será realizado.';
 });
})();
