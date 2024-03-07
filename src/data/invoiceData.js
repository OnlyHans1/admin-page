import { ref } from 'vue'

const dataInvoice = ref([
  {
    nama: 'Teddy Lazuardi',
    pembelian: 'Bertemu Pangeran',
    jadwal: '15/03/2024 14.30',
    telp: '0894732894',
    email: 'TeddyLazuardy@gmail.com',
    pembayaran: 'Transfer Bank : BJB'
  },
  {
    nama: 'Teddy Lazuardi',
    pembelian: 'Bundling tiket masuk keraton',
    jadwal: '15/03/2024 14.30',
    telp: '0894732894',
    email: 'TeddyLazuardy@gmail.com',
    pembayaran: 'Tunai'
  },
  {
    nama: 'Teddy Lazuardi',
    pembelian: 'Event Bulanan',
    jadwal: '15/03/2024 14.29',
    telp: '0894732894',
    email: 'TeddyLazuardy@gmail.com',
    pembayaran: 'Transfer Bank : BJB'
  },
  {
    nama: 'Teddy Lazuardi',
    pembelian: 'Event Mingguan',
    jadwal: '15/03/2024 14.29',
    telp: '0894732894',
    email: 'TeddyLazuardy@gmail.com',
    pembayaran: 'Tunai'
  },
  {
    nama: 'Teddy Lazuardi',
    pembelian: 'Bertemu Pangeran',
    jadwal: '15/03/2024 14.29',
    telp: '0894732894',
    email: 'TeddyLazuardy@gmail.com',
    pembayaran: 'Transfer Bank : BJB'
  },
  {
    nama: 'Teddy Lazuardi',
    pembelian: 'Bertemu Pangeran',
    jadwal: '15/03/2024 14.29',
    telp: '0894732894',
    email: 'SlebewGimangehan1256@gmail.com',
    pembayaran: 'Tunai'
  }
])

const searchQuery = ref('')
const selectedItem = ref(null)

const formatDate = (dateTime) => {
  const parts = dateTime.split(' ')
  return [parts[0], parts[1]]
}

export default { dataInvoice, searchQuery, selectedItem, formatDate }
