<script setup>
import InvoiceHelper from '@/utilities/InvoiceHelper'
import CheckoutHelper from '@/utilities/CheckoutHelper'
import GlobalHelper from '@/utilities/GlobalHelper'
import { computed } from 'vue'

const { getImageURL } = GlobalHelper
const { showPopup, closeDetailPopup, selectedItem } = InvoiceHelper
const { biayaJasa, biayaLayanan } = CheckoutHelper
const invoiceData = computed(() => selectedItem.value || {})
</script>

<template>
  <div
    class="invoice-detail__overlay w-full h-full overlay flex align-items-center justify-content-center"
    v-if="showPopup"
  >
    <div class="invoice-detail__container-content flex fd-col align-items-center pd-0">
      <div class="invoice-detail__content-header flex align-items-center">
        <div class="invoice-detail__header-img flex justify-content-center">
          <img src="../assets/images/Logo KKC.svg" alt="Logo Keraton Kasepuhan Cirebon" />
        </div>
        <div class="invoice-detail__header-data">
          <h6 class="fw-600">Kasir</h6>
          <p>{{ invoiceData.cashier }}</p>
          <h6 class="fw-600">Pelanggan</h6>
          <p>{{ invoiceData.customer }}</p>
          <p>{{ invoiceData.number }}</p>
        </div>
        <div class="invoice-detail__header-date">
          <p class="">{{ invoiceData.appointment }}</p>
          <img :src="invoiceData.qr ? getImageURL(invoiceData.qr) : null" alt="QR Code" />
        </div>
      </div>
      <div class="invoice-detail__content-data">
        <div class="invoice-detail__data-pesanan flex fd-col gap[0.5] pd-sd-2 sm-bottom-1">
          <h6 class="fw-600">Reservasi</h6>
          <div v-for="(reserve, index) in invoiceData.reservation" :key="index" class="pesanan-row">
            <div class="pesanan-details">
              <p>
                {{ reserve.order }} <br />
                Rp. {{ reserve.price }},00 x {{ reserve.amount }}
              </p>
              <p v-if="reserve.guide">Guide : {{ reserve.guide }}</p>
            </div>
            <div class="pesanan-harga">
              <p>Rp. {{ reserve.totalPrice }},00</p>
            </div>
          </div>
        </div>
        <div class="invoice-detail__data-layanan flex fd-col gap[0.25] pd-sd-2">
          <div class="data-row">
            <h6 class="fw-600">Biaya Layanan</h6>
            <p>Rp. {{ biayaLayanan }},00</p>
          </div>
          <div class="data-row">
            <h6 class="fw-600">Biaya Jasa Aplikasi</h6>
            <p>Rp. {{ biayaJasa }},00</p>
          </div>
          <hr />
          <div class="layanan-row">
            <div class="layanan-item">
              <h6 class="fw-600">Pembayaran</h6>
              <p>{{ invoiceData.payment }}</p>
            </div>
            <div class="layanan-item">
              <h6 class="fw-600">Total</h6>
              <p>{{ invoiceData.total }},00</p>
            </div>
          </div>
        </div>
      </div>
      <button class="invoice-detail__button fw-600" @click="closeDetailPopup">OK</button>
    </div>
  </div>
</template>

<style scoped>
.invoice-detail__container-content {
  background-color: white;
  border-radius: 10px;
  width: 900px;
  font-family: 'Poppins';
  padding: 0;
}

.invoice-detail__content-header {
  width: 100%;
  background-color: #ffd477;
  border-radius: 10px 10px 0 0;
  padding: 20px;
  margin: 0;
}

.invoice-detail__header-img {
  height: 125px;
}

.invoice-detail__header-data {
  display: flex;
  flex-direction: column;
  margin-left: 2rem;
}

.invoice-detail__header-data p {
  margin-left: 1rem;
}

.invoice-detail__header-date {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-left: auto;
}

.invoice-detail__header-date img {
  height: 100px;
  width: 100px;
}

.invoice-detail__content-data {
  width: 100%;
  margin-top: 20px;
}

.data-row {
  display: flex;
  justify-content: space-between;
}

.pesanan-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.layanan-row {
  display: flex;
  justify-content: space-between;
}

.layanan-item {
  display: flex;
  flex-direction: column;
  align-items: center;
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
  margin-bottom: 20px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.invoice-detail__button:hover {
  background-color: #ffd477;
}
</style>
