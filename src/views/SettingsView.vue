<template>
  <section class="container page-stack">
    <header class="card">
      <h1>Settings</h1>
      <p class="muted">Manage account, notification, language, and platform preferences.</p>
    </header>

    <section class="grid two-col">
      <article class="card">
        <h2>Account</h2>
        <label>
          Display Name
          <input v-model="profile.name" />
        </label>
        <label>
          Email
          <input v-model="profile.email" />
        </label>
      </article>

      <article class="card">
        <h2>Preferences</h2>
        <label class="switch-row">
          <span>Dark mode</span>
          <input type="checkbox" :checked="state.theme === 'dark'" @change="toggleTheme" />
        </label>

        <label>
          Language
          <select :value="language" @change="setLanguage($event.target.value)">
            <option value="en">English</option>
            <option value="km">Khmer</option>
          </select>
        </label>
      </article>
    </section>

    <article class="card">
      <h2>Notifications</h2>
      <label class="switch-row"><span>Order updates</span><input type="checkbox" checked /></label>
      <label class="switch-row"><span>Promotions</span><input type="checkbox" checked /></label>
      <label class="switch-row"><span>Message alerts</span><input type="checkbox" checked /></label>
    </article>
  </section>
</template>

<script setup>
import { reactive } from 'vue'
import { useAppStore } from '../composables/useAppStore'
import { useI18n } from '../composables/useI18n'

const { state, toggleTheme } = useAppStore()
const { language, setLanguage } = useI18n()

const profile = reactive({
  name: state.user?.name || 'TIPSA User',
  email: state.user?.email || 'user@tipsa.com',
})
</script>

<style scoped>
.page-stack {
  padding-top: 1rem;
  padding-bottom: 2rem;
  display: grid;
  gap: 1rem;
}

.two-col {
  grid-template-columns: 1fr 1fr;
}

label {
  display: grid;
  gap: 0.4rem;
  margin-top: 0.7rem;
}

input,
select {
  border: 1px solid var(--border);
  border-radius: 10px;
  padding: 0.65rem;
  background: var(--surface-soft);
  color: var(--text-primary);
}

.switch-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

@media (max-width: 900px) {
  .two-col {
    grid-template-columns: 1fr;
  }
}
</style>
