<template>
  <section class="landing">
    <section class="container top-stack">
      <article class="smart-welcome card">
        <div class="smart-head">
          <p class="eyebrow">TIPSA DISCOVERY</p>
          <h1>{{ t('home.smartWelcome') }}</h1>
        </div>

        <form class="search-box" @submit.prevent="submitSearch">
          <input
            v-model="searchQuery"
            type="search"
            :placeholder="t('common.search')"
            @focus="showSuggestions = true"
            @blur="closeSuggestionSoon"
          />
          <button class="btn-primary" type="submit">{{ t('common.search') }}</button>

          <ul v-if="showSuggestions && searchSuggestions.length" class="suggestions">
            <li v-for="suggestion in searchSuggestions" :key="suggestion" @mousedown.prevent="applySuggestion(suggestion)">
              {{ suggestion }}
            </li>
          </ul>
        </form>

        <div class="smart-chips">
          <h3>{{ t('home.trendingSearches') }}</h3>
          <div class="chip-row">
            <button v-for="term in trendingSearches" :key="term" class="chip" @click="applySuggestion(term)">
              {{ term }}
            </button>
          </div>
        </div>

        <div class="smart-grid">
          <article>
            <h3>{{ t('home.popularCategories') }}</h3>
            <div class="mini-list">
              <button
                v-for="category in quickCategoryItems.slice(0, 5)"
                :key="category.label"
                class="mini-link"
                @click="goToCategory(category.label)"
              >
                <span>{{ category.icon }}</span>
                {{ category.label }}
              </button>
            </div>
          </article>

          <article>
            <h3>{{ t('home.recentlyViewed') }}</h3>
            <div class="mini-products">
              <button
                v-for="item in recentlyViewed.slice(0, 3)"
                :key="item.id"
                class="recent-item"
                @click="goToProduct(item.id)"
              >
                <img :src="item.images[0]" :alt="item.name" />
                <span>{{ item.name }}</span>
              </button>
            </div>
          </article>

          <article>
            <h3>{{ t('home.personalized') }}</h3>
            <p class="muted">{{ recommendationReason }}</p>
            <router-link class="btn-outline" to="/marketplace">{{ t('common.recommend') }}</router-link>
          </article>
        </div>
      </article>

      <article class="hero-carousel card" :style="heroStyle">
        <div class="overlay"></div>
        <div class="carousel-copy">
          <p>{{ activeBanner.tag }}</p>
          <h2>{{ activeBanner.title }}</h2>
          <p>{{ activeBanner.subtitle }}</p>
          <button class="btn-primary" @click="goToCategory(activeBanner.category)">{{ activeBanner.cta }}</button>
        </div>

        <div class="dots">
          <button
            v-for="(banner, index) in heroBanners"
            :key="banner.title"
            :class="{ active: index === activeHeroIndex }"
            @click="activeHeroIndex = index"
          ></button>
        </div>
      </article>
    </section>

    <section class="container sections">
      <article class="section-head">
        <h2>{{ t('common.categories') }}</h2>
      </article>
      <div class="category-scroll">
        <button v-for="category in quickCategoryItems" :key="category.label" class="cat-card" @click="goToCategory(category.label)">
          <span>{{ category.icon }}</span>
          <small>{{ category.label }}</small>
        </button>
      </div>
    </section>

    <section class="container sections">
      <article class="section-head">
        <h2>{{ t('home.nearYou') }}</h2>
        <div class="city-tabs">
          <button
            v-for="city in cityNames"
            :key="city"
            class="chip"
            :class="{ active: selectedCity === city }"
            @click="selectedCity = city"
          >
            {{ city }}
          </button>
        </div>
      </article>
      <div class="grid products-grid">
        <ProductCard v-for="item in popularNearYou" :key="item.id" :product="item" />
      </div>
    </section>

    <section class="container sections">
      <article class="section-head">
        <h2>{{ t('common.trending') }}</h2>
      </article>
      <div class="grid products-grid">
        <ProductCard v-for="item in trendingProducts" :key="item.id" :product="item" />
      </div>
    </section>

    <section class="container sections">
      <article class="flash-sale card">
        <div>
          <p class="eyebrow">{{ t('home.flashSale') }}</p>
          <h2>{{ flashSaleProduct.name }}</h2>
          <p class="muted">
            {{ t('home.endsIn') }} {{ countdownText }} · {{ flashDiscount }}% OFF · {{ flashStock }} left
          </p>
          <div class="progress-track">
            <div class="progress-bar" :style="{ width: `${flashProgress}%` }"></div>
          </div>
          <button class="btn-primary" @click="buyFlashSale">{{ t('home.buyNow') }}</button>
        </div>
        <img :src="flashSaleProduct.images[0]" :alt="flashSaleProduct.name" />
      </article>
    </section>

    <section class="container sections">
      <article class="section-head">
        <h2>{{ t('home.featuredStores') }}</h2>
      </article>
      <div class="grid seller-grid">
        <article class="seller card" v-for="seller in topSellers" :key="seller.id">
          <img :src="seller.logo" :alt="seller.name" />
          <h3>{{ seller.name }}</h3>
          <p class="muted">⭐ {{ seller.rating }} · {{ seller.followers.toLocaleString() }} followers</p>
          <div class="seller-actions">
            <button class="btn-outline">{{ t('home.follow') }}</button>
            <router-link class="btn-outline" :to="`/store/${seller.id}`">{{ t('home.viewStore') }}</router-link>
          </div>
        </article>
      </div>
    </section>

    <section class="container sections">
      <article class="section-head">
        <h2>{{ t('home.discoveryFeed') }}</h2>
      </article>
      <div class="feed-wrap card">
        <div class="feed-track">
          <article class="feed-item" v-for="(item, index) in discoveryFeed" :key="`${item.id}-${index}`" @click="goToProduct(item.id)">
            <img :src="item.images[0]" :alt="item.name" />
            <div>
              <h3>{{ item.name }}</h3>
              <p>${{ item.price }} · ⭐ {{ item.rating }} · {{ item.sold }} sold</p>
              <small>{{ sellerName(item.sellerId) }}</small>
            </div>
          </article>
        </div>
      </div>
    </section>

    <section class="container sections">
      <article class="section-head">
        <h2>{{ t('common.recommend') }}</h2>
      </article>
      <div class="grid products-grid">
        <ProductCard v-for="item in recommendedProducts" :key="item.id" :product="item" />
      </div>
    </section>

    <section class="container sections two-col-layout">
      <article>
        <article class="section-head">
          <h2>{{ t('home.newArrival') }}</h2>
        </article>
        <div class="grid products-grid compact">
          <ProductCard v-for="item in newArrivals" :key="item.id" :product="item" />
        </div>
      </article>

      <article>
        <article class="section-head">
          <h2>{{ t('home.cambodianProducts') }}</h2>
        </article>
        <div class="grid products-grid compact">
          <ProductCard v-for="item in cambodianProducts" :key="item.id" :product="item" />
        </div>
      </article>
    </section>

    <section class="container sections">
      <article class="section-head">
        <h2>{{ t('home.dailyDeals') }}</h2>
        <span class="muted">Refreshes every 24h</span>
      </article>
      <div class="grid deal-grid">
        <article class="deal card" v-for="deal in dailyDeals" :key="deal.id" @click="goToProduct(deal.id)">
          <img :src="deal.images[0]" :alt="deal.name" />
          <div>
            <h3>{{ deal.name }}</h3>
            <p>
              <strong>${{ (deal.price * (1 - deal.discount / 100)).toFixed(2) }}</strong>
              <small>${{ deal.price }}</small>
            </p>
            <span>{{ deal.discount }}% OFF</span>
          </div>
        </article>
      </div>
    </section>

    <section class="container sections">
      <article class="section-head">
        <h2>{{ t('home.recentlyViewed') }}</h2>
      </article>
      <div class="grid products-grid compact">
        <ProductCard v-for="item in recentlyViewed" :key="`recent-${item.id}`" :product="item" />
      </div>
    </section>

    <section class="container sections">
      <article class="section-head">
        <h2>{{ t('home.communityReviews') }}</h2>
      </article>
      <div class="grid review-grid">
        <article class="review card" v-for="entry in communityReviewFeed" :key="entry.id">
          <img :src="entry.photo" :alt="entry.product" />
          <div>
            <h3>{{ entry.product }}</h3>
            <p>⭐ {{ entry.rating }} · {{ entry.user }}</p>
            <p class="muted">{{ entry.comment }}</p>
            <small>{{ entry.type }}</small>
          </div>
        </article>
      </div>
    </section>

    <footer class="market-footer">
      <section class="container footer-grid">
        <article>
          <h3>TIPSA</h3>
          <p>{{ t('home.footerTagline') }}</p>
        </article>

        <article>
          <h4>Marketplace</h4>
          <a href="#">About Us</a>
          <a href="#">Contact</a>
          <a href="#">Become a Seller</a>
          <a href="#">Help Center</a>
        </article>

        <article>
          <h4>Policy</h4>
          <a href="#">Terms & Conditions</a>
          <a href="#">Privacy Policy</a>
          <a href="#">Safety Center</a>
          <a href="#">Trust & Quality</a>
        </article>

        <article>
          <h4>{{ t('nav.language') }}</h4>
          <div class="footer-actions">
            <button class="btn-outline" @click="setLanguage('en')">English</button>
            <button class="btn-outline" @click="setLanguage('km')">ខ្មែរ</button>
          </div>
          <h4>Social</h4>
          <div class="social-row">
            <a href="#">Facebook</a>
            <a href="#">Telegram</a>
            <a href="#">TikTok</a>
            <a href="#">Instagram</a>
          </div>
        </article>
      </section>
    </footer>
  </section>
