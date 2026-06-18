<template>
  <section class="container page-stack">
    <header class="card hero">
      <div>
        <h1>Customer Dashboard</h1>
        <p>Track orders, manage profile, wishlist, addresses, and product reviews.</p>
      </div>
      <router-link class="btn-primary" to="/marketplace">Continue shopping</router-link>
    </header>

    <section class="grid stats-grid">
      <article class="card stat">
        <h3>Total Orders</h3>
        <strong>32</strong>
      </article>
      <article class="card stat">
        <h3>Active Orders</h3>
        <strong>4</strong>
      </article>
      <article class="card stat">
        <h3>Wishlist Items</h3>
        <strong>{{ state.wishlist.length }}</strong>
      </article>
      <article class="card stat">
        <h3>Saved Addresses</h3>
        <strong>3</strong>
      </article>
    </section>

    <section class="grid two-col">
      <article class="card">
        <h2>Order History</h2>
        <ul class="list">
          <li v-for="order in orders" :key="order.id">
            <div>
              <strong>{{ order.id }}</strong>
              <p class="muted">{{ order.date }}</p>
            </div>
            <span class="badge">{{ order.status }}</span>
            <strong>${{ order.total }}</strong>
          </li>
        </ul>
      </article>

      <article class="card">
        <h2>Wishlist Preview</h2>
        <ul class="list">
          <li v-for="product in wishlistItems" :key="product.id">
            <span>{{ product.name }}</span>
            <strong>${{ product.price }}</strong>
          </li>
          <li v-if="!wishlistItems.length" class="muted">No wishlist items yet.</li>
        </ul>
      </article>
    </section>
  </section>
</template>

<script setup>
import { computed } from 'vue'
import { orders, products } from '../data/mockData'
import { useAppStore } from '../composables/useAppStore'

const { state } = useAppStore()

const wishlistItems = computed(() => products.filter((product) => state.wishlist.includes(product.id)))
</script>

<style scoped>
.page-stack {
  padding-top: 1rem;
  padding-bottom: 2rem;
  display: grid;
  gap: 1rem;
}

.hero {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  padding: 1.1rem;
}

.stats-grid {
  grid-template-columns: repeat(4, minmax(0, 1fr));
}

.stat strong {
  font-size: 1.7rem;
  color: var(--brand);
}

.two-col {
  grid-template-columns: 1.5fr 1fr;
}

h2 {
  margin-bottom: 0.7rem;
}

.list {
  display: grid;
  gap: 0.55rem;
}

.list li {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.6rem;
  border: 1px solid var(--border);
  border-radius: 10px;
  padding: 0.55rem;
}

.badge {
  border-radius: 999px;
  background: var(--surface-soft);
  padding: 0.2rem 0.55rem;
}

@media (max-width: 960px) {
  .stats-grid,
  .two-col {
    grid-template-columns: 1fr;
  }

  .hero {
    flex-direction: column;
    align-items: flex-start;
  }
}
</style>
