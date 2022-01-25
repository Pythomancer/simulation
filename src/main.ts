import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import * as math from "mathjs";

const xsize: number = 20;
const ysize: number = 20;
const zsize: number = 20;
let timeconst: number = 0.001;

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
let meesh = new THREE.InstancedMesh(ptCube, material, xsize * ysize * zsize);
let ms = window.performance.now();
let dummy = new THREE.Object3D();
let dm = new THREE.Object3D();

let particleesh: THREE.InstancedMesh = new THREE.InstancedMesh(
  bcube,
  new THREE.MeshBasicMaterial({ color: 0xffffff }),
  xsize * ysize * zsize
);

for (let i = 0; i < xsize; i++) {
  for (let j = 0; j < ysize; j++) {
    for (let k = 0; k < zsize; k++) {
      dummy.position.set(i / xsize - 0.5, j / ysize - 0.5, k / zsize - 0.5);
      dummy.updateMatrix();
      meesh.setMatrixAt(i * ysize * zsize + j * zsize + k, dummy.matrix);
      meesh.setColorAt(
        i * ysize * zsize + j * zsize + k,
        new THREE.Color(i / xsize, j / ysize, k / zsize)
      );
    }
  }
}
meesh.instanceMatrix.needsUpdate = true;
scene.add(meesh);

const inputHandler = function () {
  try {
    if (scalar) {
      const code = math.compile(eq);
      for (let i = 0; i < xsize; i++) {
        for (let j = 0; j < ysize; j++) {
          for (let k = 0; k < zsize; k++) {
            let scope = {
              x: i / xsize,
              y: j / ysize,
              z: k / zsize,
            };
            dummy.position.set(
              i / xsize - 0.5,
              j / ysize - 0.5,
              k / zsize - 0.5
            );
            dummy.scale.set(
              code.evaluate(scope) * scale,
              code.evaluate(scope) * scale,
              code.evaluate(scope) * scale
            );
            dummy.rotation.x = 0;
            dummy.rotation.y = 0;
            dummy.rotation.z = 0;
            dummy.updateMatrix();
            meesh.setMatrixAt(i * ysize * zsize + j * zsize + k, dummy.matrix);
          }
        }
      }
    } else {
      for (let i = 0; i < xsize; i++) {
        for (let j = 0; j < ysize; j++) {
          for (let k = 0; k < zsize; k++) {
            let scope = {
              x: i / xsize - 0.5,
              y: j / ysize - 0.5,
              z: k / zsize - 0.5,
            };
            dummy.position.set(0, 0, 0);
            dummy.lookAt(
              new THREE.Vector3(
                mcode.evaluate(scope),
                ncode.evaluate(scope),
                pcode.evaluate(scope)
              )
            );
            dummy.position.set(
              i / xsize - 0.5,
              j / ysize - 0.5,
              k / zsize - 0.5
            );

            dummy.scale.set(scale / 3, scale * 3, scale / 3);
            dummy.updateMatrix();
            meesh.setMatrixAt(i * ysize * zsize + j * zsize + k, dummy.matrix);
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
    let scope = {
      x: particleps[i].x,
      y: particleps[i].y,
      z: particleps[i].z,
    };
    particleps[i].x += timeconst * mcode.evaluate(scope);
    particleps[i].y += timeconst * ncode.evaluate(scope);
    particleps[i].z += timeconst * pcode.evaluate(scope);
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
    dm.rotation.x = 0;
    dm.rotation.y = 0;
    dm.rotation.z = 0;
    dm.position.set(particleps[i].x, particleps[i].y, particleps[i].z);
    dm.updateMatrix();
    particleesh.setMatrixAt(i, dm.matrix);
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
scalei.value = "50";
eqi.value = "x*y*z";
meqi.value = "cos(x)";
neqi.value = "sin(y)";
peqi.value = "z";
particlei.checked = false;
spini.checked = true;

let eq: string = eqi.value;
let meq: string = meqi.value;
let neq: string = neqi.value;
let peq: string = peqi.value;
let scalar: boolean = false;
let scale: number = parseInt(scalei.value) / xsize;
let particles: boolean = false;

let mcode = math.compile(meq);
let ncode = math.compile(neq);
let pcode = math.compile(peq);
let code = math.compile(eq);

eqi.addEventListener("input", () => {
  eq = eqi.value;
  code = math.compile(eq);
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

inputHandler();
camera.position.set(1, 1, 1);
function animate() {
  document.getElementById("fps")!.innerHTML =
    "" + math.round(1000 / (window.performance.now() - ms));
  ms = window.performance.now();

  controls.update();
  renderer.render(scene, camera);
  requestAnimationFrame(animate);
  if (particles) {
    tickParticle();
  }
}

const renderer = new THREE.WebGLRenderer({ antialias: true });
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
