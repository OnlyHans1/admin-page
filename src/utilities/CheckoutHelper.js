import { ref, computed } from 'vue'
import DashboardHelper from '@/utilities/DashboardHelper'

const { checkSessionStorage, isMancanegara } = DashboardHelper

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

const getItemsFromSessionStorage = () => {
  const savedItems = sessionStorage.getItem('selectedItems')
  if (savedItems) {
    items.value = JSON.parse(savedItems)
  }
  return []
}

const items = ref([])

function addTicket(index) {
  items.value[index].amount++
  saveToSessionStorage()
}

function reduceTicket(index) {
  if (items.value[index].amount > 0) {
    items.value[index].amount--
    saveToSessionStorage()
  }
}

const saveToSessionStorage = () => {
  // Ambil data yang telah disimpan sebelumnya dari sessionStorage
  let storedItems = JSON.parse(sessionStorage.getItem('selectedItems')) || []

  // Iterasi melalui selectedItems untuk memeriksa apakah item sudah ada di storedItems
  items.value.forEach((item) => {
    const existingItemIndex = storedItems.findIndex((i) => i.id === item.id)

    if (item.amount === 0) {
      // Jika amount dari item adalah 0, hapus item tersebut dari storedItems
      if (existingItemIndex !== -1) {
        storedItems.splice(existingItemIndex, 1)
      }
    } else {
      if (existingItemIndex !== -1) {
        // Jika item sudah ada di storedItems, tambahkan jumlahnya
        storedItems[existingItemIndex].amount = item.amount
      } else {
        // Jika item belum ada, tambahkan item baru
        storedItems.push(item)
      }
    }
  })

  // Simpan data yang telah digabung kembali ke sessionStorage
  sessionStorage.setItem('selectedItems', JSON.stringify(storedItems))
  isMancanegara.value = false
  checkSessionStorage()
}

const selectedDate = ref(null)
const discountValue = ref(0)

const biayaLayanan = ref(2500)
const biayaJasa = ref(1000)

const formatCurrency = (amount) => {
  return parseInt(amount).toLocaleString('id-ID')
}

const totalHarga = computed(() => {
  let total = 0
  for (const ticket of items.value) {
    total += ticket.price * ticket.amount
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
    totalCount += ticket.amount
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

const dateTime = () => {
  const inputDate = new Date(selectedDate.value)
  inputDate.setHours(inputDate.getHours() + 7)
  selectedDate.value = inputDate
}

const checkoutStatus = ref('')

const createTransaction = async () => {
  const order = items.value
    .filter((item) => item.amount > 0)
    .map((item) => ({
      id: item.id,
      amount: item.amount
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
        discount: discountValue.value > 0 ? `${discountValue.value}%` : '0',
        order: order
      })
    })
    checkoutStatus.value = 'boleh'

    if (!response.ok) {
      checkoutStatus.value = 'salah'
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
  addTicket,
  reduceTicket,
  selectedDate,
  discountValue,
  biayaLayanan,
  biayaJasa,
  formatCurrency,
  totalHarga,
  formattedTotalHarga,
  totalTagihan,
  formattedTotalTagihan,
  totalTicketCount,
  createTransaction,
  checkoutStatus
}
