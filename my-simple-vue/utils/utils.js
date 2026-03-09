export function isObject(val) {
  return val !== null && typeof val === 'object'
}

export function hasChanged(oldValue, newValue) {
  return !Object.is(oldValue, newValue)
}

export function isMap(val) {
  return Object.prototype.toString.call(val) === '[object Map]'
}

export function isSet(val) {
  return Object.prototype.toString.call(val) === '[object Set]'
}

export function isArray(val) {
  return Object.prototype.toString.call(val) === '[object Array]'
}