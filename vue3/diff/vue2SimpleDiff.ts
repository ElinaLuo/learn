/**
 * 极简版双端 Diff
 * @param {HTMLElement} parent - 父级真实 DOM
 * @param {Array} oldCh - 旧的虚拟节点数组 (VNodes)
 * @param {Array} newCh - 新的虚拟节点数组 (VNodes)
 */
function patchChildren(parent, oldNodeList, newNodeList) {
  const oldNodes = oldNodeList.slice();
  const newNodes = newNodeList.slice();
  let oldStartIndex = 0;
  let newStartIndex = 0;
  let oldEndIndex = oldNodeList.length - 1;
  let newEndIndex = newNodeList.length - 1;
  while (oldStartIndex <= oldEndIndex && newStartIndex <= newEndIndex) {
    // 头头比较
    if (isSameNode(oldNodes[oldStartIndex], newNodes[newStartIndex])) {
      oldStartIndex++;
      newStartIndex++;
    }
    // 尾尾比较
    else if (isSameNode(oldNodes[oldEndIndex], newNodes[newEndIndex])) {
      oldEndIndex--;
      newEndIndex--;
    }
    // 头尾比较
    else if (isSameNode(oldNodes[oldStartIndex], newNodes[newEndIndex])) {
    }
    // 尾头比较
    else if (isSameNode(oldNodes[oldEndIndex], newNodes[newStartIndex])) {
    }
  }
}

function isSameNode(a, b) {
  return a.key === b.key;
}