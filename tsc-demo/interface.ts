// 接口interface
// 可选属性
interface SquareConfig {
  color: string;
  width?: number;
}
function createSquare(config: SquareConfig): {color: string; area: number} {
  let newSquare = {color: "white", area: 100};
  if (config.color) {
    newSquare.color = config.color;
  }
  if (config.width) {
    newSquare.area = config.width * config.width;
  }
  return newSquare;
}
let mySquare = createSquare({color: 'black'});

// 只读属性
interface Point {
  readonly x: number;
  readonly y: number
}
let p1: Point = {x: 10, y: 20}; // 只能在对象创建时赋值
let a: number[] = [1, 2, 3, 4];
let ro: ReadonlyArray<number> = a; // 把所有可变方法去除，确保数组创建后不可修改
// error
// ro[0] = 12;
// ro.push(5);
// ro.length = 10;
// a = ro;
// 如果希望将数组赋值给一个普通数组，可以使用类型断言重写
a = ro as number[];

// 额外的属性检查
let mySquareExtra = createSquare({color: 'xxx', b: 100} as SquareConfig); // 使用类型断言跳过检查
interface SquareConfigExtra {
  color?: string;
  width?: number;
  [propName: string]: any;
} // 最佳方法是添加一个字符串索引签名
let squareOptions = {color: 'xxx', b: 100}; // 将对象赋值给另一个变量
let mySquareExtra1 = createSquare(squareOptions);

// 函数类型(定义参数列表和返回值类型)
interface SearchFunc {
  (source: string, subString: string): boolean;
}
let mySearch: SearchFunc;
mySearch = function (src: string, sub: string): boolean {
  let result = src.search(sub);
  return result > -1;
}

// 可索引的类型
interface StringArray {
  [index: number]: string;
}
let myArray: StringArray;
myArray = ['bob', 'fred'];
let myStr: string = myArray[0];

interface ReadonlyStringArray {
  readonly [index: number]: string;
}
let myReadonlyArray: ReadonlyStringArray;
myReadonlyArray = ['xxx', 'yyy'];
// myReadonlyArray[2] = 'zzz'; // error

// 类类型，实现接口
// interface ClockInterface {
//   currentTime: Date;
//   setTime(d: Date);
// }
// class Clock implements ClockInterface {
//   currentTime: Date;
//   setTime(d: Date) {
//       this.currentTime = d;
//   };
//   constructor(h: number, m: number) {}
// }

interface ClockConstructor {
  new (hour: number, minute: number): ClockInterface;
}
interface ClockInterface {
  tick();
}
function createClock(ctor: ClockConstructor, hour: number, minute: number): ClockInterface {
  return new ctor(hour, minute);
}
class DigitalClock implements ClockInterface {
  constructor(h: number, m: number) {};
  tick() {
    console.log('beep beep');
  }
}
class AnalogClock implements ClockInterface {
  constructor(h: number, m:number) {};
  tick() {
    console.log('tick tock');
  }
}
let digital = createClock(DigitalClock, 12, 17);
let analog = createClock(AnalogClock, 7, 32);

// 继承接口
interface Shape {
  color: string;
}
interface PenStroke {
  penWidth: number;
}
interface Square extends Shape, PenStroke {
  sideLength: number;
}
let square = <Square>{};
square.color = 'blue';
square.penWidth = 5;
square.sideLength = 10;

// 混合类型
interface Counter {
  (start: number): string;
  interval: number;
  reset():void;
}
function getCounter(): Counter {
  let counter = <Counter>function (start: number) {};
  counter.interval = 123;
  counter.reset = function () {};
  return counter;
}
let c = getCounter();
c(10);
c.reset();
c.interval = 5;

// 接口继承类
class Control {
  private state: any;
}

interface SelectableControl extends Control {
  select(): void;
}

class Button extends Control implements SelectableControl {
  select(): void {
      
  }
}

class TextBox extends Control {
  select() {};
}
// error, Image类型缺少state属性
// class Image implements SelectableControl {
//   select(): void {
      
//   }
// }

// class Location {};
