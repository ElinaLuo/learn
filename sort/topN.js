/**
 * @description top K
 * 利用冒泡排序，从小到大
 * 两两进行比较，前>后则调换位置
 * 时间复杂度 O(n^K)
 */
function topK(arr, n) {
  const len = arr.length
  for(let i = 0; i < len; i++) {
    for(let j = 0; j < len - i - 1; j++) {
      if(arr[j] > arr[j+1]) {
        [arr[j], arr[j+1]] = [arr[j+1], arr[j]]
      }
    }
    if(i === n - 1) {
      break
    }
  }
  arr.reverse()
  console.log(arr.splice(0, n))
}
// 求前K个最大的数
topK([10,38,5,65,8,34,6,4,7,90], 3)