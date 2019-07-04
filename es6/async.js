const arr = [1, 2, 3]

let wait = function(timeout) {
  return new Promise(resolve => {
    setTimeout(resolve, timeout, 'that')
  })
}

;(async () => {
  for(let i = 0; i < arr.length; i++) {
    let temp = await wait(1000)
    console.log(arr[i], temp)
  }
})()
