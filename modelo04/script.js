/* Comportamento compartilhado dos modelos 03 a 06 (cada modelo tem uma cópia deste arquivo). */

/* ---------- Menu no celular ---------- */
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

/* ---------- Cabeçalho, botão flutuante e entrada das seções ---------- */
const header = document.querySelector('.header');
const floatCta = document.querySelector('.float-cta');
const closing = document.querySelector('#contato');
let closingVisible = false;
function onScroll() {
  header.classList.toggle('is-scrolled', window.scrollY > 8);
  if (floatCta) floatCta.classList.toggle('is-visible', window.scrollY > 560 && !closingVisible);
}
window.addEventListener('scroll', onScroll, {passive: true});
if ('IntersectionObserver' in window) {
  if (closing) new IntersectionObserver(entries => {
    closingVisible = entries[0].isIntersecting;
    onScroll();
  }, {threshold: 0.35}).observe(closing);
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-in');
        observer.unobserve(entry.target);
      }
    });
  }, {rootMargin: '0px 0px -8% 0px', threshold: 0.08});
  document.querySelectorAll('.reveal').forEach(element => revealObserver.observe(element));
} else {
  document.querySelectorAll('.reveal').forEach(element => element.classList.add('is-in'));
}
onScroll();

/* ---------- Carrossel de antes e depois ---------- */
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
    ? 'Histórias ' + (activeSlide + 1) + '–' + Math.min(slides.length, activeSlide + visible) + ' de ' + slides.length
    : 'História ' + (activeSlide + 1) + ' de ' + slides.length;
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
}, {passive: true});
new ResizeObserver(updateCarousel).observe(track);
updateCarousel();
