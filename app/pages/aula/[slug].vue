<script setup lang="ts">
definePageMeta({
  middleware: 'user-auth'
})

const route = useRoute()
const { getCurso } = useCursos()

const curso = computed(() => getCurso(route.params.slug as string))

useSeoMeta({
  title: () => curso.value ? `Aula: ${curso.value.title}` : 'Aula'
})
</script>

<template>
  <div class="min-h-screen bg-white pb-20">
    <div class="mx-auto max-w-6xl px-6 lg:px-8 py-10">
      <NuxtLink to="/aula" class="inline-flex items-center gap-2 text-sm text-orange-600 hover:text-orange-700 mb-6">
        <UIcon name="i-lucide-arrow-left" class="w-4 h-4" /> Volver al aula
      </NuxtLink>

      <template v-if="curso">
        <header class="mb-8">
          <h1 class="text-3xl sm:text-4xl font-display font-bold text-gray-900 mb-2">{{ curso.title }}</h1>
          <p class="text-gray-600">{{ curso.shortDesc }}</p>
        </header>

        <div class="bg-amber-50 border border-amber-200 rounded-xl p-6">
          <h2 class="text-xl font-bold text-amber-800 mb-2">Contenido del aula en pausa temporal</h2>
          <p class="text-amber-800/90 mb-4">
            Este curso está cargado de forma estática mientras reactivamos la infraestructura.
            En cuanto retomemos la capa dinámica, aquí volverás a tener módulos, lecciones y progreso.
          </p>
          <UButton :to="`/cursos/${curso.slug}`" color="primary">Volver a la ficha del curso</UButton>
        </div>
      </template>

      <div v-else class="bg-gray-50 border border-gray-200 rounded-xl p-6 text-gray-600">
        Curso no encontrado.
      </div>
    </div>
  </div>
</template>
