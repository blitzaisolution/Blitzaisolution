/* ============================================================
   BlitzAI Solutions · Main JS v4
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

/* ============ CTA popup (marketing pages, once per session) ============ */
(function () {
  if (document.body.dataset.pop !== '1') return;
  var KEY = 'bz-pop-seen';
  try { if (sessionStorage.getItem(KEY)) return; } catch (e) { return; }
  /* Wait for cookie banner to be dismissed before firing the CTA modal */
  try { if (!localStorage.getItem('bz-cookie-consent')) return; } catch (e) { return; }

  var shown = false;
  function show() {
    if (shown) return;
    shown = true;
    try { sessionStorage.setItem(KEY, '1'); } catch (e) {}

    var wrap = document.createElement('div');
    wrap.className = 'pop';
    wrap.setAttribute('role', 'dialog');
    wrap.setAttribute('aria-modal', 'true');
    wrap.setAttribute('aria-label', 'Book a free strategy call');
    wrap.innerHTML =
      '<div class="pop__back"></div>' +
      '<div class="pop__card">' +
        '<svg class="pop__slash" viewBox="0 0 200 240" fill="none" aria-hidden="true">' +
          '<path d="M58 214 L112 26 L146 26 L92 214 Z" stroke="rgba(47,94,240,0.13)" stroke-width="2"/>' +
          '<path d="M110 214 L164 26 L198 26 L144 214 Z" stroke="rgba(47,94,240,0.07)" stroke-width="2"/>' +
        '</svg>' +
        '<button class="pop__x" aria-label="Close">' +
          '<svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M2 2l10 10M12 2L2 12" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>' +
        '</button>' +
        '<img class="pop__badge" src="assets/badge.svg" alt="" width="42" height="42">' +
        '<span class="pop__eyebrow">Free 20-Minute Strategy Call</span>' +
        '<div class="pop__title">Want more customers<br>without more <span style="color:var(--blue)">busywork?</span></div>' +
        '<p class="pop__text">Tell us how you sell today and we\'ll show you exactly what a growth system would do for your numbers. No pitch, no pressure, and you keep the plan either way.</p>' +
        '<div class="pop__btns">' +
          '<a href="get-started.html" class="btn btn--primary">Get Started</a>' +
          '<button class="pop__later">Maybe later</button>' +
        '</div>' +
      '</div>';
    document.body.appendChild(wrap);
    setTimeout(function () { wrap.classList.add("pop--in"); }, 30);

    function close() {
      wrap.classList.remove('pop--in');
      document.removeEventListener('keydown', onEsc);
      setTimeout(function () { wrap.remove(); }, 420);
    }
    function onEsc(e) { if (e.key === 'Escape') close(); }
    wrap.querySelector('.pop__back').addEventListener('click', close);
    wrap.querySelector('.pop__x').addEventListener('click', close);
    wrap.querySelector('.pop__later').addEventListener('click', close);
    document.addEventListener('keydown', onEsc);
  }

  setTimeout(show, 14000);
  window.addEventListener('scroll', function onScroll() {
    var max = document.documentElement.scrollHeight - window.innerHeight;
    if (max > 0 && window.scrollY / max > 0.45) {
      window.removeEventListener('scroll', onScroll);
      show();
    }
  }, { passive: true });
})();

/* ============ Cookie consent banner (global, persistent choice) ============ */
(function () {
  var KEY = 'bz-cookie-consent';
  try { if (localStorage.getItem(KEY)) return; } catch (e) { return; }

  function build() {
    if (!document.body) return setTimeout(build, 40);
    /* Don't show on legal pages themselves (would be circular / awkward) */
    var path = location.pathname.split('/').pop();
    if (path === 'privacy-policy.html' || path === 'terms-of-service.html') return;

    var wrap = document.createElement('div');
    wrap.className = 'cc';
    wrap.setAttribute('role', 'region');
    wrap.setAttribute('aria-label', 'Cookie consent');
    wrap.innerHTML =
      '<div class="cc__card">' +
        '<div class="cc__head">' +
          '<span class="cc__eyebrow">Cookies</span>' +
        '</div>' +
        '<div class="cc__title">A quick word before you scroll.</div>' +
        '<p class="cc__text">We use cookies to keep the site running smoothly and to understand how visitors use it. You can accept all, or just the ones we need to make things work. See our <a href="privacy-policy.html">Privacy Policy</a>.</p>' +
        '<div class="cc__actions">' +
          '<button class="cc__btn cc__accept" type="button">Accept all</button>' +
          '<button class="cc__btn cc__reject" type="button">Essentials only</button>' +
        '</div>' +
      '</div>';
    document.body.appendChild(wrap);

    function set(choice) {
      try { localStorage.setItem(KEY, choice); } catch (e) {}
      wrap.classList.add('cc--out');
      setTimeout(function () { wrap.remove(); }, 380);
    }
    wrap.querySelector('.cc__accept').addEventListener('click', function () { set('accepted'); });
    wrap.querySelector('.cc__reject').addEventListener('click', function () { set('rejected'); });
  }
  build();
})();
