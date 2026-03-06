// 监视对象
function observe(obj) {
  if (typeof obj !== 'object') return

  Object.keys(obj).forEach(key => defineReactive(obj, key))
}
// 将对象变成响应式对象
function defineReactive(obj, key) {
  // 递归子属性
    
  const property = Object.getOwnPropertyDescriptor(obj, key)
  // 新建依赖收集器
  let dep = new Dep()
  const getter = property && property.get
  const setter = property && property.set
  let val = obj[key]

  observe(val)
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    // 定义get/set
    get: function reactiveGetter() {
      const value = getter ? getter.call(obj) : val
      // 当有获取该属性时，证明依赖于该对象，因此被添加进收集器中
      if(Dep.target) {
        dep.addSub(Dep.target)
      }
      return value
    },
    set: function reactiveSetter(newVal) {
      // 重新设置值时，触发收集器的通知机制
      if (val === newVal) return

      if (setter) {
        setter.call(obj, newVal)
      } else {
        val = newVal
      }
      dep.notify()
    }
  })
}

// 依赖收集器
class Dep {
  constructor() {
    this.subs = []
  }
  addSub(watcher) {
    this.subs.push(watcher)
  }
  notify() {
    this.subs.forEach(sub => sub.update())
  }
}

Dep.target = null

const uid = 0;
class watcher {
  constructor(fn) {
    this.id = uid++;
    this.getter = fn
    this.get()
  }
  get() {
    Dep.target = this
    this.getter()
    Dep.target = null
  }
  update() {
    this.get()
  }
}

let reactiveData = {
  a: {
    random: 0,
  },
  count: 1
}
// 数据响应性
observe(reactiveData)
// 初始化观察者
new watcher(render)

// 简单表示用于数据更新后的操作
function render() {
  // 这里会被触发多次
  console.log('render函数被调用');
  document.getElementById('app').innerHTML = `
    <div>随机数 = ${ reactiveData.a.random }</div>
    <div>计数 = ${ reactiveData.count }</div>
  `;
}
function addCount() {
  reactiveData.count++
}
function changeData() {
  reactiveData.a.random = Math.random()
}




