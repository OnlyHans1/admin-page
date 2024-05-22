import { ref, computed } from 'vue'
import GlobalHelper from './GlobalHelper'
import SettingsHelper from './SettingsHelper'

const { DB_BASE_URL, ORDER_BASE_URL, assignAlert, showLoader } = GlobalHelper
const { targetedData, fetchTargetedOrder } = SettingsHelper

const selectedItems = ref([])
const selectedItemToDelete = ref('')

const showConfirmationPopup = ref(false)
const showDeleteConfirmationPopup = ref(false)

const dataDashboard = ref([])
const isMancanegara = ref(false)

const fetchOrderList = async () => {
  try {
    const response = await fetch(`${DB_BASE_URL.value}/${ORDER_BASE_URL.value}/order-details`)
    if (!response.ok) {
      showLoader.value = false
      throw new Error('Failed to fetch data')
    }
    const res = await response.json()
    dataDashboard.value = res.data
    dataDashboard.value.sort((a, b) => {
      return new Date(b.createdAt) - new Date(a.createdAt)
    })
    showLoader.value = false
  } catch (error) {
    console.error('Error fetching data:', error)
  }
}

const formatCurrency = (amount) => {
  return Number(amount).toLocaleString('id-ID')
}

const navigateToAdd = () => {
  showConfirmationPopup.value = true
}

const getImageURL = (imageName) => {
  if (imageName.startsWith('http')) {
    return imageName;
  } else {
    return `${DB_BASE_URL.value}/uploads/${imageName}`;
  }
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
  let storedItems = JSON.parse(sessionStorage.getItem('selectedItems')) || []
  selectedItems.value.forEach((item) => {
    const existingItemIndex = storedItems.findIndex((i) => i.id === item.id)
    if (item.amount === 0) {
      if (existingItemIndex !== -1) {
        storedItems.splice(existingItemIndex, 1)
      }
    } else {
      if (existingItemIndex !== -1) {
        storedItems[existingItemIndex].amount = item.amount
      } else {
        storedItems.push(item)
      }
    }
  })
  sessionStorage.setItem('selectedItems', JSON.stringify(storedItems))
  isMancanegara.value = false
  checkSessionStorage()
}

const checkSessionStorage = () => {
  const sessionStorageData = JSON.parse(sessionStorage.getItem('selectedItems'))
  if (sessionStorageData && sessionStorageData.length > 0) {
    for (const item of sessionStorageData) {
      if (item && item.category.name === 'Mancanegara') {
        isMancanegara.value = true
        return 'Mancanegara'
      } else if (item && item.category.name !== 'Mancanegara') {
        isMancanegara.value = false
        return 'Not_Mancanegara'
      }
    }
    return ''
  }
}

const handleCategorySelection = (filterCategory) => {
  if (filterCategory === 'Mancanegara') {
    dataDashboard.value.forEach((item) => {
      if (item.category.name !== 'Mancanegara') {
        item.disabled = true
      }
    })
  } else if (filterCategory === 'Not_Mancanegara') {
    dataDashboard.value.forEach((item) => {
      if (item.category.name === 'Mancanegara') {
        item.disabled = true
      }
    })
  } else {
    dataDashboard.value.forEach((item) => {
      item.disabled = false
    })
  }
}

const handleItemClick = (item) => {
  const filterCategory = ref(checkSessionStorage())
  handleCategorySelection(filterCategory.value)
  if (item.disabled) {
    if (filterCategory.value === 'Mancanegara') {
      assignAlert(
        true,
        'Error',
        'danger',
        'Kamu tidak bisa memilih paket selain kategori mancanegara!'
      )
    } else {
      assignAlert(
        true,
        'Error',
        'danger',
        'Kamu tidak bisa memilih paket selain kategori umum atau pelajar!'
      )
    }
  } else {
    selectItem(item)
  }
}

const showDeleteConfirmation = (id) => {
  showDeleteConfirmationPopup.value = true
  selectedItemToDelete.value = id
}

const closeDeletePopup = () => {
  showDeleteConfirmationPopup.value = false
  selectedItemToDelete.value = ''
}

const groupedItems = computed(() => {
  const grouped = {}
  dataDashboard.value.forEach((item) => {
    const category = item.category.name
    if (!grouped[category]) {
      grouped[category] = []
    }
    grouped[category].push(item)
  })

  const sortedGrouped = {}
  Object.keys(grouped)
    .sort((a, b) => b.localeCompare(a))
    .forEach((key) => {
      sortedGrouped[key] = grouped[key]
    })

  return sortedGrouped
})
const deleteOrder = async () => {
  try {
    showLoader.value = true
    const response = await fetch(
      `${DB_BASE_URL.value}/${ORDER_BASE_URL.value}/order-action/delete/${encodeURIComponent(selectedItemToDelete.value)}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }
      }
    )

    if (response.ok) {
      showLoader.value = false
      sessionStorage.clear()
      closePopup()
      closeDeletePopup()
      await location.reload()
      assignAlert(
        true,
        'Sukses',
        'success',
        `Pesanan ${targetedData.value.name} (${targetedData.value.category.name}) berhasil dihapus!`
      )
    } else {
      assignAlert(
        true,
        'Error',
        'danger',
        `Gagal menghapus pesanan ${targetedData.value.name} (${targetedData.value.category.name})!`
      )
    }
  } catch (error) {
    console.error(error)
  }
}
const confirmDelete = async () => {
  try {
    await fetchTargetedOrder(selectedItemToDelete.value)
    await deleteOrder()
  } catch (error) {
    console.error(error)
  }
}

export default {
  selectedItems,
  showConfirmationPopup,
  showDeleteConfirmation,
  showDeleteConfirmationPopup,
  confirmDelete,
  dataDashboard,
  isMancanegara,
  fetchOrderList,
  getImageURL,
  formatCurrency,
  navigateToAdd,
  closePopup,
  closeDeletePopup,
  increaseAmount,
  decreaseAmount,
  saveToSessionStorage,
  handleItemClick,
  checkSessionStorage,
  groupedItems
}
