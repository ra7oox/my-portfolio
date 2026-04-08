/**
 * Ra7oox Portfolio - Main JavaScript
 * Modern, Interactive, & Animated
 */

// ============ PRELOADER ============
function hidePreloader() {
  const preloader = document.getElementById('preloader');
  if (preloader && !preloader.classList.contains('hidden')) {
    preloader.classList.add('hidden');
    console.log('Preloader hidden');
  }
}

// Hide on window load
window.addEventListener('load', () => {
  setTimeout(hidePreloader, 1000);
});

// Safety fallback: hide after 5 seconds regardless
setTimeout(hidePreloader, 5000);

// Also try to hide when DOM is interactive
document.onreadystatechange = () => {
  if (document.readyState === 'interactive') {
    setTimeout(hidePreloader, 3000);
  }
};

// ============ CUSTOM CURSOR ============
const cursor = document.querySelector('.cursor-dot');
const cursorOutline = document.querySelector('.cursor-outline');

let mouseX = 0, mouseY = 0;
let outlineX = 0, outlineY = 0;

document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  
  if (cursor) {
    cursor.style.left = mouseX + 'px';
    cursor.style.top = mouseY + 'px';
  }
});

// Smooth cursor outline following
function animateCursorOutline() {
  outlineX += (mouseX - outlineX) * 0.15;
  outlineY += (mouseY - outlineY) * 0.15;
  
  if (cursorOutline) {
    cursorOutline.style.left = outlineX + 'px';
    cursorOutline.style.top = outlineY + 'px';
  }
  
  requestAnimationFrame(animateCursorOutline);
}

animateCursorOutline();

// Cursor effects on hover
const hoverElements = document.querySelectorAll('a, button, .btn, .service-card, .portfolio-item, .filter-btn');
hoverElements.forEach(el => {
  el.addEventListener('mouseenter', () => {
    if (cursor) cursor.style.transform = 'translate(-50%, -50%) scale(1.5)';
    if (cursorOutline) cursorOutline.style.transform = 'translate(-50%, -50%) scale(1.5)';
  });
  
  el.addEventListener('mouseleave', () => {
    if (cursor) cursor.style.transform = 'translate(-50%, -50%) scale(1)';
    if (cursorOutline) cursorOutline.style.transform = 'translate(-50%, -50%) scale(1)';
  });
});

// ============ SCROLL PROGRESS ============
const scrollProgress = document.getElementById('scrollProgress');

window.addEventListener('scroll', () => {
  const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  const scrolled = (window.scrollY / windowHeight) * 100;
  if (scrollProgress) {
    scrollProgress.style.width = scrolled + '%';
  }
});

// ============ NAVIGATION ============
const navbar = document.getElementById('navbar');
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');
const navLinkItems = document.querySelectorAll('.nav-link');

// Navbar scroll effect
let lastScroll = 0;
window.addEventListener('scroll', () => {
  const currentScroll = window.scrollY;
  
  if (currentScroll > 100) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
  
  lastScroll = currentScroll;
});

// Mobile menu toggle
if (navToggle) {
  navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('active');
    navLinks.classList.toggle('active');
  });
}

// Close mobile menu on link click
navLinkItems.forEach(link => {
  link.addEventListener('click', () => {
    navToggle.classList.remove('active');
    navLinks.classList.remove('active');
  });
});

// Active nav link on scroll
const sections = document.querySelectorAll('section[id]');

