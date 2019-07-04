/**
 * @description 实现数组的some方法
 */
Array.prototype._some = function(fn) {
    let result = []
    for(let i = 0; i < this.length; i++) {
        if(this.hasOwnProperty(i)) {
            if(fn.call(this, this[i], i, this)) return true
        }
    }
    return false
}

const res = [-2, -3, -1]._some((item) => {
    return item > 0
})
console.log(res)