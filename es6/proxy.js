const data = { a: 1 }

const proxy = new Proxy(data, {
  get: function (target, key) {
    console.log('get function');
    return Reflect.get(target, key);
  },
  set: function (target, key, value) {
    console.log('set function');
    Reflect.set(target, key, value);
  }
})

proxy.a = 2;
console.log(proxy.a);