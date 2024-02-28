<script setup>
import { RouterLink, RouterView } from 'vue-router'
import Sidebar from './components/Sidebar.vue';
</script>

<template>
  <Sidebar/>
  <div class="pd-left-8 pd-top-2 pd-bottom-2">
    <RouterView />
  </div>
</template>

<style scoped>
</style>
