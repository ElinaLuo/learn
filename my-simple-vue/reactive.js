
import { mutableHandlers } from './baseHandlers.js' 
import { isObject } from './utils/utils.js'

export function reactive(obj) {
  return new Proxy(obj, mutableHandlers)
}

export function toReactive(value) {
  return isObject(value) ? reactive(value) : value
}