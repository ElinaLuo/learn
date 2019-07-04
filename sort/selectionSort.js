/**
 * @description 选择排序
 * 每次找到最小的数放到最前面
 * 时间复杂度 O(n^2)
 */
function selectionSort(arr) {
  const len = arr.length;
  let minIndex
  for(let i = 0; i < len - 1; i++) {
    minIndex = i
    for(let j = i + 1; j < len; j++) {
      if(arr[j] < arr[minIndex]) {
        minIndex = j
      }
    }
    [arr[minIndex], arr[i]] = [arr[i], arr[minIndex]]
  }
  console.log(arr)
  return arr
}
selectionSort([1,38,5,65,11,34,23,4,7,90])