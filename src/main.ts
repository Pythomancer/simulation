import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import * as math from "mathjs";

let size = 20;

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

let particleps: THREE.Vector3[] = [];
const material = new THREE.MeshBasicMaterial({
  color: 0xffffff,
});
let ptCube = new THREE.BoxGeometry(0.005, 0.005, 0.005);
let bcube = new THREE.BoxGeometry(0.01, 0.01, 0.01);
let meesh = new THREE.InstancedMesh(ptCube, material, size * size * size);
// let ms = window.performance.now();
let dummy = new THREE.Object3D();
let dm = new THREE.Object3D();

let particleesh: THREE.InstancedMesh = new THREE.InstancedMesh(
  bcube,
  new THREE.MeshBasicMaterial({ color: 0xffffff }),
  size * size * size
);
const newDomain = function () {
  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
      for (let k = 0; k < size; k++) {
        dummy.position.set(i / size - 0.5, j / size - 0.5, k / size - 0.5);
        dummy.updateMatrix();
        meesh.setMatrixAt(i * size * size + j * size + k, dummy.matrix);
        meesh.setColorAt(
          i * size * size + j * size + k,
          new THREE.Color(i / size, j / size, k / size)
        );
      }
    }
  }
};
newDomain();
meesh.instanceMatrix.needsUpdate = true;
scene.add(meesh);

const inputHandler = function () {
  try {
    if (scalar) {
      const code = math.compile(eq);
      for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {
          for (let k = 0; k < size; k++) {
            let scope = {
              x: i / size,
              y: j / size,
              z: k / size,
              t: time,
            };
            dummy.position.set(i / size - 0.5, j / size - 0.5, k / size - 0.5);
            dummy.scale.set(
              code.evaluate(scope) * scale,
              code.evaluate(scope) * scale,
              code.evaluate(scope) * scale
            );
            dummy.rotation.x = 0;
            dummy.rotation.y = 0;
            dummy.rotation.z = 0;
            dummy.updateMatrix();
            meesh.setMatrixAt(i * size * size + j * size + k, dummy.matrix);
          }
        }
      }
    } else {
      for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {
          for (let k = 0; k < size; k++) {
            let scope = {
              x: i / size - 0.5,
              y: j / size - 0.5,
              z: k / size - 0.5,
              t: time,
            };
            dummy.position.set(0, 0, 0);
            dummy.lookAt(
              new THREE.Vector3(
                mcode.evaluate(scope),
                ncode.evaluate(scope),
                pcode.evaluate(scope)
              )
            );
            dummy.position.set(i / size - 0.5, j / size - 0.5, k / size - 0.5);

            dummy.scale.set(scale / 3, scale / 3, scale * 3);
            dummy.updateMatrix();
            meesh.setMatrixAt(i * size * size + j * size + k, dummy.matrix);
          }
        }
      }
    }
    meesh.instanceMatrix.needsUpdate = true;
  } catch (error) {
    console.log("bad input");
    console.error(error);
  }
};

const particleHandler = function () {
  if (particles) {
    for (let i: number = 0; i < particleesh.count; i++) {
      particleps.push(
        new THREE.Vector3(
          Math.random() - 0.5,
          Math.random() - 0.5,
          Math.random() - 0.5
        )
      );
      dm.position.set(particleps[i].x, particleps[i].y, particleps[i].z);
      dm.lookAt(new THREE.Vector3(0, 0, 0));
      dm.scale.set(1, 1, 1);
      dm.updateMatrix();
      particleesh.setMatrixAt(i, dm.matrix);
    }
    scene.add(particleesh);
    particleesh.instanceMatrix.needsUpdate = true;
  } else {
    scene.remove(particleesh);
    renderer.renderLists.dispose();
  }
};

const tickParticle = function () {
  for (let i: number = 0; i < particleesh.count; i++) {
    let m = new THREE.Matrix4();
    particleesh.getMatrixAt(i, m);
    let scope = {
      x: particleps[i].x,
      y: particleps[i].y,
      z: particleps[i].z,
      t: time,
    };
    particleps[i].x += (speed / 1000) * mcode.evaluate(scope);
    particleps[i].y += (speed / 1000) * ncode.evaluate(scope);
    particleps[i].z += (speed / 1000) * pcode.evaluate(scope);
    if (
      !(
        particleps[i].x < 0.5 &&
        particleps[i].x > -0.5 &&
        particleps[i].y < 0.5 &&
        particleps[i].y > -0.5 &&
        particleps[i].z < 0.5 &&
        particleps[i].z > -0.5
      )
    ) {
      particleps[i].x = Math.random() - 0.5;
      particleps[i].y = Math.random() - 0.5;
      particleps[i].z = Math.random() - 0.5;
    }
    particleesh.setMatrixAt(
      i,
      m
        .set(
          1,
          0,
          0,
          particleps[i].x,
          0,
          1,
          0,
          particleps[i].y,
          0,
          0,
          1,
          particleps[i].z,
          0,
          0,
          0,
          1
        )
        .multiply(
          new THREE.Matrix4().set(
            psize / 3,
            0,
            0,
            0,
            0,
            psize / 3,
            0,
            0,
            0,
            0,
            psize / 3,
            0,
            0,
            0,
            0,
            1
          )
        )
    );
    // dm.scale.set(psize / 3, psize / 3, psize / 3);
    // dm.rotation.x = 0;
    // dm.rotation.y = 0;
    // dm.rotation.z = 0;
    // dm.position.set(particleps[i].x, particleps[i].y, particleps[i].z);
    // dm.updateMatrix();
    // particleesh.setMatrixAt(i, dm.matrix);
  }
  particleesh.instanceMatrix.needsUpdate = true;
};

