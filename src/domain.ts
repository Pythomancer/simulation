import "./style.css";
import * as THREE from "three";
// import * as math from "mathjs";
import { sin } from "mathjs";
import { Vector3 } from "three";

export let ptCube = new THREE.BoxGeometry(0.02, 0.02, 0.02);
export const ptMat = new THREE.MeshBasicMaterial({ color: 0xffffff });

export class DomainPt {
  value: number;
  geometry: THREE.Mesh;
  material: THREE.MeshBasicMaterial;
  shape: THREE.BoxGeometry;

  constructor(
    mat: THREE.MeshBasicMaterial = ptMat,
    shp: THREE.BoxGeometry = ptCube
  ) {
    this.material = mat;
    this.shape = shp;
    this.geometry = new THREE.Mesh(this.shape, this.material);
    this.value = 0;
  }

  color(num: number) {
    this.material.color = new THREE.Color(
      sin(num) * sin(num),
      sin(num + 1) * sin(num + 1),
      sin(num + 2) * sin(num + 2)
    );
  }

  position(pos: Vector3): void {
    this.geometry.position.set(pos.x, pos.y, pos.z);
  }

  positiont(posx: number, posy: number, posz: number): void {
    this.geometry.position.set(posx, posy, posz);
  }

  resize(value: number) {
    this.shape = new THREE.BoxGeometry(value, value, value);
    this.geometry = new THREE.Mesh(this.shape, this.material);
  }
}
