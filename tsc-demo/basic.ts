export {};
// 基础类型
// 布尔值
let isDown: boolean = true;

// 数字
let decLiteral: number = 6; // 十进制
let hexLiteral: number = 0xf00d; // 十六进制
let binaryLiteral: number = 0b1010; // 二进制
let octalLiteral: number = 0o744; // 八进制

// 字符串
let name: string = 'bob';
name = 'smith';

// 数组
let list1: number[] = [1, 2, 3];
let list2: Array<number> = [1, 2, 3]; // Array<元素类型>

// 元组Tuple
let x: [string, number];
x = ['hello', 10];

// 枚举
enum Color {Red = 1, Green, Blue};
let c: Color = Color.Green; // 2
let colorName: string = Color[2]; // 'Green'

// Any
let notSure: any = 4;
notSure = 'xxx';
notSure = 100;
notSure.ifIsExists(); // okay, function is might exist at runtime
notSure.toFixed(); // okay, toFixed exists (but the compiler doesn't check)

let prettySure: Object = 4;
// prettySure.toFixed(); // Error: Propery 'toFixed' doesn't exist on type 'Object'

let listAny: any[] = [1, 'xxx', true];
listAny[1] = 100;

// Void，void类型的变量作用不大，因为只能赋值为undefined和null
function warnUser(): void {
  console.log('This is my warning message');
}

// Undefined和Null作用不大
let u: undefined = undefined;
let n: null = null;

// Never，返回never的函数必须存在无法到达的终点
function error(message: string): never {
  throw new Error('message');
}
function infiniteLoop(): never {
  while(true) {
  };
}
// 推断的返回值类型为never
function fail() {
  return error('Something failed');
}

// Object,非原始类型,除number，string，boolean，symbol，null或undefined之外的类型
declare function create(o: object | null): void;
create({prop: 0}); // ok
create(null); // ok
// create(100); // Error
// create('100'); // Error
// create(false); // Error
create(undefined); // Error

// 类型判断
let someValue: any = 'string xxx';
let strLength1: number = (<string>someValue).length; // 尖括号语法
let strLength2: number = (someValue as string).length; // as语法

