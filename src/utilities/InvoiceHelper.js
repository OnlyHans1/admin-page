import { ref } from 'vue'

/* InvoiceView Helper */
const dataInvoice = ref([])

const getSearchQuery = (query) => {
  getSearchQuery.value = query
}

const fetchTransactionList = async () => {
  try {
    let url = 'http://localhost:3000/invoice/transaction-list'
    if (searchQuery.value) {
      url += `?search=${encodeURIComponent(searchQuery.value)}`
    }
    const response = await fetch(url)
    if (!response.ok) {
      throw new Error('Failed to fetch data')
    }
    const data = await response.json()
    dataInvoice.value = data
  } catch (error) {
    console.error('Error fetching data:', error)
  }
}

const searchQuery = ref(null)
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
    nama: item.transaction.user.name,
    reservasi: item.order.name,
    jadwal: formatDate(item.transaction.date),
    ...(item.transaction.user.number != null && { 'no. telp': item.transaction.user.number }),
    pembayaran: item.transaction.method
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
  selectedItem,
  splitDate,
  showDetail,
  showPopup,
  showDetailPopup,
  closeDetailPopup,
  capitalizeFirstLetter
}
