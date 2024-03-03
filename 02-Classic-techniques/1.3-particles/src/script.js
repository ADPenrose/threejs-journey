import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import GUI from 'lil-gui';

/**
 * Base
 */
// Debug
const gui = new GUI();

// Canvas
const canvas = document.querySelector('canvas.webgl');

// Scene
const scene = new THREE.Scene();

/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader();
const particleTexture = textureLoader.load('/textures/particles/2.png');
particleTexture.colorSpace = THREE.SRGBColorSpace;

// Particles
// const particlesGeometry = new THREE.SphereGeometry(1, 32, 32);
// // The size property controls the size of the particles, while the
// // sizeAttenuation controls if distant particles should be smaller
// // than closer ones.
// const particlesMaterial = new THREE.PointsMaterial({
// 	size: 0.02,
// 	sizeAttenuation: true,
// });
// // Now, we create the points.
// const particles = new THREE.Points(particlesGeometry, particlesMaterial);
// scene.add(particles);

// Custom geometry
const particlesGeometry = new THREE.BufferGeometry();
const count = 20000;
// We multiply the count by 3 because we have 3 values for each vertex.
const positions = new Float32Array(count * 3);
// Now, let's add a color attribute to the particles. It has 3 values
// because it's an RGB color.
const colors = new Float32Array(count * 3);

// Now, we can fill the array with random values
for (let i = 0; i < count * 3; i++) {
	positions[i] = (Math.random() - 0.5) * 10;
	colors[i] = Math.random();
}
// We need to convert the array to a buffer attribute so that we can use it.
particlesGeometry.setAttribute(
	'position',
	new THREE.BufferAttribute(positions, 3)
);
particlesGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

// Material
const particlesMaterial = new THREE.PointsMaterial({
	size: 0.1,
	sizeAttenuation: true,
	// color: '#ff88cc',
	// We are using alphaMap so that we can have transparency.
	transparent: true,
	alphaMap: particleTexture,
});
// Using the alpha test to fix the transparency issue.
// particlesMaterial.alphaTest = 0.001;
// Deactivating the depth test.
// particlesMaterial.depthTest = false;
// Deactivating the depth write.
particlesMaterial.depthWrite = false;
// Blending
particlesMaterial.blending = THREE.AdditiveBlending;
// Activating the vertex colors.
particlesMaterial.vertexColors = true;
// Now, we create the points.
const particles = new THREE.Points(particlesGeometry, particlesMaterial);
scene.add(particles);

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
camera.position.z = 3;
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

	// Animating particles as an object
	// particles.rotation.y = elapsedTime * 0.1;

	// Animating particles by chainging the attributes
	for (let i = 0; i < count; i++) {
		const i3 = i * 3;
		const x = particlesGeometry.attributes.position.array[i3];
		particlesGeometry.attributes.position.array[i3 + 1] = Math.sin(
			elapsedTime + x
		);
	}
	// Every time we change an attribute, we need to tell Three.js that
	// it needs to be updated.
	particlesGeometry.attributes.position.needsUpdate = true;

	// Update controls
	controls.update();

	// Render
	renderer.render(scene, camera);

	// Call tick again on the next frame
	window.requestAnimationFrame(tick);
};

tick();
