/**
 * 极简版双端 Diff
 * @param {HTMLElement} parent - 父级真实 DOM
 * @param {Array} oldCh - 旧的虚拟节点数组 (VNodes)
 * @param {Array} newCh - 新的虚拟节点数组 (VNodes)
 */
function patchChildren(parent, oldCh, newCh) {
  let oldStartIdx = 0;              // 旧头索引
  let newStartIdx = 0;              // 新头索引
  let oldEndIdx = oldCh.length - 1; // 旧尾索引
  let newEndIdx = newCh.length - 1; // 新尾索引

  let oldStartVNode = oldCh[0];
  let oldEndVNode = oldCh[oldEndIdx];
  let newStartVNode = newCh[0];
  let newEndVNode = newCh[newEndIdx];

  // 只要两边都还没遍历完，就继续比对
  while (oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx) {
    if (!oldStartVNode) {
      oldStartVNode = oldCh[++oldStartIdx];
    } else if (!oldEndVNode) {
      oldEndVNode = oldCh[--oldEndIdx];
    } 
    // 1. 旧头 vs 新头 (最理想情况)
    else if (isSameNode(oldStartVNode, newStartVNode)) {
      patch(oldStartVNode, newStartVNode); // 更新属性
      oldStartVNode = oldCh[++oldStartIdx];
      newStartVNode = newCh[++newStartIdx];
    }
    // 2. 旧尾 vs 新尾
    else if (isSameNode(oldEndVNode, newEndVNode)) {
      patch(oldEndVNode, newEndVNode);
      oldEndVNode = oldCh[--oldEndIdx];
      newEndVNode = newCh[--newEndIdx];
    }
    // 3. 旧头 vs 新尾 (节点反转：头跑到了尾)
    else if (isSameNode(oldStartVNode, newEndVNode)) {
      patch(oldStartVNode, newEndVNode);
      // 把旧头对应的真实 DOM 移动到最后面
      parent.insertBefore(oldStartVNode.el, oldEndVNode.el.nextSibling);
      oldStartVNode = oldCh[++oldStartIdx];
      newEndVNode = newCh[--newEndIdx];
    }
    // 4. 旧尾 vs 新头 (节点反转：尾跑到了头)
    else if (isSameNode(oldEndVNode, newStartVNode)) {
      patch(oldEndVNode, newStartVNode);
      // 把旧尾对应的真实 DOM 移动到最前面
      parent.insertBefore(oldEndVNode.el, oldStartVNode.el);
      oldEndVNode = oldCh[--oldEndIdx];
      newStartVNode = newCh[++newStartIdx];
    }
    // 5. 暴力对比 (乱序查找)
    else {
      // 在旧节点中寻找新头节点对应的 key
      const idxInOld = findIdxInOld(newStartVNode, oldCh, oldStartIdx, oldEndIdx);
      if (idxInOld === undefined) {
        // 找不到，说明是纯新人，新建并插入
        parent.insertBefore(createElm(newStartVNode), oldStartVNode.el);
      } else {
        // 找到了，移动该节点
        const vnodeToMove = oldCh[idxInOld];
        patch(vnodeToMove, newStartVNode);
        parent.insertBefore(vnodeToMove.el, oldStartVNode.el);
        oldCh[idxInOld] = undefined; // 标记已处理
      }
      newStartVNode = newCh[++newStartIdx];
    }
  }

  // 收尾：处理剩余节点 (新增或删除)
  if (oldStartIdx <= oldEndIdx) {
    // 旧的剩了，删除
    removeNodes(parent, oldCh, oldStartIdx, oldEndIdx);
  } else if (newStartIdx <= newEndIdx) {
    // 新的剩了，插入
    addNodes(parent, newCh, newStartIdx, newEndIdx, oldStartVNode ? oldStartVNode.el : null);
  }
}

function isSameNode(a, b) {
  return a.key === b.key && a.type === b.type;
}
function patch(oldVNode, newVNode) {
}
function removeNodes(parent, vnodes, startIdx, endIdx) {
}
function addNodes(parent, vnodes, startIdx, endIdx, insertBefore) {
}