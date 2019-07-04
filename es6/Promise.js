const PENDING = 'pending';
const FULFILLED = 'fulfilled';
const REJECTED = 'rejected';

function MyPromise(executor) {
    let self = this
    self.state = PENDING
    self.value = null
    self.reason = null
    self.onFulfilledCallbacks = []
    self.onRejectedCallbacks = []

    function resolve(value) {
        if(self.state == PENDING) {
            self.state = FULFILLED
            self.value = value
            self.onFulfilledCallbacks.forEach(cb => {
                cb()
            })
        }
    }

    function reject(reason) {
        if(self.state == PENDING) {
            self.state = REJECTED
            self.reason = reason

            self.onRejectedCallbacks.forEach(cb => {
                cb(self.reason)
            })
        }
        
    }

    try {
        executor(resolve, reject)
    } catch (error) {
        reject(error)
    }
}

MyPromise.prototype.then = function(onFuifilled, onRejected) {
    let self = this
    let promise2 = null
    
    promise2 = new MyPromise((resolve, reject) => {
        if(self.state == PENDING) {
            self.onFulfilledCallbacks.push(function() {
                try {
                    let x = onFuifilled(self.value)
                    resolve(x)
                    // self.resolvePromise(promise2, x, resolve, reject)
                } catch (reason) {
                    reject(reason)
                }
            })
            self.onRejectedCallbacks.push(function() {
                try {
                    let x = onRejected(self.reason)
                    resolve(x)
                } catch (reason) {
                    reject(reason)
                }
            })
        }
        if(self.state == FULFILLED) {
            try {
                let x = onFuifilled(self.value)
                resolve(x)
            } catch (reason) {
                reject(reason)
            }
            
        }
        if(self.state == REJECTED) {
            try {
                let x = onRejected(self.reason)
                resolve(x)
            } catch (reason) {
                reject(reason)
            }
        }
    })

    return promise2
}

MyPromise.prototype.resolvePromise = function(promise2, x, resolve, reject) {
    let self = this;
    let called = false;   // called 防止多次调用
  
    if (promise2 === x) {
        return reject(new TypeError('循环引用'));
    }
  
    if (x !== null && (Object.prototype.toString.call(x) === '[object Object]' || Object.prototype.toString.call(x) === '[object Function]')) {
        // x是对象或者函数
        try {
            let then = x.then;
    
            if (typeof then === 'function') {
                then.call(x, (y) => {
                    // 别人的Promise的then方法可能设置了getter等，使用called防止多次调用then方法
                    if (called) return ;
                    called = true;
                    // 成功值y有可能还是promise或者是具有then方法等，再次resolvePromise，直到成功值为基本类型或者非thenable
                    self.resolvePromise(promise2, y, resolve, reject);
                }, (reason) => {
                    if (called) return ;
                    called = true;
                    reject(reason);
                });
            } else {
                if (called) return ;
                called = true;
                resolve(x);
            }
        } catch (reason) {
            if (called) return ;
            called = true;
            reject(reason);
        }
    } else {
        // x是普通值，直接resolve
        resolve(x);
    }
};
  

let p = new MyPromise((resolve, reject) => {
    setTimeout(() => {
        reject(111)
        return 'error msg'
    }, 1000)
})

p.then(res => {
    console.log(`1111res: ${res}`)
    return 'success'
}, err => {
    console.log(`1111error: ${err}`)
    return 'error'
}).then(res => {
    console.log(`2222res: ${res}`)
}, err => {
    console.log(`2222error: ${err}`)
})