</template>

<script setup>
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import ProductCard from '../components/ProductCard.vue'
import { categories, products, reviews, sellers, topSellers } from '../data/mockData'
import { useAppStore } from '../composables/useAppStore'
import { useI18n } from '../composables/useI18n'

const { t, setLanguage } = useI18n()
const router = useRouter()
const { state, addToCart } = useAppStore()

const searchQuery = ref('')
const showSuggestions = ref(false)
const selectedCity = ref('Phnom Penh')
const activeHeroIndex = ref(0)
const countdownSeconds = ref(0)
const recentlyViewedIds = ref([])

let heroTimer = null
let countdownTimer = null

const trendingSearches = ['Khmer fashion', 'Earbuds', 'Kampot pepper', 'Flash sale', 'Home decor']

const quickCategoryItems = [
  { label: 'Fashion', icon: '👗' },
  { label: 'Electronics', icon: '📱' },
  { label: 'Beauty', icon: '💄' },
  { label: 'Home & Living', icon: '🛋️' },
  { label: 'Food', icon: '🍜' },
  { label: 'Books', icon: '📚' },
  { label: 'Sports', icon: '⚽' },
  { label: 'Automotive', icon: '🚗' },
  { label: 'Handmade', icon: '🧵' },
  { label: 'Local Products', icon: '🇰🇭' },
]

