import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

// Cursor
// const cursor = {
// 	x: 0,
// 	y: 0,
// };
// window.addEventListener('mousemove', (e) => {
// 	cursor.x = e.clientX / sizes.width - 0.5;
// 	cursor.y = e.clientY / sizes.height - 0.5;
// });

/**
 * Base
 */
// Canvas
const canvas = document.querySelector('canvas.webgl');

// Sizes
const sizes = {
	width: 800,
	height: 600,
};

// Scene
const scene = new THREE.Scene();

// Object
const mesh = new THREE.Mesh(
	new THREE.BoxGeometry(1, 1, 1, 5, 5, 5),
	new THREE.MeshBasicMaterial({ color: 0xff0000 })
);
scene.add(mesh);

// Camera
const camera = new THREE.PerspectiveCamera(
	75,
	sizes.width / sizes.height,
	0.1,
	100
);

// const aspectRatio = sizes.width / sizes.height;
// const camera = new THREE.OrthographicCamera(
// 	(-1 * sizes.width) / sizes.height,
// 	(1 * sizes.width) / sizes.height,
// 	1,
// 	-1,
// 	0.1,
// 	100
// );
// camera.position.x = 2;
// camera.position.y = 2;
camera.position.z = 3;
camera.lookAt(mesh.position);
scene.add(camera);

// Controls
const controls = new OrbitControls(camera, canvas);
// Enabling damping for the controls
controls.enableDamping = true;
// Changing the focus point of the controls
// controls.target.y = 1;
// controls.update();

// Renderer
const renderer = new THREE.WebGLRenderer({
	canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);

// Animate
const clock = new THREE.Clock();

const tick = () => {
	const elapsedTime = clock.getElapsedTime();

	// Update camera. This allows us to make a full rotation.
	// camera.position.x = Math.sin(cursor.x * Math.PI * 2) * 3;
	// camera.position.z = Math.cos(cursor.x * Math.PI * 2) * 3;
	// camera.position.y = cursor.y * 5;
	// // We have to negate the y value because the y axis is inverted in three.js
	// // when compared to the cursor.y axis.
	// camera.position.y = -cursor.y * 3;

	// // Making the camera look at the mesh
	// camera.lookAt(mesh.position);

	// Update objects
	// mesh.rotation.y = elapsedTime;

	// This will update the controls, making the damping effect work
	controls.update();

	// Render
	renderer.render(scene, camera);

	// Call tick again on the next frame
	window.requestAnimationFrame(tick);
};

tick();
