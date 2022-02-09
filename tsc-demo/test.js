;
// 类
var Student = /** @class */ (function () {
    function Student(first, middle, second) {
        this.first = first;
        this.middle = middle;
        this.second = second;
        this.fullname = first + middle + second;
    }
    return Student;
}());
function test(person) {
    return "Person," + person.first + '-' + person.second + '-' + person.fullname;
}
// let user = 'Test';
// let user = {
//   first: '123',
//   second: 123
// };
var user = new Student('123', '456', 123);
document.body.innerHTML = test(user);
