import { describe, expect, it, vi } from 'vitest'
import { resolveAuthRedirect } from '@/router'

function createAuthStore(overrides = {}) {
  return {
    isAuthenticated: false,
    sessionChecked: false,
    checkSession: vi.fn().mockResolvedValue(false),
    ...overrides
  }
}

describe('router auth guard', () => {
  it('redireciona rota protegida para login quando nao autenticado', async () => {
    const authStore = createAuthStore({
      isAuthenticated: false,
      checkSession: vi.fn().mockResolvedValue(false)
    })

    const decision = await resolveAuthRedirect({ meta: { requiresAuth: true }, name: 'dashboard' }, authStore)

    expect(decision).toEqual({ name: 'login' })
  })

  it('permite rota protegida quando sessao valida', async () => {
    const authStore = createAuthStore({
      isAuthenticated: false,
      checkSession: vi.fn().mockResolvedValue(true)
    })

    const decision = await resolveAuthRedirect({ meta: { requiresAuth: true }, name: 'dashboard' }, authStore)

    expect(decision).toBe(true)
  })

  it('redireciona login para dashboard quando autenticado', async () => {
    const authStore = createAuthStore({
      isAuthenticated: true,
      sessionChecked: true
    })

    const decision = await resolveAuthRedirect({ meta: { requiresAuth: false }, name: 'login' }, authStore)

    expect(decision).toEqual({ name: 'dashboard' })
  })
})
