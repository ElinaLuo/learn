"use strict";
/**
 * @description 模拟map
 */
Array.prototype._map = function(fn, context) {
  let temp = []
  const ctx = context || this
  if(typeof fn == 'function') {
    let i = 0
    let len = this.length
    for(; i < len; i++) {
      temp.push(fn.call(ctx, this[i], i, this))
    }
  } else {
    console.error('TypeError' + fn + ' is not a function')
  }

  return temp
}

const res = [1, 2, 3]._map((item, i, ctx) => {
  console.log(item, i, ctx)
  return item + 1
})

console.log(res)