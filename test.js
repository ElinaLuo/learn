function timeout2(p, timeout = 1000) {
  return new Promise((resolve, reject) => {
    setTimeout(reject, timeout);
    p.then(res => resolve(res)).catch(e => reject(e));
  })
}

function timeout(promise, delay = 1000) {
  return Promise.race([
    promise,
    new Promise((resolve, reject) => setTimeout(() => reject('timeout'), delay))
  ]);
}



async function test() {
  const p = new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(123);
    }, 2000);
  });
  try {
    await timeout(p);
  } catch (error) {
    if (error === 'timeout') {
      console.log('超时了');
    }    
  }
}
test()