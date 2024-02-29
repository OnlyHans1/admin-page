<script setup>
import { ref } from 'vue'
import InvoiceDetail from '@/components/InvoiceDetail.vue'

const data = ref([
  {
    nama: 'Teddy Lazuardi',
    pembelian: 'Bertemu Pangeran',
    jadwal: '15/03/2024 14.30',
    telp: '0894732894',
    email: 'TeddyLazuardy@gmail.com'
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

const showDetail = (item) => {
  selectedItem.value = item
}
</script>

<template>
  <div class="container">
    <!-- Search -->
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap"
      rel="stylesheet"
    />
    <div class="search">
      <div class="search-box">
        <div class="search-icon">
          <i class="ri-search-line"></i>
        </div>
        <div class="search-input">
          <input type="text" class="input" v-model="searchQuery" placeholder="Search..." />
        </div>
      </div>
    </div>

    <!-- Invoice -->
    <div class="invoice">
      <table>
        <thead>
          <th class="invoice__table-no">NO</th>
          <th>Nama</th>
          <th>Pembelian</th>
          <th>Tanggal</th>
          <th>Jadwal</th>
          <th>Email</th>
        </thead>
        <tbody>
          <tr v-for="(item, index) in data" :key="index">
            <td class="invoice__table-no">{{ index + 1 }}</td>
            <td>{{ item.nama }}</td>
            <td>{{ item.pembelian }}</td>
            <td>{{ formatDate(item.jadwal)[0] }}</td>
            <td>{{ formatDate(item.jadwal)[1] }}</td>
            <td>
              {{ item.email }} <br />
              <button class="btn btn-primary" @click="showDetail(item)">detail</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
  <InvoiceDetail :selectedItem="selectedItem" />
</template>

<style scoped>
.container {
  font-family: 'Poppins', sans-serif;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

/* -------------- */
/*     Search     */
/* -------------- */
.search {
  width: 601px;
  top: 0;
  transform: translateX(-50%);
  background-color: #d9d9d9;
  margin-left: 22%;
  border-radius: 10px;
  height: 41px;
}

.search-box {
  display: flex;
  border-radius: 3px;
  overflow: hidden;
}

.search-icon {
  align-items: center;
  justify-content: center;
  width: 50px;
  display: flex;
  margin-left: 10px;
  margin-top: 5px;
}

.search-input {
  flex: 1;
  border-radius: 10px;
}

.input {
  border: none;
  padding: 8px;
  width: 95%;
  margin-top: 2px;
  background-color: #d9d9d9;
  font-family: 'Poppins';
}
.input:focus {
  outline: none;
}

/* -------------- */
/*     Table      */
/* -------------- */
.invoice table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 40px;
}

tr {
  border-top: 1px solid black;
}

thead {
  border: 0;
}
.invoice__table-no {
  border-right: 1px solid black;
}

/* Style untuk seluruh sel kecuali header */
.invoice table td,
.invoice table th {
  padding: 7px;
  text-align: center;
}

/* Style untuk header */
.invoice table th {
  font-weight: 600;
  font-size: 26px;
}

.invoice td {
  font-weight: 400;
  font-size: 22px;
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

@media screen and (max-width: 768px) {
  .search {
    width: 90%;
    max-width: 400px;
    margin-left: auto;
    margin-right: auto;
  }
}
</style>
