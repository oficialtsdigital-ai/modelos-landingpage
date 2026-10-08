(() => {
 const preference=window.matchMedia('(prefers-reduced-motion: reduce)');
 if(preference.matches || !('IntersectionObserver' in window) || !Element.prototype.animate)return;
 const animations=new Set();
 function entrance(element,delay=0){
  const animation=element.animate(
   [{opacity:0,transform:'translateY(18px)'},{opacity:1,transform:'translateY(0)'}],
   {duration:650,delay,easing:'cubic-bezier(.2,.65,.3,1)',fill:'backwards'}
  );
  animations.add(animation);animation.finished.then(()=>animations.delete(animation)).catch(()=>{});
 }
 document.querySelectorAll('.hero-copy,.hero-art').forEach((element,index)=>entrance(element,index*100));
 const observer=new IntersectionObserver(entries=>{
  entries.forEach(entry=>{
   if(entry.isIntersecting){
    observer.unobserve(entry.target);
    if(!preference.matches)entrance(entry.target);
   }
  });
 },{threshold:.08});
 document.querySelectorAll('.section-heading,.consultancy-intro,.benefits article,.coach-brand,.coach-copy,.results>.container,.project-grid,.faq>div,.closing>.container').forEach(element=>observer.observe(element));
 preference.addEventListener('change',event=>{
  if(event.matches){observer.disconnect();animations.forEach(animation=>animation.cancel());animations.clear();}
 });
})();