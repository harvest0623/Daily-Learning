const stack = [];

stack.push('可爱多');
stack.push('巧乐兹');
stack.push('东北大板');
stack.push('小布丁');
stack.push('老布丁');

while(stack.length > 0){
    const top = stack.pop();
    console.log(top);
}