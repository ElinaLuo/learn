import { reactive } from './reactive.js';
import { ref, toRef, toRefs, proxyRefs } from './ref.js';
import { computed } from './computed.js';
import { effect } from './effect.js';
import { watch, watchEffect } from './apiWatch.js';

const stateProxy = reactive({
  age: ref(18),
});
const newAge = computed(() => stateProxy.age + 10);
const ageRef = ref(18);

// effect(() => {
//   console.log('effect执行了');
//   document.getElementById('app').innerText = newAge.value;
// });

watch(() => stateProxy.age, (newVal, oldVal) => {
  console.log('watch执行了-stateProxy', newVal, oldVal);
});
watch(ageRef, (newVal, oldVal) => {
  console.log('watch执行了-ageRef', newVal, oldVal);
});
watchEffect(() => {
  console.log('watchEffect执行了-ageRef', ageRef.value);
});

setTimeout(() => {
  // stateProxy.age++;
  ageRef.value = 20;
}, 1000);

// const interval = setInterval(() => {
//   stateProxy.age++;
//   if (stateProxy.age === 23) {
//     clearInterval(interval);
//   }
// }, 1000);
