<template>
  <section class="container page-stack">
    <header class="card">
      <h1>Order Management</h1>
      <p class="muted">Track and process incoming marketplace orders.</p>
    </header>

    <section class="card">
      <div class="table-head">
        <span>Order ID</span>
        <span>Customer</span>
        <span>Status</span>
        <span>Date</span>
        <span>Total</span>
        <span>Actions</span>
      </div>

      <div v-for="order in orders" :key="order.id" class="table-row">
        <span>{{ order.id }}</span>
        <span>{{ order.customer }}</span>
        <span><b class="badge">{{ order.status }}</b></span>
        <span>{{ order.date }}</span>
        <span>${{ order.total }}</span>
        <span class="actions">
          <button class="btn-outline">Update</button>
          <button class="btn-outline">Invoice</button>
        </span>
      </div>
    </section>
  </section>
</template>

<script setup>
import { orders } from '../data/mockData'
</script>

<style scoped>
.page-stack {
  padding-top: 1rem;
  padding-bottom: 2rem;
  display: grid;
  gap: 1rem;
}

.table-head,
.table-row {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr;
  gap: 0.5rem;
  align-items: center;
}

.table-head {
  font-weight: 700;
  border-bottom: 1px solid var(--border);
  padding-bottom: 0.6rem;
}

.table-row {
  padding: 0.65rem 0;
  border-bottom: 1px dashed var(--border);
}

.badge {
  display: inline-block;
  background: var(--surface-soft);
  border-radius: 999px;
  padding: 0.2rem 0.6rem;
}

.actions {
  display: flex;
  gap: 0.4rem;
}

@media (max-width: 980px) {
  .table-head,
  .table-row {
    grid-template-columns: 1fr;
  }
}
</style>
