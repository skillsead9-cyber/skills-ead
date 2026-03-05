import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
// Importa estilos globais (incluindo Tailwind)
import './assets/styles/main.css'

// Cria a instância da aplicação Vue
const app = createApp(App)

// Instala plugins
app.use(createPinia())
app.use(router)
app.use(vuetify)

// Monta a aplicação
app.mount('#app')
