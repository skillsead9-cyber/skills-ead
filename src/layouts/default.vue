<template>
  <v-app>
    <!-- App Bar Superior -->
    <v-app-bar
      :elevation="2"
      color="primary"
      class="app-bar"
      dark
    >
      <v-app-bar-nav-icon
        @click="toggleDrawer"
        class="d-md-none"
      />
      
      <!-- Logo SKILLS -->
      <v-app-bar-title class="app-bar-title">
        <span class="app-bar-title-text font-weight-bold">SKILLS Educacional</span>
      </v-app-bar-title>

      <v-spacer />

      <!-- Menu de ações do usuário -->
      <v-menu>
        <template v-slot:activator="{ props }">
          <v-btn
            icon
            v-bind="props"
            class="mr-2"
          >
            <v-icon>mdi-account-circle</v-icon>
          </v-btn>
        </template>
        <v-list>
          <v-list-item>
            <v-list-item-title>Perfil</v-list-item-title>
          </v-list-item>
          <v-list-item>
            <v-list-item-title>Configurações</v-list-item-title>
          </v-list-item>
          <v-list-item @click="handleLogout">
            <v-list-item-title>Sair</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>

    <!-- Navigation Drawer Lateral -->
    <v-navigation-drawer
      v-model="drawer"
      :permanent="display.mdAndUp.value"
      :temporary="display.smAndDown.value"
      :width="drawerWidth"
      class="app-drawer"
      color="surface"
    >
      <div class="d-flex d-md-none flex-column px-4 pb-2 pt-4">
        <span class="text-caption text-medium-emphasis">Plataforma</span>
        <span class="text-subtitle-1 font-weight-bold">SKILLS Educacional</span>
      </div>

      <v-list
        nav
        density="comfortable"
        class="px-2 py-2"
      >
        <v-list-item
          v-for="item in navigationItems"
          :key="item.value"
          :prepend-icon="item.icon"
          :title="item.title"
          :value="item.value"
          :to="item.to"
          rounded="xl"
          @click="handleNavigation"
        />
      </v-list>

      <template v-slot:append>
        <div class="pa-2">
          <v-btn
            block
            color="primary"
            variant="outlined"
            class="text-none"
          >
            Suporte
          </v-btn>
        </div>
      </template>
    </v-navigation-drawer>

    <!-- Área de Conteúdo Principal -->
    <v-main class="app-main">
      <v-container fluid class="app-shell">
        <slot />
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup>
import { computed, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useDisplay } from 'vuetify'
import { useAuthStore } from '@/stores'

const route = useRoute()
const router = useRouter()
const authStore = useAuthStore()
const display = useDisplay()
const drawer = ref(display.mdAndUp.value)

const drawerWidth = computed(() => (display.smAndDown.value ? 280 : 304))

const navigationItems = [
  { icon: 'mdi-view-dashboard', title: 'Dashboard', value: 'dashboard', to: { name: 'dashboard' } },
  { icon: 'mdi-book-open-variant', title: 'Meus Cursos', value: 'cursos', to: { name: 'cursos' } },
  { icon: 'mdi-tools', title: 'Ferramentas', value: 'ferramentas', to: { name: 'ferramentas' } },
  { icon: 'mdi-file-document', title: 'Materiais', value: 'materiais' },
  { icon: 'mdi-calendar-check', title: 'Atividades', value: 'atividades' },
  { icon: 'mdi-chart-line', title: 'Progresso', value: 'progresso' },
  { icon: 'mdi-message-text', title: 'Mensagens', value: 'mensagens' }
]

const toggleDrawer = () => {
  drawer.value = !drawer.value
}

const handleNavigation = () => {
  if (display.smAndDown.value) {
    drawer.value = false
  }
}

watch(
  () => display.mdAndUp.value,
  (isDesktop) => {
    drawer.value = isDesktop
  }
)

watch(
  () => route.fullPath,
  () => {
    if (display.smAndDown.value) {
      drawer.value = false
    }
  }
)

const handleLogout = () => {
  handleNavigation()
  authStore.logout()
  router.push({ name: 'login' })
}
</script>

<style scoped>
.app-main {
  background-color: #FAFAFA;
}

.app-bar :deep(.v-toolbar__content) {
  padding-inline: 8px;
}

.app-bar-title {
  min-width: 0;
}

.app-bar-title :deep(.v-toolbar-title__placeholder) {
  overflow: hidden;
}

.app-bar-title-text {
  display: block;
  max-width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.app-shell {
  padding: 16px;
  overflow-x: hidden;
}

@media (min-width: 960px) {
  .app-shell {
    padding: 24px 32px;
  }
}

@media (max-width: 600px) {
  .app-shell {
    padding: 12px;
  }

  .app-bar-title-text {
    font-size: 0.95rem;
  }
}
</style>
