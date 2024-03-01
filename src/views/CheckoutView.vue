<script setup>
import Slider from '@/components/Slider.vue'
import PaymentPopup from '@/components/PaymentPopup.vue'
import NationalityDropdown from '@/components/NationalityDropdown.vue'

import { ref, computed } from 'vue'

const value = ref(1)
const ticketPrice = 10000
const biayaLayanan = 2500
const biayaJasa = 1000
const selectedDate = ref(null)
const discountValue = ref(null)
const cashbackValue = ref(null)
const isMancanegara = true

function tambahTiket() {
  value.value++
}

function kurangTiket() {
  if (value.value > 1) {
    value.value--
  }
}

const totalHarga = computed(() => {
  return value.value * ticketPrice * (1 - (discountValue.value || 0) / 100)
})

const totalTagihan = computed(() => {
  return totalHarga.value + biayaLayanan + biayaJasa
})

const formattedTotalHarga = computed(() => {
  return totalHarga.value.toLocaleString('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  })
})

const formattedTotalTagihan = computed(() => {
  return totalTagihan.value.toLocaleString('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  })
})

const paymentPopup = ref(null)

const showPayment = () => {
  paymentPopup.value.showPaymentPopup()
}
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
                    <input
                      type="date"
                      class="ticket__input-date"
                      id="tanggal"
                      v-model="selectedDate"
                    />
                    <label>Tanggal Pemesanan</label>
                  </div>
                  <p>MM/DD/YYYY</p>
                </div>
                <div>
                  <p for="jumlah">Tiket masuk Keraton Kasepuhan Cirebon</p>
                  <span>Rp 10.000,00</span>
                  <div class="jumlah">
                    <button @click="kurangTiket" type="button">
                      <i class="ri-subtract-fill"></i>
                    </button>
                    <p class="value">{{ value }}</p>
                    <button @click="tambahTiket" type="button"><i class="ri-add-line"></i></button>
                  </div>
                </div>
              </div>
              <div class="pricings-slider__container">
                <div class="discount__slider">
                  <p class="fw-500">Diskon</p>
                  <Slider v-model:discountValue="discountValue" />
                </div>
                <div class="cashback-slider">
                  <p class="fw-500">Cashback</p>
                  <Slider v-model:cashbackValue="cashbackValue" />
                </div>
              </div>
              <div class="order-details__content">
                <i class="ri-wallet-line"></i>
                <p>Pilih Pembayaran</p>
              </div>
              <select class="payment" id="payment" v-model="payment">
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
            <h3>Ringkasan Booking</h3>
            <div class="total">
              <label class="fw-700 fs-h6" for="total">Total Pemesanan</label>
              <div class="jmlhhrga">
                <label for="jumlahTiket">Jumlah Tiket ({{ value }} Tiket)</label>
                <label for="harga">{{ formattedTotalHarga }}</label>
              </div>
            </div>
            <div class="biaya">
              <label class="fw-700 fs-h6" for="biayaTransaksi">Biaya Transaksi</label>
              <div class="biayaL">
                <label for="biayaLayanan">Biaya Layanan</label>
                <label for="hargaLayanan">Rp 2.500</label>
              </div>
              <div class="biayaJ">
                <label for="biayaJasa">Biaya Jasa Aplikasi</label>
                <label for="hargaJasa">Rp 1.000</label>
              </div>
            </div>
            <div class="total-tagihan">
              <label class="fw-700 fs-h5" for="totalTagihan">Total Tagihan</label>
              <label class="fw-700 fs-h6">{{ formattedTotalTagihan }}</label>
            </div>
          </form>
        </div>
        <div class="checkout-btn">
          <button type="submit" class="checkout__btn-order" @click="showPayment">
            Checkout
            <i class="ri-arrow-right-circle-fill"></i>
          </button>
        </div>
        <PaymentPopup ref="paymentPopup" />
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
.pricings-slider__container {
  font-family: 'Poppins';
}
.order-details__container {
  width: 400px;
  margin-left: 5%;
}

.main {
  flex: 1;
  padding: 20px;
}
.order-details__checkout {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}
.cashback label {
  margin-top: -15px;
}

h1 {
  margin-top: -10px;
  margin-bottom: 8%;
}

label {
  display: block;
  margin-bottom: -px;
}

select,
button {
  width: 100%;
  padding: 10px;
  margin-bottom: 8px;
  box-sizing: border-box;
}

.input-country label {
  position: absolute;
  top: 203px;
  left: 15%;
  transform: translateY(-50%);
  background-color: white;
  pointer-events: none;
  font-size: 12px;
}
.jumlah {
  display: flex;
}

.total,
.biaya {
  margin-top: 20px;
  font-size: 14px;
}

.total-tagihan {
  margin-top: 25px;
  border-top: solid 0.5px #ccc;
  padding-top: 10px;
}

button {
  background-color: #ffdd8f;
  color: white;
  border: 5px;
  padding: 10px 20px;
  cursor: pointer;
}

button:hover {
  background-color: #e6be58;
}

.jumlah button {
  padding: 0;
  margin-right: 10px;
  margin-top: 10px;
  background-color: transparent;
  border: 1px solid black;
  border-radius: 6px;
  width: 24px;
  height: 24px;
  color: black;
}

.jumlah span {
  margin-top: 10px;
  margin-right: 9px;
}
.biaya {
  margin-top: 20px;
}

.bold-text {
  font-weight: 900;
  font-size: 16px;
  margin-bottom: 5px;
}

.checkout__details-form {
  height: 348px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  padding: 20px;
  border-radius: 15px;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.box-size {
  width: 59%;
}

.payment {
  width: 522px;
  border-radius: 10px;
  border: none;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
}

.title {
  color: grey;
  font-size: 12px;
}
.email {
  font-size: 15px;
  margin-left: 130px;
  margin-top: -30px;
}

.ri-user-line,
.ri-coupon-2-line,
.ri-wallet-line {
  color: #e6be58;
  font-size: 21px;
}

.ri-arrow-right-circle-fill {
  margin-left: 74%;
}

.cashback .bold-text {
  margin-top: 7px;
  margin-bottom: -5px;
  margin-left: 27px;
  font-weight: 510;
}

.cashback .bold-text {
  margin-top: -15px;
}

.value {
  margin-top: 7px;
  margin-left: 5px;
  margin-right: 14px;
  font-size: 16px;
}

.jumlah button {
  background-color: white;
  color: gray;
  border: 1.4px solid gray;
  cursor: pointer;
  font-size: 15px;
}

.jumlah button:hover {
  background-color: black;
  color: #ced4da;
  border: 1.4px solid black;
}

.jumlah p {
  margin-top: 9px;
  font-weight: 500;
  display: inline-block;
  font-family: 'Manrope';
}

.jmlhhrga {
  display: flex;
  justify-content: space-between;
}

.biayaL {
  display: flex;
  justify-content: space-between;
}

.biayaJ {
  display: flex;
  justify-content: space-between;
}

.total-tagihan {
  display: flex;
  justify-content: space-between;
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
.checkout-btn {
  width: 522px;
}
.checkout__btn-order {
  color: black;
  border-radius: 6px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  font-weight: 700;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}
.checkout__btn-order i {
  font-size: 20px;
}
</style>
