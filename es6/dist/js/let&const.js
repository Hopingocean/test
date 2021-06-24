'use strict';

/*二、let和const命令*/

/*A.let命令*/
/*只在let命令所在的代码块内有效*/
var a = [];

var _loop = function _loop(i) {
  a[i] = function () {
    console.log(i);
  };
};

for (var i = 0; i < 10; i++) {
  _loop(i);
}
a[6](); // 6
// 使用let声明变量i，当前的i只在本轮循环内有效，所以每一次循环的i都是一个新的变量，最后输出6.
// Q：如果每一轮循环的变量i都是重新声明的，那么它怎么知道上一轮循环的值，从而计算出本轮循环的值？
// A：JavaScript引擎内部会记住上一轮循环的只，初始化本轮的变量i时，是在上一轮循环的基础上进行计算。

for (var i = 0; i < 3; i++) {
  var i = 'abc';
  console.log(i);
}
// abc
// abc
// abc

// Tips:for循环有一个特别之处，就是循环语句部分是一个父作用域，而循环体内部是一个单独的子作用域。
// 上面代码输出了3次abc，这表明函数内部的变量i和外部的变量i是分离的。

/*2.不存在变量提升*/
// let命令改变了语法行为，它所生命的变量一定要在声明后使用，否则报错
console.log(foo); // 输出undefined
var foo = 2; // var 的情况

console.log(bar); // 报错ReferenceError
var bar = 2; // let 的情况

/*3.暂时性死区*/
// 只要块级作用域内存在let命令，它所声明的变量就绑定这个区域，不再受外部影响
var tmp = 123;
if (true) {
  _tmp = 'abc'; // ReferenceError
  var _tmp = void 0;
}
// Tips:ES6明确规定，如果区块中存在let和const命令，这个区块对这些命令声明的变量，从一开始就形成了封闭作用域，凡是在声明之前就使用这些变量，就会报错。

/*4.不允许重复声明*/
// let不允许在相同的作用域内，重复声明同一个变量

/*B.块级作用域*/
// 1.ES6的块级作用域
function f1() {
  var n = 5;
  if (true) {
    var _n = 10;
  }
  console.log(n); // 5
}
// 内层作用域可以定义外层作用域的同名变量
{
  {
    var insane = 'Hello World';
    {
      var _insane = 'Hello World';
    }
  }
}
// 块级作用域的出现，实际上使得获得广泛应用的立即执行函数表达式（IIFE）不再必要了
// IIFE写法
(function () {
  var tmp = '';
})();
// 块级作用域写法
{
  var _tmp2 = '';
}
// 块级作用域与函数声明
/*如果改变了块级作用域内声明的函数的处理规则，显然会对老代码产生很大影响。为了减轻因此产生的不兼容问题，ES6在附录B里面规定，浏览器的实现可以不遵守上面的规定，有自己的行为方式。
-允许在块级作用域内声明函数。
-函数声明类似于var，即会提升到全局作用域或函数作用域的头部。
-同时，函数声明还会提升到所在的块级作用域的头部。
注意，上面三条规则只对 ES6 的浏览器实现有效，其他环境的实现不用遵守，还是将块级作用域的函数声明当作let处理。*/
// 考虑到环境导致的行为差异太大，应该避免在块级作用域内声明函数。如果确实需要，也应该写成函数表达式，而不是函数声明语句
// 函数声明语句
{
  var f = function f() {
    return _a;
  };

  var _a = 'secret';
}
// 函数表达式
{
  var _a2 = 'secret';
  var _f = function _f() {
    return _a2;
  };
}
// do表达式
// let x = do {
//   let t = f();
//   t * t + 1;
// };
// 提案：在块级作用域之前加上do，使它变为do表达式，使得块级作用域可以变为表达式，也就是说可以返回值。
// 上面代码中，变量x会得到整个块级作用域的返回值。

/*3.const命令*/
// const声明的变量不得改变值，这意味着，const一旦声明变量，就必须立即初始化，不能留到以后赋值。
var PI = 3.1415;
// 其他和let声明的变量一致。

/*4.顶层对象属性*/
// 顶层对象，在浏览器环境指window对象，在node指的是global对象
// ES5中顶层对象的属性与全局变量是等价的
window.a = 1;
a; // 1
a = 2;
window.a; // 2
// ES6规定，为了保持兼容性，var命令和function命令声明的全局变量，依旧是顶层对象的属性。let命令、const命令、class命令声明的全局变量，不属于顶层对象的属性。
var a = 1;
// 如果在Node的REPL环境，可以写成global.a
// 或者采用通用方法，写成this.a
window.a; // 1

var b = 1;
window.b; // undefined
// 全局变量a由var命令声明，所以它是顶层对象的属性，全局变量b由let命令声明，所以它不是顶层对象属性，返回undefined。

/*5.global对象*/