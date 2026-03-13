<template>
  <header class="fixed inset-x-0 top-0 z-50 border-b border-slate-200 bg-white/95 shadow-md backdrop-blur">
    <div class="container mx-auto px-4 sm:px-6">
      <nav class="flex min-h-[72px] items-center gap-4 md:min-h-[88px]">
        <button
          v-if="isLandingPage"
          type="button"
          @click="handleBrandClick"
          class="flex min-w-0 items-center bg-transparent text-left"
        >
          <img
            src="/logo-skills.png"
            alt="Grupo Transformar - SKILLS Educacional"
            class="h-11 w-auto max-w-[150px] object-contain sm:h-12 sm:max-w-[170px] md:h-16 md:max-w-[220px]"
            onerror="this.style.display='none'; this.nextElementSibling.style.display='block';"
          />
          <div class="hidden text-xl font-bold text-primary md:block">
            Grupo Transformar
          </div>
        </button>
        <router-link
          v-else
          :to="landingLink()"
          @click="closeMobileMenu"
          class="flex min-w-0 items-center"
        >
          <img
            src="/logo-skills.png"
            alt="Grupo Transformar - SKILLS Educacional"
            class="h-11 w-auto max-w-[150px] object-contain sm:h-12 sm:max-w-[170px] md:h-16 md:max-w-[220px]"
            onerror="this.style.display='none'; this.nextElementSibling.style.display='block';"
          />
          <div class="hidden text-xl font-bold text-primary md:block">
            Grupo Transformar
          </div>
        </router-link>

        <ul class="hidden items-center gap-6 md:flex">
          <li v-for="item in navItems" :key="item.href">
            <button
              v-if="isLandingPage"
              type="button"
              @click="handleSectionClick(item.href)"
              class="font-medium text-gray-700 transition-colors hover:text-primary"
            >
              {{ item.label }}
            </button>
            <router-link
              v-else
              :to="landingLink(item.href)"
              class="font-medium text-gray-700 transition-colors hover:text-primary"
            >
              {{ item.label }}
            </router-link>
          </li>
        </ul>

        <div class="ml-auto hidden items-center gap-4 md:flex">
          <router-link
            v-if="isLandingPage"
            to="/login"
            class="px-4 py-2 font-medium text-gray-700 transition-colors hover:text-primary"
          >
            Login
          </router-link>
          <router-link
            v-else
            :to="landingLink()"
            class="px-4 py-2 font-medium text-gray-700 transition-colors hover:text-primary"
          >
            Início
          </router-link>

          <button
            v-if="isLandingPage"
            type="button"
            @click="handleCtaClick"
            class="rounded-lg bg-secondary px-6 py-2 font-semibold text-white shadow-lg transition-colors hover:bg-secondary-dark hover:shadow-xl"
          >
            Fazer Matrícula
          </button>
          <router-link
            v-else
            :to="landingLink('#lead-form')"
            class="rounded-lg bg-secondary px-6 py-2 font-semibold text-white shadow-lg transition-colors hover:bg-secondary-dark hover:shadow-xl"
          >
            Fazer Matrícula
          </router-link>
        </div>

        <button
          type="button"
          @click="toggleMobileMenu"
          class="ml-auto inline-flex h-12 w-12 items-center justify-center rounded-full border border-slate-200 text-gray-700 transition hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-primary md:hidden"
          aria-label="Alternar menu"
          aria-controls="public-mobile-menu"
          :aria-expanded="mobileMenuOpen.toString()"
        >
          <svg v-if="!mobileMenuOpen" class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
          <svg v-else class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 6l12 12M18 6L6 18" />
          </svg>
        </button>
      </nav>
    </div>

    <transition name="fade">
      <div
        v-if="mobileMenuOpen"
        id="public-mobile-menu"
        class="border-t border-slate-200 bg-white shadow-xl md:hidden"
      >
        <div class="container mx-auto px-4 py-4 sm:px-6">
          <ul class="space-y-2">
            <li v-for="item in navItems" :key="`${item.href}-mobile`">
              <button
                v-if="isLandingPage"
                type="button"
                @click="handleSectionClick(item.href)"
                class="block w-full rounded-xl px-4 py-3 text-left text-base font-medium text-gray-700 transition hover:bg-slate-50 hover:text-primary"
              >
                {{ item.label }}
              </button>
              <router-link
                v-else
                :to="landingLink(item.href)"
                @click="closeMobileMenu"
                class="block w-full rounded-xl px-4 py-3 text-left text-base font-medium text-gray-700 transition hover:bg-slate-50 hover:text-primary"
              >
                {{ item.label }}
              </router-link>
            </li>
          </ul>

          <div class="mt-4 space-y-3 border-t border-slate-200 pt-4">
            <router-link
              v-if="isLandingPage"
              to="/login"
              @click="closeMobileMenu"
              class="block w-full rounded-xl border border-primary px-6 py-3 text-center font-semibold text-primary transition hover:bg-primary hover:text-white"
            >
              Login
            </router-link>
            <router-link
              v-else
              :to="landingLink()"
              @click="closeMobileMenu"
              class="block w-full rounded-xl border border-primary px-6 py-3 text-center font-semibold text-primary transition hover:bg-primary hover:text-white"
            >
              Início
            </router-link>

            <button
              v-if="isLandingPage"
              type="button"
              @click="handleCtaClick"
              class="block w-full rounded-xl bg-secondary px-6 py-3 text-center font-semibold text-white shadow-lg transition hover:bg-secondary-dark"
            >
              Fazer Matrícula
            </button>
            <router-link
              v-else
              :to="landingLink('#lead-form')"
              @click="closeMobileMenu"
              class="block w-full rounded-xl bg-secondary px-6 py-3 text-center font-semibold text-white shadow-lg transition hover:bg-secondary-dark"
            >
              Fazer Matrícula
            </router-link>
          </div>
        </div>
      </div>
    </transition>
  </header>
</template>

<script setup>
import { computed, ref } from 'vue'

const props = defineProps({
  page: {
    type: String,
    default: 'landing'
  }
})

const emit = defineEmits(['navigate', 'cta'])

const mobileMenuOpen = ref(false)

const navItems = [
  { label: 'Sobre', href: '#sobre' },
  { label: 'Como Funciona', href: '#como-funciona' },
  { label: 'Depoimentos', href: '#depoimentos' },
  { label: 'Contato', href: '#contato' }
]

const isLandingPage = computed(() => props.page === 'landing')

const landingLink = (hash = '') => (
  hash
    ? { name: 'landing', hash }
    : { name: 'landing' }
)

const closeMobileMenu = () => {
  mobileMenuOpen.value = false
}

const toggleMobileMenu = () => {
  mobileMenuOpen.value = !mobileMenuOpen.value
}

const handleBrandClick = () => {
  emit('navigate', '#topo')
  closeMobileMenu()
}

const handleSectionClick = (href) => {
  emit('navigate', href)
  closeMobileMenu()
}

const handleCtaClick = () => {
  emit('cta')
  closeMobileMenu()
}
</script>
