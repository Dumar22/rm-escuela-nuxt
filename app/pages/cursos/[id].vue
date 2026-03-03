<script setup lang="ts">
const route = useRoute()
const { getCurso } = useCursos()

const curso = computed(() => getCurso(route.params.id as string))

const parrafos = computed(() =>
  curso.value?.description.split('\n\n').filter(p => p.trim()) ?? []
)

// "STREET ART POP · CREADOR DE..." → línea grande / línea pequeña
const subtitleLinea = computed(() => curso.value?.subtitle.split('·')[0]?.trim() ?? '')
const subtitleTag   = computed(() => curso.value?.subtitle.split('·').slice(1).join('·').trim() ?? '')

const isPensumOpen = ref(false)

useSeoMeta({
  title: () => curso.value ? `${curso.value.title} – RM Escuela Creativa` : 'Curso no encontrado',
  description: () => curso.value?.description || ''
})
</script>

<template>
  <div class="min-h-screen bg-white overflow-x-hidden">
    <template v-if="curso">

      <!-- Volver -->
      <div class="px-8 lg:px-8 pt-6 pb-4">
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

      <!-- ═══ 3 COLUMNAS (cuando hay detailImages) ═══ -->
      <template v-if="curso.detailImages && curso.detailImages.length >= 2">

        <!-- DESKTOP -->
        <section class="hidden lg:grid lg:grid-cols-[1fr_minmax(0,600px)_1fr] w-full border-b border-gray-100 gap-0">

          <!-- Imagen izquierda -->
          <div class="w-full overflow-hidden bg-gray-100" style="height:90vh;">
            <NuxtImg
              :src="curso.detailImages[0]"
              :alt="`${curso.title} - imagen 1`"
              width="520"
              height="820"
              format="webp"
              quality="85"
              loading="eager"
              fetchpriority="high"
              style="width:100%; height:100%; object-fit:cover; display:block;"
            />
          </div>

          <!-- Texto central -->
          <div class="flex flex-col justify-center px-6 xl:px-10 pt-2 pb-10 bg-white">
            <div class="max-w-[480px] mx-auto w-full flex flex-col items-center">

              <h1
                class="font-display font-black uppercase leading-none tracking-tight text-gray-950 text-center w-full"
                style="font-size: clamp(1.6rem, 2.6vw, 2.6rem);"
              >
                {{ curso.title }}
              </h1>

              <p
                v-if="subtitleLinea"
                class="font-display font-black uppercase leading-none tracking-tight text-gray-950 text-center mt-1 w-full"
                style="font-size: clamp(1.3rem, 2.1vw, 2.1rem);"
              >
                {{ subtitleLinea }}
              </p>

              <p
                v-if="subtitleTag"
                class="text-center font-bold uppercase tracking-widest text-gray-500 mt-3 mb-8 w-full"
                style="font-size: clamp(0.6rem, 0.85vw, 0.8rem);"
              >
                {{ subtitleTag }}
              </p>
              <div v-else class="mb-8 w-full" />

              <div class="space-y-4 text-gray-700 leading-relaxed text-justify w-full" style="font-size: clamp(0.85rem, 1.05vw, 0.975rem);">
                <p v-for="(p, i) in parrafos" :key="i">{{ p }}</p>
              </div>

              <!-- Chips -->
              <div class="flex flex-wrap justify-center gap-2 mt-8 w-full">
              <span class="flex items-center gap-1.5 bg-gray-50 border border-gray-200 rounded-full px-3 py-1.5 text-xs text-gray-700 font-medium">
                <svg class="w-3.5 h-3.5 text-orange-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {{ curso.duration }}
              </span>
              <span
                class="flex items-center rounded-full px-3 py-1.5 text-xs font-medium border"
                :class="curso.modality === 'Virtual' ? 'border-blue-200 bg-blue-50 text-blue-700' : curso.modality === 'Híbrido' ? 'border-green-200 bg-green-50 text-green-700' : 'bg-gray-50 border-gray-200 text-gray-700'"
              >
                {{ curso.modality }}
              </span>
              <span class="bg-gray-50 border border-gray-200 rounded-full px-3 py-1.5 text-xs text-gray-700 font-medium">
                {{ curso.level }}
              </span>
            </div>

              <!-- CTAs -->
              <div class="flex flex-col gap-2 mt-6 w-full">
                <UButton to="/contacto" color="primary" size="md" class="font-bold justify-center w-full">
                  Inscribirme ahora
                </UButton>
                <UButton to="/contacto" variant="outline" color="neutral" size="md" class="justify-center w-full">
                  Hablar con un asesor
                </UButton>
                <UButton
                  @click="isPensumOpen = true"
                  variant="ghost"
                  size="md"
                  class="justify-center w-full font-semibold"
                  :style="{ color: curso.categoryColor }"
                >
                  <svg class="w-4 h-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path stroke-linecap="round" stroke-linejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                  Ver Pensum
                </UButton>
              </div>

              <!-- Garantías -->
              <ul class="mt-5 space-y-1.5 w-full">
                <li
                  v-for="g in ['Certificado al finalizar el curso', 'Profesores activos en la industria', 'Horarios flexibles adaptados a ti']"
                  :key="g"
                  class="flex items-center gap-2 text-xs text-gray-500"
                >
                  <svg class="w-3.5 h-3.5 text-orange-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                  </svg>
                  {{ g }}
                </li>
              </ul>

            </div>
          </div>

          <!-- Imagen derecha -->
          <div class="w-full overflow-hidden bg-gray-100" style="height:90vh;">
            <NuxtImg
              :src="curso.detailImages[1]"
              :alt="`${curso.title} - imagen 2`"
              width="520"
              height="820"
              format="webp"
              quality="85"
              loading="eager"
              fetchpriority="high"
              style="width:100%; height:100%; object-fit:cover; display:block;"
            />
          </div>
        </section>

        <!-- MOBILE / TABLET -->
        <section class="lg:hidden">
          <div class="w-full overflow-hidden bg-gray-100" style="aspect-ratio:4/3;">
            <NuxtImg
              :src="curso.detailImages[0]"
              :alt="curso.title"
              width="800"
              height="600"
              format="webp"
              quality="85"
              loading="eager"
              placeholder
              class="w-full h-full object-cover"
            />
          </div>

          <div class="px-5 py-8">
            <h1 class="text-4xl font-display font-black uppercase leading-tight text-gray-950 text-center">
              {{ curso.title }}
            </h1>
            <p v-if="subtitleLinea" class="text-2xl font-display font-black uppercase leading-tight text-gray-950 text-center mt-1">
              {{ subtitleLinea }}
            </p>
            <p v-if="subtitleTag" class="text-xs font-bold uppercase tracking-widest text-gray-500 text-center mt-2 mb-6">
              {{ subtitleTag }}
            </p>
            <div v-else class="mb-6" />

            <div class="space-y-4 text-gray-700 leading-relaxed text-sm">
              <p v-for="(p, i) in parrafos" :key="i">{{ p }}</p>
            </div>

            <div class="w-full overflow-hidden rounded-2xl mt-8 bg-gray-100" style="aspect-ratio:4/3;">
              <NuxtImg
                :src="curso.detailImages[1]"
                :alt="curso.title"
                width="800"
                height="600"
                format="webp"
                quality="85"
                placeholder
                class="w-full h-full object-cover"
              />
            </div>

            <div class="flex flex-wrap gap-2 mt-8 justify-center">
              <span class="flex items-center gap-1.5 bg-gray-50 border border-gray-200 rounded-full px-3 py-1.5 text-sm text-gray-700 font-medium">
                <svg class="w-4 h-4 text-orange-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {{ curso.duration }}
              </span>
              <span
                class="flex items-center rounded-full px-3 py-1.5 text-sm font-medium border"
                :class="curso.modality === 'Virtual' ? 'border-blue-200 bg-blue-50 text-blue-700' : curso.modality === 'Híbrido' ? 'border-green-200 bg-green-50 text-green-700' : 'bg-gray-50 border-gray-200 text-gray-700'"
              >
                {{ curso.modality }}
              </span>
              <span class="bg-gray-50 border border-gray-200 rounded-full px-3 py-1.5 text-sm text-gray-700 font-medium">
                {{ curso.level }}
              </span>
            </div>

            <div class="flex flex-col gap-3 mt-6">
              <UButton to="/contacto" color="primary" size="lg" class="font-bold justify-center">Inscribirme ahora</UButton>
              <UButton to="/contacto" variant="outline" color="neutral" size="lg" class="justify-center">Hablar con un asesor</UButton>
              <UButton
                @click="isPensumOpen = true"
                variant="ghost"
                size="lg"
                class="justify-center font-semibold"
                :style="{ color: curso.categoryColor }"
              >
                <svg class="w-4 h-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path stroke-linecap="round" stroke-linejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
                Ver Pensum
              </UButton>
            </div>

            <ul class="mt-5 space-y-1.5">
              <li
                v-for="g in ['Certificado al finalizar el curso', 'Profesores activos en la industria', 'Horarios flexibles adaptados a ti']"
                :key="g"
                class="flex items-center gap-2 text-sm text-gray-500"
              >
                <svg class="w-4 h-4 text-orange-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                </svg>
                {{ g }}
              </li>
            </ul>
          </div>
        </section>

      </template>

      <!-- ═══ 2 COLUMNAS — fallback sin detailImages ═══ -->
      <template v-else>
        <section class="py-10 lg:py-16 border-b border-gray-100">
          <div class="mx-auto max-w-7xl px-6 lg:px-8">
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">

              <div class="rounded-2xl overflow-hidden" style="aspect-ratio:3/4;">
                <NuxtImg
                  :src="curso.image"
                  :alt="curso.title"
                  width="680"
                  height="900"
                  format="webp"
                  quality="85"
                  loading="eager"
                  class="w-full h-full object-cover"
                />
              </div>

              <div class="flex flex-col justify-center">
                <span
                  class="inline-block self-start px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest text-white mb-5"
                  :style="{ backgroundColor: curso.categoryColor }"
                >
                  {{ curso.category }}
                </span>

                <h1 class="text-4xl sm:text-5xl font-display font-black uppercase leading-tight tracking-tight text-gray-950 mb-1">
                  {{ curso.title }}
                </h1>
                <p v-if="subtitleLinea" class="text-2xl font-display font-black uppercase leading-tight text-gray-950 mb-1">
                  {{ subtitleLinea }}
                </p>
                <p v-if="subtitleTag" class="text-xs font-bold tracking-widest uppercase text-gray-500 mb-6">
                  {{ subtitleTag }}
                </p>
                <div v-else class="mb-6" />

                <div class="w-10 h-0.5 mb-6" :style="{ backgroundColor: curso.categoryColor }" />

                <div class="space-y-4 text-gray-700 leading-relaxed text-base">
                  <p v-for="(p, i) in parrafos" :key="i">{{ p }}</p>
                </div>

                <div class="flex flex-wrap gap-3 mt-8">
                  <span class="flex items-center gap-1.5 bg-gray-50 border border-gray-200 rounded-full px-3 py-1.5 text-sm text-gray-700 font-medium">
                    <svg class="w-4 h-4 text-orange-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {{ curso.duration }}
                  </span>
                  <span
                    class="flex items-center rounded-full px-3 py-1.5 text-sm font-medium border"
                    :class="curso.modality === 'Virtual' ? 'border-blue-200 bg-blue-50 text-blue-700' : curso.modality === 'Híbrido' ? 'border-green-200 bg-green-50 text-green-700' : 'bg-gray-50 border-gray-200 text-gray-700'"
                  >
                    {{ curso.modality }}
                  </span>
                  <span class="bg-gray-50 border border-gray-200 rounded-full px-3 py-1.5 text-sm text-gray-700 font-medium">
                    {{ curso.level }}
                  </span>
                </div>

                <div class="flex flex-col sm:flex-row gap-3 mt-8">
                  <UButton to="/contacto" color="primary" size="lg" class="font-bold justify-center">Inscribirme ahora</UButton>
                  <UButton to="/contacto" variant="outline" color="neutral" size="lg" class="justify-center">Hablar con un asesor</UButton>
                </div>
                <div class="mt-3">
                  <UButton
                    @click="isPensumOpen = true"
                    variant="ghost"
                    size="lg"
                    class="w-full justify-center font-semibold"
                    :style="{ color: curso.categoryColor }"
                  >
                    <svg class="w-4 h-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path stroke-linecap="round" stroke-linejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                    Ver Pensum
                  </UButton>
                </div>

                <ul class="mt-5 space-y-1.5">
                  <li
                    v-for="g in ['Certificado al finalizar el curso', 'Profesores activos en la industria', 'Horarios flexibles adaptados a ti']"
                    :key="g"
                    class="flex items-center gap-2 text-sm text-gray-600"
                  >
                    <svg class="w-4 h-4 text-orange-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                    {{ g }}
                  </li>
                </ul>
              </div>

            </div>
          </div>
        </section>
      </template>

    </template>

    <!-- Curso no encontrado -->
    <template v-else>
      <div class="text-center py-32 px-6">
        <h1 class="text-3xl font-bold text-gray-900 mb-3">Curso no encontrado</h1>
        <p class="text-gray-600 mb-8">El curso que buscas no existe o fue removido.</p>
        <UButton to="/cursos" color="primary" size="lg">Ver todos los cursos</UButton>
      </div>
    </template>
    
    <!-- Modal Pensum Preview (Custom) -->
    <Teleport to="body">
      <div 
        v-if="isPensumOpen" 
        class="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 sm:p-6"
        @click.self="isPensumOpen = false"
      >
        <div class="bg-white rounded-2xl w-full max-w-4xl max-h-[90vh] flex flex-col shadow-2xl relative animate-in fade-in zoom-in-95 duration-200">
          
          <div class="flex flex-shrink-0 justify-between items-center p-4 sm:p-5 border-b border-gray-100">
            <h3 class="text-xl sm:text-2xl font-bold text-gray-900 shrink min-w-0 truncate">Pensum: {{ curso?.title }}</h3>
            <button 
              @click="isPensumOpen = false" 
              class="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors flex-shrink-0"
              aria-label="Cerrar modal"
            >
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          <div class="overflow-y-auto p-4 sm:p-6 bg-gray-50 flex-1">
            <img 
              v-if="curso"
              :src="`/pensums/${curso.slug}.jpg`" 
              :alt="`Pensum de ${curso.title}`"
              class="w-full h-auto bg-white rounded-lg shadow-sm border border-gray-100 block"
            />
          </div>
          
          <div class="flex-shrink-0 p-4 sm:p-5 flex flex-col sm:flex-row justify-end gap-3 border-t border-gray-100 bg-white rounded-b-2xl">
            <button 
              @click="isPensumOpen = false" 
              class="px-5 py-2.5 text-gray-600 font-medium hover:bg-gray-50 rounded-lg transition-colors border border-gray-200 text-center"
            >
              Cancelar
            </button>
            <NuxtLink 
              to="/contacto" 
              class="px-8 py-2.5 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-lg transition-colors shadow-sm text-center"
            >
              Inscribirme ahora
            </NuxtLink>
          </div>

        </div>
      </div>
    </Teleport>

  </div>
</template>
