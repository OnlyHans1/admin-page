<script setup>
import { ref } from 'vue'
import Slider from '@/components/Slider.vue'
import PaymentPopup from '@/components/PaymentPopup.vue'

const jumlahTiket = ref(1)

const tambahTiket = () => {
  jumlahTiket.value++
}

const kurangTiket = () => {
  if (jumlahTiket.value > 1) {
    jumlahTiket.value--
  }
}

const discountValue = ref(0)
const cashbackValue = ref(0)

const paymentPopup = ref(null)

const showPayment = () => {
  paymentPopup.value.showPaymentPopup()
}
</script>

<template>
  <link
    href="https://fonts.googleapis.com/css2?family=Raleway:wght@400;700&display=swap"
    rel="stylesheet"
  />
  <link
    href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@400;700display=swap"
    rel="stylesheet"
  />
  <link rel="stylesheet" href="style.css" />
  <div class="container">
    <div class="form-container-checkout">
      <div class="submitEvent">
        <form @submit.prevent="SubmitEvent">
          <h1>Pemesanan Langsung</h1>
          <div class="order__details-checkout">
            <div class="detail">
              <label class="title" for="">
                <i class="ri-user-line"></i>
                Detail Pemesanan
              </label>
              <label class="bold-text" for="name">Teddy Lazuardi</label>
              <select class="box-size" id="kebangsaan" v-model="kebangsaan">
                <option value="Afghan">Afghanistan</option>
              </select>
            </div>
            <div class="tiket">
              <label class="title" for="detail">
                <i class="ri-coupon-2-line"></i>
                Detail Tiket
              </label>
              <div class="input-date">
                <input type="date" class="date" id="tanggal" v-model="Date" required />
                <label for="tanggal">Tanggal Pemesanan</label>
                <p>MM/DD/YYYY</p>
              </div>
              <label for="jumlah">Tiket masuk Keraton Kasepuhan Cirebon</label>
              Rp 10.000,00
              <div class="jumlah">
                <button @click="kurangTiket">-</button>
                <span>{{ jumlahTiket }}</span>
                <button @click="tambahTiket">+</button>
              </div>
            </div>
            <div class="diskon">
              <div class="diskon">
                <label class="bold-text" for="diskon">Diskon</label>
                <Slider v-model:discountValue="discountValue" />
              </div>
            </div>
            <div class="cashback">
              <label class="bold-text" for="cashback">Cashback</label>
              <Slider v-model:cashbackValue="cashbackValue" />
            </div>
            <label class="title" for="payment">
              <i class="ri-wallet-line"></i>
              Pilih Pembayaran
            </label>
            <select class="payment" id="payment" v-model="payment" required>
              <option value="gopay">gopay</option>
              <option value="dana">dana</option>
            </select>
          </div>
        </form>
      </div>
      <div class="ringkasanBooking">
        <form class="formBooking" @submit.prevent="submitRingkasan">
          <h3>Ringkasan Booking</h3>
          <div class="total">
            <label class="bold-text" for="total">Total Pemesanan</label>
            <label for="jumlahTiket">Jumlah Tiket</label>
          </div>
          <div class="biaya">
            <label class="bold-text" for="biayaTransaksi">Biaya Transaksi</label>
            <label for="biayaLayanan">Biaya Layanan</label>
            <label for="biayaJasa">Biaya Jasa Aplikasi</label>
          </div>
          <div class="total-tagihan">
            <label class="bold-text" for="totalTagihan">Total Tagihan</label>
          </div>
        </form>
        <div class="btn-checkout">
          <button type="submit" class="CO" @click="showPayment">
            Checkout
            <i class="ri-arrow-right-circle-fill"></i>
          </button>
        </div>
        <PaymentPopup ref="paymentPopup" />
      </div>
    </div>
  </div>
</template>

<style scoped>
* {
  font-family: Raleway;
}

.container {
  display: flex;
}

.main {
  flex: 1;
  display: flex;
  justify-content: space-between;
}

.form-container-checkout {
  display: flex;
  flex-direction: row;
  gap: 5rem;
  font-size: 16px;
}

.ringkasanBooking {
  margin-top: 7%;
  width: 400px;
  height: 348px;
  margin-left: 200px;
}

.submitEvent {
  width: 400px;
  margin-left: 5%;
}

.main {
  flex: 1;
  padding: 20px;
}

.cashback label {
  margin-top: -15px;
}

h1 {
  margin-top: -10px;
  margin-bottom: 8%;
}

form {
  margin-top: 20px;
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

.date {
  font-family: Roboto;
}

.input-date {
  position: relative;
  margin-bottom: 15px;
  margin-top: 15px;
}

.input-date input[type='date'] {
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 50%;
}

.input-date label {
  position: absolute;
  top: 1%;
  left: 8px;
  transform: translateY(-50%);
  background-color: white;
  padding: 0 1px;
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
  background-color: #e6be58;
  color: white;
  border: 5px;
  padding: 10px 20px;
  cursor: pointer;
}

button:hover {
  background-color: #ffdd8f;
}

.jumlah button {
  padding: 0;
  margin-right: 10px;
  margin-top: 10px;
  background-color: transparent;
  border: 1px solid black;
  border-radius: 6px;
  width: 20px;
  height: 20px;
  font-size: 14px;
  color: black;
}

.jumlah span {
  margin-top: 10px;
  margin-right: 9px;
}

.CO {
  color: black;
  border-radius: 6px;
  text-align: left;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  font-weight: 700;
}

.btn-checkout {
  margin-top: 20px;
}

.biaya {
  margin-top: 20px;
}

.bold-text {
  font-weight: 900;
  font-size: 16px;
  margin-bottom: 5px;
}

.formBooking {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  padding: 20px;
  border-radius: 15px;
  margin-top: 17%;
}

.box-size {
  width: 50%;
}

.payment {
  border-radius: 10px;
  border: none;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
}

.tiket .title {
  margin-top: -5px;
  margin-bottom: -3px;
}

.title {
  color: grey;
  font-size: 12px;
}

.ri-user-line,
.ri-coupon-2-line,
.ri-wallet-line {
  color: #e6be58;
  font-size: 18px;
}

.ri-arrow-right-circle-fill {
  margin-left: 74%;
}

p {
  font-size: 9px;
  margin-top: 2px;
  margin-left: 11px;
  margin-bottom: -10px;
}

.diskon .bold-text,
.cashback .bold-text {
  margin-top: 7px;
  margin-bottom: -5px;
  margin-left: 35px;
  font-weight: 510;
}

.cashback .bold-text {
  margin-top: -15px;
}
</style>
