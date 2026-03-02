import { mutableHandlers } from './baseHandlers.js';
import { isObject } from './utils/utils.js';
import { ReactiveFlags } from './constant.js';

export function reactive(obj) {
  return new Proxy(obj, mutableHandlers);
}

export function toReactive(value) {
  return isObject(value) ? reactive(value) : value;
}

export function isReactive(value) {
  return !!(value && value[ReactiveFlags.IS_REACTIVE]);
}
