import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import GUI from 'lil-gui';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry';

/**
 * Base
 */
// Debug
// const gui = new GUI();

// Canvas
const canvas = document.querySelector('canvas.webgl');

// Scene
const scene = new THREE.Scene();

// Axes helper
// const axesHelper = new THREE.AxesHelper();
// scene.add(axesHelper);

/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader();
const matcapTexture = textureLoader.load('/textures/matcaps/8.png');
matcapTexture.colorSpace = THREE.SRGBColorSpace;

// Material for both the text and the donuts
const material = new THREE.MeshMatcapMaterial({ matcap: matcapTexture });

// Font
const fontLoader = new FontLoader();
fontLoader.load('/fonts/helvetiker_regular.typeface.json', (font) => {
	const textGeometry = new TextGeometry('Hello Three.js from apaydev', {
		font,
		size: 0.5,
		height: 0.2,
		curveSegments: 5,
		// This enables us to do rounded fonts (biselado en bordes)
		bevelEnabled: true,
		bevelThickness: 0.03,
		bevelSize: 0.02,
		bevelOffset: 0,
		bevelSegments: 4,
	});
	// Centering the text
	textGeometry.center();
	// // Calculating the box bounding
	// textGeometry.computeBoundingBox();
	// console.log(textGeometry.boundingBox);
	// // Translating the text to the center by using half of the box bounding
	// // values and the bevel values.
	// textGeometry.translate(
	// 	-(textGeometry.boundingBox.max.x - 0.02) * 0.5,
	// 	-(textGeometry.boundingBox.max.y - 0.02) * 0.5,
	// 	-(textGeometry.boundingBox.max.z - 0.03) * 0.5
	// );

	// Creating the material
	const text = new THREE.Mesh(textGeometry, material);
	scene.add(text);
});

// Creating 100's of donuts
// Since we can reuse geometries and materials, we can define them outside the
// loop.
const donutGeometry = new THREE.TorusGeometry(0.3, 0.2, 20, 45);
for (let i = 0; i < 100; i++) {
	// Creating the donut
	const donut = new THREE.Mesh(donutGeometry, material);

	// Moving the donut to a random position.
	donut.position.x = (Math.random() - 0.5) * 10;
	donut.position.y = (Math.random() - 0.5) * 10;
	donut.position.z = (Math.random() - 0.5) * 10;

	// Rotating the donut
	donut.rotation.x = Math.random() * Math.PI;
	donut.rotation.y = Math.random() * Math.PI;

	// Giving a random scale to the donut
	const scale = Math.random();
	donut.scale.set(scale, scale, scale);

	scene.add(donut);
}

/**
 * Object
 */
// const cube = new THREE.Mesh(
// 	new THREE.BoxGeometry(1, 1, 1),
// 	new THREE.MeshBasicMaterial()
// );

// scene.add(cube);

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

	// Update controls
	controls.update();

	// Render
	renderer.render(scene, camera);

	// Call tick again on the next frame
	window.requestAnimationFrame(tick);
};

tick();
