import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { useAppStore } from './composables/useAppStore'

const app = createApp(App)

const { applyTheme } = useAppStore()
applyTheme()

app.use(router).mount('#app')
