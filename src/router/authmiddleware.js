export default function (to, from, next) {
        console.log(to)
        console.log(from)
const isLoggedIn = localStorage.getItem('isLoggedIn'); // menyimpan status login di localStorage
if (!isLoggedIn && to.name !== 'login') {
        next({ name: 'login' }); // Redirect ke halaman login default
} else {
        next(); // Lanjutkan navigasi ke rute yang diminta
}
}