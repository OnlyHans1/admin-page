import { createRouter, createWebHistory } from 'vue-router'
import LoginPage from '@/views/LoginPage.vue'
import DashboardView from '../views/DashboardView.vue'
import AddView from '../views/AddView.vue'
import CheckoutView from '../views/CheckoutView.vue'
import InvoiceView from '../views/InvoiceView.vue'
import ReportView from '../views/ReportView.vue'
import AfterCheckoutView from '../views/AfterCheckoutView.vue'

import authMiddleware from './authmiddleware'; // Lokasi middleware Anda

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: LoginPage
    },
    {
      path: '/',
      name: 'dashboard',
      component: DashboardView,
      meta: { 
        protected: true
      }
    },
    {
      path: '/add',
      name: 'add',
      component: AddView,
      meta: { 
        protected: true
      }
    },
    {
      path: '/edit/:id',
      name: 'edit',
      component: AddView,
      meta: { 
        protected: true
      }
    },
    {
      path: '/checkout',
      name: 'checkout',
      component: CheckoutView,
      meta: { 
        protected: true
      }
    },
    {
      path: '/invoice',
      name: 'invoice',
      component: InvoiceView,
      meta: { 
        protected: true
      }
    },
    {
      path: '/report',
      name: 'report',
      component: ReportView,
      meta: { 
        protected: true
      }
    },
    {
      path: '/after-checkout',
      name: 'after-checkout',
      component: AfterCheckoutView,
      meta: { 
        protected: true
      }
    },
    {
      path: '/:pathMatch(.*)*',
      name: '404',
      redirect: { name: 'dashboard' }
    },
  ]
})

// Navigation Guards
router.beforeEach((to, from, next) => {
  if (to.meta.protected) {
    const isLoggedIn = localStorage.getItem('isLoggedIn'); // status di localStorage
    if (!isLoggedIn) {
      next({ name: 'login' });
    } else {
      next();
    }
  } else {
    next();
  }
})

export default router
