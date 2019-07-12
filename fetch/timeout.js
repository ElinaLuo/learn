/**
 * @description 模拟timeout
 */
const _fetch = (function (fetch) {
  return function(url, options) {
    let timeoutPromise = new Promise((resolve, reject) => {
      setTimeout(reject, options.timeout, 'it is timeout!')
    })
    let promise = Promise.race([
      fetch(url, options),
      timeoutPromise
    ])
    return promise
  }
})(fetch)

var url = 'http://m.51ping.com/beautytry/zerohelp/trialturn?channel=16'
const p = _fetch(url, {
  timeout: 1000,
  headers: {
      Cookie: 'ci=10;',// 浏览器紧张修改
      'User-Agent': 'MM12345678'// safari可以，chrome不行
  }
})

p.then(res => {
  console.log(res)
  res.json().then(data => console.log(data))
}, err => {
  console.error(err)
})