let a = 1;
let b = a;

let obj = { 
    age: 18 
};
let obj2 = obj; // obj2存的是obj的地址！
obj.age = 20; 
console.log(obj2.age); // 也变成20了！