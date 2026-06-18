<template>
  <section class="page" v-if="product">
    <div class="content">
      <article class="gallery card">
        <img :src="activeImage" :alt="product.name" class="primary" />
        <div class="thumbs">
          <button
            v-for="image in product.images"
            :key="image"
            class="thumb"
            :class="{ active: image === activeImage }"
            @click="activeImage = image"
          >
            <img :src="image" :alt="product.name" />
          </button>
        </div>
      </article>

      <article class="details card">
        <p class="chip">{{ product.category }}</p>
        <h1>{{ product.name }}</h1>
        <p class="rating">⭐ {{ product.rating.toFixed(1) }} • {{ seller?.name }}</p>
        <p class="price">${{ product.price }}</p>
        <p class="desc">{{ product.description }}</p>

        <div class="actions">
          <button class="solid" @click="addToCart(product)">{{ t('common.addToCart') }}</button>
          <button class="outline" @click="toggleWishlist(product.id)">{{ t('common.wishlist') }}</button>
          <button class="outline">Chat with seller</button>
        </div>

        <h3>Specifications</h3>
        <ul class="specs">
          <li v-for="(value, key) in product.specifications" :key="key">
            <span>{{ key }}</span>
            <strong>{{ value }}</strong>
          </li>
        </ul>
      </article>
    </div>

    <section class="card reviews">
      <h2>Ratings and reviews</h2>
      <article v-for="review in productReviews" :key="review.id" class="review-item">
        <p><strong>{{ review.user }}</strong> • ⭐ {{ review.rating }}</p>
        <p>{{ review.comment }}</p>
      </article>
    </section>

    <section class="related">
      <h2>{{ t('common.recommend') }}</h2>
      <div class="grid">
        <ProductCard v-for="item in related" :key="item.id" :product="item" />
      </div>
    </section>
  </section>

  <section v-else class="page">
    <div class="card">Product not found.</div>
  </section>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useRoute } from 'vue-router'
import ProductCard from '../components/ProductCard.vue'
import { products, reviews, sellers } from '../data/mockData'
import { useAppStore } from '../composables/useAppStore'
import { useI18n } from '../composables/useI18n'

const route = useRoute()
const { t } = useI18n()
const { addToCart, toggleWishlist } = useAppStore()

const product = computed(() => products.find((entry) => entry.id === route.params.id))
const activeImage = ref('')

const seller = computed(() => sellers.find((entry) => entry.id === product.value?.sellerId))
const related = computed(() =>
  products.filter((entry) => entry.category === product.value?.category && entry.id !== product.value?.id).slice(0, 4),
)
const productReviews = computed(() => reviews.filter((entry) => entry.productId === product.value?.id))

if (product.value) {
  activeImage.value = product.value.images[0]
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

.card {
  border-radius: 18px;
  border: 1px solid var(--border);
  background: var(--surface);
  box-shadow: var(--shadow-soft);
  padding: 1rem;
}

.content {
  display: grid;
  grid-template-columns: 1.1fr 1fr;
  gap: 1rem;
}

.gallery {
  display: grid;
  gap: 0.8rem;
}

.primary {
  width: 100%;
  aspect-ratio: 1 / 1;
  border-radius: 14px;
  object-fit: cover;
}

.thumbs {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 0.5rem;
}

.thumb {
  border-radius: 10px;
  border: 1px solid var(--border);
  overflow: hidden;
}

.thumb.active {
  border-color: var(--brand);
}

.thumb img {
  width: 100%;
  aspect-ratio: 1 / 1;
  object-fit: cover;
}

.chip {
  display: inline-block;
  background: var(--surface-soft);
  border-radius: 999px;
  padding: 0.25rem 0.6rem;
  color: var(--text-secondary);
}

h1 {
  margin-top: 0.45rem;
  font-size: clamp(1.5rem, 3vw, 2.1rem);
}

.rating {
  color: var(--text-secondary);
}

.price {
  font-size: 1.55rem;
  font-weight: 700;
  color: var(--brand);
}

.desc {
  color: var(--text-secondary);
}

.actions {
  margin: 0.8rem 0;
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.solid,
.outline {
  height: 42px;
  border-radius: 10px;
  padding: 0 1rem;
  font-weight: 700;
}

.solid {
  background: var(--brand);
  color: #fff;
  border: 0;
}

.outline {
  border: 1px solid var(--border);
  background: var(--surface-soft);
}

.specs {
  list-style: none;
  padding: 0;
  margin: 0.8rem 0 0;
  display: grid;
  gap: 0.35rem;
}

.specs li {
  display: flex;
  justify-content: space-between;
  gap: 0.8rem;
  color: var(--text-secondary);
}

.reviews {
  display: grid;
  gap: 0.6rem;
}

.review-item {
  border: 1px solid var(--border);
  border-radius: 10px;
  padding: 0.75rem;
  color: var(--text-secondary);
}

.related h2 {
  margin-bottom: 0.7rem;
}

.grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 0.75rem;
}

@media (max-width: 960px) {
  .content,
  .grid {
    grid-template-columns: 1fr;
  }
}
</style>
