// import { atan2, sin, cos } from "mathjs";
// import * as THREE from "three";
// export function angle(x: number, y: number, z: number): THREE.Matrix4 {
//   let out: THREE.Matrix4 = new THREE.Matrix4();
//   let zan: number = atan2(y, x);
//   let xan: number = atan2(z, y);
//   let yan: number = atan2(z, x);
//   return mat(xan, yan, zan);
// }

// function mat(xan: number, yan: number, zan: number): THREE.Matrix4 {
//   return new THREE.Matrix4()
//     .set(
//       1,
//       0,
//       0,
//       0,
//       0,
//       cos(xan),
//       sin(xan),
//       0,
//       0,
//       -sin(xan),
//       cos(xan),
//       0,
//       0,
//       0,
//       0,
//       1
//     )
//     .multiply(
//       new THREE.Matrix4()
//         .set(
//           cos(yan),
//           0,
//           -sin(yan),
//           0,
//           0,
//           1,
//           0,
//           0,
//           sin(yan),
//           0,
//           cos(yan),
//           0,
//           0,
//           0,
//           0,
//           1
//         )
//         .multiply(
//           new THREE.Matrix4().set(
//             cos(zan),
//             -sin(zan),
//             0,
//             0,
//             sin(zan),
//             cos(zan),
//             0,
//             0,
//             0,
//             0,
//             1,
//             0,
//             0,
//             0,
//             0,
//             1
//           )
//         )
//     );
// }

// // function mat2(a:number, b:number, c:number){
// //   return new THREE.Matrix4().set(
// //     cos(b)*cos(c),
// //     sin(a)*sin(b)*sin(c)-cos(a)*sin(c),
// //     cos(a)*sin(b)cos(c)
// //   )
// // }
// // dummy.rotation.x = 0;
// // dummy.rotation.y = atan2(
// //   pcode.evaluate(scope),
// //   sqrt(
// //     mcode.evaluate(scope) * mcode.evaluate(scope) +
// //       ncode.evaluate(scope) * ncode.evaluate(scope)
// //   )
// // );
// // dummy.rotation.z = atan2(
// //   ncode.evaluate(scope),
// //   mcode.evaluate(scope)
// // );
