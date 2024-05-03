import { ref } from 'vue'

const DB_BASE_URL = ref('http://localhost:3000')

const showAlert = ref(false)
const alertTitle = ref('')
const alertType = ref('')
const alertMessage = ref('')

const assignAlert = (show, title, type, message) => {
  showAlert.value = show
  alertTitle.value = title
  alertType.value = type
  alertMessage.value = message
  setTimeout(() => {
    showAlert.value = false
  }, 3000)
}

export default {
  DB_BASE_URL,
  assignAlert,
  showAlert,
  alertTitle,
  alertType,
  alertMessage
}
