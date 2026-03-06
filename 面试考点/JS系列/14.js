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

const sub_curry = function (fn, ...args) {
    return function (...args2) {
        const newArgs = [...args, ...args2];
        return fn(...newArgs);
    }
}

function curry(fn, length) {
    length = length || fn.length;
    return function (...args) {
        if (args.length < length) {
            const combined = [fn, ...args];
            return (sub_curry(...combined), length - args.length);
        } else {
            return fn(...args);
        }
    }
}