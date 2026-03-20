<script setup>
import { ref } from 'vue'
import PullRefresh from '../components/pull-refresh.vue'
import { watchDebounced } from '../../../js/debounce/watchDebounced'

const num = ref(0)

watchDebounced(
  num,
  (newVal, oldVal) => {
    console.log('watchDebounced', newVal, oldVal)
  },
  { leading: false, trailing: true, wait: 2000 }
)

function add() {
  num.value += 1
}
</script>

<template>
  <div style="padding: 24px">
    <div>num={{ num }}</div>
    <button @click="add">add</button>
    <PullRefresh />
  </div>
</template>
