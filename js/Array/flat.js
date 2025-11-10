/**
 * @description 实现数组的flat
 */
Array.prototype._flat = function() {
    return this.reduce((pre, cur, index) => {
        return Array.isArray(cur) ? [...pre, ...cur._flat()] : [...pre, cur]
    }, [])
}

let arr = [1, 2, [3, 4], [5, [6, 7]]]
console.log(arr._flat())