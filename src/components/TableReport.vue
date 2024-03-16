<script setup>
import { ref, watch, onMounted } from 'vue'
import ReportHelper from '@/utilities/ReportHelper'

const {
  activityReportData,
  fetchTableDataReport,
  getFilteredCategory,
  capitalizeFirstLetter,
  formatDate,
  formatCurrency
} = ReportHelper

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
      getFilteredCategory(filteredCategory.value)
      fetchTableDataReport()
    }
  }
)

onMounted(() => {
  getFilteredCategory(filteredCategory.value)
  fetchTableDataReport()
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
          <td>{{ formatCurrency(item.total_price) }}</td>
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
  white-space: nowrap;
  text-overflow: ellipsis;
  text-align: start;
  padding-left: 2rem;
}
</style>
