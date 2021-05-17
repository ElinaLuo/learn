/**
 * @description 模拟实现热更新 参考 https://juejin.im/post/5e1c59ec5188254d90329a95
 */
const fs = require('fs');
const path = require('path');
const lib = require('./lib');


console.log(lib());

const targetFile = path.resolve('hotdeloy/lib.js');
console.log(targetFile);

// 加载指定文件的代码
const loadHandler = filename => {
  return new Promise((resolve, reject) => {
    fs.readFile(filename, (err, data) => {
      if (err) {
        resolve(null);
      } else {
        // 编译通过后，重新require加载最新的代码
        resolve(require(filename));
      }
    });
  });
};
// console.log(require.cache);
fs.watchFile(targetFile, async (curr, prev) => {
  // 清除指定路径对应模块的require.cache缓存
  require.cache[targetFile] = null;
  await loadHandler(targetFile);
  const lib = require('./lib');
  // 这时候会加载新文件
  console.log(lib());
});


