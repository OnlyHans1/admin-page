<script setup>
import { onMounted, ref } from 'vue'
import logoBJB from '@/assets/images/logoBJB.png'
import LoaderPayment from '@/components/LoaderPayment.vue'
import PaymentPopup from '@/components/PaymentPopup.vue'

const checkoutTime = ref('')
const countdown = ref('')
const isLoading = ref(false)

const handleCheckout = () => {
  const currentTime = new Date()
  const targetTime = new Date(currentTime.getTime() + 24 * 60 * 60 * 1000) // Tambah 24 jam

  const options = {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    timeZone: 'Asia/Jakarta'
  }
  checkoutTime.value =
    targetTime.toLocaleDateString('id-ID', options) +
    ', ' +
    String(targetTime.getHours()).padStart(2, '0') +
    ':' +
    String(targetTime.getMinutes()).padStart(2, '0') +
    ' WIB'

  const interval = setInterval(() => {
    const now = new Date().getTime()
    const distance = targetTime - now

    if (distance <= 0) {
      clearInterval(interval)
      countdown.value = '00:00:00'
    } else {
      const hours = String(
        Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
      ).padStart(2, '0')
      const minutes = String(Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))).padStart(
        2,
        '0'
      )
      const seconds = String(Math.floor((distance % (1000 * 60)) / 1000)).padStart(2, '0')

      countdown.value = `${hours}:${minutes}:${seconds}`
    }
  })
}

const tickets = [
  { name: 'Tiket Masuk Keraton Kasepuhan Cirebon', quantity: 1, price: 10000, category: 'Umum' },
  { name: 'Tiket Peringatan Isra Mi\'raj di Langgar Alit', quantity: 2, price: 10000, category: 'Umum' },
]

const formatTotal = (index) => {
  const total = tickets[index].quantity * tickets[index].price
  return total.toLocaleString('id-ID')
}
const paymentPopup = ref(null)

const showPayment = () => {
  paymentPopup.value.showPaymentPopup()
}

onMounted(() => {
  isLoading.value = true
  setTimeout(() => {
    isLoading.value = false
    handleCheckout()
  }, 2000)
})
</script>

