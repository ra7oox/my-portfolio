// ============ SECTION 3: GSAP HERO TEXT ANIMATIONS ============
function startHeroAnimations() {
  gsap.registerPlugin(TextPlugin);

  // Splitter le nom en spans (lettre par lettre) sur .name-highlight
  const nameEl = document.querySelector('.name-highlight');
  if (nameEl) {
    const text = nameEl.textContent;
    nameEl.innerHTML = [...text].map(c =>
      c === ' ' ? '<span style="display:inline-block;width:0.3em"></span>'
                : `<span class="char" style="display:inline-block">${c}</span>`
    ).join('');
  }

  const tl = gsap.timeline({ delay: 0.2 });

  // Greeting
  tl.from('.hero-greeting, .greeting', {
    opacity: 0,
    y: 25,
    duration: 0.7,
    ease: 'power2.out'
  });

  // Nom lettre par lettre
  tl.from('.name-highlight .char', {
    opacity: 0,
    y: 40,
    rotationX: -90,
    stagger: 0.04,
    duration: 0.5,
    ease: 'back.out(1.5)'
  }, '-=0.3');

  // Underline qui s'étend
  tl.fromTo('.hero-underline',
    { scaleX: 0, transformOrigin: 'left center' },
    { scaleX: 1, duration: 0.7, ease: 'power3.out' },
    '-=0.2'
  );

  // Description Description typewriter
  const subtitle = document.querySelector('.hero-description');
  if (subtitle) {
    const originalText = subtitle.textContent.trim();
    subtitle.textContent = '';
    tl.to(subtitle, {
      duration: originalText.length * 0.018,
      text: originalText,
      ease: 'none'
    }, '-=0.3');
  }

  // Count-up stats in Hero Section
  document.querySelectorAll('.stat-number').forEach((el, i) => {
    const textVal = el.textContent;
    const target = parseInt(textVal) || 0;
    const hasPlus = textVal.includes('+');
    
    el.textContent = '0';
    tl.to(el, {
      innerText: target,
      duration: 1.5,
      snap: { innerText: 1 },
      ease: 'power1.out',
      onUpdate: function() {
        el.textContent = Math.floor(el.innerText) + (hasPlus ? '+' : '');
      }
    }, `-=${i === 0 ? 0.5 : 1.0}`);
  });

  // CTA button triggers stagger
  tl.from('.cta-buttons a', {
    opacity: 0,
    scale: 0.85,
    y: 20,
    stagger: 0.12,
    ease: 'back.out(1.7)',
    duration: 0.5
  }, '-=1.0');

  // Infinite bouncing motion for scroll indicator
  gsap.to('.scroll-indicator', {
    y: 10,
    repeat: -1,
    yoyo: true,
    duration: 0.9,
    ease: 'sine.inOut',
    delay: 2.5
  });

  // Cinematic Three.js camera position-Z sweep on load
  if (window._heroCamera) {
    gsap.fromTo(window._heroCamera.position,
      { z: 16 },
      { z: 7, duration: 2.5, ease: 'power3.out' }
    );
  }
}

// ============ SECTION 4: SCROLL TRIGGER LAYOUT ANIMATIONS ============
function initScrollAnimations() {
  gsap.registerPlugin(ScrollTrigger);

  /* Generic fade-up animations */
  gsap.utils.toArray('.animate-in').forEach(el => {
    gsap.from(el, {
      scrollTrigger: {
        trigger: el,
        start: 'top 88%'
      },
      opacity: 0,
      y: 40,
      duration: 0.7,
      ease: 'power2.out'
    });
  });

  /* Neon timeline center drawing */
  const timelineLine = document.querySelector('.experience-timeline::before, .timeline::before');
  if (timelineLine) {
    gsap.from(timelineLine, {
      scrollTrigger: {
        trigger: '#experience',
        start: 'top center',
        end: 'bottom center',
        scrub: 1.5
      },
      scaleY: 0,
      transformOrigin: 'top center'
    });
  }

  /* Alternating experience cards slides */
  gsap.utils.toArray('.experience-item').forEach((card, i) => {
    gsap.from(card, {
      scrollTrigger: {
        trigger: card,
        start: 'top 85%'
      },
      x: i % 2 === 0 ? -50 : 50,
      opacity: 0,
      duration: 0.8,
      ease: 'power2.out'
    });
  });

  /* Skill neon progress bars filling */
  document.querySelectorAll('.skill-progress').forEach(bar => {
    const progress = bar.closest('.skill-item').querySelector('.skill-percent').textContent.trim();
    bar.style.width = '0%';
    gsap.to(bar, {
      scrollTrigger: {
        trigger: bar,
        start: 'top 92%'
      },
      width: progress,
      duration: 1.3,
      ease: 'power2.out',
      onComplete: () => bar.classList.add('loaded')
    });
  });

  /* Service cards stagger details */
  gsap.from('.service-card', {
    scrollTrigger: {
      trigger: '.services-grid',
      start: 'top 92%',
      once: true
    },
    opacity: 0,
    y: 40,
    scale: 0.95,
    stagger: 0.08,
    duration: 0.65,
    ease: 'back.out(1.2)'
  });

  /* Process steps horizontal pin scrolling (Desktop only) */
  if (window.innerWidth > 1024) {
    const track = document.querySelector('.process-steps');
    if (track) {
      gsap.to(track, {
        x: () => -(track.scrollWidth - window.innerWidth + 120),
        ease: 'none',
        scrollTrigger: {
          trigger: '#process',
          start: 'top top',
          end: () => '+=' + (track.scrollWidth - window.innerWidth + 120),
          scrub: 1,
          pin: true,
          anticipatePin: 1
        }
      });
    }
  }

  /* Counter increments inside About Section */
  document.querySelectorAll('[data-count]').forEach(el => {
    const target = parseInt(el.getAttribute('data-count')) || 0;
    gsap.to({ val: 0 }, {
      scrollTrigger: {
        trigger: el,
        start: 'top 88%'
      },
      val: target,
      duration: 2.0,
      ease: 'power1.out',
      snap: { val: 1 },
      onUpdate: function() {
        el.textContent = Math.floor(this.targets()[0].val) + '+';
      }
    });
  });

  /* Cascading portfolio cards */
  gsap.from('.portfolio-item', {
    scrollTrigger: {
      trigger: '#portfolio',
      start: 'top 75%'
    },
    opacity: 0,
    y: 50,
    stagger: 0.08,
    duration: 0.6,
    ease: 'power2.out'
  });

  /* Navbar background shift & blur on scroll */
  ScrollTrigger.create({
    start: 'top -80',
    onUpdate: self => {
      const nav = document.getElementById('navbar');
      if (!nav) return;
      if (self.progress > 0) {
        nav.style.background = 'var(--bg-nav)';
        nav.style.backdropFilter = 'blur(16px)';
        nav.style.webkitBackdropFilter = 'blur(16px)';
        nav.style.borderBottom = '1px solid var(--border)';
        nav.style.padding = '0.9rem 0';
      } else {
        nav.style.background = 'transparent';
        nav.style.backdropFilter = 'none';
        nav.style.webkitBackdropFilter = 'none';
        nav.style.borderBottom = 'none';
        nav.style.padding = '1.5rem 0';
      }
    }
  });
}

