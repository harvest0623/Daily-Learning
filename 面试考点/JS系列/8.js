Person.prototype.job = '前端开发';
function Person(name, age) {
    this.name = name;
    this.age = age;
}

const p1 = new Person('张三', 18);