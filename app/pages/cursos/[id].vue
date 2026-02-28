<script setup lang="ts">
const route = useRoute()
const { getCurso } = useCursos()

const curso = computed(() => getCurso(route.params.id as string))

// Dividir descripción en párrafos
const parrafos = computed(() =>
  curso.value?.description.split('\n\n').filter(p => p.trim()) ?? []
)

useSeoMeta({
  title: () => curso.value ? `${curso.value.title} – RM Escuela Creativa` : 'Curso no encontrado',
  description: () => curso.value?.description || ''
})
</script>

<template>
  <div class="min-h-screen bg-white">
    <template v-if="curso">

      <!-- ── HERO: imagen izquierda / texto derecha ── -->
      <section class="bg-white border-b border-gray-100">
        <div class="mx-auto max-w-6xl px-6 lg:px-8">

          <!-- Volver -->
          <div class="pt-6">
            <NuxtLink
              to="/cursos"
              class="inline-flex items-center gap-1.5 text-sm text-orange-500 hover:text-orange-600 font-medium transition-colors"
            >
              <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
              </svg>
              Volver a cursos
            </NuxtLink>
          </div>

          <!-- Split layout -->
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-0 py-10 lg:py-16 items-start">

            <!-- Imagen -->
            <div class="rounded-2xl overflow-hidden bg-gray-100 lg:mr-10">
              <NuxtImg
                :src="curso.image"
                :alt="curso.title"
                width="680"
                height="800"
                format="webp"
                quality="85"
                class="w-full object-cover"
              />
            </div>

            <!-- Texto -->
            <div class="pt-8 lg:pt-0">
              <!-- Categoría -->
              <span
                class="inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest text-white mb-5"
                :style="{ backgroundColor: curso.categoryColor }"
              >
                {{ curso.category }}
              </span>

              <!-- Título -->
              <h1 class="text-4xl sm:text-5xl font-display font-black text-gray-900 leading-tight mb-3 uppercase tracking-tight">
                {{ curso.title }}
              </h1>

              <!-- Subtítulo naranja -->
              <p class="text-lg font-bold tracking-widest uppercase mb-6" :style="{ color: curso.categoryColor }">
                {{ curso.subtitle }}
              </p>

              <!-- Tagline -->
              <p class="text-base font-medium text-gray-700 mb-5 italic">
                {{ curso.shortDesc }}
              </p>

              <!-- Divider -->
              <div class="w-12 h-0.5 bg-orange-400 mb-6" />

              <!-- Descripción por párrafos -->
              <div class="space-y-4">
                <p
                  v-for="(p, i) in parrafos"
                  :key="i"
                  class="text-gray-700 leading-relaxed text-base"
                >
                  {{ p }}
                </p>
              </div>

              <!-- Chips info -->
              <div class="flex flex-wrap gap-3 mt-8">
                <span class="flex items-center gap-1.5 bg-gray-50 border border-gray-200 rounded-full px-3 py-1.5 text-sm text-gray-700 font-medium">
                  <svg class="w-4 h-4 text-orange-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {{ curso.duration }}
                </span>
                <span
                  class="flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-medium border"
                  :class="curso.modality === 'Virtual' ? 'border-blue-200 bg-blue-50 text-blue-700' : curso.modality === 'Híbrido' ? 'border-green-200 bg-green-50 text-green-700' : 'bg-gray-50 border-gray-200 text-gray-700'"
                >
                  <svg class="w-4 h-4 text-orange-400 flex-shrink-0 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" /><path stroke-linecap="round" stroke-linejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                  </svg>
                  {{ curso.modality }}
                </span>
                <span class="flex items-center gap-1.5 bg-gray-50 border border-gray-200 rounded-full px-3 py-1.5 text-sm text-gray-700 font-medium">
                  <svg class="w-4 h-4 text-orange-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75z" />
                  </svg>
                  {{ curso.level }}
                </span>
              </div>

              <!-- CTA -->
              <div class="flex flex-col sm:flex-row gap-3 mt-8">
                <UButton to="/contacto" color="primary" size="lg" class="font-bold justify-center">
                  Inscribirme ahora
                </UButton>
                <UButton to="/contacto" variant="outline" color="neutral" size="lg" class="justify-center">
                  Hablar con un asesor
                </UButton>
              </div>

              <!-- Garantías -->
              <ul class="mt-6 space-y-1.5 text-sm text-gray-600">
                <li class="flex items-center gap-2">
                  <svg class="w-4 h-4 text-orange-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                  </svg>
                  Certificado al finalizar el curso
                </li>
                <li class="flex items-center gap-2">
                  <svg class="w-4 h-4 text-orange-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                  </svg>
                  Profesores activos en la industria
                </li>
                <li class="flex items-center gap-2">
                  <svg class="w-4 h-4 text-orange-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                  </svg>
                  Horarios flexibles adaptados a ti
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

    </template>

    <!-- Curso no encontrado -->
    <template v-else>
      <div class="text-center py-32 px-6">
        <h1 class="text-3xl font-bold text-gray-900 mb-3">Curso no encontrado</h1>
        <p class="text-gray-600 mb-8">El curso que buscas no existe o fue removido.</p>
        <UButton to="/cursos" color="primary" size="lg">
          Ver todos los cursos
        </UButton>
      </div>
    </template>
  </div>
</template>
