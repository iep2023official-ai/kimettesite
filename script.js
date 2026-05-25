/* ===========================
   NAV — hide on scroll down
   =========================== */
(function () {
  const nav = document.getElementById('nav');
  let lastY = 0, ticking = false;
  window.addEventListener('scroll', function () {
    if (!ticking) {
      requestAnimationFrame(function () {
        const cur = window.scrollY;
        nav.style.transform = (cur > 120 && cur > lastY) ? 'translateY(-100%)' : 'translateY(0)';
        lastY = cur;
        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });
})();

/* ===========================
   HAMBURGER
   =========================== */
(function () {
  const btn  = document.getElementById('hamburger');
  const menu = document.getElementById('mobile-menu');
  if (!btn || !menu) return;
  btn.addEventListener('click', function () {
    const open = menu.classList.toggle('open');
    btn.classList.toggle('open', open);
    btn.setAttribute('aria-expanded', open);
  });
  menu.querySelectorAll('.mobile-link').forEach(function (l) {
    l.addEventListener('click', function () {
      menu.classList.remove('open');
      btn.classList.remove('open');
      btn.setAttribute('aria-expanded', false);
    });
  });
})();

/* ===========================
   GENERAL SCROLL FADE-IN
   =========================== */
(function () {
  const els = document.querySelectorAll('.fade-in');
  if (!els.length) return;
  const io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); }
    });
  }, { threshold: 0.07, rootMargin: '0px 0px -28px 0px' });
  els.forEach(function (el) { io.observe(el); });
})();

/* ===========================
   HERO MARK — underline reveal
   =========================== */
(function () {
  window.addEventListener('load', function () {
    setTimeout(function () {
      document.body.classList.add('mark-revealed');
    }, 400);
  });
})();

/* ===========================
   CI TAGS — stagger wave-in
   =========================== */
(function () {
  const list = document.querySelector('.ci-list');
  if (!list) return;

  const io = new IntersectionObserver(function (entries) {
    if (!entries[0].isIntersecting) return;
    io.disconnect();

    const tags = list.querySelectorAll('.ci-tag');
    tags.forEach(function (tag, i) {
      tag.style.animationDelay = (i * 90) + 'ms';
      setTimeout(function () {
        tag.classList.add('tag-visible');
      }, i * 90);
    });
  }, { threshold: 0.3 });

  io.observe(list);
})();

/* ===========================
   SPECTRUM BAR — fill reveal
   =========================== */
(function () {
  const gradient = document.querySelector('.spectrum-gradient');
  const marker   = document.querySelector('.spectrum-marker');
  if (!gradient) return;

  const io = new IntersectionObserver(function (entries) {
    if (!entries[0].isIntersecting) return;
    io.disconnect();
    gradient.classList.add('revealed');
    if (marker) marker.classList.add('revealed');
  }, { threshold: 0.6 });

  io.observe(gradient.closest('.spectrum-section') || gradient);
})();

/* ===========================
   CALLOUT BADGES — pop in with stagger
   =========================== */
(function () {
  const wrap = document.querySelector('.callout-badges');
  if (!wrap) return;

  const io = new IntersectionObserver(function (entries) {
    if (!entries[0].isIntersecting) return;
    io.disconnect();
    const badges = wrap.querySelectorAll('span');
    badges.forEach(function (b, i) {
      b.style.animationDelay = (i * 100 + 300) + 'ms';
      setTimeout(function () {
        b.classList.add('badge-visible');
      }, i * 100 + 300);
    });
  }, { threshold: 0.5 });

  io.observe(wrap);
})();

/* ===========================
   PRINCIPLES LIST — slide in with stagger
   =========================== */
(function () {
  const list = document.querySelector('.principles-list');
  if (!list) return;

  const io = new IntersectionObserver(function (entries) {
    if (!entries[0].isIntersecting) return;
    io.disconnect();
    const items = list.querySelectorAll('li');
    items.forEach(function (li, i) {
      li.style.animationDelay = (i * 100) + 'ms';
      setTimeout(function () {
        li.classList.add('principle-visible');
      }, i * 100);
    });
  }, { threshold: 0.2 });

  io.observe(list);
})();

/* ===========================
   TABLE ROWS — sequential fade-in
   =========================== */
(function () {
  document.querySelectorAll('.compare-table tbody, .spec-table tbody').forEach(function (tbody) {
    const io = new IntersectionObserver(function (entries) {
      if (!entries[0].isIntersecting) return;
      io.disconnect();
      const rows = tbody.querySelectorAll('tr');
      rows.forEach(function (row, i) {
        row.style.animationDelay = (i * 65) + 'ms';
        setTimeout(function () {
          row.classList.add('table-row-visible');
        }, i * 65);
      });
    }, { threshold: 0.2 });
    io.observe(tbody);
  });
})();

/* ===========================
   MICROSCOPY CANVAS —
   Microencapsulated Phycoerythrin
   =========================== */
