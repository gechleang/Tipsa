import { useAuth } from '../composables/useAuth'

export function setupAuthGuard(router) {
  router.beforeEach((to, from, next) => {
    const { isAuthenticated, currentUser } = useAuth()
    const requiresAuth = to.matched.some((record) => record.meta.requiresAuth)
    const requiredRole = to.meta.requiresRole

    if (requiresAuth && !isAuthenticated.value) {
      next({ name: 'login', query: { redirect: to.fullPath } })
    } else if (to.name === 'login' && isAuthenticated.value) {
      if (currentUser.value?.role === 'admin') {
        next({ name: 'admin-dashboard' })
      } else if (currentUser.value?.role === 'seller') {
        next({ name: 'seller-dashboard' })
      } else {
        next({ name: 'customer-dashboard' })
      }
    } else if (requiredRole && currentUser.value?.role !== requiredRole) {
      next({ name: 'marketplace' })
    } else {
      next()
    }
  })
}
