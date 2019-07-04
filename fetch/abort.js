/**
 * @description 模拟abort方法
 */
const _fetch = (function(fetch) {
  return function(url, options) {
    let abort = null
    const abortPromise = new Promise((resolve, reject) => {
      abort = () => {
        reject('abort')
        console.log('abort')
      }
    })
    let promise = Promise.race([
      fetch(url, options),
      abortPromise
    ])
    console.log('abort', abort)
    promise.abort = abort
    return promise
  }
})(fetch)

var url = 'http://m.51ping.com/beautytry/zerohelp/trialturn?channel=16'

const p = _fetch(url)

p.then(res => {
  console.log(res)
  res.json().then(data => console.log(data))
}, err => {
  console.error(err)
})
p.abort()
