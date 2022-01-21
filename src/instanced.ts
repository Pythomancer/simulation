// import "./style.css";
// import * as THREE from "three";
// import * as math from "mathjs";
// import { cos, sin } from "mathjs";
// // import { Vector3 } from "three";
// import { DomainPt, ptMat } from "./domain";

// const xsize = 20;
// const ysize = 20;
// const zsize = 20;

// const scene = new THREE.Scene();
// const camera = new THREE.PerspectiveCamera(
//   75,
//   window.innerWidth / window.innerHeight,
//   0.1,
//   1000
// );

// let time = 0.0;
// camera.position.z = 2;
// // const light = new THREE.DirectionalLight(0xffffff, 1);
// // light.position.set(0, 0, 0);
// // scene.add(light);
// camera.lookAt(0, 0, 0);

// let matrix: DomainPt[][][] = [];

// for (let i = 0; i < xsize; i++) {
//   matrix[i] = [];
//   for (let j = 0; j < ysize; j++) {
//     matrix[i].push([]);
//     for (let k = 0; k < zsize; k++) {
//       matrix[i][j].push(new DomainPt());
//       matrix[i][j][k].geometry.position.set(
//         i / xsize - 0.5,
//         j / ysize - 0.5,
//         k / zsize - 0.5
//       );
//       matrix[i][j][k].resize(sin(matrix[i][j][k].geometry.position.x * 4) / 80);
//       scene.add(matrix[i][j][k].geometry);
//     }
//   }
// }
// let ms = window.performance.now();

// function animate() {
//   document.getElementById("fps")!.innerHTML =
//     "" + math.round(1000 / (window.performance.now() - ms));
//   ms = window.performance.now();
//   document.getElementById("eq")!.innerHTML = (
//     document.getElementById("equation")! as HTMLInputElement
//   ).value;
//   ms = window.performance.now();
//   time += 0.005;
//   ptMat.color = new THREE.Color(
//     sin(time) * sin(time),
//     sin(time + 1) * sin(time + 1),
//     sin(time + 2) * sin(time + 2)
//   );
//   camera.position.set(1.0 * cos(time), 0, 1.0 * sin(time));
//   camera.lookAt(0, 0, 0);
//   requestAnimationFrame(animate);
//   renderer.render(scene, camera);
// }

// const renderer = new THREE.WebGLRenderer();
// renderer.setSize(window.innerWidth, window.innerHeight);
// document.body.appendChild(renderer.domElement);
// animate();
