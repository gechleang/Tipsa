<template>
  <header class="app-header">
    <div class="app-header__inner">
      <router-link class="brand" to="/">
        <span>TIPSA</span>
        <small>{{ t('app.tagline') }}</small>
      </router-link>

      <nav class="nav-links" :class="{ 'is-open': mobileOpen }">
        <router-link to="/">{{ t('nav.home') }}</router-link>
        <router-link to="/marketplace">{{ t('nav.market') }}</router-link>
        <router-link to="/cart">{{ t('nav.cart') }} ({{ cartCount }})</router-link>
        <router-link to="/chat">{{ t('nav.chat') }}</router-link>
        <router-link to="/dashboard/customer">{{ t('nav.customer') }}</router-link>
        <router-link to="/dashboard/seller">{{ t('nav.seller') }}</router-link>
        <router-link to="/dashboard/admin">{{ t('nav.admin') }}</router-link>
      </nav>

      <div class="toolbar">
        <button class="ghost" @click="setLanguage(language === 'en' ? 'km' : 'en')">
          {{ language === 'en' ? 'ខ្មែរ' : 'EN' }}
        </button>
        <button class="ghost" @click="toggleTheme">
          {{ state.theme === 'light' ? t('nav.darkMode') : t('nav.lightMode') }}
        </button>
        <router-link v-if="!state.user" class="solid" to="/login">{{ t('nav.login') }}</router-link>
        <button v-else class="solid" @click="logout">{{ t('nav.logout') }}</button>
        <button class="menu" @click="mobileOpen = !mobileOpen" aria-label="Toggle navigation">
          <span></span><span></span><span></span>
        </button>
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from '../composables/useI18n'
import { useAppStore } from '../composables/useAppStore'
import { useAuth } from '../auth/composables/useAuth'

const mobileOpen = ref(false)
const router = useRouter()
const { t, language, setLanguage } = useI18n()
const { state, cartCount, toggleTheme } = useAppStore()
const { logout: logoutAction } = useAuth()

function logout() {
  logoutAction()
  router.push('/login')
}
</script>

<style scoped>
.app-header {
  position: sticky;
  top: 0;
  z-index: 40;
  backdrop-filter: blur(10px);
  background: color-mix(in srgb, var(--surface) 84%, transparent);
  border-bottom: 1px solid var(--border);
}

.app-header__inner {
  max-width: 1240px;
  margin: 0 auto;
  min-height: 72px;
  display: grid;
  grid-template-columns: 1fr auto auto;
  align-items: center;
  gap: 1rem;
  padding: 0.8rem 1rem;
}

.brand {
  display: grid;
  gap: 0.05rem;
  font-weight: 700;
  color: var(--text-primary);
}

.brand span {
  font-size: 1.15rem;
  letter-spacing: 0.08em;
}

.brand small {
  color: var(--text-secondary);
  font-size: 0.72rem;
}

.nav-links {
  display: flex;
  gap: 0.9rem;
  align-items: center;
}

.nav-links a {
  color: var(--text-secondary);
  font-weight: 600;
  font-size: 0.9rem;
  padding: 0.35rem 0.6rem;
  border-radius: 999px;
}

.nav-links a.router-link-active {
  color: var(--text-primary);
  background: var(--surface-soft);
}

.toolbar {
  display: flex;
  align-items: center;
  gap: 0.55rem;
}

.ghost,
.solid,
.menu {
  border-radius: 999px;
  border: 1px solid var(--border);
  padding: 0.45rem 0.8rem;
  font-weight: 600;
  font-size: 0.82rem;
  cursor: pointer;
  background: var(--surface);
  color: var(--text-primary);
}

.solid {
  background: var(--brand);
  color: #fff;
  border-color: var(--brand);
}

.menu {
  display: none;
  width: 42px;
  height: 38px;
  align-items: center;
  justify-content: center;
  padding: 0.2rem;
}

.menu span {
  display: block;
  width: 18px;
  height: 2px;
  background: currentColor;
  margin: 2px 0;
}

@media (max-width: 1024px) {
  .app-header__inner {
    grid-template-columns: 1fr auto;
  }

  .menu {
    display: inline-flex;
  }

  .nav-links {
    position: fixed;
    left: 1rem;
    right: 1rem;
    top: 72px;
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: 14px;
    box-shadow: var(--shadow-soft);
    display: none;
    flex-direction: column;
    align-items: stretch;
    padding: 0.8rem;
  }

  .nav-links.is-open {
    display: flex;
  }
}
</style>
