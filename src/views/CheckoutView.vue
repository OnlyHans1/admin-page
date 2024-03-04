<script setup>
import Slider from '@/components/Slider.vue'
import NationalityDropdown from '@/components/NationalityDropdown.vue'
import PaymentPopup from '@/components/PaymentPopup.vue'

import { ref, computed } from 'vue'

const ticketValue = ref(1)
const isMancanegara = true
const ticketPrice = ref(10000)

function addTicket() {
  ticketValue.value++
}

function reduceTicket() {
  if (ticketValue.value > 1) {
    ticketValue.value--
  }
}

const selectedDate = ref(null)
const discountValue = ref(null)

const biayaLayanan = ref(2500)
const biayaJasa = ref(1000)

const totalHarga = computed(() => {
  return ticketValue.value * ticketPrice.value * (1 - (discountValue.value || 0) / 100)
})
const formattedTotalHarga = computed(() => {
  return totalHarga.value.toLocaleString('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  })
})

const totalTagihan = computed(() => {
  return totalHarga.value + biayaLayanan.value + biayaJasa.value
})
const formattedTotalTagihan = computed(() => {
  return totalTagihan.value.toLocaleString('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  })
})
</script>

<template>
  <main>
    <div class="checkout__container">
      <div class="checkout__form-container">
        <div class="order-details__container">
          <form>
            <h1>Pemesanan Langsung</h1>
            <div class="order-details__checkout">
              <div class="order-details__customer">
                <div class="order-details__content">
                  <i class="ri-user-line"></i>
                  <p>Detail Pemesan</p>
                </div>
                <div class="order-details__content">
                  <p class="fs-h5 fw-700">Teddy Lazuardi</p>
                  <p>- (TeddyLazuardi@gmail.com)</p>
                </div>
                <div class="order-details__dropdown" v-if="isMancanegara">
                  <NationalityDropdown />
                </div>
              </div>
              <div class="order-details__ticket">
                <div class="order-details__content">
                  <i class="ri-coupon-2-line"></i>
                  <p>Detail Tiket</p>
                </div>
                <div class="order-details__ticket-date">
                  <div class="ticket__input-placeholder">
                    <input type="date" class="ticket__input-date" v-model="selectedDate" />
                    <label>Tanggal Pemesanan</label>
                  </div>
                  <p>MM/DD/YYYY</p>
                </div>
                <div class="order-details__ticket">
                  <div class="order-details__ticket-items">
                    <p>Tiket masuk Keraton Kasepuhan Cirebon</p>
                    <span>Rp {{ ticketPrice }},00</span>
                  </div>
                  <div class="order-details__ticket-value">
                    <button @click="reduceTicket" type="button">
                      <i class="ri-subtract-fill"></i>
                    </button>
                    <p>{{ ticketValue }}</p>
                    <button @click="addTicket" type="button"><i class="ri-add-line"></i></button>
                  </div>
                </div>
              </div>
              <div class="pricings-slider__container">
                <div class="discount__slider">
                  <p class="fw-500">Diskon</p>
                  <Slider v-model:discountValue="discountValue" />
                </div>
              </div>
              <div class="order-details__content">
                <i class="ri-wallet-line"></i>
                <p>Pilih Pembayaran</p>
              </div>
              <select class="">
                <option value="gopay">Cash</option>
                <option value="dana">VA BJB</option>
              </select>
            </div>
          </form>
        </div>
      </div>
      <div class="checkout__details-container">
        <div class="checkout__details-content">
          <form class="checkout__details-form" @submit.prevent="submitRingkasan">
            <p class="fs-h5">Ringkasan Booking</p>
            <div class="checkout__details-pricing-container">
              <p class="fw-700 fs-h6">Total Pemesanan</p>
              <div class="checkout__details-pricing">
                <p>Jumlah Tiket ({{ ticketValue }} Tiket)</p>
                <p>{{ formattedTotalHarga }}</p>
              </div>
            </div>
            <div class="checkout__details-pricing-container">
              <p class="fw-700 fs-h6">Biaya Transaksi</p>
              <div class="checkout__details-pricing">
                <p>Biaya Layanan</p>
                <p>Rp {{ biayaLayanan }}</p>
              </div>
              <div class="checkout__details-pricing">
                <p>Biaya Jasa Aplikasi</p>
                <p>Rp {{ biayaJasa }}</p>
              </div>
            </div>
            <div class="checkout__details-total">
              <p class="fw-700 fs-h5">Total Tagihan</p>
              <p class="fw-700 fs-h6">{{ formattedTotalTagihan }}</p>
            </div>
          </form>
        </div>
        <div class="checkout-btn">
          <button type="submit" class="checkout__btn-order" @click="showPayment">
            Checkout
            <i class="ri-arrow-right-circle-fill"></i>
          </button>
        </div>
      </div>
    </div>
  </main>
</template>

<style scoped>
main {
  font-family: 'Raleway';
}
.checkout__container {
  display: flex;
  flex-direction: row;
  gap: 3rem;
}
.checkout__form-container {
  width: 100%;
}
.order-details__container {
  width: 400px;
  margin-left: 5%;
}
.order-details__container :not(.order-details__ticket-value button) > i {
  color: #e6be58;
  font-size: 24px;
}
.order-details__checkout {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}
.order-details__customer {
  display: flex;
  flex-direction: column;
}
.order-details__content {
  display: flex;
  flex-direction: row;
  gap: 0.5rem;
  align-items: center;
}
.order-details__dropdown {
  margin-top: 0.25rem;
}
.order-details__ticket {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}
.ticket__input-date {
  font-family: Roboto;
}
.order-details__ticket-date input {
  padding: 10px;
  border: 3px solid rgba(0, 0, 0, 1) s;
  outline: none;
  border-radius: 4px;
  width: 50%;
}
.order-details__ticket-date p {
  padding: 0.25rem 1rem;
  font-size: 12px;
  line-height: 16px;
}
.order-details__ticket-date label {
  position: absolute;
  top: 1%;
  left: 8px;
  transform: translateY(-50%);
  background-color: white;
  padding: 0 1px;
  pointer-events: none;
  font-size: 12px;
}
.order-details__ticket-date input:focus {
  border: 3px solid rgba(218, 165, 32, 1);
}
.order-details__ticket-date input:focus + label {
  color: rgba(218, 165, 32, 1);
}
.ticket__input-placeholder {
  position: relative;
}
.order-details__ticket-items {
  font-size: 20px;
  line-height: 28px;
}
.order-details__ticket-value {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 1rem;
  font-weight: 500;
  font-family: 'Manrope';
}
.order-details__ticket-value button {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.2rem;
  background-color: transparent;
  border: 1px solid black;
  border-radius: 6px;
  width: 24px;
  height: 24px;
  background-color: white;
  color: gray;
  border: 1.4px solid gray;
  cursor: pointer;
  font-size: 15px;
}
.order-details__ticket-value button:hover {
  background-color: black;
  color: #ced4da;
  border: 1.4px solid black;
}
.pricings-slider__container {
  font-family: 'Poppins';
}
.checkout__details-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem 0;
  width: 100%;
  gap: 1rem;
}
.checkout__details-content {
  width: 522px;
}
.checkout__details-form {
  height: fit-content;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  padding: 20px;
  border-radius: 15px;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
.checkout__details-pricing-container {
  padding: 0.25rem 0;
}
.checkout__details-pricing {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 0.3rem 0;
}
.checkout__details-total {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  border-top: solid 0.5px #ccc;
  padding: 0.5rem 0;
}
.checkout-btn {
  width: 522px;
}
.checkout__btn-order {
  width: 100%;
  background-color: #ffdd8f;
  border: none;
  padding: 10px 20px;
  cursor: pointer;
  color: black;
  border-radius: 6px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  font-weight: 700;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}
.checkout__btn-order:hover {
  background-color: #e6be58;
}
.checkout__btn-order i {
  font-size: 20px;
}
</style>
