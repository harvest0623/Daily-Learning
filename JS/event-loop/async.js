// function a() {
//     return new Promise((resolve,reject) => {
//         setTimeout(() => {
//             console.log('a');
//             resolve();
//         }, 1000)
//     })
// }
// function b() {
//     console.log('b');
// }
// a().then(() => {
//     b()
// })

function a() {
    return new Promise((resolve,reject) => {
        setTimeout(() => {
            console.log('a');
            resolve();
        }, 1000)
    })
}
function b() {
    console.log('b');
}
async function foo() {
    await a();  // 当成同步看待
    b();
}
foo();