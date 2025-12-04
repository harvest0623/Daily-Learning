# 进程、线程
- 进程：cpu运行指令加载和保存上下文所需时间
- 线程：cpu执行指令需要的时间

- 比如：浏览器多开一个 tab 页，就是多开一个进程
    1. 渲染线程
    2. js引擎线程
    3. HTTP 请求线程 等等

    - 因为 js 可以修改DOM，所以 js 引擎线程和渲染线程是互斥的

# v8
- v8 在执行 js 的过程中默认只开一个线程
- 只开一个线程就会带来：异步
- 单线程处理代码的过程：遇到同步任务就会立即执行，遇到异步任务就会存放到任务队列中，等待 js 引擎线程空闲时，再执行任务队列中的异步任务

# event-loop
- 微任务：promise.then()，process.nextTick()，MutationObserver
- 宏任务：script，setTimeout()，setInterval()，ajax，I/O，UI-rendering

## 执行顺序
1. 先执行同步代码(这属于宏任务)，这个过程如果遇到异步任务，就存入对应的队列
2. 同步执行完之后，执行微任务队列中的代码
3. 微任务全部结束后，有需要的话就渲染页面
4. 执行宏任务(下一次循环的开始)

# async await
1. 函数前面加一个 async 等同于函数内部返回了一个 promise 实例对象
2. await 必须跟 async 配合使用，并且 await 后面如果不接一个 promise 对象的话，await 便无法约束它
3. await fn()  把 fn() 当成同步看待，是因为 await 会把它后续的代码挤到微任务里面中去