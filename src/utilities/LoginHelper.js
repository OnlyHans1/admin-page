import { ref } from 'vue'
import GlobalHelper from './GlobalHelper'

const { DB_BASE_URL } = GlobalHelper

const grantLogin = ref(false)
const loggedIn = ref(false)

const username = ref('')
const password = ref('')
const cashierData = ref([])

const isAuthenticated = () => {
  const token = localStorage.getItem('token')
  if (token) {
    authLogin(token)
    loggedIn.value = true
    return true
  }
  localStorage.removeItem('token')
  return false
}

const authLogin = async (token) => {
  try {
    const response = await fetch(`${DB_BASE_URL.value}/authorized`, {
      headers: {
        Authorization: token
      }
    })

    if (!response.ok) {
      throw new Error(error)
    }

    const data = await response.json()
    cashierData.value = data
  } catch (error) {
    alert('Login gagal: ' + error.message)
  }
}

const userLogin = async () => {
  try {
    const response = await fetch(`${DB_BASE_URL.value}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: username.value,
        password: password.value
      })
    })

    if (!response.ok) {
      const errorMessage = await response.json()
      throw new Error(errorMessage.message)
    }

    const data = await response.json()
    localStorage.setItem('token', data.token)
    isAuthenticated()
  } catch (error) {
    alert('Login gagal: ' + error.message)
  }
}

const userLogout = () => {
  localStorage.removeItem('token')
  loggedIn.value = false
  cashierData.value = []
}

export default {
  loggedIn,
  username,
  password,
  isAuthenticated,
  userLogin,
  userLogout,
  cashierData
}