(function () {
  const canvas = document.getElementById('microscopy-canvas');
  if (!canvas) return;

  const wrap = canvas.parentElement;
  let W = wrap.offsetWidth;
  let H = wrap.offsetHeight;
  canvas.width  = W;
  canvas.height = H;
  const ctx = canvas.getContext('2d');

  function makeParticle() {
    const r     = 5 + Math.random() * 20;
    const speed = 0.1 + Math.random() * 0.18;
    const angle = Math.random() * Math.PI * 2;
    return {
      x:  Math.random() * W,
      y:  Math.random() * H,
      r:  r,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      hue:   328 + Math.random() * 34,
      sat:   55  + Math.random() * 28,
      lit:   40  + Math.random() * 22,
      alpha: 0.45 + Math.random() * 0.5,
      wOff:  Math.random() * Math.PI * 2,
      wSpd:  0.006 + Math.random() * 0.008,
    };
  }

  const particles = [];
  for (let i = 0; i < 42; i++) particles.push(makeParticle());

  function drawBg() {
    ctx.clearRect(0, 0, W, H);
    const g = ctx.createRadialGradient(W * .5, H * .5, 0, W * .5, H * .5, W * .55);
    g.addColorStop(0,   'rgba(85,10,32,0.2)');
    g.addColorStop(.5,  'rgba(45,5,16,0.1)');
    g.addColorStop(1,   'rgba(0,0,0,0)');
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, W, H);
  }

  function drawSphere(p) {
    const { x, y, r, hue: h, sat: s, lit: l, alpha: a } = p;

    const grad = ctx.createRadialGradient(
      x - r * .32, y - r * .30, r * .04,
      x, y, r
    );
    grad.addColorStop(0,    `hsla(${h},     ${s+14}%, ${l+26}%, ${a})`);
    grad.addColorStop(.38,  `hsla(${h},     ${s+4}%,  ${l+4}%,  ${a})`);
    grad.addColorStop(.72,  `hsla(${h-6},   ${s}%,    ${l-14}%, ${a})`);
    grad.addColorStop(1,    `hsla(${h-14},  ${s-6}%,  ${l-28}%, ${a*.65})`);

    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fillStyle = grad;
    ctx.fill();

    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.strokeStyle = `hsla(${h+10},50%,78%,${a*.28})`;
    ctx.lineWidth = r > 12 ? 1.2 : 0.8;
    ctx.stroke();

    const hl = ctx.createRadialGradient(
      x - r*.28, y - r*.26, 0,
      x - r*.28, y - r*.26, r*.46
    );
    hl.addColorStop(0, `rgba(255,255,255,${a*.52})`);
    hl.addColorStop(1, 'rgba(255,255,255,0)');
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fillStyle = hl;
    ctx.fill();

    if (r > 13) {
      ctx.save();
      ctx.shadowColor = `hsla(${h},${s}%,65%,${a*.42})`;
      ctx.shadowBlur  = r * 1.1;
      ctx.beginPath();
      ctx.arc(x, y, r * .7, 0, Math.PI * 2);
      ctx.fillStyle = `hsla(${h},${s}%,60%,0.01)`;
      ctx.fill();
      ctx.restore();
    }
  }

  function animate() {
    drawBg();
    particles.forEach(function (p) {
      p.wOff += p.wSpd;
      p.x += p.vx + Math.sin(p.wOff)           * 0.17;
      p.y += p.vy + Math.cos(p.wOff * 1.3 + 1) * 0.17;

      const pad = p.r * 1.5;
      if (p.x < -pad)    p.x = W + pad;
      if (p.x > W + pad) p.x = -pad;
      if (p.y < -pad)    p.y = H + pad;
      if (p.y > H + pad) p.y = -pad;

      drawSphere(p);
    });
    requestAnimationFrame(animate);
  }

  animate();

  window.addEventListener('resize', function () {
    const nW = wrap.offsetWidth;
    const nH = wrap.offsetHeight;
    if (nW === W && nH === H) return;
    W = nW; H = nH;
    canvas.width = W; canvas.height = H;
    particles.forEach(function (p) { p.x = Math.random() * W; p.y = Math.random() * H; });
  });
})();

/* ===========================
   CATEGORY TABS
   =========================== */
(function () {
  const buttons = document.querySelectorAll('.category-btn');
  const contents = document.querySelectorAll('.category-content');
  if (!buttons.length || !contents.length) return;

  buttons.forEach(function (btn) {
    btn.addEventListener('click', function () {
      const category = btn.getAttribute('data-category');

      buttons.forEach(function (b) { b.classList.remove('active'); });
      btn.classList.add('active');

      contents.forEach(function (c) { c.style.display = 'none'; });
      document.querySelector('[data-category="' + category + '"].category-content').style.display = 'block';
    });
  });
})();

/* ===========================
   CONTACT FORM
   =========================== */
(function () {
  const form    = document.getElementById('contact-form');
  const success = document.getElementById('form-success');
  if (!form || !success) return;

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    const company = form.querySelector('#f-company').value.trim();
    const email   = form.querySelector('#f-email').value.trim();
    if (!company || !email) {
      alert('회사명/이름과 이메일은 필수 항목입니다.');
      return;
    }
    form.style.display = 'none';
    success.removeAttribute('hidden');
    success.scrollIntoView({ behavior: 'smooth', block: 'center' });
  });
})();
