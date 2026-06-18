<template>
  <section class="container page-stack">
    <article class="card chat-layout">
      <aside class="threads">
        <h2>Conversations</h2>
        <button
          v-for="thread in threads"
          :key="thread.id"
          class="thread"
          :class="{ active: thread.id === activeThread.id }"
          @click="activeThread = thread"
        >
          <strong>{{ thread.name }}</strong>
          <span>{{ thread.lastMessage }}</span>
        </button>
      </aside>

      <div class="messages">
        <header>
          <h3>{{ activeThread.name }}</h3>
          <span class="muted">Online now</span>
        </header>

        <div class="message-list">
          <article v-for="message in activeThread.messages" :key="message.id" :class="['bubble', message.from]">
            {{ message.text }}
          </article>
        </div>

        <form class="composer" @submit.prevent="sendMessage">
          <input v-model="draft" placeholder="Type a message..." />
          <button class="btn-primary">Send</button>
        </form>
      </div>
    </article>
  </section>
</template>

<script setup>
import { ref } from 'vue'

const threads = ref([
  {
    id: 't1',
    name: 'Angkor Craft Studio',
    lastMessage: 'Your order was packed today.',
    messages: [
      { id: 'm1', from: 'them', text: 'Thanks for your purchase.' },
      { id: 'm2', from: 'me', text: 'Can you confirm delivery ETA?' },
      { id: 'm3', from: 'them', text: 'It should arrive in 1-2 days.' },
    ],
  },
  {
    id: 't2',
    name: 'Phnom Tech Hub',
    lastMessage: 'A new discount code is available.',
    messages: [
      { id: 'm4', from: 'them', text: 'We have a 15% promo this week.' },
      { id: 'm5', from: 'me', text: 'Great, I will check it out.' },
    ],
  },
])

const activeThread = ref(threads.value[0])
const draft = ref('')

function sendMessage() {
  if (!draft.value.trim()) return
  activeThread.value.messages.push({
    id: crypto.randomUUID(),
    from: 'me',
    text: draft.value,
  })
  draft.value = ''
}
</script>

<style scoped>
.page-stack {
  padding-top: 1rem;
  padding-bottom: 2rem;
}

.chat-layout {
  display: grid;
  grid-template-columns: 280px 1fr;
  gap: 1rem;
  min-height: 70vh;
}

.threads {
  border-right: 1px solid var(--border);
  padding-right: 0.8rem;
}

.thread {
  width: 100%;
  text-align: left;
  border: 1px solid var(--border);
  border-radius: 10px;
  background: var(--surface-soft);
  padding: 0.6rem;
  margin-top: 0.5rem;
  display: grid;
  gap: 0.25rem;
}

.thread.active {
  border-color: var(--brand);
}

.messages {
  display: grid;
  grid-template-rows: auto 1fr auto;
  gap: 0.65rem;
}

.message-list {
  overflow: auto;
  padding: 0.2rem;
  display: grid;
  gap: 0.5rem;
}

.bubble {
  max-width: 70%;
  padding: 0.55rem 0.7rem;
  border-radius: 12px;
}

.bubble.me {
  justify-self: end;
  background: var(--brand);
  color: #fff;
}

.bubble.them {
  background: var(--surface-soft);
}

.composer {
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 0.5rem;
}

input {
  border: 1px solid var(--border);
  border-radius: 10px;
  padding: 0.65rem;
  background: var(--surface-soft);
  color: var(--text-primary);
}

@media (max-width: 860px) {
  .chat-layout {
    grid-template-columns: 1fr;
  }

  .threads {
    border-right: 0;
    border-bottom: 1px solid var(--border);
    padding-bottom: 0.8rem;
  }
}
</style>
