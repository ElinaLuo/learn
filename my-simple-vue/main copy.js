import { reactive } from './reactive.js';
import { ref, toRef, toRefs, proxyRefs } from './ref.js';
import { computed } from './compute.js';
import { effect } from './effect.js';

const stateProxy = reactive({
  flag: true,
  name: 'lrr',
  age: ref(18),
  address: { code: ref(0) },
});
const stateWrapRef = toRefs(stateProxy);
const newAge = computed(() => stateProxy.age + 10);
const ageRef = toRef(stateProxy, 'age');
setTimeout(() => {
  stateWrapRef.age.value++;
  setTimeout(() => {
    ageRef.value++;
  }, 1000);
}, 1000);
console.log(
  'reactive第一层属性若是ref则会自动解包',
  stateProxy.age,
  stateProxy.address.code,
);
const setupResultData = proxyRefs({ stateProxy, a: ref(1111) });
console.log(
  '模拟template自动解包操作',
  setupResultData.stateProxy.age,
  setupResultData.a,
);
effect(() => {
  console.log('effect执行了');
  document.getElementById('app').innerText =
    setupResultData.a + '---' + stateProxy.address.code + '---' + newAge.value;
});
// effect(() => {
//   console.log('effect执行了')
//   stateProxy.age++ // 执行effect再次修改age，不再触发effect，避免无限循环
//   document.getElementById('app').innerText = stateProxy.age
// })
// effect(() => {
//   console.log('[内层effect]')
//   document.getElementById('app2').innerText = stateProxy.age + stateProxy.age
// })

// setTimeout(() => {
//   console.log('修改address')
//   stateProxy.address = 'shanghai'
//   console.log('修改flag')
//   stateProxy.flag = false
// }, 1000)

// setTimeout(() => {
//   console.log('修改flag')
//   stateProxy.flag = false
//   console.log('修改 name ，不应该触发effect');
//   // stateProxy.name = 'hhhhhh'
//   // console.log('修改 address ，应该触发effect');
//   // stateProxy.address = '这个新地址'
//   // console.log(targetMap);
// }, 1000)
