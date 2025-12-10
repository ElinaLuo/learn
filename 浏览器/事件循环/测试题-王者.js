Promise.resolve()
  .then(() => {
    console.log('promise1');
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        console.log('timer2');
        resolve();
      }, 0);
    })
      .then(async () => {
        console.log('1111111-0');
        await foo();
        return new Error('error1');
        /**
         * 等同于如下代码：
         *
         */
        return Promise.resolve(foo()).then(() => {
          return new Error('error1');
        });
      })
      .then(
        (ret) => {
          console.log('22222', ret.message);
          setTimeout(() => {
            console.log('-------', ret.message);
            Promise.resolve()
              .then(() => {
                return new Error('error!!!');
              })
              .then((res) => {
                console.log('then22222: ', res.message);
              })
              .catch((err) => {
                console.log('catch2222: ', err.message);
              });
          }, 1 * 3000);
        },
        (err) => {
          console.log(33333);
          console.log(err.message);
        }
      )
      .finally((res) => {
        console.log('finally-', res);
        throw new Error('error2');
      })
      .then(
        (res) => {
          console.log(res);
        },
        (err) => {
          console.log(err.message);
        }
      );
  })
  .then(() => {
    console.log('promise2');
  });

async function foo() {
  setTimeout(() => {
    console.log('async1');
  }, 2 * 1000);
}
function foo1() {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log('async1');
      resolve();
    }, 2 * 1000);
  });
}

setTimeout(() => {
  console.log('timer1');
  Promise.resolve().then(() => {
    console.log('promise3');
  });
}, 0);

console.log('start');
