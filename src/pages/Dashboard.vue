<template>
  <div>
    <v-row>
      <v-col cols="12">
        <h1 class="text-h4 font-weight-bold mb-4">Dashboard</h1>
        <p class="text-body-1 text-medium-emphasis mb-6">
          Bem-vindo ao SKILLS Educacional! Acompanhe seu progresso e atividades.
        </p>
      </v-col>
    </v-row>

    <!-- Cards de Estatísticas -->
    <v-row class="mb-6">
      <v-col cols="12" sm="6" md="3">
        <v-card color="primary" dark>
          <v-card-text>
            <div class="d-flex align-center">
              <v-icon size="48" class="mr-4">mdi-book-open-variant</v-icon>
              <div>
                <div class="text-h4 font-weight-bold">{{ stats.cursos }}</div>
                <div class="text-body-2">Cursos Ativos</div>
              </div>
            </div>
          </v-card-text>
        </v-card>
      </v-col>

      <v-col cols="12" sm="6" md="3">
        <v-card color="secondary" dark>
          <v-card-text>
            <div class="d-flex align-center">
              <v-icon size="48" class="mr-4">mdi-check-circle</v-icon>
              <div>
                <div class="text-h4 font-weight-bold">{{ stats.concluidos }}</div>
                <div class="text-body-2">Concluídos</div>
              </div>
            </div>
          </v-card-text>
        </v-card>
      </v-col>

      <v-col cols="12" sm="6" md="3">
        <v-card color="accent" dark>
          <v-card-text>
            <div class="d-flex align-center">
              <v-icon size="48" class="mr-4">mdi-calendar-check</v-icon>
              <div>
                <div class="text-h4 font-weight-bold">{{ stats.atividades }}</div>
                <div class="text-body-2">Atividades</div>
              </div>
            </div>
          </v-card-text>
        </v-card>
      </v-col>

      <v-col cols="12" sm="6" md="3">
        <v-card color="info" dark>
          <v-card-text>
            <div class="d-flex align-center">
              <v-icon size="48" class="mr-4">mdi-chart-line</v-icon>
              <div>
                <div class="text-h4 font-weight-bold">{{ stats.progresso }}%</div>
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
          <v-card-title>
            <v-icon left>mdi-book-open-page-variant</v-icon>
            Cursos em Andamento
          </v-card-title>
          <v-card-text>
            <v-list>
              <v-list-item
                v-for="curso in cursosEmAndamento"
                :key="curso.id"
                :title="curso.titulo"
                :subtitle="curso.descricao"
              >
                <template v-slot:prepend>
                  <v-avatar color="primary" size="56">
                    <v-icon>mdi-book</v-icon>
                  </v-avatar>
                </template>

                <template v-slot:append>
                  <v-progress-circular
                    :model-value="curso.progresso"
                    :size="60"
                    :width="6"
                    color="secondary"
                  >
                    {{ curso.progresso }}%
                  </v-progress-circular>
                </template>
              </v-list-item>
            </v-list>
          </v-card-text>
          <v-card-actions>
            <v-spacer />
            <v-btn color="primary" variant="text" :to="{ name: 'cursos' }">
              Ver Todos os Cursos
              <v-icon right>mdi-arrow-right</v-icon>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>

      <v-col cols="12" md="4">
        <v-card>
          <v-card-title>
            <v-icon left>mdi-calendar-clock</v-icon>
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
import { useCursosStore } from '@/stores'

const cursosStore = useCursosStore()

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
