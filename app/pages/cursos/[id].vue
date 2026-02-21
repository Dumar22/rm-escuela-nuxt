<script setup lang="ts">
const route = useRoute()
const courseId = route.params.id

// Datos de cursos (esto vendría de una API)
const courses: Record<string, { title: string; description: string; duration: string; price: string }> = {
  '1': {
    title: 'Fotografía de Moda',
    description: 'Aprende las técnicas profesionales de fotografía de moda y editorial',
    duration: '3 meses',
    price: '450.000'
  },
  '2': {
    title: 'Visual Merchandising',
    description: 'Domina el arte de presentar productos y crear experiencias visuales',
    duration: '2 meses',
    price: '380.000'
  },
  '3': {
    title: 'Modelo Profesional',
    description: 'Conviértete en modelo profesional con técnicas de pasarela y editorial',
    duration: '4 meses',
    price: '520.000'
  }
}

const course = computed(() => courses[courseId as string] || null)

useSeoMeta({
  title: () => course.value ? `${course.value.title} - RM Escuela Creativa` : 'Curso no encontrado',
  description: () => course.value?.description || ''
})
</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <div class="mx-auto max-w-4xl px-6 py-16 lg:px-8">
      <template v-if="course">
        <NuxtLink to="/cursos" class="text-orange-500 hover:text-orange-600 mb-6 inline-flex items-center gap-2">
          <UIcon name="i-lucide-arrow-left" class="w-4 h-4" />
          Volver a cursos
        </NuxtLink>
        
        <h1 class="text-4xl font-display font-bold text-gray-900 mt-4">
          {{ course.title }}
        </h1>
        
        <p class="mt-4 text-lg text-gray-600">
          {{ course.description }}
        </p>
        
        <div class="mt-8 grid grid-cols-2 gap-4">
          <UCard>
            <div class="text-center">
              <p class="text-sm text-gray-500">Duración</p>
              <p class="text-xl font-semibold text-gray-900">{{ course.duration }}</p>
            </div>
          </UCard>
          <UCard>
            <div class="text-center">
              <p class="text-sm text-gray-500">Precio</p>
              <p class="text-xl font-semibold text-orange-500">${{ course.price }}</p>
            </div>
          </UCard>
        </div>
        
        <div class="mt-8">
          <UButton to="/contacto" color="primary" size="lg">
            Inscribirme
          </UButton>
        </div>
      </template>
      
      <template v-else>
        <div class="text-center py-16">
          <h1 class="text-2xl font-bold text-gray-900">Curso no encontrado</h1>
          <p class="mt-2 text-gray-600">El curso que buscas no existe.</p>
          <UButton to="/cursos" color="primary" class="mt-4">
            Ver todos los cursos
          </UButton>
        </div>
      </template>
    </div>
  </div>
</template>
