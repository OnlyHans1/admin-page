import { createRouter, createWebHistory } from 'vue-router'
import DashboardView from '../views/DashboardView.vue'
import AddView from '../views/AddView.vue'
import CheckoutView from '../views/CheckoutView.vue'
import InvoiceView from '../views/InvoiceView.vue'
import ReportView from '../views/ReportView.vue'
import AfterCheckoutView from '../views/AfterCheckoutView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'dashboard',
      component: DashboardView
    },
    {
      path: '/add',
      name: 'add',
      component: AddView
    },
    {
      path: '/checkout',
      name: 'checkout',
      component: CheckoutView
    },
    {
      path: '/invoice',
      name: 'invoice',
      component: InvoiceView
    },
    {
      path: '/report',
      name: 'report',
      component: ReportView
    },
    {
      path: '/after-checkout',
      name: 'after-checkout',
      component: AfterCheckoutView
    },
  ]
})

export default router
