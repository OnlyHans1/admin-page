<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const selectedItems = ref([])

const navigateToAdd = () => {
  if (confirm('Pindah ke halaman tambah?')) {
    router.push({ name: 'add' })
  }
}
const recentlyAddedItems = [
  {
    category: 'Bundling',
    image: 'https://via.placeholder.com/230X130',
    alt: 'foto',
    title: 'Tiket Masuk Keraton 2024',
    subtitle: 'Bundling Umum',
    price: 'Rp.50.000',
    selected: false,
    quantity: 0
  },
  {
    category: 'Bundling',
    image: 'https://via.placeholder.com/230X130',
    alt: 'foto',
    title: 'Tiket Masuk Keraton 2024',
    subtitle: 'Bundling Umum',
    price: 'Rp.50.000',
    selected: false,
    quantity: 0
  },
  {
    category: 'Bundling',
    image: 'https://via.placeholder.com/230X130',
    alt: 'foto',
    title: 'Tiket Masuk Keraton 2024',
    subtitle: 'Bundling Umum',
    price: 'Rp.50.000',
    selected: false,
    quantity: 0
  },
  {
    category: 'Bundling',
    image: 'https://via.placeholder.com/230X130',
    alt: 'foto',
    title: 'Tiket Masuk Keraton 2024',
    subtitle: 'Bundling Umum',
    price: 'Rp.50.000',
    selected: false,
    quantity: 0
  },
  {
    category: 'Bundling',
    image: 'https://via.placeholder.com/230X130',
    alt: 'foto',
    title: 'Tiket Masuk Keraton 2024',
    subtitle: 'Bundling Umum',
    price: 'Rp.50.000',
    selected: false,
    quantity: 0
  }
]

const umumItems = [
  {
    category: 'Umum',
    image: 'https://via.placeholder.com/230X130',
    alt: 'foto',
    title: 'Tiket Umum 2024',
    subtitle: 'Bundling Umum',
    price: 'Rp.50.000',
    selected: false
  },
  {
    category: 'Umum',
    image: 'https://via.placeholder.com/230X130',
    alt: 'foto',
    title: 'Tiket Umum 2024',
    subtitle: 'Bundling Umum',
    price: 'Rp.50.000',
    selected: false
  },
  {
    category: 'Umum',
    image: 'https://via.placeholder.com/230X130',
    alt: 'foto',
    title: 'Tiket Umum 2024',
    subtitle: 'Bundling Umum',
    price: 'Rp.50.000',
    selected: false
  },
  {
    category: 'Umum',
    image: 'https://via.placeholder.com/230X130',
    alt: 'foto',
    title: 'Tiket Umum 2024',
    subtitle: 'Bundling Umum',
    price: 'Rp.50.000',
    selected: false
  }
]

const pelajarItems = [
  {
    category: 'Pelajar',
    image: 'https://via.placeholder.com/230X130',
    alt: 'foto',
    title: 'Tiket Pelajar 2024',
    subtitle: 'Bundling Pelajar',
    price: 'Rp.30.000',
    selected: false
  },
  {
    category: 'Pelajar',
    image: 'https://via.placeholder.com/230X130',
    alt: 'foto',
    title: 'Tiket Pelajar 2024',
    subtitle: 'Bundling Pelajar',
    price: 'Rp.30.000',
    selected: false
  },
  {
    category: 'Pelajar',
    image: 'https://via.placeholder.com/230X130',
    alt: 'foto',
    title: 'Tiket Pelajar 2024',
    subtitle: 'Bundling Pelajar',
    price: 'Rp.30.000',
    selected: false
  },
  {
    category: 'Pelajar',
    image: 'https://via.placeholder.com/230X130',
    alt: 'foto',
    title: 'Tiket Pelajar 2024',
    subtitle: 'Bundling Pelajar',
    price: 'Rp.30.000',
    selected: false
  }

  // Add more items
]

const mancanegaraItems = [
  {
    category: 'Mancanegara',
    image: 'https://via.placeholder.com/230X130',
    alt: 'foto',
    title: 'Tiket Mancanegara 2024',
    subtitle: 'Bundling Mancanegara',
    price: '$10',
    selected: false
  },
  {
    category: 'Mancanegara',
    image: 'https://via.placeholder.com/230X130',
    alt: 'foto',
    title: 'Tiket Mancanegara 2024',
    subtitle: 'Bundling Mancanegara',
    price: '$10',
    selected: false
  },
  {
    category: 'Mancanegara',
    image: 'https://via.placeholder.com/230X130',
    alt: 'foto',
    title: 'Tiket Mancanegara 2024',
    subtitle: 'Bundling Mancanegara',
    price: '$10',
    selected: false
  },
  {
    category: 'Mancanegara',
    image: 'https://via.placeholder.com/230X130',
    alt: 'foto',
    title: 'Tiket Mancanegara 2024',
    subtitle: 'Bundling Mancanegara',
    price: '$10',
    selected: false
  }
]

