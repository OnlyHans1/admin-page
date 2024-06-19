<script setup>
import { onMounted, ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import GlobalHelper from '@/utilities/GlobalHelper'
import CheckoutHelper from '@/utilities/CheckoutHelper'
import DashboardHelper from '@/utilities/DashboardHelper'
import LoginHelper from '@/utilities/LoginHelper'
import html2pdf from 'html2pdf.js'

const { DB_BASE_URL, TRANSACTION_BASE_URL, showLoader, getImageURL } = GlobalHelper
const { ticketsData, emailCooldown, sendEmailToUser } = CheckoutHelper

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

const printTickets = async () => {
  generatePDF()
}

onMounted(() => {
  fetchTickets(route.params.id)
})
</script>

<template>
  <div ref="templateToPrint" style="display: none">
    <!-- QR: ticketsData.value.BarcodeUsage[0].qrPath

    v-for="(trans, i) in ticketsData.value.detailTrans" :key="i"
    Name: trans.order ? trans.order.name || "Event" -->
  </div>
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
        </div>
      </div>
    </div>
    <div>
      <div ref="dataRef">
        <div class="ticket">
          <div style="display: flex; white-space: nowrap; flex-wrap: nowrap; width: 100%">
            <div v-for="(ticket, index) in ticketsData.detailTrans" :key="index" class="tickets-container" >
              <div v-for="ticketAmount in ticket.amount" :key="ticketAmount">
                <section class="ticket" >
                  <div class="ticket-main_container">
                    <img
                      src="../assets/images/bg-keraton.png"
                      class="bg-tiket"
                      alt="Background Keraton"
                    />
                    <div class="ticket-padding">
                      <div class="ticket-content">
                        <div class="ticket-main_header">
                          <p>Tiket Masuk / Entry Pass {{ ticketAmount }}</p>
                        </div>
                        <div class="ticket-main_content">
                          <div class="ticket-logo">
                            <img src="../assets/images/logo.png" alt="Keraton Kasepuhan Cirebon" />
                          </div>
                          <h6 class="ticket_title">KERATON KASEPUHAN CIREBON</h6>
                          <div class="ticket-qr">
                            <img
                              src="../assets/images/testqr.jpg"
                              alt="Keraton Kasepuhan Cirebon"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="triangle-divider triangle-polygon1"></div>
                  <div class="triangle-divider triangle-polygon2"></div>
                  <div class="triangle-divider2 triangle-polygon1"></div>
                  <div class="triangle-divider2 triangle-polygon2"></div>
                  <div class="line-divider"></div>
                  <div class="ticket-name_container">
                    <img src="../assets/images/bg-decor.png" alt="" class="Decor1" />
                    <img src="../assets/images/bg-decor.png" alt="" class="Decor1" />
                    <div class="ticket-name_content">
                      <div
                        style="
                          display: flex;
                          justify-content: space-around;
                          width: 60%;
                          margin-bottom: 10px;
                        "
                      >
                        <img src="../assets/images/logo.png" alt="" class="logo-name" />
                        <span>wisata</span>
                      </div>
                      <h3
                        class="ticket-name_title"
                        :class="{ 'long-text': ticket.order.name.length > 20 }"
                        style="line-height: 0.95; font-size: 18px"
                      >
                        {{ ticket.order.name }}
                      </h3>
                    </div>
                  </div>
                </section>
                <div class="only-pdf"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div
      class="generate-tickets__cta-container flex align-items-center justify-content-center gap-1"
    >
      <button
        class="generate-tickets__btn-print flex align-items-center gap[0.5]"
        @click="generatePDF"
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

<script>
import html2pdf from 'html2pdf.js'
export default {
  data() {
    return {
      tiketDatas: ref([])
    }
  },
  methods: {
    generatePDF() {
      const element = this.$refs.dataRef

      if (element) {
        html2pdf(element, {
          margin: 2,
          filename: `Report ${new Date().toISOString().split('T')[0]}.pdf`,
          image: { type: 'jpeg', quality: 0.98 },
          html2canvas: { scale: 2 },
          jsPDF: {
            unit: 'mm',
            format: 'a4',
            orientation: 'landscape',
            putOnlyUsedFonts: true,
            scale: 0.8
          }
        })
          .outputPdf()
          .get('pdf')
          .then((pdfObj) => {
            pdfObj.autoPrint()
            window.open(pdfObj.output('bloburl'))
          })
      } else {
        console.error('Element not found or not yet rendered')
      }
    }
  }
}
</script>

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

/* desain */
.bold {
  font-weight: 600;
}

h6,
p {
  padding: 0;
  margin: 0;
}

h6,
h3 {
  font-family: 'Times New Roman', Times, serif;
}

h6 {
  font-size: 14px;
  color: #dfb032;
}

.ticket-padding {
  padding: 1rem;
  height: 100%;
  width: 100%;
  /* position: absolute;
      z-index: 10;
      top: 0;
      left: 0; */
}

.ticket {
  display: flex;
  min-width: fit-content;
  width: fit-content;
  height: 150px;
  border-radius: 0.5rem;
  overflow: hidden;
  position: relative;
}

.ticket_title {
  width: 200px;
}

.ticket span {
  font-family: 'Times New Roman', Times, serif;
}

.ticket-main_container {
  position: relative;
  width: 70%;
  height: 100%;
}

img.bg-tiket {
  width: 100%;
  height: 100%;
  object-fit: cover;
  position: absolute;
  top: 0;
  left: 0;
  background-color: #ffedbc;
  opacity: 80%;
  filter: sepia(0.5) hue-rotate(10deg) brightness(1.2) contrast(-36);
  z-index: 1;
}

.image-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: #eed284bd;
  z-index: 5;
}

