<script setup>
import { onMounted, ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import dashboardData from '@/data/dashboardData'

const router = useRouter()
const selectedItems = ref([])
const showConfirmationPopup = ref(false)

const dataDashboard= ref([])

const fetchOrderList = async () => {
  try {
    const response = await fetch('http://localhost:3000/order-list')
    if (!response.ok) {
      throw new Error('Failed to fetch data')
    }
    const data = await response.json()
    dataDashboard.value = data
  } catch (error) {
    console.error('Error fetching data:', error)
  }
}

const capitalizeFirstLetter = (str) => {
  const lowercaseStr = str.toLowerCase()
  return lowercaseStr.charAt(0).toUpperCase() + lowercaseStr.slice(1)
}

const formatCurrency = (amount) => {
  return Number(amount).toLocaleString('id-ID')
}

const navigateToAdd = () => {
  showConfirmationPopup.value = true
}

const selectItem = (item) => {
    item.selected = true;
    item.quantity = 0;
    selectedItems.value.push(item);
};

const closePopup = () => {
  showConfirmationPopup.value = false
  selectedItems.value = []
}

const increaseQuantity = (item) => {
  item.quantity++;
  console.log(selectedItems.value)
  saveToLocalStorage();
}

const decreaseQuantity = (item) => {
  if (item.quantity > 0) {
    item.quantity--;
    saveToLocalStorage();
  }
}

const saveToLocalStorage = () => {
  console.log(JSON.stringify(selectedItems.value))
  localStorage.setItem('selectedItems', JSON.stringify(selectedItems.value));
};

// Watch for changes in selectedItems and save to local storage
watch(selectedItems.value, () => {
  saveToLocalStorage();
}, { deep: true });

onMounted(()=>{
  fetchOrderList()
})
</script>

<template>
<div class="container-recently-added">
    <p class="newly-added">Baru Ditambahkan</p>

    <div class="bundling-container">
      <div class="add-container">
        <button class="add_button" @click="navigateToAdd">
          <span class="add_icon">
            <ph-plus :size="36" weight="regular" />
          </span>
          <span class="add_text">Tambah</span>
        </button>
      </div>

      <div
        v-for="(item, index) in dataDashboard"
        :key="index"
        class="card-container"
        @click="selectItem(item)"
      >
        <div class="card" :class="{ selected: item.selected }">
          <img :src="item.image"/>
        </div>
        <div class="card_content">
          <h4>{{ item.name }}</h4>
          <p>{{ capitalizeFirstLetter(item.category) }}</p>
          <h4>Rp. {{ formatCurrency(item.price) }}</h4>
        </div>
      </div>
    </div>
  </div>

  <div
    v-for="category in ['Umum', 'Pelajar', 'Mancanegara']"
    :key="category"
    :class="`${category.toLowerCase()}-container`"
  >
    <p class="category">{{ category }}</p>
    <div class="card-wrapper">
      <div
        v-for="(item, index) in dashboardData[`${category.toLowerCase()}Items`]"
        :key="index"
        class="card-container-general"
        @click="selectItem(item)"
      >
        <div class="card" :class="{ selected: item.selected }">
          <img :src="item.image" :alt="item.alt" />
        </div>
        <div class="card_content">
          <h4>{{ item.title }}</h4>
          <p>{{ item.subtitle }}</p>
          <h4>{{ item.price }}</h4>
        </div>
      </div>
    </div>
  </div>

  <div class="popup_overlay" :class="{ active: selectedItems.length > 0 }" @click="closePopup">
    <div class="popup_content" @click.stop>
      <h2>Tiket Masuk Keraton</h2>
      <ul>
        <li v-for="(item, index) in selectedItems" :key="index">
          <div class="item-details">
            <span class="category">{{ item.category }}</span>
          </div>
          <div class="quantity_controls">
            <button @click.stop="decreaseQuantity(item)">
              <ph-minus-circle :size="32" />
            </button>
            <span class="quantity">{{ item.quantity }}</span>
            <button @click.stop="increaseQuantity(item)">
              <ph-plus-circle :size="32" />
            </button>
          </div>
        </li>
      </ul>
    </div>
  </div>

  <div class="popup_confirmation" :class="{ active: showConfirmationPopup }" @click="closePopup()">
    <div class="popup_confirmation-content" @click.stop>
      <h2>Pindah ke Halaman Tambah?</h2>
      <div class="button-confirmation">
        <button @click="router.push({ name: 'add' })">Ya</button>
        <button @click="closePopup()">Batal</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.container-recently-added {
  position: relative;
}

.card-container:hover .card {
  border: 4px solid rgba(255, 217, 120, 1);
}

.bundling-container {
  display: flex;
  flex-direction: row;
  white-space: nowrap;
  margin-top: 20px;
  -ms-overflow-style: none;
  scrollbar-width: none;
  overflow-x: scroll;
  width: 100%;
}

.card-container {
  display: inline-block;
  margin-right: 10px;
  width: 250px;
}

.card {
  width: 100%;
  background-color: #838383;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.2);
} 

.card img {
  width: 100%;
  height: auto;
}

.card_content {
  padding: 10px;
  text-align: justify;
}

.card-content h4 {
  color: rgb(0, 0, 0);
  margin: 0;
}

.card-content p {
  color: #000000;
  font-size: 15px;
  line-height: 1.3;
  margin: 0;
}


.bundling-container::-webkit-scrollbar {
  display: none;
}

.add-container {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 10vh;
  margin-left: 19px;
}

.add_button {
  background-color: #eeeded;
  flex-direction: column;
  width: 120px;
  height: 120px;
  color: #000000;
  border-radius: 8px;
  font-size: 15px;
  font-weight: bold;
  padding: 26px;
  border: 2px dashed #000000;
  cursor: pointer;
  transition: 0.2s;
  outline: none;
  display: flex;
  align-items: center;
  margin-right: 40px;
}

.add_button:hover {
  background-color: #4f4f4f;
  border: 2px dashed #000000;
}

.add_icon {
  text-align: center;
  font-size: 2em;
  border-radius: 50%;
  padding: 5px;
}

.add_text {
  vertical-align: middle;
}

.newly-added {
  position: absolute;
  font-size: 17px;
  font-weight: 500px;
  top: -7vh;
  left: 16%;
  transform: translateX(-50%);
  padding: 8px 16px;
  border-radius: 4px;
  z-index: 1;
  -webkit-transform: translateX(-50%);
  -moz-transform: translateX(-50%);
  -ms-transform: translateX(-50%);
  -o-transform: translateX(-50%);
}

.category-container {
  display: flex;
  flex-direction: column;
  margin-top: 1px;
  position: relative;
  margin-left: 20px;
  width: 100%;
  overflow-x: auto;
}

.category-container::-webkit-scrollbar {
  display: none;
}

.category {
  font-size: 2em;
  margin-bottom: 10px;
}

.card-wrapper {
  display: flex;
  overflow-x: auto;
  padding-bottom: 20px;
  white-space: nowrap;
  scrollbar-width: none;
}

.card-wrapper::-webkit-scrollbar {
  display: none;
}

.card-container-general {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 16%;
  margin: 10px;
  min-width: 200px;
}
.card-container-general {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 16%;
  margin: 10px;
  min-width: 200px;
}

.card-container-general .card {
  cursor: pointer;
  background-color: #838383;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.2);
}

.card-container-general:hover .card {
  border: 4px solid rgba(255, 217, 120, 1);
}


.card-container-general .card img {
  width: 100%;
  height: auto;
}

.card-container-general .card_content h4 {
  color: rgb(0, 0, 0);
  margin: 0;
}

.card-container-general .card_content p {
  color: #000000;
  font-size: 15px;
  line-height: 1.3;
  margin: 0;
}

header {
  top: 0;
  right: 0;
  left: 0;
  display: flex;
  justify-content: flex-end;
  padding: 20px;
}

.icon {
  display: flex;
  align-items: center;
  color: black;
  text-decoration: none;
}

.icon svg {
  width: 45px;
  height: 43px;
}

.popup_overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: flex-end;
  opacity: 0;
  transition: opacity 0.2s ease-in-out;
  pointer-events: none;
}

