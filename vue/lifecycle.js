/**
 * @description vue生命周期代码示例
 */
function init(vm) {
  // 挂载属性
  initLifecycle(vm)
  // 初始化事件系统，钩子函数等
  initEvent(vm)
  // 编译slot、vnode
  initRender(vm)
  callHook(vm, 'beforeCreate')
  // 添加inject功能
  initInjection(vm)
  // 完成数据响应性 props/data/watch/computed/methods
  initState(vm)
  //添加 provide 功能
  initProvide(vm)
  callHook(vm, 'created')

  // 挂载节点
  if (vm.$options.el) {
    vm.$mount(vm.$options.el)
  }
}

// 挂载节点实现
function mountComponent() {
  // 获取 render function
  if(this.$options.render) {
    const { render } = compileToFunctions(this)
    this.$options.render = render
  }
  callHook(this, 'beforeMount')

  // render 渲染 vdom， 
  vdom = this.render()
  // update: 根据 diff 出的 patchs 挂载成真实的 dom 
  this._update(vdom)
  callHook(this, 'mounted')
}

// 更新节点实现
function queueWatcher(watcher) {
	nextTick(flushScheduleQueue)
}

function flushScheduleQueue() {
  // 遍历队列中所有修改
  while(true) {
    watcher.before()
    callHook(this, 'beforeUpdate')
    // 依赖局部更新节点
    watcher.update()
    callHook(this, 'updated')
  }
}

function destroyed() {
  callHook(vm, 'beforeDestory')
  // 自身及子节点
  remove()
  // 删除依赖
  watcher.teardown()
  // 删除监听
  vm.$off()
  callHook(vm, 'destoryed')
}