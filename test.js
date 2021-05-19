function extend() {

  function inheritPrototype(child, parent) {
    let prototype = Object.create(parent.prototype);
    child.prototype = Object.assign(prototype, child.prototype);
    child.prototype.constructor = child;
  }
  function Person() {
    this.type = 'person';
  }
  Person.prototype.getType = function () {
    return this.type;
  }

  function Man(name) {
    Person.apply(this);
    this.name = name;
  }

  inheritPrototype(Man, Person)

  const m1 = new Man('man')
  const m2 = new Man('none')
  m1.type = '111'

  console.log(m1, m1.getType(), m1.name)
  console.log(m2, m2.getType(), m2.name)
}

extend()