<template>
  <main>
    <div v-if="isLoading" class="waiting-payment__loader-overlay">
      <LoaderPayment />
    </div>
    <PaymentPopup ref="paymentPopup" />
    <div class="after-checkout__container">
      <div class="after-checkout-content__container">
        <div class="after-checkout-content__payment-countdown">
          <div class="after-checkout-content__payment-countdown-title">
            <p style="color: rgba(94, 94, 94, 1)">Batas Akhir Pembayaran</p>
            <span v-if="checkoutTime"><i class="ri-time-line"></i>{{ countdown }}</span>
            <span v-else><i class="ri-time-line"></i>00:00:00</span>
          </div>
          <div class="after-checkout-content__payment-countdown-sub">
            <span>{{ checkoutTime }}</span>
          </div>
        </div>
        <div class="after-checkout-content__payment-data">
          <div class="after-checkout-content__payment-title">
            <p class="fs-h4">BJB Virtual Account</p>
            <img :src="logoBJB" alt="logoBJB" />
          </div>
          <div class="after-checkout-content__payment-desc">
            <div class="after-checkout-content__payment fs-h5">
              <p style="color: rgba(94, 94, 94, 1)">Nomor Virtual Account</p>
              <p>8883xxxxxxxxxx</p>
            </div>
            <div class="after-checkout-content__payment fs-h5">
              <p style="color: rgba(94, 94, 94, 1)">Total Pembayaran</p>
              <p>Rp. <span>33.500</span></p>
            </div>
          </div>
        </div>
        <div class="after-checkout-content__payment-button">
          <button>Beli tiket lagi</button>
          <button @click="showPayment">Cara Pembayaran</button>
        </div>
      </div>
      <div class="after-checkout-detail__container">
        <p class="fs-h4">Detail Pembayaran</p>
        <div class="after-checkout-detail__payment-data">
          <div class="after-checkout-detail__payment-data-text">
            <p>Total Harga</p>
            <p>Biaya Layanan</p>
            <p>Biaya Jasa Aplikasi</p>
          </div>
          <div class="after-checkout-detail__payment-data-price">
            <span>Rp. 30.000</span>
            <span>Rp. 2.500</span>
            <span>Rp. 1.000</span>
          </div>
        </div>
        <div class="after-checkout-detail__payment-total">
          <div class="after-checkout-detail__payment-total-text">
            <p>Total Bayar</p>
            <p style="color: rgba(94, 94, 94, 1)">BJB Virtual Account</p>
          </div>
          <div class="after-checkout-detail__payment-total-price">
            <span class="fw-700">Rp. 33.500</span>
          </div>
        </div>
        <div class="after-checkout-detail__payment-ticket">
          <p class="fs-h4">Tiket yang dibeli</p>
          <div class="after-checkout-detail__payment-ticket-data-container">
            <div
              v-for="(ticket, index) in tickets"
              :key="index"
              class="after-checkout-detail__payment-ticket-data"
            >
              <div class="after-checkout-detail__payment-ticket-text">
                <p :style="'color: rgba(33, 33, 33, 1)'">
                  {{ ticket.name }} ({{ ticket.category }})
                </p>
                <p :style="'color: rgba(94, 94, 94, 1)'">
                  {{ ticket.quantity }} X Rp. {{ ticket.price }}
                </p>
              </div>
              <div class="after-checkout-detail__payment-ticket-price">
                <span>Rp. {{ formatTotal(index) }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<style scoped>
main {
  font-family: 'Raleway';
}
.waiting-payment__loader-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(6px);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 998;
}
.after-checkout__container {
  display: flex;
  align-items: flex-start;
  padding: 4rem;
  gap: 3.5rem;
}
.after-checkout-content__container,
.after-checkout-detail__container {
  width: 100%;
  display: flex;
  flex-direction: column;
}
.after-checkout-content__container {
  gap: 2.5rem;
}
.after-checkout-content__payment-countdown {
  display: flex;
  flex-direction: column;
  font-size: 24px;
  line-height: 32px;
}
.after-checkout-content__payment-countdown-title {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.after-checkout-content__payment-countdown-title i {
  font-size: 16px;
}
.after-checkout-content__payment-countdown-title span {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  background: rgba(227, 38, 38, 1);
  color: white;
  padding: 5px 10px;
  border-radius: 100px;
  height: 34px;
  font-weight: 700;
  font-size: 16px;
  line-height: 24px;
}
.after-checkout-content__payment-data {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
.after-checkout-content__payment-title {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.after-checkout-content__payment-title img {
  width: 58px;
  height: 28px;
}
.after-checkout-content__payment-desc {
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
}
.after-checkout-content__payment-button {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}
.after-checkout-content__payment-button button {
  font-size: 24px;
  line-height: 32px;
  font-weight: 700;
  padding: 0.75rem 0;
  border-radius: 0.75rem;
  text-align: center;
}
.after-checkout-content__payment-button button:first-child {
  background: rgba(18, 59, 50, 1);
  color: white;
}
.after-checkout-content__payment-button button:first-child:hover {
  filter: brightness(80%);
}
.after-checkout-content__payment-button button:last-child {
  background: transparent;
  border: 3px solid rgba(218, 165, 32, 1);
  color: rgba(218, 165, 32, 1);
}
.after-checkout-content__payment-button button:last-child:hover {
  background: rgba(218, 165, 32, 1);
  color: white;
}
.after-checkout-detail__payment-data,
.after-checkout-detail__payment-total,
.after-checkout-detail__payment-ticket {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px dashed rgba(94, 94, 94, 1);
  padding: 1rem 0;
  font-size: 24px;
  line-height: 32px;
}
.after-checkout-detail__payment-data-text,
.after-checkout-detail__payment-data-price {
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 0.5rem;
}
.after-checkout-detail__payment-data-text {
  color: rgba(94, 94, 94, 1);
}
.after-checkout-detail__payment-data-price {
  align-items: flex-end;
}
.after-checkout-detail__payment-total {
  align-items: flex-start;
}
.after-checkout-detail__payment-ticket {
  flex-direction: column;
  align-items: flex-start;
  border: none;
  padding: 2rem 0;
  gap: 0.5rem;
}
.after-checkout-detail__payment-ticket p {
  margin-bottom: 0.5rem;
}
.after-checkout-detail__payment-ticket-data-container {
  max-height: 25vh;
  padding-right: 1rem;
  overflow-y: scroll;
}
.after-checkout-detail__payment-ticket-data-container::-webkit-scrollbar {
  width: 4px;
}
.after-checkout-detail__payment-ticket-data-container::-webkit-scrollbar-track {
  background-color: lightgrey;
  border-radius: 2px;
}
.after-checkout-detail__payment-ticket-data-container::-webkit-scrollbar-thumb {
  border-radius: 2px;
  box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
}
.after-checkout-detail__payment-ticket-data {
  display: flex;
  justify-content: space-between;
}
.after-checkout-detail__payment-ticket-text {
  max-width: 70%;
}
</style>
