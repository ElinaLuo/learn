/**
 * @description 希尔排序
 */
function shellSort(array) {
  const length = array.length
  let gap = Math.floor(length / 2)
  while (gap > 0) {
    for (var i = gap; i < length; i++) {
      for (var j = i; j > 0; j -= gap) {
        // console.log(i, j-gap, gap)
        if (array[j - gap] > array[j]) {
          [array[j], array[j - gap]] = [array[j - gap], array[j]]
        } else {
          break
        }
      }
    }
    gap = Math.floor(gap / 2)
  }
  console.log(array)
  return array
}
shellSort([10,38,5,65,11,34,23,4,7,90])