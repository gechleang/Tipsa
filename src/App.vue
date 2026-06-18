<template>
  <div class="app-shell">
    <AppNavbar />
    <main class="app-content">
      <router-view />
    </main>
  </div>
</template>

<script setup>
import AppNavbar from './components/AppNavbar.vue'
</script>

<style scoped>
.app-shell {
  min-height: 100vh;
  color: var(--text-primary);
}

.app-content {
  min-height: calc(100vh - 72px);
}
</style>