window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;
  
  sections.forEach(section => {
    const sectionHeight = section.offsetHeight;
    const sectionTop = section.offsetTop - 200;
    const sectionId = section.getAttribute('id');
    
    if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
      document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${sectionId}`) {
          link.classList.add('active');
        }
      });
    }
  });
});

// ============ TYPING EFFECT ============
const typingText = document.querySelector('.typing-text');
if (typingText) {
  const words = ['Full Stack Developer', 'Web Designer', 'Problem Solver', 'Creative Coder'];
  let wordIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingSpeed = 150;

  function type() {
    const currentWord = words[wordIndex];
    
    if (isDeleting) {
      typingText.textContent = currentWord.substring(0, charIndex - 1);
      charIndex--;
      typingSpeed = 30; // Faster deletion
    } else {
      typingText.textContent = currentWord.substring(0, charIndex + 1);
      charIndex++;
      typingSpeed = 80; // Faster typing
    }
    
    if (!isDeleting && charIndex === currentWord.length) {
      isDeleting = true;
      typingSpeed = 2000; // Pause at end
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      wordIndex = (wordIndex + 1) % words.length;
      typingSpeed = 500; // Pause before next word
    }
    
    setTimeout(type, typingSpeed);
  }
  
  // Start typing effect after delay
  setTimeout(type, 1000);
}

// ============ SCROLL ANIMATIONS ============
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      
      // Trigger skill progress animation
      if (entry.target.classList.contains('skill-category')) {
        const progressBars = entry.target.querySelectorAll('.skill-progress');
        progressBars.forEach(bar => {
          const progress = bar.getAttribute('data-progress');
          setTimeout(() => {
            bar.style.width = progress + '%';
            bar.classList.add('loaded');
          }, 300);
        });
      }
    }
  });
}, observerOptions);

// Observe all fade-in elements
document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

// ============ SMOOTH SCROLL ============
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    
    // Skip if href is just "#"
    if (href === '#') {
      e.preventDefault();
      return;
    }
    
    const target = document.querySelector(href);
    if (target) {
      e.preventDefault();
      const offsetTop = target.offsetTop - 80;
      
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
    }
  });
});

// ============ PORTFOLIO FILTER ============
const filterButtons = document.querySelectorAll('.filter-btn');
const portfolioItems = document.querySelectorAll('.portfolio-item');

filterButtons.forEach(button => {
  button.addEventListener('click', () => {
    // Remove active class from all buttons
    filterButtons.forEach(btn => btn.classList.remove('active'));
    // Add active class to clicked button
    button.classList.add('active');
    
    const filter = button.getAttribute('data-filter');
    
    portfolioItems.forEach(item => {
      const category = item.getAttribute('data-category');
      
      if (filter === 'all' || category === filter) {
        item.classList.remove('hide');
        setTimeout(() => {
          item.style.display = 'block';
        }, 10);
      } else {
        item.classList.add('hide');
        setTimeout(() => {
          item.style.display = 'none';
        }, 300);
      }
    });
  });
});

// ============ BACK TO TOP BUTTON ============
const backToTopButton = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
  if (window.scrollY > 500) {
    backToTopButton.classList.add('visible');
  } else {
    backToTopButton.classList.remove('visible');
  }
});

if (backToTopButton) {
  backToTopButton.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

// ============ FORM VALIDATION & SUBMISSION ============
const contactForm = document.getElementById('contactForm');

if (contactForm) {
  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const subject = document.getElementById('subject').value.trim();
    const message = document.getElementById('message').value.trim();
    const submitButton = contactForm.querySelector('button[type="submit"]');
    
    // Basic validation
    if (!name || !email || !subject || !message) {
      showNotification('Veuillez remplir tous les champs', 'error');
      return;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      showNotification('Veuillez entrer une adresse email valide', 'error');
      return;
    }
    
    // Disable submit button and show loading state
    submitButton.disabled = true;
    const originalButtonText = submitButton.innerHTML;
    submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> <span>Envoi en cours...</span>';
    
    try {
      // Prepare form data
      const formData = new FormData(contactForm);
      
      // Send data to Formspree
      const response = await fetch(contactForm.action, {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      });
      
      const result = await response.json();
      
      if (response.ok) {
        showNotification('Message envoyé avec succès ! Je vous répondrai bientôt.', 'success');
        contactForm.reset();
      } else {
        const errorMsg = result.errors ? result.errors.map(error => error.message).join(', ') : 'Une erreur est survenue.';
        showNotification(errorMsg, 'error');
      }
      
    } catch (error) {
      console.error('Error:', error);
      showNotification('Erreur lors de l\'envoi. Veuillez vérifier votre connexion.', 'error');
    } finally {
      // Re-enable submit button
      submitButton.disabled = false;
      submitButton.innerHTML = originalButtonText;
    }
  });
}

// ============ NOTIFICATION SYSTEM ============
function showNotification(message, type = 'info') {
  // Remove existing notifications
  const existingNotification = document.querySelector('.notification');
  if (existingNotification) {
    existingNotification.remove();
  }
  
  // Create notification element
  const notification = document.createElement('div');
  notification.className = `notification notification-${type}`;
  notification.innerHTML = `
    <div class="notification-content">
      <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
      <span>${message}</span>
    </div>
  `;
  
  // Add styles
  notification.style.cssText = `
    position: fixed;
    top: 100px;
    right: 20px;
    background: ${type === 'success' ? 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)' : 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)'};
    color: white;
    padding: 1rem 1.5rem;
    border-radius: 12px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
    z-index: 10000;
    animation: slideInRight 0.3s ease-out;
    max-width: 350px;
  `;
  
  document.body.appendChild(notification);
  
  // Remove notification after 5 seconds
  setTimeout(() => {
    notification.style.animation = 'slideOutRight 0.3s ease-out';
    setTimeout(() => notification.remove(), 300);
  }, 5000);
}

// Add notification animations
const style = document.createElement('style');
style.textContent = `
  @keyframes slideInRight {
    from {
      transform: translateX(400px);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }
  
  @keyframes slideOutRight {
    from {
      transform: translateX(0);
      opacity: 1;
    }
    to {
      transform: translateX(400px);
      opacity: 0;
    }
  }
  
  .notification-content {
    display: flex;
    align-items: center;
    gap: 1rem;
  }
  
  .notification-content i {
    font-size: 1.5rem;
  }
`;
document.head.appendChild(style);

// ============ PARALLAX EFFECT ============
window.addEventListener('scroll', () => {
  const scrolled = window.scrollY;
  
  // Parallax for hero section
  const heroText = document.querySelector('.hero-text');
  const heroVisual = document.querySelector('.hero-visual');
  
  if (heroText && heroVisual) {
    heroText.style.transform = `translateY(${scrolled * 0.1}px)`;
    heroVisual.style.transform = `translateY(${scrolled * 0.15}px)`;
  }
});

// ============ COUNTER ANIMATION ============
function animateCounters() {
  const counters = document.querySelectorAll('.stat-number');
  
  counters.forEach(counter => {
    const target = parseInt(counter.textContent);
    const duration = 2000; // 2 seconds
    const increment = target / (duration / 16); // 60 FPS
    const hasPlus = counter.textContent.includes('+');
    
    const updateCounter = () => {
      current += increment;
      if (current < target) {
        counter.textContent = Math.floor(current) + (hasPlus ? '+' : '');
        requestAnimationFrame(updateCounter);
      } else {
        counter.textContent = target + (hasPlus ? '+' : '');
      }
    };
    
    // Start animation when element is in view
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && current === 0) {
          updateCounter();
        }
      });
    }, { threshold: 0.5 });
    
    observer.observe(counter);
  });
}

// Initialize counter animation
animateCounters();

// ============ TEXT REVEAL ANIMATION ============
function revealText() {
  const textElements = document.querySelectorAll('.hero-title, .section-title');
  
  textElements.forEach(element => {
    const text = element.textContent;
    element.innerHTML = '';
    
    text.split('').forEach((char, index) => {
      const span = document.createElement('span');
      span.textContent = char;
      span.style.opacity = '0';
      span.style.animation = `fadeInChar 0.5s ease-out ${index * 0.03}s forwards`;
      element.appendChild(span);
    });
  });
}

// Add fadeInChar animation
const charStyle = document.createElement('style');
charStyle.textContent = `
  @keyframes fadeInChar {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;
document.head.appendChild(charStyle);

// Initialize text reveal
// revealText(); // Commented out to avoid complexity, uncomment if desired

// ============ IMAGE LAZY LOADING ============
const images = document.querySelectorAll('img[data-src]');

const imageObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const img = entry.target;
      img.src = img.getAttribute('data-src');
      img.removeAttribute('data-src');
      imageObserver.unobserve(img);
    }
  });
});

