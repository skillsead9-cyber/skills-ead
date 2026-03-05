import { defineStore } from 'pinia'

export const useCursosStore = defineStore('cursos', {
  state: () => ({
    cursos: [],
    cursoAtual: null,
    loading: false
  }),
  actions: {
    async fetchCursos() {
      this.loading = true

      // Placeholder funcional ate a integracao real de cursos.
      this.cursos = [
        {
          id: 1,
          titulo: 'Introducao ao Desenvolvimento Web',
          descricao: 'Curso completo sobre HTML, CSS e JavaScript',
          progresso: 65,
          imagem: 'https://via.placeholder.com/300x200?text=Curso+1'
        },
        {
          id: 2,
          titulo: 'Vue.js Avancado',
          descricao: 'Aprofundamento em Composition API e Pinia',
          progresso: 30,
          imagem: 'https://via.placeholder.com/300x200?text=Curso+2'
        },
        {
          id: 3,
          titulo: 'Design System com Vuetify',
          descricao: 'Criacao de interfaces modernas com Material Design',
          progresso: 80,
          imagem: 'https://via.placeholder.com/300x200?text=Curso+3'
        }
      ]

      this.loading = false
      return this.cursos
    },
    setCursoAtual(curso) {
      this.cursoAtual = curso
    }
  }
})
