// ============ SECTION 2: HIGH-PERFORMANCE INTERACTIVE CANVAS PARTICLES ============
function initHeroScene() {
  const canvas = document.getElementById('hero-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let W = window.innerWidth;
  let H = window.innerHeight;
  
  // Custom interactive cursor position tracking
  let mouse = { x: null, y: null, active: false, radius: 150 };

  // Setup canvas high-DPI scaling for ultra-crisp rendering
  function resizeCanvas() {
    W = window.innerWidth;
    H = window.innerHeight;
    const dpr = Math.min(window.devicePixelRatio, 2);
    canvas.width = W * dpr;
    canvas.height = H * dpr;
    ctx.scale(dpr, dpr);
    
    // Spawn appropriate amount of particles based on screen real-estate to maintain 60 FPS
    initParticles();
  }

  // Particle Blueprint
  class Particle {
    constructor() {
      this.reset(true);
    }

    reset(initial = false) {
      this.x = Math.random() * W;
      this.y = initial ? Math.random() * H : (Math.random() > 0.5 ? -10 : H + 10);
      this.vx = (Math.random() - 0.5) * 0.45; // Slow ambient drift
      this.vy = (Math.random() - 0.5) * 0.45;
      this.radius = 1.0 + Math.random() * 1.8;
      this.baseAlpha = 0.25 + Math.random() * 0.5;
      this.alpha = this.baseAlpha;
      // Assign either accent color 1 or accent color 2 randomly
      this.colorType = Math.random() > 0.4 ? 1 : 2;
    }

    update() {
      // 1. Physical ambient drift
      this.x += this.vx;
      this.y += this.vy;

      // 2. Cursor repulsion physics wave
      if (mouse.active && mouse.x !== null) {
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        
        if (dist < mouse.radius) {
          const force = (mouse.radius - dist) / mouse.radius;
          // Smooth physical push away
          const pushX = (dx / dist) * force * 1.8;
          const pushY = (dy / dist) * force * 1.8;
          this.x -= pushX;
          this.y -= pushY;
          // Brighten up when interacted with
          this.alpha = Math.min(1.0, this.baseAlpha + force * 0.45);
        } else {
          // Slow recovery to base opacity
          this.alpha += (this.baseAlpha - this.alpha) * 0.08;
        }
      } else {
        this.alpha += (this.baseAlpha - this.alpha) * 0.08;
      }

      // 3. Screen bounds reset with fade
      if (this.x < -20 || this.x > W + 20 || this.y < -20 || this.y > H + 20) {
        this.reset();
      }
    }

    draw(colors) {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = this.colorType === 1 ? colors.accent1(this.alpha) : colors.accent2(this.alpha);
      ctx.fill();
    }
  }

  let particles = [];

  function initParticles() {
    // Spatial density: 1 particle per 9500 pixels (capped for high performance)
    const particleCount = Math.min(140, Math.floor((W * H) / 9500));
    particles = [];
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }
  }

  // Dynamic Theme Colors configuration
  function getThemeColors() {
    const isLight = document.body.classList.contains('light-mode');
    if (isLight) {
      return {
        accent1: (a) => `rgba(14, 165, 233, ${a})`, // Sky blue
        accent2: (a) => `rgba(79, 70, 229, ${a})`,  // Indigo
        line: (a) => `rgba(14, 165, 233, ${a * 0.09})`,
        mouseLine: (a) => `rgba(14, 165, 233, ${a * 0.18})`
      };
    } else {
      return {
        accent1: (a) => `rgba(0, 212, 255, ${a})`, // Glowing Cyan
        accent2: (a) => `rgba(0, 102, 255, ${a})`,  // Sapphire Blue
        line: (a) => `rgba(0, 212, 255, ${a * 0.11})`,
        mouseLine: (a) => `rgba(0, 212, 255, ${a * 0.22})`
      };
    }
  }

  // Interactive mouse tracking listeners
  window.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
    mouse.active = true;
  });

  window.addEventListener('mouseleave', () => {
    mouse.active = false;
    mouse.x = null;
    mouse.y = null;
  });

  // Animation Loop
  function loop() {
    ctx.clearRect(0, 0, W, H);
    
    const colors = getThemeColors();
    const len = particles.length;

    // A. Update and draw particles
    for (let i = 0; i < len; i++) {
      particles[i].update();
      particles[i].draw(colors);
    }

    // B. Calculate and draw distance-based connected network lines (O(N^2) but highly optimized)
    ctx.lineWidth = 0.85;
    for (let i = 0; i < len; i++) {
      const p1 = particles[i];
      
      // Connection to mouse cursor
      if (mouse.active && mouse.x !== null) {
        const mdx = mouse.x - p1.x;
        const mdy = mouse.y - p1.y;
        const mdist = Math.sqrt(mdx * mdx + mdy * mdy);
        if (mdist < 140) {
          const mAlpha = 1.0 - mdist / 140;
          ctx.beginPath();
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.strokeStyle = colors.mouseLine(mAlpha);
          ctx.stroke();
        }
      }

      // Mutual particle connections
      for (let j = i + 1; j < len; j++) {
        const p2 = particles[j];
        const dx = p1.x - p2.x;
        const dy = p1.y - p2.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 105) {
          const lAlpha = 1.0 - dist / 105;
          ctx.beginPath();
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(p2.x, p2.y);
          // Blended line opacity based on joint proximity
          ctx.strokeStyle = colors.line(lAlpha * Math.min(p1.alpha, p2.alpha));
          ctx.stroke();
        }
      }
    }

    requestAnimationFrame(loop);
  }

  // Initialize and run
  window.addEventListener('resize', resizeCanvas);
  resizeCanvas();
  loop();
}
