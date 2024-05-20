<script setup>
import InvoiceHelper from '@/utilities/InvoiceHelper'

const { showPopup, closeDetailPopup, capitalizeFirstLetter } = InvoiceHelper
const { selectedItem } = defineProps(['selectedItem'])
</script>

<template>
  <div class="invoice-detail__overlay w-full h-full overlay flex align-items-center justify-content-center" v-if="showPopup">
    <div class="invoice-detail__container-content flex fd-col align-items-center pd-1">
      <div class="invoice-detail__content-img">
        <img src="../assets/images/Logo KKC.svg" alt="Logo Keraton Kasepuhan Cirebon" />
      </div>
      <div class="invoice-detail__container-data align-self-f-start pd-sd-1 w-full">
        <div v-for="(value, key) in selectedItem" :key="key" class="invoice-detail__data">
          <h6 class="invoice-detail__data-title fw-600">{{ capitalizeFirstLetter(key) }}</h6>
          <p class="to-ellipsis">{{ value }}</p>
        </div>
      </div>
      <button class="invoice-detail__button" @click="closeDetailPopup()">OK</button>
    </div>
  </div>
</template>

<style scoped>
.invoice-detail__container-content {
  background-color: white;
  border-radius: 10px;
  width: 365px;
  font-family: 'Poppins';
}
.invoice-detail__content-img {
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
}
.invoice-detail__content-img img {
  height: 105px;
}
.invoice-detail__data-title {
  line-height: 32px;
}
.invoice-detail__container-data p {
  font-size: 16px;
  margin-bottom: 5px;
  margin-left: 10px;
}
.invoice-detail__button {
  display: flex;
  justify-content: center;
  margin-top: 10px;
}
.invoice-detail__button {
  background-color: #ffe29a;
  font-family: 'Poppins';
  font-size: 16px;
  width: 120px;
  height: 40px;
  border-radius: 5px;
  border: none;
  padding: 10px 20px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}
.invoice-detail__button:hover {
  background-color: #ffd477;
}
</style>
