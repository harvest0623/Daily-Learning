const root = {
    val: 'A',
    left: {
        val: 'B',
        left: {
            val: 'D'
        },
        right: {
            val: 'E'
        },
    },
    right: {
        val: 'C',
        right: {
            val: 'F'
        },
    },
};

function inorder(root) {
    if (!root) return;
    inorder(root.left);
    console.log(root.val);
    inorder(root.right);
}

inorder(root);