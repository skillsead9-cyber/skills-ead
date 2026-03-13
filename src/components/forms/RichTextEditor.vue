<template>
  <v-card>
    <v-card-title class="d-flex align-center">
      <v-icon left>mdi-text-box</v-icon>
      Editor de Texto
    </v-card-title>

    <v-card-text>
      <!-- Toolbar de Formatação -->
      <v-card
        variant="outlined"
        class="mb-4"
        elevation="0"
      >
        <v-card-text class="pa-2">
          <div class="d-flex flex-wrap align-center gap-1 editor-toolbar-row">
            <!-- Formatação de Texto -->
            <v-btn
              size="small"
              variant="text"
              icon
              :color="editor?.isActive('bold') ? 'primary' : ''"
              @click="editor?.chain().focus().toggleBold().run()"
              title="Negrito"
            >
              <v-icon>mdi-format-bold</v-icon>
            </v-btn>

            <v-btn
              size="small"
              variant="text"
              icon
              :color="editor?.isActive('italic') ? 'primary' : ''"
              @click="editor?.chain().focus().toggleItalic().run()"
              title="Itálico"
            >
              <v-icon>mdi-format-italic</v-icon>
            </v-btn>

            <v-btn
              size="small"
              variant="text"
              icon
              :color="editor?.isActive('underline') ? 'primary' : ''"
              @click="editor?.chain().focus().toggleUnderline().run()"
              title="Sublinhado"
            >
              <v-icon>mdi-format-underline</v-icon>
            </v-btn>

            <v-divider vertical class="mx-1" />

            <!-- Títulos -->
            <v-menu>
              <template v-slot:activator="{ props }">
                <v-btn
                  size="small"
                  variant="text"
                  v-bind="props"
                  title="Título"
                >
                  <v-icon>mdi-format-header-1</v-icon>
                </v-btn>
              </template>
              <v-list>
                <v-list-item @click="editor?.chain().focus().toggleHeading({ level: 1 }).run()">
                  <v-list-item-title>Título 1</v-list-item-title>
                </v-list-item>
                <v-list-item @click="editor?.chain().focus().toggleHeading({ level: 2 }).run()">
                  <v-list-item-title>Título 2</v-list-item-title>
                </v-list-item>
                <v-list-item @click="editor?.chain().focus().toggleHeading({ level: 3 }).run()">
                  <v-list-item-title>Título 3</v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>

            <v-divider vertical class="mx-1" />

            <!-- Listas -->
            <v-btn
              size="small"
              variant="text"
              icon
              :color="editor?.isActive('bulletList') ? 'primary' : ''"
              @click="editor?.chain().focus().toggleBulletList().run()"
              title="Lista com marcadores"
            >
              <v-icon>mdi-format-list-bulleted</v-icon>
            </v-btn>

            <v-btn
              size="small"
              variant="text"
              icon
              :color="editor?.isActive('orderedList') ? 'primary' : ''"
              @click="editor?.chain().focus().toggleOrderedList().run()"
              title="Lista numerada"
            >
              <v-icon>mdi-format-list-numbered</v-icon>
            </v-btn>

            <v-divider vertical class="mx-1" />

            <!-- Tabela -->
            <v-btn
              size="small"
              variant="text"
              icon
              @click="insertTable"
              title="Inserir tabela"
            >
              <v-icon>mdi-table</v-icon>
            </v-btn>

            <!-- Link -->
            <v-btn
              size="small"
              variant="text"
              icon
              :color="editor?.isActive('link') ? 'primary' : ''"
              @click="setLink"
              title="Inserir link"
            >
              <v-icon>mdi-link</v-icon>
            </v-btn>

            <!-- Imagem -->
            <v-btn
              size="small"
              variant="text"
              icon
              @click="insertImage"
              title="Inserir imagem"
            >
              <v-icon>mdi-image</v-icon>
            </v-btn>

            <v-divider vertical class="mx-1" />

            <!-- Desfazer/Refazer -->
            <v-btn
              size="small"
              variant="text"
              icon
              @click="editor?.chain().focus().undo().run()"
              :disabled="!editor?.can().undo()"
              title="Desfazer"
            >
              <v-icon>mdi-undo</v-icon>
            </v-btn>

            <v-btn
              size="small"
              variant="text"
              icon
              @click="editor?.chain().focus().redo().run()"
              :disabled="!editor?.can().redo()"
              title="Refazer"
            >
              <v-icon>mdi-redo</v-icon>
            </v-btn>
          </div>
        </v-card-text>
      </v-card>

      <!-- Editor de Texto -->
      <div class="editor-container">
        <editor-content :editor="editor" />
      </div>

      <!-- Diálogo para inserção de link -->
      <v-dialog v-model="linkDialog" max-width="500">
        <v-card>
          <v-card-title>Inserir Link</v-card-title>
          <v-card-text>
            <v-text-field
              v-model="linkUrl"
              label="URL"
              placeholder="https://exemplo.com"
              variant="outlined"
            />
          </v-card-text>
          <v-card-actions>
            <v-spacer />
            <v-btn variant="text" @click="linkDialog = false">Cancelar</v-btn>
            <v-btn color="primary" @click="confirmLink">Inserir</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

      <!-- Diálogo para inserção de imagem -->
      <v-dialog v-model="imageDialog" max-width="500">
        <v-card>
          <v-card-title>Inserir Imagem</v-card-title>
          <v-card-text>
            <v-text-field
              v-model="imageUrl"
              label="URL da Imagem"
              placeholder="https://exemplo.com/imagem.jpg"
              variant="outlined"
            />
          </v-card-text>
          <v-card-actions>
            <v-spacer />
            <v-btn variant="text" @click="imageDialog = false">Cancelar</v-btn>
            <v-btn color="primary" @click="confirmImage">Inserir</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-card-text>
  </v-card>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, watch } from 'vue'
