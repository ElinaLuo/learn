/**
 * @description 实现数组filter
 * filter() 将跳过空槽
 */
Array.prototype._filter = function (fn, thisArg) {
  let arr = [];
  const len = this.length;
  for (let i = 0; i < len; i++) {
    // filter() 将跳过空槽
    if (i in this) {
      fn.call(thisArg, this[i], i, this) && arr.push(this[i]);
    }
  }
  return arr;
};

const filterArr = [1, -2, 3, -1]._filter((item) => {
  return item > 0;
});
console.log(filterArr);
