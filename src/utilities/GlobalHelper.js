import { ref } from 'vue'

const DB_BASE_URL = ref('http://localhost:3000')
const USER_BASE_URL = ref('keraton-pos/user')
const ORDER_BASE_URL = ref('keraton-pos/order')
const ORDERTYPE_BASE_URL = ref('keraton-pos/order-type')
const ORDERSUBTYPE_BASE_URL = ref('keraton-pos/order-subtype')
const TRANSACTION_BASE_URL = ref('keraton-pos/transaction')
const DETAILTRANS_BASE_URL = ref('keraton-pos/detail-trans')
const GUIDE_BASE_URL = ref('keraton-pos/guide')
const NATIONALITY_BASE_URL = ref('keraton-pos/nationality')

const showLoader = ref(false)

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
  USER_BASE_URL,
  ORDER_BASE_URL,
  ORDERTYPE_BASE_URL,
  ORDERSUBTYPE_BASE_URL,
  TRANSACTION_BASE_URL,
  DETAILTRANS_BASE_URL,
  GUIDE_BASE_URL,
  NATIONALITY_BASE_URL,
  assignAlert,
  showLoader,
  showAlert,
  alertTitle,
  alertType,
  alertMessage
}
