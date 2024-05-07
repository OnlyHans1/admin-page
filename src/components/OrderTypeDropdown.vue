<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

const emit = defineEmits(['option-selected']);

const isOpen = ref(false);
const selectedOrderType = ref('');

const options = ['Tiket', 'Paket', 'Mancanegara']; // Example options

const toggleDropdown = () => {
  isOpen.value = !isOpen.value;
};

const selectOption = (value) => {
  selectedOrderType.value = value;
  isOpen.value = false;
  emit('option-selected', selectedOrderType.value);

};

const closeDropdownOnClickOutside = (event) => {  
  if (!event.target.closest('.order-type__input-dropdown') && !event.target.closest('.order-type__input-dropdown_menu')) {
    isOpen.value = false;
  }
};

onMounted(() => {
  window.addEventListener('click', closeDropdownOnClickOutside);
});

onUnmounted(() => {
  window.removeEventListener('click', closeDropdownOnClickOutside);
});

</script>


<template>
    <div class="order-type__input-dropdown">
      <input
        readonly
        @click="toggleDropdown"
        :value="selectedOrderType"
        placeholder="Pilih Tipe Tiket"
      />
      <div class="select-icon" @click="toggleDropdown">
        <div class="arrow-icon" :class="{ active: isOpen }">
          <ph-caret-down :size="14" weight="bold" class="icon" />
        </div>
      </div>
      <div class="order-type__input-dropdown_menu" :class="{ active: isOpen }">
        <p v-for="option in options" :key="option" @click="selectOption(option)">{{ option }}</p>
      </div>
    </div>
</template>
  
<style scoped>
.order-type__input-dropdown {
  position: relative;
  height: 2rem;
  width: 15rem;
  border-radius: 0.5rem;
  border: 1px solid black;
  cursor: pointer;
}

.order-type__input-dropdown input {
  width: 100%;
  height: 100%;
  border: 0;
  border-radius: 0.5rem;
  padding: 0.5rem;
  background-color: transparent;
  cursor: pointer;
}

.select-icon {
  position: absolute;
  top: 50%;
  right: 10px;
  transform: translateY(-50%);
}

.arrow-icon {
  transition: all 300ms ease;
}

.arrow-icon.active {
  transform: rotate(180deg);
}

.order-type__input-dropdown_menu {
  position: absolute;
  top: calc(100% + 5px);
  left: 0;
  width: 100%;
  background-color: white;
  border-radius: 0.5rem;
  display: none;
  overflow: hidden;
  box-shadow: 0px 0px 10px 1px rgba(0, 0, 0, 0.2);
  z-index: 200;
}

.order-type__input-dropdown_menu.active {
  display: block;
}

.order-type__input-dropdown_menu p {
  padding: 0.3rem 0.6rem;
}

.order-type__input-dropdown_menu p:hover {
  background-color: rgb(233, 233, 233);
}

.order-type__input-dropdown_menu p:hover:first-child {
  border-radius: 0.5rem 0.5rem 0 0;
}

.order-type__input-dropdown_menu p:hover:last-child {
  border-radius: 0 0 0.5rem 0.5rem;
}
</style>