const heroBanners = [
  {
    title: 'Flash Sales up to 70% off',
    subtitle: 'Limited hours, top picks, and instant checkout.',
    cta: 'Shop flash sale',
    tag: 'Flash Sales',
    category: 'Electronics',
    image: 'https://images.unsplash.com/photo-1607082349566-187342175e2f?auto=format&fit=crop&w=1600&q=80',
  },
  {
    title: 'Fresh New Arrivals Daily',
    subtitle: 'Discover what sellers just uploaded this morning.',
    cta: 'Browse new arrivals',
    tag: 'New Arrivals',
    category: 'Fashion',
    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1600&q=80',
  },
  {
    title: 'Featured Cambodian Stores',
    subtitle: 'Support local SMEs, artisans, and growing creators.',
    cta: 'Explore local stores',
    tag: 'Featured Stores',
    category: 'Local Products',
    image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=1600&q=80',
  },
  {
    title: 'Seasonal Promotions',
    subtitle: 'Curated picks for festive shopping moments.',
    cta: 'See seasonal deals',
    tag: 'Seasonal Promotions',
    category: 'Home',
    image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=1600&q=80',
  },
]

const cityProductMap = {
  'Phnom Penh': ['p2', 'p4', 'p5'],
  'Siem Reap': ['p1', 'p3', 'p6'],
  Battambang: ['p6', 'p4', 'p1'],
}

const cityNames = Object.keys(cityProductMap)

const sellerById = computed(() => Object.fromEntries(sellers.map((seller) => [seller.id, seller.name])))
const activeBanner = computed(() => heroBanners[activeHeroIndex.value])

const heroStyle = computed(() => ({
  backgroundImage: `linear-gradient(120deg, rgba(8, 18, 34, 0.76), rgba(8, 18, 34, 0.35)), url('${activeBanner.value.image}')`,
}))

const flashSaleProduct = computed(() => [...products].sort((a, b) => b.sold - a.sold)[0])
const flashDiscount = computed(() => 35)
const flashStock = computed(() => Math.min(flashSaleProduct.value.inventory, 28))
const flashProgress = computed(() => Math.max(15, Math.round((flashStock.value / flashSaleProduct.value.inventory) * 100)))

