/**
 * @description 快速排序
 * 通过一趟排序将要排序的数据分割成独立的两部分，
 * 其中一部分的所有数据都比另外一部分的所有数据都要小，
 * 然后再按此方法对这两部分数据分别进行快速排序，
 * 整个排序过程可以递归进行，以此达到整个数据变成有序序列。
 * 时间复杂度 O(n log n)
 */
function quickSort(arr) {
  if(arr.length <= 1) {
    return arr //递归出口
  }
  let left = [], right = []
  let current = arr.splice(0, 1)
  for(let i = 0; i < arr.length; i++) {
    if(arr[i] < current[0]) {
      left.push(arr[i])  //放在左边
    } else {
      right.push(arr[i]) //放在右边
    }
  }
  return quickSort(left).concat(current).concat(quickSort(right))
}

console.log(quickSort([10,38,5,65,11,34,23,4,7,90]))