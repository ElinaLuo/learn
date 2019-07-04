/**
 * @description 冒泡排序，从小到大
 * 两两进行比较，前>后则调换位置
 * 时间复杂度 O(n^2)
 */
function bubbleSort(arr) {
  const len = arr.length
  for(let i = 0; i < len; i++) {
    for(let j = 0; j < len - i - 1; j++) {
      if(arr[j] > arr[j+1]) {
        [arr[j], arr[j+1]] = [arr[j+1], arr[j]]
      }
    }
  }
  console.log(arr)
}
bubbleSort([10,38,5,65,8,34,6,4,7,90])