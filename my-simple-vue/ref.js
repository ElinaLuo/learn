import { isReactive, toReactive } from './reactive.js';
import { trackEffect, triggerEffect, activeEffect } from './effect.js';
import { createDep } from './dep.js';
import { hasChanged } from './utils/utils.js';
import { ReactiveFlags } from './constant.js';

export function ref(value) {
  return createRef(value);
}

export function isRef(value) {
  return typeof value === 'object' && value[ReactiveFlags.IS_REF];
}

class ObjectRefImpl {
  constructor(_object, _key) {
    this._object = _object;
    this._key = _key;
  }

  get value() {
    return this._object[this._key];
  }

  set value(newValue) {
    this._object[this._key] = newValue;
  }
}

// toRef和toRefs解决响应式对象解构后丢失响应式
export function toRef(_object, _key) {
  const val = _object[_key];
  return isRef(val) ? val : new ObjectRefImpl(_object, _key);
}
export function toRefs(_object) {
  const refs = {};
  for (const key in _object) {
    refs[key] = toRef(_object, key);
  }
  return refs;
}
// template不需要写value的原因在这里：proxyRefs自动将第一层解包
export function proxyRefs(object) {
  return isReactive(object)
    ? object
    : new Proxy(object, {
        get(target, key, receiver) {
          const res = Reflect.get(target, key, receiver);
          // 自动解包ref
          if (isRef(res)) {
            return res.value;
          }
          return res;
        },
        set(target, key, newValue, receiver) {
          if (isRef(target[key]) && !isRef(newValue)) {
            target[key].value = newValue;
          }
          return Reflect.set(target, key, receiver);
        },
      });
}

function createRef(value, isShallow = false) {
  return new RefImpl(value, isShallow);
}

class RefImpl {
  dep = undefined;
  constructor(value, isShallow = false) {
    this.__v_isRef = true;
    this._rawValue = value;
    this._value = isShallow ? value : toReactive(value);
  }

  get value() {
    // 收集依赖
    trackRefValue(this);
    return this._value;
  }

  set value(newValue) {
    if (hasChanged(newValue, this._rawValue)) {
      this._rawValue = newValue;
      this._value = newValue;
      // 触发依赖
      triggerRefValue(this);
    }
  }
}

export function trackRefValue(ref) {
  if (activeEffect) {
    trackEffect(
      activeEffect,
      (ref.dep = createDep(() => {
        ref.dep = undefined;
      }, 'ref value')),
    );
  }
}

export function triggerRefValue(ref) {
  const dep = ref.dep;
  if (dep) {
    triggerEffect(dep);
  }
}
