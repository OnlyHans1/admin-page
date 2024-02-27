<script setup>
import Chart from '@/components/Chart.vue'
import { ref } from 'vue'

const target_year = ref('Tahun 2023')
const target_month = ref('Februari')

const yearlyData = ref([
  {
    name: 'Umum',
    color: '#35E490',
    data: [3, 55, 38, 20, 31, 65, 65, 50, 32, 49, 31, 67]
  },
  {
    name: 'Pelajar',
    color: '#5855EE',
    data: [8, 44, 78, 23, 56, 32, 89, 14, 67, 45, 21, 53]
  },
  {
    name: 'Mancanegara',
    color: '#7C0428',
    data: [5, 62, 37, 88, 15, 74, 29, 46, 51, 18, 83, 39]
  }
])

// Calculate monthly data
const monthlyData = ref([
  {
    name: 'Umum',
    color: '#35E490',
    data: [3, 22, 40, 75, 18, 63, 29, 50, 84, 37, 66, 11]
  },
  {
    name: 'Pelajar',
    color: '#5855EE',
    data: [2, 68, 92, 25, 49, 77, 35, 60, 14, 83, 28, 71]
  },
  {
    name: 'Mancanegara',
    color: '#7C0428',
    data: [1, 81, 17, 55, 30, 46, 69, 23, 58, 12, 44, 72]
  }
])

const yearlyCategory = ref([
  'JAN',
  'FEB',
  'MAR',
  'APR',
  'MAY',
  'JUN',
  'JUL',
  'AUG',
  'SEP',
  'OKT',
  'NOV',
  'DEC'
])

const monthlyCategory = ref(['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'])
</script>

<template>
  <div class="report-container flex fd-row align-center justify-center gap-4">
    <Chart :targetDate="target_year" :dataSeries="yearlyData" :dataCategory="yearlyCategory" />
    <Chart :targetDate="target_month" :dataSeries="monthlyData" :dataCategory="monthlyCategory" />
  </div>
</template>

<style></style>
