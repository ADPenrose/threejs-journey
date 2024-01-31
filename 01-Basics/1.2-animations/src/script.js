import * as THREE from 'three';
import gsap from 'gsap';

// Canvas
const canvas = document.querySelector('canvas.webgl');

// Scene
const scene = new THREE.Scene();

// Object
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

// Sizes
const sizes = {
	width: 800,
	height: 600,
};

// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
camera.position.z = 3;
scene.add(camera);

// Renderer
const renderer = new THREE.WebGLRenderer({
	canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.render(scene, camera);

// Creating the clock. It is like the Date object, but it is initialized with 0,
// and its value is in seconds.
// const clock = new THREE.Clock();

// Creating a function that will be called on every frame.
// const tick = () => {
// 	// We get the time elapsed between the current frame and the last frame.
// 	const elapsedTime = clock.getElapsedTime();

// 	// Updating the objects. We can multiply elapsedTime by 2 pi to get a full
// 	// rotation every second.
// 	camera.position.x = Math.sin(elapsedTime);
// 	camera.position.y = Math.cos(elapsedTime);
// 	camera.lookAt(mesh.position);

// 	// We need to render the object again after updating it.
// 	renderer.render(scene, camera);

// 	// Calling the request animation frame function and passing the tick function as a parameter. This is a recursive function.
// 	window.requestAnimationFrame(tick);
// };

// tick();

// Creating an animation using gsap.
gsap.to(mesh.position, { duration: 1, delay: 1, x: 2 });

const tick = () => {
	// We need to render the object again after updating it.
	renderer.render(scene, camera);

	// Calling the request animation frame function and passing the tick function as a parameter. This is a recursive function.
	window.requestAnimationFrame(tick);
};

tick();
