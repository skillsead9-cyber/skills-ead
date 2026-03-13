<template>
  <div class="dashboard-page">
    <v-row class="mb-1 mb-sm-2">
      <v-col cols="12">
        <h1 class="dashboard-title font-weight-bold mb-3">Dashboard</h1>
        <p class="dashboard-subtitle text-medium-emphasis mb-0">
          Bem-vindo ao SKILLS Educacional! Acompanhe seu progresso e atividades.
        </p>
      </v-col>
    </v-row>

    <!-- Cards de Estatísticas -->
    <v-row class="mb-6">
      <v-col cols="12" sm="6" md="3">
        <v-card color="primary" dark class="h-100 stat-card">
          <v-card-text class="stat-card-content">
            <div class="stat-card-inner">
              <v-icon :size="xs ? 36 : 48" class="mr-4 stat-icon">mdi-book-open-variant</v-icon>
              <div>
                <div class="stat-value font-weight-bold">{{ stats.cursos }}</div>
                <div class="text-body-2">Cursos Ativos</div>
              </div>
            </div>
          </v-card-text>
        </v-card>
      </v-col>

      <v-col cols="12" sm="6" md="3">
        <v-card color="secondary" dark class="h-100 stat-card">
          <v-card-text class="stat-card-content">
            <div class="stat-card-inner">
              <v-icon :size="xs ? 36 : 48" class="mr-4 stat-icon">mdi-check-circle</v-icon>
              <div>
                <div class="stat-value font-weight-bold">{{ stats.concluidos }}</div>
                <div class="text-body-2">Concluídos</div>
              </div>
            </div>
          </v-card-text>
        </v-card>
      </v-col>

      <v-col cols="12" sm="6" md="3">
        <v-card color="accent" dark class="h-100 stat-card">
          <v-card-text class="stat-card-content">
            <div class="stat-card-inner">
              <v-icon :size="xs ? 36 : 48" class="mr-4 stat-icon">mdi-calendar-check</v-icon>
              <div>
                <div class="stat-value font-weight-bold">{{ stats.atividades }}</div>
                <div class="text-body-2">Atividades</div>
              </div>
            </div>
          </v-card-text>
        </v-card>
      </v-col>

      <v-col cols="12" sm="6" md="3">
        <v-card color="info" dark class="h-100 stat-card">
          <v-card-text class="stat-card-content">
            <div class="stat-card-inner">
              <v-icon :size="xs ? 36 : 48" class="mr-4 stat-icon">mdi-chart-line</v-icon>
              <div>
                <div class="stat-value font-weight-bold">{{ stats.progresso }}%</div>
                <div class="text-body-2">Progresso Médio</div>
              </div>
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <!-- Cursos em Andamento -->
    <v-row>
      <v-col cols="12" md="8">
        <v-card>
          <v-card-title class="section-card-title">
            <v-icon start>mdi-book-open-page-variant</v-icon>
            Cursos em Andamento
          </v-card-title>
          <v-card-text>
            <v-list class="dashboard-course-list">
              <v-list-item
                v-for="curso in cursosEmAndamento"
                :key="curso.id"
                class="px-0"
              >
                <div class="course-item">
                  <div class="course-item-main">
                    <v-avatar color="primary" :size="xs ? 48 : 56">
                      <v-icon :size="xs ? 24 : 28">mdi-book</v-icon>
                    </v-avatar>
                    <div class="course-copy">
                      <div class="text-subtitle-1 font-weight-bold">{{ curso.titulo }}</div>
                      <div class="text-body-2 text-medium-emphasis">{{ curso.descricao }}</div>
                    </div>
                  </div>

                  <div class="course-progress">
                    <v-progress-circular
                      :model-value="curso.progresso"
                      :size="xs ? 54 : 60"
                      :width="xs ? 5 : 6"
                      color="secondary"
                    >
                      {{ curso.progresso }}%
                    </v-progress-circular>
                  </div>
                </div>
              </v-list-item>
            </v-list>
          </v-card-text>
          <v-card-actions class="flex-wrap justify-end">
            <v-spacer />
            <v-btn color="primary" variant="text" class="text-none" :to="{ name: 'cursos' }">
              Ver Todos os Cursos
              <v-icon end>mdi-arrow-right</v-icon>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>

      <v-col cols="12" md="4">
        <v-card>
          <v-card-title class="section-card-title">
            <v-icon start>mdi-calendar-clock</v-icon>
            Próximas Atividades
          </v-card-title>
          <v-card-text>
            <v-timeline density="compact" align="start">
              <v-timeline-item
                v-for="(atividade, index) in proximasAtividades"
                :key="index"
                :dot-color="atividade.cor"
                size="small"
              >
                <div class="text-body-2 font-weight-bold">{{ atividade.titulo }}</div>
                <div class="text-caption text-medium-emphasis">{{ atividade.data }}</div>
              </v-timeline-item>
            </v-timeline>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useDisplay } from 'vuetify'
import { useCursosStore } from '@/stores'

const cursosStore = useCursosStore()
const { xs } = useDisplay()

const stats = ref({
  cursos: 3,
  concluidos: 1,
  atividades: 5,
  progresso: 58
})

const cursosEmAndamento = ref([])
const proximasAtividades = ref([
  {
    titulo: 'Entrega de Projeto Final',
    data: '15/03/2024',
    cor: 'error'
  },
  {
    titulo: 'Quiz de Revisão',
    data: '18/03/2024',
    cor: 'warning'
  },
  {
    titulo: 'Fórum de Discussão',
    data: '20/03/2024',
    cor: 'info'
  }
])

onMounted(async () => {
  await cursosStore.fetchCursos()
  cursosEmAndamento.value = cursosStore.cursos
})
</script>

<style scoped>
.dashboard-title {
  font-size: clamp(1.75rem, 4vw, 2.25rem);
  line-height: 1.1;
}

.dashboard-subtitle {
  font-size: clamp(0.98rem, 2.8vw, 1.05rem);
}

.stat-card-content {
  padding: 20px;
}

.stat-card-inner {
  display: flex;
  align-items: center;
}

.stat-value {
  font-size: clamp(1.75rem, 4vw, 2.125rem);
  line-height: 1.1;
}

.section-card-title {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
}

.course-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  width: 100%;
  padding: 12px 0;
}

.course-item-main {
  display: flex;
  align-items: center;
  gap: 16px;
  min-width: 0;
}

.course-copy {
  min-width: 0;
}

.course-progress {
  flex-shrink: 0;
}

@media (max-width: 600px) {
  .stat-card-content {
    padding: 16px;
  }

  .stat-card-inner {
    align-items: flex-start;
  }

  .course-item {
    flex-direction: column;
    align-items: flex-start;
  }

  .course-item-main {
    width: 100%;
    align-items: flex-start;
  }

  .course-progress {
    align-self: flex-end;
  }
}
</style>