const countdownText = computed(() => {
  const total = countdownSeconds.value
  const hours = String(Math.floor(total / 3600)).padStart(2, '0')
  const minutes = String(Math.floor((total % 3600) / 60)).padStart(2, '0')
  const seconds = String(total % 60).padStart(2, '0')
  return `${hours}:${minutes}:${seconds}`
})

const popularNearYou = computed(() => {
  const ids = cityProductMap[selectedCity.value] || []
  return ids.map((id) => products.find((item) => item.id === id)).filter(Boolean)
})

const trendingProducts = computed(() =>
  [...products]
    .sort((a, b) => b.sold * b.rating - a.sold * a.rating)
    .slice(0, 4),
)

const newArrivals = computed(() => [...products].slice().reverse().slice(0, 4))

const cambodianProducts = computed(() =>
  products
    .filter((item) => /Khmer|Kampot|Cambodia/i.test(item.name + item.description))
    .slice(0, 4),
)

const recentlyViewed = computed(() => {
  const resolved = recentlyViewedIds.value
    .map((id) => products.find((entry) => entry.id === id))
    .filter(Boolean)

  return resolved.length ? resolved : products.slice(0, 4)
})

const recommendationReason = computed(() => {
  if (!state.wishlist.length) {
    return 'Based on trending products and your local market activity.'
  }

  return 'Based on your wishlist categories and recent product views.'
})

const recommendedProducts = computed(() => {
  const wishedCategories = products
    .filter((item) => state.wishlist.includes(item.id))
    .map((item) => item.category)

  const categoryPool = wishedCategories.length ? wishedCategories : categories.slice(0, 2)

  return products
    .filter((item) => categoryPool.includes(item.category))
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 4)
})

const dailyDeals = computed(() => {
  const daySeed = new Date().getDate()
  return products.slice(0, 4).map((item, index) => ({
    ...item,
    discount: 10 + ((daySeed + index * 7) % 26),
  }))
})

const discoveryFeed = computed(() => [...products, ...products, ...products])

const searchSuggestions = computed(() => {
  const text = searchQuery.value.trim().toLowerCase()
  if (!text) {
    return [...trendingSearches, ...categories].slice(0, 7)
  }

  const productMatches = products
    .map((item) => item.name)
    .filter((name) => name.toLowerCase().includes(text))
  const categoryMatches = quickCategoryItems
    .map((item) => item.label)
    .filter((label) => label.toLowerCase().includes(text))
  const trendMatches = trendingSearches.filter((term) => term.toLowerCase().includes(text))

  return [...new Set([...productMatches, ...categoryMatches, ...trendMatches])].slice(0, 7)
})

const communityReviewFeed = computed(() =>
  reviews.map((entry, index) => ({
    ...entry,
    product: products.find((item) => item.id === entry.productId)?.name || 'Product',
    photo:
      [
        'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=640&q=80',
        'https://images.unsplash.com/photo-1517365830460-955ce3ccd263?auto=format&fit=crop&w=640&q=80',
        'https://images.unsplash.com/photo-1506863530036-1efeddceb993?auto=format&fit=crop&w=640&q=80',
      ][index % 3],
    type: index % 2 === 0 ? 'Photo review' : 'Video review',
  })),
)

function updateCountdown() {
  const now = new Date()
  const tomorrow = new Date(now)
  tomorrow.setHours(24, 0, 0, 0)
  countdownSeconds.value = Math.max(0, Math.floor((tomorrow - now) / 1000))
}

function submitSearch() {
  const query = searchQuery.value.trim()
  if (!query) return
  router.push({ path: '/marketplace', query: { q: query } })
}

function applySuggestion(value) {
  searchQuery.value = value
  showSuggestions.value = false
  submitSearch()
}

function closeSuggestionSoon() {
  setTimeout(() => {
    showSuggestions.value = false
  }, 120)
}

function goToCategory(category) {
  router.push({ path: '/marketplace', query: { category } })
}

function goToProduct(id) {
  router.push(`/product/${id}`)
}

function sellerName(id) {
  return sellerById.value[id] || 'TIPSA Seller'
}

function buyFlashSale() {
  addToCart(flashSaleProduct.value)
  router.push('/cart')
}

onMounted(() => {
  heroTimer = setInterval(() => {
    activeHeroIndex.value = (activeHeroIndex.value + 1) % heroBanners.length
  }, 5000)

  updateCountdown()
  countdownTimer = setInterval(updateCountdown, 1000)

  recentlyViewedIds.value = JSON.parse(localStorage.getItem('tipsa-recent-products') || '[]')
})

