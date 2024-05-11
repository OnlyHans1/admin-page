import { ref } from 'vue'
import GlobalHelper from './GlobalHelper'

const {
  DB_BASE_URL,
  ORDER_BASE_URL,
  ORDERTYPE_BASE_URL,
  ORDERSUBTYPE_BASE_URL,
  CATEGORY_BASE_URL,
  assignAlert,
  showLoader
} = GlobalHelper

const targetedData = ref([])
const popupData = ref([])
const modePopup = ref('')
const isPopupVisible = ref(false)
const isSettingExtended = ref(false)
const popupTitle = ref('')
const dataTarget = ref([])

const fetchTargetedOrder = async (id) => {
  try {
    showLoader.value = true

    const response = await fetch(
      `${DB_BASE_URL.value}/${ORDER_BASE_URL.value}/order-details/${encodeURIComponent(id)}`
    )
    if (!response.ok) {
      showLoader.value = false
      throw new Error('Failed to fetch data')
    }
    const data = await response.json()
    targetedData.value = data.data
    showLoader.value = false
  } catch (error) {
    console.error('Error fetching data:', error)
  }
}
const fetchOrderType = async () => {
  try {
    showLoader.value = true

    const response = await fetch(`${DB_BASE_URL.value}/${ORDERTYPE_BASE_URL.value}/type-details`)
    if (!response.ok) {
      showLoader.value = false
      throw new Error('Failed to fetch data')
    }
    const data = await response.json()
    popupData.value = data.data
    showLoader.value = false
  } catch (error) {
    console.error('Error fetching data:', error)
  }
}
const fetchOrderSubType = async () => {
  try {
    showLoader.value = true

    const response = await fetch(
      `${DB_BASE_URL.value}/${ORDERSUBTYPE_BASE_URL.value}/sub-type-details`
    )
    if (!response.ok) {
      showLoader.value = false
      throw new Error('Failed to fetch data')
    }
    const data = await response.json()
    popupData.value = data.data
    showLoader.value = false
  } catch (error) {
    console.error('Error fetching data:', error)
  }
}
const fetchCategory = async () => {
  try {
    showLoader.value = true

    const response = await fetch(`${DB_BASE_URL.value}/${CATEGORY_BASE_URL.value}/category-details`)
    if (!response.ok) {
      showLoader.value = false
      throw new Error('Failed to fetch data')
    }
    const data = await response.json()
    popupData.value = data.data
    showLoader.value = false
  } catch (error) {
    console.error('Error fetching data:', error)
  }
}
const deleteOrderType = async (id) => {
  try {
    showLoader.value = true

    const response = await fetch(`${DB_BASE_URL.value}/${ORDERTYPE_BASE_URL.value}/type-action/delete/${encodeURIComponent(id)}`, {
      method: 'POST'
    })
    if (!response.ok) {
      showLoader.value = false
      throw new Error('Failed to fetch data')
    }
    showLoader.value = false
    setTimeout(() => {
      location.reload()
    }, 500)
    assignAlert(true, 'Sukses', 'success', 'Berhasil menghapus Tipe!')
  } catch (error) {
    console.error('Error fetching data:', error)
  }
}
const deleteOrderSubType = async (id) => {
  try {
    showLoader.value = true

    const response = await fetch(
      `${DB_BASE_URL.value}/${ORDERSUBTYPE_BASE_URL.value}/sub-type-action/delete/${encodeURIComponent(id)}`,
      {
        method: 'POST'
      }
    )
    if (!response.ok) {
      showLoader.value = false
      throw new Error('Failed to fetch data')
    }
    showLoader.value = false
    setTimeout(() => {
      location.reload()
    }, 500)
    assignAlert(true, 'Sukses', 'success', 'Berhasil menghapus Sub Tipe!')
  } catch (error) {
    console.error('Error fetching data:', error)
  }
}
const deleteCategory = async (id) => {
  try {
    showLoader.value = true

    const response = await fetch(
      `${DB_BASE_URL.value}/${CATEGORY_BASE_URL.value}/category-action/delete/${encodeURIComponent(id)}`,
      {
        method: 'POST'
      }
    )
    if (!response.ok) {
      showLoader.value = false
      throw new Error('Failed to fetch data')
    }
    showLoader.value = false
    setTimeout(() => {
      location.reload()
    }, 500)
    assignAlert(true, 'Sukses', 'success', 'Berhasil menghapus Kategori!')
  } catch (error) {
    console.error('Error fetching data:', error)
  }
}

export default {
  targetedData,
  popupData,
  modePopup,
  popupTitle,
  dataTarget,
  isPopupVisible,
  isSettingExtended,
  fetchTargetedOrder,
  fetchOrderType,
  fetchOrderSubType,
  fetchCategory,
  deleteOrderType,
  deleteOrderSubType,
  deleteCategory
}
