async function async1() {
  console.log('async1 start');
  new Promise((resolve, reject) => {
    try {
      throw new Error('error1');
    } catch (e) {
      console.log(e.message);
    }
    setTimeout(() => {
      // 宏3
      resolve('promise4');
    }, 3 * 1000);
  })
    .then(
      (res) => {
        // 微3-1
        console.log(res);
      },
      (err) => {
        console.log(err);
      }
    )
    .finally((res) => {
      // 微3-2 // TODO注3
      console.log(res);
    });
  console.log(await async2()); // 微4-1  TODO-注1
  console.log('async1 end'); // 微4-2 // TODO-注2
}

function async2() {
  console.log('async2');
  return new Promise((resolve) => {
    setTimeout(() => {
      // 宏4
      resolve(2);
    }, 1 * 3000);
  });
}

console.log('script start');

setTimeout(() => {
  // 宏2
  console.log('setTimeout');
}, 0);

async1();

new Promise((resolve) => {
  console.log('promise1');
  resolve();
})
  .then(() => {
    // 微1-2
    console.log('promise2');
    return new Promise((resolve) => {
      resolve();
    }).then(() => {
      // 微1-3
      console.log('then 1-1');
    });
  })
  .then(() => {
    // 微1-4
    console.log('promise3');
  });

console.log('script end');

/* 
输出：
宏任务： 宏3 宏4
待进入宏任务的：
微任务： 
script start
async1 start
error1
async2
promise1
script end
promise2
then 1-1
promise3
setTimeout
promise4
undefined
2
async1 end
*/
