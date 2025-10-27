import { useEffect, useRef, useCallback } from 'react'

/**
 * 防抖
 * @param {Function} fn
 * @param {Number} wait
 * @param {Object} leading 是否立即执行，默认为 false
 * @param {Object} trailing 是否在最后一次调用后延迟执行，默认为 true
 * @returns
 */
function debounce(fn, wait, { leading = false, trailing = true } = {}) {
  let timeoutId = null

  const cancel = function () {
    clearTimeout(timeoutId)
    timeoutId = null
  }
  const debounced = function (...args) {
    // 每次调用都重新计时
    clearTimeout(timeoutId)
    // 立即执行
    if (leading && !timeoutId) {
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

function useDebounceEffect(fn, deps, options) {
  const { wait, ...restOptions } = options || {}
  const debouncedFn = useCallback(debounce(fn, wait, restOptions), [options])

  useEffect(() => {
    debouncedFn()
    return () => {
      debouncedFn.cancel()
    }
  }, deps)
}

useDebounceEffect(
  function () {
    console.log('debounce effect')
  },
  1000,
  { leading: true, trailing: false }
)

const fn = debounce(
  (msg) => {
    console.log('click', msg)
  },
  1000,
  { leading: true, trailing: true }
)
fn('第1次调用')
fn('第2次调用')
fn('第3次调用')
setTimeout(() => fn('第4次调用'), 400)
setTimeout(() => fn('第5次调用'), 900)
setTimeout(() => fn('第6次调用'), 2000)
setTimeout(() => fn('第7次调用'), 2200)
