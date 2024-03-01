<script setup>
import { ref } from 'vue'
import InvoiceDetail from '@/components/InvoiceDetail.vue'

const data = ref([
  {
    nama: 'Teddy Lazuardi',
    pembelian: 'Bertemu Pangeran',
    jadwal: '15/03/2024 14.30',
    telp: '0894732894',
    email: 'TeddyLazuardy@gmail.com',
    pembayaran: '216758921'
  },
  {
    nama: 'Teddy Lazuardi',
    pembelian: 'Bundling tiket masuk keraton',
    jadwal: '15/03/2024 14.30',
    telp: '0894732894',
    email: 'TeddyLazuardy@gmail.com'
  },
  {
    nama: 'Teddy Lazuardi',
    pembelian: 'Event Bulanan',
    jadwal: '15/03/2024 14.29',
    telp: '0894732894',
    email: 'TeddyLazuardy@gmail.com'
  },
  {
    nama: 'Teddy Lazuardi',
    pembelian: 'Event Mingguan',
    jadwal: '15/03/2024 14.29',
    telp: '0894732894',
    email: 'TeddyLazuardy@gmail.com'
  },
  {
    nama: 'Teddy Lazuardi',
    pembelian: 'Bertemu Pangeran',
    jadwal: '15/03/2024 14.29',
    telp: '0894732894',
    email: 'TeddyLazuardy@gmail.com'
  },
  {
    nama: 'Teddy Lazuardi',
    pembelian: 'Bertemu Pangeran',
    jadwal: '15/03/2024 14.29',
    telp: '0894732894',
    email: 'TeddyLazuardy@gmail.com'
  }
])

const searchQuery = ref('')
const selectedItem = ref(null)

const formatDate = (dateTime) => {
  const parts = dateTime.split(' ')
  return [parts[0], parts[1]]
}

const detailPopup = ref(null)

const showDetail = (item) => {
  selectedItem.value = item
  detailPopup.value.showDetailPopup()
}
</script>

<template>
  <div class="invoice-container">
    <!-- Search -->
    <div class="invoice-search">
      <div class="invoice-search__box">
        <div class="invoice-search__icon">
          <i class="ri-search-line"></i>
        </div>
        <div class="invoice-search__input">
          <input
            type="text"
            class="invoice-search__input-field"
            v-model="searchQuery"
            placeholder="Search..."
          />
        </div>
      </div>
    </div>

    <!-- Invoice -->
    <div class="invoice-table">
      <table>
        <thead>
          <tr class="invoice-table__row-header">
            <th class="invoice-table__header">NO</th>
            <th class="invoice-table__header">Nama</th>
            <th class="invoice-table__header">Pembelian</th>
            <th class="invoice-table__header">Tanggal</th>
            <th class="invoice-table__header">Jadwal</th>
            <th class="invoice-table__header">Email</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in data" :key="index" class="invoice-table__row-data">
            <td class="invoice-table__data">{{ index + 1 }}</td>
            <td class="invoice-table__data">{{ item.nama }}</td>
            <td class="invoice-table__data">{{ item.pembelian }}</td>
            <td class="invoice-table__data">{{ formatDate(item.jadwal)[0] }}</td>
            <td class="invoice-table__data">{{ formatDate(item.jadwal)[1] }}</td>
            <td class="invoice-table__data">
              {{ item.email }} <br />
              <button class="btn-primary invoice-table__button" @click="showDetail(item)">
                detail
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
  <InvoiceDetail :selectedItem="selectedItem" ref="detailPopup" />
</template>

<style scoped>
.invoice-container {
  font-family: 'Poppins', sans-serif;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

/* Search */
.invoice-search {
  width: 601px;
  background-color: #d9d9d9;
  border-radius: 10px;
  height: 41px;
  margin: 0 2.5rem;
}
.invoice-search__box {
  display: flex;
  border-radius: 3px;
  overflow: hidden;
}
.invoice-search__icon {
  align-items: center;
  justify-content: center;
  width: 50px;
  display: flex;
  margin-left: 10px;
  margin-top: 5px;
}
.invoice-search__input {
  flex: 1;
  border-radius: 10px;
}
.invoice-search__input-field {
  border: none;
  padding: 8px;
  width: 95%;
  margin-top: 2px;
  background-color: #d9d9d9;
  font-family: 'Poppins';
}
.invoice-search__input-field:focus {
  outline: none;
}

/* Invoice Table */
.invoice-table {
  margin-top: 1.5rem;
  padding: 2rem;
}
.invoice-table table {
  width: 100%;
  border-collapse: collapse;
}
.invoice-table__header {
  padding: 7px;
  text-align: center;
  font-weight: 600;
  font-size: 26px;
}
.invoice-table__data:first-child,
.invoice-table__header:first-child {
  border-right: 1px solid black;
}
.invoice-table__row-header,
.invoice-table__row-data:not(:last-child) {
  border-bottom: 1px solid black;
}
.invoice-table__data {
  padding: 7px;
  text-align: center;
  font-weight: 400;
  font-size: 22px;
  vertical-align: top;
}
.btn-primary {
  background-color: #ffe29a;
  font-family: 'Poppins';
  font-size: 22px;
  border-radius: 5px;
  height: 31px;
  width: 129px;
  margin-top: 10px;
  border: none;
  cursor: pointer;
}
.btn-primary:hover {
  background-color: #ffd477;
}
.invoice-table__button {
  background-color: #ffe29a;
  font-family: 'Poppins';
  font-size: 22px;
  border-radius: 5px;
  height: 31px;
  width: 129px;
  margin-top: 10px;
  border: none;
  cursor: pointer;
}
.invoice-table__button:hover {
  background-color: #ffd477;
}
@media screen and (max-width: 768px) {
  .invoice-search {
    width: 90%;
    max-width: 400px;
    margin-left: auto;
    margin-right: auto;
  }
}
</style>
