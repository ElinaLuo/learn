/**
 * 极简版双端 Diff
 * @param {HTMLElement} parent - 父级真实 DOM
 * @param {Array} oldCh - 旧的虚拟节点数组 (VNodes)
 * @param {Array} newCh - 新的虚拟节点数组 (VNodes)
 */
function updateChildren(oldNodeList, newNodeList) {
  const resultNodes = oldNodeList.slice();
  let oldStartIndex = 0;
  let newStartIndex = 0;
  let oldEndIndex = oldNodeList.length - 1;
  let newEndIndex = newNodeList.length - 1;

  let oldStartNode = oldNodeList[oldStartIndex];
  let oldEndNode = oldNodeList[oldEndIndex];
  let newStartNode = newNodeList[newStartIndex];
  let newEndNode = newNodeList[newEndIndex];
  while (oldStartIndex <= oldEndIndex && newStartIndex <= newEndIndex) {
    // 头头比较
    if (isSameNode(oldStartNode, newStartNode)) {
      oldStartNode = oldNodeList[++oldStartIndex];
      newStartNode = newNodeList[++newStartIndex];
    }
    // 尾尾比较
    else if (isSameNode(oldEndNode, newEndNode)) {
      oldEndNode = oldNodeList[--oldEndIndex];
      newEndNode = newNodeList[--newEndIndex];
    }
    // 头尾比较
    else if (isSameNode(oldStartNode, newEndNode)) {
      // 从头移到尾部
      const endIdx = resultNodes.indexOf(oldEndNode) + 1;
      resultNodes.splice(endIdx, 0, oldStartNode);
      resultNodes[oldStartIndex] = undefined;
      oldStartNode = oldNodeList[++oldStartIndex];
      newEndNode = newNodeList[--newEndIndex];
    }
    // 尾头比较
    else if (isSameNode(oldEndNode, newStartNode)) {
      // 将尾移到头部
      const startIdx = resultNodes.indexOf(oldStartNode);
      resultNodes.splice(startIdx, 0, oldEndNode);
      resultNodes[oldEndIndex] = undefined;
      oldEndNode = oldNodeList[--oldEndIndex];
      newStartNode = newNodeList[++newStartIndex];
    }
  }

  if (oldStartIndex > oldEndIndex) {
    // 旧数组已经遍历完了，说明新的多，需要增加
    resultNodes.splice(
      resultNodes.indexOf(oldEndNode) + 1,
      0,
      ...newNodeList.slice(newStartIndex, newEndIndex + 1),
    );
  } else if (newStartIndex > newEndIndex) {
    // 新数组已经遍历完了，说明新的少，需要删除
    resultNodes.splice(
      resultNodes.indexOf(oldStartNode),
      oldEndIndex - oldStartIndex + 1,
    );
  }

  return resultNodes;
}

function isSameNode(a, b) {
  return a.key === b.key;
}

function renderDom(nodeList) {
  document.body.innerHTML = nodeList
    .filter(Boolean)
    .map((node) => node.key)
    .join(',');
}

const resultNodes = updateChildren(
  [{ key: 'b' }, { key: 'c' }, { key: 'a' }],
  [{ key: 'a' }, { key: 'b' }, { key: 'c' }],
);
renderDom(resultNodes);
