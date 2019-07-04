
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

/**
 * @description 先序遍历
 * 中 左 右
 */
function preOrder(tree) {
    if(!tree) return
    console.log(tree.val)
    tree.left && preOrder(tree.left)
    tree.right && preOrder(tree.right)
}
/**
 * @description 中序遍历
 * 左 中 右
 */
function inOrder(tree) {
    if(!tree) return
    tree.left && inOrder(tree.left)
    console.log(tree.val)
    tree.right && inOrder(tree.right)
}
/**
 * @description 后序遍历
 * 左 右 中
 */
function postOrder(tree) {
    if(!tree) return
    tree.left && postOrder(tree.left)
    tree.right && postOrder(tree.right)
    console.log(tree.val)
}
/**
 * @description 层次遍历
 * 无法区分出层级
 */
function layerOrder(tree) {
    let queue = [tree]
    let res = []
    while(queue.length !== 0) {
        const temp = queue.shift()
        res.push(temp.val)
        temp.left && queue.push(temp.left)
        temp.right && queue.push(temp.right)
    }
    console.log(res);
}
let layer = 0, result = []
/**
 * @description 层次遍历
 * 能区分层级
 */
function layerOrder2(tree) {
    next([tree])
    console.log(layer, result)
}
// 核心逻辑是将一层的节点全部放到 nextQueue 里，然后递归处理，再将里面的每一个子节点放到下一个 nextQueue 里
function next(queue) {
    if(queue.length === 0) return
    let nextQueue = []
    layer++
    while(queue.length !== 0) {
        const temp = queue.shift()
        result.push(temp.val)
        temp.left && nextQueue.push(temp.left)
        temp.right && nextQueue.push(temp.right)
    }
    next(nextQueue)
}

console.log('先序遍历');
preOrder(tree)
console.log('中序遍历');
inOrder(tree)
console.log('后序遍历');
postOrder(tree)
console.log('层序遍历(无层级)');
layerOrder(tree)
console.log('层序遍历(有层级)');
layerOrder2(tree)

