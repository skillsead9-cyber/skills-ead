<template>
  <div class="cursos-page">
    <v-row class="mb-4">
      <v-col cols="12" md="8">
        <h1 class="cursos-title font-weight-bold">Meus Cursos</h1>
        <p class="cursos-subtitle text-medium-emphasis">
          Explore e continue seus cursos de aprendizado
        </p>
      </v-col>
      <v-col cols="12" md="4" class="d-flex align-center justify-start justify-md-end">
        <v-text-field
          v-model="search"
          prepend-inner-icon="mdi-magnify"
          label="Buscar cursos"
          variant="outlined"
          density="compact"
          hide-details
          clearable
          class="w-100 course-search"
        />
      </v-col>
    </v-row>

    <!-- Loading State -->
    <v-row v-if="loading">
      <v-col cols="12">
        <div class="text-center py-12">
          <v-progress-circular
            indeterminate
            color="primary"
            size="64"
          />
          <p class="text-body-1 mt-4">Carregando cursos...</p>
        </div>
      </v-col>
    </v-row>

    <!-- Lista de Cursos -->
    <v-row v-else>
      <v-col
        v-for="curso in filteredCursos"
        :key="curso.id"
        cols="12"
        sm="6"
        md="4"
        lg="3"
      >
        <v-card
          :to="`/cursos/${curso.id}`"
          hover
          class="curso-card"
        >
          <v-img
            :src="curso.imagem"
            :height="xs ? 180 : 200"
            cover
            class="curso-image"
          >
            <v-overlay
              :model-value="false"
              contained
              scrim="primary"
            />
          </v-img>

          <v-card-title class="curso-title">
            {{ curso.titulo }}
          </v-card-title>

          <v-card-subtitle class="curso-subtitle">
            {{ curso.descricao }}
          </v-card-subtitle>

          <v-card-text>
            <div class="mb-2">
              <div class="d-flex justify-space-between align-center mb-1">
                <span class="text-caption text-medium-emphasis">Progresso</span>
                <span class="text-caption font-weight-bold">{{ curso.progresso }}%</span>
              </div>
              <v-progress-linear
                :model-value="curso.progresso"
                color="secondary"
                height="8"
                rounded
              />
            </div>
          </v-card-text>

          <v-card-actions class="curso-actions">
            <v-btn
              color="primary"
              variant="text"
              size="small"
              class="text-none px-0"
            >
              Continuar
              <v-icon end size="small">mdi-arrow-right</v-icon>
            </v-btn>
            <v-chip
              :color="curso.progresso === 100 ? 'success' : 'primary'"
              size="small"
              variant="flat"
              class="curso-status"
            >
              {{ curso.progresso === 100 ? 'Concluído' : 'Em Andamento' }}
            </v-chip>
          </v-card-actions>
        </v-card>
      </v-col>

      <!-- Empty State -->
      <v-col v-if="filteredCursos.length === 0" cols="12">
        <v-card>
          <v-card-text class="text-center py-12">
            <v-icon :size="xs ? 52 : 64" color="grey-lighten-1" class="mb-4">
              mdi-book-open-blank-variant
            </v-icon>
            <p class="text-h6 text-medium-emphasis">Nenhum curso encontrado</p>
            <p class="text-body-2 text-medium-emphasis mt-2">
              Tente ajustar sua busca ou entre em contato com o suporte
            </p>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useDisplay } from 'vuetify'
import { useCursosStore } from '@/stores'

const cursosStore = useCursosStore()
const { xs } = useDisplay()

const search = ref('')
const loading = ref(false)

const filteredCursos = computed(() => {
  if (!search.value) {
    return cursosStore.cursos
  }
  
  const searchLower = search.value.toLowerCase()
  return cursosStore.cursos.filter(curso =>
    curso.titulo.toLowerCase().includes(searchLower) ||
    curso.descricao.toLowerCase().includes(searchLower)
  )
})

onMounted(async () => {
  loading.value = true
  await cursosStore.fetchCursos()
  loading.value = false
})
</script>

<style scoped>
.cursos-title {
  font-size: clamp(1.75rem, 4vw, 2.25rem);
  line-height: 1.1;
}

.cursos-subtitle {
  font-size: clamp(0.98rem, 2.8vw, 1.05rem);
}

.course-search {
  max-width: 360px;
}

.curso-card {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.curso-title {
  font-size: 1.125rem;
  line-height: 1.3;
  white-space: normal;
}

.curso-subtitle {
  white-space: normal;
  line-height: 1.5;
}

.curso-actions {
  margin-top: auto;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 0 16px 16px;
}

.curso-status {
  margin-left: auto;
}

.curso-image {
  transition: transform 0.3s ease;
}

.curso-card:hover .curso-image {
  transform: scale(1.05);
}

@media (max-width: 600px) {
  .course-search {
    max-width: none;
  }

  .curso-actions {
    align-items: flex-start;
  }

  .curso-status {
    margin-left: 0;
  }
}
</style>
