<script setup>
import { useRouter, RouterView } from 'vue-router'
import { ref, watchEffect } from 'vue'
import Sidebar from './components/Sidebar.vue'
import LoginHelper from './utilities/LoginHelper'

const { loggedIn } = LoginHelper

const router = useRouter()
const currentPath = ref(router.path)
const isLoginPage = ref(currentPath.value === '/login')

// Watch for route changes and update reactive variables
watchEffect(() => {
  currentPath.value = router.path
  isLoginPage.value = currentPath.value === '/login'
  if(!loggedIn.value) {
    router.push('/login')
  }
})
</script>

<template>
  <div v-if="!isLoginPage && loggedIn">
    <Sidebar/>
    <div class="pd-left-8 pd-top-2 pd-bottom-2">
      <RouterView />
    </div>
  </div>
  <div v-else>
    <RouterView />
  </div>
</template>

<style scoped></style>
