function debounce(fn, wait, immediate = false) {
  let timer = null

  return function(...args) {
    clearTimeout(timer)
    // 立即执行
    if(immediate) {
      if (!timer) {
        fn.apply(this, args)
      }
      setTimeout(() => {
        timer = null
      }, wait)
    } else {
      timer = setTimeout(() => {
        fn.apply(this, args)
      }, wait)
    }
  }
}

let count = 100
// 多次调用，只触发最后一次
const fn = debounce(() => {
  console.log('click')
}, 100)
while(count--) {
  fn()
}
