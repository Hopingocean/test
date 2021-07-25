/**
 * 栈：只有一个入口，没有出口，先进后出原则。
 * 1.创建全局上下文，将其压入栈底
 * 2.调用addAll函数，生成addAll函数执行上下文并压入栈中
 * 3.调用add函数，生成add函数执行上下文并压入栈中
 * 4.执行add函数后将add函数执行上下文从栈顶弹出
 * 5.执行addAll函数后，addAll函数的执行上下文从栈顶弹出
 * 6.只剩下全局上下文
 * 当分配的调用栈空间被占满时，会引发‘堆栈溢出’问题
 */
var a = 1;
function add (b, c) {
    // console.trace();
    return b + c;
}
function addAll (b, c) {
    var d = 4;
    result = add(b, c);
    return a + result + d;
}
addAll(2, 3);

// 解决斐波那切数列栈溢出问题
function runStack (n) {
    if (n === 0) return 0;
    if (n === 1) return 1;
    return runStack(n - 1) + runStack(n - 2);
}
runStack(50000);

// 存储变量值，减少函数调用
function testStack (n) {
    let arr = [0, 1];
    return function (n) {
        let result = arr[n];
        if (typeof result !== "number") {
            result = testStack(n - 1) + testStack(n - 2);
            arr[n] = result;
        }
        return result;
    }
}
testStack(50000)
// 递推法
function testStack1 (n) {
    let cur = 0;
    let next = 1;
    let temp;
    for (let i = 0; i < n; i++) {
        temp = cur;
        cur = next;
        next += temp;
    }
    return cur;
}
testStack1(50000)
// 尾调用
function testStack2 (n, cur = 0, next = 1) {
    if (n == 0) return 0;
    if (n === 1) return next;
    return testStack2(n - 1, next, cur + next);
}
testStack2(50000)
