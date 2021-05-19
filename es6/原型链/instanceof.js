// 实现instanceof
function myinstanceof(objA, objB) {
  let prototype = objA;
  while(prototype) {
    prototype = Object.getPrototypeOf(prototype);
    if (prototype === objB.prototype) {
      return true;
    }
  }
  return false;
}
function Person() {

}

const person = new Person();
console.log(myinstanceof(person, Person))
console.log(myinstanceof(person, Object))
console.log(myinstanceof(Person, Function))
console.log(myinstanceof(Person, Object))
console.log(myinstanceof(Function, Object))
console.log(myinstanceof(Object, Function))
console.log(Person.prototype.constructor === Person)