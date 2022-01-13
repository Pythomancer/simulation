import "./style.css";
import * as THREE from "three";
// import * as math from "mathjs";
import { cos, sin } from "mathjs";

interface DomainPoint {
  value: number;
  geometry: THREE.Mesh;
}

const xsize = 5;
const ysize = 5;
const zsize = 5;

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: 0xffffff });
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);
let time = 0.0;
camera.position.z = 2;
// const light = new THREE.DirectionalLight(0xffffff, 1);
// light.position.set(0, 0, 0);
// scene.add(light);
camera.lookAt(0, 0, 0);

let ptCube = new THREE.BoxGeometry(0.2, 0.2, 0.2);

let matrix: DomainPoint[][][] = [];

for (let i = 0; i < xsize; i++) {
  matrix[i] = [];
  for (let j = 0; j < ysize; j++) {
    matrix[i].push([]);
    for (let k = 0; k < zsize; k++) {
      matrix[i][j].push({
        value: 0.2,
        geometry: new THREE.Mesh(ptCube, material),
      });
      matrix[i][j][k].geometry.position.set(i, j, k);
      scene.add(matrix[i][j][k].geometry);
    }
  }
}

function animate() {
  camera.position.set(
    xsize / 2.0 + 3 * cos(time),
    ysize / 2.0,
    zsize / 2.0 + 3 * sin(time)
  );
  // camera.position.set(50 * cos(time), 50 * sin(time), 2 * tan(time));
  camera.lookAt(xsize / 2, ysize / 2, zsize / 2);
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
  time += 0.005;
  material.color = new THREE.Color(
    sin(time) * sin(time),
    sin(time + 1) * sin(time + 1),
    sin(time + 2) * sin(time + 2)
  );
}

// function eq(equation:String, x:number, y:number, z:number) {
//   let parts: Array<String> = []; // = equation.split(/(|)/);
//   let chars = equation.split('');
//   let depth: Array<number> = [];
//   let current = 0;
//   parts.push("");
//   depth.push(0);
//   for (let i = 0; i < chars.length; i++){
//     if(chars[i] == '('){
//       parts.push("");
//       depth.push(depth[current+1]);
//       current++;
//     }
//     else if (chars[i] == ')'){
//       parts.push("");
//       depth.push(depth[current-1]);
//     }
//     else {
//       parts[current] += chars[i];
//     }
//   }
//   depth.indexOf(depth.max)
//   return x;
// }

// function eq(equation: string, xin: number, yin: number, zin: number) {
//   let scope = {
//     x: xin,
//     y: yin,
//     z: zin,
//   };
//   //return math.evaluate(equation, scope);
//   return sin(xin) + sin(yin);
// }

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
animate();
