<script setup>
import tableReportData from '@/data/tableReportData'

const { activityReportData } = tableReportData
</script>

<template>
  <div class="report-activity_table">
    <table class="report-activity_table-data">
      <thead>
        <tr class="report-activity_table-header">
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
          class="report-activity_table-items"
          v-for="(item, index) in activityReportData"
          :key="index"
        >
          <td>{{ index + 1 }}</td>
          <td>{{ item.name }}</td>
          <td>{{ item.category }}</td>
          <td>{{ item.date }}</td>
          <td>{{ item.amount }}</td>
          <td>{{ item.total }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style>
.report-activity_table {
  max-height: calc(374px - 2rem);
  overflow-y: auto;
}
.report-activity_table::-webkit-scrollbar {
  width: 0;
}
.report-activity_table-data {
  border-collapse: collapse;
  outline: 0;
  width: 100%;
}
.report-activity_table-header th {
  font-size: 24px;
  font-weight: 600;
  line-height: 28px;
  background-color: white;
  box-shadow: inset 0 -1px 0 #000000;
  position: sticky;
  top: 0;
}
.report-activity_table-items td {
  font-size: 18px;
  line-height: 28px;
}
.report-activity_table-header th,
.report-activity_table-items td {
  text-align: center;
  border-bottom: 1px solid #000;
  padding: 0.5rem 1.5rem;
}
.report-activity_table-header th:nth-child(2),
.report-activity_table-items td:nth-child(2) {
  text-align: start;
  padding-left: 2rem;
}
</style>
