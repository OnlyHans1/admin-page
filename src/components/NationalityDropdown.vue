<script setup>
import { ref, onMounted, watchEffect } from 'vue'
const props = defineProps({
  nationalityWidth: { type: String, default: '17.75rem' }
})

const tempNationalityData = ref([
  { id: 1, nationality_name: 'Indonesia' },
  { id: 2, nationality_name: 'Amerika Serikat' },
  { id: 3, nationality_name: 'Inggris' },
  { id: 4, nationality_name: 'Perancis' },
  { id: 5, nationality_name: 'Jerman' },
  { id: 6, nationality_name: 'Italia' },
  { id: 7, nationality_name: 'Jepang' },
  { id: 8, nationality_name: 'Korea Selatan' },
  { id: 9, nationality_name: 'Kanada' },
  { id: 10, nationality_name: 'Australia' }
])

const nationalityQuery = ref('')
const nationalityResult = ref([])
const isNationalityDropdownOpen = ref(false)

const loadNationalityData = () => {
  if (nationalityQuery.value.trim() !== '') {
    isNationalityDropdownOpen.value = true

    const filteredData = tempNationalityData.value.filter((nationality) => {
      return nationality.nationality_name
        .toLowerCase()
        .startsWith(nationalityQuery.value.trim().toLowerCase())
    })
    nationalityResult.value = filteredData.slice(0, 8)
    isNationalityDropdownOpen.value = nationalityResult.value.length > 0
  } else {
    nationalityResult.value = []
    isNationalityDropdownOpen.value = false
  }
}

const openNationalityDropdown = () => {
  if (nationalityQuery.value.trim() === '') {
    isNationalityDropdownOpen.value = true
    nationalityResult.value = tempNationalityData.value.slice(0, 8)
  } else {
    isNationalityDropdownOpen.value = true
    loadNationalityData()
  }
}

const closeNationalityDropdown = () => {
  isNationalityDropdownOpen.value = false
  nationalityResult.value = []
}

const getNationality = (nationalityName) => {
  nationalityQuery.value = nationalityName
  nationalityResult.value = []
  isNationalityDropdownOpen.value = false
}

onMounted(() => {
  loadNationalityData()
  document.addEventListener('click', closeDropdownOutside)
})

const closeDropdownOutside = (event) => {
  const dropdownContainer = document.querySelector('.nationality-dropdown__container')
  if (dropdownContainer && !dropdownContainer.contains(event.target)) {
    closeNationalityDropdown()
  }
}

watchEffect((onInvalidate) => {
  onInvalidate(() => {
    document.removeEventListener('click', closeDropdownOutside)
  })
})
</script>

<template>
  <div class="nationality-dropdown__container" :style="{ width: nationalityWidth }">
    <input
      type="text"
      v-model="nationalityQuery"
      placeholder="Kebangsaan"
      @input="loadNationalityData"
      @focus="openNationalityDropdown"
      class="nationality-dropdown__input"
      :class="{ focus: isNationalityDropdownOpen }"
    />
    <div class="select-icon">
      <div class="arrow-icon" :class="{ active: isNationalityDropdownOpen }">
        <i class="ri-arrow-down-s-line"></i>
      </div>
    </div>
    <div
      :class="{ 'location__search-dropdown': true, active: isNationalityDropdownOpen }"
      class="w-full"
    >
      <div class="dropdown-nationality__result" :class="{ active: isNationalityDropdownOpen }">
        <div
          v-for="result in nationalityResult"
          :key="result.id"
        >
          <p
            v-if="result.nationality_name"
            class="dropdown-nationality__name"
            @click="getNationality(result.nationality_name)"
          >
            {{ result.nationality_name }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.nationality-dropdown__container {
  height: 43px;
  border-radius: 3px;
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  background-color: transparent;
  position: relative;
  outline: none;
}
input {
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  border: 0;
  width: 100%;
  height: 100%;
  border-radius: 3px;
  padding: 0.75rem 0.75rem;
  border: 2px solid black;
}
input::placeholder {
  font-family: 'Inter';
  color: black;
  font-size: 16px;
  line-height: 19px;
}
input.focus {
  outline: none;
  border: 2px solid rgba(218, 165, 32, 1);
}
.nationality-dropdown__container .select-icon {
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
.nationality-dropdown__container .select-icon i {
  font-size: 18px;
}
.dropdown-nationality__result {
  position: absolute;
  top: 2.6rem;
  background-color: white;
  width: 100%;
  box-shadow: 0px 0px 6px 0px rgba(0, 0, 0, 0.25);
  z-index: 100;
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
  border-radius: 10px;
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.3s ease;
}

.dropdown-nationality__result.active {
  max-height: 360px;
}

.dropdown-nationality__result div {
  padding: 0.5rem 1.5rem;
}
.dropdown-nationality__result div:hover {
  background-color: rgb(233, 233, 233);
}
.dropdown-nationality__result div:hover:first-child {
  border-radius: 0.5rem 0.5rem 0 0;
}
.dropdown-nationality__result div:hover:last-child {
  border-radius: 0 0 0.5rem 0.5rem;
}
.dropdown-nationality__name {
  font-family: 'Open Sans';
  font-size: 14px;
  line-height: 19px;
}
</style>
