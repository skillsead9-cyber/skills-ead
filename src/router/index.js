import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores'
import { pinia } from '@/stores/pinia'

const BYPASS_AUTH = import.meta.env.VITE_BYPASS_AUTH === 'true'

export const routes = [
  {
    path: '/',
    name: 'landing',
    component: () => import('@/pages/LandingPage.vue'),
    meta: {
      requiresAuth: false,
      layout: 'landing'
    }
  },
  {
    path: '/app',
    redirect: '/dashboard'
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/pages/Login.vue'),
    meta: {
      requiresAuth: false,
      layout: 'empty'
    }
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: () => import('@/pages/Dashboard.vue'),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/cursos',
    name: 'cursos',
    component: () => import('@/pages/Cursos.vue'),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/cursos/:id',
    name: 'curso-detalhe',
    component: () => import('@/pages/CursoDetalhe.vue'),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/ferramentas',
    name: 'ferramentas',
    component: () => import('@/pages/Ferramentas.vue'),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/dashboard'
  }
]

export async function resolveAuthRedirect(to, authStore) {
  if (BYPASS_AUTH) {
    return true
  }

  if (to.meta.requiresAuth) {
    if (!authStore.isAuthenticated) {
      const hasSession = await authStore.checkSession()
      if (!hasSession) {
        return { name: 'login' }
      }
    }
    return true
  }

  if (to.name === 'login') {
    if (!authStore.sessionChecked) {
      await authStore.checkSession()
    }
    if (authStore.isAuthenticated) {
      return { name: 'dashboard' }
    }
  }

  return true
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

router.beforeEach(async (to) => {
  const authStore = useAuthStore(pinia)
  return resolveAuthRedirect(to, authStore)
})

export default router
