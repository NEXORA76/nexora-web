/* ===== HAMBURGER MENU ===== */
(function () {
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');
  if (!hamburger || !mobileMenu) return;

  function toggleMenu() {
    const isOpen = hamburger.classList.toggle('open');
    mobileMenu.classList.toggle('open', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
  }

  hamburger.addEventListener('click', toggleMenu);

  // Cerrar al hacer click en un link
  mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('open');
      mobileMenu.classList.remove('open');
      document.body.style.overflow = '';
    });
  });
})();

/* ===== THEME TOGGLE ===== */
(function () {
  const btn = document.getElementById('themeToggle');
  const saved = localStorage.getItem('nexora-theme');
  if (saved === 'light') document.body.classList.add('light-mode');
  if (btn) {
    btn.addEventListener('click', () => {
      document.body.classList.toggle('light-mode');
      const isLight = document.body.classList.contains('light-mode');
      localStorage.setItem('nexora-theme', isLight ? 'light' : 'dark');
    });
  }
})();

/* ===== FASE 1 — SCROLL PROGRESS BAR ===== */
const scrollBar = document.getElementById('scroll-progress');
window.addEventListener('scroll', () => {
  const total = document.documentElement.scrollHeight - window.innerHeight;
  const pct = (window.scrollY / total) * 100;
  if (scrollBar) scrollBar.style.width = pct + '%';
});

/* ===== FASE 1 — TYPEWRITER ===== */
const typewriterEl = document.getElementById('typewriter');
const typewriterWords = [
  'automatización inteligente.',
  'dashboards en tiempo real.',
  'agentes IA que trabajan solos.',
  'más resultados, menos esfuerzo.',
  'n8n + Power BI + Claude.',
];
let twWord = 0, twChar = 0, twDeleting = false;
function typewriterTick() {
  if (!typewriterEl) return;
  const word = typewriterWords[twWord];
  if (!twDeleting) {
    typewriterEl.textContent = word.slice(0, ++twChar);
    if (twChar === word.length) { twDeleting = true; setTimeout(typewriterTick, 1800); return; }
  } else {
    typewriterEl.textContent = word.slice(0, --twChar);
    if (twChar === 0) { twDeleting = false; twWord = (twWord + 1) % typewriterWords.length; }
  }
  setTimeout(typewriterTick, twDeleting ? 40 : 80);
}
typewriterTick();

/* ===== FASE 1 — GLITCH ===== */
const glitchEl = document.querySelector('.glitch-title');
function triggerGlitch() {
  if (!glitchEl) return;
  glitchEl.classList.add('glitching');
  setTimeout(() => glitchEl.classList.remove('glitching'), 400);
}
triggerGlitch();
setInterval(triggerGlitch, 5000);

/* ===== FASE 1 — MAGNETIC BUTTONS ===== */
document.querySelectorAll('.btn-primary, .btn-outline').forEach(btn => {
  btn.addEventListener('mousemove', (e) => {
    const rect = btn.getBoundingClientRect();
    const dx = (e.clientX - rect.left - rect.width / 2) * 0.3;
    const dy = (e.clientY - rect.top - rect.height / 2) * 0.3;
    btn.style.transform = `translate(${dx}px, ${dy}px)`;
  });
  btn.addEventListener('mouseleave', () => {
    btn.style.transform = 'translate(0,0)';
  });
});

/* ===== FASE 1 — HOVER 3D en servicios ===== */
document.querySelectorAll('.service-item').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    card.style.transform = `perspective(600px) rotateY(${x * 10}deg) rotateX(${-y * 10}deg)`;
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = 'none';
  });
});

/* ===== ACCORDION DE SERVICIOS ===== */
document.querySelectorAll('.service-header').forEach(header => {
  header.addEventListener('click', () => {
    const item = header.parentElement;
    const isActive = item.classList.contains('active');
    document.querySelectorAll('.service-item').forEach(i => i.classList.remove('active'));
    if (!isActive) item.classList.add('active');
  });
});

