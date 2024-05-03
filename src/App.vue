<script setup>
import { RouterView } from 'vue-router'
import { watchEffect } from 'vue'
import Sidebar from './components/Sidebar.vue'
import LoginHelper from './utilities/LoginHelper'
import GlobalHelper from './utilities/GlobalHelper'
import AlertCard from './components/AlertCard.vue'
import WebLoader from './components/WebLoader.vue'
const { loggedIn, isAuthenticated } = LoginHelper

watchEffect(() => {
  isAuthenticated()
})
</script>

<template>
  <div class="web-loader__overlay" v-if="GlobalHelper.showLoader.value">
    <WebLoader />
  </div>
  <AlertCard />
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

<style scoped>
.web-loader__overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(6px);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 998;
}
</style>
