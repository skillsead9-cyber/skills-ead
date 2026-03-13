<template>
  <v-container fluid class="fill-height login-page px-4 px-sm-6">
    <v-row align="center" justify="center" class="fill-height login-row">
      <v-col cols="12" sm="10" md="7" lg="4" xl="3">
        <v-card elevation="6" class="login-card">
          <div class="text-center mb-6 login-header">
            <v-img
              src="/logo-skills.png"
              alt="SKILLS Educacional"
              :max-height="smAndDown ? 68 : 80"
              :max-width="smAndDown ? 180 : 200"
              contain
              class="mx-auto mb-4"
            />
            <h1 class="login-title font-weight-bold text-primary">SKILLS Educacional</h1>
            <p class="login-subtitle text-medium-emphasis mt-2">
              Acesso com sessao backend
            </p>
          </div>

          <v-form ref="form" v-model="valid" @submit.prevent="handleLogin">
            <v-text-field
              v-model="username"
              label="Usuario"
              autocomplete="username"
              prepend-inner-icon="mdi-account"
              variant="outlined"
              :rules="usernameRules"
              required
              class="mb-3"
            />

            <v-text-field
              v-model="password"
              label="Senha"
              type="password"
              autocomplete="current-password"
              prepend-inner-icon="mdi-lock"
              variant="outlined"
              :rules="passwordRules"
              required
              class="mb-4"
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
              class="text-none"
            >
              Entrar
            </v-btn>
          </v-form>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useDisplay } from 'vuetify'
import { useAuthStore } from '@/stores'

const router = useRouter()
const authStore = useAuthStore()
const { smAndDown } = useDisplay()

const form = ref(null)
const valid = ref(false)
const username = ref('')
const password = ref('')
const loading = ref(false)
const error = ref('')

const usernameRules = [
  (value) => !!value || 'Usuario e obrigatorio',
  (value) => (value && value.length >= 3) || 'Usuario deve ter no minimo 3 caracteres'
]

const passwordRules = [
  (value) => !!value || 'Senha e obrigatoria',
  (value) => (value && value.length >= 3) || 'Senha deve ter no minimo 3 caracteres'
]

const handleLogin = async () => {
  const validationResult = await form.value?.validate()
  if (!validationResult?.valid) return

  loading.value = true
  error.value = ''

  try {
    await authStore.login({
      username: username.value,
      password: password.value
    })

    await router.push({ name: 'dashboard' })
  } catch (loginError) {
    error.value = loginError?.message || authStore.authError || 'Falha no login.'
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.fill-height {
  min-height: 100dvh;
  background: linear-gradient(135deg, #0b132b 0%, #1a237e 100%);
}

.login-card {
  border-radius: 24px;
  padding: 24px;
  overflow: hidden;
}

.login-title {
  font-size: clamp(1.8rem, 5vw, 2.25rem);
  line-height: 1.1;
}

.login-subtitle {
  font-size: 0.95rem;
}

@media (max-width: 600px) {
  .login-card {
    padding: 20px 16px;
    border-radius: 20px;
  }

  .login-header {
    margin-bottom: 20px;
  }
}
</style>
