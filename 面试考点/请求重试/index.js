function ajax() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            // 生成0-9的随机数
            const random = ~~(Math.random() * 10);
            if (random < 8) {
                console.log('请求失败😭');
                reject('fail');
            } else {
                console.log('请求成功🎉');
                resolve('success');
            }
        }, 1000)
    })
}


// ajax()
//     .then(res => {
//         console.log(res);
//     })
//     .catch(err => {
//         console.log(err);
//     })

function retry(fn, count) {
    // 返回一个新的Promise，统一对外暴露结果
    return new Promise((resolve, reject) => {
        // 封装请求执行逻辑，方便递归调用
        const run = () => {
            fn()
                .then((res) => {
                    // 请求成功：直接resolve结果，结束流程
                    resolve(res);
                    console.log(`终于成了！结果：${res}`);
                })
                .catch((err) => {
                    // 请求失败：先减少重试次数
                    count--;
                    console.log(`还剩${count}次重试机会`);
                    // 还有重试次数：递归调用run，再来一次
                    if (count) {
                        console.log('准备重试...');
                        run();
                    } else {
                        // 次数用完：彻底失败，reject结果
                        reject('重试次数耗尽，请求彻底失败💥');
                    }
                })
        }
        // 首次执行请求
        run();
    })
}

// 调用重试函数：最多重试 3次
retry(ajax, 3)
    .then(res => console.log(`最终结果：${res}`))
    .catch(err => console.log(`最终结果：${err}`));