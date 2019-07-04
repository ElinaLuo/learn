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
 * @description 镜像树
 * @param {Object} tree 
 */
function mirror(tree) {
    if(!tree) return
    [tree.left, tree.right] = [tree.right, tree.left]
    mirror(tree.left)
    mirror(tree.right)
}

mirror(tree)
console.log(tree)
console.log(JSON.stringify(tree))