<script setup>
import { ref } from 'vue';
import { RouterLink } from 'vue-router';
const activeLink = ref(0);

const selected = (index) => {
    activeLink.value = index;
};
</script>

<template>
<nav>
    <div class="logo">
        <img src="../assets/images/Logo KKC.svg" alt="">
    </div>
    <div class="navbar-links">
        <div class="navbar-links_container flex fd-col">
            <RouterLink to="/dashboard" @click="selected(0)" :class="{active: activeLink === 0}"><i class="ri-home-2-line"></i></RouterLink>
            <RouterLink to="/add" @click="selected(1)" :class="{active: activeLink === 1}"><i class="ri-mail-line"></i></RouterLink>
            <RouterLink to="/add" @click="selected(2)" :class="{active: activeLink === 2}"><i class="ri-money-dollar-circle-line"></i></RouterLink>
            
        </div>
        <div class="navbar-links_container-settings flex fd-col">
            <a href="#"><i class="ri-settings-3-line"></i></a>
            <a href="#"><i class="ri-logout-box-line"></i></a>
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

}
i {
    font-size: 25px;
    color: #000;
}
nav {
    position: fixed;
    background-color: #FFD978;
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

.navbar-links_container,
.navbar-links_container-settings {
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
    z-index: 1; /* Ensures it's above other elements */
    transition: background-color 0.1s ease; /* Smooth transition for background color */
}
</style>
