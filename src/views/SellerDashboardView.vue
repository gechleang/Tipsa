<template>
  <section class="container page-stack">
    <header class="card hero">
      <div>
        <h1>Seller Dashboard</h1>
        <p>Monitor revenue, orders, inventory, customer messages, and promotions.</p>
      </div>
      <router-link class="btn-primary" to="/store/s1">View store profile</router-link>
    </header>

    <section class="grid stats-grid">
      <article class="card stat"><h3>Revenue (MTD)</h3><strong>$19,420</strong></article>
      <article class="card stat"><h3>Orders</h3><strong>204</strong></article>
      <article class="card stat"><h3>Inventory Alerts</h3><strong>6</strong></article>
      <article class="card stat"><h3>Unread Messages</h3><strong>14</strong></article>
    </section>

    <section class="grid two-col">
      <article class="card chart">
        <h2>Revenue Trend</h2>
        <div class="chart-bars">
          <span style="--h: 30%"></span>
          <span style="--h: 45%"></span>
          <span style="--h: 52%"></span>
          <span style="--h: 60%"></span>
          <span style="--h: 67%"></span>
          <span style="--h: 78%"></span>
          <span style="--h: 88%"></span>
        </div>
      </article>

      <article class="card">
        <h2>Inventory Tracking</h2>
        <ul class="table">
          <li v-for="product in products" :key="product.id">
            <span>{{ product.name }}</span>
            <strong :class="{ low: product.inventory < 35 }">{{ product.inventory }} in stock</strong>
          </li>
        </ul>
      </article>
    </section>

    <section class="card">
      <h2>Product Management</h2>
      <div class="table-header">
        <span>Product</span>
        <span>Price</span>
        <span>Sold</span>
        <span>Actions</span>
      </div>
      <div v-for="product in products" :key="product.id" class="table-row">
        <span>{{ product.name }}</span>
        <span>${{ product.price }}</span>
        <span>{{ product.sold }}</span>
        <span class="actions">
          <button class="btn-outline">Edit</button>
          <button class="btn-outline danger">Delete</button>
        </span>
      </div>
    </section>
  </section>
</template>

<script setup>
import { products } from '../data/mockData'
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
}

.stats-grid {
  grid-template-columns: repeat(4, minmax(0, 1fr));
}

.stat strong {
  color: var(--brand);
  font-size: 1.55rem;
}

.two-col {
  grid-template-columns: 1.5fr 1fr;
}

.chart-bars {
  height: 160px;
  display: flex;
  gap: 0.6rem;
  align-items: flex-end;
}

.chart-bars span {
  flex: 1;
  height: var(--h);
  background: linear-gradient(180deg, color-mix(in srgb, var(--brand) 60%, #fff) 0%, var(--brand) 100%);
  border-radius: 8px 8px 4px 4px;
}

.table {
  display: grid;
  gap: 0.55rem;
}

.table li {
  border: 1px solid var(--border);
  border-radius: 10px;
  padding: 0.6rem;
  display: flex;
  justify-content: space-between;
}

.low {
  color: #c94d2f;
}

.table-header,
.table-row {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr;
  gap: 0.5rem;
  align-items: center;
}

.table-header {
  margin-top: 0.6rem;
  padding-bottom: 0.6rem;
  font-weight: 700;
  border-bottom: 1px solid var(--border);
}

.table-row {
  padding: 0.55rem 0;
  border-bottom: 1px dashed var(--border);
}

.actions {
  display: flex;
  gap: 0.35rem;
}

.danger {
  color: #c43357;
}

@media (max-width: 980px) {
  .hero {
    flex-direction: column;
    align-items: flex-start;
  }

  .stats-grid,
  .two-col,
  .table-header,
  .table-row {
    grid-template-columns: 1fr;
  }
}
</style>
