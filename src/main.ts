import "./style.css";
import * as THREE from "three";
import * as math from "mathjs";
import { cos, sin } from "mathjs";
// import { Vector3 } from "three";
import { ptMat } from "./domain";

const xsize = 50;
const ysize = 50;
const zsize = 50;

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

let time = 0.0;
camera.position.z = 2;
// const light = new THREE.DirectionalLight(0xffffff, 1);
// light.position.set(0, 0, 0);
// scene.add(light);
camera.lookAt(0, 0, 0);
const material = new THREE.MeshBasicMaterial({ color: 0xffffff });
let ptCube = new THREE.BoxGeometry(0.005, 0.005, 0.005);
let meesh = new THREE.InstancedMesh(ptCube, material, xsize * ysize * zsize);
let ms = window.performance.now();
for (let i = 0; i < xsize; i++) {
  for (let j = 0; j < ysize; j++) {
    for (let k = 0; k < zsize; k++) {
      meesh.setColorAt(
        i * ysize * zsize + j * zsize + k,
        new THREE.Color(i / xsize, j / ysize, k / zsize)
      );
      console.log(i, j, k, i / xsize, j / ysize, k / zsize);
      meesh.setMatrixAt(
        i * ysize * zsize + j * zsize + k,
        new THREE.Matrix4().set(
          1,
          0,
          0,
          i / xsize - 0.5,
          0,
          1,
          0,
          j / ysize - 0.5,
          0,
          0,
          1,
          k / zsize - 0.5,
          0,
          0,
          0,
          1
        )
      );
    }
  }
}
scene.add(meesh);
function animate() {
  document.getElementById("fps")!.innerHTML =
    "" + math.round(1000 / (window.performance.now() - ms));
  ms = window.performance.now();
  document.getElementById("eq")!.innerHTML = (
    document.getElementById("equation")! as HTMLInputElement
  ).value;
  ms = window.performance.now();
  time += 0.005;
  ptMat.color = new THREE.Color(
    sin(time) * sin(time),
    sin(time + 1) * sin(time + 1),
    sin(time + 2) * sin(time + 2)
  );
  camera.position.set(1.0 * cos(time), 0, 1.0 * sin(time));
  camera.lookAt(0, 0, 0);
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
animate();
