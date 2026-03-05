import { createRouter, createWebHistory } from 'vue-router'

/**
 * Configuração de rotas da aplicação SKILLS Educacional
 * Utiliza lazy loading para otimização de performance
 */
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
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
        layout: 'empty' // Layout sem drawer/app-bar para login
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
      path: '/:pathMatch(.*)*',
      redirect: '/dashboard'
    }
  ]
})

// Guard de navegação para proteção de rotas
router.beforeEach((to, from, next) => {
  // Mock: verifica se há token de autenticação
  const isAuthenticated = localStorage.getItem('skills_token')
  
  if (to.meta.requiresAuth && !isAuthenticated) {
    next({ name: 'login' })
  } else if (to.name === 'login' && isAuthenticated) {
    next({ name: 'dashboard' })
  } else {
    next()
  }
})

export default router
