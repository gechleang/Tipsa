<template>
  <section class="container page-stack">
    <header class="card hero">
      <div>
        <h1>Admin Dashboard</h1>
        <p>Manage users, sellers, products, categories, reports, and platform settings.</p>
      </div>
      <router-link class="btn-primary" to="/settings">Platform settings</router-link>
    </header>

    <section class="grid stats-grid">
      <article class="card stat"><h3>Total Users</h3><strong>24,350</strong></article>
      <article class="card stat"><h3>Verified Sellers</h3><strong>1,420</strong></article>
      <article class="card stat"><h3>Pending Moderation</h3><strong>38</strong></article>
      <article class="card stat"><h3>Reported Listings</h3><strong>12</strong></article>
    </section>

    <section class="grid two-col">
      <article class="card">
        <h2>Seller Verification Queue</h2>
        <ul class="list">
          <li>
            <span>Kingdom Homeware</span>
            <button class="btn-primary">Verify</button>
          </li>
          <li>
            <span>Seaview Gadgets</span>
            <button class="btn-primary">Verify</button>
          </li>
          <li>
            <span>Urban Khmer Fashion</span>
            <button class="btn-primary">Verify</button>
          </li>
        </ul>
      </article>

      <article class="card">
        <h2>Category Management</h2>
        <ul class="list">
          <li><span>Fashion</span><button class="btn-outline">Edit</button></li>
          <li><span>Electronics</span><button class="btn-outline">Edit</button></li>
          <li><span>Home</span><button class="btn-outline">Edit</button></li>
          <li><span>Beauty</span><button class="btn-outline">Edit</button></li>
        </ul>
      </article>
    </section>
  </section>
</template>

<style scoped>
.page-stack {
  padding-top: 1rem;
  padding-bottom: 2rem;
  display: grid;
  gap: 1rem;
}

.hero {
  display: flex;
  justify-content: space-between;
  gap: 1rem;
}

.stats-grid {
  grid-template-columns: repeat(4, minmax(0, 1fr));
}

.stat strong {
  color: var(--brand);
  font-size: 1.5rem;
}

.two-col {
  grid-template-columns: 1fr 1fr;
}

.list {
  margin-top: 0.7rem;
  display: grid;
  gap: 0.5rem;
}

.list li {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 1px solid var(--border);
  border-radius: 10px;
  padding: 0.55rem;
}

@media (max-width: 980px) {
  .hero {
    flex-direction: column;
  }

  .stats-grid,
  .two-col {
    grid-template-columns: 1fr;
  }
}
</style>
