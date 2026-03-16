let obj = {
    ok: 'ok',
    // err: 'err'
}

function test() {
    if (obj.err) {
        return Promise.reject(obj)
    } else {
        return Promise.resolve(obj)
    }
}


test()
    .then((res1) => {
        console.log(res1, '1111');

    }, (res2) => {
        console.log(res2);
    })