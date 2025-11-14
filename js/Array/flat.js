/**
 * @description 实现数组的flat
 */
Array.prototype._flat = function (depth = 1) {
  return this.reduce((prev, cur) => {
    if (Array.isArray(cur) && depth > 0) {
      prev.push(...cur._flat(depth - 1));
    } else {
      prev.push(cur);
    }
    return prev;
  }, []);
};

let arr = [1, 2, [3, 4], [5, [6, [7, 8, [9]]]]];
console.log(arr._flat(1));
console.log(arr._flat(3));
console.log(arr._flat(4));
