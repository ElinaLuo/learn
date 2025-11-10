/**
 * 实现 Object.create
 * https://juejin.im/post/5a9ce60b6fb9a028cc60b69c
 * https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/create
 * Object.create 与 new 区别：
 * 1. new 和 Object.create 都可以创建对象，new接受Class或者function，而Object.create 只接受对象，大多为类/函数的prototype属性
 * 2. new 相比 Object.create 会自动执行构造函数进行初始化
 * 2. new 是语言层面的操作符（底层实现），Object.create 是 JavaScript 层面的函数
 * @param {Object} obj 现有对象
 */
function myCreate(proto, props) {
  function F() {}
  // 通过原型，让新对象具有现有对象的属性
  F.prototype = proto
  const obj = new F()
  if (props) {
    Object.defineProperties(obj, props)
  }
  return obj
}

function Shape() {
  this.x = 0;
  this.y = 0;
}

// 父类的方法
Shape.prototype.move = function(x, y) {
  this.x += x;
  this.y += y;
  console.info('Shape moved.');
};
// Rectangle - 子类(subclass)
function Rectangle() {
  Shape.call(this); // call super constructor.
}
// 子类续承父类
Rectangle.prototype = myCreate(Shape.prototype);
console.log('若不重新设置子类的constructor，则构造函数会指向父类', Rectangle.prototype.constructor === Shape); // true
// 设置子类的constructor属性指向自己
Rectangle.prototype.constructor = Rectangle;

const rect = new Rectangle();

console.log(Rectangle.constructor === Function); // true
console.log(rect.constructor === Rectangle); // true
console.log(rect.constructor === Rectangle.prototype.constructor); // true
console.log(rect.constructor === Object.getPrototypeOf(rect).constructor); // true
console.log(Object.getPrototypeOf(rect) === Rectangle.prototype); // true
// console.log(rect instanceof Rectangle); // true
// console.log(rect instanceof Shape); // true
// rect.move(1, 1);
// console.log(`x=${rect.x}, y=${rect.y}`);

// 模拟vue2实现数组响应式
const arrayMethods = Object.create(Array.prototype);

const overrideMethods = ['push', 'pop', 'unshift', 'shift', 'splice', 'sort', 'reverse']

Object.defineProperties(arrayMethods, overrideMethods.reduce((prev, method) => {
  prev[method] = {
    value: function(...args) {
      console.log(`调用了${method}方法，参数是`, args);
      // 触发dep.notify()
      return Array.prototype[method].apply(this, args)
    },
    enumerable: false,
    writable: true,
    configurable: true,
  }
  return prev
}, {}))


const arr = [1, 2, 3]
arr.__proto__ = arrayMethods

arr.push(19)
// arr.pop()
arr.unshift(100)
arr.reverse()
console.log('最终数组是', arr);