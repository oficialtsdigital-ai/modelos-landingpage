/* Motor de efeitos da TS Digital — sem dependências externas.
   Uso: incluir após efeitos.css. Elementos controlados por data-atributos:
   data-reveal, data-reveal-stagger, data-parallax, data-tilt, data-magnetic,
   data-marquee, data-counter, data-split-words, data-scroll-progress,
   data-header-state, data-marquee-speed.
   Sem JavaScript tudo permanece visível. Com prefers-reduced-motion os
   efeitos são desligados e o conteúdo é exibido imediatamente. */
(function(){
  'use strict';

  var root=document.documentElement;
  var motionQuery=window.matchMedia('(prefers-reduced-motion: reduce)');
  var finePointer=window.matchMedia('(pointer: fine)');
  var reduced=function(){return motionQuery.matches};

  function each(selector,fn){Array.prototype.forEach.call(document.querySelectorAll(selector),fn)}

  function revealSetup(){
    var items=document.querySelectorAll('[data-reveal]');
    if(!items.length)return null;
    if(!('IntersectionObserver' in window)){
      Array.prototype.forEach.call(items,function(el){el.classList.add('is-visible')});
      return null;
    }
    var io=new IntersectionObserver(function(entries){
      entries.forEach(function(entry){
        if(!entry.isIntersecting)return;
        entry.target.classList.add('is-visible');
        io.unobserve(entry.target);
      });
    },{rootMargin:'0px 0px -8% 0px',threshold:0.08});
    Array.prototype.forEach.call(items,function(el){io.observe(el)});
    return io;
  }

  function staggerSetup(){
    each('[data-reveal-stagger]',function(group){
      var step=parseFloat(group.getAttribute('data-stagger-step'))||70;
      var children=group.children;
      for(var i=0;i<children.length;i++){
        children[i].setAttribute('data-reveal',group.getAttribute('data-reveal-stagger')||'up');
        children[i].style.setProperty('--fx-delay',(i*step)+'ms');
      }
    });
  }

  function counterSetup(){
    var nodes=document.querySelectorAll('[data-counter]');
    if(!nodes.length)return;
    var run=function(node){
      var target=parseFloat(node.getAttribute('data-counter'))||0;
      if(reduced()){node.textContent=String(target);return}
      var start=null,duration=1100;
      var step=function(now){
        if(start===null)start=now;
        var p=Math.min((now-start)/duration,1);
        var eased=1-Math.pow(1-p,3);
        node.textContent=String(Math.round(target*eased));
        if(p<1)requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    };
    if(!('IntersectionObserver' in window)){Array.prototype.forEach.call(nodes,run);return}
    var io=new IntersectionObserver(function(entries){
      entries.forEach(function(entry){
        if(!entry.isIntersecting)return;
        run(entry.target);io.unobserve(entry.target);
      });
    },{threshold:0.4});
    Array.prototype.forEach.call(nodes,function(node){io.observe(node)});
  }

  function splitWords(){
    var targets=[];
    each('[data-split-words]',function(el){
      if(el.getAttribute('data-split-done')==='1')return;
      var text=(el.textContent||'').trim();
      if(!text)return;
      var fragment=document.createDocumentFragment();
      text.split(/\s+/).forEach(function(word,index,all){
        var wrap=document.createElement('span');
        wrap.className='fx-word';
        wrap.textContent=word;
        wrap.style.setProperty('--fx-i',index);
        fragment.appendChild(wrap);
        if(index<all.length-1)fragment.appendChild(document.createTextNode(' '));
      });
      el.textContent='';
      el.appendChild(fragment);
      el.setAttribute('data-split-done','1');
      targets.push(el);
    });
    if(!targets.length)return;
    if(!('IntersectionObserver' in window)){
      targets.forEach(function(el){el.classList.add('is-visible')});
      return;
    }
    var io=new IntersectionObserver(function(entries){
      entries.forEach(function(entry){
        if(!entry.isIntersecting)return;
        entry.target.classList.add('is-visible');
        io.unobserve(entry.target);
      });
    },{rootMargin:'0px 0px -6% 0px',threshold:0.15});
    targets.forEach(function(el){io.observe(el)});
  }

  function marqueeSetup(){
    each('[data-marquee]',function(box){
      if(box.getAttribute('data-marquee-ready')==='1')return;
      var track=box.querySelector('.marquee-track');
      if(!track)return;
      var original=track.innerHTML;
      var times=parseInt(box.getAttribute('data-marquee-repeat'),10)||2;
      for(var i=1;i<times;i++)track.innerHTML+=original;
      box.setAttribute('data-marquee-ready','1');
    });
  }

  function parallaxSetup(){
    var nodes=Array.prototype.slice.call(document.querySelectorAll('[data-parallax]'));
    if(!nodes.length)return;
    var ticking=false;
    var update=function(){
      ticking=false;
      if(reduced())return;
      var vh=window.innerHeight;
      for(var i=0;i<nodes.length;i++){
        var el=nodes[i];
        var rect=el.getBoundingClientRect();
        if(rect.bottom<-200||rect.top>vh+200)continue;
        var speed=parseFloat(el.getAttribute('data-parallax'))||0.14;
        var progress=(rect.top+rect.height/2-vh/2)/vh;
        el.style.setProperty('--fx-parallax',(-progress*speed*100).toFixed(2)+'px');
      }
    };
    var onScroll=function(){
      if(ticking)return;
      ticking=true;requestAnimationFrame(update);
    };
    window.addEventListener('scroll',onScroll,{passive:true});
    window.addEventListener('resize',onScroll,{passive:true});
    update();
  }

  function tiltSetup(){
    if(!finePointer.matches)return;
    each('[data-tilt]',function(card){
      var max=parseFloat(card.getAttribute('data-tilt'))||7;
      card.addEventListener('pointermove',function(event){
        if(reduced())return;
        var rect=card.getBoundingClientRect();
        var x=(event.clientX-rect.left)/rect.width-0.5;
        var y=(event.clientY-rect.top)/rect.height-0.5;
        card.style.setProperty('--fx-tilt-x',(-y*max).toFixed(2)+'deg');
        card.style.setProperty('--fx-tilt-y',(x*max).toFixed(2)+'deg');
        card.style.setProperty('--fx-glow-x',((x+0.5)*100).toFixed(1)+'%');
        card.style.setProperty('--fx-glow-y',((y+0.5)*100).toFixed(1)+'%');
        card.classList.add('is-tilting');
      });
      card.addEventListener('pointerleave',function(){
        card.classList.remove('is-tilting');
        card.style.setProperty('--fx-tilt-x','0deg');
        card.style.setProperty('--fx-tilt-y','0deg');
      });
    });
  }

  function magneticSetup(){
    if(!finePointer.matches)return;
    each('[data-magnetic]',function(el){
      var strength=parseFloat(el.getAttribute('data-magnetic'))||18;
      el.addEventListener('pointermove',function(event){
        if(reduced())return;
        var rect=el.getBoundingClientRect();
        var x=event.clientX-rect.left-rect.width/2;
        var y=event.clientY-rect.top-rect.height/2;
        el.style.setProperty('--fx-magnet-x',(x/rect.width*strength).toFixed(2)+'px');
        el.style.setProperty('--fx-magnet-y',(y/rect.height*strength).toFixed(2)+'px');
        el.classList.add('is-magnetized');
      });
      el.addEventListener('pointerleave',function(){
        el.classList.remove('is-magnetized');
        el.style.setProperty('--fx-magnet-x','0px');
        el.style.setProperty('--fx-magnet-y','0px');
      });
    });
  }

  function progressBarSetup(){
    var bars=Array.prototype.slice.call(document.querySelectorAll('[data-scroll-progress]'));
    if(!bars.length)return;
    var ticking=false;
    var update=function(){
      ticking=false;
      var doc=document.documentElement;
      var max=doc.scrollHeight-window.innerHeight;
      var p=max>0?Math.min(Math.max(window.scrollY/max,0),1):0;
      for(var i=0;i<bars.length;i++)bars[i].style.setProperty('--fx-progress',p.toFixed(4));
    };
    window.addEventListener('scroll',function(){
      if(ticking)return;
      ticking=true;requestAnimationFrame(update);
    },{passive:true});
    window.addEventListener('resize',update,{passive:true});
    update();
  }

  function headerSetup(){
    var headers=Array.prototype.slice.call(document.querySelectorAll('[data-header-state]'));
    if(!headers.length)return;
    var threshold=parseInt(headers[0].getAttribute('data-header-state'),10)||48;
    var ticking=false;
    var update=function(){
      ticking=false;
      var scrolled=window.scrollY>threshold;
      for(var i=0;i<headers.length;i++)headers[i].classList.toggle('is-scrolled',scrolled);
    };
    window.addEventListener('scroll',function(){
      if(ticking)return;
      ticking=true;requestAnimationFrame(update);
    },{passive:true});
    update();
  }

  function init(){
    staggerSetup();
    splitWords();
    marqueeSetup();
    revealSetup();
    counterSetup();
    parallaxSetup();
    tiltSetup();
    magneticSetup();
    progressBarSetup();
    headerSetup();
    root.classList.add('fx-ready');
    document.dispatchEvent(new CustomEvent('fx:ready'));
  }

  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);
  else init();
})();
