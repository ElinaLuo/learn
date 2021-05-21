/**
 * 函数绑定的实现源码
 */
Function.prototype._bind = function (context, ...args) {
  return (...rest) => {
    this.apply(context, args.concat(rest))
  }
}

Function.prototype._apply = function (context, args) {
  if (context === null || context === undefined) {
    // 指定为 null 和 undefined 的 this 值会自动指向全局对象(浏览器中为window)
    context = window
  } else {
    context = new Object(context)
  }
  const fn = Symbol() // 用于临时储存函数
  context[fn] = this; // 函数的this指向隐式绑定到context上
  let result = context[fn](...args); // 通过隐式绑定执行函数并传递参数
  delete context[fn]; // 删除上下文对象的属性
  return result; // 返回函数执行结果
};
Function.prototype._call = function (context, ...args) {
  if (context === null || context === undefined) {
    // 指定为 null 和 undefined 的 this 值会自动指向全局对象(浏览器中为window)
    context = window
  } else {
    context = new Object(context)
  }
  const fn = Symbol() // 用于临时储存函数
  context[fn] = this; // 函数的this指向隐式绑定到context上
  let result = context[fn](...args); // 通过隐式绑定执行函数并传递参数
  delete context[fn]; // 删除上下文对象的属性
  return result; // 返回函数执行结果
};

const obj = {
  a: 1,
  b: 2,
  name: 'Tom'
}
function func() {
  console.log('my name is', this.name, arguments)
}

console.log(func._apply(obj, [222, 333]))
console.log(func._call(obj, 222, 333))
console.log(func._bind(obj, 1, 2)(3, 4))



