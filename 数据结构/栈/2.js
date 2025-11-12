// const arr = ['a','b','c','d'];

// for (let i = 0;i < arr.length; i++){
//     arr[i] = arr[i] + 'o';
// }

// let i = 0;
// while(i < arr.length) {
//     arr[i] = arr[i] + 'o';
//     i++;
// }

// console.log(arr);


const arr = [
    [1,2,3,4,5],
    [1,2,3,4,5],
    [1,2,3,4,5],
    [1,2,3,4,5]
];

for(let i = 0; i < arr.length; i++){
    const innerArr = arr[i];
    for(let j = 0; j < innerArr.length; j++){
        console.log(innerArr[j]);
    }
}