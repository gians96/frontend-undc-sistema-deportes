import { createApp } from 'vue'
import { createPinia } from 'pinia'
import router from './router'
import App from './App.vue'

const app = createApp(App)
const pinia = createPinia()
app.use(pinia)
app.use(router)

// El montaje es inmediato. La lógica de espera la maneja router.beforeEach.
app.mount('#app')
