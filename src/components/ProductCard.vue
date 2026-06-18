<template>
  <article class="card">
    <router-link class="thumb" :to="`/product/${product.id}`">
      <img :src="product.images[0]" :alt="product.name" loading="lazy" />
      <button class="quick" @click.prevent="$emit('quick-view', product)">{{ t('common.quickView') }}</button>
    </router-link>

    <div class="body">
      <div class="row row-top">
        <h3>{{ product.name }}</h3>
        <button class="wish" @click="toggleWishlist(product.id)">{{ isWish ? '♥' : '♡' }}</button>
      </div>

      <p class="meta">{{ seller?.name }} • ⭐ {{ product.rating.toFixed(1) }}</p>
      <p class="price">${{ product.price }}</p>

      <button class="add" @click="addToCart(product)">{{ t('common.addToCart') }}</button>
    </div>
  </article>
</template>

<script setup>
import { computed } from 'vue'
import { sellers } from '../data/mockData'
import { useAppStore } from '../composables/useAppStore'
import { useI18n } from '../composables/useI18n'

const props = defineProps({
  product: {
    type: Object,
    required: true,
  },
})

defineEmits(['quick-view'])

const { t } = useI18n()
const { state, toggleWishlist, addToCart } = useAppStore()

const seller = computed(() => sellers.find((entry) => entry.id === props.product.sellerId))
const isWish = computed(() => state.wishlist.includes(props.product.id))
</script>

<style scoped>
.card {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 18px;
  overflow: hidden;
  box-shadow: var(--shadow-soft);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-strong);
}

.thumb {
  position: relative;
  display: block;
  aspect-ratio: 1 / 1;
  overflow: hidden;
}

.thumb img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.quick {
  position: absolute;
  right: 0.7rem;
  bottom: 0.7rem;
  border: 1px solid rgba(255, 255, 255, 0.4);
  background: rgba(0, 0, 0, 0.45);
  color: #fff;
  border-radius: 999px;
  padding: 0.35rem 0.65rem;
  font-size: 0.75rem;
}

.body {
  padding: 0.85rem;
  display: grid;
  gap: 0.45rem;
}

.row {
  display: flex;
  justify-content: space-between;
  gap: 0.5rem;
  align-items: center;
}

h3 {
  font-size: 0.95rem;
  font-weight: 700;
}

.meta {
  color: var(--text-secondary);
  font-size: 0.78rem;
}

.price {
  font-size: 1.05rem;
  font-weight: 700;
  color: var(--brand);
}

.wish {
  border: 1px solid var(--border);
  background: var(--surface-soft);
  border-radius: 999px;
  width: 32px;
  height: 32px;
}

.add {
  border: 0;
  border-radius: 10px;
  padding: 0.6rem;
  background: var(--brand);
  color: #fff;
  font-weight: 700;
}
</style>
