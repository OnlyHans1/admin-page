import './assets/style/base.css'
import './assets/style/main.css'
import './assets/style/layout.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import VueApexCharts from 'vue3-apexcharts';
import router from './router'

const app = createApp(App)
app.use(VueApexCharts);

app.use(createPinia())
app.use(router)

app.mount('#app')
