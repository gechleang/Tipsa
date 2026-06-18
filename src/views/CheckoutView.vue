<template>
  <section class="page">
    <h1>{{ t('common.checkout') }}</h1>

    <div class="layout">
      <form class="card form" @submit.prevent="placeOrder">
        <h2>Shipping details</h2>
        <label>
          Full Name
          <input v-model="form.name" required />
        </label>
        <label>
          Phone
          <input v-model="form.phone" required />
        </label>
        <label>
          Address
          <textarea v-model="form.address" rows="4" required></textarea>
        </label>

        <h3>Payment method</h3>
        <label v-for="method in methods" :key="method" class="payment">
          <input type="radio" name="payment" :value="method" v-model="form.paymentMethod" required />
          <span>{{ method }}</span>
        </label>

        <button class="solid" type="submit">Place order</button>
      </form>

      <aside class="card summary">
        <h2>Order summary</h2>
        <p v-for="item in state.cart" :key="item.id">
          {{ item.name }} x{{ item.quantity }}
          <strong>${{ (item.price * item.quantity).toFixed(2) }}</strong>
        </p>
        <p class="total">Total: ${{ cartSubtotal.toFixed(2) }}</p>
      </aside>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAppStore } from '../composables/useAppStore'
import { useI18n } from '../composables/useI18n'

const { t } = useI18n()
const router = useRouter()
const { state, cartSubtotal, clearCart } = useAppStore()

const methods = ['ABA Pay', 'ACLEDA Pay', 'Wing', 'Credit/Debit Card', 'Cash on Delivery']

const form = ref({
  name: '',
  phone: '',
  address: '',
  paymentMethod: '',
})

function placeOrder() {
  clearCart()
  router.push('/dashboard/customer')
}
</script>

<style scoped>
.page {
  max-width: 1240px;
  margin: 0 auto;
  padding: 1rem;
  display: grid;
  gap: 1rem;
}

.layout {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 1rem;
}

.card {
  border: 1px solid var(--border);
  border-radius: 16px;
  background: var(--surface);
  box-shadow: var(--shadow-soft);
  padding: 1rem;
}

.form {
  display: grid;
  gap: 0.75rem;
}

label {
  display: grid;
  gap: 0.35rem;
  font-size: 0.82rem;
  color: var(--text-secondary);
}

input,
textarea {
  border: 1px solid var(--border);
  border-radius: 10px;
  background: var(--surface-soft);
  color: var(--text-primary);
  padding: 0.65rem;
}

.payment {
  border: 1px solid var(--border);
  border-radius: 10px;
  padding: 0.55rem;
  grid-template-columns: auto 1fr;
  align-items: center;
}

.solid {
  margin-top: 0.4rem;
  height: 42px;
  border: 0;
  border-radius: 10px;
  background: var(--brand);
  color: #fff;
  font-weight: 700;
}

.summary p {
  display: flex;
  justify-content: space-between;
  gap: 0.8rem;
  color: var(--text-secondary);
  border-bottom: 1px dashed var(--border);
  padding-bottom: 0.3rem;
  margin-bottom: 0.3rem;
}

.summary .total {
  color: var(--text-primary);
  font-size: 1.2rem;
  font-weight: 700;
}

@media (max-width: 960px) {
  .layout {
    grid-template-columns: 1fr;
  }
}
</style>
