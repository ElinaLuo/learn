<template>
    <div>
        <div>主页面</div> 
        <router-view></router-view>
        <router-link :to="{path: '/foo'}">点击跳转到 foo page</router-link><br>
        <router-link :to="{path: '/bar'}">点击跳转到 bar page</router-link>
    </div>
</template>

<script>
export default {
    name: 'app',
    mounted() {
        console.log(this.$router);
    },
}
</script>

<style>

</style>

