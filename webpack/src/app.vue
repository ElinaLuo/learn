<template>
  <div class="container">
    <div>{{ message }}</div>
    <Star :star="star" :canClick=true @click="handleClick"></Star>
  </div>
</template>

<script>
import Star from '@seed/elements/lib/star/vue';

export default {
 name: 'app',
 props: {
   message: String,
 },
 data() {
   return {
     star: 0,
   }
 },
 components: {
   Star,
 },
 methods: {
   handleClick(score) {
     this.star = score;
   }
 },
}
</script>