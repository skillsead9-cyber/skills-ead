<template>
  <div>
    <v-row class="mb-4">
      <v-col cols="12">
        <h1 class="text-h4 font-weight-bold">Detalhes do Curso</h1>
        <p class="text-body-1 text-medium-emphasis">
          Rota placeholder pronta para a futura integracao de conteudo detalhado.
        </p>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12" md="8">
        <v-card>
          <v-card-title>{{ titulo }}</v-card-title>
          <v-card-text>
            <p class="text-body-1 mb-4">
              Conteudo e progresso detalhado serao conectados ao backend em uma fase futura.
            </p>
            <v-chip color="primary" variant="flat">
              Curso ID: {{ route.params.id }}
            </v-chip>
          </v-card-text>
          <v-card-actions>
            <v-btn variant="text" color="primary" :to="{ name: 'cursos' }">
              Voltar para cursos
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

const titulo = computed(() => `Curso ${route.params.id}`)
</script>
