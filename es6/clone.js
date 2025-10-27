// 浅拷贝
function shallowClone(obj) {
  return { ...obj }
}
// 深拷贝
function deepClone1(obj) {
  return JSON.parse(JSON.stringify(obj))
}
function deepClone2(obj, hash = new WeakMap()) {}