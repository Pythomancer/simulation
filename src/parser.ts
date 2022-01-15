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
