let s = "()[]{}";

var isValid = function(s) {
    const obj = {
        '()' : 1,
        '[]' : 1,
        '{}' : 1
    };
    // 循环这个字符串，将每一个字符取到
    // 当取到左括号，就入栈
    // 当取到右括号，就将栈顶的元素取出，和当前的右括号匹配
    const stack = [];
    const len = s.length;
    for(let i = 0; i < len; i++){
        const ch = s[i];
        if (ch == '(' || ch == '[' || ch == '{'){
            stack.push(ch);
        } else{  // 右括号
            const top = stack.pop();
            const match = top + ch;
            if(obj[match] !== 1){
                return false;
            }
        }
    }
    return stack.length == 0;
};