/* ===== FASE 2 — CURSOR PARTICLES ===== */
const pCanvas = document.getElementById('particles-canvas');
const pCtx = pCanvas.getContext('2d');
pCanvas.width = window.innerWidth;
pCanvas.height = window.innerHeight;
window.addEventListener('resize', () => {
  pCanvas.width = window.innerWidth;
  pCanvas.height = window.innerHeight;
});
const particles = [];
const COLORS = ['#ff2d78', '#00e5ff', '#7b2fff'];
document.addEventListener('mousemove', (e) => {
  for (let i = 0; i < 3; i++) {
    particles.push({
      x: e.clientX + (Math.random() - 0.5) * 12,
      y: e.clientY + (Math.random() - 0.5) * 12,
      r: Math.random() * 3 + 1,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      alpha: 1,
      vx: (Math.random() - 0.5) * 1.5,
      vy: (Math.random() - 0.5) * 1.5 - 0.5,
    });
  }
});
function animateParticles() {
  pCtx.clearRect(0, 0, pCanvas.width, pCanvas.height);
  for (let i = particles.length - 1; i >= 0; i--) {
    const p = particles[i];
    p.x += p.vx; p.y += p.vy;
    p.alpha -= 0.04; p.r *= 0.97;
    if (p.alpha <= 0) { particles.splice(i, 1); continue; }
    pCtx.save();
    pCtx.globalAlpha = p.alpha;
    pCtx.fillStyle = p.color;
    pCtx.shadowColor = p.color;
    pCtx.shadowBlur = 6;
    pCtx.beginPath();
    pCtx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    pCtx.fill();
    pCtx.restore();
  }
  requestAnimationFrame(animateParticles);
}
animateParticles();

/* ===== CEREBRO HERO — imagen estática antes del scroll ===== */
const heroBrain = new Image();
heroBrain.onload = () => {
  const c = document.getElementById('canvas');
  const cx = c.getContext('2d');
  const cw = window.innerWidth;
  const ch = window.innerHeight;
  const scale = Math.max(cw / heroBrain.naturalWidth, ch / heroBrain.naturalHeight);
  const w = heroBrain.naturalWidth * scale;
  const h = heroBrain.naturalHeight * scale;
  cx.clearRect(0, 0, cw, ch);
  cx.drawImage(heroBrain, (cw - w) / 2, (ch - h) / 2, w, h);
};
heroBrain.src = 'BRAIN PUNTOS LUZ.png';

/* ===== CONFIG VIDEO ===== */
const TOTAL_FRAMES = 145;
const FRAME_PATH = (i) => `frames/frame_${String(i).padStart(4, '0')}.jpg`;
const FRAME_SPEED = 1.5;

/* ===== STATE ===== */
const frames = new Array(TOTAL_FRAMES).fill(null);
let framesLoaded = 0;
let currentFrame = 0;

/* ===== CANVAS VIDEO ===== */
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

