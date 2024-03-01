<script setup>
import { ref } from 'vue'
import LoaderPayment from './LoaderPayment.vue'
import PaymentDropdown from './PaymentDropdown.vue'
import logoBJB from '@/assets/images/logoBJB.png'

const isLoading = ref(false)
const showPopup = ref(false)

const showPaymentPopup = () => {
  isLoading.value = true
  setTimeout(() => {
    isLoading.value = false
    showPopup.value = true
  }, 2000)
}

const closePopup = () => {
  showPopup.value = false
}

defineExpose({
  showPaymentPopup
})
</script>

<template>
  <main>
    <div class="waiting-payment__container">
      <div v-if="isLoading" class="waiting-payment__loader-overlay">
        <LoaderPayment />
      </div>
      <div v-if="showPopup" class="waiting-payment__content-overlay">
        <div class="waiting-payment__container-content">
          <div class="waiting-payment__content-header">
            <p class="fs-h5 fw-700">Cara Pembayaran</p>
            <span @click="closePopup" class="waiting-payment__close-button">
              <i class="ri-close-line"></i>
            </span>
          </div>
          <div class="waiting-payment__content-data">
            <div class="waiting-payment__content-desc">
              <p class="fs-h4">BJB Virtual Account</p>
              <img :src="logoBJB" alt="logoBJB" />
            </div>
            <div class="waiting-payment__content-desc">
              <div class="waiting-payment__content-sub fs-h5">
                <p style="color: rgba(94, 94, 94, 1)">Nomor Virtual Account</p>
                <p>8883xxxxxxxxxx</p>
              </div>
              <span class="waiting-payment__copy-desc">Salin <i class="ri-clipboard-line"></i></span>
            </div>
            <div class="waiting-payment__content-desc">
              <div class="waiting-payment__content-sub fs-h5">
                <p style="color: rgba(94, 94, 94, 1)">Total Pembayaran</p>
                <p>Rp. <span>33.500</span></p>
              </div>
              <span class="waiting-payment__copy-desc">Salin <i class="ri-clipboard-line"></i></span>
            </div>
            <div>
              <PaymentDropdown />
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
.waiting-payment__content-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 999;
}
.waiting-payment__container-content {
  position: relative;
  background-color: white;
  border-radius: 10px;
  width: 671px;
  height: 512px;
  display: flex;
  flex-direction: column;
}
.waiting-payment__content-header {
  display: flex;
  flex-direction: row;
  height: 73px;
  padding: 1.5rem 3rem;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid rgba(208, 213, 221, 1);
}
.waiting-payment__close-button {
  font-size: 32px;
  color: rgba(52, 51, 48, 1);
}
.waiting-payment__close-button:hover {
  opacity: 0.5;
}
.waiting-payment__content-data {
  display: flex;
  flex-direction: column;
  padding: 2rem 3rem;
  gap: 1rem;
  overflow-y: auto;
}
.waiting-payment__content-desc {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}
.waiting-payment__content-desc img {
  width: 58px;
  height: 28px;
}
.waiting-payment__copy-desc {
  color: rgba(218, 165, 32, 1);
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 0.5rem;
  font-size: 16px;
  font-weight: 700;
  line-height: 24px;
}
.waiting-payment__copy-desc i {
  font-size: 32px;
}
.waiting-payment__copy-desc:hover {
  filter: brightness(70%);
}
.waiting-payment__content-sub {
  display: flex;
  flex-direction: column;
}
</style>
