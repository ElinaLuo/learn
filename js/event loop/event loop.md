# Call stack 调用栈
定义：调用栈是一个数据结构，用来跟踪函数调用顺序，遵循先进后出原则。
每个函数调用都会创建一个栈帧（stack frame），栈帧包含了函数的参数、局部变量、this、返回地址、作用域链等信息。

# 浏览器 Event loop
定义：事件循环是JavaScript运行时环境中的一个核心概念，用于处理异步操作和事件循环。
执行顺序：当同步代码执行完成后，call stack清空，此时检测微任务队列，若有则将微任务放到call stack中执行，每执行完一个微任务，它就会从call stack中弹出，直到微任务队列清空，然后检测宏任务队列，取出最早的一个放到call stack中，执行完后再回到检测微任务队列，重复上述过程。

同步代码->微任务->requestAnimationFrame->UI渲染->宏任务？

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
- queueMicrotask(callback)
- process.nextTick(Node.js特有)
- MutationObserver 监听DOM树结构变化



# 宏任务 macrotask
优先级比微任务低

- script脚本
- setTimeout
- setIntervel
- setImmediate(Node.js特有)
- MessageChannel 消息通信
- IO，例如文件读取，数据库操作、网络请求(XMLHttpRequest)等
- UI事件，例如鼠标点击click、键盘事件keydown、滚动事件scroll等
- requestAnimationFrame 渲染，一种特殊的宏任务，某些浏览器的渲染任务也是宏任务