.ticket-content {
  position: relative;
  width: 100%;
  z-index: 1;
  display: flex;
  flex-direction: column;
  height: fit-content;
  gap: 0.1rem;
  padding: 13px;
  color: #000000;
  border-radius: 0.5rem;
  background-color: #f0f0f0eb;
}

.ticket-main_header p {
  font-size: 18px;
  border-bottom: 1px solid #000;
  padding: 0;
  padding-bottom: 0.5rem;
  margin: 0;
  font-family: 'Times New Roman', Times, serif;
}

.ticket-main_content {
  display: flex;
  align-items: center;
}

.ticket-logo img {
  width: 40px;
  height: 40px;
}

.ticket-qr img {
  width: 45px;
  height: 45px;
  object-fit: contain;
}

.triangle-divider {
  position: absolute;
  left: 575px;
  width: 0;
  height: 0;
  border-left: 10px solid transparent;
  border-right: 10px solid transparent;
  border-top: 10px solid #ffffff;
  z-index: 10;
}

.triangle-divider2 {
  position: absolute;
  left: 335px;
  width: 0;
  height: 0;
  border-left: 5px solid transparent;
  border-right: 5px solid transparent;
  border-top: 8px solid #ffffff;
  z-index: 10;
}

.triangle-polygon1 {
  top: 0;
}

.triangle-polygon2 {
  bottom: 0;
  transform: rotate(180deg);
}

.line-divider {
  border: 1px dashed #000;
  height: 100%;
  width: 1px;
  margin-top: 0rem;
}

.ticket-name_container {
  width: 130px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100%;
  align-items: center;
  border-left: 1px solid #ccc;
  background-color: #e7c66e;
  position: relative;
  border-top-right-radius: 0.5rem;
  border-bottom-right-radius: 0.5rem;
}

.ticket-name_content {
  position: relative;
  transform: rotate(270deg);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 7rem;
  height: 80%;
  border: 1px solid #000;
  border-radius: 0.3rem;
}

img.logo-name {
  width: 25px;
  height: 25px;
  top: 10px;
  left: 10px;
}

.ticket-name_container span {
  font-size: 1rem;
  color: #000000c7;
}

.ticket-name_container h5 {
  font-size: 1rem;
  color: #6b4226;
  text-transform: uppercase;
  margin: 0;
  text-align: center;
}

.ticket-name_container h3.long-text {
  font-size: 18px;
  white-space: normal;
  padding-inline: 10px;
}

img.Decor1 {
  position: absolute;
  height: 100%;
  width: 100%;
  object-fit: cover;
  mix-blend-mode: multiply;
  opacity: 100%;
}

.Decor1:nth-child(1) {
  bottom: 0;
  right: 0;
  border-bottom-right-radius: 0.8rem;
  width: 100%;
}

.Decor1:nth-child(2) {
  top: 0;
  left: 0;
  transform: rotate(180deg);
  width: 100%;
  border-bottom-right-radius: 1rem;
  border-bottom-left-radius: 2rem;
}

.only-pdf {
  display: none;
}

@media print {
  .only-pdf {
    page-break-after: always;
    display: block !important;
  }
}
</style>
