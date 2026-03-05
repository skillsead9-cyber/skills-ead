import { defineStore } from 'pinia'

/**
 * Store principal da aplicação SKILLS Educacional
 * Estrutura preparada para módulos: auth, cursos, uploads
 */

// Store de Autenticação
export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    token: localStorage.getItem('skills_token') || null,
    isAuthenticated: !!localStorage.getItem('skills_token')
  }),
  actions: {
    login(credentials) {
      // Mock de autenticação
      this.token = 'mock_token_' + Date.now()
      this.user = {
        id: 1,
        name: 'Aluno Demo',
        email: credentials.email,
        role: 'student'
      }
      this.isAuthenticated = true
      localStorage.setItem('skills_token', this.token)
      return Promise.resolve(this.user)
    },
    logout() {
      this.user = null
      this.token = null
      this.isAuthenticated = false
      localStorage.removeItem('skills_token')
    }
  }
})

// Store de Cursos
export const useCursosStore = defineStore('cursos', {
  state: () => ({
    cursos: [],
    cursoAtual: null,
    loading: false
  }),
  actions: {
    async fetchCursos() {
      this.loading = true
      // Mock de dados
      this.cursos = [
        {
          id: 1,
          titulo: 'Introdução ao Desenvolvimento Web',
          descricao: 'Curso completo sobre HTML, CSS e JavaScript',
          progresso: 65,
          imagem: 'https://via.placeholder.com/300x200?text=Curso+1'
        },
        {
          id: 2,
          titulo: 'Vue.js Avançado',
          descricao: 'Aprofundamento em Composition API e Pinia',
          progresso: 30,
          imagem: 'https://via.placeholder.com/300x200?text=Curso+2'
        },
        {
          id: 3,
          titulo: 'Design System com Vuetify',
          descricao: 'Criação de interfaces modernas com Material Design',
          progresso: 80,
          imagem: 'https://via.placeholder.com/300x200?text=Curso+3'
        }
      ]
      this.loading = false
      return this.cursos
    }
  }
})

// Store de Uploads
export const useUploadStore = defineStore('uploads', {
  state: () => ({
    uploads: [],
    uploadAtual: null
  }),
  actions: {
    addUpload(upload) {
      this.uploads.push(upload)
    },
    removeUpload(id) {
      this.uploads = this.uploads.filter(u => u.id !== id)
    }
  }
})
