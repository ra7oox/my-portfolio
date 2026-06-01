// ============ FIREBASE SYSTEM ARCHITECTURE & DATABASE ENGINE ============
// Loaded from external js/firebase-config.js which is ignored by Git to keep API keys secure.
const firebaseConfig = window.firebaseConfig || {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};

let db = null;
const isFirebaseConfigured = firebaseConfig.apiKey && firebaseConfig.apiKey !== "YOUR_API_KEY" && firebaseConfig.apiKey !== "";

if (isFirebaseConfigured && typeof firebase !== 'undefined') {
  try {
    firebase.initializeApp(firebaseConfig);
    db = firebase.firestore();
  } catch (err) {
    console.warn("Firebase initialization failed:", err);
  }
}

// ============ SECTION 5: 3D HOVER CARD TILT EFFECTS ============
function initTilt() {
  document.querySelectorAll(
    '.project-card, .service-card, .portfolio-item, .testimonial-card, .info-card, .contact-item'
  ).forEach(card => {
    card.addEventListener('mousemove', e => {
      const r = card.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5;
      const y = (e.clientY - r.top) / r.height - 0.5;
      
      requestAnimationFrame(() => {
        card.style.transform = `perspective(900px) rotateX(${-y * 8}deg) rotateY(${x * 8}deg) translateZ(6px)`;
        card.style.setProperty('--mx', ((x + 0.5) * 100) + '%');
        card.style.setProperty('--my', ((y + 0.5) * 100) + '%');
      });
    });

    card.addEventListener('mouseleave', () => {
      requestAnimationFrame(() => {
        card.style.transform = 'perspective(900px) rotateX(0deg) rotateY(0deg) translateZ(0)';
      });
    });
  });
}

// ============ SECTION 6: SMOOTH CURSOR SYSTEMS ============
function initCursor() {
  if (window.innerWidth < 769) return;
  const dot = document.getElementById('c-dot');
  const ring = document.getElementById('c-ring');
  if (!dot || !ring) return;

  // Set initial cursor colors matching light/dark themes
  const isLight = document.body.classList.contains('light-mode');
  if (isLight) {
    dot.style.background = '#0ea5e9';
    ring.style.borderColor = 'rgba(14, 165, 233, 0.55)';
  } else {
    dot.style.background = '#00d4ff';
    ring.style.borderColor = 'rgba(0, 212, 255, 0.55)';
  }

  let rx = 0, ry = 0;
  let mouseX = 0, mouseY = 0;

  document.addEventListener('mousemove', e => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  // Smooth lerp coordinate loop for outer ring & dot
  (function lerp() {
    rx += (mouseX - rx) * 0.12;
    ry += (mouseY - ry) * 0.12;
    
    dot.style.left = mouseX + 'px';
    dot.style.top = mouseY + 'px';
    ring.style.left = rx + 'px';
    ring.style.top = ry + 'px';
    
    requestAnimationFrame(lerp);
  })();

  // Scaling hover classes
  document.querySelectorAll('a, button, .project-card, .service-card, .filter-btn, .portfolio-link').forEach(el => {
    el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
    el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
  });
}

// ============ SECTION 7: NAV HIGHLIGHTS & DETECTS ============
function initNavHighlight() {
  const sections = document.querySelectorAll('section[id]');
  const links = document.querySelectorAll('nav a[href^="#"], .navbar a[href^="#"]');
  
  if (!('IntersectionObserver' in window)) return;
  
  // A lower threshold of 0.15 and a rootMargin focused on the middle of the screen
  // ensures tall sections (like Testimonials and Contact) highlight reliably on all screen heights.
  const obs = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      links.forEach(l => l.classList.remove('active'));
      
      const active = document.querySelector(`nav a[href="#${entry.target.id}"]`);
      if (active) active.classList.add('active');
    });
  }, { threshold: 0.15, rootMargin: "-15% 0px -20% 0px" });
  
  sections.forEach(s => obs.observe(s));
}

