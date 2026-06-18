import { createRouter, createWebHistory } from 'vue-router'
import { setupAuthGuard } from '../auth/guards/authGuard'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import RegisterView from '../views/RegisterView.vue'
import MarketplaceView from '../views/MarketplaceView.vue'
import ProductDetailsView from '../views/ProductDetailsView.vue'
import CartView from '../views/CartView.vue'
import CheckoutView from '../views/CheckoutView.vue'
import CustomerDashboardView from '../views/CustomerDashboardView.vue'
import SellerDashboardView from '../views/SellerDashboardView.vue'
import StoreProfileView from '../views/StoreProfileView.vue'
import OrderManagementView from '../views/OrderManagementView.vue'
import ChatView from '../views/ChatView.vue'
import AdminDashboardView from '../views/AdminDashboardView.vue'
import SettingsView from '../views/SettingsView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
  },
  {
    path: '/marketplace',
    name: 'marketplace',
    component: MarketplaceView,
  },
  {
    path: '/product/:id',
    name: 'product-details',
    component: ProductDetailsView,
  },
  {
    path: '/cart',
    name: 'cart',
    component: CartView,
  },
  {
    path: '/checkout',
    name: 'checkout',
    component: CheckoutView,
    meta: { requiresAuth: true },
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView,
  },
  {
    path: '/register',
    name: 'register',
    component: RegisterView,
  },
  {
    path: '/dashboard/customer',
    name: 'customer-dashboard',
    component: CustomerDashboardView,
    meta: { requiresAuth: true, requiresRole: 'customer' },
  },
  {
    path: '/dashboard/seller',
    name: 'seller-dashboard',
    component: SellerDashboardView,
    meta: { requiresAuth: true, requiresRole: 'seller' },
  },
  {
    path: '/dashboard/admin',
    name: 'admin-dashboard',
    component: AdminDashboardView,
    meta: { requiresAuth: true, requiresRole: 'admin' },
  },
  {
    path: '/store/:id',
    name: 'store-profile',
    component: StoreProfileView,
  },
  {
    path: '/orders',
    name: 'order-management',
    component: OrderManagementView,
    meta: { requiresAuth: true },
  },
  {
    path: '/chat',
    name: 'chat',
    component: ChatView,
    meta: { requiresAuth: true },
  },
  {
    path: '/settings',
    name: 'settings',
    component: SettingsView,
    meta: { requiresAuth: true },
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

setupAuthGuard(router)

export default router
