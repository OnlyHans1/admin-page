<script setup>
import  { onMounted } from 'vue';
import ReportHelper from '@/utilities/ReportHelper'

const { orderInfoCardData, fetchOrderInfoCardData, capitalizeFirstLetter } = ReportHelper


onMounted(() => {
    fetchOrderInfoCardData()
})
</script>

<template>
<div class="ticket-info-card__container flex fd-col pd-1" v-for="(item, index) in orderInfoCardData" :key="index">
    <p class="ticket-info-card__title">{{ capitalizeFirstLetter(item.category) }}</p>
    <span class="ticket-info-card__details align-self-center">{{ item.sum }}</span>
    <p class="ticket-info-card__desc align-self-f-end">/ tiket</p>
</div>
</template>

<style scoped>
.ticket-info-card__container {
    width: 162px;
    height: 186px;
    background: linear-gradient(to bottom, rgba(255, 226, 154, 0.9), rgba(254, 209, 96, 0.9));
    box-shadow: 0 4px 10px 0 rgba(0, 0, 0, 0.25);
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
</style>