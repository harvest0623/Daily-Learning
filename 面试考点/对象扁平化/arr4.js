const arr = [1, [2, [3]]];

function flattenArr(target) {
    return target.reduce((pre, item) => {
        return pre.concat(Array.isArray(item) ? flattenArr(item) : item);
    }, [])
}

console.log(flattenArr(arr));