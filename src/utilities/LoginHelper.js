import { ref } from 'vue'
import GlobalHelper from './GlobalHelper'

const { DB_BASE_URL, USER_BASE_URL, assignAlert, showLoader } = GlobalHelper

const loggedIn = ref(false)

const username = ref('')
const password = ref('')
const userData = ref([])

const isAuthenticated = async () => {
  const token = localStorage.getItem('token')
  if (token) {
    try {
      const success = await authLogin(token)
      if (success) {
        loggedIn.value = true

        return true
      } else {
        loggedIn.value = false
        return false
      }
    } catch (error) {
      console.error(error)
      localStorage.removeItem('token')
      return false
    }
  }
  return false
}

const authLogin = async (token) => {
  try {
    const response = await fetch(`${DB_BASE_URL.value}/${USER_BASE_URL.value}/admin-auth`, {
      headers: {
        Authorization: token
      }
    })

    if (!response.ok) {
      const error = await response.json()
      showLoader.value = false
      throw new Error(error.message)
    }

    const data = await response.json()
    userData.value = data.data
    showLoader.value = false
    return true
  } catch (error) {
    console.error(error)
    return false
  }
}

const userLogin = async () => {
  try {
    showLoader.value = true

    const response = await fetch(`${DB_BASE_URL.value}/${USER_BASE_URL.value}/admin-login`, {
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
      const error = await response.json()
      showLoader.value = false
      assignAlert(true, 'Error', 'danger', `Login gagal! ${error.message}`)
      throw new Error(error.message)
    }

    const data = await response.json()
    localStorage.setItem('token', data.data)
    isAuthenticated()
  } catch (error) {
    console.error(error)
  }
}

const userLogout = () => {
  localStorage.removeItem('token')
  loggedIn.value = false
  assignAlert(true, 'Sukses', 'success', `${userData.value.name} berhasil logout!`)
  userData.value = []
}

export default {
  loggedIn,
  username,
  password,
  isAuthenticated,
  userLogin,
  userLogout,
  userData
}
