import { watch } from 'vue';
import { myDebounce } from './debounce_throttle';

export function watchDebounced(source, cb, options) {
  const { leading, trailing, wait, maxWait, ...watchOptions } = options;
  watch(
    source,
    myDebounce(cb, options.wait, { leading, trailing, wait, maxWait }),
    watchOptions
  );
}
