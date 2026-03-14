const arr = [1, [2, [3]]];

function flattenArr(target) {
    let res = [];
    for (let item of target) {
        if (Array.isArray(item)) {
            res = res.concat(flattenArr(item));
        } else {
            res.push(item);
        }
    }
    return res;
}

console.log(flattenArr(arr));