// 红绿黄 各自亮的时长为 3s，2s，1s

function setColor(color, time) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(color);
        }, time);
        console.log(color, `等${time/1000}秒`);
    })
}

// 方法一：使用 async/await 实现
// async function run() {
//     while(true) {
//         await setColor('红', 3000);
//         await setColor('绿', 2000);
//         await setColor('黄', 1000);
//     }
// }
// run();


// 方法二：递归调用实现
// function run() {
//     setColor('红', 3000).then(() => {
//         setColor('绿', 2000).then(() => {
//             setColor('黄', 1000).then(() => {
//                 run();
//             })
//         })
//     })
// }
// run();


// 方法三：定义完整的灯序执行函数
// function lightSequence() {
//     return setColor('红', 3000)
//         .then(() => setColor('绿', 2000))
//         .then(() => setColor('黄', 1000));
// }
// // 按总时长（6秒）循环执行灯序
// setInterval(lightSequence, 6000);
// // 立即执行一次，避免首次等待6秒
// lightSequence();


// 方法四：生成器函数定义灯序
function* lightGenerator() {
    while(true) {
        yield setColor('红', 3000);
        yield setColor('绿', 2000);
        yield setColor('黄', 1000);
    }
}
// 自动执行生成器的函数
async function runGenerator() {
    const gen = lightGenerator();
    for await (const step of gen) {
        // 自动迭代执行每个灯的任务
    }
}
runGenerator();