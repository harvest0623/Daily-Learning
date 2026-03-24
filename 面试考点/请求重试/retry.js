function retry(fn, count, delay = 1000) {
    return new Promise((resolve, reject) => {
        const run = () => {
            fn()
                .then(res => {
                    resolve(res);
                    console.log(`终于成了！结果：${res}`);
                })
                .catch(err => {
                    count--;
                    console.log(`还剩${count}次重试机会`);
                    if (count) {
                        console.log(`等待${delay}ms后重试...`);
                        // 延迟重试
                        setTimeout(run, delay);
                    } else {
                        reject('重试次数耗尽，请求彻底失败💥');
                    }
                })
        }
        run();
    })
}