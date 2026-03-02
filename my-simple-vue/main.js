import { reactive } from './reactive.js';
import { ref, toRef, toRefs, proxyRefs } from './ref.js';
import { computed } from './compute.js';
import { effect } from './effect.js';

const stateProxy = reactive({
  age: ref(18),
});
const newAge = computed(() => stateProxy.age + 10);

effect(() => {
  console.log('effect执行了');
  document.getElementById('app').innerText = newAge.value;
});

const interval = setInterval(() => {
  stateProxy.age = stateProxy.age + 1;
  if (stateProxy.age === 26) {
    clearInterval(interval);
  }
}, 1000);
