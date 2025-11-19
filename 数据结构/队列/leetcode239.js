var maxSlidingWindow = function(nums, k) {
    const len = nums.length;
    const res = [];
    const dque = [];  // 希望是一个递减的队列
    for(let i = 0; i < len; i++){
        // 一个值进队列之前，得先将队列中从后往前依次比较，小的全部出队
        while(dque.length && nums[dque[dque.length - 1]] < nums[i]){
            dque.pop();
        }
        dque.push(i); // 不存当前的值，而是存当前值的下标

        // 当最大值从窗户左侧出去
        while(dque.length && dque[0] <= i - k){
            dque.shift();
        }

        if(i >= k - 1){ // 开始找最大值
            res.push(nums[dque[0]])
        }
    }
    return res;
};