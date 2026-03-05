import axios from 'axios'

/**
 * Configuração do Axios para chamadas de API
 * Todas as requisições são mockadas no Front-End
 */

// Base URL configurável via variáveis de ambiente
const baseURL = import.meta.env.VITE_API_BASE_URL || 'https://api.skills.educacional.mock'

// Cria instância do Axios
const api = axios.create({
  baseURL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
})

// Interceptor para adicionar token de autenticação
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('skills_token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Interceptor para tratamento de respostas
api.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    // Tratamento de erros HTTP
    if (error.response) {
      switch (error.response.status) {
        case 401:
          // Não autorizado - redireciona para login
          localStorage.removeItem('skills_token')
          window.location.href = '/login'
          break
        case 403:
          console.error('Acesso negado')
          break
        case 404:
          console.error('Recurso não encontrado')
          break
        case 500:
          console.error('Erro interno do servidor')
          break
        default:
          console.error('Erro na requisição:', error.message)
      }
    } else if (error.request) {
      console.error('Erro de rede - servidor não respondeu')
    } else {
      console.error('Erro ao configurar requisição:', error.message)
    }
    
    return Promise.reject(error)
  }
)

export default api
