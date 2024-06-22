<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import Chart from '@/components/Chart.vue'
import ReportHelper from '@/utilities/ReportHelper'
import GlobalHelper from '@/utilities/GlobalHelper'
import TicketInfoCard from '@/components/TicketInfoCard.vue'

const {
  incomeRevenue,
  fetchIncomeRevenue,
  formatCurrency,
  currentYear,
  selectedYear,
  targetYears,
  yearlyCategory,
  yearlyData,
  fetchTargetYears,
  changeSelectedYear,
  fetchYearlyChartData,
  currentMonth,
  selectedMonth,
  selectedMonthName,
  targetMonths,
  monthlyCategory,
  monthlyData,
  fetchTargetMonths,
  setMonthLocaleString,
  changeSelectedMonth,
  fetchMonthlyChartData,
  generateExcel,
  printData,
  updateCategory,
  totalSum
} = ReportHelper

const checkData = async () => {
  try {
    isShowChart.value = false
    GlobalHelper.showLoader.value = true
    await fetchIncomeRevenue()
    await fetchTargetYears()
    await fetchTargetMonths()
    selectedYear.value = currentYear
    selectedMonth.value = currentMonth
    setMonthLocaleString()
    await fetchYearlyChartData()
    await fetchMonthlyChartData()
    isShowChart.value = true
  } catch (error) {
    console.error(error)
  }
}
const showDetail = ref(false)
const isShowChart = ref(false)
const yearDropdownOpen = ref(false)
const monthDropdownOpen = ref(false)

const toggleShow = () => {
  showDetail.value = !showDetail.value
}
const toggleYearDropdown = () => {
  yearDropdownOpen.value = !yearDropdownOpen.value
}
const toggleMonthDropdown = () => {
  monthDropdownOpen.value = !monthDropdownOpen.value
}
const closeDropdownOnClickOutside = (event) => {
  if (
    !event.target.closest('.filter__input-dropdown') &&
    !event.target.closest('.filter__input-dropdown_menu')
  ) {
    yearDropdownOpen.value = false
    monthDropdownOpen.value = false
  }
}
const selectYearOption = (year) => {
  changeSelectedYear(year)
  yearDropdownOpen.value = false
}
const selectMonthOption = (month) => {
  selectedMonthName.value = month
  changeSelectedMonth(month)
  monthDropdownOpen.value = false
}
// const takeScreenshot = async (elementId) => {
//   const element = document.getElementById(elementId)
//   try {
//     const canvas = await html2canvas(element)
//     canvas.toBlob((blob) => {
//       const url = URL.createObjectURL(blob)
//       const a = document.createElement('a')
//       a.href = url
//       a.download = `Report Tahun ${selectedYear.value} Bulan ${selectedMonthName.value}.png`
//       document.body.appendChild(a)
//       a.click()
//       window.URL.revokeObjectURL(url)
//       console.log('Screenshot saved as image file!')
//     }, 'image/png')
//   } catch (error) {
//     console.error('Error saving screenshot as image file:', error)
//   }
// }
const incomeRevenueClass = () => {
  const length = incomeRevenue.value.toString().length
  if (length > 18) {
    return 'fs-h5'
  } else if (length > 15) {
    return 'fs-h4'
  } else if (length > 12) {
    return 'fs-h3'
  } else if (length > 9) {
    return 'fs-h2'
  }
}

onUnmounted(() => {
  window.removeEventListener('click', closeDropdownOnClickOutside)
})

onMounted(() => {
  checkData()
  window.addEventListener('click', closeDropdownOnClickOutside)
  setMonthLocaleString()
})
</script>

<template>
  <div
    id="report__screenshot-target"
    v-if="isShowChart"
    class="report-revenue__chart-container flex fd-row align-items-center justify-content-center gap[1.5]"
  >
    <div class="report-revenue__chart flex fd-col align-items-center justify-content-center gap-1">
      <Chart :targetDate="selectedYear" :dataSeries="yearlyData" :dataCategory="yearlyCategory" />
    </div>
    <div class="report-revenue__chart flex fd-col align-items-center justify-content-center gap-1">
      <Chart
        :targetDate="selectedMonthName"
        :dataSeries="monthlyData"
        :dataCategory="monthlyCategory"
      />
    </div>
  </div>

  <div
    style="
      margin-top: 2rem;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    "
  >
    <h2>Data Tingkat Keramaian Tahun</h2>
    <table class="history-report-table" style="margin-top: 2rem">
      <thead>
        <tr>
          <th>Bulan</th>
          <th>Umum</th>
          <th>Pelajar</th>
          <th>Mancanegara 'Luar Negri'</th>
          <th>Mancanegara 'Dalam Negri</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="record in historyRecords" :key="record.date">
          <td>{{ record.date }}</td>
          <td>{{ formatCurrency(record.revenueKeraton.COH) }}</td>
          <td>{{ formatCurrency(record.revenueKeraton.CIA) }}</td>
          <td>{{ formatCurrency(record.revenueCuraweda) }}</td>
          <td>{{ formatCurrency(record.totalRevenue) }}</td>
        </tr>
      </tbody>
    </table>

    <h2 style="margin-top: 2rem">Data Tingkat Keramaian Bulan</h2>
    <table class="history-report-table" style="margin-top: 2rem">
      <thead>
        <tr>
          <th>Tanggal</th>
          <th>Umum</th>
          <th>Pelajar</th>
          <th>Mancanegara 'Luar Negri'</th>
          <th>Mancanegara 'Dalam Negri</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="record in historyRecords" :key="record.date">
          <td>{{ record.date }}</td>
          <td>{{ formatCurrency(record.revenueKeraton.COH) }}</td>
          <td>{{ formatCurrency(record.revenueKeraton.CIA) }}</td>
          <td>{{ formatCurrency(record.revenueCuraweda) }}</td>
          <td>{{ formatCurrency(record.totalRevenue) }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
.history-report-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 1rem;
}

.history-report-table th,
.history-report-table td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: center;
}

.history-report-table th {
  background-color: #f2f2f2;
  font-weight: bold;
}
</style>
