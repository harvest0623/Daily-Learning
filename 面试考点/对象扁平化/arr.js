const arr = [1, [2, [3]]];
function flattenArr(arr) {
    let res = [];
    function dfs(target) {
        for (let item of target) {
            if (Array.isArray(item)) {
                res.push(...flattenArr(item));
            } else {
                res.push(item);
            }
        }
    }
    dfs(arr);
    return res;
}
console.log(flattenArr(arr));