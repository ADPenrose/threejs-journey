import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

/**
 * Base
 */
// Canvas
const canvas = document.querySelector('canvas.webgl');

// Scene
const scene = new THREE.Scene();

/**
 * Object
 */
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

/**
 * Sizes
 */
const sizes = {
	width: window.innerWidth,
	height: window.innerHeight,
};

// Listen to window resize
window.addEventListener('resize', () => {
	// Updating sizes
	sizes.width = window.innerWidth;
	sizes.height = window.innerHeight;

	// Updating the camera
	camera.aspect = sizes.width / sizes.height;

	// Since we changed the aspect ratio, we need to update the projection matrix
	camera.updateProjectionMatrix();

	// Updating the renderer
	renderer.setSize(sizes.width, sizes.height);
	// Setting the pixel ratio.
	renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

// Listen to double click
window.addEventListener('dblclick', () => {
	// This var will store the current full screen element, depending
	// on the browser.
	const fullscreenElement =
		document.fullscreenElement || document.webkitFullscreenElement;

	// If we are not in full screen mode, we enter it.
	if (!fullscreenElement) {
		if (canvas.requestFullscreen) {
			canvas.requestFullscreen();
		} else if (canvas.webkitRequestFullscreen) {
			canvas.webkitRequestFullscreen();
		}
	} else {
		// If we are in full screen mode, we exit it.
		if (document.exitFullscreen) {
			document.exitFullscreen();
		} else if (document.webkitExitFullscreen) {
			document.webkitExitFullscreen();
		}
	}
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

/**
 * Animate
 */
const clock = new THREE.Clock();

const tick = () => {
	const elapsedTime = clock.getElapsedTime();

	// Update controls
	controls.update();

	// Render
	renderer.render(scene, camera);

	// Call tick again on the next frame
	window.requestAnimationFrame(tick);
};

tick();
