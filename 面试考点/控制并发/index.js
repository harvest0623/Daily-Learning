function ajax(time) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if(time > 5000) {
                reject('请求失败')
            } else {
                resolve('请求成功')
            }
        }, time)
    })
}

// ajax(10000);
// ajax(8000);
// ajax(1000);
// ajax(4000);
// ajax(3000);
// ajax(7000);

class Limit {
    constructor(parallCount = 2) {
        this.tasks = [];  // 存放任务的队列
        this.runningCount = 0;  // 正在运行中的任务数
        this.parallCount = parallCount;
    }

    add(task) {
        return new Promise((resolve, reject) => {
            this.tasks.push({
                task,
                resolve,
                reject
            });
            this._run();
        }) 
    }

    _run() {
        if (this.runningCount < this.parallCount && this.tasks.length) {
            const [task, resolve, reject] = this.tasks.shift();
            this.runningCount++;
            task().then(resolve, reject).finally(() => {
                this.runningCount--;
                this._run();
            });
        }
    }
}

let limit = new Limit(2);

function addTask(time, index) {
    limit
    .add(() => ajax(time))
    .then(() => {
        console.log(`任务${index}完成`);
    })
    .catch(() => {
        console.log(`任务${index}失败`);
    })
}

addTask(10000, 1);
addTask(4000, 2);
addTask(8000, 3);
addTask(1000, 4);
addTask(5000, 5);
addTask(2000, 6);