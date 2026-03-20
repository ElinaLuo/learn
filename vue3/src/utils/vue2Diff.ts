/**
 * 极简版双端 Diff —— Vue2 updateChildren 核心算法
 *
 * 思路：同时维护新旧两个数组的头尾双指针，每轮循环按顺序尝试四种比较策略，
 * 命中后仅移动 DOM（不重建），最大程度复用已有节点。
 * 四种策略均未命中时降级为 Map 查找（O(1)）。
 *
 * @param {HTMLElement} parent      - 父级真实 DOM 节点
 * @param {Array}       oldNodeList - 旧的虚拟节点数组
 * @param {Array}       newNodeList - 新的虚拟节点数组
 */
export function updateChildren(parent, oldNodeList, newNodeList) {
  // ── 初始化双指针 ──────────────────────────────────────────────────────────
  let oldStartIndex = 0;                        // 旧头指针
  let newStartIndex = 0;                        // 新头指针
  let oldEndIndex = oldNodeList.length - 1;     // 旧尾指针
  let newEndIndex = newNodeList.length - 1;     // 新尾指针

  let oldStartNode = oldNodeList[oldStartIndex]; // 旧头节点
  let oldEndNode   = oldNodeList[oldEndIndex];   // 旧尾节点
  let newStartNode = newNodeList[newStartIndex]; // 新头节点
  let newEndNode   = newNodeList[newEndIndex];   // 新尾节点

  let oldKeyToIdx; // 懒建的 key → oldIndex Map（进入乱序分支时才创建）

  // ── 主循环：两端指针都未越界时持续比对 ───────────────────────────────────
  while (oldStartIndex <= oldEndIndex && newStartIndex <= newEndIndex) {

    // 跳过已在乱序阶段被标记为 undefined 的旧节点
    if (oldStartNode === undefined) {
      oldStartNode = oldNodeList[++oldStartIndex];
    } else if (oldEndNode === undefined) {
      oldEndNode = oldNodeList[--oldEndIndex];

    // ── 策略 1：旧头 vs 新头 ─────────────────────────────────────────────
    // 两端头部相同，节点原地不动，双头指针同时后移
    } else if (isSameNode(oldStartNode, newStartNode)) {
      oldStartNode = oldNodeList[++oldStartIndex];
      newStartNode = newNodeList[++newStartIndex];

    // ── 策略 2：旧尾 vs 新尾 ─────────────────────────────────────────────
    // 两端尾部相同，节点原地不动，双尾指针同时前移
    } else if (isSameNode(oldEndNode, newEndNode)) {
      oldEndNode = oldNodeList[--oldEndIndex];
      newEndNode = newNodeList[--newEndIndex];

    // ── 策略 3：旧头 vs 新尾 ─────────────────────────────────────────────
    // 旧头节点跑到了新数组的尾部，将其真实 DOM 移到旧尾节点之后
    } else if (isSameNode(oldStartNode, newEndNode)) {
      parent.insertBefore(oldStartNode.elm, oldEndNode.elm.nextSibling);
      oldStartNode = oldNodeList[++oldStartIndex];
      newEndNode   = newNodeList[--newEndIndex];

    // ── 策略 4：旧尾 vs 新头 ─────────────────────────────────────────────
    // 旧尾节点跑到了新数组的头部，将其真实 DOM 移到旧头节点之前
    } else if (isSameNode(oldEndNode, newStartNode)) {
      parent.insertBefore(oldEndNode.elm, oldStartNode.elm);
      oldEndNode   = oldNodeList[--oldEndIndex];
      newStartNode = newNodeList[++newStartIndex];

    // ── 策略 5：四种比较均未命中，乱序查找 ──────────────────────────────
    } else {
      // 首次进入时，对旧数组剩余区间建 key → index 的 Map（懒建，只建一次）
      if (!oldKeyToIdx) {
        oldKeyToIdx = createKeyToOldIdx(oldNodeList, oldStartIndex, oldEndIndex);
      }

      // 用新头节点的 key 在 Map 中 O(1) 查找对应的旧节点下标
      const oldIndex =
        newStartNode.key != null
          ? oldKeyToIdx[newStartNode.key] // 有 key → Map 直接取，O(1)
          : undefined;                    // 无 key → 视为全新节点

      if (oldIndex !== undefined) {
        // 在旧数组中找到了可复用节点，将其移到旧头节点之前
        parent.insertBefore(oldNodeList[oldIndex].elm, oldStartNode.elm);
        // 标记该旧节点已处理，避免后续重复操作
        oldNodeList[oldIndex] = undefined;
      } else {
        // 旧数组中不存在，说明是全新节点，直接插入到旧头节点之前
        parent.insertBefore(newStartNode.elm, oldStartNode.elm);
      }

      // 新头指针后移，继续处理下一个新节点
      newStartNode = newNodeList[++newStartIndex];
    }
  }

  // ── 收尾：处理循环结束后的剩余节点 ──────────────────────────────────────

  if (oldStartIndex > oldEndIndex) {
    // 旧数组已全部处理完，新数组还有剩余 → 批量插入新节点
    // 插入位置：旧尾指针右侧第一个节点之前（保证顺序正确），若无则追加到末尾
    const refElm = oldNodeList[oldEndIndex + 1]?.elm ?? null;
    for (let i = newStartIndex; i <= newEndIndex; i++) {
      parent.insertBefore(newNodeList[i].elm, refElm);
    }
  } else if (newStartIndex > newEndIndex) {
    // 新数组已全部处理完，旧数组还有剩余 → 批量删除多余旧节点
    // 跳过乱序阶段已被置为 undefined 的节点
    for (let i = oldStartIndex; i <= oldEndIndex; i++) {
      if (oldNodeList[i]) {
        parent.removeChild(oldNodeList[i].elm);
      }
    }
  }
}

function isSameNode(a, b) {
  return a && b && a.key === b.key;
}

/**
 * 构建 key → oldIndex 的 Map，只覆盖 [beginIdx, endIdx] 范围内的旧节点
 */
function createKeyToOldIdx(children, beginIdx, endIdx) {
  const map = {};
  for (let i = beginIdx; i <= endIdx; i++) {
    const key = children[i]?.key;
    if (key != null) map[key] = i;
  }
  return map;
}