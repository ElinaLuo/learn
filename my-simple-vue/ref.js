import { toReactive } from './reactive.js'
import { trackEffect, triggerEffect, activeEffect } from './effect.js'
import { createDep } from './dep.js'
import { hasChanged } from './utils/utils.js'

export function ref(value) {
  return createRef(value)
}

function createRef(value, isShallow = false) {
  return new RefImpl(value, isShallow)
}

class RefImpl {
  dep = undefined
  constructor(value, isShallow = false) {
    this.__v_isRef = true
    this._rawValue = value
    this._value = isShallow ? value : toReactive(value)
  }

  get value() {
    // 收集依赖
    trackRefValue(this)
    return this._value
  }

  set value(newValue) {
    if (hasChanged(newValue, this._rawValue)) {
      this._rawValue = newValue
      this._value = newValue
      // 触发依赖
      triggerRefValue(this)
    }
  }
}

function trackRefValue(ref) {
  if (activeEffect) {
    trackEffect(activeEffect, ref.dep = createDep(() => { ref.dep = undefined }, 'ref value'))
  }
}

function triggerRefValue(ref) {
  const dep = ref.dep
  if (dep) {
    triggerEffect(dep)
  }
}