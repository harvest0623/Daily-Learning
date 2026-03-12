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
function run() {
    setColor('红', 3000).then(() => {
        setColor('绿', 2000).then(() => {
            setColor('黄', 1000).then(() => {
                run();
            })
        })
    })
}
run();