import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import gsap from 'gsap';
// Importing the GUI library
import GUI from 'lil-gui';

// Creating a new GUI instance
const gui = new GUI({
	width: 300,
	title: 'Nice debug GUI',
	closeFolders: false,
});
// Closing the GUI by default
// gui.close();
// Hiding the GUI
// gui.hide();
const debugObject = {};

// Toggling the GUI
window.addEventListener('keydown', (e) => {
	if (e.key === 'h') {
		gui.show(gui._hidden);
	}
});

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
debugObject.color = '#a778d8';
const geometry = new THREE.BoxGeometry(1, 1, 1, 2, 2, 2);
const material = new THREE.MeshBasicMaterial({
	color: debugObject.color,
	wireframe: true,
});
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

// Adding a folder for the GUI controls
const cubeTweaks = gui.addFolder('Cube Tweaks');
// Closing the folder by default
// cubeTweaks.close();

// Tweaking the position of the cube. After the object and the property params,
// we can add the min, max and precision values in order to create a slider.
// The name of the label can be changed with the name method.
// gui.add(mesh.position, 'y', -3, 3, 0.01);
// We can use some methods to make the above line clearer.
cubeTweaks.add(mesh.position, 'y').min(-3).max(3).step(0.01).name('elevation');

// These will be checkboxes
cubeTweaks.add(mesh, 'visible');
cubeTweaks.add(material, 'wireframe');

// Colors
cubeTweaks
	.addColor(debugObject, 'color')
	.onChange(() => material.color.set(debugObject.color));
// gui.addColor(material, 'color').onChange((value) => {
// 	console.log(value.getHexString());
// });

// Custom animation with a button
debugObject.spin = () => {
	gsap.to(mesh.rotation, { duration: 1, y: mesh.rotation.y + Math.PI * 2 });
};
cubeTweaks.add(debugObject, 'spin');

// Tweaking the subdivisions
debugObject.subdivisions = 2;
cubeTweaks
	.add(debugObject, 'subdivisions')
	.min(1)
	.max(20)
	.step(1)
	.onFinishChange(() => {
		// Deleting the old geometry.
		mesh.geometry.dispose();
		// Creating a new geometry with the new subdivisions, and asociating it
		// to the mesh.
		mesh.geometry = new THREE.BoxGeometry(
			1,
			1,
			1,
			debugObject.subdivisions,
			debugObject.subdivisions,
			debugObject.subdivisions
		);
	});

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