// ============ SECTION 8: MULTI-IMAGE TOUCH SLIDERS (SAMTECH & SkillSwap) ============
function initProjectSliders() {
  const sliders = document.querySelectorAll('.project-slider');

  sliders.forEach(slider => {
    const wrapper = slider.querySelector('.slider-wrapper');
    const slides = slider.querySelectorAll('.slide');
    const prevBtn = slider.querySelector('.prev');
    const nextBtn = slider.querySelector('.next');
    const pagination = slider.querySelector('.slider-pagination');

    if (!wrapper || !slides.length) return;

    let currentIndex = 0;
    const totalSlides = slides.length;
    slider.dataset.currentIndex = currentIndex;

    // Build pagination dots
    slides.forEach((_, idx) => {
      const dot = document.createElement('div');
      dot.classList.add('dot');
      if (idx === 0) dot.classList.add('active');
      dot.addEventListener('click', () => goToSlide(idx));
      if (pagination) pagination.appendChild(dot);
    });

    const dots = pagination ? pagination.querySelectorAll('.dot') : [];

    function updateSlider() {
      wrapper.style.transform = `translateX(-${currentIndex * 100}%)`;
      slider.dataset.currentIndex = currentIndex;
      
      dots.forEach((dot, idx) => {
        dot.classList.toggle('active', idx === currentIndex);
      });
    }

    function goToSlide(idx) {
      currentIndex = idx;
      updateSlider();
    }

    function nextSlide() {
      currentIndex = (currentIndex + 1) % totalSlides;
      updateSlider();
    }

    function prevSlide() {
      currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
      updateSlider();
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', e => {
        e.stopPropagation();
        nextSlide();
      });
    }

    if (prevBtn) {
      prevBtn.addEventListener('click', e => {
        e.stopPropagation();
        prevSlide();
      });
    }

    // Dynamic auto scrolling
    let autoInterval = setInterval(nextSlide, 5000);
    
    slider.addEventListener('mouseenter', () => clearInterval(autoInterval));
    slider.addEventListener('mouseleave', () => {
      autoInterval = setInterval(nextSlide, 5000);
    });

    // Touch Swipe compatibility
    let touchStartX = 0;
    let touchEndX = 0;

    slider.addEventListener('touchstart', e => {
      touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    slider.addEventListener('touchend', e => {
      touchEndX = e.changedTouches[0].screenX;
      handleSwipe();
    }, { passive: true });

    function handleSwipe() {
      if (touchEndX < touchStartX - 50) nextSlide();
      if (touchEndX > touchStartX + 50) prevSlide();
    }
  });
}

// ============ SECTION 9: LIGHTBOX ZOOM POPUPS ============
function initLightboxActions() {
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxCaption = document.getElementById('lightbox-caption');
  const lightboxClose = document.querySelector('.lightbox-close');
  const lightboxOverlay = document.querySelector('.lightbox-overlay');

  if (!lightbox || !lightboxImg) return;

  function openLightbox(src, caption) {
    lightboxImg.src = src;
    lightboxCaption.textContent = caption;
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden'; // Freeze background scrolling
  }

  function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = ''; // Resume scrolling
  }

  document.querySelectorAll('.zoom-btn').forEach(btn => {
    btn.addEventListener('click', e => {
      e.preventDefault();
      e.stopPropagation();

      const item = btn.closest('.portfolio-item');
      if (!item) return;

      const title = item.querySelector('h3').textContent;
      const slider = item.querySelector('.project-slider');
      let src = "";
      let caption = title;

      if (slider) {
        // Slider images: fetch active slide coordinates
        const idx = parseInt(slider.dataset.currentIndex) || 0;
        const slides = slider.querySelectorAll('.slide img');
        if (slides[idx]) {
          src = slides[idx].src;
          caption += ` - Aperçu ${idx + 1}`;
        }
      } else {
        const img = item.querySelector('.portfolio-image img');
        if (img) src = img.src;
      }

      openLightbox(src, caption);
    });
  });

  if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
  if (lightboxOverlay) lightboxOverlay.addEventListener('click', closeLightbox);
  
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeLightbox();
  });
}

