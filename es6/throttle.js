/**
 * @description 函数节流
 * @param {Function} fn 方法
 * @param {Number} delay 延迟时间
 * @param {Object} context 上下文
 */
function throttle(fn, delay, context) {
  let previous = 0
  let timeout = null
  const ctx = context || this

  return function() {
    if(timeout) {
      return
    }
    const args = arguments
    let after = Date.now()

    const handle = function() {
      fn.call(ctx, args)
      timeout = null
      previous = Date.now()
    }

    if(after - previous >= delay) {
      handle()
    } else {
      timeout = setTimeout(handle, delay)
    }
  }
}

// 模拟手动每隔5s触发
const intervalID = setInterval(throttling(function(e) {
  console.log('--- handle ---', e)
}, 1000), 5)

// 避免死循环
setTimeout(() => {
  clearInterval(intervalID)
}, 3000)