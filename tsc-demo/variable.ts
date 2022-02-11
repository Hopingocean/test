// let声明，块作用域在包含它们的块或for循环之外是不能被访问的，且不能在声明前读或写。
function f(input: boolean) {
  let a = 100;
  if (input) {
    let b = a + 1;
    return b;
  }
  // return b; // Error:b is not exist here
}

// 重定义及屏蔽(通常来讲应该避免屏蔽，因为我们需要写出清晰的代码，同时也有一些场景需要利用它)
function sumMatrix(matrix: number[][]) {
  let sum = 0;
  for (let i = 0; i < matrix.length; i++) {
    var currentRow = matrix[i];
    for (let i = 0; i < currentRow.length; i++) {
      sum += currentRow[i];
    }
  }
  return sum;
}

// 块级作用域变量的获取（每次进入块级作用域时，它会创建一个变量的环境）
for (let i = 0; i < 10; i++) {
  setTimeout(() => {console.log(i)}, i); // 0,1,2,3,4,5,6,7,8,9
}

// const声明（它们拥有与let相同的作用域规则，但不能被重新赋值）
const kitty = {
  name: 'leeo',
  num: 1
}

// 数组解构
let [first, ...second] = [1, 2, 3, 4];

// 对象解构
let o = {a: 1, b: 'xxx'};
let {a: aTest, b: bTest} = o; // let aTest = o.a; let bTest = o.b

// 函数声明
function f1({a, b = 0} = {a: ""}): void {

}
f1({a: "yes"}); // ok, default b = 0;
f1(); // ok, default to {a: ""}, which then defaults b = 0
// f1({}); // error, 'a' is required if you supply an argument

// 展开，展开操作创建一份浅拷贝，它们不会被展开操作所改变
let arr1 = [3, 4];
let arr2 = [1];
let bothArr = [0, ...arr1, ...arr2];
// 对象展开仅包含自身的可枚举属性，方法会丢失
// TypeScript编译器不允许展开繁泛型函数上的类型参数
class C {
  p: 12;
  m () {}
}
let c = new C();
let clone = {...c};
clone.p; // ok
// clone.m(); // error
