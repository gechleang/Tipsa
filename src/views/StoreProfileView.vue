<template>
  <section class="container page-stack" v-if="store">
    <article class="cover card">
      <img :src="store.banner" :alt="store.name" />
      <div class="overlay">
        <img class="logo" :src="store.logo" :alt="store.name" />
        <div>
          <h1>{{ store.name }}</h1>
          <p>{{ store.bio }}</p>
          <p>⭐ {{ store.rating }} • {{ store.followers }} followers • Avg response {{ store.responseTime }}</p>
        </div>
      </div>
    </article>

    <article class="card">
      <h2>Store Products</h2>
      <div class="grid products-grid">
        <ProductCard v-for="product in storeProducts" :key="product.id" :product="product" />
      </div>
    </article>
  </section>

  <section v-else class="container page-stack">
    <article class="card">Store not found.</article>
  </section>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import ProductCard from '../components/ProductCard.vue'
import { products, sellers } from '../data/mockData'

const route = useRoute()

const store = computed(() => sellers.find((entry) => entry.id === route.params.id))
const storeProducts = computed(() => products.filter((entry) => entry.sellerId === route.params.id))
</script>

<style scoped>
.page-stack {
  padding-top: 1rem;
  padding-bottom: 2rem;
  display: grid;
  gap: 1rem;
}

.cover {
  overflow: hidden;
  padding: 0;
  position: relative;
}

.cover img {
  width: 100%;
  height: 280px;
  object-fit: cover;
}

.overlay {
  position: absolute;
  inset: auto 0 0;
  display: flex;
  gap: 0.75rem;
  padding: 1rem;
  background: linear-gradient(180deg, transparent 0%, rgba(0, 0, 0, 0.65) 100%);
  color: #fff;
}

.logo {
  width: 72px;
  height: 72px;
  border-radius: 12px;
  border: 2px solid rgba(255, 255, 255, 0.6);
}

.products-grid {
  margin-top: 0.8rem;
  grid-template-columns: repeat(auto-fill, minmax(210px, 1fr));
}
</style>
