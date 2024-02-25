import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import GUI from 'lil-gui';

// Textures
const textureLoader = new THREE.TextureLoader();
const bakedShadow = textureLoader.load('/textures/bakedShadow.jpg');
bakedShadow.colorSpace = THREE.SRGBColorSpace;
const simpleShadow = textureLoader.load('/textures/simpleShadow.jpg');

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
 * Lights
 */
// Ambient light
const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
gui.add(ambientLight, 'intensity').min(0).max(3).step(0.001);
scene.add(ambientLight);

// Directional light
const directionalLight = new THREE.DirectionalLight(0xffffff, 0.4);
directionalLight.position.set(2, 2, -1);
gui.add(directionalLight, 'intensity').min(0).max(3).step(0.001);
gui.add(directionalLight.position, 'x').min(-5).max(5).step(0.001);
gui.add(directionalLight.position, 'y').min(-5).max(5).step(0.001);
gui.add(directionalLight.position, 'z').min(-5).max(5).step(0.001);
scene.add(directionalLight);
directionalLight.castShadow = true;
// Changing the size of the shadow map
directionalLight.shadow.mapSize.width = 1024;
directionalLight.shadow.mapSize.height = 1024;
// Changing the camera near and far
directionalLight.shadow.camera.near = 1;
directionalLight.shadow.camera.far = 6;
// Changing the camera's amplitude
directionalLight.shadow.camera.top = 2;
directionalLight.shadow.camera.right = 2;
directionalLight.shadow.camera.bottom = -2;
directionalLight.shadow.camera.left = -2;

// Blur shadow
directionalLight.shadow.radius = 10;

// Camera helper
const directionalLightCameraHelper = new THREE.CameraHelper(
	directionalLight.shadow.camera
);
scene.add(directionalLightCameraHelper);
directionalLightCameraHelper.visible = false;

// Spot light. For the amplitude, we can change the angle.
const spotLight = new THREE.SpotLight(0xffffff, 3.6, 10, Math.PI * 0.3);
spotLight.castShadow = true;
spotLight.position.set(0, 2, 2);
scene.add(spotLight);
scene.add(spotLight.target);
// Chainging the size of the shadow map
spotLight.shadow.mapSize.width = 1024;
spotLight.shadow.mapSize.height = 1024;
// Changing the camera near and far
spotLight.shadow.camera.near = 1;
spotLight.shadow.camera.far = 6;
// Spot light helper
const spotLightHelper = new THREE.CameraHelper(spotLight.shadow.camera);
scene.add(spotLightHelper);
spotLightHelper.visible = false;

// Point light
const pointLight = new THREE.PointLight(0xffffff, 2.7);
pointLight.castShadow = true;
pointLight.position.set(1, 1, 0);
scene.add(pointLight);
// Tweaking mapSize, near and far
pointLight.shadow.mapSize.width = 1024;
pointLight.shadow.mapSize.height = 1024;
pointLight.shadow.camera.near = 0.1;
pointLight.shadow.camera.far = 5;
// Point light helper
const pointLightHelper = new THREE.CameraHelper(pointLight.shadow.camera);
scene.add(pointLightHelper);
pointLightHelper.visible = false;

/**
 * Materials
 */
const material = new THREE.MeshStandardMaterial();
material.roughness = 0.7;
gui.add(material, 'metalness').min(0).max(1).step(0.001);
gui.add(material, 'roughness').min(0).max(1).step(0.001);

/**
 * Objects
 */
const sphere = new THREE.Mesh(new THREE.SphereGeometry(0.5, 32, 32), material);
sphere.castShadow = true;

const plane = new THREE.Mesh(new THREE.PlaneGeometry(5, 5), material);
plane.rotation.x = -Math.PI * 0.5;
plane.position.y = -0.5;
plane.receiveShadow = true;

scene.add(sphere, plane);

// Adding the plane for the sphere's shadow
const sphereShadow = new THREE.Mesh(
	new THREE.PlaneGeometry(1.5, 1.5),
	new THREE.MeshBasicMaterial({
		color: 0x000000,
		transparent: true,
		alphaMap: simpleShadow,
	})
);
sphereShadow.rotation.x = -Math.PI * 0.5;
sphereShadow.position.y = plane.position.y + 0.01;
scene.add(sphereShadow);

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
renderer.shadowMap.enabled = false;

/**
 * Animate
 */
const clock = new THREE.Clock();

const tick = () => {
	const elapsedTime = clock.getElapsedTime();

	// Update the sphere
	// These first two lines make the sphere move in a circle.
	sphere.position.x = Math.sin(elapsedTime) * 1.5;
	sphere.position.z = Math.cos(elapsedTime) * 1.5;
	// This line makes the sphere bounce up and down, with the plane acting as
	// the floor.
	sphere.position.y = Math.abs(Math.sin(elapsedTime * 3));

	// Updating the shadow's position
	// The shadow's position is updated to match the sphere's position.
	sphereShadow.position.x = sphere.position.x;
	sphereShadow.position.z = sphere.position.z;
	// We need to update the opacity of the shadow to make it look more
	// realistic.
	sphereShadow.material.opacity = (1 - sphere.position.y) * 0.4;

	// Update controls
	controls.update();

	// Render
	renderer.render(scene, camera);

	// Call tick again on the next frame
	window.requestAnimationFrame(tick);
};

tick();