const selectItem = (item) => {
  item.selected = !item.selected
  if (item.selected) {
    item.quantity = 1 // Set quantity menjadi 1 saat dipilih
    selectedItems.value.push(item)
  } else {
    const index = selectedItems.value.findIndex((i) => i.title === item.title)
    if (index !== -1) {
      selectedItems.value.splice(index, 1)
    }
  }
}

const closePopup = () => {
  selectedItems.value = []
}

const increaseQuantity = (item) => {
  item.quantity++
}

const decreaseQuantity = (item) => {
  if (item.quantity > 0) {
    item.quantity--
  }
};
</script>
<template>
  <header>
    <a href="https://music.youtube.com/watch?v=3usBDfpAju4&list=RDAMVMgPraxRACS9c" class="icon">
      <svg
        width="45"
        height="43"
        viewBox="0 0 45 43"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M22.3985 1.48193C10.5573 1.48193 0.958008 10.4362 0.958008 21.4819C0.958008 32.5277 10.5573 41.4819 22.3985 41.4819C34.2399 41.4819 43.8391 32.5277 43.8391 21.4819C43.8391 10.4362 34.2399 1.48193 22.3985 1.48193Z"
          stroke="black"
          stroke-width="1.5"
        />
        <path
          d="M22.3986 21.482C26.3458 21.482 29.5454 18.4973 29.5454 14.8153C29.5454 11.1335 26.3458 8.14868 22.3986 8.14868C18.4514 8.14868 15.2517 11.1335 15.2517 14.8153C15.2517 18.4973 18.4514 21.482 22.3986 21.482Z"
          stroke="black"
          stroke-width="1.5"
        />
        <path
          d="M8.10474 36.3893C8.10474 32.79 10.8961 28.1487 15.2516 28.1487H29.5453C33.9008 28.1487 36.6921 32.79 36.6921 36.3893"
          stroke="black"
          stroke-width="1.5"
        />
      </svg>
    </a>
  </header>

  <div class="container-recently-added">
    <p class="newly-added">Baru Ditambahkan</p>

    <div class="bundling-container">
      <div class="add-container">
        <button class="add-button" @click="navigateToAdd">
          <span class="add-icon">
            <svg
              width="29"
              height="27"
              viewBox="0 0 29 27"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M14.4456 1V26"
                stroke="black"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M1.04517 13.5H27.8458"
                stroke="black"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </span>
          <span class="add-text">Tambah</span>
        </button>
      </div>

      <div
        v-for="(item, index) in recentlyAddedItems"
        :key="index"
        class="card-container"
        @click="selectItem(item)"
      >
        <div class="card" :class="{ selected: item.selected }">
          <img :src="item.image" :alt="item.alt" />
        </div>
        <div class="card-content">
          <h4>{{ item.title }}</h4>
          <p>{{ item.subtitle }}</p>
          <h4>{{ item.price }}</h4>
        </div>
      </div>
    </div>
  </div>

  <!-- Umum -->
  <div class="general-container">
    <p class="general">Umum</p>
    <div class="card-wrapper">
      <div
        v-for="(item, index) in umumItems"
        :key="index"
        class="card-container-general"
        @click="selectItem(item)"
      >
        <div class="card" :class="{ selected: item.selected }">
          <img :src="item.image" :alt="item.alt" />
        </div>
        <div class="card-content">
          <!-- Content for umum items -->
          <h4>{{ item.title }}</h4>
          <p>{{ item.subtitle }}</p>
          <h4>{{ item.price }}</h4>
        </div>
      </div>
    </div>
  </div>

  <!-- Pelajar -->
  <div class="student-container">
    <p class="student">Pelajar</p>
    <div class="card-wrapper">
      <div
        v-for="(item, index) in pelajarItems"
        :key="index"
        class="card-container-student"
        @click="selectItem(item)"
      >
        <div class="card" :class="{ selected: item.selected }">
          <img :src="item.image" :alt="item.alt" />
        </div>
        <div class="card-content">
          <!-- Content for pelajar items -->
          <h4>{{ item.title }}</h4>
          <p>{{ item.subtitle }}</p>
          <h4>{{ item.price }}</h4>
        </div>
      </div>
    </div>
  </div>

  <!-- Mancanegara -->
  <div class="mancanegara-container">
    <p class="mancanegara">Mancanegara</p>
    <div class="card-wrapper">
      <div
        v-for="(item, index) in mancanegaraItems"
        :key="index"
        class="card-container-mancanegara"
        @click="selectItem(item)"
      >
        <div class="card" :class="{ selected: item.selected }">
          <img :src="item.image" :alt="item.alt" />
        </div>
        <div class="card-content">
          <!-- Content for mancanegara items -->
          <h4>{{ item.title }}</h4>
          <p>{{ item.subtitle }}</p>
          <h4>{{ item.price }}</h4>
        </div>
      </div>
    </div>
  </div>

  <div class="popup-overlay" :class="{ active: selectedItems.length > 0 }" @click="closePopup">
    <div class="popup-content" @click.stop>
      <h2>Tiket Masuk Keraton</h2>
      <ul>
        <li v-for="(item, index) in selectedItems" :key="index">
          <div class="item-details">
            <span class="category">{{ item.category }}</span>
            <!-- Removed item title and price -->
          </div>
          <div class="quantity-controls">
            <button @click.stop="decreaseQuantity(item)">
              <svg
                width="22"
                height="22"
                viewBox="0 0 29 28"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M8.45068 13.8086H20.3621"
                  stroke="black"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M14.4062 26.3086C21.8071 26.3086 27.8065 20.7122 27.8065 13.8086C27.8065 6.90504 21.8071 1.30859 14.4062 1.30859C7.0054 1.30859 1.00586 6.90504 1.00586 13.8086C1.00586 20.7122 7.0054 26.3086 14.4062 26.3086Z"
                  stroke="black"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </button>
            <span class="quantity">{{ item.quantity }}</span>
            <button @click.stop="increaseQuantity(item)">
              <svg
                width="22"
                height="22"
                viewBox="0 0 29 28"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M14.6643 6.86414V20.753"
                  stroke="black"
                  stroke-width="1.2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M7.21973 13.8086H22.109"
                  stroke="black"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M14.6643 26.3086C22.0651 26.3086 28.0646 20.7122 28.0646 13.8086C28.0646 6.90504 22.0651 1.30859 14.6643 1.30859C7.26345 1.30859 1.26392 6.90504 1.26392 13.8086C1.26392 20.7122 7.26345 26.3086 14.6643 26.3086Z"
                  stroke="black"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </button>
          </div>
        </li>
      </ul>
      <button @click="closePopup" class="close-button">X  </button>
    </div>
  </div>
