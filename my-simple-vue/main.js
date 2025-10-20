import { reactive } from './reactive.js'
import { ref } from './ref.js'
import { effect } from './effect.js'

const state = { flag: true, name: 'lrr', age: 18, address: { code: 0 } }
const stateProxy = reactive(state)
const stateRef = ref({ a: 1, b: { c: 2 } })
effect(() => {
  console.log('effect执行了')
  document.getElementById('app').innerText = stateRef.value.a + '---' + stateRef.value.b.c + '---' + stateProxy.address.code
})
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
const interval = setInterval(() => {
  stateProxy.address.code++
  stateRef.value.b.c++
  if (stateProxy.address.code >= 8) {
    clearInterval(interval) 
  }
}, 1000)

// setTimeout(() => {
//   console.log('修改flag')
//   stateProxy.flag = false
//   console.log('修改 name ，不应该触发effect');
//   // stateProxy.name = 'hhhhhh'
//   // console.log('修改 address ，应该触发effect');
//   // stateProxy.address = '这个新地址'
//   // console.log(targetMap);
// }, 1000)