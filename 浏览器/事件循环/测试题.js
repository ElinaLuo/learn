async function async1() {
  console.log("async1 start");
  await async2();
  console.log("async1 end");
}
async function async2() {
  console.log("async2");
}
console.log("script start");
setTimeout(() => {
  console.log("setTimeout");
}, 0);
requestAnimationFrame(() => {
  console.log("requestAnimationFrame"); // raf既不属于宏任务也不属于微任务，第一次调用会在所有微任务结束后立即执行，如果后续还有raf回调，才会真正同步到刷新率
});
async1();
new Promise(resolve => {
  console.log("promise1");
  resolve();
}).then(() => {
  console.log("promise2");
});
console.log("script end");


// 输出结果
// script start
// async1 start
// async2
// promise1
// script end
// async1 end
// promise2
// requestAnimationFrame
// setTimeout