.popup_overlay.active {
  opacity: 1;
  pointer-events: auto;
}

.popup_content {
  background: #d9d9d9;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  width: 345px;
  height: 110px;
  overflow: hidden;
  margin-top: auto;
  transform: translateY(100%);
  transition: transform 0.3s ease;
}

.popup_overlay.active .popup_content {
  transform: translateY(0);
}

.popup_content h2 {
  margin-top: 0;
  font-size: 15px;
}

.popup_content ul {
  padding: 0;
  list-style-type: none;
}

.popup_content li {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.popup_content .category {
  font-size: 20px;
  font-weight: 700px;
}

.popup_content .quantity {
  font-size: 20px;
}

.item-details {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-right: 10px;
}

.quantity_controls {
  display: flex;
  align-items: center;
}

.quantity_controls button {
  background: none;
  border: none;
  cursor: pointer;
  margin: 0 5px;
}

.quantity_controls button svg {
  width: 20px;
  height: 20px;
}

.popup_confirmation {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: 0;
  transition: opacity 0.2s ease-in-out;
  pointer-events: none;
  z-index: 999; /* Mengatur z-index agar di atas konten lain */
}

.popup_confirmation.active {
  opacity: 1;
  pointer-events: auto;
}

.popup_confirmation-content {
  background: #d9d9d9;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  width: 345px;
  overflow: hidden;
  margin-top: auto;
  transform: translateY(-50%);
  transition: transform 0.3s ease;
  max-height: 80vh; /* Mengatur tinggi maksimum popup agar tidak terlalu tinggi */
  overflow-y: auto; /* Menambahkan scroll jika konten lebih panjang dari tinggi maksimum */
}

.popup_confirmation.active .popup_confirmation-content {
  transform: translateY(0);
}

.button-confirmation {
  display: flex;
  justify-content: space-around;
  margin-top: 20px;
}

.button-confirmation button {
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.button-confirmation button:first-child {
  background-color: #28a745; /* Green color for "Ya" button */
  color: white;
}

.button-confirmation button:last-child {
  background-color: #dc3545; /* Red color for "Batal" button */
  color: white;
}

.button-confirmation button:first-child:hover {
  background-color: #17b53caa; /* Green color for "Ya" button */
  color: white;
}

.button-confirmation button:last-child:hover {
  background-color: #cd23349b; /* Red color for "Batal" button */
  color: white;
}
</style>
