import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'

/**
 * Configuração do tema personalizado SKILLS Educacional
 * Cores baseadas na identidade visual do Grupo Transformar
 */
export default createVuetify({
  components,
  directives,
  theme: {
    defaultTheme: 'skillsTheme',
    themes: {
      skillsTheme: {
        dark: false,
        colors: {
          // Primary: Azul Marinho Escuro (fundo da logo e camisa polo)
          primary: '#0B132B',
          // Secondary: Verde Vivo (borda/quadrado da logo)
          secondary: '#00E676',
          // Accent: Amarelo Ouro (losango da logo)
          accent: '#FFD600',
          // Background: Cores claras para facilitar leitura
          background: '#FAFAFA',
          surface: '#FFFFFF',
          error: '#B00020',
          info: '#2196F3',
          success: '#4CAF50',
          warning: '#FB8C00'
        }
      }
    }
  },
  defaults: {
    VBtn: {
      style: 'text-transform: none;'
    },
    VCard: {
      elevation: 2
    }
  }
})
