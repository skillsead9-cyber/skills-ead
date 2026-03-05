import { beforeEach, describe, expect, it, vi } from 'vitest'
import { createPinia, setActivePinia } from 'pinia'
import { useAuthStore } from '@/stores'

const { loginMock, checkSessionMock, logoutLocalMock } = vi.hoisted(() => ({
  loginMock: vi.fn(),
  checkSessionMock: vi.fn(),
  logoutLocalMock: vi.fn()
}))

vi.mock('@/services/auth', () => ({
  login: loginMock,
  checkSession: checkSessionMock,
  logoutLocal: logoutLocalMock
}))

describe('auth store', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    loginMock.mockReset()
    checkSessionMock.mockReset()
    logoutLocalMock.mockReset()
  })

  it('autentica com sucesso e marca sessao valida', async () => {
    loginMock.mockResolvedValue({ status: 200 })
    checkSessionMock.mockResolvedValue({ success: true })
    const store = useAuthStore()

    await store.login({ username: 'admin', password: '123' })

    expect(store.isAuthenticated).toBe(true)
    expect(store.sessionChecked).toBe(true)
    expect(store.user.username).toBe('admin')
    expect(store.authError).toBe('')
  })

  it('define erro quando login falha', async () => {
    loginMock.mockRejectedValue({ message: 'Credenciais invalidas' })
    const store = useAuthStore()

    await expect(store.login({ username: 'errado', password: 'errado' })).rejects.toBeTruthy()
    expect(store.isAuthenticated).toBe(false)
    expect(store.authError).toBe('Credenciais invalidas')
  })

  it('logout limpa estado local', () => {
    const store = useAuthStore()
    store.user = { username: 'admin' }
    store.isAuthenticated = true

    store.logout()

    expect(store.user).toBeNull()
    expect(store.isAuthenticated).toBe(false)
    expect(logoutLocalMock).toHaveBeenCalledTimes(1)
  })
})
