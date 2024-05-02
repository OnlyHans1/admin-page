<script setup>
import { RouterView } from 'vue-router'
import { watchEffect } from 'vue'
import Sidebar from './components/Sidebar.vue'
import LoginHelper from './utilities/LoginHelper'

const { loggedIn, isAuthenticated } = LoginHelper

watchEffect(() => {
  isAuthenticated()
})
</script>

<template>
  <div v-if="loggedIn">
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
