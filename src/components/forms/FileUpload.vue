<template>
  <v-card class="file-upload-card">
    <v-card-title class="d-flex align-center flex-wrap">
      <v-icon start>mdi-cloud-upload</v-icon>
      Upload de Arquivos
    </v-card-title>

    <v-card-text>
      <v-file-input
        v-model="files"
        :multiple="multiple"
        :accept="accept"
        :show-size="true"
        :chips="true"
        :clearable="true"
        label="Selecione os arquivos"
        prepend-icon="mdi-paperclip"
        variant="outlined"
        class="mb-4"
        @update:model-value="handleSelection"
      />

      <v-list v-if="selectedFiles.length > 0" class="mb-4">
        <v-list-item
          v-for="(file, index) in selectedFiles"
          :key="`${file.name}-${index}`"
          :title="file.name"
          :subtitle="formatFileSize(file.size)"
          class="file-upload-item"
        >
          <template #prepend>
            <v-icon :color="getFileIconColor(file.type)">
              {{ getFileIcon(file.type) }}
            </v-icon>
          </template>
          <template #append>
            <v-btn
              icon
              size="small"
              variant="text"
              @click="removeFile(index)"
              aria-label="Remover arquivo"
            >
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </template>
        </v-list-item>
      </v-list>

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

      <div class="d-flex justify-end gap-2 mt-4 flex-wrap upload-actions">
        <v-btn
          variant="outlined"
          @click="clearFiles"
          :disabled="selectedFiles.length === 0 || uploading"
          class="text-none"
        >
          Limpar
        </v-btn>
        <v-btn
          color="primary"
          @click="handleUpload"
          :disabled="selectedFiles.length === 0 || uploading"
          :loading="uploading"
          class="text-none"
        >
          <v-icon start>mdi-upload</v-icon>
          Enviar Arquivos
        </v-btn>
      </div>

      <v-alert
        v-if="uploadSuccess"
        type="success"
        variant="tonal"
        dismissible
        class="mt-4"
        @click:close="uploadSuccess = false"
      >
        Arquivos enviados com sucesso.
      </v-alert>

      <v-alert
        v-if="uploadError"
        type="error"
        variant="tonal"
        dismissible
        class="mt-4"
        @click:close="uploadError = ''"
      >
        {{ uploadError }}
      </v-alert>
    </v-card-text>
  </v-card>
</template>

<script setup>
import { ref } from 'vue'

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
    default: 10 * 1024 * 1024
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

const normalizeFiles = (value) => {
  if (!value) return []
  return Array.isArray(value) ? value : [value]
}

const handleSelection = (value) => {
  const parsedFiles = normalizeFiles(value)

  const invalidFile = parsedFiles.find((file) => file.size > props.maxSize)
  if (invalidFile) {
    uploadError.value = `Arquivo acima do limite de ${formatFileSize(props.maxSize)}.`
    selectedFiles.value = []
    return
  }

  uploadError.value = ''
  selectedFiles.value = parsedFiles
}

const removeFile = (index) => {
  selectedFiles.value.splice(index, 1)
  files.value = [...selectedFiles.value]
}

const clearFiles = () => {
  selectedFiles.value = []
  files.value = []
  uploadProgress.value = 0
  uploadSuccess.value = false
  uploadError.value = ''
}

const handleUpload = async () => {
  if (!selectedFiles.value.length) return

  uploading.value = true
  uploadProgress.value = 0
  uploadError.value = ''
  uploadSuccess.value = false

  try {
    const totalFiles = selectedFiles.value.length
    for (let i = 0; i < totalFiles; i += 1) {
      const file = selectedFiles.value[i]
      currentFileName.value = file.name

      for (let progress = 0; progress <= 100; progress += 10) {
        await new Promise((resolve) => setTimeout(resolve, 90))
        uploadProgress.value = Math.round(
          ((i / totalFiles) * 100) + (progress / totalFiles)
        )
      }

      emit('upload', file)
    }

    uploadProgress.value = 100
    uploadSuccess.value = true
    emit('upload-complete', [...selectedFiles.value])
  } catch (error) {
    uploadError.value = 'Falha no upload. Tente novamente.'
    emit('upload-error', error)
  } finally {
    uploading.value = false
  }
}

const formatFileSize = (bytes) => {
  if (!bytes) return '0 Bytes'
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return `${Math.round((bytes / Math.pow(k, i)) * 100) / 100} ${sizes[i]}`
}

const getFileIcon = (mimeType) => {
  if (!mimeType) return 'mdi-file'
  if (mimeType.startsWith('image/')) return 'mdi-image'
  if (mimeType.startsWith('video/')) return 'mdi-video'
  if (mimeType.startsWith('audio/')) return 'mdi-music'
  if (mimeType.includes('pdf')) return 'mdi-file-pdf-box'
  if (mimeType.includes('word')) return 'mdi-file-word-box'
  if (mimeType.includes('excel') || mimeType.includes('spreadsheet')) return 'mdi-file-excel-box'
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

.upload-actions > * {
  flex: 1 1 160px;
}

.file-upload-item :deep(.v-list-item-title),
.file-upload-item :deep(.v-list-item-subtitle) {
  white-space: normal;
  word-break: break-word;
}

@media (min-width: 600px) {
  .upload-actions > * {
    flex: 0 0 auto;
  }
}
</style>
