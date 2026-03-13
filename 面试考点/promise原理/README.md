# then
1. 默认返回一个 Promise 对象，它的状态跟随 then 前面的那个 Promise 的状态一起变更
2. then 的回调中返回了一个 promise 对象，那么 then 中的 promise 的状态就会跟随自身回调的那个 promise 对象的状态变更