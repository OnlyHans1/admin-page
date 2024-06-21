<template>
  <h2 style="font-weight: bold; text-align: center">Report Curaweda</h2>
  <div
    style="
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      align-items: center;
      gap: 1rem;
      margin-top: 1rem;
    "
  >
    <div class="flex h-full" style="gap: 1rem">
      <div class="ticket-info-card__container flex fd-col pd-1">
        <p class="ticket-info-card__title">Revenue Total</p>
        <span class="ticket-info-card__details align-self-center">{{
          formatCurrency(revenueTotal)
        }}</span>
      </div>
      <div style="background: black; width: 0.1rem"></div>
    </div>

    <div
      style="
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 1rem;
        flex-wrap: wrap;
      "
    >
      <div class="ticket-info-card__container flex fd-col pd-1">
        <p class="ticket-info-card__title">Revenue Keraton "COH"</p>
        <span class="ticket-info-card__details align-self-center">{{
          formatCurrency(revenueKeraton.COH)
        }}</span>
      </div>

      <div class="ticket-info-card__container flex fd-col pd-1">
        <p class="ticket-info-card__title">Revenue Keraton "CIA"</p>
        <span class="ticket-info-card__details align-self-center">{{
          formatCurrency(revenueKeraton.CIA)
        }}</span>
      </div>
    </div>
    <div class="flex h-full" style="gap: 1rem">
      <div style="background: black; width: 0.1rem"></div>
      <div class="ticket-info-card__container flex fd-col pd-1">
        <p class="ticket-info-card__title">Revenue Curaweda</p>
        <span class="ticket-info-card__details align-self-center">{{
          formatCurrency(revenueCuraweda)
        }}</span>
      </div>
    </div>
  </div>

  <h2 style="font-weight: bold; text-align: center; margin-top: 10rem">History Report Curaweda</h2>

  <div style="margin-bottom: 1rem">
    <label for="filter-date" style="font-weight: bold; margin-right: 1rem">Filter by Date:</label>
    <input type="date" id="filter-date" v-model="filterDate" @change="filterRecords" />
  </div>

  <table class="history-report-table">
    <thead>
      <tr>
        <th>Date</th>
        <th>Revenue Keraton "COH"</th>
        <th>Revenue Keraton "CIA"</th>
        <th>Revenue Curaweda</th>
        <th>Total Revenue</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="record in filteredRecords" :key="record.date">
        <td>{{ record.date }}</td>
        <td>{{ formatCurrency(record.revenueKeraton.COH) }}</td>
        <td>{{ formatCurrency(record.revenueKeraton.CIA) }}</td>
        <td>{{ formatCurrency(record.revenueCuraweda) }}</td>
        <td>{{ formatCurrency(record.totalRevenue) }}</td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import { ref, computed } from 'vue'
import GlobalHelper from '../utilities/GlobalHelper'
const { DB_BASE_URL, TRANSACTION_BASE_URL } = GlobalHelper

export default {
  data() {
    return {
      revenueCuraweda: ref(0),
      revenueKeraton: ref({ CIH: 0, CIA: 0 }),
      revenueTotal: ref(0),
      historyRecords: ref([]),
      filterDate: ref('')
    }
  },
  mounted() {
    this.fetchData()
  },
  methods: {
    async fetchData() {
      try {
        const response = await fetch(
          `${DB_BASE_URL.value}/${TRANSACTION_BASE_URL.value}/income-revenue-curaweda`
        )
        if (!response.ok) throw Error('Failed to fetch Data')
        const responseData = await response.json()
        this.revenueKeraton = responseData.data.revenueKeraton
        this.revenueCuraweda = responseData.data.revenueCuraweda
        this.revenueTotal = responseData.data.revenueTotal
        this.historyRecords = responseData.data.historyRecords
      } catch (err) {
        console.log(err)
      }
    },

    formatCurrency(amount) {
      return Number(amount).toLocaleString('id-ID')
    },

    filterRecords() {
      const date = new Date(this.filterDate.value)
      this.filteredRecords = this.historyRecords.filter((record) => {
        const recordDate = new Date(record.date)
        return recordDate.toDateString() === date.toDateString()
      })
    }
  },
  computed: {
    filteredRecords() {
      if (!this.filterDate) return this.historyRecords
      const date = new Date(this.filterDate)
      return this.historyRecords.filter((record) => {
        const recordDate = new Date(record.date)
        return recordDate.toDateString() === date.toDateString()
      })
    }
  }
}
</script>

<style scoped>
p,
span {
  cursor: default;
}

.ticket-info-card__container {
  height: 186px;
  background: linear-gradient(to bottom, rgba(255, 226, 154, 0.9), rgba(254, 209, 96, 0.9));
  border-radius: 15px;
}
.ticket-info-card__title {
  font-size: 12px;
  line-height: 18px;
  width: fit-content;
  padding: 0 8px;
  border-radius: 5px;
  background-color: rgba(254, 209, 96, 1);
  mix-blend-mode: luminosity;
}
.ticket-info-card__details {
  font-size: 96px;
  font-weight: 500;
  line-height: 128px;
}
.ticket-info-card__desc {
  font-size: 12px;
  font-weight: 500;
  line-height: 18px;
  position: relative;
  bottom: 20px;
}

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
