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
  EMAIL_BASE_URL,
  showLoader,
  assignAlert
} = GlobalHelper
const { saveToUserCarts, updateUserCarts } = DashboardHelper
const { userData, userCarts } = LoginHelper

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
    const res = await response.json()
    nationalityData.value = res.data
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

  const flagImageUrl = getFlagImageUrl(countryCode)

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
const getUserCarts = () => {
  if (userCarts.value) {
    for (let item of userCarts.value) {
      item.guideId = item.guideId || ''
      item.guideName = item.guideName || ''
    }
    return userCarts.value
  }
  return []
}

function addTicket(index) {
  if (userCarts.value[index].amount >= 80) {
    assignAlert(true, 'Error', 'danger', 'Maaf, tiket tidak bisa melebihi 80 tiket!')
    userCarts.value[index].amount = 80
  } else {
    userCarts.value[index].amount++
  }
  saveToUserCarts()
}

function reduceTicket(index) {
  if (userCarts.value[index].amount > 0) {
    userCarts.value[index].amount--
    saveToUserCarts()
  }
}

const custName = ref('')
const custEmail = ref('')
const custNumber = ref('')
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
  for (const ticket of userCarts.value) {
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
  for (const ticket of userCarts.value) {
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
  const order = userCarts.value
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
          customer: {
            name: custName.value,
            email: custEmail.value,
            number: custNumber.value
          },
          userId: userData.value.id,
          nationalityId: selectedNationality.value,
          plannedDate: selectedDate.value,
          additionalFee: Number(biayaJasa.value + biayaLayanan.value),
          total: totalTagihan.value.toFixed(2),
          method: paymentSelection.value.toUpperCase(),
          status: paymentStatus.value ? paymentStatus.value : 'DAPAT_DIGUNAKAN',
          discount:
            discountValue.value > 0
              ? `${(totalHarga.value * discountValue.value) / 100} | ${discountValue.value}`
              : '0 | 0%',
          cashback:
            cashbackValue.value > 0
              ? `${(totalTagihan.value * cashbackValue.value) / 100} | ${cashbackValue.value}`
              : '0 | 0%',
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
    userCarts.value = []
    updateUserCarts(userCarts.value)
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
  userCarts.value[props].guideId = selectedGuide.value.id
  userCarts.value[props].guideName = selectedGuide.value.name
}

const addGuide = (index) => {
  const existingIndex = userCarts.value.findIndex((item) => item.guideId === selectedGuide.value.id)
  const previousSelectionIndex = guideSelection.value.findIndex(
    (guide) => guide.id === userCarts.value[index].guideId
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
  guideSelectTicket.value = false
  guideSelectBio.value = false
  guideSelectors.value = true
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
    const res = await response.json()
    unavailableGuideData.value = res.data
    showLoader.value = false
  } catch (error) {
    console.log(error)
  }
}
const checkGuideAvailability = (id) => {
  return unavailableGuideData.value.some((data) => (data.guide ? data.guide.id === id : false))
}

const ticketsData = ref([])
const sendEmailToUser = async () => {
  try {
    showLoader.value = true
    let response = await fetch(`${DB_BASE_URL.value}/${EMAIL_BASE_URL.value}/email-transaction`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        ...ticketsData.value
      })
    })

    if (!response.ok) {
      showLoader.value = false
      throw new Error('Failed to send email!')
    }

    const res = await response.json()
    showLoader.value = false
    assignAlert(true, 'Success', 'success', `Berhasil mengirim email ke ${ticketsData.value.customer.email}!`)
    console.log('Email sent successfully:', res.message)
  } catch (error) {
    console.error('Error sending email:', error)
  }
}
const printTickets = async () => {
  try {
    let response = await fetch(`${DB_BASE_URL.value}/${TRANSACTION_BASE_URL.value}/print-transaction`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        ...ticketsData.value
      })
    })

    if (!response.ok) {
      showLoader.value = false
      throw new Error('Failed to print data!')
    }

    const res = await response.json()
  } catch (error) {
    console.error('Error fetch data:', error)
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
  getUserCarts,
  paymentSelection,
  paymentSelect,
  showPaymentSelect,
  selectPayment,
  addTicket,
  reduceTicket,
  custName,
  custEmail,
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
  checkGuideAvailability,
  ticketsData,
  sendEmailToUser,
  printTickets
}
