/**
 * @description 实现数组的some方法
 * some不会在稀疏数组的空槽上运行
 */
Array.prototype._some = function (fn, thisArgs) {
  const len = this.length;
  for (let i = 0; i < len; i++) {
    // some不会在稀疏数组的空槽上运行
    if (i in this) {
      if (fn.call(thisArgs, this[i], i, this)) return true;
    }
  }
  return false;
};

const res = [-1, , , -2, -3, -4]._some((item) => {
  console.log(item);
  return item > 0;
});
console.log(res);
