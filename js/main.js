/**
 * Ra7oox Portfolio - Premium Core Logic & Animation Engine
 * Awwwards-Level Design using Three.js & GSAP 3 Vanilla
 * Fully compatible with static hosting (GitHub Pages) & Multilingual (FR/EN/AR)
 */

// ============ SECTION 1: LOADING CURTAIN SCREEN ============
(function initLoader() {
  const loaderScreen = document.getElementById('loading-screen');
  const loaderContent = document.querySelector('.loader-content');
  const bar = document.getElementById('loader-bar');
  const percent = document.getElementById('loader-percent');
  const statusEl = document.getElementById('loader-status');
  const paths = document.querySelectorAll('.logo-path');

  if (!loaderScreen) return;

  // 1. Dynamically measure and prepare SVG paths for the drawing animation
  paths.forEach(path => {
    const length = path.getTotalLength();
    path.style.strokeDasharray = length;
    path.style.strokeDashoffset = length;
  });

  // 2. Interactive mouse tilt parallax on loading screen content
  if (loaderContent) {
    loaderScreen.addEventListener('mousemove', e => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      const x = (e.clientX / w - 0.5) * 24; // Max 12 deg tilt
      const y = (e.clientY / h - 0.5) * -24;
      gsap.to(loaderContent, {
        rotateY: x,
        rotateX: y,
        translateZ: 15,
        duration: 0.4,
        ease: 'power2.out'
      });
    });
    
    loaderScreen.addEventListener('mouseleave', () => {
      gsap.to(loaderContent, {
        rotateY: 0,
        rotateX: 0,
        translateZ: 0,
        duration: 0.8,
        ease: 'power3.out'
      });
    });
  }

  // 3. Cinematic entry animation: Fade in the content container organically
  gsap.fromTo(loaderContent, 
    { opacity: 0, scale: 0.95 },
    { opacity: 1, scale: 1, duration: 1.2, ease: 'power3.out' }
  );

  // 4. Staggered logo drawing animation with GSAP
  // Hexagon border, then central monogram R, then brackets!
  const svgDrawTimeline = gsap.timeline({ defaults: { ease: 'power2.out' } });
  
  svgDrawTimeline.to('.logo-hexagon', { strokeDashoffset: 0, duration: 2.2 }, 0.2)
                 .to('.logo-char-r', { strokeDashoffset: 0, duration: 1.8 }, 0.6)
                 .to(['.logo-bracket-left', '.logo-bracket-right'], { strokeDashoffset: 0, duration: 1.0, stagger: 0.15 }, 1.4);

  // 5. Smooth loading percentage tracker with interactive status statements
  let progress = 0;
  const statusMessages = {
    10: 'Initialisation...',
    30: 'Chargement du noyau WebGL...',
    55: 'Compilation des Shaders...',
    75: 'Chargement des composants 3D...',
    90: 'Synchronisation finale...',
    100: 'Bienvenue'
  };

  const interval = setInterval(() => {
    // Progress increment simulates network/asset load steps
    progress += Math.random() * 8 + 2;
    
    if (progress >= 100) {
      progress = 100;
      clearInterval(interval);
      
      if (bar) bar.style.width = '100%';
      if (percent) percent.textContent = '100%';
      if (statusEl) statusEl.textContent = statusMessages[100];
      
      // Delay slightly for user to admire the completed glowing logo
      setTimeout(revealSite, 600);
    } else {
      const currentProg = Math.min(progress, 100);
      if (bar) bar.style.width = currentProg + '%';
      if (percent) percent.textContent = String(Math.floor(currentProg)).padStart(2, '0') + '%';
      
      // Dynamic status messaging updates
      const matchKey = Object.keys(statusMessages)
        .map(Number)
        .sort((a,b) => b-a)
        .find(key => currentProg >= key);
      
      if (matchKey && statusEl) {
        statusEl.textContent = statusMessages[matchKey];
      }
    }
  }, 70);

  // 6. Dual-panel premium vertical curtain reveal transition
  function revealSite() {
    const tl = gsap.timeline({
      onComplete: () => {
        loaderScreen.style.display = 'none';
        window._loaderStopped = true;
        
        // Let user scroll and trigger the portfolio start scripts
        document.body.style.overflow = '';
        window.startSite();
      }
    });

    // Prevent scrolling during reveal transition
    document.body.style.overflow = 'hidden';

    // A. Dissolve preloader UI elements with stagger and lift
    tl.to('.loader-content', {
      opacity: 0,
      scale: 0.94,
      y: -50,
      duration: 0.8,
      ease: 'power3.inOut'
    }, 0);

    // B. Main and BG curtain panels pull up staggered with elastic shear effect (skew)
    tl.to('#loader-panel-main', {
      yPercent: -100,
      duration: 1.35,
      ease: 'power4.inOut'
    }, 0.3);

    tl.to('#loader-panel-bg', {
      yPercent: -100,
      duration: 1.45,
      ease: 'power4.inOut'
    }, 0.4);

    // C. Physical organic shear (skew) during vertical slides
    tl.to(['#loader-panel-main', '#loader-panel-bg'], {
      skewY: -4,
      duration: 0.65,
      ease: 'power3.in',
      transformOrigin: 'top left'
    }, 0.3);

    tl.to(['#loader-panel-main', '#loader-panel-bg'], {
      skewY: 0,
      duration: 0.8,
      ease: 'power3.out'
    }, 0.95);
  }
})();

// ============ SECTION 14: POINT OF ENTRY GLOBAL FUNCTIONS ============

// Add class animate-in to all elements to animate
function tagAnimatables() {
  const selectors = [
    '.about-content > *', '.skill-category',
    '.project-card', '.portfolio-card',
    '.testimonial-card', '.experience-card',
    '.contact-info', '.contact-form',
    'section > .container > p',
    '.process-step', '.process-item'
  ];
  selectors.forEach(sel => {
    document.querySelectorAll(sel).forEach(el => el.classList.add('animate-in'));
  });
}

// Global startSite triggered by loader curtains
window.startSite = function() {
  tagAnimatables();
  initHeroScene();
  startHeroAnimations();
  initScrollAnimations();
  initTilt();
  initCursor();
  initNavHighlight();
  initProjectSliders();
  initLightboxActions();
  initReviewsSection();
  initContactForm();
  initInteractions();
};
