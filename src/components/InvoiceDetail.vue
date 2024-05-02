<script setup>
import InvoiceHelper from '@/utilities/InvoiceHelper'

const { showPopup, closeDetailPopup, capitalizeFirstLetter } = InvoiceHelper
const { selectedItem } = defineProps(['selectedItem'])
</script>

<template>
  <div class="invoice-detail__container" v-if="showPopup">
    <div class="invoice-detail__container-content">
      <div class="invoice-detail__content-img">
        <img src="../assets/images/Logo KKC.svg" alt="Logo Keraton Kasepuhan Cirebon" />
      </div>
      <div class="invoice-detail__container-data align-self-f-start pd-sd-1 w-full">
        <div>
          <div v-for="(value, key) in selectedItem" :key="key" class="invoice-detail__data">
            <h3 class="invoice-detail__data-title">{{ capitalizeFirstLetter(key) }}</h3>
            <p class="to-ellipsis">{{ value }}</p>
          </div>
        </div>
      </div>
      <button class="invoice-detail__button" @click="closeDetailPopup()">OK</button>
    </div>
  </div>
</template>

<style scoped>
.invoice-detail__container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 999;
}
.invoice-detail__container-content {
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  width: 365px;
  height: 620px;
  font-family: 'Poppins';
  display: flex;
  flex-direction: column;
  align-items: center;
}
.invoice-detail__content-img {
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
}
.invoice-detail__content-img img {
  width: 130px;
  height: 135px;
}
.invoice-detail__data-title {
  font-size: 20px;
  font-weight: 600;
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