images.forEach(img => imageObserver.observe(img));

// ============ TILT EFFECT FOR CARDS ============
const cards = document.querySelectorAll('.service-card, .portfolio-item, .testimonial-card');

cards.forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = (y - centerY) / 20;
    const rotateY = (centerX - x) / 20;
    
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
  });
  
  card.addEventListener('mouseleave', () => {
    card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
  });
});

// ============ DYNAMIC YEAR ============
const yearElements = document.querySelectorAll('.current-year');
const currentYear = new Date().getFullYear();
yearElements.forEach(el => el.textContent = currentYear);

// ============ COPY EMAIL FUNCTIONALITY ============
const emailElements = document.querySelectorAll('.contact-text p');
emailElements.forEach(el => {
  if (el.textContent.includes('@')) {
    el.style.cursor = 'pointer';
    el.addEventListener('click', () => {
      navigator.clipboard.writeText(el.textContent).then(() => {
        showNotification('Email copied to clipboard!', 'success');
      });
    });
  }
});

// ============ KEYBOARD NAVIGATION ============
document.addEventListener('keydown', (e) => {
  // Escape key to close mobile menu
  if (e.key === 'Escape') {
    navToggle.classList.remove('active');
    navLinks.classList.remove('active');
  }
  
  // Ctrl/Cmd + K for quick navigation (optional)
  if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
    e.preventDefault();
    // You can add a quick navigation menu here
  }
});

