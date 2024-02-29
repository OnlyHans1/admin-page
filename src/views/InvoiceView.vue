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
      <div class="invoice-search_box">
        <div class="invoice-search_icon">
          <i class="ri-search-line"></i>
        </div>
        <div class="invoice-search_input">
          <input
            type="text"
            class="invoice-search_input-field"
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
          <tr class="invoice-table_row-header">
            <th class="invoice-table_header">NO</th>
            <th class="invoice-table_header">Nama</th>
            <th class="invoice-table_header">Pembelian</th>
            <th class="invoice-table_header">Tanggal</th>
            <th class="invoice-table_header">Jadwal</th>
            <th class="invoice-table_header">Email</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in data" :key="index" class="invoice-table_row-data">
            <td class="invoice-table_data">{{ index + 1 }}</td>
            <td class="invoice-table_data">{{ item.nama }}</td>
            <td class="invoice-table_data">{{ item.pembelian }}</td>
            <td class="invoice-table_data">{{ formatDate(item.jadwal)[0] }}</td>
            <td class="invoice-table_data">{{ formatDate(item.jadwal)[1] }}</td>
            <td class="invoice-table_data">
              {{ item.email }} <br />
              <button class="btn-primary invoice-table_button" @click="showDetail(item)">
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
}

/* Search */
.invoice-search {
  width: 601px;
  top: 0;
  transform: translateX(-50%);
  background-color: #d9d9d9;
  margin-left: 22%;
  border-radius: 10px;
  height: 41px;
}
.invoice-search_box {
  display: flex;
  border-radius: 3px;
  overflow: hidden;
}
.invoice-search_icon {
  align-items: center;
  justify-content: center;
  width: 50px;
  display: flex;
  margin-left: 10px;
  margin-top: 5px;
}
.invoice-search_input {
  flex: 1;
  border-radius: 10px;
}
.invoice-search_input-field {
  border: none;
  padding: 8px;
  width: 95%;
  margin-top: 2px;
  background-color: #d9d9d9;
  font-family: 'Poppins';
}
.invoice-search_input-field:focus {
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
.invoice-table_header {
  padding: 7px;
  text-align: center;
  font-weight: 600;
  font-size: 26px;
}
.invoice-table_data:first-child,
.invoice-table_header:first-child {
  border-right: 1px solid black;
}
.invoice-table_row-header,
.invoice-table_row-data:not(:last-child) {
  border-bottom: 1px solid black;
}
.invoice-table_data {
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
.invoice-table_button {
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
.invoice-table_button:hover {
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
