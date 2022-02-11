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
