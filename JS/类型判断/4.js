// function getBirthYear(ageInput) {
//     // 先判断是否是有效数字
//     if (typeof ageInput !== 'number' || isNaN(ageInput)) {
//         return '请输入正确的数字';
//     }
//     return 2025 - ageInput;
// }

Function.prototype.myCall = function(context, ...args) {
    context = context || window; // 默认上下文是window
    const fn = Symbol('fn'); // 创建唯一的Symbol避免属性冲突
    context[fn] = this; // 将当前函数设为上下文的属性
    const res = context[fn](...args); // 调用函数，此时this指向context
    delete context[fn]; // 清理添加的属性
    return res;
};
function foo(x, y) {
    console.log(this.a, x + y);
    return 'hello';
}
const obj = { 
    a: 1 
};
const res = foo.myCall(obj, 2, 3); // 输出1 5
console.log(res); // 输出hello