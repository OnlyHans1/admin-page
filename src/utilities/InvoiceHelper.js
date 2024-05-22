import { ref } from 'vue'
import GlobalHelper from './GlobalHelper'

const { DB_BASE_URL, TRANSACTION_BASE_URL, showLoader } = GlobalHelper

/* InvoiceView Helper */
const dataInvoice = ref([])

const getSearchQuery = (query) => {
  getSearchQuery.value = query
}

const fetchTransactionList = async () => {
  try {
    let url = `${DB_BASE_URL.value}/${TRANSACTION_BASE_URL.value}/detail-invoice`
    if (searchQuery.value) {
      url += `?search=${encodeURIComponent(searchQuery.value)}`
    }
    const response = await fetch(url)
    if (!response.ok) {
      throw new Error('Failed to fetch data')
    }
    const res = await response.json()
    dataInvoice.value = res.data
    showLoader.value = false
  } catch (error) {
    console.error('Error fetching data:', error)
  }
}

const mapOrderDetails = (data) => {
  if (data.detailTrans.length > 0) {
    return data.detailTrans
      .map((item) => {
        const orderName = item.order.name
        const orderCategoryName = item.order.category.name

        return `${orderName} (${orderCategoryName}) x ${item.amount}`
      })
      .join(', ')
  }
  return ''
}
const mapGuideDetails = (data) => {
  if (data.detailTrans.length > 0) {
    return data.detailTrans
      .map((item) => {
        const guideName = item.guide ? item.guide.name : ''
        return `${guideName}`
      })
      .join(', ')
  }
  return null
}

const searchQuery = ref(null)
const resetSearch = () => {
  searchQuery.value = ''
}

const selectedItem = ref(null)

const splitDate = (dateTime) => {
  const parts = dateTime.split('T')
  const dateParts = parts[0].split('-')
  const timeParts = parts[1].split(':')

  // Memformat tanggal (dd/mm/yyyy)
  const day = dateParts[2]
  const month = dateParts[1]
  const year = dateParts[0]
  const formattedDate = `${day}/${month}/${year}`

  // Memformat waktu (hh.mm)
  const hours = timeParts[0]
  const minutes = timeParts[1]
  const formattedTime = `${hours}.${minutes}`

  return [formattedDate, formattedTime]
}

const formatDate = (dateTime) => {
  const date = new Date(dateTime)
  date.setHours(date.getHours() - 7)

  const monthNames = [
    'Januari',
    'Februari',
    'Maret',
    'April',
    'Mei',
    'Juni',
    'Juli',
    'Agustus',
    'September',
    'Oktober',
    'November',
    'Desember'
  ]

  // Memformat tanggal (dd month yy)
  const day = String(date.getDate()).padStart(2, '0')
  const month = monthNames[date.getMonth()]
  const year = String(date.getFullYear())
  const formattedDate = `${day} ${month} ${year}`

  // Memformat waktu (hh.mm)
  const hours = String(date.getHours()).padStart(2, '0')
  const minutes = String(date.getMinutes()).padStart(2, '0')
  const formattedTime = `${hours}.${minutes}`

  return `${formattedDate} / ${formattedTime}`
}

const showDetail = (item) => {
  selectedItem.value = {
    nama: item.user.name,
    reservasi: `${mapOrderDetails(item)}`,
    jadwal: formatDate(item.plannedDate),
    ...(item.user.number != null && { 'no. telp': item.user.number }),
    ...(mapGuideDetails(item) && { guide: mapGuideDetails(item) }),
    pembayaran: capitalizeFirstLetter(item.method),
    total: `Rp. ${Number(item.total).toLocaleString('id-ID')}`
  }
  showDetailPopup()
}

/* InvoiceDetail Helper */
const showPopup = ref(false)

const showDetailPopup = () => {
  showPopup.value = true
}

const closeDetailPopup = () => {
  showPopup.value = false
}

function capitalizeFirstLetter(str) {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

export default {
  dataInvoice,
  getSearchQuery,
  fetchTransactionList,
  searchQuery,
  resetSearch,
  mapOrderDetails,
  selectedItem,
  splitDate,
  showDetail,
  showPopup,
  showDetailPopup,
  closeDetailPopup,
  capitalizeFirstLetter
}
