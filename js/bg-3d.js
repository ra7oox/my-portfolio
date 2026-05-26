/**
 * Ra7oox Portfolio - 3D Background Animation & Interactive Robot Drone
 * Premium, High-Performance Procedural 3D Render
 * Built with Three.js
 */

(function () {
  'use strict';

  // Check if WebGL is supported
  function isWebGLSupported() {
    try {
      const canvas = document.createElement('canvas');
      return !!(window.WebGLRenderingContext && (canvas.getContext('webgl') || canvas.getContext('experimental-webgl')));
    } catch (e) {
      return false;
    }
  }

  if (!isWebGLSupported()) {
    console.log('WebGL not supported. Falling back to CSS background.');
    return;
  }

  // Animation configuration
  const CONFIG = {
    particleCount: 110,
    maxDistance: 135, // Max distance to draw connecting filaments
    particleSpeed: 0.25,
    mouseInfluenceRadius: 190,
    mouseGravityStrength: 0.12,
    colors: {
      indigo: { r: 99 / 255, g: 102 / 255, b: 241 / 255 }, // Theme primary #6366f1
      cyan: { r: 0 / 255, g: 217 / 255, b: 255 / 255 },    // Theme accent #00D9FF
      darkBg: { r: 5 / 255, g: 7 / 255, b: 10 / 255 }      // Blend background #05070a
    }
  };

  let container, canvas;
  let scene, camera, renderer;
  let particles = [];
  let pointsGeometry, pointsMaterial, points;
  let linesGeometry, linesMaterial, lines;
  
  // Robot Drone Meshes
  let robotGroup, robotHead, robotNeck, collarOrbit;
  
  // Interaction variables
  let mouse = { x: 0, y: 0, targetX: 0, targetY: 0, active: false };
  let scrollY = 0;
  let targetScrollY = 0;

  function init() {
    container = document.querySelector('.bg-animation');
    canvas = document.getElementById('bg-canvas');

    if (!container || !canvas) return;

    // 1. Scene setup
    scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x05070a, 0.0022);

    // 2. Camera setup
    camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 1000);
    camera.position.z = 400;

    // 3. Renderer setup
    renderer = new THREE.WebGLRenderer({
      canvas: canvas,
      alpha: true,
      antialias: true,
      powerPreference: "high-performance"
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)); // Cap pixel ratio at 2 for mobile performance
    renderer.setSize(window.innerWidth, window.innerHeight);

    // 4. Studio Lighting (essential for chrome metallic textures)
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambientLight);

    // Glowing Neon Cyan point light from the right
    const cyanPointLight = new THREE.PointLight(0x00D9FF, 2.0, 700);
    cyanPointLight.position.set(300, 150, 200);
    scene.add(cyanPointLight);

    // Deep Indigo directional light from the left
    const indigoDirLight = new THREE.DirectionalLight(0x6366f1, 1.8);
    indigoDirLight.position.set(-250, 200, 150);
    scene.add(indigoDirLight);

    // 5. Create particles data
    const positions = new Float32Array(CONFIG.particleCount * 3);
    const colors = new Float32Array(CONFIG.particleCount * 3);

    const areaWidth = 850;
    const areaHeight = 650;
    const areaDepth = 550;

    for (let i = 0; i < CONFIG.particleCount; i++) {
      // Random coordinates inside range
      const x = (Math.random() - 0.5) * areaWidth;
      const y = (Math.random() - 0.5) * areaHeight;
      const z = (Math.random() - 0.5) * areaDepth;

      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;

      // Assign random color between indigo and cyan
      const isCyan = Math.random() > 0.5;
      const color = isCyan ? CONFIG.colors.cyan : CONFIG.colors.indigo;
      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;

      // Keep velocity in memory
      particles.push({
        x: x, y: y, z: z,
        vx: (Math.random() - 0.5) * CONFIG.particleSpeed,
        vy: (Math.random() - 0.5) * CONFIG.particleSpeed,
        vz: (Math.random() - 0.5) * CONFIG.particleSpeed,
        color: color
      });
    }

    // 6. Create Points Mesh
    pointsGeometry = new THREE.BufferGeometry();
    pointsGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    pointsGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    // Custom round particles
    pointsMaterial = new THREE.PointsMaterial({
      size: 5.0,
      vertexColors: true,
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      sizeAttenuation: true
    });

    // Custom circle texture using HTML Canvas to avoid loading external assets
    pointsMaterial.map = createCircleTexture();

    points = new THREE.Points(pointsGeometry, pointsMaterial);
    scene.add(points);

    // 7. Create Lines Mesh (Constellation lines)
    // Max possible lines between points
    const maxLineSegments = CONFIG.particleCount * CONFIG.particleCount;
    const linePositions = new Float32Array(maxLineSegments * 2 * 3); // 2 points per line, 3 coords per point
    const lineColors = new Float32Array(maxLineSegments * 2 * 3);

    linesGeometry = new THREE.BufferGeometry();
    linesGeometry.setAttribute('position', new THREE.BufferAttribute(linePositions, 3));
    linesGeometry.setAttribute('color', new THREE.BufferAttribute(lineColors, 3));

    linesMaterial = new THREE.LineBasicMaterial({
      vertexColors: true,
      transparent: true,
      opacity: 0.38,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });

    lines = new THREE.LineSegments(linesGeometry, linesMaterial);
    scene.add(lines);

    // 8. Construct Procedural 3D Robot Drone
    createRobotDrone();

    // 9. Responsive positioning trigger
    updateRobotPosition();

    // 10. Event listeners
    window.addEventListener('resize', onWindowResize);
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseleave', onMouseLeave);
    window.addEventListener('scroll', onScroll, { passive: true });

    // Initial trigger
    animate();
  }

  // Generate a soft round circle texture programmatically
  function createCircleTexture() {
    const canvas = document.createElement('canvas');
    canvas.width = 16;
    canvas.height = 16;
    const ctx = canvas.getContext('2d');
    const grad = ctx.createRadialGradient(8, 8, 0, 8, 8, 8);
    grad.addColorStop(0, 'rgba(255, 255, 255, 1)');
    grad.addColorStop(0.4, 'rgba(255, 255, 255, 0.8)');
    grad.addColorStop(1, 'rgba(255, 255, 255, 0)');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 16, 16);
    
    const texture = new THREE.CanvasTexture(canvas);
    return texture;
  }

  // Model a beautiful futuristic robot procedural mesh group
  function createRobotDrone() {
    robotGroup = new THREE.Group();

    // Materials - Premium Metallic Chrome & Glowing Visor
    const chromeMaterial = new THREE.MeshStandardMaterial({
      color: 0x21252d,       // Sleek gunmetal base
      metalness: 0.92,       // Highly metallic reflection
      roughness: 0.15,       // Polished reflection sharpness
      envMapIntensity: 1.5
    });

    const darkMetalMaterial = new THREE.MeshStandardMaterial({
      color: 0x0f1218,       // Deep space structural metal
      metalness: 0.8,
      roughness: 0.3
    });

    const glowingVisorMaterial = new THREE.MeshBasicMaterial({
      color: 0x00d9ff         // High-glow Cyber Visor
    });

    const glowingCoreMaterial = new THREE.MeshBasicMaterial({
      color: 0x6366f1         // Indigo glow beads
    });

    // A. Neck component (cylinder pivot)
    robotNeck = new THREE.Mesh(new THREE.CylinderGeometry(7, 11, 20, 16), darkMetalMaterial);
    robotNeck.position.y = -35;
    robotGroup.add(robotNeck);

    // B. Main Head Group (to allow tracking rotations)
    robotHead = new THREE.Group();

    // Robot Head Sphere - elongated for cyberpunk design
    const headSphere = new THREE.Mesh(new THREE.SphereGeometry(30, 32, 32), chromeMaterial);
    headSphere.scale.set(1, 1.05, 0.92);
    robotHead.add(headSphere);

    // C. Glowing Visor (Cylinder rotated horizontally on front face)
    const visor = new THREE.Mesh(new THREE.CylinderGeometry(6, 6, 36, 16), glowingVisorMaterial);
    visor.rotation.z = Math.PI / 2;
    visor.position.set(0, 4, 23);
    visor.scale.set(1, 0.9, 0.9); // Slender wrap visor
    robotHead.add(visor);

    // D. Left Ear & Antenna
    const leftEar = new THREE.Mesh(new THREE.CylinderGeometry(8, 8, 6, 12), darkMetalMaterial);
    leftEar.rotation.z = Math.PI / 2;
    leftEar.position.set(-30, 0, 0);
    robotHead.add(leftEar);

    const leftAntenna = new THREE.Mesh(new THREE.CylinderGeometry(1.2, 0.8, 25, 8), darkMetalMaterial);
    leftAntenna.rotation.z = Math.PI / 5;
    leftAntenna.position.set(-35, 12, 0);
    robotHead.add(leftAntenna);

    const leftTip = new THREE.Mesh(new THREE.SphereGeometry(2.8, 8, 8), glowingVisorMaterial);
    leftTip.position.set(-42, 23, 0);
    robotHead.add(leftTip);

    // E. Right Ear & Antenna (Mirrored)
    const rightEar = new THREE.Mesh(new THREE.CylinderGeometry(8, 8, 6, 12), darkMetalMaterial);
    rightEar.rotation.z = Math.PI / 2;
    rightEar.position.set(30, 0, 0);
    robotHead.add(rightEar);

    const rightAntenna = new THREE.Mesh(new THREE.CylinderGeometry(1.2, 0.8, 25, 8), darkMetalMaterial);
    rightAntenna.rotation.z = -Math.PI / 5;
    rightAntenna.position.set(35, 12, 0);
    robotHead.add(rightAntenna);

    const rightTip = new THREE.Mesh(new THREE.SphereGeometry(2.8, 8, 8), glowingVisorMaterial);
    rightTip.position.set(42, 23, 0);
    robotHead.add(rightTip);

    robotGroup.add(robotHead);

    // F. Cyber Energy Collar Ring (tilted orbiting Torus)
    const collarRing = new THREE.Mesh(new THREE.TorusGeometry(48, 3.0, 10, 48), chromeMaterial);
    collarRing.rotation.x = Math.PI / 2.2;
    collarRing.position.y = -20;
    robotGroup.add(collarRing);

    // G. Rotating core energy beads on a separate orbit group
    collarOrbit = new THREE.Group();
    collarOrbit.rotation.x = Math.PI / 2.2;
    collarOrbit.position.y = -20;
    
    // Add 3 glowing beads evenly spaced around the ring
    for (let k = 0; k < 3; k++) {
      const angle = (k * Math.PI * 2) / 3;
      const bead = new THREE.Mesh(new THREE.SphereGeometry(3.5, 8, 8), glowingCoreMaterial);
      bead.position.set(Math.cos(angle) * 48, Math.sin(angle) * 48, 0);
      collarOrbit.add(bead);
    }
    robotGroup.add(collarOrbit);

    scene.add(robotGroup);
  }

  // Adjust robot scale and coordinate layout based on device viewport
  function updateRobotPosition() {
    if (!robotGroup) return;

    const isMobile = window.innerWidth < 768;

    if (isMobile) {
      // Mobile - Centered behind hero text, scaled down to avoid visual clutter
      robotGroup.position.set(0, -55, -50);
      robotGroup.scale.set(0.68, 0.68, 0.68);
    } else {
      // Desktop - Floating on the right sidebar area matching your hero visuals
      robotGroup.position.set(290, 40, 50);
      robotGroup.scale.set(1.0, 1.0, 1.0);
    }
  }

  function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    updateRobotPosition();
  }

  function onMouseMove(e) {
    mouse.active = true;
    // Map client coordinates to 3D virtual coordinates
    mouse.targetX = ((e.clientX / window.innerWidth) - 0.5) * 850;
    mouse.targetY = -((e.clientY / window.innerHeight) - 0.5) * 650;
  }

  function onMouseLeave() {
    mouse.active = false;
  }

  function onScroll() {
    targetScrollY = window.scrollY;
  }

  function animate() {
    requestAnimationFrame(animate);

    // Smooth easing for mouse interaction
    if (mouse.active) {
      mouse.x += (mouse.targetX - mouse.x) * 0.08;
      mouse.y += (mouse.targetY - mouse.y) * 0.08;
    }

    // Smooth scroll easing
    scrollY += (targetScrollY - scrollY) * 0.05;

    // A. Particles Background Parallax
    scene.rotation.y = scrollY * 0.0005;
    scene.rotation.x = scrollY * 0.0002;
    
    // Slow background scene drift
    const time = Date.now() * 0.001;
    points.rotation.z = time * 0.005;
    lines.rotation.z = time * 0.005;

    // B. Interactive Robot Tracking Physics
    if (robotGroup) {
      // 1. Organic sinusoidal bobbing hovering motion
      robotGroup.position.y += Math.sin(time * 1.5) * 0.22;
      
      // 2. Rotate energy core beads
      collarOrbit.rotation.z += 0.025;

      // 3. Head & neck looking tracking
      if (mouse.active) {
        // Desktop: Watch the mouse cursor dynamically
        const targetRotY = (mouse.x - robotGroup.position.x) * 0.0018;
        const targetRotX = -(mouse.y - robotGroup.position.y) * 0.0015;
        
        // Lerp rotation for absolute smoothness
        robotHead.rotation.y += (targetRotY - robotHead.rotation.y) * 0.06;
        robotHead.rotation.x += (targetRotX - robotHead.rotation.x) * 0.06;

        // Neck twists slightly in same direction
        robotNeck.rotation.y = robotHead.rotation.y * 0.4;
        robotNeck.rotation.x = robotHead.rotation.x * 0.4;
      } else {
        // Mobile / No Mouse: Track look angles dynamically from page scroll depth
        const scrollInfluence = (scrollY * 0.0022);
        const targetRotY = Math.sin(scrollInfluence) * 0.5;
        const targetRotX = Math.cos(scrollInfluence) * 0.22 - 0.12;

        robotHead.rotation.y += (targetRotY - robotHead.rotation.y) * 0.05;
        robotHead.rotation.x += (targetRotX - robotHead.rotation.x) * 0.05;
        
        robotNeck.rotation.y = robotHead.rotation.y * 0.4;
        robotNeck.rotation.x = robotHead.rotation.x * 0.4;
      }
    }

    // C. Particle System Logic
    const positions = pointsGeometry.attributes.position.array;
    const linePositions = linesGeometry.attributes.position.array;
    const lineColors = linesGeometry.attributes.color.array;

    let lineIndex = 0;

    // Update particle positions
    for (let i = 0; i < CONFIG.particleCount; i++) {
      const p = particles[i];

      // Physical particle movement
      p.x += p.vx;
      p.y += p.vy;
      p.z += p.vz;

      // Bounding box limits (bounce)
      const rangeX = 425;
      const rangeY = 325;
      const rangeZ = 275;

      if (p.x < -rangeX || p.x > rangeX) p.vx *= -1;
      if (p.y < -rangeY || p.y > rangeY) p.vy *= -1;
      if (p.z < -rangeZ || p.z > rangeZ) p.vz *= -1;

      // Mouse Gravitational Pull on Particles
      if (mouse.active) {
        const dx = mouse.x - p.x;
        const dy = mouse.y - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < CONFIG.mouseInfluenceRadius) {
          const force = (1.0 - dist / CONFIG.mouseInfluenceRadius) * CONFIG.mouseGravityStrength;
          // Pull smoothly towards mouse
          p.x += (dx / dist) * force * 4.5;
          p.y += (dy / dist) * force * 4.5;
        }
      }

      // Write changes back to Three.js attribute arrays
      positions[i * 3] = p.x;
      positions[i * 3 + 1] = p.y;
      positions[i * 3 + 2] = p.z;
    }

    pointsGeometry.attributes.position.needsUpdate = true;

    // Calculate connections and build lines
    for (let i = 0; i < CONFIG.particleCount; i++) {
      const p1 = particles[i];

      for (let j = i + 1; j < CONFIG.particleCount; j++) {
        const p2 = particles[j];

        const dx = p1.x - p2.x;
        const dy = p1.y - p2.y;
        const dz = p1.z - p2.z;
        const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

        if (dist < CONFIG.maxDistance) {
          // Add line segment vertices
          linePositions[lineIndex] = p1.x;
          linePositions[lineIndex + 1] = p1.y;
          linePositions[lineIndex + 2] = p1.z;

          linePositions[lineIndex + 3] = p2.x;
          linePositions[lineIndex + 4] = p2.y;
          linePositions[lineIndex + 5] = p2.z;

          // Fade line color based on proximity (closer = brighter, further = fades into darkBg)
          const alpha = 1.0 - dist / CONFIG.maxDistance;
          
          // Color vertex 1 (mix particles color with dark background)
          lineColors[lineIndex] = p1.color.r * alpha + CONFIG.colors.darkBg.r * (1 - alpha);
          lineColors[lineIndex + 1] = p1.color.g * alpha + CONFIG.colors.darkBg.g * (1 - alpha);
          lineColors[lineIndex + 2] = p1.color.b * alpha + CONFIG.colors.darkBg.b * (1 - alpha);

          // Color vertex 2
          lineColors[lineIndex + 3] = p2.color.r * alpha + CONFIG.colors.darkBg.r * (1 - alpha);
          lineColors[lineIndex + 4] = p2.color.g * alpha + CONFIG.colors.darkBg.g * (1 - alpha);
          lineColors[lineIndex + 5] = p2.color.b * alpha + CONFIG.colors.darkBg.b * (1 - alpha);

          lineIndex += 6;
        }
      }
    }

    linesGeometry.attributes.position.needsUpdate = true;
    linesGeometry.attributes.color.needsUpdate = true;
    
    // Set actual active drawing elements count
    linesGeometry.setDrawRange(0, lineIndex / 3);

    // Render the active scene
    renderer.render(scene, camera);
  }

  // Initialize once window has finished loading
  window.addEventListener('load', () => {
    // Delay initialization slightly to let main page render smoothly first
    setTimeout(init, 200);
  });
})();
