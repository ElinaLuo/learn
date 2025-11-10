/**
 * @description 定时器
 * @param {Number} time 
 */
async function sleep(time) {
  return new Promise(resolve => {
    setTimeout(resolve, time)
  })
}

async function main() {
  await sleep(2000)
  console.log('sleep recover')
}

main()
