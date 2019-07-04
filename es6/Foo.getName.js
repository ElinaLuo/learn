// 解释：https://github.com/Wscats/Good-text-Share/issues/85
function Foo() {
  getName = function() {console.log(1)}
  return this
}
Foo.getName = function () {console.log(2)}
Foo.prototype.getName = function() {console.log(3)}
var getName = function() { console.log(4) }
function getName() {console.log(5)}

Foo.getName()//2
// 函数声明会被提升到最前面，函数表达式在运行时确定
getName()//4
// 修改了window.getName方法
Foo().getName()//1
getName()//1
// new (Foo.getName)()
// .优先级高于new，new优先级高于()
new Foo.getName()//2
// (new Foo()).getName()
// new优先级高于()
new Foo().getName()//3
// new ((new Foo()).getName)()
new new Foo().getName()//3