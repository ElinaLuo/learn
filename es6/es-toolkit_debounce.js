import { debounce, throttle } from 'es-toolkit'

const fn = throttle(
  (msg) => {
    console.log('click', msg)
  },
  1000,
  { edges: ['leading', 'trailing'] }
)
fn('第1次调用')
fn('第2次调用')
fn('第3次调用')
setTimeout(() => fn('第4次调用'), 400)
setTimeout(() => fn('第5次调用'), 900)
setTimeout(() => fn('第6次调用'), 2000)
setTimeout(() => fn('第7次调用'), 2200)
