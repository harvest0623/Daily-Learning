const arr = [1, 2, 3, 4, 5];

// concat 增：合并数组，返回新数组，不改变原数组
// const newArr = arr.concat(4);
// console.log(arr, newArr);

// slice 删：截取数组，返回新数组，不改变原数组
// const newArr = arr.slice(1, 4);
// console.log(newArr);

// filter 删：筛选数组，返回新数组，不改变原数组
// const newArr = arr.filter((item, index, array) => {
//     return item % 2 === 0;
// });
// console.log(arr, newArr);

// map 改：映射数组，返回新数组，不改变原数组
// const newArr = arr.map((item, index, array) => {
//   return item * 10
// })
// console.log(newArr);

// fill 改：填充数组，返回新数组，不改变原数组
// const newArr = new Array(5).fill(0);
// console.log(newArr);

// find 查：查找数组，返回第一个符合条件的元素，不改变原数组
// const newArr = arr.find((item, index, array) => {
//   return item === 6
// })

// findIndex 查：查找数组，返回第一个符合条件的元素的索引，不改变原数组
// const newArr = arr.findIndex((item, index, array) => {
//   return item === 6
// })
// console.log(newArr);

// includes 查：判断数组是否包含某个元素，返回布尔值，不改变原数组
// const index = arr.includes(2)
// console.log(index);

// toReversed 查：反转数组，返回新数组，不改变原数组
// console.log(arr.toReversed().reverse());

// sort 改：排序数组，返回新数组，不改变原数组
// console.log(arr.sort((a, b) => {
//   return b - a
// }));

// join 查：将数组元素连接成字符串，返回字符串，不改变原数组
// console.log(arr.join(''));

// const num = arr.reduce((pre, item, index, array) => {
//   return pre + item
// }, 0)

// console.log(num);

// reduce 查：累加数组元素，返回累加值，不改变原数组
// const num = arr.reduce((pre, item, index, array) => {
//   return pre + item
// }, 0)
// console.log(num);

// every 查：判断数组是否所有元素都符合条件，返回布尔值，不改变原数组
// const has = arr.every((item, index, array) => {
//   return item > 0
// })
// console.log(has);

// findLastIndex 查：查找数组，返回最后一个符合条件的元素的索引，不改变原数组
// const has = arr.findLastIndex((item, index, array) => {
//   return item === 1
// })
// console.log(has);

// copyWithin 改：复制数组元素，返回新数组，不改变原数组
const has = arr.copyWithin(0, 3)
console.log(has);