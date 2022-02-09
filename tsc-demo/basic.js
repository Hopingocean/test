"use strict";
exports.__esModule = true;
// 基础类型
// 布尔值
var isDown = true;
// 数字
var decLiteral = 6; // 十进制
var hexLiteral = 0xf00d; // 十六进制
var binaryLiteral = 10; // 二进制
var octalLiteral = 484; // 八进制
// 字符串
var name = 'bob';
name = 'smith';
// 数组
var list1 = [1, 2, 3];
var list2 = [1, 2, 3]; // Array<元素类型>
// 元组Tuple
var x;
x = ['hello', 10];
// 枚举
var Color;
(function (Color) {
    Color[Color["Red"] = 1] = "Red";
    Color[Color["Green"] = 2] = "Green";
    Color[Color["Blue"] = 3] = "Blue";
})(Color || (Color = {}));
;
var c = Color.Green; // 2
var colorName = Color[2]; // 'Green'
// Any
var notSure = 4;
notSure = 'xxx';
notSure = 100;
notSure.ifIsExists(); // okay, function is might exist at runtime
notSure.toFixed(); // okay, toFixed exists (but the compiler doesn't check)
var prettySure = 4;
// prettySure.toFixed(); // Error: Propery 'toFixed' doesn't exist on type 'Object'
var listAny = [1, 'xxx', true];
listAny[1] = 100;
// Void，void类型的变量作用不大，因为只能赋值为undefined和null
function warnUser() {
    console.log('This is my warning message');
}
// Undefined和Null作用不大
var u = undefined;
var n = null;
// Never，返回never的函数必须存在无法到达的终点
function error(message) {
    throw new Error('message');
}
function infiniteLoop() {
    while (true) {
    }
    ;
}
// 推断的返回值类型为never
function fail() {
    return error('Something failed');
}
create({ prop: 0 }); // ok
create(null); // ok
// create(100); // Error
// create('100'); // Error
// create(false); // Error
create(undefined); // Error
// 类型判断
var someValue = 'string xxx';
var strLength1 = someValue.length; // 尖括号语法
var strLength2 = someValue.length; // as语法
