<script setup>
import { ref, onMounted, watchEffect } from 'vue'
const props = defineProps({
  nationalityWidth: { type: String, default: '17.75rem' }
})
const nationalityData = ref([])

const fetchNationalityData = async () => {
  try {
    const response = await fetch('http://localhost:3000/checkout/nationality-list')
    if (!response.ok) {
      throw new Error('Failed to fetch data')
    }
    const data = await response.json()
    nationalityData.value = data
  } catch (error) {
    console.error('Error fetching data:', error)
  }
}

const nationalityQuery = ref('')
const nationalityResult = ref([])
const isNationalityDropdownOpen = ref(false)
const showFlag = ref(false)
const selectedFlagImageUrl = ref('')

const loadNationalityData = () => {
  if (nationalityQuery.value.trim() !== '') {
    isNationalityDropdownOpen.value = true

    const filteredData = nationalityData.value.filter((nationality) => {
      return nationality.name
        .toLowerCase()
        .includes(nationalityQuery.value.trim().toLowerCase())
    })
    nationalityResult.value = filteredData
    isNationalityDropdownOpen.value = nationalityResult.value.length > 0
  } else {
    nationalityResult.value = []
    isNationalityDropdownOpen.value = false
  }
}
const openNationalityDropdown = () => {
  if (nationalityQuery.value.trim() === '') {
    isNationalityDropdownOpen.value = true
    nationalityResult.value = nationalityData.value
  } else {
    isNationalityDropdownOpen.value = true
    loadNationalityData()
  }
}
const closeNationalityDropdown = () => {
  isNationalityDropdownOpen.value = false
  nationalityResult.value = []
}
const getFlagImageUrl = (countryCode) => {
  const flagCode = countryCode

  return `https://flagcdn.com/48x36/${flagCode}.png`
}
const getNationality = (nationalityName, countryCode) => {
  nationalityQuery.value = nationalityName
  nationalityResult.value = []
  isNationalityDropdownOpen.value = false
  showFlag.value = true

  // Dapatkan URL gambar bendera menggunakan kode negara
  const flagImageUrl = getFlagImageUrl(countryCode)

  // Setel URL gambar bendera ke dalam selectedFlagImageUrl
  selectedFlagImageUrl.value = flagImageUrl
}
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
  if (nationalityQuery.value.trim() === '') {
    showFlag.value = false;
    selectedFlagImageUrl.value = ''
  }
})
onMounted(() => {
  fetchNationalityData()
  loadNationalityData()
  document.addEventListener('click', closeDropdownOutside)
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
  :class="{ focus: isNationalityDropdownOpen, flag: showFlag }"
  :style="{backgroundImage: `url(${selectedFlagImageUrl})`}"
/>
    <div class="select-icon">
      <div class="arrow-icon" :class="{ active: isNationalityDropdownOpen }">
        <ph-caret-down :size="16" weight="bold" class="icon"/>
      </div>
    </div>
    <div
      :class="{ 'location__search-dropdown': true, active: isNationalityDropdownOpen }"
      class="w-full"
    >
      <div class="dropdown-nationality__result" :class="{ active: isNationalityDropdownOpen }">
        <div v-for="result in nationalityResult" :key="result.id">
          <div
            class="nationality-item"
            @click="getNationality(result.name, result.code)"
          >
            <img :src="getFlagImageUrl(result.code)" class="flag-icon" />
            <p class="dropdown-nationality__name">{{ result.name }}</p>
          </div>
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
.nationality-dropdown__input.flag {
  background-repeat: no-repeat; 
  background-position: 1.5rem center; 
  padding-left: 4rem;
  background-size: 25px;
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
  overflow-y: scroll;
  transition: max-height 0.3s ease;
}
.dropdown-nationality__result::-webkit-scrollbar {
  width: 6px;
}
.dropdown-nationality__result::-webkit-scrollbar-track {
  background-color: lightgrey;
  border-radius: 2px;
}
.dropdown-nationality__result::-webkit-scrollbar-thumb {
  border-radius: 2px;
  box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
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
.nationality-item {
  display: flex;
  align-items: center;
}
.flag-icon {
  width: 25px;
  margin-right: 10px;
}
</style>
