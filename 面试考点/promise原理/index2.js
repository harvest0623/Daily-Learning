const foo = () => {
    setTimeout(() => {
        console.log('foo')
    }, 1000)
}

const bar = () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('bar');

            reject('bar no')
        }, 500)
    })
}

const baz = () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            reject('baz no')
        }, 1500)
    })
}

// Promise.race([foo(), bar(), baz()])
//     .then((res) => {
//         console.log(res);
//     })
//     .catch(err => {
//         console.log(err);
//     })

// Promise.any([foo(), bar(), baz()])
//     .then((res) => {
//         console.log(res);
//     })
//     .catch(err => {
//         console.log(err);
//     })

// foo()
//     .then(
//         () => { },
//         (err) => {
//             console.log(err)
//         }
//     )
//     .finally(() => {
//         console.log('finally');
//     })

// Promise.allSettled([foo(), bar(), baz()])
//     .then((res) => {
//         console.log(res);
//     })

// console.log(Promise.resolve());

Promise.resolve(foo())