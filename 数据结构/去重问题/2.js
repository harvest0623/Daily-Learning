const arr = [1, 2, 3, 1, 2];
function unique(arr) {
    const newArr = [];
    for (let item of arr) {
        if (!newArr.includes(item)) {
            newArr.push(item);
        }
    }
    return newArr;
}
console.log(unique(arr));