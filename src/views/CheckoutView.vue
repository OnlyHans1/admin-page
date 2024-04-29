<script setup>
import { onMounted, ref, defineProps } from 'vue'
import { useRouter } from 'vue-router'
import Slider from '@/components/Slider.vue'
import NationalityDropdown from '@/components/NationalityDropdown.vue'
import CheckoutHelper from '@/utilities/CheckoutHelper'
import DashboardHelper from '@/utilities/DashboardHelper'
import LoginHelper from '@/utilities/LoginHelper'
import AlertCard from '@/components/AlertCard.vue'
const route = useRouter()

const {
  getItemsFromSessionStorage,
  items,
  paymentSelection,
  paymentSelect,
  showPaymentSelect,
  selectPayment,
  addTicket,
  reduceTicket,
  selectedDate,
  discountValue,
  cashbackValue,
  biayaLayanan,
  biayaJasa,
  formatCurrency,
  totalHarga,
  totalTagihan,
  totalBiaya,
  totalTicketCount,
  createTransaction,
  selectedNationality,
  checkoutStatus
} = CheckoutHelper

const { checkSessionStorage, isMancanegara } = DashboardHelper
const { cashierData } = LoginHelper

const showAlert = ref(false)
const alertType = ref('')
const alertTitle = ref('')
const alertMessage = ref('')

const checkoutTransaction = async () => {
  const invalid = checkValidTransaction()
  if (totalTicketCount.value < 1) {
    showAlert.value = true
    alertTitle.value = 'Error'
    alertType.value = 'danger' // Set your alert type
    alertMessage.value = `Pilih tipe tiket terlebih dahulu`

    setTimeout(() => {
      showAlert.value = false
    }, 1200)
    return
  }
  if (invalid.length > 0) {
    showAlert.value = true
    alertTitle.value = 'Error'
    alertType.value = 'danger' // Set your alert type
    alertMessage.value = `Isi kolom ${invalid.join(', ')} terlebih dahulu.` // Set your alert message

    setTimeout(() => {
      showAlert.value = false
    }, 1200)
    return
  }

  try {
    await createTransaction()
    if (checkoutStatus.value === 'boleh') {
      sessionStorage.clear()
      setTimeout(() => {
        route.push('/')
      }, 3000)
    }
    checkoutStatus.value = ''
  } catch (error) {
    console.error('Gagal melakukan transaksi:', error)
    // Tampilkan pesan kesalahan atau lakukan tindakan yang sesuai jika transaksi gagal
  }
}

const checkValidTransaction = () => {
  const invalid = []

  if (isMancanegara.value) {
    if (!selectedNationality.value) {
      invalid.push('Kewarganegaraan')
    }
  }
  if (!selectedDate.value) {
    invalid.push(' Tanggal Pemesanan')
  }

  if (!paymentSelection.value) {
    invalid.push(' Metode Pembayaran')
  }

  // Pastikan semua input telah diisi sesuai dengan kondisi
  return invalid
}

onMounted(() => {
  getItemsFromSessionStorage()
  checkSessionStorage()
})
</script>

