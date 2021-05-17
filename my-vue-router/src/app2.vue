<template>
    <div>
      <div>{{ a }}</div>
      <div @click="change">主页面</div> 
      <router-view></router-view>
      <router-link :to="{path: '/foo'}">点击跳转到 foo page</router-link><br>
      <router-link :to="{path: '/bar'}">点击跳转到 bar page</router-link>
    </div>
</template>

<script>
export default {
    name: 'app',
    data() {
      return {
        a: 1,
      };
    },
    mounted() {
        console.log(this.$router);
    },
    methods: {
      change() {
        this.a = 2;
      }
    },
}
</script>

<style>

</style>

