import { track, trigger } from './reactiveEffect.js' 
import { TriggerOpTypes } from './constant.js'
import { reactive } from './reactive.js'

class BaseHandlers {
  constructor(isShallow = false) {
    this.isShallow = isShallow
  }

  get(target, key, receiver) {
    // console.log(`get key: ${key}`)
    // 收集依赖
    track(target, key)
    const res = Reflect.get(target, key, receiver)
    if (res && typeof res === 'object' && !this.isShallow) {
      return reactive(res)
    }
    return res
  }

  set(target, key, value, receiver) {
    // console.log(`set key: ${key}, value: ${value}`)
    const oldValue = target[key]
    // 触发依赖
    const result = Reflect.set(target, key, value, receiver)
    if (oldValue !== value) {
      trigger(target, TriggerOpTypes.SET, key)
    }
    return result
  }

  // 其他拦截操作...deleteProperty, has, ownKeys, etc.
}

// 深响应式
export const mutableHandlers = new BaseHandlers()
// 浅响应式
export const shallowReactiveHandlers = new BaseHandlers(true)