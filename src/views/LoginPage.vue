<script setup>
import LoginHelper from '@/utilities/LoginHelper'
import { useRouter } from 'vue-router'

const router = useRouter()
const { loggedIn, grantLogin, username, password, checkLogin } = LoginHelper

const login = () => {
  checkLogin()
  if (grantLogin.value) {
    setTimeout(() => {
      router.push('/')
      loggedIn.value = true
      grantLogin.value = false
    }, 1200)
  }
}
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
          <button class="login-btn" @click="login()">Login</button>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
.login {
  background-image: url(../assets/images/bglogin2.jpg);
  background-repeat: no-repeat;
  background-size: cover;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
}

.login-container {
  background-color: rgba(255, 255, 255, 0.8);
  padding: 2rem;
  border-radius: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.5); /* Bayangan */
  width: 400px; /* Lebar kontainer login */
  height: auto;
  font-family: 'Poppins';
  display: flex;
  flex-direction: column;
  align-items: center;
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
  border: 1px solid #ccc;
  border-radius: 20px;
  resize: none;
  font-size: 16px;
  background-color: rgba(255, 255, 255, 0.5);
  border-color: rgb(42, 42, 42);
}

.input-field::placeholder {
  opacity: 0.5;
}
.login-button {
  width: 100%;
  text-align: center;
  margin-top: 60px;
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
</style>
