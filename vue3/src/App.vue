<script setup>
import { RouterView, RouterLink } from 'vue-router'
</script>

<template>
  <nav class="nav">
    <RouterLink to="/" class="nav-link">首页</RouterLink>
    <RouterLink to="/diff" class="nav-link">Diff 算法</RouterLink>
  </nav>
  <RouterView />
</template>

<style scoped>
.nav {
  display: flex;
  gap: 16px;
  padding: 12px 24px;
  background: #1e293b;
}

.nav-link {
  color: #94a3b8;
  text-decoration: none;
  font-size: 14px;
  font-weight: 500;
  padding: 4px 0;
}

.nav-link:hover,
.nav-link.router-link-active {
  color: #f8fafc;
}
</style>
