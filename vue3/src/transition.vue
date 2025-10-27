<template>
  <button @click="show = !show">切换</button>
  <transition name="slide">
    <div v-if="show" class="box">滑动显示的内容</div>
  </transition>
</template>

<script setup>
import { ref } from 'vue'

const show = ref(false)
</script>

<style scoped>
.slide-enter-from {
  opacity: 0;
  transform: translateX(-100px);
  /* 插入时机：元素插入DOM时立即添加 */
  /* 删除时机：下一帧开始时移除 */
}

.slide-enter-active {
  transition: all 0.5s ease-out;
  /* 插入时机：元素插入DOM时立即添加 */
  /* 删除时机：动画完全结束时移除 */
}

.slide-enter-to {
  opacity: 1;
  transform: translateX(0);
  /* 插入时机：下一帧开始时添加 */
  /* 删除时机：动画完全结束时移除 */
}

.box {
  width: 200px;
  height: 100px;
  background: linear-gradient(45deg, #667eea, #764ba2);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
}
</style>