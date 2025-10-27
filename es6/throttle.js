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


function debounce(fn, wait, { leading = false, trailing = true } = {}) {
  let timeoutId = null
  const cancel = function () {
    clearTimeout(timeoutId)
    timeoutId = null
  }
  const debounced = function (...args) {
    clearTimeout(timeoutId)

    if (timeoutId === null && leading) {
      fn.apply(this, args)
    }
    timeoutId = setTimeout(() => {
      if (trailing) {
        fn.apply(this, args)
      }
      cancel()
    }, wait)
  }

  debounced.cancel = cancel
  return debounced
}
function throttle(fn, wait, options = {}) {
  let previous = 0
  const debouncedFn = debounce(fn, wait, options)

  return function (...args) {
    debouncedFn.apply(this, args)
    if (Date.now() - previous >= wait) {
      debouncedFn.cancel()
      previous = Date.now()
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