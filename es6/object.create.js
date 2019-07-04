/**
 * 实现 Object.create
 * https://juejin.im/post/5a9ce60b6fb9a028cc60b69c
 * @param {Object} obj 现有对象
 */
function create1(obj) {
    function F() {}
    // 通过原型，让新对象具有现有对象的属性
    F.prototype = obj
    return new F()
}
// 或者
function create2(obj) {
  let B = {}
  Object.setPrototypeOf(B, obj)
  return B
};

const A = {
    print: function() {
        console.log('a')
    }
}

let b1 = create1(A)
let b2 = create2(A)
b1.print()
b2.print()

// b.print()