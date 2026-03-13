<script setup lang="ts">
definePageMeta({
  layout: false
})

const { signIn, signUp, signInWithGoogle, signInWithApple, signInWithMicrosoft, signInWithGitHub } = useAuth()
const router = useRouter()

const mode = ref<'login' | 'register'>('login')
const loading = ref(false)
const error = ref('')

const form = reactive({
  fullName: '',
  email: '',
  password: ''
})

const submit = async () => {
  error.value = ''
  loading.value = true
  try {
    if (mode.value === 'login') {
      const result = await signIn(form.email, form.password)
      if (!result.success) {
        error.value = result.error || 'No se pudo iniciar sesión'
        return
      }
      await router.push('/aula')
      return
    }

    const result = await signUp(form.email, form.password, { full_name: form.fullName })
    if (!result.success) {
      error.value = result.error || 'No se pudo crear la cuenta'
      return
    }

    // Intentar login inmediato
    const loginResult = await signIn(form.email, form.password)
    if (loginResult.success) {
      await router.push('/aula')
    } else {
      error.value = 'Cuenta creada. Revisa tu correo para confirmar e iniciar sesión.'
      mode.value = 'login'
    }
  }
  finally {
    loading.value = false
  }
}

const handleGoogleSignIn = async () => {
  const result = await signInWithGoogle()
  if (!result.success) error.value = result.error || 'No disponible temporalmente.'
}

const handleAppleSignIn = async () => {
  const result = await signInWithApple()
  if (!result.success) error.value = result.error || 'No disponible temporalmente.'
}

const handleMicrosoftSignIn = async () => {
  const result = await signInWithMicrosoft()
  if (!result.success) error.value = result.error || 'No disponible temporalmente.'
}

const handleGitHubSignIn = async () => {
  const result = await signInWithGitHub()
  if (!result.success) error.value = result.error || 'No disponible temporalmente.'
}

useSeoMeta({
  title: 'Acceso a estudiantes – RM Escuela',
  description: 'Inicia sesión para comprar cursos y acceder al material de formación.'
})
</script>

<template>
  <div class="min-h-screen bg-gray-50 flex items-center justify-center px-4">
    <div class="max-w-md w-full bg-white rounded-2xl shadow-lg p-8">
      <h1 class="text-3xl font-display font-bold text-gray-900 mb-2 text-center">{{ mode === 'login' ? 'Iniciar sesión' : 'Crear cuenta' }}</h1>
      <p class="text-gray-600 text-center mb-6">Accede al Aula y a tus cursos comprados.</p>

      <div class="flex bg-gray-100 rounded-lg p-1 mb-6">
        <button class="flex-1 py-2 rounded-md text-sm font-semibold" :class="mode === 'login' ? 'bg-white shadow text-gray-900' : 'text-gray-600'" @click="mode = 'login'">Ingreso</button>
        <button class="flex-1 py-2 rounded-md text-sm font-semibold" :class="mode === 'register' ? 'bg-white shadow text-gray-900' : 'text-gray-600'" @click="mode = 'register'">Registro</button>
      </div>

      <form class="space-y-4" @submit.prevent="submit">
        <UFormField v-if="mode === 'register'" label="Nombre completo" required>
          <UInput v-model="form.fullName" size="lg" required />
        </UFormField>
        <UFormField label="Email" required>
          <UInput v-model="form.email" type="email" size="lg" required />
        </UFormField>
        <UFormField label="Contraseña" required>
          <UInput v-model="form.password" type="password" size="lg" required />
        </UFormField>

        <UAlert v-if="error" color="error" variant="soft" :title="error" />

        <UButton type="submit" block size="lg" color="primary" :loading="loading">
          {{ mode === 'login' ? 'Entrar al Aula' : 'Crear cuenta' }}
        </UButton>
      </form>

      <!-- OAuth divider -->
      <div class="mt-8 relative">
        <div class="absolute inset-0 flex items-center">
          <div class="w-full border-t border-gray-300"></div>
        </div>
        <div class="relative flex justify-center text-sm">
          <span class="px-2 bg-white text-gray-500">O regístrate con</span>
        </div>
      </div>

      <!-- OAuth buttons -->
      <div class="mt-6 grid grid-cols-2 gap-3">
        <UButton 
          @click.prevent="handleGoogleSignIn"
          :loading="loading"
          variant="outline"
          block
          size="sm"
          class="flex items-center justify-center gap-2 border border-gray-300 hover:bg-gray-50"
        >
          <svg class="w-5 h-5" viewBox="0 0 24 24">
            <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
            <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
            <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
            <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
          </svg>
          <span>Google</span>
        </UButton>

        <UButton 
          @click.prevent="handleAppleSignIn"
          :loading="loading"
          variant="outline"
          block
          size="sm"
          class="flex items-center justify-center gap-2 border border-gray-300 hover:bg-gray-50"
        >
          <svg class="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
            <path d="M17.05 13.5c-.91 0-1.72.44-2.25 1.13.46.92 1.3 1.72 2.25 2.09.95-.37 1.79-1.17 2.25-2.09-.53-.69-1.34-1.13-2.25-1.13zm-7 0c-.91 0-1.72.44-2.25 1.13.46.92 1.3 1.72 2.25 2.09.95-.37 1.79-1.17 2.25-2.09-.53-.69-1.34-1.13-2.25-1.13zM8 6h8c3.31 0 6 2.69 6 6s-2.69 6-6 6h-1.5V20c0 1.1-.9 2-2 2s-2-.9-2-2v-2H8c-3.31 0-6-2.69-6-6s2.69-6 6-6zm0 2c-2.21 0-4 1.79-4 4s1.79 4 4 4h8c2.21 0 4-1.79 4-4s-1.79-4-4-4H8zm0 1h8c1.66 0 3 1.34 3 3s-1.34 3-3 3H8c-1.66 0-3-1.34-3-3s1.34-3 3-3z"/>
          </svg>
          <span>Apple</span>
        </UButton>

        <UButton 
          @click.prevent="handleMicrosoftSignIn"
          :loading="loading"
          variant="outline"
          block
          size="sm"
          class="flex items-center justify-center gap-2 border border-gray-300 hover:bg-gray-50"
        >
          <svg class="w-5 h-5" viewBox="0 0 23 23">
            <rect fill="#F25022" width="11" height="11" x="1" y="1"/>
            <rect fill="#7FBA00" width="11" height="11" x="12" y="1"/>
            <rect fill="#00A4EF" width="11" height="11" x="1" y="12"/>
            <rect fill="#FFB900" width="11" height="11" x="12" y="12"/>
          </svg>
          <span>Microsoft</span>
        </UButton>

        <UButton 
          @click.prevent="handleGitHubSignIn"
          :loading="loading"
          variant="outline"
          block
          size="sm"
          class="flex items-center justify-center gap-2 border border-gray-300 hover:bg-gray-50"
        >
          <svg class="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v 3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
          </svg>
          <span>GitHub</span>
        </UButton>
      </div>

      <div class="mt-5 text-center">
        <NuxtLink to="/" class="text-sm text-gray-600 hover:text-orange-600">← Volver al sitio</NuxtLink>
      </div>
    </div>
  </div>
</template>
