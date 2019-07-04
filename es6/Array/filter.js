/**
 * @description 实现数组filter
 */
Array.prototype._filter = function(fn) {
    let arr = []
    const origin = this
    for(let i = 0; i < origin.length; i++) {
        if(origin.hasOwnProperty(i)) {
            fn.call(this, origin[i], i, this) && arr.push(origin[i])
        }
    }
    return arr
}
// 用reduce实现数组filter
Array.prototype._filter2 = function(fn) {
    return this.reduce((pre, cur, index) => {
        return fn.call(this, cur, index, this) ? [...pre, cur] : [...pre]
    }, [])
}

const filterArr = [1, -2, 3, -1]._filter2((item) => {
    return item > 0
})
console.log(filterArr)