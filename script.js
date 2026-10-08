const message = 'Olá! Encontrei o Team Oliver e tenho interesse na consultoria online. Pode me explicar como funciona?';
document.querySelectorAll('.whatsapp').forEach(link => {
  link.href = 'https://wa.me/5571999749078?text=' + encodeURIComponent(message);
});
const toggle = document.querySelector('.menu-toggle');
const menu = document.querySelector('#menu');
function closeMenu() {
  toggle.setAttribute('aria-expanded', 'false');
  menu.classList.remove('is-open');
}
toggle.addEventListener('click', () => {
  const open = toggle.getAttribute('aria-expanded') !== 'true';
  toggle.setAttribute('aria-expanded', String(open));
  menu.classList.toggle('is-open', open);
});
menu.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') {
    closeMenu();
    toggle.focus();
  }
});
window.matchMedia('(min-width: 768px)').addEventListener('change', closeMenu);

const track = document.querySelector('.results-track');
const slides = [...track.querySelectorAll('.result-slide')];
const previous = document.querySelector('.result-prev');
const next = document.querySelector('.result-next');
const dots = [...document.querySelectorAll('[data-slide]')];
const status = document.querySelector('.results-status');
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
let activeSlide = 0;
function slideLeft(index) {
  return slides[index].offsetLeft - slides[0].offsetLeft;
}
function updateCarousel() {
  activeSlide = slides.reduce((best, slide, index) =>
    Math.abs(slideLeft(index) - track.scrollLeft) < Math.abs(slideLeft(best) - track.scrollLeft) ? index : best, 0);
  const end = track.scrollLeft >= track.scrollWidth - track.clientWidth - 2;
  previous.disabled = track.scrollLeft <= 2;
  next.disabled = end;
  dots.forEach((dot, index) => {
    if (index === activeSlide) dot.setAttribute('aria-current', 'true');
    else dot.removeAttribute('aria-current');
  });
  const visible = Math.max(1, Math.round((track.clientWidth + 24) / (slides[0].clientWidth + 24)));
  status.textContent = visible > 1
    ? 'Evoluções ' + (activeSlide + 1) + '–' + Math.min(slides.length, activeSlide + visible) + ' de ' + slides.length
    : 'Evolução ' + (activeSlide + 1) + ' de ' + slides.length;
}
function goToSlide(index) {
  track.scrollTo({left: slideLeft(Math.max(0, Math.min(slides.length - 1, index))), behavior: reducedMotion.matches ? 'instant' : 'smooth'});
}
previous.addEventListener('click', () => goToSlide(activeSlide - 1));
next.addEventListener('click', () => goToSlide(activeSlide + 1));
dots.forEach(dot => dot.addEventListener('click', () => goToSlide(Number(dot.dataset.slide))));
track.addEventListener('keydown', event => {
  if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') {
    event.preventDefault();
    goToSlide(activeSlide + (event.key === 'ArrowRight' ? 1 : -1));
  }
});
let carouselFrame;
track.addEventListener('scroll', () => {
  cancelAnimationFrame(carouselFrame);
  carouselFrame = requestAnimationFrame(updateCarousel);
}, {passive:true});
new ResizeObserver(updateCarousel).observe(track);
updateCarousel();