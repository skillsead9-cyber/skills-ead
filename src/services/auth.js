import axios from 'axios'
import api, { normalizeApiError } from '@/services/api'

const DEFAULT_AUTH_BASE_URL = 'http://localhost:5000'
const DEFAULT_TIMEOUT = 10000
const BYPASS_AUTH = import.meta.env.VITE_BYPASS_AUTH === 'true'

const authBaseURL = import.meta.env.VITE_AUTH_BASE_URL || DEFAULT_AUTH_BASE_URL
const timeout = Number(import.meta.env.VITE_REQUEST_TIMEOUT_MS || DEFAULT_TIMEOUT)

const authClient = axios.create({
  baseURL: authBaseURL,
  timeout,
  withCredentials: true,
  headers: {
    Accept: 'application/json'
  }
})

export async function login({ username, password }) {
  if (BYPASS_AUTH) {
    return {
      data: {
        success: true,
        message: 'Bypass de autenticacao ativo',
        user: { username: String(username || 'guest') }
      }
    }
  }

  const body = new URLSearchParams()
  body.set('username', String(username || '').trim())
  body.set('password', String(password || ''))

  try {
    return await authClient.post('/login', body, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    })
  } catch (error) {
    throw normalizeApiError(error)
  }
}

export async function checkSession() {
  if (BYPASS_AUTH) {
    return {
      success: true,
      message: 'Sessao validada em modo bypass'
    }
  }

  const response = await api.get('/students', {
    params: {
      page: 1,
      per_page: 1
    }
  })

  return response.data
}

export function logoutLocal() {
  // Nesta fase o backend nao possui contrato de logout dedicado no frontend.
  return true
}
