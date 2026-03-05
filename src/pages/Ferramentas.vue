<template>
  <div>
    <v-row class="mb-4">
      <v-col cols="12">
        <h1 class="text-h4 font-weight-bold">Ferramentas da Plataforma</h1>
        <p class="text-body-1 text-medium-emphasis">
          Componentes base validados em modo placeholder funcional.
        </p>
      </v-col>
    </v-row>

    <v-row class="mb-6">
      <v-col cols="12" md="6">
        <v-card class="pa-4">
          <v-card-title class="px-0 pt-0">Inputs e botoes</v-card-title>
          <v-card-text class="px-0 pb-0">
            <v-text-field
              v-model="nomeAtividade"
              label="Nome da atividade"
              variant="outlined"
              class="mb-3"
            />
            <v-textarea
              v-model="descricaoAtividade"
              label="Descricao"
              variant="outlined"
              rows="3"
              class="mb-3"
            />
            <div class="d-flex gap-2 flex-wrap">
              <v-btn color="primary" @click="registrarAtividade">
                Salvar
              </v-btn>
              <v-btn variant="outlined" @click="limparFormulario">
                Limpar
              </v-btn>
            </div>
          </v-card-text>
        </v-card>
      </v-col>

      <v-col cols="12" md="6">
        <v-card class="pa-4 h-100">
          <v-card-title class="px-0 pt-0">Resumo</v-card-title>
          <v-card-text class="px-0 pb-0">
            <p class="text-body-2 mb-2"><strong>Atividade:</strong> {{ nomeAtividade || '---' }}</p>
            <p class="text-body-2 mb-4"><strong>Descricao:</strong> {{ descricaoAtividade || '---' }}</p>
            <v-alert type="info" variant="tonal" density="comfortable">
              Este modulo esta pronto para uso de interface e aguardando integracao de negocio.
            </v-alert>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <v-row class="mb-6">
      <v-col cols="12">
        <v-card>
          <v-card-title>Tabela de atividades (placeholder)</v-card-title>
          <v-card-text>
            <v-table>
              <thead>
                <tr>
                  <th class="text-left">Titulo</th>
                  <th class="text-left">Tipo</th>
                  <th class="text-left">Status</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="item in atividades" :key="item.id">
                  <td>{{ item.titulo }}</td>
                  <td>{{ item.tipo }}</td>
                  <td>
                    <v-chip :color="item.status === 'Ativo' ? 'success' : 'warning'" size="small">
                      {{ item.status }}
                    </v-chip>
                  </td>
                </tr>
              </tbody>
            </v-table>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <v-row class="mb-6">
      <v-col cols="12" md="6">
        <FileUpload @upload-complete="onUploadComplete" />
      </v-col>
      <v-col cols="12" md="6">
        <v-card>
          <v-card-title>Ultimo upload</v-card-title>
          <v-card-text>
            <div v-if="ultimoUpload.length > 0">
              <v-list density="compact">
                <v-list-item
                  v-for="file in ultimoUpload"
                  :key="`${file.name}-${file.size}`"
                  :title="file.name"
                  :subtitle="`${Math.round(file.size / 1024)} KB`"
                />
              </v-list>
            </div>
            <p v-else class="text-body-2 text-medium-emphasis">
              Nenhum arquivo enviado nesta sessao.
            </p>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12">
        <RichTextEditor v-model="conteudoEditor" />
      </v-col>
    </v-row>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import FileUpload from '@/components/forms/FileUpload.vue'
import RichTextEditor from '@/components/forms/RichTextEditor.vue'

const nomeAtividade = ref('')
const descricaoAtividade = ref('')
const conteudoEditor = ref('<p>Escreva aqui o conteudo da atividade.</p>')
const ultimoUpload = ref([])

const atividades = ref([
  { id: 1, titulo: 'Plano de Aula', tipo: 'Documento', status: 'Ativo' },
  { id: 2, titulo: 'Guia de Estudos', tipo: 'Material', status: 'Ativo' },
  { id: 3, titulo: 'Roteiro de Projeto', tipo: 'Projeto', status: 'Rascunho' }
])

const registrarAtividade = () => {
  if (!nomeAtividade.value.trim()) return
  atividades.value.unshift({
    id: Date.now(),
    titulo: nomeAtividade.value,
    tipo: 'Manual',
    status: 'Rascunho'
  })
  limparFormulario()
}

const limparFormulario = () => {
  nomeAtividade.value = ''
  descricaoAtividade.value = ''
}

const onUploadComplete = (files) => {
  ultimoUpload.value = files
}
</script>

<style scoped>
.gap-2 {
  gap: 8px;
}
</style>