onBeforeUnmount(() => {
  clearInterval(heroTimer)
  clearInterval(countdownTimer)
})
</script>

<style scoped>
.landing {
  padding-bottom: 0;
}

.top-stack {
  padding-top: 1rem;
  display: grid;
  gap: 1rem;
  grid-template-columns: 1.4fr 1fr;
}

.smart-welcome {
  padding: 1rem;
  display: grid;
  gap: 0.95rem;
}

.smart-head h1 {
  font-size: clamp(1.55rem, 3vw, 2.2rem);
}

.eyebrow {
  color: var(--brand);
  letter-spacing: 0.08em;
  font-weight: 700;
  font-size: 0.8rem;
}

.search-box {
  position: relative;
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 0.6rem;
}

.search-box input {
  height: 52px;
  border-radius: 12px;
  border: 1px solid var(--border);
  background: var(--surface-soft);
  color: var(--text-primary);
  padding: 0 0.85rem;
}

.suggestions {
  position: absolute;
  z-index: 15;
  top: 56px;
  left: 0;
  right: 108px;
  border: 1px solid var(--border);
  background: var(--surface);
  border-radius: 12px;
  box-shadow: var(--shadow-soft);
  padding: 0.35rem;
  display: grid;
}

.suggestions li {
  list-style: none;
  border-radius: 8px;
  padding: 0.55rem;
  cursor: pointer;
}

.suggestions li:hover {
  background: var(--surface-soft);
}

.smart-chips,
.smart-grid article {
  border: 1px solid var(--border);
  border-radius: 12px;
  padding: 0.7rem;
  background: var(--surface-soft);
}

.smart-grid {
  display: grid;
  gap: 0.6rem;
  grid-template-columns: 1fr 1fr 1fr;
}

h3 {
  font-size: 0.95rem;
}

.chip-row {
  margin-top: 0.5rem;
  display: flex;
  gap: 0.45rem;
  flex-wrap: wrap;
}

.chip {
  border: 1px solid var(--border);
  background: var(--surface);
  color: var(--text-primary);
  border-radius: 999px;
  padding: 0.3rem 0.65rem;
  font-size: 0.78rem;
  cursor: pointer;
}

.chip.active {
  border-color: var(--brand);
}

.mini-list {
  margin-top: 0.5rem;
  display: grid;
  gap: 0.45rem;
}

.mini-link {
  border: 0;
  background: var(--surface);
  border-radius: 10px;
  text-align: left;
  padding: 0.5rem;
  display: flex;
  align-items: center;
  gap: 0.45rem;
}

.mini-products {
  margin-top: 0.5rem;
  display: grid;
  gap: 0.45rem;
}

.recent-item {
  border: 0;
  border-radius: 10px;
  background: var(--surface);
  text-align: left;
  display: grid;
  grid-template-columns: 42px 1fr;
  gap: 0.5rem;
  align-items: center;
  padding: 0.35rem;
}

.recent-item img {
  width: 42px;
  height: 42px;
  border-radius: 8px;
  object-fit: cover;
}

.hero-carousel {
  min-height: 420px;
  position: relative;
  overflow: hidden;
  background-size: cover;
  background-position: center;
  border-radius: 18px;
}

.overlay {
  position: absolute;
  inset: 0;
  background: radial-gradient(circle at 85% 20%, rgba(31, 111, 235, 0.2), transparent 42%);
}

.carousel-copy {
  position: relative;
  z-index: 2;
  color: #fff;
  padding: 1.2rem;
  display: grid;
  gap: 0.6rem;
  align-content: end;
  min-height: 100%;
}

.carousel-copy h2 {
  font-size: clamp(1.6rem, 3vw, 2.2rem);
}

.carousel-copy .btn-primary {
  width: fit-content;
}

.dots {
  position: absolute;
  bottom: 1rem;
  right: 1rem;
  display: flex;
  gap: 0.35rem;
}

.dots button {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  border: 0;
  background: rgba(255, 255, 255, 0.4);
}

.dots button.active {
  background: #fff;
}

.sections {
  margin-top: 1rem;
}

.section-head {
  margin-bottom: 0.7rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 0.8rem;
}

.city-tabs {
  display: flex;
  gap: 0.35rem;
  flex-wrap: wrap;
}

.products-grid {
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
}

.products-grid.compact {
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
}

.category-scroll {
  display: grid;
  grid-auto-flow: column;
  grid-auto-columns: minmax(120px, 1fr);
  overflow-x: auto;
  gap: 0.6rem;
  padding-bottom: 0.4rem;
}