// ============ PERFORMANCE OPTIMIZATION ============
// Debounce function for scroll events
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Apply debounce to scroll events
const debouncedScroll = debounce(() => {
  // Add any additional scroll logic here
}, 10);

window.addEventListener('scroll', debouncedScroll);

// ============ CONSOLE MESSAGE ============
console.log(
  '%c👋 Hello Developer!',
  'font-size: 20px; font-weight: bold; color: #00D9FF;'
);
console.log(
  '%cWelcome to my portfolio. If you\'re interested in collaboration or have any questions, feel free to reach out!',
  'font-size: 14px; color: #9BA4B5;'
);
console.log(
  '%c📧 Email: soufianearrahou7@gmail.com',
  'font-size: 14px; color: #00D9FF;'
);

// ============ INITIALIZE ON DOM LOAD ============
document.addEventListener('DOMContentLoaded', () => {
  console.log('Portfolio initialized successfully! 🚀');
  
  // Add loaded class to body
  document.body.classList.add('loaded');
  
  // Initialize AOS or other libraries if needed
  // Example: AOS.init({ duration: 1000 });
});

// ============ SERVICE WORKER (Optional for PWA) ============
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    // Uncomment to register service worker
    // navigator.serviceWorker.register('/sw.js')
    //   .then(reg => console.log('Service Worker registered'))
    //   .catch(err => console.log('Service Worker registration failed'));
  });
}

// ============ MAGNETIC BUTTONS ============
const magneticButtons = document.querySelectorAll('.btn-primary, .btn-secondary, .social-link');
magneticButtons.forEach(btn => {
  btn.addEventListener('mousemove', (e) => {
    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    
    btn.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
  });
  
  btn.addEventListener('mouseleave', () => {
    btn.style.transform = 'translate(0, 0)';
  });
});

