import { ref, computed } from 'vue'
import tempCheckoutData from '@/data/tempCheckoutData'

/* NationalityDropdown Helper */
const nationalityData = ref([])

const selectedNationality = ref()

const fetchNationalityData = async () => {
  try {
    const response = await fetch('http://localhost:3000/checkout/nationality-list')
    if (!response.ok) {
      throw new Error('Failed to fetch data')
    }
    const data = await response.json()
    nationalityData.value = data
  } catch (error) {
    console.error('Error fetching data:', error)
  }
}

const nationalityQuery = ref('')
const nationalityResult = ref([])
const isNationalityDropdownOpen = ref(false)
const showFlag = ref(false)
const selectedFlagImageUrl = ref('')

const loadNationalityData = () => {
  if (nationalityQuery.value.trim() !== '') {
    isNationalityDropdownOpen.value = true

    const filteredData = nationalityData.value.filter((nationality) => {
      return nationality.name.toLowerCase().includes(nationalityQuery.value.trim().toLowerCase())
    })
    nationalityResult.value = filteredData
    isNationalityDropdownOpen.value = nationalityResult.value.length > 0
  } else {
    nationalityResult.value = []
    isNationalityDropdownOpen.value = false
  }
}
const openNationalityDropdown = () => {
  if (nationalityQuery.value.trim() === '') {
    isNationalityDropdownOpen.value = true
    nationalityResult.value = nationalityData.value
  } else {
    isNationalityDropdownOpen.value = true
    loadNationalityData()
  }
}
const closeNationalityDropdown = () => {
  isNationalityDropdownOpen.value = false
  nationalityResult.value = []
}
const getFlagImageUrl = (countryCode) => {
  const flagCode = countryCode

  return `https://flagcdn.com/48x36/${flagCode}.png`
}
const getNationality = (nationalityId, nationalityName, countryCode) => {
  nationalityQuery.value = nationalityName
  nationalityResult.value = []
  isNationalityDropdownOpen.value = false
  showFlag.value = true

  // Dapatkan URL gambar bendera menggunakan kode negara
  const flagImageUrl = getFlagImageUrl(countryCode)

  // Setel URL gambar bendera ke dalam selectedFlagImageUrl
  selectedFlagImageUrl.value = flagImageUrl
  selectedNationality.value = nationalityId
}
const closeDropdownOutside = (event) => {
  const dropdownContainer = document.querySelector('.nationality-dropdown__container')
  if (dropdownContainer && !dropdownContainer.contains(event.target)) {
    closeNationalityDropdown()
  }
}

/* CheckoutView Helper */

const { getItemsFromSessionStorage } = tempCheckoutData

const items = ref(getItemsFromSessionStorage())

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

const dateTime = () => {
  const inputDate = new Date(selectedDate.value)
  inputDate.setHours(inputDate.getHours() + 7)
  selectedDate.value = inputDate
}

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
})

const paymentSelection = ref('')
const paymentSelect = ref(false)
const showPaymentSelect = () => {
  paymentSelect.value = !paymentSelect.value
}
const selectPayment = (paymentMethod) => {
  paymentSelection.value = paymentMethod
  paymentSelect.value = false
}

const createTransaction = async () => {
  const order = items.value.map((item) => ({
    id: item.id,
    amount: item.quantity
  }))
  dateTime()
  try {
    const response = await fetch('http://localhost:3000/checkout/create-transaction', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        nationality: selectedNationality.value,
        date: selectedDate.value,
        total: totalTagihan.value,
        method: paymentSelection.value.toUpperCase(),
        order: order
      })
    })

    if (!response.ok) {
      throw new Error('Failed to create transaction. Please try again.')
    }
  } catch (error) {
    console.log(error)
  }
}

export default {
  selectedNationality,
  fetchNationalityData,
  nationalityQuery,
  nationalityResult,
  isNationalityDropdownOpen,
  showFlag,
  selectedFlagImageUrl,
  loadNationalityData,
  openNationalityDropdown,
  getFlagImageUrl,
  getNationality,
  closeDropdownOutside,
  getItemsFromSessionStorage,
  items,
  paymentSelection,
  paymentSelect,
  showPaymentSelect,
  selectPayment,
  isMancanegara,
  addTicket,
  reduceTicket,
  dateTime,
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
  createTransaction
}
