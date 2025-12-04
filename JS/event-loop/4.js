console.log('script start');
async function async1() {
    await async2()
    console.log('async1 end');
}
async function async2() {
    console.log('async2 end');
}
async1();
setTimeout(() => {
    console.log('setTimeout');
}, 0)
new Promise((resolve, reject) => {
    console.log('promise');
    resolve()
})
.then(() => {
    console.log('then1');
})
.then(() => {
    console.log('then2');
});
console.log('script end');