// ============ SECTION 10: CLIENT REVIEWS ENGINE (fetch/submit reviews) ============
function initReviewsSection() {
  const stars = document.querySelectorAll('.star-btn');
  const ratingInput = document.getElementById('reviewRatingVal');
  const reviewForm = document.getElementById('addReviewForm');

  // Star ratings selector Widget
  if (stars.length && ratingInput) {
    stars.forEach(star => {
      star.addEventListener('click', () => {
        const val = parseInt(star.getAttribute('data-value'));
        ratingInput.value = val;
        
        stars.forEach(s => {
          const sVal = parseInt(s.getAttribute('data-value'));
          if (sVal <= val) {
            s.classList.add('active', 'fas');
            s.classList.remove('far');
            s.setAttribute('aria-checked', 'true');
          } else {
            s.classList.remove('active', 'fas');
            s.classList.add('far');
            s.setAttribute('aria-checked', 'false');
          }
        });
      });

      star.addEventListener('keydown', e => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          star.click();
        }
      });
    });
  }

  function renderCustomReviews() {
    const slider = document.getElementById('testimonialsSlider');
    if (!slider) return;

    // Flush previous reviewer cards to prevent doubles
    slider.querySelectorAll('.testimonial-card.custom-review').forEach(c => c.remove());

    function drawReviews(list) {
      list.forEach(review => {
        const card = document.createElement('div');
        card.className = 'testimonial-card custom-review fade-in visible';

        let starsHtml = '';
        for (let i = 1; i <= 5; i++) {
          starsHtml += i <= review.rating ? '<i class="fas fa-star"></i>' : '<i class="far fa-star"></i>';
        }

        card.innerHTML = `
          <div class="testimonial-content">
            <div class="quote-icon">
              <i class="fas fa-quote-left"></i>
            </div>
            <p class="testimonial-text">"${review.text}"</p>
            <div class="rating">
              ${starsHtml}
            </div>
          </div>
          <div class="testimonial-author">
            <img src="https://via.placeholder.com/80/050510/00d4ff?text=${review.name.charAt(0).toUpperCase()}" alt="${review.name}">
            <div class="author-info">
              <h4>${review.name}</h4>
              <p>${review.role}</p>
            </div>
          </div>
        `;
        slider.appendChild(card);
      });
      // Re-apply hover tilts
      initTilt();
    }

    // Fetch reviews from Firebase Firestore if configured, otherwise fall back to LocalStorage
    if (db) {
      db.collection('reviews')
        .orderBy('date', 'desc')
        .get()
        .then(querySnapshot => {
          const list = [];
          querySnapshot.forEach(doc => {
            list.push(doc.data());
          });
          drawReviews(list);
        })
        .catch(err => {
          console.warn("Firebase query failed, using localStorage fallback:", err);
          const stored = JSON.parse(localStorage.getItem('portfolio_reviews') || '[]');
          drawReviews(stored);
        });
    } else {
      const stored = JSON.parse(localStorage.getItem('portfolio_reviews') || '[]');
      drawReviews(stored);
    }
  }

  if (reviewForm) {
    reviewForm.addEventListener('submit', e => {
      e.preventDefault();

      const nameVal = document.getElementById('reviewName').value.trim();
      const roleVal = document.getElementById('reviewRole').value.trim();
      const textVal = document.getElementById('reviewText').value.trim();
      const ratingVal = parseInt(ratingInput.value) || 5;

      const lang = (typeof i18n !== 'undefined' && i18n.activeLang) ? i18n.activeLang : 'fr';
      const dict = (typeof i18n !== 'undefined' && i18n.translations) ? i18n.translations[lang] : {};

      if (!nameVal || !roleVal || !textVal) {
        showNotification(dict.val_all_fields || "Veuillez remplir tous les champs", 'error');
        return;
      }

      const payload = {
        name: nameVal,
        role: roleVal,
        text: textVal,
        rating: ratingVal,
        date: new Date().toISOString()
      };
      
      const submitBtn = reviewForm.querySelector('.btn-submit-review');
      if (submitBtn) submitBtn.disabled = true;

      // Submit to Firebase Firestore if configured, fallback to LocalStorage
      if (db) {
        db.collection('reviews').add(payload)
          .then(() => {
            renderCustomReviews();
            onSuccess();
          })
          .catch(err => {
            console.warn("Firebase add failed, using localStorage fallback:", err);
            saveToLocalStorageAndSuccess();
          })
          .finally(() => {
            if (submitBtn) submitBtn.disabled = false;
          });
      } else {
        saveToLocalStorageAndSuccess();
      }

      function saveToLocalStorageAndSuccess() {
        const stored = JSON.parse(localStorage.getItem('portfolio_reviews') || '[]');
        stored.push({
          id: Date.now().toString(),
          ...payload
        });
        localStorage.setItem('portfolio_reviews', JSON.stringify(stored));
        renderCustomReviews();
        onSuccess();
        if (submitBtn) submitBtn.disabled = false;
      }

      function onSuccess() {
        reviewForm.reset();
        stars.forEach(s => s.classList.add('active', 'fas'));
        if (ratingInput) ratingInput.value = "5";
        showNotification(dict.review_success || "Merci infiniment pour votre avis !", 'success');
      }
    });
  }

  renderCustomReviews();
}

