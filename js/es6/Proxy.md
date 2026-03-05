# Proxy

[Proxy handler 13种拦截器](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Proxy/Proxy#%E5%A4%84%E7%90%86%E5%99%A8%E5%87%BD%E6%95%B0)

- get(target, propKey, receiver)
- set(target, propKey, value, receiver)
- has(target, propKey) 针对in操作符
- defineProperty(target, propKey, propDesc) 拦截对象的Object.defineProperty操作
- deleteProperty(target, propKey)
- ownKeys(target)
  - 拦截以下操作： Object.getOwnPropertyNames()/Object.getOwnPropertySymbols()/Object.keys()/Reflect.ownKeys()
- getPrototypeOf(target) 获取对象原型
- setPrototypeOf(target, proto) 用来拦截Object.setPrototypeOf()
- apply(target, thisArg, args) 用于拦截函数的调用
- construct(target, args) 用于拦截new操作符
- getOwnPropertyDescriptor(target, propKey) 是Object.getOwnPropertyDescriptor的钩子
- isExtensible(target) 用于拦截对象的 Object.isExtensible()，判断一个对象是否是可扩展的（是否可以在它上面添加新的属性）
- preventExtensions(target) 用于设置对Object.preventExtensions()的拦截，防止新属性被添加到对象中（即防止该对象被扩展）。它还可以防止对象的原型被重新指定。
