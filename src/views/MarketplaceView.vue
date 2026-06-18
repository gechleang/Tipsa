<template>
  <section class="page market-page">
    <header class="market-hero card">
      <div>
        <h1>{{ t('common.trending') }}</h1>
        <p>{{ t('app.tagline') }}</p>
      </div>
      <input v-model="search" :placeholder="t('common.search')" />
    </header>

    <section class="filters card">
      <label>
        Category
        <select v-model="selectedCategory">
          <option value="All">All</option>
          <option v-for="category in categories" :key="category" :value="category">{{ category }}</option>
        </select>
      </label>
      <label>
        Max Price: ${{ maxPrice }}
        <input v-model.number="maxPrice" type="range" min="10" max="120" />
      </label>
      <label>
        Min Rating: {{ minRating.toFixed(1) }}
        <input v-model.number="minRating" type="range" min="0" max="5" step="0.1" />
      </label>
    </section>

    <section class="product-grid">
      <ProductCard
        v-for="item in filteredProducts"
        :key="item.id"
        :product="item"
        @quick-view="preview = $event"
      />
    </section>

    <dialog class="quick-view" :open="!!preview">
      <template v-if="preview">
        <img :src="preview.images[0]" :alt="preview.name" />
        <div>
          <h3>{{ preview.name }}</h3>
          <p>{{ preview.description }}</p>
          <button @click="preview = null">Close</button>
        </div>
      </template>
    </dialog>
  </section>
</template>

<script setup>
import { computed, ref } from 'vue'
import ProductCard from '../components/ProductCard.vue'
import { categories, products } from '../data/mockData'
import { useI18n } from '../composables/useI18n'

const { t } = useI18n()
const search = ref('')
const selectedCategory = ref('All')
const maxPrice = ref(120)
const minRating = ref(0)
const preview = ref(null)

const filteredProducts = computed(() =>
  products.filter((item) => {
    const bySearch = item.name.toLowerCase().includes(search.value.toLowerCase())
    const byCategory = selectedCategory.value === 'All' || item.category === selectedCategory.value
    const byPrice = item.price <= maxPrice.value
    const byRating = item.rating >= minRating.value
    return bySearch && byCategory && byPrice && byRating
  }),
)
</script>

<style scoped>
.page {
  max-width: 1240px;
  margin: 0 auto;
  padding: 1rem;
  display: grid;
  gap: 1rem;
}

.card {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 16px;
  box-shadow: var(--shadow-soft);
  padding: 1rem;
}

.market-hero {
  display: grid;
  grid-template-columns: 1fr minmax(260px, 420px);
  gap: 1rem;
  align-items: center;
}

.market-hero h1 {
  font-size: clamp(1.4rem, 3vw, 2rem);
}

.market-hero p {
  color: var(--text-secondary);
}

.market-hero input {
  height: 48px;
  border-radius: 12px;
  border: 1px solid var(--border);
  background: var(--surface-soft);
  color: var(--text-primary);
  padding: 0 0.9rem;
}

.filters {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 0.8rem;
}

label {
  font-size: 0.8rem;
  color: var(--text-secondary);
  display: grid;
  gap: 0.4rem;
}

select,
input[type='range'] {
  width: 100%;
}

.product-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 0.85rem;
}

.quick-view {
  margin: auto;
  border: 1px solid var(--border);
  border-radius: 16px;
  padding: 0;
  width: min(660px, 92vw);
}

.quick-view::backdrop {
  background: rgba(0, 0, 0, 0.45);
}

.quick-view[open] {
  display: grid;
  grid-template-columns: 1fr 1fr;
}

.quick-view img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.quick-view div {
  padding: 1rem;
  display: grid;
  align-content: start;
  gap: 0.7rem;
}

.quick-view button {
  border: 0;
  background: var(--brand);
  color: #fff;
  border-radius: 10px;
  height: 38px;
  width: 100px;
}

@media (max-width: 1024px) {
  .product-grid {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
}

@media (max-width: 760px) {
  .market-hero,
  .filters,
  .quick-view[open] {
    grid-template-columns: 1fr;
  }

  .product-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}
</style>
