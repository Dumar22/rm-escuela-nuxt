<script setup lang="ts">
definePageMeta({
  layout: false
})

const { signIn } = useAuth()
const router = useRouter()

const form = reactive({
  email: '',
  password: ''
})

const error = ref('')
const loading = ref(false)

const handleLogin = async () => {
  error.value = ''
  loading.value = true
  
  const result = await signIn(form.email, form.password)
  
  if (result.success) {
    router.push('/admin')
  } else {
    error.value = result.error || 'Error al iniciar sesión'
  }
  
  loading.value = false
}

useSeoMeta({
  title: 'Login - Admin RM Escuela',
  robots: 'noindex, nofollow'
})
</script>

<template>
  <div class="min-h-screen bg-gray-50 flex items-center justify-center px-4">
    <div class="max-w-md w-full">
      <div class="bg-white rounded-2xl shadow-lg p-8">
        <div class="text-center mb-8">
          <h1 class="text-3xl font-display font-bold text-gray-900 mb-2">
            Panel Administrativo
          </h1>
          <p class="text-gray-600">
            RM Escuela Creativa
          </p>
        </div>

        <form @submit.prevent="handleLogin" class="space-y-6">
          <UFormField label="Email" name="email" required>
            <UInput
              v-model="form.email"
              type="email"
              placeholder="admin@rmescuela.com"
              size="lg"
              required
              autocomplete="email"
            />
          </UFormField>

          <UFormField label="Contraseña" name="password" required>
            <UInput
              v-model="form.password"
              type="password"
              placeholder="••••••••"
              size="lg"
              required
              autocomplete="current-password"
            />
          </UFormField>

          <UAlert
            v-if="error"
            color="error"
            variant="soft"
            :title="error"
            icon="i-lucide-alert-circle"
          />

          <UButton
            type="submit"
            size="lg"
            block
            :loading="loading"
            :disabled="!form.email || !form.password"
          >
            Iniciar Sesión
          </UButton>
        </form>

        <div class="mt-6 text-center">
          <NuxtLink to="/" class="text-sm text-gray-600 hover:text-orange-600 transition-colors">
            ← Volver al sitio
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>
