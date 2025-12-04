console.log(1);
setTimeout(() => {
    console.log(2);
    setTimeout(() => {
        console.log(3);
    }, 1000)
}, 0)
setTimeout(() => {
    console.log(4);
}, 2000)
console.log(5);