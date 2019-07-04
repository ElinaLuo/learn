function debounce(fn, wait, immediate) {
  let timer = null

  return function() {
    const context = this
    if(!timer && immediate) {
      fn.apply(context, arguments)
    }
    if(timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(() => {
      fn.apply(context, arguments)
    }, wait)
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
