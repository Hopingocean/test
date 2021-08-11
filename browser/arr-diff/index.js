import CN from './zh-CN.js'
import US from './en-US.js'
console.log(CN);
console.log(US);
var arr1 = [];
var arr2 = [];
function getKeys (obj, arr) {
  for (var key in obj) {
    if (typeof obj[key] == 'string') {
      let kv = {
        k: key,
        v: obj[key]
      }
      arr.push(kv);
    } else {
      getKeys(obj[key], arr);
    }
  }
}
getKeys(CN, arr1);
getKeys(US, arr2);
console.log(arr1);
console.log(arr2);
// 取数组差集
// var newArr1 = new Set(arr1);
// var newArr2 = new Set(arr2);
function getArrDiff (newArr1, newArr2) {
  let a1 = newArr1.filter(arr1 => {
    return !newArr2.find(arr2 => arr2.k === arr1.k);
  });
  let a2 = newArr2.filter(arr2 => {
    return !newArr1.find(arr1 => arr1.k === arr2.k);
  });
  let arr = a1.concat(a2);
  let obj = {};
  arr.forEach(item => {
    obj[item.k] = item.v;
  });
  console.log(arr);
  console.log(obj);
}
getArrDiff(arr1, arr2);