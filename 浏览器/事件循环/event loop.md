# 概念了解

## Call Stack 调用栈
- 定义：调用栈是一个数据结构，用来跟踪函数调用顺序，遵循先进后出原则。
每个函数调用都会创建一个栈帧（stack frame），栈帧包含了函数的参数、局部变量、this、返回地址、作用域链等信息。

# 浏览器 Event loop
- 定义：事件循环是浏览器协调主线程任务调度的核心机制。它是一个持续运行的循环进程，负责监听、调度和执行JavaScript运行时环境中的各种异步任务
- 作用：
  - 任务队列管理：协调宏任务（macro-tasks）、微任务（micro-tasks）和渲染任务（rendering tasks）的执行顺序
  - 非阻塞式执行：确保单线程环境下的异步操作能够顺利进行，避免I/O操作或网络请求阻塞主线程
  - 用户交互响应：保证高优先级任务（如用户输入）能够及时处理，维持页面响应性
  - 渲染帧同步：协调JavaScript执行与浏览器渲染的时机，实现流畅的视觉更新

# 完整执行流程图

开始事件循环迭代
    ↓
[宏任务阶段]
├─ 从任务队列取出一个宏任务
├─ 执行该宏任务同步代码
├─ 产生的微任务进入微任务队列
├─ 产生的宏任务进入任务队列
    ↓
[微任务阶段]
├─ 清空微任务队列（包括执行期间产生的新微任务）
    ↓
[渲染判断阶段]
├─ 检查是否达到渲染时机（rafTime）
│  ├─ 是：执行requestAnimationFrame回调
│  ├─ 执行渲染管道：
│  │  1. 样式计算（Recalc Style）
│  │  2. 布局（Layout）
│  │  3. 绘制（Paint）
│  │  4. 合成（Composite）
│  └─ 否：跳过渲染
    ↓
[空闲阶段]
├─ 检查是否有空闲时间
├─ 执行requestIdleCallback回调
    ↓
等待下一个宏任务...

# Node.js Event loop
6个阶段：
timers 定时器，setTimeout、setInterval
pending callbacks 待处理回调
idle, prepare(内部使用)
poll 轮询
check 检查
close callbacks 关闭事件的回调

优先级：promise.nextTick > 微任务 > 宏任务
执行顺序：

# 微任务 microtask
优先级高

- Promise.then/catch/finally
- queueMicrotask
- process.nextTick(Node.js特有)
- MutationObserver 监听DOM树结构变化



# 宏任务 macrotask
优先级比微任务低

- script脚本
- setTimeout
- setIntervel
- setImmediate(Node.js特有)
- MessageChannel 消息通信
- I/O操作，例如文件读取，数据库操作、网络请求(XMLHttpRequest)等
- UI渲染(Rendering)
- 用户交互事件，例如鼠标点击click、键盘事件keydown、滚动事件scroll等
- requestAnimationFrame 渲染，一种特殊的宏任务，某些浏览器的渲染任务也是宏任务

