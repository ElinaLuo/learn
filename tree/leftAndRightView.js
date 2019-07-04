const tree = {
    val: 1,
    left: {
        val: 2,
        left: {
            val: 4,
            left: {
                val: 5
            }
        }
    },
    right: {
        val: 3,
        left: {
            val: 6,
            left: {
                val: 8
            }
        },
        right: {
            val: 7
        }
    }
}

let leftResult = []
let rightResult = []
/**
 * @description 树的左视图/右视图
 * @param {Object} tree 
 */
function leftAndRightView(tree) {
    leftResult.push(tree.val)
    rightResult.push(tree.val)
    next([tree])
    console.log(leftResult, rightResult);
}
function next(queue) {
    if(queue.length === 0) return
    let nextQueue = []
    while(queue.length !== 0) {
        const temp = queue.shift()
        temp.left && nextQueue.push(temp.left)
        temp.right && nextQueue.push(temp.right)
    }
    // 左视图
    nextQueue.length && leftResult.push(nextQueue[0].val)
    // 右视图
    nextQueue.length && rightResult.push(nextQueue[nextQueue.length - 1].val)
    next(nextQueue)
}

console.log('左视图', '右视图');
leftAndRightView(tree)