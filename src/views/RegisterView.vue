<template>
  <section class="auth-page">
    <div class="auth-card">
      <h1>{{ t('auth.registerTitle') }}</h1>
      <p class="sub">TIPSA marketplace account setup</p>

      <form class="form" @submit.prevent="handleRegister">
        <label>
          {{ t('auth.fullName') }}
          <input v-model="form.name" type="text" required />
        </label>

        <label>
          {{ t('auth.email') }}
          <input v-model="form.email" type="email" required />
        </label>

        <label>
          {{ t('auth.password') }}
          <input v-model="form.password" type="password" required minlength="6" />
        </label>

        <label>
          {{ t('auth.role') }}
          <select v-model="form.role">
            <option value="customer">{{ t('auth.customer') }}</option>
            <option value="seller">{{ t('auth.seller') }}</option>
            <option value="admin">{{ t('auth.admin') }}</option>
          </select>
        </label>

        <button class="cta" type="submit" :disabled="loading">
          {{ loading ? 'Creating...' : t('auth.registerButton') }}
        </button>
      </form>

      <p v-if="error" class="error">{{ error }}</p>
      <p class="switch">
        {{ t('auth.haveAccount') }}
        <router-link to="/login">{{ t('nav.login') }}</router-link>
      </p>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth } from '../auth/composables/useAuth'
import { useI18n } from '../composables/useI18n'
import { useAppStore } from '../composables/useAppStore'

const { t } = useI18n()
const router = useRouter()
const { register } = useAuth()
const { setUser } = useAppStore()

const loading = ref(false)
const error = ref('')
const form = ref({
  name: '',
  email: '',
  password: '',
  role: 'customer',
})

async function handleRegister() {
  loading.value = true
  error.value = ''
  try {
    await register(form.value.email, form.value.password, form.value.name)
    setUser({
      id: crypto.randomUUID(),
      name: form.value.name,
      email: form.value.email,
      role: form.value.role,
    })
    localStorage.setItem('authToken', 'mock-token')

    if (form.value.role === 'admin') {
      router.push('/dashboard/admin')
    } else if (form.value.role === 'seller') {
      router.push('/dashboard/seller')
    } else {
      router.push('/dashboard/customer')
    }
  } catch (err) {
    error.value = err.message || 'Registration failed.'
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.auth-page {
  min-height: calc(100vh - 72px);
  display: grid;
  place-items: center;
  padding: 1.25rem;
}

.auth-card {
  width: min(480px, 100%);
  background: var(--surface);
  border-radius: 20px;
  border: 1px solid var(--border);
  box-shadow: var(--shadow-soft);
  padding: 1.4rem;
}

h1 {
  font-size: 1.5rem;
  margin-bottom: 0.2rem;
}

.sub {
  color: var(--text-secondary);
  margin-bottom: 1rem;
}

.form {
  display: grid;
  gap: 0.8rem;
}

label {
  display: grid;
  gap: 0.35rem;
  font-size: 0.88rem;
  color: var(--text-secondary);
}

input,
select {
  height: 42px;
  border-radius: 10px;
  border: 1px solid var(--border);
  padding: 0 0.8rem;
  background: var(--surface-soft);
  color: var(--text-primary);
}

.cta {
  margin-top: 0.3rem;
  border: 0;
  border-radius: 10px;
  height: 44px;
  background: var(--brand);
  color: #fff;
  font-weight: 700;
}

.error {
  margin-top: 0.7rem;
  background: #ffedf0;
  color: #b31f43;
  border-radius: 10px;
  padding: 0.6rem;
}

.switch {
  margin-top: 1rem;
  color: var(--text-secondary);
}

.switch a {
  color: var(--brand);
  font-weight: 700;
}
</style>