// ============ SECTION 11: CONTACT FORMSPREE SUBMITTAL ============
function initContactForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;

  form.addEventListener('submit', async e => {
    e.preventDefault();

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const subject = document.getElementById('subject').value.trim();
    const message = document.getElementById('message').value.trim();
    const submitBtn = form.querySelector('button[type="submit"]');

    const lang = (typeof i18n !== 'undefined' && i18n.activeLang) ? i18n.activeLang : 'fr';
    const dict = (typeof i18n !== 'undefined' && i18n.translations) ? i18n.translations[lang] : {
      val_all_fields: 'Veuillez remplir tous les champs',
      val_valid_email: 'Veuillez entrer une adresse email valide',
      msg_sending: 'Envoi en cours...',
      msg_sent_success: 'Message envoyé avec succès ! Je vous répondrai bientôt.',
      msg_sent_error: 'Une erreur est survenue.'
    };

    if (!name || !email || !subject || !message) {
      showNotification(dict.val_all_fields, 'error');
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      showNotification(dict.val_valid_email, 'error');
      return;
    }

    submitBtn.disabled = true;
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = `<i class="fas fa-spinner fa-spin"></i> <span>${dict.msg_sending}</span>`;

    try {
      const response = await fetch(form.action, {
        method: 'POST',
        body: new FormData(form),
        headers: { 'Accept': 'application/json' }
      });

      if (response.ok) {
        showNotification(dict.msg_sent_success, 'success');
        form.reset();
      } else {
        const res = await response.json();
        const errorMsg = res.errors ? res.errors.map(err => err.message).join(', ') : dict.msg_sent_error;
        showNotification(errorMsg, 'error');
      }
    } catch {
      showNotification(dict.msg_sent_error, 'error');
    } finally {
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalText;
    }
  });
}

