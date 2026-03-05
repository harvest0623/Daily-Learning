// function Parent() {
//     this.name = '张三';
//     this.play = [1, 2, 3];
// }
// Child.prototype = new Parent()
// function Child() {
//     this.type = '学生';
// }

// const c1 = new Child();
// const c2 = new Child();
// c1.play.push(4);

// console.log(c2.play);

// Parent.prototype.say = function() {
//     console.log('hello');
// }
// function Parent() {
//     this.name = '张三';
//     this.play = [1, 2, 3];
// }
// Child.prototype = new Parent();
// function Child() {
//     Parent.call(this); // this.name = '张三' this.play = [1, 2, 3]
//     this.type = '学生';
// }

// const c1 = new Child();
// const c2 = new Child();
// c1.play.push(4);
// console.log(c2.play);

// Parent.prototype.say = function() {
//     console.log('hello');
// }
// function Parent() {
//     this.name = '张三';
//     this.play = [1, 2, 3];
// }
// Child.prototype = Object.create(Parent.prototype); // {}
// Child.prototype.constructor = Child;

// function Child() {
//     Parent.call(this); 
//     this.type = '学生';
// }

// const c1 = new Child();
// console.log(c1.constructor);

// Parent.prototype.say = function() {
//     console.log('hello');
// }
// Parent.run = function() {
//     console.log('run');
// }
// function Parent() {
//     this.name = '张三';
//     this.play = [1, 2, 3];
// }

class Parent {
    constructor(name) {
        this.name = name;
        this.play = [1, 2, 3];
    }
    say() {
        console.log('hello');
    }
    static run() {
        console.log('run');
    }
}

class Child extends Parent {
    constructor(name) {
        super(name);
        this.type = '学生';
    }
}

const c1 = new Child('李四');
console.log(c1.name);

Surperson.prototype.card = '工牌'
function Surperson() {
  this.company = '字节跳动'
}

Person.prototype = new Surperson();
function Person(name, age, job) {
    Surperson.call(this);
    this.name = name;
    this.age = age;
    this.job = job;
}
const p = new Person('张三', 18, '前端开发');