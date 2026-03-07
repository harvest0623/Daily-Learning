function add(a, b) {
    return a + b;
}
// add(100, 200);

function cache(fn) {
    let memory = {};   // {'100,200': 300}
    return (...args) => {  // [100, 200]
        if (!memory[args]) {
            memory[args] = fn(...args);
        }
        return memory[args];
    }
}

const calc = cache(add);
calc(100, 200);  // 计算得到300
calc(100, 200);  // 直接输出 300， 不用计算