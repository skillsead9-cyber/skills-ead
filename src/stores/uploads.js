import { defineStore } from 'pinia'

export const useUploadStore = defineStore('uploads', {
  state: () => ({
    uploads: [],
    uploadAtual: null
  }),
  actions: {
    addUpload(upload) {
      this.uploads.push(upload)
      this.uploadAtual = upload
    },
    removeUpload(id) {
      this.uploads = this.uploads.filter((upload) => upload.id !== id)
      if (this.uploadAtual?.id === id) {
        this.uploadAtual = null
      }
    }
  }
})
