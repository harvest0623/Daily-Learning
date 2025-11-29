let n = 123;
let s = 'hello';
let f = true;
let u = undefined;
let nu = null;
let sy = Symbol(1);
let big = 123123123n;

let arr = [];
let obj = {};
let fn = function() {}
let date = new Date();

// function addKey(obj, key, val) {
//     if(obj是一个对象){

//     }
//     obj[key] = val;
// }
// const object = {};
// addKey(object, 'age', 19);
// console.log(object);

// console.log(arr instanceof Array);   // true
// console.log(obj instanceof Object);  // true
// console.log(date instanceof Date);   // true
// console.log(fn instanceof Function); // true

// console.log(n instanceof Number); // false
// console.log(s instanceof String); // false
// console.log(u instanceof Object);

console.log(arr instanceof Object); // Array.prototype.__proto__ == Object.prototype