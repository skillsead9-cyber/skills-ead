import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
import { useAuthStore } from '@/stores'
import { pinia } from '@/stores/pinia'
import './assets/styles/main.css'

const app = createApp(App)

app.use(pinia)
app.use(router)
app.use(vuetify)

const authStore = useAuthStore(pinia)

const bootstrap = async () => {
  await authStore.checkSession()
  app.mount('#app')
}

bootstrap()
