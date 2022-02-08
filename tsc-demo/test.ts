// 接口
interface Person {
  first: string;
  second: number;
};

// 类
class Student {
  fullname: string;
  constructor(public first, public middle, public second) {
    this.fullname = first + middle + second;
  }
}

function test(person: Person) {
  return "Person," + person.first + '-' +person.second;
}

// let user = 'Test';

// let user = {
//   first: '123',
//   second: 123
// };

let user = new Student('123', '456', 123);

document.body.innerHTML = test(user);