.cat-card {
  border: 1px solid var(--border);
  background: var(--surface);
  border-radius: 14px;
  padding: 0.75rem 0.6rem;
  display: grid;
  justify-items: center;
  gap: 0.35rem;
}

.cat-card span {
  font-size: 1.3rem;
}

.flash-sale {
  padding: 1rem;
  display: grid;
  grid-template-columns: 1.2fr 1fr;
  gap: 1rem;
  align-items: center;
}

.flash-sale img {
  width: 100%;
  max-height: 240px;
  border-radius: 14px;
  object-fit: cover;
}

.progress-track {
  margin: 0.7rem 0;
  height: 10px;
  background: var(--surface-soft);
  border-radius: 999px;
  overflow: hidden;
}

.progress-bar {
  height: 100%;
  background: linear-gradient(90deg, #ff7748 0%, #f85555 100%);
}

.seller-grid {
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
}

.seller {
  padding: 0.85rem;
  display: grid;
  gap: 0.45rem;
}

.seller img {
  width: 54px;
  height: 54px;
  border-radius: 12px;
  object-fit: cover;
}

.seller-actions {
  margin-top: 0.35rem;
  display: flex;
  gap: 0.35rem;
}

.feed-wrap {
  overflow: hidden;
  padding: 0.75rem 0;
}

.feed-track {
  display: flex;
  gap: 0.7rem;
  width: max-content;
  animation: feed-scroll 48s linear infinite;
}

.feed-item {
  width: 240px;
  border: 1px solid var(--border);
  border-radius: 12px;
  overflow: hidden;
  background: var(--surface);
  cursor: pointer;
}

.feed-item img {
  width: 100%;
  height: 140px;
  object-fit: cover;
}

.feed-item div {
  padding: 0.6rem;
}

.feed-item p {
  color: var(--text-secondary);
  font-size: 0.83rem;
}

.two-col-layout {
  display: grid;
  gap: 1rem;
  grid-template-columns: 1fr 1fr;
}

.deal-grid {
  grid-template-columns: repeat(auto-fill, minmax(230px, 1fr));
}

.deal {
  overflow: hidden;
  cursor: pointer;
}

.deal img {
  width: 100%;
  height: 150px;
  object-fit: cover;
}

.deal div {
  padding: 0.65rem;
}

.deal p {
  display: flex;
  gap: 0.5rem;
  align-items: center;
}

.deal small {
  text-decoration: line-through;
  color: var(--text-secondary);
}

.deal span {
  display: inline-block;
  margin-top: 0.25rem;
  background: #ffe8e8;
  color: #b72c2c;
  border-radius: 999px;
  font-size: 0.75rem;
  padding: 0.2rem 0.5rem;
}

.review-grid {
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
}

.review {
  overflow: hidden;
}

.review img {
  width: 100%;
  height: 165px;
  object-fit: cover;
}

.review div {
  padding: 0.7rem;
  display: grid;
  gap: 0.35rem;
}

.market-footer {
  margin-top: 1.4rem;
  background: color-mix(in srgb, var(--brand) 8%, var(--surface));
  border-top: 1px solid var(--border);
}

.footer-grid {
  display: grid;
  gap: 1rem;
  grid-template-columns: 1.2fr 1fr 1fr 1fr;
  padding-top: 1.4rem;
  padding-bottom: 1.4rem;
}

.footer-grid article {
  display: grid;
  align-content: start;
  gap: 0.35rem;
}

.footer-grid p,
.footer-grid a {
  color: var(--text-secondary);
}

.footer-actions,
.social-row {
  display: flex;
  gap: 0.45rem;
  flex-wrap: wrap;
}

@keyframes feed-scroll {
  from {
    transform: translateX(0);
  }

  to {
    transform: translateX(-33.33%);
  }
}

@media (max-width: 1100px) {
  .top-stack {
    grid-template-columns: 1fr;
  }

  .smart-grid {
    grid-template-columns: 1fr;
  }

  .flash-sale {
    grid-template-columns: 1fr;
  }

  .two-col-layout {
    grid-template-columns: 1fr;
  }

  .footer-grid {
    grid-template-columns: 1fr 1fr;
  }
}

@media (max-width: 760px) {
  .search-box {
    grid-template-columns: 1fr;
  }

  .suggestions {
    right: 0;
    top: 104px;
  }

  .section-head {
    flex-direction: column;
    align-items: flex-start;
  }

  .footer-grid {
    grid-template-columns: 1fr;
  }
}
</style>
