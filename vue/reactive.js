let data = {
  name: 'Tom'
}
// 数据响应性
observe(data)
// 初始化观察者
new watcher(data, 'name', updateComponent)

data.name = 'Little Tom'
// 简单表示用于数据更新后的操作
function updateComponent() {
  vm._update()
}
// 监视对象
function observe(obj) {
  Object.keys(obj).forEach(key => defineReactive(obj, key, obj[key]))
}

function defineReactive(obj, k, v) {
  // 递归子属性
  if(type(v) == 'object') {
    observe(v)
  }
  // 新建依赖收集器
  let dep = new Dep()

  Object.defineProperty(obj, k, {
    enumerable: true,
    configurable: true,
    // 定义get/set
    get: function reactiveGetter() {
      // 当有获取该属性时，证明依赖于该对象，因此被添加进收集器中
      if(Dep.target) {
        dep.addSub(Dep.target)
      }
      return v
    },
    set: function reactiveSetter(nv) {
      // 重新设置值时，触发收集器的通知机制
      v = newValue
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

class watcher {
  constructor(obj, k, cb) {
    Dep.target = obj
    this.obj = obj
    this.cb = cb
    this.key = key
    this.value = obj[k]
    Dep.target = null
  }
  update() {
    this.value = this.obj[this.key]
    this.cb()
  }
}