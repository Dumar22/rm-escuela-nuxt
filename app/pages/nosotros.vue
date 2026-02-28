<script setup lang="ts">
const values = [
  {
    icon: 'i-lucide-award',
    title: 'Excelencia',
    description: 'Nos comprometemos con la más alta calidad en educación creativa'
  },
  {
    icon: 'i-lucide-heart',
    title: 'Pasión',
    description: 'Amamos lo que hacemos y lo transmitimos a nuestros estudiantes'
  },
  {
    icon: 'i-lucide-target',
    title: 'Innovación',
    description: 'Siempre a la vanguardia de las tendencias y metodologías'
  },
  {
    icon: 'i-lucide-users',
    title: 'Comunidad',
    description: 'Creamos una red de apoyo entre estudiantes y profesionales'
  }
]

const stats = [
  { value: '2000+', label: 'Estudiantes Graduados' },
  { value: '13', label: 'Programas Formativos' },
  { value: '85%', label: 'Tasa de Empleabilidad' },
  { value: '10+', label: 'Años de Experiencia' }
]

useSeoMeta({
  title: 'Nosotros - RM Escuela Creativa',
  description: 'Conoce nuestra historia, valores y el equipo que hace posible RM Escuela Creativa de Artes y Moda.'
})
</script>

<template>
  <div>
    <!-- Hero -->
    <section class="relative bg-black text-white overflow-hidden">
      <div class="absolute inset-0 bg-gradient-to-br from-orange-500/20 via-black to-slate-950" />
      <div class="relative mx-auto max-w-7xl px-6 lg:px-8 py-20">
        <div class="mx-auto max-w-2xl text-center">
          <h1 class="text-4xl font-display font-bold tracking-tight sm:text-5xl mb-6">
            Sobre Nosotros
          </h1>
          <p class="text-xl text-gray-200">
            Más de 10 años transformando vidas a través de la educación creativa
          </p>
        </div>
      </div>
    </section>

    <!-- Historia -->
    <section class="py-24 sm:py-32">
      <div class="mx-auto max-w-7xl px-6 lg:px-8">
        <div class="mx-auto max-w-3xl">
          <h2 class="text-3xl font-display font-bold tracking-tight text-gray-900 sm:text-4xl mb-6">
            Nuestra Historia
          </h2>
          <div class="space-y-6 text-lg text-gray-700">
            <p>
              RM Escuela Creativa de Artes y Moda nació en 2015 con un sueño: democratizar el acceso 
              a la educación en artes, moda y diseño en Colombia. Desde entonces, hemos formado a más 
              de 2,000 estudiantes que hoy son profesionales destacados en la industria.
            </p>
            <p>
              Nuestra filosofía se basa en la combinación de teoría y práctica, con profesores que son 
              profesionales activos en sus campos. Creemos que la mejor forma de aprender es haciendo, 
              por eso nuestros cursos son altamente prácticos y orientados al mundo real.
            </p>
            <p>
              Ubicados en el corazón de Medellín, nos enorgullecemos de ser parte de una de las ciudades 
              más innovadoras de Latinoamérica, y llevamos ese espíritu innovador a cada uno de nuestros programas.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Valores -->
    <section class="bg-gray-50 py-24 sm:py-32">
      <div class="mx-auto max-w-7xl px-6 lg:px-8">
        <div class="mx-auto max-w-2xl text-center mb-16">
          <h2 class="text-3xl font-display font-bold tracking-tight text-gray-900 sm:text-4xl">
            Nuestros Valores
          </h2>
          <p class="mt-4 text-lg leading-8 text-gray-700">
            La base de todo lo que hacemos
          </p>
        </div>
        <div class="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <UCard
            v-for="value in values"
            :key="value.title"
            class="text-center"
          >
            <div class="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-orange-100">
              <UIcon :name="value.icon" class="h-8 w-8 text-orange-500" />
            </div>
            <h3 class="text-xl font-display font-bold mb-2">{{ value.title }}</h3>
            <p class="text-gray-700">{{ value.description }}</p>
          </UCard>
        </div>
      </div>
    </section>

    <!-- Estadísticas -->
    <section class="py-24 sm:py-32">
      <div class="mx-auto max-w-7xl px-6 lg:px-8">
        <div class="mx-auto max-w-2xl text-center mb-16">
          <h2 class="text-3xl font-display font-bold tracking-tight text-gray-900 sm:text-4xl">
            Nuestro Impacto
          </h2>
        </div>
        <div class="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4 text-center">
          <div v-for="stat in stats" :key="stat.label">
            <div class="text-5xl font-display font-bold text-orange-500 mb-2">
              {{ stat.value }}
            </div>
            <div class="text-gray-700">{{ stat.label }}</div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
