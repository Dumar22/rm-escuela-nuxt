<script setup lang="ts">
import type { Curso } from '~/composables/useCursos'

defineProps<{
  curso: Curso
  destacado?: boolean
}>()
</script>

<template>
  <NuxtLink
    :to="`/cursos/${curso.slug}`"
    class="curso-card group block rounded-2xl overflow-hidden bg-white shadow-md hover:shadow-2xl transition-all duration-400"
    :class="{ 'curso-card--destacado': destacado }"
  >
    <!-- Imagen — sin badges encima, sin recorte forzado -->
    <div class="curso-card__img relative overflow-hidden bg-gray-100">
      <NuxtImg
        :src="curso.image"
        :alt="curso.title"
        width="600"
        height="800"
        format="webp"
        quality="80"
        loading="lazy"
        class="w-full object-cover transition-transform duration-500 group-hover:scale-105"
      />

      <!-- Overlay sutil en hover -->
      <div
        class="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-400"
      />
    </div>

    <!-- Contenido -->
    <div class="curso-card__body p-5">

      <!-- Título -->
      <h3
        class="text-xl font-bold text-gray-900 leading-snug mb-2 group-hover:text-orange-600 transition-colors duration-300"
      >
        {{ curso.title }}
      </h3>

      <!-- Modalidad -->
      <div class="flex flex-wrap items-center gap-2 mb-3">
        <span
          class="px-2.5 py-0.5 rounded-full text-sm font-semibold"
          :class="curso.modality === 'Virtual' ? 'bg-blue-100 text-blue-700' : curso.modality === 'Híbrido' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'"
        >
          {{ curso.modality }}
        </span>
      </div>

      <!-- Meta: duración + nivel -->
      <div class="flex items-center gap-4 text-base text-gray-700 mb-4">
        <span class="flex items-center gap-1">
          <svg class="w-4 h-4 text-orange-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          {{ curso.duration }}
        </span>
        <span class="flex items-center gap-1">
          <svg class="w-4 h-4 text-orange-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
          </svg>
          {{ curso.level }}
        </span>
      </div>

      <!-- CTA -->
      <span
        class="flex w-full items-center justify-center gap-1.5 px-4 py-2 rounded-xl bg-orange-600 text-white text-sm font-semibold group-hover:bg-orange-500 transition-colors duration-300 shadow-sm"
      >
        Ver más
        <svg class="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
          <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
        </svg>
      </span>
    </div>
  </NuxtLink>
</template>

<style scoped>
.curso-card__img {
  /* Sin aspect-ratio forzado: la imagen muestra su altura natural */
  overflow: hidden;
}
.curso-card__img img {
  width: 100%;
  height: auto;
  display: block;
}
</style>

