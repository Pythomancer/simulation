import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import * as math from "mathjs";

const xsize = 20;
const ysize = 20;
const zsize = 20;

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

const material = new THREE.MeshBasicMaterial({
  color: 0xffffff,
});
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

const inputHandler = function () {
  console.log("input handler triggered");
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
            meesh.setMatrixAt(
              i * ysize * zsize + j * zsize + k,
              new THREE.Matrix4()
                .set(
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
                .multiply(
                  new THREE.Matrix4().set(
                    code.evaluate(scope) * scale,
                    0,
                    0,
                    0,
                    0,
                    code.evaluate(scope) * scale,
                    0,
                    0,
                    0,
                    0,
                    code.evaluate(scope) * scale,
                    0,
                    0,
                    0,
                    0,
                    1
                  )
                )
            );
          }
        }
      }
    } else {
      const mcode = math.compile(meq);
      const ncode = math.compile(neq);
      const pcode = math.compile(peq);
      for (let i = 0; i < xsize; i++) {
        for (let j = 0; j < ysize; j++) {
          for (let k = 0; k < zsize; k++) {
            let scope = {
              x: i / xsize,
              y: j / ysize,
              z: k / zsize,
            };
            meesh.setMatrixAt(
              i * ysize * zsize + j * zsize + k,
              new THREE.Matrix4()
                .set(
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
                .multiply(
                  new THREE.Matrix4().set(
                    mcode.evaluate(scope) * scale,
                    0,
                    0,
                    0,
                    0,
                    ncode.evaluate(scope) * scale,
                    0,
                    0,
                    0,
                    0,
                    pcode.evaluate(scope) * scale,
                    0,
                    0,
                    0,
                    0,
                    1
                  )
                )
            );
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

const eqi = document.getElementById("equation")! as HTMLInputElement;
const meqi = document.getElementById("mequation")! as HTMLInputElement;
const neqi = document.getElementById("nequation")! as HTMLInputElement;
const peqi = document.getElementById("pequation")! as HTMLInputElement;
const scalari = document.getElementById("scalar")! as HTMLInputElement;
const scalei = document.getElementById("scale")! as HTMLInputElement;
scalei.value = "50";
eqi.value = "x*y*z";
meqi.value = "cos(x)";
neqi.value = "sin(y)";
peqi.value = "z";

let eq: string = eqi.value;
let meq: string = meqi.value;
let neq: string = neqi.value;
let peq: string = peqi.value;
let scalar: boolean = false;
let scale: number = parseInt(scalei.value) / xsize;

eqi.addEventListener("focusout", () => {
  eq = eqi.value;
  inputHandler();
});
meqi.addEventListener("focusout", () => {
  meq = meqi.value;
  inputHandler();
});
neqi.addEventListener("focusout", () => {
  neq = neqi.value;
  inputHandler();
});
peqi.addEventListener("focusout", () => {
  neq = neqi.value;
  inputHandler();
});
scalari.addEventListener("change", () => {
  scalar = scalari.checked;
  inputHandler();
});
scalei.addEventListener("change", () => {
  scale = parseInt(scalei.value) / 4;
  inputHandler();
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
}

const renderer = new THREE.WebGLRenderer();
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
