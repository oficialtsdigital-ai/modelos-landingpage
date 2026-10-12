/* Interações dos modelos de restaurantes (Fase 4).
   Nav compacta + reserva de mesa 100% simulada.
   Não coleta nome, telefone, e-mail ou qualquer dado pessoal. */
(function(){
  'use strict';

  document.documentElement.classList.add('js');

  function select(selector,context){
    return (context||document).querySelector(selector);
  }
  function selectAll(selector,context){
    return Array.prototype.slice.call((context||document).querySelectorAll(selector));
  }
  function setStatus(text){
    var status=select('[data-demo-status]');
    if(status)status.textContent=text;
  }
  function setMessage(text){
    var message=select('[data-demo-message]');
    if(message)message.textContent=text;
  }

  /* ---------- navegação ---------- */
  function initNav(){
    var toggle=select('[data-nav]');
    var panel=select('[data-nav-panel]');
    if(!toggle||!panel)return;
    var open=function(){
      panel.classList.add('is-open');
      toggle.setAttribute('aria-expanded','true');
      toggle.setAttribute('aria-label','Fechar menu');
    };
    var close=function(){
      panel.classList.remove('is-open');
      toggle.setAttribute('aria-expanded','false');
      toggle.setAttribute('aria-label','Abrir menu');
    };
    toggle.addEventListener('click',function(){
      if(panel.classList.contains('is-open'))close();else open();
    });
    selectAll('a,button',panel).forEach(function(link){
      link.addEventListener('click',close);
    });
    document.addEventListener('keydown',function(event){
      if(event.key==='Escape'&&panel.classList.contains('is-open')){close();toggle.focus()}
    });
    document.addEventListener('click',function(event){if(panel.classList.contains('is-open')&&!event.target.closest('.site-header'))close()});
  }

  /* ---------- reserva simulada ---------- */
  function initReservation(){
    var dialog=select('#demo-dialog');
    var openers=selectAll('[data-reserve-open]');
    if(!dialog||!openers.length)return;
    var returnFocus=null;

    var firstField=function(){
      return select('select,input,button',dialog);
    };

    var open=function(trigger){
      returnFocus=trigger||document.activeElement;
      if(typeof dialog.showModal==='function'){
        if(!dialog.open)dialog.showModal();
      }else{
        dialog.setAttribute('open','');
      }
      dialog.classList.add('is-open');
      var target=firstField();
      if(target)target.focus();
    };

    var close=function(){
      if(typeof dialog.close==='function'&&dialog.open)dialog.close();
      else dialog.removeAttribute('open');
      dialog.classList.remove('is-open');
      var message=select('[data-demo-message]',dialog);
      if(message)message.textContent='';
      if(returnFocus&&returnFocus.getClientRects().length)returnFocus.focus();
      else{var toggle=select('[data-nav]');if(toggle)toggle.focus()}
    };

    openers.forEach(function(button){
      button.addEventListener('click',function(){open(button)});
    });

    selectAll('[data-demo-close]',dialog).forEach(function(button){
      button.addEventListener('click',close);
    });

    dialog.addEventListener('click',function(event){
      if(event.target===dialog)close();
    });

    dialog.addEventListener('cancel',function(event){
      event.preventDefault();
      close();
    });

    var form=select('[data-demo-reservation]',dialog);
    if(!form)return;

    form.addEventListener('submit',function(event){
      event.preventDefault();
      var table=select('[name="table"]',form);
      var day=select('[name="day"]',form);
      var shift=select('[name="shift"]',form);
      var message=select('[data-demo-message]',dialog);
      var missing=[];
      if(!table||!table.value)missing.push('o número de pessoas');
      if(!day||!day.value)missing.push('o dia');
      if(!shift||!shift.value)missing.push('o período');
      if(missing.length){
        if(message){
          message.textContent='Para simular a mesa, escolha '+missing.join(', ')+'.';
          message.setAttribute('data-tone','alert');
        }
        var firstBad=(!table||!table.value)?table:(!day||!day.value)?day:shift;
        if(firstBad)firstBad.focus();
        return;
      }
      if(message){
        message.textContent='Mesa para '+table.value+', no dia '+day.value+', no período de '+shift.value+' — pedido de reserva simulado registrado no navegador. Nenhum dado foi enviado.';
        message.setAttribute('data-tone','ok');
      }
      setStatus('Reserva simulada · Nenhum dado enviado');
    });

    form.addEventListener('reset',function(){
      var message=select('[data-demo-message]',dialog);
      if(message){
        message.textContent='';
        message.removeAttribute('data-tone');
      }
      setStatus('Reserva simulada · Nenhum dado enviado');
    });
  }

  /* ---------- destaque de preço ao passar o mouse ---------- */
  function initMenuHint(){
    selectAll('.menu-item').forEach(function(item){
      item.addEventListener('pointerenter',function(){item.classList.add('is-active')});
      item.addEventListener('pointerleave',function(){item.classList.remove('is-active')});
      item.addEventListener('focusin',function(){item.classList.add('is-active')});
      item.addEventListener('focusout',function(){item.classList.remove('is-active')});
    });
  }

  function init(){
    initNav();
    initReservation();
    initMenuHint();
  }

  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);
  else init();
})();
