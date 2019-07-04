/**
 * @description 观察者模式 + 发布订阅模式
 * https://juejin.im/post/5a14e9edf265da4312808d86
 * 不同点：
 * 1.发布订阅，相比观察者，多了事件通道，发布者和订阅者之间只能通过消息代理进行通信。
 * 3.观察者模式大多数时候是同步的，比如当事件触发，Subject就会去调用观察者的方法。而发布-订阅模式大多数时候是异步的（使用消息队列）。
 */
// ------------------ 观察者模式 ------------------
class Subject {
    constructor() {
        this.subs = []
    }
    subscribe(sub) {
        this.subs.push(sub)
    }
    notify() {
        this.subs.forEach(sub => sub.update())
    }
}
class Observer {
    constructor(fn) {
        this.fn = fn
    }
    update() {
        this.fn()
    }
}

const subject = new Subject()
subject.subscribe(new Observer(function() {
    console.log('通知我。。。')
}))
subject.notify()


// ------------------ 发布/订阅 ------------------
class Publisher {
    constructor() {
        this.subs = {}
    }
    addSub(key, sub) {
        if(!this.subs[key]) {
            this.subs[key] = []
        }
        this.subs[key].push(sub)
    }
    notify(name) {
        this.subs.forEach(sub => sub.update())
    }
}