function Base(name) {
  this.sex = 0;
  this.name = name || 'base';
  this.hello = function () {
    console.log("hello " + name);
  };
}
Base.prototype.say = function () {
  console.log('name:' + this.name);
};

function Extend(name, num) {
  //让Base能初始化属性
  Base.call(this, name);
  this.num = num || 0;
}
//注意,这里是new Base()而不是Base.prototype
//因为new Base()是新建了一个对象,这样可以不会影响到Base.prototype
//否则如果直接操作Base.prototype,会污染Base.prototype
const base = new Base();
Extend.prototype = base;
//前面由于将prototype变为了new Base()所以构造方法默认是Base的
//这里需要手动替换回来
Extend.prototype.constructor = Extend;

var one = new Extend('one', 2);

console.log(Extend.__proto__ === Function.prototype); //true
console.log(Extend.__proto__.constructor === Function); //true
console.log(one instanceof Extend); //true
console.log(one instanceof Base); //true
console.log(one.constructor === Extend); //true
console.log(one.__proto__ === Extend.prototype); //true
console.log(Extend.prototype.__proto__ === Base.prototype);//true
console.log(base.__proto__ === Base.prototype);//true
console.log(Base.__proto__ === Function.prototype);//true
console.log('----------'); //one
console.log(one.name); //one
console.log(one.sex); //0
console.log(one.num); //2
one.say(); //name:one
one.hello(); //hello one