import { trackEffect, triggerEffect, activeEffect } from './effect.js'
import { TriggerOpTypes } from './constant.js'
import { createDep } from './dep.js'

export const targetMap = new WeakMap()

export function track(target, key) {
  if  (!activeEffect) return
    
  let depsMap = targetMap.get(target)
  if (!depsMap) {
    targetMap.set(target, (depsMap = new Map()))
  }
  let dep = depsMap.get(key)
  if (!dep) {
    depsMap.set(key, (dep = createDep(() => depsMap.delete(key), key)))
  }
  trackEffect(activeEffect, dep)
}

export function trigger(target, type, key) {
  const depsMap = targetMap.get(target)
  if (!depsMap) return

  let deps = []
  if (type === TriggerOpTypes.CLEAR) {
    // 清空操作，触发所有依赖
    deps = [...depsMap.values()]
  } else {
    deps.push(depsMap.get(key))
  }
  for (const dep of deps) {
    dep && triggerEffect(dep) // 触发依赖
  }
}
