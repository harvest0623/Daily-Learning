const foo = () => {
    return new Promise((resolve, reject) => {
        // setTimeout(() => {
        //     console.log('foo');
        //     // throw new Error('程序错误')
        //     resolve('foo')
        // }, 1000)
        reject();
    })
}
const bar = () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('bar');
            resolve('bar is ok');
        }, 500);
    })
}
const baz = () => {
    console.log('baz');
}

// foo()
//     .then((res) => {
//         return bar();
//     })
//     .then(
//         (res2) => {
//             baz();
//         }
//     )
//     .catch((err) => {
//         console.log(err);
//     })

foo()
    .then((xx) => {
        return bar();   // P{}
    })
    .then(() => {

    })