function resizeCanvas() {
  const dpr = window.devicePixelRatio || 1;
  canvas.width = window.innerWidth * dpr;
  canvas.height = window.innerHeight * dpr;
  canvas.style.width = window.innerWidth + 'px';
  canvas.style.height = window.innerHeight + 'px';
  ctx.scale(dpr, dpr);
  if (frames[currentFrame]) drawFrame(currentFrame);
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

function drawFrame(index) {
  const img = frames[index];
  if (!img) return;
  const cw = window.innerWidth;
  const ch = window.innerHeight;
  const scale = Math.max(cw / img.naturalWidth, ch / img.naturalHeight);
  const w = img.naturalWidth * scale;
  const h = img.naturalHeight * scale;
  ctx.clearRect(0, 0, cw, ch);
  ctx.drawImage(img, (cw - w) / 2, (ch - h) / 2, w, h);
}

/* ===== PRELOADER ===== */
const loaderFill = document.getElementById('loaderFill');
const loaderText = document.getElementById('loaderText');
const loader = document.getElementById('loader');

function loadFrames() {
  return new Promise((resolve) => {
    const phase1 = Math.min(20, TOTAL_FRAMES);
    let phase1Done = 0;
    for (let i = 1; i <= phase1; i++) {
      const img = new Image();
      img.onload = img.onerror = () => {
        if (img.complete && img.naturalWidth) frames[i - 1] = img;
        framesLoaded++;
        phase1Done++;
        const pct = Math.round((framesLoaded / TOTAL_FRAMES) * 100);
        loaderFill.style.width = pct + '%';
        loaderText.textContent = `Cargando experiencia… ${pct}%`;
        if (phase1Done === phase1) { resolve(); loadRestFrames(phase1 + 1); }
      };
      img.src = FRAME_PATH(i);
    }
  });
}

function loadRestFrames(start) {
  for (let i = start; i <= TOTAL_FRAMES; i++) {
    const img = new Image();
    const idx = i - 1;
    img.onload = () => {
      frames[idx] = img;
      framesLoaded++;
      const pct = Math.round((framesLoaded / TOTAL_FRAMES) * 100);
      loaderFill.style.width = pct + '%';
      loaderText.textContent = `Cargando experiencia… ${pct}%`;
    };
    img.src = FRAME_PATH(i);
  }
}

/* ===== INIT ===== */
loadFrames().then(() => {
  loader.classList.add('hidden');
  setTimeout(() => { loader.style.display = 'none'; }, 700);
  initApp();
});

/* ===== APP ===== */
function initApp() {
  gsap.registerPlugin(ScrollTrigger);

  // scroll nativo — más estable
  gsap.ticker.lagSmoothing(0);

  /* === canvas visible desde el inicio === */

  /* === FRAME LOOP CONTINUO 30fps === */
  let lastFrameTime = 0;
  const FPS = 30;
  const frameInterval = 1000 / FPS;
  function animateBrain(timestamp) {
    if (timestamp - lastFrameTime >= frameInterval) {
      lastFrameTime = timestamp;
      currentFrame = (currentFrame + 1) % TOTAL_FRAMES;
      if (frames[currentFrame]) drawFrame(currentFrame);
    }
    requestAnimationFrame(animateBrain);
  }
  requestAnimationFrame(animateBrain);

  /* === DARK OVERLAY stats === */
  const overlay = document.getElementById('dark-overlay');
  ScrollTrigger.create({
    trigger: '.stats-section',
    start: 'top 60%', end: 'bottom 40%', scrub: 1,
    onUpdate: (self) => {
      overlay.style.opacity = self.progress < 0.5
        ? self.progress * 2 * 0.88
        : (1 - self.progress) * 2 * 0.88;
    },
  });

  /* === SECTION ANIMATIONS === */
  gsap.set('.scroll-section h2', { y: 40, opacity: 0 });
  gsap.set('.scroll-section p:not(.service-body p)', { y: 20, opacity: 0 });
  gsap.set('.label', { y: 10, opacity: 0 });
  gsap.set('.cta-buttons', { y: 20, opacity: 0 });
  gsap.set('.services-accordion', { opacity: 0 });
  gsap.set('.stats-grid', { opacity: 0 });

  document.querySelectorAll('.scroll-section').forEach((section) => {
    const tl = gsap.timeline({
      scrollTrigger: { trigger: section, start: 'top 70%', toggleActions: 'play none none reverse' },
    });
    const label      = section.querySelector('.label');
    const heading    = section.querySelector('h2');
    const para       = section.querySelector('.section-content > p');
    const accordion  = section.querySelector('.services-accordion');
    const statsGrid  = section.querySelector('.stats-grid');
    const ctaButtons = section.querySelector('.cta-buttons');
    const btnOutline = section.querySelector('.btn-outline');

    if (label)      tl.to(label,     { opacity: 1, y: 0, duration: 0.5 }, 0);
    if (heading)    tl.to(heading,   { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' }, 0.15);
    if (para)       tl.to(para,      { opacity: 1, y: 0, duration: 0.6 }, 0.3);
    if (accordion)  tl.to(accordion, { opacity: 1, duration: 0.5 }, 0.35);
    if (btnOutline) tl.to(btnOutline,{ opacity: 1, duration: 0.5 }, 0.45);

    if (statsGrid) {
      tl.to(statsGrid, { opacity: 1, duration: 0.5 }, 0.35);
      section.querySelectorAll('.stat-number').forEach((el) => {
        const target = parseFloat(el.dataset.value);
        const suffix = el.dataset.suffix || '';
        ScrollTrigger.create({
          trigger: el, start: 'top 80%', once: true,
          onEnter: () => {
            gsap.to({ val: 0 }, {
              val: target, duration: 2, ease: 'power2.out',
              onUpdate: function () { el.textContent = Math.round(this.targets()[0].val) + suffix; },
            });
            setTimeout(() => el.classList.add('flash'), 1800);
          },
        });
      });
    }
    if (ctaButtons) tl.to(ctaButtons, { opacity: 1, y: 0, duration: 0.7 }, 0.5);
  });

  /* === MARQUEE === */
  gsap.to('#marquee1', { scrollTrigger: { trigger: '.marquee-section', scrub: 1 }, x: '-=100' });
  gsap.to('#marquee2', { scrollTrigger: { trigger: '.marquee-reverse', scrub: 1 }, x: '+=100' });

  /* === cerebro fixed, sin parallax === */
}
