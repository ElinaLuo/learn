<script setup>
import { ref } from 'vue'
import counter from './components/counter.vue';

const awesome = ref(true)
</script>

<template>
  <button @click="awesome = !awesome">toggle</button>

	<h1 v-if="awesome">Vue is awesome!</h1>
	<h1 v-else>Oh no 😢</h1>
  <KeepAlive>
    <counter v-if="awesome" />
    <counter v-else />
  </KeepAlive>
</template>