/**
 * Ra7oox Portfolio - Premium Core Logic & Animation Engine
 * Awwwards-Level Design using Three.js & GSAP 3 Vanilla
 * Fully compatible with static hosting (GitHub Pages) & Multilingual (FR/EN/AR)
 */

// ============ SECTION 1: LOADING CURTAIN SCREEN ============
(function initLoader() {
  let progress = 0;
  const bar = document.getElementById('loader-bar');
  const percent = document.getElementById('loader-percent');

  // Interactive 3D mouse tilt parallax on loading screen
  const loaderScreen = document.getElementById('loading-screen');
  const loaderContent = document.querySelector('.loader-content');
  if (loaderScreen && loaderContent) {
    loaderScreen.addEventListener('mousemove', e => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      const x = (e.clientX / w - 0.5) * 30; // Max 15 degrees tilt
      const y = (e.clientY / h - 0.5) * -30;
      loaderContent.style.transform = `perspective(800px) rotateY(${x}deg) rotateX(${y}deg) translateZ(20px)`;
    });
    loaderScreen.addEventListener('mouseleave', () => {
      loaderContent.style.transform = 'perspective(800px) rotateY(0deg) rotateX(0deg) translateZ(0)';
    });
  }

  const interval = setInterval(() => {
    // Increment randomly for a natural, smooth load feel
    progress += Math.random() * 12 + 3;
    if (progress >= 100) {
      progress = 100;
      clearInterval(interval);
      if (bar) bar.style.width = '100%';
      if (percent) percent.textContent = '100%';
      // Short delay for visual completeness then slide reveal curtains
      setTimeout(revealSite, 400);
    } else {
      if (bar) bar.style.width = Math.min(progress, 100) + '%';
      if (percent) percent.textContent = Math.floor(Math.min(progress, 100)) + '%';
    }
  }, 80);

  function revealSite() {
    const tl = gsap.timeline({
      onComplete: () => {
        const loaderScreen = document.getElementById('loading-screen');
        if (loaderScreen) loaderScreen.style.display = 'none';
        
        // Start major scripts
        window.startSite();
      }
    });

    // 1. UI Dissolve: Fade out the text elements and loading bar with stagger and subtle lift
    tl.to('.loader-name, .loader-bar-track, .loader-percent', {
      opacity: 0,
      scale: 0.92,
      y: -15,
      duration: 0.6,
      stagger: 0.08,
      ease: 'power3.inOut'
    }, 0);

    // 2. 3D Robot Hyperdrive Zoom: Speed up towards the camera for a dynamic flyby
    if (window._loaderCamera) {
      tl.to(window._loaderCamera.position, {
        z: 0.8,
        y: 0.2,
        duration: 0.9,
        ease: 'power3.in'
      }, 0);
    }

    // 3. Robot Collapse: Smoothly scale down the robot group as it flies past
    if (window._loaderRobot) {
      tl.to(window._loaderRobot.scale, {
        x: 0,
        y: 0,
        z: 0,
        duration: 0.8,
        ease: 'power3.in'
      }, 0.1);
    }

    // 4. Create and Dynamic Append Cinematic Flash Overlay
    const flash = document.createElement('div');
    flash.style.cssText = 'position:fixed; inset:0; z-index:9998; opacity:0; pointer-events:none;';
    const isLight = document.body.classList.contains('light-mode');
    flash.style.background = isLight ? '#ffffff' : '#00d4ff';
    document.body.appendChild(flash);

    // 5. Flash-in Sweep
    tl.to(flash, {
      opacity: 1,
      duration: 0.28,
      ease: 'power2.in'
    }, 0.62);

    // 6. Premium Diagonal Curtain Shear Split
    // Skewing the left and right curtains produces an elegant diagonal curtain separation
    tl.to('#loader-left', {
      x: '-110%',
      skewX: -12,
      transformOrigin: 'top left',
      duration: 1.25,
      ease: 'power4.inOut'
    }, 0.45);

    tl.to('#loader-right', {
      x: '110%',
      skewX: -12,
      transformOrigin: 'bottom right',
      duration: 1.25,
      ease: 'power4.inOut'
    }, 0.45);

    // 7. Flash Dissolve & Clean-up
    tl.to(flash, {
      opacity: 0,
      duration: 0.85,
      ease: 'power2.out',
      onComplete: () => {
        flash.remove();
      }
    }, 0.9);
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
