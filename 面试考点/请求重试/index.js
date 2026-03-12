function ajax() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const random = ~~(Math.random() * 10);
            if (random < 8) {
                console.log('请求失败');
                reject('fail');
            } else {
                console.log('请求成功');
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
    return new Promise((resolve, reject) => {
        const run = () => {
            fn()
                .then((res) => {
                    console.log(res);
                })
                .catch((err) => {
                    count--;
                    if(count) {
                        run();
                    } else {
                        reject(err);
                    }
                })
        }
        run();
    })
}
retry(ajax, 3)
    .then(res => {
        console.log(res);
    })
    .catch(err => {
        console.log(err);
    })