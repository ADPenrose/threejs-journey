import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

/**
 * Base
 */
// Canvas
const canvas = document.querySelector('canvas.webgl');

// Scene
const scene = new THREE.Scene();

// Textures
const textureLoader = new THREE.TextureLoader();
const doorColorTexture = textureLoader.load('/textures/door/color.jpg');

const doorAlphaTexture = textureLoader.load('/textures/door/alpha.jpg');
const doorAmbientOcclusionTexture = textureLoader.load(
	'/textures/door/ambientOcclusion.jpg'
);
const doorHeightTexture = textureLoader.load('/textures/door/height.jpg');
const doorMetalnessTexture = textureLoader.load('/textures/door/metalness.jpg');
const doorNormalTexture = textureLoader.load('/textures/door/normal.jpg');
const doorRoughnessTexture = textureLoader.load('/textures/door/roughness.jpg');
const matcapTexture = textureLoader.load('/textures/matcaps/8.png');

const gradientTexture = textureLoader.load('/textures/gradients/3.jpg');

// All textures used as map and matcap need to be in SRGB color space.
doorColorTexture.colorSpace = THREE.SRGBColorSpace;
matcapTexture.colorSpace = THREE.SRGBColorSpace;

// MeshBasicMaterial
// const material = new THREE.MeshBasicMaterial();
// material.map = doorColorTexture;
// // material.wireframe = true;
// // material.transparent = true;
// // // material.opacity = 0.5;
// // material.alphaMap = doorAlphaTexture;
// material.side = THREE.DoubleSide;

// MeshNormalMaterial
// const material = new THREE.MeshNormalMaterial();
// material.flatShading = true;

// MeshMatcapMaterial
// const material = new THREE.MeshMatcapMaterial();
// material.matcap = matcapTexture;

// MeshDepthMaterial
// const material = new THREE.MeshDepthMaterial();

// MeshLambertMaterial
// const material = new THREE.MeshLambertMaterial();

// MeshPhongMaterial
// const material = new THREE.MeshPhongMaterial();

// MeshToonMaterial
const material = new THREE.MeshToonMaterial();
gradientTexture.minFilter = THREE.NearestFilter;
gradientTexture.magFilter = THREE.NearestFilter;
gradientTexture.generateMipmaps = false;
material.gradientMap = gradientTexture;

// First mesh: Sphere
const sphereGeomerty = new THREE.SphereGeometry(0.5, 64, 64);
const sphereMaterial = material;
const sphereMesh = new THREE.Mesh(sphereGeomerty, sphereMaterial);

// Second mesh: Plane
const planeGeometry = new THREE.PlaneGeometry(1, 1);
const planeMaterial = material;
const planeMesh = new THREE.Mesh(planeGeometry, planeMaterial);
planeMesh.position.x = -2;

// Third mesh: Torus
const torusGeometry = new THREE.TorusGeometry(0.5, 0.2);
const torusMaterial = material;
const torusMesh = new THREE.Mesh(torusGeometry, torusMaterial);
torusMesh.position.x = 2;
scene.add(sphereMesh, planeMesh, torusMesh);

// Lights. Parameters: color, intensity
const ambientLight = new THREE.AmbientLight(0xffffff, 1);
scene.add(ambientLight);

const pointLight = new THREE.PointLight(0xffffff, 30);
pointLight.position.x = 2;
pointLight.position.y = 3;
pointLight.position.z = 4;
scene.add(pointLight);

/**
 * Sizes
 */
const sizes = {
	width: window.innerWidth,
	height: window.innerHeight,
};

window.addEventListener('resize', () => {
	// Update sizes
	sizes.width = window.innerWidth;
	sizes.height = window.innerHeight;

	// Update camera
	camera.aspect = sizes.width / sizes.height;
	camera.updateProjectionMatrix();

	// Update renderer
	renderer.setSize(sizes.width, sizes.height);
	renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(
	75,
	sizes.width / sizes.height,
	0.1,
	100
);
camera.position.x = 1;
camera.position.y = 1;
camera.position.z = 2;
scene.add(camera);

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
	canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

/**
 * Animate
 */
const clock = new THREE.Clock();

const tick = () => {
	const elapsedTime = clock.getElapsedTime();

	// Rotating the objects.
	sphereMesh.rotation.y = elapsedTime * 0.1;
	planeMesh.rotation.y = elapsedTime * 0.1;
	torusMesh.rotation.y = elapsedTime * 0.1;

	sphereMesh.rotation.x = elapsedTime * -0.15;
	planeMesh.rotation.x = elapsedTime * -0.15;
	torusMesh.rotation.x = elapsedTime * -0.15;

	// Update controls
	controls.update();

	// Render
	renderer.render(scene, camera);

	// Call tick again on the next frame
	window.requestAnimationFrame(tick);
};

tick();
