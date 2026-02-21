<script setup lang="ts">
const courses = [
  {
    id: 1,
    title: 'Fotografía de Moda',
    category: 'Fotografía',
    duration: '3 meses',
    students: 120,
    rating: 4.8,
    price: '450.000',
    featured: true,
    description: 'Aprende las técnicas profesionales de fotografía de moda y editorial'
  },
  {
    id: 2,
    title: 'Visual Merchandising y Marketing',
    category: 'Marketing',
    duration: '2 meses',
    students: 95,
    rating: 4.9,
    price: '380.000',
    featured: true,
    description: 'Domina el arte de presentar productos y crear experiencias visuales'
  },
  {
    id: 3,
    title: 'Modelo Profesional',
    category: 'Moda',
    duration: '4 meses',
    students: 150,
    rating: 4.7,
    price: '520.000',
    featured: true,
    description: 'Conviértete en modelo profesional con técnicas de pasarela y editorial'
  },
  {
    id: 4,
    title: 'Wedding Planner Profesional',
    category: 'Eventos',
    duration: '3 meses',
    students: 85,
    rating: 4.8,
    price: '420.000',
    description: 'Aprende a organizar bodas de ensueño de principio a fin'
  },
  {
    id: 5,
    title: 'Productor de Eventos',
    category: 'Eventos',
    duration: '3 meses',
    students: 78,
    rating: 4.6,
    price: '410.000',
    description: 'Gestiona y produce eventos corporativos y sociales exitosos'
  },
  {
    id: 6,
    title: 'Periodismo de Moda',
    category: 'Moda',
    duration: '3 meses',
    students: 92,
    rating: 4.7,
    price: '430.000',
    description: 'Conviértete en crítico y comunicador de moda profesional'
  },
  {
    id: 7,
    title: 'Fotografía y Video con Celular',
    category: 'Fotografía',
    duration: '2 meses',
    students: 145,
    rating: 4.5,
    price: '280.000',
    description: 'Crea contenido profesional usando solo tu smartphone'
  },
  {
    id: 8,
    title: 'Figurín de Moda H&M',
    category: 'Diseño',
    duration: '3 meses',
    students: 88,
    rating: 4.7,
    price: '390.000',
    description: 'Ilustración de moda para diseñadores y estilistas'
  },
  {
    id: 9,
    title: 'DJ Electrónico y Crossover',
    category: 'Música',
    duration: '4 meses',
    students: 102,
    rating: 4.6,
    price: '480.000',
    description: 'Domina las mezclas y producción de música electrónica'
  },
  {
    id: 10,
    title: 'Decoración Express',
    category: 'Diseño',
    duration: '2 meses',
    students: 110,
    rating: 4.8,
    price: '350.000',
    description: 'Transforma espacios con técnicas de decoración profesional'
  },
  {
    id: 11,
    title: 'Coolhunting y Tendencias',
    category: 'Marketing',
    duration: '2 meses',
    students: 76,
    rating: 4.9,
    price: '370.000',
    description: 'Identifica y predice tendencias en moda y consumo'
  },
  {
    id: 12,
    title: 'Contenido y Redes Sociales',
    category: 'Marketing Digital',
    duration: '2 meses',
    students: 165,
    rating: 4.8,
    price: '320.000',
    description: 'Crea estrategias de contenido viral y gestiona redes'
  },
  {
    id: 13,
    title: 'Arte Contemporáneo y Street Art',
    category: 'Arte',
    duration: '3 meses',
    students: 94,
    rating: 4.7,
    price: '400.000',
    description: 'Explora el arte urbano y las expresiones contemporáneas'
  }
]

const categories = [
  'Todos',
  'Fotografía',
  'Moda',
  'Marketing',
  'Eventos',
  'Diseño',
  'Música',
  'Arte',
  'Marketing Digital'
]

const selectedCategory = ref('Todos')

const filteredCourses = computed(() => {
  if (selectedCategory.value === 'Todos') {
    return courses
  }
  return courses.filter(course => course.category === selectedCategory.value)
})

const getCategoryEmoji = (category: string) => {
  const emojis: Record<string, string> = {
    'Fotografía': '📸',
    'Moda': '👗',
    'Marketing': '📊',
    'Eventos': '🎉',
    'Diseño': '🎨',
    'Música': '🎵',
    'Arte': '🖼️',
    'Marketing Digital': '📱'
  }
  return emojis[category] || '📚'
}

