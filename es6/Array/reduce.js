/**
 * @description 实现数组的reduce方法
 */
Array.prototype._reduce = function(fn, initialValue) {
    const list = initialValue !== undefined ? [initialValue].concat(this) : this
    let res
    let firstIndex = -1
    for(let i = 0; i < list.length - 1; i++) {
        if(this.hasOwnProperty(i)) {
            if(firstIndex === -1) {
                firstIndex = i
                res = list[i]
            }
            res = fn.call(list, res, list[i + 1], i, list)
        }
    }
    return res
}

const res = [1,2,3]._reduce((pre, cur, index, context) => {
    // console.log(pre, cur, index, context);
    return pre + cur
}, 4)
console.log(res);