<script setup>
import { useRoute } from 'vue-router'
import { ref, watch } from 'vue'
import LoginHelper from '@/utilities/LoginHelper'

const { userLogout } = LoginHelper

const activeLink = ref(0)
const route = useRoute()

const determineActiveLink = () => {
  const path = route.path
  if (path === '/') {
    activeLink.value = 0 // Home link active
  } else if (path.includes('/invoice')) {
    activeLink.value = 1 // Add link active
  } else if (path.includes('/report')) {
    activeLink.value = 2 // Report link active
  } else if (path.includes('/checkout')) {
    activeLink.value = 3
  } else {
    // Handle other routes accordingly
    activeLink.value = -1 // No specific link active
  }
}

watch(
  () => route.path,
  () => {
    determineActiveLink()
  }
)

determineActiveLink()
</script>
<template>
  <nav>
    <div class="logo">
      <img src="../assets/images/Logo KKC.svg" alt="" />
    </div>
    <div class="navbar-links">
      <!-- Menggunakan router-link dengan params -->
      <div class="navbar-links-container flex fd-col">
        <RouterLink to="/" :class="{ active: activeLink === 0 }" name="Dashboard">
          <ph-house :size="24" weight="bold" />
        </RouterLink>
        <RouterLink to="/invoice" :class="{ active: activeLink === 1 }" name="Invoice">
          <ph-envelope-simple :size="24" weight="bold" />
        </RouterLink>
        <RouterLink to="/report" :class="{ active: activeLink === 2 }" name="Report">
          <ph-currency-circle-dollar :size="24" weight="bold" />
        </RouterLink>
        <RouterLink to="/checkout" :class="{ active: activeLink === 3 }" name="Checkout">
          <ph-shopping-cart-simple :size="24" weight="bold" />
        </RouterLink>
      </div>
      <div class="navbar-links__settings-container flex fd-col">
        <a href="#" name="Settings"><ph-gear :size="24" weight="bold" /></a>
        <RouterLink to="/login" name="Logout"  @click="userLogout()">
          ><ph-sign-out :size="24" weight="bold" mirrored="mirrored"
        /></RouterLink>
      </div>
    </div>
  </nav>
</template>

<style scoped>
a {
  height: 3rem; /* Fixed height for the links */
  position: relative; /* Position relative for absolute positioning */
  display: flex;
  justify-content: center; /* Center horizontally */
  align-items: center; /* Center vertically */
  text-decoration: none;
  transition: background-color 0.1s ease; /* Smooth transition for background color */
  color: #000;
}

nav {
  position: fixed;
  background-color: #ffd978;
  width: 103px;
  height: 100%;
  opacity: 0.75;
  display: flex;
  flex-direction: column;
  padding: 1rem 0;
  padding-bottom: 2rem;
}
.logo {
  text-align: center;
}
.logo img {
  width: calc(100% - 2rem);
}

.navbar-links {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  text-align: center;
  margin-top: 3rem;
  align-items: center;
}

.navbar-links-container,
.navbar-links__settings-container {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  text-align: center;
  justify-content: center;
  align-items: center;
}
.active {
  background-color: #e6be58;
  border-radius: 0.3rem;
  width: 3rem;
  height: 3rem; /* Maintain fixed size */
  display: flex;
  justify-content: center; /* Center horizontally */
  align-items: center; /* Center vertically */
  cursor: pointer;
  z-index: 999; /* Ensures it's above other elements */
  transition: background-color 0.4s ease; /* Smooth transition for background color */
}

a:hover::after {
  content: attr(name);
  position: absolute;
  top: 0.5rem;
  left: 2rem;
  background-color: rgb(0, 0, 0, 0.8);
  color: #fff;
  padding: 0.5rem;
  border-radius: 0.5rem;
  font-family: 'Poppins';
  font-weight: 500;
  font-size: 12px;
  line-height: 16px;
  white-space: nowrap;
  z-index: 9999;
}
.active:hover::after {
  transform: translateX(15%);
}
</style>