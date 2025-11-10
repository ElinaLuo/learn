/**
 * @description 内存泄露
 * https://jinlong.github.io/2016/05/01/4-Types-of-Memory-Leaks-in-JavaScript-and-How-to-Get-Rid-Of-Them/
 * 常见的内存泄露
 * 1.意外的全部变量
 * 2.被遗忘的计数器或回调函数
 * 3.脱离DOM的引用
 * 4.闭包
 * 
 * 实际环境遇到的栗子：意外的全局变量 + 闭包 导致内存泄露问题
 * https://km.sankuai.com/page/176885167
 * 
 * 排查内存泄露问题的方法：
 * heapdump 生成快照，然后通过chrome Memory profiles来分析
 */
