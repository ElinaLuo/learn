function reactive(obj) {
  return new Proxy(obj, {
    get: function (target, key) {
      console.log('get function', target, key);
      return Reflect.get(target, key);
    },
    set: function (target, key, value) {
      console.log('set function');
      Reflect.set(target, key, value);
    },
    ownKeys: function (target) {
      console.log('ownKeys function');
      return Reflect.ownKeys(target);
    }
  })
}

const arr = [1, 2, 3]
const original = { foo: 1 }
const original2 = { bar: 2 }
const observed = reactive(original)
const observed2 = reactive(original2)
const proxyArr = reactive(arr)
original2.newProp = 3
// console.log(Object.getOwnPropertyNames(proxyArr));
// console.log(Object.getOwnPropertyNames(observed));
console.log('includes:', proxyArr.includes(3));
console.log('indexOf:', proxyArr.indexOf(3));
console.log('lastIndexOf:', proxyArr.lastIndexOf(3));
console.log('map:', proxyArr.map(item => item * 2));
