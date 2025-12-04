// const arr = ['a', 'b', 'c', 'd', {age: 18}];
// const arr2 = arr.slice(0);
// arr[4].age = 20;
// console.log(arr2);

// const b = [3, 4];
// const a = [1, 2, {age: 18}];
// let c = [...a];
// a[2].age = 19;
// console.log(c);

// const a = [1, 2, 3, {age: 18}];
// // const b = [4, 5];
// // const c = a.concat(b);
// // console.log(c, a);
// const d = a.concat(); // const d = [].concat(a);
// a[3].age = 19;
// console.log(d);

// const arr = [1, 2, 3];
// const arr2 = arr.reverse().reverse();
// console.log(arr2);
// console.log(arr == arr2);

const arr = [1, 2, 3];
const arr2 = arr.toReversed().reverse();
console.log(arr2, arr);