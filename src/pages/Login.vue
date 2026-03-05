<template>
  <v-container fluid class="fill-height px-4">
    <v-row align="center" justify="center" class="fill-height">
      <v-col cols="12" sm="10" md="7" lg="4">
        <v-card elevation="4" class="pa-6">
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
import { useAuthStore } from '@/stores'

const router = useRouter()
const authStore = useAuthStore()

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
  min-height: 100vh;
  background: linear-gradient(135deg, #0b132b 0%, #1a237e 100%);
}
</style>
