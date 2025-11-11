const PENDING = 'pending';
const FULFILLED = 'fulfilled';
const REJECTED = 'rejected';
export class MyPromise {
  status = PENDING;
  onFulfilledStack = [];
  onRejectedStack = [];
  value = null;
  constructor(executor) {
    try {
      executor(this._resolve.bind(this), this._reject.bind(this));
    } catch (error) {
      // console.log('executor error', error);
      this._reject(error);
    }
  }

  _resolve(value) {
    setTimeout(() => {
      if (this.status !== PENDING) return;
      this.status = FULFILLED;
      this.value = value;
      while (this.onFulfilledStack.length > 0) {
        const cb = this.onFulfilledStack.shift();
        cb(this.value);
      }
    });
  }

  _reject(reason) {
    setTimeout(() => {
      if (this.status !== PENDING) return;
      this.status = REJECTED;
      this.value = reason;
      while (this.onRejectedStack.length > 0) {
        const cb = this.onRejectedStack.shift();
        cb(this.value);
      }
    });
  }

  then(onFulfilled, onRejected) {
    onFulfilled =
      typeof onFulfilled === 'function' ? onFulfilled : (val) => val;
    onRejected =
      typeof onRejected === 'function'
        ? onRejected
        : (val) => {
            throw val;
          };
    return new MyPromise((resolve, reject) => {
      const onFulfilledFn = (val) => {
        try {
          const res = onFulfilled(val);
          if (res instanceof MyPromise) {
            res.then(resolve, reject);
          } else {
            resolve(res);
          }
        } catch (error) {
          console.log('onFulfilledFn error', error);
          reject(error);
        }
      };
      const onRejectedFn = (val) => {
        try {
          const res = onRejected(val);
          if (res instanceof MyPromise) {
            res.then(resolve, reject);
          } else {
            reject(res);
          }
        } catch (error) {
          reject(error);
        }
      };
      switch (this.status) {
        case PENDING:
          this.onFulfilledStack.push(onFulfilledFn);
          this.onRejectedStack.push(onRejectedFn);
          break;
        case FULFILLED:
          onFulfilledFn(this.value);
          break;
        case REJECTED:
          onRejectedFn(this.value);
          break;
      }
    });
  }

  catch(onRejected) {
    return this.then(null, onRejected);
  }

  /**
   * Promise.finally 函数
   * @param {any} cb 回调函数
   * 规则：
   * 1.不管成功还是失败都会执行
   * 2.值透传，当抛出异常时或返回被拒绝的promise时，则新的promise将使用该值进行拒绝
   */
  finally(cb) {
    return this.then(
      (val) => MyPromise.resolve(cb()).then(() => val),
      (val) =>
        MyPromise.resolve(cb()).then(() => {
          throw val;
        })
    );
  }

  static resolve(val) {
    if (val instanceof MyPromise) return val;
    return new MyPromise((resolve) => resolve(val));
  }

  /**
   * try不同于resolve，try的参数是函数，resolve的参数是值
   * 若需要执行如下代码：
   * resolve(fn())
   * try(() => fn())
   * 当fn执行出错时，若使用resolve则promise还未创建就抛出异常了，无法使用promise来捕获异常
   * 而使用try则可以在promise的then/catch中捕获异常
   * 使用场景：接口请求逻辑，一般来说请求接口前会做一些参数准备工作，这期间很有可能出错，使用try就可以统一处理异常
   */
  static try(fn) {
    return new MyPromise((resolve, reject) => {
      try {
        MyPromise.resolve(fn()).then(resolve, reject);
      } catch (error) {
        console.error('内部try捕获了异常：', error.message);
        reject(error);
      }
    });
  }

  static reject(reason) {
    return new MyPromise((resolve, reject) => reject(reason));
  }

  static all(arr) {
    const result = [];
    let count = 0;
    return new MyPromise((resolve, reject) => {
      for (let i = 0, len = arr.length; i < len; i++) {
        MyPromise.resolve(arr[i])
          .then((res) => {
            result[i] = res;
            count++;
            if (count === arr.length) {
              resolve(result);
            }
          })
          .catch(reject);
      }
    });
  }

  static allSettled(arr) {
    const len = arr.length;
    const result = [];
    let count = 0;
    return new MyPromise((resolve, reject) => {
      for (let i = 0; i < len; i++) {
        const cb = () => {
          count++;
          if (count === len) {
            resolve(result);
          }
        };
        MyPromise.resolve(arr[i]).then(
          (value) => {
            result[i] = { status: 'fulfilled', value };
            cb();
          },
          (reason) => {
            result[i] = { status: 'rejected', reason };
            cb();
          }
        );
      }
    });
  }

  static race(arr) {
    return new MyPromise((resolve, reject) => {
      for (let i = 0, len = arr.length; i < len; i++) {
        MyPromise.resolve(arr[i]).then(resolve, reject);
      }
    });
  }
}

MyPromise.prototype.resolvePromise = function (promise2, x, resolve, reject) {
  let self = this;
  let called = false; // called 防止多次调用

  if (promise2 === x) {
    return reject(new TypeError('循环引用'));
  }

  if (
    x !== null &&
    (Object.prototype.toString.call(x) === '[object Object]' ||
      Object.prototype.toString.call(x) === '[object Function]')
  ) {
    // x是对象或者函数
    try {
      let then = x.then;

      if (typeof then === 'function') {
        then.call(
          x,
          (y) => {
            // 别人的Promise的then方法可能设置了getter等，使用called防止多次调用then方法
            if (called) return;
            called = true;
            // 成功值y有可能还是promise或者是具有then方法等，再次resolvePromise，直到成功值为基本类型或者非thenable
            self.resolvePromise(promise2, y, resolve, reject);
          },
          (reason) => {
            if (called) return;
            called = true;
            reject(reason);
          }
        );
      } else {
        if (called) return;
        called = true;
        resolve(x);
      }
    } catch (reason) {
      if (called) return;
      called = true;
      reject(reason);
    }
  } else {
    // x是普通值，直接resolve
    resolve(x);
  }
};

const p = new MyPromise((resolve, reject) => {
  setTimeout(() => {
    resolve(111);
  }, 1000);
  // throw new Error('错误了');
});

const status = 'success';
// const status = 'error';

MyPromise.try(() => {
  // 同步错误
  if (status === 'error') {
    throw new Error('错误了');
  }
  return p;
})
  .then((val) => {
    console.log('成功：', val);
  })
  .catch((error) => {
    console.error('外部try捕获了异常：', error.message);
  });

// p.then(
//   (res) => {
//     console.log(`1111res: ${res}`);
//     return 'success';
//   },
//   (err) => {
//     console.log(`1111error: ${err}`);
//     return 'error';
//   }
// )
//   .finally(() => {
//     console.log('finally');
//     throw new Error('finally error');
//   })
//   .then(
//     (res) => {
//       console.log(`2222res: ${res}`);
//     },
//     (err) => {
//       console.log(`2222error: ${err}`);
//     }
//   );
