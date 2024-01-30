import * as THREE from 'three';

// Canvas
const canvas = document.querySelector('canvas.webgl');

// Scene
const scene = new THREE.Scene();

/**
 * Objects
 */
// Creating a group.
const group = new THREE.Group();
// Changing the position of the group.
group.position.y = 1;
// Changing the scale of the group.
group.scale.y = 2;
// Changing the rotation of the group.
group.rotation.y = 1;
// Adding the group to the scene.
scene.add(group);

// Creating the first cube.
const cube1 = new THREE.Mesh(
	new THREE.BoxGeometry(1, 1, 1),
	new THREE.MeshBasicMaterial({ color: 0xff0000 })
);
// Adding the cube NOT TO THE SCENE, but to the group.
group.add(cube1);

// Creating the second cube.
const cube2 = new THREE.Mesh(
	new THREE.BoxGeometry(1, 1, 1),
	new THREE.MeshBasicMaterial({ color: 0x00ff00 })
);
cube2.position.x = -2;
// Adding the cube NOT TO THE SCENE, but to the group.
group.add(cube2);

// Creating the third cube.
const cube3 = new THREE.Mesh(
	new THREE.BoxGeometry(1, 1, 1),
	new THREE.MeshBasicMaterial({ color: 0x0000ff })
);
cube3.position.x = 2;
// Adding the cube NOT TO THE SCENE, but to the group.
group.add(cube3);

// const geometry = new THREE.BoxGeometry(1, 1, 1);
// const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
// const mesh = new THREE.Mesh(geometry, material);

// // Position
// // mesh.position.x = 0.7;
// // mesh.position.y = -0.6;
// // mesh.position.z = 1;
// // Updating x, y, z position of the mesh at the same time.
// mesh.position.set(0.7, -0.6, 1);

// // Scale
// // mesh.scale.x = 2;
// // mesh.scale.y = 0.5;
// // mesh.scale.z = 0.5;
// // Updating x, y, z scale of the mesh at the same time.
// mesh.scale.set(2, 0.5, 0.5);

// // Rotation
// // Changing the order in which the rotations are applied.
// mesh.rotation.reorder('YXZ');
// // The order in which we call the rotations here is not the order in which they are applied. That was defined by the reorder method.
// mesh.rotation.x = Math.PI * 0.25;
// mesh.rotation.y = Math.PI * 0.25;

// scene.add(mesh);

// Creating an axes helper.
const axesHelper = new THREE.AxesHelper(2); // 2 is the size of the axes helper.
scene.add(axesHelper);

// Checking the length of the vector that represents the distance between the
// center of the scene and the objects position.
// console.log(mesh.position.length());

/**
 * Sizes
 */
const sizes = {
	width: 800,
	height: 600,
};

/**
 * Camera
 */
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
camera.position.z = 3;
scene.add(camera);

// We can also use the distanceTo method to get the distance between two objects, like the mesh and the camera.
// console.log(mesh.position.distanceTo(camera.position));

// Normalizing a vector means that we are going to divide the vector by its length, causing the length of the vector to be equal to 1.
// This is useful when we want to use the length of the vector as a multiplier.
// mesh.position.normalize();
// console.log(mesh.position.length()); // Logs 1

// Using lookAt to make the camera look directly at the rotated mesh.
// camera.lookAt(mesh.position);

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
	canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.render(scene, camera);
