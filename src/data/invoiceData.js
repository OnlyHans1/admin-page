import { ref } from 'vue'

export const data = ref([
  {
    nama: 'Teddy Lazuardi',
    pembelian: 'Bertemu Pangeran',
    jadwal: '15/03/2024 14.30',
    telp: '0894732894',
    email: 'TeddyLazuardy@gmail.com',
    pembayaran: '216758921'
  },
  {
    nama: 'Teddy Lazuardi',
    pembelian: 'Bundling tiket masuk keraton',
    jadwal: '15/03/2024 14.30',
    telp: '0894732894',
    email: 'TeddyLazuardy@gmail.com'
  },
  {
    nama: 'Teddy Lazuardi',
    pembelian: 'Event Bulanan',
    jadwal: '15/03/2024 14.29',
    telp: '0894732894',
    email: 'TeddyLazuardy@gmail.com'
  },
  {
    nama: 'Teddy Lazuardi',
    pembelian: 'Event Mingguan',
    jadwal: '15/03/2024 14.29',
    telp: '0894732894',
    email: 'TeddyLazuardy@gmail.com'
  },
  {
    nama: 'Teddy Lazuardi',
    pembelian: 'Bertemu Pangeran',
    jadwal: '15/03/2024 14.29',
    telp: '0894732894',
    email: 'TeddyLazuardy@gmail.com'
  },
  {
    nama: 'Teddy Lazuardi',
    pembelian: 'Bertemu Pangeran',
    jadwal: '15/03/2024 14.29',
    telp: '0894732894',
    email: 'TeddyLazuardy@gmail.com'
  }
])

export const searchQuery = ref('');
export const selectedItem = ref(null);

export const formatDate = (dateTime) => {
  const parts = dateTime.split(' ');
  return [parts[0], parts[1]];
};

export const detailPopup = ref(null);