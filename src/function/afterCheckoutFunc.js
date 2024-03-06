import { ref, computed } from 'vue'
import afterCheckoutData from '@/data/afterCheckoutData'

const { tickets } = afterCheckoutData

const checkoutTime = ref('')
const countdown = ref('')
const isLoading = ref(false)
const serviceFee = ref(2500)
const applicationFee = ref(1000)

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
const formatCurrency = (amount) => {
  return amount.toLocaleString('id-ID')
}
const ticketsPrice = (index) => {
  const total = tickets.value[index].price
  return total.toLocaleString('id-ID')
}
const ticketsTotal = (index) => {
  const total = tickets.value[index].quantity * tickets.value[index].price
  return total.toLocaleString('id-ID')
}
const totalPrice = computed(() => {
  let totalPrice = 0
  for (let i = 0; i < tickets.value.length; i++) {
    totalPrice += tickets.value[i].quantity * tickets.value[i].price
  }
  return {
    totalPriceStr: totalPrice.toLocaleString('id-ID'),
    totalPriceInt: totalPrice
  }
})
const totalPayment = computed(() => {
  let totalPayment = totalPrice.value.totalPriceInt + serviceFee.value + applicationFee.value
  return totalPayment.toLocaleString('id-ID')
})
const paymentPopup = ref(null)
const showPayment = () => {
  paymentPopup.value.showPaymentPopup()
}
const getTickets = () => {
  return tickets
}

export default {
  checkoutTime,
  countdown,
  isLoading,
  serviceFee,
  applicationFee,
  handleCheckout,
  formatCurrency,
  ticketsPrice,
  ticketsTotal,
  totalPrice,
  totalPayment,
  paymentPopup,
  showPayment,
  getTickets
}