import { useEditor, EditorContent } from '@tiptap/vue-3'
import StarterKit from '@tiptap/starter-kit'
import Table from '@tiptap/extension-table'
import TableRow from '@tiptap/extension-table-row'
import TableCell from '@tiptap/extension-table-cell'
import TableHeader from '@tiptap/extension-table-header'
import Image from '@tiptap/extension-image'
import Link from '@tiptap/extension-link'
import Underline from '@tiptap/extension-underline'

const props = defineProps({
  modelValue: {
    type: String,
    default: ''
  },
  placeholder: {
    type: String,
    default: 'Digite seu texto aqui...'
  }
})

const emit = defineEmits(['update:modelValue'])

const linkDialog = ref(false)
const linkUrl = ref('')
const imageDialog = ref(false)
const imageUrl = ref('')

const editor = useEditor({
  content: props.modelValue,
  extensions: [
    StarterKit,
    Table.configure({
      resizable: true
    }),
    TableRow,
    TableHeader,
    TableCell,
    Image,
    Underline,
    Link.configure({
      openOnClick: false,
      HTMLAttributes: {
        target: '_blank',
        rel: 'noopener noreferrer'
      }
    })
  ],
  editorProps: {
    attributes: {
      class: 'tiptap-editor'
    }
  },
  onUpdate: ({ editor }) => {
    emit('update:modelValue', editor.getHTML())
  }
})

const insertTable = () => {
  editor.value?.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run()
}

const setLink = () => {
  linkDialog.value = true
  linkUrl.value = ''
}

const confirmLink = () => {
  if (linkUrl.value) {
    editor.value?.chain().focus().setLink({ href: linkUrl.value }).run()
  }
  linkDialog.value = false
  linkUrl.value = ''
}

const insertImage = () => {
  imageDialog.value = true
  imageUrl.value = ''
}

const confirmImage = () => {
  if (imageUrl.value) {
    editor.value?.chain().focus().setImage({ src: imageUrl.value }).run()
  }
  imageDialog.value = false
  imageUrl.value = ''
}

watch(() => props.modelValue, (value) => {
  const isSame = editor.value?.getHTML() === value
  if (!isSame) {
    editor.value?.commands.setContent(value || '')
  }
})

onMounted(() => {
  if (props.modelValue) {
    editor.value?.commands.setContent(props.modelValue)
  }
})

onBeforeUnmount(() => {
  editor.value?.destroy()
})
</script>

<style scoped>
.editor-container {
  border: 1px solid rgba(0, 0, 0, 0.12);
  border-radius: 4px;
  min-height: 300px;
  max-width: 100%;
  overflow-x: auto;
}

:deep(.ProseMirror.tiptap-editor) {
  outline: none;
  padding: 16px;
  min-height: 300px;
  font-family: 'Roboto', sans-serif;
  font-size: 16px;
  line-height: 1.6;
  color: rgba(0, 0, 0, 0.87);
}

:deep(.ProseMirror.tiptap-editor h1) {
  font-size: 2em;
  font-weight: bold;
  margin: 0.5em 0;
}

:deep(.ProseMirror.tiptap-editor h2) {
  font-size: 1.5em;
  font-weight: bold;
  margin: 0.5em 0;
}

:deep(.ProseMirror.tiptap-editor h3) {
  font-size: 1.25em;
  font-weight: bold;
  margin: 0.5em 0;
}

:deep(.ProseMirror.tiptap-editor p) {
  margin: 0.5em 0;
}

:deep(.ProseMirror.tiptap-editor ul, .ProseMirror.tiptap-editor ol) {
  padding-left: 1.5em;
  margin: 0.5em 0;
}

:deep(.ProseMirror.tiptap-editor a) {
  color: #0B132B;
  text-decoration: underline;
}

:deep(.ProseMirror p.is-editor-empty:first-child::before) {
  color: #adb5bd;
  content: attr(data-placeholder);
  float: left;
  height: 0;
  pointer-events: none;
}

:deep(.ProseMirror table) {
  border-collapse: collapse;
  margin: 0;
  overflow: hidden;
  table-layout: fixed;
  min-width: 100%;
  width: max-content;
}

:deep(.ProseMirror table td, .ProseMirror table th) {
  border: 1px solid #ced4da;
  box-sizing: border-box;
  min-width: 1em;
  padding: 6px 8px;
  position: relative;
  vertical-align: top;
}

:deep(.ProseMirror table th) {
  background-color: #f1f3f5;
  font-weight: bold;
}

:deep(.ProseMirror table .selectedCell:after) {
  z-index: 2;
  position: absolute;
  content: "";
  left: 0; right: 0; top: 0; bottom: 0;
  background: rgba(200, 200, 255, 0.4);
  pointer-events: none;
}

:deep(.ProseMirror img) {
  max-width: 100%;
  height: auto;
}

.gap-1 {
  gap: 4px;
}

@media (max-width: 600px) {
  .editor-toolbar-row {
    flex-wrap: nowrap;
    overflow-x: auto;
    padding-bottom: 4px;
  }

  .editor-container,
  :deep(.ProseMirror.tiptap-editor) {
    min-height: 240px;
  }

  :deep(.ProseMirror.tiptap-editor) {
    padding: 12px;
    font-size: 15px;
  }
}
</style>
