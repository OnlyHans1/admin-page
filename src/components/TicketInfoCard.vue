<script setup>
import ticketInfoData from '@/data/ticketInfoData'

const { cardInfo } = ticketInfoData
</script>

<template>
<div class="ticket-info-card_container flex fd-col pd-1" v-for="(item, index) in cardInfo" :key="index">
    <p class="ticket-info-card_title">{{ item.name }}</p>
    <span class="ticket-info-card_details align-self-center">{{ item.sold }}</span>
    <p class="ticket-info-card_desc align-self-f-end">/ tiket</p>
</div>
</template>

<style>
.ticket-info-card_container {
    width: 162px;
    height: 186px;
    background: linear-gradient(to bottom, rgba(255, 226, 154, 0.9), rgba(254, 209, 96, 0.9));
    box-shadow: 0 4px 10px 0 rgba(0, 0, 0, 0.25);
    border-radius: 15px;
}
.ticket-info-card_title {
    font-size: 12px;
    line-height: 18px;
    width: fit-content;
    padding: 0 8px;
    border-radius: 5px;
    background-color: rgba(254, 209, 96, 1);
    mix-blend-mode: luminosity;
}
.ticket-info-card_details {
    font-size: 96px;
    font-weight: 500;
    line-height: 128px;
}
.ticket-info-card_desc {
    font-size: 12px;
    font-weight: 500;
    line-height: 18px;
    position: relative;
    bottom: 20px;
}
</style>@/data/chartData