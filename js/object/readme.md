查看图片《对象遍历方法对比图完整版.png》


# 迭代方法
Object.keys 获取自身且可枚举的属性（推荐）
for...in 获取自身及原型链上所有可枚举的属性

# 常见问题
1.获取自身所有的属性（包含不可枚举）
方法一：Object.getOwnPropertyNames 和 Object.getOwnPropertySymbols
方法二：Reflect.ownKeys

2.判断是否是自有属性
Object.hasOwn（推荐）
Object.prototype.hasOwnProperty

3.获取对象上所有可枚举的属性
for...in

4.获取自身可枚举的属性
方法一：for...in + Object.hasOwn
方法二：Object.keys