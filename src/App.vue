<script setup>
import { useRouter, useRoute, RouterView } from 'vue-router'
import { onMounted, ref, watchEffect } from 'vue'
import Sidebar from './components/Sidebar.vue'
import LoginHelper from './utilities/LoginHelper'

const { loggedIn } = LoginHelper

const router = useRouter()
const route = useRoute()
const currentPath = ref(route.path)
const isLoginPage = ref(currentPath.value === '/login')

const routeCheck = () => {
  currentPath.value = route.path
  isLoginPage.value = (currentPath.value === '/login')
}

// Watch for route changes and update reactive variables
watchEffect(() => {
  routeCheck()
  if (!loggedIn.value) {
    router.push('/login')
  }
})

onMounted(() => {
  routeCheck()
}) 
</script>

<template>
  <div v-if="!isLoginPage && loggedIn">
    <Sidebar />
    <div class="pd-left-8 pd-top-2 pd-bottom-2">
      <RouterView />
    </div>
  </div>
  <div v-else>
    <RouterView />
  </div>
</template>

<style scoped></style>
