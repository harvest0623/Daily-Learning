const arr = [
    1, 2, 3, 1, 2,
    { name: 'henry', age: 18 },
    { name: 'henry', age: 20, like: { a: 'game' } },
    { name: 'henry', age: 20, like: { a: 'game' } }
];

function unique(arr) {
    let res = [];
    for (let i = 0; i < arr.length; i++) {
        let isFind = false;
        for (let j = 0; j < res.length; j++) {   // arr[i]== 1
            if (equals(arr[i], res[j])) {
                isFind = true;
                break;
            }
        }
        if (!isFind) {
            res.push(arr[i]);
        }
    }
    return res;
}

function equals(v1, v2) {
    if ((typeof v1 === 'object' && v1 !== null) && (typeof v2 === 'object' && v2 !== null)) {
        // 两个对象的键值对的个数是否一致
        if (Object.keys(v1).length !== Object.keys(v2).length) {
            return false;
        }
        // 判断 key-value 是否一一对应
        for (let key in v1) {
            if (v2.hasOwnProperty(key)) {  // v2 里面是否也有一个 key 为 name
                if (!equals(v1[key], v2[key])) { // 子对象开启递归
                    return false;
                }
            } else {
                return false;
            }
        }
        return true;
    } else {
        return v1 === v2;
    }
}
console.log(unique(arr));