const eqi = document.getElementById("equation")! as HTMLInputElement;
const meqi = document.getElementById("mequation")! as HTMLInputElement;
const neqi = document.getElementById("nequation")! as HTMLInputElement;
const peqi = document.getElementById("pequation")! as HTMLInputElement;
const scalari = document.getElementById("scalar")! as HTMLInputElement;
const scalei = document.getElementById("scale")! as HTMLInputElement;
const particlei = document.getElementById("particles")! as HTMLInputElement;
const spini = document.getElementById("spin")! as HTMLInputElement;
const sizei = document.getElementById("size")! as HTMLInputElement;
const colori = document.getElementById("color")! as HTMLInputElement;
const speedi = document.getElementById("speed")! as HTMLInputElement;
const psizei = document.getElementById("psize")! as HTMLInputElement;
const timei = document.getElementById("time")! as HTMLInputElement;

scalei.value = "50";
eqi.value = "x*y*z";
meqi.value = "cos(x)";
neqi.value = "sin(y)";
peqi.value = "z";
particlei.checked = false;
spini.checked = true;
sizei.value = "20";
colori.value = "#1f1e33";
speedi.value = "1";
psizei.value = "3";
timei.value = "3";

let eq: string = eqi.value;
let meq: string = meqi.value;
let neq: string = neqi.value;
let peq: string = peqi.value;
let scalar: boolean = false;
let scale: number = parseInt(scalei.value) / size;
let particles: boolean = false;
let color: string = colori.value;
let speed: number = parseInt(speedi.value);
let psize: number = parseInt(psizei.value);

let mcode = math.compile(meq);
let ncode = math.compile(neq);
let pcode = math.compile(peq);

let time: number = 0;

eqi.addEventListener("input", () => {
  eq = eqi.value;
  inputHandler();
});
meqi.addEventListener("input", () => {
  meq = meqi.value;
  mcode = math.compile(meq);
  inputHandler();
});
neqi.addEventListener("input", () => {
  neq = neqi.value;
  ncode = math.compile(neq);
  inputHandler();
});
peqi.addEventListener("input", () => {
  peq = peqi.value;
  pcode = math.compile(peq);
  inputHandler();
});
scalari.addEventListener("change", () => {
  scalar = scalari.checked;
  if (scalar) {
    particlei.disabled = true;
  } else {
    particlei.disabled = false;
  }
  particles = false;
  particleHandler();
  particlei.checked = false;
  inputHandler();
});
scalei.addEventListener("input", () => {
  scale = parseInt(scalei.value) / 4;
  inputHandler();
});
spini.addEventListener("change", () => {
  controls.autoRotate = spini.checked;
});
particlei.addEventListener("change", () => {
  particles = particlei.checked;
  particleHandler();
});
sizei.addEventListener("input", () => {
  size = parseInt(sizei.value);
  meesh.count = size * size * size;
  scene.remove(meesh);
  if (particles) {
    scene.remove(particleesh);
    particleesh = new THREE.InstancedMesh(
      bcube,
      new THREE.MeshBasicMaterial({ color: 0xffffff }),
      size * size * size
    );
    particleHandler();
    scene.add(particleesh);
  }
  meesh = new THREE.InstancedMesh(ptCube, material, size * size * size);

  meesh.instanceMatrix.needsUpdate = true;
  scene.add(meesh);
  newDomain();
  inputHandler();
});
colori.addEventListener("input", () => {
  color = colori.value;
  scene.background = new THREE.Color(color);
});
speedi.addEventListener("input", () => {
  speed = parseInt(speedi.value);
});
psizei.addEventListener("input", () => {
  psize = parseInt(psizei.value);
});

scene.background = new THREE.Color(color);

inputHandler();
camera.position.set(1, 1, 1);
function animate() {
  // document.getElementById("fps")!.innerHTML =
  //   "" + math.round(1000 / (window.performance.now() - ms));
  // ms = window.performance.now();
  time += parseInt(timei.value) / 100;
  controls.update();
  renderer.render(scene, camera);
  if (
    (eqi.value.includes("t") && scalar) ||
    ((meqi.value.includes("t") ||
      neqi.value.includes("t") ||
      peqi.value.includes("t")) &&
      !scalar)
  ) {
    inputHandler();
  }
  requestAnimationFrame(animate);
  if (particles) {
    tickParticle();
  }
}

const renderer = new THREE.WebGLRenderer({
  antialias: true,
  powerPreference: "high-performance",
});
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
const controls = new OrbitControls(camera, renderer.domElement);
controls.autoRotate = true;
document.body.appendChild(renderer.domElement);
animate();
