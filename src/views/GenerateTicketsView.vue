<script setup>
import { onMounted, ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import GlobalHelper from '@/utilities/GlobalHelper'

const { DB_BASE_URL, DETAILTRANS_BASE_URL, showLoader } = GlobalHelper

const router = useRouter()
const route = useRoute()

const sendEmail = ref(false)
const targetEmail = ref('')
const ticketsData = ref([])

const showPopupEmail = () => {
  sendEmail.value = true
}
const closePopupEmail = () => {
  sendEmail.value = false
}
const formatCurrency = (amount) => {
  return Number(amount).toLocaleString('id-ID')
}
const calculateTotal = (price, amount) => {
  return formatCurrency(price * amount)
}
const getImageURL = (imageName) => {
  return `${DB_BASE_URL.value}/uploads/${imageName}`
}
const fetchTickets = async (id) => {
  try {
    showLoader.value = true
    const response = await fetch(
      `${DB_BASE_URL.value}/${DETAILTRANS_BASE_URL.value}/generate-tickets/${encodeURIComponent(id)}`
    )
    if (!response.ok) {
      showLoader.value = false
      throw new Error('Failed to fetch data')
    }
    const res = await response.json()
    ticketsData.value = res.data
    console.log(ticketsData.value)
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
        <h5>Preview</h5>
        <div
          v-for="(ticket, index) in ticketsData"
          :key="index"
          class="generate-tickets__detail-transaction flex justify-content-sb sm-bottom-1"
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
      <button class="generate-tickets__btn-print">
        Print Tickets
        <ph-printer :size="32" />
      </button>
      <button class="generate-tickets__btn-email" @click="showPopupEmail">
        Send to Email
        <ph-paper-plane-tilt :size="32" />
      </button>
    </div>
    <button
      class="generate-tickets__return-btn flex align-self-center align-items-center justify-content-center gap[0.5] sm-top-4"
      @click="router.replace('/')"
    >
      <ph-caret-left :size="16" weight="bold" />
      <p>Return to Homepage</p>
    </button>

    <section>
      <div
        class="send-email-overview__modal w-full h-full flex align-items-center justify-content-center"
        v-if="sendEmail"
      >
        <div class="send-email-overview__container">
          <div class="send-email-overview__header">
            <p class="fw-700 fs-h6">Send Email</p>
            <ph-x :size="20" weight="bold" @click="closePopupEmail" />
          </div>
          <div class="send-email-overview__content flex fd-col gap-1 sm-top-1">
            <input
              class="send-email-overview__input"
              type="email"
              v-model="targetEmail"
              placeholder="Masukkan alamat email"
            />
            <button class="send-email-overview__send-btn">Kirim</button>
          </div>
        </div>
      </div>
    </section>
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
  max-height: 70px;
  max-width: 100px;
}

.generate-tickets__detail-transaction-btn {
  padding: 0.5rem;
  background-color: var(--color-primary);
  border-radius: 0.25rem;
}

.generate-tickets__btn-print {
  width: 10rem;
  border: 2px solid #e6be58;
  padding: 1rem 2rem;
  font-size: 1rem;
  cursor: pointer;
  border-radius: 5px;
  transition: background-color 0.3s ease;
  font-weight: 700;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}

.generate-tickets__btn-print:hover {
  border-color: #ffdd8f;
}

.generate-tickets__btn-email {
  width: 10rem;
  border: 2px solid #e6be58;
  padding: 1rem 2rem;
  font-size: 1rem;
  cursor: pointer;
  border-radius: 5px;
  transition: background-color 0.3s ease;
  font-weight: 700;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}

.generate-tickets__btn-email:hover {
  border-color: #ffdd8f;
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

.send-email-overview__container {
  background: white;
  border-radius: 10px;
  width: 30rem;
  font-family: 'Raleway';
  display: flex;
  flex-direction: column;
  height: 250px;
  max-height: 80vh;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
}

.send-email-overview__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 0 0.5rem 1rem;
  border-bottom: 1px solid;
}

.send-email-overview__content {
  width: 80%;
}

.send-email-overview__input {
  height: 50px;
  padding: 0.5rem;
  font-size: 1rem;
  border-radius: 10px;
  border: 1px solid #ccc;
}

.send-email-overview__send-btn {
  width: 40%;
  padding: 0.5rem 1rem;
  font-size: 1rem;
  border: none;
  background-color: #ddab2e;
  color: white;
  cursor: pointer;
  border-radius: 5px;
  transition: background-color 0.3s ease;
  align-self: center;
}

.send-email-overview__send-btn:hover {
  background-color: #c48f13;
}
</style>