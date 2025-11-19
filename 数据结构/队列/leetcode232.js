var MyQueue = function() {
    this.stack1 = [];
    this.stack2 = [];
};

MyQueue.prototype.push = function(x) {
    this.stack1.push(x);
};

MyQueue.prototype.pop = function() {
    // 栈1 元素倒到 栈2，再从栈2取值
    if(this.stack2.length == 0){
        while(this.stack1.length > 0){
            const top = this.stack1.pop();
            this.stack2.push(top);
        }
    }
    return this.stack2.pop();
};

MyQueue.prototype.peek = function() {
    if(this.stack2.length == 0){
        while(this.stack1.length > 0){
            const top = this.stack1.pop();
            this.stack2.push(top);
        }
    }
    return this.stack2[this.stack2.length - 1];
};

MyQueue.prototype.empty = function() {
    return !this.stack1.length && !this.stack2.length;
};

const queue = new MyQueue(); // {}
queue.push();