const root = {
    val: 1,
    right: {
        val: 2,
        left: {
            val: 3
        }
    }
};

// 栈   右 左 根   
// 根入栈    现存先取    
// 判断取到的栈顶的节点有没有右子树

var preorderTraversal = function (root) {
    if (!root) return [];
    const res = [];
    const stack = [];
    let cur = root;
    while (cur || stack.length) {
        while (cur) {
            stack.push(cur);
            cur = cur.left;
        }

        cur = stack.pop();
        res.push(cur.val);
        cur = cur.right;
    }
    return res;
};

console.log(preorderTraversal(root));