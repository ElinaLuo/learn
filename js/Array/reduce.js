/**
 * @description 实现数组的reduce方法
 * reduce会跳过稀疏数组中缺失的元素
 */
Array.prototype._reduce = function (fn, initialValue) {
  if (initialValue === undefined && this.length === 0)
    throw new TypeError('Reduce of empty array with no initial value');
  if (initialValue === undefined && this.length === 1) return this[0];
  if (initialValue === undefined) {
    initialValue = this[0];
  }
  let temp = initialValue;
  for (let i = initialValue === undefined ? 1 : 0; i < this.length; i++) {
    // reduce会跳过稀疏数组中缺失的元素
    if (i in this) {
      temp = fn(temp, this[i], i, this);
    }
  }
  return temp;
};

const arrOnlyOne = [5];
const arr = [1, , , , 2, 3, 4, 5];
const callback = (pre, cur, index, context) => {
  //   console.log(pre, cur, index, context);
  return pre + cur;
};
console.log(arr.reduce(callback, 0));
console.log(arr._reduce(callback, 0));
console.log('只有一条数据且没有初始值的情况');
console.log(arrOnlyOne.reduce(callback, 10));
console.log(arrOnlyOne._reduce(callback, 10));
