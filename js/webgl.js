// ============ SECTION 2: THREE.JS HERO CANVAS SCENE ============
function initHeroScene() {
  const canvas = document.getElementById('hero-canvas');
  if (!canvas) return;

  const W = window.innerWidth;
  const H = window.innerHeight;
  const isMobile = W < 768;

  /* â”€â”€ Renderer â”€â”€ */
  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(W, H);

  /* â”€â”€ Scene + Camera â”€â”€ */
  const scene = new THREE.Scene();
  const centerGroup = new THREE.Group();
  scene.add(centerGroup);

  const camera = new THREE.PerspectiveCamera(55, W / H, 0.1, 100);
  camera.position.set(0, 1.5, 16); // Initial far Z, GSAP will sweep in to Z=7
  window._heroCamera = camera;      // Bind globally for GSAP sweep animation

  /* â”€â”€ Lights â”€â”€ */
  scene.add(new THREE.AmbientLight(0xffffff, 0.05));
  
  const cyanLight = new THREE.PointLight(0x00d4ff, 5, 18);
  cyanLight.position.set(3, 4, 3);
  scene.add(cyanLight);
  
  const blueLight = new THREE.PointLight(0x4400ff, 2.5, 12);
  blueLight.position.set(-3, -1, -3);
  scene.add(blueLight);
  
  const rectLight = new THREE.PointLight(0x00d4ff, 3, 10);
  rectLight.position.set(0, 0, 4);
  scene.add(rectLight);

  /* â”€â”€ Extruded bracket </> central logo â”€â”€ */
  const logoGroup = new THREE.Group();

  function makeBracket(points, flip) {
    const shape = new THREE.Shape();
    shape.moveTo(points[0].x, points[0].y);
    points.slice(1).forEach(p => shape.lineTo(p.x, p.y));
    
    // Smooth bevel extrude for metal light reflections
    const geo = new THREE.ExtrudeGeometry(shape, {
      depth: 0.18,
      bevelEnabled: true,
      bevelSize: 0.015,
      bevelThickness: 0.015
    });
    geo.center();
    
    const mat = new THREE.MeshPhongMaterial({
      color: 0x00d4ff,
      emissive: 0x003355,
      emissiveIntensity: 0.4,
      shininess: 150,
      specular: 0x00aaff
    });
    
    const mesh = new THREE.Mesh(geo, mat);
    if (flip) mesh.scale.x = -1;
    return mesh;
  }

  // "<" Bracket Mesh
  const leftBracket = makeBracket([
    { x: -0.5, y: 0 }, { x: 0.1, y: 0.7 }, { x: 0.2, y: 0.6 },
    { x: -0.2, y: 0 }, { x: 0.2, y: -0.6 }, { x: 0.1, y: -0.7 }
  ], false);
  leftBracket.position.x = -1.1;

  // "/" Slash Mesh
  const slashShape = new THREE.Shape();
  slashShape.moveTo(-0.06, -0.75);
  slashShape.lineTo(0.06, -0.75);
  slashShape.lineTo(0.06, 0.75);
  slashShape.lineTo(-0.06, 0.75);
  slashShape.closePath();
  
  const slashGeo = new THREE.ExtrudeGeometry(slashShape, {
    depth: 0.18,
    bevelEnabled: true,
    bevelSize: 0.01
  });
  slashGeo.center();
  
  const slash = new THREE.Mesh(slashGeo, leftBracket.material.clone());
  slash.rotation.z = 0.3;

  // ">" Bracket Mesh
  const rightBracket = makeBracket([
    { x: -0.5, y: 0 }, { x: 0.1, y: 0.7 }, { x: 0.2, y: 0.6 },
    { x: -0.2, y: 0 }, { x: 0.2, y: -0.6 }, { x: 0.1, y: -0.7 }
  ], true);
  rightBracket.position.x = 1.1;

  logoGroup.add(leftBracket, slash, rightBracket);
  centerGroup.add(logoGroup);

  // Orbiting sphere satellites
  const satellites = [];
  for (let i = 0; i < 8; i++) {
    const geo = new THREE.SphereGeometry(0.04, 8, 8);
    const mat = new THREE.MeshBasicMaterial({ color: 0x00d4ff });
    const s = new THREE.Mesh(geo, mat);
    satellites.push({
      mesh: s,
      angle: (i / 8) * Math.PI * 2,
      speed: 0.008 + i * 0.001
    });
    centerGroup.add(s);
  }

  // Set initial coordinates on centerGroup based on viewport size (center on mobile, right on desktop)
  centerGroup.position.x = isMobile ? 0 : 1.8;
  const targetScale = isMobile ? 0.7 : 1.0;

  // Animate extruded centerGroup scale reveal
  centerGroup.scale.set(0, 0, 0);
  gsap.to(centerGroup.scale, {
    x: targetScale * 1.1, y: targetScale * 1.1, z: targetScale * 1.1, duration: 1.0, ease: 'back.out(1.7)',
    onComplete: () => gsap.to(centerGroup.scale, { x: targetScale, y: targetScale, z: targetScale, duration: 0.3 })
  });

  /* â”€â”€ 3D Star Constellation Particles â”€â”€ */
  const COUNT = isMobile ? 800 : 3500;
  const positions = new Float32Array(COUNT * 3);
  const colors = new Float32Array(COUNT * 3);
  const phases = new Float32Array(COUNT);

  for (let i = 0; i < COUNT; i++) {
    // Distribute randomly inside a radial sphere shell
    const r = 3 + Math.random() * 5;
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(2 * Math.random() - 1);
    
    positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
    positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
    positions[i * 3 + 2] = r * Math.cos(phi);
    
    phases[i] = Math.random() * Math.PI * 2;
    
    // Blend 70% White / 30% Cyan
    if (Math.random() > 0.3) {
      colors[i * 3] = 1; colors[i * 3 + 1] = 1; colors[i * 3 + 2] = 1;
    } else {
      colors[i * 3] = 0; colors[i * 3 + 1] = 0.83; colors[i * 3 + 2] = 1;
    }
  }

  const pGeo = new THREE.BufferGeometry();
  pGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  pGeo.setAttribute('color', new THREE.BufferAttribute(colors, 3));
  
  const pMat = new THREE.PointsMaterial({
    size: 0.022,
    vertexColors: true,
    transparent: true,
    opacity: 0.75
  });
  
  const particles = new THREE.Points(pGeo, pMat);
  scene.add(particles);

  /* â”€â”€ Neon Torus Rings â”€â”€ */
  const rings = [];
  [
    { r: 2.0, tube: 0.006, rx: 0.0, speedY: 0.009, speedX: 0.000 },
    { r: 2.6, tube: 0.005, rx: 0.5, speedY: -0.006, speedX: 0.004 },
    { r: 3.3, tube: 0.004, rx: 1.0, speedY: 0.004, speedX: 0.000 }
  ].forEach(cfg => {
    const geo = new THREE.TorusGeometry(cfg.r, cfg.tube, 8, 100);
    const mat = new THREE.MeshBasicMaterial({ color: 0x00d4ff, transparent: true, opacity: 0.3 });
    const ring = new THREE.Mesh(geo, mat);
    ring.rotation.x = cfg.rx;
    ring.userData = { speedY: cfg.speedY, speedX: cfg.speedX };
    centerGroup.add(ring);
    rings.push(ring);

    // Place 6 glow bead nodes evenly around each torus ring
    for (let n = 0; n < 6; n++) {
      const angle = (n / 6) * Math.PI * 2;
      const node = new THREE.Mesh(
        new THREE.SphereGeometry(0.045, 8, 8),
        new THREE.MeshBasicMaterial({ color: 0x00d4ff })
      );
      node.position.set(Math.cos(angle) * cfg.r, Math.sin(angle) * cfg.r, 0);
      ring.add(node);
    }
  });

  // Stagger scaling reveal of torus rings
  rings.forEach((ring, i) => {
    ring.scale.set(0, 0, 0);
    gsap.to(ring.scale, {
      x: 1, y: 1, z: 1, duration: 0.7, ease: 'back.out(1.4)',
      delay: 0.3 + i * 0.15
    });
  });

  /* â”€â”€ Falling Code Streams (Offscreen Canvas Textures) â”€â”€ */
  const chars = '{}()=>[]//;constletasyncfunctionreturnimportexport01';
  const streams = [];
  const streamCount = isMobile ? 5 : 10;
  
  for (let s = 0; s < streamCount; s++) {
    const cvs = document.createElement('canvas');
    cvs.width = 64;
    cvs.height = 512;
    const ctx2 = cvs.getContext('2d');
    const tex = new THREE.CanvasTexture(cvs);
    
    const geo = new THREE.PlaneGeometry(0.6, 4.8);
    const mat = new THREE.MeshBasicMaterial({
      map: tex,
      transparent: true,
      opacity: 0.2,
      depthWrite: false,
      side: THREE.DoubleSide
    });
    
    const plane = new THREE.Mesh(geo, mat);
    const angle = (s / streamCount) * Math.PI * 1.6 - Math.PI * 0.8;
    
    // Cylindrical placement in space
    plane.position.set(
      Math.sin(angle) * 4.5,
      0,
      Math.cos(angle) * 4.5 - 3
    );
    plane.rotation.y = -angle;
    
    scene.add(plane);
    streams.push({
      mesh: plane,
      ctx: ctx2,
      tex,
      offset: Math.random() * 512,
      speed: 0.8 + Math.random()
    });
  }

  function drawStream(stream) {
    const { ctx, tex } = stream;
    ctx.clearRect(0, 0, 64, 512);
    ctx.font = '10px monospace';
    
    for (let row = 0; row < 25; row++) {
      const y = ((row * 20 + stream.offset) % 512);
      const alpha = 1 - y / 512;
      ctx.fillStyle = `rgba(0, 212, 255, ${alpha * 0.9})`;
      
      const char = chars[Math.floor(Math.random() * chars.length)];
      ctx.fillText(char, 8 + Math.random() * 40, y);
    }
    tex.needsUpdate = true;
  }

  /* â”€â”€ fog â”€â”€ */
  scene.fog = new THREE.FogExp2(0x000000, 0.055);

  /* â”€â”€ Interactive Coordinate Parallax â”€â”€ */
  let mouseX = 0, mouseY = 0, targetX = 0, targetY = 0;
  document.addEventListener('mousemove', e => {
    mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
    mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
  });



  /* â”€â”€ Animation Tick loop â”€â”€ */
  const clock = new THREE.Clock();
  let frame = 0;

  function animate() {
    requestAnimationFrame(animate);

    // Track page scroll coordinates for parallax reactivity
    const scrollY = window.scrollY || window.pageYOffset;
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPct = maxScroll > 0 ? scrollY / maxScroll : 0;

    // Dynamic background, fog, and particle colors based on light/dark mode
    const isLightMode = document.body.classList.contains('light-mode');
    if (scene.fog) {
      scene.fog.color.setHex(isLightMode ? 0xf8fafc : 0x000000);
    }
    if (pMat) {
      pMat.color.setHex(isLightMode ? 0x0f172a : 0xffffff);
    }

    const t = clock.getElapsedTime();
    frame++;

    // Hover bobbing and organic rotations on the center composite group
    centerGroup.rotation.y += 0.003;
    centerGroup.rotation.x += 0.0005;

    // Slide the composite centerGroup upwards matching page scroll speed
    const isMobileViewport = window.innerWidth < 768;
    const logoScrollOffset = scrollY * 0.015;
    centerGroup.position.y = (isMobileViewport ? -0.6 : 0) + Math.sin(t * 0.8) * 0.12 - logoScrollOffset;

    // Orbiting satellites updates
    satellites.forEach(s => {
      s.angle += s.speed;
      s.mesh.position.set(
        Math.cos(s.angle) * 1.9,
        Math.sin(s.angle * 0.7) * 0.4,
        Math.sin(s.angle) * 1.9
      );
      s.mesh.material.opacity = 0.5 + Math.sin(t + s.angle) * 0.5;
    });

    // Space star particles rotation & beautiful responsive scroll swirl!
    particles.rotation.y += 0.0003;
    particles.rotation.x += 0.0001;
    particles.rotation.z = scrollPct * 0.85; // dynamically swirl starfield on scroll/swipe!
    pMat.opacity = 0.6 + Math.sin(t * 0.5) * 0.15;

    // Torus rings rotations
    rings.forEach(ring => {
      ring.rotation.y += ring.userData.speedY;
      ring.rotation.x += ring.userData.speedX;
    });

    // Code Matrix Rain updates (Throttle rendering to every 3 frames for high-performance)
    if (frame % 3 === 0) {
      streams.forEach(s => {
        s.offset = (s.offset + s.speed) % 512;
        drawStream(s);
      });
    }

    // Glowing PointLight pulses
    cyanLight.intensity = 4 + Math.sin(t * 1.2) * 1.5;

    // Camera mouse coordinate parallax & scroll vertical shifts
    targetX += (mouseX * 0.6 - targetX) * 0.025;
    targetY += (-mouseY * 0.4 - targetY) * 0.025;
    camera.position.x = targetX;
    camera.position.y = targetY + 1.5 - scrollPct * 1.5;
    camera.lookAt(0, 0, 0);

    renderer.render(scene, camera);
  }
  animate();

  /* â”€â”€ Responsive adjustments â”€â”€ */
  window.addEventListener('resize', () => {
    const w = window.innerWidth;
    const h = window.innerHeight;
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    renderer.setSize(w, h);

    // Dynamic repositioning and scaling on resize for composite centerGroup
    const isMobileViewport = w < 768;
    centerGroup.position.x = isMobileViewport ? 0 : 1.8;
    const currentScale = isMobileViewport ? 0.7 : 1.0;
    centerGroup.scale.set(currentScale, currentScale, currentScale);
  });
}

