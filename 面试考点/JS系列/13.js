console.log(1);
setTimeout(() => {
    console.log(2);
}, 0)
new Promise((resolve, reject) => {
    console.log('new Promise');
    resolve();
}).then(() => {
    console.log('then');
})
console.log(3);