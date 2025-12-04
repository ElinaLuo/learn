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
    if (this.status !== PENDING) return;
    this.status = FULFILLED;
    this.value = value;
    while (this.onFulfilledStack.length > 0) {
      const cb = this.onFulfilledStack.shift();
      cb(this.value);
    }
  }

  _reject(reason) {
    if (this.status !== PENDING) return;
    this.status = REJECTED;
    this.value = reason;
    while (this.onRejectedStack.length > 0) {
      const cb = this.onRejectedStack.shift();
      cb(this.value);
    }
  }

  then(onFulfilled, onRejected) {
    // console.log('then方法', onFulfilled, onRejected);
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
        // 加入到微任务队列中
        queueMicrotask(() => {
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
        });
      };
      const onRejectedFn = (val) => {
        // 加入到微任务队列中
        queueMicrotask(() => {
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
        });
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

setTimeout(() => {
  console.log(5);
});
new MyPromise((resolve) => {
  resolve(4);
  MyPromise.resolve().then(() => console.log(3));
  console.log(1);
}).then((t) => console.log(t));
console.log(2);
