/*
Array
├── 静态方法
│   ├── Array.isArray()
│   ├── Array.from() 
│   └── Array.of()
│
├── 实例方法
    ├── 修改原数组
    │   ├── 添加删除: push/pop/unshift/shift/splice
    │   ├── 排序: sort/reverse
    │   └── 其他: fill/copyWithin
    │
    ├── 不修改原数组
        ├── 查找: some/every/find/findIndex/findLast/findLastIndex/indexOf/includes
        ├── 遍历: forEach/map/filter/reduce
        └── 转换: concat/slice/join/flat/flatMap
*/
const staticMethods = ['Array.from()', 'Array.isArray()'];
// 实例方法（会修改原数组）
const mutatingMethods = [
  'push(...items: Array<T>): number', // 尾部添加，参数不限个数，返回新的length属性
  'pop(): T', // 尾部删除，没有参数，返回删除的元素
  'unshift(...items: Array<T>): number', // 头部添加，参数不限个数，返回新的length属性
  'shift(): T', // 头部删除，没有参数，返回删除的元素
  'splice(start: number, deleteCount: number, ...items: Array<T>): Array<T>', // 删除/替换/添加，返回被删除元素的数组
  'reverse(): this', // 反转，返回数组反转后的引用
  'sort(compareFn?: (a: T, b: T) => number): this', // 排序
  'fill(value: T, start: number, end: number): this', // 填充
  'copyWithin(target: number, start: number, end: number): this', // 内部复制
];
// 实例方法（返回新数组）
const nonMutatingMethods = [
  'concat', // 连接
  'slice', // 切片
  'map', // 映射
  'filter', // 过滤
  'flat', // 扁平化
  'flatMap', // 映射+扁平化
];
// 🔗 转换和连接
const transformMethods = {
  join: '转字符串',
  toString: '转字符串',
};
// 🔍 查找元素相关
const searchMethods = {
  indexOf: '找索引(值)',
  lastIndexOf: '从后找索引',
  includes: '是否包含',
  find: '找第一个元素',
  findIndex: '找第一个索引',
  findLast: '找最后一个元素',
  findLastIndex: '找最后一个索引',
  some: '是否有满足的',
  every: '是否都满足',
};
// 🔄 循环遍历相关
const iterationMethods = {
  forEach: '遍历执行',
  map: '映射新数组',
  filter: '过滤数组',
  reduce: '累积计算',
  reduceRight: '从右累积',
};
