// 实现instanceof
function myinstanceof(objA, objB) {
  let prototype = objA.__proto__;
  while(true) {
    if (prototype === null) return false;

    if (prototype === objB.prototype) {
      return true;
    }
    prototype = objA.__proto__;
  }
}
function Person() {

}

const person = new Person();
console.log(myinstanceof(person, Person))