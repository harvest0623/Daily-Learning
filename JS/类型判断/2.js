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

// console.log(typeof n);    // "number"
// console.log(typeof s);    // "string"
// console.log(typeof f);    // "boolean"
// console.log(typeof u);    // "undefined"
// console.log(typeof sy);   // "symbol"
// console.log(typeof big);  // "bigint"
// console.log(typeof nu);   // 注意这里！返回"object"而不是"null"
// console.log(typeof arr);  // "object"
// console.log(typeof obj);  // "object"
// console.log(typeof date); // "object"
// console.log(typeof fn);   // "function" 只有函数被正确识别


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
// console.log(n instanceof Number);    // false

console.log(arr instanceof Object); // true 
// 因为 Array.prototype.__proto__ === Object.prototype

// console.log(n instanceof Number); // false
// console.log(s instanceof String); // false
// console.log(u instanceof Object);