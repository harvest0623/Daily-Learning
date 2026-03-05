// Object.prototype.e = 123;
// const obj  = {
//     a: 1,
//     b: 2,
//     c: []
// };
// const oo = {
//     d: 3
// };

// for (const key in obj) {
//     console.log(key);
// }

// Object.assign({}, obj);

// const newObj = {
//     a: 1,
//     b: 2,
//     c: obj.c
// }


// function shallowCopy(obj) {
//     const newObj = {};
//     for (const key in obj) {
//         if (obj.hasOwnProperty(key)) {
//             newObj[key] = obj[key];
//         }
//     }
//     return newObj;
// }

// const obj2 = shallowCopy(obj);
// obj.c.push('hello');
// console.log(obj2);

// const obj = {
//     a: new Map([['a', 1]]),
//     b: 2,
//     c: [],
//     d: undefined,
//     e: null,
//     g: 123n
// }

// const obj2 = JSON.parse(JSON.stringify(obj));
// const obj2 = structuredClone(obj);
// obj.c.push('hello');
// console.log(obj2);

// function deepCopy(obj) {
//     return new Promise((resolve, reject) => {
//         const {port1, port2} = new MessageChannel();
//         port1.postMessage(obj);
//         port2.onmessage = (e) => {
//             resolve(e.data);
//         }
//     })
// }

// deepCopy(obj).then(res => {
//     obj.c.push('hello');
//     console.log(res);
// })


function deepCopy(obj) {
    if (obj === null) return obj;
    if (obj instanceof Date) return new Date(obj);
    if (obj instanceof RegExp) return new RegExp(obj);
    if (typeof obj !== 'object') return obj;

    let cloneObj = new obj.constructor();  // {}  []  Map{}  Set{}

    if (obj instanceof Map) {
        obj.forEach((value, key) => {
            cloneObj.set(key, deepCopy(value));
        })
    } else if (obj instanceof Set) {
        obj.forEach(value => {
            cloneObj.add(deepCopy(value));
        })
    } else {
        for (const key in obj) {
            if (obj.hasOwnProperty(key)) {
                cloneObj[key] = deepCopy(obj[key]);
            }
        }
    }
    return cloneObj;
}

const obj2 = deepCopy(obj); 
// obj.c.push('hello');
console.log(obj2);

// {
//   obj: {},
//   new Map([['a', 1]]): new Map()
// }