/* ─────────────────────────────────────────────────────────────
   script.js  –  Abinanthan T Portfolio
   All features respect prefers-reduced-motion.
───────────────────────────────────────────────────────────── */

(function () {
  'use strict';

  /* ── Reduced-motion flag ──────────────────────────────────── */
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ── Nav scroll background ───────────────────────────────── */
  const siteNav = document.querySelector('.site-nav');
  if (siteNav) {
    const onScroll = () => {
      siteNav.classList.toggle('scrolled', window.scrollY > 40);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll(); // run once on load
  }

  /* ═══════════════════════════════════════════════════════════
     1. MOBILE NAV TOGGLE
  ═══════════════════════════════════════════════════════════ */
  const navToggle = document.querySelector('.nav-toggle');
  const navLinks  = document.querySelector('.nav-links');

  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
      const expanded = navToggle.getAttribute('aria-expanded') === 'true';
      navToggle.setAttribute('aria-expanded', String(!expanded));
      navLinks.classList.toggle('open', !expanded);
    });

    /* Close menu when a link is clicked */
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navToggle.setAttribute('aria-expanded', 'false');
        navLinks.classList.remove('open');
      });
    });

    /* Close on Escape */
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape' && navLinks.classList.contains('open')) {
        navToggle.setAttribute('aria-expanded', 'false');
        navLinks.classList.remove('open');
        navToggle.focus();
      }
    });
  }

  /* ═══════════════════════════════════════════════════════════
     2. DOT-GRID SPOTLIGHT
  ═══════════════════════════════════════════════════════════ */
  (function initDotGrid() {
    if (reducedMotion) return;

    const canvas = document.getElementById('dot-grid');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const DOT_SPACING = 28;
    const DOT_RADIUS  = 1.5;
    const SPOT_RADIUS = 180;
    const DOT_COLOR   = '0,0,0';

    let mouse = { x: -999, y: -999 };
    let W, H, cols, rows;

    function resize() {
      W = canvas.width  = window.innerWidth;
      H = canvas.height = window.innerHeight;
      cols = Math.ceil(W / DOT_SPACING) + 1;
      rows = Math.ceil(H / DOT_SPACING) + 1;
    }

    function draw() {
      ctx.clearRect(0, 0, W, H);
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const x = c * DOT_SPACING;
          const y = r * DOT_SPACING;
          const dist = Math.hypot(x - mouse.x, y - mouse.y);
          if (dist > SPOT_RADIUS) continue;
          const alpha = (1 - dist / SPOT_RADIUS) * 0.18;
          ctx.beginPath();
          ctx.arc(x, y, DOT_RADIUS, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${DOT_COLOR},${alpha})`;
          ctx.fill();
        }
      }
    }

    let raf;
    function loop() {
      draw();
      raf = requestAnimationFrame(loop);
    }

    resize();
    loop();

    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', e => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    });
    window.addEventListener('mouseleave', () => {
      mouse.x = -999;
      mouse.y = -999;
    });
  })();

  /* ═══════════════════════════════════════════════════════════
     3. SQL TYPEWRITER + RESULT TABLE
  ═══════════════════════════════════════════════════════════ */
  (function initTypewriter() {
    const codeEl  = document.getElementById('sql-code');
    const caret   = document.querySelector('.caret');
    const result  = document.getElementById('terminal-result');
    if (!codeEl || !result) return;

    const SQL = `SELECT name, role, location\nFROM analyst\nWHERE loves = 'finding patterns';`;

    if (reducedMotion) {
      codeEl.textContent = SQL;
      result.hidden = false;
      return;
    }

    let i = 0;
    const SPEED = 38; // ms per character

    function type() {
      if (i <= SQL.length) {
        codeEl.textContent = SQL.slice(0, i);
        i++;
        setTimeout(type, SPEED);
      } else {
        /* Hide caret, show result table */
        if (caret) caret.style.display = 'none';
        setTimeout(() => {
          result.hidden = false;
          result.style.opacity = '0';
          result.style.transition = 'opacity 0.4s ease';
          requestAnimationFrame(() => {
            result.style.opacity = '1';
          });
        }, 300);
      }
    }

    /* Start typing after hero animations settle */
    setTimeout(type, 1100);
  })();

  /* ═══════════════════════════════════════════════════════════
     4. INTERSECTION OBSERVER — scroll reveals + heading lines
  ═══════════════════════════════════════════════════════════ */
  (function initReveal() {
    /* ── Section heading lines (draw left to right) ── */
    const headings = document.querySelectorAll('.section-heading');
    if (reducedMotion) {
      headings.forEach(h => h.classList.add('line-visible'));
    } else {
      const headingObs = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('line-visible');
            headingObs.unobserve(entry.target);
          }
        });
      }, { threshold: 0.4 });
      headings.forEach(h => headingObs.observe(h));
    }

    /* ── Reveal elements (fade-up) ── */
    if (reducedMotion) {
      document.querySelectorAll('.reveal').forEach(el => {
        el.classList.add('visible');
      });
      return;
    }

    const revealObs = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          revealObs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    document.querySelectorAll('.reveal').forEach(el => revealObs.observe(el));
  })();

  /* ═══════════════════════════════════════════════════════════
     5. STAT COUNTER ANIMATION
  ═══════════════════════════════════════════════════════════ */
  (function initCounters() {
    const counters = document.querySelectorAll('.stat-number');
    if (!counters.length) return;

    function animateCounter(el) {
      const target = parseInt(el.dataset.target, 10);
      const suffix = el.dataset.suffix || '';
      const duration = 1200; // ms
      const startTime = performance.now();

      /* Ease-out quad */
      function easeOut(t) { return 1 - (1 - t) * (1 - t); }

      function step(now) {
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const current = Math.round(easeOut(progress) * target);
        el.textContent = current + suffix;
        if (progress < 1) requestAnimationFrame(step);
        else el.textContent = target + suffix;
      }

      requestAnimationFrame(step);
    }

    if (reducedMotion) {
      counters.forEach(el => {
        el.textContent = el.dataset.target + (el.dataset.suffix || '');
      });
      return;
    }

    const obs = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });

    counters.forEach(el => obs.observe(el));
  })();

  /* ═══════════════════════════════════════════════════════════
     6. PROJECT DETAILS — details/summary open/close
        (CSS handles the + rotation; this adds smooth height)
  ═══════════════════════════════════════════════════════════ */
  (function initProjectCards() {
    const cards = document.querySelectorAll('.project-card');
    cards.forEach(card => {
      const summary = card.querySelector('.project-summary');
      const body    = card.querySelector('.project-body');
      if (!summary || !body) return;

      /* Animate open / close smoothly */
      card.addEventListener('toggle', () => {
        if (card.open) {
          /* Expand */
          body.style.maxHeight = '0';
          body.style.overflow  = 'hidden';
          body.style.transition = 'max-height 0.45s cubic-bezier(0.16,1,0.3,1)';
          requestAnimationFrame(() => {
            body.style.maxHeight = body.scrollHeight + 'px';
          });
          body.addEventListener('transitionend', () => {
            body.style.maxHeight = '';
            body.style.overflow  = '';
          }, { once: true });
        }
      });
    });
  })();

  /* ═══════════════════════════════════════════════════════════
     7. LIGHTBOX
  ═══════════════════════════════════════════════════════════ */
  (function initLightbox() {
    const lightbox   = document.getElementById('lightbox');
    const lbImg      = document.getElementById('lightbox-img');
    const lbClose    = document.getElementById('lightbox-close');
    const triggers   = document.querySelectorAll('.screenshot-btn');

    if (!lightbox || !lbImg || !lbClose) return;

    let lastFocused = null;

    function openLightbox(src, alt) {
      lastFocused = document.activeElement;
      lbImg.src = src;
      lbImg.alt = alt || '';
      lightbox.hidden = false;
      lbClose.focus();
      document.body.style.overflow = 'hidden';
    }

    function closeLightbox() {
      lightbox.hidden = true;
      lbImg.src = '';
      document.body.style.overflow = '';
      if (lastFocused) lastFocused.focus();
    }

    triggers.forEach(btn => {
      btn.addEventListener('click', () => {
        const img = btn.querySelector('img');
        openLightbox(btn.dataset.src, img ? img.alt : '');
      });
    });

    lbClose.addEventListener('click', closeLightbox);

    /* Click outside image to close */
    lightbox.addEventListener('click', e => {
      if (e.target === lightbox) closeLightbox();
    });

    /* Escape key */
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape' && !lightbox.hidden) {
        closeLightbox();
      }
    });

    /* Trap focus inside lightbox */
    lightbox.addEventListener('keydown', e => {
      if (e.key !== 'Tab') return;
      const focusable = lightbox.querySelectorAll('button, [href], [tabindex]:not([tabindex="-1"])');
      const first = focusable[0];
      const last  = focusable[focusable.length - 1];
      if (e.shiftKey) {
        if (document.activeElement === first) { e.preventDefault(); last.focus(); }
      } else {
        if (document.activeElement === last)  { e.preventDefault(); first.focus(); }
      }
    });
  })();

  /* ═══════════════════════════════════════════════════════════
     8. SMOOTH SCROLL for anchor buttons
  ═══════════════════════════════════════════════════════════ */
  (function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', e => {
        const id = anchor.getAttribute('href').slice(1);
        if (!id) return;
        const target = document.getElementById(id);
        if (!target) return;
        e.preventDefault();
        target.scrollIntoView({ behavior: reducedMotion ? 'auto' : 'smooth' });
        /* Move focus to section for keyboard users */
        target.setAttribute('tabindex', '-1');
        target.focus({ preventScroll: true });
        target.addEventListener('blur', () => target.removeAttribute('tabindex'), { once: true });
      });
    });
  })();

  /* ═══════════════════════════════════════════════════════════
     9. ACTIVE NAV HIGHLIGHT on scroll
  ═══════════════════════════════════════════════════════════ */
  (function initActiveNav() {
    const sections = document.querySelectorAll('section[id]');
    const links    = document.querySelectorAll('.nav-links a[href^="#"]');
    if (!sections.length || !links.length) return;

    const obs = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          links.forEach(l => l.removeAttribute('aria-current'));
          const active = document.querySelector(`.nav-links a[href="#${entry.target.id}"]`);
          if (active) active.setAttribute('aria-current', 'page');
        }
      });
    }, { rootMargin: '-40% 0px -55% 0px' });

    sections.forEach(s => obs.observe(s));
  })();

})();
