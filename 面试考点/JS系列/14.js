// function add(a, b) {
//     return a + b;
// }
// add(1, 2);
// const addCurry = curry(add);
// addCurry(1)(2);

// function ajax(method, url, data) {
//     const xhr = new XMLHttpRequest();
//     xhr.open(method, url);
//     xhr.send(data);
// }
// ajax('POST', 'www.test.com', 'name=张三');
// ajax('POST', 'www.test.com', 'name=李四');
// ajax('POST', 'www.test.com', 'name=王五');

// const ajaxPOST = curry(ajax);
// const post = ajaxPOST('POST');
// const postTest = post('www.test.com');
// postTest('name=张三');
// postTest('name=李四');
// postTest('name=王五');

// const curry = function (fn, ...args) {
//     return function (...args2) {
//         const newArgs = [...args, ...args2];
//         return fn(...newArgs);
//     }
// }

// function add(a, b) {
//     return a + b;
// }

// add(1, 2);
// addCurry = curry(add);
// addCurry(1)(2);

// const sub_curry = function (fn, ...args) {
//     return function (...args2) {
//         const newArgs = [...args, ...args2];
//         return fn(...newArgs);
//     }
// }

// function curry(fn, length) {
//     length = length || fn.length;
//     return function (...args) {
//         if (args.length < length) {  // 一定还要有下一层 return
//             const combined = [fn, ...args];
//             return (sub_curry(...combined), length - args.length);
//         } else {
//             return fn(...args);
//         }
//     }
// }


function sub_curry(fn, ...args) {   // sub_curry()
    return function (...args2) {  // sub_curry 没调用一次，就帮 fn 接受了一个参数，并存放在了 fn
        return fn(...args, ...args2);
    }
}

function curry(fn, length) {
    length = length || fn.length;
    return function (...args) {
        if (length > 1) {
            return curry(sub_curry(fn, ...args), length - 1)  // 1
        } else {
            return fn(...args)
        }
    }
}

function add(a, b, c) {
    return a + b + c;
}
const test = curry(add);
console.log(test(1)(2)(3));