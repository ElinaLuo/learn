// import { watch } from 'vue'
// import debounce from 'lodash/debounce.js'

function _now() {
  return Date.now()
}
/**
 * 防抖
 * @param {Function} fn
 * @param {Number} wait
 * @param {Object} options
 * @param {Boolean} options.leading 节流开始时是否执行，默认为 false
 * @param {Boolean} options.trailing 节流结束后是否执行，默认为 true
 * @param {Number} maxWait 最大延迟时间，仅用于throttle
 * @returns
 */
export function myDebounce(fn, wait, options) {
  let timeoutId
  let lastCallTime = 0
  let lastInvokeTime = 0
  let lastArgs
  let lastThis
  let maxWait
  let maxing = false
  const { leading = false, trailing = true } = options || {}
  maxing = 'maxing' in options
  maxWait = maxing ? Math.max(options.maxWait, wait) : maxWait

  function shouldInvoke(time) {
    return (
      lastCallTime === 0 || // 第一次调用
      time - lastCallTime >= wait || // 调用间隔超过 wait
      (maxWait && time - lastInvokeTime >= maxWait) // 实际执行间隔超过 maxWait
    )
  }

  // 执行函数
  function invokeFunc(time) {
    lastInvokeTime = time
    fn.apply(lastThis, lastArgs)
  }

  // 节流开始执行函数
  function leadingEdge(time) {
    timeoutId = setTimeout(timeExpired, wait)
    if (leading) {
      invokeFunc(time)
    }
  }
  // 节流结束执行函数
  function trailingEdge(time) {
    if (trailing) {
      invokeFunc(time)
    }
    cancel()
  }

  // 计算剩余等待时间
  function remainingWait(time) {
    // 上次调用时间距离当前时间
    const timeSinceLastCall = time - lastCallTime
    // 防抖剩余等待时间
    const timeWaiting = wait - timeSinceLastCall
    return maxing ? Math.min(timeWaiting, maxWait - (time - lastInvokeTime)) : timeWaiting
  }

  // 定时器执行函数
  function timeExpired() {
    const time = _now()
    // 第一次或者已经过了等待时间，触发 trailingEdge，不需要设置定时器
    if (shouldInvoke(time)) {
      return trailingEdge(time)
    }
    // 计算剩余时间，重置定时器
    timeoutId = setTimeout(timeExpired, remainingWait(time))
  }
  function cancel() {
    clearTimeout(timeoutId)
    timeoutId = undefined
    lastCallTime = 0
  }
  function debounced(...args) {
  // console.log(...args);
    const time = _now()
    const isInvoking = shouldInvoke(time)
    lastCallTime = time
    lastArgs = args
    lastThis = this
    if (isInvoking) {
      if (timeoutId === undefined) {
        return leadingEdge(time)
      }
    }
    if (timeoutId === undefined) {
      timeoutId = setTimeout(timeExpired, wait)
    }
  }
  debounced.cancel = cancel
  return debounced
}

export function watchDebounced(source, cb, options) {
  const watch = import('vue').watch
  const { leading, trailing, wait, maxWait, ...watchOptions } = options
  watch(source, myDebounce(cb, options.wait, { leading, trailing, wait, maxWait }), watchOptions)
}

// const useLodash = false
// console.log('useLodash', useLodash ? 'lodash' : 'myDebounce');

// const fn = (useLodash ? debounce : myDebounce)(
//   (msg) => {
//     console.log('click', msg, _now() - initTime)
//   },
//   1000,
//   { leading: true, trailing: true, maxWait: 1600 }
// )
// const initTime = _now()
// fn('第1次调用')
// fn('第2次调用')
// fn('第3次调用')
// setTimeout(() => fn('第4次调用'), 400)
// setTimeout(() => fn('第5次调用'), 1450)
// setTimeout(() => fn('第6次调用'), 2000)
// setTimeout(() => fn('第7次调用'), 2200)
