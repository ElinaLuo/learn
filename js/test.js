class MyPromise {
  status = 'pending';
  stack = [];
  constructor(fn) {
    fn(this.resolve.bind(this), this.reject.bind(this));
  }

  resolve(value) {
    if (this.status !== 'pending') return;
    this.status = 'fulfilled';
    this.value = value;
  }

  reject(reason) {
    if (this.status !== 'pending') return;
    this.status = 'rejected';
    this.reason = reason;
  }
}

// MyPromise.prototype.resolve = function (value) {
//   if (value instanceof MyPromise) {
//     return value;
//   }
//   return MyPromise.resolve(value);
// };

MyPromise.prototype.then = function (onSuccess, onFail) {
  this.stack.push([onSuccess, onFail]);
  console.log(this.stack);
  return this;
};

function test() {
  return new MyPromise((resolve, reject) => {
    setTimeout(() => {
      resolve(1);
    }, 1000);
  });
}

test()
  .then((res) => {
    console.log('1--', res);
  })
  .then((res) => {
    console.log('2--', res);
  })
  .then((res) => {
    console.log('3--', res);
  });
