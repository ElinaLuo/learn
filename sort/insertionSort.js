/**
 * @description 插入排序
 * 将一个数据插入到已经排好序的有序数据中，从而得到一个新的、个数加一的有序数据
 * 时间复杂度 O(n^2)
 */
function insertionSort(arr) {
  // 外循环从1开始，默认arr[0]是有序段
  for(let i = 1; i < arr.length; i++) {
    // j = i，将arr[j]依次插入有序段中
    for(let j = i; j > 0; j--) {
      if(arr[j] < arr[j-1]) {
        [arr[j], arr[j-1]] = [arr[j-1], arr[j]]
      } else {
        break
      }
    }
  }
  console.log(arr)
  return arr
}
insertionSort([1,38,5,65,11,34,23,4,7,90])