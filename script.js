/* ═══════════════════════════════════════════
   Abhishek Sharma — Portfolio JS
   Vanilla JS · Performance-optimized
   ═══════════════════════════════════════════ */

(function () {
  'use strict';

  /* ── DevOps Loader ── */
  const loader = document.getElementById('devopsLoader');
  if (loader) {
    const forceLoader = new URLSearchParams(window.location.search).get('loader') === 'true';
    const mainElements = Array.from(document.body.children).filter(el => 
      el.id !== 'devopsLoader' && el.tagName !== 'SCRIPT' && el.tagName !== 'STYLE'
    );

    // Run loader unconditionally
    document.body.classList.add('loading');
    mainElements.forEach(el => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(15px)';
      el.style.transition = 'opacity 0.8s cubic-bezier(.16,1,.3,1), transform 0.8s cubic-bezier(.16,1,.3,1)';
    });

      const percentageEl = document.getElementById('devopsPercentage');
      const statusEl = document.getElementById('devopsStatus');
      const barFillEl = document.getElementById('devopsBarFill');
      const ringProgressEl = document.getElementById('devopsRingProgress');
      const toolsContainer = document.getElementById('devopsTools');
      
      const stages = [
        { threshold: 0, text: '> initializing linux environment...', tool: 'Linux', posClass: 'pos-0' },
        { threshold: 5, text: '> executing bash scripts...', tool: 'Bash', posClass: 'pos-1' },
        { threshold: 10, text: '> configuring git repository...', tool: 'Git', posClass: 'pos-2' },
        { threshold: 15, text: '> pulling from github...', tool: 'GitHub', posClass: 'pos-3' },
        { threshold: 20, text: '> scanning with gitleaks...', tool: 'Gitleaks', posClass: 'pos-4' },
        { threshold: 25, text: '> running tfsec analysis...', tool: 'tfsec', posClass: 'pos-5' },
        { threshold: 30, text: '> linting terraform...', tool: 'TFLint', posClass: 'pos-6' },
        { threshold: 35, text: '> loading terraform infrastructure...', tool: 'Terraform', posClass: 'pos-7' },
        { threshold: 40, text: '> authenticating azure cli...', tool: 'Azure CLI', posClass: 'pos-8' },
        { threshold: 45, text: '> deploying to azure...', tool: 'Azure', posClass: 'pos-9' },
        { threshold: 50, text: '> configuring azure landing zone...', tool: 'Azure Landing Zone', posClass: 'pos-0' },
        { threshold: 55, text: '> connecting aws resources...', tool: 'AWS', posClass: 'pos-1' },
        { threshold: 60, text: '> configuring container runtime...', tool: 'Docker', posClass: 'pos-2' },
        { threshold: 65, text: '> orchestrating kubernetes...', tool: 'Kubernetes', posClass: 'pos-3' },
        { threshold: 70, text: '> deploying jenkins pipelines...', tool: 'Jenkins', posClass: 'pos-4' },
        { threshold: 75, text: '> triggering github actions...', tool: 'GitHub Actions', posClass: 'pos-5' },
        { threshold: 80, text: '> setting up prometheus metrics...', tool: 'Prometheus', posClass: 'pos-6' },
        { threshold: 85, text: '> configuring grafana dashboards...', tool: 'Grafana', posClass: 'pos-7' },
        { threshold: 90, text: '> attaching azure monitor...', tool: 'Azure Monitor', posClass: 'pos-8' },
        { threshold: 95, text: '> compiling react frontend...', tool: 'React', posClass: 'pos-9' }
      ];

      let currentStageIndex = -1;
      const duration = 4000;
      let startTime = null;

      function finishLoading() {
        percentageEl.textContent = '100%';
        barFillEl.style.width = '100%';
        ringProgressEl.style.strokeDashoffset = 0;
        document.getElementById('devopsLabel').textContent = 'SYSTEM READY ✓';
        statusEl.textContent = '> DEVOPS ENVIRONMENT INITIALIZED';
        
        setTimeout(() => {
          loader.classList.add('devops-loader--hidden');
          mainElements.forEach(el => {
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
          });
          document.body.classList.remove('loading');
          setTimeout(() => loader.style.display = 'none', 800);
        }, 600);
      }

      function updateLoader(timestamp) {
        if (!startTime) startTime = timestamp;
        const elapsed = timestamp - startTime;
        let rawProgress = Math.min(elapsed / duration, 1);
        
        const progress = rawProgress * (2 - rawProgress) * 100; // easeOutQuad
        const currentVal = Math.floor(progress);
        
        percentageEl.textContent = `${currentVal}%`;
        barFillEl.style.width = `${currentVal}%`;
        
        const offset = 289.026 - (289.026 * currentVal / 100);
        ringProgressEl.style.strokeDashoffset = offset;
        
        let activeStageIndex = -1;
        for (let i = stages.length - 1; i >= 0; i--) {
           if (currentVal >= stages[i].threshold) {
               activeStageIndex = i;
               break;
           }
        }
        
        if (activeStageIndex > currentStageIndex) {
           for (let i = currentStageIndex + 1; i <= activeStageIndex; i++) {
               statusEl.textContent = stages[i].text;
               const stage = stages[i];
               const toolEl = document.createElement('div');
               toolEl.className = `devops-loader__tool ${stage.posClass}`;
               toolEl.innerHTML = `<span>${stage.tool}</span><span class="devops-loader__tool-check">✓</span>`;
               toolsContainer.appendChild(toolEl);
               void toolEl.offsetWidth; // trigger reflow
               toolEl.classList.add('visible');
           }
           currentStageIndex = activeStageIndex;
        }
        
        if (rawProgress < 1) {
          requestAnimationFrame(updateLoader);
        } else {
          finishLoading();
        }
      }

      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
         finishLoading();
      } else {
         requestAnimationFrame(updateLoader);
      }
  }

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ── Mobile menu toggle ── */
  const menuBtn = document.getElementById('menuBtn');
  const nav = document.getElementById('nav');

  menuBtn?.addEventListener('click', () => nav.classList.toggle('open'));
  document.querySelectorAll('nav a').forEach(a =>
    a.addEventListener('click', () => nav.classList.remove('open'))
  );

  /* ── Scroll-reveal (IntersectionObserver) ── */
  const revealObserver = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
  );
  document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

  /* ── Active nav indicator on scroll ── */
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('nav a[href^="#"]');

  function updateActiveNav() {
    const scrollY = window.scrollY + 120;
    let currentId = '';

    sections.forEach(section => {
      if (section.offsetTop <= scrollY) {
        currentId = section.id;
      }
    });

    navLinks.forEach(link => {
      link.classList.toggle('active', link.getAttribute('href') === '#' + currentId);
    });
  }

  let navTicking = false;
  window.addEventListener('scroll', () => {
    if (!navTicking) {
      requestAnimationFrame(() => {
        updateActiveNav();
        navTicking = false;
      });
      navTicking = true;
    }
  }, { passive: true });
  updateActiveNav();

  /* ── Cursor glow (desktop only, rAF throttled) ── */
  const glow = document.querySelector('.cursor-glow');
  if (glow && !reducedMotion && window.matchMedia('(hover: hover)').matches) {
    let glowX = 0, glowY = 0, glowRaf = false;

    window.addEventListener('mousemove', e => {
      glowX = e.clientX;
      glowY = e.clientY;
      if (!glowRaf) {
        glowRaf = true;
        requestAnimationFrame(() => {
          glow.style.left = glowX + 'px';
          glow.style.top = glowY + 'px';
          glowRaf = false;
        });
      }
    }, { passive: true });
  } else if (glow) {
    glow.style.display = 'none';
  }

  /* ── Card tilt effect (rAF throttled) ── */
  document.querySelectorAll('[data-tilt]').forEach(card => {
    let tiltRaf = false;

    card.addEventListener('mousemove', e => {
      if (window.innerWidth < 850 || reducedMotion) return;
      if (tiltRaf) return;
      tiltRaf = true;

      requestAnimationFrame(() => {
        const r = card.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width - 0.5;
        const y = (e.clientY - r.top) / r.height - 0.5;
        card.style.transform =
          `perspective(900px) rotateX(${(-y * 4).toFixed(2)}deg) rotateY(${(x * 5).toFixed(2)}deg) translateY(-3px)`;
        tiltRaf = false;
      });
    }, { passive: true });

    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });

  /* ── Button magnetic hover (desktop only) ── */
  if (!reducedMotion && window.matchMedia('(hover: hover)').matches) {
    document.querySelectorAll('.btn').forEach(btn => {
      btn.addEventListener('mousemove', e => {
        const r = btn.getBoundingClientRect();
        const mx = ((e.clientX - r.left) / r.width) * 100;
        const my = ((e.clientY - r.top) / r.height) * 100;
        btn.style.setProperty('--mouse-x', mx + '%');
        btn.style.setProperty('--mouse-y', my + '%');
      }, { passive: true });

      btn.addEventListener('mouseleave', () => {
        btn.style.removeProperty('--mouse-x');
        btn.style.removeProperty('--mouse-y');
      });
    });
  }

})();
