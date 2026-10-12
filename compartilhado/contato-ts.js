/* Contato e metadados comuns da TS Digital, para Node e navegador. */
(function (global) {
  'use strict';
  const data = typeof module !== 'undefined' && module.exports
    ? require('../dados-site.js') : global.TS_DIGITAL;
  if (!data) return;
  const whatsappURL = message => `https://wa.me/${data.whatsapp}?text=${encodeURIComponent(message)}`;
  const demoMessage = name => `Olá! Quero uma prévia do meu site com a TS Digital. Vi o projeto demonstrativo ${name} e gostaria de conversar sobre uma criação personalizada para meu negócio.`;
  const previewMessage = () => data.previewMessage || 'Olá! Quero uma prévia do meu site com a TS Digital.';
  const findModel = id => [...data.projects, ...data.plannedModels, ...(data.legacyModels||[])].find(model => model.id === id);
  const demoMetadata = model => ({
    title: `${model.name} — Modelo demonstrativo | ${data.brand}`,
    description: `Demonstração ${model.name}, no estilo ${model.style}. Modelo desenvolvido pela ${data.brand}; marca e conteúdo fictícios.`,
    robots: 'noindex, follow',
    url: new URL(model.url, data.siteUrl).href
  });
  const api = {whatsappURL, demoMessage, previewMessage, findModel, demoMetadata};
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  else global.TS_CONTACT = api;
})(typeof window !== 'undefined' ? window : globalThis);
