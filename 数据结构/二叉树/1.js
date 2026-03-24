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

function preorder(root) {
    if (!root) return;
    console.log(root.val);
    preorder(root.left);  // un
    preorder(root.right);
}

preorder(root);