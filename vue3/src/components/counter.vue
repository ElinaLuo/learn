<template>
  <div>
    {{ count }}
    <button @click="handleAdd">+1</button>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const count = ref(0);

const handleAdd = () => { count.value++ }

</script>