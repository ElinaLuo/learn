<script setup>
import { ref, onMounted } from "vue";
import { updateChildren } from "../utils/vue2diff";

// ─────────────────────────────────────────────
// 测试逻辑
// ─────────────────────────────────────────────

class VNode {
  constructor(key) {
    this.key = key;
    const el = document.createElement("span");
    el.textContent = key;
    el.className = "node-item";
    this.elm = el;
  }
}

const testCases = [
  { name: "完全相同", old: ["a", "b", "c"], new: ["a", "b", "c"] },
  { name: "尾部新增", old: ["a", "b", "c"], new: ["a", "b", "c", "d", "e"] },
  { name: "头部新增", old: ["c", "d", "e"], new: ["a", "b", "c", "d", "e"] },
  { name: "尾部删除", old: ["a", "b", "c", "d"], new: ["a", "b"] },
  { name: "头部删除", old: ["a", "b", "c", "d"], new: ["c", "d"] },
  { name: "头尾互换", old: ["a", "b", "c", "d"], new: ["d", "b", "c", "a"] },
  { name: "尾头互换", old: ["d", "b", "c", "a"], new: ["a", "b", "c", "d"] },
  {
    name: "乱序-包含旧节点",
    old: ["a", "b", "c", "d", "e"],
    new: ["e", "c", "a"],
  },
  { name: "乱序+新增", old: ["a", "b", "c"], new: ["d", "b", "a"] },
  { name: "全量替换", old: ["a", "b", "c"], new: ["x", "y", "z"] },
  { name: "旧为空", old: [], new: ["a", "b", "c"] },
  { name: "新为空", old: ["a", "b", "c"], new: [] },
  {
    name: "复杂乱序",
    old: ["d", "b", "a", "c", "f"],
    new: ["a", "f", "d", "e", "c", "b"],
  },
  {
    name: "复杂乱序(删减)",
    old: ["a", "f", "d", "e", "c", "b"],
    new: ["d", "b", "a", "c"],
  },
];

const results = ref([]);

onMounted(() => {
  results.value = testCases.map((tc) => {
    // 创建隐藏容器跑 diff
    const container = document.createElement("div");
    document.body.appendChild(container);

    const oldNodes = tc.old.map((k) => new VNode(k));
    const newNodes = tc.new.map((k) => new VNode(k));
    oldNodes.forEach((n) => container.appendChild(n.elm));
    updateChildren(container, oldNodes, newNodes);

    const actual = Array.from(container.children).map((el) => el.textContent);
    document.body.removeChild(container);

    return {
      name: tc.name,
      old: tc.old,
      new: tc.new,
      actual,
      pass: JSON.stringify(actual) === JSON.stringify(tc.new),
    };
  });
});
</script>

<template>
  <div class="diff-page">
    <h2>Vue2 双端 Diff 测试</h2>
    <p class="subtitle">
      共 {{ results.length }} 个用例，通过
      {{ results.filter((r) => r.pass).length }} 个
    </p>

    <div class="case-list">
      <div
        v-for="r in results"
        :key="r.name"
        class="case-card"
        :class="r.pass ? 'pass' : 'fail'"
      >
        <div class="case-header">
          <span class="badge">{{ r.pass ? "✓ 通过" : "✗ 失败" }}</span>
          <span class="case-name">{{ r.name }}</span>
        </div>
        <div class="case-body">
          <div class="row">
            <span class="label">旧：</span>
            <span class="nodes">
              <span v-for="k in r.old" :key="k" class="node old-node">{{
                k
              }}</span>
              <span v-if="!r.old.length" class="empty">（空）</span>
            </span>
          </div>
          <div class="row">
            <span class="label">期望：</span>
            <span class="nodes">
              <span v-for="k in r.new" :key="k" class="node new-node">{{
                k
              }}</span>
              <span v-if="!r.new.length" class="empty">（空）</span>
            </span>
          </div>
          <div class="row" v-if="!r.pass">
            <span class="label">实际：</span>
            <span class="nodes">
              <span v-for="k in r.actual" :key="k" class="node actual-node">{{
                k
              }}</span>
              <span v-if="!r.actual.length" class="empty">（空）</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.diff-page {
  padding: 24px;
  font-family: system-ui, sans-serif;
  max-width: 720px;
  margin: 0 auto;
}

h2 {
  font-size: 22px;
  font-weight: 700;
  margin-bottom: 4px;
}

.subtitle {
  color: #666;
  margin-bottom: 20px;
  font-size: 14px;
}

.case-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.case-card {
  border-radius: 8px;
  border: 1px solid #e5e7eb;
  overflow: hidden;
}

.case-card.pass {
  border-left: 4px solid #22c55e;
}
.case-card.fail {
  border-left: 4px solid #ef4444;
}

.case-header {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 14px;
  background: #f9fafb;
  border-bottom: 1px solid #e5e7eb;
}

.badge {
  font-size: 12px;
  font-weight: 600;
  padding: 2px 8px;
  border-radius: 999px;
}

.pass .badge {
  background: #dcfce7;
  color: #166534;
}
.fail .badge {
  background: #fee2e2;
  color: #991b1b;
}

.case-name {
  font-weight: 600;
  font-size: 14px;
}

.case-body {
  padding: 10px 14px;
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.row {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;
}

.label {
  color: #6b7280;
  width: 44px;
  flex-shrink: 0;
}

.nodes {
  display: flex;
  gap: 4px;
  flex-wrap: wrap;
}

.node {
  display: inline-block;
  padding: 2px 10px;
  border-radius: 4px;
  font-weight: 600;
  font-size: 13px;
}

.old-node {
  background: #f3f4f6;
  color: #374151;
}
.new-node {
  background: #dbeafe;
  color: #1e40af;
}
.actual-node {
  background: #fee2e2;
  color: #991b1b;
}

.empty {
  color: #9ca3af;
  font-size: 12px;
}
</style>