<template>
  <main>
    <AlertCard
      :showAlert="showAlert"
      :alertTitle="alertTitle"
      :alertType="alertType"
      :alertMessage="alertMessage"
    />
    <div class="checkout__container sm-sd-2">
      <div class="checkout__form-container">
        <div class="order-details__container">
          <form>
            <div class="order-details__checkout">
              <h4>Pemesanan Langsung</h4>
              <div class="order-details__customer">
                <div class="order-details__content">
                  <ph-user :size="24" weight="bold" class="header-icons" />
                  <p>Detail Pemesan</p>
                </div>
                <div class="order-details__content w-full">
                  <p class="fs-h5 fw-700">{{ cashierData.name }}</p>
                  <p>- ({{ cashierData.email }})</p>
                </div>
                <div class="order-details__dropdown" v-if="isMancanegara">
                  <NationalityDropdown />
                </div>
              </div>
              <div class="order-details__ticket">
                <div class="order-details__content">
                  <ph-ticket :size="24" weight="bold" class="header-icons" />
                  <p>Detail Tiket</p>
                </div>
                <div class="order-details__ticket-date">
                  <div class="ticket__input-placeholder">
                    <input
                      type="datetime-local"
                      class="ticket__input-date"
                      v-model="selectedDate"
                    />
                    <label>Tanggal Pemesanan</label>
                  </div>
                  <p>MM/DD/YYYY</p>
                </div>
                <div v-for="(item, index) in items" :key="index">
                  <div class="order-details__ticket" v-if="item.amount > 0">
                    <div class="order-details__ticket-items">
                      <p>{{ item.name }} ({{ item.category }})</p>
                      <span>{{ formatCurrency(item.price) }}</span>
                    </div>
                    <div class="order-details__ticket-value">
                      <button @click="reduceTicket(index)" type="button">
                        <ph-minus :size="14" weight="bold" />
                      </button>
                      <p>{{ item.amount }}</p>
                      <button @click="addTicket(index)" type="button">
                        <ph-plus :size="14" weight="bold" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div class="pricings-slider__container">
                <div class="discount__slider">
                  <p class="fw-500">Diskon</p>
                  <Slider v-model:targetValue="discountValue" />
                </div>
                <div class="discount__slider">
                  <p class="fw-500">Cashback</p>
                  <Slider v-model:targetValue="cashbackValue" />
                </div>
              </div>
              <div class="order-details__content">
                <ph-wallet :size="24" weight="bold" class="header-icons" />
                <p>Pilih Pembayaran</p>
              </div>
              <div class="order-details__payment-select" @click="showPaymentSelect">
                <div v-if="paymentSelection" class="order-details__payment-select-content if">
                  <div class="flex align-items-center gap[0.5]">
                    <ph-money :size="16" weight="bold" v-if="paymentSelection === 'Cash'" />
                    <ph-credit-card :size="16" weight="bold" v-else />
                    {{ paymentSelection }}
                  </div>
                </div>
                <div v-else class="order-details__payment-select-content else">
                  <ph-warning-octagon :size="16" weight="fill" color="red" />
                  <p>Anda belum memilih metode pembayaran</p>
                </div>
                <ph-caret-right :size="16" weight="bold" />
              </div>

              <section
                class="order-details__payment-select-content_modal-overlay"
                v-if="paymentSelect"
              >
                <div class="order-details__payment-select-content_modal">
                  <div
                    class="order-details__payment-select-content_modal-header pd-1 flex justify-content-sb align-items-center"
                  >
                    <h3 class="fw-600">Pilih Metode Pembayaran</h3>
                    <ph-x :size="20" weight="bold" @click="showPaymentSelect" />
                  </div>
                  <div
                    class="order-details__payment-select-content_modal-content pd-bottom-2 pd-sd-1 pd-top-1"
                  >
                    <button @click="selectPayment('Cash')">
                      <span><ph-money :size="16" weight="bold" />Cash</span>
                      <ph-caret-right :size="16" weight="bold" />
                    </button>
                    <button @click="selectPayment('Kartu Kredit/Debit')">
                      <span><ph-credit-card :size="16" weight="bold" />Kartu Kredit/Debit</span>
                      <ph-caret-right :size="16" weight="bold" />
                    </button>
                  </div>
                </div>
              </section>
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
              <div v-if="items.length > 1" v-for="(item, index) in items" :key="index">
                <div class="checkout__details-pricing" v-if="item.amount > 0">
                  <p>{{ item.name }} ({{ item.category }}) x {{ item.amount }}</p>
                  <p>{{ formatCurrency(item.price * item.amount) }}</p>
                </div>
              </div>
              <div class="checkout__details-pricing">
                <p v-if="items.length > 1">Total Tiket ({{ totalTicketCount }} Tiket)</p>
                <p v-else>Jumlah Tiket ({{ totalTicketCount }} Tiket)</p>
                <p>{{ formatCurrency(totalHarga) }}</p>
              </div>
            </div>
            <div class="checkout__details-pricing-container">
              <p class="fw-700 fs-h6">Biaya Transaksi</p>
              <div class="checkout__details-pricing">
                <p>Biaya Layanan</p>
                <p>{{ formatCurrency(biayaLayanan) }}</p>
              </div>
              <div class="checkout__details-pricing">
                <p>Biaya Jasa Aplikasi</p>
                <p>{{ formatCurrency(biayaJasa) }}</p>
              </div>
            </div>
            <div
              class="checkout__details-pricing-container"
              v-if="discountValue > 0 || cashbackValue > 0"
            >
              <p class="fw-700 fs-h6">Potongan Harga</p>
              <div class="checkout__details-pricing" v-if="discountValue > 0">
                <p>Diskon</p>
                <p>
                  {{ formatCurrency((totalHarga * discountValue) / 100) }} ({{ discountValue }}%)
                </p>
              </div>
              <div class="checkout__details-pricing" v-if="cashbackValue > 0">
                <p>Cashback</p>
                <p>
                  {{ formatCurrency((totalTagihan * cashbackValue) / 100) }} ({{ cashbackValue }})%
                </p>
              </div>
            </div>
            <div class="checkout__details-total flex fd-row align-items-center justify-content-sb">
              <p class="fw-700 fs-h5">Total Tagihan</p>
              <div class="checkout__details-total--final flex fd-col align-items-f-end">
                <p
                  class="fw-700 fs-h6"
                  :class="{
                    'checkout__details-total--strikethrough': discountValue > 0
                  }"
                >
                  {{ formatCurrency(totalBiaya) }}
                </p>
                <p class="fw-700 fs-h6" v-if="discountValue > 0">
                  {{ formatCurrency(totalTagihan) }}
                </p>
              </div>
            </div>
          </form>
        </div>
        <div class="checkout-btn">
          <button type="submit" class="checkout__btn-order" @click="checkoutTransaction()">
            Checkout
            <ph-arrow-circle-right :size="20" weight="fill" />
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
  align-items: flex-start;
  gap: 3rem;
}

