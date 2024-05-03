import { ref, computed } from 'vue'
import GlobalHelper from './GlobalHelper'

const { DB_BASE_URL, assignAlert, showLoader } = GlobalHelper

const selectedItems = ref([])
const selectedItemToDelete = ref([])
const selectedItemToEdit = ref([])

const showConfirmationPopup = ref(false)
const showDeleteConfirmationPopup = ref(false)

const dataDashboard = ref([])
const isMancanegara = ref(false)

const fetchOrderList = async () => {
  try {
    const response = await fetch(`${DB_BASE_URL.value}/order-list`)
    if (!response.ok) {
      throw new Error('Failed to fetch data')
    }
    const data = await response.json()
    dataDashboard.value = data
    sortDataByCreatedAt()
    showLoader.value = false
  } catch (error) {
    console.error('Error fetching data:', error)
  }
}

const sortDataByCreatedAt = () => {
  dataDashboard.value.sort((a, b) => {
    return new Date(b.createdAt) - new Date(a.createdAt)
  })
}

const capitalizeFirstLetter = (str) => {
  const lowercaseStr = str.toLowerCase()
  return lowercaseStr.charAt(0).toUpperCase() + lowercaseStr.slice(1)
}

const formatCurrency = (amount) => {
  return Number(amount).toLocaleString('id-ID')
}

const navigateToAdd = () => {
  showConfirmationPopup.value = true
}

const getImageURL = (imageName) => {
  return `${DB_BASE_URL.value}/uploads/${imageName}`
}

const selectItem = (item) => {
  const storedItems = JSON.parse(sessionStorage.getItem('selectedItems')) || []
  const existingItem = storedItems.find((i) => i.id === item.id)

  if (existingItem) {
    item.amount = existingItem.amount
  } else {
    item.amount = 0
  }

  item.selected = true
  selectedItems.value.push(item)
  saveToSessionStorage()
}

const closePopup = () => {
  showConfirmationPopup.value = false
  selectedItems.value = []
}

const increaseAmount = (item) => {
  item.amount++
  saveToSessionStorage()
}

const decreaseAmount = (item) => {
  if (item.amount > 0) {
    item.amount--
    saveToSessionStorage()
  }
}

const saveToSessionStorage = () => {
  // Ambil data yang telah disimpan sebelumnya dari sessionStorage
  let storedItems = JSON.parse(sessionStorage.getItem('selectedItems')) || []

  // Iterasi melalui selectedItems untuk memeriksa apakah item sudah ada di storedItems
  selectedItems.value.forEach((item) => {
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

const checkSessionStorage = () => {
  const sessionStorageData = JSON.parse(sessionStorage.getItem('selectedItems'))

  // Memeriksa apakah sessionStorageData memiliki nilai
  if (sessionStorageData && sessionStorageData.length > 0) {
    for (const item of sessionStorageData) {
      if (item && item.category === 'MANCANEGARA') {
        isMancanegara.value = true
        return 'MANCANEGARA'
      } else if (item && item.category !== 'MANCANEGARA') {
        isMancanegara.value = false
        return 'NOT_MANCANEGARA'
      }
    }
    return ''
  }
}

// Fungsi untuk menangani pemilihan kategori
const handleCategorySelection = (filterCategory) => {
  // Jika kategori Mancanegara dipilih dan tidak ada item dengan kategori MANCANEGARA di sessionStorage, nonaktifkan kategori lainnya
  if (filterCategory === 'MANCANEGARA') {
    // Nonaktifkan item dengan kategori UMUM dan PELAJAR
    dataDashboard.value.forEach((item) => {
      if (item.category !== 'MANCANEGARA') {
        item.disabled = true
      }
    })
  } else if (filterCategory === 'NOT_MANCANEGARA') {
    // Nonaktifkan item dengan kategori MANCANEGARA
    dataDashboard.value.forEach((item) => {
      if (item.category === 'MANCANEGARA') {
        item.disabled = true
      }
    })
  } else {
    // Aktifkan kembali semua item
    dataDashboard.value.forEach((item) => {
      item.disabled = false
    })
  }
}

// Fungsi untuk menampilkan alert saat item nonaktif dipilih
const handleItemClick = (item) => {
  const filterCategory = ref(checkSessionStorage())
  handleCategorySelection(filterCategory.value)
  if (item.disabled) {
    if (filterCategory.value === 'MANCANEGARA') {
      assignAlert(true, 'Error', 'danger', 'Kamu tidak bisa memilih paket selain kategori mancanegara!')
    } else {
      assignAlert(true, 'Error', 'danger', 'Kamu tidak bisa memilih paket selain kategori umum atau pelajar!')
    }
  } else {
    selectItem(item)
  }
}

const showDeleteConfirmation = () => {
  showDeleteConfirmationPopup.value = true
  // Menampilkan konfirmasi delete
  selectedItemToDelete.value = selectedItems.value[0]
}

const closeDeletePopup = () => {
  showDeleteConfirmationPopup.value = false
}

const groupedItems = computed(() => {
  const grouped = {}
  dataDashboard.value.forEach((item) => {
    const category = item.category
    if (!grouped[category]) {
      grouped[category] = []
    }
    grouped[category].push(item)
  })
  return grouped
})

const confirmDelete = async () => {
  try {
    const response = await fetch(
      `${DB_BASE_URL.value}/delete-order/${encodeURIComponent(selectedItemToDelete.value.id)}`,
      {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      }
    )

    if (response.ok) {
      sessionStorage.clear()
      closePopup()
      closeDeletePopup()
      assignAlert(true, 'Sukses', 'success', `Pesanan ${selectedItemToDelete.value.name} (${selectedItemToDelete.value.category}) berhasil dihapus!`)
      selectedItemToDelete.value = []
      setTimeout(() => {
        location.reload()
      }, 3000)
    } else {
      assignAlert(true, 'Error', 'danger', `Gagal menghapus pesanan ${selectedItemToDelete.value.name} (${selectedItemToDelete.value.category})!`)
    }
  } catch (error) {
    console.error(error)
  }
}

export default {
  selectedItems,
  selectedItemToEdit,
  showConfirmationPopup,
  showDeleteConfirmation,
  showDeleteConfirmationPopup,
  confirmDelete,
  dataDashboard,
  isMancanegara,
  fetchOrderList,
  getImageURL,
  capitalizeFirstLetter,
  formatCurrency,
  navigateToAdd,
  closePopup,
  closeDeletePopup,
  increaseAmount,
  decreaseAmount,
  saveToSessionStorage,
  handleItemClick,
  checkSessionStorage,
  groupedItems,
}