// ============ INTERACTIVE CARD TILT & GLOW ============
const interactiveCards = document.querySelectorAll('.service-card, .portfolio-item, .process-item, .info-card');
interactiveCards.forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Update CSS variables for dynamic glow
    card.style.setProperty('--mouse-x', `${x}px`);
    card.style.setProperty('--mouse-y', `${y}px`);
    
    // Subtle Tilt
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = (y - centerY) / 20;
    const rotateY = (centerX - x) / 20;
    
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-5px)`;
  });
  
  card.addEventListener('mouseleave', () => {
    card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0)';
  });
});

// ============ PROJECT SLIDER LOGIC ============
function initProjectSliders() {
  const sliders = document.querySelectorAll('.project-slider');
  
  sliders.forEach(slider => {
    const wrapper = slider.querySelector('.slider-wrapper');
    const slides = slider.querySelectorAll('.slide');
    const prevBtn = slider.querySelector('.prev');
    const nextBtn = slider.querySelector('.next');
    const pagination = slider.querySelector('.slider-pagination');
    
    let currentIndex = 0;
    const totalSlides = slides.length;
    
    // Store currentIndex on the slider element for global zoom access
    slider.dataset.currentIndex = currentIndex;
    
    // Create dots
    slides.forEach((_, index) => {
      const dot = document.createElement('div');
      dot.classList.add('dot');
      if (index === 0) dot.classList.add('active');
      dot.addEventListener('click', () => goToSlide(index));
      pagination.appendChild(dot);
    });
    
    const dots = pagination.querySelectorAll('.dot');
    
    function updateSlider() {
      wrapper.style.transform = `translateX(-${currentIndex * 100}%)`;
      slider.dataset.currentIndex = currentIndex; // Update stored index
      // Update dots
      dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === currentIndex);
      });
    }
    
    function goToSlide(index) {
      currentIndex = index;
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
    
    if (nextBtn) nextBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      nextSlide();
    });
    
    if (prevBtn) prevBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      prevSlide();
    });
    
    // Auto slide
    let interval = setInterval(nextSlide, 5000);
    
    slider.addEventListener('mouseenter', () => clearInterval(interval));
    slider.addEventListener('mouseleave', () => {
      interval = setInterval(nextSlide, 5000);
    });
    
    // Touch support
    let touchStartX = 0;
    let touchEndX = 0;
    
    slider.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });
    
    slider.addEventListener('touchend', (e) => {
      touchEndX = e.changedTouches[0].screenX;
      handleSwipe();
    }, { passive: true });
    
    function handleSwipe() {
      if (touchEndX < touchStartX - 50) nextSlide();
      if (touchEndX > touchStartX + 50) prevSlide();
    }
  });
}

// ============ LIGHTBOX LOGIC ============
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const lightboxCaption = document.getElementById('lightbox-caption');
const lightboxClose = document.querySelector('.lightbox-close');
const lightboxOverlay = document.querySelector('.lightbox-overlay');

function openLightbox(src, caption) {
  if (!lightbox) return;
  lightboxImg.src = src;
  lightboxCaption.textContent = caption;
  lightbox.classList.add('active');
  document.body.style.overflow = 'hidden'; // Stop scrolling
}

function closeLightbox() {
  if (!lightbox) return;
  lightbox.classList.remove('active');
  document.body.style.overflow = ''; // Resume scrolling
}

function initLightboxActions() {
  const zoomBtns = document.querySelectorAll('.zoom-btn');
  
  zoomBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      
      const portfolioItem = btn.closest('.portfolio-item');
      const projectTitle = portfolioItem.querySelector('h3').textContent;
      const slider = portfolioItem.querySelector('.project-slider');
      
      let imgSrc = "";
      let caption = projectTitle;
      
      if (slider) {
        // Slider project: get the image from the currently active slide
        const currentIndex = parseInt(slider.dataset.currentIndex) || 0;
        const slides = slider.querySelectorAll('.slide img');
        imgSrc = slides[currentIndex].src;
        caption += ` - Aperçu ${currentIndex + 1}`;
      } else {
        // Regular project: get the main image
        const img = portfolioItem.querySelector('.portfolio-image img');
        imgSrc = img.src;
      }
      
      openLightbox(imgSrc, caption);
    });
  });
}

if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
if (lightboxOverlay) lightboxOverlay.addEventListener('click', closeLightbox);

// Close on Escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeLightbox();
});

// Initialize on DOM load
document.addEventListener('DOMContentLoaded', () => {
  initProjectSliders();
  initLightboxActions();
});

// ============ REVEAL ANIMATIONS ON SCROLL ============
const revealOnScroll = () => {
  const elements = document.querySelectorAll('.fade-in');
  elements.forEach(el => {
    const elementTop = el.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;
    if (elementTop < windowHeight * 0.85) {
      el.classList.add('visible');
    }
  });
};

window.addEventListener('scroll', revealOnScroll);
window.addEventListener('load', revealOnScroll);