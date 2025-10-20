export function isObject(val) {
  return val !== null && typeof val === 'object'
}

export function hasChanged(oldValue, newValue) {
  return !Object.is(oldValue, newValue)
}