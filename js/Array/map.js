/**
 * @description 用reduce实现数组map
 */
Array.prototype._map = function (fn) {
  return this.reduce((pre, cur, index) => {
    return [...pre, fn.call(this, cur, index, this)];
  }, []);
};

const mapArr = [1, 2, 3, -1]._map((item) => {
  return item + 1;
});
// console.log(mapArr);

class testMap {
  count = 200;
  run() {
    const obj = { count: 100 };
    let oldArr = [1, 2, 3];

    const newArr = oldArr.map((item, index, arr) => {
      //   oldArr.push(oldArr.length);
      oldArr[index + 1] = 10 + item;
      //   oldArr = [...oldArr, oldArr.length];
      console.log(item, index, arr, arr === oldArr);
      return this.count + item;
    }, obj);

    console.log('newArr=', newArr);
  }
}

new testMap().run();
