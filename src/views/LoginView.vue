<template>
  <section class="login-page container">
    <div class="login-card card">
      <h1>{{ t('auth.loginTitle') }}</h1>
      <p class="muted">Use any email containing customer, seller, or admin to test roles.</p>

      <form @submit.prevent="handleLogin" class="login-form">
        <label>
          {{ t('auth.email') }}
          <input
            v-model="formData.email"
            type="email"
            placeholder="seller.demo@tipsa.com"
            required
          />
        </label>

        <label>
          {{ t('auth.password') }}
          <input
            v-model="formData.password"
            type="password"
            placeholder="********"
            required
          />
        </label>

        <button type="submit" class="btn-primary" :disabled="loading">
          {{ loading ? 'Signing in...' : t('auth.loginButton') }}
        </button>
      </form>

      <p v-if="error" class="error-message">{{ error }}</p>

      <div class="login-footer">
        <p>{{ t('auth.noAccount') }} <router-link to="/register">{{ t('nav.register') }}</router-link></p>
      </div>
    </div>
  </section>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useAuth } from '../auth/composables/useAuth'
import { useI18n } from '../composables/useI18n'

const router = useRouter()
const route = useRoute()
const { login } = useAuth()
const { t } = useI18n()

const formData = ref({
  email: '',
  password: '',
})

const loading = ref(false)
const error = ref('')

const handleLogin = async () => {
  loading.value = true
  error.value = ''

  try {
    await login(formData.value.email, formData.value.password)
    const redirect = route.query.redirect || '/'
    router.push(redirect)
  } catch (err) {
    error.value = err.message || 'Login failed. Please try again.'
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  if (typeof route.query.email === 'string') {
    formData.value.email = route.query.email
  }
})
</script>

<style scoped>
.login-page {
  min-height: calc(100vh - 72px);
  display: grid;
  place-items: center;
  padding-top: 1rem;
  padding-bottom: 2rem;
}

.login-card {
  width: 100%;
  max-width: 440px;
  padding: 1.4rem;
}

.login-card h1 {
  font-size: 1.5rem;
}

.login-form {
  margin-top: 1rem;
  display: grid;
  gap: 0.8rem;
}

label {
  display: grid;
  gap: 0.35rem;
  font-weight: 600;
}

input {
  height: 42px;
  padding: 0 0.8rem;
  border: 1px solid var(--border);
  border-radius: 10px;
  background: var(--surface-soft);
  color: var(--text-primary);
}

.btn-primary {
  margin-top: 0.2rem;
  height: 42px;
}

.btn-primary:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.error-message {
  color: #b31f43;
  font-size: 0.9rem;
  margin-top: 0.8rem;
  background: #ffedf0;
  border-radius: 10px;
  padding: 0.6rem;
}

.login-footer {
  margin-top: 1rem;
  color: var(--text-secondary);
}

.login-footer a {
  color: var(--brand);
  font-weight: 700;
}
</style>
