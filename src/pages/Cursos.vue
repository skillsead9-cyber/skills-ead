<template>
  <div>
    <v-row class="mb-4">
      <v-col cols="12" md="8">
        <h1 class="text-h4 font-weight-bold">Meus Cursos</h1>
        <p class="text-body-1 text-medium-emphasis">
          Explore e continue seus cursos de aprendizado
        </p>
      </v-col>
      <v-col cols="12" md="4" class="d-flex align-center justify-end">
        <v-text-field
          v-model="search"
          prepend-inner-icon="mdi-magnify"
          label="Buscar cursos"
          variant="outlined"
          density="compact"
          hide-details
          clearable
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
            height="200"
            cover
            class="curso-image"
          >
            <v-overlay
              :model-value="false"
              contained
              scrim="primary"
            />
          </v-img>

          <v-card-title class="text-h6">
            {{ curso.titulo }}
          </v-card-title>

          <v-card-subtitle class="text-body-2">
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

          <v-card-actions>
            <v-btn
              color="primary"
              variant="text"
              size="small"
            >
              Continuar
              <v-icon right size="small">mdi-arrow-right</v-icon>
            </v-btn>
            <v-spacer />
            <v-chip
              :color="curso.progresso === 100 ? 'success' : 'primary'"
              size="small"
              variant="flat"
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
            <v-icon size="64" color="grey-lighten-1" class="mb-4">
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
import { useCursosStore } from '@/stores'

const cursosStore = useCursosStore()

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
.curso-card {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.curso-image {
  transition: transform 0.3s ease;
}

.curso-card:hover .curso-image {
  transform: scale(1.05);
}
</style>
