// ============ SECTION 3: GSAP HERO TEXT ANIMATIONS ============
function startHeroAnimations() {
  gsap.registerPlugin(TextPlugin);

  // Premium double-span mask reveal on name-highlight
  const nameEl = document.querySelector('.name-highlight');
  if (nameEl) {
    const text = nameEl.textContent.trim();
    nameEl.innerHTML = '';
    [...text].forEach(char => {
      const outer = document.createElement('span');
      outer.style.cssText = 'display: inline-block; overflow: hidden; vertical-align: bottom;';
      
      const inner = document.createElement('span');
      inner.className = 'char';
      inner.style.cssText = 'display: inline-block; transform-origin: bottom left; will-change: transform, opacity;';
      
      if (char === ' ') {
        inner.innerHTML = '&nbsp;';
      } else {
        inner.textContent = char;
      }
      
      outer.appendChild(inner);
      nameEl.appendChild(outer);
    });
  }

  const tl = gsap.timeline({ delay: 0.2 });

  // Greeting
  tl.from('.hero-greeting, .greeting', {
    opacity: 0,
    y: 25,
    duration: 0.7,
    ease: 'power2.out'
  });

  // Staggered premium mask reveal for letters
  tl.fromTo('.name-highlight .char',
    { yPercent: 105, rotate: 6, opacity: 0 },
    { yPercent: 0, rotate: 0, opacity: 1, duration: 1.1, stagger: 0.04, ease: 'power4.out' },
    '-=0.3'
  );

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

  // CTA button triggers stagger
  tl.from('.cta-buttons a', {
    opacity: 0,
    scale: 0.85,
    y: 20,
    stagger: 0.12,
    ease: 'back.out(1.7)',
    duration: 0.5
  }, '-=0.3');

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

  // A. Premium clip-path reveal on major sections (Awwwards-grade layout scanning)
  gsap.utils.toArray('section').forEach(sec => {
    if (sec.id === 'home') return;
    
    gsap.fromTo(sec,
      { clipPath: 'polygon(0% 12%, 100% 12%, 100% 100%, 0% 100%)', opacity: 0.8, y: 50 },
      {
        clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
        opacity: 1,
        y: 0,
        duration: 1.4,
        ease: 'power4.out',
        scrollTrigger: {
          trigger: sec,
          start: 'top 85%',
          toggleActions: 'play none none none'
        }
      }
    );
  });

  // B. Staggered fade-up & mask slide for section titles
  gsap.utils.toArray('.section-header').forEach(header => {
    const title = header.querySelector('.section-title');
    const subtitle = header.querySelector('.section-subtitle');
    const tag = header.querySelector('.section-tag');
    
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: header,
        start: 'top 82%',
        toggleActions: 'play none none none'
      }
    });

    if (tag) tl.from(tag, { opacity: 0, scale: 0.9, y: 15, duration: 0.5, ease: 'power2.out' });
    if (title) tl.from(title, { opacity: 0, y: 30, duration: 0.7, ease: 'power3.out' }, '-=0.3');
    if (subtitle) tl.from(subtitle, { opacity: 0, y: 20, duration: 0.6, ease: 'power2.out' }, '-=0.3');
  });

  // C. Neon timeline center drawing for Experience
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

  // D. Alternating experience cards slides
  gsap.utils.toArray('.experience-item').forEach((card, i) => {
    gsap.from(card, {
      scrollTrigger: {
        trigger: card,
        start: 'top 82%'
      },
      x: i % 2 === 0 ? -50 : 50,
      opacity: 0,
      duration: 0.8,
      ease: 'power2.out'
    });
  });

  // E. Skill neon progress bars filling & synchronized percent counter increments
  document.querySelectorAll('.skill-item').forEach(item => {
    const bar = item.querySelector('.skill-progress');
    const percentEl = item.querySelector('.skill-percent');
    if (!bar || !percentEl) return;
    
    const targetVal = parseInt(percentEl.textContent) || 0;
    
    // Reset to starting values before animation triggers
    bar.style.width = '0%';
    percentEl.textContent = '0%';
    
    const skillTl = gsap.timeline({
      scrollTrigger: {
        trigger: item,
        start: 'top 92%',
        toggleActions: 'play none none none'
      }
    });

    skillTl.to(bar, {
      width: `${targetVal}%`,
      duration: 1.4,
      ease: 'power3.out',
      onComplete: () => bar.classList.add('loaded')
    });

    skillTl.to({ val: 0 }, {
      val: targetVal,
      duration: 1.4,
      ease: 'power3.out',
      snap: { val: 1 },
      onUpdate: function() {
        percentEl.textContent = Math.floor(this.targets()[0].val) + '%';
      }
    }, 0);
  });

  // F. Service cards stagger reveal
  gsap.from('.service-card', {
    scrollTrigger: {
      trigger: '.services-grid',
      start: 'top 90%',
      once: true
    },
    opacity: 0,
    y: 40,
    scale: 0.95,
    stagger: 0.08,
    duration: 0.65,
    ease: 'back.out(1.2)'
  });

  // G. Process steps horizontal pin scrolling (Desktop only)
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

  // H. Unified statistical counters: s'animent de 0 à leur cible uniquement lorsque visibles
  document.querySelectorAll('.stat-number, [data-count]').forEach(el => {
    const textVal = el.getAttribute('data-count') || el.textContent.trim();
    const target = parseInt(textVal) || 0;
    const hasPlus = textVal.includes('+') || el.textContent.includes('+');
    
    // Set initial zero values
    el.textContent = '0' + (hasPlus ? '+' : '');
    
    gsap.to({ val: 0 }, {
      scrollTrigger: {
        trigger: el,
        start: 'top 88%',
        toggleActions: 'play none none none'
      },
      val: target,
      duration: 1.8,
      ease: 'power2.out',
      snap: { val: 1 },
      onUpdate: function() {
        el.textContent = Math.floor(this.targets()[0].val) + (hasPlus ? '+' : '');
      }
    });
  });

  // I. Cascading portfolio cards
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

  // J. Navbar background shift & blur on scroll
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

