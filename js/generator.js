function* myGenerator() {
  yield '1';
  console.log('1');
  yield '2';
  console.log('2');
  try {
    yield new Promise((resolve, reject) => {
      setTimeout(() => {
        reject('3333333');
      }, 1000);
    });
    // 使用g.throw()抛出错误，类似于在这里插入一个throw exception
    console.log('这里执行不了');
  } catch (error) {
    console.log('捕获到错误', error);
  }
  console.log('前面虽然异常了，但是这里还是可以执行');
  return '4';
}

// const gen = myGenerator(); // 获取迭代器
// console.log(gen.next()); //{value: "1", done: false}
// console.log(gen.next()); //{value: "2", done: false}
// console.log(gen.next()); //{value: "3", done: false}
// console.log(gen.next()); //{value: "4", done: true}

// 实现async/await
function run(gen) {
  return new Promise((resolve, reject) => {
    const g = gen();
    function _next(value, isError = false) {
      let res;
      // 错误处理
      try {
        // 这里使用Generator.prototype.throw()抛出错误而不用reject
        // 是因为异常场景使用reject抛出异常无法被外部try...catch捕获，而throw会在生成器主体当前暂停的位置插入一个throw exception，该错误可以被捕获
        res = g[isError ? 'throw' : 'next'](value);
      } catch (err) {
        return reject(err);
      }
      if (res.done) {
        return resolve(res.value);
      }
      Promise.resolve(res.value).then(
        (val) => _next(val),
        (err) => _next(err, true)
      );
    }
    _next();
  });
}

run(myGenerator)
  .then((val) => console.log('myGenerator执行结束，结果=', val))
  .catch((err) => console.error('myGenerator执行结束，异常=', err));
