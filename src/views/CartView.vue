<template>
  <section class="page">
    <h1>{{ t('nav.cart') }}</h1>

    <div class="layout" v-if="state.cart.length">
      <section class="card list">
        <article v-for="item in state.cart" :key="item.id" class="cart-item">
          <img :src="item.image" :alt="item.name" />
          <div>
            <h3>{{ item.name }}</h3>
            <p>${{ item.price }}</p>
          </div>
          <input
            :value="item.quantity"
            type="number"
            min="1"
            @input="updateQuantity(item.id, Number($event.target.value))"
          />
          <button class="link" @click="removeFromCart(item.id)">Remove</button>
        </article>
      </section>

      <aside class="card summary">
        <label>
          Coupon
          <input v-model="coupon" placeholder="SAVE10" />
        </label>
        <button class="outline" @click="applyCoupon">{{ t('common.applyCoupon') }}</button>

        <p>Subtotal: ${{ cartSubtotal.toFixed(2) }}</p>
        <p>Discount: -${{ discount.toFixed(2) }}</p>
        <p class="total">Total: ${{ total.toFixed(2) }}</p>

        <router-link class="solid" to="/checkout">{{ t('common.checkout') }}</router-link>
      </aside>
    </div>

    <div v-else class="card">Your cart is empty.</div>
  </section>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useAppStore } from '../composables/useAppStore'
import { useI18n } from '../composables/useI18n'

const { t } = useI18n()
const { state, cartSubtotal, updateQuantity, removeFromCart } = useAppStore()

const coupon = ref('')
const discount = ref(0)

const total = computed(() => Math.max(cartSubtotal.value - discount.value, 0))

function applyCoupon() {
  discount.value = coupon.value.trim().toUpperCase() === 'SAVE10' ? cartSubtotal.value * 0.1 : 0
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

.list {
  display: grid;
  gap: 0.6rem;
}

.cart-item {
  display: grid;
  grid-template-columns: 82px 1fr 82px auto;
  gap: 0.6rem;
  align-items: center;
  border: 1px solid var(--border);
  border-radius: 12px;
  padding: 0.5rem;
}

.cart-item img {
  width: 82px;
  height: 82px;
  object-fit: cover;
  border-radius: 10px;
}

.cart-item h3 {
  font-size: 0.95rem;
}

.cart-item p {
  color: var(--text-secondary);
}

.cart-item input {
  width: 70px;
  height: 34px;
  border-radius: 8px;
  border: 1px solid var(--border);
  padding: 0 0.4rem;
}

.link {
  border: 0;
  background: transparent;
  color: #c43357;
  font-weight: 700;
}

.summary {
  display: grid;
  gap: 0.7rem;
  align-content: start;
}

label {
  display: grid;
  gap: 0.35rem;
  font-size: 0.8rem;
  color: var(--text-secondary);
}

label input {
  height: 40px;
  border: 1px solid var(--border);
  border-radius: 10px;
  padding: 0 0.7rem;
  background: var(--surface-soft);
  color: var(--text-primary);
}

.outline,
.solid {
  border-radius: 10px;
  height: 40px;
  display: grid;
  place-items: center;
  font-weight: 700;
}

.outline {
  border: 1px solid var(--border);
  background: var(--surface-soft);
}

.solid {
  border: 0;
  background: var(--brand);
  color: #fff;
}

.total {
  font-size: 1.2rem;
  font-weight: 700;
}

@media (max-width: 880px) {
  .layout {
    grid-template-columns: 1fr;
  }

  .cart-item {
    grid-template-columns: 72px 1fr;
  }
}
</style>
