import { ReactiveEffect } from './effect.js';
import { trackRefValue, triggerRefValue } from './ref.js';

class ComputedRefImpl {
  _dirty = true;
  _value = undefined;
  constructor(getter, setter) {
    this._setter = setter;
    this.effect = new ReactiveEffect(getter, () => {
      if (!this._dirty) {
        this._dirty = true;
        triggerRefValue(this);
      }
    });
  }

  get value() {
    trackRefValue(this);
    if (this._dirty) {
      this._dirty = false;
      this._value = this.effect.run();
    }
    return this._value;
  }

  set value(newValue) {
    this._setter(newValue);
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
