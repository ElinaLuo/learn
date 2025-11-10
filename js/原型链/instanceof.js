// 实现instanceof
function myInstanceOf(left, right) {
  if (left === null) return false;

  const prototype = right.prototype;
  left = Object.getPrototypeOf(left);
  while(true) {
    if (prototype === null) return false;
    if (left === prototype) return true;
    left = Object.getPrototypeOf(left);
  }
}


console.log(myInstanceOf(null, Object))
console.log(myInstanceOf({}, Object))
console.log(myInstanceOf([], Array))
console.log(myInstanceOf(12323, Number))
console.log(myInstanceOf(new Date(), Date))
console.log(myInstanceOf(function(){}, Function))
console.log(myInstanceOf(function(){}, Object))