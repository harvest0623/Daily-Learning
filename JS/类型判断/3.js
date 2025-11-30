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

// console.log(Object.prototype.toString.call(n)); 
// console.log(Object.prototype.toString.call(nu)); 
// console.log(Object.prototype.toString.call(arr)); 
// console.log(Object.prototype.toString.call(fn)); 

function getType(x) {
    const val = Object.prototype.toString.call(x);
    const valType = val.slice(8, -1); // 截取"[object Type]"中的Type部分
    return valType;
}
console.log(getType(s)); // "String"
console.log(getType(arr)); // "Array"
console.log(getType(date)); // "Date"
console.log(getType(nu)); // "Null" 完美识别null