class MyPromise {
    constructor(executor) {
        this.state = 'pending';
        this.onFulfilledCallbacks = [];
        this.value = undefined;
        this.onRejectedCallbacks = [];
        this.reason = undefined;

        const resolve = (value) => {
            if (this.state === 'pending') {
                this.state = 'fulfilled';
                this.value = value;
                this.onFulfilledCallbacks.forEach((callback) => callback(value));
            }
        }
        const reject = (reason) => {
            if (this.state === 'pending') {
                this.state = 'rejected';
                this.reason = reason;
                this.onRejectedCallbacks.forEach(callback => callback(reason));
            }
        }

        executor(resolve, reject);
    }

    then(onFulfilled, onRejected) { // 会将 cb 存入onFulfilledCallbacks
        onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : () => { }
        onRejected = typeof onRejected === 'function' ? onRejected : () => { }

        const newPromise = new MyPromise((resolve, reject) => {
            if (this.state === 'fulfilled') {  // resolve 已经先行了
                setTimeout(() => {
                    const result = onFulfilled(this.value);  // bar() 
                    if (result instanceof MyPromise) {
                        result.then((res) => resolve(res), (err) => reject(err));
                    } else {
                        resolve(result);
                    }
                })
            }

            if (this.state === 'rejected') {  // reject 已经先行了
                setTimeout(() => {
                    const result = onRejected(this.reason);  // bar() 
                    if (result instanceof MyPromise) {
                        result.then((res) => resolve(res), (err) => reject(err));
                    } else {
                        resolve(result);
                    }
                })
            }

            if (this.state === 'pending') {
                this.onFulfilledCallbacks.push((value) => {
                    setTimeout(() => {
                        const result = onFulfilled(value);
                        if (result instanceof MyPromise) {
                            result.then((res) => resolve(res), (err) => reject(err));
                        } else {
                            resolve(result);
                        }
                    })
                })
                this.onRejectedCallbacks.push((reasn) => {
                    setTimeout(() => {
                        const result = onRejected(this.reason);
                        if (result instanceof MyPromise) {
                            result.then((res) => resolve(res), (err) => reject(err));
                        } else {
                            resolve(result);
                        }
                    })
                })
            }

        })

        return newPromise;
    }

}

const p = new MyPromise((resolve, reject) => {
    // setTimeout(() => {
    //     resolve('ok')
    // }, 1000)
    resolve('yes');
})
const bar = () => {
    return new MyPromise((resolve, reject) => {
        setTimeout(() => {
            console.log('bar');
            resolve('bar is ok');
        }, 500);
    })
}
p
    .then((res) => {
        console.log(res);
        return bar();
    })
    .then((res2) => {
        console.log(res2);
    })