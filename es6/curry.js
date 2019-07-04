/**
 * @description 柯里化
 * 也称为部分求值，提前接收部分参数，延迟执行，不立即输出结果，而是返回一个接受剩余参数的函数
 * 应用：延迟计算、bind、动态创建函数、参数复用
 */

 function test(args) {
     console.log('outer', arguments)
    //  return () => {
    //     console.log('inner', arguments)
    //  }
     return function() {
        console.log('inner', arguments)
     }
 }

//  test(1,2,3)(1111)
// ------------------------ 1.延迟计算 ------------------------
// 只支持延迟1次计算
function curry(fn) {
  const args = Array.prototype.slice.call(arguments, 1)
  return function() {
    const innerArgs = Array.prototype.slice.call(arguments)
    const finalArgs = args.concat(innerArgs)
    return fn.apply(null, finalArgs)
  }
}
const sum = curry(add, 1, 2)(3)
console.log(sum)

// 支持当参数长度达到length即可计算
function curryByLength(fn, length) {
    const args = Array.prototype.slice.call(arguments, 2)
    return function result() {
        const restArgs = Array.prototype.slice.call(arguments)
        args.push(...restArgs)
        // console.log(args)
        if(args.length >= length) {
            return fn.apply(this, args)
        } else {
            return result
        }
    }
}
let sum1 = curryByLength(add, 3)
console.log(sum1(1)(2)(3))

sum1 = curryByLength(add, 4)
console.log(sum1(1, 2)(3)(4))

sum1 = curryByLength(add, 2)
console.log(sum1(1)(2))

function add() {
  const args = Array.prototype.slice.call(arguments)
  return args.reduce(function(a, b) {
    return a + b
  })
}

// ------------------------ 2.bind ------------------------
const obj = {
    name: 'lrr'
}
const fn = function() {
    console.log(this.name)
}.bind(obj)

fn()

// ------------------------ 3.动态创建函数 ------------------------
// 每次调用都需进行一次逻辑判断，但其实第一次判断计算之后，后续调用并不需要再次判断。
// 即第一次判断之后，动态创建一个新函数用于处理后续传入的参数，并返回这个新函数
const addEvent = (function() {
    if(window.addEventListener) {
        return function(type, el, fn, capture) {
            window.addEventListener(type, el, fn, capture)
        }
    } else if(window.attachEvent) {
        return function (type, el, fn) {
            el.attachEvent('on' + type, fn)
        }
    }
})
// addEvent()

// ------------------------ 4.函数复用 ------------------------
// 改造前
function isArray(obj) { 
    return Object.prototype.toString.call(obj) === '[object Array]'
}
function isNumber(obj) {
    return Object.prototype.toString.call(obj) === '[object Number]'
}
function isString(obj) {
    return Object.prototype.toString.call(obj) === '[object String]'
}
// Test
console.log(isArray([1, 2, 3]))// true
console.log(isNumber(123))// true
console.log(isString('123'))// true

// 改造后
const toStr = Function.prototype.call.bind(Object.prototype.toString)
console.log(toStr([1, 2, 3]))  // "[object Array]"
console.log(toStr('123'))      // "[object String]"
console.log(toStr(123))        // "[object Number]"
console.log(toStr(Object(123)))// "[object Number]"