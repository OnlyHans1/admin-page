<script setup>
import { ref, onMounted } from 'vue'
import Chart from '@/components/Chart.vue'
import TicketInfoCard from '@/components/TicketInfoCard.vue'
import TableReport from '@/components/TableReport.vue'
import CategoryDropdown from '@/components/CategoryDropdown.vue'
import chartReportData from '@/data/chartReportData'
import ReportHelper from '@/utilities/ReportHelper'

const { target_year, yearlyData, yearlyCategory, target_month, monthlyData, monthlyCategory } =
  chartReportData
const { incomeRevenue, fetchIncomeRevenue, formatCurrency, generateExcel, printData } = ReportHelper
const category = ref('')
const updateCategory = (selectedCategory) => {
  category.value = selectedCategory
}

onMounted(() => {
  fetchIncomeRevenue()
})
</script>

<template>
  <div class="report__container flex fd-col align-items-center justify-content-center gap[2.25]">
    <div class="report-information__container flex fd-row justify-content-sb pd-top[1.5] pd-sd-2">
      <div class="report-information__income-container flex fd-col gap-1">
        <p class="fs-h5">Pendapatan hari ini</p>
        <div class="report-information__income-text flex fd-row">
          <span class="report-information__income-desc">Rp </span>
          <span class="report-information__income-details">{{ formatCurrency(incomeRevenue.total) }}</span>
        </div>
      </div>
      <div class="report-information__ticketing-container flex fd-col gap[0.5]">
        <p class="fs-h5">Tiket terjual</p>
        <div class="report-information__ticketing-card flex fd-row gap[1.5] pd-left-1">
          <TicketInfoCard />
        </div>
      </div>
    </div>
    <div class="report-revenue__container flex fd-col">
      <div
        class="report-revenue__chart-container flex fd-row align-items-center justify-content-center gap[1.5]"
      >
        <Chart :targetDate="target_year" :dataSeries="yearlyData" :dataCategory="yearlyCategory" />
        <Chart
          :targetDate="target_month"
          :dataSeries="monthlyData"
          :dataCategory="monthlyCategory"
        />
      </div>
      <div
        class="report-revenue__icons flex fd-row align-self-f-end gap-1 pd-sd-1 pd-top-1 align-items-center"
      >
        <span class="icons" name="Print Data" @click="printData"
          ><ph-printer :size="32" weight="bold"
        /></span>
        <span class="icons" name="Report to Excel" @click="generateExcel">
          <ph-microsoft-excel-logo :size="32" weight="fill" fill="green" />
        </span>
      </div>
    </div>
    <div class="report-activity__container flex fd-col gap-1">
      <div class="report-activity__head flex fd-row gap[1.5] align-items-center">
        <p class="report-activity__head-text">Aktivitas Terbaru</p>
        <div class="report-activity__head-dropdown-container">
          <CategoryDropdown
            :categoryWidth="'136px'"
            ref="category"
            @option-selected="updateCategory"
          />
        </div>
      </div>
      <div class="report-activity__table-container">
        <TableReport :filteredCategory="category" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.report-information__container {
  width: 1085px;
  height: 277px;
  border-radius: 20px;
  box-shadow: 0 0 15px 0 rgba(0, 0, 0, 0.25);
}
.report-information__income-desc {
  font-size: 24px;
  font-weight: 600;
  line-height: 36px;
}
.report-information__income-details {
  font-size: 64px;
  font-weight: 600;
  line-height: 96px;
}
.report-revenue__icons .icons {
  font-size: 32px;
  position: relative;
}
.report-revenue__icons .icons:hover {
  opacity: 70%;
  cursor: pointer;
}
.report-revenue__icons .icons:hover::after {
  content: attr(name);
  position: absolute;
  bottom: -2rem;
  left: 50%;
  transform: translateX(-50%);
  background-color: rgba(0, 0, 0, 0.8);
  color: #fff;
  padding: 0.5rem;
  border-radius: 0.5rem;
  font-family: 'Poppins';
  font-weight: 500;
  font-size: 12px;
  line-height: 16px;
  white-space: nowrap;
  z-index: 9999;
}
.report-activity__head-text {
  font-size: 20px;
  font-weight: 600;
  line-height: 28px;
}
.report-activity__table-container {
  width: 1081px;
  height: 374px;
  border-radius: 20px;
  box-shadow: 0 0 15px 0 rgba(0, 0, 0, 0.25);
  padding: 1rem;
}
</style>
