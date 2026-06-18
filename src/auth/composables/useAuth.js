import { computed } from 'vue'
import { useAppStore } from '../../composables/useAppStore'

export function useAuth() {
  const { state, setUser, clearUser } = useAppStore()

  const currentUser = computed(() => state.user)
  const isAuthenticated = computed(() => !!state.user)

  const login = async (email, password) => {
    if (!email || !password) {
      throw new Error('Email and password are required.')
    }

    const role = email.includes('admin')
      ? 'admin'
      : email.includes('seller')
        ? 'seller'
        : 'customer'

    const user = {
      id: crypto.randomUUID(),
      name: email.split('@')[0],
      email,
      role,
    }

    setUser(user)
    localStorage.setItem('authToken', 'mock-token')

    return {
      token: 'mock-token',
      user,
    }
  }

  const logout = () => {
    clearUser()
    localStorage.removeItem('authToken')
  }

  const register = async (email, password, name) => {
    if (!email || !password || !name) {
      throw new Error('Please complete all registration fields.')
    }

    return { ok: true }
  }

  const checkAuth = () => {
    const token = localStorage.getItem('authToken')
    return !!token
  }

  return {
    currentUser,
    isAuthenticated,
    login,
    logout,
    register,
    checkAuth,
  }
}
