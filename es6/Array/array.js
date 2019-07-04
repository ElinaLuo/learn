/**
 * @description Array
 * 修改器方法（会修改自身值）：push pop unshift shift reverse sort splice
 * 访问方法（不会修改自身值）:concat includes join slice indexOf lastIndexOf toString
 * 迭代方法：forEach map every some filter find findIndex keys reduce reduceRight values
 */
const add = (...args) => args.reduce((a, b) => a + b);

const sum = add(1,2,3)

console.log(sum)