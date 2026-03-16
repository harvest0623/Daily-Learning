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

    catch(onRejected) {
        return this.then(undefined, onRejected);
    }

    static race(promises) {
        return new MyPromise((resolve, reject) => {
            for (let promise of promises) {
                promise.then(
                    (res) => {
                        resolve(res);
                    },
                    (err) => {
                        reject(err);
                    }
                )
            }
        })
    }

    static all(promises) {
        return new MyPromise((resolve, reject) => {
            const arr = [];
            for (let i = 0; i < promises.length; i++) {
                const p = promises[i];
                p.then(
                    (res) => {
                        arr[i] = res;
                        if (promises.length === arr.length) {
                            resolve(arr);
                        }
                    },
                    (err) => reject(err)
                )
            }
        })

    }

    static any(promises) {
        return new MyPromise((resolve, reject) => {
            let results = [];
            for (let i = 0; i < promises.length; i++) {
                const p = promises[i];
                p.then(
                    (res) => {
                        resolve(res);
                    },
                    (err) => {
                        results[i] = err;
                        if (results.length == promises.length) {
                            reject(results);
                        }
                    }
                )
            }
        })
    }

    finally(callback) {
        return this.then(
            () => callback(),
            () => callback()
        );
    }

    static allSettled(promises) {
        const promiseArray = Array.from(promises);
        const result = [];
        let count = 0;
        return new Promise((resolve) => {
            promiseArray.forEach((promise, index) => {
                promise.then(
                    (res) => {
                        result[index] = { status: 'fulfilled', value: res }
                    },
                    (err) => {
                        result[index] = { status: 'rejected', reason: err }
                    }
                ).finally(() => {
                    count++;
                    if (result.length === promises.length) {
                        resolve(result);
                    }
                })
            });
        });
    }

    static resolve(val) {
        return new MyPromise((resolve) => {
            resolve(val);
        })
    }
}

const foo = () => {
    return new MyPromise((resolve, reject) => {
        setTimeout(() => {
            reject('foo no');
        }, 1000)
    })
}

const bar = () => {
    return new MyPromise((resolve, reject) => {
        setTimeout(() => {
            reject('bar no');
        }, 500)
    })
}

const baz = () => {
    return new MyPromise((resolve, reject) => {
        setTimeout(() => {
            resolve('baz');
        }, 1500)
    })
}

MyPromise.any([foo(), bar(), baz()])
    .then((res) => {
        console.log(res);
    }, err => {
        console.log(err);
    })