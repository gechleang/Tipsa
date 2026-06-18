<template>
  <section class="landing">
    <section class="hero container">
      <article class="hero-card card">
        <div class="hero-copy">
          <p class="eyebrow">TIPSA MARKETPLACE</p>
          <h1>{{ t('app.tagline') }}</h1>
          <p class="muted">
            Build your store, discover trusted products, and scale sales with AI-powered recommendations.
          </p>
          <div class="hero-actions">
            <router-link class="btn-primary" to="/marketplace">{{ t('nav.market') }}</router-link>
            <router-link class="btn-outline" to="/register">{{ t('nav.register') }}</router-link>
          </div>
        </div>
        <div class="hero-grid">
          <article class="mini card" v-for="item in featured" :key="item.id">
            <img :src="item.images[0]" :alt="item.name" />
            <div>
              <h3>{{ item.name }}</h3>
              <p>${{ item.price }}</p>
            </div>
          </article>
        </div>
      </article>
    </section>

    <section class="container sections">
      <article class="section-head">
        <h2>{{ t('common.featured') }}</h2>
        <router-link to="/marketplace">View all</router-link>
      </article>
      <div class="grid products-grid">
        <ProductCard v-for="item in featured" :key="item.id" :product="item" />
      </div>
    </section>

    <section class="container sections">
      <article class="section-head">
        <h2>{{ t('common.topSellers') }}</h2>
      </article>
      <div class="grid seller-grid">
        <article class="seller card" v-for="seller in topSellers" :key="seller.id">
          <img :src="seller.logo" :alt="seller.name" />
          <h3>{{ seller.name }}</h3>
          <p class="muted">⭐ {{ seller.rating }} • ${{ seller.monthlyRevenue }}/month</p>
          <router-link class="btn-outline" :to="`/store/${seller.id}`">Visit store</router-link>
        </article>
      </div>
    </section>

    <section class="container sections">
      <article class="promo card">
        <div>
          <h2>AI Marketplace Tools</h2>
          <p class="muted">Generate product descriptions, optimize promotions, and get trending product insights.</p>
        </div>
        <div class="promo-tags">
          <span>{{ t('common.aiDescription') }}</span>
          <span>{{ t('common.recommend') }}</span>
          <span>{{ t('common.trending') }}</span>
        </div>
      </article>
    </section>
  </section>
</template>

<script setup>
import { computed } from 'vue'
import ProductCard from '../components/ProductCard.vue'
import { products, topSellers } from '../data/mockData'
import { useI18n } from '../composables/useI18n'

const { t } = useI18n()

const featured = computed(() => products.slice(0, 4))
</script>

<style scoped>
.landing {
  padding-bottom: 2rem;
}

.hero {
  padding-top: 1rem;
}

.hero-card {
  padding: 1.2rem;
  display: grid;
  gap: 1rem;
  grid-template-columns: 1fr 1fr;
  background:
    linear-gradient(120deg, color-mix(in srgb, var(--brand) 18%, var(--surface)) 0%, var(--surface) 60%),
    var(--surface);
}

.eyebrow {
  font-size: 0.8rem;
  letter-spacing: 0.09em;
  color: var(--brand);
  font-weight: 700;
}

.hero-copy h1 {
  font-size: clamp(1.8rem, 5vw, 3rem);
  margin: 0.3rem 0 0.6rem;
}

.hero-actions {
  margin-top: 1rem;
  display: flex;
  gap: 0.6rem;
}

.hero-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.65rem;
}

.mini {
  overflow: hidden;
}

.mini img {
  width: 100%;
  height: 126px;
  object-fit: cover;
}

.mini div {
  padding: 0.55rem;
  display: flex;
  justify-content: space-between;
}

.sections {
  margin-top: 1.2rem;
}

.section-head {
  margin-bottom: 0.7rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.products-grid {
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
}

.seller-grid {
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
}

.seller {
  padding: 0.85rem;
  display: grid;
  gap: 0.5rem;
}

.seller img {
  width: 54px;
  height: 54px;
  border-radius: 12px;
  object-fit: cover;
}

.promo {
  padding: 1rem;
  display: grid;
  gap: 0.8rem;
}

.promo-tags {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.promo-tags span {
  border: 1px solid var(--border);
  border-radius: 999px;
  padding: 0.35rem 0.65rem;
  background: var(--surface-soft);
}

@media (max-width: 920px) {
  .hero-card {
    grid-template-columns: 1fr;
  }

  .hero-grid {
    grid-template-columns: 1fr;
  }
}
</style>
