export let activeEffect = null

export function effect(fn) {
  const reactiveEffect = new ReactiveEffect(fn)
  reactiveEffect.run()
}

function preCleanupEffect(effect) {
  // 执行前_trackId++，用于记录effect执行次数
  effect._trackId++
  // 记录本次effect执行收集的依赖数量
  effect._depsLength = 0
}

function postCleanupEffect(effect) {
  // 清空多余的依赖
  if (effect.deps.length > effect._depsLength) {
    for (let i = effect._depsLength; i < effect.deps.length; i++) {
      cleanupDepEffect(effect.deps[i], effect)
    }
    effect.deps.length = effect._depsLength
  }
  console.log('effect依赖列表=', effect.deps.map(item => item.name));
}

class ReactiveEffect {
  _trackId = 0 // 用于记录effect执行次数
  deps = [] // 用于存储该effect收集的所有依赖
  _runnings = 0 // 用于记录effect是否正在执行
  _depsLength = 0 // 用于记录本次effect执行收集的依赖数量

  constructor(fn) {
    this.fn = fn
  }

  run() {
    let prevEffect = activeEffect
    try {
      activeEffect = this
      preCleanupEffect(this)
      this._runnings++
      this.fn()
    } finally {
      this._runnings--
      activeEffect = prevEffect
      postCleanupEffect(this)
    }
  }
}

function cleanupDepEffect(dep, effect) {
  if (!dep || !effect) return
  dep.delete(effect)
  if (dep.size === 0) {
    dep.cleanup()
  }
}

export function trackEffect(effect, dep) {
  // 使用_trackId做标记，避免多次访问key出现重复收集
  if (dep.get(effect) !== effect._trackId) {
    dep.set(effect, effect._trackId)
    const oldDep = effect.deps[effect._depsLength]
    if (oldDep !== dep) {
      cleanupDepEffect(oldDep, effect)
      // 双向记忆，方便更新和清理依赖
      effect.deps[effect._depsLength++] = dep
    } else { // 依赖没有变化，继续使用原来的位置
      effect._depsLength++
    }
  } else {
    console.log('已经收集过了，不需要重复收集');
  }
}

export function triggerEffect(dep) {
  for (const effect of dep.keys()) {
    // 避免effect重复触发
    if (!effect._runnings) {
      effect.run()
    }
  }
}