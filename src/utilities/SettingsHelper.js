import { ref } from 'vue'
import GlobalHelper from './GlobalHelper'

const {DB_BASE_URL, ORDER_BASE_URL, showLoader} = GlobalHelper

const targetedData = ref([])

const fetchTargetedData = async (id) => {
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
export default {
  targetedData,
  fetchTargetedData
}
