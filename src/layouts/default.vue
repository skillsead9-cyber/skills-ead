<template>
  <v-app>
    <!-- App Bar Superior -->
    <v-app-bar
      :elevation="2"
      color="primary"
      dark
    >
      <v-app-bar-nav-icon
        @click="drawer = !drawer"
        class="d-md-none"
      />
      
      <!-- Logo SKILLS -->
      <v-app-bar-title class="d-flex align-center">
        <v-img
          src="/logo-skills.png"
          alt="SKILLS Educacional"
          max-height="40"
          max-width="120"
          contain
          class="mr-4"
        />
        <span class="text-h6 font-weight-bold">SKILLS Educacional</span>
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
      :permanent="$vuetify.display.mdAndUp"
      :temporary="$vuetify.display.smAndDown"
      color="surface"
    >
      <v-list
        nav
        density="comfortable"
      >
        <v-list-item
          prepend-icon="mdi-view-dashboard"
          title="Dashboard"
          value="dashboard"
          :to="{ name: 'dashboard' }"
        />
        <v-list-item
          prepend-icon="mdi-book-open-variant"
          title="Meus Cursos"
          value="cursos"
          :to="{ name: 'cursos' }"
        />
        <v-list-item
          prepend-icon="mdi-file-document"
          title="Materiais"
          value="materiais"
        />
        <v-list-item
          prepend-icon="mdi-calendar-check"
          title="Atividades"
          value="atividades"
        />
        <v-list-item
          prepend-icon="mdi-chart-line"
          title="Progresso"
          value="progresso"
        />
        <v-list-item
          prepend-icon="mdi-message-text"
          title="Mensagens"
          value="mensagens"
        />
      </v-list>

      <template v-slot:append>
        <div class="pa-2">
          <v-btn
            block
            color="primary"
            variant="outlined"
          >
            Suporte
          </v-btn>
        </div>
      </template>
    </v-navigation-drawer>

    <!-- Área de Conteúdo Principal -->
    <v-main>
      <v-container fluid>
        <slot />
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const drawer = ref(true)

const handleLogout = () => {
  // Mock de logout - redireciona para login
  router.push({ name: 'login' })
}
</script>

<style scoped>
.v-main {
  background-color: #FAFAFA;
}
</style>
