import { ref, computed } from 'vue'
import GlobalHelper from './GlobalHelper'
import DashboardHelper from './DashboardHelper'
import LoginHelper from './LoginHelper'

const {
  DB_BASE_URL,
  GUIDE_BASE_URL,
  NATIONALITY_BASE_URL,
  TRANSACTION_BASE_URL,
  DETAILTRANS_BASE_URL,
  showLoader
} = GlobalHelper
const { checkSessionStorage, isMancanegara } = DashboardHelper
const { userData } = LoginHelper

/* NationalityDropdown Helper */
const nationalityData = ref([])

const selectedNationality = ref()

const fetchNationalityData = async () => {
  try {
    const response = await fetch(
      `${DB_BASE_URL.value}/${NATIONALITY_BASE_URL.value}/nationality-list`
    )
    if (!response.ok) {
      throw new Error('Failed to fetch data')
    }
    const data = await response.json()
    nationalityData.value = data.data
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

const items = ref([])
const getItemsFromSessionStorage = () => {
  const savedItems = sessionStorage.getItem('selectedItems')
  if (savedItems) {
    const parsedItems = JSON.parse(savedItems)
    for (let item of parsedItems) {
      item.guideId = item.guideId || ''
      item.guideName = item.guideName || ''
    }
    items.value = parsedItems
    return parsedItems
  }
  return []
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

const selectedDate = ref(null)
const discountValue = ref(0)
const cashbackValue = ref(0)

const biayaLayanan = ref(2500)
const biayaJasa = ref(1000)
const fetchFeeSettings = () => {
  const savedBiayaLayanan = sessionStorage.getItem('biayaLayanan')
  if (savedBiayaLayanan) {
    biayaLayanan.value = parseInt(savedBiayaLayanan)
  }

  const savedBiayaJasa = sessionStorage.getItem('biayaJasa')
  if (savedBiayaJasa) {
    biayaJasa.value = parseInt(savedBiayaJasa)
  }
}

const formatCurrency = (amount) => {
  return parseInt(amount).toLocaleString('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  })
}

const totalHarga = computed(() => {
  let total = 0
  for (const ticket of items.value) {
    total += ticket.price * ticket.amount
  }
  return total
})

const totalBiaya = computed(() => {
  return totalHarga.value + biayaLayanan.value + biayaJasa.value
})

const totalTagihan = computed(() => {
  return (
    totalHarga.value -
    (totalHarga.value * discountValue.value) / 100 +
    biayaLayanan.value +
    biayaJasa.value
  )
})

const totalTicketCount = computed(() => {
  let totalCount = 0
  for (const ticket of items.value) {
    totalCount += ticket.amount
  }
  return totalCount
})

//Payment Method Selection
const paymentSelection = ref('')
const paymentSelect = ref(false)
const showPaymentSelect = () => {
  paymentSelect.value = !paymentSelect.value
}
const selectPayment = (paymentMethod) => {
  paymentSelection.value = paymentMethod
  paymentSelect.value = false
}

//DateTime
const dateTime = () => {
  const inputDate = new Date(selectedDate.value)
  inputDate.setHours(inputDate.getHours() + 7)
  selectedDate.value = inputDate
}

const checkoutStatus = ref('')
const paymentStatus = ref('')
const recentTransactionId = ref('')

const createTransaction = async () => {
  const order = items.value
    .filter((item) => item.amount > 0)
    .map((item) => ({
      id: item.id,
      amount: item.amount,
      guideId: item.guideId
    }))

  dateTime()

  try {
    showLoader.value = true

    const response = await fetch(
      `${DB_BASE_URL.value}/${TRANSACTION_BASE_URL.value}/create-transaction`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          userId: userData.value.id,
          nationalityId: selectedNationality.value,
          plannedDate: selectedDate.value,
          total: totalTagihan.value.toFixed(2),
          method: paymentSelection.value.toUpperCase(),
          status: paymentStatus.value ? paymentStatus.value : 'DAPAT_DIGUNAKAN',
          discount:
            discountValue.value > 0 ? `${(totalHarga.value * discountValue.value) / 100}` : '0',
          cashback:
            cashbackValue.value > 0 ? `${(totalTagihan.value * cashbackValue.value) / 100}` : '0',
          order: order
        })
      }
    )

    if (!response.ok) {
      checkoutStatus.value = 'salah'
      showLoader.value = false
      throw new Error('Failed to create transaction. Please try again.')
    }

    const res = await response.json()
    recentTransactionId.value = res.data

    checkoutStatus.value = 'boleh'
    showLoader.value = false
    sessionStorage.clear()
  } catch (error) {
    console.log(error)
  }
}

const fetchGuideData = async () => {
  try {
    const response = await fetch(`${DB_BASE_URL.value}/${GUIDE_BASE_URL.value}/guide-list`)
    if (!response.ok) {
      throw new Error('Failed to fetch data')
    }
    const res = await response.json()
    guideData.value = res.data
  } catch (error) {
    console.error('Error fetching data:', error)
  }
}

//Guide Selection
const guideData = ref([])
const guideSelection = ref([])
const guideSelect = ref(false)

const guideSelectors = ref(true)
const guideSelectBio = ref(false)
const guideSelectTicket = ref(false)

const selectedGuide = ref([])

const guideSelectPage = () => {
  guideSelect.value = !guideSelect.value
}

const guideSelectPageBio = (guide) => {
  guideSelectBio.value = !guideSelectBio.value
  guideSelectors.value = !guideSelectors.value
  selectedGuide.value = guide
}
const guideSelectPageTicket = () => {
  guideSelectTicket.value = !guideSelectTicket.value
  guideSelectBio.value = !guideSelectBio.value
  guideSelectors.value = false
}

const isGuideChecked = computed(() => {
  return (guideId) => {
    return guideSelection.value.some((guide) => guide.id === guideId)
  }
})

const updateItems = (props) => {
  items.value[props].guideId = selectedGuide.value.id
  items.value[props].guideName = selectedGuide.value.name
}

const addGuide = (index) => {
  const existingIndex = items.value.findIndex((item) => item.guideId === selectedGuide.value.id)
  const previousSelectionIndex = guideSelection.value.findIndex(
    (guide) => guide.id === items.value[index].guideId
  )
  if (existingIndex === -1) {
    updateItems(index)
  } else {
    updateItems(existingIndex)
  }
  if (previousSelectionIndex !== -1) {
    guideSelection.value.splice(previousSelectionIndex, 1)
  }
  guideSelection.value.push({ ...selectedGuide.value })
  sessionStorage.setItem('selectedItems', JSON.stringify(items.value))
}

const formattedGuideSelection = computed(() => {
  return guideSelection.value.map((guide) => guide.name).join(', ')
})

function determineAge(birthdate) {
  const birthDate = new Date(birthdate)
  const currentDate = new Date()

  const age = currentDate.getFullYear() - birthDate.getFullYear()

  const isBirthdayPassed =
    currentDate.getMonth() > birthDate.getMonth() ||
    (currentDate.getMonth() === birthDate.getMonth() &&
      currentDate.getDate() >= birthDate.getDate())

  const finalAge = isBirthdayPassed ? age : age - 1

  return finalAge
}

function formatGender(gender) {
  if (gender === 'MALE') return 'L'
  else if (gender === 'FEMALE') return 'P'
  return '?'
}

const unavailableGuideData = ref([])
const fetchUnavailableGuide = async () => {
  try {
    showLoader.value = true

    const response = await fetch(
      `${DB_BASE_URL.value}/${DETAILTRANS_BASE_URL.value}/unavailable-guide?date=${selectedDate.value}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      }
    )

    if (!response.ok) {
      showLoader.value = false
      throw new Error('Failed to fetch unavailable guide. Please try again.')
    }
    const data = await response.json()
    unavailableGuideData.value = data.data
    showLoader.value = false
  } catch (error) {
    console.log(error)
  }
}
const checkGuideAvailability = (id) => {
  return unavailableGuideData.value.some((data) => data.guide.id === id)
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
  cashbackValue,
  biayaLayanan,
  biayaJasa,
  fetchFeeSettings,
  formatCurrency,
  totalHarga,
  totalTagihan,
  totalBiaya,
  totalTicketCount,
  recentTransactionId,
  createTransaction,
  checkoutStatus,
  guideData,
  selectedGuide,
  guideSelect,
  guideSelectPage,
  guideSelection,
  guideSelectBio,
  guideSelectPageBio,
  guideSelectors,
  guideSelectTicket,
  guideSelectPageTicket,
  addGuide,
  isGuideChecked,
  formattedGuideSelection,
  fetchGuideData,
  determineAge,
  formatGender,
  fetchUnavailableGuide,
  unavailableGuideData,
  checkGuideAvailability
}
