<script setup>
import { ref, reactive, computed, watch } from "vue";
import PullRefresh from "./components/pull-refresh.vue";
import { watchDebounced } from '../../es6/debounce_throttle'

const num= ref(0)

watchDebounced(num, (newVal, oldVal) => {
  console.log('watchDebounced', newVal, oldVal)
}, { leading: false, trailing: true, wait: 2000 })

function add() {
  num.value += 1
}

</script>

<template>
  <div>num={{ num }}</div>
  <button @click="add">add</button>
  <PullRefresh></PullRefresh>
</template>
