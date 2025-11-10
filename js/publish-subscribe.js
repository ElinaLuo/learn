/**
 * @description 观察者模式 + 发布订阅模式
 * https://juejin.im/post/5a14e9edf265da4312808d86
 * 不同点：
 * 1.发布订阅，相比观察者，多了事件通道，发布者和订阅者中间多了一层消息代理，所带来的优势是松散耦合
 * 2.观察者模式大多数时候是同步的，比如当事件触发，Subject就会去调用观察者的方法。而发布-订阅模式大多数时候是异步的（使用消息队列）。
 * 
 * 实际应用中的栗子：
 * 发布订阅：vue里的event bug
 * 观察者：vue里父子间emit
 */
// ------------------ 观察者模式 ------------------
class Subject {
    constructor() {
        this.subs = []
    }
    subscribe(sub) {
        this.subs.push(sub)
    }
    unsubscribe(sub) {
      this.subs = this.subs.filter(item => item !== sub)
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
const obs1 = new Observer(function() {
  console.log('1通知我。。。')
})
const obs2 = new Observer(function() {
  console.log('2通知我。。。')
})
subject.subscribe(obs1)
subject.subscribe(obs2)
subject.notify()
subject.unsubscribe(obs2)
subject.notify()

// ------------------ 发布/订阅 ------------------
class Publisher {
    constructor() {
        this.subs = {}
    }
    subscribe(key, sub) {
        if(!this.subs[key]) {
            this.subs[key] = []
        }
        this.subs[key].push(sub)
    }
    publish(key) {
        this.subs[key].forEach(sub => sub.update())
    }
}