<script setup>
import { ref } from 'vue'
import logoBJB from '@/assets/images/logoBJB.png'

const checkoutTime = ref('')
const countdown = ref('')

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
</script>

<template>
  <main>
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
            <div class="after-checkout-content__payment-sub fs-h5">
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
          <button>Cara Pembayaran</button>
        </div>
      </div>
      <div class="after-checkout-detail__container">
        Detail Pembayaran
        <button @click="handleCheckout">Checkout</button>
      </div>
    </div>
  </main>
</template>

<style scoped>
main {
  font-family: 'Raleway';
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
</style>
