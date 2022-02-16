// 类
class Greeter {
  greeting: string;
  constructor (message: string) {
    this.greeting = message;
  };
  greet() {
    return 'Hello,' + this.greeting;
  }
}
let greeter = new Greeter('world');

// 继承，派生类包含了一个构造函数，它必须调用super,它会执行基类的构造函数；
// 并且在构造函数里访问this属性之前，必须要调用super;
class Animal {
  private name: string;
  public constructor(theName: string) {this.name = theName;};
  public move (distance: number = 0) {
    console.log(`${this.name} moved ${distance}m.`);
  }
}
class Snake extends Animal {
  constructor(name: string) {super(name)};
  move(distance: number = 5) {
    console.log('Slithering...');
    super.move(distance);
  }
}
class Horse extends Animal {
  constructor(name: string) {super(name)};
  move(distance: number = 45) {
    console.log('Galloping...');
    super.move(distance);
  }
}
let sam = new Snake('Sammy the Python');
let tom: Animal = new Horse('Tommy the Palomino');
sam.move();
tom.move(34);
// Slithering...
// Sammy the Python moved 5m.
// Galloping...
// Tommy the Palomino moved 34m.

// 公共public修饰符

// 私有private修饰符
// let cat = new Animal('cat').name; // error, name是私有的
class Rhino extends Animal {
  constructor(name: string) {super(name)};
}
class Employee {
  private name: string;
  constructor(theName: string) {
    this.name = theName;
  };
  public move (distance: number = 0) {
    console.log(`${this.name} moved ${distance}m.`);
  }
}
let animal = new Animal('Goat');
let rhino = new Rhino('Rhino');
let employee = new Employee('Bob');
animal = rhino;
// animal = employee; // error: Animal与Employee不兼容

// 受保护protected修饰符（protected成员在派生类中仍然可以访问）
class Person {
  protected name: string;
  protected constructor(name: string) {
    this.name = name;
  }
}
// Employ能继承Person，不能在Person类外使用name，但是可以通过Employ类的实例去访问，因为Employ是由Person继承而来的。
class Employ extends Person {
  private department: string;
  constructor(name: string, department: string) {
    super(name);
    this.department = department;
  };
  public getInfo() {
    return `my name is ${this.name} and my work is ${this.department}.`;
  }
}
let howard = new Employ('Howard', 'Sales');
// let john = new Person('John'); // 错误：Person的构造函数是被保护的

// readonly修饰符（只读属性必须在声明时或构造函数里被初始化）
class Octopus {
  // readonly name: string;
  readonly numberOfLegs: number = 8;
  constructor(readonly name: string) {
    this.name = name;
  }
}
let otto = new Octopus('xxx');
// otto.name = 'yyy'; // 错误：name属性是只读的

// 参数属性，同上

// 存取器,只有get，没有set的存取器会自动推断为readonly
let password = 'secret password';
class User {
  private _fullName: string;
  get fullName(): string {
    return this._fullName;
  }
  set fullName(newName: string) {
    if (password && password === 'secret password') {
      this._fullName = newName;
    } else {
      console.log('Error password');
    }
  }
}
let user = new User();
user.fullName = 'lee';
if (user.fullName) {
  alert(user.fullName);
}
