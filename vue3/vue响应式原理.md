# Vue 2 响应式原理：Object.defineProperty
Vue 2 的响应式核心是利用 ES5 的 Object.defineProperty 方法，通过“数据劫持”结合“发布-订阅模式”来实现的。

核心分为三个大模块：

Observer（观察者）：在组件初始化时，Vue 会递归遍历 data 中的所有属性，并使用 Object.defineProperty 将它们全部转为 getter/setter。

Dep（依赖收集器）：每个属性都有一个专属的 Dep 对象。当模板编译或计算属性读取（触发 getter）这个属性时，Dep 会把当前的依赖（Watcher）收集起来。

Watcher（订阅者）：当你在代码中修改数据（触发 setter）时，setter 会调用该属性对应的 Dep，通知所有收集到的 Watcher 执行更新（比如重新渲染 DOM）。

具体代码查看：Learn/vue2/reactive.js
简化版原理代码片段：

```javascript
function defineReactive(obj, key, val) {
  const dep = new Dep(); // 每个属性一个依赖收集器
  Object.defineProperty(obj, key, {
    get() {
      dep.depend(); // 收集依赖
      return val;
    },
    set(newVal) {
      if (newVal !== val) {
        val = newVal;
        dep.notify(); // 通知更新
      }
    }
  });
}
```

Vue 2 响应式的致命痛点（也是 Vue 3 诞生的原因之一）：
无法检测对象属性的添加或删除：因为初始化时属性必须存在才能被 defineProperty 劫持。所以 Vue 2 提供了 $set 和 $delete 这样的 API 来打补丁。

无法监听数组的索引和长度变化：出于性能考量，Vue 2 没有对数组的每个索引进行劫持，而是采用了一种“Hack”的方式，重写了数组的 7 个变更方法（如 push, pop, splice 等）来触发视图更新。

性能损耗大：如果 data 是一个层级极深的庞大对象，Vue 2 在初始化时必须一次性递归遍历到底，把所有层级的属性都变成响应式，这会导致较慢的组件初始化速度和较高的内存占用。

# Vue 3 响应式原理：ES6 Proxy
Vue 3 抛弃了 Object.defineProperty，全面拥抱了 ES6 的 Proxy（代理）和 Reflect（反射）。

Proxy 的降维打击：Proxy 不再是针对对象的某个具体属性进行劫持，而是直接对整个对象套上一层代理“外壳”。不论你是读取、设置、新增属性、删除属性，还是操作数组，统统都要经过这层外壳，从而被完美拦截。

依赖收集的重构：Vue 3 使用 track (追踪) 和 trigger (触发) 来替代原来的 Dep 逻辑，并在底层使用 WeakMap -> Map -> Set 的数据结构来高效管理所有的响应式依赖（副作用函数 effect）。

具体代码查看：Learn/my-simple-vue

简化版原理代码片段：
```javascript
function reactive(target) {
  return new Proxy(target, {
    get(target, key, receiver) {
      track(target, key); // 收集依赖
      // 如果获取的属性值也是对象，这里才会继续返回代理对象（惰性代理）
      return Reflect.get(target, key, receiver); 
    },
    set(target, key, value, receiver) {
      const result = Reflect.set(target, key, value, receiver);
      trigger(target, key); // 触发更新
      return result;
    }
  });
}
```