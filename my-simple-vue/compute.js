import { ReactiveEffect } from './effect.js';
import { trackRefValue, triggerRefValue } from './ref.js';

class ComputedRefImpl {
  _dirty = true;
  _value = undefined;
  constructor(getter, setter) {
    this._getter = getter;
    this._setter = setter;
    this.effect = new ReactiveEffect(this._getter, () => {
      // 依赖触发更新时
      this._dirty = true;
      triggerRefValue(this);
    });
  }

  get value() {
    trackRefValue(this);
    if (this._dirty) {
      this._value = this.effect.run();
      this._dirty = false;
    }
    return this._value;
  }

  set value(newValue) {
    this._setter(newValue);
    this._dirty = true;
    triggerRefValue(this);
  }
}

export function computed(getterOrOptions) {
  let getter, setter;
  if (typeof getterOrOptions === 'function') {
    getter = getterOrOptions;
    setter = () => {};
  } else {
    getter = getterOrOptions.get;
    setter = getterOrOptions.set || (() => {});
  }
  return new ComputedRefImpl(getter, setter);
}
