/**
 * 方法一
 * @description 手动修改原型链
 */
function myNew(Func, ...args) {
  const newObj = {}
  newObj.constructor = Func
  newObj.__proto__ = Func.prototype

  const res = Func.apply(newObj, args)
  return typeof res === 'object' || typeof res === 'function' ? res : newObj
}
/**
 * 方法二
 * @description 利用object.create方式
 */
function myNew2(Func, ...args) {
  const obj = Object.create(Func.prototype)
  // true
  console.log('myNew2-->', obj.constructor === Func.prototype.constructor, Func.constructor === Function);
  const res = Func.apply(obj, args)
  return typeof res === 'object' || typeof res === 'function' ? res : obj
}

function F(type) {
  this.type = type
}

const obj = myNew(F, 'man')
const obj2 = myNew2(F, 'woman')
console.log('obj-->', obj.type);
console.log(obj.constructor === F)
console.log(Object.getPrototypeOf(obj) === F.prototype)
console.log('obj2-->', obj2.type);
console.log(obj2.constructor === F)
console.log(Object.getPrototypeOf(obj2) === F.prototype)

// function A(value) {
//   this.name = value
// }
// A.prototype.getName = function() {
//   console.log(this.name)
// }

// const a = myNew(A, 22)
// const a2 = myNew2(A, 22)

// // a.getName()
// a2.getName()