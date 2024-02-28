<script setup>
import Chart from '@/components/Chart.vue'
import reportData from '@/data/reportData'

const { target_year, yearlyData, yearlyCategory, target_month, monthlyData, monthlyCategory } = reportData
</script>

<template>
  <div class="report_container flex fd-col align-items-center justify-content-center gap[2.25]">
    <div class="report-information_container flex fd-row">
      <div class="report-information__income_container">
        <p class="fs-h5">Pendapatan hari ini</p>
      </div>
      <div class="report-information__ticketing_container">
        <!-- Content -->
      </div>
    </div>
    <div class="report-revenue_container">
      <div class="report-revenue__chart_container flex fd-row align-items-center justify-content-center gap[1.5]">
        <Chart :targetDate="target_year" :dataSeries="yearlyData" :dataCategory="yearlyCategory"/>
        <Chart :targetDate="target_month" :dataSeries="monthlyData" :dataCategory="monthlyCategory"/>
      </div>
    </div>
    <div class="report-activity_container">
      <div class="report-activity_head">
        <!-- Head -->
      </div>
      <div class="report-activity_table">
        <!-- Table -->
      </div>
    </div>
  </div>
</template>

<style>
.report-information_container {
  width: 1085px;
  height: 277px;
  padding: 1rem;
  border-radius: 20px;
  box-shadow: 0 0 15px 0 rgba(0, 0, 0, 0.25);
}
</style>
