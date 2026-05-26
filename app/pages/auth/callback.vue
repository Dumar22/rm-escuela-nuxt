<script setup lang="ts">
definePageMeta({
  layout: false
})

const router = useRouter()
const { getUser } = useAuth()

onMounted(async () => {
  try {
    // Esperar un momento para que Supabase procese la sesión
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    const user = await getUser()
    if (user) {
      // Usuario autenticado, redirigir al aula
      await router.push('/aula')
    } else {
      // Algo salió mal, redirigir de vuelta a acceso
      await router.push('/acceso')
    }
  } catch (error) {
    console.error('Error en callback:', error)
    await router.push('/acceso')
  }
})
</script>

<template>
  <div class="min-h-screen bg-gray-50 flex items-center justify-center">
    <div class="text-center">
      <h2 class="text-2xl font-bold text-gray-900 mb-4">Autenticando...</h2>
      <p class="text-gray-600">Espera mientras completamos tu registro.</p>
    </div>
  </div>
</template>
