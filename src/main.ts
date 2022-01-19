import "./style.css";
import * as THREE from "three";
import * as math from "mathjs";
import { cos, sin } from "mathjs";

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
          sin((i / xsize) * 5),
          0,
          0,
          i / xsize - 0.5,
          0,
          sin((j / ysize) * 5),
          0,
          j / ysize - 0.5,
          0,
          0,
          sin((k / zsize) * 5),
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
      const code = math.compile(eqs[0]);
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
                    code.evaluate(scope),
                    0,
                    0,
                    0,
                    0,
                    code.evaluate(scope),
                    0,
                    0,
                    0,
                    0,
                    code.evaluate(scope),
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
      const mcode = math.compile(eqs[1]);
      const ncode = math.compile(eqs[2]);
      const pcode = math.compile(eqs[3]);
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
                    mcode.evaluate(scope),
                    0,
                    0,
                    0,
                    0,
                    ncode.evaluate(scope),
                    0,
                    0,
                    0,
                    0,
                    pcode.evaluate(scope),
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
  } catch {
    console.log("bad input");
  }
};
let eqs: string[] = ["sin(x) + cos(y)", "sin(x)", "cos(y)", "z"];
let eqns: string[] = ["equation", "mequation", "nequation", "pequation"];
let eqis: HTMLInputElement[] = [];
let scalar: boolean = true;
let scalari = document.getElementById("scalar")! as HTMLInputElement;
for (let i: number = 0; i < eqs.length; i++) {
  eqis.push(document.getElementById(eqns[i])! as HTMLInputElement);
  eqis[i].value = eqs[i];
  eqis[i].addEventListener("focusout", () => {
    for (let j: number = 0; j < eqs.length; j++) {
      if (!(eqis[j].value === eqs[j])) {
        eqs[j] = eqis[j].value;
        inputHandler();
      }
    }
  });
}
scalari.addEventListener("focusout", () => {
  scalar = scalari.checked;
  inputHandler;
});

function animate() {
  document.getElementById("fps")!.innerHTML =
    "" + math.round(1000 / (window.performance.now() - ms));
  ms = window.performance.now();

  time += 0.005;
  camera.position.set(1.0 * cos(time), 0, 1.0 * sin(time));
  camera.lookAt(0, 0, 0);
  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
window.addEventListener("resize", () => {
  renderer.setSize(window.innerWidth, window.innerHeight);
});
document.body.appendChild(renderer.domElement);
animate();
