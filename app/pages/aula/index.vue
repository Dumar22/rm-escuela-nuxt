<script setup lang="ts">
definePageMeta({
  middleware: 'user-auth'
})

const { user, getUser } = useAuth()
const { destacados } = useCursos()

const loading = ref(false)

const initUser = async () => {
  loading.value = true
  try {
    await getUser()
  }
  catch (error) {
    console.error('Error loading static aula:', error)
  }
  finally {
    loading.value = false
  }
}

onMounted(() => {
  initUser()
})

useSeoMeta({
  title: 'Mi Aula – RM Escuela'
})
</script>

<template>
  <div class="min-h-screen bg-gray-50/50 pb-20">
    <section class="relative bg-gray-950 text-white overflow-hidden mb-10">
      <div class="absolute inset-0 bg-gradient-to-br from-orange-600/30 via-gray-950/80 to-gray-950" style="pointer-events:none;" />
      <div class="relative mx-auto max-w-7xl px-6 lg:px-8 py-16 text-center">
        <h1 class="text-4xl font-display font-bold tracking-tight sm:text-5xl mb-3">Mi Aula</h1>
        <p class="text-lg text-gray-300 max-w-xl mx-auto">Bienvenido {{ user?.email }}. Aquí encuentras tus cursos activos.</p>
      </div>
    </section>

    <div class="mx-auto max-w-7xl px-6 lg:px-8">
      <div v-if="loading" class="text-center py-12">
        <UIcon name="i-lucide-loader-2" class="w-8 h-8 animate-spin text-orange-600 mx-auto" />
      </div>

      <div v-else class="space-y-8">
        <div class="bg-amber-50 border border-amber-200 rounded-xl p-6">
          <h2 class="text-xl font-bold text-amber-800 mb-2">Modo estático activo</h2>
          <p class="text-amber-800/90">
            Por presupuesto, esta sección está funcionando sin base de datos por unos días.
            Los cursos y el blog siguen disponibles en el sitio, y el acceso al contenido del aula se habilitará nuevamente al reconectar servicios.
          </p>
        </div>

        <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-10 text-center">
          <UIcon name="i-lucide-book-open" class="w-14 h-14 text-gray-300 mx-auto mb-4" />
          <h2 class="text-2xl font-bold text-gray-900 mb-2">Aula en pausa temporal</h2>
          <p class="text-gray-600 mb-6">Puedes seguir viendo el catálogo completo y apartar tu curso con un asesor.</p>
          <UButton to="/cursos" color="primary" size="lg">Ver cursos</UButton>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <article v-for="curso in destacados" :key="curso.id" class="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <NuxtImg :src="curso.image" :alt="curso.title" class="w-full h-52 object-cover" width="600" height="400" />
            <div class="p-5">
              <h3 class="text-lg font-bold text-gray-900 mb-2">{{ curso.title }}</h3>
              <p class="text-sm text-gray-600 mb-4 line-clamp-2">{{ curso.shortDesc }}</p>
              <UButton :to="`/cursos/${curso.slug}`" color="primary" block>Ver curso</UButton>
            </div>
          </article>
        </div>
      </div>
    </div>
  </div>
</template>
