function Person(name) {
  console.log('person creating')
  this.name = name;
}
Person.prototype.changeName = function(name) {
  this.name = name;
}

function Man() {}
const person = new Person();
Man.prototype = person;

const man = new Man();

console.log(man.__proto__ === Man.prototype)
console.log(Object.prototype.hasOwnProperty('__proto__'))
console.log(Person.__proto__ === Function.prototype)
// console.log(person.__proto__)
// console.log(Person.__proto__)
// console.log(Person.prototype.__proto__ === Object.prototype)
// console.log(Person.constructor === Function)
// console.log(Person.constructor.constructor === Function)
// console.log(Function.prototype === Function.__proto__)
// console.log(Person.prototype.__proto__ === Object.prototype)
// console.log(Man.prototype.__proto__ === Person.prototype)
// console.log(Object.constructor === Function)


// function Person(name){
//   this.name=name; //1
//   this.className="person" 
//  }
//  Person.prototype.getName=function(){
//   console.log(this.name)
//  }
//  function Man(name){
//    Person.apply(this, arguments)
//  }
//  //注意此处
//  Man.prototype = Object.create(Person.prototype);
//  //重设constructor
//  Man.prototype.constructor = Man
//  const man = new Man("Davin");

//  console.log(man)