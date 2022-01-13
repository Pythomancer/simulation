import './style.css'
import * as THREE from 'three';
import * as math from 'mathjs';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshPhongMaterial( { color: 0x1f1e33 } );
const cube = new THREE.Mesh( geometry, material );
scene.add( cube );
let time = 0.0;
camera.position.z = 2;
const light = new THREE.DirectionalLight(0xFFFFFF, 1);
light.position.set(-1, 2, 4)
scene.add(light);

function animate() {
	requestAnimationFrame( animate );
	renderer.render( scene, camera );
  cube.rotation.x = Math.sin(time);
  cube.rotation.y = Math.cos(time);
  time+=0.01
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

function eq (equation:string, xin:number, yin:number, zin:number){
  let scope = {
    x: xin,
    y: yin,
    z: zin
  }
  return math.evaluate(equation, scope);
}

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );
animate();