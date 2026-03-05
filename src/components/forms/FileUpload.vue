<template>
  <v-card>
    <v-card-title>
      <v-icon left>mdi-cloud-upload</v-icon>
      Upload de Arquivos
    </v-card-title>
    
    <v-card-text>
      <!-- Área de Drag and Drop -->
      <v-file-input
        v-model="files"
        :multiple="multiple"
        :accept="accept"
        :max-size="maxSize"
        :show-size="true"
        :chips="true"
        :clearable="true"
        label="Arraste arquivos aqui ou clique para selecionar"
        prepend-icon="mdi-paperclip"
        variant="outlined"
        @change="handleFileChange"
        class="mb-4"
      />

      <!-- Lista de Arquivos Selecionados -->
      <v-list v-if="selectedFiles.length > 0" class="mb-4">
        <v-list-item
          v-for="(file, index) in selectedFiles"
          :key="index"
          :title="file.name"
          :subtitle="formatFileSize(file.size)"
        >
          <template v-slot:prepend>
            <v-icon :color="getFileIconColor(file.type)">
              {{ getFileIcon(file.type) }}
            </v-icon>
          </template>
          
          <template v-slot:append>
            <v-btn
              icon
              size="small"
              variant="text"
              @click="removeFile(index)"
            >
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </template>
        </v-list-item>
      </v-list>

      <!-- Barra de Progresso -->
      <v-progress-linear
        v-if="uploading"
        :model-value="uploadProgress"
        color="secondary"
        height="8"
        rounded
        class="mb-2"
      />
      
      <div v-if="uploading" class="text-caption text-center">
        {{ uploadProgress }}% - {{ currentFileName }}
      </div>

      <!-- Botões de Ação -->
      <div class="d-flex justify-end gap-2 mt-4">
        <v-btn
          variant="outlined"
          @click="clearFiles"
          :disabled="selectedFiles.length === 0 || uploading"
        >
          Limpar
        </v-btn>
        <v-btn
          color="primary"
          @click="handleUpload"
          :disabled="selectedFiles.length === 0 || uploading"
          :loading="uploading"
        >
          <v-icon left>mdi-upload</v-icon>
          Enviar Arquivos
        </v-btn>
      </div>

      <!-- Mensagens de Feedback -->
      <v-alert
        v-if="uploadSuccess"
        type="success"
        variant="tonal"
        dismissible
        class="mt-4"
        @click:close="uploadSuccess = false"
      >
        Arquivos enviados com sucesso!
      </v-alert>

      <v-alert
        v-if="uploadError"
        type="error"
        variant="tonal"
        dismissible
        class="mt-4"
        @click:close="uploadError = false"
      >
        {{ uploadError }}
      </v-alert>
    </v-card-text>
  </v-card>
</template>

<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  multiple: {
    type: Boolean,
    default: true
  },
  accept: {
    type: String,
    default: '*/*'
  },
  maxSize: {
    type: Number,
    default: 10 * 1024 * 1024 // 10MB padrão
  }
})

const emit = defineEmits(['upload', 'upload-complete', 'upload-error'])

const files = ref([])
const selectedFiles = ref([])
const uploading = ref(false)
const uploadProgress = ref(0)
const currentFileName = ref('')
const uploadSuccess = ref(false)
const uploadError = ref('')

const handleFileChange = (event) => {
  if (event.target?.files) {
    const fileList = Array.from(event.target.files)
    
    // Validação de tamanho
    const invalidFiles = fileList.filter(file => file.size > props.maxSize)
    if (invalidFiles.length > 0) {
      uploadError.value = `Alguns arquivos excedem o tamanho máximo de ${formatFileSize(props.maxSize)}`
      return
    }
    
    selectedFiles.value = [...selectedFiles.value, ...fileList]
  }
}

const removeFile = (index) => {
  selectedFiles.value.splice(index, 1)
}

const clearFiles = () => {
  selectedFiles.value = []
  files.value = []
  uploadProgress.value = 0
  uploadSuccess.value = false
  uploadError.value = ''
}

const handleUpload = async () => {
  if (selectedFiles.value.length === 0) return

  uploading.value = true
  uploadProgress.value = 0
  uploadError.value = ''
  uploadSuccess.value = false

  try {
    // Simulação de upload com progresso
    for (let i = 0; i < selectedFiles.value.length; i++) {
      const file = selectedFiles.value[i]
      currentFileName.value = file.name

      // Simula progresso de upload
      for (let progress = 0; progress <= 100; progress += 10) {
        await new Promise(resolve => setTimeout(resolve, 100))
        uploadProgress.value = Math.round(((i / selectedFiles.value.length) * 100) + (progress / selectedFiles.value.length))
      }

      emit('upload', file)
    }

    uploadProgress.value = 100
    uploadSuccess.value = true
    emit('upload-complete', selectedFiles.value)
    
    // Limpa após sucesso (opcional)
    setTimeout(() => {
      clearFiles()
    }, 2000)
  } catch (error) {
    uploadError.value = 'Erro ao enviar arquivos. Tente novamente.'
    emit('upload-error', error)
  } finally {
    uploading.value = false
  }
}

const formatFileSize = (bytes) => {
  if (bytes === 0) return '0 Bytes'
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i]
}

const getFileIcon = (mimeType) => {
  if (!mimeType) return 'mdi-file'
  
  if (mimeType.startsWith('image/')) return 'mdi-image'
  if (mimeType.startsWith('video/')) return 'mdi-video'
  if (mimeType.startsWith('audio/')) return 'mdi-music'
  if (mimeType.includes('pdf')) return 'mdi-file-pdf-box'
  if (mimeType.includes('word')) return 'mdi-file-word-box'
  if (mimeType.includes('excel') || mimeType.includes('spreadsheet')) return 'mdi-file-excel-box'
  if (mimeType.includes('zip') || mimeType.includes('rar')) return 'mdi-folder-zip'
  
  return 'mdi-file-document'
}

const getFileIconColor = (mimeType) => {
  if (!mimeType) return 'grey'
  
  if (mimeType.startsWith('image/')) return 'primary'
  if (mimeType.startsWith('video/')) return 'secondary'
  if (mimeType.includes('pdf')) return 'error'
  
  return 'accent'
}
</script>

<style scoped>
.gap-2 {
  gap: 8px;
}
</style>
