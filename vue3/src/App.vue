<script setup>
import { ref, reactive, computed } from "vue";
import counter from "./components/counter.vue";
import PullRefresh from "./components/pull-refresh.vue";

const obj = reactive({ count: ref(0), a: { a1: 0 }, b: 0 });
let { a, b } = obj;
let count = obj.count;
const toggle = ref();
const age = ref();
const dynamicTrueValue = { a: 1 };
const dynamicFalseValue = { b: 2 };

setTimeout(() => {
  count++
  console.log('count=', count);
  obj.count++;
  a.a1++;
  b++
}, 1000);

</script>

<template>
  <div>count={{ count }}</div>
  <div>obj.count={{ obj.count }}</div>
  <div>obj.a.a1={{ obj.a.a1 }}</div>
  <div>obj.b={{ obj.b }}</div>
  <div>age={{ age }}</div>
  <input type="number" v-model.number="age" />
  <div>toggle={{ toggle }}</div>
  <input type="checkbox" v-model="toggle" :true-value="dynamicTrueValue" :false-value="dynamicFalseValue" />
  <!-- <KeepAlive>
  </KeepAlive> -->
  <PullRefresh></PullRefresh>
</template>