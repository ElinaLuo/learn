/**
 * 实现继承的3个种推荐方式
 * https://juejin.im/post/5c40408bf265da61193c1606
 */
extend1()
extend2()
extend3()

// 组合继承
function extend1() {
    console.log('---------- 组合继承 -----------')
    function Person() {
        this.type = 'person'
    }

    Person.prototype.getType = function() {
        return `type=${this.type}`
    }

    function Man(sex) {
        Person.apply(this)
        this.sex = sex
    }

    Man.prototype = new Person()
    Man.prototype.constructor = Man

    const m1 = new Man('man')
    const m2 = new Man('none')
    m1.type = '111'

    console.log(m1, m1.getType(), m1.sex)
    console.log(m2, m2.getType(), m2.sex)
    console.log(m1 instanceof Person)
}

// 寄生组合式继承
function extend2() {
    console.log('---------- 寄生组合式继承 -----------')

    // 寄生组合式继承的核心方法
    function inheritPrototype(child, parent) {
      // 继承父类的原型
      const parentPrototype = Object.create(parent.prototype)
      // 将父类原型和子类原型合并，并赋值给子类的原型
      child.prototype = Object.assign(parentPrototype, child.prototype)
      // 重写被污染的子类的constructor
      child.prototype.constructor = child
    }

    function Person() {
      console.log('Person created...')
        this.type = 'person'
    }
    
    Person.prototype.getType = function() {
        return `type=${this.type}`
    }
    
    function Man(sex) {
        Person.apply(this)
        this.sex = sex
    }
    
    inheritPrototype(Man, Person)
    
    const m1 = new Man('man')
    console.log('-222--')
    const m2 = new Man('none')
    m1.type = '111'

    console.log(m1, m1.getType(), m1.sex)
    console.log(m2, m2.getType(), m2.sex)
}


// Class的继承
function extend3() {
    console.log('---------- Class的继承 -----------')
    class Person {
        constructor() {
            this.type = 'person'
        }
        
    }

    class Man extends Person {
        constructor(sex) {
            super()
            this.sex = sex
        }
    }
    
    const m1 = new Man('man')
    const m2 = new Man('none')
    m1.type = '111'

    console.log(m1, m1.type, m1.sex)
    console.log(m2, m2.type, m2.sex)
}

