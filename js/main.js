/* ============================================================
   BlitzAI Solutions — Main JS v4
   ============================================================ */

/* Activate scroll-reveal styling only when JS is present */
document.documentElement.classList.add('js-ready');

/* ── Nav scroll state ── */
const nav = document.getElementById('nav');
const onScroll = () => nav?.classList.toggle('scrolled', window.scrollY > 20);
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

/* ── Mobile menu ── */
const burger = document.getElementById('burger');
const mobileNav = document.getElementById('mobile-nav');
burger?.addEventListener('click', () => {
  const open = burger.classList.toggle('open');
  mobileNav?.classList.toggle('open', open);
  burger.setAttribute('aria-expanded', String(open));
});
mobileNav?.querySelectorAll('a, .btn').forEach(el =>
  el.addEventListener('click', () => {
    burger?.classList.remove('open');
    mobileNav?.classList.remove('open');
    burger?.setAttribute('aria-expanded', 'false');
  })
);

/* ── Scroll reveal ── */
const revealObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('in'); revealObs.unobserve(e.target); }
  });
}, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });
document.querySelectorAll('.r0').forEach(el => revealObs.observe(el));

/* ── Counter animation ── */
function animCount(el, target, duration = 1500) {
  const start = performance.now();
  const isFloat = target % 1 !== 0;
  const tick = now => {
    const t = Math.min((now - start) / duration, 1);
    const ease = 1 - Math.pow(1 - t, 3);
    el.textContent = isFloat ? (ease * target).toFixed(1) : Math.round(ease * target).toLocaleString();
    if (t < 1) requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
}
const counterObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      animCount(e.target, parseFloat(e.target.dataset.counter));
      counterObs.unobserve(e.target);
    }
  });
}, { threshold: 0.6 });
document.querySelectorAll('[data-counter]').forEach(el => counterObs.observe(el));

/* ── FAQ accordion ── */
document.querySelectorAll('.faq__q').forEach(btn => {
  btn.addEventListener('click', () => {
    const item = btn.closest('.faq__item');
    const wasOpen = item.classList.contains('open');
    document.querySelectorAll('.faq__item.open').forEach(i => {
      i.classList.remove('open');
      i.querySelector('.faq__q')?.setAttribute('aria-expanded', 'false');
    });
    if (!wasOpen) {
      item.classList.add('open');
      btn.setAttribute('aria-expanded', 'true');
    }
  });
});
