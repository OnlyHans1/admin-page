<script setup>
import { ref } from 'vue'
import Sidebar from '@/components/Sidebar.vue'

const series = ref([
  {
    name: 'Umum',
    color: '#35E490',
    data: [0, 55, 38, 20, 31, 65, 65, 50, 32, 49, 31, 67]
  },
  {
    name: 'Pelajar',
    color: '#5855EE',
    data: [0, 41, 35, 51, 49, 62, 69, 91, 148]
  },
  {
    name: 'Mancanegara',
    color: '#7C0428',
    data: [0, 41, 35, 51, 49, 62, 69, 91, 148]
  }
])

const chartOptions = ref({
  chart: {
    toolbar: {
      show: false
    },
    type: 'line',
    zoom: {
      enabled: false
    },
    width: 400
  },
  dataLabels: {
    enabled: false
  },
  stroke: {
    width: 1.5,
    curve: 'straight'
  },
  title: {
    text: 'Tingkat Keramaian',
    align: 'left'
  },
  subtitle: {
    text: 'Subjudul di bawah judul',
    align: 'left',
    offsetY: 20,
  },
  xaxis: {
    type: 'category',
    categories: [
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
    ],
    tickPlacement: 'between',
    min: 0,
    axisTicks: {
      show: false
    },
    axisBorder: {
      show: true,
      color: '#000000',
      height: 1,
      offsetX: 0,
      offsetY: 0
    },
    labels: {
      show: true,
      color: '#000000',
      height: 1,
      maxWidth: 10,
      offsetX: 0,
      offsetY: 0
    }
  },
  yaxis: {
    axisBorder: {
      show: true,
      color: '#000000',
      height: 1,
      offsetX: 0,
      offsetY: 0
    },
    labels: {
      show: true,
      align: 'right',
      color: '#000000',
      height: 1,
      offsetX: 0,
      offsetY: 2
    },
    min: 0
  },
  grid: {
    borderColor: '#000000'
  },
  legend: {
    show: false
  }
})
</script>

<template>
  <div class="report-container">
    <Sidebar />
    <div>
      <div class="details__revenue-graphic">
        <div id="chart" class="chart-container">
          <apexchart
            type="line"
            height="280"
            width="460"
            :options="chartOptions"
            :series="series"
          ></apexchart>
          <div class="legend">
            <div class="legend-item" v-for="(item, index) in series" :key="index">
              <span class="legend-color" :style="{ backgroundColor: item.color }"></span>
              <span class="legend-name">{{ item.name }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.legend {
  position: absolute;
  top: 2.5rem;
  right: 10px;
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.legend-item {
  display: flex;
  flex-direction: row;
}

.legend-color {
  width: 10px;
  height: 10px;
  display: inline-block;
  margin-right: 5px;
  border-radius: 100%;
}

.legend-name {
  font-size: 9px;
}

.details__revenue-graphic {
  width: 532px;
  padding: 1rem;
}

.chart-container {
  position: relative;
  display: flex;
  justify-content: flex-end;
}
</style>
