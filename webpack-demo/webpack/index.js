// function require(file) {
//   var exports = {};
//   (function (exports, code) {
//     eval(code);
//   })(exports, 'exports.default = function(a,b){return a + b}');
//   return exports;
// }
// var add = require('add.js').default;
import add from './add.js';
console.log(add(1, 2));