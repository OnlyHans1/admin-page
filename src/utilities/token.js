import { ref } from 'vue'

const expirationTime = 3600 * 1000;
const tokenExpiration = Date.now() + expirationTime;

localStorage.setItem('token', 'your_jwt_token');
localStorage.setItem('tokenExpiration', tokenExpiration);

const timeout = setTimeout(() => {
    logout();
}, expirationTime);

function logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('tokenExpiration');
    router.push('/login');
}

export default {
    logout
}