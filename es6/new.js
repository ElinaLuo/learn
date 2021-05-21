/**
 * 方法一
 * @description 利用object.create方式
 */
function newObject(obj) {
  let newObj = Object.create(obj.prototype)

  const args = Array.prototype.slice.call(arguments, 1)

  const res = obj.apply(newObj, args)
  return typeof res === 'object' || typeof res === 'function' ? res : newObj
}
/**
 * 方法二
 * @description 手动修改原型链
 */
function newObject2(obj) {
  let newObj = new Object()
  const args = Array.prototype.slice.call(arguments, 1)

  newObj.constructor = obj
  newObj.__proto__ = obj.prototype

  const res = obj.apply(newObj, args)
  return typeof res === 'object' || typeof res === 'function' ? res : newObj
}

function A(value) {
  this.name = value
}
A.prototype.getName = function() {
  console.log(this.name)
}

const a = newObject(A, 22)
const a2 = newObject2(A, 22)

// a.getName()
a2.getName()