useSeoMeta({
  title: 'Cursos - RM Escuela Creativa',
  description: 'Descubre nuestra oferta de cursos profesionales en moda, fotografía, diseño, eventos y más.'
})
</script>

<template>
  <div>
    <!-- Header -->
    <section class="relative bg-black text-white overflow-hidden">
      <div class="absolute inset-0 bg-gradient-to-br from-orange-500/20 via-black to-slate-950" />
      <div class="relative mx-auto max-w-7xl px-6 lg:px-8 py-16">
        <div class="mx-auto max-w-2xl text-center">
          <h1 class="text-4xl font-display font-bold tracking-tight sm:text-5xl mb-4">
            Nuestros Cursos
          </h1>
          <p class="text-lg text-gray-200">
            Descubre la formación perfecta para tu futuro profesional
          </p>
        </div>
      </div>
    </section>

    <!-- Filters -->
    <section class="border-b bg-white sticky top-16 z-40 shadow-sm">
      <div class="mx-auto max-w-7xl px-6 lg:px-8 py-4">
        <div class="flex items-center gap-2 overflow-x-auto pb-2">
          <UIcon name="i-lucide-filter" class="h-5 w-5 text-gray-400 flex-shrink-0" />
          <UButton
            v-for="category in categories"
            :key="category"
            :variant="selectedCategory === category ? 'solid' : 'outline'"
            :color="selectedCategory === category ? 'primary' : 'primary'"
            size="sm"
            class="whitespace-nowrap"
            @click="selectedCategory = category"
          >
            {{ category }}
          </UButton>
        </div>
      </div>
    </section>

    <!-- Courses Grid -->
    <section class="py-12">
      <div class="mx-auto max-w-7xl px-6 lg:px-8">
        <div class="mb-8">
          <p class="text-gray-600">
            Mostrando {{ filteredCourses.length }} cursos disponibles
          </p>
        </div>
        
        <div class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          <UCard
            v-for="course in filteredCourses"
            :key="course.id"
            class="overflow-hidden group hover:shadow-xl transition-all"
          >
            <template #header>
              <div class="h-48 bg-gradient-to-br from-orange-100 via-slate-100 to-amber-100 flex items-center justify-center -m-4 mb-0 relative">
                <span class="text-6xl opacity-20">{{ getCategoryEmoji(course.category) }}</span>
                <UBadge
                  v-if="course.featured"
                  color="warning"
                  class="absolute top-3 right-3"
                >
                  Destacado
                </UBadge>
              </div>
            </template>

            <div class="flex items-center justify-between mb-2">
              <UBadge variant="subtle" color="neutral">{{ course.category }}</UBadge>
              <div class="flex items-center gap-1 text-amber-500">
                <UIcon name="i-lucide-star" class="h-4 w-4 fill-current" />
                <span class="text-sm font-semibold">{{ course.rating }}</span>
              </div>
            </div>
            <h3 class="text-xl font-semibold group-hover:text-orange-500 transition-colors line-clamp-2 mb-2">
              {{ course.title }}
            </h3>
            <p class="text-gray-600 mb-4 line-clamp-2">{{ course.description }}</p>
            <div class="flex items-center gap-4 text-sm text-gray-500 mb-4">
              <span class="flex items-center gap-1">
                <UIcon name="i-lucide-clock" class="h-4 w-4" />
                {{ course.duration }}
              </span>
              <span class="flex items-center gap-1">
                <UIcon name="i-lucide-users" class="h-4 w-4" />
                {{ course.students }}
              </span>
            </div>
            <div class="flex items-center justify-between pt-4 border-t border-gray-100">
              <div>
                <p class="text-xs text-gray-500">Desde</p>
                <span class="text-2xl font-bold text-orange-500">
                  ${{ course.price }}
                </span>
              </div>
              <UButton :to="`/cursos/${course.id}`" size="sm">
                Ver Detalles
              </UButton>
            </div>
          </UCard>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="bg-gray-50 py-16">
      <div class="mx-auto max-w-4xl px-6 lg:px-8 text-center">
        <h2 class="text-3xl font-display font-bold tracking-tight text-gray-900 mb-4">
          ¿No Encuentras lo Que Buscas?
        </h2>
        <p class="text-lg text-gray-600 mb-8">
          Contáctanos y te ayudaremos a encontrar el curso perfecto para ti
        </p>
        <UButton to="/contacto" size="lg">
          Hablar con un Asesor
        </UButton>
      </div>
    </section>
  </div>
</template>
