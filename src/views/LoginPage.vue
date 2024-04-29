<script setup>
import LoginHelper from '@/utilities/LoginHelper'
import { useRouter } from 'vue-router'

const router = useRouter()
const { loggedIn, grantLogin, username, password, userLogin } = LoginHelper

const checkLogin = async () => {
  try {
    await userLogin() // Memanggil userLogin dan menunggu hingga proses login selesai
    if (grantLogin.value) {
      // Jika grantLogin bernilai true setelah userLogin
      setTimeout(() => {
        router.push('/') // Redirect ke halaman utama setelah 1.2 detik
        loggedIn.value = true // Set nilai loggedIn menjadi true
        grantLogin.value = false // Set nilai grantLogin kembali menjadi false
      }, 1200)
    }
  } catch (error) {
    console.error('Cek login error :', error)
  }
}

// Fungsi userLogin tidak perlu diubah, karena sudah merupakan async function yang mengembalikan Promise.
</script>

<template>
  <div class="login">
    <div class="login-container">
      <div class="login-container__content-img">
        <img src="../assets/images/Logo KKC.svg" alt="Logo Keraton Kasepuhan Cirebon" />
      </div>
      <div class="login-container__data">
        <div class="txtLogin">LOGIN</div>
        <div class="login-textfield">
          <input type="text" placeholder="Username" class="input-field" v-model="username" />
          <input type="password" placeholder="Password" class="input-field" v-model="password" />
        </div>
        <div class="login-button">
          <button class="login-btn" @click="checkLogin()">Login</button>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
main {
  font-family: 'Raleway';
}

.login {
  background-image: url(../assets/images/bglogin2.jpg);
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
}

.login-container {
  background-color: rgba(255, 255, 255, 0.8);
  padding: 2rem;
  border-radius: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.5);
  width: 400px; /* ukuran untuk layar desktop */
  height: auto;
  font-family: 'Poppins';
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 auto;
  height: 500px; /* tinggi card login */
}

.login-container__content-img {
  display: flex;
  justify-content: center;
  margin-bottom: 30px;
}

.login-container__content-img img {
  width: 150px;
  height: 150px;
}

.input-field {
  width: 100%;
  padding: 12px 20px;
  margin: 10px 0;
  box-sizing: border-box;
  border: 2px solid #ccc;
  border-radius: 20px;
  resize: none;
  font-size: 16px;
  background-color: rgba(255, 255, 255, 0.5);
  transition:
    border-color 0.3s,
    box-shadow 0.3s;
  outline: none;
}

.input-field:focus {
  border-color: #ffd978;
}

.input-field::placeholder {
  opacity: 0.5;
}
.login-button {
  width: 100%;
  text-align: center;
  margin-top: 30px;
}

.login-btn {
  width: 65%;
  padding: 12px 20px;
  margin: 8px 0;
  border: none;
  border-radius: 20px;
  background-color: #ffd978;
  color: black;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s;
  font-weight: bold;
}

.login-btn:hover {
  background-color: #e6be58;
}

.txtLogin {
  font-size: 24px;
  text-align: center;
  margin-bottom: 20px;
}

/* Media query untuk tablet dengan lebar maksimum 768px */
@media only screen and (max-width: 768px) {
  .login-container {
    width: 90%; /* Mengubah lebar container untuk tablet */
    padding: 1rem; /* Mengubah padding container untuk tablet */
    height: 450px; /* Mengubah tinggi card login untuk tablet */
  }

  .login-container__content-img img {
    width: 100px; /* Mengubah ukuran gambar untuk tablet */
    height: 100px; /* Mengubah ukuran gambar untuk tablet */
    margin-bottom: 20px; /* Mengubah margin bawah gambar untuk tablet */
  }

  .input-field {
    font-size: 14px; /* Mengubah ukuran font input untuk tablet */
    padding: 10px 15px; /* Mengubah padding input untuk tablet */
    margin: 8px 0; /* Mengubah margin input untuk tablet */
  }

  .login-btn {
    width: 70%; /* Mengubah lebar tombol login untuk tablet */
    padding: 10px 15px; /* Mengubah padding tombol login untuk tablet */
    font-size: 14px; /* Mengubah ukuran font tombol login untuk tablet */
  }

  .txtLogin {
    font-size: 20px; /* Mengubah ukuran font judul login untuk tablet */
    margin-bottom: 15px; /* Mengubah margin bawah judul login untuk tablet */
  }
}
</style>
