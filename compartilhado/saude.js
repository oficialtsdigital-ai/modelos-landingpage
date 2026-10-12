/* Interações específicas dos modelos de saúde; não coleta dados pessoais. */
(() => {
 'use strict';
 const filters=[...document.querySelectorAll('[data-service-filter]')];
 const services=[...document.querySelectorAll('[data-service-category]')];
 filters.forEach(button=>button.addEventListener('click',()=>{
  filters.forEach(filter=>filter.setAttribute('aria-pressed',String(filter===button)));
  let count=0;
  services.forEach(service=>{const visible=button.dataset.serviceFilter==='todos'||service.dataset.serviceCategory===button.dataset.serviceFilter;service.hidden=!visible;if(visible)count++});
  document.querySelector('#service-status').textContent=count+' atendimentos demonstrativos · '+button.textContent.trim();
 }));
 const form=document.querySelector('[data-demo-appointment]');
 if(!form)return;
 const dialog=document.querySelector('#demo-dialog');
 let formTrigger;
 form.addEventListener('submit',event=>{
  event.preventDefault();if(!form.reportValidity())return;
  formTrigger=form.querySelector('button[type="submit"]');
  const selected=new FormData(form);
  dialog.querySelector('[data-demo-choice]').textContent=selected.get('service')+' · '+selected.get('period')+' · solicitação demonstrativa';
  dialog.showModal();
 });
 dialog.addEventListener('close',()=>{if(formTrigger){formTrigger.focus();formTrigger=null}});
})();
