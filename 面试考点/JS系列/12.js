// const arr = [];
// arr.toString();  // ''

// arr.__proto__   // Array.prototype
// arr.__proto__.__proto__   // Array.prototype.__proto__  // Object.prototype


// Function.prototype.mycall = function (context) {
//     context.fn = this;
//     context.fn();  // foo 的 this  指向 context
// }
// function foo() {
//     console.log(this.a);
// }
// var obj = {
//     a: 1,
//     // fn: foo
// }
// // obj.fn();
// foo.mycall(obj);

// const arr = [];
// Object.prototype.toString.call(arr);

// arr.fn = xxxxx;
// arr.toString();

// const arr = [];
// const fn = function() {};

// function Person() {
//     this.name = '张三';
// }
// const p = new Person();

// console.log(p.constructor === Object);

const arr = [];
arr.isArray();  // true