// ============ SECTION 12: DYNAMIC POPUP NOTIFICATION SYSTEMS ============
function showNotification(msg, type = 'info') {
  const existing = document.querySelector('.notification');
  if (existing) existing.remove();

  const el = document.createElement('div');
  el.className = `notification notification-${type}`;
  el.innerHTML = `
    <div class="notification-content">
      <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
      <span>${msg}</span>
    </div>
  `;

  el.style.cssText = `
    position: fixed;
    top: 100px;
    right: 20px;
    background: ${type === 'success' ? 'linear-gradient(135deg, #0066ff 0%, #00d4ff 100%)' : 'linear-gradient(135deg, #7c3aed 0%, #00d4ff 100%)'};
    color: white;
    padding: 1rem 1.5rem;
    border-radius: 12px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.4);
    z-index: 10000;
    animation: slideInRight 0.3s ease-out;
    max-width: 350px;
    font-family: var(--font-main);
  `;

  document.body.appendChild(el);

  setTimeout(() => {
    el.style.animation = 'slideOutRight 0.3s ease-out';
    setTimeout(() => el.remove(), 300);
  }, 5000);
}

// Global Inject Keyframe Styles for Notification Curtain Sweeps
(function injectKeyframeStyles() {
  const s = document.createElement('style');
  s.textContent = `
    @keyframes slideInRight {
      from { transform: translateX(400px); opacity: 0; }
      to { transform: translateX(0); opacity: 1; }
    }
    @keyframes slideOutRight {
      from { transform: translateX(0); opacity: 1; }
      to { transform: translateX(400px); opacity: 0; }
    }
    .notification-content { display: flex; align-items: center; gap: 1rem; }
    .notification-content i { font-size: 1.4rem; }
  `;
  document.head.appendChild(s);
})();

