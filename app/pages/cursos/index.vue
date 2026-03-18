<script setup lang="ts">
const { todos } = useCursos()

const categorias = computed(() => {
  const cats = [...new Set(todos.value.map(c => c.category))]
  return ['Todos', ...cats.sort()]
})

const categoriaActiva = ref('Todos')

const cursosVisibles = computed(() => {
  if (categoriaActiva.value === 'Todos') return todos.value
  return todos.value.filter(c => c.category === categoriaActiva.value)
})

useSeoMeta({
  title: 'Cursos – RM Escuela Creativa de Artes & Moda',
  description: 'Explora toda nuestra oferta formativa: moda, fotografía, diseño, música, arte, eventos y más. Formación profesional en Medellín.'
})
</script>

<template>
  <div>
    <!-- Hero banner cursos -->
    <section class="relative bg-gray-950 text-white overflow-hidden h-[220px] sm:h-[260px] lg:h-[300px]">
      <div
        class="absolute inset-0 bg-center bg-cover"
        style="background-image: url('/images/banners/banner-cursos.jpg');"
      />
      <div
        class="absolute inset-0 bg-gradient-to-b from-gray-950/30 via-gray-950/50 to-gray-950/82"
        style="pointer-events:none;"
      />
      <div class="relative h-full mx-auto max-w-7xl px-6 lg:px-8 flex flex-col items-start justify-end pb-7 sm:pb-9 lg:pb-10 text-left">
        <h1 class="text-4xl sm:text-5xl font-display font-bold tracking-tight text-[#F4EFE8]" style="text-shadow: 0 4px 18px rgba(0, 0, 0, 0.7);">
          Cursos
        </h1>
        <p class="mt-2 text-sm sm:text-base text-gray-200 max-w-xl">
          Elige el programa que transformará tu carrera creativa
        </p>
      </div>
    </section>

    <!-- Promociones por cantidad -->
    <section class="bg-white border-b border-gray-200">
      <div class="mx-auto max-w-7xl px-6 lg:px-8 py-5">
        <div class="rounded-2xl border border-orange-200 bg-orange-50/70 p-4 sm:p-5">
          <div class="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <p class="text-sm sm:text-base font-semibold text-gray-900">
              Promociones vigentes por compra múltiple de cursos
            </p>
            <p class="text-xs sm:text-sm text-gray-600">
              Aplican términos y condiciones
            </p>
          </div>
          <div class="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div class="rounded-xl bg-white border border-orange-100 px-4 py-3">
              <p class="text-sm text-gray-600">Compra 2 cursos</p>
              <p class="text-xl font-bold text-orange-600">10% OFF</p>
            </div>
            <div class="rounded-xl bg-white border border-orange-100 px-4 py-3">
              <p class="text-sm text-gray-600">Compra 3 cursos</p>
              <p class="text-xl font-bold text-orange-600">15% OFF</p>
            </div>
            <div class="rounded-xl bg-white border border-orange-100 px-4 py-3">
              <p class="text-sm text-gray-600">Compra 4 cursos</p>
              <p class="text-xl font-bold text-orange-600">20% OFF</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Filtros de categoría -->
    <section class="sticky top-16 z-40 bg-white border-b border-gray-200 shadow-sm">
      <div class="mx-auto max-w-7xl px-6 lg:px-8 py-3">
        <div class="flex items-center gap-2 overflow-x-auto scrollbar-hide pb-1">
          <span class="text-xs text-gray-400 font-medium flex-shrink-0 mr-1">Filtrar:</span>
          <button
            v-for="cat in categorias"
            :key="cat"
            class="flex-shrink-0 px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 border"
            :class="cat === categoriaActiva
              ? 'bg-orange-600 text-white border-orange-600 shadow-sm'
              : 'bg-white text-gray-700 border-gray-200 hover:border-orange-400 hover:text-orange-600'"
            @click="categoriaActiva = cat"
          >
            {{ cat }}
          </button>
        </div>
      </div>
    </section>

    <!-- Grid de cursos -->
    <section class="py-16 bg-gray-50 min-h-[60vh]">
      <div class="mx-auto max-w-7xl px-6 lg:px-8">
        <p class="text-sm text-gray-600 mb-8">
          <span class="font-semibold text-gray-900">{{ cursosVisibles.length }}</span>
          {{ cursosVisibles.length === 1 ? 'curso disponible' : 'cursos disponibles' }}
          <span v-if="categoriaActiva !== 'Todos'"> en <strong>{{ categoriaActiva }}</strong></span>
        </p>

        <Transition name="fade" mode="out-in">
          <div
            :key="categoriaActiva"
            class="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
          >
            <CursoCard
              v-for="curso in cursosVisibles"
              :key="curso.id"
              :curso="curso"
            />
          </div>
        </Transition>
      </div>
    </section>

    <!-- CTA inferior -->
    <section class="bg-orange-600 text-white py-16">
      <div class="mx-auto max-w-3xl px-6 text-center">
        <h2 class="text-2xl font-display font-bold mb-3">
          ¿No encuentras lo que buscas?
        </h2>
        <p class="text-orange-100 mb-8">
          Contáctanos y te asesoramos sobre el programa más adecuado para ti.
        </p>
        <UButton
          to="/contacto"
          color="neutral"
          variant="solid"
          size="lg"
          class="bg-white text-orange-600 hover:bg-orange-50 font-bold"
        >
          Hablar con un asesor
        </UButton>
      </div>
    </section>
  </div>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
.scrollbar-hide::-webkit-scrollbar {
  display: none;
}
</style>
