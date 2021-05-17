const currify = (fn, num) => {
  let args = [];
  const result = (...rest) => {
    args.push(...rest);
    if (args.length === num) return () => fn(...args);
    return result;
  }
  return result;
}

function add(...nums) {
  return nums.reduce((result, num) => result + num, 0)
}

var currifiedAdd = currify(add, 4);

console.log(currifiedAdd(1)(2, 3)(4)());



