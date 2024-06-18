import { createRouter, createWebHistory } from 'vue-router'
import LoginPage from '@/views/LoginPage.vue'
import DashboardView from '@/views/DashboardView.vue'
import AddView from '@/views/AddView.vue'
import InvoiceView from '@/views/InvoiceView.vue'
import ReportView from '@/views/ReportView.vue'
import CheckoutView from '@/views/CheckoutView.vue'
import GenerateTicketsView from '@/views/GenerateTicketsView.vue'
import SettingsView from '@/views/SettingsView.vue'
import DatabaseLogsView from '@/views/DatabaseLogsView.vue'
import AfterCheckoutView from '@/views/AfterCheckoutView.vue'
import reportCurawedaView from '@/views/ReportViewCuraweda.vue'
import GlobalHelper from '@/utilities/GlobalHelper'
import LoginHelper from '@/utilities/LoginHelper'

const { giveAccessRoute, grantAccessRoute } = GlobalHelper
const { isAuthenticated } = LoginHelper

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
      meta: { protected: true }
    },
    {
      path: '/report-curaweda',
      name: 'reportCuraweda',
      component: reportCurawedaView,
      meta: { protected: true }
    },
    {
      path: '/add',
      name: 'add',
      component: AddView,
      meta: { protected: true }
    },
    {
      path: '/edit/:id',
      name: 'edit',
      component: AddView,
      meta: { protected: true }
    },
    {
      path: '/checkout',
      name: 'checkout',
      component: CheckoutView,
      meta: { protected: true }
    },
    {
      path: '/checkout/generate-tickets/:id',
      name: 'generateTickets',
      component: GenerateTicketsView,
      meta: { restrictAccess: true }
    },
    {
      path: '/invoice',
      name: 'invoice',
      component: InvoiceView,
      meta: { protected: true }
    },
    {
      path: '/report',
      name: 'report',
      component: ReportView,
      meta: { protected: true }
    },
    {
      path: '/settings',
      name: 'settings',
      component: SettingsView,
      meta: { protected: true }
    },
    {
      path: '/database-logs',
      name: 'databaseLogs',
      component: DatabaseLogsView,
      meta: { protected: true }
    },
    {
      path: '/after-checkout',
      name: 'after-checkout',
      component: AfterCheckoutView
    },

    {
      path: '/:pathMatch(.)',
      name: '404',
      redirect: { name: 'dashboard' }
    }
  ]
})

router.beforeEach(async (to, from, next) => {
  try {
    const authenticated = await isAuthenticated()
    if (to.meta.protected && !authenticated) {
      next('/login')
    } else if (to.path === '/login' && authenticated) {
      next(from)
    } else if (to.meta.restrictAccess && !giveAccessRoute.value) {
      next(from)
    } else {
      if (to.meta.restrictAccess) grantAccessRoute(false)
      next()
    }
  } catch (error) {
    console.error(error)
    next('/login')
  }
})

export default router
