/**
 * Ra7oox Portfolio - 3D Robot Preloader Model
 * Interactive Three.js Android/Drone designed for high-end loading screens
 */
(function init3DLoader() {
  const canvas = document.getElementById('loader-canvas');
  if (!canvas) return;

  const width = 250;
  const height = 250;

  // Renderer
  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
  renderer.setSize(width, height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  // Scene
  const scene = new THREE.Scene();

  // Camera
  const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
  camera.position.set(0, 0.45, 5.5);

  // Lights
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.25);
  scene.add(ambientLight);

  const keyLight = new THREE.DirectionalLight(0xffffff, 0.85);
  keyLight.position.set(2, 4, 3);
  scene.add(keyLight);

  const neonLight = new THREE.PointLight(0x00d4ff, 3.5, 12);
  neonLight.position.set(0, 0.2, 2.5);
  scene.add(neonLight);

  // Robot Master Group
  const robotGroup = new THREE.Group();
  scene.add(robotGroup);

  // 1. Robot Head (Glowing Metallic Sphere)
  const headGeo = new THREE.SphereGeometry(0.55, 32, 32);
  const headMat = new THREE.MeshStandardMaterial({
    color: 0x1e293b,
    metalness: 0.9,
    roughness: 0.1
  });
  const head = new THREE.Mesh(headGeo, headMat);
  head.position.y = 0.4;
  robotGroup.add(head);

  // 2. Futuristic Digital Neon Visor (Visée/Yeux)
  const visorGeo = new THREE.BoxGeometry(0.75, 0.16, 0.35);
  const visorMat = new THREE.MeshStandardMaterial({
    color: 0x020617,
    emissive: 0x00d4ff,
    emissiveIntensity: 2.5,
    metalness: 0.95,
    roughness: 0.05
  });
  const visor = new THREE.Mesh(visorGeo, visorMat);
  visor.position.set(0, 0.48, 0.4);
  robotGroup.add(visor);

  // 3. Side Antennas with Glowing Nodes
  const antennaGeo = new THREE.CylinderGeometry(0.018, 0.018, 0.35, 8);
  const antennaMat = new THREE.MeshStandardMaterial({ color: 0x475569, metalness: 0.85, roughness: 0.2 });
  
  const leftAntenna = new THREE.Mesh(antennaGeo, antennaMat);
  leftAntenna.position.set(-0.55, 0.65, 0);
  leftAntenna.rotation.z = 0.4;
  robotGroup.add(leftAntenna);

  const rightAntenna = leftAntenna.clone();
  rightAntenna.position.x = 0.55;
  rightAntenna.rotation.z = -0.4;
  robotGroup.add(rightAntenna);

  const beadGeo = new THREE.SphereGeometry(0.045, 8, 8);
  const beadMat = new THREE.MeshBasicMaterial({ color: 0x00d4ff });
  
  const leftBead = new THREE.Mesh(beadGeo, beadMat);
  leftBead.position.y = 0.18;
  leftAntenna.add(leftBead);

  const rightBead = leftBead.clone();
  rightAntenna.add(rightBead);

  // 4. Robot Neck (Chrome Cylinder)
  const neckGeo = new THREE.CylinderGeometry(0.14, 0.18, 0.2, 16);
  const neckMat = new THREE.MeshStandardMaterial({ color: 0x64748b, metalness: 0.95, roughness: 0.05 });
  const neck = new THREE.Mesh(neckGeo, neckMat);
  neck.position.y = 0.08;
  robotGroup.add(neck);

  // 5. Robot Body Chest (Sleek Futuristic Cylinder Capsule)
  const chestGeo = new THREE.CylinderGeometry(0.55, 0.4, 0.8, 32);
  const chest = new THREE.Mesh(chestGeo, headMat);
  chest.position.y = -0.4;
  robotGroup.add(chest);

  // 6. Chest Pulsing Energy Core
  const coreGeo = new THREE.SphereGeometry(0.14, 16, 16);
  const coreMat = new THREE.MeshBasicMaterial({ color: 0x00d4ff, transparent: true, opacity: 0.9 });
  const core = new THREE.Mesh(coreGeo, coreMat);
  core.position.set(0, -0.32, 0.48);
  robotGroup.add(core);

  // 7. Spherical Shoulders and Upper Arms
  const shoulderGeo = new THREE.SphereGeometry(0.12, 16, 16);
  const leftShoulder = new THREE.Mesh(shoulderGeo, neckMat);
  leftShoulder.position.set(-0.68, -0.15, 0);
  robotGroup.add(leftShoulder);

  const rightShoulder = leftShoulder.clone();
  rightShoulder.position.x = 0.68;
  robotGroup.add(rightShoulder);

  const armGeo = new THREE.CylinderGeometry(0.06, 0.06, 0.45, 12);
  const leftArm = new THREE.Mesh(armGeo, headMat);
  leftArm.position.set(-0.78, -0.38, 0);
  leftArm.rotation.z = 0.25;
  robotGroup.add(leftArm);

  const rightArm = leftArm.clone();
  rightArm.position.x = 0.78;
  rightArm.rotation.z = -0.25;
  robotGroup.add(rightArm);

  // 8. Glowing Orbiting Torus Hover Ring
  const ringGeo = new THREE.TorusGeometry(0.9, 0.025, 8, 48);
  const ringMat = new THREE.MeshStandardMaterial({
    color: 0x0ea5e9,
    emissive: 0x00d4ff,
    emissiveIntensity: 0.85,
    transparent: true,
    opacity: 0.6
  });
  const hoverRing = new THREE.Mesh(ringGeo, ringMat);
  hoverRing.rotation.x = Math.PI / 2 + 0.15;
  hoverRing.position.y = -0.85;
  robotGroup.add(hoverRing);

  // 9. Floating Orbiting Micro-bead Nodes on Torus Ring
  const orbitNodes = [];
  for (let n = 0; n < 4; n++) {
    const node = new THREE.Mesh(beadGeo, beadMat);
    const angle = (n / 4) * Math.PI * 2;
    node.position.set(Math.cos(angle) * 0.9, Math.sin(angle) * 0.9, 0);
    hoverRing.add(node);
    orbitNodes.push(node);
  }

  // 10. Floating Particle Star Dust swarm around robot
  const pCount = 50;
  const pGeo = new THREE.BufferGeometry();
  const pPos = new Float32Array(pCount * 3);
  for (let i = 0; i < pCount; i++) {
    const angle = Math.random() * Math.PI * 2;
    const radius = 0.95 + Math.random() * 0.95;
    pPos[i * 3] = Math.cos(angle) * radius;
    pPos[i * 3 + 1] = -0.9 + Math.random() * 1.8;
    pPos[i * 3 + 2] = (Math.random() - 0.5) * 1.5;
  }
  pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3));
  const pMat = new THREE.PointsMaterial({
    color: 0x00d4ff,
    size: 0.045,
    transparent: true,
    opacity: 0.75
  });
  const pSystem = new THREE.Points(pGeo, pMat);
  scene.add(pSystem);

  // Interactive Cursor Parallax
  let mouseX = 0, mouseY = 0;
  let targetX = 0, targetY = 0;
  const screen = document.getElementById('loading-screen');
  if (screen) {
    screen.addEventListener('mousemove', e => {
      mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    });
  }

  // Tick Animation Loop
  const clock = new THREE.Clock();
  function animate() {
    requestAnimationFrame(animate);

    const t = clock.getElapsedTime();

    // 1. Organic Levitating Bobbing & Breathing Effect
    robotGroup.position.y = 0.05 + Math.sin(t * 1.6) * 0.08;
    
    // 2. Slow spin of the hover rings
    hoverRing.rotation.z = t * 0.85;

    // 3. Pulsing Energy Core
    coreMat.opacity = 0.65 + Math.sin(t * 5.0) * 0.35;
    core.scale.setScalar(1.0 + Math.sin(t * 5.0) * 0.12);

    // 4. Parallax head look-at tracking (sleek micro-rotation)
    targetX += (mouseX * 0.35 - targetX) * 0.08;
    targetY += (-mouseY * 0.25 - targetY) * 0.08;

    head.rotation.y = targetX;
    head.rotation.x = targetY;
    visor.rotation.y = targetX;
    visor.rotation.x = targetY;

    // Rotate slight shoulder offsets
    leftShoulder.rotation.y = targetX * 0.4;
    rightShoulder.rotation.y = targetX * 0.4;

    // Rotate slow particle dust
    pSystem.rotation.y = t * 0.08;

    // 5. Dynamic Theme Adaptation: Shift neon glows & particles between neon cyan and sapphire blue
    const isLightMode = document.body.classList.contains('light-mode');
    if (isLightMode) {
      pMat.color.setHex(0x0ea5e9); // Sky/sapphire blue particles for readability
      visorMat.emissive.setHex(0x0ea5e9);
      ringMat.emissive.setHex(0x0ea5e9);
      ringMat.color.setHex(0x0284c7);
      coreMat.color.setHex(0x0ea5e9);
      beadMat.color.setHex(0x0ea5e9);
      neonLight.color.setHex(0x0ea5e9);
    } else {
      pMat.color.setHex(0x00d4ff); // Neon cyan particles for futuristic glow
      visorMat.emissive.setHex(0x00d4ff);
      ringMat.emissive.setHex(0x00d4ff);
      ringMat.color.setHex(0x0ea5e9);
      coreMat.color.setHex(0x00d4ff);
      beadMat.color.setHex(0x00d4ff);
      neonLight.color.setHex(0x00d4ff);
    }

    renderer.render(scene, camera);
  }
  animate();

  // Expose globally for preloader entry zoom effects
  window._loaderRobot = robotGroup;
  window._loaderRenderer = renderer;
  window._loaderCamera = camera;
})();
