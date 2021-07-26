/**
 * 变量提升
 * 在JavaScript执行过程中，JavaScript引擎把变量的声明部分和函数的声明部分提升到代码开头的行为。
 * 变量被提升后，变量会被设置默认值，即undefined。
 * 编译阶段：执行上下文（Execution context，如变量声明、函数定义，生成变量环境对象）和可执行代码（其他代码）。
 * 执行阶段：JavaScript引擎在变量环境对象中查找指定变量或函数定义。
 */

showName();
console.log(name);
var name = '变量提升';
function showName () {
    console.log('函数声明提升');
}
// 一段代码中存在同名函数时，变量环境对象中只会存在最后一个函数
function showName () {
    console.log('同名函数声明提升');
}

// 测试
// testName();
var testName = function() {
    console.log(2);
}
function testName () {
    console.log(1);
}

// let const var
/**
 * let会生成块级作用域，只能在当前作用域内使用
 */
function foo () {
    var a = 1;
    let b = 2;
    {
        let b = 3;
        var c = 4;
        let d = 5;
        console.log(a); // 1
        console.log(b); // 3
    }
    console.log(b); // 2
    console.log(c); // 4
    console.log(d); // di is not defined
}
foo();