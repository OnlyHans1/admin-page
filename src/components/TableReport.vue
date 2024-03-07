<script setup>
import { ref, watch, onMounted } from 'vue'
import tableReportData from '@/data/tableReportData'

const activityReportData = ref([])
console.log()

const fetchDataReport = async () => {
  try {
    let url = 'http://localhost:3000/report'
    if (filteredCategory.value) {
      url += `?category=${encodeURIComponent(filteredCategory.value)}`
    }
    const response = await fetch(url)
    if (!response.ok) {
      throw new Error('Failed to fetch data Report')
    }
    const data = await response.json()
    // Mengatur nilai activityReportData dengan hasil dari API
    activityReportData.value = data
  } catch (error) {
    console.error('Error fetching data Report:', error)
  }
}
const props = defineProps({
  filteredCategory: { default: '' }
})
const filteredCategory = ref(props.filteredCategory)
// Memantau perubahan props.filteredCategory
watch(
  () => props.filteredCategory,
  (newValue) => {
    if (typeof newValue === 'string') {
      filteredCategory.value = newValue.toUpperCase()
      console.log(filteredCategory.value)
      fetchDataReport()
    }
  }
)
const capitalizeFirstLetter = (str) => {
  const lowercaseStr = str.toLowerCase()
  return lowercaseStr.charAt(0).toUpperCase() + lowercaseStr.slice(1)
}
// Fungsi untuk mengubah format tanggal menjadi dd/mm/yyyy
const formatDate = (dateStr) => {
  const date = new Date(dateStr)
  const day = date.getDate().toString().padStart(2, '0')
  const month = (date.getMonth() + 1).toString().padStart(2, '0')
  const year = date.getFullYear()
  return `${day}/${month}/${year}`
}
const formatCurrency = (amount) => {
  return Number(amount).toLocaleString('id-ID')
}
onMounted(() => {
  fetchDataReport()
})
</script>

<template>
  <div class="report-activity__table">
    <table class="report-activity__table-data">
      <thead>
        <tr class="report-activity__table-header">
          <th>No</th>
          <th>Pembelian</th>
          <th>Kategori</th>
          <th>Tanggal</th>
          <th>Jumlah</th>
          <th>Total</th>
        </tr>
      </thead>
      <tbody>
        <tr
          class="report-activity__table-items"
          v-for="(item, index) in activityReportData"
          :key="index"
        >
          <td>{{ index + 1 }}</td>
          <td>{{ item.order.name }}</td>
          <td>{{ capitalizeFirstLetter(item.order.category) }}</td>
          <td>{{ formatDate(item.transaction.date) }}</td>
          <td>{{ item.amount }}</td>
          <td>{{ formatCurrency(item.transaction.total) }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
.report-activity__table {
  max-height: calc(374px - 2rem);
  overflow-y: overlay;
}
.report-activity__table::-webkit-scrollbar {
  width: 4px;
}
.report-activity__table::-webkit-scrollbar-track {
  background-color: lightgrey;
  border-radius: 2px;
}
.report-activity__table::-webkit-scrollbar-thumb {
  border-radius: 2px;
  box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
}
.report-activity__table-data {
  border-collapse: collapse;
  outline: 0;
  width: 100%;
}
.report-activity__table-header th {
  font-size: 24px;
  font-weight: 600;
  line-height: 28px;
  background-color: white;
  box-shadow: inset 0 -1px 0 #000000;
  position: sticky;
  z-index: 3;
  top: 0;
}
.report-activity__table-items td {
  font-size: 18px;
  line-height: 28px;
  border-bottom: 1px solid #000;
}
.report-activity__table-header th,
.report-activity__table-items td {
  text-align: center;
  padding: 0.5rem 1.5rem;
}
.report-activity__table-header th:nth-child(2),
.report-activity__table-items td:nth-child(2) {
  text-align: start;
  padding-left: 2rem;
}
</style>
