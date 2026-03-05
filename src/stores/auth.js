import { defineStore } from 'pinia'
import { checkSession, login as loginRequest, logoutLocal } from '@/services/auth'

const DEFAULT_AUTH_ERROR = 'Nao foi possivel autenticar. Tente novamente.'

function getErrorMessage(error) {
  if (!error) return DEFAULT_AUTH_ERROR
  if (error.message) return error.message
  return DEFAULT_AUTH_ERROR
}

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    isAuthenticated: false,
    authLoading: false,
    authError: '',
    sessionChecked: false
  }),
  actions: {
    async login(credentials) {
      this.authLoading = true
      this.authError = ''

      try {
        await loginRequest(credentials)
        const sessionData = await checkSession()

        this.isAuthenticated = true
        this.sessionChecked = true
        this.user = {
          username: credentials.username,
          session: sessionData
        }
      } catch (error) {
        this.isAuthenticated = false
        this.user = null
        this.authError = getErrorMessage(error)
        throw error
      } finally {
        this.authLoading = false
      }
    },

    async checkSession() {
      this.authLoading = true
      this.authError = ''

      try {
        const sessionData = await checkSession()
        this.isAuthenticated = true
        this.sessionChecked = true
        this.user = this.user || { username: 'authenticated_user', session: sessionData }
        return true
      } catch (error) {
        this.isAuthenticated = false
        this.user = null
        this.sessionChecked = true
        return false
      } finally {
        this.authLoading = false
      }
    },

    logout() {
      this.user = null
      this.isAuthenticated = false
      this.authError = ''
      this.sessionChecked = true
      logoutLocal()
    }
  }
})
