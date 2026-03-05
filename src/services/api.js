import axios from 'axios'

const DEFAULT_API_BASE_URL = 'http://localhost:5000/api/v1'
const DEFAULT_TIMEOUT = 10000

const baseURL = import.meta.env.VITE_API_BASE_URL || DEFAULT_API_BASE_URL
const timeout = Number(import.meta.env.VITE_REQUEST_TIMEOUT_MS || DEFAULT_TIMEOUT)

export function normalizeApiError(error) {
  const status = error?.response?.status ?? 0
  const payload = error?.response?.data
  const message =
    payload?.message ||
    error?.message ||
    'Erro inesperado ao comunicar com a API.'

  return {
    status,
    message,
    errors: payload?.errors ?? {},
    raw: error
  }
}

const api = axios.create({
  baseURL,
  timeout,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json'
  }
})

api.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(normalizeApiError(error))
)

export default api
