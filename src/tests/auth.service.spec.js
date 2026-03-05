import { beforeEach, describe, expect, it, vi } from 'vitest'

const { authPostMock, apiGetMock } = vi.hoisted(() => ({
  authPostMock: vi.fn(),
  apiGetMock: vi.fn()
}))

vi.mock('axios', () => ({
  default: {
    create: vi.fn(() => ({
      post: authPostMock
    }))
  }
}))

vi.mock('@/services/api', () => ({
  default: {
    get: apiGetMock
  },
  normalizeApiError: (error) => ({
    status: error?.response?.status ?? 0,
    message: error?.response?.data?.message || error?.message || 'Erro'
  })
}))

import { checkSession, login } from '@/services/auth'

describe('auth service', () => {
  beforeEach(() => {
    authPostMock.mockReset()
    apiGetMock.mockReset()
  })

  it('envia login com username/password em form-urlencoded e withCredentials', async () => {
    authPostMock.mockResolvedValue({ status: 200 })

    await login({ username: 'admin', password: 'senha123' })

    expect(authPostMock).toHaveBeenCalledTimes(1)
    const [url, body, config] = authPostMock.mock.calls[0]
    expect(url).toBe('/login')
    expect(body).toBeInstanceOf(URLSearchParams)
    expect(body.get('username')).toBe('admin')
    expect(body.get('password')).toBe('senha123')
    expect(config.headers['Content-Type']).toBe('application/x-www-form-urlencoded')
  })

  it('valida sessao em endpoint autenticado', async () => {
    apiGetMock.mockResolvedValue({ data: { success: true } })

    const payload = await checkSession()

    expect(apiGetMock).toHaveBeenCalledWith('/students', {
      params: { page: 1, per_page: 1 }
    })
    expect(payload).toEqual({ success: true })
  })
})
