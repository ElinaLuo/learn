function Parent() {
  this.a = 1;
  this.b = [1, 2, this.a];
  this.c = {
    demo: 5
  };
  this.show = function () {
    console.log(this.a, this.b, this.c.demo);
  }
}

function Child() {
  this.a = 2;
  this.change = function () {
    this.b.push(this.a);
    this.a = this.b.length;
    this.c.demo = this.a++;
  }
}
const p1 = new Parent();
Child.prototype = p1;
var parent = new Parent();
var child1 = new Child();
var child2 = new Child();
child1.a = 11;
child2.a = 12;
parent.show();// 1 [1,2,1] 5
child1.show();// 11 [1,2,1] 5
child2.show();// 12 [1,2,1] 5
child1.change();
child2.change();
parent.show();// 1 [1,2,1] 5
child1.show();// 5 [1,2,1,11,12] 5
child2.show();// 6 [1,2,1,11,12] 5
console.log(child1)
console.log(child2)
console.log(child1.__proto__ === Child.prototype)