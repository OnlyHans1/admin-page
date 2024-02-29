<script setup>
import { ref } from 'vue'

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
  <div>
    <div v-if="isLoading" class="waiting-payment__loader-overlay">
      <div class="waiting-payment__loading-container gap-1">
        <div class="waiting-payment__loader">
          <div class="waiting-payment__ball waiting-payment__ball-1"></div>
          <div class="waiting-payment__ball waiting-payment__ball-2"></div>
          <div class="waiting-payment__ball waiting-payment__ball-3"></div>
        </div>
        <div class="waiting-payment__loading-content">
          <p class="waiting-payment__loading-text">
            Hampir selesai<span class="waiting-payment__loading-dots"></span>
          </p>
          <p class="waiting-payment__loading-message">Pembayaranmu sedang diproses</p>
        </div>
      </div>
    </div>
    <div v-if="showPopup" class="waiting-payment__payment-popup">
      <button @click="closePopup" class="waiting-payment__close-button">X</button>
      <div class="waiting-payment__payment-content">
        <h2>Detail Pembayaran</h2>
        <p>Total pembayaran: Rp 100.000</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.waiting-payment__loader-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.8);
  z-index: 9999;
  display: flex;
  justify-content: center;
  align-items: center;
}
.waiting-payment__loading-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.waiting-payment__loading-content {
  text-align: center;
  margin-bottom: 20px;
}
.waiting-payment__loading-text {
  font-size: 40px;
  line-height: 48px;
  font-family: 'Raleway', sans-serif;
}
.waiting-payment__loading-dots::after {
  content: '.';
  animation: loadingDots 1.5s infinite;
}
@keyframes loadingDots {
  0% {
    content: '.';
  }
  33% {
    content: '..';
  }
  66% {
    content: '...';
  }
}
.waiting-payment__loader {
  display: flex;
}
.waiting-payment__ball {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  margin: 0 5px;
  animation: bounce 0.5s infinite alternate;
}
.waiting-payment__ball-1 {
  background-color: rgba(18, 59, 50, 1);
  animation-delay: 0s;
}
.waiting-payment__ball-2 {
  background-color: rgba(217, 165, 32, 1);
  animation-delay: 0.2s;
}
.waiting-payment__ball-3 {
  background-color: rgba(250, 224, 132, 1);
  animation-delay: 0.4s;
}
@keyframes bounce {
  to {
    transform: translateY(-20px);
  }
}
.waiting-payment__payment-popup {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  padding: 20px;
  border: 1px solid #ccc;
  z-index: 10000;
}
.waiting-payment__close-button {
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
}
.waiting-payment__payment-content {
  text-align: center;
}
</style>
