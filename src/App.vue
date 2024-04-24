<script setup>
import { useRoute, RouterView } from 'vue-router'
import { ref, watchEffect } from 'vue'
import Sidebar from './components/Sidebar.vue'

const route = useRoute()
const currentPath = ref(route.path)
const isLoginPage = ref(currentPath.value === '/login')

// Watch for route changes and update reactive variables
watchEffect(() => {
  currentPath.value = route.path
  isLoginPage.value = currentPath.value === '/login'
})
</script>

<template>
  <div v-if="!isLoginPage">
    <Sidebar/>
    <div class="pd-left-8 pd-top-2 pd-bottom-2">
      <RouterView />
    </div>
  </div>
  <div v-else>
    <RouterView />
  </div>
</template>

<style scoped>
</style>
