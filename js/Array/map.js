/**
 * @description 数组map
 * 稀疏数组map后仍然是稀疏的
 */
Array.prototype._map = function (fn, thisArgs) {
  const res = [];
  // 循环一开始就已经确定了遍历次数
  const len = this.length;
  for (let i = 0; i < len; i++) {
    // 稀疏数组在使用map后仍然是稀疏的，所以这里判断一下
    if (i in this) {
      res[i] = fn.call(thisArgs, this[i], i, this);
    }
  }
  return res;
};

const obj = {
  a: 1,
};

const arr = [1, 2, 3, -1];

const test = {
  a: 2222,
  run() {
    //箭头函数传入thisArgs没用，因为箭头函数没有自己的this, apply/call/bind都无法改变this
    const mapArr = arr._map((item, index, arr) => {
      arr.push(4 + index);
      return item + this.a;
    }, obj);
    console.log(arr);
    console.log(mapArr);
  },
};

test.run();
