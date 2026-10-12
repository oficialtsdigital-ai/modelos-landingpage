/* Comportamentos comuns; cada academia mantém seu próprio conteúdo e layout. */
(() => {
  'use strict';
  const model = window.TS_CONTACT.findModel(document.body.dataset.demoModel);
  if (!model) return;
  const menu = document.querySelector('[data-menu]');
  const navigation = document.querySelector('[data-navigation]');
  const closeMenu = () => {menu.setAttribute('aria-expanded','false');navigation.classList.remove('is-open')};
  menu.addEventListener('click',()=>{
    const open = menu.getAttribute('aria-expanded')!=='true';
    menu.setAttribute('aria-expanded',String(open));navigation.classList.toggle('is-open',open);
  });
  navigation.querySelectorAll('a').forEach(link=>link.addEventListener('click',closeMenu));
  document.addEventListener('keydown',event=>{if(event.key==='Escape'&&menu.getAttribute('aria-expanded')==='true'){closeMenu();menu.focus()}});
  document.addEventListener('click',event=>{if(menu.getAttribute('aria-expanded')==='true'&&!event.target.closest('[data-header]'))closeMenu()});
  const dialog = document.querySelector('#demo-dialog');
  const quote = dialog.querySelector('[data-demo-quote]');
  quote.href = window.TS_CONTACT.whatsappURL(window.TS_CONTACT.demoMessage(model.name));
  let trigger;
  document.querySelectorAll('[data-demo-action]').forEach(link=>link.addEventListener('click',event=>{
    event.preventDefault();closeMenu();trigger=link;
    dialog.querySelector('[data-demo-choice]').textContent=link.dataset.demoAction;
    dialog.showModal();
  }));
  dialog.addEventListener('click',event=>{if(event.target===dialog){const box=dialog.getBoundingClientRect();if(event.clientX<box.left||event.clientX>box.right||event.clientY<box.top||event.clientY>box.bottom)dialog.close()}});
  dialog.addEventListener('close',()=>trigger?.focus());
  document.querySelectorAll('[data-tabs]').forEach(group=>{
    const tabs=[...group.querySelectorAll('[role="tab"]')];
    const activate=tab=>tabs.forEach(item=>{const active=item===tab;item.setAttribute('aria-selected',String(active));item.tabIndex=active?0:-1;document.getElementById(item.getAttribute('aria-controls')).hidden=!active});
    tabs.forEach((tab,index)=>{
      tab.addEventListener('click',()=>activate(tab));
      tab.addEventListener('keydown',event=>{
        const next=event.key==='ArrowRight'?tabs[(index+1)%tabs.length]:event.key==='ArrowLeft'?tabs[(index-1+tabs.length)%tabs.length]:event.key==='Home'?tabs[0]:event.key==='End'?tabs.at(-1):null;
        if(next){event.preventDefault();activate(next);next.focus()}
      });
    });
  });
  const days=[...document.querySelectorAll('[data-day]')];
  days.forEach(button=>button.addEventListener('click',()=>{
    days.forEach(day=>day.setAttribute('aria-pressed',String(day===button)));
    document.querySelectorAll('[data-schedule]').forEach(panel=>panel.hidden=panel.dataset.schedule!==button.dataset.day);
    const status=document.querySelector('#schedule-status');
    if(status)status.textContent='Aulas demonstrativas de '+button.textContent.trim();
  }));
})();
