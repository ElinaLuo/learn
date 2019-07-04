/**
 * @description 用reduce实现数组map
 */
Array.prototype._map = function(fn) {
    return this.reduce((pre, cur, index) => {
        return [...pre, fn.call(this, cur, index, this)]
    }, [])
}

const mapArr = [1, 2, 3, -1]._map((item) => {
    return item + 1
})
console.log(mapArr)