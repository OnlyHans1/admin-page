import { ref } from 'vue'

const loggedIn = ref(false)
const grantLogin = ref(false)

const username = ref('')
const password = ref('')
const cashierData = ref([])

const userLogin = async () => {
  try {
    const response = await fetch('http://localhost:3000/login', {
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
      const errorMessage = await response.json() // mengambil pesan dari respons
      throw new Error(errorMessage.message) // melempar pesan kesalahan
    }

    const data = await response.json()
    cashierData.value = data.cashier // Mengakses data kasir dari respons
    grantLogin.value = true
  } catch (error) {
    alert('Login gagal: ' + error.message)
  }
}

const userLogout = () => {
  cashierData.value = []
  loggedIn.value = false
  grantLogin.value = false
}

export default {
  loggedIn,
  grantLogin,
  username,
  password,
  userLogin,
  userLogout,
  cashierData
}
