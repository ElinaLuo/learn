/**
 * @description 实现数组的flat
 * @param {Number} depth 深度
 * flat会删除稀疏数组中的空槽
 */
Array.prototype._flat = function (depth = 1) {
  if (depth === Infinity) {
    depth = Number.MAX_SAFE_INTEGER;
  }
  return this.reduce((prev, cur) => {
    if (Array.isArray(cur) && depth > 0) {
      prev.push(...cur._flat(depth - 1));
    } else {
      prev.push(cur);
    }
    return prev;
  }, []);
};

// 等价于调用map后再调用深度为1的flat
Array.prototype._flatMap = function (cb, thisArg) {
  return this.reduce((prev, curr, index, arr) => {
    const res = cb.call(thisArg, curr, index, arr);
    return prev.concat(Array.isArray(res) ? res : [res]);
  }, []);
};

// const arr = [1, 2, , , , , [3, 4], [5, [6, [7, 8, [9]]]]];
const arr = [1, 2, ['a', 'b']];
console.log(arr._flat(1));
console.log(arr._flatMap((num) => num + 1));
// console.log(arr._flat(3));
console.log('全部拍平', arr._flat(Infinity));
