// Importing the three.js library through ES6 modules.
import * as THREE from 'three';

// Getting the canvas element.
const canvas = document.querySelector('canvas.webgl');

// Creating a scene.
const scene = new THREE.Scene();

// Creating a really simple object. In this case, it is a mesh
// with the geometry of a cube, and a material with a basic color.
const geometry = new THREE.BoxGeometry(1, 1, 1); // width, height, depth
// We can also use hex colors, strings, etc.
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
// We combine the geometry and the material to create a mesh.
const mesh = new THREE.Mesh(geometry, material);

// Adding the mesh to the scene.
scene.add(mesh);

// Creating a really basic perspective camera (if the object is close
// to the camera it will bigger, and vice versa).
// It requires a field of view (how large the vertical vision angle is,
// expressed in degrees) and an aspect ratio (the width of the canvas
// divided by the height).
const sizes = {
	width: 800,
	height: 600,
};
// fov, aspect ratio
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
// We need to move the camera a little bit back, so we can see the object.
// In three.js, all object have position, rotation and scale properties, which
// are also objects with x, y and z properties.
camera.position.z = 3;

// We need to add the camera to the scene. It is not always necessary, but it
// can lead to bugs if we don't do it in certain situations.
scene.add(camera);

// We need to add the renderer.
const renderer = new THREE.WebGLRenderer({ canvas: canvas });
// Using the sizes of the camera to size the renderer.
renderer.setSize(sizes.width, sizes.height);
// Appending the renderer to the body of the document. Basically, here
// we are asking the renderer to show us a picture of the scene, from
// the perspective of the camera.
renderer.render(scene, camera);
