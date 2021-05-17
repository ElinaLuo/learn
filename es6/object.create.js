/**
 * 实现 Object.create
 * https://juejin.im/post/5a9ce60b6fb9a028cc60b69c
 * https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/create
 * Object.create 与 new 区别：
 * 1. new 接受Class或者function，而Object.create 只接受对象，大多为类/函数的prototype属性
 * 2. new 内部使用Object.create实现，但是会额外执行构造函数
 * @param {Object} obj 现有对象
 */
function create(obj) {
    function F() {}
    // 通过原型，让新对象具有现有对象的属性
    F.prototype = obj
    return new F()
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
Rectangle.prototype = Object.create(Shape.prototype);
Rectangle.prototype.constructor = Rectangle;

var rect = new Rectangle();

console.log(rect instanceof Rectangle); // true
console.log(rect instanceof Shape); // true
rect.move(1, 1);
console.log(`x=${rect.x}, y=${rect.y}`);