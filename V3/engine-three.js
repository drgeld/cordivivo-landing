// CordiVivo Engine Explorer — Three.js 3D Scene
// 7-layer deterministic state machine visualization

const LAYER_COLORS = [
  0x6aa2ff, // L0 Onboarding — brand blue
  0xf87171, // L1 Red Flags — red
  0x6aa2ff, // L2 Session Proposal — blue
  0x5be3c6, // L3 Dose Tracking — accent teal
  0x6aa2ff, // L4 Progression — blue
  0xc084fc, // L5 Psychological — purple
  0xfbbf24, // L6 Multimodal — amber
];

const LAYER_GAP = 3.2;
const LAYER_WIDTH = 6;
const LAYER_DEPTH = 4;
const TOTAL_HEIGHT = (LAYER_COLORS.length - 1) * LAYER_GAP;

let scene, camera, renderer, particles, layerMeshes = [], edgeLines = [];
let scrollProgress = 0;
let mouseX = 0, mouseY = 0;
let particlePositions, particleSpeeds, particleLayerTargets;
const PARTICLE_COUNT = 220;

function initEngine(container) {
  scene = new THREE.Scene();
  scene.fog = new THREE.FogExp2(0x07090f, 0.028);

  camera = new THREE.PerspectiveCamera(50, container.clientWidth / container.clientHeight, 0.1, 100);
  camera.position.set(0, TOTAL_HEIGHT + 4, 12);

  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setSize(container.clientWidth, container.clientHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setClearColor(0x07090f, 1);
  container.appendChild(renderer.domElement);

  // Lights
  const ambient = new THREE.AmbientLight(0x4466aa, 0.4);
  scene.add(ambient);
  const point1 = new THREE.PointLight(0x6aa2ff, 1.2, 30);
  point1.position.set(5, TOTAL_HEIGHT / 2, 8);
  scene.add(point1);
  const point2 = new THREE.PointLight(0x5be3c6, 0.8, 25);
  point2.position.set(-4, TOTAL_HEIGHT * 0.3, 6);
  scene.add(point2);

  // Create layers
  LAYER_COLORS.forEach((color, i) => {
    const y = TOTAL_HEIGHT - i * LAYER_GAP;
    createLayer(color, y, i);
  });

  // Particles
  createParticles();

  // Grid floor
  const gridGeo = new THREE.PlaneGeometry(40, 40, 40, 40);
  const gridMat = new THREE.MeshBasicMaterial({
    color: 0x6aa2ff, wireframe: true, transparent: true, opacity: 0.03
  });
  const grid = new THREE.Mesh(gridGeo, gridMat);
  grid.rotation.x = -Math.PI / 2;
  grid.position.y = -LAYER_GAP * 1.5;
  scene.add(grid);

  // Events
  window.addEventListener('resize', () => onResize(container));
  window.addEventListener('mousemove', onMouseMove);

  animate();
}

function createLayer(color, y, index) {
  // Glass plane
  const geo = new THREE.PlaneGeometry(LAYER_WIDTH, LAYER_DEPTH, 1, 1);
  const mat = new THREE.MeshPhysicalMaterial({
    color: color,
    transparent: true,
    opacity: 0.08,
    roughness: 0.1,
    metalness: 0.3,
    side: THREE.DoubleSide,
    emissive: color,
    emissiveIntensity: 0.05,
  });
  const mesh = new THREE.Mesh(geo, mat);
  mesh.rotation.x = -Math.PI / 2;
  mesh.position.y = y;
  mesh.userData = { baseY: y, index, baseOpacity: 0.08 };
  scene.add(mesh);
  layerMeshes.push(mesh);

  // Edge glow
  const edgeGeo = new THREE.EdgesGeometry(new THREE.BoxGeometry(LAYER_WIDTH, 0.06, LAYER_DEPTH));
  const edgeMat = new THREE.LineBasicMaterial({ color: color, transparent: true, opacity: 0.35 });
  const edge = new THREE.LineSegments(edgeGeo, edgeMat);
  edge.position.y = y;
  edge.userData = { baseOpacity: 0.35, index };
  scene.add(edge);
  edgeLines.push(edge);

  // Layer label (small floating text plane — just a dot indicator)
  const dotGeo = new THREE.SphereGeometry(0.08, 12, 12);
  const dotMat = new THREE.MeshBasicMaterial({ color: color });
  const dot = new THREE.Mesh(dotGeo, dotMat);
  dot.position.set(-LAYER_WIDTH / 2 - 0.4, y, 0);
  scene.add(dot);
}

function createParticles() {
  const geo = new THREE.BufferGeometry();
  particlePositions = new Float32Array(PARTICLE_COUNT * 3);
  particleSpeeds = new Float32Array(PARTICLE_COUNT);
  particleLayerTargets = new Float32Array(PARTICLE_COUNT);
  const colors = new Float32Array(PARTICLE_COUNT * 3);

  for (let i = 0; i < PARTICLE_COUNT; i++) {
    const li = Math.floor(Math.random() * LAYER_COLORS.length);
    const y = TOTAL_HEIGHT - li * LAYER_GAP + (Math.random() - 0.5) * LAYER_GAP * 0.8;
    particlePositions[i * 3] = (Math.random() - 0.5) * LAYER_WIDTH * 0.8;
    particlePositions[i * 3 + 1] = y;
    particlePositions[i * 3 + 2] = (Math.random() - 0.5) * LAYER_DEPTH * 0.6;
    particleSpeeds[i] = 0.3 + Math.random() * 0.8;
    particleLayerTargets[i] = li;

    const c = new THREE.Color(LAYER_COLORS[li]);
    colors[i * 3] = c.r;
    colors[i * 3 + 1] = c.g;
    colors[i * 3 + 2] = c.b;
  }

  geo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
  geo.setAttribute('color', new THREE.BufferAttribute(colors, 3));

  const mat = new THREE.PointsMaterial({
    size: 0.06,
    vertexColors: true,
    transparent: true,
    opacity: 0.7,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
  });

  particles = new THREE.Points(geo, mat);
  scene.add(particles);
}

function onResize(container) {
  camera.aspect = container.clientWidth / container.clientHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(container.clientWidth, container.clientHeight);
}

function onMouseMove(e) {
  mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
  mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
}

function setScrollProgress(p) {
  scrollProgress = Math.max(0, Math.min(1, p));
}

function animate() {
  requestAnimationFrame(animate);

  const t = performance.now() * 0.001;

  // Camera follows scroll — moves down through the stack
  const targetY = TOTAL_HEIGHT + 4 - scrollProgress * (TOTAL_HEIGHT + 6);
  const targetZ = 12 - scrollProgress * 2.5;
  camera.position.y += (targetY - camera.position.y) * 0.06;
  camera.position.z += (targetZ - camera.position.z) * 0.06;

  // Mouse parallax
  camera.position.x += (mouseX * 1.2 - camera.position.x) * 0.03;
  const lookY = camera.position.y - 2;
  camera.lookAt(0, lookY, 0);

  // Active layer index from scroll
  const activeFloat = scrollProgress * (LAYER_COLORS.length - 1);
  const activeIdx = Math.round(activeFloat);

  // Highlight active layer
  layerMeshes.forEach((mesh, i) => {
    const dist = Math.abs(i - activeFloat);
    const highlight = Math.max(0, 1 - dist * 0.6);
    mesh.material.opacity = 0.06 + highlight * 0.14;
    mesh.material.emissiveIntensity = 0.03 + highlight * 0.12;
    // Subtle float
    mesh.position.y = mesh.userData.baseY + Math.sin(t * 0.8 + i * 0.7) * 0.04;
  });

  edgeLines.forEach((edge, i) => {
    const dist = Math.abs(i - activeFloat);
    const highlight = Math.max(0, 1 - dist * 0.6);
    edge.material.opacity = 0.2 + highlight * 0.5;
    edge.position.y = layerMeshes[i].position.y;
  });

  // Animate particles — flow downward between layers
  const pos = particles.geometry.attributes.position.array;
  for (let i = 0; i < PARTICLE_COUNT; i++) {
    const idx = i * 3;
    pos[idx + 1] -= particleSpeeds[i] * 0.012;

    // Reset when below bottom layer
    const bottomY = -LAYER_GAP;
    if (pos[idx + 1] < bottomY) {
      pos[idx + 1] = TOTAL_HEIGHT + LAYER_GAP * 0.5;
      pos[idx] = (Math.random() - 0.5) * LAYER_WIDTH * 0.8;
      pos[idx + 2] = (Math.random() - 0.5) * LAYER_DEPTH * 0.6;
    }

    // Subtle horizontal drift
    pos[idx] += Math.sin(t * 0.5 + i * 0.3) * 0.002;
    pos[idx + 2] += Math.cos(t * 0.4 + i * 0.5) * 0.002;
  }
  particles.geometry.attributes.position.needsUpdate = true;

  renderer.render(scene, camera);
}

window.initEngine = initEngine;
window.setScrollProgress = setScrollProgress;
