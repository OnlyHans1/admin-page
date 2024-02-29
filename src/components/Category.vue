<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
const props = defineProps({
  categoryWidth: { type: String, default: '15rem' }
})

const isDropdownOpen = ref(false)
const selected = ref('')

const toggleDropdown = () => {
  isDropdownOpen.value = !isDropdownOpen.value
}
const closeDropdownOnClickOutside = (event) => {
  if (
    !event.target.closest('.category__input-dropdown') &&
    !event.target.closest('.category__input-dropdown_menu')
  ) {
    isDropdownOpen.value = false
  }
}

const selectOption = (value) => {
  selected.value = value
}

onMounted(() => {
  window.addEventListener('click', closeDropdownOnClickOutside)
})

onUnmounted(() => {
  window.removeEventListener('click', closeDropdownOnClickOutside)
})

defineExpose({ selected })
</script>
<template>
  <div
    class="category__input-dropdown"
    :style="{ width: categoryWidth }"
    :class="{ focus: isDropdownOpen }"
  >
    <input readonly @click="toggleDropdown()" :value="selected" placeholder="Pilih Kategori" />
    <div class="select-icon">
      <div class="arrow-icon" :class="{ active: isDropdownOpen }">
        <i class="ri-arrow-down-s-line"></i>
      </div>
    </div>
    <div name="" id="" class="category__input-dropdown_menu" :class="{ active: isDropdownOpen }">
      <p @click="selectOption('Umum')">Umum</p>
      <p @click="selectOption('Pelajar')">Pelajar</p>
      <p @click="selectOption('Mancanegara')">Mancanegara</p>
    </div>
  </div>
</template>

<style scoped>
.category__input-dropdown {
  height: 2rem;
  border-radius: 0.5rem;
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  background-color: transparent;
  position: relative;
  border: 1px solid black;
}
.category__input-dropdown .focus {
  border: 1px solid rgba(255, 226, 154, 1);
}
input {
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  border: 0;
  width: 100%;
  height: 100%;
  border-radius: 0.5rem;
  padding: 0.5rem;
}

.category__input-dropdown .select-icon {
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
}
.arrow-icon {
  transition: all 300ms ease;
}
.arrow-icon.active {
  transform: rotate(180deg);
}
.category__input-dropdown .select-icon i {
  font-size: 18px;
}
.category__input-dropdown-container {
  width: 20rem;
  height: 2rem;
  padding: 0.5rem;
  border-radius: 0.5rem;
  background-color: transparent;
}
.category__input-dropdown_menu {
  position: absolute;
  top: 2.6rem;
  background-color: white;
  width: 100%;
  box-shadow: 0px 0px 10px 1px rgba(0, 0, 0, 0.2);
  z-index: 100;
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
  border-radius: 0.5rem;
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.3s ease;
}

.category__input-dropdown_menu.active {
  max-height: 200px;
}

.category__input-dropdown_menu p {
  padding: 0.3rem 0.6rem;
}
.category__input-dropdown_menu p:hover {
  background-color: rgb(233, 233, 233);
}
.category__input-dropdown_menu p:hover:first-child {
  border-radius: 0.5rem 0.5rem 0 0;
}
.category__input-dropdown_menu p:hover:last-child {
  border-radius: 0 0 0.5rem 0.5rem;
}
</style>