// ============ SECTION 13: INTERACTION SHORTS (magnetic buttons, clipboard copying, mobile menus) ============
function initInteractions() {
  // Sleek Glassmorphic Theme Switcher Logic
  const themeBtn = document.getElementById('themeSwitcher');
  const themeIcon = themeBtn ? themeBtn.querySelector('i') : null;

  function applyTheme(theme) {
    if (theme === 'light') {
      document.body.classList.add('light-mode');
      if (themeIcon) themeIcon.className = 'fas fa-sun theme-icon';
    } else {
      document.body.classList.remove('light-mode');
      if (themeIcon) themeIcon.className = 'fas fa-moon theme-icon';
    }
  }

  // Load and apply theme on start
  let savedTheme = localStorage.getItem('portfolio_theme');
  if (!savedTheme) {
    const prefersLight = window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches;
    savedTheme = prefersLight ? 'light' : 'dark';
  }
  applyTheme(savedTheme);

  if (themeBtn) {
    themeBtn.addEventListener('click', () => {
      const current = document.body.classList.contains('light-mode') ? 'light' : 'dark';
      const next = current === 'light' ? 'dark' : 'light';
      applyTheme(next);
      localStorage.setItem('portfolio_theme', next);
      
      // Update dynamic custom cursor colors
      const dot = document.getElementById('c-dot');
      const ring = document.getElementById('c-ring');
      if (dot && ring) {
        if (next === 'light') {
          dot.style.background = '#0ea5e9';
          ring.style.borderColor = 'rgba(14, 165, 233, 0.55)';
        } else {
          dot.style.background = '#00d4ff';
          ring.style.borderColor = 'rgba(0, 212, 255, 0.55)';
        }
      }
      
      const lang = (typeof i18n !== 'undefined' && i18n.activeLang) ? i18n.activeLang : 'fr';
      const notificationMsg = next === 'light' 
        ? (lang === 'en' ? 'Light Mode enabled!' : (lang === 'ar' ? 'تم تفعيل الوضع المضيء!' : 'Mode Clair activé !'))
        : (lang === 'en' ? 'Dark Mode enabled!' : (lang === 'ar' ? 'تم تفعيل الوضع الداكن!' : 'Mode Sombre activé !'));
      
      showNotification(notificationMsg, 'success');
    });
  }

  // Mobile menus toggle
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');
  const items = document.querySelectorAll('.nav-link');

  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
      const isActive = navToggle.classList.toggle('active');
      navLinks.classList.toggle('active');
      navToggle.setAttribute('aria-expanded', isActive ? 'true' : 'false');
    });

    navToggle.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        navToggle.click();
      }
    });
  }

  items.forEach(i => {
    i.addEventListener('click', () => {
      if (navToggle) navToggle.classList.remove('active');
      if (navLinks) navLinks.classList.remove('active');
    });
  });

  // Dynamic Year in footer copyright
  const yearEl = document.querySelector('.current-year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Quick clipboard email copies
  document.querySelectorAll('.contact-text p').forEach(p => {
    if (p.textContent.includes('@')) {
      p.style.cursor = 'pointer';
      p.addEventListener('click', () => {
        navigator.clipboard.writeText(p.textContent.trim()).then(() => {
          const lang = (typeof i18n !== 'undefined' && i18n.activeLang) ? i18n.activeLang : 'fr';
          const msg = (typeof i18n !== 'undefined' && i18n.translations) ? i18n.translations[lang].email_copied : 'E-mail copié !';
          showNotification(msg, 'success');
        });
      });
    }
  });

  // Back to Top button
  const topBtn = document.getElementById('backToTop');
  window.addEventListener('scroll', () => {
    if (topBtn) {
      topBtn.classList.toggle('visible', window.scrollY > 600);
    }
  }, { passive: true });

  if (topBtn) {
    topBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // Magnetic button triggers
  document.querySelectorAll('.btn-primary, .btn-secondary, .social-link').forEach(btn => {
    btn.addEventListener('mousemove', e => {
      const r = btn.getBoundingClientRect();
      const x = e.clientX - r.left - r.width / 2;
      const y = e.clientY - r.top - r.height / 2;
      btn.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
    });

    btn.addEventListener('mouseleave', () => {
      btn.style.transform = 'translate(0px, 0px)';
    });
  });

  // Lateral Scroll Progress updates
  window.addEventListener('scroll', () => {
    const scrollH = document.body.scrollHeight - window.innerHeight;
    if (scrollH <= 0) return;
    const pct = (window.scrollY / scrollH) * 100;
    const barEl = document.getElementById('scroll-progress');
    if (barEl) barEl.style.height = pct + '%';
  }, { passive: true });

  // Typewriter reset coordinates on languages updates
  window.addEventListener('languageChanged', e => {
    const words = {
      fr: ['Développeur Full Stack', 'Web Designer', 'Créateur de Solutions', 'Codeur Créatif'],
      en: ['Full Stack Developer', 'Web Designer', 'Solution Architect', 'Creative Coder'],
      ar: ['مطور ويب متكامل', 'مصمم مواقع ويب', 'محلل ومحل مشاكل', 'مبرمج مبدع']
    };
    
    // Smooth reset subtitle texts
    const titleEl = document.querySelector('.typing-text');
    if (titleEl && words[e.detail.lang]) {
      // Dynamic typing animation is handled via simple interval loops
      let idx = 0;
      let charIdx = 0;
      let isDel = false;
      let speed = 100;
      const list = words[e.detail.lang];

      if (window._typeTimeout) clearInterval(window._typeTimeout);

      function typeTick() {
        const word = list[idx];
        if (isDel) {
          titleEl.textContent = word.substring(0, charIdx - 1);
          charIdx--;
          speed = 40;
        } else {
          titleEl.textContent = word.substring(0, charIdx + 1);
          charIdx++;
          speed = 90;
        }

        if (!isDel && charIdx === word.length) {
          isDel = true;
          speed = 2200; // Freeze at completion
        } else if (isDel && charIdx === 0) {
          isDel = false;
          idx = (idx + 1) % list.length;
          speed = 500;
        }

        window._typeTimeout = setTimeout(typeTick, speed);
      }
      typeTick();
    }
  });

  // Trigger language sync instantly to bootstrap typing words
  const saved = localStorage.getItem('portfolio_lang') || 'fr';
  const customEv = new CustomEvent('languageChanged', { detail: { lang: saved } });
  window.dispatchEvent(customEv);
}

