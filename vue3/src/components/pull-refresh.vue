<template>
  <van-pull-refresh style="min-height: 300px;" v-model="isLoading" @refresh="onRefresh">
    <p>刷新次数</p>
    <!-- 你的内容 -->
  </van-pull-refresh>
</template>

<script setup>
import { ref } from 'vue';
import { PullRefresh as VanPullRefresh } from 'vant';

const isLoading = ref(false);
const count = ref(0);

const onRefresh = () => {
  // setTimeout(() => {
    count.value++;
    isLoading.value = false;
  // }, 1000);
};
</script>