.checkout__form-container {
  width: 100%;
}

.header-icons {
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

.order-details__payment-select {
  width: 522px;
  height: 50px;
  border-radius: 0.6rem;
  padding: 0.8rem 1.25rem;
  background: white;
  box-shadow: 0 2px 6px 0px rgba(0, 0, 0, 0.25);
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
}

.order-details__payment-select-content {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 14px;
  line-height: 22px;
}

.order-details__payment-select-content_modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100dvh;
  background-color: rgb(0, 0, 0, 0.2);
  z-index: 999;
}

.order-details__payment-select-content_modal {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 30%;
  z-index: 100;
  background-color: rgb(245, 245, 245);
  border-radius: 0.5rem;
  box-shadow: 0px 2px 2px 0 rgb(0, 0, 0, 0.2);
}

.order-details__payment-select-content_modal-header i {
  cursor: pointer;
}

.order-details__payment-select-content_modal-content {
  border-top: 1px solid black;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.order-details__payment-select-content_modal-content button {
  display: flex;
  gap: 0.5rem;
  height: 2.5rem;
  align-items: center;
  justify-content: space-between;
  border: 0;
  background-color: inherit;
  border-bottom: 1px solid grey;
}

.order-details__payment-select-content_modal-content button span {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.order-details__payment-select-content.else i {
  font-size: 16px;
  color: rgba(227, 38, 38, 1);
}

.checkout__details-container {
  position: sticky;
  top: 5rem;
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
  padding: 0.25rem 0;
}

.checkout__details-pricing:last-child {
  padding-top: 0.5rem;
}

.checkout__details-total {
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

.checkout__details-total--strikethrough {
  font-size: 16px;
  line-height: 24px;
  font-weight: 500;
  text-decoration: line-through;
}
</style>
