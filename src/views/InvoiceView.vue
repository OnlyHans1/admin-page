<script setup>
import { onMounted, watch } from 'vue'
import InvoiceDetail from '@/components/InvoiceDetail.vue'
import InvoiceHelper from '@/utilities/InvoiceHelper'

const {
  dataInvoice,
  getSearchQuery,
  fetchTransactionList,
  searchQuery,
  selectedItem,
  splitDate,
  detailPopup,
  showDetail
} = InvoiceHelper

watch(
  () => searchQuery.value,
  (newValue) => {
    if (typeof newValue === 'string') {
      searchQuery.value = newValue.toLowerCase()
      getSearchQuery(searchQuery.value)
      fetchTransactionList()
    }
  }
)

onMounted(() => {
  fetchTransactionList()
})
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
          <tr v-if="dataInvoice" v-for="(item, index) in dataInvoice" :key="index" class="invoice-table__row-data">
            <td class="invoice-table__data">{{ index + 1 }}</td>
            <td class="invoice-table__data">{{ item.transaction.user.name }}</td>
            <td class="invoice-table__data">{{ item.order.name }}</td>
            <td class="invoice-table__data">{{ splitDate(item.transaction.date)[0] }}</td>
            <td class="invoice-table__data">{{ splitDate(item.transaction.date)[1] }}</td>
            <td class="invoice-table__data">
              {{ item.transaction.user.email }} <br />
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
  margin-left: 24%;
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
  padding: 1.1rem;
  width: 100%;
  text-align: left;
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
.invoice-table__data:nth-child(2),
.invoice-table__header:nth-child(2),
.invoice-table__data:nth-child(3),
.invoice-table__header:nth-child(3) {
  text-align: left;
  padding-left: 1rem;
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
  max-width: 200px; /* Sesuaikan lebar maksimum sesuai kebutuhan Anda */
  white-space: wrap;
  overflow: hidden;
  text-overflow: ellipsis;
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

@media screen and (max-width: 1280px) {
  .invoice-search {
    margin-left: 2%;
  }
}
</style>
