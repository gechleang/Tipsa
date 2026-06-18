import { computed, reactive } from 'vue'

const KEY = 'tipsa-app-store'

const defaultState = {
  language: 'en',
  theme: 'light',
  wishlist: [],
  cart: [],
  user: null,
}

const hydrated = (() => {
  try {
    const raw = localStorage.getItem(KEY)
    if (!raw) {
      return defaultState
    }
    return { ...defaultState, ...JSON.parse(raw) }
  } catch {
    return defaultState
  }
})()

const state = reactive(hydrated)

function persist() {
  localStorage.setItem(KEY, JSON.stringify(state))
}

function setLanguage(language) {
  state.language = language
  persist()
}

function toggleTheme() {
  state.theme = state.theme === 'light' ? 'dark' : 'light'
  document.documentElement.setAttribute('data-theme', state.theme)
  persist()
}

function applyTheme() {
  document.documentElement.setAttribute('data-theme', state.theme)
}

function setUser(user) {
  state.user = user
  persist()
}

function clearUser() {
  state.user = null
  persist()
}

function toggleWishlist(productId) {
  const exists = state.wishlist.includes(productId)
  state.wishlist = exists
    ? state.wishlist.filter((id) => id !== productId)
    : [...state.wishlist, productId]
  persist()
}

function addToCart(product, quantity = 1) {
  const existing = state.cart.find((item) => item.id === product.id)
  if (existing) {
    existing.quantity += quantity
  } else {
    state.cart.push({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.images[0],
      quantity,
    })
  }
  persist()
}

function updateQuantity(productId, quantity) {
  const item = state.cart.find((entry) => entry.id === productId)
  if (!item) return
  item.quantity = Math.max(1, quantity)
  persist()
}

function removeFromCart(productId) {
  state.cart = state.cart.filter((item) => item.id !== productId)
  persist()
}

function clearCart() {
  state.cart = []
  persist()
}

export function useAppStore() {
  const cartCount = computed(() => state.cart.reduce((sum, item) => sum + item.quantity, 0))
  const cartSubtotal = computed(() =>
    state.cart.reduce((sum, item) => sum + item.price * item.quantity, 0),
  )

  return {
    state,
    cartCount,
    cartSubtotal,
    setLanguage,
    toggleTheme,
    applyTheme,
    setUser,
    clearUser,
    toggleWishlist,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
  }
}
