import tempCheckoutData from '@/data/tempCheckoutData';

import { ref, computed } from 'vue'

const { 
  getItemsFromLocalStorage,
  itemsFromLocalStorage 
} = tempCheckoutData

const items = ref(itemsFromLocalStorage)

const paymentSelection = ref('')
const paymentSelect = ref(false);
const showPaymentSelect = () => {
  paymentSelect.value = !paymentSelect.value
}
const selectPayment = (paymentMethod) => {
  paymentSelection.value = paymentMethod;
  paymentSelect.value = false
}

const isMancanegara = true

function addTicket(index) {
  items.value[index].quantity++
}

function reduceTicket(index) {
  if (items.value[index].quantity > 1) {
    items.value[index].quantity--
  }
}

const selectedDate = ref(null)
const discountValue = ref(null)

const biayaLayanan = ref(2500)
const biayaJasa = ref(1000)
const formatCurrency = (amount) => {
  return amount.toLocaleString('id-ID')
}

const ticketsPrice = (index) => {
  const total = items.value[index].price
  return total.toLocaleString('id-ID')
}
const totalHarga = computed(() => {
  let total = 0
  for (const ticket of items.value) {
    total += ticket.price * ticket.quantity
  }
  return total * (1 - (discountValue.value || 0) / 100)
})
const formattedTotalHarga = computed(() => {
  return totalHarga.value.toLocaleString('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  })
})

const totalTagihan = computed(() => {
  return totalHarga.value + biayaLayanan.value + biayaJasa.value
})
const formattedTotalTagihan = computed(() => {
  return totalTagihan.value.toLocaleString('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  })
})

const totalTicketCount = computed(() => {
  let totalCount = 0
  for (const ticket of items.value) {
    totalCount += ticket.quantity
  }
  return totalCount
});

export default {
    getItemsFromLocalStorage,
    itemsFromLocalStorage,
    items,
    paymentSelection,
    paymentSelect,
    showPaymentSelect,
    selectPayment,
    isMancanegara,
    addTicket,
    reduceTicket,
    selectedDate,
    discountValue,
    biayaLayanan,
    biayaJasa,
    formatCurrency,
    ticketsPrice,
    totalHarga,
    formattedTotalHarga,
    totalTagihan,
    formattedTotalTagihan,
    totalTicketCount,
}