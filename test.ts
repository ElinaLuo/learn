function toHex(num: number, base: number): string {
  const list = [0,1,2,3,4,5,6,7,8,9,'a','b','c','d','e','f']
  const res: Array<number | string> = []
  if (num === 0) return "0"
  if (num < 0) {
    num = Math.pow(2, 32) - Math.abs(num)
  }
  while(num > 0) {
    const remain = num % base
    res.unshift(list[remain])
    num = Math.floor(num / base)
    // console.log(num, remain)
  }
  return res.join('')
};

// console.log(toHex(26, 16)) 
// console.log(toHex(26, 2)) 
const num = -1
console.log(toHex(Math.abs(num), 2))
