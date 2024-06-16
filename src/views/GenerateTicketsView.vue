<script setup>
import { onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import GlobalHelper from '@/utilities/GlobalHelper'
import CheckoutHelper from '@/utilities/CheckoutHelper'
import DashboardHelper from '@/utilities/DashboardHelper'
import LoginHelper from '@/utilities/LoginHelper'

const { DB_BASE_URL, TRANSACTION_BASE_URL, showLoader, getImageURL } = GlobalHelper
const { ticketsData, emailCooldown, sendEmailToUser, printTickets } = CheckoutHelper

const router = useRouter()
const route = useRoute()

const formatCurrency = (amount) => {
  return Number(amount).toLocaleString('id-ID')
}
const calculateTotal = (price, amount) => {
  return formatCurrency(price * amount)
}
const toHomepage = async () => {
  LoginHelper.userCarts.value = []
  await DashboardHelper.saveToUserCarts()
  await router.replace('/')
}

const fetchTickets = async (id) => {
  try {
    showLoader.value = true
    const response = await fetch(
      `${DB_BASE_URL.value}/${TRANSACTION_BASE_URL.value}/generate-tickets/${encodeURIComponent(id)}`
    )
    if (!response.ok) {
      showLoader.value = false
      throw new Error('Failed to fetch data')
    }
    const res = await response.json()
    ticketsData.value = res.data
    showLoader.value = false
  } catch (error) {
    console.error('Error fetching data:', error)
  }
}

onMounted(() => {
  fetchTickets(route.params.id)
})
</script>

<template>
  <div class="generate-tickets__container flex fd-col h-full">
    <div class="generate-tickets__header flex align-items-center pd-1">
      <h3 class="fw-600">Generate Tickets</h3>
    </div>
    <div class="generate-tickets__content pd-sd-2 pd-block-1">
      <div class="preview flex fd-col gap-1 pd-1">
        <h5>Pratinjau</h5>
        <div
          v-for="(ticket, index) in ticketsData.detailTrans"
          :key="index"
          class="generate-tickets__detail-transaction flex justify-content-sb"
        >
          <div class="flex gap-1">
            <img
              :src="
                ticket.order.image
                  ? getImageURL(ticket.order.image)
                  : 'https://www.signfix.com.au/wp-content/uploads/2017/09/placeholder-600x400.png'
              "
              class="generate-tickets__detail-transaction-image"
            />
            <div class="flex fd-col">
              <p class="fw-600">{{ `${ticket.order.name} (${ticket.order.category.name})` }}</p>
              <p>{{ `${formatCurrency(ticket.order.price)} x ${ticket.amount} Tiket` }}</p>
              <p>Rp {{ calculateTotal(ticket.order.price, ticket.amount) }}</p>
            </div>
          </div>
          <!-- <div class="generate-tickets__detail-transaction-cta flex align-items-center">
              <button class="generate-tickets__detail-transaction-btn flex align-items-center">
                <ph-plus :size="16" weight="bold" />
              </button>
            </div> -->
        </div>
      </div>
    </div>
    <div
      class="generate-tickets__cta-container flex align-items-center justify-content-center gap-1"
    >
      <button
        class="generate-tickets__btn-print flex align-items-center gap[0.5]"
        @click="printTickets"
      >
        <p class="fw-700">Print Tickets</p>
        <ph-printer :size="32" />
      </button>
      <button class="generate-tickets__btn-email">
        <div
          v-if="!emailCooldown"
          @click="sendEmailToUser()"
          class="flex align-items-center gap[0.5]"
        >
          <p class="fw-700">Kirim ke Email</p>
          <ph-paper-plane-tilt :size="32" />
        </div>
        <div v-else>
          <p class="fw-700">Mengirim Email<span class="send-email__text-cooldown"></span></p>
        </div>
      </button>
    </div>
    <button
      class="generate-tickets__return-btn flex align-self-center align-items-center justify-content-center gap[0.5] sm-top-2"
      @click="toHomepage"
    >
      <ph-caret-left :size="16" weight="bold" />
      <p>Kembali ke Dashboard</p>
    </button>
  </div>
</template>

<style scoped>
.generate-tickets__return-btn {
  background-color: var(--color-primary);
  width: fit-content;
  padding: 0.5rem;
  border-radius: 0.5rem;
}

.generate-tickets__header {
  border-bottom: 1px solid black;
}

.generate-tickets__detail-transaction {
  padding: 1rem;
  border-radius: 0.5rem;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.generate-tickets__detail-transaction-image {
  height: 70px;
  width: 100px;
}

.generate-tickets__detail-transaction-btn {
  padding: 0.5rem;
  background-color: var(--color-primary);
  border-radius: 0.25rem;
}

.generate-tickets__btn-print,
.generate-tickets__btn-email {
  min-width: 12rem;
  height: 5rem;
  border: 2px solid #e6be58;
  padding: 1rem 2rem;
  font-size: 1rem;
  cursor: pointer;
  border-radius: 5px;
  transition: background-color 0.3s ease;
}

.generate-tickets__btn-print:hover,
.generate-tickets__btn-email:hover {
  border-color: #ffdd8f;
}

.send-email__text-cooldown::after {
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

.send-email-overview__modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 999;
}
</style>
