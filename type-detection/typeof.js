/**
 * @description 检测对象类型
 * 基本类型(null): 使用 String(null)
 * 基本类型(string / number / boolean / undefined) + function: 直接使用 typeof即可
 * 其余引用类型(Array / Date / RegExp Error): 调用toString后根据[object XXX]进行判断
 */
let TYPES = {};
['Array', 'Date', 'Regex', 'Object', 'Error'].forEach(item => {
  TYPES[`[object ${item}]`] = item.toLowerCase()
})
function newTypeOf(obj) {
  // null 和 undefined
  if (obj == null) return String(obj)
  return typeof obj === 'object' ? TYPES[ Object.prototype.toString.call(obj) ] || 'object' : typeof obj
}
console.log(typeof '哈哈哈' === 'string');
console.log(newTypeOf('哈哈哈哈'))
console.log(newTypeOf(null))
console.log(newTypeOf(undefined))
console.log(newTypeOf([]))
console.log(newTypeOf(11))
console.log(newTypeOf(new Date()))