</template>

<style scoped>
.container-recently-added {
  position: relative;
}

.bundling-container {
  display: flex;
  flex-direction: row;
  overflow-x: auto;
  white-space: nowrap;
  margin-top: 20px;
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

.card-content {
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

.add-container {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 10vh;
  margin-left: 19px;
}

.add-button {
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
  margin-right: 20px;
}

.add-button:hover {
  background-color: #4f4f4f;
  border: 2px dashed #000000;
}

.add-icon {
  text-align: center;
  font-size: 2em;
  border-radius: 50%;
  padding: 5px;
}

.add-text {
  vertical-align: middle;
}

.newly-added {
  position: absolute;
  font-size: 17px;
  font-weight: 500px;
  top: -7vh;
  left: 15%;
  transform: translateX(-50%);
  padding: 8px 16px;
  border-radius: 4px;
  z-index: 1;
  -webkit-transform: translateX(-50%);
  -moz-transform: translateX(-50%);
  -ms-transform: translateX(-50%);
  -o-transform: translateX(-50%);
}

.general-container,
.student-container,
.mancanegara-container {
  display: flex;
  flex-direction: column;
  margin-top: 1px;
  position: relative;
  margin-left: 20px;
}

.general,
.student,
.mancanegara {
  font-size: 2em;
  margin-bottom: 10px;
}

.card-wrapper {
  display: flex;
  overflow-x: auto;
  padding-bottom: 20px;
  white-space: nowrap;
}

.card-container-general,
.card-container-student,
.card-container-mancanegara {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 250px;
  margin: 10px;
}

.card-container-general .card,
.card-container-student .card,
.card-container-mancanegara .card {
  width: 100%;
  background-color: #838383;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.2);
}

.card-container-general .card img,
.card-container-student .card img,
.card-container-mancanegara .card img {
  width: 100%;
  height: auto;
}

.card-container-general .card-content h4,
.card-container-student .card-content h4,
.card-container-mancanegara .card-content h4 {
  color: rgb(0, 0, 0);
  margin: 0;
}

.card-container-general .card-content p,
.card-container-student .card-content p,
.card-container-mancanegara .card-content p {
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

.popup-overlay {
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

.popup-overlay.active {
  opacity: 1;
  pointer-events: auto;
}

.popup-content {
  background: #d9d9d9;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  width: 25%;
  height: 110px; /* Tinggi maksimum diatur ke 60% dari tinggi viewport */
  overflow: hidden; /* Menghilangkan scrollbar */
  transition: opacity 0.2s ease-in-out;
  margin-top: auto;
  transform: translateY(-20%);
}

.popup-content h2 {
  margin-top: 0;
  font-size: 15px;
}

.popup-content ul {
  padding: 0;
  list-style-type: none;
}

.popup-content li {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.popup-content button {
  color: #000000;
  gap: 3px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.popup-content button:hover {
  background-color: #adadad;
}

.popup-content .category {
  font-size: 20px; /* Atur ukuran teks kategori di sini */
  font-weight: 700px; /* Atur tebal teks jika diperlukan */
}

.popup-content .quantity{
  font-size: 20px;
}

.item-details {
  display: flex;
  justify-content: space-between; /* Memposisikan category ke kanan */
  align-items: center;
  padding-right: 10px; /* Menambahkan padding kanan untuk jarak */
}

.quantity-controls {
  display: flex;
  align-items: center;
}

.quantity-controls button {
  background: none;
  border: none;
  cursor: pointer;
  margin: 0 5px;
}

.quantity-controls button svg {
  width: 20px;
  height: 20px;
}
</style>
