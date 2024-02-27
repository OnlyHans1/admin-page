<script setup>
import { ref, defineProps } from 'vue'

const { targetDate, dataSeries, dataCategory } = defineProps(['targetDate', 'dataSeries', 'dataCategory'])

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
  xaxis: {
    type: 'category',
    categories: dataCategory,
    position: 'start',
    tickPlacement: 'between',
    forceNiceScale: true,
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
    },
    tooltip: {
      enabled: false
    }
  },
  yaxis: {
    axisBorder: {
      show: true,
      forceNiceScale: true,
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
  <div class="details__revenue-graphic flex fd-col align-center justify-center">
    <div class="revenue__chart-desc flex fd-row align-center justify-sb w-full">
      <div class="revenue__chart-desc__text flex fd-col">
        <span class="revenue__chart-title">Tingkat Keramaian</span>
        <span class="revenue__chart-subtitle">{{ targetDate }}</span>
      </div>
      <div class="revenue__chart-legend">
        <div class="revenue__chart-legend-item" v-for="(item, index) in dataSeries" :key="index">
          <span class="revenue__chart-legend-color" :style="{ backgroundColor: item.color }"></span>
          <span class="revenue__chart-legend-name">{{ item.name }}</span>
        </div>
      </div>
    </div>
    <div id="chart" class="chart-container">
      <apexchart
        type="line"
        height="200"
        width="460"
        :options="chartOptions"
        :series="dataSeries"
      ></apexchart>
    </div>
  </div>
</template>

<style>
.details__revenue-graphic {
  width: 532px;
  height: 312px;
  padding: 1rem;
  border-radius: 20px;
  box-shadow: 0 0 15px 0 rgba(0, 0, 0, 0.25);
}

.revenue__chart-title {
  font-size: 14px;
  line-height: 28px;
  font-weight: 600;
}

.revenue__chart-subtitle {
  font-size: 14px;
  line-height: 28px;
}

.apexcharts-xaxis-label tspan {
  font-size: 12px;
  line-height: 18px;
  font-weight: 600;
}

.apexcharts-yaxis-label tspan {
  font-size: 14px;
  line-height: 21px;
  font-weight: 600;
}

.revenue__chart-legend {
  display: flex;
  flex-direction: column;
  margin-right: 40px;
  gap: 2px;
}

.revenue__chart-legend-item {
  display: flex;
  flex-direction: row;
}

.revenue__chart-legend-color {
  width: 10px;
  height: 10px;
  display: inline-block;
  margin-right: 5px;
  border-radius: 100%;
}

.revenue__chart-legend-name {
  font-size: 9px;
}
</style>
