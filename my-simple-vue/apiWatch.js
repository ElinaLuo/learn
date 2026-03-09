import { ReactiveEffect } from './effect.js'
import { isReactive } from './reactive.js'
import { isRef } from './ref.js'
import { isMap, isSet } from './utils/utils.js'

export function watch(source, cb, options = {}) {
  return doWatch(source, cb, options)
}

export function watchEffect(fn, options = {}) {
  return doWatch(fn, null, options)
}

function traverse(value, seen = new Set()) {
  if (typeof value !== 'object' || value === null || seen.has(value)) {
    return value
  }
  seen.add(value)
  if (isRef(value)) {
    traverse(value.value, seen)
  } else if (isArray(value)) {
    for (let i = 0; i < value.length; i++) {
      traverse(value[i], seen)
    }
  } else if (isMap(value) || isSet(value)) {
    value.forEach((key) => {
      traverse(value[key], seen)
    })
  } else {
    for (const key in value) {
      traverse(value[key], seen)
    }
    for (const key in Object.getPropertySymbols(value)) {
      if (Object.prototype.propertyIsEnumerable.call(value, key)) {
        traverse(value[key], seen)
      }
    }
  }
  return value
}

function doWatch(source, cb, options) {
  let getter
  const reactiveGetter = () => (options.deep) ? traverse(value) : () => source
  if (isReactive(source)) {
    getter = reactiveGetter
  } else if (isRef(source)) {
    getter = () => source.value
  } else if (typeof source === 'function') {
    getter = source
  } else {
    getter = () => source
  }
  let oldValue
  const job = () => {
    if (cb) {
      const newValue = effect.run()
      cb(newValue, oldValue)
      oldValue = newValue
    } else {
      effect.run()
    }
  }
  const effect = new ReactiveEffect(getter, job)
  if (options.immediate) {
    job()
  } else {
    oldValue = effect.run()
  }
}