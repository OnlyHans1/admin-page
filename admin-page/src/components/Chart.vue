<script setup>
import { ref } from 'vue'

const { targetDate, dataSeries, dataCategory } = defineProps([
  'targetDate',
  'dataSeries',
  'dataCategory'
])

const chartOptions = ref({
  chart: {
    toolbar: {
      show: true,
      tools: {
        download: false,
        selection: false,
        zoom: false,
        zoomin: false,
        zoomout: false,
        pan: true,
        reset: '<i class="ri-loop-left-line"></i>',
      }
    },
    type: 'line',
    pan: {
      enabled: true,
      type: 'x'
    },
    width: 460,
    events: {
      beforeResetZoom: (chartContext, opts) => {
        return {
          xaxis: {
            min: dataCategory.length - 7,
            max: dataCategory.length
          }
        };
      },
      beforeZoom: (chartContext, opts) => {
        return {
          xaxis: {
            min: opts.xaxis.min < 0 ? 0 : opts.xaxis.min,
            max: opts.xaxis.max > dataCategory.length ? dataCategory.length : opts.xaxis.max
          }
        };
      }
    }
  },
  dataLabels: {
    enabled: false
  },
  xaxis: {
    type: 'category',
    categories: dataCategory,
    position: 'start',  
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
      offsetX: 0
    },
    tooltip: {
      enabled: false
    },
    min: 1,
    max: 7
  },
  yaxis: {
    axisBorder: {
      show: true,
      forceNiceScale: true,
      color: '#000000',
      height: 1,
      offsetX: 0,
      offsetY: 0,
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
  <div class="revenue-details flex fd-col align-items-center justify-content-sb">
    <div class="revenue-details__desc flex fd-row align-items-f-start justify-content-sb w-full">
      <div class="revenue-details__desc-text flex fd-col">
        <p class="revenue-details__desc-title">Tingkat Keramaian</p>
        <p class="revenue-details__desc-subtitle">{{ targetDate }}</p>
      </div>
      <div class="revenue-details__legend">
        <div class="revenue-details__legend-item" v-for="(item, index) in dataSeries" :key="index">
          <span
            class="revenue-details__legend-color"
            :style="{ backgroundColor: item.color }"
          ></span>
          <p class="revenue-details__legend-name">{{ item.name }}</p>
        </div>
      </div>
    </div>
    <div id="chart" class="revenue-details__chart-container">
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
.revenue-details {
  width: 531px;
  height: 311px;
  padding: 1rem;
  border-radius: 20px;
  box-shadow: 0 0 15px 0 rgba(0, 0, 0, 0.25);
  overflow-x: auto; /* Tambahkan overflow agar dapat digulir */
}

.revenue-details__desc-title {
  font-size: 14px;
  line-height: 28px;
  font-weight: 600;
}

.revenue-details__desc-subtitle {
  font-size: 12px;
  line-height: 14px;
}

.revenue-details__legend {
  display: flex;
  flex-direction: column;
  margin-right: 40px;
  gap: 2px;
}

.revenue-details__legend-item {
  display: flex;
  flex-direction: row;
}

.revenue-details__legend-color {
  width: 10px;
  height: 10px;
  display: inline-block;
  margin-right: 5px;
  border-radius: 100%;
}

.revenue-details__legend-name {
  font-size: 9px;
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
</style>
