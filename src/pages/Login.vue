<template>
  <v-container fluid class="fill-height">
    <v-row align="center" justify="center" class="fill-height">
      <v-col cols="12" sm="8" md="6" lg="4">
        <v-card elevation="4" class="pa-6">
          <!-- Logo SKILLS -->
          <div class="text-center mb-6">
            <v-img
              src="/logo-skills.png"
              alt="SKILLS Educacional"
              max-height="80"
              max-width="200"
              contain
              class="mx-auto mb-4"
            />
            <h1 class="text-h4 font-weight-bold text-primary">SKILLS Educacional</h1>
            <p class="text-body-2 text-medium-emphasis mt-2">
              Ambiente Virtual de Aprendizagem
            </p>
          </div>

          <!-- Formulário de Login -->
          <v-form ref="form" v-model="valid" @submit.prevent="handleLogin">
            <v-text-field
              v-model="email"
              label="E-mail"
              type="email"
              prepend-inner-icon="mdi-email"
              variant="outlined"
              :rules="emailRules"
              required
              class="mb-3"
            />

            <v-text-field
              v-model="password"
              label="Senha"
              type="password"
              prepend-inner-icon="mdi-lock"
              variant="outlined"
              :rules="passwordRules"
              required
              class="mb-4"
            />

            <v-checkbox
              v-model="remember"
              label="Lembrar-me"
              color="primary"
              class="mb-2"
            />

            <v-alert
              v-if="error"
              type="error"
              variant="tonal"
              dismissible
              class="mb-4"
              @click:close="error = ''"
            >
              {{ error }}
            </v-alert>

            <v-btn
              type="submit"
              color="primary"
              size="large"
              block
              :loading="loading"
              class="mb-3"
            >
              Entrar
            </v-btn>

            <div class="text-center">
              <v-btn
                variant="text"
                size="small"
                color="primary"
              >
                Esqueci minha senha
              </v-btn>
            </div>
          </v-form>
        </v-card>

        <!-- Informações adicionais -->
        <div class="text-center mt-4">
          <p class="text-body-2 text-medium-emphasis">
            Não tem uma conta?
            <v-btn
              variant="text"
              size="small"
              color="primary"
            >
              Entre em contato
            </v-btn>
          </p>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores'

const router = useRouter()
const authStore = useAuthStore()

const form = ref(null)
const valid = ref(false)
const email = ref('')
const password = ref('')
const remember = ref(false)
const loading = ref(false)
const error = ref('')

const emailRules = [
  v => !!v || 'E-mail é obrigatório',
  v => /.+@.+\..+/.test(v) || 'E-mail deve ser válido'
]

const passwordRules = [
  v => !!v || 'Senha é obrigatória',
  v => (v && v.length >= 6) || 'Senha deve ter no mínimo 6 caracteres'
]

const handleLogin = async () => {
  const { valid: isValid } = await form.value.validate()
  
  if (!isValid) return

  loading.value = true
  error.value = ''

  try {
    // Mock de autenticação
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    await authStore.login({
      email: email.value,
      password: password.value
    })

    router.push({ name: 'dashboard' })
  } catch (err) {
    error.value = 'E-mail ou senha inválidos'
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.fill-height {
  min-height: 100vh;
  background: linear-gradient(135deg, #0B132B 0%, #1A237E 100%);
}
</style>
