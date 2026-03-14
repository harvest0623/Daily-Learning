const arr = [1, [2, [3]]];

function flattenArr(target) {
    while (target.some((item) => Array.isArray(item))) {
        target = [].concat(...target);  // [1, 2, 3]
    }
    return target;
}

console.log(flattenArr(arr));