/* Base da barra de demonstração para as próximas páginas.
   Carregue dados-site.js, contato-ts.js e este arquivo nessa ordem, com defer.
   Identifique a página com <body data-demo-model="id-do-modelo">. */
(() => {
  'use strict';
  const scriptURL = document.currentScript?.src;
  const contact = window.TS_CONTACT;
  const data = window.TS_DIGITAL;
  if (!scriptURL || !contact || !data) return;
  const rootURL = new URL('../', scriptURL);
  function mount(id, target = document.body) {
    const model = contact.findModel(id);
    if (!model || target.querySelector('.ts-demo')) return null;
    const bar = document.createElement('aside');
    bar.className = 'ts-demo';
    bar.setAttribute('aria-label', 'Informações do modelo demonstrativo');
    const label = document.createElement('p');
    label.textContent = 'Modelo demonstrativo desenvolvido pela TS Digital.';
    const links = document.createElement('nav');
    links.setAttribute('aria-label', 'Navegação da demonstração');
    const back = document.createElement('a');
    back.href = new URL(data.portfolioAnchor, rootURL).href;
    back.textContent = 'Voltar ao portfólio';
    const quote = document.createElement('a');
    quote.className = 'ts-demo-quote';
    quote.href = contact.whatsappURL(contact.demoMessage(model.name));
    quote.target = '_blank';
    quote.rel = 'noopener noreferrer';
    quote.textContent = 'Solicitar um site como este';
    links.append(back, quote);
    bar.append(label, links);
    target.prepend(bar);
    return bar;
  }
  window.TS_DEMO = {mount};
  if (document.body.dataset.demoModel) mount(document.body.dataset.demoModel);
})();
